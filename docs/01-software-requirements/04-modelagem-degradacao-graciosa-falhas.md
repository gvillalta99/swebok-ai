# Seção 4: Modelagem de Degradação Graciosa e Falhas

## Overview

Esta seção descreve como especificar comportamentos de falha e degradação graciosa em sistemas que incorporam componentes probabilísticos (ex.: LLMs). O objetivo é tornar falhas previsíveis, contidas e verificáveis, reduzindo impacto operacional e risco de decisões incorretas sob incerteza.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar por que componentes estocásticos exigem modelagem explícita de degradação
2. Definir níveis de degradação e critérios de transição com métricas observáveis
3. Aplicar padrões de resiliência (fallback, circuit breaker, retry) com limites claros
4. Integrar degradação a governança (auditoria, alertas, revisão humana)

## 4.1 Introdução

Sistemas tradicionais operavam sob a premissa de determinismo: entradas específicas produzem saídas previsíveis. Na era dos LLMs e sistemas autônomos, o comportamento é intrinsecamente probabilístico e, ocasionalmente, imprevisível.

A **Modelagem de Degradação Graciosa** é a disciplina de projetar sistemas que, quando confrontados com limitações, incertezas ou falhas, mantêm funcionalidade essencial enquanto degradam serviços não-críticos de forma controlada e previsível.

## 4.2 Fundamentos de Degradação Graciosa

### 4.2.1 Princípio do Falhar Bem (Fail Well)

> *"Um sistema bem projetado não é aquele que nunca falha, mas aquele que falha de forma previsível, recuperável e informativa."*

O princípio do "falhar bem" estabelece quatro critérios fundamentais:

| Critério | Descrição | Indicador |
|----------|-----------|-----------|
| Previsibilidade | Falhas seguem padrões documentados | Usuários sabem o que esperar |
| Recuperabilidade | Sistema pode retornar ao estado normal | MTTR < threshold definido |
| Informatividade | Falhas fornecem informação diagnóstica | Logs detalhados, métricas claras |
| Contenção | Falha não se propaga | Isolamento de domínios |

### 4.2.2 Taxonomia de Degradação

```
┌─────────────────────────────────────────────────────────────────┐
│                    NÍVEIS DE DEGRADAÇÃO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nível 0: Operação Normal                                       │
│  ├── Todos os componentes funcionando                           │
│  └── Performance dentro de SLAs                                 │
│                                                                 │
│  Nível 1: Degradação Leve                                       │
│  ├── Funcionalidades não-críticas indisponíveis                 │
│  └── Performance ligeiramente reduzida                          │
│                                                                 │
│  Nível 2: Degradação Moderada                                   │
│  ├── Funcionalidades secundárias desativadas                    │
│  └── Fallbacks ativados                                         │
│                                                                 │
│  Nível 3: Degradação Severa                                     │
│  ├── Apenas funcionalidades críticas operacionais               │
│  └── Modo de sobrevivência (survival mode)                      │
│                                                                 │
│  Nível 4: Falha Total                                           │
│  ├── Sistema indisponível                                       │
│  └── Preservação de dados e estado                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2.3 Degradação em Sistemas com IA

Sistemas que utilizam LLMs apresentam desafios específicos:

```
┌─────────────────────────────────────────────────────────────────┐
│         FONTES DE DEGRADAÇÃO EM SISTEMAS COM IA                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Latência do Modelo                                             │
│  ├── Timeout em respostas                                       │
│  ├── Cache de respostas frequentes                              │
│  └── Fallback para modelos menores                              │
│                                                                 │
│  Qualidade da Resposta                                          │
│  ├── Confidence score baixo                                     │
│  ├── Respostas incoerentes                                      │
│  └── Fallback para regras baseadas                              │
│                                                                 │
│  Disponibilidade do Serviço                                     │
│  ├── Rate limiting                                              │
│  ├── Quotas excedidas                                           │
│  └── Fallback local/offline                                     │
│                                                                 │
│  Custos Operacionais                                            │
│  ├── Budget excedido                                            │
│  ├── Degradação para modelos mais baratos                       │
│  └── Modo econômico                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.3 Estratégias de Degradação

### 4.3.1 Circuit Breaker (Disjuntor)

O padrão Circuit Breaker previne chamadas repetidas a componentes falhos:

```python
from enum import Enum, auto
from dataclasses import dataclass
from typing import Callable, Optional
import time

class CircuitState(Enum):
    CLOSED = auto()      # Operação normal
    OPEN = auto()        # Falha detectada, rejeitando chamadas
    HALF_OPEN = auto()   # Testando recuperação

@dataclass
class CircuitBreaker:
    failure_threshold: int = 5
    recovery_timeout: float = 60.0
    half_open_max_calls: int = 3
    
    def __post_init__(self):
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time: Optional[float] = None
    
    def call(self, operation: Callable, fallback: Callable, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = CircuitState.HALF_OPEN
                self.success_count = 0
            else:
                return fallback(*args, **kwargs)
        
        try:
            result = operation(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            return fallback(*args, **kwargs)
    
    def _on_success(self):
        self.failure_count = 0
        if self.state == CircuitState.HALF_OPEN:
            self.success_count += 1
            if self.success_count >= self.half_open_max_calls:
                self.state = CircuitState.CLOSED
    
    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = CircuitState.OPEN
```

### 4.3.2 Bulkhead (Divisória Estanque)

Isolamento de recursos para prevenir propagação de falhas:

```python
from concurrent.futures import ThreadPoolExecutor, TimeoutError
import threading

class Bulkhead:
    """
    Isola operações em pools separados para evitar
    que uma operação lenta afete outras.
    """
    
    def __init__(self, name: str, max_concurrent: int, max_queue: int):
        self.name = name
        self.executor = ThreadPoolExecutor(
            max_workers=max_concurrent,
            thread_name_prefix=f"bulkhead_{name}_"
        )
        self.max_queue = max_queue
        self.semaphore = threading.Semaphore(max_concurrent + max_queue)
    
    def execute(self, operation, fallback, timeout: float = 5.0):
        if not self.semaphore.acquire(blocking=False):
            # Bulkhead cheio, executar fallback
            return fallback()
        
        try:
            future = self.executor.submit(operation)
            return future.result(timeout=timeout)
        except TimeoutError:
            return fallback()
        finally:
            self.semaphore.release()
```

### 4.3.3 Fallbacks Hierárquicos

Estratégia de múltiplos níveis de fallback:

```python
class RespostaIA:
    def __init__(self, content: str, confidence: float, source: str):
        self.content = content
        self.confidence = confidence
        self.source = source

class SistemaComFallbacks:
    """
        Estratégia de fallback hierárquico:
        
        1. Modelo principal (GPT-4, Claude, etc.)
        2. Modelo secundário (mais rápido/econômico)
        3. Resposta em cache
        4. Regras heurísticas
        5. Resposta padrão de erro gracioso
    """
    
    async def gerar_resposta(self, contexto: Contexto) -> RespostaIA:
        # Nível 1: Modelo Principal
        try:
            resposta = await self.modelo_principal.generate(contexto)
            if resposta.confidence > 0.8:
                return resposta
        except Exception:
            pass
        
        # Nível 2: Modelo Secundário
        try:
            resposta = await self.modelo_secundario.generate(contexto)
            if resposta.confidence > 0.7:
                return resposta
        except Exception:
            pass
        
        # Nível 3: Cache
        resposta_cache = self.cache.get(contexto.hash())
        if resposta_cache:
            return RespostaIA(
                resposta_cache, 
                confidence=0.6, 
                source="cache"
            )
        
        # Nível 4: Regras Heurísticas
        resposta_heuristica = self.regras.aplicar(contexto)
        if resposta_heuristica:
            return RespostaIA(
                resposta_heuristica,
                confidence=0.5,
                source="heuristic"
            )
        
        # Nível 5: Resposta de Erro Gracioso
        return RespostaIA(
            content=self._mensagem_erro_gracioso(contexto),
            confidence=0.0,
            source="fallback"
        )
    
    def _mensagem_erro_gracioso(self, contexto: Contexto) -> str:
        return (
            "Não foi possível processar sua solicitação no momento. "
            "Por favor, tente novamente em alguns instantes ou "
            "reformule sua pergunta."
        )
```

## 4.4 Modelagem de Falhas

### 4.4.1 Análise de Modos de Falha (FMEA Adaptada)

Adaptação da Failure Mode and Effects Analysis para sistemas com IA:

| Componente | Modo de Falha | Efeito | Detecção | Mitigação |
|------------|---------------|--------|----------|-----------|
| LLM API | Timeout | Latência excessiva | Monitoramento | Cache + Fallback |
| LLM API | Rate Limit | Rejeição de requisições | HTTP 429 | Throttling + Queue |
| LLM | Hallucination | Informação incorreta | Confidence score | Fact-checking |
| LLM | Bias | Resposta enviesada | Fairness metrics | Prompt engineering |
| Cache | Miss | Latência adicional | Cache metrics | Pre-warming |
| Circuit Breaker | Falha aberta | Degradação prematura | Métricas de estado | Ajuste dinâmico |

### 4.4.2 Árvores de Falha

Representação hierárquica de como falhas básicas levam a falhas do sistema:

```
                    Sistema Indisponível
                           OR
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    Serviço IA       Serviço Cache    Banco de Dados
    Falhou           Falhou           Falhou
         AND               │                 │
    ┌────┴────┐            │                 │
    │         │            │                 │
Timeout   Qualidade     Timeout         Conexão
> 5s      < threshold   > 1s            Perdida
```

### 4.4.3 Estados de Degradação e Transições

Máquina de estados para modelagem de degradação:

```python
from enum import Enum, auto
from typing import Dict, Set

class DegradationState(Enum):
    NORMAL = auto()
    DEGRADED_LIGHT = auto()
    DEGRADED_MODERATE = auto()
    DEGRADED_SEVERE = auto()
    EMERGENCY = auto()

class DegradationModel:
    """
    Modela transições entre estados de degradação
    baseado em métricas do sistema.
    """
    
    THRESHOLDS = {
        DegradationState.DEGRADED_LIGHT: {
            'latency_p99': 500,      # ms
            'error_rate': 0.01,       # 1%
            'confidence_avg': 0.7
        },
        DegradationState.DEGRADED_MODERATE: {
            'latency_p99': 1000,
            'error_rate': 0.05,
            'confidence_avg': 0.5
        },
        DegradationState.DEGRADED_SEVERE: {
            'latency_p99': 3000,
            'error_rate': 0.15,
            'confidence_avg': 0.3
        },
        DegradationState.EMERGENCY: {
            'latency_p99': 10000,
            'error_rate': 0.30,
            'confidence_avg': 0.1
        }
    }
    
    def __init__(self):
        self.current_state = DegradationState.NORMAL
        self.active_degradations: Set[str] = set()
    
    def evaluate_transition(self, metrics: Dict[str, float]) -> DegradationState:
        """
        Avalia métricas atuais e determina estado apropriado.
        """
        for state in [
            DegradationState.EMERGENCY,
            DegradationState.DEGRADED_SEVERE,
            DegradationState.DEGRADED_MODERATE,
            DegradationState.DEGRADED_LIGHT
        ]:
            thresholds = self.THRESHOLDS[state]
            if self._exceeds_thresholds(metrics, thresholds):
                return state
        
        return DegradationState.NORMAL
    
    def _exceeds_thresholds(self, metrics: Dict, thresholds: Dict) -> bool:
        for key, threshold in thresholds.items():
            if metrics.get(key, 0) > threshold:
                return True
        return False
```

## 4.5 Implementação de Degradação Graciosa

### 4.5.1 Padrão: Feature Flags com Degradação

```python
class FeatureManager:
    """
    Gerencia features com suporte a degradação automática.
    """
    
    FEATURES = {
        'ai_recommendations': {
            'criticality': 'medium',
            'fallback': 'static_recommendations',
            'degradation_triggers': ['high_latency', 'low_confidence']
        },
        'ai_summarization': {
            'criticality': 'low',
            'fallback': 'show_full_text',
            'degradation_triggers': ['high_latency']
        },
        'user_authentication': {
            'criticality': 'critical',
            'fallback': None,  # Sem fallback, deve sempre funcionar
            'degradation_triggers': []
        }
    }
    
    def is_enabled(self, feature: str, context: Context) -> bool:
        config = self.FEATURES.get(feature)
        
        # Features críticas nunca são desabilitadas
        if config['criticality'] == 'critical':
            return True
        
        # Verificar triggers de degradação
        for trigger in config['degradation_triggers']:
            if self._trigger_active(trigger, context):
                return False
        
        return True
    
    def get_fallback(self, feature: str):
        config = self.FEATURES.get(feature)
        fallback_name = config.get('fallback')
        return self._resolve_fallback(fallback_name)
```

### 4.5.2 Padrão: Retry com Backoff Exponencial

```python
import random
import time
from typing import Callable, TypeVar

T = TypeVar('T')

class RetryPolicy:
    """
    Política de retry com backoff exponencial e jitter.
    """
    
    def __init__(
        self,
        max_retries: int = 3,
        base_delay: float = 1.0,
        max_delay: float = 60.0,
        exponential_base: float = 2.0,
        retryable_exceptions: tuple = (Exception,)
    ):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.exponential_base = exponential_base
        self.retryable_exceptions = retryable_exceptions
    
    def execute(self, operation: Callable[..., T], *args, **kwargs) -> T:
        last_exception = None
        
        for attempt in range(self.max_retries + 1):
            try:
                return operation(*args, **kwargs)
            except self.retryable_exceptions as e:
                last_exception = e
                if attempt < self.max_retries:
                    delay = self._calculate_delay(attempt)
                    time.sleep(delay)
        
        raise last_exception
    
    def _calculate_delay(self, attempt: int) -> float:
        exponential = self.exponential_base ** attempt
        delay = min(self.base_delay * exponential, self.max_delay)
        jitter = random.uniform(0, delay * 0.1)  # 10% jitter
        return delay + jitter
```

## 4.6 Monitoramento e Observabilidade

### 4.6.1 Métricas de Degradação

```python
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class DegradationMetrics:
    """
    Métricas essenciais para monitorar degradação.
    """
    # Latência
    latency_p50: float
    latency_p95: float
    latency_p99: float
    
    # Confiabilidade
    error_rate: float
    success_rate: float
    circuit_breaker_state: str
    
    # Qualidade (específico para IA)
    avg_confidence: float
    hallucination_rate: float
    fallback_usage_rate: float
    
    # Capacidade
    queue_depth: int
    active_connections: int
    available_capacity: float
    
    def to_dict(self) -> Dict[str, float]:
        return {
            'latency_p50_ms': self.latency_p50,
            'latency_p95_ms': self.latency_p95,
            'latency_p99_ms': self.latency_p99,
            'error_rate_pct': self.error_rate * 100,
            'avg_confidence': self.avg_confidence,
            'fallback_usage_pct': self.fallback_usage_rate * 100
        }
```

### 4.6.2 Alertas e Notificações

```python
class DegradationAlertManager:
    """
    Gerencia alertas baseados em condições de degradação.
    """
    
    ALERT_RULES = [
        {
            'name': 'high_latency',
            'condition': lambda m: m.latency_p99 > 2000,
            'severity': 'warning',
            'cooldown_minutes': 5
        },
        {
            'name': 'low_confidence',
            'condition': lambda m: m.avg_confidence < 0.6,
            'severity': 'critical',
            'cooldown_minutes': 1
        },
        {
            'name': 'circuit_breaker_open',
            'condition': lambda m: m.circuit_breaker_state == 'OPEN',
            'severity': 'critical',
            'cooldown_minutes': 0
        }
    ]
    
    def evaluate_metrics(self, metrics: DegradationMetrics):
        for rule in self.ALERT_RULES:
            if rule['condition'](metrics):
                self._trigger_alert(rule, metrics)
```

## 4.7 Exercícios

1. Projete um sistema de Circuit Breaker para uma API de LLM que:
   - Detecta latência anormal
   - Transiciona entre estados adequadamente
   - Implementa fallback com cache

2. Modele os estados de degradação para um sistema de recomendação com IA e defina as transições entre eles.

3. Implemente uma estratégia de fallback hierárquico para um chatbot comercial.

---

## Practical Considerations

- Defina “o que é aceitável degradar” e “o que nunca pode degradar” antes de discutir mecanismos; isso evita que o fallback viole requisitos críticos.
- Use gatilhos baseados em métricas observáveis (latência, taxa de erro, qualidade amostral) e documente thresholds como parte do contrato do sistema.
- Modele degradação como estados explícitos com transições testáveis; evite degradação “implícita” espalhada no código.
- Para componentes de IA, trate incerteza como sinal: outputs com baixa confiança devem acionar fallback ou revisão humana, não respostas “confidentes”.

## Summary

- Degradação graciosa transforma falhas em comportamentos previsíveis, contidos e auditáveis.
- Estados de degradação e transições devem ser definidos com métricas e thresholds verificáveis.
- Padrões como fallback, circuit breaker e retry precisam de limites e observabilidade para evitar cascatas e regressões.

## References

1. NYGARD, M. Release It!: Design and Deploy Production-Ready Software. 2007.
2. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

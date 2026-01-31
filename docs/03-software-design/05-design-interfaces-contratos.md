---
title: "Seção 5: Design de Interfaces e Contratos"
created_at: 2025-01-31
tags: ["design", "software-design", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# Seção 5: Design de Interfaces e Contratos

## Overview

Esta seção trata interfaces e contratos como mecanismo de contenção: definem o que pode entrar/sair de componentes (especialmente de IA) e como validar conformidade.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Projetar contratos de interface que permitam verificação automatizada
2. Definir semântica de erros, fallback e níveis de confiança para componentes probabilísticos
3. Planejar versionamento de contratos quando o comportamento evolui

## 5.1 Introdução

Interfaces em sistemas híbridos servem como fronteiras de confiança entre componentes determinísticos e estocásticos. Um design adequado de interfaces é essencial para:
- Comunicar incerteza de forma estruturada
- Estabelecer contratos verificáveis
- Permitir substituição controlada de implementações
- Garantir degrade graciosa

Esta seção apresenta padrões para design de interfaces que suportam sistemas híbridos.

## 5.2 Tipos de Interfaces

### 5.2.1 Taxonomia de Interfaces

```
┌─────────────────────────────────────────────────────────────────┐
│              TAXONOMIA DE INTERFACES EM SISTEMAS HÍBRIDOS       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Interfaces Determinísticas                                     │
│  ├── Contratos rígidos, comportamento previsível               │
│  ├── Garantias formais possíveis                               │
│  └── Exemplo: Repositórios, calculadoras                       │
│                                                                 │
│  Interfaces Probabilísticas                                     │
│  ├── Retornam resultados com metadados de confiança            │
│  ├── Comportamento variável mas dentro de bounds               │
│  └── Exemplo: Classificadores, recomendadores                  │
│                                                                 │
│  Interfaces Híbridas                                            │
│  ├── Comportamento determinístico com fallback probabilístico  │
│  ├── Ou vice-versa                                             │
│  └── Exemplo: Buscas com autocomplete                          │
│                                                                 │
│  Interfaces Supervisionadas                                     │
│  ├── Requerem aprovação para operações específicas             │
│  ├── Logging obrigatório                                       │
│  └── Exemplo: Aprovações de alto valor                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.3 Design de Interfaces Probabilísticas

### 5.3.1 Interface com Metadados de Confiança

```python
from typing import TypeVar, Generic, Optional
from dataclasses import dataclass
from decimal import Decimal

T = TypeVar('T')

@dataclass(frozen=True)
class ProbabilisticResult(Generic[T]):
    """
    Resultado de operação probabilística com metadados completos.
    """
    # Valor principal
    value: T
    
    # Confiança
    confidence: Decimal  # 0.0 a 1.0
    confidence_interval: Optional[tuple]  # (lower, upper)
    
    # Alternativas
    alternatives: list  # Outras opções consideradas
    alternative_scores: dict  # Scores das alternativas
    
    # Proveniência
    model_version: str
    prompt_id: Optional[str]
    context_hash: Optional[str]
    
    # Temporal
    timestamp: float
    processing_time_ms: int
    
    # Fallback
    is_fallback: bool
    fallback_reason: Optional[str]
    
    def is_certain(self, threshold: Decimal = Decimal('0.95')) -> bool:
        """Verifica se resultado atinge certeza desejada."""
        return self.confidence >= threshold
    
    def with_fallback(self, fallback_value: T) -> 'ProbabilisticResult[T]':
        """Retorna resultado ou fallback se confiança baixa."""
        if self.confidence < Decimal('0.5'):
            return ProbabilisticResult(
                value=fallback_value,
                confidence=Decimal('1.0'),
                confidence_interval=None,
                alternatives=[],
                alternative_scores={},
                model_version=self.model_version,
                prompt_id=None,
                context_hash=self.context_hash,
                timestamp=self.timestamp,
                processing_time_ms=self.processing_time_ms,
                is_fallback=True,
                fallback_reason='Low confidence in primary result'
            )
        return self

# Uso em interface
class Classifier(Protocol):
    """Interface para classificadores probabilísticos."""
    
    async def classify(self, input_data: dict) -> ProbabilisticResult[str]:
        """
        Classifica entrada retornando resultado com confiança.
        """
        ...
    
    async def classify_batch(self, 
                            inputs: list) -> list[ProbabilisticResult[str]]:
        """
        Classifica múltiplas entradas.
        """
        ...

class SentimentClassifier:
    """Implementação concreta."""
    
    async def classify(self, text: str) -> ProbabilisticResult[str]:
        # Chamar modelo
        raw_result = await self.llm.classify_sentiment(text)
        
        # Construir resultado tipado
        return ProbabilisticResult(
            value=raw_result['label'],
            confidence=Decimal(str(raw_result['confidence'])),
            confidence_interval=(
                Decimal(str(raw_result['ci_lower'])),
                Decimal(str(raw_result['ci_upper']))
            ),
            alternatives=raw_result.get('alternatives', []),
            alternative_scores=raw_result.get('scores', {}),
            model_version=self.model_version,
            prompt_id=raw_result.get('prompt_id'),
            context_hash=hashlib.md5(text.encode()).hexdigest(),
            timestamp=time.time(),
            processing_time_ms=raw_result['latency_ms'],
            is_fallback=False,
            fallback_reason=None
        )
```

### 5.3.2 Interface com Streaming de Confiança

```python
from typing import AsyncIterator
from dataclasses import dataclass

@dataclass
class StreamingResult:
    """
    Resultado parcial com atualização progressiva de confiança.
    """
    partial_value: str
    confidence: Decimal
    is_final: bool
    tokens_generated: int
    tokens_total_estimate: int

class StreamingClassifier(Protocol):
    """
    Interface para classificação com streaming de resultado.
    Útil para respostas longas onde confiança evolui.
    """
    
    async def classify_streaming(self, 
                                 text: str) -> AsyncIterator[StreamingResult]:
        """
        Retorna resultado em partes, permitindo decisão antecipada.
        """
        ...

# Implementação exemplo
class IncrementalSentimentAnalyzer:
    """
    Analisador que atualiza confiança conforme processa texto.
    """
    
    async def classify_streaming(self, text: str) -> AsyncIterator[StreamingResult]:
        tokens = text.split()
        processed = []
        
        for i, token in enumerate(tokens):
            processed.append(token)
            partial_text = ' '.join(processed)
            
            # Análise incremental
            result = await self._analyze_partial(partial_text)
            
            yield StreamingResult(
                partial_value=result['preliminary_label'],
                confidence=Decimal(str(result['confidence'])),
                is_final=(i == len(tokens) - 1),
                tokens_generated=i + 1,
                tokens_total_estimate=len(tokens)
            )
            
            # Early termination se confiança muito alta
            if result['confidence'] > 0.99 and i > len(tokens) * 0.5:
                break
```

## 5.4 Contratos Verificáveis

### 5.4.1 Contratos com Precondições e Pós-condições

```python
from typing import Callable
from functools import wraps

class Contract:
    """
    Implementação de Design by Contract.
    """
    
    @staticmethod
    def requires(condition: Callable, message: str = ""):
        """Decorador para pré-condição."""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                if not condition(*args, **kwargs):
                    raise PreconditionViolation(
                        f"Pré-condição violada: {message}"
                    )
                return func(*args, **kwargs)
            return wrapper
        return decorator
    
    @staticmethod
    def ensures(condition: Callable, message: str = ""):
        """Decorador para pós-condição."""
        def decorator(func):
            @wraps(func)
            def wrapper(*args, **kwargs):
                result = func(*args, **kwargs)
                if not condition(result, *args, **kwargs):
                    raise PostconditionViolation(
                        f"Pós-condição violada: {message}"
                    )
                return result
            return wrapper
        return decorator

# Uso
class PaymentService:
    
    @Contract.requires(
        lambda amount, _: amount > 0,
        "Amount must be positive"
    )
    @Contract.requires(
        lambda _, currency: currency in ['USD', 'EUR', 'BRL'],
        "Currency must be supported"
    )
    @Contract.ensures(
        lambda result, amount, _: result.amount_charged == amount,
        "Amount charged must match requested amount"
    )
    @Contract.ensures(
        lambda result, *_: result.transaction_id is not None,
        "Transaction ID must be generated"
    )
    def process_payment(self, amount: Decimal, currency: str) -> PaymentResult:
        """
        Processa pagamento com contratos verificáveis.
        """
        # Implementação...
        pass
```

### 5.4.2 Contratos para Componentes de IA

```python
from dataclasses import dataclass
from typing import List

@dataclass
class AIContract:
    """
    Contrato específico para componentes de IA.
    """
    # Garantias de qualidade
    min_confidence: float
    max_latency_ms: int
    required_explanation: bool
    
    # Limites de comportamento
    forbidden_outputs: List[str]
    required_keywords: List[str]
    max_output_length: int
    
    # Supervisão
    requires_human_approval: bool
    approval_conditions: List[str]
    
    # Fallback
    fallback_trigger_conditions: List[str]
    fallback_behavior: str

class ContractEnforcer:
    """
    Verifica contratos em tempo de execução.
    """
    
    def __init__(self, contract: AIContract):
        self.contract = contract
    
    def verify_output(self, 
                     input_data: dict,
                     output: ProbabilisticResult) -> ContractVerification:
        """Verifica se saída atende contrato."""
        violations = []
        
        # Verificar confiança mínima
        if output.confidence < self.contract.min_confidence:
            violations.append(
                f"Confidence {output.confidence} below minimum "
                f"{self.contract.min_confidence}"
            )
        
        # Verificar conteúdo proibido
        output_str = str(output.value).lower()
        for forbidden in self.contract.forbidden_outputs:
            if forbidden.lower() in output_str:
                violations.append(
                    f"Output contains forbidden content: {forbidden}"
                )
        
        # Verificar keywords requeridas
        for required in self.contract.required_keywords:
            if required.lower() not in output_str:
                violations.append(
                    f"Output missing required keyword: {required}"
                )
        
        # Verificar latência
        if output.processing_time_ms > self.contract.max_latency_ms:
            violations.append(
                f"Latency {output.processing_time_ms}ms exceeds maximum "
                f"{self.contract.max_latency_ms}ms"
            )
        
        return ContractVerification(
            valid=len(violations) == 0,
            violations=violations,
            requires_approval=self.contract.requires_human_approval
        )
```

## 5.5 Versionamento de Interfaces

```python
from typing import Dict, Optional
from dataclasses import dataclass
from enum import Enum

class Compatibility(Enum):
    FULL = "full"
    BACKWARD = "backward"  # Novo cliente pode usar versão antiga
    FORWARD = "forward"    # Cliente antigo pode usar versão nova
    NONE = "none"

@dataclass
class InterfaceVersion:
    major: int
    minor: int
    patch: int
    
    def __str__(self):
        return f"{self.major}.{self.minor}.{self.patch}"
    
    def is_compatible_with(self, other: 'InterfaceVersion') -> Compatibility:
        """Verifica compatibilidade entre versões."""
        if self.major != other.major:
            return Compatibility.NONE
        
        if self.minor >= other.minor:
            return Compatibility.BACKWARD
        
        if self.minor < other.minor:
            return Compatibility.FORWARD
        
        return Compatibility.FULL

class VersionedInterface:
    """
    Interface com suporte a versionamento.
    """
    
    def __init__(self):
        self.versions: Dict[str, callable] = {}
        self.current_version = InterfaceVersion(1, 0, 0)
    
    def register_version(self, 
                        version: InterfaceVersion,
                        implementation: callable):
        """Registra implementação de versão específica."""
        self.versions[str(version)] = implementation
    
    def call(self, 
            version: Optional[str] = None,
            *args, **kwargs):
        """
        Executa chamada com versionamento.
        """
        target_version = version or str(self.current_version)
        
        if target_version not in self.versions:
            # Tentar encontrar versão compatível
            compatible = self._find_compatible_version(target_version)
            if compatible:
                return self.versions[compatible](*args, **kwargs)
            raise VersionNotSupportedError(target_version)
        
        return self.versions[target_version](*args, **kwargs)
    
    def _find_compatible_version(self, requested: str) -> Optional[str]:
        """Encontra versão compatível."""
        req_ver = self._parse_version(requested)
        
        for ver_str in self.versions:
            ver = self._parse_version(ver_str)
            compat = ver.is_compatible_with(req_ver)
            if compat in [Compatibility.FULL, Compatibility.BACKWARD]:
                return ver_str
        
        return None
```

## 5.6 Exercícios

1. Projete uma interface para um serviço de recomendação que comunique adequadamente a incerteza das recomendações.

2. Implemente um sistema de contratos que verifique automaticamente pré-condições e pós-condições para um módulo de processamento de pagamentos.

3. Crie um esquema de versionamento para uma API que evolui de determinística para probabilística.

## Practical Considerations

- Prefira contratos explícitos (tipos, schemas, invariantes) a convenções implícitas.
- Para componentes de IA, defina limites de resposta e critérios de rejeição; “qualquer texto” não é contrato.

## Summary

- Interfaces e contratos reduzem ambiguidade e tornam validação repetível.
- Versionamento de contratos é inevitável; planeje compatibilidade e migração.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. HE, L. et al. Use Property-Based Testing to Bridge LLM Code Generation and Validation. arXiv:2506.18315, 2025.

3. ALLAMANIS, M.; PANTHAPLACKEL, S.; YIN, P. Unsupervised Evaluation of Code LLMs with Round-Trip Correctness. arXiv:2402.08699, 2024.

4. AGGARWAL, P. et al. CodeSift: An LLM-Based Reference-Less Framework for Automatic Code Validation. arXiv:2408.15630, 2024.

5. FAKHOURY, S. et al. LLM-based Test-driven Interactive Code Generation: User Study and Empirical Evaluation. Microsoft Research, University of Pennsylvania, UC San Diego, 2024. Disponível em: https://www.seas.upenn.edu/~asnaik/assets/papers/tse24_ticoder.pdf

---

*SWEBOK-AI v5.0 - Software Design*

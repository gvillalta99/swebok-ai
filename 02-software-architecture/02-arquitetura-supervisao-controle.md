# Seção 2: Arquitetura de Supervisão e Controle

## Overview

Esta seção apresenta arquitetura de supervisão e controle como requisito estrutural em sistemas híbridos: mecanismos para monitorar decisões automatizadas, impor limites de autonomia e permitir intervenção humana com trilha de auditoria.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Diferenciar níveis de supervisão e quando a intervenção humana é obrigatória
2. Projetar mecanismos de interrupção, override e escalonamento com segurança e rastreabilidade
3. Balancear autonomia e controle com base em risco, reversibilidade e criticidade
4. Definir requisitos mínimos de observabilidade para supervisão em tempo real

## 2.1 Introdução

A arquitetura de supervisão em sistemas híbridos estabelece os mecanismos através dos quais decisões automatizadas podem ser monitoradas, interrompidas ou modificadas por agentes humanos. Diferentemente de sistemas tradicionais onde a supervisão é um recurso adicional, em arquiteturas híbridas ela é um componente arquitetural fundamental.

A **Arquitetura de Supervisão e Controle** define padrões para:
- Decisão sobre quando intervenção humana é obrigatória vs. opcional
- Mecanismos de interrupção e override
- Interfaces para supervisão em tempo real
- Balanceamento entre autonomia e controle

## 2.2 Taxonomia de Supervisão

### 2.2.1 Níveis de Supervisão

```
┌─────────────────────────────────────────────────────────────────┐
│                  NÍVEIS DE SUPERVISÃO                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nível 0: Autonomia Total (Human-Out-of-the-Loop)              │
│  ├── Decisões de baixo impacto e alta confiança                │
│  ├── Auditoria posterior apenas                                │
│  └── Exemplo: Geração de rascunhos de documentos               │
│                                                                 │
│  Nível 1: Supervisão por Exceção (Human-on-the-Loop)           │
│  ├── Operação autônoma com interrupção possível                │
│  ├── Alertas para anomalias                                    │
│  └── Exemplo: Triagem de suporte com escalação automática      │
│                                                                 │
│  Nível 2: Supervisão Ativa (Human-in-the-Loop)                 │
│  ├── Aprovação necessária para decisões específicas            │
│  ├── Interface de revisão em tempo real                        │
│  └── Exemplo: Aprovação de transações financeiras              │
│                                                                 │
│  Nível 3: Supervisão Obrigatória (Human-Must-Approve)          │
│  ├── Nenhuma ação sem aprovação explícita                      │
│  ├── Documentação de raciocínio obrigatória                    │
│  └── Exemplo: Decisões médicas, contratos legais               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2.2 Modelo de Decisão para Nível de Supervisão

```python
from dataclasses import dataclass
from enum import Enum
from typing import Optional, List

class SupervisionLevel(Enum):
    AUTONOMOUS = 0
    EXCEPTION_BASED = 1
    ACTIVE_SUPERVISION = 2
    MANDATORY_APPROVAL = 3

@dataclass
class DecisionContext:
    """
    Contexto para determinação do nível de supervisão.
    """
    financial_impact: float
    reversibility: bool
    compliance_requirements: List[str]
    user_trust_level: float
    system_confidence: float
    time_criticality: float  # 0-1, onde 1 é extremamente crítico

class SupervisionLevelDecider:
    """
    Determina o nível de supervisão necessário baseado
    em características da decisão.
    """
    
    THRESHOLDS = {
        'financial': 10000.0,  # USD
        'trust': 0.7,
        'confidence': 0.85
    }
    
    def decide(self, context: DecisionContext) -> SupervisionLevel:
        """
        Aplica heurísticas para determinar nível de supervisão.
        """
        # Regras obrigatórias (não negociáveis)
        if self._has_mandatory_compliance(context):
            return SupervisionLevel.MANDATORY_APPROVAL
        
        if context.financial_impact > self.THRESHOLDS['financial']:
            return SupervisionLevel.MANDATORY_APPROVAL
        
        # Regras de alto risco
        if not context.reversibility:
            return SupervisionLevel.ACTIVE_SUPERVISION
        
        if context.system_confidence < 0.5:
            return SupervisionLevel.ACTIVE_SUPERVISION
        
        # Regras moderadas
        if context.system_confidence < self.THRESHOLDS['confidence']:
            return SupervisionLevel.EXCEPTION_BASED
        
        if context.user_trust_level < self.THRESHOLDS['trust']:
            return SupervisionLevel.EXCEPTION_BASED
        
        # Baixo risco
        return SupervisionLevel.AUTONOMOUS
    
    def _has_mandatory_compliance(self, context: DecisionContext) -> bool:
        """
        Verifica se há requisitos de compliance que exigem aprovação.
        """
        mandatory_frameworks = {'SOX', 'HIPAA', 'GDPR_SENSITIVE'}
        return any(req in mandatory_frameworks 
                  for req in context.compliance_requirements)
```

## 2.3 Padrões de Supervisão

### 2.3.1 Padrão: Circuit Breaker com Override Humano

```python
import asyncio
from enum import Enum
from dataclasses import dataclass
from typing import Optional, Callable

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"
    MANUAL_OVERRIDE = "manual_override"

@dataclass
class HumanOverride:
    """
    Representa uma decisão de override humano.
    """
    authorized_by: str
    authorization_level: int
    reason: str
    expires_at: Optional[float] = None

class SupervisedCircuitBreaker:
    """
    Circuit breaker que permite override humano para
    operações críticas.
    """
    
    def __init__(self, 
                 failure_threshold: int = 5,
                 recovery_timeout: float = 60.0):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.last_failure_time: Optional[float] = None
        self.active_override: Optional[HumanOverride] = None
    
    async def execute(self,
                      operation: Callable,
                      fallback: Callable,
                      requires_override: bool = False,
                      get_override: Callable = None) -> any:
        """
        Executa operação com possibilidade de override humano.
        """
        # Verificar override ativo
        if self.state == CircuitState.MANUAL_OVERRIDE:
            if self._is_override_valid():
                # Override permite execução mesmo com circuito aberto
                return await operation()
            else:
                self.active_override = None
                self._transition_to(self._determine_state())
        
        # Se requer override explícito
        if requires_override:
            override = await get_override()
            if override:
                self.active_override = override
                return await operation()
            else:
                raise PermissionError("Override humano necessário mas não fornecido")
        
        # Comportamento normal do circuit breaker
        if self.state == CircuitState.OPEN:
            if self._should_attempt_reset():
                self._transition_to(CircuitState.HALF_OPEN)
            else:
                return fallback()
        
        try:
            result = await operation()
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            return fallback()
    
    def force_state(self, 
                    new_state: CircuitState, 
                    override: HumanOverride) -> bool:
        """
        Permite operador humano forçar estado do circuito.
        """
        if not self._validate_authorization(override):
            return False
        
        self.active_override = override
        self._transition_to(new_state)
        return True
    
    def _validate_authorization(self, override: HumanOverride) -> bool:
        """Valida se o override tem autoridade suficiente."""
        return override.authorization_level >= 3
```

### 2.3.2 Padrão: Interface de Supervisão em Tempo Real

```python
from typing import Dict, List, AsyncIterator
import asyncio

class SupervisionEvent:
    """
    Evento para consumo por interfaces de supervisão.
    """
    def __init__(self,
                 event_type: str,
                 decision_id: str,
                 timestamp: float,
                 description: str,
                 confidence: float,
                 requires_action: bool = False):
        self.event_type = event_type
        self.decision_id = decision_id
        self.timestamp = timestamp
        self.description = description
        self.confidence = confidence
        self.requires_action = requires_action
        self.resolved_by: Optional[str] = None
        self.resolution: Optional[str] = None

class RealTimeSupervisionInterface:
    """
    Interface para supervisão em tempo real de decisões
    automatizadas.
    """
    
    def __init__(self):
        self.pending_decisions: Dict[str, SupervisionEvent] = {}
        self.subscribers: List[asyncio.Queue] = []
        self.decision_history: List[SupervisionEvent] = []
    
    async def register_decision(self, 
                                 decision: any,
                                 context: DecisionContext) -> str:
        """
        Registra uma decisão para possível supervisão.
        """
        decider = SupervisionLevelDecider()
        level = decider.decide(context)
        
        decision_id = self._generate_id()
        
        if level == SupervisionLevel.MANDATORY_APPROVAL:
            event = SupervisionEvent(
                event_type="APPROVAL_REQUIRED",
                decision_id=decision_id,
                timestamp=asyncio.get_event_loop().time(),
                description=str(decision),
                confidence=context.system_confidence,
                requires_action=True
            )
            self.pending_decisions[decision_id] = event
            await self._notify_subscribers(event)
            return decision_id
        
        elif level == SupervisionLevel.EXCEPTION_BASED:
            # Registrar mas não bloquear
            event = SupervisionEvent(
                event_type="DECISION_LOGGED",
                decision_id=decision_id,
                timestamp=asyncio.get_event_loop().time(),
                description=str(decision),
                confidence=context.system_confidence,
                requires_action=False
            )
            self.decision_history.append(event)
            return decision_id
        
        else:
            # Autônomo, apenas auditoria
            return decision_id
    
    async def approve_decision(self,
                               decision_id: str,
                               supervisor_id: str,
                               resolution: str) -> bool:
        """
        Permite supervisor aprovar uma decisão pendente.
        """
        if decision_id not in self.pending_decisions:
            return False
        
        event = self.pending_decisions[decision_id]
        event.resolved_by = supervisor_id
        event.resolution = resolution
        event.requires_action = False
        
        del self.pending_decisions[decision_id]
        self.decision_history.append(event)
        
        return True
    
    async def subscribe(self) -> AsyncIterator[SupervisionEvent]:
        """
        Permite inscrição para eventos de supervisão em tempo real.
        """
        queue = asyncio.Queue()
        self.subscribers.append(queue)
        
        try:
            while True:
                event = await queue.get()
                yield event
        finally:
            self.subscribers.remove(queue)
    
    async def _notify_subscribers(self, event: SupervisionEvent):
        """Notifica todos os subscribers de um evento."""
        for queue in self.subscribers:
            await queue.put(event)
```

### 2.3.3 Padrão: Gradual Autonomy

Sistema que aumenta autonomia baseado em desempenho histórico:

```python
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import List

@dataclass
class DecisionRecord:
    timestamp: datetime
    decision_type: str
    automated: bool
    overridden: bool
    outcome_successful: bool
    feedback_score: float

class GradualAutonomyManager:
    """
    Gerencia transição gradual de supervisão para autonomia
    baseado em histórico de desempenho.
    """
    
    def __init__(self,
                 success_threshold: float = 0.95,
                 min_decisions: int = 100):
        self.success_threshold = success_threshold
        self.min_decisions = min_decisions
        self.decision_history: List[DecisionRecord] = []
        self.autonomy_level: SupervisionLevel = SupervisionLevel.MANDATORY_APPROVAL
    
    def record_decision(self, record: DecisionRecord):
        """Registra resultado de uma decisão."""
        self.decision_history.append(record)
        self._reevaluate_autonomy()
    
    def _reevaluate_autonomy(self):
        """
        Reavalia nível de autonomia baseado em histórico recente.
        """
        recent = self._get_recent_decisions(days=30)
        
        if len(recent) < self.min_decisions:
            return
        
        success_rate = sum(1 for d in recent if d.outcome_successful) / len(recent)
        override_rate = sum(1 for d in recent if d.overridden) / len(recent)
        
        # Lógica de transição
        if success_rate >= self.success_threshold and override_rate < 0.05:
            # Alto desempenho, pode aumentar autonomia
            self._increase_autonomy()
        elif success_rate < 0.85 or override_rate > 0.15:
            # Baixo desempenho, reduzir autonomia
            self._decrease_autonomy()
    
    def _increase_autonomy(self):
        """Aumenta nível de autonomia gradualmente."""
        transitions = {
            SupervisionLevel.MANDATORY_APPROVAL: SupervisionLevel.ACTIVE_SUPERVISION,
            SupervisionLevel.ACTIVE_SUPERVISION: SupervisionLevel.EXCEPTION_BASED,
            SupervisionLevel.EXCEPTION_BASED: SupervisionLevel.AUTONOMOUS
        }
        if self.autonomy_level in transitions:
            self.autonomy_level = transitions[self.autonomy_level]
    
    def _decrease_autonomy(self):
        """Reduz nível de autonomia para maior supervisão."""
        transitions = {
            SupervisionLevel.AUTONOMOUS: SupervisionLevel.EXCEPTION_BASED,
            SupervisionLevel.EXCEPTION_BASED: SupervisionLevel.ACTIVE_SUPERVISION,
            SupervisionLevel.ACTIVE_SUPERVISION: SupervisionLevel.MANDATORY_APPROVAL
        }
        if self.autonomy_level in transitions:
            self.autonomy_level = transitions[self.autonomy_level]
```

## 2.4 Considerações de Design

### 2.4.1 Latência e Supervisão

A introdução de supervisão humana introduz latência significativa. Estratégias para mitigar:

| Estratégia | Descrição | Caso de Uso |
|------------|-----------|-------------|
| Pre-aprovação | Decisões similares aprovadas em lote | Transações recorrentes |
| Timeboxing | Timeout para decisão humana | Operações críticas com deadline |
| Delegação Hierárquica | Diferentes níveis de autoridade | Organizações grandes |
| Async Supervision | Aprovação posterior para casos não-críticos | Processamento em lote |

### 2.4.2 Segurança de Override

```python
from cryptography.fernet import Fernet
import hashlib

class SecureOverride:
    """
    Implementa segurança para comandos de override humano.
    """
    
    def __init__(self, secret_key: bytes):
        self.cipher = Fernet(secret_key)
    
    def create_override_token(self,
                              supervisor_id: str,
                              authorization_level: int,
                              target_operation: str,
                              expiry_seconds: int = 300) -> str:
        """
        Cria token assinado para override.
        """
        payload = {
            'supervisor_id': supervisor_id,
            'level': authorization_level,
            'target': target_operation,
            'expires': time.time() + expiry_seconds,
            'nonce': secrets.token_hex(16)
        }
        
        json_payload = json.dumps(payload).encode()
        return self.cipher.encrypt(json_payload).decode()
    
    def validate_override_token(self, 
                                token: str,
                                expected_operation: str) -> Optional[HumanOverride]:
        """
        Valida token de override.
        """
        try:
            decrypted = self.cipher.decrypt(token.encode())
            payload = json.loads(decrypted)
            
            # Verificar expiração
            if payload['expires'] < time.time():
                return None
            
            # Verificar operação alvo
            if payload['target'] != expected_operation:
                return None
            
            return HumanOverride(
                authorized_by=payload['supervisor_id'],
                authorization_level=payload['level'],
                reason="Token-based override",
                expires_at=payload['expires']
            )
        except Exception:
            return None
```

## 2.5 Exercícios

1. Projete um sistema de supervisão para um robô cirúrgico assistido por IA, especificando quais operações requerem aprovação humana obrigatória.

2. Implemente um `GradualAutonomyManager` que aprenda com feedback humano para ajustar níveis de autonomia.

3. Desenhe uma interface de supervisão em tempo real para um sistema de trading algorítmico, identificando os alertas críticos que devem gerar notificação imediata.

---

## Practical Considerations

- Defina “pontos de decisão” que exigem aprovação humana e documente o critério (risco, irreversibilidade, compliance).
- Separe o mecanismo de override da lógica de negócio: override é infraestrutura de governança e precisa de autenticação forte, autorização e expiração.
- Trate supervisão como produto: dashboards e alertas devem reduzir carga cognitiva e suportar decisões sob pressão.

## Summary

- Supervisão e controle são componentes arquiteturais centrais em sistemas com autonomia.
- Níveis de supervisão, mecanismos de override e trilha de auditoria definem accountability.
- O trade-off autonomia vs. controle deve ser decidido por risco e verificabilidade, não por conveniência.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering — Life cycle processes — Requirements engineering. 2018.

*SWEBOK-AI v5.0 - Software Architecture*

# Seção 4: Design para Auditabilidade e Rastreamento

## Overview

Esta seção descreve como projetar sistemas híbridos para produzir evidência: rastrear decisões automatizadas, reconstruir contexto e suportar auditorias técnicas e regulatórias.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir requisitos de auditabilidade (o que registrar, por quanto tempo, com que garantias)
2. Projetar rastreamento ponta a ponta (entrada, contexto, decisão, saída, versão)
3. Diferenciar observabilidade operacional de evidência para responsabilização

## 4.1 Introdução

A auditabilidade em sistemas tradicionais focava em registrar entradas, processamentos e saídas de componentes determinísticos. Na era dos LLMs, onde componentes geram comportamentos dinamicamente baseados em contextos complexos, a auditabilidade requer uma abordagem fundamentalmente diferente.

O **Design para Auditabilidade e Rastreamento** estabelece padrões arquiteturais que permitem reconstruir, analisar e verificar decisões tomadas por sistemas autônomos, garantindo accountability e facilitando investigações regulatórias ou forenses.

## 4.2 Dimensões da Auditabilidade

### 4.2.1 Espectro de Rastreabilidade

```
┌─────────────────────────────────────────────────────────────────┐
│              DIMENSÕES DE AUDITABILIDADE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Rastreabilidade de Decisão                                     │
│  ├── Entrada que gerou a decisão                               │
│  ├── Contexto disponível no momento                            │
│  ├── Prompt completo enviado ao modelo                         │
│  ├── Parâmetros de geração (temperatura, etc.)                 │
│  ├── Resposta bruta do modelo                                  │
│  └── Pós-processamento aplicado                                │
│                                                                 │
│  Rastreabilidade de Dados                                       │
│  ├── Origem dos dados de treinamento/contexto                  │
│  ├── Transformações aplicadas                                  │
│  ├── Versionamento de embeddings                               │
│  └── Retenção e expurgo conforme políticas                     │
│                                                                 │
│  Rastreabilidade de Processo                                    │
│  ├── Cadeia de agentes envolvidos                              │
│  ├── Handoffs entre componentes                                │
│  ├── Tempo de processamento por etapa                          │
│  └── Decisões de routing                                       │
│                                                                 │
│  Rastreabilidade de Responsabilidade                            │
│  ├── Identidade do usuário/sistema solicitante                 │
│  ├── Aprovações obtidas                                        │
│  ├── Overrides aplicados                                       │
│  └── Escalonamentos realizados                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2.2 Requisitos de Auditabilidade por Domínio

| Domínio | Retenção | Granularidade | Acesso |
|---------|----------|---------------|--------|
| Financeiro | 7-10 anos | Completa | Regulador, Auditor Interno |
| Saúde | Vida do paciente + 20 anos | Completa | Paciente, Regulador |
| Jurídico | Duração do contrato + 10 anos | Alta | Partes, Tribunal |
| Geral | 2-3 anos | Resumida | Administrador |

## 4.3 Padrões de Auditabilidade

### 4.3.1 Padrão: Decision Log Imutável

```python
from dataclasses import dataclass, asdict
from typing import Optional, Dict, Any, List
from datetime import datetime
import hashlib
import json

@dataclass(frozen=True)
class DecisionRecord:
    """
    Registro imutável de uma decisão automatizada.
    Uma vez criado, nunca pode ser modificado.
    """
    # Identificação
    decision_id: str
    timestamp: datetime
    correlation_id: str  # Para rastrear transações distribuídas
    
    # Contexto
    decision_type: str
    input_data_hash: str  # Hash dos dados de entrada
    input_data_ref: str   # Referência aos dados armazenados separadamente
    
    # Processamento
    model_version: str
    prompt_hash: str
    context_window: Dict[str, Any]
    generation_params: Dict[str, float]
    
    # Saída
    raw_output_hash: str
    processed_output: str
    confidence_score: Optional[float]
    
    # Meta-decisão
    was_overridden: bool
    overridden_by: Optional[str]
    override_reason: Optional[str]
    final_decision: str
    
    # Linhagem
    parent_decisions: List[str]
    child_decisions: List[str]
    
    def compute_hash(self) -> str:
        """Computa hash do registro para verificação de integridade."""
        data = asdict(self)
        canonical = json.dumps(data, sort_keys=True, default=str)
        return hashlib.sha256(canonical.encode()).hexdigest()

class ImmutableDecisionLog:
    """
    Log de decisões com garantias de imutabilidade e integridade.
    """
    
    def __init__(self, storage_backend, encryption_key: Optional[bytes] = None):
        self.storage = storage_backend
        self.encryption_key = encryption_key
        self.chain_hash: Optional[str] = None  # Para blockchain interno
    
    async def append(self, record: DecisionRecord) -> bool:
        """
        Adiciona registro ao log de forma imutável.
        """
        # Verificar integridade do registro
        record_hash = record.compute_hash()
        
        # Criar link para registro anterior (blockchain simplificado)
        enriched_record = {
            **asdict(record),
            'record_hash': record_hash,
            'previous_hash': self.chain_hash,
            'sequence_number': await self._get_next_sequence()
        }
        
        # Atualizar chain hash
        self.chain_hash = hashlib.sha256(
            json.dumps(enriched_record, sort_keys=True).encode()
        ).hexdigest()
        
        # Persistir
        await self.storage.store(enriched_record)
        
        return True
    
    async def verify_integrity(self) -> Dict[str, Any]:
        """
        Verifica integridade completa do log.
        """
        records = await self.storage.retrieve_all()
        
        violations = []
        for i, record in enumerate(records):
            # Verificar hash do registro
            computed_hash = DecisionRecord(**{
                k: v for k, v in record.items() 
                if k in DecisionRecord.__dataclass_fields__
            }).compute_hash()
            
            if computed_hash != record['record_hash']:
                violations.append({
                    'sequence': record['sequence_number'],
                    'type': 'record_modified',
                    'expected_hash': record['record_hash'],
                    'computed_hash': computed_hash
                })
            
            # Verificar cadeia (exceto primeiro registro)
            if i > 0:
                prev_record = records[i - 1]
                expected_prev_hash = hashlib.sha256(
                    json.dumps(prev_record, sort_keys=True).encode()
                ).hexdigest()
                
                if record['previous_hash'] != expected_prev_hash:
                    violations.append({
                        'sequence': record['sequence_number'],
                        'type': 'chain_broken',
                        'expected_prev': expected_prev_hash,
                        'recorded_prev': record['previous_hash']
                    })
        
        return {
            'valid': len(violations) == 0,
            'total_records': len(records),
            'violations': violations
        }
```

### 4.3.2 Padrão: Context Versioning

```python
from dataclasses import dataclass
from typing import Dict, Any, Optional
import copy

@dataclass
class VersionedContext:
    """
    Contexto versionado para rastreamento de mudanças.
    """
    version_id: str
    timestamp: float
    context_data: Dict[str, Any]
    parent_version: Optional[str]
    change_description: str
    changed_by: str

class ContextVersionManager:
    """
    Gerencia versionamento de contextos para IA.
    """
    
    def __init__(self, storage):
        self.storage = storage
        self.contexts: Dict[str, VersionedContext] = {}
    
    def create_context(self, 
                       context_id: str,
                       initial_data: Dict[str, Any],
                       created_by: str) -> VersionedContext:
        """Cria contexto inicial."""
        context = VersionedContext(
            version_id=f"{context_id}_v1",
            timestamp=time.time(),
            context_data=copy.deepcopy(initial_data),
            parent_version=None,
            change_description="Initial context creation",
            changed_by=created_by
        )
        self.contexts[context.version_id] = context
        return context
    
    def evolve_context(self,
                       current_version_id: str,
                       changes: Dict[str, Any],
                       change_description: str,
                       changed_by: str) -> VersionedContext:
        """
        Cria nova versão de contexto preservando histórico.
        """
        current = self.contexts[current_version_id]
        
        # Criar nova versão
        new_version_number = self._extract_version(current_version_id) + 1
        new_version_id = f"{self._extract_id(current_version_id)}_v{new_version_number}"
        
        # Merge das mudanças
        new_data = copy.deepcopy(current.context_data)
        new_data.update(changes)
        
        new_context = VersionedContext(
            version_id=new_version_id,
            timestamp=time.time(),
            context_data=new_data,
            parent_version=current_version_id,
            change_description=change_description,
            changed_by=changed_by
        )
        
        self.contexts[new_version_id] = new_context
        return new_context
    
    def get_context_at_time(self, 
                           context_id: str, 
                           timestamp: float) -> Optional[VersionedContext]:
        """
        Recupera versão de contexto em momento específico.
        Útil para reconstruir decisões passadas.
        """
        versions = [
            v for v in self.contexts.values()
            if v.version_id.startswith(context_id) and v.timestamp <= timestamp
        ]
        
        if not versions:
            return None
        
        return max(versions, key=lambda v: v.timestamp)
    
    def get_lineage(self, version_id: str) -> List[VersionedContext]:
        """
        Recupera linhagem completa de um contexto.
        """
        lineage = []
        current = self.contexts.get(version_id)
        
        while current:
            lineage.append(current)
            if current.parent_version:
                current = self.contexts.get(current.parent_version)
            else:
                break
        
        return list(reversed(lineage))
```

### 4.3.3 Padrão: Audit Trail Distribuído

```python
from opentelemetry import trace
from opentelemetry.trace import Status, StatusCode
import asyncio

class DistributedAuditTrail:
    """
    Implementa rastreamento distribuído para arquiteturas de microserviços
    com componentes de IA.
    """
    
    def __init__(self):
        self.tracer = trace.get_tracer(__name__)
        self.audit_storage = AuditStorage()
    
    async def trace_decision(self,
                            decision_name: str,
                            input_data: dict,
                            decision_logic: callable,
                            context: dict) -> any:
        """
        Executa e registra uma decisão com rastreamento completo.
        """
        with self.tracer.start_as_current_span(decision_name) as span:
            # Registrar entrada
            span.set_attribute("decision.input_hash", 
                             self._hash_input(input_data))
            span.set_attribute("decision.context_id", 
                             context.get('context_id'))
            
            # Se componente de IA, registrar parâmetros adicionais
            if context.get('uses_ai'):
                span.set_attribute("ai.model", context.get('model_version'))
                span.set_attribute("ai.temperature", context.get('temperature'))
                span.set_attribute("ai.prompt_hash", 
                                 self._hash_input(context.get('prompt', '')))
            
            try:
                # Executar decisão
                result = await decision_logic(input_data, context)
                
                # Registrar saída
                span.set_attribute("decision.output_hash",
                                 self._hash_input(result))
                span.set_attribute("decision.confidence",
                                 context.get('confidence', 1.0))
                span.set_status(Status(StatusCode.OK))
                
                return result
                
            except Exception as e:
                span.set_status(Status(StatusCode.ERROR, str(e)))
                span.record_exception(e)
                raise
    
    async def reconstruct_transaction(self, 
                                      correlation_id: str) -> Dict[str, Any]:
        """
        Reconstrói uma transação completa a partir do correlation_id.
        """
        spans = await self.audit_storage.get_spans_by_correlation(correlation_id)
        
        # Organizar em árvore de chamadas
        root = self._build_call_tree(spans)
        
        return {
            'correlation_id': correlation_id,
            'timeline': self._build_timeline(spans),
            'call_tree': root,
            'ai_decisions': self._extract_ai_decisions(spans),
            'total_duration_ms': self._calculate_duration(spans),
            'service_touchpoints': self._extract_services(spans)
        }
```

## 4.4 Implementação de Sistemas de Auditabilidade

### 4.4.1 Arquitetura de Logging

```
┌─────────────────────────────────────────────────────────────────┐
│              ARQUITETURA DE LOGGING DISTRIBUÍDO                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ Serviço A│  │ Serviço B│  │ Serviço C│                      │
│  │  (IA)    │  │(Determ.) │  │  (IA)    │                      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                      │
│       │             │             │                             │
│       └─────────────┼─────────────┘                             │
│                     ▼                                           │
│           ┌──────────────────┐                                 │
│           │  Audit Collector │                                 │
│           │  (Agente Otel)   │                                 │
│           └────────┬─────────┘                                 │
│                    │                                            │
│       ┌────────────┼────────────┐                              │
│       ▼            ▼            ▼                              │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐                        │
│  │  Trace  │ │  Métricas│ │   Logs   │                        │
│  │ Backend │ │  Backend │ │  Backend │                        │
│  │(Jaeger) │ │(Prometheus│ │(ELK)    │                        │
│  └─────────┘ └──────────┘ └──────────┘                        │
│       │            │            │                               │
│       └────────────┴────────────┘                               │
│                    │                                            │
│                    ▼                                            │
│           ┌──────────────────┐                                 │
│           │   Data Lake      │                                 │
│           │ (Armazenamento   │                                 │
│           │  Longo Prazo)    │                                 │
│           └──────────────────┘                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4.2 Formato de Evento de Auditoria

```python
from datetime import datetime
from typing import Dict, List, Optional
import json

class AuditEvent:
    """
    Evento de auditoria padronizado para sistemas com IA.
    """
    
    SCHEMA_VERSION = "2.0"
    
    def __init__(self,
                 event_type: str,
                 actor: Dict[str, str],
                 resource: Dict[str, str],
                 action: str,
                 outcome: str,
                 ai_context: Optional[Dict] = None):
        self.timestamp = datetime.utcnow().isoformat()
        self.schema_version = self.SCHEMA_VERSION
        self.event_id = self._generate_id()
        
        self.event_type = event_type
        self.actor = actor
        self.resource = resource
        self.action = action
        self.outcome = outcome
        
        # Contexto específico de IA
        self.ai_context = ai_context or {}
        
        # Metadados adicionais
        self.correlation_id: Optional[str] = None
        self.session_id: Optional[str] = None
        self.request_id: Optional[str] = None
        
        # Compliance
        self.retention_class: str = "standard"
        self.sensitivity: str = "internal"
        self.encryption_status: str = "encrypted"
    
    def to_json(self) -> str:
        """Serializa para JSON."""
        return json.dumps(self.__dict__, default=str)
    
    @classmethod
    def ai_decision(cls,
                    model_name: str,
                    model_version: str,
                    prompt_hash: str,
                    output_hash: str,
                    confidence: float,
                    latency_ms: float,
                    actor: Dict[str, str],
                    decision_type: str) -> 'AuditEvent':
        """
        Factory method para eventos de decisão de IA.
        """
        ai_context = {
            'model_name': model_name,
            'model_version': model_version,
            'prompt_hash': prompt_hash,
            'output_hash': output_hash,
            'confidence': confidence,
            'latency_ms': latency_ms,
            'decision_type': decision_type,
            'was_reviewed': False,
            'reviewer': None
        }
        
        return cls(
            event_type="AI_DECISION",
            actor=actor,
            resource={'type': 'ai_model', 'id': model_name},
            action='generate',
            outcome='success' if confidence > 0.5 else 'uncertain',
            ai_context=ai_context
        )
```

## 4.5 Ferramentas e Tecnologias

### 4.5.1 Stack de Observabilidade

| Camada | Ferramenta | Propósito |
|--------|------------|-----------|
| Rastreamento | Jaeger, Zipkin | Distributed tracing |
| Métricas | Prometheus, Datadog | Métricas de desempenho |
| Logging | ELK Stack, Splunk | Análise de logs |
| Eventos | Kafka, Event Store | Event sourcing |
| Armazenamento | S3, Glacier | Retenção longo prazo |

### 4.5.2 Integração com LLMs

```python
class LLMAuditWrapper:
    """
    Wrapper para APIs de LLM que adiciona auditabilidade.
    """
    
    def __init__(self, base_client, audit_logger):
        self.client = base_client
        self.audit = audit_logger
    
    async def generate(self, prompt: str, **kwargs) -> dict:
        """
        Gera resposta com logging completo de auditoria.
        """
        start_time = time.time()
        prompt_hash = hashlib.sha256(prompt.encode()).hexdigest()[:16]
        
        try:
            response = await self.client.generate(prompt, **kwargs)
            
            latency = (time.time() - start_time) * 1000
            output_hash = hashlib.sha256(
                response['content'].encode()
            ).hexdigest()[:16]
            
            # Log de auditoria
            await self.audit.log(AuditEvent.ai_decision(
                model_name=self.client.model_name,
                model_version=self.client.model_version,
                prompt_hash=prompt_hash,
                output_hash=output_hash,
                confidence=response.get('confidence', 0.0),
                latency_ms=latency,
                actor={'id': kwargs.get('user_id'), 'type': 'user'},
                decision_type=kwargs.get('decision_type', 'general')
            ))
            
            return response
            
        except Exception as e:
            # Log de falha
            await self.audit.log_error(
                prompt_hash=prompt_hash,
                error=str(e),
                latency_ms=(time.time() - start_time) * 1000
            )
            raise
```

## 4.6 Exercícios

1. Implemente um `ImmutableDecisionLog` que utilize uma estrutura de blockchain simplificada para garantir integridade.

2. Projete um esquema de versionamento para prompts de IA em um sistema de suporte ao cliente, permitindo reconstruir exatamente qual prompt foi usado em uma interação específica.

3. Crie um dashboard de auditoria que permita visualizar a "cadeia de custódia" de uma decisão automatizada, desde a entrada do usuário até a resposta final.

---

## Practical Considerations

- Trate auditoria como requisito: sem trilha de decisão, não há investigação nem melhoria.
- Versione prompts, políticas, modelos e fontes de contexto; a reprodutibilidade depende disso.

## Summary

- Auditabilidade exige rastreabilidade de decisões e do contexto que as condiciona.
- Evidência deve ser planejada no design: logs/telemetria sem propósito não substituem auditoria.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. OPENTELEMETRY. An Introduction to Observability for LLM-based applications using OpenTelemetry. OpenTelemetry Blog, 2024. Disponível em: https://opentelemetry.io/blog/2024/llm-observability/

3. DO, L. et al. AgentOps: Enabling Observability of LLM Agents. arXiv:2411.05285, 2024. Disponível em: https://arxiv.org/abs/2411.05285

4. MLFLOW. MLflow Tracing for LLM Observability. MLflow Documentation, 2024. Disponível em: https://mlflow.org/docs/latest/llms/tracing/index.html

5. NEPTUNE.AI. LLM Observability: Fundamentals, Practices, and Tools. Neptune Blog, 2024. Disponível em: https://neptune.ai/blog/llm-observability

6. SIGNOZ. Understanding LLM Observability - Key Insights, Best Practices, & Tools. Signoz Blog, 2024. Disponível em: https://signoz.io/blog/llm-observability

7. CLOUD SECURITY ALLIANCE. Enhancing AI Reliability: Introducing the LLM Observability & Trust API. CSA Blog, 2024. Disponível em: https://cloudsecurityalliance.org/blog/2024/07/19/enhancing-ai-reliability-introducing-the-llm-observability-trust-api

8. LANGFUSE. OpenTelemetry (OTel) for LLM Observability. Langfuse Blog, 2024. Disponível em: https://langfuse.com/blog/2024-10-opentelemetry-for-llm-observability

9. VELLUM AI. A Guide to LLM Observability. Vellum Blog, 2025. Disponível em: https://www.vellum.ai/blog/a-guide-to-llm-observability

*SWEBOK-AI v5.0 - Software Architecture*

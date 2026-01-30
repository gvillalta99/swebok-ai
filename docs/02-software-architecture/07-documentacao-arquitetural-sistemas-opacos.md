# Seção 7: Documentação Arquitetural para Sistemas Opaços

## Overview

Esta seção discute documentação como mecanismo de controle e aprendizado em sistemas opacos: registrar decisões, suposições, limites e evidências para reduzir risco de manutenção e auditoria.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Especificar quais decisões e evidências devem ser documentadas em sistemas híbridos
2. Usar ADRs e registros de contexto para preservar racionalidade e responsabilidade
3. Projetar documentação “viva” que incorpore comportamentos observados e incidentes

## 7.1 Introdução

A documentação arquitetural tradicional assume que o sistema é compreensível através de análise estática de código e diagramas de componentes. Na era dos LLMs, onde componentes geram comportamentos dinamicamente baseados em contextos complexos que não estão explicitamente codificados, a documentação precisa evoluir.

A **Documentação Arquitetural para Sistemas Opaços** estabelece padrões para documentar não apenas estruturas estáticas, mas também comportamentos emergentes, dependências contextuais, e limites de confiança de sistemas que incorporam componentes de IA.

## 7.2 O Desafio da Opacidade

### 7.2.1 Fontes de Opacidade

```
┌─────────────────────────────────────────────────────────────────┐
│              FONTES DE OPACIDADE EM SISTEMAS COM IA             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Opacidade do Modelo                                            │
│  ├── Pesos e ativações não interpretáveis diretamente          │
│  ├── Comportamento emergente não explicitamente programado     │
│  └── Dependência de vasto corpus de treinamento não visível    │
│                                                                 │
│  Opacidade do Contexto                                          │
│  ├── Janela de contexto que varia dinamicamente                │
│  ├── Retrieval de informações que depende de embeddings        │
│  └── Estado conversacional que evolui implicitamente           │
│                                                                 │
│  Opacidade de Composição                                        │
│  ├── Interações complexas entre múltiplos agentes              │
│  ├── Efeitos de ordem em cadeias de prompts                    │
│  └── Feedback loops entre componentes                          │
│                                                                 │
│  Opacidade Temporal                                             │
│  ├── Mudanças de comportamento com atualizações de modelo      │
│  ├── Degradação gradual de performance não monitorada          │
│  └── Drift de conceito nos dados de contexto                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2.2 Níveis de Opacidade

| Nível | Descrição | Estratégia de Documentação |
|-------|-----------|---------------------------|
| Transparente | Comportamento determinístico, código legível | Documentação tradicional |
| Translúcido | Comportamento compreensível com análise | Documentação de algoritmo |
| Opaco | Comportamento verificável apenas empiricamente | Documentação de propriedades |
| Profundamente Opaco | Comportamento não totalmente verificável | Documentação de limites e contenção |

## 7.3 Padrões de Documentação

### 7.3.1 Padrão: Documentação por Contrato

```python
from dataclasses import dataclass
from typing import List, Dict, Optional
from enum import Enum

class BehaviorGuarantee(Enum):
    DETERMINISTIC = "comportamento_idêntico_para_mesma_entrada"
    BOUNDED = "comportamento_dentro_de_limites_definidos"
    PROBABILISTIC = "comportamento_com_distribuição_conhecida"
    UNCERTAIN = "comportamento_não_garantido"

@dataclass
class ComponentContract:
    """
    Documentação de componente baseada em contratos
    em vez de implementação.
    """
    component_id: str
    component_type: str  # 'deterministic' | 'llm_based' | 'hybrid'
    
    # Contrato de Entrada
    input_schema: Dict
    input_constraints: List[str]
    input_examples: List[dict]
    
    # Contrato de Saída
    output_schema: Dict
    output_guarantees: List[str]
    output_bounds: Optional[Dict]
    
    # Garantias de Comportamento
    behavior_guarantee: BehaviorGuarantee
    confidence_range: Optional[tuple]  # (min, max)
    latency_bounds: tuple  # (p50, p95, p99)
    
    # Limitações Conhecidas
    known_limitations: List[str]
    failure_modes: List[str]
    edge_cases: List[str]
    
    # Dependências
    required_context: List[str]
    external_dependencies: List[str]
    
    def to_documentation(self) -> str:
        """Gera documentação em formato markdown."""
        return f"""
# Contrato: {self.component_id}

## Tipo: {self.component_type}

## Entrada
### Schema
```json
{json.dumps(self.input_schema, indent=2)}
```

### Restrições
{chr(10).join(f'- {c}' for c in self.input_constraints)}

## Saída
### Schema
```json
{json.dumps(self.output_schema, indent=2)}
```

### Garantias
- Tipo de garantia: {self.behavior_guarantee.value}
- Confiança: {self.confidence_range[0] if self.confidence_range else 'N/A'} - {self.confidence_range[1] if self.confidence_range else 'N/A'}
- Latência esperada: p50={self.latency_bounds[0]}ms, p95={self.latency_bounds[1]}ms, p99={self.latency_bounds[2]}ms

## Limitações Conhecidas
{chr(10).join(f'- {l}' for l in self.known_limitations)}

## Modos de Falha
{chr(10).join(f'- {f}' for f in self.failure_modes)}

## Casos de Borda
{chr(10).join(f'- {e}' for e in self.edge_cases)}
"""

# Exemplo de Contrato para Componente de IA
sentiment_classifier_contract = ComponentContract(
    component_id="sentiment_classifier_v2",
    component_type="llm_based",
    input_schema={
        "text": "string (max 1000 chars)",
        "language": "string (ISO 639-1)"
    },
    input_constraints=[
        "Texto deve ser em linguagem natural",
        "Máximo de 1000 caracteres",
        "Idioma deve ser suportado"
    ],
    input_examples=[
        {"text": "Ótimo produto!", "language": "pt"},
        {"text": "Very disappointed", "language": "en"}
    ],
    output_schema={
        "sentiment": "string (POSITIVE | NEGATIVE | NEUTRAL)",
        "confidence": "float (0.0 - 1.0)",
        "explanation": "string (opcional)"
    },
    output_guarantees=[
        "Sentiment será uma das três categorias",
        "Confidence sempre entre 0 e 1",
        "Explicação fornecida quando confidence < 0.8"
    ],
    output_bounds={
        "confidence": {"min": 0.0, "max": 1.0}
    },
    behavior_guarantee=BehaviorGuarantee.PROBABILISTIC,
    confidence_range=(0.6, 0.95),
    latency_bounds=(50, 150, 300),
    known_limitations=[
        "Pode confundir sarcasmo com sentimento literal",
        "Precisão reduzida para linguagem técnica especializada",
        "Não detecta nuance cultural"
    ],
    failure_modes=[
        "Timeout após 500ms",
        "Resposta fora do schema (tratado por validação)",
        "Baixa confiança (< 0.6)"
    ],
    edge_cases=[
        "Textos misturando múltiplos idiomas",
        "Textos extremamente curtos (< 3 palavras)",
        "Uso de gírias regionais não padronizadas"
    ],
    required_context=["idioma", "dominio_aplicacao"],
    external_dependencies=["openai_api", "language_detector"]
)
```

### 7.3.2 Padrão: Decision Record Arquitetural

```python
from datetime import datetime
from typing import List, Optional

class ArchitectureDecisionRecord:
    """
    Registro de decisão arquitetural para sistemas com IA.
    Estende ADR tradicional com considerações específicas de IA.
    """
    
    def __init__(self,
                 adr_id: str,
                 title: str,
                 context: str,
                 decision: str,
                 consequences: dict):
        self.adr_id = adr_id
        self.title = title
        self.date = datetime.now()
        self.status = "proposed"
        
        self.context = context
        self.decision = decision
        self.consequences = consequences
        
        # Campos específicos para IA
        self.ai_considerations = {
            'model_selection_rationale': '',
            'fallback_strategy': '',
            'supervision_requirements': [],
            'retraining_triggers': [],
            'performance_thresholds': {}
        }
        
        self.risks = []
        self.mitigations = []
    
    def to_markdown(self) -> str:
        """Gera ADR em formato markdown."""
        return f"""# ADR {self.adr_id}: {self.title}

Data: {self.date.strftime('%Y-%m-%d')}
Status: {self.status}

## Contexto

{self.context}

## Decisão

{self.decision}

## Considerações Específicas de IA

### Seleção do Modelo
{self.ai_considerations['model_selection_rationale']}

### Estratégia de Fallback
{self.ai_considerations['fallback_strategy']}

### Requisitos de Supervisão
{chr(10).join(f'- {req}' for req in self.ai_considerations['supervision_requirements'])}

### Gatilhos de Retreinamento
{chr(10).join(f'- {trigger}' for trigger in self.ai_considerations['retraining_triggers'])}

### Limiares de Performance
{chr(10).join(f'- {k}: {v}' for k, v in self.ai_considerations['performance_thresholds'].items())}

## Consequências

### Positivas
{chr(10).join(f'- {c}' for c in self.consequences.get('positive', []))}

### Negativas
{chr(10).join(f'- {c}' for c in self.consequences.get('negative', []))}

### Neutras
{chr(10).join(f'- {c}' for c in self.consequences.get('neutral', []))}

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
{chr(10).join(f'| {r["description"]} | {r["probability"]} | {r["impact"]} | {r["mitigation"]} |' for r in self.risks)}

## Alternativas Consideradas

{chr(10).join(f'### {alt["option"]}\\n{alt["rationale"]}\\n' for alt in self.consequences.get('alternatives', []))}
"""

# Exemplo de ADR para Sistema com IA
adr_llm_integration = ArchitectureDecisionRecord(
    adr_id="042",
    title="Integração de LLM para Geração de Respostas de Suporte",
    context="""
O sistema de suporte atual utiliza templates estáticos para respostas,
resultando em baixa satisfação do cliente (NPS 35). Análise mostra que
80% das perguntas são recorrentes mas requerem personalização contextual.
""",
    decision="""
Integrar LLM (GPT-4) para geração dinâmica de respostas, mantendo:
1. Camada de validação determinística para dados sensíveis
2. Fallback para templates em caso de baixa confiança
3. Revisão humana obrigatória para casos de alto risco
""",
    consequences={
        'positive': [
            'Personalização contextual de respostas',
            'Redução de 60% no tempo de primeira resposta',
            'Capacidade de lidar com variações linguísticas'
        ],
        'negative': [
            'Latência adicional (média +200ms)',
            'Custo operacional variável',
            'Necessidade de treinamento em prompt engineering'
        ],
        'neutral': [
            'Manutenção de templates legados durante transição'
        ],
        'alternatives': [
            {
                'option': 'Manter sistema template-based',
                'rationale': 'Rejeitado: não atende expectativa de personalização do cliente'
            },
            {
                'option': 'Fine-tuning de modelo próprio',
                'rationale': 'Adiado: requer volume de dados que ainda não temos'
            }
        ]
    }
)

adr_llm_integration.ai_considerations = {
    'model_selection_rationale': 'GPT-4 selecionado por equilíbrio entre qualidade e latência. Claude considerado mas API menos madura.',
    'fallback_strategy': '1) Cache de respostas similares 2) Templates estáticos 3) Escalada humana',
    'supervision_requirementss': [
        'Aprovação humana para assuntos financeiros',
        'Revisão de respostas com confidence < 0.8',
        'Auditoria mensal de amostra aleatória'
    ],
    'retraining_triggers': [
        'Degradação de satisfação abaixo de 70%',
        'Mudança em produtos ou políticas',
        'Novos tipos de questões > 10% do volume'
    ],
    'performance_thresholds': {
        'latency_p95': '500ms',
        'availability': '99.9%',
        'satisfaction_score': '4.0/5.0',
        'escalation_rate': '< 15%'
    }
}
```

### 7.3.3 Padrão: Living Documentation

```python
from typing import Dict, List
import asyncio

class LivingArchitectureDocumentation:
    """
    Documentação viva que se atualiza automaticamente
    com base em dados de runtime.
    """
    
    def __init__(self, monitoring_system, model_registry):
        self.monitoring = monitoring_system
        self.registry = model_registry
        self.documentation = {}
    
    async def generate_component_doc(self, component_id: str) -> Dict:
        """
        Gera documentação atualizada de componente com
        dados de produção.
        """
        # Obter métricas atuais
        metrics = await self.monitoring.get_component_metrics(component_id)
        
        # Obter informações do modelo
        model_info = await self.registry.get_model_info(component_id)
        
        # Gerar documentação
        doc = {
            'component_id': component_id,
            'last_updated': datetime.now().isoformat(),
            'model_info': {
                'version': model_info['version'],
                'deployment_date': model_info['deployed_at'],
                'training_data_hash': model_info['training_data_hash']
            },
            'current_performance': {
                'latency_p50': metrics['latency']['p50'],
                'latency_p95': metrics['latency']['p95'],
                'error_rate': metrics['errors']['rate'],
                'throughput': metrics['throughput']
            },
            'observed_behavior': {
                'confidence_distribution': metrics['confidence']['distribution'],
                'fallback_rate': metrics['fallback']['rate'],
                'hallucination_rate': metrics['quality']['hallucination_rate'],
                'user_satisfaction': metrics['feedback']['satisfaction']
            },
            'drift_detection': {
                'input_drift': metrics['drift']['input_score'],
                'output_drift': metrics['drift']['output_score'],
                'concept_drift': metrics['drift']['concept_score'],
                'last_calibration': metrics['drift']['last_calibration']
            },
            'operational_characteristics': self._infer_characteristics(metrics)
        }
        
        return doc
    
    def _infer_characteristics(self, metrics: Dict) -> List[str]:
        """
        Infere características operacionais a partir de métricas.
        """
        characteristics = []
        
        # Analisar padrões de latência
        if metrics['latency']['p99'] > metrics['latency']['p50'] * 3:
            characteristics.append(
                "Alta variabilidade de latência - considerar implementar circuit breaker"
            )
        
        # Analisar confiança
        if metrics['confidence']['mean'] < 0.7:
            characteristics.append(
                "Baixa confiança média - revisar prompts ou considerar retraining"
            )
        
        # Analisar fallback
        if metrics['fallback']['rate'] > 0.1:
            characteristics.append(
                "Alta taxa de fallback - verificar estabilidade do serviço de IA"
            )
        
        return characteristics
    
    async def generate_architecture_overview(self) -> str:
        """
        Gera visão geral da arquitetura com estado atual.
        """
        components = await self.registry.list_components()
        
        overview = {
            'timestamp': datetime.now().isoformat(),
            'total_components': len(components),
            'ai_components': len([c for c in components if c['uses_ai']]),
            'deterministic_components': len([c for c in components if not c['uses_ai']]),
            'system_health': await self._calculate_system_health(),
            'recent_changes': await self._get_recent_changes(),
            'known_issues': await self._get_active_incidents()
        }
        
        return self._format_overview_markdown(overview)
```

## 7.4 Visualização de Arquiteturas Híbridas

### 7.4.1 Diagramas de Componente Estendidos

```
┌─────────────────────────────────────────────────────────────────┐
│              NOTAÇÃO PARA COMPONENTES DE IA                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Componente Determinístico:                                     │
│  ┌─────────────────┐                                           │
│  │   Processador   │                                           │
│  │   de Pagamento  │                                           │
│  └─────────────────┘                                           │
│                                                                 │
│  Componente de IA:                                              │
│  ╔═══════════════════╗                                         │
│  ║  Classificador    ║                                         │
│  ║  de Intenção [AI] ║                                         │
║  ╚═══════════════════╝                                         │
│  ┌─────────────────┐                                           │
│  │ Confidence: 0.85 │  ← Indicador de confiança               │
│  └─────────────────┘                                           │
│                                                                 │
│  Fronteira de Contenção:                                        │
│  ┌─────────────────┐                                           │
│  │                 │                                           │
│  │   [CRITICAL]    │  ← Zona crítica (não-IA)                │
│  │                 │                                           │
│  └─────────────────┘                                           │
│                                                                 │
│  Comunicação Supervisionada:                                    │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─▶  ← Requer aprovação humana               │
│                                                                 │
│  Comunicação com Fallback:                                      │
│  ──────────▶┬──────────  ← Seta dupla indica fallback        │
│             │                                                   │
│             ▼                                                   │
│  ┌─────────────────┐                                           │
│  │    Fallback     │                                           │
│  └─────────────────┘                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 7.5 Exercícios

1. Crie um `ComponentContract` para um sistema de análise de sentimentos em mídias sociais, identificando todas as limitações e casos de borda.

2. Escreva um ADR para a decisão de usar (ou não usar) IA em um componente crítico de um sistema financeiro.

3. Projete um sistema de `LivingArchitectureDocumentation` que capture automaticamente a "surpresa operacional" (comportamentos observados que não estavam documentados).

---

## Practical Considerations

- Documente decisões como contratos: o que foi assumido, o que foi excluído e como validar em produção.
- Preserve rastros de contexto (prompts, políticas, fontes) para evitar “arqueologia” durante incidentes.

## Summary

- Em sistemas opacos, documentação é parte do mecanismo de governança e manutenção.
- ADRs e documentação viva reduzem custo de verificação e tempo de resposta a incidentes.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Architecture*

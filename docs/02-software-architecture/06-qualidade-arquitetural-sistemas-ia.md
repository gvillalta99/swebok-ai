# Seção 6: Qualidade Arquitetural em Sistemas com IA

## Overview

Esta seção adapta atributos de qualidade arquitetural (confiabilidade, segurança, manutenibilidade, desempenho) para sistemas com componentes estocásticos, enfatizando verificabilidade, observabilidade e governança.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Avaliar trade-offs arquiteturais específicos de componentes de IA (variabilidade, opacidade, dependência de contexto)
2. Definir métricas e mecanismos de monitoramento para qualidade em produção
3. Aplicar avaliações arquiteturais (ex.: ATAM adaptado) em sistemas híbridos

## 6.1 Introdução

A qualidade arquitetural em sistemas tradicionais é medida através de atributos como performance, disponibilidade, escalabilidade e segurança. Na era dos LLMs, novos atributos emergem: explicabilidade, calibragem de confiança, auditabilidade de decisões, e resiliência a comportamentos emergentes.

A **Qualidade Arquitetural em Sistemas com IA** estende os frameworks tradicionais de qualidade para incorporar as propriedades únicas de sistemas híbridos, estabelecendo métricas, trade-offs e padrões específicos para este novo paradigma.

## 6.2 Atributos de Qualidade Estendidos

### 6.2.1 Modelo de Qualidade Híbrida

```
┌─────────────────────────────────────────────────────────────────┐
│         ATRIBUTOS DE QUALIDADE EM SISTEMAS COM IA               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRADICIONAIS (Refinados)                                       │
│  ├── Performance: Latência P99, throughput, uso de recursos    │
│  ├── Disponibilidade: Uptime, MTTR, circuit breakers           │
│  ├── Escalabilidade: Horizontal, vertical, granularidade       │
│  ├── Segurança: Proteção contra injeção de prompts             │
│  └── Manutenibilidade: Versionamento de modelos, rollback      │
│                                                                 │
│  NOVOS (Específicos de IA)                                      │
│  ├── Explicabilidade: Transparência de decisões                │
│  ├── Calibragem: Alinhamento confiança-acurácia                │
│  ├── Robustez a Hallucination: Detecção e mitigação            │
│  ├── Fairness: Ausência de viés em decisões automatizadas      │
│  ├── Contenção: Isolamento de falhas de componentes de IA      │
│  └── Evolvability: Adaptação a novos modelos                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Métricas de Qualidade

```python
from dataclasses import dataclass
from typing import Dict, List, Optional
from datetime import datetime

@dataclass
class QualityMetrics:
    """
    Métricas abrangentes de qualidade para sistemas com IA.
    """
    # Métricas Tradicionais
    availability: float  # Percentual de uptime
    latency_p50: float  # ms
    latency_p95: float  # ms
    latency_p99: float  # ms
    error_rate: float  # Percentual
    throughput: float  # Requisições/segundo
    
    # Métricas de IA - Explicabilidade
    explanation_coverage: float  # % de decisões com explicação
    explanation_clarity_score: float  # 0-1
    user_comprehension_rate: float  # % de usuários que entenderam
    
    # Métricas de IA - Calibragem
    calibration_error: float  # Expected Calibration Error
    confidence_accuracy_correlation: float  # Correlação de Pearson
    
    # Métricas de IA - Robustez
    hallucination_rate: float  # % de respostas com informação incorreta
    contradiction_rate: float  # % de respostas inconsistentes
    fallback_trigger_rate: float  # % de vezes que fallback foi usado
    
    # Métricas de IA - Fairness
    demographic_parity_difference: float
    equalized_odds_difference: float
    
    # Métricas de IA - Contenção
    cascade_failure_rate: float  # % de falhas que se propagaram
    recovery_time_ms: float  # Tempo para recuperação
    
    # Metadata
    timestamp: datetime
    sample_size: int

class QualityDashboard:
    """
    Dashboard de qualidade para sistemas com IA.
    """
    
    THRESHOLDS = {
        'availability': {'good': 0.999, 'warning': 0.99, 'critical': 0.95},
        'latency_p95': {'good': 200, 'warning': 500, 'critical': 1000},
        'hallucination_rate': {'good': 0.01, 'warning': 0.05, 'critical': 0.10},
        'calibration_error': {'good': 0.05, 'warning': 0.10, 'critical': 0.15},
        'explanation_coverage': {'good': 0.95, 'warning': 0.80, 'critical': 0.60}
    }
    
    def assess_quality(self, metrics: QualityMetrics) -> Dict:
        """
        Avalia qualidade completa do sistema.
        """
        assessment = {
            'overall_score': 0.0,
            'categories': {},
            'alerts': [],
            'recommendations': []
        }
        
        # Avaliar cada categoria
        assessment['categories']['reliability'] = self._assess_reliability(metrics)
        assessment['categories']['performance'] = self._assess_performance(metrics)
        assessment['categories']['ai_quality'] = self._assess_ai_quality(metrics)
        
        # Calcular score geral
        weights = {'reliability': 0.3, 'performance': 0.3, 'ai_quality': 0.4}
        assessment['overall_score'] = sum(
            assessment['categories'][cat]['score'] * weight
            for cat, weight in weights.items()
        )
        
        # Gerar alertas
        assessment['alerts'] = self._generate_alerts(metrics)
        
        # Gerar recomendações
        assessment['recommendations'] = self._generate_recommendations(metrics)
        
        return assessment
    
    def _assess_ai_quality(self, metrics: QualityMetrics) -> Dict:
        """
        Avalia qualidade específica de componentes de IA.
        """
        scores = {
            'explicabilidade': metrics.explanation_coverage * 0.5 + 
                             metrics.explanation_clarity_score * 0.5,
            'calibragem': 1 - metrics.calibration_error,
            'robustez': 1 - (metrics.hallucination_rate + 
                           metrics.contradiction_rate) / 2,
            'fairness': 1 - max(metrics.demographic_parity_difference,
                              metrics.equalized_odds_difference)
        }
        
        return {
            'score': sum(scores.values()) / len(scores),
            'components': scores,
            'status': 'good' if all(s > 0.8 for s in scores.values()) 
                     else 'warning' if all(s > 0.6 for s in scores.values())
                     else 'critical'
        }
```

## 6.3 Trade-offs Arquiteturais

### 6.3.1 Triângulo de Trade-offs em Sistemas com IA

```
┌─────────────────────────────────────────────────────────────────┐
│              TRIÂNGULO DE TRADE-OFFS DE IA                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        AUTONOMIA                                │
│                           ▲                                     │
│                          /│\                                    │
│                         / │ \                                   │
│                        /  │  \                                  │
│                       /   │   \                                 │
│                      /    │    \                                │
│                     /     │     \                               │
│                    /      │      \                              │
│                   /       │       \                             │
│                  /        │        \                            │
│                 /         │         \                           │
│                /          │          \                          │
│               /           │           \                         │
│              /            │            \                        │
│             /             │             \                       │
│            /              │              \                      │
│           ▼───────────────┴───────────────▼                     │
│      CONTROLE                                    QUALIDADE      │
│      HUMANO                                      DA SAÍDA       │
│                                                                 │
│  Trade-offs típicos:                                            │
│  • Mais Autonomia ↔ Menos Controle Humano                      │
│  • Mais Controle ↔ Maior Latência, Menor Throughput            │
│  • Maior Qualidade ↔ Mais Recursos Computacionais              │
│  • Mais Autonomia ↔ Risco de Qualidade Incerta                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3.2 Matriz de Decisão Arquitetural

```python
from enum import Enum
from typing import Dict, List

class ArchitecturalDecision:
    """
    Representa uma decisão arquitetural com análise de trade-offs.
    """
    
    def __init__(self,
                 decision_id: str,
                 context: str,
                 options: List[str],
                 selected_option: str,
                 rationale: str):
        self.decision_id = decision_id
        self.context = context
        self.options = options
        self.selected_option = selected_option
        self.rationale = rationale
        self.trade_offs = []
        self.quality_impact = {}
    
    def add_trade_off(self, 
                     attribute: str,
                     option_a_impact: float,
                     option_b_impact: float,
                     description: str):
        """
        Adiciona análise de trade-off.
        """
        self.trade_offs.append({
            'attribute': attribute,
            'impacts': {
                self.options[0]: option_a_impact,
                self.options[1]: option_b_impact
            },
            'description': description
        })

# Exemplos de Decisões Arquiteturais
DECISIONS = {
    'ai_model_selection': ArchitecturalDecision(
        decision_id='ADR-001',
        context='Seleção de modelo de IA para sistema de suporte',
        options=['GPT-4 (Cloud)', 'Llama 3 (On-Premise)'],
        selected_option='Hybrid Approach',
        rationale='Equilibrar qualidade com requisitos de privacidade'
    ),
    
    'supervision_level': ArchitecturalDecision(
        decision_id='ADR-002',
        context='Nível de supervisão humana para decisões de IA',
        options=['Full Automation', 'Human-in-the-Loop', 'Human-on-the-Loop'],
        selected_option='Context-Dependent Hybrid',
        rationale='Diferentes níveis baseados em criticidade e confiança'
    ),
    
    'response_caching': ArchitecturalDecision(
        decision_id='ADR-003',
        context='Estratégia de cache para respostas de IA',
        options=['No Cache', 'Deterministic Cache', 'Semantic Cache'],
        selected_option='Semantic Cache with TTL',
        rationale='Balancear consistência com eficiência'
    )
}
```

## 6.4 Táticas de Qualidade

### 6.4.1 Táticas para Explicabilidade

```python
class ExplainabilityTactics:
    """
    Táticas arquiteturais para melhorar explicabilidade.
    """
    
    TACTICS = {
        'attention_visualization': {
            'description': 'Visualizar atenção do modelo na entrada',
            'applicability': ['Transformers', 'NLP tasks'],
            'implementation_complexity': 'medium',
            'effectiveness': 'high'
        },
        'feature_importance': {
            'description': 'Mostrar importância de features na decisão',
            'applicability': ['Tabular data', 'Classification'],
            'implementation_complexity': 'low',
            'effectiveness': 'medium'
        },
        'counterfactual_explanation': {
            'description': 'Mostrar o que mudaria o resultado',
            'applicability': ['Decision systems', 'Recommendations'],
            'implementation_complexity': 'high',
            'effectiveness': 'high'
        },
        'provenance_tracking': {
            'description': 'Rastrear origem de cada informação',
            'applicability': ['RAG systems', 'Knowledge bases'],
            'implementation_complexity': 'medium',
            'effectiveness': 'high'
        }
    }
    
    def select_tactics(self, 
                      system_type: str,
                      user_requirements: List[str],
                      constraints: List[str]) -> List[Dict]:
        """
        Seleciona táticas apropriadas para o contexto.
        """
        applicable = []
        
        for tactic_id, tactic in self.TACTICS.items():
            if system_type in tactic['applicability']:
                # Verificar restrições
                if 'latency_critical' in constraints and \
                   tactic['implementation_complexity'] == 'high':
                    continue
                
                applicable.append({
                    'id': tactic_id,
                    **tactic
                })
        
        # Ordenar por efetividade
        applicable.sort(key=lambda x: x['effectiveness'], reverse=True)
        
        return applicable
```

### 6.4.2 Táticas para Robustez

```python
class RobustnessTactics:
    """
    Táticas arquiteturais para robustez a falhas de IA.
    """
    
    @staticmethod
    def redundancy_with_voting(models: List, input_data: dict) -> dict:
        """
        Tática: Redundância com votação majoritária.
        """
        responses = []
        for model in models:
            try:
                response = model.generate(input_data)
                responses.append(response)
            except Exception:
                continue
        
        # Análise de consenso
        if len(responses) >= 2:
            consensus = analyze_consensus(responses)
            return {
                'output': consensus['agreed_output'],
                'confidence': consensus['agreement_rate'],
                'divergence_detected': consensus['has_divergence'],
                'sources': len(responses)
            }
        
        # Fallback se insuficiente respostas
        return fallback_response()
    
    @staticmethod
    def input_validation_layer(raw_input: str, 
                               validators: List[callable]) -> dict:
        """
        Tática: Validação em camadas da entrada.
        """
        results = {'passed': [], 'failed': []}
        
        for validator in validators:
            result = validator(raw_input)
            if result['valid']:
                results['passed'].append(validator.__name__)
            else:
                results['failed'].append({
                    'validator': validator.__name__,
                    'issue': result['issue']
                })
        
        # Decisão baseada em validações
        if len(results['failed']) == 0:
            return {'status': 'accepted', 'sanitized_input': raw_input}
        elif len(results['failed']) <= 1:
            return {'status': 'warn', 'issues': results['failed']}
        else:
            return {'status': 'rejected', 'issues': results['failed']}
    
    @staticmethod
    def output_verification(raw_output: str,
                           verification_chain: List[callable]) -> dict:
        """
        Tática: Verificação em cadeia da saída.
        """
        context = {'original_output': raw_output, 'verified': True}
        
        for verifier in verification_chain:
            result = verifier(context)
            if not result['passed']:
                return {
                    'status': 'failed_verification',
                    'failed_at': verifier.__name__,
                    'reason': result['reason'],
                    'suggested_action': result.get('action', 'reject')
                }
            context.update(result.get('enrichment', {}))
        
        return {
            'status': 'verified',
            'enriched_output': context,
            'verification_chain': [v.__name__ for v in verification_chain]
        }
```

## 6.5 Avaliação de Arquitetura

### 6.5.1 Método de Avaliação ATAM Adaptado

```python
class ATAMForAISystems:
    """
    Adaptação do método ATAM (Architecture Tradeoff Analysis Method)
    para sistemas com IA.
    """
    
    def __init__(self, architecture_description: dict):
        self.architecture = architecture_description
        self.scenarios = []
        self.utility_tree = None
    
    def define_ai_specific_scenarios(self) -> List[dict]:
        """
        Define cenários de análise específicos para sistemas com IA.
        """
        return [
            {
                'id': 'S-AI-001',
                'name': 'Degradação Graciosa',
                'stimulus': 'Modelo de IA retorna resposta de baixa confiança',
                'environment': 'Operação normal',
                'response': 'Sistema transita para fallback determinístico',
                'measure': 'Latência < 500ms, disponibilidade mantida'
            },
            {
                'id': 'S-AI-002',
                'name': 'Detecção de Hallucination',
                'stimulus': 'Sistema detecta potencial informação incorreta',
                'environment': 'Processamento de consulta',
                'response': 'Marcação de incerteza e oferta de verificação',
                'measure': 'Taxa de detecção > 90%, falso positivo < 5%'
            },
            {
                'id': 'S-AI-003',
                'name': 'Adaptação a Novo Modelo',
                'stimulus': 'Novo modelo de IA disponibilizado',
                'environment': 'Produção',
                'response': 'Deployment canário com rollback automático',
                'measure': 'Rollback em < 30s se anomalia detectada'
            },
            {
                'id': 'S-AI-004',
                'name': 'Explicação Sob Demanda',
                'stimulus': 'Usuário solicita explicação de decisão',
                'environment': 'Consulta histórica',
                'response': 'Recuperação de contexto e geração de explicação',
                'measure': 'Latência < 2s, cobertura > 95%'
            }
        ]
    
    def analyze_trade_off_points(self) -> List[dict]:
        """
        Identifica pontos de trade-off na arquitetura.
        """
        trade_off_points = []
        
        # Analisar cada componente
        for component in self.architecture.get('components', []):
            if component.get('uses_ai'):
                trade_off_points.append({
                    'component': component['name'],
                    'type': 'ai_integration',
                    'trade_offs': self._analyze_ai_trade_offs(component)
                })
        
        return trade_off_points
    
    def _analyze_ai_trade_offs(self, component: dict) -> List[dict]:
        """Analisa trade-offs específicos de componentes de IA."""
        return [
            {
                'attribute_a': 'autonomia',
                'attribute_b': 'controle',
                'sensitivity': 'high',
                'rationale': 'Maior autonomia reduz controle humano direto'
            },
            {
                'attribute_a': 'qualidade_resposta',
                'attribute_b': 'latencia',
                'sensitivity': 'medium',
                'rationale': 'Modelos maiores produzem melhores respostas mas são mais lentos'
            },
            {
                'attribute_a': 'explicabilidade',
                'attribute_b': 'performance',
                'sensitivity': 'medium',
                'rationale': 'Geração de explicações adiciona overhead'
            }
        ]
```

## 6.6 Exercícios

1. Projete um conjunto de métricas de qualidade para um sistema de recomendação de conteúdo com IA, considerando tanto atributos tradicionais quanto específicos de IA.

2. Aplique o método ATAM adaptado para analisar os trade-offs de arquitetura de um chatbot de atendimento ao cliente.

3. Implemente um `QualityDashboard` que monitore em tempo real as métricas de calibragem de confiança de um sistema de IA.

---

## Practical Considerations

- Defina atributos de qualidade com métricas observáveis e thresholds; qualidade sem medição vira opinião.
- Para IA, inclua métricas de deriva, incerteza e taxa de fallback como parte do SLO.

## Summary

- Qualidade arquitetural em sistemas com IA depende de verificabilidade e observabilidade em escala.
- Trade-offs devem ser tratados explicitamente e reavaliados conforme modelo e contexto evoluem.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. GAL, Y. Detecting hallucinations in large language models using semantic entropy. Nature, 2024. DOI: 10.1038/s41586-024-07421-0

3. A Survey of Automatic Hallucination Evaluation on Natural Language Generation. arXiv:2404.12041, 2024. Disponível em: https://arxiv.org/abs/2404.12041

4. The Hallucinations Leaderboard -- An Open Effort to Measure Hallucinations in Large Language Models. arXiv:2404.05904, 2024. Disponível em: https://arxiv.org/abs/2404.05904

5. HalluMeasure: Fine-grained Hallucination Measurement Using Chain-of-Thought Reasoning. ACL Anthology, 2024. Disponível em: https://aclanthology.org/2024.emnlp-main.837/

6. VALENTIN, S. et al. Cost-Effective Hallucination Detection for LLMs. arXiv:2407.21424, 2024. Disponível em: https://arxiv.org/abs/2407.21424

7. RefChecker: Reference-based Fine-grained Hallucination Checker and Benchmark for Large Language Models. arXiv:2405.14486, 2024. Disponível em: https://arxiv.org/abs/2405.14486

8. InterrogateLLM: Zero-Resource Hallucination Detection in LLM-Generated Answers. arXiv:2403.02889, 2024. Disponível em: https://arxiv.org/abs/2403.02889

9. Halu-J: Critique-Based Hallucination Judge. arXiv:2407.12943, 2024. Disponível em: https://arxiv.org/abs/2407.12943

*SWEBOK-AI v5.0 - Software Architecture*

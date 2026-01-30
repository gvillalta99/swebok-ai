# Seção 1: Fundamentos do Design na Era dos LLMs

## Overview

Esta seção introduz como o design de software muda quando parte do comportamento e da implementação pode ser gerada ou ajustada por sistemas probabilísticos. O foco se desloca para verificabilidade, limites e supervisão humana.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar por que design precisa tratar incerteza como requisito (e não como exceção)
2. Identificar decisões de design que exigem componentes determinísticos e contratos explícitos
3. Definir critérios de verificabilidade e mecanismos de fallback para componentes de IA

## 1.1 Introdução: A Transformação do Design

O design de software tradicional era um ato criativo de tradução: o engenheiro transformava requisitos em estruturas de código através de processos mentais de decomposição, abstração e composição. Cada linha de código era uma decisão consciente, refletindo o entendimento do problema e a expertise técnica do desenvolvedor.

Na era dos Large Language Models (LLMs), esse paradigma é profundamente alterado. O engenheiro de software torna-se, primariamente, um **curador**: alguém que avalia, seleciona, refina e integra código gerado automaticamente, aplicando julgamento técnico para garantir que soluções automáticas atendam a restrições de qualidade, segurança e manutenibilidade.

### 1.1.1 O Paradigma da Curadoria

```
┌─────────────────────────────────────────────────────────────────┐
│           PARADIGMA TRADICIONAL DE DESIGN                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Requisitos ──▶ Análise ──▶ Design Mental ──▶ Codificação     │
│                                 │                      │        │
│                                 │                      ▼        │
│                                 │              Código Manual    │
│                                 │              (100% humano)    │
│                                 │                               │
│  Características:                                               │
│  • Cada linha é decisão consciente                             │
│  • Raciocínio explícito no código                              │
│  • Custo de escrita > Custo de leitura                         │
│  • Expertise demonstrada na sintaxe                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           PARADIGMA DE CURADORIA (SWEBOK-AI v5.0)               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Requisitos ──▶ Especificação ──▶ Geração ──▶ Curadoria       │
│                       │                │              │         │
│                       │                │              ▼         │
│                       │                │      Seleção/Refinamento│
│                       │                │              │         │
│                       │                ▼              ▼         │
│                       │         Múltiplas         Código        │
│                       │         Opções            Integrado     │
│                       │         (IA)              (Híbrido)     │
│                       │                                       │
│  Características:                                               │
│  • Código gerado em escala                                     │
│  • Julgamento sobre qualidade e adequação                      │
│  • Custo de leitura > Custo de escrita                         │
│  • Expertise demonstrada na avaliação                          │
│  • Foco em restrições e invariantes                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1.2 Novas Competências do Designer

| Competência Tradicional | Competência de Curadoria | Descrição |
|------------------------|--------------------------|-----------|
| Domínio de sintaxe | Domínio de leitura rápida | Ler e compreender código gerado eficientemente |
| Padrões de codificação | Padrões de avaliação | Identificar anti-padrões em código automático |
| Debugging | Análise de plausibilidade | Detectar código "plausível mas incorreto" |
| Otimização | Trade-off analysis | Avaliar trade-offs entre opções geradas |
| Refatoração | Prompt engineering | Especificar geração para melhor resultado |

## 1.2 Princípios Fundamentais

### 1.2.1 Princípio da Especificação por Exceção

> *"Especifique o que é inaceitável; deixe a IA sugerir o que é possível."*

Em vez de prescrever soluções, o designer moderno define fronteiras:

```python
from dataclasses import dataclass
from typing import List, Callable

@dataclass
class DesignConstraint:
    """
    Representa uma restrição de design que código gerado
    deve respeitar.
    """
    category: str  # 'performance', 'security', 'maintainability'
    description: str
    validation_function: Callable
    severity: str  # 'blocking', 'warning', 'info'

class DesignSpecification:
    """
    Especificação de design baseada em restrições negativas
    (o que não é aceitável).
    """
    
    def __init__(self, context: str):
        self.context = context
        self.constraints: List[DesignConstraint] = []
        self.patterns_required = []
        self.patterns_forbidden = []
    
    def add_forbidden_pattern(self, pattern: str, reason: str):
        """
        Adiciona padrão que código gerado não deve usar.
        """
        self.patterns_forbidden.append({
            'pattern': pattern,
            'reason': reason
        })
    
    def add_required_invariant(self, invariant: str, validator: Callable):
        """
        Adiciona invariante que deve ser preservado.
        """
        self.constraints.append(DesignConstraint(
            category='correctness',
            description=invariant,
            validation_function=validator,
            severity='blocking'
        ))
    
    def validate_proposal(self, code_proposal: str) -> dict:
        """
        Valida proposta de código contra especificação.
        """
        violations = []
        
        # Verificar padrões proibidos
        for forbidden in self.patterns_forbidden:
            if forbidden['pattern'] in code_proposal:
                violations.append({
                    'type': 'forbidden_pattern',
                    'pattern': forbidden['pattern'],
                    'reason': forbidden['reason'],
                    'severity': 'blocking'
                })
        
        # Verificar invariantes
        for constraint in self.constraints:
            if not constraint.validation_function(code_proposal):
                violations.append({
                    'type': 'invariant_violation',
                    'constraint': constraint.description,
                    'severity': constraint.severity
                })
        
        return {
            'valid': len(violations) == 0,
            'violations': violations,
            'acceptance_criteria_met': self._check_acceptance_criteria(code_proposal)
        }

# Exemplo de uso
payment_spec = DesignSpecification(
    context="Processamento de pagamentos em sistema financeiro"
)

# Definir restrições negativas
payment_spec.add_forbidden_pattern(
    pattern="eval(",
    reason="Uso de eval representa risco de injeção de código"
)

payment_spec.add_forbidden_pattern(
    pattern="float",
    reason="Cálculos financeiros devem usar Decimal para precisão"
)

# Definir invariantes
payment_spec.add_required_invariant(
    invariant="Idempotência: mesma requisição não pode processar duas vezes",
    validator=lambda code: "idempotency_key" in code or "idempotent" in code
)
```

### 1.2.2 Princípio da Verificabilidade Prioritária

> *"Código que não pode ser verificado não deve ser aceito, independentemente de sua elegância."*

```python
from typing import Dict, List
import ast

class VerifiabilityAssessor:
    """
    Avalia verificabilidade de código gerado.
    """
    
    VERIFIABILITY_CRITERIA = {
        'testability': {
            'description': 'Facilidade de teste unitário',
            'indicators': [
                'pure_functions',
                'dependency_injection',
                'deterministic_output'
            ]
        },
        'readability': {
            'description': 'Clareza para revisão humana',
            'indicators': [
                'naming_clarity',
                'single_responsibility',
                'no_hidden_state'
            ]
        },
        'traceability': {
            'description': 'Rastreabilidade de decisões',
            'indicators': [
                'explicit_logging',
                'decision_points_documented',
                'data_lineage_clear'
            ]
        }
    }
    
    def assess(self, code: str) -> Dict:
        """
        Avalia código segundo critérios de verificabilidade.
        """
        scores = {}
        
        for criterion, details in self.VERIFIABILITY_CRITERIA.items():
            score = self._assess_criterion(code, criterion)
            scores[criterion] = {
                'score': score,
                'weight': 1.0,
                'suggestions': self._generate_suggestions(code, criterion)
            }
        
        overall = sum(s['score'] * s['weight'] for s in scores.values()) / \
                  sum(s['weight'] for s in scores.values())
        
        return {
            'overall_verifiability': overall,
            'criteria': scores,
            'acceptable': overall >= 0.7,
            'priority_improvements': self._priority_improvements(scores)
        }
    
    def _assess_criterion(self, code: str, criterion: str) -> float:
        """Avalia um critério específico."""
        try:
            tree = ast.parse(code)
        except SyntaxError:
            return 0.0
        
        if criterion == 'testability':
            return self._assess_testability(tree)
        elif criterion == 'readability':
            return self._assess_readability(tree)
        elif criterion == 'traceability':
            return self._assess_traceability(tree)
        
        return 0.5
    
    def _assess_testability(self, tree: ast.AST) -> float:
        """Avalia testabilidade do código."""
        score = 1.0
        
        # Penalizar dependências globais
        for node in ast.walk(tree):
            if isinstance(node, ast.Global):
                score -= 0.2
            # Penalizar efeitos colaterais não explícitos
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in ['print', 'input']:
                        score -= 0.1
        
        return max(0, score)
```

## 1.3 Processo de Design na Era dos LLMs

### 1.3.1 Ciclo de Design Iterativo

```
┌─────────────────────────────────────────────────────────────────┐
│           CICLO DE DESIGN COM IA (Design-Generate-Validate)     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌──────────┐      ┌──────────┐      ┌──────────┐            │
│    │ ESPECIFIC│─────▶│ GERAR    │─────▶│ AVALIAR  │            │
│    │          │      │          │      │          │            │
│    │ Restrições     ││ Múltiplas│      │ Conformidade           │
│    │ Contexto       ││ Opções   │      │ Qualidade              │
│    │ Invariantes    ││ de Código│      │ Verificabilidade       │
│    └─────┬────┘      └──────────┘      └────┬─────┘            │
│          │                                   │                   │
│          │         ┌──────────┐            │                   │
│          └─────────│ INTEGRAR │◀───────────┘                   │
│                    │          │                                │
│                    │ Refinar  │                                │
│                    │ Combinar │                                │
│                    │ Validar  │                                │
│                    └────┬─────┘                                │
│                         │                                      │
│                         ▼                                      │
│                    ┌──────────┐                                │
│                    │   TESTAR │                                │
│                    │          │                                │
│                    │ Oráculos │                                │
│                    │ Propriedades                            │
│                    │ Exemplos │                                │
│                    └────┬─────┘                                │
│                         │                                      │
│                         │ Falha                                │
│                         └────────────────▶ (voltar a ESPECIFICAR)│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3.2 Atividades de Curadoria

```python
from enum import Enum
from typing import List, Optional
from dataclasses import dataclass

class CuratorActivity(Enum):
    SPECIFICATION = "especificacao_de_restricoes"
    GENERATION = "geracao_via_prompts"
    EVALUATION = "avaliacao_de_propostas"
    SELECTION = "selecao_de_opcoes"
    REFINEMENT = "refinamento_manual"
    INTEGRATION = "integracao_no_codigo"
    VERIFICATION = "verificacao_de_conformidade"

@dataclass
class CuratorDecision:
    activity: CuratorActivity
    input_artifact: str
    output_artifact: str
    rationale: str
    time_spent_minutes: int
    alternatives_considered: int

class DesignCurator:
    """
    Registra e analisa atividades de curadoria de design.
    """
    
    def __init__(self):
        self.decisions: List[CuratorDecision] = []
        self.metrics = {
            'total_time': 0,
            'alternatives_evaluated': 0,
            'acceptance_rate': 0.0
        }
    
    def record_decision(self, decision: CuratorDecision):
        """Registra decisão de curadoria."""
        self.decisions.append(decision)
        self._update_metrics(decision)
    
    def get_effectiveness_report(self) -> dict:
        """
        Gera relatório de efetividade do processo de curadoria.
        """
        activity_breakdown = {}
        for decision in self.decisions:
            activity = decision.activity.value
            if activity not in activity_breakdown:
                activity_breakdown[activity] = {
                    'count': 0,
                    'total_time': 0
                }
            activity_breakdown[activity]['count'] += 1
            activity_breakdown[activity]['total_time'] += decision.time_spent_minutes
        
        return {
            'total_decisions': len(self.decisions),
            'activity_breakdown': activity_breakdown,
            'average_time_per_decision': self.metrics['total_time'] / len(self.decisions),
            'average_alternatives_considered': self.metrics['alternatives_evaluated'] / len(self.decisions),
            'bottlenecks': self._identify_bottlenecks(activity_breakdown)
        }
    
    def _identify_bottlenecks(self, breakdown: dict) -> List[str]:
        """Identifica atividades que consomem mais tempo."""
        sorted_activities = sorted(
            breakdown.items(),
            key=lambda x: x[1]['total_time'],
            reverse=True
        )
        
        # Retorna atividades que consomem > 30% do tempo
        total_time = sum(a['total_time'] for a in breakdown.values())
        return [
            activity for activity, data in sorted_activities
            if data['total_time'] / total_time > 0.3
        ]
```

## 1.4 Anti-Padrões de Design com IA

### 1.4.1 Aceitação Cega (Blind Acceptance)

**Problema:** Aceitar código gerado sem avaliação crítica.

**Consequências:**
- Débito técnico invisível
- Vulnerabilidades de segurança
- Código que "funciona" mas não é correto

**Mitigação:**
```python
def validate_before_acceptance(code_proposal: str, 
                               requirements: dict) -> bool:
    """
    Checklist obrigatório antes de aceitar código gerado.
    """
    checks = [
        # Segurança
        'eval(' not in code_proposal,
        'exec(' not in code_proposal,
        '__import__' not in code_proposal,
        
        # Qualidade
        len(code_proposal.split('\n')) < 100,  # Funções curtas
        'TODO' not in code_proposal,  # Não aceitar código incompleto
        
        # Testabilidade
        'def ' in code_proposal,  # Deve ter funções definidas
        'return ' in code_proposal,  # Deve ter retornos
        
        # Especificidade
        requirements['functionality'] in code_proposal
    ]
    
    return all(checks)
```

### 1.4.2 Over-Engineering por Prompt

**Problema:** Prompts que geram soluções excessivamente complexas.

**Sintomas:**
- Uso de padrões desnecessários para problemas simples
- Abstrações prematuras
- Código genérico onde específico seria melhor

### 1.4.3 Perda de Contexto

**Problema:** Código gerado que não considera o contexto do sistema existente.

**Mitigação:**
```python
class ContextAwarePromptBuilder:
    """
    Constrói prompts que incluem contexto necessário
    para geração coerente.
    """
    
    def build_prompt(self, task: str, codebase_context: dict) -> str:
        return f"""
Contexto do Sistema:
- Linguagem: {codebase_context['language']}
- Framework: {codebase_context['framework']}
- Estilo: {codebase_context['style_guide']}
- Padrões existentes: {', '.join(codebase_context['patterns'])}

Restrições:
- Máximo complexidade ciclomática: 10
- Deve seguir padrão de nomenclatura existente
- Deve usar bibliotecas já presentes no projeto

Tarefa:
{task}

Gere código que se integre naturalmente ao sistema existente.
"""
```

## 1.5 Exercícios

1. Crie uma `DesignSpecification` para um módulo de autenticação, definindo pelo menos 5 restrições negativas críticas.

2. Implemente um `VerifiabilityAssessor` que avalie código segundo critérios específicos de testabilidade.

3. Analise um código gerado por IA que você tenha acesso e identifique:
   - Elementos que passariam no checklist de validação
   - Elementos que violariam princípios de verificabilidade
   - Sugestões de melhoria no prompt para evitar os problemas identificados

## Practical Considerations

- Antes de delegar decisões para IA, defina limites: o que pode variar, o que deve ser determinístico e como validar.
- Prefira designs que produzam evidência (logs, rastros, contratos) para reduzir custo de verificação.

## Summary

- Design na era dos LLMs é orientado a restrições, verificabilidade e supervisão humana.
- Componentes estocásticos precisam de fronteiras, contratos e fallback para operar com segurança.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

---

*SWEBOK-AI v5.0 - Software Design*

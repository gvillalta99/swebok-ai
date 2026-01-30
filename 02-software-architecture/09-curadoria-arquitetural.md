---
title: Seção 9 - Curadoria Arquitetural na Era dos LLMs
date: 2025-01-30
tags:
  - swebok-ai
  - arquitetura
  - curadoria
  - llm
status: draft
---

# Seção 9: Curadoria Arquitetural na Era dos LLMs

## Overview

Esta seção desenvolve o conceito de **Curadoria Arquitetural** como prática central para engenheiros de software na era dos Large Language Models (LLMs). Enquanto arquitetura tradicional focava na criação manual de estruturas, a curadoria arquitetural foca na **avaliação, seleção e integração** de soluções geradas por sistemas autônomos, aplicando julgamento técnico para garantir que opções automáticas respeitem restrições críticas do sistema.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir curadoria arquitetural e diferenciá-la de arquitetura tradicional
2. Aplicar o processo de curadoria em decisões arquiteturais com IA
3. Identificar quando aceitar, refinar ou rejeitar propostas de arquitetura geradas por IA
4. Implementar mecanismos de governança em processos de curadoria
5. Avaliar trade-offs entre soluções candidatas segundo critérios organizacionais

---

## 9.1 Fundamentos da Curadoria Arquitetural

### 9.1.1 Definição

**Curadoria Arquitetural** é a disciplina de:

1. **Especificar** restrições arquiteturais precisas (o que é inaceitável)
2. **Gerar** múltiplas alternativas arquiteturais através de sistemas autônomos
3. **Avaliar** candidatos segundo critérios de qualidade, conformidade e risco
4. **Selecionar** soluções adequadas aplicando julgamento técnico
5. **Refinar** propostas selecionadas para atender a nuances de contexto
6. **Integrar** soluções no sistema maior garantindo coerência
7. **Verificar** conformidade com restrições e documentar decisões
8. **Governar** o processo para accountability e auditabilidade

```
┌─────────────────────────────────────────────────────────────────┐
│              PROCESSO DE CURADORIA ARQUITETURAL                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌───────────────┐                                             │
│   │ ESPECIFICAR   │ ◄── Restrições, Invariantes, Contexto       │
│   │ Restrições    │     (Capital de Contexto)                   │
│   └───────┬───────┘                                             │
│           │                                                     │
│           ▼                                                     │
│   ┌───────────────┐     ┌───────────────┐                       │
│   │    GERAR      │────▶│  Múltiplas    │                       │
│   │  (IA/System)  │     │  Alternativas │                       │
│   └───────────────┘     └───────┬───────┘                       │
│                                 │                               │
│                                 ▼                               │
│   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐ │
│   │   AVALIAR     │◄────│   Seleção     │────▶│   REFINAR     │ │
│   │  (Conformidade│     │  Múlticritério│     │  (Ajustes     │ │
│   │   Qualidade,  │     │   AHP, etc)   │     │   Específicos)│ │
│   │   Risco)      │     │               │     │               │ │
│   └───────┬───────┘     └───────────────┘     └───────┬───────┘ │
│           │                                           │         │
│           ▼                                           ▼         │
│   ┌───────────────┐                           ┌───────────────┐ │
│   │   REJEITAR    │                           │   INTEGRAR    │ │
│   │  (Feedback    │                           │  (No sistema  │ │
│   │   para IA)    │                           │   existente)  │ │
│   └───────────────┘                           └───────┬───────┘ │
│                                                       │         │
│           ┌───────────────────────────────────────────┘         │
│           │                                                     │
│           ▼                                                     │
│   ┌───────────────┐     ┌───────────────┐                       │
│   │   VERIFICAR   │────▶│   GOVERNAR    │                       │
│   │  (Testes,     │     │  (Documentar, │                       │
│   │   Review,     │     │ Accountability│                       │
│   │   Métricas)   │     │   Audit Trail)│                       │
│   └───────────────┘     └───────────────┘                       │
│                                                                 │
│   ◄────── HUMANO NO CENTRO (Decisões críticas)                  │
│   ◄────── IA COMO FERRAMENTA (Geração e análise)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.1.2 Diferenças entre Arquitetura Tradicional e Curadoria

| Aspecto | Arquitetura Tradicional | Curadoria Arquitetural |
|---------|------------------------|------------------------|
| **Atividade principal** | Criar estruturas manualmente | Avaliar e selecionar opções geradas |
| **Saída típica** | Documento único de arquitetura | Múltiplas alternativas avaliadas |
| **Processo** | Linear: análise → design → documentação | Iterativo: especificar → gerar → avaliar → selecionar |
| **Decisões** | Baseadas em experiência individual | Baseadas em análise multicitério |
| **Expertise** | Domínio de padrões e tecnologias | Julgamento sobre adequação e trade-offs |
| **Ferramentas** | Diagramas, templates | IA generativa, frameworks de avaliação |
| **Custo principal** | Tempo de design | Tempo de verificação e avaliação |
| **Accountability** | Arquiteto como autor | Arquiteto como curador/decisor |

### 9.1.3 O Arquiteto como Curador

Na metáfora de curadoria, o arquiteto de software assemelha-se a um **curador de museu**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    METÁFORA DO CURADOR DE MUSEU                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CURADOR DE MUSEU                    ARQUITETO DE SOFTWARE      │
│                                                                 │
│  • Não cria as obras de arte         • Não escreve todo código  │
│  • Define tema e critérios           • Define restrições e      │
│    da exposição                        contexto arquitetural    │
│  • Seleciona obras de                • Seleciona soluções de    │
│    múltiplos artistas                  múltiplas opções de IA   │
│  • Decide o que entra e              • Decide o que é aceitável │
│    o que fica de fora                  e o que viola restrições │
│  • Organiza disposição               • Organiza integração no   │
│    (contexto visual)                   sistema existente        │
│  • Escreve texto explicativo         • Documenta decisões e     │
│    (contextualização)                  raciocínio               │
│  • É responsável pela                • É responsável pela       │
│    qualidade da exposição              qualidade arquitetural   │
│                                                                 │
│  Risco: Selecionar obra              Risco: Selecionar solução  │
│  falsificada → Credibilidade        inadequada → Falha sistêmica│
│  danificada                          crítica                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9.2 O Capital de Contexto Arquitetural

### 9.2.1 Definição

O **Capital de Contexto Arquitetural** são os ativos intelectuais que diferenciam um arquiteto e uma organização na era dos LLMs. São restrições, invariantes e conhecimentos de domínio que não podem ser facilmente replicados por IA genérica.

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Callable
from enum import Enum

class ConstraintSeverity(Enum):
    CRITICAL = "critical"      # Violação = falha catastrófica
    HIGH = "high"             # Violação = falha significativa
    MEDIUM = "medium"         # Violação = débito técnico
    LOW = "low"               # Violação = não ideal

@dataclass
class ArchitecturalConstraint:
    """
    Restrição arquitetural que soluções devem respeitar.
    """
    id: str
    name: str
    description: str
    category: str  # 'performance', 'security', 'scalability', 'compliance'
    severity: ConstraintSeverity
    validation_function: Callable
    rationale: str  # Por que esta restrição existe
    source: str     # De onde veio (stakeholder, regulamentação, lição aprendida)

@dataclass
class ArchitecturalInvariant:
    """
    Propriedade que deve ser preservada em todas as evoluções.
    """
    id: str
    name: str
    description: str
    verification_method: str  # Como verificar
    enforcement_mechanism: str  # Como garantir

@dataclass
class ContextCapital:
    """
    Capital de contexto arquitetural de uma organização.
    """
    # Restrições explícitas
    constraints: List[ArchitecturalConstraint] = field(default_factory=list)
    
    # Invariantes do sistema
    invariants: List[ArchitecturalInvariant] = field(default_factory=list)
    
    # Padrões obrigatórios
    required_patterns: List[str] = field(default_factory=list)
    
    # Padrões proibidos
    forbidden_patterns: List[str] = field(default_factory=list)
    
    # Decisões arquiteturais passadas (ADRs)
    decision_history: List[Dict] = field(default_factory=list)
    
    # Lições aprendidas com falhas
    failure_patterns: List[Dict] = field(default_factory=list)
    
    # Métricas de qualidade organizacionais
    quality_standards: Dict = field(default_factory=dict)
    
    def validate_proposal(self, proposal: dict) -> dict:
        """
        Valida proposta arquitetural contra capital de contexto.
        """
        violations = []
        
        for constraint in self.constraints:
            if not constraint.validation_function(proposal):
                violations.append({
                    'constraint_id': constraint.id,
                    'name': constraint.name,
                    'severity': constraint.severity.value,
                    'rationale': constraint.rationale
                })
        
        return {
            'valid': len(violations) == 0,
            'violations': violations,
            'critical_violations': [v for v in violations 
                                   if v['severity'] == 'critical']
        }
```

### 9.2.2 Exemplos de Capital de Contexto

**Para Sistema Financeiro:**

```python
financial_context = ContextCapital(
    constraints=[
        ArchitecturalConstraint(
            id="C001",
            name="Precisão Monetária",
            description="Cálculos financeiros devem usar Decimal, nunca float",
            category="compliance",
            severity=ConstraintSeverity.CRITICAL,
            validation_function=lambda p: 'Decimal' in p.get('code', '') 
                                         and 'float' not in p.get('code', ''),
            rationale="Float introduz erros de arredondamento inaceitáveis",
            source="BACEN Circular 3.648"
        ),
        ArchitecturalConstraint(
            id="C002",
            name="Idempotência",
            description="Operações de transferência devem ser idempotentes",
            category="reliability",
            severity=ConstraintSeverity.CRITICAL,
            validation_function=lambda p: 'idempotency' in p.get('code', '').lower(),
            rationale="Evitar duplicidade em retries de rede",
            source="Lição aprendida: Incidente #2024-03"
        )
    ],
    invariants=[
        ArchitecturalInvariant(
            id="I001",
            name="Consistência de Saldo",
            description="Soma de créditos - débitos = saldo em todo momento",
            verification_method="Property-based testing",
            enforcement_mechanism="Database constraints + application logic"
        )
    ],
    forbidden_patterns=[
        "SELECT * FROM",  # Performance
        "eval(",          # Segurança
        "Thread.sleep("   # Escalabilidade
    ]
)
```

---

## 9.3 Processo de Curadoria Arquitetural

### 9.3.1 Fase 1: Especificação de Restrições

**Princípio**: Especifique o que é inaceitável, não prescreva soluções.

```python
class ConstraintSpecification:
    """
    Especificação de restrições para geração arquitetural.
    """
    
    def __init__(self, context: str):
        self.context = context
        self.constraints: List[ArchitecturalConstraint] = []
        self.quality_attributes = {}
        
    def add_negative_constraint(self, 
                                pattern: str, 
                                reason: str,
                                severity: ConstraintSeverity):
        """
        Adiciona restrição negativa: "não use X".
        
        Mais efetivo que prescrever "use Y" porque:
        - Permite que IA sugira alternativas criativas
        - Foca em problemas reais ao invés de soluções hipotéticas
        - É mais fácil de validar objetivamente
        """
        self.constraints.append(ArchitecturalConstraint(
            id=f"NC{len(self.constraints):03d}",
            name=f"Forbid: {pattern}",
            description=f"Não usar: {pattern}",
            category="negative",
            severity=severity,
            validation_function=lambda p, pat=pattern: pat not in p.get('code', ''),
            rationale=reason,
            source="Arquiteto"
        ))
    
    def add_invariant(self, 
                     name: str, 
                     description: str,
                     verification: str):
        """
        Adiciona invariante arquitetural.
        """
        # Invariantes são propriedades que devem sempre ser verdadeiras
        pass
    
    def to_prompt_context(self) -> str:
        """
        Converte especificação em contexto para prompts de IA.
        """
        context = f"""
Contexto do Sistema: {self.context}

RESTRIÇÕES CRÍTICAS (violação = rejeição):
"""
        for c in self.constraints:
            if c.severity == ConstraintSeverity.CRITICAL:
                context += f"\n• {c.name}: {c.description}"
                context += f"\n  Razão: {c.rationale}"
        
        context += "\n\nPADRÕES PROIBIDOS:\n"
        for c in self.constraints:
            if c.category == "negative":
                context += f"\n• Não usar: {c.description}"
        
        return context
```

### 9.3.2 Fase 2: Geração de Alternativas

```python
class AlternativeGenerator:
    """
    Gera múltiplas alternativas arquiteturais usando IA.
    """
    
    def __init__(self, llm_client):
        self.llm = llm_client
    
    async def generate_alternatives(self, 
                                   specification: ConstraintSpecification,
                                   n_alternatives: int = 3) -> List[dict]:
        """
        Gera N alternativas arquiteturais distintas.
        """
        alternatives = []
        
        for i in range(n_alternatives):
            prompt = f"""
{specification.to_prompt_context()}

Gere uma solução arquitetural para: {specification.context}

Abordagem #{i+1}: {self._get_approach_prompt(i)}

Forneça:
1. Visão geral da solução
2. Diagrama textual da arquitetura
3. Componentes principais e responsabilidades
4. Decisões de design e trade-offs
5. Código exemplo dos componentes críticos
6. Como esta abordagem respeita as restrições
"""
            
            response = await self.llm.generate(prompt)
            alternatives.append({
                'id': f'ALT-{i+1}',
                'approach': self._get_approach_name(i),
                'content': response,
                'generation_timestamp': datetime.now(),
                'model_version': self.llm.model_version
            })
        
        return alternatives
    
    def _get_approach_prompt(self, index: int) -> str:
        """Prompts para diferentes abordagens."""
        approaches = [
            "Foque em simplicidade e facilidade de manutenção",
            "Foque em performance e escalabilidade",
            "Foque em resiliência e tolerância a falhas"
        ]
        return approaches[index % len(approaches)]
```

### 9.3.3 Fase 3: Avaliação Multicritério

```python
from typing import Dict, List
import numpy as np

class MultiCriteriaEvaluator:
    """
    Avalia alternativas arquiteturais segundo múltiplos critérios.
    """
    
    CRITERIA = {
        'conformity': {
            'weight': 0.30,
            'description': 'Conformidade com restrições'
        },
        'maintainability': {
            'weight': 0.20,
            'description': 'Manutenibilidade'
        },
        'performance': {
            'weight': 0.20,
            'description': 'Performance'
        },
        'scalability': {
            'weight': 0.15,
            'description': 'Escalabilidade'
        },
        'security': {
            'weight': 0.15,
            'description': 'Segurança'
        }
    }
    
    def evaluate(self, 
                alternative: dict,
                specification: ConstraintSpecification) -> dict:
        """
        Avalia uma alternativa segundo critérios definidos.
        """
        scores = {}
        
        # 1. Conformidade (pass/fail gates)
        conformity = specification.validate_proposal(alternative)
        if conformity['critical_violations']:
            # Rejeição imediata
            return {
                'alternative_id': alternative['id'],
                'rejected': True,
                'reason': f"Violações críticas: {conformity['critical_violations']}"
            }
        
        scores['conformity'] = 1.0 if conformity['valid'] else 0.5
        
        # 2. Outros critérios (avaliação heurística/semiautomática)
        scores['maintainability'] = self._assess_maintainability(alternative)
        scores['performance'] = self._assess_performance(alternative)
        scores['scalability'] = self._assess_scalability(alternative)
        scores['security'] = self._assess_security(alternative)
        
        # Cálculo de score ponderado
        total_score = sum(
            scores[c] * self.CRITERIA[c]['weight']
            for c in self.CRITERIA.keys()
        )
        
        return {
            'alternative_id': alternative['id'],
            'rejected': False,
            'scores': scores,
            'total_score': total_score,
            'ranking': 0,  # Preenchido depois
            'violations': conformity.get('violations', [])
        }
    
    def rank_alternatives(self, evaluations: List[dict]) -> List[dict]:
        """
        Ordena alternativas por score total.
        """
        valid = [e for e in evaluations if not e['rejected']]
        valid.sort(key=lambda x: x['total_score'], reverse=True)
        
        for i, eval in enumerate(valid):
            eval['ranking'] = i + 1
        
        return valid
```

### 9.3.4 Fase 4: Seleção e Refinamento

```python
class ArchitecturalCurator:
    """
    Orquestra o processo completo de curadoria arquitetural.
    """
    
    def __init__(self, 
                 context_capital: ContextCapital,
                 generator: AlternativeGenerator,
                 evaluator: MultiCriteriaEvaluator):
        self.context = context_capital
        self.generator = generator
        self.evaluator = evaluator
        self.decision_log = []
    
    async def curate(self, 
                    specification: ConstraintSpecification,
                    decision_maker: str) -> dict:
        """
        Executa processo completo de curadoria.
        """
        # 1. Gerar alternativas
        alternatives = await self.generator.generate_alternatives(
            specification, 
            n_alternatives=3
        )
        
        # 2. Avaliar cada alternativa
        evaluations = []
        for alt in alternatives:
            eval_result = self.evaluator.evaluate(alt, specification)
            evaluations.append(eval_result)
        
        # 3. Rankear
        ranked = self.evaluator.rank_alternatives(evaluations)
        
        # 4. Selecionar top-N para revisão humana
        top_candidates = ranked[:2] if len(ranked) >= 2 else ranked
        
        # 5. Registrar decisão
        decision = {
            'timestamp': datetime.now(),
            'specification': specification.context,
            'alternatives_generated': len(alternatives),
            'alternatives_evaluated': evaluations,
            'top_candidates': top_candidates,
            'selected_alternative': None,  # Preenchido após revisão humana
            'decision_maker': decision_maker,
            'rationale': None
        }
        
        self.decision_log.append(decision)
        
        return {
            'candidates': top_candidates,
            'rejected': [e for e in evaluations if e['rejected']],
            'decision_id': len(self.decision_log) - 1
        }
    
    def finalize_selection(self, 
                          decision_id: int,
                          selected_alternative_id: str,
                          rationale: str):
        """
        Finaliza seleção após revisão humana.
        """
        self.decision_log[decision_id]['selected_alternative'] = selected_alternative_id
        self.decision_log[decision_id]['rationale'] = rationale
        self.decision_log[decision_id]['finalized_at'] = datetime.now()
```

---

## 9.4 Anti-Padrões de Curadoria

### 9.4.1 Aceitação Cega (Blind Acceptance)

**Problema**: Aceitar primeira proposta da IA sem avaliação crítica.

**Consequências**:
- Violação de restrições críticas
- Soluções "plausíveis mas incorretas"
- Acúmulo de débito técnico

**Mitigação**: Checklist obrigatório de verificação.

### 9.4.2 Over-Specification

**Problema**: Especificar soluções ao invés de restrições.

**Consequências**:
- Limita criatividade da IA
- Herda vieses do arquiteto
- Soluções subótimas

**Mitigação**: Focar em restrições negativas ("não use X") ao invés de positivas ("use Y").

### 9.4.3 Falta de Contexto

**Problema**: Gerar alternativas sem capital de contexto adequado.

**Consequências**:
- Soluções genéricas
- Incompatibilidade com sistema existente
- Rejeições em cascata

**Mitigação**: Documentar e versionar capital de contexto.

### 9.4.4 Decisões sem Accountability

**Problema**: Selecionar alternativas sem registrar quem decidiu e por quê.

**Consequências**:
- Audit trail incompleto
- Responsabilidade difusa
- Repetição de erros

**Mitigação**: Log obrigatório de todas as decisões de curadoria.

---

## 9.5 Métricas de Curadoria

```python
@dataclass
class CuratorMetrics:
    """
    Métricas para avaliar efetividade do processo de curadoria.
    """
    
    # Eficiência
    average_time_per_decision: float  # minutos
    alternatives_per_decision: float
    
    # Qualidade
    acceptance_rate: float  # % de propostas aceitas
    rejection_rate: float   # % de propostas rejeitadas
    critical_violations_caught: int
    
    # Cobertura
    constraints_documented: int
    constraints_validated: int
    
    # Accountability
    decisions_documented: int
    decisions_with_rationale: int
    
    def calculate_effectiveness_score(self) -> float:
        """
        Score composto de efetividade da curadoria.
        """
        # Taxa de aceitação não deve ser nem 0% nem 100%
        # Ideal: 60-80% (mostra que há filtragem mas não bloqueio excessivo)
        acceptance_score = 1.0 - abs(self.acceptance_rate - 0.7)
        
        # Cobertura de documentação
        documentation_score = self.decisions_with_rationale / max(self.decisions_documented, 1)
        
        # Eficiência (tempo razoável por decisão)
        efficiency_score = 1.0 if self.average_time_per_decision < 60 else 0.5
        
        return (acceptance_score + documentation_score + efficiency_score) / 3
```

---

## 9.6 Checklist de Curadoria Arquitetural

### Antes de Gerar Alternativas

- [ ] Documentei todas as restrições críticas?
- [ ] Defini invariantes arquiteturais?
- [ ] Identifiquei padrões proibidos?
- [ ] Coletei lições aprendidas de falhas anteriores?
- [ ] Validei se contexto está completo?

### Durante a Avaliação

- [ ] Verifiquei conformidade com restrições críticas?
- [ ] Avaliei cada critério de qualidade?
- [ ] Considerei trade-offs explicitamente?
- [ ] Validei se solução é verificável?
- [ ] Verifiquei integração com sistema existente?

### Após Seleção

- [ ] Documentei por que esta alternativa foi escolhida?
- [ ] Registrei quem tomou a decisão?
- [ ] Identifiquei riscos residuais?
- [ ] Defini plano de verificação?
- [ ] Comuniquei decisão aos stakeholders?

---

## Summary

- **Curadoria Arquitetural** é a prática de avaliar, selecionar e integrar soluções geradas por IA
- **Capital de Contexto** são restrições e invariantes que diferenciam o arquiteto
- **Processo**: Especificar → Gerar → Avaliar → Selecionar → Refinar → Integrar → Verificar → Governar
- **Métricas**: Eficiência, qualidade, cobertura e accountability
- **Anti-padrões**: Aceitação cega, over-specification, falta de contexto, decisões sem accountability

---

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
|----------|-----------|
| **Descartabilidade Geracional** | Muito Baixa — curadoria é skill essencial na era dos LLMs |
| **Custo de Verificação** | Alto — avaliação arquitetural requer julgamento humano |
| **Responsabilidade Legal** | Crítica — arquiteto é responsável por decisões de curadoria |

---

## References

1. [[03-principios-diretores-swebok-ai|Princípios Diretores SWEBOK-AI]]
2. [[02-mudanca-paradigma-engenharia-software|Mudança de Paradigma]]
3. [[02-software-architecture/01-fundamentos-arquitetura-hibrida.md|Fundamentos de Arquitetura Híbrida]]
4. IEEE Software (2024) - "Human-AI Collaboration in Software Engineering"
5. Weber et al. (2024) - "Significant Productivity Gains through Programming with LLMs"

---

*SWEBOK-AI v5.0 - Software Architecture - Seção 9*

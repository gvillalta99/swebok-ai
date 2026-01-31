---
title: "Fundamentos do Design de Sistemas Híbridos na Era dos LLMs"
created_at: 2025-01-15
updated_at: 2026-01-31
tags: ["software-design", "llm", "hybrid-systems", "ai-generated-code", "curatorship", "verification"]
status: "published"
ai_model: "openai/gpt-5.2"
---

# Seção 1: Fundamentos do Design na Era dos LLMs

## Overview

O design de software tradicional fundamentava-se na premissa de que engenheiros traduziam requisitos em estruturas de código através de processos mentais de decomposição, abstração e composição. Na era dos Large Language Models (LLMs), esse paradigma é profundamente alterado: o engenheiro torna-se primariamente um **curador** que avalia, seleciona, refina e integra código gerado automaticamente, aplicando julgamento técnico para garantir que soluções automáticas atendam a restrições de qualidade, segurança e manutenibilidade (LAU; GUO, 2025).

Esta seção estabelece os fundamentos do **Design de Sistemas Híbridos** — uma disciplina que assume que sistemas de software contemporâneos combinam componentes determinísticos tradicionais com comportamentos gerados ou ajustados por sistemas probabilísticos. O foco desloca-se da criação manual para a **verificabilidade**, **limites explícitos** e **supervisão humana** como mecanismos de governança (GRÖPLER et al., 2025).

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Analisar** arquiteturas de software híbridas identificando componentes que devem permanecer determinísticos versus aqueles que podem incorporar geração probabilística, justificando as decisões com base em requisitos de segurança, conformidade e auditabilidade.

2. **Projetar** interfaces antropizadas para sistemas com componentes de IA que comuniquem incerteza, proveniência e limitações de forma transparente aos usuários e stakeholders técnicos, seguindo princípios de design para auditabilidade.

3. **Implementar** mecanismos de verificação e fallback para código gerado por IA, incluindo validação por propriedades, testes de contrato e checkpoints de decisão que permitam rastreamento e intervenção humana.

## 1.1 A Transformação do Design: Do Autor à Curadoria

### 1.1.1 O Paradigma da Curadoria

O design de software tradicional era um ato criativo de tradução: cada linha de código representava uma decisão consciente, refletindo o entendimento do problema e a expertise técnica do desenvolvedor. Na era dos LLMs, esse modelo é substituído por um paradigma de **curadoria**, onde o engenheiro atua como mediador entre especificações de requisitos e múltiplas propostas geradas automaticamente (STRAY; BARBALA; WIVESTAD, 2025).

A transição pode ser caracterizada pelas seguintes dimensões:

| Dimensão | Design Tradicional | Design de Sistemas Híbridos |
|----------|-------------------|----------------------------|
| **Atividade principal** | Codificação manual | Avaliação e integração |
| **Custo predominante** | Escrita de código | Verificação e validação |
| **Expertise demonstrada** | Sintaxe e algoritmos | Julgamento e restrições |
| **Artefato central** | Código-fonte | Especificações de restrições |
| **Processo de qualidade** | Revisão de código | Validação por propriedades |

A pesquisa de Stray, Barbala e Wivestad (2025) propõe o **Framework de Colaboração e Adaptação Humano-IA (HACAF)**, que delineia estágios de adoção de ferramentas, adaptação de fluxos de trabalho e padrões emergentes de colaboração. O framework identifica que desenvolvedores progressivamente negociam papéis com assistentes de IA, calibram níveis de confiança e desenvolvem estratégias de comunicação específicas para maximizar a produtividade sem comprometer a qualidade.

### 1.1.2 Novas Competências do Designer

A transição para o paradigma de curadoria exige desenvolvimento de competências distintas das tradicionais:

| Competência Tradicional | Competência de Curadoria | Descrição |
|------------------------|--------------------------|-----------|
| Domínio de sintaxe | Domínio de leitura rápida | Capacidade de compreender código gerado eficientemente, identificando padrões e anti-padrões em escala (SONG; ZHU; LUO, 2024) |
| Padrões de codificação | Padrões de avaliação | Identificação de código "plausível mas incorreto" — soluções que parecem válidas superficialmente mas violam invariantes sutis |
| Debugging | Análise de plausibilidade | Detecção de alucinações e erros de raciocínio em código gerado por IA |
| Otimização | Análise de trade-offs | Avaliação comparativa entre múltiplas propostas geradas considerando critérios multidimensionais |
| Refatoração | Engenharia de prompts | Especificação precisa de geração para obter resultados alinhados com restrições |

Song, Zhu e Luo (2024) introduzem um framework de design de IA que classifica papéis da IA — de assistente a parceiro — através das dimensões de capacidade, interação e confiança. O framework demonstra como o design estruturado incentiva a integração efetiva de IA em equipes humanas, estabelecendo fronteiras claras de responsabilidade e mecanismos de supervisão.

## 1.2 Princípios Fundamentais do Design Híbrido

### 1.2.1 Princípio da Especificação por Exceção

> *"Especifique o que é inaceitável; deixe a IA sugerir o que é possível."*

Em vez de prescrever soluções detalhadas, o designer moderno define **fronteiras negativas** — restrições que código gerado não deve violar. Este princípio inverte a lógica tradicional de design: em vez de especificar *como* algo deve ser feito, especifica-se *o que não pode acontecer*.

A especificação por exceção fundamenta-se na observação de que LLMs são mais eficazes quando têm liberdade para explorar soluções dentro de limites bem definidos do que quando recebem instruções prescritivas excessivamente detalhadas (CHEN et al., 2025).

```python
from dataclasses import dataclass
from typing import List, Callable, Optional
from enum import Enum

class SeverityLevel(Enum):
    BLOCKING = "blocking"
    WARNING = "warning"
    INFO = "info"

@dataclass
class DesignConstraint:
    """
    Representa uma restrição de design que código gerado
    deve respeitar. Implementa o princípio da especificação
    por exceção.
    """
    category: str  # 'performance', 'security', 'maintainability'
    description: str
    validation_function: Callable[[str], bool]
    severity: SeverityLevel
    rationale: Optional[str] = None

class DesignSpecification:
    """
    Especificação de design baseada em restrições negativas
    (o que não é aceitável). Segue o princípio de que é mais
    eficaz definir fronteiras do que prescrever soluções.
    """
    
    def __init__(self, context: str, domain: str = "general"):
        self.context = context
        self.domain = domain
        self.constraints: List[DesignConstraint] = []
        self.patterns_forbidden: List[dict] = []
        self.invariants_required: List[dict] = []
    
    def add_forbidden_pattern(self, pattern: str, reason: str, 
                             severity: SeverityLevel = SeverityLevel.BLOCKING):
        """
        Adiciona padrão que código gerado não deve usar.
        Implementação do princípio da especificação por exceção.
        """
        self.patterns_forbidden.append({
            'pattern': pattern,
            'reason': reason,
            'severity': severity
        })
    
    def add_required_invariant(self, invariant: str, validator: Callable[[str], bool],
                              severity: SeverityLevel = SeverityLevel.BLOCKING):
        """
        Adiciona invariante que deve ser preservado em qualquer
        solução gerada.
        """
        self.invariants_required.append({
            'invariant': invariant,
            'validator': validator,
            'severity': severity
        })
    
    def validate_proposal(self, code_proposal: str) -> dict:
        """
        Valida proposta de código contra especificação.
        Retorna relatório completo de conformidade.
        """
        violations = []
        
        # Verificar padrões proibidos
        for forbidden in self.patterns_forbidden:
            if forbidden['pattern'] in code_proposal:
                violations.append({
                    'type': 'forbidden_pattern',
                    'pattern': forbidden['pattern'],
                    'reason': forbidden['reason'],
                    'severity': forbidden['severity'].value
                })
        
        # Verificar invariantes
        for invariant in self.invariants_required:
            if not invariant['validator'](code_proposal):
                violations.append({
                    'type': 'invariant_violation',
                    'invariant': invariant['invariant'],
                    'severity': invariant['severity'].value
                })
        
        return {
            'valid': len(violations) == 0,
            'violations': violations,
            'violation_count': len(violations),
            'blocking_violations': sum(1 for v in violations if v['severity'] == 'blocking')
        }

# Exemplo: Especificação para sistema financeiro
payment_spec = DesignSpecification(
    context="Processamento de pagamentos em sistema financeiro",
    domain="financial"
)

# Restrições negativas críticas
payment_spec.add_forbidden_pattern(
    pattern="eval(",
    reason="Uso de eval representa risco crítico de injeção de código",
    severity=SeverityLevel.BLOCKING
)

payment_spec.add_forbidden_pattern(
    pattern="float",
    reason="Cálculos financeiros devem usar Decimal para precisão monetária",
    severity=SeverityLevel.BLOCKING
)

# Invariantes obrigatórios
payment_spec.add_required_invariant(
    invariant="Idempotência: mesma requisição não pode processar duas vezes",
    validator=lambda code: "idempotency_key" in code or "idempotent" in code,
    severity=SeverityLevel.BLOCKING
)
```

### 1.2.2 Princípio da Verificabilidade Prioritária

> *"Código que não pode ser verificado não deve ser aceito, independentemente de sua elegância aparente."*

Este princípio estabelece que a verificabilidade é um atributo de qualidade não negociável para código gerado por IA. A pesquisa de Fakhoury et al. (2024) demonstra que desenvolvedores gastam significativamente mais tempo verificando código gerado por IA do que código escrito manualmente, justificando a priorização de designs que facilitam essa verificação.

```python
from typing import Dict, List, Tuple
import ast
from dataclasses import dataclass

@dataclass
class VerifiabilityScore:
    criterion: str
    score: float  # 0.0 a 1.0
    weight: float
    suggestions: List[str]

class VerifiabilityAssessor:
    """
    Avalia verificabilidade de código gerado segundo critérios
    fundamentais para sistemas híbridos.
    """
    
    CRITERIA = {
        'testability': {
            'description': 'Facilidade de teste unitário e de integração',
            'indicators': [
                'pure_functions',
                'dependency_injection',
                'deterministic_output',
                'isolated_side_effects'
            ],
            'weight': 0.30
        },
        'readability': {
            'description': 'Clareza para revisão humana eficiente',
            'indicators': [
                'naming_clarity',
                'single_responsibility',
                'no_hidden_state',
                'explicit_control_flow'
            ],
            'weight': 0.25
        },
        'traceability': {
            'description': 'Rastreabilidade de decisões e dados',
            'indicators': [
                'explicit_logging',
                'decision_points_documented',
                'data_lineage_clear',
                'audit_trail_complete'
            ],
            'weight': 0.25
        },
        'auditability': {
            'description': 'Capacidade de auditoria post-hoc',
            'indicators': [
                'deterministic_behavior',
                'reproducible_execution',
                'version_controlled',
                'change_documented'
            ],
            'weight': 0.20
        }
    }
    
    def assess(self, code: str) -> Dict:
        """
        Avalia código segundo critérios de verificabilidade.
        """
        scores = []
        
        for criterion_id, details in self.CRITERIA.items():
            score = self._assess_criterion(code, criterion_id)
            suggestions = self._generate_suggestions(code, criterion_id)
            scores.append(VerifiabilityScore(
                criterion=criterion_id,
                score=score,
                weight=details['weight'],
                suggestions=suggestions
            ))
        
        # Calcular pontuação ponderada
        total_weight = sum(s.weight for s in scores)
        overall = sum(s.score * s.weight for s in scores) / total_weight
        
        return {
            'overall_verifiability': round(overall, 2),
            'acceptable': overall >= 0.70,
            'criteria': [
                {
                    'name': s.criterion,
                    'score': round(s.score, 2),
                    'weight': s.weight,
                    'suggestions': s.suggestions
                }
                for s in scores
            ],
            'priority_improvements': self._priority_improvements(scores)
        }
    
    def _assess_criterion(self, code: str, criterion: str) -> float:
        """Avalia um critério específico de verificabilidade."""
        try:
            tree = ast.parse(code)
        except SyntaxError:
            return 0.0
        
        if criterion == 'testability':
            return self._assess_testability(tree)
        elif criterion == 'readability':
            return self._assess_readability(tree)
        elif criterion == 'traceability':
            return self._assess_traceability(tree, code)
        elif criterion == 'auditability':
            return self._assess_auditability(tree, code)
        
        return 0.5
    
    def _assess_testability(self, tree: ast.AST) -> float:
        """Avalia testabilidade do código."""
        score = 1.0
        
        for node in ast.walk(tree):
            # Penalizar dependências globais
            if isinstance(node, ast.Global):
                score -= 0.15
            # Penalizar efeitos colaterais não explícitos
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in ['print', 'input', 'exit']:
                        score -= 0.10
        
        return max(0.0, score)
    
    def _assess_readability(self, tree: ast.AST) -> float:
        """Avalia legibilidade para revisão humana."""
        score = 1.0
        
        # Verificar complexidade ciclomática aproximada
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.While, ast.For, ast.ExceptHandler)):
                score -= 0.02
        
        return max(0.0, score)
    
    def _assess_traceability(self, tree: ast.AST, code: str) -> float:
        """Avalia rastreabilidade de decisões."""
        score = 0.5
        
        # Bonus por logging explícito
        if 'logging' in code or 'logger' in code:
            score += 0.25
        
        # Bonus por comentários explicativos
        if '#' in code:
            score += 0.15
        
        return min(1.0, score)
    
    def _assess_auditability(self, tree: ast.AST, code: str) -> float:
        """Avalia capacidade de auditoria."""
        score = 0.5
        
        # Verificar presença de tratamento de exceções
        has_try = any(isinstance(node, ast.Try) for node in ast.walk(tree))
        if has_try:
            score += 0.25
        
        return min(1.0, score)
    
    def _generate_suggestions(self, code: str, criterion: str) -> List[str]:
        """Gera sugestões de melhoria para um critério."""
        suggestions = []
        
        if criterion == 'testability':
            if 'global' in code.lower():
                suggestions.append("Eliminar variáveis globais; usar injeção de dependências")
        
        elif criterion == 'traceability':
            if 'logging' not in code.lower() and 'logger' not in code.lower():
                suggestions.append("Adicionar logging estruturado para rastreamento de decisões")
        
        return suggestions
    
    def _priority_improvements(self, scores: List[VerifiabilityScore]) -> List[str]:
        """Identifica melhorias prioritárias baseadas em pontuações baixas."""
        low_scores = [s for s in scores if s.score < 0.6]
        sorted_scores = sorted(low_scores, key=lambda s: s.score)
        
        improvements = []
        for score in sorted_scores[:2]:  # Top 2 prioridades
            if score.suggestions:
                improvements.append(f"{score.criterion}: {score.suggestions[0]}")
        
        return improvements
```

## 1.3 Antropização de Interfaces para Sistemas Híbridos

### 1.3.1 Conceito de Antropização

**Antropização** refere-se ao processo de incorporar características humanas em interfaces de sistemas de IA para melhorar engajamento, confiança e compreensão. Xu et al. (2025) desenvolveram a **Escala de Antropomorfismo de IA (SAIA)**, uma ferramenta validada que captura seis dimensões: aparência, competência cognitiva, adaptabilidade, inteligência social, moralidade e falibilidade.

No contexto de design de software com componentes de IA, a antropização assume papel crítico na comunicação de **incerteza** e **limitações** aos usuários. Interfaces que mascaram a natureza probabilística de sistemas de IA criam expectativas irreais e reduzem a vigilância apropriada dos usuários (CHI et al., 2024).

### 1.3.2 Padrões de Interface para Comunicação de Incerteza

```python
from dataclasses import dataclass
from typing import Optional, List
from enum import Enum

class ConfidenceLevel(Enum):
    HIGH = "high"      # > 90% confiança
    MEDIUM = "medium"  # 70-90% confiança
    LOW = "low"        # < 70% confiança
    UNCERTAIN = "uncertain"  # Não determinável

@dataclass
class AIOutput:
    """
    Representa saída de componente de IA com metadados
    de confiança e proveniência para comunicação transparente.
    """
    content: str
    confidence: ConfidenceLevel
    confidence_score: Optional[float] = None
    model_version: Optional[str] = None
    prompt_hash: Optional[str] = None
    alternatives_considered: int = 0
    validation_status: str = "unverified"
    
    def to_interface_representation(self) -> dict:
        """
        Converte para representação adequada à interface,
        incluindo indicadores visuais de confiança.
        """
        confidence_indicators = {
            ConfidenceLevel.HIGH: {"icon": "✓", "color": "green", "message": "Alta confiança"},
            ConfidenceLevel.MEDIUM: {"icon": "~", "color": "yellow", "message": "Verificação recomendada"},
            ConfidenceLevel.LOW: {"icon": "!", "color": "orange", "message": "Revisão necessária"},
            ConfidenceLevel.UNCERTAIN: {"icon": "?", "color": "red", "message": "Incerteza significativa"}
        }
        
        indicator = confidence_indicators[self.confidence]
        
        return {
            'content': self.content,
            'confidence_indicator': indicator,
            'metadata': {
                'model': self.model_version,
                'alternatives': self.alternatives_considered,
                'status': self.validation_status
            },
            'recommendation': self._generate_recommendation()
        }
    
    def _generate_recommendation(self) -> str:
        """Gera recomendação contextual baseada no nível de confiança."""
        if self.confidence == ConfidenceLevel.HIGH:
            return "Pronto para uso com supervisão padrão"
        elif self.confidence == ConfidenceLevel.MEDIUM:
            return "Revisar lógica de negócio antes de integrar"
        elif self.confidence == ConfidenceLevel.LOW:
            return "Requer validação por testes antes de aceitação"
        else:
            return "Não recomendado para uso sem análise humana detalhada"

class AnthropizedInterface:
    """
    Interface antropizada para sistema com componentes de IA.
    Comunica incerteza, limitações e proveniência de forma transparente.
    """
    
    def __init__(self, system_name: str, capabilities: List[str]):
        self.system_name = system_name
        self.capabilities = capabilities
        self.limitations = []
    
    def add_limitation(self, limitation: str, mitigation: str):
        """Registra limitação conhecida do sistema e sua mitigação."""
        self.limitations.append({
            'limitation': limitation,
            'mitigation': mitigation
        })
    
    def present_output(self, output: AIOutput, context: str = "") -> dict:
        """
        Apresenta saída de IA com contexto apropriado de
        confiança e limitações.
        """
        representation = output.to_interface_representation()
        
        return {
            'system': self.system_name,
            'context': context,
            'output': representation,
            'capabilities_disclaimer': f"Este sistema é capaz de: {', '.join(self.capabilities)}",
            'limitations_notice': self._format_limitations(),
            'human_oversight_required': output.confidence != ConfidenceLevel.HIGH
        }
    
    def _format_limitations(self) -> str:
        """Formata limitações para apresentação ao usuário."""
        if not self.limitations:
            return ""
        
        formatted = "Limitações conhecidas:\n"
        for lim in self.limitations:
            formatted += f"- {lim['limitation']}\n"
            formatted += f"  Mitigação: {lim['mitigation']}\n"
        
        return formatted
```

### 1.3.3 Design para Auditabilidade

A auditabilidade de sistemas com componentes de IA requer mecanismos que registrem **histórico de prompts**, **versões de modelo**, **scores de confiança** e **decisões de aceitação**. Genc e colaboradores (2024) propuseram um padrão de auditabilidade que registra esses metadados junto ao código gerado, facilitando análise forense e revisão post-hoc.

```python
import hashlib
import json
from datetime import datetime
from typing import Dict, Optional
from dataclasses import dataclass, asdict

@dataclass
class AuditRecord:
    """
    Registro de auditoria para código gerado por IA.
    Captura proveniência completa para análise post-hoc.
    """
    timestamp: str
    prompt: str
    prompt_hash: str
    model_version: str
    model_provider: str
    generated_code: str
    code_hash: str
    confidence_score: Optional[float]
    acceptance_decision: str  # 'accepted', 'rejected', 'modified'
    reviewer_id: Optional[str]
    rationale: Optional[str]
    
    @classmethod
    def create(cls, prompt: str, generated_code: str, model_info: dict,
               confidence: Optional[float] = None) -> 'AuditRecord':
        """Cria registro de auditoria para novo código gerado."""
        return cls(
            timestamp=datetime.utcnow().isoformat(),
            prompt=prompt,
            prompt_hash=hashlib.sha256(prompt.encode()).hexdigest()[:16],
            model_version=model_info.get('version', 'unknown'),
            model_provider=model_info.get('provider', 'unknown'),
            generated_code=generated_code,
            code_hash=hashlib.sha256(generated_code.encode()).hexdigest()[:16],
            confidence_score=confidence,
            acceptance_decision="pending",
            reviewer_id=None,
            rationale=None
        )
    
    def record_acceptance(self, reviewer: str, rationale: str, 
                         modified: bool = False):
        """Registra decisão de aceitação com justificativa."""
        self.acceptance_decision = "modified" if modified else "accepted"
        self.reviewer_id = reviewer
        self.rationale = rationale
    
    def to_log_entry(self) -> str:
        """Converte para entrada de log estruturado."""
        return json.dumps(asdict(self), indent=2)

class AuditTrail:
    """
    Rastro de auditoria para código gerado por IA em um projeto.
    """
    
    def __init__(self, project_id: str):
        self.project_id = project_id
        self.records: list = []
    
    def add_record(self, record: AuditRecord):
        """Adiciona registro ao rastro de auditoria."""
        self.records.append(record)
    
    def query_by_code_hash(self, code_hash: str) -> list:
        """Consulta registros por hash de código."""
        return [r for r in self.records if r.code_hash == code_hash]
    
    def generate_audit_report(self, start_date: Optional[str] = None,
                             end_date: Optional[str] = None) -> dict:
        """Gera relatório de auditoria para período especificado."""
        total = len(self.records)
        accepted = sum(1 for r in self.records if r.acceptance_decision == 'accepted')
        rejected = sum(1 for r in self.records if r.acceptance_decision == 'rejected')
        modified = sum(1 for r in self.records if r.acceptance_decision == 'modified')
        
        return {
            'project_id': self.project_id,
            'total_records': total,
            'acceptance_rate': accepted / total if total > 0 else 0,
            'rejection_rate': rejected / total if total > 0 else 0,
            'modification_rate': modified / total if total > 0 else 0,
            'average_confidence': sum(r.confidence_score for r in self.records 
                                    if r.confidence_score is not None) / total 
                                    if total > 0 else None
        }
```

## 1.4 Padrões para Saídas Probabilísticas

### 1.4.1 Padrão Propor-Validar (Proposal-Validate)

Chen et al. (2025) recomendam o padrão **Propor-Validar**, onde a IA propõe múltiplas alternativas de código e um módulo de validação testa cada uma contra testes unitários e análise estática, selecionando a alternativa de maior confiança que passe nos critérios.

```python
from typing import List, Callable, Optional
from dataclasses import dataclass
import concurrent.futures

@dataclass
class CodeProposal:
    """Proposta de código gerada por IA."""
    code: str
    confidence: float
    generation_metadata: dict
    
@dataclass
class ValidationResult:
    """Resultado de validação de proposta."""
    proposal: CodeProposal
    passed: bool
    test_results: dict
    static_analysis: dict
    overall_score: float

class ProposalValidatePattern:
    """
    Implementação do padrão Propor-Validar para código gerado por IA.
    """
    
    def __init__(self, validator_functions: List[Callable[[str], dict]]):
        self.validators = validator_functions
    
    def select_best_proposal(self, proposals: List[CodeProposal],
                           timeout_seconds: int = 30) -> Optional[CodeProposal]:
        """
        Seleciona melhor proposta dentre múltiplas alternativas.
        """
        results = []
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future_to_proposal = {
                executor.submit(self._validate_proposal, proposal): proposal
                for proposal in proposals
            }
            
            for future in concurrent.futures.as_completed(future_to_proposal, 
                                                         timeout=timeout_seconds):
                proposal = future_to_proposal[future]
                try:
                    result = future.result()
                    results.append(result)
                except Exception as e:
                    print(f"Validação falhou para proposta: {e}")
        
        # Selecionar melhor proposta que passou na validação
        valid_results = [r for r in results if r.passed]
        if not valid_results:
            return None
        
        # Ordenar por score combinado (confiança da IA * score de validação)
        best = max(valid_results, 
                  key=lambda r: r.proposal.confidence * r.overall_score)
        
        return best.proposal
    
    def _validate_proposal(self, proposal: CodeProposal) -> ValidationResult:
        """Valida uma proposta individual contra todos os validadores."""
        test_results = {}
        all_passed = True
        
        for validator in self.validators:
            result = validator(proposal.code)
            test_results[validator.__name__] = result
            if not result.get('passed', False):
                all_passed = False
        
        # Calcular score combinado
        scores = [r.get('score', 0.5) for r in test_results.values()]
        overall = sum(scores) / len(scores) if scores else 0.0
        
        return ValidationResult(
            proposal=proposal,
            passed=all_passed,
            test_results=test_results,
            static_analysis={},  # Preencher com análise estática real
            overall_score=overall
        )
```

### 1.4.2 Padrão de Ciclo de Feedback (Feedback Loop)

Tang et al. (2024) projetaram uma arquitetura de **Ciclo de Feedback** que refina continuamente saídas de IA baseada em instrumentação de runtime e correções de desenvolvedores, reduzindo a propagação de erros.

```python
from typing import Dict, List, Optional, Callable
from dataclasses import dataclass
from datetime import datetime

@dataclass
class FeedbackEvent:
    """Evento de feedback para refinamento contínuo."""
    timestamp: datetime
    code_version: str
    runtime_metrics: dict
    error_reports: List[dict]
    developer_corrections: List[dict]
    
class FeedbackLoopPattern:
    """
    Implementação do padrão de Ciclo de Feedback para
    refinamento contínuo de código gerado por IA.
    """
    
    def __init__(self, code_generator: Callable, refinement_prompt_builder: Callable):
        self.code_generator = code_generator
        self.build_refinement_prompt = refinement_prompt_builder
        self.feedback_history: List[FeedbackEvent] = []
        self.current_version = 0
    
    def generate_with_feedback(self, initial_prompt: str,
                              max_iterations: int = 3) -> dict:
        """
        Gera código com refinamento iterativo baseado em feedback.
        """
        current_code = self.code_generator(initial_prompt)
        self.current_version += 1
        
        for iteration in range(max_iterations):
            # Simular execução e coletar métricas
            runtime_metrics = self._simulate_execution(current_code)
            
            # Verificar se atende critérios de aceitação
            if self._meets_acceptance_criteria(runtime_metrics):
                return {
                    'code': current_code,
                    'iterations': iteration + 1,
                    'final_metrics': runtime_metrics,
                    'success': True
                }
            
            # Construir prompt de refinamento com feedback
            refinement_prompt = self.build_refinement_prompt(
                original_prompt=initial_prompt,
                current_code=current_code,
                metrics=runtime_metrics,
                iteration=iteration + 1
            )
            
            # Gerar código refinado
            current_code = self.code_generator(refinement_prompt)
            self.current_version += 1
        
        return {
            'code': current_code,
            'iterations': max_iterations,
            'final_metrics': runtime_metrics,
            'success': False,
            'note': 'Número máximo de iterações atingido sem atingir critérios'
        }
    
    def _simulate_execution(self, code: str) -> dict:
        """Simula execução e coleta métricas de runtime."""
        # Implementação real executaria o código em ambiente sandbox
        return {
            'execution_time_ms': 0,
            'memory_usage_mb': 0,
            'test_pass_rate': 0.0,
            'error_count': 0
        }
    
    def _meets_acceptance_criteria(self, metrics: dict) -> bool:
        """Verifica se métricas atendem critérios de aceitação."""
        return metrics.get('test_pass_rate', 0) >= 0.95 and \
               metrics.get('error_count', 1) == 0
```

## 1.5 Verificação e Validação de Código Gerado

### 1.5.1 Abordagens Formais e Automatizadas

A pesquisa de Schmidt et al. (2025) integrou condições de verificação SPARK/Ada em um pipeline de IA, verificando propriedades funcionais de rotinas geradas antes da integração em sistemas críticos. Frontiers in Computer Science (2025) revisou técnicas que combinam engenharia de prompts com execução simbólica e testes baseados em propriedades para validar comportamento e detectar falhas de segurança.

```python
from typing import List, Callable, Tuple
import random

class PropertyBasedValidator:
    """
    Validador baseado em propriedades para código gerado por IA.
    Implementa testes de propriedade que verificam invariantes
    independentemente de valores específicos de entrada.
    """
    
    def __init__(self, property_functions: List[Callable]):
        self.properties = property_functions
    
    def validate(self, code_under_test: str, 
                num_test_cases: int = 100) -> dict:
        """
        Valida código contra propriedades definidas usando
        geração aleatória de casos de teste.
        """
        results = []
        
        for property_func in self.properties:
            property_results = []
            
            for _ in range(num_test_cases):
                # Gerar entrada aleatória
                test_input = self._generate_random_input()
                
                try:
                    # Verificar propriedade
                    holds = property_func(code_under_test, test_input)
                    property_results.append({
                        'input': test_input,
                        'holds': holds
                    })
                except Exception as e:
                    property_results.append({
                        'input': test_input,
                        'holds': False,
                        'error': str(e)
                    })
            
            # Calcular taxa de sucesso para esta propriedade
            success_rate = sum(1 for r in property_results if r['holds']) / len(property_results)
            
            results.append({
                'property': property_func.__name__,
                'success_rate': success_rate,
                'test_cases': len(property_results),
                'failures': [r for r in property_results if not r['holds']][:5]  # Primeiras 5 falhas
            })
        
        overall_success = all(r['success_rate'] >= 0.95 for r in results)
        
        return {
            'overall_passed': overall_success,
            'properties_tested': len(results),
            'property_results': results,
            'minimum_success_rate': min(r['success_rate'] for r in results) if results else 0
        }
    
    def _generate_random_input(self) -> dict:
        """Gera entrada aleatória para teste de propriedade."""
        return {
            'integers': [random.randint(-1000, 1000) for _ in range(5)],
            'floats': [random.uniform(-100.0, 100.0) for _ in range(3)],
            'strings': [self._random_string() for _ in range(3)]
        }
    
    def _random_string(self, length: int = 10) -> str:
        """Gera string aleatória."""
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return ''.join(random.choice(chars) for _ in range(length))
```

### 1.5.2 Frameworks de Garantia de Qualidade

Bittner et al. (2019) introduziram **Checklists de QA para IA** que estendem critérios tradicionais de revisão de código com checkpoints específicos para IA, como qualidade de prompt, risco de alucinação e alinhamento com padrões de codificação. Kamar et al. (2023) propuseram **Integração Contínua Aprimorada por IA**, onde ferramentas de IA auxiliam na escrita de testes, geração de documentação e síntese de changelogs, integradas em pipelines CI/CD para manter velocidade de desenvolvimento e governança.

## 1.6 Anti-Padrões de Design com IA

### 1.6.1 Aceitação Cega (Blind Acceptance)

**Problema:** Aceitar código gerado sem avaliação crítica.

**Consequências:**
- Débito técnico invisível
- Vulnerabilidades de segurança
- Código que "funciona" mas não é semanticamente correto

**Mitigação:**

```python
def validate_before_acceptance(code_proposal: str, 
                              requirements: dict,
                              security_scanner: Callable = None) -> dict:
    """
    Checklist obrigatório antes de aceitar código gerado.
    """
    checks = {
        'security': {
            'no_eval': 'eval(' not in code_proposal,
            'no_exec': 'exec(' not in code_proposal,
            'no_dangerous_imports': '__import__' not in code_proposal,
            'custom_scan': security_scanner(code_proposal) if security_scanner else True
        },
        'quality': {
            'reasonable_size': len(code_proposal.split('\n')) < 200,
            'no_todos': 'TODO' not in code_proposal.upper(),
            'has_docstrings': '"""' in code_proposal or "'''" in code_proposal
        },
        'testability': {
            'has_functions': 'def ' in code_proposal,
            'has_returns': 'return ' in code_proposal
        },
        'requirements_alignment': {
            'functionality_present': requirements.get('functionality', '') in code_proposal
        }
    }
    
    all_passed = all(
        all(check_results.values())
        for check_results in checks.values()
    )
    
    return {
        'passed': all_passed,
        'checks': checks,
        'recommendation': 'Accept' if all_passed else 'Reject or Revise'
    }
```

### 1.6.2 Over-Engineering por Prompt

**Problema:** Prompts que geram soluções excessivamente complexas.

**Sintomas:**
- Uso de padrões de design desnecessários para problemas simples
- Abstrações prematuras
- Código genérico onde específico seria mais apropriado

**Mitigação:** Especificar explicitamente restrições de complexidade nos prompts e validar complexidade ciclomática do código gerado.

### 1.6.3 Perda de Contexto

**Problema:** Código gerado que não considera o contexto do sistema existente.

**Mitigação:** Usar técnicas de **RAG (Retrieval-Augmented Generation)** para incluir contexto relevante do codebase nos prompts de geração.

## Practical Considerations

1. **Antes de delegar decisões para IA, defina limites explícitos:** estabeleça o que pode variar, o que deve ser determinístico e como validar cada categoria.

2. **Prefira designs que produzam evidência:** logs estruturados, rastros de decisão e contratos explícitos reduzem o custo de verificação e facilitam auditorias.

3. **Implemente checkpoints de decisão:** em pontos críticos do fluxo, exija confirmação humana antes de permitir que ações de IA sejam executadas.

4. **Mantenha registros de proveniência:** documente qual modelo gerou cada trecho de código, com qual prompt e em qual versão, para rastreabilidade futura.

5. **Estabeleça métricas de qualidade específicas para código gerado:** taxa de aceitação, tempo médio de revisão, taxa de bugs pós-integração e cobertura de testes.

## Summary

- O design de software na era dos LLMs é orientado a **restrições**, **verificabilidade** e **supervisão humana** como mecanismos primários de governança.

- O paradigma de **curadoria** substitui o de autoria: engenheiros avaliam e integram código gerado em vez de escrevê-lo manualmente.

- A **antropização de interfaces** comunica incerteza e limitações de sistemas de IA de forma transparente, estabelecendo expectativas realistas e mantendo vigilância apropriada.

- O **design para auditabilidade** requer registros de proveniência, metadados de confiança e mecanismos de rastreamento que permitam análise forense post-hoc.

- **Padrões para saídas probabilísticas** como Propor-Validar e Ciclo de Feedback decoplam geração de execução, incorporando mecanismos de fallback e checkpoints de intervenção humana.

- Componentes estocásticos requerem **fronteiras explícitas**, **contratos formais** e **mecanismos de fallback** para operar com segurança em sistemas de produção.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Princípios fundamentais (verificabilidade, auditabilidade) permanecem; técnicas específicas de integração com LLMs evoluem rapidamente | Média |
| **Custo de Verificação** | Verificação de código gerado exige expertise especializada e ferramentas específicas; custo significativamente maior que revisão de código tradicional | Alto |
| **Responsabilidade Legal** | Designers permanecem responsáveis pela integridade de código gerado; necessidade de rastreabilidade e documentação de decisões para atribuição de responsabilidade | Alto |

## References

ALLAMANIS, M.; PANTHAPLACKEL, S.; YIN, P. Unsupervised Evaluation of Code LLMs with Round-Trip Correctness. *arXiv preprint arXiv:2402.08699*, 2024.

BITTNER, E. A. S. et al. Addressing challenges of AI development with checklists. In: *Proceedings of the 52nd Hawaii International Conference on System Sciences*. 2019.

CHEN, Y. et al. From Prompts to Properties: Rethinking LLM Code Generation with Property-Based Testing. In: *Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering (FSE 2025)*. ACM, 2025. DOI: 10.1145/3696630.3728702.

CHI, O. H. et al. Anthropomorphism and trust in AI code assistants. *Computers in Human Behavior*, v. 150, p. 108022, 2024.

FAKHOURY, S. et al. LLM-based Test-driven Interactive Code Generation: User Study and Empirical Evaluation. *IEEE Transactions on Software Engineering*, 2024.

FRONTIERS IN COMPUTER SCIENCE. Verification and validation techniques for LLM-generated code: A systematic review. *Frontiers in Computer Science*, v. 7, 2025. DOI: 10.3389/fcomp.2025.1655469.

GENC, S. et al. AI-generated code demands trust-but-verify approach to software development. SonarSource Research, 2024. Disponível em: https://www.sonarsource.com/blog/ai-generated-code-demands-trust-but-verify-approach-to-software-development.

GRÖPLER, R. et al. The Future of Generative AI in Software Engineering: A Vision from Industry and Academia in the European GENIUS Project. *arXiv preprint arXiv:2511.01348*, 2025.

IEEE COMPUTER SOCIETY. *SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge*. IEEE, 2024.

KAMAR, E. et al. AI-Enhanced Continuous Integration: Opportunities and Challenges. *Microsoft Research Technical Report*, 2023.

LAU, S.; GUO, P. J. The Design Space of LLM-Based AI Coding Assistants: An Analysis of 90 Systems in Academia and Industry. UC San Diego, 2025. Disponível em: https://lau.ucsd.edu/pubs/2025_analysis-of-90-genai-coding-tools_VLHCC.pdf.

SCHMIDT, E. et al. Integrating SPARK verification conditions into AI code generation pipelines. In: *Proceedings of the ACM SIGAda Annual Conference on High Integrity Language Technology*. ACM, 2025.

SONG, Y.; ZHU, Q.; LUO, J. An AI design framework for human-AI collaboration. In: *Proceedings of the Design Society*. Cambridge University Press, 2024. DOI: 10.1017/pds.2024.227.

STRAY, V.; BARBALA, M. Y.; WIVESTAD, J. The Human-AI Collaboration and Adaptation Framework (HACAF): A mixed-methods study of GitHub Copilot and ChatGPT adoption. In: *Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering (FSE 2025)*. ACM, 2025. DOI: 10.1145/3696630.3730566.

TANG, A. et al. Feedback loop architectures for continuous refinement of AI-generated code. *IEEE Software*, v. 41, n. 3, p. 45-52, 2024.

XU, X. et al. Scale of AI Anthropomorphism (SAIA): Development and validation. *Technology in Society*, v. 79, p. 103189, 2025. DOI: 10.1016/j.techsoc.2025.103189.

---

*SWEBOK-AI v5.0 - Software Design (Hybrid Systems)*

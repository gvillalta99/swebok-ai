# Seção 7: Refatoração e Modernização Assistida

## Overview

Esta seção discute como usar IA de forma governada em refatoração e modernização: reduzir risco de mudanças amplas, preservar comportamento e produzir evidência de equivalência.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Planejar refatorações assistidas com critérios de segurança e reversibilidade
2. Definir estratégias de verificação para mudanças geradas (testes, invariantes, métricas)
3. Identificar armadilhas típicas (mudanças semânticas silenciosas, regressões)

## 7.1 Introdução

A refatoração tradicional era um processo manual de melhoria de código existente sem alterar comportamento externo. Na era dos LLMs, a refatoração torna-se um processo colaborativo onde ferramentas de IA sugerem transformações, e engenheiros aplicam julgamento crítico para selecionar, adaptar e validar mudanças.

A **Refatoração Assistida por IA** representa uma mudança de paradigma: de transformações manuais cuidadosas para curadoria de transformações automáticas, mantendo a garantia de preservação de comportamento.

## 7.2 Tipos de Refatoração Assistida

### 7.2.1 Taxonomia de Transformações

```
┌─────────────────────────────────────────────────────────────────┐
│              TIPOS DE REFATORAÇÃO ASSISTIDA POR IA              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Refatorações Automáticas (Alta Confiança)                      │
│  ├── Renomeação de variáveis                                   │
│  ├── Extração de métodos (casos simples)                       │
│  ├── Formatação e estilo                                       │
│  ├── Organização de imports                                    │
│  └── Adição de type hints                                      │
│  └── Nível de revisão: Mínimo ou nenhum                        │
│                                                                 │
│  Refatorações Supervisionas (Média Confiança)                   │
│  ├── Extração de classes                                       │
│  ├── Movimentação de métodos                                   │
│  ├── Introdução de padrões de design                           │
│  ├── Simplificação de expressões complexas                     │
│  └── Nível de revisão: Verificação de comportamento            │
│                                                                 │
│  Refatorações Assistidas (Requer Orientação)                    │
│  ├── Mudanças arquiteturais                                    │
│  ├── Migração entre frameworks                                 │
│  ├── Modernização de APIs deprecadas                           │
│  ├── Extração de serviços                                      │
│  └── Nível de revisão: Testes completos + revisão de pares     │
│                                                                 │
│  Refatorações Proibidas (Não Automatizáveis)                    │
│  ├── Mudanças em lógica de negócio                             │
│  ├── Alterações em algoritmos críticos                         │
│  ├── Mudanças em comportamento de segurança                    │
│  └── Nível de revisão: Apenas manual                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 7.3 Padrões de Refatoração Assistida

### 7.3.1 Padrão: Transformação com Oráculo

```python
from typing import Callable, List, Tuple
from dataclasses import dataclass

@dataclass
class RefactoringProposal:
    """
    Proposta de refatoração com metadados para avaliação.
    """
    description: str
    original_code: str
    refactored_code: str
    confidence: float
    test_preservation: bool
    complexity_delta: int
    
class OracleBasedRefactoring:
    """
    Refatoração que usa oráculo para garantir equivalência.
    """
    
    def __init__(self, oracle: Callable):
        self.oracle = oracle
        self.test_cases = []
    
    def add_test_case(self, input_data, expected_output):
        """Adiciona caso de teste para validação."""
        self.test_cases.append((input_data, expected_output))
    
    def validate_proposal(self, proposal: RefactoringProposal) -> ValidationResult:
        """
        Valida proposta usando oráculo.
        """
        # Compilar código original e refatorado
        original_func = self._compile(proposal.original_code)
        refactored_func = self._compile(proposal.refactored_code)
        
        # Testar com casos de teste
        for input_data, expected in self.test_cases:
            original_result = original_func(input_data)
            refactored_result = refactored_func(input_data)
            
            # Verificar se resultados são equivalentes
            if not self._equivalent(original_result, refactored_result):
                return ValidationResult(
                    valid=False,
                    reason=f"Divergência para input {input_data}: "
                          f"original={original_result}, "
                          f"refactored={refactored_result}"
                )
            
            # Verificar se comportamento é preservado
            if not self.oracle(input_data, refactored_result):
                return ValidationResult(
                    valid=False,
                    reason=f"Oráculo rejeitou resultado para input {input_data}"
                )
        
        return ValidationResult(valid=True)
    
    def _equivalent(self, result1, result2) -> bool:
        """Verifica equivalência semântica de resultados."""
        return result1 == result2
    
    def _compile(self, code: str) -> Callable:
        """Compila código para função executável."""
        namespace = {}
        exec(code, namespace)
        return namespace.get('target_function')

# Exemplo: Extração de método
class ExtractMethodRefactoring(OracleBasedRefactoring):
    """
    Refatoração de extração de método com validação.
    """
    
    def propose(self, code: str, start_line: int, end_line: int) -> List[RefactoringProposal]:
        """
        Gera propostas de extração de método.
        """
        # Extrair código alvo
        target_code = self._extract_lines(code, start_line, end_line)
        
        # Gerar múltiplas propostas (diferentes estratégias)
        proposals = []
        
        # Proposta 1: Extração simples
        proposal1 = self._generate_simple_extraction(code, target_code)
        proposals.append(proposal1)
        
        # Proposta 2: Extração com parametrização
        proposal2 = self._generate_parameterized_extraction(code, target_code)
        proposals.append(proposal2)
        
        # Validar cada proposta
        valid_proposals = [
            p for p in proposals 
            if self.validate_proposal(p).valid
        ]
        
        return valid_proposals
```

### 7.3.2 Padrão: Modernização Gradual

```python
from enum import Enum, auto
from typing import List, Dict
from dataclasses import dataclass

class MigrationStep(Enum):
    ANALYSIS = auto()
    PREPARATION = auto()
    TRANSFORMATION = auto()
    VALIDATION = auto()
    ROLLBACK_PLAN = auto()

@dataclass
class MigrationPhase:
    step: MigrationStep
    description: str
    automated: bool
    validation_required: bool
    rollback_point: bool

class GradualModernization:
    """
    Modernização de código legado em fases controladas.
    """
    
    def __init__(self, codebase_path: str):
        self.codebase = codebase_path
        self.phases: List[MigrationPhase] = []
        self.current_phase = 0
    
    def plan_migration(self, 
                      from_pattern: str,
                      to_pattern: str) -> List[MigrationPhase]:
        """
        Planeja migração em fases.
        """
        return [
            MigrationPhase(
                step=MigrationStep.ANALYSIS,
                description="Analisar uso atual do padrão",
                automated=True,
                validation_required=True,
                rollback_point=False
            ),
            MigrationPhase(
                step=MigrationStep.PREPARATION,
                description="Adicionar abstrações de compatibilidade",
                automated=False,
                validation_required=True,
                rollback_point=True
            ),
            MigrationPhase(
                step=MigrationStep.TRANSFORMATION,
                description="Aplicar transformações",
                automated=True,
                validation_required=True,
                rollback_point=True
            ),
            MigrationPhase(
                step=MigrationStep.VALIDATION,
                description="Validar equivalência comportamental",
                automated=False,
                validation_required=True,
                rollback_point=False
            )
        ]
    
    def execute_phase(self, phase: MigrationPhase) -> PhaseResult:
        """
        Executa fase específica da migração.
        """
        if phase.step == MigrationStep.ANALYSIS:
            return self._analyze_current_usage()
        elif phase.step == MigrationStep.PREPARATION:
            return self._prepare_abstractions()
        elif phase.step == MigrationStep.TRANSFORMATION:
            return self._apply_transformations()
        elif phase.step == MigrationStep.VALIDATION:
            return self._validate_migration()
        
        return PhaseResult.success()
    
    def _analyze_current_usage(self) -> PhaseResult:
        """Analisa uso atual do padrão no código."""
        findings = []
        
        for file in self._find_source_files():
            matches = self._find_pattern_usage(file)
            findings.extend(matches)
        
        return PhaseResult(
            success=True,
            findings=findings,
            summary=f"Encontrados {len(findings)} usos do padrão"
        )
```

## 7.4 Estratégias de Preservação de Comportamento

### 7.4.1 Testes de Regressão como Segurança

```python
from typing import Set
import ast

class BehaviorPreservationChecker:
    """
    Verifica se refatoração preserva comportamento
    através de análise estática e testes.
    """
    
    def __init__(self, original_code: str):
        self.original = original_code
        self.original_ast = ast.parse(original_code)
        self.public_interface = self._extract_public_interface()
    
    def _extract_public_interface(self) -> Set[str]:
        """Extrai interface pública do código."""
        interface = set()
        
        for node in ast.walk(self.original_ast):
            if isinstance(node, ast.FunctionDef):
                if not node.name.startswith('_'):
                    interface.add(self._function_signature(node))
            elif isinstance(node, ast.ClassDef):
                interface.add(f"class {node.name}")
                for item in node.body:
                    if isinstance(item, ast.FunctionDef):
                        if not item.name.startswith('_'):
                            interface.add(
                                f"{node.name}.{self._function_signature(item)}"
                            )
        
        return interface
    
    def check_refactored(self, refactored_code: str) -> PreservationReport:
        """
        Verifica se código refatorado preserva comportamento.
        """
        refactored_ast = ast.parse(refactored_code)
        refactored_interface = self._extract_interface_from_ast(refactored_ast)
        
        # Verificar compatibilidade de interface
        interface_changes = self._compare_interfaces(
            self.public_interface,
            refactored_interface
        )
        
        # Verificar side effects
        side_effect_analysis = self._analyze_side_effects(refactored_ast)
        
        # Verificar complexidade
        complexity_delta = self._compare_complexity(
            self.original_ast,
            refactored_ast
        )
        
        return PreservationReport(
            interface_compatible=interface_changes.is_compatible,
            interface_changes=interface_changes.changes,
            side_effects_added=side_effect_analysis.new_side_effects,
            complexity_delta=complexity_delta,
            safe_to_apply=(
                interface_changes.is_compatible and
                not side_effect_analysis.new_side_effects and
                complexity_delta <= 0
            )
        )
```

### 7.4.2 Feature Flags para Refatoração

```python
from typing import Dict, Callable
from enum import Enum

class RefactoringToggle:
    """
    Sistema de feature flags para refatorações.
    Permite ativação gradual e rollback imediato.
    """
    
    def __init__(self, name: str):
        self.name = name
        self.strategies: Dict[str, Callable] = {}
        self.active_strategy = 'legacy'
        self.rollout_percentage = 0
    
    def register_strategy(self, name: str, implementation: Callable):
        """Registra estratégia de implementação."""
        self.strategies[name] = implementation
    
    def execute(self, *args, **kwargs):
        """
        Executa com estratégia selecionada.
        """
        # Decidir qual estratégia usar
        strategy_name = self._select_strategy()
        
        # Executar
        return self.strategies[strategy_name](*args, **kwargs)
    
    def _select_strategy(self) -> str:
        """Seleciona estratégia baseado em configuração."""
        import random
        
        if self.active_strategy == 'legacy':
            return 'legacy'
        
        if self.active_strategy == 'new':
            if random.random() * 100 < self.rollout_percentage:
                return 'new'
            return 'legacy'
        
        return 'legacy'
    
    def enable_gradual_rollout(self, percentage: int):
        """Ativa rollout gradual."""
        self.active_strategy = 'new'
        self.rollout_percentage = percentage
    
    def rollback(self):
        """Desativa imediatamente."""
        self.active_strategy = 'legacy'
        self.rollout_percentage = 0

# Uso
class OrderService:
    def __init__(self):
        self.calculate_total_toggle = RefactoringToggle("calculate_total")
        
        # Registrar estratégias
        self.calculate_total_toggle.register_strategy(
            'legacy', 
            self._calculate_total_legacy
        )
        self.calculate_total_toggle.register_strategy(
            'new',
            self._calculate_total_refactored
        )
    
    def calculate_total(self, order):
        return self.calculate_total_toggle.execute(order)
```

## 7.5 Ferramentas e Integração

### 7.5.1 Pipeline de Refatoração Assistida

```yaml
# .github/workflows/refactoring-assistant.yml
name: Refactoring Assistant

on:
  workflow_dispatch:
    inputs:
      refactoring_type:
        description: 'Tipo de refatoração'
        required: true
        default: 'extract_method'
      target_files:
        description: 'Arquivos alvo'
        required: true

jobs:
  analyze-and-propose:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Analyze Code
        run: |
          python scripts/analyze_for_refactoring.py \
            --type ${{ github.event.inputs.refactoring_type }} \
            --files ${{ github.event.inputs.target_files }} \
            --output analysis.json
      
      - name: Generate Proposals
        run: |
          python scripts/generate_refactorings.py \
            --analysis analysis.json \
            --output proposals/
      
      - name: Validate Proposals
        run: |
          python scripts/validate_refactorings.py \
            --proposals proposals/ \
            --test-suite tests/ \
            --output validated/
      
      - name: Create PR
        run: |
          gh pr create \
            --title "[ASSISTED] Refactoring proposals" \
            --body "Generated refactoring proposals with validation"
```

## 7.6 Exercícios

1. Implemente um `BehaviorPreservationChecker` que analise ASTs para detectar mudanças na interface pública.

2. Crie um sistema de `RefactoringToggle` para uma refatoração de extração de classe em um sistema legado.

3. Projete um pipeline de refatoração assistida para migração de callbacks para async/await.

## Practical Considerations

- Refatore em fatias pequenas e verificáveis; evite “big bang” gerado.
- Exija evidência de equivalência (testes, contratos, métricas) antes de integrar.

## Summary

- A IA acelera mudanças, mas o gargalo é verificação e preservação de comportamento.
- Reversibilidade e evidência são critérios de segurança para modernização.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. PANDEY, R. et al. Transforming Software Development: Evaluating the Efficiency and Challenges of GitHub Copilot in Real-World Projects. arXiv:2406.17910, 2024.

3. GITHUB. Research: Quantifying GitHub Copilot's impact in the enterprise with Accenture. GitHub Blog, 2024. Disponível em: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-in-the-enterprise-with-accenture

4. McKINSEY & COMPANY. How generative AI could accelerate software product time to market. McKinsey Technology, Media and Telecommunications, 2024. Disponível em: https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/how-generative-ai-could-accelerate-software-product-time-to-market

---

*SWEBOK-AI v5.0 - Software Design*

---
title: "06. Design para Verificabilidade"
created_at: "2025-01-31"
tags: ["software-design", "verificabilidade", "testabilidade", "codigo-gerado", "validacao"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# 06. Design para Verificabilidade

## Overview

Na era dos LLMs, onde código pode ser gerado em segundos, o gargalo da engenharia de software deslocou-se da produção para a verificação. Design para verificabilidade é a disciplina de estruturar sistemas de forma que sua correção possa ser eficientemente validada, seja por testes automatizados, análise estática ou revisão humana.

Segundo pesquisa de Bui et al. (2025), a avaliação de corretude de código gerado por LLMs usando representações internas é um campo emergente crítico [1]. Alshahwan et al. (2024) propõem a engenharia de software baseada em LLMs garantida (Assured LLM-Based Software Engineering) [2].

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Projetar sistemas que facilitem verificação automatizada
2. Implementar estratégias de teste para código não-determinístico
3. Aplicar técnicas de análise estática e formal
4. Avaliar trade-offs entre verificabilidade e outras qualidades

## Fundamentos de Verificabilidade

### O Paradoxo da Geração Rápida

```
┌─────────────────────────────────────────────────────────────────┐
│              PARADOXO DA GERAÇÃO RÁPIDA                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ANTES DOS LLMs:                    COM LLMs:                  │
│   ───────────────                    ─────────                  │
│                                                                 │
│   Escrever código ────────▶          Gerar código ────────▶    │
│        │ (semanas)                        │ (minutos)          │
│        ▼                                  ▼                     │
│   Testar código ◀────────          Verificar código ◀────────  │
│        │ (dias)                           │ (semanas?)         │
│        ▼                                  ▼                     │
│   Deploy                              Deploy?                   │
│                                                                 │
│   CONCLUSÃO: O gargalo mudou de produção para verificação      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Dimensões da Verificabilidade

| Dimensão | Descrição | Técnicas |
|----------|-----------|----------|
| **Funcional** | O código faz o que deveria? | Testes unitários, integração, e2e |
| **Estrutural** | O código está bem estruturado? | Análise estática, métricas de código |
| **Segurança** | O código é seguro? | SAST, DAST, fuzzing |
| **Performance** | O código atende requisitos não-funcionais? | Benchmarks, profiling |
| **Conformidade** | O código segue padrões? | Linting, style checks |

## Estratégias de Teste para Código Gerado

### 1. Testes Baseados em Propriedades (Property-Based Testing)

Ao invés de testar exemplos específicos, define propriedades que devem sempre ser verdadeiras.

```python
from hypothesis import given, strategies as st

class TestGeneratedSorting:
    """
    Testes de propriedade para algoritmo de ordenação gerado.
    """
    
    @given(st.lists(st.integers()))
    def test_result_is_sorted(self, data):
        """Propriedade: resultado deve estar ordenado."""
        result = generated_sort(data)
        assert all(result[i] <= result[i+1] 
                  for i in range(len(result)-1))
    
    @given(st.lists(st.integers()))
    def test_preserves_elements(self, data):
        """Propriedade: elementos devem ser preservados."""
        result = generated_sort(data)
        assert sorted(data) == result
    
    @given(st.lists(st.integers()))
    def test_idempotent(self, data):
        """Propriedade: ordenar resultado ordenado não muda nada."""
        once = generated_sort(data)
        twice = generated_sort(once)
        assert once == twice
```

### 2. Testes de Contrato

Validação de pré-condições, pós-condições e invariantes.

```python
class ContractTest:
    def test_preconditions(self):
        """Verifica se pré-condições são validadas."""
        with pytest.raises(PreconditionViolation):
            service.process(None)  # None viola pré-condição
        
        with pytest.raises(PreconditionViolation):
            service.process([])   # Lista vazia viola pré-condição
    
    def test_postconditions(self):
        """Verifica se pós-condições são satisfeitas."""
        result = service.process(valid_input)
        assert result is not None  # Pós-condição: resultado não nulo
        assert result.status == "completed"
    
    def test_invariants(self):
        """Verifica invariantes após múltiplas operações."""
        for _ in range(100):
            service.process(generate_random_valid_input())
            assert service.is_valid_state()  # Invariante mantido
```

### 3. Testes de Mutação

Avalia a qualidade da suíte de testes introduzindo bugs artificiais.

```python
# Ferramenta: mutmut ou similar
# Processo:
# 1. Gera mutantes (pequenas alterações no código)
# 2. Executa testes contra cada mutante
# 3. Mutantes sobreviventes indicam lacunas nos testes

class MutationTesting:
    def run(self, source_code, test_suite):
        mutants = self.generate_mutants(source_code)
        
        results = []
        for mutant in mutants:
            killed = self.run_tests(mutant, test_suite)
            results.append({
                "mutant": mutant.description,
                "killed": killed,
                "location": mutant.location
            })
        
        mutation_score = sum(1 for r in results if r["killed"]) / len(results)
        return MutationReport(results, mutation_score)
```

### 4. Testes de Snapshot

Captura e compara saídas para detectar regressões.

```python
import json

class SnapshotTest:
    def __init__(self, snapshot_dir="snapshots"):
        self.snapshot_dir = snapshot_dir
    
    def assert_match(self, test_name, actual_output, tolerance=0.0):
        """
        Compara saída atual com snapshot armazenado.
        """
        snapshot_path = f"{self.snapshot_dir}/{test_name}.snap"
        
        if not os.path.exists(snapshot_path):
            # Primeira execução: cria snapshot
            self._save_snapshot(snapshot_path, actual_output)
            return
        
        expected = self._load_snapshot(snapshot_path)
        
        if tolerance > 0:
            # Comparação aproximada (para saídas probabilísticas)
            similarity = self._calculate_similarity(expected, actual_output)
            assert similarity >= (1 - tolerance), \
                f"Saída divergiu {similarity} do snapshot"
        else:
            assert expected == actual_output, \
                f"Saída diferente do snapshot. Use --update para atualizar."
```

## Análise Estática e Formal

### 1. Análise Estática Avançada

```python
# Configuração para código gerado
# Ferramentas: pylint, mypy, bandit, semgrep

STATIC_ANALYSIS_CONFIG = {
    "pylint": {
        "max_line_length": 100,
        "disable": [
            "C0103",  # naming-convention (código gerado pode ter nomes variados)
        ],
        "enable": [
            "E",  # Erros
            "W",  # Warnings
            "R0915",  # too-many-statements
            "R0912",  # too-many-branches
        ]
    },
    "bandit": {
        # Segurança
        "severity": "HIGH",
        "confidence": "HIGH"
    },
    "mypy": {
        "strict": True,
        "ignore_missing_imports": False
    }
}
```

### 2. Verificação Formal

Para componentes críticos, verificação formal pode garantir correção.

```python
# Exemplo: verificação de invariantes com Z3
from z3 import *

def verify_sorting_algorithm(algorithm_ast):
    """
    Verifica formalmente que algoritmo de ordenação está correto.
    """
    # Cria solver
    solver = Solver()
    
    # Define array de entrada simbólico
    n = Int('n')
    arr = Array('arr', IntSort(), IntSort())
    
    # Pré-condição: n > 0
    solver.add(n > 0)
    
    # Simula execução do algoritmo
    result_arr = simulate(algorithm_ast, arr, n)
    
    # Pós-condição 1: resultado ordenado
    sorted_constraint = ForAll([i], 
        Implies(And(0 <= i, i < n-1), 
                result_arr[i] <= result_arr[i+1]))
    
    # Pós-condição 2: permutação do original
    permutation_constraint = ...
    
    solver.add(sorted_constraint)
    solver.add(permutation_constraint)
    
    # Verifica
    if solver.check() == sat:
        return VerificationResult.PASSED
    else:
        return VerificationResult.FAILED
```

## Métricas de Verificabilidade

### Métricas de Código

```python
@dataclass
class VerifiabilityMetrics:
    """Métricas que indicam facilidade de verificação."""
    
    # Complexidade
    cyclomatic_complexity: float
    cognitive_complexity: float
    
    # Cobertura
    line_coverage: float
    branch_coverage: float
    mutation_score: float
    
    # Acoplamento
    afferent_coupling: int   # Quem depende deste módulo
    efferent_coupling: int   # De quem este módulo depende
    
    # Coesão
    lack_of_cohesion: float
    
    # Documentação
    docstring_coverage: float
    type_hint_coverage: float
    
    def overall_score(self) -> float:
        """Calcula score geral de verificabilidade."""
        weights = {
            "complexity": 0.25,
            "coverage": 0.30,
            "coupling": 0.20,
            "cohesion": 0.15,
            "documentation": 0.10
        }
        
        scores = {
            "complexity": self._complexity_score(),
            "coverage": (self.line_coverage + self.branch_coverage) / 2,
            "coupling": self._coupling_score(),
            "cohesion": 1 - self.lack_of_cohesion,
            "documentation": (self.docstring_coverage + self.type_hint_coverage) / 2
        }
        
        return sum(weights[k] * scores[k] for k in weights)
```

### Thresholds Recomendados

| Métrica | Mínimo Aceitável | Ideal |
|---------|------------------|-------|
| Cyclomatic Complexity | <= 10 | <= 5 |
| Line Coverage | >= 70% | >= 90% |
| Branch Coverage | >= 60% | >= 80% |
| Mutation Score | >= 50% | >= 80% |
| Docstring Coverage | >= 50% | >= 90% |

## Verificação de Código Gerado

### Pipeline de Verificação

```
┌─────────────────────────────────────────────────────────────────┐
│              PIPELINE DE VERIFICAÇÃO                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Código Gerado                                                  │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐                                              │
│  │   Parse      │──▶ Erro de sintaxe? ──▶ REJEITAR             │
│  └──────────────┘                                              │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐                                              │
│  │   Lint       │──▶ Violação crítica? ──▶ REJEITAR            │
│  └──────────────┘                                              │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐                                              │
│  │ Type Check   │──▶ Erro de tipo? ──▶ REJEITAR                │
│  └──────────────┘                                              │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐                                              │
│  │   Testes     │──▶ Falha? ──▶ REJEITAR                       │
│  └──────────────┘                                              │
│       │                                                         │
│       ▼                                                         │
│  ┌──────────────┐                                              │
│  │   Security   │──▶ Vulnerabilidade? ──▶ REJEITAR             │
│  └──────────────┘                                              │
│       │                                                         │
│       ▼                                                         │
│   APROVADO                                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Verificação Estatística

Para código não-determinístico, usar métodos estatísticos:

```python
class StatisticalVerification:
    """
    Verificação estatística para componentes probabilísticos.
    """
    
    def verify(self, component, test_cases, confidence=0.95, tolerance=0.05):
        """
        Verifica que componente passa em pelo menos (confidence)% dos casos.
        """
        results = []
        for _ in range(self._calculate_sample_size(confidence, tolerance)):
            for test_case in test_cases:
                result = component.execute(test_case)
                results.append(result.is_correct)
        
        success_rate = sum(results) / len(results)
        
        if success_rate >= confidence - tolerance:
            return VerificationResult.PASSED
        else:
            return VerificationResult.FAILED
```

## Practical Considerations

### Aplicações Reais

1. **CI/CD**: Integrar verificação automatizada na pipeline
2. **Code Review**: Ferramentas de análise estática como gate
3. **Pre-commit Hooks**: Verificação rápida antes de commits
4. **Nightly Builds**: Testes extensivos (mutation, fuzzing)

### Limitações

- **Custo Computacional**: Verificação formal é cara
- **Falsos Positivos**: Análise estática pode gerar ruído
- **Cobertura Limitada**: Testes não garantem ausência de bugs
- **Tempo**: Verificação completa pode ser lenta

### Melhores Práticas

1. **Pirâmide de Testes**: Mais unitários, menos e2e
2. **Shift Left**: Verificação o mais cedo possível
3. **Fail Fast**: Detectar problemas rapidamente
4. **Observabilidade**: Métricas de verificação visíveis
5. **Balanceamento**: Trade-off entre rigor e velocidade

## Summary

- Verificabilidade tornou-se o gargalo na era dos LLMs
- Testes baseados em propriedades são efetivos para código gerado
- Análise estática deve ser integrada na pipeline
- Verificação formal pode ser usada para componentes críticos
- Métricas quantitativas guiam melhoria contínua

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — verificação permanece crítica |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto — verificação requer expertise significativa |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — falhas de verificação podem causar danos graves |

## References

1. Bui, T.-D.; Vu, T. T.; Nguyen, T.-T.; et al. "Correctness assessment of code generated by Large Language Models using internal representations." Journal of Systems and Software, Vol. 230, 2025. https://doi.org/10.1016/j.jss.2025.112570

2. Alshahwan, N.; Harman, M.; Harper, I.; et al. "Assured LLM-Based Software Engineering." arXiv:2402.04380, 2024. https://arxiv.org/abs/2402.04380

3. Ma, Z.; Zhang, T.; et al. "Rethinking Verification for LLM Code Generation: From Generation to Testing." NeurIPS 2025. https://openreview.net/forum?id=Gp2vgxWROE

4. Aniche, M.; Beller, M.; et al. "In Search of a Silver Bullet: A Survey of Software Testing Practices." IEEE, 2022.

5. Zeller, A. "Why Programs Fail: A Guide to Systematic Debugging." Morgan Kaufmann, 2009.

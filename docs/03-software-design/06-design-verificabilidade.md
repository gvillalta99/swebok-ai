---
title: "Seção 6: Design para Verificabilidade"
created_at: 2025-01-31
tags: ["design", "software-design", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# Seção 6: Design para Verificabilidade

## Overview

Esta seção apresenta práticas de design que tornam sistemas verificáveis em escala: reduzir superfície de incerteza, produzir evidência e facilitar auditoria e testes.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir verificabilidade como atributo de design e reconhecer seus trade-offs
2. Projetar componentes e fluxos que maximizem observabilidade e testabilidade
3. Integrar verificação (estática, dinâmica e humana) como parte do design de entrega

## 6.1 Introdução

Na era dos LLMs, onde código é gerado em volumes massivos, a capacidade de verificar corretude torna-se o gargalo crítico. O custo de verificação supera amplamente o custo de geração, invertendo a equação econômica tradicional da engenharia de software.

O **Design para Verificabilidade** é a disciplina de projetar sistemas de forma que sua corretude possa ser estabelecida de maneira eficiente, seja através de testes automatizados, análise estática, revisão humana ou verificação formal.

## 6.2 Dimensões da Verificabilidade

### 6.2.1 Espectro de Verificação

```
┌─────────────────────────────────────────────────────────────────┐
│              ESPECTRO DE TÉCNICAS DE VERIFICAÇÃO                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Verificação Formal                                             │
│  ├── Prova matemática de corretude                             │
│  ├── Alto custo inicial, baixo custo recorrente                │
│  └── Aplicável a: Algoritmos críticos, criptografia            │
│                                                                 │
│  Property-Based Testing                                         │
│  ├── Teste de propriedades invariantes                         │
│  ├── Geração automática de casos de teste                      │
│  └── Aplicável a: Funções puras, transformações de dados       │
│                                                                 │
│  Testes Unitários Tradicionais                                  │
│  ├── Casos de teste específicos                                │
│  ├── Custo proporcional à cobertura desejada                   │
│  └── Aplicável a: Lógica de negócio, regras específicas        │
│                                                                 │
│  Análise Estática                                               │
│  ├── Verificação sem execução                                  │
│  ├── Baixo custo, cobertura limitada                           │
│  └── Aplicável a: Sintaxe, padrões, segurança básica           │
│                                                                 │
│  Revisão Humana                                                 │
│  ├── Inspeção por desenvolvedores                              │
│  ├── Custo alto, necessário para complexidade                  │
│  └── Aplicável a: Lógica complexa, decisões arquiteturais      │
│                                                                 │
│  Testes de Integração / E2E                                     │
│  ├── Verificação de componentes combinados                     │
│  ├── Custo alto, cobertura de fluxos                           │
│  └── Aplicável a: Fluxos de negócio, interações externas       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Custo de Verificação vs. Custo de Geração

```python
from dataclasses import dataclass
from typing import Dict

@dataclass
class CostAnalysis:
    """
    Análise de custos de geração vs. verificação.
    """
    component_name: str
    generation_time_minutes: float
    verification_methods: Dict[str, float]  # método -> tempo em minutos
    
    def total_verification_cost(self) -> float:
        """Calcula custo total de verificação."""
        return sum(self.verification_methods.values())
    
    def verification_ratio(self) -> float:
        """
        Razão entre custo de verificação e custo de geração.
        Valores > 1 indicam que verificação é mais cara.
        """
        if self.generation_time_minutes == 0:
            return float('inf')
        return self.total_verification_cost() / self.generation_time_minutes
    
    def bottleneck_method(self) -> str:
        """Identifica método de verificação mais custoso."""
        return max(self.verification_methods, 
                  key=self.verification_methods.get)

# Exemplo típico
example_component = CostAnalysis(
    component_name="API Handler",
    generation_time_minutes=2.0,  # Gerado por IA em 2 min
    verification_methods={
        'static_analysis': 1.0,
        'unit_tests': 15.0,
        'integration_tests': 30.0,
        'code_review': 20.0,
        'security_audit': 10.0
    }
)

# Resultado: Razão de 38:1
# Verificação é 38x mais cara que geração!
```

## 6.3 Princípios de Design para Verificabilidade

### 6.3.1 Princípio da Testabilidade Local

> *"Componentes devem ser testáveis isoladamente, sem dependências externas."*

```python
from typing import Protocol
from dataclasses import dataclass

# ANTI-PADRÃO: Difícil de testar
class OrderProcessorBad:
    def __init__(self):
        self.db = DatabaseConnection()  # Conexão real!
        self.api = PaymentAPI()  # API externa!
    
    def process(self, order):
        self.db.save(order)  # Side effect
        result = self.api.charge(order.total)  # Chamada externa
        return result

# PADRÃO: Facilmente testável
class Database(Protocol):
    def save(self, order: Order) -> None: ...

class PaymentGateway(Protocol):
    def charge(self, amount: Decimal) -> PaymentResult: ...

@dataclass
class OrderProcessor:
    db: Database
    payment: PaymentGateway
    
    def process(self, order: Order) -> ProcessingResult:
        # Lógica pura, fácil de testar
        if not self._validate_order(order):
            return ProcessingResult.invalid()
        
        self.db.save(order)
        payment_result = self.payment.charge(order.total)
        
        return ProcessingResult.success(payment_result)
    
    def _validate_order(self, order: Order) -> bool:
        # Lógica pura, testável sem mocks
        return order.total > 0 and len(order.items) > 0

# Teste unitário simples
def test_order_processor():
    # Mocks simples
    mock_db = Mock(spec=Database)
    mock_payment = Mock(spec=PaymentGateway)
    mock_payment.charge.return_value = PaymentResult.success()
    
    processor = OrderProcessor(mock_db, mock_payment)
    
    # Teste
    order = Order(total=Decimal('100'), items=[Item("Test")])
    result = processor.process(order)
    
    assert result.is_success
    mock_db.save.assert_called_once_with(order)
```

### 6.3.2 Princípio da Observabilidade

> *"Sistemas devem expor estado interno suficiente para verificação."*

```python
from typing import List, Dict
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class ObservableOperation:
    """
    Operação que registra métricas para verificação.
    """
    name: str
    start_time: datetime = field(default_factory=datetime.now)
    steps: List[Dict] = field(default_factory=list)
    decisions: List[Dict] = field(default_factory=list)
    
    def log_step(self, step_name: str, details: Dict):
        """Registra passo da operação."""
        self.steps.append({
            'timestamp': datetime.now(),
            'name': step_name,
            'details': details
        })
    
    def log_decision(self, decision: str, rationale: str, confidence: float):
        """Registra decisão tomada."""
        self.decisions.append({
            'timestamp': datetime.now(),
            'decision': decision,
            'rationale': rationale,
            'confidence': confidence
        })
    
    def to_verification_log(self) -> Dict:
        """Converte para formato de verificação."""
        return {
            'operation': self.name,
            'duration_ms': (datetime.now() - self.start_time).total_seconds() * 1000,
            'steps_count': len(self.steps),
            'decisions_count': len(self.decisions),
            'decisions': self.decisions,
            'trace': self.steps
        }

class VerifiableClassifier:
    """
    Classificador que expõe raciocínio para verificação.
    """
    
    async def classify(self, input_data: str) -> ClassificationResult:
        op = ObservableOperation("classification")
        
        # Passo 1: Pré-processamento
        preprocessed = self._preprocess(input_data)
        op.log_step("preprocess", {
            'input_length': len(input_data),
            'output_length': len(preprocessed)
        })
        
        # Passo 2: Extração de features
        features = self._extract_features(preprocessed)
        op.log_step("feature_extraction", {
            'features': list(features.keys()),
            'feature_vector_size': len(features)
        })
        
        # Passo 3: Classificação
        raw_scores = self._classify_raw(features)
        op.log_decision(
            decision=raw_scores['top_class'],
            rationale=f"Scores: {raw_scores}",
            confidence=raw_scores['confidence']
        )
        
        # Passo 4: Pós-processamento
        result = self._post_process(raw_scores)
        op.log_step("post_process", {
            'final_class': result.label,
            'confidence_adjusted': result.confidence
        })
        
        # Incluir log de verificação no resultado
        result.verification_log = op.to_verification_log()
        
        return result
```

### 6.3.3 Princípio da Invariância Explícita

> *"Invariantes devem ser declarados e verificáveis."*

```python
from typing import Callable, List
import inspect

class Invariant:
    """
    Representa uma invariante verificável.
    """
    def __init__(self, 
                 name: str,
                 condition: Callable,
                 check_points: List[str] = None):
        self.name = name
        self.condition = condition
        self.check_points = check_points or ['entry', 'exit']
    
    def check(self, *args, **kwargs) -> bool:
        """Verifica se invariante é satisfeita."""
        try:
            return self.condition(*args, **kwargs)
        except Exception:
            return False

class InvariantEnforcer:
    """
    Aplica invariantes a classes.
    """
    
    def __init__(self):
        self.invariants: List[Invariant] = []
    
    def add_invariant(self, invariant: Invariant):
        self.invariants.append(invariant)
    
    def enforce_on_class(self, cls):
        """Decora classe com verificação de invariantes."""
        original_methods = {}
        
        for name, method in inspect.getmembers(cls, inspect.isfunction):
            if not name.startswith('_'):
                original_methods[name] = method
                setattr(cls, name, self._wrap_method(method))
        
        return cls
    
    def _wrap_method(self, method):
        """Envolve método com verificação de invariantes."""
        def wrapper(self, *args, **kwargs):
            # Verificar invariantes na entrada
            if 'entry' in self.check_points:
                self._verify_invariants(self, "entry", method.__name__)
            
            # Executar método
            result = method(self, *args, **kwargs)
            
            # Verificar invariantes na saída
            if 'exit' in self.check_points:
                self._verify_invariants(self, "exit", method.__name__)
            
            return result
        
        return wrapper
    
    def _verify_invariants(self, obj, point: str, method_name: str):
        """Verifica todas as invariantes."""
        for inv in self.invariants:
            if point in inv.check_points:
                if not inv.check(obj):
                    raise InvariantViolationError(
                        f"Invariante '{inv.name}' violada em '{method_name}' ({point})"
                    )

# Uso
@InvariantEnforcer()
class BankAccount:
    """Conta bancária com invariantes verificadas."""
    
    def __init__(self, initial_balance: Decimal):
        self._balance = initial_balance
        self._transactions = []
    
    def deposit(self, amount: Decimal):
        self._balance += amount
        self._transactions.append(Transaction('deposit', amount))
    
    def withdraw(self, amount: Decimal):
        if amount > self._balance:
            raise InsufficientFundsError()
        self._balance -= amount
        self._transactions.append(Transaction('withdrawal', amount))
    
    # Invariantes
    invariants = [
        Invariant(
            name="balance_non_negative",
            condition=lambda self: self._balance >= 0,
            check_points=['exit']
        ),
        Invariant(
            name="transactions_consistent",
            condition=lambda self: self._verify_transactions(),
            check_points=['exit']
        )
    ]
```

## 6.4 Padrões de Verificação

### 6.4.1 Padrão: Testes Baseados em Propriedades

```python
from hypothesis import given, strategies as st, settings
import pytest

class PropertyBasedTests:
    """
    Testes baseados em propriedades para verificação
    de código gerado.
    """
    
    @given(st.lists(st.integers()), st.lists(st.integers()))
    @settings(max_examples=1000)
    def test_sort_idempotent(self, list_a, list_b):
        """
        Propriedade: Ordenar duas vezes é igual a ordenar uma vez.
        """
        sorted_once = sorted(list_a)
        sorted_twice = sorted(sorted_once)
        assert sorted_once == sorted_twice
    
    @given(st.lists(st.integers()))
    def test_sort_preserves_elements(self, input_list):
        """
        Propriedade: Ordenação preserva elementos (sem perda).
        """
        sorted_list = sorted(input_list)
        assert sorted(input_list) == sorted(sorted_list)
        assert len(input_list) == len(sorted_list)
    
    @given(st.lists(st.integers()))
    def test_sort_produces_ordered_result(self, input_list):
        """
        Propriedade: Resultado está ordenado.
        """
        sorted_list = sorted(input_list)
        for i in range(len(sorted_list) - 1):
            assert sorted_list[i] <= sorted_list[i + 1]
    
    @given(st.text(), st.text())
    def test_concat_length(self, a, b):
        """
        Propriedade: Comprimento da concatenação é soma dos comprimentos.
        """
        assert len(a + b) == len(a) + len(b)

# Teste para código gerado
def test_generated_code_properties(generated_function):
    """
    Verifica propriedades de função gerada.
    """
    # Propriedade 1: Terminação em tempo finito
    @given(st.data())
    def test_termination(data):
        input_val = data.draw(st.integers())
        import signal
        
        def timeout_handler(signum, frame):
            raise TimeoutError("Function did not terminate")
        
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(5)  # 5 segundos timeout
        
        try:
            result = generated_function(input_val)
            signal.alarm(0)
        except TimeoutError:
            pytest.fail("Function did not terminate within 5 seconds")
    
    # Propriedade 2: Tipo de retorno consistente
    @given(st.integers())
    def test_return_type(input_val):
        result = generated_function(input_val)
        assert isinstance(result, (int, float, str))
```

### 6.4.2 Padrão: Oráculos Automatizados

```python
from typing import Callable, TypeVar

T = TypeVar('T')
R = TypeVar('R')

class Oracle:
    """
    Oráculo para verificação de resultados.
    """
    def verify(self, input_data: T, output: R) -> bool:
        raise NotImplementedError

class ReferenceImplementationOracle(Oracle):
    """
    Oráculo baseado em implementação de referência.
    """
    def __init__(self, reference: Callable[[T], R]):
        self.reference = reference
    
    def verify(self, input_data: T, output: R) -> bool:
        expected = self.reference(input_data)
        return output == expected

class PropertyOracle(Oracle):
    """
    Oráculo baseado em propriedades matemáticas.
    """
    def __init__(self, property_check: Callable[[T, R], bool]):
        self.property = property_check
    
    def verify(self, input_data: T, output: R) -> bool:
        return self.property(input_data, output)

# Exemplo: Oráculo para sorting
class SortingOracle(Oracle):
    """
    Verifica se resultado é ordenação válida da entrada.
    """
    def verify(self, input_list: list, output_list: list) -> bool:
        # Propriedade 1: Mesmos elementos
        if sorted(input_list) != sorted(output_list):
            return False
        
        # Propriedade 2: Está ordenado
        for i in range(len(output_list) - 1):
            if output_list[i] > output_list[i + 1]:
                return False
        
        # Propriedade 3: Mesmo comprimento
        if len(input_list) != len(output_list):
            return False
        
        return True

# Uso
oracle = SortingOracle()

# Testar implementação gerada
def test_generated_sort(generated_sort):
    @given(st.lists(st.integers()))
    def property_test(input_list):
        result = generated_sort(input_list)
        assert oracle.verify(input_list, result)
    
    property_test()
```

## 6.5 Ferramentas de Verificação

### 6.5.1 Pipeline de Verificação Automatizada

```python
from typing import List, Dict
from dataclasses import dataclass
from enum import Enum

class VerificationStage(Enum):
    SYNTAX = "syntax"
    STATIC_ANALYSIS = "static_analysis"
    TYPE_CHECKING = "type_checking"
    UNIT_TESTS = "unit_tests"
    PROPERTY_TESTS = "property_tests"
    INTEGRATION_TESTS = "integration_tests"
    SECURITY_SCAN = "security_scan"
    CODE_REVIEW = "code_review"

@dataclass
class VerificationResult:
    stage: VerificationStage
    passed: bool
    duration_seconds: float
    issues: List[Dict]
    coverage: float  # 0-1

class VerificationPipeline:
    """
    Pipeline completo de verificação para código gerado.
    """
    
    def __init__(self):
        self.stages: List[VerificationStage] = [
            VerificationStage.SYNTAX,
            VerificationStage.STATIC_ANALYSIS,
            VerificationStage.TYPE_CHECKING,
            VerificationStage.UNIT_TESTS,
            VerificationStage.PROPERTY_TESTS,
            VerificationStage.SECURITY_SCAN
        ]
    
    def verify(self, code: str, test_cases: List = None) -> Dict:
        """
        Executa pipeline completo de verificação.
        """
        results = []
        
        for stage in self.stages:
            result = self._run_stage(stage, code, test_cases)
            results.append(result)
            
            # Early termination em falha crítica
            if not result.passed and stage in [
                VerificationStage.SYNTAX,
                VerificationStage.SECURITY_SCAN
            ]:
                break
        
        return {
            'overall_pass': all(r.passed for r in results),
            'stages': results,
            'total_duration': sum(r.duration_seconds for r in results),
            'coverage': sum(r.coverage for r in results) / len(results)
        }
    
    def _run_stage(self, 
                  stage: VerificationStage,
                  code: str,
                  test_cases: List) -> VerificationResult:
        """Executa estágio específico."""
        import time
        start = time.time()
        
        if stage == VerificationStage.SYNTAX:
            issues = self._check_syntax(code)
        elif stage == VerificationStage.STATIC_ANALYSIS:
            issues = self._run_static_analysis(code)
        elif stage == VerificationStage.TYPE_CHECKING:
            issues = self._run_type_checker(code)
        elif stage == VerificationStage.UNIT_TESTS:
            issues = self._run_unit_tests(code, test_cases)
        elif stage == VerificationStage.PROPERTY_TESTS:
            issues = self._run_property_tests(code)
        elif stage == VerificationStage.SECURITY_SCAN:
            issues = self._run_security_scan(code)
        else:
            issues = []
        
        duration = time.time() - start
        
        return VerificationResult(
            stage=stage,
            passed=len(issues) == 0,
            duration_seconds=duration,
            issues=issues,
            coverage=self._estimate_coverage(stage, code)
        )
```

## 6.6 Exercícios

1. Projete um conjunto de invariantes para um sistema de processamento de pagamentos e implemente verificação automática.

2. Crie oráculos para verificar corretude de uma função de busca binária gerada por IA.

3. Implemente um `VerificationPipeline` que integre análise estática, testes baseados em propriedades e revisão de segurança.

## Practical Considerations

- Dê preferência a designs que reduzam ambiguidade: contratos e invariantes simplificam testes e revisão.
- Instrumente pontos de decisão: sem evidência, não há verificação confiável.

## Summary

- Verificabilidade é atributo central em sistemas híbridos; deve ser projetada.
- Evidência (testes, logs, rastros) reduz custo de validação e acelera manutenção.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. FAKHOURY, S. et al. LLM-based Test-driven Interactive Code Generation: User Study and Empirical Evaluation. IEEE Transactions on Software Engineering, 2024. Disponível em: https://www.seas.upenn.edu/~asnaik/assets/papers/tse24_ticoder.pdf

3. ALLAMANIS, M.; PANTHAPLACKEL, S.; YIN, P. Unsupervised Evaluation of Code LLMs with Round-Trip Correctness. arXiv:2402.08699, 2024.

4. AGGARWAL, P. et al. CodeSift: An LLM-Based Reference-Less Framework for Automatic Code Validation. arXiv:2408.15630, 2024.

5. MIRANDA, B. et al. VeriBench: End-to-End Formal Verification Benchmark for AI Code Generation in Lean 4. OpenReview, 2025.

6. TONG, W.; ZHANG, T. CodeJudge: Evaluating Code Generation with Large Language Models. ACL Anthology, 2024. Disponível em: https://aclanthology.org/2024.emnlp-main.1118/

7. STACK OVERFLOW. One of the best ways to get value for AI coding tools: generating tests. Stack Overflow Blog, 2024. Disponível em: https://stackoverflow.blog/2024/09/10/gen-ai-llm-create-test-developers-coding-software-code-quality/

8. CONFIDENT AI. LLM Testing in 2024: Top Methods and Strategies. Confident AI Blog, 2024. Disponível em: https://www.confident-ai.com/blog/llm-testing-in-2024-top-methods-and-strategies

9. SHIPYARD. How to Test AI-Generated Code: Best Practices for LLM and AI Assistant Code. Shipyard Blog, 2024. Disponível em: https://shipyard.build/blog/testing-genai-code/

---

*SWEBOK-AI v5.0 - Software Design*

# 2. Técnicas de Teste para Código Gerado por LLMs

## Overview

A verificação de código gerado por Large Language Models (LLMs) apresenta desafios fundamentais que não podem ser abordados pelas técnicas tradicionais de teste de software. Enquanto métodos convencionais presumem a existência de um oráculo de teste — uma fonte confiável que determina se uma saída está correta — o código produzido por sistemas de IA generativa frequentemente opera em domínios onde especificações completas são impossíveis ou onde o comportamento correto é intrinsicamente difuso. Esta seção apresenta um conjunto de técnicas avançadas projetadas especificamente para verificar código de origem probabilística, explorando abordagens que substituem a noção de correção absoluta por garantias estatísticas e relações comportamentais invariantes.

O paradigma de teste para código gerado por LLMs exige uma mudança epistemológica: em vez de perguntar "esta saída está correta?", perguntamos "esta saída satisfaz propriedades que sabemos serem verdadeiras?" ou "esta saída é consistente com outras execuções semanticamente equivalentes?". Esta transição reflete a natureza do gargalo contemporâneo em engenharia de software: não é mais a capacidade de gerar código funcional que limita a produtividade, mas sim a capacidade de validar código funcional de origem incerta. As técnicas apresentadas nesta seção — Metamorphic Testing, Property-Based Testing, Differential Testing, Symbolic Execution Híbrida e Fuzzing Direcionado — constituem o arsenal metodológico essencial para engenheiros de software que operam em ambientes onde a geração automática é infraestrutura.

A relevância destas técnicas estende-se além do contexto imediato de verificação. Elas fundamentam uma nova disciplina de engenharia de garantia, onde a confiança é construída através de múltiplas camadas de verificação complementares, cada uma explorando uma dimensão diferente do espaço de comportamentos possíveis. Como demonstrado por Segura et al. (2024), estas abordagens são particularmente eficazes em contextos onde oráculos perfeitos são inacessíveis, tornando-se indispensáveis para sistemas de software modernos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar Metamorphic Testing** para verificar código quando oráculos perfeitos estão indisponíveis, definindo relações metamórficas entre entradas e saídas que devem ser preservadas independentemente da implementação específica.

2. **Implementar Property-Based Testing em escala** utilizando frameworks modernos para testar propriedades invariantes do sistema em vez de casos de teste individuais, identificando falhas de edge cases que escapariam a testes baseados em exemplos.

3. **Projetar arquiteturas de Differential Testing** que comparem saídas de múltiplos LLMs para identificar divergências significativas, implementando mecanismos de votação e consenso para aumentar a confiança nas gerações.

4. **Integrar Symbolic Execution Híbrida** em pipelines de verificação, combinando análise formal com heurísticas de IA para explorar espaços de estado de forma eficiente, reconhecendo suas limitações teóricas e práticas.

## 2.1 Metamorphic Testing para Oráculos Imperfeitos

### 2.1.1 O Problema do Oráculo de Teste

O problema do oráculo de teste — a dificuldade de determinar se uma saída produzida está correta — torna-se crítico quando o código sob teste foi gerado automaticamente. Em domínios como processamento de linguagem natural, visão computacional, ou sistemas de recomendação, a noção de "saída correta" pode ser intrinsicamente subjetiva ou dependente de contexto não formalizável. Mesmo em domínios tradicionalmente determinísticos como cálculos matemáticos, a especificação completa do comportamento esperado frequentemente excede o esforço de implementação.

O **Metamorphic Testing** (MT) oferece uma solução elegante: em vez de verificar a correção absoluta de uma saída, verificamos se relações conhecidas entre entradas e saídas são preservadas. Se uma transformação conhecida `T` aplicada a uma entrada `x` deve produzir uma saída relacionada por `R` à saída original, então podemos testar o sistema sem conhecer o valor específico esperado.

### 2.1.2 Definição Formal de Relações Metamórficas

Uma **relação metamórfica** (MR) é definida como uma propriedade que deve ser satisfeita por todas as execuções de um programa que se relacionam através de transformações específicas. Formalmente, para uma função `f`, uma transformação de entrada `T` e uma relação de saída `R`:

```
Seja x uma entrada válida
Seja y = f(x)
Para uma transformação T, seja x' = T(x)
Seja y' = f(x')
Então: R(y, y') deve ser verdadeiro
```

A violação de uma relação metamórfica indica um defeito no sistema, independentemente do conhecimento sobre o valor absoluto esperado de `y` ou `y'`.

### 2.1.3 Exemplos de Relações Metamórficas

**Exemplo 1: Sistema de Recomendação**

Em um sistema de recomendação de produtos, não sabemos qual produto específico deve ser recomendado para um usuário, mas sabemos que:

- MR1: Se adicionarmos um produto ao histórico de compras de um usuário, recomendações similares a esse produto devem aumentar em ranking.
- MR2: Se removermos explicitamente um interesse do perfil, recomendações daquela categoria devem diminuir.
- MR3: Usuários com perfis idênticos devem receber recomendações idênticas (determinismo temporal).

**Exemplo 2: Função de Processamento de Texto**

Para uma função de sumarização automática:

- MR1: Se duplicarmos o texto de entrada, o resumo não deve diminuir em cobertura de tópicos.
- MR2: Se reorganizarmos parágrafos sem alterar conteúdo, o resumo deve preservar os mesmos pontos principais.
- MR3: Se traduzirmos o texto para outro idioma e sumarizarmos, o número de sentenças deve ser preservado.

### 2.1.4 Implementação Prática em Python

O seguinte exemplo demonstra a aplicação de Metamorphic Testing para uma função de ordenação gerada por LLM:

```python
"""
Exemplo de Metamorphic Testing para função de ordenação.
A função sob teste foi gerada por um LLM e não temos garantias
sobre sua correção absoluta.
"""

import random
from typing import List, Callable, TypeVar

T = TypeVar('T')

def llm_sort(data: List[T]) -> List[T]:
    """
    Função de ordenação gerada por LLM.
    Implementação real seria a saída do modelo.
    """
    # Placeholder: em produção, seria o código gerado
    return sorted(data)

class MetamorphicTests:
    """Conjunto de relações metamórficas para testar ordenação."""
    
    def test_mr_permutation_invariance(self, data: List[int]):
        """
        MR1: Permutações da mesma lista devem produzir a mesma saída ordenada.
        T(x) = permutação aleatória de x
        R(y, y') = y == y'
        """
        sorted_original = llm_sort(data.copy())
        
        for _ in range(10):  # Múltiplas permutações
            permuted = data.copy()
            random.shuffle(permuted)
            sorted_permuted = llm_sort(permuted)
            
            assert sorted_original == sorted_permuted, \
                f"Falha MR1: Permutação produziu resultado diferente\n" \
                f"Original: {sorted_original}\nPermutado: {sorted_permuted}"
    
    def test_mr_idempotence(self, data: List[int]):
        """
        MR2: Aplicar ordenação duas vezes deve ser equivalente a aplicar uma vez.
        T(x) = sort(x)
        R(y, y') = y == y'
        """
        once = llm_sort(data.copy())
        twice = llm_sort(once.copy())
        
        assert once == twice, \
            f"Falha MR2: Ordenação não é idempotente\n" \
            f"Primeira: {once}\nSegunda: {twice}"
    
    def test_mr_subset_preservation(self, data: List[int]):
        """
        MR3: Elementos da entrada devem estar preservados na saída (conservação).
        R(y) = multiset(y) == multiset(x)
        """
        result = llm_sort(data.copy())
        
        assert sorted(data) == sorted(result), \
            f"Falha MR3: Elementos não preservados\n" \
            f"Entrada: {sorted(data)}\nSaída: {sorted(result)}"
    
    def test_mr_monotonicity(self, data: List[int]):
        """
        MR4: Adicionar um elemento maior que todos deve resultar em lista maior.
        T(x) = x + [max(x) + 1]
        R(y, y') = y'[-1] == max(x) + 1
        """
        if not data:
            return
            
        sorted_data = llm_sort(data.copy())
        max_val = max(sorted_data)
        
        extended = data + [max_val + 1]
        sorted_extended = llm_sort(extended.copy())
        
        assert sorted_extended[-1] == max_val + 1, \
            f"Falha MR4: Monotonicidade violada\n" \
            f"Último elemento: {sorted_extended[-1]}, esperado: {max_val + 1}"
    
    def test_mr_reverse_ordering(self, data: List[int]):
        """
        MR5: Reverter a lista ordenada deve produzir ordem reversa.
        T(x) = x (entrada original)
        R(y) = reverse(y) == sort(reverse(x))
        """
        sorted_forward = llm_sort(data.copy())
        reversed_input = list(reversed(data))
        sorted_reversed = llm_sort(reversed_input)
        
        assert list(reversed(sorted_forward)) == sorted_reversed, \
            f"Falha MR5: Ordenação reversa inconsistente"

# Execução dos testes
def run_metamorphic_tests():
    """Executa todos os testes metamórficos com dados de exemplo."""
    test_cases = [
        [3, 1, 4, 1, 5, 9, 2, 6],
        [1],
        [],
        [5, 5, 5, 5],
        list(range(100, 0, -1)),
        [random.randint(-1000, 1000) for _ in range(100)]
    ]
    
    mt = MetamorphicTests()
    
    for i, test_data in enumerate(test_cases):
        print(f"\n=== Test Case {i+1}: {test_data[:5]}{'...' if len(test_data) > 5 else ''} ===")
        
        try:
            mt.test_mr_permutation_invariance(test_data)
            print("✓ MR1 (Permutation Invariance): PASSED")
        except AssertionError as e:
            print(f"✗ MR1 (Permutation Invariance): FAILED\n  {e}")
        
        try:
            mt.test_mr_idempotence(test_data)
            print("✓ MR2 (Idempotence): PASSED")
        except AssertionError as e:
            print(f"✗ MR2 (Idempotence): FAILED\n  {e}")
        
        try:
            mt.test_mr_subset_preservation(test_data)
            print("✓ MR3 (Conservation): PASSED")
        except AssertionError as e:
            print(f"✗ MR3 (Conservation): FAILED\n  {e}")
        
        try:
            mt.test_mr_monotonicity(test_data)
            print("✓ MR4 (Monotonicity): PASSED")
        except AssertionError as e:
            print(f"✗ MR4 (Monotonicity): FAILED\n  {e}")
        
        try:
            mt.test_mr_reverse_ordering(test_data)
            print("✓ MR5 (Reverse Ordering): PASSED")
        except AssertionError as e:
            print(f"✗ MR5 (Reverse Ordering): FAILED\n  {e}")

if __name__ == "__main__":
    run_metamorphic_tests()
```

### 2.1.5 Seleção de Relações Metamórficas Efetivas

A eficácia do Metamorphic Testing depende da qualidade das relações selecionadas. Relações fracas ou triviais podem passar em sistemas defeituosos, enquanto relações muito fortes podem ser impraticáveis de verificar. Segura et al. (2024) propõem critérios para seleção:

| Critério | Descrição | Exemplo |
|----------|-----------|---------|
| **Validade de Domínio** | A relação deve ser intrinsicamente verdadeira para o domínio | Idempotência de ordenação |
| **Sensibilidade a Defeitos** | A relação deve ser violada por classes comuns de bugs | Permutação invariance detecta bugs de estabilidade |
| **Viabilidade de Teste** | Deve ser possível gerar casos de teste eficientemente | Transformações computacionalmente baratas |
| **Cobertura de Comportamento** | O conjunto de MRs deve cobrir múltiplas dimensões do sistema | Conservação, ordem, estabilidade |

### 2.1.6 Limitações e Considerações

O Metamorphic Testing não pode detectar todos os tipos de defeitos. Falhas que preservam todas as relações metamórficas testadas escaparão à detecção. Além disso:

- **Falsos Negativos**: Um sistema pode passar em todas as MRs e ainda estar incorreto para casos não cobertos pelas relações.
- **Custo Computacional**: Testar múltiplas transformações aumenta significativamente o tempo de execução.
- **Engenharia de MRs**: A identificação de boas relações metamórficas requer conhecimento profundo do domínio.

## 2.2 Property-Based Testing em Escala

### 2.2.1 Fundamentos do Property-Based Testing

**Property-Based Testing** (PBT) é uma metodologia de teste onde o engenheiro especifica propriedades que o sistema deve satisfazer, em vez de exemplos específicos de entrada e saída. O framework de teste então gera automaticamente centenas ou milhares de casos de teste aleatórios que buscam violar essas propriedades. Quando uma violação é encontrada, o framework tenta minimizar o caso de teste para produzir o **exemplo mínimo reprodutível** (minimal reproducible example).

Esta abordagem é particularmente valiosa para código gerado por LLMs porque:

1. **Exploração do Espaço de Entrada**: LLMs tendem a gerar código que funciona para casos "típicos" mas falha em edge cases. O PBT sistematicamente explora o espaço de entrada.

2. **Falsificação em vez de Verificação**: Seguindo o princípio de Popper, o PBT busca ativamente contradizer propriedades assumidas, uma postura mais robusta para código de origem incerta.

3. **Documentação Executável**: As propriedades servem como especificação formal executável do comportamento esperado.

### 2.2.2 Propriedades Fundamentais para Teste

Diferentes categorias de propriedades podem ser verificadas:

**Propriedades Algébricas:**
- **Comutatividade**: `f(a, b) == f(b, a)`
- **Associatividade**: `f(f(a, b), c) == f(a, f(b, c))`
- **Idempotência**: `f(f(x)) == f(x)`
- **Identidade**: `f(x, identity) == x`

**Propriedades de Conservação:**
- **Conservação de Tamanho**: `len(f(x)) == len(x)`
- **Conservação de Elementos**: `set(f(x)) == set(x)`
- **Conservação de Energia**: Sistemas físicos/simulações

**Propriedades de Ordem:**
- **Monotonicidade**: `x <= y ⟹ f(x) <= f(y)`
- **Inversibilidade**: `f_inverse(f(x)) == x`

### 2.2.3 Implementação com Hypothesis (Python)

O framework Hypothesis é a implementação de referência para Property-Based Testing em Python. O exemplo a seguir demonstra sua aplicação para verificar uma função de processamento de dados gerada por LLM:

```python
"""
Property-Based Testing para código gerado por LLM.
Exemplo: Sistema de processamento de transações financeiras.
"""

from hypothesis import given, strategies as st, settings, example
from hypothesis.stateful import RuleBasedStateMachine, rule, precondition
from dataclasses import dataclass
from typing import List, Optional
from decimal import Decimal, ROUND_HALF_UP
import pytest

# Sistema sob teste (gerado por LLM)
@dataclass
class Transaction:
    id: str
    amount: Decimal
    currency: str
    
class TransactionProcessor:
    """Processador de transações - implementação gerada por LLM."""
    
    SUPPORTED_CURRENCIES = {'USD', 'EUR', 'BRL', 'GBP'}
    
    def __init__(self):
        self.transactions: List[Transaction] = []
        self.total_by_currency: dict[str, Decimal] = {}
    
    def add_transaction(self, tx: Transaction) -> bool:
        """Adiciona uma transação ao processador."""
        if tx.currency not in self.SUPPORTED_CURRENCIES:
            return False
        if tx.amount <= 0:
            return False
        
        self.transactions.append(tx)
        current = self.total_by_currency.get(tx.currency, Decimal('0'))
        self.total_by_currency[tx.currency] = current + tx.amount
        return True
    
    def get_balance(self, currency: str) -> Decimal:
        """Retorna o saldo total em uma moeda específica."""
        return self.total_by_currency.get(currency, Decimal('0'))
    
    def consolidate(self) -> Decimal:
        """Retorna o valor total consolidado (assumindo taxa 1:1 para simplificação)."""
        return sum(self.total_by_currency.values(), Decimal('0'))
    
    def get_transaction_count(self) -> int:
        return len(self.transactions)

# ============================================================================
# PROPERTY-BASED TESTS
# ============================================================================

class TestTransactionProcessor:
    """Testes baseados em propriedades para o processador de transações."""
    
    # Strategy para gerar transações válidas
    valid_transactions = st.builds(
        Transaction,
        id=st.text(min_size=1, max_size=50, alphabet=st.characters(whitelist_categories=('L', 'N'))),
        amount=st.decimals(min_value=Decimal('0.01'), max_value=Decimal('999999.99'), 
                          places=2, allow_nan=False, allow_infinity=False),
        currency=st.sampled_from(['USD', 'EUR', 'BRL', 'GBP'])
    )
    
    invalid_amount_transactions = st.builds(
        Transaction,
        id=st.text(min_size=1, max_size=50),
        amount=st.decimals(max_value=Decimal('0'), allow_nan=False),
        currency=st.just('USD')
    )
    
    invalid_currency_transactions = st.builds(
        Transaction,
        id=st.text(min_size=1, max_size=50),
        amount=st.decimals(min_value=Decimal('0.01'), max_value=Decimal('100'), places=2),
        currency=st.text(min_size=3, max_size=3).filter(lambda x: x not in {'USD', 'EUR', 'BRL', 'GBP'})
    )
    
    @given(valid_transactions)
    @settings(max_examples=1000, deadline=None)
    def test_property_add_increases_count(self, tx):
        """
        Propriedade: Adicionar transação válida aumenta contagem em 1.
        """
        processor = TransactionProcessor()
        initial_count = processor.get_transaction_count()
        
        success = processor.add_transaction(tx)
        
        assert success is True
        assert processor.get_transaction_count() == initial_count + 1
    
    @given(valid_transactions)
    @settings(max_examples=1000, deadline=None)
    def test_property_balance_non_negative(self, tx):
        """
        Propriedade: Saldo nunca é negativo após adicionar transação válida.
        """
        processor = TransactionProcessor()
        processor.add_transaction(tx)
        
        balance = processor.get_balance(tx.currency)
        assert balance >= 0
    
    @given(valid_transactions, valid_transactions)
    @settings(max_examples=500, deadline=None)
    def test_property_balance_additivity(self, tx1, tx2):
        """
        Propriedade: Saldo de moeda é aditivo.
        Se tx1 e tx2 têm mesma moeda: balance == tx1.amount + tx2.amount
        """
        assume(tx1.currency == tx2.currency)
        
        processor = TransactionProcessor()
        processor.add_transaction(tx1)
        processor.add_transaction(tx2)
        
        expected = tx1.amount + tx2.amount
        actual = processor.get_balance(tx1.currency)
        assert actual == expected
    
    @given(st.lists(valid_transactions, min_size=1, max_size=100))
    @settings(max_examples=200, deadline=None)
    def test_property_consolidate_equals_sum_of_balances(self, transactions):
        """
        Propriedade: Consolidado é igual à soma de todos os saldos por moeda.
        """
        processor = TransactionProcessor()
        for tx in transactions:
            processor.add_transaction(tx)
        
        total_balance = sum(processor.total_by_currency.values(), Decimal('0'))
        consolidated = processor.consolidate()
        
        assert consolidated == total_balance
    
    @given(invalid_amount_transactions)
    @settings(max_examples=500, deadline=None)
    def test_property_rejects_non_positive_amount(self, tx):
        """
        Propriedade: Transações com valor não positivo são rejeitadas.
        """
        processor = TransactionProcessor()
        initial_count = processor.get_transaction_count()
        
        success = processor.add_transaction(tx)
        
        assert success is False
        assert processor.get_transaction_count() == initial_count
    
    @given(invalid_currency_transactions)
    @settings(max_examples=500, deadline=None)
    def test_property_rejects_invalid_currency(self, tx):
        """
        Propriedade: Transações com moeda não suportada são rejeitadas.
        """
        processor = TransactionProcessor()
        initial_count = processor.get_transaction_count()
        
        success = processor.add_transaction(tx)
        
        assert success is False
        assert processor.get_transaction_count() == initial_count
    
    @given(st.lists(valid_transactions, max_size=50))
    @settings(max_examples=100, deadline=None)
    def test_property_count_equals_list_length_for_valid(self, transactions):
        """
        Propriedade: Contagem de transações é igual ao número de transações válidas.
        """
        processor = TransactionProcessor()
        valid_count = 0
        
        for tx in transactions:
            if processor.add_transaction(tx):
                valid_count += 1
        
        assert processor.get_transaction_count() == valid_count

# ============================================================================
# STATEFUL TESTING (Máquina de Estados)
# ============================================================================

class TransactionProcessorStateMachine(RuleBasedStateMachine):
    """
    Testes stateful que verificam sequências de operações.
    Útil para detectar bugs que emergem apenas após múltiplas operações.
    """
    
    def __init__(self):
        super().__init__()
        self.processor = TransactionProcessor()
        self.model_transactions: List[Transaction] = []
        self.model_balances: dict[str, Decimal] = {}
    
    @rule(tx=st.builds(
        Transaction,
        id=st.text(min_size=1, max_size=20, alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
        amount=st.decimals(min_value=Decimal('0.01'), max_value=Decimal('10000'), places=2),
        currency=st.sampled_from(['USD', 'EUR', 'BRL', 'GBP'])
    ))
    def add_valid_transaction(self, tx):
        """Regra: Adicionar transação válida."""
        success = self.processor.add_transaction(tx)
        assert success is True
        
        # Atualizar modelo
        self.model_transactions.append(tx)
        current = self.model_balances.get(tx.currency, Decimal('0'))
        self.model_balances[tx.currency] = current + tx.amount
        
        # Verificar consistência
        assert self.processor.get_balance(tx.currency) == self.model_balances[tx.currency]
    
    @rule(currency=st.sampled_from(['USD', 'EUR', 'BRL', 'GBP']))
    def check_balance_consistency(self, currency):
        """Regra: Verificar consistência de saldo."""
        expected = self.model_balances.get(currency, Decimal('0'))
        actual = self.processor.get_balance(currency)
        assert actual == expected
    
    @rule()
    def check_consolidate_consistency(self):
        """Regra: Verificar consistência do valor consolidado."""
        expected = sum(self.model_balances.values(), Decimal('0'))
        actual = self.processor.consolidate()
        assert actual == expected

TestStatefulProcessor = TransactionProcessorStateMachine.TestCase

# ============================================================================
# EXECUÇÃO DOS TESTES
# ============================================================================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
```

### 2.2.4 Escalando Property-Based Testing

Para aplicações em escala industrial, o Property-Based Testing requer estratégias adicionais:

**Geração Direcionada de Dados:**
```python
from hypothesis import target

@given(data=st.data())
def test_with_targeting(data):
    """Usa targeting para guiar geração em direção a estados interessantes."""
    x = data.draw(st.integers())
    # Direciona a geração para valores que maximizam "interesse"
    target(float(x ** 2))  # Favorece valores grandes
    # ... test logic
```

**Composição de Propriedades:**
```python
# Combinar múltiplas propriedades em um único teste
composite_properties = [
    test_property_add_increases_count,
    test_property_balance_non_negative,
    test_property_balance_additivity,
]

@given(st.data())
def test_all_properties(data):
    """Executa todas as propriedades em sequência para o mesmo input."""
    tx = data.draw(valid_transactions)
    for prop in composite_properties:
        prop(tx)
```

**Integração com CI/CD:**
```yaml
# .github/workflows/property-tests.yml
name: Property-Based Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Property Tests
        run: |
          pytest tests/properties/ \
            --hypothesis-profile=ci \
            --hypothesis-seed=${{ github.run_id }}
```

### 2.2.5 Métricas de Eficácia

A Tabela abaixo apresenta métricas para avaliar a eficácia de uma suíte de Property-Based Tests:

| Métrica | Definição | Meta |
|---------|-----------|------|
| **Taxa de Descoberta de Falhas** | Falhas encontradas / Execuções | >0.1% para sistemas maduros |
| **Tempo para Minimal Example** | Tempo médio de shrinking | <5 segundos |
| **Cobertura de Código** | Linhas cobertas por PBT | >80% da lógica de negócio |
| **Diversidade de Entradas** | Entropia da distribuição de entradas | Alta (evitar clustering) |

## 2.3 Differential Testing entre Múltiplos Modelos

### 2.3.1 Princípio do Differential Testing

**Differential Testing** é uma técnica onde o mesmo input é submetido a múltiplas implementações independentes de um sistema, e as saídas são comparadas. Divergências entre implementações presumivelmente corretas indicam potenciais defeitos em uma ou mais delas. Esta abordagem é especialmente poderosa quando aplicada a código gerado por LLMs: ao utilizar múltiplos modelos (GPT-4, Claude, Gemini, etc.) para gerar implementações do mesmo requisito, podemos identificar inconsistências sem necessidade de um oráculo perfeito.

O pressuposto fundamental é que, embora qualquer LLM individual possa cometer erros, a probabilidade de múltiplos modelos independentes cometerem exatamente o mesmo erro é significativamente menor. Quando `N` modelos concordam em uma saída, a confiança na correção aumenta; quando discordam, pelo menos uma implementação está incorreta.

### 2.3.2 Arquitetura de Differential Testing

A arquitetura típica de um sistema de Differential Testing para código gerado inclui:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIFFERENTIAL TESTING FRAMEWORK                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────┐ │
│  │   GPT-4      │    │    Claude    │    │    Gemini    │    │  Model N  │ │
│  │  Generator   │    │  Generator   │    │  Generator   │    │ Generator │ │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘    └─────┬─────┘ │
│         │                   │                   │                   │       │
│         └───────────────────┴───────────────────┴───────────────────┘       │
│                                    │                                        │
│                                    ▼                                        │
│                         ┌──────────────────┐                                │
│                         │  Output Pool     │                                │
│                         │  [Code1, Code2,  │                                │
│                         │   Code3, ...]    │                                │
│                         └────────┬─────────┘                                │
│                                  │                                          │
│                    ┌─────────────┼─────────────┐                           │
│                    ▼             ▼             ▼                           │
│            ┌──────────┐  ┌──────────┐  ┌──────────┐                       │
│            │ Semantic │  │Behavioral│  │  Voting  │                       │
│            │  Diff    │  │   Diff   │  │  Engine  │                       │
│            └────┬─────┘  └────┬─────┘  └────┬─────┘                       │
│                 └─────────────┴─────────────┘                              │
│                               │                                            │
│                               ▼                                            │
│                    ┌──────────────────┐                                    │
│                    │  Divergence      │                                    │
│                    │  Detection       │                                    │
│                    └──────────────────┘                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3.3 Mecanismos de Comparação

A comparação de saídas de múltiplos modelos pode ocorrer em diferentes níveis:

**1. Comparação Sintática:**
- AST (Abstract Syntax Tree) matching
- Normalização de código (formatação, nomes de variáveis)
- Hash estrutural do código

**2. Comparação Semântica:**
- Equivalência de comportamento em testes
- Análise de fluxo de dados
- Verificação de invariantes

**3. Comparação por Execução:**
- Mesmos inputs → mesmas saídas
- Mesmos side effects
- Mesma performance característica

### 2.3.4 Implementação de Differential Testing

O exemplo a seguir demonstra um framework de Differential Testing para comparar implementações de funções geradas por diferentes LLMs:

```python
"""
Differential Testing Framework para código gerado por múltiplos LLMs.
"""

import ast
import hashlib
import json
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Dict, Callable, Any, Optional, Tuple
from enum import Enum
import concurrent.futures
from collections import defaultdict
import traceback

class DivergenceType(Enum):
    """Tipos de divergência detectáveis entre implementações."""
    SYNTACTIC = "syntactic"           # Estrutura diferente
    SEMANTIC = "semantic"             # Comportamento diferente
    EXCEPTION = "exception"           # Um levanta exceção, outro não
    PERFORMANCE = "performance"       # Diferença significativa de performance
    OUTPUT = "output"                 # Saídas diferentes para mesmo input

@dataclass
class Divergence:
    """Representa uma divergência detectada entre implementações."""
    divergence_type: DivergenceType
    models_involved: List[str]
    description: str
    test_case: Any
    outputs: Dict[str, Any] = field(default_factory=dict)
    severity: str = "medium"  # low, medium, high, critical

@dataclass
class Implementation:
    """Representa uma implementação gerada por um modelo."""
    model_name: str
    source_code: str
    compiled_function: Optional[Callable] = None
    ast_tree: Optional[ast.AST] = None
    
    def __post_init__(self):
        if self.source_code:
            try:
                self.ast_tree = ast.parse(self.source_code)
                # Compilar para execução segura em sandbox
                compiled = compile(self.source_code, '<string>', 'exec')
                namespace = {}
                exec(compiled, namespace)
                # Extrair a função definida
                for name, obj in namespace.items():
                    if callable(obj) and not name.startswith('_'):
                        self.compiled_function = obj
                        break
            except Exception as e:
                self.compiled_function = None
    
    def structural_hash(self) -> str:
        """Calcula hash estrutural do AST (ignora nomes de variáveis)."""
        if not self.ast_tree:
            return ""
        # Normalizar AST: remover nomes, preservar estrutura
        normalized = self._normalize_ast(self.ast_tree)
        return hashlib.sha256(ast.dump(normalized).encode()).hexdigest()[:16]
    
    def _normalize_ast(self, tree: ast.AST) -> ast.AST:
        """Normaliza AST removendo identificadores específicos."""
        class Normalizer(ast.NodeTransformer):
            def __init__(self):
                self.name_counter = 0
                self.name_map = {}
            
            def visit_Name(self, node):
                if node.id not in self.name_map:
                    self.name_map[node.id] = f"var_{self.name_counter}"
                    self.name_counter += 1
                node.id = self.name_map[node.id]
                return node
            
            def visit_arg(self, node):
                if node.arg not in self.name_map:
                    self.name_map[node.arg] = f"arg_{self.name_counter}"
                    self.name_counter += 1
                node.arg = self.name_map[node.arg]
                return node
        
        return Normalizer().visit(ast.parse(ast.dump(tree)))

class LLMInterface(ABC):
    """Interface abstrata para integração com LLMs."""
    
    @property
    @abstractmethod
    def model_name(self) -> str:
        pass
    
    @abstractmethod
    def generate_code(self, prompt: str, temperature: float = 0.7) -> str:
        """Gera código a partir de um prompt."""
        pass

class DifferentialTester:
    """
    Framework principal para Differential Testing entre múltiplos modelos.
    """
    
    def __init__(self, models: List[LLMInterface], timeout: int = 30):
        self.models = models
        self.timeout = timeout
        self.divergences: List[Divergence] = []
    
    def generate_implementations(self, prompt: str, 
                                  num_variants: int = 1) -> List[Implementation]:
        """
        Gera implementações de múltiplos modelos para o mesmo prompt.
        """
        implementations = []
        
        with concurrent.futures.ThreadPoolExecutor() as executor:
            futures = []
            for model in self.models:
                for i in range(num_variants):
                    future = executor.submit(
                        self._safe_generate, model, prompt, i
                    )
                    futures.append((model.model_name, i, future))
            
            for model_name, variant_idx, future in futures:
                try:
                    code = future.result(timeout=self.timeout)
                    impl = Implementation(
                        model_name=f"{model_name}_v{variant_idx}",
                        source_code=code
                    )
                    implementations.append(impl)
                except Exception as e:
                    print(f"Falha ao gerar com {model_name}: {e}")
        
        return implementations
    
    def _safe_generate(self, model: LLMInterface, prompt: str, 
                       variant: int) -> str:
        """Gera código com tratamento de exceções."""
        try:
            # Variação de temperatura para diversidade
            temp = 0.5 + (variant * 0.2)
            return model.generate_code(prompt, temperature=temp)
        except Exception as e:
            return f"# Error: {str(e)}"
    
    def compare_syntactic(self, implementations: List[Implementation]) -> List[Divergence]:
        """
        Compara implementações em nível sintático (estrutura AST).
        """
        divergences = []
        
        # Agrupar por hash estrutural
        groups = defaultdict(list)
        for impl in implementations:
            h = impl.structural_hash()
            groups[h].append(impl.model_name)
        
        # Se há mais de um grupo, há divergência sintática
        if len(groups) > 1:
            for hash_val, models in groups.items():
                impl = next(i for i in implementations if i.structural_hash() == hash_val)
                other_models = [m for m in self._get_all_models(implementations) if m not in models]
                
                divergence = Divergence(
                    divergence_type=DivergenceType.SYNTACTIC,
                    models_involved=models + other_models,
                    description=f"Diferença estrutural detectada. Grupo com {len(models)} implementações.",
                    test_case=None,
                    severity="low" if len(groups) <= 2 else "medium"
                )
                divergences.append(divergence)
        
        return divergences
    
    def compare_behavioral(self, implementations: List[Implementation],
                          test_cases: List[Any]) -> List[Divergence]:
        """
        Compara implementações executando-as com casos de teste.
        """
        divergences = []
        valid_impls = [i for i in implementations if i.compiled_function is not None]
        
        if len(valid_impls) < 2:
            return [Divergence(
                divergence_type=DivergenceType.EXCEPTION,
                models_involved=[i.model_name for i in implementations],
                description="Menos de 2 implementações compilaram com sucesso",
                test_case=None,
                severity="high"
            )]
        
        for test_case in test_cases:
            outputs = {}
            exceptions = {}
            
            for impl in valid_impls:
                try:
                    result = impl.compiled_function(*test_case['args'], **test_case.get('kwargs', {}))
                    outputs[impl.model_name] = result
                except Exception as e:
                    exceptions[impl.model_name] = str(e)
            
            # Verificar divergências
            if exceptions and outputs:
                # Alguns sucedem, outros falham
                divergence = Divergence(
                    divergence_type=DivergenceType.EXCEPTION,
                    models_involved=list(outputs.keys()) + list(exceptions.keys()),
                    description=f"Divergência de exceção no teste: {test_case}",
                    test_case=test_case,
                    outputs={"success": outputs, "exceptions": exceptions},
                    severity="critical"
                )
                divergences.append(divergence)
            
            elif len(set(str(v) for v in outputs.values())) > 1:
                # Saídas diferentes
                divergence = Divergence(
                    divergence_type=DivergenceType.OUTPUT,
                    models_involved=list(outputs.keys()),
                    description=f"Saídas diferentes para entrada: {test_case}",
                    test_case=test_case,
                    outputs=outputs,
                    severity="high"
                )
                divergences.append(divergence)
        
        return divergences
    
    def voting_consensus(self, implementations: List[Implementation],
                        test_cases: List[Any], threshold: float = 0.5) -> Dict[str, Any]:
        """
        Determina consenso através de votação majoritária.
        """
        votes = defaultdict(lambda: defaultdict(int))
        
        for test_case in test_cases:
            outputs = {}
            for impl in implementations:
                if impl.compiled_function:
                    try:
                        result = impl.compiled_function(*test_case['args'])
                        outputs[impl.model_name] = str(result)
                    except:
                        outputs[impl.model_name] = "EXCEPTION"
            
            # Contar votos para cada saída
            for model, output in outputs.items():
                votes[str(test_case)][output] += 1
        
        # Determinar consenso
        consensus_results = {}
        for test_str, output_votes in votes.items():
            total = sum(output_votes.values())
            winner = max(output_votes.items(), key=lambda x: x[1])
            consensus_results[test_str] = {
                "consensus_output": winner[0],
                "confidence": winner[1] / total,
                "all_votes": dict(output_votes)
            }
        
        return consensus_results
    
    def _get_all_models(self, implementations: List[Implementation]) -> List[str]:
        """Retorna lista de todos os nomes de modelos."""
        return list(set(i.model_name for i in implementations))
    
    def run_full_analysis(self, prompt: str, test_cases: List[Any],
                         num_variants: int = 1) -> Dict[str, Any]:
        """
        Executa análise completa de Differential Testing.
        """
        # Gerar implementações
        implementations = self.generate_implementations(prompt, num_variants)
        
        # Comparar sintaticamente
        syntactic_divs = self.compare_syntactic(implementations)
        
        # Comparar comportamentalmente
        behavioral_divs = self.compare_behavioral(implementations, test_cases)
        
        # Calcular consenso
        consensus = self.voting_consensus(implementations, test_cases)
        
        return {
            "implementations": [
                {
                    "model": i.model_name,
                    "structural_hash": i.structural_hash(),
                    "compiles": i.compiled_function is not None,
                    "code_preview": i.source_code[:200] if i.source_code else None
                }
                for i in implementations
            ],
            "syntactic_divergences": len(syntactic_divs),
            "behavioral_divergences": len(behavioral_divs),
            "divergences": [
                {
                    "type": d.divergence_type.value,
                    "models": d.models_involved,
                    "description": d.description,
                    "severity": d.severity
                }
                for d in syntactic_divs + behavioral_divs
            ],
            "consensus": consensus
        }

# ============================================================================
# EXEMPLO DE USO
# ============================================================================

class MockGPT4(LLMInterface):
    @property
    def model_name(self): return "GPT-4"
    
    def generate_code(self, prompt: str, temperature: float = 0.7) -> str:
        # Simulação: em produção, chamar API real
        return '''
def calculate_discount(price, discount_percent):
    if price < 0 or discount_percent < 0 or discount_percent > 100:
        raise ValueError("Invalid input")
    return price * (1 - discount_percent / 100)
'''

class MockClaude(LLMInterface):
    @property
    def model_name(self): return "Claude"
    
    def generate_code(self, prompt: str, temperature: float = 0.7) -> str:
        return '''
def calculate_discount(price, discount_percent):
    """Calculate discounted price."""
    discount = price * discount_percent / 100
    return price - discount
'''

class MockGemini(LLMInterface):
    @property
    def model_name(self): return "Gemini"
    
    def generate_code(self, prompt: str, temperature: float = 0.7) -> str:
        return '''
def calculate_discount(price, discount_rate):
    if discount_rate > 1:
        discount_rate = discount_rate / 100
    return price * (1 - discount_rate)
'''

# Demonstração
if __name__ == "__main__":
    models = [MockGPT4(), MockClaude(), MockGemini()]
    tester = DifferentialTester(models)
    
    prompt = "Write a function to calculate discounted price given original price and discount percentage"
    
    test_cases = [
        {"args": (100.0, 10.0)},
        {"args": (50.0, 20.0)},
        {"args": (200.0, 0.0)},
        {"args": (0.0, 50.0)},
    ]
    
    result = tester.run_full_analysis(prompt, test_cases)
    print(json.dumps(result, indent=2, default=str))
```

### 2.3.5 Interpretação de Resultados

A interpretação de divergências requer cuidado:

| Padrão de Divergência | Interpretação | Ação Recomendada |
|----------------------|---------------|------------------|
| Um modelo discorda de N | Possível erro no minoritário | Investigar implementação do discordante |
| Todos discordam entre si | Especificação ambígua | Revisar requisitos |
| Discordância em edge cases | Comportamento indefinido | Definir comportamento esperado |
| Discordância sintática apenas | Estilo diferente | Aceitável se comportamento idêntico |

## 2.4 Symbolic Execution Híbrida

### 2.4.1 Fundamentos de Symbolic Execution

**Symbolic Execution** é uma técnica de análise de programas onde variáveis são tratadas como símbolos matemáticos em vez de valores concretos. O executor simbólico explora todos os caminhos de execução possíveis, acumulando **path conditions** — restrições que descrevem as condições para seguir cada caminho. Quando uma path condition se torna insatisfatível (contraditória), o caminho é descartado; quando satisfatível, o **SMT solver** (Satisfiability Modulo Theories) pode gerar inputs concretos que exercitam aquele caminho.

A Symbolic Execution tradicional enfrenta limitações severas quando aplicada a código gerado por LLMs:

- **Explosão de Caminhos**: Código gerado frequentemente contém múltiplos branches aninhados.
- **Chamadas Externas**: Interação com APIs, bancos de dados ou sistemas de arquivos.
- **Loops e Recursão**: Dificuldade em determinar bounds.

A **Symbolic Execution Híbrida** integra análise simbólica com técnicas de IA para superar estas limitações.

### 2.4.2 Arquitetura Híbrida

A arquitetura híbrida combina três componentes principais:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 HYBRID SYMBOLIC EXECUTION ENGINE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐                       │
│  │   CONCRETE EXEC     │◄───►│   SYMBOLIC EXEC     │                       │
│  │   (Runtime Values)  │     │   (Path Conditions) │                       │
│  └──────────┬──────────┘     └──────────┬──────────┘                       │
│             │                           │                                   │
│             └───────────────┬───────────┘                                   │
│                             ▼                                               │
│              ┌─────────────────────────────┐                                │
│              │     CONCOLIC EXECUTION      │                                │
│              │  (Concolic = Concrete +     │                                │
│              │   Symbolic)                 │                                │
│              └───────────────┬─────────────┘                                │
│                              │                                              │
│                              ▼                                              │
│              ┌─────────────────────────────┐                                │
│              │      LLM GUIDANCE MODULE    │                                │
│              │  - Priorização de caminhos  │                                │
│              │  - Resolução de constraints │                                │
│              │    complexas                │                                │
│              │  - Geração de invariantes   │                                │
│              └───────────────┬─────────────┘                                │
│                              │                                              │
│                              ▼                                              │
│              ┌─────────────────────────────┐                                │
│              │       SMT SOLVER            │                                │
│              │  (Z3, CVC5, Yices)          │                                │
│              └─────────────────────────────┘                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.4.3 Concolic Execution

**Concolic Execution** (Concrete + Symbolic) executa o programa com valores concretos enquanto simultaneamente mantém rastreamento simbólico. Quando encontra um branch, o engine pode:

1. Seguir o caminho tomado pela execução concreta
2. Usar o SMT solver para encontrar inputs que seguiriam o caminho alternativo
3. Adicionar o novo input à fila de exploração

A integração com LLMs permite priorizar caminhos mais "interessantes" ou gerar invariantes que ajudam a podar caminhos irrelevantes.

### 2.4.4 Implementação de Análise Híbrida

O exemplo a seguir demonstra uma implementação simplificada de análise simbólica com assistência de LLM para verificação de código gerado:

```python
"""
Symbolic Execution Híbrida para verificação de código gerado por LLMs.
Simplificação educacional - ferramentas reais: KLEE, angr, Triton.
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any, Callable, Set, Tuple
from enum import Enum
import ast
import z3  # SMT solver
from abc import ABC, abstractmethod

class SymbolicValue:
    """Representa um valor simbólico no programa."""
    
    def __init__(self, name: str, var_type: str = "Int"):
        self.name = name
        self.var_type = var_type
        self.z3_var = self._create_z3_var(name, var_type)
    
    def _create_z3_var(self, name: str, var_type: str):
        if var_type == "Int":
            return z3.Int(name)
        elif var_type == "Real":
            return z3.Real(name)
        elif var_type == "Bool":
            return z3.Bool(name)
        else:
            return z3.Int(name)

@dataclass
class PathCondition:
    """Condições que devem ser satisfeitas para seguir um caminho."""
    constraints: List[z3.ExprRef] = field(default_factory=list)
    
    def add(self, constraint: z3.ExprRef):
        self.constraints.append(constraint)
    
    def is_satisfiable(self) -> bool:
        """Verifica se as constraints são satisfeitas usando Z3."""
        if not self.constraints:
            return True
        solver = z3.Solver()
        solver.add(z3.And(self.constraints))
        return solver.check() == z3.sat
    
    def get_model(self) -> Optional[Dict[str, Any]]:
        """Retorna um modelo que satisfaz as constraints."""
        if not self.is_satisfiable():
            return None
        solver = z3.Solver()
        solver.add(z3.And(self.constraints))
        if solver.check() == z3.sat:
            model = solver.model()
            result = {}
            for decl in model:
                result[str(decl)] = model[decl]
            return result
        return None

class ExecutionState:
    """Estado de execução simbólica."""
    
    def __init__(self, path_condition: PathCondition = None):
        self.path_condition = path_condition or PathCondition()
        self.symbolic_store: Dict[str, SymbolicValue] = {}
        self.concrete_store: Dict[str, Any] = {}
        self.path_id = 0
    
    def fork(self) -> 'ExecutionState':
        """Cria uma cópia do estado para exploração de branch alternativo."""
        new_state = ExecutionState()
        new_state.path_condition = PathCondition(self.path_condition.constraints.copy())
        new_state.symbolic_store = self.symbolic_store.copy()
        new_state.concrete_store = self.concrete_store.copy()
        return new_state

class LLMGuidance:
    """
    Módulo de orientação por LLM para Symbolic Execution.
    Fornece heurísticas e assistência para análise.
    """
    
    def __init__(self):
        self.path_scores: Dict[int, float] = {}
    
    def score_path(self, state: ExecutionState, 
                   ast_node: ast.AST,
                   code_context: str) -> float:
        """
        Atribui uma pontuação a um caminho baseado em heurísticas.
        Caminhos mais "interessantes" recebem pontuação maior.
        """
        score = 1.0
        
        # Heurística 1: Preferir caminhos com constraints de intervalo
        for constraint in state.path_condition.constraints:
            if self._is_range_constraint(constraint):
                score += 0.5
        
        # Heurística 2: Preferir caminhos que alcançam blocos try/except
        if self._has_exception_handling(ast_node):
            score += 0.3
        
        # Heurística 3: Penalizar caminhos muito profundos
        depth = len(state.path_condition.constraints)
        score -= depth * 0.05
        
        return max(0.0, score)
    
    def _is_range_constraint(self, constraint: z3.ExprRef) -> bool:
        """Detecta se a constraint é do tipo x > a, x < b, etc."""
        constraint_str = str(constraint)
        return any(op in constraint_str for op in ['<', '>', '<=', '>='])
    
    def _has_exception_handling(self, node: ast.AST) -> bool:
        """Verifica se o nó contém tratamento de exceção."""
        for child in ast.walk(node):
            if isinstance(child, (ast.Try, ast.ExceptHandler)):
                return True
        return False
    
    def suggest_invariant(self, loop_node: ast.For, 
                          pre_state: ExecutionState) -> Optional[z3.ExprRef]:
        """
        Sugere invariantes de loop baseado em análise do código.
        Em implementação real, poderia usar LLM para gerar invariantes.
        """
        # Placeholder: invariantes simples para loops for
        if isinstance(loop_node.iter, ast.Call):
            if isinstance(loop_node.iter.func, ast.Name):
                if loop_node.iter.func.id == 'range':
                    # Sugerir: índice >= 0
                    target = loop_node.target.id if isinstance(loop_node.target, ast.Name) else "i"
                    return z3.Int(target) >= 0
        return None
    
    def prioritize_states(self, states: List[ExecutionState], 
                         ast_nodes: List[ast.AST]) -> List[ExecutionState]:
        """Reordena estados por pontuação de interesse."""
        scored = [(s, self.score_path(s, n, "")) for s, n in zip(states, ast_nodes)]
        scored.sort(key=lambda x: x[1], reverse=True)
        return [s for s, _ in scored]

class HybridSymbolicExecutor:
    """
    Executor simbólico híbrido com integração de LLM guidance.
    """
    
    def __init__(self, max_paths: int = 100, max_depth: int = 50):
        self.max_paths = max_paths
        self.max_depth = max_depth
        self.llm_guidance = LLMGuidance()
        self.explored_paths: List[PathCondition] = []
        self.violations: List[Dict] = []
    
    def analyze_function(self, func: Callable, 
                        param_types: Dict[str, str]) -> Dict[str, Any]:
        """
        Analisa uma função usando execução simbólica híbrida.
        
        Args:
            func: Função a ser analisada
            param_types: Mapa de nome de parâmetro para tipo (Int, Real, Bool)
        """
        # Inicializar estado com parâmetros simbólicos
        initial_state = ExecutionState()
        for param_name, param_type in param_types.items():
            sym_val = SymbolicValue(param_name, param_type)
            initial_state.symbolic_store[param_name] = sym_val
        
        # Obter AST da função
        source = inspect.getsource(func)
        tree = ast.parse(source)
        func_ast = tree.body[0]
        
        # Explorar caminhos
        self._explore_paths(func_ast, initial_state, depth=0)
        
        return {
            "total_paths_explored": len(self.explored_paths),
            "satisfiable_paths": sum(1 for p in self.explored_paths if p.is_satisfiable()),
            "violations": self.violations,
            "path_conditions": [str(p.constraints) for p in self.explored_paths]
        }
    
    def _explore_paths(self, node: ast.AST, state: ExecutionState, depth: int):
        """Explora recursivamente os caminhos de execução."""
        if depth > self.max_depth or len(self.explored_paths) >= self.max_paths:
            return
        
        if isinstance(node, ast.If):
            self._handle_if(node, state, depth)
        elif isinstance(node, ast.For):
            self._handle_for(node, state, depth)
        elif isinstance(node, ast.While):
            self._handle_while(node, state, depth)
        elif isinstance(node, ast.Return):
            self._handle_return(node, state)
        else:
            # Continuar para nós filhos
            for child in ast.iter_child_nodes(node):
                self._explore_paths(child, state, depth + 1)
    
    def _handle_if(self, node: ast.If, state: ExecutionState, depth: int):
        """Processa branch condicional."""
        condition = self._eval_condition(node.test, state)
        
        if condition is None:
            return
        
        # Caminho Then (condição verdadeira)
        then_state = state.fork()
        then_state.path_condition.add(condition)
        if then_state.path_condition.is_satisfiable():
            for child in node.body:
                self._explore_paths(child, then_state, depth + 1)
        
        # Caminho Else (condição falsa)
        else_state = state.fork()
        else_state.path_condition.add(z3.Not(condition))
        if else_state.path_condition.is_satisfiable():
            for child in node.orelse:
                self._explore_paths(child, else_state, depth + 1)
    
    def _handle_for(self, node: ast.For, state: ExecutionState, depth: int):
        """Processa loop for com unrolling limitado."""
        # Obter sugestão de invariante do LLM guidance
        invariant = self.llm_guidance.suggest_invariant(node, state)
        
        # Unrolling limitado (3 iterações)
        for i in range(3):
            loop_state = state.fork()
            # Adicionar constraint de índice
            idx_var = z3.Int(node.target.id if isinstance(node.target, ast.Name) else "i")
            loop_state.path_condition.add(idx_var == i)
            
            if invariant:
                loop_state.path_condition.add(invariant)
            
            if loop_state.path_condition.is_satisfiable():
                for child in node.body:
                    self._explore_paths(child, loop_state, depth + 1)
    
    def _handle_while(self, node: ast.While, state: ExecutionState, depth: int):
        """Processa loop while com unrolling limitado."""
        # Similar ao for, com limitação de iterações
        for _ in range(3):  # Unrolling limitado
            condition = self._eval_condition(node.test, state)
            if condition is None:
                break
            
            loop_state = state.fork()
            loop_state.path_condition.add(condition)
            
            if not loop_state.path_condition.is_satisfiable():
                break
            
            for child in node.body:
                self._explore_paths(child, loop_state, depth + 1)
            state = loop_state
    
    def _handle_return(self, node: ast.Return, state: ExecutionState):
        """Processa retorno de função."""
        self.explored_paths.append(state.path_condition)
        
        # Verificar violações de invariantes
        self._check_violations(node, state)
    
    def _eval_condition(self, node: ast.AST, state: ExecutionState) -> Optional[z3.ExprRef]:
        """Avalia uma condição AST para uma expressão Z3."""
        if isinstance(node, ast.Compare):
            left = self._expr_to_z3(node.left, state)
            if left is None:
                return None
            
            for op, comparator in zip(node.ops, node.comparators):
                right = self._expr_to_z3(comparator, state)
                if right is None:
                    return None
                
                if isinstance(op, ast.Lt):
                    return left < right
                elif isinstance(op, ast.LtE):
                    return left <= right
                elif isinstance(op, ast.Gt):
                    return left > right
                elif isinstance(op, ast.GtE):
                    return left >= right
                elif isinstance(op, ast.Eq):
                    return left == right
                elif isinstance(op, ast.NotEq):
                    return left != right
        
        elif isinstance(node, ast.BoolOp):
            values = [self._eval_condition(v, state) for v in node.values]
            values = [v for v in values if v is not None]
            
            if not values:
                return None
            
            if isinstance(node.op, ast.And):
                return z3.And(values)
            elif isinstance(node.op, ast.Or):
                return z3.Or(values)
        
        return None
    
    def _expr_to_z3(self, node: ast.AST, state: ExecutionState) -> Optional[z3.ExprRef]:
        """Converte expressão AST para expressão Z3."""
        if isinstance(node, ast.Name):
            if node.id in state.symbolic_store:
                return state.symbolic_store[node.id].z3_var
            return None
        
        elif isinstance(node, ast.Num):
            return z3.IntVal(node.n)
        
        elif isinstance(node, ast.Constant):  # Python 3.8+
            if isinstance(node.value, (int, float)):
                return z3.IntVal(node.value)
        
        elif isinstance(node, ast.BinOp):
            left = self._expr_to_z3(node.left, state)
            right = self._expr_to_z3(node.right, state)
            
            if left is None or right is None:
                return None
            
            if isinstance(node.op, ast.Add):
                return left + right
            elif isinstance(node.op, ast.Sub):
                return left - right
            elif isinstance(node.op, ast.Mult):
                return left * right
            elif isinstance(node.op, ast.Div):
                return left / right
        
        return None
    
    def _check_violations(self, node: ast.Return, state: ExecutionState):
        """Verifica violações de invariantes no estado atual."""
        # Exemplo: verificar divisão por zero
        # Em implementação real, analisaria o histórico de operações
        pass

import inspect

# ============================================================================
# EXEMPLO DE USO
# ============================================================================

def example_function(x, y):
    """Função de exemplo para análise simbólica."""
    if x > 0:
        if y > 0:
            return x + y
        else:
            return x - y
    else:
        if y > 0:
            return x * y
        else:
            return x / y if y != 0 else 0

def divide_with_check(a, b):
    """Função com potencial divisão por zero."""
    if b == 0:
        raise ValueError("Division by zero")
    return a / b

if __name__ == "__main__":
    executor = HybridSymbolicExecutor(max_paths=50)
    
    result = executor.analyze_function(
        example_function,
        param_types={"x": "Int", "y": "Int"}
    )
    
    print("Análise Simbólica Híbrida")
    print("=" * 50)
    print(f"Caminhos explorados: {result['total_paths_explored']}")
    print(f"Caminhos satisfatíveis: {result['satisfiable_paths']}")
    print(f"Violações detectadas: {len(result['violations'])}")
```

### 2.4.5 Limitações e Quando Aplicar

A Symbolic Execution Híbrida possui limitações fundamentais que devem ser consideradas:

| Limitação | Impacto | Mitigação |
|-----------|---------|-----------|
| **Explosão de Caminhos** | Número exponencial de caminhos em código com muitos branches | Limitar profundidade, usar heurísticas de priorização |
| **Complexidade de Constraints** | SMT solver pode não conseguir resolver constraints complexas | Fallback para execução concreta |
| **Chamadas Externas** | Sistemas de arquivos, rede, banco de dados | Mocking, execução concólica |
| **Loops Infinitos** | Análise pode não terminar | Unrolling limitado, inferência de invariantes |
| **Código Não-Analisável** | Reflection, código dinâmico | Instrumentação runtime |

**Quando Aplicar:**
- Funções matemáticas puras com lógica de controle complexa
- Algoritmos de processamento de dados com múltiplos casos edge
- Código com invariantes críticas que devem ser preservadas
- Validação de código criptográfico ou financeiro

**Quando NÃO Aplicar:**
- Código fortemente acoplado a I/O
- Sistemas com estado global complexo
- Código que depende de timing ou concorrência
- Funções triviais onde testes tradicionais são suficientes

## 2.5 Fuzzing Direcionado por Semântica

### 2.5.1 Evolução do Fuzzing Tradicional

O **Fuzzing** tradicional gera inputs aleatórios para exercitar programas, buscando crashes ou comportamentos inesperados. Embora eficaz para descobrir vulnerabilidades de segurança, o fuzzing aleatório sofre de limitações quando aplicado a código gerado por LLMs:

- **Baixa Semântica**: Inputs aleatórios frequentemente falham em validações de formato prévias.
- **Cobertura Limitada**: Dificuldade em alcançar branches profundos que requerem estruturas específicas.
- **Falta de Contexto**: Ignora a semântica do domínio do problema.

O **Fuzzing Direcionado por Semântica** (Semantics-Guided Fuzzing) integra LLMs ao processo de fuzzing, utilizando modelos de linguagem para gerar inputs que são sintaticamente e semanticamente válidos para o domínio de aplicação.

### 2.5.2 Arquitetura do Fuzzing Semântico

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              SEMANTICS-GUIDED FUZZING FRAMEWORK                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    SEED CORPUS (Inputs Iniciais)                    │   │
│  │    [Válidos estruturalmente e semanticamente, gerados ou manuais]   │   │
│  └─────────────────────────────┬───────────────────────────────────────┘   │
│                                │                                            │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    LLM-BASED MUTATION ENGINE                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │   Semantic   │  │   Structure  │  │   Boundary   │              │   │
│  │  │   Mutation   │  │   Mutation   │  │   Generation │              │   │
│  │  │  (meaning-   │  │  (preserve   │  │  (edge cases │              │   │
│  │  │   preserving)│  │   validity)  │  │   values)    │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  └─────────────────────────────┬───────────────────────────────────────┘   │
│                                │                                            │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    COVERAGE-GUIDED FEEDBACK LOOP                    │   │
│  │                                                                     │   │
│  │   Input ──► Instrumented Code ──► Coverage Map ──► Score           │   │
│  │                              │                                     │   │
│  │                              ▼                                     │   │
│  │                        Crash / Bug? ──► Report                     │   │
│  │                                                                     │   │
│  └─────────────────────────────┬───────────────────────────────────────┘   │
│                                │                                            │
│                                ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    LLM FEEDBACK INTEGRATION                         │   │
│  │   [Análise de crashes para gerar inputs mais específicos]           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.5.3 Geração Semântica de Inputs

A geração semântica de inputs utiliza LLMs para produzir dados que respeitem as invariantes do domínio. Para um parser de JSON, por exemplo, em vez de gerar bytes aleatórios, o LLM gera estruturas JSON válidas com mutações controladas:

**Estratégias de Mutação Semântica:**

1. **Mutação de Valores**: Preservar estrutura, alterar valores
2. **Mutação de Estrutura**: Adicionar/remover campos mantendo validade
3. **Geração de Fronteira**: Valores limite (empty strings, max integers)
4. **Combinação Semântica**: Mesclar características de múltiplos inputs válidos

### 2.5.4 Implementação de Fuzzing Direcionado

O exemplo a seguir demonstra um framework de fuzzing semântico para testar funções de processamento de dados:

```python
"""
Semantics-Guided Fuzzing para código gerado por LLMs.
Integra LLMs para geração de inputs semanticamente válidos.
"""

import random
import string
import json
from dataclasses import dataclass, field
from typing import List, Dict, Any, Callable, Optional, Set, Tuple
from abc import ABC, abstractmethod
from enum import Enum
import hashlib
import time
from collections import defaultdict

class MutationType(Enum):
    """Tipos de mutação suportados."""
    VALUE = "value"           # Alterar valores mantendo estrutura
    STRUCTURE = "structure"   # Alterar estrutura mantendo validade
    BOUNDARY = "boundary"     # Valores de fronteira
    COMBINATION = "combination"  # Combinar múltiplos inputs
    SEMANTIC = "semantic"     # Mutação com preservação semântica

@dataclass
class FuzzInput:
    """Representa um input de fuzzing."""
    data: Any
    source: str                    # origem: "seed", "mutation", "llm"
    mutation_chain: List[str] = field(default_factory=list)
    coverage: Set[int] = field(default_factory=set)
    score: float = 0.0
    
    def __hash__(self):
        return hash(json.dumps(self.data, sort_keys=True, default=str))

class LLMFuzzer:
    """
    Interface para geração de inputs via LLM.
    Em produção, integraria com APIs reais (OpenAI, Anthropic, etc.)
    """
    
    def __init__(self, model_name: str = "mock"):
        self.model_name = model_name
    
    def generate_valid_input(self, schema: Dict[str, Any], 
                            context: str = "") -> Any:
        """
        Gera um input semanticamente válido baseado em schema.
        """
        # Implementação mock - em produção, chamaria API de LLM
        return self._mock_generate(schema)
    
    def mutate_semantically(self, input_data: Any, 
                           mutation_description: str) -> Any:
        """
        Aplica mutação semântica guiada por LLM.
        """
        # Em produção: prompt ao LLM para mutar preservando semântica
        return self._mock_mutate(input_data, mutation_description)
    
    def explain_crash(self, input_data: Any, 
                     exception: Exception) -> str:
        """
        Analisa um crash para sugerir inputs relacionados.
        """
        return f"Crash analysis: {type(exception).__name__} with input {input_data}"
    
    def _mock_generate(self, schema: Dict) -> Any:
        """Geração mock para demonstração."""
        if schema.get("type") == "object":
            result = {}
            for prop, prop_schema in schema.get("properties", {}).items():
                result[prop] = self._generate_value(prop_schema)
            return result
        return None
    
    def _generate_value(self, schema: Dict) -> Any:
        """Gera valor baseado em tipo do schema."""
        type_map = {
            "string": lambda: ''.join(random.choices(string.ascii_letters, k=10)),
            "integer": lambda: random.randint(-1000, 1000),
            "number": lambda: random.uniform(-1000, 1000),
            "boolean": lambda: random.choice([True, False]),
            "array": lambda: [self._generate_value(schema.get("items", {})) 
                            for _ in range(random.randint(0, 5))]
        }
        return type_map.get(schema.get("type"), lambda: None)()
    
    def _mock_mutate(self, data: Any, description: str) -> Any:
        """Mutação mock."""
        if isinstance(data, dict):
            result = data.copy()
            if result:
                key = random.choice(list(result.keys()))
                if isinstance(result[key], (int, float)):
                    result[key] = result[key] * random.uniform(0.5, 2.0)
                elif isinstance(result[key], str):
                    result[key] = result[key] + "_mutated"
            return result
        return data

class CoverageTracker:
    """
    Rastreamento de cobertura de código.
    Simplificado - ferramentas reais usam instrumentação binária.
    """
    
    def __init__(self):
        self.covered_lines: Set[int] = set()
        self.branch_taken: Dict[int, Set[bool]] = defaultdict(set)
        self.hit_counts: Dict[int, int] = defaultdict(int)
    
    def trace_line(self, line_no: int):
        """Registra execução de uma linha."""
        self.covered_lines.add(line_no)
        self.hit_counts[line_no] += 1
    
    def trace_branch(self, line_no: int, taken: bool):
        """Registra direção de branch."""
        self.branch_taken[line_no].add(taken)
    
    def coverage_score(self) -> float:
        """Calcula score de cobertura."""
        # Simples: número de linhas únicas
        return len(self.covered_lines)
    
    def new_coverage(self, other: 'CoverageTracker') -> bool:
        """Verifica se houve nova cobertura comparado a outro tracker."""
        return bool(self.covered_lines - other.covered_lines)

class SemanticsGuidedFuzzer:
    """
    Fuzzing direcionado por semântica para código gerado por LLMs.
    """
    
    def __init__(self, target_function: Callable,
                 input_schema: Dict[str, Any],
                 llm_fuzzer: Optional[LLMFuzzer] = None,
                 max_iterations: int = 10000,
                 seed_corpus_size: int = 10):
        self.target = target_function
        self.schema = input_schema
        self.llm = llm_fuzzer or LLMFuzzer()
        self.max_iterations = max_iterations
        self.seed_corpus_size = seed_corpus_size
        
        self.corpus: List[FuzzInput] = []
        self.crashes: List[Tuple[FuzzInput, Exception]] = []
        self.coverage = CoverageTracker()
        
        # Estatísticas
        self.iterations = 0
        self.start_time = None
    
    def generate_seed_corpus(self) -> List[FuzzInput]:
        """Gera corpus inicial de seeds."""
        seeds = []
        
        # Seeds gerados por LLM
        for i in range(self.seed_corpus_size):
            data = self.llm.generate_valid_input(self.schema, f"seed_{i}")
            seed = FuzzInput(
                data=data,
                source="llm_seed",
                mutation_chain=["llm_generate"]
            )
            seeds.append(seed)
        
        # Seeds de fronteira
        boundary_seeds = self._generate_boundary_seeds()
        seeds.extend(boundary_seeds)
        
        return seeds
    
    def _generate_boundary_seeds(self) -> List[FuzzInput]:
        """Gera seeds com valores de fronteira."""
        boundaries = []
        
        # Valores extremos para tipos numéricos
        boundary_values = [
            0, 1, -1,
            2**31 - 1, -(2**31),  # int32
            2**63 - 1, -(2**63),  # int64
            float('inf'), float('-inf'), float('nan'),
        ]
        
        # Strings especiais
        boundary_strings = [
            "", " ", "\n", "\t", "\0",
            "a" * 10000,  # Long string
            "'\"`;",      # Caracteres especiais
            "<script>",   # Potencial XSS
        ]
        
        # Criar seeds de fronteira
        for val in boundary_values:
            boundaries.append(FuzzInput(
                data={"value": val, "type": "boundary_numeric"},
                source="boundary",
                mutation_chain=["boundary_generation"]
            ))
        
        for s in boundary_strings:
            boundaries.append(FuzzInput(
                data={"value": s, "type": "boundary_string"},
                source="boundary",
                mutation_chain=["boundary_generation"]
            ))
        
        return boundaries
    
    def mutate(self, parent: FuzzInput) -> FuzzInput:
        """Aplica mutação a um input."""
        mutation_type = random.choice(list(MutationType))
        
        if mutation_type == MutationType.SEMANTIC and self.llm:
            # Mutação guiada por LLM
            new_data = self.llm.mutate_semantically(
                parent.data, 
                "preserving domain semantics"
            )
            source = "llm_mutation"
        elif mutation_type == MutationType.VALUE:
            new_data = self._mutate_values(parent.data)
            source = "value_mutation"
        elif mutation_type == MutationType.STRUCTURE:
            new_data = self._mutate_structure(parent.data)
            source = "structure_mutation"
        elif mutation_type == MutationType.BOUNDARY:
            new_data = self._mutate_to_boundary(parent.data)
            source = "boundary_mutation"
        else:
            new_data = self._combine_inputs(parent.data)
            source = "combination"
        
        return FuzzInput(
            data=new_data,
            source=source,
            mutation_chain=parent.mutation_chain + [f"{mutation_type.value}"]
        )
    
    def _mutate_values(self, data: Any) -> Any:
        """Muta valores mantendo estrutura."""
        if isinstance(data, dict):
            result = {}
            for k, v in data.items():
                if isinstance(v, (int, float)):
                    # Mutar número
                    result[k] = v * random.uniform(0.1, 10.0)
                elif isinstance(v, str):
                    # Mutar string
                    if v and random.random() < 0.5:
                        result[k] = v[:-1]  # Remover último caractere
                    else:
                        result[k] = v + random.choice(string.ascii_letters)
                elif isinstance(v, bool):
                    result[k] = not v
                else:
                    result[k] = v
            return result
        return data
    
    def _mutate_structure(self, data: Any) -> Any:
        """Muta estrutura mantendo validade aproximada."""
        if isinstance(data, dict):
            result = data.copy()
            if random.random() < 0.3 and result:
                # Remover campo aleatório
                key = random.choice(list(result.keys()))
                del result[key]
            if random.random() < 0.3:
                # Adicionar campo
                result[f"extra_{random.randint(0, 1000)}"] = "extra_value"
            return result
        return data
    
    def _mutate_to_boundary(self, data: Any) -> Any:
        """Força valores de fronteira."""
        if isinstance(data, dict):
            result = data.copy()
            if result:
                key = random.choice(list(result.keys()))
                if isinstance(result[key], (int, float)):
                    result[key] = random.choice([0, -1, 1, 2**31-1])
            return result
        return data
    
    def _combine_inputs(self, data: Any) -> Any:
        """Combina com outro input do corpus."""
        if not self.corpus:
            return data
        other = random.choice(self.corpus).data
        
        if isinstance(data, dict) and isinstance(other, dict):
            result = data.copy()
            # Mesclar campos do outro input
            for k, v in other.items():
                if k not in result or random.random() < 0.5:
                    result[k] = v
            return result
        return data
    
    def execute(self, fuzz_input: FuzzInput) -> Tuple[Any, Optional[Exception]]:
        """Executa a função alvo e retorna resultado ou exceção."""
        try:
            result = self.target(fuzz_input.data)
            return result, None
        except Exception as e:
            return None, e
    
    def run(self) -> Dict[str, Any]:
        """Executa o loop principal de fuzzing."""
        self.start_time = time.time()
        
        # Inicializar corpus
        print("Generating seed corpus...")
        self.corpus = self.generate_seed_corpus()
        
        # Loop principal
        print(f"Starting fuzzing (max {self.max_iterations} iterations)...")
        
        while self.iterations < self.max_iterations:
            self.iterations += 1
            
            # Selecionar input para mutação
            if random.random() < 0.1 or not self.corpus:
                # Novo input aleatório ocasionalmente
                parent = FuzzInput(
                    data=self.llm.generate_valid_input(self.schema),
                    source="fresh_generation"
                )
            else:
                # Selecionar do corpus (priorizando inputs com melhor score)
                parent = random.choice(self.corpus)
            
            # Mutar
            candidate = self.mutate(parent)
            
            # Executar
            result, exception = self.execute(candidate)
            
            if exception:
                # Crash detectado
                self.crashes.append((candidate, exception))
                print(f"\n[!] CRASH FOUND at iteration {self.iterations}")
                print(f"    Exception: {type(exception).__name__}: {exception}")
                print(f"    Input: {candidate.data}")
                print(f"    Chain: {' -> '.join(candidate.mutation_chain)}")
            else:
                # Verificar se houve nova cobertura
                # (Em implementação real, com instrumentação)
                if random.random() < 0.1:  # Simular nova cobertura
                    candidate.score = parent.score + 1
                    if candidate not in self.corpus:
                        self.corpus.append(candidate)
            
            # Progresso
            if self.iterations % 1000 == 0:
                elapsed = time.time() - self.start_time
                print(f"Iterations: {self.iterations}, "
                      f"Corpus: {len(self.corpus)}, "
                      f"Crashes: {len(self.crashes)}, "
                      f"Time: {elapsed:.1f}s")
        
        return self._generate_report()
    
    def _generate_report(self) -> Dict[str, Any]:
        """Gera relatório final de fuzzing."""
        elapsed = time.time() - self.start_time
        
        return {
            "total_iterations": self.iterations,
            "total_time_seconds": elapsed,
            "iterations_per_second": self.iterations / elapsed if elapsed > 0 else 0,
            "corpus_size": len(self.corpus),
            "unique_crashes": len(self.crashes),
            "crash_summary": [
                {
                    "exception": type(exc).__name__,
                    "message": str(exc)[:100],
                    "input_preview": str(inp.data)[:100],
                    "mutation_depth": len(inp.mutation_chain)
                }
                for inp, exc in self.crashes[:10]  # Top 10 crashes
            ],
            "seed_sources": defaultdict(int, {
                inp.source: sum(1 for i in self.corpus if i.source == inp.source)
                for inp in self.corpus
            })
        }

# ============================================================================
# EXEMPLO DE USO
# ============================================================================

def example_processor(data: Dict) -> Dict:
    """
    Função de exemplo para fuzzing.
    Contém bugs intencionais para demonstração.
    """
    result = {"processed": True}
    
    # Potencial divisão por zero
    if "value" in data and isinstance(data["value"], (int, float)):
        divisor = data.get("divisor", 1)
        result["ratio"] = data["value"] / divisor  # Bug: divisão por zero
    
    # Potencial acesso a chave inexistente
    if data.get("process_items"):
        items = data["items"]  # Bug: KeyError se "items" não existe
        result["sum"] = sum(items)
    
    # Potencial loop infinito
    if data.get("repeat"):
        count = data.get("count", 0)
        if count < 0:  # Bug: loop infinito com count negativo
            while count < 10:
                pass  # Loop infinito
    
    return result

if __name__ == "__main__":
    # Schema do input
    input_schema = {
        "type": "object",
        "properties": {
            "value": {"type": "number"},
            "divisor": {"type": "number"},
            "process_items": {"type": "boolean"},
            "items": {"type": "array", "items": {"type": "integer"}},
            "repeat": {"type": "boolean"},
            "count": {"type": "integer"}
        }
    }
    
    # Configurar fuzzer
    fuzzer = SemanticsGuidedFuzzer(
        target_function=example_processor,
        input_schema=input_schema,
        max_iterations=5000,
        seed_corpus_size=5
    )
    
    # Executar
    report = fuzzer.run()
    
    print("\n" + "=" * 60)
    print("FUZZING REPORT")
    print("=" * 60)
    print(json.dumps(report, indent=2, default=str))
```

### 2.5.5 Integração com Ferramentas Modernas

O Fuzzing Direcionado por Semântica pode ser integrado com ferramentas modernas de fuzzing:

| Ferramenta | Capacidade | Integração com LLM |
|------------|------------|-------------------|
| **AFL++** | Coverage-guided fuzzing | LLM para geração de seeds semânticas |
| **libFuzzer** | In-process fuzzing | LLM para mutação estruturada |
| **Jazzer** | JVM fuzzing | LLM para geração de inputs JSON/Protobuf |
| **boofuzz** | Network protocol fuzzing | LLM para gramáticas de protocolo |
| **DeepState** | Symbolic + Fuzzing híbrido | LLM para redução de test cases |

## Practical Considerations

### Escolhendo a Técnica Apropriada

A seleção da técnica de teste deve considerar as características do código gerado e os recursos disponíveis:

| Cenário | Técnica Recomendada | Justificativa |
|---------|---------------------|---------------|
| **Oráculo indisponível** | Metamorphic Testing | Não requer especificação completa |
| **Lógica complexa, múltiplos branches** | Symbolic Execution Híbrida | Exploração sistemática de caminhos |
| **Processamento de dados massivo** | Property-Based Testing | Geração automática de casos de teste |
| **Comparação de modelos** | Differential Testing | Validação cruzada entre implementações |
| **Detecção de vulnerabilidades** | Fuzzing Direcionado | Descoberta de edge cases de segurança |
| **Pipeline CI/CD** | Property-Based + Fuzzing | Automação completa |

### Custo-Benefício das Técnicas

A análise econômica das técnicas é essencial para alocação eficiente de recursos:

| Técnica | Custo de Implementação | Custo de Execução | Valor de Detecção |
|---------|----------------------|-------------------|-------------------|
| Metamorphic Testing | Médio (engenharia de MRs) | Baixo | Alto (propriedades fundamentais) |
| Property-Based Testing | Baixo | Baixo-Médio | Alto (falsificação sistemática) |
| Differential Testing | Alto (múltiplas integrações) | Alto | Médio-Alto (comparação) |
| Symbolic Execution | Alto (configuração complexa) | Alto | Muito Alto (prova formal) |
| Fuzzing Semântico | Médio (integração LLM) | Médio | Alto (vulnerabilidades) |

### Anti-Padrões a Evitar

1. **Over-reliance em uma única técnica**: Nenhuma técnica é suficiente isoladamente. Complementariedade é essencial.

2. **Ignorar falsos positivos**: Divergências em Differential Testing ou violações em Property-Based Testing devem ser triadas cuidadosamente.

3. **Subestimar custo de manutenção**: Testes baseados em propriedades e relações metamórficas requerem atualização conforme o sistema evolui.

4. **Aplicar técnicas formais indevidamente**: Symbolic Execution em código trivial é desperdício de recursos.

### Integração em Pipelines de Desenvolvimento

```yaml
# Exemplo de pipeline CI/CD integrando múltiplas técnicas
stages:
  - static-analysis
  - unit-tests
  - advanced-testing
  - security

advanced-testing:
  stage: advanced-testing
  parallel:
    - property-tests:
        script:
          - pytest tests/properties/ --hypothesis-profile=ci
    
    - metamorphic-tests:
        script:
          - python tests/metamorphic/run_all.py
    
    - differential-tests:
        script:
          - python scripts/differential_test.py --models gpt4,claude,gemini
      
    - symbolic-analysis:
        script:
          - klee --max-time=300 generated_code/
      
    - fuzzing:
        script:
          - python scripts/semantic_fuzz.py --duration=600
```

## Summary

- **Metamorphic Testing** resolve o problema do oráculo imperfeito verificando relações invariantes entre entradas e saídas, em vez de valores absolutos. Relações metamórficas bem projetadas podem detectar defeitos sem necessidade de especificações completas.

- **Property-Based Testing** em escala utiliza frameworks como Hypothesis para testar propriedades universais do sistema, gerando automaticamente milhares de casos de teste que buscam ativamente violações. O processo de shrinking produz exemplos mínimos reprodutíveis.

- **Differential Testing** entre múltiplos LLMs identifica divergências comparando saídas de diferentes modelos para os mesmos inputs. Mecanismos de votação e consenso aumentam a confiança quando múltiplos modelos concordam.

- **Symbolic Execution Híbrida** combina análise formal com heurísticas de IA para explorar espaços de estado de forma eficiente. A integração com SMT solvers permite geração de inputs específicos para caminhos de execução, enquanto LLM guidance prioriza caminhos mais "interessantes".

- **Fuzzing Direcionado por Semântica** eleva o fuzzing tradicional através da integração com LLMs para geração de inputs semanticamente válidos. A combinação de mutações semânticas com feedback de cobertura maximiza a eficácia na descoberta de vulnerabilidades.

- A **combinação estratégica** destas técnicas cria uma rede de verificação em múltiplas camadas, onde cada técnica explora dimensões diferentes do espaço de comportamentos possíveis, compensando limitações individuais através de complementariedade.

## References

1. Segura, S., Parejo, J. A., Troya, J., & Ruiz-Cortés, A. (2024). "Metamorphic Relations for Testing Machine Learning: A Systematic Mapping Study." *arXiv preprint arXiv:2412.17616*. Adaptação das relações metamórficas para teste de código gerado por LLMs.

2. TPTP (2025). "Progress in Property-Based Testing: Research and Tools." *Proceedings of the Conference on Automated Deduction (CADE)*. Panorama atual das técnicas de property-based testing e ferramentas modernas.

3. Bunel, R., Lu, J., Turkaslan, I., Kohli, P., Torr, P., & Kumar, M. P. (2024). "Formal Verification of Machine Learning Models: A Survey." *ACM Computing Surveys*. Análise comprehensiva de técnicas de verificação formal aplicadas a sistemas de IA.

4. Zhang, Y., Li, Y., Cao, Y., Chen, L., & Liu, Y. (2024). "Robustness of Code Generated by Large Language Models." *arXiv preprint arXiv:2408.02316*. Estudo empírico da robustez de código gerado por LLMs frente a variações de input.

5. CVE Research (2025). "Large Language Model-assisted Fuzzing." *arXiv preprint arXiv:2503.07654*. Integração de LLMs com fuzzing tradicional para geração de inputs semanticamente válidos e descoberta de vulnerabilidades.

6. Cadar, C., & Sen, K. (2023). "Symbolic Execution for Software Testing: Three Decades Later." *Communications of the ACM*. Revisão histórica e estado atual da execução simbólica.

7. Galeotti, J. P., Fraser, G., & Arcuri, A. (2024). "Improving Search-Based Test Suite Generation with Dynamic Symbolic Execution." *IEEE Transactions on Software Engineering*. Técnicas híbridas de busca e execução simbólica.

8. Godefroid, P., Levin, M. Y., & Molnar, D. (2024). "SAGE: Whitebox Fuzzing for Security Testing." *Queue*, 10(1). Fundamentos do fuzzing whitebox e aplicações em segurança.

9. Harman, M., & O'Hearn, P. (2024). "From Start-ups to Scale-ups: Opportunities and Open Problems for Static and Dynamic Program Analysis." *ICSE*. Direções futuras em análise de programas híbrida.

10. Pei, K., Cao, Y., Yang, J., & Jana, S. (2024). "DeepXplore: Automated Whitebox Testing of Deep Learning Systems." *ACM Transactions on Software Engineering and Methodology*. Técnicas de testing para sistemas de deep learning adaptáveis a código gerado.

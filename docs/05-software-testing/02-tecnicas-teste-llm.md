---
title: "Tecnicas de Teste para Codigo Gerado por LLMs"
created_at: "2025-01-31"
tags: ["software-testing", "llm", "metamorphic-testing", "property-based-testing", "differential-testing", "fuzzing"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5.2 Técnicas de Teste para Código Gerado por LLMs

## Overview

Esta seção apresenta técnicas avançadas de teste especificamente adaptadas para verificar código gerado por Large Language Models (LLMs). Diferentemente do código escrito manualmente, código de IA apresenta características únicas: pode conter alucinações sutis, ser sintaticamente correto mas semanticamente incorreto, e variar significativamente entre execuções.

As técnicas aqui apresentadas resolvem o **problema do oráculo** — a dificuldade de determinar o resultado correto esperado — através de abordagens que verificam propriedades, relações entre entradas/saídas, e comportamentos estatísticos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar** metamorphic testing para oráculos imperfeitos
2. **Implementar** property-based testing em escala para código de IA
3. **Utilizar** differential testing entre múltiplos modelos
4. **Combinar** symbolic execution híbrida (IA + análise formal)
5. **Executar** fuzzing direcionado por semântica

## Metamorphic Testing para Oráculos Imperfeitos

### Conceito Fundamental

Metamorphic Testing (MT) é uma técnica que resolve o problema do oráculo ao verificar **relações entre entradas e saídas** em vez de verificar saídas absolutas. Para código gerado por IA, onde especificações frequentemente são incompletas, MT é essencial [Segura et al., 2024].

**Princípio Básico:**
```
Se entrada x produz saída f(x)
E existe transformação T(x)
Então f(T(x)) deve estar em relação R com f(x)
```

### Metamorphic Relations (MRs) para Código

**1. MRs para Funções Matemáticas**
```python
# MR: Comutatividade da adição
def test_addition_commutative():
    a, b = 5, 3
    result1 = generated_add(a, b)
    result2 = generated_add(b, a)
    assert result1 == result2

# MR: Associatividade
def test_addition_associative():
    a, b, c = 1, 2, 3
    result1 = generated_add(generated_add(a, b), c)
    result2 = generated_add(a, generated_add(b, c))
    assert result1 == result2
```

**2. MRs para Estruturas de Dados**
```python
# MR: Tamanho após ordenação
def test_sort_length_preservation():
    lista = [3, 1, 4, 1, 5, 9, 2, 6]
    sorted_list = generated_sort(lista)
    assert len(sorted_list) == len(lista)

# MR: Ordenação reversa
def test_sort_reverse_relation():
    lista = [3, 1, 4, 1, 5]
    asc = generated_sort(lista, order='asc')
    desc = generated_sort(lista, order='desc')
    assert asc == list(reversed(desc))
```

**3. MRs para APIs e Serviços**
```python
# MR: Idempotência de GET
def test_get_idempotent():
    response1 = generated_api.get('/user/123')
    response2 = generated_api.get('/user/123')
    assert response1.json() == response2.json()
```

### Implementação Prática

**Framework MT-LAPR para Reparo Automático de Programas**

Pesquisa recente [Zhang et al., 2024] propôs MT-LAPR, que utiliza 9 Metamorphic Relations categorizadas em três níveis de perturbação:

| Nível | Categoria | Exemplo de MR |
|-------|-----------|---------------|
| **Token** | Renomeação | Variáveis renomeadas preservam comportamento |
| **Statement** | Reordenação | Statements independentes podem ser reordenados |
| **Block** | Refatoração | Extração de método preserva semântica |

```python
# Exemplo: MR de renomeação de variáveis (nível token)
def test_variable_renaming():
    code_original = """
    def calc(x, y):
        return x + y
    """
    
    code_renamed = """
    def calc(a, b):
        return a + b
    """
    
    # Ambos devem produzir o mesmo resultado
    assert execute(code_original, 2, 3) == execute(code_renamed, 2, 3)
```

### Detecção de Alucinações com MT

O framework **SQLHD** [arXiv:2512.22250, 2025] utiliza MT de dois estágios para detectar alucinações em geração de SQL:

**Estágio 1: Schema-Linking Hallucination Detection**
- 8 MRs structure-aware (ex: mudança de palavras comparativas)
- Verifica mapeamento entre pergunta e schema do banco

**Estágio 2: Logical-Synthesis Hallucination Detection**
- 9 MRs logic-aware
- Verifica consistência lógica da query gerada

```python
# Exemplo de MR para SQL
# MR: Adicionar condição redundante não muda resultado
def test_sql_redundant_condition():
    query1 = "SELECT * FROM users WHERE age > 18"
    query2 = "SELECT * FROM users WHERE age > 18 AND 1=1"
    
    result1 = execute_query(query1)
    result2 = execute_query(query2)
    assert result1 == result2
```

## Property-Based Testing em Escala

### Conceito e Fundamentos

Property-Based Testing (PBT) verifica que o codigo satisfaz propriedades gerais para uma ampla gama de entradas geradas aleatoriamente. Diferente de testes unitarios com valores especificos, PBT explora o espaco de entrada sistematicamente.

**Vantagens para Codigo de IA:**
- Encontra edge cases que desenvolvedores não consideram
- Verifica propriedades invariantes independentemente da implementação
- Pode revelar edge cases que suites de testes baseadas apenas em exemplos nao cobrem (hipotese operacional; depende de propriedades bem definidas e geradores adequados)

### Implementação com Hypothesis

```python
from hypothesis import given, strategies as st

# Exemplo: Propriedades de ordenação
@given(st.lists(st.integers()))
def test_sort_properties(lst):
    result = generated_sort(lst)
    
    # Propriedade 1: Tamanho preservado
    assert len(result) == len(lst)
    
    # Propriedade 2: Elementos preservados
    assert sorted(result) == sorted(lst)
    
    # Propriedade 3: Ordenado
    assert all(result[i] <= result[i+1] for i in range(len(result)-1))

# Exemplo: Propriedades de parser
@given(st.text())
def test_parser_properties(text):
    parsed = generated_parser.parse(text)
    
    # Propriedade: Round-trip
    if parsed is not None:
        serialized = generated_parser.serialize(parsed)
        reparsed = generated_parser.parse(serialized)
        assert parsed == reparsed
```

### Estudo de Caso: PBT em Código LLM

Pesquisa recente [ACM, 2025] aplicou PBT para avaliar código gerado por StarCoder e CodeLlama:

**Resultados:**
- 30-32% das soluções aderem apenas parcialmente às propriedades de correção
- 18-23% falham completamente nas propriedades
- 9-13% das restrições/propriedades estão ausentes na extração

**Conclusão**: Testes baseados em unidade frequentemente superestimam a correção de soluções geradas por LLMs.

### Estratégias de Shrinking

Quando uma propriedade falha, PBT tenta "encolher" o exemplo para o mínimo caso reprodutível:

```python
from hypothesis import given, strategies as st, settings

@given(st.lists(st.integers(), min_size=1))
@settings(max_examples=1000)
def test_average_properties(numbers):
    avg = generated_average(numbers)
    
    # Propriedade: Média está entre min e max
    assert min(numbers) <= avg <= max(numbers)
    
    # Propriedade: Média de lista constante é o próprio valor
    if len(set(numbers)) == 1:
        assert avg == numbers[0]
```

## Differential Testing entre Múltiplos Modelos

### Conceito

Differential Testing compara saídas de múltiplos modelos LLM para a mesma entrada. Divergências indicam potenciais bugs ou comportamentos inconsistentes.

**Princípio:**
```
Entrada: X
Modelo A: f_A(X) → Y_A
Modelo B: f_B(X) → Y_B
Modelo C: f_C(X) → Y_C

Se Y_A ≠ Y_B ≠ Y_C → Investigar divergência
```

### Implementação

```python
from typing import List, Callable, Any
import difflib

class DifferentialTester:
    def __init__(self, models: List[Callable]):
        self.models = models
    
    def test_consensus(self, prompt: str, threshold: float = 0.8):
        """Verifica consenso entre múltiplos modelos"""
        outputs = [model.generate(prompt) for model in self.models]
        
        # Comparar todos os pares
        agreements = []
        for i in range(len(outputs)):
            for j in range(i+1, len(outputs)):
                similarity = self._calculate_similarity(outputs[i], outputs[j])
                agreements.append(similarity)
        
        avg_agreement = sum(agreements) / len(agreements)
        
        if avg_agreement < threshold:
            return {
                'consensus': False,
                'agreement_score': avg_agreement,
                'divergent_outputs': outputs,
                'recommendation': 'Revisão humana necessária'
            }
        
        return {
            'consensus': True,
            'agreement_score': avg_agreement,
            'selected_output': self._select_by_majority(outputs)
        }
    
    def _calculate_similarity(self, a: str, b: str) -> float:
        return difflib.SequenceMatcher(None, a, b).ratio()
```

### Voting Mechanisms

**1. Majority Voting**
```python
def majority_vote(outputs: List[str]) -> str:
    from collections import Counter
    return Counter(outputs).most_common(1)[0][0]
```

**2. Weighted Voting por Performance Histórica**
```python
def weighted_vote(outputs: List[str], model_weights: dict) -> str:
    """Votação ponderada baseada em performance histórica"""
    votes = {}
    for i, output in enumerate(outputs):
        model_id = f"model_{i}"
        weight = model_weights.get(model_id, 1.0)
        votes[output] = votes.get(output, 0) + weight
    
    return max(votes, key=votes.get)
```

**3. Consensus com Tolerância**
```python
def consensus_with_tolerance(outputs: List[str], tolerance: float = 0.9):
    """Aceita consenso se similaridade > tolerance"""
    from difflib import SequenceMatcher
    
    base = outputs[0]
    for output in outputs[1:]:
        if SequenceMatcher(None, base, output).ratio() < tolerance:
            return None  # Sem consenso
    
    return base
```

### Aplicação em Cenários Reais

**Cenário: Geração de Funções de Parsing**
```python
models = [gpt4, claude, codellama]
tester = DifferentialTester(models)

prompt = "Implemente um parser para CSV que lide com aspas"
result = tester.test_consensus(prompt, threshold=0.85)

if not result['consensus']:
    print("⚠️  Divergência detectada entre modelos")
    for i, output in enumerate(result['divergent_outputs']):
        print(f"Modelo {i+1}:\n{output}\n")
```

## Symbolic Execution Híbrida

### Conceito

Symbolic Execution Híbrida combina análise formal (symbolic execution) com IA para verificar propriedades de código gerado. A IA gera código; a análise formal verifica propriedades críticas.

**Arquitetura:**
```
Especificação → LLM → Código → Symbolic Execution → Verificação de Propriedades
                     ↓
              [Invariantes Violadas] → Feedback → Regeneração
```

### Implementação com Angr/KLEE

```python
import angr

def verify_with_symbolic_execution(code: str, properties: List[str]):
    """Verifica propriedades via symbolic execution"""
    
    # Compilar código
    binary_path = compile_code(code)
    
    # Criar projeto Angr
    proj = angr.Project(binary_path, auto_load_libs=False)
    
    # Definir estado inicial
    state = proj.factory.entry_state()
    
    # Criar simulação
    simgr = proj.factory.simulation_manager(state)
    
    # Explorar estados
    simgr.explore()
    
    # Verificar propriedades em cada estado
    violations = []
    for state in simgr.deadended:
        for prop in properties:
            if not check_property(state, prop):
                violations.append({
                    'property': prop,
                    'input': state.solver.eval(state.posix.stdin, cast_to=bytes)
                })
    
    return violations
```

### Caso de Uso: Verificação de Segurança

```python
def verify_no_buffer_overflow(code: str):
    """Verifica ausência de buffer overflow via SE"""
    
    violations = verify_with_symbolic_execution(
        code,
        properties=['no_buffer_overflow', 'no_integer_overflow']
    )
    
    if violations:
        print(f"⚠️  {len(violations)} violações de segurança detectadas")
        for v in violations:
            print(f"  - {v['property']} com input: {v['input']}")
        return False
    
    return True
```

## Fuzzing Direcionado por Semântica

### Evolução do Fuzzing

Fuzzing tradicional gera inputs aleatórios. Fuzzing direcionado por semântica (ou LLM-assisted fuzzing) utiliza LLMs para gerar inputs semanticamente válidos que exploram caminhos específicos do código [arXiv:2503.07654, 2025].

**Comparação:**

| Aspecto | Fuzzing Tradicional | Fuzzing com LLM |
|---------|-------------------|-----------------|
| Geração de input | Aleatória/mutacional | Semântica/consciente |
| Cobertura | Lenta inicialmente | Rápida com inputs válidos |
| Complexidade | Baixa | Alta |
| Custo | Baixo | Moderado (chamadas LLM) |

### Implementação

```python
class LLMFuzzer:
    def __init__(self, llm_client, target_function):
        self.llm = llm_client
        self.target = target_function
        self.corpus = []
    
    def generate_semantic_input(self, context: str) -> str:
        """Gera input semanticamente válido via LLM"""
        prompt = f"""
        Gere um input válido para testar a função: {self.target.__name__}
        Contexto: {context}
        
        O input deve ser:
        1. Sintaticamente válido
        2. Cobrir casos edge
        3. Explorar caminhos diferentes dos inputs anteriores
        
        Inputs anteriores: {self.corpus[-5:]}
        
        Novo input:"""
        
        return self.llm.generate(prompt)
    
    def fuzz(self, iterations: int = 100):
        """Executa fuzzing direcionado"""
        for i in range(iterations):
            # Gerar input semântico
            input_data = self.generate_semantic_input(
                context=f"Iteration {i}, coverage: {self.get_coverage()}"
            )
            
            # Executar e monitorar
            try:
                result = self.target(input_data)
                self.corpus.append(input_data)
                
                # Verificar novos caminhos
                if self.has_new_coverage():
                    self.save_interesting_input(input_data)
                    
            except Exception as e:
                self.report_crash(input_data, e)
```

### Fuzzing para APIs

```python
def fuzz_api_endpoint(endpoint_spec: dict):
    """Fuzzing semântico para endpoints de API"""
    
    llm = LLMClient()
    
    prompt = f"""
    Gere requisições HTTP para testar:
    Endpoint: {endpoint_spec['path']}
    Método: {endpoint_spec['method']}
    Schema: {endpoint_spec['schema']}
    
    Inclua:
    1. Requisições válidas
    2. Requisições com campos faltantes
    3. Requisições com tipos incorretos
    4. Requisições com valores extremos
    5. Requisições potencialmente maliciosas
    """
    
    test_cases = llm.generate_json(prompt, n=50)
    
    for test in test_cases:
        response = requests.request(
            method=test['method'],
            url=test['url'],
            json=test.get('body'),
            headers=test.get('headers')
        )
        
        # Verificar comportamento esperado
        validate_response(response, test['expected_behavior'])
```

## Integração das Técnicas

### Pipeline Combinado

```python
class ComprehensiveTester:
    def __init__(self, llm_client):
        self.llm = llm_client
        self.test_results = {}
    
    def test_generated_code(self, spec: str, code: str):
        """Pipeline completo de teste"""
        
        # 1. Metamorphic Testing
        mt_results = self.run_metamorphic_tests(code)
        
        # 2. Property-Based Testing
        pbt_results = self.run_property_tests(code)
        
        # 3. Differential Testing
        dt_results = self.run_differential_test(spec)
        
        # 4. Symbolic Execution (para código crítico)
        se_results = self.run_symbolic_execution(code)
        
        # 5. Fuzzing
        fuzz_results = self.run_semantic_fuzzing(code)
        
        return {
            'metamorphic': mt_results,
            'property_based': pbt_results,
            'differential': dt_results,
            'symbolic': se_results,
            'fuzzing': fuzz_results,
            'overall_confidence': self.calculate_confidence([
                mt_results, pbt_results, dt_results, se_results, fuzz_results
            ])
        }
```

### Matriz de Aplicação

| Técnica | Quando Usar | Custo | Eficácia |
|---------|-------------|-------|----------|
| **Metamorphic Testing** | Especificações incompletas, oráculos imperfeitos | Médio | Alta |
| **Property-Based Testing** | Propriedades bem definidas, edge cases | Médio | Muito Alta |
| **Differential Testing** | Múltiplos modelos disponíveis, consenso necessário | Alto | Alta |
| **Symbolic Execution** | Código crítico, propriedades de segurança | Alto | Muito Alta |
| **Semantic Fuzzing** | Descoberta de vulnerabilidades, stress testing | Alto | Alta |

## Practical Considerations

### Aplicações Reais

**1. CI/CD Integration**
```yaml
# .github/workflows/llm-code-testing.yml
name: LLM Code Testing
on: [pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Metamorphic Tests
        run: pytest tests/metamorphic/ --tb=short
      
      - name: Property-Based Tests
        run: pytest tests/properties/ --hypothesis-seed=42
      
      - name: Differential Testing
        run: python scripts/differential_test.py --models gpt4,claude,codellama
      
      - name: Fuzzing (10 min)
        run: python scripts/fuzz.py --duration 600 --coverage-target 80
```

**2. Orquestração de Testes**
```python
# Decisão adaptativa de estratégia
def select_testing_strategy(code_complexity: float, risk_level: str):
    """Seleciona estratégia baseada em características do código"""
    
    if risk_level == 'critical':
        return ['metamorphic', 'property_based', 'symbolic', 'fuzzing']
    elif code_complexity > 0.7:
        return ['metamorphic', 'property_based', 'differential']
    else:
        return ['property_based', 'metamorphic']
```

### Limitações

1. **Custo computacional**: Múltiplas técnicas = múltiplos custos
2. **Falsos positivos**: MT e PBT podem reportar violações de propriedades que não são bugs reais
3. **Complexidade de setup**: Requer expertise para configurar MRs e propriedades
4. **Cobertura limitada**: Nenhuma técnica garante detecção de todas as falhas

### Melhores Práticas

1. **Comece com PBT**: Boa relação custo-benefício inicial
2. **Adicione MT para oráculos fracos**: Quando especificações são incompletas
3. **Use Differential Testing para decisões críticas**: Consenso entre modelos
4. **Reserve SE e Fuzzing para código de alta criticidade**: Custo elevado
5. **Monitore e itere**: Use falhas para melhorar propriedades e MRs

### Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Media |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary

- **Metamorphic Testing** resolve o problema do oráculo verificando relações entre entradas/saídas, essencial quando especificações são incompletas
- **Property-Based Testing** encontra edge cases através de geração sistemática de inputs, detectando 3x mais bugs que testes tradicionais
- **Differential Testing** utiliza múltiplos modelos para identificar divergências e estabelecer consenso
- **Symbolic Execution Híbrida** combina geração por IA com verificação formal para propriedades críticas
- **Fuzzing Direcionado por Semântica** acelera descoberta de vulnerabilidades gerando inputs semanticamente válidos

## References

1. Segura, S. et al. "Metamorphic Relations for Testing Machine Learning: A Systematic Mapping Study." arXiv:2412.17616, 2024.

2. Zhang, Y. et al. "Exploring and Lifting the Robustness of LLM-powered Automated Program Repair with Metamorphic Testing." arXiv:2410.07516, 2024.

3. "Hallucination Detection for LLM-based Text-to-SQL Generation via Two-Stage Metamorphic Testing." arXiv:2512.22250, 2025.

4. "Progress in Property-Based Testing: Research and Tools." TPTP Proceedings, 2025. https://www.tptp.org/TPTP/Proceedings/2025/ProgressInPropertyBasedTesting.pdf

5. "From Prompts to Properties: Rethinking LLM Code Generation with Property-Based Testing." ACM, 2025. https://dl.acm.org/doi/10.1145/3696630.3728702

6. "Large Language Model-assisted Fuzzing." arXiv:2503.07654, 2025.

7. Bunel, R. et al. "Formal Verification of Machine Learning Models: A Survey." arXiv:2403.15678, 2024.

8. "Neural Symbolic Execution: Understanding and Testing Neural Networks." arXiv:2405.18912, 2024.

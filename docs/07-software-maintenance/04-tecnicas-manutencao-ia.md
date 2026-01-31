# 7.4 Técnicas de Manutenção de Código de IA

## Overview

As técnicas de manutenção para código gerado por IA requerem abordagens especializadas que vão além das técnicas tradicionais de refatoração e debugging. **A manutenção de código opaco exige técnicas de compreensão, caracterização e validação que permitem modificar sistemas sem compreensão completa do raciocínio original**.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Aplicar técnicas de caracterização de comportamento em código de IA
2. Implementar refactoring seguro em código gerado automaticamente
3. Utilizar testes de propriedade para validar mudanças
4. Empregar análise de impacto em sistemas opacos

## Técnicas de Compreensão

### 1. Análise de Dependências

```python
class DependencyAnalyzer:
    """
    Analisa dependências em código opaco
    """
    
    def analyze(self, codebase):
        """
        Análise completa de dependências
        """
        graph = DependencyGraph()
        
        for module in codebase.modules:
            # Imports
            imports = self.extract_imports(module)
            for imp in imports:
                graph.add_edge(module, imp, type='import')
            
            # Chamadas de função
            calls = self.extract_function_calls(module)
            for call in calls:
                graph.add_edge(module, call.module, 
                             type='call', 
                             function=call.name)
            
            # Uso de dados
            data_deps = self.extract_data_dependencies(module)
            for dep in data_deps:
                graph.add_edge(module, dep.source,
                             type='data',
                             field=dep.field)
        
        return graph
    
    def find_impact_scope(self, graph, changed_module):
        """
        Encontra escopo de impacto de mudança
        """
        # Diretamente afetados
        direct = graph.get_dependents(changed_module)
        
        # Indiretamente afetados (transitivos)
        indirect = set()
        for dep in direct:
            indirect.update(graph.get_dependents(dep))
        
        return ImpactScope(
            direct=sorted(direct),
            indirect=sorted(indirect),
            total=len(direct) + len(indirect)
        )
```

### 2. Testes de Caracterização

```python
class CharacterizationTestGenerator:
    """
    Gera testes que caracterizam comportamento atual
    """
    
    def generate(self, function, num_samples=1000):
        """
        Gera testes de caracterização
        """
        test_cases = []
        
        # Gerar inputs variados
        inputs = self.generate_diverse_inputs(function, num_samples)
        
        for inp in inputs:
            try:
                output = function(**inp)
                
                test_cases.append({
                    'input': inp,
                    'expected': output,
                    'type': 'success'
                })
            except Exception as e:
                test_cases.append({
                    'input': inp,
                    'expected_exception': type(e).__name__,
                    'type': 'exception'
                })
        
        # Agrupar por comportamento similar
        clusters = self.cluster_by_behavior(test_cases)
        
        # Selecionar representantes
        representative_tests = self.select_representatives(clusters)
        
        return TestSuite(
            tests=representative_tests,
            coverage=self.calculate_coverage(test_cases),
            edge_cases=self.identify_edge_cases(test_cases)
        )
```

## Técnicas de Refatoração

### Refactoring Seguro

```python
class SafeRefactoring:
    """
    Refatoração com garantias de preservação de comportamento
    """
    
    def __init__(self):
        self.test_runner = TestRunner()
        self.behavior_preserver = BehaviorPreserver()
        
    def extract_method(self, code, function_name, start_line, end_line):
        """
        Extrai método de forma segura
        """
        # 1. Capturar comportamento atual
        original_behavior = self.capture_behavior(code)
        
        # 2. Aplicar refatoração
        refactored_code = self.apply_extraction(
            code, function_name, start_line, end_line
        )
        
        # 3. Verificar preservação
        new_behavior = self.capture_behavior(refactored_code)
        
        if not self.behavior_equivalent(original_behavior, new_behavior):
            raise RefactoringError(
                "Comportamento alterado pela refatoração"
            )
        
        # 4. Executar testes
        test_result = self.test_runner.run_all_tests(refactored_code)
        
        if not test_result.all_passed:
            raise RefactoringError(
                f"Testes falharam: {test_result.failures}"
            )
        
        return refactored_code
    
    def capture_behavior(self, code):
        """
        Captura assinatura comportamental do código
        """
        behavior = BehaviorSignature()
        
        # Executar com inputs característicos
        for test_input in self.get_characteristic_inputs():
            try:
                result = self.execute_code(code, test_input)
                behavior.add_observation(test_input, result)
            except Exception as e:
                behavior.add_exception(test_input, e)
        
        return behavior
```

## Técnicas de Validação

### Testes de Propriedade

```python
class PropertyBasedTesting:
    """
    Testes baseados em propriedades para código de IA
    """
    
    def test_properties(self, function, properties):
        """
        Testa propriedades da função
        """
        results = []
        
        for property_name, property_check in properties.items():
            # Gerar 1000 casos de teste aleatórios
            for _ in range(1000):
                input_data = self.generate_random_input()
                
                try:
                    result = function(input_data)
                    
                    if not property_check(input_data, result):
                        results.append(PropertyViolation(
                            property=property_name,
                            input=input_data,
                            output=result
                        ))
                        break
                        
                except Exception as e:
                    # Propriedade violada por exceção
                    results.append(PropertyViolation(
                        property=property_name,
                        input=input_data,
                        exception=e
                    ))
        
        return PropertyTestResult(
            violations=results,
            passed=len(results) == 0
        )


# Exemplo de propriedades para função de ordenação
sorting_properties = {
    'idempotence': lambda inp, out: sorted(out) == out,
    'length_preservation': lambda inp, out: len(out) == len(inp),
    'permutation': lambda inp, out: sorted(out) == sorted(inp),
    'ordering': lambda inp, out: all(out[i] <= out[i+1] 
                                     for i in range(len(out)-1))
}
```

### Validação de Equivalência

```python
class EquivalenceValidator:
    """
    Valida equivalência entre versões de código
    """
    
    def validate_equivalence(self, original, modified, test_suite):
        """
        Valida que modificação preserva equivalência
        """
        differences = []
        
        for test_case in test_suite:
            try:
                original_result = self.execute(original, test_case)
                modified_result = self.execute(modified, test_case)
                
                if not self.results_equivalent(
                    original_result, 
                    modified_result
                ):
                    differences.append(EquivalenceDifference(
                        test_case=test_case,
                        original=original_result,
                        modified=modified_result
                    ))
                    
            except Exception as e:
                differences.append(EquivalenceDifference(
                    test_case=test_case,
                    error=str(e)
                ))
        
        return EquivalenceValidationResult(
            equivalent=len(differences) == 0,
            differences=differences,
            confidence=len(test_suite) / (len(differences) + 1)
        )
```

## Técnicas de Análise de Impacto

### Análise Estática de Impacto

```python
class StaticImpactAnalyzer:
    """
    Análise estática de impacto de mudanças
    """
    
    def analyze_change_impact(self, codebase, change_diff):
        """
        Analisa impacto de mudança proposta
        """
        impact = ChangeImpact()
        
        # 1. Identificar elementos modificados
        modified_elements = self.parse_diff(change_diff)
        
        for element in modified_elements:
            # 2. Encontrar dependências
            dependencies = self.find_dependencies(codebase, element)
            
            # 3. Analisar tipo de mudança
            change_type = self.classify_change(element)
            
            # 4. Avaliar risco
            risk = self.assess_risk(element, dependencies, change_type)
            
            impact.add_impact(
                element=element,
                affected_components=dependencies,
                change_type=change_type,
                risk_level=risk
            )
        
        # 5. Gerar recomendações
        impact.recommendations = self.generate_recommendations(impact)
        
        return impact
```

## Summary

- **Compreensão ativa:** Técnicas proativas para entender código opaco
- **Caracterização:** Testes que capturam comportamento atual como baseline
- **Refatoração segura:** Mudanças com garantias de preservação
- **Propriedades:** Testar invariantes ao invés de casos específicos
- **Impacto:** Análise estática para prever efeitos de mudanças

## References

1. Feathers, M. C. (2004). *Working Effectively with Legacy Code*. Prentice Hall.

2. Fowler, M. (1999). *Refactoring: Improving the Design of Existing Code*. Addison-Wesley.

3. Claessen, K., & Hughes, J. (2000). QuickCheck: A Lightweight Tool for Random Testing of Haskell Programs. *ICFP 2000*.

4. Arnold, R. S. (1996). *Software Change Impact Analysis*. IEEE Computer Society Press.

---
title: "Testes Estatisticos para Sistemas Nao-Deterministicos"
created_at: "2025-01-31"
tags: ["software-testing", "testes-estatisticos", "sistemas-nao-deterministicos", "consistencia", "robustez", "validacao"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5.3 Testes Estatísticos para Sistemas Não-Determinísticos

## Overview

Sistemas que incorporam componentes de IA são intrinsecamente não-determinísticos — a mesma entrada pode produzir saídas diferentes em execuções distintas. Esta seção apresenta metodologias estatísticas para validar comportamento, consistência e robustez de tais sistemas, indo além dos testes binários pass/fail tradicionais.

O foco está em técnicas que quantificam a **confiabilidade estatística** do sistema, estabelecendo limites de confiança e tolerâncias para variações aceitáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Validar** consistência em múltiplas execuções independentes
2. **Aplicar** testes de estabilidade e robustez estatística
3. **Avaliar** distribuição de comportamentos do sistema
4. **Definir** tolerâncias a variações aceitáveis
5. **Executar** testes de stress para componentes de IA

## Fundamentos de Testes Estatísticos

### O Problema do Não-Determinismo

Em sistemas tradicionais [SWEBOK v4, Seção 1.2.14]:
```
Input X → Sistema → Output Y (sempre o mesmo)
```

Em sistemas com IA:
```
Input X → LLM/IA → Output Y₁, Y₂, Y₃, ... (distribuição de possíveis saídas)
```

**Implicações:**
- Não é possível afirmar "o sistema sempre retorna Y"
- Devemos afirmar "o sistema retorna Y com probabilidade p ± ε"
- Testes devem ser **repetidos** e **analisados estatisticamente**

### Framework de Validação Estatística

```
N execuções independentes → Distribuição de comportamentos
↓
Análise estatística (média, variância, outliers)
↓
Comparação com baseline ou tolerância definida
↓
Decisão: PASS / FAIL / INVESTIGATE
```

### Conceitos Estatísticos Fundamentais

**1. Distribuição Amostral**
```python
import numpy as np
from scipy import stats

def analyze_distribution(outputs: list) -> dict:
    """Analisa distribuição de múltiplas execuções"""
    return {
        'mean': np.mean(outputs),
        'std': np.std(outputs),
        'variance': np.var(outputs),
        'median': np.median(outputs),
        'min': np.min(outputs),
        'max': np.max(outputs),
        'coefficient_of_variation': np.std(outputs) / np.mean(outputs)
    }
```

**2. Intervalo de Confiança**
```python
def confidence_interval(data: list, confidence: float = 0.95) -> tuple:
    """Calcula intervalo de confiança para a média"""
    n = len(data)
    mean = np.mean(data)
    std_err = stats.sem(data)
    margin = std_err * stats.t.ppf((1 + confidence) / 2, n - 1)
    return (mean - margin, mean + margin)
```

**3. Teste de Hipótese**
```python
def hypothesis_test(sample1, sample2, alpha=0.05):
    """Testa se duas amostras vêm da mesma distribuição"""
    statistic, p_value = stats.mannwhitneyu(sample1, sample2)
    return {
        'same_distribution': p_value > alpha,
        'p_value': p_value,
        'statistic': statistic
    }
```

## Validação de Consistência

### Coeficiente de Variação

O coeficiente de variação (CV) mede a variabilidade relativa:

```python
def coefficient_of_variation(outputs: list) -> float:
    """
    CV = σ / μ
    
    Interpretação:
    - CV < 0.05: Excelente consistência
    - CV 0.05-0.10: Boa consistência
    - CV 0.10-0.20: Consistência moderada
    - CV > 0.20: Baixa consistência (investigar)
    """
    return np.std(outputs) / np.mean(outputs)
```

### Taxa de Convergência

Mede quão rapidamente o sistema converge para respostas similares:

```python
class ConvergenceAnalyzer:
    def __init__(self, target_cv: float = 0.05):
        self.target_cv = target_cv
    
    def analyze_convergence(self, prompt: str, max_executions: int = 100) -> dict:
        """Analisa convergência do sistema"""
        outputs = []
        cv_history = []
        
        for i in range(max_executions):
            output = self.execute(prompt)
            outputs.append(output)
            
            if i >= 10:  # Mínimo para cálculo significativo
                cv = coefficient_of_variation(outputs)
                cv_history.append((i+1, cv))
                
                if cv <= self.target_cv:
                    return {
                        'converged': True,
                        'executions_needed': i + 1,
                        'final_cv': cv,
                        'cv_history': cv_history
                    }
        
        return {
            'converged': False,
            'executions_needed': max_executions,
            'final_cv': coefficient_of_variation(outputs),
            'cv_history': cv_history
        }
```

### Estabilidade Temporal

Verifica se o comportamento permanece consistente ao longo do tempo:

```python
class TemporalStabilityTester:
    def __init__(self, check_intervals: list):
        self.intervals = check_intervals  # e.g., [1h, 4h, 24h, 7d]
    
    def test_temporal_stability(self, prompt: str, n_samples: int = 30):
        """Testa estabilidade em múltiplos momentos"""
        results = {}
        
        for interval in self.intervals:
            time.sleep(self.parse_interval(interval))
            
            outputs = [self.execute(prompt) for _ in range(n_samples)]
            results[interval] = {
                'mean': np.mean(outputs),
                'std': np.std(outputs),
                'cv': coefficient_of_variation(outputs)
            }
        
        # Analisar drift
        baseline = results[self.intervals[0]]
        for interval in self.intervals[1:]:
            current = results[interval]
            drift = abs(current['mean'] - baseline['mean']) / baseline['mean']
            
            if drift > 0.05:  # 5% drift threshold
                print(f"⚠️  Drift detectado em {interval}: {drift:.2%}")
        
        return results
```

## Testes de Robustez

### Perturbação Controlada de Inputs

Testa se pequenas variações no input produzem variações aceitáveis no output:

```python
class RobustnessTester:
    def __init__(self, perturbation_levels: list = [0.01, 0.05, 0.10]):
        self.perturbation_levels = perturbation_levels
    
    def test_input_robustness(self, base_input: str, n_variations: int = 10):
        """Testa robustez a perturbações de input"""
        base_output = self.execute(base_input)
        results = {}
        
        for level in self.perturbation_levels:
            variations = self.generate_perturbations(base_input, level, n_variations)
            outputs = [self.execute(v) for v in variations]
            
            # Calcular similaridade com output base
            similarities = [self.similarity(base_output, o) for o in outputs]
            
            results[level] = {
                'mean_similarity': np.mean(similarities),
                'min_similarity': np.min(similarities),
                'std_similarity': np.std(similarities),
                'robust': np.mean(similarities) > 0.90
            }
        
        return results
    
    def generate_perturbations(self, input_str: str, level: float, n: int):
        """Gera variações do input"""
        perturbations = []
        words = input_str.split()
        
        for _ in range(n):
            # Adicionar/remover/modificar palavras aleatoriamente
            perturbed = words.copy()
            n_changes = int(len(words) * level)
            
            for _ in range(n_changes):
                action = random.choice(['add', 'remove', 'replace'])
                idx = random.randint(0, len(perturbed))
                
                if action == 'add':
                    perturbed.insert(idx, random.choice(self.synonyms))
                elif action == 'remove' and len(perturbed) > 1:
                    perturbed.pop(min(idx, len(perturbed)-1))
                elif action == 'replace':
                    perturbed[idx % len(perturbed)] = random.choice(self.synonyms)
            
            perturbations.append(' '.join(perturbed))
        
        return perturbations
```

### Teste de Stress para Componentes de IA

Avalia comportamento sob carga extrema:

```python
class StressTester:
    def __init__(self, llm_client):
        self.llm = llm_client
    
    def stress_test(self, prompts: list, concurrency_levels: list, duration: int = 60):
        """
        Testa comportamento sob diferentes níveis de concorrência
        
        Args:
            prompts: Lista de prompts para teste
            concurrency_levels: [1, 5, 10, 20, 50] requisições simultâneas
            duration: Duração do teste em segundos
        """
        results = {}
        
        for concurrency in concurrency_levels:
            print(f"Testing with concurrency: {concurrency}")
            
            start_time = time.time()
            outputs = []
            latencies = []
            errors = []
            
            with ThreadPoolExecutor(max_workers=concurrency) as executor:
                futures = []
                
                while time.time() - start_time < duration:
                    for prompt in prompts:
                        future = executor.submit(self.timed_execute, prompt)
                        futures.append(future)
                    
                    # Aguardar batch
                    for future in futures[-concurrency:]:
                        try:
                            output, latency = future.result(timeout=30)
                            outputs.append(output)
                            latencies.append(latency)
                        except Exception as e:
                            errors.append(str(e))
            
            results[concurrency] = {
                'total_requests': len(outputs) + len(errors),
                'success_rate': len(outputs) / (len(outputs) + len(errors)),
                'mean_latency': np.mean(latencies),
                'p95_latency': np.percentile(latencies, 95),
                'p99_latency': np.percentile(latencies, 99),
                'error_rate': len(errors) / (len(outputs) + len(errors)),
                'output_consistency': self.calculate_consistency(outputs)
            }
        
        return results
    
    def calculate_consistency(self, outputs: list) -> float:
        """Calcula consistência dos outputs sob stress"""
        if len(outputs) < 2:
            return 1.0
        
        # Agrupar outputs similares
        groups = []
        for output in outputs:
            found = False
            for group in groups:
                if self.similarity(output, group[0]) > 0.9:
                    group.append(output)
                    found = True
                    break
            if not found:
                groups.append([output])
        
        # Maior grupo / total
        largest_group = max(len(g) for g in groups)
        return largest_group / len(outputs)
```

## Análise de Distribuição de Comportamentos

### Detecção de Outliers

Identifica execuções anômalas que podem indicar bugs ou alucinações:

```python
class OutlierDetector:
    def __init__(self, method: str = 'iqr'):
        self.method = method  # 'iqr', 'zscore', 'isolation_forest'
    
    def detect_outliers(self, outputs: list, features: callable = None) -> list:
        """Detecta outliers em múltiplas execuções"""
        
        if features is None:
            # Extrair features padrão
            features = [len(str(o)) for o in outputs]
        else:
            features = [features(o) for o in outputs]
        
        if self.method == 'iqr':
            return self._iqr_outliers(outputs, features)
        elif self.method == 'zscore':
            return self._zscore_outliers(outputs, features)
        
        return []
    
    def _iqr_outliers(self, outputs, features):
        """Método do Intervalo Interquartil"""
        q1 = np.percentile(features, 25)
        q3 = np.percentile(features, 75)
        iqr = q3 - q1
        
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        outliers = []
        for i, (output, feature) in enumerate(zip(outputs, features)):
            if feature < lower_bound or feature > upper_bound:
                outliers.append({
                    'index': i,
                    'output': output,
                    'feature_value': feature,
                    'deviation': 'low' if feature < lower_bound else 'high'
                })
        
        return outliers
    
    def _zscore_outliers(self, outputs, features, threshold=3):
        """Método Z-Score"""
        mean = np.mean(features)
        std = np.std(features)
        
        outliers = []
        for i, (output, feature) in enumerate(zip(outputs, features)):
            zscore = abs((feature - mean) / std)
            if zscore > threshold:
                outliers.append({
                    'index': i,
                    'output': output,
                    'zscore': zscore
                })
        
        return outliers
```

### Análise de Moda e Multimodalidade

Verifica se o sistema produz múltiplos tipos de respostas distintas:

```python
class MultimodalityAnalyzer:
    def analyze_multimodality(self, outputs: list, similarity_threshold: float = 0.8):
        """Analisa se há múltiplos modos de resposta"""
        
        # Clustering baseado em similaridade
        clusters = []
        for output in outputs:
            assigned = False
            for cluster in clusters:
                if self.similarity(output, cluster['centroid']) > similarity_threshold:
                    cluster['members'].append(output)
                    cluster['centroid'] = self.update_centroid(cluster['members'])
                    assigned = True
                    break
            
            if not assigned:
                clusters.append({
                    'centroid': output,
                    'members': [output]
                })
        
        # Análise de resultados
        total = len(outputs)
        cluster_sizes = [len(c['members']) for c in clusters]
        
        return {
            'n_clusters': len(clusters),
            'cluster_sizes': cluster_sizes,
            'cluster_proportions': [s/total for s in cluster_sizes],
            'dominant_cluster': max(cluster_sizes) / total,
            'is_multimodal': len(clusters) > 1 and min(cluster_sizes) / total > 0.1,
            'entropy': stats.entropy(cluster_sizes)
        }
```

## Tolerância a Variações Aceitáveis

### Definição de Thresholds

Estabelece limites aceitáveis para variação:

```python
class ToleranceDefinition:
    """Define tolerâncias aceitáveis para diferentes métricas"""
    
    DEFAULT_THRESHOLDS = {
        'coefficient_of_variation': 0.10,  # 10%
        'max_deviation_from_mean': 0.20,   # 20%
        'outlier_rate': 0.05,              # 5%
        'temporal_drift': 0.05,            # 5%
        'minimum_success_rate': 0.95       # 95%
    }
    
    def __init__(self, thresholds: dict = None):
        self.thresholds = thresholds or self.DEFAULT_THRESHOLDS
    
    def check_tolerances(self, metrics: dict) -> dict:
        """Verifica se métricas estão dentro das tolerâncias"""
        results = {}
        
        for metric, value in metrics.items():
            if metric in self.thresholds:
                threshold = self.thresholds[metric]
                within_tolerance = value <= threshold
                
                results[metric] = {
                    'value': value,
                    'threshold': threshold,
                    'within_tolerance': within_tolerance,
                    'deviation': (value - threshold) / threshold if threshold > 0 else 0
                }
        
        return results
```

### Classificação de Resultados

```python
def classify_result(statistical_analysis: dict, tolerances: dict) -> str:
    """Classifica resultado baseado em análise estatística"""
    
    checks = [
        statistical_analysis['cv'] <= tolerances['cv'],
        statistical_analysis['outlier_rate'] <= tolerances['outlier_rate'],
        statistical_analysis['success_rate'] >= tolerances['success_rate']
    ]
    
    if all(checks):
        return 'PASS'
    elif sum(checks) >= len(checks) / 2:
        return 'INVESTIGATE'
    else:
        return 'FAIL'
```

## Framework Integrado de Validação Estatística

### Pipeline Completo

```python
class StatisticalValidationFramework:
    def __init__(self, config: dict):
        self.config = config
        self.convergence_analyzer = ConvergenceAnalyzer(
            target_cv=config.get('target_cv', 0.05)
        )
        self.robustness_tester = RobustnessTester(
            perturbation_levels=config.get('perturbation_levels', [0.01, 0.05, 0.10])
        )
        self.outlier_detector = OutlierDetector(method='iqr')
        self.tolerance_def = ToleranceDefinition(config.get('thresholds'))
    
    def validate(self, prompt: str, n_executions: int = 100) -> dict:
        """Executa validação estatística completa"""
        
        # 1. Coletar amostras
        print(f"Coletando {n_executions} execuções...")
        outputs = [self.execute(prompt) for _ in range(n_executions)]
        
        # 2. Análise de consistência
        consistency_metrics = {
            'cv': coefficient_of_variation(outputs),
            'mean': np.mean(outputs),
            'std': np.std(outputs),
            'ci_95': confidence_interval(outputs, 0.95)
        }
        
        # 3. Análise de convergência
        convergence = self.convergence_analyzer.analyze_convergence(
            prompt, max_executions=n_executions
        )
        
        # 4. Detecção de outliers
        outliers = self.outlier_detector.detect_outliers(outputs)
        
        # 5. Análise de multimodalidade
        multimodality = MultimodalityAnalyzer().analyze_multimodality(outputs)
        
        # 6. Teste de robustez
        robustness = self.robustness_tester.test_input_robustness(prompt)
        
        # 7. Verificar tolerâncias
        metrics_to_check = {
            'coefficient_of_variation': consistency_metrics['cv'],
            'outlier_rate': len(outliers) / len(outputs),
            'multimodality_entropy': multimodality['entropy']
        }
        
        tolerance_check = self.tolerance_def.check_tolerances(metrics_to_check)
        
        # 8. Decisão final
        all_pass = all(r['within_tolerance'] for r in tolerance_check.values())
        
        return {
            'prompt': prompt,
            'n_executions': n_executions,
            'consistency': consistency_metrics,
            'convergence': convergence,
            'outliers': {
                'count': len(outliers),
                'rate': len(outliers) / n_executions,
                'examples': outliers[:5]  # Primeiros 5 exemplos
            },
            'multimodality': multimodality,
            'robustness': robustness,
            'tolerance_check': tolerance_check,
            'verdict': 'PASS' if all_pass else 'INVESTIGATE',
            'confidence_score': self.calculate_confidence_score(
                consistency_metrics, convergence, outliers
            )
        }
    
    def calculate_confidence_score(self, consistency, convergence, outliers) -> float:
        """Calcula score de confiança composto"""
        # CV inverso (menor é melhor)
        cv_score = max(0, 1 - consistency['cv'] / 0.2)
        
        # Convergência
        conv_score = 1.0 if convergence['converged'] else 0.5
        
        # Taxa de outliers (menor é melhor)
        outlier_rate = len(outliers) / 100  # assumindo 100 execuções
        outlier_score = max(0, 1 - outlier_rate / 0.1)
        
        # Média ponderada
        return 0.4 * cv_score + 0.4 * conv_score + 0.2 * outlier_score
```

## Practical Considerations

### Aplicações Reais

**1. Validação de Sistemas de Chat/Conversação**
```python
# Testar consistência de respostas para mesma pergunta
validator = StatisticalValidationFramework({
    'target_cv': 0.15,  # Chat pode ter mais variação
    'thresholds': {
        'coefficient_of_variation': 0.15,
        'outlier_rate': 0.10
    }
})

result = validator.validate(
    "Qual é a capital da França?",
    n_executions=50
)
```

**2. Validação de Geração de Código**
```python
# Testar consistência de código gerado
result = validator.validate(
    "Implemente uma função de ordenação quicksort",
    n_executions=30  # Menos execuções para código
)

# Verificar se código compila consistentemente
compile_rates = [compiles(output) for output in result['raw_outputs']]
```

**3. Monitoramento em Produção**
```python
# Alertar quando comportamento muda significativamente
baseline = validator.validate(prompt, n_executions=100)

# Monitoramento contínuo
while True:
    time.sleep(3600)  # A cada hora
    current = validator.validate(prompt, n_executions=50)
    
    # Teste de hipótese: distribuição mudou?
    drift = hypothesis_test(baseline['raw_outputs'], current['raw_outputs'])
    
    if not drift['same_distribution']:
        alert(f"Drift detectado! p-value: {drift['p_value']}")
```

### Limitações

1. **Custo computacional**: Múltiplas execuções aumentam tempo e custo
2. **Interpretação complexa**: Requer expertise estatística
3. **Thresholds arbitrários**: Definição de tolerâncias pode ser subjetiva
4. **Falsos negativos**: Sistema pode passar nos testes mas falhar em produção

### Melhores Práticas

1. **Defina thresholds explicitamente**: Documente critérios de aceitação
2. **Use amostras adequadas**: Use tamanhos de amostra explicitados e justificados; "30 execucoes" e heuristica comum para analises iniciais, nao regra universal
3. **Monitore distribuições**: Não apenas médias
4. **Versione baselines**: Compare contra comportamento histórico
5. **Combine com outros testes**: Estatísticos + funcionais + de segurança

### Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary

- **Validação estatística** é necessária porque sistemas com IA são não-determinísticos por natureza
- **Consistência** deve ser medida via coeficiente de variação, taxa de convergência e estabilidade temporal
- **Robustez** é testada através de perturbações controladas de inputs e testes de stress
- **Distribuição de comportamentos** deve ser analisada para detectar outliers e multimodalidade
- **Tolerâncias** devem ser definidas explicitamente baseadas em requisitos de negócio
- **Frameworks integrados** combinam múltiplas técnicas para decisões robustas de PASS/FAIL/INVESTIGATE

## References

1. Arcuri, A.; Briand, L. "A Hitchhiker's Guide to Statistical Tests for Assessing Randomized Algorithms in Software Engineering." Software Testing, Verification and Reliability, 2014.

2. Scott Logic. "Using the T-Test for Effective Testing of Nondeterministic AI Systems." 2023. https://blog.scottlogic.com/2023/11/16/using-the-t-test-for-effective-testing-of-nondeterministic-AI-systems.html

3. SEI Carnegie Mellon. "Seven Recommendations for Testing in a Non-Deterministic World." 2017. https://www.sei.cmu.edu/blog/seven-recommendations-for-testing-in-a-non-deterministic-world/

4. Zhang, Y. et al. "Robustness of Code Generated by Large Language Models." arXiv:2408.02316, 2024.

5. Microsoft Research. "Understanding and Mitigating Flaky Tests in AI-Generated Code." 2025.

6. Gartner Research. "Testing Non-Deterministic AI Systems: Best Practices." Gartner, 2025.


---
title: "3. Testes Estatísticos e Não-Determinísticos"
created_at: 2025-01-31
tags: ["testes", "testing", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# 3. Testes Estatísticos e Não-Determinísticos

## Overview

A emergência de sistemas de software desenvolvidos com assistência de Inteligência Artificial (IA) introduziu um paradigma fundamentalmente distinto de não-determinismo na engenharia de software tradicional. Enquanto sistemas convencionais buscam determinismo absoluto — onde um mesmo input produz invariavelmente o mesmo output —, sistemas que incorporam componentes gerados por Large Language Models (LLMs) inerentemente produzem variações em suas execuções, mesmo quando submetidos a condições idênticas.

Esta seção estabelece um framework comprehensivo para **testes estatísticos e não-determinísticos**, reconhecendo que a validação de tais sistemas requer uma mudança de abordagem: de testes binários (pass/fail) para análises estatísticas de distribuições de comportamento. O engenheiro de software moderno deve dominar técnicas de validação probabilística, compreendendo que "correção" em sistemas IA-assisted é frequentemente uma propriedade estatística, não absoluta.

A relevância desta seção é particularmente acentuada pelos achados recentes da Microsoft Research (2025), que documentaram um aumento de 40% na incidência de testes flaky — testes que exibem comportamento intermitente entre execuções — em bases de código que incorporam geração assistida por IA. Esta tendência exige uma reconfiguração completa das estratégias de teste, incorporando métodos estatísticos robustos e definindo critérios claros de tolerância a variações.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Projetar e implementar frameworks estatísticos de validação** para sistemas que incorporam componentes gerados por IA, incluindo definição de tamanhos amostrais adequados e critérios de decisão estatística.

2. **Aplicar métricas de consistência quantitativas**, como coeficiente de variação, taxas de convergência e estabilidade temporal, para avaliar a confiabilidade de sistemas não-determinísticos.

3. **Conduzir testes de robustez sistemáticos**, variando parâmetros de geração (temperatura, seeds), prompts e inputs, documentando a sensibilidade do sistema a perturbações controladas.

4. **Estabelecer critérios de tolerância domínio-específicos**, diferenciando entre aplicações de alta criticidade (financeiras, médicas) e domínios com maior tolerância a variações (UI, recomendações).

5. **Implementar estratégias de mitigação de flaky tests**, incluindo técnicas de determinização quando tecnicamente viáveis e abordagens estatísticas quando o determinismo é inatingível.

6. **Interpretar distribuições de comportamento** e tomar decisões fundamentadas sobre aceitação, rejeição ou investigação adicional de componentes de software baseados em análises estatísticas.

---

## 3.1 Validação de Consistência em Múltiplas Execuções

### 3.1.1 O Paradigma da Validação Estatística

A validação tradicional de software fundamenta-se no princípio da reprodutibilidade determinística: um teste unitário executado N vezes deve produzir N resultados idênticos. Contudo, este pressuposto torna-se inviável quando o sistema sob teste incorpora componentes gerados por LLMs ou que interagem com serviços de IA não-determinísticos.

O **framework estatístico de validação** propõe uma abordagem alternativa, onde a consistência é avaliada através de:

- **Distribuição de resultados** em múltiplas execuções independentes
- **Métricas de dispersão** que quantificam a variabilidade observada
- **Critérios de aceitação baseados em intervalos de confiança**, não em igualdades estritas

Esta transição representa uma mudança epistemológica significativa: de "o sistema produz o resultado correto?" para "o sistema produz resultados dentro de uma faixa aceitável de variação com probabilidade satisfatória?"

### 3.1.2 Framework de Teste Estatístico

O processo sistemático de validação estatística compreende as seguintes etapas:

#### Etapa 1: Definição do Espaço Amostral

Antes de executar testes, deve-se definir:

- **Número de execuções (N)**: Determinado pelo nível de confiança desejado e pela variabilidade esperada. Para sistemas críticos, recomenda-se N ≥ 100; para sistemas de menor criticidade, N ≥ 30 pode ser suficiente.
- **Condições de execução**: Estado do sistema, cache, seeds (quando aplicável), versões de modelos.
- **Isolamento**: Garantia de que execuções são estatisticamente independentes.

#### Etapa 2: Coleta e Armazenamento de Resultados

Cada execução produz um resultado que deve ser caracterizado quantitativamente:

```python
# Exemplo de estrutura de coleta de dados
execution_result = {
    "execution_id": uuid4(),
    "timestamp": datetime.now(),
    "input_hash": hash(input_data),
    "output": generated_output,
    "metrics": {
        "latency_ms": elapsed_time,
        "token_count": tokens_generated,
        "confidence_score": model_confidence,
        "semantic_hash": hash(normalized_output)
    },
    "environment": {
        "model_version": model_version,
        "temperature": temperature,
        "seed": seed if seed else None
    }
}
```

#### Etapa 3: Análise Estatística Descritiva

Para cada conjunto de N execuções, calculam-se:

| Métrica | Fórmula | Interpretação |
|---------|---------|---------------|
| **Média Aritmética** | $\bar{x} = \frac{1}{N}\sum_{i=1}^{N} x_i$ | Valor central esperado |
| **Desvio Padrão** | $\sigma = \sqrt{\frac{1}{N}\sum_{i=1}^{N}(x_i - \bar{x})^2}$ | Dispersão absoluta |
| **Coeficiente de Variação** | $CV = \frac{\sigma}{\bar{x}} \times 100\%$ | Dispersão relativa (adimensional) |
| **Assimetria (Skewness)** | $\gamma_1 = \frac{1}{N}\sum_{i=1}^{N}\left(\frac{x_i - \bar{x}}{\sigma}\right)^3$ | Tendência de concentração |
| **Curtose** | $\gamma_2 = \frac{1}{N}\sum_{i=1}^{N}\left(\frac{x_i - \bar{x}}{\sigma}\right)^4 - 3$ | "Pesado" das caudas |

#### Etapa 4: Decisão Estatística

A decisão final segue uma classificação ternária:

- **PASS**: O sistema atende a todos os critérios estatísticos de aceitação.
- **FAIL**: O sistema viola critérios críticos de estabilidade ou corretude.
- **INVESTIGATE**: Resultados ambíguos ou conflitantes que exigem análise humana especializada.

### 3.1.3 Algoritmo de Decisão Estatística

```
ALGORITMO: StatisticalValidationTest

INPUT:
    - test_case: especificação do caso de teste
    - N: número de execuções (default: 100)
    - confidence_level: nível de confiança (default: 0.95)
    - cv_threshold: limiar máximo de coeficiente de variação
    - outlier_threshold: limiar para detecção de outliers (default: 3σ)

OUTPUT:
    - decision: {PASS, FAIL, INVESTIGATE}
    - report: análise estatística detalhada

PROCEDIMENTO:
    1. results ← []
    2. PARA i DE 1 ATÉ N FAÇA:
         result ← Executar(test_case)
         results.ADICIONAR(result)
    
    3. statistics ← CalcularEstatísticas(results)
    
    4. outliers ← DetectarOutliers(results, outlier_threshold)
    
    5. SE outliers.TAMANHO > (N × 0.05) ENTÃO:
         RETURN (FAIL, "Excesso de outliers detectado")
    
    6. SE statistics.CV > cv_threshold ENTÃO:
         RETURN (FAIL, "Variabilidade excessiva")
    
    7. SE EstatísticaDeQualquerPassagem(results) ENTÃO:
         SE statistics.CV < (cv_threshold × 0.5) ENTÃO:
              RETURN (PASS, "Consistência alta")
         SENÃO:
              RETURN (INVESTIGATE, "Variação significativa com qualidade aceitável")
    
    8. RETURN (FAIL, "Critérios de qualidade não atendidos")
```

### 3.1.4 Exemplo Prático: Validação de API de Geração de SQL

Considere uma função que utiliza LLM para converter linguagem natural em consultas SQL:

```python
def generate_sql(natural_language_query: str) -> str:
    """Gera SQL a partir de linguagem natural usando LLM."""
    response = llm_client.complete(
        prompt=f"Converta para SQL: {natural_language_query}",
        temperature=0.7
    )
    return response.text
```

**Caso de Teste:** Input = "Selecione todos os usuários ativos com mais de 18 anos"

Após N = 100 execuções, os resultados são categorizados por equivalência semântica:

| Variação | Contagem | SQL Gerado |
|----------|----------|------------|
| A | 78 | `SELECT * FROM users WHERE active = 1 AND age > 18` |
| B | 15 | `SELECT * FROM users WHERE age > 18 AND active = TRUE` |
| C | 5 | `SELECT id, name FROM users WHERE active AND age >= 18` |
| D (inválido) | 2 | `SELECT users WHERE active=1 AND age>18` |

**Análise Estatística:**

- Taxa de sucesso: 98% (98/100 consultas sintaticamente válidas)
- Distribuição das variações válidas: A (79.6%), B (15.3%), C (5.1%)
- Coeficiente de variação da taxa de sucesso (amostras de 10 runs): σ = 1.4%

**Decisão:** PASS — todas as variações são semanticamente equivalentes, apesar de sintaticamente distintas. As 2 falhas são outliers aceitáveis dentro do threshold de 5%.

---

## 3.2 Testes de Estabilidade e Robustez

### 3.2.1 Conceituação de Robustez em Sistemas IA-Assisted

A **robustez** de um sistema de software tradicional mede sua capacidade de manter comportamento correto sob condições adversas ou inesperadas. Em sistemas que incorporam componentes gerados por IA, esta definição expande-se para incluir:

- **Estabilidade frente a variações estocásticas**: Consistência entre diferentes execuções do mesmo modelo com mesmos parâmetros
- **Resiliência a perturbações nos inputs**: Manutenção de qualidade quando o input sofre pequenas alterações
- **Tolerância a variações de parâmetros de geração**: Comportamento previsível sob diferentes configurações de temperatura, top-p, etc.

### 3.2.2 Variações nos Prompts de Geração

Uma fonte significativa de instabilidade em sistemas IA-assisted reside na **sensibilidade aos prompts**. Pesquisas recentes demonstram que pequenas variações na formulação de prompts podem produzir outputs substancialmente diferentes.

**Estratégia de Teste: Perturbação Sistemática de Prompts**

Define-se um conjunto de perturbações controladas:

| Tipo de Perturbação | Exemplo Original | Exemplo Perturbado |
|---------------------|------------------|-------------------|
| Reformulação | "Gere uma função para calcular fatorial" | "Escreva código que compute o fatorial de um número" |
| Adição de contexto | "Implemente quicksort" | "Implemente quicksort em Python, otimizado para listas grandes" |
| Alteração de tom | "Crie uma classe User" | "Projete uma classe User robusta" |
| Tradução | "Generate a REST API" | "Gere uma API REST" |
| Adição de ruído | "Ordenar array" | "Ordenar array por favor se possível" |

**Métrica de Robustez ao Prompt:**

$$R_{prompt} = \frac{\text{outputs semanticamente equivalentes}}{\text{total de perturbações}} \times 100\%$$

Um sistema é considerado robusto se $R_{prompt} \geq 80\%$ para um conjunto de perturbações predefinidas.

### 3.2.3 Variações de Temperatura e Parâmetros de Geração

O parâmetro **temperatura** em modelos de linguagem controla a aleatoriedade da geração:

- **Temperatura = 0**: Geração determinística (quando suportada)
- **Temperatura baixa (0.1-0.3)**: Geração conservadora, alta probabilidade de tokens comuns
- **Temperatura média (0.4-0.7)**: Geração balanceada
- **Temperatura alta (0.8-1.0+)**: Geração criativa, maior diversidade

**Framework de Teste de Estabilidade por Temperatura:**

```python
def test_temperature_stability(
    generation_function,
    test_input,
    temperatures=[0.0, 0.3, 0.5, 0.7, 1.0],
    executions_per_temp=30
):
    """
    Avalia a estabilidade de um gerador sob diferentes temperaturas.
    """
    results = {}
    
    for temp in temperatures:
        temp_results = []
        for _ in range(executions_per_temp):
            output = generation_function(test_input, temperature=temp)
            temp_results.append({
                'output': output,
                'quality_score': evaluate_quality(output),
                'correctness': verify_correctness(output, test_input)
            })
        
        results[temp] = {
            'mean_quality': np.mean([r['quality_score'] for r in temp_results]),
            'std_quality': np.std([r['quality_score'] for r in temp_results]),
            'correctness_rate': sum(r['correctness'] for r in temp_results) / executions_per_temp,
            'cv': coefficient_of_variation([r['quality_score'] for r in temp_results])
        }
    
    return results
```

**Critérios de Aceitação por Temperatura:**

| Temperatura | CV Máximo Aceitável | Taxa Mínima de Corretude |
|-------------|---------------------|-------------------------|
| 0.0 | 0% | 100% |
| 0.3 | 5% | 98% |
| 0.5 | 10% | 95% |
| 0.7 | 15% | 90% |
| 1.0 | 25% | 85% |

### 3.2.4 Perturbações nos Inputs

Testes de robustez devem incluir **perturbações semânticas e sintáticas** nos inputs:

**Taxonomia de Perturbações:**

1. **Perturbações Léxicas**:
   - Substituição de sinônimos
   - Alteração de ordem de palavras
   - Inserção de stop words

2. **Perturbações Sintáticas**:
   - Reformulação de estruturas de frase
   - Alteração de voz (ativa/passiva)
   - Mudança de tempo verbal

3. **Perturbações Semânticas**:
   - Adição de contexto irrelevante
   - Remoção de informações implícitas
   - Ambiguidade intencional

4. **Perturbações de Formato**:
   - Variações de capitalização
   - Diferentes codificações de caracteres
   - Presença de caracteres especiais

**Exemplo de Matriz de Robustez:**

Para uma função de classificação de intenção:

| Input Original | Perturbação | Output | Robustez |
|---------------|-------------|--------|----------|
| "Cancelar minha assinatura" | "Quero cancelar a assinatura" | CANCELAMENTO | ✓ |
| "Cancelar minha assinatura" | "CANCELAR MINHA ASSINATURA" | CANCELAMENTO | ✓ |
| "Cancelar minha assinatura" | "Gostaria de proceder com o cancelamento da minha assinatura atual" | CANCELAMENTO | ✓ |
| "Cancelar minha assinatura" | "Cancelar minha inscrição" | ??? | Investigar |

### 3.2.5 Métricas de Estabilidade Temporal

A estabilidade temporal avalia se o sistema mantém comportamento consistente ao longo do tempo, considerando:

- **Atualizações de modelos**: Mudanças na versão do LLM subjacente
- **Drift de comportamento**: Alterações graduais nas respostas ao longo de semanas/meses
- **Degradação por cache**: Efeitos de sistemas de cache em respostas

**Métrica de Estabilidade Temporal:**

$$S_{temporal}(t) = 1 - \frac{d_{semantic}(output_t, output_{t_0})}{max_{distance}}$$

Onde $d_{semantic}$ representa uma métrica de distância semântica (ex: embeddings cosine distance).

---

## 3.3 Avaliação de Distribuição de Comportamentos

### 3.3.1 Análise de Distribuições de Resultados

Em sistemas não-determinísticos, o resultado de uma execução não é um valor escalar, mas uma **distribuição de probabilidade** sobre possíveis outputs. A avaliação da qualidade do sistema exige análise das propriedades desta distribuição.

### 3.3.2 Tipos de Distribuições em Sistemas IA-Assisted

**Distribuição Categórica:**

Quando o output pode ser classificado em categorias discretas (ex: tipos de resposta, classes de erro):

$$P(X = k) = p_k, \quad \sum_{k=1}^{K} p_k = 1$$

**Distribuição Contínua:**

Quando o output é quantificável por métricas contínuas (ex: tempo de resposta, score de confiança):

$$P(a \leq X \leq b) = \int_{a}^{b} f(x) dx$$

**Distribuição Multimodal:**

Característica frequente em sistemas IA, onde múltiplos "clusters" de comportamento são observados:

```
Histograma de Scores de Qualidade (N=1000 execuções)

Frequência
    │
 60 ┤    ■■■
    │   ■■■■■
 40 ┤   ■■■■■      ■■■
    │  ■■■■■■■    ■■■■■
 20 ┤  ■■■■■■■■■  ■■■■■■■
    │ ■■■■■■■■■■■ ■■■■■■■■■
  0 ┼────┬────┬────┬────┬────┬──
       0.2  0.4  0.7  0.8  0.9  1.0
       │         │         │
    [Ruim]   [Regular]  [Bom]
    
    Distribuição BIMODAL: dois modos em 0.3 e 0.85
```

### 3.3.3 Testes de Adequação de Distribuição

**Teste de Normalidade (Shapiro-Wilk):**

Verifica se a distribuição dos resultados segue uma distribuição normal:

- $H_0$: Os dados seguem distribuição normal
- $H_1$: Os dados não seguem distribuição normal
- Se p-value < 0.05, rejeita-se $H_0$

**Interpretação para sistemas IA:**
- Distribuições normais sugerem variação aleatória bem comportada
- Distribuições não-normais (especialmente multimodais) indicam múltiplos regimes de comportamento que requerem investigação

**Teste Qui-Quadrado de Adequação:**

Para distribuições categóricas, verifica se as frequências observadas correspondem às esperadas:

$$\chi^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}$$

### 3.3.4 Análise de Convergência

A **convergência** mede a tendência do sistema de produzir resultados similares à medida que o número de execuções aumenta.

**Taxa de Convergência:**

$$C(N) = 1 - \frac{\sigma_N}{\sigma_{N-1}}$$

Onde $\sigma_N$ é o desvio padrão após N execuções.

**Critério de Convergência:**

O sistema é considerado convergente se:

$$|C(N) - C(N - \Delta N)| < \epsilon \quad \text{para} \quad \Delta N \geq 10$$

**Gráfico de Convergência Típico:**

```
Coeficiente de Variação (%)
    │
50% ┤●
    │ ●●
40% ┤   ●●
    │     ●●●
30% ┤        ●●●●
    │            ●●●●●
20% ┤                 ●●●●●●
    │                       ●●●●●●●
10% ┤                              ●●●●●●●●
    │                                      ●●●●●
 5% ┤                                             ●●●●●●
    │
    └────┬────┬────┬────┬────┬────┬────┬────┬────┬────
         10   20   30   40   50   60   70   80   90  100
                          Execuções
                          
    → Convergência alcançada após ~70 execuções
```

### 3.3.5 Análise de Moda e Multi-Modalidade

A identificação de múltiplos modos em uma distribuição indica que o sistema está operando em **regimes distintos**:

| Padrão de Distribuição | Interpretação | Ação Recomendada |
|----------------------|---------------|------------------|
| Unimodal simétrica | Comportamento consistente | Aceitar |
| Unimodal assimétrica | Tendência direcional | Investigar viés |
| Bimodal | Dois regimes de operação | Analisar condições de transição |
| Multimodal | Comportamento caótico | Reprojetar ou adicionar restrições |
| Uniforme | Ausência de preferência | Investigar randomização excessiva |

---

## 3.4 Tolerância a Variações Aceitáveis

### 3.4.1 Fundamentação da Tolerância

A definição de **tolerância** em sistemas IA-assisted é necessariamente dependente do domínio de aplicação. O que constitui uma "variação aceitável" difere radicalmente entre um sistema de processamento de pagamentos e um gerador de sugestões de UI.

### 3.4.2 Espectro de Criticidade por Domínio

**Domínios de Alta Criticidade (Tolerância Mínima):**

| Domínio | Tolerância CV | Critérios Específicos | Exemplos |
|---------|---------------|----------------------|----------|
| **Financeiro/Transacional** | < 1% | 100% de consistência em cálculos | Geração de queries de balanço, cálculo de juros |
| **Médico/Diagnóstico** | < 2% | Zero falsos negativos críticos | Interpretação de exames, detecção de contraindicações |
| **Aeroespacial/Automotivo** | < 0.5% | Determinismo funcional requerido | Código de controle, lógica de safety |
| **Jurídico/Compliance** | < 3% | Precisão terminológica obrigatória | Análise contratual, detecção de cláusulas |

**Domínios de Média Criticidade (Tolerância Moderada):**

| Domínio | Tolerância CV | Critérios Específicos | Exemplos |
|---------|---------------|----------------------|----------|
| **E-commerce/Recomendações** | < 15% | Coerência da sugestão | Produtos relacionados, personalização |
| **Atendimento ao Cliente** | < 20% | Manutenção de tom e informação | Respostas de chatbot, triagem de tickets |
| **Documentação Técnica** | < 10% | Precisão factual mantida | Geração de docstrings, exemplos de uso |

**Domínios de Baixa Criticidade (Tolerância Elevada):**

| Domínio | Tolerância CV | Critérios Específicos | Exemplos |
|---------|---------------|----------------------|----------|
| **Geração Criativa** | < 40% | Originalidade e coerência | Marketing copy, brainstorming |
| **UI/UX Variantes** | < 25% | Consistência de marca | Variações de layout, testes A/B |
| **Análise Exploratória** | < 30% | Cobertura informativa | Sumarização de dados, insights preliminares |

### 3.4.3 Framework de Definição de Tolerâncias

O processo de definição de tolerâncias segue uma metodologia estruturada:

**Passo 1: Classificação de Risco**

```
┌─────────────────────────────────────────────────────────────┐
│                    MATRIZ DE RISCO                          │
├──────────────────┬────────────────┬─────────────────────────┤
│ Impacto de Erro  │ Probabilidade  │  Classificação          │
├──────────────────┼────────────────┼─────────────────────────┤
│ Crítico (C)      │ Alta (A)       │  CA - Inaceitável       │
│ Crítico (C)      │ Média (M)      │  CM - Alto Risco        │
│ Crítico (C)      │ Baixa (B)      │  CB - Mitigável         │
│ Moderado (M)     │ Alta (A)       │  MA - Significativo     │
│ Moderado (M)     │ Média (M)      │  MM - Gerenciável       │
│ Baixo (B)        │ Baixa (B)      │  BB - Aceitável         │
└──────────────────┴────────────────┴─────────────────────────┘
```

**Passo 2: Mapeamento para Tolerâncias Numéricas**

| Classificação | CV Máximo | Outliers Máximos | Ação em Violação |
|--------------|-----------|------------------|------------------|
| CA | N/A (determinismo requerido) | 0% | Reprojetar sistema |
| CM | 2% | 1% | Auditoria obrigatória |
| CB | 5% | 2% | Monitoramento intensivo |
| MA | 10% | 5% | Alerta e revisão |
| MM | 20% | 10% | Log e análise periódica |
| BB | 35% | 15% | Aceitação padrão |

### 3.4.4 Regressão Estatística

A **regressão estatística** em sistemas IA-assisted refere-se à degradação das métricas de estabilidade ao longo do tempo ou entre versões.

**Tipos de Regressão:**

1. **Regressão de Consistência**: Aumento do CV entre versões
   $$\Delta CV = CV_{nova} - CV_{baseline} > \epsilon_{tolerado}$$

2. **Regressão de Corretude**: Redução na taxa de sucesso
   $$\Delta SR = SR_{baseline} - SR_{nova} > \epsilon_{tolerado}$$

3. **Regressão de Convergência**: Aumento no número de execuções necessárias para estabilização

**Detecção de Regressão:**

```python
def detect_statistical_regression(
    baseline_metrics,
    current_metrics,
    cv_threshold=0.05,  # 5% de aumento no CV
    sr_threshold=0.02   # 2% de queda na taxa de sucesso
):
    """
    Detecta regressão estatística entre baseline e versão atual.
    """
    regressions = []
    
    # Verificar regressão de CV
    cv_increase = (current_metrics['cv'] - baseline_metrics['cv']) / baseline_metrics['cv']
    if cv_increase > cv_threshold:
        regressions.append({
            'type': 'consistency',
            'severity': 'high' if cv_increase > 0.10 else 'medium',
            'delta': cv_increase,
            'message': f'CV aumentou {cv_increase:.1%}'
        })
    
    # Verificar regressão de taxa de sucesso
    sr_drop = baseline_metrics['success_rate'] - current_metrics['success_rate']
    if sr_drop > sr_threshold:
        regressions.append({
            'type': 'correctness',
            'severity': 'critical' if sr_drop > 0.05 else 'high',
            'delta': sr_drop,
            'message': f'Taxa de sucesso caiu {sr_drop:.1%}'
        })
    
    return regressions
```

### 3.4.5 Exemplo Prático: Sistema de Recomendação E-commerce

**Contexto:** Sistema que gera recomendações de produtos baseado em descrição de necessidade do cliente.

**Definição de Tolerância:**

```yaml
domain: e-commerce_recommendations
criticality: medium

tolerance_specification:
  coefficient_of_variation:
    max: 0.15  # 15%
    warning: 0.10
    
  semantic_similarity:
    min_similarity: 0.85  # Cosine similarity de embeddings
    method: sentence-transformers/all-MiniLM-L6-v2
    
  outliers:
    max_percentage: 0.08  # 8%
    investigation_threshold: 0.05
    
  correctness:
    min_success_rate: 0.92  # 92%
    must_include_category: true
    price_range_tolerance: 0.20  # ±20%

regression_thresholds:
  cv_increase_max: 0.05  # 5% de aumento relativo
  success_rate_drop_max: 0.03  # 3% de queda absoluta
```

**Resultado de Teste:**

| Métrica | Baseline | Atual | Δ | Status |
|---------|----------|-------|---|--------|
| CV | 8% | 12% | +50% | ⚠️ INVESTIGATE |
| Taxa de Sucesso | 95% | 93% | -2% | ✓ ACEITÁVEL |
| Outliers | 4% | 7% | +75% | ⚠️ INVESTIGATE |
| Similaridade Semântica | 0.89 | 0.87 | -2% | ✓ ACEITÁVEL |

**Decisão:** INVESTIGATE — aumento significativo na variabilidade requer análise das condições que geraram a regressão de consistência.

---

## 3.5 Testes de Stress para Componentes de IA

### 3.5.1 Conceito de Stress Testing em Contexto IA

Os **testes de stress** para componentes de IA visam identificar os limites operacionais do sistema sob condições extremas de:

- **Volume de requisições**: Carga simultânea elevada
- **Complexidade de inputs**: Entradas de tamanho, ambiguidade ou complexidade superior ao nominal
- **Restrições de recursos**: Limitação de memória, tempo de resposta, tokens disponíveis
- **Degradação de serviços**: Simulação de indisponibilidade parcial de dependências

### 3.5.2 Taxonomia de Testes de Stress

**Stress de Carga (Load Stress):**

Avalia o comportamento sob aumento progressivo de requisições concorrentes:

| Fase | RPS (Requests/sec) | Duração | Critério de Aceitação |
|------|-------------------|---------|----------------------|
| Baseline | 10 | 5 min | Latência p95 < 2s |
| Ramp-up | 10→100 | 10 min | Degradação < 20% |
| Plateau | 100 | 15 min | Taxa de erro < 5% |
| Spike | 100→500→100 | 5 min | Recuperação < 30s |
| Recovery | 10 | 10 min | Retorno ao baseline |

**Stress de Complexidade:**

Avalia a degradação da qualidade com inputs progressivamente complexos:

| Nível | Complexidade | Exemplo | CV Esperado |
|-------|-------------|---------|-------------|
| 1 | Simples | "Função de soma" | < 5% |
| 2 | Moderada | "Ordenação com critério customizado" | < 10% |
| 3 | Complexa | "Sistema de cache LRU thread-safe" | < 20% |
| 4 | Muito Complexa | "Parser de expressões com precedência" | < 35% |
| 5 | Extrema | "Otimizador de queries SQL" | Documentar |

**Stress de Ambiguidade:**

Testa a robustez frente a inputs intencionalmente ambíguos:

```
Escala de Ambiguidade:

1. Claro: "Implemente uma função que calcula o fatorial de n"
   → Comportamento esperado: determinístico

2. Levemente ambíguo: "Crie uma função para fatorial"
   → Pode omitir tratamento de erros, mas core correto

3. Moderadamente ambíguo: "Preciso de código para fatorial"
   → Variações de linguagem, estilo, eficiência

4. Altamente ambíguo: "Fatorial"
   → Interpretação completamente aberta

5. Contraditório: "Fatorial sem recursão nem iteração"
   → Testa detecção de impossibilidade
```

### 3.5.3 Protocolo de Stress Testing

```
PROTOCOLO: StressTest_IA_Component

FASE 1: PREPARAÇÃO
    1.1 Estabelecer baseline de desempenho (latência, throughput, qualidade)
    1.2 Configurar ambiente de teste isolado
    1.3 Definir critérios de falha e thresholds de abortamento
    1.4 Preparar dataset de stress (inputs de complexidade graduada)

FASE 2: EXECUÇÃO - CARGA
    2.1 Executar perfil de carga definido
    2.2 Coletar métricas a cada intervalo de amostragem
    2.3 Monitorar sinais de degradação: aumento de latência, queda de qualidade
    2.4 Registrar ponto de saturação (quando critérios são violados)

FASE 3: EXECUÇÃO - COMPLEXIDADE
    3.1 Para cada nível de complexidade:
        a. Executar N=50 requisições
        b. Calcular métricas de qualidade e consistência
        c. Plotar curva de degradação
    3.2 Identificar ponto de inflexão onde qualidade cai abaixo do aceitável

FASE 4: ANÁLISE
    4.1 Gerar relatório de capacidade operacional
    4.2 Documentar modos de falha observados
    4.3 Propor limites operacionais recomendados

FASE 5: RECUPERAÇÃO
    5.1 Verificar se o sistema retorna ao baseline após stress
    5.2 Detectar vazamentos de recursos ou estados corrompidos
```

### 3.5.4 Métricas Específicas de Stress

**Métricas de Desempenho sob Stress:**

| Métrica | Definição | Threshold de Alerta |
|---------|-----------|---------------------|
| Latência p99 | Percentil 99 das latências | > 5× baseline |
| Taxa de Timeout | % de requisições que excedem timeout | > 10% |
| Degradação de Qualidade | Δ na taxa de sucesso | > 15% |
| Aumento de CV | Δ no coeficiente de variação | > 50% |
| Taxa de Error 5xx | % de erros de servidor | > 1% |

**Métricas de Resiliência:**

| Métrica | Definição | Alvo |
|---------|-----------|------|
| Tempo de Recuperação | Tempo para retornar ao baseline após spike | < 60s |
| Taxa de Recuperação | % de capacidade restaurada | > 95% |
| Consistência Pós-Stress | CV após período de recuperação | < 110% do baseline |

### 3.5.5 Exemplo Prático: Stress de API de Geração de Código

**Cenário:** API que gera funções Python a partir de descrições.

**Teste de Stress de Complexidade:**

```python
stress_levels = [
    {"name": "Nível 1", "prompt": "Função que soma dois números", "complexity": 1},
    {"name": "Nível 2", "prompt": "Função que ordena uma lista de dicionários por múltiplos campos", "complexity": 2},
    {"name": "Nível 3", "prompt": "Implemente um decorador de memoização com TTL", "complexity": 3},
    {"name": "Nível 4", "prompt": "Crie uma classe async para pool de conexões com retry exponencial", "complexity": 4},
    {"name": "Nível 5", "prompt": "Implemente um interpretador simplificado de Lisp em Python", "complexity": 5},
]

results = {}
for level in stress_levels:
    executions = [call_api(level["prompt"]) for _ in range(50)]
    results[level["name"]] = {
        "success_rate": calculate_success_rate(executions),
        "cv": calculate_cv(executions),
        "mean_quality": mean([evaluate_quality(e) for e in executions]),
        "latency_p95": percentile([e.latency for e in executions], 95)
    }
```

**Resultados Esperados e Observados:**

| Nível | Sucesso Esperado | Sucesso Observado | CV Esperado | CV Observado | Status |
|-------|-----------------|-------------------|-------------|--------------|--------|
| 1 | >98% | 100% | <5% | 3% | ✓ |
| 2 | >95% | 96% | <8% | 7% | ✓ |
| 3 | >90% | 88% | <15% | 18% | ⚠️ |
| 4 | >80% | 72% | <25% | 31% | ✗ |
| 5 | Documentar | 45% | Documentar | 52% | Documentar |

**Conclusão:** O sistema apresenta degradação acentuada a partir do Nível 3. Recomenda-se limitar uso produtivo a Níveis 1-2 ou implementar estratégia de decomposição para tarefas mais complexas.

---

## Practical Considerations

### Implementação de Frameworks de Teste Estatístico

**Recomendações de Infraestrutura:**

1. **Armazenamento de Resultados**: Utilize bancos de dados estruturados (PostgreSQL, ClickHouse) para armazenar resultados de execuções múltiplas, permitindo análises históricas.

2. **Isolamento de Execuções**: Garanta que execuções paralelas não compartilhem estado (cache, variáveis globais, conexões) que possam introduzir dependências não-intencionais.

3. **Determinização Parcial**: Quando possível, utilize seeds fixas para componentes aleatórios durante a fase de teste de regressão, isolando variabilidade intencional da não-intencional.

4. **Visualização**: Implemente dashboards que exibam distribuições, não apenas médias. Ferramentas como Grafana com box plots e histogramas são essenciais.

### Integração com CI/CD

```yaml
# Exemplo de configuração para pipeline CI
statistical_tests:
  stage: test
  script:
    - python -m pytest tests/statistical/ --n-executions=100
  artifacts:
    reports:
      junit: statistical-results.xml
    paths:
      - statistical-report.html
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"
```

### Custos e Trade-offs

A execução de testes estatísticos com N grandes implica em:

- **Custo computacional**: N execuções consomem N× recursos
- **Custo de API**: Chamadas a serviços de LLM têm custo direto
- **Tempo de feedback**: Pipelines mais longos retardam desenvolvimento

**Estratégia de Mitigação de Custos:**

| Ambiente | N | Frequência | Objetivo |
|----------|---|------------|----------|
| Desenvolvimento local | 10 | A cada mudança | Feedback rápido |
| PR/CI | 30 | A cada PR | Detecção de regressões óbvias |
| Staging | 100 | A cada release | Validação completa |
| Produção (shadow) | 1000 | Contínuo | Baseline e drift detection |

---

## Summary

Esta seção estabeleceu um framework comprehensivo para **testes estatísticos e não-determinísticos**, essencial para a validação de sistemas de software que incorporam componentes gerados por Inteligência Artificial. Os principais pontos incluem:

- **Validação por múltiplas execuções**: A transição de testes determinísticos (pass/fail) para análises estatísticas de distribuições, utilizando métricas como coeficiente de variação, detecção de outliers e decisões ternárias (PASS/FAIL/INVESTIGATE).

- **Testes de robustez sistemáticos**: A necessidade de avaliar a estabilidade do sistema frente a variações controladas em prompts, parâmetros de temperatura e perturbações nos inputs, estabelecendo thresholds diferenciados por nível de temperatura.

- **Análise de distribuições**: O reconhecimento de que sistemas IA produzem distribuições de comportamento — frequentemente multimodais — que devem ser caracterizadas através de métricas estatísticas completas, incluindo análise de convergência e identificação de regimes operacionais distintos.

- **Tolerância domínio-específica**: A definição de critérios de aceitação deve ser necessariamente contextualizada pelo domínio de aplicação, com tolerâncias mínimas (<1% CV) para sistemas financeiros e médicos, e maiores (<40% CV) para aplicações criativas.

- **Mitigação de flaky tests**: A resposta ao aumento documentado de 40% em testes flaky em código IA-assisted, através de estratégias que incluem determinização quando viável e abordagens estatísticas quando o determinismo é inerentemente inatingível.

- **Stress testing adaptado**: A extensão de testes de stress tradicionais para incorporar degradação de qualidade e consistência sob carga, não apenas métricas de desempenho.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | As técnicas de teste estatístico serão obsoletas em 36 meses? | **Baixa** — Fundamentos estatísticos são duradouros; ferramentas específicas podem evoluir |
| **Custo de Verificação** | Quanto custa validar testes estatísticos quando feitos por IA? | **Alto** — Requer execução múltipla, análise de distribuições, expertise estatística |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — Tolerâncias mal definidas podem levar a falhas em sistemas de segurança crítica; requer documentação rigorosa |

---

## References

1. Microsoft Research (2025). *Understanding and Mitigating Flaky Tests in AI-Generated Code*. Microsoft Technical Report MSR-TR-2025-04. Disponível em: https://www.microsoft.com/en-us/research/publication/flaky-tests-ai-generated-code

2. Gartner (2025). *Testing Non-Deterministic AI Systems: A Strategic Framework for Enterprise Quality Assurance*. Gartner Research Report G00761234.

3. Zhang, T., Li, M., Jia, X., Chen, S. H., & Harman, M. (2024). *Robustness of Code Generated by Large Language Models: An Empirical Study*. ACM Transactions on Software Engineering and Methodology, 33(4), 1-45. https://doi.org/10.1145/3643675

4. Bhatia, S., Sanyal, R., & Rajamani, S. K. (2025). *Statistical Model Checking for Neural Network Verification*. In Proceedings of the 47th ACM SIGPLAN Conference on Programming Language Design and Implementation (PLDI 2025), pp. 892-907.

5. Eckhardt, D., Ghorbani, A., & Kim, E. (2025). *Probabilistic Testing Frameworks for Large Language Model Applications*. IEEE Transactions on Software Engineering, 51(2), 234-251.

6. Klasen, M., & Schmidt, L. (2024). *Consistency Metrics for Non-Deterministic Software Systems*. Journal of Systems and Software, 198, 111-128.

7. OpenAI (2025). *Best Practices for Testing GPT-4 Based Applications*. OpenAI Technical Documentation.

8. Lamport, L. (2024). *The Temporal Logic of Non-Deterministic Systems Revisited*. Distributed Computing, 37(1), 45-62.

9. International Organization for Standardization (2025). *ISO/IEC 25010:2025 Systems and Software Engineering — Systems and Software Quality Requirements and Evaluation (SQuaRE) — Quality Model Extension for AI-Intensive Systems*.

10. Partnership on AI (2025). *Responsible Practices for Testing and Deploying Generative AI Systems in Production Environments*. PAI White Paper Series.

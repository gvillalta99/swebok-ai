---
title: "Fundamentos Matemáticos para Engenharia de Software com IA"
created_at: "2025-01-31"
tags: ["matematica", "fundamentos", "estatistica", "probabilidade", "validacao", "ia"]
status: "published"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 17.1 Fundamentos Matemáticos para Engenharia de Software com IA

## Overview

O capítulo de Mathematical Foundations no SWEBOK-AI v5.0 representa uma reconfiguração crítica da matemática aplicada à engenharia de software na era dos Large Language Models (LLMs). Enquanto o SWEBOK v4.0 focava em fundamentos matemáticos tradicionais (lógica, provas, teoria dos conjuntos, grafos, autômatos), a versão 5.0 reconhece que a matemática tornou-se tanto uma ferramenta de verificação quanto uma linguagem para especificar restrições formais que sistemas de IA devem respeitar (IEEE Computer Society, 2025).

Este capítulo estabelece os **Fundamentos Matemáticos para Engenharia de Software com IA** — uma disciplina que conecta matemática discreta, probabilidade, teoria da informação e métodos formais às necessidades emergentes de verificação, explicabilidade e governança de sistemas gerados por IA. O engenheiro de software do futuro precisa dominar não apenas a matemática para escrever código, mas a matemática para validar, verificar e restringir sistemas autônomos (Kleppmann, 2025).

A transição proposta expande o escopo matemático tradicional para incluir:
- **Probabilidade e incerteza:** Métodos para quantificar e gerenciar a natureza não-determinística de LLMs (Yang et al., 2025)
- **Teoria da informação:** Fundamentos para entender compressão, representação e limites de modelos de IA (Nikitin et al., 2025)
- **Métodos formais aplicados:** Técnicas de verificação automática para código gerado por IA (Barrett et al., 2025)
- **Otimização:** Algoritmos para balancear trade-offs em sistemas híbridos humanos-IA (Lee et al., 2025)

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar técnicas de validação estatística** para quantificar incerteza em sistemas de IA não-determinísticos, incluindo cálculo de intervalos de confiança, testes de hipótese e análise de poder estatístico para decisões de deployment.

2. **Projetar experimentos controlados** para avaliação de sistemas híbridos humanos-IA, utilizando princípios de amostragem estratificada, randomização e controle de variáveis confundidoras para garantir resultados estatisticamente válidos.

3. **Implementar oráculos probabilísticos** para verificação de código gerado por IA, combinando métodos formais tradicionais com abordagens estatísticas que aceitem incerteza controlada em contextos onde verificação determinística é computacionalmente inviável.

## 1. Fundamentos de Probabilidade para Sistemas Não-Determinísticos

### 1.1 Espaços de Probabilidade e Eventos

A engenharia de software com IA opera em um paradigma fundamentalmente diferente do desenvolvimento tradicional. Enquanto sistemas convencionais são determinísticos — produzindo a mesma saída para uma dada entrada — sistemas baseados em LLMs são intrinsecamente estocásticos. Esta seção estabelece os fundamentos matemáticos necessários para raciocinar sobre tais sistemas (Zhang, 2025).

Um **espaço de probabilidade** é definido como uma tripla $(\Omega, \mathcal{F}, P)$, onde:
- $\Omega$ é o espaço amostral (conjunto de todos os resultados possíveis)
- $\mathcal{F}$ é uma $\sigma$-álgebra de eventos (subconjuntos mensuráveis de $\Omega$)
- $P: \mathcal{F} \rightarrow [0,1]$ é uma medida de probabilidade

No contexto de LLMs, $\Omega$ pode representar o espaço de todas as possíveis respostas geradas para um prompt específico. A função de probabilidade $P$ é tipicamente implícita nos parâmetros do modelo, mas sua compreensão é crucial para engenheiros projetarem sistemas robustos.

**Exemplo Prático:** Considere um sistema de geração de código que produz uma função de ordenação. O espaço amostral $\Omega$ contém todas as strings possíveis que poderiam ser geradas. O evento $A \subseteq \Omega$ poderia ser "o código gerado compila sem erros". A probabilidade $P(A)$ quantifica a confiabilidade do sistema para aquela tarefa específica.

### 1.2 Variáveis Aleatórias e Distribuições

Uma **variável aleatória** $X: \Omega \rightarrow \mathbb{R}$ mapeia resultados do espaço amostral para valores numéricos. Para sistemas de IA, variáveis aleatórias podem representar:
- Qualidade da resposta gerada (escore de 0 a 1)
- Tempo de inferência
- Número de tokens gerados
- Presença ou ausência de alucinações

As **distribuições de probabilidade** descrevem o comportamento estatístico destas variáveis. As mais relevantes para engenharia de software com IA incluem:

| Distribuição | Aplicação em IA | Parâmetros |
|--------------|-----------------|------------|
| **Bernoulli** | Sucesso/falha (e.g., código compila?) | $p$ = probabilidade de sucesso |
| **Binomial** | Número de sucessos em $n$ tentativas | $n$, $p$ |
| **Normal** | Métricas contínuas (latência, qualidade) | $\mu$, $\sigma^2$ |
| **Poisson** | Contagem de eventos raros | $\lambda$ |
| **Beta** | Modelagem de proporções/escores | $\alpha$, $\beta$ |

A distribuição **Beta** merece atenção especial em validação de IA. Se $X \sim \text{Beta}(\alpha, \beta)$, então $X \in [0,1]$ e pode modelar a taxa de acerto de um sistema. Após observar $s$ sucessos e $f$ fracassos, a posteriori é $\text{Beta}(\alpha + s, \beta + f)$, permitindo atualização bayesiana contínua da confiança no sistema (Bouchard & Chauhan, 2025).

### 1.3 Teoria Bayesiana para Atualização de Crenças

A inferência bayesiana fornece um framework matemático rigoroso para atualizar crenças à medida que novas evidências são coletadas. Dado um prior $P(\theta)$ sobre parâmetros do sistema e dados observados $D$, o posterior é:

$$P(\theta | D) = \frac{P(D | \theta) \cdot P(\theta)}{P(D)}$$

Para sistemas de IA, isto permite:
1. **Calibração de confiança:** Ajustar estimativas de probabilidade conforme mais dados de validação são coletados
2. **Detecção de drift:** Identificar quando o comportamento do sistema muda significativamente
3. **Tomada de decisão sequencial:** Decidir quando há evidência suficiente para deployment

**Aplicação:** O framework BIRD (Bayesian Inference for Reliable Development) utiliza inferência bayesiana para quantificar incerteza em respostas de LLMs, permitindo que sistemas rejeitem consultas quando a confiança é insuficiente (BIRD, 2025).

## 2. Estatística para Validação de Sistemas de IA

### 2.1 Amostragem e Representatividade

A validação estatística de sistemas de IA depende criticamente da qualidade da amostra utilizada. Diferente de sistemas determinísticos, onde testes podem ser exaustivos, sistemas de IA operam em espaços de entrada vastos (praticamente infinitos para linguagem natural), tornando a amostragem adequada essencial (Olamendy, 2025).

**Amostragem Aleatória Simples:** Cada elemento da população tem probabilidade igual de ser selecionado. Formalmente, uma amostra $S$ de tamanho $n$ de uma população $P$ de tamanho $N$ é aleatória simples se:

$$P(S) = \frac{1}{\binom{N}{n}}$$

**Amostragem Estratificada:** A população é dividida em estratos homogêneos, e amostras são retiradas de cada estrato. Para sistemas de IA, estratos podem ser:
- Complexidade da tarefa (simples, média, complexa)
- Domínio do problema (web, mobile, backend, etc.)
- Tipo de saída esperada (código, teste, documentação)

Se a população é dividida em $L$ estratos com tamanhos $N_1, N_2, ..., N_L$, o estimador estratificado da média é:

$$\bar{y}_{st} = \sum_{h=1}^{L} W_h \bar{y}_h$$

onde $W_h = N_h/N$ é a fração populacional do estrato $h$.

**Amostragem por Importância:** Para validação de edge cases, podemos amostrar de uma distribuição $q$ diferente da distribuição real $p$, ponderando os resultados:

$$\mathbb{E}_p[f(X)] = \mathbb{E}_q\left[f(X) \frac{p(X)}{q(X)}\right]$$

### 2.2 Intervalos de Confiança e Margens de Erro

Um **intervalo de confiança** fornece uma faixa de valores plausíveis para um parâmetro populacional, com um nível de confiança especificado (tipicamente 95%).

Para uma proporção amostral $\hat{p}$ baseada em $n$ observações, o intervalo de confiança de 95% é:

$$\hat{p} \pm z_{0.025} \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

onde $z_{0.025} \approx 1.96$.

**Implicação Prática:** Se um sistema de IA é testado em 100 exemplos e acerta 85, o intervalo de confiança de 95% para a verdadeira acurácia é aproximadamente $[78\%, 92\%]$. Um engenheiro que reporta apenas "85% de acurácia" sem margem de erro está transmitindo uma falsa precisão (Olamendy, 2025).

Para métricas contínuas (e.g., tempo de resposta), com média amostral $\bar{x}$ e desvio padrão amostral $s$:

$$\bar{x} \pm t_{n-1, 0.025} \cdot \frac{s}{\sqrt{n}}$$

onde $t_{n-1, 0.025}$ é o quantil da distribuição t de Student.

### 2.3 Testes de Hipótese para Comparação de Sistemas

Testes de hipótese permitem tomar decisões estatisticamente fundamentadas sobre diferenças entre sistemas ou versões.

**Teste t para Duas Amostras:** Para comparar médias de duas versões de um sistema (baseline vs. novo):

$$H_0: \mu_1 = \mu_2 \quad \text{vs} \quad H_1: \mu_1 \neq \mu_2$$

A estatística de teste é:

$$t = \frac{\bar{x}_1 - \bar{x}_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

**Correção para Múltiplas Comparações:** Quando se testam múltiplas hipóteses (e.g., comparar várias versões do sistema), a probabilidade de falsos positivos aumenta. O método de **Bonferroni** divide o nível de significância $\alpha$ pelo número de testes $m$:

$$\alpha_{adj} = \frac{\alpha}{m}$$

**Testes Não-Paramétricos:** Quando as suposições de normalidade não são atendidas, testes como Mann-Whitney U e Kruskal-Wallis são preferíveis.

### 2.4 Análise de Poder e Tamanho de Amostra

A **potência estatística** ($1 - \beta$) é a probabilidade de rejeitar corretamente uma hipótese nula falsa. A análise de poder é crucial para determinar quantos exemplos de teste são necessários.

Para um teste t de duas amostras com tamanhos iguais $n$, o tamanho de amostra necessário para detectar um efeito de tamanho $d$ com potência $1-\beta$ e nível de significância $\alpha$ é aproximadamente:

$$n \approx \frac{2(z_{1-\alpha/2} + z_{1-\beta})^2}{d^2}$$

Para detectar um efeito médio ($d = 0.5$) com 80% de potência e $\alpha = 0.05$:

$$n \approx \frac{2(1.96 + 0.84)^2}{0.25} \approx 64$$

Ou seja, aproximadamente 64 amostras por grupo são necessárias.

## 3. Projeto Experimental em Engenharia de Software com IA

### 3.1 Princípios de Design Experimental

O **design experimental** é a disciplina de planejar experimentos para maximizar a informação obtida enquanto minimiza recursos necessários. Em engenharia de software com IA, experimentos são essenciais para:
- Comparar diferentes modelos ou prompts
- Avaliar o impacto de mudanças no sistema
- Identificar fatores que influenciam a qualidade da saída (Nolte & Tomforde, 2025)

**Princípios Fundamentais:**

1. **Replicação:** Repetição de condições experimentais para estimar variabilidade
2. **Randomização:** Alocação aleatória de tratamentos para eliminar viés
3. **Controle Local:** Agrupamento de unidades experimentais similares

### 3.2 Experimentos Fatoriais

**Experimentos fatoriais** avaliam simultaneamente múltiplos fatores e suas interações. Para $k$ fatores, cada com $l_i$ níveis, o número total de combinações é:

$$N = \prod_{i=1}^{k} l_i$$

Um experimento $2^k$ (dois níveis para cada um dos $k$ fatores) é comum em engenharia de software. Por exemplo, avaliando:
- Modelo (GPT-4 vs. Claude)
- Temperatura (0.0 vs. 0.7)
- Técnica de prompting (zero-shot vs. few-shot)

O modelo linear para um experimento $2^2$ é:

$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \beta_{12} X_1 X_2 + \epsilon$$

onde $X_1, X_2 \in \{-1, +1\}$ representam os níveis dos fatores.

### 3.3 Experimentos A/B e Testes Online

**Experimentos A/B** comparam duas versões de um sistema (controle vs. tratamento) com usuários reais. O framework estatístico envolve:

1. **Randomização:** Usuários são aleatoriamente atribuídos a A ou B
2. **Métricas:** Definição de métricas primárias (success metrics) e de guarda (guardrail metrics)
3. **Análise:** Testes de hipótese para detectar diferenças significativas

**Sequential Testing:** Em vez de fixar o tamanho da amostra a priori, testes sequenciais permitem parar o experimento assim que evidência suficiente é acumulada, economizando tempo e recursos (Statsig, 2025).

### 3.4 Controle de Viés e Validação Externa

**Fontes de Viés em Experimentos com IA:**
- **Viés de seleção:** Amostra não representativa da população alvo
- **Viés de confirmação:** Interpretação favorável a hipóteses pré-concebidas
- **Viés de publicação:** Tendência a reportar apenas resultados positivos
- **Viés de simulação:** Diferenças entre ambiente de teste e produção

**Técnicas de Mitigação:**
- **Blinding:** Ocultar qual versão está sendo testada
- **Pré-registro:** Registrar hipóteses e métodos antes da execução
- **Cross-validation:** Validação em múltiplos folds ou conjuntos de dados
- **Validação externa:** Teste em dados completamente independentes

## 4. Quantificação de Incerteza em LLMs

### 4.1 Tipos de Incerteza

A **quantificação de incerteza** (Uncertainty Quantification - UQ) é crítica para sistemas de IA confiáveis. Distinguimos dois tipos fundamentais (Yang et al., 2025):

**Incerteza Aleatória (Aleatoric):** Incerteza inerente aos dados, irredutível. Modelada pela likelihood $P(Y|X,\theta)$.

**Incerteza Epistêmica:** Incerteza devido ao conhecimento limitado do modelo, reduzível com mais dados ou melhor modelagem. Modelada pela posterior $P(\theta|D)$.

No contexto de LLMs, a distinção é crucial:
- Uma pergunta ambígua gera **incerteza aleatória** (múltiplas respostas válidas)
- Uma pergunta fora da distribuição de treinamento gera **incerteza epistêmica**

### 4.2 Métodos de Quantificação de Incerteza

**Métodos Baseados em Amostragem:**

1. **Ensemble Methods:** Múltiplos modelos ou checkpoints produzem distribuição de respostas
2. **MC Dropout:** Dropout ativado durante inferência para aproximar inferência bayesiana
3. **Temperature Scaling:** Ajuste da distribuição de probabilidade para calibração

Para uma resposta gerada $y$ dado input $x$, a entropia mede incerteza:

$$H(Y|X=x) = -\sum_{y} P(y|x) \log P(y|x)$$

**Métodos Específicos para LLMs (LUQ Framework):**

O toolkit LUQ (Language Models Uncertainty Quantification) unifica abordagens (Nikitin et al., 2025):

| Método | Tipo | Descrição |
|--------|------|-----------|
| **Predictive Entropy** | White-box | Entropia sobre tokens de saída |
| **Semantic Entropy** | Black-box | Entropia sobre significados (clusters semânticos) |
| **Lexical Similarity** | Black-box | Similaridade entre múltiplas amostras |
| **Self-Consistency** | LLM Judge | Consistência entre múltiplas gerações |

### 4.3 Detecção de Alucinações via Incerteza

**Alucinações** — respostas plausíveis mas incorretas — são o principal desafio de confiabilidade em LLMs. Métodos de UQ podem detectá-las:

**Abordagem por Consistência:** Gerar múltiplas respostas para a mesma query e medir consistência. Baixa consistência indica alta probabilidade de alucinação.

**Abordagem por Verificação de Fatos:** Utilizar retrieval aumentado para verificar afirmações em tempo real. A incerteza pode ser quantificada pela disponibilidade e qualidade de fontes de evidência.

**Uncertainty Heads:** Shelmanov et al. (2025) propuseram cabeças de incerteza treináveis que predizem a probabilidade de alucinação diretamente a partir das representações internas do modelo.

### 4.4 Calibração de Confiança

Um modelo é **bem calibrado** quando sua confiança predita corresponde à frequência real de acerto. Formalmente, para confiança predita $p$:

$$\text{accuracy}(\{x: \hat{P}(y|x) = p\}) \approx p$$

**Métodos de Calibração:**
- **Platt Scaling:** Ajuste logistico dos scores
- **Isotonic Regression:** Regressão isotônica não-paramétrica
- **Temperature Scaling:** Escala simples e efetiva para classificadores

Para LLMs, a calibração é desafiadora devido à natureza sequencial da geração e ao espaço de saída vasto.

## 5. Oráculos Probabilísticos para Verificação

### 5.1 Limitações dos Oráculos Determinísticos

Oráculos de teste tradicionais são **determinísticos:** para uma entrada, existe uma única resposta correta. Esta abordagem falha para sistemas de IA onde múltiplas respostas podem ser igualmente válidas.

Considere a tarefa: "Escreva uma função que ordene uma lista". Existem milhares de implementações corretas (quicksort, mergesort, heapsort, etc.), cada uma com variações sintáticas. Um oráculo determinístico precisaria enumerar todas as possibilidades — inviável na prática.

### 5.2 Definição Formal de Oráculos Probabilísticos

Um **oráculo probabilístico** $\mathcal{O}$ é uma função que mapeia uma entrada $x$ e uma saída candidata $y$ para uma distribuição de probabilidade sobre vereditos:

$$\mathcal{O}(x, y) \rightarrow \{P(\text{correct}|x,y), P(\text{incorrect}|x,y)\}$$

O oráculo pode ser:
- **Completo:** $P(\text{correct}|x,y) = 1$ se $y$ é correto, 0 caso contrário
- **Somente-som:** $P(\text{correct}|x,y) > 0$ implica $y$ é correto
- **Aproximado:** Fornece estimativa de probabilidade

### 5.3 Implementação via Métodos Formais Estocásticos

**Verificação Probabilística de Programas:**

Para código gerado por IA, podemos empregar verificação estática combinada com análise probabilística (Faria et al., 2026):

1. **Geração de Anotações:** LLMs geram pré-condições, pós-condições e invariantes
2. **Verificação Simbólica:** Verificador (e.g., Dafny, Coq) tenta provar correção
3. **Estimativa de Probabilidade:** Se a prova falha, quantificar a probabilidade de erro

**Verificação por Amostragem:**

Quando verificação exaustiva é impraticável, a **verificação por amostragem** fornece garantias probabilísticas:

$$P(\text{erro não detectado}) \leq (1 - p)^n$$

onde $p$ é a probabilidade de atingir um estado de erro em uma execução e $n$ é o número de testes.

### 5.4 Oráculos Híbridos: Combinando Formal e Estatístico

**Arquitetura de Oráculo Híbrido:**

```
Entrada (x, y)
    ↓
[Verificador Formal] → {Prova, Contra-exemplo, Indeterminado}
    ↓
[Análise Estatística] → Score de Confiança
    ↓
[Decisão] → {Aceitar, Rejeitar, Revisão Humana}
```

**Exemplo:** O framework PSV (Propose, Solve, Verify) substitui testes unitários por verificadores formais. O verificador exige uma prova matemática de que o código satisfaz a especificação para todas as entradas, não apenas para casos de teste (Campos, 2026).

### 5.5 Certificados de Verificação para IA

**Certificação** em machine learning refere-se à produção de garantias verificáveis junto com as predições (Barrett et al., 2025):

$$\text{Sistema}(x) \rightarrow (y, \text{certificado})$$

O certificado pode ser verificado independentemente, garantindo que a resposta $y$ satisfaz propriedades desejadas (e.g., robustez, fairness, correção).

## 6. Teoria da Informação para Engenharia de IA

### 6.1 Entropia e Informação Mútua

A **entropia** de Shannon quantifica a incerteza em uma distribuição de probabilidade:

$$H(X) = -\sum_{x} P(x) \log P(x)$$

Para sistemas de IA, entropia mede:
- Incerteza do modelo sobre a resposta
- Complexidade da tarefa
- Informação contida nos embeddings

A **informação mútua** entre duas variáveis mede a redução de incerteza:

$$I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X)$$

Aplicações incluem:
- Seleção de features para prompts
- Avaliação de alinhamento entre modelos
- Compressão de representações

### 6.2 Compressão e Eficiência

A teoria da informação estabelece limites fundamentais para compressão. O **teorema da codificação de fonte** (Shannon) afirma que o número médio mínimo de bits necessários para codificar uma fonte é a entropia da fonte.

Para LLMs, isto implica:
- **Limites de compressão:** Modelos não podem comprimir informação além da entropia
- **Trade-off compressão-geralização:** Modelos que comprimem bem tendem a generalizar melhor
- **Eficiência de representação:** Embeddings devem preservar informação relevante

### 6.3 Capacidade de Canal e Comunicação Humano-IA

O **teorema da codificação de canal** define a capacidade máxima de transmissão de informação:

$$C = \max_{P(X)} I(X;Y)$$

No contexto de engenharia de software com IA:
- **Canal:** Interface entre engenheiro e sistema de IA
- **Ruído:** Ambiguidade em prompts, alucinações
- **Capacidade:** Taxa máxima de transferência de especificação

Compreender estes limites ajuda a projetar prompts mais efetivos e interfaces mais robustas.

## Practical Considerations

### 6.1 Trade-offs Estatísticos na Prática

**Precisão vs. Custo:**
- Intervalos de confiança mais estreitos requerem mais amostras
- Aumentar $n$ por fator 4 reduz margem de erro pela metade
- Análise de poder deve ser realizada *antes* da coleta de dados

**Potência vs. Significância:**
- Reduzir $\alpha$ (mais rigoroso) diminui potência
- Para experimentos exploratórios, $\alpha = 0.10$ pode ser aceitável
- Para validação final, $\alpha = 0.01$ ou menor é recomendado

### 6.2 Armadilhas Comuns em Validação de IA

1. **Viés de Seleção de Dados:** Usar o mesmo conjunto para desenvolvimento e validação
2. **Múltiplas Comparações Não Corrigidas:** Testar muitas hipóteses sem ajuste
3. **P-hacking:** Continuar coletando dados até obter significância
4. **Overfitting a Métricas:** Otimizar para métricas que não capturam qualidade real
5. **Ignorar Efeitos de Tamanho:** Significância estatística ≠ importância prática

### 6.3 Ferramentas e Frameworks

**Bibliotecas Python:**
- `scipy.stats`: Testes estatísticos fundamentais
- `statsmodels`: Modelagem estatística avançada
- `scikit-learn`: Validação cruzada, métricas
- `numpy`: Computação numérica

**Frameworks Especializados:**
- **LUQ:** Quantificação de incerteza para LLMs (Nikitin et al., 2025)
- **Ax:** Otimização e experimentação adaptativa (Meta, 2025)
- **Statsig:** Experimentação em larga escala (Statsig, 2025)

### 6.4 Integração com Pipeline de Desenvolvimento

**CI/CD Estatístico:**
- Executar testes estatísticos automatizados em cada build
- Falhar o pipeline se regressões significativas forem detectadas
- Manter dashboards de métricas com intervalos de confiança

**Monitoramento Contínuo:**
- Tracking de métricas em produção
- Detecção de drift estatístico
- Alertas para degradação de performance

## Summary

- **Probabilidade e Estatística:** Fundamentais para raciocinar sobre sistemas não-determinísticos; engenheiros devem dominar intervalos de confiança, testes de hipótese e análise de poder

- **Projeto Experimental:** Princípios de randomização, replicação e controle são essenciais para validação rigorosa; experimentos fatoriais e A/B tests fornecem insights causais

- **Quantificação de Incerteza:** Distinguir incerteza aleatória de epistêmica; métodos como entropia preditiva e self-consistency permitem detecção de alucinações

- **Oráculos Probabilísticos:** Necessários quando verificação determinística é impraticável; combinar métodos formais com análise estatística para garantias flexíveis

- **Teoria da Informação:** Fornece limites fundamentais para compressão e comunicação; entropia e informação mútua são ferramentas essenciais para análise de modelos

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Fundamentos matemáticos permanecem essenciais independentemente de avanços tecnológicos |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Requer expertise matemática para validação formal e análise estatística rigorosa |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Moderada** — Base para verificação e garantia de corretude; erros estatísticos podem levar a decisões de deployment inadequadas |

## References

BARRETT, C.; HENZINGER, T. A.; SESHIA, S. A. Certificates in AI: Learn but Verify. *Communications of the ACM*, v. 68, n. 12, p. 56-65, 2025.

BOUCHARD, D.; CHAUHAN, M. S. Uncertainty Quantification for Language Models: A Suite of Black-Box, White-Box, LLM Judge, and Ensemble Scorers. *Transactions on Machine Learning Research*, nov. 2025.

CAMPOS, J. Formal Verification Replaces Probabilistic AI Coding. *LinkedIn*, jan. 2026. Disponível em: https://www.linkedin.com/posts/camposjavier. Acesso em: 31 jan. 2026.

FARIA, J. P. et al. Automatic Generation of Formal Specification and Verification Annotations Using LLMs and Test Oracles. *arXiv preprint arXiv:2601.12845*, 2026.

IEEE COMPUTER SOCIETY. SWEBOK Guide v4.0 - Mathematical Foundations Knowledge Area. 2025.

KLEPPMANN, M. Prediction: AI will make formal verification go mainstream. *Martin Kleppmann's Blog*, dez. 2025. Disponível em: https://martin.kleppmann.com/2025/12/08/ai-formal-verification.html. Acesso em: 31 jan. 2026.

LEE, Y. et al. Compound AI Systems Optimization: A Survey of Methods, Challenges, and Future Directions. In: *Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing*. 2025. p. 28749-28764.

NIKITIN, A.; TRAPP, M.; MARTTINEN, P. LUQ: Language Models Uncertainty Quantification Toolkit. In: *NeurIPS 2025 Workshop on Foundation Models for Science*. 2025.

NOLTE, L.; TOMFORDE, S. A Helping Hand: A Survey About AI-Driven Experimental Design for Accelerating Scientific Research. *Applied Sciences*, v. 15, n. 9, p. 5208, 2025.

OLAMENDY, J. C. The Statistical Reality of LLM Evaluation: What Works, What Doesn't, and When It Matters. *Medium*, nov. 2025.

SHELMANOV, A. et al. A Head to Predict and a Head to Question: Pre-trained Uncertainty Quantification Heads for Hallucination Detection in LLM Outputs. In: *Proceedings of the 2025 Conference on Empirical Methods in Natural Language Processing*. 2025.

STATSIG. Experiments Overview. *Statsig Documentation*, 2025. Disponível em: https://docs.statsig.com/experiments/overview. Acesso em: 31 jan. 2026.

YANG, Y.; YOO, H.; LEE, H. MAQA: Evaluating Uncertainty Quantification in LLMs Regarding Data Uncertainty. In: *Findings of the Association for Computational Linguistics: NAACL 2025*. 2025. p. 5861-5878.

ZHANG, L. The Statistician's Axioms: Finding Our Foundational Role in the LLM Era. *Institute of Mathematical Statistics Bulletin*, nov. 2025.

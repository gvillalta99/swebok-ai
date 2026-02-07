---
title: Unit Economics da IA - KA 15
created_at: 2026-02-09
tags: [unit-economics, tokenomics, latency, cost-modeling, KA-15]
status: published
updated_at: 2026-02-09
ai_model: k2p5
agent: book-writer
---

# 2. Unit Economics da IA (Tokenomics)

Na engenharia de software tradicional, otimizávamos I/O de disco e ciclos de CPU. Na engenharia de IA, otimizamos **Tokens**. O Token é a unidade atômica de custo e performance. Entender sua física é o pré-requisito para qualquer discussão séria sobre viabilidade econômica.

## A Física do Token

Um token não é uma palavra. É um pedaço de palavra (aproximadamente 0.75 palavras em inglês, ou 4 caracteres).

A regra de ouro da economia de LLMs (Large Language Models) é a **Assimetria de Custo**:
- **Ler é barato (Input Tokens):** Processar o contexto é uma operação altamente paralelizável (Matrix Multiplication).
- **Escrever é caro (Output Tokens):** Gerar texto é uma operação sequencial (Auto-regressiva). O modelo precisa prever o próximo token baseando-se em todos os anteriores.

**Razão Típica de Preço:** Output Tokens costumam custar 3x a 10x mais que Input Tokens.

> **Regra Prática:** Se sua aplicação gera muito texto (Creative Writing, Code Generation), ela será inerentemente mais cara que uma aplicação que apenas classifica ou extrai dados (Classification, RAG).

## Context Window Economics

O "Context Window" é a memória de curto prazo do modelo. A capacidade de "ler" livros inteiros (128k, 1M, 2M tokens) mudou o jogo, mas trouxe uma armadilha econômica.

O custo computacional da atenção em arquiteturas Transformer cresce quadraticamente com o tamanho do contexto ($O(n^2)$), embora os provedores de API cobrem linearmente ($O(n)$) para simplificar. Isso significa que enviar um prompt de 100k tokens a cada interação é financeiramente insustentável para a maioria dos use cases.

### A Solução: Prompt Caching

Em 2024, a Anthropic e a Google popularizaram o **Prompt Caching**.
- **O Problema:** Em RAG (Retrieval-Augmented Generation), você envia os mesmos documentos de contexto milhares de vezes.
- **A Solução:** O provedor mantém o estado da atenção (KV Cache) na memória da GPU por um tempo (TTL).
- **O Resultado:** Desconto de até 90% em Input Tokens repetidos e latência muito menor (TTFT).

**Estratégia Econômica:**
Se o seu prompt tem uma parte estática grande (ex: Regras de Negócio, Documentação de API, Style Guide), você deve estruturar sua chamada de API para maximizar o cache hit rate. Coloque o conteúdo estático no início do prompt.

## Latência vs. Throughput vs. Custo

Não existe almoço grátis. Você geralmente escolhe dois:

1.  **Baixa Latência (Low Latency):** O usuário recebe a resposta instantaneamente.
    - *Hardware:* LPUs (Groq), GPUs pequenas com batch size 1.
    - *Custo:* Alto (hardware subutilizado).
2.  **Alto Throughput:** Processar milhões de requisições por hora.
    - *Hardware:* Clusters H100 com batch size massivo.
    - *Custo:* Baixo por token (hardware saturado), mas latência alta para o usuário individual.
3.  **Baixo Custo:**
    - *Hardware:* GPUs antigas (A10G, T4), modelos menores quantizados.
    - *Trade-off:* Qualidade inferior ou latência imprevisível (Spot instances).

## Modelagem de Custo: A Calculadora do CTO

Para aprovar um projeto de IA, você precisa projetar o **Custo por Unidade de Negócio** (ex: Custo por Chat, Custo por Pull Request).

### Fórmula Simplificada

$$
Custo_{Total} = (T_{in} \times P_{in}) + (T_{out} \times P_{out}) + (N_{reqs} \times C_{tool})
$$

Onde:
- $T_{in}$: Média de tokens de entrada (Prompt + Contexto + RAG chunks).
- $P_{in}$: Preço por 1M tokens de entrada.
- $T_{out}$: Média de tokens de saída (Resposta gerada).
- $P_{out}$: Preço por 1M tokens de saída.
- $C_{tool}$: Custo de chamadas de ferramentas externas (Search API, Vector DB lookup).

### Exemplo: Code Assistant Interno

- **Modelo:** GPT-4o ou Claude 3.5 Sonnet.
- **Prompt Médio:** 4.000 tokens (Contexto do arquivo atual + arquivos relacionados).
- **Resposta Média:** 200 tokens (Sugestão de código).
- **Uso:** 50 devs x 20 sugestões/dia = 1.000 reqs/dia.

**Cálculo Diário (Estimado com preços de 2025):**
- Input: 1.000 reqs x 4k tokens = 4M tokens.
  - @ $2.50/1M = $10.00
- Output: 1.000 reqs x 200 tokens = 0.2M tokens.
  - @ $10.00/1M = $2.00
- **Total:** $12.00/dia ou ~$250/mês.

**Análise:** $250/mês para acelerar 50 devs é um ROI absurdo (positivo). O perigo é quando o uso escala para milhões de usuários externos sem um modelo de monetização claro.

## A Importância do "Small Language Model" (SLM)

A maior alavanca econômica é **reduzir o tamanho do modelo**.

- **GPT-4 / Opus:** O "Doutor". Custa $$. Use para arquitetura e raciocínio complexo.
- **GPT-4o-mini / Haiku:** O "Estagiário Inteligente". Custa ¢. Use para extração, classificação, resumo e tarefas simples.
- **Llama 3 8B:** O "Script Local". Custo marginal zero (se rodar no device).

**Padrão Econômico:** Use o modelo mais burro possível que ainda resolve o problema. Faça downgrade agressivo de modelos em produção.

## Próximos Passos

Agora que entendemos o custo do token, a pergunta estratégica se torna: Devo pagar à OpenAI por esses tokens ou devo comprar minhas próprias GPUs e gerar meus tokens? É o tema do próximo capítulo: **Build vs. Buy**.

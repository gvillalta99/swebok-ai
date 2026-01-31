---
title: "16.1 Fundamentos de Sistemas Cognitivos Artificiais"
created_at: "2026-01-31"
tags: ["swebok-ai", "llm", "transformers", "rag", "embeddings", "computing-foundations"]
status: "published"
updated_at: "2026-01-31"
ai_model: "kimi-k2.5"
---

# 16.1 Fundamentos de Sistemas Cognitivos Artificiais

## Overview

Este capítulo estabelece os fundamentos computacionais da era pós-transformer, reconhecendo que Large Language Models (LLMs) e sistemas cognitivos artificiais tornaram-se componentes de primeira classe na infraestrutura de software. Enquanto o SWEBOK v4.0 focava em arquiteturas de computadores tradicionais, estruturas de dados clássicas e algoritmos determinísticos, a versão 5.0 recontextualiza esses conceitos para um paradigma onde a computação probabilística complementa — e frequentemente substitui — a execução determinística.

O engenheiro de software moderno deve compreender não apenas como um computador executa instruções, mas como um modelo de linguagem gera distribuições de probabilidade sobre tokens, como o contexto é mantido e limitado, e como sistemas de recuperação aumentam a geração. Este conhecimento é fundamental para arquitetar, projetar, construir e manter sistemas de software que incorporam componentes de IA de forma eficaz, auditável e economicamente viável.

A transição proposta não descarta o conhecimento computacional tradicional, mas o **recontextualiza**: estruturas de dados tradicionais tornam-se relevantes para bancos de dados vetoriais; complexidade algorítmica ganha uma nova dimensão com o custo de inferência; e arquitetura de computadores expande-se para incluir hardware especializado em ML (GPUs, TPUs, NPUs).

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Explicar o funcionamento interno de LLMs**, incluindo mecanismos de predição de tokens, gerenciamento de janela de contexto e causas de alucinações, demonstrando compreensão dos trade-offs entre geração probabilística e execução determinística.

2. **Analisar arquiteturas Transformer e mecanismos de atenção**, calculando complexidade computacional O(n²), identificando otimizações modernas (FlashAttention, atenção esparsa) e avaliando sua aplicabilidade em cenários de processamento de linguagem natural e visão computacional.

3. **Projetar sistemas RAG (Retrieval-Augmented Generation)** eficientes, selecionando estratégias adequadas de chunking de documentos, algoritmos de indexação vetorial e métricas de avaliação, considerando trade-offs entre latência, custo e qualidade da recuperação.

## 1. Large Language Models: Fundamentos e Comportamento

### 1.1 Arquitetura e Mecanismo de Predição

Large Language Models (LLMs) são arquiteturas de rede neural baseadas no Transformer que modelam a probabilidade condicional de sequências de tokens. Formalmente, um LLM calcula:

$$P(w_1, w_2, ..., w_n) = \prod_{t=1}^{n} P(w_t | w_1, ..., w_{t-1})$$

Onde $w_t$ representa o token na posição $t$ do vocabulário. Esta formulação, conhecida como **autoregressive modeling** (modelagem autorregressiva), permite que o modelo gere texto token por token, condicionando cada predição em todos os tokens anteriores.

A arquitetura dominante em LLMs modernos é o **decoder-only Transformer**, exemplificado por modelos como GPT-4, Claude e Llama. Diferentemente da arquitetura encoder-decoder original proposta por Vaswani et al. (2017), os modelos decoder-only empregam **causal masking** (mascaramento causal) na camada de atenção, garantindo que cada token só possa atender a tokens anteriores na sequência.

O processo de geração envolve:

1. **Tokenização**: Conversão de texto em tokens do vocabulário
2. **Embedding**: Mapeamento de tokens para representações vetoriais densas
3. **Processamento por camadas Transformer**: Aplicação sequencial de blocos contendo mecanismos de atenção e redes feed-forward
4. **Projeção de saída**: Transformação do estado oculto final em logits sobre o vocabulário
5. **Amostragem**: Seleção do próximo token baseada na distribuição de probabilidade

A etapa de amostragem é controlada por hiperparâmetros que afetam diretamente a criatividade e coerência do texto gerado:

- **Temperature**: Controla a entropia da distribuição. Valores baixos (< 0.5) produzem texto mais determinístico; valores altos (> 1.0) aumentam a aleatoriedade.
- **Top-k**: Restrita a amostragem aos k tokens mais prováveis
- **Top-p (nucleus sampling)**: Seleciona o conjunto mínimo de tokens cuja probabilidade cumulativa excede p

### 1.2 Mecanismos Internos e Interpretabilidade

A pesquisa em **mechanistic interpretability** (interpretabilidade mecanicista) tem revelado como LLMs processam informação internamente. Técnicas como **circuit tracing** (rastreamento de circuitos) identificam subgrafos funcionais dentro da rede neural que correspondem a comportamentos específicos, como recuperação factual ou operações aritméticas.

Uma abordagem recente envolve o uso de **cross-layer transcoders**, que substituem blocos MLP (Multi-Layer Perceptron) por representações lineares interpretáveis. Essa técnica permite:

- Identificar features esparsas e semanticamente significativas
- Mapear circuitos responsáveis por comportamentos específicos
- Validar hipóteses através de experimentos de perturbação

Estudos demonstram que LLMs contêm sub-redes especializadas para tarefas como:
- Recuperação de fatos factuals
- Operações matemáticas básicas
- Processamento de entidades nomeadas
- Análise sintática

### 1.3 Janela de Contexto e Suas Limitações

A **janela de contexto** (context window) de um LLM define o número máximo de tokens que podem ser processados em uma única inferência. Limitações típicas incluem:

| Modelo | Janela de Contexto | Ano |
|--------|-------------------|-----|
| GPT-3 | 2.048 tokens | 2020 |
| GPT-4 | 8.192 / 32.768 tokens | 2023 |
| Claude 3 | 200.000 tokens | 2024 |
| Gemini 1.5 | 1.000.000+ tokens | 2024 |
| Llama 3 | 128.000 tokens | 2024 |

Além da limitação de tamanho, surge o problema do **lost in the middle** (perdido no meio): modelos tendem a ignorar informações posicionadas no meio de contextos longos, concentrando-se no início e no fim da sequência.

**Estratégias de gerenciamento de contexto**:

1. **Hierarchical Retrieval**: Divisão do contexto em níveis hierárquicos, com sumarização progressiva
2. **Sliding Window**: Processamento sequencial com sobreposição de janelas
3. **Late Fusion**: Atendimento apenas a vetores de sumarização em camadas finais
4. **Semantic Chunking**: Segmentação baseada em coerência semântica em vez de tamanho fixo

### 1.4 Alucinações: Causas e Mitigação

**Alucinações** em LLMs referem-se à geração de informações factuais incorretas, inconsistentes ou fabricadas. Estudos identificam três categorias principais:

1. **Factual Hallucinations**: Afirmações contraditórias aos fatos verificáveis
2. **Faithfulness Hallucinations**: Desvios em relação às instruções ou ao contexto fornecido
3. **Intrinsic Hallucinations**: Contradições internas na própria geração

**Causas fundamentais**:

- **Correlações espúrias nos dados de treinamento**: O modelo aprende padrões estatísticos que não correspondem a relações causais reais
- **Ambiguidade nos prompts**: Instruções vagas permitem múltiplas interpretações
- **Amostragem estocástica**: A natureza probabilística da geração introduz variabilidade
- **Limitações de conhecimento**: O modelo não tem acesso a informações atualizadas ou específicas de domínio

**Técnicas de mitigação** (mais de 32 métodos identificados na literatura recente):

| Categoria | Técnica | Descrição |
|-----------|---------|-----------|
| Retrieval-based | RAG | Grounding em documentos recuperados |
| Consistency | Self-Consistency | Votação majoritária entre múltiplas amostras |
| Contrastive | CoNLI, CoVe | Aprendizado contrastivo para verificação |
| Post-hoc | Chain-of-Verification | Verificação em cadeia após geração |

Estudos empíricos demonstram que a combinação de recuperação com verificação pós-geração reduz erros factuais em até 45% em tarefas de QA de domínio aberto.

## 2. Arquitetura Transformer e Mecanismos de Atenção

### 2.1 Fundamentos da Atenção

O mecanismo de **self-attention** (auto-atenção) é o componente central da arquitetura Transformer, permitindo que o modelo capture dependências entre todos os pares de tokens na sequência, independentemente de sua distância.

Formalmente, para uma sequência de entrada $X \in \mathbb{R}^{n \times d_{model}}$, a atenção calcula:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

Onde:
- $Q = XW_Q$ (queries)
- $K = XW_K$ (keys)  
- $V = XW_V$ (values)
- $d_k$ é a dimensão dos vetores de key

O fator de escala $\frac{1}{\sqrt{d_k}}$ previne que os valores de softmax se tornem extremamente pequenos em dimensões altas, mantendo gradientes estáveis durante o treinamento.

### 2.2 Multi-Head Attention

**Multi-head attention** (atenção multi-cabeça) permite que o modelo atenda a informação de diferentes subespaços de representação em paralelo:

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h)W_O$$

Onde cada cabeça é calculada como:

$$\text{head}_i = \text{Attention}(XW_{Q_i}, XW_{K_i}, XW_{V_i})$$

O número de cabeças (tipicamente 8, 16 ou 32) e a dimensionalidade de cada cabeça são hiperparâmetros que afetam a capacidade expressiva do modelo.

### 2.3 Complexidade Computacional e Otimizações

A complexidade computacional do mecanismo de atenção padrão é **O(n²)** em relação ao comprimento da sequência $n$, devido ao cálculo de similaridade entre todos os pares de tokens:

| Operação | Complexidade | Memória |
|----------|--------------|---------|
| Self-Attention | O(n² · d) | O(n²) |
| Feed-Forward | O(n · d²) | O(n · d) |
| Camada Completa | O(n² · d + n · d²) | O(n² + n · d) |

Esta complexidade quadrática torna o processamento de sequências longas proibitivamente custoso. Diversas otimizações foram desenvolvidas:

**FlashAttention**: Implementação de kernels GPU otimizados que realizam operações de atenção em blocos (tiling), reduzindo o tráfego de memória HBM (High Bandwidth Memory) e alcançando speedups de até 2× sem aproximação.

**Atenção Esparsa**: Métodos como BigBird e Longformer restringem a atenção a:
- Janelas locais (tokens próximos)
- Tokens globais (acessíveis por todos)
- Padrões dilatados (atendimento espaçado)

Estas abordagens reduzem a complexidade para próximo de **O(n)** mantendo desempenho em benchmarks de contexto longo.

**Atenção Linearizada**: Algoritmos como Performer projetam queries e keys em espaços de características de baixa dimensionalidade, aproximando o softmax através de métodos de características aleatórias em tempo linear O(n).

**Core Context Aware Attention**: Módulos recentes combinam caching de tokens globais com máscaras de localidade aprendidas, permitindo processar contextos superiores a 64K tokens com custo sub-quadrático.

### 2.4 Vision Transformers e Aplicações Multimodais

**Vision Transformers (ViT)** aplicam a arquitetura Transformer a patches de imagem, tratando-os como sequências de tokens. A abordagem:

1. Divide a imagem em patches (ex: 16×16 pixels)
2. Lineariza cada patch em um vetor de embedding
3. Adiciona embeddings posicionais
4. Processa através de camadas Transformer padrão

Extensões multimodais como **CLIP** (Contrastive Language-Image Pre-training) aprendem embeddings conjuntos texto-imagem, permitindo:
- Classificação zero-shot de imagens
- Recuperação de imagens por texto
- Alinhamento de espaços visuais e linguísticos

Arquiteturas multimodais recentes incorporam camadas de **cross-attention** (atenção cruzada) para fusão de modalidades, com aplicações em:
- Compreensão de documentos
- Geração áudio-visual
- Modelagem de linguagem visual

## 3. Sistemas de Recuperação Aumentada (RAG)

### 3.1 Arquitetura e Padrões

**Retrieval-Augmented Generation (RAG)** combina sistemas de recuperação de informação com LLMs, permitindo que o modelo acesse conhecimento externo e atualizado durante a inferência.

A arquitetura básica consiste em dois componentes:

1. **Retriever**: Sistema que recupera documentos relevantes de uma base de conhecimento
2. **Generator**: LLM que condiciona a geração nos documentos recuperados

**Padrões arquiteturais principais**:

| Padrão | Descrição | Caso de Uso |
|--------|-----------|-------------|
| RAG-Sequence | Documentos concatenados no prompt | QA factual simples |
| Fusion-in-Decoder | Embeddings agregados via cross-attention | Geração complexa |
| Iterative RAG | Múltiplos ciclos de recuperação-geração | Respostas elaboradas |
| Self-RAG | Modelo avalia necessidade de recuperação | Eficiência computacional |

O fluxo de dados em um sistema RAG típico:

```
Query do Usuário → Embedding → Busca Vetorial → 
Top-k Documentos → Concatenação com Prompt → 
LLM → Resposta Gerada
```

### 3.2 Estratégias de Chunking de Documentos

A segmentação eficaz de documentos (**chunking**) é crítica para o desempenho de sistemas RAG. Estudos comparativos identificam três abordagens principais:

1. **Fixed-length Token Chunking**: Divisão em blocos de tamanho fixo (ex: 512 tokens)
   - *Vantagem*: Simplicidade de implementação
   - *Desvantagem*: Quebra de coerência semântica

2. **Paragraph-based Chunking**: Segmentação por parágrafos ou seções estruturais
   - *Vantagem*: Preservação de unidades semânticas
   - *Desvantagem*: Tamanho variável pode causar inconsistências

3. **Semantic Coherence Chunking**: Uso de mínimos locais de perplexidade para identificar fronteiras semânticas naturais
   - *Vantagem*: Melhora Recall@5 em 8-12% sobre slicing ingênuo
   - *Desvantagem*: Requer processamento adicional

**Melhores práticas**:
- Overlap entre chunks (tipicamente 10-20%) para preservar contexto
- Tamanho de chunk balanceado entre granularidade e contexto (256-1024 tokens)
- Chunking hierárquico para documentos longos

### 3.3 Métricas de Avaliação

A qualidade de sistemas RAG é avaliada através de múltiplas dimensões:

**Métricas de Recuperação**:
- **Recall@k**: Proporção de documentos relevantes entre os k recuperados
- **MRR (Mean Reciprocal Rank)**: Média dos inversos das posições do primeiro documento relevante
- **nDCG (Normalized Discounted Cumulative Gain)**: Consideração da ordenação por relevância

**Métricas de Geração**:
- **BLEU/ROUGE**: Similaridade com referências
- **Factuality Scores**: Verificação automática de fatos
- **Faithfulness**: Alinhamento entre resposta e documentos fonte

**Benchmarks**: BEIR (Benchmarking IR) fornece avaliação zero-shot de recuperação em diversos domínios.

### 3.4 Agentic RAG e Padrões Avançados

**Agentic RAG** integra recuperação dentro de loops autônomos de agentes, utilizando arquiteturas planner-executor:

1. **Planner**: Decompõe a query em sub-tarefas
2. **Retriever**: Executa buscas especializadas para cada sub-tarefa
3. **Reasoner**: Sintetiza informações recuperadas
4. **Tool Invoker**: Aciona ferramentas externas quando necessário

Sistemas como AutoRAG intercalam recuperação, raciocínio e invocação de ferramentas para realizar tarefas multi-step complexas.

## 4. Bancos de Dados Vetoriais e Embeddings

### 4.1 Modelos de Embedding

**Embeddings** são representações vetoriais densas que capturam significado semântico de dados. Modelos populares incluem:

**Textuais**:
- OpenAI text-embedding-ada-002 (1.536 dimensões)
- Sentence-BERT (SBERT) para similaridade semântica
- E5 (EmbEddings from bidirEctional Encoder rEpresentations)
- Multilingual-e5 para aplicações multilíngues

**Multimodais**:
- CLIP: Alinhamento texto-imagem
- ALIGN: Escalado para bilhões de pares imagem-texto
- ImageBind: Unificação de seis modalidades (texto, imagem, áudio, profundidade, térmico, movimento)

A qualidade de um embedding é medida por sua capacidade de posicionar semanticamente similares próximos no espaço vetorial, tipicamente usando **cosine similarity** (similaridade de cosseno):

$$\text{similarity}(A, B) = \frac{A \cdot B}{\|A\| \|B\|}$$

### 4.2 Algoritmos de Indexação Vetorial

Para busca eficiente em grandes coleções de vetores (milhões a bilhões), são empregados algoritmos de indexação aproximada:

**HNSW (Hierarchical Navigable Small Worlds)**:
- Constrói grafo multi-camada navegável
- Complexidade de busca: O(log n)
- Alto recall, custo de memória moderado

**IVF (Inverted File System)**:
- Particiona o espaço vetorial em células (clusters)
- Busca apenas nas células mais próximas da query
- Balanceável entre precisão e velocidade via número de células visitadas (nprobe)

**IVF-PQ (Product Quantization)**:
- Comprime vetores residuais usando quantização de produto
- Reduz drasticamente o uso de memória
- Trade-off controlável entre recall e compressão

### 4.3 Bancos de Dados Vetoriais

| Sistema | Algoritmo Principal | Características |
|---------|---------------------|-----------------|
| Pinecone | HNSW | Gerenciado, auto-scaling, filtros metadata |
| Weaviate | HNSW | GraphQL API, semantic ranking integrado |
| Milvus | IVF, HNSW, GPU | Armazenamento híbrido, aceleração GPU |
| pgvector | IVF, HNSW | Extensão PostgreSQL, deployment local |
| Chroma | HNSW | Foco em desenvolvimento, integração LLM |
| Qdrant | HNSW | Filtros avançados, deployment edge |

**Trade-offs de seleção**:
- **Precisão vs. Latência**: HNSW oferece melhor recall; IVF+PQ melhor throughput
- **Memória vs. Velocidade**: Índices comprimidos economizam RAM mas aumentam latência
- **Escalabilidade**: Soluções gerenciadas (Pinecone) vs. self-hosted (Milvus, pgvector)

## 5. Custo de Inferência vs. Execução Determinística

### 5.1 Análise de Custos de Inferência

O custo de inferência de LLMs é determinado por:

1. **Custo computacional**: Operações de matriz em GPUs/TPUs
2. **Custo de serviço**: Preço por token cobrado por APIs comerciais
3. **Custo de infraestrutura**: Amortização de hardware para deployment próprio

**Preços típicos de APIs comerciais (2025)**:

| Modelo | Input (por 1K tokens) | Output (por 1K tokens) |
|--------|----------------------|------------------------|
| GPT-4 8K | $0.03 | $0.06 |
| GPT-4 32K | $0.06 | $0.12 |
| GPT-3.5 Turbo | $0.0015 | $0.002 |
| Claude 3 Opus | $0.015 | $0.075 |

Para deployment próprio em CPU, custos estimados variam entre $0.001-0.005 por 1K tokens, dependendo da eficiência do hardware.

### 5.2 Comparação com Algoritmos Determinísticos

| Aspecto | Algoritmo Determinístico | LLM |
|---------|-------------------------|-----|
| Complexidade | Tipicamente O(n log n) ou melhor | O(n²) para atenção |
| Custo marginal | Zero (após desenvolvimento) | Por token inferido |
| Latência | Previsível, baixa variância | Variável, depende de tamanho da saída |
| Flexibilidade | Rígida, requer reimplementação | Alta, adaptável via prompting |
| Explicabilidade | Total | Parcial (interpretabilidade em desenvolvimento) |

### 5.3 Estratégias de Otimização

**Quantização**: Redução da precisão numérica de pesos do modelo:
- INT8: Reduz memória em 50%, mantém ~99% da acurácia
- INT4/GPTQ: Reduz memória em 75%, throughput dobrado
- Métodos como AWQ e GPTQ mantêm qualidade com compressão agressiva

**KV Caching**: Reutilização de computações de atenção em decodificação autorregressiva:
- Reduz computação em até 50% em cenários de streaming sequencial
- Essencial para aplicações de chat e geração longa

**Batching e Request Pooling**:
- Amortiza overhead entre requisições concorrentes
- Aumenta throughput mas introduz latência de cauda (tail latency)

**Prompt Caching**: Armazenamento de embeddings de prompts frequentes para evitar recomputação.

### 5.4 Implicações Econômicas para Engenharia de Software

Altos custos de inferência incentivam arquiteturas híbridas:

1. **Offloading para modelos menores**: Tarefas simples processadas por modelos especializados ou regras determinísticas
2. **Roteamento dinâmico**: Seleção automática entre modelos baseada na complexidade da tarefa
3. **Orçamento por token**: Limites de gastos configuráveis em nível de aplicação
4. **Validação de saída**: Verificação determinística de respostas LLM para evitar reprocessamentos

Esta realidade econômica molda práticas de engenharia:
- Sanitização rigorosa de inputs para minimizar tokens desnecessários
- Validação estruturada de outputs antes de aceitação
- Cache agressivo de respostas comuns
- Fallbacks para processamento determinístico quando apropriado

## Practical Considerations

### Aplicações Reais

1. **Sistemas de QA Empresarial**: RAG sobre documentação interna, com chunking semântico e avaliação contínua de métricas de faithfulness

2. **Assistentes de Codificação**: Uso de contexto ampliado (100K+ tokens) para compreensão de bases de código grandes, com KV caching para sessões longas

3. **Processamento de Documentos Multimodais**: Combinação de embeddings de texto e imagem para análise de documentos ricos, utilizando bancos de dados vetoriais com suporte a múltiplos modos

### Limitações e Trade-offs

| Aspecto | Limitação | Mitigação |
|---------|-----------|-----------|
| Custo | Escalabilidade linear com tokens | Caching, quantização, modelos menores |
| Latência | Variável, imprevisível | Batching, warm pools, fallback síncrono |
| Determinismo | Saídas não reproduzíveis | Temperature=0, seed fixing, validação |
| Contexto | Janela limitada | RAG, sumarização hierárquica |

### Melhores Práticas

1. **Hibridização**: Reserve LLMs para tarefas que realmente beneficiam da flexibilidade; use algoritmos determinísticos para processamento estruturado

2. **Observabilidade**: Implemente logging completo de prompts, respostas e métricas de custo/latência

3. **Validação em Camadas**: Combine verificação sintática (schemas), semântica (embeddings) e factual (RAG)

4. **Governança de Custos**: Estabeleça budgets por usuário/sessão e monitore anomalias de consumo

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Fundamentos de LLMs são base para toda a engenharia moderna |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Requer compreensão teórica para validar saídas e identificar alucinações |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — Fundamentos afetam decisões de arquitetura com impacto legal (ex: decisões baseadas em alucinações) |

## Summary

- **LLMs como Componentes Computacionais**: Large Language Models operam através de predição probabilística de tokens, com arquiteturas Transformer dominando o cenário. Compreender seus mecanismos internos, incluindo circuitos especializados e limitações de contexto, é fundamental para engenharia de software moderna.

- **Atenção e Complexidade**: O mecanismo de self-attention, embora poderoso, apresenta complexidade O(n²). Otimizações como FlashAttention, atenção esparsa e linearizada são essenciais para aplicações em escala.

- **RAG como Infraestrutura**: Sistemas de Recuperação Aumentada integram conhecimento externo a LLMs, com decisões de chunking, indexação e avaliação impactando diretamente a qualidade e custo das aplicações.

- **Economia da Inferência**: O custo de inferência de LLMs contrasta drasticamente com execução determinística. Estratégias de otimização (quantização, caching, batching) e arquiteturas híbridas são imperativas para viabilidade econômica.

- **Contexto LEGADO**: Conceitos tradicionais de computação (estruturas de dados, algoritmos, arquitetura de computadores) mantêm relevância como fundamento, mas são recontextualizados para suportar sistemas de IA — por exemplo, hash tables aplicadas a índices vetoriais, e complexidade algorítmica estendida para incluir custo de inferência.

## References

### Fundamentos e Surveys

ZHAO, W. X. et al. A Survey of Large Language Models. *IEEE Transactions on Knowledge and Data Engineering*, 2024. Disponível em: https://arxiv.org/abs/2303.18223

MIN, B. et al. Recent Advances in Natural Language Processing via Large Pre-Trained Language Models: A Survey. *ACM Computing Surveys*, 2024.

GAO, Y. et al. Retrieval-Augmented Generation for Large Language Models: A Survey. *arXiv preprint*, 2024. Disponível em: https://arxiv.org/abs/2312.10997

### Arquitetura Transformer e Atenção

VASWANI, A. et al. Attention Is All You Need. *Advances in Neural Information Processing Systems (NeurIPS)*, 2017. (Clássico fundamental)

TAY, Y. et al. Efficient Transformers: A Survey. *ACM Computing Surveys*, 2024.

DAO, T. et al. FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness. *NeurIPS*, 2022.

### Interpretabilidade e Mecanismos Internos

ANTHROPIC. Circuit Tracing: Revealing Computational Graphs in Language Models. *Transformer Circuits*, 2025. Disponível em: https://transformer-circuits.pub/2025/attribution-graphs/methods.html

CUNNINGHAM, H. et al. Sparse Autoencoders Find Highly Interpretable Features in Language Models. *arXiv preprint*, 2024. Disponível em: https://arxiv.org/abs/2406.11944

### RAG e Sistemas de Recuperação

LEWIS, P. et al. Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. *NeurIPS*, 2020. (Clássico fundamental)

ANTHROPIC. Contextual Retrieval. *Anthropic Research*, 2024. Disponível em: https://www.anthropic.com/news/contextual-retrieval

### Bancos de Dados Vetoriais e Embeddings

MALKOV, Y. A.; YASHUNIN, D. A. Efficient and Robust Approximate Nearest Neighbor Search Using Hierarchical Navigable Small World Graphs. *IEEE Transactions on Pattern Analysis and Machine Intelligence*, 2018.

JÉGOU, H. et al. Product Quantization for Nearest Neighbor Search. *IEEE Transactions on Pattern Analysis and Machine Intelligence*, 2011.

RADFORD, A. et al. Learning Transferable Visual Models From Natural Language Supervision. *International Conference on Machine Learning (ICML)*, 2021. (CLIP)

### Otimização e Quantização

FRANTAR, E. et al. GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers. *ICLR*, 2023.

LIN, J. et al. AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration. *MLSys*, 2024.

### Alucinações e Mitigação

JI, Z. et al. Survey of Hallucination in Natural Language Generation. *ACM Computing Surveys*, 2023.

HUANG, L. et al. A Survey on Hallucination in Large Language Models: Principles, Taxonomy, Challenges, and Open Questions. *arXiv preprint*, 2024. Disponível em: https://arxiv.org/abs/2401.01313

### Documentação Técnica e Reports

OPENAI. GPT-4 Technical Report. *arXiv preprint*, 2023. Disponível em: https://cdn.openai.com/papers/gpt-4.pdf

OPENAI. OpenAI API Pricing. 2025. Disponível em: https://openai.com/pricing

THIRUKOVALLURU, R. et al. RAG-Fair: A Toolkit for Auditing Retrieval-Augmented Generation in Large Language Models. *arXiv preprint*, 2025. Disponível em: https://arxiv.org/abs/2501.07888

---
title: "16.7 Fundamentos Deterministicos LEGADO (Revisao Seletiva)"
created_at: "2026-01-31"
tags: ["fundamentos-computacao", "legado", "estruturas-de-dados", "algoritmos", "sistemas-operacionais", "redes", "complexidade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 16.7 Fundamentos Deterministicos LEGADO (Revisao Seletiva)

## Overview
Este capitulo renomeia “Computing Foundations” para “Fundamentos de Sistemas Cognitivos Artificiais” porque LLMs e sistemas probabilisticos passaram a ser infraestrutura de primeira classe. Ainda assim, um sistema IA-intensive não elimina fundamentos deterministicos: ele os reposiciona.

Nesta secao, o conteudo e explicitamente **LEGADO** no sentido SWEBOK-AI: nao e obsoleto, mas deixa de ser diferencial isolado. O engenheiro precisa desses fundamentos para:

- operar pipelines RAG (concorrencia, I/O, caches, indices);
- depurar sistemas distribuidos (rede, latencia, consistencia);
- entender custos (complexidade, throughput, escalabilidade);
- garantir seguranca e confiabilidade (isolamento, permissao, limites).

## Learning Objectives
Após estudar esta seção, o leitor deve ser capaz de:
1. Relacionar estruturas de dados classicas a componentes de sistemas IA (por exemplo, indices ANN, caches, filas).
2. Reinterpretar complexidade algoritmica incluindo custo de inferencia (tokens, memoria e latencia).
3. Aplicar conceitos de sistemas operacionais (processos, threads, I/O) para operar servicos de inferencia e pipelines.
4. Aplicar fundamentos de redes (timeouts, retries, backpressure) em arquiteturas RAG/agenticas.
5. Reconhecer quando conteudo “baixo nivel” e necessario (debugging de performance, incidentes, auditoria).

## Estruturas de dados (LEGADO, mas indispensavel)
Em sistemas IA, estruturas de dados aparecem com novos nomes e requisitos:

- **Hash tables**: caching de prompts, deduplicacao de documentos, memoizacao de resultados.
- **Arvores e heaps**: schedulers, filas de prioridade, planejamento em workflows.
- **Grafos**: indices como HNSW e grafos de dependencia em pipelines.
- **Filas**: ingestao, processamento assincro, backpressure.

O diferencial nao e conhecer a definicao, mas conectar propriedades (complexidade, localidade de memoria, concorrencia) ao desempenho do sistema.

## Complexidade e custo de inferencia
**LEGADO**: notacao Big-O continua util, mas precisa ser combinada com metricas contemporaneas:

- custo por token (entrada/saida);
- throughput (tokens/s) sob batching;
- memoria por sessao (KV-cache);
- custo de recuperacao (latencia de vector DB).

Na pratica, a complexidade relevante e multidimensional: tempo de CPU/GPU, memoria (HBM/DRAM), I/O e rede.

## Sistemas operacionais e concorrencia
Modelos e pipelines exigem:

- concorrencia (multi-tenant, filas, isolamento);
- gestao de memoria (evitar OOM, controlar caches);
- I/O (ingestao, leitura de corpus, armazenamento de vetores);
- limites (cgroups, quotas, timeouts) para evitar que um fluxo degrade o sistema inteiro.

## Redes e comunicacao
RAG e agentes dependem de chamadas externas (bancos, APIs, ferramentas). Fundamentos de redes se tornam centrais:

- timeouts e retries com backoff;
- idempotencia;
- circuit breakers;
- observabilidade distribuida (tracing).

## Practical Considerations
- **Quando ativar “modo baixo nivel”**: se p95/p99 piora, se custo explode, ou se incidentes envolvem dados, revisite OS/rede/estrutura de dados.
- **Instrumentacao**: logs e traces sao a “fonte de verdade” para depurar sistemas probabilisticos.
- **Evite nostalgia**: detalhes de sintaxe e micro-otimizacoes manuais sao LEGADO; foque em invariantes, SLOs e verificacao.

## Matriz de Avaliação Consolidada
| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Summary
- Fundamentos deterministicos continuam necessarios, mas como suporte para sistemas IA-intensive.
- Estruturas de dados e sistemas operacionais reaparecem como performance engineering e confiabilidade.
- Redes e observabilidade sao criticos porque RAG/agentes aumentam dependencias externas.
- “LEGADO” aqui significa recontextualizado: menos foco em detalhes, mais em invariantes e verificacao.

## References
1. CORMEN, Thomas H.; LEISERSON, Charles E.; RIVEST, Ronald L.; STEIN, Clifford. Introduction to Algorithms. 4. ed. MIT Press, 2022.
2. TANENBAUM, Andrew S.; BOS, Herbert. Modern Operating Systems. 4. ed. Pearson, 2015.
3. KLEPPMANN, Martin. Designing Data-Intensive Applications. O'Reilly, 2017.

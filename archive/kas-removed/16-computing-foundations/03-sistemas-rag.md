---
title: 16.3 Sistemas de Recuperacao Aumentada (RAG)
created_at: '2026-01-31'
tags: [fundamentos-computacao, rag, recuperacao, grounding, avaliacao, arquitetura, observabilidade]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 16.3 Sistemas de Recuperacao Aumentada (RAG)

## Overview

Retrieval-Augmented Generation (RAG) combina um componente de recuperacao
(retriever) com um componente gerador (generator), tipicamente um LLM. Um
objetivo comum e reduzir alucinacoes, atualizar conhecimento e permitir
rastreabilidade por meio de evidencias externas. No paradigma SWEBOK-AI v5.0,
RAG e um mecanismo de “capitalizacao de contexto”: ao inves de confiar apenas em
parametros do modelo (conhecimento parametricamente armazenado), o sistema busca
e injeta evidencias sob demanda, transformando verificacao em parte do desenho
arquitetural.

RAG nao e apenas uma tecnica de NLP; e um padrao de arquitetura. Ele introduz um
pipeline com ingestion, indexacao, recuperacao, reranking, montagem de contexto,
geracao e observabilidade. Cada etapa cria novos modos de falha e novos pontos
de controle.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Descrever a arquitetura de um sistema RAG e o papel de cada componente.
2. Projetar estrategias de chunking e indexacao alinhadas a requisitos de
   latencia, custo e auditabilidade.
3. Comparar recuperacao lexical, densa e hibrida, incluindo reranking.
4. Definir um plano de avaliacao para RAG que cubra recuperacao e geracao
   (end-to-end).
5. Identificar riscos de seguranca e privacidade introduzidos por ingestao e
   recuperacao de conteudo.

## Arquitetura de alto nivel

Um pipeline RAG minimalista pode ser representado assim:

```text
Documentos --> (Ingestao/Chunking) --> (Embeddings/Indice) --> Retriever --> Contexto
                                                                     |        |
                                                                     +--> Logs +--> LLM --> Resposta
```

Componentes tipicos:

- **Ingestao**: coleta, limpeza, normalizacao e controle de versoes de fontes.
- **Chunking**: particionamento em unidades recuperaveis; define
  recall/precision e custo.
- **Indexacao**: criacao de embeddings e estruturas de busca (vetorial e/ou
  lexical).
- **Recuperacao**: consulta e selecao de candidatos; pode ser multi-stage.
- **Reranking**: reordenacao de candidatos por modelos especializados.
- **Montagem de contexto**: compressao, citacoes, deduplicacao e politicas de
  inclusao.
- **Geracao**: resposta do LLM condicionada ao contexto recuperado.
- **Observabilidade**: coleta de metricas, traces e evidencias para auditoria.

## Chunking como decisao de engenharia

Chunking afeta diretamente:

- **Recall**: chunks muito grandes dificultam recuperar o trecho certo; chunks
  muito pequenos perdem contexto.
- **Custo**: mais chunks geram mais embeddings e mais chamadas de recuperacao.
- **Seguranca**: chunks podem carregar instrucoes maliciosas (prompt injection)
  embutidas em documentos.

Boas praticas incluem: chunking semantico (por estrutura do documento),
sobreposicao controlada (overlap) e metadados para filtragem (origem, versao,
nivel de confidencialidade).

## Estrategias de recuperacao

### Recuperacao lexical

Baseada em termos (por exemplo, BM25). E robusta para nomes proprios e termos
raros, mas fraca para sinonimia e paraphase.

### Recuperacao densa (embeddings)

Baseada em similaridade semantica em espaco vetorial. E eficaz para perguntas
abertas, mas sensivel a:

- escolha do modelo de embedding;
- drift de dominio;
- necessidade de filtragem por metadados;
- calibracao de limiares.

### Recuperacao hibrida e multi-stage

Combinacoes (lexical + densa + reranker) tendem a melhorar qualidade em dominios
heterogeneos. Em termos de custo, multi-stage e um investimento que
frequentemente reduz alucinacao e retrabalho humano.

## RAG avancado e RAG agentico

Pesquisas recentes classificam evolucoes de RAG em paradigmas (por exemplo,
naive/advanced/modular). Na pratica, sistemas corporativos frequentemente chegam
a uma forma de RAG “agentico”: o sistema decide iterativamente buscar mais
evidencias, reformular consultas, ou validar afirmacoes antes de responder.

Esse ganho vem com custo e risco:

- mais chamadas ao modelo (custo e latencia);
- maior superficie de ataque (mais entradas externas);
- necessidade de controles de loop e limites de iteracoes.

## Avaliacao: recuperar bem nao e responder bem

Avaliar RAG exige duas camadas:

1. **Metricas de recuperacao**: recall@k, MRR, nDCG, cobertura de fontes.
2. **Metricas de geracao**: factualidade baseada em evidencias, qualidade de
   citacao (attribution), completude e utilidade.

Para engenharia, o ponto critico e rastreabilidade: a resposta deve ser
justificavel por fontes recuperadas, e o sistema deve registrar quais documentos
sustentaram quais afirmacoes.

## Practical Considerations

- **Governanca de corpus**: trate o corpus como dado de producao (versionamento,
  trilha de auditoria, politicas de retencao).
- **Seguranca por design**: separe instrucoes do sistema de conteudo recuperado;
  aplique filtragem e sanitizacao.
- **Observabilidade de ponta a ponta**: registre query, resultados de
  recuperacao, scores, chunks usados e resposta final.
- **Custo e latencia**: otimize etapas caras (reranking, embeddings) e aplique
  caches (por query, por documento, por sessao).
- **Fallbacks**: quando evidencia e insuficiente, degrade com recusa,
  escalonamento humano ou resposta parcial claramente marcada.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Media     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Medio     |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica   |

## Summary

- RAG transforma conhecimento externo em contexto verificavel; e padrao de
  arquitetura, nao “feature”.
- Chunking e decisao central que afeta recall, custo e risco.
- Recuperacao hibrida e multi-stage tende a melhorar qualidade em troca de maior
  complexidade.
- Avaliacao deve cobrir recuperacao e geracao, com rastreabilidade e evidencias
  registradas.

## References

1. LEWIS, Patrick; PEREZ, Ethan; PIKHETKO, Alexander; et al. Retrieval-Augmented
   Generation for Knowledge-Intensive NLP Tasks. In: NeurIPS, 2020. Disponivel
   em: <https://arxiv.org/abs/2005.11401>. Acesso em: 31 jan. 2026.
2. GAO, Yunfan; XIONG, Yun; GAO, Xinyu; et al. Retrieval-Augmented Generation
   for Large Language Models: A Survey. arXiv, 2024. Disponivel em:
   <https://arxiv.org/abs/2312.10997>. Acesso em: 31 jan. 2026.
3. GUPTA, Shailja; RANJAN, Rajesh; SINGH, Surya Narayan. A Comprehensive Survey
   of Retrieval-Augmented Generation (RAG): Evolution, Current Landscape and
   Future Directions. arXiv, 2024. Disponivel em:
   <https://arxiv.org/abs/2410.12837>. Acesso em: 31 jan. 2026.

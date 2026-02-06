---
title: Ferramentas e Técnicas Modernas
created_at: '2025-05-21'
tags: [ferramentas, stack, vector-db, frameworks, swebok-ai]
status: in-progress
updated_at: '2025-05-21'
ai_model: claude-3.5-sonnet
---

# 8. Ferramentas e Técnicas Modernas

## Visão Geral

O ecossistema de ferramentas para arquitetura de IA (o "AI Stack") evolui em
velocidade vertiginosa. O que era padrão há seis meses pode estar obsoleto hoje.
Para o arquiteto de software, o desafio é selecionar ferramentas que ofereçam
abstrações robustas sem criar acoplamento excessivo ("Vendor Lock-in") em um
mercado imaturo.

Esta seção categoriza as ferramentas essenciais para construir sistemas
híbridos, focando em padrões de infraestrutura e não apenas em produtos
específicos.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Avaliar** e selecionar Bancos de Dados Vetoriais baseados em requisitos de
   latência e escala.
2. **Comparar** frameworks de orquestração (ex: LangChain vs Semantic Kernel) e
   seus trade-offs de abstração.
3. **Arquitetar** pipelines de inferência locais versus gerenciados.

## 8.1 A Nova Camada de Dados: Vector Databases

Sistemas RAG exigem busca semântica, habilitada por embeddings armazenados em
bancos vetoriais.

### Categorias

- **Nativos**: Pinecone, Weaviate, Milvus, Qdrant. Construídos do zero para
  vetores, alta performance (HNSW index).
- **Integrados**: pgvector (PostgreSQL), Elasticsearch, Redis. Adicionam
  capacidade vetorial a bancos existentes.
- **Decisão Arquitetural**: Use *Nativos* para escala massiva (bilhões de
  vetores). Use *Integrados* para simplificar a stack e manter consistência
  transacional com dados relacionais.

## 8.2 Frameworks de Orquestração

Gerenciar prompts, memória e chamadas de ferramentas "na mão" é inviável.
Frameworks fornecem o "glue code".

- **LangChain / LangGraph**: O padrão de fato do ecossistema Python/JS. Oferece
  abstrações para tudo, mas pode ser "opinião demais" e difícil de depurar.
- **LlamaIndex**: Especializado em ingestão e indexação de dados para RAG.
  Melhor escolha quando o foco é recuperação de informação complexa.
- **Semantic Kernel (Microsoft)**: Focado em integração empresarial (C#, Python,
  Java), com design inspirado em kernel de SO.
- **DSPy**: Uma nova abordagem que trata prompts como parâmetros otimizáveis,
  "compilando" chamadas LLM.

## 8.3 Inferência e Serving

Como rodar o modelo?

- **APIs Fechadas (Model-as-a-Service)**: OpenAI, Anthropic, Google Vertex. Zero
  ops, custo por token.
- **Self-Hosted Open Weights**: Rodar Llama 3 ou Mistral em infra própria.
  - *Ferramentas*: **vLLM** (alta performance com PagedAttention), **Ollama**
    (desenvolvimento local fácil), **TGI** (Hugging Face).
  - *Trade-off*: Privacidade total e custo fixo vs. complexidade operacional de
    gerenciar GPUs.

## Considerações Práticas

### Evitando Lock-in

Frameworks de orquestração podem criar dependências profundas.

- **Dica**: Use o padrão *Gateway* ou *Router* para abstrair o provedor do
  modelo. Mudar de GPT-4 para Claude 3.5 deve ser uma mudança de configuração,
  não de código.

### Development Experience (DX)

Ferramentas como **LangSmith** e **Arize Phoenix** são essenciais para
visualizar traces de execução em tempo real, transformando o desenvolvimento de
"adivinhação" em engenharia.

## Resumo

- Vector DBs são o novo componente crítico de persistência.
- Frameworks de orquestração aceleram o desenvolvimento, mas exigem cuidado com
  abstrações vazadas.
- A inferência local (Self-hosted) tornou-se viável e é preferida para
  privacidade e controle.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                     |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Alta**. Ferramentas específicas mudam rápido. Foque nos conceitos (RAG, Embeddings, Serving).               |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Médio**. POCs são rápidas, mas testes de carga em infra de IA são complexos.                                |
| **Responsabilidade Legal**      | Quem responde pelo erro?              | **Baixa**. A responsabilidade geralmente recai sobre o uso do modelo, não sobre a ferramenta de orquestração. |

## Ver tambem

- [KA 01 - Engenharia de Restricoes e Contexto](../01-software-requirements/index.md)
- [KA 03 - Design de Sistemas Hibridos](../03-software-design/index.md)
- [KA 13 - Seguranca em Sistemas com IA](../13-software-security/index.md)

## Referências

1. **Andreessen Horowitz (a16z)**. (2023). *Emerging Architectures for LLM
   Applications*.
2. **Khattab, O., et al.** (2023). *DSPy: Compiling Declarative Language Model
   Calls into Self-Improving Pipelines*. arXiv.
3. **Liu, N., et al.** (2024). *Comprehensive Survey of Vector Database:
   Storage, Indexing and Retrieval*. arXiv.
4. **Kwon, W., et al.** (2023). *Efficient Memory Management for Large Language
   Model Serving with PagedAttention* (vLLM Paper). SOSP.

---
title: Ferramentas e Técnicas Modernas
created_at: '2025-01-31'
tags: [ferramentas, tecnicas, rag, prompt-engineering, vector-databases, mlops, llmops]
status: in-progress
updated_at: '2026-02-04'
ai_model: openai/gpt-5.2
---

# Ferramentas e Técnicas Modernas

## Contexto

Em 2022, bastava um script Python chamando a OpenAI. Em 2026, a stack de IA é
tão complexa quanto a de Kubernetes. Temos Vector DBs, Frameworks de Agentes,
Avaliadores, Tracing, Guardrails e Gateways. O risco não é mais "não ter
ferramenta", é ter "paralisia por análise" ou adotar abstrações que vazam
(*leaky abstractions*). Este capítulo não é uma lista de compras; é um filtro de
sobrevivência para sua stack.

## A Stack Essencial (LLM Stack)

### 1. Orquestração: Código > Frameworks Mágicos

**LangChain** e **LlamaIndex** são ótimos para começar, mas em produção, a
abstração excessiva esconde o que está acontecendo (quantos tokens gastei? onde
errou?).

- **Tendência:** Uso de orquestração "leve" ou código puro (Python/Typescript)
  para ter controle total do fluxo de execução e retry.
- **Recomendação:** Use frameworks para *retrieval* (ingestão de dados), mas
  considere escrever sua própria lógica de agente (loops e decisões) para
  facilitar o debug.

### 2. Memória e RAG (Retrieval-Augmented Generation)

A IA não lembra de nada. O banco vetorial é o hipocampo dela.

- **Vector Stores:** Pinecone (Serverless), Weaviate (Híbrido), pgvector (para
  quem já usa Postgres). Não complique: se você tem menos de 1 milhão de
  vetores, `pgvector` resolve.
- **Estratégia de Chunking:** Cortar texto em pedaços fixos (Fixed-size) é coisa
  de 2023. Use **Semantic Chunking** ou **Agentic Splitting** (deixe a IA
  decidir onde cortar o documento).

### 3. Observabilidade (LLMOps)

Você não pode gerenciar o que não vê. Logs de texto plano (`print(response)`)
não servem.

- **Ferramentas:** LangSmith, Arize Phoenix, Weights & Biases.
- **O que medir:** Latência p99, Custo por Query, Taxa de Feedback Negativo,
  Trace da Cadeia de Pensamento.

### 4. Avaliação (Evals)

Como você sabe que o prompt novo é melhor?

- **Frameworks:** RAGAS (para avaliar RAG), DeepEval (Testes unitários para
  LLM).
- **LLM-as-a-Judge:** Usar o GPT-4 para dar nota para a resposta do Llama-3. É
  meta-avaliação, mas funciona para escalar testes qualitativos.

## Técnicas Avançadas de Engenharia

### Prompt Engineering 2.0

Não é mais sobre "agir como um pirata".

- **Chain-of-Thought (CoT):** "Pense passo a passo". Aumenta a precisão em
  lógica e matemática.
- **Few-Shot:** Dar exemplos no prompt é mais eficiente que fine-tuning para 90%
  dos casos.
- **DSPy:** Esqueça escrever prompts manuais. DSPy compila e otimiza prompts
  automaticamente usando algoritmos de busca. É o futuro da engenharia de prompt
  declarativa.

### Verificação Formal

Para código crítico, apenas "parecer certo" não basta.

- **Ferramentas:** VeriGuard, AlphaVerus. Usam métodos formais para provar
  matematicamente que o código gerado pela IA satisfaz certas propriedades (ex:
  não acessa memória inválida).

## Checklist Prático

Montando a caixa de ferramentas:

1. [ ] **Escolha um Vector DB "Boring":** Comece com o que você já tem (Postgres
   \+ pgvector ou Elasticsearch). Migre para especializado (Pinecone/Milvus) só
   quando a escala exigir.
2. [ ] **Instale Observabilidade no Dia 1:** Configure o LangSmith ou similar
   antes do primeiro deploy. Debugar RAG sem trace visual é impossível.
3. [ ] **Implemente Cache:** Use GPTCache ou Redis para não pagar duas vezes
   pela mesma pergunta.
4. [ ] **Crie um Pipeline de Evals:** Tenha um script que roda 50 perguntas de
   teste toda vez que você muda o prompt.
5. [ ] **Sanitização de Entrada/Saída:** Use bibliotecas como `guardrails-ai` ou
   `instructor` para garantir que o JSON de saída é válido e seguro.

## Armadilhas Comuns

- **Vendor Lock-in de Framework:** Construir todo o sistema dependendo de
  classes internas do LangChain que mudam a cada semana.
- **Over-Retrieval:** Buscar 20 documentos para o contexto quando 3 bastariam.
  Aumenta custo e confunde o modelo ("Lost in the Middle").
- **Ignorar Modelos Locais:** Usar GPT-4 para tudo. Para resumir textos simples,
  um modelo local (Mistral/Llama) rodando em Ollama é mais rápido e grátis.
- **Confiar em Métricas de Texto:** Usar BLEU ou ROUGE (métricas antigas de
  tradução) para avaliar chat. Elas não capturam semântica. Use métricas
  baseadas em embeddings ou LLM-evals.

## Exemplo Mínimo: Pipeline de RAG Simples com Observabilidade

**Cenário:** Chatbot de documentação interna.

**Stack:** Python, OpenAI, ChromaDB, LangSmith.

```python
import os
from langchain.chat_models import ChatOpenAI
from langchain.document_loaders import TextLoader
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langsmith import Client

# 1. Configuração de Observabilidade
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "doc-bot-v1"

# 2. Ingestão (Simples)
loader = TextLoader("./policy.txt")
docs = loader.load()
db = Chroma.from_documents(docs, OpenAIEmbeddings())

# 3. Retrieval & Generation
def answer_question(question):
    # Retrieve
    docs = db.similarity_search(question, k=3)
    context = "\n".join([d.page_content for d in docs])

    # Generate (com controle explícito)
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    prompt = f"Use este contexto para responder: {context}\n\nPergunta: {question}"

    return llm.predict(prompt)
```

**Trade-offs:**

- **Pró:** Código limpo, fácil de entender e debuggar. Observabilidade grátis
  via var de ambiente.
- **Contra:** Chroma local não escala para milhões de docs (migrar para server
  mode).

## Resumo Executivo

- **Menos Mágica, Mais Controle:** Prefira bibliotecas que deixam você ver o
  prompt final.
- **Observabilidade é Mandatória:** LLMs são caixas pretas; não adicione outra
  caixa preta (framework opaco) em volta.
- **RAG é a nova query SQL:** Aprenda a otimizar índices e buscas vetoriais.
- **Evals automatizados:** A única forma de evoluir sem quebrar o passado.
- **Modelos Locais:** Use para desenvolvimento e tarefas simples para
  economizar.

## Próximos Passos

- Configurar uma conta no **LangSmith** ou **Weights & Biases**.
- Testar o **DSPy** para otimizar um prompt complexo que você tenha.
- Implementar um teste de regressão usando **RAGAS** para medir a qualidade do
  seu RAG.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                              |
| :------------------------------ | :----------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Alta.** Ferramentas de IA nascem e morrem em meses. Aposte em conceitos (RAG, Evals), não em marcas. |
| **Custo de Verificação**        | **Baixo.** Ferramentas de Eval automatizam o trabalho pesado.                                          |
| **Responsabilidade Legal**      | **Média.** Ferramentas de segurança (Guardrails) ajudam, mas a responsabilidade final é sua.           |

## References

1. **LangChain**. *Documentation*.
2. **LlamaIndex**. *High-Level Concepts*.
3. **Khattab, O. et al.** *DSPy: Compiling Declarative Language Model Calls into
   Self-Improving Pipelines*.
4. **Arize AI**. *RAG Evaluation Best Practices*.

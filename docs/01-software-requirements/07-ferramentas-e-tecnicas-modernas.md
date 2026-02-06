---
title: Ferramentas e Técnicas Modernas
created_at: '2025-01-31'
tags: [ferramentas, tecnicas, rag, prompt-engineering, vector-databases, mlops, llmops]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.2
---

# Ferramentas e Técnicas Modernas

## Contexto

Em 2022, aplicações com LLM podiam ser construídas com poucos componentes. Em
2026, a pilha técnica inclui bancos vetoriais, orquestração de agentes,
avaliação contínua, observabilidade, guardrails e gateways de modelos. O risco
principal deixou de ser a ausência de ferramentas e passou a ser a complexidade
desnecessária. Este capítulo propõe critérios de seleção para reduzir
acoplamento, melhorar auditabilidade e preservar capacidade de evolução.

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

Modelos de linguagem não mantêm memória factual persistente entre sessões; por
isso, mecanismos de recuperação externa (RAG) são necessários para fornecer
contexto verificável no momento da inferência.

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
- **O que medir:** latência (p50/p95/p99), custo por requisição, taxa de erro
  por etapa, taxa de recuperação útil (retrieval hit-rate),
  groundedness/fidelidade da resposta, satisfação do usuário e cobertura dos
  testes de avaliação.

### 4. Avaliação (Evals)

Como você sabe que o prompt novo é melhor?

- **Frameworks:** RAGAS (para avaliar RAG), DeepEval (Testes unitários para
  LLM).
- **LLM-as-a-Judge:** Usar o GPT-4 para dar nota para a resposta do Llama-3. É
  meta-avaliação, mas funciona para escalar testes qualitativos.

## Técnicas Avançadas de Engenharia

### Prompt Engineering 2.0

Não é mais sobre "agir como um pirata".

- **Raciocínio guiado:** Prefira instruções estruturadas e critérios explícitos
  de saída em vez de depender de prompts longos e genéricos.
- **Few-shot:** Geralmente melhora consistência em tarefas de formatação e
  classificação, mas exige curadoria de exemplos representativos.
- **DSPy:** Abordagem promissora para otimização programática de pipelines de
  prompt; útil quando há métrica objetiva de avaliação e ciclo contínuo de
  experimentação.

### Verificação Formal

Para código crítico, apenas "parecer certo" não basta.

- **Prática recomendada:** combinar testes automatizados, análise estática,
  tipagem forte e, quando viável, métodos formais.
- **Estado da arte:** abordagens como VeriGuard e AlphaVerus são relevantes em
  pesquisa para código verificável, mas ainda devem ser tratadas como técnicas
  emergentes para adoção em produção.

## Checklist Prático

Montando a caixa de ferramentas:

1. [ ] **Escolha um Vector DB "Boring":** Comece com o que você já tem (Postgres
   \+ pgvector ou Elasticsearch). Migre para especializado (Pinecone/Milvus) só
   quando a escala exigir.
2. [ ] **Instale observabilidade desde o início:** Configure tracing, métricas e
   avaliação antes do primeiro deploy para reduzir tempo de diagnóstico e
   regressão.
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
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import Chroma
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
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    prompt = f"Use este contexto para responder: {context}\n\nPergunta: {question}"
    response = llm.invoke(prompt)
    return response.content
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

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. LangChain. *Documentation*. Disponível em: <https://docs.langchain.com/>.
   Acesso em: 6 fev. 2026.
2. LlamaIndex. *High-Level Concepts*. Disponível em:
   <https://docs.llamaindex.ai/en/stable/getting_started/concepts/>. Acesso em:
   6 fev. 2026.
3. Khattab, O.; Singhvi, A.; Maheshwari, P.; et al. *DSPy: Compiling Declarative
   Language Model Calls into Self-Improving Pipelines*. arXiv:2310.03714, 2023.
   Disponível em: <https://arxiv.org/abs/2310.03714>. Acesso em: 6 fev. 2026.
4. Arize AI. *Evaluating and Analyzing Your RAG Pipeline with Ragas*. 2024.
   Disponível em:
   <https://phoenix.arize.com/evaluating-and-analyzing-your-rag-pipeline-with-ragas-and-phoenix/>.
   Acesso em: 6 fev. 2026.
5. Aggarwal, P.; Parno, B.; Welleck, S. *AlphaVerus: Bootstrapping Formally
   Verified Code Generation through Self-Improving Translation and
   Treefinement*. arXiv:2412.06176, 2024. Disponível em:
   <https://arxiv.org/abs/2412.06176>. Acesso em: 6 fev. 2026.
6. Miculicich, L.; Parmar, N.; Singh, A.; et al. *VeriGuard: Enhancing LLM Agent
   Safety via Verified Code Generation*. arXiv:2510.05156, 2025. Disponível em:
   <https://arxiv.org/abs/2510.05156>. Acesso em: 6 fev. 2026.

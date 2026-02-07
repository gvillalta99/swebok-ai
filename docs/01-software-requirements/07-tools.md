---
title: Ferramentas e Tecnologias para Engenharia de Requisitos com IA
created_at: 2025-02-07
tags: [software-requirements, ferramentas, LLM, langchain, IBM-RQA, Jira, RE, AI-tools]
status: published
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# Ferramentas e Tecnologias

O ecossistema de ferramentas para engenharia de requisitos assistida por IA
evoluiu rapidamente entre 2023 e 2025. O mercado migrando de soluções pontuais
para plataformas integradas que combinam capacidades de LLM com workflows
estabelecidos de gestão de requisitos. Este capítulo examina as principais
ferramentas comerciais, frameworks open-source e critérios práticos para
seleção.

## Ferramentas Comerciais

### IBM Engineering Requirements Quality Assistant (RQA)

A solução da IBM representa uma das implementações mais maduras de IA aplicada à
qualidade de requisitos. Baseada na plataforma Watson NLP, o RQA opera como um
assistente de qualidade em tempo real integrado ao IBM Engineering Lifecycle
Management (ELM).

**Funcionalidades Principais**

O RQA analisa requisitos em tempo de digitação, identificando ambiguidades,
termos não-padrão e inconsistências. O sistema atribui scores de qualidade
baseados em métricas como:

- Unambiguous: ausência de termos subjetivos ("bom", "rápido", "fácil")
- Atomic: cada requisito descreve uma única necessidade
- Verifiable: presença de critérios mensuráveis
- Consistent: ausência de conflitos com requisitos existentes
- Complete: cobertura adequada da funcionalidade descrita

A ferramenta sugere correções automáticas, mantendo um histórico de melhorias
aplicadas para fins de auditoria.

**Casos de Uso e Compliance**

O RQA encontra aplicação predominante em indústrias reguladas onde a qualidade
de requisitos é crítica:

- Aeroespacial: compliance com DO-178C
- Automotivo: conformidade com ISO 26262
- Dispositivos médicos: atendimento a IEC 62304
- Sistemas ferroviários: conformidade com EN 50128

A IBM oferece qualificação de ferramenta (tool qualification) para esses
domínios, fornecendo evidências documentais necessárias para certificação.

**Arquitetura e Integração**

```
┌─────────────────────────────────────────────────────────────┐
│                    IBM Engineering RQA                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐     ┌──────────────┐     ┌─────────────┐ │
│  │   Watson     │────→│   Quality    │────→│   Scoring   │ │
│  │     NLP      │     │   Engine     │     │   Engine    │ │
│  └──────────────┘     └──────────────┘     └─────────────┘ │
│         │                    │                    │        │
│         ▼                    ▼                    ▼        │
│  ┌────────────────────────────────────────────────────────┐│
│  │              IBM Engineering ELM                       ││
│  │  (DOORS Next, Rhapsody, Test Management)              ││
│  └────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### AI Requirements Copilot for Jira

O AI Copilot representa a integração de LLMs diretamente no fluxo de trabalho
ágil através do ecossistema Atlassian. Disponível no Marketplace do Atlassian, a
ferramenta opera dentro do Jira Cloud sem necessidade de infraestrutura
adicional.

**Capacidades de Geração**

A ferramenta oferece templates predefinidos para múltiplos padrões de
requisitos:

- User Stories no formato "Como [persona], quero [ação], para que [benefício]"
- Épicos com descrição estruturada e critérios de aceitação
- Casos de teste em formato Gherkin (Given-When-Then)
- Documentação de conformidade para FDA, INCOSE, CMMI

Os prompts são customizáveis por projeto, permitindo adaptação ao vocabulário e
padrões organizacionais específicos.

**Segurança e Privacidade**

O AI Copilot implementa o modelo BYOK (Bring Your Own Key), onde a organização
fornece suas próprias credenciais de API (OpenAI ou Azure OpenAI). Isso garante
que:

- Dados de requisitos não transitam por servidores do fornecedor
- Tokens de API permanecem sob controle da organização
- É possível aplicar políticas de retenção e exclusão consistentes com
  compliance interno

**Integração com Workflows**

A ferramenta se integra aos workflows do Jira, permitindo automações como:

- Geração automática de test cases quando uma story é movida para "Ready for
  Development"
- Validação de qualidade em transições de status
- Notificações quando requisitos não atendem critérios mínimos

### Atlassian Intelligence (Rovo)

Lançado em 2024, o Atlassian Intelligence (também conhecido como Rovo)
representa a estratégia da Atlassian de incorporar capacidades de IA nativamente
em todo o ecossistema (Jira, Confluence, Bitbucket).

**Funcionalidades para RE**

- Automação de regras em linguagem natural: descrições como "Quando uma issue de
  bug for criada sem critérios de aceitação, atribua ao QA lead" são convertidas
  automaticamente para regras executáveis
- Geração de user stories a partir de descrições textuais em páginas do
  Confluence
- Conversão natural language → JQL: queries complexas são geradas a partir de
  perguntas em português ou inglês
- Sumarização automática de páginas do Confluence contendo especificações
  extensas
- Extração de action items de reuniões documentadas

**Confluence Whiteboard + AI**

A integração com whiteboards colaborativos permite:

- Transformação de notas manuscritas ou sticky notes em user stories
  estruturadas
- Sumarização automática de brainstormings visuais
- Geração de diagramas de processo a partir de descrições textuais

### TestStory AI

TestStory AI posiciona-se como um agente de QA especializado na geração de casos
de teste a partir de requisitos ágeis.

**Processamento de Entradas**

A ferramenta aceita múltiplos formatos de entrada:

- User Stories do Jira
- Issues do GitHub, Linear, ClickUp
- Épicos e descrições textuais
- Documentos de requisitos em PDF

Para cada entrada, o sistema gera:

- Casos de teste verificáveis com pré-condições, passos e resultados esperados
- Cenários positivos e negativos
- Casos de borda (edge cases)
- Diagramas de processo quando aplicável

**Integrações**

TestStory integra-se com ferramentas de gestão de testes:

- TestQuality, TestRail, Zephyr
- Jira para sincronização bidirecional
- IDEs através de extensões (Cursor, Copilot, Claude Code)

## Frameworks e Ferramentas Open-Source

### LangChain para Engenharia de Requisitos

LangChain emergiu como o framework de referência para construção de aplicações
com LLMs, oferecendo abstrações que simplificam a orquestração de pipelines
complexos de RE.

**Arquitetura de Chains para RE**

O conceito central de "chains" (cadeias) permite construir workflows sequenciais
onde o output de uma etapa alimenta a próxima:

```python
# Exemplo de pipeline de RE com LangChain
from langchain import PromptTemplate, LLMChain
from langchain.output_parsers import PydanticOutputParser

# Chain de Elicitação
elicitation_template = """
Você é um analista de requisitos experiente em {dominio}.
Contexto: {contexto}
Stakeholders: {stakeholders}

Conduza uma entrevista de elicitação fazendo perguntas claras e contextuais.
Máximo de 5 perguntas, focando em requisitos funcionais críticos.
"""

elicitation_prompt = PromptTemplate(
    input_variables=["dominio", "contexto", "stakeholders"],
    template=elicitation_template
)

# Chain de Especificação
specification_template = """
Com base nas seguintes respostas de stakeholders:
{respostas}

Gere user stories profissionais no formato:
"Como [persona], quero [ação], para que [benefício]"

Inclua critérios de aceitação para cada story.
"""

specification_prompt = PromptTemplate(
    input_variables=["respostas"],
    template=specification_template
)

# Chain de Validação
validation_template = """
Analise as seguintes user stories:
{user_stories}

Verifique:
1. Ambiguidades
2. Inconsistências
3. Requisitos não-funcionais ausentes
4. Critérios de aceitação mensuráveis

Reporte problemas encontrados com sugestões de correção.
"""

validation_prompt = PromptTemplate(
    input_variables=["user_stories"],
    template=validation_template
)
```

**RAG (Retrieval-Augmented Generation)**

LangChain facilita a implementação de RAG para RE, onde requisitos são gerados
contextualizados com documentação técnica:

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQA

# Configuração da base de conhecimento
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
vectorstore = Chroma.from_documents(
    documents=documentos_tecnicos,
    embedding=embeddings
)

# Chain RAG para especificação contextualizada
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever(search_kwargs={"k": 5}),
    return_source_documents=True
)

# Uso: requisitos gerados com base na documentação técnica
resultado = rag_chain.run(
    "Gere requisitos para a funcionalidade X considerando as restrições de segurança documentadas"
)
```

### LangGraph para Orquestração de Agentes

LangGraph estende LangChain para cenários multi-agente, onde diferentes agentes
especializados colaboram em workflows de RE.

**Exemplo: Workflow de RE com Agentes Especializados**

```python
from langgraph.graph import StateGraph
from typing import TypedDict, List

class REState(TypedDict):
    input: str
    requisitos_elicitados: List[str]
    user_stories: List[str]
    validacao: str
    aprovado: bool

# Definição dos agentes
def agente_elicitacao(state: REState):
    """Agente especializado em entrevistas e elicitação"""
    # Implementação...
    return {"requisitos_elicitados": requisitos}

def agente_especificacao(state: REState):
    """Agente especializado em gerar user stories"""
    # Implementação...
    return {"user_stories": stories}

def agente_validacao(state: REState):
    """Agente especializado em validação de qualidade"""
    # Implementação...
    return {"validacao": resultado, "aprovado": aprovado}

def decisor_revisao(state: REState):
    """Decide se requisitos devem ser revisados ou finalizados"""
    if state["aprovado"]:
        return "finalizar"
    return "revisar"

# Construção do grafo
workflow = StateGraph(REState)

workflow.add_node("elicitacao", agente_elicitacao)
workflow.add_node("especificacao", agente_especificacao)
workflow.add_node("validacao", agente_validacao)

workflow.add_edge("elicitacao", "especificacao")
workflow.add_edge("especificacao", "validacao")
workflow.add_conditional_edge(
    "validacao",
    decisor_revisao,
    {"revisar": "elicitacao", "finalizar": "__end__"}
)

workflow.set_entry_point("elicitacao")
app = workflow.compile()
```

### Grounded AI Hallucination Validator

Esta ferramenta open-source endereça um dos problemas críticos em RE com LLMs: a
detecção de hallucinações.

**Funcionalidades**

- Validação de outputs de LLM contra contexto fornecido
- Scoring de faithfulness (fidelidade ao contexto)
- Integração com guardrails-ai para validação estruturada
- APIs para verificação programática

**Uso em Pipelines de RE**

```python
from grounded_ai import HallucinationValidator

validator = HallucinationValidator()

# Validação de requisitos gerados
resultado = validator.validate(
    context=documentacao_stakeholder,
    generated_requirements=requisitos_gerados
)

if resultado.hallucination_score > 0.3:
    # Requisito contém informações não presentes no contexto
    logger.warning("Possível hallucinação detectada")
    requisitos_gerados = revisar_manualmente(requisitos_gerados)
```

### Repositórios Acadêmicos: GenAI4RE

A comunidade acadêmica consolidou recursos no repositório GenAI4RE, mantido por
pesquisadores da área:

**Conteúdo Disponível**

- Datasets de requisitos anotados para benchmarking
- Bibliotecas de prompts para diferentes tarefas de RE
- Scripts de avaliação de qualidade (F1-score, consistência, cobertura)
- Benchmarks comparativos entre LLMs para tarefas de RE

## Bases de Dados Vetoriais e Embeddings

A implementação efetiva de RAG em RE requer infraestrutura de embeddings e busca
semântica.

### Modelos de Embedding

Para tarefas de RE, recomenda-se:

| Modelo                           | Dimensão | Caso de Uso                            |
| -------------------------------- | -------- | -------------------------------------- |
| text-embedding-ada-002           | 1536     | Uso geral, boa relação custo-benefício |
| text-embedding-3-large           | 3072     | Alta precisão para domínios técnicos   |
| sentence-transformers/all-MiniLM | 384      | Deployment on-premise, menor latência  |
| Cohere embed-multilingual        | 768      | Documentação multilíngue               |

### Bases de Dados Vetoriais

**Pinecone**

- Serviço gerenciado, escala automática
- Ideal para bases de conhecimento organizacionais grandes
- Custos baseados em uso

**Chroma**

- Open-source, deployment local ou em nuvem
- Integração nativa com LangChain
- Adequado para projetos com requisitos de privacidade

**Weaviate**

- GraphQL nativo para consultas complexas
- Módulos para vectorização automática
- Híbrido: busca vetorial + BM25

**Qdrant**

- Escrito em Rust, alta performance
- Filtros de metadados eficientes
- Deployment em Kubernetes

## Critérios de Seleção de Ferramentas

A seleção de ferramentas de RE com IA deve considerar múltiplos fatores além das
capacidades técnicas.

### Integração com Stack Existente

**Fatores críticos:**

- APIs disponíveis para integração com ferramentas atuais (Jira, DOORS, Azure
  DevOps)
- Suporte a webhooks para automação de workflows
- Formatos de exportação compatíveis (PDF, DOCX, ReqIF)
- Capacidade de importar histórico de requisitos

### Compliance e Segurança

**Requisitos regulatórios:**

- Qualificação de ferramenta para domínios safety-critical
- Certificações ISO 27001, SOC 2
- Capacidade de auditoria completa (logs de prompts, outputs, revisões)
- Data residency: onde dados são processados e armazenados

**Privacidade:**

- BYOK (Bring Your Own Key) para controle de API
- Anonimização de dados sensíveis
- Acordos de processamento de dados (DPA) adequados
- Opções de deployment on-premise ou private cloud

### Custo-Benefício

**Modelos de precificação:**

| Modelo             | Vantagens        | Desvantagens        |
| ------------------ | ---------------- | ------------------- |
| Por usuário/mês    | Previsibilidade  | Subutilização       |
| Por uso (tokens)   | Escala com valor | Variabilidade       |
| Licença enterprise | Suporte dedicado | Alto custo inicial  |
| Open-source        | Controle total   | Custo de manutenção |

**Cálculo de ROI:**

- Tempo economizado em elicitação e especificação
- Redução de retrabalho devido a requisitos melhores
- Custos de licenciamento e infraestrutura
- Treinamento e curva de aprendizado

### Capacidades de Customização

**Necessárias para adoção efetiva:**

- Templates de prompts configuráveis por projeto
- Dicionários de termos organizacionais
- Regras de qualidade customizáveis
- Workflows adaptáveis a processos existentes

## Comparativo de Ferramentas

| Ferramenta      | Categoria      | Foco Principal                     | Integração             | Preço           | Open Source |
| --------------- | -------------- | ---------------------------------- | ---------------------- | --------------- | ----------- |
| IBM RQA         | Qualidade      | Validação de qualidade, compliance | IBM ELM                | Enterprise      | Não         |
| AI Copilot Jira | Gestão         | Geração de requisitos ágeis        | Jira Cloud             | Marketplace     | Não         |
| Atlassian Rovo  | Colaboração    | Automação de workflows             | Atlassian suite        | Incluído/Add-on | Não         |
| LangChain       | Framework      | Orquestração de pipelines          | Múltiplas              | Gratuito        | Sim         |
| LangGraph       | Framework      | Multi-agent systems                | LangChain              | Gratuito        | Sim         |
| TestStory       | QA             | Testes a partir de stories         | Jira, GitHub, TestRail | SaaS            | Não         |
| Grounded AI     | Validação      | Detecção de hallucinações          | APIs                   | Gratuito        | Sim         |
| Chroma          | Infraestrutura | Vector database                    | LangChain              | Gratuito        | Sim         |
| Pinecone        | Infraestrutura | Vector database gerenciado         | Múltiplas              | SaaS            | Não         |

## Diretrizes para Implementação

### Fase 1: Avaliação (2-4 semanas)

1. Mapeie processos atuais de RE e identifique gargalos
2. Defina critérios de sucesso (tempo, qualidade, satisfação)
3. Selecione 2-3 ferramentas para prova de conceito
4. Execute testes com dados anonimizados

### Fase 2: Piloto (1-3 meses)

1. Implemente em projeto não-crítico
2. Treine equipe em prompt engineering básico
3. Estabeleça processo de validação humana
4. Meça resultados contra baseline

### Fase 3: Escala (3-6 meses)

1. Expanda para mais projetos
2. Desenvolva bibliotecas de prompts organizacionais
3. Integre com CI/CD de requisitos
4. Documente lições aprendidas e ajuste processos

## Referências

1. **IBM.** (2024). "Engineering Requirements Quality Assistant." *IBM
   Documentation*. <https://www.ibm.com/docs/en/erqa>

2. **Atlassian.** (2024). "AI Requirements Copilot for Jira." *Atlassian
   Marketplace*.
   <https://marketplace.atlassian.com/apps/1234191/ai-requirements-copilot-for-jira>

3. **LangChain.** (2024). *LangChain Documentation*.
   <https://python.langchain.com/docs/get_started/introduction>

4. **LangGraph.** (2024). *LangGraph Documentation*.
   <https://langchain-ai.github.io/langgraph/>

5. **Chroma.** (2024). *Chroma Documentation*. <https://docs.trychroma.com/>

6. **Pinecone.** (2024). *Pinecone Documentation*. <https://docs.pinecone.io/>

7. **Ebrahim, A., et al.** (2024). "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *arXiv:2401.00000*.
   <https://aclanthology.org/2024.acl-srw.31/>

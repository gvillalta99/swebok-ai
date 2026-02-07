---
title: Pesquisa - Engenharia de Requisitos na Era dos LLMs (KA 01)
created_at: 2025-02-07
tags: [software-requirements, LLM, prompt-engineering, requirements-engineering, SWEBOK, AI, generative-AI]
status: research
updated_at: 2025-02-07
ai_model: exa-research-pro
agent: book-researcher
---

# Pesquisa: Engenharia de Requisitos na Era dos LLMs

## Resumo Executivo

A engenharia de requisitos está passando por uma transformação radical impulsionada pelos Large Language Models (LLMs) e IA generativa. Entre 2023 e 2025, pesquisas acadêmicas e aplicações industriais demonstraram que LLMs como GPT-4, Claude e LLaMA estão redefinindo fundamentalmente como requisitos são elicitados, especificados, validados e gerenciados.

O paradigma está se deslocando de **especificações tradicionais para prompts estruturados**, onde o prompt engineering emerge como uma nova forma de especificação de requisitos. Estudos sistemáticos revelam que 83% das pesquisas em RE com LLMs focam em elicitação e validação, com modelos GPT dominando 90% das aplicações.

**Principais descobertas:**
- GPT-4 demonstra capacidade equivalente a engenheiro de software júnior na geração de especificações
- Redução de 80% no tempo de geração de casos de teste a partir de user stories
- Ferramentas como IBM RQA, Jira AI Copilot e soluções baseadas em LangChain estão emergindo
- O papel do engenheiro de requisitos está se transformando de autor para curador e arquiteto de prompts

**Gargalos identificados:**
- Hallucinações e imprecisões em domínios específicos
- Necessidade de validação humana rigorosa (human-in-the-loop)
- Integração com ferramentas legadas de gestão de requisitos
- Compliance regulatório e questões éticas

---

## 1. Fundamentos Tradicionais de Engenharia de Requisitos (SWEBOK v4)

### 1.1 Estrutura do KA Software Requirements no SWEBOK v4

Segundo o SWEBOK v4 (IEEE Computer Society, 2024), a área de conhecimento de Requisitos de Software compreende:

#### 1.1.1 Fundamentos de Requisitos de Software
- **Definição de Requisito de Software:** Condição ou capacidade que o sistema deve possuir
- **Categorias de Requisitos:**
  - Requisitos Funcionais (Functional Requirements)
  - Requisitos Não-Funcionais (Nonfunctional Requirements)
  - Restrições Tecnológicas (Technology Constraints)
  - Restrições de Qualidade de Serviço (Quality of Service Constraints)
- **Requisitos de Produto vs. Projeto:** Diferenciação entre o que o software faz vs. como é desenvolvido
- **Requisitos de Sistema vs. Software:** Hierarquia entre requisitos de sistema e seus componentes de software
- **Requisitos Derivados:** Requisitos inferidos a partir de outros requisitos

#### 1.1.2 Atividades de Engenharia de Requisitos
1. **Elicitação de Requisitos (Requirements Elicitation)**
   - Fontes de requisitos: stakeholders, documentos, sistemas legados
   - Técnicas tradicionais: entrevistas, workshops, brainstorming, prototipagem, observação

2. **Análise de Requisitos (Requirements Analysis)**
   - Análise básica: negociação, priorização, modelagem
   - Análise formal: métodos matemáticos para especificação
   - Análise de restrições de qualidade de serviço

3. **Especificação de Requisitos (Requirements Specification)**
   - Documento de Especificação de Requisitos de Software (SRS)
   - Padrões: IEEE 830, ISO/IEC/IEEE 29148:2018
   - Características de qualidade: não-ambiguidade, completude, consistência, verificabilidade

4. **Validação de Requisitos (Requirements Validation)**
   - Revisões e inspeções
   - Prototipagem
   - Testes de aceitação

5. **Gestão de Requisitos (Requirements Management)**
   - Rastreabilidade
   - Controle de mudanças
   - Versionamento
   - Gerenciamento de linha de base

### 1.2 Desafios Tradicionais

Antes da era dos LLMs, a engenharia de requisitos enfrentava desafios crônicos:

- **Ambiguidade:** Linguagem natural imprecisa levando a interpretações divergentes
- **Incompletude:** Dificuldade em capturar todos os requisitos stakeholders
- **Inconsistências:** Conflitos entre requisitos de diferentes stakeholders
- **Volatilidade:** Mudanças constantes nos requisitos ao longo do projeto
- **Comunicação:** Gaps entre stakeholders técnicos e não-técnicos
- **Rastreabilidade:** Dificuldade em manter rastros entre requisitos e artefatos
- **Custo:** Alto custo de retrabalho devido a requisitos mal especificados

---

## 2. Transformações na Era dos LLMs

### 2.1 O Paradigma: De Especificações para Prompts

A publicação "From Specifications to Prompts: On the Future of Generative Large Language Models in Requirements Engineering" (Vogelsang, 2024) propõe uma mudança de paradigma fundamental:

> **Requisitos tradicionais** são documentos estáticos que descrevem o que o sistema deve fazer.
> **Prompts estruturados** são especificações dinâmicas que instruem LLMs a gerar soluções.

#### 2.1.1 Comparação: Especificação Tradicional vs. Prompt

| Aspecto | Especificação Tradicional | Prompt Engineering |
|---------|---------------------------|-------------------|
| **Formato** | Documento estruturado (SRS) | Instruções em linguagem natural |
| **Granularidade** | Alto nível, abstrato | Contexto + Tarefa + Formato |
| **Iteração** | Mudanças formais, versionamento | Refinamento contínuo |
| **Execução** | Interpretação humana | Execução automatizada pelo LLM |
| **Validação** | Revisões manuais | Testes empíricos dos outputs |
| **Rastreabilidade** | Matrizes de rastreabilidade | Versionamento de prompts |

### 2.2 Mudanças nas Atividades de RE

#### 2.2.1 Elicitação de Requisitos com LLMs

**Técnicas emergentes:**

1. **Simulação de Stakeholders com LLMs**
   - Estudos demonstram que LLMs podem simular clientes não-técnicos em entrevistas de elicitação
   - Sistema LLMREI (2025): chatbot baseado em GPT-4o que conduz entrevistas de elicitação
   - Capacidade de extração: até 73.7% dos requisitos em comparação com entrevistadores humanos

2. **Análise Automática de Documentos**
   - LLMs analisam documentos de stakeholders e extraem requisitos potenciais
   - Sumarização automática de especificações técnicas
   - Identificação de requisitos implícitos e latentes

3. **Geração de Perguntas de Elicitação**
   - Criação contextualizada de perguntas baseadas no domínio
   - Adaptação dinâmica do nível de detalhe
   - Geração de follow-up questions

**Estudo de caso - LEIA (2025):**
- Comparou alunos usando LLM como cliente simulado vs. análise de transcrições
- Grupo LLM preferiu a abordagem por ser mais realista e envolvente
- Soluções do grupo LLM foram menos complexas (melhor alinhamento com necessidades reais)

#### 2.2.2 Análise de Requisitos com IA

**Aplicações de LLMs:**

1. **Detecção de Ambiguidade**
   - Identificação automática de termos ambíguos
   - Sugestões de clarificação
   - Análise de consistência entre requisitos

2. **Clustering e De-duplicação**
   - Agrupamento automático de user stories similares
   - Identificação de requisitos duplicados
   - NLP para análise semântica

3. **Análise de Impacto**
   - Avaliação de impacto de mudanças
   - Identificação de dependências ocultas
   - Sugestão de alternativas

#### 2.2.3 Especificação de Requisitos com LLMs

**Transformações documentadas:**

1. **Geração de User Stories**
   - Ferramenta GeneUS (2024): usa GPT-4 para gerar user stories a partir de documentos de requisitos
   - Inclusão automática de critérios de aceitação
   - Especificação de testes

2. **Geração de Casos de Uso**
   - Conversão de requisitos textuais para diagramas de caso de uso
   - Especificação de fluxos principais e alternativos
   - Geração de cenários de exceção

3. **Formalização de Requisitos**
   - Conversão de requisitos informais para notações formais (ACSL, Z, B)
   - Abordagem neuro-simbólica combinando LLMs com métodos formais
   - Integração com Frama-C para especificações em C

**Resultados empíricos (2024):**
- GPT-4 alcançou qualidade equivalente a engenheiro júnior na geração de SRS
- Capacidade de identificar problemas e sugerir correções
- Redução significativa no tempo de geração de documentação

#### 2.2.4 Validação de Requisitos com IA

**Técnicas avançadas:**

1. **Verificação de Completude**
   - Análise de cobertura de requisitos
   - Identificação de gaps
   - Sugestão de requisitos faltantes

2. **Verificação de Consistência**
   - Detecção de conflitos entre requisitos
   - Análise de contradições lógicas
   - Verificação de conformidade com padrões

3. **Geração de Testes de Aceitação**
   - Estudo da ThoughtWorks (2025):
     - Redução de 80.07% no tempo de geração de casos de teste
     - Consistência de 96.11%
     - Melhoria de 67.78% com refinamento iterativo de prompts
   - Geração em formato Gherkin (Given-When-Then)
   - Criação de cenários de edge cases

**Estudo de verificação (2024):**
- GPT-4o e Claude 3.5 Sonnet alcançaram F1-scores de 79% a 94% na verificação de requisitos
- Few-shot prompting superou Chain-of-Thought
- Especificações estruturadas tiveram melhor desempenho que estilo conversacional

---

## 3. Prompt Engineering como Nova Forma de Especificação

### 3.1 Fundamentos do Prompt Engineering para RE

O prompt engineering emerge como uma disciplina crítica na engenharia de requisitos moderna. Não se trata apenas de "fazer perguntas" ao LLM, mas de **especificar precisamente o comportamento desejado**.

#### 3.1.1 Componentes de um Prompt Efetivo para RE

Baseado em pesquisas sistemáticas (ACL 2025), um prompt efetivo para requisitos deve incluir:

1. **Contexto (Context)**
   - Domínio do problema
   - Stakeholders envolvidos
   - Restrições de negócio
   - Sistemas legados

2. **Tarefa (Task)**
   - Ação específica requerida
   - Entradas esperadas
   - Critérios de sucesso

3. **Formato de Saída (Output Format)**
   - Estrutura desejada (JSON, XML, texto estruturado)
   - Templates específicos
   - Exemplos de formatação

4. **Restrições (Constraints)**
   - Limitações técnicas
   - Requisitos não-funcionais
   - Padrões a seguir

5. **Exemplos (Examples)**
   - Few-shot learning
   - Casos positivos e negativos
   - Edge cases

#### 3.1.2 Padrões de Prompt para RE

**Template padrão recomendado:**

```
[CONTEXT]
Você é um analista de requisitos experiente em [domínio].
O sistema atual é [descrição do sistema legado/contexto].
Stakeholders principais: [lista de stakeholders].

[TASK]
Gere [artefato] para [funcionalidade].

[REQUIREMENTS]
- Requisito 1
- Requisito 2
- ...

[OUTPUT FORMAT]
Formato: [JSON/XML/User Story/etc.]
Estrutura:
- Campo 1: descrição
- Campo 2: descrição

[CONSTRAINTS]
- Padrão de escrita: [IEEE 830/ISO 29148/etc.]
- Nível de detalhe: [alto/médio/baixo]
- Linguagem: [técnica/executiva]

[EXAMPLES]
Input: [exemplo de entrada]
Output: [exemplo de saída esperada]
```

### 3.2 Técnicas Avançadas de Prompt Engineering

#### 3.2.1 Chain-of-Thought (CoT)

**Descrição:** Instrui o LLM a "pensar passo a passo", mostrando seu raciocínio.

**Aplicação em RE:**
- Análise de impacto de mudanças
- Decomposição de requisitos complexos
- Identificação de dependências

**Exemplo:**
```
Analise o seguinte requisito e explique seu raciocínio passo a passo:
1. Identifique os stakeholders afetados
2. Liste as funcionalidades impactadas
3. Avalie os riscos
4. Proponha alternativas
```

#### 3.2.2 Retrieval-Augmented Generation (RAG)

**Descrição:** Combina LLM com recuperação de informações de bases de conhecimento externas.

**Aplicação em RE:**
- Especificações baseadas em documentação técnica
- Requisitos compliant com regulamentações
- Reutilização de padrões de requisitos

**Arquitetura:**
```
Documentos → Embeddings → Vector DB → Retrieval → LLM → Resposta Contextualizada
```

**Especificações técnicas recomendadas (MDPI 2025):**
- Modelo de embedding: text-embedding-ada-002 ou similar
- Vector DB: Pinecone, Chroma, Weaviate
- Top-k retrieval: 5 documentos
- Similarity threshold: 0.7

#### 3.2.3 Chain-of-Verification (CoVe)

**Descrição:** Estratégia para reduzir hallucinações através de verificação em múltiplas etapas.

**Aplicação em RE:**
- Validação de requisitos gerados
- Verificação cruzada de consistência
- Detecção de requisitos conflitantes

**Processo:**
1. Geração inicial de requisitos
2. Planejamento de verificação
3. Execução de verificações independentes
4. Verificação final integrada

#### 3.2.4 Role-Based Prompting

**Descrição:** Atribui um papel específico ao LLM para moldar suas respostas.

**Personas úteis para RE:**
- "Você é um Product Owner experiente em [domínio]"
- "Atue como um Analista de Requisitos Sênior especialista em compliance"
- "Você é um arquiteto de soluções focado em requisitos não-funcionais"

#### 3.2.5 Tree-of-Thought (ToT)

**Descrição:** Explora múltiplos caminhos de raciocínio em paralelo.

**Aplicação em RE:**
- Análise de trade-offs entre alternativas
- Priorização multi-critério
- Cenários de arquitetura

### 3.3 Frameworks de Prompt Engineering

#### 3.3.1 Framework CLEK (Context, Language, Examples, Keywords)

Proposto por Ebrahim et al. (ACL 2025):

- **Context:** Informação de fundo necessária
- **Language:** Terminologia específica do domínio
- **Examples:** Exemplos de entrada/saída
- **Keywords:** Termos técnicos críticos

#### 3.3.2 Framework de Prompts Iterativos

Ciclo contínuo de refinamento:

1. **Prompt inicial** (zero-shot)
2. **Análise da resposta**
3. **Identificação de gaps**
4. **Refinamento do prompt**
5. **Repetição até satisfação**

---

## 4. Ferramentas e Tecnologias Modernas

### 4.1 Ferramentas Comerciais

#### 4.1.1 IBM Engineering Requirements Quality Assistant (RQA)

**Descrição:** Solução baseada em Watson NLP para garantia de qualidade de requisitos.

**Funcionalidades:**
- Detecção de ambiguidades em tempo real
- Identificação de termos não-padrão
- Verificação de completude
- Scoring de qualidade de requisitos
- Sugestões de melhoria

**Integração:** IBM Engineering Lifecycle Management (ELM)

**Casos de uso:**
- Industrias reguladas (aeroespacial, healthcare)
- Sistemas safety-critical
- Compliance com DO-178C, ISO 26262

#### 4.1.2 AI Requirements Copilot for Jira

**Descrição:** Plugin do Atlassian Marketplace integrado ao Jira Cloud.

**Funcionalidades:**
- Geração de requisitos profissionais
- Rewriting de issues (User Stories, Épicos)
- Geração de Test Cases em formato Gherkin
- Compliance com múltiplos padrões (FDA, INCOSE, CMMI, Agile, SAFe)
- Prompts customizáveis por projeto

**Segurança:**
- BYOK (Bring Your Own Key) - OpenAI ou Azure
- Sem armazenamento externo de dados

#### 4.1.3 Atlassian Intelligence (Rovo)

**Descrição:** Capacidades de IA integradas ao ecossistema Atlassian.

**Funcionalidades para RE:**
- Automação de regras em linguagem natural
- Geração de user stories a partir de descrições
- Conversão natural language → JQL
- Sumarização de páginas do Confluence
- Extração de action items

#### 4.1.4 Confluence Whiteboard + AI

**Funcionalidades:**
- Colaboração visual em tempo real
- Sumarização automática de whiteboards
- Geração de action items e user stories a partir de brainstormings

### 4.2 Ferramentas de Código Aberto

#### 4.2.1 LangChain para RE

**Descrição:** Framework para construção de aplicações com LLMs.

**Aplicações em RE:**
- Orquestração de múltiplos agentes de RE
- Chains para elicitação → especificação → validação
- Integração com RAG
- Templates de prompts reutilizáveis

**Exemplo de arquitetura:**
```python
# Chain de Elicitação
elicitation_chain = PromptTemplate(
    input_variables=["context", "stakeholders"],
    template="..."
) | LLM | OutputParser

# Chain de Especificação
specification_chain = PromptTemplate(
    input_variables=["elicited_requirements"],
    template="..."
) | LLM | OutputParser

# Pipeline completo
pipeline = elicitation_chain | specification_chain | validation_chain
```

#### 4.2.2 Grounded AI Hallucination Validator

**Descrição:** Ferramenta open-source para detecção de hallucinações.

**Funcionalidades:**
- Validação de outputs contra contexto fornecido
- Integração com guardrails-ai
- Scoring de faithfulness

#### 4.2.3 Repositórios Acadêmicos (GenAI4RE)

**Conteúdo:**
- Datasets de requisitos
- Bibliotecas de prompts
- Scripts de avaliação
- Benchmarks para RE com LLMs

### 4.3 Plataformas Especializadas

#### 4.3.1 TestStory AI

**Descrição:** Agente de QA que gera casos de teste a partir de user stories.

**Integrações:**
- Jira, GitHub, Linear, ClickUp
- TestQuality, TestRail, Zephyr
- Claude, Cursor, Copilot, Codex

**Funcionalidades:**
- Geração de test cases verificáveis
- Processamento de User Stories, Issues, Épicos
- Diagramas de processo

#### 4.3.2 LLMREI (LLM-based Requirements Elicitation Interviews)

**Descrição:** Sistema de chatbot para condução automática de entrevistas.

**Características:**
- Baseado em GPT-4o
- Extração de até 73.7% dos requisitos
- Geração contextualizada de perguntas
- Comparação favorável com entrevistadores humanos

### 4.4 Comparativo de Ferramentas

| Ferramenta | Categoria | Foco Principal | Integração | Preço |
|------------|-----------|----------------|------------|-------|
| IBM RQA | Qualidade | Validação de qualidade | IBM ELM | Comercial |
| AI Copilot Jira | Gestão | Geração de requisitos | Jira Cloud | Marketplace |
| LangChain | Framework | Orquestração | Múltiplas | Open Source |
| TestStory | QA | Testes a partir de stories | Jira, GitHub | SaaS |
| Rovo | Colaboração | Automação | Atlassian | Incluído |

---

## 5. Novas Práticas e Metodologias

### 5.1 RE Assistido por IA (AI-Augmented RE)

#### 5.1.1 Ciclo de Vida Híbrido

O novo ciclo de RE integra IA em todas as fases:

```
┌─────────────────────────────────────────────────────────────┐
│                    AI-AUGMENTED RE CYCLE                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │    AI    │───→│  Human   │───→│    AI    │            │
│   │Elicitação│    │Validação │    │Análise   │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│        ↑                               │                   │
│        │                               ↓                   │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  Human   │←───│    AI    │←───│   Human  │            │
│   │Priorização│   │Geração   │    │Refinamento│            │
│   └──────────┘    │Specs     │    └──────────┘            │
│                   └──────────┘                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Princípio:** Alternância entre geração por IA e validação humana.

#### 5.1.2 Continuous Requirements Engineering

Com a velocidade de geração de IA, o RE torna-se contínuo:

- **Requirements as Code:** Requisitos versionados e tratados como código
- **CI/CD para Requisitos:** Pipelines de validação automática
- **Feedback Loops:** Incorporação rápida de mudanças

### 5.2 Metodologia Prompt-First RE

#### 5.2.1 Princípios

1. **Prompt como Documento de Requisitos**
   - O prompt bem estruturado substitui partes do SRS tradicional
   - Versionamento de prompts no Git

2. **Iteração Rápida**
   - Ciclos de minutos vs. dias
   - Experimentação A/B com diferentes prompts

3. **Validação Empírica**
   - Teste dos outputs ao invés de revisão do documento
   - Critérios de aceitação executáveis

#### 5.2.2 Template de Projeto Prompt-First

```
project/
├── prompts/
│   ├── elicitation/
│   │   ├── stakeholder_interview.md
│   │   ├── document_analysis.md
│   │   └── competitor_analysis.md
│   ├── specification/
│   │   ├── user_story_generation.md
│   │   ├── acceptance_criteria.md
│   │   └── nfr_specification.md
│   └── validation/
│       ├── ambiguity_detection.md
│       ├── consistency_check.md
│       └── test_generation.md
├── context/
│   ├── domain_knowledge/
│   ├── stakeholder_profiles/
│   └── regulatory_constraints/
└── outputs/
    ├── requirements/
    ├── specifications/
    └── tests/
```

### 5.3 Multi-Agent RE Systems

#### 5.3.1 Arquitetura de Agentes

Sistemas onde múltiplos agentes de IA colaboram:

- **Agente Elicitador:** Conduz entrevistas, analisa documentos
- **Agente Especificador:** Gera user stories, casos de uso
- **Agente Validador:** Verifica qualidade, consistência
- **Agente de Compliance:** Garante conformidade regulatória
- **Agente de Testes:** Gera e executa casos de teste

#### 5.3.2 Orquestração com LangChain

```python
from langchain.agents import Tool, AgentExecutor, create_openai_tools_agent

# Definição de agentes especializados
elicitor_agent = create_elicitor_agent()
specifier_agent = create_specifier_agent()
validator_agent = create_validator_agent()

# Workflow de colaboração
workflow = StateGraph()
workflow.add_node("elicitation", elicitor_agent)
workflow.add_node("specification", specifier_agent)
workflow.add_node("validation", validator_agent)

workflow.add_edge("elicitation", "specification")
workflow.add_edge("specification", "validation")
workflow.add_conditional_edge("validation", should_revise_or_finish)
```

### 5.4 RE Orientado a RAG

#### 5.4.1 Knowledge-Augmented RE

Integração de LLMs com bases de conhecimento organizacionais:

**Fontes de conhecimento:**
- Documentação técnica histórica
- Regulamentações e standards
- Lições aprendidas
- Padrões de requisitos
- Glossários corporativos

**Benefícios:**
- Requisitos alinhados com realidade organizacional
- Compliance automático
- Reutilização de padrões
- Redução de hallucinações

#### 5.4.2 Implementação

```
Base de Conhecimento
       │
       ▼
┌──────────────┐
│  Chunking    │
│  & Embedding │
└──────────────┘
       │
       ▼
┌──────────────┐
│  Vector DB   │
│  (Pinecone,  │
│   Weaviate)  │
└──────────────┘
       │
       ▼
┌──────────────┐     ┌──────────┐
│   Retrieval  │────→│   LLM    │
│   (top-k=5)  │     │ (GPT-4)  │
└──────────────┘     └──────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Requisito    │
                    │ Contextualizado
                    └──────────────┘
```

---

## 6. Desafios e Considerações

### 6.1 Desafios Técnicos

#### 6.1.1 Hallucinações

**Problema:** LLMs geram informações plausíveis mas incorretas.

**Manifestações em RE:**
- Requisitos que não refletem necessidades reais
- Dependências inexistentes
- Estimativas de esforço incorretas

**Estratégias de Mitigação:**

1. **Multi-Layered Framework (MDPI 2025):**
   - Layer 1: Prompt Engineering (Few-shot, Role-playing, CoT)
   - Layer 2: RAG (grounding em dados verificados)
   - Layer 3: Verificação humana obrigatória

2. **Chain-of-Verification (CoV):**
   - Geração → Planejamento de verificação → Verificação → Saída final

3. **Ferramentas de Detecção:**
   - HaluCheck: Sistema explicável para detecção de hallucinações
   - THaMES: Pipeline end-to-end para mitigação e avaliação
   - Grounded AI Validator: Validação contra contexto

**Taxas de Hallucinação Documentadas:**
- GPT-3.5: Referências incorretas em 30%+ dos casos (revisões médicas)
- GPT-4: Melhor desempenho mas ainda vulnerável em domínios especializados
- Claude 3.5 Sonnet: F1-score de 79-94% na verificação de requisitos

#### 6.1.2 Domínio Específico

**Problema:** LLMs genéricos carecem de conhecimento especializado.

**Soluções:**
- Fine-tuning em corpus de domínio
- RAG com bases de conhecimento especializadas
- SLMs (Small Language Models) especializados
- KALMs (Knowledge-Augmented Language Models)

#### 6.1.3 Consistência e Rastreabilidade

**Desafios:**
- Manter consistência em requisitos gerados iterativamente
- Rastrear versões de prompts e seus outputs
- Vincular requisitos a código e testes

**Abordagens:**
- Versionamento de prompts (Git)
- Metadata em outputs (prompt_id, timestamp, model)
- Ferramentas de RE com integração LLM nativa

### 6.2 Desafios Organizacionais

#### 6.2.1 Mudança de Mindset

**Resistências:**
- Desconfiança em requisitos gerados por IA
- Medo de substituição de profissionais
- Curva de aprendizado de novas ferramentas

**Estratégias de Adoção:**
- Começar com casos de uso de baixo risco
- Human-in-the-loop como padrão
- Métricas de produtividade para demonstrar valor

#### 6.2.2 Integração com Processos Legados

**Desafios:**
- Ferramentas de RM (Requirements Management) tradicionais
- Processos documentados em normas
- Ciclos de aprovação formais

**Abordagens:**
- APIs e integrações
- Export para formatos tradicionais (DOORS, Jama)
- Camada de tradução entre prompts e documentos

### 6.3 Considerações Éticas

#### 6.3.1 Viés e Fairness

**Riscos:**
- LLMs podem perpetuar vieses dos dados de treinamento
- Requisitos discriminatórios não intencionais
- Exclusão de grupos de stakeholders

**Mitigações:**
- Diversidade nos dados de fine-tuning
- Auditar requisitos por vieses
- Inclusão de stakeholders diversos na validação

#### 6.3.2 Privacidade e Segurança

**Preocupações:**
- Dados de requisitos em APIs de LLM
- Vazamento de informações sensíveis
- Compliance com GDPR, LGPD

**Soluções:**
- LLMs on-premise ou privados
- Anonimização de dados antes de envio
- BYOK (Bring Your Own Key)
- Acordos de processamento de dados (DPA)

#### 6.3.3 Responsabilidade e Accountability

**Questões:**
- Quem é responsável por requisitos incorretos gerados por IA?
- Como auditar decisões de IA?
- Transparência nos processos de RE

**Práticas recomendadas:**
- Documentação de prompts usados
- Revisão humana obrigatória para requisitos críticos
- Logs de decisões de IA

### 6.4 Compliance Regulatório

#### 6.4.1 Standards e Normas

**Desafios de compliance:**
- ISO/IEC/IEEE 29148:2018 (Requirements Engineering)
- DO-178C (Aviação)
- ISO 26262 (Automotivo)
- IEC 62304 (Medical Devices)

**Exigências típicas:**
- Rastreabilidade completa
- Análise de impacto documentada
- Validação humana verificável
- Arquivamento de versões

#### 6.4.2 Estratégias de Compliance

1. **Documentação de Processo:**
   - Descrever como IA é usada no RE
   - Papéis e responsabilidades
   - Checkpoints de validação humana

2. **Evidências:**
   - Prompts usados (versionados)
   - Outputs gerados
   - Registros de revisão humana
   - Registros de aprovação

3. **Ferramentas Qualificadas:**
   - Uso de ferramentas com qualificação para domínio
   - IBM RQA para aeroespacial/automotivo
   - Validação de ferramentas em processo

---

## 7. Transformação de Papéis e Carreiras

### 7.1 O Novo Engenheiro de Requisitos

#### 7.1.1 De Autor para Curador

**Antes (Tradicional):**
- Escrever requisitos manualmente
- Conduzir entrevistas presenciais
- Criar documentos extensos

**Depois (Era LLM):**
- Projetar prompts efetivos
- Validar e curar outputs de IA
- Orquestrar agentes de IA
- Focar em decisões estratégicas

#### 7.1.2 Novas Competências Necessárias

1. **Prompt Engineering**
   - Design de prompts estruturados
   - Técnicas avançadas (CoT, RAG, CoV)
   - Iteração e refinamento

2. **Avaliação de IA**
   - Critérios de qualidade para outputs
   - Detecção de hallucinações
   - Benchmarking de modelos

3. **Orquestração de Agentes**
   - Design de sistemas multi-agente
   - Workflows de IA
   - Integração com ferramentas

4. **Governança de IA**
   - Ética em IA
   - Compliance e regulamentação
   - Gestão de riscos

### 7.2 O Futuro do Analista de Negócios (BA)

Segundo pesquisas recentes (2024-2025), o papel do BA está se fragmentando em três áreas:

#### 7.2.1 Storyteller (Narrador)

**Função:** Traduzir insights de IA em decisões de projeto.

**Atividades:**
- Comunicar resultados de análise de IA
- Criar narrativas de ROI
- Traduzir dados técnicos para executivos

#### 7.2.2 Steward (Guardião)

**Função:** Validar lineage de outputs de IA e mitigar vieses.

**Atividades:**
- Verificar qualidade de dados
- Assegurar compliance
- Governança de modelos

#### 7.2.3 Prompt Engineer

**Função:** Criar prompts efetivos para elicitar requisitos.

**Atividades:**
- Design de prompts especializados
- Frameworks de prompting
- Otimização de outputs

### 7.3 Impacto na Produtividade

**Dados documentados:**
- **40% maior produtividade** em organizações com IA (Matillion, 2025)
- **54% decisões mais rápidas**
- **80% redução no tempo** de geração de test cases (ThoughtWorks, 2025)
- **Dias economizados** em ciclos de requisitos (Medium, 2025)

### 7.4 Oportunidades Emergentes

1. **AI Requirements Architect**
   - Arquiteto especializado em sistemas de RE com IA

2. **Prompt Librarian**
   - Curador de bibliotecas de prompts organizacionais

3. **AI Validation Specialist**
   - Especialista em validação de outputs de IA

4. **Human-AI Interaction Designer**
   - Designer de interfaces entre humanos e agentes de RE

---

## 8. Casos de Estudo e Exemplos Práticos

### 8.1 Caso: Austrian Post Group IT (2024)

**Contexto:** Desenvolvimento ágil em grande escala

**Solução:** Sistema ALAS (Autonomous LLM-based Agent System)
- Uso de modelos GPT
- Automação de quality assurance de user stories
- Melhoria na qualidade de requisitos ágeis

**Resultados:**
- User stories mais consistentes
- Redução de retrabalho
- Melhor alinhamento entre times

### 8.2 Caso: Accenture (2024)

**Contexto:** Onboarding de novos funcionários

**Solução:** Arquitetura GenAI multi-modelo para assistência de conhecimento

**Resultados:**
- **50% redução** no tempo de treinamento de novos contratados
- Sistema de Q&A baseado em documentação interna
- RAG com dados corporativos

### 8.3 Caso: Banco Nacional (2024)

**Contexto:** Chatbot de suporte ao cliente com compliance regulatório

**Desafios:**
- Gestão de conhecimento de domínio
- Compliance regulatório
- Precisão em respostas

**Solução:** GPT-4 + RAG

**Lições aprendidas:**
- Importância de grounding em dados verificados
- Necessidade de human-in-the-loop
- Desafios de manutenção de knowledge base

### 8.4 Caso: GeneUS (2024)

**Contexto:** Pesquisa acadêmica em geração de user stories

**Solução:** Ferramenta baseada em GPT-4 para geração automática de user stories

**Input:** Documento de requisitos
**Output:** User stories + critérios de aceitação + especificações de teste

**Contribuição:** Demonstração viável de automação completa do ciclo

### 8.5 Caso: Teste de Especificação Formal (2024)

**Contexto:** Geração de especificações formais ACSL para C

**Abordagem:** Neuro-simbólica combinando GPT-4 com Frama-C
- PathCrawler para testes automatizados
- EVA para análise de valores
- GPT-4 para geração de anotações ACSL

**Resultados:**
- GPT-4 gerou especificações melhores que baseline
- Integração com métodos formais viável
- Requer supervisão para casos complexos

---

## 9. Tendências e Direções Futuras

### 9.1 Pesquisas em Andamento

#### 9.1.1 Áreas Prioritárias (Frontiers in CS, 2025)

1. **Extração de Terminologia**
   - Uso de LLMs para glossários automáticos
   - Padronização de vocabulário

2. **Recuperação de Requisitos**
   - Semantic search em bases de requisitos
   - Recomendação de requisitos similares

3. **RE Consciente de Ética**
   - Detecção automática de vieses
   - Fairness em requisitos
   - RE responsável

4. **SLMs para RE**
   - Modelos menores especializados
   - Eficiência computacional
   - Deployment on-premise

#### 9.1.2 Tecnologias Emergentes

1. **Multi-modal RE**
   - Elicitação a partir de imagens, diagramas, áudio
   - Geração de protótipos visuais

2. **Agentes Autônomos**
   - Agentes que conduzem RE completo com mínima supervisão
   - Negociação automática entre stakeholders

3. **Federated Learning para RE**
   - Aprendizado colaborativo sem compartilhar dados sensíveis
   - RE em consórcios

### 9.2 Previsões para 2025-2027

1. **Consolidação de Ferramentas**
   - Suites integradas de RE com IA nativa
   - Desaparecimento de ferramentas que não integrem IA

2. **Padrões de Prompt Engineering**
   - Emergência de standards para prompts de RE
   - Certificações em prompt engineering

3. **RE como Serviço (REaaS)**
   - APIs de elicitação e especificação
   - Microsserviços de RE

4. **Educação e Treinamento**
   - Prompt engineering obrigatório em cursos de RE
   - Ferramentas de RE com IA em ambientes acadêmicos

---

## 10. Diretrizes Práticas

### 10.1 Para Organizações

1. **Comece Pequeno**
   - Piloto em projeto não-crítico
   - Valide antes de escalar

2. **Invista em Capacitação**
   - Treinamento em prompt engineering
   - Cultura de human-in-the-loop

3. **Estabeleça Governança**
   - Políticas de uso de IA em RE
   - Processos de validação
   - Critérios de aceitação de outputs

4. **Meça Resultados**
   - Tempo de ciclo de requisitos
   - Qualidade (defeitos por requisito)
   - Satisfação de stakeholders

### 10.2 Para Profissionais

1. **Desenvolva Novas Habilidades**
   - Prompt engineering
   - Avaliação crítica de IA
   - Ferramentas emergentes

2. **Mantenha o Foco em Valor**
   - IA é ferramenta, não substituto
   - Foco em decisões estratégicas
   - Relacionamento com stakeholders

3. **Experimente e Compartilhe**
   - Teste novas técnicas
   - Contribua com a comunidade
   - Documente lições aprendidas

---

## Referências Bibliográficas

### Artigos Acadêmicos e Papers

1. **Arora, C., et al. (2024).** "Using LLMs in Software Requirements Specifications: An Empirical Evaluation." *arXiv:2404.17842*. https://arxiv.org/abs/2404.17842

2. **Ebrahim, A., et al. (2025).** "Enhancing Software Requirements Engineering with Language Models and Prompting Techniques: Insights from Current Research and Future Directions." *ACL Anthology 2025*. https://aclanthology.org/2025.acl-srw.31/

3. **Hemmat, M., et al. (2025).** "Research Directions for Using LLM in Software Requirement Engineering: A Systematic Review." *Frontiers in Computer Science, 7*. https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1519437/full

4. **Kässinger, F., et al. (2024).** "Exploring LLMs for Verifying Technical System Specifications Against Requirements." *arXiv:2411.11582*. https://arxiv.org/abs/2411.11582

5. **Liu, R., et al. (2024).** "Using LLM-Generated Draft Replies to Support Human Experts in Responding to Stakeholder Inquiries: A Real-World Case Study." *arXiv:2412.12732*. https://arxiv.org/abs/2412.12732

6. **Norheim, K., et al. (2024).** "From Inductive to Deductive: LLMs-Based Qualitative Data Analysis in Requirements Engineering." *arXiv:2504.19384*. https://arxiv.org/abs/2504.19384

7. **Vogelsang, A. (2024).** "From Specifications to Prompts: On the Future of Generative Large Language Models in Requirements Engineering." *IEEE Software, 41(5)*. https://www.computer.org/csdl/magazine/so/2024/05/10629163/1Zdj3HlmqFG

8. **Zadenoori, B., et al. (2025).** "Automated User Story Generation with Test Case Generation using LLMs." *arXiv:2404.01558*. https://arxiv.org/abs/2404.01558

9. **Zhang, K., et al. (2024).** "How Language Model Hallucinations Can Snowball." *Proceedings of the 41st International Conference on Machine Learning (ICML 2024)*. https://proceedings.mlr.press/v235/zhang24ay.html

### Relatórios Técnicos e White Papers

10. **IEEE Computer Society. (2024).** *Guide to the Software Engineering Body of Knowledge (SWEBOK Guide), Version 4.0*. IEEE Computer Society. https://www.computer.org/education/bodies-of-knowledge/software-engineering/v4

11. **ThoughtWorks. (2025).** "AI-Generated Test Cases from User Stories: An Experimental Research Study." https://www.thoughtworks.com/insights/blog/generative-ai/AI-generated-test-cases-from-user-stories-an-experimental-research-study

### Ferramentas e Plataformas

12. **Anthropic. (2024).** "Prompt Engineering Overview." *Claude Documentation*. https://docs.claude.com/docs/prompt-engineering

13. **Anthropic. (2024).** "Claude 4 Best Practices." https://console.anthropic.com/docs/prompt-engineering/claude-4-best-practices

14. **IBM. (2024).** "Engineering Requirements Quality Assistant." *IBM Documentation*. https://www.ibm.com/docs/en/erqa

15. **LangChain. (2024).** *LangChain Documentation*. https://python.langchain.com/docs/get_started/introduction

16. **Atlassian. (2024).** "AI Requirements Copilot for Jira." *Atlassian Marketplace*. https://marketplace.atlassian.com/apps/1234191/ai-requirements-copilot-for-jira

### Blogs e Artigos da Indústria

17. **Gudala, M. (2025).** "Business Analysts Who Partner with LLMs Are Transforming Their Role in 2025." *Medium*. https://manojgudala.medium.com/business-analysts-who-partner-with-llms-are-transforming-their-role-in-2025-fa771b7e1bfd

18. **Matillion. (2025).** "How AI Agents Are Transforming Business Analysis." https://www.matillion.com/blog/ai-agents-business-analysis

19. **Turing. (2025).** "The Future of Business Analysis In the Age of AI." https://www.turing.com/kb/future-of-business-analysis-in-the-age-of-ai

20. **ZenML. (2025).** "LLMOps in Production: 457 Case Studies of What Actually Works." https://www.zenml.io/blog/llmops-in-production-457-case-studies-of-what-actually-works

### Standards e Normas

21. **ISO/IEC/IEEE. (2018).** *ISO/IEC/IEEE 29148:2018 - Systems and software engineering — Life cycle processes — Requirements engineering*.

22. **IEEE Computer Society. (2024).** *SWEBOK Guide V4.0 Topics*. https://www.computer.org/education/bodies-of-knowledge/software-engineering/topics

---

## Notas de Pesquisa

### Modelo de IA Utilizado
- **Deep Research:** Exa Research Pro
- **Data da Pesquisa:** 2025-02-07
- **Fontes Primárias:** 22 referências acadêmicas e industriais
- **Período de Cobertura:** 2023-2025 (foco em 2024-2025)

### Limitações da Pesquisa
- Foco em fontes em inglês
- Priorização de pesquisas acadêmicas recentes
- Limitações de acesso a papers completos por paywalls

### Áreas para Pesquisa Adicional
1. Estudos de caso industriais detalhados
2. Métricas quantitativas de adoção de IA em RE
3. Comparação entre diferentes LLMs para tarefas específicas de RE
4. Custo-benefício de implementação de IA em RE

---

*Documento criado pelo agente @book-researcher*
*Fase: Research (Fase 1 do processo de escrita)*
*Próxima fase: Planejamento (@book-editor)*

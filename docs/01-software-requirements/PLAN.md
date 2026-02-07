---
title: Plano de Escrita - KA 01 Software Requirements (SWEBOK-AI v5.0)
created_at: 2025-02-07
tags: [software-requirements, plan, KA-01, SWEBOK-AI, planning]
status: planning
updated_at: 2025-02-07
ai_model: k2p5
agent: book-editor
---

# Plano de Escrita: KA 01 - Software Requirements

**KA:** 01 - Software Requirements\
**Status:** Planejamento Completo → Pronto para Fase de Rascunho\
**Princípio Orientador:** "O código tornou-se commodity; o contexto tornou-se
capital"

______________________________________________________________________

## Visão Geral do KA

Este KA reimagina a Engenharia de Requisitos para a era dos LLMs, abandonando a
premissa de que especificações são documentos estáticos. O foco é no **prompt
engineering como nova forma de especificação**, onde o contexto (dados de
domínio, restrições, exemplos) torna-se o ativo crítico para geração de
requisitos de qualidade.

______________________________________________________________________

## Estrutura Completa do KA

### Seção 1: Introdução e Fundamentos na Era dos LLMs

**Arquivo:** `01-introduction.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Compreender a transformação do papel dos requisitos na era dos LLMs
- Diferenciar especificações tradicionais de prompts estruturados
- Entender o princípio "contexto como capital"

#### Conteúdo Principal

1. **O Paradigma da Especificação**

   - Especificações tradicionais: documentos estáticos (IEEE 830, ISO 29148)
   - Prompts estruturados: especificações dinâmicas e executáveis
   - Tabela comparativa: Especificação vs. Prompt Engineering

2. **Fundamentos da Engenharia de Requisitos com IA**

   - Definição de requisito de software no contexto de LLMs
   - Categorias: funcionais, não-funcionais, restrições
   - Requisitos como código (Requirements as Code)

3. **O Novo Ciclo de Vida do RE**

   - Ciclo híbrido humano-IA
   - Continuous Requirements Engineering
   - Diagrama: AI-Augmented RE Cycle

#### Referências Cruzadas

- KA 00 (New Era): Princípio de "contexto como capital"
- KA 03 (Software Design): Interface com design orientado a prompts
- KA 05 (Software Testing): Geração de testes a partir de requisitos

#### Tags

`#introducao`, `#fundamentos`, `#paradigma`, `#ciclo-de-vida`

______________________________________________________________________

### Seção 2: Elicitação Assistida por IA

**Arquivo:** `02-elicitation.md`\
**Estimativa:** 2.500-3.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Aplicar técnicas de elicitação com assistência de LLMs
- Utilizar simulação de stakeholders com IA
- Extrair requisitos de documentos automaticamente

#### Conteúdo Principal

1. **Simulação de Stakeholders com LLMs**

   - Técnica de role-playing com IA
   - Estudo de caso: LLMREI (sistema GPT-4o para entrevistas)
   - Métricas: 73.7% de extração comparado a humanos
   - Padrões de prompt para simulação

2. **Análise Automática de Documentos**

   - Extração de requisitos de documentos de stakeholders
   - Sumarização automática de especificações técnicas
   - Identificação de requisitos implícitos e latentes
   - Templates de prompt para análise documental

3. **Geração de Perguntas de Elicitação**

   - Criação contextualizada de perguntas baseadas no domínio
   - Adaptação dinâmica do nível de detalhe
   - Geração de follow-up questions
   - Framework LEIA para elicitação assistida

4. **Integração com Técnicas Tradicionais**

   - Workshops assistidos por IA
   - Brainstorming com geração automática de ideias
   - Prototipagem rápida com LLMs

#### Referências Cruzadas

- KA 14 (Professional Practice): Comunicação com stakeholders
- KA 16 (Appendix): Templates de prompts

#### Tags

`#elicitation`, `#stakeholders`, `#entrevistas`, `#analise-documental`

______________________________________________________________________

### Seção 3: Análise de Requisitos com IA

**Arquivo:** `03-analysis.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Analisar requisitos usando técnicas de IA
- Detectar ambiguidades e inconsistências automaticamente
- Realizar análise de impacto com assistência de LLMs

#### Conteúdo Principal

1. **Detecção de Ambiguidade**

   - Identificação automática de termos ambíguos
   - Sugestões de clarificação
   - Análise de consistência entre requisitos
   - Ferramentas: IBM RQA, detectores open-source

2. **Clustering e De-duplicação**

   - Agrupamento automático de user stories similares
   - Identificação de requisitos duplicados
   - NLP para análise semântica
   - Algoritmos de similaridade (cosine, embeddings)

3. **Análise de Impacto com LLMs**

   - Avaliação de impacto de mudanças
   - Identificação de dependências ocultas
   - Sugestão de alternativas
   - Técnica Chain-of-Thought para análise de impacto

4. **Negociação e Priorização**

   - Análise multi-critério com IA
   - Identificação de conflitos entre stakeholders
   - Sugestões de trade-offs
   - Framework Tree-of-Thought para decisões

#### Referências Cruzadas

- KA 09 (Management): Priorização e decisões
- KA 12 (Quality): Qualidade de requisitos

#### Tags

`#analise`, `#ambiguidade`, `#impacto`, `#priorizacao`

______________________________________________________________________

### Seção 4: Especificação como Prompt Engineering

**Arquivo:** `04-specification.md`\
**Estimativa:** 3.000-3.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Dominar o prompt engineering como forma de especificação
- Aplicar técnicas avançadas (CoT, RAG, CoV)
- Gerar artefatos de especificação com qualidade profissional

#### Conteúdo Principal

1. **Componentes de um Prompt Efetivo para RE**

   - Context (domínio, stakeholders, restrições)
   - Task (ação específica)
   - Output Format (JSON, XML, texto estruturado)
   - Constraints (limitações técnicas, padrões)
   - Examples (few-shot learning)
   - Template padrão recomendado

2. **Técnicas Avançadas de Prompt Engineering**

   - **Chain-of-Thought (CoT):** Raciocínio passo a passo
   - **Retrieval-Augmented Generation (RAG):** Especificações contextualizadas
   - **Chain-of-Verification (CoV):** Redução de hallucinações
   - **Role-Based Prompting:** Personas para diferentes contextos
   - **Tree-of-Thought (ToT):** Exploração de múltiplos caminhos

3. **Geração de User Stories**

   - Ferramenta GeneUS: GPT-4 para user stories
   - Inclusão automática de critérios de aceitação
   - Especificação de testes
   - Padrão: "Como [persona], quero [ação], para que [benefício]"

4. **Geração de Casos de Uso**

   - Conversão de requisitos textuais para casos de uso
   - Especificação de fluxos principais e alternativos
   - Cenários de exceção
   - Diagramas automáticos

5. **Formalização de Requisitos**

   - Conversão para notações formais (ACSL, Z, B)
   - Abordagem neuro-simbólica
   - Integração com Frama-C
   - Quando usar formalização

6. **Frameworks de Prompt Engineering**

   - CLEK Framework (Context, Language, Examples, Keywords)
   - Framework de Prompts Iterativos
   - Versionamento de prompts

#### Referências Cruzadas

- KA 03 (Software Design): Especificação para design
- KA 16 (Appendix): Biblioteca de prompts

#### Tags

`#especificacao`, `#prompt-engineering`, `#user-stories`, `#casos-de-uso`

______________________________________________________________________

### Seção 5: Validação e Verificação Automatizada

**Arquivo:** `05-validation.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Validar requisitos usando técnicas de IA
- Verificar completude e consistência automaticamente
- Gerar testes de aceitação a partir de requisitos

#### Conteúdo Principal

1. **Verificação de Completude**

   - Análise de cobertura de requisitos
   - Identificação de gaps
   - Sugestão de requisitos faltantes
   - Checklists automatizados

2. **Verificação de Consistência**

   - Detecção de conflitos entre requisitos
   - Análise de contradições lógicas
   - Verificação de conformidade com padrões
   - Matrizes de consistência

3. **Geração de Testes de Aceitação**

   - Estudo ThoughtWorks: 80% redução no tempo
   - Formato Gherkin (Given-When-Then)
   - Cenários de edge cases
   - Consistência de 96.11%
   - Refinamento iterativo de prompts

4. **Revisões e Inspeções com IA**

   - Checklists de qualidade automatizados
   - Scoring de qualidade de requisitos
   - Métricas: F1-scores de 79-94%
   - Few-shot vs. Chain-of-Thought

5. **Validação com Stakeholders**

   - Simulação de validação
   - Prototipagem rápida
   - Feedback loops acelerados

#### Referências Cruzadas

- KA 05 (Software Testing): Integração testes-requisitos
- KA 12 (Software Quality): Qualidade e métricas

#### Tags

`#validacao`, `#verificacao`, `#testes-aceitacao`, `#qualidade`

______________________________________________________________________

### Seção 6: Gestão de Requisitos Contínua

**Arquivo:** `06-management.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Implementar gestão de requisitos na era dos LLMs
- Versionar prompts e rastrear mudanças
- Manter rastreabilidade em ambientes ágeis

#### Conteúdo Principal

1. **Requirements as Code**

   - Versionamento de prompts no Git
   - Pipelines de validação automática (CI/CD para requisitos)
   - Requisitos tratados como código-fonte
   - Code review para prompts

2. **Rastreabilidade**

   - Rastreabilidade prompt → requisito → código → teste
   - Metadata em outputs (prompt_id, timestamp, model)
   - Ferramentas de RE com integração LLM nativa
   - Matrizes de rastreabilidade automatizadas

3. **Controle de Mudanças**

   - Análise de impacto automatizada
   - Propagação de mudanças
   - Versionamento semântico de requisitos
   - Linhas de base de prompts

4. **Gestão de Conhecimento com RAG**

   - Knowledge-Augmented RE
   - Bases de conhecimento organizacionais
   - Documentação técnica histórica
   - Glossários corporativos automáticos

5. **Ferramentas de Gestão**

   - Integração com Jira, Confluence
   - AI Copilot for Jira
   - Atlassian Intelligence (Rovo)
   - IBM Engineering Requirements Quality Assistant

#### Referências Cruzadas

- KA 08 (Configuration Management): Versionamento
- KA 10 (Engineering Process): Processos ágeis

#### Tags

`#gestao`, `#rastreabilidade`, `#versionamento`, `#rag`

______________________________________________________________________

### Seção 7: Ferramentas e Tecnologias

**Arquivo:** `07-tools.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Avaliar e selecionar ferramentas de RE com IA
- Implementar soluções com LangChain e frameworks open-source
- Integrar ferramentas comerciais aos processos

#### Conteúdo Principal

1. **Ferramentas Comerciais**

   - **IBM RQA:** Qualidade de requisitos, Watson NLP
   - **AI Copilot for Jira:** Geração de requisitos, testes Gherkin
   - **Atlassian Intelligence (Rovo):** Automação, sumarização
   - **Confluence Whiteboard + AI:** Colaboração visual
   - **TestStory AI:** Geração de testes a partir de user stories
   - Comparativo: funcionalidades, integração, preço

2. **Ferramentas Open-Source**

   - **LangChain:** Orquestração de agentes de RE
   - **Grounded AI Hallucination Validator:** Detecção de hallucinações
   - **GenAI4RE Repositórios:** Datasets, benchmarks
   - **LLMREI:** Sistema de entrevistas automatizadas

3. **Frameworks e Plataformas**

   - **LangChain para RE:** Chains e pipelines
   - **Vector DBs:** Pinecone, Chroma, Weaviate
   - **Embeddings:** text-embedding-ada-002
   - **Arquitetura RAG para RE**

4. **Critérios de Seleção**

   - Integração com stack existente
   - Compliance regulatório
   - Segurança e privacidade (BYOK)
   - Custo-benefício

#### Referências Cruzadas

- KA 06 (Operations): Operação de ferramentas
- KA 16 (Appendix): Setup de ferramentas

#### Tags

`#ferramentas`, `#langchain`, `#ibm-rqa`, `#jira`

______________________________________________________________________

### Seção 8: Desafios e Considerações

**Arquivo:** `08-challenges.md`\
**Estimativa:** 2.500-3.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Identificar e mitigar riscos do uso de IA em RE
- Endereçar questões éticas e de compliance
- Gerenciar expectativas e adoção organizacional

#### Conteúdo Principal

1. **Desafios Técnicos**

   - **Hallucinações:** Taxas de 30%+ em domínios especializados
     - Manifestações em RE: requisitos irreais, dependências inexistentes
     - Estratégias: Multi-Layered Framework, CoV
     - Ferramentas: HaluCheck, THaMES
   - **Domínio Específico:** Conhecimento especializado
     - Fine-tuning em corpus de domínio
     - SLMs especializados
     - KALMs (Knowledge-Augmented Language Models)
   - **Consistência e Rastreabilidade:**
     - Manter coerência em iterações
     - Versionamento de prompts e outputs

2. **Desafios Organizacionais**

   - **Mudança de Mindset:**
     - Resistência a requisitos gerados por IA
     - Medo de substituição de profissionais
     - Curva de aprendizado
     - Estratégias de adoção
   - **Integração com Processos Legados:**
     - Ferramentas de RM tradicionais (DOORS, Jama)
     - Normas e processos documentados
     - Ciclos de aprovação formais

3. **Considerações Éticas**

   - **Viés e Fairness:**
     - Requisitos discriminatórios não intencionais
     - Diversidade nos dados
     - Auditoria de requisitos
   - **Privacidade e Segurança:**
     - Dados de requisitos em APIs de LLM
     - GDPR, LGPD compliance
     - LLMs on-premise, anonimização
     - BYOK (Bring Your Own Key)
   - **Responsabilidade e Accountability:**
     - Quem é responsável por requisitos incorretos?
     - Auditoria de decisões de IA
     - Documentação de prompts

4. **Compliance Regulatório**

   - Standards: ISO/IEC/IEEE 29148:2018, DO-178C, ISO 26262, IEC 62304
   - Exigências: rastreabilidade completa, análise de impacto documentada
   - Estratégias: documentação de processo, evidências, ferramentas qualificadas

#### Referências Cruzadas

- KA 13 (Security): Segurança em RE
- KA 14 (Professional Practice): Ética profissional

#### Tags

`#desafios`, `#hallucinations`, `#etica`, `#compliance`, `#privacidade`

______________________________________________________________________

### Seção 9: Transformação de Papéis e Carreiras

**Arquivo:** `09-roles.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Compreender a transformação do papel do engenheiro de requisitos
- Identificar novas competências necessárias
- Planejar carreira na era dos LLMs

#### Conteúdo Principal

1. **O Novo Engenheiro de Requisitos**

   - **De Autor para Curador:**
     - Antes: Escrever manualmente, entrevistas presenciais
     - Depois: Projetar prompts, validar outputs, orquestrar agentes
   - **Novas Competências:**
     - Prompt Engineering
     - Avaliação de IA (detecção de hallucinações, benchmarking)
     - Orquestração de Agentes
     - Governança de IA (ética, compliance, riscos)

2. **O Futuro do Analista de Negócios (BA)**

   - **Storyteller:** Traduzir insights de IA em decisões
   - **Steward:** Validar lineage, mitigar vieses, governança
   - **Prompt Engineer:** Design de prompts especializados

3. **Impacto na Produtividade**

   - 40% maior produtividade em orgs com IA
   - 54% decisões mais rápidas
   - 80% redução no tempo de geração de test cases
   - Dias economizados em ciclos de requisitos

4. **Oportunidades Emergentes**

   - AI Requirements Architect
   - Prompt Librarian
   - AI Validation Specialist
   - Human-AI Interaction Designer

#### Referências Cruzadas

- KA 14 (Professional Practice): Prática profissional
- KA 15 (Economics): Produtividade e ROI

#### Tags

`#carreiras`, `#engenheiro-requisitos`, `#analista-negocios`, `#competencias`

______________________________________________________________________

### Seção 10: Case Studies e Exemplos Práticos

**Arquivo:** `10-case-studies.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Analisar casos reais de adoção de IA em RE
- Extrair lições aprendidas de implementações
- Aplicar padrões de sucesso em projetos

#### Conteúdo Principal

1. **Caso: Austrian Post Group IT (2024)**

   - Contexto: Desenvolvimento ágil em grande escala
   - Solução: Sistema ALAS (Autonomous LLM-based Agent System)
   - Resultados: User stories consistentes, redução de retrabalho

2. **Caso: Accenture (2024)**

   - Contexto: Onboarding de funcionários
   - Solução: Arquitetura GenAI multi-modelo
   - Resultados: 50% redução no tempo de treinamento

3. **Caso: Banco Nacional (2024)**

   - Contexto: Chatbot com compliance regulatório
   - Solução: GPT-4 + RAG
   - Lições: Importância de grounding, human-in-the-loop

4. **Caso: GeneUS (2024)**

   - Contexto: Pesquisa acadêmica em user stories
   - Solução: GPT-4 para geração automática
   - Contribuição: Automação completa do ciclo

5. **Caso: Especificação Formal (2024)**

   - Contexto: Geração de ACSL para C
   - Solução: Neuro-simbólica com GPT-4 + Frama-C
   - Resultados: Melhor que baseline, requer supervisão

6. **Padrões e Anti-padrões**

   - O que funcionou em cada caso
   - Erros comuns a evitar
   - Checklist de lições aprendidas

#### Referências Cruzadas

- KA 09 (Management): Gestão de projetos
- KA 11 (Models and Methods): Aplicação prática

#### Tags

`#case-studies`, `#exemplos`, `#pratica`, `#implementacao`

______________________________________________________________________

### Seção 11: Tendências e Direções Futuras

**Arquivo:** `11-future.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem

- Antecipar tendências em RE com IA
- Preparar-se para tecnologias emergentes
- Posicionar-se profissionalmente para o futuro

#### Conteúdo Principal

1. **Pesquisas em Andamento**

   - Extração de terminologia e glossários automáticos
   - Recuperação de requisitos (semantic search)
   - RE consciente de ética (fairness, responsabilidade)
   - SLMs para RE (modelos menores, on-premise)

2. **Tecnologias Emergentes**

   - **Multi-modal RE:** Elicitação de imagens, diagramas, áudio
   - **Agentes Autônomos:** RE completo com mínima supervisão
   - **Federated Learning:** RE em consórcios sem compartilhar dados

3. **Previsões para 2025-2027**

   - Consolidação de ferramentas (suites integradas)
   - Padrões de Prompt Engineering (certificações)
   - RE como Serviço (REaaS, APIs, microsserviços)
   - Educação: prompt engineering obrigatório

4. **Diretrizes para Organizações**

   - Comece pequeno (pilotos não-críticos)
   - Invista em capacitação
   - Estabeleça governança
   - Meça resultados

5. **Diretrizes para Profissionais**

   - Desenvolva novas habilidades
   - Mantenha foco em valor
   - Experimente e compartilhe

#### Referências Cruzadas

- KA 00 (New Era): Visão de futuro
- KA 16 (Appendix): Recursos adicionais

#### Tags

`#tendencias`, `#futuro`, `#pesquisa`, `#diretrizes`

______________________________________________________________________

## Sumário da Estrutura

| Seção | Arquivo               | Palavras    | Foco Principal                        |
| ----- | --------------------- | ----------- | ------------------------------------- |
| 1     | `01-introduction.md`  | 1.500-2.000 | Paradigma, fundamentos, ciclo de vida |
| 2     | `02-elicitation.md`   | 2.500-3.000 | Elicitação com IA, simulação, análise |
| 3     | `03-analysis.md`      | 2.000-2.500 | Análise, ambiguidade, impacto         |
| 4     | `04-specification.md` | 3.000-3.500 | Prompt engineering, artefatos         |
| 5     | `05-validation.md`    | 2.000-2.500 | Validação, verificação, testes        |
| 6     | `06-management.md`    | 2.000-2.500 | Gestão, rastreabilidade, RAG          |
| 7     | `07-tools.md`         | 2.000-2.500 | Ferramentas, integração               |
| 8     | `08-challenges.md`    | 2.500-3.000 | Desafios, ética, compliance           |
| 9     | `09-roles.md`         | 1.500-2.000 | Papéis, carreiras, competências       |
| 10    | `10-case-studies.md`  | 2.000-2.500 | Casos reais, lições                   |
| 11    | `11-future.md`        | 1.500-2.000 | Tendências, direções                  |

**Total Estimado:** 22.000-26.000 palavras

______________________________________________________________________

## Tags Gerais do KA

`#software-requirements`, `#requirements-engineering`, `#LLM`,
`#prompt-engineering`, `#elicitation`, `#specification`, `#validation`,
`#management`, `#AI`, `#generative-AI`, `#SWEBOK-AI`, `#KA-01`

______________________________________________________________________

## Próximos Passos

1. **Fase de Rascunho:** @book-writer cria versões draft de cada seção
2. **Fase de Revisão:** @book-reviewer sugere melhorias
3. **Fase de Escrita:** @book-writer desenvolve até aprovação
4. **Fase de Publicação:** @book-editor finaliza e marca como published

______________________________________________________________________

*Plano criado por @book-editor*\
*Baseado em pesquisa extensiva de 22 fontes (2023-2025)*\
*Princípio: "O código tornou-se commodity; o contexto tornou-se capital"*

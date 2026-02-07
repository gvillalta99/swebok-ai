---
title: Software Requirements - Engenharia de Requisitos na Era dos LLMs
created_at: 2025-02-08
tags: [ka-01, software-requirements, requirements-engineering, LLM, prompt-engineering, SWEBOK-AI]
status: published
updated_at: 2025-02-08
ai_model: k2p5
agent: book-editor
---

# KA 01: Software Requirements

## Engenharia de Requisitos na Era dos Large Language Models

______________________________________________________________________

## Resumo Executivo

Este Knowledge Area (KA) apresenta uma reimaginação completa da engenharia de
requisitos para a era dos Large Language Models (LLMs). Seguindo o princípio
orientador do SWEBOK-AI v5.0 — **"O código tornou-se commodity; o contexto
tornou-se capital"** — exploramos como a inteligência artificial generativa
transforma fundamentalmente a forma como descobrimos, analisamos, especificamos,
validamos e gerenciamos requisitos de software.

O paradigma tradicional de especificação formal dá lugar ao **prompt engineering
como especificação**, onde a qualidade do contexto e a precisão das instruções
determinam o sucesso do sistema. Este KA oferece um guia completo para
profissionais que precisam navegar essa transição, desde fundamentos teóricos
até implementações práticas com ferramentas modernas.

______________________________________________________________________

## Estrutura do KA

### Fundamentos e Transformação Paradigmática

1. **[Introdução e Fundamentos na Era dos LLMs](./01-introduction.md)**
   - O paradigma shift: da especificação formal ao prompt engineering
   - O ciclo de vida híbrido humano-IA
   - Categorias de requisitos no contexto de LLMs
   - Considerações sobre qualidade e hallucinações

### Processos de Engenharia de Requisitos com IA

2. **[Elicitação Assistida por IA](./02-elicitation.md)**

   - Simulação de stakeholders com LLMs
   - Framework LEIA para elicitação interativa
   - Análise documental automatizada (LLMREI)
   - Workshops e brainstormings híbridos

3. **[Análise de Requisitos](./03-analysis.md)**

   - Detecção automatizada de ambiguidade
   - Framework SMELL para smells de requisitos
   - Análise de impacto e priorização assistida
   - Consistência e análise de trade-offs

4. **[Especificação como Prompt Engineering](./04-specification.md)**

   - Template padrão: ROLE, CONTEXT, TASK, CONSTRAINTS, EXAMPLES, OUTPUT
   - Técnicas avançadas: Chain-of-Thought, RAG, Chain-of-Verification
   - Framework CLEK para especificação por contratos
   - Formalização neuro-simbólica

5. **[Validação e Verificação](./05-validation.md)**

   - Validação automatizada de completude e consistência
   - Testes de aceitação gerados por IA
   - Verificação com base em cenários e edge cases
   - Métricas e critérios de qualidade

6. **[Gestão de Requisitos Contínua](./06-management.md)**

   - Requirements as Code (RAC)
   - Rastreabilidade automatizada com embeddings
   - Sincronização bidirecional código-requisitos
   - Feedback loops e aprendizado contínuo

### Contexto e Aplicação

7. **[Ferramentas e Tecnologias](./07-tools.md)**

   - IBM Engineering Requirements Quality Assistant
   - AI Copilot for Jira e Atlassian Rovo
   - LangChain e LangGraph para orquestração
   - Bases de dados vetoriais e critérios de seleção

8. **[Desafios e Considerações](./08-challenges.md)**

   - Hallucinações: detecção e mitigação
   - Viés, fairness e considerações éticas
   - Compliance regulatório (ISO, DO-178C, ISO 26262)
   - Framework de gestão de riscos

9. **[Transformação de Papéis e Carreiras](./09-roles.md)**

   - Do autor ao curador: novo perfil do engenheiro de requisitos
   - Business Analyst do futuro: Storyteller, Steward, Prompt Engineer
   - Novas competências e carreiras emergentes
   - Programa de transição de 12 meses

### Evidências e Direções Futuras

10. **[Case Studies e Exemplos Práticos](./10-case-studies.md)**

    - Austrian Post: quality assurance de user stories
    - Accenture: onboarding com GenAI multi-modelo
    - Banco Nacional: chatbot com compliance regulatório
    - GeneUS: automação completa do ciclo
    - Especificação formal neuro-simbólica

11. **[Tendências e Direções Futuras](./11-future.md)**

    - Pesquisas em andamento na academia
    - Tecnologias emergentes: multi-modal, agentes autônomos
    - Previsões 2025-2027: REaaS, consolidação de ferramentas
    - Plano de desenvolvimento de carreira

______________________________________________________________________

## Para Quem é Este KA

**Público-alvo principal:**

- Engenheiros de requisitos e Business Analysts
- Product Managers e Product Owners
- Arquitetos de software e líderes técnicos
- Pesquisadores em engenharia de software
- Estudantes de computação e sistemas de informação

**Pré-requisitos:**

- Conhecimento básico de engenharia de software
- Familiaridade com conceitos de requisitos (funcionais, não-funcionais)
- Noções de inteligência artificial e LLMs (diferencial)

______________________________________________________________________

## Como Usar Este KA

### Para Iniciantes em IA

Comece pelos fundamentos ([Seção 1](./01-introduction.md)) e avance
sequencialmente. Preste atenção especial nas seções sobre desafios
([Seção 8](./08-challenges.md)) antes de implementar soluções.

### Para Profissionais Experientes

Vá direto para as seções de processos ([Seções 2-6](./02-elicitation.md)) e
ferramentas ([Seção 7](./07-tools.md)). Os [Case Studies](./10-case-studies.md)
oferecem modelos práticos de implementação.

### Para Líderes e Gestores

Foque na [transformação de papéis](./09-roles.md) e
[tendências futuras](./11-future.md) para planejar a evolução da sua
organização.

______________________________________________________________________

## Principais Contribuições deste KA

1. **Framework Integrado**: Primeiro guia completo que une engenharia de
   requisitos tradicional com práticas modernas de LLM

2. **Templates Práticos**: Mais de 20 templates de prompts prontos para uso em
   projetos reais

3. **Evidências Empíricas**: Casos de estudo documentados com métricas reais de
   produtividade e qualidade

4. **Abordagem Crítica**: Discussão honesta sobre limitações, riscos e quando
   NÃO usar IA

5. **Visão de Futuro**: Diretrizes baseadas em pesquisas acadêmicas recentes
   (2024-2025)

______________________________________________________________________

## Princípios Orientadores

> **"O código tornou-se commodity; o contexto tornou-se capital."**

Este princípio permeia todo o KA:

- A geração de código por LLMs é infraestrutura, não diferencial competitivo
- O valor está na especificação precisa, no contexto rico e na validação
  rigorosa
- O engenheiro de requisitos evolui de autor para **curador e arquiteto de
  contexto**

______________________________________________________________________

## Referências Cruzadas

Este KA se conecta com:

- **KA 02 - Software Architecture**: Decisões arquiteturais influenciam
  requisitos não-funcionais
- **KA 05 - Software Testing**: Requisitos gerados servem de base para testes
  automatizados
- **KA 12 - Software Quality**: Qualidade de requisitos determina qualidade do
  sistema
- **KA 14 - Professional Practice**: Aspectos éticos e profissionais da
  elicitação com IA

______________________________________________________________________

## Status e Versionamento

- **Versão**: 1.0
- **Status**: Published
- **Última atualização**: 2025-02-08
- **Total de palavras**: ~59.500
- **Total de seções**: 11

______________________________________________________________________

## Feedback e Contribuições

Este KA é um documento vivo. Para sugestões, correções ou contribuições:

1. Abra uma issue no repositório do projeto
2. Consulte o arquivo `PLAN.md` para entender a estrutura planejada
3. Siga as convenções de frontmatter e formatação estabelecidas

______________________________________________________________________

*SWEBOK-AI v5.0 - Knowledge Area 01: Software Requirements*\
*Transformando a engenharia de requisitos para a era dos Large Language Models*

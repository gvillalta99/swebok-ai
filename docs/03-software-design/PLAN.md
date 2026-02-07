# Plano de Escrita - KA 03: Software Design

**Status:** draft\
**Versão:** 1.0\
**Data de Criação:** 2026-02-07\
**Responsável:** @book-editor

______________________________________________________________________

## Visão Geral

Este KA reimagina o Software Design para a era dos LLMs, partindo da premissa de
que **"o código tornou-se commodity; o contexto tornou-se capital"**. O design
de software deixa de ser primariamente sobre implementação manual para se tornar
sobre orquestração de sistemas, engenharia de contexto e especificação de
comportamentos.

**Público-Alvo:** Arquitetos de software, líderes técnicos, engenheiros seniores
e profissionais de desenvolvimento que trabalham com sistemas tradicionais e/ou
com IA generativa.

______________________________________________________________________

## Estrutura do KA

### Seção 1: Introdução ao Design de Software na Era da IA

**Arquivo:** `01-introducao-design-era-ia.md`\
**Status:** draft\
**Tamanho Estimado:** 1.500-2.000 palavras\
**Dependências:** Nenhuma

**Objetivo:**\
Estabelecer o contexto fundamental da transformação do design de software
impulsionada por IA generativa, apresentando a nova realidade onde engenheiros
atuam como orquestradores em vez de codificadores linha a linha.

**Tópicos a Cobrir:**

1. A nova realidade do design de software (GitHub Survey 2024 - 90% melhoria na
   produtividade)
2. Mudanças fundamentais:
   - De implementação manual para orquestração
   - De código determinístico para sistemas probabilísticos
   - De documentação estática para documentação viva
3. Modularity, Coupling e Cohesion em contexto de IA
   - Sistemas de IA favorecem modelos modulares
   - Especialistas especializados e coordenados (Microsoft Research 2024)
   - Código gerado por IA: alta coesão, risco de acoplamento inadvertido
4. Paradigmas emergentes:
   - Chat-Oriented Programming (CHOP) - Steve Yegge
   - Vibe Coding - Andrej Karpathy
   - Programação via refinamento iterativo de prompts

**Referências Principais:**

- GitHub Survey (2024)
- Khononov, "Balancing Coupling in Software Design" (2024)
- Microsoft Research (2024)
- ArXiv (2025)
- Yegge (2024), Karpathy (2025)

______________________________________________________________________

### Seção 2: Princípios de Design Clássicos na Era da IA

**Arquivo:** `02-principios-design-classicos.md`\
**Status:** draft\
**Tamanho Estimado:** 2.000-2.500 palavras\
**Dependências:** Seção 1

**Objetivo:**\
Reinterpretar princípios clássicos de design (SOLID, DRY, KISS) para o contexto
de desenvolvimento com IA, identificando como aplicá-los via engenharia de
prompt e quais armadilhas evitar.

**Tópicos a Cobrir:**

1. SOLID e código gerado por IA
   - Single Responsibility Principle (SRP): problema de "responsibility
     overload"
   - Open/Closed Principle (OCP): rigidez acidental e abstração
   - Liskov Substitution Principle (LSP): validação de hierarquias
   - Interface Segregation Principle (ISP): interfaces inchadas
   - Dependency Inversion Principle (DIP): dependências diretas vs abstrações
2. Aplicando SOLID via Prompt Engineering
   - Prompts estruturados
   - Exemplos few-shot
   - Revisão iterativa
   - Contexto arquitetural
3. DRY (Don't Repeat Yourself)
   - IA identifica duplicação automaticamente
   - Risco de over-engineering
4. KISS (Keep It Simple, Stupid)
   - Tensão: capacidade de gerar soluções complexas vs simplicidade
   - YAGNI ainda aplica-se
5. Princípio da Menor Surpresa (PoLA)
   - Validação humana de contratos de API

**Referências Principais:**

- BRGR (2024)
- Syncfusion (2025)
- Retool (2024)

______________________________________________________________________

### Seção 3: Arquitetura vs Design em Contexto de IA

**Arquivo:** `03-arquitetura-vs-design.md`\
**Status:** draft\
**Tamanho Estimado:** 1.500-2.000 palavras\
**Dependências:** Seção 1

**Objetivo:**\
Diferenciar claramente os papéis de arquitetura e design em projetos com IA,
estabelecendo limites e responsabilidades, e apresentando o papel evolutivo do
arquiteto.

**Tópicos a Cobrir:**

1. Diferenciação em contexto de IA
   - Arquitetura: estrutura de alto nível, orquestração de LLMs, RAG, agentes
   - Design: implementação de componentes, refinamento de prompts, interfaces
2. O papel do arquiteto de software com IA
   - iSAQB (2025): cinco atividades suportadas por IA
   - Clarificação de requisitos
   - Design de estruturas
   - Design de conceitos transversais
   - Avaliação de arquiteturas
   - Comunicação
3. Tensões e trade-offs
   - Determinismo vs Probabilidade
   - Latência e custo
   - Graceful degradation

**Referências Principais:**

- InfoQ (2024)
- iSAQB (2025)

______________________________________________________________________

### Seção 4: Padrões de Design Clássicos na Era da IA

**Arquivo:** `04-padroes-design-classicos.md`\
**Status:** draft\
**Tamanho Estimado:** 2.000-2.500 palavras\
**Dependências:** Seção 2

**Objetivo:**\
Revisitar os padrões clássicos (GoF) e empresariais, mostrando como são
aplicados e gerados por IA, e identificando novos usos em sistemas com LLMs.

**Tópicos a Cobrir:**

1. Padrões GoF na era da IA
   - Padrões Criacionais: Factory, Builder, Singleton
   - Padrões Estruturais: Adapter (integração legado-LLM), Facade (Agent
     Facade), Decorator
   - Padrões Comportamentais: Strategy (LLMs vs lógica tradicional), Observer,
     Command (base para Tool Use)
2. Padrões Empresariais Adaptados
   - Layered Architecture: nova camada "AI Orchestration"
   - Microservices: microserviços de IA especializados, API Gateway com circuit
     breaker
   - Event-Driven Architecture: integração com streams, Event Sourcing para
     rastreabilidade

**Referências Principais:**

- TestingIL (2025)
- ArXiv (2024)
- Microsoft (2024)

______________________________________________________________________

### Seção 5: Novos Padrões de Design para IA

**Arquivo:** `05-padroes-design-ia.md`\
**Status:** draft\
**Tamanho Estimado:** 2.500-3.000 palavras\
**Dependências:** Seção 4

**Objetivo:**\
Apresentar os 32 padrões de design catalogados por Lakshmanan & Hapke (O'Reilly,
2024\) e outros padrões emergentes específicos para sistemas com IA generativa.

**Tópicos a Cobrir:**

1. Framework de 32 padrões (categorias):
   - Controle de Estilo de Conteúdo (Logits Masking, Style Transfer, Prompt
     Templates)
   - Adição de Conhecimento (RAG, Semantic Indexing, Deep Search)
   - Extensão de Capacidades (Chain of Thought, Adapter Tuning, Evol-Instruct)
   - Melhoria de Confiabilidade (LLM-as-Judge, Reflection, Prompt Optimization)
   - Habilitação de Agentes (Tool Calling, Multi-agent Collaboration)
   - Endereçamento de Constraints (SLM, Prompt Caching, Inference Optimization)
   - Salvaguardas (Guardrails, Self-Check)
2. LLM Triangle Principles (2025)
   - Standard Operating Procedure (SOP)
   - Prompt Chaining
   - RAG como Fundação
3. Seis Princípios de Design para Generative AI (IBM/CHI 2024)
   - Clareza de propósito e limitações
   - Controle e personalização
   - Feedback e transparência
   - Gerenciamento de erros gracefully
   - Privacidade e segurança
   - Inclusão e acessibilidade

**Referências Principais:**

- Lakshmanan & Hapke (O'Reilly, 2024)
- Medium (2025)
- IBM Research (CHI 2024)

______________________________________________________________________

### Seção 6: Design Patterns para Sistemas com IA

**Arquivo:** `06-design-patterns-sistemas-ia.md`\
**Status:** draft\
**Tamanho Estimado:** 2.500-3.000 palavras\
**Dependências:** Seção 5

**Objetivo:**\
Detalhar patterns específicos para arquitetura de sistemas com IA, incluindo
agentic design patterns, padrões de colaboração multi-agent e padrões de
resiliência.

**Tópicos a Cobrir:**

1. Agentic Design Patterns (Ng 2024, Vellum 2025)
   - Nível 1: AI Workflows (Output Decisions)
   - Nível 2: Router Workflows (Task Decisions)
   - Nível 3: Autonomous Agents (Process Decisions)
2. Padrões de Colaboração Multi-Agent
   - Sequential Pattern
   - Parallel Pattern (Concurrent)
   - Loop Pattern
   - Review and Critique Pattern (Generator e Critic)
   - Router Pattern
3. Padrões Emergentes
   - Reflection Pattern
   - Tool Use Pattern
   - Planning Pattern
   - Multi-Agent Collaboration
4. Padrões de Resiliência para LLMs
   - Circuit Breaker
   - Retry com Exponential Backoff
   - Fallback
   - LLM Gateway Pattern

**Referências Principais:**

- Ng (2024)
- Vellum (2025)
- DeepLearning.AI (2024)
- Microsoft Tech Community (2025)

______________________________________________________________________

### Seção 7: Design Centrado em Contexto

**Arquivo:** `07-design-contexto.md`\
**Status:** draft\
**Tamanho Estimado:** 2.000-2.500 palavras\
**Dependências:** Seção 6

**Objetivo:**\
Estabelecer o Context Engineering como disciplina central do design para
sistemas com LLMs, detalhando os pilares, componentes e patterns para
gerenciamento efetivo de contexto.

**Tópicos a Cobrir:**

1. Context Engineering: A Nova Disciplina
   - Definição e modelo mental (LLM = f(contexto) → geração)
   - Por que suplanta "prompt engineering"
   - A janela de contexto como alavanca de controle primária
2. Os Seis Pilares do Context Engineering (Weaviate 2025)
   - Agents
   - Query Augmentation
   - Retrieval
   - Memory
   - Tooling
   - Output Structure
3. Componentes de Contexto (InfoWorld 2024)
   - System Prompts, User Prompts, State/History
   - Long-term Memory, Retrieved Information
   - Available Tools, Structured Output
4. Design Patterns para Context Window
   - Desafios: diluição de atenção, efeito de posição serial, custo
     computacional
   - Soluções: Chunking estratégico, Hierarchical Context, Selective Attention,
     Context Compression

**Referências Principais:**

- Intellectronica (2025)
- Weaviate (2025)
- InfoWorld (2024)

______________________________________________________________________

### Seção 8: Documentação de Design

**Arquivo:** `08-documentacao-design.md`\
**Status:** draft\
**Tamanho Estimado:** 1.500-2.000 palavras\
**Dependências:** Seção 7

**Objetivo:**\
Apresentar as evoluções necessárias nas práticas de documentação de design em
projetos com IA, incluindo novos artefatos e ferramentas.

**Tópicos a Cobrir:**

1. Evolução da Documentação
   - Prompt Specification Docs (versionamento, métricas)
   - Context Flow Diagrams
   - AI Contract Sheets (inputs, outputs, critérios, fallbacks)
2. Ferramentas e Práticas (2025)
   - AI Documentation Generators (Mintlify, GitHub Copilot Docs, Swimm)
   - Best practices: documentar o "Porquê", prompts como artefatos, avaliações
     documentadas, templates estruturados
3. Estatísticas de Uso (2025)
   - 64% usam IA para documentação
   - 59% redução no tempo
   - 76% planejam documentar mais

**Referências Principais:**

- Google Cloud DORA Report (2025)
- IBM (2025)
- Stack Overflow Developer Survey (2024)

______________________________________________________________________

### Seção 9: O Futuro do Designer de Software

**Arquivo:** `09-futuro-designer-software.md`\
**Status:** draft\
**Tamanho Estimado:** 1.500-2.000 palavras\
**Dependências:** Todas as anteriores

**Objetivo:**\
Analisar as mudanças no papel do designer de software, novas competências
necessárias, gargalos emergentes e tendências futuras.

**Tópicos a Cobrir:**

1. Mudança de Foco
   - De codificador para orquestrador, especificador de contexto, validador de
     qualidade
2. Novas Competências Necessárias
   - Engenharia de Contexto
   - Avaliação de Modelos
   - Prompt Engineering Avançado
   - Arquitetura Híbrida
   - Governança de IA
3. Gargalos Emergentes
   - Qualidade e confiabilidade (bugs sutis em código gerado)
   - Manutenibilidade (dívida técnica)
   - Complexidade de integração (observabilidade e debugging)
4. Tendências e Direções Futuras (2025-2026)
   - Agentic AI
   - Context-First Development
   - AI-Native Infrastructure
   - Multimodal Design
   - Edge AI
5. Previsões
   - 80% do código gerado por IA até 2025
   - Novo papel: "curador de contexto"
   - IDEs como ambientes de desenvolvimento agentic

**Referências Principais:**

- Snyk (2024)
- Google Cloud DORA Report (2025)

______________________________________________________________________

### Seção 10: Checklist e Templates

**Arquivo:** `10-checklist-templates.md`\
**Status:** draft\
**Tamanho Estimado:** 1.000-1.500 palavras\
**Dependências:** Todas as anteriores

**Objetivo:**\
Fornecer ferramentas práticas para aplicação dos conceitos: checklists de design
e templates de documentação para componentes com IA.

**Tópicos a Cobrir:**

1. Checklist de Design para Sistemas com IA
   - Arquitetural (casos de uso, fallback, resiliência, observabilidade)
   - Context Engineering (pipeline, RAG, memória, janela)
   - Qualidade (critérios, revisão, testes, documentação)
   - Governança (segurança, privacidade, custos, ética)
2. Template de Documentação de Componente com IA
   - Estrutura completa do template (Propósito, Modelo, Contexto, I/O,
     Fallbacks, Avaliação, Considerações)

**Referências Principais:**

- Template adaptado da pesquisa

______________________________________________________________________

## Ordem de Escrita Recomendada

01. **Seção 1** - Introdução (estabelece o contexto)
02. **Seção 2** - Princípios Clássicos (base teórica)
03. **Seção 3** - Arquitetura vs Design (posicionamento)
04. **Seção 4** - Padrões Clássicos (fundamentos)
05. **Seção 5** - Novos Padrões (inovação)
06. **Seção 6** - Design Patterns (aplicação prática)
07. **Seção 7** - Design Contexto (disciplina central)
08. **Seção 8** - Documentação (prática)
09. **Seção 9** - Futuro (visão prospectiva)
10. **Seção 10** - Checklist (ferramentas)

______________________________________________________________________

## Critérios de Qualidade

### Para cada seção

- [ ] Tom acadêmico/técnico, formal e preciso
- [ ] Referências explicitamente citadas
- [ ] Exemplos práticos onde aplicável
- [ ] Conexão com a premissa central ("código = commodity, contexto = capital")
- [ ] Linguagem ubíqua consistente
- [ ] Revisão por @book-reviewer antes de marcação como "published"

### Estrutura obrigatória de cada arquivo

```yaml
---
title: [Título da Seção]
created_at: [Data]
tags: [tag1, tag2, tag3]
status: draft | in-progress | review | published
updated_at: [Data]
ai_model: [Modelo usado]
---
```

______________________________________________________________________

## Referências Consolidadas

### Livros

1. Khononov, Vlad. "Balancing Coupling in Software Design." Pearson, 2024.
2. Lakshmanan, Valliappa & Hapke, Hannes. "Generative AI Design Patterns."
   O'Reilly, 2024.

### Relatórios e Pesquisas

1. GitHub. "Survey: AI Wave Grows." 2024.
2. Google Cloud. "DORA Report." 2025.
3. Stack Overflow. "Developer Survey." 2024.
4. iSAQB. "Software Architects and AI Systems." 2025.

### Artigos e Papers

1. InfoQ. "Software Architecture and Design Trends Report." April 2024.
2. IBM Research. "Design Principles for Generative AI Applications." CHI 2024.
3. ArXiv. "The Impact of AI-Generated Solutions on Software Architecture." 2025.
4. ArXiv. "Designing LLM-based Multi-Agent Systems." 2024.
5. Medium. "The LLM Triangle Principles." 2025.
6. Weaviate. "Context Engineering for AI Agents." 2025.
7. Intellectronica. "Context Engineering: A Primer." 2025.
8. InfoWorld. "What is context engineering." 2024.

### Recursos Online

1. Ng, Andrew. "4 Agentic Design Patterns." Snowflake BUILD 2024.
2. DeepLearning.AI. "Agentic Design Patterns." 2024.
3. Vellum. "The 2026 Guide to AI Agent Workflows." 2025.
4. Microsoft Tech Community. "Improve LLM backend resiliency." 2025.
5. Yegge, Steve. "Chat-Oriented Programming (CHOP)." 2024.
6. Karpathy, Andrej. "Vibe Coding." 2025.

______________________________________________________________________

## Notas para o Escritor

1. **Manter o foco em contexto**: Cada seção deve reforçar que o valor está no
   contexto, não no código
2. **Equilibrar teoria e prática**: Conceitos devem vir com exemplos aplicáveis
3. **Atualidade**: Priorizar referências de 2024-2025
4. **Conexões**: Referenciar outros KAs quando relevante (especialmente
   Arquitetura, Requisitos e Qualidade)
5. **Tom**: Profissional, inspirador, não alarmista sobre IA - focar em
   evolução, não substituição

______________________________________________________________________

*Plano criado em: 2026-02-07*\
*Próxima revisão: Após primeira versão completa das seções*

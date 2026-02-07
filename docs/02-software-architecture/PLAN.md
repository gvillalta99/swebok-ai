---
title: 'Editorial Plan: KA 02 - Software Architecture'
created_at: 2026-02-07
status: planning
---

# Plano Editorial: KA 02 - Software Architecture

Este plano define a estrutura e o conteúdo para o Knowledge Area de Arquitetura
de Software do SWEBOK-AI v5.0. O foco é a transição da arquitetura estrutural
para a **Engenharia de Contexto**.

## Estrutura de Arquivos

### 1. Introdução e Mudança de Paradigma

- **Arquivo:** `01-introduction.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] Redefinição de Arquitetura de Software: De "decisões difíceis de mudar"
    para "gestão de contexto e fronteiras".
  - [x] O princípio "Código é Commodity, Contexto é Capital".
  - [x] O novo papel do Arquiteto: De supervisor de código para Engenheiro de
    Contexto e Guardião de Restrições.
  - [x] A mudança de foco: Organização sintática -> Gestão semântica e
    sistêmica.

### 2. Fundamentos Modernos

- **Arquivo:** `02-fundamentals.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] Sistemas Sócio-Técnicos Híbridos: Colaboração entre humanos e agentes de
    IA.
  - [x] Gestão da Complexidade Acidental: O risco do "code sprawl" gerado por IA
    e como a arquitetura atua como freio.
  - [x] Modularidade para Isolamento de Contexto: Contenção de alucinações e
    segurança.
  - [x] Topologias Híbridas: Balanceamento entre Edge (latência/privacidade) e
    Cloud (poder de computação/RAG).

### 3. Padrões Arquiteturais Clássicos na Era da IA

- **Arquivo:** `03-classic-patterns-revisited.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] **Microservices:** O risco da proliferação desordenada e o uso de IA
    para governança de contratos.
  - [x] **Serverless:** Sinergia com cargas de trabalho de inferência
    esporádicas e pipelines de dados.
  - [x] **Event-Driven Architecture (EDA):** A espinha dorsal para comunicação
    assíncrona entre agentes autônomos.
  - [x] **Clean/Hexagonal Architecture:** A importância vital de desacoplar o
    modelo de IA (detalhe externo) das regras de negócio (núcleo) para evitar
    vendor lock-in.

### 4. Arquiteturas Nativas de IA

- **Arquivo:** `04-ai-native-architectures.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] **RAG (Retrieval-Augmented Generation):** Componentes (Ingestion, Vector
    DB, Retrieval, Generation) e desafios (latência, consistência).
  - [x] **Arquitetura de Agentes Autônomos:** Memória (Curto/Longo prazo),
    Ferramentas (Tools) e Planejamento (Chain of Thought).
  - [x] **Vector Databases:** O novo componente crítico de infraestrutura e
    padrões de uso (híbrido, particionamento).

### 5. Documentação e Decisões

- **Arquivo:** `05-documentation-and-decisions.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] **Living Documentation:** Geração automática de diagramas C4
    (PlantUML/Mermaid) a partir do código via LLMs.
  - [x] **ADRs (Architecture Decision Records):** Uso de IA para rascunhar,
    validar e recuperar decisões arquiteturais.
  - [x] **Docs as Context:** Transformar documentação passiva em ativos
    indexáveis para assistentes de codificação.

### 6. Qualidade e Avaliação

- **Arquivo:** `06-quality-and-evaluation.md`
- **Status:** [x]
- **Conteúdo:**
  - [x] **Novos Atributos de Qualidade (NFRs):** Determinismo, Explicabilidade,
    Custo de Token e Ética/Segurança (Prompt Injection).
  - [x] **Avaliação Assistida (AI-ATAM):** Uso de LLMs como stakeholders
    simulados para análise de trade-offs.
  - [x] **Fitness Functions:** Geração automática de testes arquiteturais (ex:
    ArchUnit) para garantir conformidade.

## Referências Principais

1. Richards, M., & Ford, N. (2020). *Fundamentals of Software Architecture*.
2. Loukides, M. (2023). *Software Architecture in an AI World*.
3. IBM Architecture Center. (2024). *Generative AI & RAG Patterns*.
4. Brown, S. (2023). *The C4 Model*.
5. Bass, L., et al. (2021). *Software Architecture in Practice*.

---
title: 'KA 00: Nova Era - Plano de Escrita'
created_at: 2025-02-07
tags: [planning, ka-00, new-era, llm, paradigm-shift]
status: published
updated_at: 2025-02-07
ai_model: k2p5
---

# Plano de Escrita: KA 00 - Nova Era

**Knowledge Area:** 00 - Nova Era\
**Tema:** A Transformação da Engenharia de Software na Era dos LLMs\
**Princípio Diretor:** "O código tornou-se commodity; o contexto tornou-se
capital."\
**Data do Plano:** 2025-02-07\
**Versão:** 1.0

______________________________________________________________________

## Resumo Executivo do Plano

Este plano estrutura a escrita do KA 00 "Nova Era", que estabelece o contexto
fundamental para todo o SWEBOK-AI v5.0. O KA documenta a transformação
paradigmática na engenharia de software precipitada pela adoção em massa de LLMs
e agentes autônomos (2021-2026).

**Total de Seções:** 9\
**Seções Prioritárias:** 01, 02, 03 (devem ser escritas primeiro)\
**Dependências Principais:** Seções 04-08 dependem das 01-03\
**Público-Alvo:** Engenheiros de software, arquitetos, gestores e educadores

______________________________________________________________________

## Tabela de Seções Planejadas

| #   | Seção                           | Arquivo                            | Status      | Prioridade | Palavras Est. |
| --- | ------------------------------- | ---------------------------------- | ----------- | ---------- | ------------- |
| 00  | Índice do KA                    | `index.md`                         | **pending** | P0         | 800-1000      |
| 01  | Contexto da Revolução dos LLMs  | `01-contexto-revolucao-llms.md`    | **pending** | P0         | 2500-3000     |
| 02  | Mudança de Paradigma            | `02-mudanca-paradigma.md`          | **pending** | P0         | 3000-3500     |
| 03  | Princípios Diretores            | `03-principios-diretores.md`       | **pending** | P0         | 2000-2500     |
| 04  | Fundamentos Essenciais de IA    | `04-fundamentos-essenciais-ia.md`  | **pending** | P1         | 2500-3000     |
| 05  | Nova Economia da Engenharia     | `05-nova-economia.md`              | **pending** | P1         | 2000-2500     |
| 06  | Estrutura e Organização do Guia | `06-estrutura-organizacao.md`      | **pending** | P2         | 1500-2000     |
| 07  | Público-Alvo e Pré-requisitos   | `07-publico-alvo-prerequisitos.md` | **pending** | P2         | 1000-1500     |
| 08  | Como Utilizar Este Guia         | `08-como-utilizar.md`              | **pending** | P2         | 1000-1500     |

**Total Estimado:** 16.300-20.500 palavras

______________________________________________________________________

## Seção 00: Índice do KA (index.md)

**Status:** `pending`\
**Prioridade:** P0\
**Palavras Estimadas:** 800-1000\
**Dependências:** Nenhuma (primeira a ser escrita)

### Conteúdo Planejado

- [ ] Visão geral do KA 00 e seu papel no SWEBOK-AI v5.0
- [ ] Apresentação do princípio diretor: "O código tornou-se commodity; o
  contexto tornou-se capital"
- [ ] Contextualização da transformação paradigmática (2021-2026)
- [ ] Resumo das seções do KA
- [ ] Mapa de navegação para outros KAs
- [ ] Tabela de estatísticas-chave (snapshot)
- [ ] Referências rápidas aos principais conceitos

### Estatísticas-chave a Incluir

- 75,9% dos profissionais usam AI para pelo menos parte do trabalho (DORA 2024)
- 50% de adoção enterprise em apenas 5 anos (vs. 8-10 anos em revoluções
  anteriores)
- 20 milhões de usuários do GitHub Copilot (2025)
- 90% das Fortune 100 adotaram AI coding assistants

### Baseado na Pesquisa

- Seção 1: Contexto da Revolução dos LLMs
- Seção 2: Mudança de Paradigma
- Tendências T1, T2, T8

### Notas para o Escritor

Esta seção serve como porta de entrada. Deve capturar a atenção do leitor
imediatamente e estabelecer a urgência da transformação. O tom deve ser ao mesmo
tempo informativo e instigante.

______________________________________________________________________

## Seção 01: Contexto da Revolução dos LLMs (01-contexto-revolucao-llms.md)

**Status:** `pending`\
**Prioridade:** P0\
**Palavras Estimadas:** 2500-3000\
**Dependências:** Nenhuma (fundamental)

### Conteúdo Planejado

- [ ] **1.1 Linha do Tempo Evolutiva (2017-2026)**

  - [ ] 2017: Fundação - Transformers (Attention Is All You Need)
  - [ ] 2018: GPT-1 - Prova de Conceito (117M parâmetros)
  - [ ] 2019: GPT-2 - Escala (1.5B parâmetros)
  - [ ] 2020: GPT-3 - Few-Shot Learning (175B parâmetros)
  - [ ] 2021: Codex e GitHub Copilot
  - [ ] 2023: GPT-4 e Expansão Enterprise
  - [ ] 2024: Claude e Gemini
  - [ ] 2025: Consolidação e Agentic AI
  - [ ] 2026: Estado Atual

- [ ] **1.2 Velocidade de Adoção vs. Revoluções Anteriores**

  - [ ] Tabela comparativa: Cloud (10 anos), Mobile (8 anos), AI Coding (5 anos)
  - [ ] Análise de fatores aceleradores

- [ ] **1.3 Benchmarks Atuais**

  - [ ] SWE-bench: evolução de 4,4% (2023) para 74% (2025)
  - [ ] SWE-Lancer: tarefas reais do Upwork valorizadas em $1M USD
  - [ ] Limitações e críticas aos benchmarks (UTBoost, cobertura de testes)

- [ ] **1.4 Limites de Autonomia Atual**

  - [ ] Capacidades demonstradas
  - [ ] Limitações identificadas (hallucinations, contexto limitado, raciocínio
    profundo)
  - [ ] Taxas de falhas documentadas (29,1% vulnerabilidades em código Python)

- [ ] **1.5 Análise Forense de Falhas**

  - [ ] Taxonomia de hallucinations em código (2025)
  - [ ] 10 padrões de bugs identificados em estudo empírico
  - [ ] Vulnerabilidades de segurança ("Importing Phantoms")

### Estatísticas-chave a Incluir

| Métrica                           | Valor   | Fonte                    |
| --------------------------------- | ------- | ------------------------ |
| GPT-3 parâmetros                  | 175B    | OpenAI 2020              |
| GitHub Copilot usuários           | 20M     | GitHub 2025              |
| SWE-bench Verified                | 74%     | mini-SWE-agent 2025      |
| Vulnerabilidades em código Python | 29,1%   | Estudo de segurança 2024 |
| Hallucination rate fatos atômicos | até 86% | HALoGEN ACL 2025         |
| Adoção ChatGPT entre devs         | 64%     | 2026                     |
| Adoção Copilot entre devs         | 49%     | 2026                     |

### Baseado na Pesquisa

- Seção 1 completa: Contexto da Revolução dos LLMs
- Seção 1.5: Análise Forense de Falhas Documentadas
- Referências: Vaswani et al. (2017), Kang et al. (2025), HALoGEN (2025)

### Notas para o Escritor

Esta seção deve ser factual e baseada em dados. Incluir a linha do tempo como
elemento visual (tabela ou diagrama descritivo). Concluir com uma reflexão sobre
onde estamos no momento atual (2026).

______________________________________________________________________

## Seção 02: Mudança de Paradigma (02-mudanca-paradigma.md)

**Status:** `pending`\
**Prioridade:** P0\
**Palavras Estimadas:** 3000-3500\
**Dependências:** Seção 01 (Contexto histórico necessário)

### Conteúdo Planejado

- [ ] **2.1 Commoditização da Sintaxe**

  - [ ] Observação de Sam Altman (OpenAI, 2025)
  - [ ] Evidências do mercado: postagens de emprego despriorizando expertise em
    linguagens
  - [ ] Conceito de "Vibe Coding"
  - [ ] Implicações para a profissão

- [ ] **2.2 Inversão do Gargalo (Produção → Verificação)**

  - [ ] O Paradoxo da Produtividade (2025)
  - [ ] Novo workflow: especificação → geração → verificação
  - [ ] Crítica de McKinsey sobre validação de código AI-generated
  - [ ] O ônus da prova moveu-se do "demonstrar que funciona" para "demonstrar
    que não quebra"

- [ ] **2.3 Paradoxo da Iteração**

  - [ ] Definição: velocidade de geração expõe gargalos downstream
  - [ ] Manifestações: PRs maiores, reviewers sobrecarregados
  - [ ] Estudo: AI assistants diminuíram produtividade de seniors em 19%

- [ ] **2.4 Valor do Contexto**

  - [ ] Context Engineering como skill emergente
  - [ ] Resultados de investimentos: 30% redução em erros, 25% melhoria em
    satisfação
  - [ ] Observação de Andreas Sjostrom (2025)

- [ ] **2.5 Paradoxo de Jevons no Software**

  - [ ] Origem histórica (William Stanley Jevons, 1865)
  - [ ] Aplicação à engenharia de software
  - [ ] Citação de Satya Nadella (Microsoft)
  - [ ] Evidência empírica ACM 2025: +20% features, +15% defeitos pós-release

- [ ] **2.6 Nova Economia da Engenharia**

  - [ ] Relatório McKinsey (Maio 2025)
  - [ ] Previsões Gartner (2025)
  - [ ] Mudanças salariais: AI-savvy +8%, geral +3%
  - [ ] Modelo de custo: de headcount para pay-per-prompt

- [ ] **2.7 Paradigma de Curadoria vs. Construção**

  - [ ] Estudo empírico (Dezembro 2025): 60% tempo curatorial vs. 20% criação
  - [ ] Analogia editorial
  - [ ] Previsão da indústria: "arquitetos de soluções e stewards de qualidade"

- [ ] **2.8 Transformação do Engenheiro (Writer → Reviewer)**

  - [ ] Papéis emergentes: AI-Augmented Engineer, AI Reliability Engineer,
    Workflow Architect
  - [ ] Estatísticas DORA 2024: 75,9% usam AI, apenas 24% alta confiança

- [ ] **2.9 Crise da Formação (Escada Quebrada)**

  - [ ] Dados alarmantes: apenas 18% contratando juniors (queda de 50%)
  - [ ] Causas: automação de tasks entry-level, obsolescência do modelo de
    apprenticeship
  - [ ] Citação de Dario Amodei (CEO, Anthropic)

- [ ] **2.10 Polarização do Mercado**

  - [ ] Senior vs. Junior: demanda +12% vs. queda 50%
  - [ ] Novas competências em demanda: crescimento 200% em AI/ML
  - [ ] Bifurcação: especialistas em orquestração AI vs. especialistas em
    domínio

### Estatísticas-chave a Incluir

| Métrica                       | Valor | Contexto                               |
| ----------------------------- | ----- | -------------------------------------- |
| Redução produtividade seniors | 19%   | Com uso de AI                          |
| Redução erros AI              | 30%   | Com context engineering robusto        |
| Features por trimestre        | +20%  | Equipes usando AI                      |
| Defeitos pós-release          | +15%  | Efeito colateral do Paradoxo de Jevons |
| Tempo curatorial              | 60%   | Vs. 20% criação original               |
| Uso de AI                     | 75,9% | Profissionais                          |
| Alta confiança em AI          | 24%   | Gap significativo                      |
| Demanda por juniors           | 18%   | Queda de 50% em um ano                 |
| Crescimento AI/ML skills      | 200%  | Em requisitos de emprego               |

### Baseado na Pesquisa

- Seção 2 completa: Mudança de Paradigma
- Subseções 2.1 a 2.10
- Referências: Altman (2025), McKinsey (2025), DORA (2024), Amodei (2025)

### Notas para o Escritor

Esta é a seção mais importante do KA. Cada subseção deve ter:

1. Definição clara do conceito
2. Dados/evidências de suporte
3. Citação de autoridade da indústria
4. Implicações práticas para o engenheiro

O tom deve ser analítico mas acessível. Evitar jargão excessivo.

______________________________________________________________________

## Seção 03: Princípios Diretores (03-principios-diretores.md)

**Status:** `pending`\
**Prioridade:** P0\
**Palavras Estimadas:** 2000-2500\
**Dependências:** Seção 02 (mudança de paradigma)

### Conteúdo Planejado

- [ ] **3.1 Contexto como Capital, Código como Commodity**

  - [ ] Formulação formal do princípio diretor
  - [ ] Implicações para skills valorizados
  - [ ] Exemplos práticos

- [ ] **3.2 Inversão do Ônus da Prova (Verificação)**

  - [ ] Conceito: código AI-generated é presumivelmente incorreto
  - [ ] Práticas recomendadas: testes rigorosos, code review profundo, análise
    estática

- [ ] **3.3 Determinismo sobre Probabilidade**

  - [ ] O problema: LLMs são probabilísticos, software requer determinismo
  - [ ] Soluções: temperature=0, caching, voting/ensemble, fallbacks

- [ ] **3.4 Paradoxo de Jevons**

  - [ ] Aplicação: eficiência → mais código → mais complexidade
  - [ ] Gestão: critérios rigorosos de aceitação, refatoração contínua, controle
    de dívida técnica

- [ ] **3.5 Transparência e Auditabilidade**

  - [ ] Requisitos: rastreabilidade, documentação de contexto AI, registro de
    prompts
  - [ ] Implementação: versionamento de prompts, metadados, logs

- [ ] **3.6 Degradação Graciosa**

  - [ ] Conceito: sistemas devem falhar de forma previsível
  - [ ] Práticas: circuit breakers, fallbacks, limites de confiança,
    monitoramento

### Baseado na Pesquisa

- Seção 3 completa: Princípios Diretores
- Subseções 3.1 a 3.6
- Conexões com a Seção 2

### Notas para o Escritor

Estes princípios servem como fundamento para todo o SWEBOK-AI v5.0. Devem ser:

- Memoráveis e acionáveis
- Ilustrados com exemplos concretos
- Conectados aos outros KAs quando apropriado

Formato sugerido: princípio → explicação → exemplo → implicação

______________________________________________________________________

## Seção 04: Fundamentos Essenciais de IA (04-fundamentos-essenciais-ia.md)

**Status:** `pending`\
**Prioridade:** P1\
**Palavras Estimadas:** 2500-3000\
**Dependências:** Seção 03 (princípios estabelecidos)

### Conteúdo Planejado

- [ ] **4.1 Engenharia de Prompt**

  - [ ] Evolução: de prompt crafting para context engineering
  - [ ] Técnicas avançadas: chain-of-thought, few-shot, RAG, prompt chaining
  - [ ] Gestão de prompts: versionamento, A/B testing, catalogação

- [ ] **4.2 Agent Contracts**

  - [ ] Definição formal: framework para comportamento de sistemas AI
  - [ ] Estrutura 7-tupla: (I, O, S, R, T, Φ, Ψ)
  - [ ] Componentes: preconditions, pathconditions, postconditions
  - [ ] Verificação offline e runtime

- [ ] **4.3 LLMOps**

  - [ ] Definição: sub-disciplina de MLOps para LLMs
  - [ ] Tabela comparativa MLOps vs. LLMOps
  - [ ] Foco em prompt engineering: tracking, otimização de context windows
  - [ ] Ferramentas 2025: LangChain, LlamaIndex, Weights & Biases, Vector DBs

- [ ] **4.4 Survival Ratio**

  - [ ] Conceito: proporção de código AI que permanece após revisão
  - [ ] Benchmarks: GitHub Copilot 88% retention rate
  - [ ] Fatores de influência

- [ ] **4.5 Agentic Engineering (SE 3.0)**

  - [ ] Definição: agentes AI autônomos
  - [ ] Workflow de 5 estágios
  - [ ] Elementos essenciais: templates, TDD, integration tests
  - [ ] AI Guardrails

- [ ] **4.6 Smart Coding vs. Vibe Coding**

  - [ ] Vibe Coding: definição (Andrej Karpathy), características, problemas
  - [ ] Smart Coding: princípios, workflow, comparação
  - [ ] Tabela comparativa completa
  - [ ] Quando usar cada abordagem

### Estatísticas-chave a Incluir

| Conceito            | Métrica             | Valor      |
| ------------------- | ------------------- | ---------- |
| Survival Ratio      | Copilot retention   | 88%        |
| Agentic AI          | Equipes em produção | 50% (2026) |
| Redução erros       | Context engineering | 30%        |
| Melhoria satisfação | Context engineering | 25%        |

### Baseado na Pesquisa

- Seção 4 completa: Novas Práticas e Conceitos
- Subseções 4.1 a 4.6
- Referências: Agent Contracts (2026), papers sobre Vibe Coding (2025)

### Notas para o Escritor

Esta seção introduz conceitos técnicos fundamentais. Deve:

- Definir cada conceito formalmente
- Fornecer exemplos práticos
- Conectar com implementações reais
- Preparar o leitor para KAs técnicos subsequentes

______________________________________________________________________

## Seção 05: Nova Economia da Engenharia (05-nova-economia.md)

**Status:** `pending`\
**Prioridade:** P1\
**Palavras Estimadas:** 2000-2500\
**Dependências:** Seção 02 (contexto econômico)

### Conteúdo Planejado

- [ ] **5.1 Estatísticas de Adoção**

  - [ ] DORA Report 2024: 39.000+ profissionais, 75,9% usam AI
  - [ ] McKinsey State of AI 2024: 65% das organizações usam regularmente
  - [ ] GitHub Copilot: 20M usuários, 90% Fortune 100
  - [ ] Gartner predictions: 90% até 2028
  - [ ] SlashData 2026: 84% usam ou planejam usar

- [ ] **5.2 Impactos na Produtividade**

  - [ ] Métricas de velocidade: 51% mais rápido em certas tarefas
  - [ ] Code retention: 88%
  - [ ] Projetos completados: +126% por semana
  - [ ] Tempo para PR: 9,6 → 2,4 dias
  - [ ] Impacto negativo: -19% para seniors (paradoxo da iteração)

- [ ] **5.3 Transformação de Papéis**

  - [ ] De Writer para Reviewer: 60-80% → 60% curatorial
  - [ ] Novos papéis emergentes
  - [ ] Papéis em declínio

- [ ] **5.4 Novas Competências Necessárias**

  - [ ] Crescimento 200% em AI/ML
  - [ ] Top 5 skills (LinkedIn 2025)
  - [ ] Competências essenciais: fundamentais, AI, soft skills, governança

- [ ] **5.5 Crise da Formação Entry-Level**

  - [ ] Dados estatísticos consolidados
  - [ ] Causas estruturais
  - [ ] Impacto no pipeline de talentos

- [ ] **5.6 Polarização Senior/Junior**

  - [ ] Dados de mercado
  - [ ] Polarização de funções
  - [ ] O "meio" desaparece

### Estatísticas Consolidadas a Incluir

| Indicador               | Valor | Fonte          |
| ----------------------- | ----- | -------------- |
| Profissionais usando AI | 75,9% | DORA 2024      |
| Alta confiança em AI    | 24%   | DORA 2024      |
| Organizações com AI     | 65%   | McKinsey 2024  |
| Usuários Copilot        | 20M   | GitHub 2025    |
| Fortune 100 com AI      | 90%   | GitHub 2025    |
| Previsão adoção 2028    | 90%   | Gartner        |
| Velocidade em tasks     | +51%  | GitHub         |
| Projetos/semana         | +126% | GitHub         |
| Contratando juniors     | 18%   | Stack Overflow |
| Demanda AI/ML skills    | +200% | LinkedIn       |
| Salário AI-savvy        | +8%   | 2025           |
| Declínio entry-level    | 13%   | Stanford 2025  |

### Baseado na Pesquisa

- Seção 5 completa: Impactos no Mercado de Trabalho
- Subseções 5.1 a 5.6
- Referências: DORA (2024), McKinsey (2024), Stack Overflow (2024), LinkedIn
  (2025)

### Notas para o Escritor

Esta seção deve ser rica em dados e estatísticas. Incluir:

- Tabelas comparativas
- Gráficos descritivos (em formato texto)
- Citações de fontes primárias
- Análise de tendências

______________________________________________________________________

## Seção 06: Estrutura e Organização do Guia (06-estrutura-organizacao.md)

**Status:** `pending`\
**Prioridade:** P2\
**Palavras Estimadas:** 1500-2000\
**Dependências:** Seções 01-05 (contexto estabelecido)

### Conteúdo Planejado

- [ ] **6.1 Princípio de Organização**

  - [ ] Reimaginação do SWEBOK tradicional
  - [ ] Foco em contexto sobre sintaxe
  - [ ] Adaptações para a era dos LLMs

- [ ] **6.2 Visão Geral dos KAs**

  - [ ] Lista dos 15 KAs do SWEBOK-AI v5.0
  - [ ] Organização em categorias lógicas
  - [ ] Mapeamento dos KAs tradicionais para a nova estrutura

- [ ] **6.3 Convenções do Guia**

  - [ ] Formato dos capítulos
  - [ ] Padrões de escrita
  - [ ] Sistema de referências

- [ ] **6.4 Novos Temas vs. Temas Clássicos**

  - [ ] O que mudou
  - [ ] O que permaneceu relevante
  - [ ] Temas obsoletos ou transformados

### Lista dos KAs do SWEBOK-AI v5.0

| KA  | Título                                     | Foco Principal                 |
| --- | ------------------------------------------ | ------------------------------ |
| 00  | Nova Era                                   | Contexto e paradigma           |
| 01  | Software Requirements                      | Especificação para AI          |
| 02  | Software Architecture                      | Design de sistemas AI-driven   |
| 03  | Software Design                            | Padrões e princípios           |
| 04  | Software Construction                      | Commoditização do código       |
| 05  | Software Testing                           | Verificação de código AI       |
| 06  | Software Engineering Operations            | LLMOps, CI/CD com AI           |
| 07  | Software Maintenance                       | Dívida técnica AI              |
| 08  | Software Configuration Management          | Gestão de código gerado        |
| 09  | Software Engineering Management            | Gestão de equipes AI-augmented |
| 10  | Software Engineering Process               | Processos com agentes          |
| 11  | Software Engineering Models and Methods    | Modelos para AI                |
| 12  | Software Quality                           | Qualidade de código AI         |
| 13  | Software Security                          | Segurança em código AI         |
| 14  | Software Engineering Professional Practice | Ética e prática                |
| 15  | Software Engineering Economics             | Economia da AI                 |

### Baseado na Pesquisa

- Visão geral do projeto SWEBOK-AI
- Adaptações da estrutura clássica
- Documentação do AGENTS.md

### Notas para o Escritor

Esta seção é mais descritiva. Deve:

- Apresentar a estrutura de forma clara
- Explicar a lógica por trás das adaptações
- Servir como mapa de navegação

______________________________________________________________________

## Seção 07: Público-Alvo e Pré-requisitos (07-publico-alvo-prerequisitos.md)

**Status:** `pending`\
**Prioridade:** P2\
**Palavras Estimadas:** 1000-1500\
**Dependências:** Seção 06 (estrutura definida)

### Conteúdo Planejado

- [ ] **7.1 Público-Alvo Primário**

  - [ ] Engenheiros de software em atuação
  - [ ] Arquitetos de software
  - [ ] Gestores de engenharia
  - [ ] Educadores em computação

- [ ] **7.2 Público-Alvo Secundário**

  - [ ] Estudantes de computação (nível avançado)
  - [ ] Profissionais em transição de carreira
  - [ ] Executivos de tecnologia
  - [ ] Pesquisadores em engenharia de software

- [ ] **7.3 Pré-requisitos de Conhecimento**

  - [ ] Fundamentos de engenharia de software
  - [ ] Noções básicas de programação
  - [ ] Familiaridade com conceitos de AI/ML (não obrigatório)
  - [ ] Experiência em projetos de software

- [ ] **7.4 Como se Preparar**

  - [ ] Recursos recomendados para níveis diferentes
  - [ ] Roadmap de aprendizado complementar
  - [ ] Comunidades e fóruns relevantes

### Baseado na Pesquisa

- Necessidades do público identificadas na pesquisa
- Gap de conhecimento entre uso e confiança em AI (24%)
- Crise de formação entry-level

### Notas para o Escritor

Esta seção deve ser inclusiva mas honesta sobre os pré-requisitos. Considerar:

- Diferentes níveis de familiaridade com AI
- Diferentes funções (dev, arquiteto, gestor)
- Recursos para suprir gaps de conhecimento

______________________________________________________________________

## Seção 08: Como Utilizar Este Guia (08-como-utilizar.md)

**Status:** `pending`\
**Prioridade:** P2\
**Palavras Estimadas:** 1000-1500\
**Dependências:** Seções 06-07 (estrutura e público definidos)

### Conteúdo Planejado

- [ ] **8.1 Abordagens de Leitura**

  - [ ] Leitura sequencial (recomendada para primeira vez)
  - [ ] Leitura por KA (para consulta específica)
  - [ ] Leitura temática (cruzando KAs)

- [ ] **8.2 Navegação entre KAs**

  - [ ] Como usar as referências cruzadas
  - [ ] Identificação de dependências entre tópicos
  - [ ] Mapa de fluxo recomendado

- [ ] **8.3 Elementos do Guia**

  - [ ] Convenções tipográficas
  - [ ] Caixas de destaque (notas, avisos, exemplos)
  - [ ] Exercícios e questões de reflexão
  - [ ] Referências bibliográficas

- [ ] **8.4 Atualizações e Versões**

  - [ ] Frequência de atualizações
  - [ ] Como acompanhar novidades
  - [ ] Contribuições da comunidade

- [ ] **8.5 Dicas de Estudo**

  - [ ] Para profissionais em atuação
  - [ ] Para equipes
  - [ ] Para educadores

### Baseado na Pesquisa

- Metodologia de estudo sugerida
- Necessidade de atualização contínua
- Diferentes perfis de leitores

### Notas para o Escritor

Esta seção prática deve:

- Ser objetiva e acionável
- Incluir exemplos de uso
- Antecipar dúvidas comuns
- Incentivar a aplicação prática

______________________________________________________________________

## Resumo do Status

### Progresso Atual

| Status        | Quantidade | Porcentagem |
| ------------- | ---------- | ----------- |
| **pending**   | 9          | 100%        |
| **draft**     | 0          | 0%          |
| **review**    | 0          | 0%          |
| **published** | 0          | 0%          |

### Prioridades de Escrita

**Fase 1 - Fundamentos (P0):**

1. `index.md` - Porta de entrada
2. `01-contexto-revolucao-llms.md` - Contexto histórico
3. `02-mudanca-paradigma.md` - Transformação central
4. `03-principios-diretores.md` - Fundamentos filosóficos

**Fase 2 - Aprofundamento (P1):** 5. `04-fundamentos-essenciais-ia.md` -
Conceitos técnicos 6. `05-nova-economia.md` - Impactos de mercado

**Fase 3 - Navegação (P2):** 7. `06-estrutura-organizacao.md` - Guia do guia 8.
`07-publico-alvo-prerequisitos.md` - Orientação ao leitor 9.
`08-como-utilizar.md` - Instruções de uso

______________________________________________________________________

## Estatísticas-chave Consolidadas

### Para Destaque no KA 00

| Categoria      | Estatística               | Fonte               |
| -------------- | ------------------------- | ------------------- |
| **Adoção**     | 75,9% usam AI             | DORA 2024           |
| **Adoção**     | 20M usuários Copilot      | GitHub 2025         |
| **Adoção**     | 90% Fortune 100           | GitHub 2025         |
| **Velocidade** | 51% mais rápido           | GitHub 2025         |
| **Confiança**  | Apenas 24% alta confiança | DORA 2024           |
| **Mercado**    | 18% contratando juniors   | Stack Overflow 2024 |
| **Mercado**    | 13% declínio entry-level  | Stanford 2025       |
| **Skills**     | +200% demanda AI/ML       | LinkedIn 2025       |
| **Economia**   | +8% salário AI-savvy      | 2025                |
| **Futuro**     | 90% usarão AI até 2028    | Gartner             |

______________________________________________________________________

## Pontos Críticos que Precisam de Atenção Especial

### 1. Dados Sensíveis sobre Emprego

- A crise da formação entry-level é um tema delicado
- Deve ser apresentado com dados objetivos, não alarmismo
- Incluir perspectivas de mitigação e adaptação

### 2. Contradições Aparentes

- AI aumenta produtividade mas diminui em 19% para seniors
- 75,9% usam AI mas apenas 24% confiam
- Deve explicar nuances: uso vs. confiança, curto vs. longo prazo

### 3. Evolução Rápida dos Dados

- Benchmarks mudam rapidamente (SWE-bench: 4,4% → 74% em 2 anos)
- Incluir datas em todas as estatísticas
- Recomendar verificação de dados atualizados

### 4. Equilíbrio entre Otimismo e Realismo

- Evitar hype excessivo sobre AI
- Evitar pessimismo tecnofóbico
- Posicionamento: "AI é ferramenta poderosa que requer disciplina"

### 5. Referências Bibliográficas

- Citar fontes primárias sempre que possível
- Incluir URLs quando disponíveis
- Distinguir entre papers acadêmicos e relatórios industriais

### 6. Acessibilidade

- Conceitos técnicos devem ser explicados
- Termos em inglês devem ter tradução/explicação
- Exemplos práticos são essenciais

______________________________________________________________________

## Próximos Passos Recomendados

### Imediatos (Próxima Semana)

1. **Iniciar escrita das P0:**

   - [ ] `index.md` - @book-writer
   - [ ] `01-contexto-revolucao-llms.md` - @book-writer

2. **Preparação:**

   - [ ] Criar templates de seção
   - [ ] Definir padrão de referências bibliográficas

### Curto Prazo (Próximas 2-3 Semanas)

3. **Completar P0:**

   - [ ] `02-mudanca-paradigma.md` - @book-writer
   - [ ] `03-principios-diretores.md` - @book-writer

4. **Primeira Revisão:**

   - [ ] Revisão por @book-reviewer das seções P0
   - [ ] Ajustes baseados no feedback

### Médio Prazo (Próximo Mês)

5. **Fase 2:**

   - [ ] `04-fundamentos-essenciais-ia.md`
   - [ ] `05-nova-economia.md`

6. **Fase 3:**

   - [ ] `06-estrutura-organizacao.md`
   - [ ] `07-publico-alvo-prerequisitos.md`
   - [ ] `08-como-utilizar.md`

7. **Revisão Final:**

   - [ ] Revisão integrada de todo KA 00
   - [ ] Verificação de consistência
   - [ ] Validação de dados

### Contínuo

8. **Atualização:**
   - [ ] Monitorar novos benchmarks (SWE-bench)
   - [ ] Acompanhar relatórios DORA, McKinsey
   - [ ] Atualizar estatísticas de adoção

______________________________________________________________________

## Referências Principais do RESEARCH.md

### Artigos Acadêmicos

1. Vaswani et al. (2017) - "Attention Is All You Need"
2. Kang et al. (2025) - "SWE-bench Verified is Flawed"
3. HALoGEN (2025) - Hallucinations em LLMs
4. Agent Contracts (2026) - Framework formal

### Relatórios Industriais

05. DORA (2024) - State of DevOps Report
06. McKinsey (2024/2025) - State of AI, New Economics
07. Gartner (2025) - AI Code Assistants
08. Stack Overflow (2024) - Developer Survey
09. LeadDev (2025) - AI Impact Report
10. GitHub (2025) - Copilot statistics

### Artigos e Blogs

11. Altman, S. (2025) - OpenAI
12. Karpathy, A. (2025) - Vibe Coding
13. Nadella, S. - Microsoft
14. Amodei, D. - Anthropic

______________________________________________________________________

*Plano criado em: 2025-02-07*\
*Modelo: k2p5*\
*Status: Planejamento Completo - Aguardando Início da Escrita*

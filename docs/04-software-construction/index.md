---
title: KA 04 - Construção de Software na Era dos LLMs
created_at: 2025-02-07
tags: [swebok, software-construction, llm, ai, paradigm-shift]
status: published
updated_at: 2025-02-07
ai_model: k2p5
---

# KA 04 - Construção de Software na Era dos LLMs

## Introdução

A construção de software, tradicionalmente compreendida como o processo de
transformação de especificações em código executável, atravessa uma
transformação sem precedentes. O advento dos Large Language Models (LLMs) não
representa mera evolução incremental das ferramentas de desenvolvimento;
configura uma reconfiguração fundamental dos pressupostos sobre os quais a
engenharia de software foi edificada ao longo de décadas.

Este Knowledge Area (KA) do SWEBOK-AI examina como a construção de software está
sendo reinventada na era dos modelos de linguagem de grande escala, abordando
desde fundamentos conceituais até práticas operacionais, ferramentas, qualidade
e tendências futuras.

!!! warning "Nota sobre a velocidade de mudança" O campo de desenvolvimento
assistido por IA evolui em ritmo acelerado. Recursos, ferramentas e capacidades
mencionados neste KA refletem o estado da arte em fevereiro de 2025.
Recomenda-se revisão periódica deste conteúdo (a cada 6-12 meses) para manter-se
atualizado sobre novas capacidades e melhores práticas.

## Estrutura do KA

Este Knowledge Area está organizado em seis seções principais:

### Seção 1: Fundamentos da Construção na Era dos LLMs

Estabelece os fundamentos conceituais da nova realidade, examinando a evolução
histórica que nos trouxe até aqui, articulando o paradigma shift em curso e
definindo o papel transformado do desenvolvedor na engenharia de software
contemporânea.

**Tópicos principais:**

- Evolução do SWEBOK tradicional à era dos LLMs
- Linha do tempo da revolução (2021-2025)
- Commodity e capital redefinidos
- O novo papel do desenvolvedor: de escritor a curador de contexto

### Seção 2: Ferramentas e Plataformas Modernas

Analisa o ecossistema de ferramentas de desenvolvimento assistido por
Inteligência Artificial, suas arquiteturas, capacidades distintivas e trade-offs
operacionais.

**Tópicos principais:**

- GitHub Copilot (autocomplete, chat, Agent Mode, Coding Agent)
- Amazon CodeWhisperer e Amazon Q Developer
- Cursor (multi-threading de contexto)
- Claude Code (segurança e previsibilidade)
- Critérios de seleção de ferramentas

### Seção 3: Prompt Engineering e Context-Driven Development

Detalha as técnicas de engenharia de prompt e o paradigma do Context-Driven
Development, estabelecendo práticas essenciais para desenvolvedores que
trabalham com assistentes de IA.

**Tópicos principais:**

- Fundamentos de prompt engineering
- Padrões de prompts para código
- Context-Driven Development
- Estratégias de RAG e memória
- Anti-padrões e armadilhas

### Seção 4: Qualidade, Revisão e Governança

Aborda os desafios de garantir qualidade em código gerado por IA, os frameworks
de governança emergentes e as práticas de revisão adaptadas a este novo
paradigma.

**Tópicos principais:**

- Qualidade do código na era dos LLMs
- Riscos e mitigações
- Frameworks ISO/IEC 42001 e NIST AI RMF
- Code review na era dos LLMs
- Testes e validação

### Seção 5: Workflows Automatizados e Continuous Construction

Explora como organizações estão implementando agentes autônomos em pipelines de
integração contínua, automatizando Pull Requests, gerando testes automaticamente
e estabelecendo padrões de Continuous Construction.

**Tópicos principais:**

- Agentes autônomos em pipelines CI/CD
- Automação de Pull Requests
- Testes gerados automaticamente
- Padrões de Continuous Construction
- Integração com DevOps

### Seção 6: Considerações Práticas e Tendências Futuras

Consolida reflexões práticas sobre adoção, formação e governança, ao mesmo tempo
em que projeta cenários futuros baseados em tendências tecnológicas e
regulatórias identificadas.

**Tópicos principais:**

- Considerações de curto prazo (2025-2026)
- Tendências de médio prazo (2027-2030)
- Visão de longo prazo (2030+)
- Questões abertas e desafios
- Preparação para o futuro

## Princípio Diretor

> **"O código tornou-se commodity; o contexto tornou-se capital."**

Esta afirmação orienta todo o conteúdo deste KA. No paradigma tradicional,
codificar era o cerne do trabalho do desenvolvedor. Na era dos LLMs, quando um
modelo pode gerar, em segundos, implementações que antes demandariam horas de
trabalho manual, o valor migrou da capacidade de escrita para a habilidade de
especificar, contextualizar e validar.

## Relacionamento com Outros KAs

Este Knowledge Area se relaciona diretamente com:

- **KA 02 - Arquitetura de Software**: Decisões arquiteturais que afetam como
  código é gerado e integrado
- **KA 03 - Design de Software**: Padrões de design e especificações que servem
  de contexto para geração
- **KA 05 - Testes de Software**: Validação de código gerado por IA
- **KA 08 - Gerenciamento de Configuração**: Versionamento de código e prompts
- **KA 12 - Qualidade de Software**: Garantia de qualidade em código gerado
- **KA 13 - Segurança**: Vulnerabilidades em código gerado por IA

## Público-Alvo

Este KA destina-se a:

- **Desenvolvedores** que buscam compreender como integrar ferramentas de IA em
  seu workflow
- **Arquitetos de Software** que precisam considerar implicações arquiteturais
  da geração automática de código
- **Líderes Técnicos** responsáveis por estabelecer políticas de uso de IA em
  suas equipes
- **Professores e Pesquisadores** que acompanham a evolução da engenharia de
  software
- **Estudantes** que estão ingressando na profissão neste momento de transição

## Como Usar Este KA

As seções foram projetadas para serem lidas sequencialmente, mas podem ser
consultadas independentemente conforme a necessidade:

1. **Para fundamentação conceitual**: Comece pela Seção 1
2. **Para escolha de ferramentas**: Consulte a Seção 2
3. **Para técnicas práticas**: Foque na Seção 3
4. **Para governança e qualidade**: Priorize a Seção 4
5. **Para automação de pipelines**: Veja a Seção 5
6. **Para planejamento estratégico**: Leia a Seção 6

## Referências Principais

1. IEEE Computer Society. *SWEBOK® Guide V3.0*. 2014.
2. GitHub Blog. *Research: Quantifying GitHub Copilot's impact on code quality*.
   2024\.
3. Fowler, M. *Context Engineering for Coding Agents*. 2024.
4. ISO/IEC 42001:2023. *Information technology — Artificial intelligence —
   Management system*.
5. Humble, J.; Farley, D. *Continuous Delivery: Reliable Software Releases*.
   2010\.

______________________________________________________________________

*Última atualização: Fevereiro 2025*\
*Versão: 1.0*\
*Modelo: SWEBOK-AI v5.0*

---
title: Estrutura e Organização do SWEBOK-AI v5.0
created_at: '2026-02-07'
tags: [estrutura, organização, knowledge-areas, KA, arquitetura, dependências, convenções]
status: published
updated_at: '2026-02-07'
ai_model: k2p5
agent: book-writer
---

# Estrutura e Organização

## Objetivos de Aprendizagem

Ao final desta seção, você será capaz de:

- Identificar os 15 Knowledge Areas do SWEBOK-AI v5.0 e suas respectivas
  contribuições para a engenharia de software na era dos LLMs
- Compreender as mudanças estruturais da versão 4.0 para a 5.0 e seu racional
- Navegar pelo guia seguindo as dependências lógicas entre KAs
- Aplicar as convenções de formatação e estrutura adotadas no documento
- Reconhecer como os princípios diretores se manifestam em cada área de
  conhecimento

______________________________________________________________________

## Visão Geral dos 15 Knowledge Areas

O SWEBOK-AI v5.0 reorganiza o conhecimento em engenharia de software em 15
Knowledge Areas (KAs), mantendo a estrutura fundamental do SWEBOK original mas
adaptando conteúdo, ênfase e abordagem para a realidade dos sistemas
AI-augmented. Cada KA representa um domínio essencial de competência que o
engenheiro de software deve dominar na era dos LLMs.

A estrutura elimina três KAs presentes na versão 4.0 (Mathematical Foundations,
Computing Foundations, Engineering Foundations) por dois motivos fundamentais:
primeiro, este conhecimento tornou-se commodity acessível via LLMs; segundo, o
foco do SWEBOK-AI é na aplicação prática, não na fundamentação teórica abstrata.

### Os 15 Knowledge Areas

| KA     | Título                                     | Foco Principal na Era dos LLMs                                                                      |
| ------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **01** | Software Requirements                      | Especificação em linguagem natural como input primário; engenharia de contexto e restrições         |
| **02** | Software Architecture                      | Arquiteturas híbridas humanos-IA; resiliência e fallbacks; separação de concerns                    |
| **03** | Software Design                            | Padrões que garantem determinismo; contratos explícitos; auditabilidade                             |
| **04** | Software Construction                      | Orquestração de código gerado por IA; curadoria e verificação; pipelines de validação               |
| **05** | Software Testing                           | Verificação de sistemas não-determinísticos; testes como primeiro consumidor de código AI-generated |
| **06** | Software Engineering Operations            | LLMOps; monitoramento de modelos; circuit breakers; degradação graciosa                             |
| **07** | Software Maintenance                       | Gestão de código que você não escreveu; refatoração de sistemas opacos                              |
| **08** | Software Configuration Management          | Versionamento de prompts; rastreabilidade de código AI-generated; linhagem                          |
| **09** | Software Engineering Management            | Governança de escopo no contexto do Paradoxo de Jevons; métricas apropriadas                        |
| **10** | Software Engineering Process               | Processos AI-driven; documentação de decisões automatizadas; governança                             |
| **11** | Software Engineering Models and Methods    | Frameworks formais para verificação de agentes; métodos determinísticos                             |
| **12** | Software Quality                           | Qualidade como resultado de verificação rigorosa; métricas de confiabilidade                        |
| **13** | Software Security                          | Análise de segurança de código AI-generated; vulnerabilidades em sistemas opacos                    |
| **14** | Software Engineering Professional Practice | Novas competências: engenharia de contexto, verificação, curadoria                                  |
| **15** | Software Engineering Economics             | Modelos de custo que consideram externalidades da produtividade aumentada                           |

______________________________________________________________________

## Evolução da Estrutura: v4.0 → v5.0

A transição do SWEBOK v4.0 para o SWEBOK-AI v5.0 representa mais que uma
atualização de conteúdo: é uma reconfiguração fundamental da estrutura
organizacional do conhecimento em engenharia de software.

### KAs Removidos

Três Knowledge Areas presentes no SWEBOK v4.0 foram eliminados na versão 5.0:

1. **Mathematical Foundations**: Lógica, teoria de conjuntos, métodos formais
   matemáticos. Justificativa: LLMs geram provas formais e manipulam notação
   matemática com alta competência. O engenheiro precisa saber *quando* aplicar
   matemática formal, não necessariamente executar os cálculos manualmente.

2. **Computing Foundations**: Estruturas de dados, algoritmos, complexidade
   computacional, sistemas operacionais. Justificativa: Conhecimento operacional
   disponível on-demand via IA. O foco desloca-se para seleção e validação, não
   implementação.

3. **Engineering Foundations**: Métodos empíricos, estatística, medição,
   qualidade de processos. Justificativa: Embora ainda relevante, este
   conhecimento foi distribuído entre outros KAs onde é aplicado praticamente,
   não tratado como fundamento abstrato.

### Racional da Redução

A remoção destes KAs segue o Princípio 1 (Contexto como Capital, Código como
Commodity). Conhecimento que se tornou commodity - facilmente acessível,
verificável e aplicável via LLMs - não justifica tratamento como área de
conhecimento distinta no SWEBOK-AI. O engenheiro moderno deve dominar:

- **Quando** solicitar conhecimento matemático/computacional a um LLM
- **Como** verificar a correção do conhecimento gerado
- **Onde** aplicar na arquitetura do sistema
- **Por que** a abordagem escolhida é apropriada

Não se trata de que este conhecimento seja dispensável, mas de que sua aquisição
e aplicação ocorrem de forma diferente na engenharia AI-augmented.

### Foco em Práticas Aplicadas

O SWEBOK-AI concentra-se exclusivamente em práticas aplicadas. Todo KA inclui:

- Contexto de aplicação na era dos LLMs
- Técnicas específicas adaptadas ou emergentes
- Padrões de verificação e validação
- Mecanismos de governança e controle
- Exemplos concretos e casos de uso

______________________________________________________________________

## Mapeamento dos Princípios nos KAs

Os seis princípios diretores do SWEBOK-AI (apresentados na Seção 03) operam como
lentes através das quais cada Knowledge Area deve ser compreendida e praticada.
A tabela a seguir resume como cada princípio primário se manifesta em cada KA:

| KA                                                  | Princípio Primário                           | Aplicação Específica                                                                                         |
| --------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **01 - Software Requirements**                      | Contexto como Capital, Código como Commodity | Especificação em linguagem natural como input primário; engenharia de requisitos como engenharia de contexto |
| **02 - Software Architecture**                      | Degradação Graciosa                          | Design de arquiteturas resilientes com fallbacks; separação entre camadas de IA e lógica de negócio          |
| **03 - Software Design**                            | Determinismo sobre Probabilidade             | Padrões de design que garantem comportamento previsível; contratos explícitos entre componentes              |
| **04 - Software Construction**                      | Inversão do Ônus da Prova                    | Pipelines de verificação integradas ao workflow de desenvolvimento; revisão obrigatória                      |
| **05 - Software Testing**                           | Inversão do Ônus da Prova                    | Testes como primeiro consumidor de código AI-generated; automação de verificação                             |
| **06 - Software Engineering Operations**            | Degradação Graciosa                          | Monitoramento de modelos; circuit breakers; LLMOps como disciplina                                           |
| **07 - Software Maintenance**                       | Paradoxo de Jevons                           | Gestão da dívida técnica acelerada; refatoração contínua de código gerado                                    |
| **08 - Software Configuration Management**          | Transparência e Auditabilidade               | Versionamento de prompts; rastreabilidade de código AI-generated                                             |
| **09 - Software Engineering Management**            | Paradoxo de Jevons                           | Governança de escopo; métricas que evitem incentivos perversos de velocidade                                 |
| **10 - Software Engineering Process**               | Transparência e Auditabilidade               | Documentação de processos AI-driven; governança de decisões automatizadas                                    |
| **11 - Software Engineering Models and Methods**    | Determinismo sobre Probabilidade             | Frameworks formais para verificação de comportamento de agentes                                              |
| **12 - Software Quality**                           | Inversão do Ônus da Prova                    | Qualidade como resultado de verificação rigorosa, não apenas ausência de bugs                                |
| **13 - Software Security**                          | Transparência e Auditabilidade               | Análise de segurança de código AI-generated; rastreabilidade de vulnerabilidades                             |
| **14 - Software Engineering Professional Practice** | Contexto como Capital, Código como Commodity | Novas competências em engenharia de contexto e verificação                                                   |
| **15 - Software Engineering Economics**             | Paradoxo de Jevons                           | Modelos de custo que consideram externalidades da produtividade aumentada                                    |

Este mapeamento não implica que cada KA trate exclusivamente de seu princípio
primário. Pelo contrário: todo KA incorpora múltiplos princípios, mas o
princípio primário determina o ângulo de abordagem e as prioridades de
tratamento.

______________________________________________________________________

## Dependências entre KAs

A navegação pelo SWEBOK-AI beneficia-se de compreensão das dependências lógicas
entre Knowledge Areas. Alguns KAs constroem sobre outros; alguns são
independentes.

### Sequência Recomendada de Leitura

```
KA 00 (Nova Era)
       │
       ▼
KA 01 (Requirements) ─────┬─────► KA 02 (Architecture) ─────┬─────► KA 03 (Design)
       │                  │              │                  │
       │                  │              ▼                  │
       │                  │         KA 04 (Construction) ◄──┘
       │                  │              │
       │                  │              ▼
       │                  │         KA 05 (Testing)
       │                  │              │
       │                  └──────────────┤
       │                                 ▼
       │                            KA 06 (Operations)
       │                                 │
       └─────────────────────────────────┤
                                         ▼
                                   KA 07 (Maintenance)
```

### Tabela de Pré-requisitos

| KA                                              | Pré-requisitos Diretos | Independente?          |
| ----------------------------------------------- | ---------------------- | ---------------------- |
| 00 - Nova Era                                   | Nenhum                 | Sim (ponto de entrada) |
| 01 - Software Requirements                      | KA 00                  | Não                    |
| 02 - Software Architecture                      | KA 01                  | Não                    |
| 03 - Software Design                            | KA 01, KA 02           | Não                    |
| 04 - Software Construction                      | KA 01, KA 02, KA 03    | Não                    |
| 05 - Software Testing                           | KA 01, KA 03, KA 04    | Não                    |
| 06 - Software Engineering Operations            | KA 02, KA 04, KA 05    | Não                    |
| 07 - Software Maintenance                       | KA 04, KA 05, KA 06    | Não                    |
| 08 - Software Configuration Management          | KA 04                  | Parcialmente           |
| 09 - Software Engineering Management            | KA 01-07               | Não                    |
| 10 - Software Engineering Process               | KA 01-07               | Não                    |
| 11 - Software Engineering Models and Methods    | KA 03, KA 05           | Parcialmente           |
| 12 - Software Quality                           | KA 05, KA 10           | Não                    |
| 13 - Software Security                          | KA 02, KA 04, KA 05    | Não                    |
| 14 - Software Engineering Professional Practice | KA 01-13               | Não                    |
| 15 - Software Engineering Economics             | KA 09, KA 10           | Parcialmente           |

### KAs Independentes

Alguns KAs podem ser lidos de forma relativamente independente, desde que o
leitor tenha familiaridade básica com os conceitos do KA 00:

- **KA 08 (SCM)**: Foco em versionamento e rastreabilidade; técnicas aplicáveis
  em qualquer estágio
- **KA 11 (Models and Methods)**: Tratamento de métodos formais; requer
  familiaridade com design e testing
- **KA 15 (Economics)**: Perspectiva econômica; útil em qualquer momento, mas
  mais valioso após compreensão da prática

### Leitura Linear versus Consulta

O SWEBOK-AI suporta dois modos de uso:

1. **Leitura Linear**: Começar pelo KA 00 e seguir a sequência
   01→02→03→04→05→06→07. Esta abordagem é recomendada para primeiros contatos e
   formação sistemática.

2. **Consulta Direcionada**: Acessar KAs específicos conforme necessidade
   imediata. Possível para KAs 08, 11, 14, 15 após leitura do KA 00. Para KAs
   01-07, recomenda-se seguir as dependências.

______________________________________________________________________

## Convenções do Guia

O SWEBOK-AI v5.0 segue convenções rigorosas de formatação e estrutura para
garantir consistência, facilitar navegação e permitir processamento
automatizado.

### Formato dos Arquivos

- **Extensão**: `.md` (Markdown)
- **Codificação**: UTF-8
- **Nomenclatura**: kebab-case (`nome-do-arquivo.md`)
- **Cabeçalhos**: Hierarquia consistente (# Título, ## Seção, ### Subseção)

### Estrutura de Cada Seção

Todo arquivo de conteúdo segue estrutura padronizada:

```markdown
---
title: "Título Completo da Seção"
created_at: "YYYY-MM-DD"
tags: [tag1, tag2, tag3]
status: draft | in-progress | review | published
updated_at: "YYYY-MM-DD"
ai_model: modelo-utilizado
---

# Título da Seção

## Objetivos de Aprendizagem
Ao final desta seção, você será capaz de:
- [Objetivo mensurável 1]
- [Objetivo mensurável 2]
- [Objetivo mensurável 3]

## [Subseções de conteúdo]

## Resumo
[Síntese dos pontos principais em 3-5 parágrafos]

## Referências
1. [Autor], [Título], [Publicação], [Ano], [URL se existir]
```

### Frontmatter YAML

O frontmatter contém metadados essenciais:

| Campo        | Descrição                         | Valores Típicos                               |
| ------------ | --------------------------------- | --------------------------------------------- |
| `title`      | Título completo da seção          | String entre aspas                            |
| `created_at` | Data de criação                   | Formato ISO 8601 (YYYY-MM-DD)                 |
| `tags`       | Palavras-chave para categorização | Array de strings                              |
| `status`     | Estado do documento               | `draft`, `in-progress`, `review`, `published` |
| `updated_at` | Data da última modificação        | Formato ISO 8601                              |
| `ai_model`   | Modelo de IA utilizado na geração | Identificador do modelo                       |

### Uso de Tags

As tags seguem vocabulário controlado para garantir consistência de busca:

- **Áreas técnicas**: `requirements`, `architecture`, `design`, `testing`,
  `security`, `quality`
- **Conceitos centrais**: `contexto`, `verificacao`, `determinismo`,
  `restricoes`, `transparencia`
- **Práticas**: `prompt-engineering`, `llmops`, `agent-contracts`, `rag`
- **Processos**: `governanca`, `auditoria`, `manutencao`, `deploy`
- **Tipos de conteúdo**: `fundamentos`, `padroes`, `estudo-de-caso`,
  `referencia`

### Referências Bibliográficas

Todas as referências seguem formato padronizado:

```
1. Sobrenome, N. (Ano). "Título do Trabalho". *Publicação*, [detalhes]. URL
```

Regras específicas:

- Autores: Sobrenome primeiro, iniciais depois
- Título de artigos entre aspas
- Título de publicações em itálico
- URLs incluídas para acesso direto
- Ano sempre em destaque
- DOI incluído quando disponível

### Elementos de Formatação

**Tabelas**: Usadas para comparações, mapeamentos e resumos estruturados. Sempre
com cabeçalho descritivo e alinhamento consistente.

**Blocos de código**: Formatação monoespaçada com especificação de linguagem.
Comentários em português.

**Diagramas em texto**: Quando necessário, diagramas são representados usando
ASCII art ou mermaid.

**Destaques**: Uso de negrito para termos novos, itálico para ênfase, e
`monospace` para código inline.

**Admonitions**: Blocos especiais para notas, avisos e dicas:

```markdown
!!! note "Título"
    Conteúdo da nota

!!! warning "Atenção"
    Conteúdo do aviso

!!! tip "Dica"
    Conteúdo da dica
```

______________________________________________________________________

## Adaptações para a Era dos LLMs

O SWEBOK-AI v5.0 incorpora adaptações específicas em todos os Knowledge Areas
para refletir a realidade da engenharia de software AI-augmented.

### Novos Tópicos em KAs Existentes

Cada KA tradicional recebeu extensões temáticas:

| KA                    | Tópicos Novos ou Reestruturados                                                         |
| --------------------- | --------------------------------------------------------------------------------------- |
| **01 - Requirements** | Especificação via linguagem natural; engenharia de contexto; requisitos como restrições |
| **02 - Architecture** | Arquiteturas híbridas; circuit breakers para LLMs; separação IA/negócio                 |
| **03 - Design**       | Design para verificabilidade; contratos formais; padrões de determinismo                |
| **04 - Construction** | Curadoria de código; avaliação de qualidade de outputs; pipelines de verificação        |
| **05 - Testing**      | Testes de não-determinismo; validação de comportamento estocástico; testes de contrato  |
| **06 - Operations**   | LLMOps; monitoramento de modelos; gerenciamento de versões de prompts                   |
| **07 - Maintenance**  | Compreensão de código opaco; refatoração assistida por IA; documentação de linhagem     |
| **08 - SCM**          | Versionamento de prompts; rastreabilidade de origem; metadados de geração               |
| **12 - Quality**      | Qualidade de código gerado; métricas de confiabilidade AI; análise de drift             |
| **13 - Security**     | Vulnerabilidades em código AI; análise de dependências fantasmas; segurança de prompts  |

### Novas Práticas Emergentes

Três práticas transversais aparecem em múltiplos KAs:

**1. Prompt Engineering (KA 01, 04, 14)**

Não se trata apenas de "escrever prompts melhores", mas de:

- Estruturação sistemática de contexto
- Versionamento de prompts como código
- Testes de robustez de prompts
- Documentação de decisões de design em prompts

**2. Agent Contracts (KA 03, 04, 11)**

Framework formal para especificação de comportamento de agentes autônomos:

- Precondições e pós-condições
- Limites de autonomia explícitos
- Critérios de sucesso e falha
- Mecanismos de verificação

**3. LLMOps (KA 06, 08, 12)**

Extensão de MLOps específica para Large Language Models:

- Monitoramento de performance de modelos
- Gerenciamento de custos de inferência
- A/B testing de prompts
- Rollback de modelos e versões

### Foco em Verificação e Contexto

Duas preocupações permeiam todos os KAs:

**Verificação**: Como garantir que código/produtos gerados por IA atendam aos
requisitos? Cada KA inclui técnicas específicas de validação adequadas ao seu
domínio.

**Contexto**: Como fornecer à IA o contexto necessário para gerar outputs de
qualidade? Cada KA trata da engenharia de contexto aplicada à sua área.

### Estrutura de Tratamento em Cada KA

Todo KA no SWEBOK-AI segue estrutura consistente de tratamento:

1. **Fundamentos**: Como os conceitos tradicionais se aplicam na era dos LLMs
2. **Adaptações**: O que mudou e por quê
3. **Novas Práticas**: Técnicas e padrões emergentes
4. **Verificação**: Como validar trabalho AI-assisted
5. **Governança**: Mecanismos de controle e limites
6. **Casos de Uso**: Exemplos concretos de aplicação

______________________________________________________________________

## Resumo

O SWEBOK-AI v5.0 reorganiza o conhecimento em engenharia de software em 15
Knowledge Areas adaptados para a era dos LLMs. A estrutura elimina três KAs de
fundamentação (Mathematical Foundations, Computing Foundations, Engineering
Foundations), reconhecendo que este conhecimento tornou-se commodity acessível
via IA, e concentra-se em práticas aplicadas.

Os 15 KAs cobrem o espectro completo da engenharia de software: desde requisitos
(KA 01) até economia de software (KA 15), passando por arquitetura, design,
construção, testing, operações, manutenção, governança e prática profissional.
Cada KA tem um princípio diretor primário que orienta seu tratamento, embora
todos os seis princípios se manifestem em cada área.

A navegação pelo guia beneficia-se de compreensão das dependências entre KAs.
KAs 01-07 formam uma cadeia sequencial de desenvolvimento; KAs 08, 11, 14, 15
têm maior independência. O KA 00 (Nova Era) serve como fundamento conceitual
para todo o guia.

Convenções rigorosas de formatação garantem consistência: frontmatter YAML com
metadados, estrutura padronizada de seções, vocabulário controlado de tags, e
referências bibliográficas normalizadas. Todo arquivo segue template obrigatório
com objetivos de aprendizagem, conteúdo estruturado, resumo e referências.

As adaptações para a era dos LLMs incluem novos tópicos em cada KA (prompt
engineering, agent contracts, LLMOps), foco intensificado em verificação e
contexto, e estrutura de tratamento padronizada que cobre fundamentos,
adaptações, novas práticas, verificação, governança e casos de uso.

______________________________________________________________________

## Referências

01. Abran, A., Moore, J.W. (Eds.) (2004). "Guide to the Software Engineering
    Body of Knowledge (SWEBOK)". *IEEE Computer Society*.
    <https://www.computer.org/education/bodies-of-knowledge/software-engineering>

02. "Agent Contracts: A Formal Framework for Resource-Bounded Autonomous AI
    Systems." (2026). *arXiv*. <https://arxiv.org/html/2601.08815v1>

03. Bird, C., et al. (2024). "Taking Flight with Copilot: Early insights and
    practices of AI-powered pair-programming tools". *Queue*, 21(6).
    <https://doi.org/10.1145/3633134>

04. DORA (2024). "Accelerate State of DevOps Report 2024".
    <https://dora.dev/research/2024/dora-report>

05. Gipp, B., et al. (2023). "How ChatGPT and similar AI will disrupt academia
    and the practice of software engineering". *arXiv preprint*.
    <https://arxiv.org/abs/2302.08810>

06. "HALoGEN: Fantastic LLM Hallucinations and Where to Find Them." (2025).
    *Proceedings of ACL*. <https://aclanthology.org/2025.acl-long.71/>

07. "Importing Phantoms: Measuring LLM Package Hallucination Vulnerabilities."
    (2024). *arXiv*. <https://arxiv.org/html/2501.19012v1>

08. Lösch, A., et al. (2024). "Code Llama: Open Foundation Models for Code".
    *arXiv*. <https://arxiv.org/abs/2308.12950>

09. McKinsey & Company (2024). "The state of AI in early 2024".
    <https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-2024>

10. Ox Security (2024). "AI-Generated Code Security Report."

11. SWEBOK Version 4.0 (2024). "Guide to the Software Engineering Body of
    Knowledge". *IEEE Computer Society*.
    <https://www.computer.org/education/bodies-of-knowledge/software-engineering>

12. Vaswani, A., et al. (2017). "Attention Is All You Need." *Advances in Neural
    Information Processing Systems*. <https://arxiv.org/abs/1706.03762>

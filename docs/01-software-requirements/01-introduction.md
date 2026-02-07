---
title: Introdução e Fundamentos na Era dos LLMs
created_at: 2025-02-07
tags: [software-requirements, introducao, fundamentos, paradigma, ciclo-de-vida, LLM, SWEBOK-AI]
status: in-progress
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# 1. Introdução e Fundamentos na Era dos LLMs

## 1.1 O Paradigma da Especificação

A engenharia de requisitos atravessa uma transformação fundamental. Por décadas,
a disciplina operou sob um modelo documentocêntrico: requisitos eram capturados
em especificações formais, revisados em ciclos extensivos e validados através de
protótipos estáticos. O IEEE 830, o ISO/IEC/IEEE 29148:2018 e outras normas
estabeleceram estruturas rígidas que, embora garantissem rigor, impunham
latência e rigidez aos processos de desenvolvimento.

A chegada dos Large Language Models (LLMs) desloca o eixo desta disciplina. Não
se trata de mera automação de tarefas repetitivas, mas de uma mudança
epistemológica: **o prompt torna-se a nova forma de especificação**. Onde antes
tínhamos documentos passivos que descreviam comportamentos, agora temos
instruções ativas que geram comportamentos. Esta transição exige uma reavaliação
completa das práticas, ferramentas e competências da engenharia de requisitos.

### 1.1.1 Especificações Tradicionais: Documentos Estáticos

As especificações tradicionais, tal como definidas no SWEBOK v4, possuem
características estruturais bem estabelecidas:

- **Natureza declarativa**: Descrevem o que o sistema deve fazer, sem
  especificar como
- **Imutabilidade relativa**: Alterações requerem processos formais de controle
  de mudanças
- **Validação indireta**: A corretude é verificada através de revisões humanas e
  protótipos
- **Granularidade fixa**: Nível de detalhe determinado no momento da escrita

O Documento de Especificação de Requisitos de Software (SRS) tipicamente segue
uma estrutura hierárquica: introdução, descrição geral, requisitos funcionais
específicos, requisitos não-funcionais, apêndices. Esta estrutura, embora
valiosa para garantir completude, dificulta a adaptação rápida a novas
informações descobertas durante o desenvolvimento.

### 1.1.2 Prompts Estruturados: Especificações Dinâmicas e Executáveis

Na era dos LLMs, a especificação assume uma natureza operacional. Um prompt bem
estruturado não apenas descreve um requisito; ele instrui um modelo a gerar
soluções que satisfazem aquele requisito. Esta mudança introduz novas
propriedades:

- **Executabilidade**: Prompts geram outputs imediatos que podem ser testados
- **Iteratividade**: Refinamentos ocorrem em ciclos de minutos, não dias
- **Contextualidade**: A especificação incorpora dinamicamente informações de
  domínio
- **Composicionalidade**: Prompts podem ser combinados e encadeados em pipelines

A pesquisa de Vogelsang (2024) argumenta que esta transição representa "uma
mudança de paradigma da especificação para o prompt engineering". Onde antes o
engenheiro de requisitos era primariamente um autor de documentos, agora ele se
torna um projetista de instruções e curador de contextos.

### 1.1.3 Tabela Comparativa: Especificação vs. Prompt Engineering

| Dimensão              | Especificação Tradicional          | Prompt Engineering                   |
| --------------------- | ---------------------------------- | ------------------------------------ |
| **Artefato central**  | Documento SRS                      | Biblioteca de prompts versionados    |
| **Ciclo de feedback** | Dias a semanas                     | Minutos a horas                      |
| **Validação**         | Revisões manuais, inspeções        | Testes empíricos dos outputs         |
| **Rastreabilidade**   | Matrizes de rastreabilidade manual | Versionamento de prompts (Git)       |
| **Adaptação**         | Processo formal de mudança         | Refinamento iterativo contínuo       |
| **Reutilização**      | Templates de documentos            | Templates de prompts parametrizáveis |
| **Colaboração**       | Revisões síncronas                 | Co-criação assíncrona com IA         |
| **Granularidade**     | Definida na elaboração             | Adaptável conforme necessidade       |

Esta tabela não sugere que as especificações tradicionais se tornaram obsoletas.
Em contextos regulatórios rigorosos — aeroespacial, dispositivos médicos,
sistemas safety-critical — os documentos formais permanecem obrigatórios. O que
muda é o *processo de geração* destes documentos: eles passam a ser outputs de
um sistema de prompts, não produtos de escrita manual extensiva.

## 1.2 Fundamentos da Engenharia de Requisitos com IA

### 1.2.1 Definição de Requisito de Software no Contexto de LLMs

No SWEBOK v4, um requisito de software é definido como "uma condição ou
capacidade necessária que o sistema deve possuir para satisfazer um contrato,
padrão, especificação ou outro documento formalmente imposto". Na era dos LLMs,
esta definição requer expansão.

Um requisito na era dos LLMs compreende três componentes:

1. **A intenção**: O que o stakeholder deseja alcançar
2. **O contexto**: Informações de domínio, restrições e dependências
3. **A instrução**: O prompt que, quando executado, gera soluções satisfatórias

Esta tríade reflete a natureza híbrida do novo paradigma. A intenção permanece
humana e intransferível; o contexto é frequentemente extraído de bases de
conhecimento organizacionais via RAG (Retrieval-Augmented Generation, ou Geração
Aumentada por Recuperação); a instrução é o artefato técnico que conecta
intenção e contexto à execução.

### 1.2.2 Categorias de Requisitos na Era dos LLMs

As categorias tradicionais de requisitos mantêm sua relevância, mas adquirem
novas camadas de complexidade quando mediadas por LLMs:

**Requisitos Funcionais**

- Tradicional: Descrição de funcionalidades e comportamentos
- Com LLMs: Especificação via prompts que geram comportamentos
- Exemplo: "Quando o usuário clicar em 'salvar', persistir os dados" torna-se um
  prompt que instrui a geração de código de persistência

**Requisitos Não-Funcionais**

- Tradicional: Atributos de qualidade (performance, segurança, usabilidade)
- Com LLMs: Constraints (restrições) aplicadas aos prompts de geração
- Desafio: LLMs frequentemente ignoram requisitos não-funcionais implícitos,
  exigindo explicitação rigorosa nos prompts

**Restrições Tecnológicas**

- Tradicional: Limitações de stack, integrações obrigatórias
- Com LLMs: Configurações de contexto que limitam o espaço de soluções do modelo
- Exemplo: "Usar apenas Python 3.11+" como constraint no prompt

**Requisitos de Qualidade de Serviço (QoS)**

- Tradicional: SLAs, disponibilidade, escalabilidade
- Com LLMs: Parâmetros de geração (temperature, top-p) que afetam a qualidade
  dos outputs

### 1.2.3 Requisitos como Código (Requirements as Code)

Uma das transformações mais significativas é a convergência entre requisitos e
código. A prática de "Requirements as Code" (RaC) trata requisitos como
artefatos versionados, testáveis e integrados em pipelines de CI/CD —
analogamente ao Infrastructure as Code.

Princípios do RaC:

1. **Versionamento**: Prompts armazenados em repositórios Git com histórico
   completo
2. **Testabilidade**: Critérios de aceitação automatizáveis que validam outputs
   de prompts
3. **Integração contínua**: Pipelines que validam requisitos automaticamente
4. **Code review**: Revisão de prompts por pares, com os mesmos rigores de
   código

Esta abordagem dissolve a tradicional separação entre fases de requisitos e
implementação. O requisito não é mais um documento que antecede o código; ele é
uma instrução que gera código sob condições controladas.

## 1.3 O Novo Ciclo de Vida da Engenharia de Requisitos

### 1.3.1 Ciclo Híbrido Humano-IA

O ciclo de vida tradicional de engenharia de requisitos — elicitação, análise,
especificação, validação, gestão — não desaparece, mas é reconfigurado como um
sistema híbrido onde humanos e IAs alternam em atividades complementares.

**Diagrama: AI-Augmented RE Cycle**

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

Neste ciclo:

- **IA** assume tarefas de geração, análise sintática e sugestão
- **Humanos** mantêm o controle de validação, decisão estratégica e aprovação
  final
- **Alternância** entre geração e validação ocorre em granularidade fina
  (minutos), não em marcos de projeto

### 1.3.2 Continuous Requirements Engineering

A velocidade de geração de IA possibilita uma prática emergente: o Continuous
Requirements Engineering (RE Contínuo). Inspirado nos princípios de CI/CD, o RE
Contínuo trata a especificação como um fluxo contínuo, não como uma fase
inicial.

Características do RE Contínuo:

1. **Micro-elicitação**: Captura de requisitos em tempo real durante o
   desenvolvimento
2. **Refinamento contínuo**: Prompts são ajustados conforme novas informações
   emergem
3. **Validação em pipeline**: Critérios de aceitação verificados automaticamente
4. **Feedback loops acelerados**: Stakeholders validam outputs de IA, não
   documentos estáticos

Esta abordagem é particularmente adequada para contextos ágeis, onde a
volatilidade de requisitos é alta e a capacidade de resposta é crítica.
Organizações que adotaram RE assistido por IA relatam ciclos de requisitos
reduzidos de dias para horas.

### 1.3.3 Implicações para a Prática Profissional

A transição para um ciclo híbrido humano-IA exige transformações nas
competências e na organização do trabalho:

**Novas Competências Essenciais:**

- Prompt engineering: Design de instruções efetivas
- Avaliação crítica de IA: Detecção de hallucinações e imprecisões
- Orquestração de agentes: Coordenação de múltiplos sistemas de IA
- Governança de IA: Ética, compliance e gestão de riscos

**Mudanças Organizacionais:**

- Redefinição de papéis: Do autor de documentos ao curador de contextos
- Novas ferramentas: IDEs de prompts, vector databases, frameworks de
  orquestração
- Processos adaptados: Revisões de prompts, testes de outputs, validação
  contínua

A pesquisa de Hemmat et al. (2024) identifica que 83% das pesquisas em RE com
LLMs concentram-se em elicitação e validação, indicando que estas são as áreas
de maior impacto imediato. No entanto, o maior valor estratégico reside na
transformação do próprio paradigma de especificação — uma mudança que requer
tempo, investimento em capacitação e reconfiguração de processos.

## 1.4 Considerações Iniciais sobre Qualidade e Risco

### 1.4.1 O Desafio das Hallucinações

O uso de LLMs em engenharia de requisitos introduz um risco novo e
significativo: a geração de requisitos plausíveis mas incorretos. Estudos
documentam taxas de hallucinação de 30% ou mais em domínios especializados, com
consequências potencialmente severas em projetos críticos.

Manifestações típicas em RE:

- Requisitos que descrevem funcionalidades impossíveis ou inconsistentes
- Dependências inexistentes entre componentes
- Estimativas de esforço baseadas em premissas incorretas
- Interpretações errôneas de regulamentações

A mitigação deste risco requer uma arquitetura de verificação em múltiplas
camadas: validação humana obrigatória, grounding em bases de conhecimento
verificadas (RAG), e técnicas como Chain-of-Verification (CoV).

### 1.4.2 Manutenção do Rigor em Contextos Regulatórios

Em indústrias reguladas — aeroespacial (DO-178C), automotivo (ISO 26262),
dispositivos médicos (IEC 62304) — os requisitos devem satisfazer critérios
rigorosos de rastreabilidade, completude e validação verificável. O uso de LLMs
nestes contextos não é proibido, mas exige:

- Documentação completa de prompts utilizados
- Registros de revisão humana com assinatura eletrônica
- Evidências de análise de impacto para mudanças
- Ferramentas qualificadas (ex: IBM RQA para aplicações safety-critical)

A transição para a era dos LLMs não elimina a necessidade de rigor; ela o
transforma. O engenheiro de requisitos do futuro não escreve menos; ele escreve
de forma diferente, com uma nova linguagem de instrução que, quando dominada,
multiplica sua capacidade de especificar sistemas complexos.

## Referências

1. **Vogelsang, A. (2024).** "From Specifications to Prompts: On the Future of
   Generative Large Language Models in Requirements Engineering." *IEEE
   Software, 41(5)*.
   <https://www.computer.org/csdl/magazine/so/2024/05/10629163/1Zdj3HlmqFG>

2. **IEEE Computer Society. (2024).** *Guide to the Software Engineering Body of
   Knowledge (SWEBOK Guide), Version 4.0*. IEEE Computer Society.
   <https://www.computer.org/education/bodies-of-knowledge/software-engineering/v4>

3. **Hemmat, M., et al. (2024).** "Research Directions for Using LLM in Software
   Requirement Engineering: A Systematic Review." *Frontiers in Computer
   Science, 7*.
   <https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2024.1519437/full>

4. **ISO/IEC/IEEE. (2018).** *ISO/IEC/IEEE 29148:2018 - Systems and software
   engineering — Life cycle processes — Requirements engineering*.

5. **Ebrahim, A., et al. (2025).** "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques: Insights from Current Research
   and Future Directions." *ACL Anthology 2025*.
   <https://aclanthology.org/2025.acl-srw.31/>

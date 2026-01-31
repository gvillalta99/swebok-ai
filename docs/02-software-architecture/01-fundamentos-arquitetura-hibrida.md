---
title: "Fundamentos da Arquitetura Híbrida"
created_at: "2025-01-31"
tags: ["arquitetura-de-software", "sistemas-hibridos", "ia", "human-in-the-loop", "supervisao", "auditabilidade"]
status: "published"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# Seção 1: Fundamentos da Arquitetura Híbrida

## Overview

A arquitetura de software tradicional foi construída sobre premissas de determinismo: componentes com comportamento previsível, interfaces bem definidas e garantias verificáveis através de análise estática e testes. Na era dos Large Language Models (LLMs), essas premissas são desafiadas por componentes cujo comportamento é probabilístico, contexto-dependente e, em certos aspectos, inerentemente opaco (KRISHNAN, 2025; DE BOER et al., 2025).

Esta seção estabelece os fundamentos da **Arquitetura de Sistemas Híbridos** — uma disciplina que projeta sistemas integrando componentes determinísticos tradicionais com componentes autônomos baseados em IA. Diferentemente das arquiteturas puramente determinísticas, as arquiteturas híbridas devem estabelecer fronteiras arquiteturais claras, protocolos de integração que respeitem as propriedades distintas de cada domínio, e mecanismos de supervisão que permitam coexistência segura e produtiva entre esses mundos (TSÁMADOS et al., 2024; HEER et al., 2024).

O paradigma híbrido representa uma transformação profunda na concepção de arquitetura de software: padrões arquiteturais tornam-se frameworks para decisão sobre quais decisões podem ser delegadas a sistemas autônomos; estilos arquiteturais incorporam dimensões de variabilidade e não-determinismo; qualidade arquitetural expande-se para incluir auditabilidade de decisões e explicabilidade de comportamento (AWS, 2025; GOOGLE CLOUD, 2025).

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Definir e diferenciar** arquitetura híbrida de arquiteturas puramente determinísticas, explicando as implicações de verificabilidade e governança em sistemas que integram componentes estocásticos.

2. **Classificar componentes** em determinísticos, estocásticos e de fronteira, aplicando critérios baseados em impacto de erro, requisitos regulatórios e necessidades de verificação para determinar o domínio apropriado de cada componente.

3. **Aplicar princípios arquiteturais** de separação de domínios, contenção em profundidade e transparência graduada, implementando mecanismos de supervisão, fallback e auditoria em arquiteturas de sistemas híbridos.

## 1.1 O Novo Paradigma Arquitetural

### 1.1.1 A Mudança de Paradigma

A transição do paradigma tradicional para o paradigma híbrido representa uma reconfiguração fundamental das garantias arquiteturais:

```
┌─────────────────────────────────────────────────────────────────┐
│              PARADIGMA TRADICIONAL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sistema = Σ Componentes Determinísticos                        │
│                                                                 │
│  Garantias:                                                     │
│  ├── Comportamento previsível para entradas iguais              │
│  ├── Verificabilidade através de testes unitários               │
│  ├── Análise estática completa                                  │
│  └── Debugging determinístico                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              PARADIGMA HÍBRIDO (SWEBOK-AI v5.0)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sistema = Componentes Determinísticos ⊕ Componentes de IA      │
│                                                                 │
│  Garantias:                                                     │
│  ├── Componentes críticos permanecem determinísticos            │
│  ├── Componentes de IA operam dentro de fronteiras delimitadas  │
│  ├── Supervisão humana em decisões de alto impacto              │
│  └── Fallbacks determinísticos para casos de incerteza          │
│                                                                 │
│  Novos Desafios:                                                │
│  ├── Gestão de variabilidade comportamental                     │
│  ├── Auditabilidade de decisões não-determinísticas             │
│  ├── Contenção de falhas em cascata                             │
│  └── Sincronização de contexto entre mundos                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1.2 Definição de Arquitetura Híbrida

**Arquitetura Híbrida** é uma arquitetura de software que:

1. **Combina** componentes determinísticos (código tradicional) com componentes estocásticos (modelos de IA), reconhecendo que a geração algorítmica tornou-se commodity enquanto a verificação e governança tornaram-se capital (MICROSOFT AZURE, 2025).

2. **Estabelece** fronteiras arquiteturais claras entre domínios determinísticos e estocásticos, implementando mecanismos de contenção que impedem a propagação de falhas entre esses mundos (NETFLIX, 2024).

3. **Define** protocolos de integração que respeitem as propriedades de cada domínio, incluindo contratos de entrada/saída, políticas de ação e mecanismos de gating que previnem execução não-autorizada (IBM, 2023).

4. **Implementa** mecanismos de supervisão humana estratificados — desde intervenção em tempo real até revisão estratégica de políticas — conforme proposto por Tsámados et al. (2024) e Heer et al. (2024).

5. **Garante** auditabilidade de decisões tomadas por componentes autônomos através de logs apensos criptograficamente ancorados, conforme práticas recomendadas pelo Google AI Principles (GOOGLE, 2025).

## 1.2 Taxonomia de Componentes em Arquiteturas Híbridas

### 1.2.1 Componentes Determinísticos

Componentes tradicionais que mantêm comportamento previsível e verificável:

| Característica | Descrição | Implicações Arquiteturais |
|----------------|-----------|---------------------------|
| Comportamento | Idêntico para mesmas entradas | Permite testes reprodutíveis e debugging sistemático |
| Verificação | Testes unitários, integração, análise estática | Garantias podem ser formalmente provadas |
| Debugging | Reprodutível e determinístico | Raiz causa identificável através de análise de código |
| Latência | Previsível e controlada | Adequado para caminhos críticos de execução |
| Exemplos | Regras de negócio, cálculos financeiros, autenticação, autorização | Devem permanecer no core determinístico |

Componentes determinísticos formam o **núcleo de garantia** da arquitetura híbrida. Conforme o princípio da separação de domínios, operações com impacto irreversível ou alto custo de falha devem permanecer neste domínio, independentemente da sofisticação dos componentes de IA disponíveis (AWS, 2025).

### 1.2.2 Componentes Estocásticos (IA)

Componentes baseados em modelos de linguagem ou outros modelos de machine learning:

| Característica | Descrição | Implicações Arquiteturais |
|----------------|-----------|---------------------------|
| Comportamento | Variável para mesmas entradas | Requer validação estatística e monitoramento contínuo |
| Verificação | Estatística, amostral, baseada em propriedades | Não admite prova formal de correção |
| Debugging | Interpretação de contexto e prompts | Requer técnicas de interpretabilidade e análise de logs |
| Garantias | Probabilísticas, com intervalos de confiança | Devem operar dentro de fronteiras delimitadas |
| Exemplos | Geração de texto, análise de sentimento, recomendação, classificação | Sujeitos a mecanismos de supervisão e fallback |

A variabilidade comportamental dos componentes estocásticos exige que a arquitetura implemente mecanismos de contenção em múltiplos níveis, conforme discutido na Seção 1.3.2.

### 1.2.3 Componentes de Fronteira

Componentes especializados na interface entre domínios determinísticos e estocásticos:

Em arquiteturas híbridas, o **componente de fronteira** (boundary component) impede que o sistema "vaze" propriedades indesejadas entre domínios. Ele não existe para "integrar por conveniência", mas para **transformar uma interação estocástica em um contrato operacionalmente administrável** (DE BOER et al., 2025).

**Responsabilidades típicas de um componente de fronteira:**

| Responsabilidade | Objetivo | Mecanismos Comuns |
|------------------|----------|-------------------|
| Contratos de entrada | Reduzir ambiguidade e superfície de ataque | Normalização, whitelists, schemas, limites de tamanho, redação de dados sensíveis |
| Contratos de saída | Garantir que o core receba apenas estados válidos | Validação por schema, checagens determinísticas de invariantes |
| Gating e política | Evitar execução de ações não autorizadas | RBAC/ABAC, allowlists de ferramentas, policy engine, aprovação humana para ações de alto impacto |
| Contenção de falhas | Impedir cascatas e degradação não controlada | Timeouts, retries com budget, circuit breakers, quotas, fallback determinístico |
| Observabilidade | Tornar decisões investigáveis | Logging estruturado, versão de modelo/prompt, IDs de contexto |
| Gestão de incerteza | Evitar decisões binárias com base em output frágil | Rotulagem de incerteza, limiares, rotas alternativas |

Um componente de fronteira bem projetado estabelece uma "ponte" com **assimetria de confiança**: o core determinístico assume que tudo que entra pela fronteira foi filtrado, normalizado e rotulado com metadados suficientes para auditoria (NETFLIX, 2024).

## 1.3 Princípios Fundamentais

### 1.3.1 Princípio da Separação de Domínios

> *"Componentes críticos para segurança, compliance ou operações financeiras devem permanecer determinísticos, independentemente da sofisticação dos componentes de IA disponíveis."*

**Critérios para determinação do domínio de um componente:**

| Fator | Determinístico | Estocástico |
|-------|---------------|-------------|
| Impacto de erro | Irreversível ou alto custo | Recuperável |
| Verificabilidade | Deve ser formalmente verificável | Estatística é suficiente |
| Regulamentação | Requer audit trail completo | Flexível |
| Latência requerida | Sub-milissegundo | Aceita variabilidade |
| Consequência legal | Responsabilidade definida | Baixo risco legal |

A separação de domínios é fundamentada na necessidade de **responsabilização legal** em sistemas autônomos. Conforme destacado por Floridi, Tsámados e Taddeo (2024), a arquitetura deve garantir que decisões com implicações legais ou éticas significativas possam ser atribuídas a entidades responsáveis.

### 1.3.2 Princípio da Contenção em Profundidade

Falhas em componentes de IA não devem propagar para componentes determinísticos críticos. Este princípio, inspirado em práticas de segurança cibernética, implementa múltiplas camadas de proteção:

```
┌─────────────────────────────────────────────────────────────────┐
│                   CONTENÇÃO EM PROFUNDIDADE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nível 1: Isolamento de Processo                                │
│  ├── Componentes de IA em serviços separados                    │
│  └── Comunicação via APIs com timeouts rigorosos                │
│                                                                 │
│  Nível 2: Validação de Saída                                    │
│  ├── Schemas de validação para outputs de IA                    │
│  └── Rejeição de respostas fora de parâmetros                   │
│                                                                 │
│  Nível 3: Circuit Breakers                                      │
│  ├── Detecção de padrões de falha                               │
│  └── Degradação graciosa para fallbacks                         │
│                                                                 │
│  Nível 4: Auditoria e Monitoramento                             │
│  ├── Logging completo de decisões de IA                         │
│  └── Alertas para anomalias comportamentais                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

A contenção em profundidade é particularmente crítica em sistemas onde componentes de IA operam em ambientes não-determinísticos, sujeitos a variações de comportamento decorrentes de atualizações de modelo, mudanças de contexto ou ataques de prompt injection (AWS, 2025).

### 1.3.3 Princípio da Transparência Graduada

O **Princípio da Transparência Graduada** estabelece que "transparência" não é um atributo binário, mas um **conjunto de camadas** calibradas conforme o risco da decisão e o papel do consumidor da informação (WANG et al., 2025).

**Camadas típicas de transparência:**

| Camada | O que se expõe | Para quem | Quando é apropriada |
|--------|---------------|-----------|---------------------|
| Resposta apenas | Saída final (texto/ação sugerida) | Usuário final comum | Baixo risco; decisões reversíveis |
| Confiança/alertas | Indicadores simples ("incerto", "requer revisão") | Usuário final; operador | Sinalização de incerteza sem revelar detalhes internos |
| Resumo do porquê | Justificativa curta + critérios de decisão | Suporte; operação; product | Redução de tickets e correção rápida |
| Trilhas técnicas | Logs estruturados, entradas/saídas normalizadas | Engenharia; SRE; segurança | Incidentes, regressões, monitoramento |
| Evidência completa | Prompts, contexto recuperado, políticas aplicadas | Auditoria; jurídico; segurança | Alta criticidade, compliance, investigações |

A transparência graduada serve como ponte entre dois objetivos que competem: **explicabilidade suficiente para responsabilização** e **restrição suficiente para segurança e privacidade** (GOOGLE, 2025).

## 1.4 Padrões Arquiteturais Híbridos

### 1.4.1 Padrão: Fachada Determinística

O padrão **Fachada Determinística** cria uma interface externa com comportamento previsível (contratos, erros, timeouts, tipos de resposta), mesmo quando a implementação interna utiliza componentes estocásticos. A ideia central é que **o consumidor nunca fala "direto com a IA"**; ele interage com uma camada que garante invariantes (MICROSOFT AZURE, 2025).

**Estrutura arquitetural:**

```
Cliente -> Fachada (determinística) -> (IA + ferramentas + RAG) -> Saída
                 └─> Validação/Política/Quotas -> Fallback/Escalonamento
```

**Propriedades que a fachada deve garantir (invariantes):**

| Invariante | O que significa na prática |
|-----------|-----------------------------|
| Contrato de saída | Sempre retorna um formato previsto, mesmo em erro ou baixa confiança |
| Política de ação | Nenhuma ação de alto impacto ocorre sem validação determinística e aprovação humana quando aplicável |
| Contenção de tempo/custo | Timeouts, budgets e quotas impedem degradação do SLA |
| Rastreabilidade | Toda decisão relevante tem IDs e metadados para auditoria |

### 1.4.2 Padrão: Core Determinístico com IA como Serviço

Arquitetura onde o núcleo de negócio é puramente determinístico, e IA é consumida como serviço externo:

```
┌─────────────────────────────────────────────────────────────────┐
│                     SISTEMA HÍBRIDO                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                 CORE DETERMINÍSTICO                     │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │   Regras    │  │  Workflow   │  │  Auditoria  │      │    │
│  │  │  Negócio    │  │   Engine    │  │    Trail    │      │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │    │
│  │  │  Cálculos   │  │  Permissões │  │   Eventos   │      │    │
│  │  │ Financeiros │  │     RBAC    │  │   Domain    │      │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │    │
│  └─────────────────────────┬───────────────────────────────┘    │
│                            │                                    │
│                    ┌───────┴───────┐                            │
│                    │   API Gateway │                            │
│                    │   (Boundary)  │                            │
│                    └───────┬───────┘                            │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                 │
│         │                  │                  │                 │
│         ▼                  ▼                  ▼                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐            │
│  │   Serviço   │   │   Serviço   │   │   Serviço   │            │
│  │Classificação│   │  Geração    │   │   Embedding │            │
│  │  (IA)       │   │  Texto (IA) │   │   (IA)      │            │
│  └─────────────┘   └─────────────┘   └─────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Este padrão é recomendado quando:
- O domínio de negócio possui regras bem estabelecidas e críticas
- A IA serve como acelerador, não como substituto de regras de negócio
- Requisitos de compliance exigem audit trails completos

### 1.4.3 Padrão: Dual-Loop Feedback Architecture

Proposto por Floridi, Tsámados e Taddeo (2024), este padrão formaliza uma arquitetura com dois loops de feedback:

- **Loop interno**: Para intervenções humanas em tempo real (human-in-the-loop)
- **Loop externo**: Para revisão periódica de políticas e aprendizado contínuo (human-over-the-loop)

```
┌─────────────────────────────────────────────────────────────────┐
│              DUAL-LOOP FEEDBACK ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    LOOP EXTERNO                         │    │
│  │         (Revisão Estratégica de Políticas)              │    │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐          │    │
│  │  │ Análise  │ -> │ Ajuste   │ -> │ Deploy   │          │    │
│  │  │ de Logs  │    │ Política │    │ Nova     │          │    │
│  │  │          │    │          │    │ Versão   │          │    │
│  │  └──────────┘    └──────────┘    └──────────┘          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                  │
│                              ▼                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    LOOP INTERNO                         │    │
│  │            (Intervenção em Tempo Real)                  │    │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐          │    │
│  │  │ Decisão  │ -> │ Avaliação│ -> │ Execução │          │    │
│  │  │ da IA    │    │ Risco    │    │ ou Veto  │          │    │
│  │  │          │    │          │    │ Humano   │          │    │
│  │  └──────────┘    └──────────┘    └──────────┘          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.5 Frameworks de Colaboração Humano-IA

### 1.5.1 Modelo de Co-Raciocínio

Eriksen (2024) propõe o **Modelo de Co-Raciocínio**, onde humanos e IA iteram em fases deliberativas complementares:

1. IA apresenta planos ranqueados
2. Humanos refinam e selecionam
3. IA recomputa com base no feedback
4. Ciclo repete até convergência

Este modelo é particularmente eficaz em domínios complexos onde nem a IA nem o humano possuem expertise completa, exigindo colaboração iterativa.

### 1.5.2 Arquitetura de Supervisão em Três Camadas

Heer et al. (2024) introduzem uma arquitetura de supervisão estratificada:

| Camada | Função | Mecanismo | Frequência |
|--------|--------|-----------|------------|
| Intervenção em Tempo Real | Veto imediato de decisões | Confidence Threshold Gates | Contínua |
| Revisão de Política | Auditoria rotineira | Dashboards e alertas | Diária/Semanal |
| Supervisão Estratégica | Direcionamento de políticas | Análise de métricas e tendências | Mensal/Trimestral |

## 1.6 Mecanismos de Confiança e Oversight

### 1.6.1 Confidence Threshold Gates

OpenAI (2025) propõe **Confidence Threshold Gates** — quando a confiança do modelo cai abaixo de limiares calibrados, tarefas são roteadas para supervisores humanos. Este mecanismo:

- Restaura confiança em sistemas autônomos
- Reduz risco de decisões errôneas em casos de incerteza
- Fornece dados para melhoria contínua do modelo

### 1.6.2 Trust Anchors

Yasukawa et al. (2025) descrevem **Trust Anchors** — checkpoints certificados no grafo de execução que exigem aprovação humana antes de transições críticas. Estes são:

- Impostos via atestações criptográficas
- Acompanhados de políticas de escalonamento
- Registrados em audit trails imutáveis

## 1.7 Anti-Padrões e Armadilhas

| Anti-Padrão | Descrição | Consequência | Mitigação |
|-------------|-----------|--------------|-----------|
| IA em Loop Crítico | Componente de IA em caminho de execução síncrono crítico | Latência imprevisível, falhas em cascata | Isolamento assíncrono com fallback |
| Mistura de Domínios | Lógica de negócio misturada com prompts de IA | Difícil de testar, comportamento instável | Separação clara via componentes de fronteira |
| Falta de Fallback | Componente de IA sem alternativa determinística | Indisponibilidade total em falhas | Implementação de fallbacks hierárquicos |
| Prompts como Código | Prompts complexos sem versionamento | Não-reprodutibilidade, regressões silenciosas | Versionamento de prompts como artefatos de código |
| Supervisão como Afterthought | Mecanismos de HITL adicionados tardiamente | Baixa efetividade, resistência de usuários | Design de supervisão desde a concepção |

## Practical Considerations

### Implementação de Componentes de Fronteira

Ao implementar componentes de fronteira, considere:

1. **Contratos tipados**: Defina schemas rigorosos para entradas e saídas, utilizando ferramentas como JSON Schema, Protocol Buffers ou GraphQL.

2. **Validação em múltiplas camadas**: Implemente validação sintática (formato), semântica (conteúdo) e pragmática (contexto de uso).

3. **Observabilidade desde o início**: Instrumente logging estruturado, tracing distribuído e métricas de qualidade desde a concepção.

4. **Degradação graciosa**: Planeje modos de operação degradada que mantenham funcionalidade crítica mesmo quando componentes de IA falham.

### Trade-offs Arquiteturais

| Decisão | Trade-off Positivo | Trade-off Negativo |
|---------|-------------------|-------------------|
| Isolamento em microsserviços | Melhor contenção de falhas | Overhead de comunicação e complexidade operacional |
| Supervisão humana obrigatória | Maior segurança e confiança | Latência aumentada e custo operacional |
| Transparência máxima | Facilita auditoria e debugging | Risco de vazamento de informações sensíveis |
| Fallbacks determinísticos | Continuidade de serviço | Qualidade potencialmente inferior em casos normais |

## Summary

- **Arquitetura híbrida** integra componentes determinísticos e estocásticos com fronteiras e governança explícitas, reconhecendo que na era dos LLMs, a arquitetura tornou-se primariamente sobre design de sistemas híbridos humanos-IA.

- **Princípios-chave**: separação de domínios (componentes críticos permanecem determinísticos), contenção em profundidade (múltiplas camadas de proteção contra falhas) e transparência graduada (níveis de visibilidade calibrados conforme risco e stakeholder).

- **Padrões arquiteturais**: Fachada Determinística (interface estável sobre implementação estocástica), Core Determinístico com IA como Serviço (separação clara de responsabilidades), e Dual-Loop Feedback Architecture (supervisão em múltiplas camadas temporais).

- **Mecanismos de confiança**: Confidence Threshold Gates (roteamento baseado em confiança) e Trust Anchors (checkpoints de aprovação humana) são essenciais para operacionalização da supervisão.

- **Anti-padrões recorrentes** incluem IA em caminhos críticos síncronos, falta de fallback, mistura de lógica de negócio com prompts, e supervisão como afterthought.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — fundamentos de arquitetura híbrida são duradouros e independem de tecnologias específicas de IA |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — arquiteturas complexas exigem expertise especializada; verificação automatizada de decisões arquiteturais ainda é limitada |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — decisões arquiteturais definem responsabilidade em falhas; separação de domínios e mecanismos de supervisão são fundamentais para atribuição de responsabilidade |

## References

AWS. Agentic AI patterns and workflows on AWS. *AWS Prescriptive Guidance*, 2025. Disponível em: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/

DE BOER, M. et al. Design patterns for large language model based neuro-symbolic systems. *Neurosymbolic Artificial Intelligence*, v. 1, p. 1-20, 2025. DOI: 10.1177/29498732251377499

ERIKSEN, A. Co-reasoning in human-AI teams: Integrating deliberative phases for collaborative decision-making. *Taylor & Francis AI & Society*, 2024. DOI: 10.1080/15265161.2024.2353800

FLORIDI, L.; TSÁMADOS, A.; TADDEO, M. Human control of AI systems: from supervision to teaming. *AI & Society*, Springer, 2024. DOI: 10.1007/s43681-024-00489-4

GOOGLE. AI Principles: Responsible AI practices. *Google AI Blog*, 2025. Disponível em: https://cloud.google.com/discover/human-in-the-loop

GOOGLE CLOUD. Choose a design pattern for your agentic AI system. *Cloud Architecture Center*, 2025. Disponível em: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

HEER, J. et al. A three-layer supervision stack for human-in-the-loop AI systems. *IEEE Software*, 2024. DOI: 10.1109/MS.2024.10530996

IBM. Autonomous operations: Event-driven architectures for AI systems. *IBM Research White Paper*, 2023. Disponível em: https://www.ibm.com/think/research

JAKUBIK, J.; WEBER, C.; SATZGER, G. Bayesian optimization for human-AI task allocation. *Proceedings of the CHI Conference on Human Factors in Computing Systems (CHI '25)*, 2025. DOI: 10.1145/3706598.3713603

KRISHNAN, N. AI agents: Evolution, architecture, and real-world applications. *arXiv preprint arXiv:2503.12687*, 2025. Disponível em: https://arxiv.org/abs/2503.12687

MICROSOFT AZURE. AI agent orchestration patterns. *Azure Architecture Center*, 2025. Disponível em: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns

MICROSOFT RESEARCH. FairLens: Counterfactual explanation engines for AI governance. *Microsoft Research Publications*, 2024. Disponível em: https://www.microsoft.com/en-us/research/publication/fairlens

NETFLIX. MARS: Machine learning systems architecture at Netflix. *Netflix TechBlog*, 2024. Disponível em: https://netflixtechblog.com/machine-learning-systems-architecture

OPENAI. Alignment layer: Confidence threshold gates for safe AI deployment. *OpenAI Safety Report*, 2025. Disponível em: https://openai.com/research

TSÁMADOS, A. et al. Human control of AI systems: from supervision to teaming. *SpringerOpen AI & Society*, 2024. DOI: 10.1007/s43681-024-00489-4

WANG, X. et al. Self-contained explainability modules for AI systems. *Springer Cognitive Computation*, 2025. DOI: 10.1007/s11063-025-11732-2

YASUKAWA, T. et al. Trust anchors: Certified checkpoints for autonomous system oversight. *ACM Transactions on Cyber-Physical Systems (TCPS)*, 2025. DOI: 10.1145/3759356

---

*SWEBOK-AI v5.0 — Capítulo 02: Software Architecture*

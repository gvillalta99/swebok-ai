# Seção 1: Fundamentos da Arquitetura Híbrida

## Overview

Esta seção introduz arquitetura híbrida como disciplina para integrar componentes determinísticos e componentes estocásticos (IA) com fronteiras claras, mecanismos de contenção e governança. O foco é preservar garantias onde elas são necessárias e tratar incerteza como requisito arquitetural, não como detalhe.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir arquitetura híbrida e explicar por que ela difere de arquiteturas puramente determinísticas
2. Classificar componentes (determinísticos, estocásticos, de fronteira) e entender implicações de verificação
3. Aplicar princípios de separação de domínios, contenção em profundidade e transparência graduada
4. Identificar anti-padrões comuns (IA em loop crítico, falta de fallback, mistura de domínios)

## 1.1 Introdução: O Novo Paradigma Arquitetural

A arquitetura de software tradicional foi construída sobre premissas de determinismo: componentes com comportamento previsível, interfaces bem definidas, e garantias que podem ser verificadas através de análise estática e testes. Na era dos Large Language Models (LLMs), essas premissas são desafiadas por componentes cujo comportamento é probabilístico, contexto-dependente e, em certos aspectos, inerentemente opacos.

A **Arquitetura Híbrida** é a disciplina de projetar sistemas que integram componentes determinísticos tradicionais com componentes autônomos baseados em IA, estabelecendo fronteiras arquiteturais, protocolos de integração e mecanismos de governança que permitem que esses mundos coexistam de forma segura e produtiva.

### 1.1.1 A Mudança de Paradigma

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

1. **Combina** componentes determinísticos (código tradicional) com componentes estocásticos (modelos de IA)
2. **Estabelece** fronteiras arquiteturais claras entre esses domínios
3. **Define** protocolos de integração que respeitem as propriedades de cada mundo
4. **Implementa** mecanismos de supervisão, fallback e contenção
5. **Garante** auditabilidade de decisões tomadas por componentes autônomos

## 1.2 Taxonomia de Componentes em Arquiteturas Híbridas

### 1.2.1 Componentes Determinísticos

Componentes tradicionais que mantêm comportamento previsível:

| Característica | Descrição |
|----------------|-----------|
| Comportamento | Idêntico para mesmas entradas |
| Verificação | Testes unitários, integração, análise estática |
| Debugging | Reprodutível e determinístico |
| Garantias | Podem ser provadas formalmente |
| Exemplos | Regras de negócio, cálculos financeiros, autenticação |

### 1.2.2 Componentes Estocásticos (IA)

Componentes baseados em modelos de linguagem ou outros modelos de ML:

| Característica | Descrição |
|----------------|-----------|
| Comportamento | Variável para mesmas entradas |
| Verificação | Estatística, amostral, baseada em propriedades |
| Debugging | Interpretação de contexto e prompts |
| Garantias | Probabilísticas, com intervalos de confiança |
| Exemplos | Geração de texto, análise de sentimento, recomendação |

### 1.2.3 Componentes de Fronteira

Componentes especializados na interface entre os dois mundos:

Em arquiteturas híbridas, o **componente de fronteira** (boundary component) é o que impede que o sistema “vaze” propriedades indesejadas entre domínios. Ele não existe para “integrar por conveniência”, mas para **transformar uma interação estocástica em um contrato operacionalmente administrável**.

Na prática, componentes de fronteira combinam papéis que, em sistemas puramente determinísticos, costumam estar dispersos (DTOs, validação, gateways, observabilidade). Em sistemas com IA, esses papéis tornam-se centrais porque:

- o componente estocástico pode produzir saídas fora do esperado (formato, semântica, segurança)
- a mesma entrada pode resultar em respostas diferentes (variância)
- parte do comportamento depende de contexto externo (RAG, ferramentas, estado)

Um componente de fronteira bem projetado estabelece uma “ponte” com **assimetria de confiança**: o core determinístico assume que tudo que entra pela fronteira foi filtrado, normalizado e rotulado com metadados suficientes para auditoria.

**Responsabilidades típicas de um componente de fronteira**

| Responsabilidade | Objetivo | Mecanismos comuns |
|-----------------|----------|-------------------|
| Contratos de entrada | Reduzir ambiguidade e superfície de prompt injection | normalização, whitelists, schemas, limites de tamanho, remoção/redação de dados sensíveis |
| Contratos de saída | Garantir que o core receba apenas estados válidos | validação por schema, checagens determinísticas (invariantes), classificação de “tipo” de resposta (ex.: ação vs. texto) |
| Gating e política | Evitar que a IA execute ações não autorizadas | RBAC/ABAC, allowlists de ferramentas, policy engine, “human approval” para ações de alto impacto |
| Contenção de falhas | Impedir cascatas e degradação não controlada | timeouts, retries com budget, circuit breakers, quotas, fallback determinístico |
| Observabilidade e auditoria | Tornar decisões investigáveis e reprodutíveis | logging estruturado de entradas/saídas, versão de modelo/prompt, IDs de contexto, trilhas de ferramentas |
| Gestão de incerteza | Evitar decisões “binárias” com base em output frágil | rotulagem de incerteza, limiares, rotas alternativas (escalonamento humano, fallback) |

**O que muda arquiteturalmente quando a fronteira é tratada como “produto”**

- Interfaces passam a carregar, além do resultado, metadados mínimos: origem, versão, contexto usado e gatilhos de degradação.
- O sistema diferencia “respostas” de “ações”: texto pode ser exibido; ação exige validação determinística e, frequentemente, aprovação.
- A fronteira separa preocupações de segurança: o core não deve depender de prompts, cadeias de ferramentas ou do formato interno do modelo.

Em resumo, componentes de fronteira são a camada responsável por **converter variância em governança**: eles definem onde a incerteza pode existir, como é medida, e como o sistema reage quando a incerteza excede o aceitável.

## 1.3 Princípios Fundamentais

### 1.3.1 Princípio da Separação de Domínios

> *"Componentes críticos para segurança, compliance ou operações financeiras devem permanecer determinísticos, independentemente da sofisticação dos componentes de IA disponíveis."*

**Critérios para determinar o domínio de um componente:**

| Fator | Determinístico | Estocástico |
|-------|---------------|-------------|
| Impacto de erro | Irreversível ou alto custo | Recuperável |
| Verificabilidade | Deve ser formalmente verificável | Estatística é suficiente |
| Regulamentação | Requer audit trail completo | Flexível |
| Latência requerida | Sub-milissegundo | Aceita variabilidade |

### 1.3.2 Princípio da Contenção em Profundidade

Falhas em componentes de IA não devem propagar para componentes determinísticos críticos:

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

### 1.3.3 Princípio da Transparência Graduada

Diferentes stakeholders requerem diferentes níveis de visibilidade:

O **Princípio da Transparência Graduada** afirma que “transparência” não é um binário (ter ou não ter explicação): é um **conjunto de camadas** que deve ser calibrado conforme o risco da decisão e conforme o papel do consumidor da informação. Em arquitetura híbrida, isso é necessário porque:

- a mesma decisão pode exigir justificativa distinta para pessoas distintas (usuário, auditor, time de engenharia)
- expor contexto integral (prompts, documentos recuperados, ferramentas) pode criar riscos de segurança e privacidade
- o custo de observabilidade pode ser alto; portanto, deve existir uma política explícita de “quanto registrar” e “para quem mostrar”

O objetivo arquitetural não é “explicar tudo”, mas **garantir contestabilidade e auditabilidade proporcionais**.

**Camadas típicas de transparência (exemplo operacional)**

| Camada | O que se expõe | Para quem (exemplos) | Quando é apropriada |
|--------|-----------------|----------------------|---------------------|
| Resposta apenas | Saída final (texto/ação sugerida) | usuário final comum | Baixo risco; decisões reversíveis; sem impacto regulatório |
| Confiança/alertas | Indicadores simples (ex.: “incerto”, “requer revisão”) | usuário final; operador | Quando o sistema precisa sinalizar incerteza sem revelar detalhes internos |
| Resumo do porquê | Justificativa curta + critérios de decisão (em linguagem humana) | suporte; operação; product | Quando é preciso reduzir tickets e permitir correção rápida sem expor dados sensíveis |
| Trilhas técnicas | Logs estruturados, entradas/saídas normalizadas, versões, ferramentas acionadas, IDs de contexto | engenharia; SRE; segurança | Incidentes, regressões, monitoramento de qualidade e custos |
| Evidência completa (controlada) | Prompts, contexto recuperado, documentos, políticas aplicadas, registros de aprovação humana | auditoria; jurídico; segurança (acesso restrito) | Alta criticidade, exigência de compliance, investigações formais |

Note que a última camada não significa “tornar tudo público”; significa **existir** e estar disponível sob governança rigorosa.

**Implicações de design**

- A arquitetura deve distinguir explicitamente: o que é **telemetria** (monitoramento), o que é **auditoria** (rastro para responsabilização) e o que é **explicação** (comunicação para humanos).
- Transparência é uma política: deve haver critérios objetivos para seleção de camada, tipicamente combinando **papel do solicitante**, **classe de risco** e **sensibilidade de dados**.
- A fronteira é responsável por aplicar redaction e minimização (por exemplo, mascarar PII e segredos) antes de qualquer exposição.

**Trade-offs e riscos comuns**

- Transparência excessiva para usuários finais pode facilitar engenharia social, prompt injection e exfiltração de contexto.
- Transparência insuficiente aumenta MTTR (tempo para resolver incidentes) e dificulta auditoria, gerando risco legal e operacional.
- Em sistemas com RAG, “mostrar fontes” sem curadoria pode criar falsa sensação de rigor; a arquitetura deve separar “fonte usada” de “fonte confiável”.

Na prática, a transparência graduada serve como ponte entre dois objetivos que competem: **explicabilidade suficiente para responsabilização** e **restrição suficiente para segurança e privacidade**.

## 1.4 Padrões Arquiteturais Híbridos

### 1.4.1 Padrão: Fachada Determinística

Uma camada determinística que expõe uma interface estável, enquanto internamente pode utilizar componentes de IA:

O padrão **Fachada Determinística** cria uma interface externa com comportamento previsível (contratos, erros, timeouts, tipos de resposta), mesmo quando a implementação interna usa componentes estocásticos. A ideia central é simples: **o consumidor nunca fala “direto com a IA”**; ele fala com uma camada que garante invariantes.

Esse padrão é especialmente útil quando a IA é um acelerador (triagem, sugestão, rascunho), mas a organização ainda precisa de:

- contratos estáveis para integrações
- tempos de resposta e modos de falha controlados
- observabilidade e rastreabilidade uniformes
- capacidade de degradação graciosa (fallback)

**Estrutura arquitetural típica**

```
Cliente -> Fachada (determinística) -> (IA + ferramentas + RAG) -> Saída
                 └─> Validação/Política/Quotas -> Fallback/Escalonamento
```

**Propriedades que a fachada deve garantir (invariantes)**

| Invariante | O que significa na prática |
|-----------|-----------------------------|
| Contrato de saída | Sempre retorna um formato previsto, mesmo em erro ou baixa confiança |
| Política de ação | Nenhuma ação de alto impacto ocorre sem validação determinística e, quando aplicável, aprovação humana |
| Contenção de tempo/custo | Timeouts, budgets e quotas impedem que a IA degradem o SLA do sistema |
| Rastreabilidade | Toda decisão relevante tem IDs e metadados para auditoria e reprocessamento |

**Como a fachada orquestra IA sem “infectar” o core**

- Classifica a solicitação e decide rotas (ex.: responder, pedir clarificação, escalar).
- Traduz a saída da IA para estados do domínio (ex.: categoria, prioridade, ação sugerida), reduzindo dependência de texto livre.
- Aplica validações determinísticas (schemas, limites, regras de compliance) antes de aceitar qualquer resultado.
- Seleciona um modo de degradação quando a confiança é insuficiente (fallback determinístico, resposta padrão, escalonamento humano).

**Falhas comuns (anti-invariantes) que a fachada deve bloquear**

- Permitir que texto livre se converta diretamente em ação (“faça um reembolso”, “cancele um contrato”) sem checagem.
- Confiar em “score de confiança” do modelo como única base de decisão.
- Misturar prompt/roteamento com regras do domínio, reduzindo testabilidade e criando regressões silenciosas.

Em resumo, a Fachada Determinística é um padrão de arquitetura híbrida para **manter previsibilidade na borda** e permitir que a IA exista “por trás do contrato”, sob governança.

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

## 1.5 Considerações de Implementação

### 1.5.1 Escolha de Tecnologias

**Para Componentes Determinísticos:**
- Priorize implementações com contratos claros (tipos, interfaces, invariantes) e boa testabilidade.
- Adote análise estática e testes automatizados como “linha de base” de verificação.
- Para dados críticos, prefira persistência com garantias de integridade e mecanismos auditáveis.

**Para Componentes de IA:**
- Isole dependências de modelo por trás de adaptadores (para troca e versionamento).
- Padronize validação de entrada/saída e limites operacionais (timeouts, quotas, circuit breakers).
- Use retrieval (RAG) e cache apenas quando houver requisitos explícitos de atualidade, custo e rastreabilidade.

### 1.5.2 Anti-Padrões

| Anti-Padrão | Descrição | Consequência |
|-------------|-----------|--------------|
| IA em Loop Crítico | Componente de IA em caminho de execução síncrono crítico | Latência imprevisível, falhas em cascata |
| Mistura de Domínios | Lógica de negócio misturada com prompts de IA | Difícil de testar, comportamento instável |
| Falta de Fallback | Componente de IA sem alternativa determinística | Indisponibilidade total em falhas |
| Prompts como Código | Prompts complexos sem versionamento | Não-reprodutibilidade |

## 1.6 Exercícios

1. Analise um sistema que você conhece e classifique seus componentes entre determinísticos e estocásticos. Justifique cada classificação.

2. Desenhe uma arquitetura híbrida para um sistema de processamento de reembolsos corporativos, identificando quais componentes devem ser determinísticos e quais podem utilizar IA.

3. Implemente um `BoundaryAdapter` que intermedie entre um componente de classificação de sentimentos baseado em IA e um sistema de atendimento ao cliente.

---

## Practical Considerations

- Delimite “core determinístico” e “zona estocástica”: o que é crítico (segurança, compliance, finanças) permanece verificável de forma determinística.
- Trate a fronteira como produto: contratos tipados, validação de saída e fallback são parte do design arquitetural.
- Planeje observabilidade e auditoria desde o início (inputs, outputs, versões, decisões e gatilhos de fallback).

## Summary

- Arquitetura híbrida integra componentes determinísticos e estocásticos com fronteiras e governança explícitas.
- Princípios-chave: separação de domínios, contenção em profundidade e transparência graduada.
- Anti-padrões recorrentes incluem IA em caminhos críticos síncronos, falta de fallback e mistura de lógica com prompts.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. KRISHNAN, N. AI Agents: Evolution, Architecture, and Real-World Applications. arXiv:2503.12687, 2025. Disponível em: https://arxiv.org/abs/2503.12687

3. DE BOER, M. et al. Design Patterns for Large Language Model Based Neuro-Symbolic Systems. Neurosymbolic Artificial Intelligence, Vol. 1, pp. 1-20, 2025. DOI: 10.1177/29498732251377499

4. AWS. Agentic AI patterns and workflows on AWS. AWS Prescriptive Guidance, 2025. Disponível em: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/

5. GOOGLE CLOUD. Choose a design pattern for your agentic AI system. Cloud Architecture Center, 2025. Disponível em: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

6. MICROSOFT AZURE. AI Agent Orchestration Patterns. Azure Architecture Center, 2025. Disponível em: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns

7. ANDRENACCI, G. 18 Artificial Intelligence LLM Trends in 2025. Medium, 2025. Disponível em: https://medium.com/data-bistrot/15-artificial-intelligence-llm-trends-in-2024-618a058c9fdf

8. NYGARD, M. Release It!: Design and Deploy Production-Ready Software. Pragmatic Bookshelf, 2007.

*SWEBOK-AI v5.0 - Software Architecture*

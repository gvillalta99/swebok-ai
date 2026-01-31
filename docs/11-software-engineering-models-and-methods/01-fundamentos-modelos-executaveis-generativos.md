---
title: "11.1 - Fundamentos de Modelos Executáveis e Generativos"
created_at: "2025-01-31"
tags: ["modelos", "modelos-executaveis", "modelos-generativos", "mdd", "engenharia-de-software", "llm"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 1. Fundamentos de Modelos Executáveis e Generativos

## Overview

Esta seção estabelece os fundamentos teóricos e práticos dos modelos de software na era dos Large Language Models (LLMs). Enquanto o SWEBOK v4.0 tratava modelos principalmente como representações abstratas para comunicação entre stakeholders, o SWEBOK-AI v5.0 reconhece que **modelos tornaram-se especificações executáveis que geram sistemas funcionais através de IA**.

A transição de modelos descritivos para modelos generativos representa uma mudança de paradigma fundamental: a fronteira entre modelagem e implementação dissolve-se em ciclos de refinamento contínuo onde especificações em linguagem natural funcionam simultaneamente como requisitos e prompts de geração.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Explicar a evolução histórica dos modelos de software: descritivos → prescritivos → executáveis → generativos
2. Distinguir entre modelos como representações e modelos como especificações executáveis
3. Compreender como modelos estruturados funcionam como prompts efetivos para LLMs
4. Avaliar trade-offs entre abstração e controle na geração assistida por IA
5. Aplicar padrões de modelagem que maximizam a qualidade do código gerado

## 1.1 A Evolução dos Modelos de Software

### 1.1.1 Das Representações à Execução

A história da modelagem de software pode ser compreendida através de quatro eras distintas:

```
Era 1: Modelos Descritivos (1960s-1980s)
├── Propósito: Documentação e comunicação
├── Notações: Fluxogramas, diagramas de estrutura
└── Relação com código: Separada e manual

Era 2: Modelos Prescritivos (1980s-2000s)
├── Propósito: Diretrizes de implementação
├── Notações: UML, ERD, diagramas de classe
└── Relação com código: Mapeamento manual

Era 3: Modelos Executáveis (2000s-2020s)
├── Propósito: Geração automática de código
├── Notações: UML executável, MDA, DSLs
└── Relação com código: Transformação automatizada

Era 4: Modelos Generativos (2020s-presente)
├── Propósito: Especificação como geração
├── Notações: Linguagem natural estruturada, contextos
└── Relação com código: Geração direta via LLM
```

**LEGADO:** Modelos puramente descritivos que não possuem caminho para implementação tornaram-se obsoletos na era dos LLMs. A documentação que não gera valor executável representa overhead sem retorno correspondente.

### 1.1.2 O Paradigma dos Modelos Generativos

No paradigma generativo, um modelo não apenas descreve o sistema—ele **é** o sistema em potencial. Pesquisas recentes demonstram que a integração de LLMs em Model-Driven Development (MDD) representa um avanço significativo na automação da geração de código [1][2].

**Características dos Modelos Generativos:**

| Característica | Modelo Tradicional | Modelo Generativo |
|----------------|-------------------|-------------------|
| **Semântica** | Representação abstrata | Especificação executável |
| **Relação com código** | Mapeamento manual | Geração direta |
| **Iteração** | Sincronização custosa | Refinamento contínuo |
| **Manutenção** | Duplicação de esforço | Fonte única da verdade |
| **Stakeholders** | Técnicos especializados | Ampliado via linguagem natural |

Estudos demonstram que LLMs podem gerar código Dart/Flutter a partir de diagramas de classe UML e restrições OCL com precisão significativa, automatizando scaffolding repetitivo e mantendo consistência estrutural com código escrito por humanos [3]. No entanto, desafios permanecem em verificar correção, otimizar performance e melhorar abstração modular.

## 1.2 Modelos como Prompts Estruturados

### 1.2.1 A Convergência entre Modelagem e Prompt Engineering

Na era dos LLMs, a distinção entre criar um modelo e escrever um prompt torna-se cada vez mais tênue. Ambos servem ao mesmo propósito: comunicar intenção de forma estruturada para geração de código.

**Princípios de Modelagem para Geração Efetiva:**

1. **Clareza de Intenção**: O modelo deve expressar não apenas o "o quê", mas o "porquê" das decisões de design
2. **Contexto Abrangente**: Incluir constraints, non-functional requirements e pressupostos explícitos
3. **Granularidade Adequada**: Nível de detalhe suficiente para geração sem ambiguidade crítica
4. **Rastreabilidade**: Capacidade de mapear elementos do modelo para código gerado

### 1.2.2 Estruturas de Modelo que Maximizam Geração

Pesquisas indicam que modelos organizados hierarquicamente com contexto arquitetural preservado produzem melhores resultados em geração de código [4]. A framework CodeWiki demonstra que a combinação de decomposição hierárquica top-down com sistemas de agentes divide-and-conquer preserva contexto arquitetural e escala a geração de documentação.

**Template de Modelo para Geração:**

```markdown
## Contexto Arquitetural
- Padrão arquitetural: [ex: Clean Architecture, Hexagonal]
- Stack tecnológica: [linguagens, frameworks]
- Constraints críticas: [performance, segurança, compliance]

## Modelo de Domínio
- Entidades principais e relacionamentos
- Invariantes de negócio
- Regras de validação

## Comportamento Esperado
- Fluxos principais (happy path)
- Cenários de erro e tratamento
- Estados e transições

## Interfaces e Integrações
- APIs externas
- Contratos de serviço
- Formatos de dados

## Critérios de Qualidade
- Métricas de performance
- Níveis de cobertura de teste
- Padrões de código obrigatórios
```

## 1.3 Especificação Executável: Quando a Descrição é o Código

### 1.3.1 O Conceito de Especificação Executável

Uma especificação executável é uma descrição formal do comportamento do software que pode ser automaticamente transformada em implementação funcional. Na era dos LLMs, essa transformação ocorre através de prompts que capturam a semântica completa da especificação.

**Exemplo de Especificação Executável:**

```markdown
## User Story Executável
Como um cliente do e-commerce,
Quero aplicar um cupom de desconto no checkout,
Para que eu possa obter o preço reduzido.

### Critérios de Aceitação (Gherkin)
Dado que o cliente tem um carrinho com valor total de R$ 200
E o cupom "DESCONTO20" oferece 20% de desconto
Quando o cliente aplicar o cupom
Então o valor final deve ser R$ 160
E o cupom deve ser marcado como utilizado

### Constraints
- Cupons expirados não devem ser aceitos
- Cupons já utilizados não devem ser aceitos
- Desconto máximo de R$ 100 por transação
```

Estudos da ThoughtWorks demonstram que critérios de aceitação em formato Gherkin podem gerar casos de teste automaticamente com alta precisão [5].

### 1.3.2 Vantagens e Limitações

**Vantagens:**
- Redução drástica no tempo de implementação inicial
- Alinhamento automático entre especificação e código
- Facilitação de manutenção através de fonte única

**Limitações:**
- Ambiguidade em especificações em linguagem natural pode ser 3x maior que em especificações estruturadas [6]
- Necessidade de verificação rigorosa do código gerado
- Dependência de contexto completo para geração adequada

## 1.4 Trade-offs: Abstração vs. Controle na Geração

### 1.4.1 O Espectro de Abstração

O engenheiro de software deve navegar um espectro contínuo entre abstração de alto nível (mais produtiva, menos controlável) e especificação detalhada (mais controlável, menos produtiva):

```
Alto Nível de Abstração
├── Entrada: "Crie um sistema de e-commerce"
├── Vantagem: Velocidade de prototipagem
├── Desvantagem: Alto risco de alucinações
└── Verificação: Crítica e extensiva

Nível Médio de Abstração
├── Entrada: Modelo de domínio + User Stories
├── Vantagem: Balanceamento produtividade/controle
├── Desvantagem: Requer expertise em modelagem
└── Verificação: Moderada

Baixo Nível de Abstração
├── Entrada: Pseudocódigo detalhado
├── Vantagem: Alto controle sobre implementação
├── Desvantagem: Overhead similar à codificação manual
└── Verificação: Focada em otimizações
```

### 1.4.2 Estratégias de Balanceamento

A escolha do nível de abstração adequado depende de múltiplos fatores:

| Fator | Alta Abstração | Baixa Abstração |
|-------|---------------|-----------------|
| **Complexidade do domínio** | Baixa a média | Alta |
| **Criticalidade do sistema** | Baixa | Alta |
| **Equipe experiente em modelagem** | Sim | Não necessário |
| **Ciclo de feedback** | Rápido | Controlado |
| **Governança e compliance** | Flexível | Rigorosa |

## 1.5 Padrões de Modelagem para Geração Efetiva

### 1.5.1 Padrões de Contexto

**Contexto Rico (Rich Context Pattern):**
Fornece informação abrangente sobre domínio, constraints e decisões arquiteturais antes da solicitação de geração.

```markdown
# Contexto do Sistema de Pagamentos

## Domínio
Sistema de processamento de pagamentos para e-commerce B2C
Volume: 10.000 transações/dia
Valor médio: R$ 150

## Constraints Regulatórias
- PCI DSS nível 1
- LGPD para dados de clientes
- Retenção de logs por 5 anos

## Decisões Arquiteturais
- ADR-001: Uso de arquitetura hexagonal
- ADR-002: Processamento assíncrono de pagamentos
- ADR-003: Idempotência obrigatória em todas as operações

## Modelo de Domínio
[Diagrama ou descrição das entidades principais]
```

**Contexto Incremental (Incremental Context Pattern):**
Constrói o modelo em camadas, verificando e refinando a cada iteração.

### 1.5.2 Padrões de Especificação

**Especificação por Contrato (Contract-First Pattern):**
Define interfaces e contratos antes da implementação, garantindo interoperabilidade.

**Especificação por Exemplo (Specification by Example):**
Utiliza exemplos concretos para ilustrar comportamento esperado, reduzindo ambiguidade.

## Practical Considerations

### Aplicações Reais

1. **Prototipagem Rápida**: Modelos de alto nível permitem validar conceitos em horas, não semanas
2. **Modernização de Sistemas Legados**: Extração automática de modelos de código legado para regeneração
3. **Desenvolvimento Low-Code**: Plataformas que geram código a partir de modelos visuais

### Limitações e Riscos

1. **Overfitting a Padrões**: LLMs podem gerar código que segue padrões comuns mas não ótimos para o caso específico
2. **Dívida Técnica Invisível**: Código gerado pode acumular complexidade não evidente na especificação
3. **Dependência de Contexto**: Mudanças no contexto podem invalidar modelos previamente efetivos

### Melhores Práticas

1. **Sempre verifique o código gerado** antes de integrar ao codebase
2. **Mantenha um registro de decisões** (ADRs) para contextualizar modelos
3. **Estabeleça gates de qualidade** automáticos para código gerado
4. **Documente limitações conhecidas** dos modelos utilizados
5. **Invista em modelagem de domínio** como habilidade central

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Média — modelagem evolui, mas abstração e design thinking permanecem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto — modelos gerados precisam de validação rigorosa |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta — arquitetos e modeladores mantêm accountability por decisões de design |

## Summary

- Modelos de software evoluíram de representações descritivas para especificações executáveis que geram código via IA
- A fronteira entre modelagem e implementação dissolve-se em ciclos de refinamento contínuo
- Modelos bem estruturados funcionam como prompts efetivos para LLMs
- O engenheiro deve balancear abstração e controle conforme a criticidade do sistema
- Padrões de contexto rico e especificação por contrato maximizam a qualidade da geração

## References

1. Di Rocco, J., et al. "On the use of Large Language Models in Model-Driven Engineering." Software and Systems Modeling, Springer, 2025. DOI: 10.1007/s10270-025-01263-8

2. Sadik, A.R., Brulin, S., Olhofer, M. "LLM as a code generator in Agile Model Driven Development." arXiv:2410.18489, 2024.

3. Cheon, Y. "LLMs as Code Generators for Model-Driven Development." SciTePress, 2025.

4. Hoang Anh, N., et al. "CodeWiki: Evaluating AI's Ability to Generate Holistic Documentation for Large-Scale Codebases." arXiv:2510.24428, 2026.

5. ThoughtWorks. "AI-generated test cases from user stories: An experimental research study." ThoughtWorks Insights, 2025.

6. Wei, B. "Requirements are All You Need: From Requirements to Code with LLMs." arXiv:2406.10101, 2024.

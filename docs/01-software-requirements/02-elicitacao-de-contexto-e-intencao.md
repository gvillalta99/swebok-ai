---
title: "02 - Elicitação de Contexto e Intenção"
created_at: "2025-01-31"
tags: ["elicitacao", "contexto", "intencao", "stakeholders", "requisitos", "llm"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Elicitação de Contexto e Intenção

## Overview

A elicitação de contexto e intenção representa a evolução das técnicas tradicionais de elicitação de requisitos para a era dos LLMs. Enquanto a abordagem clássica focava em capturar funcionalidades desejadas, a elicitação moderna concentra-se em compreender o **contexto operacional** e a **intenção subjacente** que devem guiar o comportamento de sistemas autônomos.

Esta seção apresenta técnicas avançadas para extrair não apenas o "o quê", mas o "porquê", "quando" e "sob quais condições" que definem as fronteiras de operação segura de sistemas com IA.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Distinguir entre elicitação de requisitos e elicitação de contexto
2. Aplicar técnicas modernas de extração de intenção em sistemas com IA
3. Identificar e mapear conhecimento tácito de especialistas de domínio
4. Estruturar contexto para maximizar a eficácia de LLMs
5. Avaliar a qualidade e completude do contexto elicitado

## 2.1 Do Requisito ao Contexto: Uma Nova Abordagem

### Limitações da Elicitação Tradicional

A elicitação tradicional de requisitos, conforme descrita no SWEBOK v4.0 [1], enfrenta desafios fundamentais no contexto de sistemas com IA:

- **Incompletude Estrutural**: Stakeholders não conseguem antecipar todos os cenários de uso
- **Ambiguidade Semântica**: Linguagem natural é insuficiente para capturar nuances de contexto
- **Conhecimento Tácito**: Expertise crítica reside em práticas não documentadas
- **Evolução Rápida**: Requisitos mudam mais rapidamente que a capacidade de documentação

### O Que É Contexto em Sistemas com IA

No SWEBOK-AI v5.0, **contexto** é definido como:

> O conjunto de informações, restrições, regras de negócio, conhecimento de domínio e condições operacionais que definem o espaço de comportamento válido e seguro para um sistema que incorpora componentes de IA.

O contexto inclui:

- **Contexto de Domínio**: Conhecimento específico da área de aplicação
- **Contexto Operacional**: Condições e restrições de execução
- **Contexto Organizacional**: Políticas, processos e cultura
- **Contexto Regulatório**: Leis, normas e compliance
- **Contexto Técnico**: Arquitetura, integrações e limitações tecnológicas

### A Pirâmide do Contexto

```
                    ┌─────────────────┐
                    │   INTENÇÃO      │ ← Por que o sistema existe?
                    │   ESTRATÉGICA   │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │      REGRAS DE NEGÓCIO      │ ← O que deve/pode fazer?
              │        E POLÍTICAS          │
              └──────────────┬──────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │         RESTRIÇÕES OPERACIONAIS         │ ← Como deve operar?
        │        E COMPORTAMENTAIS                │
        └────────────────────┬────────────────────┘
                             │
  ┌──────────────────────────┴──────────────────────────┐
  │              DADOS E CONHECIMENTO DE DOMÍNIO        │ ← Com base em quê?
  │                   (Contexto Técnico)                │
  └─────────────────────────────────────────────────────┘
```

## Técnicas de Elicitação de Contexto

### Elicitacao por Prompt Engineering

O **Prompt Engineering** tornou-se uma técnica fundamental de elicitação. Diferente de entrevistas tradicionais, utiliza interações estruturadas com LLMs para:

- **Exploração de Domínio**: Gerar questões que especialistas podem não ter considerado
- **Identificação de Casos Limite**: Descobrir cenários extremos e edge cases
- **Refinamento de Conceitos**: Iterar sobre definições até alcançar precisão
- **Validação de Compreensão**: Verificar se o contexto foi corretamente interpretado

**Padrão de Prompt para Elicitação**:

```
Você é um especialista em [DOMÍNIO]. Estou desenvolvendo um sistema 
que [OBJETIVO]. Para garantir que o sistema opere de forma segura 
e eficaz, preciso compreender:

1. Quais são as regras fundamentais que nunca devem ser violadas?
2. Quais situações requerem intervenção humana obrigatória?
3. Quais são os casos limite ou ambíguos neste domínio?
4. Que tipo de erros são inaceitáveis vs. toleráveis?
5. Quais decisões exigem rastreabilidade e auditoria?

Forneça exemplos concretos para cada ponto.
```

### Mapeamento de Conhecimento Tacito

O conhecimento tácito — expertise que especialistas possuem mas não conseguem articular facilmente — é crítico para sistemas com IA. Técnicas incluem:

**Protocol Analysis**:
- Especialistas verbalizam seu raciocínio enquanto resolvem problemas
- opcionalmente, ferramentas (incluindo LLMs) podem ajudar a sintetizar transcricoes; o resultado precisa de revisao humana
- Identificação de heurísticas e regras implícitas

**Shadowing**:
- Observação de especialistas em seu ambiente de trabalho natural
- Captura de decisões micro e contextos sutis
- Documentação de "intuição" em regras explícitas

**Apprenticing**:
- Engenheiro aprende a executar tarefas do domínio
- Exposição direta à complexidade e nuances
- Identificação de gaps entre teoria e prática

### Elicitacao Baseada em Cenarios

Cenários são narrativas que descrevem interações entre usuários e sistema. Na era dos LLMs, evoluíram para:

**Cenários de Sucesso**:
- Descrevem operação ideal
- Definem expectativas de comportamento
- Servem como exemplos de treinamento

**Cenários de Falha**:
- Documentam comportamentos indesejados
- Especificam respostas esperadas a erros
- Definem limites de degradação

**Cenários de Stress**:
- Testam limites do sistema
- Identificam pontos de ruptura
- Especificam comportamentos de fallback

Exemplo de estrutura de cenário:

```yaml
Cenário: Processamento de Solicitação de Empréstimo
Contexto: Cliente solicita empréstimo pessoal via chatbot

Fluxo Normal:
  - Cliente fornece informações básicas
  - Sistema consulta histórico de crédito
  - Sistema calcula score de risco
  - Sistema apresenta oferta preliminar

Restrições:
  - Valor máximo sem análise humana: R$ 10.000
  - Tempo máximo de resposta: 30 segundos
  - Dados PII devem ser mascarados em logs

Casos Limite:
  - Cliente sem histórico de crédito
  - Score de risco na fronteira entre aprovação/rejeição
  - Sistema de crédito externo indisponível

Fallback:
  - Acima de R$ 10.000: encaminhar para analista humano
  - Timeout: oferecer callback em até 2h
  - Indisponibilidade: modo offline com cache
```

## Fontes de Contexto

### 2.3.1 Stakeholders e Suas Perspectivas

A análise de stakeholders continua essencial, mas com foco expandido:

| Classe de Stakeholder | Contexto Específico | Técnica de Elicitação |
|----------------------|---------------------|----------------------|
| **Usuários Finais** | Necessidades, frustrações, workflows | Entrevistas, observação, journey mapping |
| **Especialistas de Domínio** | Regras de negócio, casos limite, exceções | Protocol analysis, apprenticing |
| **Equipe de Compliance** | Requisitos regulatórios, políticas internas | Workshops, análise documental |
| **Equipe de Segurança** | Ameaças, controles, vulnerabilidades | Threat modeling, análise de risco |
| **Equipe de Operações** | Limites operacionais, métricas de saúde | SRE interviews, análise de incidentes |
| **Desenvolvedores** | Restrições técnicas, dívidas técnicas | Code archaeology, análise de arquitetura |

### 2.3.2 Documentação e Sistemas Existentes

**Documentação Legada**:
- Manuais de usuário (definem comportamento esperado)
- Documentação técnica (revela restrições arquiteturais)
- Regulamentos e normas (definem compliance)
- Histórico de incidentes (identificam falhas passadas)

**Sistemas Legados**:
- Interfaces de integração (definem contratos)
- Bancos de dados (revelam modelo de domínio)
- Logs e métricas (mostram padrões de uso)
- Código fonte (contém regras de negócio implícitas)

### 2.3.3 Dados como Fonte de Contexto

Em sistemas com IA, os próprios dados tornam-se fonte de contexto:

**Análise de Dados Históricos**:
- Padrões de comportamento do usuário
- Distribuição de casos e exceções
- Frequência de diferentes tipos de solicitações

**Data Quality Assessment**:
- Completude e consistência dos dados
- Viés nos dados de treinamento
- Representatividade das amostras

## Captura da Intencao

### 2.4.1 Intenção vs. Requisito

Enquanto um **requisito** especifica o que o sistema deve fazer, a **intenção** captura:

- **Propósito Estratégico**: Por que esta funcionalidade existe?
- **Objetivo de Negócio**: Que valor deve entregar?
- **Restrições Implícitas**: O que está subentendido mas não dito?
- **Preferências de Trade-off**: O que é mais importante quando há conflito?

### 2.4.2 Técnicas de Captura de Intenção

**As 5 Intenções (Adaptação das 5 Whys)**:

1. **Por que esta funcionalidade é necessária?**
2. **Por que é importante para o negócio?**
3. **Por que os usuários se beneficiarão?**
4. **Por que não pode ser feito de outra forma?**
5. **Por que estas restrições específicas?**

**Story Mapping com Foco em Intenção**:
- Mapeia não apenas funcionalidades, mas objetivos de usuário
- Identifica dependências entre intenções
- Revela gaps na compreensão do domínio

### 2.4.3 Documentação da Intenção

A intenção deve ser documentada explicitamente:

```markdown
## Intenção: [Nome da Intenção]

**Propósito**: [Descrição clara do objetivo estratégico]

**Stakeholders Primários**: [Quem se beneficia]

**Contexto de Uso**: [Quando e onde se aplica]

**Restrições Implícitas**:
- [Restrição 1]
- [Restrição 2]

**Preferências de Trade-off**:
- [Preferência 1] > [Preferência 2]

**Critérios de Sucesso**:
- [Critério mensurável 1]
- [Critério mensurável 2]

**Riscos se Mal Implementada**:
- [Risco 1]
- [Risco 2]
```

## Validacao do Contexto Elicitado

### 2.5.1 Critérios de Qualidade

O contexto elicitado deve ser:

- **Completo**: Cobre todos os cenários relevantes
- **Consistente**: Não contém contradições internas
- **Preciso**: Define fronteiras claras
- **Verificável**: Pode ser testado ou auditado
- **Rastreável**: Liga-se a fontes e stakeholders
- **Atualizável**: Pode evoluir com o sistema

### 2.5.2 Técnicas de Validação

**Review por Especialistas**:
- Especialistas de domínio revisam contexto elicitado
- Identificam omissões e imprecisões
- Validam representatividade

**Prototipação Exploratória**:
- Criação rápida de protótipos com LLMs
- Teste de cenários com contexto parcial
- Identificação de gaps através de comportamento inesperado

**Simulação de Casos**:
- Execução de cenários de teste
- Verificação de comportamento em casos limite
- Validação de estratégias de fallback

## Practical Considerations

### Desafios na Elicitação de Contexto

1. **Resistência de Stakeholders**: Especialistas podem não ver valor em documentar "óbvio"
2. **Contexto em Constante Mudança**: Domínios dinâmicos exigem elicitação contínua
3. **Sobrecarga de Informação**: Muito contexto pode ser tão prejudicial quanto pouco
4. **Conflitos de Perspectiva**: Diferentes stakeholders podem ter visões conflitantes

### Melhores Práticas

- **Comece Amplo, Refine**: Inicie com contexto amplo e refine iterativamente
- **Documente Raciocínio**: Capture não apenas decisões, mas o porquê delas
- **Versione o Contexto**: Mantenha histórico de evolução do entendimento
- **Valide Frequentemente**: Reavalie contexto em cada iteração
- **Automatize quando Possível**: Use LLMs para sintetizar e organizar contexto

### Ferramentas e Tecnologias

- **RAG (Retrieval-Augmented Generation)**: Para enriquecer contexto com conhecimento externo
- **Vector Databases**: Para armazenar e recuperar contexto semântico
- **Knowledge Graphs**: Para modelar relações complexas no contexto
- **LLM-based Elicitation Assistants**: Para auxiliar na descoberta de contexto

## Summary

- A elicitação de contexto vai além da elicitação tradicional de requisitos
- Contexto inclui domínio, operacional, organizacional, regulatório e técnico
- Técnicas modernas incluem prompt engineering, mapeamento de conhecimento tácito e cenários
- A captura da intenção é tão importante quanto a captura de requisitos
- Validação contínua é essencial para manter contexto relevante
- O contexto é um ativo vivo que evolui com o sistema

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** - Elicitação de contexto é fundamental e crescentemente importante |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Médio** - Requer validação humana, mas ferramentas de IA podem auxiliar |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítico** - Contexto inadequado leva a falhas sistêmicas |

## References

1. IEEE COMPUTER SOCIETY. Guide to the Software Engineering Body of Knowledge (SWEBOK), Version 4.0. 2024.
2. Research directions for using LLM in software requirement engineering. Frontiers in Computer Science, 2025.
3. Formalising Software Requirements with Large Language Models. arXiv, 2025. Disponivel em: https://arxiv.org/abs/2506.10704
4. ERICSSON, K. A.; SIMON, H. A. Protocol Analysis: Verbal Reports as Data. Cambridge, MA: MIT Press, 1993.

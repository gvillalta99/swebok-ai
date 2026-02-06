---
title: Documentação Arquitetural para Sistemas Opacos
created_at: '2025-05-21'
tags: [documentacao, adrs, model-cards, arquitetura, swebok-ai]
status: in-progress
updated_at: '2025-05-21'
ai_model: claude-3.5-sonnet
---

# 7. Documentação Arquitetural para Sistemas Opacos

## Overview

A documentação de software tradicional (diagramas UML, Swagger) foca em
estrutura e interfaces determinísticas. Em sistemas com IA, a complexidade
reside no comportamento emergente e nos dados. Documentar um sistema híbrido
exige explicar não apenas como os componentes se conectam, mas *por que* certas
escolhas de modelo foram feitas, quais dados alimentam o sistema e quais são as
limitações conhecidas de segurança e viés.

Esta seção adapta práticas de documentação para capturar a natureza opaca e
experimental dos componentes de IA.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Criar** *System Cards* que explicam o propósito e limites do sistema para
   stakeholders não técnicos.
2. **Registrar** decisões de design de IA (AI-ADRs) para justificar escolha de
   modelos e estratégias de RAG.
3. **Documentar** a linhagem de dados e prompts como ativos de software.

## 7.1 System Cards e Model Cards

Enquanto *Model Cards* descrevem o modelo técnico (ex: GPT-4), *System Cards*
descrevem o produto construído sobre ele.

### Estrutura de um System Card

- **Intenção de Uso**: Para que o sistema serve (e para que NÃO serve).
- **Limitações Conhecidas**: "O sistema pode alucinar em tópicos médicos", "O
  conhecimento corta em 2023".
- **Métricas de Performance**: Taxa de acerto em testes de benchmark internos.
- **Considerações Éticas**: Riscos de viés identificados e mitigados.

## 7.2 AI-ADRs (Artificial Intelligence Architecture Decision Records)

Decisões em projetos de IA são frequentemente baseadas em experimentação
empírica ("O modelo X funcionou melhor que o Y"). Isso deve ser formalizado.

### Template de AI-ADR

- **Contexto**: Precisávamos resumir textos jurídicos de 50 páginas.
- **Opções Avaliadas**: GPT-3.5 (falhou na janela), Claude 2 (bom, mas lento),
  GPT-4-Turbo (escolhido).
- **Decisão**: Usar GPT-4-Turbo com *map-reduce* para documentos longos.
- **Consequências**: Custo mais alto por documento, latência de 30s aceita pelo
  negócio.

## 7.3 Documentando Fluxos Cognitivos

Diagramas de sequência tradicionais falham em capturar a lógica de agentes.

### Diagramas de Fluxo de Prompt

- Visualizar a cadeia de prompts: Prompt A (Classificação) -> Decisão (Lógica)
  -> Prompt B (Extração) ou Prompt C (Resposta Padrão).
- Mapear onde o "Humano no Loop" entra.
- Explicar a estratégia de recuperação de contexto (RAG) em cada passo.

## Practical Considerations

### Documentação Viva

Prompts mudam mais rápido que código. A documentação dos prompts deve,
idealmente, estar junto ao código ou no próprio *Prompt Registry*, gerada
automaticamente onde possível.

### Linhagem de Dados (Data Lineage)

Para sistemas RAG, documente a origem dos dados: "O bot de RH responde com base
nos PDFs da pasta X do SharePoint, atualizados semanalmente". Sem isso, é
impossível depurar respostas desatualizadas.

## Summary

- Documentação de IA deve focar em comportamento, dados e limitações, não apenas
  em APIs.
- System Cards são essenciais para transparência com usuários finais.
- Registrar o "porquê" das escolhas de modelos (ADRs) evita retrabalho em
  experimentos futuros.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                     |
| ------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Transparência e governança são requisitos perenes.                                                                 |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Baixo**. Documentação é um esforço humano de baixo custo técnico, mas alto valor organizacional.                            |
| **Responsabilidade Legal**      | Quem responde pelo erro?              | **Alta**. System Cards funcionam como "bulas" ou contratos de nível de serviço (SLA) implícitos sobre a segurança do sistema. |

## References

1. **Mitchell, M., et al.** (2019). *Model Cards for Model Reporting*. FAT\*
   '19.
2. **Google**. (2023). *PaLM 2 System Card*. Google AI.
3. **Meta**. (2023). *Llama 2: Open Foundation and Chat Models* (Seção de System
   Card).
4. **Gebru, T., et al.** (2021). *Datasheets for Datasets*. CACM.

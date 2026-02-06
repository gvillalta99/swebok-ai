---
title: Documentação Arquitetural para Sistemas Opacos
created_at: '2025-05-21'
tags: [documentacao, adrs, model-cards, arquitetura, swebok-ai]
status: in-progress
updated_at: '2026-02-06'
ai_model: claude-3.5-sonnet
---

# 7. Documentação Arquitetural para Sistemas Opacos

## Visão Geral

A documentação de software tradicional (diagramas UML, Swagger) foca em
estrutura e interfaces determinísticas. Em sistemas com IA, a complexidade
reside no comportamento emergente e nos dados. Documentar um sistema híbrido
exige explicar não apenas como os componentes se conectam, mas *por que* certas
escolhas de modelo foram feitas, quais dados alimentam o sistema e quais são as
limitações conhecidas de segurança e viés.

Esta seção adapta práticas de documentação para capturar a natureza opaca e
experimental dos componentes de IA.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Criar** *System Cards* que explicam o propósito e limites do sistema para
   stakeholders não técnicos.
2. **Registrar** decisões de design de IA (AI-ADRs) para justificar escolha de
   modelos e estratégias de RAG.
3. **Documentar** a linhagem de dados e prompts como ativos de software.

## 7.1 System Cards e Model Cards

Enquanto *Model Cards* documentam características e limites de um modelo
específico, *System Cards* documentam o comportamento do sistema completo em
produção (modelo, prompts, dados, políticas e mecanismos de controle). Em
sistemas com IA, ambos são complementares e devem ser versionados.

### Estrutura de um System Card

- **Escopo e Intenção de Uso**: Finalidade, público-alvo e usos proibidos.
- **Arquitetura Operacional**: Modelo(s), cadeia de prompts, fontes de contexto
  e guardrails.
- **Limitações e Modos de Falha**: Cenários de erro, incerteza e alucinação
  conhecidos.
- **Métricas e Evidências**: Métricas offline/online, critérios de aceitação e
  cobertura de avaliação.
- **Riscos e Mitigações**: Viés, segurança, privacidade, abuso e controles
  implementados.
- **Governança e Versionamento**: Versão, responsável técnico, data de revisão e
  política de atualização.

## 7.2 AI-ADRs (Artificial Intelligence Architecture Decision Records)

Decisões em projetos de IA são frequentemente baseadas em experimentação
empírica ("O modelo X funcionou melhor que o Y"). Isso deve ser formalizado.

### Template de AI-ADR

- **Contexto**: Problema, restrições (latência, custo, compliance) e critérios
  de sucesso.
- **Opções Avaliadas**: Alternativas com versão exata (modelo, embedding,
  estratégia de recuperação).
- **Evidências**: Resultados comparativos (qualidade, custo, latência, risco).
- **Decisão**: Opção escolhida, justificativa e escopo de aplicação.
- **Consequências**: Impactos esperados, trade-offs e plano de rollback.
- **Data de Revalidação**: Gatilhos para revisão (drift, incidente, mudança
  regulatória).

## 7.3 Documentando Fluxos Cognitivos

Diagramas de sequência tradicionais falham em capturar a lógica de agentes.

### Diagramas de Fluxo de Prompt

- Visualizar a cadeia de prompts: Prompt A (Classificação) -> Decisão (Lógica)
  -> Prompt B (Extração) ou Prompt C (Resposta Padrão).
- Mapear onde o "Humano no Loop" entra.
- Explicar a estratégia de recuperação de contexto (RAG) em cada passo.

## Considerações Práticas

### Documentação Viva

Prompts mudam mais rápido que código. A documentação dos prompts deve,
idealmente, estar junto ao código ou no próprio *Prompt Registry*, gerada
automaticamente onde possível.

### Linhagem de Dados (Data Lineage)

Para sistemas RAG, documente a origem dos dados: "O bot de RH responde com base
nos PDFs da pasta X do SharePoint, atualizados semanalmente". Sem isso, é
impossível depurar respostas desatualizadas.

## Resumo

- Documentação de IA deve focar em comportamento, dados e limitações, não apenas
  em APIs.
- System Cards são essenciais para transparência com usuários finais.
- Registrar o "porquê" das escolhas de modelos (ADRs) evita retrabalho em
  experimentos futuros.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                               | Avaliação                                                                                                                     |
| ------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta prática será obsoleta em 36 meses? | **Baixa**. Transparência e governança são requisitos perenes.                                                                 |
| **Custo de Verificação**        | Quanto custa validar esta atividade?    | **Baixo**. Documentação é um esforço humano de baixo custo técnico, mas alto valor organizacional.                            |
| **Responsabilidade Legal**      | Quem responde pelo erro?                | **Alta**. System Cards funcionam como "bulas" ou contratos de nível de serviço (SLA) implícitos sobre a segurança do sistema. |

## Ver também

- [KA 01 - Engenharia de Restrições e Contexto](../01-software-requirements/index.md)
- [KA 03 - Design de Sistemas Híbridos](../03-software-design/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. **Mitchell, M., et al.** (2019). *Model Cards for Model Reporting*. FAT\*
   '19, pp. 220-229. DOI: 10.1145/3287560.3287596.
2. **Anil, R., et al.** (2023). *PaLM 2 Technical Report*. arXiv:2305.10403.
   DOI: 10.48550/arXiv.2305.10403.
3. **Touvron, H., et al.** (2023). *Llama 2: Open Foundation and Fine-Tuned Chat
   Models*. arXiv:2307.09288.
4. **Gebru, T., et al.** (2021). *Datasheets for Datasets*. Communications of
   the ACM, 64(12), 86-92. DOI: 10.1145/3458723.

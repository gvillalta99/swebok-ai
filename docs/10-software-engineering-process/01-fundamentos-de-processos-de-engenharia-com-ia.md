---
title: "01 - Fundamentos de Processos de Engenharia com IA"
created_at: "2025-01-31"
tags: ["processos", "engenharia-de-software", "ia", "fundamentos", "ciclo-de-vida", "hibrido"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 1. Fundamentos de Processos de Engenharia com IA

## Overview

Processos de engenharia com IA precisam explicitar um deslocamento: a geracao de artefatos (codigo, testes, documentacao) pode ser barata, mas a verificacao e a governanca continuam sendo o mecanismo que reduz risco. Um processo hibrido bem definido descreve onde a IA pode atuar, quais evidencias sao exigidas e em quais pontos a decisao humana e obrigatoria.

Esta secao define o “ciclo de vida” AI-first como orquestracao de especificacao, geracao, verificacao e curadoria, com gates proporcionais a criticidade.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Explicar por que o gargalo migra para verificacao e decisao.
2. Descrever um ciclo de vida hibrido com gates e evidencias.
3. Diferenciar atividades legadas, transformadas e novas.
4. Definir papeis e responsabilidades (incluindo curadoria).
5. Aplicar um modelo simples de maturidade orientado a evidencias.

## 1.1 O Processo Hibrido: Principios

Principios operacionais:

1. Geracao e infraestrutura: trate como capacidade abundante.
2. Verificacao e governanca sao restricoes: trate como capacidade finita.
3. Human-in-the-loop em pontos de irreversibilidade (seguranca, compliance, arquitetura).

## 1.2 Ciclo de Vida AI-first

Um ciclo de vida pratico:

1. Especificar: intencao, contratos, criterios de aceitacao.
2. Gerar: artefatos candidatos.
3. Verificar: sintatico, semantico e comportamental.
4. Curar: aprovacao humana quando aplicavel.
5. Integrar e monitorar: rollout, regressao e incidentes.

## 1.3 Papeis e Responsabilidades

Papéis tipicos (sem depender de nomenclatura organizacional):

- quem define intencao e prioridades,
- quem valida evidencias e qualidade,
- quem aprova mudancas de alto risco,
- quem garante rastreabilidade e auditoria.

## 1.4 Maturidade Orientada a Evidencias

| Nivel | Caracteristica | Evidencia |
|------|----------------|----------|
| Inicial | uso ad hoc | sem padrao de evidencias |
| Gerenciado | gates basicos | testes e reviews consistentes |
| Definido | contratos e manifests | rastreabilidade de baselines |
| Quantitativo | metricas de fluxo | backlog e tempo de verificacao |
| Otimizando | melhoria continua | reducao sustentada de retrabalho |

## Practical Considerations

### Anti-padroes

1. Acelerar geracao sem aumentar verificacao.
2. Centralizar curadoria em poucas pessoas.
3. Tratar mudanca de modelo/contexto como “mudanca menor”.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica |

## Summary

- Processos com IA precisam ser definidos por gates e evidencias, nao por volume de geracao.
- O ciclo de vida AI-first combina especificacao, verificacao e curadoria.
- Maturidade cresce quando rastreabilidade e metrica de verificacao se tornam rotina.

## References

1. ISO/IEC/IEEE. ISO/IEC/IEEE 12207:2017. Systems and software engineering — Software life cycle processes. Geneva: ISO, 2017.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 828:2012. Systems and software engineering — Configuration management. Geneva: ISO, 2012.
3. Farley, D. Modern Software Engineering: Doing What Works to Build Better Software Faster. Boston: Addison-Wesley, 2021.

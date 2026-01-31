---
title: "05 - Automatos e Maquinas de Estado para Modelagem de Comportamento"
created_at: "2026-01-31"
tags: ["fundamentos-matematicos", "automatos", "maquinas-de-estado", "protocolos", "model-checking", "agentes", "llm"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5. Automatos e Maquinas de Estado para Modelagem de Comportamento

## Overview

Maquinas de estado sao a forma mais direta de tornar comportamento observavel e verificavel. Em sistemas com LLMs e agentes, grande parte do risco nao esta no algoritmo interno do modelo, mas no orquestrador: estados, transicoes, retries, e integracoes com ferramentas e humanos.

Esta secao cobre automatos finitos e maquinas de estado como base para modelar protocolos, fluxos de aprovacao, circuit breakers e politicas de seguranca.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Modelar workflows e agentes como FSMs e maquinas de estado hierarquicas
2. Especificar propriedades de safety e liveness para esses modelos
3. Identificar estados absorventes, loops perigosos e condicoes de corrida
4. Integrar modelagem de estados com observabilidade (logs como traces)
5. Selecionar quando automatizar verificacao (model checking) versus revisao humana

## 5.1 FSMs como Modelo Operacional

Um orquestrador de agente tipico pode ser modelado por estados como:

- receber pedido
- recuperar contexto
- planejar
- executar ferramenta
- validar resultado
- responder
- escalar humano

As transicoes dependem de condicoes (autorizacao, confianca, limites). Esse modelo expõe pontos onde guardrails devem existir.

## 5.2 Estados, Invariantes e Circuit Breakers

Em sistemas com IA, circuit breakers sao frequentemente estados ou transicoes proibidas:

- "se o output contem PII -> ir para REDACT"
- "se tool falha N vezes -> ir para ESCALATE"

Especificar esses comportamentos como maquina de estados torna possivel validar a implementacao e auditar execucoes.

## 5.3 Maquinas de Estado + Logica Temporal

Quando combinadas com logica temporal, FSMs permitem expressar requisitos como:

- "nunca executar comando sem aprovacao" (safety)
- "eventualmente responder ou escalar" (liveness)

Essas propriedades sao checaveis por model checkers sob abstracoes adequadas.

## 5.4 Formal Methods Feedback para Modelos

Trabalhos recentes exploram usar feedback de metodos formais para ajustar ou avaliar modelos (por exemplo, gerar candidatos e verificar compliance). Isso reforca a separacao de papeis: o modelo sugere; a verificação decide.

## Practical Considerations

- Modele o "happy path" e os caminhos de falha; a maioria dos incidentes ocorre nas bordas.
- Defina estados terminal/absorvente e limites de retry; loops sem limite sao risco.
- Garanta observabilidade por estado: cada transicao deve registrar motivo e evidencias.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|---|---|---|
| Descartabilidade Geracional | FSMs permanecem como base de controle e auditoria. | Baixa |
| Custo de Verificacao | Medio: modelar e checar e viavel, mas exige disciplina e ferramentas. | Medio |
| Responsabilidade Legal | Falhas em protocolos (autorizacao/aprovacao) sao tipicamente criticas. | Critica |

## Summary

- Maquinas de estado tornam orquestracao de agentes verificavel.
- Circuit breakers e escalonamento humano devem estar no modelo, nao so em docs.
- Model checking complementa testes quando o risco esta em protocolos e estados.

## References

1. Hopcroft, J.; Motwani, R.; Ullman, J. Introduction to Automata Theory, Languages, and Computation. 3rd ed. Pearson, 2006.
2. Baier, C.; Katoen, J.-P. Principles of Model Checking. MIT Press, 2008.
3. ASE 2024. LLM Meets Bounded Model Checking: Neuro-symbolic Loop Invariant Inference. 2024. https://conf.researchr.org/details/ase-2024/ase-2024-research/33/LLM-Meets-Bounded-Model-Checking-Neuro-symbolic-Loop-Invariant-Inference
4. NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). July 2024. https://doi.org/10.6028/NIST.AI.600-1

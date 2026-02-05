---
title: 06 - Governanca e Compliance de Processos
created_at: '2025-01-31'
tags: [processos, governanca, compliance, auditoria, proveniencia, regulatorio, documentacao]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 6. Governanca e Compliance de Processos

## Overview

Em processos assistidos por IA, governanca significa garantir que (1) decisoes
sejam atribuiveis, (2) evidencias existam e sejam recuperaveis, e (3) mudancas
de alto risco sejam controladas. Isso exige rastreabilidade para baselines
(prompts/politicas, modelos, contexto) e auditoria de curadoria humana.

Esta secao descreve um modelo de governanca centrado em evidencias e trilha de
auditoria, aplicavel mesmo quando a regulacao varia por dominio.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir principios de governanca (accountability, rastreabilidade, controle
   de mudancas).
2. Especificar quais registros de processo sao obrigatorios.
3. Planejar auditorias focadas em evidencia e gaps.
4. Adaptar controles de compliance por criticidade e dominio.
5. Evitar anti-padroes (documentacao descartavel, responsabilidade difusa).

## 6.1 Principios de Governanca

1. Accountability: toda decisao critica tem responsavel identificavel.
2. Rastreabilidade: qualquer artefato em producao aponta para baseline e
   execucao (run_id).
3. Controle de mudancas: mudancas de modelo/contexto/politica seguem gates
   proporcionais.

## 6.2 Registros Obrigatorios (Modelo Minimo)

Registros que suportam auditoria:

- especificacao (intencao, criterios de aceitacao),
- baseline (prompt/politica, modelo, contexto),
- verificacoes (testes/validadores executados e resultados),
- curadoria (aprovacao/rejeicao e justificativa).

## 6.3 Auditoria

Uma auditoria util responde:

- o processo foi seguido?
- existem lacunas de rastreabilidade?
- gates foram aplicados conforme criticidade?
- evidencias sao suficientes para reproduzir e explicar decisoes?

## 6.4 Compliance (Capacidades)

Em vez de mapear toda regulacao possivel, trate compliance como capacidade:

- trilha de auditoria,
- segregacao de funcoes quando exigido,
- retencao proporcional,
- governanca de mudanca.

## Practical Considerations

### Checklist

1. Exija run_id e baseline para qualquer artefato promovido.
2. Defina gates por criticidade e documente excecoes.
3. Retenha evidencias pelo periodo necessario (risco e auditoria).
4. Audite amostras periodicamente e corrija gaps.

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto      |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica   |

## Summary

- Governanca em processos com IA e governanca por evidencias e rastreabilidade.
- Mudancas de modelo/contexto/politica devem ter gates proporcionais ao risco.
- Auditoria valida processo e identifica lacunas de evidencia.

## References

1. NIST. AI Risk Management Framework 1.0. Gaithersburg: National Institute of
   Standards and Technology, 2023.
2. ISO/IEC. ISO/IEC 42001:2023. Information technology — Artificial intelligence
   — Management system. Geneva: ISO, 2023.
3. ISO/IEC. ISO/IEC 27001:2022. Information security management systems. Geneva:
   ISO, 2022.
4. ISO/IEC/IEEE. ISO/IEC/IEEE 12207:2017. Software life cycle processes. Geneva:
   ISO, 2017.

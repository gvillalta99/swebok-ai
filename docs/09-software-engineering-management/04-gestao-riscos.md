---
title: Gestão de Riscos em Projetos com IA
created_at: '2026-01-31'
tags: [riscos, gestao-riscos, compliance, ia, seguranca, governanca]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 4. Gestao de Riscos em Projetos com IA

## Visão Geral

Projetos com IA introduzem riscos adicionais: variabilidade de comportamento,
dependencia de configuracoes e contexto, opacidade de decisoes e maior
necessidade de auditoria. Ao mesmo tempo, muitos riscos “classicos” permanecem
(escopo, integracao, pessoas).

Esta secao organiza riscos por categoria e oferece controles praticos:
governanca proporcional a criticidade, rastreabilidade, gates de aprovacao e
planos de contingencia.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar riscos especificos de sistemas assistidos por IA.
2. Montar um registro de riscos com mitigacoes verificaveis.
3. Definir controles proporcionais ao nivel de autonomia.
4. Planejar contingencia (rollback, degradacao e modo manual).
5. Usar normas e frameworks como referencia sem presumir conformidade
   automatica.

## 4.1 Taxonomia de Riscos

Categorias tipicas:

- Tecnicos: regressao sem diff de codigo (mudanca de modelo/contexto),
  vulnerabilidades, erros de contrato.
- Operacionais: indisponibilidade de dependencias externas, custos
  imprevisiveis, degradacao de latencia.
- Organizacionais: over-reliance, erosao de competencia, gargalos de
  verificacao.
- Compliance: ausencia de trilha de auditoria, falha de segregacao de funcoes
  onde exigido.

## 4.2 Matriz de Risco por Autonomia

| Risco                   | Assistencia | Co-execucao | Agente | Autonomia |
| ----------------------- | ----------- | ----------- | ------ | --------- |
| Opacidade               | Baixa       | Media       | Media  | Alta      |
| Over-reliance           | Media       | Media       | Alta   | Alta      |
| Drift (modelo/contexto) | Media       | Alta        | Alta   | Alta      |
| Accountability          | Media       | Alta        | Alta   | Crítica   |

## 4.3 Controles e Evidencias

Controles eficazes sao aqueles que geram evidencia:

- manifests de baseline (modelo/prompt/contexto),
- testes e validadores como gates,
- registro de curadoria (aprovacao/rejeicao e criterio),
- observabilidade (erros, custo, latencia) com alertas.

## 4.4 Plano de Contingencia

Um plano de contingencia minimo cobre:

- rollback de baselines,
- degradacao (fallback deterministico) quando IA falha,
- modo manual para operacao critica,
- post-incident (causa raiz e atualizacao de politicas).

## Considerações Práticas

### Checklist de Risco

1. Liste mudancas que alteram comportamento sem alterar codigo
   (modelo/contexto).
2. Defina gates por criticidade e autonomia.
3. Garanta rastreabilidade e retencao de evidencias.
4. Exercite rollback e modo manual (nao apenas documente).

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto      |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica   |

## Resumo

- Riscos com IA exigem foco em drift, opacidade e evidencias de verificacao.
- Autonomia aumenta necessidade de governanca e de trilha de auditoria.
- Controles devem ser avaliados pelo tipo de evidencia que produzem.
- Contingencia precisa ser exercitada para ser confiavel.

## Referências

1. ISO. ISO 31000:2018. Risk management — Guidelines. Geneva: ISO, 2018.
2. NIST. AI Risk Management Framework 1.0. Gaithersburg: National Institute of
   Standards and Technology, 2023.
3. ISO/IEC. ISO/IEC 42001:2023. Information technology — Artificial intelligence
   — Management system. Geneva: ISO, 2023.
4. ISO/IEC. ISO/IEC 27001:2022. Information security, cybersecurity and privacy
   protection — Information security management systems. Geneva: ISO, 2022.

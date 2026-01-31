---
title: "Planejamento de Projetos com Componentes de IA"
created_at: "2026-01-31"
tags: ["planejamento", "projetos", "estimativas", "ia", "verificacao"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 2. Planejamento de Projetos com Componentes de IA

## Overview

Planejar projetos com componentes de IA exige explicitar uma mudanca economica: a geracao de artefatos pode ser barata e rapida, mas a verificacao (qualidade, seguranca, conformidade e integracao) continua cara e limitada por capacidade humana.

Esta secao apresenta uma abordagem de planejamento centrada em risco e verificacao: estimar pelo custo de validar e integrar, usar buffers onde ha incerteza real e negociar escopo com base em capacidade de verificacao.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Estimar esforco separando especificacao, geracao, verificacao e integracao.
2. Classificar itens por criticidade e definir gates de aprovacao.
3. Planejar buffers de verificacao e de integracao com criterios claros.
4. Controlar escopo quando a geracao e “facil” mas a entrega continua custosa.
5. Comunicar trade-offs (velocidade vs. risco) de forma auditavel.

## 2.1 Decomposicao do Esforco

Um planejamento util separa atividades:

- especificacao (intencao, contratos e criterios de aceitacao),
- geracao (producao de artefatos),
- verificacao (testes, analise, revisao),
- integracao (ajustes arquiteturais e operacionais).

O erro tipico e estimar apenas implementacao e subestimar verificacao.

## 2.2 Estimativa por Criticidade (Decisao de Gate)

Use criticidade para definir quanto custa “estar seguro de que esta certo”. Exemplo de regra:

- baixa: evidencia automatizada pode ser suficiente,
- media: evidencia automatizada + revisao por pares,
- alta: revisao reforcada + testes de regressao e seguranca,
- critica: aprovacao por especialista e trilha de auditoria obrigatoria.

## 2.3 Buffer de Verificacao

Buffers sao justificaveis quando ha variancia e risco. Defina buffer por:

- categoria (criticidade),
- incerteza (novidade de dominio, dependencias externas),
- capacidade real de revisao.

Evite “percentuais fixos” sem calibracao; registre a hipotese e ajuste por dados do proprio time.

## 2.4 Gestao de Escopo com Capacidade Finita

Quando a geracao acelera, a pressao por escopo cresce. Trate capacidade de verificacao como orcamento:

| Valor | Custo de verificacao | Decisao |
|------|-----------------------|---------|
| Alto | Baixo | Incluir |
| Alto | Alto | Incluir com replanejamento |
| Baixo | Alto | Deferir/rejeitar |

## Practical Considerations

### Checklist de Planejamento

1. Defina “Definition of Done” com evidencias (nao apenas codigo pronto).
2. Planeje quem revisa e quem aprova por criticidade.
3. Mantenha backlog visivel de itens “em verificacao”.
4. Registre decisoes de trade-off como artefatos (para auditoria e aprendizado).
5. Revise estimativas com dados de ciclo: onde o tempo realmente foi gasto.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta |

## Summary

- Planejamento com IA exige estimar verificacao e integracao, nao apenas geracao.
- Criticidade define gates e custo de evidencia.
- Buffers devem ser justificados por incerteza real e calibrados por dados.
- Capacidade de verificacao e a restricao que governa escopo.

## References

1. PMI. A Guide to the Project Management Body of Knowledge (PMBOK Guide). 7. ed. Newtown Square: Project Management Institute, 2021.
2. ISO. ISO 21502:2020. Project, programme and portfolio management — Guidance on project management. Geneva: ISO, 2020.
3. Forsgren, N.; Humble, J.; Kim, G. Accelerate: The Science of Lean Software and DevOps. Portland: IT Revolution Press, 2018.

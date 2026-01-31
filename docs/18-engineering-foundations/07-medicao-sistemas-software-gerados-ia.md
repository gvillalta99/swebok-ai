---
title: "18.7 Medicao de Sistemas de Software Gerados por IA"
created_at: "2026-01-31"
tags: ["fundamentos-engenharia", "medicao", "metricas", "ia-generativa", "produtividade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 18.7 Medicao de Sistemas de Software Gerados por IA

## Overview

Medicao e o elo entre engenharia e governanca: sem medicao, nao existe controle. Com IA generativa, medir fica mais dificil porque o custo marginal de produzir codigo cai, mas o custo de **verificar** e **operar** pode subir. Alem disso, a "unidade" do trabalho muda: nao e apenas linhas de codigo, mas a cadeia completa de geracao, revisao, teste e manutencao.

Esta secao apresenta como medir sistemas de software em que partes relevantes sao geradas por IA, incluindo metricas de qualidade, processo, risco e economia.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Distinguir medidas diretas e derivadas aplicadas a geracao por IA.
2. Evitar metricas de vaidade (por exemplo, "LOC geradas") e priorizar metricas orientadas a decisao.
3. Medir qualidade e risco em distribuicao (taxas de falha, caudas, incidentes).
4. Integrar medicao a gates de release e politicas de rollback.
5. Relacionar medicao com efeitos organizacionais (tamanho de batch, estabilidade, lead time).

## 7.1 O que muda quando o codigo vira commodity

Com assistentes e agentes, uma organizacao pode produzir mais codigo com menos friccao. O DORA 2024 argumenta que a adocao de IA pode aumentar tamanho de mudancas (batch size), e mudancas maiores tendem a elevar risco em entrega de software [1]. Logo, uma metrica que celebra "mais output" pode esconder degradacao.

Uma regra pratica:

- Se a metrica nao informa uma decisao (liberar, bloquear, investir, reduzir escopo), ela e curiosidade.

## 7.2 Medidas diretas e derivadas para IA

Exemplos de medidas diretas:

- taxa de incidentes por release
- tempo de revisao por PR
- taxa de falhas de politica (safety)
- custo por solicitacao (USD)

Exemplos de medidas derivadas:

- custo por funcionalidade validada
- tempo de ciclo por tarefa (da intencao ao deploy)
- "custo de verificacao" por unidade (tempo de testes + revisao + incidentes)

Em sistemas cognitivos, medidas derivadas precisam explicitar premissas e unidades.

## 7.3 Goal-Question-Metric (GQM) aplicado a IA

O GQM continua util, mas as perguntas mudam. Exemplo:

- **Goal**: reduzir risco de respostas nao fundamentadas.
- **Questions**: qual a taxa de afirmacoes sem fonte? qual impacto em incidentes?
- **Metrics**: taxa de citacoes validas; taxa de retrabalho; taxa de incidentes por dominio.

O perfil de GenAI do NIST ajuda a transformar riscos em perguntas mensuraveis (por exemplo, riscos de desinformacao, alucinacao, privacidade) [2].

## 7.4 Medicao de qualidade para componentes probabilisticos

Para componentes probabilisticos, qualidade nao e "passa/falha" apenas. Boas praticas:

- medir por categoria de risco
- medir por dominio e lingua
- medir por cobertura de cenarios adversariais

System cards de modelos mostram que avaliacao pratica usa suites e scorecards por tipo de risco, reforcando essa decomposicao [3].

## 7.5 Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | **Media/Baixa** - metricas especificas mudam, mas GQM e medicao permanecem |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | **Alto** - medir bem exige instrumentacao, rotulagem e governanca |
| **Responsabilidade Legal** | Quem e culpado se falhar? | **Moderada** - metricas ruins induzem decisoes ruins e riscos evitaveis |

## Practical Considerations

### Aplicacoes reais

1. Use metricas balanceadas: throughput, estabilidade, seguranca e custo.
2. Acompanhe tamanho de mudancas e relacione com incidentes.

### Limitacoes

- Medir "produtividade" individual com IA e especialmente sujeito a vies; prefira medir resultados de fluxo e qualidade.

### Melhores praticas

1. Mantenha um catalogo de metricas com definicao operacional.
2. Defina quem pode alterar metricas e por que.
3. Revise metricas periodicamente para evitar Goodhart.

## Summary

- IA aumenta output; medicao deve focar no que importa: risco, qualidade, estabilidade e custo.
- Medidas derivadas e GQM ajudam a conectar metricas a decisoes.
- Qualidade em componentes probabilisticos deve ser medida por distribuicoes e categorias.

## References

1. DORA. Accelerate State of DevOps Report 2024. 2024. https://dora.dev/research/2024/dora-report/
2. NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). 2024. https://doi.org/10.6028/NIST.AI.600-1
3. OpenAI. GPT-4o System Card. 2024. https://openai.com/index/gpt-4o-system-card/

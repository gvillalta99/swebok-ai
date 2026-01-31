---
title: "Métricas e Produtividade em Times com IA"
created_at: "2026-01-31"
tags: ["metricas", "produtividade", "dora", "times", "ia", "performance"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 3. Metricas e Produtividade em Times com IA

## Overview

Metricas de produtividade precisam refletir onde o trabalho realmente acontece. Em times com IA, produzir “mais codigo” nao e um objetivo valido; o gargalo e reduzir incerteza: especificar melhor, verificar mais rapido e diminuir defeitos escapando.

Esta secao propõe um conjunto de metricas operacionais e de resultados, com alertas de interpretacao (metricas sao sinais; exigem contexto e podem ser “jogadas”).

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar por que metricas de volume (p.ex., LOC) degradam em ambiente com IA.
2. Medir capacidade real via tempo de verificacao, retrabalho e defeitos escapados.
3. Adaptar metricas de entrega (p.ex., DORA) para separar geracao de validacao.
4. Construir um painel equilibrado (atividade, qualidade, fluxo, bem-estar).
5. Definir regras de uso seguro de metricas (evitar punicao e incentivos perversos).

## 3.1 Anti-padroes de Medicao

Evite usar como proxy de valor:

- linhas de codigo, commits ou “quantidade de sugestoes aceitas”,
- cobertura de testes sem qualificar oraculos e relevancia,
- “tempo em ferramenta” como sinonimo de produtividade.

Em ambiente com IA, essas metricas podem aumentar mesmo quando qualidade cai.

## 3.2 Metricas Operacionais Relevantes

Use metricas que medem verificacao e fluxo:

- tempo de verificacao (do “pronto para revisar” ao “aprovado”),
- backlog de verificacao (itens aguardando revisao),
- taxa de retrabalho (itens que retornam para refazer/regenerar),
- defeitos escapados (defeitos em producao por release).

Definicao util: “aceitacao” deve ser definida por criterio (p.ex., “aceito sem mudar comportamento”); caso contrario, vira vanity metric.

## 3.3 Adaptando Metricas de Entrega (DORA)

As metricas DORA sao uteis como base de performance de entrega, desde que interpretadas com o recorte correto:

- Lead time deve ser decomposto (especificacao, verificacao, integracao).
- Change failure rate deve distinguir falhas por regressao e por ausencia de evidencia.
- Time to restore deve incluir a capacidade de reproduzir e auditar rapidamente.

## 3.4 Painel Equilibrado (SPACE)

SPACE oferece um quadro holistico para evitar otimizacao local:

- Satisfaction and well-being
- Performance
- Activity
- Communication and collaboration
- Efficiency and flow

Em times com IA, a dimensao “Efficiency and flow” tende a ser dominada por fila de verificacao e por context switching.

## Practical Considerations

### Regras de Governanca de Metricas

1. Nao use metricas como mecanismo de punicao individual.
2. Defina metricas por objetivo (qualidade, fluxo, risco) e revise periodicamente.
3. Publique definicoes e limites: o que cada metrica mede e o que nao mede.
4. Combine sinais: nenhuma metrica isolada decide.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Summary

- Metricas de volume tendem a falhar com IA; preferir metricas de verificacao e fluxo.
- DORA continua util se decomposta e interpretada por evidencia e risco.
- SPACE ajuda a balancear produtividade com bem-estar e colaboracao.

## References

1. Forsgren, N.; Humble, J.; Kim, G. Accelerate: The Science of Lean Software and DevOps. Portland: IT Revolution Press, 2018.
2. Forsgren, N. et al. The SPACE of Developer Productivity. ACM Queue, 2021.

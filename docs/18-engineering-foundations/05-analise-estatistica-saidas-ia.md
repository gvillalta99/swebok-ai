---
title: "18.5 Analise Estatistica de Saidas de IA"
created_at: "2026-01-31"
tags: ["fundamentos-engenharia", "estatistica", "avaliacao", "qualidade", "nao-determinismo"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 18.5 Analise Estatistica de Saidas de IA

## Overview

Analise estatistica e o mecanismo que transforma observacoes ruidosas em decisoes de engenharia. Para sistemas com IA generativa, a saida nao e apenas uma variavel numerica; muitas vezes e texto, codigo, audio ou decisao. Isso exige uma combinacao de: (i) metricas derivadas, (ii) avaliacao humana amostral, e (iii) avaliadores automatizados.

Esta secao descreve como estruturar analise estatistica para outputs de IA, com foco em amostragem, estimacao, testes de hipoteses e interpretacao operacional.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Definir populacao, amostra e unidade de analise em avaliacao de sistemas com IA.
2. Selecionar metricas apropriadas para saidas nao deterministicas (incluindo taxas e distribuicoes).
3. Construir estimativas com incerteza (intervalos) e evitar conclusoes de "ponto".
4. Interpretar resultados considerando mudanca de distribuicao e vies de avaliacao.
5. Usar analise estatistica para orientar gates de release e politicas de rollback.

## 5.1 Unidade de analise e amostragem

Unidades de analise tipicas:

- **Prompt**: uma pergunta/entrada isolada.
- **Sessao**: sequencia multi-turn.
- **Tarefa**: objetivo com criterios de aceitacao.
- **Incidente**: evento de falha em producao.

O erro mais comum e misturar unidades: por exemplo, tratar "turn" e "sessao" como equivalentes. A recomendacao e escolher a unidade de analise que se conecta diretamente a uma decisao de engenharia.

## 5.2 Distribuicoes, nao medias

Para saídas de IA, medias escondem caudas. Praticas recomendadas:

- Reportar **percentis** (p50/p90/p99) para latencia e custo.
- Reportar **taxas** (por exemplo, taxa de resposta sem fonte).
- Acompanhar **taxas condicionais** (por dominio, lingua, tipo de usuario).

Relatorios como system cards explicitam suites de avaliacao e scores por categoria (seguranca, autonomia, persuasao), sugerindo a necessidade de decompor distribuicoes por risco [1].

## 5.3 Estimacao e intervalos

Uma afirmacao como "a versao B e melhor" deve ser sustentada por:

- tamanho de amostra
- estimativa de variancia
- intervalo de confianca

Em sistemas nao deterministas, o objetivo pratico nao e provar "verdade", mas reduzir a probabilidade de erro de decisao.

## 5.4 Correlacao, regressao e confundidores

Em avaliacao operacional, correlacao e util para detectar sinais precoces (por exemplo, aumento de tamanho de mudanca correlacionado com incidentes). Contudo, correlacao nao implica causalidade. O DORA 2024 discute relacoes entre capacidades, resultados e fatores organizacionais, e e um exemplo de uso cuidadoso de metodologia estatistica em contexto real [2].

## 5.5 Testes de hipoteses e criterios de parada

Para sistemas com IA, testes de hipoteses devem ser combinados com criterios de parada operacionais:

- liberar se atingir meta e risco aceitavel
- bloquear se exceder limite de incidentes
- reavaliar se mudar distribuicao (drift)

O perfil de GenAI do NIST lista riscos e acoes, o que pode ser usado para transformar hipoteses de seguranca em metricas e testes [3].

## 5.6 Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | **Baixa** - estatistica aplicada continua essencial |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | **Medio/Alto** - ferramentas ajudam, mas desenho e interpretacao sao humanos |
| **Responsabilidade Legal** | Quem e culpado se falhar? | **Moderada** - erros estatisticos levam a decisoes ruins e riscos evitaveis |

## Practical Considerations

### Aplicacoes reais

- Padronize dashboards com percentis e taxas condicionais.
- Mantenha uma "suite fixa" (regressao) e uma "suite viva" (amostras recentes).

### Limitacoes

- Avaliadores automaticos (inclusive LLM-as-judge) podem ser instaveis e viesados; valide-os com amostras humanas.

### Melhores praticas

1. Nao reporte apenas medias; use distribuicoes e percentis.
2. Evite Goodhart: se uma metrica vira alvo, ela pode deixar de medir o que importa.
3. Documente premissas e unidades de analise.

## Summary

- Em IA, engenharia precisa de analise em distribuicao: caudas importam.
- Estimacao com incerteza e essencial para decidir releases e rollbacks.
- Correlacao ajuda a monitorar, mas requer cuidado com confundidores.

## References

1. OpenAI. GPT-4o System Card. 2024. https://openai.com/index/gpt-4o-system-card/
2. DORA. Accelerate State of DevOps Report 2024. 2024. https://dora.dev/research/2024/dora-report/
3. NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). 2024. https://doi.org/10.6028/NIST.AI.600-1

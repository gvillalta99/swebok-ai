---
title: 18.4 Metodos Empiricos para Sistemas Nao-Deterministicos
created_at: '2026-01-31'
tags: [fundamentos-engenharia, metodos-empiricos, experimentos, nao-determinismo, avaliacao]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 18.4 Metodos Empiricos para Sistemas Nao-Deterministicos

## Overview

Quando o comportamento do sistema e estocastico, evidencia empirica se torna o
mecanismo primario para justificar decisoes de engenharia. Isso exige adaptar a
tradicao de experimentos controlados, estudos observacionais e analise
retrospectiva para um contexto em que o mesmo input pode gerar outputs
diferentes.

Esta secao apresenta um kit de metodos empiricos para engenharia de sistemas
nao-deterministicos, com foco em: desenho de experimento, amostragem,
replicacao, controle de variaveis, e interpretacao para governanca.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Diferenciar experimento controlado, estudo observacional e estudo
   retrospectivo em sistemas com IA.
2. Projetar avaliacoes com replicacao e controle de variaveis relevantes
   (modelo, prompt, contexto, seed).
3. Definir unidades de analise apropriadas (prompt, sessao, tarefa, usuario,
   incidente).
4. Evitar conclusoes espurias devido a mudanca de distribuicao e viés de
   selecao.
5. Integrar avaliacao empirica ao processo de release e monitoramento.

## 4.1 O que muda quando o sistema e probabilistico

Dois erros comuns (e caros) em avaliacao de IA:

1. **Tratar uma execucao como evidencia**: uma unica corrida e anecdota.
2. **Medir fora da distribuicao**: benchmark nao representa uso real.

O resultado e decisao de engenharia baseada em ilusao de controle. Relatorios da
industria como o DORA 2024 reforcam que tecnologia (incluindo IA) altera o
comportamento organizacional e o tamanho de mudancas, influenciando risco;
portanto, o "objeto" medido inclui tanto tecnologia quanto processo [1].

## 4.2 Experimentos controlados (designed experiments)

Um experimento controlado em sistemas com IA frequentemente manipula variaveis
como:

- Modelo (A vs B)
- Prompt/politica (v1 vs v2)
- Estrategia de recuperacao (RAG on/off; top-k)
- Temperatura/decoding

Elementos essenciais:

1. **Hipotese operacional**: "A versao v2 reduz taxa de respostas sem fonte".
2. **Tratamentos**: combinacoes de variaveis controladas.
3. **Replicacao**: multiplas amostras por tratamento para estimar variancia.
4. **Randomizacao**: reduzir vies sistematico (ordem, usuario, horario).

Em sistemas cognitivos, replicacao nao significa apenas rodar varias vezes:
significa rodar sob diversidade de inputs e contextos representativos.

## 4.3 Estudos observacionais (case studies) e monitoramento

Estudos observacionais sao inevitaveis porque parte do comportamento aparece
apenas em producao (mudanca de distribuicao). O foco aqui e construir
observabilidade com:

- logs de contexto e decisoes
- metricas de qualidade e seguranca
- rotulagem (manual ou assistida) para amostras

O perfil de GenAI do NIST explicita riscos e a necessidade de controles e
medicao durante uso e avaliacao, reforcando o papel de monitoramento como parte
do metodo empirico [2].

## 4.4 Estudos retrospectivos: incidentes e regressao

Analise retrospectiva usa dados historicos para:

- identificar degradacao de performance
- detectar mudanca de distribuicao
- entender classes de falha e seus drivers

Em IA, o risco de conclusao errada aumenta porque o dataset historico pode estar
contaminado por mudancas invisiveis (versao de modelo, fontes, politicas). Por
isso, a recomendacao pratica e tratar logs como artefatos de engenharia:
versionados e com schema estavel.

## 4.5 Matriz de Avaliacao Consolidada

| Criterio                        | Descricao                                                | Avaliacao                                                                   |
| ------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses?                    | **Baixa** - metodos empiricos sao base para engenharia sob incerteza        |
| **Custo de Verificacao**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** - exige datasets, rotulagem, replicacao e analise estatistica      |
| **Responsabilidade Legal**      | Quem e culpado se falhar?                                | **Moderada/Critica** - falhas de avaliacao podem levar a releases inseguros |

## Practical Considerations

### Aplicacoes reais

1. Em ambientes regulados, combine experimentos controlados (pre-release) com
   estudos observacionais (pos-release).
2. Para mudancas de modelo, exija "avaliacao regressiva" em conjuntos fixos +
   amostras recentes.

### Limitacoes

- A rotulagem humana e cara; avaliadores automaticos podem introduzir vies
  (especialmente se forem modelos).

### Melhores praticas

1. Defina unidade de analise explicitamente e mantenha consistencia.
2. Use replicacao e reporte variancia (intervalos), nao apenas medias.
3. Capture e versiona variaveis de confusao (modelo, prompt, contexto).

## Summary

- Em sistemas nao-deterministicos, avaliacao exige replicacao, amostragem
  representativa e controle de variaveis.
- Estudos observacionais e retrospectivos sao indispensaveis devido a mudanca de
  distribuicao em producao.
- Governanca e rastreabilidade tornam dados historicos interpretaveis.

## References

1. DORA. Accelerate State of DevOps Report 2024. 2024.
   <https://dora.dev/research/2024/dora-report/>
2. NIST. Artificial Intelligence Risk Management Framework: Generative
   Artificial Intelligence Profile (NIST AI 600-1). 2024.
   <https://doi.org/10.6028/NIST.AI.600-1>
3. Hou, X.; Zhao, Y.; Liu, Y.; et al. Large Language Models for Software
   Engineering: A Systematic Literature Review. ACM Transactions on Software
   Engineering and Methodology, 2024. <https://doi.org/10.1145/3695988>

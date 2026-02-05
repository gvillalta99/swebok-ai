---
title: "18.9 Analise de Causa Raiz em Falhas de Sistemas Cognitivos"
created_at: "2026-01-31"
tags: ["fundamentos-engenharia", "rca", "incidentes", "sistemas-cognitivos", "qualidade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 18.9 Analise de Causa Raiz em Falhas de Sistemas Cognitivos

## Overview

Analise de causa raiz (RCA) e uma classe de tecnicas para entender por que um evento indesejado ocorreu e como evitar recorrencia. Em sistemas cognitivos, RCA precisa considerar que a causa pode nao estar em "codigo" e sim em:

- dados e contexto (RAG)
- prompts e politicas
- mudancas de modelo
- dinamica humano-sistema (uso e abuso)

Esta secao reinterpreta RCA para sistemas nao-deterministicos, com foco em evidencia, rastreabilidade e correcoes que realmente reduzem probabilidade de recorrencia.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Conduzir RCA distinguindo sintomas, causas proximas e causas raiz em sistemas com IA.
2. Aplicar tecnicas como 5 porques, analise de mudanca e arvores de falha em incidentes com IA.
3. Identificar variaveis de confusao especificas (versao de modelo, prompt, contexto, avaliadores).
4. Definir acoes corretivas com verificacao (evidencia de que reduziu recorrencia).
5. Integrar RCA a governanca, compliance e melhoria continua.

## 9.1 O que e "causa" em um sistema probabilistico

Em sistemas deterministas, "causa" muitas vezes e um bug reproduzivel. Em IA, incidentes podem ser:

- dificilmente reproduziveis (dependem de amostragem)
- dependentes de contexto e de dados externos
- induzidos por comportamento do usuario

Logo, RCA precisa tratar "reproducao" como um objetivo probabilistico: reconstruir condicoes e estimar chance de recorrencia.

## 9.2 Tecnicas adaptadas

### 9.2.1 5 porques + evidencias

O 5 porques continua util, mas cada "por que" deve exigir evidencias (logs, avaliacao, versoes). Sem evidencias, a tecnica vira narrativa.

### 9.2.2 Analise de mudanca

Em incidentes com IA, a primeira pergunta costuma ser: "o que mudou?".

Checklist minimo:

- versao do modelo e parametros de geracao
- prompts/politicas
- fontes RAG e indexacao
- filtros/moderacao
- trafego (tipo de usuario, dominio, lingua)

### 9.2.3 Arvore de falhas (FTA)

FTA e particularmente util para separar caminhos "E" e "OU" em falhas (por exemplo: vazamento ocorreu por OU (prompt injection) OU (fonte RAG mal classificada) OU (log exposto)).

## 9.3 Correcao: reduzir probabilidade, nao apenas corrigir um caso

Uma acao corretiva boa atende a tres criterios:

1. **Controlavel** pela organizacao (nao depende de "usuarios serem melhores").
2. **Verificavel** (existe avaliacao ou monitoramento que comprova reducao).
3. **Nao cria novos riscos** (trade-offs documentados).

O perfil de GenAI do NIST pode ser usado como taxonomia para classificar riscos (por exemplo, desinformacao, privacidade, seguranca) e orientar acoes corretivas e evidencias [1].

## 9.4 RCA e obrigacoes de registro

Regulacoes como o AI Act incentivam (e em alguns casos exigem) documentacao e registro ao longo do ciclo de vida. Na pratica, isso significa que RCA depende de design para auditabilidade: sem logs e versoes, nao ha causa raiz, apenas especulacao [2].

## 9.5 Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | **Baixa** - RCA permanece central em engenharia |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | **Alto** - requer dados, reproducao, analise e mudancas de sistema |
| **Responsabilidade Legal** | Quem e culpado se falhar? | **Critica** - incidentes de IA podem envolver seguranca e direitos |

## Practical Considerations

### Aplicacoes reais

1. Defina severidade e SLAs de resposta por tipo de incidente (qualidade, seguranca, privacidade).
2. Mantenha "pacotes de reproducao" (input, contexto, versoes, logs, seed quando aplicavel).

### Limitacoes

- Nem todo incidente tera reproducao perfeita; foque em reduzir recorrencia com controles sistemicos.

### Melhores praticas

1. Exija evidencias para cada hipotese de causa.
2. Priorize correcoes que criam barreiras (defesa em profundidade), nao apenas ajustes de prompt.
3. Apos correcao, crie um teste/regressao que prove que a falha ficou menos provavel.

## Summary

- RCA em sistemas cognitivos precisa lidar com nao-determinismo, contexto e mudancas de modelo.
- Tecnicas classicas funcionam, mas exigem evidencias e rastreabilidade.
- Correcao deve reduzir probabilidade de recorrencia e ser verificavel.

## References

1. NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). 2024. https://doi.org/10.6028/NIST.AI.600-1
2. European Union. Regulation (EU) 2024/1689 (Artificial Intelligence Act). 2024. http://data.europa.eu/eli/reg/2024/1689/oj

---
title: "18.1 O Processo de Engenharia na Era da IA"
created_at: "2026-01-31"
tags: ["fundamentos-engenharia", "processos", "sistemas-cognitivos", "governanca", "ia"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 18.1 O Processo de Engenharia na Era da IA

## Overview

Na era dos sistemas cognitivos (LLMs, agentes, sistemas de recomendacao e pipelines de decisao probabilistica), o processo de engenharia deixa de ser apenas uma sequencia de etapas para produzir codigo e passa a ser um **processo de governanca de comportamento**. A unidade de trabalho relevante nao e somente o artefato (codigo), mas o sistema como um todo: modelos, dados, prompts, contexto (RAG), politicas, avaliadores, telemetria e mecanismos de rollback.

Esta secao reinterpreta o processo de engenharia tradicional como um ciclo iterativo de **definicao de limites, avaliacao empirica, liberacao controlada e aprendizado operacional**. O objetivo central e maximizar a probabilidade de que um sistema nao-deterministico permaneça dentro de envelopes aceitaveis de seguranca, qualidade e custo, mesmo sob distribuicoes de uso reais.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Explicar como nao-determinismo e mudancas de modelo alteram o conceito de "baseline" e "release".
2. Definir criterios de selecao e aceitacao que sejam verificaveis para sistemas probabilisticos.
3. Mapear atividades do ciclo de vida (ISO/IEC/IEEE 15288) para a engenharia de sistemas com IA.
4. Descrever o papel de avaliacao continua (evals) e monitoramento como parte do processo de engenharia.
5. Identificar riscos tipicos de GenAI e incorporar mitigacoes como restricoes de processo.

## 1.1 O processo de engenharia como controle de variacao

O SWEBOK v4 descreve um fluxo geral: compreender o problema real, definir criterios, listar solucoes, avaliar, selecionar e monitorar desempenho. Em sistemas cognitivos, o ponto de ruptura e que "desempenho" nao e um numero fixo: e uma **distribuicao** que varia com (i) entradas, (ii) contexto, (iii) atualizacoes de modelo e (iv) ambiente.

Consequentemente, o processo deve operar como um loop de controle:

1. **Definir o envelope de aceitacao**: limites minimos/maximos para resultados (qualidade, seguranca, custo e tempo) e tolerancias para variacao.
2. **Medir em distribuicao**: coletar amostras representativas, incluindo caudas (casos raros) e cenarios adversariais.
3. **Tomar decisoes com base em risco**: liberar, degradar, bloquear ou rolar back com base em evidencias.

O NIST AI RMF e o perfil de GenAI (NIST AI 600-1) formalizam o papel de governanca e gestao de risco como parte do ciclo de vida, reforcando que "confiabilidade" nao e uma propriedade estatica do modelo, mas do sistema socio-tecnico que o opera [1].

## 1.2 Iteracao: do SDLC ao "sistema em operacao"

Em engenharia de software classica, uma parte relevante do risco e introduzida durante construcao. Em sistemas com IA, uma parcela relevante do risco e introduzida durante:

- **Mudancas de modelo** (troca de provedor, nova versao, quantizacao, fine-tuning).
- **Mudancas de contexto** (base RAG, fontes, politicas de citacao).
- **Mudancas de produto** (novos fluxos, novas superficies de ataque, novos usuarios).

Por isso, a fronteira entre desenvolvimento e operacao se torna porosa: "liberar" significa colocar uma nova distribuicao de comportamento em producao. O ciclo de vida de sistemas (ISO/IEC/IEEE 15288) oferece uma linguagem mais adequada que SDLC para descrever essa realidade: concepcao, desenvolvimento, transicao, operacao, manutencao e retirada [2].

## 1.3 Criterios de selecao: de requisitos para restricoes verificaveis

Em sistemas cognitivos, criterios de selecao mal especificados geram duas patologias:

1. **Otimizacao de benchmark** (melhora em suites sinteticas, piora em uso real).
2. **Boa media, cauda ruim** (metrica media aceitavel, mas falhas raras com alto impacto).

Um criterio adequado deve ser (i) operacionalizavel, (ii) mensuravel, (iii) audivel e (iv) mapeavel para decisoes. Exemplos:

- "O sistema deve citar fontes" (vago) -> "Em respostas com declaracoes factuais, a taxa de citacoes validas deve ser >= 95% em um conjunto de avaliacao representativo; respostas sem fonte devem ser rotuladas explicitamente".
- "O sistema deve ser seguro" (vago) -> "Taxa de violacoes de politica em prompts adversariais deve ser <= X; incidentes P0 exigem rollback automatico".

O DORA 2024 reforca uma ideia operacional: mudancas grandes aumentam risco. Em ambientes com assistentes de codigo, o aumento de throughput pode elevar o tamanho de batch e degradar performance de entrega; portanto, criterios devem incluir controles sobre tamanho de mudanca e mecanismos de revisao [3].

## 1.4 O papel de "evals" e red teaming no processo

Para sistemas nao-deterministicos, avaliacao deve ser tratada como um subsistema de engenharia, com:

- **Datasets versionados** (incluindo caudas e adversariais)
- **Avaliadores automatizados** (heuristicas, modelos-julgadores, verificadores deterministas)
- **Amostragem controlada** (seeds, temperaturas, replicacoes)
- **Orcamento de erro** (apetite de risco por classe de falha)

Cartoes de sistema (system cards) de modelos de fronteira mostram como praticas como red teaming externo, scorecards de risco e avaliacao de autonomia sao incorporadas antes e apos deploy [4]. Essas praticas nao sao "acessorias"; sao parte do processo de engenharia quando o componente central e um modelo probabilistico.

## 1.5 Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | **Baixa** - processos iterativos e tomada de decisao baseada em evidencia permanecem essenciais |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | **Alto** - requer infraestrutura de avaliacao, observabilidade e governanca |
| **Responsabilidade Legal** | Quem e culpado se falhar? | **Critica** - falhas de processo impactam conformidade, seguranca e direitos |

## Practical Considerations

### Aplicacoes reais

- Use gates de release que combinem **metrica de qualidade** + **metrica de seguranca** + **orcamento de custo**.
- Trate "mudanca de modelo" como mudanca de dependencia critica: exige plano de rollback e avaliacao regressiva.

### Limitacoes

- Boa parte do comportamento relevante aparece apenas em producao (mudanca de distribuicao); isso exige observabilidade e iteracao.

### Melhores praticas

1. Defina envelopes de aceitacao por classe de risco (P0/P1/P2), nao um unico score.
2. Separe "avaliacao para melhoria" de "avaliacao para bloqueio" (evita Goodhart).
3. Formalize ownership: quem pode liberar, quem pode bloquear, quem e accountable.

## Summary

- O processo de engenharia para IA vira um loop de controle de variacao e risco, nao apenas um fluxo de construcao.
- Criterios eficazes sao restricoes operacionalizaveis, auditaveis e orientadas a decisao.
- Evals e red teaming devem ser tratados como parte do sistema, com dados e versoes.
- Ciclo de vida de sistemas (15288) descreve melhor a integracao desenvolvimento-operacao em sistemas cognitivos.

## References

1. NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). 2024. https://doi.org/10.6028/NIST.AI.600-1
2. ISO/IEC/IEEE. ISO/IEC/IEEE 15288:2023 Systems and software engineering - System life cycle processes. 2023. https://www.iso.org/standard/81702.html
3. DORA. Accelerate State of DevOps Report 2024. 2024. https://dora.dev/research/2024/dora-report/
4. OpenAI. GPT-4o System Card. 2024. https://openai.com/index/gpt-4o-system-card/

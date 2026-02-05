---
title: 17.3 Conjuntos, Relacoes e Funcoes na Especificacao de Restricoes
created_at: '2026-01-31'
tags: [fundamentos-matematicos, conjuntos, relacoes, funcoes, especificacao, restricoes, llm]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 17.3 Conjuntos, Relacoes e Funcoes na Especificacao de Restricoes

## Overview

Conjuntos, relacoes e funcoes sao as estruturas minimas para formalizar dominio,
contexto e fronteiras. Em um mundo com LLMs, a falha tipica nao e "erro de
sintaxe", mas extrapolacao de dominio: o sistema aplica regras fora do conjunto
de casos validos. Formalizar dominios como conjuntos e mapear transformacoes
como funcoes e um caminho simples para reduzir ambiguidade, guiar validadores e
tornar auditorias possiveis.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Modelar dominios de entrada/saida como conjuntos e sub-conjuntos (incluindo
   casos proibidos)
2. Expressar politicas e controles como relacoes e funcoes parciais (quando algo
   e indefinido/negado)
3. Usar cardinalidade e power set para raciocinar sobre explosao combinatoria e
   cobertura
4. Traduzir especificacoes informais em notacao set-theoretica checavel
5. Identificar onde o uso de funcoes (determinismo) e invalido e exige modelagem
   relacional (nao-determinismo)

## 3.1 Dominio, Contexto e Fronteiras

Modelar o universo relevante como um conjunto U (universo de discurso) e modelar
o dominio permitido D como subconjunto de U e a base para restricoes de
contexto. Exemplos:

- D_prompt = prompts permitidos por politica
- D_tools = ferramentas autorizadas (por tenant, papel, ambiente)
- D_outputs = formatos e tipos de resposta aceitos

As restricoes "negativas" podem ser expressas como complemento: U \\ D.

## 3.2 Relacoes para Politicas, Permissoes e Auditoria

Permissoes e autorizacoes sao naturalmente relacoes: Usuario x Acao ->
Permitido/Negado, com condicoes. Relacoes ajudam quando existe multiplicidade
(um usuario com varios papeis, uma acao com varias pre-condicoes). Essa
modelagem conecta bem com policy-as-code e com verificacao de conformidade.

## 3.3 Funcoes Parciais e Falhas Controladas

Muitas funcoes em software real sao parciais: nao definidas para certas
entradas. Tornar isso explicito (dominio restrito) e um mecanismo de seguranca:
entradas fora do dominio devem resultar em erro tratado, escalonamento, ou "nao
sei".

Em sistemas com LLM, e comum o modelo "inventar" uma extensao de funcao fora do
dominio. Declarar o dominio e checar pertencecia (x in D) e um guardrail simples
e efetivo.

## 3.4 Composicao e Decomposicao

Especificacoes complexas frequentemente se beneficiam de decomposicao em funcoes
compostas:

- parse: Texto -> AST
- validate: AST -> (ok, erros)
- plan: AST -> Plano
- execute: Plano -> Resultado

Cada etapa pode ter dominio/contra-dominios, facilitando testes, verificacao e
observabilidade.

## Practical Considerations

- Use tipos e schemas como implementacao pratica de conjuntos e predicados.
- Modele explicitamente conjuntos proibidos (PII, segredos, ambientes prod) e
  trate como bloqueios.
- Para agentes, modele o espaco de acoes como conjunto finito e valide cada
  transicao.

## Matriz de Avaliacao Consolidada

| Criterio                    | Descricao                                                                         | Avaliacao |
| --------------------------- | --------------------------------------------------------------------------------- | --------- |
| Descartabilidade Geracional | Base conceitual perene; apenas a sintaxe/tecnologia muda.                         | Baixa     |
| Custo de Verificacao        | Medio: formalizacao e checagens de dominio sao acessiveis, mas exigem disciplina. | Medio     |
| Responsabilidade Legal      | Violacoes de dominio (PII, compliance) tendem a ser legalmente sensiveis.         | Critica   |

## Summary

- Conjuntos e dominos formalizam "onde" o sistema pode operar.
- Relacoes modelam politicas e permissao com multiplicidade.
- Funcoes parciais tornam explicitamente seguro o "nao aplicavel".

## References

1. Halmos, P. R. Naive Set Theory. Springer, 1974.
2. Enderton, H. B. Elements of Set Theory. Academic Press, 1977.
3. NIST. Artificial Intelligence Risk Management Framework: Generative
   Artificial Intelligence Profile (NIST AI 600-1). July 2024.
   <https://doi.org/10.6028/NIST.AI.600-1>
4. ISO/IEC. ISO/IEC 23053:2022 - Framework for Artificial Intelligence (AI)
   Systems Using Machine Learning (ML). 2022 (adocoes nacionais em 2024).
   <https://oecd.ai/en/catalogue/tools/isoiec-230532022-framework-for-artificial-intelligence-ai-systems-using-machine-learning-ml>

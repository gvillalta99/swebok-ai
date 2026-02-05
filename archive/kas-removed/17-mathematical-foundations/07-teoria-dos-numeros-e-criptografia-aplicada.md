---
title: 17.7 Teoria dos Numeros e Criptografia Aplicada
created_at: '2026-01-31'
tags: [fundamentos-matematicos, teoria-dos-numeros, criptografia, seguranca, hash, assinaturas, llm]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 17.7 Teoria dos Numeros e Criptografia Aplicada

## Overview

Teoria dos numeros sustenta criptografia moderna, que por sua vez sustenta
autenticacao, integridade, sigilo, e evidencias. Em sistemas com IA,
criptografia ganha um papel adicional: garantir que a "cadeia de decisao" e
rastreavel e que artefatos (prompts, respostas, logs, modelos, politicas) nao
foram adulterados.

Esta secao revisa conceitos essenciais (divisibilidade, congruencia, primos) e
conecta a engenharia pratica (chaves, assinaturas, hashing, autenticacao,
gerenciamento de segredos).

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Explicar por que congruencias e primos sao essenciais para criptografia de
   chave publica
2. Diferenciar hash, MAC, assinatura digital e criptografia (papel e garantias)
3. Mapear propriedades matematicas para propriedades de seguranca (integridade,
   nao-repudio)
4. Identificar riscos comuns em sistemas com LLM (exfiltracao de segredos,
   prompt injection) e mitigacoes criptograficas
5. Estruturar evidencia: logs assinados, hashing de artefatos, e trilhas
   auditaveis

## 7.1 Aritmetica Modular e Congruencia

Criptografia utiliza aritmetica modular para construir operacoes "faceis" em uma
direcao e "dificeis" na inversa (sob hipoteses). Congruencia (a ≡ b mod m) e o
vocabulário central.

## 7.2 Primos, Fatoracao e Dificuldade Computacional

Muitos esquemas historicos baseiam-se na dificuldade de fatoracao ou log
discreto. Mesmo com transicao para esquemas mais modernos, o raciocinio
matematico sobre "dificuldade" e parte da avaliacao de risco.

## 7.3 Hashing e Integridade de Artefatos

Hash criptografico permite:

- detectar alteracoes em arquivos/modelos/configuracoes
- enderecar conteudo (content-addressing)
- construir Merkle trees para logs e evidencias

Em pipelines com IA, isso e relevante para assegurar que o artefato avaliado e o
mesmo artefato implantado.

## 7.4 Assinaturas e Evidencia Auditavel

Assinaturas digitais e carimbos de tempo permitem:

- provar autoria/aprovacao (quando politicas exigem humano)
- preservar trilha de decisao
- suportar auditoria externa

## Practical Considerations

- Nao implemente criptografia "na mao"; use bibliotecas revisadas e padroes.
- Separe claramente autenticacao (quem) de autorizacao (o que) e registre ambos.
- Trate segredos como dados toxicos: minimize acesso do LLM e use
  enclaves/segregacao.

## Matriz de Avaliacao Consolidada

| Criterio                    | Descricao                                                              | Avaliacao |
| --------------------------- | ---------------------------------------------------------------------- | --------- |
| Descartabilidade Geracional | Fundamentos permanecem; algoritmos e parametros evoluem.               | Baixa     |
| Custo de Verificacao        | Medio: bibliotecas ajudam, mas auditoria e configuracao sao exigentes. | Medio     |
| Responsabilidade Legal      | Falhas de seguranca e integridade podem ter impacto legal alto.        | Critica   |

## Summary

- Aritmetica modular e primos sustentam criptografia e evidencias.
- Hashing e assinaturas sao mecanismos centrais de integridade e auditoria.
- Em sistemas com IA, criptografia ajuda a controlar segredos e preservar
  trilhas de decisao.

## References

1. Menezes, A.; van Oorschot, P.; Vanstone, S. Handbook of Applied Cryptography.
   CRC Press, 1996.
2. Katz, J.; Lindell, Y. Introduction to Modern Cryptography. 3rd ed. CRC Press,
   2020\.
3. NIST. Artificial Intelligence Risk Management Framework: Generative
   Artificial Intelligence Profile (NIST AI 600-1). July 2024.
   <https://doi.org/10.6028/NIST.AI.600-1>

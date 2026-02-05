---
title: 17.2 Tecnicas de Prova e Verificacao Formal
created_at: '2026-01-31'
tags: [fundamentos-matematicos, provas, verificacao-formal, metodos-formais, smt, model-checking, llm]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 17.2 Tecnicas de Prova e Verificacao Formal

## Overview

No SWEBOK classico, tecnicas de prova (deducao direta, contradicao, inducao) sao
ensinadas como base de rigor. No SWEBOK-AI, o foco passa a ser: como transformar
rigor em mecanismo operacional para sistemas que geram e modificam software
continuamente. Isso inclui provas humanas (para entendimento), mas enfatiza
verificacao automatizada, checagem de modelos e provas assistidas por
computador.

Esta secao liga tecnicas de prova ao pipeline de engenharia com IA: especificar,
gerar, checar, reparar, e registrar evidencia.

## Learning Objectives

Apos estudar esta secao, o leitor deve ser capaz de:

1. Reconhecer quando uma garantia exige prova formal versus testes/monitoramento
2. Selecionar tecnicas: SMT-based verification, model checking, proof
   assistants, e analise estatica
3. Estruturar invariantes e lemas para tornar a verificacao automatica mais
   viavel
4. Integrar verificacao como feedback para ciclos de reparo de codigo gerado por
   LLM
5. Diferenciar "provar especificacao" de "provar implementacao" e mapear riscos
   residuais

## 2.1 Tecnicas Classicas e Seu Papel Moderno

Provas diretas, por contradicao e por inducao continuam essenciais como
alfabetizacao de rigor. Em engenharia:

- Inducao aparece em corretude de algoritmos recursivos e invariantes de loops.
- Contradicao aparece em argumentacao de impossibilidade (por exemplo, limites
  de consistencia).

Mesmo quando a prova final e automatizada, entender essas tecnicas melhora a
qualidade das especificacoes e a decomposicao do problema.

## 2.2 Verificacao Automatizada: SMT, SAT e Analise de Programas

Ferramentas SMT e SAT permitem checar satisfatibilidade e consequencias logicas
de contratos e invariantes. Em um fluxo com LLM:

1. o modelo propoe codigo, especificacoes ou invariantes
2. uma ferramenta checa (SAT/SMT/model checker)
3. contraexemplos guiam reparo (prompt/patch)
4. evidencia e registrada (artefatos auditaveis)

O ganho central e reduzir dependencia de "parece correto" para "foi checado sob
um modelo e uma especificacao".

## 2.3 Model Checking e Sistemas Reativos

Model checking e particularmente util para protocolos, orquestradores de
agentes, pipelines de aprovacao e estados de seguranca. Em sistemas com
ferramentas (actions) e escalonamento humano, maquinas de estado e propriedades
temporais frequentemente capturam melhor o risco do que contratos locais.

## 2.4 Proof Assistants e Evidencia de Alto Rigor

Proof assistants (ex.: Coq, Isabelle, Lean) sao caros, mas entregam evidencias
fortes, valiosas quando:

- o componente e altamente reutilizado (bibliotecas criticas)
- o custo de falha e alto (seguranca, financeiro, safety)
- auditoria/regulacao exige rastreabilidade formal

Trabalhos recentes reforcam o uso de LLMs para auxiliar a encontrar invariantes
e esqueletos de prova, mantendo o verificador como autoridade.

## Practical Considerations

- Modele o que precisa ser provado: pre-condicoes, pos-condicoes, invariantes, e
  ambiente.
- Prefira especificacoes pequenas e composicionais; grandes propriedades
  monoliticas degradam a automatizacao.
- Trate contraexemplos como ativo: eles geram casos de teste, regras de
  guardrail e documentacao.
- Documente as hipoteses do modelo (abstracoes); provas sao condicionais a essas
  hipoteses.

## Matriz de Avaliacao Consolidada

| Criterio                    | Descricao                                                                | Avaliacao |
| --------------------------- | ------------------------------------------------------------------------ | --------- |
| Descartabilidade Geracional | Tecnicas e ferramentas mudam, mas a necessidade de evidencia formal nao. | Baixa     |
| Custo de Verificacao        | Alto: configuracao, manutencao de especificacoes e expertise.            | Alto      |
| Responsabilidade Legal      | Provas e evidencias podem ser exigencia regulatoria; falha e critica.    | Critica   |

## Summary

- Provas classicas sustentam a decomposicao de verificacao moderna.
- Verificacao automatizada vira guardrail operacional em pipelines com LLM.
- O verificador (SMT/MC/assistant) e a autoridade; a IA e o gerador de
  candidatos.

## References

1. Baier, C.; Katoen, J.-P. Principles of Model Checking. MIT Press, 2008.
2. Kroening, D.; Strichman, O. Decision Procedures: An Algorithmic Point of
   View. 2nd ed. Springer, 2016.
3. Clarke, E.; Grumberg, O.; Peled, D. Model Checking. MIT Press, 1999.
4. Microsoft Research. Finding Inductive Loop Invariants Using Large Language
   Models. 2024.
   <https://www.microsoft.com/en-us/research/publication/finding-inductive-loop-invariants-using-large-language-models/>
5. ASE 2024. LLM Meets Bounded Model Checking: Neuro-symbolic Loop Invariant
   Inference. 2024.
   <https://conf.researchr.org/details/ase-2024/ase-2024-research/33/LLM-Meets-Bounded-Model-Checking-Neuro-symbolic-Loop-Invariant-Inference>

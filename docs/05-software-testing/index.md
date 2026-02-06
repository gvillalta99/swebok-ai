---
title: 'KA 05 - Verificação e Validação em Escala: Visão Geral'
created_at: '2026-02-06'
tags: [ka-05, testing, verificacao, visao-geral]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# KA 05 - Verificação e Validação em Escala: Visão Geral

## Escopo

Este KA estabelece diretrizes de verificação e validação para sistemas não
determinísticos com componentes de IA, com ênfase em testabilidade, contratos e
invariantes, técnicas estatísticas, avaliação de agentes autônomos e governança
de qualidade. O objetivo é reduzir risco operacional e epistemológico em
ambientes nos quais a variabilidade de comportamento é parte intrínseca do
sistema.

## Mapa de Seções

1. [01 - Fundamentos de Verificação em Sistemas com IA](./01-fundamentos-verificacao-ia.md)
2. [02 - Técnicas de Teste para Código Gerado por LLMs](./02-tecnicas-teste-llm.md)
3. [03 - Testes Estatísticos e Não Determinísticos](./03-testes-estatisticos.md)
4. [04 - Verificação de Contratos e Invariantes](./04-verificacao-contratos.md)
5. [05 - Avaliação e Validação de Agentes Autônomos](./05-avaliacao-agentes.md)
6. [06 - Métricas e Governança de Qualidade em Testes](./06-metricas-governanca.md)

## Referências

1. IEEE Computer Society, *Software Engineering Body of Knowledge (SWEBOK)*,
   IEEE CS, 2025. Disponível em:
   <https://www.computer.org/education/bodies-of-knowledge/software-engineering>.
2. ISO/IEC/IEEE, \*ISO/IEC/IEEE 29119-1:2022 - Software and systems engineering
   - Software testing - Part 1: General concepts\*, ISO, 2022. Disponível em:
     <https://www.iso.org/standard/81291.html>.
3. ISO/IEC, *ISO/IEC TR 29119-11:2020 - Software and systems engineering -
   Software testing - Part 11: Guidelines on the testing of AI-based systems*,
   ISO, 2020. Disponível em: <https://www.iso.org/standard/79016.html>.
4. Tabassi, E., *Artificial Intelligence Risk Management Framework (AI RMF
   1.0)*, NIST AI 100-1, NIST, 2023. DOI: 10.6028/NIST.AI.100-1. Disponível em:
   <https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10>.
5. Liang, P. et al., *Holistic Evaluation of Language Models*, TMLR, 2023. DOI:
   10.48550/arXiv.2211.09110. Disponível em: <https://arxiv.org/abs/2211.09110>.
6. OpenAI, *OpenAI Evals (framework e benchmark registry)*, GitHub, 2026.
   Disponível em: <https://github.com/openai/evals>.

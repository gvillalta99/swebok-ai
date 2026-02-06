---
title: Qualidade Arquitetural em Sistemas com IA
created_at: '2025-05-21'
tags: [qa, qualidade, testes, metricas, swebok-ai]
status: in-progress
updated_at: '2026-02-06'
ai_model: claude-3.5-sonnet
---

# 6. Qualidade Arquitetural em Sistemas com IA

## Visão Geral

Em sistemas de software tradicionais, qualidade é frequentemente associada à
conformidade com requisitos funcionais e de desempenho (ISO/IEC 25010). Em
sistemas com IA, essa definição se expande para incluir dimensões
probabilísticas e, em alguns casos, subjetivas. Um sistema pode manter bom
desempenho operacional e, ainda assim, produzir respostas plausíveis, porém
factualmente incorretas.

Esta seção revisita os atributos de qualidade na era dos LLMs, com foco em
corretude factual, alinhamento, robustez estocástica e avaliação contínua.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Definir** métricas de qualidade específicas para IA Generativa, como
   Alucinação, Fidelidade e Relevância.
2. **Implementar** pipelines de avaliação contínua (Evals) como parte do CI/CD.
3. **Balancear** o trade-off triplo: Custo, Latência e Qualidade.

## 6.1 Novos Atributos de Qualidade

Além de Performance e Disponibilidade, arquitetos devem monitorar:

- **Fidelidade (Faithfulness)**: A resposta é fiel ao contexto fornecido?
  (Crucial para RAG).
- **Relevância de Resposta**: A resposta atende à dúvida do usuário sem
  verbosidade desnecessária?
- **Robustez a Injeção**: O sistema mantém suas instruções originais sob ataque?
- **Consistência**: O sistema fornece respostas similares para perguntas
  semanticamente idênticas?

## 6.2 Avaliação Automatizada (LLM-as-a-Judge)

Como avaliar qualidade subjetiva em escala? Uma abordagem recorrente é usar um
LLM para avaliar outro, com critérios explícitos e amostras de referência
humana.

### Padrão de Juiz Sintético

- **Mecanismo**: Um modelo "Juiz" (geralmente maior e mais capaz, ex: GPT-4)
  recebe a pergunta, o contexto e a resposta do modelo "Aluno" e atribui uma
  nota com justificativa.
- **Frameworks**: RAGAS (Retrieval Augmented Generation Assessment), DeepEval.
- **Aplicação**: Regressão semântica em CI/CD. Quedas estatisticamente
  relevantes de pontuação podem bloquear o build.
- **Risco e mitigação**: Juízes automáticos apresentam vieses (posição,
  verbosidade, preferência por estilo). Use calibragem periódica com avaliação
  humana.

## 6.3 O Triângulo de Trade-offs

Em IA, você pode otimizar apenas dois:

1. **Qualidade**: Uso de modelos maiores (GPT-4, Claude 3 Opus),
   Chain-of-Thought, RAG complexo.
2. **Latência**: Modelos menores, streaming, poucas etapas de raciocínio.
3. **Custo**: Modelos quantizados, cache semântico, menos tokens.

*Estratégia Arquitetural*: Use "Model Cascading". Comece com um modelo rápido e
barato. Se a confiança for baixa, escale para um modelo lento e caro.

## Considerações Práticas

### Testes em Produção

Diferente de software tradicional, o "comportamento" do modelo pode mudar (model
drift) mesmo sem deploy de código.

- **Monitoramento**: Acompanhe métricas de feedback do usuário (thumbs up/down)
  e taxa de reescrita (quantas vezes o usuário refaz a pergunta).

### Dataset de Ouro (Golden Set)

Manter um conjunto curado de exemplos (por exemplo, 50-100 pares de
pergunta-resposta de alta qualidade) é uma prática recomendada para calibrar
métricas automáticas e comparar versões de prompts, modelos e pipelines.

## Resumo

- A qualidade em IA é multidimensional e inclui precisão factual, utilidade e
  adequação ao contexto.
- Testes determinísticos de igualdade textual são insuficientes para geração
  livre; complemente com avaliação semântica e rubricas explícitas.
- Avaliação contínua (Evals) assume papel equivalente ao de testes de integração
  em sistemas tradicionais.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                               | Avaliação                                                                                         |
| ------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta prática será obsoleta em 36 meses? | **Baixa**. Modelos melhorarão, mas a necessidade de avaliar sua adequação ao negócio permanecerá. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?    | **Alto**. Executar LLM-as-a-Judge em grande escala é computacionalmente caro.                     |
| **Responsabilidade Legal**      | Quem responde pelo erro?                | **Crítica**. Garantir qualidade é a linha de defesa contra liability de produtos defeituosos.     |

## Ver também

- [KA 01 - Engenharia de Restrições e Contexto](../01-software-requirements/index.md)
- [KA 03 - Design de Sistemas Híbridos](../03-software-design/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. ES, S.; JAMES, J.; ESPINOSA-ANKE, L.; SCHOCKAERT, S. *RAGAS: Automated
   Evaluation of Retrieval Augmented Generation*. arXiv:2309.15217, 2023. Versão
   publicada: EACL Demo, 2024.
2. LIANG, P. et al. *Holistic Evaluation of Language Models*. arXiv:2211.09110,
   2022\. Publicado em: Transactions on Machine Learning Research (TMLR), 2023.
3. ZHENG, L. et al. *Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena*.
   NeurIPS 2023 (Datasets and Benchmarks Track). arXiv:2306.05685.
4. HUGGING FACE. *Open LLM Leaderboard - About/Methodology*. Disponível em:
   <https://huggingface.co/docs/leaderboards/en/open_llm_leaderboard/about>.
   Acesso em: 2026-02-06.
5. ISO/IEC. *ISO/IEC 25010:2011 - Systems and software engineering - Systems and
   software Quality Requirements and Evaluation (SQuaRE) - System and software
   quality models*. Geneva: ISO, 2011.

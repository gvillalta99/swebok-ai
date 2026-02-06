---
title: 'Apêndice D: Glossário de Termos de IA para Engenharia de Software'
created_at: '2026-02-05'
tags: [apendice, glossario, llm, rag, agentes, swebok-ai]
status: in-progress
updated_at: '2026-02-05'
ai_model: kimi-k2.5
---

# Apêndice D: Glossário de Termos de IA para Engenharia de Software

## Overview

Este glossário define termos que se tornaram operacionais para engenheiros de
software ao construir, integrar e governar sistemas com componentes de IA (LLMs
e Agentes). O objetivo não é esgotar a teoria acadêmica, mas reduzir a
ambiguidade em requisitos, arquitetura, testes e operações.

## Learning Objectives

Após estudar este glossário, o leitor deve ser capaz de:

1. **Usar terminologia consistente** em documentos de arquitetura e contratos de
   nível de serviço (SLA).
2. **Diferenciar** conceitos de modelo (ex: *temperature*) de conceitos de
   sistema (ex: *circuit breaker*).
3. **Identificar** métricas de engenharia associadas a cada termo (ex: *context
   window* afeta custo e latência).

## D.1 Fundamentos de LLMs

Termos essenciais para entender a interface de entrada e saída dos modelos.

- **Token / Tokenização:** Unidade atômica de processamento do modelo (não é
  igual a palavra). Para engenharia, define o custo e os limites de buffer.
- **Embedding / Vector Embedding:** Representação numérica (vetor) de um dado
  (texto, imagem) que captura seu significado semântico. Base para busca e
  classificação.
- **Prompt / Prompt Engineering:** O input textual fornecido ao modelo. Em
  engenharia, deve ser tratado como código (versionado, testado).
- **Context Window:** O limite máximo de tokens que o modelo pode processar em
  uma única inferência (input + output). É a principal restrição de memória de
  curto prazo.
- **Temperature / Top-p:** Parâmetros de inferência que controlam o
  determinismo. *Temperature* 0 força a resposta mais provável (melhor para
  código/dados); valores altos aumentam a "criatividade" (e o risco de
  alucinação).
- **Hallucination (Alucinação):** Geração de conteúdo factualmente incorreto ou
  sem base no contexto, mas linguisticamente plausível. Ocorre porque o modelo
  prevê o próximo token, não a "verdade".
- **Fine-tuning:** Re-treinamento leve de um modelo pré-treinado em um dataset
  específico para especializar seu comportamento ou estilo.
- **RLHF (Reinforcement Learning from Human Feedback):** Técnica de alinhamento
  onde o modelo é treinado para maximizar uma recompensa baseada em preferências
  humanas (usado para tornar modelos "chatbots" úteis e seguros).

## D.2 Arquitetura e Modelos

Termos sobre a estrutura interna e tipos de modelos.

- **Transformer:** A arquitetura de rede neural que tornou os LLMs possíveis,
  baseada inteiramente em mecanismos de atenção.
- **Attention Mechanism (Atenção):** Algoritmo que permite ao modelo ponderar a
  importância de diferentes palavras no contexto ao gerar uma resposta.
- **Encoder / Decoder:** Componentes do Transformer. *Encoder* processa input
  (bom para classificação/busca); *Decoder* gera output (bom para texto
  criativo). LLMs modernos (GPT) são frequentemente *Decoder-only*.
- **Pre-training:** A fase massiva e cara de treinamento em trilhões de tokens
  para aprender a estrutura da linguagem e conhecimento geral.
- **Foundation Model:** Um modelo treinado em escala ampla que pode ser adaptado
  para muitas tarefas downstream (ex: GPT-4, Claude, Llama).
- **LLM (Large Language Model):** Modelos com bilhões de parâmetros (ex: >7B).
- **SLM (Small Language Model):** Modelos menores (ex: \<3B) otimizados para
  rodar localmente ou em *edge*, com menor custo e latência.

## D.3 RAG e Recuperação

Termos para sistemas que conectam LLMs a dados privados.

- **RAG (Retrieval-Augmented Generation):** Padrão de arquitetura onde o sistema
  busca dados relevantes (Retrieval) e os insere no prompt (Generation) para
  aterrar a resposta em fatos.
- **Vector Database:** Banco de dados otimizado para armazenar e buscar
  embeddings. Suporta busca por similaridade semântica, não apenas
  palavra-chave.
- **Semantic Search:** Busca baseada no significado da query, não na
  correspondência exata de caracteres.
- **Similarity Metric (Cosine Similarity):** Fórmula matemática usada para medir
  quão parecidos são dois vetores. Cosseno é o padrão para texto.
- **Chunking:** Estratégia de quebrar documentos longos em pedaços menores para
  indexação. O tamanho do chunk afeta a precisão da recuperação.
- **Indexing:** Processo de ingerir, limpar, chunkar e vetorizar dados para
  torná-los buscáveis.

## D.4 Agentes e Orquestração

Termos para sistemas onde o LLM decide o fluxo de controle.

- **AI Agent (Agente):** Sistema onde o LLM atua como motor de raciocínio,
  decidindo quais ações tomar para atingir um objetivo. Possui: Perfil, Memória,
  Planejamento e Ferramentas.
- **Function Calling / Tool Use:** Capacidade do modelo de emitir um output
  estruturado (JSON) solicitando a execução de uma função externa (ex: consultar
  API de clima).
- **Multi-agent System:** Arquitetura onde múltiplos agentes especializados
  colaboram (ex: um pesquisa, outro escreve, outro revisa).
- **Agentic Workflow:** Fluxo de trabalho onde as transições de estado são
  decididas dinamicamente pelo modelo, em oposição a um workflow rígido
  (hardcoded).
- **ReAct (Reason + Act):** Padrão de prompting onde o modelo gera um
  "Pensamento" (Raciocínio) antes de gerar uma "Ação".
- **Chain-of-Thought (CoT):** Técnica de prompting que instrui o modelo a
  "pensar passo a passo", melhorando drasticamente o desempenho em lógica e
  matemática.

## D.5 Verificação e Validação

Termos sobre qualidade e teste em sistemas probabilísticos.

- **Non-deterministic / Stochastic System:** Sistema onde o mesmo input pode
  gerar outputs diferentes. Exige testes estatísticos, não apenas asserções
  exatas.
- **Verification (Verificação):** "Estamos construindo o produto corretamente?"
  (O código faz o que deve?).
- **Validation (Validação):** "Estamos construindo o produto certo?" (A resposta
  do modelo é útil para o usuário?). Em IA, a validação é frequentemente mais
  difícil que a verificação.
- **AI Testing:** Disciplina emergente de teste de propriedades de IA (robustez,
  viés, alinhamento).
- **Model Evaluation (Eval):** Processo de medir a qualidade do modelo usando
  datasets de benchmark (ex: MMLU, HumanEval) ou avaliação
  humana/LLM-as-a-Judge.
- **Bias Detection:** Identificação de preconceitos sistemáticos nas respostas
  do modelo (demográficos, políticos, etc.).

## D.6 Economia e Infraestrutura

Termos sobre o custo e operação de sistemas de IA.

- **Inference Cost:** O custo computacional (e financeiro) de gerar uma
  resposta. Geralmente medido por 1k tokens.
- **Token Pricing:** Modelo de cobrança de APIs (input tokens são mais baratos
  que output tokens).
- **Rate Limiting (RPM/TPM):** Limites de requisições por minuto ou tokens por
  minuto impostos por provedores de API. Gargalo comum em sistemas de produção.
- **Quantization:** Técnica de reduzir a precisão dos pesos do modelo (ex: de
  16-bit para 4-bit) para reduzir uso de memória e aumentar velocidade, com
  pequena perda de qualidade.
- **Edge AI:** Execução de modelos diretamente no dispositivo do usuário
  (celular, laptop), sem enviar dados para a nuvem (privacidade + latência
  zero).

## Practical Considerations

- **Não invente definições:** Use os termos deste glossário para evitar "Torre
  de Babel" na equipe.
- **Contexto importa:** "Alucinação" é ruim em um assistente médico, mas pode
  ser "criatividade" em um assistente de escrita de ficção.
- **Domine a economia:** Entender *tokens* e *quantization* é essencial para
  viabilidade financeira do projeto.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                               | Avaliação                    |
| :------------------------------ | :-------------------------------------- | :--------------------------- |
| **Descartabilidade Geracional** | Estes termos mudarão em 36 meses?       | Média (Conceitos base ficam) |
| **Custo de Verificação**        | Custo de manter o glossário atualizado? | Baixo                        |
| **Responsabilidade Legal**      | Impacto de ambiguidade contratual?      | Alto                         |

## Summary

- Este glossário foca em definições operacionais para engenharia.
- Entender a distinção entre parâmetros de modelo e arquitetura de sistema é
  crucial.
- A economia dos tokens dita muitas decisões de arquitetura.

## References

1. **Zhao, W.X., et al.** "A Survey of Large Language Models." *arXiv*, 2024.
2. **Gao, Y., et al.** "Retrieval-Augmented Generation for Large Language
   Models: A Survey." *arXiv*, 2024.
3. **Wang, L., et al.** "A Survey on Large Language Model based Autonomous
   Agents." *Frontiers of Computer Science*, 2024.
4. **ISO/IEC.** *ISO/IEC 22989:2022 — Artificial intelligence concepts and
   terminology*. 2022.

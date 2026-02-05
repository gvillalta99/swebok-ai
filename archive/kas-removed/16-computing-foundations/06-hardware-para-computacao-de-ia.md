---
title: "16.6 Hardware para Computacao de IA"
created_at: "2026-01-31"
tags: ["fundamentos-computacao", "hardware", "gpu", "tpu", "npu", "quantizacao", "memoria", "inferencia"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 16.6 Hardware para Computacao de IA

## Overview
O custo e a viabilidade de sistemas baseados em LLMs sao, em grande parte, determinados por hardware: throughput de multiplicacao de matrizes, largura de banda de memoria, hierarquia de caches, interconexoes e suporte a precisao reduzida (por exemplo, BF16/FP16/FP8/INT8/INT4). Para o SWEBOK-AI v5.0, “fundamentos de computacao” inclui compreender por que inferencia e frequentemente limitada por memoria (nao por FLOPs), como KV-cache consome HBM/DRAM, e como escolhas de precisao e batching mudam custo marginal por token.

Esta secao organiza o que um engenheiro de software precisa saber para dimensionar e operar sistemas IA-intensive sem cair em simplificacoes (por exemplo, assumir que “mais GPU” resolve qualquer problema) e sem delegar totalmente a decisao a fornecedores.

## Learning Objectives
Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar por que LLMs estressam memoria e interconexao, e nao apenas computacao.
2. Diferenciar GPU, TPU e NPU/ASIC em termos de trade-offs (flexibilidade vs eficiencia).
3. Descrever o papel de quantizacao e precisao reduzida no custo de inferencia.
4. Relacionar KV-cache, batching e latencia token-a-token a requisitos de produto e SLOs.
5. Definir criterios de escolha de hardware/infra para um workload de LLM (treinamento vs inferencia, online vs batch, edge vs datacenter).

## O gargalo: movimentacao de dados
Em LLMs, grande parte do tempo e energia e consumida movendo dados (pesos, ativacoes, KV-cache) pela hierarquia de memoria. Implicacoes:

- otimizacoes de kernel (por exemplo, FlashAttention) buscam reduzir leituras/escritas;
- quantizacao reduz bytes movimentados e pode aumentar throughput efetivo;
- designs de hardware priorizam HBM e interconexoes rapidas.

## Tipos de aceleradores
### GPUs
GPUs oferecem alta flexibilidade e ecossistema maduro. Sao dominantes em treino e inferencia, especialmente quando combinadas com bibliotecas otimizadas.

### TPUs
TPUs e ASICs similares priorizam eficiencia para workloads de tensores. Em nuvem, documentacoes de TPUs descrevem arquitetura, memoria e interconexao pensadas para transformers, incluindo configuracoes de pod.

### NPUs e outros ASICs
NPUs (em dispositivos) e ASICs (em datacenter) buscam reduzir energia e custo por inferencia. Para engenharia, sao relevantes quando o requisito e latencia/privacidade no edge ou quando o volume de inferencia justifica especializacao.

## Precisao reduzida e quantizacao
Precisao reduzida e uma das alavancas mais efetivas de TCO:

- **BF16/FP16**: padrao de mercado para treino/inferencia.
- **FP8**: aumenta throughput, exige cuidado com estabilidade numerica.
- **INT8/INT4**: reduz memoria e pode aumentar throughput; pode degradar qualidade se mal calibrado.

Em engenharia, quantizacao deve ser tratada como mudanca de contrato de qualidade: precisa de avaliacao com dataset representativo e de rollback rapido.

## Inferencia: KV-cache, batching e caudas de latencia
LLMs autoregressivos tem dois regimes:

1. **Prefill**: processa entrada (prompt) e preenche KV-cache.
2. **Decode**: gera tokens incrementalmente, consultando KV-cache.

Batching aumenta throughput, mas pode piorar p95/p99 de latencia. Sistemas de serving precisam equilibrar:

- tempo de resposta interativo;
- custo por token;
- fairness entre usuarios;
- limites de memoria (KV-cache por sessao).

## Practical Considerations
- **Modele o custo por token**: inclua prefill + decode, caches e retries; custos reais raramente sao lineares.
- **Escolha por workload**: treinamento e inferencia tem perfis diferentes; “um cluster unico” pode ser ineficiente.
- **Energia e sustentabilidade**: energia e parte do TCO; use metricas (J/token, $/milhao de tokens) para comparar alternativas.
- **Planeje degradacao**: quando hardware satura, degrade com limites de contexto, filas, ou modo “somente recuperacao” (sem geracao longa).

## Matriz de Avaliação Consolidada
| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Summary
- Hardware para IA e limitado por memoria/interconexao; FLOPs isoladamente nao explicam latencia/custo.
- GPUs, TPUs e ASICs trocam flexibilidade por eficiencia; escolha deve seguir o perfil do workload.
- Quantizacao e precisao reduzida reduzem TCO, mas exigem avaliacao e governanca.
- Serving de LLM depende de balancear batching, KV-cache e SLOs de latencia (p95/p99).

## References
1. AMD. AMD CDNA 3 Architecture White Paper. 2024. Disponivel em: https://amd.com/content/dam/amd/en/documents/instinct-tech-docs/white-papers/amd-cdna-3-white-paper.pdf. Acesso em: 31 jan. 2026.
2. GOOGLE CLOUD. TPU v5e: Architecture and configurations. Documentacao tecnica, 2025. Disponivel em: https://cloud.google.com/tpu/docs/v5e. Acesso em: 31 jan. 2026.
3. SHAH, Jay; et al. FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision. arXiv, 2024. Disponivel em: https://arxiv.org/abs/2407.08608. Acesso em: 31 jan. 2026.

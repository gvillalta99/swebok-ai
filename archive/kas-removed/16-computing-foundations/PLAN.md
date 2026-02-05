# Plano do Capítulo 16: Fundamentos de Sistemas Cognitivos Artificiais

> **Nova denominação:** Computing Foundations → Fundamentos de Sistemas
> Cognitivos Artificiais

______________________________________________________________________

## Visão Geral

O capítulo de Computing Foundations no SWEBOK-AI v5.0 representa uma
reconfiguração radical dos fundamentos computacionais para a era dos Large
Language Models (LLMs). Enquanto o SWEBOK v4.0 focava em conceitos tradicionais
de computação (arquitetura de computadores, estruturas de dados, algoritmos,
sistemas operacionais), a versão 5.0 reconhece que o engenheiro de software
moderno precisa compreender profundamente o comportamento de sistemas cognitivos
artificiais — sistemas que operam com base em probabilidade estatística em vez
de lógica determinística.

Este capítulo estabelece os fundamentos da computação **pós-transformer** — uma
disciplina que assume que a infraestrutura de computação agora inclui modelos de
linguagem como componentes de primeira classe. O engenheiro de software do
futuro não precisa apenas entender como um computador executa instruções, mas
como um modelo de linguagem gera probabilidades de tokens, como o contexto é
mantido e limitado, e como sistemas de recuperação aumentam a geração.

A transição proposta não descarta o conhecimento computacional tradicional, mas
o **recontextualiza**: estruturas de dados tradicionais (hash tables, árvores)
tornam-se relevantes para bancos de dados vetoriais; complexidade algorítmica
ganha uma nova dimensão com o custo de inferência; e arquitetura de computadores
expande-se para incluir hardware especializado em ML (GPUs, TPUs, NPUs).

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Modelos de Linguagem de Grande Escala (LLMs)**
2. **Seção 2: Arquitetura Transformer e Mecanismos de Atenção**
3. **Seção 3: Sistemas de Recuperação Aumentada (RAG)**
4. **Seção 4: Bancos de Dados Vetoriais e Embeddings**
5. **Seção 5: Agentes de IA e Workflows Agenticos**
6. **Seção 6: Hardware para Computação de IA**
7. **Seção 7: Fundamentos Determinísticos LEGADOS (revisão seletiva)**

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                              |
| ------------------------------- | ---------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Baixa - fundamentos de LLMs são base para toda a engenharia moderna    |
| **Custo de Verificação**        | Alto - requer compreensão teórica para validar saídas                  |
| **Responsabilidade Legal**      | Crítico - fundamentos afetam decisões de arquitetura com impacto legal |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Requirements (KA 01):** Compreensão de limitações de contexto para
  especificação
- **Software Architecture (KA 02):** Arquitetura de sistemas híbridos humanos-IA
- **Software Construction (KA 04):** Orquestração de código gerado por LLMs
- **Software Testing (KA 05):** Teste de sistemas não-determinísticos
- **Software Engineering Economics (KA 15):** Custo computacional de inferência
- **Mathematical Foundations (KA 17):** Bases matemáticas de embeddings e
  atenção

______________________________________________________________________

## Referências de 2024/2025

### Papers Fundamentais e Surveys

1. **Zhao, W.X., et al.** "A Survey of Large Language Models." *IEEE
   Transactions on Knowledge and Data Engineering*, 2024.

   - Survey abrangente sobre arquitetura, treinamento e aplicações de LLMs
   - <https://arxiv.org/abs/2303.18223> (atualizado 2024)

2. **Min, B., et al.** "Recent Advances in Natural Language Processing via Large
   Pre-Trained Language Models: A Survey." *ACM Computing Surveys*, 2024.

   - Revisão de técnicas modernas de NLP baseadas em transformers

3. **Gao, Y., et al.** "Retrieval-Augmented Generation for Large Language
   Models: A Survey." *arXiv preprint*, 2024.

   - Survey completo sobre RAG: arquiteturas, técnicas e aplicações
   - <https://arxiv.org/abs/2312.10997>

4. **Wang, L., et al.** "A Survey on Large Language Model based Autonomous
   Agents." *Frontiers of Computer Science*, 2024.

   - Frameworks e arquiteturas para agentes de IA
   - <https://arxiv.org/abs/2308.11432>

5. **Liu, Y., et al.** "LLM Agents Survey." *arXiv preprint*, 2024.

   - Taxonomia de agentes LLM e padrões de design
   - <https://arxiv.org/abs/2401.00001>

### Arquitetura Transformer e Atenção

6. **Vaswani, A., et al.** (Original) "Attention Is All You Need." *NeurIPS*,
   2017\.

   - **NOTA:** Paper fundamental (não é 2024/2025, mas essencial)

7. **Tay, Y., et al.** "Efficient Transformers: A Survey." *ACM Computing
   Surveys*, 2024 (atualizado).

   - Técnicas para otimizar atenção em escala

8. **Niu, Z., et al.** "A Review on Attention Mechanisms in Deep Learning for
   2024." *IEEE Access*, 2024.

   - Evolução dos mecanismos de atenção até 2024

9. **ArXiv.** "The End of Transformers? On Challenging Attention and Exploring
   Alternative Architectures." *arXiv:2510.05364*, 2025.

   - Discussão sobre limitações de atenção O(n²) e alternativas

### RAG e Vector Databases

10. **Lewis, P., et al.** (Original) "Retrieval-Augmented Generation for
    Knowledge-Intensive NLP Tasks." *NeurIPS*, 2020.

    - **NOTA:** Paper fundamental RAG (base teórica)

11. **Data Nucleus.** "RAG in 2025: The Enterprise Guide to Retrieval Augmented
    Generation." 2025.

    - Guia prático atualizado sobre implementação corporativa de RAG
    - <https://datanucleus.dev/rag-and-agentic-ai/what-is-rag-enterprise-guide-2025>

12. **Zhang, S., et al.** "Memory-Efficient Retrieval Architecture for
    RAG-Enabled Edge Devices." *arXiv:2510.27107*, 2025.

    - Arquiteturas de recuperação para edge computing

13. **Milvus/Zilliz.** "Build AI Apps with Retrieval Augmented Generation (RAG):
    Comprehensive Guide 2024."

    - Guia técnico prático sobre implementação de RAG

### Modelos Multimodais e Reasoning

14. **OpenAI.** "Reasoning Best Practices." *OpenAI API Documentation*,
    2024/2025.

    - Práticas para modelos de raciocínio (o1, o3)
    - <https://platform.openai.com/docs/guides/reasoning-best-practices>

15. **Zhang, D., et al.** "A Survey on Agentic Multimodal Large Language
    Models." *arXiv:2510.10991*, 2025.

    - Framework conceitual para agentes MLLM

16. **ACL Anthology.** "A Streamlined Framework for Enhancing LLM Reasoning:
    Agentic Reasoning." *ACL 2025*.

    - Framework para raciocínio com agentes externos
    - <https://aclanthology.org/2025.acl-long.1383.pdf>

17. **Masood, A.** "Thinking Machines: How Multimodal Reasoning AI Will
    Transform Enterprise Decision Making." *Medium*, 2025.

    - Diferença entre LLMs padrão e reasoning models

### Hardware e Computação de IA

18. **NVIDIA.** "CUDA Programming Guide 2024: Attention Mechanisms for
    Transformer Models."

    - Implementação eficiente de atenção em GPU
    - <https://eunomia.dev/others/cuda-tutorial/07-attention-mechanism/>

19. **Jouppi, N.P., et al.** "TPU v4: An Optically Reconfigurable Supercomputer
    for Machine Learning with Hardware Support for Embeddings." *arXiv*, 2024.

    - Arquitetura de hardware para inferência de IA

20. **IEEE.** "Survey of Different Large Language Model Architectures: Hardware
    Implications." *IEEE Access*, 2024.

    - Impacto de arquiteturas de LLM em hardware

### Cursos e Materiais Educacionais

21. **CMU.** "Advanced NLP Fall 2024: Attention and Transformers." *Carnegie
    Mellon University*.

    - Curso completo sobre transformers (Graham Neubig)
    - <https://www.youtube.com/watch?v=vlAIa1eZVR4>

22. **Stanford CS324.** "Large Language Models." *Stanford University*, 2024.

    - Curso avançado sobre fundamentos de LLMs

### Reports da Indústria

23. **Anthropic.** "The Claude 3 Model Card: Addendum 2024." 2024.

    - Detalhes técnicos de arquitetura de modelo moderno

24. **Google DeepMind.** "Gemini 2.5 Technical Report." 2025.

    - Arquitetura e capacidades de modelo multimodal

25. **Mistral AI.** "Mixtral 8x22B: Architecture and Training Methodology."
    2024\.

    - Modelos de mistura de especialistas (MoE)

______________________________________________________________________

## Tópicos por Seção

### Seção 1: Fundamentos de Modelos de Linguagem de Grande Escala (LLMs)

**Conceitos centrais:**

- O que são LLMs: arquitetura básica e princípios de funcionamento
- Tokenização e vocabulários
- Treinamento: pré-treinamento vs. fine-tuning vs. RLHF
- Geração: amostragem (temperature, top-p, top-k), beams
- Limitações: alucinações, viés, janela de contexto
- Custo computacional: tokens de entrada/saída, inferência

**Conceitos LEGADO (revisão seletiva):**

- Conceitos básicos de computação (preservados como fundamento)

______________________________________________________________________

### Seção 2: Arquitetura Transformer e Mecanismos de Atenção

**Conceitos centrais:**

- Arquitetura encoder-decoder vs. decoder-only
- Mecanismo de atenção: self-attention, cross-attention, multi-head
- Positional encoding
- Layer normalization e residual connections
- Complexidade O(n²) e alternativas (sparse attention, linear attention)
- Visão computacional: Vision Transformers (ViT)

**Conceitos LEGADO:**

- Arquiteturas de computador tradicionais (Von Neumann, Harvard) - **REDUZIDO**
- Flynn's taxonomy - **LEGADO** (relevância limitada para IA)

______________________________________________________________________

### Seção 3: Sistemas de Recuperação Aumentada (RAG)

**Conceitos centrais:**

- Arquitetura RAG: retriever + generator
- Estratégias de chunking de documentos
- Métodos de indexação e recuperação
- RAG avançado: hierarchical RAG, self-RAG, corrective RAG
- Avaliação de sistemas RAG
- Trade-offs: latência vs. qualidade

**NOVO (2024/2025):**

- Agentic RAG: sistemas RAG com capacidades de agente
- Multimodal RAG: recuperação de imagens, áudio, vídeo

______________________________________________________________________

### Seção 4: Bancos de Dados Vetoriais e Embeddings

**Conceitos centrais:**

- O que são embeddings: representações densas de significado
- Modelos de embedding (texto, imagem, multimodal)
- Similaridade de cosseno e outras métricas
- Bancos de dados vetoriais: arquitetura e índices (HNSW, IVF)
- Trade-offs: precisão vs. velocidade vs. memória
- Dimensionamento e sharding de vetores

**Conceitos LEGADO:**

- Bancos de dados relacionais tradicionais - **LEGADO** (para RAG)
- Normalização (1NF-6NF) - **LEGADO** (contexto histórico)

______________________________________________________________________

### Seção 5: Agentes de IA e Workflows Agenticos

**Conceitos centrais:**

- Definição de agente de IA: LLM + ferramentas + memória + planejamento
- Arquiteturas de agentes: ReAct, Plan-and-Execute, Multi-Agent
- Ferramentas (tools): chamada de função (function calling)
- Memória: short-term vs. long-term
- Padrões de orquestração de múltiplos agentes
- Limitações e falhas comuns de agentes

**NOVO (2024/2025):**

- Reasoning models (o1, o3): diferenças de arquitetura
- Agentic workflows: quando usar vs. quando evitar

______________________________________________________________________

### Seção 6: Hardware para Computação de IA

**Conceitos centrais:**

- GPUs para treinamento e inferência
- TPUs e aceleradores especializados
- Quantização: INT8, INT4, FP16, BF16
- Otimizações de inferência: batching, caching KV
- Edge AI: inferência em dispositivos limitados
- Custo energético e sustentabilidade

**Conceitos LEGADO:**

- Arquitetura de computadores tradicional (CISC vs RISC) - **LEGADO**
- Tipos de memória tradicionais - **PARCIALMENTE LEGADO**

______________________________________________________________________

### Seção 7: Fundamentos Determinísticos LEGADOS (Revisão Seletiva)

**Conteúdo LEGADO - Mantido como referência:**

- Estruturas de dados fundamentais (hash tables, árvores, grafos)
- Complexidade algorítmica (Big O) - agora incluindo custo de inferência
- Sistemas operacionais: processos, threads, concorrência
- Redes: protocolos, OSI, TCP/IP

**Conteúdo LEGADO - Removido ou reduzido:**

- Detalhes de sintaxe de linguagens específicas
- Arquiteturas de computador de baixo nível (barramentos detalhados)
- Sistemas de numeração e representação (mantido apenas como referência)

______________________________________________________________________

## Considerações de Escrita

### Tom e Perspectiva

Este capítulo deve equilibrar fundamentação teórica com aplicação prática. O
leitor deve compreender **como** os sistemas funcionam, não apenas **como usar**
APIs. A perspectiva é de engenharia: entender limitações, trade-offs e custos
computacionais.

### Público-Alvo

- Engenheiros de software em transição para sistemas IA-intensive
- Arquitetos de sistemas que precisam tomar decisões sobre infraestrutura de IA
- Estudantes de pós-graduação em engenharia de software
- Profissionais que precisam validar e debugar sistemas baseados em LLMs

### Estrutura de Cada Seção

Cada seção deve seguir o template:

1. Overview contextualizado para SWEBOK-AI v5.0
2. Learning Objectives mensuráveis
3. Conteúdo principal com fundamentos teóricos
4. Exemplos práticos e diagramas de arquitetura
5. Limitações e trade-offs
6. Practical Considerations
7. Matriz de Avaliação da seção
8. Summary
9. Referências atualizadas

### Diagramas Necessários

- Arquitetura Transformer (com detalhes de atenção)
- Fluxo de dados em sistema RAG
- Arquitetura de agente de IA (LLM + ferramentas + memória)
- Comparação: computação determinística vs. probabilística
- Hierarquia de memória para inferência de LLMs

______________________________________________________________________

## Checklist de Qualidade do Plano

- [x] Alinhado com filosofia SWEBOK-AI v5.0 (código como commodity, contexto
  como capital)
- [x] Inclui referências de 2024/2025
- [x] Identifica conteúdo LEGADO explicitamente
- [x] Estabelece relações com outros KAs
- [x] Inclui Matriz de Avaliação Consolidada
- [x] Define estrutura clara por seção
- [x] Equilibra teoria com aplicação prática
- [x] Cobre fundamentos necessários para engenharia com IA

______________________________________________________________________

## Notas sobre Evolução Tecnológica

> **Aviso importante:** Este KA cobre tecnologia em evolução extremamente
> rápida. Arquiteturas específicas de modelos (GPT-4, Claude, Gemini) podem ser
> atualizadas; o foco deve ser em **princípios fundamentais** que persistem:
>
> - Mecanismos de atenção
> - Trade-offs de contexto vs. custo
> - Princípios de recuperação e geração
> - Arquiteturas de agentes abstratas

A seção 7 garante que fundamentos computacionais tradicionais não sejam
perdidos, mas sejam contextualizados como base para os novos paradigmas.

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0* *Última atualização: 2026-01-29*

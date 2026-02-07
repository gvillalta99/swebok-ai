---
title: Plano de Escrita - KA 15 Software Engineering Economics (SWEBOK-AI v5.0)
created_at: 2026-02-09
tags: [software-economics, finops, ai-economics, build-vs-buy, roi, KA-15, planning]
status: planning
updated_at: 2026-02-09
ai_model: k2p5
agent: book-editor
---

# Plano de Escrita: KA 15 - Software Engineering Economics

**KA:** 15 - Software Engineering Economics\
**Status:** Planejamento Completo → Pronto para Fase de Rascunho\
**Princípio Orientador:** "A inteligência tornou-se uma utility; a restrição econômica migrou de Labor (Talento) para Compute (Inferência)."

______________________________________________________________________

## Visão Geral do KA

Este KA redefine a economia da engenharia de software para a era da IA Generativa. O foco deixa de ser puramente o custo do desenvolvimento (Salário/Hora) e passa a incorporar o custo operacional da inteligência (Token/Inferência). Aborda a transição de *Capital Expenditure* (Capex) em contratações para *Operational Expenditure* (Opex) em computação, e como CTOs devem navegar o trade-off entre construir modelos proprietários e alugar inteligência via APIs.

______________________________________________________________________

## Estrutura Completa do KA

### Seção 1: O Novo Paradigma Econômico

**Arquivo:** `01-introduction.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Compreender a mudança de *Labor-Constraint* para *Compute-Constraint*.
- Analisar a desagregação da inteligência: de "Senior Engineer" para "API Call".
- Entender o conceito de "Intelligence as a Utility".

#### Conteúdo Principal
1. **A Economia da Abundância de Código**
   - O custo marginal de gerar código tende a zero.
   - O gargalo muda da escrita para a verificação e integração.
2. **De Capex para Opex**
   - A substituição parcial de headcount (custo fixo) por compute (custo variável).
   - O risco da variabilidade de custos em sistemas estocásticos.
3. **A "Taxa da Inteligência" (Intelligence Tax)**
   - Todo software moderno paga um "imposto" perpétuo para modelos de fundação.
   - Comparação com Cloud Computing (AWS/Azure) vs. Intelligence Computing (OpenAI/Anthropic).

#### Tags
`#economics`, `#paradigm-shift`, `#capex-opex`, `#intelligence-utility`

______________________________________________________________________

### Seção 2: Unit Economics da IA (Tokenomics)

**Arquivo:** `02-ai-unit-economics.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Calcular o custo real de operações de IA (In/Out tokens, imagens, áudio).
- Entender a relação entre Latência, Throughput e Custo.
- Modelar custos para aplicações em escala.

#### Conteúdo Principal
1. **A Física dos Tokens**
   - Input vs. Output: Por que gerar é mais caro que ler?
   - Context Window Economics: O custo quadrático da atenção (e a solução linear).
   - Prompt Caching: O "CDN" para LLMs.
2. **Custo da Latência**
   - Time-to-First-Token (TTFT) vs. Total Time.
   - O prêmio pago por baixa latência (Groq, Cerebras) vs. throughput (NVIDIA H100 batches).
3. **Modelagem de Custos**
   - Calculadora de TCO para features de IA.
   - Exemplo prático: Custo de um Chatbot de Suporte vs. Code Assistant.

#### Tags
`#tokenomics`, `#unit-economics`, `#latency`, `#cost-modeling`

______________________________________________________________________

### Seção 3: Build vs. Buy na Era dos LLMs

**Arquivo:** `03-build-vs-buy.md`\
**Estimativa:** 2.500-3.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Decidir entre API proprietária, Open Weights (Self-hosted) e Fine-tuning.
- Avaliar o TCO real de rodar modelos on-premise/VPC.
- Entender o "Lock-in de Inteligência".

#### Conteúdo Principal
1. **O Espectro da Decisão**
   - **Buy (API):** OpenAI, Anthropic, Google. Custo inicial zero, escala linear.
   - **Rent (Managed OSS):** Bedrock, Azure AI, Anyscale. Flexibilidade de modelo, gestão terceirizada.
   - **Build (Self-Hosted):** Llama 3/4 em H100s/A100s. Controle total, custo fixo alto, complexidade operacional (MLOps).
2. **Análise de Break-even**
   - Quando o custo da API supera o aluguel de GPU? (A regra dos 100M tokens/dia).
   - O custo oculto da equipe de MLOps.
3. **Fine-tuning vs. RAG**
   - Economics do RAG (custo de vector DB + retrieval) vs. Fine-tuning (custo de treino + hosting dedicado).
   - O "Model Collapse" e a depreciação rápida de modelos fine-tuned.

#### Tags
`#build-vs-buy`, `#self-hosting`, `#api-economics`, `#fine-tuning`

______________________________________________________________________

### Seção 4: Produtividade e ROI (Além do Hype)

**Arquivo:** `04-productivity-roi.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Mensurar o impacto real de ferramentas de IA (Copilot, Cursor) na engenharia.
- Evitar métricas de vaidade ("30% mais rápido").
- Calcular o ROI de licenças de IA corporativas.

#### Conteúdo Principal
1. **Métricas que Importam**
   - Cycle Time (Tempo de Ciclo) de PRs.
   - Code Review Velocity e Reject Rate.
   - Bug Density em código gerado vs. humano.
2. **O Paradoxo da Produtividade**
   - Lei de Jevons: Maior eficiência leva a maior consumo de recursos (mais código, mais features, mais complexidade).
   - O custo do "Context Switching" e da "Review Fatigue".
3. **ROI de Ferramentas**
   - Modelo: Custo da Licença ($20-$50/mês) vs. Ganho de Hora/Engenheiro.
   - O "Seniority Gap": Por que seniores ganham mais valor econômico que juniores.

#### Tags
`#productivity`, `#roi`, `#copilot`, `#metrics`, `#engineering-efficiency`

______________________________________________________________________

### Seção 5: FinOps para IA (AI Financial Operations)

**Arquivo:** `05-finops-for-ai.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Implementar controles financeiros para consumo de IA.
- Monitorar e otimizar custos em tempo real.
- Estabelecer governança de uso.

#### Conteúdo Principal
1. **Observabilidade de Custos**
   - Tagging de custos por Feature, Time e Usuário.
   - Alertas de anomalia de gastos (loop infinito de agentes).
2. **Estratégias de Otimização**
   - **Model Routing/Cascading:** Usar o modelo mais barato possível para a tarefa (Router -> Haiku/GPT-4o-mini -> Opus/GPT-4).
   - **Token Truncation e Summarization:** Reduzir contexto antes de enviar.
3. **Governança e Budgeting**
   - Quotas (Hard/Soft limits).
   - Chargeback interno para departamentos.

#### Tags
`#finops`, `#cost-optimization`, `#governance`, `#model-routing`

______________________________________________________________________

### Seção 6: Mercado de Talento e Trabalho

**Arquivo:** `06-talent-labor.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Analisar o impacto da IA nos salários e contratações.
- Reestruturar times de engenharia para a era da IA.
- Entender a valorização do perfil "AI Engineer".

#### Conteúdo Principal
1. **A Mudança no Perfil de Contratação**
   - De "Deep Coder" para "System Integrator" e "Evaluator".
   - A ascensão do "AI Engineer" (Full Stack + RAG + Evals).
2. **Estrutura de Times**
   - Times menores com maior output (o mito do "10x Engineer" democratizado?).
   - A redução da necessidade de QAs manuais e aumento de QAs de automação/evals.
3. **Economics de Salários**
   - Premium salarial para habilidades de IA.
   - Pressão deflacionária em tarefas de codificação commoditizadas.

#### Tags
`#talent`, `#hiring`, `#careers`, `#team-structure`, `#salaries`

______________________________________________________________________

### Seção 7: Dívida Técnica vs. Dívida Financeira

**Arquivo:** `07-technical-financial-debt.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Avaliar o custo de longo prazo do código gerado por IA.
- Entender "Code Churn" como passivo financeiro.
- Estratégias de mitigação de dívida.

#### Conteúdo Principal
1. **O Custo da Manutenção**
   - Código fácil de gerar, difícil de entender.
   - O risco de "Orfanato de Código" (ninguém sabe como funciona).
2. **Refatoração Assistida**
   - Usar IA para pagar a dívida que ela mesma criou.
   - Economics de testes automáticos gerados.
3. **Dívida Financeira Direta**
   - Dependência de APIs proprietárias que podem aumentar preços ou mudar termos.

#### Tags
`#technical-debt`, `#maintenance`, `#risk-management`, `#legacy-code`

______________________________________________________________________

### Seção 8: Estudos de Caso Econômicos

**Arquivo:** `08-case-studies.md`\
**Estimativa:** 2.000-2.500 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Aprender com implementações reais e seus resultados financeiros.
- Analisar sucessos e falhas de ROI.

#### Conteúdo Principal
1. **Caso: Klarna (Customer Support)**
   - Substituição de 700 agentes humanos por IA.
   - Lucro estimado de $40M/ano.
2. **Caso: Duolingo (Content Creation)**
   - Redução de contractors, aumento de velocidade de criação de cursos.
3. **Caso: Startups "Wrapper"**
   - A falácia econômica de wrappers finos sobre APIs (margem zero).
4. **Caso: Enterprise Code Migration**
   - Migração de Cobol/Java legado usando IA (custo 10x menor que manual).

#### Tags
`#case-studies`, `#klarna`, `#duolingo`, `#roi-examples`

______________________________________________________________________

### Seção 9: O Futuro da Economia de Software

**Arquivo:** `09-future-trends.md`\
**Estimativa:** 1.500-2.000 palavras\
**Status:** draft

#### Objetivos de Aprendizagem
- Preparar-se para a economia agêntica.
- Antecipar a commoditização total da inteligência.

#### Conteúdo Principal
1. **Agentic Economics**
   - Quando o software trabalha enquanto você dorme (e gasta seu cartão de crédito).
   - O custo de loops autônomos.
2. **Software sob Demanda**
   - O fim do SaaS tradicional? Software gerado on-the-fly para necessidades específicas.
   - Micro-pagamentos por funcionalidade gerada.
3. **Sovereign AI**
   - A economia de possuir sua própria inteligência (Data Sovereignty como ativo).

#### Tags
`#future`, `#agents`, `#software-on-demand`, `#trends`

______________________________________________________________________

## Sumário da Estrutura

| Seção | Arquivo | Foco Principal |
| :--- | :--- | :--- |
| 1 | `01-introduction.md` | Paradigma Econômico (Labor -> Compute) |
| 2 | `02-ai-unit-economics.md` | Tokenomics, Custo de Inferência |
| 3 | `03-build-vs-buy.md` | Estratégia de Infraestrutura e Modelos |
| 4 | `04-productivity-roi.md` | Métricas Reais de Engenharia |
| 5 | `05-finops-for-ai.md` | Controle, Monitoramento e Otimização |
| 6 | `06-talent-labor.md` | Impacto em Times e Carreiras |
| 7 | `07-technical-financial-debt.md` | Custo de Manutenção e Risco |
| 8 | `08-case-studies.md` | Exemplos Reais (Klarna, Duolingo) |
| 9 | `09-future-trends.md` | Economia Agêntica e Futuro |

**Total Estimado:** 18.000 - 22.000 palavras

______________________________________________________________________

## Próximos Passos

1. **Fase de Rascunho:** @book-writer cria versões draft de cada seção seguindo a persona "Hands-on CTO".
2. **Fase de Revisão:** @book-reviewer valida dados técnicos e tom.
3. **Publicação:** Atualização do mkdocs.yml.

______________________________________________________________________

*Plano criado por @book-editor*

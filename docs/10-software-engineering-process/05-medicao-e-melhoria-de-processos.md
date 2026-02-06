---
title: "Medição e Melhoria de Processos"
created_at: "2025-01-31"
tags: ["metricas", "kpis", "melhoria-continua", "dora", "flow"]
status: "review"
updated_at: "2025-02-04"
ai_model: "vertex-ai-gemini-1.5-pro"
---

# Medição e Melhoria de Processos na Era da IA

## Contexto

Você não pode gerenciar o que não mede, mas na era da IA, medir as coisas erradas é pior que não medir nada. Métricas tradicionais como "linhas de código por dia" ou "commits por semana" tornam-se absurdas quando um LLM pode gerar milhares de linhas em segundos. Focar nessas métricas incentiva o inchaço (*bloat*) do software, não a entrega de valor.

Este capítulo redefine a medição de desempenho de engenharia para focar na eficiência da **verificação** e na qualidade da **curadoria**, deslocando o foco da quantidade de output para a qualidade do outcome.

## Métricas Tradicionais Adaptadas

Muitas métricas ágeis e de fluxo (Lean) precisam ser reinterpretadas.

| Métrica Tradicional | Problema com IA | Adaptação SWEBOK-AI |
| :--- | :--- | :--- |
| **Velocity (Story Points)** | Pontos mediam esforço de codificação, que agora é zero. | **Throughput de Features Verificadas:** Quantas unidades de valor passaram pelo crivo de qualidade completo. |
| **Lead Time** | Pode parecer curto porque a codificação é rápida, mascarando gargalos de review. | **Lead Time Decomposto:** Separar tempo de `Geração` (rápido) vs. tempo de `Verificação e Curadoria` (lento). |
| **Cycle Time** | Idem acima. | **Tempo Médio de Curadoria:** Quanto tempo um PR gerado fica aguardando/sendo revisado por humanos. |
| **Burndown Chart** | Quedas bruscas enganosas (IA completa tasks rápido, mas a validação trava). | **Validation Burnup:** Gráfico mostrando progresso da cobertura de testes e aprovação de segurança. |

## Novas Métricas Essenciais

Para gerenciar processos híbridos, precisamos de novos indicadores.

### 1. Acceptance Rate (Taxa de Aceitação)
Mede a eficácia dos prompts e do contexto.
*   *Fórmula:* (Linhas de código geradas aceitas sem alteração / Total de linhas geradas) * 100.
*   *Interpretação:* Se baixo (<30%), seus prompts são ruins ou a tarefa é complexa demais para a IA atual. Se muito alto (>90%), cuidado com "Review Zumbi".

### 2. Curation Backlog (Fila de Curadoria)
Mede o gargalo humano.
*   *Definição:* Número de PRs/Artefatos gerados pela IA aguardando revisão humana.
*   *Ação:* Se a fila cresce, você precisa de mais revisores ou deve desacelerar a geração (WIP Limit).

### 3. Rework Rate (Taxa de Retrabalho/Regeneração)
Mede a estabilidade da solução.
*   *Definição:* Quantas vezes um módulo precisou ser regenerado ou corrigido manualmente após a "conclusão" inicial.
*   *Impacto:* Alto retrabalho indica que a especificação (prompt) inicial estava incompleta ou ambígua.

### 4. Context Efficiency
Mede o custo da inteligência.
*   *Definição:* Custo de tokens (input + output) por funcionalidade entregue.
*   *Utilidade:* Identificar desperdício em prompts excessivamente longos ou loops de agentes ineficientes.

## Adaptação das Métricas DORA

As métricas DORA (DevOps Research and Assessment) continuam sendo o padrão ouro, mas com nuances:

1.  **Deployment Frequency:** A IA facilita deploys frequentes, mas aumenta o risco de *bad deploys*. Monitore junto com *Change Failure Rate*.
2.  **Lead Time for Changes:** Deve incluir o tempo de ideação e prompt engineering.
3.  **Change Failure Rate:** Esta é a métrica crítica. A IA tende a aumentar a taxa de falha se os testes não forem robustos.
4.  **Time to Restore Service (MTTR):** A IA pode ajudar a reduzir o MTTR sugerindo fixes rápidos (auto-healing).

## Checklist Prático

1.  [ ] **Dashboard de Curadoria:** Crie um painel que mostre claramente quantos PRs de IA estão parados.
2.  [ ] **Monitor de Custos:** Configure alertas se o gasto com API da OpenAI/Anthropic desviar do padrão (indica loop infinito de agente ou uso ineficiente).
3.  [ ] **Auditoria de "LGTM":** Analise PRs aprovados em menos de 5 minutos. Geralmente indicam revisão superficial perigosa.
4.  [ ] **Pesquisa de Satisfação (DevEx):** Pergunte ao time: "A IA está ajudando ou você gasta mais tempo corrigindo o que ela faz?". A métrica subjetiva é um *early warning* vital.
5.  [ ] **Abolir Metas de Linhas de Código:** Elimine qualquer KPI que incentive volume de código. Comemore código deletado/simplificado pela IA.

## Armadilhas Comuns

*   **A Falácia da Produtividade:** Celebrar "aumento de 200% na produtividade" porque o time gera mais código, enquanto a dívida técnica e os bugs em produção explodem.
*   **Ocultação do Custo Humano:** Ignorar o estresse cognitivo da revisão constante. Ler código ruim é mais cansativo que escrever código bom.
*   **Gaming the Metrics:** Se você medir *Acceptance Rate* como meta, os devs vão aceitar qualquer lixo que a IA gerar. Use como diagnóstico, não como alvo.

## Exemplo Mínimo: Diagnóstico de Processo

**Cenário:** Time reclama que "a IA não ajuda".

**Diagnóstico via Métricas:**
1.  Olhamos o *Acceptance Rate*: 15% (Baixíssimo).
2.  Olhamos o *Rework Rate*: 80% dos PRs sofrem commits manuais pesados depois da geração.
3.  Olhamos o *Context Efficiency*: Prompts de 2 linhas para gerar classes inteiras.

**Conclusão:** O problema não é a IA, é a **Engenharia de Prompt**. O time está pedindo milagres sem dar contexto.
**Ação:** Treinamento em *Prompt Engineering* e criação de templates de contexto.
**Resultado (1 mês depois):** Acceptance Rate sobe para 60%, satisfação do time melhora.

## Resumo Executivo

*   **Não meça volume:** Código é custo, funcionalidade verificada é ativo.
*   **Monitore a fila humana:** O gargalo é a revisão. Oculte isso e seu processo colapsa.
*   **Qualidade do Prompt:** Métricas de rejeição e retrabalho são indicadores diretos da qualidade da sua especificação/prompt.
*   **DORA continua rei:** Mas foque obsessivamente no *Change Failure Rate* para garantir que a velocidade da IA não está destruindo a estabilidade.

## Próximos Passos

*   Estudar **15 - Engenharia Econômica** para traduzir essas métricas em ROI financeiro.
*   Implementar **02 - Processos Ágeis** para ajustar as cerimônias com base nessas métricas.
*   Configurar ferramentas de **Observabilidade de LLM** (ex: LangSmith, Arize) para coletar dados automáticos.

## Matriz de Avaliação Consolidada

| Critério | Avaliação | Justificativa |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | **Baixa** | Métricas fundamentais de fluxo (throughput, latência) são eternas, independente da tecnologia. |
| **Custo de Verificação** | **Baixo** | A maioria dessas métricas pode ser extraída automaticamente do Git/Jira. |
| **Responsabilidade Legal** | **Média** | Métricas ruins podem ser evidência de negligência em processos de auditoria de qualidade. |

## Referências

1.  **ThoughtWorks**. *Measuring Flow: New Metrics for AI-Assisted Development Teams*. 2025.
2.  **Google Cloud (DORA)**. *Adapting DORA Metrics for AI-Assisted Teams*. 2025.
3.  **LinearB**. *The Metrics That Actually Matter When Using AI Coding Assistants*. 2025.

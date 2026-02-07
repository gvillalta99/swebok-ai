# Pesquisa: KA 15 - Software Engineering Economics (SWEBOK-AI v5.0)

**Data:** Fevereiro 2026 (Simulada/Projetada)
**Foco:** Perspectiva do CTO (Hands-on, Pragmático)
**Tema Central:** A transição da economia baseada em trabalho (Labor-Constraint) para economia baseada em computação (Compute-Constraint).

## 1. Unit Economics da Inteligência Artificial

A mudança fundamental é a introdução do custo variável de inferência em operações que antes tinham custo marginal zero (execução de código determinístico) ou custo fixo (salário de desenvolvedores).

### Tendências de Preço (2024-2026)
- **"Race to the Bottom":** O custo por 1M tokens caiu ~90% a cada 18 meses.
  - *Benchmark (2024):* GPT-4 ~$30/1M tokens (output).
  - *Benchmark (2025/26):* Modelos equivalentes (GPT-5-mini, Llama-4-hosted) a ~$0.50-$2.00/1M tokens.
- **Context Window:** Custo de contexto longo reduzido drasticamente via *Prompt Caching* (Anthropic, OpenAI, Google). Reutilizar o contexto (RAG, codebases) agora é economicamente viável.
- **Inference Hardware:** Surgimento de LPUs (Language Processing Units) como Groq e Cerebras reduziu a latência e o custo de inferência para modelos open-weights.

### Modelo de Custo
- **Fórmula Antiga:** $Custo = (HorasDev \times TaxaHoraria) + InfraFixa$
- **Nova Fórmula:** $Custo = (HorasDev \times TaxaHoraria) + (TokensIn \times P_{in}) + (TokensOut \times P_{out}) + (ChamadasAPI \times C_{tool})$

## 2. Build vs. Buy: O Dilema da Infraestrutura de IA

A decisão clássica de engenharia agora tem novas variáveis: Privacidade, Latência e Custo de Talento.

### Opção A: APIs Proprietárias (OpenAI, Anthropic, Google)
- **Prós:** Time-to-market imediato, SOTA (State of the Art), sem gestão de infra.
- **Contras:** Lock-in, custos escalam linearmente com usuários, dados saem do perímetro.
- **Economics:** Ideal para validação, protótipos e workloads de baixo volume/alta complexidade.

### Opção B: Open Weights Self-Hosted (Llama 3/4, Mistral, Qwen)
- **Prós:** Controle total de dados, custo fixo de hardware (Capex ou Opex previsível), fine-tuning irrestrito.
- **Contras:** Custo oculto de talentos (MLOps/AI Engineers), gestão de GPUs/Kubernetes, necessidade de otimização (quantization, LoRA).
- **Economics:** O "Ponto de Inflexão" ocorre quando o custo da API mensal excede o aluguel de 2x H100s + salário de 1 MLOps engineer. Geralmente > 100M tokens/dia.

### Opção C: "Private Cloud" / Managed OSS (AWS Bedrock, Azure AI, Anyscale)
- **Meio termo:** Modelos abertos, infraestrutura gerenciada. Cobra-se um premium sobre o hardware nu, mas elimina o overhead de gestão.

## 3. Produtividade e ROI de Ferramentas de IA

O ganho de produtividade não é uniforme e exige novas métricas.

### Métricas Reais (Estudos de 2024-2025)
- **Coding Speed:** ~30-50% de redução no tempo de escrita de código "boilerplate".
- **Task Completion:** ~25% de aumento na taxa de conclusão de tarefas complexas.
- **Review Overhead:** Aumento de 20-40% no tempo de Code Review (o código gerado por IA é "plausível mas sutilmente errado").
- **Seniority Gap:** Juniores ganham velocidade mas perdem profundidade; Seniores ganham alavancagem (atuam como arquitetos/editores).

### O "Custo da Qualidade" (Technical Debt Economics)
- Código gerado por IA tende a ser mais verboso e menos DRY.
- **Risco Econômico:** O custo de manutenção futura (OpEx) pode explodir se o código gerado não for refatorado rigorosamente.
- **Estratégia:** Investir o tempo economizado na escrita em testes automatizados e code review.

## 4. FinOps para AI (AI Financial Operations)

Gerenciar custos probabilísticos exige novas práticas.

### Práticas Essenciais
- **Model Routing:** Usar modelos baratos (Haiku, GPT-4o-mini) para tarefas simples (classificação, extração) e modelos caros (Opus, GPT-5) apenas para raciocínio complexo. Economia de até 80%.
- **Budgeting & Quotas:** Limites rígidos de tokens por usuário/feature.
- **Cost Observability:** Tags de custo por feature. Saber exatamente quanto custa a feature "Resumir Reunião" vs "Gerar Relatório".
- **Token Optimization:** Minimização de prompts, uso de formatos concisos (YAML vs JSON), caching agressivo.

## 5. Mercado de Trabalho e Talento

A economia do trabalho de engenharia está mudando de "Codificação" para "Integração e Avaliação".

- **Salários:** Premium de 20-30% para "AI Engineers" (que sabem orquestrar LLMs, RAG, Evals) vs "Full Stack" tradicional.
- **Contratação:** Menor demanda por "juniores puros" (coders); maior demanda por generalistas com forte base de sistemas e arquitetura.
- **Offshoring:** A IA atua como um nivelador, permitindo que times menores e distribuídos entreguem produtos complexos, pressionando salários em hubs de alto custo (SF, NY).

## Referências (Baseadas em tendências 2023-2025)
1. *Sequoia Capital - "The Generative AI Act Two"* (Economics of reasoning vs generation).
2. *Andreessen Horowitz - "Navigating the High Cost of AI Compute"*.
3. *OpenAI/Anthropic Pricing Pages* (Evolução histórica de preços).
4. *GitHub Research* - "The economic impact of the AI-powered developer lifecycle".
5. *Databricks - "State of Data + AI"* (Adoção corporativa e custos).

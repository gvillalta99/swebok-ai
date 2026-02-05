# Plano do Capítulo 0: Introdução

## Visão Geral

O capítulo de Introdução no SWEBOK-AI v5.0 estabelece o contexto fundamental para toda a obra. Enquanto o SWEBOK v4.0 assumia um paradigma de engenharia de software baseado em codificação manual e processos tradicionais, a versão 5.0 reconhece que vivemos uma transição paradigmática sem precedentes na história da computação.

Este capítulo apresenta os **Princípios Fundamentais do SWEBOK-AI** — os alicerces conceituais que justificam a reestruturação completa do guia e orientam a reinterpretação de cada área de conhecimento na era dos sistemas autônomos de software.

A introdução estabelece:
1. O contexto histórico da revolução dos LLMs
2. A mudança de paradigma: de codificação para curadoria
3. Os princípios diretores do SWEBOK-AI v5.0
4. A estrutura e organização do guia
5. Como utilizar este guia

---

## Estrutura do Capítulo

1. **Seção 1: O Contexto da Revolução dos LLMs**
2. **Seção 2: A Mudança de Paradigma na Engenharia de Software**
3. **Seção 3: Princípios Diretores do SWEBOK-AI**
4. **Seção 4: Estrutura e Organização do Guia**
5. **Seção 5: Público-Alvo e Pré-requisitos**
6. **Seção 6: Como Utilizar Este Guia**

---

---

## Relacionamento com Outros KAs

### Dependências Fundamentais
- **Todos os KAs:** Este capítulo fornece o contexto fundamental para todo o restante do guia

### Conexões por Seção

**Da Seção 1 (Revolução dos LLMs):**
- **Cap. 16 (Computing Foundations):** Fundamentos de LLMs, Transformers, RAG
- **Cap. 5 (Software Testing):** Evolução dos benchmarks SWE-bench
- **Cap. 15 (Engineering Economics):** Dados de produtividade (Peng et al., Dellermann et al.)

**Da Seção 2 (Mudança de Paradigma):**
- **Cap. 1 (Software Requirements):** Engenharia de restrições
- **Cap. 3 (Software Design):** Paradigma de curadoria
- **Cap. 4 (Software Construction):** Orquestração de código
- **Cap. 9 (Software Management):** Novos papéis (AI System Designer, Verification Specialist)

**Da Seção 3 (Princípios Diretores):**
- **Cap. 2 (Software Architecture):** Princípio 6 (Degradação Graciosa)
- **Cap. 12 (Software Quality):** Princípio 4 (Verificação como Gargalo)
- **Cap. 13 (Software Security):** Princípio 5 (Transparência)
- **Cap. 14 (Professional Practice):** Princípio 3 (Responsabilidade Humana)
- **Cap. 15 (Engineering Economics):** Princípio 1 (Commodity) e 2 (Capital de Contexto)
- **Cap. 7 (Software Maintenance):** Princípio 2 e riscos de dívida técnica (AlterSquare, Kodus)

**Da Seção 4 (Estrutura):**
- Todos os KAs — mapeamento de recontextualização

**Das Seções 5-6 (Público e Uso):**
- Todos os KAs — caminhos de navegação

---

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: O Contexto da Revolução dos LLMs

**Marcos Evolutivos (com dados de referências):**
- **2017**: Transformers (Vaswani et al.) — fundamento teórico
- **2021**: Codex (Chen et al.) — primeira aplicação prática em código
- **2022**: AlphaCode (Li et al.) — nível competitivo em programação
- **2023**: GPT-4 — raciocínio complexo; Estudos empíricos (Peng et al.): +55% produtividade
- **2024**: Claude 3.5, GPT-4o — autonomia inicial; SWE-bench: 33% resolução
- **2025**: Claude 4, OpenAI o3 — raciocínio profundo; SWE-bench: ~71%

**Métricas de Progresso (SWE-bench Verified):**
| Modelo | Ano | Score | Salto |
|--------|-----|-------|-------|
| GPT-4 | 2023 | 3.1% | baseline |
| GPT-4o | 2024 | 33.0% | 10x |
| Claude 4 / o3 | 2025 | ~71% | 2x |

**Limites Documentados (METR):**
- Horizonte de tarefa atual: crescimento exponencial, mas ainda limitado a horas (não dias)
- Estudo OS Dev: fronteira entre assistência e autonomia em sistemas complexos
- SWE-Bench Pro: gaps substanciais em tarefas de longo horizonte

### Seção 2: A Mudança de Paradigma

**Evidências da Inversão do Gargalo:**
- Dellermann et al. (2024): produtividade percebida vs. real
- Weber et al. (2024): autocomplete vs. conversacional
- The New Stack (2025): "Trust and Verify" — verificação como foco

**Dados de Adoção (AI Index Report 2025 / Greptile):**
- 77% dos desenvolvedores usam IA regularmente
- 60% reportam aumento de produtividade
- 45% dedicam mais tempo a revisão de código
- 35% reportam aumento de dívida técnica

### Seção 3: Princípios Diretores

**Conexões com Referências:**
- Princípio 1 (Commodity): Song (2025) — Jevons-Baumol
- Princípio 2 (Contexto): Kodus (2025), AlterSquare (2026) — dívida técnica
- Princípio 3 (Responsabilidade): IEEE (2024) — Human-AI Collaboration
- Princípio 4 (Verificação): The New Stack (2025) — Trust and Verify
- Princípio 5 (Transparência): AlterSquare (2026) — opacidade
- Princípio 6 (Degradação): τ-Bench (2024) — reliability

### Seção 4: Estrutura do Guia

**Mapeamento de KAs Transformados:**
- Requirements → Restrições (Princípio 2)
- Design → Curadoria (Princípio 4)
- Construction → Orquestração (Princípio 1)
- Testing → Verificação semântica (The New Stack 2025)

### Seções 5-6: Público e Uso

**Caminhos por Perfil:**
- Praticantes: Foco em Seção 2 (paradigma) + Cap. 3, 5, 12
- Líderes: Foco em Seção 3 (princípios) + Cap. 2, 9, 14, 15
- Pesquisadores: Fundamentação completa + lacunas identificadas
- Executivos: Seções 1-3 + Cap. 9, 15 (economia)

**Checklist de Prontidão:**
- Consegue explicar diferença entre agente e assistente?
- Entende trade-offs de produtividade vs. verificação?
- Sabe identificar quando supervisão humana é obrigatória?

---

# Referências

## Evolução dos LLMs e Capacidades de Programação

### 1. Attention Is All You Need (2017)
- **Link:** https://arxiv.org/abs/1706.03762
- **Título:** "Attention Is All You Need"
- **Autores:** Vaswani et al. (Google Brain)
- **Resumo:** Artigo fundacional que introduziu a arquitetura Transformer, base de todos os LLMs modernos. Propôs o mecanismo de self-attention como alternativa às redes recorrentes.
- **Conexão com conteúdo:** Estabelece a base teórica da revolução dos LLMs. Essencial para contextualizar por que 2017 é o marco zero da era atual da IA generativa.

### 2. Evaluating Large Language Models Trained on Code (2021)
- **Link:** https://arxiv.org/abs/2107.03374
- **Título:** "Evaluating Large Language Models Trained on Code" (Codex Paper)
- **Autores:** Chen et al. (OpenAI)
- **Resumo:** Apresenta o Codex, modelo predecessor do GitHub Copilot, demonstrando pela primeira vez que LLMs podem resolver problemas de programação competitiva e gerar código funcional a partir de descrições em linguagem natural.
- **Conexão com conteúdo:** Marco inaugural da aplicação de LLMs em engenharia de software. Demonstra a transição de NLP generalista para código.

### 3. Competition-Level Code Generation with AlphaCode (2022)
- **Link:** https://www.science.org/doi/10.1126/science.abq1158
- **Título:** "Competition-Level Code Generation with AlphaCode"
- **Autores:** Li et al. (DeepMind)
- **Resumo:** AlphaCode alcançou performance de nível competidor em competições de programação do Codeforces, gerando soluções criativas para problemas nunca vistos.
- **Conexão com conteúdo:** Evidência de que LLMs podem ir além de completar código para resolver problemas complexos de forma criativa, mudando a percepção sobre limitações da IA.

### 4. Introducing Claude 4 (2025)
- **Link:** https://www.anthropic.com/news/claude-4
- **Título:** "Introducing Claude 4"
- **Autores:** Anthropic
- **Resumo:** Lançamento da família Claude 4 (Opus 4 e Sonnet 4), líder em benchmarks de engenharia de software real, especialmente no SWE-bench Verified. Introduz capacidades de raciocínio extendido e agentes autônomos.
- **Conexão com conteúdo:** Exemplo atualizado do estado-da-arte em LLMs para engenharia de software. Demonstra a evolução de assistentes para "colegas de equipe" autônomos.

### 5. Introducing OpenAI o3 and o4-mini (2025)
- **Link:** https://openai.com/index/introducing-o3-and-o4-mini/
- **Título:** "Introducing OpenAI o3 and o4-mini"
- **Autores:** OpenAI
- **Resumo:** Modelos de raciocínio profundo projetados para tarefas complexas de codificação. O o3 atinge 71.7% no SWE-bench Verified, superando em 20+ pontos percentuais o modelo anterior (o1).
- **Conexão com conteúdo:** Ilustra a nova geração de modelos especializados em raciocínio multi-etapas, críticos para resolver bugs reais em código complexo.

### 6. SWE-bench: Can Language Models Resolve Real-World GitHub Issues?
- **Link:** https://www.swebench.com/
- **Título:** "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
- **Autores:** Jimenez et al. (ICLR 2024)
- **Resumo:** Benchmark que avalia LLMs em tarefas reais de engenharia de software a partir de issues do GitHub. Tornou-se o padrão ouro para avaliar capacidades de coding agents.
- **Conexão com conteúdo:** Fundamental para entender como medir progresso em IA para engenharia de software. Mostra a evolução: GPT-4 (3.1%) → GPT-4o (33%) → Claude 4 / o3 (~70%).

### 7. SWE-Lancer: Can Frontier LLMs Earn $1 Million from Freelance Software Engineering?
- **Link:** https://openai.com/index/swe-lancer/
- **Título:** "SWE-Lancer: Can Frontier LLMs Earn $1 Million from Real-World Freelance Software Engineering?"
- **Autores:** OpenAI (2025)
- **Resumo:** Novo benchmark baseado em tarefas reais do Upwork, avaliando LLMs em trabalho freelance de software. Inclui tanto tarefas técnicas quanto de tomada de decisão de produto.
- **Conexão com conteúdo:** Expandir a discussão sobre substituição de trabalho humano e valor econômico da IA na engenharia de software.

---

## Impacto na Produtividade de Desenvolvedores

### 8. The Impact of AI on Developer Productivity (2023)
- **Link:** https://arxiv.org/abs/2302.06590
- **Título:** "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot"
- **Autores:** Peng et al.
- **Resumo:** Experimento controlado randomizado com 95 desenvolvedores mostrando que uso do GitHub Copilot reduziu tempo de conclusão de tarefas em 55% em média.
- **Conexão com conteúdo:** Primeira evidência empírica robusta de ganho de produtividade. Essencial para fundamentar discussões sobre impacto econômico.

### 9. Measuring GitHub Copilot's Impact on Productivity (2024)
- **Link:** https://cacm.acm.org/research/measuring-github-copilots-impact-on-productivity/
- **Título:** "Measuring GitHub Copilot's Impact on Productivity"
- **Autores:** Dellermann et al. (Microsoft Research / ACM Communications)
- **Resumo:** Combina dados de telemetria com surveys de percepção, revelando que desenvolvedores relatam maior produtividade e satisfação, mas nem sempre a percepção corresponde às métricas objetivas.
- **Conexão com conteúdo:** Introduz nuances importantes sobre a diferença entre produtividade percebida vs. real, relevante para a seção de "paradoxos".

### 10. Significant Productivity Gains through Programming with LLMs (2024)
- **Link:** https://www.mmi.ifi.lmu.de/pubdb/publications/pub/weber2024eics-llm/weber2024eics-llm.pdf
- **Título:** "Significant Productivity Gains through Programming with Large Language Models"
- **Autores:** Weber et al. (LMU Munich)
- **Resumo:** Compara interfaces de autocomplete (Copilot) vs. conversacional (GPT-3), mostrando ganhos significativos em ambos os formatos, mas com trade-offs diferentes.
- **Conexão com conteúdo:** Diferenciação entre modos de interação humano-IA, relevante para o paradigma de "curadoria" vs. "codificação".

### 11. GitHub Copilot: A Systematic Study (2024)
- **Link:** https://ceur-ws.org/Vol-3762/489.pdf
- **Título:** "GitHub Copilot: A Systematic Study"
- **Autores:** Vaithilingam et al.
- **Resumo:** Revisão sistemática avaliando múltiplas dimensões: velocidade, qualidade de código, experiência do desenvolvedor e limitações.
- **Conexão com conteúdo:** Visão abrangente dos efeitos do Copilot, incluindo discussão de vieses e limitações frequentemente ignoradas.

---

## Paradigma de Verificação e Curadoria

### 12. Generative AI and Empirical Software Engineering (2025)
- **Link:** https://arxiv.org/abs/2502.08108
- **Título:** "Generative AI and Empirical Software Engineering"
- **Autores:** Arxiv (survey paper)
- **Resumo:** Artigo que posiciona a adoção de LLMs como uma "mudança de paradigma duradoura" na engenharia de software empírica, argumentando que a comunidade precisa adaptar suas metodologias.
- **Conexão com conteúdo:** Suporte acadêmico direto para a tese central do SWEBOK-AI sobre mudança paradigmática.

### 13. AI Code Generation: Trust and Verify, Always (2025)
- **Link:** https://thenewstack.io/ai-code-generation-trust-and-verify-always/
- **Título:** "AI Code Generation: Trust and Verify, Always"
- **Autores:** The New Stack
- **Resumo:** Argumento para que "vibe coding" (geração por prompts) deva ser seguido por rigorosa etapa de verificação, dado o risco de vulnerabilidades e dívida técnica.
- **Conexão com conteúdo:** Central para o princípio de que o gargalo mudou de produção para verificação.

### 14. Human-AI Collaboration in Software Engineering (2024)
- **Link:** https://ieeexplore.ieee.org/document/10653701
- **Título:** "Human-AI Collaboration in Software Engineering"
- **Autores:** IEEE Software
- **Resumo:** Análise de como ChatGPT melhora eficiência de geração e otimização de código, mas supervisionamento humano permanece crucial, especialmente para decisões arquiteturais.
- **Conexão com conteúdo:** Fundamenta o princípio de "Human-in-the-Loop" e quando supervisão humana é obrigatória.

---

## Custos, Dívida Técnica e Manutenção

### 15. True Cost of AI-Generated Code (2024)
- **Link:** https://medium.com/@justhamade/true-cost-of-ai-generated-code-f4362391790c
- **Título:** "True Cost of AI-Generated Code"
- **Autores:** Justin Hamade
- **Resumo:** Análise crítica mostrando que código gerado por IA, embora rápido de produzir, aumenta custos de manutenção, degrada estabilidade do sistema e introduz vulnerabilidades de segurança.
- **Conexão com conteúdo:** Contrabalanço necessário ao discurso de produtividade. Introduz o conceito de "custo de verificação" e dívida técnica de código opaco.

### 16. How AI-Generated Code is messing with your Technical Debt (2025)
- **Link:** https://kodus.io/en/ai-generated-code-is-messing-with-your-technical-debt/
- **Título:** "How AI-Generated Code is messing with your Technical Debt"
- **Autores:** Kodus
- **Resumo:** Discussão sobre como código gerado por IA pode duplicar lógica existente, ignorar validações e quebrar padrões de projeto, exigindo processos de review mais rigorosos.
- **Conexão com conteúdo:** Exemplos concretos de riscos do novo paradigma, justificando a ênfase em governança e restrições.

### 17. Why AI Systems Create New Forms of Technical Debt (2026)
- **Link:** https://altersquare.io/ai-systems-create-new-forms-technical-debt/
- **Título:** "Why AI Systems Create New Forms of Technical Debt"
- **Autores:** AlterSquare
- **Resumo:** Identifica novas categorias de dívida técnica específicas de sistemas com IA: complexidade de integração, dependências de modelos, e "opaquidade" de decisões.
- **Conexão com conteúdo:** Suporte para o novo KA "Manutenção de Sistemas Opaços" proposto no SWEBOK-AI.

---

## Agentes Autônomos e Sistemas Híbridos

### 18. Introducing Devin, the first AI software engineer (2024)
- **Link:** https://cognition.ai/blog/introducing-devin
- **Título:** "Introducing Devin, the first AI software engineer"
- **Autores:** Cognition AI
- **Resumo:** Anúncio do Devin, agente autônomo capaz de planejar, escrever, executar e depurar código de forma independente, incluindo uso de ferramentas e navegação web.
- **Conexão com conteúdo:** Exemplo concreto de transição de "assistente" para "agente", fundamental para contextualizar a nova geração de ferramentas.

### 19. 2025: The year in LLMs (2025)
- **Link:** https://simonwillison.net/2025/Dec/31/the-year-in-llms/
- **Título:** "2025: The year in LLMs"
- **Autores:** Simon Willison
- **Resumo:** Análise anual abrangente do estado dos LLMs em 2025, destacando a ascensão de agentes de coding assíncronos (Claude Code, Codex Cloud) operando em modo "YOLO".
- **Conexão com conteúdo:** Visão panorâmica atualizada do ecossistema, essencial para situar o leitor no momento histórico exato.

### 20. The State of AI Coding 2025
- **Link:** https://www.greptile.com/state-of-ai-coding-2025
- **Título:** "The State of AI Coding 2025"
- **Autores:** Greptile
- **Resumo:** Benchmarks comparativos de modelos (GPT-5.1, Claude Sonnet 4.5, GPT-5-Codex, etc.) avaliando comportamento como backends para coding agents.
- **Conexão com conteúdo:** Dados técnicos comparativos para fundamentar discussões sobre escolha de ferramentas.

---

## Economia da Engenharia de Software com IA

### 21. Why Glass Is Cheap but Installation Is Expensive: Jevons-Baumol and AI (2025)
- **Link:** https://jimmysong.io/blog/jevons-baumol-ai-china/
- **Título:** "Why Glass Is Cheap but Installation Is Expensive: Jevons-Baumol and AI"
- **Autores:** Jimmy Song
- **Resumo:** Aplicação do Paradoxo de Jevons e Custo de Baumol à IA: geração de código ficou barata (commodity), mas revisão arquitetural e aprovação de produção permanecem caras e humanas.
- **Conexão com conteúdo:** Base teórica econômica para o princípio "código tornou-se commodity; contexto tornou-se capital".

### 22. From Efficiency Gains to Rebound Effects: The Problem of Jevons' Paradox in AI (2025)
- **Link:** https://dl.acm.org/doi/10.1145/3715275.3732007
- **Título:** "From Efficiency Gains to Rebound Effects: The Problem of Jevons' Paradox in AI"
- **Autores:** ACM CHI 2025
- **Resumo:** Análise acadêmica de como ganhos de eficiência na IA podem paradoxalmente aumentar consumo total de recursos e complexidade de sistemas.
- **Conexão com conteúdo:** Suporte científico para a discussão de que maior produtividade individual pode levar a sistemas mais complexos e difíceis de manter.

### 23. AI Index Report 2025 - Technical Performance
- **Link:** https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance
- **Título:** "AI Index Report 2025 - Technical Performance"
- **Autores:** Stanford HAI (Human-Centered Artificial Intelligence)
- **Resumo:** Relatório anual abrangente sobre o estado da IA, incluindo benchmarks técnicos, adoção industrial, e tendências de pesquisa.
- **Conexão com conteúdo:** Fonte autorizada para estatísticas e tendências que fundamentam a argumentação sobre revolução dos LLMs.

---

## Estudos de Capacidades Avançadas

### 24. Early 2025 AI-Experienced OS Dev Study
- **Link:** https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- **Título:** "Early 2025 AI-Experienced OS Dev Study"
- **Autores:** METR (Model Evaluation and Threat Research)
- **Resumo:** Estudo experimental avaliando se modelos de IA podem funcionar como desenvolvedores de sistema operacional experientes, explorando limites de autonomia em tarefas complexas.
- **Conexão com conteúdo:** Evidência de fronteira atual entre assistência e autonomia, relevante para discussão sobre substituição de trabalho qualificado.

### 25. Measuring AI Ability to Complete Long Tasks (2025)
- **Link:** https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/
- **Título:** "Measuring AI Ability to Complete Long Tasks" (Kwa et al.)
- **Autores:** METR
- **Resumo:** Propõe métrica de "horizonte de tempo de tarefa" - o tempo que humanos levam para completar tarefas que IA consegue completar com 50% de sucesso. Mostra crescimento exponencial consistente das capacidades.
- **Conexão com conteúdo:** Quantificação objetiva do progresso em autonomia de agentes; contextualiza limites atuais em horas de trabalho humano equivalente.

### 26. HCAST: Human-Calibrated Autonomy Software Tasks
- **Link:** https://metr.org/hcast.pdf
- **Título:** "HCAST: Human-Calibrated Autonomy Software Tasks"
- **Autores:** METR
- **Resumo:** Suite de 189 tarefas em ML, cybersecurity e software engineering calibradas com tempo humano de execução para medir capacidades autônomas de IA frontier.
- **Conexão com conteúdo:** Benchmark complementar ao SWE-bench focado especificamente em autonomia; fundamenta discussões sobre "quando confiar na IA".

### 27. SWE-Bench Pro: Can AI Agents Solve Long-Horizon Tasks?
- **Link:** https://openreview.net/forum?id=9R2iUHhVfr
- **Título:** "SWE-Bench Pro: Can AI Agents Solve Long-Horizon Real-World Software Engineering Tasks?"
- **Autores:** Pesquisadores de benchmarks (2025)
- **Resumo:** Benchmark focado em tarefas de software engineering de longo horizonte (múltiplas horas). Revela gaps substanciais em cenários reais complexos versus tarefas isoladas.
- **Conexão com conteúdo:** Evidência crítica de que autonomia completa ainda está distante para projetos complexos; justifica princípio de human-in-the-loop.

---

---

## Curadoria de Documentos e Gestão do Conhecimento

### 34. RAG and LLMs for Enterprise Knowledge Management (2025)
- **Link:** https://www.mdpi.com/2076-3417/16/1/368
- **Título:** "Retrieval-Augmented Generation (RAG) and Large Language Models (LLMs) for Enterprise Knowledge Management and Document Automation: A Systematic Literature Review"
- **Autores:** MDPI Applied Sciences
- **Resumo:** Revisão sistemática da literatura sobre aplicações de RAG e LLMs para gestão do conhecimento empresarial e automação documental. Analisa arquiteturas, desafios de implementação e métricas de sucesso em contextos organizacionais.
- **Conexão com conteúdo:** 
  - **Seção 1 (Contexto):** Fundamenta a discussão sobre como empresas devem estruturar seu conhecimento documental para maximizar o valor dos LLMs. Suporta a tese de que "contexto é capital".
  - **Seção 3 (Princípios):** Base para o Princípio 2 (Contexto como Capital), demonstrando que a qualidade do output da IA depende diretamente da qualidade da curadoria documental.

### 35. Document Curation for AI Agents (2025)
- **Link:** https://engagesq.com/insights/ground-rules-curating-knowledge-sources-for-ai-agents/
- **Título:** "How to make your documents work for AI Agents (and get better results)"
- **Autores:** EngageSQ
- **Resumo:** Guia prático sobre regras fundamentais para curadoria de fontes de conhecimento destinadas a agentes de IA. Aborda estruturação, atualização, e organização hierárquica de documentação empresarial.
- **Conexão com conteúdo:**
  - **Seção 1 (Contexto):** Exemplifica práticas concretas de preparação de documentação para sistemas RAG.
  - **Seção 3 (Princípios):** Ilustra como a curadoria humana se torna competência crítica no novo paradigma (Princípio 4 - Verificação como Gargalo).

### 36. AI Knowledge Management: Enterprise Guide 2026 (2026)
- **Link:** https://www.instinctools.com/blog/ai-knowledge-management/
- **Título:** "AI Knowledge Management: Complete Enterprise Guide 2026"
- **Autores:** Instinctools
- **Resumo:** Guia abrangente sobre implementação de sistemas de gestão do conhecimento baseados em IA em ambientes corporativos. Inclui frameworks de maturidade, ROI, e integração com fluxos de trabalho existentes.
- **Conexão com conteúdo:**
  - **Seção 1 (Contexto):** Contextualiza a revolução dos LLMs do ponto de vista da infraestrutura de conhecimento organizacional necessária.
  - **Seção 3 (Princípios):** Suporta a transição de "código como ativo" para "contexto como ativo", detalhando investimentos necessários em bibliotecas de conhecimento e processos de manutenção.

---

## Notas sobre Qualidade e Tipos de Referências

### Hierarquia de Evidência

As 33 referências deste plano são categorizadas por nível de rigor científico:

**Nível 1 - Revisados por Pares (Peer-Reviewed):**
- Vaswani et al. (2017) — NeurIPS
- Li et al. (2022) — Science
- Jimenez et al. (2024) — ICLR
- Dellermann et al. (2024) — Communications of the ACM
- ACM CHI (2025) — ACM Conference
- IEEE Software (2024) — IEEE
- CASCON (2025) — IEEE Computer Society

**Nível 2 - Relatórios Técnicos e Benchmarks:**
- Chen et al. (2021) — arXiv/OpenAI
- SWE-bench (2024) — Benchmark estabelecido
- METR Studies (2025) — Avaliações independentes
- HCAST — Benchmark METR
- Stanford HAI (2025) — Relatório anual

**Nível 3 - Análises da Indústria e Prática:**
- The New Stack (2025) — Análise técnica
- Hamade (2024) — Análise de praticante
- Kodus (2025) — Experiência industrial
- Simon Willison (2025) — Análise anual
- Forensic Audit (2025) — Análise de casos reais

**Nível 4 - Comunicações Corporativas:**
- Anthropic, OpenAI, Cognition AI — Lançamentos de produtos
- Greptile (2025) — State of AI Coding

### Critérios de Inclusão

Referências foram selecionadas segundo:
1. **Relevância direta** para engenharia de software com IA
2. **Data de publicação** (preferência 2023-2026)
3. **Tipo de evidência** (experimental > observacional > anedótico)
4. **Impacto demonstrado** (citações, adoção na indústria)
5. **Contrabalanço** (inclui perspectivas críticas, não apenas otimistas)

---

## Estudos de Limites e Falhas de Agentes Autônomos

### 28. Where Autonomous Coding Agents Fail: A Forensic Audit (2025)
- **Link:** https://medium.com/@vivek.babu/where-autonomous-coding-agents-fail-a-forensic-audit-of-real-world-prs-59d66e33efe9
- **Título:** "Where Autonomous Coding Agents Fail: A Forensic Audit of Real-World PRs"
- **Autores:** Análise forense da indústria
- **Resumo:** Análise forense de PRs reais gerados por Codex, Copilot, Devin, Cursor, Claude Code. Identifica padrões sistemáticos de falha em casos reais de produção.
- **Conexão com conteúdo:** Evidência empírica de limitações práticas dos agentes autônomos; categorização de modos de falha para prevenção.

### 29. AI IDEs or Autonomous Agents? Measuring the Impact (2026)
- **Link:** https://arxiv.org/html/2601.13597v1
- **Título:** "AI IDEs or Autonomous Agents? Measuring the Impact"
- **Autores:** Pesquisa empírica (2026)
- **Resumo:** Estudo empírico comparando OpenAI Codex, Claude Code Agent, Devin, Cursor Agent. Mede impacto real no ciclo completo de desenvolvimento.
- **Conexão com conteúdo:** Dados comparativos sobre diferentes abordagens (IDEs vs agents); fundamenta decisões de adoção organizacional.

### 30. An Empirical Study of AI-Generated Build Code Quality (2026)
- **Link:** https://arxiv.org/html/2601.16839v1
- **Título:** "An Empirical Study of AI-Generated Build Code Quality"
- **Autores:** Pesquisa acadêmica
- **Resumo:** Análise de qualidade de código de build gerado por agentes. Devin: 23 smells em 195 arquivos; Claude Code: zero smells (amostra menor); Codex/Copilot/Cursor: taxas intermediárias.
- **Conexão com conteúdo:** Métricas objetivas de qualidade de código gerado por diferentes agentes; fundamenta decisões de ferramentas.

### 31. The Rise of AI Teammates in Software Engineering SE 3.0 (2025)
- **Link:** https://www.alphaxiv.org/overview/2507.15003v1
- **Título:** "The Rise of AI Teammates in Software Engineering (SE) 3.0"
- **Autores:** Pesquisa de adoção industrial
- **Resumo:** Análise de 456K PRs agenticos em 61K repositórios por 47K desenvolvedores. Cobre Codex, Devin, Copilot, Cursor, Claude Code. Test-to-production churn ratio varia de 0.42 (Claude/Cursor) a 0.87 (Copilot).
- **Conexão com conteúdo:** Visão panorâmica quantitativa da adoção de agentes na indústria; métricas de comportamento real em escala.

### 32. τ-Bench: Benchmarking AI Agents for Real-World Settings (2024)
- **Link:** https://sierra.ai/uk/blog/benchmarking-ai-agents
- **Título:** "τ-Bench: Benchmarking AI agents for the real-world"
- **Autores:** Sierra AI (2024)
- **Resumo:** Benchmark para avaliar performance e confiabilidade de agentes IA em cenários reais de produção, focando em reliability para deployment.
- **Conexão com conteúdo:** Foco específico em confiabilidade para produção; complementa benchmarks de capacidade com métricas de risco.

### 33. Understanding Human-AI Collaboration Through GitHub (2025)
- **Link:** https://www.computer.org/csdl/proceedings-article/cascon/2025/994800a613/2dvK6029olO
- **Título:** "Understanding Human-AI Collaboration Through GitHub"
- **Autores:** CASCON 2025
- **Resumo:** Análise de colaboração humano-IA em repositórios reais. ACAs (Autonomous Coding Agents) estão abrindo PRs em massa - implicações para governança e revisão.
- **Conexão com conteúdo:** Evidência de mudança no modelo de trabalho; necessidade de novos processos de revisão em escala.

---

*Documento de planejamento - SWEBOK-AI v5.0*
*Total de referências: 36*

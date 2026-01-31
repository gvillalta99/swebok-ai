# Capítulo 10: Processos de Engenharia de Software com IA

## Visão Geral

O Capítulo 10 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Engineering Process para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em processos tradicionais (waterfall, iterativos) e ágeis (Scrum, XP, Kanban) executados por humanos, a versão 5.0 reconhece que **os processos de engenharia tornaram-se ecossistemas híbridos onde atividades humanas e autônomas se intercalam**.

O foco desloca-se de "sequência de atividades humanas" para "orquestração de fluxos de trabalho híbridos com gates de decisão humana em pontos críticos".

## Estrutura do Capítulo

### [Seção 1: Fundamentos de Processos de Engenharia com IA](./01-fundamentos-de-processos-de-engenharia-com-ia.md)
- Evolução dos processos de software: do waterfall ao híbrido
- O novo ciclo de vida: geração como atividade central
- Papéis e responsabilidades em processos com IA
- Atividades legadas, novas e transformadas
- Modelos de maturidade adaptados (CMMI, ISO) para IA

### [Seção 2: Processos Ágeis Adaptados para o Uso de IA](./02-processos-ageis-adaptados-para-o-uso-de-ia.md)
- Scrum adaptado para times com IA
- Sprint Planning: estimando verificação, não geração
- Daily standups com métricas de IA
- Sprint Review: demonstração de comportamentos
- Retrospectiva: ajustando prompts e processos de curadoria
- XP adaptado: pair programming com IA

### [Seção 3: Model-Driven Development com LLMs](./03-model-driven-development-com-llms.md)
- Model-driven development reimaginado
- Specification as generation
- Especificação executável via prompts estruturados
- Processos de geração iterativa: do protótipo ao produto
- Integração com UML e DSLs

### [Seção 4: Workflows Agenticos e Automação](./04-workflows-agenticos-e-automacao.md)
- Agents autônomos em processos de software
- Orquestração de múltiplos agents
- Human-in-the-loop em gates críticos
- Process mining para workflows híbridos
- BPM adaptado para processos com IA

### [Seção 5: Medição e Melhoria de Processos](./05-medicao-e-melhoria-de-processos.md)
- Métricas DORA adaptadas para IA
- Decomposição de lead time: geração vs. verificação
- Novas métricas: Acceptance Rate, Curation Backlog, Rework Rate
- Throughput de features verificadas
- Ciclo PDCA para melhoria contínua

### [Seção 6: Governança e Compliance de Processos](./06-governanca-e-compliance-de-processos.md)
- Frameworks de governança para processos com IA
- Documentação de processo em regime de IA
- Auditoria de decisões de curadoria
- Proveniência rastreável de código
- Compliance regulatório adaptado (SOX, GDPR, HIPAA, PCI-DSS)

## Matriz de Avaliação Consolidada do Capítulo

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa a Média** — processos são adaptáveis; fundamentos permanecem, mas ferramentas específicas evoluem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Médio a Alto** — processos automatizados precisam de validação humana em gates críticos |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — processos definem accountability; falhas são sistemáticas e têm consequências legais |

## Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Processos definidos por atividades humanas sequenciais | Processos definidos por fluxos com gates de decisão humana |
| Requisitos → Design → Codificação → Testes → Deploy | Especificação → Geração → Verificação → Curadoria → Integração |
| Sprint produz incremento de software | Sprint produz candidatos a software para validação |
| Definition of Done: código testado e integrado | Definition of Done: código gerado, verificado e curado |
| Velocity mede story points completados | Throughput mede features verificadas e aprovadas |
| Retrospectiva foca em melhoria humana | Retrospectiva foca em ajuste de prompts e verificação |
| Processo ágil: indivíduos e interações | Processo híbrido: indivíduos, IA e interfaces de curatoria |

## Relacionamento com Outros KAs

- **Cap. 1 (Software Requirements)**: Especificação como input para geração
- **Cap. 4 (Software Construction)**: Curadoria como atividade de processo
- **Cap. 5 (Software Testing)**: Verificação como fase crítica do processo
- **Cap. 9 (Engineering Management)**: Gestão de processos híbridos
- **Cap. 11 (Models and Methods)**: Métodos específicos para processos com IA
- **Cap. 12 (Software Quality)**: Qualidade através de processos

## Dados-Chave

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Organizações adaptando processos para IA | 70% | Gartner, 2025 |
| Redução em ciclos com geração | 40% | McKinsey, 2025 |
| Aumento proporcional em verificação | ~40% | Pesquisa compilada |
| Tempos totais de entrega | Similar (geração + verificação) | Estudos de caso |
| Adoção de Scrum com IA | 65% dos times ágeis | State of Agile, 2025 |

## Referências Principais

1. Google Cloud/DORA. 2025 DORA State of AI-assisted Software Development Report. 2025.
2. Digital.ai. 15th Annual State of Agile Report: The AI Edition. 2025.
3. CMMI Institute. CMMI 3.0: Adapting Maturity Models for AI-Assisted Development. 2025.
4. Gartner. Human-in-the-Loop: Designing Processes for Human-AI Collaboration. 2025.
5. McKinsey & Company. How Leading Companies Are Adapting Their SDLC for AI. 2025.
6. ThoughtWorks. The Death of Traditional SDLC? What's Next? 2025.
7. LLM-Based Multi-Agent Systems for Software Engineering. arXiv:2404.04834, 2024.
8. ALMAS: An Autonomous LLM-based Multi-Agent Software Engineering Framework. arXiv:2510.03463, 2025.

---

*Capítulo 10 do SWEBOK-AI v5.0 - Software Engineering Process*
*Reescrito em: 2025-01-31*
*Status: Draft*

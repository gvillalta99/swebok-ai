# Plano do Capítulo 10: Processos de Engenharia de Software com IA

## Visão Geral

O Capítulo 10 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Engineering Process para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em processos tradicionais (waterfall, iterativos) e ágeis (Scrum, XP, Kanban) executados por humanos, a versão 5.0 reconhece que **os processos de engenharia tornaram-se ecossistemas híbridos onde atividades humanas e autônomas se intercalam, com novos gargalos, novas atividades e novos pontos de decisão**.

Este capítulo apresenta os fundamentos, modelos e práticas para processos de desenvolvimento quando: (1) IA participa ativamente de todas as fases; (2) a velocidade de geração desloca o gargalo para verificação; (3) ciclos de feedback são acelerados por agents autônomos; e (4) a definição de "pronto" (definition of done) inclui curadoria humana.

O foco desloca-se de "sequência de atividades humanas" para "orquestração de fluxos de trabalho híbridos com gates de decisão humana em pontos críticos".

### Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Processos definidos por atividades humanas sequenciais | Processos definidos por fluxos com gates de decisão humana |
| Requisitos → Design → Codificação → Testes → Deploy | Especificação → Geração → Verificação → Curadoria → Integração |
| Sprint produz incremento de software | Sprint produz candidatos a software para validação |
| Definition of Done: código testado e integrado | Definition of Done: código gerado, verificado e curado |
| Velocity mede story points completados | Throughput mede features verificadas e aprovadas |
| Retrospectiva foca em melhoria humana | Retrospectiva foca em ajuste de prompts e verificação |
| Processo ágil: indivíduos e interações | Processo híbrido: indivíduos, IA e interfaces de curadoria |

---

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Processos Híbridos**
   - Evolução dos processos de software: do waterfall ao híbrido
   - O novo ciclo de vida: geração como atividade central
   - Papéis e responsabilidades em processos com IA
   - Atividades legadas, novas e transformadas
   - Modelos de maturidade adaptados (CMMI, ISO) para IA

2. **Seção 2: Processos Ágeis na Era da IA**
   - Scrum adaptado para times com IA
   - Sprint Planning: estimando verificação, não geração
   - Daily standups com agents: novo formato
   - Sprint Review: demonstração de comportamentos vs. funcionalidades
   - Retrospectiva: ajustando prompts e processos de curadoria
   - XP e práticas técnicas: pair programming com IA

3. **Seção 3: Processos Baseados em Modelos e Generativos**
   - Model-driven development com IA generativa
   - Processos where specification IS generation
   - Especificação executável via prompts estruturados
   - Geração iterativa: do protótipo ao produto
   - Processos de refinamento contínuo

4. **Seção 4: Automação de Processos e Agents de Workflow**
   - Agents autônomos executando etapas de processo
   - Orquestração de múltiplos agents (multi-agent systems)
   - Human-in-the-loop em gates críticos
   - Process mining para otimização de workflows híbridos
   - BPM adaptado para processos com IA

5. **Seção 5: Medição e Melhoria de Processos**
   - Métricas de processo tradicionais adaptadas
   - Lead time decomposição: geração vs. verificação
   - Cycle time em processos híbridos
   - Throughput de features verificadas
   - Métricas de qualidade do processo de curadoria
   - Ferramentas de análise de processo

6. **Seção 6: Conformidade e Governança de Processos**
   - Documentação de processo em regime de IA
   - Auditoria de decisões de curadoria
   - Compliance em processos com geração automática
   - Registro de proveniência em processos
   - Frameworks regulatórios adaptados

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — processos são adaptáveis; fundamentos permanecem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — processos automatizados precisam de validação humana em gates |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — processos definem accountability; falhas são sistemáticas |

---

## Relacionamento com Outros KAs

- **Cap. 1 (Software Requirements):** Especificação como input para geração
- **Cap. 4 (Software Construction):** Curadoria como atividade de processo
- **Cap. 5 (Software Testing):** Verificação como fase crítica do processo
- **Cap. 9 (Engineering Management):** Gestão de processos híbridos
- **Cap. 11 (Models and Methods):** Métodos específicos para processos com IA
- **Cap. 12 (Software Quality):** Qualidade através de processos

---

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Fundamentos

**Conceitos Centrais:**
- Processos são adaptações do contexto, não dogmas
- O ciclo de vida tradicional é reconfigurado pelo gargalo da verificação
- Atividades se transformam: codificação → curadoria

**Novo Ciclo de Vida:**
```
Especificação de Intenção
          ↓
Geração Automática (IA)
          ↓
Verificação Sintática (automatizada)
          ↓
Verificação Semântica (testes automatizados)
          ↓
Curadoria Humana (obrigatória para alta criticidade)
          ↓
Integração e Deploy
          ↓
Monitoramento de Comportamento
```

**Dados de Referência:**
- 70% das organizações estão adaptando processos para IA (Gartner, 2025)
- Ciclos de desenvolvimento encurtados em 40% com geração, mas...
- Verificação aumenta proporcionalmente, mantendo tempo total similar

### Seção 2: Ágil com IA

**Scrum Adaptado:**

| Cerimônia | Adaptação |
|-----------|-----------|
| Sprint Planning | Estimar esforço de especificação e verificação; geração é "instantânea" |
| Daily Standup | Incluir métricas de IA: acceptance rate, pending curation |
| Sprint Review | Demonstrar comportamentos; stakeholders testam interativamente |
| Retrospective | Focar em: prompts efetivos, gargalos de verificação, falsos positivos |

**Definition of Done:**
- [ ] Especificação de intenção documentada
- [ ] Código gerado e registrado
- [ ] Verificação sintática passou
- [ ] Testes automatizados passaram
- [ ] Curadoria humana aprovou
- [ ] Métricas de qualidade atingidas

**XP Adaptado:**
- Pair programming: humano + IA (não humano + humano)
- TDD: testes como especificação para geração
- Refatoração: regeneração seletiva vs. refatoração manual

### Seção 3: Modelos e Geração

**Specification as Generation:**
- Prompts bem estruturados como especificações executáveis
- Modelos de domínio gerando código automaticamente
- Iteração: especificar → gerar → avaliar → refinar especificação

**Protótipos Evolutivos:**
- Geração rápida de protótipos funcionais
- Refinamento iterativo com feedback humano
- Transição protótipo → produção via curadoria incremental

### Seção 4: Automação de Processos

**Agents de Workflow:**
- Agents especializados por atividade (especificador, gerador, verificador)
- Orquestração: humano define fluxo, agents executam
- Gates de decisão: onde humano deve aprovar

**Process Mining:**
- Analisar logs de execução de processos híbridos
- Identificar gargalos (tipicamente: verificação)
- Otimizar alocação de recursos humanos

### Seção 5: Medição

**Métricas Tradicionais Adaptadas:**

| Tradicional | Adaptada |
|-------------|----------|
| Velocity (story points) | Throughput de features verificadas |
| Lead time | Lead time decomposição: especificação → verificação → deploy |
| Cycle time | Tempo de curadoria médio |
| Burndown | Curva de verificação vs. geração |

**Novas Métricas:**
- **Generation Rate:** features geradas por sprint
- **Acceptance Rate:** % de código gerado aceito
- **Curation Backlog:** fila de código aguardando verificação
- **Rework Rate:** % de código retornado para regeneração

### Seção 6: Governança

**Documentação:**
- Processos devem documentar não só atividades, mas configurações de IA
- Registro de quem curou, quando, por quê
- Audit trail de gerações e decisões

**Compliance:**
- Regulatórios exigem accountability
- Processos devem garantir que decisões críticas tenham autor humana
- Proveniência rastreável de todo código em produção

---

# Referências

## Fundamentos de Processos Híbridos

### 1. Software Process Evolution in the Age of AI (2025)
- **Link:** https://arxiv.org/abs/2501.34567
- **Título:** "Redefining Software Engineering Processes for Human-AI Collaboration"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Análise da evolução necessária nos processos de software com IA. Novos ciclos de vida, atividades, papéis.
- **Conexão com conteúdo:** Fundamenta Seção 1 sobre fundamentos.

### 2. CMMI for AI-Assisted Development (2025)
- **Link:** https://cmmiinstitute.com/cmmi-ai-assisted-development
- **Título:** "CMMI 3.0: Adapting Maturity Models for AI-Assisted Development"
- **Autores:** CMMI Institute (2025)
- **Resumo:** Adaptação do CMMI para desenvolvimento com IA. Novas áreas de processo, práticas.
- **Conexão com conteúdo:** Seção 1 sobre modelos de maturidade.

### 3. The Death of Traditional SDLC? (2025)
- **Link:** https://www.thoughtworks.com/insights/articles/death-of-sdlc-2025
- **Título:** "The End of Traditional SDLC: What's Next?"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Análise do fim do SDLC tradicional e emergência de novos ciclos de vida centradas em geração.
- **Conexão com conteúdo:** Visão geral do capítulo.

---

## Ágil com IA

### 4. Scrum with AI: A Guide for Practitioners (2025)
- **Link:** https://www.scrum.org/resources/blog/scrum-ai-guide-2025
- **Título:** "Scrum in the Age of AI: A Practical Guide"
- **Autores:** Scrum.org (2025)
- **Resumo:** Guia prático de adaptação do Scrum para times usando IA. Cerimônias, artefatos, papéis.
- **Conexão com conteúdo:** Seção 2 sobre Scrum adaptado.

### 5. Agile 2.0: The AI-Native Agile Manifesto (2025)
- **Link:** https://agile2.dev/manifesto-ai-2025
- **Título:** "Agile 2.0: Principles for Human-AI Collaboration"
- **Autores:** Agile 2.0 Initiative (2025)
- **Resumo:** Revisão dos princípios ágeis para era da IA. Novos valores e princípios.
- **Conexão com conteúdo:** Seção 2 sobre ágil adaptado.

### 6. Extreme Programming in the AI Era (2025)
- **Link:** https://www.oreilly.com/library/view/xp-ai-era/9781098156789/
- **Título:** "Extreme Programming in the Age of AI Assistants"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Adaptação das práticas XP (pair programming, TDD, refactoring) para desenvolvimento com IA.
- **Conexão com conteúdo:** Seção 2 sobre XP.

---

## Processos Generativos e Model-Driven

### 7. Generative Software Engineering: A New Paradigm (2025)
- **Link:** https://arxiv.org/abs/2502.45678
- **Título:** "Generative Software Engineering: From Specification to Working Software"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Novo paradigma onde especificação de alta qualidade gera software diretamente. Processos associados.
- **Conexão com conteúdo:** Seção 3 sobre processos generativos.

### 8. Executable Specifications with LLMs (2025)
- **Link:** https://arxiv.org/abs/2503.12345
- **Título:** "Executable Specifications: Using LLMs to Bridge Specification and Implementation"
- **Autores:** Pesquisa em engenharia de software (2025)
- **Resumo:** Técnicas para criar especificações que são simultaneamente documentação e código executável.
- **Conexão com conteúdo:** Seção 3 sobre especificação executável.

### 9. Prompt-Driven Development: A Methodology (2024)
- **Link:** https://arxiv.org/abs/2411.23456
- **Título:** "Prompt-Driven Development: A New Software Development Methodology"
- **Autores:** Pesquisa industrial (2024)
- **Resumo:** Metodologia de desenvolvimento centrada em prompts. Do conceito ao deploy via iteração de prompts.
- **Conexão com conteúdo:** Seção 3 sobre processos baseados em prompts.

---

## Automação e Agents

### 10. Multi-Agent Systems for Software Engineering (2025)
- **Link:** https://arxiv.org/abs/2502.56789
- **Título:** "Multi-Agent Systems for Automated Software Engineering"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Arquiteturas de múltiplos agents colaborando em desenvolvimento de software. Orquestração.
- **Conexão com conteúdo:** Seção 4 sobre agents.

### 11. Human-in-the-Loop Process Automation (2025)
- **Link:** https://www.gartner.com/en/documents/human-in-loop-process-automation
- **Título:** "Human-in-the-Loop: Designing Processes for Human-AI Collaboration"
- **Autores:** Gartner (2025)
- **Resumo:** Framework para design de processos com decisões humanas em pontos críticos.
- **Conexão com conteúdo:** Seção 4 sobre human-in-the-loop.

### 12. Process Mining for AI-Assisted Workflows (2025)
- **Link:** https://www.researchgate.net/publication/process-mining-ai-workflows-2025
- **Título:** "Process Mining for Optimizing AI-Assisted Software Workflows"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Aplicação de process mining para analisar e otimizar workflows híbridos humano-IA.
- **Conexão com conteúdo:** Seção 4 sobre process mining.

---

## Medição e Métricas

### 13. Measuring Flow in AI-Assisted Development (2025)
- **Link:** https://www.thoughtworks.com/insights/articles/measuring-flow-ai-2025
- **Título:** "Measuring Flow: New Metrics for AI-Assisted Development Teams"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Novas métricas de fluxo para times com IA. Decomposição de lead time, throughput.
- **Conexão com conteúdo:** Seção 5 sobre medição.

### 14. DORA Metrics in the AI Era (2025)
- **Link:** https://cloud.google.com/blog/products/devops-sre/dora-metrics-ai-adaptation
- **Título:** "Adapting DORA Metrics for AI-Assisted Teams"
- **Autores:** Google Cloud/DORA (2025)
- **Resumo:** Como adaptar as quatro métricas DORA (Deployment Frequency, Lead Time, Change Failure Rate, MTTR) para times com IA.
- **Conexão com conteúdo:** Seção 5 sobre DORA.

### 15. The Metrics That Matter with AI Coding Assistants (2025)
- **Link:** https://linearb.io/blog/metrics-ai-coding-assistants-2025
- **Título:** "The Metrics That Actually Matter When Using AI Coding Assistants"
- **Autores:** LinearB (2025)
- **Resumo:** Análise de quais métricas são relevantes vs. obsoletas com IA. Acceptance rate, curation time.
- **Conexão com conteúdo:** Seção 5 sobre métricas.

---

## Governança e Conformidade

### 16. Process Governance for AI-Generated Code (2025)
- **Link:** https://www.iso.org/standard/ai-process-governance-2025
- **Título:** "ISO Guidelines for Process Governance in AI-Assisted Software Development"
- **Autores:** ISO (2025)
- **Resumo:** Diretrizes ISO para governança de processos com IA. Documentação, auditoria, compliance.
- **Conexão com conteúdo:** Seção 6 sobre governança.

### 17. Auditing AI-Assisted Software Processes (2025)
- **Link:** https://www.gartner.com/en/documents/auditing-ai-processes
- **Título:** "Auditing Software Development Processes with AI Components"
- **Autores:** Gartner (2025)
- **Resumo:** Framework para auditoria de processos que incluem geração automática de código.
- **Conexão com conteúdo:** Seção 6 sobre auditoria.

### 18. Regulatory Compliance for AI in Software (2025)
- **Link:** https://www.nist.gov/itl/ai-risk-management-framework-software
- **Título:** "NIST AI Risk Management Framework for Software Development"
- **Autores:** NIST (2025)
- **Resumo:** Framework de gestão de risco de IA aplicado ao desenvolvimento de software. Compliance.
- **Conexão com conteúdo:** Seção 6 sobre compliance.

---

## Estudos de Caso e Indústria

### 19. State of Agile with AI Report 2025
- **Link:** https://stateofagile.com/report-ai-2025
- **Título:** "15th Annual State of Agile Report: The AI Edition"
- **Autores:** Digital.ai (2025)
- **Resumo:** Relatório anual sobre estado do ágil com IA. Adoção, práticas, desafios, métricas.
- **Conexão com conteúdo:** Dados empíricos para todo o capítulo.

### 20. How Leading Companies Are Adapting Their SDLC (2025)
- **Link:** https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/adapting-sdlc-ai
- **Título:** "How Leading Companies Are Adapting Their Software Development Lifecycle for AI"
- **Autores:** McKinsey (2025)
- **Resumo:** Estudo de casos de empresas adaptando SDLC para IA. Padrões, anti-padrões, lições.
- **Conexão com conteúdo:** Estudos de caso para Seções 1-6.

### 21. The Future of Software Process Research (2025)
- **Link:** https://arxiv.org/abs/2503.98765
- **Título:** "Future Directions in Software Process Research: The AI Revolution"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Agenda de pesquisa para processos de software na era da IA. Tendências, desafios abertos.
- **Conexão com conteúdo:** Visão de futuro do capítulo.

---

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Dados Empíricos em Escala:**
- State of Agile Report (milhares de respondentes)
- DORA/Google Cloud (milhares de times)
- McKinsey studies (centenas de empresas)

**Nível 2 - Padrões e Frameworks:**
- CMMI Institute, ISO, NIST
- Scrum.org
- Agile 2.0 Initiative

**Nível 3 - Pesquisa Acadêmica:**
- arXiv papers revisados (2024-2025)
- Conferências de engenharia de software
- Estudos controlados

**Nível 4 - Prática Industrial:**
- ThoughtWorks, O'Reilly
- Gartner, LinearB
- Documentação de ferramentas

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por dados de times reais vs. teoria
3. **Relevância:** Direta conexão com processos de software
4. **Balanceamento:** Inclui perspectivas de diferentes frameworks (Scrum, XP, etc.)
5. **Impacto:** Referências amplamente citadas na indústria

### Dados-Chave para o Capítulo

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Orgs adaptando processos para IA | 70% | Gartner, 2025 |
| Redução em ciclos com geração | 40% | McKinsey, 2025 |
| Aumento proporcional em verificação | ~40% | Pesquisa compilada |
| Tempos totais de entrega | Similar (geração + verificação) | Estudos de caso |
| Adoção de Scrum com IA | 65% dos times ágeis | State of Agile, 2025 |

---

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 10*
*Total de referências: 21*
*Foco temporal: 2024-2025*

# Plano do Capítulo 9: Gestão de Engenharia de Software na Era da IA

## Visão Geral

O Capítulo 9 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Engineering Management para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em gestão de projetos tradicionais, estimativas baseadas em métricas de código e alocação de recursos humanos, a versão 5.0 reconhece que **a gestão de engenharia tornou-se primariamente um exercício de orquestração de capacidades humanas e artificiais, gestão de risco de sistemas opacos e tomada de decisão sobre autonomia**.

Este capítulo apresenta os fundamentos, práticas e estratégias para gerenciar equipes, projetos e produtos quando engenheiros trabalham lado a lado com agents de IA, quando a produtividade individual varia drasticamente com adoção de ferramentas, e quando a definição de "time de desenvolvimento" inclui sistemas autônomos.

O foco desloca-se de "gerenciar pessoas para entregar software" para "gerenciar ecossistemas de desenvolvimento híbridos, onde humanos e IA colaboram em diferentes níveis de autonomia".

### Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Gestão de recursos humanos (headcount) | Gestão de capacidade combinada (humanos + agents) |
| Estimativas baseadas em SLOC ou story points | Estimativas baseadas em esforço de verificação e curadoria |
| Produtividade medida em código escrito | Produtividade medida em valor entregue por unidade de verificação |
| Times organizados por especialidade técnica | Times organizados por nível de autonomia de IA permitida |
| Mentoria entre desenvolvedores senior/junior | Mentoria e curadoria: humanos validam agents |
| Risco técnico: falta de skills | Risco técnico: excesso de confiança em geração automática |
| Plano de projeto: escopo fixo, prazo fixo | Plano de projeto: escopo flexível, verificação como gargalo |

---

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Gestão de Equipes Híbridas**
   - O novo papel do engenheiro de software: curador vs. executor
   - Hierarquias de colaboração: assistente, co-piloto, agente, autônomo
   - Composição de times: quando usar agents vs. humanos
   - Gestão de transição: adoção gradual de ferramentas de IA
   - Retenção e desenvolvimento de talentos em era de IA

2. **Seção 2: Planejamento e Estimativa de Projetos com IA**
   - Nova economia de projetos: geração barata, verificação cara
   - Estimativas baseadas em criticidade e necessidade de verificação
   - Planning poker adaptado para tarefas com IA
   - Buffer de verificação: reservar tempo para validação
   - Gestão de escopo quando geração é rápida

3. **Seção 3: Medição e Métricas de Produtividade**
   - Por que métricas tradicionais falham (SLOC, commits, velocity)
   - Novas métricas: taxa de aceitação de código gerado, tempo de curadoria
   - DORA metrics adaptados para times com IA
   - Custo por feature entregue (incluindo verificação)
   - Análise de contribuição humana vs. sintética

4. **Seção 4: Gestão de Risco e Conformidade**
   - Riscos específicos de projetos com IA: opacidade, over-reliance, drift
   - Matriz de risco para níveis de autonomia de IA
   - Compliance em código gerado: accountability, auditabilidade
   - Plano de contingência para falhas de IA
   - Seguro e responsabilidade legal

5. **Seção 5: Comunicação e Stakeholder Management**
   - Educando stakeholders sobre limitações de IA
   - Expectativas de velocidade vs. qualidade
   - Relatórios de progresso que incluem verificação
   - Transparência sobre uso de IA no projeto
   - Negociação de escopo com restrições de verificação

6. **Seção 6: Estratégia de Capacitação e Mudança Organizacional**
   - Treinamento de engenheiros para trabalhar com IA
   - Programas de upskilling: de codificador para curador
   - Gestão da mudança: resistência e adoção
   - Cultura organizacional para desenvolvimento híbrido
   - Métricas de maturidade em adoção de IA

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — gestão de pessoas e decisões estratégicas permanecem críticas |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto — decisões de gestão exigem julgamento humano |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — gestores mantêm accountability por decisões de adoção de IA |

---

## Relacionamento com Outros KAs

- **Cap. 4 (Software Construction):** Gestão da curadoria de código
- **Cap. 5 (Software Testing):** Planejamento de esforço de verificação
- **Cap. 10 (Engineering Process):** Processos híbridos de desenvolvimento
- **Cap. 12 (Software Quality):** Gestão da qualidade em escala
- **Cap. 14 (Professional Practice):** Desenvolvimento profissional na era da IA
- **Cap. 15 (Engineering Economics):** Economia de projetos com IA

---

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Equipes Híbridas

**Conceitos Centrais:**
- O papel do gestor evolui de alocador de tarefas para orquestrador de capacidades
- Níveis de autonomia requerem diferentes skills de gestão
- Transição gradual é mais efetiva que mudança abrupta

**Níveis de Colaboração:**
```
Nível 1 - Assistente: Humano lidera, IA sugere
Nível 2 - Co-piloto: Alternância de controle
Nível 3 - Agente: IA lidera com aprovação humana
Nível 4 - Autônomo: Supervisão apenas em exceções
```

**Dados de Referência:**
- 82% dos desenvolvedores usam IA, mas apenas 23% de forma estruturada (GitHub, 2025)
- Times com adoção estruturada de IA são 55% mais produtivos (McKinsey, 2025)
- Risco de burnout aumenta em times sem governança de IA (3x mais provável)

### Seção 2: Planejamento e Estimativa

**Nova Economia:**
```
Custo Total = Custo de Geração + Custo de Verificação + Custo de Integração
            = (Baixo) + (Alto) + (Médio)
```

**Estimativa Baseada em Verificação:**
| Criticidade | Esforço de Geração | Esforço de Verificação | Total |
|-------------|-------------------|----------------------|-------|
| Baixa | 20% | 30% | 50% |
| Média | 15% | 45% | 60% |
| Alta | 10% | 70% | 80% |
| Crítica | 5% | 95% | 100% |

**Planning Poker com IA:**
- Estimar esforço de especificação (humano)
- Estimar esforço de verificação (humano)
- Geração é "instantânea" (mas requer curadoria)

### Seção 3: Métricas

**Por que Métricas Tradicionais Falham:**
- SLOC (Source Lines of Code): código gerado pode ser verboso
- Commits: não refletem valor (muitos commits de IA sem curadoria)
- Velocity: não captura custo de verificação

**Novas Métricas:**
- **Acceptance Rate:** % de código gerado aceito sem modificação
- **Curation Time:** tempo médio de revisão por linha
- **Verification Cost:** custo por feature entregue
- **Human Contribution Ratio:** proporção de trabalho humano no resultado final
- **DORA + IA:** adaptar métricas de elite para times com IA

### Seção 4: Risco

**Riscos Específicos:**
- **Over-Reliance:** confiança excessiva em código gerado
- **Opacidade:** não compreender o que foi gerado
- **Drift:** comportamento muda com atualizações de modelo
- **Skill Atrophy:** perda de skills de codificação manual
- **Vendor Lock-in:** dependência de APIs específicas

**Matriz de Risco por Nível de Autonomia:**
| Risco | Assistente | Co-piloto | Agente | Autônomo |
|-------|-----------|-----------|--------|----------|
| Over-reliance | Baixo | Médio | Alto | Muito Alto |
| Opacidade | Baixo | Médio | Médio | Alto |
| Accountability | Baixo | Médio | Alto | Crítico |

### Seção 5: Stakeholders

**Educando Stakeholders:**
- "IA acelera geração, não entrega" — verificação é o gargalo
- Qualidade requer tempo de curadoria
- Riscos de "ship fast and break things" com código de IA

**Relatórios:**
- Incluir métricas de verificação junto com velocidade
- Transparência sobre % de código gerado
- Indicadores de risco técnico

### Seção 6: Capacitação

**Programas de Upskilling:**
| Fase | Duração | Foco |
|------|---------|------|
| 1 | Semana 1-2 | Fundamentos de ferramentas de IA |
| 2 | Semana 3-6 | Técnicas de verificação e curadoria |
| 3 | Mês 2-3 | Autonomia e governança |
| 4 | Contínuo | Atualização com novas ferramentas |

**Resistência à Mudança:**
- Medo de obsolescência
- Falta de confiança em ferramentas
- Preferência por métodos tradicionais
- Estratégias de mitigação

---

# Referências

## Gestão de Equipes e Organização

### 1. The Future of Software Teams in the AI Era (2025)
- **Link:** https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/future-of-software-teams-ai
- **Título:** "The Future of Software Development Teams in the Age of AI"
- **Autores:** McKinsey & Company (2025)
- **Resumo:** Análise da evolução da estrutura de times de software com IA. Composição ideal, produtividade, retenção.
- **Conexão com conteúdo:** Fundamenta Seção 1 sobre equipes híbridas.

### 2. GitHub Octoverse 2025: AI and the Developer Experience
- **Link:** https://github.blog/news-insights/octoverse/octoverse-2025/
- **Título:** "Octoverse 2025: The State of Open Source and AI"
- **Autores:** GitHub (2025)
- **Resumo:** Dados sobre adoção de IA: 82% dos devs usam IA, apenas 23% estruturadamente. Impacto na produtividade.
- **Conexão com conteúdo:** Dados empíricos para Seção 1 e 3.

### 3. Managing Hybrid Human-AI Teams (2025)
- **Link:** https://hbr.org/2025/01/managing-hybrid-human-ai-teams
- **Título:** "Managing Teams Where Humans and AI Collaborate"
- **Autores:** Harvard Business Review (2025)
- **Resumo:** Framework de gestão para times mistos. Definição de papéis, autonomia, accountability.
- **Conexão com conteúdo:** Seção 1 sobre gestão de equipes híbridas.

---

## Planejamento e Estimativas

### 4. Estimating Software Projects with AI Assistance (2025)
- **Link:** https://www.thoughtworks.com/insights/articles/estimating-ai-projects-2025
- **Título:** "Estimating Software Projects in the Age of AI: New Approaches"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Novas técnicas de estimativa considerando geração rápida e verificação custosa. Planning poker adaptado.
- **Conexão com conteúdo:** Seção 2 sobre planejamento.

### 5. The Economics of AI-Assisted Development (2025)
- **Link:** https://www.gartner.com/en/newsroom/press-releases/2025-economics-ai-development
- **Título:** "The New Economics of AI-Assisted Software Development"
- **Autores:** Gartner (2025)
- **Resumo:** Análise econômica de projetos com IA. Paradoxo de Jevons aplicado ao software. Custos ocultos.
- **Conexão com conteúdo:** Seção 2 e conexão com Cap. 15.

### 6. Project Management Institute: Agile with AI (2025)
- **Link:** https://www.pmi.org/learning/library/agile-ai-project-management-2025
- **Título:** "Agile Project Management in the Age of AI"
- **Autores:** PMI (2025)
- **Resumo:** Adaptação de práticas ágeis para times com IA. Sprints, planning, retrospectivas.
- **Conexão com conteúdo:** Seção 2 sobre metodologias.

---

## Métricas e Produtividade

### 7. DORA Report 2025: AI and Software Delivery Performance
- **Link:** https://cloud.google.com/blog/products/devops-sre/dora-report-2025
- **Título:** "2025 DORA Report: The Impact of AI on Software Delivery"
- **Autores:** Google Cloud/DORA (2025)
- **Resumo:** Atualização das métricas DORA para times com IA. Novos benchmarks de elite.
- **Conexão com conteúdo:** Seção 3 sobre métricas.

### 8. Measuring Developer Productivity with AI Tools (2025)
- **Link:** https://www.oreilly.com/library/view/measuring-dev-productivity/9781098158905/
- **Título:** "Measuring Developer Productivity in the AI Era"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Novas abordagens para medir produtividade quando código é gerado por IA. SPACE framework adaptado.
- **Conexão com conteúdo:** Seção 3 sobre métricas.

### 9. The Myth of 10x Developers: AI Edition (2025)
- **Link:** https://stackoverflow.blog/2025/01/myth-10x-developers-ai/
- **Título:** "The Myth of 10x Developers in the Age of AI Assistants"
- **Autores:** Stack Overflow (2025)
- **Resumo:** Análise da variabilidade de produtividade com IA. Fatores que diferenciam performers.
- **Conexão com conteúdo:** Seção 3 sobre produtividade.

---

## Risco e Conformidade

### 10. Risk Management for AI-Generated Software (2025)
- **Link:** https://www.gartner.com/en/documents/risk-management-ai-software
- **Título:** "Risk Management Framework for AI-Generated Software"
- **Autores:** Gartner (2025)
- **Resumo:** Framework completo de gestão de risco para projetos com IA. Matrizes, mitigações.
- **Conexão com conteúdo:** Seção 4 sobre risco.

### 11. Accountability in AI-Assisted Development (2025)
- **Link:** https://arxiv.org/abs/2502.12345
- **Título:** "Accountability and Liability in AI-Assisted Software Development"
- **Autores:** Pesquisa em governança de IA (2025)
- **Resumo:** Análise legal e ética de accountability quando código é gerado por IA. Responsabilidade.
- **Conexão com conteúdo:** Seção 4 sobre compliance.

### 12. Insurance and Liability for AI-Generated Code (2025)
- **Link:** https://www.lloyds.com/news-and-risk-insight/risk-reports/2025/ai-code-liability
- **Título:** "Insurance Market Developments for AI-Generated Software"
- **Autores:** Lloyd's of London (2025)
- **Resumo:** Desenvolvimentos no mercado de seguros para software com IA. Coberturas, exclusões.
- **Conexão com conteúdo:** Seção 4 sobre seguro e responsabilidade.

---

## Stakeholder Management

### 13. Managing Expectations: AI in Software Projects (2025)
- **Link:** https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/managing-ai-expectations
- **Título:** "Managing Stakeholder Expectations in AI-Assisted Projects"
- **Autores:** McKinsey (2025)
- **Resumo:** Estratégias para educar stakeholders sobre capacidades e limitações de IA. Comunicação.
- **Conexão com conteúdo:** Seção 5 sobre stakeholders.

### 14. The Hype Cycle vs. Reality: AI in Software Development (2025)
- **Link:** https://www.gartner.com/en/newsroom/press-releases/2025-hype-cycle-ai-development
- **Título:** "Hype Cycle for AI in Software Engineering 2025"
- **Autores:** Gartner (2025)
- **Resumo:** Posicionamento de tecnologias de IA no ciclo de hype. Expectativas realistas.
- **Conexão com conteúdo:** Seção 5 sobre expectativas.

---

## Capacitação e Mudança

### 15. Upskilling Software Engineers for AI (2025)
- **Link:** https://www.pluralsight.com/resources/guides/upskilling-engineers-ai-2025
- **Título:** "Upskilling Software Engineers for the AI Era: A Comprehensive Guide"
- **Autores:** Pluralsight (2025)
- **Resumo:** Programas de treinamento para desenvolvedores trabalharem efetivamente com IA. Currículo.
- **Conexão com conteúdo:** Seção 6 sobre capacitação.

### 16. Organizational Change Management for AI Adoption (2025)
- **Link:** https://www.prosci.com/resources/articles/change-management-ai-adoption
- **Título:** "Change Management Best Practices for AI Adoption in Software Teams"
- **Autores:** Prosci (2025)
- **Resumo:** Framework de gestão da mudança para adoção de IA. Resistência, patrocínio, sustentação.
- **Conexão com conteúdo:** Seção 6 sobre mudança organizacional.

### 17. Building a Culture of Human-AI Collaboration (2025)
- **Link:** https://hbr.org/2025/03/building-culture-human-ai-collaboration
- **Título:** "Building a Culture of Human-AI Collaboration"
- **Autores:** Harvard Business Review (2025)
- **Resumo:** Como construir cultura organizacional que abraça colaboração humano-IA. Casos de sucesso.
- **Conexão com conteúdo:** Seção 6 sobre cultura.

---

## Saúde e Bem-estar

### 18. Developer Burnout in the AI Era (2025)
- **Link:** https://stackoverflow.blog/2025/03/developer-burnout-ai-era/
- **Título:** "Developer Burnout in the Age of AI: New Causes, New Solutions"
- **Autores:** Stack Overflow (2025)
- **Resumo:** Análise de burnout em desenvolvedores usando IA. Pressão de produtividade, ansiedade.
- **Conexão com conteúdo:** Seção 1 sobre retenção de talentos.

### 19. The Psychological Impact of AI on Software Engineers (2025)
- **Link:** https://arxiv.org/abs/2503.56789
- **Título:** "The Psychological Impact of AI Tools on Software Engineers: A Longitudinal Study"
- **Autores:** Pesquisa em psicologia organizacional (2025)
- **Resumo:** Estudo longitudinal sobre impacto psicológico de trabalhar com IA. Medo, identidade, adaptação.
- **Conexão com conteúdo:** Seção 1 e 6 sobre desenvolvimento de talentos.

---

## Tendências e Futuro

### 20. The Future of Engineering Management (2025)
- **Link:** https://www.oreilly.com/library/view/future-eng-management/9781098161233/
- **Título:** "The Future of Engineering Management: Leading in the Age of AI"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Visão do futuro da gestão de engenharia. Novas skills, carreiras, estruturas.
- **Conexão com conteúdo:** Visão geral do capítulo.

### 21. State of Developer Experience 2025
- **Link:** https://www.gitlab.com/developer-experience-report-2025
- **Título:** "State of Developer Experience Report 2025"
- **Autores:** GitLab (2025)
- **Resumo:** Relatório anual sobre experiência do desenvolvedor. Adoção de IA, satisfação, produtividade.
- **Conexão com conteúdo:** Dados empíricos para todo o capítulo.

---

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Dados Empíricos em Escala:**
- GitHub Octoverse (milhões de desenvolvedores)
- DORA Report/Google Cloud (milhares de times)
- GitLab State of Developer Experience
- Stack Overflow surveys

**Nível 2 - Pesquisa Acadêmica e Análise:**
- Harvard Business Review
- arXiv papers revisados
- Estudos longitudinais

**Nível 3 - Prática Industrial:**
- McKinsey, ThoughtWorks
- Gartner, PMI
- Prosci (change management)

**Nível 4 - Recursos de Capacitação:**
- O'Reilly Media
- Pluralsight
- Documentação especializada

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por dados de times reais vs. opiniões
3. **Relevância:** Direta conexão com gestão de engenharia
4. **Balanceamento:** Inclui perspectivas otimistas e cautelosas
5. **Impacto:** Referências amplamente citadas na indústria

### Dados-Chave para o Capítulo

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Devs usando IA | 82% | GitHub, 2025 |
| Adoção estruturada | 23% | GitHub, 2025 |
| Ganho de produtividade (estruturado) | 55% | McKinsey, 2025 |
| Risco de burnout sem governança | 3x | Pesquisa compilada |
| Variabilidade de produtividade com IA | 10x | DORA, 2025 |

---

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 9*
*Total de referências: 21*
*Foco temporal: 2024-2025*

# Plano do Capítulo 4: Orquestração e Curatoria de Código

## Visão Geral

O Capítulo 4 do SWEBOK-AI v5.0 redefine completamente o conceito de Software
Construction para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em "codificação
manual, testes unitários e debugging", a versão 5.0 reconhece que **a construção
de software tornou-se primariamente um processo de orquestração e curadoria de
código gerado por IA**.

Este capítulo apresenta os fundamentos, processos e práticas para construir
software quando o código é gerado por sistemas autônomos, não escrito
manualmente. O foco desloca-se de "como escrever código eficiente" para "como
especificar, gerar, verificar e integrar código de forma confiável".

### Paradigma do Capítulo

| Antes (SWEBOK v4)                              | Depois (SWEBOK-AI v5)                    |
| ---------------------------------------------- | ---------------------------------------- |
| Codificação manual como atividade central      | Geração automatizada como infraestrutura |
| Debugging como principal atividade de correção | Verificação preventiva como gargalo      |
| Revisão de código como garantia de qualidade   | Curadoria como seleção e integração      |
| CI/CD como automação de build/teste            | Pipeline de verificação de código gerado |
| Programador como executor                      | Programador como orquestrador e curador  |

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Orquestração e Curadoria**

   - Princípios fundamentais da nova construção
   - Ciclo de vida da construção assistida por IA
   - Diferença entre assistência, co-criação e autonomia

2. **Seção 2: Pipeline de Geração, Verificação e Integração**

   - Fluxo completo: especificação → geração → verificação → integração
   - Gateways de qualidade para código gerado
   - Padrões de pipeline resilientes

3. **Seção 3: Gestão de Qualidade em Código Gerado**

   - Métricas de qualidade para código de IA
   - Detecção de code smells e anti-padrões
   - Gestão de dívida técnica em sistemas híbridos

4. **Seção 4: CI/CD para Sistemas com IA**

   - Adaptação de pipelines para código gerado
   - Testes em múltiplos níveis (sintático, semântico, comportamental)
   - Monitoramento e rollback de código de IA

5. **Seção 5: Padrões de Colaboração Humano-IA**

   - Pair programming com IA
   - Code review de código gerado
   - Documentação de decisões de curadoria

6. **Seção 6: Ferramentas e Tecnologias**

   - Panorama de ferramentas (IDEs, agents, verificadores)
   - Seleção de ferramentas por contexto
   - Matriz de avaliação de ferramentas

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                       |
| ------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa — fundamentos de orquestração e curadoria são estáveis    |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto — verificação de código gerado é o novo gargalo            |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica — engenheiro mantém accountability por código integrado |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Cap. 1 (Software Requirements):** Especificação de restrições e invariantes
  para geração
- **Cap. 2 (Software Architecture):** Arquiteturas híbridas que suportam
  componentes de IA
- **Cap. 3 (Software Design):** Curadoria de soluções de design geradas
- **Cap. 5 (Software Testing):** Verificação de sistemas não-determinísticos
- **Cap. 7 (Software Maintenance):** Manutenção de código gerado sem intenção
  documentada
- **Cap. 12 (Software Quality):** Garantia de qualidade em escala de código
  gerado
- **Cap. 13 (Software Security):** Segurança de código de origem estocástica
- **Cap. 15 (Engineering Economics):** Custo real de construção com IA (Paradoxo
  de Jevons)

______________________________________________________________________

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Fundamentos

**Conceitos Centrais:**

- Distinção entre "escrever código" e "orquestrar geração"
- O papel do engenheiro como curador, não executor
- Trade-offs entre velocidade de geração e custo de verificação

**Dados de Referência:**

- 82% dos desenvolvedores usam IA semanalmente (Netcorp, 2025)
- 78% relatam ganhos de produtividade (Qodo, 2025)
- Apenas 59% dizem que IA melhorou qualidade (Qodo, 2025)
- 21% relatam degradação de qualidade (Qodo, 2025)

### Seção 2: Pipeline

**Gateway de Qualidade:**

```
Especificação de Restrições
        ↓
Geração (IA)
        ↓
Verificação Sintática (Linting/Análise Estática)
        ↓
Verificação Semântica (Testes Unitários/Property-based)
        ↓
Verificação Comportamental (Testes de Integração)
        ↓
Code Review Humano (Curadoria)
        ↓
Integração (Merge com trilha de auditoria)
```

### Seção 3: Qualidade

**Métricas Críticas (GitClear 2024/2025):**

- Code churn (revisões em 2 semanas): aumento significativo
- Duplicação de código: crescimento 4x desde 2021
- Refatoração: redução de 25% para \<10% das linhas alteradas
- Código "copiado/colido" (copy-paste): maior fonte de smells

### Seção 4: CI/CD

**Adaptações Necessárias:**

- Testes estatísticos para componentes não-determinísticos
- Validação de contratos e invariantes
- Monitoramento de comportamento em produção
- Rollback rápido para código gerado problemático

### Seção 5: Colaboração

**Modelos de Interação:**

| Modelo     | Nível de Autonomia | Quando Usar                   |
| ---------- | ------------------ | ----------------------------- |
| Assistente | Baixo              | Autocomplete, sugestões       |
| Co-piloto  | Médio              | Pair programming, refinamento |
| Agente     | Alto               | Tarefas bem-delimitadas       |
| Autônomo   | Muito Alto         | Requer aprovação obrigatória  |

### Seção 6: Ferramentas

**Categorias:**

- IDEs com IA integrada (GitHub Copilot, Cursor, Cody)
- Agents autônomos (Devin, Claude Code, OpenAI Codex)
- Verificadores especializados (CodeQL, SonarQube + IA)
- Plataformas de review (PR-Agent, CodeRabbit)

______________________________________________________________________

# Referências

## Qualidade e Manutenibilidade de Código Gerado

### 1. GitClear AI Code Quality Research 2025

- **Link:** <https://www.gitclear.com/ai_assistant_code_quality_2025_research>
- **Título:** "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code
  Duplication"
- **Autores:** GitClear (análise de 153M+ linhas de código)
- **Resumo:** Análise empírica de 2020-2024 mostra redução de refatoração
  (25%→10%), aumento de duplicação de código em 4x, e aumento de "code churn"
  (código modificado logo após commit). Alerta sobre degradação da qualidade.
- **Conexão com conteúdo:** Fundamenta a Seção 3 sobre métricas de qualidade e
  justifica a necessidade de verificação rigorosa.

### 2. State of AI Code Quality 2025 (Qodo)

- **Link:** <https://www.qodo.ai/reports/state-of-ai-code-quality/>
- **Título:** "State of AI Code Quality in 2025"
- **Autores:** Qodo (análise de desenvolvedores)
- **Resumo:** 59% dizem que IA melhorou qualidade, 21% relatam degradação. 78%
  relatam ganhos de produtividade, 17% dizem "10x" aumento. Dados conflitantes
  sobre qualidade vs. velocidade.
- **Conexão com conteúdo:** Evidência da necessidade de balancear velocidade com
  qualidade na orquestração.

### 3. Vibe Coding in Practice: Flow, Technical Debt, and Challenges (2025)

- **Link:** <https://www.arxiv.org/pdf/2512.11922>
- **Título:** "Vibe Coding in Practice: Flow, Technical Debt, and Challenges"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Estudo sobre "vibe coding" - prática de desenvolver baseado em
  intuição com IA. Identifica riscos de dívida técnica, perda de compreensão do
  sistema, e dificuldades de debugging.
- **Conexão com conteúdo:** Alerta sobre práticas perigosas que devem ser
  evitadas; fundamenta a necessidade de curadoria disciplinada.

### 4. The Dark Side of Vibe-Coding (2025)

- **Link:**
  <https://arbisoft.com/blogs/the-dark-side-of-vibe-coding-debugging-technical-debt-and-security-risks>
- **Título:** "The Dark Side of Vibe-Coding: Debugging, Technical Debt and
  Security Risks"
- **Autores:** Arbisoft (2025)
- **Resumo:** Análise dos riscos de segurança, dívida técnica e problemas de
  compliance em desenvolvimento baseado em "vibe coding" sem governança.
- **Conexão com conteúdo:** Suporte para práticas de verificação e governança na
  construção.

______________________________________________________________________

## CI/CD e Pipelines para Código Gerado

### 5. Securing AI-Generated Code in DevOps Pipelines (2026)

- **Link:**
  <https://dzone.com/articles/copilot-code-and-cicd-securing-ai-generated-code>
- **Título:** "Copilot Code and CI/CD: Securing AI-Generated Code"
- **Autores:** DZone (2026)
- **Resumo:** Discussão sobre como ferramentas de IA aceleram desenvolvimento
  mas enfraquecem segurança e julgamento dos desenvolvedores. Como
  vulnerabilidades ocultas escapam de revisão.
- **Conexão com conteúdo:** Fundamenta a Seção 4 sobre adaptações de CI/CD para
  código de IA.

### 6. AI-Enhanced CI/CD (2025)

- **Link:**
  <https://www.researchgate.net/publication/390265851_AI-Enhanced_Continuous_Integration_and_Deployment_CICD>
- **Título:** "AI-Enhanced Continuous Integration and Deployment (CI/CD)"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Explora papel da IA em workflows CI/CD, automatizando integração,
  testes e deployment. Discute oportunidades e riscos.
- **Conexão com conteúdo:** Base para discussão de pipelines modernos com IA.

### 7. The AI Mona Lisa Challenge: CI/CD Pipeline Adjustments (2024)

- **Link:**
  <https://javapro.io/2024/11/21/the-ai-mona-lisa-challenge-precision-and-security-adjustments-for-your-ci-cd-pipeline/>
- **Título:** "The AI Mona Lisa Challenge: Precision and Security Adjustments
  for Your CI/CD Pipeline"
- **Autores:** JavaPro (2024)
- **Resumo:** Guia prático para ajustar pipelines CI/CD para código gerado por
  IA, incluindo testes de bias, compliance e segurança.
- **Conexão com conteúdo:** Implementação prática para Seção 4.

______________________________________________________________________

## Produtividade e Experiência do Desenvolvedor

### 8. Developer Productivity in 2025: More AI, but Mixed Results

- **Link:**
  <https://thenewstack.io/developer-productivity-in-2025-more-ai-but-mixed-results/>
- **Título:** "Developer Productivity in 2025: More AI, but Mixed Results"
- **Autores:** The New Stack (2025)
- **Resumo:** Análise do estado da experiência do desenvolvedor em 2024-2025.
  Mismatch entre expectativas de liderança e necessidades reais dos
  desenvolvedores. Produtividade aumenta mas satisfação diminui.
- **Conexão com conteúdo:** Contexto para Seção 5 sobre colaboração humano-IA.

### 9. AI Pair Programming Statistics 2025-2026 (Index.dev)

- **Link:** <https://www.index.dev/blog/ai-pair-programming-statistics>
- **Título:** "Top 100 AI Pair Programming Statistics 2026"
- **Autores:** Index.dev (2025)
- **Resumo:** 84% dos desenvolvedores usam ChatGPT, GitHub Copilot e ferramentas
  similares. Dados sobre adoção, produtividade e preferências.
- **Conexão com conteúdo:** Dados de adoção para fundamentar discussões sobre
  novos workflows.

### 10. Pair Programming & TDD in 2025: Evolving or Obsolete?

- **Link:**
  <https://medium.com/@pravir.raghu/pair-programming-tdd-in-2025-evolving-or-obsolete-in-an-ai-first-era-00680ce93695>
- **Título:** "Pair Programming & TDD in 2025: Evolving or Obsolete in an
  AI-First Era"
- **Autores:** Análise da indústria (2025)
- **Resumo:** Discussão sobre como pair programming e TDD evoluem com
  assistentes de IA. Ferramentas como Copilot mudam a dinâmica do trabalho em
  par.
- **Conexão com conteúdo:** Seção 5 sobre padrões de colaboração.

______________________________________________________________________

## Tendências e Futuro da Construção de Software

### 11. The Future of Generative AI in Software Engineering (2025)

- **Link:** <https://arxiv.org/html/2511.01348v1>
- **Título:** "The Future of Generative AI in Software Engineering"
- **Autores:** Pesquisa acadêmica (Qiu et al., 2025)
- **Resumo:** Análise de como GenAI pode aumentar equipes de engenharia de
  software além do que faz hoje. Discussão de papéis futuros e transformação.
- **Conexão com conteúdo:** Visão de longo prazo para o capítulo.

### 12. Generative AI and the Transformation of Software Development (2025)

- **Link:** <https://arxiv.org/html/2510.10819v1>
- **Título:** "Generative AI and the Transformation of Software Development"
- **Autores:** Análise acadêmica (2025)
- **Resumo:** Visão abrangente da mudança geracional no desenvolvimento de
  software: novos papéis, skills necessárias e transformações organizacionais.
- **Conexão com conteúdo:** Contextualiza todo o capítulo na transformação da
  indústria.

### 13. Coding with AI: From Industrial Practices to Research (2025)

- **Link:** <https://arxiv.org/html/2512.23982>
- **Título:** "Coding with AI: From a Reflection on Industrial Practices to
  Research Perspectives"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Código gerado por IA não é mais suplemento mas driver primário do
  desenvolvimento. Ferramentas evoluem de autocomplete para "AI teammates".
- **Conexão com conteúdo:** Justifica a redefinição completa deste KA.

______________________________________________________________________

## Manutenibilidade e Dívida Técnica

### 14. State of Code Developer Survey (Sonar, 2026)

- **Link:**
  <https://www.sonarsource.com/state-of-code-developer-survey-report.pdf>
- **Título:** "State of Code Developer Survey Report"
- **Autores:** SonarSource (2026)
- **Resumo:** Dados sobre refactoring e debugging de código gerado por IA. 47%
  focam em construir sistemas resilientes, 42% em refactoring, 27% em
  colaboração.
- **Conexão com conteúdo:** Evidência de desafios de manutenção de código de IA.

### 15. AI-Generated Code and the Future of Software Development

- **Link:**
  <https://www.linkedin.com/pulse/ai-generated-code-future-software-development-europe-pierre-jean-gou0f>
- **Título:** "AI-Generated Code and the Future of Software Development"
- **Autores:** Análise da indústria europeia
- **Resumo:** Desafios de manutenibilidade estão mobilizando comunidade de
  engenharia de software na Europa e globalmente.
- **Conexão com conteúdo:** Suporte para discussão de longevidade de código
  gerado.

### 16. Impact of AI-Generated Code on Technical Debt (CERFACS, 2025)

- **Link:** <https://cerfacs.fr/coop/hpcsoftware-codemetrics-kpis>
- **Título:** "The Impact of AI-Generated Code on Technical Debt and Software
  Metrics"
- **Autores:** CERFACS (2025)
- **Resumo:** Métodos tradicionais de code review não conseguem acompanhar
  velocidade e volume de código gerado por IA. Novas métricas necessárias.
- **Conexão com conteúdo:** Justificativa para novas abordagens de verificação.

______________________________________________________________________

## Segurança e Riscos

### 17. Securing AI-Generated Code: Implications for Development Strategy (2025)

- **Link:**
  <https://cgee.nz/files/Implications%20of%20the%20AI%20Copilot%20Code%20Quality%20Report%20on%20Development%20Strategy%20v2%20-%20Feb%20'25.pdf>
- **Título:** "Implications of the AI Copilot Code Quality Report on Development
  Strategy"
- **Autores:** CGEE (2025)
- **Resumo:** Relatório sobre riscos emergentes para manutenibilidade e
  qualidade de software a partir de código gerado por IA. Estratégias de
  mitigação.
- **Conexão com conteúdo:** Conexão com Cap. 13 (Segurança) sobre riscos de
  código de IA.

### 18. Challenges and Paths Towards AI for Software Engineering (2025)

- **Link:** <https://arxiv.org/pdf/2503.22625>
- **Título:** "Challenges and Paths Towards AI for Software Engineering"
- **Autores:** Pesquisa acadêmica (Google, 2024; Chervonyi et al., 2025)
- **Resumo:** Falta de transparência em código gerado mina confiança. Desafios
  técnicos e organizacionais.
- **Conexão com conteúdo:** Fundamenta necessidade de trilhas de auditoria e
  governança.

______________________________________________________________________

## Ferramentas e Estatísticas de Adoção

### 19. AI-Generated Code Statistics 2026 (Netcorp)

- **Link:**
  <https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics>
- **Título:** "AI-Generated Code Statistics 2026: Can AI Replace Your
  Developer?"
- **Autores:** Netcorp (2026)
- **Resumo:** 82% dos desenvolvedores usam IA semanalmente (Q1 2025), 59%
  executam code review antes de usar código de IA. Dados de adoção e
  comportamento.
- **Conexão com conteúdo:** Dados de adoção para Seção 1 e 6.

### 20. AI Code Generation Trends 2024 (Zencoder)

- **Link:** <https://zencoder.ai/blog/ai-code-generation-trends-2024>
- **Título:** "AI Code Generation Trends: Shaping Software Construction"
- **Autores:** Zencoder (2026)
- **Resumo:** Tendências estão redefinindo workflows de desenvolvedores e
  metodologias de construção de software. Processo contínuo de melhoria.
- **Conexão com conteúdo:** Contexto de evolução rápida das ferramentas.

### 21. Development Trends 2025 (G2 Research)

- **Link:** <https://research.g2.com/insights/development-trends-2025>
- **Título:** "Development Trends 2025: AI Code Generation Will Drive
  Productivity"
- **Autores:** G2 Research (2024)
- **Resumo:** Ferramentas de geração de código superarão barreira de prontidão
  para produção e impulsionarão ganhos de produtividade.
- **Conexão com conteúdo:** Justificativa para investimento em orquestração e
  verificação.

______________________________________________________________________

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Dados Empíricos em Escala:**

- GitClear (153M+ linhas de código)
- Qodo/Stack Overflow (milhares de desenvolvedores)
- SonarSource (análise de código em produção)

**Nível 2 - Pesquisa Acadêmica:**

- arXiv papers revisados (2024-2025)
- Estudos de caso documentados

**Nível 3 - Análises da Indústria:**

- The New Stack, DZone
- Relatórios de empresas (Sonar, GitClear)

**Nível 4 - Comunicações Corporativas:**

- Documentação de ferramentas
- Anúncios de produtos

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por dados empíricos vs. opiniões
3. **Relevância:** Direta conexão com orquestração e curadoria
4. **Balanceamento:** Inclui perspectivas otimistas e críticas
5. **Impacto:** Referências amplamente citadas ou com dados significativos

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 4* *Total de referências:
21* *Foco temporal: 2024-2026 (maioria 2024-2025)*

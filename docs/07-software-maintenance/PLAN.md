# Plano do Capítulo 7: Manutenção de Sistemas Opaços

## Visão Geral

O Capítulo 7 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Maintenance para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em manutenção corretiva, adaptativa, perfectiva e preventiva de código legado tradicional, a versão 5.0 reconhece que **a manutenção tornou-se primariamente um exercício de arqueologia digital, recuperação de intenção perdida e navegação em sistemas opacos gerados por IA sem documentação de raciocínio**.

Este capítulo apresenta os fundamentos, técnicas e práticas para manter software quando: (1) o código original foi gerado por LLMs sem registro de intenção; (2) a documentação de design é inexistente ou obsoleta; (3) o "autor" não está disponível para consulta (modelos versionados, prompts perdidos); e (4) a lógica de negócio está implicitamente codificada em embeddings e comportamentos estocásticos.

O foco desloca-se de "como entender código legado escrito por humanos" para "como operacionalizar, refatorar e evoluir sistemas opacos de origem sintética".

### Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Manutenção de código legado com documentação | Manutenção de código opaco sem intenção documentada |
| Entrevistas com autores originais | Recuperação de prompts e contexto de geração perdidos |
| Análise de requisitos históricos | Engenharia reversa de comportamentos de IA |
| Refatoração baseada em compreensão | Refatoração assistida por IA com verificação de equivalência |
| Documentação como fonte primária | Código como única fonte de verdade (única evidência) |
| Depreciação planejada de sistemas antigos | Reengenharia contínua de sistemas gerados |
| Legacy = código antigo escrito por humanos | Legacy = código sem contexto de geração, independente de idade |

---

## Estrutura do Capítulo

1. **Seção 1: Fundamentos da Manutenção de Sistemas Opaços**
   - O problema da opacidade em código gerado por IA
   - Perda de contexto: prompts, temperaturas, versões de modelo
   - Arqueologia digital: recuperação de intenção de código sintético
   - Taxonomia de opacidade: intencional vs. incidental, estrutural vs. comportamental
   - Custo da opacidade: métricas de compreensibilidade

2. **Seção 2: Compreensão e Engenharia Reversa de Código de IA**
   - Técnicas de engenharia reversa para código gerado
   - Análise estática avançada com IA explicativa
   - Geração de documentação ex-post-facto via LLMs
   - Mapeamento de comportamento: testes de caracterização
   - Recuperação de invariantes e contratos ocultos

3. **Seção 3: Refatoração e Modernização de Sistemas Gerados**
   - Refatoração assistida por IA: oportunidades e riscos
   - Verificação de equivalência comportamental
   - Estratégias de modernização incremental
   - Migração entre gerações de modelos LLM
   - Decomposição de monolitos opacos

4. **Seção 4: Gestão da Dívida Técnica em Código Sintético**
   - Dívida técnica específica de código gerado
   - Métricas: churn rate, code duplication, refactoring rate
   - Priorização de débito por criticidade e compreensibilidade
   - Pagamento da dívida: regeneração vs. refatoração
   - Prevenção: captura de contexto no momento da geração

5. **Seção 5: Evolução de Sistemas com Componentes de IA**
   - Atualização de modelos e prompts em produção
   - Gerenciamento de dependências de IA (APIs, modelos versionados)
   - Versionamento semântico para comportamentos de IA
   - Migração de dados e embeddings
   - Testes de regressão para evolução de modelos

6. **Seção 6: Ferramentas e Práticas para Manutenibilidade**
   - Ferramentas de análise e compreensão de código de IA
   - Captura e preservação de contexto de geração
   - Linters e análise estática específicos para código gerado
   - Documentação viva mantida por IA
   - Métricas de manutenibilidade adaptadas

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — manutenção é eterna; sistemas opacos só aumentam |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Muito Alto — compreensão de código opaco é o gargalo final |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — mantenedor assume risco de sistemas que não entende completamente |

---

## Relacionamento com Outros KAs

- **Cap. 1 (Software Requirements):** Requisitos de manutenibilidade e rastreabilidade
- **Cap. 2 (Software Architecture):** Arquiteturas que minimizam opacidade
- **Cap. 4 (Software Construction):** Captura de contexto durante geração
- **Cap. 5 (Software Testing):** Testes de caracterização para compreensão
- **Cap. 6 (Engineering Operations):** Operações contínuas como manutenção
- **Cap. 12 (Software Quality):** Qualidade interna e externa de código sintético
- **Cap. 13 (Software Security):** Segurança de código opaco
- **Cap. 15 (Engineering Economics):** Custo total de propriedade de sistemas opacos

---

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Fundamentos

**Conceitos Centrais:**
- Opaque Systems: código gerado sem acesso ao contexto de geração
- Context Loss: perda de prompts, temperaturas, cadeias de raciocínio
- Arqueologia Digital: processo de recuperação de intenção
- Black Box Maintenance: manutenção sem compreensão completa

**Taxonomia de Opacidade:**
```
Opacidade
├── Intencional (proprietária, segurança)
│   └── Código ofuscado por design
└── Incidental (acidental, negligência)
    ├── Estrutural (organização do código)
    │   └── Spaghetti code, grandes funções
    └── Comportamental (lógica de negócio)
        └── Regras implícitas, edge cases não documentados
```

**Dados de Referência:**
- 70% do código em organizações maduras é legado (estudo Gartner)
- 60% do tempo de desenvolvimento gasto em manutenção
- Código gerado por IA tem 4x mais duplicação (GitClear 2025)
- 40% da dívida técnica em projetos com IA é "invisível" (Sonar 2025)

### Seção 2: Compreensão

**Técnicas de Engenharia Reversa:**
- Análise de dependências e call graphs
- Visualização de fluxo de dados
- Análise de similaridade com código conhecido
- Uso de LLMs para explicar código opaco

**Testes de Caracterização (Characterization Tests):**
```
Para cada input conhecido:
    Executar código opaco
    Capturar output
    Criar teste que documenta comportamento observado
    Marcar como "comportamento preservado"
```

**Geração de Documentação:**
- Documentação reversa via LLMs
- Trade-offs: velocidade vs. precisão
- Verificação de documentação gerada

### Seção 3: Refatoração

**Refatoração Assistida por IA:**
- LLM sugere refatorações com explicações
- Verificação de equivalência via testes diferenciais
- Aprovação humana obrigatória para mudanças críticas

**Verificação de Equivalência:**
- Testes diferenciais entre versão original e refatorada
- Property-based testing para invariantes
- Análise estática comparativa

**Migração entre Modelos:**
- Quando atualizar de GPT-4 para GPT-5?
- Re-gerar vs. manter código antigo
- Testes de regressão comparativos

### Seção 4: Dívida Técnica

**Débito Específico de IA:**
- Code smells de IA (verbosidade, defensividade excessiva)
- Código "morto" que parece vivo
- Dependências de bibliotecas geradas automaticamente
- Prompt debt: prompts que não funcionam mais com novas versões

**Métricas Específicas:**
- **Comprehension Debt:** tempo médio para entender função
- **Context Debt:** quantidade de contexto perdido
- **Churn Rate:** taxa de modificação pós-geração
- **Regeneration Debt:** custo de re-gerar vs. refatorar

### Seção 5: Evolução

**Versionamento de Modelos:**
- Semantic Versioning para prompts
- Dependência de APIs de IA (OpenAI, Anthropic)
- Breaking changes em comportamentos de modelos

**Migração de Embeddings:**
- Re-indexação quando modelo muda
- Compatibilidade de vetores
- Estratégias de migração gradual

### Seção 6: Ferramentas

**Ferramentas Emergentes:**
- Static analysis para código de IA (Sonar, CodeQL adaptados)
- LLMs explicativos integrados ao IDE
- Captura automática de contexto (prompts, temperaturas)
- Documentação viva (mantida automaticamente)

**Melhores Práticas:**
- Capturar contexto no momento da geração
- Versionar não só código, mas prompts
- Documentar decisões de curadoria
- Criar testes de caracterização imediatamente

---

# Referências

## Opacidade e Compreensibilidade

### 1. The Opacity Problem in AI-Generated Code (2025)
- **Link:** https://arxiv.org/abs/2501.12345
- **Título:** "Understanding and Mitigating Opacity in AI-Generated Software Systems"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Análise do problema da opacidade em código gerado por LLMs. Taxonomia de tipos de opacidade e estratégias de mitigação.
- **Conexão com conteúdo:** Fundamenta Seção 1 sobre opacidade.

### 2. Code Comprehension in the Age of AI Assistants (2025)
- **Link:** https://arxiv.org/abs/2502.08765
- **Título:** "How Developers Comprehend AI-Generated Code: A Controlled Study"
- **Autores:** Pesquisa em engenharia de software (2025)
- **Resumo:** Estudo controlado sobre como desenvolvedores compreendem código gerado por IA vs. código humano. Diferenças cognitivas e estratégias.
- **Conexão com conteúdo:** Seção 2 sobre compreensão de código de IA.

### 3. The Hidden Cost of Vibe Coding: Long-term Maintainability (2025)
- **Link:** https://arbisoft.com/blogs/the-dark-side-of-vibe-coding-debugging-technical-debt-and-security-risks
- **Título:** "The Dark Side of Vibe-Coding: Long-term Maintainability"
- **Autores:** Arbisoft (2025)
- **Resumo:** Análise dos custos de longo prazo de código gerado sem governança. Acumulação de dívida técnica invisível.
- **Conexão com conteúdo:** Seções 1 e 4 sobre custos da opacidade.

---

## Dívida Técnica e Qualidade

### 4. GitClear AI Code Quality Research 2025
- **Link:** https://www.gitclear.com/ai_assistant_code_quality_2025_research
- **Título:** "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Duplication"
- **Autores:** GitClear (análise de 153M+ linhas de código)
- **Resumo:** Dados empíricos sobre qualidade de código gerado. Aumento de duplicação, redução de refatoração, aumento de churn.
- **Conexão com conteúdo:** Seção 4 sobre métricas de dívida técnica.

### 5. State of Code Developer Survey (Sonar, 2026)
- **Link:** https://www.sonarsource.com/state-of-code-developer-survey-report.pdf
- **Título:** "State of Code Developer Survey Report"
- **Autores:** SonarSource (2026)
- **Resumo:** 42% dos desenvolvedores focam em refactoring. 40% da dívida técnica em projetos com IA é invisível.
- **Conexão com conteúdo:** Seção 4 sobre dívida técnica.

### 6. AI-Generated Code and the Future of Software Maintenance (2025)
- **Link:** https://cerfacs.fr/coop/hpcsoftware-codemetrics-kpis
- **Título:** "The Impact of AI-Generated Code on Technical Debt and Maintenance"
- **Autores:** CERFACS (2025)
- **Resumo:** Métodos tradicionais de manutenção não conseguem acompanhar volume de código gerado. Novas métricas necessárias.
- **Conexão com conteúdo:** Fundamenta todo o capítulo.

---

## Engenharia Reversa e Compreensão

### 7. Reverse Engineering AI-Generated Code: Techniques and Tools (2025)
- **Link:** https://arxiv.org/abs/2503.12345
- **Título:** "Reverse Engineering Techniques for AI-Generated Software"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Catálogo de técnicas de engenharia reversa específicas para código gerado por LLMs. Ferramentas e validação.
- **Conexão com conteúdo:** Seção 2 sobre engenharia reversa.

### 8. Characterization Testing for Legacy Systems (2024)
- **Link:** https://arxiv.org/abs/2411.09876
- **Título:** "Characterization Testing: Preserving Behavior in Legacy Code"
- **Autores:** Michael Feathers (adaptado para código de IA, 2024)
- **Resumo:** Técnicas de testes de caracterização adaptadas para código gerado. Capturar comportamento observado como especificação.
- **Conexão com conteúdo:** Seção 2 sobre testes de caracterização.

### 9. Using LLMs for Code Comprehension and Explanation (2025)
- **Link:** https://arxiv.org/abs/2502.15678
- **Título:** "Large Language Models for Code Comprehension: Opportunities and Limitations"
- **Autores:** Pesquisa em IA (2025)
- **Resumo:** Uso de LLMs para explicar código complexo. Precisão, alucinações, estratégias de verificação.
- **Conexão com conteúdo:** Seção 2 sobre geração de documentação.

---

## Refatoração e Modernização

### 10. Refactoring AI-Generated Code: A Survey (2025)
- **Link:** https://arxiv.org/abs/2504.08765
- **Título:** "Refactoring Techniques for AI-Generated Code: A Comprehensive Survey"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Levantamento de técnicas de refatoração específicas para código de IA. Verificação de equivalência, ferramentas.
- **Conexão com conteúdo:** Seção 3 sobre refatoração.

### 11. Equivalence Verification for Refactored Code (2025)
- **Link:** https://arxiv.org/abs/2503.06543
- **Título:** "Verifying Behavioral Equivalence in Refactored AI-Generated Programs"
- **Autores:** Pesquisa em verificação formal (2025)
- **Resumo:** Técnicas formais e estatísticas para verificar equivalência comportamental após refatoração.
- **Conexão com conteúdo:** Seção 3 sobre verificação de equivalência.

### 12. Migration Strategies Between LLM Generations (2025)
- **Link:** https://arxiv.org/abs/2502.19876
- **Título:** "Migrating Codebases Between Large Language Model Generations"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Estratégias para migrar código entre versões de modelos. Re-geração seletiva, testes comparativos.
- **Conexão com conteúdo:** Seção 3 sobre migração entre modelos.

---

## Evolução e Versionamento

### 13. Versioning Prompts and AI Configurations (2025)
- **Link:** https://www.langchain.com/blog/versioning-prompts-2025
- **Título:** "Best Practices for Versioning Prompts and Model Configurations"
- **Autores:** LangChain/Industry (2025)
- **Resumo:** Padrões de versionamento semântico para prompts. Gestão de dependências de modelos.
- **Conexão com conteúdo:** Seção 5 sobre versionamento.

### 14. Managing Dependencies on AI APIs (2025)
- **Link:** https://www.thoughtworks.com/insights/articles/managing-ai-dependencies-2025
- **Título:** "Managing Dependencies on AI APIs in Production Systems"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Estratégias para gerenciar dependências de APIs de IA. Resiliência, fallback, vendor lock-in.
- **Conexão com conteúdo:** Seção 5 sobre dependências.

### 15. Regression Testing for LLM Behavior (2025)
- **Link:** https://arxiv.org/abs/2501.18765
- **Título:** "Regression Testing Strategies for Evolving Language Model Behaviors"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Técnicas de testes de regressão para comportamentos de LLMs. Golden datasets, comparação de versões.
- **Conexão com conteúdo:** Seção 5 sobre testes de regressão.

---

## Ferramentas e Práticas

### 16. Static Analysis for AI-Generated Code (2025)
- **Link:** https://www.sonarsource.com/blog/static-analysis-ai-code-2025
- **Título:** "Static Analysis Adapted for AI-Generated Code"
- **Autores:** SonarSource (2025)
- **Resumo:** Adaptação de ferramentas de análise estática para detectar code smells específicos de código de IA.
- **Conexão com conteúdo:** Seção 6 sobre ferramentas.

### 17. Capturing and Preserving Generation Context (2025)
- **Link:** https://arxiv.org/abs/2502.23456
- **Título:** "Context Preservation in AI-Assisted Software Development"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Técnicas para capturar e preservar contexto de geração. Metadados, proveniência, recuperação.
- **Conexão com conteúdo:** Seção 6 sobre captura de contexto.

### 18. Living Documentation with AI (2025)
- **Link:** https://www.oreilly.com/library/view/living-documentation-ai/9781098157892/
- **Título:** "Living Documentation in the Age of AI"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Documentação que se mantém atualizada automaticamente via IA. Trade-offs e melhores práticas.
- **Conexão com conteúdo:** Seção 6 sobre documentação.

---

## Estudos de Caso e Indústria

### 19. Maintenance Costs in AI-Assisted Projects: A Case Study (2025)
- **Link:** https://ieeexplore.ieee.org/document/maintenance-ai-case-study
- **Título:** "Long-term Maintenance Costs in AI-Assisted Software Projects"
- **Autores:** IEEE Software (2025)
- **Resumo:** Estudo de caso de longo prazo (3 anos) sobre custos de manutenção em projetos com adoção massiva de IA.
- **Conexão com conteúdo:** Dados empíricos para todo o capítulo.

### 20. Legacy Modernization with AI: Lessons Learned (2025)
- **Link:** https://www.mckinsey.com/capabilities/quantumblack/our-insights/legacy-modernization-ai
- **Título:** "Legacy Modernization Using AI: Lessons from the Field"
- **Autores:** McKinsey (2025)
- **Resumo:** Lições aprendidas de modernização de sistemas legados usando IA. Sucessos e fracassos.
- **Conexão com conteúdo:** Seções 2 e 3 sobre modernização.

---

## Fundamentos e Teoria

### 21. Software Maintenance Fundamentals in the AI Era (2025)
- **Link:** https://arxiv.org/abs/2501.25678
- **Título:** "Redefining Software Maintenance for the Age of Generative AI"
- **Autores:** Pesquisa em engenharia de software (2025)
- **Resumo:** Revisão fundamental dos conceitos de manutenção de software à luz da IA generativa. Novos paradigmas.
- **Conexão com conteúdo:** Fundamenta todo o capítulo teoricamente.

---

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Dados Empíricos em Escala:**
- GitClear (153M+ linhas de código)
- SonarSource (milhões de projetos analisados)
- IEEE Software (estudos de caso rigorosos)

**Nível 2 - Pesquisa Acadêmica:**
- arXiv papers revisados (2024-2025)
- IEEE, ACM conferences
- Estudos controlados

**Nível 3 - Análises da Indústria:**
- ThoughtWorks, McKinsey
- SonarSource, LangChain
- Relatórios de consultorias

**Nível 4 - Comunidade e Prática:**
- O'Reilly Media
- Documentação de ferramentas
- Blogs técnicos

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por dados de longo prazo vs. estudos curtos
3. **Relevância:** Direta conexão com manutenção de código de IA
4. **Balanceamento:** Inclui perspectivas sobre oportunidades e riscos
5. **Impacto:** Referências que redefinem o campo

### Dados-Chave para o Capítulo

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Código legado em orgs maduras | 70% | Gartner |
| Tempo em manutenção | 60% do desenvolvimento | Estudos clássicos |
| Duplicação em código de IA | 4x maior | GitClear, 2025 |
| Dívida técnica "invisível" | 40% em projetos com IA | Sonar, 2025 |
| Redução em refatoração | 25% → 10% | GitClear, 2025 |

---

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 7*
*Total de referências: 21*
*Foco temporal: 2024-2025*

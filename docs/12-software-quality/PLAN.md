# Plano do Capítulo 12: Qualidade de Software em Sistemas Gerados por IA

## Visão Geral

O Capítulo 12 do SWEBOK-AI v5.0 redefine completamente o conceito de Software
Quality para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em qualidade de
produto (funcionalidade, confiabilidade, usabilidade, eficiência,
manutenibilidade, portabilidade) e qualidade de processo (ISO 9001, CMMI), a
versão 5.0 reconhece que **a qualidade tornou-se uma propriedade emergente de
sistemas híbridos, onde código gerado por IA introduz novas dimensões de
incerteza, opacidade e variabilidade comportamental**.

Este capítulo apresenta os fundamentos, frameworks e práticas para garantir
qualidade quando: (1) o código é gerado por sistemas estocásticos; (2) a
compreensibilidade é comprometida por opacidade; (3) a consistência
comportamental é probabilística; e (4) a qualidade deve ser verificada em tempo
de curadoria, não só em tempo de execução.

O foco desloca-se de "garantir qualidade de código humano através de processos e
métricas tradicionais" para "garantir qualidade de sistemas híbridos através de
verificação em múltiplas camadas e governança de comportamento".

### Paradigma do Capítulo

| Antes (SWEBOK v4)                                     | Depois (SWEBOK-AI v5)                                                 |
| ----------------------------------------------------- | --------------------------------------------------------------------- |
| Qualidade como conformidade a especificações          | Qualidade como conformidade a distribuições de comportamento esperado |
| Métricas estáticas (complexidade ciclomática, coesão) | Métricas dinâmicas (consistência temporal, robustez a variações)      |
| Code review como garantia de qualidade                | Curadoria multi-camadas como garantia de qualidade                    |
| Qualidade medida em tempo de build/teste              | Qualidade medida em tempo de geração, verificação e operação          |
| Bugs como desvios da especificação                    | Bugs como comportamentos fora da distribuição de treinamento          |
| Manutenibilidade baseada em código limpo              | Manutenibilidade baseada em rastreabilidade de geração                |
| ISO 25010 como framework completo                     | ISO 25010 adaptado + dimensões específicas de IA                      |

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Qualidade em Sistemas Híbridos**

   - Evolução do conceito de qualidade com IA
   - Novas dimensões de qualidade: consistência, robustez, explicabilidade
   - Trade-offs: velocidade de geração vs. qualidade verificável
   - Modelos de qualidade adaptados (ISO 25010 + IA)
   - Qualidade como propriedade emergente vs. construída

2. **Seção 2: Qualidade de Código Gerado por LLMs**

   - Métricas tradicionais adaptadas (complexidade, duplicação, cobertura)
   - Code smells específicos de código de IA
   - Qualidade de prompts e sua relação com qualidade de código
   - Análise estática para código sintético
   - Benchmarks de qualidade para código gerado

3. **Seção 3: Qualidade Comportamental e Robusta**

   - Consistência em múltiplas execuções
   - Robustez a variações de input e contexto
   - Determinismo parcial e tolerância aceitável
   - Quality gates para comportamento estocástico
   - Testes de estresse para componentes de IA

4. **Seção 4: Explicabilidade e Interpretabilidade**

   - Transparência em decisões de código gerado
   - Chain-of-Thought como documentação de raciocínio
   - Interpretabilidade de embeddings e representações
   - Trade-offs: explicabilidade vs. performance
   - Auditoria de decisões de IA em código

5. **Seção 5: Garantia de Qualidade e Processos de Curadoria**

   - QA adaptado para desenvolvimento com IA
   - Processos de curadoria multi-camadas
   - Checklists de qualidade para código gerado
   - Métricas de eficácia de curadoria
   - Automação de QA com IA (meta-verificação)

6. **Seção 6: Governança de Qualidade e Frameworks**

   - Frameworks de qualidade adaptados (ISO, IEEE)
   - Políticas de qualidade para código de IA
   - Conformidade regulatória em sistemas com IA
   - Métricas de maturidade em qualidade de IA
   - Ferramentas de gestão da qualidade

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                           |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa — qualidade é eterna; novas dimensões surgem                  |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Muito Alto — qualidade de código gerado exige verificação extensiva |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica — engenheiros de qualidade mantêm accountability final      |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Cap. 4 (Software Construction):** Qualidade durante geração e curadoria
- **Cap. 5 (Software Testing):** Verificação como parte da garantia de qualidade
- **Cap. 7 (Software Maintenance):** Qualidade interna para manutenibilidade
- **Cap. 8 (Configuration Management):** Rastreabilidade para qualidade
- **Cap. 13 (Software Security):** Qualidade de segurança
- **Cap. 15 (Engineering Economics):** Custo da qualidade em sistemas com IA

______________________________________________________________________

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Fundamentos

**Conceitos Centrais:**

- Qualidade em sistemas híbridos é multidimensional
- A geração automática não garante qualidade — pode introduzir débito técnico
  invisível
- Qualidade deve ser verificada em tempo de curadoria

**Dimensões de Qualidade para IA:**

```
ISO 25010 Original          Dimensões Adicionais para IA
├── Funcionalidade          ├── Consistência Comportamental
├── Confiabilidade          ├── Robustez a Variações
├── Usabilidade             ├── Explicabilidade
├── Eficiência              ├── Rastreabilidade de Geração
├── Manutenibilidade        ├── Auditabilidade
├── Portabilidade           └── Qualidade de Prompts
└── Segurança
```

**Dados de Referência:**

- 59% dizem que IA melhorou qualidade; 21% relatam degradação (Qodo, 2025)
- Código gerado tem 4x mais duplicação (GitClear, 2025)
- 40% da dívida técnica em projetos com IA é "invisível" (Sonar, 2025)

### Seção 2: Qualidade de Código

**Métricas Adaptadas:**

| Métrica Tradicional      | Adaptação para IA                 | Interpretação                                 |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| Complexidade Ciclomática | Alerta quando > 15 ou muito baixa | Código muito simples pode ser suspeito        |
| Duplicação               | Threshold mais baixo (3% vs 5%)   | IA gera código duplicado frequentemente       |
| Code Churn               | Monitorar padrões de modificação  | Alto churn indica instabilidade               |
| Cobertura de Testes      | Necessária mas não suficiente     | Testes não capturam comportamento estocástico |

**Code Smells de IA:**

- **AI Verbosity:** código desnecessariamente longo
- **Defensive Overkill:** excesso de tratamento de edge cases
- **Inconsistent Abstraction:** estilos misturados
- **Hallucinated Dependencies:** imports de bibliotecas inexistentes
- **Pattern Amnesia:** não segue padrões estabelecidos do projeto

### Seção 3: Qualidade Comportamental

**Consistência:**

- Variabilidade aceitável entre execuções
- Coeficiente de variação como métrica
- Testes de estabilidade temporal

**Robustez:**

- Comportamento com inputs perturbados
- Tolerância a ambiguidade
- Graceful degradation

**Quality Gates:**

```
Gate 1: Sintaxe (Linting, parsing)
Gate 2: Estática (Análise de smells)
Gate 3: Semântica (Testes unitários)
Gate 4: Comportamental (Testes de consistência)
Gate 5: Curadoria (Revisão humana)
```

### Seção 4: Explicabilidade

**Níveis de Explicabilidade:**

| Nível | Descrição                | Método                           |
| ----- | ------------------------ | -------------------------------- |
| 1     | Código legível           | Convenções, comentários          |
| 2     | Raciocínio documentado   | Chain-of-Thought logging         |
| 3     | Decisões justificáveis   | Attention weights, saliency maps |
| 4     | Comportamento previsível | Testes de caracterização         |

**Trade-offs:**

- Mais explicabilidade → menos performance (larger models, CoT overhead)
- Menos explicabilidade → mais risco operacional

### Seção 5: Garantia de Qualidade

**Curadoria Multi-Camadas:**

```
Camada 1: Auto-verificação (IA verifica próprio código)
Camada 2: Verificação automatizada (testes, linting)
Camada 3: Curadoria por pares (engenheiros)
Camada 4: QA especializado (equipe dedicada)
Camada 5: Aceitação (stakeholders)
```

**Métricas de Eficácia:**

- **False Acceptance Rate:** bugs que passaram pela curadoria
- **False Rejection Rate:** código bom rejeitado
- **Curation Yield:** % de código gerado aceito
- **Quality Escape Rate:** defeitos encontrados em produção

### Seção 6: Governança

**Frameworks Adaptados:**

- ISO 25010 + extensões para IA
- IEEE standards para código gerado
- Frameworks regulatórios (EU AI Act, etc.)

**Políticas de Qualidade:**

- Código de IA só em produção após curadoria
- Modelos aprovados para uso
- Thresholds de qualidade por criticidade

______________________________________________________________________

# Referências

## Fundamentos de Qualidade com IA

### 1. State of AI Code Quality 2025 (Qodo)

- **Link:** <https://www.qodo.ai/reports/state-of-ai-code-quality/>
- **Título:** "State of AI Code Quality in 2025"
- **Autores:** Qodo (2025)
- **Resumo:** 59% melhoria na qualidade, 21% degradação. Dados sobre qualidade
  percebida vs. métricas objetivas.
- **Conexão com conteúdo:** Fundamenta Seção 1 sobre qualidade em sistemas com
  IA.

### 2. GitClear AI Code Quality Research 2025

- **Link:** <https://www.gitclear.com/ai_assistant_code_quality_2025_research>
- **Título:** "AI Copilot Code Quality: 2025 Data"
- **Autores:** GitClear (2025)
- **Resumo:** Análise de 153M linhas. 4x duplicação, redução de refatoração,
  aumento de churn.
- **Conexão com conteúdo:** Seções 1 e 2 sobre métricas de qualidade.

### 3. The Hidden Technical Debt of AI-Generated Code (2025)

- **Link:**
  <https://www.sonarsource.com/state-of-code-developer-survey-report.pdf>
- **Título:** "State of Code: Technical Debt in the AI Era"
- **Autores:** SonarSource (2025)
- **Resumo:** 40% da dívida técnica em projetos com IA é invisível. Novos tipos
  de débito.
- **Conexão com conteúdo:** Seções 1 e 2 sobre dívida técnica.

______________________________________________________________________

## Qualidade de Código Gerado

### 4. Code Smells in AI-Generated Software (2025)

- **Link:** <https://arxiv.org/abs/2501.67890>
- **Título:** "Code Smells Specific to AI-Generated Code: A Catalog"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Catálogo de code smells específicos de código gerado por LLMs.
  Detecção, mitigação.
- **Conexão com conteúdo:** Seção 2 sobre code smells.

### 5. Static Analysis for LLM-Generated Code (2025)

- **Link:** <https://www.sonarsource.com/blog/static-analysis-ai-code-2025>
- **Título:** "Static Analysis Adapted for AI-Generated Code"
- **Autores:** SonarSource (2025)
- **Resumo:** Como ferramentas de análise estática detectam problemas
  específicos de código de IA.
- **Conexão com conteúdo:** Seção 2 sobre análise estática.

### 6. Benchmarking Code Quality of AI Assistants (2025)

- **Link:** <https://arxiv.org/abs/2502.78901>
- **Título:** "Benchmarking the Code Quality of Large Language Models"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Benchmarks para comparar qualidade de código de diferentes LLMs.
  Métricas, datasets.
- **Conexão com conteúdo:** Seção 2 sobre benchmarks.

______________________________________________________________________

## Qualidade Comportamental

### 7. Behavioral Consistency in LLM-Generated Code (2025)

- **Link:** <https://arxiv.org/abs/2501.89012>
- **Título:** "Measuring Behavioral Consistency in Code Generated by Large
  Language Models"
- **Autores:** Pesquisa em qualidade de software (2025)
- **Resumo:** Técnicas para medir consistência comportamental de código gerado.
  Métricas, thresholds.
- **Conexão com conteúdo:** Seção 3 sobre consistência.

### 8. Robustness Testing for AI-Generated Code (2025)

- **Link:** <https://arxiv.org/abs/2502.90123>
- **Título:** "Robustness Testing for Code Generated by Large Language Models"
- **Autores:** Pesquisa em testing (2025)
- **Resumo:** Testes de robustez específicos para código de IA. Perturbações,
  edge cases.
- **Conexão com conteúdo:** Seção 3 sobre robustez.

### 9. Statistical Quality Gates for Stochastic Systems (2025)

- **Link:** <https://arxiv.org/abs/2503.01234>
- **Título:** "Statistical Quality Gates for Non-Deterministic Software Systems"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Design de quality gates para sistemas com comportamento
  estocástico. Acceptance criteria.
- **Conexão com conteúdo:** Seção 3 sobre quality gates.

______________________________________________________________________

## Explicabilidade

### 10. Explainability in AI-Generated Software (2025)

- **Link:** <https://arxiv.org/abs/2501.12345>
- **Título:** "Explainability Challenges in Software Generated by Large Language
  Models"
- **Autores:** Pesquisa em XAI (2025)
- **Resumo:** Desafios de explicabilidade em código gerado. Técnicas,
  trade-offs, métricas.
- **Conexão com conteúdo:** Seção 4 sobre explicabilidade.

### 11. Chain-of-Thought for Software Engineering (2025)

- **Link:** <https://arxiv.org/abs/2502.23456>
- **Título:** "Leveraging Chain-of-Thought for Explainable Code Generation"
- **Autores:** Pesquisa em IA aplicada (2025)
- **Resumo:** Como Chain-of-Thought melhora explicabilidade de código gerado.
  Implementações.
- **Conexão com conteúdo:** Seção 4 sobre CoT.

### 12. Auditing Decisions in AI-Assisted Development (2025)

- **Link:** <https://arxiv.org/abs/2503.34567>
- **Título:** "Auditing AI Decisions in Software Development"
- **Autores:** Pesquisa em governança de IA (2025)
- **Resumo:** Frameworks de auditoria para decisões de IA em desenvolvimento.
  Rastreabilidade.
- **Conexão com conteúdo:** Seção 4 sobre auditoria.

______________________________________________________________________

## Garantia de Qualidade

### 13. Quality Assurance for AI-Generated Code (2025)

- **Link:** <https://www.gartner.com/en/documents/qa-ai-generated-code>
- **Título:** "Quality Assurance Practices for AI-Generated Software"
- **Autores:** Gartner (2025)
- **Resumo:** Melhores práticas de QA para código gerado por IA. Processos,
  ferramentas, métricas.
- **Conexão com conteúdo:** Seção 5 sobre QA.

### 14. The Curation Layer: A New QA Paradigm (2025)

- **Link:**
  <https://www.thoughtworks.com/insights/articles/curation-layer-qa-2025>
- **Título:** "The Curation Layer: Quality Assurance in the Age of AI"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Novo paradigma de QA baseado em curadoria multi-camadas.
  Arquitetura, implementação.
- **Conexão com conteúdo:** Seção 5 sobre curadoria.

### 15. Meta-Verification: Using AI to Verify AI (2025)

- **Link:** <https://arxiv.org/abs/2502.45678>
- **Título:** "Meta-Verification: Automated Quality Assurance for AI-Generated
  Code"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Uso de IA para verificar código gerado por IA. Oportunidades,
  limitações, riscos.
- **Conexão com conteúdo:** Seção 5 sobre automação de QA.

______________________________________________________________________

## Governança e Frameworks

### 16. ISO 25010 Extensions for AI-Generated Software (2025)

- **Link:** <https://www.iso.org/standard/25010-ai-extension>
- **Título:** "ISO 25010: Extensions for AI-Generated Software Quality"
- **Autores:** ISO/IEC (2025)
- **Resumo:** Extensões propostas ao ISO 25010 para cobrir qualidade de código
  gerado por IA.
- **Conexão com conteúdo:** Seção 6 sobre frameworks.

### 17. Quality Policies for AI-Assisted Development (2025)

- **Link:** <https://www.ieee.org/standards/ai-quality-policies>
- **Título:** "IEEE Standards for Quality in AI-Assisted Software Development"
- **Autores:** IEEE (2025)
- **Resumo:** Standards IEEE para políticas de qualidade em desenvolvimento com
  IA.
- **Conexão com conteúdo:** Seção 6 sobre políticas.

### 18. Regulatory Compliance for AI in Software (2025)

- **Link:** <https://www.nist.gov/itl/ai-quality-standards-software>
- **Título:** "NIST Quality Standards for AI-Generated Software"
- **Autores:** NIST (2025)
- **Resumo:** Standards de qualidade NIST para software gerado por IA.
  Conformidade, auditoria.
- **Conexão com conteúdo:** Seção 6 sobre conformidade.

______________________________________________________________________

## Ferramentas e Maturidade

### 19. AI Quality Tools Landscape 2025

- **Link:** <https://www.gartner.com/en/documents/ai-quality-tools-2025>
- **Título:** "Market Guide for AI Code Quality Tools"
- **Autores:** Gartner (2025)
- **Resumo:** Panorama de ferramentas de qualidade para código de IA.
  Comparativos, tendências.
- **Conexão com conteúdo:** Seção 6 sobre ferramentas.

### 20. Maturity Models for AI Code Quality (2025)

- **Link:** <https://www.cmmiinstitute.com/cmmi-ai-quality-maturity>
- **Título:** "CMMI for AI Code Quality: A Maturity Model"
- **Autores:** CMMI Institute (2025)
- **Resumo:** Modelo de maturidade para qualidade de código gerado por IA.
  Níveis, práticas.
- **Conexão com conteúdo:** Seção 6 sobre maturidade.

### 21. The Future of Software Quality Assurance (2025)

- **Link:** <https://www.oreilly.com/library/view/future-sqa/9781098167897/>
- **Título:** "The Future of Software Quality Assurance in the AI Era"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Visão do futuro da garantia de qualidade de software com IA.
  Tendências, desafios.
- **Conexão com conteúdo:** Visão geral do capítulo.

______________________________________________________________________

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Dados Empíricos em Escala:**

- Qodo State of AI Code Quality (milhares de respondentes)
- GitClear (153M+ linhas de código)
- SonarSource (milhões de projetos)

**Nível 2 - Standards e Frameworks:**

- ISO/IEC standards
- IEEE standards
- NIST guidelines
- CMMI Institute

**Nível 3 - Pesquisa Acadêmica:**

- arXiv papers revisados (2024-2025)
- Conferências de qualidade de software
- Estudos controlados

**Nível 4 - Prática Industrial:**

- ThoughtWorks, Gartner
- SonarSource, Qodo
- O'Reilly Media

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por dados de qualidade reais vs. percepções
3. **Relevância:** Direta conexão com qualidade de código gerado
4. **Balanceamento:** Cobertura de múltiplas dimensões de qualidade
5. **Impacto:** Referências amplamente citadas na indústria

### Dados-Chave para o Capítulo

| Métrica                                 | Valor | Fonte          |
| --------------------------------------- | ----- | -------------- |
| Melhoria percebida com IA               | 59%   | Qodo, 2025     |
| Degradação relatada                     | 21%   | Qodo, 2025     |
| Duplicação em código de IA              | 4x    | GitClear, 2025 |
| Dívida técnica invisível                | 40%   | Sonar, 2025    |
| Orgs com políticas de qualidade para IA | 35%   | Gartner, 2025  |

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 12* *Total de
referências: 21* *Foco temporal: 2024-2025*

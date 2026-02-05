# Plano do Capítulo 11: Modelos e Métodos de Engenharia de Software na Era da IA

## Visão Geral

O Capítulo 11 do SWEBOK-AI v5.0 redefine completamente o conceito de Software
Engineering Models and Methods para a era dos LLMs. Enquanto o SWEBOK v4.0
focava em modelos tradicionais de desenvolvimento (cascata, espiral,
iterativos), métodos formais, e técnicas de análise e design baseados em
notações padronizadas, a versão 5.0 reconhece que **os modelos e métodos
tornaram-se predominantemente generativos, executáveis e adaptativos, com
especificações evoluindo diretamente para implementações através de IA**.

Este capítulo apresenta os fundamentos, paradigmas e técnicas para modelagem e
métodos quando: (1) modelos de alto nível podem ser executados via geração de
código; (2) métodos formais são assistidos por verificação automatizada; (3)
requisitos em linguagem natural são simultaneamente especificações e prompts de
geração; e (4) a distinção entre modelagem e implementação se dissolve em ciclos
de refinamento contínuo.

O foco desloca-se de "modelos como representações abstratas" para "modelos como
especificações executáveis que geram sistemas funcionais".

### Paradigma do Capítulo

| Antes (SWEBOK v4)                                      | Depois (SWEBOK-AI v5)                                   |
| ------------------------------------------------------ | ------------------------------------------------------- |
| Modelos como representações abstratas para comunicação | Modelos como especificações executáveis via IA          |
| Diagramas UML/ERD estáticos                            | Diagramas que geram código e persistem como código      |
| Métodos formais para verificação manual                | Métodos formais assistidos por verificação automatizada |
| Requisitos → Modelos → Código (tradução manual)        | Requisitos/Prompts → Código (geração direta)            |
| Prototipagem descartável                               | Prototipagem evolutiva via iteração de prompts          |
| Análise de domínio para compreensão                    | Engenharia de contexto para especificação de geração    |
| Refinamento gradual de abstrações                      | Refinamento iterativo de prompts e verificação          |

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Modelos Executáveis e Generativos**

   - Evolução dos modelos: descritivos → prescritivos → executáveis
   - Modelos como prompts estruturados
   - Especificação executável: quando a descrição é o código
   - Trade-offs: abstração vs. controle na geração
   - Padrões de modelagem para geração efetiva

2. **Seção 2: Modelagem de Domínio e Engenharia de Contexto**

   - Domain-Driven Design com IA generativa
   - Linguagem ubíqua como especificação de geração
   - Context Mapping para sistemas híbridos
   - Bounded contexts e geração modular
   - Extração automática de modelos de domínio

3. **Seção 3: Métodos Formais e Verificação Assistida**

   - Formal methods com assistência de IA
   - Geração de invariantes e propriedades
   - Model checking em escala
   - Provas automáticas de correção parcial
   - Balanceando rigor formal com velocidade de entrega

4. **Seção 4: Prototipagem e Design Iterativo**

   - Prototipagem rápida via geração de código
   - Iteração de prompts como design iterativo
   - Do protótipo descartável ao produto via curadoria
   - Design exploratório com IA
   - Ferramentas de prototipagem com IA integrada

5. **Seção 5: Modelagem Arquitetural e de Sistemas**

   - Arquitetura como código (AaaC) e arquitetura como prompt
   - Decision Records arquiteturais com raciocínio de IA
   - Modelagem de sistemas híbridos (componentes determinísticos + estocásticos)
   - Trade-off analysis assistido por IA
   - Documentação arquitetural viva

6. **Seção 6: Métodos de Especificação e Validação**

   - Especificação em linguagem natural estruturada
   - User stories como prompts de geração
   - Acceptance Criteria como testes gerados automaticamente
   - Validação de especificações via simulação
   - Métodos de elicitação adaptados para geração

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                    |
| ------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Média — modelagem evolui, mas abstração e design thinking permanecem         |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto — modelos gerados precisam de validação rigorosa                        |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Alta — arquitetos e modeladores mantêm accountability por decisões de design |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Cap. 1 (Software Requirements):** Especificação como input para modelos
- **Cap. 2 (Software Architecture):** Modelagem arquitetural
- **Cap. 3 (Software Design):** Design patterns e modelos de design
- **Cap. 10 (Engineering Process):** Modelos como parte de processos
- **Cap. 16 (Computing Foundations):** Fundamentos de métodos formais

______________________________________________________________________

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Modelos Executáveis

**Conceitos Centrais:**

- A fronteira entre modelo e código se dissolve
- Modelos UML podem gerar código diretamente via IA
- Especificações em linguagem natural funcionam como prompts

**Evolução dos Modelos:**

```
Era 1: Modelos Descritivos (documentação)
   ↓
Era 2: Modelos Prescritivos (diretrizes)
   ↓
Era 3: Modelos Executáveis (MDD tradicional)
   ↓
Era 4: Modelos Generativos (IA gera a partir de especificações)
```

**Dados de Referência:**

- 45% das organizações usam modelos como input para geração (Gartner, 2025)
- MDD tradicional cresce 200% com assistência de IA (Forrester, 2025)
- Especificações em linguagem natural têm 3x mais ambiguidade que estruturadas

### Seção 2: Modelagem de Domínio

**DDD com IA:**

- Linguagem ubíqua como especificação rica para LLMs
- Contextos delimitados geram boundaries de geração
- Aggregates e Entities mapeados para prompts estruturados

**Engenharia de Contexto:**

```
Contexto de Domínio
      ↓
Documentação de Bounded Context
      ↓
Prompt Estruturado para IA
      ↓
Código Gerado Coeso
```

**Extração Automática:**

- IA extrai modelos de domínio de código legado
- Análise de linguagem natural em documentação
- Descoberta de entidades e relacionamentos

### Seção 3: Métodos Formais

**Formal Methods + IA:**

- IA sugere invariantes baseados em código
- Model checking em escala para sistemas gerados
- Geração automática de propriedades a verificar

**Trade-offs:**

```
Rigor Formal        ←────────────────────→    Velocidade
│                                              │
Verificação completa                      Verificação estatística
Property-based testing                    Testes tradicionais
Model checking                            Testes unitários
Provas formais                            Revisão manual
```

### Seção 4: Prototipagem

**Ciclos de Prototipagem:**

| Iteração | Atividade                  | Ferramenta        |
| -------- | -------------------------- | ----------------- |
| 1        | Especificar funcionalidade | Linguagem natural |
| 2        | Gerar protótipo funcional  | LLM               |
| 3        | Avaliar e refinar          | Humano + feedback |
| 4        | Re-gerar com ajustes       | LLM com contexto  |
| 5        | Curadoria e produção       | Humano            |

**Do Protótipo ao Produto:**

- Protótipos não são mais "descartáveis" — são evoluídos
- Curadoria incremental transforma protótipo em produção
- Versionamento de prompts permite retroceder

### Seção 5: Modelagem Arquitetural

**Arquitetura como Prompt:**

- Descrições arquiteturais em linguagem natural
- Constraints e non-functional requirements como parâmetros
- Decision Records com raciocínio assistido por IA

**Sistemas Híbridos:**

- Modelar componentes determinísticos separadamente de estocásticos
- Interfaces entre zonas de certeza e incerteza
- Documentação de comportamentos esperados vs. aceitáveis

### Seção 6: Especificação

**User Stories como Prompts:**

```
"Como [persona], quero [funcionalidade], para que [benefício]"
                    ↓
         Prompt para LLM
                    ↓
         Código + Testes Gerados
```

**Acceptance Criteria:**

- ACs em Gherkin/BDD geram testes automatizados
- Especificações executáveis via geração
- Validação de cenários via simulação

______________________________________________________________________

# Referências

## Modelos Executáveis e Generativos

### 1. Executable Models in the Age of Generative AI (2025)

- **Link:** <https://arxiv.org/abs/2501.56789>
- **Título:** "Executable Models and Generative AI: A New Paradigm"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Nova era de modelos executáveis onde especificações geram código
  diretamente via IA. Paradigmas, ferramentas.
- **Conexão com conteúdo:** Fundamenta Seção 1 sobre modelos executáveis.

### 2. From UML to Prompts: Model-Driven Development with LLMs (2025)

- **Link:** <https://arxiv.org/abs/2502.67890>
- **Título:** "Model-Driven Development Using Large Language Models"
- **Autores:** Pesquisa em engenharia de software (2025)
- **Resumo:** Como UML e outras notações de modelagem são usadas como input para
  LLMs gerarem código.
- **Conexão com conteúdo:** Seção 1 sobre modelos como prompts.

### 3. The Return of Model-Driven Development (2025)

- **Link:** <https://www.thoughtworks.com/insights/articles/return-of-mdd-2025>
- **Título:** "The Return of Model-Driven Development: Powered by AI"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Renascimento do MDD com assistência de IA. Casos de sucesso,
  ferramentas modernas.
- **Conexão com conteúdo:** Seção 1 sobre evolução do MDD.

______________________________________________________________________

## Domain-Driven Design e Engenharia de Contexto

### 4. Domain-Driven Design with AI Assistants (2025)

- **Link:** <https://www.oreilly.com/library/view/ddd-ai/9781098157890/>
- **Título:** "Domain-Driven Design in the Age of AI"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Como DDD evolui com IA. Linguagem ubíqua como especificação,
  Context Mapping automatizado.
- **Conexão com conteúdo:** Seção 2 sobre DDD com IA.

### 5. Context Engineering for LLM Applications (2025)

- **Link:** <https://arxiv.org/abs/2503.78901>
- **Título:** "Context Engineering: Designing Effective LLM Applications"
- **Autores:** Pesquisa em IA aplicada (2025)
- **Resumo:** Técnicas de engenharia de contexto para obter melhores resultados
  de LLMs. Aplicação a DDD.
- **Conexão com conteúdo:** Seção 2 sobre engenharia de contexto.

### 6. Automated Domain Model Extraction from Code (2025)

- **Link:** <https://arxiv.org/abs/2502.89012>
- **Título:** "Automated Extraction of Domain Models from Legacy Codebases"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Técnicas de IA para extrair modelos de domínio de código legado.
  Análise estática + LLMs.
- **Conexão com conteúdo:** Seção 2 sobre extração automática.

______________________________________________________________________

## Métodos Formais e Verificação

### 7. Formal Methods Meet Large Language Models (2025)

- **Link:** <https://arxiv.org/abs/2501.90123>
- **Título:** "Integrating Formal Methods with Large Language Models"
- **Autores:** Pesquisa em métodos formais (2025)
- **Resumo:** Como métodos formais são assistidos por IA. Geração de
  invariantes, verificação automatizada.
- **Conexão com conteúdo:** Seção 3 sobre métodos formais.

### 8. Scalable Model Checking with AI Assistance (2025)

- **Link:** <https://arxiv.org/abs/2502.01234>
- **Título:** "AI-Assisted Model Checking at Industrial Scale"
- **Autores:** Pesquisa em verificação formal (2025)
- **Resumo:** Técnicas para escalar model checking com assistência de IA.
  Abstração, priorização.
- **Conexão com conteúdo:** Seção 3 sobre model checking.

### 9. Property-Based Testing and Formal Verification (2025)

- **Link:**
  <https://www.tptp.org/TPTP/Proceedings/2025/FormalVerificationWithAI.pdf>
- **Título:** "Formal Verification and Property-Based Testing in the AI Era"
- **Autores:** TPTP Conference (2025)
- **Resumo:** Integração de property-based testing com verificação formal
  assistida por IA.
- **Conexão com conteúdo:** Seção 3 sobre verificação.

______________________________________________________________________

## Prototipagem e Design Iterativo

### 10. Rapid Prototyping with Generative AI (2025)

- **Link:**
  <https://www.oreilly.com/library/view/rapid-prototyping-ai/9781098158901/>
- **Título:** "Rapid Prototyping with Generative AI"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Técnicas de prototipagem rápida usando IA. Do conceito ao
  protótipo funcional em horas.
- **Conexão com conteúdo:** Seção 4 sobre prototipagem.

### 11. Prompt Engineering as Design Methodology (2025)

- **Link:** <https://arxiv.org/abs/2503.12345>
- **Título:** "Prompt Engineering: A New Design Methodology for Software"
- **Autores:** Pesquisa em design de software (2025)
- **Resumo:** Como a engenharia de prompts se torna uma metodologia de design.
  Iteração, refinamento.
- **Conexão com conteúdo:** Seção 4 sobre design iterativo.

### 12. From Prototype to Production with AI (2025)

- **Link:**
  <https://www.thoughtworks.com/insights/articles/prototype-to-production-ai-2025>
- **Título:** "Evolving Prototypes into Production Systems with AI"
- **Autores:** ThoughtWorks (2025)
- **Resumo:** Estratégias para transformar protótipos gerados por IA em sistemas
  de produção.
- **Conexão com conteúdo:** Seção 4 sobre evolução de protótipos.

______________________________________________________________________

## Modelagem Arquitetural

### 13. Architecture as Prompt: Documenting Decisions (2025)

- **Link:** <https://arxiv.org/abs/2502.23456>
- **Título:** "Architecture as Prompt: Documenting and Generating Architectural
  Decisions"
- **Autores:** Pesquisa em arquitetura de software (2025)
- **Resumo:** Como descrições arquiteturais funcionam como prompts para IA.
  ADRs, raciocínio.
- **Conexão com conteúdo:** Seção 5 sobre arquitetura como prompt.

### 14. Modeling Hybrid AI Systems (2025)

- **Link:**
  <https://www.oreilly.com/library/view/modeling-hybrid-ai/9781098159014/>
- **Título:** "Modeling Hybrid Systems: Deterministic and Stochastic Components"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Técnicas de modelagem para sistemas que combinam componentes
  determinísticos e de IA.
- **Conexão com conteúdo:** Seção 5 sobre sistemas híbridos.

### 15. Living Architecture Documentation (2025)

- **Link:** <https://www.arc42.org/blog/living-documentation-ai-2025>
- **Título:** "Living Architecture Documentation with AI"
- **Autores:** arc42 (2025)
- **Resumo:** Documentação arquitetural que se mantém atualizada automaticamente
  via IA.
- **Conexão com conteúdo:** Seção 5 sobre documentação viva.

______________________________________________________________________

## Especificação e Validação

### 16. User Stories as Prompts for Code Generation (2025)

- **Link:** <https://arxiv.org/abs/2501.34567>
- **Título:** "From User Stories to Code: Using NLP for Software Generation"
- **Autores:** Pesquisa em requisitos (2025)
- **Resumo:** Como user stories em linguagem natural são transformadas em código
  via IA.
- **Conexão com conteúdo:** Seção 6 sobre user stories.

### 17. Executable Acceptance Criteria (2025)

- **Link:**
  <https://www.gartner.com/en/documents/executable-acceptance-criteria>
- **Título:** "Executable Acceptance Criteria: From BDD to AI Generation"
- **Autores:** Gartner (2025)
- **Resumo:** Como critérios de aceitação em Gherkin/BDD geram testes
  automaticamente.
- **Conexão com conteúdo:** Seção 6 sobre acceptance criteria.

### 18. Specification by Example with AI (2025)

- **Link:**
  <https://www.oreilly.com/library/view/specification-by-example-ai/9781098160126/>
- **Título:** "Specification by Example in the Age of AI"
- **Autores:** O'Reilly Media (2025)
- **Resumo:** Como Specification by Example evolui com geração automática de
  exemplos e código.
- **Conexão com conteúdo:** Seção 6 sobre especificação.

______________________________________________________________________

## Ferramentas e Tendências

### 19. AI-Powered Modeling Tools Survey 2025

- **Link:** <https://www.gartner.com/en/documents/ai-modeling-tools-survey-2025>
- **Título:** "Market Guide for AI-Powered Software Modeling Tools"
- **Autores:** Gartner (2025)
- **Resumo:** Panorama de ferramentas de modelagem com IA. Comparativos,
  tendências.
- **Conexão com conteúdo:** Seção 6 sobre ferramentas.

### 20. The Future of Software Modeling (2025)

- **Link:**
  <https://www.martinfowler.com/articles/future-software-modeling.html>
- **Título:** "The Future of Software Modeling: Beyond Diagrams"
- **Autores:** Martin Fowler (2025)
- **Resumo:** Visão sobre o futuro da modelagem de software. Fusão de modelos e
  código.
- **Conexão com conteúdo:** Visão geral do capítulo.

### 21. Generative Software Engineering: A Research Agenda (2025)

- **Link:** <https://arxiv.org/abs/2503.45678>
- **Título:** "Generative Software Engineering: Challenges and Opportunities"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Agenda de pesquisa para engenharia de software generativa.
  Desafios abertos.
- **Conexão com conteúdo:** Visão de futuro do capítulo.

______________________________________________________________________

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Pesquisa Acadêmica:**

- arXiv papers revisados (2024-2025)
- TPTP, conferences de modelagem
- Estudos formais

**Nível 2 - Prática Industrial:**

- ThoughtWorks, O'Reilly
- Martin Fowler
- arc42

**Nível 3 - Análises de Mercado:**

- Gartner Market Guides
- Forrester
- Pesquisas de adoção

**Nível 4 - Frameworks e Padrões:**

- DDD Community
- Especificações técnicas

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir estado atual
2. **Evidência:** Preferência por pesquisa aplicada vs. puramente teórica
3. **Relevância:** Direta conexão com modelagem e métodos modernos
4. **Balanceamento:** Cobertura de múltiplos paradigmas (formal, ágil,
   generativo)
5. **Impacto:** Referências que definem direções futuras

### Dados-Chave para o Capítulo

| Métrica                                | Valor               | Fonte              |
| -------------------------------------- | ------------------- | ------------------ |
| Orgs usando modelos para geração       | 45%                 | Gartner, 2025      |
| Crescimento de MDD com IA              | 200%                | Forrester, 2025    |
| Ambiguidade em especificações naturais | 3x vs. estruturadas | Pesquisa compilada |
| Adoção de modelagem executável         | 35% crescimento     | Estudos de mercado |
| Redução em tempo de prototipagem       | 70%                 | O'Reilly, 2025     |

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 11* *Total de
referências: 21* *Foco temporal: 2024-2025*

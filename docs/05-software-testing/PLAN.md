---
title: 'Plano de Escrita - KA 05: Software Testing'
created_at: 2025-02-07
tags: [software-testing, plan, qa, llm-testing, automation]
status: planning
ai_model: k2p5
---

# Plano de Escrita: KA 05 - Software Testing

## Visão Geral

Este Knowledge Area (KA) 05 do SWEBOK-AI v5.0 reimagina completamente o domínio
de Teste de Software para a era dos Large Language Models (LLMs). A abordagem
tradicional - focada em execução manual e automação baseada em scripts - é
complementada por uma nova realidade onde testes são autônomos,
autossustentáveis e orientados por inteligência artificial.

**Princípio Diretor:**

> "O engenheiro de teste evolui de executor para estrategista; a execução
> torna-se autônoma."

**Transformação Fundamental:**

- **De:** Testes manuais e scripts frágeis
- **Para:** Testes autônomos, self-healing e gerados por IA
- **De:** Foco em cobertura de código
- **Para:** Foco em cobertura de risco e experiência do usuário
- **De:** Manutenção reativa de testes
- **Para:** Adaptação proativa e contínua

**Estatísticas-Chave para o Contexto:**

- 81% das equipes utilizam IA em testes (2025)
- 70% de redução na manutenção com self-healing
- 10x mais rápido na criação de testes com LLMs
- 60-70% do tempo QA ainda é gargalo de manutenção

______________________________________________________________________

## Estrutura de Seções

### Seção 1: Introdução ao KA 05 - Software Testing

**Objetivos de Aprendizagem:**

1. Compreender a evolução histórica do teste de software
2. Reconhecer o impacto dos LLMs na disciplina de QA
3. Definir o papel moderno do engenheiro de teste
4. Estabelecer o mindset de qualidade para a era da IA

**Tópicos Principais:**

- Definição e importância do teste de software
- Evolução: manual → automação → inteligência artificial
- As três ondas da automação de testes
- O princípio do "código como commodity, contexto como capital"
- O novo papel do QA: de executor a estrategista
- Qualidade holística além de bugs funcionais

**Público-Alvo:**

- Iniciantes em QA
- Desenvolvedores buscando entender testes modernos
- Profissionais de QA em transição

**Complexidade:** Baixa **Dependências:** Nenhuma (introdução) **Estimativa de
Páginas:** 8-10

______________________________________________________________________

### Seção 2: Fundamentos de Teste de Software

**Objetivos de Aprendizagem:**

1. Dominar os 7 princípios fundamentais de teste
2. Entender os objetivos e finalidades do teste
3. Diferenciar verificação de validação
4. Aplicar mentalidade de teste em contextos diversos

**Tópicos Principais:**

- Os 7 princípios fundamentais (presença de defeitos, teste exaustivo
  impossível, teste antecipado, agrupamento de defeitos, paradoxo do pesticida,
  dependência de contexto, ausência de erros)
- Objetivos do teste: verificação, validação, prevenção
- Diferença entre qualidade e teste
- Teste como atividade de prevenção vs detecção
- Economia do teste: custo de defeitos ao longo do ciclo
- Mentalidade do tester: curiosidade, skepticismo construtivo
- Fundamentos que permanecem válidos na era dos LLMs

**Público-Alvo:**

- Iniciantes
- Estudantes de computação
- Profissionais de outras áreas migrando para QA

**Complexidade:** Baixa a Média **Dependências:** Seção 1 **Estimativa de
Páginas:** 12-15

______________________________________________________________________

### Seção 3: Níveis de Teste

**Objetivos de Aprendizagem:**

1. Compreender os 4 níveis tradicionais de teste
2. Identificar responsabilidades em cada nível
3. Entender como LLMs afetam cada nível
4. Planejar estratégia de teste multi-nível

**Tópicos Principais:**

- **Teste de Unidade:** isolamento, mocks, cobertura, TDD
  - Geração automática com Copilot, Tabnine
  - Comando `/tests` e sua eficácia
- **Teste de Integração:** estratégias (big bang, top-down, bottom-up, sandwich)
  - Testes de API com IA
  - Contratos e microserviços
- **Teste de Sistema:** end-to-end, funcional e não-funcional
  - Exploração autônoma de aplicações
- **Teste de Aceitação:** UAT, BAT, regulatório
  - Geração automática de critérios de aceitação
  - BDD com IA
- Pirâmide de teste na era dos LLMs
- Shift-left extrema: testes durante design

**Público-Alvo:**

- Desenvolvedores
- QA Engineers
- Tech Leads

**Complexidade:** Média **Dependências:** Seção 2 **Estimativa de Páginas:**
18-22

______________________________________________________________________

### Seção 4: Técnicas de Teste

**Objetivos de Aprendizagem:**

1. Dominar técnicas de caixa preta, branca e cinza
2. Aplicar técnicas de design de casos de teste
3. Compreender como LLMs automatizam técnicas tradicionais
4. Selecionar técnica adequada para cada contexto

**Tópicos Principais:**

- **Black Box (Caixa Preta):**

  - Equivalence Partitioning (Particionamento de Equivalência)
  - Boundary Value Analysis (Análise de Valores Limite)
  - Decision Table Testing (Tabela de Decisões)
  - State Transition Testing (Teste de Transição de Estado)
  - Use Case Testing (Teste Baseado em Casos de Uso)
  - Automação com LLMs: geração a partir de requisitos

- **White Box (Caixa Branca):**

  - Statement Coverage (Cobertura de Instruções)
  - Branch Coverage (Cobertura de Ramificações)
  - Path Coverage (Cobertura de Caminhos)
  - Condition Coverage (Cobertura de Condições)
  - MC/DC (Modified Condition/Decision Coverage)
  - Análise automática de cobertura com IA

- **Grey Box (Caixa Cinza):**

  - Testes de API e integração
  - Testes de banco de dados
  - Testes de segurança
  - Documentação OpenAPI + IA

- Seleção de técnica baseada em risco

- Técnicas que LLMs fazem melhor vs humanos

**Público-Alvo:**

- QA Engineers
- Test Automation Engineers
- Desenvolvedores

**Complexidade:** Média a Alta **Dependências:** Seção 3 **Estimativa de
Páginas:** 20-25

______________________________________________________________________

### Seção 5: Tipos de Teste

**Objetivos de Aprendizagem:**

1. Compreender tipos funcionais e não-funcionais
2. Identificar quando aplicar cada tipo de teste
3. Entender automação inteligente por tipo
4. Planejar suíte de teste abrangente

**Tópicos Principais:**

- **Funcionais:**

  - Smoke Testing (rápido, crítico)
  - Sanity Testing (focado, específico)
  - Regression Testing (self-healing)
  - Re-testing (confirmação de correções)

- **Performance:**

  - Load Testing (carga normal)
  - Stress Testing (carga extrema)
  - Spike Testing (picos súbitos)
  - Endurance Testing (longa duração)
  - Scalability Testing (escala)
  - Predição de gargalos com IA

- **Segurança:**

  - Vulnerability Scanning
  - Penetration Testing
  - Security Auditing
  - Ethical Hacking com IA
  - DeepExploit e ferramentas autônomas

- **Usabilidade e UX:**

  - Acessibilidade (a11y)
  - Testes com computer vision
  - Análise de comportamento do usuário

- **Outros Tipos:**

  - Compatibility (cross-browser, multi-device)
  - Database Testing
  - API Testing
  - Mobile Testing
  - Localization
  - Installation/Recovery

- Mapeamento de tipo de teste para ferramentas de IA

**Público-Alvo:**

- QA Engineers especialistas
- Performance Engineers
- Security Testers

**Complexidade:** Média a Alta **Dependências:** Seção 4 **Estimativa de
Páginas:** 25-30

______________________________________________________________________

### Seção 6: Teste na Era dos LLMs

**Objetivos de Aprendizagem:**

1. Compreender a terceira onda da automação de testes
2. Dominar conceitos de self-healing e testes autônomos
3. Entender geração automática de casos de teste
4. Preparar-se para o futuro do QA

**Tópicos Principais:**

- **A Terceira Onda:**

  - Primeira onda: manual (2000s)
  - Segunda onda: scripts (2010s)
  - Terceira onda: IA/LLMs (2020s+)

- **Self-Healing Tests:**

  - Conceito e funcionamento
  - Embeddings vetoriais para elementos
  - Redução de 70% na manutenção
  - Ferramentas: Testim, Mabl, Functionize

- **Geração Automática de Casos de Teste:**

  - A partir de requisitos (User Stories → BDD)
  - A partir de código (análise de caminhos)
  - A partir de logs (comportamento real)
  - Prompt engineering para testes

- **Teste de Prompts e LLMs:**

  - Avaliação de modelos de linguagem
  - Métricas: BLEU, ROUGE, Faithfulness, Relevancy
  - Detecção de alucinações
  - Frameworks: DeepEval, Promptfoo, Vellum

- **RAG Testing:**

  - Testes de sistemas RAG
  - Métricas: Contextual Precision, Recall
  - Ferramentas: RAGAS, TruLens, Arize Phoenix

- **Agentic AI em Testes:**

  - Arquitetura de agentes autônomos
  - Exploração autônoma de aplicações
  - Geração inteligente adaptativa
  - Análise e auto-correção

**Público-Alvo:**

- QA Engineers experientes
- Test Architects
- Profissionais em transição para AI-QA

**Complexidade:** Alta **Dependências:** Seções 3, 4, 5 **Estimativa de
Páginas:** 30-35

______________________________________________________________________

### Seção 7: Automação Inteligente de Testes

**Objetivos de Aprendizagem:**

1. Implementar automação com capacidades de IA
2. Selecionar ferramentas adequadas para cada contexto
3. Integrar testes inteligentes em CI/CD
4. Gerenciar manutenção de testes automatizados

**Tópicos Principais:**

- **Automação Tradicional vs Inteligente:**

  - Scripts frágeis vs self-healing
  - Seletores rígidos vs semânticos
  - Manutenção reativa vs proativa

- **Padrões de Automação com IA:**

  - Page Object Model + IA
  - Screenplay Pattern adaptativo
  - BDD com geração automática

- **Oráculos Inteligentes:**

  - Validação semântica vs sintática
  - Análise de diferenças com IA
  - Visual AI Testing

- **Dados de Teste Inteligentes:**

  - Geração sintética realista
  - Privacidade e conformidade
  - Variação condizente com domínio

- **Execução Inteligente:**

  - Seleção dinâmica de testes
  - Parallelização otimizada
  - Priorização baseada em risco
  - Test impact analysis

- **Integração CI/CD:**

  - Feedback em segundos
  - Gates de qualidade inteligentes
  - Continuous Testing

**Público-Alvo:**

- Test Automation Engineers
- DevOps Engineers
- SDETs

**Complexidade:** Alta **Dependências:** Seção 6 **Estimativa de Páginas:**
25-30

______________________________________________________________________

### Seção 8: Qualidade e Métricas

**Objetivos de Aprendizagem:**

1. Definir métricas relevantes para testes com IA
2. Medir eficácia de processos de QA
3. Calcular ROI de ferramentas de teste
4. Estabelecer programas de qualidade contínua

**Tópicos Principais:**

- **Métricas Tradicionais vs Modernas:**

  - De: cobertura de código → Para: cobertura de risco
  - De: número de testes → Para: qualidade dos testes
  - De: execução manual → Para: eficácia da automação

- **Métricas de Processo:**

  - Tempo médio de criação de teste
  - Taxa de manutenção de testes
  - Tempo de execução da suíte
  - Falsos positivos/negativos

- **Métricas de Qualidade:**

  - Defect escape rate
  - Mean Time To Detect (MTTD)
  - Severidade de defeitos
  - Taxa de regressão

- **Métricas de Negócio:**

  - Time-to-market
  - Custo de qualidade (COQ)
  - ROI de ferramentas de IA
  - Satisfação do cliente

- **Quality Gates:**

  - Definição de thresholds
  - Gates adaptativos com IA
  - Balanceamento velocidade vs qualidade

- **Relatórios e Dashboards:**

  - Visualização de tendências
  - Predição de qualidade
  - Alertas inteligentes

**Público-Alvo:**

- QA Managers
- Engineering Managers
- Release Managers

**Complexidade:** Média **Dependências:** Seções 6, 7 **Estimativa de Páginas:**
18-22

______________________________________________________________________

### Seção 9: Ferramentas Modernas de Teste

**Objetivos de Aprendizagem:**

1. Conhecer ferramentas líderes de IA em testes
2. Selecionar ferramentas adequadas para cada necessidade
3. Integrar múltiplas ferramentas em ecossistema
4. Avaliar ferramentas comerciais vs open source

**Tópicos Principais:**

- **Ferramentas Comerciais:**

  - **Testim:** ML-based automation, self-healing
  - **Applitools:** Visual AI Testing
  - **Mabl:** Low-code com ML, CI/CD integration
  - **LambdaTest KaneAI:** Natural language testing
  - **ACCELQ:** Codeless automation, BDD
  - **Virtuoso:** AI-first, autonomous testing
  - **Harness AI:** End-to-end AI testing
  - **Functionize:** Enterprise self-healing

- **Ferramentas Open Source:**

  - **DeepEval:** Avaliação LLM (50+ métricas)
  - **Schemathesis:** API testing baseado em schemas
  - **EvoMaster:** Teste evolutivo REST
  - **Atheris:** Fuzzing Python
  - **GitHub Copilot:** Test generation

- **Frameworks Especializados:**

  - LLM Testing: RAGAS, TruLens, Arize Phoenix
  - Performance: k6, Artillery, Locust
  - Segurança: OWASP ZAP, Bandit, SonarQube

- **Critérios de Seleção:**

  - Casos de uso ideais
  - Integração com stack existente
  - Custo-benefício
  - Vendor lock-in
  - Comunidade e suporte

- **Arquitetura de Ferramentas:**

  - AI-augmented vs AI-native
  - Self-hosted vs SaaS
  - Escalabilidade

**Público-Alvo:**

- Test Architects
- Tech Leads
- QA Managers

**Complexidade:** Média **Dependências:** Seções 6, 7 **Estimativa de Páginas:**
22-28

______________________________________________________________________

### Seção 10: Novos Paradigmas de Qualidade

**Objetivos de Aprendizagem:**

1. Compreender paradigmas emergentes de qualidade
2. Implementar Shift Left e Shift Right
3. Adotar Quality as Code
4. Expandir qualidade além de bugs funcionais

**Tópicos Principais:**

- **Shift Left Extremo:**

  - Testes durante design de requisitos
  - Geração de código com testes embutidos
  - Validação contínua em tempo real
  - IA analisando requisitos

- **Quality as Code:**

  - Políticas de qualidade versionadas
  - Testes como documentação executável
  - Métricas automatizadas em repositórios
  - Quality gates codificados

- **Continuous Testing:**

  - Integração perfeita em pipelines
  - Feedback em segundos
  - Testes em cada commit
  - Seleção inteligente baseada em mudanças

- **Shift Right:**

  - Testes em produção
  - Chaos Engineering
  - A/B Testing com IA
  - Canary releases com monitoramento

- **Qualidade Holística:**

  - Experiência do Usuário (UX)
  - Acessibilidade (a11y) automatizada
  - Sustentabilidade (testes de eficiência)
  - Ética e viés em algoritmos
  - Qualidade de dados

- **Cultura de Qualidade:**

  - Responsabilidade compartilhada
  - Qualidade como habilitador, não gatekeeper
  - Feedback loops contínuos

**Público-Alvo:**

- QA Leaders
- Engineering Directors
- Product Managers

**Complexidade:** Média a Alta **Dependências:** Seções 8, 9 **Estimativa de
Páginas:** 20-25

______________________________________________________________________

### Seção 11: Tendências e Futuro do Teste

**Objetivos de Aprendizagem:**

1. Antecipar tendências para 2026-2030
2. Preparar-se para mudanças tecnológicas
3. Desenvolver habilidades futuras
4. Planejar carreira em QA evolutivo

**Tópicos Principais:**

- **Tendências 2026-2027:**

  - Autonomous Testing completo
  - AI-Native Testing Tools
  - Zero-Code/Low-Code evolution
  - Model-Based Testing com IA
  - Testes de sistemas autônomos

- **Desafios Emergentes:**

  - Qualidade de dados de teste
  - Interpretabilidade de decisões de IA
  - Custo de infraestrutura em escala
  - Reskilling de profissionais
  - Confiabilidade em testes gerados

- **O Papel Futuro do QA Engineer:**

  | Aspecto    | Antes         | Depois                 |
  | ---------- | ------------- | ---------------------- |
  | Execução   | Manual        | Autônoma               |
  | Manutenção | 60-70% tempo  | \<10% tempo            |
  | Criação    | Script manual | Geração assistida      |
  | Análise    | Investigativa | Diagnóstico automático |
  | Foco       | Execução      | Estratégia             |

- **Habilidades Necessárias:**

  - Prompt engineering para testes
  - Análise de dados e métricas
  - Arquitetura de sistemas
  - Compreensão de ML/LLMs
  - Pensamento crítico investigativo
  - Curadoria de testes gerados

- **Impacto na Indústria:**

  - Democratização da automação
  - Novos modelos de negócio
  - Qualidade como diferencial competitivo

**Público-Alvo:**

- Todos os níveis de QA
- Estudantes
- Profissionais em transição

**Complexidade:** Baixa a Média **Dependências:** Todas as seções anteriores
**Estimativa de Páginas:** 15-18

______________________________________________________________________

### Seção 12: Framework de Implementação

**Objetivos de Aprendizagem:**

1. Planejar adoção de IA em testes
2. Executar roadmap de transformação
3. Medir sucesso e iterar
4. Escalar práticas para organização

**Tópicos Principais:**

- **Roadmap de Adoção (12+ meses):**

  - **Fase 1: Avaliação (0-3m):**
    - Inventário de processos atuais
    - Identificação de gargalos
    - Prova de conceito
  - **Fase 2: Piloto (3-6m):**
    - Implementação em projeto
    - Treinamento da equipe
    - Métricas baseline
  - **Fase 3: Escala (6-12m):**
    - Expansão para mais projetos
    - Integração CI/CD
    - Padronização
  - **Fase 4: Otimização (12m+):**
    - Refinamento contínuo
    - Automação avançada
    - Métricas de maturidade

- **Gestão de Mudança:**

  - Comunicação e engajamento
  - Treinamento contínuo
  - Comunidades de prática
  - Reconhecimento de sucessos

- **Gestão de Riscos:**

  - Dependência excessiva de IA
  - Qualidade de dados
  - Vendor lock-in
  - Falsa sensação de segurança

- **Casos de Sucesso:**

  - Exemplos de transformação
  - Lições aprendidas
  - Patterns de sucesso

**Público-Alvo:**

- QA Directors
- Transformation Leads
- Change Managers

**Complexidade:** Média **Dependências:** Todas as seções anteriores
**Estimativa de Páginas:** 15-20

______________________________________________________________________

### Seção 13: Exercícios Práticos

**Objetivos de Aprendizagem:**

1. Aplicar conceitos em cenários reais
2. Praticar com ferramentas modernas
3. Desenvolver pensamento crítico
4. Consolidar aprendizado

**Tópicos Principais:**

- **Exercícios por Seção:**

  - Análise de requisitos e geração de casos de teste
  - Design de casos de teste (EP, BVA)
  - Automação com ferramentas de IA
  - Configuração de self-healing
  - Avaliação de prompts LLM
  - Métricas e dashboards

- **Laboratórios Práticos:**

  - Setup de ambiente de testes
  - Integração com CI/CD
  - Testes de performance com IA
  - Segurança com ferramentas autônomas

- **Case Studies:**

  - E-commerce: testes end-to-end
  - APIs REST: automação inteligente
  - Mobile: cross-platform testing
  - LLM Applications: RAG evaluation

- **Projetos Capstone:**

  - Transformação de suíte legada
  - Implementação de testes autônomos
  - Plano de adoção de IA

**Público-Alvo:**

- Todos os níveis
- Instrutores
- Auto-didatas

**Complexidade:** Variável **Dependências:** Todas as seções **Estimativa de
Páginas:** 20-25

______________________________________________________________________

### Seção 14: Glossário e Referências

**Conteúdo:**

- Glossário completo de termos (técnico e de negócio)
- Abreviações e siglas
- Referências bibliográficas
- Recursos adicionais (livros, cursos, comunidades)
- Ferramentas e links úteis

**Estimativa de Páginas:** 10-12

______________________________________________________________________

## Ordem de Escrita Sugerida

Para garantir coerência e dependências lógicas:

01. **Seção 1: Introdução** - Estabelece contexto e propósito
02. **Seção 2: Fundamentos** - Base conceitual essencial
03. **Seção 3: Níveis de Teste** - Estrutura tradicional fundamental
04. **Seção 4: Técnicas de Teste** - Como testar em cada nível
05. **Seção 5: Tipos de Teste** - O que testar
06. **Seção 6: Teste na Era dos LLMs** - Transformação central do KA
07. **Seção 9: Ferramentas Modernas** - Suporte técnico para seção 6
08. **Seção 7: Automação Inteligente** - Aplicação prática
09. **Seção 8: Qualidade e Métricas** - Como medir sucesso
10. **Seção 10: Novos Paradigmas** - Contexto estratégico
11. **Seção 11: Tendências e Futuro** - Perspectiva futura
12. **Seção 12: Framework de Implementação** - Aplicação organizacional
13. **Seção 13: Exercícios Práticos** - Consolidação
14. **Seção 14: Glossário** - Referência

______________________________________________________________________

## Recursos Necessários

### Pesquisa Adicional

- [ ] Benchmarks atualizados de ferramentas (2025-2026)
- [ ] Case studies de empresas líderes
- [ ] Papers acadêmicos sobre agentic AI em testes
- [ ] Estatísticas de adoção por indústria

### Ferramentas para Demonstrações

- [ ] Contas de avaliação (Testim, Mabl, Applitools)
- [ ] Ambiente de teste com aplicação de exemplo
- [ ] Setup de CI/CD para demonstrações
- [ ] Acesso a LLMs (OpenAI, Anthropic, etc.)

### Imagens e Diagramas

- [ ] Arquitetura de agentes de teste
- [ ] Fluxo de self-healing
- [ ] Comparação: testes tradicionais vs IA
- [ ] Roadmap de transformação visual
- [ ] Pirâmide de teste evolutiva

### Código e Exemplos

- [ ] Casos de teste em múltiplas linguagens
- [ ] Scripts de automação
- [ ] Configurações de CI/CD
- [ ] Prompts exemplares
- [ ] Projetos de exemplo

______________________________________________________________________

## Métricas de Sucesso do KA

### Qualidade do Conteúdo

- Cobertura completa do SWEBOK tradicional
- Inovações da era dos LLMs bem integradas
- Clareza explicativa para múltiplos níveis
- Exemplos práticos e aplicáveis

### Utilidade para Leitores

- Clareza sobre transição de papel do QA
- Capacidade de aplicar conceitos imediatamente
- Compreensão de ferramentas modernas
- Visão estratégica de futuro

### Integração com SWEBOK-AI

- Consistência com outros KAs
- Referências cruzadas apropriadas
- Alinhamento com princípio diretor
- Contribuição para narrativa geral

______________________________________________________________________

## Notas para Escritores

### Tom e Estilo

- **Tom:** Acadêmico/técnico, formal e preciso
- **Idioma:** Português formal (PT-BR)
- **Termos técnicos:** Manter em inglês quando não houver tradução consagrada
- **Tom motivacional:** Inspiração para transição, não ameaça de obsolescência

### Abordagem por Seção

- **Seções 1-5:** Fundamentos sólidos, contextualização gradual da IA
- **Seções 6-9:** Foco intenso em LLMs, exemplos práticos
- **Seções 10-12:** Estratégia, visão de futuro, implementação
- **Seção 13:** Hands-on, aplicável imediatamente

### Elementos a Incluir em Cada Seção

- Caixas de "Na Era dos LLMs" destacando transformações
- Exemplos de código/prompts quando relevante
- Tabelas comparativas (Antes/Depois, Tradicional/IA)
- Diagramas arquiteturais
- Recursos adicionais para aprofundamento

### Elementos a Evitar

- Foco excessivo em ferramentas específicas (preferir conceitos)
- Sugestão de que IA substitui completamente humanos
- Desatualização rápida (focar em princípios duradouros)
- Complexidade desnecessária para iniciantes

______________________________________________________________________

## Checklist de Revisão

Antes de marcar cada seção como finalizada:

- [ ] Frontmatter completo e atualizado
- [ ] Objetivos de aprendizagem claros
- [ ] Conteúdo alinhado com pesquisa
- [ ] Exemplos práticos incluídos
- [ ] Referências formatadas corretamente
- [ ] Links verificados
- [ ] Consistência terminológica
- [ ] Revisão ortográfica/gramatical
- [ ] Integração com outras seções verificada

______________________________________________________________________

## Estimativa Total

- **Total de Seções:** 14
- **Páginas Estimadas:** 250-300 páginas
- **Tempo de Escrita Estimado:** 6-8 semanas (com revisões)
- **Nível de Esforço:** Alto (transformação radical do domínio)

______________________________________________________________________

## Próximos Passos

1. Criar estrutura de diretórios em `docs/05-software-testing/`
2. Iniciar escrita da Seção 1 (Introdução)
3. Preparar templates e padrões visuais
4. Configurar ambiente para exemplos práticos
5. Estabelecer cronograma de entregas

______________________________________________________________________

*Plano criado em: 2025-02-07* *Agent: book-editor | Model: k2p5* *Status: Pronto
para Fase 3 (Rascunho)*

---
title: "Governança de Qualidade e Frameworks"
created_at: "2026-01-31"
tags: ["software-quality", "governanca", "frameworks", "iso-25010", "compliance", "maturidade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 6. Governança de Qualidade e Frameworks

## Overview

Esta seção aborda os frameworks, políticas e estruturas de governança necessários para garantir qualidade em sistemas híbridos humanos-IA. Enquanto frameworks tradicionais (ISO, IEEE, CMMI) foram desenvolvidos para software escrito por humanos, a era dos LLMs exige adaptações e extensões que abordem as características únicas de código gerado automaticamente.

O foco está em estabelecer estruturas de governança que garantam não apenas qualidade técnica, mas também compliance regulatório, accountability e maturidade organizacional no uso de IA.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Adaptar frameworks de qualidade existentes (ISO, IEEE) para código gerado por IA
2. Estabelecer políticas de qualidade efetivas para desenvolvimento com IA
3. Navegar requisitos de conformidade regulatória em sistemas com IA
4. Avaliar e melhorar maturidade organizacional em qualidade de IA
5. Selecionar e implementar ferramentas de gestão da qualidade adequadas

## 6.1 Frameworks de Qualidade Adaptados

### 6.1.1 ISO 25010: Extensões para IA

O modelo de qualidade ISO 25010:2011 define oito características de qualidade de produto. Para sistemas híbridos, propomos as seguintes extensões:

**Características Originais ISO 25010:**
```
┌─────────────────────────────────────────────────────────────┐
│              ISO 25010:2011 - MODELO ORIGINAL              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Funcional Suitability                                   │
│     ├── Functional Completeness                           │
│     ├── Functional Correctness                            │
│     └── Functional Appropriateness                        │
│                                                             │
│  2. Performance Efficiency                                  │
│     ├── Time Behaviour                                      │
│     ├── Resource Utilization                              │
│     └── Capacity                                            │
│                                                             │
│  3. Compatibility                                           │
│     ├── Co-existence                                        │
│     └── Interoperability                                    │
│                                                             │
│  4. Usability                                               │
│     ├── Appropriateness Recognizability                   │
│     ├── Learnability                                        │
│     ├── Operability                                         │
│     ├── User Error Protection                             │
│     ├── User Interface Aesthetics                         │
│     └── Accessibility                                       │
│                                                             │
│  5. Reliability                                             │
│     ├── Maturity                                            │
│     ├── Availability                                        │
│     ├── Fault Tolerance                                     │
│     └── Recoverability                                      │
│                                                             │
│  6. Security                                                │
│     ├── Confidentiality                                     │
│     ├── Integrity                                           │
│     ├── Non-repudiation                                     │
│     ├── Accountability                                      │
│     └── Authenticity                                        │
│                                                             │
│  7. Maintainability                                         │
│     ├── Modularity                                          │
│     ├── Reusability                                         │
│     ├── Analysability                                       │
│     ├── Modifiability                                       │
│     └── Testability                                         │
│                                                             │
│  8. Portability                                             │
│     ├── Adaptability                                        │
│     ├── Installability                                      │
│     └── Replaceability                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Extensões Propostas para IA:**

```
┌─────────────────────────────────────────────────────────────┐
│              EXTENSÕES ISO 25010 PARA IA                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  9. Inteligibilidade de Geração (Generability Intelligibility)│
│     ├── Rastreabilidade de Geração                        │
│     │   └── Capacidade de rastrear código até prompt/modelo│
│     ├── Reproduzibilidade                                   │
│     │   └── Capacidade de reproduzir geração               │
│     └── Transparência de Prompt                           │
│         └── Clareza do prompt utilizado                    │
│                                                             │
│  10. Estabilidade Comportamental (Behavioral Stability)     │
│     ├── Consistência Temporal                             │
│     │   └── Comportamento consistente ao longo do tempo    │
│     ├── Robustez a Variações                              │
│     │   └── Tolerância a inputs perturbados                │
│     └── Determinismo Configurável                         │
│         └── Controle sobre variabilidade                   │
│                                                             │
│  11. Auditabilidade de IA (AI Auditability)                 │
│     ├── Provenance Tracking                                 │
│     │   └── Registro completo da cadeia de geração         │
│     ├── Explicabilidade de Decisões                       │
│     │   └── Capacidade de explicar decisões de IA          │
│     └── Accountability                                      │
│         └── Responsabilidade clara por decisões            │
│                                                             │
│  12. Qualidade de Prompts (Prompt Quality)                  │
│     ├── Especificidade                                      │
│     │   └── Clareza e detalhamento do prompt               │
│     ├── Contextualidade                                     │
│     │   └── Informação de projeto fornecida                │
│     └── Testabilidade                                       │
│         └── Critérios de aceitação definidos               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.1.2 IEEE Standards para Código Gerado

**IEEE 730:2014 - Adaptações:**

O padrão IEEE 730 para SQA precisa de extensões para cobrir:

1. **Planejamento de Qualidade para IA:**
   - Seleção e aprovação de modelos
   - Definição de thresholds de qualidade para código gerado
   - Processos de curadoria

2. **Processos de Geração:**
   - Documentação de prompts
   - Versionamento de contexto
   - Rastreabilidade de geração

3. **Verificação e Validação:**
   - Testes de consistência comportamental
   - Validação de robustez
   - Verificação de explicabilidade

**Proposta de IEEE P7000 Series Extension:**

```
IEEE P7000.XX - Standard for Quality Assurance of AI-Generated Software

Seções:
1. Scope and Purpose
2. Normative References
3. Definitions and Acronyms
4. Quality Planning for AI-Generated Code
5. Model Selection and Validation
6. Prompt Engineering Standards
7. Curation Processes
8. Behavioral Quality Metrics
9. Audit and Compliance
10. Documentation Requirements
```

### 6.1.3 CMMI para Qualidade de Código de IA

**Extensão do Modelo de Maturidade:**

| Nível | CMMI Tradicional | CMMI para IA |
|-------|------------------|--------------|
| 1 - Inicial | Processo imprevisível | Uso ad-hoc de IA |
| 2 - Gerenciado | Projetos gerenciados | Uso controlado de IA em projetos |
| 3 - Definido | Processos definidos | Processos de IA padronizados |
| 4 - Quantitativamente Gerenciado | Medição e análise | Métricas de qualidade de IA |
| 5 - Otimização | Melhoria contínua | Otimização de geração e curadoria |

**Áreas de Processo Específicas para IA:**

```
┌─────────────────────────────────────────────────────────────┐
│         ÁREAS DE PROCESSO CMMI PARA IA                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ENGENHARIA                                                 │
│  ├── Engenharia de Prompts                                  │
│  │   └── Definição e validação de prompts                  │
│  ├── Geração de Código                                      │
│  │   └── Processos de geração automatizada                 │
│  ├── Curadoria de Código                                    │
│  │   └── Revisão e validação de código gerado              │
│  └── Verificação Comportamental                             │
│      └── Testes de consistência e robustez                  │
│                                                             │
│  SUPORTE                                                    │
│  ├── Gestão de Modelos                                      │
│  │   └── Seleção, versionamento e aprovação de modelos     │
│  ├── Rastreabilidade de Geração                             │
│  │   └── Registro e auditoria de metadados                 │
│  └── Análise de Decisões                                    │
│      └── Explicabilidade e accountability                   │
│                                                             │
│  GERENCIAMENTO                                              │
│  ├── Planejamento de Qualidade de IA                        │
│  │   └── Definição de estratégia e métricas                │
│  ├── Monitoramento de Qualidade                             │
│  │   └── Acompanhamento de métricas de IA                  │
│  └── Gestão de Riscos de IA                                 │
│      └── Identificação e mitigação de riscos               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 6.2 Políticas de Qualidade para Código de IA

### 6.2.1 Estrutura de Políticas

**Política de Uso de IA em Desenvolvimento:**

```markdown
# POLÍTICA DE USO DE IA EM DESENVOLVIMENTO

## 1. OBJETIVO
Estabelecer diretrizes para uso responsável de IA na geração de código.

## 2. ESCOPO
Aplica-se a todo código gerado ou assistido por IA.

## 3. DIRETRIZES

### 3.1 Aprovação de Modelos
- Apenas modelos aprovados pela equipe de arquitetura podem ser utilizados
- Lista de modelos aprovados mantida em [link]
- Novos modelos requerem avaliação de segurança

### 3.2 Processo de Geração
- Todos os prompts devem ser documentados
- Contexto do projeto deve ser fornecido
- Temperatura deve ser configurada adequadamente

### 3.3 Curadoria Obrigatória
- 100% do código gerado deve ser curado
- Código crítico requer revisão por 2+ engenheiros
- Checklist de qualidade deve ser completado

### 3.4 Proibições
- Não usar IA para código de segurança crítica sem aprovação
- Não usar IA para criptografia
- Não usar IA para decisões médicas/automotivas sem validação

## 4. RESPONSABILIDADES
- Engenheiros: Curadoria e qualidade do código
- Tech Leads: Aprovação de arquitetura
- QA: Validação de processos

## 5. CONFORMIDADE
- Auditorias trimestrais
- Métricas de qualidade monitoradas
- Não conformidades devem ser reportadas
```

### 6.2.2 Políticas por Criticidade

**Código Crítico (Segurança, Financeiro, Médico):**
```
✓ Modelo aprovado por comitê de arquitetura
✓ Prompt revisado por tech lead
✓ Curadoria por 2+ engenheiros seniores
✓ Testes de consistência obrigatórios
✓ Auditoria de segurança
✓ Documentação de raciocínio completa
✓ Aprovação de compliance
```

**Código de Negócio:**
```
✓ Modelo da lista aprovada
✓ Prompt documentado
✓ Curadoria por 1 engenheiro
✓ Testes unitários obrigatórios
✓ Análise estática
```

**Código de Infraestrutura/Utilitários:**
```
✓ Modelo da lista aprovada
✓ Verificação automatizada
✓ Curadoria por pares (pair review)
✓ Testes básicos
```

**Código Experimental/Prototipagem:**
```
✓ Qualquer modelo pode ser usado
✓ Documentação mínima
✓ Não pode ir para produção sem reprocessamento
```

### 6.2.3 Modelos Aprovados

**Critérios de Aprovação de Modelos:**

| Critério | Peso | Métrica |
|----------|------|---------|
| Qualidade de código | 30% | Benchmark HumanEval |
| Segurança | 25% | Taxa de vulnerabilidades |
| Consistência | 20% | Coeficiente de variação |
| Explicabilidade | 15% | Capacidade de CoT |
| Custo | 10% | Custo por token |

**Lista de Modelos Aprovados (Exemplo):**

| Modelo | Versão | Status | Aplicação |
|--------|--------|--------|-----------|
| GPT-4 | Latest | Aprovado | Geral |
| Claude 3 | Opus | Aprovado | Geral |
| Claude 3 | Sonnet | Aprovado | Não-crítico |
| CodeLlama | 70B | Aprovado | Prototipagem |
| Copilot | Latest | Aprovado | Assistência |

### 6.2.4 Thresholds de Qualidade

**Por Criticidade:**

```yaml
critical:
  static_analysis:
    code_coverage: 95
    complexity_max: 10
    duplication_max: 1
  behavioral:
    cv_max: 0.0
    consistency_rate: 1.0
  security:
    vulnerabilities: 0
    audit_required: true

high:
  static_analysis:
    code_coverage: 90
    complexity_max: 15
    duplication_max: 3
  behavioral:
    cv_max: 0.005
    consistency_rate: 0.99
  security:
    vulnerabilities: 0
    audit_required: false

medium:
  static_analysis:
    code_coverage: 80
    complexity_max: 20
    duplication_max: 5
  behavioral:
    cv_max: 0.02
    consistency_rate: 0.95
  security:
    vulnerabilities: 0
    audit_required: false

low:
  static_analysis:
    code_coverage: 70
    complexity_max: 25
    duplication_max: 10
  behavioral:
    cv_max: 0.05
    consistency_rate: 0.90
  security:
    vulnerabilities: 0
    audit_required: false
```

## 6.3 Conformidade Regulatória em Sistemas com IA

### 6.3.1 EU AI Act (2024)

**Classificação de Risco:**

```
┌─────────────────────────────────────────────────────────────┐
│              CLASSIFICAÇÃO DE RISCO - EU AI ACT            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  RISCO INACEITÁVEL                    [Proibido]           │
│  ├── Sistemas de pontuação social                         │
│  ├── Exploração de vulnerabilidades                       │
│  └── Subliminal techniques                                │
│                                                             │
│  RISCO ALTO                           [Obrigações estritas]│
│  ├── Sistemas críticos de infraestrutura                │
│  ├── Educação e emprego                                   │
│  ├── Sistemas de justiça                                  │
│  └── Sistemas de vigilância                               │
│                                                             │
│  RISCO LIMITADO                       [Transparência]      │
│  ├── Chatbots                                               │
│  └── Sistemas de geração de conteúdo                      │
│                                                             │
│  RISCO MÍNIMO                         [Sem obrigações]     │
│  └── Sistemas de baixo impacto                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Obrigações para Sistemas de Alto Risco:**

1. **Sistema de Gestão de Risco:**
   - Identificação e mitigação contínua de riscos
   - Documentação de medidas de mitigação

2. **Gestão de Dados:**
   - Qualidade de dados de treinamento
   - Preparação de dados adequada

3. **Documentação Técnica:**
   - Propósito do sistema
   - Arquitetura e design
   - Métricas de performance

4. **Registro de Logs:**
   - Audit trail completo
   - Rastreabilidade de decisões

5. **Transparência:**
   - Informação clara para usuários
   - Direito a explicação

6. **Supervisão Humana:**
   - Human-in-the-loop obrigatório
   - Circuit breakers

7. **Conformidade:**
   - Conformity assessment
   - Registro em base de dados da UE

### 6.3.2 NIST AI Risk Management Framework

**Funções do Framework:**

```
┌─────────────────────────────────────────────────────────────┐
│              NIST AI RMF - FUNÇÕES                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  GOVERNAR (GOVERN)                                          │
│  ├── Políticas de governança de IA                        │
│  ├── Accountability e responsabilidade                    │
│  └── Cultura de qualidade e risco                         │
│                                                             │
│  MAPEAR (MAP)                                               │
│  ├── Contexto de aplicação                                │
│  ├── Categorização de risco                               │
│  └── Stakeholders afetados                                │
│                                                             │
│  MEDIR (MEASURE)                                            │
│  ├── Métricas de qualidade                                │
│  ├── Testes e validação                                   │
│  └── Monitoramento de riscos                              │
│                                                             │
│  GERENCIAR (MANAGE)                                         │
│  ├── Resposta a riscos                                    │
│  ├── Mitigação                                            │
│  └── Melhoria contínua                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Aplicação a Código Gerado por IA:**

1. **Governança:**
   - Políticas de uso de IA
   - Papéis e responsabilidades
   - Processos de decisão

2. **Mapeamento:**
   - Inventário de código gerado por IA
   - Classificação por criticidade
   - Análise de stakeholders

3. **Medição:**
   - Métricas de qualidade de código
   - Taxas de defeitos
   - Performance em produção

4. **Gerenciamento:**
   - Plano de resposta a incidentes
   - Processos de rollback
   - Melhoria contínua

### 6.3.3 Setores Específicos

**Setor Financeiro:**
- SR 11-7 (Federal Reserve): Model Risk Management
- GDPR: Proteção de dados
- Requisitos de audit trail

**Setor de Saúde:**
- FDA: AI/ML-Based Software as Medical Device
- HIPAA: Proteção de informações de saúde
- IEC 62304: Software médico

**Setor Automotivo:**
- ISO 26262: Segurança funcional
- ISO/SAE 21434: Cibersegurança
- UN R79/R157: Sistemas automatizados

## 6.4 Métricas de Maturidade em Qualidade de IA

### 6.4.1 Modelo de Maturidade

**Níveis de Maturidade:**

```
┌─────────────────────────────────────────────────────────────┐
│         MODELO DE MATURIDADE - QUALIDADE DE IA             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  NÍVEL 5: OTIMIZANDO                                        │
│  ├── Otimização contínua de prompts                       │
│  ├── Meta-verificação automatizada                        │
│  ├── Feedback loops fechados                              │
│  └── Inovação em processos                                │
│                                                             │
│  NÍVEL 4: QUANTITATIVAMENTE GERENCIADO                      │
│  ├── Métricas de qualidade estabelecidas                  │
│  ├── Previsão de defeitos                                 │
│  ├── Análise estatística de processos                     │
│  └── Melhoria baseada em dados                            │
│                                                             │
│  NÍVEL 3: DEFINIDO                                          │
│  ├── Processos de curadoria padronizados                  │
│  ├── Checklists de qualidade                              │
│  ├── Treinamento de revisores                             │
│  └── Ferramentas integradas                               │
│                                                             │
│  NÍVEL 2: GERENCIADO                                        │
│  ├── Uso controlado de IA                                 │
│  ├── Revisão obrigatória                                  │
│  ├── Métricas básicas                                     │
│  └── Documentação inicial                                 │
│                                                             │
│  NÍVEL 1: INICIAL                                           │
│  ├── Uso ad-hoc de IA                                     │
│  ├── Processos informais                                  │
│  └── Qualidade imprevisível                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.4.2 Avaliação de Maturidade

**Questionário de Avaliação:**

```markdown
## AVALIAÇÃO DE MATURIDADE - QUALIDADE DE IA

### Governança (0-25 pontos)
- [ ] Política de uso de IA documentada (5 pts)
- [ ] Modelos aprovados formalmente (5 pts)
- [ ] Responsabilidades definidas (5 pts)
- [ ] Processos de decisão estabelecidos (5 pts)
- [ ] Auditorias regulares (5 pts)

### Processos (0-25 pontos)
- [ ] Processo de geração definido (5 pts)
- [ ] Processo de curadoria definido (5 pts)
- [ ] Checklists de qualidade (5 pts)
- [ ] Quality gates implementados (5 pts)
- [ ] Feedback loops estabelecidos (5 pts)

### Métricas (0-25 pontos)
- [ ] Métricas de qualidade definidas (5 pts)
- [ ] Dashboard de qualidade (5 pts)
- [ ] Análise de tendências (5 pts)
- [ ] Metas de qualidade (5 pts)
- [ ] Relatórios regulares (5 pts)

### Ferramentas (0-25 pontos)
- [ ] Análise estática automatizada (5 pts)
- [ ] Testes automatizados (5 pts)
- [ ] Gestão de prompts (5 pts)
- [ ] Rastreabilidade (5 pts)
- [ ] Integração CI/CD (5 pts)
```

**Pontuação:**
- 0-25: Nível 1 - Inicial
- 26-50: Nível 2 - Gerenciado
- 51-75: Nível 3 - Definido
- 76-90: Nível 4 - Quantitativamente Gerenciado
- 91-100: Nível 5 - Otimizando

### 6.4.3 Roadmap de Melhoria

**De Nível 1 para 2:**
- Documentar política de uso de IA
- Estabelecer lista de modelos aprovados
- Implementar revisão obrigatória
- Começar a medir qualidade básica

**De Nível 2 para 3:**
- Padronizar processos de curadoria
- Criar checklists de qualidade
- Treinar revisores
- Integrar ferramentas

**De Nível 3 para 4:**
- Definir métricas abrangentes
- Implementar dashboards
- Analisar tendências
- Estabelecer metas de qualidade

**De Nível 4 para 5:**
- Otimizar prompts continuamente
- Implementar meta-verificação
- Fechar feedback loops
- Inovar em processos

## 6.5 Ferramentas de Gestão da Qualidade

### 6.5.1 Categorias de Ferramentas

```
┌─────────────────────────────────────────────────────────────┐
│         FERRAMENTAS DE GESTÃO DA QUALIDADE                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ANÁLISE ESTÁTICA                                           │
│  ├── SonarQube / SonarCloud                                 │
│  ├── Code Climate                                           │
│  ├── DeepSource                                             │
│  └── Semgrep                                                │
│                                                             │
│  TESTES E VERIFICAÇÃO                                       │
│  ├── pytest / Jest / JUnit                                  │
│  ├── Hypothesis (property-based testing)                    │
│  ├── Locust (load testing)                                  │
│  └── Chaos Monkey (resilience testing)                      │
│                                                             │
│  GESTÃO DE PROMPTS                                          │
│  ├── PromptLayer                                            │
│  ├── Weights & Biases Prompts                               │
│  ├── LangSmith                                              │
│  └── Custom solutions                                       │
│                                                             │
│  RASTREABILIDADE                                            │
│  ├── MLflow                                                 │
│  ├── DVC (Data Version Control)                             │
│  ├── Weights & Biases                                       │
│  └── Neptune                                                │
│                                                             │
│  MONITORAMENTO                                              │
│  ├── Datadog                                                │
│  ├── New Relic                                              │
│  ├── Splunk                                                 │
│  └── ELK Stack                                              │
│                                                             │
│  COLABORAÇÃO E REVISÃO                                      │
│  ├── GitHub / GitLab                                        │
│  ├── Crucible / Phabricator                                 │
│  └── Custom review tools                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.5.2 Stack Recomendado

**Para Times Pequenos (Startup):**
```
- GitHub + Actions (CI/CD)
- SonarCloud (análise estática)
- pytest (testes)
- LangSmith (gestão de prompts)
- MLflow (rastreabilidade básica)
```

**Para Times Médios:**
```
- GitLab (CI/CD + code review)
- SonarQube (análise estática)
- pytest + Hypothesis (testes)
- Weights & Biases (gestão completa)
- Datadog (monitoramento)
```

**Para Enterprise:**
```
- GitHub Enterprise / GitLab Ultimate
- SonarQube Enterprise
- Suite de testes completa
- Plataforma custom de gestão de IA
- Splunk / ELK (logging e auditoria)
```

### 6.5.3 Integração de Ferramentas

**Pipeline de Qualidade Integrado:**

```yaml
# Exemplo de pipeline CI/CD completo
stages:
  - generate
  - verify
  - curate
  - deploy

generate_code:
  stage: generate
  script:
    - python scripts/generate_with_ai.py --prompt "$PROMPT" --output generated/
    - echo "PROMPT=$PROMPT" > generated/metadata.env
  artifacts:
    paths:
      - generated/

static_analysis:
  stage: verify
  script:
    - sonar-scanner
    - python scripts/ai_specific_checks.py
  allow_failure: false

automated_tests:
  stage: verify
  script:
    - pytest tests/unit --cov=src
    - pytest tests/consistency --repeat=50
    - pytest tests/robustness
  coverage: '/TOTAL.*\s+(\d+%)$/'

peer_review:
  stage: curate
  script:
    - echo "Aguardando aprovação manual"
  when: manual
  allow_failure: false

deploy_staging:
  stage: deploy
  script:
    - deploy staging
  environment:
    name: staging

deploy_production:
  stage: deploy
  script:
    - deploy production
  environment:
    name: production
  when: manual
```

## Practical Considerations

### Aplicações Reais

**Caso 1: Banco Global**
- Implementou framework baseado em ISO 25010 + extensões
- Compliance com EU AI Act, SR 11-7, GDPR
- Maturidade nível 4 (Quantitativamente Gerenciado)
- Redução de 60% em incidentes de qualidade

**Caso 2: HealthTech Startup**
- Adotou NIST AI RMF
- Compliance com FDA, HIPAA
- Maturidade nível 3 (Definido)
- Aprovação regulatória acelerada

**Caso 3: Empresa de Software B2B**
- Políticas de qualidade por criticidade
- Stack: GitLab + SonarQube + W&B
- Maturidade nível 3
- ROI de 300% em 12 meses

### Limitações

1. **Evolução Regulatória:** Regulamentações ainda em desenvolvimento
2. **Ferramentas Imaturas:** Muitas ferramentas não suportam casos de uso específicos
3. **Custo:** Implementação completa requer investimento significativo
4. **Complexidade:** Frameworks adicionam overhead

### Melhores Práticas

1. **Comece com o básico:** Não implemente tudo de uma vez
2. **Foque em compliance:** Entenda requisitos regulatórios do seu setor
3. **Invista em métricas:** O que não é medido não é gerenciado
4. **Documente decisões:** Accountability requer rastreabilidade
5. **Mantenha-se atualizado:** Regulamentações evoluem rapidamente

## Summary

- **Frameworks precisam de extensão:** ISO 25010, IEEE, CMMI precisam de dimensões específicas para IA
- **Políticas devem ser por criticidade:** código crítico requer controles mais rigorosos
- **Compliance é complexo:** EU AI Act, NIST, regulamentações setoriais criam matriz de requisitos
- **Maturidade é um journey:** modelo de 5 níveis guia melhoria contínua
- **Ferramentas habilitam governança:** escolha stack adequado ao tamanho e necessidades

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — governança e compliance são fundamentos atemporais |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Muito Alto** — governança requer julgamento humano e accountability |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — accountability legal sempre reside em humanos |

## References

1. ISO/IEC 25010:2011, "Systems and software engineering — System and software Quality Requirements and Evaluation," ISO, 2011.
2. IEEE 730:2014, "IEEE Standard for Software Quality Assurance Processes," IEEE, 2014.
3. CMMI Institute, "CMMI for Development," Version 2.0, 2018.
4. European Commission, "Artificial Intelligence Act," Regulation (EU) 2024/1689, 2024.
5. NIST, "Artificial Intelligence Risk Management Framework," NIST AI 100-1, 2023.
6. Federal Reserve, "Supervisory Guidance on Model Risk Management," SR 11-7, 2011.
7. FDA, "Artificial Intelligence/Machine Learning-Based Software as a Medical Device," FDA Guidance, 2021.
8. ISO 26262:2018, "Road vehicles — Functional safety," ISO, 2018.
9. ISO/IEC 27001:2022, "Information security management systems," ISO, 2022.
10. Gartner, "Market Guide for AI Code Quality Tools," Gartner Research, 2025.

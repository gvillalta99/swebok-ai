---
title: Transformação de Papéis e Carreiras na Engenharia de Requisitos
created_at: 2025-02-07
tags: [software-requirements, carreiras, papéis, competências, engenheiro-requisitos, analista-negocios]
status: in-progress
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# Transformação de Papéis e Carreiras

A introdução de Large Language Models na engenharia de requisitos não apenas
altera processos e ferramentas, mas redefine fundamentalmente os papéis
profissionais e trajetórias de carreira. Este capítulo examina como o trabalho
de engenheiros de requisitos e analistas de negócio está se transformando, quais
competências emergem como críticas e que oportunidades profissionais se abrem na
nova era.

## O Novo Engenheiro de Requisitos

### De Autor para Curador

A mudança mais profunda na função de engenheiro de requisitos é a transição de
produtor para curador de requisitos.

**Engenharia de Requisitos Tradicional**

No modelo convencional, o engenheiro de requisitos operava primariamente como
autor:

- Conduzia entrevistas presenciais com stakeholders
- Transcrevia e analisava manualmente documentos
- Redigia extensos documentos de especificação
- Criava diagramas e modelos manualmente
- Facilitava workshops presenciais de elicitação
- Revisava documentos página por página

O valor do profissional residia em sua capacidade de capturar, organizar e
documentar informações de forma precisa e completa.

**Engenharia de Requisitos na Era dos LLMs**

Com assistência de IA, o papel evolui para curador e arquiteto de requisitos:

- Projetia prompts que extraem informações de stakeholders de forma eficiente
- Orquestra agentes de IA que realizam entrevistas, análises e especificações
- Valida e refina outputs gerados automaticamente
- Toma decisões estratégicas sobre escopo, prioridades e trade-offs
- Foca em problemas complexos que requerem julgamento humano

O valor do profissional desloca-se da produção de conteúdo para garantia de
qualidade e decisão estratégica.

**Comparativo de Atividades**

| Atividade          | Tradicional               | Com IA                             | Foco do Profissional           |
| ------------------ | ------------------------- | ---------------------------------- | ------------------------------ |
| Elicitação         | Entrevistas presenciais   | IA conduz entrevistas estruturadas | Design de protocolo, validação |
| Análise documental | Leitura manual            | Extração automática                | Verificação de completude      |
| Especificação      | Redação extensiva         | Geração automatizada               | Revisão e refinamento          |
| Validação          | Inspeções manuais         | Detecção automática de problemas   | Decisão sobre correções        |
| Gestão de mudanças | Análise manual de impacto | Propagação automática              | Aprovação estratégica          |

### Novas Competências Necessárias

O perfil do engenheiro de requisitos moderno exige competências que complementam
expertise tradicional de domínio com habilidades técnicas emergentes.

**1. Prompt Engineering para RE**

A capacidade de projetar prompts efetivos torna-se central:

- *Design de prompts estruturados*: construir templates que guiam LLMs a
  produzir requisitos de qualidade
- *Técnicas avançadas*: aplicação de Chain-of-Thought, Retrieval-Augmented
  Generation, Chain-of-Verification
- *Iteração e refinamento*: testar múltiplas variações de prompts e otimizar
  baseado em resultados
- *Versionamento de prompts*: tratar prompts como código, com controle de versão
  e documentação

```markdown
## Exemplo: Competência de Prompt Engineering

**Cenário**: Elicitar requisitos para um sistema de pagamentos

**Prompt Ineficaz**:
"Liste requisitos para um sistema de pagamentos"

**Prompt Efetivo**:
```

[CONTEXT] Você é um analista de requisitos sênior em sistemas financeiros.
Domínio: Processamento de pagamentos B2B Stakeholders: Financeiro, TI,
Compliance Restrições: PCI DSS, LGPD, latência < 200ms

[TASK] Elicite requisitos funcionais para funcionalidade de conciliação
automática.

[OUTPUT FORMAT]

- ID: REQ-XXX
- Descrição: [ação do sistema]
- Prioridade: [Alta/Média/Baixa]
- Critérios de aceitação: [3-5 bullets]

[CONSTRAINTS]

- Não inclua requisitos de UI
- Foque em regras de negócio
- Use terminologia bancária padrão

[EXAMPLES] Input: "Reconciliação de cartões" Output:

- ID: REQ-001
- Descrição: O sistema deve conciliar transações de cartão em até 24h
- Prioridade: Alta
- Critérios:
  - Match automático quando valores coincidem
  - Flag para discrepâncias > 1%
  - Auditoria de todas as ações

```

**Habilidade demonstrada**: Contextualização completa, formato estruturado, exemplos de few-shot.
```

**2. Avaliação de IA**

Profissionais devem desenvolver capacidade crítica para avaliar outputs de IA:

- *Critérios de qualidade*: definir e aplicar métricas para requisitos gerados
- *Detecção de hallucinações*: identificar requisitos inconsistentes com domínio
- *Benchmarking de modelos*: comparar performance de diferentes LLMs para
  tarefas específicas
- *Análise de viés*: reconhecer e mitigar tendências indesejadas nos outputs

**Framework de Avaliação de Requisitos Gerados**:

```
Dimensões de Avaliação:
├── Completude (0-10)
│   ├── Todos os aspectos da funcionalidade cobertos?
│   └── Dependências identificadas?
├── Clareza (0-10)
│   ├── Ambiguidades presentes?
│   └── Termos definidos?
├── Viabilidade (0-10)
│   ├── Tecnicamente realizável?
│   └── Alinhado com restrições?
├── Consistência (0-10)
│   ├── Conflitos com requisitos existentes?
│   └── Terminologia uniforme?
└── Valor (0-10)
    ├── Endereça necessidade real?
    └── Alinhado com objetivos de negócio?

Score mínimo aceitável: 7/10 em todas as dimensões
Ação: Requisitos abaixo do mínimo retornam para refinamento
```

**3. Orquestração de Agentes**

Sistemas multi-agente requerem profissionais capazes de projetar workflows
colaborativos:

- *Design de sistemas multi-agente*: definir papéis e responsabilidades de
  agentes especializados
- *Workflows de IA*: construir pipelines onde múltiplos agentes colaboram
  sequencial ou paralelamente
- *Integração com ferramentas*: conectar agentes a ferramentas de RM existentes
- *Monitoramento*: acompanhar performance de workflows e otimizar

**4. Governança de IA**

Competências em aspectos éticos e regulatórios tornam-se essenciais:

- *Ética em IA*: reconhecer implicações éticas de requisitos gerados
- *Compliance e regulamentação*: garantir que processos atendam a normas
  aplicáveis
- *Gestão de riscos*: identificar e mitigar riscos de uso de IA em RE
- *Transparência*: documentar processos para fins de auditoria

## O Futuro do Analista de Negócios (BA)

Pesquisas de 2024 indicam que o papel tradicional de Business Analyst está se
fragmentando em três funções distintas, cada uma com foco e competências
específicas.

### 1. Storyteller (Narrador de Dados)

**Função Principal**: Traduzir insights gerados por IA em narrativas
compreensíveis que apoiam decisões de projeto.

**Responsabilidades**:

- Comunicar resultados de análises de IA para stakeholders não-técnicos
- Criar narrativas de ROI e valor de negócio
- Traduzir dados técnicos complexos em recomendações executivas
- Apresentar trade-offs de forma acessível
- Construir consenso entre stakeholders com interesses divergentes

**Competências Necessárias**:

- Comunicação persuasiva e visualização de dados
- Entendimento profundo de negócio e domínio
- Capacidade de síntese e storytelling
- Habilidade de mediação e facilitação

**Exemplo de Atuação**:

```markdown
**Cenário**: Sistema de IA identificou 47 requisitos potenciais a partir de
análise de documentos de stakeholders.

**Atuação do Storyteller**:
1. Analisa os 47 requisitos e agrupa em temas (ex: onboarding, pagamentos,
   relatórios)
2. Calcula estimativas de esforço e valor para cada tema
3. Cria apresentação executiva mostrando:
   - "Se implementarmos tema A: 3 meses, ROI de 150% no primeiro ano"
   - "Se implementarmos tema B: 1 mês, resolve problema crítico do cliente X"
4. Facilita workshop com stakeholders para priorização informada
5. Documenta decisões e justificativas para auditoria
```

### 2. Steward (Guardião da Qualidade)

**Função Principal**: Validar lineage de outputs de IA, garantir compliance e
mitigar vieses.

**Responsabilidades**:

- Verificar qualidade e integridade de dados usados por IA
- Assegurar compliance regulatório em todos os outputs
- Auditar requisitos por vieses e fairness
- Manter governança de modelos e processos
- Documentar evidências para auditorias

**Competências Necessárias**:

- Conhecimento de regulamentações aplicáveis (GDPR, LGPD, HIPAA)
- Técnicas de auditoria e controle de qualidade
- Entendimento de vieses em IA e métodos de mitigação
- Meticulosidade e atenção a detalhes

**Exemplo de Atuação**:

```markdown
**Cenário**: Sistema de IA gerou 120 user stories para novo produto.

**Atuação do Steward**:
1. Executa análise de vieses nas stories:
   - 85% das personas são descritas com pronomes masculinos
   - Nenhuma consideração de acessibilidade
   - Pressupostos culturais ocidentais

2. Reporta problemas à equipe de RE

3. Ajusta prompts para incluir:
   - "Use linguagem neutra em gênero"
   - "Considere requisitos de acessibilidade WCAG 2.1"
   - "Inclua diversidade cultural nas personas"

4. Registra processo de correção para governança

5. Valida stories revisadas antes de aprovação
```

### 3. Prompt Engineer Especializado

**Função Principal**: Criar prompts efetivos e otimizados para elicitação e
especificação de requisitos.

**Responsabilidades**:

- Design de prompts especializados para domínios específicos
- Desenvolvimento de frameworks de prompting organizacionais
- Otimização de prompts para qualidade e consistência
- Manutenção de bibliotecas de prompts
- Treinamento de outros profissionais em prompt engineering

**Competências Necessárias**:

- Domínio avançado de técnicas de prompt engineering
- Conhecimento profundo do domínio de negócio
- Capacidade de teste e experimentação sistemática
- Documentação técnica clara

**Exemplo de Atuação**:

```markdown
**Cenário**: Organização precisa elicitar requisitos para sistemas em
diferentes domínios (financeiro, saúde, educação).

**Atuação do Prompt Engineer**:
1. Desenvolve templates específicos por domínio:

   financeiro_prompts/
   ├── conciliacao.md
   ├── compliance_regulatorio.md
   └── reporting.md

   saude_prompts/
   ├── prontuario_eletronico.md
   ├── agendamento.md
   └── prescricao.md

2. Cria framework CLEK adaptado (Context, Language, Examples, Keywords)

3. Estabelece processo de versionamento no Git:
   - Branches por domínio
   - Pull requests para alterações
   - Code review de prompts

4. Treina analistas de negócio no uso dos templates

5. Coleta métricas de eficácia e itera melhorias
```

### Mapeamento de Transição

```
Business Analyst Tradicional
            │
            ▼
    ┌───────┴───────┐
    │               │
    ▼               ▼
┌─────────┐   ┌─────────┐   ┌─────────┐
│Storyteller│   │ Steward │   │ Prompt  │
│         │   │         │   │ Engineer│
└────┬────┘   └────┬────┘   └────┬────┘
     │             │             │
     └─────────────┴─────────────┘
                   │
                   ▼
        ┌──────────────────┐
        │  COLABORAÇÃO     │
        │  Triangulação de │
        │  perspectivas    │
        └──────────────────┘
```

## Impacto na Produtividade

Dados empíricos de 2024-2025 quantificam o impacto da IA na produtividade de
profissionais de RE.

### Métricas Documentadas

**Produtividade Organizacional**

Estudo da Matillion (2024) analisando 200 organizações:

- **40% maior produtividade** em organizações que adotaram IA comparadas a
  benchmarks
- **54% decisões mais rápidas** em ciclos de aprovação de requisitos
- **Redução de 60%** no tempo de documentação de requisitos

**Geração de Test Cases**

Pesquisa da ThoughtWorks (2024):

- **80% redução no tempo** de geração de casos de teste a partir de user stories
- **96.11% consistência** entre testes gerados por IA
- **67.78% melhoria** com refinamento iterativo de prompts

**Ciclo de Requisitos**

Relatos da indústria indicam:

- **De dias para horas**: elicitação que levava 3-5 dias reduzida para 4-8 horas
- **Redução de 70%** em retrabalho devido a requisitos mal especificados
- **Capacidade de atender** 2-3x mais projetos com mesma equipe

### Qualidade vs. Quantidade

Importante notar que o ganho de produtividade não implica redução de qualidade.
Pelo contrário:

- Requisitos gerados com assistência de IA tendem a ser mais consistentes
- Detecção automática de ambiguidades melhora clareza
- Análise de impacto automatizada reduz erros de propagação
- Validação humana focada em problemas complexos aumenta qualidade geral

## Oportunidades Emergentes

A transformação do campo cria novas funções especializadas.

### AI Requirements Architect

**Descrição**: Arquiteto especializado em projetar sistemas completos de RE
assistida por IA.

**Responsabilidades**:

- Projetar arquiteturas de pipelines de RE
- Selecionar e integrar ferramentas de IA
- Definir padrões e frameworks organizacionais
- Garantir escalabilidade e governança

**Perfil**: Engenheiro de software com experiência em RE e ML/IA

### Prompt Librarian

**Descrição**: Curador de bibliotecas de prompts organizacionais.

**Responsabilidades**:

- Organizar e catalogar prompts por domínio e função
- Manter versionamento e documentação
- Treinar profissionais no uso da biblioteca
- Monitorar eficácia e promover melhorias

**Perfil**: Background em gestão de conhecimento e domínio técnico

### AI Validation Specialist

**Descrição**: Especialista em validação de outputs de IA.

**Responsabilidades**:

- Desenvolver frameworks de validação
- Criar checklists e critérios de qualidade
- Auditar requisitos gerados
- Treinar outros na detecção de problemas

**Perfil**: QA ou RE sênior com expertise em domínio

### Human-AI Interaction Designer

**Descrição**: Designer de interfaces entre humanos e agentes de RE.

**Responsabilidades**:

- Projetar experiências de colaboração humano-IA
- Desenvolver interfaces para orquestração de agentes
- Criar dashboards de monitoramento
- Otimizar workflows de interação

**Perfil**: UX designer com background técnico em IA

## Estratégias de Desenvolvimento de Carreira

### Para Profissionais em Início de Carreira

1. **Domine Fundamentos Tradicionais**: Entenda RE clássico antes de adicionar
   IA
2. **Aprenda Prompt Engineering**: Cursos práticos e experimentação
3. **Desenvolva Pensamento Crítico**: Capacidade de avaliar outputs de IA
4. **Escolha Especialização**: Storyteller, Steward ou Prompt Engineer
5. **Construa Portfólio**: Documente projetos e prompts efetivos

### Para Profissionais Experientes

1. **Reconheça o Shift**: Aceite que produtividade individual será menos
   valorizada que decisão estratégica
2. **Mentoreia**: Ensine profissionais juniores a trabalhar com IA
3. **Foco em Domínio**: Aprofunde expertise em setor específico
4. **Governança**: Desenvolva competências de compliance e ética
5. **Liderança**: Posicione-se como arquiteto de soluções de RE com IA

### Programa de Transição Sugerido

```
Fase 1 (Meses 1-2): Fundamentos
├── Curso de prompt engineering básico
├── Estudo de ferramentas de RE com IA
└── Experimentação em projeto pessoal

Fase 2 (Meses 3-4): Aplicação
├── Aplicação em projeto real (não-crítico)
├── Documentação de lições aprendidas
└── Feedback de colegas e stakeholders

Fase 3 (Meses 5-6): Especialização
├── Escolha de vertente (Storyteller/Steward/Prompt Engineer)
├── Aprofundamento na especialização escolhida
└── Certificações relevantes

Fase 4 (Meses 7-12): Consolidação
├── Liderança de iniciativas de RE com IA
├── Mentoria de outros profissionais
└── Contribuição para comunidade (artigos, talks)
```

## Referências

1. **Gudala, M.** (2025). "Business Analysts Who Partner with LLMs Are
   Transforming Their Role in 2025." *Medium*.
   <https://manojgudala.medium.com/business-analysts-who-partner-with-llms-are-transforming-their-role-in-2025-fa771b7e1bfd>

2. **Matillion.** (2025). "How AI Agents Are Transforming Business Analysis."
   <https://www.matillion.com/blog/ai-agents-business-analysis>

3. **Turing.** (2024). "The Future of Business Analysis In the Age of AI."
   <https://www.turing.com/kb/future-of-business-analysis-in-the-age-of-ai>

4. **ThoughtWorks.** (2024). "AI-Generated Test Cases from User Stories: An
   Experimental Research Study."
   <https://www.thoughtworks.com/insights/blog/generative-ai/AI-generated-test-cases-from-user-stories-an-experimental-research-study>

5. **Vogelsang, A.** (2024). "From Specifications to Prompts: On the Future of
   Generative Large Language Models in Requirements Engineering." *IEEE
   Software, 41(5)*.
   <https://www.computer.org/csdl/magazine/so/2024/05/10629163/1Zdj3HlmqFG>

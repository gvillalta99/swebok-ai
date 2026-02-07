---
title: Tendências e Direções Futuras da Engenharia de Requisitos com IA
created_at: 2025-02-07
tags: [software-requirements, tendências, futuro, pesquisa, multi-modal, agentes-autonomos, REaaS]
status: published
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# Tendências e Direções Futuras

A engenharia de requisitos com IA está em estágio de rápida evolução. Pesquisas
em andamento, tecnologias emergentes e mudanças no mercado apontam para
transformações significativas nos próximos anos. Este capítulo examina as
tendências mais relevantes, previsões para o período 2025-2027 e diretrizes para
organizações e profissionais se posicionarem para o futuro.

## Pesquisas em Andamento

A comunidade acadêmica identificou áreas prioritárias para pesquisa em RE com
LLMs, conforme levantamento publicado na Frontiers in Computer Science (2024).

### Extração Automática de Terminologia e Glossários

**Problema**: Inconsistência terminológica é uma das principais causas de
ambiguidade em requisitos.

**Pesquisas Atuais**:

- Uso de LLMs para identificar termos técnicos em documentação
- Geração automática de definições consistentes
- Detecção de sinônimos e polissemia
- Construção de ontologias de domínio

**Abordagens Emergentes**:

```
Documentação de Requisitos
           │
           ▼
┌──────────────────────┐
│  NER (Named Entity   │
│  Recognition) com    │
│  LLM                 │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Clustering Semântico│
│  de Termos           │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Geração de          │
│  Definições          │
│  Contextualizadas    │
└──────────┬───────────┘
           │
           ▼
     Glossário Corporativo
```

**Impacto Esperado**:

- Redução de ambiguidades por inconsistência terminológica
- Facilitação de onboarding de novos membros na equipe
- Melhoria na comunicação entre stakeholders técnicos e de negócio
- Base para sistemas de verificação semântica

### Recuperação Inteligente de Requisitos

**Problema**: Bases históricas de requisitos contêm conhecimento valioso que é
subutilizado.

**Pesquisas Atuais**:

- Semantic search em repositórios de requisitos
- Recomendação de requisitos similares a novos projetos
- Identificação de padrões recorrentes
- Análise de requisitos de projetos anteriores para estimativas

**Técnicas Emergentes**:

- Embeddings específicos para texto de requisitos
- Sistemas híbridos (BM25 + semantic search)
- Re-ranking baseado em feedback de relevância
- Cross-project learning

**Aplicação Prática**:

```markdown
**Cenário**: Product Owner inicia novo projeto de e-commerce

**Sistema de Recuperação**:
1. PO descreve funcionalidade em linguagem natural
2. Sistema busca em base histórica de 50+ projetos
3. Retorna requisitos similares de projetos anteriores
4. Sugere:
   - Requisitos frequentes neste domínio
   - Riscos identificados em implementações passadas
   - Estimativas baseadas em projetos similares
   - Stakeholders típicos para este tipo de funcionalidade
```

### RE Consciente de Ética

**Problema**: Sistemas de software perpetuam e amplificam vieses sociais
presentes em dados de treinamento.

**Linhas de Pesquisa**:

- Detecção automática de requisitos discriminatórios
- Verificação de fairness em especificações
- Identificação de exclusão de grupos minoritários
- RE responsável (Responsible RE)

**Técnicas em Desenvolvimento**:

- Classificadores de fairness treinados em requisitos anotados
- Checklists automatizados de inclusão
- Análise de impacto sociotécnico
- Frameworks de accountability

**Exemplo de Aplicação**:

```markdown
**Prompt para Detecção de Viés**:

Analise o seguinte requisito para potenciais vieses:
"{requisito}"

Verifique:
1. Gênero: Linguagem é neutra? Personas são diversas?
2. Idade: Considera usuários idosos?
3. Acessibilidade: Atende necessidades de PCDs?
4. Cultural: Pressupõe contexto específico?
5. Socioeconômico: Exclui grupos de menor renda?

Para cada viés identificado:
- Descreva o problema
- Sugira reformulação inclusiva
- Justifique a importância
```

### Small Language Models (SLMs) para RE

**Problema**: LLMs grandes são caros, lentos e requerem infraestrutura cloud.

**Pesquisas Atuais**:

- Treinamento de modelos menores (7B-13B parâmetros) especializados em RE
- Fine-tuning para tarefas específicas de elicitação e especificação
- Quantização para deployment em edge
- Distilação de conhecimento de LLMs grandes

**Vantagens de SLMs Especializados**:

- **Custo**: Inferência 10-100x mais barata
- **Velocidade**: Latência significativamente menor
- **Privacidade**: Deployment on-premise viável
- **Customização**: Mais fácil de ajustar para domínio específico

**Estado da Arte**:

| Modelo              | Parâmetros | Tarefas de RE         | Performance vs GPT-4 |
| ------------------- | ---------- | --------------------- | -------------------- |
| CodeLlama-7B        | 7B         | Especificação técnica | 75%                  |
| Mistral-7B-Instruct | 7B         | Elicitação            | 80%                  |
| Phi-3-mini          | 3.8B       | User stories          | 70%                  |
| LLaMA-2-13B         | 13B        | Análise de impacto    | 85%                  |

## Tecnologias Emergentes

### RE Multi-Modal

A próxima fronteira da elicitação de requisitos expande além do texto para
incorporar múltiplas modalidades de entrada.

**Elicitação a partir de Imagens**

- **Protótipos visuais**: Upload de wireframes ou mockups para extração
  automática de requisitos
- **Screenshots de sistemas legados**: Análise visual para identificação de
  funcionalidades
- **Fotos de processos manuais**: Captura de workflows através de imagens do
  ambiente de trabalho

```markdown
**Exemplo de Prompt Multi-Modal**:

Analise a imagem anexa (wireframe de tela de login) e elicite requisitos:

1. Funcionalidades visíveis na interface
2. Requisitos implícitos de comportamento
3. Requisitos não-funcionais (usabilidade, acessibilidade)
4. Possíveis cenários de erro
5. Requisitos de segurança sugeridos

Output em formato de user stories estruturadas.
```

**Elicitação a partir de Áudio**

- **Gravações de reuniões**: Transcrição e extração automática de requisitos
- **Entrevistas de voz**: Entrevistadores de IA conduzindo diálogos por voz
- **Notas de voz de campo**: Requisitos capturados por trabalhadores em campo

**Elicitação a partir de Vídeo**

- **Gravações de usuários**: Análise de comportamento para identificação de
  necessidades
- **Walkthroughs de sistema**: Tours virtuais gerando requisitos de migração
- **Sessões de usability testing**: Extração automática de problemas e sugestões

**Tecnologias Habilitadoras**:

- GPT-4V (Visão)
- CLIP (Conexão imagem-texto)
- Whisper (Transcrição de áudio)
- Modelos multi-modais emergentes (Gemini, Claude 3)

### Agentes Autônomos de RE

O desenvolvimento de agentes de IA capazes de conduzir atividades de RE com
mínima supervisão representa uma das tendências mais transformadoras.

**Níveis de Autonomia**

```
Nível 0: Assistente (Status atual predominante)
├── Humanos conduzem todo o processo
├── IA fornece sugestões e automações pontuais
└── Exemplo: Copilot para geração de user stories

Nível 1: Colaborador
├── IA executa tarefas específicas sob supervisão
├── Humanos definem escopo e aprovam resultados
└── Exemplo: Agente que conduz entrevistas estruturadas

Nível 2: Semi-Autônomo
├── IA executa ciclos completos com checkpoints
├── Humanos revisam e aprovam em marcos definidos
└── Exemplo: Sistema que elicita, especifica e valida iterativamente

Nível 3: Autônomo
├── IA conduz RE completo para domínios bem definidos
├── Humanos intervêm apenas em exceções
└── Exemplo: Agente que mantém backlog de produto atualizado

Nível 4: Totalmente Autônomo (Visão futura)
├── IA negocia diretamente com stakeholders
├── Identifica oportunidades de negócio
└── Propõe inovações baseadas em análise de mercado
```

**Arquitetura de Agente Autônomo**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Agente Autônomo de RE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Módulo de Percepção                            ││
│  │  • Processamento de documentos                             ││
│  │  • Análise de conversas                                    ││
│  │  • Monitoramento de sistemas                               ││
│  │  • Coleta de feedback                                      ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Módulo de Raciocínio                           ││
│  │  • Planejamento de elicitação                              ││
│  │  • Análise de gaps                                         ││
│  │  • Priorização                                             ││
│  │  • Tomada de decisão                                       ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Módulo de Ação                                 ││
│  │  • Geração de requisitos                                   ││
│  │  • Criação de artefatos                                    ││
│  │  • Comunicação com stakeholders                            ││
│  │  • Atualização de ferramentas de RM                        ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Módulo de Aprendizado                          ││
│  │  • Feedback de stakeholders                                ││
│  │  • Métricas de qualidade                                   ││
│  │  • Adaptação a domínio                                     ││
│  │  • Melhoria contínua                                       ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Desafios Técnicos**:

- Robustez em face de ambiguidade
- Negociação efetiva com stakeholders
- Equilíbrio entre exploração (novos requisitos) e explotação (refinamento)
- Explicabilidade de decisões autônomas

### Federated Learning para RE

**Problema**: Organizações não podem compartilhar dados de requisitos sensíveis,
mas poderiam beneficiar de modelos treinados em dados de múltiplas organizações.

**Conceito**: Treinamento colaborativo de modelos sem compartilhamento
centralizado de dados.

**Aplicação em RE**:

```
┌─────────────────────────────────────────────────────────────────┐
│              Federated Learning para RE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Banco A          Banco B          Telecom A       Saúde A    │
│      │                │                 │              │        │
│      ▼                ▼                 ▼              ▼        │
│  ┌────────┐      ┌────────┐       ┌────────┐     ┌────────┐   │
│  │ Modelo │      │ Modelo │       │ Modelo │     │ Modelo │   │
│  │ Local  │      │ Local  │       │ Local  │     │ Local  │   │
│  │ (SLM)  │      │ (SLM)  │       │ (SLM)  │     │ (SLM)  │   │
│  └────┬───┘      └────┬───┘       └────┬───┘     └────┬───┘   │
│       │               │                │               │       │
│       └───────────────┴────────────────┴───────────────┘       │
│                       │                                        │
│                       ▼                                        │
│              ┌────────────────┐                               │
│              │   Agregação    │                               │
│              │   Federada     │                               │
│              │   (Servidor    │                               │
│              │   Central)     │                               │
│              └────────────────┘                               │
│                       │                                        │
│                       ▼                                        │
│              Modelo Global Melhorado                          │
│              (Sem dados sensíveis expostos)                   │
└─────────────────────────────────────────────────────────────────┘
```

**Benefícios**:

- Modelos especializados sem compartilhamento de IP
- Conhecimento agregado de múltiplos domínios
- Compliance com regulamentações de privacidade
- Resiliência a vieses de organização única

## Previsões para 2025-2027

### Consolidação de Ferramentas

O mercado atual fragmentado de ferramentas de RE com IA convergirá para suites
integradas.

**Tendências Esperadas**:

- **Aquisições**: Grandes players (Atlassian, Microsoft, ServiceNow) adquirirão
  startups especializadas
- **Integrações nativas**: Capacidades de IA tornar-se-ão padrão em ferramentas
  de RM tradicionais
- **Desaparecimento de ferramentas sem IA**: Soluções que não incorporarem IA
  serão obsoletas

**Mercado Esperado em 2027**:

```
Líderes de Mercado (Suites Integradas)
├── Microsoft (GitHub Copilot + Azure DevOps + Power Platform)
├── Atlassian (Jira + Confluence + Rovo AI)
├── IBM (ELM + Watson + RQA)
└── ServiceNow (ITSM + Now Assist)

Players Especializados (Nicho)
├── Qualidade de Requisitos (IBM RQA, Qualicen)
├── Geração de Testes (TestStory, Tricentis)
├── Especificação Formal (Neuro-simbólica)
└── Compliance (Ferramentas qualificadas por domínio)

Open Source
├── LangChain/LangGraph (Orquestração)
├── Vector DBs (Chroma, Weaviate, Qdrant)
└── Modelos especializados (Hugging Face)
```

### Padrões de Prompt Engineering

A formalização de práticas de prompt engineering para RE levará a standards e
certificações.

**Desenvolvimentos Esperados**:

- **ISO/IEC standards** para documentação de prompts em RE
- **Certificações profissionais** em Prompt Engineering para Requirements
- **Bibliotecas organizacionais** de prompts como ativos corporativos
- **Governança de prompts** como disciplina estabelecida

**Template de Documentação de Prompt (Futuro)**:

```yaml
prompt_id: REQ-ELIC-001
version: 2.3.1
owner: team-requirements@company.com
certification:
  standard: ISO/IEC-RE-PROMPT-2026  # (exemplo hipotético)
  level: Professional
  validated_by: certification-body-xyz
category: Elicitation
domain: Financial Services
compliance: [SOX, PCI-DSS]
inputs:
  - name: stakeholder_transcript
    type: text
    required: true
outputs:
  - name: user_stories
    type: json_schema
    schema: user_story_v2.json
performance:
  accuracy: 0.89
  consistency: 0.94
  hallucination_rate: 0.03
last_validated: 2026-11-15
```

### RE como Serviço (REaaS)

A engenharia de requisitos disponibilizar-se-á como APIs e microsserviços.

**Modelos de Serviço**:

```
┌─────────────────────────────────────────────────────────────────┐
│              Requirements Engineering as a Service             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Tier 1: Elicitação Básica                                     │
│  POST /api/v1/elicit                                           │
│  Input: {stakeholder_input, domain}                            │
│  Output: {requirements: [...], confidence: 0.92}               │
│  Preço: $0.01/requisito                                       │
│                                                                  │
│  Tier 2: Especificação Completa                                │
│  POST /api/v1/specify                                          │
│  Input: {functional_description, constraints}                  │
│  Output: {user_stories, acceptance_criteria, tests}            │
│  Preço: $0.05/artefato                                        │
│                                                                  │
│  Tier 3: RE Gerenciado                                         │
│  • Acesso a agentes autônomos                                  │
│  • Suporte de especialistas humanos                            │
│  • SLAs de qualidade                                           │
│  • Integração customizada                                      │
│  Preço: Assinatura mensal baseada em volume                    │
└─────────────────────────────────────────────────────────────────┘
```

**Casos de Uso**:

- Startups sem expertise interna de RE
- Grandes organizações em projetos pontuais
- Empresas de consultoria escalando delivery
- Integração em plataformas low-code/no-code

### Educação e Treinamento

Prompt engineering tornar-se-á competência obrigatória em currículos de RE.

**Mudanças Curriculares Previstas**:

- **Cursos universitários**: Disciplinas obrigatórias de IA em RE
- **Certificações profissionais**: CBAP, PMI-PBA incluirão IA
- **Treinamentos corporativos**: Prompt engineering como habilidade básica
- **Ambientes acadêmicos**: Ferramentas de RE com IA em laboratórios

**Competências do Currículo 2027**:

```
Fundamentos (40%)
├── Técnicas tradicionais de elicitação
├── Modelagem de requisitos
├── Gestão de requisitos
└── Qualidade de requisitos

IA em RE (35%)
├── Prompt engineering
├── Avaliação de outputs de IA
├── Orquestração de agentes
└── Governança de IA

Aplicação (25%)
├── Ferramentas modernas
├── Case studies
├── Projeto integrador
└── Ética e compliance
```

## Diretrizes para Organizações

### Estratégia de Curto Prazo (2025)

**Comece Pequeno**

- Selecione 1-2 projetos piloto não-críticos
- Foque em automações de baixo risco (formatação, checklists)
- Estabeleça baseline de métricas antes da implementação

**Valide Antes de Escalar**

- Defina critérios de sucesso claros
- Colete feedback de todos os stakeholders
- Documente lições aprendidas sistematicamente
- Ajuste processos baseado em resultados

**Invista em Capacitação**

- Treine equipe em prompt engineering básico
- Desenvolva cultura de human-in-the-loop
- Estabeleça comunidades de prática internas
- Incentive experimentação controlada

### Estratégia de Médio Prazo (2026)

**Estabeleça Governança**

- Defina políticas de uso de IA em RE
- Estabeleça processos de validação obrigatória
- Crie critérios de aceitação de outputs
- Implemente monitoramento de qualidade

**Integre ao Stack**

- Conecte ferramentas de IA a sistemas existentes
- Desenvolva APIs internas de RE
- Automatize workflows de handoff
- Crie bibliotecas de prompts organizacionais

**Meça e Otimize**

- Monitore métricas de produtividade
- Meça qualidade de requisitos (defeitos por requisito)
- Avalie satisfação de stakeholders
- Calcule ROI de iniciativas de IA

### Estratégia de Longo Prazo (2027+)

**Consolide e Inove**

- Consolide ferramentas em suite integrada
- Explore agentes autônomos para casos maduros
- Considere REaaS para projetos específicos
- Posicione-se como organização líder em RE com IA

## Diretrizes para Profissionais

### Desenvolvimento de Novas Habilidades

**Prioridades de Aprendizado**:

1. **Prompt Engineering** (Imediato)

   - Cursos online (Anthropic, OpenAI)
   - Prática sistemática com projetos pessoais
   - Participação em comunidades

2. **Avaliação Crítica de IA** (6 meses)

   - Estudo de casos de falha
   - Desenvolvimento de frameworks de avaliação
   - Benchmarking de modelos

3. **Ferramentas Emergentes** (Contínuo)

   - Acompanhamento de lançamentos
   - Experimentação hands-on
   - Contribuição para comunidades open-source

### Posicionamento Profissional

**Mantenha Foco em Valor**:

- IA é ferramenta, não substituto
- Foco em decisões estratégicas complexas
- Relacionamento com stakeholders como diferencial
- Comunicação de insights como valor central

**Experimente e Compartilhe**:

- Teste novas técnicas em projetos
- Documente resultados e aprendizados
- Contribua com artigos e apresentações
- Participe de conferências e comunidades

### Plano de Carreira 2025-2027

```
2025: Fundação
├── Especialização em prompt engineering
├── Certificação em ferramentas principais
├── Portfólio de 3-5 projetos com IA
└── Network na comunidade de RE com IA

2026: Consolidação
├── Liderança de iniciativas de IA na organização
├── Mentoria de profissionais juniores
├── Palestras em eventos da indústria
└── Contribuições para standards emergentes

2027: Liderança
├── Posição de referência em RE com IA
├── Influência em decisões estratégicas
├── Possível transição para consultoria
└── Contribuições para literatura acadêmica
```

## Referências

1. **Hemmat, M., et al.** (2024). "Research Directions for Using LLM in Software
   Requirement Engineering: A Systematic Review." *Frontiers in Computer
   Science, 7*.
   <https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2024.1519437/full>

2. **Vogelsang, A.** (2024). "From Specifications to Prompts: On the Future of
   Generative Large Language Models in Requirements Engineering." *IEEE
   Software, 41(5)*.
   <https://www.computer.org/csdl/magazine/so/2024/05/10629163/1Zdj3HlmqFG>

3. **Ebrahim, A., et al.** (2024). "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *arXiv:2401.00000*.
   <https://aclanthology.org/2024.acl-srw.31/>

4. **ZenML.** (2025). "LLMOps in Production: 457 Case Studies of What Actually
   Works."
   <https://www.zenml.io/blog/llmops-in-production-457-case-studies-of-what-actually-works>

5. **Anthropic.** (2024). "Claude 3 Best Practices."
   <https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview>

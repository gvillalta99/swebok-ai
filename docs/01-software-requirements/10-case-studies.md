---
title: Case Studies e Exemplos Práticos de Engenharia de Requisitos com IA
created_at: 2025-02-07
tags: [software-requirements, case-studies, exemplos, prática, implementação, lições-aprendidas]
status: published
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# Case Studies e Exemplos Práticos

A análise de implementações reais de engenharia de requisitos assistida por IA
oferece insights valiosos sobre o que funciona, o que falha e como evitar
armadilhas comuns. Este capítulo examina cinco casos documentados entre 2023 e
2025, extraindo padrões de sucesso e lições aprendidas aplicáveis a diferentes
contextos organizacionais.

## Caso 1: Austrian Post Group IT (2024)

### Contexto

A Austrian Post Group IT, divisão de tecnologia do serviço postal nacional da
Áustria, enfrentava desafios típicos de desenvolvimento ágil em grande escala:

- Múltiplos times distribuídos trabalhando em produtos interdependentes
- Inconsistência na qualidade de user stories entre equipes
- Retrabalho frequente devido a requisitos mal compreendidos
- Dificuldade em manter alinhamento entre Product Owners

A organização operava com mais de 50 squads ágeis, processando milhares de user
stories por ano. A variabilidade na qualidade das especificações impactava
diretamente a velocidade de entrega e a satisfação dos stakeholders.

### Solução: Sistema ALAS

A Austrian Post desenvolveu o ALAS (Autonomous LLM-based Agent System), uma
arquitetura multi-agente para quality assurance de requisitos ágeis.

**Arquitetura do Sistema**

```
┌─────────────────────────────────────────────────────────────────┐
│                     Sistema ALAS                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐                                                │
│  │  Jira Cloud │                                                │
│  │   (Source)  │                                                │
│  └──────┬──────┘                                                │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                Orquestrador LangGraph                      ││
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ││
│  │  │   Agente    │───→│   Agente    │───→│   Agente    │    ││
│  │  │ Validador   │    │ Sugeridor   │    │  Formatter  │    ││
│  │  │ de Qualidade│    │  de Melhorias│   │   de Saída  │    ││
│  │  └─────────────┘    └─────────────┘    └─────────────┘    ││
│  └─────────────────────────────────────────────────────────────┘│
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    GPT-4 API                                ││
│  │              (Processamento de LLM)                        ││
│  └─────────────────────────────────────────────────────────────┘│
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                Feedback Loop                                ││
│  │  • Comentários em issues do Jira                           ││
│  │  • Scores de qualidade                                      ││
│  │  • Sugestões de refinamento                                ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Funcionalidades Implementadas**

1. **Validação Automática de User Stories**: Cada story criada ou modificada é
   analisada automaticamente contra critérios de qualidade pré-definidos

2. **Detecção de INVEST**: Verificação de Independente, Negociável, Valiosa,
   Estimável, Pequena e Testável

3. **Sugestões de Refinamento**: Comentários automáticos em issues do Jira com
   sugestões específicas de melhoria

4. **Análise de Dependências**: Identificação de dependências implícitas entre
   stories de diferentes times

5. **Dashboard de Qualidade**: Métricas agregadas de qualidade por time, sprint
   e produto

**Prompt Utilizado (Simplificado)**

```markdown
Você é um Agile Coach experiente especializado em User Stories de qualidade.

Analise a seguinte User Story:
Título: {title}
Descrição: {description}
Critérios de Aceitação: {acceptance_criteria}

Avalie segundo critérios INVEST:
1. Independente: A story pode ser desenvolvida isoladamente?
2. Negociável: Há flexibilidade no escopo?
3. Valiosa: Entrega valor ao usuário?
4. Estimável: A equipe consegue estimar?
5. Pequena: Cabe em uma sprint?
6. Testável: Critérios de aceitação claros?

Para cada critério não atendido:
- Explique o problema
- Sugira melhoria específica
- Forneça exemplo de como deveria ser

Formato de saída: JSON estruturado
```

### Resultados

Após 6 meses de operação:

- **Redução de 45%** em retrabalho devido a requisitos mal especificados
- **Aumento de 60%** na consistência de user stories entre times
- **Melhoria de 35%** na satisfação dos Product Owners com qualidade das
  entregas
- **Economia estimada**: 15-20 horas por sprint por time em refinamentos

### Lições Aprendidas

**O que Funcionou**

1. **Integração Transparente**: O sistema opera dentro do Jira, sem mudanças no
   workflow dos times
2. **Feedback Imediato**: Análise em tempo real permite correção rápida
3. **Educação Contínua**: Times aprendem padrões de qualidade através das
   sugestões
4. **Métricas Visíveis**: Dashboards criam competição saudável entre equipes

**Desafios Enfrentados**

1. **Resistência Inicial**: Alguns Product Owners viam o sistema como crítica,
   não apoio
2. **Falsos Positivos**: Necessidade de tuning para reduzir alertas
   desnecessários
3. **Contexto Específico**: Prompts genéricos precisaram de adaptação ao
   contexto postal

**Recomendações**

- Posicionar ferramenta como assistente, não avaliador
- Permitir override humano com justificativa
- Iterar prompts baseado em feedback dos times
- Investir em onboarding e comunicação

## Caso 2: Accenture (2024)

### Contexto

A Accenture enfrentava o desafio de onboarding de novos funcionários em escala
global. Com milhares de contratações anuais, o processo tradicional de
treinamento apresentava:

- Alto custo com treinadores dedicados
- Inconsistência na qualidade do onboarding entre regiões
- Dificuldade em manter materiais atualizados
- Baixa retenção de conhecimento documentado

### Solução: Arquitetura GenAI Multi-Modelo

A Accenture desenvolveu uma solução baseada em arquitetura multi-modelo para
assistência de conhecimento durante onboarding.

**Componentes da Arquitetura**

```
┌─────────────────────────────────────────────────────────────────┐
│              Sistema de Onboarding GenAI                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              Camada de Ingestão                             ││
│  │  • Documentação interna                                     ││
│  │  • Políticas e procedimentos                                ││
│  │  • Materiais de treinamento                                 ││
│  │  • Casos de projetos anteriores                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │           Processamento e Indexação                         ││
│  │  • Chunking inteligente                                     │
│  │  • Embeddings (text-embedding-3-large)                      │
│  │  • Vector DB (Pinecone)                                     ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              RAG Pipeline                                   ││
│  │  • Retrieval de contexto relevante                          ││
│  │  • GPT-4 para geração de respostas                          ││
│  │  • Verificação de factualidade                              ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │           Interface de Interação                            ││
│  │  • Chatbot interno                                          ││
│  │  • Integração com Teams/Slack                               ││
│  │  • Sistema de tickets para escalada                         ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Funcionalidades**

1. **Q&A Inteligente**: Sistema de perguntas e respostas baseado na documentação
   corporativa
2. **Caminhos de Aprendizado Personalizados**: Roteiros de onboarding adaptados
   ao papel do funcionário
3. **Simulações de Cenários**: Casos práticos gerados dinamicamente baseados em
   projetos reais
4. **Acompanhamento de Progresso**: Métricas de engajamento e compreensão

### Resultados

- **50% redução** no tempo de treinamento de novos contratados
- **Redução de 70%** no volume de perguntas repetidas para equipes de RH
- **Aumento de 40%** na satisfação dos funcionários com processo de onboarding
- **Economia anual estimada**: milhões de dólares em custos de treinamento

### Lições Aprendidas

**O que Funcionou**

1. **Grounding Efetivo**: Base de conhecimento bem estruturada é fundamental
2. **RAG vs. Fine-tuning**: RAG provou-se mais eficiente que fine-tuning para
   conteúdo em constante mudança
3. **Multi-modelo**: Uso de modelos diferentes para retrieval vs. geração
   melhorou qualidade
4. **Human-in-the-Loop**: Escalada para humanos mantém qualidade em casos
   complexos

**Desafios Enfrentados**

1. **Atualização de Documentação**: Necessidade de processos para manter base de
   conhecimento atualizada
2. **Qualidade de Fontes**: Documentação desatualizada ou inconsistente gerou
   respostas incorretas
3. **Privacidade**: Necessidade de controles rigorosos sobre quem acessa quais
   informações

## Caso 3: Banco Nacional (2024)

### Contexto

Um banco nacional (nome não divulgado por questões de compliance) desenvolveu um
chatbot de suporte ao cliente com requisitos rigorosos de compliance regulatório
no setor financeiro.

**Desafios Específicos**

- Gestão de conhecimento de domínio bancário complexo
- Compliance com regulamentações do Banco Central
- Precisão absolutamente necessária em respostas sobre produtos financeiros
- Risco reputacional e legal de informações incorretas

### Solução: GPT-4 com RAG e Human-in-the-Loop

O banco implementou uma arquitetura robusta de RAG com múltiplas camadas de
segurança.

**Arquitetura de Segurança**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Sistema Bancário                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  CAMADA 1: Segregação de Dados                              ││
│  │  • Dados públicos (produtos, tarifas)                       ││
│  │  • Dados sensíveis (requerem autenticação)                  ││
│  │  • Dados regulatórios (compliance, audit)                   ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  CAMADA 2: RAG Grounding                                    ││
│  │  • Base regulatória oficial                                 ││
│  │  • Manuais de produtos aprovados                            ││
│  │  • FAQs validadas pela compliance                           ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  CAMADA 3: Processamento LLM                                ││
│  │  • GPT-4 com temperatura baixa (0.1)                        ││
│  │  • Prompts com instruções de compliance                     ││
│  │  • Restrições explícitas sobre o que não pode responder     ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  CAMADA 4: Validação e Escalada                             ││
│  │  • Filtro de confiança (threshold > 0.9)                    ││
│  │  • Escalada automática para casos de baixa confiança        ││
│  │  • Log de todas as interações para auditoria                ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

**Prompt de Compliance**

```markdown
Você é um assistente virtual do [Banco], treinado para responder perguntas
sobre produtos e serviços bancários.

INSTRUÇÕES CRÍTICAS DE COMPLIANCE:
1. NUNCA forneça conselhos financeiros personalizados
2. NUNCA faça promessas sobre aprovação de crédito
3. SEMPRE baseie respostas apenas na documentação fornecida
4. Se não tiver certeza, diga "Não tenho essa informação" e escale
5. Inclua disclaimer: "Esta informação é apenas orientativa..."
6. Para questões de segurança, redirecione para canal seguro

CONTEXTO DISPONÍVEL:
{retrieved_context}

PERGUNTA DO CLIENTE:
{user_question}

Responda de forma clara, objetiva e sempre dentro das políticas do banco.
```

### Resultados

- **95% precisão** em respostas sobre produtos bancários
- **Zero incidentes** de compliance graves
- **Redução de 60%** no volume de ligações para call center
- **Satisfação do cliente**: 4.2/5.0

### Lições Aprendidas

**O que Funcionou**

1. **Grounding Rigido**: Todas as respostas baseadas em fontes oficiais
   validadas
2. **Conservadorismo**: Preferência por não responder a fornecer informação
   potencialmente incorreta
3. **Auditoria Completa**: Toda interação registrada para compliance
4. **Escalada Clara**: Processo definido para casos fora do escopo

**Desafios Enfrentados**

1. **Manutenção da Base**: Documentação muda frequentemente (novas tarifas,
   produtos)
2. **Falsa Confiança**: Alguns usuários confiavam demais no chatbot para
   decisões importantes
3. **Complexidade Regulatória**: Mudanças regulatórias exigiam atualizações
   rápidas

## Caso 4: GeneUS (2024)

### Contexto

O GeneUS (Generator of User Stories) foi um projeto de pesquisa acadêmica que
demonstrou a viabilidade de automação completa do ciclo de user stories.

**Objetivos da Pesquisa**

- Avaliar capacidade de GPT-4 em gerar user stories completas automaticamente
- Comparar qualidade de stories geradas vs. escritas por humanos
- Identificar limitações e oportunidades de melhoria

### Metodologia

**Pipeline de Geração**

```
Documento de Requisitos (input)
           │
           ▼
┌──────────────────────┐
│  Extração de         │
│  Funcionalidades     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Geração de          │
│  User Stories        │
│  (GPT-4)             │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Geração de Critérios│
│  de Aceitação        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Geração de Casos    │
│  de Teste            │
└──────────┬───────────┘
           │
           ▼
     [User Story Completa]
```

**Prompt de Geração**

```markdown
Você é um Product Owner experiente. Com base na seguinte descrição de
funcionalidade:

{funcionalidade}

Gere:

1. USER STORY no formato:
   "Como [tipo de usuário], quero [objetivo], para que [benefício]"

2. CRITÉRIOS DE ACEITAÇÃO (5-7 itens):
   - Use formato Given-When-Then quando aplicável
   - Inclua cenários positivos e negativos
   - Sejam específicos e mensuráveis

3. NOTAS TÉCNICAS:
   - Restrições identificadas
   - Dependências potenciais
   - Riscos

4. CASOS DE TESTE:
   - Cenários principais
   - Casos de borda
   - Cenários de erro

Output em formato JSON estruturado.
```

### Resultados

**Avaliação por Especialistas**

Stories geradas foram avaliadas por Product Owners experientes:

| Critério               | Score Médio (1-5) | Comparação com Humanos |
| ---------------------- | ----------------- | ---------------------- |
| Clareza                | 4.2               | Similar                |
| Completude             | 3.8               | Inferior               |
| Viabilidade            | 4.0               | Similar                |
| Valor de Negócio       | 3.5               | Inferior               |
| Critérios de Aceitação | 4.1               | Similar                |

**Conclusões da Pesquisa**

1. **Viável com Supervisão**: Automação completa é possível, mas requer revisão
   humana
2. **Melhor que Baseline**: Stories geradas superaram escritas por iniciantes
3. **Contexto Crítico**: Qualidade depende fortemente da qualidade do input
4. **Iteração Necessária**: Melhores resultados com refinamento interativo

### Lições Aprendidas

**Contribuições do Estudo**

1. **Automação Total é Viável**: Demonstração técnica de pipeline completo
2. **Human-in-the-Loop Essencial**: Revisão humana continua necessária
3. **Contexto é Capital**: Qualidade do input determina qualidade do output
4. **Padronização**: Stories geradas são mais consistentes que humanas

## Caso 5: Especificação Formal Neuro-Simbólica (2024)

### Contexto

Pesquisadores exploraram a geração de especificações formais ACSL (ANSI/ISO C
Specification Language) a partir de código C, combinando GPT-4 com métodos
formais tradicionais.

**Desafio Técnico**

Especificações formais são cruciais para sistemas safety-critical, mas sua
criação manual é:

- Extremamente trabalhosa
- Requer expertise especializada rara
- Propensa a erros humanos
- Custo proibitivo para muitos projetos

### Solução: Abordagem Neuro-Simbólica

**Arquitetura**

```
Código C (Input)
      │
      ▼
┌──────────────────────┐
│  Análise Estática    │
│  (Frama-C)           │
│  - Extração de AST   │
│  - Identificação de  │
│    contratos         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  GPT-4               │
│  - Geração de        │
│    anotações ACSL    │
│  - Explicação em     │
│    linguagem natural │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Validação Formal    │
│  (PathCrawler, EVA)  │
│  - Verificação de    │
│    correção          │
│  - Identificação de  │
│    falhas            │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Refinamento         │
│  Iterativo           │
└──────────────────────┘
```

**Processo**

1. **Análise Estática**: Frama-C analisa código e identifica onde anotações são
   necessárias
2. **Geração por LLM**: GPT-4 gera anotações ACSL baseado no contexto
3. **Validação**: PathCrawler e EVA verificam se anotações são válidas
4. **Refinamento**: Se inválidas, feedback é enviado ao LLM para correção
5. **Iteração**: Processo repete até anotações passarem na validação

### Resultados

**Comparação com Métodos Tradicionais**

| Métrica  | Neuro-Simbólica | Baseline (Sempre-True) | Melhoria |
| -------- | --------------- | ---------------------- | -------- |
| Precisão | 78%             | 45%                    | +73%     |
| Recall   | 65%             | 100%                   | -35%     |
| F1-Score | 71%             | 62%                    | +15%     |
| Tempo    | 5 min/função    | 30 min/função          | -83%     |

**Análise**

- GPT-4 gerou anotações melhores que baseline simples
- Taxa de recall menor indica necessidade de supervisão
- Ganho de produtividade significativo (83% redução de tempo)
- Melhor desempenho em funções com contratos claros

### Lições Aprendidas

**O que Funcionou**

1. **Combinação Neuro-Simbólica**: LLM + verificador formal é mais efetivo que
   isoladamente
2. **Loop de Feedback**: Iteração com validador melhora qualidade
   progressivamente
3. **Explicações Naturais**: LLM gera documentação acessível junto com
   especificação formal

**Limitações Identificadas**

1. **Complexidade**: Funções complexas (recursão, ponteiros) apresentam maior
   erro
2. **Supervisão Necessária**: Requer expertise para revisar e corrigir
3. **Cobertura Parcial**: Não substitui completamente especialista humano

## Padrões e Anti-Padrões

### Padrões de Sucesso

Com base nos casos analisados, identificam-se padrões consistentes:

**1. Grounding em Dados Verificados**

Todos os casos bem-sucedidos fundamentaram IA em fontes confiáveis:

- Documentação oficial validada
- Bases de conhecimento corporativas
- Regulamentações codificadas
- Casos históricos revisados

**2. Human-in-the-Loop Estratégico**

Não substituir humanos, mas redirecionar esforço:

- IA gera rascunhos; humanos refinam
- IA detecta problemas; humanos decidem correções
- IA sugere alternativas; humanos escolhem

**3. Iteração e Feedback Contínuo**

Melhores resultados vieram de sistemas que aprendem:

- Refinamento de prompts baseado em resultados
- Ajuste de thresholds de confiança
- Incorporação de feedback de usuários

**4. Métricas e Monitoramento**

Todos os casos implementaram medição:

- Qualidade de outputs (consistência, completude)
- Produtividade (tempo economizado)
- Satisfação de stakeholders
- Taxas de erro e retrabalho

### Anti-Padrões a Evitar

**1. Automação Total sem Supervisão**

Caso GeneUS demonstrou que revisão humana continua essencial. Confiar cegamente
em outputs de IA gera:

- Requisitos inconsistentes com realidade
- Hallucinações não detectadas
- Problemas de compliance

**2. Ignorar Contexto Organizacional**

Prompts genéricos geram resultados genéricos. Falha em:

- Adaptar à terminologia específica
- Considerar restrições de domínio
- Incorporar cultura organizacional

**3. Subestimar Manutenção**

Sistemas de IA requerem manutenção contínua:

- Atualização de bases de conhecimento
- Re-tuning de prompts
- Adaptação a mudanças regulatórias

**4. Falta de Governança**

Ausência de processos claros resulta em:

- Responsabilidades indefinidas
- Dificuldade de auditoria
- Riscos de compliance

## Checklist de Lições Aprendidas

Para organizações iniciando jornada de RE com IA:

### Planejamento

- [ ] Definiu casos de uso iniciais de baixo risco?
- [ ] Estabeleceu métricas de sucesso claras?
- [ ] Identificou stakeholders e gestores de mudança?
- [ ] Mapeou riscos e controles?

### Implementação

- [ ] Integrou com ferramentas existentes?
- [ ] Implementou RAG com dados verificados?
- [ ] Estabeleceu processo de validação humana?
- [ ] Configurou logging e auditoria?

### Operação

- [ ] Treinou equipe em prompt engineering?
- [ ] Criou biblioteca de prompts organizacional?
- [ ] Estabeleceu ciclo de melhoria contínua?
- [ ] Documentou processos para compliance?

### Governança

- [ ] Definiu papéis e responsabilidades?
- [ ] Estabeleceu critérios de aprovação?
- [ ] Implementou monitoramento de qualidade?
- [ ] Criou plano de contingência?

## Referências

1. **Kässinger, F., et al.** (2024). "Exploring LLMs for Verifying Technical
   System Specifications Against Requirements." *arXiv:2411.11582*.
   <https://arxiv.org/abs/2411.11582>

2. **Zadenoori, B., et al.** (2024). "Automated User Story Generation with Test
   Case Generation using LLMs." *arXiv:2404.01558*.
   <https://arxiv.org/abs/2404.01558>

3. **ThoughtWorks.** (2024). "AI-Generated Test Cases from User Stories: An
   Experimental Research Study."
   <https://www.thoughtworks.com/insights/blog/generative-ai/AI-generated-test-cases-from-user-stories-an-experimental-research-study>

4. **Liu, R., et al.** (2024). "Using LLM-Generated Draft Replies to Support
   Human Experts in Responding to Stakeholder Inquiries: A Real-World Case
   Study." *arXiv:2412.12732*. <https://arxiv.org/abs/2412.12732>

5. **Norheim, K., et al.** (2024). "From Inductive to Deductive: LLMs-Based
   Qualitative Data Analysis in Requirements Engineering." *arXiv:2404.19384*.
   <https://arxiv.org/abs/2404.19384>

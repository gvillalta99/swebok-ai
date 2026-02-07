---
title: Especificação como Prompt Engineering
created_at: 2025-02-07
tags: [software-requirements, especificacao, prompt-engineering, user-stories, casos-de-uso, cot, rag, cov]
status: draft
updated_at: 2025-02-07
ai_model: k2p5
---

# 4. Especificação como Prompt Engineering

## 4.1 Componentes de um Prompt Efetivo para RE

A especificação de requisitos na era dos LLMs transcende a simples redação de
sentenças em linguagem natural. Torna-se um exercício de engenharia de
instruções: projetar prompts que, quando processados por modelos de linguagem,
geram artefatos de qualidade que satisfazem necessidades de stakeholders. Esta
seção estabelece os fundamentos do design de prompts para engenharia de
requisitos.

### 4.1.1 Context (Contexto)

O contexto fornece ao LLM o background necessário para interpretar corretamente
a tarefa. Um prompt sem contexto adequado gera respostas genéricas,
frequentemente irrelevantes para o domínio específico.

**Elementos de Contexto:**

- **Domínio do problema**: Setor industrial, tipo de negócio, regulamentações
  aplicáveis
- **Stakeholders envolvidos**: Perfis de usuários, patrocinadores, equipe
  técnica
- **Sistemas legados**: Infraestrutura existente, integrações obrigatórias,
  débito técnico
- **Restrições de negócio**: Orçamento, prazo, recursos disponíveis
- **Objetivos estratégicos**: Metas de negócio que o sistema deve suportar

**Exemplo de Contexto Bem Definido:**

```
[CONTEXT]
Você está especificando requisitos para um sistema de gestão de
frota logística para uma transportadora de médio porte (50-100 veículos).

Domínio: Logística e transporte rodoviário de cargas
Stakeholders: Gestor de frota, motoristas, clientes (embarcadores),
              equipe de manutenção
Sistemas legados: ERP SAP integrado, rastreadores GPS em 60% da frota
Restrições: Orçamento de R$ 500k, prazo de 6 meses, equipe de 4 devs
Objetivos: Reduzir custos de combustível em 15%, melhorar OTIF para 95%
```

### 4.1.2 Task (Tarefa)

A tarefa especifica ação concreta que o LLM deve executar. Deve ser:

- **Específica**: Evitar verbos genéricos como "analisar" ou "processar"
- **Mensurável**: Definir critérios de conclusão claros
- **Limitada**: Escopo bem definido para evitar vagueza
- **Acionável**: Resultado que pode ser usado diretamente

**Comparação:**

| Vago                      | Específico                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| "Crie user stories"       | "Gere 5 user stories no formato 'Como [persona], quero [ação], para que [benefício]', cobrindo o fluxo de agendamento de manutenção preventiva" |
| "Especifique o requisito" | "Converta a seguinte descrição em requisito estruturado segundo ISO 29148, incluindo ID, descrição, critérios de aceitação e rastreabilidade"   |

### 4.1.3 Output Format (Formato de Saída)

Especificar o formato de saída é crítico para garantir que o resultado possa ser
consumido por sistemas downstream ou por stakeholders específicos.

**Formatos Comuns:**

- **JSON**: Para integração com sistemas, APIs, bancos de dados
- **Markdown**: Para documentação legível por humanos
- **XML**: Para compatibilidade com ferramentas legadas
- **YAML**: Para configuração e infraestrutura
- **Tabelas**: Para comparações e matrizes
- **Templates estruturados**: Formato específico de ferramentas (Jira,
  Confluence)

**Exemplo de Especificação de Formato:**

```
[OUTPUT FORMAT]
Forneça a saída em JSON com a seguinte estrutura:
{
  "requirement_id": "REQ-XXX",
  "title": "Título conciso",
  "description": "Descrição detalhada",
  "type": "Funcional|Não-funcional|Restrição",
  "priority": "Alta|Média|Baixa",
  "acceptance_criteria": ["critério 1", "critério 2"],
  "dependencies": ["REQ-YYY", "REQ-ZZZ"],
  "stakeholders": ["perfil 1", "perfil 2"],
  "estimated_effort": "story points ou horas"
}
```

### 4.1.4 Constraints (Restrições)

Restrições delimitam o espaço de soluções aceitáveis, reduzindo alucinações e
garantindo alinhamento com realidades técnicas e organizacionais.

**Tipos de Restrições:**

- **Tecnológicas**: Stack tecnológico, versões, frameworks
- **Arquiteturais**: Padrões obrigatórios, constraints de segurança
- **Regulatórias**: Compliance com normas e leis
- **Organizacionais**: Processos, padrões de nomenclatura, ferramentas
- **Temporais**: Prazos, cronogramas, dependências de mercado

**Exemplo:**

```
[CONSTRAINTS]
- Linguagem: Python 3.11+ apenas
- Framework web: FastAPI (não Django ou Flask)
- Banco de dados: PostgreSQL 15 (migração de MySQL proibida)
- Autenticação: OAuth 2.0 com integração ao Active Directory existente
- Compliance: LGPD obrigatório, dados pessoais devem ser criptografados
- Padrão de código: PEP 8, type hints obrigatórios
```

### 4.1.5 Examples (Exemplos - Few-Shot Learning)

Few-shot learning é uma das técnicas mais efetivas de prompt engineering:
fornecer exemplos de entrada-saída desejada para que o LLM aprenda o padrão.

**Estrutura de Few-Shot:**

```
[EXAMPLES]

Exemplo 1:
Input: "Preciso de uma funcionalidade para clientes acompanharem entregas"
Output:
{
  "requirement_id": "REQ-001",
  "title": "Rastreamento de entregas para clientes",
  "description": "O sistema deve permitir que clientes consultem em tempo real o status e localização de suas entregas",
  "type": "Funcional",
  "priority": "Alta",
  "acceptance_criteria": [
    "Cliente consegue ver status da entrega sem login (via código de rastreio)",
    "Informações atualizadas em tempo real (delay < 5 min)",
    "Interface responsiva para mobile"
  ]
}

Exemplo 2:
[similar structure]
```

**Diretrizes para Exemplos:**

- Forneça 2-5 exemplos representativos
- Inclua variação (diferentes tipos de requisitos)
- Mantenha consistência no formato
- Se possível, inclua exemplo negativo (o que NÃO fazer)

### 4.1.6 Template Padrão Recomendado

Compondo todos os elementos, um template padrão para especificação de
requisitos:

```markdown
[ROLE]
Você é [perfil profissional] especializado em [domínio].

[CONTEXT]
[Contexto completo do sistema e domínio]

[TASK]
[Descrição específica do que deve ser gerado]

[INPUT]
[Entrada específica para processamento]

[REQUIREMENTS]
- Requisito de qualidade 1
- Requisito de qualidade 2
- ...

[OUTPUT FORMAT]
[Especificação detalhada do formato de saída]

[CONSTRAINTS]
- Restrição 1
- Restrição 2
- ...

[EXAMPLES]
[Exemplos de few-shot learning]

[NOTES]
[Observações adicionais]
```

## 4.2 Técnicas Avançadas de Prompt Engineering

### 4.2.1 Chain-of-Thought (CoT)

Chain-of-Thought instrui o LLM a expor seu raciocínio passo a passo, melhorando
significativamente a qualidade de tarefas complexas que requerem decomposição.

**Aplicação em RE:**

- Decomposição de requisitos complexos em sub-requisitos
- Análise de impacto de mudanças
- Identificação de dependências
- Avaliação de trade-offs

**Exemplo de Prompt CoT:**

```
[CHAIN-OF-THOUGHT INSTRUCTION]
Analise o seguinte requisito complexo e decomponha-o passo a passo:

1. Primeiro, identifique os principais objetivos deste requisito
2. Em seguida, liste as funcionalidades necessárias para atingir cada objetivo
3. Para cada funcionalidade, identifique dependências técnicas
4. Avalie quais partes podem ser implementadas em paralelo vs. sequencialmente
5. Identifique riscos potenciais em cada etapa
6. Finalmente, sintetize tudo em um plano de implementação

[REQUISITO COMPLEXO]
"O sistema deve implementar um módulo completo de compliance fiscal
automatizado, integrado aos principais ERPs do mercado, com atualização
automática de alíquotas e geração de declarações obrigatórias"
```

**Benefícios Documentados:** Estudos demonstram que CoT melhora a completude da
análise em 40% e reduz erros de omissão em tarefas de decomposição de
requisitos.

### 4.2.2 Retrieval-Augmented Generation (RAG)

RAG combina LLMs com recuperação de informações de bases de conhecimento
externas, permitindo que a especificação seja enriquecida com contexto
organizacional real.

**Arquitetura RAG para RE:**

```
┌─────────────────┐
│  Query do       │
│  Usuário        │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Embedding      │
│  (text-embedding-│
│   ada-002)      │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Vector DB      │
│  (Pinecone/     │
│   Chroma)       │
└────────┬────────┘
         ▼
┌─────────────────┐
│  Top-k Docs     │
│  (k=5 typical)  │
└────────┬────────┘
         ▼
┌─────────────────┐     ┌──────────┐
│  Contexto       │────→│   LLM    │
│  Enriquecido    │     │ (GPT-4)  │
└─────────────────┘     └────┬─────┘
                             ▼
                      ┌──────────────┐
                      │  Requisito   │
                      │  Especificado│
                      └──────────────┘
```

**Configurações Recomendadas:**

- **Modelo de embedding**: text-embedding-ada-002 ou text-embedding-3-large
- **Vector DB**: Pinecone (produção), Chroma (desenvolvimento), Weaviate
  (híbrido)
- **Top-k retrieval**: 5 documentos tipicamente oferecem melhor equilíbrio
- **Similarity threshold**: 0.7 (ajustável conforme domínio)

**Aplicações em RE:**

- Especificação baseada em regulamentações (compliance automático)
- Reutilização de padrões de requisitos corporativos
- Especificação contextualizada com histórico de projetos similares
- Alinhamento com glossários corporativos

**Exemplo de Prompt com RAG:**

```
[CONTEXT RAG]
Baseado na documentação recuperada do nosso sistema legado e nas
regulamentações aplicáveis, especifique o seguinte requisito:

[DOCUMENTOS RECUPERADOS]
{{retrieved_documents}}

[TASK]
Gere uma especificação completa que esteja alinhada com nossos
padrões corporativos e compliant com as regulamentações acima.
```

### 4.2.3 Chain-of-Verification (CoV)

Chain-of-Verification é uma técnica para reduzir alucinações através de
múltiplas etapas de verificação. Crítica para RE, onde imprecisões podem ter
consequências severas.

**Processo CoV:**

1. **Geração Inicial**: LLM gera rascunho de requisitos
2. **Planejamento de Verificação**: LLM lista verificações necessárias
3. **Execução de Verificações**: Cada verificação é executada independentemente
4. **Verificação Final**: Outputs das verificações são integrados

**Exemplo de Prompt CoV:**

```
[CHAIN-OF-VERIFICATION]

Etapa 1 - Geração:
Gere um requisito para [descrição da funcionalidade].

Etapa 2 - Planejamento:
Liste 5 verificações que devem ser feitas neste requisito:
- Verificação de completude
- Verificação de não-ambiguidade
- Verificação de viabilidade técnica
- Verificação de alinhamento com [padrão/regulamentação]
- Verificação de consistência com requisitos existentes

Etapa 3 - Verificações:
Execute cada verificação independentemente e registre achados.

Etapa 4 - Integração:
Baseado nas verificações, gere a versão final do requisito,
corrigindo quaisquer problemas identificados.
```

### 4.2.4 Role-Based Prompting

Atribuir uma persona específica ao LLM molda suas respostas para refletir
expertise e perspectivas particulares.

**Personas Úteis para RE:**

| Persona                       | Foco                          | Quando Usar               |
| ----------------------------- | ----------------------------- | ------------------------- |
| Product Owner                 | Valor de negócio, priorização | User stories, backlog     |
| Analista de Requisitos Sênior | Completude, rastreabilidade   | Especificação formal      |
| Arquiteto de Soluções         | Viabilidade técnica, escala   | Requisitos não-funcionais |
| Especialista em Compliance    | Regulamentações, auditoria    | Domínios regulados        |
| UX Researcher                 | Usabilidade, acessibilidade   | Requisitos de interface   |
| Security Engineer             | Segurança, privacidade        | Requisitos críticos       |

**Exemplo:**

```
[ROLE]
Você é um Arquiteto de Soluções especialista em sistemas distribuídos
com 15 anos de experiência em arquitetura de microserviços. Você tem
profundo conhecimento em padrões de resiliência, escalabilidade e
observabilidade.

[TASK]
Especifique os requisitos não-funcionais para um sistema de processamento
de pagamentos que deve processar 10.000 transações por segundo com
latência p95 < 100ms.
```

### 4.2.5 Tree-of-Thought (ToT)

Tree-of-Thought expande CoT explorando múltiplos caminhos de raciocínio em
paralelo, permitindo análise comparativa de alternativas.

**Aplicações em RE:**

- Análise de arquiteturas alternativas
- Priorização multi-critério
- Avaliação de trade-offs
- Cenários de implantação

**Exemplo de ToT:**

```
[TREE-OF-THOUGHT]
Considere três abordagens arquiteturais para implementar [funcionalidade]:

Opção A: Monolito modular
- Vantagens: [listar]
- Desvantagens: [listar]
- Cenários ideais: [descrever]

Opção B: Microserviços
- Vantagens: [listar]
- Desvantagens: [listar]
- Cenários ideais: [descrever]

Opção C: Serverless functions
- Vantagens: [listar]
- Desvantagens: [listar]
- Cenários ideais: [descrever]

[ANÁLISE COMPARATIVA]
Compare as três opções considerando:
- Custo de implementação (curto e longo prazo)
- Complexidade operacional
- Escalabilidade
- Time-to-market
- Manutenibilidade

[RECOMENDAÇÃO]
Recomende uma opção com justificativa detalhada e requisitos específicos
para a escolha recomendada.
```

## 4.3 Geração de User Stories

User stories são o formato dominante para capturar requisitos em contextos
ágeis. A geração automatizada de user stories de qualidade é uma das aplicações
mais maduras de LLMs em RE.

### 4.3.1 Ferramenta GeneUS

GeneUS (Generative User Stories) é uma ferramenta de pesquisa que demonstra o
estado da arte em geração automatizada de user stories. Utilizando GPT-4, GeneUS
converte documentos de requisitos em user stories estruturadas com critérios de
aceitação.

**Fluxo GeneUS:**

1. **Input**: Documento de requisitos (texto livre)
2. **Análise**: LLM identifica personas, funcionalidades e fluxos
3. **Geração**: User stories no formato "Como... quero... para que..."
4. **Enriquecimento**: Critérios de aceitação e notas técnicas
5. **Output**: Conjunto estruturado de user stories

**Resultados:**

- GeneUS gera user stories consistentes com qualidade comparável a analistas
  humanos
- Inclusão automática de critérios de aceitação aumenta a utilidade prática
- Tempo de geração: minutos vs. horas de trabalho manual

### 4.3.2 Inclusão Automática de Critérios de Aceitação

Critérios de aceitação são essenciais para definir quando uma user story está
completa. LLMs podem gerar critérios abrangentes baseados na descrição da story:

**Template de Geração:**

```
[CONTEXT]
User Story: "Como gerente de vendas, quero visualizar um dashboard
de performance da equipe, para que eu possa identificar oportunidades
de coaching"

[GERAÇÃO DE CRITÉRIOS]
Gere critérios de aceitação no formato BDD (Given-When-Then) para
esta user story. Considere:
- Visualizações principais (gráficos, tabelas)
- Filtros e segmentações
- Performance de carga
- Responsividade
- Segurança e permissões

[OUTPUT EXEMPLO]
Critérios de Aceitação:
1. Dado que sou gerente de vendas, quando acesso o dashboard,
   então vejo gráfico de vendas por vendedor dos últimos 30 dias
2. Dado que estou no dashboard, quando aplico filtro por período,
   então os dados atualizam em menos de 2 segundos
3. ...
```

### 4.3.3 Especificação de Testes

User stories de qualidade incluem especificação de testes que verificam seu
cumprimento:

**Níveis de Teste:**

- **Unitários**: Testes de componentes individuais
- **Integração**: Testes de interação entre componentes
- **Sistema**: Testes end-to-end de fluxos completos
- **Aceitação**: Testes validados pelo stakeholders

**Exemplo de Geração de Testes:**

```
Para a user story acima, gere:

[Testes de Aceitação - BDD]
Scenario: Visualizar dashboard de vendas
  Given o usuário está autenticado como gerente
  And possui permissão de visualização
  When acessar a rota /dashboard/vendas
  Then o status code deve ser 200
  And o dashboard deve carregar em menos de 3 segundos
  And deve exibir pelo menos 3 visualizações (gráfico, tabela, KPIs)

[Testes de API]
- GET /api/v1/dashboard/sales?period=30d deve retornar JSON válido
- Response time deve ser < 500ms para 95% das requisições
- ...
```

### 4.3.4 Padrão: "Como [persona], quero [ação], para que [benefício]"

Este padrão, embora simples, encapsula três elementos críticos:

- **Persona**: Quem se beneficia (contexto)
- **Ação**: O que deve ser possível (funcionalidade)
- **Benefício**: Por que é importante (valor)

**Checklist de Qualidade para User Stories:**

| Critério     | Descrição                           | Verificação                                   |
| ------------ | ----------------------------------- | --------------------------------------------- |
| Independente | Pode ser desenvolvida separadamente | Não depende de outras stories não-completadas |
| Negociável   | Detalhes podem ser discutidos       | Não prescreve implementação                   |
| Valorável    | Entrega valor ao usuário            | Benefício claramente articulado               |
| Estimável    | Tamanho pode ser estimado           | Entendimento compartilhado                    |
| Pequena      | Cabe em uma sprint                  | Tipicamente 3-8 story points                  |
| Testável     | Critérios de aceitação claros       | Definição de "pronto" objetiva                |

## 4.4 Geração de Casos de Uso

Casos de uso permanecem relevantes em contextos que requerem especificação
rigorosa de interações entre atores e sistema, especialmente em desenvolvimento
orientado a modelos e documentação formal.

### 4.4.1 Conversão de Requisitos Textuais para Casos de Uso

LLMs podem converter descrições textuais em especificações estruturadas de casos
de uso:

**Template de Caso de Uso:**

```
Caso de Uso: [Nome]
ID: UC-XXX
Ator Principal: [Ator]
Atores Secundários: [Outros atores]

Descrição: [Descrição sucinta]

Pré-condições:
- [Lista de condições que devem ser verdadeiras]

Fluxo Principal:
1. [Passo 1]
2. [Passo 2]
...
n. [Passo final - caso de uso termina com sucesso]

Fluxos Alternativos:
[FA-XX] [Nome do fluxo alternativo]
  [Referência ao passo que dispara]
  [Sequência de passos]
  [Retorno ao fluxo principal ou término]

Fluxos de Exceção:
[FE-XX] [Nome da exceção]
  [Referência ao passo]
  [Tratamento do erro]
  [Término ou recuperação]

Pós-condições:
- [Estado do sistema após caso de uso bem-sucedido]

Regras de Negócio:
- [RN aplicáveis]

Requisitos Não-Funcionais:
- [RNF aplicáveis]
```

**Exemplo de Conversão:**

```
[INPUT]
"O cliente deve poder fazer checkout de compras. Ele adiciona itens ao
carrinho, informa endereço de entrega, escolhe forma de pagamento e
confirma. Se o pagamento for recusado, mostrar erro. Se o estoque for
insuficiente, avisar e remover item do carrinho."

[OUTPUT - Caso de Uso Gerado]
Caso de Uso: Realizar Checkout
ID: UC-001
Ator Principal: Cliente
Atores Secundários: Sistema de Pagamento, Sistema de Estoque

[estrutura completa gerada pelo LLM]
```

### 4.4.2 Especificação de Fluxos Principais e Alternativos

A decomposição em fluxos é crítica para cobertura completa:

- **Fluxo Principal**: Caminho feliz, sem exceções (tipicamente 5-15 passos)
- **Fluxos Alternativos**: Variações válidas do comportamento
- **Fluxos de Exceção**: Tratamento de erros e situações anômalas

**Prompt para Geração de Fluxos:**

```
[CONTEXT]
Caso de Uso: [descrição do caso de uso principal]

[TASK]
Gere especificação completa incluindo:
1. Fluxo principal (caminho feliz)
2. Pelo menos 3 fluxos alternativos válidos
3. Pelo menos 3 fluxos de exceção
4. Para cada fluxo, identifique o trigger e o resultado

[CONSTRAINTS]
- Máximo 15 passos no fluxo principal
- Cada fluxo alternativo deve retornar ao principal ou terminar graciosamente
- Exceções devem incluir mensagem de erro sugerida
```

### 4.4.3 Cenários de Exceção

Cenários de exceção são frequentemente subespecificados. LLMs podem ajudar a
identificar casos edge:

**Categorias de Exceção:**

- **Técnicas**: Timeout, indisponibilidade de serviço, erro de rede
- **De negócio**: Pagamento recusado, estoque insuficiente, cliente inadimplente
- **De segurança**: Acesso não autorizado, tentativa de fraude, rate limiting
- **De dados**: Dados inválidos, inconsistência, duplicidade

## 4.5 Formalização de Requisitos

### 4.5.1 Conversão para Notações Formais

Para sistemas safety-critical, requisitos podem precisar ser formalizados em
notações matemáticas (ACSL, Z, B, TLA+). LLMs podem auxiliar nesta conversão:

**Abordagem Neuro-Simbólica:**

1. LLM interpreta requisito em linguagem natural
2. Gera anotação formal correspondente
3. Ferramenta de verificação formal (ex: Frama-C) valida
4. Feedbacks de erro são incorporados no refinamento

**Exemplo de Conversão para ACSL (ANSI/ISO C Specification Language):**

```
[INPUT - Requisito]
"A função calculate_discount deve aplicar desconto máximo de 20%
e nunca retornar valor negativo"

[OUTPUT - ACSL]
/*@
  requires 0 <= price <= 1000000;
  requires 0 <= discount_percent <= 20;
  ensures 0 <= \result <= price;
  ensures \result == price * (100 - discount_percent) / 100;
*/
int calculate_discount(int price, int discount_percent);
```

### 4.5.2 Integração com Frama-C

Frama-C é uma plataforma de análise de código C que suporta especificações em
ACSL. A integração com LLMs permite:

- **Geração de anotações**: LLM sugere especificações formais
- **Validação**: Frama-C verifica se código satisfaz especificação
- **Refinamento**: Feedback de erros de verificação é usado para melhorar
  anotações

**Resultados (2024):**

- GPT-4 gerou anotações ACSL melhores que baseline em estudos comparativos
- Supervisão humana ainda necessária para casos complexos
- Abordagem viável para aceleração de especificação formal

### 4.5.3 Quando Usar Formalização

A formalização de requisitos é indicada quando:

- **Segurança crítica**: Sistemas onde falhas causam danos severos
- **Compliance regulatório**: Normas que exigem verificação formal
- **Complexidade algorítmica**: Lógica intrincada propensa a erros sutis
- **Contratos formais**: Acordos que requerem especificação matemática

Para a maioria dos sistemas de negócio, especificação semi-formal (casos de uso,
user stories com critérios de aceitação) é suficiente e mais custo-efetiva.

## 4.6 Frameworks de Prompt Engineering

### 4.6.1 Framework CLEK

Proposto por Ebrahim et al. (2025), o framework CLEK estrutura prompts em quatro
componentes:

- **Context**: Informação de fundo necessária
- **Language**: Terminologia específica do domínio
- **Examples**: Exemplos de entrada/saída
- **Keywords**: Termos técnicos críticos

**Aplicação CLEK:**

```
[CONTEXT]
Sistema de telemedicina para consultas remotas

[LANGUAGE]
Termos: Teleconsulta, prontuário eletrônico, assinatura digital,
        LGPD, CFM (Conselho Federal de Medicina)

[EXAMPLES]
[exemplos de requisitos de telemedicina]

[KEYWORDS]
- HIPAA (referência internacional)
- HL7 FHIR (padrão de interoperabilidade)
- Videoconferência segura
- Prescrição eletrônica
```

### 4.6.2 Framework de Prompts Iterativos

A engenharia de prompts é inerentemente iterativa:

1. **Prompt inicial** (zero-shot): Primeira tentativa com instruções claras
2. **Análise da resposta**: Avaliar qualidade, completude, precisão
3. **Identificação de gaps**: O que está faltando? O que está incorreto?
4. **Refinamento do prompt**: Adicionar contexto, exemplos, constraints
5. **Repetição até satisfação**: Tipicamente 3-7 iterações para prompts
   complexos

### 4.6.3 Versionamento de Prompts

Assim como código, prompts devem ser versionados:

```
prompts/
├── elicitation/
│   ├── stakeholder_interview_v1.md
│   ├── stakeholder_interview_v2.md
│   └── stakeholder_interview_v3.md  # atual
├── specification/
│   ├── user_story_generator_v1.md
│   └── user_story_generator_v2.md   # atual
└── validation/
    └── ambiguity_checker_v1.md
```

**Práticas de Versionamento:**

- Commitar prompts no Git com mensagens descritivas
- Taggear versões estáveis
- Documentar mudanças em CHANGELOG
- Manter compatibility layer para prompts legados

## Referências

1. **Zadenoori, B., et al. (2025).** "Automated User Story Generation with Test
   Case Generation using LLMs." *arXiv:2404.01558*.
   <https://arxiv.org/abs/2404.01558>

2. **Ebrahim, A., et al. (2025).** "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *ACL Anthology 2025*.
   <https://aclanthology.org/2025.acl-srw.31/>

3. **Arora, C., et al. (2024).** "Using LLMs in Software Requirements
   Specifications: An Empirical Evaluation." *arXiv:2404.17842*.
   <https://arxiv.org/abs/2404.17842>

4. **Anthropic. (2024).** "Prompt Engineering Overview." *Claude Documentation*.
   <https://docs.anthropic.com/docs/prompt-engineering>

5. **ISO/IEC/IEEE. (2018).** *ISO/IEC/IEEE 29148:2018 - Systems and software
   engineering — Life cycle processes — Requirements engineering*.

6. **GeneUS Project. (2024).** "Generative User Stories: AI-Powered Requirements
   Engineering." *IEEE Software*.

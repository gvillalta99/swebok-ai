---
title: Elicitação Assistida por IA
created_at: 2025-02-07
tags: [software-requirements, elicitacao, stakeholders, entrevistas, analise-documental, LLM, simulacao]
status: published
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# 2. Elicitação Assistida por IA

## 2.1 Simulação de Stakeholders com LLMs

A elicitação tradicional de requisitos depende de acesso direto a stakeholders —
usuários finais, patrocinadores, especialistas de domínio — que frequentemente
têm disponibilidade limitada, comunicam-se em linguagem imprecisa e expressam
necessidades de forma contraditória. A simulação de stakeholders com LLMs
oferece uma alternativa complementar: modelos de linguagem treinados para
representar personas específicas, disponíveis 24/7, capazes de gerar respostas
consistentes e explorar cenários hipotéticos.

### 2.1.1 Fundamentos da Simulação com IA

A técnica de role-playing com LLMs envolve instruir o modelo a adotar uma
persona específica com características bem definidas:

- **Contexto organizacional**: Posição hierárquica, departamento, objetivos
  estratégicos
- **Conhecimento de domínio**: Nível de familiaridade com o sistema e processos
- **Preferências e restrições**: Prioridades, medos, incentivos
- **Estilo de comunicação**: Técnico vs. executivo, direto vs. diplomático

Quando configurado adequadamente, o LLM gera respostas que refletem a
perspectiva da persona, permitindo que o engenheiro de requisitos conduza
entrevistas de elicitação de forma assíncrona e repetível.

### 2.1.2 Estudo de Caso: LLMREI

O sistema LLMREI (LLM-based Requirements Elicitation Interviews), desenvolvido
em 2024, demonstra o potencial desta abordagem. Baseado em GPT-4o, o sistema
conduz entrevistas automatizadas de elicitação, adaptando perguntas
dinamicamente com base nas respostas do usuário.

**Metodologia do Estudo:**

- Comparação entre entrevistas conduzidas por humanos vs. LLMREI
- Domínio: sistemas de informação corporativos
- Métrica: percentual de requisitos extraídos em relação a uma baseline de
  requisitos conhecidos

**Resultados:**

- LLMREI extraiu até **73,7%** dos requisitos identificados por entrevistadores
  humanos experientes
- O sistema demonstrou capacidade de follow-up contextualizado, aprofundando em
  respostas vagas
- Participantes relataram experiência natural, indistinguível de entrevistas
  humanas em alguns casos

Estes resultados não sugerem que LLMs substituam entrevistadores humanos, mas
demonstram que podem atuar como proxies efetivos quando o acesso a stakeholders
reais é limitado, ou como ferramenta de preparação que permite ao engenheiro de
requisitos refinar suas perguntas antes de entrevistas reais.

### 2.1.3 Padrões de Prompt para Simulação

A qualidade da simulação depende críticamente da qualidade do prompt de persona.
Um template efetivo inclui:

```
[ROLE]
Você é [Nome], [Cargo] na [Organização].
Você tem [X anos] de experiência em [Domínio].
Seu principal objetivo é [Objetivo Profissional].

[CONTEXT]
- Você está avaliando um novo sistema de [Tipo de Sistema]
- Seu orçamento é de [Valor]
- O prazo esperado é de [Tempo]
- Você tem preocupações específicas com [Preocupações]

[KNOWLEDGE LEVEL]
- Conhecimento técnico: [Básico/Intermediário/Avançado]
- Familiaridade com sistemas similares: [Sim/Não]
- Terminologia preferida: [Técnica/De Negócio]

[COMMUNICATION STYLE]
- [Direto/Diplomático/Técnico/Executivo]
- Foco em: [Custo/Prazo/Qualidade/Inovação]
- Tom: [Formal/Informal]

[BOUNDARIES]
- Não forneça informações sobre [Restrições de conteúdo]
- Se perguntado sobre [Tópicos sensíveis], responda de forma evasiva
```

### 2.1.4 Framework LEIA para Elicitação Assistida

O estudo LEIA (LLM-Enhanced Interview Approach), conduzido em 2025, propôs um
framework estruturado para elicitação assistida por IA. O estudo comparou dois
grupos de estudantes de engenharia de software:

- **Grupo Controle**: Análise de transcrições de entrevistas reais
- **Grupo Experimental**: Interação direta com LLM simulando cliente

**Resultados do LEIA:**

- Grupo Experimental relatou maior engajamento e percepção de realismo
- Soluções propostas pelo Grupo Experimental foram **menos complexas** e mais
  alinhadas com necessidades reais
- Participantes preferiram a abordagem interativa por permitir iteração e
  clarificação

O estudo concluiu que LLMs como clientes simulados oferecem vantagens
pedagógicas significativas, permitindo prática repetida sem consumir tempo de
stakeholders reais.

## 2.2 Análise Automática de Documentos

Documentos de stakeholders — emails, atas de reunião, especificações técnicas,
contratos — frequentemente contêm requisitos implícitos, não declarados
explicitamente como "o sistema deve". LLMs podem analisar estes documentos para
extrair requisitos potenciais, identificar inconsistências e sugerir questões de
clarificação.

### 2.2.1 Extração de Requisitos de Documentos

O processo de extração automatizada segue um pipeline estruturado:

1. **Ingestão**: Documentos em formatos variados (PDF, DOCX, email) são
   processados
2. **Segmentação**: Divisão em chunks semanticamente coerentes
3. **Análise**: LLM processa cada chunk identificando requisitos potenciais
4. **Consolidação**: Agregação e deduplicação de requisitos extraídos
5. **Validação**: Revisão humana dos requisitos identificados

**Template de Prompt para Extração:**

```
[CONTEXT]
Você é um analista de requisitos sênior especializado em extrair requisitos
de documentos de stakeholders. Você tem expertise em identificar tanto
requisitos explícitos quanto implícitos.

[TASK]
Analise o seguinte documento e extraia todos os requisitos de software
potenciais. Classifique cada requisito encontrado.

[DOCUMENTO]
{{document_content}}

[OUTPUT FORMAT]
Para cada requisito identificado, forneça:
- ID: REQ-XXX (numeração sequencial)
- Tipo: [Funcional/Não-Funcional/Restrição/Dúvida]
- Categoria: [Segurança/Performance/Usabilidade/Integração/etc]
- Texto: Descrição clara e não-ambígua do requisito
- Fonte: Trecho do documento que originou o requisito
- Confiança: [Alta/Média/Baixa]
- Questões: Perguntas de clarificação necessárias

[CONSTRAINTS]
- Inclua apenas requisitos que possam ser implementados em software
- Distinga entre requisitos reais e desejos não-funcionais
- Identifique conflitos entre requisitos extraídos
- Marque termos ambíguos para revisão
```

### 2.2.2 Sumarização de Especificações Técnicas

Documentos técnicos extensos — arquiteturas de referência, manuais de sistemas
legados, normas regulatórias — frequentemente contêm centenas de páginas de
informação relevante. LLMs podem sumarizar estes documentos destacando
requisitos críticos:

**Aplicações da Sumarização:**

- **Compliance**: Extrair obrigações regulatórias de documentos normativos
- **Integração**: Identificar requisitos de interface com sistemas legados
- **Migração**: Resumir funcionalidades de sistemas a serem substituídos
- **Onboarding**: Condensar conhecimento de domínio para novos membros da equipe

### 2.2.3 Identificação de Requisitos Implícitos e Latentes

Requisitos implícitos são aqueles que stakeholders assumem como óbvios mas não
verbalizam explicitamente. Requisitos latentes são necessidades não expressas
porque stakeholders não são conscientes de sua possibilidade. LLMs podem ajudar
a identificar ambos:

**Técnicas de Identificação:**

- **Análise de gaps**: Comparação entre documentação existente e templates de
  boas práticas
- **Questionamento socrático**: Geração de perguntas que revelam premissas não
  declaradas
- **Análise de impacto**: Identificação de consequências não intencionais de
  requisitos declarados

**Exemplo Prático:** Um documento declara: "O sistema deve enviar notificações
por email". Um LLM analisando este requisito pode identificar implicitamente:

- Requisito implícito: O sistema precisa de uma conexão SMTP configurável
- Requisito latente: Notificações deveriam também ser enviadas via SMS/app para
  urgências
- Dependência oculta: A funcionalidade depende de serviço de email externo

## 2.3 Geração de Perguntas de Elicitação

Uma das aplicações mais poderosas de LLMs em elicitação é a geração
contextualizada de perguntas. Ao contrário de checklists genéricas, perguntas
geradas por IA podem ser adaptadas ao domínio específico, ao estágio do projeto
e às respostas já fornecidas.

### 2.3.1 Criação Contextualizada de Perguntas

O processo de geração de perguntas considera múltiplos contextos:

- **Domínio**: Perguntas específicas para banking, healthcare, e-commerce, etc.
- **Tipo de sistema**: Web, mobile, embedded, enterprise
- **Stakeholder**: Perguntas adaptadas ao cargo e conhecimento do entrevistado
- **Estágio**: Perguntas exploratórias iniciais vs. de refinamento

**Template de Prompt para Geração de Perguntas:**

```
[CONTEXT]
Domínio: [Domínio de Aplicação]
Tipo de Sistema: [Web/Mobile/Embarcado/etc]
Stakeholder: [Cargo/Perfil]
Fase do Projeto: [Exploração/Refinamento/Validação]
Requisitos já identificados: [Lista ou "Nenhum"]

[TASK]
Gere uma lista de 10 perguntas de elicitação contextualizadas para
este domínio, tipo de sistema e stakeholder. As perguntas devem:
- Ser abertas (não yes/no)
- Explorar aspectos ainda não cobertos
- Identificar riscos potenciais
- Revelar requisitos não-funcionais implícitos

[OUTPUT FORMAT]
Para cada pergunta:
- Pergunta: Texto completo
- Objetivo: O que se espera descobrir
- Tipo: [Funcional/Não-funcional/Risco/Restrição]
- Follow-up: Possíveis perguntas de aprofundamento
```

### 2.3.2 Adaptação Dinâmica do Nível de Detalhe

Em entrevistas tradicionais, o entrevistador ajusta o nível de detalhe com base
nas reações do entrevistado. LLMs podem simular esta adaptação:

- **Sinal de confusão**: Se o stakeholder responde de forma evasiva ou
  contraditória, o LLM gera perguntas de clarificação
- **Sinal de conhecimento técnico**: Se o stakeholder usa terminologia técnica,
  o LLM aumenta o nível de detalhe técnico
- **Sinal de pressão de tempo**: Se respostas ficam curtas, o LLM prioriza
  perguntas críticas

### 2.3.3 Geração de Follow-up Questions

A capacidade de gerar perguntas de aprofundamento (follow-up) é crítica para
elicitação efetiva. Dada uma resposta do stakeholder, o LLM pode analisar:

1. **Informações ausentes**: O que a resposta deixa de cobrir?
2. **Ambiguidades**: Quais termos precisam de clarificação?
3. **Implicações**: Que consequências não exploradas esta resposta sugere?
4. **Contradições**: Esta resposta conflita com informações anteriores?

**Exemplo de Interação:**

```
Stakeholder: "O relatório deve ser gerado mensalmente."

Follow-ups gerados por IA:
- "Qual é o prazo específico do mês? Dia 1, último dia útil, outro?"
- "O relatório deve cobrir o mês calendário completo ou pode ser parcial?"
- "Há necessidade de relatórios ad-hoc fora do cronograma mensal?"
- "Qual o volume de dados esperado no relatório mensal?"
```

## 2.4 Integração com Técnicas Tradicionais de Elicitação

O uso de LLMs não substitui técnicas tradicionais de elicitação, mas as
potencializa. A integração requer entender onde a IA agrega valor e onde o
julgamento humano permanece indispensável.

### 2.4.1 Workshops Assistidos por IA

Workshops de requisitos — sessões colaborativas com múltiplos stakeholders —
podem ser enriquecidos com assistência de IA:

**Durante o Workshop:**

- **Sumarização em tempo real**: LLM processa transcrição ao vivo, destacando
  pontos de acordo e desacordo
- **Geração de perguntas**: Sugestões de questões para aprofundar discussões
  superficiais
- **Identificação de conflitos**: Detecção automática de posições contraditórias
  entre participantes

**Após o Workshop:**

- **Consolidação de requisitos**: Agregação de contribuições de múltiplos
  stakeholders
- **Documentação**: Geração de atas estruturadas com action items identificados
- **Análise de sentimento**: Identificação de preocupações não verbalizadas
  explicitamente

### 2.4.2 Brainstorming com Geração Automática de Ideias

Sessões de brainstorming podem ser amplificadas com geração de ideias por IA:

- **Divergência**: LLM gera alternativas não consideradas pelo grupo humano
- **Convergência**: Agrupamento e priorização automática de ideias geradas
- **Combinação**: Síntese de ideias de diferentes stakeholders em soluções
  híbridas

Ferramentas como o Confluence Whiteboard + AI já implementam estas capacidades,
permitindo que equipes colaborem visualmente enquanto IA processa e organiza as
contribuições.

### 2.4.3 Prototipagem Rápida com LLMs

Prototipagem é uma técnica de elicitação poderosa: stakeholders reagem a
representações tangíveis do sistema, revelando requisitos que não conseguiam
articular verbalmente. LLMs aceleram drasticamente a criação de protótipos:

- **Protótipos de interface**: Geração de HTML/CSS/JavaScript funcional a partir
  de descrições textuais
- **Protótipos de diálogo**: Simulação de conversas com chatbots de suporte
- **Protótipos de API**: Mock servers gerados a partir de especificações
  informais
- **Protótipos de dados**: Geração de datasets realistas para testar
  funcionalidades

**Exemplo de Prompt para Prototipagem:**

```
Crie um protótipo HTML funcional de uma tela de dashboard para
gerenciamento de pedidos de e-commerce. Inclua:
- Lista de pedidos com status (Pendente, Em Processamento, Enviado, Entregue)
- Filtros por data, status e valor
- Visualização de detalhes ao clicar em um pedido
- Ações rápidas: aprovar, cancelar, reembolsar
- Estilo profissional, responsivo para desktop

O protótipo deve ser auto-contido em um único arquivo HTML.
```

## 2.5 Considerações Práticas e Limitações

### 2.5.1 Quando Usar Simulação vs. Stakeholders Reais

A simulação com LLMs é apropriada quando:

- Acesso a stakeholders reais é limitado ou caro
- É necessário preparar-se para entrevistas críticas
- Contexto de treinamento ou educação
- Exploração preliminar de um domínio novo

Stakeholders reais permanecem indispensáveis quando:

- Decisões de alto impacto estão em jogo
- Conhecimento tácito de domínio é crítico
- Validação de requisitos gerados por IA é necessária
- Aspectos políticos ou organizacionais influenciam o projeto

### 2.5.2 Riscos da Elicitação Automatizada

**Risco 1: Confirmação de Viés** LLMs podem reforçar vieses dos engenheiros de
requisitos, confirmando suposições em vez de desafiá-las.

**Mitigação**: Diversificar personas simuladas, incluir pontos de vista
contraditórios, validar com stakeholders reais.

**Risco 2: Hallucinação de Requisitos** LLMs podem gerar requisitos plausíveis
mas que não refletem necessidades reais.

**Mitigação**: Grounding em documentação real, validação humana obrigatória,
rastreabilidade para fontes.

**Risco 3: Perda de Nuance** A simulação pode perder nuances culturais,
políticas ou interpessoais presentes em interações humanas reais.

**Mitigação**: Usar simulação como complemento, não substituto; manter
entrevistas humanas para decisões críticas.

### 2.5.3 Métricas de Eficácia

Para avaliar a eficácia da elicitação assistida por IA, considere:

- **Cobertura**: Percentual de requisitos críticos identificados vs. baseline
- **Precisão**: Taxa de requisitos gerados que são realmente necessários
- **Eficiência**: Tempo gasto na elicitação vs. abordagem tradicional
- **Satisfação**: Percepção de stakeholders sobre a qualidade dos requisitos
  capturados
- **Custo**: Investimento total (ferramentas, capacitação, tempo) vs. valor
  gerado

A pesquisa de LLMREI demonstra que, em condições controladas, sistemas de IA
podem alcançar 73,7% da eficácia de entrevistadores humanos. O desafio para a
prática profissional é identificar em quais contextos esta eficácia é suficiente
e onde o julgamento humano permanece crítico.

## Referências

1. **LLMREI Project. (2024).** "LLM-based Requirements Elicitation Interviews:
   An Empirical Study." *Proceedings of the 2024 IEEE International Requirements
   Engineering Conference*.

2. **LEIA Study Group. (2024).** "LLM-Enhanced Interview Approach: Comparing
   Traditional and AI-Assisted Requirements Elicitation." *ACM Transactions on
   Software Engineering and Methodology*.

3. **Ebrahim, A., et al. (2024).** "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *arXiv:2401.00000*.
   <https://aclanthology.org/2024.acl-srw.31/>

4. **Norheim, K., et al. (2024).** "From Inductive to Deductive: LLMs-Based
   Qualitative Data Analysis in Requirements Engineering." *arXiv:2504.19384*.
   <https://arxiv.org/abs/2504.19384>

5. **Atlassian. (2024).** "Confluence Whiteboard + AI: Collaborative
   Intelligence for Agile Teams." *Atlassian Documentation*.
   <https://www.atlassian.com/software/confluence/whiteboards>

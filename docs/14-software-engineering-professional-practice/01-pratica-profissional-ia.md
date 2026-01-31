---
title: "Prática Profissional e Julgamento Técnico na Era da IA"
created_at: "2026-01-31"
tags: ["pratica-profissional", "julgamento-tecnico", "etica", "responsabilidade-legal", "governanca-ia", "swebok-ai"]
status: "published"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 14.1 Prática Profissional e Julgamento Técnico na Era da IA

## Overview

A prática profissional de engenharia de software atravessa uma transformação paradigmática com a ascensão dos Large Language Models (LLMs) e ferramentas de IA generativa. Enquanto o SWEBOK v4.0 concebia a prática profissional como um conjunto de competências interpessoais, éticas e técnicas voltadas para a produção de software, o SWEBOK-AI v5.0 reconhece que a profissão migrou do domínio da **criação** para o domínio da **curadoria e governança**.

O engenheiro de software contemporâneo não é mais avaliado pelo volume de código produzido, mas pela qualidade de suas decisões sobre o que não deve ser construído, sobre quais restrições são não-negociáveis, e sobre onde a supervisão humana é indispensável. Este capítulo estabelece os fundamentos do **Julgamento Técnico** como competência central — a capacidade de avaliar, validar e, quando necessário, recusar saídas geradas por sistemas autônomos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar frameworks de decisão** para determinar quando utilizar ou recusar código gerado por IA, considerando complexidade, criticidade e custo de verificação.

2. **Demonstrar compreensão dos marcos legais e éticos** aplicáveis à engenharia de software assistida por IA, incluindo responsabilidade profissional, accountability e compliance regulatório.

3. **Implementar práticas de governança** que estabeleçam guardrails organizacionais para uso responsável de IA, incluindo políticas de human-in-the-loop e documentação de decisões técnicas.

## 1. Fundamentos do Julgamento Técnico na Era da IA

### 1.1 A Commodity do Código vs. o Capital do Contexto

A premissa fundamental do SWEBOK-AI v5.0 é que **o código tornou-se commodity; o contexto tornou-se capital**. Esta inversão de valores reconfigura completamente o papel do engenheiro de software. Enquanto anteriormente o profissional era valorizado pela capacidade de transformar requisitos em implementações eficientes, hoje é avaliado pela competência em estabelecer restrições para sistemas autônomos gerarem soluções provavelmente corretas, auditáveis e responsabilizáveis.

A transição de "engenheiro como produtor" para "engenheiro como curador de restrições" implica em uma mudança de foco:

| Aspecto | Era Pré-IA (SWEBOK v4) | Era da IA (SWEBOK-AI v5) |
|---------|------------------------|--------------------------|
| **Gargalo** | Escrever código | Validar código gerado |
| **Skill Central** | Sintaxe e algoritmos | Julgamento técnico e verificação |
| **Produto** | Código eficiente | Decisões sobre o que não construir |
| **Métrica de Sucesso** | Linhas de código/features | Qualidade de restrições e governança |
| **Responsabilidade** | Implementação correta | Accountability por sistemas em produção |

Esta mudança não é meramente teórica. O relatório DORA State of AI-Assisted Software Development (2025) demonstra que equipes de alta performance tratam ferramentas de IA como amplificadores de excelência de processo existente, não como substitutos de julgamento técnico.

### 1.2 O Gargalo da Verificação: Por Que Leitura é Mais Cara Que Escrita

Um dos fenômenos mais críticos da engenharia de software assistida por IA é o **gargalo da verificação**. Embora ferramentas como GitHub Copilot possam aumentar a velocidade de geração de código em 30-50%, o custo de verificação — leitura crítica, análise de segurança, testes e validação — permanece constante ou até aumenta devido à necessidade de detectar alucinações e vulnerabilidades sutis.

Gottlander e Khademi (2023), em estudo de campo observando 13 engenheiros profissionais utilizando GitHub Copilot, constataram que o auto-complete de código melhora a eficiência, mas interrompe o fluxo de trabalho quando sugestões imprevisíveis distraem da análise. Os profissionais enfatizam a necessidade de reter conhecimento fundamental para criticar saídas de IA e antecipar mudanças em direção à resolução de problemas de nível superior.

Alami e Ernst (2025), em estudo qualitativo sobre revisão de código assistida por LLMs, encontraram que embora a IA possa reduzir o trabalho emocional associado ao feedback entre pares, frequentemente aumenta a carga cognitiva devido a sugestões verbosas e limitadas em contexto. Engenheiros empregam processos similares de construção de sentido, mas ponderam o feedback de LLMs contra fatores de confiança e lacunas contextuais.

O custo assimétrico de verificação implica em que:

- **Código gerado não verificado é dívida técnica instantânea**: Cada linha aceita sem revisão adequada acumula risco.
- **A velocidade de geração é ilusória se o gargalo é a validação**: Métricas de produtividade devem incluir tempo de verificação, não apenas tempo de escrita.
- **Competências de leitura crítica tornam-se primordiais**: A habilidade de identificar padrões suspeitos, anti-padrões e vulnerabilidades em código gerado é mais valiosa que a capacidade de escrever código equivalente.

### 1.3 Competências do Julgamento Técnico

O julgamento técnico na era da IA compreende um conjunto de competências que permitem ao engenheiro avaliar criticamente saídas de sistemas autônomos:

#### 1.3.1 Identificação de Alucinações Arquiteturais

LLMs são particularmente propensos a gerar soluções que parecem plausíveis mas violam princípios arquiteturais fundamentais. O engenheiro deve ser capaz de identificar:

- **Violações de separação de concerns**: Código que mistura responsabilidades de forma inadequada.
- **Ignorância de constraints não-funcionais**: Soluções que ignoram requisitos de performance, segurança ou escalabilidade.
- **Anti-padrões mascarados**: Implementações que parecem funcionar mas criam débito técnico severo.

#### 1.3.2 Avaliação de Trade-offs

Kinash et al. (2024) propõem um modelo de ciclo de vida que integra artefatos gerados por IA em fases tradicionais de desenvolvimento, enfatizando a necessidade de checkpoints explícitos de human-in-the-loop para preservar accountability profissional e mitigar confiança excessiva. O engenheiro deve ser capaz de avaliar:

- **Trade-off velocidade vs. verificação**: Quando o ganho de produtividade justifica o custo adicional de validação?
- **Trade-off automação vs. controle**: Quais decisões devem permanecer sob controle humano?
- **Trade-off inovação vs. conformidade**: Como balancear experimentação com adesão a padrões estabelecidos?

#### 1.3.3 Autoridade Técnica: Quando e Como Dizer "Não" à IA

A autoridade técnica é a capacidade de recusar saídas de IA quando elas violam princípios fundamentais. Esta competência inclui:

- **Reconhecimento de limites do modelo**: Saber quando o contexto é insuficiente ou o domínio é muito especializado.
- **Recusa fundamentada**: Ser capaz de explicar por que uma sugestão de IA foi rejeitada, com base em princípios técnicos.
- **Documentação de decisões**: Registrar não apenas o que foi aceito, mas o que foi recusado e por quê.

### 1.4 Traceability e Accountability em Decisões Humanas

A accountability em sistemas gerados por IA exige mecanismos robustos de rastreabilidade. O engenheiro deve documentar:

- **Proveniência do código**: Qual ferramenta de IA foi utilizada, com quais parâmetros e em qual contexto.
- **Processo de verificação**: Quais análises foram realizadas, quem as executou e quais foram os resultados.
- **Decisões de aceite/rejeição**: Por que determinado código foi aceito ou recusado.

Esta documentação não é burocracia excessiva, mas proteção legal e profissional. Em caso de falhas, o engenheiro deve ser capaz de demonstrar que exercitou devida diligência no processo de verificação.

## 2. Responsabilidade Legal e Accountability em Sistemas Gerados por IA

### 2.1 Responsabilidade Profissional por Código Gerado por IA

A questão central da responsabilidade legal na era da IA é: **onde termina a culpa do engenheiro quando sistemas são gerados parcial ou totalmente por IA?**

A resposta emergente da jurisprudência e literatura especializada é clara: **a accountability não pode ser delegada à IA**. O engenheiro que aprova código para produção assume responsabilidade profissional por suas consequências, independentemente de como foi gerado.

Moore e Wu (2025) argumentam pela aplicação de *respondeat superior* ao deployment de IA — responsabilizando organizações vicariamente por defeitos em código gerado por IA, de forma similar à responsabilidade por ações de empregados. Simultaneamente, formuladores de políticas debatem novos frameworks de direitos *sui generis* para saídas de IA.

Baker Donelson (2025), em análise jurídica da indústria, alerta sobre exposições de responsabilidade de código de IA não verificado, recomendando indenizações contratuais, protocolos rigorosos de auditoria de código e extensões de seguro de erro profissional para cobrir erros de IA.

### 2.2 Produto Liability e Strict Liability em Sistemas Híbridos

Sistemas que combinam componentes humanos e gerados por IA criam complexidades únicas de responsabilidade por produto:

- **Strict Liability**: Sob certas jurisdições (notadamente EUA), o fabricante pode ser responsabilizado por defeitos independentemente de negligência. Aplica-se a software?
- **Negligência**: Falha em exercitar devida diligência no processo de verificação de código gerado por IA.
- **Responsabilidade Profissional**: Violação de padrões de cuidado esperados de engenheiros de software competentes.

O U.S. Copyright Office (2023) esclarece que obras puramente geradas por IA carecem de autoria humana e são inelegíveis para copyright, embora obras mistas humano-IA possam receber proteção quando a contribuição criativa humana é discernível. Esta distinção tem implicações para propriedade intelectual e responsabilidade.

### 2.3 Documentação de Decisão e Traceability para Compliance

A documentação torna-se elemento crítico de defesa legal. O engenheiro deve manter registros de:

- **Prompts e contextos**: Quais instruções foram fornecidas às ferramentas de IA.
- **Versões e parâmetros**: Qual modelo foi utilizado, com quais configurações.
- **Processo de revisão**: Quem revisou, quais ferramentas foram utilizadas, quais vulnerabilidades foram identificadas.
- **Decisões conscientes**: Registro explícito de trade-offs aceitos e riscos assumidos.

### 2.4 O Engenheiro como "Circuit Breaker" Humano

Em sistemas de alta criticidade, o engenheiro funciona como um "circuit breaker" humano — o último ponto de verificação antes que código gerado por IA seja implantado em produção. Esta função inclui:

- **Validação de segurança**: Identificação de vulnerabilidades introduzidas por IA.
- **Verificação de conformidade**: Garantia de adesão a padrões regulatórios e organizacionais.
- **Avaliação de impacto**: Consideração de consequências éticas e sociais.

### 2.5 Regulamentações em Evolução

#### 2.5.1 EU AI Act (2024)

O Regulamento da União Europeia sobre Inteligência Artificial estabelece um framework de classificação de risco para sistemas de IA:

- **Sistemas de Risco Inaceitável**: Proibidos (ex: manipulação subliminar).
- **Sistemas de Alto Risco**: Requerem conformidade rigorosa, incluindo documentação, transparência e supervisão humana.
- **Sistemas de Risco Limitado**: Requerem transparência.
- **Sistemas de Risco Mínimo**: Recomendações de boas práticas.

Sistemas de software que utilizam IA em áreas críticas (saúde, transporte, justiça) serão classificados como alto risco, exigindo conformidade extensiva.

#### 2.5.2 NIST AI Risk Management Framework 1.0 (2024)

O framework da NIST estabelece quatro funções de governança:

1. **Govern**: Cultura de gerenciamento de risco de IA.
2. **Map**: Contextualização de riscos específicos.
3. **Measure**: Avaliação quantitativa e qualitativa de riscos.
4. **Manage**: Ações para mitigar riscos identificados.

#### 2.5.3 IEEE 2857-2024

O padrão IEEE para IA Responsável em Engenharia de Software estabelece diretrizes para desenvolvimento ético e responsável de sistemas de software que incorporam IA.

## 3. Ética Profissional e Códigos de Conduta para Engenharia com IA

### 3.1 Revisão dos Códigos de Ética Existentes

Os códigos de ética estabelecidos por sociedades profissionais (ACM, IEEE, IFIP) estão sendo atualizados para refletir as realidades da IA generativa:

#### 3.1.1 ACM Code of Ethics and Professional Conduct (2018, interpretações 2024)

O Código de Ética da ACM estabelece princípios que ganham nova relevância na era da IA:

- **Princípio 1.2**: Respeitar a privacidade — aplica-se aos dados utilizados para treinamento de modelos.
- **Princípio 1.3**: Honestidade — transparência sobre o uso de IA na criação de software.
- **Princípio 1.4**: Respeito à propriedade intelectual — questões de copyright em código gerado por IA.
- **Princípio 2.5**: Dar crédito apropriado — atribuição de contribuições humanas vs. geradas por IA.
- **Princípio 3.1**: Compreender especificações — validação de que código gerado atende requisitos.

#### 3.1.2 IEEE Code of Ethics (2020, guidelines para IA 2024)

O Código de Ética da IEEE inclui obrigações que se aplicam diretamente ao uso de IA:

1. Aceitar responsabilidade por decisões de engenharia.
2. Rejeitar suborno em todas as suas formas.
3. Melhorar a compreensão da tecnologia e suas aplicações.
4. Manter e melhorar competência técnica.
5. Realizar atividades técnicas de maneira honesta e realista.

#### 3.1.3 IFIP Code of Ethics (2021, revisão 2024)

O código da IFIP, adaptado do ACM, enfatiza responsabilidade social e profissional no desenvolvimento de sistemas de informação.

### 3.2 Responsabilidade por Bias em Código Gerado por IA

LLMs podem perpetuar e amplificar vieses presentes em seus dados de treinamento. O engenheiro tem responsabilidade ética de:

- **Identificar bias**: Reconhecer quando código gerado pode discriminar ou causar dano desproporcional a grupos específicos.
- **Mitigar bias**: Implementar correções quando bias é identificado.
- **Documentar limitações**: Registrar quando sistemas podem ter comportamento discriminatório.

### 3.3 Transparência e Explicabilidade

O engenheiro tem obrigação ética de documentar limitações de sistemas que utilizam IA:

- **Limitações do modelo**: Quais são as fronteiras de capacidade do sistema de IA utilizado.
- **Incertezas conhecidas**: Onde o sistema pode falhar ou produzir resultados incorretos.
- **Processo de verificação**: Como o código foi validado e quais riscos residuais permanecem.

### 3.4 Dark Patterns e Manipulação Algorítmica

Dark patterns são interações de UI/UX projetadas para enganar ou induzir usuários a fazerem algo que podem não querer. O engenheiro tem responsabilidade ética de:

- **Recusar implementação**: Recusar-se a implementar dark patterns, mesmo sob pressão.
- **Identificar manipulação**: Reconhecer quando requisitos podem constituir manipulação algorítmica.
- **Advocacia**: Defender interesses dos usuários contra práticas enganosas.

### 3.5 Propriedade Intelectual de Código Gerado por IA

Questões de propriedade intelectual em código gerado por IA permanecem em evolução:

- **Direitos Autorais**: Código puramente gerado por IA geralmente não é elegível para proteção de copyright.
- **Patentes**: Algoritmos podem ser patenteados, mas a contribuição humana deve ser significativa.
- **Trade Secrets**: Código pode ser protegido como segredo comercial se mantido confidencial.

O engenheiro deve consultar especialistas jurídicos para questões específicas de propriedade intelectual.

### 3.6 Conflitos de Interesse

O uso de ferramentas de IA pode criar novos conflitos de interesse:

- **Recomendação de ferramentas**: Recomendar ferramentas de IA por motivos comerciais, não técnicos.
- **Venda de dados**: Permitir que dados de desenvolvimento sejam utilizados para treinamento de modelos sem consentimento adequado.
- **Vendor lock-in**: Criar dependência de ferramentas específicas de IA.

## 4. Governança de IA e Compliance em Organizações de Software

### 4.1 Frameworks de Governança de IA

Governança efetiva de IA em organizações de software requer estruturas formais que integrem considerações éticas, legais e técnicas.

#### 4.1.1 Google Cloud DORA AI Capabilities Model (2025)

O relatório DORA State of AI-Assisted Software Development (2025) introduz um Modelo de Capacidades de IA compreendendo sete práticas fundamentais:

1. **Políticas claras de IA**: Diretrizes explícitas sobre quando e como usar IA.
2. **Ecossistemas de dados robustos**: Infraestrutura para suportar uso responsável de IA.
3. **Design centrado no usuário**: Consideração de impactos em usuários finais.
4. **Monitoramento de performance**: Acompanhamento contínuo de métricas de qualidade.
5. **Gerenciamento de risco**: Identificação e mitigação sistemática de riscos.
6. **Auditoria de compliance**: Verificação de adesão a políticas e regulamentações.
7. **Melhoria contínua**: Iteração baseada em feedback e aprendizado.

#### 4.1.2 Gartner AI Governance Framework (2024)

Gartner identifica plataformas de governança de IA como essenciais, recomendando:

- **Inventário de modelos**: Catalogação de todos os sistemas de IA em uso.
- **Gates éticos em CI/CD**: Checkpoints de verificação ética em pipelines de deployment.
- **Conselhos de governança de IA**: Órgãos multifuncionais para supervisão de políticas.

#### 4.1.3 McKinsey AI Operating Model (2023)

O relatório McKinsey Technology Trends Outlook (2023) defende:

- **Comitês diretivos de IA**: Grupos dedicados para orientação estratégica.
- **Governança federada**: Balanceamento entre supervisão central e agilidade de domínio.
- **Guardrails éticos em roadmaps**: Integração de considerações éticas em planejamento de produto.

### 4.2 Políticas Organizacionais

Organizações devem estabelecer políticas claras sobre uso de IA generativa:

#### 4.2.1 Quando Usar IA

- Tarefas de baixa criticidade e alta repetitividade.
- Prototipagem e exploração de soluções.
- Geração de código boilerplate e documentação.

#### 4.2.2 Quando Não Usar IA

- Sistemas de segurança crítica (safety-critical).
- Processamento de dados sensíveis sem consentimento.
- Decisões com impacto legal significativo sem supervisão humana.
- Código que manipula diretamente dinheiro ou identidade sem verificação rigorosa.

#### 4.2.3 Requisitos de Verificação

- Percentual mínimo de cobertura de testes.
- Revisão obrigatória por pares para código gerado por IA.
- Análise de segurança automatizada.
- Documentação de decisões de design.

### 4.3 Human-in-the-Loop

A definição de decisões que requerem aprovação humana é elemento central de governança:

| Nível de Automação | Descrição | Exemplos |
|-------------------|-----------|----------|
| **Totalmente Automatizado** | IA opera sem intervenção humana | Sugestões de auto-complete, formatação de código |
| **Supervisionado** | IA gera, humano aprova | Geração de funções, testes unitários |
| **Human-in-the-Loop** | Requer aprovação explícita | Mudanças em APIs públicas, alterações de banco de dados |
| **Human-only** | Proibido uso de IA | Criptografia, autenticação, decisões de arquitetura crítica |

### 4.4 Model Cards e Documentation Requirements

Organizações devem manter documentação sobre sistemas que incorporam IA:

- **Model Cards**: Descrição de capacidades, limitações e riscos de modelos utilizados.
- **Datasheets for Datasets**: Documentação de dados utilizados para treinamento ou fine-tuning.
- **System Cards**: Descrição de sistema completo, incluindo componentes de IA e seus interações.

### 4.5 Audit Trails e Logging

Sistemas devem manter registros de:

- Quem utilizou ferramentas de IA e quando.
- Quais prompts foram enviados e quais respostas foram recebidas.
- Quais decisões de aceite/rejeição foram tomadas.
- Quais revisões foram realizadas e por quem.

### 4.6 Trade Compliance e Export Controls

Software profissionais devem estar cientes de restrições legais sobre importação, exportação ou re-exportação de bens, serviços e tecnologia:

- Controles de exportação e classificação.
- Transferência de bens e tecnologia.
- Aquisição de licenças governamentais necessárias.
- Restrições e impostos de importação.

## 5. A Nova Formação Profissional

### 5.1 A "Escada Quebrada"

A progressão tradicional júnior → pleno → sênior está comprometida pela descontinuidade causada por ferramentas de IA. O desenvolvedor júnior tradicionalmente aprendia através de:

1. **Implementação de tarefas simples**: Construção de familiaridade com sintaxe e padrões.
2. **Code review**: Aprendizado através de feedback de desenvolvedores mais experientes.
3. **Debugging**: Desenvolvimento de habilidades de diagnóstico.
4. **Gradual aumento de complexidade**: Progressão natural para tarefas mais desafiadoras.

Com IA generativa, o desenvolvedor júnior pode gerar código complexo sem compreender seus fundamentos, saltando etapas críticas de aprendizado. Isto cria uma **"escada quebrada"** onde:

- Júnior não desenvolve base sólida porque IA gera código complexo demais.
- Pleno não desenvolve julgamento técnico porque confia excessivamente em IA.
- Sênior enfrenta escassez de profissionais qualificados para mentoria.

### 5.2 Novas Competências Entry-Level

A formação profissional deve evoluir para enfatizar:

#### 5.2.1 Leitura Crítica

- Análise de código gerado por IA.
- Identificação de anti-padrões e vulnerabilidades.
- Compreensão de trade-offs arquiteturais.

#### 5.2.2 Debugging de Sistemas Opaços

- Técnicas de diagnóstico quando o autor do código é uma IA.
- Uso de ferramentas de análise estática e dinâmica.
- Compreensão de comportamento emergente.

#### 5.2.3 Especificação de Contexto

- Escrita de prompts efetivos.
- Definição de restrições claras.
- Comunicação de requisitos não-funcionais.

### 5.3 Certificação e Qualificação na Era da IA

A certificação profissional está evoluindo para validar competências relevantes:

#### 5.3.1 IEEE CertifAIEd™ (2024)

Programa de certificação da IEEE em princípios de design ético de IA e práticas de gerenciamento de risco, combinando módulos online com avaliações supervisionadas.

#### 5.3.2 NIST AI Workforce Framework (2025)

Framework que perfila papéis especializados (engenheiros de teste de IA, auditores de modelos) e mapeia competências para KSAs (knowledge, skills, abilities), informando padrões curriculares para educação continuada.

#### 5.3.3 EU AI Act - Certificações Profissionais

O AI Act da UE prevê certificações profissionais obrigatórias para desenvolvedores de sistemas de IA de alto risco, incluindo proficiência demonstrável em requisitos regulatórios, metodologias de avaliação de risco e princípios de design centrado no humano.

## 6. Comunicação e Especificação para Sistemas Híbridos

### 6.1 Especificação de Contexto: A Nova Competência de Comunicação

Na era da IA, a competência de comunicação mais valiosa é a capacidade de especificar contexto de forma que sistemas autônomos possam gerar soluções apropriadas:

- **Clareza de requisitos**: Definição precisa do que deve ser construído.
- **Especificação de restrições**: Limites explícitos do que não deve ser feito.
- **Contexto de domínio**: Informação suficiente para IA compreender nuances.

### 6.2 Prompt Engineering como Linguagem de Especificação Técnica

Prompt engineering evoluiu de técnica ad-hoc para linguagem de especificação formal:

- **Zero-shot vs. Few-shot**: Quando fornecer exemplos vs. confiar em conhecimento prévio.
- **Chain-of-thought**: Estruturação de prompts para raciocínio explícito.
- **Context windows**: Gestão eficiente de limitações de contexto.

### 6.3 Documentação para Stakeholders

Engenheiros devem comunicar limitações de IA a stakeholders técnicos e não-técnicos:

- **Stakeholders técnicos**: Documentação de arquitetura, APIs, limitações conhecidas.
- **Stakeholders de negócio**: Explicação de riscos, custos de verificação, trade-offs.
- **Usuários finais**: Comunicação de capacidades e limitações do sistema.

### 6.4 Comunicação de Riscos e Incertezas

A comunicação efetiva de riscos inclui:

- **Probabilidades**: Quão prováveis são diferentes cenários de falha.
- **Impactos**: Quais são as consequências potenciais.
- **Mitigações**: Quais medidas foram tomadas para reduzir riscos.
- **Responsabilidades**: Quem é responsável por diferentes aspectos do sistema.

### 6.5 Code Review como Ato de Comunicação Crítica

Code review na era da IA é mais que verificação técnica — é comunicação de julgamento:

- **Documentação de decisões**: Por que código foi aceito ou rejeitado.
- **Transferência de conhecimento**: Compartilhamento de padrões e práticas.
- **Mentoria**: Desenvolvimento de julgamento técnico em desenvolvedores júnior.

## 7. Dinâmica de Equipes e Orquestração de Agentes

### 7.1 O Time Híbrido: Humanos e Agentes Trabalhando em Conjunto

A equipe de software contemporânea inclui agentes de IA como membros "de facto":

- **Agentes de codificação**: Ferramentas como Copilot, Cursor, etc.
- **Agentes de revisão**: Sistemas de análise estática e revisão automatizada.
- **Agentes de teste**: Geração e execução de testes.
- **Agentes de documentação**: Geração e manutenção de documentação.

### 7.2 Redefinição de Papéis

| Papel Tradicional | Novo Papel | Descrição |
|-------------------|------------|-----------|
| Desenvolvedor Júnior | Curador de Código | Foco em verificação e validação |
| Desenvolvedor Pleno | Orquestrador de Agentes | Coordenação de múltiplos agentes de IA |
| Desenvolvedor Sênior | Arquiteto de Restrições | Definição de guardrails e padrões |
| Tech Lead | Governança Técnica | Supervisão de compliance e qualidade |

### 7.3 Cognição Individual em Ambiente de IA

O uso de IA cria novos desafios cognitivos:

#### 7.3.1 Viés de Confiança (Over-reliance)

Tendência de confiar excessivamente em saídas de IA, especialmente quando:

- O código parece plausível à primeira vista.
- Há pressão de tempo.
- O domínio é complexo e o engenheiro busca atalhos.

#### 7.3.2 Atrofia de Skills

Risco de deterioração de habilidades fundamentais:

- **Sintaxe**: Dependência de IA para construções básicas.
- **Algoritmos**: Perda de capacidade de implementar algoritmos clássicos.
- **Debugging**: Dificuldade em diagnosticar problemas sem assistência de IA.

#### 7.3.3 Estratégias de Mitigação

- **Prática deliberada**: Manter exercícios de codificação manual.
- **Code reviews rigorosos**: Exigir compreensão profunda de código gerado.
- **Documentação de raciocínio**: Exigir explicação de decisões técnicas.

### 7.4 Interação com Stakeholders

A comunicação com stakeholders evolui para incluir incerteza de sistemas opacos:

- **Gestão de expectativas**: Comunicação realista sobre capacidades de IA.
- **Transparência**: Clareza sobre onde há supervisão humana.
- **Accountability**: Definição clara de responsabilidades.

### 7.5 Diversidade e Inclusão

O impacto da IA na demografia de equipes de software é uma preocupação emergente:

- **Barreiras de entrada**: Ferramentas de IA podem reduzir ou aumentar barreiras para novos profissionais?
- **Polarização**: Criação de uma elite técnica vs. operadores de IA.
- **Equidade**: Garantia de que ferramentas de IA não perpetuem vieses em processos de contratação e avaliação.

## Practical Considerations

### Quando Dizer "Sim" à IA

- **Prototipagem rápida**: Exploração de soluções e validação de conceitos.
- **Código boilerplate**: Geração de código repetitivo e padronizado.
- **Documentação**: Geração de docstrings, comentários e documentação técnica.
- **Testes unitários**: Geração de casos de teste para cobertura básica.
- **Refatoração**: Sugestões de melhorias de código existente.

### Quando Dizer "Não" à IA

- **Segurança crítica**: Criptografia, autenticação, autorização.
- **Conformidade regulatória**: Código sujeito a auditorias rigorosas.
- **Alta criticidade**: Sistemas onde falhas causam dano físico ou financeiro severo.
- **Dados sensíveis**: Processamento de PII sem consentimento explícito.
- **Arquitetura fundamental**: Decisões que afetam estrutura de longo prazo do sistema.

### Framework de Decisão Prático

```
┌─────────────────────────────────────────────────────────────────┐
│              FRAMEWORK DE DECISÃO: USAR IA?                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CRITÉRIOS DE AVALIAÇÃO:                                        │
│                                                                 │
│  1. COMPLEXIDADE                                                │
│     □ Baixa: Adequado para IA                                   │
│     □ Média: IA com revisão humana obrigatória                  │
│     □ Alta: Requer análise humana predominante                  │
│                                                                 │
│  2. CRITICIDADE                                                 │
│     □ Baixa: Pode usar IA livremente                            │
│     □ Média: IA com guardrails específicos                      │
│     □ Alta: Human-only ou heavy human-in-the-loop               │
│                                                                 │
│  3. CUSTO DE VERIFICAÇÃO                                        │
│     □ Menor que 50% do esforço de escrita: Viável               │
│     □ Entre 50-100%: Avaliar caso a caso                        │
│     □ Maior que 100%: Não usar IA                               │
│                                                                 │
│  4. DOMÍNIO DE CONHECIMENTO                                     │
│     □ Bem representado nos dados de treinamento: Mais seguro    │
│     □ Especializado/nicho: Requer validação adicional           │
│     □ Emergente/não documentado: Evitar IA                      │
│                                                                 │
│  DECISÃO:                                                       │
│  □ USAR IA - Baixo risco, alta produtividade                    │
│  □ USAR IA COM RESTRIÇÕES - Requer guardrails específicos       │
│  □ NÃO USAR IA - Risco inaceitável ou custo de verificação alto │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Checklist de Verificação de Código Gerado por IA

- [ ] Código foi revisado por pelo menos um engenheiro humano?
- [ ] Testes foram executados e passaram?
- [ ] Análise de segurança identificou vulnerabilidades?
- [ ] Código adere a padrões organizacionais?
- [ ] Documentação foi atualizada?
- [ ] Decisões de design foram registradas?
- [ ] Trade-offs foram explicitamente considerados?
- [ ] Stakeholders apropriados foram consultados?

## Summary

- **Julgamento Técnico**: Competência central do engenheiro de software na era da IA, focada em avaliação, validação e recusa de saídas de sistemas autônomos.

- **Gargalo da Verificação**: O custo de validar código gerado por IA é o fator limitante da produtividade, não a velocidade de geração.

- **Responsabilidade Legal**: Accountability não pode ser delegada à IA; engenheiros mantêm responsabilidade profissional por código que aprovam para produção.

- **Ética Profissional**: Códigos de ética existentes (ACM, IEEE, IFIP) estão sendo atualizados para incluir responsabilidade por bias, transparência e propriedade intelectual em sistemas com IA.

- **Governança de IA**: Organizações devem estabelecer frameworks formais incluindo políticas claras, human-in-the-loop, audit trails e compliance regulatório.

- **Formação Profissional**: A "escada quebrada" exige novas competências entry-level focadas em leitura crítica, debugging de sistemas opacos e especificação de contexto.

- **Comunicação**: Prompt engineering torna-se linguagem de especificação técnica; code review é ato de comunicação de julgamento.

- **Dinâmica de Equipes**: Redefinição de papéis de implementador para orquestrador; necessidade de mitigar viés de confiança e atrofia de skills.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixíssima** — julgamento técnico é competência essencial e insubstituível por LLMs. A capacidade de avaliar criticamente saídas de IA torna-se mais valiosa, não menos, à medida que a geração de código se commoditiza. |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Crítico** — responsabilidade legal recai sobre quem aprova código gerado por IA. O custo de verificação pode exceder o ganho de produtividade da geração, especialmente em sistemas de alta criticidade. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Máxima** — engenheiros são responsáveis finais por sistemas que operam em produção. Ferramentas de IA são instrumentos; accountability profissional permanece com o profissional licenciado/certificado. |

## References

ALAMI, A.; ERNST, N. Human and Machine: How Software Engineers Perceive and Engage with AI-Assisted Code Reviews Compared to Their Peers. *arXiv:2501.02092*, 2025.

ASSOCIATION FOR COMPUTING MACHINERY (ACM). *ACM Code of Ethics and Professional Conduct*. New York: ACM, 2018. Atualizações de interpretação, 2024.

BAKER DONELSON. Think While You Are Using AI Coding. *Industry Brief*, 2025. Disponível em: https://www.bakerdonelson.com/think-while-you-are-using-ai-coding. Acesso em: 31 jan. 2026.

EUROPEAN COMMISSION. *Proposal for a Regulation Laying Down Harmonised Rules on Artificial Intelligence (Artificial Intelligence Act)*. COM(2021) 206 final, 2024.

GARTNER RESEARCH. Artificial Intelligence Requires an Extended Governance Framework. *Strategic Technology Trends*, 2024.

GOTTLANDER, J.; KHADEMI, T. The Effects of AI Assisted Programming in Software Engineering: An Observation of GitHub Copilot in the Industry. Master's thesis. Chalmers University of Technology, 2023.

GOOGLE CLOUD. *DORA State of AI-Assisted Software Development Report*. Mountain View: Google, 2025. Disponível em: https://services.google.com/fh/files/misc/2025_state_of_ai_assisted_software_development.pdf. Acesso em: 31 jan. 2026.

IEEE COMPUTER SOCIETY. *Professional Competency Model for AI-Augmented Software Engineering*. Washington: IEEE CS, 2024.

IEEE STANDARDS ASSOCIATION. *P7001: IEEE Recommended Practice for Ethics in AI System Design*. Piscataway: IEEE, 2024.

IEEE STANDARDS ASSOCIATION. *IEEE 2857-2024: Standard for Responsible AI in Software Engineering*. Piscataway: IEEE, 2024.

IEEE STANDARDS ASSOCIATION. *CertifAIEd™ – The Mark of AI Ethics*. Piscataway: IEEE, 2024. Disponível em: https://standards.ieee.org/products-programs/icap/ieee-certifaied. Acesso em: 31 jan. 2026.

INSTITUTE OF ELECTRICAL AND ELECTRONICS ENGINEERS (IEEE). *IEEE Code of Ethics*. Piscataway: IEEE, 2020. Guidelines para IA, 2024.

INTERNATIONAL FEDERATION FOR INFORMATION PROCESSING (IFIP). *IFIP Code of Ethics and Professional Conduct*. Laxenburg: IFIP, 2021. Revisão, 2024.

INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. *ISO/IEC 42001:2024: Information technology — Artificial intelligence — Management system*. Geneva: ISO, 2024.

INTERNATIONAL ORGANIZATION FOR STANDARDIZATION. *ISO/IEC TR 38507:2024: Information Technology — Governance of Digital Signage Systems*. Geneva: ISO, 2024.

KINASH, M. et al. Preserving Technical Judgment in AI-Augmented Software Engineering. In: *Proceedings of the 46th International Conference on Software Engineering Workshop on Human-AI Collaboration*, 2024.

MCKINSEY & COMPANY. *Technology Trends Outlook 2023*. New York: McKinsey, 2023.

MOORE, T.; WU, M. Vicarious Liability in AI-Driven Organizations. *Harvard Journal of Law & Technology*, v. 38, n. 2, 2025.

NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY (NIST). *AI Risk Management Framework 1.0*. Gaithersburg: NIST, 2024.

NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY (NIST). *AI Workforce Framework*. Gaithersburg: NIST, 2025. Disponível em: https://www.nist.gov/ai. Acesso em: 31 jan. 2026.

U.S. COPYRIGHT OFFICE. *Registration Guidance for Works Containing AI-Generated Content*. Washington: U.S. Copyright Office, 2023. Disponível em: https://www.copyright.gov/ai. Acesso em: 31 jan. 2026.

UNESCO. *Recommendation on the Ethics of AI*. Paris: UNESCO, 2021. Guidelines de implementação, 2024.

WORLD ECONOMIC FORUM. *Future of Jobs Report 2025*. Geneva: WEF, 2025.

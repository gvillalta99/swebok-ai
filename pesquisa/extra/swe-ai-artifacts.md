---
title: Swe Ai Artifacts
created_at: '2026-01-31'
tags: []
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

Considerando o cenário que discutimos — onde código se tornou commodity e o
valor migrado para restrição, validação e governança — aqui está uma proposta de
artefatos estratégicos para 2026, organizados não por fase tradicional, mas por
função de mitigação de risco:

1. Artefatos de Decisão Arquitetural (O "Anti-Código") Por que: Em um mundo onde
   a IA gera soluções plausíveis, a única defesa contra débito técnico sistêmico
   é documentar o porquê de as decisões.

- Architecture Decision Records (ADRs) versionados: Não apenas "usamos
  microserviços", mas "rejeitamos a sugestão de serverless da IA porque nosso
  pico de carga exige controle de custo granular e cold-start inaceitável".
- Rationale de Trade-offs: Documentos curtos (1-2 parágrafos) explicando
  alternativas rejeitadas e critérios de seleção. Isso evita que futuros agentes
  (ou devs) revertam decisões por falta de contexto.
- Constraint Specifications: Listas formais do que é proibido (ex: "nenhum ORM
  pode gerar N+1 queries em produção", "nenhuma senha pode transitar em texto
  plano, independente do prompt"). Funcionam como "guardrails" para agentes.

2. Artefatos de Contexto e Governança de IA Por que: O código agora é
   subproduto; o ativo é o contexto usado para gerá-lo.

- Prompts Sistêmicos Versionados: Trate instruções para agentes (Claude, GPT,
  Cody) como código-fonte. Versione "personalidades" de assistentes (ex:
  "Arquiteto de Segurança" vs. "Otimizador de Performance").
- Context Maps (RAG): Documentação de quais bases de conhecimento a empresa
  mantém para alimentar IA (ex: "nossa documentação de compliance LGPD",
  "padrões internos de API"). Sem isso, a IA gera código genérico que viola
  regulamentações locais.
- Audit Logs de Geração: Registro de quem gerou o que, com qual prompt, e quem
  revisou. Essencial para accountability quando código gerado causa incidentes.

3. Artefatos de Verificação e Taxa de Revisão Por que: Como vimos, "é mais fácil
   escrever do que revisar". Esses artefatos estruturam o trabalho crítico que
   substituiu a codificação.

- Matriz de Rastreabilidade Requisito-Validação: Não rastreie apenas "requisito
  → código", mas "requisito → saída da IA → evidência de revisão humana → teste
  de comportamento". A coluna "evidência de revisão" é crucial para o "buraco
  geracional" (juniors precisam ver como seniors validam).
- Relatórios de Alucinação: Documentação centralizada de casos onde a IA sugeriu
  soluções que pareciam corretas mas eram falhas (ex: "IA sugeriu usar eval()
  para parsing de JSON em input de usuário"). Serve como dataset de treinamento
  interno.
- Checklists de Revisão Crítica: Listas curtas e não-negociáveis que humanos
  devem verificar em código gerado (segurança, tratamento de edge cases,
  comportamento assíncrono).

4. Contratos e Interfaces (A "Cola" entre Agentes) Por que: Quando múltiplos
   agentes geram microsserviços, a falha ocorre nas interfaces.

- API Contracts (OpenAPI + Semântica): Além de endpoints, documente SLAs
  comportamentais ("esta API deve responder em \<50ms no p99" ou "deve ser
  idempotente para retry").
- Schemas de Dados Canônicos: Definições rígidas de entidades de domínio que não
  podem ser "alucinadas" pela IA (ex: "um CPF sempre tem 11 dígitos, validação
  via algoritmo específico, nunca regex simples").
- Runbooks de Depuração para Código Genérico: "Como investigar um código que
  você não escreveu". Inclui mapas de dependência gerados automaticamente mas
  validados por humanos.

5. Artefatos de Conhecimento de Domínio (O Antídoto ao "Buraco Geracional") Por
   que: Se não contratamos mais juniors para fazer CRUDs, como preservamos o
   entendimento do negócio?

- Domain Glossaries (Ubiquitous Language): Dicionários vivos de termos de
  negócio vs. termos técnicos. Crítico para que a IA traduza corretamente entre
  "linguagem de negócio" e "implementação".
- Narrativas de Falha (Post-mortems de Dívida Técnica): Documentação de onde o
  código gerado rapidamente ("bom o suficiente") quebrou e exigiu refactoring.
  Ensina à equipe onde a velocidade da IA é perigosa.
- Decision Trees de Negócio: Fluxogramas de regras de negócio complexas que a IA
  não pode inferir sozinha (ex: "quando aplicar desconto de fidelidade vs.
  desconto promocional").

6. Processos Enxutos (O Mínimo Viável de Cerimônia) Dado que o valor está em
   pensar e não em produzir, evite processos que incentivem "velocity" de
   commits:

- Revisão por Pares (Pair Review) obrigatória para código IA: Um humano explica
  para outro por que aceitou a sugestão da IA. Força o pensamento crítico.
- Demos de Comportamento, não de Código: Mostrar que o sistema funciona conforme
  regras de negócio, não que "geramos 500 linhas em 2 minutos".
- Sessões de "Restrição" (Constraint Sessions): Reuniões quinzenais para definir
  novas regras do que a IA não pode fazer, baseadas em falhas recentes.

Recomendação estratégica: Comece com ADRs + Prompts Versionados + Matriz de
Verificação. Esses três protegem contra os riscos sistêmicos que identificamos
(alucinação, perda de conhecimento, dívida técnica invisível). O resto evolui
organicamente à medida que o time descobre onde a IA falha.

______________________________________________________________________

Aqui está o mapeamento da IA como "agente no processo" — não substituindo, mas
operando dentro de constraints definidos por esses artefatos:

1. Artefatos de Decisão Arquitetural (IA como Proponente, Humanos como
   Gatekeepers)

Interação:

- Entrada (Input): A IA lê ADRs existentes para entender decisões anteriores
  antes de sugerir novas soluções. Ela consulta: "Decidimos em 2024-01 que não
  usaríamos GraphQL por N+1 queries; isso ainda se aplica?"
- Processo: Quando solicitada a arquitetar um sistema, a IA gera 3-4 opções
  técnicas plausíveis (ex: "Microsserviços Serverless vs. Monolito Modular vs.
  Arquitetura Hexagonal").
- Artefato: O humano não copia a sugestão. Ele cria um ADR registrando: "Opção A
  foi sugerida pela IA, mas foi modificada/rejeitada porque \[critério de
  negócio específico que a IA não conhece\]."
- Risco mitigado: A IA tende a sugerir "boilerplate arquitetural" da moda (ex:
  "use Kafka para tudo"). O ADR força a justificativa econômica/riscos que a IA
  não pode calcular sozinha.

2. Artefatos de Contexto/Governança de IA (IA como Dependente desses artefatos)

Interação:

- Prompts Sistêmicos Versionados: São as "instruções de fábrica" da IA. Ex:
  "Você é um engenheiro sênior que prioriza segurança sobre performance. Nunca
  sugira eval() ou concatenação SQL."
- Context Maps (RAG): A IA consulta esses repositórios antes de gerar código.
  Ex: Ao gerar uma API de pagamentos, ela recupera do RAG: "Segundo nossa base
  de conhecimento LGPD, não podemos logar números de cartão completos."
- Audit Logs: Cada geração de código pela IA gera uma entrada:
  `{timestamp, prompt_usado, versão_do_modelo, hash_do_contexto_RAG}`. Se um bug
  surge 3 meses depois, sabemos exatamente qual "mentalidade" da IA gerou aquele
  código.

Ponto crítico: Sem esses artefatos, a IA opera no "conhecimento médio da
internet". Com eles, ela opera no "conhecimento específico da empresa".

3. Artefatos de Verificação (IA como Assistente de Revisão, Humanos como
   Árbitros)

Interação:

- Matriz de Rastreabilidade: A IA preenche automaticamente a coluna "código
  gerado" e sugere links para requisitos. O humano valida a coluna "evidência de
  revisão crítica".
- Relatórios de Alucinação: Quando um revisor humano detecta que a IA sugeriu
  `md5()` para hash de senhas (inseguro), ele documenta no relatório. A próxima
  vez que a IA for consultada sobre autenticação, o RAG recupera: "ATENÇÃO: Em
  2024-03, modelo Claude-X sugeriu MD5; foi rejeitado. Use BCrypt
  obrigatoriamente."
- Taxa de Verificação: A IA pode gerar milhares de linhas, mas o artefato
  "Checklist de Revisão Crítica" limita o escopo do revisor humano aos itens de
  alto risco (segurança, estado compartilhado, concorrência) — não estilo de
  código.

Dinâmica: A IA aumenta o volume de código a ser verificado, mas esses artefatos
aumentam a eficiência da verificação humana focando-a onde a IA é menos
confiável.

4. Contratos e Interfaces (IA como Implementadora, Schemas como Paredes)

Interação:

- API Contracts: A IA lê OpenAPI e gera implementações. Mas o schema atua como
  constraint: se o OpenAPI define `CPF: pattern: '^\d{11}$'`, a IA não pode
  sugerir código que aceite pontuação.
- Schemas Canônicos: São "grundiruth" que a IA não pode negociar. Ex: Se o
  schema diz `TransacaoFinanceira.valor: BigDecimal`, a IA é proibida de usar
  `float` por performance.
- Runbooks de Depuração: Quando algo quebra em produção, a IA consulta o runbook
  para gerar queries de diagnóstico. Ex: "Baseado no runbook 'Debug de Timeout',
  sugerir verificar nas logs campos X, Y, Z."

Função: Esses artefatos são as "trilhos" que impedem a IA de divergir do domínio
do negócio ou das garantias técnicas da empresa.

5. Conhecimento de Domínio (IA como Tradutora, Glossários como Dicionários
   Oficiais)

Interação:

- Domain Glossaries: A IA usa esses glossários para traduzir requisitos de
  negócio em código. Ex: Se o glossário diz "Cliente VIP = cliente com > 5 anos
  OU gasto > 100k", a IA implementa essa lógica exata, não uma aproximação
  baseada em "intuição" estatística.
- Narrativas de Falha: A IA é treinada/hospedada evitando padrões documentados
  como perigosos. Ex: Se uma Narrativa documenta que "código gerado para
  relatórios síncronos quebrou sob carga", a IA futura gera versões assíncronas
  por padrão.
- Decision Trees: A IA consulta essas árvores para gerar código de regras de
  negócio complexas. Ex: Ao gerar um serviço de descontos, a IA percorre a
  árvore de decisão para garantir que está aplicando a lógica correta de
  prioridade (fidelidade vs. promocional).

Risco: Sem esses artefatos, a IA "alucina" regras de negócio baseadas em padrões
genéricos do mercado, não nas regras específicas da empresa.

6. Processos (IA como Participante Estruturado)

Interação:

- Revisão por Pares (Pair Review): O fluxo é:

  1. Dev A gera código com IA
  2. Dev A explica para Dev B por que aceitou/rejeitou modificações da IA (não
     apenas o que a IA fez)
  3. Juntos, atualizam os Prompts Sistêmicos se descobrirem comportamento
     indesejado recorrente na IA

- Constraint Sessions: A IA é "auditoria". Analisam logs de geração da quinzena
  perguntando: "A IA tentou violar restrições de segurança quantas vezes?" Isso
  alimenta novas regras nos artefatos de governança.

Sumário da Dinâmica

Fase Papel da IA Artefato que Controla/Guia Decisão Sugeridor de opções ADRs
(registro de rejeições) Contexto Consumidor de RAG Prompts Versionados, Context
Maps Geração Implementadora automática Schemas, Contratos de API Validação
Assistente de revisão Checklists Críticos, Matriz de Rastreabilidade Depuração
Diagnosticador guiado Runbooks, Narrativas de Falha

Regra de Ouro: A IA nunca escreve nos artefatos de "Decisão" e "Governança" sem
supervisão. Ela pode sugerir atualizações (ex: "Detectei padrão recorrente de
timeout; proponho adicionar regra aos Prompts Sistêmicos"), mas um humano deve
aprovar, mantendo o loop de accountability humano.

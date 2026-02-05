---
title: 'Ex: "0 alucinações detectadas em 100 gerações + approval de 2 seniors"'
created_at: '2026-01-31'
tags: []
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

Aqui estão 5 abordagens distintas para organizar esses artefatos em
repositórios, cada uma otimizada para diferentes contextos organizacionais e
maturidades de IA:

______________________________________________________________________

1. Estrutura por Domínio de Negócio (Domain-Centric)

Ideal para: Organizações com múltiplos produtos/bounded contexts claros, onde o
domínio é mais estável que a tecnologia.

```
/repos
├── /pagamentos                    # Bounded Context
│   ├── /src                       # Código gerado/escrito
│   ├── /domain                    # Conhecimento de domínio (artefato 5)
│   │   ├── glossary.md            # "Cliente VIP", "Transação Pendente"
│   │   ├── decision-trees/        # Regras de desconto, antifraude
│   │   └── failure-narratives/    # Post-mortems de código IA
│   ├── /architecture              # Decisões (artefato 1)
│   │   ├── adrs/
│   │   └── constraints.yaml       # "Nenhum float para valores monetários"
│   ├── /contracts                 # Contratos (artefato 4)
│   │   ├── openapi.yaml
│   │   └── canonical-schemas/     # CPF, CNPJ, etc.
│   └── /.ai                       # Contexto específico da IA (artefato 2)
│       ├── system-prompts/        # "Você é especialista em PCI-DSS"
│       └── context-maps/          # O que RAG deste domínio indexa
├── /clientes
│   └── ... (mesma estrutura)
└── /.platform                     # Governança centralizada
    ├── /verification              # Artefatos 3 - compartilhados
    │   ├── hallucination-reports/
    │   └── review-checklists.yaml # Checklists obrigatórios por tipo de mudança
    └── /audit-logs                # Artefato 2 - logs de geração cruzados
```

Fluxo: A IA consulta primeiro `/domain` para não alucinar regras de negócio,
depois `/architecture` para constraints, e só então gera em `/src`.

______________________________________________________________________

2. Estrutura por Função de Mitigação (Risk-First)

Ideal para: Ambientes regulados (fintechs, healthtechs) onde compliance >
velocidade.

```
/governance-repo                   # Gitops da governança
├── /decisions                     # Artefato 1 - "Anti-Código"
│   ├── /rejected                  # ADRs de coisas que não fizemos
│   │   └── 007-serverless-rejected.md
│   ├── /accepted
│   └── trade-offs-database.yaml   # Rationale curto por decisão
├── /constraints                   # Guardrails programáveis
│   ├── security.json              # "Nunca use eval()"
│   ├── performance.json           # "Timeouts máximos por tier"
│   └── business-rules/            # Constraints de domínio
│       └── br-cpf-validation.json # Schema regex + algoritmo
├── /ai-context                    # Artefato 2 - Cérebro da IA
│   ├── prompts/                   # Versionamento git de personas
│   │   ├── architect-v2.3.md
│   │   └── security-reviewer-v1.0.md
│   └── rag-indexes/               # Configuração do que é indexado
│       ├── lgpd-knowledge-base/
│       └── internal-standards/
└── /verification                  # Artefato 3
    ├── traceability-matrix/       # Vínculo requisito-código-IA-revisor
    ├── hallucination-dataset/     # CSV de falhas detectas (treina RAG)
    └── runbooks/                  # Artefato 4 - debugging

/service-repos                     # Repositórios de código (limpos)
├── /api-pagamentos
│   ├── /src
│   └── ai-manifest.yaml           # Aponta para ../governance-repo#v2.1
└── /api-clientes
    └── ai-manifest.yaml
```

Fluxo: Repositórios de código são "espertos" - eles importam governança via
`ai-manifest.yaml`. A IA é instruída a nunca gerar código em `/src` sem validar
contra `/constraints` no repo de governança.

______________________________________________________________________

3. Estrutura Mono-Repo Temporal (Time-Boxed)

Ideal para: Startups em hiper-crescimento, onde o contexto muda rápido e o
problema é "o que a IA sugeriu ontem vs hoje".

```
/mono-repo
├── /2026-Q1                       # Snapshot temporal de contexto
│   ├── /context                   # Artefato 2
│   │   ├── prompts-system-v1.md   # Como instruíamos a IA em Jan/26
│   │   └── knowledge-base/        # Documentação que alimentava RAG na época
│   ├── /decisions                 # Artefato 1
│   │   └── adrs/
│   ├── /verification              # Artefato 3
│   │   └── hallucinations-q1.md   # Erros típicos da IA nesse período
│   └── /services                  # Código gerado sob esse contexto
│       └── (código da época)
├── /2026-Q2                       # Contexto evoluiu
│   ├── /context
│   │   └── prompts-system-v2.md   # Prompts ajustados após erros do Q1
│   ├── /verification
│   │   └── lessons-from-q1/       # Narrativas de falha (artefato 5)
│   └── /services
├── /current -> symlink para 2026-Q2  # HEAD do contexto
└── /contracts                     # Artefato 4 - camada transversal
    ├── /canonical-schemas         # Schemas imutáveis entre trimestres
    └── /api-specs
```

Fluxo: A IA sempre lê `/current/context` para gerar código. Quando um "modo de
falha" novo é descoberto, cria-se um `/2026-Q3` com prompts corrigidos. Permite
debugar código antigo entendendo qual "mentalidade" da IA o gerou.

______________________________________________________________________

4. Estrutura GitOps de Agentes (Agent-Native)

Ideal para: Times usando múltiplos agentes simultâneos (Claude para código, GPT
para review, Cody para debug).

```
/project
├── /agents                        # Configuração dos agentes (artefato 2)
│   ├── /architect-claude          # Personalidade "Arquiteto"
│   │   ├── system-prompt.md
│   │   ├── constraints.md         # O que este agente especificamente não pode fazer
│   │   └── adrs-owned/            # Decisões arquiteturais que ele propôs
│   ├── /reviewer-gpt              # Personalidade "Revisor Crítico"
│   │   ├── system-prompt.md       # "Você é pessimista, foca em segurança"
│   │   └── checklists/            # Checklists que este agente aplica
│   └── /debugger-cody
│       └── runbooks/              # Artefato 4 - procedimentos de debug
├── /registry                      # "Schema Registry" (artefato 4)
│   ├── /domains
│   │   ├── pagamento.yaml         # Definição canônica de "Pagamento"
│   │   └── cliente.yaml
│   └── /contracts
│       └── apis/                  # OpenAPIs validadas
├── /src                           # Código (gerado por /agents/architect-claude)
├── /.github/workflows
│   ├── ai-generation.yml          # Trigger: quando Prompt muda, regenera?
│   └── ai-review.yml              # Obriga passar por /agents/reviewer-gpt
└── /audit                         # Artefato 2 - logs imutáveis
    ├── generation-log.ndjson      # {timestamp, agent, prompt_hash, diff_hash}
    └── trace-matrix/              # Artefato 3 - rastreabilidade
```

Fluxo: Cada agente é um "diretório" com seu contexto. A IA não gera código
diretamente - ela gera propostas em `/agents/*/proposals/` que são mergeadas via
PR humano. O `/audit` é append-only (WORM - Write Once Read Many).

______________________________________________________________________

5. Estrutura mínima "Docs-as-Code" Lean

Ideal para: Times pequenos (\<10 devs) migrando gradualmente, quem precisa de
valor imediato sem burocracia.

```
/repo
├── /docs                          # Tudo é documentação
│   ├── /adr                       # Artefato 1
│   │   └── 001-por-que-postgres.md
│   ├── /ai-rules                  # Artefato 2 + 3 combinados
│   │   ├── global-prompt.md       # "Você é um dev sênior conservador..."
│   │   ├── forbidden-patterns.md  # Lista de "nunca faça isso"
│   │   ├── domain-glossary.md     # Artefato 5 - mínimo viável
│   │   └── review-checklist.md    # Artefato 3 - o que humano deve checar
│   └── /.hallucinations           # Artefato 3 - anti-padrões encontrados
│       └── 001-eval-is-evil.md
├── /schemas                       # Artefato 4
│   ├── common-types.yaml          # CPF, tipos monetários
│   └── api-public.yaml            # OpenAPI
└── /src                           # Código
    └── (normal)
```

Fluxo: A IA é instruída a sempre ler `/docs/ai-rules/` antes de tocar em `/src`.
Em code review, o revisor verifica tanto o código quanto se algum padrão novo de
`/docs/.hallucinations` precisa ser adicionado. Simples, mas cobre os 3
artefatos críticos (ADR, Prompts, Verificação).

______________________________________________________________________

Recomendação de adoção:

- Começando agora: Use a opção 5 (Lean) + gradualmente vá criando `/schemas/` e
  `/adr/`.
- Escala média (múltiplos times): Migre para opção 1 (Domain-Centric), separando
  contexts.
- Regulamentado/Enterprise: Adote opção 2 (Risk-First) com repo de governança
  centralizado.
- Debugging caótico: Se o problema é entender o que a IA fez no passado, opção 3
  (Temporal).
- Multi-agente complexo: Opção 4 quando tiver diferentes IAs com papéis
  distintos.

______________________________________________________________________

Aqui estão 6 padrões arquiteturais adicionais que complementam as estruturas
anteriores, focados em segurança, evolução e governança distribuída no cenário
de IA generativa:

______________________________________________________________________

1. The Walled Garden (Isolamento Hierárquico) Separação física entre "zonas de
   risco" em que a IA pode operar livremente vs. zonas críticas protegidas.

```
/src
├── /generated          # Jardim aberto - IA pode regenerar à vontade
│   ├── /controllers    # CRUDs, APIs boilerplate
│   └── /migrations     # Schemas gerados (versionados, mas descartáveis)
├── /hybrid             # Cerca viva - requer aprovação humana para alterar
│   ├── /services       # Lógica de negócio com testes de comportamento obrigatórios
│   └── /integrations   # Código gerado, mas com testes de contrato firmes
└── /sanctum            # Muralha intransponível - HUMAN_ONLY
    ├── /crypto         # Algoritmos criptográficos (nunca vistos por LLM)
    ├── /auth-core      # Verificação de tokens/sessões
    └── /financial-calc # Cálculos regulados (FEFO, juros compostos auditáveis)
```

Regra: O `.gitattributes` marca `/sanctum/** linguist-generated=false` e
triggers bloqueiam commits com autoria "AI" nestes paths.

______________________________________________________________________

2. Event Sourcing for AI Decisions (Contexto Imutável) Não versionar apenas o
   código, mas o estado completo que o gerou, permitindo "reproduzir" uma
   geração posteriormente.

```
/ai-decisions-log/              # Append-only, WORM storage
├── 2026-01-29/
│   └── 14h33m12s-uuid7.json    # Evento de geração
│       {
│         "input": {
│           "prompt_version": "architect-v2.3",
│           "rag_context_hash": "sha256:a3f4...",
│           "temperature": 0.7,
│           "adr_context": ["007-microservices", "012-no-sql"]
│         },
│         "output": {
│           "diff_hash": "sha256:b2d5...",
│           "lines_added": 150,
│           "tokens_used": 2400
│         },
│         "validation": {
│           "reviewer": "human@example.com",
│           "hallucination_check": "passed",
│           "tests_run": ["unit", "contract"]
│         }
│       }
```

Uso: Quando um bug surge 6 meses depois, você "reproduz" o contexto exato para
ver se a IA atual cometeria o mesmo erro, ou se a falha era inevitável dado o
contexto da época.

______________________________________________________________________

3. Blue/Green AI Contexts (Promoção de Contexto) Ter dois contextos de IA
   paralelos: um "estável" (Green) que gera código produtivo, e um
   "experimental" (Blue) que testa novos prompts/modeos. Promoção via gates de
   qualidade.

```
/ai-context/
├── /green (production)         # Prompts validados, RAG curado
│   ├── system-prompt.md        # Conservador, pouca criatividade
│   └── constraints.yaml        # Lista completa de proibições
├── /blue (canary)              # Em experimentação
│   ├── system-prompt.md        # Nova versão com GPT-5
│   └── constraints.yaml        # Relaxado para testar limites
└── promotion-gates.yaml        # Critérios para Blue virar Green
    # Ex: "0 alucinações detectadas em 100 gerações + approval de 2 seniors"
```

Fluxo: Novos recursos são gerados primeiro em `/blue`. Se passarem 2 semanas sem
incidentes nos logs de `hallucination-reports/`, o contexto Blue é promovido a
Green (com atomic commit renomeando diretórios).

______________________________________________________________________

4. Contract-First Generation (Geração por Contrato) Proibir a IA de escrever
   implementação antes de definir formalmente o contrato (OpenAPI, AsyncAPI,
   GraphQL Schema). O contrato age como "molde" que a IA não pode transgredir.

```
/features/
├── /novo-checkout
│   ├── contracts/
│   │   ├── api-v1.yaml         # OpenAPI escrito/validado por humanos
│   │   ├── events.avsc         # Schema Kafka (Avro)
│   │   └── invariants.md       # Regras formais (ex: "total > 0")
│   └── /generated/
│       └── (aqui sim a IA entra, implementando OS contratos acima)
```

Obrigatoriedade: O CI verifica se o código em `/generated` viola os contratos em
`/contracts` via `spectral lint` ou testes de contrato (Pact). Se houver
divergência, o commit é rejeitado independente de quem gerou.

______________________________________________________________________

5. Quantum Prompts (Atomicidade Contexto-Código) Garantir que prompt + código
   gerado sejam tratados como uma única unidade atômica em commits. Não se pode
   alterar o código sem explicitar qual contexto (prompt) mudou.

```
Commit Message Estruturado:
---
context-change: prompt-v2.1 → v2.2 (aumento de restrição SQL)
ai-author: claude-3.5-sonnet
human-reviewer: maria.silva
generated-files: src/repos/users.ts, tests/users.spec.ts
behavioral-proof: E2E test #445 passou
---

diff:
- (código antigo gerado por prompt-v2.1)
+ (código novo gerado por prompt-v2.2)
```

Impacto: Se rollback for necessário, você reverte tanto o código quanto o
contexto mental que o originou, evitando inconsistências onde "código antigo" é
mantido com "prompts novos" (causa de alucinações silenciosas).

______________________________________________________________________

6. Federated Constraints (Hierarquia de Restrições) Distribuir regras em camadas
   cumulativas (Global → Domain → Feature), onde a IA deve obedecer a interseção
   de todas.

```
/constraints/
├── /global                     # Aplica-se a todos os repos (imposto pelo CISO)
│   ├── security.json           # "Nunca logar PII"
│   └── compliance-lgpd.json    # Retenção de dados
├── /domain/finance             # Herda global + específico
│   ├── accounting-rules.json   # "Lucro sempre BigDecimal"
│   └── audit-trail.json        # "Toda transação imutável"
└── /feature/pix-instantaneo    # Herda domain + específico
    └── performance.json        # "Latência < 50ms sob pena de rejeição"
```

IA Behavior: Antes de gerar código para `/feature/pix-instantaneo`, a IA mergeia
os 3 arquivos JSON hierarquicamente. Conflitos (ex: global diz "log tudo",
domain diz "não loga valores") são resolvidos pela hierarquia mais específica,
mas registrados em `constraint-conflicts.log` para revisão humana.

______________________________________________________________________

Sumário de Aplicação

Padrão Resolve Quando Usar Walled Garden IA tocando em código crítico Sistemas
financeiros, cripto, saúde Event Sourcing AI Debugging forense de geração
Debugging complexo, auditoria regulatória Blue/Green Contexts Prompts imaturos
em produção Migração entre versões de modelo (GPT-4→5) Contract-First
Alucinações de interface Microsserviços, integrações externas Quantum Prompts
Inconsistência contexto/código Times grandes, commits frequentes Federated
Constraints Conflito de regras entre squads Enterprise, múltiplos times
autônomos

Estes padrões são ortogonais às estruturas de repo anteriores (você pode aplicar
"Walled Garden" dentro da estrutura "Domain-Centric", por exemplo). O segredo é
começar com Walled Garden + Contract-First - eles dão o maior retorno imediato
em termos de redução de risco.

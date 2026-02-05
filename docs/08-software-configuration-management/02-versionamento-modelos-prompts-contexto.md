---
title: 02 - Versionamento de Modelos, Prompts e Contexto
created_at: '2025-01-31'
tags: [versionamento, prompts, modelos, contexto, git, llm, gitops, mlflow, dvc]
status: draft
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# 2. Versionamento de Modelos, Prompts e Contexto

## Contexto

Em sistemas determinísticos, se o código não muda, o comportamento não muda. Em
Engenharia de IA, isso é falso. O comportamento do sistema é função de quatro
variáveis voláteis: o prompt, o modelo (e sua versão opaca), os parâmetros de
inferência e o contexto (dados).

Se você não versiona essa tupla de forma atômica, você não tem engenharia; tem
sorte. Debugar uma alucinação sem saber exatamente qual versão do prompt rodou
contra qual snapshot de dados é impossível. Este capítulo define como aplicar
GitOps para governar essa complexidade.

## Objetivos de Aprendizado

1. Implementar a **Tupla de Configuração** como unidade atômica de
   versionamento.
2. Adotar estratégias de **GitOps** para gestão de prompts e configurações de
   modelos.
3. Decidir entre ferramentas especializadas (MLFlow, DVC) e Git puro para
   diferentes artefatos.
4. Estabelecer estratégias de branching que suportem a alta volatilidade de
   prompts sem quebrar o código da aplicação.

## O Paradigma: Da Versão de Código à Versão de Comportamento

A mudança fundamental é que o "código-fonte" tradicional (Python, TS, Go)
tornou-se apenas o *runner*. A lógica de negócio real reside nos prompts e no
modelo.

| Elemento                | Engenharia Tradicional   | Engenharia de IA (SWEBOK-AI)             |
| :---------------------- | :----------------------- | :--------------------------------------- |
| **Fonte da Verdade**    | Repositório Git (código) | Tupla (Prompt + Modelo + Params + Dados) |
| **Dependência Externa** | Bibliotecas (npm, pip)   | Modelos Foundation (API) e Vector Stores |
| **Ciclo de Vida**       | Weeks/Months (Releases)  | Hours/Days (Prompt Tuning)               |
| **Determinismo**        | Alto                     | Baixo (exige rastreabilidade total)      |

## Conteúdo Técnico

### 2.1 A Tupla de Configuração (The Configuration Tuple)

Não versione prompts isoladamente. Um prompt otimizado para `gpt-4` pode falhar
catastroficamente no `gpt-4-turbo`. A unidade mínima de release deve ser a Tupla
de Configuração:

$$ C = { P, M, \\theta, D } $$

Onde:

- **$P$ (Prompt):** O template do prompt (system message, few-shot examples).
- **$M$ (Modelo):** O ID exato do modelo (ex: `gpt-4-0613`, nunca apenas
  `gpt-4`).
- **$\\theta$ (Parâmetros):** Temperatura, `top_p`, `max_tokens`,
  `presence_penalty`.
- **$D$ (Dados/Contexto):** Hash do snapshot do índice vetorial ou versão do
  esquema de dados.

#### Implementação em Código

Represente a tupla como um arquivo de configuração (YAML/JSON) versionado no
Git, não como constantes espalhadas no código.

```yaml
# config/prompts/summarizer/v1.2.0.yaml
meta:
  id: "summarizer-legal"
  version: "1.2.0"
  author: "eng-team"
  created_at: "2026-02-04"

model:
  provider: "openai"
  name: "gpt-4-0613" # PINNED VERSION. Nunca use "latest".
  parameters:
    temperature: 0.2
    max_tokens: 500

prompt:
  template_path: "./templates/summarizer_v1.j2"
  hash: "sha256:a1b2c3..." # Integridade garantida

context:
  vector_store_collection: "legal_docs_v4"
  retrieval_strategy: "hybrid-search"
```

### 2.2 Estratégias de Branching para Prompts

Prompts mudam mais rápido que o código da aplicação. Misturar o ciclo de vida de
ambos no mesmo branch `main` gera ruído e releases desnecessários da aplicação.

#### Estratégia A: Monorepo com Release Independente

O código da aplicação consome prompts como "configuração externa".

- Prompts vivem em `/prompts`.
- Mudanças em `/prompts` disparam pipelines de avaliação (LLM-as-a-Judge), mas
  não necessariamente redeploy da aplicação se houver *hot-reloading*.

#### Estratégia B: Prompts como Dependência (Library)

Prompts são versionados em um repositório separado e consumidos como um pacote
(ex: `npm install @company/prompts@1.4.2`).

- **Pró:** Garante imutabilidade e versionamento semântico estrito.
- **Contra:** *Developer Experience* ruim (muito atrito para iterar).

**Recomendação:** Use Estratégia A para desenvolvimento rápido, migrando para B
apenas quando houver múltiplos serviços consumindo os mesmos prompts.

### 2.3 Ferramentas: Git vs. MLOps Tools

Não compre uma bazuca para matar uma mosca.

#### Git Puro

- **Uso:** Prompts (texto), Configurações (YAML), Testes de Regressão.
- **Vantagem:** Desenvolvedores já sabem usar. Integração nativa com CI/CD. Diff
  visual funciona.
- **Limite:** Péssimo para binários (modelos locais) e datasets grandes.

#### DVC (Data Version Control)

- **Uso:** Versionamento de datasets (arquivos CSV, JSONL, Parquet) e modelos
  locais (`.gguf`, `.pt`).
- **Filosofia:** "Git para dados". Mantém metadados no Git, dados no S3/GCS.
- **Recomendação:** Obrigatório se você treina/fina-tuna modelos ou gerencia
  índices vetoriais locais.

#### MLFlow / Weights & Biases

- **Uso:** Rastreamento de *experimentos*, não necessariamente versionamento de
  *código de produção*.
- **Papel:** Registrar qual Tupla gerou qual resultado durante a fase de
  desenvolvimento/teste.

## Considerações Práticas

### O Problema do "Context Drift"

Seu prompt não mudou. Seu modelo não mudou. Mas a resposta mudou. Por quê? O
contexto mudou. O documento recuperado pelo RAG hoje é diferente do de ontem.

**Solução:**

1. **Versionamento de Ingestão:** Cada documento ingerido deve ter timestamp e
   hash.
2. **Snapshot de Teste:** Seus testes de regressão devem rodar contra um *banco
   de vetores estático* (mockado ou congelado), não contra o banco de produção
   vivo.

### Armadilhas Comuns (Anti-Patterns)

1. **"Latest" Tag:** Usar `gpt-4` ou `claude-3-opus` sem fixar a versão
   específica. O provedor atualiza o modelo, seu sistema quebra, e você não sabe
   por quê.
2. **Prompt no Banco de Dados:** Guardar prompts em tabelas SQL sem histórico de
   Git. Você perde diff, blame, code review e CI/CD. Prompts são código, não
   dados de usuário.
3. **Secrets no Prompt:** Commitar chaves de API ou PII (Informação Pessoal
   Identificável) dentro de exemplos *few-shot* no prompt.

## Checklist Prático: O que fazer amanhã

1. [ ] **Auditoria de Versões:** Verifique todas as chamadas de LLM. Substitua
   aliases genéricos (`gpt-4`) por versões fixas (`gpt-4-0613`).
2. [ ] **Extração de Prompts:** Mova prompts hardcoded em strings para arquivos
   de template externos.
3. [ ] **Configuração Centralizada:** Crie um arquivo YAML/JSON que defina a
   Tupla (Prompt, Modelo, Params) para cada funcionalidade.
4. [ ] **Setup de DVC (Opcional):** Se você gerencia datasets locais para
   *few-shot* ou *fine-tuning*, inicie um projeto DVC.
5. [ ] **Pipeline de CI:** Configure o CI para que qualquer mudança em arquivos
   de prompt dispare um teste de regressão básico (ex: verificar se o JSON de
   saída continua válido).

## Exemplo Mínimo: GitOps Flow

**Cenário:** Melhorar a sumarização jurídica.

1. **Branch:** `feat/improve-legal-summary`.
2. **Change:**
   - Edita `prompts/legal_summary.j2`.
   - Ajusta `config/legal_summary.yaml` (aumenta `temperature` para 0.3).
3. **Commit:** "feat: refine legal summary prompt & bump temp".
4. **CI (Automático):**
   - Detecta mudança em `config/legal_summary.yaml`.
   - Roda `evals/run_legal_benchmark.py` usando a nova configuração.
   - Compara métricas com a `main`.
5. **Merge:** Se métricas > baseline, merge.
6. **Deploy:** O sistema carrega a nova configuração automaticamente.

## Resumo Executivo

- **Tupla é Lei:** Nunca versione o prompt sozinho. Versione Prompt + Modelo +
  Parâmetros + Referência de Dados.
- **Git é a Base:** Trate prompts como código (Code Review, Diff, CI). Não
  esconda prompts em bancos de dados.
- **Imutabilidade:** Modelos de terceiros mudam silenciosamente. Use versões
  pinadas (pinned versions).
- **Contexto é Dependência:** Testes confiáveis exigem dados estáticos. Versione
  seus datasets de teste.
- **Separe Ciclos:** Prompts mudam rápido; infraestrutura muda devagar.
  Desacople seus deploys.

## Matriz de Avaliação

| Critério                          | Avaliação | Justificativa                                                              |
| :-------------------------------- | :-------- | :------------------------------------------------------------------------- |
| **Maturidade da Prática**         | Alta      | GitOps é padrão de mercado; a adaptação para IA é direta.                  |
| **Complexidade de Implementação** | Média     | Exige disciplina, mas pouca infraestrutura nova além do Git.               |
| **Impacto na Confiabilidade**     | Crítico   | Sem isso, o comportamento do sistema é não-determinístico e não auditável. |
| **Custo Operacional**             | Baixo     | Custo marginal sobre o processo de dev existente.                          |

## Referências

1. **GitOps Principles**. OpenGitOps. <https://opengitops.dev/>
2. **MLflow Model Registry**. Databricks.
   <https://mlflow.org/docs/latest/model-registry.html>
3. **DVC (Data Version Control)**. Iterative.ai. <https://dvc.org/>
4. **The Twelve-Factor App**. Config. <https://12factor.net/config>

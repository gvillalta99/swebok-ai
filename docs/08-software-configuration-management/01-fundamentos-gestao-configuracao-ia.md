---
title: 01 - Fundamentos de Gestão de Configuração com IA
created_at: '2025-01-31'
tags: [configuracao, scm, fundamentos, ia, versionamento, contexto]
status: draft
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# 1. Fundamentos de Gestão de Configuração com IA

## Visão Geral

Na engenharia de software tradicional, a Gestão de Configuração (SCM) garantia
que, se você tivesse o mesmo código-fonte e o mesmo ambiente, teria o mesmo
binário. Em sistemas baseados em IA, essa premissa de determinismo absoluto
desaparece.

A "configuração" deixa de ser apenas arquivos `.env` ou chaves de registro. Ela
se expande para incluir **prompts, pesos de modelos, parâmetros de inferência
(temperatura, top_p) e o estado da base de conhecimento (RAG)**. O desafio agora
não é apenas reconstruir o software, mas reconstruir o *comportamento* do
sistema em um momento específico.

Se você não controla a versão do modelo e o contexto injetado, você não tem um
produto de engenharia; tem uma loteria probabilística. Este capítulo define as
bases para trazer rigor de engenharia para sistemas estocásticos.

## Objetivos de Aprendizagem

Após estudar esta seção, você será capaz de:

1. **Redefinir Item de Configuração (CI)** para incluir artefatos
   não-determinísticos (prompts, embeddings, modelos).
2. **Diferenciar Reprodutibilidade Exata de Forense**, aplicando a estratégia
   correta para cada nível de risco.
3. **Implementar Rastreabilidade de Cadeia**, vinculando cada saída gerada aos
   seus insumos exatos (prompt + modelo + contexto).
4. **Mitigar o "Drift" Silencioso**, identificando quando mudanças externas (ex:
   atualização de API do modelo) alteram o comportamento do sistema sem mudança
   de código.

## Paradigma Shift

A transição para AI Engineering exige uma mudança fundamental no que
consideramos "estado do sistema".

| Aspecto             | SCM Tradicional (v4)                  | SCM para IA (v5)                                                  |
| :------------------ | :------------------------------------ | :---------------------------------------------------------------- |
| **Foco Principal**  | Código-fonte e dependências de build. | Cadeia de decisão: Código + Prompt + Modelo + Contexto.           |
| **Determinismo**    | Binário: mesma entrada = mesma saída. | Probabilístico: mesma entrada ≈ saída semanticamente similar.     |
| **Versionamento**   | Git SHA do código.                    | Tupla: (Git SHA, Model ID, Prompt Hash, Vector DB Snapshot).      |
| **Debug**           | Reproduzir o erro localmente.         | "Reprodutibilidade Forense": reconstruir o contexto da falha.     |
| **Risco Principal** | Quebra de build ou bug lógico.        | Alucinação, degradação de performance e *drift* de comportamento. |

## Conteúdo Técnico

### 1. O Novo "Item de Configuração" (CI)

No contexto de IA, um Item de Configuração (CI) é qualquer elemento que
influencia a probabilidade da saída. Se a alteração de um parâmetro muda a
resposta do sistema, esse parâmetro é um CI e deve ser gerido.

Os CIs essenciais em sistemas modernos de IA são:

1. **O Modelo (Inference Engine):** Não basta "GPT-4". É necessário o ID exato
   (ex: `gpt-4-0613`) ou o hash do peso do modelo local (ex: Llama-3
   quantizado). Modelos mudam ou são depreciados; depender de tags flutuantes
   como "latest" é erro operacional grave.
2. **O Prompt (Instrução):** Prompts são código. Devem ser versionados,
   revisados (code review) e testados. Alterar uma vírgula no System Prompt pode
   degradar a performance em 10%.
3. **Hiperparâmetros de Inferência:** `temperature`, `top_p`,
   `frequency_penalty`. Uma temperatura de 0.0 vs 0.7 cria sistemas
   fundamentalmente diferentes.
4. **Contexto (RAG/Knowledge Base):** Se seu sistema usa RAG, o conteúdo do
   banco vetorial é parte da configuração. Uma resposta correta hoje pode virar
   uma alucinação amanhã se o documento de referência for alterado ou removido.

### 2. Reprodutibilidade: Do Bit ao Comportamento

Em sistemas deterministas, buscamos **reprodutibilidade bit-a-bit**. Em IA, isso
é frequentemente impossível ou impraticável (devido a seeds aleatórias em GPUs,
ponto flutuante não-determinístico, etc.).

Adotamos três níveis de reprodutibilidade:

- **Nível 1: Exata (Ideal, mas rara):** Fixando a `seed` e o hardware, tentamos
  obter a mesma string de saída. Útil para testes unitários de prompts curtos
  (caching), mas frágil em produção.
- **Nível 2: Semântica (Padrão de Indústria):** A saída pode variar o texto, mas
  o *significado* e a *estrutura* (JSON schema, intenção) se mantêm. Validada
  por "LLM-as-a-Judge" ou validadores determinísticos.
- **Nível 3: Forense (Mínimo Aceitável):** Talvez não consigamos gerar a saída
  novamente, mas temos logs exatos de *como* ela foi gerada (quais chunks foram
  recuperados, qual prompt exato foi enviado). Permite auditoria e
  *post-mortem*.

### 3. Rastreabilidade da Cadeia de Execução

Para garantir governança, cada execução do sistema deve produzir um manifesto de
configuração. Isso permite responder: *"Por que o sistema ofendeu o usuário X às
14:30?"*

Exemplo de estrutura de log estruturado para rastreabilidade:

```json
{
  "execution_id": "evt_892304",
  "timestamp": "2026-02-04T10:00:00Z",
  "configuration": {
    "model_id": "claude-3-5-sonnet-20241022",
    "temperature": 0.2,
    "system_prompt_version": "v3.4.1-beta",
    "system_prompt_hash": "sha256:a1b2c3..."
  },
  "context_retrieval": {
    "vector_db_collection": "legal-docs-v2",
    "retrieved_chunks_ids": ["doc_123_chunk_4", "doc_99_chunk_1"],
    "similarity_scores": [0.89, 0.75]
  },
  "input": {
    "user_query_hash": "sha256:..."
  },
  "output_metadata": {
    "finish_reason": "stop",
    "latency_ms": 1450,
    "tokens_input": 450,
    "tokens_output": 120
  }
}
```

## Considerações Práticas

### Checklist Prático (O que fazer amanhã)

- [ ] **Eliminar tags "latest"**: Fixe versões específicas de modelos em todos
  os ambientes (dev/hml/prod).
- [ ] **Versionar Prompts como Código**: Mova prompts do banco de dados ou
  variáveis de ambiente para arquivos no Git (ou use um Prompt Registry
  dedicado).
- [ ] **Logar Parâmetros de Inferência**: Garanta que seus logs de aplicação
  registrem temperatura e configurações de modelo junto com a requisição.
- [ ] **Snapshot de RAG**: Para releases críticos, crie um snapshot imutável dos
  índices do banco vetorial.
- [ ] **Testes de Regressão Semântica**: Implemente um pipeline que verifica se
  mudanças no prompt não quebraram comportamentos anteriores (usando avaliações
  sintéticas).

### Armadilhas Comuns (O que evitar)

1. **Configuração Oculta no Código**: Hardcodar `temperature=0.7` dentro da
   chamada da API. Isso impede ajustes rápidos sem deploy.
2. **Ignorar a Volatilidade de APIs**: Assumir que o modelo `gpt-4` de hoje é
   igual ao de ontem. Provedores fazem atualizações silenciosas que alteram a
   "personalidade" do modelo.
3. **Tratar RAG como Banco de Dados Comum**: Esquecer que inserir um documento
   novo pode "poluir" a busca semântica e degradar respostas antigas.
4. **Falta de Rastreabilidade de Custo**: Não associar o consumo de tokens à
   feature ou equipe específica, tornando o TCO (Total Cost of Ownership) opaco.

## Resumo

1. **Configuração é Comportamento**: Em IA, configurar é definir a personalidade
   e os limites do sistema, não apenas caminhos de arquivos.
2. **Incerteza Gerenciada**: Aceite que o determinismo absoluto acabou. Foque em
   **reprodutibilidade forense** e consistência semântica.
3. **Cadeia de Custódia**: Você precisa provar *como* uma decisão foi tomada.
   Logs detalhados de metadados (modelo, prompt, contexto) são obrigatórios, não
   opcionais.
4. **Governança de RAG**: O conhecimento que o modelo acessa é parte da
   configuração. Versionar dados é tão crítico quanto versionar código.
5. **Cultura de Experimentação Controlada**: SCM em IA deve permitir iteração
   rápida em prompts, mas com *guardrails* rígidos para promoção a produção.

## Matriz de Avaliação

| Critério                        | Descrição                               | Avaliação                                                                                                         |
| :------------------------------ | :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta prática será obsoleta em 36 meses? | **Baixa**. O princípio de controlar variáveis de inferência permanecerá, mesmo que as ferramentas mudem.          |
| **Custo de Verificação**        | Quanto custa validar esta atividade?    | **Médio**. Exige infraestrutura de logs robusta e ferramentas de avaliação semântica.                             |
| **Responsabilidade Legal**      | Quem é culpado se falhar?               | **Crítica**. Sem rastreabilidade de configuração, é impossível defender a empresa em casos de viés ou erro grave. |

## Referências

1. **Google**. *Machine Learning Ops (MLOps): Configuration Management*. Google
   Cloud Architecture Center.
2. **Microsoft**. *Reproducible AI with Azure Machine Learning*. Microsoft
   Learn.
3. **Sculley, D., et al.** *Hidden Technical Debt in Machine Learning Systems*.
   NIPS, 2015. (O paper seminal sobre "Configuration Debt").
4. **ISO/IEC**. *ISO/IEC 42001:2023 Information technology — Artificial
   intelligence — Management system*.

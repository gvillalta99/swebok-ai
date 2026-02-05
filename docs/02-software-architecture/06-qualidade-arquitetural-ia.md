---
title: Qualidade Arquitetural em Sistemas com IA
created_at: '2026-01-31'
tags: [arquitetura, qualidade, atributos-qualidade, nao-determinismo, sistemas-ia]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Qualidade Arquitetural em Sistemas com IA

## Overview

Em sistemas tradicionais, otimizamos para **determinismo**: dado o input A,
queremos sempre o output B, no menor tempo possível. Em sistemas com IA
Generativa, otimizamos para **probabilidade**: dado o input A, queremos um
output B que seja "bom o suficiente", "seguro o suficiente" e "barato o
suficiente".

A introdução de LLMs na stack altera fundamentalmente a definição de qualidade.
Não se trata apenas de *uptime* ou *throughput*, mas de gerenciar a tensão
constante entre **Acurácia**, **Latência** e **Custo**. Você não pode ter os
três no máximo. A engenharia de software moderna torna-se a arte de gerenciar
esses trade-offs em tempo de execução.

## Learning Objectives

- **Internalizar o "Triângulo de Ferro da IA":** Compreender como Latência,
  Custo e Qualidade competem entre si.
- **Dominar novos atributos:** Explicabilidade, Robustez (segurança contra
  injeção), Justiça e Descartabilidade.
- **Operacionalizar o não-determinismo:** Como definir SLAs para sistemas que
  podem responder diferente a cada execução.
- **Projetar para a obsolescência:** Criar arquiteturas que sobrevivam à troca
  do modelo subjacente.

## 6.1 O Shift de Paradigma: Do Determinismo à Estocástica

A mudança mais brutal para engenheiros de software é aceitar que a função `f(x)`
pode retornar `y` hoje e `z` amanhã, mesmo com o mesmo código.

### O Novo Triângulo de Trade-offs

1. **Latência (Latency):** Não é mais medida em milissegundos, mas em segundos.
   O *Time to First Token* (TTFT) impacta a percepção, mas a geração total dita
   o throughput.
2. **Custo (Cost):** Em software tradicional, o custo é infraestrutura
   (CAPEX/OPEX fixo). Em IA, o custo é variável por transação (tokens). Uma
   feature mal otimizada pode falir o projeto se escalar.
3. **Qualidade (Quality/Accuracy):** A "inteligência" do modelo. Modelos maiores
   são mais inteligentes, mas mais lentos e caros.

> **Regra de Ouro:** A arquitetura deve permitir deslizar entre esses três
> vértices sem reescrever o código. Hoje você precisa de qualidade (GPT-4);
> amanhã, de velocidade (Llama-3-8B).

## 6.2 Atributos de Qualidade Essenciais

### 6.2.1 Explicabilidade e Rastreabilidade (Explainability)

Não basta o sistema dar a resposta certa; ele precisa provar *por que* deu
aquela resposta. Em ambientes regulados ou corporativos, uma "caixa preta" é um
risco jurídico.

- **Mecanismo:** Citações obrigatórias em RAG (Retrieval-Augmented Generation).
- **Métrica:** % de afirmações suportadas por documentos recuperados (Grounding
  Score).
- **Arquitetura:** Logs devem capturar não apenas o prompt e a resposta, mas os
  chunks de contexto recuperados e os metadados do modelo.

### 6.2.2 Robustez e Segurança (Robustez Adversária)

O input do usuário agora é código executável. *Prompt Injection* não é um bug, é
uma característica de como LLMs funcionam (instruction following).

- **Defesa:** Nunca confie no modelo para se policiar. Use camadas
  determinísticas (regex, classifiers menores) antes e depois do LLM.
- **Atributo:** Resistência a *Jailbreak* e vazamento de System Prompt.

### 6.2.3 Justiça e Alinhamento (Fairness)

Viés (bias) em modelos não é apenas um problema de RP; é um defeito funcional
que afeta a utilidade do produto. Se seu chatbot de RH rejeita currículos de
mulheres, seu software está *quebrado*, não apenas "enviesado".

- **Implementação:** Testes de regressão com datasets diversificados (Golden
  Datasets) para garantir que a performance é uniforme entre grupos
  demográficos.

### 6.2.4 Descartabilidade (Disposability) e Agnosticismo

Modelos de IA envelhecem como leite, não como vinho. O estado da arte muda a
cada 3 meses.

- **O Erro:** Acoplar o código a uma API específica (ex: `import openai`).
- **A Solução:** Padrão *Gateway/Router*. Sua aplicação fala com uma interface
  genérica; o Gateway decide se chama OpenAI, Anthropic ou um modelo local,
  baseado em custo/complexidade.
- **Teste de Fogo:** Se o GPT-5 for lançado amanhã, quanto tempo você leva para
  migrar? Se a resposta for > 1 dia, sua arquitetura falhou na descartabilidade.

### 6.2.5 Latência Cognitiva

A percepção de velocidade importa mais que a velocidade real.

- **Streaming:** Obrigatório para qualquer geração > 50 tokens.
- **Optimistic UI:** Mostre a intenção antes da ação.
- **Background Processing:** Se o usuário não precisa ver a resposta agora, mova
  para filas assíncronas.

## 6.3 Practical Considerations: Implementação

### Estratégias de Caching Agressivo

O request mais rápido e barato é aquele que você não faz ao LLM.

1. **Cache Exato:** Hash do prompt (raro funcionar devido à variabilidade do
   usuário).
2. **Cache Semântico:** Vector Search no banco de cache. Se a pergunta atual é
   95% similar a uma pergunta respondida ontem, sirva a resposta cacheada.

### Guardrails Determinísticos

Não peça para o LLM verificar se ele alucinou. Ele vai alucinar na verificação.

- Use código tradicional para validar saídas estruturadas (JSON Schema
  validation).
- Use listas de palavras proibidas (blocklists) simples e rápidas.

## Checklist Prático (O que fazer amanhã)

1. [ ] **Abstrair o Provider:** Implementar um padrão *Model Gateway* (ex:
   LiteLLM, MLflow) para não depender de um único vendor.
2. [ ] **Definir Orçamento de Tokens:** Estabelecer limites rígidos de custo por
   usuário/dia.
3. [ ] **Implementar Tracing:** Instalar ferramentas (LangSmith, Arize,
   Langfuse) para ver a cadeia completa de execução.
4. [ ] **Criar Dataset de Ouro:** Ter 50-100 pares de "Pergunta + Resposta
   Ideal" para rodar avaliações automáticas a cada deploy.
5. [ ] **Ativar Streaming:** Garantir que o frontend suporte *Server-Sent
   Events* (SSE) para respostas longas.
6. [ ] **Validar JSON:** Se o LLM gera JSON, o código deve falhar graciosamente
   se o JSON for inválido (e tentar corrigir automaticamente).
7. [ ] **Monitorar Feedback:** Botões de 👍/👎 na UI são a fonte mais barata de
   dados de qualidade.

## Armadilhas Comuns (Anti-patterns)

- **"O Modelo Resolve Tudo":** Tentar corrigir má arquitetura de dados com
  prompts melhores. Se o RAG não acha o documento, o GPT-4 não vai adivinhar o
  conteúdo.
- **Avaliação por "Vibe Check":** O desenvolvedor testa 3 vezes, acha legal e
  manda para produção. Isso não é engenharia, é sorte.
- **Ignorar a Latência de Cauda:** A média é 2s, mas o p99 é 45s. O usuário do
  p99 vai cancelar a conta.
- **Prompt no Código:** Hardcodar prompts dentro de arquivos `.py` ou `.ts`.
  Prompts são configuração/dados, devem estar em gerenciadores de CMS ou banco
  de dados.
- **Over-engineering de Agentes:** Criar cadeias complexas de 10 passos
  autônomos. A taxa de erro se compõe (0.9 ^ 10 = 34% de sucesso). Prefira
  pipelines lineares e curtos.

## Exemplo Mínimo: Chatbot de Suporte Técnico

**Cenário:** Sistema de atendimento para um SaaS. **Desafio:** Reduzir custo sem
destruir a satisfação do cliente (CSAT).

**Decisão Arquitetural (Roteamento Dinâmico):**

1. **Camada 1 (Classificação - Modelo Local/Rápido):**

   - Modelo: DistilBERT ou Llama-3-8B (hospedado).
   - Função: Classificar a intenção. É "reset de senha" ou "erro complexo de
     API"?
   - Custo: ~$0.

2. **Camada 2 (Resolução Simples - Determinística):**

   - Se for "reset de senha", invocar script tradicional. Não usar LLM.
   - Resultado: 100% acurácia, latência mínima.

3. **Camada 3 (Resolução Complexa - Modelo SOTA):**

   - Se for "erro de API", chamar GPT-4o ou Claude 3.5 Sonnet com contexto RAG.
   - Custo: Alto. Latência: Alta.
   - Justificativa: O valor de resolver um bug complexo justifica o custo.

**Trade-off:** Aumentamos a complexidade do sistema (roteador + 2 caminhos) para
reduzir o custo operacional em 80% e manter a qualidade onde importa.

## Resumo Executivo

- **Qualidade é Multidimensional:** Em IA, você negocia Acurácia por Latência ou
  Custo. Defina o que é inegociável para seu caso de uso.
- **Não-Determinismo é Feature:** Aceite que o sistema é probabilístico.
  Construa guardrails e validações ao redor do modelo, não dentro dele.
- **Observabilidade é Crítica:** Você não pode corrigir o que não vê. Logs de
  texto simples não servem; você precisa de *traces* de execução de LLM.
- **Descartabilidade:** Sua arquitetura deve sobreviver à morte do modelo que
  você usa hoje.
- **Human-in-the-loop:** Para processos críticos, a IA propõe, o humano dispõe.

## Próximos Passos

- Aprofundar em **Verificação e Validação (KA 05)** para entender como testar o
  indeterminístico.
- Consultar **Economia de Engenharia (KA 15)** para calcular o TCO real de
  features baseadas em IA.
- Revisar **Engenharia de Restrições (KA 01)** para aprender a limitar o escopo
  do problema antes de chegar na arquitetura.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                                                               |
| :------------------------------ | :------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa**. Os princípios de trade-off (custo/latência/qualidade) são perenes, mesmo que os modelos mudem.               |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto**. Exige monitoramento constante e *Golden Datasets* atualizados.                                                |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítica**. Alucinações e vieses podem gerar passivos reais. A arquitetura deve prover auditabilidade (logs e traces). |

## References

1. Huyen, C. (2024). *Designing Machine Learning Systems*. O'Reilly Media.
2. Google. (2025). *People + AI Guidebook*.
3. OpenAI. (2025). *Production Best Practices for LLMs*.
4. Fowler, M. (2024). *Testing Non-Deterministic Systems*. martinfowler.com.
5. Wei, J., et al. (2023). *Chain-of-Thought Prompting Elicits Reasoning in
   Large Language Models*. NeurIPS.

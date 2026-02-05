---
title: Planejamento de Operações em Escala
created_at: '2026-01-31'
tags: [operacoes, planejamento, escala, sre, capacity-planning]
status: review
updated_at: '2026-02-04'
ai_model: openai/gpt-5.2
---

# 2. Planejamento de Operações em Escala

## Contexto

Escalar sistemas de IA não é apenas adicionar instâncias EC2 atrás de um Load
Balancer. Em sistemas tradicionais, o gargalo é CPU/RAM e a resposta é
determinística. Em sistemas de IA, o gargalo é a **latência de inferência** e o
custo escala linearmente (ou exponencialmente) com o uso, não com a
infraestrutura fixa.

O erro mais comum de engenharia é tratar APIs de LLM como bancos de dados
lentos. Elas não são. São motores de computação estocástica onde cada requisição
custa dinheiro direto (tokens) e tempo variável. Operar em escala exige
abandonar o foco puramente em RPS (Requests Per Second) para gerenciar TPM
(Tokens Per Minute), TTFT (Time To First Token) e Unit Economics rigoroso. Se
você escalar sem controlar a margem de contribuição por token, o sucesso do
produto quebrará a empresa.

## Engenharia de Inferência e Tokenomics

### 1. A Nova Unidade de Custo: Tokenomics

Esqueça o custo por servidor. A métrica vital é o **Custo por Interação
Bem-Sucedida**. O Paradoxo de Jevons aplica-se brutalmente aqui: quanto mais
barato e rápido o modelo, mais você o usará, aumentando o custo total.

- **Input vs. Output:** Tokens de saída são significativamente mais caros e
  lentos que tokens de entrada. Otimizar prompts para respostas concisas não é
  apenas UX, é sobrevivência financeira.
- **Margem de Contribuição:** Cada feature baseada em IA deve ter um teto de
  custo. Se um resumo de e-mail custa $0.01 e o usuário paga $10/mês, você tem
  um limite rígido de uso.
- **Monitoramento de Custos em Tempo Real:** O faturamento mensal da
  OpenAI/Anthropic não serve para operações. Você precisa de *cost tracking* por
  tenant/usuário em tempo real para disparar *circuit breakers* financeiros.

### 2. Latência: TTFT vs. Latência Total

Em LLMs, a latência não é um número único.

- **TTFT (Time To First Token):** O tempo até o primeiro caractere aparecer.
  Crítico para percepção de velocidade (UX). Depende da carga do provedor e do
  processamento do prompt.
- **Throughput (Tokens/s):** A velocidade de geração do texto. Depende do modelo
  e da quantização.
- **Latência Total:** TTFT + (Tokens de Saída / Throughput).

**Regra de Ouro:** Para interações humanas, otimize TTFT (streaming). Para
processos batch, otimize Throughput e Custo.

### 3. Padrões de Arquitetura para Escala

#### A. Cache Semântico (Semantic Caching)

O cache tradicional (Redis chave-valor) é inútil para LLMs, pois "Como resetar a
senha?" e "Esqueci minha senha, como troco?" são chaves diferentes para a mesma
intenção.

O Cache Semântico usa **Embeddings + Banco Vetorial**:

1. Converte a query do usuário em vetor.
2. Busca no cache vetorial (ex: Redis VSS, Qdrant) por vetores similares
   (distância de cosseno > 0.95).
3. Se encontrar, retorna a resposta cacheada.
4. **Ganho:** Redução de latência de 2s para 50ms e custo zero de inferência
   LLM.

#### B. Model Tiering (Router Pattern)

Não use um canhão (GPT-4, Claude Opus) para matar uma mosca (classificação de
texto, saudação). Implemente um **LLM Gateway** que roteia requisições:

- **Tier 1 (Instantâneo/Barato):** Modelos locais ou ultra-rápidos (Haiku,
  Llama-3-8B, Mixtral) para tarefas simples, classificação e rejeição de inputs
  maliciosos.
- **Tier 2 (Raciocínio Complexo):** Modelos SOTA (GPT-4o, Sonnet 3.5) apenas
  quando o Tier 1 falha ou detecta alta complexidade.

#### C. Rate Limiting Inteligente

Limitar por "requisições/minuto" é perigoso. Um usuário pode enviar 1 requisição
de 100 tokens e outro de 100.000 tokens.

- **Token Bucket Algorithm:** O limite deve ser baseado em *Compute Units* ou
  *Tokens Estimados*.
- **Backpressure:** Quando o provedor (OpenAI) começa a dar erro 429, seu
  gateway deve segurar as requisições em fila ou degradar para um modelo menor,
  em vez de repassar o erro ao usuário.

## Checklist Prático

O que implementar antes de abrir o tráfego para 100k usuários:

1. [ ] **Implementar Cache Semântico:** Configurar Redis/Qdrant para interceptar
   queries repetidas.
2. [ ] **Configurar LLM Gateway:** Usar ferramentas como LiteLLM, Portkey ou
   solução própria para roteamento entre modelos.
3. [ ] **Definir Orçamento por Tenant:** Hard limit de gastos diários por
   cliente/usuário.
4. [ ] **Sanitização de Input/Output:** Bloquear prompts gigantescos (ataque de
   DoS financeiro) antes de chegarem ao LLM.
5. [ ] **Fallback Strategy:** Se a OpenAI cair, o tráfego muda automaticamente
   para Anthropic ou Azure?
6. [ ] **Streaming por Padrão:** Habilitar streaming no frontend para mascarar a
   latência de inferência.
7. [ ] **Monitoramento de TTFT:** Alertas se o tempo para o primeiro token
   exceder 2s.
8. [ ] **Traceability:** Cada requisição deve ter um ID único que rastreia:
   Prompt, Resposta, Custo, Modelo Usado, Latência.
9. [ ] **Retry com Exponential Backoff:** Nunca retentar imediatamente em caso
   de falha de API.

## Armadilhas Comuns

- **Otimização Prematura de Prompt:** Gastar semanas economizando 5 tokens no
  prompt enquanto ignora que 30% das chamadas são duplicadas e poderiam ser
  cacheadas.
- **Ignorar o Context Window:** Enviar todo o histórico de chat a cada
  requisição. O custo cresce quadraticamente. Use janelas deslizantes ou
  sumarização de contexto.
- **Dependência de Modelo Único:** Construir o produto "hardcoded" para GPT-4.
  Quando o preço muda ou a latência piora, você está refém.
- **Logar PII em Prompts:** Enviar dados sensíveis de clientes para APIs de
  terceiros sem anonimização prévia.
- **Timeout Fixo:** Configurar timeout de 30s para todas as chamadas. LLMs
  variam muito; use timeouts dinâmicos baseados na estimativa de tokens de
  saída.

## Exemplo Mínimo: Router de Suporte ao Cliente

**Cenário:** Chatbot de atendimento para e-commerce.

**Problema:** Usar GPT-4 para tudo custa $0.03/ticket. Com 1M tickets/mês, o
custo é $30k, inviabilizando a operação.

**Solução (Router Pattern):**

```python
# Pseudocódigo de Roteamento Simplificado

def handle_support_request(user_query):
    # 1. Check Cache Semântico (Custo ~$0.0001, Latência 20ms)
    cached_response = semantic_cache.search(user_query, threshold=0.95)
    if cached_response:
        return cached_response

    # 2. Classificação de Complexidade (Modelo Local/Pequeno - Custo ~$0.0005)
    # Usa um modelo rápido para decidir a intenção
    intent = fast_model.classify(user_query, categories=["status_pedido", "devolucao", "complexo"])

    if intent == "status_pedido":
        # Execução Determinística (Zero IA generativa cara)
        return db.get_order_status(user_id)

    elif intent == "devolucao":
        # Modelo Intermediário (GPT-3.5/Haiku - Custo ~$0.002)
        response = mid_model.generate(user_query, context="policy_returns")

    else:
        # Modelo Avançado (GPT-4/Opus - Custo ~$0.03)
        # Apenas para casos complexos/emocionais
        response = smart_model.generate(user_query)

    # 3. Atualiza Cache
    semantic_cache.add(user_query, response)
    return response
```

**Resultado:** Redução de 80% no custo mensal e queda de 60% na latência média.

## Resumo Executivo

- **Escala é Economia:** Em IA, performance técnica e custo financeiro são a
  mesma métrica. Otimizar tokens é otimizar margem.
- **Cache é Obrigatório:** O Cache Semântico é a única forma de quebrar a
  barreira física da latência de inferência.
- **Não Case com Modelos:** Use um Gateway. O modelo SOTA de hoje é o legado de
  amanhã. Sua infraestrutura deve ser agnóstica.
- **Defesa em Profundidade:** Proteja seu orçamento com rate limits baseados em
  tokens e sanitização de inputs.
- **Observabilidade Granular:** Você precisa saber exatamente qual feature do
  produto está consumindo seu orçamento de IA.

## Próximos Passos

- Implementar **FinOps para IA** (tags de custo por feature).
- Estudar **RAG Avançado** para reduzir o tamanho dos prompts (injetar apenas
  contexto relevante).
- Avaliar **Fine-tuning** de modelos pequenos (SLMs) para substituir modelos
  grandes em tarefas repetitivas.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                                     |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — A gestão de inferência e custos será necessária enquanto houver custo por token. As ferramentas mudam, o princípio econômico não. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Médio** — Requer monitoramento contínuo e análise de logs para garantir que o roteamento não está degradando a qualidade.                   |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Alta** — Alucinações em escala ou vazamento de dados via prompt são riscos corporativos graves.                                             |

## References

1. **"The Economics of Large Language Models"** - A16Z Infrastructure Analysis
   (2024).
2. **"Building LLM Applications for Production"** - Chip Huyen (2024).
3. **"Semantic Caching for LLMs"** - Redis / Qdrant Engineering Blogs.
4. **"Jevons Paradox in AI Efficiency"** - IEEE Software (2025).

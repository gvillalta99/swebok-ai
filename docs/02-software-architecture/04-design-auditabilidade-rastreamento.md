---
title: Design para Auditabilidade e Rastreamento
created_at: '2026-01-31'
tags: [arquitetura, auditabilidade, rastreamento, observability, compliance]
status: review
updated_at: '2026-02-04'
ai_model: gemini-3-pro-preview
---

# Design para Auditabilidade e Rastreamento

## Overview

Em engenharia de software tradicional, logs servem para entender *o que*
quebrou. Em sistemas baseados em IA, a auditabilidade serve para entender *por
que* o sistema funcionou (ou alucinou).

O princípio diretor é simples: **se você não consegue explicar por que a IA
tomou uma decisão, o sistema não está pronto para produção.**

A geração de código e texto tornou-se commodity; o capital real agora reside no
contexto e na rastreabilidade. Quando um agente autônomo executa uma ação
financeira ou toma uma decisão de triagem médica, "o modelo errou" não é uma
defesa jurídica aceitável. Precisamos de uma "caixa preta" de aviação para
software: um registro imutável, correlacionado e explicável de cada passo da
cadeia cognitiva.

## Learning Objectives

- **Dominar o padrão "Black Box Recorder"** para sistemas não-determinísticos.
- **Implementar IDs de correlação distribuídos** que atravessam fronteiras de
  prompts, modelos e vetores RAG.
- **Estruturar logs de "Chain of Thought" (CoT)** para tornar o raciocínio da IA
  auditável.
- **Diferenciar observabilidade técnica** (latência, tokens) de
  **observabilidade cognitiva** (raciocínio, contexto).

## Paradigma Shift

A transição de software determinístico para probabilístico exige uma mudança
fundamental na estratégia de logs e monitoramento.

| De (SWEBOK v4)      | Para (SWEBOK-AI v5)            |
| :------------------ | :----------------------------- |
| **Foco**            | Stack Traces e Códigos de Erro |
| **Unidade Atômica** | Request/Response HTTP          |
| **Causa Raiz**      | Bug no código (lógica)         |
| **Volume**          | Logs de exceção (esparso)      |
| **Meta**            | "O sistema está de pé?"        |

## Conteúdo Técnico

### 4.1 O Padrão "Black Box Recorder"

Sistemas de IA operam como caixas pretas funcionais. Para auditá-los, precisamos
envolver essa caixa preta em uma camada de instrumentação que capture não apenas
a entrada e saída, mas o *estado interno simulado* (o prompt e o contexto).

O padrão **Black Box Recorder** exige que cada interação com um LLM (Large
Language Model) seja tratada como uma transação financeira:

1. **Imutabilidade**: O log é *append-only*.
2. **Completeza**: O prompt exato (incluindo system prompt e contexto injetado)
   deve ser salvo.
3. **Assinatura**: O output gerado deve ser criptograficamente ligado ao input.

### 4.2 Identidade e Correlação (Traceability)

Em arquiteturas de agentes compostos (Compound AI Systems), uma única
solicitação do usuário pode disparar dezenas de chamadas a LLMs, buscas
vetoriais e execuções de ferramentas.

O uso de um `Trace-ID` simples não é suficiente. Precisamos de uma hierarquia:

- **Session ID**: A conversa inteira do usuário.
- **Interaction ID**: Um turno de pergunta/resposta.
- **Run ID**: Uma execução específica de uma chain ou agente.
- **Span ID**: Uma chamada atômica a um modelo ou ferramenta.

**Regra de Ouro**: O ID de correlação deve ser injetado nos metadados de *todas*
as chamadas, inclusive em bancos vetoriais. Se você recuperou um chunk de texto
do RAG, precisa saber *qual* query gerou aquela busca.

### 4.3 Logging de Cadeias Cognitivas (CoT)

Logs tradicionais registram eventos discretos ("User clicked button"). Logs de
IA devem registrar o *fluxo de pensamento*.

Se o modelo utiliza "Chain of Thought" (pensar passo-a-passo), esses passos
intermediários não são ruído; são a explicação da decisão. Eles devem ser
parseados e armazenados estruturadamente, não descartados.

**Estrutura recomendada:**

- `thought_process`: O raciocínio interno (ex: conteúdo dentro de tags
  `<thinking>`).
- `tool_plan`: A intenção de usar uma ferramenta.
- `tool_execution`: O resultado bruto da ferramenta.
- `final_answer`: A resposta apresentada ao usuário.

### 4.4 Rastreabilidade de RAG (Retrieval-Augmented Generation)

A maior fonte de alucinação em sistemas corporativos é contexto ruim. A
auditabilidade de RAG responde: "De onde você tirou isso?"

Para cada geração, o sistema deve persistir:

1. **Query Original**: O que o usuário pediu.
2. **Query Reescrita**: Como o LLM interpretou a busca.
3. **Chunks Recuperados**: IDs dos documentos, scores de similaridade e o texto
   exato usado.
4. **Atribuição**: Qual chunk específico influenciou qual parte da resposta (se
   possível).

## Practical Considerations

### Checklist Prático (O que fazer amanhã)

1. [ ] **Implementar Correlation IDs**: Garanta que *todo* log, do frontend ao
   banco vetorial, compartilhe um ID de transação.
2. [ ] **Persistir Prompts Completos**: Não logue apenas "prompt enviado". Logue
   o texto final montado, com variáveis substituídas.
3. [ ] **Sanitizar PII**: Configure filtros automáticos (ex: Presidio) para
   remover dados sensíveis *antes* de gravar o log, mas mantenha um hash para
   rastreio.
4. [ ] **Versionar Prompts**: Se o prompt mudou, o log deve indicar
   `prompt_v2.1`.
5. [ ] **Capturar Metadados de Custo**: Logue tokens de entrada/saída e modelo
   usado em cada chamada para cálculo de Unit Economics.
6. [ ] **Estruturar JSON**: Abandone logs de texto plano. Use JSON estruturado
   para tudo.
7. [ ] **Reter "Negative Samples"**: Logue explicitamente quando o "guardrail"
   bloqueou uma resposta. Isso é ouro para fine-tuning.

### Armadilhas Comuns

- **Logar apenas o input do usuário**: Ignorar o *System Prompt* e o contexto
  injetado torna impossível reproduzir o erro.
- **Descartar o "Raciocínio"**: Jogar fora o output intermediário (CoT)
  economiza tokens mas destrói a explicabilidade.
- **Confiar no determinismo**: Tentar reproduzir um bug rodando o mesmo prompt
  novamente. (Spoiler: O modelo vai responder diferente. Confie no log gravado,
  não na re-execução).
- **Logs Efêmeros**: Reter logs de IA por apenas 7 dias. Problemas de viés ou
  alucinação podem ser reportados meses depois.
- **Ignorar a Latência de Logging**: Gravar megabytes de contexto no banco
  relacional na thread principal. Use filas assíncronas (Fire-and-Forget).

### Exemplo Mínimo: Log Estruturado de Decisão

```json
{
  "timestamp": "2026-02-04T14:23:00Z",
  "trace_id": "evt_987234",
  "agent_version": "finance_advisor_v3",
  "input": {
    "user_query": "Posso comprar AAPL?",
    "context_retrieved_ids": ["news_882", "stock_aapl_q4"]
  },
  "reasoning": {
    "thought_chain": [
      "Usuário quer recomendação de investimento.",
      "Contexto mostra volatilidade alta em AAPL no Q4.",
      "Perfil do usuário é conservador (recuperado do CRM)."
    ],
    "safety_check": "PASS",
    "tool_calls": [
      { "tool": "get_stock_price", "args": "AAPL", "result": "185.50" }
    ]
  },
  "output": {
    "final_response": "Considerando seu perfil conservador e a volatilidade recente...",
    "disclaimer_appended": true
  },
  "meta": {
    "model": "gpt-4-turbo",
    "latency_ms": 2400,
    "tokens_total": 450,
    "cost_usd": 0.013
  }
}
```

## Summary

- **Contexto é Capital**: Em sistemas probabilísticos, o log do contexto é mais
  valioso que o código da aplicação.
- **Rastreabilidade Total**: IDs de correlação devem atravessar fronteiras de
  modelos, bancos vetoriais e ferramentas externas.
- **Black Box Recorder**: Grave tudo (input, contexto, raciocínio, output) como
  se fosse uma caixa preta de avião.
- **Observabilidade Cognitiva**: Monitore a qualidade do raciocínio, não apenas
  latência e erros 500.
- **Reproducibilidade é Ilusão**: Não conte com re-execução para debug. O log é
  a única fonte da verdade.

## Matriz de Avaliação

| Critério                        | Descrição                             | Avaliação                                                                                       |
| :------------------------------ | :------------------------------------ | :---------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos mudam, a necessidade de explicar decisões para humanos (e juízes) permanece. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Alto**. Armazenar e analisar logs massivos de texto é caro (storage + compute).               |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica**. Sem logs auditáveis, a empresa assume responsabilidade total por "caixa preta".    |

## References

1. **OpenTelemetry for LLMs**. (2025). "Semantic Conventions for GenAI
   Operations."
2. **Shokri, R., et al.** (2024). "Privacy Risks of Black-Box Models."
   *Proceedings of IEEE S&P*.
3. **Google SRE Book**. (2016). "Distributed Tracing and Monitoring." (Conceitos
   fundamentais aplicados).
4. **EU AI Act**. (2024). "Transparency and Record-Keeping Obligations for
   High-Risk AI Systems."

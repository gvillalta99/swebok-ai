---
title: 01. Fundamentos de Design na Era dos LLMs
created_at: '2025-01-31'
tags: [software-design, fundamentos, llm, ia, design-thinking]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Fundamentos do Design na Era dos LLMs

O design de software tradicional focava em decompor problemas em lógica
determinística. Na era dos LLMs, o foco muda para **Design for Auditability**
(Design para Auditabilidade). Você não projeta mais apenas o fluxo de dados, mas
as restrições e os mecanismos de verificação que impedem um modelo
probabilístico de causar danos. Se o seu sistema não for inspecionável por
design, ele é uma caixa preta inaceitável em produção.

## 1. Do Determinismo à Probabilidade Gerenciada

A engenharia de software clássica opera sob a premissa de que `f(x) = y` sempre.
Com LLMs, `f(x) ≈ y`. Essa incerteza fundamental exige uma mudança de
mentalidade: o design deixa de ser sobre a construção da lógica interna e passa
a ser sobre o encapsulamento dessa incerteza.

### O Princípio da Contenção

Um sistema bem projetado trata o LLM como um componente não confiável (untrusted
component), similar a uma entrada de usuário não sanitizada ou uma API externa
instável.

- **Isolamento:** O LLM nunca deve ter permissão de escrita direta em banco de
  dados de produção sem uma camada de validação intermediária.
- **Tipagem Forte:** Nunca aceite texto livre como saída estrutural. Force JSON
  schemas ou gramáticas restritivas.
- **Falha Segura:** O design deve prever o que acontece quando o modelo alucina
  ou recusa a resposta. O sistema trava ou degrada graciosamente?

## 2. Prompts como Interfaces (API)

Tratar prompts como "arte" ou "conversa" é amadorismo. Em um sistema de
engenharia, **prompts são funções**. Eles possuem assinatura de entrada, esquema
de saída e contratos de erro.

### Estrutura de um Prompt-Function

Um prompt bem desenhado deve ser versionado e tratado como código:

1. **Contexto Estático:** Instruções imutáveis (system prompt).
2. **Dados Dinâmicos:** As variáveis injetadas (user input, RAG context).
3. **Restrições de Saída:** O formato exato esperado (ex: JSON Schema).
4. **Exemplos (Few-Shot):** Casos de teste embutidos que definem o comportamento
   esperado.

Se você altera o prompt, você altera a API. Isso exige testes de regressão, pois
uma mudança na "entonação" do prompt pode quebrar o parser JSON na saída.

## 3. Design for Auditability (DfA)

A auditabilidade não é uma feature opcional; é o único mecanismo que permite a
operação segura de agentes autônomos. O sistema deve ser projetado para
responder: "Por que o agente tomou essa decisão?".

### Observabilidade Granular

Logs tradicionais (`INFO: Request received`) são inúteis para debugar
raciocínio. O design deve incluir:

- **Trace de Raciocínio:** Capturar o "pensamento" (Chain of Thought) do modelo
  separado da resposta final.
- **Input Snapshot:** O estado exato dos dados injetados no prompt no momento da
  execução.
- **Custo e Latência:** Métricas por chamada para monitorar viabilidade
  econômica (Token Economics).

## Checklist Prático de Design

Para qualquer novo componente que utilize LLMs, aplique este checklist antes de
escrever código:

1. **Definição de Fronteira:** Onde termina a lógica determinística (código) e
   começa a probabilística (LLM)? Mantenha a fronteira o mais estreita possível.
2. **Schema Enforcement:** Existe um schema rígido (Pydantic/Zod) para a saída
   do modelo? Se o modelo cuspir texto livre, o design está falho.
3. **Mecanismo de Retry:** O sistema sabe o que fazer se o JSON vier quebrado?
   (Ex: auto-correção ou fallback).
4. **Sanitização de Entrada:** Os dados do usuário são limpos antes de entrar no
   prompt para evitar *Prompt Injection*?
5. **Human-in-the-Loop (HITL):** Para ações de alto risco (ex: reembolso,
   delete), existe uma etapa de aprovação humana desenhada no fluxo?
6. **Cache Semântico:** O design prevê cache para perguntas repetidas,
   economizando custo e latência?
7. **Fallback Determinístico:** Se o LLM cair ou alucinar, existe um caminho de
   código tradicional ("if/else") que assume o controle?
8. **Rastreabilidade:** Consigo correlacionar uma resposta ruim ao prompt exato
   e versão do modelo que a gerou?

## Armadilhas Comuns (Anti-Patterns)

- **"O Modelo Resolve Tudo":** Tentar fazer o LLM executar lógica complexa
  (aritmética, datas) que código tradicional faz melhor e mais barato.
- **Prompt Spaghetti:** Concatenar strings gigantescas sem estrutura, tornando
  impossível debugar qual parte do contexto confundiu o modelo.
- **Confiança Cega no Contexto:** Assumir que o modelo leu e respeitou 100% dos
  100k tokens de contexto. O design deve priorizar a informação relevante
  (Reranking).
- **Falta de Timeout:** LLMs podem ficar em loop ou demorar 30s para responder.
  O design de interface (UI) deve lidar com essa latência assíncrona.
- **Vazamento de Abstração:** Expor o "pensamento" cru do modelo para o usuário
  final sem filtro.

## Exemplo Mínimo: Classificador de Suporte

**Cenário:** Um sistema que tria tickets de suporte e sugere respostas.

**Abordagem Ingênua (Ruim):** Um único prompt: "Leia este email e responda o
cliente educadamente."

- *Risco:* O modelo pode prometer reembolsos que não existem ou ofender o
  cliente. Não há controle.

**Abordagem de Engenharia (Bom):** O design divide o problema em etapas
discretas e auditáveis:

1. **Etapa 1 (Classificação):** Prompt focado apenas em categorizar o ticket
   (Financeiro, Técnico, Outros) -> Saída: Enum.
2. **Etapa 2 (Recuperação):** Código determinístico busca a política da empresa
   baseada na categoria (RAG).
3. **Etapa 3 (Geração):** Prompt recebe a política + ticket. Instrução: "Gere
   resposta baseada ESTRITAMENTE na política abaixo."
4. **Etapa 4 (Validação):** Um segundo modelo (ou regra de regex) verifica se a
   resposta contém palavras proibidas ou promessas de valores.
5. **Decisão:** Se confiança < 90% ou categoria = "Processo Jurídico", encaminha
   para humano. Caso contrário, envia rascunho.

*Trade-off:* Maior latência e custo (múltiplas chamadas), mas garante segurança
e consistência operacional.

## Resumo Executivo

- **Design é Restrição:** O papel do design mudou de construir lógica para
  construir cercas (guardrails) ao redor da IA.
- **Saída Estruturada é Lei:** Nunca trabalhe com texto livre internamente;
  force estruturas de dados tipadas.
- **Auditoria é Obrigatória:** Se você não pode explicar por que o sistema agiu
  de tal forma, não coloque em produção.
- **Prompts são Código:** Devem ser versionados, testados e monitorados como
  qualquer microserviço.
- **Hibridismo:** Use IA para o que ela é boa (intenção, criatividade, resumo) e
  código para o que ele é bom (lógica, cálculo, persistência).

## Próximos Passos

- Estudar **Engenharia de Restrições** para aprofundar em técnicas de validação
  de saída (KA 01).
- Implementar **Observabilidade de LLMs** (LLMOps) para monitorar custos e
  alucinações em tempo real.
- Revisar padrões de **Arquitetura de Agentes** para entender como orquestrar
  múltiplos modelos (KA 02).

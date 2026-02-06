---
title: Padrões de Design para Sistemas Híbridos
created_at: '2025-01-31'
tags: [software-design, design-patterns, sistemas-hibridos, human-in-the-loop, ai-gateway]
status: published
updated_at: '2025-01-31'
ai_model: gpt-4o
---

# Padrões de Design para Sistemas Híbridos

Sistemas Híbridos são aqueles que combinam software determinístico tradicional (código, banco de dados, regras de negócio rígidas) com componentes probabilísticos de IA (LLMs, modelos de difusão). O desafio do design não é fazer a IA funcionar, mas fazer o sistema **sobreviver** quando a IA falhar.

Abaixo estão os padrões arquiteturais fundamentais para construir robustez em cima de componentes não confiáveis.

## 1. The AI Gateway Pattern

**Problema:** Seu sistema não pode ficar acoplado diretamente a provedores de modelo (OpenAI, Anthropic, etc) porque as APIs mudam, os preços flutuam e a latência varia.

**Solução:** Uma camada de abstração (Gateway) que centraliza todas as chamadas de IA.

**Responsabilidades do Gateway:**
- **Roteamento Inteligente:** Direcionar prompts simples para modelos baratos (ex: gpt-3.5-turbo, haiku) e complexos para modelos caros (gpt-4, opus).
- **Rate Limiting & Caching:** Impedir que um loop infinito em um agente drene o orçamento da empresa. Cachear respostas idênticas (Semantic Cache).
- **Fallback Automático:** Se a OpenAI cair, o gateway chaveia transparentemente para a Anthropic ou Azure.
- **Auditoria:** Registrar input/output, latência e custo por token em um local centralizado.

> **Regra:** Nenhum serviço de negócio deve importar `openai` ou `langchain` diretamente. Eles devem chamar seu `InternalAIGateway`.

## 2. The Guardrails Pattern (Cercas de Proteção)

**Problema:** LLMs podem gerar conteúdo tóxico, formatar JSON errado ou revelar dados sensíveis (PII).

**Solução:** Envolver a chamada do LLM com interceptadores de entrada e saída.

- **Input Guardrail:** Verifica se o prompt contém dados sensíveis (PII) ou tentativas de injeção *antes* de enviar ao modelo.
- **Output Guardrail:** Valida a estrutura (Schema Validation) e o conteúdo (Content Filtering) *antes* de devolver à aplicação.

**Exemplo de Fluxo:**
1. App envia pedido.
2. **Input Rail:** Detecta CPF no prompt -> Mascara o CPF -> Envia ao LLM.
3. LLM processa e responde.
4. **Output Rail:** Verifica se é um JSON válido.
   - Se Sim: Devolve ao App.
   - Se Não: Aciona mecanismo de Retry (Self-Correction).

## 3. Human-in-the-Loop (HITL) Patterns

Para ações de alto risco, a automação total é irresponsável. O design deve prever a intervenção humana.

### A. The Review Queue (Fila de Revisão)
O agente gera o trabalho (ex: rascunho de email, PR de código) e o coloca em um estado `PENDING_REVIEW`. O sistema notifica um humano. O trabalho só é efetivado (enviado/mergeado) após o sinal `APPROVE` do humano.

### B. The Supervisor Pattern
Um modelo menor (ou regra determinística) monitora o agente principal. Se a confiança da resposta for baixa (< 80%) ou se detectar palavras-chave de risco ("não sei", "talvez"), ele escala automaticamente para um humano.

## 4. The Circuit Breaker for AI

**Problema:** Um agente entra em loop ou começa a alucinar massivamente, gerando custos altos ou dados corrompidos.

**Solução:** Monitoramento em tempo real que "abre o circuito" (corta o acesso à IA) se métricas de erro ou custo excederem um limiar.

- **Trigger:** 5 falhas consecutivas de JSON parse ou custo > $50 em 10 minutos.
- **Ação:** O sistema para de chamar o LLM e retorna uma resposta padrão ("Serviço temporariamente indisponível") ou usa uma heurística determinística simplificada.

## 5. Multi-Variant Generation (Votação)

**Problema:** LLMs são inconsistentes. Uma única resposta pode estar errada.

**Solução:** Gerar 3 variações da mesma resposta (temperature > 0) e usar um segundo passo para escolher a melhor (Majority Voting ou Best-of-N).

- Útil para: Geração de código (escolher o que compila), classificação complexa.
- Custo: Multiplica o custo de inferência por N. Use com parcimônia.

## Checklist Prático

- [ ] Tenho um Gateway centralizando as chamadas?
- [ ] Meus Guardrails bloqueiam saída malformada *antes* de quebrar a UI?
- [ ] Ações destrutivas (DELETE, PAY) exigem aprovação humana?
- [ ] O sistema funciona (degradado) se a API da IA cair?

## Armadilhas Comuns

- **Validar no Frontend:** Nunca confie que o frontend vai filtrar a resposta do LLM. Guardrails devem estar no backend.
- **Retry Infinito:** Configurar retries automáticos sem limite exponencial (backoff). Isso pode criar uma conta milionária em minutos se o modelo estiver "teimoso".
- **Esquecer o User Feedback:** Não capturar se o usuário aceitou ou rejeitou a sugestão da IA. Sem esses dados, você não consegue melhorar o sistema.

## Resumo Executivo

- **Defesa em Profundidade:** Não confie no modelo. Cerque-o de validadores.
- **Abstração é Segurança:** Use Gateways para não ficar refém de um fornecedor.
- **Falhe com Elegância:** O usuário prefere um erro claro do que uma alucinação confiante.
- **Humanos no Comando:** Automatize o rascunho, não a aprovação final em processos críticos.

## Próximos Passos

- Aplicar esses padrões no **Design de Componentes Determinísticos** (Próxima seção).
- Implementar métricas para monitorar a eficácia dos Guardrails (KA 12 - Software Quality).

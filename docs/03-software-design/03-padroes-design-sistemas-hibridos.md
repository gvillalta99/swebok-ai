---
title: Padrões de Design para Sistemas Híbridos
created_at: '2025-01-31'
tags: [software-design, design-patterns, sistemas-hibridos, human-in-the-loop, ai-gateway]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Padrões de Design para Sistemas Híbridos

Sistemas híbridos combinam componentes determinísticos (código, banco de dados,
regras de negócio) e componentes probabilísticos de IA (LLMs e modelos
generativos). O objetivo de design não é apenas maximizar acurácia, mas
preservar segurança, custo, auditabilidade e continuidade operacional quando o
componente de IA falha ou degrada.

A seguir, são apresentados padrões de design para robustez em sistemas com
componentes não determinísticos.

## 1. Padrão AI Gateway (Gateway de IA)

**Problema:** Seu sistema não pode ficar acoplado diretamente a provedores de
modelo (OpenAI, Anthropic, etc) porque as APIs mudam, os preços flutuam e a
latência varia.

**Solução:** Uma camada de abstração (Gateway) que centraliza todas as chamadas
de IA.

**Responsabilidades do Gateway:**

- **Roteamento por classe de capacidade:** Direcionar tarefas simples para
  modelos de menor custo e baixa latência; tarefas complexas para modelos de
  maior capacidade, com políticas explícitas de custo e SLA.
- **Rate Limiting & Caching:** Impedir que um loop infinito em um agente drene o
  orçamento da empresa. Aplicar cache semântico para respostas equivalentes.
- **Fallback Automático:** Se a OpenAI cair, o gateway chaveia transparentemente
  para a Anthropic ou Azure.
- **Auditoria:** Registrar input/output, latência e custo por token em um local
  centralizado.

> **Regra:** Nenhum serviço de negócio deve importar `openai` ou `langchain`
> diretamente. Eles devem chamar seu `InternalAIGateway`.

## 2. Padrão Guardrails (Cercas de Proteção)

**Problema:** LLMs podem gerar conteúdo tóxico, formatar JSON errado ou revelar
dados sensíveis (PII).

**Solução:** Envolver chamadas de IA com validações de entrada e saída, com
políticas explícitas de segurança e conformidade.

- **Guardrail de entrada:** Detecta e trata dados pessoais sensíveis, tentativas
  de prompt injection e instruções fora de política antes da inferência.
- **Guardrail de saída:** Valida esquema (JSON Schema), política de conteúdo e
  regras de negócio antes de retornar a resposta.

**Exemplo de Fluxo:**

1. App envia pedido.
2. **Guardrail de entrada:** Detecta CPF no prompt -> Mascara o CPF -> Envia ao
   LLM.
3. LLM processa e responde.
4. **Guardrail de saída:** Verifica se é um JSON válido.
   - Se Sim: Devolve ao App.
   - Se Não: Aciona correção controlada (retry limitado + fallback
     determinístico).

## 3. Human-in-the-Loop (HITL) Patterns

Para ações de alto risco, a automação total é irresponsável. O design deve
prever a intervenção humana.

### A. The Review Queue (Fila de Revisão)

O agente gera o trabalho (ex: rascunho de email, PR de código) e o coloca em um
estado `PENDING_REVIEW`. O sistema notifica um humano. O trabalho só é efetivado
(enviado/mergeado) após o sinal `APPROVE` do humano.

### B. The Supervisor Pattern

Um modelo de verificação (ou regra determinística) monitora o resultado do
agente principal com base em critérios objetivos: incerteza elevada, baixa
aderência ao esquema, risco regulatório ou impacto financeiro alto. Quando
qualquer limiar é excedido, o fluxo é escalado para revisão humana obrigatória.

## 4. The Circuit Breaker for AI

**Problema:** Um agente entra em loop ou começa a alucinar massivamente, gerando
custos altos ou dados corrompidos.

**Solução:** Monitoramento em tempo real que "abre o circuito" (corta o acesso à
IA) se métricas de erro ou custo excederem um limiar.

- **Trigger:** Violação de limiar de erro técnico (ex.: falhas de validação
  consecutivas), de custo por janela temporal ou de orçamento de erro (SLO).
- **Ação:** Interromper chamadas ao modelo, registrar evento de observabilidade
  e degradar para resposta segura padrão ou heurística determinística.

## 5. Geração Multiamostra e Consenso

**Problema:** LLMs são inconsistentes. Uma única resposta pode estar errada.

**Solução:** Gerar múltiplas amostras independentes e aplicar agregação por
consenso (majority vote) ou seleção por avaliador (best-of-N), com critérios
explícitos de qualidade e custo.

- Útil para: Geração de código (escolher o que compila), classificação complexa.
- Custo: Multiplica o custo de inferência por N. Use com parcimônia.

## Checklist Prático

- [ ] Tenho um Gateway centralizando as chamadas?
- [ ] Meus Guardrails bloqueiam saída malformada *antes* de quebrar a UI?
- [ ] Ações destrutivas (DELETE, PAY) exigem aprovação humana?
- [ ] O sistema funciona (degradado) se a API da IA cair?

## Armadilhas Comuns

- **Validar no Frontend:** Nunca confie que o frontend vai filtrar a resposta do
  LLM. Guardrails devem estar no backend.
- **Retry Infinito:** Configurar retries automáticos sem limite exponencial
  (backoff). Isso pode criar uma conta milionária em minutos se o modelo estiver
  "teimoso".
- **Esquecer o User Feedback:** Não capturar se o usuário aceitou ou rejeitou a
  sugestão da IA. Sem esses dados, você não consegue melhorar o sistema.

## Resumo Executivo

- **Defesa em Profundidade:** Não confie no modelo. Cerque-o de validadores.
- **Abstração é Segurança:** Use Gateways para não ficar refém de um fornecedor.
- **Falhe com Elegância:** O usuário prefere um erro claro do que uma alucinação
  confiante.
- **Humanos no Comando:** Automatize o rascunho, não a aprovação final em
  processos críticos.

## Próximos Passos

- Aplicar esses padrões no **Design de Componentes Determinísticos** (Próxima
  seção).
- Implementar métricas para monitorar a eficácia dos Guardrails (KA 12 -
  Software Quality).

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. TABASSI, E. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*.
   NIST AI 100-1, 2023. DOI: <https://doi.org/10.6028/NIST.AI.100-1>.
2. NIST. *AI RMF Playbook*. Disponível em:
   <https://airc.nist.gov/airmf-resources/playbook/>. Acesso em: 6 fev. 2026.
3. OWASP GenAI Security Project. *OWASP Top 10 for LLM Applications 2025*. 2024.
   Disponível em:
   <https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/>.
   Acesso em: 6 fev. 2026.
4. UNIÃO EUROPEIA. *Regulation (EU) 2024/1689 (Artificial Intelligence Act)*. OJ
   L, 12 jul. 2024. ELI: <http://data.europa.eu/eli/reg/2024/1689/oj>.
5. MICROSOFT. *Circuit Breaker pattern - Azure Architecture Center*. Atualizado
   em 21 mar. 2025. Disponível em:
   <https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker>.
   Acesso em: 6 fev. 2026.
6. NYGARD, M. *Release It! Design and Deploy Production-Ready Software*. 2. ed.
   Pragmatic Bookshelf, 2018. ISBN 9781680502398.
7. WANG, X. et al. *Self-Consistency Improves Chain of Thought Reasoning in
   Language Models*. ICLR 2023. arXiv:2203.11171.
8. ISO/IEC. *ISO/IEC 42001:2023 - Information technology - Artificial
   intelligence - Management system*. ISO, 2023.

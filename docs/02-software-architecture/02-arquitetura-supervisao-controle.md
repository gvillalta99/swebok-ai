---
title: Arquitetura de Supervisão e Controle
created_at: '2026-01-31'
tags: [arquitetura, supervisao, controle, human-in-the-loop, governanca, guardrails]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Arquitetura de Supervisão e Controle

## Contexto

Em sistemas tradicionais, a arquitetura define como os componentes interagem
para garantir performance e manutenibilidade. Em sistemas com IA Generativa, a
arquitetura assume uma nova função crítica: **contenção de danos**. LLMs são
motores probabilísticos de alucinação útil; sem supervisão, eles degradam
rapidamente para alucinação nociva. A arquitetura de supervisão não é um
"add-on" de qualidade; é a infraestrutura de segurança que permite que você
coloque modelos estocásticos em produção sem expor seu negócio a riscos
existenciais de responsabilidade civil ou operacional.

## Objetivos

- **Desacoplar a inteligência da execução**: Garantir que o modelo "pense", mas
  o sistema "aja" apenas sob regras determinísticas.
- **Implementar "Circuit Breakers Semânticos"**: Parar a execução não apenas
  quando o serviço cai, mas quando o *conteúdo* viola a lógica de negócio.
- **Definir a topologia de Human-in-the-Loop (HITL)**: Onde, quando e como
  humanos devem intervir sem se tornarem gargalos inviáveis.

## O Paradigma da Desconfiança Arquitetural

A premissa fundamental do SWEBOK-AI v5.0 é: **Não confie no modelo.**

Diferente de uma API REST que retorna erros previsíveis (400, 500), um LLM pode
retornar uma resposta sintaticamente perfeita, semanticamente plausível, mas
factualmente desastrosa. A arquitetura deve envelopar a IA com camadas de
controle determinístico.

| Camada                   | Função                      | Mecanismo                                |
| ------------------------ | --------------------------- | ---------------------------------------- |
| **Núcleo (IA)**          | Geração e Raciocínio        | LLM (Probabilístico)                     |
| **Camada 1: Guardrails** | Validação de Entrada/Saída  | Regex, Classificadores, Lógica Booleana  |
| **Camada 2: Supervisão** | Orquestração e Decisão      | Agentes Supervisores, Máquinas de Estado |
| **Camada 3: Controle**   | Execução e Efeito Colateral | APIs Determinísticas, Sandbox            |

______________________________________________________________________

## Conteúdo Técnico

### 1. Guardrails e Filtros Determinísticos

Guardrails são a primeira linha de defesa. Eles operam *antes* e *depois* da
chamada ao modelo.

- **Input Rails**: Higienização de prompts, detecção de injeção de prompt,
  verificação de PII (Personally Identifiable Information). Se o input é
  malicioso, o modelo nem é acionado.
- **Output Rails**: Validação estrutural (JSON schema), verificação de sintaxe
  de código, e filtros de conteúdo nocivo.
- **Syntactic vs. Semantic Rails**:
  - *Sintático*: "O JSON tem o campo `price`?" (Validável por schema).
  - *Semântico*: "O preço sugerido faz sentido para este produto?" (Requer um
    modelo menor ou lógica de negócio).

### 2. Circuit Breakers Semânticos

Em microserviços, um circuit breaker abre quando a latência sobe ou erros 500
explodem. Em IA, precisamos de **Circuit Breakers Semânticos**.

- **Detecção de Deriva**: Se um agente começa a repetir loops ou gerar respostas
  com baixa confiança sucessivamente, o circuito abre.
- **Mecanismo de Fallback**:
  1. *Degradação Graciosa*: Trocar para um modelo mais barato/rápido ou mais
     robusto.
  2. *Modo Determinístico*: Retornar uma resposta "hardcoded" segura ("Não pude
     processar sua solicitação, contate o suporte").
  3. *Escalonamento Humano*: Enviar para uma fila de revisão manual.

### 3. Padrões de Human-in-the-Loop (HITL)

A intervenção humana não é binária (tudo ou nada). Existem padrões arquiteturais
para diferentes níveis de risco:

- **Active Learning Loop**: O humano não aprova cada ação, mas revisa amostras
  (10% das interações) para rotular dados e retreinar o modelo.
- **Approval Gate (Portão de Aprovação)**: O sistema para antes de uma ação
  irreversível (ex: transferir dinheiro, enviar email em massa) e aguarda token
  de autorização.
- **Over-the-Shoulder (Copiloto)**: A IA sugere, o humano edita e envia. A
  responsabilidade final é 100% humana.

### 4. Agentes Supervisores

Para sistemas multi-agente, não deixe agentes conversarem livremente sem
mediação. Use um **Agente Supervisor**.

- **Função**: O Supervisor não executa tarefas. Ele apenas delega, revisa o
  output dos "workers" e decide se o critério de "Done" foi atingido.
- **Vantagem**: Mantém o contexto limpo e evita que agentes "workers" entrem em
  alucinação coletiva. O Supervisor tem um prompt focado estritamente em regras
  e validação.

______________________________________________________________________

## Checklist Prático

O que implementar amanhã na sua arquitetura:

1. [ ] **Validação de Schema Obrigatória**: Nenhuma saída de LLM entra no seu
   backend sem passar por um validador de JSON/XML rigoroso (ex: Pydantic, Zod).
2. [ ] **Timeout de Raciocínio**: Defina limites rígidos para loops de agentes
   (ex: máx 5 passos de pensamento).
3. [ ] **Sanitização de PII**: Implemente ferramentas (ex: Microsoft Presidio)
   para mascarar dados sensíveis *antes* de enviar ao LLM.
4. [ ] **Log de Auditoria Completo**: Grave não apenas o prompt/response, mas a
   versão do modelo, temperatura e latência de cada interação.
5. [ ] **Botão de Pânico**: Tenha um "kill switch" global que desativa
   funcionalidades de IA e reverte para interfaces manuais imediatamente.
6. [ ] **Testes de Regressão Semântica**: Crie um dataset de "Golden Prompts" e
   avalie se novas versões do prompt/modelo mantêm a qualidade.
7. [ ] **Rate Limiting por Usuário**: Impeça que um único usuário abuse do custo
   computacional da sua IA.
8. [ ] **Fallback para Regras**: Se o modelo falhar 3 vezes, o sistema deve cair
   para uma regra `if/else` segura, nunca crashar.

## Armadilhas Comuns

- **Confiar no "Self-Correction" do Modelo**: Pedir para o modelo "verificar se
  está certo" funciona às vezes, mas frequentemente gera uma segunda alucinação
  para justificar a primeira. Use validadores externos.
- **Guardrails Lentos**: Colocar um LLM lento para vigiar outro LLM lento dobra
  sua latência. Use modelos menores (ex: modelos de 7B ou BERT) ou regex para
  guardrails.
- **Fadiga de Aprovação**: Se você pede aprovação humana para tudo, os humanos
  vão clicar em "Aprovar" sem ler. Reserve HITL apenas para ações de alto risco.
- **Prompt Injection Ignorado**: Achar que "instruções do sistema" são
  invioláveis. Trate o prompt do usuário como input hostil (SQL Injection dos
  novos tempos).
- **Acoplamento Forte com o Modelo**: Espalhar chamadas específicas da API da
  OpenAI por todo o código. Use uma camada de abstração (Gateway) para poder
  trocar de modelo (OpenAI -> Anthropic -> Local) sem refatorar o sistema.

## Exemplo Mínimo: Sistema de Reembolso Automático

**Cenário**: Um bot analisa pedidos de reembolso de até R$ 500,00.

**Decisão Arquitetural**:

1. **Input Rail**: Verifica se o texto contém ofensas ou tentativas de
   engenharia social.
2. **Core**: LLM analisa a política de reembolso vs. a reclamação do cliente.
3. **Semantic Circuit Breaker**:
   - Se `valor > 500`: Encaminha para humano (Regra Determinística).
   - Se `confiança < 0.8`: Encaminha para humano.
   - Se `motivo = "fraude"`: Escala para time de segurança.
4. **Output Rail**: Garante que a resposta ao cliente seja empática e não
   prometa prazos irreais.
5. **Execução**: API de estorno só é chamada se todas as camadas acima passarem.

**Trade-offs**: Adiciona 400ms de latência e custo de tokens extras para
verificação, mas reduz risco de fraude automatizada e alucinação de políticas.

## Resumo Executivo

- **IA é Infraestrutura Não-Confiável**: Trate outputs de LLM como dados não
  sanitizados de usuários externos.
- **Determinismo > Probabilidade**: Envolva o núcleo probabilístico com camadas
  rígidas de lógica determinística (código tradicional).
- **Custo da Supervisão**: Supervisão humana é cara e lenta; use-a
  estrategicamente para "edge cases" e alto risco, não para o fluxo feliz.
- **Observabilidade é Segurança**: Você não pode controlar o que não vê. Logs
  detalhados de "pensamento" da IA são vitais para debug.
- **Defesa em Profundidade**: Use múltiplos modelos pequenos e especializados
  (validadores) em vez de confiar em um único modelo gigante para fazer tudo
  certo.

## Próximos Passos

- Implementar uma biblioteca de **Guardrails** (ex: Guardrails AI, NeMo
  Guardrails) no pipeline de CI/CD.
- Definir a **Matriz de Risco** da sua aplicação para categorizar quais features
  exigem HITL.
- Estabelecer métricas de **"Taxa de Intervenção"**: Qual % de transações requer
  ajuda humana? A meta é reduzir isso mantendo a segurança.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                          |
| ------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos ficarão melhores, mas a necessidade de governança e controle sobre sistemas autônomos aumentará, não diminuirá. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Alto**. Validar sistemas não-determinísticos exige infraestrutura complexa de testes e monitoramento humano.                     |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica**. A arquitetura de supervisão é a evidência legal de "due diligence" em caso de falhas catastróficas da IA.             |

## Referências

1. **NIST AI Risk Management Framework (AI RMF 1.0)**, National Institute of
   Standards and Technology, 2023.
2. **OWASP Top 10 for Large Language Model Applications**, OWASP Foundation,
   2025\.
3. Shankar, S., et al. "Operationalizing AI Guardrails." *IEEE Software*, vol.
   42, no. 3, 2025.
4. Google. "People + AI Guidebook: Patterns for Human-AI Interaction." Google
   Design, 2024.

---
title: "Separação de Concerns Críticos em Sistemas com IA"
created_at: "2026-01-31"
tags: ["arquitetura", "separacao-concerns", "critical-systems", "seguranca", "design-patterns"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# Separação de Concerns Críticos em Sistemas com IA

## Contexto
A engenharia de software tradicional foi construída sobre a premissa da redução de incerteza: mesmo input, mesmo output. A introdução de LLMs inverte essa lógica, trazendo componentes estocásticos (probabilísticos) para o coração de sistemas críticos. O erro mais comum em 2025/2026 é tratar chamadas de LLM como chamadas de API determinísticas. Sem uma separação rígida entre o "Núcleo Determinístico" (regras de negócio, transações) e a "Borda Probabilística" (IA), você cria sistemas impossíveis de testar, auditar e confiar. Este capítulo define como isolar o caos criativo da IA da ordem necessária para a operação do negócio.

## 3.1 O Novo Paradigma: Núcleo vs. Borda

A arquitetura de sistemas híbridos exige uma distinção mental e física entre dois mundos:

1.  **Núcleo Determinístico (The Trust Zone):** Onde a verdade reside. Bancos de dados SQL, cálculos fiscais, controle de acesso (RBAC), orquestração de estado. Aqui, 1 + 1 deve ser sempre 2.
2.  **Borda Probabilística (The Fuzzy Zone):** Onde a inferência ocorre. LLMs, RAG, classificação semântica. Aqui, 1 + 1 é "provavelmente 2, mas talvez uma metáfora para união".

**Regra de Ouro:** O Núcleo Determinístico nunca deve *depender* da Borda Probabilística para manter sua integridade. A IA é um plugin, não uma fundação.

## 3.2 O Padrão "Sanduíche de IA" (AI Sandwich)

A maneira mais segura de integrar LLMs é encapsulá-los completamente entre camadas determinísticas. O LLM nunca "vai buscar" dados e nunca "salva" dados diretamente. Ele apenas transforma texto A em texto B.

### Camada 1: Preparação Determinística (Bottom Bun)
Antes de invocar o modelo, o sistema coleta *todos* os dados necessários usando código tradicional.
*   **Responsabilidade:** Busca em DB, chamadas de API, verificação de permissões do usuário.
*   **Output:** Um contexto limpo, anonimizado e estruturado (JSON/XML) para o prompt.
*   **Por que:** Evita que a IA alucine dados ou tente acessar APIs com credenciais que não deveria ter.

### Camada 2: Processamento Probabilístico (The Meat)
O LLM recebe o contexto e a instrução. Ele opera em modo "puro" (sem efeitos colaterais).
*   **Responsabilidade:** Raciocínio, sumarização, extração, tradução.
*   **Restrição:** Zero acesso à rede, zero acesso ao disco. Apenas Input -> Processamento -> Output.
*   **Output:** Texto ou JSON estruturado sugerindo uma ação ou resposta.

### Camada 3: Validação e Atuação Determinística (Top Bun)
O código tradicional retoma o controle. Ele não confia cegamente na saída da Camada 2.
*   **Responsabilidade:** Parsing (Zod/Pydantic), validação de regras de negócio (ex: "o valor do reembolso não pode exceder R$ 500"), execução da ação (DB write).
*   **Por que:** Garante que, mesmo se a IA enlouquecer, o sistema não corrompa o estado da aplicação.

## 3.3 Isolamento de Efeitos Colaterais (Side Effects)

Um sistema robusto trata a IA como **Read-Only** ou **Suggest-Only**.

*   **Errado:** Dar ao agente uma *tool* `database.execute_sql(query)`. Isso é dar `sudo` para um estagiário alucinado.
*   **Certo:** O agente retorna uma *intenção* estruturada: `{"intent": "UPDATE_ADDRESS", "params": {"new_zip": "12345"}}`.
*   **Execução:** Um *handler* determinístico recebe essa intenção, valida se o CEP existe, se o usuário tem permissão para mudar o endereço, e então executa o SQL.

Isso reduz o "Blast Radius" (raio de explosão). Se o modelo for comprometido (Prompt Injection), o máximo que ele consegue fazer é gerar um JSON malformado que o validador rejeitará.

## Checklist Prático

O que implementar para garantir a separação:

1.  [ ] **Auditoria de Tools:** Remova qualquer ferramenta que permita à IA escrever diretamente em banco ou disco.
2.  [ ] **Protocolo de Intenção:** Converta todas as saídas de ação da IA em objetos de intenção (Command Pattern) que precisam ser processados por código determinístico.
3.  [ ] **Validação de Schema:** Use bibliotecas como Zod (TS) ou Pydantic (Python) para forçar a saída da IA a um formato estrito. Se falhar na validação, a IA não "agiu".
4.  [ ] **Sanitização de Input:** Nunca passe dados brutos do usuário (PII) para o prompt sem anonimização ou verificação de necessidade.
5.  [ ] **Timeout Rígido:** Processos probabilísticos podem entrar em loops. Defina timeouts curtos na camada de infraestrutura.
6.  [ ] **Log Dual:** Registre o *raw output* da IA (para debug) e a *ação validada* (para auditoria) separadamente.
7.  [ ] **Fallback Determinístico:** Se a camada de validação rejeitar a saída da IA 3 vezes, o sistema deve degradar para um erro padrão ou fluxo manual, não travar.

## Armadilhas Comuns

*   **O "God Prompt":** Tentar fazer a IA buscar dados, processar e salvar em uma única chamada. Quebre em etapas do Sanduíche.
*   **Confiança no `json_mode`:** O modo JSON dos LLMs garante a sintaxe, não a semântica. Um JSON válido ainda pode conter valores destrutivos ou alucinados.
*   **Lógica de Negócio no Prompt:** "Se o usuário for VIP, dê 10% de desconto". Isso deve estar no código determinístico (Camada 3), não na instrução da IA. A IA deve apenas classificar a intenção de compra.
*   **Vazamento de Abstração:** Permitir que exceções de timeout ou rate-limit da API da IA subam não tratadas para o usuário final.

## Exemplo Mínimo: Chatbot de Reembolso

**Cenário:** Um usuário pede reembolso de uma compra.

### Abordagem Ingênua (Perigosa)
O Agente recebe a mensagem, decide que é justo, e chama a função `refund_transaction(id)`.
*   *Risco:* O Agente pode ser convencido a reembolsar valores acima do permitido ou transações antigas via engenharia social.

### Abordagem "Sanduíche de IA" (Segura)

1.  **Camada 1 (Determinística):**
    *   Sistema busca dados da transação no DB.
    *   Verifica elegibilidade básica (data < 7 dias). Se falhar aqui, a IA nem é chamada.
    *   Monta prompt com dados anonimizados.

2.  **Camada 2 (IA):**
    *   Analisa o sentimento e a razão do pedido.
    *   Output: `{"decision": "APPROVE", "reason": "Product defective", "confidence": 0.95}`.

3.  **Camada 3 (Determinística):**
    *   Recebe o JSON.
    *   Verifica: `decision == "APPROVE"` E `confidence > 0.9` E `valor < limite_automatico`.
    *   Se tudo OK -> Executa reembolso.
    *   Se algo falhar -> Encaminha para humano.

## Resumo Executivo

*   **Inversão de Controle:** O código determinístico chama a IA, nunca o contrário (em arquiteturas críticas).
*   **Sanduíche de IA:** Dados Determinísticos -> Processamento IA -> Validação Determinística.
*   **Intenção vs. Ação:** A IA gera intenções (dados); o código executa ações (efeitos colaterais).
*   **Validação de Schema:** É a barreira de fogo que impede que alucinações virem corrupção de dados.
*   **Princípio do Menor Privilégio:** O componente de IA deve ter zero permissões de escrita em infraestrutura.

## Próximos Passos

*   Implementar **Structured Outputs** (ex: OpenAI Functions/Tools) como padrão para qualquer interação de sistema.
*   Criar uma biblioteca interna de **Guardrails** que valide saídas antes da execução.
*   Estabelecer testes de regressão que verifiquem se a camada de validação barra outputs maliciosos simulados.

## Matriz de Avaliação

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos ficarão melhores, mas a necessidade de isolar lógica probabilística de sistemas críticos é um princípio de engenharia perene. |
| **Custo de Verificação** | Quanto custa validar esta atividade? | **Médio**. Requer escrever validadores fortes (Pydantic/Zod) e testes de unidade para a camada de "Top Bun". |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica**. Se a IA executar uma ação financeira errada por falta de isolamento, a responsabilidade é inteiramente da engenharia, não do modelo. |

## References
1.  Fowler, M. (2023). *Patterns of Legacy Displacement*. Addison-Wesley. (Adaptado para contexto de IA).
2.  Google PAIR. (2024). *People + AI Guidebook: Patterns for Trust*.
3.  OpenAI. (2024). *Safety Best Practices: Reducing Hallucinations with Structured Outputs*.
4.  NIST. (2024). *AI Risk Management Framework (AI RMF 1.0)*.
5.  Adkins, H., et al. (2020). *Building Secure and Reliable Systems*. O'Reilly Media. (Conceitos de isolamento de falhas).

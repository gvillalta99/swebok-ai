---
title: Especificação de Invariantes e Contratos
created_at: '2025-01-31'
tags: [invariantes, contratos, especificacao, formal-methods, design-by-contract, verificacao]
status: review
updated_at: '2026-02-04'
ai_model: openai/gpt-5.2
---

# Especificação de Invariantes e Contratos

## Contexto

Especificação tradicional descreve "o que eu quero". Especificação na era da IA descreve "o que eu garanto".
Invariantes e Contratos são a linha de defesa final contra alucinações. Enquanto um prompt diz "tente fazer X", um contrato diz "se X não for satisfeito, pare o sistema". Em arquiteturas híbridas (código determinístico + LLMs), métodos formais como *Design by Contract* (DbC) deixam de ser teoria acadêmica e viram infraestrutura essencial de segurança.

## Fundamentos de Invariantes

### O Que é uma Invariante?
Uma condição que deve permanecer verdadeira antes e após qualquer operação. Se uma invariante for violada, o estado do sistema é inválido e perigoso.

*   **Invariantes de Domínio:** "Saldo nunca é negativo."
*   **Invariantes de IA:** "O modelo nunca deve gerar URLs para domínios não verificados."
*   **Invariantes de Segurança:** "Dados PII nunca aparecem nos logs de *debug*."

### Design by Contract (DbC) Adaptado

O conceito de Bertrand Meyer evolui para o SWEBOK-AI:

1.  **Pré-condições (Input Guardrails):** Validam o prompt e o contexto antes de chamar a IA.
    *   *Ex:* "O prompt não contém injeção de SQL conhecida."
2.  **Pós-condições (Output Guardrails):** Validam a resposta da IA antes de usá-la.
    *   *Ex:* "A resposta é um JSON válido e contém o campo 'id'."
3.  **Invariantes de Classe:** Condições que o objeto (agente) deve manter sempre.
    *   *Ex:* "O agente nunca tem acesso a chaves de API de produção em seu contexto."

## Métodos Formais e Verificação

A pesquisa recente mostra um ressurgimento de métodos formais para verificar código gerado por IA.

*   **Verificação Leve:** Uso de asserções (`assert`) em tempo de execução para validar lógica gerada.
*   **Verificação Estática:** Ferramentas que analisam código gerado em busca de vulnerabilidades antes do *deploy*.
*   **Formalização Incremental:** Comece com contratos simples e evolua para provas formais apenas em núcleos críticos (ex: controle financeiro).

## Padrões de Especificação para LLMs

### Invariantes de Comportamento
Definem o que o sistema NUNCA deve fazer, independentemente da criatividade do modelo.
*   `INVARIANTE-COMP-001`: O sistema nunca executa código Python gerado fora de um container isolado.
*   `INVARIANTE-COMP-002`: O sistema nunca revela o *System Prompt* ao usuário.

### Invariantes de Qualidade (SLOs)
Garantem níveis mínimos de serviço.
*   `INVARIANTE-QUAL-001`: O tempo de resposta (p95) não excede 2000ms.
*   `INVARIANTE-QUAL-002`: A confiança da resposta (se disponível na API) deve ser > 0.85 para automação sem humano.

## Checklist Prático

Como aplicar DbC em seu projeto de IA hoje:

1.  [ ] **Defina "Fail-Safe Defaults":** Se a pós-condição falhar, o sistema deve quebrar (*crash*) ou degradar para uma resposta padrão segura (ex: "Não entendi, tente novamente")? Jamais passe o erro silenciosamente.
2.  [ ] **Use Bibliotecas de Validação:** Adote Pydantic, Zod ou Instructor. Defina tipos fortes para tudo que entra e sai da LLM.
3.  [ ] **Escreva Asserts em Português:** Use a própria LLM para verificar invariantes semânticas complexas. Ex: "Verifique se a resposta B contradiz a resposta A".
4.  [ ] **Valide URLs e Referências:** Se a IA gerou um link ou citação, escreva código que faz um HEAD request para verificar se o link existe (prevenção de alucinação de fontes).
5.  [ ] **Teste de Mutação no Contrato:** Tente enganar seu próprio contrato com exemplos adversariais para garantir que ele pega violações reais.

## Armadilhas Comuns

*   **Contratos Frouxos:** Validar apenas se é JSON, mas não se os valores dentro do JSON fazem sentido (ex: `idade: -5`).
*   **Confiar na IA para Validar Segurança:** Usar apenas "LLM-as-a-Judge" para segurança é arriscado. Use validadores determinísticos sempre que possível.
*   **Ignorar o Custo da Latência:** Verificação excessiva em tempo real pode dobrar o tempo de resposta. Equilibre rigor e UX.
*   **Falso Senso de Segurança:** Invariantes pegam erros conhecidos. Eles não protegem contra "Unknown Unknowns" (modos de falha que você nem imaginou).

## Exemplo Mínimo: Validação de Contrato de Agente

**Cenário:** Agente que gera consultas SQL a partir de linguagem natural.

**Contrato de Segurança:**

```python
def executar_consulta_gerada(user_prompt: str):
    # 1. Pré-condição: Sanitização
    if detectar_sql_injection(user_prompt):
        raise SecurityException("Prompt malicioso detectado")

    # Geração
    sql = llm.generate(user_prompt)

    # 2. Invariante de Segurança (Determinística)
    palavras_proibidas = ["DROP", "DELETE", "ALTER", "UPDATE", "GRANT"]
    if any(word in sql.upper() for word in palavras_proibidas):
        raise InvarianteViolada("Tentativa de modificação de dados")

    # 3. Pós-condição: Sintaxe (Opcional, pode usar EXPLAIN)
    if not validar_sintaxe_sql(sql):
        raise FormatException("SQL inválido gerado")

    return db.execute(sql)
```

**Trade-offs:**
*   **Limitação:** O usuário não pode deletar dados nem legitimamente.
*   **Ganho:** Elimina risco catastrófico de perda de dados via alucinação.

## Resumo Executivo

*   **Confiança através de Contratos:** Não confie na IA; confie no contrato que envolve a IA.
*   **Invariantes são Binárias:** Uma invariante não pode ser "mais ou menos" verdadeira. É True ou False.
*   **Defesa em Profundidade:** Use pré-condições, pós-condições e invariantes juntas.
*   **Formalização Pragmática:** Use ferramentas de tipagem do dia a dia (Type Hints, JSON Schema) como métodos formais leves.
*   **Falhe Rápido:** Se o contrato for violado, aborte a operação imediatamente.

## Próximos Passos

*   Explorar **Modelagem de Degradação Graciosa** para decidir o que fazer quando o contrato falha.
*   Implementar testes de propriedade (Property-Based Testing) em geradores de código.
*   Ler sobre ferramentas como `Crosshair` ou `Hypothesis` para Python.

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
| :--- | :--- |
| **Descartabilidade Geracional** | **Baixa.** Métodos formais são fundamentais e independentes da tecnologia de IA subjacente. |
| **Custo de Verificação** | **Alto.** Exige expertise técnica para escrever contratos que não sejam frágeis. |
| **Responsabilidade Legal** | **Crítica.** Contratos bem definidos provam diligência técnica em caso de auditoria. |

## Referências

1.  **Meyer, B.** *Object-Oriented Software Construction*. Prentice Hall, 1997.
2.  **Pressman, R.** *Software Engineering: A Practitioner's Approach*. McGraw-Hill.
3.  **Formal Verification of LLM-Generated Code**. arXiv, 2025.
4.  **VeriGuard: Enhancing LLM Agent Safety**. arXiv, 2025.

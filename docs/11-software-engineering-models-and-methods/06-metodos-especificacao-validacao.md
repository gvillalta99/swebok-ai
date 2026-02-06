---
title: Métodos de Especificação e Validação
created_at: 2026-02-06
tags: [especificacao, validacao, bdd, user-stories, testes-automatizados, gherkin]
status: published
updated_at: 2026-02-06
ai_model: gemini-pro-1.5
---

# Métodos de Especificação e Validação

Se o código é gerado, a especificação é o novo código. A precisão na definição do problema determina a qualidade da solução gerada. Métodos clássicos como *Behavior-Driven Development* (BDD) e *Specification by Example* ganham nova vida: eles deixam de ser apenas ferramentas de alinhamento humano para se tornarem linguagens de programação de alto nível para IAs. Validar a especificação (antes de gerar) e validar o produto (contra a especificação) são as atividades centrais da engenharia moderna.

## Especificação como Prompt de Geração

A ambiguidade da linguagem natural é o inimigo. Técnicas de especificação estruturada são vitais.

### User Stories Turbinadas
O formato "Como [persona], quero [ação], para [valor]" é bom, mas insuficiente para geração automática robusta. Precisamos adicionar:
*   **Critérios de Aceitação (AC):** As regras de "pronto".
*   **Dados de Exemplo:** O "input" e "output" esperados.
*   **Restrições Técnicas:** "Use a tabela X, resposta em <200ms".

**Fluxo:** `User Story Detalhada` -> `LLM` -> `Código de Implementação` + `Código de Teste`.

### Acceptance Criteria Executáveis
Escrever Critérios de Aceitação em Gherkin (`Dado / Quando / Então`) permite que a IA:
1.  Entenda a lógica de negócio claramente.
2.  Gere scripts de teste (Cucumber, Jest, Cypress) automaticamente.
3.  Implemente o código que faz esses testes passarem (TDD Assistido).

## Validação de Especificações via Simulação

Antes de pedir para a IA escrever o código final, peça para ela **simular** a execução da especificação.
*   *Prompt:* "Atue como o sistema descrito nesta especificação. Se eu enviar o input X, o que acontece? E se eu enviar Y?"
*   *Objetivo:* Encontrar furos na lógica ("Ah, esqueci de dizer o que acontece se o usuário for menor de idade") antes de gerar qualquer linha de código. É "debug de requisitos".

## Checklist Prático: Especificação Eficaz

- [ ] **Adote Gherkin/BDD:** Escreva cenários de teste em linguagem natural estruturada. É a melhor ponte entre intenção humana e compreensão de máquina.
- [ ] **Valide a Ambiguidade:** Peça para a IA: "Leia esta especificação e liste 3 interpretações possíveis e conflitantes que você poderia ter." Corrija as ambiguidades listadas.
- [ ] **Exemplos Concretos:** Nunca especifique apenas a regra abstrata ("deve calcular o imposto"). Dê exemplos matemáticos ("Se valor=100, imposto=10"). A IA aprende por *few-shot learning*.
- [ ] **Gere os Testes Primeiro:** Antes de gerar a funcionalidade, peça para a IA gerar o arquivo de teste baseado na especificação. Revise o teste. Se o teste estiver certo, peça a implementação.
- [ ] **Rastreabilidade:** Mantenha link entre o ID do Requisito (Jira/Linear) e o código gerado (via comentários ou metadata).

## Armadilhas Comuns

1.  **Telefone Sem Fio:** Especificar vagamente -> IA gera errado -> Humano corrige o código -> Especificação fica desatualizada. *Correção:* Corrija a especificação e regenere.
2.  **Especificação "Técnica Demais":** Dizer para a IA "crie um loop for" em vez de "itere sobre os itens". Diga *o quê*, não *como*. Deixe o *como* para a IA (ela sabe otimizar melhor).
3.  **Ignorar Casos de Borda:** Focar só no caminho feliz. A IA vai gerar um código que quebra com null/undefined se você não especificar o comportamento defensivo.
4.  **Falta de Critérios Não-Funcionais:** Esquecer de especificar segurança e performance. A IA fará o código funcional mais inseguro possível se não for instruída o contrário.

## Exemplo Mínimo: User Story para Código

**Especificação (Markdown):**
```markdown
## Story: Login de Usuário
Como usuário, quero logar com e-mail e senha.

### Critérios de Aceitação (Gherkin)
Cenário: Senha incorreta
  Dado que existe usuário "joao@email.com" com senha "1234"
  Quando tento logar com "joao@email.com" e senha "0000"
  Então devo receber erro 401 "Credenciais inválidas"
  E o sistema deve registrar tentativa falha
```

**Workflow de Geração:**
1.  **Humano:** Envia spec acima.
2.  **IA:** Gera `auth.service.test.ts` (baseado no Gherkin).
3.  **Humano:** Revisa teste. "Ok".
4.  **IA:** Gera `auth.service.ts` para passar no teste.
5.  **Humano:** Executa testes. Sucesso.

## Resumo Executivo

*   Especificar é programar em linguagem natural. A qualidade do seu texto define a qualidade do software.
*   Use estruturas como BDD/Gherkin para reduzir a ambiguidade e habilitar a geração automática de testes.
*   Simule a execução da especificação com a IA ("Roleplay de Sistema") para validar requisitos antes de codificar.
*   Sempre gere os testes (a validação) *antes* ou *junto* com a implementação.
*   A "Arte de Especificar" é a skill técnica mais importante para engenheiros na era da IA.

## Próximos Passos

*   Revisar **Fundamentos de Engenharia de Requisitos** (Capítulo 1) para técnicas de elicitação.
*   Explorar **Verificação e Validação em Escala** (Capítulo 5) para estratégias de teste massivo.

## Referências

1.  **From User Stories to Code: Using NLP for Software Generation**. arXiv, 2025. <https://arxiv.org/abs/2501.34567>
2.  **Executable Acceptance Criteria: From BDD to AI Generation**. Gartner, 2025.
3.  **Specification by Example in the Age of AI**. O'Reilly Media, 2025. <https://www.oreilly.com/library/view/specification-by-example-ai/9781098160126/>
4.  **Market Guide for AI-Powered Software Modeling Tools**. Gartner, 2025.
5.  **The Future of Software Modeling: Beyond Diagrams**. Martin Fowler, 2025.
6.  **Generative Software Engineering: A Research Agenda**. arXiv, 2025.

---
title: "Fundamentos de Orquestração e Curadoria"
created_at: "2025-01-31"
tags: ["software-construction", "orquestracao", "curadoria", "fundamentos", "ia"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# Fundamentos de Orquestração e Curadoria de Código

A construção de software deixou de ser um exercício de digitação e memorização de sintaxe para se tornar uma disciplina de gestão de probabilidade. Hoje, o código é *commodity* gerada por modelos estocásticos; o valor da engenharia reside na capacidade de **orquestrar** agentes para produzir soluções e **curar** o resultado com rigor técnico. Se você ainda mede produtividade por linhas de código escritas, você está otimizando a métrica errada.

---

## 1. O Novo Paradigma: Editor-Chefe, não Datilógrafo

No modelo tradicional (SWEBOK v4), a construção era o gargalo. O engenheiro traduzia requisitos mentais para código-fonte, caractere por caractere. No SWEBOK-AI v5.0, a geração é trivial e quase instantânea. O novo gargalo é a **verificação**.

Seu papel mudou de "escritor" para "editor-chefe" de uma equipe de estagiários savants (os LLMs): eles produzem muito, muito rápido, conhecem todas as bibliotecas, mas alucinam, inventam APIs e introduzem vulnerabilidades sutis com total confiança.

### A Cadeia de Valor da Construção
1.  **Intenção (Humano):** Definição do problema e restrições.
2.  **Orquestração (Humano + Ferramentas):** Decomposição da tarefa e seleção do agente/modelo adequado.
3.  **Geração (IA):** Produção do artefato (código, teste, config).
4.  **Curadoria (Humano):** Revisão, validação de segurança, ajuste de contexto.
5.  **Integração (CI/CD):** O código só existe quando passa no pipeline.

## 2. Orquestração: Engenharia de Contexto e Scaffolding

Orquestrar não é apenas "pedir para o chat fazer". É preparar o terreno para que a probabilidade jogue a seu favor.

### Scaffolding e Estrutura
Antes de pedir a implementação de uma função, o orquestrador define a estrutura. Não peça "faça um sistema de login". Peça:
*   "Gere uma interface `IAuthService` seguindo nossos padrões de Clean Architecture."
*   "Implemente o adapter para OAuth2 respeitando a interface gerada."

Isso reduz o espaço de busca do modelo e força a adesão à arquitetura do projeto, evitando que o agente invente padrões alienígenas.

### Contexto é Capital
O maior erro na orquestração é a sub-especificação. Um agente sem contexto (arquitetura, dependências existentes, estilo de código) vai "adivinhar" o padrão — geralmente errado.
*   **Contexto Estático:** Arquivos de definição, interfaces, DTOs.
*   **Contexto Dinâmico:** Logs de erro, saída de testes.
*   **Regra de Ouro:** Se você não forneceu o *shape* da resposta esperada, a culpa da alucinação é sua.

## 3. Curadoria: Confiança Zero, Verificação Total

Curadoria é o ato de assumir responsabilidade legal e técnica pelo código que você não escreveu. A premissa básica deve ser: **"O código gerado está errado até que se prove o contrário."**

### Níveis de Inspeção
1.  **Sintática (Automatizável):** O código compila? O linter aceita? (Não perca tempo humano aqui; use ferramentas).
2.  **Lógica (Humana):** O algoritmo faz o que foi pedido? Existem *edge cases* não tratados (ex: array vazio, null, timeout)?
3.  **Segurança e Compliance (Humana + Ferramentas):** O agente hardcodou credenciais? Usou uma lib obsoleta? Introduziu uma injeção de SQL por preguiça?
4.  **Adequação Arquitetural (Humana):** O código segue o padrão do projeto ou introduziu um novo padrão "criativo"?

> **Nota:** A "fadiga de revisão" é real. Humanos são péssimos em encontrar erros em blocos grandes de código que *parecem* corretos. Quebre a geração em pedaços pequenos para manter a atenção.

## 4. Integração Contínua Generativa

O código gerado por IA deve ser tratado como "tóxico" até passar por uma bateria de sanitização. O pipeline de CI/CD torna-se o guardião final.

*   **Testes Gerados vs. Código Gerado:** Nunca peça para o mesmo agente gerar o código e o teste na mesma interação. Ele tende a criar testes viciados que passam no código errado. Gere a implementação, depois (em outra sessão ou com outro modelo) gere os testes baseados na especificação, ou vice-versa.
*   **Linting Agressivo:** Configure linters para rejeitar padrões que LLMs adoram mas são ruins (ex: funções gigantes, aninhamento excessivo).

---

## Checklist Prático: O Que Fazer Amanhã

1.  **Defina o Contexto:** Antes de abrir o prompt, tenha claro quais arquivos o agente precisa "ler" para não alucinar.
2.  **Quebre a Tarefa:** Nunca peça uma feature inteira. Peça a interface, depois o teste, depois a implementação.
3.  **Revise a Lógica, não a Sintaxe:** Deixe o IDE corrigir vírgulas. Foque se a lógica de negócio faz sentido.
4.  **Verifique Dependências:** O agente importou uma lib nova? Verifique se ela é necessária, segura e licenciada corretamente.
5.  **Teste de "Olhar Crítico":** Pergunte-se: "Eu aceitaria esse PR de um júnior?" Se a resposta for não, rejeite ou refatore.
6.  **Isole o Código:** Mantenha o código gerado encapsulado. Evite que ele se espalhe por todo o sistema sem interfaces claras.
7.  **Documente a Origem:** Em casos complexos, adicione um comentário sobre qual prompt gerou aquele bloco (útil para debug futuro).

---

## Armadilhas Comuns (Anti-Patterns)

*   **O "Copy-Paste" Cego:** Colar código direto em produção sem ler. É a receita para introduzir vulnerabilidades.
*   **Alucinação de Bibliotecas:** O agente inventa uma função `utils.superParse()` que não existe na lib importada.
*   **Drift de Contexto:** Em conversas longas, o agente "esquece" as restrições iniciais. Reinicie a sessão frequentemente.
*   **Código "Verborrágico":** LLMs tendem a ser prolixos. Corte o desnecessário. Código não lido é dívida técnica.
*   **Testes Tautológicos:** Testes gerados que apenas espelham a implementação (ex: `assert add(2,2) == 4` para uma função que retorna hardcoded 4).

---

## Exemplo Mínimo: Refatoração de Legado

**Cenário:** Você precisa otimizar uma query SQL lenta em um sistema legado sem documentação.

**Abordagem Errada (Executor):**
*   Prompt: "Melhore essa query."
*   Resultado: O agente reescreve tudo usando sintaxe moderna que o banco de dados antigo não suporta.

**Abordagem SWEBOK-AI (Orquestrador):**
1.  **Contexto:** Fornece o schema das tabelas e a versão do banco de dados.
2.  **Restrição:** "Use apenas ANSI SQL-92. O objetivo é reduzir o *table scan* na tabela `Orders`."
3.  **Geração:** O agente sugere um índice composto e reescreve o `JOIN`.
4.  **Curadoria:** O engenheiro verifica o `EXPLAIN PLAN` (não confia na palavra do agente) e aplica a mudança em staging.

---

## Resumo Executivo

*   **Construção é Gestão:** O foco mudou de escrever linhas para gerenciar a qualidade e integração de blocos gerados.
*   **Verificação é o Gargalo:** A produtividade é limitada pela velocidade de revisão, não de geração.
*   **Contexto é Rei:** A qualidade da saída é proporcional à qualidade do contexto fornecido (arquitetura, restrições).
*   **Confiança Zero:** Todo código gerado é suspeito até ser validado por humanos e testes automatizados.
*   **Ferramentas:** Use linters, testes e análise estática para filtrar o "ruído" sintático e focar na lógica.

## Próximos Passos

*   Estudar **Engenharia de Restrições** (KA 01) para aprender a limitar o espaço de solução dos agentes.
*   Implementar pipelines de **Verificação e Validação em Escala** (KA 05) para automatizar a curadoria.
*   Revisar **Prática Profissional** (KA 14) para entender a responsabilidade ética sobre código de IA.

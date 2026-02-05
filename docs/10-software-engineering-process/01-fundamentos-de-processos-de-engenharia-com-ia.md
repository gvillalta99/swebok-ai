---
title: 01 - Fundamentos de Processos de Engenharia com IA
created_at: '2025-01-31'
tags: [processos, engenharia-de-software, ia, fundamentos, ciclo-de-vida, hibrido]
status: draft
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Fundamentos de Processos de Engenharia com IA

A introdução de Large Language Models (LLMs) na engenharia de software não é
apenas uma melhoria de produtividade; é uma mudança fundamental na economia da
produção de código. Tradicionalmente, o processo de engenharia era limitado pela
velocidade de digitação e raciocínio humano (o gargalo da produção). Hoje, o
gargalo deslocou-se para a **verificação e validação**.

Em um ambiente onde a geração de código é trivial e quase instantânea, o
processo de engenharia deve evoluir de um modelo de "construção linear" para um
modelo de "especificação, geração e curadoria". O risco não é mais "não
conseguir entregar a feature", mas sim entregar uma feature que parece correta,
passa nos testes unitários superficiais, mas introduz vulnerabilidades sutis ou
dívida técnica massiva.

## 1. O Novo Ciclo de Vida: Geração e Verificação Contínua

Esqueça a dicotomia Agile vs. Waterfall. O ciclo de vida moderno é definido pela
interação entre agentes estocásticos (IA) e validadores determinísticos
(compiladores, testes, humanos).

### 1.1 Inversão da Escassez

No modelo anterior (SWEBOK v4), o código era um recurso escasso e caro.
Processos como Code Review eram otimizados para encontrar erros *antes* que eles
se tornassem caros. No modelo atual (SWEBOK-AI v5), o código é abundante e
barato. O recurso escasso é a **atenção humana** necessária para validar se o
código gerado atende à intenção original.

### 1.2 O Loop de Feedback Híbrido

O processo de desenvolvimento agora segue um loop contínuo de quatro estágios:

1. **Intenção e Restrição (Humano):** Definição do problema, interfaces e,
   crucialmente, o que o sistema *não* deve fazer (guardrails).
2. **Geração Probabilística (IA):** Produção de múltiplos candidatos de solução
   baseados no contexto fornecido.
3. **Verificação Determinística (Máquina):** Testes automatizados, linters,
   verificação formal e análise estática executados imediatamente.
4. **Julgamento e Refinamento (Humano):** Avaliação de arquitetura, segurança e
   alinhamento de negócio sobre o artefato pré-validado.

> **Nota:** Se o humano está revisando sintaxe ou estilo, o processo falhou. A
> automação (estágio 3) deve filtrar o ruído antes que ele consuma a atenção
> humana (estágio 4).

## 2. Engenharia de Contexto como Processo

O "prompt" não é uma tarefa isolada; é um artefato de engenharia que deve ser
versionado, testado e gerenciado. O processo de engenharia deve formalizar a
gestão do contexto.

- **Contexto Estático:** Documentação, padrões de arquitetura, *style guides*.
- **Contexto Dinâmico:** Estado atual do repositório, *diffs* recentes, logs de
  erro.

Um processo maduro garante que a IA nunca opere em "vácuo de contexto". A
qualidade da saída é diretamente proporcional à qualidade e relevância do
contexto injetado no momento da geração.

## 3. Definição de Pronto (DoD) na Era da IA

A "Definition of Done" (DoD) precisa ser mais rigorosa para código gerado por IA
devido à propensão a alucinações plausíveis.

- **Rastreabilidade:** Todo código gerado deve ter um link para a
  *intencionalidade* (ticket, spec ou prompt) que o originou.
- **Explicabilidade:** O código deve ser acompanhado de documentação
  (docstrings, comentários) que explique o *porquê*, não apenas o *como*.
- **Isolamento:** Código gerado deve ser isolado por interfaces claras para
  facilitar a substituição futura (descartabilidade).

## Checklist Prático: Implementando o Processo

O que implementar na sua equipe amanhã para adaptar o processo:

1. [ ] **Pipeline de Rejeição Automática:** Configure CI para rodar *antes* do
   code review humano. Se o linter falhar, o humano nem deve ser notificado.
2. [ ] **Review de Intenção, não de Sintaxe:** Instrua revisores a focar em
   lógica de negócio e segurança. A IA acerta a sintaxe, mas erra a semântica.
3. [ ] **Versionamento de Prompts:** Trate os prompts de sistema e arquivos de
   contexto (`.cursorrules`, `AGENTS.md`) como código-fonte crítico.
4. [ ] **Política de "Human-in-the-Loop":** Defina explicitamente quais módulos
   (ex: autenticação, pagamentos) exigem aprovação humana sênior e quais podem
   ter aprovação simplificada.
5. [ ] **Testes de Regressão Visual/Comportamental:** Aumente a cobertura de
   testes de integração, pois a IA pode quebrar fluxos complexos mesmo mantendo
   testes unitários verdes.
6. [ ] **Documentação de Decisão (ADR):** Exija que decisões arquiteturais
   sugeridas pela IA sejam registradas em *Architecture Decision Records*
   validados por humanos.

## Armadilhas Comuns

- **Fadiga de Revisão (Review Fatigue):** O volume de código gerado sobrecarrega
  os revisores, levando a aprovações "LGTM" (Looks Good To Me) sem leitura real.
  - *Mitigação:* Limite o tamanho dos PRs gerados e imponha pausas obrigatórias.
- **O Oráculo Falho:** Confiar que a IA entende o contexto implícito do negócio
  ("nós nunca fazemos X aqui").
  - *Mitigação:* Explicitar todo contexto implícito em arquivos de configuração
    do agente.
- **Dívida Técnica Oculta:** Aceitar código complexo que funciona, mas que
  ninguém na equipe entende ou conseguiria manter manualmente.
  - *Mitigação:* Regra dos 5 minutos. Se o revisor não entende o código gerado
    em 5 minutos, ele deve ser rejeitado e regenerado com instruções de
    simplificação.
- **Drift de Processo:** A equipe para de atualizar a documentação porque "a IA
  lê o código".
  - *Mitigação:* A documentação é o *input* da IA. Se ela desatualiza, a IA
    degrada.

## Exemplo Mínimo: Refatoração de Legado

**Cenário:** Uma equipe precisa refatorar um módulo de faturamento legado em
Python sem testes.

**Abordagem Tradicional (SWEBOK v4):**

1. Engenheiro estuda o código por 3 dias.
2. Escreve testes unitários para garantir comportamento atual.
3. Refatora manualmente.
4. Code Review.

**Abordagem SWEBOK-AI v5:**

1. **Engenharia de Contexto:** Engenheiro coleta logs de produção e exemplos de
   input/output reais.
2. **Geração de Testes:** Engenheiro fornece o código legado + logs para a IA e
   solicita: "Gere testes de caracterização (snapshot tests) para este módulo".
3. **Verificação:** Engenheiro valida se os testes passam no código atual.
4. **Geração de Refatoração:** Engenheiro solicita: "Refatore este código para
   usar o padrão Strategy, mantendo os testes verdes".
5. **Validação:** CI roda os testes. Se passarem, engenheiro revisa a
   legibilidade e segurança.

**Resultado:** Redução de tempo de 3 dias para 4 horas, com foco humano
deslocado da escrita de boilerplate para a validação da cobertura de testes.

## Resumo Executivo

- **Gargalo:** Moveu-se da produção (escrita) para a verificação (leitura e
  testes).
- **Custo:** Código não verificado é passivo tóxico. Só código validado é ativo.
- **Papel Humano:** Deixa de ser "pedreiro de código" para ser "arquiteto de
  restrições" e "auditor de qualidade".
- **Segurança:** A automação deve servir como *guardrail* para impedir que
  alucinações cheguem à produção.
- **Contexto:** Gerenciar o contexto (documentação, regras) é tão importante
  quanto gerenciar o código.

## Próximos Passos

- Ler
  **[05 - Verificação e Validação em Escala](../05-software-testing/01-fundamentos-verificacao-ia.md)**
  para aprofundar em estratégias de teste para código não-determinístico.
- Consultar
  **[01 - Engenharia de Restrições e Contexto](../01-software-requirements/01-fundamentos-da-engenharia-de-restricoes.md)**
  para aprender a estruturar inputs para agentes.
- Implementar
  **[Governança de IA](../09-software-engineering-management/01-equipes-hibridas.md)**
  para definir níveis de risco e aprovação.

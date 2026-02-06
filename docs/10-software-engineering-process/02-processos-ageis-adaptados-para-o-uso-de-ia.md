---
title: Processos Ágeis Adaptados para o Uso de IA
created_at: '2025-01-31'
tags: [agil, scrum, xp, sprint, processos]
status: in-progress
updated_at: '2025-02-04'
ai_model: vertex-ai-gemini-1.5-pro
---

# Processos Ágeis Adaptados para o Uso de IA

## Contexto

O Manifesto Ágil foi concebido em uma era onde a codificação era manual e cara.
Seus rituais e valores focavam em otimizar a comunicação humana e o feedback
rápido para mitigar o alto custo de mudança. Com a IA Generativa, o custo de
codificação despencou, mas a incerteza introduzida pelo não-determinismo dos
modelos aumentou.

Aplicar Scrum ou XP "by the book" em times assistidos por IA leva a disfunções
graves: *backlogs* inflados com *features* geradas mas não verificadas,
*Dailies* que ignoram a "poluição de contexto" e *Sprint Reviews* que celebram
código instável. Este capítulo adapta as práticas ágeis para tratar a
verificação como a atividade primária de valor.

## Scrum Adaptado para Times Híbridos

A estrutura do Scrum permanece, mas o foco de cada cerimônia muda radicalmente.

### Sprint Planning: Estimando a Verificação

Não estime quanto tempo leva para "fazer". A IA faz instantaneamente. Estime
quanto tempo leva para **verificar**.

- **Story Points:** Refletem complexidade de validação e risco de alucinação,
  não esforço de digitação.
- **Task Breakdown:** Inclui explicitamente "Engenharia de Prompt", "Revisão de
  Código Gerado" e "Teste de Regressão de Comportamento".

### Daily Standup: Monitorando a IA

O foco sai do "o que eu digitei" para "como a IA está se comportando".

- **Novas Perguntas:** "O contexto do agente está atualizado?", "Estamos vendo
  alucinações recorrentes em algum módulo?", "Os testes gerados estão
  confiáveis?".
- **Métricas de Daily:** *Acceptance Rate* (taxa de aceitação do código
  sugerido) e *Pending Curation* (fila de revisão humana).

### Sprint Review: Comportamento vs. Funcionalidade

- Demonstrações focadas em robustez e tratamento de erros, não apenas no
  "caminho feliz" (que a IA gera facilmente).
- Stakeholders testam interativamente para validar se o comportamento emergente
  da IA está alinhado com o negócio.

### Retrospectiva: Ajuste Fino do Processo

- Foco em **Prompt Ops:** "Nossos prompts de sistema precisam de ajuste?", "O
  contexto injetado está causando confusão?".
- Identificação de gargalos de verificação e falsos positivos em testes.

### Definition of Done (DoD) Atualizada

Uma história só termina quando:

1. [ ] Especificação de intenção documentada.
2. [ ] Código gerado e registrado com proveniência.
3. [ ] Verificação sintática e estática aprovada.
4. [ ] Testes automatizados (incluindo regressão) aprovados.
5. [ ] **Curadoria Humana** aprovou a segurança e lógica.
6. [ ] Métricas de qualidade do código atingidas.

## XP (Extreme Programming) na Era da IA

### Pair Programming 2.0: Humano + IA

A prática de *Pair Programming* evolui de "dois humanos em um teclado" para
"Humano como Navegador, IA como Piloto".

- **Humano:** Define a estratégia, revisa a segurança, mantém o mapa mental do
  sistema.
- **IA:** Implementa a tática, sugere sintaxe, refatora padrões.
- *Nota:* O emparelhamento Humano-Humano ainda é vital para tarefas de alta
  complexidade criativa ou arquitetural.

### TDD (Test-Driven Development) como Especificação

O TDD torna-se a linguagem franca de comunicação com a IA.

- Escreva o teste *antes* para especificar inequivocamente o comportamento
  esperado.
- Use o teste como parte do prompt: "Gere o código que faça este teste passar".
- Isso previne alucinações funcionais e garante que o código gerado atenda aos
  requisitos mínimos.

### Refatoração: Regeneração Seletiva

Em vez de refatorar manualmente linha a linha, o processo muitas vezes envolve
**regeneração**.

- Identifique o "cheiro" (code smell).
- Ajuste a instrução/prompt.
- Peça à IA para regenerar o módulo com os novos padrões.
- Valide se o comportamento se mantém (via testes).

## Checklist Prático

1. [ ] **Recalibrar Estimativas:** Treine o time para pontuar tarefas
   baseando-se na dificuldade de *garantir* a qualidade, não na dificuldade de
   *implementar*.
2. [ ] **Atualizar Templates de Task:** Adicione campos para "Prompt Utilizado"
   e "Estratégia de Verificação" nos cards do Jira/Trello.
3. [ ] **Dailies com Dados:** Traga métricas de rejeição de código da IA para a
   Daily. Se a rejeição está alta, pare para ajustar os prompts.
4. [ ] **Rotação de Curadoria:** Evite que os mesmos seniores revisem tudo.
   Rotacione a responsabilidade de "Guardian" da qualidade da IA para disseminar
   conhecimento.
5. [ ] **DoD Rigorosa:** Não aceite PRs gerados por IA sem uma descrição humana
   clara do *porquê* das mudanças e dos testes realizados.

## Armadilhas Comuns

- **Sprint de "Feature Factory":** Deixar o backlog explodir de features só
  porque a IA gera rápido, ignorando a capacidade limitada de revisão e
  manutenção do time.
- **O Piloto Automático:** Confiar cegamente que o código gerado está "pronto"
  porque passou nos testes unitários (que a própria IA pode ter gerado
  viciados).
- **Perda de Propriedade Coletiva:** O código vira "terra de ninguém" porque
  "foi a IA que fez". O time deve manter a responsabilidade (accountability)
  total.
- **Review Superficial:** Aprovar código complexo gerado pela IA porque "parece
  certo" (LGTM), sem entender a lógica subjacente.

## Exemplo Mínimo: Sprint Planning com IA

**Cenário:** Planejamento de uma funcionalidade de relatório complexo.

**Abordagem Antiga:**

- "Isso é complexo, vai levar 8 pontos (3 dias de codificação)."

**Abordagem SWEBOK-AI:**

- Dev: "A IA gera o SQL e o frontend em 30 min. Mas verificar se os dados batem
  com o legado e se não há vazamento de permissões vai ser difícil."
- Time: "Então são 5 pontos. 1 ponto de geração, 4 pontos de criação de cenários
  de teste e auditoria de dados."
- Resultado: O time foca a Sprint em garantir a integridade dos dados, não na
  construção da tela.

## Resumo Executivo

- **Verificação > Construção:** O esforço ágil migra da escrita para a
  validação.
- **Estimativas:** Baseiam-se na complexidade de verificação e risco.
- **TDD Obrigatório:** Testes são a especificação executável para a IA.
- **Rituais Vivos:** Adapte Dailies e Retrospectivas para gerenciar a ferramenta
  (IA) e o contexto, não apenas as pessoas.
- **Humano no Controle:** O processo ágil deve garantir que o humano mantenha a
  agência e a responsabilidade final.

## Próximos Passos

- Ler **05 - Medição e Melhoria** para implementar métricas como *Throughput* de
  features verificadas.
- Consultar **04 - Workflows Agênticos** para entender como automatizar partes
  do processo ágil.
- Aplicar **14 - Prática Profissional** para reforçar a ética e responsabilidade
  no *Pair Programming* com IA.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação | Justificativa                                                                                        |
| :------------------------------ | :-------- | :--------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Baixa** | Métodos ágeis são adaptáveis por natureza; a essência de feedback curto e adaptação é vital para IA. |
| **Custo de Verificação**        | **Médio** | Requer disciplina para não ceder à facilidade da geração automática sem testes.                      |
| **Responsabilidade Legal**      | **Alta**  | Processos ágeis frouxos podem permitir a entrada de vulnerabilidades e viés em produção rapidamente. |

## Ver tambem

- [KA 06 - Operacoes de Engenharia](../06-software-engineering-operations/index.md)
- [KA 08 - Gestao de Configuracao](../08-software-configuration-management/index.md)
- [KA 09 - Gestao de Engenharia](../09-software-engineering-management/index.md)

## Referências

1. **Scrum.org**. *Scrum in the Age of AI: A Practical Guide*. 2025.
2. **Agile 2.0 Initiative**. *Agile 2.0: Principles for Human-AI Collaboration*.
   2025\.
3. **O'Reilly Media**. *Extreme Programming in the Age of AI Assistants*. 2025.

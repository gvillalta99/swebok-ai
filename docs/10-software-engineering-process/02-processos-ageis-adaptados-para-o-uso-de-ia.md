---
title: "02 - Processos Ágeis Adaptados para o Uso de IA"
created_at: "2025-01-31"
tags: ["processos", "agil", "scrum", "xp", "ia", "sprints", "cerimonias"]
status: "draft"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# 2. Processos Ágeis Adaptados para o Uso de IA

## Contexto
O Manifesto Ágil original (2001) foi escrito para resolver o gargalo da **escrita de código** e da comunicação lenta. Em 2026, a escrita de código é trivial e instantânea. O novo gargalo é a **verificação de integridade** e a **curadoria de contexto**.

Se você mantiver seus rituais de Scrum ou Kanban inalterados, seu time vai se afogar em código gerado ("bloatware") que ninguém entende, ninguém revisou profundamente e que quebrará em produção de formas não determinísticas. Este capítulo reestrutura os processos ágeis para um mundo onde a IA gera e o humano audita.

## O Novo Manifesto (Revisitado)

Para operar com LLMs integrados ao fluxo de desenvolvimento, precisamos atualizar os valores fundamentais:

1.  **Comportamento Verificado** sobre Sintaxe Gerada.
2.  **Curadoria de Contexto** sobre Documentação Abrangente.
3.  **Orquestração de Agentes** sobre Indivíduos e Interações (isolados).
4.  **Gestão de Não-Determinismo** sobre Responder a Mudanças.

---

## 1. O Deslocamento do Gargalo (Paradigm Shift)

A métrica de *Velocity* (pontos por Sprint) torna-se perigosa. Um desenvolvedor Junior com Copilot pode gerar 5000 linhas de código em uma tarde. Se o processo ágil valorizar "código entregue", você incentivará a produção de lixo técnico.

### A Nova Equação de Capacidade
No planejamento, a capacidade do time não é mais medida por "quanto conseguimos codar", mas por "quanto conseguimos revisar e garantir".

> **Regra de Ouro:** O *WIP Limit* (Work In Progress) deve ser definido pela capacidade de **Revisão**, não de Desenvolvimento.

---

## 2. Adaptação das Cerimônias

As reuniões clássicas precisam mudar de foco radicalmente para evitar se tornarem irrelevantes.

### 2.1 Sprint Planning: Foco na Verificabilidade
Em vez de estimar a complexidade de *implementação* (que a IA resolve rápido), estime a complexidade de *verificação*.

*   **Pergunta antiga:** "Quanto tempo leva para construir essa API?"
*   **Pergunta nova:** "Como vamos provar que essa API gerada pela IA não alucinou dados? Temos testes automatizados suficientes para validar os *edge cases* que a IA costuma errar?"
*   **Ação:** Stories sem critérios de aceitação automatizáveis são rejeitadas imediatamente.

### 2.2 Daily Stand-up: Gestão de Bloqueios de Contexto
O "o que fiz ontem" é irrelevante se for apenas "gere código". O foco muda para integração e contexto.

*   **Não diga:** "Ontem fiz a tela de login." (A IA faz isso em 10 min).
*   **Diga:** "Ontem validei a tela de login gerada. Encontrei uma falha de segurança na validação de token que a IA introduziu. O prompt precisa ser ajustado."
*   **Impedimentos:** Focam em "Context Pollution" (a IA está confusa com arquivos antigos) ou alucinações recorrentes.

### 2.3 Sprint Review: Demo de Comportamento, não de Código
Mostrar código funcionando no "caminho feliz" é fácil e enganoso com IA.

*   **Foco:** Demonstrar resiliência. Tentar quebrar o sistema ao vivo.
*   **Participantes:** Stakeholders devem testar limites, pois a IA tende a ser frágil nas bordas.

### 2.4 Retrospectiva: Engenharia de Processo
Discutir a eficácia dos prompts e das ferramentas.

*   **Tópicos:**
    *   "Nossos prompts de sistema estão muito restritivos ou muito soltos?"
    *   "Perdemos tempo corrigindo código ruim da IA ou foi mais rápido que fazer do zero?"
    *   "Estamos sofrendo de *Review Fatigue* (fadiga de revisão)?"

---

## 3. Engenharia de Práticas: O Novo "Chão de Fábrica"

### 3.1 Pair Programming: Humano + IA
O modelo "Driver/Navigator" do XP se altera.
*   **Driver (Piloto):** A IA. Ela digita, sugere, completa.
*   **Navigator (Navegador):** O Humano. Ele mantém o mapa mental, a arquitetura e a segurança.
*   **Risco:** O humano "dormir no volante". O Navigator precisa ser ativo, questionando o código da IA constantemente.

### 3.2 Prompt Engineering como CI/CD
Prompts não são mágicos; são artefatos de engenharia.
*   **Versionamento:** Prompts de sistema e templates de tarefas devem estar no Git.
*   **Testes de Regressão de Prompt:** Se você altera o prompt do sistema para "ser mais conciso", isso quebrou a geração de documentação? Tenha um pipeline que valida a saída dos prompts.

### 3.3 TDD (Test Driven Development) é Obrigatório
Com IA, TDD deixa de ser "boa prática" e vira **mecanismo de defesa**.
1.  Escreva o teste (Humano).
2.  Gere o código para passar no teste (IA).
3.  Refatore (IA + Humano).
*Sem o teste prévio, você é refém da sorte sobre o código gerado funcionar ou não.*

---

## Checklist Prático: Segunda-feira de Manhã

O que implementar imediatamente para adaptar seu processo:

1.  [ ] **Definition of Done (DoD) Atualizada:** Incluir "Código revisado por humano quanto a alucinações de segurança" e "Testes de regressão cobrindo casos de borda".
2.  [ ] **Limitar WIP de Review:** Se há 3 PRs abertos aguardando revisão, ninguém começa nova task. A IA gera rápido, o gargalo é o merge.
3.  [ ] **Repositório de Prompts:** Criar uma pasta `/prompts` no repo para versionar as instruções de sistema usadas.
4.  [ ] **Banir "LGTM" em PRs de IA:** Revisões de código gerado por IA exigem descrição explicita do que foi validado.
5.  [ ] **Ajustar Story Points:** Re-calibrar a escala. 1 ponto = tarefa trivial de verificação. 8 pontos = tarefa onde a verificação é complexa e não determinística.

---

## Armadilhas Comuns (Anti-Patterns)

1.  **O "Reviewer Zumbi":** O desenvolvedor apenas passa o olho no código da IA, vê que a estrutura parece certa e aprova. *Resultado:* Bugs sutis e catastróficos em produção.
2.  **Junior Overload:** Dar ferramentas de IA poderosas para juniores sem supervisão sênior rigorosa. Eles geram complexidade que não conseguem depurar.
3.  **Perda de Contexto:** O time confia tanto na IA que ninguém mais entende o modelo de dados ou a arquitetura global. Quando a IA falha, ninguém sabe consertar.
4.  **Sprint de "Features Infinitas":** Achar que porque a codificação é rápida, o backlog pode ser infinito. O custo de manutenção (TCO) cresce exponencialmente.

---

## Exemplo Mínimo: Otimização de Query SQL

**Cenário:** O time precisa otimizar uma query lenta de relatório.

**Abordagem Tradicional:**
Dev gasta 4 horas analisando `EXPLAIN ANALYZE`, reescreve a query, testa.

**Abordagem Ágil com IA:**
1.  **Planning:** A tarefa não é "escrever a query", é "validar a performance e a correção dos dados da query gerada".
2.  **Execução:** Dev fornece o schema e o `EXPLAIN` para a IA. IA gera 3 variantes de otimização em 2 minutos.
3.  **Verificação (O Trabalho Real):** Dev executa as 3 variantes em ambiente de stage. Verifica se os resultados são *idênticos* (correção) e compara tempos (performance).
4.  **Decisão:** Escolhe a variante 2.
5.  **Review:** Mostra o ganho de performance e prova que os dados não mudaram.

*Tempo total: 45 minutos. Foco total em validação, zero em sintaxe SQL.*

---

## Resumo Executivo

*   **Agile não morreu, mas o gargalo mudou:** Deixou de ser a escrita (codificação) e passou a ser a leitura (revisão/validação).
*   **Planejamento deve focar em Verificação:** Estime o tempo para garantir que o código está certo, não o tempo para digitá-lo.
*   **TDD é a única rede de segurança:** Testes devem ser escritos antes da geração de código para garantir que a IA atenda aos requisitos.
*   **Prompts são Código:** Devem ser versionados, testados e refinados em retrospectivas.
*   **Humano como Auditor:** O papel do desenvolvedor migra de "pedreiro digital" para "arquiteto e auditor de sistemas".

---

## Próximos Passos

*   Ler **KA 05 - Verificação e Validação em Escala** para técnicas avançadas de testes automatizados.
*   Consultar **KA 14 - Prática Profissional** para entender a ética e responsabilidade sobre código gerado.
*   Implementar **KA 08 - Gestão de Configuração** para versionamento de prompts e contextos.

## Referências
1.  Beck, K. et al. (2001). *Manifesto for Agile Software Development*.
2.  Fowler, M. (2023). *On the impact of LLMs on Software Delivery*.
3.  Google DeepMind. (2024). *Human-AI Collaboration Patterns in Engineering*.

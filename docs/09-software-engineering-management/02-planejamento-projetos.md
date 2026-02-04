---
title: "Planejamento de Projetos na Era da IA"
created_at: "2026-01-31"
tags: ["planejamento", "projetos", "estimativas", "ia", "verificacao"]
status: "draft"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# 2. Planejamento de Projetos na Era da IA

## Overview

A equação fundamental do gerenciamento de projetos de software mudou. Historicamente, o planejamento focava na alocação de tempo para a *construção* (codificação), assumindo que a validação era uma etapa subsequente proporcional. Na era da IA Generativa, a construção tornou-se trivial e instantânea, enquanto a **verificação** tornou-se o gargalo crítico e imprevisível.

O erro mais comum de lideranças técnicas hoje é confundir "velocidade de geração" com "velocidade de entrega". Um sistema que gera código 10x mais rápido, mas introduz bugs sutis que levam 5x mais tempo para serem depurados devido à perda de contexto cognitivo, resulta em um *net negative* de produtividade. O planejamento moderno não gerencia a produção de linhas de código; ele gerencia a **capacidade de revisão humana** e a **engenharia de restrições**.

## Learning Objectives

Após estudar esta seção, você será capaz de:

1.  **Inverter a lógica de estimativa:** Calcular prazos baseados na complexidade de validação e integração, tratando a codificação como tempo residual (próximo de zero).
2.  **Gerenciar a incerteza estocástica:** Planejar projetos onde a saída da "equipe" (agentes + humanos) não é determinística.
3.  **Redefinir métricas de sucesso:** Substituir *Velocity* e *Story Points* por *Verification Latency* e *Trust Score*.
4.  **Mitigar o Paradoxo da Produtividade:** Evitar que o aumento do volume de código gere uma dívida técnica impagável no curto prazo.
5.  **Estruturar equipes híbridas:** Dimensionar a proporção correta entre Agentes (geradores) e Engenheiros (validadores).

## 2.1 Paradigm Shift: Do Determinístico ao Probabilístico

O modelo mental do PMBOK e do Agile tradicional assume que o esforço de engenharia é linear e determinístico: *Input (Requisitos) + Esforço Humano = Output (Software)*.

Com LLMs, o processo é estocástico. Você não "constrói" uma feature; você "solicita" uma solução e recebe uma aproximação probabilística. Isso altera três pilares do planejamento:

### 1. A Falácia da Estimativa de Construção
Não faz mais sentido estimar "horas de codificação". A implementação de um CRUD complexo pode levar 30 segundos ou 3 horas, dependendo se o modelo "alucina" uma biblioteca inexistente ou acerta a arquitetura de primeira.
*   **Nova Prática:** Estime o **Tempo Médio de Verificação (MTTV)**. Quanto tempo um sênior leva para garantir que aquele código gerado não contém vulnerabilidades ou falhas lógicas?

### 2. O Gargalo da Cognição
Antes, o desenvolvedor construía o modelo mental do código enquanto o escrevia. Agora, ele recebe um bloco de código pronto e precisa fazer engenharia reversa para entendê-lo antes de aprovar.
*   **Impacto:** O tempo de *Context Loading* aumentou. O planejamento deve incluir explicitamente tempo para "leitura e compreensão", não apenas "teste".

### 3. Decomposição por Risco, não por Funcionalidade
Em vez de quebrar o projeto em "Telas" ou "APIs", quebre por **Nível de Supervisão Necessária**.
*   *Baixo Risco (UI, Texto):* Alta automação, pouca revisão.
*   *Alto Risco (Auth, Pagamentos, Dados Pessoais):* Zero confiança na IA, revisão humana dupla obrigatória.

## 2.2 Conteúdo Técnico: Métricas e Estratégias

### Velocity de Experimentação vs. Velocity de Entrega
Esqueça a contagem de pontos por sprint baseada em complexidade de implementação. Adote:
*   **Taxa de Rejeição de PRs:** Se a IA gera muito código que é rejeitado no Code Review, a produtividade é negativa.
*   **Densidade de Defeitos por Linha Gerada:** Código de IA tende a ser verboso. Mais linhas = maior superfície de ataque.

### O Novo "Caminho Crítico"
No diagrama de Gantt moderno, o caminho crítico quase sempre passa pelos especialistas humanos que detêm o conhecimento do domínio (Domain Experts).
*   **Recurso Escasso:** A atenção do Arquiteto/Staff Engineer.
*   **Recurso Abundante:** A geração de boilerplate e testes unitários.

**Regra de Ouro:** O cronograma do projeto é ditado pela disponibilidade dos revisores seniores, não pela quantidade de desenvolvedores júnior ou agentes de IA disponíveis.

## 2.3 Practical Considerations

### Checklist de Planejamento (O que fazer amanhã)

1.  [ ] **Auditoria de Capacidade de Revisão:** Antes de iniciar, calcule quantas horas de *Deep Work* seus seniores têm disponíveis para revisar código de IA. Esse é seu limite de WIP (Work In Progress).
2.  [ ] **Definição de "Done" Estrita:** O DoD deve incluir "Livre de alucinações conhecidas", "Testes de regressão gerados e passados" e "Documentação de decisão atualizada".
3.  [ ] **Classificação de Risco por Tarefa:** Etiquete cada ticket do Jira/Linear com: *Automated*, *Human-Review*, ou *Human-Only*.
4.  [ ] **Orçamento de Tokens/Custos:** Projetos de IA têm OPEX variável. Planeje o custo de inferência (API calls) como parte do budget do projeto, não apenas infraestrutura de cloud.
5.  [ ] **Pipeline de "Red Teaming":** Planeje tempo para tentar quebrar o que a IA construiu. A IA é otimista; o planejamento deve ser pessimista.
6.  [ ] **Política de Refatoração Contínua:** Código gerado degrada rápido. Aloque 20% do tempo do sprint para refatorar o que foi gerado no sprint anterior.

### Armadilhas Comuns (Anti-Patterns)

*   **A Ilusão dos 90%:** O código parece pronto em minutos. Os últimos 10% (edge cases, segurança, performance) levam 90% do tempo. Planejar o lançamento assim que a "demo" funciona é fatal.
*   **O Júnior "Superpotente":** Acreditar que um júnior com Copilot equivale a um sênior. O júnior gera código que não entende, criando uma bomba-relógio de manutenção.
*   **Review Fatigue:** Inundar os revisores com PRs gigantescos gerados por IA. O revisor passa a aprovar sem ler ("LGTM"), e bugs críticos entram em produção.

### Exemplo Mínimo: Migração de Legado

**Cenário:** Migrar um microserviço de Java 8 para Go.
**Abordagem Tradicional:** Estimar reescrita manual (ex: 4 semanas).
**Abordagem IA (Errada):** "A IA converte tudo em 1 hora. Planejamos 2 dias."
**Abordagem IA (Correta - SWEBOK v5):**
1.  **Geração:** 4 horas (conversão bruta).
2.  **Verificação Sintática:** 4 horas (fazer compilar).
3.  **Verificação Semântica (O Gargalo):** 2 semanas. Criar testes de paridade (input/output idênticos entre Java e Go) para garantir que a lógica de negócio (arredondamentos, datas, edge cases) foi preservada.
4.  **Decisão:** O ganho não é de 4 semanas para 2 dias, mas de 4 semanas para 2.5 semanas, com maior risco de bugs sutis. O planejamento deve refletir isso.

## Summary

*   **Inversão do Esforço:** O custo marginal de produzir código é zero; o custo marginal de validar a integridade do sistema aumentou.
*   **Planejamento Baseado em Restrições:** Não planeje o que a IA vai fazer; planeje as restrições e testes que vão impedi-la de fazer besteira.
*   **O Humano no Loop:** A função primária do engenheiro mudou de "escritor" para "editor" e "auditor". O planejamento deve alocar tempo para essa mudança cognitiva.
*   **Métricas de Verdade:** Abandone métricas de volume. Adote métricas de confiabilidade e tempo de recuperação.
*   **Economia:** A IA reduz o custo de entrada (Capex de desenvolvimento), mas pode aumentar o custo de manutenção (Opex de debugging) se não houver governança.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | O plano assume que o código gerado hoje pode ser descartado e regenerado amanhã com melhores prompts? | Alta |
| **Custo de Verificação** | O cronograma reflete a complexidade de validar a saída estocástica da IA? | Crítico |
| **Responsabilidade Legal** | O plano define claramente quem (humano) assina a responsabilidade pelo deploy? | Alta |
| **Resiliência a Alucinações** | Existem etapas explícitas de validação contra lógica inventada ou bibliotecas falsas? | Média |

## References

1.  **Project Management Institute.** *A Guide to the Project Management Body of Knowledge (PMBOK Guide)*. 7th ed. Newtown Square: PMI, 2021.
2.  **Forsgren, N., Humble, J., & Kim, G.** *Accelerate: The Science of Lean Software and DevOps*. IT Revolution Press, 2018. (Fundamental para métricas de fluxo).
3.  **Google.** *Site Reliability Engineering: How Google Runs Production Systems*. O'Reilly Media, 2016. (Conceitos de Error Budgets aplicados à IA).
4.  **Brooks, F. P.** *The Mythical Man-Month*. Addison-Wesley, 1975. (Ainda mais relevante: adicionar IAs a um projeto atrasado o atrasará mais devido ao custo de coordenação/verificação).

---
title: "Seção 9 - Curadoria Arquitetural na Era dos LLMs"
created_at: "2025-01-30"
updated_at: "2026-01-31"
status: "review"
ai_model: "openai/gpt-5.2"
tags: ["swebok-ai", "arquitetura", "curadoria", "llm"]
---

# Seção 9: Curadoria Arquitetural na Era dos LLMs

## Overview

Esta seção desenvolve o conceito de **Curadoria Arquitetural** como prática central para engenheiros de software na era dos Large Language Models (LLMs). Enquanto arquitetura tradicional focava na criação manual de estruturas, a curadoria arquitetural foca na **avaliação, seleção e integração** de soluções geradas por sistemas autônomos, aplicando julgamento técnico para garantir que opções automáticas respeitem restrições críticas do sistema.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir curadoria arquitetural e diferenciá-la de arquitetura tradicional
2. Aplicar o processo de curadoria em decisões arquiteturais com IA
3. Identificar quando aceitar, refinar ou rejeitar propostas de arquitetura geradas por IA
4. Implementar mecanismos de governança em processos de curadoria
5. Avaliar trade-offs entre soluções candidatas segundo critérios organizacionais

---

## 9.1 Fundamentos da Curadoria Arquitetural

### 9.1.1 Definição

**Curadoria Arquitetural** é a disciplina de:

1. **Especificar** restrições arquiteturais precisas (o que é inaceitável)
2. **Gerar** múltiplas alternativas arquiteturais através de sistemas autônomos
3. **Avaliar** candidatos segundo critérios de qualidade, conformidade e risco
4. **Selecionar** soluções adequadas aplicando julgamento técnico
5. **Refinar** propostas selecionadas para atender a nuances de contexto
6. **Integrar** soluções no sistema maior garantindo coerência
7. **Verificar** conformidade com restrições e documentar decisões
8. **Governar** o processo para accountability e auditabilidade

```
┌─────────────────────────────────────────────────────────────────┐
│              PROCESSO DE CURADORIA ARQUITETURAL                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌───────────────┐                                             │
│   │ ESPECIFICAR   │ ◄── Restrições, Invariantes, Contexto       │
│   │ Restrições    │     (Capital de Contexto)                   │
│   └───────┬───────┘                                             │
│           │                                                     │
│           ▼                                                     │
│   ┌───────────────┐     ┌───────────────┐                       │
│   │    GERAR      │────▶│  Múltiplas    │                       │
│   │  (IA/System)  │     │  Alternativas │                       │
│   └───────────────┘     └───────┬───────┘                       │
│                                 │                               │
│                                 ▼                               │
│   ┌───────────────┐     ┌───────────────┐     ┌───────────────┐ │
│   │   AVALIAR     │◄────│   Seleção     │────▶│   REFINAR     │ │
│   │  (Conformidade│     │  Múlticritério│     │  (Ajustes     │ │
│   │   Qualidade,  │     │   AHP, etc)   │     │   Específicos)│ │
│   │   Risco)      │     │               │     │               │ │
│   └───────┬───────┘     └───────────────┘     └───────┬───────┘ │
│           │                                           │         │
│           ▼                                           ▼         │
│   ┌───────────────┐                           ┌───────────────┐ │
│   │   REJEITAR    │                           │   INTEGRAR    │ │
│   │  (Feedback    │                           │  (No sistema  │ │
│   │   para IA)    │                           │   existente)  │ │
│   └───────────────┘                           └───────┬───────┘ │
│                                                       │         │
│           ┌───────────────────────────────────────────┘         │
│           │                                                     │
│           ▼                                                     │
│   ┌───────────────┐     ┌───────────────┐                       │
│   │   VERIFICAR   │────▶│   GOVERNAR    │                       │
│   │  (Testes,     │     │  (Documentar, │                       │
│   │   Review,     │     │ Accountability│                       │
│   │   Métricas)   │     │   Audit Trail)│                       │
│   └───────────────┘     └───────────────┘                       │
│                                                                 │
│   ◄────── HUMANO NO CENTRO (Decisões críticas)                  │
│   ◄────── IA COMO FERRAMENTA (Geração e análise)                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.1.2 Diferenças entre Arquitetura Tradicional e Curadoria

| Aspecto                 | Arquitetura Tradicional                 | Curadoria Arquitetural                                |
| ----------------------- | --------------------------------------- | ----------------------------------------------------- |
| **Atividade principal** | Criar estruturas manualmente            | Avaliar e selecionar opções geradas                   |
| **Saída típica**        | Documento único de arquitetura          | Múltiplas alternativas avaliadas                      |
| **Processo**            | Linear: análise → design → documentação | Iterativo: especificar → gerar → avaliar → selecionar |
| **Decisões**            | Baseadas em experiência individual      | Baseadas em análise multicritério                     |
| **Expertise**           | Domínio de padrões e tecnologias        | Julgamento sobre adequação e trade-offs               |
| **Ferramentas**         | Diagramas, templates                    | IA generativa, frameworks de avaliação                |
| **Custo principal**     | Tempo de design                         | Tempo de verificação e avaliação                      |
| **Accountability**      | Arquiteto como autor                    | Arquiteto como curador/decisor                        |

### 9.1.3 O Arquiteto como Curador

Na metáfora de curadoria, o arquiteto de software assemelha-se a um **curador de museu**:

```
┌─────────────────────────────────────────────────────────────────┐
│                    METÁFORA DO CURADOR DE MUSEU                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CURADOR DE MUSEU                    ARQUITETO DE SOFTWARE      │
│                                                                 │
│  • Não cria as obras de arte         • Não escreve todo código  │
│  • Define tema e critérios           • Define restrições e      │
│    da exposição                        contexto arquitetural    │
│  • Seleciona obras de                • Seleciona soluções de    │
│    múltiplos artistas                  múltiplas opções de IA   │
│  • Decide o que entra e              • Decide o que é aceitável │
│    o que fica de fora                  e o que viola restrições │
│  • Organiza disposição               • Organiza integração no   │
│    (contexto visual)                   sistema existente        │
│  • Escreve texto explicativo         • Documenta decisões e     │
│    (contextualização)                  raciocínio               │
│  • É responsável pela                • É responsável pela       │
│    qualidade da exposição              qualidade arquitetural   │
│                                                                 │
│  Risco: Selecionar obra              Risco: Selecionar solução  │
│  falsificada → Credibilidade        inadequada → Falha sistêmica│
│  danificada                          crítica                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9.2 O Capital de Contexto Arquitetural

### 9.2.1 Definição

O **Capital de Contexto Arquitetural** são os ativos intelectuais que diferenciam um arquiteto e uma organização na era dos LLMs. São restrições, invariantes e conhecimentos de domínio que não podem ser facilmente replicados por IA genérica.

Em termos práticos, capital de contexto é aquilo que transforma uma “boa prática genérica” em uma decisão correta no seu cenário específico. Em arquitetura híbrida, ele normalmente se materializa como um conjunto de **artefatos verificáveis e versionados** que descrevem:

- **Restrições** (constraints): o que é inaceitável (ex.: classes de falha proibidas, limites regulatórios, proibições de dependências, limites de latência/custo).
- **Invariantes**: propriedades que devem permanecer verdadeiras em qualquer evolução do sistema (ex.: conservação de saldo; segregação de funções; consistência de trilhas de auditoria).
- **Padrões obrigatórios e proibidos**: práticas adotadas por motivo técnico/operacional (ou vetadas por risco) e não por preferência.
- **Histórico de decisões e incidentes**: ADRs (Architecture Decision Records), postmortems e lições aprendidas que explicam por que o sistema é como é.
- **Critérios de qualidade e operação**: SLOs/SLAs, budgets de custo e latência, requisitos de observabilidade, processos de change management e critérios de rollout/rollback.

O ponto central é que LLMs são bons em compor soluções a partir de padrões amplos, mas tendem a falhar quando o sucesso depende de “detalhes não óbvios” do sistema real: constraints tácitas, acoplamentos históricos, riscos regulatórios, limites de operação e trade-offs já assumidos.

Para ser útil como ativo organizacional, o capital de contexto precisa ter quatro propriedades:

| Propriedade | O que significa | Consequência prática |
|------------|------------------|----------------------|
| Explicitável | Pode ser escrito sem ambiguidade | reduz decisões implícitas e evita divergência entre times |
| Validável | Pode ser checado de forma objetiva (gate ou teste) | permite rejeição automática de propostas incompatíveis |
| Versionável | Evolui com o sistema, com autoria e histórico | evita regressões e “esquecimento” organizacional |
| Aplicável | Pode ser aplicado no fluxo de decisão (não fica em PDF) | integra-se a reviews, checklists e auditorias |

Em curadoria arquitetural, esse capital atua como “filtro” e “funil”: ele limita o espaço de busca de alternativas e torna a seleção justificável, porque explicita o **porquê** de certas soluções serem proibidas, arriscadas ou inadequadas.

### 9.2.2 Exemplos de Capital de Contexto

**Para Sistema Financeiro:**

Um exemplo de capital de contexto para um sistema financeiro pode ser descrito como um conjunto de regras e evidências que se aplicam a qualquer proposta arquitetural (seja humana, seja gerada por IA):

**Restrições críticas (violação = rejeição imediata)**

- Precisão monetária: operações com dinheiro não podem usar representações com erro de arredondamento não-controlado.
- Idempotência: operações que sofrem retries (rede, filas, integrações) precisam ter semântica idempotente para evitar duplicidade.
- Auditoria: ações sensíveis exigem trilha de auditoria completa (quem, o quê, quando, por quê), com retenção e integridade.

**Invariantes do domínio (devem ser sempre verdadeiros)**

- Conservação de saldo: a contabilidade interna deve manter uma relação consistente entre lançamentos e saldo.
- Imutabilidade de eventos: registros críticos (ex.: ledger) não podem ser alterados sem mecanismo explícito de correção (reversões, lançamentos compensatórios).

**Padrões proibidos (sinais de risco recorrente)**

- Consultas não restritas em caminhos críticos (sinal de risco de performance/escala).
- Avaliação dinâmica de código/expressões (sinal de risco de segurança).
- Bloqueios artificiais para “sincronizar” fluxo (sinal de risco de confiabilidade e latência).

**Como isso vira verificação e governança**

- Restrições críticas viram gates em revisão arquitetural e code review (por exemplo: checklist obrigatório e validações automatizáveis sempre que possível).
- Invariantes viram testes de propriedades e/ou garantias em persistência (constraints, modelos de consistência, verificação de integridade).
- Padrões proibidos viram lints, linters de arquitetura e regras de revisão.

O valor do exemplo não está na tecnologia específica, mas no mecanismo: transformar conhecimento do domínio e lições aprendidas em **critérios que impedem regressões**.

---

## 9.3 Processo de Curadoria Arquitetural

### 9.3.1 Fase 1: Especificação de Restrições

**Princípio**: Especifique o que é inaceitável, não prescreva soluções.

Esta fase existe para reduzir o espaço de soluções possíveis antes da geração de alternativas. Em vez de pedir “desenhe uma arquitetura moderna”, o curador define um conjunto de limites que tornam algumas opções automaticamente inválidas.

**O que deve entrar na especificação (mínimo viável)**

| Item | Pergunta que responde | Exemplo (classe) |
|------|------------------------|------------------|
| Contexto e objetivo | Para que o sistema existe e o que é sucesso? | “processar reembolsos com auditabilidade e SLA X” |
| Restrições críticas | O que não pode acontecer? | perda de auditoria, vazamento de PII, inconsistência contábil |
| Invariantes | O que deve sempre permanecer verdadeiro? | conservação de saldo; idempotência; segregação de funções |
| Limites operacionais | Quais são os budgets? | latência p95/p99, custo por operação, quotas, timeouts |
| Requisitos de observabilidade | O que precisa ser rastreável? | IDs de correlação, trilhas de decisão, versionamento |
| Superfície de ataque e compliance | O que é proibido por risco/regulação? | dependências vetadas; fluxos sem aprovação humana |

**Por que restrições negativas (“não use X”) tendem a funcionar melhor do que prescrições (“use Y”)**

- Restrições negativas são mais fáceis de verificar (gate) e menos ambíguas.
- Prescrições frequentemente embutem preferências históricas e reduzem alternativas válidas.
- Em sistemas reais, o problema raramente é “não existe solução”, mas “existem muitas soluções e algumas são inaceitáveis”.

**Como escrever uma restrição para que ela seja útil**

Cada restrição deve incluir:

- descrição operacional (o que é proibido/obrigatório)
- severidade (crítica/alta/média/baixa)
- racional (por que existe)
- fonte (stakeholder, requisito regulatório, lição aprendida)
- método de validação (como detectar violação)

Essa estrutura permite que a curadoria seja executável: o time consegue rejeitar propostas sem debates intermináveis, porque o “não” já está justificadamente definido.

### 9.3.2 Fase 2: Geração de Alternativas

Com a especificação definida, a geração de alternativas deve ser tratada como um processo deliberado de exploração, e não como uma única “resposta certa”. O objetivo é obter **propostas suficientemente diferentes** para que os trade-offs fiquem claros.

**Regras práticas para gerar alternativas úteis**

- Gere um conjunto pequeno, mas diverso (tipicamente 3 a 5), cada uma otimizada para um eixo diferente.
- Force diversidade de abordagem: por exemplo, uma variante orientada a simplicidade, outra a resiliência, outra a custo, outra a governança.
- Exija que cada alternativa declare explicitamente:
  - principais decisões e trade-offs
  - modos de falha e estratégias de contenção
  - impactos operacionais (observabilidade, on-call, rollout/rollback)
  - como atende (ou onde tensiona) as restrições e invariantes

**Artefatos mínimos por alternativa**

| Artefato | Finalidade |
|----------|------------|
| Diagrama textual | explicitar fronteiras, dependências e fluxos críticos |
| Lista de componentes e responsabilidades | reduzir “mágica” e facilitar revisão |
| Estratégia de dados e consistência | expor riscos de integridade e concorrência |
| Estratégia de segurança e compliance | expor superfícies de ataque e controles |
| Plano de migração | indicar custo/risco de adoção incremental |

Um erro comum é pedir “código de exemplo” nessa fase. Para curadoria arquitetural, o que importa é a **estrutura verificável**: contratos, fluxos, invariantes e mecanismos de operação. Código pode aparecer mais tarde, como consequência de uma arquitetura selecionada.

### 9.3.3 Fase 3: Avaliação Multicritério

Avaliação multicritério é o mecanismo que transforma preferência subjetiva (“gosto mais dessa”) em decisão justificável (“essa alternativa atende melhor aos critérios relevantes e não viola gates”). A regra mais importante é separar:

- **Gates (pass/fail)**: restrições críticas e invariantes; violação implica rejeição.
- **Scores (trade-offs)**: atributos de qualidade onde há compensações (manutenibilidade vs. performance etc.).

**Exemplo de rubrica de avaliação (adaptável)**

| Critério | Tipo | Perguntas de avaliação |
|---------|------|------------------------|
| Conformidade com restrições | gate | viola alguma restrição crítica? atende invariantes? |
| Manutenibilidade | score | complexidade, acoplamento, custo de mudança, clareza de contratos |
| Resiliência | score | degradabilidade, isolamento de falhas, recuperação, modos de falha conhecidos |
| Performance/latência | score | caminhos críticos, budgets, hotspots, trade-offs explícitos |
| Segurança e compliance | gate/score | superfícies de ataque, controles, minimização de dados, trilha de auditoria |
| Operabilidade | score | observabilidade, on-call, deploy/rollback, runbooks |
| Custo | score | custo por transação, dependências, custos variáveis e piores casos |

**Boas práticas para evitar “pontuação cosmética”**

- Exija evidências por critério quando possível (por exemplo: qual é o caminho crítico? qual é o plano de rollback? onde está a trilha de auditoria?).
- Faça análise de sensibilidade: se o peso de um critério mudar, a decisão muda? Se muda, o risco é que a decisão esteja frágil.
- Documente critérios e pesos antes de ver as alternativas (para reduzir viés de confirmação).

Quando a decisão tem alto impacto, a avaliação multicritério deve ser complementada por validações empíricas (provas de conceito, experimentos de carga, threat modeling). Curadoria não substitui verificação; ela organiza e prioriza o que deve ser verificado.

### 9.3.4 Fase 4: Seleção e Refinamento

Nesta fase, a curadoria deixa de ser exploração e passa a ser compromisso: escolher uma alternativa implica assumir trade-offs e estabelecer um plano de implementação e verificação.

**Seleção (decisão)**

- Selecione 1 a 2 alternativas finalistas para revisão humana aprofundada.
- Faça revisão cruzada (engenharia, segurança, operação, dados), proporcional ao risco.
- Registre a decisão em um ADR, incluindo por que as alternativas rejeitadas foram rejeitadas.

**Refinamento (tornar implementável e verificável)**

O refinamento traduz a alternativa escolhida em um desenho que pode ser integrado ao sistema existente:

- definir contratos e fronteiras (APIs, eventos, schemas)
- explicitar dependências e responsabilidades
- definir mecanismos de contenção (timeouts, circuit breakers, quotas, fallbacks)
- definir estratégia de rollout (canary, feature flags, migração incremental) e rollback
- definir plano de verificação (testes, validações, observabilidade, critérios de aceitação)

**O que deve entrar no log/ADR de curadoria**

| Campo | Por que importa |
|-------|-----------------|
| Contexto e objetivo | evita decisões “sem problema” |
| Restrições e invariantes relevantes | torna a decisão auditável |
| Alternativas consideradas | reduz repetição de trabalho e vieses |
| Critérios e pesos usados | explicita trade-offs |
| Riscos residuais e mitigação | evita surpresa em produção |
| Plano de verificação e rollout/rollback | conecta arquitetura a operação |
| Responsáveis (quem decidiu e revisou) | accountability |

Um sinal de maturidade é quando decisões de curadoria alimentam de volta o capital de contexto: novas restrições, padrões proibidos, lições aprendidas e critérios de observabilidade passam a ser parte do “filtro” das próximas decisões.

---

## 9.4 Anti-Padrões de Curadoria

### 9.4.1 Aceitação Cega (Blind Acceptance)

**Problema**: Aceitar primeira proposta da IA sem avaliação crítica.

**Consequências**:
- Violação de restrições críticas
- Soluções "plausíveis mas incorretas"
- Acúmulo de débito técnico

**Mitigação**: Checklist obrigatório de verificação.

### 9.4.2 Over-Specification

**Problema**: Especificar soluções ao invés de restrições.

**Consequências**:
- Limita criatividade da IA
- Herda vieses do arquiteto
- Soluções subótimas

**Mitigação**: Focar em restrições negativas ("não use X") ao invés de positivas ("use Y").

### 9.4.3 Falta de Contexto

**Problema**: Gerar alternativas sem capital de contexto adequado.

**Consequências**:
- Soluções genéricas
- Incompatibilidade com sistema existente
- Rejeições em cascata

**Mitigação**: Documentar e versionar capital de contexto.

### 9.4.4 Decisões sem Accountability

**Problema**: Selecionar alternativas sem registrar quem decidiu e por quê.

**Consequências**:
- Audit trail incompleto
- Responsabilidade difusa
- Repetição de erros

**Mitigação**: Log obrigatório de todas as decisões de curadoria.

---

## 9.5 Métricas de Curadoria

Métricas de curadoria existem para responder a duas perguntas:

1. O processo está **evitando decisões ruins** (qualidade e risco)?
2. O processo está **convergindo rápido** o suficiente (custo e velocidade)?

Como toda métrica, elas sofrem com a Lei de Goodhart: quando viram objetivo, podem ser “otimizadas” de forma a degradar a realidade. Por isso, o ideal é usar um conjunto pequeno, com interpretação contextual, separando métricas **leading** (processo) e **lagging** (resultado).

**Categorias úteis de métricas**

| Categoria | Métrica (exemplos) | O que sinaliza | Risco de interpretação |
|----------|---------------------|----------------|------------------------|
| Eficiência | tempo médio por decisão; alternativas geradas por decisão | custo do processo | menos tempo pode significar menos rigor |
| Qualidade (processo) | % de alternativas rejeitadas por violar restrição crítica; # de violações críticas detectadas antes de implementação | eficácia do filtro | rejeição alta pode indicar especificação ruim ou alternativas fracas |
| Qualidade (resultado) | retrabalho pós-decisão; incidentes atribuíveis a decisões arquiteturais; “regressões de constraints” | impacto real | atribuição pode ser difícil; exige postmortems consistentes |
| Cobertura de contexto | % de decisões com restrições/invariantes explicitadas; % de decisões com plano de verificação | maturidade do capital de contexto | risco de burocratização (documento sem valor) |
| Accountability | % de decisões com ADR; % com racional e responsáveis | auditabilidade | pode virar “checkbox” se não houver review |

**Sinais operacionais (heurísticas simples)**

- Taxas extremas de aceitação (quase tudo aceito ou quase tudo rejeitado) costumam indicar um problema: ou o filtro está fraco, ou a especificação está inviável, ou a geração não está explorando alternativas úteis.
- Se o tempo por decisão cai muito sem melhora em métricas de resultado (retrabalho/incidentes), é provável que o processo esteja perdendo rigor.
- Se o volume de documentação cresce sem reduzir retrabalho, o problema não é “mais texto”, mas sim a falta de critérios verificáveis.

O objetivo final não é maximizar um score composto, mas reduzir risco e aumentar previsibilidade: **menos surpresas, mais decisões justificáveis, e melhor capacidade de evolução**.

---

## 9.6 Checklist de Curadoria Arquitetural

### Antes de Gerar Alternativas

- [ ] Documentei todas as restrições críticas?
- [ ] Defini invariantes arquiteturais?
- [ ] Identifiquei padrões proibidos?
- [ ] Coletei lições aprendidas de falhas anteriores?
- [ ] Validei se contexto está completo?

### Durante a Avaliação

- [ ] Verifiquei conformidade com restrições críticas?
- [ ] Avaliei cada critério de qualidade?
- [ ] Considerei trade-offs explicitamente?
- [ ] Validei se solução é verificável?
- [ ] Verifiquei integração com sistema existente?

### Após Seleção

- [ ] Documentei por que esta alternativa foi escolhida?
- [ ] Registrei quem tomou a decisão?
- [ ] Identifiquei riscos residuais?
- [ ] Defini plano de verificação?
- [ ] Comuniquei decisão aos stakeholders?

---

## Summary

- **Curadoria Arquitetural** é a prática de avaliar, selecionar e integrar soluções geradas por IA
- **Capital de Contexto** são restrições e invariantes que diferenciam o arquiteto
- **Processo**: Especificar → Gerar → Avaliar → Selecionar → Refinar → Integrar → Verificar → Governar
- **Métricas**: Eficiência, qualidade, cobertura e accountability
- **Anti-padrões**: Aceitação cega, over-specification, falta de contexto, decisões sem accountability

---

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
|----------|-----------|
| **Descartabilidade Geracional** | Muito Baixa — curadoria é skill essencial na era dos LLMs |
| **Custo de Verificação** | Alto — avaliação arquitetural requer julgamento humano |
| **Responsabilidade Legal** | Crítica — arquiteto é responsável por decisões de curadoria |

---

## References

1. KRISHNAN, N. AI Agents: Evolution, Architecture, and Real-World Applications. arXiv:2503.12687, 2025. Disponível em: https://arxiv.org/abs/2503.12687

2. McKINSEY & COMPANY. Enterprise technology's next chapter: Four gen AI shifts that will reshape business technology. McKinsey Digital, 2024. Disponível em: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/enterprise-technologys-next-chapter-four-gen-ai-shifts-that-will-reshape-business-technology

3. THOUGHTWORKS. Technology Radar Vol. 31: An opinionated guide to today's technology landscape. Thoughtworks, Inc., 2024. Disponível em: https://www.thoughtworks.com/radar

4. DE BOER, M. et al. Design Patterns for Large Language Model Based Neuro-Symbolic Systems. Neurosymbolic Artificial Intelligence, Vol. 1, pp. 1-20, 2025. DOI: 10.1177/29498732251377499

5. AWS. Agentic AI patterns and workflows on AWS. AWS Prescriptive Guidance, 2025. Disponível em: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/

6. GOOGLE CLOUD. Choose a design pattern for your agentic AI system. Cloud Architecture Center, 2025. Disponível em: https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system

7. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

---

*SWEBOK-AI v5.0 - Software Architecture - Seção 9*

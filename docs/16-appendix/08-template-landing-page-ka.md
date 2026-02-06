---
title: 'Apêndice H: Template Padrão de index.md para KAs'
created_at: '2026-02-06'
tags: [template, index, landing-page, ka, padronizacao]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Apêndice H: Template Padrão de index.md para KAs

## Objetivo

Padronizar a entrada de cada KA para melhorar navegabilidade, contexto de
leitura não linear e manutenção editorial.

## Estrutura Obrigatoria

1. Frontmatter canônico.
2. Título do KA.
3. Escopo e problema central.
4. Objetivos de aprendizagem.
5. Mapa de seções com links.
6. Conexões com outros KAs.
7. Critérios de leitura recomendada.

## Template Canônico

```markdown
---
title: "KA NN - <Nome do KA>: Visão Geral"
created_at: "AAAA-MM-DD"
tags: ["ka-nn", "visao-geral", "swebok-ai"]
status: "published"
updated_at: "AAAA-MM-DD"
ai_model: "<modelo>"
---

# KA NN - <Nome do KA>

## Escopo

Descreva o objetivo do KA em 1-2 parágrafos, com fronteiras explicitas do que
esta dentro e fora.

## Pergunta Central

Qual decisao de engenharia este KA ajuda a tomar de forma melhor que o SWEBOK
tradicional?

## Objetivos de Aprendizagem

Ao concluir este KA, você deve ser capaz de:

1. Objetivo verificavel 1.
2. Objetivo verificavel 2.
3. Objetivo verificavel 3.

## Mapa de Seções

1. [01 - <Seção 1>](./01-<slug>.md) - resultado esperado.
2. [02 - <Seção 2>](./02-<slug>.md) - resultado esperado.
3. [03 - <Seção 3>](./03-<slug>.md) - resultado esperado.

## Interfaces com Outros KAs

- Entradas: KA(s) que fornecem contexto para este KA.
- Saidas: KA(s) que consomem decisões deste KA.
- Conflitos comuns: tensões de trade-off mais frequentes.

## Leitura Recomendada por Perfil

- Arquiteto: seções X, Y.
- Lider tecnico: seções A, B.
- Qualidade/segurança: seções M, N.

## Critérios de Qualidade Editorial

- Linguagem orientada a decisão.
- Evidências rastreáveis.
- Exemplos com contexto e limites.
```

## Regras de Uso

1. Todo KA deve possuir `index.md` antes da primeira seção de conteúdo no `nav`.
2. O `index.md` nao substitui conteúdo técnico; ele orienta leitura e escopo.
3. Mudanças na ordem de seções devem refletir no mapa do `index.md`.

## Risco de Implementacao

- **Risco:** landing pages virarem duplicação de conteúdo.
- **Mitigação:** limite de 400-700 palavras e foco em orientação, não em ensino
  detalhado.

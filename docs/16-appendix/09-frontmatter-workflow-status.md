---
title: 'Apêndice I: Vocabulário Canônico de Frontmatter e Workflow de Status'
created_at: '2026-02-06'
tags: [frontmatter, status, workflow, qualidade-editorial]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Apêndice I: Vocabulário Canônico de Frontmatter e Workflow de Status

## Esquema Minimo Obrigatorio

Todo arquivo de conteúdo deve conter os campos abaixo:

```yaml
title: <string>
created_at: <YYYY-MM-DD>
tags: [<tag1>, <tag2>]
status: <draft|in-progress|research|published>
updated_at: <YYYY-MM-DD>
ai_model: <string>
```

## Vocabulário Canônico de Status

- `draft`: rascunho inicial, estrutura ainda instável.
- `in-progress`: conteúdo principal existente, revisão interna em andamento.
- `research`: seção bloqueada por evidência/referências pendentes.
- `published`: pronto para navegação oficial e referência cruzada.

## Estados Proibidos

- `review` (substituir por `in-progress` ou `published` conforme critério).
- variações como `done`, `final`, `ready`.

## Workflow Editorial de Status

1. `draft` -> `in-progress`
2. `in-progress` -> `research` (quando faltarem evidências críticas)
3. `research` -> `in-progress` (evidências incorporadas)
4. `in-progress` -> `published`

Regra: `published` nao retorna para `draft`; regressão deve voltar para
`in-progress` com justificativa em changelog.

## Regra de Migracao Imediata

Para normalizar base legada:

- `review` -> `in-progress` por padrão.
- `review` -> `published` apenas com checklist completo de qualidade.

Checklist minimo para `published`:

1. Escopo claro e sem ambiguidade terminológica.
2. Referências rastreáveis e atualizadas.
3. Seção de considerações práticas.
4. Consistência com taxonomia oficial.

## Riscos da Normalizacao

- **Risco:** inflar artificialmente maturidade do acervo.
- **Mitigação:** relatório de exceções por KA com justificativa de cada
  conversão.

## Politica de Auditoria

1. Validar frontmatter em CI antes de merge.
2. Bloquear arquivos sem `status` canônico.
3. Emitir relatório mensal de distribuição de status por KA.
4. Validar links internos e seção `## Referências` nos arquivos alterados de PR.

Workflow de referencia:

- `.github/workflows/editorial-validation.yml`

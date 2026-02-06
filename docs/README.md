# SWEBOK-AI v5.0 - Guia Interno de Estrutura Editorial

Este arquivo e um guia **interno de manutencao editorial**.

- Home publica canonica: `docs/index.md`
- Navegacao oficial do site: `mkdocs.yml`
- Taxonomia canonica: `docs/16-appendix/07-taxonomia-editorial-kas.md`

## Escopo e Fonte de Verdade

- Este arquivo nao substitui a narrativa publica do livro.
- O conteudo institucional para leitores finais deve ficar em `docs/index.md`.
- A estrutura de menu publicada e a definida em `mkdocs.yml`.

## Estrutura Canonica do Livro

- KAs oficiais: **01-15**
- Blocos estruturais nao-KA:
  - `00` Introducao
  - `16` Apendice de referencia
- Linguagem canonica: **"15 KAs + Introducao (00) + Apendice (16)"**

## Regras Minimas de Conteudo

- Todo arquivo de conteudo em `docs/` deve ter frontmatter com:
  - `title`
  - `created_at`
  - `tags`
  - `status` (`draft|in-progress|research|published`)
  - `updated_at`
  - `ai_model`
- Estados proibidos: `review`, `done`, `final`, `ready`.

Referencia: `docs/16-appendix/09-frontmatter-workflow-status.md`.

## Convencoes Operacionais

- Use `PLAN.md` na raiz para planejamento macro por sprint.
- Mantenha links internos atualizados ao mover/renomear arquivos.
- Evite duplicar diretrizes entre apendices; quando houver conflito, priorize:
  1. `mkdocs.yml`
  2. `docs/16-appendix/07-taxonomia-editorial-kas.md`
  3. `docs/16-appendix/09-frontmatter-workflow-status.md`

## Checklist Rapido de Revisao

- [ ] Taxonomia do texto consistente com `15 KAs + 00 + 16`
- [ ] Frontmatter valido com status canonico
- [ ] Terminologia alinhada ao AGENTS.md do projeto
- [ ] Navegacao e links internos funcionando no build local

## Validacao Recomendada

```bash
mkdocs build
```

Se o build falhar, corrigir links, metadados ou paths antes de merge.

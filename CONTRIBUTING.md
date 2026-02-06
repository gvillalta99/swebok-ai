# Contribuindo com o SWEBOK-AI v5.0

Obrigado por contribuir com o projeto.

## Escopo

- Este repositorio publica documentacao em Markdown para o site MkDocs.
- O idioma principal e portugues (PT-BR), com tom tecnico e formal.

## Como contribuir

1. Crie uma branch para sua alteracao.
2. Edite arquivos em `docs/` mantendo frontmatter valido.
3. Execute validacao local:

```bash
mkdocs build
```

4. Abra um Pull Request com resumo claro do problema e da solucao.

## Padrao minimo de conteudo

- Use nomenclatura de arquivo em `kebab-case`.
- Inclua e mantenha frontmatter (`title`, `created_at`, `tags`, `status`,
  `updated_at`, `ai_model`).
- Preserve consistencia terminologica com `AGENTS.md` e com a navegacao em
  `mkdocs.yml`.
- Evite links quebrados e referencias para arquivos inexistentes.

## Checklist de revisao

- [ ] Conteudo alinhado ao paradigma AI-First
- [ ] Links internos validos
- [ ] Build `mkdocs build` sem avisos novos
- [ ] Frontmatter completo e consistente

## Licenca e materiais de terceiros

Ao contribuir, voce concorda em licenciar seu conteudo sob os termos definidos
em `LICENSE`. Para uso de materiais de terceiros, consulte `NOTICE.md`.

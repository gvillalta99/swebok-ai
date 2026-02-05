---
title: Environment Scan
created_at: '2026-01-31'
tags: [opencode, environment, scan]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Environment Scan

## INFRA

- Linux (OS-native; sem docker-compose)
- Workspace: `/home/gustavo/Documentos/swebok-ai`

Evidencias:

- Nao ha `Dockerfile` nem `docker-compose*.yml` no repositorio

## DOMAIN

- Projeto de documentacao (SWEBOK-AI v5.0) gerado com MkDocs
- Conteudo-fonte em `docs/` (capitulos 00-19)

## STACK

- Markdown (fonte do conteudo)
- Python (MkDocs):
  - `mkdocs`
  - `mkdocs-material`
  - `mkdocs-exporter`
  - `pymdown-extensions`
  - `playwright` (dependencia do pipeline de exportacao)
- `mkdocs.yml`: define tema, extensoes Markdown e navegacao
- Deno: `frontmatter-validator` (skill do OpenCode)
- `pyproject.toml`: dependencia `docling` (uso potencial em scripts de
  processamento)

## DOCS lidos

- `AGENTS.md`
- `mkdocs.yml`
- `docs/README.md`
- `docs/index.md`
- `README.md`
- `pyproject.toml`
- `requirements-docs.txt`
- `~/.config/opencode/AGENTS.md`
- `~/.config/opencode/plugin/shell-strategy/shell_strategy.md`
- `~/.config/opencode/plugin/succinct-communication/succinct_strategy.md`

## NOTAS

- `docs/**/PLAN.md` existe para capitulos 00-19 e descreve as sessoes previstas
- `site/` existe no repositorio (pode ser artefato gerado pelo MkDocs; confirmar
  politica de versionamento antes de altera-lo)

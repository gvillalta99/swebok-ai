# Environment Scan (SWEBOK-AI)

## Infra

- OS: Linux (Arch Linux).
- Container: nao detectado (`/.dockerenv` ausente).
- Repo: Git (workspace: `/home/gustavo/Documentos/swebok-ai`).
- Docker: sem `Dockerfile*` e sem `docker-compose*.yml` no repo.

## Domain

- Tipo: projeto de documentacao (SWEBOK-AI v5.0) gerado com MkDocs.
- Fonte de verdade: conteudo em `docs/`.
- Saida gerada: `site/` (definido em `mkdocs.yml`).

## Stack

- Python: `>=3.12` (em `pyproject.toml`).
- MkDocs:
  - `mkdocs==1.6.1`
  - `mkdocs-material==9.5.50`
  - `mkdocs-exporter==6.2.0` (gera PDF em `assets/swebok-ai.pdf`)
  - `playwright==1.49.1`
  - `pymdown-extensions==10.14.3`
- Python libs adicionais: `docling>=2.70.0`.
- OpenCode: `.opencode/package.json` com `@opencode-ai/plugin`.
- DB/Auth: nao aplicavel (site estatico; sem backend observado).

## Docs Read

- `README.md`
- `mkdocs.yml`
- `docs/README.md`
- `docs/index.md`
- `requirements-docs.txt`
- `pyproject.toml`

## Estrutura de Capitulos

- Capitulos / KAs em pastas `docs/00-introduction` ate `docs/18-engineering-foundations`.
- Apice/Apice: `docs/19-appendix` (existe `PLAN.md`).
- Navegacao principal: `mkdocs.yml` (nav aponta para arquivos iniciais por capitulo).

## Execution Status

- Phase 1 (00-05): In Progress (parallel execution attempted)
- Phase 2 (06-11): Pending
- Phase 3 (12-17): Pending
- Phase 4 (18-19): Pending
- Integration: Pending

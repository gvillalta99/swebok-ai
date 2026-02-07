# Agents

## Visão Geral do Projeto

**SWEBOK-AI v5.0** (Software Engineering Body of Knowledge - AI Edition) é uma
reimaginação completa do Guia do Conhecimento em Engenharia de Software
tradicional (SWEBOK v4) para a era dos Large Language Models (LLMs).

### Princípio Diretor

> **"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é
primariamente sobre sintaxe e lógica de implementação, assumindo que geração
algorítmica é infraestrutura, não produto.

## Estrutura do Projeto

### Organização de Diretórios

```
├── README.md
├── AGENTS.md
├── mkdocs.yml
├── docs/
│   ├── index.md
│   ├── introduction.md
│   ├── 00-new-era/
│   ├── 01-software-requirements/
│   ├── 02-software-architecture/
│   ├── 03-software-design/
│   ├── 04-software-construction/
│   ├── 05-software-testing/
│   ├── 06-software-engineering-operations/
│   ├── 07-software-maintenance/
│   ├── 08-software-configuration-management/
│   ├── 09-software-engineering-management/
│   ├── 10-software-engineering-process/
│   ├── 11-software-engineering-models-and-methods/
│   ├── 12-software-quality/
│   ├── 13-software-security/
│   ├── 14-software-engineering-professional-practice/
│   ├── 15-software-engineering-economics/
│   ├── 16-appendix/
│   ├── imgs/
│   └── stylesheets/
├── pesquisa/
│   ├── index.md
│   ├── introduction.md
│   ├── 00-new-era/
│   ├── 01-software-requirements/
│   ├── 02-software-architecture/
│   ├── 03-software-design/
│   ├── 04-software-construction/
│   ├── 05-software-testing/
│   ├── 06-software-engineering-operations/
│   ├── 07-software-maintenance/
│   ├── 08-software-configuration-management/
│   ├── 09-software-engineering-management/
│   ├── 10-software-engineering-process/
│   ├── 11-software-engineering-models-and-methods/
│   ├── 12-software-quality/
│   ├── 13-software-security/
│   ├── 14-software-engineering-professional-practice/
│   ├── 15-software-engineering-economics/
│   ├── 16-appendix/
│   └── extra/
└── site/
```

______________________________________________________________________

## Technology Stack

Este é um projeto de **documentação** com site gerado via MkDocs:

- **Formato:** Markdown (.md)
- **Linguagem:** Português (PT-BR) - conteúdo principal
- **Configuração de agentes:** YAML front matter (ex: `book-writer.md`)
- **Build system:** MkDocs com tema Material
- **Dependências:** Python + MkDocs + mkdocs-material + mkdocs-exporter

### Setup do MkDocs

Para executar o site localmente:

```bash
# Instalar dependências
pip install mkdocs mkdocs-material mkdocs-exporter

# Servir localmente (hot reload)
mkdocs serve

# Build do site
mkdocs build

# Deploy para GitHub Pages
mkdocs gh-deploy
```

### Estrutura do mkdocs.yml

O arquivo `mkdocs.yml` define:

- **Tema:** Material com recursos de navegação instantânea, busca, etc.
- **Plugins:** Search e exporter (PDF)
- **Extensões Markdown:** Admonitions, tabelas, TOC, etc.
- **Navegação:** Mapeamento manual de todos os KAs e seções

### Convenções para o Site

- Todo conteúdo fica em `docs/`
- Site gerado vai para `site/` (não versionado)
- Arquivos excluídos da navegação: `**/PLAN.md`, `**/README.md`
- PDF consolidado gerado em `assets/swebok-ai.pdf`

______________________________________________________________________

## Convenções

### Idioma e Tom

- **Idioma primário:** Português formal (PT-BR)
- **Tom:** Acadêmico/técnico, formal e preciso
- **Tratamento:** Formal ("você")
- **Termos técnicos:** Manter em inglês quando não houver tradução consagrada
  (ex: "debugging", "framework")

### Estrutura de Arquivos

- Nomenclatura: kebab-case (`nome-do-arquivo.md`)
- Codificação: UTF-8
- Extensão: `.md` para todo conteúdo

### Estrutura de Conteúdo

Todo arquivo de conteúdo deve seguir esta estrutura:

```markdown
---
title: TITULO
created_at: DATA
tags: [tag1, tag2, tag3] # tags relevantes
status: STATUS # (draft, in-progress, research, published)
updated_at: DATA
ai_model: MODELO
---

# Título da Seção

[Conteúdo...]

## [Subseção 1]

[Conteúdo...]

## Referências

1. [Autor], [Título], [Publicação], [Ano], [URL se existir]
```

## Processo de escrita

Fazer o commit e push ao final de cada etapa.

1. Fase de Pesquisa: O agent @book-researcher faz a pesquisa sobre o KA e salva em pesquisa/$KA/RESEARCH.md
2. **Fase de Planejamento**: O agent @book-editor faz o planos das sessões que devem ser escritas para aquela KA e salva em docs/$KA/PLAN.md
3. Fase de Rascunho: O agent @book-writer faz uma versao draft de cada sesão de acordo com o docs/$KA/PLAN.md
4. Fase de Revisão: O agent @book-reviewer sugere melhorias em cada sessão.
5. **Fase de Escrita**: O agent @book-writer faz desenvolve o texto de cada sessão até o @book-reviewer não ter mais nenhuma sugestão.
6. Fase de publicação: O agent @book-editor faz os ajustes finais e marca como published.

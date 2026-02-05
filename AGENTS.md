# Livro:

> Guia de orientação para agentes de IA trabalhando neste projeto. Última
> atualização: 2026-01-29

______________________________________________________________________

## Visão Geral do Projeto

**SWEBOK-AI v5.0** (Software Engineering Body of Knowledge - AI Edition) é uma
reimaginação completa do Guia do Conhecimento em Engenharia de Software
tradicional (SWEBOK v4) para a era dos Large Language Models (LLMs).

### Princípio Diretor

> **"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é
primariamente sobre sintaxe e lógica de implementação, assumindo que geração
algorítmica é infraestrutura, não produto.

---

## Estrutura do Projeto

### Organização de Diretórios

```
├── README.md
├── AGENTS.md
├── mkdocs.yml
├── docs/
│   ├── README.md
│   ├── index.md
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
│   └── 15-software-engineering-economics/
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

## Convenções de Desenvolvimento

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

1. [Autor], [Título], [Publicação], [Ano]
```

______________________________________________________________________

## Mapeamento dos KAs

### KAs Tradicionais Reconfigurados

| Nº  | Nome Original         | Novo Nome (SWEBOK-AI)                          | Foco Principal                               |
| --- | --------------------- | ---------------------------------------------- | -------------------------------------------- |
| 00  | -                     | Nova Era                                       | Contexto da inteligencia artificial atual                  |
| 01  | Software Requirements | Engenharia de Restrições e Contexto            | Limites e fronteiras para IA                 |
| 02  | Software Architecture | Arquitetura de Sistemas Híbridos               | Padrões humanos-IA                           |
| 03  | Software Design       | Design de Sistemas Híbridos                    | Auditabilidade e supervisão                  |
| 04  | Software Construction | Orquestração e Curadoria de Código             | Avaliação de código gerado                   |
| 05  | Software Testing      | Verificação e Validação em Escala              | Teste de sistemas não-determinísticos        |
| 07  | Software Maintenance  | Manutenção de Sistemas Opaços                  | Código legado sem documentação de raciocínio |
| 14  | Professional Practice | Prática Profissional e Julgamento Técnico      | Autoridade técnica e "quando dizer não à IA" |
| 15  | Engineering Economics | Economia e Métricas da Engenharia com IA       | Paradoxo de Jevons, TCO de código gerado     |
| 16  | Computing Foundations | Fundamentos de Sistemas Cognitivos Artificiais | LLMs, RAG, atenção em Transformers           |

______________________________________________________________________

## Guia para Contribuição

### Antes de Escrever

1. **Verifique o `PLAN.md`**: Se existir no KA, segue o plano estabelecido
2. **Mantenha consistência**: Use a mesma terminologia entre seções e KAs

### Princípios de Escrita

1. **Perspectiva AI-First:** Assuma que geração de código é infraestrutura
2. **Gargalos:** Qual é o novo gargalo?
3. **Human-in-the-Loop:** Onde o humano participa?
4. **Realidade Econômica:** Considere TCO e Paradoxo de Jevons

### Checklist de Qualidade

Antes de finalizar conteúdo:

- [ ] Termos técnicos definidos no primeiro uso
- [ ] Exemplos práticos e relevantes
- [ ] Referências citadas corretamente
- [ ] Considerações econômicas abordadas

______________________________________________________________________

## Processo de escrita

1. **Fase de Planejamento**: Criar `PLAN.md` no diretório do KA
2. Fase de Pesquisa: Use o mcp exa ou o web search para pesquisar sobre o tema e escrever um rascunho.
3. Fase de Revisão: Buscar referências recentes sobre o tema e adicioná-las ao PLAN.md
4. **Fase de Escrita**: Desenvolver o texto, use o agent @book-writer
5. **Fase de Revisão**: Revisar o texto e as referências bibliográficas, use o agent @book-reviewer
    1. A revisão tem algum problema,
    2. Corrija os problemas
    3. Volte para a etapa 4
6. Marcar como published
7. Fazer o commit com o skill commiter
8. Fazer o push

______________________________________________________________________

## Contato e Coordenação

Este projeto é desenvolvido de forma contínua. Ao trabalhar em qualquer KA:

- Verifique dependências com outros KAs
- Mantenha referências cruzadas atualizadas
- Documente decisões arquiteturais em ADRs quando aplicável

______________________________________________________________________

*Este documento é um guia vivo e deve ser atualizado conforme o projeto evolui.*

---
name: frontmatter-validator
description: Valida e padroniza o frontmatter de arquivos Markdown no projeto SWEBOK-AI. Verifica campos obrigatórios (title, created_at, tags, status, updated_at, ai_model) e gera relatórios de conformidade.
license: MIT
metadata:
  author: swebok-ai
  version: "1.0"
  domain: documentation
  type: validator
  maturity: working
---

# Frontmatter Validator

Valida e garante a padronização do frontmatter YAML em todos os arquivos Markdown do projeto SWEBOK-AI.

## Campos Obrigatórios

Todo arquivo Markdown deve ter o seguinte frontmatter:

```yaml
---
title: "Título do Documento"
created_at: "2025-01-31"
tags: ["tag1", "tag2"]
status: "draft" | "review" | "published"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5" | "gpt-4" | "claude-3.5-sonnet" | "outro"
---
```

### Descrição dos Campos

| Campo | Tipo | Descrição | Valores Válidos |
|-------|------|-----------|-----------------|
| **title** | string | Título do documento | Qualquer texto descritivo |
| **created_at** | string | Data de criação | Formato ISO 8601 (YYYY-MM-DD) |
| **tags** | array | Tags categorizadoras | Array de strings |
| **status** | string | Status do documento | `draft`, `review`, `published` |
| **updated_at** | string | Última atualização | Formato ISO 8601 (YYYY-MM-DD) |
| **ai_model** | string | Modelo de IA usado | Identificador do modelo |

### Valores Válidos para Status

- **draft**: Documento em desenvolvimento
- **review**: Documento em revisão
- **published**: Documento publicado/finalizado

### Valores Comuns para ai_model

- `kimi-k2.5`
- `gpt-4`
- `gpt-4-turbo`
- `claude-3.5-sonnet`
- `claude-3-opus`
- `gemini-pro`
- `manual` (para edições manuais)

## Uso

### Validar um arquivo específico

```bash
deno run --allow-read scripts/fm-validate.ts docs/01-software-requirements/01-fundamentos.md
```

### Validar todos os arquivos do projeto

```bash
deno run --allow-read --allow-run scripts/fm-validate.ts --all
```

### Validar com relatório detalhado

```bash
deno run --allow-read scripts/fm-validate.ts --all --report
```

### Corrigir frontmatter automaticamente

```bash
deno run --allow-read --allow-write scripts/fm-validate.ts --all --fix
```

## Estados de Validação

| Estado | Descrição | Ação |
|--------|-----------|------|
| **FM0** | Sem frontmatter | Adicionar frontmatter padrão |
| **FM1** | Frontmatter incompleto | Completar campos faltantes |
| **FM2** | Campos inválidos | Corrigir valores inválidos |
| **FM3** | Formato incorreto | Ajustar formatação YAML |
| **FM4** | Frontmatter válido | Nenhuma ação necessária |

## Exemplos de Frontmatter

### Documento Novo (Draft)

```yaml
---
title: "Fundamentos da Engenharia de Restrições"
created_at: "2025-01-31"
tags: ["requisitos", "restrições", "fundamentos"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---
```

### Documento em Revisão

```yaml
---
title: "Arquitetura de Sistemas Híbridos"
created_at: "2025-01-15"
tags: ["arquitetura", "sistemas-hibridos", "ia"]
status: "review"
updated_at: "2025-01-30"
ai_model: "claude-3.5-sonnet"
---
```

### Documento Publicado

```yaml
---
title: "Introdução ao SWEBOK-AI v5.0"
created_at: "2025-01-01"
tags: ["introducao", "visao-geral", "swebok-ai"]
status: "published"
updated_at: "2025-01-31"
ai_model: "manual"
---
```

## Validações Realizadas

### 1. Presença de Frontmatter
- Verifica se o arquivo começa com `---`
- Verifica se há fechamento `---` após o YAML

### 2. Campos Obrigatórios
- Todos os 6 campos devem estar presentes
- Nenhum campo pode ser nulo ou vazio

### 3. Formato de Datas
- `created_at` e `updated_at` devem estar no formato YYYY-MM-DD
- Datas devem ser válidas (ex: não existe 2025-02-30)

### 4. Tags
- Deve ser um array (mesmo que vazio)
- Cada tag deve ser uma string
- Tags devem estar em kebab-case

### 5. Status
- Deve ser um dos valores permitidos
- Case-sensitive (minúsculo)

### 6. ai_model
- Deve identificar o modelo de IA usado
- Use `manual` para edições humanas sem IA

## Relatório de Validação

O relatório inclui:

- Total de arquivos analisados
- Arquivos válidos vs inválidos
- Lista de erros por arquivo
- Sugestões de correção
- Estatísticas por diretório

## Integração com Workflow

### Pré-commit Hook

```bash
# .git/hooks/pre-commit
#!/bin/bash
deno run --allow-read scripts/fm-validate.ts --all
if [ $? -ne 0 ]; then
    echo "Frontmatter validation failed. Please fix before committing."
    exit 1
fi
```

### CI/CD Pipeline

```yaml
# .github/workflows/validate.yml
- name: Validate Frontmatter
  run: deno run --allow-read scripts/fm-validate.ts --all --strict
```

## Anti-Patterns

### ❌ Frontmatter Ausente
```markdown
# Título do Documento

Conteúdo aqui...
```

### ❌ Campos Faltantes
```yaml
---
title: "Documento"
created_at: "2025-01-31"
# Faltando: tags, status, updated_at, ai_model
---
```

### ❌ Formato de Data Incorreto
```yaml
---
title: "Documento"
created_at: "31/01/2025"  # Errado! Use ISO 8601
---
```

### ❌ Status Inválido
```yaml
---
title: "Documento"
status: "finalizado"  # Errado! Use "published"
---
```

## Ferramentas Disponíveis

### fm-validate.ts
Script principal de validação.

**Opções:**
- `<arquivo>`: Validar arquivo específico
- `--all`: Validar todos os arquivos .md em docs/
- `--report`: Gerar relatório detalhado
- `--fix`: Tentar corrigir problemas automaticamente
- `--strict`: Falhar se houver qualquer erro

### fm-check.ts
Verificação rápida de um campo específico.

```bash
deno run --allow-read scripts/fm-check.ts docs/arquivo.md --field status
```

### fm-update.ts
Atualiza campos específicos.

```bash
# Atualizar status
deno run --allow-read --allow-write scripts/fm-update.ts docs/arquivo.md --status published

# Atualizar data de modificação
deno run --allow-read --allow-write scripts/fm-update.ts docs/arquivo.md --touch

# Atualizar modelo de IA
deno run --allow-read --allow-write scripts/fm-update.ts docs/arquivo.md --ai-model gpt-4
```

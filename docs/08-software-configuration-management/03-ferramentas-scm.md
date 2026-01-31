---
title: "8.3 Ferramentas de SCM"
created_at: 2025-01-31
tags: ["scm", "versionamento", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# 8.3 Ferramentas de SCM

## Overview

As ferramentas de SCM tradicionais (Git, SVN) precisam ser complementadas com ferramentas especializadas para gerenciar artefatos de IA. Esta seção apresenta ferramentas e práticas para SCM em sistemas híbridos.

## Ferramentas por Categoria

### Versionamento de Código

| Ferramenta | Tipo | Uso Principal |
|------------|------|---------------|
| **Git** | OSS | Versionamento de código e prompts |
| **Git LFS** | OSS | Arquivos grandes (modelos) |
| **DVC** | OSS | Data Version Control |
| **MLflow** | OSS | Tracking de experimentos |

### Gestão de Prompts

| Ferramenta | Tipo | Capacidades |
|------------|------|-------------|
| **PromptLayer** | SaaS | Versionamento, analytics |
| **LangSmith** | SaaS | Debugging, testing |
| **Weights & Biases** | SaaS | Experiments, artifacts |
| **Git + YAML** | OSS | Simples, efetivo |

### Gestão de Modelos

| Ferramenta | Tipo | Capacidades |
|------------|------|-------------|
| **MLflow Model Registry** | OSS | Versionamento de modelos |
| **Hugging Face Hub** | SaaS | Modelos, datasets |
| **AWS SageMaker** | Cloud | Registry, deployment |
| **Azure ML** | Cloud | Registry, MLOps |

## Práticas Recomendadas

```yaml
# Estrutura de repositório para SCM de IA

repository/
├── src/                          # Código fonte
│   ├── components/
│   └── services/
├── prompts/                      # Prompts versionados
│   ├── v1.0.0/
│   ├── v1.1.0/
│   └── current.yaml
├── configs/                      # Configurações
│   ├── development.yaml
│   ├── staging.yaml
│   └── production.yaml
├── models/                       # Modelos (Git LFS)
│   └── .gitattributes
├── data/                         # Datasets (DVC)
│   └── raw.dvc
└── docs/
    └── architecture/
```

## Summary

- **Git:** Base para versionamento de código e prompts
- **DVC:** Para datasets e modelos grandes
- **MLflow:** Tracking completo de experimentos
- **Estrutura:** Organização clara separando concerns

## References

1. Chacon, S., & Straub, B. (2014). *Pro Git* (2nd ed.). Apress.

2. DVC Team (2025). *DVC Documentation*. dvc.org.

3. MLflow Authors (2025). *MLflow Documentation*. mlflow.org.

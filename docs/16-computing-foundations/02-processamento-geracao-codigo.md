# 16.2 Processamento e Geração de Código

## Overview

LLMs para código (Code LLMs) são treinados especificamente para entender e gerar código em múltiplas linguagens.

## Modelos de Código

| Modelo | Desenvolvedor | Capacidades |
|--------|---------------|-------------|
| **GPT-4** | OpenAI | Geral, excelente em múltiplas linguagens |
| **Claude** | Anthropic | Geral, foco em segurança |
| **CodeLlama** | Meta | Especializado em código |
| **StarCoder** | BigCode | Open source, múltiplas linguagens |
| **Copilot** | GitHub/OpenAI | Integração com IDEs |

## Tokenização de Código

```python
# Código é tokenizado considerando estrutura

def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n-1)

# Tokens (simplificado):
# [def, factorial, (, n, ), :, NEWLINE, INDENT, 
#  if, n, <=, 1, :, NEWLINE, INDENT, 
#  return, 1, NEWLINE, DEDENT, 
#  return, n, *, factorial, (, n, -, 1, ), NEWLINE]
```

## Técnicas de Geração

| Técnica | Descrição | Uso |
|---------|-----------|-----|
| **Greedy** | Sempre escolher token mais provável | Determinístico |
| **Beam Search** | Manter N melhores sequências | Melhor qualidade |
| **Sampling** | Amostrar de distribuição de probabilidade | Criatividade |
| **Temperature** | Controlar aleatoriedade | Balancear |

## Summary

- **Code LLMs:** Especializados em código, múltiplas linguagens
- **Tokenização:** Considera estrutura sintática
- **Técnicas:** Diferentes abordagens para geração

## References

1. Chen et al. (2021). Evaluating Large Language Models Trained on Code.
2. Li et al. (2023). StarCoder: may the source be with you!

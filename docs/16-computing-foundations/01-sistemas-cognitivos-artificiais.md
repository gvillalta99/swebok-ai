# 16.1 Fundamentos de Sistemas Cognitivos Artificiais

## Overview

Este capítulo apresenta os fundamentos computacionais dos sistemas de IA, com foco em Large Language Models (LLMs) e suas aplicações em engenharia de software.

## Arquitetura de Transformers

```
┌─────────────────────────────────────────────────────┐
│              ARQUITETURA TRANSFORMER                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Input → [Embedding] → [Encoder × N] → [Decoder × N] │
│                              ↓                      │
│                         [Attention]                 │
│                              ↓                      │
│                           Output                    │
│                                                     │
│  Componentes:                                       │
│  - Self-Attention: Relaciona tokens entre si        │
│  - Feed-Forward: Processamento não-linear           │
│  - Layer Norm: Normalização                         │
│  - Residual Connections: Skip connections           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Mecanismo de Atenção

```python
class AttentionMechanism:
    """
    Explicação simplificada de attention
    """
    
    def attention(self, query, key, value):
        """
        Calcula attention scores
        """
        # 1. Similaridade entre query e keys
        scores = query @ key.T
        
        # 2. Normalização (softmax)
        attention_weights = softmax(scores / sqrt(dim))
        
        # 3. Combinação ponderada de values
        output = attention_weights @ value
        
        return output
```

## Treinamento de LLMs

| Fase | Dados | Objetivo |
|------|-------|----------|
| **Pré-treinamento** | Corpus massivo (web, livros) | Aprender linguagem |
| **Fine-tuning** | Dados específicos da tarefa | Especialização |
| **RLHF** | Feedback humano | Alinhamento |
| **Prompt Tuning** | Poucos exemplos | Adaptação rápida |

## Capacidades e Limitações

**Capacidades:**
- Geração de texto coerente
- Completar código
- Responder perguntas
- Traduzir entre linguagens

**Limitações:**
- Alucinações (informações falsas)
- Falta de compreensão profunda
- Viés dos dados de treinamento
- Conhecimento desatualizado

## Summary

- **Transformers:** Arquitetura dominante em NLP
- **Atenção:** Mecanismo chave para relacionar contexto
- **Treinamento:** Pré-treinamento + fine-tuning + RLHF
- **Limitações:** Importante conhecer para uso responsável

## References

1. Vaswani et al. (2017). Attention Is All You Need. *NIPS 2017*.
2. Brown et al. (2020). Language Models are Few-Shot Learners. *NeurIPS 2020*.
3. Ouyang et al. (2022). Training language models to follow instructions. *NeurIPS 2022*.

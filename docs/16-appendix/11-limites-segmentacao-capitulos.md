---
title: 'Apêndice K: Limites de Tamanho e Regras de Segmentação de Capítulos'
created_at: '2026-02-06'
tags: [granularidade, segmentacao, capitulos, padronizacao]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Apêndice K: Limites de Tamanho e Regras de Segmentação de Capítulos

## Objetivo

Reduzir variabilidade extrema de extensão entre capítulos e melhorar leitura,
revisão e manutenção.

## Limites Recomendados

- **Seção padrão de KA:** 1.200 a 2.000 palavras.
- **Faixa aceitável:** 900 a 2.400 palavras.
- **Acima de 2.400:** segmentação obrigatória.
- **Abaixo de 900:** consolidar com seção adjacente ou expandir lacunas.

## Regras de Segmentacao

1. Segmentar por decisão de engenharia, não por volume arbitrário.
2. Cada nova seção deve ter pergunta central própria.
3. Evitar criar seção "continuação" sem autonomia semântica.
4. Atualizar `index.md` do KA com a nova trilha.

## Critérios de Quebra

Segmentar quando houver ao menos um dos sinais:

- mais de 7 subtítulos de mesmo nível;
- mais de 3 estudos de caso independentes;
- mistura de fundamentos e operação no mesmo fluxo;
- dificuldade de revisão incremental por tema.

## Anti-Patterns

- Capítulos "enciclopédicos" sem foco decisório.
- Fragmentação excessiva em microarquivos com baixa densidade.
- Duplicação de introduções após segmentação.

## Controle de Qualidade

1. Medir tamanho por palavra em revisão mensal.
2. Sinalizar arquivos fora da faixa aceitável.
3. Exigir justificativa para exceções permanentes.

## Riscos e Trade-offs

- **Risco:** regra rígida reduzir profundidade técnica em temas complexos.

- **Mitigação:** permitir exceção justificada com nota editorial.

- **Risco:** segmentação gerar perda de fluidez narrativa.

- **Mitigação:** incluir "Contexto da seção" e "Próxima decisão" em cada
  arquivo.

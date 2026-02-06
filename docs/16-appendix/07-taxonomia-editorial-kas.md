---
title: 'Apêndice G: Taxonomia Editorial Oficial de KAs e Apêndices'
created_at: '2026-02-06'
tags: [taxonomia, governanca, estrutura, kas, apendice]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Apêndice G: Taxonomia Editorial Oficial de KAs e Apêndices

## Objetivo

Estabelecer uma taxonomia unica e operacional para eliminar ambiguidade entre
KAs, partes e apêndices no SWEBOK-AI v5.0.

## Invariantes

1. O livro possui **16 blocos numerados (00 a 16)** na navegação principal.
2. O bloco **16** tem natureza de **material de referência**.
3. Apenas blocos com escopo de conhecimento aplicável devem ser tratados como
   **Knowledge Area (KA)** em linguagem editorial.

## Abordagem A - Rigida/Centralizada

### Definicao

- **KAs oficiais:** 01 a 15.
- **Blocos não-KA:** 00 (Introdução) e 16 (Apêndice).
- **Contagem formal de KAs:** 15.
- **Contagem estrutural de blocos:** 17 se contar 00, ou 16 se contar 01..16.

### Vantagens

- Remove conflito semântico entre KA e apêndice.
- Facilita governança de maturidade por KA (01..15).
- Melhora clareza para certificação e auditoria.

### Riscos

- Quebra de mensagens e artefatos existentes que afirmam "16 KAs".
- Exige migração editorial ampla em docs e materiais externos.

## Abordagem B - Flexivel/Modular

### Definicao

- **KAs editoriais:** 00 a 16 (16 é marcado como "KA de referência").
- **Subtipo de bloco:** `core`, `intro`, `reference`.
- **Contagem formal:** 16 KAs + 1 introdução (00), ou 17 blocos totais.

### Vantagens

- Menor ruptura com estado atual de comunicação.
- Preserva numeração existente e reduz retrabalho imediato.

### Riscos

- Mantém sobrecarga conceitual: KA deixa de significar apenas conhecimento
  aplicável e passa a incluir referência.
- Pode confundir métricas de completude entre conteúdo nuclear e material de
  apoio.

## Decisao Recomendada

Adotar **Abordagem A (rigida/centralizada)** para governança de longo prazo:

- Linguagem canônica: "15 KAs + Introdução (00) + Apêndice (16)".
- Em textos de divulgação, permitir shorthand: "estrutura 00-16".

## Regras de Nomeacao

1. Prefixo oficial: `KA NN - Nome` para NN entre 01 e 15.
2. `00 - Introdução` sem prefixo KA.
3. `16 - Apêndice` sem prefixo KA.
4. Proibido usar "Computing Foundations" como KA separado no v5.0.
5. Fundamentos de IA permanecem distribuídos em 00 e KAs aplicáveis.

## Plano de Migracao

1. Atualizar texto-mestre em `docs/README.md`.
2. Atualizar narrativa estrutural em
   `docs/00-new-era/04-estrutura-organizacao.md`.
3. Atualizar labels de navegação no `mkdocs.yml`.
4. Registrar decisão em ADR editorial (fora do escopo deste arquivo).

## Matriz de Avaliacao

| Critério                    | Descrição                      | Avaliação |
| --------------------------- | ------------------------------ | --------- |
| Descartabilidade Geracional | Obsoleto em 36 meses?          | Baixa     |
| Custo de Verificação        | Esforço para validar aderência | Médio     |
| Responsabilidade Legal      | Impacto de inconsistência      | Alto      |

---
title: 'Apêndice C: Lista de Referências Consolidada (Atualizada 2024-2025)'
created_at: '2026-02-05'
tags: [apendice, referencias, bibliografia, evidencias, swebok-ai]
status: in-progress
updated_at: '2026-02-05'
ai_model: kimi-k2.5
---

# Apêndice C: Lista de Referências Consolidada (Atualizada 2024-2025)

## Overview

Este apêndice consolida as referências recomendadas para o SWEBOK-AI v5.0, com
prioridade para fontes de 2024 e 2025. A lista tem dois objetivos estratégicos:

1. **Padronizar o "chão de evidências":** Definir o que é aceito como autoridade
   técnica para decisões de engenharia.
2. **Reduzir a ambiguidade:** Fornecer links diretos para standards e surveys
   que sustentam as afirmações dos KAs.

Diferente de bibliografias acadêmicas exaustivas, esta é uma seleção curada para
o engenheiro de software praticante e o líder técnico.

## Learning Objectives

Após estudar este apêndice, o leitor deve ser capaz de:

1. **Aplicar critérios de curadoria** para selecionar referências técnicas
   (evitando "hype" de fornecedor).
2. **Distinguir** entre referências normativas (obrigatórias) e descritivas
   (informativas).
3. **Rastrear** decisões de arquitetura e governança até suas fontes primárias
   (standards ou papers fundamentais).

## C.1 Critérios de Curadoria (SWEBOK-AI)

### C.1.1 Prioridades

- **Normativo:** Standards (ISO/IEC/IEEE) e regulação primária (EU AI Act).
- **Pesquisa:** Surveys e artigos de síntese revisados por pares (IEEE, ACM,
  arXiv curado).
- **Indústria:** Relatórios com metodologia clara (DORA, McKinsey, WEF).

### C.1.2 Atualidade

- **Regra Geral:** Fontes dos últimos 3 anos (2022-2025).
- **Exceções:** Clássicos fundacionais (ex: ISO 12207) ou papers seminais (ex:
  "Attention Is All You Need").

## C.2 Referências Normativas (Standards e Regulação)

Este bloco sustenta a governança, o risco e a auditabilidade.

- **[01] ISO/IEC 42001:2023** - *Information technology — Artificial
  intelligence — Management system.*
  - O padrão base para sistemas de gestão de IA. Essencial para governança
    corporativa.
- **[02] ISO/IEC 42006:2025** - *Requirements for bodies providing audit and
  certification of artificial intelligence management systems.*
  - Define as regras do jogo para auditoria externa.
- **[03] ISO/IEC 23894:2023** - *Information technology — Artificial
  intelligence — Guidance on risk management.*
  - Extensão da ISO 31000 para riscos específicos de IA.
- **[04] ISO/IEC 38507:2022** - *Governance implications of the use of
  artificial intelligence by organizations.*
  - Focado no corpo diretivo (Board/C-Level).
- **[05] ISO/IEC TS 42119-2:2025** - *Artificial intelligence — Testing of AI —
  Part 2: Overview of testing AI systems.*
  - A ponte entre teste de software tradicional e teste de modelos estocásticos.
- **[06] IEEE 7000-2021** - *IEEE Standard Model Process for Addressing Ethical
  Concerns during System Design.*
  - Engenharia de requisitos focada em valores éticos.
- **[07] NIST AI RMF 1.0 (2023)** - *Artificial Intelligence Risk Management
  Framework.*
  - Framework voluntário, mas amplamente adotado nos EUA e referência global.
- **[08] Regulation (EU) 2024/1689 (EU AI Act)**
  - A primeira legislação abrangente sobre IA do mundo. Define categorias de
    risco (Inaceitável, Alto, Limitado, Mínimo).

## C.3 Referências Técnicas (LLMs, RAG, Agentes)

O núcleo técnico da "Era da IA". Foco em surveys que consolidam o estado da
arte.

- **[09] Zhao, W.X., et al. (2024)** - *A Survey of Large Language Models.*
  - Visão panorâmica sobre pré-treinamento, fine-tuning e avaliação. Referência
    obrigatória.
- **[10] Gao, Y., et al. (2024)** - *Retrieval-Augmented Generation for Large
  Language Models: A Survey.*
  - Cobre paradigmas de RAG (Naive, Advanced, Modular) e técnicas de
    recuperação.
- **[11] Wang, L., et al. (2024)** - *A Survey on Large Language Model based
  Autonomous Agents.*
  - Analisa a arquitetura de agentes: Perfil, Memória, Planejamento e Ação.
- **[12] Zhang, Q., et al. (2024)** - *A Survey on Large Language Models for
  Software Engineering.*
  - Mapeia o uso de LLMs em tarefas de SE: requisitos, geração de código, teste
    e manutenção.

## C.4 Referências de Contexto (Indústria e Economia)

Dados para suportar decisões de investimento e estratégia.

- **[13] DORA (2024)** - *Accelerate State of DevOps Report 2024.*
  - Analisa como a IA está (ou não) impactando a produtividade e a qualidade de
    entrega.
- **[14] World Economic Forum (2025)** - *The Future of Jobs Report 2025.*
  - Tendências macroeconômicas sobre automação e novas competências.
- **[15] McKinsey & Company (2023/2024)** - *The economic potential of
  generative AI.*
  - Estimativas de impacto financeiro por setor. Útil para business cases.

## Practical Considerations

- **Use para Desempate:** Em discussões técnicas, o standard (ISO/IEEE) ganha da
  opinião ("eu acho que...").
- **Leia os Surveys:** Não tente ler todos os papers individuais do arXiv.
  Comece pelos surveys citados (C.3) para ter o mapa mental do domínio.
- **Contextualize:** Relatórios de consultoria (McKinsey) são otimistas por
  natureza. Use-os com cautela.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                             |
| :------------------------------ | :------------------------------------ | :------------------------------------ |
| **Descartabilidade Geracional** | Esta lista será obsoleta em 36 meses? | Média (Papers mudam, Standards ficam) |
| **Custo de Verificação**        | Custo de validar as fontes?           | Baixo (Leitura)                       |
| **Responsabilidade Legal**      | Impacto de ignorar standards?         | Crítica                               |

## Summary

- A base normativa (C.2) é estável e essencial para conformidade.
- A base técnica (C.3) é volátil; surveys são a melhor forma de acompanhar.
- A base contextual (C.4) ajuda a justificar investimentos e mudanças de
  processo.

## References

01. **ISO/IEC.** *ISO/IEC 42001:2023 — Information technology — Artificial
    intelligence — Management system*. 2023.
    <https://www.iso.org/standard/81230.html>
02. **ISO/IEC.** *ISO/IEC 42006:2025 — Requirements for bodies providing audit
    and certification of AIMS*. 2025. <https://www.iso.org/standard/44546.html>
03. **ISO/IEC.** *ISO/IEC 23894:2023 — Artificial intelligence — Guidance on
    risk management*. 2023. <https://www.iso.org/standard/77304.html>
04. **ISO/IEC.** *ISO/IEC 38507:2022 — Governance implications of the use of AI
    by organizations*. 2022. <https://www.iso.org/standard/56641.html>
05. **ISO/IEC.** *ISO/IEC TS 42119-2:2025 — Artificial intelligence — Testing of
    AI — Part 2: Overview*. 2025. <https://www.iso.org/standard/84127.html>
06. **IEEE.** *IEEE Std 7000-2021 — IEEE Standard Model Process for Addressing
    Ethical Concerns during System Design*. 2021.
    <https://standards.ieee.org/standard/7000-2021.html>
07. **NIST.** *AI Risk Management Framework (AI RMF 1.0)*. 2023.
    <https://www.nist.gov/itl/ai-risk-management-framework>
08. **European Union.** *Regulation (EU) 2024/1689 (EU AI Act)*. 2024.
    <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>
09. **Zhao, W.X., et al.** "A Survey of Large Language Models." *arXiv preprint
    arXiv:2303.18223*, 2024. <https://arxiv.org/abs/2303.18223>
10. **Gao, Y., et al.** "Retrieval-Augmented Generation for Large Language
    Models: A Survey." *arXiv preprint arXiv:2312.10997*, 2024.
    <https://arxiv.org/abs/2312.10997>
11. **Wang, L., et al.** "A Survey on Large Language Model based Autonomous
    Agents." *Frontiers of Computer Science*, 2024.
    <https://arxiv.org/abs/2308.11432>
12. **Zhang, Q., et al.** "A Survey on Large Language Models for Software
    Engineering." *arXiv preprint arXiv:2312.15223*, 2024.
    <https://arxiv.org/abs/2312.15223>
13. **DORA.** *Accelerate State of DevOps Report 2024*. Google Cloud, 2024.
14. **World Economic Forum.** *The Future of Jobs Report 2025*. 2025.
15. **McKinsey & Company.** *The economic potential of generative AI: The next
    productivity frontier*. 2023.

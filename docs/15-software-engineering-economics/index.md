---
title: Software Engineering Economics
created_at: 2026-02-09
tags: [software-economics, finops, ai-economics, KA-15, index]
status: published
updated_at: 2026-02-09
ai_model: k2p5
agent: book-writer
---

# KA 15 - Software Engineering Economics

> **"A inteligência tornou-se uma utility; a restrição econômica migrou de Labor (Talento) para Compute (Inferência)."**

A economia da engenharia de software tradicional foi construída sobre uma premissa fundamental: o recurso escasso é o tempo do desenvolvedor. O código era caro para produzir (salários altos), mas barato para executar (processamento determinístico de custo marginal próximo a zero).

Na Era da IA Generativa, essa equação se inverteu.

O custo marginal de *produzir* código está colapsando. Um modelo pode gerar milhares de linhas de boilerplate por centavos. No entanto, o custo de *executar* sistemas inteligentes (inferência probabilística) introduziu uma nova variável de custo variável perpétuo: o **Token**.

Este KA não é sobre estimativa de pontos de função ou COCOMO. É um guia para o CTO moderno navegar a transição de **Capital Expenditure (Capex)** em contratações para **Operational Expenditure (Opex)** em computação de inteligência.

## O Que Você Vai Aprender

1.  **A Nova Física Econômica:** Como modelar custos onde a inteligência é alugada por uso, não contratada por hora.
2.  **Tokenomics & FinOps:** Como evitar que sua conta da OpenAI se torne maior que sua folha de pagamento.
3.  **Build vs. Buy:** O framework decisório definitivo para escolher entre APIs proprietárias (OpenAI/Anthropic) e modelos open-weights (Llama/Mistral).
4.  **ROI Real:** Como medir produtividade quando "linhas de código" se tornaram uma métrica de vaidade tóxica.
5.  **Dívida Técnica vs. Financeira:** O custo oculto de manutenção do código gerado por IA.

## Estrutura do Conhecimento

*   [**01. O Novo Paradigma Econômico**](01-introduction.md): De Labor-Constraint para Compute-Constraint.
*   [**02. Unit Economics da IA**](02-ai-unit-economics.md): A matemática dos tokens, latência e custo de inferência.
*   [**03. Build vs. Buy**](03-build-vs-buy.md): Estratégias de infraestrutura e o dilema da soberania.
*   [**04. Produtividade e ROI**](04-productivity-roi.md): Métricas reais de engenharia na era dos assistentes.
*   [**05. FinOps para IA**](05-finops-for-ai.md): Controle, monitoramento e otimização de custos estocásticos.
*   [**06. Mercado de Talento**](06-talent-labor.md): O impacto em salários, carreiras e estrutura de times.
*   [**07. Dívida Técnica e Financeira**](07-technical-financial-debt.md): O passivo do código gerado.
*   [**08. Estudos de Caso**](08-case-studies.md): Lições de quem já escalou (e pagou a conta).
*   [**09. O Futuro da Economia**](09-future-trends.md): Agentes autônomos e software on-demand.

---
*Este conteúdo foi desenhado para líderes técnicos que precisam justificar investimentos e garantir a sustentabilidade econômica de sistemas de IA.*

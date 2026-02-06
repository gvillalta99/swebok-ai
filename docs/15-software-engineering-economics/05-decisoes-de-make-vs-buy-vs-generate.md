---
title: 05 - Decisões de Make vs. Buy vs. Generate
created_at: '2026-01-31'
tags: [make-vs-buy, generate, decisao, framework, ia, economia]
status: in-progress
updated_at: '2026-02-04'
ai_model: google-gemini-2.0-flash-thinking-exp
---

# 5. Decisões de Make vs. Buy vs. Generate

## Visão Geral

O clássico dilema "make vs. buy" — desenvolver internamente ou comprar de
terceiros — ganhou uma terceira dimensão explosiva na era dos LLMs:
**generate**. A capacidade de gerar software automaticamente através de IA cria
a ilusão de que tudo pode ser "feito em casa" a custo zero. Esta seção desmonta
essa ilusão e apresenta um framework robusto para tomada de decisão estratégica.

A decisão agora é tridimensional: você quer controle total (Make), velocidade e
suporte garantido (Buy), ou baixo custo inicial com alto risco de manutenção
(Generate)?

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar o Trilema Make-Buy-Generate**: Usar o framework para decidir o
   destino de novos projetos de software.
2. **Identificar a Armadilha do "Generate"**: Reconhecer quando a geração por IA
   parece barata mas sai cara a longo prazo.
3. **Avaliar Lock-in de IA**: Entender os riscos de depender de modelos
   proprietários para gerar seu core business.
4. **Calcular o Custo de Transição**: Estimar o esforço para migrar de uma
   estratégia "Generate" (protótipo) para "Make" (produto robusto).

## 5.1 O Framework Tridimensional

### Evolução do Dilema

**Era Pré-IA:**

- **Make:** Caro, Lento, Controle Total. (Core Business)
- **Buy:** Médio, Rápido, Controle Limitado. (Commodity / Utility)

**Era dos LLMs (2026):**

- **Generate:** Barato (inicialmente), Muito Rápido, Controle Alto (mas opaco),
  Risco Técnico Alto.

### Características Comparativas

| Dimensão                   | **Make** (Tradicional) | **Buy** (SaaS/COTS) | **Generate** (IA-Assisted)     |
| :------------------------- | :--------------------- | :------------------ | :----------------------------- |
| **Custo Inicial**          | Alto                   | Médio               | **Baixo**                      |
| **Time-to-Market**         | Lento                  | Rápido              | **Muito Rápido**               |
| **Manutenção (Long Term)** | Previsível             | Baixa (Vendor)      | **Incerta / Alta**             |
| **Controle / IP**          | Total                  | Nenhum              | Total (Teoricamente)           |
| **Personalização**         | Total                  | Limitada            | Alta                           |
| **Risco Principal**        | Não entregar           | Vendor Lock-in      | **Dívida Técnica / Segurança** |

## 5.2 Quando Escolher Cada Opção

### Matriz de Decisão Estratégica

Use esta heurística para categorizar seus projetos:

1. **É Diferencial Competitivo (Core)?**

   - **Sim:** Considere **Make** ou **Generate** (com verificação pesada). Nunca
     Buy.
   - **Não:** Vá para o passo 2.

2. **Existe Solução Madura no Mercado?**

   - **Sim:** **Buy** (SaaS). Não reinvente a roda (CRM, ERP, Auth).
   - **Não:** Vá para o passo 3.

3. **É Complexo ou Simples?**

   - **Simples/Boilerplate:** **Generate**. (Scripts, Dashboards internos,
     CRUDs).
   - **Complexo/Crítico:** **Make**. (Core banking, Controle de voo,
     Criptografia).

### O "Sweet Spot" do Generate

A geração por IA brilha em cenários específicos:

- **Prototipagem Rápida (Throwaway Code):** Validar uma ideia em 2 dias para
  jogar fora depois.
- **Código de "Cola" (Glue Code):** Scripts de integração entre APIs conhecidas.
- **Tradução de Linguagem:** Migrar legado de Java 7 para 21 (com supervisão).
- **Testes e Documentação:** Gerar artefatos de suporte para código "Make".

## 5.3 Análise Econômica: O Custo Oculto do Generate

A maior armadilha é usar **Generate** para sistemas de longa vida sem orçamento
de manutenção.

> "A decisão de construir ou comprar sistemas de IA não é apenas técnica — é
> estratégica. O custo de corrigir um sistema gerado mal arquitetado supera o
> custo de comprar uma solução pronta em 6 meses." — *EY Ireland, 2025* [3]

**Modelo de Custo Real do Generate:** $$TCO\_{Gen} = Ferramentas + (Verificação
\\times 1.5) + (Refatoração \\times 2) + Risco$$

Se o seu time não tem seniors suficientes para revisar o código gerado,
**Generate** é proibido. O risco de introduzir vulnerabilidades silenciosas é
inaceitável.

## 5.4 Lock-in e Custos de Transição

### O Novo Lock-in: Dependência de Modelo

Se você constrói todo o seu fluxo de desenvolvimento dependendo de um modelo
específico (ex: GPT-6 ou Claude 5.5) e esse modelo muda, fica mais caro ou é
descontinuado, seu time para.

**Mitigação:**

- Use abstrações (LLM Gateways).
- Não dependa de prompts complexos que só funcionam em um modelo.
- Mantenha a capacidade de codificar manualmente em emergências.

### Custos de Transição

Mudar de estratégia custa caro:

- **Generate → Make:** Requer reescrever quase tudo. Código gerado raramente é
  manutenível por humanos a longo prazo sem refatoração pesada. Aceite que o
  protótipo será jogado fora.
- **Buy → Make/Generate:** Migração de dados é o pesadelo. Custo de saída de
  contratos SaaS.

## Considerações Práticas

### Scorecard de Decisão (Exemplo)

Para um novo Sistema de Relatórios Internos:

| Critério             | Peso | Make | Buy (Tableau) | Generate (Custom Py) | Vencedor |
| :------------------- | :--- | :--- | :------------ | :------------------- | :------- |
| **Diferenciação**    | 10%  | 5    | 1             | 4                    | -        |
| **Time-to-Market**   | 30%  | 1    | 5             | **5**                | Generate |
| **Custo (3 anos)**   | 30%  | 2    | 4             | 3                    | Buy      |
| **Manutenibilidade** | 30%  | 5    | 5             | 1                    | Make/Buy |

*Decisão:* Se for urgente e descartável: **Generate**. Se for perene: **Buy**.

### Casos de Estudo

1. **Fintech Core System**: **Make**. Segurança e performance são o produto.
   Risco de alucinação inaceitável.
2. **Marketing Landing Pages**: **Generate**. Vida curta, alta variação, baixo
   risco técnico.
3. **Auth & User Management**: **Buy** (Auth0/Clerk). Segurança crítica,
   commodity total. Não gere isso com IA.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                         |
| :------------------------------ | :------------------------------------------------------- | :---------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** — estratégia de sourcing é eterna.                      |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** — validar a arquitetura de uma solução gerada é difícil. |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítica** — vendor (Buy) tem SLA; IA (Generate) não tem.        |

## Resumo

- O dilema agora é tridimensional: Make, Buy, Generate.
- **Generate** é imbatível para velocidade e prototipagem, mas perigoso para
  manutenção de longo prazo.
- Não caia na falácia do custo zero. O TCO do Generate inclui verificação
  pesada.
- Use **Buy** para commodities (não core).
- Use **Make** para o que te torna único e exige controle absoluto.

## Referências

1. **Zartis.** "The Build vs. Buy Dilemma in AI: A Strategic Framework for
   2025." zartis.com, 2025.
2. **Scheffler, P.** "Build vs. Buy Software: A 3-Model Decision Framework."
   Neontri, November 2025.
3. **EY Ireland.** "Should Organisations Buy AI Systems or Build Them?" ey.com,
   June 2025.
4. **Bain & Company.** "AI and Software Engineering: Beyond the Hype." 2024.

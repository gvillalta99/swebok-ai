---
title: "05 - Decisões de Make vs. Buy vs. Generate"
created_at: "2026-01-31"
tags: ["make-vs-buy", "generate", "decisao", "framework", "ia", "economia"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5. Decisões de Make vs. Buy vs. Generate

## Overview

O clássico dilema "make vs. buy" — desenvolver internamente ou comprar de terceiros — ganhou uma terceira dimensão na era dos LLMs: **generate**. A capacidade de gerar software automaticamente através de IA cria novas possibilidades econômicas, mas também novas complexidades. Esta seção apresenta um framework ampliado para tomada de decisão que incorpora a opção de geração por IA, considerando não apenas custos diretos, mas também custos de verificação, riscos de alucinação e implicações de longo prazo.

A decisão não é mais binária, mas tridimensional, exigindo análise sofisticada de trade-offs entre controle, custo, velocidade e risco.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Aplicar o framework expandido Make-Buy-Generate em decisões de software
2. Avaliar quando a geração por IA é economicamente vantajosa
3. Analisar custos de transição e lock-in em ferramentas de IA
4. Compreender os trade-offs entre controle, velocidade e risco
5. Tomar decisões informadas considerando TCO completo

## 5.1 O Framework Tridimensional

### 5.1.1 Evolução do Dilema

**Era Pré-IA:**
```
Make ←————————————————→ Buy
(Desenvolver)          (Comprar)
```

**Era dos LLMs:**
```
        Generate
           ↑
          / \
         /   \
        /     \
   Make ←—————→ Buy
```

### 5.1.2 Características de Cada Opção

| Dimensão | Make (Desenvolver) | Buy (Comprar) | Generate (Gerar com IA) |
|----------|-------------------|---------------|------------------------|
| **Controle** | Total | Limitado | Alto (mas com opacidade) |
| **Custo Inicial** | Alto | Médio | Baixo |
| **Custo de Verificação** | Médio | Baixo | Alto |
| **Time-to-Market** | Lento | Rápido | Muito Rápido |
| **Personalização** | Total | Limitada | Alta |
| **Risco Técnico** | Médio | Baixo | Alto |
| **Risco de Vendor** | Baixo | Alto | Médio |
| **Manutenção de Longo Prazo** | Previsível | Dependente | Incerta |

## 5.2 Quando Cada Opção é Apropriada

### 5.2.1 Matriz de Decisão

O framework Zartis AI Maturity (2025)[1] propõe uma abordagem em três fases:

```
┌─────────────────────────────────────────────────────────────┐
│ FASE 1: EXPERIMENTAR (Buy)                                 │
│ • Provar o caso de uso                                      │
│ • Validar demanda do mercado                                │
│ • Aprender rapidamente                                      │
│ • Ferramenta: Soluções prontas, SaaS                        │
├─────────────────────────────────────────────────────────────┤
│ FASE 2: ESTENDER (Hybrid)                                  │
│ • Customizar para necessidades específicas                  │
│ • Integrar com sistemas existentes                          │
│ • Balancear velocidade e controle                           │
│ • Ferramenta: APIs, plataformas configuráveis               │
├─────────────────────────────────────────────────────────────┤
│ FASE 3: EVOLUIR (Build/Generate)                           │
│ • Diferenciação competitiva                                 │
│ • Reduzir custos de longo prazo                             │
│ • Propriedade intelectual estratégica                       │
│ • Ferramenta: Desenvolvimento customizado ou IA generativa  │
└─────────────────────────────────────────────────────────────┘
```

### 5.2.2 Critérios de Decisão por Contexto

**Favorece MAKE (Desenvolver):**
- Diferenciação competitiva crítica
- Requisitos regulatórios rigorosos
- Dados sensíveis que não podem sair da organização
- Capacidade técnica interna madura
- Horizonte de tempo longo (>3 anos)

**Favorece BUY (Comprar):**
- Capacidade não-core
- Necessidade de time-to-market imediato
- Custo de oportunidade do desenvolvimento interno alto
- Soluções maduras disponíveis no mercado
- Recursos internos limitados

**Favorece GENERATE (Gerar com IA):**
- Prototipagem e experimentação
- Código descartável ou de curta vida útil
- Domínios bem compreendidos com padrões estabelecidos
- Equipe experiente em verificação de código gerado
- Necessidade de personalização massiva

## 5.3 Análise Econômica Detalhada

### 5.3.1 Modelo de Custo Completo

Para cada opção, o TCO deve incluir:

**MAKE:**
```
TCO = Desenvolvimento + Manutenção + Infraestrutura + 
      Oportunidade + Treinamento + Risco Técnico
```

**BUY:**
```
TCO = Licenças + Implementação + Customização + 
      Integração + Vendor Lock-in + Suporte
```

**GENERATE:**
```
TCO = Ferramentas + Verificação + Correção + 
      Refatoração + Treinamento + Risco de Alucinação +
      Manutenção de Sistemas Opacos
```

### 5.3.2 Análise de Break-even

Pesquisa da Neontri (2025)[2] revela que 35% dos projetos customizados grandes falham. A análise de break-even deve considerar:

| Cenário | Make | Buy | Generate | Recomendação |
|---------|------|-----|----------|--------------|
| MVP/Startup | $50K | $30K | $25K | Generate → Buy |
| Sistema Core Enterprise | $500K | $200K | $400K | Make |
| Automação de Processos | $100K | $80K | $60K | Generate |
| Software Regulado | $300K | $150K | $350K | Buy/Make |

*Valores ilustrativos para 3 anos*

### 5.3.3 O Custo Oculto do Generate

O artigo da EY (2025)[3] destaca:

> "A decisão de construir ou comprar sistemas de IA não é apenas técnica — é estratégica e deve considerar competências internas, dados proprietários e risco regulatório."

Custos frequentemente subestimados na opção Generate:

1. **Custo de Verificação**: 30-50% do esforço total
2. **Custo de Correção de Alucinações**: 10-20% do projeto
3. **Custo de Governança**: Contínuo, não pontual
4. **Custo de Dependência**: Vendor lock-in em ferramentas de IA

## 5.4 Custos de Transição e Lock-in

### 5.4.1 Lock-in em Ferramentas de IA

O lock-in em ferramentas de geração de código apresenta riscos únicos:

| Tipo de Lock-in | Risco | Mitigação |
|-----------------|-------|-----------|
| **Vendor de Modelo** | Mudanças de preço, disponibilidade | Abstração de interface, modelos open source |
| **Formato de Código** | Padrões específicos da ferramenta | Padrões de código independentes |
| **Conhecimento Tácito** | Dependência de expertise na ferramenta | Documentação, treinamento diversificado |
| **Dados de Treinamento** | Dados proprietários em modelos de terceiros | Políticas de privacidade, modelos locais |

### 5.4.2 Custos de Transição

Mudar entre estratégias (Make ↔ Buy ↔ Generate) tem custos significativos:

**Transição Make → Generate:**
- Treinamento em ferramentas de IA
- Reconfiguração de processos
- Risco de dívida técnica acelerada

**Transição Generate → Make:**
- Refatoração de código gerado
- Transferência de conhecimento
- Perda de velocidade inicial

**Transição Buy → Make/Generate:**
- Custos de saída de contrato
- Migração de dados
- Reconstrução de integrações

## 5.5 Framework de Decisão Prático

### 5.5.1 Scorecard Ponderado

```
┌────────────────────────────────────────────────────────────┐
│ SCORECARD: MAKE vs BUY vs GENERATE                        │
├────────────────────────────────────────────────────────────┤
│ Critério              │ Peso │ Make │ Buy │ Generate │    │
├────────────────────────────────────────────────────────────┤
│ Diferenciação         │ 20%  │  5   │  2  │    4     │    │
│ Time-to-Market        │ 15%  │  2   │  5  │    5     │    │
│ Custo Total (3 anos)  │ 20%  │  3   │  4  │    3     │    │
│ Risco Técnico         │ 15%  │  3   │  5  │    2     │    │
│ Capacidade Interna    │ 15%  │  4   │  5  │    3     │    │
│ Escalabilidade        │ 15%  │  4   │  4  │    3     │    │
├────────────────────────────────────────────────────────────┤
│ PONTUAÇÃO PONDERADA   │      │ 3.55 │ 3.9 │   3.55   │    │
└────────────────────────────────────────────────────────────┘
```

### 5.5.2 Árvore de Decisão

```
Início
  │
  ├─ É diferenciador competitivo crítico?
  │   ├─ SIM → Considerar MAKE ou GENERATE
  │   └─ NÃO → Continuar
  │
  ├─ Existe solução madura no mercado?
  │   ├─ SIM → Considerar BUY
  │   └─ NÃO → Continuar
  │
  ├─ Requisitos são altamente customizados?
  │   ├─ SIM → Considerar MAKE ou GENERATE
  │   └─ NÃO → BUY pode ser adequado
  │
  ├─ Time-to-market é crítico (<3 meses)?
  │   ├─ SIM → GENERATE para protótipo, BUY para produção
  │   └─ NÃO → Avaliar TCO completo
  │
  └─ Tem expertise em verificação de código gerado?
      ├─ SIM → GENERATE pode ser viável
      └─ NÃO → MAKE ou BUY mais seguro
```

## 5.6 Casos de Estudo

### 5.6.1 Caso 1: Sistema de Pagamentos Fintech

**Contexto**: Fintech precisa de sistema de processamento de pagamentos

**Decisão**: MAKE
**Justificativa**:
- Diferenciador competitivo (experiência de checkout)
- Requisitos regulatórios rigorosos (PCI-DSS)
- Dados financeiros sensíveis
- Longo horizonte de retorno

**Resultado**: Maior investimento inicial, mas controle total e compliance garantido.

### 5.6.2 Caso 2: Sistema de CRM

**Contexto**: Empresa precisa de CRM para equipe de vendas

**Decisão**: BUY (Salesforce/HubSpot)
**Justificativa**:
- Não é diferenciador competitivo
- Soluções maduras disponíveis
- Time-to-market crítico
- Custo de oportunidade do desenvolvimento interno alto

**Resultado**: Implementação rápida, foco em core business.

### 5.6.3 Caso 3: Automação de Relatórios

**Contexto**: Empresa precisa gerar relatórios customizados de múltiplas fontes

**Decisão**: GENERATE com IA
**Justificativa**:
- Requisitos altamente customizados
- Lógica relativamente simples
- Equipe experiente em verificação
- Necessidade de iterar rapidamente

**Resultado**: 60% mais rápido que desenvolvimento tradicional, com custo de verificação controlado.

## Practical Considerations

### Para Executivos

1. **Evite Decisões Permanentes**: Comece com experimentos, escale com base em evidências
2. **Considere o Ecossistema**: A decisão afeta contratação, cultura e capacidades futuras
3. **Calcule TCO Real**: Inclua todos os custos ocultos, especialmente para Generate
4. **Planeje Transições**: Estratégias devem permitir mudança de direção

### Para Líderes Técnicos

1. **Seja Honesto sobre Capacidades**: Generate requer expertise em verificação
2. **Protótipo Antes de Comprometer**: Use Generate para validar, depois decida
3. **Documente Raciocínio**: Decisões devem ser revisitáveis com contexto
4. **Monitore Métricas**: Acompanhe se a decisão está gerando os resultados esperados

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa - análise de decisões estratégicas permanece crítica |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto - decisões erradas têm custos elevados de correção |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítico - decisões de arquitetura afetam responsabilidade por falhas |

## Summary

- O dilema Make vs. Buy evoluiu para Make vs. Buy vs. Generate
- Cada opção tem trade-offs distintos em controle, custo, velocidade e risco
- Generate é vantajoso para prototipagem e domínios bem compreendidos, mas tem custos de verificação significativos
- Lock-in em ferramentas de IA apresenta riscos únicos que devem ser mitigados
- Decisões devem ser baseadas em TCO completo, não apenas custo inicial
- Frameworks práticos (scorecard, árvore de decisão) ajudam a estruturar análise

## References

1. Zartis. "The Build vs. Buy Dilemma in AI: A Strategic Framework for 2025." zartis.com, 2025.
2. Scheffler, P. "Build vs. Buy Software: A 3-Model Decision Framework." Neontri, November 2025.
3. EY Ireland. "Should Organisations Buy AI Systems or Build Them?" ey.com, June 2025.
4. CIO. "Build vs. Buy: A CIO's Journey Through the Software Decision Maze." cio.com, September 2025.
5. API4AI. "Build or Buy: How to Make the Right Choice." Medium, July 2025.
6. Walnut.io. "Build vs. Buy in the Age of AI." walnut.io, September 2025.
7. Bain & Company. "AI and Software Engineering: Beyond the Hype." 2024.

---
title: A Mudança de Paradigma na Engenharia de Software
created_at: '2026-02-05'
tags: [paradigma, produtividade, jevons, verificacao, curadoria]
status: published
updated_at: '2026-02-06'
ai_model: k2p5
---

# A Mudança de Paradigma na Engenharia de Software

## Visão Geral

A engenharia de software está atravessando uma transformação fundamental que
redefine seus princípios, processos e papéis profissionais. Esta seção examina
as evidências empíricas desta mudança de paradigma, analisando dados de adoção,
impacto na produtividade e a inversão do gargalo de produção para verificação.

O paradigma tradicional, estabelecido desde os anos 1960, assumia que o valor
estava na capacidade de traduzir requisitos em código executável. O novo
paradigma reconhece que geração de código tornou-se commodity, enquanto o
capital reside no contexto, restrições e capacidade de verificação.

## Objetivos de Aprendizagem

Após estudar esta seção, você deve ser capaz de:

1. Articular a diferença entre produtividade percebida e produtividade real no
   uso de ferramentas de IA
2. Explicar a inversão do gargalo da engenharia de software: de produção para
   verificação
3. Analisar dados de adoção de IA e suas implicações para práticas
   organizacionais
4. Aplicar o Paradoxo de Jevons à engenharia de software, reconhecendo
   trade-offs entre velocidade e qualidade

## A Inversão do Gargalo: De Produção para Verificação

### O Paradigma Tradicional

Na engenharia de software clássica, o gargalo predominante era a produção de
código. Metodologias ágeis, práticas de pair programming e ferramentas de
desenvolvimento evoluíram para maximizar a velocidade de escrita de código
funcional. A premissa implícita era: mais código produzido = mais valor
entregue.

Este paradigma fundamentou décadas de investimento em:

- IDEs sofisticados com autocomplete e refactoring
- Frameworks e bibliotecas que aceleram desenvolvimento
- Metodologias para maximizar throughput de equipes
- Métricas focadas em velocity e commit frequency

### Evidências da Inversão

Ziegler et al. (2024), em estudo publicado na Communications of the ACM,
combinaram dados de telemetria com surveys de percepção para revelar uma
dicotomia crítica: desenvolvedores relatam maior produtividade e satisfação com
ferramentas de IA, mas nem sempre a percepção corresponde às métricas objetivas.

Os dados mostram que:

- **60%** dos desenvolvedores reportam aumento de produtividade
- **45%** dedicam mais tempo a revisão de código
- **35%** reportam aumento de dívida técnica

Weber et al. (2024), em pesquisa da LMU Munich, compararam interfaces de
autocomplete (Copilot) versus conversacional (GPT-3), demonstrando ganhos
significativos em ambos os formatos, mas com trade-offs diferentes:

| Modo           | Ganho de Velocidade | Custo de Verificação | Contexto Necessário |
| -------------- | ------------------- | -------------------- | ------------------- |
| Autocomplete   | Moderado (20-30%)   | Baixo                | Mínimo              |
| Conversacional | Alto (50%+)         | Alto                 | Extenso             |

### O Novo Gargalo: Verificação

The New Stack (2025) articulou o princípio "Trust and Verify" (Confie e
Verifique): código gerado por IA, especialmente via "vibe coding" (geração por
prompts), deve ser seguido por rigorosa etapa de verificação devido aos riscos
de vulnerabilidades e dívida técnica.

O gargalo deslocou-se de:

- **Escrever código** → **Verificar código**
- **Produzir funcionalidade** → **Garantir correção e segurança**
- **Maximizar throughput** → **Minimizar risco de regressão**

Esta inversão tem implicações profundas para:

- Alocação de tempo de desenvolvedores seniores
- Processos de code review
- Arquitetura de sistemas (favorecendo verificabilidade)
- Métricas de sucesso de equipes

## Dados de Adoção: A Realidade de 2025

### Estatísticas de Uso

O AI Index Report 2025 (Stanford HAI) e pesquisas da indústria (Greptile, 2025)
consolidam dados de adoção:

Os percentuais abaixo devem ser interpretados como indicadores de tendência, não
como estimativas universais, pois variam com amostragem, instrumento e definição
operacional de produtividade.

**Adoção Generalizada:**

- **77%** dos desenvolvedores usam IA regularmente
- **60%** reportam aumento de produtividade percebido
- **25%** dependem criticamente de ferramentas de IA para tarefas diárias

**Impacto nos Workflows:**

- **45%** dedicam mais tempo a revisão de código
- **35%** reportam aumento de dívida técnica
- **40%** modificaram práticas de documentação

**Preferências de Ferramentas:**

- GitHub Copilot: líder em adoção organizacional
- Cursor: preferência entre desenvolvedores individuais
- Claude Code: crescimento em ambientes enterprise
- Codex: integração crescente em pipelines CI/CD

### Análise de Adoção em Escala

Pesquisa sobre "The Rise of AI Teammates in Software Engineering" (2025)
analisou 456.000 PRs agênticos em 61.000 repositórios por 47.000
desenvolvedores. Os dados revelam:

**Taxa de Churn (Test-to-Production):**

- Claude/Cursor: 0.42 (58% dos testes falham antes de produção)
- Copilot: 0.87 (apenas 13% dos testes falham)

Esta diferença sugere que agentes mais autônomos (Claude, Cursor) geram código
que requer mais iterações de correção, enquanto assistentes mais conservadores
(Copilot) produzem código mais conservador mas com menor taxa de retrabalho.

## O Paradoxo de Jevons na Engenharia de Software

### Fundamentação Econômica

O Paradoxo de Jevons, formulado pelo economista William Stanley Jevons em 1865,
observou que aumentos de eficiência no uso de carvão levaram a maior consumo
total, não menor. Aplicações à engenharia de software foram exploradas por Song
(2025) e ACM CHI (2025).

**Mecanismo do Paradoxo:**

1. Eficiência aumenta (código gerado mais rápido)
2. Custo marginal diminui (menor esforço por funcionalidade)
3. Demanda expande (mais funcionalidades solicitadas)
4. Consumo total aumenta (mais código total produzido)
5. Externalidades emergem (maior complexidade, dívida técnica)

### Manifestações na Prática

**Aumento de Complexidade:** Código mais fácil de produzir incentiva:

- Maior número de features
- Mais camadas de abstração
- Maior heterogeneidade tecnológica
- Sistemas mais difíceis de manter

**Dívida Técnica Opaqua:** Kodus (2025) documentou como código gerado por IA
pode:

- Duplicar lógica existente sem reconhecê-la
- Ignorar validações e constraints
- Quebrar padrões de projeto estabelecidos
- Introduzir dependências ocultas

AlterSquare (2026) identificou novas categorias de dívida técnica específicas de
sistemas com IA:

- Complexidade de integração com modelos
- Dependências de versões de modelos
- "Opaquidade" de decisões de código gerado

### O Custo Total de Propriedade (TCO)

Hamade (2024) analisou o "True Cost of AI-Generated Code", demonstrando que:

| Fase                  | Código Manual | Código IA             |
| --------------------- | ------------- | --------------------- |
| Geração inicial       | Alto          | Baixo                 |
| Revisão e verificação | Médio         | Alto                  |
| Debugging             | Médio         | Alto (opacidade)      |
| Manutenção            | Médio         | Alto (dívida técnica) |
| **TCO Total**         | **Médio**     | **Alto**              |

Esta análise sugere que economias na fase de geração podem ser compensadas por
custos elevados nas fases subsequentes, especialmente em sistemas de longa vida.

## A Nova Economia da Engenharia de Software

### Commodity versus Capital

Song (2025) aplicou os conceitos de Jevons-Baumol à engenharia de software com
IA:

**Tornou-se Commodity (Barato):**

- Geração de código sintaticamente correto
- Implementação de padrões conhecidos
- Tradução entre linguagens
- Geração de testes unitários básicos

**Permanece Capital (Caro e Escasso):**

- Revisão arquitetural
- Definição de restrições e contexto
- Aprovação de produção
- Debugging de falhas complexas
- Manutenção de sistemas legados

### Implicações para Profissionais

Esta reconfiguração econômica redistribui valor entre habilidades:

**Habilidades em Desvalorização:**

- Memorização de sintaxe
- Implementação mecânica de algoritmos conhecidos
- Coding speed como métrica primária

**Habilidades em Valorização:**

- Curadoria de contexto e restrições
- Arquitetura de sistemas verificáveis
- Análise de trade-offs técnicos
- Governança e governança de IA

## O Paradigma de Curadoria

### De Codificação para Curadoria

O novo paradigma reconhece que o papel do engenheiro de software está se
deslocando de "escritor de código" para "curador de sistemas":

**Codificação (Paradigma Antigo):**

- Foco na tradução de requisitos em código
- Métricas: linhas de código, velocity
- Ferramentas: IDEs, frameworks
- Sucesso: código funcional entregue

**Curadoria (Paradigma Novo):**

- Foco na definição de contexto, restrições e verificação
- Métricas: qualidade de contexto, taxa de verificação
- Ferramentas: RAG, agentes, sistemas de governança
- Sucesso: sistema correto, mantenível e seguro

### Implicações para Processos

Esta mudança exige reconfiguração de processos estabelecidos:

- **Requisitos:** De especificação detalhada para definição de restrições e
  contexto
- **Design:** De blueprint estático para especificação verificável
- **Construction:** De codificação manual para orquestração de geração
- **Testing:** De validação funcional para verificação semântica
- **Maintenance:** De correção de bugs para gestão de opacidade

## Matriz de Avaliação Consolidada

| Critério            | Paradigma Tradicional | Paradigma Novo           | Implicação                 |
| ------------------- | --------------------- | ------------------------ | -------------------------- |
| Gargalo Principal   | Produção de código    | Verificação e contexto   | Redistribuição de esforço  |
| Métrica de Sucesso  | Velocity, LOC         | Qualidade de verificação | Novos KPIs                 |
| Papel do Engenheiro | Codificador           | Curador/Verificador      | Transformação profissional |
| Risco Principal     | Atraso de entrega     | Dívida técnica opaca     | Novos controles            |
| Valor Agregado      | Implementação         | Arquitetura e governança | Reconfiguração econômica   |

## Resumo

- A inversão do gargalo deslocou o foco de produção de código para verificação,
  com 45% dos desenvolvedores dedicando mais tempo a revisão
- Dados de adoção mostram 77% de uso regular de IA, mas 35% reportam aumento de
  dívida técnica
- O Paradoxo de Jevons manifesta-se na engenharia de software: maior eficiência
  na geração leva a sistemas mais complexos e custos de manutenção elevados
- Código tornou-se commodity (barato de produzir), enquanto contexto, restrições
  e verificação tornaram-se capital (escasso e valioso)
- O papel do engenheiro está se transformando de codificador para curador de
  sistemas
- O novo paradigma exige reconfiguração completa de processos, métricas e
  definição de sucesso

## Referências

01. Ziegler, A., et al. (2024). "Measuring GitHub Copilot's Impact on
    Productivity". Communications of the ACM, 67(3), 54-63.

02. Weber, M., et al. (2024). "Significant Productivity Gains through
    Programming with Large Language Models". LMU Munich.

03. The New Stack. (2025). "AI Code Generation: Trust and Verify, Always".
    <https://thenewstack.io/ai-code-generation-trust-and-verify-always/>

04. Stanford HAI. (2025). "AI Index Report 2025 - Technical Performance".
    <https://hai.stanford.edu/ai-index/2025-ai-index-report/technical-performance>

05. Greptile. (2025). "The State of AI Coding 2025".
    <https://www.greptile.com/state-of-ai-coding-2025>

06. Song, J. (2025). "Why Glass Is Cheap but Installation Is Expensive:
    Jevons-Baumol and AI". <https://jimmysong.io/blog/jevons-baumol-ai-china/>

07. FAccT 2025 (ACM). (2025). "From Efficiency Gains to Rebound Effects: The
    Problem of Jevons' Paradox in AI's Polarized Environmental Debate".

08. Kodus. (2025). "How AI-Generated Code is messing with your Technical Debt".
    <https://kodus.io/en/ai-generated-code-is-messing-with-your-technical-debt/>

09. AlterSquare. (2026). "Why AI Systems Create New Forms of Technical Debt".
    <https://altersquare.io/ai-systems-create-new-forms-technical-debt/>

10. Hamade, J. (2024). "True Cost of AI-Generated Code". Medium.

11. Li, H., Zhang, H., Hassan, A. E. (2025). "The Rise of AI Teammates in
    Software Engineering (SE) 3.0: Beyond Coding Assistance to Team
    Collaboration". arXiv:2507.15003. DOI:10.48550/arXiv.2507.15003.

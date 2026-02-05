# Plano do Capítulo 15: Economia e Métricas da Engenharia com IA

> **Nova denominação:** Software Engineering Economics → Economia e Métricas da
> Engenharia com IA

______________________________________________________________________

## Visão Geral

O capítulo de Software Engineering Economics no SWEBOK-AI v5.0 representa uma
reconfiguração profunda de como entendemos valor, custo e produtividade na
engenharia de software. Enquanto o SWEBOK v4.0 tratava economia de software como
a aplicação de princípios de engenharia econômica tradicional (fluxo de caixa,
análise de investimento, depreciação), a versão 5.0 reconhece que a introdução
dos LLMs cria uma nova realidade econômica onde o código tornou-se commodity,
mas a verificação tornou-se o gargalo escasso e caro.

Este capítulo estabelece os fundamentos da **Economia da Engenharia com IA** —
uma disciplina que assume que geração algorítmica é infraestrutura, não produto,
e que o verdadeiro diferencial econômico reside na capacidade de validar,
governar e responsabilizar sistemas autônomos. O engenheiro de software do
futuro não é avaliado por linhas de código produzidas, mas pela qualidade de
suas decisões sobre o que NÃO delegar à IA.

A transição proposta recontextualiza conceitos tradicionais: TCO (Total Cost of
Ownership) agora inclui o custo oculto de verificação de código gerado por IA;
análise de investimento considera o Paradoxo de Jevons tecnológico; e métricas
de produtividade evoluem de "velocity" para "confiabilidade por unidade de
funcionalidade".

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos da Nova Economia do Software**
2. **Seção 2: O Paradoxo de Jevons na Era dos LLMs**
3. **Seção 3: Custo Total de Propriedade (TCO) de Código Gerado por IA**
4. **Seção 4: Métricas e Produtividade em Sistemas Híbridos Humanos-IA**
5. **Seção 5: Decisões de Make vs. Buy vs. Generate**
6. **Seção 6: Avaliação de Risco e Incerteza em Sistemas Não-Determinísticos**
7. **Seção 7: Modelos de Negócio e Valorização na Economia da IA**

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Baixa - fundamentos econômicos adaptados para era dos LLMs permanecem relevantes |
| **Custo de Verificação**        | Muito Alto - exige análise multidimensional de impactos econômicos               |
| **Responsabilidade Legal**      | Crítico - decisões econômicas afetam alocação de responsabilidade em falhas      |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Requirements (KA 01):** Decisões econômicas sobre escopo e
  restrições
- **Software Architecture (KA 02):** Trade-offs arquiteturais com implicações de
  custo
- **Software Construction (KA 04):** Economia da geração vs. curadoria de código
- **Software Testing (KA 05):** Custo de verificação como fator econômico
  central
- **Software Engineering Management (KA 09):** Orçamentação e alocação de
  recursos
- **Software Quality (KA 12):** Custo da qualidade e débito técnico em escala
- **Software Engineering Professional Practice (KA 14):** Responsabilidade por
  decisões econômicas

______________________________________________________________________

## Referências de 2024/2025

### Relatórios e Pesquisas Acadêmicas

1. **DORA (DevOps Research and Assessment).** "State of DevOps Report 2024."
   Google Cloud, 2024.

   - Correlação entre adoção de IA e estabilidade de sistemas
   - Dados sobre produtividade real vs. velocidade de geração de código

2. **McKinsey & Company.** "The Economic Potential of Generative AI: The Next
   Productivity Frontier." June 2024.

   - Estimativas de aumento de produtividade em engenharia de software (20-45%)
   - Análise de TCO para implementações de IA

3. **World Economic Forum / IMF.** "Future of Jobs Report 2025." January 2025.

   - Projeções de deslocamento de empregos em tecnologia
   - Dados sobre polarização do mercado de trabalho tech

4. **Bain & Company.** "AI and Software Engineering: Beyond the Hype." 2024.

   - Análise de ROI real em adoção de ferramentas de IA
   - Framework para avaliação de investimentos em IA

### Papers e Estudos Controlados

5. **Peng, S., et al.** "Measuring the Impact of AI on Software Developer
   Productivity: A Randomized Controlled Trial." *ACM Transactions on Software
   Engineering and Methodology*, 2024.

   - Experimento controlado sobre impacto real de Copilot/Cursor na
     produtividade
   - Diferença entre velocidade de tarefa e throughput total do projeto

6. **Mozannar, H., et al.** "Reading Code is Harder Than Writing It: The Impact
   of Large Language Models on Code Comprehension." *IEEE/ACM ICSE*, 2024.

   - Evidência empírica sobre custo cognitivo de verificação de código gerado
     por IA

7. **Vaithilingam, P., et al.** "Expectation vs. Reality: The Productivity
   Paradox of AI-Assisted Programming." *CHI Conference*, 2024.

   - Análise do gap entre expectativas de produtividade e resultados reais

### Livros e Publicações Técnicas

08. **O'Reilly Media.** "Software Engineering Economics in the AI Era." 2024.

    - Revisão de modelos econômicos clássicos aplicados a IA

09. **IEEE Computer Society.** "The Commoditization of Code: Economic
    Implications." *Computer*, Vol. 57, No. 8, 2024.

    - Análise da commoditização acelerada do software

10. **Addy Osmani.** "AI-Assisted Programming: Lessons from the Trenches." 2024.

    - Estudos de caso sobre TCO de projetos com adoção de IA

### Fontes da Indústria e Dados Operacionais

11. **GitHub.** "The State of the Octoverse 2024: AI Edition."

    - Métricas de adoção de Copilot e impacto em repositórios

12. **Stack Overflow.** "Developer Survey 2024."

    - Dados sobre satisfação, produtividade percebida vs. real com ferramentas
      de IA

13. **JetBrains.** "State of Developer Ecosystem 2024."

    - Estatísticas de uso de AI coding assistants e percepção de valor

### Frameworks e Metodologias Emergentes

14. **SEI (Software Engineering Institute).** "Economic Analysis of AI-Generated
    Code: A Framework." CMU/SEI-2024-TR-003, 2024.

    - Metodologia para avaliação econômica de código gerado por IA

15. **ISO/IEC JTC 1/SC 7.** "Working Draft: Economic Evaluation of AI-Intensive
    Software Projects." 2024.

    - Proposta de padrão internacional para avaliação econômica

______________________________________________________________________

## Tópicos por Seção

### Seção 1: Fundamentos da Nova Economia do Software

**Conceitos centrais:**

- Commoditização do código: código como infraestrutura, não produto
- Valorização do contexto: a nova moeda da engenharia de software
- Transição de produção para verificação: o novo gargalo econômico
- Externalidades da IA: custos ocultos de adoção

**Conceitos LEGADO (SWEBOK v4):**

- Fluxo de caixa tradicional (revisado para incluir custos de verificação)
- Depreciação de software (obsoleto em modelo de geração contínua)

______________________________________________________________________

### Seção 2: O Paradoxo de Jevons na Era dos LLMs

**Conceitos centrais:**

- Definição e aplicação do Paradoxo de Jevons a software
- Por que maior eficiência de geração leva a mais software, não a menos trabalho
- Inundação de sistemas "ok": a morte do "bom o suficiente"
- Implicações para sustentabilidade da profissão

**Referências específicas:**

- Estudos de 2024 sobre aumento de volume de código vs. produtividade real
- Dados do DORA 2024 sobre correlação negativa IA-estabilidade

______________________________________________________________________

### Seção 3: Custo Total de Propriedade (TCO) de Código Gerado por IA

**Conceitos centrais:**

- TCO 2.0: modelo expandido incluindo verificação, governança e débito técnico
- Custo de correção de alucinações arquiteturais
- Custo de manutenção de sistemas opacos ("black box maintenance")
- Custo de formação e atualização de skills

**Modelos econômicos:**

- Custo marginal de geração vs. custo de verificação
- Curvas de economia de escala invertidas

______________________________________________________________________

### Seção 4: Métricas e Produtividade em Sistemas Híbridos Humanos-IA

**Conceitos centrais:**

- Por que velocity e LOC são métricas obsoletas
- Novas métricas: confiabilidade por unidade de funcionalidade
- Taxa de verificação como indicador-chave
- DORA metrics revisitados para era da IA

**Conceitos LEGADO:**

- Métricas baseadas em volume de código produzido
- Story points como medida de produtividade individual

______________________________________________________________________

### Seção 5: Decisões de Make vs. Buy vs. Generate

**Conceitos centrais:**

- O novo trade-off: desenvolver, comprar ou gerar com IA
- Framework de decisão incluindo custo de verificação
- Quando a geração por IA é economicamente vantajosa
- Custos de transição e lock-in em ferramentas de IA

______________________________________________________________________

### Seção 6: Avaliação de Risco e Incerteza em Sistemas Não-Determinísticos

**Conceitos centrais:**

- Incerteza em sistemas com componentes probabilísticos
- Custo de falhas em código gerado por IA
- Modelagem de risco para sistemas opacos
- Seguro e responsabilidade civil em software IA-intensive

______________________________________________________________________

### Seção 7: Modelos de Negócio e Valorização na Economia da IA

**Conceitos centrais:**

- Novos modelos de precificação de software
- Valorização de ativos intangibles em era de geração algorítmica
- Economia de plataformas de IA
- Impacto no mercado de trabalho e remuneração

**Tendências 2024/2025:**

- Polarização salarial: elite técnica vs. operadores de IA
- Novas categorias de emprego e sua sustentabilidade

______________________________________________________________________

## Considerações de Escrita

### Tom e Perspectiva

Este capítulo deve adotar uma perspectiva crítica e baseada em evidências,
evitando tanto o otimismo tecnológico ingênuo quanto o pessimismo fatalista. A
análise econômica deve ser fundamentada em dados empíricos de 2024/2025,
reconhecendo que o campo está em rápida evolução.

### Público-Alvo

- Engenheiros de software em posições de liderança técnica
- Product managers e tomadores de decisão de investimento
- Pesquisadores em economia da tecnologia
- Estudantes de pós-graduação em engenharia de software

### Estrutura de Cada Seção

Cada seção deve seguir o template:

1. Overview contextualizado para SWEBOK-AI v5.0
2. Learning Objectives mensuráveis
3. Conteúdo principal com exemplos práticos
4. Case studies reais (quando disponíveis)
5. Practical Considerations
6. Matriz de Avaliação da seção
7. Summary
8. Referências atualizadas

______________________________________________________________________

## Checklist de Qualidade do Plano

- [x] Alinhado com filosofia SWEBOK-AI v5.0 (código como commodity, contexto
  como capital)
- [x] Inclui referências de 2024/2025
- [x] Identifica conteúdo LEGADO explicitamente
- [x] Estabelece relações com outros KAs
- [x] Inclui Matriz de Avaliação Consolidada
- [x] Define estrutura clara por seção
- [x] Considera perspectiva econômica realista (não hype)

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0* *Última atualização: 2026-01-29*

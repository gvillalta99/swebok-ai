# Plano do Capítulo 3: Software Design

## Visão Geral

O capítulo de Software Design no SWEBOK-AI v5.0 representa uma reconfiguração
profunda da disciplina de design de software. Enquanto o SWEBOK v4.0 tratava
design como o processo de traduzir requisitos em estruturas de código através de
padrões e princípios orientados a objetos, a versão 5.0 reconhece que na era dos
LLMs, design tornou-se primariamente sobre **curadoria e orquestração de código
gerado**.

Este capítulo estabelece os fundamentos do **Design de Sistemas Híbridos** — uma
disciplina que assume que engenheiros de software atuam como curadores de código
gerado por IA, aplicando julgamento técnico para avaliar, refinar e integrar
soluções automáticas dentro de arquiteturas determinísticas.

A transição proposta recontextualiza o design de software: princípios SOLID
adaptam-se para avaliar código não-escrito; padrões de design evoluem para
contemplar variabilidade e não-determinismo; interfaces são projetadas para
comunicar incerteza; e a qualidade de design é medida pela facilidade de
verificação humana.

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos do Design na Era dos LLMs**
   - Mudança de foco: Construção -> Curadoria.
   - O paradoxo da abundância de código.
   - Design como restrição de probabilidade.

2. **Seção 2: Princípios de Design para Código Gerado**
   - SOLID revisitado para IA.
   - Princípios de "Design for Disposability" (Código descartável).
   - "Prompt as Specification".

3. **Seção 3: Padrões de Design para Sistemas Híbridos**
   - AI Gateway & Guardrails.
   - Human-in-the-Loop patterns.
   - Fallback determinístico.

4. **Seção 4: Design de Componentes Determinísticos**
   - O núcleo imutável ("Core Domain") vs. camadas geradas.
   - Isolamento de componentes probabilísticos.

5. **Seção 5: Design de Interfaces e Contratos**
   - Prompts como APIs.
   - Schemas rígidos (JSON/Pydantic) como contratos de fronteira.
   - Tolerância a falhas na interface.

6. **Seção 6: Design para Verificabilidade**
   - Design que facilita testes automatizados e revisão humana.
   - Observabilidade intrínseca ("Explainability by design").

7. **Seção 7: Refatoração e Modernização Assistida**
   - Padrão Strangler Fig com IA.
   - Extração de conhecimento de legado.

8. **Seção 8: Ferramentas e Técnicas Modernas**
   - Ferramentas de "AI-Native Architecture".
   - Ambientes de desenvolvimento híbridos.

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                    | Avaliação                                                                |
| --------------------------- | ------------------------------------------------------------------------ |
| Descartabilidade Geracional | Média - princípios fundamentais permanecem, técnicas específicas evoluem |
| Custo de Verificação        | Alto - verificação de código gerado exige expertise                      |
| Responsabilidade Legal      | Alto - designers responsáveis por integridade de código gerado           |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Requirements:** Design traduz restrições em estruturas
  implementáveis
- **Software Architecture:** Design detalha componentes arquiteturais
- **Software Construction:** Design determina padrões para geração de código
- **Software Testing:** Design para testabilidade de código gerado
- **Software Quality:** Design influencia atributos de qualidade do sistema
- **Engenharia de Garantia e Verificação em Escala:** Design para verificação
  eficiente
- **Governança de IA para Engenharia de Software:** Design para compliance e
  auditabilidade

______________________________________________________________________

## Conceitos Chave e Referências de Base

- **Stoica et al. (2024):** Especificações formais como "elo perdido" para confiabilidade de LLMs.
- **GitClear (2024/2025):** Impacto do "Code Churn" gerado por IA na manutenibilidade.
- **Design for Auditability (DfA):** Estratégias para tornar sistemas de caixa preta inspecionáveis.
- **Jevons Paradox in Software:** Aumento da eficiência na geração de código levando a maior consumo de recursos de revisão.

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0*

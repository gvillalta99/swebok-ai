# Software Design (SWEBOK-AI v5.0)

> **Design de Sistemas Híbridos: Curadoria, Orquestração e Verificabilidade.**

Este Knowledge Area (KA) foi completamente reescrito para refletir a realidade da engenharia de software na era dos Large Language Models (LLMs). O foco deslocou-se da construção manual de estruturas para o design de restrições, interfaces probabilísticas e arquiteturas resilientes à incerteza.

## Estrutura do Capítulo

1.  **[Fundamentos do Design na Era dos LLMs](./01-fundamentos-design-era-llms.md)**
    - A transição de construtor para curador.
    - O paradoxo da abundância de código.
    - Design como gestão de risco e probabilidade.

2.  **[Princípios de Design para Código Gerado](./02-principios-design-codigo-gerado.md)**
    - Revisitando SOLID para IA.
    - Design for Disposability (Descartabilidade).
    - Prompt as Specification (PaS).

3.  **[Padrões de Design para Sistemas Híbridos](./03-padroes-design-sistemas-hibridos.md)**
    - AI Gateway & Guardrails.
    - Human-in-the-Loop.
    - Circuit Breakers para alucinação.

4.  **[Design de Componentes Determinísticos](./04-design-componentes-deterministicos.md)**
    - O Núcleo Imutável (Core Domain).
    - Isolamento via Arquitetura Hexagonal.
    - Estratégias de Fallback.

5.  **[Design de Interfaces e Contratos](./05-design-interfaces-contratos.md)**
    - Prompts como APIs (Function Calling).
    - Schema-First Development.
    - Tratamento de falhas estruturais.

6.  **[Design para Verificabilidade](./06-design-verificabilidade.md)**
    - Testes determinísticos vs probabilísticos.
    - Observabilidade intrínseca (Chain of Thought).
    - Evals como requisitos de design.

7.  **[Refatoração e Modernização Assistida](./07-refatoracao-modernizacao-assistida.md)**
    - Padrão Strangler Fig com IA.
    - Documentação reversa e extração de conhecimento.

8.  **[Ferramentas e Técnicas Modernas](./08-ferramentas-tecnicas-modernas.md)**
    - Stack de IA: Vector DBs, Orquestradores (LangChain/LlamaIndex).
    - IDEs Aumentadas e Agentes Autônomos.
    - DSPy e otimização de prompts.

---
*Este conteúdo faz parte do projeto SWEBOK-AI v5.0.*

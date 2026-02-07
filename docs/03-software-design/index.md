---
title: 'KA 03: Design de Software'
created_at: 2026-02-07
tags: [software-design, design-patterns, solid, context-engineering, llm-design, agentic-patterns]
status: draft
updated_at: 2026-02-07
ai_model: Claude-3.5-Sonnet
---

# KA 03: Design de Software

> **"O código tornou-se commodity; o contexto tornou-se capital."**

## Introdução

O design de software está passando por uma transformação fundamental
impulsionada pela IA generativa e Large Language Models (LLMs). Este Knowledge
Area reimagina as práticas de design de software para a era onde a geração
algorítmica é infraestrutura, não produto.

A premissa central deste KA é que engenheiros de software estão migrando de
codificadores linha a linha para **orquestradores de sistemas** e
**especificadores de contexto**. As habilidades tradicionais de implementação
manual permanecem valiosas, mas o valor diferencial moveu-se para a capacidade
de projetar sistemas complexos, gerenciar contextos ricos e supervisionar
comportamentos de IA.

## O Que Você Vai Aprender

Após estudar este KA, você será capaz de:

- **Compreender** a nova realidade do design de software na era da IA, incluindo
  paradigmas emergentes como Chat-Oriented Programming (CHOP) e Vibe Coding
- **Aplicar** princípios clássicos de design (SOLID, DRY, KISS) em contexto de
  desenvolvimento com IA generativa
- **Diferenciar** os papéis de arquitetura e design em projetos com sistemas de
  IA
- **Utilizar** padrões de design clássicos adaptados para sistemas com LLMs
- **Implementar** os 32+ novos padrões de design específicos para IA generativa
- **Projetar** sistemas usando Agentic Design Patterns e padrões de colaboração
  multi-agent
- **Dominar** o Context Engineering como disciplina central de design
- **Documentar** decisões de design de forma efetiva em projetos com IA
- **Preparar-se** para o futuro do papel do designer de software

## Estrutura do KA

Este Knowledge Area está organizado em 10 seções:

### 1. [Introdução ao Design de Software na Era da IA](01-introducao-design-era-ia.md)

Estabelece o contexto fundamental da transformação do design impulsionada por
IA, apresentando a mudança de paradigma onde engenheiros atuam como
orquestradores.

### 2. [Princípios de Design Clássicos na Era da IA](02-principios-design-classicos.md)

Reinterpreta SOLID, DRY, KISS e outros princípios para o contexto de
desenvolvimento com IA, mostrando como aplicá-los via engenharia de prompt.

### 3. [Arquitetura vs Design em Contexto de IA](03-arquitetura-vs-design.md)

Diferencia claramente os papéis de arquitetura e design em projetos com IA,
estabelecendo limites, responsabilidades e o papel evolutivo do arquiteto.

### 4. [Padrões de Design Clássicos na Era da IA](04-padroes-design-classicos.md)

Revisa os padrões GoF e empresariais, mostrando como são aplicados e gerados por
IA, com novos usos em sistemas com LLMs.

### 5. [Novos Padrões de Design para IA](05-padroes-design-ia.md)

Apresenta os 32 padrões de design catalogados por Lakshmanan & Hapke (O'Reilly,
2024\) e frameworks como LLM Triangle Principles.

### 6. [Design Patterns para Sistemas com IA](06-design-patterns-sistemas-ia.md)

Detalha patterns específicos para arquitetura de sistemas com IA: agentic
patterns, colaboração multi-agent e padrões de resiliência.

### 7. [Design Centrado em Contexto](07-design-contexto.md)

Estabelece o Context Engineering como disciplina central, detalhando os seis
pilares, componentes e patterns para gerenciamento efetivo de contexto.

### 8. [Documentação de Design](08-documentacao-design.md)

Apresenta as evoluções necessárias nas práticas de documentação em projetos com
IA: Prompt Specification Docs, Context Flow Diagrams, AI Contract Sheets.

### 9. [O Futuro do Designer de Software](09-futuro-designer-software.md)

Analisa mudanças no papel do designer, novas competências, gargalos emergentes e
tendências como Agentic AI e Context-First Development.

### 10. [Checklist e Templates](10-checklist-templates.md)

Ferramentas práticas: checklists de design para sistemas com IA e templates de
documentação para componentes com IA.

## Público-Alvo

Este KA é destinado a:

- **Arquitetos de Software** que precisam integrar IA em suas decisões
  arquiteturais
- **Líderes Técnicos** responsáveis por definir padrões e práticas de design
- **Engenheiros Seniores** que trabalham com sistemas tradicionais e/ou com IA
  generativa
- **Desenvolvedores** em transição para papéis de orquestração e design de
  contexto
- **Product Managers** técnicos que precisam entender as implicações de design
  de sistemas com IA

## Pré-requisitos

Embora este KA seja autocontido, recomenda-se familiaridade com:

- Conceitos básicos de design de software (princípios SOLID, padrões GoF)
- Fundamentos de arquitetura de software
- Conhecimento introdutório sobre LLMs e IA generativa
- Experiência com programação em pelo menos uma linguagem orientada a objetos

## Relação com Outros KAs

Este Knowledge Area se relaciona estreitamente com:

- **KA 02: Arquitetura de Software** - Design e arquitetura são disciplinas
  complementares
- **KA 04: Construção de Software** - O design influencia diretamente como o
  código é construído
- **KA 05: Teste de Software** - Padrões de design afetam estratégias de teste
- **KA 12: Qualidade de Software** - Princípios de design são fundamentais para
  qualidade
- **KA 13: Segurança de Software** - Design de sistemas com IA requer
  considerações especiais de segurança

## Como Usar Este KA

1. **Leitura Sequencial**: Para uma compreensão completa, leia as seções na
   ordem apresentada
2. **Consulta Rápida**: Use o índice para navegar diretamente aos tópicos de
   interesse
3. **Aplicação Prática**: A Seção 10 (Checklist e Templates) pode ser usada como
   referência prática durante projetos
4. **Estudo de Caso**: Considere aplicar os conceitos em um projeto real ou
   hipotético enquanto estuda

## Referências Principais

- Khononov, Vlad. "Balancing Coupling in Software Design." Pearson, 2024.
- Lakshmanan, Valliappa & Hapke, Hannes. "Generative AI Design Patterns."
  O'Reilly, 2024.
- GitHub. "Survey: AI Wave Grows." 2024.
- Ng, Andrew. "4 Agentic Design Patterns." Snowflake BUILD 2024.
- Weaviate. "Context Engineering for AI Agents." 2025.

______________________________________________________________________

*Este KA faz parte do SWEBOK-AI v5.0 - Software Engineering Body of Knowledge
para a era dos LLMs.*

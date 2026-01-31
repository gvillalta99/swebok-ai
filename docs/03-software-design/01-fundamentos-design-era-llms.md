---
title: "01. Fundamentos de Design na Era dos LLMs"
created_at: "2025-01-31"
tags: ["software-design", "fundamentos", "llm", "ia", "design-thinking"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Fundamentos de Design na Era dos LLMs

## Overview

O design de software está passando por uma transformação fundamental. Enquanto o SWEBOK v4.0 tratava design como o processo de traduzir requisitos em estruturas de código através de padrões e princípios orientados a objetos, a era dos Large Language Models (LLMs) exige uma reconfiguração profunda da disciplina. Design tornou-se primariamente sobre **curadoria e orquestração de código gerado** [1].

Esta seção estabelece os fundamentos do **Design de Sistemas Híbridos** — uma disciplina que assume que engenheiros de software atuam como curadores de código gerado por IA, aplicando julgamento técnico para avaliar, refinar e integrar soluções automáticas dentro de arquiteturas determinísticas.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender a transição do design tradicional para o design de sistemas híbridos
2. Identificar os novos papéis do engenheiro de software como curador de código gerado
3. Reconhecer as implicações da não-determinismo na geração de código
4. Aplicar princípios de design thinking adaptados para a era dos LLMs

## O Paradigma do Design Híbrido

### De Autor para Curador

A transição proposta recontextualiza o design de software de forma radical:

| Aspecto | Design Tradicional | Design na Era dos LLMs |
|---------|-------------------|------------------------|
| **Papel do Engenheiro** | Autor de código | Curador e verificador |
| **Foco Principal** | Produção de código | Validação e integração |
| **Gargalo** | Escrever código | Verificar código gerado |
| **Artefato Central** | Código manual | Código gerado + especificações de verificação |
| **Qualidade Medida Por** | Cobertura de testes | Facilidade de verificação humana |

Segundo Acharya (2025), os novos paradigmas de desenvolvimento — do Chat-Oriented Programming (CHOP) ao "vibe coding" e agentic programming — prometem produtividade acelerada, mas introduzem desafios de confiança, accountability e mudanças necessárias nas habilidades dos desenvolvedores [2].

### Design Thinking Reconfigurado

O design thinking tradicional, conforme descrito por Ross, Goodenough e Irvine no SWEBOK v4, consistia em cinco passos fundamentais:

1. Cristalizar um propósito ou objetivo
2. Formular um conceito para alcançar o propósito
3. Criar um mecanismo que implementa a estrutura conceitual
4. Introduzir uma notação para expressar as capacidades do mecanismo
5. Descrever o uso da notação em um contexto específico

Na era dos LLMs, este processo evolui para:

```
┌─────────────────────────────────────────────────────────────┐
│  DESIGN THINKING NA ERA DOS LLMs                           │
├─────────────────────────────────────────────────────────────┤
│  1. Definir restrições e contexto (não apenas objetivos)   │
│  2. Especificar critérios de verificação                   │
│  3. Orquestrar geração através de prompts estruturados     │
│  4. Avaliar saídas múltiplas e selecionar/iterar           │
│  5. Validar contra critérios predefinidos                  │
│  6. Documentar raciocínio e decisões de aceite             │
└─────────────────────────────────────────────────────────────┘
```

## O Desafio do Não-Determinismo

### Natureza Probabilística dos LLMs

Os LLMs são sistemas probabilísticos por natureza. Dado o mesmo prompt, um modelo pode gerar diferentes saídas em cada invocação. Esta característica introduz desafios únicos para o design de software:

- **Variabilidade de saída**: O mesmo prompt pode gerar implementações diferentes
- **Alucinações**: O modelo pode introduzir APIs inexistentes ou lógica incorreta
- **Inconsistência de estilo**: Diferentes sessões podem produzir código com estilos distintos
- **Débito técnico invisível**: Código que funciona mas é difícil de manter

Segundo pesquisa da Veracode (2025), **45% do código gerado por IA contém falhas de segurança** [3]. Outro estudo de Schreiber e Tippe (2025) analisou 7.703 arquivos de código gerado por IA e identificou 4.279 vulnerabilidades usando análise estática CodeQL [4].

### Estratégias de Mitigação

Para lidar com o não-determinismo, o design deve incorporar:

1. **Prompts Versionados**: Tratar prompts como código — versionados, testados e revisados
2. **Múltiplas Amostras**: Gerar várias alternativas e selecionar a mais adequada
3. **Critérios Explícitos**: Definir métricas objetivas de qualidade antes da geração
4. **Validação Automatizada**: Integrar verificação estática e testes na pipeline de geração

## O Engenheiro como Avaliador

### Novas Competências Essenciais

O engenheiro de software na era dos LLMs precisa desenvolver competências distintas:

| Competência Tradicional | Nova Competência | Descrição |
|------------------------|------------------|-----------|
| Sintaxe de linguagem | Prompt engineering | Formular instruções precisas para LLMs |
| Padrões de design | Padrões de verificação | Identificar anti-padrões em código gerado |
| Debugging | Raciocínio sobre incerteza | Avaliar confiabilidade de saídas |
| Otimização de código | Otimização de prompts | Refinar instruções para melhores resultados |
| Code review | Avaliação de código gerado | Verificação sistemática de código de IA |

### O Paradoxo da Produtividade

Pesquisa do GitClear (2025) sugere crescimento de 4x na duplicação de código gerado por IA [5]. O Stack Overflow Developer Survey 2025, com mais de 49.000 respostas de 177 países, revela que desenvolvedores estão navegando lacunas confusas entre expectativa e realidade no uso de ferramentas de codificação com IA [6].

Este é o **Paradoxo de Jevons aplicado ao software**: à medida que a geração de código se torna mais eficiente, o esforço de verificação e manutenção aumenta proporcionalmente.

## Contexto do Design na Engenharia de Software

### Relacionamento com Outras Disciplinas

O design de sistemas híbridos mantém relações críticas com outras áreas do conhecimento:

- **Software Requirements**: Design traduz restrições em estruturas implementáveis
- **Software Architecture**: Design detalha componentes arquiteturais híbridos
- **Software Construction**: Design determina padrões para geração de código
- **Software Testing**: Design para testabilidade de código não-determinístico
- **Software Quality**: Design influencia atributos de qualidade do sistema
- **Governança de IA**: Design para compliance e auditabilidade

### O Papel da Especificação

Stoica et al. (2024) argumentam que especificações são o elo perdido para tornar o desenvolvimento de sistemas LLM uma disciplina de engenharia [7]. O design deve priorizar:

1. **Especificações Verificáveis**: Critérios objetivos que podem ser automaticamente testados
2. **Contratos Bem Definidos**: Interfaces que comunicam claramente expectativas e limites
3. **Documentação de Raciocínio**: Registro das decisões de design e trade-offs considerados

## Practical Considerations

### Aplicações Reais

1. **Startups**: Adoção rápida de ferramentas de IA com verificação mínima — risco de débito técnico
2. **Enterprise**: Processos formais de validação de código gerado — trade-off velocidade vs. segurança
3. **Sistemas Críticos**: Supervisão humana obrigatória — código gerado apenas como ponto de partida

### Limitações e Riscos

- **Over-reliance**: Dependência excessiva de código gerado sem compreensão profunda
- **Skill atrophy**: Degradação de habilidades de programação manual
- **Accountability gap**: Dificuldade em atribuir responsabilidade por falhas
- **Security debt**: Acúmulo de vulnerabilidades não detectadas

### Melhores Práticas

1. **Human-in-the-loop**: Sempre ter revisão humana para código crítico
2. **Test-driven generation**: Escrever testes antes de gerar código
3. **Versionamento de prompts**: Tratar prompts como código fonte
4. **Métricas de qualidade**: Monitorar não apenas velocidade, mas qualidade do código gerado

## Summary

- O design de software evoluiu de autor para curador de código gerado
- O não-determinismo dos LLMs exige novas estratégias de verificação e validação
- O engenheiro precisa desenvolver competências de avaliação e prompt engineering
- Especificações verificáveis tornam-se o elo crítico para engenharia disciplinada
- O Paradoxo de Jevons implica que produtividade aumentada exige mais verificação

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Média — princípios fundamentais permanecem, ferramentas específicas evoluem rapidamente |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto — verificação de design requer expertise humana significativa |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta — designers responsáveis por integridade de código gerado |

## References

1. SWEBOK-AI v5.0 Project Team. "Software Design Knowledge Area Reconfiguration." SWEBOK-AI Documentation, 2025.

2. Acharya, V. "Generative AI and the Transformation of Software Development Practices." arXiv:2510.10819, 2025. https://arxiv.org/abs/2510.10819

3. Tischler, N. "AI-Generated Code Security Risks: What Developers Must Know." Veracode Research, 2025. https://www.veracode.com/blog/ai-generated-code-security-risks/

4. Schreiber, M.; Tippe, P. "Security Vulnerabilities in AI-Generated Code: A Large-Scale Analysis of Public GitHub Repositories." arXiv:2510.26103, 2025. https://arxiv.org/abs/2510.26103

5. GitClear. "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones." GitClear Research, 2025. https://www.gitclear.com/ai_assistant_code_quality_2025_research

6. Stack Overflow. "2025 Developer Survey." Stack Overflow, 2025. https://survey.stackoverflow.co/2025/

7. Stoica, I.; Zaharia, M.; Gonzalez, J.; et al. "Specifications: The missing link to making the development of LLM systems an engineering discipline." arXiv:2412.05299, 2024. https://arxiv.org/abs/2412.05299

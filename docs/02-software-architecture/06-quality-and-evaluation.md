---
title: Qualidade e Avaliação
created_at: 2026-02-07
tags: [quality-attributes, nfr, atam, fitness-functions, evaluation]
status: draft
updated_at: 2026-02-07
ai_model: google/gemini-3-pro-preview
agent: book-writer
---

# Qualidade e Avaliação

A introdução de componentes estocásticos (não-determinísticos) como LLMs em
sistemas de software exige a revisão dos critérios de qualidade e dos métodos de
avaliação arquitetural.

## Novos Atributos de Qualidade (NFRs)

Além dos clássicos (desempenho, segurança, escalabilidade), a arquitetura
moderna deve monitorar e garantir novos Requisitos Não-Funcionais:

### 1. Determinismo e Consistência

Sistemas tradicionais são determinísticos (Input A -> Output B). Sistemas com IA
são probabilísticos.

- **Requisito:** O sistema deve garantir que operações críticas (ex: cálculos
  financeiros) permaneçam determinísticas, isolando a variabilidade da IA apenas
  para camadas de apresentação ou recomendação.

### 2. Explicabilidade (Explainability)

Em setores regulados, "a IA decidiu" não é uma resposta aceitável.

- **Requisito:** A arquitetura deve persistir a "Cadeia de Pensamento" (Chain of
  Thought) ou os metadados que levaram a uma decisão, permitindo auditoria
  forense.

### 3. Custo de Token (Token Economics)

O custo de operação agora está diretamente ligado à verbosidade.

- **Requisito:** Eficiência de prompt. A arquitetura deve incluir mecanismos de
  cache semântico para evitar chamadas repetitivas e caras aos modelos para
  perguntas similares.

### 4. Ética e Segurança de Prompt

- **Requisito:** Resistência a *Prompt Injection* e *Jailbreak*. A arquitetura
  deve incluir camadas de sanitização de entrada e saída (guardrails) que
  filtram conteúdo tóxico ou tentativas de manipulação do sistema.

## Avaliação Assistida (AI-ATAM)

O *Architecture Tradeoff Analysis Method* (ATAM) é tradicionalmente uma reunião
longa e custosa entre stakeholders humanos. A IA pode acelerar e aprofundar esse
processo.

- **Stakeholders Sintéticos:** Arquitetos podem usar LLMs para simular personas
  (ex: "Atue como um Especialista em Segurança Cínico" ou "Atue como um CFO
  focado em custos") e pedir que critiquem a arquitetura proposta. Isso revela
  pontos cegos antes mesmo da revisão humana.
- **Análise de Cenários:** A IA pode gerar centenas de cenários de falha ("E se
  o Vector DB cair?", "E se a latência da API da OpenAI triplicar?") e avaliar a
  resiliência teórica da arquitetura documentada.

## Fitness Functions Geradas

A governança arquitetural evolui de "documentos de política" para "código
executável".

- **Testes de Arquitetura (ArchUnit):** Em vez de escrever regras manualmente, o
  arquiteto descreve a intenção ("A camada de Domínio não pode depender da
  camada de Infraestrutura") e a IA gera os testes unitários de arquitetura que
  rodam no CI/CD.
- **Monitoramento Contínuo:** Fitness functions evolutivas monitoram a
  degradação da arquitetura em produção (ex: aumento do acoplamento ao longo do
  tempo) e alertam a equipe antes que a dívida técnica se torne impagável.

## Referências

1. Bass, L., Clements, P., & Kazman, R. (2021). *Software Architecture in
   Practice*.
2. Ford, N., Parsons, R., & Kua, P. (2017). *Building Evolutionary
   Architectures*.

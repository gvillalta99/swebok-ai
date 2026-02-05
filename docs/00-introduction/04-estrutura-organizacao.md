---
title: Estrutura e Organização do Guia
created_at: '2025-01-31'
tags: [introducao, estrutura, organizacao, ka, knowledge-areas]
status: published
updated_at: '2026-02-05'
ai_model: kimi-k2.5
---

# Estrutura e Organização do Guia

## Overview

O SWEBOK-AI v5.0 reconfigura a estrutura tradicional de 18 KAs para **16
Knowledge Areas**, eliminando os KAs de Fundamentos (16-18) do corpo principal e
concentrando-se na **aplicação prática** da engenharia de software na era dos
LLMs. Esta mudança reflete o princípio de que este é um guia para praticantes,
não para pesquisadores de IA.

Os conceitos fundamentais essenciais foram:

- **Integrados na Introdução**: Fundamentos Essenciais de IA (LLMs,
  Transformers, RAG, Agentes)
- **Distribuídos nos KAs aplicáveis**: Estatística em Testing, métodos formais
  em Models, etc.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender a estrutura de 16 KAs do SWEBOK-AI v5.0
2. Navegar pelas 6 Partes do guia de forma lógica
3. Identificar quais KAs ler baseado em seu perfil
4. Entender a progressão do fundamental à aplicação prática

## Estrutura em 6 Partes

O SWEBOK-AI v5.0 organiza as 16 KAs em **6 Partes**, seguindo uma progressão
pedagógica clara:

```
SWEBOK-AI v5.0 (16 KAs)
│
├── PARTE I: Fundamentos e Contexto
│   └── Introdução + Fundamentos Essenciais de IA
│
├── PARTE II: Engenharia de Software Aplicada (KAs 1-7)
│   ├── KA 01: Software Requirements
│   ├── KA 02: Software Architecture
│   ├── KA 03: Software Design
│   ├── KA 04: Software Construction
│   ├── KA 05: Software Testing
│   ├── KA 06: Software Engineering Operations
│   └── KA 07: Software Maintenance
│
├── PARTE III: Governança e Gerenciamento (KAs 8-11)
│   ├── KA 08: Software Configuration Management
│   ├── KA 09: Software Engineering Management
│   ├── KA 10: Software Engineering Process
│   └── KA 11: Software Engineering Models and Methods
│
├── PARTE IV: Qualidade, Segurança e Ética (KAs 12-14)
│   ├── KA 12: Software Quality
│   ├── KA 13: Software Security
│   └── KA 14: Software Engineering Professional Practice
│
├── PARTE V: Economia e Métricas (KA 15)
│   └── KA 15: Software Engineering Economics
│
└── PARTE VI: Referências (KA 16)
    └── KA 16: Appendix
```

## Por Que 16 KAs?

### O Que Foi Removido

Os **KAs 16, 17 e 18 (Foundations)** foram removidos do corpo principal:

| KA Removido | Conteúdo                 | Destino                          |
| ----------- | ------------------------ | -------------------------------- |
| **KA 16**   | Computing Foundations    | Archive (não faz parte do livro) |
| **KA 17**   | Mathematical Foundations | Archive (não faz parte do livro) |
| **KA 18**   | Engineering Foundations  | Archive (não faz parte do livro) |

### Justificativa

**Este não é um livro de fundamentos teóricos.**

O público-alvo do SWEBOK-AI v5.0 são **engenheiros de software praticantes**,
não pesquisadores de IA. Conceitos como:

- Álgebra linear para deep learning
- Teoria dos números e criptografia
- Cálculo e otimização matemática
- Hardware para computação de IA

...são importantes para pesquisadores, mas não essenciais para engenheiros
aplicando IA em projetos.

### O Que Foi Preservado

Os **conceitos essenciais** dos KAs removidos foram:

1. **Movidos para Introdução** (Parte I):

   - O que são LLMs (conceitual)
   - Transformers e Atenção (alto nível)
   - RAG e Contexto
   - Agentes e Autonomia
   - Estatística básica para testes

2. **Distribuídos nos KAs aplicáveis**:

   - **KA 01**: Fundamentos de lógica para invariantes
   - **KA 05**: Fundamentos estatísticos para testes
   - **KA 11**: Introdução a métodos formais
   - **KA 15**: Fundamentos de análise de risco

## Mapeamento de Transformações por KA

### PARTE II: Engenharia Aplicada

#### KA 01: Software Requirements

**Transformação**: De "Engenharia de Requisitos" para "Engenharia de Restrições
e Contexto"

**Foco Tradicional**:

- Elicitação de requisitos funcionais
- Especificação de comportamento desejado

**Foco AI-First**:

- Definição de restrições e limites
- Engenharia de contexto
- Especificação do que NÃO fazer
- Invariantes e contratos

**Conexões Principais**: KA 02 (Arquitetura), KA 12 (Qualidade), KA 15
(Economia)

______________________________________________________________________

#### KA 02: Software Architecture

**Transformação**: De "Arquitetura de Software" para "Arquitetura de Sistemas
Híbridos"

**Foco Tradicional**:

- Padrões arquiteturais
- Decisões estruturais

**Foco AI-First**:

- Arquiteturas humanos-IA
- Degradação graciosa
- Circuit breakers e fallback
- Governança de agentes autônomos

**Conexões Principais**: KA 01 (Requisitos), KA 03 (Design), KA 13 (Segurança)

______________________________________________________________________

#### KA 03: Software Design

**Transformação**: De "Design de Software" para "Design de Sistemas Híbridos"

**Foco Tradicional**:

- Padrões de design
- Princípios SOLID

**Foco AI-First**:

- Design para auditabilidade
- Interfaces humano-IA
- Supervisão e controle
- Componentes determinísticos vs. não-determinísticos

**Conexões Principais**: KA 02 (Arquitetura), KA 04 (Construction), KA 14
(Prática Profissional)

______________________________________________________________________

#### KA 04: Software Construction

**Transformação**: De "Construção de Software" para "Orquestração e Curadoria de
Código"

**Foco Tradicional**:

- Codificação manual
- Debugging

**Foco AI-First**:

- Engenharia de prompts
- Avaliação de código gerado
- Pipeline de verificação
- **LEGADO**: Codificação manual extensiva

**Conexões Principais**: KA 03 (Design), KA 05 (Testing), KA 07 (Manutenção)

______________________________________________________________________

#### KA 05: Software Testing

**Transformação**: De "Testes de Software" para "Verificação e Validação em
Escala"

**Foco Tradicional**:

- Testes unitários, integração, sistema
- Cobertura de código

**Foco AI-First**:

- Verificação de código não-determinístico
- Testes estatísticos
- Validação semântica
- Testes de comportamento emergente

**Conexões Principais**: KA 04 (Construction), KA 12 (Qualidade), KA 13
(Segurança)

______________________________________________________________________

#### KA 06: Software Engineering Operations

**Transformação**: Operações de sistemas com IA

**Foco Tradicional**:

- DevOps
- CI/CD

**Foco AI-First**:

- Agentes de operações
- Detecção anômala com IA
- Automação inteligente
- Resposta a incidentes assistida por IA

**Conexões Principais**: KA 08 (CM), KA 09 (Management), KA 13 (Segurança)

______________________________________________________________________

#### KA 07: Software Maintenance

**Transformação**: De "Manutenção de Software" para "Manutenção de Sistemas
Opaços"

**Foco Tradicional**:

- Correção de defeitos
- Adaptação a novos ambientes

**Foco AI-First**:

- Manutenção de código sem documentação de raciocínio
- Refatoração de código gerado por IA
- Gestão de dívida técnica de sistemas opacos
- Arqueologia de código de IA

**Conexões Principais**: KA 04 (Construction), KA 12 (Qualidade), KA 15
(Economia)

______________________________________________________________________

### PARTE III: Governança e Gerenciamento

#### KA 08: Software Configuration Management

**Transformação**: CM em ambientes com geração massiva de código

**Foco**: Versionamento de prompts, contexto e modelos

**Conexões Principais**: KA 06 (Operations), KA 09 (Management)

______________________________________________________________________

#### KA 09: Software Engineering Management

**Transformação**: Gestão de equipes híbridas humanos-IA

**Foco**: Novos papéis, métricas de qualidade vs. velocidade, gestão de mudança

**Conexões Principais**: Todos os KAs aplicados

______________________________________________________________________

#### KA 10: Software Engineering Process

**Transformação**: Processos adaptados para verificação-centrismo

**Foco**: Integração de agentes no SDLC, workflows agenticos

**Conexões Principais**: KA 09 (Management), KA 11 (Models and Methods)

______________________________________________________________________

#### KA 11: Software Engineering Models and Methods

**Transformação**: Métodos com suporte de IA

**Foco**: Modelagem assistida por IA, métodos formais aplicados

**Conexões Principais**: KA 01 (Requirements), KA 03 (Design)

______________________________________________________________________

### PARTE IV: Qualidade, Segurança e Ética

#### KA 12: Software Quality

**Transformação**: Qualidade de código gerado por IA

**Foco**: Qualidade não-determinística, verificação como gargalo,
explicabilidade

**Conexões Principais**: KA 05 (Testing), KA 07 (Maintenance), KA 13 (Segurança)

______________________________________________________________________

#### KA 13: Software Security

**Transformação**: Segurança em sistemas com IA

**Foco**: Vulnerabilidades em código gerado, segurança de sistemas autônomos

**Conexões Principais**: KA 05 (Testing), KA 12 (Quality), KA 02 (Architecture)

______________________________________________________________________

#### KA 14: Software Engineering Professional Practice

**Transformação**: Julgamento técnico em era de IA

**Foco**: Accountability, "quando dizer não à IA", competências de verificação

**Conexões Principais**: KA 09 (Management), KA 15 (Economics)

______________________________________________________________________

### PARTE V: Economia

#### KA 15: Software Engineering Economics

**Transformação**: Economia da engenharia com IA

**Foco**: Paradoxo de Jevons, TCO de código gerado, custos de verificação

**Conexões Principais**: Todos os KAs (transversal)

______________________________________________________________________

### PARTE VI: Referências

#### KA 16: Appendix

**Conteúdo**: Especificações, padrões, referências, glossário, matrizes

______________________________________________________________________

## Caminhos de Leitura Recomendados

### Para Engenheiros de Software (começando com IA)

**Perfil**: Já trabalha com software, quer aplicar IA em projetos

```
Parte I → KA 01 → KA 04 → KA 05 → KA 12
(Fundamentos) (Requisitos) (Construction) (Testing) (Quality)
```

### Para Arquitetos de Software

**Perfil**: Define arquitetura de sistemas, precisa integrar componentes de IA

```
Parte I → KA 01 → KA 02 → KA 03 → KA 08 → KA 11
(Fundamentos) (Requisitos) (Arquitetura) (Design) (Config) (Models)
```

### Para Líderes Técnicos

**Perfil**: Gerencia equipes, toma decisões estratégicas sobre IA

```
Parte I → KA 09 → KA 14 → KA 15 → KA 10 → KA 13
(Fundamentos) (Management) (Prática) (Economia) (Processo) (Segurança)
```

### Para Engenheiros de Qualidade

**Perfil**: Foca em testes, verificação e garantia de qualidade

```
Parte I → KA 05 → KA 12 → KA 13 → KA 04 → KA 07
(Fundamentos) (Testing) (Quality) (Security) (Construction) (Maintenance)
```

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                              |
| ------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Muito Baixa — estrutura organizacional |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Baixo — mapeamento conceitual          |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Baixa — estrutura de navegação         |

## Summary

1. O SWEBOK-AI v5.0 tem **16 KAs** (reduzido de 18 no v4.0)
2. **KAs 16-18 (Foundations) removidos** — conteúdo movido para Introdução ou
   distribuído
3. Estrutura organizada em **6 Partes** com progressão lógica
4. **Foco em aplicação prática**, não teoria de IA
5. Fundamentos essenciais integrados onde são aplicados
6. Público-alvo: **engenheiros de software praticantes**

## References

1. IEEE COMPUTER SOCIETY. Guide to the Software Engineering Body of Knowledge
   (SWEBOK), Version 4.0. 2024. Disponível em:
   <https://www.computer.org/education/bodies-of-knowledge/software-engineering>

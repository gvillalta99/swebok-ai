---
title: "Seção 2.5: A Falta de Regulamentação na Engenharia de Software"
created_at: 2025-01-30
tags: ["swebok-ai", "pratica-profissional", "regulamentacao", "accountability"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# Seção 2.5: A Falta de Regulamentação na Engenharia de Software

## Overview

Esta seção aborda uma lacuna crítica na prática profissional de engenharia de software: a **ausência de frameworks regulatórios comparáveis** aos existentes em outras engenharias (civil, elétrica, mecânica). Enquanto a engenharia civil exige CREA, ART e cumprimento de normas técnicas (NR-10, NBRs) para construção de uma simples residência, a engenharia de software permite que qualquer pessoa desenvolva e implante sistemas críticos sem qualquer registro profissional ou supervisão técnica obrigatória.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Comparar os frameworks regulatórios da engenharia civil vs. engenharia de software
2. Identificar os riscos da ausência de regulamentação na era dos LLMs
3. Analisar como a falta de regulamentação afeta accountability em sistemas gerados por IA
4. Propor caminhos para profissionalização/regulamentação da área

---

## 2.5.1 O Paradoxo da Engenharia de Software

### A Analogia da Construção Civil

Conforme observado em [[gargalo|gargalo.md]], a relação entre engenheiros de software e agentes de IA (LLMs, Claude Code, etc.) tornou-se similar à relação entre engenheiros civis e pedreiros:

```
┌─────────────────────────────────────────────────────────────────┐
│              ENGENHARIA CIVIL (Regulada)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Engenheiro ──▶ Projeto ──▶ ART/CREA ──▶ Fiscalização ──▶ Obra │
│      │             │           │              │            │    │
│      │             │           │              │            │    │
│   RESPONSÁVEL   TÉCNICO    REGISTRO       VERIFICAÇÃO   EXECUÇÃO│
│   LEGAL         LEGAL      OBRIGATÓRIO    OBRIGATÓRIA     │    │
│                                                           │    │
│  Pedreiros executam sob supervisão técnica obrigatória ◄──┘    │
│                                                                 │
│  Infração: Crime contra a segurança pública                     │
│  Penalidade: Processo criminal, perda de registro               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│           ENGENHARIA DE SOFTWARE (Não Regulada)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Qualquer pessoa ──▶ Código ──▶ Deploy ──▶ Produção            │
│       │               │           │            │                │
│       │               │           │            │                │
│   NENHUM          NENHUMA    NENHUMA      SISTEMAS              │
│   REQUISITO       REGISTRO   FISCALIZAÇÃO CRÍTICOS             │
│                                                           │     │
│  Agentes de IA (LLMs) geram código sob supervisão ◄───────┘     │
│  voluntária e sem accountability legal definida                 │
│                                                                 │
│  Infração: Violação de contrato (cível)                         │
│  Penalidade: Danos e rescisão (se houver processo)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Os Requisitos da Engenharia Civil que o Software Ignora

| Aspecto | Engenharia Civil | Engenharia de Software |
|---------|------------------|------------------------|
| **Responsável Técnico** | Obrigatório (CREA) | Opcional |
| **Registro de Projeto** | ART obrigatória | Inexistente |
| **Fiscalização** | Obrigatória | Inexistente |
| **Normas Técnicas** | NBRs obrigatórias | Voluntárias (ISO, IEEE) |
| **Segurança do Trabalho** | NR-10, NR-18, etc. | Inexistente |
| **Responsabilidade Criminal** | Configura crime | Configura falha contratual |
| **Sigilo Profissional** | Regulado por lei | Contratual |

---

## 2.5.2 Implicações na Era dos LLMs

### O Abismo da Responsabilidade Ampliado

A introdução de agentes autônomos cria um "abismo de responsabilidade" (conforme discutido em [[03-principios-diretores-swebok-ai|Princípio 3]]). A **falta de regulamentação** torna este abismo ainda mais profundo:

```
┌─────────────────────────────────────────────────────────────────┐
│         ABISMO DA RESPONSABILIDADE (Com Regulamentação)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Engenheiro especifica ──▶ IA gera ──▶ Falha ocorre             │
│        │                      │              │                  │
│        │                      │              ▼                  │
│        │                      │      Quem é responsável?        │
│        │                      │                                 │
│        │                      ▼              ▼                  │
│        │              "Fiz o que fui         "Especifiquei      │
│        │               instruído a fazer"    corretamente"      │
│        │                      │              │                  │
│        └──────────────────────┴──────────────┘                  │
│                          │                                      │
│                          ▼                                      │
│              REGULAMENTAÇÃO DEFINE RESPONSÁVEL                  │
│              • CREA investiga                                   │
│              • ART identifica responsável técnico               │
│              • Conselho profissional julga                      │
│              • Sanções claras (advertência, suspensão, cassação)│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│        ABISMO DA RESPONSABILIDADE (Sem Regulamentação)          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Qualquer pessoa especifica ──▶ IA gera ──▶ Falha ocorre        │
│        │                           │              │             │
│        │                           │              ▼             │
│        │                           │      Quem é responsável?   │
│        │                           │                            │
│        │                           ▼              ▼             │
│        │                   "Fiz o que fui         "Especifiquei │
│        │                    instruído a fazer"   corretamente"  │
│        │                           │              │             │
│        └───────────────────────────┴──────────────┘             │
│                                   │                             │
│                                   ▼                             │
│              NENHUM FRAMEWORK DEFINE RESPONSÁVEL                │
│              • Não há CREA para investigar                      │
│              • Não há registro profissional                     │
│              • Responsabilidade difusa                          │
│              • Processo civil demorado e incerto                │
│              • IA como "terceiro" isento                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Riscos Específicos do Software Não-Regulado

1. **Sistemas Críticos sem Supervisão Técnica**
   - Softwares médicos, financeiros, de transporte
   - Desenvolvidos sem registro profissional obrigatório
   - Falhas podem causar mortes (ex: Therac-25, boeing 737 MAX)

2. **Agentes Autônomos sem Accountability**
   - Quem é responsável quando código gerado por IA falha?
   - Ausência de "Responsável Técnico" legalmente definido
   - Provedores de IA (OpenAI, Anthropic) se isentam de responsabilidade

3. **Externalização do Risco**
   - Empresas transferem risco para engenheiros individuais
   - Engenheiros não têm proteção de conselho profissional
   - Clientes finais não têm garantia de supervisão técnica

---

## 2.5.3 Caminhos para Profissionalização

### Modelos Possíveis de Regulamentação

#### Modelo 1: Regulamentação por Setor (Setorial)

Aplicar regulamentação específica para softwares de alta criticidade:

| Setor | Exemplos | Nível de Regulamentação |
|-------|----------|------------------------|
| Saúde | Software médico, diagnóstico por IA | Obrigatória (similar a FDA) |
| Financeiro | Sistemas bancários, trading | Obrigatória (similar a CVM/BACEN) |
| Transporte | Autopilot, controle de tráfego | Obrigatória (similar a ANAC) |
| Infraestrutura | Energia, água, telecom | Obrigatória (similar a ANEEL) |
| Consumidor | Apps, e-commerce | Voluntária/Certificação |

#### Modelo 2: Registro Profissional (CREA/Confea)

Criar conselho profissional específico para engenharia de software:

```
┌─────────────────────────────────────────────────────────────────┐
│              PROPOSTA: CONSELHO DE ENGENHARIA DE SOFTWARE         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Níveis de Registro:                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Técnico em Software (TS)                               │   │
│  │ • Curso técnico + estágio                              │   │
│  │ • Pode trabalhar sob supervisão                        │   │
│  │ • Não pode assumir responsabilidade técnica            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                      │
│                          ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Engenheiro de Software (ES)                            │   │
│  │ • Graduação + experiência                              │   │
│  │ • Pode assumir responsabilidade técnica                │   │
│  │ • ART obrigatória para sistemas críticos               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                      │
│                          ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Especialista em IA/Software (EIA)                      │   │
│  │ • Certificação adicional em sistemas com IA            │   │
│  │ • Pode supervisionar sistemas autônomos                │   │
│  │ • Responsável por verificação de código gerado         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Atribuições do Conselho:                                       │
│  • Registrar profissionais                                      │
│  • Fiscalizar exercício ilegal da profissão                     │
│  • Julgar infrações éticas                                      │
│  • Definir normas técnicas obrigatórias                         │
│  • Garantir accountability em sistemas críticos                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Modelo 3: Frameworks de Governança Corporativa

Enquanto regulamentação legal não existe, empresas podem adotar frameworks próprios:

**Framework de Accountability para Software com IA:**

| Elemento | Descrição | Implementação |
|----------|-----------|---------------|
| **Responsável Técnico Designado** | Engenheiro sênior com autoridade para aprovar/rejeitar | Designação formal em cada projeto |
| **ART Interna** | Documento de responsabilidade técnica interna | Template padronizado, assinado |
| **Checklist de Verificação** | Lista obrigatória antes de aprovar código gerado | Automatizado + revisão humana |
| **Audit Trail** | Registro completo de decisões | Logs imutáveis, versionados |
| **Seguro Profissional** | Cobertura para erros técnicos | Exigência contratual |

---

## 2.5.4 Implicações Práticas para Engenheiros

### Enquanto Não Há Regulamentação

**O que fazer HOJE:**

1. **Documente suas decisões**
   - Mantenha registro de por que aceitou/rejeitou código gerado por IA
   - Use ADRs (Architecture Decision Records)
   - Versione suas especificações de restrições

2. **Estabeleça accountability clara**
   - Defina quem é responsável técnico por cada componente
   - Crie "ARTs informais" (documentos de responsabilidade)
   - Comunique limitações aos stakeholders

3. **Adote padrões voluntários**
   - ISO/IEC 25010 (Qualidade de Software)
   - ISO/IEC 42001 (Gestão de Sistemas de IA)
   - IEEE 2857 (IA Responsável em Software)

4. **Mantenha-se atualizado**
   - Acompanhe legislações emergentes (EU AI Act, etc.)
   - Participe de discussões sobre regulamentação
   - Defenda a profissionalização da área

### Checklist de Accountability Pessoal

```markdown
□ Documentei as restrições que especifiquei para a IA?
□ Registrei por que aceitei/rejeitei cada proposta de código?
□ Verifiquei se código gerado viola alguma invariante crítica?
□ Testei casos de borda e cenários de falha?
□ Comuniquei limitações e riscos aos stakeholders?
□ Tenho registro de aprovação (humano no centro)?
□ O código tem testes adequados e rastreáveis?
□ Há fallback determinístico para falhas de IA?
```

---

## 2.5.5 O Futuro da Profissão

### Tendências e Projeções

**Curto Prazo (2025-2027):**
- Softwares críticos começam a exigir certificações voluntárias
- Frameworks de governança corporativa se tornam padrão de mercado
- Profissionais começam a se organizar em associações

**Médio Prazo (2027-2030):**
- Primeiras regulamentações setoriais (saúde, financeiro, transporte)
- Certificações profissionais em sistemas com IA se popularizam
- Empresas exigem "Engenheiro de Software Responsável" designado

**Longo Prazo (2030+):**
- Possível criação de conselho profissional (CREA de Software)
- Registro obrigatório para sistemas de alta criticidade
- Accountability legal clara para falhas em software

### O Papel do SWEBOK-AI

O SWEBOK-AI v5.0 estabelece princípios que podem fundamentar futura regulamentação:

1. **Princípio 3**: Responsabilidade humana permanece → Base para accountability
2. **Princípio 4**: Verificação é o novo gargalo → Base para competências obrigatórias
3. **Princípio 5**: Transparência não-negociável → Base para auditoria

> **Contribuição do gargalo.md**: A comparação com engenharia civil destaca a **anomalia** da falta de regulamentação e pode servir de argumento para profissionalização.

---

## Summary

- Engenharia de software é **anômala** ao não ter regulamentação comparável a outras engenharias
- Na era dos LLMs, a falta de framework de accountability é **perigosa**
- Modelos possíveis: regulamentação setorial, registro profissional, governança corporativa
- Engenheiros devem adotar **accountability pessoal** enquanto não há regulamentação
- O SWEBOK-AI fornece fundamentação para futuras regulamentações

---

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
|----------|-----------|
| **Descartabilidade Geracional** | Baixa — discussão sobre regulamentação será relevante por décadas |
| **Custo de Verificação** | Alto — ausência de regulamentação dificulta verificação de accountability |
| **Responsabilidade Legal** | Crítica — define necessidade de frameworks de governança corporativa |

---

## References

1. **gargalo.md** (2025) - Observações sobre gargalo e analogia com engenharia civil
2. **IEEE 2857-2024** - Standard for Responsible AI in Software Engineering
3. **ISO/IEC 42001:2024** - Information technology — AI management systems
4. **EU AI Act** (2024) - Regulation on Artificial Intelligence
5. **Confea/CREA** - Modelo de regulamentação profissional brasileiro
6. **IEEE Software** (2024) - "Human-AI Collaboration in Software Engineering"

---

*SWEBOK-AI v5.0 - Prática Profissional - Seção 2.5*

---
title: Checklists de Verificação - Princípio 4 (Verificação é o Novo Gargalo)
date: 2025-01-30T00:00:00Z
tags:
  - swebok-ai
  - verificacao
  - checklists
  - principio-4
  - qualidade
status: draft
created_at: '2026-01-31'
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Checklists de Verificação

## Baseados no Princípio 4: A Verificação é o Novo Gargalo

> **Referência**: \[[03-principios-diretores-swebok-ai|Princípio 4]\]
>
> > *"Quando a geração de código torna-se instantânea e barata, a atividade
> > crítica torna-se a verificação de que código gerado atende a requisitos,
> > respeita restrições, e não introduz falhas invisíveis."*

______________________________________________________________________

## 📋 Índice de Checklists

1. [Checklist de Verificação Sintática](#1-checklist-de-verificacao-sintatica)
2. [Checklist de Verificação Semântica](#2-checklist-de-verificacao-semantica)
3. [Checklist de Verificação Comportamental](#3-checklist-de-verificacao-comportamental)
4. [Checklist de Verificação Probabilística](#4-checklist-de-verificacao-probabilistica)
5. [Checklist de Verificação Formal](#5-checklist-de-verificacao-formal)
6. [Checklist de Verificação Humana](#6-checklist-de-verificacao-humana)
7. [Checklist de Governança e Accountability](#7-checklist-de-governanca-e-accountability)
8. [Checklist Consolidado de Pré-Deploy](#8-checklist-consolidado-de-pre-deploy)

______________________________________________________________________

## 1. Checklist de Verificação Sintática

**Quando usar**: Todo código gerado por IA, antes de qualquer outra verificação

**Métodos**: Análise estática, linting, style checkers

### 1.1 Estrutura e Sintaxe

- [ ] **Código compila/interpreta sem erros**

  - Verificar: Execução de análise estática básica
  - Ferramenta: Compilador, `python -m py_compile`, `tsc --noEmit`

- [ ] **Sem erros de linting**

  - Verificar: Execução de linter sem warnings críticos
  - Ferramenta: ESLint, Pylint, RuboCop, SonarQube

- [ ] **Segue convenções de nomenclatura do projeto**

  - Verificar: camelCase vs snake_case, prefixos, sufixos
  - Ferramenta: Style guides (PEP 8, Google Style)

- [ ] **Sem código morto (unreachable code)**

  - Verificar: Análise de fluxo de controle
  - Ferramenta: vulture, coverage.py

- [ ] **Sem imports não utilizados**

  - Verificar: Análise de dependências
  - Ferramenta: autoflake, ESLint (no-unused-vars)

### 1.2 Padrões Proibidos (Automatizáveis)

- [ ] **Não usa `eval()` ou equivalentes**

  - Risco: Injeção de código
  - Verificação: `grep -r "eval(" src/`

- [ ] **Não usa `exec()` ou `compile()`**

  - Risco: Execução de código arbitrário

- [ ] **Não expõe senhas ou segredos em código**

  - Risco: Vazamento de credenciais
  - Ferramenta: git-secrets, detect-secrets

- [ ] **Não usa SQL concatenado (SQL injection)**

  - Verificação: Buscar por `.format()`, `+` em queries SQL
  - Ferramenta: Bandit (Python), SQLMap

- [ ] **Não usa `float` para cálculos monetários**

  - Risco: Erros de arredondamento
  - Verificação: Buscar por operações financeiras com float

### 1.3 Documentação

- [ ] **Funções/métodos têm docstrings**

  - Critério: 100% de funções públicas documentadas

- [ ] **Tipos estão anotados (quando aplicável)**

  - Ferramenta: mypy, TypeScript compiler

- [ ] **Parâmetros e retornos documentados**

  - Formato: Google Style, NumPy Style, ou JSDoc

______________________________________________________________________

## 2. Checklist de Verificação Semântica

**Quando usar**: Componentes determinísticos, lógica de negócio

**Métodos**: Testes unitários, property-based testing, análise de fluxo de dados

### 2.1 Testes Unitários

- [ ] **Toda função pública tem teste unitário**

  - Critério: Cobertura > 80% (ideal > 90%)
  - Ferramenta: pytest, Jest, JUnit

- [ ] **Testes cobrem casos de borda**

  - Verificar: Valores nulos, vazios, limites, extremos

- [ ] **Testes cobrem cenários de erro**

  - Verificar: Exceções, inputs inválidos, falhas de rede

- [ ] **Testes são independentes e determinísticos**

  - Verificar: Não dependem de estado externo, não usam random sem seed

### 2.2 Property-Based Testing

- [ ] **Invariáveis testadas com geração automática de casos**

  - Exemplo: "Para qualquer input X, função Y sempre retorna Z"
  - Ferramenta: Hypothesis (Python), fast-check (JS), QuickCheck

- [ ] **Propriedades de idempotência verificadas**

  - Exemplo: `f(f(x)) == f(x)`

- [ ] **Propriedades de simetria verificadas**

  - Exemplo: `encode(decode(x)) == x`

### 2.3 Análise de Fluxo de Dados

- [ ] **Todas as variáveis são inicializadas antes do uso**

  - Ferramenta: Análise estática avançada

- [ ] **Não há vazamento de recursos (arquivos, conexões)**

  - Verificar: Uso de `with`, `try-finally`, `defer`

- [ ] **Validação de inputs em todas as fronteiras**

  - Verificar: Schemas, type guards, validação explícita

______________________________________________________________________

## 3. Checklist de Verificação Comportamental

**Quando usar**: Fluxos completos, integrações, APIs

**Métodos**: Testes de integração, E2E, testes de contrato

### 3.1 Testes de Integração

- [ ] **Integrações com serviços externos testadas**

  - Verificar: Mock de APIs, testes de contrato
  - Ferramenta: WireMock, Mountebank, Pact

- [ ] **Banco de dados integrado corretamente**

  - Verificar: Transações, rollback, migrações
  - Ferramenta: Testcontainers

- [ ] **Fila/mensageria funciona corretamente**

  - Verificar: Ordem, duplicidade, perda de mensagens

### 3.2 Testes End-to-End (E2E)

- [ ] **Fluxos críticos de usuário testados**

  - Critério: Happy path + principais caminhos alternativos
  - Ferramenta: Cypress, Playwright, Selenium

- [ ] **Testes E2E são determinísticos**

  - Verificar: Não dependem de timing, dados consistentes

- [ ] **Tempo de execução é aceitável**

  - Critério: Suite completa < 10 minutos (ideal < 5)

### 3.3 Testes de Contrato

- [ ] **APIs seguem contrato definido (OpenAPI/GraphQL)**

  - Ferramenta: Schemathesis, Dredd, Postman

- [ ] **Schema de entrada validado rigorosamente**

  - Verificar: Campos obrigatórios, tipos, ranges

- [ ] **Schema de saída garantido**

  - Verificar: Contratos de resposta, versionamento

______________________________________________________________________

## 4. Checklist de Verificação Probabilística

**Quando usar**: Componentes de IA, comportamento não-determinístico

**Métodos**: Testes estatísticos, amostragem, métricas de confiança

### 4.1 Avaliação Estatística

- [ ] **Distribuição de saídas analisada**

  - Verificar: Não há viés sistemático, outliers aceitáveis
  - Ferramenta: Testes de hipótese, análise de variância

- [ ] **Intervalo de confiança aceitável**

  - Critério: 95% CI dentro de limites definidos

- [ ] **Teste com múltiplas seeds/inputs**

  - Critério: N > 100 execuções por cenário

### 4.2 Métricas de Qualidade de IA

- [ ] **Score de confiança dentro do threshold**

  - Critério: Confiança > 0.8 para operações críticas

- [ ] **Taxa de acerto (accuracy) aceitável**

  - Definir: Baseline mínimo aceitável para o domínio

- [ ] **Falsos positivos/negativos medidos**

  - Critério: FPR < 5%, FNR < 2% (ajustar por domínio)

### 4.3 Robustez

- [ ] **Comportamento com inputs adversariais testado**

  - Verificar: Prompt injection, edge cases, inputs malformados

- [ ] **Degradação graciosa em falhas**

  - Verificar: Fallbacks funcionam, sistema não quebra

- [ ] **Latência dentro do SLA**

  - Critério: P95 < threshold definido

______________________________________________________________________

## 5. Checklist de Verificação Formal

**Quando usar**: Algoritmos críticos, sistemas de segurança, protocolos

**Métodos**: Model checking, prova de teoremas, análise formal

### 5.1 Especificação Formal

- [ ] **Comportamento formalmente especificado**

  - Notação: TLA+, Alloy, Z Notation, Coq

- [ ] **Pré-condições e pós-condições definidas**

  - Formato: Design by Contract, Hoare logic

- [ ] **Invariantes de sistema documentados**

  - Exemplo: "Soma de créditos - débitos = saldo, sempre"

### 5.2 Verificação Formal

- [ ] **Model checking executado sem violações**

  - Ferramenta: TLA+ Toolbox, SPIN, CBMC

- [ ] **Prova de correção parcial (quando aplicável)**

  - Ferramenta: Coq, Isabelle, Lean

- [ ] **Análise de deadlock/livelock realizada**

  - Verificar: Sistema é livre de deadlocks

### 5.3 Análise de Segurança

- [ ] **Análise de vulnerabilidades realizada**

  - Ferramenta: OWASP Dependency Check, Snyk

- [ ] **Penetration testing executado (para sistemas críticos)**

  - Frequência: Antes de releases maiores

- [ ] **Threat modeling atualizado**

  - Metodologia: STRIDE, OWASP Threat Dragon

______________________________________________________________________

## 6. Checklist de Verificação Humana

**Quando usar**: Decisões arquiteturais, código de alta criticidade, revisões
finais

**Métodos**: Code review estruturado, revisão por pares, aprovação explícita

### 6.1 Code Review Estruturado

- [ ] **Revisor diferente do autor da especificação**

  - Critério: 4-eyes principle

- [ ] **Revisor entende o contexto e restrições**

  - Verificar: Revisor leu ADRs, contexto documentado

- [ ] **Checklist de review foi seguido**

  - Template: Usar este documento como base

- [ ] **Comentários foram resolvidos**

  - Critério: Zero comentários não-resolvidos antes do merge

### 6.2 Critérios de Avaliação Humana

- [ ] **Código é "legível" para humanos**

  - Verificar: Nomes claros, funções curtas (< 50 linhas), sem magic numbers

- [ ] **Lógica é "plausível"**

  - Verificar: Não contém erros sutis (off-by-one, race conditions)

- [ ] **Design é consistente com o sistema**

  - Verificar: Segue padrões existentes, não reinventa

- [ ] **Trade-offs foram considerados**

  - Verificar: Performance vs. manutenibilidade, complexidade vs. funcionalidade

### 6.3 Aprovação e Accountability

- [ ] **Responsável técnico identificado e registrado**

  - Documento: ADR, Decision Log, ou commit message

- [ ] **Aprovação explícita registrada**

  - Formato: PR aprovado, assinatura em documento

- [ ] **Racional documentado para decisões não-óbvias**

  - Exemplo: "Escolhi X ao invés de Y porque..."

______________________________________________________________________

## 7. Checklist de Governança e Accountability

**Quando usar**: Todo código gerado por IA antes de ir para produção

### 7.1 Rastreabilidade

- [ ] **Prompt original está versionado**

  - Local: Repositório de prompts, ADR

- [ ] **Contexto fornecido à IA está documentado**

  - Verificar: Restrições especificadas, exemplos dados

- [ ] **Versão do modelo de IA está registrada**

  - Exemplo: "Gerado por GPT-4 em 2025-01-30"

### 7.2 Audit Trail

- [ ] **Todas as decisões de curadoria estão logadas**

  - Conteúdo: Quem aprovou, quando, por quê

- [ ] **Iterações de geração estão registradas**

  - Verificar: Tentativas, rejeições, refinamentos

- [ ] **Fallbacks e exceções estão documentados**

  - Exemplo: "Usado fallback determinístico porque IA retornou baixa confiança"

### 7.3 Compliance

- [ ] **Código respeita políticas organizacionais**

  - Verificar: Licenças, normas internas, guidelines

- [ ] **Dados sensíveis não foram expostos à IA**

  - Verificar: Sanitização de PII, dados de produção

- [ ] **Conformidade com regulamentações verificada**

  - Quando aplicável: GDPR, LGPD, SOX, HIPAA

______________________________________________________________________

## 8. Checklist Consolidado de Pré-Deploy

**Quando usar**: Antes de qualquer deploy em produção

### 8.1 Verificações Obrigatórias

- [ ] **Todas as verificações sintáticas passaram** (Seção 1)
- [ ] **Testes unitários passaram** (Seção 2.1)
  - Critério: 100% dos testes, cobertura > 80%
- [ ] **Testes de integração passaram** (Seção 3.1)
- [ ] **Code review foi aprovado** (Seção 6)
- [ ] **Não há violações de segurança críticas** (Seção 5.3)
- [ ] **Documentação está atualizada** (Seção 1.3)
- [ ] **Accountability está estabelecida** (Seção 7)

### 8.2 Verificações Condicionais

- [ ] **Se componente de IA**: Verificação probabilística completa (Seção 4)
- [ ] **Se algoritmo crítico**: Verificação formal executada (Seção 5)
- [ ] **Se API pública**: Testes de contrato validados (Seção 3.3)
- [ ] **Se fluxo E2E crítico**: Testes E2E passaram (Seção 3.2)

### 8.3 Sign-off Final

- [ ] **Responsável técnico aprovou explicitamente**

  - Registro: PR aprovado, documento assinado

- [ ] **Não há TODOs ou FIXMEs críticos**

  - Ferramenta: grep -r "TODO|FIXME" --include="\*.py"

- [ ] **Rollback plan está definido**

  - Verificar: Feature flags, migrações reversíveis

- [ ] **Monitoramento e alertas configurados**

  - Verificar: Dashboards, thresholds, runbooks

______________________________________________________________________

## 📊 Matriz de Tipo de Verificação por Contexto

| Contexto                           | Sintática      | Semântica      | Comportamental | Probabilística | Formal         | Humana         |
| ---------------------------------- | -------------- | -------------- | -------------- | -------------- | -------------- | -------------- |
| **Código tradicional**             | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ❌ N/A         | ⚠️ Opcional    | ✅ Obrigatório |
| **Código gerado por IA (simples)** | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ❌ N/A         | ❌ N/A         | ✅ Obrigatório |
| **Código gerado por IA (crítico)** | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ⚠️ Opcional    | ⚠️ Opcional    | ✅ Obrigatório |
| **Componente de IA**               | ✅ Obrigatório | ⚠️ Limitado    | ✅ Obrigatório | ✅ Obrigatório | ❌ N/A         | ✅ Obrigatório |
| **Algoritmo crítico**              | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ⚠️ Opcional    | ✅ Obrigatório | ✅ Obrigatório |
| **Sistema financeiro**             | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ⚠️ Opcional    | ✅ Obrigatório | ✅ Obrigatório |
| **Sistema de saúde**               | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório | ✅ Obrigatório |

**Legenda:**

- ✅ Obrigatório = Deve ser executado
- ⚠️ Opcional = Recomendado, depende de contexto
- ❌ N/A = Não aplicável

______________________________________________________________________

## 🎯 Métricas de Efetividade

### Indicadores de Qualidade da Verificação

| Métrica                       | Meta       | Mínimo Aceitável |
| ----------------------------- | ---------- | ---------------- |
| Cobertura de testes unitários | 90%        | 80%              |
| Taxa de passagem de CI        | 100%       | 95%              |
| Vulnerabilidades de segurança | 0 críticas | 0 altas          |
| Tempo médio de revisão        | < 30 min   | < 60 min         |
| Taxa de bugs em produção      | < 2%       | < 5%             |
| Débito técnico                | Baixo      | Médio            |

______________________________________________________________________

## 📚 Referências

1. \[\[03-principios-diretores-swebok-ai|Princípio 4: Verificação é o Novo
   Gargalo\]\]
2. \[\[05-software-testing/01-fundamentos-verificacao-sistemas-ia.md|Fundamentos
   de Verificação de Sistemas IA\]\]
3. \[\[05-software-testing/02-tecnicas-teste-codigo-gerado.md|Técnicas de Teste
   para Código Gerado\]\]
4. \[\[02-software-architecture/09-curadoria-arquitetural.md|Curadoria
   Arquitetural\]\]
5. \[[03-software-design/05-curadoria-design.md|Curadoria de Design]\]

### Standards e Frameworks

- **ISO/IEC 25010** - Quality models for software
- **ISO/IEC 42001** - AI management systems
- **OWASP ASVS** - Application Security Verification Standard
- **NIST AI RMF** - AI Risk Management Framework

______________________________________________________________________

## 🔄 Ciclo de Vida da Verificação

```
┌─────────────────────────────────────────────────────────────────┐
│                    CICLO DE VERIFICAÇÃO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Geração ──▶ Verificação Sintática ──▶ Verificação Semântica  │
│      │              │ (Automática)          │ (Automática)      │
│      │              ▼                       ▼                   │
│      │         [Falha?] ──sim──▶ Feedback   [Falha?] ──sim──▶   │
│      │              │                      │  Rejeição         │
│      │              não                    │                    │
│      │              │                      não                 │
│      │              ▼                       ▼                   │
│      │      Verificação Comport. ──▶ Verificação Humana        │
│      │              │ (Automática)          │ (Obrigatória)     │
│      │              ▼                       ▼                   │
│      │         [Falha?] ──sim──▶ Retrabalho [Falha?] ──sim──▶  │
│      │              │                      │  Rejeição         │
│      │              não                    │                    │
│      │              │                      não                 │
│      │              └──────────┬───────────┘                   │
│      │                         ▼                               │
│      │              Verificação Prob./Formal                   │
│      │              (Condicional)                              │
│      │                         │                               │
│      │                         ▼                               │
│      │              Governança e Accountability                │
│      │                         │                               │
│      │                         ▼                               │
│      └─────────────────▶  DEPLOY AUTORIZADO                     │
│                                                                 │
│   ◄────── Investimento em Verificação > Investimento em Geração│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

______________________________________________________________________

**Versão**: 1.0\
**Última atualização**: 2025-01-30\
**Status**: Draft - Aguardando validação

______________________________________________________________________

*SWEBOK-AI v5.0 - Checklists de Verificação*

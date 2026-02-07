---
title: Checklists e Templates para Design com IA
created_at: 2026-02-07
tags: [software-design, checklist, templates, ferramentas, praticas]
status: draft
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 10. Checklists e Templates para Design com IA

Este capítulo fornece ferramentas práticas para aplicação dos conceitos
apresentados ao longo deste KA. Checklists e templates servem como guias
operacionais, garantindo que considerações críticas não sejam negligenciadas
durante o design de sistemas com IA.

## 10.1 Checklist de Design para Sistemas com IA

### Checklist Arquitetural

#### Casos de Uso e Modelagem

- [ ] **Definição clara de casos de uso adequados para LLM**

  - [ ] Identificado onde IA agrega valor real vs. onde regras tradicionais são
    suficientes
  - [ ] Avaliado trade-off custo-benefício de uso de IA
  - [ ] Definido escopo claro do que o sistema deve e não deve fazer

- [ ] **Modelo apropriado selecionado**

  - [ ] Avaliado requisitos de qualidade vs. latência vs. custo
  - [ ] Definido modelo primário e modelo(s) de fallback
  - [ ] Documentado racional da escolha do modelo

- [ ] **Estratégia de fallback definida**

  - [ ] Identificado comportamento quando IA falha
  - [ ] Implementado degradação graceful (níveis de fallback)
  - [ ] Testado cenários de falha

- [ ] **Padrões de resiliência implementados**

  - [ ] Circuit breaker configurado
  - [ ] Retry com exponential backoff implementado
  - [ ] Rate limiting e throttling configurados
  - [ ] Timeout adequados definidos

- [ ] **Arquitetura de observabilidade planejada**

  - [ ] Métricas de qualidade definidas (acurácia, relevance, etc.)
  - [ ] Logging de inputs e outputs estruturado
  - [ ] Rastreabilidade de decisões implementada
  - [ ] Alertas para anomalias configurados

### Checklist de Context Engineering

- [ ] **Pipeline de contexto documentado**

  - [ ] Fontes de contexto identificadas e priorizadas
  - [ ] Estratégia de chunking definida
  - [ ] Processo de embedding documentado
  - [ ] Fluxo de contexto diagramado

- [ ] **Estratégia de RAG definida (se aplicável)**

  - [ ] Base de conhecimento preparada e indexada
  - [ ] Estratégia de retrieval selecionada (semantic, keyword, hybrid)
  - [ ] Reranking configurado se necessário
  - [ ] Mecanismo de atualização da base definido

- [ ] **Gerenciamento de memória implementado**

  - [ ] Memória de curto prazo (sessão) configurada
  - [ ] Memória de longo prazo (persistente) definida
  - [ ] Estratégia de compressão de histórico implementada
  - [ ] Limpeza automática de memória antiga configurada

- [ ] **Limites de janela de contexto considerados**

  - [ ] Calculado uso típico de tokens por requisição
  - [ ] Definido limite máximo seguro (buffer para variação)
  - [ ] Implementado truncamento ou sumarização quando necessário
  - [ ] Testado comportamento em contextos longos

### Checklist de Qualidade

- [ ] **Critérios de avaliação do modelo definidos**

  - [ ] Métricas quantitativas estabelecidas (acurácia, F1, BLEU, etc.)
  - [ ] Critérios qualitativos documentados
  - [ ] Thresholds de aceitação definidos
  - [ ] Processo de avaliação automatizado onde possível

- [ ] **Processo de revisão humana estabelecido**

  - [ ] Definido o que requer revisão obrigatória
  - [ ] Estabelecido fluxo de aprovação
  - [ ] Treinado time de revisão
  - [ ] Documentado guia de revisão

- [ ] **Testes de regressão para código gerado**

  - [ ] Suite de testes automatizados
  - [ ] Testes de integração com componentes de IA
  - [ ] Testes de carga e performance
  - [ ] Validação de contratos de API

- [ ] **Documentação de decisões de design**

  - [ ] ADRs (Architecture Decision Records) criados
  - [ ] Prompts versionados e documentados
  - [ ] Racional de escolhas arquiteturais registrado
  - [ ] Trade-offs considerados explicitados

### Checklist de Governança

- [ ] **Avaliação de riscos de segurança**

  - [ ] Análise de vulnerabilidades a prompt injection
  - [ ] Proteção contra data leakage
  - [ ] Sanitização de inputs implementada
  - [ ] Guardrails de output configurados

- [ ] **Considerações de privacidade endereçadas**

  - [ ] Dados PII identificados e tratados
  - [ ] Consentimento para uso de dados documentado
  - [ ] Anonimização implementada onde necessário
  - [ ] Compliance com LGPD/GDPR verificado

- [ ] **Monitoramento de custos implementado**

  - [ ] Budget mensal definido
  - [ ] Alertas de custo configurados
  - [ ] Otimizações de tokens implementadas
  - [ ] Cache configurado para queries frequentes

- [ ] **Guidelines de uso ético definidos**

  - [ ] Política de uso de IA documentada
  - [ ] Considerações de viés avaliadas
  - [ ] Mecanismos de transparência implementados
  - [ ] Processo de reporte de problemas éticos estabelecido

## 10.2 Template de Documentação de Componente com IA

Este template padroniza a documentação de componentes que utilizam IA:

````markdown
# Componente com IA: [Nome do Componente]

## 1. Visão Geral

### Propósito
[Descreva claramente o que o componente faz e por que utiliza IA.
Explique o problema que resolve e o valor agregado pela IA.]

### Escopo
- **Faz:** [Lista de funcionalidades]
- **Não faz:** [Limitações explícitas]

## 2. Modelo e Configuração

### Modelo Utilizado
- **Nome/versão:** [ex: GPT-4-turbo-2024-04-09]
- **Provedor:** [OpenAI, Anthropic, Local, etc.]
- **Temperatura:** [0.0 - 2.0]
- **Max tokens:** [Limite de tokens de saída]
- **Top-p:** [Se aplicável]

### Racional da Escolha
[Explique por que este modelo foi escolhido sobre alternativas.
Inclua considerações de qualidade, custo, latência e capacidades.]

## 3. Contexto e Entradas

### System Prompt
```text
[Cole o system prompt completo aqui]
````

### Fontes de Contexto

| Fonte  | Tipo                     | Prioridade         | Descrição   |
| ------ | ------------------------ | ------------------ | ----------- |
| [Nome] | [System/User/RAG/Memory] | [Alta/Média/Baixa] | [Descrição] |

### Janela de Contexto Estimada

- **Média:** [X tokens]
- **Pico:** [Y tokens]
- **Limite máximo configurado:** [Z tokens]

### Inputs

```json
{
  "schema": "Descreva o schema de entrada esperado",
  "example": {
    "campo1": "exemplo",
    "campo2": 123
  },
  "validations": [
    "campo1: obrigatório, string, max 500 chars",
    "campo2: opcional, integer, 0-100"
  ]
}
```

## 4. Processamento

### Pipeline

```
[Diagrama ou descrição textual do fluxo de processamento]

Exemplo:
Input → Validação → Enriquecimento Contexto → LLM →
Validação Output → Formatação → Resposta
```

### Ferramentas Disponíveis (se aplicável)

| Ferramenta | Descrição   | Quando Usada |
| ---------- | ----------- | ------------ |
| [nome]     | [descrição] | [condição]   |

## 5. Outputs

### Schema de Saída

```json
{
  "schema": "Descreva o schema de saída",
  "example": {
    "resultado": "texto gerado",
    "confiança": 0.95,
    "metadados": {}
  }
}
```

### Formatos Suportados

- [ ] Texto puro
- [ ] JSON estruturado
- [ ] Markdown
- [ ] Outro: [especificar]

## 6. Resiliência e Fallbacks

### Estratégia de Fallback

**Nível 1 (Primário):** [Descrição do comportamento normal]

**Nível 2 (Se primário falha):** [Descrição do fallback]

**Nível 3 (Degradação graceful):** [Descrição do último recurso]

**Nível 4 (Falha total):** [Comportamento quando tudo falha]

### Tratamento de Erros

| Tipo de Erro     | Comportamento | Retentativas |
| ---------------- | ------------- | ------------ |
| Timeout          | [descrever]   | [número]     |
| Rate Limit       | [descrever]   | [número]     |
| Invalid Output   | [descrever]   | [número]     |
| Context Overflow | [descrever]   | [número]     |

## 7. Avaliação e Métricas

### Métricas Monitoradas

| Métrica            | Threshold Aceitável | Alerta  |
| ------------------ | ------------------- | ------- |
| Acurácia           | > 90%               | < 85%   |
| Latência P95       | < 500ms             | > 1s    |
| Taxa de erro       | < 2%                | > 5%    |
| Custo/1k calls     | < $0.50             | > $0.75 |
| Satisfação usuário | > 4.0/5             | < 3.5/5 |

### Processo de Avaliação

[Descreva como o componente é avaliado: frequência, metodologia, responsáveis]

### Dataset de Teste

- **Localização:** [path ou link]
- **Tamanho:** [número de casos]
- **Cobertura:** [tipos de cenários cobertos]

## 8. Considerações de Design

### Trade-offs Considerados

1. **\[Trade-off\]:** [Descrição]

   - **Decisão:** [O que foi escolhido]
   - **Racional:** [Por que]

2. **\[Trade-off\]:** [Descrição]

   - **Decisão:** [O que foi escolhido]
   - **Racional:** [Por que]

### Decisões Específicas

[Documente decisões de design importantes não cobertas em ADRs gerais]

### Limitações Conhecidas

1. [Limitação 1 e impacto]
2. [Limitação 2 e impacto]

## 9. Segurança e Privacidade

### Classificação de Dados

- [ ] Não processa dados sensíveis
- [ ] Processa dados sensíveis com anonimização
- [ ] Processa dados sensíveis (requer tratamento especial)

### Medidas de Segurança

- [ ] Input sanitization implementado
- [ ] Output filtering configurado
- [ ] Rate limiting por usuário
- [ ] Auditoria de acessos habilitada

### Conformidade

- [ ] LGPD/GDPR: [status]
- [ ] Políticas internas: [status]

## 10. Operação e Manutenção

### Monitoramento

- **Dashboard:** [link]
- **Alertas configurados:** [lista]
- **Runbooks:** [links]

### Atualizações

- **Frequência de revisão de prompt:** [mensal/quarterly/sob demanda]
- **Processo de atualização de modelo:** [descrever]
- **Testes de regressão:** [como são executados]

### Contatos

- **Owner técnico:** [nome/email]
- **Time responsável:** [nome do time]
- **Escalation:** [para quem escalar]

## 11. Histórico de Mudanças

| Versão | Data   | Autor  | Mudanças       |
| ------ | ------ | ------ | -------------- |
| 1.0.0  | [data] | [nome] | Versão inicial |
| 1.1.0  | [data] | [nome] | [descrição]    |

````

## 10.3 Checklist de Revisão de Código Gerado por IA

Use este checklist ao revisar código gerado automaticamente:

### Estrutura e Organização
- [ ] Código segue padrões do projeto (estilo, nomenclatura)
- [ ] Responsabilidades claras e bem separadas (SRP)
- [ ] Não há duplicação desnecessária (DRY)
- [ ] Abstrações apropriadas (nem excessivas, nem insuficientes)

### Qualidade e Robustez
- [ ] Tratamento de erros implementado
- [ ] Validação de inputs presente
- [ ] Edge cases considerados (null, empty, max values)
- [ ] Logs adequados para debugging
- [ ] Sem hardcoding de valores sensíveis

### Performance
- [ ] Não há N+1 queries
- [ ] Algoritmos com complexidade adequada
- [ ] Uso eficiente de memória
- [ ] Considerações de concorrência se aplicável

### Segurança
- [ ] Sem vulnerabilidades óbvias (SQL injection, XSS)
- [ ] Validação de permissões
- [ ] Sanitização de inputs externos
- [ ] Não expõe informações sensíveis em logs

### Testabilidade
- [ ] Código é testável (dependências injetáveis)
- [ ] Testes de unidade cobrem casos principais
- [ ] Testes de integração para fluxos críticos
- [ ] Mocks/stubs apropriados para dependências

### Documentação
- [ ] Código auto-explicativo (nomes claros)
- [ ] Comentários explicam o "porquê", não o "o quê"
- [ ] Documentação de API atualizada
- [ ] Exemplos de uso incluídos

## 10.4 Template de Avaliação de Modelo

```markdown
# Avaliação de Modelo: [Nome do Modelo]

## Informações Gerais
- **Data da avaliação:** [data]
- **Avaliador:** [nome]
- **Versão do modelo:** [versão]
- **Caso de uso:** [descrição]

## Critérios de Avaliação

### 1. Qualidade de Output
**Peso:** 30%

| Aspecto | Nota (1-10) | Comentários |
|---------|-------------|-------------|
| Acurácia factual | | |
| Relevância | | |
| Coerência | | |
| Completude | | |
| **Média** | | |

### 2. Performance
**Peso:** 25%

| Aspecto | Valor | Threshold | Status |
|---------|-------|-----------|--------|
| Latência P50 | | | |
| Latência P95 | | | |
| Latência P99 | | | |
| Throughput | | | |
| **Avaliação** | | | |

### 3. Custo
**Peso:** 25%

| Aspecto | Valor | Budget | Status |
|---------|-------|--------|--------|
| Custo/1k input tokens | | | |
| Custo/1k output tokens | | | |
| Custo estimado mensal | | | |
| **Avaliação** | | | |

### 4. Capacidades Específicas
**Peso:** 20%

| Capacidade | Necessário | Avaliação | Nota |
|------------|------------|-----------|------|
| Raciocínio | [Sim/Não] | | |
| Geração de código | [Sim/Não] | | |
| Segurança/harmless | [Sim/Não] | | |
| Multimodal | [Sim/Não] | | |
| **Média** | | | |

## Score Total

````

Score = (Qualidade × 0.30) + (Performance × 0.25) + (Custo × 0.25) +
(Capacidades × 0.20)

```

**Score Calculado:** [X.XX]/10

## Comparação com Alternativas

| Modelo | Score | Qualidade | Custo | Latência |
|--------|-------|-----------|-------|----------|
| [Modelo atual] | | | | |
| [Alternativa 1] | | | | |
| [Alternativa 2] | | | | |

## Recomendação

- [ ] **Aprovado** para uso em produção
- [ ] **Aprovado com ressalvas:** [descrever]
- [ ] **Reprovado** - usar alternativa: [qual]

## Próximos Passos
- [ ] [Ação 1]
- [ ] [Ação 2]
```

## 10.5 Síntese: Da Teoria à Prática

Estes checklists e templates traduzem os conceitos discutidos ao longo deste KA
em ferramentas acionáveis. Eles servem como:

- **Guardrails:** Prevenindo esquecimentos críticos
- **Padronização:** Garantindo consistência entre projetos
- **Onboarding:** Acelerando a entrada de novos membros
- **Governança:** Documentando processos e decisões
- **Melhoria contínua:** Base para revisões e retrospectivas

Recomenda-se adaptar estes templates às necessidades específicas de cada
organização, mantendo-os vivos através de revisões periódicas que incorporem
aprendizados e evoluções da disciplina.

!!! tip "Personalização" Use estes templates como ponto de partida, não como
prescrições rígidas. Adapte-os ao contexto tecnológico, cultural e de negócio da
sua organização.

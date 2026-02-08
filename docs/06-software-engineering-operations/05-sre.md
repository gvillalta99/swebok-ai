---
title: 'Seção 5: Site Reliability Engineering'
created_at: 2025-02-07
tags: [sre, reliability, slo, sli, error-budget, toil, google-sre]
status: draft
updated_at: 2025-02-07
ai_model: Claude
---

# Seção 5: Site Reliability Engineering

Site Reliability Engineering (SRE) é uma disciplina que aplica princípios de
engenharia de software à infraestrutura e operações. Criada no Google em 2003
por Ben Treynor Sloss, a SRE define metas de confiabilidade quantificáveis e usa
software para alcançá-las. Em 2024-2025, a SRE evolui para incorporar IA na
predição e prevenção de falhas.

## Objetivos de Aprendizagem

Ao final desta seção, você será capaz de:

1. Definir SLIs, SLOs e SLAs apropriados para diferentes serviços
2. Calcular e gerenciar error budgets
3. Identificar e eliminar toil (trabalho operacional manual)
4. Projetar sistemas de monitoramento proativo
5. Aplicar IA na análise de confiabilidade

## Conceitos Fundamentais

### Os Três Pilares da Confiabilidade

**1. Service Level Indicators (SLIs)**

Métricas quantitativas que medem comportamento do serviço:

```
SLI = (Eventos Bons / Eventos Totais) × 100

Exemplos:
- Availability: (requisições bem-sucedidas / requisições totais)
- Latency: percentil 99 de tempo de resposta
- Error Rate: percentual de requisições com erro 5xx
- Throughput: requisições por segundo
```

**2. Service Level Objectives (SLOs)**

Metas de confiabilidade acordadas:

```
SLO = Target SLI + Janela de Tempo

Exemplo:
"99.9% de disponibilidade em uma janela de 30 dias"

Isso permite:
- 43.8 minutos de downtime por mês
- 8.76 horas por ano
```

**3. Service Level Agreements (SLAs)**

Compromissos contratuais com consequências financeiras:

```
SLA = SLO + Penalidades

Exemplo:
"99.95% de disponibilidade ou reembolso de 10% da mensalidade"
```

### Error Budget

O error budget é a diferença entre 100% e o SLO. Representa o quanto você pode
"falhar" sem violar o objetivo.

```
Error Budget = 100% - SLO

Para SLO de 99.9%:
- Error Budget = 0.1%
- Em 1 milhão de requisições: 1.000 podem falhar
```

**Princípio fundamental:** O error budget é um orçamento a ser gasto, não
poupado. Ele incentiva:

- Inovação controlada (novos features podem usar parte do budget)
- Trade-offs explícitos entre velocidade e confiabilidade
- Decisões baseadas em dados

### Eliminação de Toil

Toil é trabalho manual repetitivo que não agrega valor diferenciado:

| Característica      | Exemplo de Toil          | Solução                  |
| ------------------- | ------------------------ | ------------------------ |
| Repetitivo          | Escalar VMs manualmente  | Autoscaling              |
| Automatizável       | Rotacionar credenciais   | Vault automation         |
| Sem valor duradouro | Responder alertas falsos | Correlação inteligente   |
| Cresce linearmente  | Onboarding de serviços   | Templates e self-service |

**Meta SRE:** Cada engenheiro deve gastar no máximo 50% do tempo em operações
(toil + on-call), e pelo menos 50% em projetos de engenharia (automação,
melhorias).

## Na Era dos LLMs

### SRE com IA Generativa

A pesquisa da Rootly (2025) indica que a IA está transformando SRE de reativa
para proativa:

**Transformações Fundamentais:**

| Aspecto           | Antes (2023)           | Agora (2025)               |
| ----------------- | ---------------------- | -------------------------- |
| Abordagem         | Reativa (firefighting) | Proativa (prevenção)       |
| Tomada de decisão | Baseada em regras      | Baseada em ML/IA           |
| Escalação         | Manual para humanos    | Automatizada com aprovação |
| Documentação      | Runbooks estáticos     | Assistência conversacional |

### Ferramentas de SRE com IA (2025)

**1. PagerDuty with AI**

- Correlação inteligente de alertas
- Supressão de ruído em 60-80%
- Roteamento automático baseado em contexto

**2. Datadog Watchdog**

- Detecção automática de anomalias
- RCA assistida por IA
- Integração com traces e logs

**3. New Relic AI**

- Análise de causa raiz automatizada
- Correlação entre serviços
- Recomendações de remediação

**4. Dynatrace Davis**

- IA determinística (não apenas ML probabilístico)
- Causalidade exata de problemas
- Predição de falhas antes do impacto

**5. Rootly AI**

- Automação de gestão de incidentes
- Geração automática de post-mortems
- Runbooks dinâmicos baseados em contexto

### Predição de Falhas com LLMs

Pesquisas da Microsoft Research (2024) demonstraram que LLMs para RCA alcançam
**76,6% de acurácia** em incidentes reais:

```
Arquitetura de RCA com LLMs:

Incidente → Coleta de Dados (logs, métricas, traces)
    → Enriquecimento de Contexto (topologia, histórico)
    → Análise por LLM (pattern matching, causalidade)
    → Identificação da Causa Raiz
    → Recomendações de Resolução
```

**Limitações atuais:**

- Contexto limitado (janela de atenção do LLM)
- Dependência de qualidade dos dados de telemetria
- Custo computacional elevado para análise em tempo real
- Erros conceituais sutis que requerem validação humana

## Práticas e Ferramentas

### Framework SRE de Implementação

**Semana 1-2: Fundação**

- Identificar serviços críticos
- Definir SLIs iniciais
- Estabelecer baseline de confiabilidade

**Semana 3-4: SLOs**

- Negociar SLOs com stakeholders
- Calcular error budgets
- Criar dashboards de SLOs

**Semana 5-8: Automação**

- Mapear e priorizar toil
- Implementar automações de maior impacto
- Documentar runbooks

**Semana 9-12: IA e Proatividade**

- Implementar detecção de anomalias
- Configurar RCA automatizado
- Estabelecer feedback loops

### Calculando SLIs Apropriados

**Para serviço web:**

```python
# Exemplo de cálculo de SLI de disponibilidade

def calcular_sli_disponibilidade(requisicoes_bem_sucedidas, total_requisicoes):
    """
    SLI de disponibilidade = requisições HTTP 2xx/3xx / total de requisições
    """
    return (requisicoes_bem_sucedidas / total_requisicoes) * 100

# Dados de exemplo
requisicoes_2xx = 998500
requisicoes_5xx = 1500
total = 1000000

sli = calcular_sli_disponibilidade(requisicoes_2xx, total)
print(f"SLI de Disponibilidade: {sli:.3f}%")  # 99.850%
```

**Para serviço de fila:**

```python
def calcular_sli_latencia_fila(mensagens_no_prazo, total_mensagens):
    """
    SLI de latência = mensagens processadas dentro do SLA / total
    """
    return (mensagens_no_prazo / total_mensagens) * 100

# Se SLO é processar em 5 minutos
mensagens_no_prazo = 99500
total_mensagens = 100000

sli = calcular_sli_latencia_fila(mensagens_no_prazo, total_mensagens)
print(f"SLI de Latência: {sli:.2f}%")  # 99.50%
```

### Gerenciando Error Budgets

**Política de Error Budget:**

```
Se error budget > 50% restante:
    → Inovação liberada, deploys agressivos permitidos

Se error budget entre 25-50%:
    → Deploys com cautela, aumentar testes

Se error budget < 25%:
    → Congelar features, focar em estabilidade
    → Requerer aprovação extra para deploys

Se error budget esgotado:
    → Moratória de features até próxima janela
    → Todo esforço em melhorias de confiabilidade
```

## Trade-offs e Considerações

### SLOs Realistas vs. Aspiracionais

| Tipo                          | Quando Usar                           | Risco                               |
| ----------------------------- | ------------------------------------- | ----------------------------------- |
| **Realista** (atingível)      | Serviços maduros, SLA contratual      | Pode ser muito conservador          |
| **Aspiracional** (desafiador) | Serviços novos, melhoria contínua     | Time pode desistir se muito difícil |
| **Conservador**               | Serviços críticos (pagamentos, saúde) | Custo operacional alto              |
| **Aggressive**                | Serviços não-críticos, experimentais  | Risco de burnout do time            |

### SRE vs. DevOps

Embora relacionados, há diferenças importantes:

| Aspecto  | DevOps             | SRE                             |
| -------- | ------------------ | ------------------------------- |
| Foco     | Fluxo de entrega   | Confiabilidade em produção      |
| Origem   | Movimento cultural | Prática do Google               |
| Métricas | DORA (velocity)    | SLIs/SLOs (reliability)         |
| Time     | Multifuncional     | Especializado em confiabilidade |
| Cultura  | Colaboração        | Engenharia de sistemas          |

**Integração ideal:** DevOps define o pipeline; SRE define as guardrails de
confiabilidade dentro desse pipeline.

## Estudos de Caso

### Caso 1: Definição de SLOs em Fintech

**Contexto:** Plataforma de pagamentos processando 10M transações/dia

**Desafio:** SLOs muito agressivos (99.999%) estavam:

- Impedindo deploys de melhorias de UX
- Causando burnout da equipe
- Custando 3x mais em infraestrutura

**Solução:**

- Reduziu SLO para 99.95% (4.32 minutos/mês de downtime)
- Separou SLOs por tier de serviço:
  - Critical (pagamentos): 99.99%
  - Standard (relatórios): 99.9%
  - Internal (admin): 99%

**Resultados:**

- 40% mais deploys de features
- Custo de infraestrutura reduzido em 25%
- Equipe mais engajada
- Nenhum impacto negativo nos negócios

### Caso 2: Automação de Toil em E-commerce

**Contexto:** Operação manual de black friday - 20 engenheiros trabalhando 48h
seguidas

**Toil identificado:**

- Escalação manual de instâncias
- Verificação de health checks
- Roteamento de tráfego manual
- Comunicação de status para stakeholders

**Solução com IA:**

1. Autoscaling preditivo baseado em histórico
2. Health checks automatizados com self-healing
3. Roteamento automático com circuit breakers
4. Dashboard de status público + notificações automáticas

**Resultados:**

- Black friday seguinte: 2 engenheiros de plantão
- Zero downtime não planejado
- Economia de 1600h de trabalho manual

## Exercícios

### Exercício 1: Definição de SLIs

Para um serviço de API REST de e-commerce, defina:

1. Quatro SLIs relevantes
2. Como calcular cada um
3. Quais dados são necessários
4. Quais ferramentas coletariam esses dados

### Exercício 2: Cálculo de Error Budget

Dado:

- SLO de 99.9% de disponibilidade
- Janela de 30 dias
- Incidentes no mês:
  - Dia 5: 15 minutos de downtime
  - Dia 12: 8 minutos de degradação parcial
  - Dia 23: 20 minutos de downtime

**Questões:**

1. Quanto error budget foi consumido?
2. Quanto resta para o mês?
3. Que decisões você tomaria com esse budget?

### Exercício 3: Análise de Toil

Liste 5 atividades de toil em sua organização atual. Para cada uma:

1. Estime horas/semana gastas
2. Avalie automatizabilidade (1-5)
3. Priorize por impacto vs. esforço
4. Proponha solução (com ou sem IA)

## Resumo

SRE é engenharia aplicada à confiabilidade. SLIs medem, SLOs definem metas,
error budgets permitem trade-offs informados, e eliminação de toil libera
capacidade para inovação. A IA amplifica SRE permitindo predição e automação
inteligente, mas fundamentos sólidos de métricas e processos são pré-requisitos.

## Referências

1. Beyer, B., et al. (2016). *Site Reliability Engineering*. O'Reilly Media.
2. Murphy, N., et al. (2017). *The Site Reliability Workbook*. O'Reilly Media.
3. Microsoft Research (2024). *Exploring LLM-Based Agents for Root Cause
   Analysis*.
4. Rootly (2025). *DevOps Reliability Trends 2025: AI Drives SRE Adoption*.
5. Incident.io (2025). *5 AI-powered SRE tools transforming DevOps*.

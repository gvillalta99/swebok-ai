---
title: 'Seção 6: Observabilidade'
created_at: 2025-02-07
tags: [observability, monitoring, opentelemetry, metrics, logs, traces, telemetry]
status: draft
updated_at: 2025-02-07
ai_model: Claude
---

# Seção 6: Observabilidade

Observabilidade é a capacidade de entender o comportamento interno de um sistema
a partir de suas saídas externas. Diferente de monitoramento tradicional
(verificar se algo está quebrado), observabilidade permite responder a perguntas
que você não sabia que precisava fazer. Em 2024-2025, a observabilidade evolui
para incorporar IA na detecção de padrões e anomalias em tempo real.

## Objetivos de Aprendizagem

Ao final desta seção, você será capaz de:

1. Distinguir monitoramento de observabilidade
2. Implementar os três pilares: métricas, logs e traces
3. Configurar OpenTelemetry para instrumentação unificada
4. Projetar dashboards eficazes
5. Aplicar detecção de anomalias com IA

## Conceitos Fundamentais

### Observabilidade vs. Monitoramento

**Monitoramento:**

- Baseado em regras e thresholds conhecidos
- Responde a: "O sistema está funcionando?"
- Ferramentas: Nagios, Zabbix, thresholds estáticos
- Reage a problemas conhecidos

**Observabilidade:**

- Baseada em exploração de dados
- Responde a: "Por que o sistema está se comportando assim?"
- Ferramentas: Datadog, New Relic, Honeycomb
- Explora problemas desconhecidos

> **Analogia:** Monitoramento é como verificar se o motor está ligado.
> Observabilidade é ter um scanner de diagnóstico que revela o que está
> acontecendo internamente.

### Os Três Pilares da Observabilidade

**1. Métricas (Metrics)**

Dados numéricos agregados ao longo do tempo:

```
Características:
- Baixo custo de armazenamento
- Alta cardinalidade limitada
- Ideais para tendências e alertas

Exemplos:
- CPU usage: 45%
- Request latency p99: 250ms
- Error rate: 0.1%
- Requests per second: 10.000
```

**2. Logs (Logs)**

Registros textuais de eventos:

```
Características:
- Alto custo de armazenamento
- Informação rica e contextual
- Ideais para debugging

Exemplo:
2025-02-07T14:32:15Z ERROR [payment-service]
  Transaction failed: card_expired
  user_id=12345 transaction_id=tx-98765 amount=150.00
  duration_ms=245
```

**3. Traces (Traces)**

Rastreamento de requests através de serviços distribuídos:

```
Características:
- Mostra fluxo end-to-end
- Identifica gargalos
- Essencial para microserviços

Estrutura:
Trace → Spans → Events

Um trace representa uma requisição
Cada span representa uma operação
Events são pontos no tempo dentro de um span
```

### O Quarto Pilar: Profiles

Além dos três pilares tradicionais, a observabilidade moderna inclui:

**Profiles:**

- Amostragem do uso de recursos (CPU, memória)
- Identifica funções que consomem mais recursos
- Essencial para otimização de performance

Ferramentas: Pyroscope, Parca, Datadog Continuous Profiler

### Cardinalidade e Custo

Cardinalidade é o número de valores únicos para uma métrica:

```
Baixa cardinalidade (bom):
- http_requests_total{status="200", method="GET"}
- Valores possíveis: ~10

Alta cardinalidade (custo elevado):
- http_requests_total{user_id="12345"}
- Valores possíveis: milhões

Cardinalidade explosiva (problema):
- http_requests_total{user_id="12345", session_id="abc", request_id="xyz"}
- Valores possíveis: infinitos
```

**Regra prática:** Limitar cardinalidade a 10.000 séries por métrica em sistemas
de grande escala.

## Na Era dos LLMs

### Estado da Observabilidade (2024-2025)

O relatório New Relic 2025 Observability Report revela:

> **54%** das organizações estão adotando monitoramento de IA em produção em
> 2025, movendo-se de experimentação para produção completa.

**Desafios Atuais:**

| Desafio                        | Impacto                     | Solução Emergente          |
| ------------------------------ | --------------------------- | -------------------------- |
| Fragmentação (10+ ferramentas) | Dificuldade de correlação   | Plataformas unificadas     |
| Volume de dados                | Custos crescentes           | Sampling inteligente, eBPF |
| Complexidade do Kubernetes     | Visibilidade dinâmica       | OpenTelemetry, eBPF        |
| Alert fatigue                  | 60-80% de alertas são ruído | Correlação com IA          |

### Observabilidade para Aplicações LLM

Com a proliferação de aplicações com LLMs, novos requisitos emergem:

**Métricas específicas de LLM:**

```python
# Exemplo de métricas para aplicação LLM

llm_metrics = {
    # Custo
    "tokens_input": 1500,
    "tokens_output": 320,
    "cost_per_request": 0.0047,  # USD

    # Performance
    "time_to_first_token_ms": 245,
    "total_latency_ms": 1845,

    # Qualidade
    "user_feedback_positive": 1,  # thumbs up
    "hallucination_detected": 0,
    "safety_triggered": 0,

    # Contexto
    "prompt_tokens": 1450,
    "context_window_usage": 0.35  # 35% de 4k tokens
}
```

**Desafios de observabilidade LLM:**

- Prompts são dados sensíveis (PII)
- Respostas são não-determinísticas
- Feedback humano é essencial mas caro
- Custos por token crescem rapidamente

### Detecção de Anomalias com IA

Ferramentas modernas usam ML para detectar padrões anormais sem thresholds
manuais:

**1. Datadog Watchdog**

- Algoritmos de detecção de anomalias automáticas
- Correlaciona métricas, logs e traces
- RCA assistida por IA

**2. New Relic AI**

- Análise de causa raiz automatizada
- Supressão de alertas redundantes
- Recomendações de resolução

**3. Dynatrace Davis**

- IA determinística (causalidade, não apenas correlação)
- Predição de problemas antes do impacto
- Análise de dependências entre serviços

**Algoritmos comuns:**

- Isolation Forest para detecção de outliers
- LSTM para predição de séries temporais
- Clustering para agrupamento de logs similares

## Práticas e Ferramentas

### OpenTelemetry: O Padrão Emergente

OpenTelemetry é um projeto CNCF que unifica instrumentação:

```python
# Exemplo de instrumentação com OpenTelemetry (Python)

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Configuração do provider
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)

# Exportador OTLP (envia para backend)
otlp_exporter = OTLPSpanExporter(endpoint="otel-collector:4317")
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Instrumentação manual
with tracer.start_as_current_span("process_payment") as span:
    span.set_attribute("payment.amount", 150.00)
    span.set_attribute("payment.currency", "BRL")

    # Sub-span para operação específica
    with tracer.start_as_current_span("validate_card"):
        validate_card(card_number)

    # Evento
    span.add_event("payment_authorized", {"auth_code": "ABC123"})
```

**Arquitetura OpenTelemetry:**

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Aplicação     │────→│  OTel Collector  │────→│    Backend      │
│  Instrumentada  │     │  (Agent/Gateway) │     │ (Jaeger, Tempo) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │
    Traces/Logs/Metrics    Enriquecimento,
                           Filtragem, Routing
```

### eBPF: Observabilidade Kernel-Level

eBPF (extended Berkeley Packet Filter) permite observabilidade sem
instrumentação de código:

**Capacidades:**

- Rastreamento de syscalls
- Monitoramento de rede
- Profile de performance
- Sem overhead significativo

**Ferramentas:**

- Pixie (observabilidade Kubernetes com eBPF)
- Falco (detecção de ameaças)
- Cilium (networking e observabilidade)

### Design de Dashboards Eficazes

**Princípios RED para métricas:**

| Métrica      | Definição               | Quando Usar                         |
| ------------ | ----------------------- | ----------------------------------- |
| **Rate**     | Requisições por segundo | Capacidade, planejamento            |
| **Errors**   | Taxa de erro            | Alertas, SLOs                       |
| **Duration** | Latência                | Performance, experiência do usuário |

**Princípios USE para recursos:**

| Métrica         | Definição                  | Quando Usar       |
| --------------- | -------------------------- | ----------------- |
| **Utilization** | Percentual de uso          | Capacidade, custo |
| **Saturation**  | Trabalho enfileirado       | Gargalos          |
| **Errors**      | Erros de hardware/software | Confiabilidade    |

**Estrutura de Dashboards:**

```
Dashboard: Visão Geral do Sistema
├── Row 1: SLOs e Error Budget (4 widgets)
├── Row 2: Tráfego e Latência (RED metrics)
├── Row 3: Recursos de Infraestrutura (USE metrics)
├── Row 4: Erros e Exceções
└── Row 5: Top Issues (com IA)
```

## Trade-offs e Considerações

### Sampling: O Que Manter?

**Head-based Sampling:**

- Decisão no início do trace
- Simples, consistente
- Pode perder erros raros

**Tail-based Sampling:**

- Decisão após trace completo
- Mantém traces com erros
- Requer mais memória

**Regra prática:**

- 100% de traces em desenvolvimento
- 1-10% em produção (aumentar se erro detectado)
- 100% de logs de erro

### Custos de Observabilidade

| Componente | Custo Típico | Estratégia de Redução               |
| ---------- | ------------ | ----------------------------------- |
| Métricas   | Baixo        | Agregação, retenção curta           |
| Logs       | Alto         | Sampling, filtragem, compressão     |
| Traces     | Médio        | Sampling inteligente, tail-based    |
| Profiles   | Baixo        | Continuous profiling com amostragem |

**Benchmark 2025:**

- 1M métricas/hora: ~$50/mês
- 1TB logs/dia: ~$500/mês
- 1M traces/dia: ~$200/mês

## Estudos de Caso

### Caso 1: Implementação OpenTelemetry em Microserviços

**Contexto:** 50 microserviços, sem rastreabilidade end-to-end

**Solução:**

1. Instrumentação automática com agents OpenTelemetry
2. Collector centralizado com enriquecimento de contexto
3. Backend unificado (Tempo para traces, Loki para logs, Prometheus para
   métricas)

**Resultados:**

- MTTR reduzido de 2h para 15 minutos
- Descoberta de 3 gargalos não identificados
- Custos 40% menores que solução proprietária anterior

### Caso 2: Detecção de Anomalias em Fintech

**Contexto:** 10.000 alertas/dia, 90% falsos positivos

**Solução com IA:**

1. Correlação de alertas com ML (agrupamento)
2. Supressão de alertas durante janelas de manutenção conhecidas
3. Alertas apenas quando padrão anormal detectado

**Resultados:**

- 75% redução em alertas
- 95% de precisão em alertas críticos
- Engenheiros focando em problemas reais, não ruído

## Exercícios

### Exercício 1: Design de Observabilidade

Para um sistema de e-commerce com:

- API Gateway
- Serviço de catálogo
- Serviço de pagamentos
- Serviço de notificações
- Banco de dados PostgreSQL

Defina:

1. 5 métricas críticas por serviço
2. 3 logs essenciais por serviço
3. Como trace um checkout completo
4. SLIs de observabilidade (ex: cobertura de traces)

### Exercício 2: Cardinalidade Analysis

Analise a cardinalidade destas métricas:

```
a) http_requests_total{status="200", path="/api/users"}
b) http_requests_total{user_id="${USER_ID}"}
c) http_requests_total{user_id="${USER_ID}", session_id="${SESSION}"}
d) http_requests_total{status="${STATUS}", region="${REGION}"}
```

Para cada uma:

1. Estime cardinalidade em escala (1M usuários, 10 regiões)
2. Classifique como baixa/média/alta/explosiva
3. Sugira alternativa se necessário

### Exercício 3: RCA com Dados de Observabilidade

Dado um incidente:

- Latência de API aumentou 500% às 14:00
- Erros 5xx começaram às 14:05
- Recuperação às 14:30

Você tem:

- Métricas de CPU, memória, latência
- Logs de erro
- Traces distribuídos

**Questões:**

1. Qual pilar você consulta primeiro? Por quê?
2. Que correlações você buscaria?
3. Como validaria a causa raiz?

## Resumo

Observabilidade transforma dados (métricas, logs, traces, profiles) em
compreensão. OpenTelemetry padroniza instrumentação; eBPF expande visibilidade
sem código; IA detecta padrões invisíveis a regras manuais. O objetivo não é
coletar mais dados, mas fazer as perguntas certas e obter respostas rápidas.

## Referências

1. New Relic (2025). *2025 Observability Report*.
2. Elastic (2024). *Emerging trends in observability: GAI, AIOps, tools
   consolidation*.
3. Dynatrace (2024). *The state of observabilidade in 2024*.
4. OpenTelemetry Documentation. <https://opentelemetry.io/docs/>
5. Charity Majors (2021). *Observability Engineering*. O'Reilly Media.

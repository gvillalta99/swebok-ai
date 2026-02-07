---
title: Padrões de Design Clássicos na Era da IA
created_at: 2026-02-07
tags: [software-design, gof, padroes, enterprise, adaptacao]
status: draft
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 4. Padrões de Design Clássicos na Era da IA

Os padrões clássicos de design — desde os 23 padrões da Gang of Four (GoF) até padrões empresariais — mantêm sua relevância, mas suas aplicações e implementações evoluem significativamente com a introdução de componentes de IA. Este capítulo explora como estes padrões são adaptados e quais novos usos emergem em sistemas com LLMs.

## 4.1 Padrões GoF na Era da IA

Os padrões clássicos da Gang of Four continuam sendo aplicados, frequentemente gerados automaticamente por sistemas de IA. No entanto, novos contextos de uso surgem quando integramos LLMs em arquiteturas de software.

### Padrões Criacionais

**Factory Pattern:**
A IA gera boilerplate de factories com facilidade, mas o valor agregado está em factories que encapsulam a lógica de seleção de modelos:

```python
# Factory para seleção de LLM baseada em contexto
class LLMFactory:
    @staticmethod
    def create(task_complexity: TaskLevel, domain: Domain) -> LLMProvider:
        if task_complexity == TaskLevel.SIMPLE:
            return LocalLLM()  # Modelo leve, baixo custo
        elif domain == Domain.CODE:
            return CodeSpecializedLLM()  # Modelo fine-tuned para código
        else:
            return GeneralPurposeLLM()  # Modelo de propósito geral
```

**Builder Pattern:**
Particularmente útil para APIs fluentes geradas por IA, especialmente na construção de prompts complexos:

```python
# Builder para construção estruturada de prompts
class PromptBuilder:
    def __init__(self):
        self.system_context = ""
        self.examples = []
        self.constraints = []

    def with_persona(self, role: str):
        self.system_context += f"Você é um {role}. "
        return self

    def with_example(self, input_data: str, output_data: str):
        self.examples.append({"input": input_data, "output": output_data})
        return self

    def with_constraint(self, constraint: str):
        self.constraints.append(constraint)
        return self

    def build(self) -> Prompt:
        return Prompt(self.system_context, self.examples, self.constraints)
```

**Singleton:**
Requer atenção especial para garantir thread-safety em código gerado. Clientes singleton para APIs de IA são comuns, mas devem implementar pooling de conexões.

### Padrões Estruturais

**Adapter:**
Torna-se crítico para integração de sistemas legados com LLMs. O adapter traduz entre interfaces antigas e os formatos esperados por modelos modernos:

```python
# Adapter para integrar sistema legado com LLM
class LegacySystemLLMAdapter:
    def __init__(self, legacy_system: LegacyAPI, llm: LLMProvider):
        self.legacy = legacy_system
        self.llm = llm

    def query(self, natural_language_query: str) -> StructuredResponse:
        # Converte linguagem natural para parâmetros do sistema legado
        params = self.llm.extract_parameters(natural_language_query)
        raw_data = self.legacy.fetch(params)
        # Converte resposta para formato moderno
        return self.llm.structure_response(raw_data)
```

**Facade:**
O conceito de "Agent Facade" emerge como um padrão importante: uma interface simplificada que encapsula interações complexas com múltiplos agentes especializados [^12]:

```python
# Agent Facade - interface unificada para sistema multi-agent
class CustomerServiceFacade:
    def __init__(self):
        self.intent_agent = IntentClassificationAgent()
        self.support_agent = SupportAgent()
        self.sales_agent = SalesAgent()
        self.escalation_agent = EscalationAgent()

    def handle_inquiry(self, customer_message: str) -> Response:
        # O facade orquestra múltiplos agentes internamente
        intent = self.intent_agent.classify(customer_message)

        if intent == Intent.SUPPORT:
            return self.support_agent.respond(customer_message)
        elif intent == Intent.SALES:
            return self.sales_agent.respond(customer_message)
        else:
            return self.escalation_agent.escalate(customer_message)
```

**Decorator:**
Útil para adicionar comportamentos de logging, observabilidade e monitoramento de custos em chamadas a LLMs:

```python
# Decorator para monitoramento de chamadas a LLM
class MonitoredLLM(LLMProvider):
    def __init__(self, wrapped: LLMProvider):
        self.wrapped = wrapped
        self.metrics = MetricsCollector()

    def generate(self, prompt: str) -> str:
        start_time = time.time()
        tokens_in = self.count_tokens(prompt)

        response = self.wrapped.generate(prompt)

        tokens_out = self.count_tokens(response)
        latency = time.time() - start_time

        self.metrics.record(tokens_in, tokens_out, latency)
        return response
```

### Padrões Comportamentais

**Strategy:**
Fundamental para sistemas que alternam entre LLMs e lógica tradicional baseada em contexto:

```python
# Strategy para seleção de abordagem de processamento
class ProcessingStrategy(ABC):
    @abstractmethod
    def process(self, data: Input) -> Output:
        pass

class RuleBasedStrategy(ProcessingStrategy):
    def process(self, data: Input) -> Output:
        # Lógica determinística para casos simples
        return self.apply_rules(data)

class LLMStrategy(ProcessingStrategy):
    def __init__(self, model: LLMProvider):
        self.model = model

    def process(self, data: Input) -> Output:
        # LLM para casos complexos
        return self.model.generate(self.format_prompt(data))

class HybridProcessor:
    def __init__(self):
        self.strategies = {
            Complexity.LOW: RuleBasedStrategy(),
            Complexity.HIGH: LLMStrategy(GPT4())
        }

    def process(self, data: Input) -> Output:
        complexity = self.assess_complexity(data)
        return self.strategies[complexity].process(data)
```

**Observer:**
Adaptado para arquiteturas orientadas a eventos com IA, onde agentes reagem a mudanças de estado:

```python
# Observer para sistema de eventos com agentes
class EventManager:
    def __init__(self):
        self.observers: Dict[EventType, List[Agent]] = defaultdict(list)

    def subscribe(self, event_type: EventType, agent: Agent):
        self.observers[event_type].append(agent)

    def notify(self, event: Event):
        for agent in self.observers[event.type]:
            agent.on_event(event)
```

**Command:**
Base para padrões de "Tool Use" em sistemas com LLMs. Cada comando representa uma ferramenta que o modelo pode invocar:

```python
# Command pattern para Tool Use
class ToolCommand(ABC):
    @abstractmethod
    def execute(self, parameters: Dict) -> ToolResult:
        pass

    @abstractmethod
    def get_schema(self) -> ToolSchema:
        pass

class SearchDatabaseCommand(ToolCommand):
    def execute(self, parameters: Dict) -> ToolResult:
        query = parameters["query"]
        results = self.database.search(query)
        return ToolResult(data=results)

    def get_schema(self) -> ToolSchema:
        return ToolSchema(
            name="search_database",
            description="Busca no banco de dados",
            parameters={"query": {"type": "string"}}
        )
```

## 4.2 Padrões Empresariais Adaptados

### Layered Architecture

A arquitetura em camadas tradicional expande-se para incluir uma nova camada: **AI Orchestration Layer**

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│     (Interfaces de usuário)             │
├─────────────────────────────────────────┤
│       AI Orchestration Layer            │
│  (Prompt Engineering, RAG, Agents)      │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│    (Regras de negócio tradicionais)     │
├─────────────────────────────────────────┤
│         Data Access Layer               │
│       (Persistência, APIs)              │
└─────────────────────────────────────────┘
```

Esta camada encapsula:

- Gerenciamento de chamadas a LLMs
- Pipelines de RAG
- Coordenação de agentes
- Fallbacks e resiliência

### Microservices

**Microserviços de IA Especializados:**
Arquiteturas de microservices adaptam-se para incluir serviços dedicados a funções de IA:

```
┌──────────────────────────────────────────┐
│           API Gateway                     │
│  (Routing, Circuit Breaker, Rate Limit)   │
└──────────────┬───────────────────────────┘
               │
    ┌──────────┼──────────┬───────────┐
    │          │          │           │
    ▼          ▼          ▼           ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Text    │ │Image   │ │Code    │ │Data    │
│Service │ │Service │ │Service │ │Analysis│
│(GPT)   │ │(DALL-E)│ │(Copilot│ │Service │
│        │ │        │ │  )     │ │        │
└────────┘ └────────┘ └────────┘ └────────┘
```

**API Gateway com Circuit Breaker:**
Gateways modernos implementam circuit breakers específicos para proteger contra falhas em APIs de IA [^14]:

```yaml
# Configuração de circuit breaker para LLM
api_gateway:
  routes:
    - path: /llm/generate
      service: llm_service
      circuit_breaker:
        failure_threshold: 5
        recovery_timeout: 30s
        fallback: static_response_service
```

### Event-Driven Architecture

**Integração com Streams de Eventos:**
Sistemas com IA beneficiam-se de processamento em tempo real de eventos:

```python
# Processamento de eventos com IA
class EventProcessor:
    def __init__(self, llm: LLMProvider, event_stream: Stream):
        self.llm = llm
        self.stream = event_stream

    async def process_events(self):
        async for event in self.stream.consume():
            # Análise de sentimento/intenção em tempo real
            analysis = self.llm.analyze(event.content)

            if analysis.urgency == Urgency.HIGH:
                await self.trigger_alert(event, analysis)

            # Persistência para rastreabilidade
            await self.store_event(event, analysis)
```

**Event Sourcing para Rastreabilidade:**
Decisões de IA são armazenadas como eventos imutáveis, permitindo:

- Audit trails completos
- Replay de decisões
- Análise de drift comportamental

## 4.3 Síntese: Padrões como Linguagem Comum

Os padrões de design clássicos funcionam como uma linguagem ubíqua entre humanos e IA:

- **Para a IA:** Padrões fornecem estruturas reconhecíveis que o modelo pode gerar consistentemente
- **Para humanos:** Padrões oferecem vocabulário compartilhado para especificar comportamentos
- **Para o sistema:** Padrões garantem consistência e previsibilidade

A solicitação explícita de padrões específicos nos prompts melhora significativamente a qualidade do código gerado:

```markdown
"Implemente usando o padrão Strategy para permitir diferentes
algoritmos de classificação. Use Factory Method para criação
das estratégias e Observer para notificação de resultados."
```

## Referências


[^12]: ArXiv. "Designing LLM-based Multi-Agent Systems for Software Engineering Tasks." 2024.

[^14]: Microsoft. "GenAI Gateway Resilience Service Example." GitHub, 2024.

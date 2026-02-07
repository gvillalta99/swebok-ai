---
title: Design Patterns para Sistemas com IA
created_at: 2026-02-07
tags: [software-design, patterns, agentic, multi-agent, resiliencia]
status: published
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 6. Design Patterns para Sistemas com IA

Além dos padrões estruturais, sistemas com IA generativa demandam patterns
específicos para arquitetura de agentes, colaboração multi-agent e resiliência.
Este capítulo detalha estes padrões emergentes que constituem o repertório
técnico do engenheiro de software contemporâneo.

## 6.1 Agentic Design Patterns

Andrew Ng propôs uma categorização em três níveis de complexidade para workflows
de IA [^21], posteriormente aprofundada por pesquisas da Vellum (2025) [^22].
Esta hierarquia orienta decisões arquiteturais sobre autonomia e complexidade.

### Nível 1: AI Workflows (Output Decisions)

Caracterizam-se por decisões ao nível do modelo, sem estado persistente ou
orquestração complexa:

**Características:**

- Geração de conteúdo baseada em prompt único
- Classificação e análise de sentimento
- Extração de entidades
- Resumo de textos

**Exemplo:**

```python
class ContentGenerator:
    """Workflow simples de geração de conteúdo"""

    def __init__(self, model: LLMProvider):
        self.model = model

    def generate_blog_post(self, topic: str, tone: str) -> str:
        prompt = f"""
        Escreva um post de blog sobre {topic}.
        Tom: {tone}
        Extensão: 500 palavras
        Inclua: introdução, 3 pontos principais, conclusão
        """
        return self.model.generate(prompt)
```

**Quando usar:**

- Tarefas atômicas e bem definidas
- Baixa necessidade de contexto histórico
- Baixo risco de erro
- Orçamento limitado

### Nível 2: Router Workflows (Task Decisions)

Representam o maior foco de inovação atual. Envolvem escolha de tarefas e
ferramentas em ambiente predefinido:

**Características:**

- Roteamento baseado em intenção
- Seleção dinâmica de ferramentas
- Encadeamento condicional de passos
- Estado limitado entre etapas

**Exemplo de Router Pattern:**

```python
class IntentRouter:
    """Roteia solicitações para handlers especializados"""

    def __init__(self, llm: LLMProvider):
        self.llm = llm
        self.handlers = {
            Intent.SALES: SalesHandler(),
            Intent.SUPPORT: SupportHandler(),
            Intent.BILLING: BillingHandler(),
            Intent.GENERAL: GeneralHandler()
        }

    def route(self, user_message: str) -> Response:
        # LLM classifica intenção
        intent = self.llm.classify_intent(user_message)

        # Roteia para handler apropriado
        handler = self.handlers[intent]
        return handler.process(user_message)
```

**Quando usar:**

- Múltiplos domínios de expertise necessários
- Necessidade de especialização
- Workflows com ramificações condicionais
- Sistemas de atendimento multi-tema

### Nível 3: Autonomous Agents (Process Decisions)

Representam o maior grau de autonomia, com criação dinâmica de tarefas:

**Características:**

- Planejamento automático de passos
- Criação dinâmica de sub-tarefas
- Memória de longo prazo
- Iteração até atingir objetivo

**Exemplo de Agente Autônomo:**

```python
class AutonomousResearchAgent:
    """Agente que conduz pesquisa de forma autônoma"""

    def __init__(self, llm: LLMProvider, tools: ToolRegistry):
        self.llm = llm
        self.tools = tools
        self.memory = WorkingMemory()

    def execute(self, goal: str) -> ResearchReport:
        plan = self.llm.create_plan(goal)

        for step in plan.steps:
            # Seleciona ferramenta apropriada
            tool = self.select_tool(step)

            # Executa
            result = tool.execute(step.parameters)

            # Armazena em memória
            self.memory.add_observation(result)

            # Reavalia plano se necessário
            if self.should_replan():
                plan = self.llm.replan(goal, self.memory)

        return self.synthesize_report()
```

**Quando usar:**

- Problemas mal definidos ou em aberto
- Necessidade de exploração
- Tarefas de pesquisa complexa
- Automação de processos de múltiplas etapas

## 6.2 Padrões de Colaboração Multi-Agent

Sistemas com múltiplos agentes especializados requerem padrões de coordenação
[^20].

### Sequential Pattern

Agentes executam em ordem linear predefinida, cada um processando o output do
anterior:

```
Agente A ──▶ Agente B ──▶ Agente C ──▶ Output
   │            │            │
   └────────────┴────────────┘
        Pipeline Linear
```

**Caso de uso:** Processamento de documentos (extração → análise → formatação)

```python
class SequentialPipeline:
    def __init__(self, agents: List[Agent]):
        self.agents = agents

    def process(self, input_data: Any) -> Any:
        result = input_data
        for agent in self.agents:
            result = agent.process(result)
        return result
```

### Parallel Pattern (Concurrent)

Múltiplos agentes trabalham simultaneamente, outputs são sintetizados:

```
           ┌──▶ Agente A ──┐
           │               │
Input ────┼──▶ Agente B ──┼──▶ Sintetizador ──▶ Output
           │               │
           └──▶ Agente C ──┘
```

**Caso de uso:** Análise de sentimento por múltiplas perspectivas, tradução para
vários idiomas simultaneamente

```python
class ParallelEnsemble:
    def __init__(self, agents: List[Agent], synthesizer: Agent):
        self.agents = agents
        self.synthesizer = synthesizer

    async def process(self, input_data: Any) -> Any:
        # Executa todos em paralelo
        results = await asyncio.gather(*[
            agent.process(input_data)
            for agent in self.agents
        ])

        # Sintetiza resultados
        return self.synthesizer.synthesize(results)
```

### Loop Pattern

Agentes executam sequência repetidamente até condição de término:

```
┌────────────────────────────────┐
│                                │
▼                                │
Agente ──▶ Condição de Término? ─┤
            │ Sim ──▶ Output      │
            │ Não ────────────────┘
```

**Caso de uso:** Refinamento iterativo, otimização

```python
class IterativeRefiner:
    def __init__(self, agent: Agent, evaluator: Agent):
        self.agent = agent
        self.evaluator = evaluator
        self.max_iterations = 5

    def refine(self, initial_input: Any, target_quality: float) -> Any:
        current = initial_input

        for iteration in range(self.max_iterations):
            # Avalia qualidade atual
            quality = self.evaluator.evaluate(current)

            if quality >= target_quality:
                return current

            # Refina
            feedback = self.evaluator.get_feedback(current)
            current = self.agent.refine(current, feedback)

        return current  # Retorna melhor esforço
```

### Review and Critique Pattern

Um agente gera, outro avalia e sugere melhorias:

```
┌─────────────┐
│  Generator  │
└──────┬──────┘
       │ Output inicial
       ▼
┌─────────────┐
│   Critic    │ ◀── Avalia e sugere
└──────┬──────┘
       │ Feedback
       └──────────▶ (loop até qualidade aceitável)
```

**Caso de uso:** Revisão de código, validação de conteúdo, verificação factual

```python
class ReviewCycle:
    def __init__(self, generator: Agent, critic: Agent):
        self.generator = generator
        self.critic = critic

    def generate_with_review(self, requirements: str) -> Any:
        draft = self.generator.generate(requirements)

        for _ in range(3):  # Máximo 3 ciclos
            critique = self.critic.review(draft)

            if critique.is_acceptable:
                return draft

            draft = self.generator.revise(draft, critique.suggestions)

        return draft
```

### Router Pattern

LLM central atua como recepcionista, direcionando tarefas para agentes
especializados:

```python
class MultiAgentRouter:
    def __init__(self, router_llm: LLMProvider):
        self.router = router_llm
        self.specialists = {
            "code": CodeAgent(),
            "writing": WritingAgent(),
            "analysis": AnalysisAgent(),
            "math": MathAgent()
        }

    def process(self, request: str) -> Response:
        # Roteador determina especialista
        routing = self.router.decide(request)
        specialist = self.specialists[routing.specialist_id]

        # Especialista processa
        return specialist.process(request, routing.context)
```

## 6.3 Padrões Emergentes de Agente

### Reflection Pattern

Agentes avaliam e melhoram suas próprias saídas:

```python
class ReflectiveAgent:
    def generate_with_reflection(self, task: str) -> str:
        # Primeira passada
        initial = self.llm.generate(task)

        # Reflexão
        reflection_prompt = f"""
        Avalie a seguinte resposta:
        {initial}

        Identifique:
        1. Erros factuais
        2. Omissões importantes
        3. Problemas de clareza
        4. Sugestões de melhoria
        """

        reflection = self.llm.generate(reflection_prompt)

        # Melhoria baseada na reflexão
        improvement_prompt = f"""
        Resposta original: {initial}
        Feedback: {reflection}

        Gere uma versão melhorada incorporando o feedback.
        """

        return self.llm.generate(improvement_prompt)
```

### Tool Use Pattern

Agentes interagem com sistemas enterprise através de ferramentas estruturadas:

```python
class ToolUsingAgent:
    def __init__(self, llm: LLMProvider, tools: List[Tool]):
        self.llm = llm
        self.tools = {tool.name: tool for tool in tools}

    def execute_task(self, task: str) -> str:
        context = f"""
        Você tem acesso às seguintes ferramentas:
        {self.format_tools()}

        Tarefa: {task}

        Decida qual ferramenta usar e com quais parâmetros.
        Responda em JSON: {{"tool": "nome", "parameters": {{...}}}}
        """

        decision = self.llm.generate(context)
        tool_call = json.loads(decision)

        # Executa ferramenta
        tool = self.tools[tool_call["tool"]]
        result = tool.execute(**tool_call["parameters"])

        # Gera resposta final
        return self.llm.generate(f"Resultado: {result}. Responda ao usuário.")
```

### Planning Pattern

Decomposição de tarefas complexas em sub-etapas:

```python
class PlanningAgent:
    def execute_complex_task(self, goal: str) -> str:
        # Cria plano
        plan_prompt = f"""
        Decomponha o seguinte objetivo em passos executáveis:
        Objetivo: {goal}

        Formato: lista numerada de ações específicas
        """

        plan = self.llm.generate(plan_prompt)
        steps = self.parse_plan(plan)

        # Executa cada passo
        results = []
        for step in steps:
            result = self.execute_step(step)
            results.append(result)

        # Sintetiza resultado final
        return self.synthesize_results(results)
```

## 6.4 Padrões de Resiliência para LLMs

Sistemas com IA requerem patterns de resiliência específicos para lidar com
falhas de APIs, rate limits e comportamentos imprevisíveis [^23].

### Circuit Breaker

Previne falhas em cascata quando APIs de LLM falham:

```python
from enum import Enum

class CircuitState(Enum):
    CLOSED = "closed"      # Normal operation
    OPEN = "open"         # Failing, reject fast
    HALF_OPEN = "half_open"  # Testing recovery

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.state = CircuitState.CLOSED
        self.failures = 0
        self.last_failure_time = None

    async def call(self, func, *args, **kwargs):
        if self.state == CircuitState.OPEN:
            if self.should_attempt_reset():
                self.state = CircuitState.HALF_OPEN
            else:
                raise CircuitBreakerOpen("Serviço temporariamente indisponível")

        try:
            result = await func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise

    def on_failure(self):
        self.failures += 1
        self.last_failure_time = time.time()

        if self.failures >= self.failure_threshold:
            self.state = CircuitState.OPEN

    def on_success(self):
        self.failures = 0
        self.state = CircuitState.CLOSED
```

### Retry com Exponential Backoff

Tratamento de rate limits (HTTP 429) e falhas transientes:

```python
import random

async def retry_with_backoff(
    func,
    max_retries=3,
    base_delay=1.0,
    max_delay=60.0,
    retryable_errors=(RateLimitError, TimeoutError)
):
    for attempt in range(max_retries):
        try:
            return await func()
        except retryable_errors as e:
            if attempt == max_retries - 1:
                raise

            # Exponential backoff com jitter
            delay = min(base_delay * (2 ** attempt), max_delay)
            jitter = random.uniform(0, 0.1 * delay)
            await asyncio.sleep(delay + jitter)
```

### Fallback

Alternância para modelo secundário ou lógica tradicional:

```python
class FallbackLLM:
    def __init__(
        self,
        primary: LLMProvider,
        secondary: LLMProvider,
        rule_based_fallback: Optional[Callable] = None
    ):
        self.primary = primary
        self.secondary = secondary
        self.rule_based = rule_based_fallback

    async def generate(self, prompt: str) -> str:
        try:
            return await self.primary.generate(prompt)
        except PrimaryLLMError:
            try:
                return await self.secondary.generate(prompt)
            except SecondaryLLMError:
                if self.rule_based:
                    return self.rule_based(prompt)
                raise FallbackExhausted("Todos os fallbacks falharam")
```

### LLM Gateway Pattern

Ponto único de entrada para múltiplos modelos:

```python
class LLMGateway:
    def __init__(self):
        self.models = {
            "gpt-4": GPT4Provider(),
            "gpt-3.5": GPT35Provider(),
            "claude": ClaudeProvider(),
            "local": LocalLLMProvider()
        }
        self.circuit_breakers = {
            name: CircuitBreaker() for name in self.models
        }
        self.load_balancer = RoundRobinBalancer()

    async def generate(
        self,
        prompt: str,
        model_preference: Optional[str] = None,
        requirements: Dict = None
    ) -> str:
        # Seleciona modelo baseado em preferência ou requisitos
        if model_preference:
            model = self.models[model_preference]
        else:
            model = self.select_by_requirements(requirements)

        # Usa circuit breaker
        cb = self.circuit_breakers[model.name]
        return await cb.call(model.generate, prompt)

    def select_by_requirements(self, requirements: Dict) -> LLMProvider:
        """Seleciona modelo baseado em requisitos de custo, latência e capacidades."""
        max_cost = requirements.get('max_cost_per_1k', float('inf'))
        max_latency = requirements.get('max_latency_ms', float('inf'))
        needs_code = requirements.get('code_capabilities', False)
        needs_reasoning = requirements.get('reasoning', False)

        candidates = []
        for name, model in self.models.items():
            # Verifica se atende aos requisitos
            if model.cost_per_1k > max_cost:
                continue
            if model.avg_latency_ms > max_latency:
                continue
            if needs_code and not model.supports_code:
                continue
            if needs_reasoning and not model.supports_reasoning:
                continue
            candidates.append((name, model))

        if not candidates:
            # Fallback: retorna o modelo mais barato disponível
            return min(self.models.values(), key=lambda m: m.cost_per_1k)

        # Seleciona o melhor candidato (maior score de capacidade)
        return max(candidates, key=lambda x: x[1].capability_score)[1]
```

## 6.5 Síntese: Arquitetura de Sistemas Agentic

A combinação destes patterns permite construir sistemas robustos e escaláveis:

```
┌─────────────────────────────────────────────────────┐
│                   LLM Gateway                        │
│        (Circuit Breaker + Load Balancing)           │
└──────────────────┬──────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌────────┐   ┌──────────┐   ┌──────────┐
│ Router │   │ Planner  │   │ Ensemble │
│ Pattern│   │ Pattern  │   │ Pattern  │
└───┬────┘   └────┬─────┘   └────┬─────┘
    │             │              │
    │    ┌────────┴────────┐     │
    │    │                 │     │
    ▼    ▼                 ▼     ▼
┌──────────────────────────────────────────┐
│           Especialistas                   │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │Agente A │ │Agente B │ │Agente C │    │
│  └─────────┘ └─────────┘ └─────────┘    │
└──────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────┐
│            Tool Layer                     │
│  (APIs externas, banco de dados, etc.)   │
└──────────────────────────────────────────┘
```

O engenheiro de software moderno deve dominar não apenas a implementação destes
patterns, mas também o julgamento sobre quando combiná-los para atender
requisitos específicos de confiabilidade, custo e performance.

## Referências

[^21]: Ng, Andrew. "4 Agentic Design Patterns." Snowflake BUILD 2024.

[^22]: Vellum. "The Guide to AI Agent Workflows." 2025.

[^20]: DeepLearning.AI. "Agentic Design Patterns Part 5: Multi-Agent
    Collaboration." 2024.

[^23]: Microsoft Tech Community. "Improve LLM backend resiliency with load
    balancer and circuit breaker rules in Azure API Management." 2025.

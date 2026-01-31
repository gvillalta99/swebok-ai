---
title: "04. Design de Componentes Determinísticos"
created_at: "2025-01-31"
tags: ["software-design", "componentes", "deterministicos", "ia", "contratos"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Design de Componentes Determinísticos

## Overview

Em sistemas híbridos humanos-IA, a coexistência entre componentes determinísticos (código tradicional) e componentes probabilísticos (código gerado por LLMs) exige fronteiras arquiteturais bem definidas. Esta seção aborda como projetar componentes determinísticos que possam operar de forma segura e previsível quando integrados a sistemas de IA.

Segundo Evans (2025), ao incorporar componentes de IA em sistemas maiores que são principalmente software convencional, encontramos várias dificuldades: como domar comportamento intrinsecamente não-determinístico para que possa ser usado em software estruturado e determinístico [1].

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Projetar fronteiras claras entre componentes determinísticos e probabilísticos
2. Implementar wrappers e adaptadores para isolamento de IA
3. Definir contratos formais para comunicação entre componentes
4. Avaliar quando usar código determinístico vs. código gerado

## Características de Componentes Determinísticos

### Definição e Propriedades

Componentes determinísticos são aqueles que, dado um conjunto específico de entradas, sempre produzem a mesma saída, independentemente de quando ou quantas vezes são executados.

**Propriedades Essenciais**:

| Propriedade | Descrição | Importância |
|-------------|-----------|-------------|
| **Idempotência** | Múltiplas execuções com mesma entrada produzem mesmo resultado | Previne efeitos colaterais inesperados |
| **Previsibilidade** | Comportamento pode ser determinado a priori | Facilita testes e debugging |
| **Reprodutibilidade** | Resultados são consistentes em diferentes ambientes | Garante confiabilidade |
| **Transparência** | Estado interno é observável e compreensível | Permite auditoria |

### Contraste com Componentes Probabilísticos

```
┌─────────────────────────────────────────────────────────────────┐
│              DETERMINÍSTICO vs PROBABILÍSTICO                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   DETERMINÍSTICO              PROBABILÍSTICO                   │
│   ────────────────            ───────────────                  │
│   f(x) = y (sempre)           P(y|x) ≈ 0.95                   │
│                                                                 │
│   • Mesma entrada →           • Mesma entrada →                │
│     mesma saída                 saídas possivelmente           │
│                                 diferentes                     │
│                                                                 │
│   • Testável com              • Requer testes                  │
│     asserts exatos              estatísticos                   │
│                                                                 │
│   • Debugging direto          • Debugging complexo             │
│                                                                 │
│   • Custo previsível          • Custo variável                 │
│     (CPU/memória)               (tokens/latência)              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Estratégias de Isolamento

### 1. Wrapper Pattern

Isola componentes de IA através de uma interface determinística.

```python
from abc import ABC, abstractmethod
from typing import Generic, TypeVar

T = TypeVar('T')
U = TypeVar('U')

class DeterministicWrapper(ABC, Generic[T, U]):
    """
    Wrapper base que expõe interface determinística
    para componentes potencialmente não-determinísticos.
    """
    
    def __init__(self, validator, fallback_strategy):
        self.validator = validator
        self.fallback = fallback_strategy
        self._cache = {}
    
    def execute(self, input_data: T) -> U:
        # Verifica cache primeiro (determinístico)
        cache_key = self._hash_input(input_data)
        if cache_key in self._cache:
            return self._cache[cache_key]
        
        try:
            result = self._process(input_data)
            
            # Valida resultado
            if not self.validator.validate(result):
                raise ValidationError("Resultado inválido")
            
            # Cacheia resultado
            self._cache[cache_key] = result
            return result
            
        except Exception as e:
            # Fallback determinístico
            return self.fallback.execute(input_data)
    
    @abstractmethod
    def _process(self, input_data: T) -> U:
        """Implementação específica do componente."""
        pass
```

### 2. Bounded Context para IA

Aplicação do conceito de Domain-Driven Design para isolar domínios onde IA é utilizada.

```
┌─────────────────────────────────────────────────────────────────┐
│              SISTEMA COM BOUNDED CONTEXTS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐        ┌──────────────────┐              │
│  │  Core Domain     │◄──────►│  IA Context      │              │
│  │  (Determinístico)│        │  (Probabilístico)│              │
│  │                  │        │                  │              │
│  │  • Regras de     │        │  • Geração de    │              │
│  │    negócio       │        │    conteúdo      │              │
│  │  • Validações    │        │  • Análise de    │              │
│  │  • Transações    │        │    sentimento    │              │
│  │  • Auditoria     │        │  • Classificação │              │
│  │                  │        │                  │              │
│  └──────────────────┘        └──────────────────┘              │
│           │                           │                        │
│           └───────────┬───────────────┘                        │
│                       │                                        │
│                       ▼                                        │
│              ┌──────────────────┐                              │
│              │  Anti-Corruption │                              │
│              │  Layer (ACL)     │                              │
│              │                  │                              │
│              │  • Adaptação     │                              │
│              │  • Validação     │                              │
│              │  • Transformação │                              │
│              └──────────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Port and Adapters (Hexagonal Architecture)

Estrutura que isola o domínio de infraestrutura, incluindo serviços de IA.

```python
# Port (interface do domínio)
class ContentGenerator(ABC):
    @abstractmethod
    def generate(self, prompt: str) -> GeneratedContent:
        pass

# Adapter primário (IA)
class LLMContentGenerator(ContentGenerator):
    def __init__(self, llm_client, validator):
        self.client = llm_client
        self.validator = validator
    
    def generate(self, prompt: str) -> GeneratedContent:
        raw_output = self.client.complete(prompt)
        
        # Validação obrigatória
        if not self.validator.is_valid(raw_output):
            raise GenerationError("Output inválido")
        
        return GeneratedContent(
            text=raw_output,
            source="llm",
            confidence=self._calculate_confidence(raw_output)
        )

# Adapter secundário (fallback determinístico)
class TemplateContentGenerator(ContentGenerator):
    def __init__(self, template_repository):
        self.templates = template_repository
    
    def generate(self, prompt: str) -> GeneratedContent:
        # Geração determinística baseada em templates
        template = self.templates.find_matching(prompt)
        return GeneratedContent(
            text=template.fill(prompt),
            source="template",
            confidence=1.0
        )
```

## Design de Contratos

### Contratos Formais

Definição clara de expectativas entre componentes determinísticos e probabilísticos.

```python
from dataclasses import dataclass
from typing import Optional, List
from enum import Enum

class ConfidenceLevel(Enum):
    HIGH = 0.9
    MEDIUM = 0.7
    LOW = 0.5

@dataclass(frozen=True)
class ComponentContract:
    """
    Contrato formal entre componentes.
    """
    input_schema: dict
    output_schema: dict
    max_latency_ms: int
    min_confidence: ConfidenceLevel
    required_metadata: List[str]
    
    def validate_input(self, data) -> bool:
        """Valida entrada contra schema."""
        pass
    
    def validate_output(self, data) -> bool:
        """Valida saída contra schema."""
        pass

# Exemplo de contrato para serviço de classificação
classification_contract = ComponentContract(
    input_schema={
        "text": "string",
        "max_length": 1000,
        "language": ["pt", "en", "es"]
    },
    output_schema={
        "category": "string",
        "confidence": "float",
        "alternatives": "list"
    },
    max_latency_ms=500,
    min_confidence=ConfidenceLevel.MEDIUM,
    required_metadata=["timestamp", "model_version"]
)
```

### Agent Contracts

Relari.ai propõe o conceito de "Agent Contracts" para desenvolvimento de agentes de IA com controle [2]:

```python
class AgentContract:
    """
    Contrato para agentes de IA baseado no conceito de Relari.ai.
    """
    def __init__(self):
        self.scenarios = []
        self.specifications = []
    
    def add_scenario(self, name: str, input_data, expected_output):
        """Adiciona cenário de teste."""
        self.scenarios.append({
            "name": name,
            "input": input_data,
            "expected": expected_output
        })
    
    def verify_offline(self, agent) -> VerificationReport:
        """Verificação offline contra cenários."""
        results = []
        for scenario in self.scenarios:
            actual = agent.run(scenario["input"])
            results.append({
                "scenario": scenario["name"],
                "passed": self._match(actual, scenario["expected"]),
                "actual": actual
            })
        return VerificationReport(results)
```

## Transações e Consistência

### Saga Pattern com IA

Coordenação de transações distribuídas onde alguns passos envolvem IA.

```python
class SagaStep:
    def __init__(self, name, action, compensation):
        self.name = name
        self.action = action
        self.compensation = compensation

class Saga:
    def __init__(self):
        self.steps = []
        self.completed = []
    
    def add_step(self, step: SagaStep):
        self.steps.append(step)
    
    def execute(self, context):
        for step in self.steps:
            try:
                result = step.action(context)
                self.completed.append(step)
                context[step.name] = result
            except Exception as e:
                # Compensação
                self._compensate()
                raise SagaFailed(step.name, e)
    
    def _compensate(self):
        for step in reversed(self.completed):
            step.compensation()
```

## Decisão: Determinístico vs. Gerado

### Framework de Decisão

```
┌─────────────────────────────────────────────────────────────────┐
│         QUANDO USAR DETERMINÍSTICO vs GERADO                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  USE DETERMINÍSTICO QUANDO:          USE GERADO QUANDO:        │
│                                                                 │
│  ✓ Regras de negócio claras          ✓ Tarefas criativas       │
│  ✓ Compliance obrigatório            ✓ Dados não estruturados  │
│  ✓ Performance previsível            ✓ Padrões complexos       │
│  ✓ Custo fixo necessário             ✓ Contexto ambíguo        │
│  ✓ Debugging frequente               ✓ Variação desejada       │
│  ✓ Transações financeiras            ✓ Personalização          │
│                                                                 │
│  HÍBRIDO (DETERMINÍSTICO + IA):                                │
│  • Validação de entrada/saída                                    │
│  • Pré-processamento determinístico                              │
│  • Pós-processamento e normalização                              │
│  • Fallback para regras quando IA falha                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Practical Considerations

### Aplicações Reais

1. **Sistemas Financeiros**: Cálculos determinísticos, análise de risco com IA
2. **Healthcare**: Diagnóstico assistido por IA, mas com validação médica obrigatória
3. **E-commerce**: Recomendações por IA, checkout e pagamentos determinísticos

### Limitações

- **Overhead de Isolamento**: Camadas de adaptação adicionam complexidade
- **Latência**: Validações e normalizações aumentam tempo de resposta
- **Custo de Manutenção**: Contratos precisam ser atualizados com evolução do sistema

### Melhores Práticas

1. **Fail Fast**: Validar entradas antes de chamar componentes de IA
2. **Timeout Aggressivo**: Definir timeouts rigorosos para chamadas de IA
3. **Observability**: Logging completo de todas as interações
4. **Gradual Rollout**: Introduzir IA gradualmente, começando com casos de baixo risco

## Summary

- Componentes determinísticos fornecem previsibilidade em sistemas híbridos
- Padrões de isolação (Wrapper, Bounded Context, Ports/Adapters) protegem o núcleo
- Contratos formais definem expectativas claras entre componentes
- Saga pattern coordena transações envolvendo IA
- Decisão entre determinístico e gerado deve ser guiada por requisitos de negócio

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — princípios de isolamento permanecem relevantes |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — contratos podem ser verificados automaticamente |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta — designer responsável por fronteiras arquiteturais |

## References

1. Evans, E. "AI Components for a Deterministic System (An Example)." Domain Language, 2025. https://www.domainlanguage.com/articles/ai-components-deterministic-system/

2. Relari.ai. "Agent Contracts: Build powerful AI agents with control." https://agent-contracts.relari.ai/introduction

3. Vernon, V. "Implementing Domain-Driven Design." Addison-Wesley, 2013.

4. Cockburn, A. "Hexagonal Architecture." https://alistair.cockburn.us/hexagonal-architecture/

5. Richardson, C. "Microservices Patterns." Manning Publications, 2018.

---
title: "03. Padrões de Design para Sistemas Híbridos"
created_at: "2025-01-31"
tags: ["software-design", "padroes", "sistemas-hibridos", "ia", "human-ai"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# 03. Padrões de Design para Sistemas Híbridos

## Overview

Sistemas híbridos humanos-IA representam uma nova classe de arquiteturas de software onde componentes gerados por IA operam em conjunto com código determinístico escrito por humanos. Esta seção apresenta padrões de design específicos para estruturar esses sistemas, garantindo que o não-determinismo dos LLMs seja adequadamente isolado, verificado e controlado.

Os padrões aqui descritos foram sintetizados a partir de pesquisas recentes sobre design de sistemas híbridos [1][2] e práticas emergentes na indústria.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar padrões arquiteturais apropriados para sistemas híbridos
2. Projetar fronteiras claras entre componentes determinísticos e probabilísticos
3. Implementar mecanismos de fallback e circuit breakers
4. Avaliar trade-offs entre autonomia da IA e controle humano

## Padrões Arquiteturais Fundamentais

### 1. AI Gateway Pattern

**Contexto**: Necessidade de controlar e monitorar todas as interações com modelos de IA.

**Solução**: Um componente intermediário (gateway) que centraliza chamadas a LLMs, aplicando políticas de rate limiting, logging, validação e fallback.

```
┌─────────────────────────────────────────────────────────────┐
│                    AI GATEWAY PATTERN                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│   │ Aplicação │───▶│   Gateway    │───▶│   LLM Provider   │  │
│   └──────────┘    └──────────────┘    └──────────────────┘  │
│                          │                                   │
│                    ┌─────┴─────┐                            │
│                    ▼           ▼                            │
│            ┌──────────┐  ┌──────────┐                       │
│            │  Cache   │  │  Fallback│                       │
│            └──────────┘  └──────────┘                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Benefícios**:
- Centralização de políticas de uso
- Facilita testes e mocks
- Permite troca transparente de providers

**Trade-offs**:
- Latência adicional
- Ponto único de falha

### 2. Human-in-the-Loop (HITL) Pattern

**Contexto**: Decisões críticas que não podem ser totalmente automatizadas.

**Solução**: Pontos de decisão onde a aprovação humana é obrigatória antes da execução.

```python
class HITLDecisionPoint:
    def __init__(self, auto_approve_threshold=0.9):
        self.threshold = auto_approve_threshold
    
    def process(self, ai_proposal, confidence_score):
        if confidence_score >= self.threshold:
            return self._auto_approve(ai_proposal)
        else:
            return self._request_human_approval(ai_proposal)
    
    def _request_human_approval(self, proposal):
        # Envia para fila de aprovação humana
        # Retorna promise/future
        pass
```

**Quando usar**:
- Transações financeiras
- Alterações em dados sensíveis
- Decisões com impacto legal ou regulatório

### 3. Prompt Template Pattern

**Contexto**: Necessidade de consistência e versionamento de prompts.

**Solução**: Templates parametrizados e versionados que servem como especificações formais.

```yaml
# prompt_templates/user_story_generation.yaml
version: "1.2.0"
name: user_story_generator
template: |
  Como um {role}, quero {action} para que {benefit}.
  
  Critérios de aceitação:
  {acceptance_criteria}
  
  Restrições técnicas:
  {technical_constraints}
  
validation:
  required_fields: [role, action, benefit]
  max_length: 500
```

**Benefícios**:
- Reprodutibilidade
- Testabilidade de prompts
- Versionamento junto com código

### 4. Multi-Variant Generation Pattern

**Contexto**: Não-determinismo dos LLMs pode produzir resultados de qualidade variável.

**Solução**: Gerar múltiplas variantes e selecionar a melhor com base em critérios objetivos.

```python
class MultiVariantGenerator:
    def __init__(self, llm_client, num_variants=3):
        self.client = llm_client
        self.num_variants = num_variants
    
    def generate(self, prompt, evaluator):
        variants = []
        for _ in range(self.num_variants):
            variant = self.client.generate(prompt)
            score = evaluator.evaluate(variant)
            variants.append((variant, score))
        
        # Seleciona a variante com maior score
        best = max(variants, key=lambda x: x[1])
        return best[0]
```

### 5. Circuit Breaker para IA

**Contexto**: LLMs podem ficar indisponíveis, lentos ou gerar respostas de baixa qualidade.

**Solução**: Padrão Circuit Breaker que interrompe chamadas quando a taxa de erro excede um limiar.

```python
class AICircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN
    
    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if self._should_attempt_reset():
                self.state = "HALF_OPEN"
            else:
                raise CircuitBreakerOpen("Serviço de IA indisponível")
        
        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise
```

## Padrões de Integração

### 6. Adapter para IA

**Contexto**: Código gerado por IA pode não seguir exatamente as interfaces esperadas.

**Solução**: Adaptadores que normalizam a saída de componentes gerados.

```python
class AIGeneratedAdapter:
    def __init__(self, generated_component, contract_validator):
        self.component = generated_component
        self.validator = contract_validator
    
    def execute(self, input_data):
        result = self.component.process(input_data)
        
        # Valida contra contrato
        if not self.validator.validate(result):
            raise ContractViolation("Saída não conforme com contrato")
        
        # Normaliza formato
        return self._normalize(result)
```

### 7. Sandbox Pattern

**Contexto**: Código gerado pode conter comportamentos inesperados ou inseguros.

**Solução**: Execução em ambiente isolado com restrições de recursos e permissões.

```
┌─────────────────────────────────────────────────────────────┐
│                    SANDBOX PATTERN                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐     ┌──────────────────────────────┐    │
│   │   Código     │────▶│         Sandbox              │    │
│   │   Gerado     │     │  ┌────────────────────────┐  │    │
│   └──────────────┘     │  │  Restrições:           │  │    │
│                        │  │  - Tempo de execução   │  │    │
│   ┌──────────────┐     │  │  - Memória             │  │    │
│   │   Monitor    │◀────│  │  - Acesso a rede       │  │    │
│   └──────────────┘     │  │  - Chamadas de sistema │  │    │
│                        │  └────────────────────────┘  │    │
│                        └──────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Padrões de Verificação

### 8. Specification-Based Validation

**Contexto**: Necessidade de verificar código gerado contra requisitos formais.

**Solução**: Especificações executáveis que validam comportamento do código.

```python
from hypothesis import given, strategies as st

class SpecificationValidator:
    @given(st.lists(st.integers()))
    def test_sorting_property(self, data):
        result = self.generated_sort(data)
        # Propriedade: resultado deve estar ordenado
        assert all(result[i] <= result[i+1] 
                  for i in range(len(result)-1))
        # Propriedade: deve conter mesmos elementos
        assert sorted(data) == result
```

### 9. Golden Master Testing

**Contexto**: Regressões em código gerado quando prompts ou modelos mudam.

**Solução**: Capturar saídas "boas" conhecidas e comparar novas gerações.

```python
class GoldenMasterTest:
    def __init__(self, golden_file):
        self.golden_data = self._load(golden_file)
    
    def test_against_golden(self, new_output, tolerance=0.1):
        similarity = self._calculate_similarity(
            new_output, 
            self.golden_data
        )
        assert similarity >= (1 - tolerance), \
            f"Saída divergiu {similarity} do golden master"
```

## Padrões de Fallback

### 10. Graceful Degradation

**Contexto**: Quando IA falha, o sistema deve continuar funcionando com capacidade reduzida.

**Solução**: Hierarquia de estratégias de fallback.

```python
class DegradationStrategy:
    def __init__(self):
        self.strategies = [
            AIGeneration(),      # Tentativa 1: IA
            CachedResponse(),    # Tentativa 2: Cache
            RuleBasedFallback(), # Tentativa 3: Regras
            HumanEscalation()    # Tentativa 4: Humano
        ]
    
    def execute(self, request):
        for strategy in self.strategies:
            try:
                return strategy.handle(request)
            except Exception:
                continue
        raise AllStrategiesFailed()
```

## Practical Considerations

### Aplicações Reais

1. **Chatbots Enterprise**: HITL para intenções de alta confiança, fallback para base de conhecimento
2. **Geração de Código**: Multi-variant com seleção por testes automatizados
3. **Análise de Documentos**: Sandbox para parsing de PDFs, adapter para normalização

### Trade-offs

| Padrão | Benefício Principal | Custo Principal |
|--------|---------------------|-----------------|
| AI Gateway | Controle centralizado | Latência |
| HITL | Segurança | Velocidade |
| Multi-Variant | Qualidade | Custo de tokens |
| Circuit Breaker | Resiliência | Complexidade |
| Sandbox | Segurança | Overhead |

### Anti-Padrões a Evitar

1. **AI Everywhere**: Usar IA onde regras determinísticas seriam suficientes
2. **Blind Trust**: Aceitar código gerado sem verificação
3. **No Fallback**: Depender exclusivamente de disponibilidade de IA
4. **Prompt Hoarding**: Acumular prompts não versionados

## Summary

- Padrões de design para sistemas híbridos isolam e controlam o não-determinismo
- AI Gateway e Circuit Breaker fornecem resiliência
- HITL garante supervisão humana em decisões críticas
- Multi-variant e Specification-Based Validation melhoram qualidade
- Sandbox e Adapter protegem contra comportamentos inesperados

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Média — padrões fundamentais permanecem, implementações específicas evoluem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — padrões podem ser validados através de testes de integração |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada — arquiteto responsável por escolha e configuração dos padrões |

## References

1. Turchi, T.; Dix, A.; Roach, M.; Malizia, A.; Wilson, B. "Designing and Building Hybrid Human–AI Systems." SYNERGY Workshop, HHAI 2025. https://ceur-ws.org/Vol-4074/preface9.pdf

2. Nguyen, A.; Järvelä, S.; Cukurova, M.; et al. "Hybrid Intelligence: Human-AI Collaboration and Learning." LAK'25 Workshop, Dublin, 2025. https://sites.google.com/view/hilak

3. Gamma, E.; Helm, R.; Johnson, R.; Vlissides, J. "Design Patterns: Elements of Reusable Object-Oriented Software." Addison-Wesley, 1994.

4. Nygard, M. T. "Release It!: Design and Deploy Production-Ready Software." Pragmatic Bookshelf, 2018.

5. Hohpe, G.; Woolf, B. "Enterprise Integration Patterns." Addison-Wesley, 2003.

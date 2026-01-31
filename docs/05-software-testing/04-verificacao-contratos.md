---
title: "Verificacao de Contratos e Invariantes"
created_at: "2025-01-31"
tags: ["software-testing", "contratos", "invariantes", "design-by-contract", "runtime-verification"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5.4 Verificação de Contratos e Invariantes

## Overview

Esta seção apresenta metodologias para especificar e verificar contratos em código gerado por IA. Design by Contract (DbC), tradicionalmente aplicado a software escrito manualmente, é adaptado para o contexto de sistemas híbridos humanos-IA, onde comportamentos podem ser não-determinísticos e especificações frequentemente são incompletas.

O foco está em técnicas de **verificação runtime** que monitoram invariantes críticas durante a execução, garantindo que o sistema mantenha propriedades essenciais mesmo quando componentes de IA produzem comportamentos variáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Especificar** contratos para código gerado por IA
2. **Implementar** verificação runtime de invariantes críticas
3. **Adaptar** Design by Contract para sistemas com componentes de IA
4. **Analisar** precondições e pós-condições automaticamente
5. **Detectar** e responder a violações de contrato em tempo real

## Fundamentos de Design by Contract

### Conceitos Tradicionais

Design by Contract (DbC), introduzido por Eiffel [Meyer, 1992], estabelece que componentes de software devem ter contratos formais:

**Componentes de um Contrato:**

1. **Precondições**: O que deve ser verdade antes da execução
2. **Pós-condições**: O que deve ser verdade após a execução
3. **Invariantes**: O que deve ser sempre verdade durante a execução

```python
# Exemplo tradicional de DbC
def withdraw(account, amount):
    """
    Precondição: amount > 0 and amount <= account.balance
    Pós-condição: account.balance == old(account.balance) - amount
    Invariante: account.balance >= 0
    """
    account.balance -= amount
    return account.balance
```

### Desafios com Código de IA

**1. Especificações Incompletas**
- Código gerado pode implementar requisitos implícitos
- Contratos podem não estar totalmente definidos
- Comportamento pode variar entre execuções

**2. Não-Determinismo**
- Mesmas precondições podem levar a diferentes pós-condições
- Invariantes podem ser violados temporariamente durante processamento
- Comportamento depende de contexto e parâmetros do modelo

**3. Oráculos Imperfeitos**
- Difícil definir pós-condições exatas
- Contratos podem ser probabilísticos em vez de determinísticos

## Design by Contract para IA

### Adaptações Necessárias

**1. Contratos Probabilísticos**

Em vez de garantias absolutas, definimos probabilidades:

```python
@contract(
    pre=lambda x: isinstance(x, list) and len(x) > 0,
    post_prob=lambda result, x: sorted(result) == sorted(x),  # 95% das vezes
    confidence=0.95
)
def generated_sort(data):
    return llm.generate(f"Sort: {data}")
```

**2. Invariantes Flexíveis**

Invariantes que permitem variações controladas:

```python
@flexible_invariant(
    condition=lambda self: self.temperature >= 0 and self.temperature <= 100,
    tolerance=0.1  # Permite 10% de variação
)
class TemperatureController:
    pass
```

**3. Precondições de Contexto**

Limites de entrada que o modelo pode processar efetivamente:

```python
@context_contract(
    max_input_length=4000,
    supported_languages=['python', 'javascript', 'java'],
    forbidden_patterns=['import os', 'eval(', 'exec(']
)
def generate_code(prompt: str, language: str):
    """Gera código com restrições de segurança"""
    pass
```

### Framework AgentGuard

Hipotese (requer fonte e avaliacao tecnica): ha propostas recentes de *runtime verification* para agentes de IA baseadas em modelagem probabilistica e atualizacao online. Antes de adotar qualquer framework desse tipo, valide: escopo, suposicoes, custo operacional, evidencias empiricas e compatibilidade com requisitos regulatorios.

**Arquitetura:**
```
Observação do Agente → Abstração em Eventos → MDP Dinâmico 
                                                        ↓
Certificado ← Verificação Probabilística ← Model Checking PMC
```

**Características:**
- Modela comportamento emergente via Markov Decision Processes (MDPs)
- Usa Online Learning para atualizar modelo dinamicamente
- Verifica propriedades quantitativas em tempo real via Probabilistic Model Checking (PMC)

## Especificação de Contratos

### Contratos de Entrada/Saída

**1. Validação de Tipos e Formatos**

```python
from dataclasses import dataclass
from typing import Optional

@dataclass
class CodeGenerationContract:
    """Contrato para geração de código"""
    
    # Precondições
    max_prompt_length: int = 4000
    allowed_languages: list = None
    required_context: list = None
    
    # Pós-condições
    must_compile: bool = True
    max_complexity: int = 10  # McCabe complexity
    required_tests: int = 3
    
    # Invariantes
    no_infinite_loops: bool = True
    no_recursive_calls_without_base: bool = True
    
    def validate_preconditions(self, prompt: str, context: dict) -> bool:
        """Valida precondições antes da geração"""
        checks = [
            len(prompt) <= self.max_prompt_length,
            all(ctx in context for ctx in (self.required_context or []))
        ]
        return all(checks)
    
    def validate_postconditions(self, generated_code: str) -> dict:
        """Valida pós-condições após geração"""
        results = {
            'compiles': self._check_compilation(generated_code),
            'complexity': self._calculate_complexity(generated_code),
            'test_count': self._count_tests(generated_code)
        }
        return results
```

**2. Contratos de Segurança**

```python
class SecurityContract:
    """Contrato de segurança para código gerado"""
    
    FORBIDDEN_PATTERNS = [
        r'import\s+os\s*;?\s*os\.system',
        r'eval\s*\(',
        r'exec\s*\(',
        r'subprocess\.call',
        r'__import__',
        r'compile\s*\(',
    ]
    
    REQUIRED_PATTERNS = [
        r'input\s+validation',
        r'error\s+handling',
    ]
    
    @staticmethod
    def check_security(code: str) -> dict:
        """Verifica contratos de segurança"""
        import re
        
        violations = []
        for pattern in SecurityContract.FORBIDDEN_PATTERNS:
            if re.search(pattern, code, re.IGNORECASE):
                violations.append(f"Padrão proibido encontrado: {pattern}")
        
        missing = []
        for pattern in SecurityContract.REQUIRED_PATTERNS:
            if not re.search(pattern, code, re.IGNORECASE):
                missing.append(f"Padrão obrigatório ausente: {pattern}")
        
        return {
            'secure': len(violations) == 0,
            'violations': violations,
            'missing': missing,
            'score': max(0, 100 - len(violations) * 20 - len(missing) * 10)
        }
```

### Contratos Semânticos

**1. Preservação de Semântica**

```python
class SemanticContract:
    """Garante que transformações preservam semântica"""
    
    @staticmethod
    def equivalence_test(original_code: str, transformed_code: str, test_cases: list) -> bool:
        """Testa equivalência semântica via casos de teste"""
        original_results = [execute(original_code, tc) for tc in test_cases]
        transformed_results = [execute(transformed_code, tc) for tc in test_cases]
        
        return all(
            o == t or are_equivalent(o, t)
            for o, t in zip(original_results, transformed_results)
        )
```

**2. Contratos de Performance**

```python
@performance_contract(
    max_time_ms=1000,
    max_memory_mb=512,
    max_cpu_percent=80
)
def optimized_function(data):
    """Função com garantias de performance"""
    pass
```

## Verificação Runtime de Invariantes

### Monitoramento Contínuo

**1. Invariantes de Estado**

```python
class RuntimeInvariantChecker:
    def __init__(self):
        self.invariants = []
        self.violations = []
    
    def add_invariant(self, name: str, condition: callable, critical: bool = True):
        """Registra um invariante para monitoramento"""
        self.invariants.append({
            'name': name,
            'condition': condition,
            'critical': critical,
            'violation_count': 0
        })
    
    def check_all(self, context: dict) -> list:
        """Verifica todos os invariantes"""
        violations = []
        
        for inv in self.invariants:
            try:
                if not inv['condition'](context):
                    inv['violation_count'] += 1
                    violation = {
                        'invariant': inv['name'],
                        'critical': inv['critical'],
                        'context': context,
                        'timestamp': time.time()
                    }
                    violations.append(violation)
                    
                    if inv['critical']:
                        self._handle_critical_violation(violation)
            except Exception as e:
                # Invariante que lança exceção é considerado violado
                violations.append({
                    'invariant': inv['name'],
                    'error': str(e),
                    'critical': inv['critical']
                })
        
        return violations
    
    def _handle_critical_violation(self, violation: dict):
        """Responde a violação crítica"""
        logging.error(f"CRITICAL INVARIANT VIOLATION: {violation}")
        
        # Estratégias de resposta:
        # 1. Rollback
        # 2. Fallback para implementação segura
        # 3. Alerta e intervenção humana
        # 4. Terminação controlada
```

**2. Invariantes Temporais**

```python
class TemporalInvariantChecker:
    """Verifica invariantes ao longo do tempo"""
    
    def __init__(self, window_size: int = 100):
        self.window_size = window_size
        self.history = []
    
    def record(self, state: dict):
        """Registra estado para análise temporal"""
        self.history.append({
            'timestamp': time.time(),
            'state': state
        })
        
        # Manter apenas janela recente
        if len(self.history) > self.window_size:
            self.history.pop(0)
    
    def check_temporal_invariant(self, invariant_fn: callable) -> bool:
        """Verifica invariante sobre a janela temporal"""
        return all(
            invariant_fn(h['state']) for h in self.history
        )
    
    def detect_drift(self, baseline: dict, threshold: float = 0.1) -> dict:
        """Detecta drift em relação a baseline"""
        if len(self.history) < 10:
            return {'drift_detected': False, 'reason': 'insufficient_data'}
        
        current = self._aggregate_state(self.history[-10:])
        drift = self._calculate_drift(baseline, current)
        
        return {
            'drift_detected': drift > threshold,
            'drift_magnitude': drift,
            'baseline': baseline,
            'current': current
        }
```

### Fail-Safe e Recuperação

**1. Estratégias de Falha Segura**

```python
class FailSafeManager:
    """Gerencia falhas seguras quando invariantes são violados"""
    
    STRATEGIES = {
        'rollback': 'rollback_to_last_known_good',
        'fallback': 'use_fallback_implementation',
        'degrade': 'degrade_functionality',
        'alert': 'alert_and_wait_human',
        'terminate': 'graceful_termination'
    }
    
    def __init__(self, strategy: str = 'fallback'):
        self.strategy = strategy
        self.fallback_implementations = {}
    
    def register_fallback(self, function_name: str, fallback_fn: callable):
        """Registra implementação de fallback"""
        self.fallback_implementations[function_name] = fallback_fn
    
    def handle_violation(self, violation: dict, context: dict):
        """Executa estratégia de falha segura"""
        
        if self.strategy == 'rollback':
            return self._rollback(context)
        elif self.strategy == 'fallback':
            return self._fallback(context)
        elif self.strategy == 'degrade':
            return self._degrade(context)
        elif self.strategy == 'alert':
            return self._alert_and_wait(context)
        elif self.strategy == 'terminate':
            return self._terminate(context)
    
    def _fallback(self, context: dict):
        """Usa implementação de fallback"""
        function_name = context.get('function_name')
        fallback_fn = self.fallback_implementations.get(function_name)
        
        if fallback_fn:
            logging.warning(f"Using fallback for {function_name}")
            return fallback_fn(**context.get('args', {}))
        else:
            raise RuntimeError(f"No fallback available for {function_name}")
```

**2. Circuit Breaker para Componentes de IA**

```python
class CircuitBreaker:
    """Circuit breaker para chamadas a modelos de IA"""
    
    def __init__(
        self,
        failure_threshold: int = 5,
        recovery_timeout: int = 60,
        half_open_max_calls: int = 3
    ):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max_calls = half_open_max_calls
        
        self.state = 'CLOSED'  # CLOSED, OPEN, HALF_OPEN
        self.failure_count = 0
        self.last_failure_time = None
        self.half_open_calls = 0
    
    def call(self, fn: callable, *args, **kwargs):
        """Executa função com proteção de circuit breaker"""
        
        if self.state == 'OPEN':
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = 'HALF_OPEN'
                self.half_open_calls = 0
            else:
                raise CircuitBreakerOpen("Circuit breaker is OPEN")
        
        if self.state == 'HALF_OPEN' and self.half_open_calls >= self.half_open_max_calls:
            raise CircuitBreakerOpen("Circuit breaker HALF_OPEN limit reached")
        
        try:
            if self.state == 'HALF_OPEN':
                self.half_open_calls += 1
            
            result = fn(*args, **kwargs)
            
            # Sucesso: resetar estado
            if self.state == 'HALF_OPEN':
                self.state = 'CLOSED'
                self.failure_count = 0
            
            return result
            
        except Exception as e:
            self._record_failure()
            raise e
    
    def _record_failure(self):
        """Registra falha"""
        self.failure_count += 1
        self.last_failure_time = time.time()
        
        if self.failure_count >= self.failure_threshold:
            self.state = 'OPEN'
            logging.error(f"Circuit breaker OPENED after {self.failure_count} failures")
```

## Análise Automática de Precondições e Pós-condições

### Extração Automática

**1. Extração de Contratos via LLM**

```python
class ContractExtractor:
    """Extrai contratos de código via análise com LLM"""
    
    def __init__(self, llm_client):
        self.llm = llm_client
    
    def extract_contracts(self, code: str, function_name: str) -> dict:
        """Extrai precondições e pós-condições do código"""
        
        prompt = f"""
        Analise a função '{function_name}' no código abaixo e extraia:
        1. Precondições: O que deve ser verdade antes da chamada
        2. Pós-condições: O que é garantido após a execução
        3. Invariantes: O que permanece verdadeiro durante a execução
        4. Efeitos colaterais: Quaisquer modificações no estado
        
        Código:
        ```python
        {code}
        ```
        
        Retorne em formato JSON:
        {{
            "preconditions": ["cond1", "cond2", ...],
            "postconditions": ["cond1", "cond2", ...],
            "invariants": ["inv1", "inv2", ...],
            "side_effects": ["effect1", "effect2", ...]
        }}
        """
        
        response = self.llm.generate(prompt, format='json')
        return json.loads(response)
```

**2. Inferência de Tipos e Restrições**

```python
class TypeConstraintInferer:
    """Infere restrições de tipos via análise estática + LLM"""
    
    def infer_constraints(self, code: str) -> dict:
        """Infere restrições de tipos e valores"""
        
        # Análise estática básica
        import ast
        tree = ast.parse(code)
        
        constraints = {}
        
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                func_constraints = {
                    'params': {},
                    'returns': {}
                }
                
                for arg in node.args.args:
                    # Inferir tipo do nome e uso
                    arg_type = self._infer_type_from_usage(tree, arg.arg)
                    func_constraints['params'][arg.arg] = arg_type
                
                constraints[node.name] = func_constraints
        
        # Refinar com LLM
        refined = self._refine_with_llm(code, constraints)
        return refined
```

### Verificação Automática

**1. Verificador de Contratos**

```python
class ContractVerifier:
    """Verifica contratos em tempo de execução"""
    
    def __init__(self):
        self.contracts = {}
    
    def register_contract(self, function_name: str, contract: dict):
        """Registra contrato para uma função"""
        self.contracts[function_name] = contract
    
    def verify_call(self, function_name: str, args: tuple, kwargs: dict):
        """Verifica precondições antes da chamada"""
        contract = self.contracts.get(function_name)
        if not contract:
            return True
        
        # Verificar precondições
        for precond in contract.get('preconditions', []):
            if not self._evaluate_condition(precond, args, kwargs):
                raise PreconditionViolation(
                    f"Precondition violated: {precond}"
                )
        
        return True
    
    def verify_return(self, function_name: str, result: any, args: tuple, kwargs: dict):
        """Verifica pós-condições após a chamada"""
        contract = self.contracts.get(function_name)
        if not contract:
            return True
        
        context = {
            'result': result,
            'args': args,
            'kwargs': kwargs,
            'old_values': self._capture_old_values(args, kwargs)
        }
        
        for postcond in contract.get('postconditions', []):
            if not self._evaluate_condition(postcond, context):
                raise PostconditionViolation(
                    f"Postcondition violated: {postcond}"
                )
        
        return True
    
    def _evaluate_condition(self, condition: str, context: dict) -> bool:
        """Avalia condicao de contrato.

        Nota: usar `eval()` para avaliar expressoes e um anti-pattern de seguranca.
        Em producao, prefira uma DSL restrita (parser), expressoes pre-compiladas,
        ou validadores tipados.
        """
        try:
            return evaluate_contract_expression(condition, context)  # pseudocodigo
        except Exception as e:
            logging.warning(f"Error evaluating condition '{condition}': {e}")
            return False
```

## Framework RvLLM

### Runtime Verification com Conhecimento de Domínio

O framework **RvLLM** [NeurIPS 2025] permite que especialistas de domínio definam restrições customizadas:

**Linguagem de Especificação ESL:**
```python
# Exemplo de especificação em ESL
specification = """
CONSTRAINT no_sql_injection {
    FORBIDDEN: "SELECT * FROM users WHERE name = '" + user_input + "'"
    ALLOWED: parameterized_query("SELECT * FROM users WHERE name = ?", user_input)
}

CONSTRAINT response_format {
    MUST_MATCH: r'\{[\s\S]*\}'  # Deve ser JSON válido
    MAX_LENGTH: 1000
}
"""
```

**Verificação Runtime:**
```python
from rvllm import RvLLMVerifier

verifier = RvLLMVerifier()
verifier.load_specification(specification)

# Verificar output do LLM
result = verifier.verify(llm_output)
if not result.valid:
    print(f"Violations: {result.violations}")
    # Follow-up query para correção
    corrected = verifier.suggest_correction(llm_output, result.violations)
```

## Practical Considerations

### Aplicações Reais

**1. Sistema de Geração de Código Enterprise**

```python
# Configuração de contratos para sistema enterprise
enterprise_contracts = {
    'security': SecurityContract(),
    'performance': PerformanceContract(max_time_ms=500),
    'quality': QualityContract(min_test_coverage=0.8),
    'compliance': ComplianceContract(standards=['ISO27001', 'GDPR'])
}

# Pipeline de verificação
def generate_with_verification(prompt: str):
    # 1. Verificar precondições
    for contract in enterprise_contracts.values():
        contract.validate_preconditions(prompt)
    
    # 2. Gerar código
    code = llm.generate(prompt)
    
    # 3. Verificar pós-condições
    for name, contract in enterprise_contracts.items():
        result = contract.validate_postconditions(code)
        if not result.valid:
            logging.error(f"Contract violation: {name}")
            code = contract.repair(code, result.violations)
    
    return code
```

**2. Monitoramento de Agentes Autônomos**

```python
# Configurar monitoramento para agente
monitor = RuntimeInvariantChecker()

# Invariantes críticas
monitor.add_invariant(
    'no_infinite_loop',
    lambda ctx: ctx['execution_time'] < 30,
    critical=True
)

monitor.add_invariant(
    'api_rate_limit',
    lambda ctx: ctx['api_calls_per_minute'] < 100,
    critical=True
)

monitor.add_invariant(
    'data_integrity',
    lambda ctx: ctx['checksum'] == calculate_checksum(ctx['data']),
    critical=True
)

# Verificar durante execução do agente
while agent.is_running():
    context = agent.get_current_context()
    violations = monitor.check_all(context)
    
    if violations:
        fail_safe.handle_violations(violations, context)
```

### Limitações

1. **Overhead de runtime**: Verificação contínua impacta performance
2. **Contratos incompletos**: Difícil especificar todos os comportamentos esperados
3. **Falsos positivos**: Verificação pode rejeitar comportamentos válidos
4. **Complexidade de manutenção**: Contratos precisam evoluir com o sistema

### Melhores Práticas

1. **Priorize invariantes críticos**: Foque em segurança e integridade de dados
2. **Use verificação em camadas**: Estática + Runtime + Periódica
3. **Implemente fail-safes**: Sempre tenha plano B para violações
4. **Monitore taxa de violação**: Tendências indicam problemas sistêmicos
5. **Documente contratos**: Tornar explícito o comportamento esperado
6. **Automatize extração**: Use LLMs para sugerir contratos, mas revise manualmente

### Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary

- **Design by Contract para IA** requer adaptações: contratos probabilísticos, invariantes flexíveis, e precondições de contexto
- **Verificação runtime** monitora invariantes durante execução, com estratégias de fail-safe para violações
- **Frameworks modernos** como AgentGuard e RvLLM oferecem verificação probabilística e especificação por domínio
- **Análise automática** pode extrair contratos de código existente, mas requer revisão humana
- **Circuit breakers e fail-safes** são essenciais para lidar com falhas de componentes de IA

## References

1. Meyer, B. "Applying 'Design by Contract'." IEEE Computer, 1992.

2. "AgentGuard: Runtime Verification of AI Agents." arXiv:2509.23864, 2025.

3. "A DbC Inspired Neurosymbolic Layer for Trustworthy Agent Design." arXiv:2508.03665, 2025.

4. "RvLLM: LLM Runtime Verification with Domain Knowledge." NeurIPS 2025.

5. "Agent Contracts: Structured Framework for AI Behavior." GitHub: relari-ai/agent-contracts, 2025.

6. "End-to-End AI Generated Runtime Verification from Natural Language Specification." Springer, 2024.

7. "Taming Silent Failures: A Framework for Verifiable AI Reliability." arXiv:2510.22224, 2025.

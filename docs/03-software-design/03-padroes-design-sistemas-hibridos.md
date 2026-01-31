# Seção 3: Padrões de Design para Sistemas Híbridos

## Overview

Esta seção organiza padrões de design para combinar componentes determinísticos e componentes de IA sem misturar domínios, mantendo contratos e mecanismos de contenção.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Selecionar padrões de design para fronteiras entre componentes determinísticos e estocásticos
2. Definir responsabilidades claras e evitar acoplamento semântico com prompts/modelos
3. Incorporar fallback e observabilidade como elementos de design

## 3.1 Introdução

Padrões de design tradicionais foram concebidos para sistemas determinísticos onde comportamento é previsível e componentes interagem através de interfaces bem definidas. Na era dos LLMs, novos desafios emergem: componentes geram comportamentos dinamicamente, a confiança nas saídas varia, e sistemas precisam degradar graciosamente quando a IA falha.

Esta seção apresenta padrões de design específicos para sistemas híbridos, focando em confiabilidade, verificabilidade e integração entre componentes determinísticos e estocásticos.

## 3.2 Padrões de Confiabilidade

### 3.2.1 Padrão: Adapter de Confiança (Confidence Adapter)

```python
from typing import TypeVar, Generic, Optional
from dataclasses import dataclass
from enum import Enum

T = TypeVar('T')

class ConfidenceLevel(Enum):
    CERTAIN = (0.95, "green")
    LIKELY = (0.80, "blue")
    UNCERTAIN = (0.60, "yellow")
    DOUBTFUL = (0.40, "orange")
    UNRELIABLE = (0.0, "red")

@dataclass
class ConfidentResult(Generic[T]):
    """
    Resultado encapsulado com metadados de confiança.
    """
    value: T
    confidence: float
    confidence_level: ConfidenceLevel
    reasoning: str
    alternative_results: list
    fallback_available: bool

class ConfidenceAdapter(Generic[T]):
    """
    Adapta componentes de IA para retornar resultados
    com informação de confiança calibrada.
    """
    
    def __init__(self,
                 llm_component,
                 confidence_calibrator,
                 fallback_strategy):
        self.llm = llm_component
        self.calibrator = confidence_calibrator
        self.fallback = fallback_strategy
    
    async def execute(self, input_data: dict) -> ConfidentResult[T]:
        """
        Executa com calibração de confiança.
        """
        # Obter resposta bruta do LLM
        raw_response = await self.llm.generate(input_data)
        
        # Calibrar confiança
        calibrated_confidence = self.calibrator.calibrate(
            raw_response,
            input_data
        )
        
        # Determinar nível
        level = self._determine_level(calibrated_confidence)
        
        # Gerar alternativas para baixa confiança
        alternatives = []
        if level in [ConfidenceLevel.UNCERTAIN, ConfidenceLevel.DOUBTFUL]:
            alternatives = await self._generate_alternatives(input_data)
        
        return ConfidentResult(
            value=raw_response['content'],
            confidence=calibrated_confidence,
            confidence_level=level,
            reasoning=raw_response.get('reasoning', ''),
            alternative_results=alternatives,
            fallback_available=self.fallback.is_available()
        )
    
    def _determine_level(self, confidence: float) -> ConfidenceLevel:
        """Determina nível de confiança."""
        for level in ConfidenceLevel:
            if confidence >= level.value[0]:
                return level
        return ConfidenceLevel.UNRELIABLE
```

### 3.2.2 Padrão: Ensemble com Votação

```python
from typing import List, Dict
from collections import Counter

class EnsembleProcessor:
    """
    Combina múltiplos modelos para aumentar confiabilidade.
    """
    
    def __init__(self, models: List, voting_strategy: str = "majority"):
        self.models = models
        self.voting = voting_strategy
    
    async def process(self, input_data: dict) -> EnsembleResult:
        """
        Processa com múltiplos modelos e agrega resultados.
        """
        # Coletar respostas
        responses = []
        for model in self.models:
            try:
                response = await model.generate(input_data)
                responses.append({
                    'model': model.name,
                    'output': response['content'],
                    'confidence': response.get('confidence', 0.5)
                })
            except Exception as e:
                responses.append({
                    'model': model.name,
                    'error': str(e),
                    'confidence': 0.0
                })
        
        # Analisar consenso
        if self.voting == "majority":
            return self._majority_vote(responses)
        elif self.voting == "weighted":
            return self._weighted_vote(responses)
        elif self.voting == "consensus":
            return self._consensus_vote(responses)
    
    def _majority_vote(self, responses: List[Dict]) -> EnsembleResult:
        """Votação majoritária simples."""
        valid = [r for r in responses if 'output' in r]
        outputs = [r['output'] for r in valid]
        
        counter = Counter(outputs)
        most_common = counter.most_common(1)[0]
        
        agreement_rate = most_common[1] / len(valid)
        
        return EnsembleResult(
            output=most_common[0],
            agreement_rate=agreement_rate,
            dissenting_opinions=[o for o in outputs if o != most_common[0]],
            models_consulted=len(responses),
            models_agreed=most_common[1]
        )
```

### 3.2.3 Padrão: Circuit Breaker com Degradação

```python
from enum import Enum, auto
from typing import Optional
import time

class CircuitState(Enum):
    CLOSED = auto()      # Funcionamento normal
    OPEN = auto()        # Falha detectada
    HALF_OPEN = auto()   # Testando recuperação
    DEGRADED = auto()    # Funcionamento limitado

class DegradingCircuitBreaker:
    """
    Circuit breaker que degrada funcionalidade em vez de
    falhar completamente.
    """
    
    def __init__(self,
                 failure_threshold: int = 5,
                 recovery_timeout: float = 60.0,
                 degradation_levels: List[callable] = None):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.degradation_levels = degradation_levels or [
            self._full_functionality,
            self._reduced_functionality,
            self._minimal_functionality,
            self._fallback_only
        ]
        
        self.state = CircuitState.CLOSED
        self.failure_count = 0
        self.current_level = 0
        self.last_failure_time: Optional[float] = None
    
    async def call(self, 
                   primary_func: callable,
                   input_data: dict) -> Result:
        """
        Executa função com degradação progressiva.
        """
        if self.state == CircuitState.OPEN:
            if self._should_attempt_recovery():
                self.state = CircuitState.HALF_OPEN
            else:
                return self._degraded_response(input_data)
        
        try:
            result = await primary_func(input_data)
            self._on_success()
            return result
            
        except Exception as e:
            self._on_failure()
            
            # Tentar nível de degradação atual
            if self.current_level < len(self.degradation_levels) - 1:
                self.current_level += 1
                return await self.degradation_levels[self.current_level](input_data)
            else:
                raise e
    
    def _degraded_response(self, input_data: dict) -> Result:
        """Gera resposta em estado degradado."""
        return Result(
            content="Serviço temporariamente indisponível. "
                   "Por favor, tente novamente mais tarde.",
            confidence=0.0,
            degraded=True
        )
```

## 3.3 Padrões de Verificação

### 3.3.1 Padrão: Property-Based Testing Interface

```python
from hypothesis import given, strategies as st
from typing import Callable, List

class VerifiableComponent:
    """
    Componente com propriedades verificáveis.
    """
    
    def __init__(self, implementation: Callable):
        self.impl = implementation
        self.properties: List[Callable] = []
    
    def add_property(self, property_fn: Callable) -> 'VerifiableComponent':
        """Adiciona propriedade a ser verificada."""
        self.properties.append(property_fn)
        return self
    
    def verify(self, test_cases: int = 100) -> VerificationReport:
        """
        Verifica todas as propriedades.
        """
        results = []
        
        for prop in self.properties:
            try:
                # Executar property-based test
                prop()
                results.append({
                    'property': prop.__name__,
                    'passed': True
                })
            except AssertionError as e:
                results.append({
                    'property': prop.__name__,
                    'passed': False,
                    'counterexample': str(e)
                })
        
        return VerificationReport(
            all_passed=all(r['passed'] for r in results),
            property_results=results
        )

# Exemplo: Validador de email verificável
class EmailValidator(VerifiableComponent):
    
    def __init__(self):
        super().__init__(self._validate)
        
        # Adicionar propriedades
        self.add_property(self._prop_valid_email_accepted)
        self.add_property(self._prop_invalid_email_rejected)
        self.add_property(self._prop_idempotence)
    
    def _validate(self, email: str) -> ValidationResult:
        # Implementação...
        pass
    
    @given(st.emails())
    def _prop_valid_email_accepted(self, email: str):
        """Propriedade: emails válidos são aceitos."""
        result = self.impl(email)
        assert result.is_valid, f"Email válido {email} foi rejeitado"
    
    @given(st.text())
    def _prop_invalid_email_rejected(self, text: str):
        """Propriedade: strings inválidas são rejeitadas."""
        if '@' not in text or '.' not in text:
            result = self.impl(text)
            assert not result.is_valid
```

### 3.3.2 Padrão: Golden Master Testing

```python
import hashlib
import json
from typing import Dict, List

class GoldenMaster:
    """
    Captura e compara comportamento contra baseline aprovado.
    """
    
    def __init__(self, component_name: str):
        self.component = component_name
        self.baseline: Dict[str, str] = {}
    
    def capture(self, 
                input_data: dict, 
                output: any,
                approved: bool = False) -> str:
        """
        Captura caso de teste.
        """
        case_id = self._generate_id(input_data)
        
        snapshot = {
            'input': input_data,
            'output': output,
            'hash': self._hash_result(output),
            'approved': approved
        }
        
        self.baseline[case_id] = snapshot
        return case_id
    
    def verify(self, 
               case_id: str, 
               current_output: any) -> ComparisonResult:
        """
        Verifica saída atual contra baseline.
        """
        if case_id not in self.baseline:
            return ComparisonResult(
                status='NEW',
                message='Caso novo, requer aprovação'
            )
        
        baseline = self.baseline[case_id]
        current_hash = self._hash_result(current_output)
        
        if current_hash == baseline['hash']:
            return ComparisonResult(
                status='PASSED',
                message='Saída idêntica ao baseline'
            )
        else:
            return ComparisonResult(
                status='CHANGED',
                message='Saída diferente do baseline',
                diff=self._generate_diff(baseline['output'], current_output)
            )
    
    def approve(self, case_id: str):
        """Aprova caso como novo baseline."""
        if case_id in self.baseline:
            self.baseline[case_id]['approved'] = True
```

## 3.4 Padrões de Integração

### 3.4.1 Padrão: Anti-Corruption Layer para IA

```python
from typing import TypeVar, Generic

T = TypeVar('T')

class AntiCorruptionLayer(Generic[T]):
    """
    Camada que protege domínio de influência direta
    de componentes de IA.
    """
    
    def __init__(self,
                 validator: Callable[[T], bool],
                 sanitizer: Callable[[T], T],
                 fallback: Callable[[], T]):
        self.validator = validator
        self.sanitizer = sanitizer
        self.fallback = fallback
    
    def process(self, raw_ia_output: T) -> T:
        """
        Processa saída de IA aplicando validações.
        """
        # Sanitizar primeiro
        sanitized = self.sanitizer(raw_ia_output)
        
        # Validar
        if self.validator(sanitized):
            return sanitized
        else:
            # Log da violação
            self._log_validation_failure(raw_ia_output)
            return self.fallback()
    
    def _log_validation_failure(self, raw: T):
        """Registra tentativa de violação."""
        logger.warning(
            f"Anti-corruption layer blocked invalid output: {raw}"
        )
```

### 3.4.2 Padrão: Saga Pattern para Orquestração

```python
from typing import List, Callable
from dataclasses import dataclass
from enum import Enum

class SagaStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    COMPENSATING = "compensating"
    FAILED = "failed"

@dataclass
class SagaStep:
    name: str
    action: Callable
    compensation: Callable
    ia_based: bool = False

class SagaOrchestrator:
    """
    Orquestra transações distribuídas com suporte a
    compensação para componentes de IA.
    """
    
    def __init__(self):
        self.steps: List[SagaStep] = []
        self.completed_steps: List[SagaStep] = []
        self.status = SagaStatus.PENDING
    
    def add_step(self, step: SagaStep) -> 'SagaOrchestrator':
        self.steps.append(step)
        return self
    
    async def execute(self, context: dict) -> SagaResult:
        """
        Executa saga com suporte a compensação.
        """
        for step in self.steps:
            try:
                # Para passos de IA, adicionar validação extra
                if step.ia_based:
                    pre_validation = await self._validate_ia_step(step, context)
                    if not pre_validation.valid:
                        raise IAStepValidationError(pre_validation.reason)
                
                result = await step.action(context)
                self.completed_steps.append(step)
                context.update(result)
                
            except Exception as e:
                self.status = SagaStatus.COMPENSATING
                await self._compensate()
                self.status = SagaStatus.FAILED
                return SagaResult.failure(e, step.name)
        
        self.status = SagaStatus.COMPLETED
        return SagaResult.success(context)
    
    async def _compensate(self):
        """Executa compensação em ordem reversa."""
        for step in reversed(self.completed_steps):
            try:
                await step.compensation()
            except Exception as e:
                logger.error(f"Compensation failed for {step.name}: {e}")
```

## 3.5 Exercícios

1. Implemente um `ConfidenceAdapter` para um classificador de sentimentos, incluindo calibração de confiança.

2. Projete um `EnsembleProcessor` que combine resultados de 3 modelos diferentes de LLM para uma tarefa de sumarização.

3. Crie um `SagaOrchestrator` para um fluxo de processamento de pedidos onde um dos passos utiliza IA para validação de fraudes.

## Practical Considerations

- Prefira padrões que permitam substituir/atualizar modelos sem reescrever o core.
- Evite misturar lógica crítica com heurísticas probabilísticas; use adaptadores e contratos.

## Summary

- Padrões de design para sistemas híbridos reduzem acoplamento e aumentam verificabilidade.
- Fallback, observabilidade e contratos são parte do design, não “features” posteriores.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. ACM FSE 2025. From Prompts to Properties: Rethinking LLM Code Generation with Property-Based Testing. Proceedings of the 33rd ACM International Conference on the Foundations of Software Engineering, 2025. DOI: 10.1145/3696630.3728702

3. ANTHROPIC. Property-Based Testing with Claude. Anthropic Research, 2025. Disponível em: https://red.anthropic.com/2026/property-based-testing/

4. MAAZ, M. et al. Agentic Property-Based Testing: Finding Bugs Across the Python Ecosystem. arXiv:2510.09907, 2025.

5. HE, L. et al. Use Property-Based Testing to Bridge LLM Code Generation and Validation. arXiv:2506.18315, 2025.

6. VIKRAM, V. et al. Can Large Language Models Write Good Property-Based Tests? arXiv:2307.04346, 2023 (revised 2024).

---

*SWEBOK-AI v5.0 - Software Design*

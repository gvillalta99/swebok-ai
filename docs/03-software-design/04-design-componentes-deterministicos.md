# Seção 4: Design de Componentes Determinísticos

## Overview

Esta seção detalha como projetar o core determinístico em sistemas híbridos: componentes que precisam de garantias fortes, comportamento reprodutível e evidência objetiva.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Identificar quais componentes devem permanecer determinísticos por risco e compliance
2. Definir interfaces, invariantes e contratos que blindem o core de variabilidade
3. Projetar mecanismos de validação que rejeitem saídas fora de contrato

## 4.1 Introdução

Em sistemas híbridos, componentes determinísticos representam os alicerces de confiabilidade. São as partes do sistema onde comportamento é previsível, verificável e auditável. O design adequado desses componentes é crítico para garantir que, mesmo quando componentes de IA falham ou produzem resultados inesperados, o sistema mantenha integridade.

Esta seção foca em padrões e princípios para design de componentes determinísticos que servem como ancoragem em arquiteturas híbridas.

## 4.2 Características de Componentes Determinísticos

### 4.2.1 Definição Formal

Um componente é considerado **determinístico** quando:

1. Para mesmas entradas, sempre produz mesmas saídas (referential transparency)
2. Não possui efeitos colaterais não explicitados
3. Comportamento pode ser verificado através de testes unitários
4. Não depende de serviços externos não-determinísticos

```python
from typing import TypeVar, Callable
from functools import wraps

T = TypeVar('T')
R = TypeVar('R')

def deterministic(func: Callable[[T], R]) -> Callable[[T], R]:
    """
    Decorador que marca função como determinística.
    Inclui verificações em tempo de desenvolvimento.
    """
    @wraps(func)
    def wrapper(input_data: T) -> R:
        # Em modo de desenvolvimento, verificar pureza
        if DEVELOPMENT_MODE:
            _verify_no_global_state(func)
            _verify_no_io(func)
        
        return func(input_data)
    
    wrapper._is_deterministic = True
    return wrapper

# Exemplo
@deterministic
def calculate_discount(price: Decimal, 
                       customer_tier: str) -> Decimal:
    """
    Cálculo determinístico de desconto.
    Mesmas entradas = mesma saída, sempre.
    """
    rates = {
        'bronze': Decimal('0.05'),
        'silver': Decimal('0.10'),
        'gold': Decimal('0.15'),
        'platinum': Decimal('0.20')
    }
    
    rate = rates.get(customer_tier, Decimal('0'))
    return price * (Decimal('1') - rate)
```

### 4.2.2 Taxonomia de Determinismo

```
┌─────────────────────────────────────────────────────────────────┐
│              ESPECTRO DE DETERMINISMO                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PURAMENTE FUNCIONAL                                            │
│  ├── Saída depende apenas de entradas                          │
│  ├── Sem estado interno                                        │
│  ├── Sem efeitos colaterais                                    │
│  └── Exemplo: Funções matemáticas puras                        │
│                                                                 │
│  FUNCIONAL COM ESTADO IMUTÁVEL                                  │
│  ├── Usa dados de configuração imutável                        │
│  ├── Sem mutação de estado                                     │
│  ├── Cache interno permitido se transparente                   │
│  └── Exemplo: Lookup tables, configurações                     │
│                                                                 │
│  DETERMINÍSTICO COM ESTADO CONTROLADO                           │
│  ├── Mantém estado interno                                     │
│  ├── Estado é previsível e inicializável                       │
│  ├── Transições de estado são determinísticas                  │
│  └── Exemplo: Máquinas de estado, acumuladores                 │
│                                                                 │
│  DETERMINÍSTICO COM DEPENDÊNCIAS EXTERNAS                       │
│  ├── Dependências são injetadas                                │
│  ├── Comportamento previsível dadas dependências               │
│  └── Exemplo: Repositórios com conexão injetada                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 4.3 Padrões de Design

### 4.3.1 Padrão: Pure Core, Imperative Shell

```python
from typing import Tuple
from dataclasses import dataclass

@dataclass(frozen=True)
class Order:
    """Entidade imutável (núcleo puro)."""
    id: str
    items: Tuple[OrderItem, ...]
    customer_id: str
    total: Decimal

class OrderProcessor:
    """
    Shell imperativo que orquestra núcleo puro.
    Responsável por I/O, o núcleo por lógica de negócio.
    """
    
    def __init__(self, repository, payment_gateway, notifier):
        self.repo = repository
        self.payment = payment_gateway
        self.notifier = notifier
    
    def process_order(self, order_id: str) -> ProcessingResult:
        """
        Método de orquestração (imperativo).
        """
        # I/O: Buscar dados
        order_data = self.repo.find_by_id(order_id)
        
        # Criar entidade pura
        order = Order(
            id=order_data['id'],
            items=tuple(OrderItem(**i) for i in order_data['items']),
            customer_id=order_data['customer_id'],
            total=Decimal(order_data['total'])
        )
        
        # Lógica pura
        calculation = self._calculate_with_tax(order)
        
        # Validar regras puramente
        validation = self._validate_order(calculation)
        if not validation.is_valid:
            return ProcessingResult.failure(validation.errors)
        
        # I/O: Processar pagamento
        payment_result = self.payment.charge(
            calculation.final_total,
            order.customer_id
        )
        
        if not payment_result.success:
            return ProcessingResult.failure(['payment_failed'])
        
        # I/O: Persistir
        self.repo.update_status(order.id, 'paid')
        
        # I/O: Notificar
        self.notifier.send_confirmation(order.customer_id, order.id)
        
        return ProcessingResult.success(calculation)
    
    @staticmethod
    def _calculate_with_tax(order: Order) -> OrderCalculation:
        """
        Função pura: cálculo de impostos.
        Facilmente testável, sem mocks.
        """
        subtotal = sum(item.price * item.quantity for item in order.items)
        tax_rate = Decimal('0.18')  # ICMS
        tax = subtotal * tax_rate
        
        return OrderCalculation(
            subtotal=subtotal,
            tax=tax,
            final_total=subtotal + tax
        )
    
    @staticmethod
    def _validate_order(calc: OrderCalculation) -> ValidationResult:
        """
        Função pura: validação.
        """
        errors = []
        
        if calc.final_total <= 0:
            errors.append("Total deve ser positivo")
        
        if calc.final_total > Decimal('100000'):
            errors.append("Excede limite por transação")
        
        return ValidationResult(
            is_valid=len(errors) == 0,
            errors=errors
        )
```

### 4.3.2 Padrão: Algebraic Data Types para Modelagem

```python
from typing import Union
from dataclasses import dataclass
from enum import Enum, auto

# Sum Types (Tagged Unions)
class PaymentMethod:
    pass

@dataclass(frozen=True)
class CreditCard(PaymentMethod):
    number: str  # Tokenizado
    expiry: str
    cvv_token: str

@dataclass(frozen=True)
class BankTransfer(PaymentMethod):
    account_number: str
    bank_code: str

@dataclass(frozen=True)
class Pix(PaymentMethod):
    key: str
    key_type: str

# Uso com pattern matching
class PaymentProcessor:
    
    def process(self, method: PaymentMethod, amount: Decimal) -> PaymentResult:
        """
        Processamento exhaustivo - compilador garante
        que todos os casos são tratados.
        """
        if isinstance(method, CreditCard):
            return self._process_credit_card(method, amount)
        elif isinstance(method, BankTransfer):
            return self._process_bank_transfer(method, amount)
        elif isinstance(method, Pix):
            return self._process_pix(method, amount)
        else:
            # Type safety garantida
            raise ValueError(f"Método desconhecido: {type(method)}")
    
    def _process_credit_card(self, 
                            card: CreditCard, 
                            amount: Decimal) -> PaymentResult:
        # Implementação específica
        pass
    
    def _process_bank_transfer(self,
                              transfer: BankTransfer,
                              amount: Decimal) -> PaymentResult:
        # Implementação específica
        pass
    
    def _process_pix(self, pix: Pix, amount: Decimal) -> PaymentResult:
        # Implementação específica
        pass
```

### 4.3.3 Padrão: Effect System

```python
from typing import Generic, TypeVar
from dataclasses import dataclass

T = TypeVar('T')
E = TypeVar('E')

@dataclass
class Effect(Generic[T, E]):
    """
    Wrapper que explicita efeitos colaterais.
    """
    value: T
    logs: list
    side_effects: list
    error: Optional[E] = None
    
    def map(self, f: Callable[[T], T]) -> 'Effect[T, E]':
        """Transforma valor preservando efeitos."""
        if self.error:
            return self
        return Effect(
            value=f(self.value),
            logs=self.logs,
            side_effects=self.side_effects
        )
    
    def flat_map(self, f: Callable[[T], 'Effect[T, E]']) -> 'Effect[T, E]':
        """Composição de efeitos."""
        if self.error:
            return self
        
        next_effect = f(self.value)
        return Effect(
            value=next_effect.value,
            logs=self.logs + next_effect.logs,
            side_effects=self.side_effects + next_effect.side_effects,
            error=next_effect.error
        )

# Uso explícito de efeitos
def read_file_deterministic(path: str) -> Effect[str, FileError]:
    """
    Leitura de arquivo com efeitos explícitos.
    """
    try:
        with open(path, 'r') as f:
            content = f.read()
        
        return Effect(
            value=content,
            logs=[f"File {path} read successfully"],
            side_effects=[FileReadEffect(path)]
        )
    except FileNotFoundError as e:
        return Effect(
            value="",
            logs=[f"File {path} not found"],
            side_effects=[],
            error=FileError.NotFound(path)
        )
```

## 4.4 Estratégias de Isolamento

### 4.4.1 Isolamento de Efeitos Colaterais

```python
from typing import Protocol
from unittest.mock import Mock

class Clock(Protocol):
    """Abstração para tempo - permite testes determinísticos."""
    def now(self) -> datetime: ...

class RealClock:
    def now(self) -> datetime:
        return datetime.now()

class FrozenClock:
    """Clock congelado para testes."""
    def __init__(self, frozen_time: datetime):
        self._time = frozen_time
    
    def now(self) -> datetime:
        return self._time

class TimeDependentService:
    """
    Serviço que depende de tempo, mas é testável
    de forma determinística.
    """
    
    def __init__(self, clock: Clock):
        self._clock = clock
    
    def is_business_hours(self) -> bool:
        """
        Determinístico: resultado depende do clock injetado.
        """
        now = self._clock.now()
        return 9 <= now.hour < 18 and now.weekday() < 5

# Teste determinístico
def test_is_business_hours():
    # Segunda-feira, 10h
    monday_morning = FrozenClock(
        datetime(2024, 1, 15, 10, 0)
    )
    service = TimeDependentService(monday_morning)
    assert service.is_business_hours() is True
    
    # Domingo, 10h
    sunday_morning = FrozenClock(
        datetime(2024, 1, 14, 10, 0)
    )
    service_sunday = TimeDependentService(sunday_morning)
    assert service_sunday.is_business_hours() is False
```

### 4.4.2 Isolamento de Aleatoriedade

```python
from typing import Protocol
import random

class RandomGenerator(Protocol):
    """Abstração para geração de números aleatórios."""
    def random(self) -> float: ...
    def randint(self, a: int, b: int) -> int: ...
    def choice(self, seq: list) -> any: ...

class SystemRandom:
    """Implementação real usando sistema."""
    def __init__(self):
        self._rng = random.Random()
    
    def random(self) -> float:
        return self._rng.random()
    
    def randint(self, a: int, b: int) -> int:
        return self._rng.randint(a, b)
    
    def choice(self, seq: list) -> any:
        return self._rng.choice(seq)

class SeededRandom:
    """Implementação com seed fixo - determinística."""
    def __init__(self, seed: int):
        self._rng = random.Random(seed)
    
    def random(self) -> float:
        return self._rng.random()
    
    def randint(self, a: int, b: int) -> int:
        return self._rng.randint(a, b)
    
    def choice(self, seq: list) -> any:
        return self._rng.choice(seq)

class LotteryDraw:
    """
    Sorteio que pode ser determinístico em testes.
    """
    
    def __init__(self, rng: RandomGenerator, participants: list):
        self._rng = rng
        self._participants = participants
    
    def draw_winner(self) -> str:
        """Determinístico dado o RNG."""
        return self._rng.choice(self._participants)
    
    def draw_multiple(self, count: int) -> list:
        """Determinístico dado o RNG."""
        return [self._rng.choice(self._participants) 
                for _ in range(count)]

# Teste determinístico
def test_lottery_draw():
    rng = SeededRandom(seed=42)
    lottery = LotteryDraw(rng, ['Alice', 'Bob', 'Charlie'])
    
    # Sempre retorna mesmo resultado com mesma seed
    winner = lottery.draw_winner()
    assert winner == 'Charlie'  # Previsível com seed 42
```

## 4.5 Validação de Determinismo

```python
import hashlib
import inspect
from typing import Callable, Any

class DeterminismValidator:
    """
    Valida que função é determinística através de execuções múltiplas.
    """
    
    def validate(self, 
                func: Callable, 
                test_cases: list,
                executions: int = 10) -> ValidationReport:
        """
        Executa função múltiplas vezes e verifica consistência.
        """
        results = []
        
        for test_input in test_cases:
            outputs = []
            
            for _ in range(executions):
                try:
                    output = func(test_input)
                    outputs.append(self._serialize(output))
                except Exception as e:
                    outputs.append(f"EXCEPTION:{type(e).__name__}")
            
            # Verificar se todas as saídas são idênticas
            is_deterministic = len(set(outputs)) == 1
            
            results.append({
                'input': test_input,
                'deterministic': is_deterministic,
                'unique_outputs': len(set(outputs)),
                'outputs': outputs[:3]  # Amostra
            })
        
        all_deterministic = all(r['deterministic'] for r in results)
        
        return ValidationReport(
            is_deterministic=all_deterministic,
            test_cases=results
        )
    
    def _serialize(self, obj: Any) -> str:
        """Serializa objeto para comparação."""
        try:
            return hashlib.md5(
                str(obj).encode()
            ).hexdigest()[:16]
        except:
            return str(type(obj))
    
    def analyze_source(self, func: Callable) -> SourceAnalysis:
        """
        Analisa código fonte para identificar potenciais
        fontes de não-determinismo.
        """
        source = inspect.getsource(func)
        risks = []
        
        # Padrões de risco
        risk_patterns = {
            'random': 'Uso de aleatoriedade',
            'time': 'Uso de tempo atual',
            'datetime.now': 'Uso de datetime.now()',
            'input(': 'Interação com usuário',
            'open(': 'I/O de arquivo',
            'requests.': 'Chamada de rede',
            'global': 'Acesso a estado global'
        }
        
        for pattern, description in risk_patterns.items():
            if pattern in source:
                risks.append({
                    'pattern': pattern,
                    'description': description,
                    'line': self._find_line(source, pattern)
                })
        
        return SourceAnalysis(
            has_risks=len(risks) > 0,
            risks=risks
        )
```

## 4.6 Exercícios

1. Refatore um componente existente aplicando o padrão "Pure Core, Imperative Shell", identificando claramente as fronteiras.

2. Implemente um sistema de tipos algébricos para modelar um domínio de logística (entregas, status, eventos).

3. Crie um `DeterminismValidator` que analise automaticamente funções e identifique potenciais fontes de não-determinismo.

## Practical Considerations

- Formalize invariantes e limites de domínio no core; isso simplifica verificação e auditoria.
- Minimize dependências e superfícies de integração; quanto menor a interface, menor o risco.

## Summary

- O core determinístico preserva garantias e serve como âncora de confiabilidade.
- Contratos e validações impedem que variabilidade externa contamine decisões críticas.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

---

*SWEBOK-AI v5.0 - Software Design*

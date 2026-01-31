# Seção 2: Princípios de Design para Código Gerado

## Overview

Esta seção apresenta princípios de design que reduzem risco e custo de manutenção quando parte do código é gerada, refatorada ou expandida com auxílio de IA.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Aplicar princípios de design orientados a verificabilidade e transparência em código gerado
2. Identificar trade-offs entre velocidade de geração e legibilidade/manutenibilidade
3. Definir padrões mínimos para integração segura de código gerado em produção

## 2.1 Introdução

Os princípios clássicos de design de software (SOLID, DRY, KISS) foram formulados em uma era onde todo código era escrito por humanos. Na era dos LLMs, onde código é gerado automaticamente em grandes volumes, esses princípios precisam ser reinterpretados e estendidos.

Esta seção apresenta uma adaptação dos princípios fundamentais para o contexto de código gerado, enfatizando verificabilidade, modularidade para curadoria, e separação entre código gerado e código crítico.

## 2.2 SOLID Adaptado para Código Gerado

### 2.2.1 S - Single Responsibility (Curadoria)

> *"Um componente gerado deve ter uma única responsabilidade facilmente verificável."*

```python
# ANTI-PADRÃO: Código gerado com múltiplas responsabilidades
def process_user_data(data):
    # Validação
    if not data.get('email'):
        raise ValueError("Email required")
    
    # Transformação
    data['email'] = data['email'].lower()
    
    # Persistência
    db.execute("INSERT ...", data)
    
    # Notificação
    send_email(data['email'], "Welcome!")
    
    # Logging
    logger.info(f"User {data['id']} processed")
    
    return data

# PADRÃO: Responsabilidades separadas e verificáveis
from typing import Protocol

class Validator(Protocol):
    """Responsabilidade: Validação de dados."""
    def validate(self, data: dict) -> ValidationResult:
        ...

class Transformer(Protocol):
    """Responsabilidade: Transformação de dados."""
    def transform(self, data: dict) -> dict:
        ...

class Repository(Protocol):
    """Responsabilidade: Persistência."""
    def save(self, data: dict) -> None:
        ...

# Código gerado focado em orquestração clara
def process_user_data(
    data: dict,
    validator: Validator,
    transformer: Transformer,
    repository: Repository,
    notifier: Notifier,
    logger: Logger
) -> ProcessingResult:
    """
    Orquestra processamento de dados de usuário.
    
    Cada dependência tem responsabilidade única e pode ser
    mockada para testes.
    """
    # Validação
    validation = validator.validate(data)
    if not validation.is_valid:
        return ProcessingResult.failure(validation.errors)
    
    # Transformação
    transformed = transformer.transform(data)
    
    # Persistência
    repository.save(transformed)
    
    # Notificação (não-bloqueante)
    notifier.send_welcome_async(transformed['email'])
    
    # Logging estruturado
    logger.log_user_processed(transformed['id'])
    
    return ProcessingResult.success(transformed)
```

### 2.2.2 O - Open/Closed (Extensibilidade Controlada)

> *"Componentes devem ser abertos para extensão via configuração, fechados para modificação direta do código gerado."*

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic

T = TypeVar('T')

class Strategy(ABC, Generic[T]):
    """
    Estratégia abstrata para extensão sem modificação.
    """
    @abstractmethod
    def execute(self, input_data: T) -> T:
        pass

class ProcessingPipeline(Generic[T]):
    """
    Pipeline extensível via estratégias.
    Código gerado define estrutura, configuração define comportamento.
    """
    
    def __init__(self):
        self.strategies: List[Strategy[T]] = []
        self.config: PipelineConfig = PipelineConfig.default()
    
    def add_strategy(self, strategy: Strategy[T]) -> 'ProcessingPipeline[T]':
        self.strategies.append(strategy)
        return self
    
    def process(self, data: T) -> T:
        result = data
        for strategy in self.strategies:
            if self._should_apply(strategy):
                result = strategy.execute(result)
        return result
    
    def _should_apply(self, strategy: Strategy[T]) -> bool:
        # Lógica de decisão configurável
        return self.config.is_enabled(type(strategy).__name__)

# Uso: Extensão sem modificar código gerado
pipeline = ProcessingPipeline[UserData]()
pipeline.add_strategy(ValidationStrategy())
pipeline.add_strategy(NormalizationStrategy())
pipeline.add_strategy(EnrichmentStrategy())  # Nova funcionalidade!

# Configuração externa controla ativação
pipeline.config = PipelineConfig.from_yaml("pipeline-config.yaml")
```

### 2.2.3 L - Liskov Substitution (Verificabilidade de Substituição)

> *"Subclasses de componentes gerados devem preservar contratos verificáveis."*

```python
from dataclasses import dataclass
from typing import List

@dataclass
class Contract:
    """
    Contrato verificável para um componente.
    """
    preconditions: List[callable]
    postconditions: List[callable]
    invariants: List[callable]

class ContractualComponent(ABC):
    """
    Componente com contratos explícitos que subclasses
    devem preservar.
    """
    
    def __init__(self):
        self.contract = self._define_contract()
    
    @abstractmethod
    def _define_contract(self) -> Contract:
        pass
    
    def execute(self, *args, **kwargs):
        # Verificar pré-condições
        for pre in self.contract.preconditions:
            assert pre(*args, **kwargs), "Pré-condição violada"
        
        # Capturar estado para invariantes
        state_before = self._capture_state()
        
        # Executar
        result = self._execute(*args, **kwargs)
        
        # Verificar pós-condições
        for post in self.contract.postconditions:
            assert post(result, *args, **kwargs), "Pós-condição violada"
        
        # Verificar invariantes
        for inv in self.contract.invariants:
            assert inv(state_before, self._capture_state()), "Invariante violado"
        
        return result
    
    @abstractmethod
    def _execute(self, *args, **kwargs):
        pass

# Exemplo: Processador de pagamento
class PaymentProcessor(ContractualComponent):
    
    def _define_contract(self) -> Contract:
        return Contract(
            preconditions=[
                lambda amount, **_: amount > 0,
                lambda currency, **_: currency in ['USD', 'EUR', 'BRL']
            ],
            postconditions=[
                lambda result, **_: result.transaction_id is not None,
                lambda result, amount, **_: result.amount == amount
            ],
            invariants=[
                lambda before, after: after.balance >= 0
            ]
        )
    
    def _execute(self, amount: Decimal, currency: str) -> PaymentResult:
        # Implementação...
        pass

# Subclasse que preserva contrato
class SecurePaymentProcessor(PaymentProcessor):
    """
    Subclasse válida: adiciona segurança sem violar contratos.
    """
    def _execute(self, amount: Decimal, currency: str) -> PaymentResult:
        # Verificação adicional (não viola contrato)
        self._verify_fraud_risk(amount, currency)
        
        # Chama implementação base
        return super()._execute(amount, currency)
```

### 2.2.4 I - Interface Segregation (Granularidade para Curadoria)

> *"Interfaces devem ser granulares o suficiente para permitir avaliação independente de cada aspecto."*

```python
from typing import Protocol

# ANTI-PADRÃO: Interface monolítica difícil de avaliar
class DataProcessor(Protocol):
    def process(self, data: dict) -> dict: ...
    def validate(self, data: dict) -> bool: ...
    def transform(self, data: dict) -> dict: ...
    def persist(self, data: dict) -> None: ...
    def notify(self, data: dict) -> None: ...
    def log(self, data: dict) -> None: ...

# PADRÃO: Interfaces granulares avaliáveis separadamente

class Validatable(Protocol):
    """Responsabilidade: Validação."""
    def validate(self, data: dict) -> ValidationResult: ...

class Transformable(Protocol):
    """Responsabilidade: Transformação."""
    def transform(self, data: dict) -> dict: ...

class Persistable(Protocol):
    """Responsabilidade: Persistência."""
    def persist(self, data: dict) -> PersistenceResult: ...

class Notifiable(Protocol):
    """Responsabilidade: Notificação."""
    def notify(self, event: Event) -> None: ...

class Loggable(Protocol):
    """Responsabilidade: Logging."""
    def log(self, entry: LogEntry) -> None: ...

# Componente gerado implementa apenas o que precisa
class UserDataHandler:
    """
    Implementa apenas interfaces necessárias.
    Facilita avaliação independente de cada responsabilidade.
    """
    def validate(self, data: dict) -> ValidationResult:
        # Implementação focada
        pass
    
    def transform(self, data: dict) -> dict:
        # Implementação focada
        pass
```

### 2.2.5 D - Dependency Inversion (Injeção para Testabilidade)

> *"Dependa de abstrações que possam ser mockadas para verificação."*

```python
from typing import Protocol
from unittest.mock import Mock

class DatabaseConnection(Protocol):
    """Abstração de conexão de banco."""
    def query(self, sql: str, params: tuple) -> list: ...
    def execute(self, sql: str, params: tuple) -> int: ...

class UserRepository:
    """
    Depende de abstração, não implementação concreta.
    Permite testes sem banco real.
    """
    
    def __init__(self, db: DatabaseConnection):
        self._db = db
    
    def find_by_email(self, email: str) -> Optional[User]:
        results = self._db.query(
            "SELECT * FROM users WHERE email = %s",
            (email,)
        )
        return User(**results[0]) if results else None
    
    def save(self, user: User) -> None:
        self._db.execute(
            """INSERT INTO users (email, name) 
               VALUES (%s, %s) 
               ON CONFLICT (email) DO UPDATE 
               SET name = EXCLUDED.name""",
            (user.email, user.name)
        )

# Teste com mock
class TestUserRepository:
    def test_find_by_email_returns_user(self):
        # Arrange
        mock_db = Mock(spec=DatabaseConnection)
        mock_db.query.return_value = [
            {'id': 1, 'email': 'test@example.com', 'name': 'Test'}
        ]
        
        repo = UserRepository(mock_db)
        
        # Act
        user = repo.find_by_email('test@example.com')
        
        # Assert
        assert user is not None
        assert user.email == 'test@example.com'
        mock_db.query.assert_called_once()
```

## 2.3 Princípios Adicionais para Código Gerado

### 2.3.1 V - Verifiability First

> *"O código deve ser projetado para facilitar verificação automática e humana."*

```python
from dataclasses import dataclass
from typing import Any

@dataclass
class VerifiableFunction:
    """
    Função com metadados para verificação.
    """
    name: str
    implementation: callable
    preconditions: List[callable]
    postconditions: List[callable]
    examples: List[tuple]  # (input, expected_output)
    complexity_limit: int
    
    def verify(self) -> VerificationReport:
        """Executa verificação completa."""
        results = {
            'syntax_valid': self._check_syntax(),
            'examples_pass': self._test_examples(),
            'complexity_acceptable': self._check_complexity(),
            'contracts_honored': self._check_contracts()
        }
        
        return VerificationReport(
            passed=all(results.values()),
            details=results
        )
```

### 2.3.2 T - Transparency (Transparência)

> *"O código deve expor sua intenção e limitações de forma transparente."*

```python
def calculate_risk_score(transaction: Transaction) -> RiskScore:
    """
    Calcula score de risco para uma transação.
    
    TRANSPARÊNCIA:
    - Algoritmo: Pontuação ponderada baseada em histórico
    - Limitações: Não considera comportamento em tempo real
    - Confiabilidade: Testado em dataset de 100k transações
    - Falso positivo: ~2% (ver métricas em /docs/risk-model.md)
    
    Args:
        transaction: Dados da transação
        
    Returns:
        RiskScore com valor (0-100) e fatores considerados
        
    Raises:
        ValueError: Se dados da transação forem inválidos
    """
    # Implementação...
    pass
```

### 2.3.3 F - Fallback Preparedness

> *"O código deve estar preparado para fallback quando a IA falhar."*

```python
from typing import Optional, Callable

class ResilientComponent:
    """
    Componente com fallback preparado.
    """
    
    def __init__(self,
                 primary_implementation: Callable,
                 fallback_implementation: Callable,
                 circuit_breaker: CircuitBreaker):
        self.primary = primary_implementation
        self.fallback = fallback_implementation
        self.circuit = circuit_breaker
    
    def execute(self, *args, **kwargs) -> Result:
        """
        Executa com fallback automático.
        """
        if self.circuit.is_closed():
            try:
                return self.primary(*args, **kwargs)
            except Exception as e:
                self.circuit.record_failure()
                return self.fallback(*args, **kwargs)
        else:
            return self.fallback(*args, **kwargs)
```

## 2.4 Exercícios

1. Reescreva uma função monolítica aplicando os princípios SOLID adaptados, garantindo que cada componente seja verificável independentemente.

2. Implemente um sistema de contratos que verifique automaticamente se subclasses preservam as garantias da classe base.

3. Crie um exemplo de código que demonstre os princípios V (Verifiability), T (Transparency) e F (Fallback) em conjunto.

## Practical Considerations

- Trate código gerado como candidato: ele só vira produção após evidência (testes, contratos, revisão).
- Defina padrões de design verificáveis automaticamente (lint, limites de complexidade, interfaces estáveis).

## Summary

- Princípios de design para código gerado priorizam verificabilidade, transparência e fallback.
- Critérios de integração fazem parte do design: sem eles, a variabilidade vira dívida técnica.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. LAKSHMANAN, L. Agentic AI is making these design patterns more popular. Medium, 2025. Disponível em: https://lakshmanok.medium.com/agentic-ai-is-making-these-design-patterns-more-popular-0f7ba5831701

3. MONGODB. Here Are 7 Design Patterns for Agentic Systems You Need To Know. MongoDB Blog, 2025. Disponível em: https://medium.com/mongodb/here-are-7-design-patterns-for-agentic-systems-you-need-to-know-d74a4b5835a5

4. AWS. Agentic AI patterns and workflows on AWS. AWS Prescriptive Guidance, 2025. Disponível em: https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-patterns/

5. DATABRICKS. Agent system design patterns. Databricks Documentation, 2025. Disponível em: https://docs.databricks.com/gcp/en/generative-ai/guide/agent-system-design-patterns

6. LAKSHMANAN, L. Generative AI Design Patterns. GitHub Repository, 2024. Disponível em: https://github.com/lakshmanok/generative-ai-design-patterns

---

*SWEBOK-AI v5.0 - Software Design*

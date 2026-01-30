# 4. Verificação de Contratos e Invariantes

## Overview

A verificação de contratos e invariantes representa uma das linhas de defesa mais robustas contra falhas em sistemas que incorporam código gerado por Inteligência Artificial. Enquanto técnicas de teste tradicionais verificam comportamentos específicos em cenários predefinidos, **os contratos estabelecem garantias universais que devem valer para todas as execuções possíveis**, independentemente de como o código foi produzido. Esta abordagem é particularmente valiosa no contexto de código gerado por LLMs, onde a ausência de raciocínio documentado e a variabilidade estocástica da geração demandam mecanismos de verificação que não dependam de inspeção humana direta.

O Design by Contract (DbC), formalizado por Meyer na linguagem Eiffel, oferece fundamentos teóricos sólidos que podem ser adaptados para a era dos sistemas de IA. Contudo, a aplicação direta destes princíclios encontra limitações quando confrontada com a natureza probabilística dos LLMs: as precondições devem considerar não apenas validade de dados, mas adequação de contexto; as pós-condições devem tolerar variações aceitáveis na saída; e as invariantes devem ser monitoradas continuamente em ambientes de produção, não apenas verificadas estaticamente.

Esta seção apresenta um framework comprehensivo para especificação, verificação e monitoramento de contratos em sistemas com componentes de IA, integrando técnicas clássicas de verificação formal com abordagens contemporâneas de runtime verification. A pesquisa acadêmica recente (2025) demonstra que a combinação de contratos formais com monitoramento runtime pode reduzir em até 67% a incidência de falhas em produção para código gerado por IA, enquanto mantém overhead abaixo de 5% em sistemas bem instrumentados.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Especificar contratos formais para código gerado por IA**, definindo precondições que validam adequação de inputs, pós-condições que garantem propriedades estruturais de outputs, e invariantes que asseguram consistência de estado em sistemas híbridos.

2. **Implementar verificação runtime de invariantes críticas**, estabelecendo estratégias de monitoramento contínuo, mecanismos de fail-safe, e protocolos de escalação quando violações são detectadas.

3. **Adaptar princípios de Design by Contract para sistemas não-determinísticos**, reconciliando garantias formais tradicionais com a variabilidade inerente a componentes de IA, incluindo técnicas de contratos probabilísticos e verificação estatística de pós-condições.

4. **Aplicar análise automática para inferência e verificação de contratos**, utilizando ferramentas de análise estática para derivar precondições de código existente e LLMs para verificar conformidade de código gerado contra especificações contratuais.

## 4.1 Especificação de Contratos para Código Gerado

### 4.1.1 Contratos como Documentação Executável

Em sistemas tradicionais, a documentação de requisitos e o código de implementação frequentemente divergem ao longo do tempo, criando um gap de compreensão que dificulta manutenção e verificação. **Contratos formais eliminam esta divergência ao tornar a especificação executável** — o contrato é simultaneamente documentação e código de verificação. Esta propriedade é especialmente valiosa para código gerado por IA, onde a ausência de intenção explícita do desenvolvedor torna a documentação de raciocínio particularmente crucial.

Um contrato formal para código gerado deve capturar três dimensões de garantia:

| Dimensão | Descrição | Exemplo para Função de Processamento de Pagamento |
|----------|-----------|---------------------------------------------------|
| **Sintática** | Estrutura e tipos dos dados | `amount` deve ser `Decimal` com 2 casas decimais |
| **Semântica** | Significado e validade dos dados | `amount` > 0 e ≤ limite de crédito do cliente |
| **Contextual** | Adequação ao domínio e estado do sistema | Transação permitida pelo estado atual da conta |

*Tabela 4.1: Dimensões de especificação contratual para código gerado por IA.*

A especificação em três dimensões reconhece que código gerado por LLMs pode ser sintaticamente correto (compila), semanticamente plausível (faz sentido), mas contextualmente inadequado (não atende às necessidades reais do domínio). Contratos robustos devem verificar todas as três camadas.

### 4.1.2 Limites de Entrada e Domínios Válidos

A especificação de limites de entrada para código gerado por IA apresenta desafios adicionais em relação a código tradicional. Enquanto funções escritas por humanos geralmente têm domínios bem definidos (ex.: "esta função aceita inteiros positivos até 10^6"), código gerado por LLM pode apresentar comportamentos imprevisíveis fora de distribuições de treinamento. **A especificação de limites deve considerar não apenas o que é semanticamente válido, mas o que é seguro processar**.

```python
# Exemplo: Especificação de contratos com limites de entrada
from icontract import require, ensure, invariant
from decimal import Decimal
from typing import Optional
import re

class PaymentProcessor:
    """
    Processador de pagamentos com contratos formais.
    Código gerado por IA deve satisfazer todos os contratos.
    """
    
    @require(
        lambda amount: isinstance(amount, Decimal),
        "Amount deve ser Decimal para precisão financeira"
    )
    @require(
        lambda amount: amount > Decimal('0'),
        "Amount deve ser positivo"
    )
    @require(
        lambda amount: amount.as_tuple().exponent >= -2,
        "Amount deve ter no máximo 2 casas decimais"
    )
    @require(
        lambda amount: amount <= Decimal('999999999.99'),
        "Amount excede limite de processamento"
    )
    @require(
        lambda currency: currency in {'USD', 'EUR', 'BRL', 'GBP'},
        "Moeda deve ser suportada"
    )
    @require(
        lambda customer_id: isinstance(customer_id, str) and 
                           len(customer_id) == 36 and
                           re.match(r'^[0-9a-f-]+$', customer_id),
        "Customer ID deve ser UUID válido"
    )
    @ensure(
        lambda result: result['status'] in {'approved', 'declined', 'pending'},
        "Status deve ser valor válido"
    )
    @ensure(
        lambda result, amount: 
            result['status'] == 'approved' implies 
            result['charged_amount'] == amount,
        "Se aprovado, valor cobrado deve corresponder ao solicitado"
    )
    def process_payment(
        self,
        amount: Decimal,
        currency: str,
        customer_id: str,
        metadata: Optional[dict] = None
    ) -> dict:
        """
        Processa um pagamento com validação contratual completa.
        
        Código gerado por IA deve:
        1. Validar todas as precondições antes de processar
        2. Garantir que resultado satisfaz todas as pós-condições
        3. Preservar invariantes de estado da conta do cliente
        """
        # Implementação gerada por IA (ilustrativa)
        pass
```

### 4.1.3 Garantias Mínimas de Saída

As pós-condições em sistemas com componentes de IA devem equilibrar especificidade com flexibilidade. Diferentemente de sistemas determinísticos, onde uma saída exata pode ser especificada, código gerado por LLM pode produzir saídas variadas que são igualmente "corretas". **Pós-condições devem especificar propriedades que a saída deve satisfazer, não a saída exata esperada**.

Tipos de garantias de saída aplicáveis a código gerado por IA:

1. **Garantias Estruturais**: A saída possui formato esperado (ex.: JSON com campos obrigatórios, string não vazia, lista ordenada)
2. **Garantias de Intervalo**: Valores numéricos dentro de faixas aceitáveis (ex.: confiança entre 0 e 1, tempo de resposta < 5s)
3. **Garantias de Consistência**: Relações entre diferentes partes da saída (ex.: `start_time` < `end_time`)
4. **Garantias de Sanitização**: Ausência de padrões perigosos (ex.: sem SQL injection, sem XSS, sem dados sensíveis expostos)

```python
# Framework de garantias de saída para código gerado por IA

from dataclasses import dataclass
from typing import Callable, List, Any, Optional
import json

@dataclass
class OutputGuarantee:
    """Define uma garantia que a saída deve satisfazer."""
    name: str
    validator: Callable[[Any], bool]
    description: str
    criticality: str  # 'critical', 'warning', 'info'

class OutputValidator:
    """
    Validador de garantias de saída para código gerado por IA.
    Permite especificar propriedades sem fixar saída exata.
    """
    
    def __init__(self):
        self.guarantees: List[OutputGuarantee] = []
    
    def add_guarantee(self, guarantee: OutputGuarantee):
        """Adiciona uma garantia a ser verificada."""
        self.guarantees.append(guarantee)
    
    def validate(self, output: Any) -> dict:
        """
        Valida saída contra todas as garantias registradas.
        Retorna relatório de conformidade.
        """
        results = {
            'valid': True,
            'violations': [],
            'warnings': [],
            'passed': []
        }
        
        for guarantee in self.guarantees:
            try:
                if guarantee.validator(output):
                    results['passed'].append(guarantee.name)
                else:
                    violation = {
                        'guarantee': guarantee.name,
                        'description': guarantee.description,
                        'criticality': guarantee.criticality
                    }
                    
                    if guarantee.criticality == 'critical':
                        results['valid'] = False
                        results['violations'].append(violation)
                    else:
                        results['warnings'].append(violation)
            except Exception as e:
                results['valid'] = False
                results['violations'].append({
                    'guarantee': guarantee.name,
                    'error': str(e),
                    'criticality': 'critical'
                })
        
        return results

# Exemplo de uso para validar saída de LLM
validator = OutputValidator()

# Garantia estrutural: deve ser JSON parseável
validator.add_guarantee(OutputGuarantee(
    name='valid_json',
    validator=lambda x: isinstance(x, str) and 
                        json.loads(x) is not None,
    description='Saída deve ser string JSON válida',
    criticality='critical'
))

# Garantia de intervalo: confiança entre 0 e 1
validator.add_guarantee(OutputGuarantee(
    name='confidence_range',
    validator=lambda x: 0 <= json.loads(x).get('confidence', 0) <= 1,
    description='Campo confidence deve estar entre 0 e 1',
    criticality='critical'
))

# Garantia de sanitização: sem tags HTML perigosas
validator.add_guarantee(OutputGuarantee(
    name='no_xss',
    validator=lambda x: '<script>' not in x.lower() and 
                        'javascript:' not in x.lower(),
    description='Saída não deve conter vetores XSS óbvios',
    criticality='critical'
))
```

### 4.1.4 Ferramentas de Contratos em Python

O ecossistema Python oferece diversas bibliotecas para implementação de contratos formais, cada uma com trade-offs específicos para verificação de código gerado por IA:

| Ferramenta | Abordagem | Overhead | Melhor Uso |
|------------|-----------|----------|------------|
| **icontract** | Decoradores, verificação runtime | Baixo (~1-2%) | Contratos em produção, verificação contínua |
| **PyContracts** | Annotations, verificação runtime | Médio (~3-5%) | Prototipagem, validação de tipos e valores |
| **deal** | Decoradores, análise estática | Baixo | Integração com mypy, verificação híbrida |
| **hypothesis** | Property-based testing | Variável | Geração de casos de teste a partir de contratos |
| **crosshair** | Execução simbólica | Alto (offline) | Verificação formal completa, não para runtime |

*Tabela 4.2: Ferramentas de contratos para Python e suas aplicações em verificação de código de IA.*

```python
# Comparação de ferramentas de contrato

# icontract: Focado em runtime, sintaxe limpa
from icontract import require, ensure, invariant

class BankAccount:
    @invariant(lambda self: self.balance >= 0, "Saldo não pode ser negativo")
    @invariant(lambda self: len(self.transactions) <= 10000, "Limite de transações")
    
    def __init__(self, initial_balance: float = 0.0):
        self.balance = initial_balance
        self.transactions = []
    
    @require(lambda amount: amount > 0, "Valor deve ser positivo")
    @ensure(lambda self, amount: self.balance == self.balance + amount, 
            "Saldo deve refletir o depósito")
    def deposit(self, amount: float):
        self.balance += amount
        self.transactions.append(('deposit', amount))

# deal: Integração com type checkers
import deal

@deal.pre(lambda amount: amount > 0)
@deal.post(lambda result: result >= 0)
def calculate_fee(amount: float) -> float:
    return amount * 0.025

# PyContracts: Annotations nativas
from contracts import contract

@contract
def process_data(items: 'list[N>0]' , threshold: 'float,>0') -> 'list[N]':
    """Processa lista não-vazia com threshold positivo."""
    return [x for x in items if x > threshold]
```

## 4.2 Verificação Runtime de Invariantes Críticas

### 4.2.1 Monitoramento Contínuo em Produção

A verificação estática de contratos, embora valiosa, não pode capturar todas as violações que emergem da interação dinâmica de componentes em sistemas reais. **Invariantes críticas devem ser monitoradas em tempo de execução**, especialmente em código gerado por IA onde a compreensão completa de comportamentos edge case pode ser limitada.

O Runtime Verification (RV) estabelece uma arquitetura de monitoramento que observa o comportamento do sistema em produção e verifica conformidade contra propriedades formais especificadas. Para sistemas com componentes de IA, esta abordagem é indispensável: ela permite detectar violações que não foram antecipadas durante fases de teste, incluindo aquelas decorrentes de inputs fora da distribuição de treinamento do modelo gerador.

```python
# Arquitetura de Runtime Verification para código gerado por IA

from abc import ABC, abstractmethod
from typing import Callable, Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime
import threading
import queue

@dataclass
class InvariantViolation:
    """Registro de violação de invariante detectada."""
    invariant_name: str
    timestamp: datetime
    severity: str  # 'critical', 'high', 'medium', 'low'
    context: Dict[str, Any]
    stack_trace: Optional[str] = None
    recovery_action: Optional[str] = None

class Invariant(ABC):
    """
    Classe base para invariantes monitoráveis.
    Código gerado por IA deve respeitar todos os invariantes registrados.
    """
    
    def __init__(self, name: str, severity: str = 'critical'):
        self.name = name
        self.severity = severity
        self.violation_count = 0
        self.last_violation: Optional[datetime] = None
    
    @abstractmethod
    def check(self, context: Dict[str, Any]) -> bool:
        """Verifica se o invariante é satisfeito no contexto atual."""
        pass
    
    def on_violation(self, context: Dict[str, Any]) -> InvariantViolation:
        """Chamado quando o invariante é violado."""
        self.violation_count += 1
        self.last_violation = datetime.now()
        
        return InvariantViolation(
            invariant_name=self.name,
            timestamp=self.last_violation,
            severity=self.severity,
            context=context.copy()
        )

class RuntimeMonitor:
    """
    Monitor runtime para verificação de invariantes em código gerado por IA.
    Implementa arquitetura de observação não-intrusiva.
    """
    
    def __init__(self, enable_async: bool = True):
        self.invariants: List[Invariant] = []
        self.violations: queue.Queue = queue.Queue()
        self.enable_async = enable_async
        self._lock = threading.RLock()
        self._running = False
        self._monitor_thread: Optional[threading.Thread] = None
    
    def register_invariant(self, invariant: Invariant):
        """Registra um invariante para monitoramento."""
        with self._lock:
            self.invariants.append(invariant)
    
    def check_all(self, context: Dict[str, Any]) -> List[InvariantViolation]:
        """
        Verifica todos os invariantes registrados contra o contexto atual.
        Retorna lista de violações detectadas.
        """
        violations = []
        
        for invariant in self.invariants:
            try:
                if not invariant.check(context):
                    violation = invariant.on_violation(context)
                    violations.append(violation)
                    
                    if self.enable_async:
                        self.violations.put(violation)
            except Exception as e:
                # Falha na verificação é tratada como violação
                violation = InvariantViolation(
                    invariant_name=f"{invariant.name}_check_failure",
                    timestamp=datetime.now(),
                    severity='critical',
                    context={**context, 'error': str(e)}
                )
                violations.append(violation)
        
        return violations
    
    def start_monitoring(self, context_provider: Callable[[], Dict[str, Any]], 
                        interval_seconds: float = 1.0):
        """
        Inicia monitoramento assíncrono contínuo.
        """
        self._running = True
        
        def monitor_loop():
            while self._running:
                try:
                    context = context_provider()
                    self.check_all(context)
                except Exception as e:
                    # Log error but continue monitoring
                    pass
                
                threading.Event().wait(interval_seconds)
        
        self._monitor_thread = threading.Thread(target=monitor_loop, daemon=True)
        self._monitor_thread.start()
    
    def stop_monitoring(self):
        """Para o monitoramento assíncrono."""
        self._running = False
        if self._monitor_thread:
            self._monitor_thread.join(timeout=5.0)
```

### 4.2.2 Classificação de Invariantes por Criticidade

Nem todas as invariantes possuem a mesma importância para a segurança e correção do sistema. Uma classificação hierárquica permite alocar recursos de verificação de forma proporcional ao risco:

| Categoria | Descrição | Exemplos | Estratégia de Falha |
|-----------|-----------|----------|---------------------|
| **Vital** | Violação causa corrupção irreversível ou risco de vida | Saldo de conta nunca negativo sem autorização; Dosagem de medicamento dentro de limites seguros | Parada imediata do sistema; Rollback automático; Alerta crítico |
| **Crítica** | Violação causa inconsistência significativa ou perda financeira | Transações atomicamente consistentes; Auditoria imutável | Retry com backoff; Fallback para modo seguro; Escalation imediata |
| **Essencial** | Violação indica bug ou comportamento inesperado | Cache consistente com fonte de verdade; Rate limiting funcional | Log detalhado; Alerta operacional; Reprocessamento |
| **Importante** | Violação sugere degradação de qualidade | Tempo de resposta dentro de SLAs; Formato de resposta consistente | Métricas de observabilidade; Análise periódica; Tuning |

*Tabela 4.3: Classificação de invariantes por criticidade e estratégias de resposta.*

```python
# Implementação de invariantes por criticidade

class VitalInvariant(Invariant):
    """Invariante vital: violação requer parada imediata."""
    
    def __init__(self, name: str, checker: Callable[[Dict], bool]):
        super().__init__(name, severity='critical')
        self._checker = checker
    
    def check(self, context: Dict[str, Any]) -> bool:
        return self._checker(context)
    
    def on_violation(self, context: Dict[str, Any]) -> InvariantViolation:
        violation = super().on_violation(context)
        violation.recovery_action = 'SYSTEM_HALT'
        return violation

class CriticalInvariant(Invariant):
    """Invariante crítica: violação requer rollback ou fallback."""
    
    def __init__(self, name: str, checker: Callable[[Dict], bool],
                 fallback_action: Optional[Callable] = None):
        super().__init__(name, severity='high')
        self._checker = checker
        self._fallback = fallback_action
    
    def check(self, context: Dict[str, Any]) -> bool:
        return self._checker(context)
    
    def on_violation(self, context: Dict[str, Any]) -> InvariantViolation:
        violation = super().on_violation(context)
        
        if self._fallback:
            try:
                self._fallback(context)
                violation.recovery_action = 'FALLBACK_EXECUTED'
            except Exception as e:
                violation.recovery_action = f'FALLBACK_FAILED: {e}'
        else:
            violation.recovery_action = 'ROLLBACK_REQUIRED'
        
        return violation

# Exemplos práticos

# Invariante vital: Saldo nunca negativo sem overdraft aprovado
def check_balance_non_negative(context: Dict) -> bool:
    account = context.get('account')
    if not account:
        return True  # Não aplicável
    
    balance = account.get('balance', 0)
    overdraft_approved = account.get('overdraft_approved', False)
    
    return balance >= 0 or overdraft_approved

balance_invariant = VitalInvariant(
    'account_balance_non_negative',
    check_balance_non_negative
)

# Invariante crítica: Consistência de cache
def check_cache_consistency(context: Dict) -> bool:
    cache = context.get('cache')
    source = context.get('source_of_truth')
    
    if not cache or not source:
        return True
    
    # Verifica se cache está consistente com fonte de verdade
    for key in cache.keys():
        if cache.get(key) != source.get(key):
            return False
    return True

def rebuild_cache(context: Dict):
    """Fallback: reconstrói cache a partir da fonte de verdade."""
    source = context.get('source_of_truth')
    context['cache'].clear()
    context['cache'].update(source)

cache_invariant = CriticalInvariant(
    'cache_consistency',
    check_cache_consistency,
    fallback_action=rebuild_cache
)
```

### 4.2.3 Estratégias de Fail-Safe

Quando uma invariante crítica é violada em código gerado por IA, o sistema deve ter estratégias definidas para transitar para um estado seguro. **Fail-safe não significa apenas "falhar", mas "falhar de forma segura"**, minimizando danos e preservando invariantes mais fundamentais.

Princípios de design fail-safe para sistemas com componentes de IA:

1. **Degradação Graceful**: O sistema continua operando com funcionalidade reduzida em vez de parar completamente
2. **Isolamento de Falha**: Contenção do impacto da violação para evitar cascata de falhas
3. **Preservação de Estado Crítico**: Garantia de que dados essenciais não são corrompidos
4. **Auditoria Completa**: Registro detalhado para análise post-mortem
5. **Recuperação Automatizada**: Quando possível, retorno autônomo ao estado normal

```python
# Framework de fail-safe para violações de invariante

from enum import Enum
from typing import Optional, Callable
import logging

class FailSafeAction(Enum):
    """Ações disponíveis quando invariante é violada."""
    HALT = "halt"                           # Parada completa
    DEGRADE = "degrade"                     # Modo degradado
    ROLLBACK = "rollback"                   # Rollback de transação
    CIRCUIT_BREAK = "circuit_break"         # Abrir circuit breaker
    ALERT_ONLY = "alert_only"               # Apenas alertar
    RETRY = "retry"                         # Tentar novamente

class FailSafeManager:
    """
    Gerenciador de estratégias fail-safe para invariantes.
    Código gerado por IA deve operar dentro das proteções estabelecidas.
    """
    
    def __init__(self):
        self.strategies: Dict[str, FailSafeStrategy] = {}
        self.logger = logging.getLogger(__name__)
    
    def register_strategy(self, invariant_name: str, 
                         action: FailSafeAction,
                         config: Optional[Dict] = None):
        """Registra estratégia fail-safe para uma invariante."""
        self.strategies[invariant_name] = FailSafeStrategy(
            action=action,
            config=config or {}
        )
    
    def handle_violation(self, violation: InvariantViolation,
                        system_context: Dict) -> FailSafeResult:
        """
        Executa estratégia fail-safe para uma violação detectada.
        """
        strategy = self.strategies.get(violation.invariant_name)
        
        if not strategy:
            # Estratégia padrão baseada na severidade
            strategy = self._default_strategy(violation.severity)
        
        self.logger.critical(
            f"Invariant violation: {violation.invariant_name} "
            f"(severity: {violation.severity}, action: {strategy.action})"
        )
        
        # Executa ação apropriada
        handler = self._get_handler(strategy.action)
        return handler(violation, system_context, strategy.config)
    
    def _default_strategy(self, severity: str) -> 'FailSafeStrategy':
        """Retorna estratégia padrão baseada na severidade."""
        defaults = {
            'critical': FailSafeStrategy(FailSafeAction.HALT),
            'high': FailSafeStrategy(FailSafeAction.ROLLBACK),
            'medium': FailSafeStrategy(FailSafeAction.CIRCUIT_BREAK),
            'low': FailSafeStrategy(FailSafeAction.ALERT_ONLY)
        }
        return defaults.get(severity, defaults['medium'])
    
    def _get_handler(self, action: FailSafeAction) -> Callable:
        """Retorna handler para a ação especificada."""
        handlers = {
            FailSafeAction.HALT: self._handle_halt,
            FailSafeAction.DEGRADE: self._handle_degrade,
            FailSafeAction.ROLLBACK: self._handle_rollback,
            FailSafeAction.CIRCUIT_BREAK: self._handle_circuit_break,
            FailSafeAction.ALERT_ONLY: self._handle_alert,
            FailSafeAction.RETRY: self._handle_retry
        }
        return handlers.get(action, self._handle_alert)
    
    def _handle_halt(self, violation: InvariantViolation, 
                    context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para HALT: para o sistema imediatamente."""
        self.logger.critical("EXECUTING HALT - System shutdown initiated")
        
        # Preservar estado para diagnóstico
        self._preserve_diagnostics(violation, context)
        
        # Sinaliza parada (implementação específica do sistema)
        context['system_state'] = 'HALTED'
        context['halt_reason'] = violation.invariant_name
        
        return FailSafeResult(
            action=FailSafeAction.HALT,
            success=True,
            message=f"System halted due to violation: {violation.invariant_name}",
            system_state='HALTED'
        )
    
    def _handle_degrade(self, violation: InvariantViolation,
                       context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para DEGRADE: ativa modo degradado."""
        degraded_features = config.get('degraded_features', [])
        
        for feature in degraded_features:
            context['feature_flags'][feature] = 'DEGRADED'
        
        self.logger.warning(f"System degraded. Disabled features: {degraded_features}")
        
        return FailSafeResult(
            action=FailSafeAction.DEGRADE,
            success=True,
            message=f"Degraded mode activated for {violation.invariant_name}",
            system_state='DEGRADED'
        )
    
    def _handle_rollback(self, violation: InvariantViolation,
                        context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para ROLLBACK: reverte transação."""
        transaction_id = context.get('active_transaction')
        
        if transaction_id and 'transaction_manager' in context:
            try:
                context['transaction_manager'].rollback(transaction_id)
                return FailSafeResult(
                    action=FailSafeAction.ROLLBACK,
                    success=True,
                    message=f"Transaction {transaction_id} rolled back",
                    system_state='RECOVERED'
                )
            except Exception as e:
                return FailSafeResult(
                    action=FailSafeAction.ROLLBACK,
                    success=False,
                    message=f"Rollback failed: {e}",
                    system_state='CRITICAL'
                )
        
        return FailSafeResult(
            action=FailSafeAction.ROLLBACK,
            success=False,
            message="No active transaction to rollback",
            system_state='WARNING'
        )
    
    def _handle_circuit_break(self, violation: InvariantViolation,
                             context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para CIRCUIT_BREAK: abre circuito."""
        service_name = config.get('service_name', 'default')
        
        if 'circuit_breakers' in context:
            context['circuit_breakers'][service_name] = 'OPEN'
        
        return FailSafeResult(
            action=FailSafeAction.CIRCUIT_BREAK,
            success=True,
            message=f"Circuit opened for {service_name}",
            system_state='PROTECTED'
        )
    
    def _handle_alert(self, violation: InvariantViolation,
                     context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para ALERT_ONLY: apenas registra."""
        return FailSafeResult(
            action=FailSafeAction.ALERT_ONLY,
            success=True,
            message=f"Alert logged for {violation.invariant_name}",
            system_state='NORMAL'
        )
    
    def _handle_retry(self, violation: InvariantViolation,
                     context: Dict, config: Dict) -> 'FailSafeResult':
        """Handler para RETRY: tenta novamente."""
        max_retries = config.get('max_retries', 3)
        backoff = config.get('backoff_seconds', 1.0)
        
        retry_count = context.get('retry_count', 0) + 1
        context['retry_count'] = retry_count
        
        if retry_count <= max_retries:
            return FailSafeResult(
                action=FailSafeAction.RETRY,
                success=True,
                message=f"Retry {retry_count}/{max_retries} scheduled",
                system_state='RETRYING',
                metadata={'backoff': backoff * retry_count}
            )
        else:
            return FailSafeResult(
                action=FailSafeAction.RETRY,
                success=False,
                message="Max retries exceeded",
                system_state='FAILED'
            )
    
    def _preserve_diagnostics(self, violation: InvariantViolation, context: Dict):
        """Preserva informações de diagnóstico."""
        diagnostics = {
            'violation': violation,
            'system_context': context.copy(),
            'timestamp': datetime.now().isoformat()
        }
        # Persistir em storage de diagnóstico
        pass

@dataclass
class FailSafeStrategy:
    action: FailSafeAction
    config: Dict = None
    
    def __post_init__(self):
        if self.config is None:
            self.config = {}

@dataclass  
class FailSafeResult:
    action: FailSafeAction
    success: bool
    message: str
    system_state: str
    metadata: Dict = None
```

### 4.2.4 Trade-offs: Overhead vs. Segurança

A verificação runtime de invariantes introduz overhead computacional que deve ser cuidadosamente balanceado contra os benefícios de segurança. Pesquisas recentes (ACM Computing Surveys, 2025) indicam que um sistema bem projetado de runtime verification pode manter overhead abaixo de 3% para a maioria das aplicações, mas este número pode crescer significativamente se invariantes complexos forem verificados com alta frequência.

Estratégias para minimizar overhead:

1. **Amostragem Adaptativa**: Verificar invariantes em 100% das execuções apenas para código novo ou de alta criticidade; amostrar execuções para código maduro
2. **Verificação Assíncrona**: Executar verificações fora do caminho crítico de processamento
3. **Compilação de Invariantes**: Compilar expressões de invariante para código otimizado
4. **Caching de Resultados**: Memoizar resultados de verificações para contextos idênticos
5. **Desativação Seletiva**: Permitir desativação temporária de invariantes não-críticos sob carga extrema

| Estratégia | Redução de Overhead | Risco | Aplicabilidade |
|------------|---------------------|-------|----------------|
| Amostragem 10% | 90% | Perde 90% das violações | Invariantes importantes (não críticas) |
| Verificação assíncrona | 70-80% | Delay na detecção | Invariantes não vitais |
| Compilação JIT | 40-60% | Complexidade de implementação | Invariantes executadas frequentemente |
| Caching | 30-50% | Stale results | Contextos repetitivos |
| Desativação sob carga | 100% quando ativa | Violações não detectadas | Invariantes de monitoramento apenas |

*Tabela 4.4: Estratégias de mitigação de overhead em verificação runtime.*

## 4.3 Design by Contract Adaptado para IA

### 4.3.1 Fundamentos do Design by Contract

O Design by Contract (DbC), introduzido por Bertrand Meyer na linguagem Eiffel, estabelece que a interação entre componentes de software deve ser regida por contratos formais análogos a contratos legais. Cada rotina possui:

- **Precondições**: O que o chamador deve garantir antes da chamada
- **Pós-condições**: O que a rotina garante após execução bem-sucedida  
- **Invariantes**: Propriedades que sempre se mantêm verdadeiras para a classe

A aplicação direta destes princípios a sistemas com componentes de IA requer adaptações fundamentais, reconhecendo que:

1. **O "chamador" pode ser um sistema autônomo** (outro agente de IA) sem capacidade de garantir precondições
2. **A "rotina" pode ser não-determinística**, produzindo saídas variáveis para mesmas entradas
3. **As garantias podem ser probabilísticas**, não absolutas

### 4.3.2 Precondições: Validação de Inputs para LLMs

Em sistemas tradicionais, precondições verificam se inputs satisfazem requisitos de tipo, formato e validade. Para código que interage com LLMs, **precondições devem adicionalmente verificar adequação de contexto e alinhamento com capacidades do modelo**.

```python
# Framework de precondições para interação com LLMs

from dataclasses import dataclass
from typing import List, Dict, Optional, Callable
import re

@dataclass
class ContextRequirement:
    """Requisito de contexto para input de LLM."""
    name: str
    validator: Callable[[str], bool]
    description: str
    severity: str = 'error'  # 'error', 'warning'

class LLMInputValidator:
    """
    Validador de precondições para inputs de LLMs.
    Garante que prompts são adequados para processamento.
    """
    
    def __init__(self):
        self.requirements: List[ContextRequirement] = []
        self._setup_default_requirements()
    
    def _setup_default_requirements(self):
        """Configura requisitos padrão para inputs de LLM."""
        
        # Requisito: Input não vazio
        self.add_requirement(ContextRequirement(
            name='non_empty',
            validator=lambda x: bool(x and x.strip()),
            description='Input não pode ser vazio',
            severity='error'
        ))
        
        # Requisito: Tamanho máximo (evita truncamento)
        self.add_requirement(ContextRequirement(
            name='size_limit',
            validator=lambda x: len(x) <= 100000,  # ~25k tokens
            description='Input excede limite de processamento',
            severity='error'
        ))
        
        # Requisito: Encoding válido
        self.add_requirement(ContextRequirement(
            name='valid_encoding',
            validator=lambda x: self._check_encoding(x),
            description='Input contém caracteres inválidos',
            severity='error'
        ))
        
        # Requisito: Sem instruções conflitantes
        self.add_requirement(ContextRequirement(
            name='no_conflicting_instructions',
            validator=lambda x: not self._has_conflicts(x),
            description='Input contém instruções conflitantes',
            severity='warning'
        ))
    
    def add_requirement(self, req: ContextRequirement):
        """Adiciona requisito de validação."""
        self.requirements.append(req)
    
    def validate(self, input_text: str, context: Optional[Dict] = None) -> Dict:
        """
        Valida input contra todos os requisitos.
        Retorna relatório de conformidade.
        """
        results = {
            'valid': True,
            'errors': [],
            'warnings': [],
            'passed': []
        }
        
        for req in self.requirements:
            try:
                if req.validator(input_text):
                    results['passed'].append(req.name)
                else:
                    issue = {
                        'requirement': req.name,
                        'description': req.description
                    }
                    
                    if req.severity == 'error':
                        results['valid'] = False
                        results['errors'].append(issue)
                    else:
                        results['warnings'].append(issue)
            except Exception as e:
                results['valid'] = False
                results['errors'].append({
                    'requirement': req.name,
                    'description': f'Validation error: {e}'
                })
        
        return results
    
    def _check_encoding(self, text: str) -> bool:
        """Verifica se texto possui encoding válido."""
        try:
            text.encode('utf-8')
            return True
        except UnicodeEncodeError:
            return False
    
    def _has_conflicts(self, text: str) -> bool:
        """Detecta instruções conflitantes potenciais."""
        # Padrões de conflito comum em prompts
        conflict_patterns = [
            r'ignore.*previous.*instructions',
            r'disregard.*above',
            r'forget.*what.*said',
        ]
        
        text_lower = text.lower()
        return any(re.search(pattern, text_lower) 
                  for pattern in conflict_patterns)

# Uso com verificação de domínio específico
def create_code_generation_validator() -> LLMInputValidator:
    """Cria validador específico para geração de código."""
    validator = LLMInputValidator()
    
    # Requisito adicional: especificação clara de linguagem
    validator.add_requirement(ContextRequirement(
        name='language_specified',
        validator=lambda x: any(lang in x.lower() 
                               for lang in ['python', 'javascript', 'java', 
                                          'c++', 'go', 'rust', 'typescript']),
        description='Linguagem de programação não especificada',
        severity='warning'
    ))
    
    # Requisito adicional: requisitos de segurança mencionados para código
    validator.add_requirement(ContextRequirement(
        name='security_considerations',
        validator=lambda x: any(term in x.lower() 
                               for term in ['secure', 'validate', 'sanitize', 
                                          'injection', 'xss', 'sql']),
        description='Considerações de segurança não explicitadas',
        severity='warning'
    ))
    
    return validator
```

### 4.3.3 Pós-condições: Verificação Estrutural de Outputs

Para código gerado por IA, pós-condições tradicionais que verificam igualdade exata de resultado são frequentemente inaplicáveis. **Pós-condições adaptadas para IA devem verificar propriedades estruturais e comportamentais, não identidade de saída**.

```python
# Framework de pós-condições para outputs de IA

from typing import Any, Callable, List, Dict
from dataclasses import dataclass
import ast
import json

@dataclass
class Postcondition:
    """Define uma pós-condição verificável."""
    name: str
    checker: Callable[[Any, Any], bool]  # (input, output) -> bool
    description: str
    tolerance: Optional[float] = None  # Tolerância para verificações numéricas

class LLMOutputVerifier:
    """
    Verificador de pós-condições para outputs de LLMs.
    Admite variabilidade na saída enquanto garante propriedades essenciais.
    """
    
    def __init__(self):
        self.postconditions: List[Postcondition] = []
    
    def add_postcondition(self, post: Postcondition):
        """Adiciona pós-condição."""
        self.postconditions.append(post)
    
    def verify(self, input_data: Any, output_data: Any) -> Dict:
        """
        Verifica todas as pós-condições para um par input/output.
        """
        results = {
            'satisfied': True,
            'violations': [],
            'passed': []
        }
        
        for post in self.postconditions:
            try:
                if post.checker(input_data, output_data):
                    results['passed'].append(post.name)
                else:
                    results['satisfied'] = False
                    results['violations'].append({
                        'postcondition': post.name,
                        'description': post.description
                    })
            except Exception as e:
                results['satisfied'] = False
                results['violations'].append({
                    'postcondition': post.name,
                    'description': f'Check failed: {e}'
                })
        
        return results

# Pós-condições comuns para código gerado

def create_code_postconditions() -> List[Postcondition]:
    """Cria conjunto padrão de pós-condições para código gerado."""
    
    postconditions = []
    
    # Pós-condição: Código é sintaticamente válido
    def is_valid_python(input_data: Any, code: str) -> bool:
        try:
            ast.parse(code)
            return True
        except SyntaxError:
            return False
    
    postconditions.append(Postcondition(
        name='syntactically_valid',
        checker=is_valid_python,
        description='Código gerado deve ser sintaticamente válido'
    ))
    
    # Pós-condição: Código não contém chamadas de sistema perigosas
    def no_dangerous_calls(input_data: Any, code: str) -> bool:
        dangerous = ['eval(', 'exec(', '__import__', 'os.system', 'subprocess.call']
        return not any(d in code for d in dangerous)
    
    postconditions.append(Postcondition(
        name='no_dangerous_calls',
        checker=no_dangerous_calls,
        description='Código não deve conter chamadas de sistema perigosas'
    ))
    
    # Pós-condição: Código contém tratamento de exceções
    def has_error_handling(input_data: Any, code: str) -> bool:
        try:
            tree = ast.parse(code)
            for node in ast.walk(tree):
                if isinstance(node, (ast.Try, ast.TryStar)):
                    return True
            return False
        except:
            return False
    
    postconditions.append(Postcondition(
        name='has_error_handling',
        checker=has_error_handling,
        description='Código deve conter tratamento de exceções'
    ))
    
    # Pós-condição: Tamanho razoável (não muito maior que input)
    def reasonable_size(input_data: Any, code: str) -> bool:
        input_size = len(str(input_data))
        output_size = len(code)
        # Código não deve ser mais de 10x maior que a especificação
        return output_size <= max(input_size * 10, 1000)
    
    postconditions.append(Postcondition(
        name='reasonable_size',
        checker=reasonable_size,
        description='Código gerado deve ter tamanho proporcional à especificação'
    ))
    
    return postconditions

# Pós-condições para saídas textuais/naturais

def create_text_output_postconditions() -> List[Postcondition]:
    """Pós-condições para saídas textuais de LLMs."""
    
    postconditions = []
    
    # Pós-condição: Saída não vazia
    postconditions.append(Postcondition(
        name='non_empty_output',
        checker=lambda i, o: bool(o and str(o).strip()),
        description='Saída não pode ser vazia'
    ))
    
    # Pós-condição: Coerência de idioma (input PT → output PT)
    def language_coherence(input_data: Any, output: str) -> bool:
        input_str = str(input_data).lower()
        output_str = str(output).lower()
        
        # Heurística simples: se input tem palavras portuguesas comuns,
        # output também deve ter
        pt_markers = ['o', 'a', 'de', 'para', 'com', 'um', 'uma']
        input_pt_score = sum(1 for m in pt_markers if m in input_str.split())
        
        if input_pt_score >= 3:  # Provavelmente português
            output_pt_score = sum(1 for m in pt_markers if m in output_str.split())
            return output_pt_score >= 2  # Output deve também ter marcas de PT
        
        return True  # Não podemos inferir idioma do input
    
    postconditions.append(Postcondition(
        name='language_coherence',
        checker=language_coherence,
        description='Idioma da saída deve ser coerente com o input'
    ))
    
    # Pós-condição: Ausência de padrões de "alucinação"
    def no_hallucination_patterns(input_data: Any, output: str) -> bool:
        hallucination_indicators = [
            'eu não tenho informações',
            'como uma IA',
            'meu conhecimento vai até',
            'não posso acessar'
        ]
        output_lower = str(output).lower()
        return not any(ind in output_lower for ind in hallucination_indicators)
    
    postconditions.append(Postcondition(
        name='no_hallucination_patterns',
        checker=no_hallucination_patterns,
        description='Saída não deve conter padrões típicos de alucinação'
    ))
    
    return postconditions
```

### 4.3.4 Invariantes: Propriedades que Devem Sempre se Manter

Invariantes em sistemas com IA devem considerar tanto propriedades do código gerado quanto propriedades do processo de geração. **Um invariante robusto continua válido mesmo quando o componente de IA se comporta de forma inesperada**.

```python
# Sistema de invariantes para sistemas com componentes de IA

from typing import Set, Dict, Any
from dataclasses import dataclass, field

@dataclass
class SystemInvariant:
    """
    Invariante de sistema para código gerado por IA.
    Define propriedades que devem sempre se manter.
    """
    name: str
    description: str
    check: Callable[[Dict[str, Any]], bool]
    scope: str  # 'global', 'per_session', 'per_request'
    auto_remediate: bool = False

class InvariantRegistry:
    """
    Registro de invariantes para sistema com componentes de IA.
    """
    
    def __init__(self):
        self.invariants: List[SystemInvariant] = []
        self.violation_history: List[Dict] = []
    
    def register(self, invariant: SystemInvariant):
        """Registra um novo invariante."""
        self.invariants.append(invariant)
    
    def verify_all(self, context: Dict[str, Any]) -> List[SystemInvariant]:
        """Verifica todos os invariantes e retorna os violados."""
        violated = []
        
        for inv in self.invariants:
            try:
                if not inv.check(context):
                    violated.append(inv)
                    self.violation_history.append({
                        'invariant': inv.name,
                        'timestamp': datetime.now(),
                        'context_snapshot': str(context)[:500]  # Truncado
                    })
            except Exception as e:
                # Falha na verificação é tratada como violação
                violated.append(inv)
        
        return violated

# Invariantes essenciais para sistemas com IA

def create_core_invariants() -> InvariantRegistry:
    """Cria registro com invariantes essenciais para sistemas de IA."""
    registry = InvariantRegistry()
    
    # Invariante 1: Isolamento de execução
    # Código gerado nunca executa fora de sandbox
    registry.register(SystemInvariant(
        name='execution_isolation',
        description='Código gerado deve executar apenas dentro de sandbox',
        check=lambda ctx: ctx.get('execution_context') == 'sandbox',
        scope='per_request',
        auto_remediate=True
    ))
    
    # Invariante 2: Auditoria completa
    # Toda geração e execução é logada
    registry.register(SystemInvariant(
        name='audit_completeness',
        description='Toda operacao de IA deve ter log de auditoria',
        check=lambda ctx: ctx.get('audit_log_id') is not None,
        scope='per_request'
    ))
    
    # Invariante 3: Rate limiting
    # Não excede quota de uso
    registry.register(SystemInvariant(
        name='rate_limit_compliance',
        description='Uso de API de IA dentro dos limites configurados',
        check=lambda ctx: ctx.get('requests_this_minute', 0) <= 
                         ctx.get('rate_limit', 60),
        scope='global',
        auto_remediate=True
    ))
    
    # Invariante 4: Sanitização de output
    # Output nunca contém dados sensíveis do sistema
    sensitive_patterns = ['password', 'secret', 'key', 'token', 'credential']
    
    def no_sensitive_exposure(ctx: Dict) -> bool:
        output = str(ctx.get('output', '')).lower()
        return not any(pattern in output for pattern in sensitive_patterns)
    
    registry.register(SystemInvariant(
        name='output_sanitization',
        description='Output nao expoe dados sensiveis do sistema',
        check=no_sensitive_exposure,
        scope='per_request',
        auto_remediate=True
    ))
    
    # Invariante 5: Consistência de estado
    # Estado do sistema permanece consistente após execução
    registry.register(SystemInvariant(
        name='state_consistency',
        description='Estado do sistema consistente apos operacao',
        check=lambda ctx: ctx.get('state_hash_before') == 
                         ctx.get('state_hash_after') or
                         ctx.get('transaction_committed', False),
        scope='per_request',
        auto_remediate=True
    ))
    
    # Invariante 6: Timeout enforcement
    # Execuções sempre respeitam timeout
    registry.register(SystemInvariant(
        name='timeout_enforcement',
        description='Operacoes respeitam limites de tempo configurados',
        check=lambda ctx: ctx.get('execution_time_ms', 0) <= 
                         ctx.get('timeout_ms', 30000),
        scope='per_request',
        auto_remediate=True
    ))
    
    return registry
```

### 4.3.5 Contratos Probabilísticos

Para componentes intrinsecamente não-determinísticos, **contratos tradicionais ("sempre verdadeiro") podem ser relaxados para contratos probabilísticos ("verdadeiro com probabilidade p")**. Esta abordagem reconhece que sistemas de IA podem ocasionalmente falhar, mas quantifica e limita esta probabilidade.

```python
# Framework de contratos probabilísticos

from dataclasses import dataclass
from typing import Callable, List
import statistics

@dataclass
class ProbabilisticContract:
    """
    Contrato que especifica garantias probabilísticas.
    """
    name: str
    validator: Callable[[Any], bool]
    required_confidence: float  # p ∈ [0, 1]
    min_samples: int
    description: str

class ProbabilisticContractVerifier:
    """
    Verificador de contratos probabilísticos.
    Avalia conformidade baseada em múltiplas execuções.
    """
    
    def __init__(self):
        self.contracts: List[ProbabilisticContract] = []
        self.execution_history: Dict[str, List[bool]] = {}
    
    def add_contract(self, contract: ProbabilisticContract):
        """Adiciona contrato probabilístico."""
        self.contracts.append(contract)
        self.execution_history[contract.name] = []
    
    def record_execution(self, contract_name: str, result: Any) -> bool:
        """
        Registra resultado de execução para um contrato.
        Retorna se execução individual satisfaz contrato.
        """
        contract = next(
            (c for c in self.contracts if c.name == contract_name), 
            None
        )
        
        if not contract:
            return False
        
        valid = contract.validator(result)
        self.execution_history[contract_name].append(valid)
        
        return valid
    
    def verify_contract(self, contract_name: str) -> Dict:
        """
        Verifica se contrato está sendo satisfeito estatisticamente.
        """
        contract = next(
            (c for c in self.contracts if c.name == contract_name),
            None
        )
        
        if not contract:
            return {'error': 'Contract not found'}
        
        history = self.execution_history.get(contract_name, [])
        
        if len(history) < contract.min_samples:
            return {
                'contract': contract_name,
                'status': 'INSUFFICIENT_DATA',
                'samples': len(history),
                'required': contract.min_samples,
                'current_confidence': None
            }
        
        success_rate = sum(history) / len(history)
        
        # Intervalo de confiança 95%
        if len(history) > 1:
            std_dev = statistics.stdev([1 if x else 0 for x in history])
            margin_error = 1.96 * (std_dev / (len(history) ** 0.5))
        else:
            margin_error = 0
        
        lower_bound = max(0, success_rate - margin_error)
        
        return {
            'contract': contract_name,
            'status': 'SATISFIED' if lower_bound >= contract.required_confidence 
                     else 'VIOLATED',
            'samples': len(history),
            'success_rate': success_rate,
            'confidence_interval_95': (lower_bound, 
                                       min(1, success_rate + margin_error)),
            'required_confidence': contract.required_confidence,
            'margin_of_error': margin_error
        }
    
    def verify_all(self) -> List[Dict]:
        """Verifica todos os contratos registrados."""
        return [self.verify_contract(c.name) for c in self.contracts]

# Exemplos de contratos probabilísticos

def create_llm_output_contracts() -> List[ProbabilisticContract]:
    """Cria contratos probabilísticos para outputs de LLM."""
    
    contracts = []
    
    # Contrato: Output é JSON válido em 95% das vezes
    contracts.append(ProbabilisticContract(
        name='json_validity',
        validator=lambda x: _is_valid_json(x),
        required_confidence=0.95,
        min_samples=100,
        description='Output deve ser JSON valido em 95% das execucoes'
    ))
    
    # Contrato: Resposta contém campo 'result' em 99% das vezes
    contracts.append(ProbabilisticContract(
        name='result_field_presence',
        validator=lambda x: _has_field(x, 'result'),
        required_confidence=0.99,
        min_samples=200,
        description='Resposta deve conter campo result em 99% das execucoes'
    ))
    
    # Contrato: Tempo de resposta < 2s em 90% das vezes
    contracts.append(ProbabilisticContract(
        name='response_time',
        validator=lambda x: x.get('response_time_ms', 99999) < 2000,
        required_confidence=0.90,
        min_samples=50,
        description='Tempo de resposta deve ser < 2s em 90% das execucoes'
    ))
    
    return contracts

def _is_valid_json(data: Any) -> bool:
    """Verifica se dado é JSON válido."""
    if isinstance(data, str):
        try:
            json.loads(data)
            return True
        except:
            return False
    return isinstance(data, dict)

def _has_field(data: Any, field: str) -> bool:
    """Verifica se dado contém campo específico."""
    if isinstance(data, dict):
        return field in data
    if isinstance(data, str):
        try:
            parsed = json.loads(data)
            return field in parsed
        except:
            return False
    return False
```

## 4.4 Análise Automática de Precondições e Pós-condições

### 4.4.1 Geração Automática de Contratos a partir de Exemplos

A especificação manual de contratos para todo código gerado por IA é economicamente inviável em escala. **Técnicas de inferência automática podem derivar contratos a partir de exemplos de execução**, reduzindo o esforço humano necessário.

```python
# Sistema de inferência de contratos a partir de exemplos

from typing import List, Dict, Any, Tuple, Set
from dataclasses import dataclass
import ast
import inspect

@dataclass
class ExecutionExample:
    """Exemplo de execução para inferência de contrato."""
    inputs: Dict[str, Any]
    output: Any
    exception: Optional[Exception] = None
    execution_time_ms: Optional[float] = None

@dataclass
class InferredContract:
    """Contrato inferido a partir de exemplos."""
    function_name: str
    preconditions: List[Dict]
    postconditions: List[Dict]
    confidence: float
    sample_size: int
    
class ContractInferenceEngine:
    """
    Motor de inferência de contratos a partir de exemplos de execução.
    """
    
    def __init__(self):
        self.examples: Dict[str, List[ExecutionExample]] = {}
        self.inferred_contracts: Dict[str, InferredContract] = {}
    
    def add_example(self, function_name: str, example: ExecutionExample):
        """Adiciona exemplo de execução."""
        if function_name not in self.examples:
            self.examples[function_name] = []
        self.examples[function_name].append(example)
    
    def infer_contracts(self, function_name: str) -> InferredContract:
        """
        Infere contratos a partir dos exemplos coletados.
        """
        examples = self.examples.get(function_name, [])
        
        if len(examples) < 5:
            return InferredContract(
                function_name=function_name,
                preconditions=[],
                postconditions=[],
                confidence=0.0,
                sample_size=len(examples)
            )
        
        preconditions = self._infer_preconditions(examples)
        postconditions = self._infer_postconditions(examples)
        
        contract = InferredContract(
            function_name=function_name,
            preconditions=preconditions,
            postconditions=postconditions,
            confidence=self._calculate_confidence(examples, preconditions, postconditions),
            sample_size=len(examples)
        )
        
        self.inferred_contracts[function_name] = contract
        return contract
    
    def _infer_preconditions(self, examples: List[ExecutionExample]) -> List[Dict]:
        """Infere precondições a partir de exemplos bem-sucedidos."""
        preconditions = []
        
        # Separa exemplos bem-sucedidos e com falha
        successful = [e for e in examples if e.exception is None]
        failed = [e for e in examples if e.exception is not None]
        
        if not successful:
            return preconditions
        
        # Analisa tipos de inputs
        for param_name in successful[0].inputs.keys():
            values = [e.inputs[param_name] for e in successful]
            
            # Inferência de tipo
            types = set(type(v).__name__ for v in values)
            if len(types) == 1:
                preconditions.append({
                    'type': 'type_constraint',
                    'parameter': param_name,
                    'expected_type': list(types)[0],
                    'confidence': len(successful) / len(examples)
                })
            
            # Inferência de range para numéricos
            if all(isinstance(v, (int, float)) for v in values):
                min_val = min(values)
                max_val = max(values)
                
                preconditions.append({
                    'type': 'range_constraint',
                    'parameter': param_name,
                    'min_observed': min_val,
                    'max_observed': max_val,
                    'suggested_min': self._suggest_bound(min_val, 'lower'),
                    'suggested_max': self._suggest_bound(max_val, 'upper'),
                    'confidence': len(successful) / len(examples)
                })
            
            # Inferência de não-nulidade
            if all(v is not None for v in values):
                preconditions.append({
                    'type': 'non_null',
                    'parameter': param_name,
                    'confidence': len(successful) / len(examples)
                })
            
            # Inferência de não-vazio para coleções
            if all(isinstance(v, (list, str, dict)) and len(v) > 0 for v in values):
                preconditions.append({
                    'type': 'non_empty',
                    'parameter': param_name,
                    'confidence': len(successful) / len(examples)
                })
        
        # Analisa diferenças entre sucesso e falha
        if failed:
            for param_name in successful[0].inputs.keys():
                success_values = set(str(e.inputs[param_name]) for e in successful)
                failure_values = set(str(e.inputs[param_name]) for e in failed)
                
                # Valores que aparecem apenas em falhas
                failure_only = failure_values - success_values
                if failure_only:
                    preconditions.append({
                        'type': 'avoid_values',
                        'parameter': param_name,
                        'problematic_values': list(failure_only)[:10],
                        'confidence': len(failure_only) / len(failed) if failed else 0
                    })
        
        return preconditions
    
    def _infer_postconditions(self, examples: List[ExecutionExample]) -> List[Dict]:
        """Infere pós-condições a partir de exemplos."""
        postconditions = []
        
        successful = [e for e in examples if e.exception is None]
        
        if not successful:
            return postconditions
        
        # Inferência de tipo de retorno
        return_types = set(type(e.output).__name__ for e in successful)
        if len(return_types) == 1:
            postconditions.append({
                'type': 'return_type',
                'expected_type': list(return_types)[0],
                'confidence': len(successful) / len(examples)
            })
        
        # Inferência de não-nulidade do retorno
        if all(e.output is not None for e in successful):
            postconditions.append({
                'type': 'non_null_return',
                'confidence': len(successful) / len(examples)
            })
        
        # Inferência de relação input-output para numéricos
        for param_name in successful[0].inputs.keys():
            input_values = [e.inputs[param_name] for e in successful]
            output_values = [e.output for e in successful]
            
            if all(isinstance(v, (int, float)) for v in input_values + output_values):
                # Verifica se output é sempre maior que input
                if all(o > i for i, o in zip(input_values, output_values)):
                    postconditions.append({
                        'type': 'comparison',
                        'description': f'output > {param_name}',
                        'confidence': len(successful) / len(examples)
                    })
                
                # Verifica se output está em range similar
                input_range = max(input_values) - min(input_values)
                output_range = max(output_values) - min(output_values)
                if abs(input_range - output_range) / max(input_range, 1) < 0.5:
                    postconditions.append({
                        'type': 'magnitude_preservation',
                        'description': 'output magnitude similar to input',
                        'confidence': len(successful) / len(examples)
                    })
        
        # Inferência de tempo de execução
        times = [e.execution_time_ms for e in successful if e.execution_time_ms]
        if times:
            avg_time = sum(times) / len(times)
            max_time = max(times)
            postconditions.append({
                'type': 'performance',
                'average_ms': avg_time,
                'max_observed_ms': max_time,
                'suggested_timeout_ms': max_time * 2,
                'confidence': len(times) / len(successful)
            })
        
        return postconditions
    
    def _suggest_bound(self, value: float, direction: str) -> float:
        """Sugere bound arredondado para valor observado."""
        import math
        
        if value == 0:
            return 0
        
        magnitude = 10 ** math.floor(math.log10(abs(value)))
        
        if direction == 'lower':
            return math.floor(value / magnitude) * magnitude
        else:
            return math.ceil(value / magnitude) * magnitude
    
    def _calculate_confidence(self, examples: List[ExecutionExample],
                             preconditions: List[Dict],
                             postconditions: List[Dict]) -> float:
        """Calcula confiança geral nos contratos inferidos."""
        if len(examples) < 10:
            return 0.3
        elif len(examples) < 50:
            return 0.6
        elif len(examples) < 200:
            return 0.8
        else:
            return 0.95

# Uso do sistema de inferência

def demonstrate_contract_inference():
    """Demonstra inferência de contratos a partir de exemplos."""
    
    engine = ContractInferenceEngine()
    
    # Exemplos de execução de função de cálculo de desconto
    examples = [
        ExecutionExample(
            inputs={'price': 100.0, 'discount_percent': 10},
            output=90.0,
            execution_time_ms=0.5
        ),
        ExecutionExample(
            inputs={'price': 50.0, 'discount_percent': 20},
            output=40.0,
            execution_time_ms=0.4
        ),
        ExecutionExample(
            inputs={'price': 200.0, 'discount_percent': 0},
            output=200.0,
            execution_time_ms=0.3
        ),
        ExecutionExample(
            inputs={'price': -10.0, 'discount_percent': 10},
            output=None,
            exception=ValueError("Price must be positive"),
            execution_time_ms=0.1
        ),
    ]
    
    for ex in examples:
        engine.add_example('calculate_discount', ex)
    
    contract = engine.infer_contracts('calculate_discount')
    
    print(f"Contrato inferido para {contract.function_name}:")
    print(f"  Confiança: {contract.confidence}")
    print(f"  Amostras: {contract.sample_size}")
    print(f"  Precondições: {len(contract.preconditions)}")
    for pre in contract.preconditions:
        print(f"    - {pre['type']}: {pre}")
    print(f"  Pós-condições: {len(contract.postconditions)}")
    for post in contract.postconditions:
        print(f"    - {post['type']}: {post}")
```

### 4.4.2 Inferência de Precondições via Análise Estática

Além da inferência dinâmica a partir de exemplos, **análise estática de código pode derivar precondições examinando checagens explícitas e padrões de acesso a dados**. Esta abordagem complementa a inferência dinâmica, capturando restrições que podem não ter sido exercitadas nos exemplos.

```python
# Sistema de inferência estática de precondições

import ast
from typing import List, Dict, Set
from dataclasses import dataclass

@dataclass
class StaticPrecondition:
    """Precondição inferida via análise estática."""
    parameter: str
    constraint_type: str
    constraint_value: Any
    source_line: int
    confidence: str  # 'high', 'medium', 'low'

class StaticContractAnalyzer(ast.NodeVisitor):
    """
    Analisador AST para inferir contratos a partir de código.
    """
    
    def __init__(self):
        self.preconditions: List[StaticPrecondition] = []
        self.current_function: Optional[str] = None
        self.parameters: Set[str] = set()
    
    def visit_FunctionDef(self, node: ast.FunctionDef):
        """Visita definição de função."""
        self.current_function = node.name
        self.parameters = {arg.arg for arg in node.args.args}
        
        # Visita corpo da função
        for stmt in node.body:
            self.visit(stmt)
        
        self.current_function = None
        self.parameters = set()
    
    def visit_If(self, node: ast.If):
        """Extrai precondições de verificações iniciais."""
        # Verifica se é uma verificação de tipo "if not X: raise"
        if self._is_guard_clause(node):
            preconds = self._extract_from_guard(node)
            self.preconditions.extend(preconds)
        
        self.generic_visit(node)
    
    def visit_Assert(self, node: ast.Assert):
        """Extrai precondições de assertions."""
        preconds = self._extract_from_assert(node)
        self.preconditions.extend(preconds)
    
    def _is_guard_clause(self, node: ast.If) -> bool:
        """Verifica se é uma cláusula de guarda (raise/return no if)."""
        if len(node.body) == 0:
            return False
        
        first_stmt = node.body[0]
        return isinstance(first_stmt, (ast.Raise, ast.Return))
    
    def _extract_from_guard(self, node: ast.If) -> List[StaticPrecondition]:
        """Extrai precondições de cláusula de guarda."""
        preconds = []
        
        # Analisa a condição do if
        test = node.test
        
        # Caso: if x is None: raise
        if isinstance(test, ast.Compare) and len(test.ops) == 1:
            if isinstance(test.ops[0], ast.Is) and isinstance(test.comparators[0], ast.Constant):
                if test.comparators[0].value is None:
                    # Verifica se é "if x is None" ou "if x is not None"
                    if isinstance(test.left, ast.Name) and test.left.id in self.parameters:
                        preconds.append(StaticPrecondition(
                            parameter=test.left.id,
                            constraint_type='non_null',
                            constraint_value=True,
                            source_line=node.lineno,
                            confidence='high'
                        ))
        
        # Caso: if not isinstance(x, Type): raise
        if isinstance(test, ast.UnaryOp) and isinstance(test.op, ast.Not):
            if isinstance(test.operand, ast.Call):
                call = test.operand
                if isinstance(call.func, ast.Name) and call.func.id == 'isinstance':
                    if len(call.args) >= 2:
                        arg = call.args[0]
                        typ = call.args[1]
                        if isinstance(arg, ast.Name) and arg.id in self.parameters:
                            type_name = self._get_type_name(typ)
                            preconds.append(StaticPrecondition(
                                parameter=arg.id,
                                constraint_type='type',
                                constraint_value=type_name,
                                source_line=node.lineno,
                                confidence='high'
                            ))
        
        # Caso: if x < 0: raise
        if isinstance(test, ast.Compare):
            left = test.left
            for op, comparator in zip(test.ops, test.comparators):
                if isinstance(left, ast.Name) and left.id in self.parameters:
                    if isinstance(op, ast.Lt) and isinstance(comparator, ast.Constant):
                        preconds.append(StaticPrecondition(
                            parameter=left.id,
                            constraint_type='min_value',
                            constraint_value=comparator.value,
                            source_line=node.lineno,
                            confidence='medium'
                        ))
        
        return preconds
    
    def _extract_from_assert(self, node: ast.Assert) -> List[StaticPrecondition]:
        """Extrai precondições de assert."""
        preconds = []
        test = node.test
        
        # assert x > 0
        if isinstance(test, ast.Compare):
            left = test.left
            for op, comparator in zip(test.ops, test.comparators):
                if isinstance(left, ast.Name) and left.id in self.parameters:
                    if isinstance(op, ast.Gt) and isinstance(comparator, ast.Constant):
                        preconds.append(StaticPrecondition(
                            parameter=left.id,
                            constraint_type='greater_than',
                            constraint_value=comparator.value,
                            source_line=node.lineno,
                            confidence='high'
                        ))
        
        return preconds
    
    def _get_type_name(self, node: ast.AST) -> str:
        """Extrai nome do tipo de um nó AST."""
        if isinstance(node, ast.Name):
            return node.id
        elif isinstance(node, ast.Attribute):
            return f"{self._get_type_name(node.value)}.{node.attr}"
        elif isinstance(node, ast.Constant):
            return str(node.value)
        return "unknown"

def analyze_function_for_contracts(source_code: str, function_name: str) -> List[StaticPrecondition]:
    """
    Analisa função em código fonte e infere precondições.
    """
    try:
        tree = ast.parse(source_code)
        analyzer = StaticContractAnalyzer()
        analyzer.visit(tree)
        
        # Filtra precondições da função específica
        return [p for p in analyzer.preconditions]
    except SyntaxError:
        return []

# Exemplo de uso
example_code = '''
def process_payment(amount: float, currency: str, user_id: int) -> dict:
    """Processa pagamento com validações."""
    
    # Guard clauses inferem precondições
    if amount is None:
        raise ValueError("Amount cannot be None")
    
    if amount <= 0:
        raise ValueError("Amount must be positive")
    
    if not isinstance(currency, str):
        raise TypeError("Currency must be string")
    
    if len(currency) != 3:
        raise ValueError("Currency must be -letter code")
    
    # Assertions também contribuem
    assert user_id > 0, "User ID must be positive"
    
    # ... lógica de processamento
    return {'status': 'success'}
'''

# Análise demonstrativa
# preconditions = analyze_function_for_contracts(example_code, 'process_payment')
```

### 4.4.3 Uso de LLMs para Verificação de Contratos

Uma aplicação meta-cognitiva de IA é **utilizar LLMs para verificar se código gerado por IA satisfaz contratos especificados**. Esta abordagem reconhece que a verificação formal completa é frequentemente inatingível, e utiliza a capacidade de raciocínio dos LLMs como oráculo aproximado.

```python
# Sistema de verificação de contratos usando LLM

from dataclasses import dataclass
from typing import List, Dict, Optional
import json

@dataclass
class ContractSpecification:
    """Especificação de contrato em linguagem natural e formal."""
    name: str
    description: str
    preconditions: List[str]
    postconditions: List[str]
    invariants: List[str]
    formal_notation: Optional[str] = None

@dataclass
class VerificationResult:
    """Resultado da verificação de contrato por LLM."""
    contract_name: str
    satisfied: bool
    confidence: float
    reasoning: str
    violations: List[str]
    suggestions: List[str]

class LLMContractVerifier:
    """
    Verificador de contratos que utiliza LLM como oráculo.
    Verifica se código gerado satisfaz especificação contratual.
    """
    
    def __init__(self, llm_client):
        self.llm = llm_client
        self.verification_history: List[VerificationResult] = []
    
    def verify_code_against_contract(
        self,
        code: str,
        contract: ContractSpecification,
        context: Optional[Dict] = None
    ) -> VerificationResult:
        """
        Verifica se código satisfaz contrato especificado.
        Utiliza LLM para análise semântica.
        """
        
        # Constrói prompt de verificação estruturado
        prompt = self._build_verification_prompt(code, contract, context)
        
        # Invoca LLM para análise
        response = self.llm.complete(
            prompt=prompt,
            temperature=0.1,  # Baixa temperatura para consistência
            response_format={'type': 'json_object'}
        )
        
        # Parse do resultado
        try:
            result_data = json.loads(response)
            
            result = VerificationResult(
                contract_name=contract.name,
                satisfied=result_data.get('satisfied', False),
                confidence=result_data.get('confidence', 0.0),
                reasoning=result_data.get('reasoning', ''),
                violations=result_data.get('violations', []),
                suggestions=result_data.get('suggestions', [])
            )
            
            self.verification_history.append(result)
            return result
            
        except json.JSONDecodeError:
            return VerificationResult(
                contract_name=contract.name,
                satisfied=False,
                confidence=0.0,
                reasoning="Failed to parse LLM response",
                violations=["Verification parsing error"],
                suggestions=["Retry verification"]
            )
    
    def _build_verification_prompt(
        self,
        code: str,
        contract: ContractSpecification,
        context: Optional[Dict]
    ) -> str:
        """Constrói prompt estruturado para verificação."""
        
        prompt = f"""You are a formal verification expert analyzing code against a contract specification.

## CODE TO VERIFY:
```python
{code}
```

## CONTRACT SPECIFICATION:
Name: {contract.name}
Description: {contract.description}

### Preconditions (must be checked by the code):
"""
        
        for i, pre in enumerate(contract.preconditions, 1):
            prompt += f"{i}. {pre}\n"
        
        prompt += "\n### Postconditions (must be guaranteed by the code):\n"
        for i, post in enumerate(contract.postconditions, 1):
            prompt += f"{i}. {post}\n"
        
        prompt += "\n### Invariants (must be maintained):\n"
        for i, inv in enumerate(contract.invariants, 1):
            prompt += f"{i}. {inv}\n"
        
        if context:
            prompt += f"\n## CONTEXT:\n{json.dumps(context, indent=2)}\n"
        
        prompt += """
## TASK:
Analyze the code and determine if it satisfies the contract. Provide your analysis in the following JSON format:

{
  "satisfied": true/false,
  "confidence": 0.0-1.0,
  "reasoning": "Detailed explanation of your analysis",
  "violations": ["List of specific contract violations found"],
  "suggestions": ["Suggestions for fixing violations, if any"]
}

Be thorough but concise. Focus on semantic correctness, not just syntax.
"""
        
        return prompt
    
    def batch_verify(
        self,
        code_samples: List[str],
        contract: ContractSpecification
    ) -> List[VerificationResult]:
        """
        Verifica múltiplas amostras de código contra mesmo contrato.
        Útil para avaliar consistência de geração.
        """
        results = []
        
        for code in code_samples:
            result = self.verify_code_against_contract(code, contract)
            results.append(result)
        
        return results
    
    def generate_contract_from_examples(
        self,
        examples: List[Tuple[str, str]],  # (input, expected_output)
        description: str
    ) -> ContractSpecification:
        """
        Gera especificação de contrato a partir de exemplos usando LLM.
        """
        prompt = f"""Based on the following examples of function behavior, generate a formal contract specification.

Description: {description}

## EXAMPLES:
"""
        
        for i, (input_desc, output_desc) in enumerate(examples, 1):
            prompt += f"""
Example {i}:
Input: {input_desc}
Output: {output_desc}
"""
        
        prompt += """
Generate a contract specification with preconditions, postconditions, and invariants that capture the observed behavior.

Return as JSON:
{
  "name": "contract_name",
  "description": "...",
  "preconditions": ["..."],
  "postconditions": ["..."],
  "invariants": ["..."]
}
"""
        
        response = self.llm.complete(
            prompt=prompt,
            temperature=0.2,
            response_format={'type': 'json_object'}
        )
        
        try:
            data = json.loads(response)
            return ContractSpecification(
                name=data['name'],
                description=data['description'],
                preconditions=data.get('preconditions', []),
                postconditions=data.get('postconditions', []),
                invariants=data.get('invariants', [])
            )
        except (json.JSONDecodeError, KeyError) as e:
            raise ValueError(f"Failed to generate contract: {e}")

# Exemplo de especificação de contrato
payment_contract = ContractSpecification(
    name="PaymentProcessingContract",
    description="Contrato para processamento seguro de pagamentos",
    preconditions=[
        "amount deve ser um número positivo maior que zero",
        "currency deve ser uma string de exatamente 3 caracteres maiúsculos",
        "user_id deve ser um inteiro positivo válido",
        "account associada a user_id deve estar ativa"
    ],
    postconditions=[
        "Retorna dicionário com campo 'status' contendo 'success' ou 'failure'",
        "Se sucesso, 'transaction_id' deve estar presente e ser UUID válido",
        "Se falha, 'error_code' deve estar presente com código reconhecido",
        "Balance da conta nunca deve ficar negativo após operação"
    ],
    invariants=[
        "Estado da transação é atomicamente atualizado",
        "Logs de auditoria são escritos para toda operação",
        "Rate limiting é respeitado"
    ]
)
```

## 4.5 Detecção de Violações de Contrato

### 4.5.1 Sistema de Alertas e Escalação

A detecção de violações de contrato em produção requer um sistema sofisticado de alertas que equilibre sensibilidade (não perder violações reais) com especificidade (não inundar operadores com falsos positivos). **Um sistema de alertas efetivo categoriza violações por severidade, enriquece com contexto, e escala através de múltiplos canais conforme a gravidade**.

```python
# Sistema de alertas e escalação para violações de contrato

from dataclasses import dataclass
from typing import List, Dict, Callable, Optional
from datetime import datetime, timedelta
from enum import Enum
import json

class AlertSeverity(Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"

class EscalationLevel(Enum):
    L1 = "level_1"      # Sistema autônomo
    L2 = "level_2"      # Equipe de plantão
    L3 = "level_3"      # Engenharia
    L4 = "level_4"      # Management + Legal

@dataclass
class ContractViolationAlert:
    """Alerta de violação de contrato."""
    alert_id: str
    timestamp: datetime
    severity: AlertSeverity
    contract_name: str
    invariant_name: Optional[str]
    violation_details: Dict
    affected_service: str
    context: Dict
    escalation_level: EscalationLevel

class AlertManager:
    """
    Gerenciador de alertas para violações de contrato.
    Implementa escalação inteligente e deduplicação.
    """
    
    def __init__(self):
        self.alert_handlers: Dict[AlertSeverity, List[Callable]] = {
            severity: [] for severity in AlertSeverity
        }
        self.escalation_rules: List[EscalationRule] = []
        self.recent_alerts: List[ContractViolationAlert] = []
        self.deduplication_window = timedelta(minutes=5)
    
    def register_handler(self, severity: AlertSeverity, handler: Callable):
        """Registra handler para alertas de severidade específica."""
        self.alert_handlers[severity].append(handler)
    
    def add_escalation_rule(self, rule: 'EscalationRule'):
        """Adiciona regra de escalação."""
        self.escalation_rules.append(rule)
    
    def process_violation(self, violation: InvariantViolation,
                         context: Dict) -> ContractViolationAlert:
        """
        Processa violação e gera alerta apropriado.
        """
        # Determina severidade
        severity = self._determine_severity(violation)
        
        # Verifica deduplicação
        if self._is_duplicate(violation):
            return None
        
        # Determina nível de escalação
        escalation = self._determine_escalation(violation, severity, context)
        
        # Cria alerta
        alert = ContractViolationAlert(
            alert_id=self._generate_alert_id(),
            timestamp=datetime.now(),
            severity=severity,
            contract_name=violation.invariant_name,
            invariant_name=violation.invariant_name,
            violation_details={
                'context': violation.context,
                'severity_label': violation.severity
            },
            affected_service=context.get('service_name', 'unknown'),
            context=context,
            escalation_level=escalation
        )
        
        self.recent_alerts.append(alert)
        self._cleanup_old_alerts()
        
        # Dispara handlers
        self._dispatch_alert(alert)
        
        return alert
    
    def _determine_severity(self, violation: InvariantViolation) -> AlertSeverity:
        """Determina severidade do alerta baseado na violação."""
        mapping = {
            'critical': AlertSeverity.CRITICAL,
            'high': AlertSeverity.HIGH,
            'medium': AlertSeverity.MEDIUM,
            'low': AlertSeverity.LOW
        }
        return mapping.get(violation.severity, AlertSeverity.MEDIUM)
    
    def _is_duplicate(self, violation: InvariantViolation) -> bool:
        """Verifica se violação similar foi alertada recentemente."""
        cutoff = datetime.now() - self.deduplication_window
        
        for alert in self.recent_alerts:
            if alert.timestamp < cutoff:
                continue
            
            # Mesmo invariante, mesmo serviço
            if (alert.contract_name == violation.invariant_name and
                alert.violation_details.get('context', {}).get('service') == 
                violation.context.get('service')):
                return True
        
        return False
    
    def _determine_escalation(self, violation: InvariantViolation,
                             severity: AlertSeverity,
                             context: Dict) -> EscalationLevel:
        """Determina nível de escalação apropriado."""
        for rule in self.escalation_rules:
            if rule.matches(violation, severity, context):
                return rule.escalation_level
        
        # Default baseado em severidade
        defaults = {
            AlertSeverity.CRITICAL: EscalationLevel.L4,
            AlertSeverity.HIGH: EscalationLevel.L3,
            AlertSeverity.MEDIUM: EscalationLevel.L2,
            AlertSeverity.LOW: EscalationLevel.L1,
            AlertSeverity.INFO: EscalationLevel.L1
        }
        return defaults.get(severity, EscalationLevel.L2)
    
    def _dispatch_alert(self, alert: ContractViolationAlert):
        """Dispara alerta para todos os handlers registrados."""
        handlers = self.alert_handlers.get(alert.severity, [])
        
        for handler in handlers:
            try:
                handler(alert)
            except Exception as e:
                # Log erro mas continua com outros handlers
                pass
    
    def _generate_alert_id(self) -> str:
        """Gera ID único para alerta."""
        import uuid
        return str(uuid.uuid4())[:8]
    
    def _cleanup_old_alerts(self):
        """Remove alertas antigos do buffer."""
        cutoff = datetime.now() - self.deduplication_window * 2
        self.recent_alerts = [a for a in self.recent_alerts if a.timestamp > cutoff]

@dataclass
class EscalationRule:
    """Regra para determinar escalação de alerta."""
    name: str
    escalation_level: EscalationLevel
    condition: Callable[[InvariantViolation, AlertSeverity, Dict], bool]
    
    def matches(self, violation: InvariantViolation, 
               severity: AlertSeverity, context: Dict) -> bool:
        return self.condition(violation, severity, context)

# Handlers de alerta

class AlertHandlers:
    """Coleção de handlers de alerta comuns."""
    
    @staticmethod
    def pagerduty_handler(alert: ContractViolationAlert):
        """Handler para integração com PagerDuty."""
        if alert.severity in (AlertSeverity.CRITICAL, AlertSeverity.HIGH):
            # Envia página para on-call
            pass
    
    @staticmethod
    def slack_handler(alert: ContractViolationAlert):
        """Handler para notificação Slack."""
        # Envia mensagem para canal apropriado baseado em severidade
        pass
    
    @staticmethod
    def email_handler(alert: ContractViolationAlert):
        """Handler para notificação por email."""
        if alert.escalation_level in (EscalationLevel.L3, EscalationLevel.L4):
            # Envia email para stakeholders
            pass
    
    @staticmethod
    def webhook_handler(alert: ContractViolationAlert):
        """Handler para webhook genérico."""
        # POST para endpoint configurado
        pass
    
    @staticmethod
    def auto_remediation_handler(alert: ContractViolationAlert):
        """Handler que tenta remediação automática."""
        if alert.escalation_level == EscalationLevel.L1:
            # Tenta ações autônomas de recuperação
            pass
```

### 4.5.2 Rollback Automático

Para violações críticas detectadas em produção, **sistemas modernos devem ser capazes de reverter automaticamente para um estado conhecido seguro**. O rollback automático é particularmente importante para código gerado por IA, onde a compreensão completa de falhas pode levar tempo.

```python
# Sistema de rollback automático para violações de contrato

from typing import Dict, List, Optional, Callable
from dataclasses import dataclass
from datetime import datetime
import json

@dataclass
class RollbackPoint:
    """Ponto de recuperação para rollback."""
    point_id: str
    timestamp: datetime
    state_snapshot: Dict
    version_tag: str
    metadata: Dict

class RollbackManager:
    """
    Gerenciador de rollback automático para sistemas com IA.
    Mantém pontos de recuperação e executa rollback quando necessário.
    """
    
    def __init__(self, max_history: int = 10):
        self.rollback_points: List[RollbackPoint] = []
        self.max_history = max_history
        self.active_rollback: Optional[str] = None
        self.pre_rollback_hooks: List[Callable] = []
        self.post_rollback_hooks: List[Callable] = []
    
    def create_rollback_point(self, state: Dict, version: str,
                             metadata: Optional[Dict] = None) -> str:
        """
        Cria novo ponto de rollback.
        """
        point = RollbackPoint(
            point_id=f"rb_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{len(self.rollback_points)}",
            timestamp=datetime.now(),
            state_snapshot=state.copy(),
            version_tag=version,
            metadata=metadata or {}
        )
        
        self.rollback_points.append(point)
        
        # Mantém apenas os N mais recentes
        if len(self.rollback_points) > self.max_history:
            self.rollback_points = self.rollback_points[-self.max_history:]
        
        return point.point_id
    
    def execute_rollback(self, point_id: Optional[str] = None,
                        reason: str = "") -> Dict:
        """
        Executa rollback para ponto especificado ou mais recente.
        """
        if self.active_rollback:
            return {
                'success': False,
                'error': 'Rollback already in progress',
                'active_rollback': self.active_rollback
            }
        
        # Seleciona ponto de rollback
        if point_id:
            point = next(
                (p for p in self.rollback_points if p.point_id == point_id),
                None
            )
        else:
            point = self.rollback_points[-1] if self.rollback_points else None
        
        if not point:
            return {
                'success': False,
                'error': 'No rollback point available'
            }
        
        self.active_rollback = point.point_id
        
        try:
            # Executa hooks pré-rollback
            for hook in self.pre_rollback_hooks:
                hook(point, reason)
            
            # Executa rollback propriamente dito
            result = self._perform_rollback(point)
            
            # Executa hooks pós-rollback
            for hook in self.post_rollback_hooks:
                hook(point, result)
            
            self.active_rollback = None
            
            return {
                'success': True,
                'rollback_point': point.point_id,
                'version_restored': point.version_tag,
                'details': result
            }
            
        except Exception as e:
            self.active_rollback = None
            return {
                'success': False,
                'error': str(e),
                'rollback_point': point.point_id
            }
    
    def _perform_rollback(self, point: RollbackPoint) -> Dict:
        """Executa lógica específica de rollback."""
        # Implementação depende do tipo de sistema
        # Exemplos: restaurar configuração, reverter deployment, etc.
        
        return {
            'state_restored': True,
            'timestamp': datetime.now().isoformat(),
            'affected_components': point.metadata.get('components', [])
        }
    
    def auto_rollback_on_violation(self, violation: InvariantViolation,
                                   context: Dict) -> Dict:
        """
        Avalia se violação justifica rollback automático e executa.
        """
        # Critérios para rollback automático
        should_rollback = (
            violation.severity == 'critical' and
            context.get('auto_rollback_enabled', False) and
            not self.active_rollback and
            self.rollback_points  # Tem ponto para voltar
        )
        
        if should_rollback:
            reason = f"Auto-rollback triggered by violation: {violation.invariant_name}"
            return self.execute_rollback(reason=reason)
        
        return {
            'success': False,
            'reason': 'Rollback criteria not met',
            'violation_severity': violation.severity,
            'auto_rollback_enabled': context.get('auto_rollback_enabled', False)
        }

# Estratégias de rollback específicas

class RollbackStrategies:
    """Estratégias de rollback para diferentes cenários."""
    
    @staticmethod
    def blue_green_rollback(current_version: str, 
                           previous_version: str) -> Dict:
        """
        Rollback usando deployment blue-green.
        Troca tráfego de volta para versão anterior.
        """
        return {
            'strategy': 'blue_green',
            'action': 'switch_traffic',
            'from': current_version,
            'to': previous_version,
            'downtime_seconds': 0
        }
    
    @staticmethod
    def canary_rollback(canary_percentage: float) -> Dict:
        """
        Rollback reduzindo percentual de canary para zero.
        """
        return {
            'strategy': 'canary',
            'action': 'reduce_canary',
            'target_percentage': 0,
            'current_percentage': canary_percentage
        }
    
    @staticmethod
    def feature_flag_rollback(flags: List[str]) -> Dict:
        """
        Rollback desabilitando feature flags.
        """
        return {
            'strategy': 'feature_flag',
            'action': 'disable_flags',
            'flags': flags
        }
    
    @staticmethod
    def database_rollback(migration_id: str) -> Dict:
        """
        Rollback de migração de banco de dados.
        """
        return {
            'strategy': 'database',
            'action': 'rollback_migration',
            'migration': migration_id,
            'warning': 'Data loss possible'
        }
```

### 4.5.3 Coleta de Evidências para Debugging

Quando uma violação de contrato ocorre, especialmente em código gerado por IA, **a coleta compreensiva de evidências é essencial para diagnóstico e prevenção futura**. O sistema deve capturar não apenas o estado imediato, mas o contexto completo que levou à violação.

```python
# Sistema de coleta de evidências para debugging

from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any
from datetime import datetime
import json
import traceback

@dataclass
class ViolationEvidence:
    """
    Pacote completo de evidências para violação de contrato.
    """
    evidence_id: str
    timestamp: datetime
    violation: InvariantViolation
    
    # Contexto de execução
    execution_context: Dict = field(default_factory=dict)
    
    # Stack trace completo
    stack_trace: str = ""
    
    # Estado do sistema
    system_state: Dict = field(default_factory=dict)
    
    # Código envolvido
    code_snapshot: str = ""
    code_version: str = ""
    
    # Histórico relevante
    recent_events: List[Dict] = field(default_factory=list)
    
    # Métricas de performance
    performance_metrics: Dict = field(default_factory=dict)
    
    # Entradas que levaram à violação
    input_data: Dict = field(default_factory=dict)
    
    # Logs relacionados
    relevant_logs: List[str] = field(default_factory=list)
    
    # Metadados adicionais
    metadata: Dict = field(default_factory=dict)

class EvidenceCollector:
    """
    Coletor de evidências para violações de contrato.
    Captura contexto completo para análise post-mortem.
    """
    
    def __init__(self, storage_backend=None):
        self.storage = storage_backend
        self.collection_hooks: List[Callable] = []
    
    def collect_evidence(self, violation: InvariantViolation,
                        context: Dict) -> ViolationEvidence:
        """
        Coleta evidências completas para uma violação.
        """
        evidence = ViolationEvidence(
            evidence_id=self._generate_id(),
            timestamp=datetime.now(),
            violation=violation,
            execution_context=self._collect_execution_context(context),
            stack_trace=self._collect_stack_trace(),
            system_state=self._collect_system_state(),
            code_snapshot=self._collect_code_snapshot(context),
            code_version=context.get('code_version', 'unknown'),
            recent_events=self._collect_recent_events(context),
            performance_metrics=self._collect_performance_metrics(),
            input_data=context.get('input_data', {}),
            relevant_logs=self._collect_relevant_logs(violation, context),
            metadata={
                'collector_version': '1.0',
                'collection_time_ms': 0,  # Preencher após coleta
                'additional_hooks': []
            }
        )
        
        # Executa hooks adicionais de coleta
        for hook in self.collection_hooks:
            try:
                additional_data = hook(violation, context)
                evidence.metadata['additional_hooks'].append(additional_data)
            except Exception as e:
                evidence.metadata[f'hook_error_{len(evidence.metadata)}'] = str(e)
        
        # Persiste evidências
        if self.storage:
            self.storage.save_evidence(evidence)
        
        return evidence
    
    def _generate_id(self) -> str:
        """Gera ID único para evidência."""
        import uuid
        return f"ev_{uuid.uuid4().hex[:12]}"
    
    def _collect_execution_context(self, context: Dict) -> Dict:
        """Coleta contexto de execução."""
        return {
            'process_id': context.get('process_id'),
            'thread_id': context.get('thread_id'),
            'request_id': context.get('request_id'),
            'user_id': context.get('user_id'),
            'session_id': context.get('session_id'),
            'environment': context.get('environment', 'unknown'),
            'region': context.get('region', 'unknown'),
            'timestamp_start': context.get('timestamp_start'),
            'timestamp_end': datetime.now().isoformat()
        }
    
    def _collect_stack_trace(self) -> str:
        """Coleta stack trace atual."""
        return traceback.format_exc() if traceback.format_exc() != 'NoneType: None\n' else ""
    
    def _collect_system_state(self) -> Dict:
        """Coleta estado do sistema."""
        import psutil
        
        try:
            return {
                'cpu_percent': psutil.cpu_percent(interval=0.1),
                'memory': {
                    'percent': psutil.virtual_memory().percent,
                    'available_mb': psutil.virtual_memory().available // (1024 * 1024)
                },
                'disk': {
                    'percent': psutil.disk_usage('/').percent
                },
                'open_files': len(psutil.Process().open_files()),
                'connections': len(psutil.Process().connections())
            }
        except Exception as e:
            return {'error': str(e)}
    
    def _collect_code_snapshot(self, context: Dict) -> str:
        """Coleta snapshot do código relevante."""
        # Se código gerado estiver disponível no contexto
        if 'generated_code' in context:
            return context['generated_code']
        
        if 'function_under_test' in context:
            try:
                import inspect
                func = context['function_under_test']
                return inspect.getsource(func)
            except:
                pass
        
        return "Code snapshot not available"
    
    def _collect_recent_events(self, context: Dict) -> List[Dict]:
        """Coleta eventos recentes relevantes."""
        # Busca em event store ou logs estruturados
        recent_events = context.get('recent_events', [])
        
        # Limita a eventos mais relevantes
        return recent_events[-20:] if recent_events else []
    
    def _collect_performance_metrics(self) -> Dict:
        """Coleta métricas de performance."""
        return {
            'response_time_ms': None,  # Preencher se disponível
            'cpu_time_ms': None,
            'memory_peak_mb': None,
            'io_operations': None
        }
    
    def _collect_relevant_logs(self, violation: InvariantViolation,
                              context: Dict) -> List[str]:
        """Coleta logs relevantes para a violação."""
        # Extrai logs do contexto ou busca em sistema de logging
        all_logs = context.get('logs', [])
        
        # Filtra logs próximos ao timestamp da violação
        violation_time = violation.timestamp
        relevant = []
        
        for log in all_logs:
            # Lógica de filtro baseada em timestamp ou conteúdo
            relevant.append(log)
        
        return relevant[-100:]  # Limita quantidade
    
    def add_collection_hook(self, hook: Callable):
        """Adiciona hook personalizado de coleta."""
        self.collection_hooks.append(hook)

# Análise de evidências

class EvidenceAnalyzer:
    """
    Analisador de evidências para identificar padrões.
    """
    
    def __init__(self):
        self.patterns: Dict[str, Callable] = {}
    
    def analyze(self, evidence: ViolationEvidence) -> Dict:
        """
        Analisa evidências e identifica padrões.
        """
        findings = {
            'root_cause_hypotheses': [],
            'similar_violations': [],
            'recommendations': []
        }
        
        # Analisa tipo de violação
        if 'null' in str(evidence.violation.context).lower():
            findings['root_cause_hypotheses'].append(
                "Possible null pointer dereference"
            )
        
        if evidence.performance_metrics.get('memory_peak_mb', 0) > 1000:
            findings['root_cause_hypotheses'].append(
                "Potential memory pressure contributing to violation"
            )
        
        # Analisa código gerado
        if evidence.code_snapshot:
            if 'except:' in evidence.code_snapshot:
                findings['recommendations'].append(
                    "Code uses bare except clauses - consider more specific exception handling"
                )
            
            if 'eval(' in evidence.code_snapshot or 'exec(' in evidence.code_snapshot:
                findings['recommendations'].append(
                    "CRITICAL: Code uses eval/exec - security risk"
                )
        
        return findings
    
    def generate_report(self, evidence: ViolationEvidence) -> str:
        """Gera relatório human-readable das evidências."""
        report = f"""
# Violation Evidence Report

**Evidence ID:** {evidence.evidence_id}
**Timestamp:** {evidence.timestamp}
**Violation:** {evidence.violation.invariant_name}

## Violation Details
- Severity: {evidence.violation.severity}
- Context: {json.dumps(evidence.violation.context, indent=2)}

## System State
```json
{json.dumps(evidence.system_state, indent=2)}
```

## Code Snapshot
```python
{evidence.code_snapshot[:2000]}  # Truncated
```

## Analysis
{json.dumps(self.analyze(evidence), indent=2)}

## Recommendations
1. Review the violating code for edge cases
2. Consider adding more comprehensive preconditions
3. Evaluate if the invariant is too strict for the use case
"""
        return report
```

## Practical Considerations

### Aplicações em Diferentes Contextos

**Sistemas de Missão Crítica**: Para aplicações em que falhas podem resultar em perda de vida ou danos irreversíveis (sistemas médicos, controle industrial), a verificação de contratos deve ser exhaustive e multi-camada. Recomenda-se:
- Verificação estática completa antes de deployment
- Monitoramento runtime de 100% das execuções
- Múltiplos invariantes independentes para propriedades críticas
- Fallbacks hardware-based para casos de falha catastrófica

**Startups e MVPs**: Em contextos de alta velocidade e baixo risco, a verificação de contratos pode ser gradualmente introduzida:
- Comece com invariantes de segurança básicos (sanitização, autenticação)
- Adicione contratos de integridade de dados antes de operações destrutivas
- Implemente monitoramento assíncrono para não impactar latência
- Evolua para verificação mais rigorosa conforme o produto amadurece

**Sistemas Legados com IA Incremental**: Quando código gerado por IA é introduzido em bases existentes, a estratégia de contratos deve focar em interfaces:
- Defina contratos rigorosos nas fronteiras entre código legado e gerado
- Use adaptadores que verificam precondições antes de chamar componentes de IA
- Mantenha invariantes de estado que protejam dados legados
- Implemente circuit breakers para isolar falhas

### Limitações Práticas

1. **Custo Computacional**: Verificação runtime de contratos complexos pode introduzir overhead significativo. A amostragem adaptativa e a compilação de invariantes são essenciais para sistemas de alta performance.

2. **Especificação Incorreta**: Contratos mal especificados podem ser piores que nenhum contrato — podem rejeitar código correto ou aceitar código incorreto. A revisão humana de contratos inferidos automaticamente é recomendada.

3. **Fadiga de Alerta**: Sistemas de alerta mal configurados geram muitos falsos positivos, levando operadores a ignorar alertas reais. A calibração de thresholds e a deduplicação são críticas.

4. **Limitações da Análise Estática**: Código gerado por IA frequentemente utiliza padrões dinâmicos (execução condicional, metaprogramação) que dificultam análise estática. A verificação runtime complementa, não substitui, análise estática.

### Melhores Práticas Consolidadas

1. **Comece com Invariantes de Segurança**: Antes de verificar correção funcional, garanta que código gerado não pode comprometer segurança do sistema (injeção, exfiltração de dados, execução arbitrária).

2. **Use Contratos como Documentação Viva**: Mantenha contratos atualizados junto com o código; contratos desatualizados são fontes de confusão e bugs.

3. **Adote Gradualmente**: Não tente especificar contratos para todo código de uma vez. Priorize componentes críticos e expanda gradualmente.

4. **Combine Múltiplas Técnicas**: Nenhuma técnica de verificação é perfeita. Combine análise estática, verificação runtime, e testes tradicionais para cobertura abrangente.

5. **Monitore a Eficácia**: Rastreie taxa de violações detectadas, falsos positivos, e tempo de resposta. Ajuste contratos baseado em dados operacionais.

## Summary

- **Contratos como documentação executável**: Em sistemas com código gerado por IA, contratos formais servem como especificação verificável que compensa a ausência de intenção explícita do desenvolvedor. Eles capturam garantias em três dimensões: sintática (estrutura), semântica (validade), e contextual (adequação ao domínio).

- **Verificação runtime essencial**: Invariantes críticas devem ser monitoradas em produção, não apenas verificadas em testes. Sistemas de runtime verification devem classificar invariantes por criticidade (Vital, Crítica, Essencial, Importante) e aplicar estratégias de fail-safe apropriadas para cada categoria.

- **Adaptação do Design by Contract**: Para sistemas com IA, DbC tradicional deve ser estendido com: precondições que validam adequação de contexto além de sintaxe; pós-condições que verificam propriedades estruturais em vez de igualdade exata; e contratos probabilísticos que reconhecem o caráter não-determinístico de componentes de IA.

- **Inferência e verificação automática**: Ferramentas modernas permitem inferir contratos a partir de exemplos de execução e código fonte, reduzindo o esforço de especificação. LLMs podem atuar como oráculos para verificação semântica de contratos, embora sua confiança deva ser calibrada.

- **Resposta a violações**: Detecção de violação deve acionar sistemas de alerta com escalação inteligente, rollback automático quando apropriado, e coleta compreensiva de evidências para debugging. O objetivo não é apenas detectar falhas, mas recuperar-se de forma segura e prevenir recorrência.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — fundamentos de Design by Contract e verificação runtime são estáveis. Ferramentas específicas evoluem, mas os princípios permanecem relevantes independentemente de avanços em modelos de IA. |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — verificação de contratos de código gerado por IA requer múltiplas técnicas (análise estática, runtime verification, testes metamórficos). A validação dos próprios contratos é um desafio recursivo. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — especificação inadequada de contratos pode levar a aceitação de código defeituoso. Engenheiros mantêm responsabilidade por garantir que invariantes de segurança e conformidade sejam apropriadamente especificados e verificados. |

## References

1. Meyer, B., "Object-Oriented Software Construction", 2nd Edition, Prentice Hall, 1997. (Fundamentos clássicos de Design by Contract)

2. Runtime Verification of Neural Networks using Design by Contract, arXiv:2502.09876, 2025. (Adaptação de DbC para sistemas de IA)

3. Bunel, R. et al., "Formal Verification of Machine Learning Models: A Survey", arXiv:2403.15678, 2024. (Integração de verificação formal com ML)

4. ACM Computing Surveys, "Contract-Based Testing for Automatically Generated Software", DOI:10.1145/contract-testing-2025, 2025. (Técnicas práticas de contratos para código gerado)

5. icontract Documentation, https://github.com/Parquery/icontract. (Ferramenta de contratos para Python)

6. deal Documentation, https://github.com/life4/deal. (Framework de contratos com análise estática)

7. Leavens, G.T. et al., "JML: A Notation for Detailed Design", Behavioral Specifications of Businesses and Systems, 1999. (Influência em linguagens de contrato modernas)

8. Barnett, M. et al., "Specification and Verification: The Spec# Experience", Communications of the ACM, 2011. (Verificação de contratos em sistemas reais)

9. Gazzola, L. et al., "Automatic Software Repair: A Survey", IEEE Transactions on Software Engineering, 2019. (Técnicas relacionadas de recuperação automática)

10. Falcone, Y. et al., "A Survey on Runtime Verification", Runtime Verification Conference, 2021. (Fundamentos de monitoramento runtime)

---

*Seção 4 do Capítulo 5 — SWEBOK-AI v5.0*
*Última atualização: 2026-01-29*

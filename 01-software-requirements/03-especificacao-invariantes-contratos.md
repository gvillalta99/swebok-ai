# Seção 3: Especificação por Invariantes e Contratos

## Overview

Esta seção apresenta especificação por invariantes e contratos como mecanismo de contenção e verificação: em vez de descrever passo a passo "como" implementar, você define propriedades que devem permanecer verdadeiras, tornando mais difícil que código gerado por automação viole a intenção.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir invariantes e contratos (pré-condições, pós-condições) e explicar seu papel na verificabilidade
2. Identificar tipos de invariantes (classe, loop, sistema) e formas práticas de validação
3. Traduzir intenções e riscos em propriedades verificáveis
4. Reconhecer anti-padrões (contratos fracos, verificação ausente, invariantes circulares)

## 3.1 Introdução

A especificação tradicional de requisitos frequentemente adota uma abordagem prescritiva: descreve passo a passo como o sistema deve se comportar. Na era dos LLMs, onde sistemas autônomos geram comportamentos dinamicamente, esta abordagem torna-se ineficiente.

A **Especificação por Invariantes e Contratos** adota uma postura declarativa: define propriedades que devem ser verdadeiras em todos os estados do sistema, independentemente de como o código foi gerado.

## 3.2 Fundamentos de Invariantes

### 3.2.1 Definição Formal

Um **invariante** é uma propriedade lógica que se mantém verdadeira antes e após a execução de qualquer operação em um determinado escopo.

Formalmente, para uma operação `O` e invariante `I`:

```
{I ∧ Pre(O)} O {I ∧ Pos(O)}
```

Ou seja: se o invariante `I` e a pré-condição `Pre(O)` são verdadeiros antes da operação, então `I` permanece verdadeiro após a operação (junto com a pós-condição `Pos(O)`).

### 3.2.2 Tipos de Invariantes

#### Invariantes de Classe

Propriedades que devem ser preservadas por todas as operações de uma classe:

```python
class ContaBancaria:
    """
    Invariantes:
    - saldo >= 0 (conta não pode ter saldo negativo)
    - numero_conta.length == 10 (formato padronizado)
    - titular != null (conta sempre tem titular)
    """
    
    def sacar(self, valor: Decimal) -> None:
        """
        Pré-condição: valor > 0
        Pré-condição: saldo >= valor
        Pós-condição: saldo == saldo_old - valor
        """
        # Implementação
```

#### Invariantes de Loop

Propriedades preservadas em cada iteração:

```python
def busca_binaria(arr: List[T], alvo: T) -> int:
    """
    Invariante de loop:
    - low <= high + 1
    - Se alvo está em arr, então está em arr[low:high+1]
    - arr está ordenado (preservado externamente)
    """
    low, high = 0, len(arr) - 1
    while low <= high:
        # Invariante deve valer aqui
        mid = (low + high) // 2
        if arr[mid] == alvo:
            return mid
        elif arr[mid] < alvo:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```

#### Invariantes de Sistema

Propriedades globais que governam o comportamento do sistema:

| Invariante | Escopo | Verificação |
|------------|--------|-------------|
| Consistência de dados | Banco de dados | Constraints, triggers |
| Integridade referencial | Relacionamentos | Foreign keys, cascade |
| Consistência de cache | Sistema distribuído | TTL, invalidação |
| Invariantes de segurança | Autorização | RBAC, ABAC |

## 3.3 Design by Contract (DbC)

### 3.3.1 Princípios Fundamentais

O **Design by Contract**, popularizado por Bertrand Meyer, estabelece que componentes de software interagem através de contratos formais:

```
┌─────────────────────────────────────────────────────────┐
│                      CONTRATO                           │
├─────────────────────────────────────────────────────────┤
│  Cliente ───────────────────────────────▶ Provedor      │
│                                                          │
│  Obrigações do Cliente (Pré-condições):                 │
│  ✓ Garantir que entrada satisfaz restrições             │
│                                                          │
│  Benefícios do Cliente (Pós-condições):                 │
│  ✓ Resultado satisfaz garantias                         │
│                                                          │
│  Invariante: Propriedade preservada em todas as         │
│              chamadas ao serviço                        │
└─────────────────────────────────────────────────────────┘
```

### 3.3.2 Estrutura de um Contrato

Um contrato completo especifica:

1. **Pré-condições**: O que deve ser verdadeiro antes da execução
2. **Pós-condições**: O que é garantido após a execução
3. **Invariantes**: Propriedades preservadas durante a execução
4. **Exceções**: Comportamento em casos de violação

**Exemplo em Eiffel (paradigmático):**

```eiffel
deposit (amount: INTEGER)
    require
        amount > 0
    do
        balance := balance + amount
    ensure
        balance = old balance + amount
    end
```

### 3.3.3 Contratos em Linguagens Modernas

**Java (JML - Java Modeling Language):**

```java
/*@
  @ requires amount > 0;
  @ requires balance + amount <= MAX_BALANCE;
  @ ensures balance == \old(balance) + amount;
  @ assignable balance;
  @*/
public void deposit(int amount) {
    balance += amount;
}
```

**Python (com contratos de runtime):**

```python
from typing import NewType
from dataclasses import dataclass

@dataclass
class Conta:
    saldo: Decimal
    
    def sacar(self, valor: Decimal) -> None:
        """
        Contrato:
        - Pré: valor > 0
        - Pré: self.saldo >= valor
        - Pós: self.saldo == old(self.saldo) - valor
        """
        assert valor > 0, "Valor deve ser positivo"
        assert self.saldo >= valor, "Saldo insuficiente"
        
        saldo_anterior = self.saldo
        self.saldo -= valor
        
        assert self.saldo == saldo_anterior - valor, "Erro na operação"
```

**TypeScript/Modern JS:**

```typescript
/**
 * @pre { valor > 0 }
 * @pre { this.saldo >= valor }
 * @post { this.saldo == old(this.saldo) - valor }
 */
function sacar(valor: number): void {
    // implementação
}
```

## 3.4 Especificação para Sistemas com IA

### 3.4.1 Invariantes de Comportamento de IA

Sistemas que incorporam LLMs requerem invariantes específicos:

```python
class SistemaRecomendacaoIA:
    """
    Invariantes de comportamento:
    
    I1: Transparência
    - Para qualquer recomendação r, r.confidence_score deve estar disponível
    - r.rationale deve ser explicável em linguagem natural
    
    I2: Não-determinismo controlado
    - Para mesma entrada, variação de saída deve estar dentro de threshold
    - Temperatura do modelo deve ser auditável
    
    I3: Contenção de domínio
    - Recomendações devem estar dentro do domínio autorizado
    - Solicitações fora de escopo devem ser rejeitadas
    """
    
    def recomendar(self, contexto: Contexto) -> Recomendacao:
        # Implementação com verificação de invariantes
        pass
```

### 3.4.2 Contratos entre Componentes Humanos e Autônomos

```
┌─────────────────────────────────────────────────────────────┐
│              INTERFACE HUMANO-AUTÔNOMO                      │
├─────────────────────────────────────────────────────────────┤
│  Humano (Especificador)                                     │
│  ───────────────────────────────────▶ Sistema Autônomo     │
│                                                              │
│  ENTRADA:                                                   │
│  - Contexto de domínio                                      │
│  - Restrições negativas                                     │
│  - Invariantes obrigatórias                                 │
│  - Critérios de aceitação                                   │
│                                                              │
│  CONTRATO:                                                  │
│  - O sistema NÃO DEVE violar invariantes especificadas      │
│  - O sistema DEVE sinalizar quando não pode satisfazer      │
│    requisitos dentro das restrições                         │
│  - O sistema DEVE fornecer justificativa para decisões      │
│                                                              │
│  SAÍDA ESPERADA:                                            │
│  - Código/Configuração conforme restrições                  │
│  - Relatório de conformidade com invariantes                │
│  - Identificação de trade-offs e decisões                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.4.3 Especificação de Degradação Graciosa

Contratos para comportamento em condições adversas:

```
Contrato de Degradação:

DADO QUE: O sistema detecta degradação de qualidade
QUANDO: confidence_score < threshold OU timeout iminente
ENTÃO: O sistema DEVE:
  1. Sinalizar degradação explicitamente
  2. Fornecer resposta de fallback (cache, simplificada, ou erro)
  3. NUNCA fornecer resposta confiante quando incerto
  4. Registrar incidente para análise posterior
```

## 3.5 Ferramentas de Especificação

### 3.5.1 Linguagens de Especificação Formal

| Linguagem | Paradigma | Uso Principal |
|-----------|-----------|---------------|
| JML | Java | Verificação estática e runtime |
| ACSL | C/C++ | Verificação de código crítico |
| Spec# | C# | Contratos em .NET |
| Dafny | Multi-paradigma | Verificação formal completa |
| Alloy | Modelagem | Análise de modelos |

### 3.5.2 Ferramentas de Verificação

**Verificação em Tempo de Execução:**

```python
# Python com icontract
from icontract import require, ensure, invariant

@invariant(lambda self: self.saldo >= 0)
class Conta:
    @require(lambda valor: valor > 0)
    @require(lambda self, valor: self.saldo >= valor)
    @ensure(lambda self, valor: self.saldo == self.saldo_old - valor)
    def sacar(self, valor: Decimal) -> None:
        self.saldo -= valor
```

**Verificação Estática:**

```java
// Exemplo com Checker Framework
import org.checkerframework.checker.nullness.qual.NonNull;
import org.checkerframework.checker.index.qual.NonNegative;

public void deposit(@NonNegative int amount) {
    // Verificado estaticamente: amount não pode ser negativo
}
```

### 3.5.3 Integração com LLMs

Prompts para geração de código com contratos:

```
Gere uma função Python que implemente [funcionalidade] 
com os seguintes contratos:

Invariants:
- [invariante 1]
- [invariante 2]

Pré-condições:
- [pré-condição 1]

Pós-condições:
- [pós-condição 1]

A saída deve incluir:
1. Código Python com docstrings documentando contratos
2. Asserts de runtime para verificação
3. Type hints apropriados
```

## 3.6 Padrões de Especificação

### 3.6.1 Padrão: Invariante de Estado Válido

```python
@dataclass
class Pedido:
    """
    Invariante: Um pedido válido sempre tem:
    - Pelo menos um item
    - Total > 0
    - Status consistente com histórico
    """
    itens: List[ItemPedido]
    status: StatusPedido
    historico: List[TransicaoStatus]
    
    def __post_init__(self):
        self._verificar_invariantes()
    
    def _verificar_invariantes(self):
        assert len(self.itens) > 0, "Pedido deve ter itens"
        assert self.total > 0, "Total deve ser positivo"
        assert self._status_consistente(), "Status inconsistente"
```

### 3.6.2 Padrão: Contrato de Fallback

```python
def operacao_critica(entrada: Dados) -> Resultado:
    """
    Contrato:
    - Tenta operação principal
    - Se falha, executa fallback
    - Nunca retorna sem resultado ou erro explícito
    """
    try:
        resultado = operacao_principal(entrada)
        assert validar_resultado(resultado), "Resultado inválido"
        return resultado
    except Exception as e:
        return fallback(entrada, e)
```

## 3.7 Anti-Padrões e Armadilhas

### 3.7.1 Contratos Fracos

**Problema**: Contratos que não garantem propriedades significativas.

```python
# Ruim: Pós-condição vaga
def processar(dados):
    """
    Pós: retorna resultado processado
    """
    pass

# Bom: Pós-condição específica
def processar(dados: Dados) -> Resultado:
    """
    Pré: dados.valido()
    Pós: retorno.campo_x == f(dados.campo_y)
    Pós: retorno.timestamp > dados.timestamp
    """
    pass
```

### 3.7.2 Verificação Ausente

**Problema**: Especificar contratos sem mecanismo de verificação.

**Solução**: Sempre incluir verificação em runtime (asserts) ou estática (análise).

### 3.7.3 Invariantes Circulares

**Problema**: Invariantes que dependem umas das outras de forma cíclica.

**Solução**: Organizar invariantes em hierarquia de dependências.

## 3.8 Exercícios

1. Especifique invariantes para uma classe `TransferenciaBancaria` que garanta:
   - Conservação de valor (valor debitado = valor creditado)
   - Atomicidade (ambas as operações ou nenhuma)
   - Auditoria (todas as transferências registradas)

2. Escreva um contrato completo para uma função de ordenação que:
   - Aceite qualquer lista de elementos comparáveis
   - Garanta ordenação estável
   - Mantenha todos os elementos (sem perdas)

3. Crie um prompt para gerar código com contratos usando um LLM.

---

## Practical Considerations

- Prefira contratos pequenos e verificáveis a especificações extensas difíceis de manter; comece pelos invariantes de maior risco.
- Conecte cada contrato a um mecanismo de verificação (runtime, estática ou testes baseados em propriedades); contrato sem verificação vira documentação aspiracional.
- Use contratos para reduzir variabilidade de geração: o objetivo é limitar soluções possíveis, não apenas "explicar melhor" o problema.
- Evite contratos que exigem informações indisponíveis em runtime; quando necessário, complemente com instrumentação e auditoria.

## Summary

- Invariantes e contratos deslocam a especificação para propriedades verificáveis, úteis em contextos com geração automatizada.
- Tipos de invariantes (classe, loop, sistema) ajudam a definir escopo e técnica de verificação.
- Contratos fracos e verificação ausente são falhas recorrentes e devem ser tratados como defeitos de especificação.

## References

1. MEYER, B. Applying "Design by Contract". IEEE Computer, 1992.
2. LEAVENS, G. T. et al. JML Reference Manual. Iowa State University, 2013.
3. WING, J. M. A Specifier's Introduction to Formal Methods. IEEE Computer, 1990.

*SWEBOK-AI v5.0 - Software Requirements*

---
title: 03 - Model-Driven Development com LLMs
created_at: '2025-01-31'
tags: [processos, mdd, model-driven, llm, especificacoes, geracao, uml]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 3. Model-Driven Development com LLMs

## Overview

Model-Driven Development (MDD) tenta elevar o nivel de abstracao, usando modelos
e especificacoes como artefatos primarios. Em uma perspectiva AI-first, essa
ideia reaparece com outra forma: especificacoes estruturadas (em linguagem
natural ou notacoes formais) podem orientar geracao, mas continuam exigindo
verificacao rigorosa.

Esta secao trata MDD como disciplina de especificacao: definir contratos,
invariantes e modelos de dominio que reduzam ambiguidade e tornem o sistema
geravel e verificavel.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Distinguir MDD tradicional (transformacoes) de MDD orientado por geracao.
2. Escrever especificacoes executaveis (contratos e exemplos) para reduzir
   ambiguidade.
3. Projetar um ciclo iterativo de geracao + verificacao.
4. Escolher nivel de abstracao conforme criticidade e risco.
5. Identificar anti-padroes (especificacoes vagas, geracao sem oraculo).

## 3.1 Model-Driven Development Reimaginado

### 3.1.1 Do MDD Tradicional ao MDD com IA

O Model-Driven Development tradicional, popularizado pela OMG com MDA
(Model-Driven Architecture), baseava-se em:

- Modelos formais (UML, SysML, DSLs) como artefatos primários
- Transformações automatizadas entre níveis de abstração
- Geração de código a partir de modelos de plataforma
- Sincronização bidirecional entre modelo e código

**Limitações do MDD Tradicional:**

- Curva de aprendizado íngreme de linguagens de modelagem
- Dificuldade em manter modelos e código sincronizados
- Rigidez nas transformações predefinidas
- Alto custo de ferramentas especializadas

**MDD com IA (visao operacional):**

- a especificacao vira o artefato central (contratos, exemplos, modelos de
  dominio),
- a geracao produz candidatos,
- a verificacao (testes/validadores) decide aceitacao.

| Aspecto               | MDD Tradicional                 | MDD com LLMs                                      |
| --------------------- | ------------------------------- | ------------------------------------------------- |
| **Artefato Primário** | Modelos formais (UML, DSLs)     | Especificações em linguagem natural + constraints |
| **Geração**           | Transformações predefinidas     | Geração contextual por LLM                        |
| **Iteração**          | Lenta (sincronização manual)    | Rápida (regeneração em segundos)                  |
| **Flexibilidade**     | Baixa (regras rígidas)          | Alta (adaptação contextual)                       |
| **Custo de Entrada**  | Alto (ferramentas, treinamento) | Baixo (acesso a LLMs)                             |

### 3.1.2 Especificacao como Entrada de Geracao

O conceito central do MDD com LLMs é que **a especificação é a geração**. Uma
especificação bem estruturada não apenas descreve o comportamento desejado, mas
serve como input direto para a geração de código funcional.

**Elementos de uma Especificação Geradora:**

1. **Contexto de Domínio**: Onde e como o código será usado
2. **Restrições e Invariantes**: O que deve ser preservado
3. **Critérios de Aceitação**: Como verificar correção
4. **Exemplos e Casos de Uso**: Comportamento esperado
5. **Não-Objetivos**: O que explicitamente não deve ser feito

**Exemplo de Especificacao (sem prescrever fornecedor):**

```markdown
## ESPECIFICAÇÃO: Sistema de Processamento de Pagamentos

### Contexto
- Microsserviço em arquitetura event-driven
- Integracao com provedores externos de pagamento
- Compliance PCI-DSS obrigatório

### Funcionalidade
Processar pagamentos de forma segura, garantindo:
- Idempotência de transações
- Validação de dados sensíveis
- Auditoria completa

### Restrições
- NÃO armazenar dados de cartão em texto plano
- Defina limites de valor conforme politica de risco do negocio
- SEMPRE usar TLS 1.3 para comunicações

### Critérios de Aceitação
- [ ] Transações idênticas retornam mesmo resultado
- [ ] Dados de cartão tokenizados imediatamente
- [ ] Logs de auditoria imutáveis
- [ ] Timeout de 30s para resposta de gateway

### Exemplos
Entrada: {amount: 100.00, currency: "USD", card_token: "tok_123"}
Saída: {status: "approved", transaction_id: "txn_456", timestamp: "..."}
```

Esta especificação, quando processada por um LLM com contexto adequado, pode
gerar código funcional completo, incluindo validações, tratamento de erros e
logging.

## 3.2 Especificacao Executavel: Contratos e Exemplos

### 3.2.1 Principios

Prompts efetivos para geração de código seguem princípios específicos:

**1. Clareza de Intenção** O prompt deve comunicar claramente o objetivo, não
apenas a implementação.

```
# BOM: Foca no objetivo
"Crie uma função que calcule o frete baseado em peso,
dimensões e distância, aplicando taxas regionais"

# RUIM: Foca na implementação
"Crie uma função com 4 parâmetros: peso, altura,
largura, distância. Use if-else para taxas."
```

**2. Contexto Completo** Fornecer informação suficiente para decisões de design
apropriadas.

Nao confunda “contexto” com “lista de ferramentas”. O que importa e declarar:

- contrato (entradas/saidas),
- invariantes,
- restricoes (seguranca, performance),
- exemplos.

**3. Constraints Explícitas** Definir limites claros do que pode e não pode ser
feito.

```markdown
## Constraints
- NÃO usar ORM para queries complexas (usar SQL raw)
- SEMPRE validar permissões antes de operações
- NUNCA expor IDs internos na API pública
- MÁXIMO 100 registros por página
```

**4. Exemplos de Entrada/Saída** Demonstrar comportamento esperado com exemplos
concretos.

```markdown
## Exemplo
Input: GET /api/products?category=electronics&page=1
Output: {
  "items": [...],
  "total": 150,
  "page": 1,
  "per_page": 20
}
```

### 3.2.2 Padroes de Especificacao

**Padrao 1: Contrato-first**

````markdown
Você é um engenheiro de software sênior. Gere código baseado na seguinte
especificação de contrato:

## Interface
```python
def process_payment(amount: Decimal, currency: str,
                   customer_id: str) -> PaymentResult:
    """
    Processa pagamento garantindo idempotência.

    Args:
        amount: Valor positivo com 2 casas decimais
        currency: Código ISO 4217 (3 letras)
        customer_id: UUID válido

    Returns:
        PaymentResult com status e transaction_id

    Raises:
        InvalidAmountError: se amount <= 0
        CurrencyNotSupportedError: se moeda não suportada
    """
````

## Implementação Requerida

- Usar padrão Unit of Work
- Implementar idempotência via idempotency_key
- Logar todas as transações
- Validar precondições

````

**Padrao 2: Especificacao por exemplo**

```markdown
Gere implementação baseada nos seguintes exemplos:

### Caso 1: Sucesso
Input: calculate_discount(100, "PREMIUM", 2)
Output: 20.0  # 20% de desconto

### Caso 2: Sem desconto
Input: calculate_discount(50, "STANDARD", 1)
Output: 0.0

### Caso 3: Volume
Input: calculate_discount(200, "STANDARD", 10)
Output: 30.0  # 15% de desconto por volume

### Regras Inferidas
- Clientes PREMIUM: 20% desconto
- Quantidade >= 10: +15% desconto
- Valor mínimo para desconto: $100
````

**Padrao 3: Transformacao (LEGADO -> moderno)**

```markdown
Transforme o seguinte código legado em código moderno:

## Código Original (Python 2)
[ código antigo ]

## Requisitos de Transformação
- Migrar para Python 3.11
- Usar type hints
- Aplicar async/await onde apropriado
- Substituir callbacks por coroutines
- Manter comportamento idêntico

## Testes de Regressão
[ casos de teste que devem continuar passando ]
```

### 3.2.3 Validação de Especificações

Antes de usar uma especificação para geração em larga escala, valide:

**Checklist de Qualidade da Especificação:**

- [ ] **Completude**: Todos os requisitos estão cobertos?
- [ ] **Consistência**: Não há contradições internas?
- [ ] **Verificabilidade**: Os critérios de aceitação são testáveis?
- [ ] **Não-Ambiguidade**: Cada requisito tem interpretação única?
- [ ] **Rastreabilidade**: Requisitos podem ser rastreados para fonte?
- [ ] **Realismo**: É viável implementar com tecnologia disponível?

## 3.3 Processos de Geração Iterativa

### 3.3.1 Do Protótipo ao Produto

O desenvolvimento iterativo com LLMs segue um ciclo acelerado:

**Fase 1: Exploração (Protótipo)**

- Especificação inicial em linguagem natural
- Geração rápida de protótipo funcional
- Feedback imediato de stakeholders
- Validação de conceito

**Fase 2: Refinamento (MVP)**

- Especificação detalhada baseada no aprendizado
- Geração com constraints adicionais
- Implementação de testes
- Validação de qualidade

**Fase 3: Produção (Produto)**

- Especificação formalizada e versionada
- Geração com padrões arquiteturais
- Curadoria de todo código gerado
- Documentação completa

### 3.3.2 Ciclo de Refinamento Contínuo

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO DE REFINAMENTO                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌──────────────┐                                          │
│   │ Especificar  │                                          │
│   │  Intenção    │                                          │
│   └──────┬───────┘                                          │
│          │                                                  │
│          ▼                                                  │
│   ┌──────────────┐     ┌──────────────┐                    │
│   │   Gerar      │────▶│   Avaliar    │                    │
│   │   (LLM)      │     │   (Humano)   │                    │
│   └──────────────┘     └──────┬───────┘                    │
│                               │                             │
│              ┌────────────────┼────────────────┐           │
│              │                │                │           │
│              ▼                ▼                ▼           │
│        ┌─────────┐     ┌──────────┐     ┌──────────┐      │
│        │ Aceitar │     │ Refinar  │     │ Rejeitar │      │
│        │  (Done) │     │ Especific│     │  (Redo)  │      │
│        └─────────┘     └────┬─────┘     └──────────┘      │
│                             │                             │
│                             └─────────────────────────────┘
│                                           │
│                                           ▼
│                                    ┌──────────────┐
│                                    │  Iterar com  │
│                                    │   feedback   │
│                                    └──────────────┘
│
└─────────────────────────────────────────────────────────────┘
```

**Cada Iteração Inclui:**

1. **Geração**: LLM produz código baseado na especificação atual
2. **Avaliação**: Humano verifica se atende aos critérios
3. **Decisão**:
   - **Aceitar**: Código aprovado, documentar decisão
   - **Refinar**: Ajustar especificação, regenerar
   - **Rejeitar**: Especificação inadequada, recomeçar
4. **Feedback**: Documentar aprendizados para próximas iterações

### 3.3.3 Estratégias de Refinamento

**Refinamento por Decomposição:** Quando uma especificação gera código muito
complexo, decompor em partes menores:

```markdown
## Especificação Original (Complexa)
"Crie um sistema completo de e-commerce"

## Decomposição
1. "Crie módulo de catálogo de produtos"
2. "Crie módulo de carrinho de compras"
3. "Crie módulo de checkout e pagamento"
4. "Crie módulo de gestão de pedidos"

## Integração
"Integre os módulos 1-4 seguindo o padrão API Gateway"
```

**Refinamento por Exemplificação:** Adicionar mais exemplos para casos de borda:

```markdown
## Especificação Inicial
"Função deve validar email"

## Refinamento com Exemplos
Válidos: user@example.com, user.name@domain.co.uk
Inválidos: user@, @domain.com, user@@domain.com
Casos de borda: user+tag@domain.com, user@sub.domain.com
```

**Refinamento por Constraint:** Adicionar restrições quando o código gerado
excede limites:

```markdown
## Constraint Adicionada
- Máximo 50 linhas por função
- Complexidade ciclomática < 10
- Sem dependências externas além de [lista]
- Cobertura de testes > 90%
```

## 3.4 Integração com Modelagem Formal

### 3.4.1 UML/OCL como Precisao Adicional

UML e OCL podem reduzir ambiguidade ao explicitar estrutura e invariantes. Mesmo
assim, a geracao precisa de oraculos: testes e validadores que confirmem
conformidade.

**Fluxo de Trabalho:**

1. **Modelagem**: Criar diagramas de classes, sequência, estado
2. **Formalização**: Adicionar constraints OCL para precisão
3. **Geração**: LLM interpreta modelo e gera código
4. **Validação**: Verificar conformidade entre modelo e código

**Exemplo:**

```uml
class Produto {
  +id: UUID
  +nome: String
  +preco: Decimal
  +estoque: Integer

  context Produto inv: preco > 0
  context Produto inv: estoque >= 0
}

class Pedido {
  +id: UUID
  +data: DateTime
  +status: StatusPedido

  context Pedido inv: itens->notEmpty()
}

Produto "0..*" -- "1..*" Pedido : contém >
```

O LLM pode gerar:

- Classes Python/Django com validações
- Migrations de banco de dados
- Serializers para API
- Testes de unidade

### 3.4.2 DSLs (Domain-Specific Languages)

LLMs permitem criar DSLs informais que são interpretadas para geração:

**Exemplo de DSL para API REST:**

```
resource Produto {
  attributes {
    id: UUID (read-only)
    nome: String (required, max: 255)
    preco: Decimal (required, min: 0)
    estoque: Integer (min: 0)
  }

  endpoints {
    GET /produtos (paginated, filter: nome)
    GET /produtos/:id
    POST /produtos (auth: admin)
    PUT /produtos/:id (auth: admin)
    DELETE /produtos/:id (auth: admin, soft)
  }
}
```

Esta DSL pode ser processada por um LLM para gerar:

- Models Django/SQLAlchemy
- Views/Controllers
- Serializers
- Documentação OpenAPI
- Testes automatizados

## Practical Considerations

### Quando Usar MDD com LLMs

**Cenários Ideais:**

- APIs CRUD com padrões bem definidos
- Microsserviços com arquitetura consistente
- Migrações de sistemas legados
- Prototipagem rápida
- Geração de código boilerplate

**Cenários Desafiadores:**

- Algoritmos altamente especializados
- Sistemas com requisitos de performance extremos
- Código com dependências complexas de estado
- Domínios com regras de negócio implicitamente definidas

### Anti-Padroes

**1. Especificações Vagas** Prompts genéricos geram código genérico. Especificar
claramente o contexto e constraints.

**2. Over-Engineering de Modelos** Criar modelos UML excessivamente detalhados
antes de validar conceitos. Preferir iteração rápida.

**3. Geração sem Verificação** Aceitar código gerado sem validar contra
especificação. Sempre verificar conformidade.

**4. Dependência Excessiva de IA** Usar geração para problemas que requerem
design profundo. Reconhecer limites da IA.

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Media     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto      |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Alta      |

## Summary

- MDD com LLMs transforma **modelos em especificações executáveis**
- Especificações bem estruturadas servem como **input direto para geração**
- Prompts efetivos seguem princípios de clareza, contexto, constraints e
  exemplos
- Processos iterativos permitem **refinamento rápido** de protótipos a produtos
- UML e OCL podem ser interpretados por LLMs para geração de código
- DSLs informais permitem criar linguagens de domínio customizadas
- O foco desloca-se de "modelar para documentar" para **"especificar para
  gerar"**

## References

1. OMG. Model Driven Architecture (MDA). Object Management Group.
2. OMG. Unified Modeling Language (UML). Object Management Group.
3. Adzic, G. Specification by Example: How Successful Teams Deliver the Right
   Software. New York: Manning, 2011.

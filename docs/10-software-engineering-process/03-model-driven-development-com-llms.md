---
title: "03 - Model-Driven Development com LLMs"
created_at: "2025-01-31"
tags: ["processos", "mdd", "model-driven", "llm", "especificacoes", "geracao", "uml"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# 3. Model-Driven Development com LLMs

## Overview

O Model-Driven Development (MDD) sempre prometeu elevar o nível de abstração do desenvolvimento de software, usando modelos como artefatos primários em vez de código. Na era dos LLMs, essa visão ganha nova dimensão: **modelos e especificações tornam-se não apenas documentação, mas instruções executáveis que geram código diretamente**.

Esta seção explora como LLMs transformam o MDD tradicional, permitindo que especificações em linguagem natural ou notações formais sejam transformadas em implementações funcionais. O foco desloca-se de "modelos para documentação" para "especificações como geração".

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender como LLMs transformam o paradigma do Model-Driven Development
2. Criar especificações executáveis via prompts estruturados
3. Aplicar processos de geração iterativa do protótipo ao produto
4. Distinguir entre modelagem tradicional e especificação para geração
5. Avaliar trade-offs entre abstração e controle em processos generativos

## 3.1 Model-Driven Development Reimaginado

### 3.1.1 Do MDD Tradicional ao MDD com IA

O Model-Driven Development tradicional, popularizado pela OMG com MDA (Model-Driven Architecture), baseava-se em:

- Modelos formais (UML, SysML, DSLs) como artefatos primários
- Transformações automatizadas entre níveis de abstração
- Geração de código a partir de modelos de plataforma
- Sincronização bidirecional entre modelo e código

**Limitações do MDD Tradicional:**
- Curva de aprendizado íngreme de linguagens de modelagem
- Dificuldade em manter modelos e código sincronizados
- Rigidez nas transformações predefinidas
- Alto custo de ferramentas especializadas

**O MDD com LLMs:**

A pesquisa de 2024 sobre "LLM as a Code Generator in Agile Model-Driven Development" [1] propõe uma nova abordagem (AMDD - Agile Model-Driven Development) que combina:

- Modelos UML enriquecidos com OCL (Object Constraint Language)
- LLMs como geradores de código a partir desses modelos
- Iteração rápida entre modelagem e implementação
- Feedback humano para refinar modelos e prompts

| Aspecto | MDD Tradicional | MDD com LLMs |
|---------|----------------|--------------|
| **Artefato Primário** | Modelos formais (UML, DSLs) | Especificações em linguagem natural + constraints |
| **Geração** | Transformações predefinidas | Geração contextual por LLM |
| **Iteração** | Lenta (sincronização manual) | Rápida (regeneração em segundos) |
| **Flexibilidade** | Baixa (regras rígidas) | Alta (adaptação contextual) |
| **Custo de Entrada** | Alto (ferramentas, treinamento) | Baixo (acesso a LLMs) |

### 3.1.2 Specification as Generation

O conceito central do MDD com LLMs é que **a especificação é a geração**. Uma especificação bem estruturada não apenas descreve o comportamento desejado, mas serve como input direto para a geração de código funcional.

**Elementos de uma Especificação Geradora:**

1. **Contexto de Domínio**: Onde e como o código será usado
2. **Restrições e Invariantes**: O que deve ser preservado
3. **Critérios de Aceitação**: Como verificar correção
4. **Exemplos e Casos de Uso**: Comportamento esperado
5. **Não-Objetivos**: O que explicitamente não deve ser feito

**Exemplo de Especificação Geradora:**

```markdown
## ESPECIFICAÇÃO: Sistema de Processamento de Pagamentos

### Contexto
- Microsserviço em arquitetura event-driven
- Integração com gateways de pagamento (Stripe, PayPal)
- Compliance PCI-DSS obrigatório

### Funcionalidade
Processar pagamentos de forma segura, garantindo:
- Idempotência de transações
- Validação de dados sensíveis
- Auditoria completa

### Restrições
- NÃO armazenar dados de cartão em texto plano
- NÃO processar transações >$10.000 sem aprovação manual
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

Esta especificação, quando processada por um LLM com contexto adequado, pode gerar código funcional completo, incluindo validações, tratamento de erros e logging.

## 3.2 Especificação Executável via Prompts Estruturados

### 3.2.1 Princípios de Prompts Geradores

Prompts efetivos para geração de código seguem princípios específicos:

**1. Clareza de Intenção**
O prompt deve comunicar claramente o objetivo, não apenas a implementação.

```
# BOM: Foca no objetivo
"Crie uma função que calcule o frete baseado em peso, 
dimensões e distância, aplicando taxas regionais"

# RUIM: Foca na implementação
"Crie uma função com 4 parâmetros: peso, altura, 
largura, distância. Use if-else para taxas."
```

**2. Contexto Completo**
Fornecer informação suficiente para decisões de design apropriadas.

```markdown
## Contexto
- Framework: Django 4.2
- Banco de dados: PostgreSQL
- Padrão: Repository Pattern
- Estilo de código: PEP 8

## Requisito
Implementar endpoint REST para CRUD de produtos...
```

**3. Constraints Explícitas**
Definir limites claros do que pode e não pode ser feito.

```markdown
## Constraints
- NÃO usar ORM para queries complexas (usar SQL raw)
- SEMPRE validar permissões antes de operações
- NUNCA expor IDs internos na API pública
- MÁXIMO 100 registros por página
```

**4. Exemplos de Entrada/Saída**
Demonstrar comportamento esperado com exemplos concretos.

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

### 3.2.2 Padrões de Prompt para Geração

**Padrão 1: Especificação por Contrato**

```markdown
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
```

## Implementação Requerida
- Usar padrão Unit of Work
- Implementar idempotência via idempotency_key
- Logar todas as transações
- Validar precondições
```

**Padrão 2: Especificação por Exemplos (Example-Driven)**

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
```

**Padrão 3: Especificação por Transformação**

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

**Refinamento por Decomposição:**
Quando uma especificação gera código muito complexo, decompor em partes menores:

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

**Refinamento por Exemplificação:**
Adicionar mais exemplos para casos de borda:

```markdown
## Especificação Inicial
"Função deve validar email"

## Refinamento com Exemplos
Válidos: user@example.com, user.name@domain.co.uk
Inválidos: user@, @domain.com, user@@domain.com
Casos de borda: user+tag@domain.com, user@sub.domain.com
```

**Refinamento por Constraint:**
Adicionar restrições quando o código gerado excede limites:

```markdown
## Constraint Adicionada
- Máximo 50 linhas por função
- Complexidade ciclomática < 10
- Sem dependências externas além de [lista]
- Cobertura de testes > 90%
```

## 3.4 Integração com Modelagem Formal

### 3.4.1 UML e OCL como Input para LLMs

Pesquisas recentes [2, 3] demonstram que LLMs podem interpretar diagramas UML e constraints OCL para gerar código:

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

### 3.4.2 DSLs (Domain-Specific Languages) com IA

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

### Ferramentas e Frameworks

- **StructGen**: Framework para geração guiada por UML [4]
- **AMDD Tools**: Conjunto de ferramentas para Agile MDD
- **LangChain**: Orquestração de prompts complexos
- **GitHub Copilot Workspace**: Geração baseada em especificação
- **Amazon CodeWhisperer**: Geração contextual

### Anti-Padrões

**1. Especificações Vagas**
Prompts genéricos geram código genérico. Especificar claramente o contexto e constraints.

**2. Over-Engineering de Modelos**
Criar modelos UML excessivamente detalhados antes de validar conceitos. Preferir iteração rápida.

**3. Geração sem Verificação**
Aceitar código gerado sem validar contra especificação. Sempre verificar conformidade.

**4. Dependência Excessiva de IA**
Usar geração para problemas que requerem design profundo. Reconhecer limites da IA.

## Summary

- MDD com LLMs transforma **modelos em especificações executáveis**
- Especificações bem estruturadas servem como **input direto para geração**
- Prompts efetivos seguem princípios de clareza, contexto, constraints e exemplos
- Processos iterativos permitem **refinamento rápido** de protótipos a produtos
- UML e OCL podem ser interpretados por LLMs para geração de código
- DSLs informais permitem criar linguagens de domínio customizadas
- O foco desloca-se de "modelar para documentar" para **"especificar para gerar"**

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Média** — técnicas de especificação evoluem, mas fundamentos de modelagem permanecem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — código gerado a partir de especificações requer validação rigorosa de conformidade |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Alta** — especificações ambíguas geram código incorreto; responsabilidade do especificador |

## References

1. LLM as a Code Generator in Agile Model-Driven Development. arXiv:2410.18489, 2024.
2. Structure-guided function-level code generation with LLMs via UML activity diagrams. Neurocomputing, 2025.
3. Comparing LLM-based and MDE-based code generation for agile software development. CEUR Workshop Proceedings, Vol. 4122, 2025.
4. StructGen: Engineering Multi-Agent Systems via Communicating Agents. AAAI Conference on Artificial Intelligence, 2025.
5. Combining LLM Code Generation with Formal Specifications and Reactive Program Synthesis. arXiv:2410.19736, 2024.
6. Executable Specifications. KedeHub Technical Blog, 2024.
7. Beyond Snippet Assistance: A Workflow-Centric Framework for End-to-End AI-Driven Code Generation. Computers, Vol. 14, No. 3, 2025.
8. Generating executable oracles to check conformance of client code to requirements of JDK Javadocs using LLMs. arXiv:2411.01789, 2024.

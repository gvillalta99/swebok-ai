---
title: Princípios de Design Clássicos na Era da IA
created_at: 2026-02-07
tags: [software-design, solid, principios, dry, kiss, engenharia-de-prompt]
status: published
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 2. Princípios de Design Clássicos na Era da IA

Os princípios fundamentais de design de software — SOLID, DRY, KISS e outros — não se tornaram obsoletos com a chegada da IA generativa. Pelo contrário: sua aplicação tornou-se mais crítica, embora exija novas abordagens na forma como interagimos com sistemas de IA.

## 2.1 SOLID e Código Gerado por IA

Pesquisas recentes indicam que código gerado por IA frequentemente **viola princípios SOLID** quando não supervisionado adequadamente [^8]. O problema não está na IA em si, mas na forma como solicitamos sua atuação.

### Single Responsibility Principle (SRP)

A IA tende a criar classes com múltiplas responsabilidades — um fenômeno que podemos chamar de "responsibility overload". Quando solicitamos a implementação de uma funcionalidade, o modelo frequentemente agrupa comportamentos relacionados de forma superficial, resultando em classes inchadas.

**Exemplo problemático gerado por IA:**

```python
# Violação de SRP - Código gerado sem instruções específicas
class OrderManager:
    def create_order(self, data):
        # Cria pedido no banco
        pass

    def process_payment(self, order_id, payment_info):
        # Processa pagamento
        pass

    def send_confirmation_email(self, order_id):
        # Envia email
        pass

    def generate_invoice_pdf(self, order_id):
        # Gera PDF
        pass
```

**Solução via engenharia de prompt:**

```
"Crie uma classe Order que tenha apenas a responsabilidade de
representar os dados do pedido. Separe o processamento de pagamento,
notificação e geração de documentos em classes distintas, aplicando
o Single Responsibility Principle."
```

### Open/Closed Principle (OCP)

Código gerado por IA pode criar rigidez acidental ao não antecipar extensões. O modelo tende a resolver o problema imediato sem considerar evoluções futuras.

**Problema comum:**

- Implementações concretas diretas sem abstrações
- Uso de condicionais para variações de comportamento
- Falta de pontos de extensão claramente definidos

**Abordagem correta via prompt:**

```
"Implemente um sistema de processamento de pagamentos que esteja
aberto para extensão (novos métodos de pagamento) mas fechado para
modificação. Use o padrão Strategy e interfaces abstratas."
```

### Liskov Substitution Principle (LSP)

Herança gerada por IA pode violar contratos de substituição quando a hierarquia é construída sem consideração dos invariantes das classes base.

**Cenário de risco:**

- Subclasses que enfraquecem pré-condições
- Subclasses que fortalecem pós-condições
- Violação de invariantes da classe pai

**Prática recomendada:**
Sempre valide hierarquias de herança geradas por IA com testes de unidade que verifiquem o comportamento do substituto em todos os contextos de uso da classe base.

### Interface Segregation Principle (ISP)

A IA pode criar interfaces inchadas (*fat interfaces*) quando solicitada a definir contratos genéricos. Interfaces com muitos métodos forçam implementações a carregar responsabilidades que não lhes competem.

**Exemplo de interface inchada:**

```python
# Interface muito ampla - problema comum em código gerado
class MachineInterface:
    def print(self, document): pass
    def scan(self, document): pass
    def fax(self, document): pass
    def staple(self, document): pass
    def bind(self, document): pass
```

**Solução:** Solicitar explicitamente interfaces focadas:

```
"Defina interfaces segregadas para diferentes capacidades de
máquinas de escritório: Printer, Scanner, FaxMachine. Uma
impressora simples não deve ser forçada a implementar métodos
de fax."
```

### Dependency Inversion Principle (DIP)

Código gerado frequentemente cria dependências diretas em vez de abstrações. O modelo tende a importar e instanciar classes concretas diretamente.

**Padrão problemático:**

```python
# Violação de DIP
class OrderService:
    def __init__(self):
        # Dependência direta em concreto
        self.repository = MySQLRepository()
        self.payment_gateway = StripeGateway()
```

**Correção via especificação:**

```
"Implemente OrderService recebendo suas dependências via construtor
(injeção de dependências). Use abstrações (interfaces/protocols)
para repository e payment gateway, não implementações concretas."
```

## 2.2 Aplicando SOLID via Prompt Engineering

Syncfusion (2025) propõe que a aplicação de SOLID em desenvolvimento com IA ocorre primariamente através de técnicas estruturadas de engenharia de prompt [^9]:

### Prompts Estruturados

Inclua princípios específicos na instrução inicial:

```markdown
## Contexto e Requisitos
Implemente um sistema de gerenciamento de usuários seguindo
os princípios SOLID:
- Cada classe deve ter uma única responsabilidade (SRP)
- Use abstrações para permitir extensão sem modificação (OCP)
- Projete hierarquias que respeitem substituição (LSP)
- Segregue interfaces para evitar dependências desnecessárias (ISP)
- Dependa de abstrações, não de concretos (DIP)
```

### Exemplos Few-Shot

Forneça exemplos de código que demonstrem o princípio desejado:

```markdown
## Exemplo de SRP
BOM:
```python
class UserRepository:
    def save(self, user): pass

class UserNotifier:
    def notify(self, user, message): pass
```

EVITAR:

```python
class UserManager:
    def save(self, user): pass
    def notify(self, user, message): pass  # Violação
```

```

### Revisão Iterativa

Solicite refatorações específicas em ciclos de feedback:

```

"A classe atual viola o Single Responsibility Principle pois
lida com persistência, validação e notificação. Refatore em
classes especializadas mantendo a funcionalidade."

```

### Contexto Arquitetural

Forneça guidelines do projeto antes das solicitações específicas:

```markdown
## Guidelines de Design do Projeto
- Usamos injeção de dependências via construtor
- Interfaces devem ter no máximo 5 métodos
- Evite herança profunda (máximo 2 níveis)
- Prefira composição sobre herança
```

## 2.3 DRY: Don't Repeat Yourself

A IA demonstra eficácia notável na identificação de duplicação de código.
Ferramentas como GitHub Copilot sugerem extração de métodos automaticamente
quando detectam padrões repetidos [^10].

No entanto, surge um risco: **over-engineering na busca por abstrações
prematuras**. A IA pode sugerir generalizações excessivas para eliminar
pequenas duplicações que, na verdade, representam coincidências acidentais,
não verdadeiras repetições de conhecimento.

**Diretriz:**

```
"Refatore para eliminar duplicação genuína de lógica de negócio.
Não crie abstrações para coincidências sintáticas que podem
evoluir independentemente."
```

## 2.4 KISS: Keep It Simple, Stupid

Existe uma tensão inerente entre a capacidade da IA de gerar soluções complexas
e a necessidade de simplicidade. Modelos sofisticados podem produzir
implementações elegantes mas excessivamente sofisticadas para problemas
simples.

O princípio YAGNI (You Ain't Gonna Need It) aplica-se integralmente: não
adicione funcionalidade até que seja necessária [^11].

**Estratégia de prompt para simplicidade:**

```
"Implemente a solução mais simples possível que atenda aos
requisitos. Evite padrões de design desnecessários, otimizações
prematuras ou generalizações que não são requisitos atuais."
```

!!! warning "A Armadilha da Complexidade Gerada"

    A IA pode sugerir implementações que demonstram sofisticação técnica mas
    introduzem complexidade acidental. Sempre pergunte: "Esta complexidade é
    essencial ao problema ou decorrência de over-engineering?"

## 2.5 Princípio da Menor Surpresa (PoLA)

O Principle of Least Astonishment torna-se crítico para APIs e interfaces geradas por IA. Código produzido automaticamente pode implementar comportamentos logicamente corretos mas semanticamente surpreendentes.

**Prática essencial:** Validação humana de contratos de API antes de integração. Verifique se:

- Nomes de métodos refletem precisamente seu comportamento
- Parâmetros têm ordem e nomes intuitivos
- Comportamentos de borda são documentados e previsíveis
- Exceções são lançadas em condições esperadas

## 2.6 Síntese: Princípios como Contexto

Na era da IA, os princípios clássicos não são aplicados através de codificação manual, mas através de **especificação de contexto**. O designer fornece os princípios como parte do ambiente informacional do modelo, que então os aplica na geração.

```
Estrutura de Prompt para Princípios:
├── Contexto Arquitetural (padrões do projeto)
├── Princípios Específicos (SOLID, DRY, KISS)
├── Exemplos Positivos (few-shot)
├── Contra-Exemplos (anti-patterns a evitar)
└── Critérios de Aceitação (definição de pronto)
```

Esta abordagem transforma princípios abstratos em instruções operacionalizáveis, permitindo que a IA os incorpore sistematicamente no código gerado.

## Referências

[^8]: BRGR. "Keep Your Code SOLID in the Age of AI Copilots." 2024.

[^9]: Syncfusion. "How to Apply SOLID Principles in AI Development." 2025.

[^10]: Retool. "6 Software Design Best Practices for 2024." 2024.

[^11]: TestingIL. "AI Code Refactoring: Best Practices and Pitfalls." 2024.

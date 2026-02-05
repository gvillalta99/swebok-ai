---
title: 02. Princípios de Design para Código Gerado
created_at: '2025-01-31'
tags: [software-design, principios, solid, codigo-gerado, verificacao]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Princípios de Design para Código Gerado

A premissa fundamental da engenharia de software mudou. Antes, otimizávamos
código para execução eficiente e escrita rápida. Hoje, com a geração de código a
custo marginal zero, o gargalo deslocou-se para a **leitura e verificação**. Se
o código gerado por IA não for trivialmente auditável por um humano, ele é
passivo tóxico instantâneo. Design, agora, é sobre criar arquiteturas que
tolerem a volatilidade e a imperfeição de agentes estocásticos.

## 1. O Novo Paradigma: Design for Reviewability

Em um ambiente onde 80% do código pode ser sinteticamente gerado, a "elegância"
algorítmica perde espaço para a **clareza cognitiva**. O código deve ser
projetado para ser lido, validado e descartado com a mesma facilidade.

### 1.1. Isolamento de Incerteza (Uncertainty Containment)

Código gerado por IA tende a alucinar ou introduzir sutilezas inseguras.

- **Princípio:** Empurre o código gerado para as bordas do sistema (leaf nodes).
- **Prática:** O "core domain" (regras de negócio críticas) deve ser mantido
  limpo, tipado e, idealmente, escrito ou revisado linha a linha. A IA preenche
  os detalhes de implementação (adapters, DTOs, testes, scripts).
- **Regra de Ouro:** Nunca misture lógica de orquestração crítica com lógica de
  implementação gerada no mesmo escopo.

### 1.2. Imutabilidade como Padrão

O estado mutável é a raiz de grande parte da complexidade acidental. Para uma
IA, rastrear mudanças de estado em longas funções é difícil; para o revisor
humano, é impossível.

- **Princípio:** Prefira estruturas de dados imutáveis e funções puras.
- **Benefício:** Funções puras são trivialmente testáveis. Você pode pedir para
  a IA gerar 100 casos de teste para uma função pura e ter alta confiança no
  resultado.

### 1.3. Interfaces Explícitas e Contratos Rígidos

A IA precisa de limites claros ("guardrails").

- **Princípio:** Defina a interface *antes* de gerar a implementação.
- **Prática:** Use tipos fortes (TypeScript, Rust, Python com Type Hints
  rigorosos). O compilador é o primeiro revisor do código da IA. Se não compila,
  nem chega ao humano.

### 1.4. Descartabilidade (Disposability)

Não se apegue ao código.

- **Princípio:** Trate componentes gerados como artefatos de build. Se um módulo
  está confuso ou bugado, não faça "debug". Apague e gere novamente com um
  prompt (especificação) melhor.
- **Mentalidade:** O código é o resultado compilado do prompt. O "código-fonte"
  real é o prompt e o contexto.

## 2. Adaptação dos Princípios SOLID

Os princípios clássicos ainda valem, mas com nova ênfase:

| Princípio                 | Adaptação para Era da IA                                                                                                                                                                          |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **S**ingle Responsibility | **Hiper-especialização**. Funções geradas devem fazer *uma* coisa minúscula. Se a IA gerar um "God Method", rejeite. O contexto limitado dos LLMs exige funções pequenas para manter a coerência. |
| **O**pen/Closed           | **Extensão via Composição**. Evite pedir para a IA modificar classes existentes complexas. Peça para criar novos adaptadores ou estratégias que se plugam no sistema.                             |
| **L**iskov Substitution   | **Contratos de Teste**. Se a IA gera uma implementação alternativa, ela deve passar exatamente pela mesma bateria de testes de contrato da implementação original.                                |
| **I**nterface Segregation | **Interfaces Mínimas**. Interfaces pequenas reduzem a chance de alucinação. É mais fácil para a IA implementar `Reader` e `Writer` separadamente do que um `FileSystemManager`.                   |
| **D**ependency Inversion  | **Core Blindado**. O núcleo do seu sistema define as abstrações; a IA gera os detalhes de baixo nível que dependem dessas abstrações. Nunca o contrário.                                          |

## 3. Checklist Prático: O que fazer amanhã

Se você lidera um time usando Copilot/Cursor/Windsurf, implemente estas regras:

1. **Limite de Complexidade Ciclomática Rígido**: Configure o linter para falhar
   em funções com complexidade > 5 ou 6. Force a IA a quebrar o código.
2. **Tipagem Estrita Obrigatória**: Proíba `any` (TS) ou falta de type hints
   (Python). A IA deve ser forçada a explicar os tipos que está usando.
3. **Comentários de "Intenção"**: Exija que blocos de código gerado venham
   acompanhados de um comentário explicando o *porquê*, não o *o quê*.
4. **Testes Gerados Primeiro**: Antes de aceitar a implementação da função, peça
   para a IA gerar os testes baseados na interface.
5. **Review de "Olho Nu"**: Se você precisa rolar a tela para entender a função
   gerada, ela está errada. Peça refatoração.
6. **Isolamento de I/O**: Todo I/O (banco, API, disco) deve estar isolado. A
   lógica de negócio não deve saber que o banco de dados existe.
7. **Nomes Descritivos**: A IA não tem preguiça de digitar. Exija nomes de
   variáveis longos e extremamente descritivos (`user_list` é ruim;
   `active_users_with_pending_invoices` é bom).

## 4. Armadilhas Comuns (Anti-Padrões)

- **O "Mágico de Oz"**: Código que funciona por coincidência, usando
  dependências globais ou efeitos colaterais que a IA "adivinhou" do contexto,
  mas que quebram se o contexto mudar.
- **Over-Engineering Alucinado**: A IA cria Factories, Builders e Adapters
  desnecessários porque "leu em algum lugar" que é boa prática. Mantenha o YAGNI
  (You Ain't Gonna Need It) agressivo.
- **Comentários Mentirosos**: O código faz X, mas o comentário gerado diz que
  faz Y. O revisor lê o comentário e aprova o bug. **Regra:** Nunca confie nos
  comentários gerados sem ler o código.
- **Dependências Fantasmas**: A IA importa uma biblioteca pesada (ex: `pandas`)
  para fazer uma operação simples que poderia ser feita com
  `list comprehension`.
- **Try/Catch Silencioso**: A IA adora engolir erros para "fazer o código
  rodar". Verifique sempre os blocos `catch`.

## 5. Exemplo Mínimo: Refatorando Código Gerado

**Cenário:** Precisamos validar um pedido de e-commerce.

### Abordagem Ingênua (O que a IA gera por padrão)

```python
# Ruim: Mistura validação, regra de negócio e I/O. Difícil de testar.
def process_order(order_id):
    order = db.get(order_id) # Dependência oculta
    if order['total'] > 1000:
        if order['user']['is_prime']:
            apply_discount(order) # Efeito colateral
        else:
            print("User not prime") # Log inútil
    else:
        return False
    db.save(order) # I/O misturado
    return True
```

### Abordagem "SWEBOK-AI" (Design para Verificabilidade)

```python
# Bom: Funções puras, tipos claros, responsabilidade única.

# 1. Definição de Tipos (Contrato)
from dataclasses import dataclass

@dataclass(frozen=True) # Imutabilidade
class Order:
    id: str
    total: float
    is_prime_user: bool

# 2. Lógica Pura (Fácil de testar e revisar)
def should_apply_discount(order: Order) -> bool:
    """Regra explícita: Desconto apenas para Prime acima de 1000."""
    return order.is_prime_user and order.total > 1000

# 3. Orquestração (Onde o humano foca a atenção)
def process_order_handler(repo: OrderRepository, order_id: str) -> None:
    order = repo.get_by_id(order_id)

    if should_apply_discount(order):
        # Apenas aqui ocorre a mutação/efeito colateral
        repo.apply_discount(order.id)
```

**Decisão:** A segunda versão é mais verbosa, mas separa *decisão* (lógica pura)
de *ação* (efeito colateral). A IA pode gerar a lógica pura com risco zero, e o
humano revisa apenas a regra de negócio.

## 6. Resumo Executivo

- **Código é passivo**: Otimize para leitura e descarte, não para posse.
- **Verificação é o gargalo**: Se a IA gera código que você não consegue validar
  em segundos, rejeite.
- **Isole a incerteza**: Empurre código gerado para as bordas; mantenha o núcleo
  limpo.
- **Tipagem é lei**: Use o sistema de tipos como a primeira linha de defesa
  contra alucinações.
- **Prompt é código**: Versionar e refinar o prompt é mais importante que
  corrigir o código gerado manualmente.

## 7. Próximos Passos

- Estudar **Engenharia de Restrições** (KA 01) para aprender a limitar o espaço
  de solução da IA.
- Implementar pipelines de **Verificação Automatizada** (KA 05) que rodem antes
  do code review humano.
- Adotar práticas de **Arquitetura Hexagonal** (KA 02) para facilitar o
  isolamento de componentes gerados.

## 8. Referências

1. **GitClear Research (2025)**. "AI Copilot Code Quality: 4x Growth in Code
   Clones". Dados empíricos sobre a degradação da qualidade do código.
2. **Google Engineering Practices**. "Code Review Developer Guide". Foco em
   legibilidade e manutenção.
3. **SWEBOK-AI v5.0**. "KA 05: Verificação e Validação em Escala".

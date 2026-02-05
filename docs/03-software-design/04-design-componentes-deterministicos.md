---
title: 04. Design de Componentes Determinísticos
created_at: '2025-01-31'
tags: [software-design, componentes, deterministicos, ia, contratos]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Design de Componentes Determinísticos (Ferramentas)

## Contexto

Em uma arquitetura baseada em agentes, a IA é o "cérebro" (probabilístico,
criativo, propenso a erros), e o código tradicional são as "mãos"
(determinístico, exato, seguro). Se as mãos tremem, a cirurgia falha, não
importa quão genial seja o cirurgião.

O design de componentes determinísticos — especificamente **Tools**
(ferramentas) para uso por LLMs — é a disciplina de engenharia mais crítica de
2026\. Não se trata apenas de escrever funções; trata-se de expor interfaces que
resistam à alucinação, garantam idempotência e protejam o sistema de decisões
erráticas. O código aqui não é o produto final; é a infraestrutura de segurança
sobre a qual a inteligência opera.

## A Anatomia de uma Ferramenta Robusta

Uma "Tool" para um agente não é apenas uma função Python ou TypeScript. É um
pacote composto por três camadas indissociáveis:

1. **A Interface Semântica (Docstring/Description):** O manual de instruções que
   o LLM lê. Deve ser inequívoco.
2. **A Interface Sintática (Schema):** A barreira rígida de tipos (JSON Schema,
   Pydantic, Zod).
3. **A Implementação (Execution):** O código lógico que realiza a ação, isolado
   de efeitos colaterais indesejados.

### 1. Validação Estrita de Input (Schema as Firewall)

Nunca confie no output de um LLM. Trate qualquer chamada de ferramenta vinda de
um modelo como "user input" hostil.

- **Tipagem Forte:** Use enums para opções limitadas. Não aceite `string` quando
  você quer `Literal['active', 'inactive']`.
- **Validação de Negócio no Schema:** Se um valor deve ser positivo, o schema
  deve rejeitar negativos antes mesmo de o código executar.
- **Mensagens de Erro como Feedback:** Quando a validação falha, a mensagem de
  erro deve ser instrutiva para o LLM. Retorne *"Erro: o campo 'data' deve ser
  ISO8601"* em vez de *"Invalid Input"*. Isso permite que o agente se corrija
  (Self-Correction).

### 2. Idempotência é Obrigatória

Agentes falham. Redes caem. LLMs decidem "tentar de novo" porque acharam que a
resposta demorou. Se sua ferramenta de pagamento cobra o cartão cada vez que é
chamada, você tem um problema financeiro grave.

- **Chaves de Idempotência:** Toda operação de escrita (POST/PUT/DELETE) deve
  aceitar um `idempotency_key`.
- **Estado Final vs. Transição:** Prefira APIs que definem o estado desejado
  (`set_status('active')`) em vez de transições relativas (`toggle_status()`).
  Se o agente chamar `toggle` duas vezes por erro, o sistema fica no estado
  errado.

### 3. Isolamento de Efeitos Colaterais (Side-Effects)

O LLM muitas vezes "pensa" executando. Ele pode chamar uma ferramenta apenas
para ver o que acontece.

- **Dry-Run Mode:** Ferramentas críticas (deletar recursos, transferir dinheiro)
  devem ter um flag `dry_run: boolean`. O agente pode simular a ação para
  verificar as consequências antes de commitar.
- **Read-Only por Padrão:** Separe claramente ferramentas de leitura (seguras
  para retries infinitos) de ferramentas de escrita (perigosas).

## Padrões de Design para Tools

### O Padrão "Result Object"

Não retorne apenas strings ou booleanos. Retorne objetos estruturados que dão
contexto ao agente.

**Ruim:**

```json
"Sucesso"
```

**Bom:**

```json
{
  "status": "success",
  "transaction_id": "tx_123",
  "new_balance": 450.00,
  "message": "Transferência realizada. O saldo atual foi atualizado."
}
```

O objeto rico permite que o agente raciocine sobre o próximo passo sem precisar
fazer uma nova consulta (reduzindo latência e custo).

### O Padrão "Human-in-the-Loop" (HITL)

Para ações irreversíveis, a ferramenta não deve executar a ação, mas sim
*agendar* a ação para aprovação.

1. Agente chama `request_deploy_production()`.
2. Ferramenta retorna: *"Solicitação #99 criada. Aguardando aprovação humana via
   Slack."*
3. O sistema externo notifica o humano.
4. A execução real ocorre fora do ciclo de vida do request do LLM.

## Checklist Prático

O que eu verifico antes de aprovar um PR com novas ferramentas para agentes:

1. [ ] **Schema Rigoroso:** Todos os parâmetros têm tipos, descrições e
   validações (min/max, regex)?
2. [ ] **Docstrings Inequívocas:** A descrição explica *quando* usar e *quando
   não* usar a ferramenta?
3. [ ] **Idempotência:** Posso chamar essa função 5 vezes seguidas com os mesmos
   parâmetros sem corromper dados?
4. [ ] **Tratamento de Erros:** As exceções retornam mensagens que um "robô"
   consegue entender para se corrigir?
5. [ ] **Limites de Segurança:** Existe um limite máximo (hard limit) para
   valores numéricos (ex: quantidade, valor monetário)?
6. [ ] **Timeout:** A ferramenta falha graciosamente se o backend demorar?
7. [ ] **Log de Auditoria:** A ferramenta loga *quem* (qual agente/sessão)
   solicitou a ação?
8. [ ] **Sem Estado Oculto:** A ferramenta depende de algo que o agente "deveria
   lembrar" da chamada anterior? (Evite isso).

## Armadilhas Comuns (Anti-Patterns)

- **A "God Tool":** Uma função `manage_system(action, params)` que faz tudo. O
  LLM se perde na complexidade do schema. Quebre em `create_user`,
  `delete_user`, `update_user`.
- **Retorno Vazio:** Funções que retornam `void` ou `None`. O LLM alucina que
  funcionou (ou que falhou). Sempre retorne confirmação explícita.
- **Dependência de Ordem:** Esperar que o agente chame `init()` antes de
  `process()`. Agentes são caóticos; projete ferramentas stateless ou que
  verifiquem o estado prévio explicitamente.
- **Vazamento de Abstração:** Retornar stack traces de Python/Java para o LLM.
  Isso confunde o modelo. Capture o erro e retorne uma mensagem semântica.

## Exemplo Mínimo: Processamento de Reembolso

Cenário: Um agente de suporte precisa processar reembolsos.

### Abordagem Frágil (Não faça isso)

```python
def refund(user_id, amount):
    """Dá dinheiro de volta pro usuário."""
    db.execute(f"UPDATE users SET balance = balance + {amount} WHERE id = {user_id}")
    return "Ok"
```

*Crítica: SQL Injection, sem verificação de saldo, não idempotente, retorno
vago.*

### Abordagem Robusta (SWEBOK-AI Standard)

```python
from pydantic import BaseModel, Field, PositiveFloat
from typing import Literal

class RefundResult(BaseModel):
    transaction_id: str
    status: Literal["success", "pending_approval", "rejected"]
    reason: str
    new_balance: float

def process_refund(
    order_id: str,
    amount: float,
    reason: str,
    dry_run: bool = False
) -> RefundResult:
    """
    Processa um reembolso para um pedido específico.
    Use dry_run=True para verificar elegibilidade sem efetivar o pagamento.
    """
    # 1. Validação de Schema (Pydantic faz automático, mas reforçamos regras de negócio)
    if amount <= 0:
        raise ValueError("O valor do reembolso deve ser positivo.")

    # 2. Verificação de Estado (Determinístico)
    order = db.get_order(order_id)
    if not order:
        raise ValueError(f"Pedido {order_id} não encontrado.")

    if order.refunded_amount + amount > order.total:
        return RefundResult(
            transaction_id="",
            status="rejected",
            reason="Valor excede o total do pedido.",
            new_balance=order.user_balance
        )

    # 3. Execução Idempotente (Simulada ou Real)
    if dry_run:
        return RefundResult(
            transaction_id="simulated",
            status="success",
            reason="Simulação: Reembolso seria aprovado.",
            new_balance=order.user_balance + amount
        )

    # Lógica transacional com chave de idempotência baseada no order_id
    tx = payment_gateway.refund(order_id, amount, idempotency_key=f"ref_{order_id}")

    return RefundResult(
        transaction_id=tx.id,
        status="success",
        reason=reason,
        new_balance=tx.new_balance
    )
```

## Resumo Executivo

- **Ferramentas são Contratos:** O schema da ferramenta é o contrato mais
  importante do seu sistema. Ele define o que a IA *pode* e *não pode* fazer.
- **Idempotência é Segurança:** Em sistemas probabilísticos, a repetição é
  garantida. O sistema deve suportá-la nativamente.
- **Feedback Loop:** Erros de ferramentas são parte do prompt do próximo passo.
  Torne-os informativos.
- **Isolamento:** Separe leitura (barata/segura) de escrita (cara/perigosa).
- **Determinismo:** O código da ferramenta deve ser chato, previsível e
  exaustivamente testado. Deixe a "criatividade" apenas para o prompt.

## Próximos Passos

- Implementar **testes de contrato** para garantir que as ferramentas respeitam
  seus schemas.
- Estabelecer **telemetria** específica para uso de ferramentas (taxa de erro
  por ferramenta, latência).
- Revisar o capítulo de **Engenharia de Restrições** para alinhar os schemas com
  as políticas de segurança.

## Matriz de Avaliação

| Critério                        | Descrição                             | Avaliação                                                                                                                                   |
| ------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos ficarão mais inteligentes, mas a necessidade de interfaces determinísticas seguras para o mundo real é perene.           |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Baixo**. Testes unitários clássicos e validação de schema resolvem 99% dos casos.                                                         |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Alta**. Se a ferramenta permite uma ação ilegal ou destrutiva por falta de validação, a culpa é da engenharia, não da "alucinação" da IA. |

## Referências

1. **Function Calling with LLMs**. OpenAI Documentation, 2024.
2. **Robustness in AI Agents**. Anthropic Research, 2025.
3. **Idempotency Patterns**. Stripe Engineering Blog.
4. **Pydantic Documentation**. <https://docs.pydantic.dev/>

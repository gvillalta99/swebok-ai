---
title: Design de Componentes Determinísticos
created_at: '2025-01-31'
tags: [software-design, determinismo, core-domain, arquitetura-hexagonal]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Design de Componentes Determinísticos

Em sistemas híbridos, a maior parte do código deve permanecer determinística.
Delegar regras de negócio críticas a prompts ou inferências probabilísticas é um
erro de design arquitetural.

Componentes determinísticos sustentam previsibilidade operacional: garantem
consistência de regras, controle de acesso e integridade de dados, mesmo sob
falhas ou variação de comportamento dos modelos.

## O Núcleo Imutável (Core Domain)

Seguindo princípios de Domain-Driven Design (DDD), o núcleo do seu negócio (Core
Domain) deve ser protegido da variabilidade da IA.

- **Regra:** A lógica de negócio crítica (cálculo de preços, aprovação de
  transações, regras de acesso) deve ser escrita em código tradicional (Python,
  Java, Go, etc.), coberta por testes unitários e nunca delegada a um LLM.
- **Papel da IA:** A IA atua nas bordas (Interface Adaptativa) ou como auxiliar
  (Copiloto), mas nunca como legisladora das regras de negócio.

### Separação de Responsabilidades

| Componente          | Natureza       | Exemplo                                 | Quem executa?       |
| :------------------ | :------------- | :-------------------------------------- | :------------------ |
| **Policy Engine**   | Determinístico | "Usuário Premium tem 10% de desconto"   | Código (Hard Logic) |
| **Intent Parser**   | Probabilístico | "O usuário *parece* querer um desconto" | LLM (Soft Logic)    |
| **Action Executor** | Determinístico | Aplica o desconto no banco de dados     | Código (Hard Logic) |

O design deve garantir que o **Intent Parser** apenas extraia a intenção e
parâmetros, mas quem decide se a ação é válida é o **Policy Engine**.

## Isolamento de Componentes Probabilísticos

Trate componentes de IA como se fossem I/O externo instável (similar a acessar
um disco de rede lento e corrompível).

### O Padrão "Ports and Adapters" (Hexagonal)

A Arquitetura Hexagonal é perfeita para isolar LLMs.

- **Domínio:** núcleo puro e determinístico, sem dependência direta de IA.
- **Porta:** Interface que define o que o sistema precisa (ex: `ISummarizer`,
  `ISentimentAnalyzer`).
- **Adaptador:** implementação concreta que integra provedores de IA.

Isso permite que você troque o modelo, ou substitua por uma implementação
"dummy" nos testes, sem tocar na lógica de negócio.

**Exemplo de Interface:**

```python
# Interface Determinística
class FraudDetector(Protocol):
    def check(self, transaction: Transaction) -> FraudResult: ...

# Implementação Híbrida (Adaptador)
class LLMFraudDetector(FraudDetector):
    def check(self, transaction: Transaction) -> FraudResult:
        # Chama LLM...
        # Valida resposta...
        return result
```

Para o restante do sistema, `FraudDetector` expõe apenas um contrato estável.
Qualquer inferência probabilística permanece encapsulada no adaptador e sujeita
a validação determinística antes da decisão final.

## Imutabilidade e Idempotência

Como LLMs podem falhar e precisar de retries, os componentes determinísticos que
recebem comandos da IA devem ser idempotentes.

- **Idempotência:** Executar a mesma ação duas vezes não deve causar efeito
  colateral duplicado (ex: cobrar o cartão duas vezes).
- **Design:** Use chaves de idempotência (idempotency keys) geradas no início do
  fluxo e passadas adiante. Se o LLM alucinar e pedir a execução novamente, o
  componente determinístico detecta a chave duplicada e ignora.

## Estratégias de Fallback Determinístico

Quando a camada de IA falha, o sistema deve degradar para um modo seguro e
funcional, preservando continuidade de serviço e controle de risco.

1. **Regras Heurísticas:** Se o modelo de recomendação cair, retorne os "Top 10
   mais vendidos" (query simples de banco).
2. **Regex/Keyword Matching:** Se o classificador de intenção via LLM falhar,
   tente identificar palavras-chave simples ("cancelar", "comprar").
3. **Fail Closed:** Em segurança, se o avaliador de risco via IA falhar, negue o
   acesso por padrão.

## Armadilhas Comuns

- **Lógica de Negócio no Prompt:** Colocar regras complexas ("Se o usuário for X
  e a data for Y, dê Z") dentro do prompt. É impossível testar todas as
  permutações e o modelo vai errar na borda. Tire a regra do prompt e traga para
  o código (`if user.is_x and date.is_y: ...`).
- **Estado Global Compartilhado:** Permitir que agentes de IA manipulem estado
  global sem passar por métodos transacionais seguros.

## Resumo Executivo

- **Core Blindado:** Mantenha a IA longe do núcleo crítico do negócio.
- **IA nas Bordas:** Use IA para traduzir linguagem natural em chamadas de
  função estruturadas.
- **Adapters:** Isole a IA atrás de interfaces limpas.
- **Código > Prompt:** Se você pode escrever em `if/else`, não use prompt. É
  mais barato, rápido e correto.

## Próximos Passos

- Definir contratos claros entre o mundo determinístico e probabilístico em
  **Design de Interfaces e Contratos** (Próxima seção).
- Garantir que o código determinístico seja testável para suportar a
  variabilidade da entrada.

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. EVANS, Eric. *Domain-Driven Design: Tackling Complexity in the Heart of
   Software*. Addison-Wesley, 2003. ISBN 9780321125217.
2. COCKBURN, Alistair. *Hexagonal Architecture (Ports & Adapters)*. HaT
   Technical Report 2005.02, 2005. Disponível em:
   <https://alistair.cockburn.us/hexagonal-architecture>. Acesso em: 6 fev.
   2026\.
3. FIELDING, R.; NOTTINGHAM, M.; RESCHKE, J. *HTTP Semantics*. RFC 9110, IETF,
   2022\. DOI: <https://doi.org/10.17487/RFC9110>.
4. TABASSI, Elham. *Artificial Intelligence Risk Management Framework (AI RMF
   1.0)*. NIST AI 100-1, 2023. DOI: <https://doi.org/10.6028/NIST.AI.100-1>.

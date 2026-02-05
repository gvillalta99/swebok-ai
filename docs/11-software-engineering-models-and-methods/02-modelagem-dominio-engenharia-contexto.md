---
title: 11.2 - Modelagem de Domínio e Engenharia de Contexto
created_at: '2025-01-31'
tags: [ddd, domain-driven-design, engenharia-de-contexto, linguagem-ubiqua, bounded-contexts, modelagem-de-dominio]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 2. Modelagem de Domínio e Engenharia de Contexto

## Overview

Esta seção explora como Domain-Driven Design (DDD) evolui na era dos Large
Language Models (LLMs), transformando-se de uma metodologia de modelagem
conceitual para uma disciplina de **engenharia de contexto**—o design
sistemático das informações e constraints que permitem que sistemas de IA operem
efetivamente dentro de limites de domínio bem definidos.

Enquanto o DDD tradicional focava na criação de modelos mentais compartilhados
entre desenvolvedores e especialistas de domínio, o DDD na era da IA
concentra-se em estruturar esse conhecimento de forma que LLMs possam gerar
código coeso, consistente e alinhado com as complexidades do negócio.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Aplicar princípios de DDD para estruturar contextos efetivos para LLMs
2. Transformar linguagem ubíqua em especificações de geração de código
3. Utilizar bounded contexts como boundaries de geração modular
4. Implementar técnicas de extração automática de modelos de domínio
5. Avaliar a qualidade de contextos projetados para sistemas com IA

## 2.1 Domain-Driven Design na Era da IA

### 2.1.1 A Relevância Renovada do DDD

O Domain-Driven Design, introduzido por Eric Evans em 2003, tornou-se ainda mais
crítico na era dos LLMs. A pesquisa demonstra que assistentes de IA específicos
de domínio combinam LLMs com bases de conhecimento fundamentadas para fornecer
respostas precisas e contextualmente conscientes [1].

**Por que DDD é Essencial para IA:**

| Aspecto           | DDD Tradicional                 | DDD com IA                       |
| ----------------- | ------------------------------- | -------------------------------- |
| **Foco**          | Compreensão compartilhada       | Especificação para geração       |
| **Output**        | Modelos mentais, documentação   | Prompts estruturados, código     |
| **Stakeholders**  | Devs + especialistas de domínio | Devs + especialistas + LLMs      |
| **Granularidade** | Macro (contextos delimitados)   | Micro (entidades, value objects) |
| **Iteração**      | Workshops, event storming       | Refinamento de prompts           |

### 2.1.2 Princípios de DDD Aplicados à Engenharia de Contexto

Os princípios fundamentais do DDD ganham novas dimensões quando aplicados à
engenharia de contexto:

**Foco no Domínio Principal (Core Domain):** Identificar e isolar o domínio que
diferencia o negócio, fornecendo a ele o maior rigor de modelagem e verificação.

**Linguagem Ubíqua como Especificação:** A linguagem compartilhada entre
especialistas de domínio e desenvolvedores torna-se a linguagem de especificação
para LLMs.

**Contextos Delimitados (Bounded Contexts):** Boundaries explícitos definem não
apenas limites organizacionais, mas também scopes de geração de código
independentes.

## 2.2 Linguagem Ubíqua como Especificação de Geração

### 2.2.1 Da Linguagem Natural à Especificação Estruturada

A linguagem ubíqua—o vocabulário preciso e consistente usado por todos os
stakeholders—torna-se a base para prompts efetivos. Pesquisas indicam que a
engenharia de contexto envolve o design sistemático e gerenciamento dos
contextos de informação fornecidos a LLMs [2].

**Processo de Transformação:**

```
Linguagem Ubíqua (Conversações, Documentos)
           ↓
    [Extração e Refinamento]
           ↓
Glossário de Domínio (Termos, Definições, Relações)
           ↓
    [Estruturação]
           ↓
Especificação de Contexto (Prompts, Constraints, Exemplos)
           ↓
    [Geração via LLM]
           ↓
Código Coeso Alinhado ao Domínio
```

### 2.2.2 Construindo um Glossário de Domínio Efetivo

Um glossário de domínio bem estruturado serve como fonte de verdade para
geração:

```markdown
# Glossário de Domínio: Sistema Bancário

## Entidades

### Conta
- Definição: Representação de uma conta bancária vinculada a um cliente
- Atributos: número, agência, saldo, status, data_abertura
- Invariantes: saldo >= limite_credito * -1; status ∈ {ATIVA, BLOQUEADA, ENCERRADA}
- Regras:
  - Não pode haver duas contas com mesmo número+agência
  - Encerramento requer saldo zero e nenhuma pendência

### Cliente
- Definição: Pessoa física ou jurídica titular de conta(s)
- Atributos: id, nome, documento, tipo, data_cadastro
- Invariantes: documento válido conforme tipo (CPF/CNPJ)

## Value Objects

### Dinheiro
- Definição: Quantia monetária com moeda
- Atributos: valor (BigDecimal), moeda (ISO 4217)
- Invariantes: valor >= 0; moeda não nula
- Operações: somar(), subtrair(), converter_para()

## Agregados

### Agregado Conta
- Raiz: Conta
- Entidades incluídas: Transacao, Titular
- Invariantes de agregado: saldo = Σ(transações)

## Serviços de Domínio

### TransferenciaService
- Responsabilidade: Orquestrar transferências entre contas
- Regras:
  - Verificar saldo suficiente na origem
  - Aplicar limites diários
  - Registrar auditoria
```

### 2.2.3 Padrões de Especificação com Linguagem Ubíqua

**Padrão Entidade-Ação-Resultado:**

```markdown
## Especificação: Transferência entre Contas

**Entidades envolvidas:** Conta (origem), Conta (destino), Transferencia

**Ação:** Realizar transferência de valor

**Pré-condições:**
- Conta origem existe e está ATIVA
- Conta destino existe e está ATIVA
- Valor > 0
- Origem != Destino

**Processo:**
1. Validar saldo suficiente na origem (saldo >= valor)
2. Validar limite diário não excedido
3. Debitar valor da conta origem
4. Creditar valor na conta destino
5. Registrar transação em ambas as contas

**Pós-condições:**
- Saldo origem = Saldo anterior - valor
- Saldo destino = Saldo anterior + valor
- Transação registrada com status CONCLUIDA

**Exceções:**
- SaldoInsuficienteException: quando saldo < valor
- LimiteExcedidoException: quando limite diário excedido
- ContaBloqueadaException: quando conta não está ATIVA
```

## 2.3 Context Mapping para Sistemas Híbridos

### 2.3.1 Mapeando Relações entre Contextos

Em sistemas que combinam componentes determinísticos e estocásticos (IA), o
Context Mapping assume papel crítico na definição de:

- Zonas de certeza vs. zonas de incerteza
- Interfaces entre componentes tradicionais e componentes de IA
- Protocolos de fallback e degradação graciosa

**Tipos de Relações em Sistemas Híbridos:**

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA HÍBRIDO                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │  Contexto       │         │  Contexto       │           │
│  │  Determinístico │◄───────►│  IA/Estocástico │           │
│  │  (Regras rígidas)│  ACL    │  (Geração)      │           │
│  └─────────────────┘         └─────────────────┘           │
│           │                           │                     │
│           │ Anti-Corruption           │ Circuit Breaker     │
│           │ Layer                     │                     │
│           ▼                           ▼                     │
│  ┌─────────────────────────────────────────────┐           │
│  │         Contexto Integrador                 │           │
│  │    (Orquestração e Fallback)                │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3.2 Padrões de Integração Específicos para IA

**Anti-Corruption Layer (ACL) para IA:** Isola o contexto de domínio das
idiossincrasias e instabilidades de componentes de IA.

```python
# Exemplo conceitual de ACL para IA
class SugestaoIACL:
    """
    Anti-Corruption Layer para o serviço de sugestões baseado em IA.
    Garante que respostas da IA sejam validadas antes de afetar o domínio.
    """

    def obter_sugestao(self, contexto: Contexto) -> SugestaoValidada:
        # 1. Chama serviço de IA
        resposta_ia = self.ia_service.generate(contexto.to_prompt())

        # 2. Valida estrutura e constraints
        if not self._validar_formato(resposta_ia):
            return SugestaoValidada.fallback()

        # 3. Verifica invariantes de domínio
        sugestao = self._mapear_para_dominio(resposta_ia)
        if not self._verificar_invariantes(sugestao):
            return SugestaoValidada.fallback()

        # 4. Retorna objeto de domínio válido
        return SugestaoValidada.sucesso(sugestao)
```

**Circuit Breaker para Componentes de IA:** Previne cascata de falhas quando
serviços de IA apresentam instabilidade.

## 2.4 Bounded Contexts e Geração Modular

### 2.4.1 Contextos como Unidades de Geração

Cada Bounded Context pode ser tratado como uma unidade independente de geração
de código, com:

- Seu próprio modelo de domínio completo
- Sua linguagem ubíqua específica
- Seus próprios constraints e invariantes
- Interfaces bem definidas com outros contextos

**Vantagens da Geração Modular:**

1. **Isolamento de Falhas**: Erros em um contexto não afetam outros
2. **Paralelização**: Diferentes contextos podem ser gerados simultaneamente
3. **Especialização**: Cada contexto pode usar o modelo de IA mais adequado
4. **Manutenibilidade**: Mudanças localizadas requerem regeneração parcial

### 2.4.2 Estratégia de Decomposição para Geração

```markdown
## Estrutura de Geração por Contexto

### Contexto: Pagamentos
**Artefatos de Entrada:**
- /contexts/pagamentos/glossario.md
- /contexts/pagamentos/aggregates.md
- /contexts/pagamentos/regras_negocio.md
- /contexts/pagamentos/interfaces.md

**Artefatos de Saída:**
- src/pagamentos/entities/
- src/pagamentos/services/
- src/pagamentos/repositories/
- src/pagamentos/controllers/
- tests/pagamentos/

**Prompt de Geração:**
```

Com base no glossário e nas regras de negócio do contexto Pagamentos, gere
código TypeScript seguindo:

- Arquitetura Hexagonal
- Princípios SOLID
- Padrão Repository para persistência
- Testes unitários para cada classe pública

```
```

## 2.5 Extração Automática de Modelos de Domínio

### 2.5.1 Técnicas de Extração de Código Legado

A engenharia reversa assistida por IA permite extrair modelos de domínio de
bases de código existentes. Pesquisas recentes exploram técnicas de IA para
extrair modelos de domínio de codebases legados, combinando análise estática com
LLMs [3].

**Processo de Extração:**

```
Código Legado
     ↓
[Análise Estática]
     ↓
AST (Abstract Syntax Tree) + Métricas
     ↓
[Identificação por LLM]
     ↓
Entidades, Value Objects, Relações candidatas
     ↓
[Refinamento com Especialista]
     ↓
Modelo de Domínio Validado
     ↓
[Especificação para Geração]
     ↓
Novo Código Alinhado ao Domínio
```

### 2.5.2 Ferramentas e Abordagens

**Análise de Linguagem Natural em Documentação:** LLMs podem analisar
documentação existente (manuais, wikis, comentários) para identificar termos de
domínio, conceitos e relações.

**Descoberta de Entidades e Relacionamentos:** Técnicas de NLP aplicadas a
código-fonte identificam:

- Classes que representam entidades de domínio
- Métodos que implementam comportamento de negócio
- Dependências que indicam relacionamentos
- Invariantes implícitas em validações

**Exemplo de Extração:**

````markdown
## Input: Código Legado (Java)

```java
public class OrderProcessor {
    public void process(Order order) {
        if (order.getItems().isEmpty()) {
            throw new IllegalStateException("Order must have items");
        }
        if (order.getCustomer() == null) {
            throw new IllegalStateException("Order must have a customer");
        }
        // ... processamento
    }
}
````

## Output: Modelo Extraído

### Entidade: Order

- Atributos: items (List\<Item>), customer (Customer)
- Invariantes:
  - items não pode ser vazio
  - customer não pode ser nulo
- Comportamento: processamento de pedido

```

## Practical Considerations

### Aplicações Reais

1. **Modernização de Monolitos**: Extração de contextos delimitados de sistemas legados para migração gradual
2. **Documentação Viva**: Geração automática de documentação de domínio a partir de código
3. **Onboarding de Equipes**: Uso de modelos extraídos para treinamento de novos desenvolvedores
4. **Validação de Consistência**: Verificação automática de alinhamento entre código e modelo de domínio

### Limitações e Riscos

1. **Ambiguidade Semântica**: Código pode implementar múltiplos conceitos de domínio de forma não explícita
2. **Perda de Contexto**: Informações de negócio podem estar apenas na cabeça de desenvolvedores experientes
3. **Overfitting a Implementação**: Modelo extraído pode refletir más práticas do código legado
4. **Custo Computacional**: Análise de grandes codebases requer recursos significativos

### Melhores Práticas

1. **Combine extração automática com validação humana**—especialistas de domínio devem revisar modelos extraídos
2. **Documente suposições** feitas durante o processo de extração
3. **Itere incrementalmente**—comece com subdomínios bem definidos
4. **Mantenha rastreabilidade** entre código fonte e elementos do modelo
5. **Use extração como ponto de partida**, não como verdade final

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — DDD e modelagem de domínio são fundamentais independente de tecnologia |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — modelos extraídos requerem validação por especialistas |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta — decisões de modelagem de domínio têm impacto direto no negócio |

## Summary

- DDD evoluiu de metodologia de modelagem para disciplina de engenharia de contexto
- Linguagem ubíqua estruturada serve como especificação efetiva para geração de código
- Bounded contexts funcionam como unidades modulares de geração independente
- Context mapping define interfaces entre zonas determinísticas e estocásticas
- Extração automática de modelos acelera modernização, mas requer validação humana

## References

1. Opcito. "How to build a reliable domain-specific AI assistant." Opcito Blog, 2025.

2. Laurent, A. "What Is Context Engineering? A Guide for AI & LLMs." IntuitionLabs, 2026.

3. Faria, J.P., et al. "Automatic Generation of Formal Specification and Verification Annotations Using LLMs and Test Oracles." arXiv:2601.12845, 2026.

4. Evans, E. "Domain-Driven Design: Tackling Complexity in the Heart of Software." Addison-Wesley, 2003.

5. Vernon, V. "Implementing Domain-Driven Design." Addison-Wesley, 2013.
```

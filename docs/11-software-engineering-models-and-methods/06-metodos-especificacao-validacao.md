---
title: 11.6 - Métodos de Especificação e Validação
created_at: '2025-01-31'
tags: [especificacao, validacao, user-stories, acceptance-criteria, bdd, gherkin, especificacao-executavel]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 6. Métodos de Especificação e Validação

## Overview

Esta seção explora como métodos tradicionais de especificação—user stories,
critérios de aceitação, BDD—são transformados na era dos Large Language Models
(LLMs), tornando-se **especificações executáveis** que geram código e testes
automaticamente.

Enquanto a especificação tradicional focava em comunicar requisitos entre
stakeholders, a especificação moderna concentra-se em estruturar intenção de
forma que sistemas de IA possam interpretar, gerar implementações e validar
correção de forma automática.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Escrever especificações em linguagem natural estruturada para geração por IA
2. Transformar user stories em prompts efetivos de geração de código
3. Utilizar acceptance criteria em formato Gherkin/BDD para geração automática
   de testes
4. Aplicar validação de especificações via simulação
5. Adaptar métodos de elicitação para o contexto de geração assistida por IA

## 6.1 Especificação em Linguagem Natural Estruturada

### 6.1.1 O Paradoxo da Linguagem Natural

Linguagem natural é simultaneamente:

- **Acessível**: Todos os stakeholders podem contribuir
- **Ambígua**: Sujeita a múltiplas interpretações
- **Poderosa**: Capaz de expressar nuance e contexto

Pesquisas indicam que especificações em linguagem natural têm 3x mais
ambiguidade que especificações estruturadas [1]. Na era dos LLMs, o desafio é
estruturar linguagem natural para minimizar ambiguidade mantendo acessibilidade.

### 6.1.2 Princípios de Especificação Efetiva

**Princípio da Clareza Operacional:** Cada requisito deve ser verificável
através de uma operação observável.

```markdown
## ❌ Especificação Ambígua
"O sistema deve ser rápido"

## ✅ Especificação Clara
"O sistema deve responder a 95% das requisições em menos de 200ms
sob carga normal (≤ 1000 usuários simultâneos)"
```

**Princípio da Atomicidade:** Cada especificação deve tratar de um único
comportamento ou característica.

**Princípio do Contexto Completo:** Especificações devem incluir pré-condições,
gatilhos e pós-condições.

### 6.1.3 Template de Especificação Estruturada

```markdown
# ESPECIFICAÇÃO: [Nome da Funcionalidade]

## Contexto
[Descrição do cenário de negócio]

## Atores
- [Ator primário]
- [Atores secundários]

## Fluxo Principal
1. [Gatilho/Pré-condição]
2. [Ação do sistema]
3. [Ação do usuário]
4. [Resultado esperado]

## Fluxos Alternativos
### FA-001: [Descrição]
1. [Passo alternativo]
2. [...]

## Fluxos de Exceção
### FE-001: [Tipo de erro]
- Condição: [Quando ocorre]
- Comportamento: [Como o sistema responde]
- Mensagem: [Texto apresentado ao usuário]

## Regras de Negócio
- [RB-001]: [Regra com identificador único]
- [RB-002]: [...]

## Critérios de Aceitação
- [CA-001]: [Critério mensurável]
- [CA-002]: [...]

## Dados
### Entrada
- [Campo]: [Tipo], [Restrições], [Obrigatoriedade]

### Saída
- [Campo]: [Tipo], [Fonte]

## Dependências
- [Dependência 1]
- [Dependência 2]
```

## 6.2 User Stories como Prompts de Geração

### 6.2.1 A Transformação da User Story

A user story tradicional:

```
Como [persona], quero [funcionalidade], para que [benefício]
```

Na era dos LLMs, a user story torna-se um prompt estruturado:

```
User Story (Contexto de Negócio)
         ↓
    [Estruturação]
         ↓
Prompt para LLM (Contexto Técnico)
         ↓
    [Geração]
         ↓
Código + Testes
```

### 6.2.2 Estruturação de User Stories para Geração

Para maximizar a efetividade da geração, user stories devem ser enriquecidas:

```markdown
## User Story: US-042 - Aplicação de Cupom de Desconto

### Narrativa
Como um cliente do e-commerce,
Quero aplicar um cupom de desconto no checkout,
Para que eu possa obter redução no valor total da compra.

### Contexto de Negócio
- Cupons são gerados pelo time de marketing
- Cada cupom tem: código, percentual/valor fixo, data de validade, limite de uso
- Cupons podem ser restritos a categorias ou produtos específicos

### Critérios de Aceitação Detalhados

#### CA-001: Cupom Válido
Dado que o cliente tem um carrinho com valor total de R$ 200
E o cupom "DESCONTO20" oferece 20% de desconto
E o cupom está dentro da validade
E o cupom não atingiu o limite de usos
Quando o cliente aplicar o cupom
Então o valor final deve ser R$ 160
E o cupom deve ser marcado como utilizado

#### CA-002: Cupom Expirado
Dado que o cliente tenta usar um cupom fora da validade
Quando aplicar o cupom
Então deve receber mensagem "Cupom expirado"
E o valor do carrinho permanece inalterado

#### CA-003: Cupom com Restrição de Categoria
Dado que o cupom "ELETRONICOS10" é válido apenas para categoria "Eletrônicos"
E o carrinho contém itens de "Roupas" e "Eletrônicos"
Quando o cliente aplicar o cupom
Então o desconto deve ser aplicado apenas aos itens de "Eletrônicos"

### Regras de Negócio
- RB-001: Desconto máximo de R$ 500 por transação
- RB-002: Cupons não cumulativos (apenas um por compra)
- RB-003: Cupons não aplicáveis a produtos em promoção

### Dados
#### Input
- código_cupom: string (6-20 caracteres alfanuméricos)
- carrinho_id: UUID

#### Output
- valor_original: decimal (2 casas)
- valor_desconto: decimal (2 casas)
- valor_final: decimal (2 casas)
- mensagem: string

### Constraints Técnicas
- Validação deve ocorrer em < 100ms
- Operação deve ser idempotente
- Registrar auditoria de todas as tentativas

### Dependências
- Serviço de Carrinho (consulta de itens)
- Serviço de Cupons (validação e resgate)
- Serviço de Auditoria (registro de operações)
```

### 6.2.3 Geração de Implementação a partir de User Story

O prompt para geração a partir da user story estruturada:

```markdown
"Baseado na User Story US-042 fornecida:

1. Gere código TypeScript seguindo Clean Architecture:
   - Entities (regras de negócio puras)
   - Use Cases (orquestração)
   - Interfaces (repositórios, serviços externos)
   - Controllers (HTTP handlers)

2. Gere testes unitários cobrindo:
   - Todos os critérios de aceitação
   - Regras de negócio
   - Casos edge (cupom inexistente, carrinho vazio, etc.)

3. Gere testes de integração para:
   - Fluxo completo de aplicação de cupom
   - Interação com serviços dependentes

Stack tecnológica:
- Node.js + TypeScript
- Jest para testes
- InversifyJS para DI
```

## 6.3 Acceptance Criteria como Testes Gerados Automaticamente

### 6.3.1 BDD e Gherkin na Era da IA

Behavior-Driven Development (BDD) com sintaxe Gherkin tornou-se ainda mais
poderoso com IA. Critérios de aceitação em formato Gherkin podem ser
automaticamente convertidos em testes executáveis.

Pesquisas da ThoughtWorks demonstram que é possível gerar casos de teste
automaticamente a partir de user stories com alta precisão [2].

### 6.3.2 Estrutura Gherkin para Geração

```gherkin
# language: pt
Funcionalidade: Aplicação de Cupom de Desconto
  Como um cliente do e-commerce
  Quero aplicar cupons de desconto
  Para obter redução no valor da compra

  Cenário: Cupom válido aplicado com sucesso
    Dado que o cliente tem um carrinho com valor total de "200.00"
    E o cupom "DESCONTO20" oferece "20"% de desconto
    E o cupom está dentro da validade
    Quando o cliente aplicar o cupom
    Então o valor final deve ser "160.00"
    E o desconto aplicado deve ser "40.00"

  Cenário: Cupom expirado
    Dado que o cliente tem um carrinho com valor total de "200.00"
    E o cupom "EXPIRADO" expirou em "2023-12-31"
    Quando o cliente tentar aplicar o cupom
    Então deve receber erro "Cupom expirado"
    E o valor do carrinho deve permanecer "200.00"

  Esquema do Cenário: Múltiplos cenários de validação
    Dado que o cliente tem um carrinho com valor total de "<valor_original>"
    E o cupom "<codigo>" tem desconto de "<desconto>"
    Quando o cliente aplicar o cupom
    Então o valor final deve ser "<valor_final>"
    E o resultado deve ser "<resultado>"

    Exemplos:
      | valor_original | codigo      | desconto | valor_final | resultado |
      | 100.00         | DESC10      | 10%      | 90.00       | sucesso   |
      | 500.00         | DESC50FIXO  | 50       | 450.00      | sucesso   |
      | 50.00          | INVALIDO    | -        | 50.00       | erro      |
```

### 6.3.3 Geração Automática de Testes

A partir do Gherkin, IA pode gerar:

```typescript
// Teste gerado automaticamente a partir do cenário Gherkin
describe('Aplicação de Cupom de Desconto', () => {
  describe('Cenário: Cupom válido aplicado com sucesso', () => {
    it('deve aplicar desconto corretamente', async () => {
      // Arrange
      const carrinho = await criarCarrinho({ valorTotal: 200.00 });
      const cupom = await criarCupom({
        codigo: 'DESCONTO20',
        percentual: 20,
        valido: true
      });

      // Act
      const resultado = await aplicarCupom(carrinho.id, cupom.codigo);

      // Assert
      expect(resultado.valorFinal).toBe(160.00);
      expect(resultado.descontoAplicado).toBe(40.00);
    });
  });

  describe('Cenário: Cupom expirado', () => {
    it('deve rejeitar cupom fora da validade', async () => {
      // Arrange
      const carrinho = await criarCarrinho({ valorTotal: 200.00 });
      const cupom = await criarCupom({
        codigo: 'EXPIRADO',
        dataExpiracao: new Date('2023-12-31')
      });

      // Act & Assert
      await expect(
        aplicarCupom(carrinho.id, cupom.codigo)
      ).rejects.toThrow('Cupom expirado');

      const carrinhoAtualizado = await obterCarrinho(carrinho.id);
      expect(carrinhoAtualizado.valorTotal).toBe(200.00);
    });
  });
});
```

### 6.3.4 Manutenção de Testes Gerados

**Desafio**: Testes gerados podem quebrar quando o código evolui.

**Soluções**:

1. **Regeneração**: Re-gerar testes quando requisitos mudam
2. **Curadoria**: Manter testes gerados como base, customizar manualmente
3. **Validação**: Verificar que testes gerados ainda passam antes de merge

## 6.4 Validação de Especificações via Simulação

### 6.4.1 Simulação de Comportamento

Antes da implementação, especificações podem ser validadas através de simulação:

```markdown
## Simulação de Especificação

### Cenário Simulado
Input:
- Carrinho: { itens: [...], valorTotal: 200.00 }
- Cupom: { codigo: "DESC20", tipo: "PERCENTUAL", valor: 20 }

### Execução Simulada
1. Validação de cupom: ✓ Válido
2. Cálculo de desconto: 200.00 * 0.20 = 40.00
3. Aplicação: 200.00 - 40.00 = 160.00
4. Persistência: ✓ Sucesso

### Output Esperado
{
  "sucesso": true,
  "valorOriginal": 200.00,
  "desconto": 40.00,
  "valorFinal": 160.00,
  "mensagem": "Cupom aplicado com sucesso"
}

### Validação
- [x] Cálculo matemático correto
- [x] Respeita limite máximo de desconto
- [x] Mensagem adequada ao usuário
```

### 6.4.2 Prototipagem de Especificações

Especificações podem ser "executadas" via IA para identificar:

- Inconsistências lógicas
- Casos edge não cobertos
- Ambiguidades
- Dependências faltantes

## 6.5 Métodos de Elicitação Adaptados para Geração

### 6.5.1 Elicitação Tradicional vs. Para Geração

| Método           | Foco Tradicional            | Foco para Geração                     |
| ---------------- | --------------------------- | ------------------------------------- |
| **Entrevistas**  | Compreensão de necessidades | Extração de contexto completo         |
| **Workshops**    | Consenso entre stakeholders | Definição de linguagem ubíqua         |
| **Observação**   | Entendimento de processos   | Identificação de regras implícitas    |
| **Prototipagem** | Validação de conceitos      | Geração de especificações executáveis |

### 6.5.2 Técnicas de Elicitação Específicas

**Event Storming para IA:** Workshop colaborativo focado em:

- Identificar eventos de domínio
- Definir agregados e bounded contexts
- Estabelecer linguagem ubíqua
- Documentar regras de negócio complexas

Output: Modelo de domínio estruturado pronto para geração.

**Example Mapping:** Técnica para descobrir exemplos concretos que:

- Ilustram regras de negócio
- Identificam casos edge
- Fornecem dados de teste
- Guia geração de cenários

**Specification by Example com IA:** Geração colaborativa de exemplos que servem
como:

- Especificação executável
- Casos de teste
- Documentação viva
- Base para treinamento de modelos

### 6.5.3 Prompts de Elicitação Assistida

```markdown
"Atue como um analista de requisitos experiente.

Contexto do domínio: [descrição do negócio]

A partir da seguinte descrição de funcionalidade:
[descrição em linguagem natural]

Gere:
1. User story completa (persona, funcionalidade, benefício)
2. Pelo menos 5 critérios de aceitação em formato Gherkin
3. Regras de negócio identificadas
4. Casos edge e exceções
5. Dados de entrada e saída
6. Dependências prováveis
7. Questões em aberto para clarificação"
```

## Practical Considerations

### Aplicações Reais

1. **Automação de Testes**: Geração de suites de teste completas a partir de
   especificações
2. **Documentação Viva**: Especificações que geram e mantêm documentação
   atualizada
3. **Validação Contínua**: Verificação automática de alinhamento entre código e
   especificação
4. **Onboarding**: Novos desenvolvedores aprendem via especificações executáveis

### Limitações e Riscos

1. **Over-reliance**: Dependência excessiva de especificações geradas sem
   revisão humana
2. **Ambiguidade Residual**: Linguagem natural sempre carrega alguma ambiguidade
3. **Complexidade de Manutenção**: Especificações evoluem, requerem
   versionamento
4. **Falso Sentimento de Completude**: Especificações geradas podem parecer
   completas sem serem

### Melhores Práticas

1. **Revise especificações geradas**—especialistas de domínio devem validar
2. **Mantenha rastreabilidade**—ligue especificações a código e testes
3. **Versione especificações**—use controle de versão para requisitos
4. **Involva stakeholders**—especificação é atividade colaborativa
5. **Valide via simulação**—teste especificações antes de implementar
6. **Documente suposições**—tornar explícito o que foi assumido

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                         |
| ------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Média — especificação evolui, mas comunicação de requisitos permanece fundamental |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Médio — especificações geradas requerem validação por especialistas               |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Alta — especificações incorretas levam a sistemas incorretos                      |

## Summary

- Especificações em linguagem natural estruturada minimizam ambiguidade mantendo
  acessibilidade
- User stories evoluem de comunicação para prompts de geração de código
- Acceptance criteria em Gherkin geram testes automaticamente
- Simulação permite validar especificações antes da implementação
- Métodos de elicitação adaptados extraem contexto necessário para geração
  efetiva

## References

1. Wei, B. "Requirements are All You Need: From Requirements to Code with LLMs."
   arXiv:2406.10101, 2024.

2. ThoughtWorks. "AI-generated test cases from user stories: An experimental
   research study." ThoughtWorks Insights, 2025.

3. Plotytsia, S. "Implementing AI-Enhanced BDD: A Complete Step-by-Step Guide."
   Medium, 2025.

4. North, D. "Introducing BDD." Better Software, 2006.

5. Wynne, M., Hellesøy, A. "The Cucumber Book: Behaviour-Driven Development for
   Testers and Developers." Pragmatic Bookshelf, 2012.

6. Adzic, G. "Specification by Example." Manning Publications, 2011.

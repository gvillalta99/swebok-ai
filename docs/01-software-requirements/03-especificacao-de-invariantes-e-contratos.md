---
title: 03 - Especificação de Invariantes e Contratos
created_at: '2025-01-31'
tags: [invariantes, contratos, especificacao, formal-methods, design-by-contract, verificacao]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Especificação de Invariantes e Contratos

## Overview

A especificação por invariantes e contratos representa uma evolução crítica da
engenharia de requisitos para a era dos LLMs. Enquanto a especificação
tradicional focava em descrever comportamentos desejados, a abordagem moderna
concentra-se em estabelecer **garantias formais** sobre o comportamento do
sistema, especialmente quando componentes de IA estão envolvidos.

Esta seção apresenta técnicas de Design by Contract (DbC), métodos formais
aplicados a sistemas com IA, e estratégias para especificar invariantes que
previnam alucinações arquiteturais e comportamentais.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender o conceito de invariantes e sua aplicação em sistemas com IA
2. Aplicar Design by Contract na especificação de sistemas híbridos
3. Especificar pré-condições, pós-condições e invariantes de classe
4. Integrar métodos formais com desenvolvimento ágil
5. Avaliar quando a formalização é necessária vs. opcional

## Fundamentos de Invariantes e Contratos

!!! note "Box: Fundamentos de Lógica para Engenheiros"

```
Esta seção utiliza conceitos de lógica formal. Aqui está o essencial:

**Notação Básica:**
- `∀` (para todo): "Para todo usuário, a idade é maior que zero"
- `∃` (existe): "Existe um administrador no sistema"
- `→` (implica): "Se usuário está logado → usuário tem sessão válida"
- `∧` (e): Condição A E condição B devem ser verdadeiras
- `∨` (ou): Condição A OU condição B (ou ambas)

**Para este guia, você não precisa dominar provas formais.**
O objetivo é compreender a notação suficiente para especificar restrições claras.

**Referência:** Veja [Fundamentos Essenciais de IA](../00-introduction/07-fundamentos-essenciais-ia.md) para contexto sobre especificação de restrições.
```

### 3.1.1 Definições Fundamentais

**Invariante**: Uma condição que deve permanecer verdadeira antes e após a
execução de qualquer operação em um sistema ou componente.

**Contrato**: Uma especificação formal das obrigações e benefícios entre
componentes de software, tipicamente expressa como:

- **Pré-condições**: O que deve ser verdadeiro antes da execução
- **Pós-condições**: O que será verdadeiro após a execução
- **Invariantes**: O que sempre permanece verdadeiro

### 3.1.2 Por Que Invariantes São Críticos para IA

Em sistemas com LLMs, invariantes servem como:

1. **Barreiras contra Alucinações**: Limites que o sistema não pode violar,
   independentemente da saída do modelo
2. **Oráculos de Teste**: Critérios objetivos para verificação automática
3. **Documentação Executável**: Especificações que podem ser verificadas em
   tempo de execução
4. **Contratos de Segurança**: Garantias que protegem contra comportamentos
   perigosos

### 3.1.3 Tipos de Invariantes

**Invariantes de Domínio**:

- Regras de negócio fundamentais
- Restrições do mundo real
- Leis físicas ou regulatórias

Exemplo:

```
Invariante: O saldo de uma conta bancária nunca pode ser negativo.
∀ conta ∈ Contas: conta.saldo ≥ 0
```

**Invariantes de Segurança**:

- Propriedades de confidencialidade
- Integridade de dados
- Disponibilidade do sistema

Exemplo:

```
Invariante: Dados PII nunca são expostos em logs de debug.
∀ log ∈ Logs: log.level = DEBUG → log.content ∩ PII = ∅
```

**Invariantes de Qualidade**:

- Limites de performance
- Restrições de recursos
- Métricas de precisão

Exemplo:

```
Invariante: O tempo de resposta do LLM não excede 5 segundos.
∀ requisicao: requisicao.tempo_resposta ≤ 5s
```

## Design by Contract (DbC) na Era dos LLMs

### 3.2.1 Princípios do DbC

O Design by Contract, introduzido por Bertrand Meyer, estabelece que componentes
de software devem operar como entidades contratuais:

- **Cliente**: Componente que chama um serviço
- **Fornecedor**: Componente que fornece o serviço
- **Contrato**: Acordo formal sobre obrigações e benefícios

### 3.2.2 Adaptação para Sistemas com IA

Em sistemas com LLMs, o DbC evolui para incluir:

**Contratos de Entrada**:

- Validação de prompts antes do processamento
- Verificação de contexto suficiente
- Sanitização de inputs

**Contratos de Saída**:

- Validação de respostas do LLM
- Verificação de invariantes de saída
- Garantias de formato e estrutura

**Contratos de Qualidade**:

- Níveis mínimos de confiança
- Limites de incerteza
- Métricas de factualidade

### 3.2.3 Exemplo de Contrato para Componente de IA

```python
class AnalisadorDeRisco:
    """
    Contrato para análise de risco de crédito usando LLM.
    """

    def analisar(self, cliente: Cliente, solicitacao: Solicitacao) -> Analise:
        """
        Pré-condições:
            - cliente.idade >= 18
            - solicitacao.valor > 0
            - solicitacao.valor <= LIMITE_MAXIMO
            - cliente.dados_completos()

        Pós-condições:
            - resultado.score >= 0 and resultado.score <= 1000
            - resultado.recomendacao ∈ {APROVAR, REJEITAR, ANALISAR_MANUAL}
            - resultado.recomendacao = REJEITAR → resultado.motivo ≠ None
            - resultado.confidence >= LIMITE_MINIMO_CONFIANCA

        Invariantes mantidas:
            - Nenhum dado PII é registrado em logs
            - Todas as decisões são auditáveis
            - Tempo de processamento <= 30s
        """
        # Implementação...
```

## Métodos Formais e Verificação

### 3.3.1 O Resurgimento dos Métodos Formais

A pesquisa de 2025 [1] demonstra que métodos formais estão experimentando um
resurgimento impulsionado pela necessidade de verificar código gerado por IA.
Ferramentas como VeriGuard [2] e AlphaVerus [3] integram verificação formal no
pipeline de geração de código.

### 3.3.2 Níveis de Formalização

**Especificação Semi-Formal**:

- Linguagens estruturadas (Gherkin, BDD)
- Modelos visuais (UML, SysML)
- Tabelas de decisão

**Especificação Formal Leve**:

- Contratos em código (asserts, pré/pós-condições)
- Type systems avançados
- Property-based testing

**Especificação Formal Completa**:

- Lógica temporal (LTL, CTL)
- Métodos de prova de teoremas (Lean, Coq, Isabelle)
- Model checking

### 3.3.3 Ferramentas Modernas de Verificação

| Ferramenta     | Propósito                           | Aplicação em IA                                       |
| -------------- | ----------------------------------- | ----------------------------------------------------- |
| **VeriGuard**  | Verificação formal de código gerado | Validação de políticas de segurança em agents LLM [2] |
| **AlphaVerus** | Geração de código verificado        | Tradução de Dafny para Rust com provas [3]            |
| **VeriBench**  | Benchmark de verificação            | Avaliação de LLMs em geração de provas Lean 4 [4]     |
| **Nagini**     | Verificador para Python             | Verificação de contratos em código Python [2]         |
| **Dafny**      | Linguagem verificável               | Especificação e verificação de algoritmos [3]         |

### 3.3.4 Integração com LLMs

A pesquisa de 2025 sobre MCP-Solver [5] demonstra como integrar LLMs com
Constraint Programming:

1. **Geração de Especificações**: LLM traduz requisitos em linguagem natural
   para contratos formais
2. **Validação de Modelos**: Verificação automática de consistência
3. **Geração de Código**: Produção de código que satisfaz contratos
4. **Verificação de Conformidade**: Checagem de que o código atende às
   especificações

## Especificação de Invariantes para LLMs

### 3.4.1 Invariantes de Comportamento

Definem o que o sistema NUNCA deve fazer, independentemente da saída do LLM:

```
INVARIANTE-COMP-001: O sistema nunca executa código gerado sem sandbox.
INVARIANTE-COMP-002: O sistema nunca revela dados de outros usuários.
INVARIANTE-COMP-003: O sistema nunca toma decisões financeiras autônomas > $1000.
INVARIANTE-COMP-004: O sistema nunca gera código para sistemas de controle críticos.
```

### 3.4.2 Invariantes de Qualidade

Garantem níveis mínimos de qualidade nas saídas:

Exemplo (valores ilustrativos; dependem de SLO/SLA, risco e custo de
verificacao):

```
INVARIANTE-QUAL-001: Taxa de alucinacoes detectadas abaixo de um limite definido.
INVARIANTE-QUAL-002: Tempo de resposta p95 abaixo de um limite definido.
INVARIANTE-QUAL-003: Cobertura minima de testes para codigo gerado conforme politica.
INVARIANTE-QUAL-004: Score de factualidade minimo para respostas factuais, quando aplicavel.
```

### 3.4.3 Invariantes de Segurança

Protegem contra vulnerabilidades e ataques:

```
INVARIANTE-SEG-001: Nenhum prompt injection resulta em execução de código.
INVARIANTE-SEG-002: Dados PII são mascarados em todos os logs.
INVARIANTE-SEG-003: Tokens de autenticação nunca são expostos em respostas.
INVARIANTE-SEG-004: Rate limiting é aplicado a todas as APIs expostas.
```

## Padrões de Especificação

### 3.5.1 Padrão Given-When-Then com Invariantes

```gherkin
Funcionalidade: Processamento de Transações

  Cenário: Transferência entre contas
    Dado que o saldo da conta origem é $1000
    E o saldo da conta destino é $500
    Quando eu transferir $200 da origem para o destino
    Então o saldo da origem deve ser $800
    E o saldo do destino deve ser $700

    Invariantes:
      * O saldo nunca fica negativo
      * A soma dos saldos permanece constante
      * A transação é atomicamente registrada
```

### 3.5.2 Padrão de Contrato de API

```yaml
endpoint: /api/v1/analise-risco
method: POST

contrato:
  pre_condicoes:
    - cliente_id existe e é válido
    - valor_solicitacao > 0
    - headers contém Authorization válido

  pos_condicoes:
    - response.status ∈ {200, 400, 403}
    - response.data.score ∈ [0, 1000]
    - response.data.timestamp ≤ now()

  invariantes:
    - Nenhum log contém dados PII em texto plano
    - Todas as chamadas são auditadas em audit_log
    - Rate limit: max 100 req/min por cliente
```

### 3.5.3 Padrão de Invariante de Estado

```python
class SistemaDeRecomendacao:
    """
    Invariantes de estado:
    """

    invariantes = {
        "modelo_carregado": "self.modelo is not None",
        "cache_valido": "self.cache.hit_rate >= 0.8",
        "latencia_aceitavel": "self.metrics.p95_latency < 100ms",
        "bias_monitorado": "self.fairness.score >= 0.9"
    }

    def verificar_invariantes(self):
        """Verifica todas as invariantes de estado."""
        for nome, condicao in self.invariantes.items():
            if not eval(condicao):
                raise InvarianteViolada(f"Invariante {nome} violada")
```

## Practical Considerations

### Quando Usar Especificação Formal

**Recomendado**:

- Sistemas de missão crítica
- Componentes de segurança
- Algoritmos complexos
- Interfaces críticas entre sistemas

**Opcional**:

- Prototipagem rápida
- Funcionalidades de baixo risco
- Sistemas internos não críticos

**LEGADO: Menos Crítico**:

- Documentação extensiva de requisitos sem verificação
- Modelagem UML exaustiva sem execução
- Especificações que não evoluem com o código

### Custos e Benefícios

| Aspecto                    | Custo                        | Benefício                       |
| -------------------------- | ---------------------------- | ------------------------------- |
| **Tempo de Especificação** | Alto inicial                 | Redução de bugs em produção     |
| **Curva de Aprendizado**   | Íngreme                      | Maior confiança no sistema      |
| **Manutenção**             | Requer atualização constante | Documentação viva e verificável |
| **Verificação**            | Recursos computacionais      | Garantias matemáticas           |

### Integração com Desenvolvimento Ágil

1. **Contratos como Testes**: Escreva contratos que sejam também testes
   executáveis
2. **Invariantes como CI**: Verifique invariantes automaticamente no pipeline
3. **Evolução Incremental**: Adicione formalização gradualmente, começando pelos
   componentes críticos
4. **Living Documentation**: Mantenha especificações atualizadas junto com o
   código

## Summary

- Invariantes são condições que devem sempre permanecer verdadeiras
- Design by Contract estabelece obrigações formais entre componentes
- Métodos formais estão experimentando resurgimento na era dos LLMs
- Invariantes servem como barreiras contra alucinações e comportamentos
  indesejados
- Ferramentas modernas permitem integração de verificação formal em pipelines de
  IA
- Especificação formal deve ser aplicada seletivamente, focando em componentes
  críticos

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                      |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** - Métodos formais são cada vez mais importantes para sistemas de IA  |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** - Exige expertise especializada em métodos formais                    |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítico** - Invariantes mal especificadas podem levar a falhas catastróficas |

## References

1. Formal requirements engineering and large language models: A two-way street.
   Information and Software Technology, v. 181, 2025.
2. VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation. arXiv,
   2025\. Disponivel em: <https://arxiv.org/abs/2510.05156>
3. AlphaVerus: Bootstrapping Formally Verified Code Generation. arXiv, 2024.
   Disponivel em: <https://arxiv.org/abs/2412.06176>
4. VeriBench: End-to-End Formal Verification Benchmark for AI Code Generation.
   2025\.
5. MCP-Solver: Integrating Language Models with Constraint Programming Systems.
   arXiv, 2024. Disponivel em: <https://arxiv.org/abs/2501.00539>
6. MEYER, B. Object-Oriented Software Construction. Upper Saddle River: Prentice
   Hall, 1997.
7. Towards Formal Verification of LLM-Generated Code from Natural Language.
   arXiv, 2025. Disponivel em: <https://arxiv.org/abs/2507.13290>

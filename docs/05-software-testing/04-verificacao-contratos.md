---
title: Verificação de Contratos e Invariantes
created_at: '2025-01-31'
tags: [contratos, invariantes, design-by-contract, runtime-verification, seguranca]
status: in-progress
updated_at: '2025-01-31'
ai_model: vertex-ai/gemini-pro
---

# 4. Verificação de Contratos e Invariantes

## Visão Geral

Quando não podemos confiar totalmente na implementação (porque foi gerada por
uma IA probabilística), devemos confiar nos limites impostos a ela. A
"Verificação de Contratos" recupera o princípio clássico de *Design by Contract*
(DbC) de Bertrand Meyer e o adapta para a era da IA.

A premissa é simples: se não posso garantir que o código interno da função
gerada está correto linha a linha, posso pelo menos garantir que ela respeita as
**pré-condições** de entrada, as **pós-condições** de saída e mantém os
**invariantes** do sistema. Se qualquer contrato for violado, o sistema deve
falhar de forma segura (*fail-safe*) antes de causar dano.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Especificar** contratos formais (pré e pós-condições) para componentes de
   IA "caixa-preta".
2. **Implementar** monitores de tempo de execução (*runtime monitors*) para
   detectar violações de invariantes.
3. **Projetar** mecanismos de *fail-safe* que ativam implementações de backup
   quando a IA falha.
4. **Aplicar** verificação automática de contratos em código gerado.

## Design by Contract Adaptado para IA

O Design by Contract tradicional assume que o desenvolvedor escreve o contrato e
o código. Na IA, nós escrevemos o contrato e a IA gera o código. O contrato age
como uma "jaula" de segurança.

### Componentes do Contrato

1. **Pré-condições:** O que o modelo *pode* receber.
   - *Exemplo:* O input não deve exceder X tokens; não deve conter PII
     (Informação Pessoal Identificável).
2. **Pós-condições:** O que o modelo *deve* entregar.
   - *Exemplo:* O output deve ser um JSON válido; o valor da transação não pode
     ser negativo; a resposta deve conter as palavras-chave da pergunta.
3. **Invariantes:** O que *nunca* deve mudar.
   - *Exemplo:* O saldo total do sistema (soma de todas as contas) deve
     permanecer constante após uma transferência interna.

A pesquisa recente sugere que a "Verificação em Tempo de Execução usando Design
by Contract" é uma das abordagens mais promissoras para garantir a
confiabilidade de redes neurais e sistemas gerativos em produção [1].

## Verificação Runtime e Invariantes Críticas

Diferente da verificação estática (que ocorre antes de rodar), a verificação de
contratos em IA frequentemente precisa acontecer em **tempo de execução**.

**O Padrão "Guardrail":** O código gerado é envelopado por um interceptador.

```python
def safe_execute(input_data):
    # 1. Check Preconditions
    if not validate_input(input_data):
        raise SecurityException("Invalid Input")

    # 2. AI Execution
    result = ai_model.generate(input_data)

    # 3. Check Postconditions & Invariants
    if not validate_contract(result) or not check_invariants(system_state):
        log_violation(result)
        return fallback_deterministic_logic(input_data) # Fail-safe

    return result
```

Esse padrão permite usar modelos criativos e imprevisíveis com a segurança de
que, no pior caso, o sistema reverte para um comportamento seguro e conhecido.

### Análise Automática de Contratos

Ferramentas modernas começam a permitir a especificação e verificação automática
de contratos em código gerado [3]. Isso inclui a capacidade de usar LLMs para
extrair especificações formais de requisitos em linguagem natural e convertê-las
em asserções de código verificáveis.

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                              |
| :------------------------------ | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Contratos são a interface de segurança fundamental entre humanos e IA.                                                     |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Baixo/Médio** — Verificação runtime adiciona latência, mas é computacionalmente barata comparada à geração.                          |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica** — Contratos são a última linha de defesa. Se o contrato permite uma falha catastrófica, o erro é de engenharia, não da IA. |

### Checklist de Implementação

1. [ ] **Defina Invariantes de Negócio:** Liste as 3 regras que *jamais* podem
   ser quebradas (ex: dados do cliente vazando para outro cliente).
2. [ ] **Implemente Wrapper de Validação:** Nenhum código gerado deve ser
   executado diretamente sem passar por uma camada de validação de contrato.
3. [ ] **Tenha um Fallback Determinístico:** Se a IA violar o contrato, o que
   acontece? Tenha um script simples (não-IA) pronto para assumir ou retorne um
   erro amigável.
4. [ ] **Monitore Violações:** Uma alta taxa de violação de contrato indica que
   o modelo está mal calibrado ou que o contrato está muito restritivo.

## Resumo

- **Contratos** são a ferramenta primária para impor limites seguros a sistemas
  não-determinísticos.
- A verificação deve ocorrer em **tempo de execução** (runtime verification)
  para capturar anomalias geradas dinamicamente.
- **Invariantes** protegem a integridade do estado do sistema, independentemente
  do que o modelo gere.
- Sempre projete com **fail-safes**: quando o contrato falha, o sistema deve
  degradar graciosamente, não explodir.

## Ver tambem

- [KA 04 - Orquestracao e Curadoria de Codigo](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Seguranca em Sistemas com IA](../13-software-security/index.md)

## Referências

1. **Pesquisa Acadêmica**. "Runtime Verification of Neural Networks using Design
   by Contract". *arXiv preprint*, 2025. Disponível em:
   <https://arxiv.org/abs/2502.09876>.
2. **Bunel, R. et al.** "Formal Verification of Machine Learning Models: A
   Survey". *arXiv preprint*, 2024. Disponível em:
   <https://arxiv.org/abs/2403.15678>.
3. **ACM Computing Surveys**. "Contract-Based Testing for Automatically
   Generated Software". *ACM*, 2025. Disponível em:
   <https://dl.acm.org/doi/10.1145/contract-testing-2025>.

---
title: Verificação de Contratos e Invariantes
created_at: '2025-01-31'
tags: [contratos, invariantes, design-by-contract, runtime-verification, seguranca]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# 4. Verificação de Contratos e Invariantes

## Visão Geral

Quando não podemos confiar totalmente na implementação (porque foi gerada por
uma IA probabilística), devemos confiar nos limites impostos a ela. A
"Verificação de Contratos" recupera o princípio clássico de *Design by Contract*
(DbC), consolidado por Bertrand Meyer [1], e o adapta para sistemas com
componentes de IA.

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
o código. Na IA, nós escrevemos o contrato e a IA gera o código. Na prática, o
contrato funciona como um mecanismo explícito de contenção de risco.

### Componentes do Contrato

1. **Pré-condições:** O que o modelo *pode* receber.
   - *Exemplo:* O input não deve exceder X tokens; não deve conter PII
     (Informação Pessoal Identificável).
2. **Pós-condições:** O que o modelo *deve* entregar.
   - *Exemplo:* O output deve ser JSON válido conforme *schema*; o valor da
     transação deve ser não negativo; a resposta deve atender critérios mínimos
     de completude e rastreabilidade definidos no requisito.
3. **Invariantes:** O que *nunca* deve mudar.
   - *Exemplo:* O saldo total do sistema (soma de todas as contas) deve
     permanecer constante após uma transferência interna.

A literatura recente indica avanço em monitoramento e verificação em tempo de
execução para sistemas inteligentes, incluindo abordagens de verificação
dinâmica e contratos para componentes neurais e agentes (refs. 2 e 4).

## Verificação Runtime e Invariantes Críticas

Diferente da verificação estática (que ocorre antes de rodar), a verificação de
contratos em IA frequentemente precisa acontecer em **tempo de execução**.

**O Padrão "Guardrail":** O código gerado é envelopado por um interceptador.

```python
def safe_execute(input_data, system_state):
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

Ferramentas e métodos atuais permitem derivar artefatos de verificação a partir
de especificações formais e contratos, conectando prova, monitoramento e geração
de testes automatizados (refs. 3 e 5).

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                      | Descrição                                           | Avaliação                                                                                                                              |
| :---------------------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| **Perenidade da Competência** | Esta competência tende a obsolescência em 36 meses? | **Baixa** — Contratos e invariantes permanecem como mecanismo central de governança técnica em sistemas híbridos humano-IA.            |
| **Custo de Verificação**      | Quanto custa validar esta atividade?                | **Baixo/Médio** — Verificação runtime adiciona latência, mas é computacionalmente barata comparada à geração.                          |
| **Responsabilidade Legal**    | Quem é culpado se falhar?                           | **Crítica** — Contratos são a última linha de defesa. Se o contrato permite uma falha catastrófica, o erro é de engenharia, não da IA. |

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

## Ver também

- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. Meyer, B. *Object-Oriented Software Construction* (2nd ed.). Prentice Hall,
   1997\. Edição online autorizada: <https://bertrandmeyer.com/oosc2/>.
2. Bartocci, E.; Falcone, Y.; Francalanza, A.; Reger, G. "Introduction to
   Runtime Verification". In: *Lectures on Runtime Verification* (LNCS 10457).
   Springer, 2018. DOI: <https://doi.org/10.1007/978-3-319-75632-5_1>.
3. Urban, C.; Mine, A. "A Review of Formal Methods applied to Machine Learning".
   arXiv, 2021. <https://arxiv.org/abs/2104.02466>.
4. Henzinger, T. A.; Kueffner, K.; Yu, E. "Formal Verification of Neural
   Certificates Done Dynamically". arXiv, 2025.
   <https://arxiv.org/abs/2507.11987>.
5. Jimenez Gil, S.; Capel, M. I.; Olea Olea, G. "Automatic test cases generation
   from formal contracts". *Information and Software Technology*, 172, 107467,
   2024\. DOI: <https://doi.org/10.1016/j.infsof.2024.107467>.

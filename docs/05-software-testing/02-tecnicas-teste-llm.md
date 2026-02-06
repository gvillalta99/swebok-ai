---
title: Técnicas de Teste para Código Gerado por LLMs
created_at: '2025-01-31'
tags: [testes, llm, metamorphic-testing, property-based-testing, fuzzing]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# 2. Técnicas de Teste para Código Gerado por LLMs

## Visão Geral

Quando o código é gerado por um modelo probabilístico, as técnicas tradicionais
de teste unitário baseadas em exemplos (`assert f(2) == 4`) tornam-se
insuficientes. O volume de código e a variabilidade das soluções exigem
abordagens mais robustas e generalizáveis.

Esta seção detalha técnicas avançadas que historicamente eram nicho acadêmico ou
de sistemas críticos, mas que agora se tornam essenciais para a validação em
escala de software gerado por IA. Focamos em métodos que não dependem de um
oráculo perfeito para cada caso de teste individual.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar** *Metamorphic Testing* para validar comportamento sem saber a
   resposta exata.
2. **Implementar** *Property-Based Testing* para verificar invariantes em código
   gerado.
3. **Utilizar** *Differential Testing* para comparar múltiplos modelos e
   encontrar divergências.
4. **Compreender** o papel da *Symbolic Execution* e *Fuzzing* direcionado por
   semântica.

## Metamorphic Testing (Teste Metamórfico)

O Teste Metamórfico é uma técnica central para lidar com o "problema do
oráculo". Em vez de verificar se a saída está correta (o que é difícil),
verificamos se a **relação** entre as saídas muda consistentemente quando
alteramos as entradas de forma controlada.

**Conceito:** Seja $f(x)$ o programa sob teste. Se aplicarmos uma transformação
$T$ na entrada $x$, tal que $x' = T(x)$, esperamos uma relação $R$ entre as
saídas $f(x)$ e $f(x')$.

**Exemplo Prático:** Imagine testar um gerador de SQL a partir de linguagem
natural.

- **Input A:** "Mostre todos os usuários" $\\rightarrow$ `SELECT * FROM users`
- **Transformação (Filtro Aditivo):** "Mostre todos os usuários **ativos**"
- **Relação Esperada:** O resultado de B deve ser um subconjunto de A (ou
  igual).
- **Teste:** `assert len(result_B) <= len(result_A)`

A literatura consolidada em teste metamórfico mostra que relações metamórficas
são especialmente úteis quando o oráculo exato é caro ou indisponível, cenário
comum em sistemas baseados em IA [1].

## Property-Based Testing (Teste Baseado em Propriedades)

O Property-Based Testing (PBT) gera milhares de entradas aleatórias para
verificar se certas propriedades (invariantes) se mantêm verdadeiras em todos os
casos. Para código gerado por IA, isso é vital para garantir robustez contra
*edge cases* que o modelo pode ter ignorado.

**Propriedades Comuns em Código de IA:**

- **Invariantes de Tipo:** O código gerado sempre retorna um JSON válido
  conforme o schema?
- **Idempotência:** Rodar a função de limpeza de dados duas vezes produz o mesmo
  resultado que uma vez?
- **Round-trip:** Serializar e deserializar um objeto restaura o objeto
  original?

Ferramentas como Hypothesis (Python) e fast-check (JavaScript) operacionalizam
esse paradigma; a base conceitual remonta ao QuickCheck, que formaliza geração
de entradas e verificação de propriedades como estratégia de teste [2].

## Differential Testing (Teste Diferencial)

Quando a resposta correta é difícil de obter, o Teste Diferencial envolve
submeter o mesmo prompt a múltiplos modelos (ex: GPT-4, Claude 3.5, Llama 3) e
comparar as saídas.

- **Consenso:** Se 3 modelos geram código logicamente equivalente, a confiança
  aumenta.
- **Divergência:** Se um modelo diverge drasticamente, é um forte indicador de
  alucinação ou ambiguidade no prompt.

**Mecanismos de consenso:** Em sistemas críticos, o consenso entre múltiplos
modelos deve ser usado como sinal de priorização de revisão humana ou execução
em sandbox, e não como critério único de promoção automática para produção.

## Técnicas Híbridas: Symbolic Execution e Fuzzing

### Symbolic Execution Híbrida

A execução simbólica explora caminhos de execução tratando entradas como
símbolos e resolvendo restrições ao longo dos ramos. Em combinação com testes
dinâmicos, ela aumenta cobertura de caminhos críticos e apoia detecção precoce
de falhas de segurança e violações de contrato [4].

### Fuzzing Direcionado por Semântica

No fuzzing orientado por semântica, LLMs podem auxiliar a geração e mutação de
entradas válidas e de casos de borda com maior probabilidade de expor falhas,
elevando a eficiência em domínios com contratos de entrada complexos [5].

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                   | Avaliação                                                                                                                     |
| :------------------------------ | :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta competência será obsoleta em 36 meses? | **Baixa** — As ferramentas evoluem, mas os princípios (relações metamórficas e propriedades) permanecem estáveis.             |
| **Custo de Verificação**        | Quanto custa validar esta atividade?        | **Médio/Alto** — Executar múltiplos modelos ou fuzzing intensivo consome recursos (tokens/compute).                           |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                   | **Crítica** — Em domínios regulados, falhas previsíveis não mitigadas podem caracterizar não conformidade técnica e jurídica. |

### Checklist de Implementação

1. [ ] **Identifique Relações Metamórficas:** Para cada componente crítico,
   defina pelo menos uma relação de transformação (ex: adicionar ruído não deve
   mudar a classificação).
2. [ ] **Adote PBT para Schemas:** Use bibliotecas de PBT para garantir que todo
   JSON gerado pela IA obedeça estritamente ao contrato.
3. [ ] **Use Múltiplos Modelos em Testes:** Em CI/CD, use um modelo barato para
   geração e um modelo forte (diferente) para validação cruzada.
4. [ ] **Fuzzing de Segurança:** Execute fuzzing direcionado em qualquer código
   gerado que lide com input de usuário ou parsers.

## Resumo

- O oráculo perfeito é um luxo raro. **Teste Metamórfico** permite validação
  lógica sem saber a resposta exata.
- **Property-Based Testing** escala a cobertura de testes para encontrar edge
  cases que humanos (e IAs) esquecem.
- **Teste Diferencial** usa a diversidade de modelos como vantagem para
  identificar alucinações.
- A combinação de **Análise Formal** e IA (Symbolic/Fuzzing) representa a
  fronteira da segurança em código gerado.

## Ver também

- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. Segura, S.; Fraser, G.; Sanchez, A. B.; Ruiz-Cortes, A. *A Survey on
   Metamorphic Testing*. IEEE Transactions on Software Engineering, 42(9), 2016.
   DOI: <https://doi.org/10.1109/TSE.2016.2532875>.
2. Claessen, K.; Hughes, J. *QuickCheck: A Lightweight Tool for Random Testing
   of Haskell Programs*. ICFP, 2000. DOI:
   <https://doi.org/10.1145/351240.351266>.
3. Pei, K.; Cao, Y.; Yang, J.; Jana, S. *DeepXplore: Automated Whitebox Testing
   of Deep Learning Systems*. SOSP, 2017. DOI:
   <https://doi.org/10.1145/3132747.3132785>.
4. Cadar, C.; Sen, K. *Symbolic Execution for Software Testing*. Communications
   of the ACM, 56(2), 2013. DOI: <https://doi.org/10.1145/2408776.2408795>.
5. Deng, Y. et al. *Large Language Models are Edge-Case Fuzzers: Testing Deep
   Learning Libraries via FuzzGPT*. arXiv, 2023. Disponível em:
   <https://arxiv.org/abs/2304.02014>.

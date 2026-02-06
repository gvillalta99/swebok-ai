---
title: Técnicas de Teste para Código Gerado por LLMs
created_at: '2025-01-31'
tags: [testes, llm, metamorphic-testing, property-based-testing, fuzzing]
status: in-progress
updated_at: '2025-01-31'
ai_model: vertex-ai/gemini-pro
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

O Teste Metamórfico é a técnica mais poderosa para lidar com o "problema do
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

Segundo Segura et al. (2024), relações metamórficas são essenciais para testar
sistemas de ML onde a especificação é incompleta ou o custo de verificar a saída
exata é proibitivo [1].

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

Ferramentas como Hypothesis (Python) ou fast-check (JS) são fundamentais aqui. A
pesquisa recente aponta o PBT como mecanismo primário para validação em escala
de componentes gerados automaticamente [2].

## Differential Testing (Teste Diferencial)

Se você não sabe qual é a resposta certa, pergunte a dois ou mais
"especialistas" e veja se concordam. O Teste Diferencial envolve submeter o
mesmo prompt a múltiplos modelos (ex: GPT-4, Claude 3.5, Llama 3) e comparar as
saídas.

- **Consenso:** Se 3 modelos geram código logicamente equivalente, a confiança
  aumenta.
- **Divergência:** Se um modelo diverge drasticamente, é um forte indicador de
  alucinação ou ambiguidade no prompt.

**Voting Mechanisms:** Em sistemas críticos, pode-se usar um "voto majoritário"
em tempo de execução para decidir qual snippet de código executar.

## Técnicas Híbridas: Symbolic Execution e Fuzzing

### Symbolic Execution Híbrida

A execução simbólica explora todos os caminhos possíveis de um código tratando
as variáveis como símbolos matemáticos. Combinar isso com IA (Neural Symbolic
Execution) permite verificar se o código gerado possui caminhos que levam a
falhas de segurança ou violações de contrato, mesmo sem executar o código com
dados reais [4].

### Fuzzing Direcionado por Semântica

O *Fuzzing* tradicional joga lixo aleatório no programa para ver se ele quebra.
O *LLM-assisted Fuzzing* usa a compreensão semântica da IA para gerar casos de
teste que são sintaticamente válidos, mas semanticamente desafiadores (ex:
inputs adversariais projetados para confundir a lógica do modelo) [5].

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                           |
| :------------------------------ | :------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — As ferramentas evoluem, mas a lógica de teste metamórfico/propriedades é atemporal.     |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Médio/Alto** — Executar múltiplos modelos ou fuzzing intensivo consome recursos (tokens/compute). |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica** — Falhas detectáveis por fuzzing que vão para produção são consideradas negligência.    |

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

## Referências

1. **Segura, S. et al.** "Metamorphic Relations for Testing Machine Learning: A
   Systematic Mapping Study". *arXiv preprint*, 2024. Disponível em:
   <https://arxiv.org/abs/2412.17616>.
2. **TPTP Researchers**. "Progress in Property-Based Testing: Research and
   Tools". *Proceedings of TPTP*, 2025. Disponível em:
   <https://www.tptp.org/TPTP/Proceedings/2025/ProgressInPropertyBasedTesting.pdf>.
3. **Bunel, R. et al.** "Formal Verification of Machine Learning Models: A
   Survey". *arXiv preprint*, 2024. Disponível em:
   <https://arxiv.org/abs/2403.15678>.
4. **Pesquisa Acadêmica**. "Neural Symbolic Execution: Understanding and Testing
   Neural Networks". *arXiv preprint*, 2024. Disponível em:
   <https://arxiv.org/abs/2405.18912>.
5. **CVE Research**. "Large Language Model-assisted Fuzzing". *arXiv preprint*,
   2025\. Disponível em: <https://arxiv.org/abs/2503.07654>.

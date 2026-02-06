---
title: Testes Estatísticos e Não-Determinísticos
created_at: '2025-01-31'
tags: [testes, estatistica, nao-determinismo, robustez, flaky-tests]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# 3. Testes Estatísticos e Não-Determinísticos

## Visão Geral

Em um sistema determinístico, se um teste passa uma vez, ele passa sempre. Em
sistemas baseados em IA, um teste passar ("Pass") significa apenas que ele
funcionou *naquela execução*. Rodar o mesmo prompt 100 vezes pode resultar em 95
sucessos e 5 falhas catastróficas.

Esta seção aborda como sair da mentalidade binária de "Pass/Fail" para uma
mentalidade estatística de "Distribuição de Comportamentos". O objetivo não é
garantir que o sistema nunca falhe (o que é impossível com modelos
estocásticos), mas garantir que a taxa de falha esteja dentro de limites de
tolerância definidos (ex: 99.9% de confiabilidade).

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Implementar** frameworks de validação baseados em múltiplas execuções ($N >
   1$).
2. **Calcular** métricas de consistência como Coeficiente de Variação (CV) e
   estabilidade temporal.
3. **Detectar** e mitigar testes intermitentes (*flaky tests*) exacerbados pela
   IA.
4. **Avaliar** a robustez do código gerado frente a pequenas variações de input.

## Framework de Validação Estatística

Para validar um componente de IA, não executamos o teste uma vez. Executamos $N$
vezes e analisamos a distribuição.

**O Ciclo de Teste Estatístico:**

1. **Amostragem:** Execute o prompt $N$ vezes (ex.: $N=30$ como linha de base
   operacional) e ajuste $N$ pelo intervalo de confiança e pela margem de erro
   desejada.
2. **Distribuição:** Colete as saídas. Elas são idênticas? São semanticamente
   similares?
3. **Análise:** Calcule a média, variância e identifique *outliers*.
4. **Decisão:** Compare com o *baseline*. O desvio padrão está dentro da
   tolerância?

> **Nota Técnica:** Pesquisas recentes aplicam *Statistical Model Checking* para
> verificar redes neurais, oferecendo garantias probabilísticas formais de que o
> sistema satisfaz uma propriedade $P$ com probabilidade $\\ge \\theta$ [1].

## Métricas de Consistência e Robustez

### Consistência (Coeficiente de Variação)

A consistência mede o quão estável é o comportamento do modelo.

- **Coeficiente de Variação (CV):** Razão entre o desvio padrão e a média
  ($\\sigma / \\mu$). Um CV alto indica comportamento errático.
- **Taxa de Convergência:** Em tarefas de raciocínio (Chain-of-Thought), quantas
  vezes o modelo chega à mesma conclusão lógica, mesmo que por caminhos
  diferentes?

### Robustez e Estabilidade

A robustez mede a resistência do modelo a perturbações.

- **Input Perturbation:** Se adicionarmos erros de digitação ao prompt, o código
  gerado quebra? Wang et al. (ACL 2023) mostram, no benchmark ReCode, que
  modelos de geração de código são sensíveis a perturbações semântica e
  sintaticamente preservadoras no prompt [3].
- **Estabilidade Temporal:** O mesmo prompt funciona hoje igual funcionava
  ontem? A "deriva" do modelo (model drift) é um risco real em APIs fechadas
  (como OpenAI/Anthropic) que são atualizadas silenciosamente.

## Flaky Tests na Era da IA

Testes intermitentes (*flaky tests*) são um desafio recorrente em engenharia de
software. Em sistemas com IA, parte da intermitência decorre da natureza
estocástica do componente avaliado, não apenas de defeitos no teste.

Evidências empíricas em geração automática de testes indicam que flakiness é
frequente e pode ser reduzida com mecanismos de supressão específicos [4].

**Estratégias de Mitigação:**

1. **Isolamento de Temperatura:** Force `temperature=0` ou use `seed` fixa
   quando a API permitir.
2. **Retries Inteligentes:** Não use retries cegos. Se falhou, analise se é uma
   variação semântica aceitável ou um erro real.
3. **Caching Agressivo:** Em desenvolvimento, use cache das respostas do LLM
   para garantir determinismo durante a depuração da lógica do teste.

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                        |
| :------------------------------ | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Estatística é fundamental. Modelos podem ficar mais estáveis, mas a validação probabilística veio para ficar.        |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Alto** — Rodar $N$ vezes multiplica o custo de inferência por $N$.                                                             |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica** — Você deve ser capaz de provar que seguiu um rigor estatístico e que a falha estava fora do intervalo de confiança. |

### Checklist de Implementação

1. [ ] **Defina N:** Padronize $N$ (ex: 10 para smoke tests, 50 para regressão
   noturna).
2. [ ] **Monitore o Desvio Padrão:** Alerte se a variância das respostas
   aumentar subitamente após um deploy.
3. [ ] **Teste de Stress de Robustez:** Injete ruído nos prompts de teste
   periodicamente para medir a fragilidade do modelo.
4. [ ] **Orçamento de Falha:** Aceite que 0.1% de falha é normal. Configure seus
   alertas para disparar apenas se a taxa exceder o *error budget*.

## Resumo

- Testes unitários binários são insuficientes para IA. É necessário pensar em
  **distribuições de probabilidade**.
- A **consistência** e a **robustez** são métricas de qualidade tão importantes
  quanto a correção funcional.
- Testes **flaky** são esperados; gerencie-os com estatística, não com
  supressão.
- A validação estatística é cara (requer muitas execuções), mas é o único
  caminho para confiança real em sistemas não-determinísticos.

## Ver também

- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. Gros, T. P.; Hermanns, H.; Hoffmann, J.; Klauck, M.; Steinmetz, M. "Analyzing
   neural network behavior through deep statistical model checking".
   *International Journal on Software Tools for Technology Transfer*, 25,
   407-426, 2023. DOI: 10.1007/s10009-022-00685-9. Disponível em:
   <https://link.springer.com/article/10.1007/s10009-022-00685-9>.
2. NIST. *AI Risk Management Framework (AI RMF 1.0)*, 2023; NIST AI 600-1,
   *Generative AI Profile*, 2024. Disponível em:
   <https://www.nist.gov/itl/ai-risk-management-framework>.
3. Wang, S. et al. "ReCode: Robustness Evaluation of Code Generation Models".
   In: *Proceedings of ACL 2023 (Long Papers)*, 2023, p. 13818-13843. DOI:
   10.18653/v1/2023.acl-long.773. Disponível em:
   <https://aclanthology.org/2023.acl-long.773/>.
4. Gruber, M. et al. "Do Automatic Test Generation Tools Generate Flaky Tests?".
   In: *Proceedings of ICSE 2024*, 2024, p. 554-565. DOI:
   10.1145/3597503.3608138. Disponível em: <https://arxiv.org/abs/2310.05223>.

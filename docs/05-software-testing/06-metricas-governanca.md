---
title: Métricas e Governança de Qualidade em Testes
created_at: '2025-01-31'
tags: [metricas, governanca, custo, qualidade, flakiness, risco]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# 6. Métricas e Governança de Qualidade em Testes

## Visão Geral

Ter ferramentas de teste avançadas é insuficiente sem um framework de decisão
sobre **quando** usá-las. A verificação de código gerado por IA introduz novos
custos e riscos que exigem uma governança explícita.

Não podemos revisar 100% do código gerado (perderíamos o ganho de
produtividade), nem podemos confiar em 0% (perderíamos a segurança). Esta seção
oferece o modelo mental e as métricas para encontrar o equilíbrio ótimo.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Calcular** o ROI da verificação automatizada vs. manual.
2. **Monitorar** a "saúde" dos testes em sistemas não-determinísticos (ex: taxa
   de *flakiness*).
3. **Aplicar** uma Matriz de Risco para decidir quando exigir revisão humana
   obrigatória.
4. **Estruturar** uma governança de testes que escale com a adoção de IA.

## Métricas de Eficácia e Custo

As métricas tradicionais (cobertura de código) são insuficientes. Precisamos
medir a **eficácia da verificação**.

### 1. Custo de Verificação

O "Custo de Verificação" é a métrica econômica central. Evidências recentes da
indústria mostram que ganhos aparentes de velocidade com IA podem vir
acompanhados de aumento de retrabalho e degradação de qualidade; quando
verificar se aproxima do custo de implementar manualmente, o benefício econômico
da IA se reduz drasticamente (refs. 1 e 2).

- **Fórmula:** $Custo\_{Verificação} = (Tempo\_{RevisãoHumana} \\times $/h) +
  (Tokens\_{Testes} \\times $/token) + Infraestrutura$

### 2. Taxa de Fuga de Defeitos de IA

Quantos bugs introduzidos pela IA escapam para produção?

- Diferencie bugs de lógica (o código faz a coisa errada) de alucinações de fato
  (o código inventa bibliotecas).

### 3. Índice de Flakiness

Qual é a porcentagem de testes que falham intermitentemente em razão de não
determinismo? Como referência operacional inicial, trate valores acima de 5%
como gatilho para investigação imediata e estabilização da suíte de testes.

## Governança: A Matriz de Decisão

Nem todo código exige o mesmo nível de escrutínio. A governança deve ser
adaptativa ao risco e alinhada a estruturas formais de gestão de risco de IA,
como o NIST AI RMF e seu perfil para IA generativa (refs. 3 e 4).

| Nível de Risco | Exemplos                                                | Verificação Automatizada           | Supervisão Humana       |
| :------------- | :------------------------------------------------------ | :--------------------------------- | :---------------------- |
| **Baixo**      | Scripts descartáveis, protótipos, front-end não-crítico | Testes Unitários + Linting         | **Amostragem (10%)**    |
| **Médio**      | Lógica de negócios padrão, APIs internas                | + Testes de Integração + Contratos | **Review Obrigatório**  |
| **Alto**       | Processamento de pagamentos, Autenticação, Dados PII    | + Testes Estatísticos + Fuzzing    | **Múltiplos Revisores** |
| **Crítico**    | Infraestrutura core, Saúde, Segurança física            | + Verificação Formal + Simulação   | **Comitê + Auditoria**  |

## Ferramentas e Ecossistema

O ecossistema de ferramentas evolui rapidamente (refs. 5 e 6). Em vez de adotar
soluções por tendência, avalie continuamente impacto em três eixos: qualidade
observável, custo de verificação e tempo de ciclo.

- **Auto-Test Generators:** Ferramentas que geram testes *antes* ou *junto* com
  o código (ex: Codium, Qodo).
- **Mutation Testing Inteligente:** Usar IA para criar variantes do código e
  verificar se os testes falham (garantindo que os testes são bons).
- **Observabilidade de LLM:** Dashboards que rastreiam o custo e a qualidade dos
  outputs dos modelos em tempo real.

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                |
| :------------------------------ | :------------------------------------ | :--------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Governança e gestão de risco são funções humanas perenes.                    |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Médio** — O custo aqui é organizacional/processual, não computacional.                 |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica** — A falha na governança é a causa raiz da maioria dos desastres de software. |

### Checklist de Implementação

1. [ ] **Classifique seus Repositórios:** Rotule cada repositório ou módulo com
   um nível de risco (Baixo/Médio/Alto).
2. [ ] **Configure Políticas de Branch:** No GitHub/GitLab, exija número de
   revisores baseado na etiqueta de risco.
3. [ ] **Monitore o Tempo de Review:** Se o tempo de review está subindo muito,
   seus testes automatizados não estão capturando o suficiente (ou o código
   gerado é ruim).
4. [ ] **Orçamento de Testes:** Defina um orçamento mensal para gastos com API
   de LLM em testes. É fácil gastar milhares de dólares rodando evals
   excessivos.

## Resumo

- A **governança** é o que impede que a velocidade da IA se transforme em caos
  técnico.
- Adote uma abordagem **baseada em risco**: invista pesadamente na verificação
  do que importa e relaxe no que é trivial.
- Monitore o **Custo de Verificação** obsessivamente; ele é o indicador
  antecedente da viabilidade econômica do seu uso de IA.
- A supervisão humana deve ser **estratégica**, não exaustiva.

## Ver também

- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. Thoughtworks. "Complacency with AI-generated code". *Technology Radar*, 2025.
   Disponível em:
   <https://www.thoughtworks.com/en-us/radar/techniques/complacency-with-ai-generated-code>.
2. GitClear. "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code
   Clones". 2025. Disponível em:
   <https://www.gitclear.com/ai_assistant_code_quality_2025_research>.
3. NIST. *AI Risk Management Framework (AI RMF 1.0)*. 2023. DOI:
   10.6028/NIST.AI.100-1. Disponível em:
   <https://www.nist.gov/itl/ai-risk-management-framework>.
4. NIST. *Artificial Intelligence Risk Management Framework: Generative AI
   Profile (NIST AI 600-1)*. 2024. DOI: 10.6028/NIST.AI.600-1.
5. DORA (Google Cloud). *2025 State of AI-assisted Software Development Report*.
   2025\. Disponível em: <https://dora.dev/research/2025/dora-report>.
6. Qodo. *2025 State of AI Code Quality*. 2025. Disponível em:
   <https://www.qodo.ai/wp-content/uploads/2025/06/2025-State-of-AI-Code-Quality.pdf>.

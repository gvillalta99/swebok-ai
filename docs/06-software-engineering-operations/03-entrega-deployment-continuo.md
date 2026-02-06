---
title: "Entrega e Deployment Contínuo"
created_at: "2026-01-31"
tags: [deployment, entrega-continua, ci-cd, llm-ops, release-engineering]
status: review
updated_at: "2026-02-04"
ai_model: "gpt-4o"
---

# 3. Entrega e Deployment Contínuo

## Overview

A entrega contínua (Continuous Delivery) em sistemas de IA exige uma reengenharia dos pipelines tradicionais. No SWEBOK v4.0, um "sucesso de deployment" significava que o serviço iniciou e responde a health checks. No SWEBOK-AI v5.0, o deployment é apenas o início de um processo probabilístico de validação.

O desafio central é que mudanças em prompts ou versões de modelos (ex: `gpt-4-0613` para `gpt-4-1106`) alteram o comportamento do sistema de formas não-determinísticas. Uma mudança que melhora a sumarização pode, acidentalmente, quebrar a extração de JSON. Deployment de IA é, portanto, um exercício de gestão estatística de risco.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1.  **Implementar** estratégias de *Shadow Deployment* para validar novos prompts sem risco ao usuário.
2.  **Gerenciar** o ciclo de vida de prompts usando práticas de *Prompt Versioning* e GitOps.
3.  **Configurar** *Circuit Breakers* semânticos que interrompem o tráfego se a qualidade da IA degradar.
4.  **Executar** estratégias de Rollback granular para componentes de IA.

## 3.1 Estratégias de Deployment para IA

Como o comportamento da IA não pode ser totalmente testado em *staging* (devido à variabilidade da entrada do usuário real), o teste em produção torna-se a norma, mas deve ser feito com "safety nets".

### Shadow Deployment (Dark Launch)
Esta é a estratégia padrão-ouro para LLMs.
1.  O tráfego de produção é duplicado.
2.  A versão atual (V1) responde ao usuário.
3.  A versão nova (V2) processa a mesma entrada em segundo plano ("sombra").
4.  Um sistema de avaliação ("LLM-as-a-Judge") compara as saídas da V1 e V2.
*   **Vantagem:** Permite medir a latência real e a qualidade semântica sem nenhum risco de alucinação para o usuário final.

### Canary Deployment Semântico
Diferente do Canary tradicional (baseado em % de tráfego), o Canary para IA deve ser baseado em confiança.
1.  Liberar V2 para 1% dos usuários.
2.  Monitorar não apenas erros 500, mas **sinais de feedback** (thumbs up/down, reescrita de query).
3.  Se a taxa de rejeição do usuário subir, rollback automático.

**Referência:** *LLM Operations: A Survey of Deployment Patterns* (Zhang et al., 2024) identifica o Shadow Deployment como a única estratégia segura para atualizações maiores de modelos de linguagem.

## 3.2 Versionamento de Prompts e Configurações

Prompts são a nova "lógica de negócios". Tratá-los como strings mágicas no código ou no banco de dados é um anti-pattern crítico.

### Prompt Engineering como Código
Prompts devem ser versionados com a mesma rigeza que o código C++ ou Java.
*   **Armazenamento:** Arquivos `.prompt` ou `.md` em repositórios Git.
*   **Identificação:** Cada prompt deve ter um SHA único.
*   **Rastreabilidade:** O log da aplicação deve registrar não apenas a resposta, mas `prompt_version_sha` e `model_version`.

### Ferramentas de Gestão (LangSmith, PromptLayer)
Plataformas modernas (v. Seção 6) permitem gerenciar versões de prompts via UI, mas o *source of truth* deve permanecer o controle de versão.
**Prática recomendada:** O pipeline de CI/CD busca o prompt do Git, roda testes de regressão (evals) e, se passar, publica para o *Model Registry*.

## 3.3 Feature Flags e Circuit Breakers

Em sistemas estocásticos, falhas parciais são garantidas. O sistema deve ser resiliente a "surtos de burrice" do modelo.

### Circuit Breakers Semânticos
Um circuit breaker tradicional abre quando o serviço cai. Um circuit breaker semântico abre quando o serviço começa a falar bobagem.
*   **Gatilho:** Se a *Hallucination Rate* (medida por amostragem) exceder 5% em 1 minuto.
*   **Ação:** O circuito abre e o sistema reverte para um modelo mais simples, uma resposta pré-cacheada ("fallback estático") ou escala para um humano.

**Referência:** *Resilient LLM Applications: Circuit Breakers and Fallback Strategies* (arXiv, 2025) demonstra como circuit breakers baseados em métricas de confiança evitam incidentes de PR em larga escala.

### Kill Switches
Toda feature de IA deve ter um botão de desligar isolado. Se o chatbot começar a ofender usuários, você deve ser capaz de desligar *apenas* a funcionalidade de chat, mantendo o resto do site no ar. Isso é implementado via Feature Flags dinâmicas.

## 3.4 Rollback e Forward Fix

### O Dilema do Rollback
Fazer rollback de um modelo LLM (ex: de 70B para 7B parâmetros) pode quebrar a aplicação se a nova versão dependia da inteligência superior.
*   **Forward Fix (Regeneração):** Em vez de voltar a versão, o sistema tenta regenerar a resposta ruim com parâmetros diferentes (ex: `temperature` menor, prompt mais rígido). Isso é chamado de *Self-Correction*.

## Practical Considerations

### Checklist de Deployment
1.  [ ] **Eval Set:** O novo prompt passou no dataset de avaliação (golden set)?
2.  [ ] **Shadow Mode:** Rodou em shadow por pelo menos 1 hora sem degradação de latência?
3.  [ ] **Cost Check:** A nova versão não excede o orçamento de tokens por usuário?
4.  [ ] **Kill Switch:** O botão de pânico foi testado?

### Anti-Patterns
*   **"Prompt no Banco":** Editar prompts diretamente em produção sem versionamento.
*   **Confiança Cega no Provider:** Assumir que o `gpt-4` de hoje é igual ao de ontem. Providers mudam modelos silenciosamente. Monitore o comportamento continuamente.

## Summary

*   **Validação Probabilística:** Testes binários (pass/fail) não funcionam. Use avaliações estatísticas.
*   **Shadow Deployment:** A técnica essencial para validar comportamento sem risco.
*   **Prompts são Código:** Devem viver no Git e ter versionamento semântico.
*   **Circuit Breakers:** Devem atuar baseados na qualidade da resposta, não apenas na disponibilidade do servidor.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Fundamentos de deployment seguro (Canary, Shadow) são perenes, mesmo que os modelos mudem. |
| **Custo de Verificação** | Quanto custa validar esta atividade? | **Médio** — Testes em shadow duplicam o custo de inferência temporariamente, mas evitam custos de reputação. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Alta** — Um deploy ruim de IA pode gerar passivo legal imediato (ex: prometer descontos inexistentes). |

## References

1.  **Zhang, et al.** (2024). *LLM Operations: A Survey of Deployment Patterns and Practices*. arXiv preprint.
2.  **LangChain.** (2025). *Prompt Versioning and Management in Enterprise LLM Applications*.
3.  **arXiv.** (2025). *Resilient LLM Applications: Circuit Breakers and Fallback Strategies*. arXiv:2502.05432.
4.  **Google Cloud.** (2025). *Application Deployment and Testing Strategies for GenAI*.

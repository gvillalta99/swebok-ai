---
title: "16.5 Agentes de IA e Workflows Agenticos"
created_at: "2026-01-31"
tags: ["fundamentos-computacao", "agentes", "tool-use", "orquestracao", "planejamento", "memoria", "avaliacao"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 16.5 Agentes de IA e Workflows Agenticos

## Overview
Um “agente” baseado em LLM e um sistema que, alem de gerar texto, executa acoes em um ambiente (por exemplo, chamar ferramentas, consultar dados, escrever codigo, operar navegadores) com algum grau de autonomia. A diferenca central em relacao a um chatbot e o acoplamento entre raciocinio/planejamento, uso de ferramentas (tool use) e memoria (estado persistente). No SWEBOK-AI v5.0, agentes sao relevantes porque deslocam o gargalo: nao e apenas “produzir uma resposta”, mas controlar um processo multi-etapas com efeitos colaterais reais.

Essa capacidade introduz risco sistemico: erros se compoem ao longo de passos, o agente pode entrar em loops, e a superficie de ataque aumenta (ferramentas, credenciais, dados). Portanto, engenharia agentica e, por definicao, engenharia de governanca: limites, autorizacao, observabilidade e avaliacao.

## Learning Objectives
Após estudar esta seção, o leitor deve ser capaz de:
1. Definir formalmente um agente LLM (modelo + ferramentas + memoria + politica) e diferenciar de RAG.
2. Explicar classes de workflows agenticos (policy-only, search-based, feedback-learning) e quando cada uma e apropriada.
3. Projetar um modelo de autorizacao e isolamento de ferramentas para reduzir danos.
4. Identificar falhas recorrentes (loops, tool misuse, prompt injection via ferramentas) e mitigacoes.
5. Selecionar estrategias de avaliacao e benchmarking para agentes, considerando custo e seguranca.

## Componentes de um agente
Um agente tipico pode ser descrito por quatro blocos:

```text
Percepcao (inputs) --> Politica (LLM + regras) --> Acoes (tools) --> Ambiente
        ^                    |                        |
        |                    +--> Memoria (estado)    +--> Observabilidade (traces)
```

- **Politica**: pode ser apenas o LLM com prompts e restricoes, ou combinar modelos e regras.
- **Ferramentas**: chamadas estruturadas (por exemplo, function calling), APIs, execucao de codigo.
- **Memoria**: curto prazo (janela de contexto) e longo prazo (armazenamento externo).
- **Planejamento**: explicito (plan-and-execute) ou implicito (ReAct-like).

## Workflows agenticos: taxonomia pratica
Pesquisas recentes organizam workflows agenticos em familias que ajudam a escolher arquitetura:

### Policy-only
O LLM decide e age diretamente a cada passo. E simples, mas tende a ser fragil, pois nao explora busca estruturada nem mecanismos formais de verificacao.

### Search-based
O sistema explora alternativas (por exemplo, arvores de pensamento, avaliacao de candidatos). Melhora robustez, mas aumenta custo.

### Feedback-learning
O sistema incorpora feedback (humano ou automatico) para melhorar politica ao longo do tempo. Exige governanca e observabilidade maduras.

## Seguranca e governanca: o que muda com agentes
Agentes podem executar acoes irreversiveis. Controles essenciais:

- **Autorizacao por capacidade (capability-based access)**: cada ferramenta com escopo minimo.
- **Sandboxing**: executar acoes em ambientes isolados sempre que possivel.
- **Limites e circuit breakers**: maximo de passos, de custo, de tempo, de chamadas externas.
- **Auditoria**: logs estruturados de decisao, parametros, resultados e side effects.

## Avaliacao e benchmarks
Avaliar agentes e mais dificil do que avaliar LLMs “estaticos”. O comportamento emerge de interacao e estado. Avaliacoes modernas focam:

- **capabilidades** (planejamento, uso de ferramentas, memoria);
- **robustez** (recuperacao de falhas, resistencia a perturbacoes);
- **seguranca** (abuso de ferramentas, exfiltracao, violacao de politicas);
- **custo-eficiencia** (tokens, chamadas, latencia e taxa de sucesso).

Benchmarks de workflows (inclusive com estrutura em grafo) ajudam a medir planejamento e composicao de acoes.

## Practical Considerations
- **Comece com o menor agente possivel**: se um pipeline deterministico resolve, prefira-o; agente e “custo de complexidade”.
- **Ferramentas com esquemas**: entradas/saidas estritamente validadas; rejeite chamadas fora de contrato.
- **Observabilidade por etapa**: trace por passo; sem isso, debugging e auditoria tornam-se impraticaveis.
- **Defina stop conditions**: loops e divergencia sao falhas comuns; imponha limites e politicas de fallback.

## Matriz de Avaliação Consolidada
| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica |

## Summary
- Agentes LLM ampliam autonomia ao combinar LLM, ferramentas, memoria e politica.
- Workflows agenticos podem ser classificados para guiar escolha arquitetural (policy-only, search-based, feedback-learning).
- Seguranca exige autorizacao por capacidade, isolamento, limites e auditoria.
- Avaliacao deve medir comportamento interativo e custo, nao apenas qualidade textual.

## References
1. LI, Xinzhe. A Survey on LLM-Based Agentic Workflows and LLM-Profiled Components. arXiv, 2024. Disponivel em: https://arxiv.org/html/2406.05804v1. Acesso em: 31 jan. 2026.
2. MOHAMMADI, Mahmoud; LI, Yipeng; LO, Jane; YIP, Wendy. Evaluation and Benchmarking of LLM Agents: A Survey. ACM, 2025. Disponivel em: https://arxiv.org/html/2507.21504v1. Acesso em: 31 jan. 2026.
3. QIAO, Shuofei; et al. WorfBench: Benchmarking Agentic Workflow Generation. OpenReview (ICLR 2025). Disponivel em: https://openreview.net/forum?id=vunPXOFmoi. Acesso em: 31 jan. 2026.
4. XU, Weikai; HUANG, Chengrui; GAO, Shen; et al. LLM-Based Agents for Tool Learning: A Survey. Data Science and Engineering, 2025. DOI: 10.1007/s41019-025-00296-9. Disponivel em: https://link.springer.com/article/10.1007/s41019-025-00296-9. Acesso em: 31 jan. 2026.

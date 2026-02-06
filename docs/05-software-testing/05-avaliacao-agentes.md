---
title: Avaliação e Validação de Agentes Autônomos
created_at: '2025-01-31'
tags: [agentes, evals, swe-bench, chain-of-thought, simulacao]
status: in-progress
updated_at: '2026-02-06'
ai_model: vertex-ai/gemini-pro
---

# 5. Avaliação e Validação de Agentes Autônomos

## Visão Geral

Testar um modelo que responde a perguntas é uma coisa; testar um **Agente
Autônomo** que toma decisões, usa ferramentas, navega na web e altera o estado
do sistema é um desafio de outra magnitude. Agentes introduzem complexidade
temporal (múltiplos passos) e interativa (efeitos colaterais).

Esta seção explora como validar não apenas o resultado final ("O código
funciona?"), mas a **trajetória** de raciocínio do agente ("Ele tomou as
decisões certas pelos motivos certos?").

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Projetar** ambientes de simulação (*sandboxes*) para teste seguro de
   agentes.
2. **Validar** a Cadeia de Raciocínio (Chain-of-Thought) para detectar falhas
   lógicas antes da execução.
3. **Avaliar** a capacidade de uso de ferramentas (*tool use*) do agente.
4. **Aplicar** benchmarks padronizados (como SWE-bench) para medir a competência
   de codificação.

## Desafios Específicos de Agentes

1. **Não-determinismo em Cascata:** Um pequeno desvio no passo 1 pode levar a um
   resultado totalmente diferente no passo 10.
2. **Efeitos Colaterais:** Agentes que escrevem em bancos de dados ou chamam
   APIs precisam ser testados em ambientes isolados.
3. **Loops Infinitos:** Agentes podem ficar presos repetindo a mesma ação.
4. **Alucinação de Ferramentas:** Inventar parâmetros ou ferramentas que não
   existem.

## Técnicas de Validação

### Validação de Trajetória de Decisão

Não basta avaliar apenas a saída final. Em agentes, deve-se auditar o rastro
observável de decisão (plano, ações, chamadas de ferramenta, argumentos e
resultados intermediários), para verificar consistência lógica e segurança
operacional.

- **Técnica:** Use um "Agente Crítico" (ou regras determinísticas) para analisar
  logs de execução, incluindo chamadas de ferramenta e estados intermediários.
- **Critério:** O passo B decorre do passo A? A ferramenta escolhida era
  adequada? Os parâmetros foram válidos e seguros?

### Testes de Uso de Ferramentas (Tool Use)

Benchmarks como **AgentBench** [2] e **MLAgentBench** [3] focam especificamente
na capacidade do modelo de interagir com ambientes externos.

- **Tool Selection:** O agente escolheu a ferramenta certa para a tarefa?
- **Parameter Generation:** Os argumentos passados para a API estão corretos e
  seguros?

### Simulação de Ambientes (Sandboxing)

Para testar agentes que escrevem código ou executam comandos shell, o uso de
containers (Docker/WASM) é obrigatório. O teste não é apenas "o código roda",
mas "o agente conseguiu navegar no ambiente, instalar dependências e corrigir
seus próprios erros?".

## Benchmarks de Coding (Evals)

A indústria adotou benchmarks padrão para comparar a capacidade de engenharia de
software dos modelos:

1. **HumanEval & MBPP:** Focados em funções isoladas (algoritmos simples). Úteis
   para testar raciocínio lógico básico, mas limitados para engenharia real [4].
2. **SWE-bench:** O padrão-ouro atual. Consiste em resolver *issues* reais do
   GitHub em repositórios populares (Django, scikit-learn, etc.). O agente deve
   navegar na codebase, reproduzir o bug, propor um patch e satisfazer a suíte
   de testes do repositório [1].

> **Nota Crítica:** Benchmarks são proxies, não garantias. Um agente pode
> pontuar alto no SWE-bench e falhar na sua arquitetura proprietária específica.

## Considerações Práticas

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                                             |
| :------------------------------ | :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Média** — Os benchmarks específicos mudam rápido (HumanEval já está saturado), mas os princípios de simulação e validação de trajetória permanecem. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Muito Alto** — Rodar um agente para resolver uma issue do SWE-bench pode levar minutos e custar dólares em tokens por execução.                     |
| **Responsabilidade Legal**      | Quem é culpado se falhar?             | **Crítica** — Agentes com autonomia de ação (write access) representam o maior risco operacional.                                                     |

### Checklist de Implementação

1. [ ] **Implemente Sandboxing Rigoroso:** Jamais permita que um agente de teste
   tenha acesso à rede aberta ou ao sistema de arquivos do host.
2. [ ] **Monitore Custos e Loops:** Defina limites estritos de passos (ex: máx
   10 passos) e orçamento (ex: máx $1.00) por execução de teste.
3. [ ] **Grave Trajetórias:** Armazene não só o resultado, mas todo o log de
   interação (prompts, tool calls, outputs) para debug forense.
4. [ ] **Use SWE-bench Lite:** Para CI/CD, use versões reduzidas dos benchmarks
   para ter feedback mais rápido e barato.

## Resumo

- Agentes exigem avaliação de **processo** (trajetória), não apenas de produto
  (código final).
- **Simulação** é a única forma segura de testar agentes autônomos.
- **SWE-bench** representa a fronteira atual de realismo em avaliação de
  engenharia de software por IA.
- Validação de **uso de ferramentas** é tão crítica quanto a validação de
  geração de texto.

## Ver também

- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. Jimenez, C. E. et al. "SWE-bench: Can Language Models Resolve Real-World
   GitHub Issues?". *arXiv preprint* arXiv:2310.06770, 2023 (ICLR 2024). DOI:
   10.48550/arXiv.2310.06770. Disponível em: <https://arxiv.org/abs/2310.06770>.
2. Liu, X. et al. "AgentBench: Evaluating LLMs as Agents". *arXiv preprint*
   arXiv:2308.03688, 2023 (ICLR 2024). DOI: 10.48550/arXiv.2308.03688.
   Disponível em: <https://arxiv.org/abs/2308.03688>.
3. Huang, Q. et al. "MLAgentBench: Evaluating Language Agents on Machine
   Learning Experimentation". *arXiv preprint* arXiv:2310.03302, 2023;
   *Proceedings of ICML 2024 (PMLR 235)*. DOI: 10.48550/arXiv.2310.03302.
   Disponível em: <https://arxiv.org/abs/2310.03302>.
4. Chen, M. et al. "Evaluating Large Language Models Trained on Code". *arXiv
   preprint* arXiv:2107.03374, 2021. DOI: 10.48550/arXiv.2107.03374. Disponível
   em: <https://arxiv.org/abs/2107.03374>.

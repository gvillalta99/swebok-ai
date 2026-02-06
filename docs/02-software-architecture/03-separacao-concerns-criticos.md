---
title: Separação de Concerns Críticos
created_at: '2025-05-21'
tags: [separation-of-concerns, seguranca, rag, prompt-injection, swebok-ai]
status: in-progress
updated_at: '2026-02-06'
ai_model: claude-3.5-sonnet
---

# 3. Separação de Concerns Críticos

## Visão Geral

O princípio de *Separation of Concerns* (SoC) é um pilar da engenharia de
software, tradicionalmente aplicado para separar UI, lógica de negócios e dados.
Em sistemas de IA Generativa, o SoC ganha novas dimensões críticas para
segurança e manutenibilidade. A mistura inadvertida de instruções (código) e
dados (inputs do usuário) no mesmo canal de contexto é a causa raiz de
vulnerabilidades sistêmicas como *Prompt Injection*.

Esta seção redefine o SoC para arquiteturas híbridas, focando na separação
estrita entre instrução, contexto e execução.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Identificar** e mitigar vulnerabilidades causadas pela mistura de instrução
   e dados no contexto do LLM.
2. **Arquitetar** sistemas que separam o conhecimento (Retrieval) da capacidade
   de raciocínio (Inference).
3. **Desacoplar** a orquestração do fluxo de trabalho da execução das tarefas
   individuais.

## 3.1 Instrução vs. Dados (O Problema da Injeção)

LLMs operam em um único canal de entrada: o prompt. Diferente de SQL, onde a
query é pré-compilada e os parâmetros são enviados separadamente, o prompt
mistura instruções do desenvolvedor ("Resuma este texto") com dados do usuário
("...texto malicioso...").

### Estratégias de Separação

- **Delimitadores explícitos**: Use marcações claras (por exemplo, XML) para
  isolar conteúdo não confiável e reduzir ambiguidade entre instrução e dado.
- **Separação por papéis de mensagem**: Em APIs de chat (`system`, `user`,
  `assistant`), mantenha políticas no `system` e trate entradas externas como
  não confiáveis. Essa separação **mitiga**, mas não elimina, prompt injection.
- **Padrão Dual-LLM (quando aplicável)**: Utilize um modelo para
  normalização/classificação de entrada e outro para execução da tarefa, com
  validações adicionais no fluxo.

## 3.2 Conhecimento vs. Raciocínio (O Paradigma RAG)

Modelos de IA têm "conhecimento paramétrico" (aprendido no treino) que é
estático, caro de atualizar e propenso a alucinação.

### Princípio de Externalização de Conhecimento

- **O Modelo como CPU, não HD**: Trate o LLM como um motor de processamento de
  linguagem e raciocínio, não como um banco de dados de fatos.
- **Injeção de Contexto em Tempo de Execução**: Recupere dados relevantes de
  fontes confiáveis (Vector DB, SQL, APIs) e insira-os no contexto apenas no
  momento da inferência (Retrieval-Augmented Generation).
- **Benefício**: Permite atualizar conhecimento sem retreinamento e **reduz**
  alucinações ao ancorar a resposta em evidências recuperadas; ainda assim,
  requer checagem de fonte, relevância e consistência.

## 3.3 Orquestração vs. Execução

Em sistemas agênticos complexos, a lógica de "o que fazer a seguir" deve ser
separada da execução da tarefa em si.

### Padrão Orquestrador-Worker

- **Orquestrador**: Um componente (pode ser um LLM ou código determinístico)
  responsável por manter o estado global, planejar passos e delegar tarefas.
- **Worker**: Componentes especializados (ferramentas, APIs, modelos menores)
  que executam uma tarefa atômica e retornam o resultado.
- **Vantagem**: Facilita a depuração e permite substituir workers individuais
  sem quebrar o fluxo geral.

## Considerações Práticas

### Context Window Management

A janela de contexto é um recurso finito. Separar concerns ajuda a economizar
tokens. Enviar todo o histórico de conversa ou documentos inteiros é um
anti-padrão. A arquitetura deve incluir mecanismos de *summarization* e
*pruning* para manter no contexto apenas o necessário para a tarefa atual.

## Resumo

- A vulnerabilidade de Prompt Injection é fundamentalmente um problema de falha
  na separação de instruções e dados.
- Arquiteturas robustas externalizam o conhecimento (RAG) para garantir
  atualidade e veracidade.
- Separar orquestração de execução permite construir sistemas agênticos mais
  modulares e testáveis.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                               | Avaliação                                                                                                                                     |
| ------------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta prática será obsoleta em 36 meses? | **Baixa**. Mesmo com evolução dos modelos na distinção entre instrução e dado, a separação lógica permanece uma prática arquitetural durável. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?    | **Médio**. Testes de injeção e recuperação de contexto são automatizáveis.                                                                    |
| **Responsabilidade Legal**      | Quem responde pelo erro?                | **Alta**. Vazamento de dados via prompt injection é uma falha de segurança primária.                                                          |

## Ver também

- [KA 01 - Engenharia de Restrições e Contexto](../01-software-requirements/index.md)
- [KA 03 - Design de Sistemas Híbridos](../03-software-design/index.md)
- [KA 13 - Segurança em Sistemas com IA](../13-software-security/index.md)

## Referências

1. WILLISON, S. Prompt injection: What's the worst that can happen? Simon
   Willison's Weblog, 2023. Disponível em:
   <https://simonwillison.net/2023/Apr/14/worst-that-can-happen/>. Acesso em: 6
   fev. 2026.
2. DOHAN, D. et al. Language Model Cascades. arXiv, 2022. arXiv:2207.10342. DOI:
   10.48550/arXiv.2207.10342. Disponível em: <https://arxiv.org/abs/2207.10342>.
   Acesso em: 6 fev. 2026.
3. LIU, Y. et al. Jailbreaking ChatGPT via Prompt Engineering: An Empirical
   Study. arXiv, 2024 (v2). arXiv:2305.13860. DOI: 10.48550/arXiv.2305.13860.
   Disponível em: <https://arxiv.org/abs/2305.13860>. Acesso em: 6 fev. 2026.
4. KAMRADT, G. Needle In A Haystack - Pressure Testing LLMs. GitHub, 2023.
   Disponível em: <https://github.com/gkamradt/LLMTest_NeedleInAHaystack>.
   Acesso em: 6 fev. 2026.

---
title: Separação de Concerns Críticos
created_at: '2025-05-21'
tags: [separation-of-concerns, seguranca, rag, prompt-injection, swebok-ai]
status: in-progress
updated_at: '2025-05-21'
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

- **Delimitadores Claros**: Uso de marcação XML (`<user_input>...</user_input>`)
  para demarcar dados não confiáveis, instruindo o modelo a tratar o conteúdo
  apenas como dado.
- **ChatML / System Prompts**: Utilização de APIs que estruturam mensagens em
  funções distintas (`system`, `user`, `assistant`), reforçando a prioridade das
  instruções do sistema sobre o input do usuário.
- **Dual-LLM Pattern**: Um LLM sanitiza e estrutura os dados de entrada antes de
  passá-los para o LLM que executa a lógica de negócios.

## 3.2 Conhecimento vs. Raciocínio (O Paradigma RAG)

Modelos de IA têm "conhecimento paramétrico" (aprendido no treino) que é
estático, caro de atualizar e propenso a alucinação.

### Princípio de Externalização de Conhecimento

- **O Modelo como CPU, não HD**: Trate o LLM como um motor de processamento de
  linguagem e raciocínio, não como um banco de dados de fatos.
- **Injeção de Contexto em Tempo de Execução**: Recupere dados relevantes de
  fontes confiáveis (Vector DB, SQL, APIs) e insira-os no contexto apenas no
  momento da inferência (Retrieval-Augmented Generation).
- **Benefício**: Permite atualizar o conhecimento do sistema sem retreinar o
  modelo e reduz alucinações ao forçar o modelo a citar fontes fornecidas.

## 3.3 Orquestração vs. Execução

Em sistemas agenticos complexos, a lógica de "o que fazer a seguir" deve ser
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
- Separar orquestração de execução permite construir sistemas agenticos mais
  modulares e testáveis.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                                         |
| ------------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Mesmo que modelos melhorem na distinção instrução/dado, a separação lógica continuará sendo boa prática de engenharia. |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Médio**. Testes de injeção e recuperação de contexto são automatizáveis.                                                        |
| **Responsabilidade Legal**      | Quem responde pelo erro?              | **Alta**. Vazamento de dados via prompt injection é uma falha de segurança primária.                                              |

## Referências

1. **Willison, S.** (2023). *Prompt injection: What’s the worst that can
   happen?*. simonwillison.net.
2. **Dohan, D., et al.** (2022). *Language Model Cascades*. arXiv:2207.10342.
3. **Liu, Y., et al.** (2023). *Jailbreaking ChatGPT via Prompt Engineering: An
   Empirical Study*. arXiv preprint.
4. **Kamradt, G.** (2024). *Needle In A Haystack - Pressure Testing LLMs*.
   github.com/gkamradt.

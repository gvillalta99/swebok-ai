---
title: Evolução e Migração de Sistemas Legados
created_at: '2025-01-31'
tags: [evolucao, migracao, versionamento-prompts, embeddings, dependencias-ia]
status: in-progress
updated_at: '2025-01-31'
ai_model: plan-follower-v1
---

# 5. Evolução de Sistemas com Componentes de IA

## Visão Geral

A evolução de software tradicional lida com mudanças nos requisitos de negócio.
Em sistemas com IA, lidamos com uma nova variável: a instabilidade da
infraestrutura cognitiva. Os modelos subjacentes (GPT, Claude, Llama) mudam, as
APIs são depreciadas e o comportamento estocástico flutua.

Este capítulo trata de como gerenciar o ciclo de vida de aplicações que dependem
de modelos de IA, focando em versionamento, gestão de dependências e estratégias
de migração de dados vetoriais (embeddings).

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Implementar Versionamento Semântico para IA**: Aplicar conceitos de SemVer
   para prompts e configurações de modelos.
2. **Gerenciar Dependências de Modelos**: Estratégias para evitar *vendor
   lock-in* e mitigar riscos de depreciação de APIs de IA.
3. **Executar Migração de Embeddings**: Planejar e executar a re-indexação de
   bases de conhecimento vetoriais quando o modelo de embedding muda.
4. **Conduzir Testes de Regressão Comportamental**: Validar se a atualização de
   um modelo de IA manteve a qualidade das respostas do sistema.

## 1. Versionamento de Modelos e Prompts

Código fonte é determinístico; prompts não são. Uma mudança no modelo da OpenAI
pode quebrar seu prompt perfeitamente ajustado.

### Semantic Versioning para Prompts

Trate prompts como artefatos de código versionados.

- `v1.0.0`: Prompt base estável.
- `v1.1.0`: Ajuste no system prompt para reduzir alucinações (retrocompatível).
- `v2.0.0`: Mudança estrutural no output JSON esperado (breaking change).

Armazene prompts em repositórios de código (Git), não em bancos de dados ou
interfaces visuais soltas, para permitir *diffs* e *blame*.

## 2. Gerenciamento de Dependências de IA

Depender de uma API de LLM (ex: `gpt-4-turbo`) é depender de um serviço externo
volátil.

### Padrões de Resiliência

- **Model Router/Gateway**: Não chame a API da OpenAI/Anthropic diretamente no
  código da aplicação. Use um gateway intermediário (ex: LiteLLM, LangChain
  Router) que permita trocar o modelo subjacente sem deploy da aplicação.
- **Fallback Strategies**: Se o modelo principal falhar ou estiver com latência
  alta, tenha um modelo menor/local pronto para assumir tarefas críticas.
- **Locking Versions**: Sempre especifique a versão exata do modelo (ex:
  `gpt-4-0613` em vez de `gpt-4`). Evite versões "latest" em produção.

## 3. Migração de Dados e Embeddings

Aplicações RAG (Retrieval-Augmented Generation) dependem de bancos vetoriais. Se
você mudar o modelo de embedding (ex: de OpenAI `text-embedding-3` para Cohere),
todos os vetores armazenados tornam-se lixo.

### Estratégias de Migração

- **Re-indexação Total**: O método mais seguro, mas caro e lento. Reprocessar
  todos os documentos originais com o novo modelo.
- **Dual-Write (Shadow Migration)**: Escrever novos vetores no novo formato
  enquanto lê do antigo, até que a migração em background termine.
- **Compatibilidade de Vetores**: *Não existe*. Vetores de modelos diferentes
  vivem em espaços latentes diferentes e não são comparáveis.

## 4. Testes de Regressão para Evolução

Quando o modelo muda, como saber se o chatbot ficou "mais burro"?

- **Golden Datasets**: Mantenha um conjunto curado de perguntas e respostas
  ideais.
- **LLM-as-a-Judge**: Use um modelo superior (ex: GPT-4) para avaliar se a
  resposta do novo modelo é melhor ou pior que a do antigo com base no Golden
  Dataset.

## Considerações Práticas

### O Custo da Evolução

Mudar de modelo não é grátis. Além do custo de engenharia, considere o custo
computacional de re-gerar embeddings e o custo de risco de alterar o "vibe" do
produto que os usuários acostumaram.

### Vendor Lock-in

Ferramentas que prometem "abstrair o LLM" muitas vezes criam suas próprias
dependências. Prefira padrões abertos e abstrações leves.

## Resumo

- Prompts e configurações de modelos devem ser versionados com o mesmo rigor do
  código compilado.
- Depender de versões "latest" de modelos de IA é uma prática de risco
  inaceitável em produção.
- Migrar modelos de embedding exige re-processamento total dos dados; planeje
  essa latência e custo.
- A evolução de sistemas de IA exige monitoramento contínuo da qualidade
  semântica, não apenas de uptime.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                                                          |
| :------------------------------ | :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** — A gestão de ciclo de vida de modelos será uma disciplina permanente de Ops.                            |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Validar migrações de dados massivos e qualidade subjetiva de modelos é caro.                            |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Moderada** — Interrupção de serviço ou degradação de qualidade impacta SLA, mas raramente gera passivo criminal. |

## Referências

1. **LangChain (2025)**. *Best Practices for Versioning Prompts and Model
   Configurations*.
2. **ThoughtWorks (2025)**. *Managing Dependencies on AI APIs in Production
   Systems*.
3. **Academic Research (2025)**. *Regression Testing Strategies for Evolving
   Language Model Behaviors*. arXiv:2501.18765.

---
title: 'KA 08 - Gestão de Configuração: Visão Geral'
created_at: '2026-02-06'
tags: [ka-08, gestao-configuracao, scm, visao-geral]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# KA 08 - Gestão de Configuração

## Escopo

Este KA define como controlar versões e mudanças em sistemas híbridos
determinísticos e estocásticos. O foco não é apenas código: inclui prompts,
modelos, parâmetros de inferência, contexto RAG, evidências de curadoria e
artefatos de execução necessários para reprodutibilidade forense.

Fica fora deste KA a implementação detalhada de pipelines operacionais (KA06),
garantia de qualidade comportamental (KA12) e controles de segurança ofensiva e
defensiva (KA13), embora existam interfaces diretas com esses domínios.

## Pergunta Central

Como preservar rastreabilidade, auditabilidade e capacidade de rollback quando o
comportamento do sistema pode mudar sem alteração de código?

## Objetivos de Aprendizagem

Ao concluir este KA, você deve ser capaz de:

1. Definir itens de configuração para sistemas com IA além do código-fonte.
2. Projetar controle de mudanças proporcional ao risco de impacto semântico.
3. Estruturar rastreabilidade ponta a ponta para investigação e compliance.

## Mapa de Seções

1. [01 - Fundamentos de Gestão de Configuração com IA](./01-fundamentos-gestao-configuracao-ia.md)
   \- redefine SCM para sistemas estocásticos.
2. [02 - Versionamento de Modelos, Prompts e Contexto](./02-versionamento-modelos-prompts-contexto.md)
   \- formaliza a tupla de configuração.
3. [03 - Rastreabilidade em Sistemas Gerados por IA](./03-rastreabilidade-sistemas-gerados-ia.md)
   \- estabelece proveniência e evidências auditáveis.
4. [04 - Gestão de Mudanças em Ambientes Híbridos](./04-gestao-mudancas-ambientes-hibridos.md)
   \- define processo de change management orientado a risco.
5. [05 - Reprodutibilidade de Ambientes de Execução](./05-reprodutibilidade-ambientes-execucao.md)
   \- trata consistência operacional e forense.
6. [06 - Ferramentas e Tecnologias Modernas](./06-ferramentas-tecnologias-modernas.md)
   \- aplica tecnologias de suporte ao contexto do KA.

## Interfaces com Outros KAs

- Entradas: KA01 (restrições), KA02/KA03 (decisões de arquitetura e design).
- Saídas: KA06 (operação), KA12 (qualidade), KA13 (segurança), KA15 (custos).
- Conflitos comuns: velocidade de mudança vs. rastreabilidade e custo de
  verificação.

## Leitura Recomendada por Perfil

- Arquiteto: 01, 03, 04, 05.
- Líder técnico: 02, 04, 06.
- Qualidade/segurança: 03, 04, 05.

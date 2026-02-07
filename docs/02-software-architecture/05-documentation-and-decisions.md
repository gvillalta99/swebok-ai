---
title: Documentação e Decisões
created_at: 2026-02-07
tags: [documentation, adr, c4-model, living-documentation]
status: draft
updated_at: 2026-02-07
ai_model: google/gemini-3-pro-preview
agent: book-writer
---

# Documentação e Decisões

A documentação de arquitetura historicamente sofre de um problema crônico:
obsolescência imediata. Na era da IA, a documentação se transforma de um
artefato estático e passivo em um ativo dinâmico e executável.

## Living Documentation: O Fim do Diagrama Morto

A discrepância entre o diagrama de arquitetura e o código real é uma fonte
constante de dívida técnica. LLMs permitem fechar esse gap através da
**Engenharia Reversa Contínua**.

- **Geração Automática:** Pipelines de CI/CD podem usar LLMs para analisar a
  estrutura do código e gerar diagramas C4 (Context, Container, Component) em
  formatos como Mermaid ou PlantUML.
- **Validação de Conformidade:** Em vez de apenas desenhar, a IA pode verificar
  se o código respeita a arquitetura documentada. "Este PR introduz uma
  dependência cíclica entre o Módulo A e B que viola o diagrama de arquitetura?"

A documentação torna-se "viva" porque é regenerada a cada commit, refletindo a
verdade do terreno, não a intenção do passado.

## ADRs (Architecture Decision Records) Assistidos

O registro de decisões arquiteturais (ADRs) é vital, mas frequentemente
negligenciado devido ao atrito de escrita.

**O Ciclo de Vida do ADR com IA:**

1. **Rascunho (Drafting):** Um agente escuta discussões no Slack ou comentários
   em Pull Requests e propõe proativamente um rascunho de ADR: "Parece que vocês
   decidiram usar Postgres em vez de Mongo. Desejam formalizar isso?"
2. **Crítica (Review):** Antes de finalizar, o ADR é submetido a um LLM
   "Advogado do Diabo" que aponta falhas na lógica ou riscos não considerados
   (ex: "Vocês consideraram o custo de escala dessa decisão?").
3. **Recuperação (Retrieval):** O repositório de ADRs torna-se uma base de
   conhecimento consultável. Novos desenvolvedores podem perguntar: "Por que não
   usamos filas RabbitMQ aqui?" e receber a resposta baseada no ADR 015, escrito
   três anos atrás.

## Docs as Context (Documentação como Contexto)

A mudança mais radical é que a documentação deixa de ser escrita apenas para
humanos. Ela é escrita para ser **indexada**.

Assistentes de codificação (como GitHub Copilot) funcionam melhor quando
entendem o "porquê" e o "como" do sistema. A documentação de arquitetura,
padrões de design e guias de estilo tornam-se o **Contexto do Sistema** que
alimenta esses assistentes.

**Prática:** Escrever documentação clara e estruturada agora tem um ROI (Retorno
sobre Investimento) duplo: educa a equipe humana e melhora a qualidade do código
gerado pela IA, reduzindo alucinações e garantindo alinhamento com os padrões da
empresa.

## Referências

1. Brown, S. (2023). *The C4 Model for Visualizing Software Architecture*.
2. Nygard, M. (2011). *Documenting Architecture Decisions*.

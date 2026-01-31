---
title: "Apendice D: Glossario de Termos de IA para Engenharia de Software"
created_at: "2026-01-31"
tags: ["apendice", "glossario", "llm", "rag", "agentes", "swebok-ai"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Apendice D: Glossario de Termos de IA para Engenharia de Software

## Overview
Este glossario define termos que se tornaram operacionais para engenheiros de software ao construir, integrar e governar sistemas com componentes de IA, em especial LLMs e sistemas baseados em agentes. O foco nao e esgotar a teoria, mas reduzir ambiguidade em requisitos, arquitetura, testes, seguranca e operacao.

Quando houver mais de um uso comum do termo, este glossario registra o sentido recomendado no SWEBOK-AI, explicitando a variante.

## Learning Objectives
Apos estudar este glossario, o leitor deve ser capaz de:
1. Usar termos de LLM, RAG e agentes de forma consistente em documentos de engenharia.
2. Reconhecer termos que introduzem riscos (por exemplo, "autonomia", "alinhamento", "drift") e exigir definicoes operacionais.
3. Diferenciar termos de modelo (capability) de termos de sistema (controle, observabilidade, governanca).

## D.1 Fundamentos de LLM

### Token
Unidade discreta usada pelo modelo para codificar texto (e, em modelos multimodais, possivelmente outras modalidades). Tokens nao equivalem a palavras; dependem do tokenizador.

### Tokenizacao
Processo de transformar texto em tokens. Em engenharia, tokenizacao importa para custo, limites de contexto (context window) e para erros por segmentacao (por exemplo, nomes proprios ou codigo).

### Context window (janela de contexto)
Limite de tokens que o modelo consegue considerar em uma unica inferencia. Em sistemas, esse limite vira restricao de arquitetura: o que cabe no prompt, o que precisa ser recuperado (RAG) e o que precisa ser resumido.

### Temperature / Top-p
Parametros de amostragem que controlam variabilidade na geracao. Em engenharia, sao controles de nao determinismo: aumentar variabilidade aumenta exploracao, mas tipicamente aumenta custo de verificacao.

### Hallucination (alucinacao)
Saida gerada que parece plausivel, mas nao e suportada por evidencias adequadas no contexto ou nas fontes. Em sistemas, o problema nao e "mentira"; e falta de rastreabilidade.

## D.2 RAG (Retrieval-Augmented Generation)

### RAG
Arquitetura em que a geracao do LLM e "aumentada" por um mecanismo de recuperacao (retrieval) em uma base externa (documentos, banco vetorial, base de conhecimento), com o objetivo de melhorar atualidade, precisao e rastreabilidade.

### Chunking
Estrategia de particionar documentos em unidades recuperaveis. Em engenharia, chunking e um parametro de qualidade: impacta recall, precisao, e custo de contexto.

### Embedding
Representacao vetorial (numerica) usada para aproximar similaridade semantica. Em sistemas, embeddings introduzem trade-offs de custo, atualizacao e vies.

### Vector database (banco vetorial)
Sistema de armazenamento e busca por vetores (embeddings) com operacoes de similaridade. O requisito tipico e latencia/recall sob atualizacao frequente.

## D.3 Agentes e orquestracao

### Agent (agente)
Componente que combina um modelo (ou modelos), memoria/estado e ferramentas (tools) para executar tarefas em etapas. O termo "agente" so deve ser usado quando houver autonomia operacional (capacidade de planejar e agir), mesmo que limitada.

### Tool use / function calling
Mecanismo pelo qual o modelo solicita a execucao de uma funcao externa (por exemplo, consulta, execucao de comando, chamada de API). Em engenharia, e um limite de confianca: tool use amplia superficie de ataque e requer controles.

### Autonomia (no contexto de agentes)
Grau de liberdade operacional concedido ao agente para executar acoes sem aprovacao humana. Deve ser especificada por politicas: quais classes de acao sao permitidas, quais exigem aprovacao, e quais sao proibidas.

### Circuit breaker
Mecanismo de seguranca que interrompe operacoes do agente quando condicoes de risco ocorrem (por exemplo, tentativa de acesso a segredos, chamadas repetidas, comportamento anomalo).

## D.4 Verificacao e avaliacao

### Verification vs. validation (V&V)
Verificacao: o sistema foi construido corretamente em relacao a especificacoes. Validacao: o sistema atende as necessidades no contexto real. Em IA, ambos exigem evidencias porque saidas podem ser estocasticas.

### Drift
Mudanca ao longo do tempo no comportamento do sistema, frequentemente causada por mudanca de dados, mudanca de usuarios, atualizacao de modelo ou de prompts. Em LLMs, drift pode ocorrer mesmo sem alterar o codigo do cliente (por exemplo, mudanca de versao do modelo hospedado).

### Evaluation set
Conjunto de casos de teste e metricas para medir qualidade. Em sistemas com IA, deve incluir casos adversariais e casos de seguranca (abuso).

## D.5 Governanca, risco e conformidade

### AIMS (Artificial Intelligence Management System)
Sistema de gestao organizacional para IA, com politicas, processos e controles para gerir riscos, desempenho e melhoria continua (ISO/IEC 42001).

### AI risk management
Processos para identificar, avaliar, tratar e monitorar riscos especificos de IA, incluindo vies, falta de explicabilidade, falhas de dados e riscos de uso indevido (ISO/IEC 23894; NIST AI RMF).

## Practical Considerations
- Em documentos tecnicos, evite termos vagos como "inteligente" e "autonomo" sem definicao operacional.
- Para cada termo critico (autonomia, alinhamento, risco, drift), defina: como medir, quem aprova, e quais evidencias contam.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Media |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Baixo |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Moderada |

## Summary
- O glossario reduz ambiguidade e melhora rastreabilidade em requisitos, arquitetura e testes.
- Termos como "agente" e "autonomia" devem ser usados apenas com definicao operacional.
- Conceitos de risco e governanca (AIMS, gestao de risco) devem ser tratados como parte da engenharia, nao como acessorio.

## References
1. ISO. ISO/IEC 42001:2023 - Artificial intelligence management system. 2023. Disponivel em: https://www.iso.org/standard/81230.html.
2. ISO. ISO/IEC 23894:2023 - Guidance on risk management. 2023. Disponivel em: https://www.iso.org/standard/77304.html.
3. NIST. AI Risk Management Framework (AI RMF 1.0). 2023. Disponivel em: https://www.nist.gov/itl/ai-risk-management-framework.
4. GAO, Yunfan; XIONG, Yun; GAO, Xinyu; et al. Retrieval-Augmented Generation for Large Language Models: A Survey. arXiv, 2024. Disponivel em: https://browse.arxiv.org/html/2312.10997v4.
5. ZHAO, Wayne Xin; ZHOU, Kun; LI, Junyi; et al. A Survey of Large Language Models. arXiv, 2024. Disponivel em: https://arxiv.org/html/2303.18223v14.

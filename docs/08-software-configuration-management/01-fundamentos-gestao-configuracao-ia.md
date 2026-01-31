---
title: "01 - Fundamentos de Gestão de Configuração com IA"
created_at: "2025-01-31"
tags: ["configuracao", "scm", "fundamentos", "ia", "versionamento", "contexto"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 1. Fundamentos de Gestão de Configuração com IA

## Overview

Em sistemas com componentes de IA (incluindo LLMs), a “configuração” deixa de ser sinônimo de “código-fonte” e passa a incluir os insumos e parâmetros que determinam o comportamento do sistema: prompts, políticas, contexto recuperado (RAG), versões de modelo, parâmetros de amostragem e metadados de execução.

Nesta seção, SCM (Software Configuration Management) é tratada como a disciplina que mantém coerência entre (1) o que foi aprovado, (2) o que foi executado e (3) o que é possível auditar e reproduzir. Em uma perspectiva AI-first, o objetivo não é “controlar arquivos”, mas controlar a cadeia de decisão que transforma intenção em artefatos executáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir “item de configuração” para software com componentes de IA (código, contexto e políticas).
2. Descrever o impacto do não determinismo na reprodutibilidade e na investigação de incidentes.
3. Especificar um conjunto mínimo de metadados para rastreabilidade de gerações e decisões.
4. Aplicar regras de governança de mudanças para prompts, modelos, dados de contexto e ambiente.
5. Usar uma matriz de trade-offs para escolher entre flexibilidade e reprodutibilidade.

## 1.1 Escopo: Do Código ao Comportamento Observável

### 1.1.1 Item de Configuracao (CI) em Sistemas com IA

No SCM, um item de configuração (Configuration Item, CI) é qualquer artefato que precisa ser identificado, versionado e controlado porque altera o comportamento ou o risco do sistema.

Em sistemas com IA, o conjunto típico de CIs inclui:

```
Sistema com IA - Exemplos de CIs
├── Codigo-fonte e configuracoes de build
├── Prompts, templates e politicas (policy-as-code)
├── Versoes de modelo (ou identificadores equivalentes)
├── Parametros de geracao (p.ex., temperatura, top_p)
├── Fontes de contexto (corpus), pipelines de ingestao e indices
├── Esquemas de saida (contratos), validadores e oraculos de teste
└── Metadados de execucao e de curadoria humana
```

Definicao operacional: um CI “pertence” ao SCM quando (a) pode provocar regressao, (b) tem impacto de seguranca/compliance, ou (c) e necessario para reproduzir e explicar resultados.

### 1.1.2 Baselines e “Comportamento Versionado”

Em sistemas deterministas, uma baseline e, tipicamente, um snapshot de codigo + dependencias.

Em sistemas com IA, uma baseline precisa incluir, no minimo, os identificadores que permitem reproduzir (ou explicar) o comportamento observado: prompt/politica, modelo, parametros, contexto e criterios de aceitacao.

| Aspecto | SCM Tradicional | SCM com IA |
|---------|-----------------|------------|
| **Foco Principal** | Codigo e build | Cadeia de decisao: codigo + contexto + politicas |
| **Unidade de mudanca** | Arquivo/linha | Artefato + configuracao + evidencia |
| **Auditoria** | Historico de commits | Proveniencia (o que/como/por que) |
| **Baseline** | Snapshot | Snapshot + identificadores de geracao |

## 1.2 Reprodutibilidade sob Nao Determinismo

### 1.2.1 Niveis de Reprodutibilidade

Em pratica, “reproduzir” pode significar coisas diferentes. Use definicoes explicitas:

- Reprodutibilidade exata: mesma saida (quando viavel).
- Reprodutibilidade comportamental: mesma classe de saidas aceitaveis (com oraculos e tolerancias).
- Reprodutibilidade forense: capacidade de explicar por que uma saida ocorreu (mesmo que nao seja repetivel bit a bit).

Em sistemas de alto risco, privilegie reprodutibilidade exata ou, no minimo, reprodutibilidade forense.

### 1.2.2 Estrategias de Controle

Estrategias comuns (independentes de fornecedor) incluem:

1. Fixar identificadores: modelo, prompt/politica, corpus/indice e versoes de dependencias.
2. Registrar parametros: valores que afetam amostragem e limites (p.ex., temperatura, top_p).
3. Controlar contexto: fontes, versoes, criterios de recuperacao e transformacoes.
4. Definir oraculos: testes e validadores que definem “aceitavel” para saidas estocasticas.

Exemplo de manifest (esquematico) para registrar o necessario ao debug:

```json
{
  "run_id": "uuid",
  "timestamp": "2026-01-31T00:00:00Z",
  "model_id": "<identificador-do-modelo>",
  "prompt_id": "<id-ou-hash-do-prompt>",
  "policy_id": "<id-ou-hash-da-politica>",
  "generation_parameters": {
    "temperature": 0.2,
    "top_p": 1.0,
    "max_output_tokens": 2048
  },
  "context": {
    "corpus_version": "<versao>",
    "retrieval_strategy": "<estrategia>",
    "sources": ["<ref-1>", "<ref-2>"]
  },
  "output": {
    "format": "<contrato>",
    "hash": "sha256:<...>"
  },
  "approvals": {
    "required": true,
    "approved_by": "<id-humano>",
    "decision": "approved|rejected",
    "rationale": "<texto-curto>"
  }
}
```

### 1.2.3 Trade-offs e Regras de Decisao

| Abordagem | Beneficio | Custo |
|-----------|------|---------|
| Fixacao rigida (modelo/prompt/contexto) | Debug e auditoria mais fortes | Menos flexibilidade e mais operacao |
| Parametros conservadores | Menos variancia em producao | Pode reduzir cobertura de casos |
| Contexto dinamico | Respostas mais atualizadas | Mais dificil reproduzir e explicar |

Regra pratica: quanto maior a responsabilidade legal e o impacto de falha, maior deve ser o investimento em rastreabilidade e reprodutibilidade.

## 1.3 Rastreabilidade: Cadeia de Custodia da Geracao

### 1.3.1 Proveniencia como Primeiro-Class Citizen

Rastreabilidade significa responder, de forma verificavel, a perguntas do tipo:

- Qual requisito (ou decisao) motivou este artefato?
- Que contexto e politicas foram aplicados?
- Quem aprovou e com base em qual criterio?

```
Código Gerado
    ↑
Prompt/Politica (id/hash)
    ↑
Modelo (id/versao)
    ↑
Contexto (corpus/indice/sources)
    ↑
Parametros (amostragem/limites)
    ↑
Curadoria Humana (id/decisao)
    ↑
Timestamp
```

Essa cadeia e a base para auditoria, analise de impacto e reproducao forense.

### 1.3.2 Metadados Minimos

Evite “logs narrativos” como unica fonte. Prefira metadados estruturados com:

- identificadores (ids/hashes),
- referencias (artefatos de entrada),
- decisoes (quem aprovou e por que),
- evidencias (testes/validadores executados).

## Practical Considerations

### Checklist Mínimo (Reader-First)

1. Defina CIs: prompt/política, modelo, contexto, validadores e ambiente.
2. Exija rastreabilidade: todo artefato em produção deve apontar para um run_id e uma baseline.
3. Separe ambientes: desenvolvimento pode aceitar maior variância; produção deve ser mais controlada.
4. Trate mudanças de contexto/modelo como mudanças de risco: aplique gates proporcionais.
5. Planeje retenção: logs e metadados devem suportar investigação e auditoria pelo período exigido.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Critica |

## Summary

- Em sistemas com IA, SCM deve controlar a cadeia de decisao (codigo + contexto + politicas), nao apenas arquivos.
- Reprodutibilidade precisa ser definida (exata, comportamental, forense) e aplicada por criticidade.
- Rastreabilidade depende de metadados estruturados e de baselines auditaveis.
- Mudancas de modelo/contexto/prompt exigem governanca proporcional ao risco.

## References

1. ISO. ISO 10007:2017. Quality management systems — Guidelines for configuration management. Geneva: ISO, 2017.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 828:2012. Systems and software engineering — Configuration management. Geneva: ISO, 2012.
3. ISO/IEC/IEEE. ISO/IEC/IEEE 12207:2017. Systems and software engineering — Software life cycle processes. Geneva: ISO, 2017.
4. W3C. PROV-O: The PROV Ontology. W3C Recommendation, 2013. Disponivel em: https://www.w3.org/TR/prov-o/
5. NIST. AI Risk Management Framework 1.0. Gaithersburg: National Institute of Standards and Technology, 2023.

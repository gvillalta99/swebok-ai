---
title: "02 - Versionamento de Modelos, Prompts e Contexto"
created_at: "2025-01-31"
tags: ["versionamento", "prompts", "modelos", "contexto", "git", "llm"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 2. Versionamento de Modelos, Prompts e Contexto

## Overview

Versionar “o sistema” passa a exigir versionar tambem os elementos que governam a geracao: prompts e politicas, identificadores de modelo, parametros de execucao e o contexto (fontes de conhecimento, indices e transformacoes).

O objetivo desta secao e oferecer um modelo pratico para tratar esses artefatos como itens de configuracao (CIs), definindo o que deve ser versionado, com qual granularidade e quais evidencias precisam acompanhar cada mudanca para permitir auditoria e rollback.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir uma taxonomia de artefatos versionaveis (prompts/politicas, modelos, contexto, contratos).
2. Aplicar regras de versionamento e de compatibilidade para prompts e contratos de saida.
3. Descrever como versionar “contexto” (corpus, ingestao, indexacao) de forma auditavel.
4. Planejar mudancas com rollback seguro (codigo + configuracao + evidencia).
5. Evitar anti-padroes comuns (versionamento apenas do texto do prompt, sem baseline de contexto).

## 2.1 Prompts e Politicas como Itens de Configuracao

### 2.1.1 Definicao Operacional

Prompts e politicas sao artefatos que podem introduzir regressao funcional, risco de seguranca e mudanca de comportamento. Portanto, devem:

- ter identificador estavel (id ou hash),
- ter historico de mudancas (changelog),
- ter criterios de aceitacao e testes associados,
- ter politica de aprovacao proporcional ao risco.

### 2.1.2 Granularidade e Separacao de Responsabilidades

Para reduzir ruído e melhorar revisao, separe:

- instrucao de sistema (papel, restricoes gerais),
- instrucao de tarefa (objetivo e formato),
- exemplos (quando aplicavel),
- contratos (schema de saida, tolerancias),
- politicas (o que e proibido; o que exige aprovacao humana).

Estrutura ilustrativa (conceitual):

```
prompts/
├── system/
├── tasks/
├── policies/
├── examples/
└── contracts/
```

Nao confunda “template” com “artefato versionado”: o que se versiona e o comportamento pretendido (com evidencia), nao apenas o arquivo.

### 2.1.3 Regras de Versionamento e Compatibilidade

Para prompts, um SemVer adaptado pode ser util se houver consumidores e contratos de saida:

- MAJOR: quebra de contrato (schema, semantica de campos, invariantes).
- MINOR: extensao retrocompativel (novo campo opcional, novo caso coberto).
- PATCH: ajuste sem mudar contrato (clareza, correcoes locais, melhoria de exemplos).

Para contexto (corpus/indice), a versao deve refletir mudancas que impactam recuperacao e respostas (ex.: reindexacao, mudanca de chunking, remocao de fontes).

Para modelos, use o identificador que permita rastrear a versao efetivamente usada na execucao.

Exemplo de changelog minimalista (conceitual):

```yaml
id: "task-summarize"
version: "1.2.0"
changes:
  - type: "minor"
    rationale: "inclui campo opcional de riscos"
    contract_impact: "add_field_optional"
  - type: "patch"
    rationale: "clareza sobre proibicao de inferencias"
    contract_impact: "none"
```

## 2.2 Versionamento de Contexto (RAG) e Dados de Apoio

### 2.2.1 O Que Significa “Contexto Versionado”

Quando o sistema recupera informacao (RAG), o comportamento depende de:

- corpus (fontes e suas versoes),
- pipeline de ingestao (extracao, normalizacao),
- estrategia de segmentacao (chunking),
- modelo de embeddings e indice,
- estrategia de busca e de reranking.

Para auditoria, versionar “apenas os documentos” nao basta: e preciso versionar a transformacao do documento ate o trecho retornado.

### 2.2.2 Manifesto de Corpus e Indice

Use um manifesto que conecte fontes, transformacoes e resultado de indexacao:

```yaml
corpus_id: "kb-prod"
corpus_version: "2026-01-31"
sources:
  - ref: "<fonte-1>"
    version: "<versao>"
pipeline:
  extraction: "<processo>"
  chunking: "<estrategia>"
  normalization: "<regras>"
index:
  embedding_model_id: "<id>"
  index_version: "<versao>"
```

## 2.3 Cadeias de Prompts e Workflows de Geracao

### 2.3.1 Versionamento de Workflow como Unidade

Quando uma saida depende de multiplas etapas (classificacao -> recuperacao -> geracao -> validacao), a unidade de versionamento e o workflow, nao apenas um prompt isolado.

Definicao: um workflow versionado especifica passos, contratos intermediarios e criterios de parada/escalao.

Checklist do workflow versionado:

1. Entradas: schemas e fontes.
2. Passos: ordem, condicoes e contratos.
3. Saidas: schema final e tolerancias.
4. Evidencias: testes, validadores e exemplos.
5. Observabilidade: ids e metadados por passo.

## Practical Considerations

### Checklist de Mudanca (Prompt/Contexto/Modelo)

1. Mudanca e isolada e reversivel?
2. O contrato de saida mudou? (se sim, MAJOR).
3. O contexto mudou? (registre corpus/index).
4. Ha regressao em testes/validadores? (se sim, bloquear).
5. Ha aprovacao humana exigida pela criticidade?

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Summary

- Prompts/politicas, modelos e contexto devem ser tratados como CIs.
- Versionamento deve refletir contrato, compatibilidade e risco, nao apenas diffs de texto.
- Workflows multi-etapa precisam ser versionados como unidades coesas.
- Sem manifesto de contexto, rollback e auditoria ficam incompletos.

## References

1. ISO. ISO 10007:2017. Quality management systems — Guidelines for configuration management. Geneva: ISO, 2017.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 828:2012. Systems and software engineering — Configuration management. Geneva: ISO, 2012.
3. SemVer. Semantic Versioning 2.0.0. Disponivel em: https://semver.org/
4. W3C. PROV-O: The PROV Ontology. W3C Recommendation, 2013. Disponivel em: https://www.w3.org/TR/prov-o/

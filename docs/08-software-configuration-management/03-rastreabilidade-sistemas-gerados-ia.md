---
title: 03 - Rastreabilidade em Sistemas Gerados por IA
created_at: '2025-01-31'
tags: [rastreabilidade, proveniencia, auditoria, compliance, metadata]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 3. Rastreabilidade em Sistemas Gerados por IA

## Overview

Em sistemas assistidos por IA, rastreabilidade deixa de ser apenas “requisito ->
codigo -> teste”. Ela passa a incluir a cadeia de geracao: quais entradas,
politicas, modelos e contextos produziram determinado artefato, e quais decisoes
humanas autorizaram sua integracao.

Esta secao define um modelo minimo de rastreabilidade (proveniencia + auditoria
\+ evidencias) aplicavel a codigo, configuracoes, respostas geradas e decisoes de
curadoria, com foco em investigacao de incidentes, compliance e manutencao.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir a cadeia de proveniencia para artefatos gerados por IA (codigo e nao
   codigo).
2. Especificar metadados minimos para reproducao forense.
3. Projetar registros de curadoria (aprovacao/rejeicao) com criterios
   verificaveis.
4. Aplicar lineage para contexto (corpus/indice) e para saidas.
5. Identificar lacunas tipicas de rastreabilidade e como corrigi-las.

## 3.1 Cadeia de Proveniencia

### 3.1.1 O Que Precisa Ser Rastreado

Uma cadeia de proveniencia deve permitir reconstruir (ou explicar) a geracao com
um identificador unico (run_id) e referencias imutaveis (ids/hashes) para
entradas e saidas.

```
Código Gerado (artefato final)
    ↑
Prompt Utilizado (versionado)
    ↑
Modelo LLM (nome, versão, provider)
    ↑
Parâmetros de Geração (temp, seed, etc.)
    ↑
Contexto RAG (documentos, embeddings)
    ↑
Entrada do Usuário (query original)
    ↑
Decisão de Curadoria (quem aprovou, quando, por quê)
```

Evite depender de “memoria humana” para explicar geracoes antigas: a
rastreabilidade precisa ser automatizavel.

### 3.1.2 Identificadores e Integridade

Para garantir integridade:

- atribua ids estaveis (run_id, prompt_id, corpus_version),
- gere hashes para conteudo relevante (prompt, output, contratos),
- registre versoes de transformacoes (ingestao, chunking, indexacao).

```json
{
  "generation_id": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2025-01-31T10:30:00Z",
  "artifacts": {
    "code": {
      "content_hash": "sha256:a1b2c3d4...",
      "loc": 45,
      "language": "python"
    },
    "prompt": {
      "version": "code-gen-v2.3",
      "hash": "sha256:e5f6g7h8...",
      "template": "templates/python-function.j2"
    },
    "model": {
      "name": "gpt-4-turbo",
      "version": "2024-04-09",
      "provider": "openai"
    }
  }
}
```

O uso de hashes criptográficos permite verificar se o conteúdo foi alterado
desde a geração original.

### 3.1.3 Grafo de Proveniencia (Quando a Cadeia nao e Linear)

Em workflows com multiplos passos, a proveniencia vira um DAG. O ganho pratico e
permitir analise de impacto:

- “que saidas dependem deste corpus_version?”,
- “que codigo foi gerado com esta politica?”,
- “quais runs foram aprovadas por este gate?”.

```
[User Query] → [Intent Classification] → [Context Retrieval]
                                              ↓
[Code Output] ← [Generation] ← [Prompt Assembly]
     ↓
[Review] → [Approval/Rejection]
     ↓
[Integration]
```

Cada nó representa uma etapa do processo, e as arestas representam dependências
de dados. Esta estrutura permite:

- Análise de impacto (quais outputs são afetados por uma mudança)
- Debugging (identificar onde a cadeia falhou)
- Auditoria (reconstruir o processo completo)

## 3.2 Metadados de Geracao

### 3.2.1 Conjunto Minimo

Evite metadados excessivos sem uso; comece com o minimo que viabiliza auditoria
e depuracao:

- identificacao: run_id, timestamps, solicitante e aprovador (quando aplicavel),
- configuracao: modelo_id, prompt_id/policy_id, parametros,
- contexto: corpus_version e referencias das fontes usadas,
- evidencia: testes/validadores executados e resultados,
- saida: hash e contrato de saida.

```json
{
  "generation": {
    "id": "uuid-v4",
    "timestamp": "2025-01-31T10:30:00Z",
    "duration_ms": 1250,
    "status": "success"
  },
  "model": {
    "provider": "openai",
    "name": "gpt-4-turbo",
    "version": "2024-04-09",
    "endpoint": "https://api.openai.com/v1/chat/completions"
  },
  "parameters": {
    "temperature": 0.7,
    "top_p": 1.0,
    "seed": 42,
    "max_tokens": 2048,
    "frequency_penalty": 0,
    "presence_penalty": 0
  },
  "prompt": {
    "version": "code-generator-v3.2",
    "system_prompt_hash": "sha256:abc...",
    "user_prompt_hash": "sha256:def...",
    "few_shot_count": 3
  },
  "context": {
    "rag_enabled": true,
    "sources": [
      {"id": "doc-001", "version": "v2.1", "relevance_score": 0.89},
      {"id": "doc-002", "version": "v1.5", "relevance_score": 0.76}
    ],
    "embedding_model": "text-embedding-3-large"
  },
  "output": {
    "hash": "sha256:xyz...",
    "format": "<contrato>",
    "artifact_refs": ["<ref-artefato-1>"]
  }
}
```

### 3.2.2 Estrategias de Captura

**Captura sincrona**: metadados sao coletados durante a geracao

- Prós: Completa, consistente
- Contras: Adiciona latência

**Captura assincrona**: metadados sao coletados em background

- Prós: Mínimo impacto em performance
- Contras: Risco de perda em caso de falha

**Captura Híbrida**: Dados críticos são síncronos, demais são assíncronos

- Balanceamento entre completude e performance

### 3.2.3 Retencao e Acesso

Politicas de retencao precisam ser justificadas por risco, auditoria e
investigacao de incidentes. O ponto editorial aqui e: retenha o suficiente para
reconstruir decisoes; elimine o que nao agrega (inclusive para reduzir exposicao
de dados).

| Tipo de Dado           | Storage Ideal                          | Retenção             |
| ---------------------- | -------------------------------------- | -------------------- |
| Metadados de geração   | Time-series DB (InfluxDB, TimescaleDB) | 2-5 anos             |
| Logs de auditoria      | Immutable storage (S3 Glacier)         | 7+ anos (compliance) |
| Proveniência de código | Graph DB (Neo4j)                       | Indefinida           |
| Métricas de uso        | Data warehouse (BigQuery)              | 1-3 anos             |

## 3.3 Lineage do Contexto (RAG)

### 3.3.1 Pipeline: Documento -> Trecho Recuperado

Em RAG, o “dado usado” nao e apenas o documento, mas o trecho efetivamente
recuperado (após parsing, chunking e busca). Portanto, o lineage deve ligar a
resposta a:

- referencia do documento e versao,
- identificador do chunk,
- versao do indice,
- estrategia de retrieval.

```
Documentos Fonte (PDF, MD, etc.)
    ↓
[Parsing & Chunking]
    ↓
Chunks de Texto (versionados)
    ↓
[Embedding Generation]
    ↓
Vetores (versionados)
    ↓
[Index Building]
    ↓
Índice de Busca (versionado)
    ↓
[Retrieval]
    ↓
Contexto para LLM (referenciado)
    ↓
Resposta Gerada
```

Cada etapa deve ser versionada independentemente, permitindo reconstruir
exatamente qual contexto foi fornecido em uma geração específica.

### 3.3.2 Manifesto de Dataset/Corpus

Datasets utilizados em sistemas de IA devem seguir princípios rigorosos de
versionamento:

```yaml
# dataset-manifest.yaml
dataset_name: "knowledge-base-v2"
version: "2.3.1"
created_at: "2025-01-31"
owner: "data-team@empresa.com"

sources:
  - type: "confluence"
    url: "https://wiki.company.com"
    last_sync: "2025-01-30"
    pages: 1500

  - type: "github"
    repo: "company/docs"
    commit: "a1b2c3d"
    files: 250

processing:
  chunking_strategy: "semantic"
  chunk_size: 512
  overlap: 50
  embedding_model: "text-embedding-3-large"

quality_checks:
  - "duplicate_detection"
  - "pii_scan"
  - "content_freshness"

statistics:
  total_chunks: 15000
  avg_chunk_size: 480
  embedding_dimensions: 3072
```

### 3.3.3 Analise de Impacto

Mudancas em corpus/indice podem alterar respostas sem tocar no codigo. Trate
como mudanca de risco (especialmente quando ha consequencias reguladas).

| Tipo de Mudança         | Impacto Potencial               | Estratégia de Mitigação |
| ----------------------- | ------------------------------- | ----------------------- |
| Adição de documentos    | Novos comportamentos possíveis  | Testes de regressão     |
| Remoção de documentos   | Perda de conhecimento           | Auditoria de coverage   |
| Atualização de conteúdo | Mudanças em respostas           | A/B testing             |
| Mudança em chunking     | Alteração no contexto retornado | Validação de relevance  |
| Novo embedding model    | Mudança semântica no retrieval  | Reindexação completa    |

## 3.4 Audit Trail de Curadoria Humana

### 3.4.1 Decisao como Artefato

O registro de curadoria deve responder: “quem decidiu?”, “o que foi avaliado?” e
“qual evidencia suportou a decisao?”. Evite campos subjetivos como
“confidence_score” sem definicao operacional.

```json
{
  "curator_decision": {
    "decision_id": "uuid",
    "timestamp": "2025-01-31T11:00:00Z",
    "generation_id": "uuid-da-geracao",
    "curator": {
      "id": "engenheiro.silva",
      "email": "silva@empresa.com",
      "role": "senior-engineer"
    },
    "decision": "approved",
    "rationale": "Código atende aos padrões de segurança e performance",
    "review_criteria": [
      {"criterion": "security", "passed": true, "notes": ""},
      {"criterion": "performance", "passed": true, "notes": "O(n log n) aceitável"},
      {"criterion": "maintainability", "passed": true, "notes": ""}
    ],
    "modifications": [
      {
        "type": "refactoring",
        "description": "Renomeada variável x para customerCount",
        "lines_affected": [12, 15, 18]
      }
    ],
    "time_spent_seconds": 300,
    "confidence_score": 0.95
  }
}
```

### 3.4.2 Gates de Aprovacao

Sistemas críticos devem implementar workflows de aprovação estruturados:

```
Geração de Código
    ↓
Validação Automática (linting, tests)
    ↓
Revisão por Pares (obrigatória para código crítico)
    ↓
Aprovação por Tech Lead (para mudanças arquiteturais)
    ↓
Integração no Sistema
```

Cada etapa deve registrar:

- Quem executou a ação
- Quando foi executada
- Qual foi o resultado
- Quaisquer observações relevantes

### 3.4.3 Rejeicao e Aprendizado

Rejeições são tão importantes quanto aprovações para aprendizado:

```json
{
  "decision": "rejected",
  "rejection_reason": "security_vulnerability",
  "details": "Código contém SQL injection vulnerability na linha 23",
  "severity": "high",
  "action_taken": "regenerate_with_constraints",
  "additional_constraints": [
    "Usar parameterized queries obrigatoriamente",
    "Validar todas as entradas de usuário"
  ],
  "follow_up": {
    "required": true,
    "assigned_to": "security-team",
    "due_date": "2025-02-01"
  }
}
```

## 3.5 Governanca (Sem Pressupor Regulacao Especifica)

Em muitos dominios, a rastreabilidade e exigida por combinacao de requisitos:
governanca interna, seguranca, auditoria e normas setoriais. Em vez de assumir
um conjunto fixo de regulacoes, trate rastreabilidade como capacidade
transversal e configure politicas por dominio.

### 3.5.2 Politicas como Codigo (Padrão)

Implementação de frameworks de governança:

**Policy-as-Code**: Regras de compliance codificadas

```yaml
# governance-policy.yaml
policies:
  - name: "pii-detection"
    description: "Bloquear geração contendo PII não autorizada"
    trigger: "pre-generation"
    action: "block"

  - name: "approval-required"
    description: "Requerer aprovação humana para código em produção"
    trigger: "post-generation"
    condition: "environment == 'production'"
    action: "require_approval"

  - name: "audit-logging"
    description: "Logar todas as gerações para auditoria"
    trigger: "always"
    action: "log"
```

### 3.5.3 Auditoria e Relatorios

Sistemas devem suportar geração de relatórios de auditoria:

```json
{
  "audit_report": {
    "period": "2025-01-01 to 2025-01-31",
    "total_generations": 15000,
    "approved": 14200,
    "rejected": 600,
    "pending": 200,
    "average_review_time_seconds": 180,
    "compliance_violations": 12,
    "violations_by_type": {
      "security": 5,
      "performance": 4,
      "maintainability": 3
    }
  }
}
```

## Practical Considerations

### Checklist de Implementacao

1. Defina o “minimo auditavel” (metadados e evidencias) por criticidade.
2. Padronize esquemas (ids/hashes, contratos de saida, referencias de fontes).
3. Garanta imutabilidade onde necessario (logs append-only, assinaturas, WORM).
4. Modele lineage do contexto: documento -> chunk -> indice -> retrieval.
5. Trate curadoria como parte do SCM: decisao e um artefato versionado.

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto      |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Critica   |

## Summary

- Rastreabilidade exige cadeia de proveniencia (inputs, politicas, contexto,
  decisoes e evidencias).
- Metadados minimos devem suportar reproducao forense e auditoria.
- Em RAG, lineage precisa ligar resposta ao trecho recuperado e ao indice usado.
- Curadoria humana deve ser registrada como decisao auditavel.

## References

1. W3C. PROV-O: The PROV Ontology. W3C Recommendation, 2013. Disponivel em:
   <https://www.w3.org/TR/prov-o/>
2. ISO/IEC/IEEE. ISO/IEC/IEEE 828:2012. Systems and software engineering —
   Configuration management. Geneva: ISO, 2012.
3. NIST. AI Risk Management Framework 1.0. Gaithersburg: National Institute of
   Standards and Technology, 2023.

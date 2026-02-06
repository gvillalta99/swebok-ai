---
title: 06 - Ferramentas e Tecnologias Modernas
created_at: '2025-01-31'
tags: [ferramentas, devops, llm-ops, mlflow, dvc, ci-cd]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 6. Ferramentas e Tecnologias Modernas

## Visão Geral

Esta secao descreve capacidades tecnicas (nao produtos) que costumam compor uma
pilha de SCM para sistemas com IA: versionamento de artefatos, registro de
execucoes, observabilidade, enforcement de politicas e rastreabilidade de
contexto.

O foco e oferecer criterios de selecao e padroes de integracao para que a
organizacao escolha ferramentas de acordo com risco, maturidade e restricoes
operacionais, evitando dependencia desnecessaria de fornecedores.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar capacidades necessarias em uma pilha de SCM para IA.
2. Aplicar criterios de selecao (portabilidade, auditabilidade, custo de
   verificacao).
3. Descrever padroes de integracao com pipelines de entrega.
4. Definir artefatos de maturidade (metadados, evidencias, politicas).
5. Construir um roteiro incremental de adocao.

## 6.1 Capacidades Essenciais (Independentes de Fornecedor)

### 6.1.1 Controle de Versao e Artefatos

Um SCM moderno para IA precisa controlar:

- codigo e configuracao,
- prompts/politicas e contratos,
- manifests de contexto (corpus/indice),
- metadados de execucao e de curadoria.

```
Repositório Git Tradicional:
├── src/           (código-fonte)
├── tests/         (testes)
├── docs/          (documentação)
└── config/        (configurações)

Repositório Git para IA:
├── src/           (código-fonte)
├── prompts/       (prompts versionados)
├── models/        (model cards)
├── embeddings/    (referências a embeddings)
├── experiments/   (registro de experimentos)
├── tests/         (testes tradicionais + testes de IA)
└── metadata/      (metadados de geração)
```

### 6.1.2 Armazenamento de Artefatos e Retencao

Artefatos grandes (datasets, indices, logs) raramente cabem em um repositorio de
codigo. O principio e separar:

- repositorio de codigo (mudancas pequenas e frequentes),
- registro de artefatos (enderecamento por hash/versao),
- politicas de retencao (por criticidade e auditoria).

### 6.1.3 Enforcamento de Politicas

O papel de “policy-as-code” no SCM para IA e impedir que mudancas de alto risco
avancem sem evidencias minimas. Exemplos de politicas:

- bloqueio de artefatos sem manifest de contexto,
- exigencia de schema/contrato para saidas geradas,
- aprovacao humana para categorias criticas,
- proibicao de segredos em historico.

## 6.2 Registro de Execucoes, Experimentos e Observabilidade

Em sistemas com IA, rastrear “o que rodou” e parte da configuracao. Capacidades
desejadas:

- registro de runs (run_id, entradas, saidas, baselines),
- comparacao de runs (regressoes e drift),
- correlacao com incidentes e releases,
- observabilidade de custo/latencia/erros.

## 6.3 Integracao com Entrega (CI/CD)

### 6.3.1 Gates de Qualidade

Em pipelines de entrega, gates tipicos para sistemas com IA incluem:

- validacao de manifests (baseline, contexto e metadados),
- validacao de contratos (schemas),
- testes de regressao (conjunto historico),
- checagens de seguranca,
- exigencia de aprovacao humana para mudancas de alto risco.

### 6.3.2 Testes de Reprodutibilidade

Inclua pelo menos um teste de reproducao forense por release: reconstruir uma
execucao a partir de baseline e verificar contratos.

## 6.4 Registro de Experimentos (Quando Aplicavel)

Experimentos (p.ex., ajustes de prompt, mudança de contexto) devem registrar:

- hipotese (o que melhora e por que),
- metodologia (inputs, criterios, tolerancias),
- resultados (evidencias),
- decisao (promover, rejeitar, iterar).

## 6.5 Métricas de Maturidade em Gestão de Configuração

### 6.5.1 Modelo de Maturidade

| Nível | Nome         | Características              | Indicadores                               |
| ----- | ------------ | ---------------------------- | ----------------------------------------- |
| **1** | Inicial      | Versiona código apenas       | Git básico, sem metadados                 |
| **2** | Gerenciado   | Versiona código + prompts    | Prompts em Git, versionamento semântico   |
| **3** | Definido     | Captura metadados de geração | Registro de runs e metadados estruturados |
| **4** | Quantitativo | Rastreabilidade completa     | Proveniência código→origem, audit trails  |
| **5** | Otimizado    | Reprodutibilidade garantida  | CI/CD integrado, auditoria total          |

### 6.5.2 Assessment de Maturidade

```yaml
# maturity-assessment.yaml
assessment_date: "2025-01-31"
assessor: "devops-team"

levels:
  level_1_code_only:
    score: 100
    evidence:
      - "Git repository active"
      - "All code in version control"

  level_2_prompt_versioning:
    score: 85
    evidence:
      - "Prompts in /prompts directory"
      - "Semantic versioning used"
      - "Some prompts lack version tags"

  level_3_metadata_capture:
    score: 60
    evidence:
      - "Registro de execucoes implementado"
      - "Basic metadata captured"
      - "Missing: full provenance chain"

  level_4_full_traceability:
    score: 40
    evidence:
      - "Partial provenance tracking"
      - "Audit trail for critical systems only"
      - "Gap: full chain of custody"

  level_5_guaranteed_reproducibility:
    score: 25
    evidence:
      - "CI/CD partially integrated"
      - "Some reproducibility tests"
      - "Gap: full automation, comprehensive audit"

overall_maturity: 2.4
recommendations:
  - "Implement full metadata capture for all generations"
  - "Extend audit trails to all systems"
  - "Automate reproducibility testing in CI/CD"
  - "Establish governance committee"
```

### 6.5.3 KPIs de Gestão de Configuração

| KPI                            | Definição                             | Target   | Medição     |
| ------------------------------ | ------------------------------------- | -------- | ----------- |
| **Prompt Versioning Coverage** | % de prompts versionados              | > 95%    | Semanal     |
| **Metadata Capture Rate**      | % de gerações com metadados completos | > 90%    | Diária      |
| **Reproducibility Score**      | % de gerações reproduzíveis           | > 99%    | Por release |
| **Audit Trail Completeness**   | % de decisões auditáveis              | > 95%    | Mensal      |
| **Mean Time to Reproduce**     | Tempo médio para reproduzir ambiente  | < 30 min | Por sprint  |
| **Configuration Drift**        | Número de divergências ambiente       | < 5      | Mensal      |

### 6.5.4 Roadmap (Estruturado, Nao Calendario)

1. Basico: prompts/politicas versionados e revisados.
2. Intermediario: metadados estruturados e manifests de contexto.
3. Avancado: proveniencia completa + auditoria + testes de regressao.

## Considerações Práticas

### Aplicações Reais

1. **Adocao gradual**: comece com controle de versao + registro de execucoes
   antes de ampliar a pilha.

2. **Integração com Legado**: Ferramentas modernas devem coexistir com SCM
   tradicional.

3. **Treinamento**: Equipes precisam de capacitação em novas ferramentas e
   práticas.

4. **Custo**: Avalie TCO incluindo licenças, infraestrutura e treinamento.

5. **Portabilidade**: Priorize dados exportaveis e formatos padronizados.

### Limitações

- **Fragmentação**: Ecossistema ainda fragmentado com muitas ferramentas
  emergentes.
- **Maturidade**: Algumas ferramentas ainda em beta ou com APIs instáveis.
- **Integração**: Conectar ferramentas diferentes requer trabalho de integração.
- **Curva de Aprendizado**: Novas ferramentas adicionam complexidade para
  equipes.

### Melhores Praticas

1. Comece por políticas, metadados e manifests; ferramentas vêm depois.
2. Padronize formatos e contratos para reduzir integração ad hoc.
3. Automatize gates e colete evidências no pipeline de entrega.
4. Reavalie ferramentas por critérios (auditabilidade, custo, portabilidade).

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Alta      |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Medio     |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Moderada  |

## Resumo

- Ferramentas tradicionais (Git) são fundamentais mas requerem extensões para IA
- Uma pilha de registro/observabilidade complementa o SCM ao conectar baseline,
  execucao e evidencia
- CI/CD para sistemas gerados deve incluir validação de prompts e testes de
  reprodutibilidade
- Registro estruturado de experimentos é essencial para aprendizado
  organizacional
- Modelos de maturidade ajudam a avaliar e guiar evolução de práticas

## Ver tambem

- [KA 02 - Arquitetura de Sistemas Hibridos](../02-software-architecture/index.md)
- [KA 06 - Operacoes de Engenharia](../06-software-engineering-operations/index.md)
- [KA 10 - Processos de Engenharia](../10-software-engineering-process/index.md)

## Referências

1. ISO. ISO 10007:2017. Quality management systems — Guidelines for
   configuration management. Geneva: ISO, 2017.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 828:2012. Systems and software engineering —
   Configuration management. Geneva: ISO, 2012.
3. NIST. AI Risk Management Framework 1.0. Gaithersburg: National Institute of
   Standards and Technology, 2023.

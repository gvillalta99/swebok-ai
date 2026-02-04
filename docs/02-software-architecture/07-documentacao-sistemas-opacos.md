---
title: "Documentação de Sistemas Opacos"
created_at: "2026-01-31"
tags: ["arquitetura", "documentacao", "sistemas-opacos", "transparencia", "model-cards", "prompt-engineering"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# Documentação de Sistemas Opacos

## Contexto
A máxima "código limpo é auto-documentável" morreu. Em sistemas baseados em LLMs, a lógica de negócio não reside mais em `if/else` legíveis, mas em pesos probabilísticos (weights) e vetores de atenção opacos. Ler o código Python que chama a API da OpenAI não explica *por que* o sistema decidiu aprovar um crédito ou negar um reembolso.

A documentação na Era da IA deixa de ser sobre *sintaxe* e passa a ser sobre *intenção, linhagem e restrições*. Se você não documentar o prompt, os dados de RAG e os critérios de rejeição, você não tem um software; você tem uma caixa preta não auditável que é um passivo jurídico esperando para explodir.

## Learning Objectives
*   **Migrar** de documentação de código (Javadoc/pydoc) para documentação de comportamento e intenção.
*   **Implementar** Model Cards e System Cards como requisitos de deploy, não artefatos burocráticos.
*   **Rastrear** a linhagem de dados (Data Lineage) para garantir que alucinações possam ser depuradas até a fonte.
*   **Formalizar** o "Espaço Negativo": documentar explicitamente onde e por que a IA *não* é utilizada.

## O Paradigma Shift: De Sintaxe para Semântica

| Documentação Tradicional (v4) | Documentação SWEBOK-AI (v5) |
|-------------------------------|-----------------------------|
| **Foco:** Como a função executa (algoritmo). | **Foco:** Por que o prompt foi desenhado assim (intenção). |
| **Artefato:** Comentários inline, UML. | **Artefato:** Prompt Catalog, Model Cards, RAG Manifest. |
| **Verdade:** O código fonte. | **Verdade:** O dataset de treino/contexto e os testes de avaliação (evals). |
| **Drift:** Código desatualizado em relação à doc. | **Drift:** Modelo mudou comportamento (drift estocástico) sem mudança de código. |

---

## Conteúdo Técnico

### 1. Model Cards e System Cards (A "Bula" do Remédio)
Não invente formatos. Adote o padrão da indústria (Google/Hugging Face) para documentar o que você está rodando. Um modelo sem card não sobe para produção.

*   **Model Card:** Focado no artefato técnico (ex: GPT-4o, Llama-3-70b).
    *   *Limitações:* "Não sabe matemática complexa", "Corte de conhecimento em 2023".
    *   *Viés:* "Tende a gerar código Python verboso".
*   **System Card:** Focado no produto final que usa o modelo.
    *   *Human-in-the-loop:* Onde o humano entra?
    *   *Fallbacks:* O que acontece se a API cair ou o score de confiança for baixo?

### 2. Catálogo de Prompts (Prompts as Config)
Prompts são a nova lógica de negócio. Eles não podem ficar hardcoded em strings espalhadas pelo código.
*   **Versionamento:** Prompts devem ter versões (v1.0, v1.1) e changelog. "Adicionada instrução para negar solicitações em JSON inválido".
*   **Intenção:** Cada bloco do prompt deve ter um comentário explicando o *porquê*.
    *   *Exemplo:* "A instrução 'pense passo a passo' foi adicionada para reduzir alucinações em cálculos de juros (Issue #402)."
*   **Few-Shot Examples:** Documente a origem dos exemplos usados no prompt. Eles são dados reais anonimizados? São sintéticos?

### 3. Linhagem de Dados (Data Lineage)
Em sistemas RAG (Retrieval-Augmented Generation), a resposta da IA é função direta dos documentos recuperados.
*   **Traceability:** Se o bot respondeu "X", qual chunk de documento (ID, versão, autor) gerou isso?
*   **Exclusão:** Como garantimos que documentos obsoletos ou revogados legalmente não estão mais no índice vetorial? Documente o processo de *unlearning* ou reindexação.

### 4. O "Espaço Negativo" (Why NOT AI)
Tão importante quanto documentar onde usamos IA, é documentar onde **proibimos** seu uso.
*   **Decisões de Arquitetura (ADR):** "Decidimos usar regex determinístico para validação de CPF, e não LLM, devido ao custo e risco de erro probabilístico."
*   **Zonas de Exclusão:** Criptografia, autenticação, cálculos financeiros de precisão, decisões de vida ou morte.

---

## Checklist Prático (O que fazer amanhã)

1.  [ ] **Centralizar Prompts:** Mover todos os prompts hardcoded para arquivos de configuração (YAML/JSON) ou um CMS de prompts.
2.  [ ] **Criar System Card:** Escrever um documento de 1 página descrevendo as limitações do seu principal recurso de IA.
3.  [ ] **Versionar Contexto:** Se você usa RAG, o índice vetorial tem versão? Se o cliente reclamar de uma resposta de ontem, você consegue reproduzir o estado do índice daquele momento?
4.  [ ] **Documentar Fallbacks:** Onde está escrito o que o sistema faz quando a LLM alucina ou falha? (Ex: "Transfere para humano", "Retorna erro genérico").
5.  [ ] **Logar Inputs/Outputs:** Garantir que *todo* par prompt/response seja logado com ID de correlação para auditoria (respeitando PII).
6.  [ ] **Definir Owner:** Quem é o CPF responsável por atualizar o System Card quando o modelo for atualizado?

---

## Armadilhas Comuns

*   **Documentar o Output:** Tentar descrever "o que o bot diz". Inútil, pois muda a cada execução. Documente as *restrições* impostas ao bot.
*   **Confiar na Auto-Explicação:** Pedir para o modelo explicar "por que você escolheu isso?". LLMs confabulam racionalizações convincentes mas falsas. Não use isso como log de auditoria.
*   **Esquecer o Custo:** Não documentar a estimativa de tokens. Um prompt mal otimizado pode custar 10x mais. Documente o custo esperado por transação.
*   **Ignorar o Drift de Modelo:** O modelo da OpenAI/Anthropic muda por trás da API. Se sua documentação assume o comportamento de 6 meses atrás, ela é perigosa.

---

## Exemplo Mínimo: Sistema de Análise Contratual

**Cenário:** Um sistema que lê PDFs de contratos e extrai cláusulas de multa.

**Decisão Arquitetural (ADR-012):**
*   **Modelo:** GPT-4-Turbo (temperatura 0).
*   **Restrição:** O modelo **apenas extrai** texto. O cálculo do valor da multa é feito por código Python determinístico.
*   **Justificativa:** LLMs falham em aritmética. Precisamos de auditabilidade contábil.
*   **Lineage:** Cada extração deve vir acompanhada da página e parágrafo do PDF original (citação obrigatória).

**Documentação do Prompt (v2.1):**
```yaml
prompt_id: contract_extraction_v2
intent: "Extrair cláusulas de rescisão sem interpretar valores."
constraints:
  - "Não converta moedas."
  - "Se a cláusula for ambígua, retorne NULL."
changelog:
  - "v2.1: Adicionado few-shot example de contrato de leasing (fix erro #99)."
```

---

## Resumo Executivo

*   **Código não conta a história toda:** Em IA, o comportamento emerge da interação entre Modelo + Prompt + Dados. Documente essa tríade.
*   **Prompts são ativos de engenharia:** Trate-os com a mesma rigo de versionamento e review que o código C++.
*   **Transparência é segurança:** System Cards protegem a empresa ao explicitar o que o sistema *não* consegue fazer.
*   **Rastreabilidade é lei:** Em RAG, saber qual documento gerou a resposta é obrigatório para debugging e compliance.
*   **Defina o não-uso:** Documente explicitamente onde a IA é proibida para evitar "creep" de uso indevido por desenvolvedores júnior.

## Próximos Passos

*   Estudar o framework **CLeAR** (Comparable, Legible, Actionable, Robust) para documentação de IA.
*   Implementar ferramentas de **LLM Observability** (ex: LangSmith, Arize) para gerar documentação viva de latência e qualidade.
*   Revisar o capítulo de **Engenharia de Restrições** para alinhar a documentação com os guardrails implementados.

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos mudarão, mas a necessidade de explicar *por que* e *como* usamos (compliance) só aumentará. |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Médio**. Requer revisão humana qualificada para garantir que a documentação reflete a realidade estocástica. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica**. Documentação falha ou ausente em sistemas de decisão opaca é passivo jurídico imediato. |

## References
1.  Mitchell, M., et al. (2019). "Model Cards for Model Reporting." FAT* 2019.
2.  Google. (2023). "The PaLM 2 Technical Report" (Exemplo de System Card).
3.  Hugging Face. "Model Card Guide".
4.  OpenAI. "System Card for GPT-4".

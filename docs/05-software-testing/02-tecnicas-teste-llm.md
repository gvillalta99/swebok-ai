---
title: "Técnicas de Teste para LLMs"
created_at: "2025-01-31"
tags: ["software-testing", "llm", "metamorphic-testing", "property-based-testing", "differential-testing", "fuzzing"]
status: "review"
updated_at: "2026-02-04"
ai_model: "openai/gpt-5.2"
---

# Técnicas de Teste para Sistemas com LLMs

A engenharia de software tradicional baseia-se em determinismo: para uma entrada $X$, esperamos sempre a saída $Y$. Com LLMs, essa premissa colapsa. O mesmo prompt pode gerar respostas diferentes, e "correto" é frequentemente subjetivo ou contextual. Testar sistemas baseados em LLM não é sobre garantir a *exatidão do bit*, mas sobre garantir a *confiabilidade do comportamento* e a *aderência a restrições*. Se você está tentando dar `assert_equal` em strings geradas por IA, você já falhou.

## A Distinção Crítica: Modelo vs. Sistema

Antes de escolher a ferramenta, entenda o alvo. Confundir avaliação de modelo com teste de sistema é a causa raiz de pipelines de CI/CD instáveis e inúteis.

### 1. Testar o Modelo (Model Evaluation)
*   **Objetivo:** Medir a qualidade intrínseca das respostas (precisão, coerência, alucinação).
*   **Ambiente:** Offline, batch, lento.
*   **Métrica:** Score (0-100), F1-Score, Semantic Similarity.
*   **Ferramenta:** Golden Datasets, LLM-as-a-Judge.

### 2. Testar o Sistema (System Testing)
*   **Objetivo:** Garantir que a aplicação em torno do modelo é robusta, segura e funcional, independente da "criatividade" do modelo.
*   **Ambiente:** CI/CD, online, rápido.
*   **Métrica:** Pass/Fail, Schema Validation, Latency, Error Rate.
*   **Ferramenta:** Property-Based Testing, Contract Testing, Guardrails.

---

## Técnicas Essenciais

### 1. Golden Datasets (A Verdade Terrestre)
Não confie em "vibe check". Você precisa de um conjunto de dados curado (inputs e outputs esperados) que defina o comportamento aceitável.
*   **Curadoria Humana:** Especialistas do domínio criam os pares ideais de Pergunta/Resposta.
*   **Synthetic Data:** Use um modelo maior (ex: GPT-4) para gerar casos de teste para um modelo menor (ex: Llama-3-8B), mas valide uma amostra manualmente.
*   **Evolução:** O dataset deve crescer com os *edge cases* encontrados em produção.

### 2. Property-Based Testing (PBT) para Saídas Estruturadas
Se o seu sistema espera JSON, XML ou SQL do LLM, testes unitários estáticos são insuficientes. O PBT verifica se a saída obedece a *propriedades* invariantes, não se ela é idêntica a uma string fixa.
*   **Schema Compliance:** A saída valida contra o Pydantic/Zod schema?
*   **Sanity Checks:** Se pedi uma lista de 5 itens, a lista tem tamanho 5? Os preços são positivos? As datas existem?
*   **Ferramentas:** `Hypothesis` (Python), `fast-check` (JS).

### 3. Teste Metamórfico (Metamorphic Testing)
Resolve o problema da falta de oráculo (quando não sabemos a resposta exata). Verificamos a *relação* entre mudanças na entrada e mudanças na saída.
*   **Exemplo de Tradução:** Traduzir PT $\to$ EN $\to$ PT deve resultar em um texto semanticamente similar ao original.
*   **Exemplo de RAG:** Adicionar texto irrelevante ao contexto *não* deve alterar a resposta (Invariância).
*   **Exemplo de Classificação:** Mudar nomes de entidades (ex: "João" para "Maria") *não* deve alterar o sentimento da frase.

### 4. Automated Red Teaming
Não espere o usuário quebrar seu sistema. Ataque-o proativamente.
*   **Jailbreak Attempts:** Tente forçar o modelo a gerar conteúdo tóxico ou ilegal.
*   **Prompt Injection:** Injete comandos que tentam sobrescrever as instruções do sistema.
*   **Fuzzing Semântico:** Gere variações de inputs válidos (mas estranhos) para testar a robustez dos parsers e da lógica de negócio.

---

## Checklist Prático: O Que Fazer Amanhã

1.  [ ] **Separar Pipelines:** Criar um pipeline de *smoke test* rápido (schema, latência) para cada commit e um pipeline de *eval* profundo (golden dataset) noturno.
2.  [ ] **Criar Golden Dataset:** Selecionar 50 exemplos reais de produção (bons e ruins) e definir a resposta ideal.
3.  [ ] **Implementar Validadores Estruturais:** Adicionar validação rígida (Pydantic/Zod) na saída do LLM. Se falhar, o teste falha.
4.  [ ] **Adicionar Teste de Regressão:** Para cada bug de alucinação reportado, adicionar um caso no Golden Dataset.
5.  [ ] **Configurar LLM-as-a-Judge:** Usar um modelo superior (ex: GPT-4o) para dar nota (0-5) nas respostas do seu modelo de produção em ambiente de teste.
6.  [ ] **Monitorar Custo de Teste:** Testes de LLM custam dinheiro (tokens). Otimize o tamanho do dataset de CI.
7.  [ ] **Definir Limites de Latência:** O teste deve falhar se o Time-to-First-Token (TTFT) exceder o SLA.

---

## Armadilhas Comuns (Anti-Patterns)

*   **O "Vibe Check" Manual:** O desenvolvedor roda o prompt 3 vezes, acha "legal" e dá merge. Isso não escala e não pega regressões sutis.
*   **Assert Exact Match:** Tentar comparar strings exatas (`assert response == "Hello World"`). O modelo vai mudar um espaço ou pontuação e quebrar seu CI. Use similaridade semântica ou verificação de substrings chave.
*   **Ignorar o Determinismo (Temperature):** Rodar testes com `temperature > 0` sem repetir a execução estatisticamente. Para testes reprodutíveis, force `temperature=0` ou `seed` fixa (quando disponível).
*   **Testar Apenas o Caminho Feliz:** Esquecer de testar como o sistema reage quando o LLM recusa uma resposta (safety refusal) ou alucina um formato inválido.
*   **Dependência de Modelo Único:** Seus testes passam no GPT-4 mas quebram no Claude 3.5? Seu prompt está *overfitted*.

---

## Exemplo Mínimo: Validação de Extrator de Entidades

**Cenário:** Um sistema que extrai nomes de empresas e CNPJs de textos jurídicos.

**Abordagem Ruim (Exact Match):**
```python
def test_extraction():
    text = "A empresa TechCorp Ltda, CNPJ 12.345.678/0001-90..."
    result = extract(text)
    # Frágil: falha se o modelo devolver "TechCorp" em vez de "TechCorp Ltda"
    assert result == {"empresa": "TechCorp Ltda", "cnpj": "12.345.678/0001-90"}
```

**Abordagem Robusta (Property-Based + Semantic):**
```python
def test_extraction_properties():
    text = "A empresa TechCorp Ltda, CNPJ 12.345.678/0001-90..."
    result = extract(text)
    
    # 1. Validação de Estrutura (Schema)
    assert "empresa" in result
    assert "cnpj" in result
    
    # 2. Validação de Propriedade (Formato)
    assert validate_cnpj_format(result["cnpj"]) # Função determinística de validação
    
    # 3. Validação Semântica (Relaxada)
    assert "TechCorp" in result["empresa"] 
    
    # 4. Metamorphic (Invariância)
    text_upper = text.upper()
    result_upper = extract(text_upper)
    # O CNPJ extraído deve ser idêntico, independente da caixa do texto
    assert clean_cnpj(result["cnpj"]) == clean_cnpj(result_upper["cnpj"])
```

---

## Resumo Executivo

*   **Determinismo é Passado:** Aceite a natureza probabilística e projete testes para validar *comportamentos* e *restrições*, não strings exatas.
*   **Camadas de Teste:** Separe testes de infraestrutura (o sistema funciona?) de avaliações de qualidade (o modelo é inteligente?).
*   **Automação é Mandatória:** Use LLMs para testar LLMs (LLM-as-a-Judge) e gerar dados sintéticos, mas mantenha supervisão humana no Golden Dataset.
*   **Estrutura > Conteúdo:** Priorize validar se a saída respeita o schema (JSON/XML) antes de validar a nuance semântica.
*   **Defesa em Profundidade:** Combine Golden Datasets (precisão), Red Teaming (segurança) e Metamorphic Testing (robustez).

## Próximos Passos

*   Estudar **RAG Evaluation Frameworks** (Ragas, TruLens) para métricas específicas de recuperação e geração.
*   Implementar **Guardrails** (NeMo Guardrails, Guardrails AI) como camada de teste em tempo de execução.
*   Explorar **Fine-tuning de Modelos de Avaliação** para reduzir custos e dependência de modelos proprietários gigantes.

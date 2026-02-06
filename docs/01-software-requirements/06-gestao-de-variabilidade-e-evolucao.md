---
title: Gestão de Variabilidade e Evolução
created_at: '2025-01-31'
tags: [variabilidade, evolucao, manutencao, versionamento, traceability, change-management]
status: in-progress
updated_at: '2026-02-04'
ai_model: openai/gpt-5.2
---

# Gestão de Variabilidade e Evolução

## Contexto

Em software tradicional, se você não mexer no código, ele não muda. Em IA, mesmo
que você não toque em nada, o sistema muda. Modelos são atualizados (drift
externo), dados mudam (drift de conceito) e a distribuição dos prompts dos
usuários evolui. Gerenciar variabilidade em IA não é só Git; é gerenciar a
entropia de um sistema aberto. Se você não versionar o prompt, a temperatura, a
versão do modelo e os dados do RAG juntos, você não tem reprodutibilidade. Você
tem magia.

## Fontes de Caos (Variabilidade)

### 1. O Modelo Muda (Model Drift)

A OpenAI lança o `gpt-4-turbo-0125` e de repente seu prompt que funcionava
perfeitamente para gerar JSON começa a devolver Markdown. **Solução:** Sempre
fixe a versão da API (`gpt-4-0613` em vez de `gpt-4`). Nunca use `latest` em
produção.

### 2. O Prompt Muda

Engenheiros mudam prompts diretamente em produção para "corrigir um bug rápido".
Resultado: Ninguém sabe qual prompt gerou qual resposta no log de ontem.
**Solução:** Prompts são código. Devem estar no repo, não em variáveis de
ambiente soltas ou no banco de dados sem histórico.

### 3. Os Dados Mudam (RAG)

O documento PDF de política de reembolso mudou. A IA agora responde com base no
novo ou no velho? Depende de quando o índice vetorial foi atualizado.

## Estratégias de Versionamento

### Configuração como Código

Seu sistema de IA é definido por uma tupla de configuração:
`Config = (Modelo_Ver, Prompt_Hash, Temperature, RAG_Index_Ver)`

Qualquer alteração em um desses quatro elementos cria uma nova "release" do
comportamento do sistema.

### Testes de Regressão Semântica

Como saber se o novo prompt é melhor? Não confie no "olhômetro". Rode o novo
prompt contra 100 casos de teste (Golden Dataset) e meça se a precisão aumentou
ou diminuiu.

## Checklist Prático

Como manter a sanidade em sistemas estocásticos:

1. [ ] **Use "Pinned Versions" Sempre:** Proíba o uso de aliases como `latest`,
   `stable` ou versões default. Especifique o snapshot exato do modelo.
2. [ ] **Prompt Registry:** Use um sistema para versionar prompts (pode ser Git
   simples ou ferramentas como LangSmith/PromptLayer).
3. [ ] **Logue o "Snapshot de Configuração":** Cada log de inferência deve dizer
   exatamente qual configuração gerou aquele output.
4. [ ] **Monitore o Drift:** Configure alertas se a distribuição das respostas
   mudar drasticamente (ex: tamanho médio da resposta caiu 50%).
5. [ ] **Feature Flags para Prompts:** Nunca faça deploy de um prompt novo para
   100% dos usuários. Use Canary Deploy (1% -> 10% -> 100%).

## Armadilhas Comuns

- **Prompt no Banco de Dados:** Guardar prompts em colunas de texto sem
  histórico de alteração. Se quebrar, não tem rollback.
- **Ajuste Fino (Fine-tuning) Prematuro:** Tentar resolver variabilidade
  treinando um modelo próprio antes de exaurir a engenharia de prompt e RAG.
  Fine-tuning é caro e difícil de manter.
- **Ignorar a Temperatura:** Deixar a temperatura em default (geralmente 0.7 ou
  1.0) para tarefas que exigem determinismo (extração de dados). Use
  `temperature=0`.
- **Medo de Atualizar:** Ficar preso no `gpt-3.5-legacy` para sempre porque tem
  medo de quebrar o prompt. Evolução é obrigatória; crie testes para perder o
  medo.

## Exemplo Mínimo: Versionamento de Prompt em Código

**Cenário:** Classificador de sentimentos.

**Abordagem:** Versionamento via código (Git) e classes.

```python
# prompts/sentiment/v1.py
class SentimentPromptV1:
    model = "gpt-3.5-turbo-0613"
    temperature = 0.0
    template = "Classifique como POSITIVO ou NEGATIVO: {text}"

# prompts/sentiment/v2.py
class SentimentPromptV2:
    model = "gpt-4-0125-preview" # Upgrade de modelo
    temperature = 0.0
    template = """
    Analise o sentimento do texto abaixo.
    Responda em JSON: {"sentiment": "POS|NEG", "confidence": 0-1}.
    Texto: {text}
    """
```

**Trade-offs:**

- **Pró:** O código fonte é a fonte da verdade. Rollback é `git revert`.
- **Contra:** Requer deploy para mudar um prompt. (Isso é bom! Evita mudanças a
  quente sem teste).

## Resumo Executivo

- **IA não é estática:** Prepare-se para manutenção constante. O sistema degrada
  se você não cuidar.
- **Prompts são Software:** Versionamento, Review, Teste e Deploy. Trate-os com
  o mesmo rigor do código C++.
- **Pinned Versions:** É a única forma de ter o mínimo de determinismo.
- **Observabilidade de Configuração:** Saiba exatamente o que estava rodando
  quando o erro aconteceu.
- **Regressão Automatizada:** Se você não tem testes automatizados de avaliação
  (Evals), você não pode evoluir o sistema com segurança.

## Próximos Passos

- Explorar ferramentas de **LLM Ops** (MLflow, LangSmith) para automatizar o
  rastreio.
- Ler sobre **Avaliação de RAG** para entender como versionar a base de
  conhecimento.
- Implementar um pipeline de **CI/CD para Prompts**.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                                                |
| :------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Média.** Ferramentas vão mudar, mas o princípio de gestão de configuração é eterno.                                    |
| **Custo de Verificação**        | **Médio.** Evals automatizadas custam dinheiro (tokens), mas são mais baratas que engenheiros testando na mão.           |
| **Responsabilidade Legal**      | **Alta.** Se você não consegue reproduzir o erro porque não sabe a versão do prompt, você tem um problema de compliance. |

## Ver tambem

- [KA 02 - Arquitetura de Sistemas Hibridos](../02-software-architecture/index.md)
- [KA 05 - Verificacao e Validacao em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Metricas](../15-software-engineering-economics/index.md)

## Referências

1. **Huyen, C.** *Designing Machine Learning Systems*. O'Reilly Media.
2. **Google**. *Machine Learning Ops (MLOps): Continuous delivery and automation
   pipelines in machine learning*.
3. **Sculley, D. et al.** *Hidden Technical Debt in Machine Learning Systems*.
   NeurIPS.

---
title: Gestão de Variabilidade e Evolução
created_at: '2025-01-31'
tags: [variabilidade, evolucao, manutencao, versionamento, traceability, change-management]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Gestão de Variabilidade e Evolução

## Contexto

Em software tradicional, a mudança de comportamento tende a decorrer de
alterações explícitas no código. Em sistemas baseados em IA, o comportamento
também varia por fatores exógenos: atualização de modelos, drift de dados,
mudanças na distribuição de prompts e evolução da base de conhecimento em RAG.
Portanto, gerir variabilidade não se limita a versionar código-fonte; exige
governança da configuração completa de inferência.

Sem versionamento conjunto de modelo, prompt, parâmetros de geração e versão do
índice de recuperação, não há reprodutibilidade operacional nem auditabilidade.

## Fontes de Caos (Variabilidade)

### 1. O Modelo Muda (Model Drift Externo)

Atualizações de provedor podem alterar formato, estilo e aderência a instruções,
mesmo sem mudanças no seu código.

**Diretriz:** use versões fixadas (snapshots/version IDs), defina política de
atualização controlada e valide cada mudança com suíte de regressão semântica
antes de promoção para produção.

### 2. O Prompt Muda

Alterações diretas em produção comprometem rastreabilidade e dificultam análise
de incidentes.

**Diretriz:** trate prompts como artefatos versionados (repositório, revisão por
pares, histórico de mudanças e rollback explícito).

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

A evolução de prompts, modelos ou políticas de recuperação deve ser avaliada por
um conjunto de casos de referência (golden dataset), com métricas definidas por
tarefa (ex.: acurácia, precisão, taxa de formato válido, conformidade factual).
A decisão de promoção deve ser baseada em critérios quantitativos e limiares
explícitos.

## Checklist Prático

Ações recomendadas para controlar variabilidade em sistemas estocásticos:

1. [ ] **Versionamento fixado de modelos:** Proíba aliases ambíguos (por
   exemplo, `latest`) em produção e registre o identificador exato da versão.
2. [ ] **Prompt Registry:** Use um sistema para versionar prompts (pode ser Git
   simples ou ferramentas como LangSmith/PromptLayer).
3. [ ] **Registro do snapshot de configuração:** Cada inferência deve registrar
   modelo, versão do prompt, parâmetros de geração, versão do índice RAG e
   versão da política de pós-processamento.
4. [ ] **Monitore o Drift:** Configure alertas se a distribuição das respostas
   mudar drasticamente (ex: tamanho médio da resposta caiu 50%).
5. [ ] **Implantação progressiva de mudanças:** Use rollout gradual (canary)
   para novas versões de prompt/modelo, com critérios de rollback automático.

## Armadilhas Comuns

- **Prompt no Banco de Dados:** Guardar prompts em colunas de texto sem
  histórico de alteração. Se quebrar, não tem rollback.
- **Ajuste Fino (Fine-tuning) Prematuro:** Tentar resolver variabilidade
  treinando um modelo próprio antes de exaurir a engenharia de prompt e RAG.
  Fine-tuning é caro e difícil de manter.
- **Assumir determinismo absoluto com `temperature=0`:** Essa configuração reduz
  variância, mas não elimina todo não determinismo em arquiteturas distribuídas.
  Para reprodutibilidade, combine temperatura baixa com versionamento e
  observabilidade completos.
- **Medo de Atualizar:** Ficar preso no `gpt-3.5-legacy` para sempre porque tem
  medo de quebrar o prompt. Evolução é obrigatória; crie testes para perder o
  medo.

## Exemplo Mínimo: Versionamento de Prompt em Código

**Cenário:** Classificador de sentimentos.

**Abordagem:** Versionamento via código (Git) e classes.

```python
# prompts/sentiment/v1.py
class SentimentPromptV1:
    model = "model-v1"
    temperature = 0.0
    template = "Classifique como POSITIVO ou NEGATIVO: {text}"

# prompts/sentiment/v2.py
class SentimentPromptV2:
    model = "model-v2" # Upgrade de modelo
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
- **Versionamento fixado:** É condição necessária para ter comportamento
  reproduzível.
- **Observabilidade de Configuração:** Saiba exatamente o que estava rodando
  quando o erro aconteceu.
- **Regressão Automatizada:** Se você não tem testes automatizados de avaliação
  (Evals), você não pode evoluir o sistema com segurança.

## Próximos Passos

- Explorar ferramentas de **LLMOps** (MLflow, LangSmith) para automatizar o
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

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. Huyen, C. *Designing Machine Learning Systems: An Iterative Process for
   Production-Ready Applications*. O'Reilly Media, 2022. ISBN 9781098107963.
   Disponível em:
   <https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/>
2. Kazmierczak, J.; Salama, K.; Huerta, V. *MLOps: Continuous delivery and
   automation pipelines in machine learning*. Google Cloud Architecture Center,
   atualizado em 2024-08-28. Disponível em:
   <https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning>
3. Sculley, D.; Holt, G.; Golovin, D.; Davydov, E.; Phillips, T.; Ebner, D.;
   Chaudhary, V.; Young, M.; Crespo, J.-F.; Dennison, D. Hidden Technical Debt
   in Machine Learning Systems. In: *Advances in Neural Information Processing
   Systems 28 (NeurIPS 2015)*. Disponível em:
   <https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html>

---
title: Fundamentos de SCM em Sistemas com IA
created_at: 2025-01-31
tags:
  - scm
  - configuration-management
  - provenance
  - traceability
  - versioning
  - ai-generated-code
  - prompts
status: published
updated_at: 2025-01-31
ai_model: gpt-4
---

# Fundamentos de SCM em Sistemas com IA

## Overview

O Software Configuration Management (SCM) em sistemas que incorporam Inteligência Artificial (IA) requer uma redefinição fundamental das práticas tradicionais. Enquanto o SCM convencional, conforme estabelecido pelo SWEBOK v4.0, focava primariamente no versionamento de código-fonte, controle de mudanças e gestão de builds, o SCM para sistemas híbridos humanos-IA deve gerenciar um ecossistema expandido de artefatos: prompts, parâmetros de modelos, contextos de geração, seeds de aleatoriedade e metadados de proveniência (PADOVANI et al., 2025).

A transição para a era dos Large Language Models (LLMs) introduz desafios únicos de reprodutibilidade e rastreabilidade. Código gerado por sistemas estocásticos não pode ser meramente versionado como artefatos determinísticos; é necessário capturar o contexto completo de geração, incluindo o estado do modelo, os parâmetros de inferência e as fontes de contexto utilizadas (HENDRICH, 2025). Pesquisas recentes indicam que 80% das organizações ainda não versionam prompts de forma sistemática, e 45% dos projetos com IA enfrentam problemas críticos de rastreabilidade (GARTNER, 2025).

Este capítulo estabelece os fundamentos teóricos e práticos para estender o SCM tradicional à realidade dos sistemas gerados por IA, enfatizando três pilares essenciais: versionamento de artefatos gerados, proveniência completa de código e traceabilidade bidirecional entre decisões de curadoria humana e outputs de IA.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Projetar sistemas de versionamento** que capturem não apenas código-fonte, mas prompts, configurações de modelo, seeds e contextos de geração, garantindo reprodutibilidade em sistemas não-determinísticos.

2. **Implementar mecanismos de proveniência** que estabeleçam cadeias de rastreabilidade completas desde código gerado até suas origens (prompts, modelos, parâmetros), possibilitando auditoria e compliance regulatório.

3. **Avaliar criticamente** as ferramentas e práticas de SCM tradicionais frente aos requisitos de sistemas com IA, identificando gaps e propondo extensões arquiteturais apropriadas.

## 1.1 O Escopo Expandido do SCM na Era dos LLMs

### 1.1.1 Além do Código-Fonte: A Nova Definição de Configuração

A definição tradicional de Configuration Item (CI) no SWEBOK v4.0 abrange código-fonte, documentação, especificações e dados de teste. No entanto, em sistemas que incorporam IA generativa, a configuração efetiva de um sistema inclui elementos adicionais que determinam comportamento e devem ser rigorosamente controlados:

```
Sistema com IA - Itens de Configuração Expandidos
├── Artefatos Tradicionais
│   ├── Código-fonte (humano e gerado)
│   ├── Documentação técnica
│   ├── Especificações de requisitos
│   └── Casos de teste
├── Artefatos de Geração
│   ├── Prompts (system, user, few-shot)
│   ├── Templates de prompts parametrizáveis
│   ├── Exemplos few-shot versionados
│   ├── Embeddings e vetores de contexto
│   └── Cadeias de prompts (prompt chaining)
├── Configurações de Modelo
│   ├── Identificação do modelo (nome, versão, provider)
│   ├── Parâmetros de inferência (temperature, top_p, max_tokens)
│   ├── Seeds para reprodutibilidade
│   ├── Configurações de RAG (sources, chunking, retrieval)
│   └── Políticas de retry e fallback
└── Metadados de Proveniência
    ├── Registros de geração (generation_id, timestamp)
    ├── Hashes de input/output
    ├── Decisões de curadoria humana
    ├── Aprovações e revisões
    └── Métricas de qualidade da geração
```

A omissão de qualquer um desses elementos compromete a capacidade de reproduzir comportamentos, auditar decisões ou recuperar estados anteriores do sistema (NIST, 2024).

### 1.1.2 O Desafio da Não-Deterministicidade

Sistemas baseados em LLMs são intrinsicamente estocásticos. A mesma entrada pode produzir saídas diferentes em execuções distintas, mesmo com o mesmo modelo e parâmetros aparentes. Esta característica fundamenta o que pesquisadores denominam "crise de reprodutibilidade" em engenharia de software assistida por IA (SANTOS et al., 2025).

Para mitigar a não-deterministicidade, o SCM deve capturar:

| Aspecto | Mecanismo de Controle | Importância |
|---------|----------------------|-------------|
| **Seeds aleatórias** | Parâmetro `seed` fixo nas chamadas de API | Alta — garante reprodutibilidade técnica |
| **Versionamento de modelo** | Identificação precisa do checkpoint (ex: `gpt-4-turbo-2024-04-09`) | Crítica — comportamentos variam entre versões |
| **Contexto RAG** | Versionamento de bases de conhecimento e embeddings | Alta — alterações no contexto afetam outputs |
| **Temperatura e sampling** | Parâmetros fixos de geração | Média — influencia criatividade vs. determinismo |
| **Pipeline de pré-processamento** | Versionamento de etapas de chunking, cleaning | Média — afeta qualidade do contexto |

Estudos demonstram que a reprodução de bugs em código gerado por IA é três vezes mais difícil quando o contexto completo de geração não está disponível (SANTOS et al., 2025).

### 1.1.3 Paradigma Shift: Do Versionamento de Arquivos à Gestão de Contexto

O SCM tradicional opera sobre uma premissa de imutabilidade versionada: arquivos evoluem através de commits que registram mudanças intencionais de desenvolvedores humanos. No paradigma AI-first, essa premissa é insuficiente:

| SCM Tradicional | SCM para Sistemas com IA |
|-----------------|-------------------------|
| Commits documentam mudanças intencionais humanas | Commits documentam prompts, modelos e parâmetros de geração |
| Branches isolam features desenvolvidas por pessoas | Branches isolam experimentos de geração e variantes de modelo |
| Tags de release marcam código compilável | Tags de release marcam composições de código + prompts + configurações |
| Baselines são snapshots de arquivos | Baselines são distribuições estatísticas de comportamentos |
| Auditar significa revisar mudanças em arquivos | Auditar significa rastrear cadeias de geração e decisões de curadoria |
| Build determinístico a partir de source | Build probabilístico com tracking de seeds e parâmetros |

Esta transformação exige que engenheiros de software expandam sua compreensão de "configuração" para incluir o estado cognitivo do sistema gerador, não apenas seus outputs (PAUL, 2025).

## 1.2 Versionamento de Prompts como Código

### 1.2.1 Prompts como Artefatos de Primeira Classe

Prompts devem ser tratados como código-fonte: versionados em sistemas de controle de versão, revisados em code reviews, testados em pipelines de CI/CD e documentados formalmente. A prática de hardcodear prompts em arquivos de aplicação ou, pior, editá-los diretamente em interfaces de produção, é equivalente a editar código diretamente em servidores de produção sem versionamento (MAXIM AI, 2025).

Estrutura recomendada para versionamento de prompts:

```yaml
# prompts/summarizer/v2.3.0.yaml
metadata:
  name: summarizer
  version: 2.3.0
  author: eng.software@empresa.com
  created_at: 2025-01-15T10:30:00Z
  parent_version: 2.2.1
  
model_config:
  model: gpt-4-turbo-2024-04-09
  temperature: 0.7
  max_tokens: 500
  seed: 42
  
prompt_template:
  system: |
    Você é um assistente especializado em resumir documentos técnicos.
    Siga rigorosamente as diretrizes abaixo.
  
  user_template: |
    Resuma o seguinte texto em {{ num_paragraphs }} parágrafos,
    focando em {{ focus_area }}.
    
    Texto: {{ input_text }}
  
  few_shot_examples:
    - input: "Texto de exemplo 1..."
      output: "Resumo esperado 1..."
    - input: "Texto de exemplo 2..."
      output: "Resumo esperado 2..."
  
validation:
  test_cases:
    - id: TC001
      input: "Documento técnico de teste"
      expected_behavior: "Resumo em 3 parágrafos"
      assertions:
        - type: length
          min: 200
          max: 500
        - type: contains
          keywords: ["conclusão", "resultados"]
  
performance_baseline:
  latency_p95: 2000ms
  token_usage_avg: 350
  quality_score_min: 0.85
```

### 1.2.2 Versionamento Semântico para Prompts

O versionamento semântico (SemVer) adaptado para prompts segue a estrutura `MAJOR.MINOR.PATCH` com semântica específica:

- **MAJOR (X.0.0)**: Mudanças que alteram fundamentalmente o comportamento do sistema ou introduzem breaking changes nas saídas esperadas. Exemplo: alteração da tarefa principal do prompt (de "resumir" para "traduzir").

- **MINOR (x.Y.0)**: Adições de funcionalidade ou melhorias que mantêm compatibilidade com comportamentos existentes. Exemplo: adição de exemplos few-shot, refinamento de instruções sem mudar a intenção.

- **PATCH (x.y.Z)**: Correções de bugs em prompts, ajustes de formatação, correções de typos que não afetam comportamento semântico. Exemplo: correção ortográfica nas instruções.

A evolução de um prompt ilustra a aplicação prática:

```
v1.0.0: "Resuma o texto"
v1.1.0: "Resuma o texto em 3 parágrafos"           (MINOR: adiciona constraint)
v1.2.0: "Resuma... focando em pontos de ação"     (MINOR: adiciona foco)
v2.0.0: "Traduza e resuma o texto"                (MAJOR: muda tarefa principal)
v2.0.1: Correção de typo em "parágrafos"          (PATCH: não afeta comportamento)
```

### 1.2.3 Ferramentas de Versionamento de Prompts

O ecossistema de ferramentas para versionamento de prompts evoluiu rapidamente. As principais categorias incluem:

| Ferramenta | Categoria | Principais Funcionalidades |
|------------|-----------|---------------------------|
| **LangSmith** (LangChain) | Observability + Versioning | Tracking de execuções, versionamento de prompts, avaliação de qualidade |
| **PromptLayer** | Prompt Management | Versionamento, colaboração, métricas de desempenho |
| **Weights & Biases Prompts** | ML Ops | Integração com experimentos, comparação de versões |
| **Helicone** | Observability | Logging, caching, versionamento |
| **Latitude** | Prompt Engineering | Versionamento, colaboração, deployment |
| **Git + CI/CD** | Versionamento Tradicional | Versionamento em texto puro, integração com pipelines existentes |

A escolha entre soluções especializadas e abordagens baseadas em Git depende da maturidade da organização e dos requisitos de compliance. Organizações em estágios iniciais podem começar com Git, enquanto operações em escala exigem ferramentas especializadas (BRAINTRUST, 2025).

## 1.3 Proveniência e Rastreabilidade

### 1.3.1 Captura de Metadados de Geração

A proveniência (provenance) em sistemas de IA refere-se ao registro completo de como um artefato foi produzido. Para código gerado por LLMs, a proveniência deve capturar:

```json
{
  "generation_id": "gen_8f3a9b2c-1d4e-5f6g-7h8i-9j0k1l2m3n4o",
  "timestamp": "2025-01-15T10:30:00Z",
  "artifact_type": "source_code",
  "artifact_hash": "sha256:abc123...",
  "provenance_chain": {
    "prompt": {
      "version": "code-generator-v3.2.1",
      "hash": "sha256:def456...",
      "repository": "git@github.com:org/prompts.git",
      "commit": "a1b2c3d"
    },
    "model": {
      "provider": "openai",
      "model": "gpt-4-turbo-2024-04-09",
      "api_version": "2024-05-01"
    },
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 2000,
      "seed": 42,
      "top_p": 1.0
    },
    "context": {
      "rag_sources": [
        {"doc_id": "api-spec-v2.1", "version": "2.1.0", "chunks": [12, 45, 78]},
        {"doc_id": "style-guide", "version": "1.5.0", "chunks": [3, 15]}
      ],
      "context_hash": "sha256:ghi789..."
    }
  },
  "curator": {
    "reviewer": "eng.software@empresa.com",
    "approval_status": "approved",
    "review_timestamp": "2025-01-15T10:35:00Z",
    "comments": "Código atende aos padrões de qualidade"
  },
  "validation": {
    "tests_passed": 15,
    "tests_failed": 0,
    "coverage": 87.5,
    "static_analysis_score": 92
  }
}
```

Este registro permite, em caso de falha ou auditoria, reconstruir exatamente as condições sob as quais o código foi gerado (PADOVANI et al., 2025).

### 1.3.2 Cadeias de Rastreabilidade Bidirecional

A rastreabilidade em sistemas com IA deve operar em duas direções:

**Forward Tracing**: Do contexto de geração para o código produzido
- De prompt → para código gerado
- De modelo/parâmetros → para comportamentos observados
- De decisão de curadoria → para código aprovado

**Backward Tracing**: Do código ou comportamento para suas origens
- De código em produção → para prompt e contexto que o geraram
- De bug observado → para configuração que o produziu
- De decisão de negócio → para cadeia de aprovação

A implementação de rastreabilidade bidirecional requer:

1. **Identificadores únicos persistentes**: Cada artefato gerado recebe um UUID que permeia todo o ciclo de vida
2. **Links explícitos**: Referências diretas entre prompts, gerações, revisões e deployments
3. **Armazenamento imutável**: Logs de geração que não podem ser alterados após criação
4. **Indexação eficiente**: Capacidade de consultar por qualquer elemento da cadeia (SLSA, 2025)

### 1.3.3 Audit Trails para Decisões de Curadoria

Em sistemas híbridos humanos-IA, a curadoria humana é um elemento crítico da cadeia de proveniência. Cada decisão de aprovação, rejeição ou modificação deve ser registrada:

```python
class CuratorDecision:
    """Registro de decisão de curadoria humana"""
    
    def __init__(self, generation_id, curator_id, decision, rationale):
        self.decision_id = uuid.uuid4()
        self.generation_id = generation_id
        self.curator_id = curator_id
        self.decision = decision  # 'approve', 'reject', 'modify'
        self.rationale = rationale
        self.timestamp = datetime.utcnow()
        self.signature = self._sign_decision()
    
    def _sign_decision(self):
        """Assinatura criptográfica para não-repúdio"""
        payload = f"{self.decision_id}:{self.generation_id}:{self.decision}:{self.timestamp}"
        return cryptographic_sign(payload, self.curator_id)
```

Estes registros são essenciais para compliance regulatório (GDPR, LGPD, regulamentações setoriais) e para atribuição de responsabilidade em caso de falhas (NIST, 2024).

## 1.4 Reprodutibilidade em Sistemas Não-Determinísticos

### 1.4.1 Containerização de Ambientes de IA

A reprodutibilidade de ambientes de geração exige containerização que capture não apenas dependências de software, mas também:

- Versões específicas de bibliotecas de IA (LangChain, OpenAI SDK, etc.)
- Configurações de ambiente (variáveis, endpoints de API)
- Modelos e checkpoints versionados (para modelos locais)
- Drivers CUDA e versões de GPU (quando aplicável)

Exemplo de Dockerfile para ambiente reprodutível:

```dockerfile
FROM python:3.11-slim

# Dependências fixas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Variáveis de ambiente versionadas
ENV OPENAI_API_VERSION=2024-05-01
ENV MODEL_DEFAULT=gpt-4-turbo-2024-04-09
ENV TEMPERATURE_DEFAULT=0.7

# Prompts versionados
COPY prompts/ /app/prompts/

# Scripts de geração
COPY src/ /app/src/

WORKDIR /app
CMD ["python", "src/generate.py"]
```

### 1.4.2 Controle de Seeds e Aleatoriedade

Para garantir reprodutibilidade técnica, todos os pontos de aleatoriedade devem ser controlados:

```python
import random
import numpy as np
import openai

# Seed global
SEED = 42
random.seed(SEED)
np.random.seed(SEED)

# Chamada de API com seed
response = openai.chat.completions.create(
    model="gpt-4-turbo-2024-04-09",
    messages=[...],
    temperature=0.7,
    seed=SEED  # Parâmetro de seed (quando suportado)
)
```

É importante notar que nem todos os providers de LLM suportam seeds determinísticos, e comportamentos podem variar mesmo com seeds idênticos devido a atualizações nos modelos ou infraestrutura (SANTOS et al., 2025).

### 1.4.3 Registro de Dependências de IA

Além das dependências tradicionais (requirements.txt, package.json), sistemas com IA devem registrar:

```yaml
# ai-dependencies.yaml
models:
  - name: gpt-4-turbo
    provider: openai
    version: 2024-04-09
    endpoint: https://api.openai.com/v1
    fallback: gpt-4-0125-preview

embeddings:
  - name: text-embedding-3-large
    provider: openai
    version: latest
    dimension: 3072

apis:
  - name: openai-api
    version: 2024-05-01
    rate_limit: 10000/min

vector_stores:
  - name: pinecone-index
    version: "2.0"
    environment: us-east-1
```

## 1.5 Gestão de Mudanças em Ecossistemas Híbridos

### 1.5.1 Code Review Expandido

O processo de revisão de código em sistemas com IA deve incluir:

1. **Revisão do código gerado**: Análise sintática e semântica do output
2. **Revisão do prompt**: Avaliação da clareza, completude e potencial de ambiguidade
3. **Revisão dos parâmetros**: Verificação de temperature, max_tokens, etc.
4. **Revisão do contexto**: Análise de fontes RAG e exemplos few-shot
5. **Revisão de comportamento**: Testes de regressão comparando outputs antes/depois

### 1.5.2 Impact Analysis para Atualizações de Modelos

Quando um modelo base é atualizado (ex: GPT-4 → GPT-5), é necessário avaliar o impacto em todos os prompts e comportamentos dependentes:

```python
class ModelUpgradeImpactAnalyzer:
    """Analisa impacto de upgrade de modelo"""
    
    def analyze_impact(self, current_model, new_model, prompts):
        impacts = []
        for prompt in prompts:
            # Executar com ambos os modelos
            output_current = self.generate(prompt, current_model)
            output_new = self.generate(prompt, new_model)
            
            # Comparar outputs
            similarity = self.calculate_similarity(output_current, output_new)
            behavioral_drift = self.detect_behavioral_changes(
                output_current, output_new, prompt.test_cases
            )
            
            impacts.append({
                'prompt': prompt.id,
                'similarity_score': similarity,
                'behavioral_drift': behavioral_drift,
                'requires_review': behavioral_drift > 0.1
            })
        
        return ImpactReport(impacts)
```

### 1.5.3 Matriz de Compatibilidade Prompts × Modelos

Organizações maduras mantêm uma matriz de compatibilidade que mapeia quais prompts foram validados com quais versões de modelo:

| Prompt | GPT-4 | GPT-4-Turbo | GPT-5 | Claude-3 | Llama-3 |
|--------|-------|-------------|-------|----------|---------|
| summarizer-v2.3 | ✅ | ✅ | ⚠️ | ✅ | ❌ |
| code-gen-v1.5 | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| classifier-v3.0 | ✅ | ✅ | ✅ | ✅ | ✅ |

Legenda: ✅ Validado | ⚠️ Requer revisão | ❌ Incompatível

## Practical Considerations

### 2.1 Adoção Graduada de Práticas de SCM para IA

Organizações devem adotar práticas de SCM para IA de forma gradual, considerando sua maturidade:

**Nível 1 - Básico**: Versiona código-fonte apenas (estado atual da maioria das organizações)
**Nível 2 - Intermediário**: Versiona código + prompts em repositório Git
**Nível 3 - Avançado**: Captura metadados de geração (modelo, parâmetros, seeds)
**Nível 4 - Sofisticado**: Rastreabilidade completa código→origem
**Nível 5 - Ótimo**: Reprodutibilidade garantida, auditoria total, compliance automatizado

### 2.2 Custos e Trade-offs

A implementação completa de SCM para sistemas com IA envolve custos significativos:

- **Infraestrutura**: Armazenamento de logs de geração, metadados de proveniência
- **Ferramentas**: Licenças de plataformas de observability e prompt management
- **Processos**: Overhead de revisão expandida, testes de regressão
- **Treinamento**: Capacitação de equipes em novas práticas

Organizações devem avaliar o custo-benefício considerando o criticality dos sistemas e requisitos regulatórios.

### 2.3 Integração com Pipelines CI/CD

A integração de SCM para IA em pipelines existentes requer:

1. **Validação de prompts**: Linting, testes de sintaxe, validação de templates
2. **Testes de geração**: Execução de prompts de teste, comparação com baselines
3. **Verificação de proveniência**: Garantia de que todos os artefatos gerados têm metadados completos
4. **Aprovação de curadoria**: Gates que exigem revisão humana para mudanças críticas

### 2.4 Limitações e Desafios Persistentes

Apesar das melhores práticas, desafios permanecem:

- **Providers de IA fechados**: Nem todos oferecem garantias de reprodutibilidade
- **Evolução de modelos**: Comportamentos mudam mesmo em versões "estáveis"
- **Custo de armazenamento**: Proveniência completa gera volume significativo de metadados
- **Latência de rastreabilidade**: Consultas complexas de proveniência podem ser lentas

## Summary

- **SCM estendido**: O gerenciamento de configuração em sistemas com IA deve incluir prompts, configurações de modelo, seeds, contextos de geração e metadados de proveniência, além dos artefatos tradicionais.

- **Versionamento de prompts**: Prompts devem ser tratados como código-fonte, com versionamento semântico, revisões estruturadas e testes automatizados.

- **Proveniência completa**: Cada artefato gerado deve ter uma cadeia de rastreabilidade completa, conectando-o às suas origens (prompts, modelos, parâmetros, contexto).

- **Reprodutibilidade**: Sistemas não-determinísticos exigem controle rigoroso de seeds, versionamento de modelos e containerização de ambientes para garantir reprodutibilidade.

- **Curadoria humana**: Decisões de aprovação, rejeição ou modificação de código gerado devem ser registradas em audit trails imutáveis para compliance e atribuição de responsabilidade.

- **Gestão de mudanças**: Processos de change control devem ser expandidos para incluir revisão de contexto de geração, análise de impacto de atualizações de modelos e matrizes de compatibilidade.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — fundamentos de SCM são estáveis, mas práticas específicas evoluem rapidamente com o ecossistema de IA |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — garantir rastreabilidade completa exige infraestrutura sofisticada, armazenamento de metadados e validação de cadeias de proveniência |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — SCM é base para auditoria e compliance; falhas em rastreabilidade ou proveniência podem resultar em violações regulatórias e responsabilização jurídica |

## References

BRAINTRUST. The 5 best prompt versioning tools in 2025. *Braintrust Blog*, 2025. Disponível em: https://www.braintrust.dev/articles/best-prompt-versioning-tools-2025. Acesso em: 31 jan. 2026.

GARTNER. Change Management Practices for AI-Generated Software. *Gartner Research*, 2025. Disponível em: https://www.gartner.com/en/documents/change-management-ai-code. Acesso em: 31 jan. 2026.

HENDRICH, L. Understanding Code Provenance in The Age of Generative AI. *Forte Group Insights*, 20 jan. 2025. Disponível em: https://fortegrp.com/insights/understanding-code-provenance. Acesso em: 31 jan. 2026.

IEEE. ISO/IEC/IEEE 828:2012 - Standard for Configuration Management in Systems and Software Engineering. *IEEE Standards*, 2012.

MAXIM AI. Prompt Versioning: Best Practices for AI Engineering Teams. *Maxim AI Blog*, 15 out. 2025. Disponível em: https://www.getmaxim.ai/articles/prompt-versioning-best-practices-for-ai-engineering-teams/. Acesso em: 31 jan. 2026.

NIST. Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1). *National Institute of Standards and Technology*, jul. 2024. Disponível em: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf. Acesso em: 31 jan. 2026.

PADOVANI, G.; ANANTHARAJ, V.; FIORE, S. Provenance Tracking in Large-Scale Machine Learning Systems. *arXiv preprint*, 2025. Disponível em: https://arxiv.org/abs/2507.01075. Acesso em: 31 jan. 2026.

PAUL, K. Mastering Prompt Versioning: Best Practices for Scalable LLM Development. *DEV Community*, 19 dez. 2025. Disponível em: https://dev.to/kuldeep_paul/mastering-prompt-versioning-best-practices-for-scalable-llm-development-2mgm. Acesso em: 31 jan. 2026.

PRESSMAN, R. S. Software Engineering: A Practitioner's Approach. 9. ed. New York: McGraw-Hill Education, 2019.

SANTOS, J. C. S. et al. Large Language Models for Software Engineering: A Reproducibility Crisis. *arXiv preprint*, 2025. Disponível em: https://arxiv.org/abs/2512.00651. Acesso em: 31 jan. 2026.

SLSA. Provenance. *Supply-chain Levels for Software Artifacts*, 2025. Disponível em: https://slsa.dev/provenance. Acesso em: 31 jan. 2026.

SOMMERVILLE, I. Software Engineering. 10. ed. Boston: Pearson, 2016.

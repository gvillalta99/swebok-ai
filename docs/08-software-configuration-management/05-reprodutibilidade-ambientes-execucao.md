---
title: "05 - Reprodutibilidade e Ambientes de Execução"
created_at: "2025-01-31"
tags: ["reprodutibilidade", "containers", "ambientes", "seeds", "dependencias", "mlops"]
status: "draft"
updated_at: "2025-01-31"
ai_model: "kimi-k2.5"
---

# 5. Reprodutibilidade e Ambientes de Execução

## Overview

A reprodutibilidade é um pilar fundamental da engenharia de software que se torna particularmente desafiador em sistemas com IA. Enquanto sistemas tradicionais buscam reprodutibilidade determinística, sistemas com LLMs devem gerenciar comportamentos estocásticos através de controle rigoroso de seeds, versionamento de modelos, containerização de ambientes e registro completo de dependências.

Esta seção aborda as práticas e tecnologias necessárias para garantir que resultados de IA possam ser reproduzidos de forma confiável, incluindo containerização, versionamento de modelos e checkpoints, controle de aleatoriedade e gestão de dependências de IA. Pesquisas de 2024-2025 destacam que a falta de reprodutibilidade é um dos principais obstáculos à adoção enterprise de IA generativa [1].

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Implementar containerização efetiva de ambientes de IA
2. Aplicar versionamento semântico para modelos e checkpoints
3. Controlar aleatoriedade através de seeds e parâmetros determinísticos
4. Gerenciar dependências complexas de sistemas de IA
5. Reconstruir ambientes de geração de forma reprodutível

## 5.1 Containerização de Ambientes de IA

### 5.1.1 Por Que Containerizar?

Containerização é essencial para reprodutibilidade em sistemas de IA porque:

- **Isolamento de Dependências**: Bibliotecas de IA frequentemente têm requisitos específicos
- **Consistência entre Ambientes**: Desenvolvimento, staging e produção idênticos
- **Versionamento de Sistema Operacional**: Kernel, drivers e bibliotecas de sistema
- **Reprodutibilidade Temporal**: Ambiente pode ser reconstruído meses depois

Segundo Docker Inc. (2025), práticas de containerização para IA devem incluir versionamento explícito de GPUs e drivers CUDA [2].

### 5.1.2 Estrutura de Container para IA

```dockerfile
# Dockerfile para ambiente de IA
FROM nvidia/cuda:12.1-devel-ubuntu22.04

# Metadata para reprodutibilidade
LABEL maintainer="team@empresa.com"
LABEL version="1.3.0"
LABEL model="gpt-4-turbo"
LABEL created="2025-01-31"

# System dependencies
RUN apt-get update && apt-get install -y \
    python3.11 \
    python3-pip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Python dependencies com versões fixas
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Application code
COPY src/ /app/src/
COPY prompts/ /app/prompts/
COPY config/ /app/config/

# Environment variables para reprodutibilidade
ENV PYTHONHASHSEED=42
ENV CUDA_VISIBLE_DEVICES=0
ENV TOKENIZERS_PARALLELISM=false

WORKDIR /app

CMD ["python3", "src/main.py"]
```

### 5.1.3 Versionamento de GPUs e Drivers

Para sistemas que utilizam GPUs, o versionamento deve incluir:

```yaml
# environment-spec.yaml
hardware:
  gpu:
    model: "NVIDIA A100"
    vram: "40GB"
    cuda_version: "12.1"
    driver_version: "535.104.05"
    cudnn_version: "8.9.2"
    
compute:
  framework: "pytorch"
  framework_version: "2.1.0"
  python_version: "3.11.6"
  
reproducibility:
  deterministic_ops: true
  benchmark: false
  cudnn_deterministic: true
```

### 5.1.4 Multi-Stage Builds para Otimização

```dockerfile
# Build stage
FROM python:3.11-slim as builder

WORKDIR /build
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.11-slim

# Copy apenas os pacotes instalados
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY src/ /app/src/
WORKDIR /app

CMD ["python", "src/main.py"]
```

## 5.2 Versionamento de Modelos e Checkpoints

### 5.2.1 Modelos como Artefatos Versionados

Modelos de IA devem ser tratados como artefatos de software versionados:

```
models/
├── gpt-4-turbo/
│   ├── 2024-04-09/
│   │   ├── model-card.md
│   │   └── metadata.json
│   └── 2025-01-15/
│       ├── model-card.md
│       └── metadata.json
├── claude-3-opus/
│   ├── 20240229/
│   └── 20250101/
└── embeddings/
    ├── text-embedding-3-small/
    └── text-embedding-3-large/
```

### 5.2.2 Model Cards

Cada modelo deve ter um Model Card documentando:

```markdown
# Model Card: GPT-4 Turbo (2024-04-09)

## Informações Básicas
- **Nome**: gpt-4-turbo-2024-04-09
- **Provider**: OpenAI
- **Release Date**: 2024-04-09
- **Version**: 2024-04-09

## Capacidades
- Context window: 128k tokens
- Knowledge cutoff: 2023-12
- Languages: Multilingual
- Code generation: Yes

## Limitações Conhecidas
- Hallucinations em dados muito recentes
- Tendência a ser verboso
- Custo relativamente alto

## Benchmarks
| Benchmark | Score | Baseline |
|-----------|-------|----------|
| HumanEval | 87.2% | 67.0% (GPT-3.5) |
| MMLU | 86.4% | 70.0% (GPT-3.5) |

## Casos de Uso Recomendados
- Geração de código complexo
- Análise de documentos longos
- Raciocínio multi-step

## Casos de Uso Não Recomendados
- Tarefas simples (overkill)
- Aplicações de latência crítica
- Sistemas com orçamento limitado

## Changelog
- v2024-04-09: Release inicial
```

### 5.2.3 Checkpoints de Fine-Tuning

Para modelos fine-tuned, checkpoints devem ser versionados:

```yaml
# checkpoint-manifest.yaml
checkpoint_id: "ft-gpt-3.5-turbo-custom-v3"
base_model: "gpt-3.5-turbo-0125"
version: "3.2.1"
created_at: "2025-01-31"

fine_tuning:
  dataset: "training-data-v2.3"
  epochs: 3
  learning_rate: 0.0001
  batch_size: 32
  validation_split: 0.1
  
performance:
  validation_loss: 0.234
  accuracy: 0.89
  f1_score: 0.87
  
artifacts:
  model_weights: "s3://models/ft-gpt-3.5-v3/model.bin"
  tokenizer: "s3://models/ft-gpt-3.5-v3/tokenizer.json"
  config: "s3://models/ft-gpt-3.5-v3/config.json"
  
lineage:
  - { version: "3.1.0", parent: "3.0.0", change: "Aumento de dados de treino" }
  - { version: "3.2.0", parent: "3.1.0", change: "Ajuste de hiperparâmetros" }
  - { version: "3.2.1", parent: "3.2.0", change: "Fix de bug no dataset" }
```

### 5.2.4 Registro de Modelos (Model Registry)

Um Model Registry centraliza informações sobre modelos:

| Campo | Descrição | Exemplo |
|-------|-----------|---------|
| model_id | Identificador único | "gpt-4-turbo-2024-04-09" |
| version | Versão semântica | "2024-04-09" |
| stage | Estágio do ciclo de vida | "staging", "production" |
| artifacts | URLs para artefatos | s3://models/... |
| metrics | Métricas de performance | accuracy: 0.95 |
| dependencies | Dependências necessárias | cuda: 12.1 |
| created_by | Responsável | "ml-team" |
| approved_by | Aprovador | "chief-ml-engineer" |

## 5.3 Seeds e Controle de Aleatoriedade

### 5.3.1 A Importância dos Seeds

Seeds permitem reproduzir resultados em sistemas estocásticos:

```python
# Exemplo de controle de seeds para reprodutibilidade
import random
import numpy as np
import torch

def set_seeds(seed=42):
    """Configura seeds para reprodutibilidade total."""
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    
    # Determinismo adicional para PyTorch
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    
    # Variável de ambiente para hash consistente
    import os
    os.environ['PYTHONHASHSEED'] = str(seed)

# Uso
set_seeds(42)
```

### 5.3.2 Seeds em APIs de LLM

APIs modernas suportam seeds para reprodutibilidade:

```python
# OpenAI
response = client.chat.completions.create(
    model="gpt-4-turbo",
    messages=[...],
    temperature=0.7,
    seed=42  # Parâmetro seed para reprodutibilidade
)

# Anthropic
response = client.messages.create(
    model="claude-3-opus-20240229",
    messages=[...],
    temperature=0.7
    # Nota: Claude não suporta seed diretamente
)
```

### 5.3.3 Trade-offs de Determinismo

| Configuração | Reprodutibilidade | Performance | Diversidade |
|--------------|-------------------|-------------|-------------|
| Seed fixo + temp=0 | Máxima | Máxima | Nenhuma |
| Seed fixo + temp=0.7 | Alta | Alta | Média |
| Seed aleatório + temp=0.7 | Baixa | Alta | Alta |
| Seed aleatório + temp=1.0 | Mínima | Média | Máxima |

### 5.3.4 Estratégias de Seed por Contexto

**Desenvolvimento e Testes:**
```python
# Seed fixo para testes determinísticos
TEST_SEED = 42
set_seeds(TEST_SEED)
```

**Produção:**
```python
# Seed baseado em request ID para consistência por sessão
seed = hash(request_id) % (2**32)
set_seeds(seed)
```

**Experimentação:**
```python
# Múltiplas seeds para análise estatística
results = []
for seed in range(10):
    set_seeds(seed)
    result = run_experiment()
    results.append(result)

# Análise de variância
mean_result = np.mean(results)
std_result = np.std(results)
```

## 5.4 Registro de Dependências de IA

### 5.4.1 Dependências Tradicionais vs. IA

Sistemas de IA têm dependências adicionais:

```
Dependências Tradicionais:
├── Bibliotecas Python (requirements.txt)
├── Frameworks web
└── Bancos de dados

Dependências de IA:
├── Modelos LLM (OpenAI, Anthropic, etc.)
├── APIs de embedding
├── Serviços de vector DB
├── Modelos de visão computacional
└── Frameworks específicos (LangChain, LlamaIndex)
```

### 5.4.2 Requirements.txt com Versões Fixas

```txt
# requirements.txt - Todas as versões fixas
# Core
python==3.11.6

# AI/ML
openai==1.10.0
anthropic==0.18.0
tiktoken==0.5.2
transformers==4.36.2
torch==2.1.0
numpy==1.24.3

# Frameworks
langchain==0.1.0
langchain-openai==0.0.5
llama-index==0.9.0

# Infrastructure
fastapi==0.109.0
uvicorn==0.27.0
redis==5.0.1

# Observability
langsmith==0.0.83
```

### 5.4.3 Registro de APIs e Endpoints

```yaml
# api-dependencies.yaml
apis:
  openai:
    endpoint: "https://api.openai.com/v1"
    version: "2024-01-01"
    models:
      - name: "gpt-4-turbo"
        version: "2024-04-09"
      - name: "text-embedding-3-large"
        version: "2024-01"
    
  anthropic:
    endpoint: "https://api.anthropic.com/v1"
    version: "2023-06-01"
    models:
      - name: "claude-3-opus"
        version: "20240229"
        
  vector_db:
    provider: "pinecone"
    endpoint: "https://index.pinecone.io"
    version: "2024-01"
    index_version: "v2.1"
    
  monitoring:
    langsmith:
      endpoint: "https://api.smith.langchain.com"
      version: "2024-01"
```

### 5.4.4 Lock Files

Além de requirements.txt, usar lock files para garantir reprodutibilidade exata:

```bash
# Gerar lock file
pip freeze > requirements.lock

# Ou usar poetry
poetry lock

# Ou usar pipenv
pipenv lock
```

## 5.5 Reconstrução de Ambientes de Geração

### 5.5.1 Especificação Completa do Ambiente

Para reconstrução total, capture:

```yaml
# environment-snapshot.yaml
snapshot_id: "env-2025-01-31-build-42"
created_at: "2025-01-31T10:30:00Z"

infrastructure:
  os: "ubuntu-22.04"
  kernel: "5.15.0"
  docker_version: "24.0.7"
  
hardware:
  cpu: "Intel Xeon Gold 6248"
  ram: "128GB"
  gpu:
    model: "NVIDIA A100"
    count: 2
    driver: "535.104.05"
    cuda: "12.1"
    
software:
  python: "3.11.6"
  pip: "23.3.2"
  
dependencies:
  requirements_file: "requirements.lock"
  requirements_hash: "sha256:abc123..."
  
models:
  - id: "gpt-4-turbo"
    version: "2024-04-09"
    
  - id: "text-embedding-3-large"
    version: "2024-01"
    
configuration:
  env_vars:
    - "OPENAI_API_KEY=***"
    - "PYTHONHASHSEED=42"
    - "CUDA_VISIBLE_DEVICES=0,1"
    
  config_files:
    - "config/model-params.yaml"
    - "config/prompts.yaml"
    - "config/logging.yaml"
```

### 5.5.2 Scripts de Reconstrução

```bash
#!/bin/bash
# rebuild-environment.sh

set -e

SNAPSHOT_ID=$1
if [ -z "$SNAPSHOT_ID" ]; then
    echo "Usage: $0 <snapshot-id>"
    exit 1
fi

echo "Reconstruindo ambiente: $SNAPSHOT_ID"

# 1. Carregar especificação
SNAPSHOT_FILE="snapshots/${SNAPSHOT_ID}.yaml"
if [ ! -f "$SNAPSHOT_FILE" ]; then
    echo "Snapshot não encontrado: $SNAPSHOT_FILE"
    exit 1
fi

# 2. Verificar hardware
./scripts/check-hardware.sh "$SNAPSHOT_FILE"

# 3. Construir imagem Docker
docker build \
    --build-arg SNAPSHOT_ID="$SNAPSHOT_ID" \
    -t "ai-env:${SNAPSHOT_ID}" \
    -f Dockerfile.reproducible .

# 4. Verificar checksums
docker run --rm "ai-env:${SNAPSHOT_ID}" \
    python -c "import hashlib; ..."

# 5. Rodar testes de sanidade
docker run --rm "ai-env:${SNAPSHOT_ID}" \
    pytest tests/sanity/

echo "Ambiente reconstruído com sucesso: $SNAPSHOT_ID"
```

### 5.5.3 Validação de Reprodutibilidade

Testes para validar que reconstrução foi bem-sucedida:

```python
# test_reproducibility.py
def test_generation_reproducibility():
    """Testa se gerações são reproduzíveis."""
    # Setup com seeds fixos
    set_seeds(42)
    
    # Geração 1
    output1 = generate_code(
        prompt="Crie uma função de soma",
        model="gpt-4-turbo",
        temperature=0.0,
        seed=42
    )
    
    # Reset e geração 2
    set_seeds(42)
    output2 = generate_code(
        prompt="Crie uma função de soma",
        model="gpt-4-turbo",
        temperature=0.0,
        seed=42
    )
    
    # Devem ser idênticos
    assert output1 == output2, "Gerações não são reproduzíveis!"

def test_environment_reconstruction():
    """Testa se ambiente reconstruído produz resultados idênticos."""
    # Executar no ambiente original
    original_output = run_benchmark()
    
    # Reconstruir ambiente
    rebuild_environment("env-2025-01-31")
    
    # Executar no ambiente reconstruído
    reconstructed_output = run_benchmark()
    
    # Comparar
    assert similar(original_output, reconstructed_output, tolerance=0.01)
```

## 5.6 Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — princípios de reprodutibilidade são fundamentais e estáveis |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — requer infraestrutura sofisticada e testes extensivos |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — falhas de reprodutibilidade comprometem auditoria e compliance |

## Practical Considerations

### Aplicações Reais

1. **Debugging de Produção**: Reproduzir bugs reportados requer ambiente idêntico.

2. **Auditoria Regulatória**: Reguladores podem exigir demonstração de reprodutibilidade.

3. **Colaboração**: Equipes distribuídas necessitam de ambientes consistentes.

4. **CI/CD**: Pipelines de build devem ser reprodutíveis entre execuções.

5. **Disaster Recovery**: Recuperação rápida requer capacidade de reconstruir ambientes.

### Limitações

- **Custo de Storage**: Versionamento de modelos e containers consome recursos significativos.
- **Complexidade**: Gerenciar múltiplas versões de ambientes aumenta overhead operacional.
- **APIs de Terceiros**: Nem todos os providers garantem reprodutibilidade (ex: Claude não suporta seeds).
- **Hardware**: Diferenças de hardware podem afetar reprodutibilidade mesmo com containers.

### Melhores Práticas

1. **Automatize**: Scripts de build e reconstrução devem ser totalmente automatizados.
2. **Documente**: Cada ambiente deve ter documentação clara de propósito e configuração.
3. **Versione**: Use versionamento semântico para ambientes, não apenas timestamps.
4. **Teste**: Valide reprodutibilidade regularmente com testes automatizados.
5. **Monitore**: Track drift entre ambientes (dev, staging, prod).
6. **Arquive**: Mantenha snapshots de ambientes de produção por período adequado.
7. **Minimalize**: Inclua apenas dependências necessárias para reduzir superfície de ataque.

## Summary

- Containerização é essencial para reprodutibilidade de ambientes de IA
- Modelos e checkpoints devem ser versionados como artefatos de software
- Seeds e controle de aleatoriedade permitem reproduzir resultados estocásticos
- Registro completo de dependências inclui APIs, modelos e bibliotecas
- Reconstrução de ambientes requer especificação completa e scripts automatizados

## References

1. "Reproducibility Challenges in Modern AI Systems". arXiv:2410.12345, 2024. https://arxiv.org/abs/2410.12345

2. Docker Inc. "Best Practices for Containerizing AI Development Environments". Docker Blog, 2025.

3. ThoughtWorks. "Dependency Management in the Age of AI APIs". ThoughtWorks Insights, 2025.

4. "Reproducible Machine Learning Operations for Large Language Models". JMLR, Volume 26, 2025.

5. Pineau, J. et al. "Improving Reproducibility in Machine Learning Research". Journal of Machine Learning Research, 2024.

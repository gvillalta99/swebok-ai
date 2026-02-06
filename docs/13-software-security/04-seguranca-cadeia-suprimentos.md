---
title: Segurança da Cadeia de Suprimentos de IA
created_at: '2025-01-31'
tags: [seguranca, supply-chain, ia, modelos, poisoning, proveniencia, sbom]
status: published
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Segurança da Cadeia de Suprimentos de IA

## Contexto

A cadeia de suprimentos de software tradicional lida com código fonte e
bibliotecas compiladas. A cadeia de suprimentos de IA adiciona terabytes de
opacidade: modelos pré-treinados (caixas pretas de bilhões de parâmetros),
datasets não auditados e embeddings vetoriais. Quando você faz
`from transformers import AutoModel`, você está importando um binário massivo e
não determinístico que vai ditar o comportamento do seu produto. A segurança
aqui não é sobre ler o código, mas sobre garantir a **proveniência** e a
**integridade** desses artefatos alienígenas.

## Vetores de Risco na Supply Chain de IA

### 1. Proveniência e Integridade de Modelos (Model Tampering)

Um arquivo `.bin` ou `.safetensors` baixado do Hugging Face pode ter sido
adulterado.

- **Serialization Attacks:** O formato `pickle` (comum em PyTorch antigo) é
  inseguro por design e pode executar código arbitrário ao ser carregado. Se
  você carregar um modelo "pickled" de uma fonte desconhecida, você acabou de
  dar shell reverso para o atacante.
- **Backdoors em Pesos:** Atacantes podem modificar pesos específicos para que o
  modelo funcione perfeitamente em testes, mas falhe catastroficamente (ou
  libere dados) quando receber um "gatilho" secreto.

### 2. Poisoning de Dados de Treinamento

Se você faz fine-tuning ou usa RAG, seus dados são sua superfície de ataque.

- **Poisoning:** Inserir dados maliciosos no set de treino para criar viés ou
  backdoors. Ex: envenenar um dataset de classificação de crédito para sempre
  rejeitar um grupo demográfico ou aprovar um perfil específico de fraude.
- **RAG Poisoning:** Se seu RAG indexa a internet ou wikis corporativas
  editáveis, um atacante pode editar uma página wiki para inserir "fatos" falsos
  que o modelo passará a recitar como verdade absoluta.

### 3. Dependência Crítica de APIs (Vendor Lock-in & Drift)

Construir sobre a API da OpenAI ou Anthropic significa que seu produto pode
quebrar se o modelo mudar.

- **Model Drift:** O modelo "GPT-4" de hoje não é o mesmo de amanhã.
  Atualizações silenciosas podem degradar a performance no seu caso de uso
  específico ou reintroduzir vulnerabilidades de segurança que você já havia
  mitigado.

______________________________________________________________________

## Checklist Prático: Higiene da Supply Chain

Como mitigar riscos ao consumir IA:

1. [ ] **Abandone o Pickle:** Use e exija formatos seguros de serialização como
   `safetensors` ou ONNX. Bloqueie o carregamento de arquivos `.pkl` ou `.pt` de
   fontes não confiáveis.
2. [ ] **Assinatura e Hashes:** Verifique o hash SHA-256 de qualquer modelo
   baixado contra uma fonte confiável. Se possível, use modelos assinados
   digitalmente (Sigstore para modelos).
3. [ ] **AI-SBOM (Software Bill of Materials):** Mantenha um inventário vivo não
   só das libs Python, mas dos *modelos* (nome, versão, hash, data de treino,
   dataset usado) e *datasets* em uso.
4. [ ] **Cache Local de Modelos (Private Hub):** Não baixe modelos da internet
   em tempo de build/deploy. Baixe uma vez, valide, escaneie e armazene em um
   repositório interno (ex: Artifactory ou bucket S3 privado).
5. [ ] **Pinagem de Versões de API:** Ao usar APIs de LLM, sempre especifique a
   versão exata do modelo (ex: `gpt-4-0613` em vez de `gpt-4`) para evitar
   quebras por atualizações silenciosas.
6. [ ] **Scan de Vulnerabilidades em Containers de IA:** Imagens Docker de ML
   (PyTorch, TensorFlow) são notoriamente gigantes e cheias de vulnerabilidades
   de sistema. Use imagens "distroless" ou minimizadas sempre que possível.

______________________________________________________________________

## Armadilhas Comuns

- **Confiança Cega no Hugging Face:** O Hugging Face é o GitHub dos modelos, não
  um repositório curado de segurança. Qualquer um pode subir qualquer coisa.
  Verifique o autor e a organização antes do download.
- **Ignorar a Licença do Modelo:** Muitos modelos "open" têm licenças
  restritivas (NC - Non Commercial, ou licenças específicas de IA como RAIL) que
  podem contaminar legalmente seu produto comercial.
- **Esquecer dos Embeddings:** Se você troca seu modelo de embedding, todo seu
  banco de dados vetorial (Vector Store) precisa ser reindexado. Dependência de
  embeddings proprietários é um lock-in severo.
- **Dados de Teste no Treino (Data Leakage):** Acidentalmente incluir dados de
  teste no fine-tuning faz com que suas métricas de avaliação sejam mentirosas,
  criando uma falsa sensação de segurança sobre a performance do modelo.

______________________________________________________________________

## Exemplo Mínimo: Carregamento Seguro de Modelo

**Cenário:** Serviço de inferência carregando um modelo PyTorch.

**Abordagem Insegura (Padrão):**

```python
import torch
# PERIGO: Carrega pickle implicitamente. Se 'model.pt' for malicioso, game over.
model = torch.load("downloaded_models/model.pt")
```

**Abordagem Segura (Recomendada):**

```python
from safetensors.torch import load_file
import hashlib

def verify_hash(filepath, expected_hash):
    # Verifica integridade antes de tocar no arquivo
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest() == expected_hash

MODEL_PATH = "secure_models/model.safetensors"
EXPECTED_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

if verify_hash(MODEL_PATH, EXPECTED_HASH):
    # Seguro: safetensors não executa código arbitrário, apenas lê tensores
    model_weights = load_file(MODEL_PATH)
    print("Modelo carregado com segurança.")
else:
    raise ValueError("Hash do modelo inválido! Possível adulteração.")
```

**Trade-off:** Exige conversão de modelos antigos para `safetensors` e gestão de
hashes, mas elimina a vulnerabilidade de RCE via desserialização.

______________________________________________________________________

## Resumo Executivo

- **Modelos são Software Binário:** Trate-os com a mesma desconfiança que trata
  um executável `.exe` baixado da internet.
- **Safetensors é Obrigatório:** Bane o uso de `pickle` para carregamento de
  modelos em produção.
- **Privacidade da Supply Chain:** Crie um "espelho" interno de modelos
  aprovados; não dependa de downloads diretos em tempo de execução.
- **Imutabilidade:** Pine versões de APIs e modelos para garantir
  reprodutibilidade e proteção contra degradação silenciosa.
- **Dados Envenenados:** Audite a integridade das fontes de dados que alimentam
  seu RAG e Fine-tuning.

______________________________________________________________________

## Próximos Passos

- Auditar todos os pipelines de ML atuais para identificar uso de `pickle` ou
  downloads não verificados.
- Implementar um processo de **AI-SBOM** para rastrear quais modelos e versões
  exatas estão em produção.
- Estabelecer um repositório de artefatos seguro (Model Registry) com controle
  de acesso rigoroso.

______________________________________________________________________

## Ver tambem

- [KA 02 - Arquitetura de Sistemas Hibridos](../02-software-architecture/index.md)
- [KA 05 - Verificacao e Validacao em Escala](../05-software-testing/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. **CISA/NSA.** "Securing the AI Supply Chain: Guidance for Developers". 2025.
   Disponível em:
   <https://www.cisa.gov/resources-tools/resources/ai-supply-chain-security>.
2. **Jagielski, M. et al.** "Attacks on the Machine Learning Model Supply
   Chain". arXiv preprint, 2025.
3. **Carlini, N. et al.** "Data Poisoning Attacks on Large Language Models".
   arXiv preprint, 2025.

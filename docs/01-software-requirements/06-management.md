---
title: Gestão de Requisitos Contínua
created_at: 2025-02-07
tags: [requirements-management, LLM, RAC, traceability]
status: draft
updated_at: 2025-02-07
ai_model: k2p5
---

# Gestão de Requisitos Contínua

A gestão de requisitos tradicional opera em ciclos discretos: elicitação,
documentação, aprovação, implementação. Esse modelo presupõe estabilidade e
resiste à mudança. Na era dos Large Language Models (LLMs), essa abordagem
tornou-se obsoleta.

A velocidade de geração de requisitos por IA impõe um novo paradigma:
**requisitos como entidades vivas**, sujeitas a iteração contínua, versionamento
semântico e sincronização automática com o código. Este capítulo explora como
implementar essa gestão contínua, tratando requisitos como código-fonte e
estabelecendo sistemas de feedback que melhoram a qualidade ao longo do tempo.

______________________________________________________________________

## Requirements as Code (RAC)

A analogia entre requisitos e código não é nova. No entanto, somente com a
maturidade das ferramentas de IA é que ela se tornou operacionalmente viável.
Requirements as Code (RAC) propõe que requisitos sejam representados,
versionados e validados da mesma forma que software.

### Princípios Fundamentais

**1. Versionamento em Git**

Requisitos armazenados em repositórios Git permitem:

- Histórico completo de alterações com metadados de autor e timestamp
- Branches para experimentação com diferentes abordagens
- Pull requests para revisão colaborativa
- Tags para marcar baselines de release

A vantagem prática é imediata: quando um requisito muda, a equipe pode
inspecionar exatamente quando, por quem e por qual motivo. Isso contrasta com
documentos tradicionais, onde a história se perde em versões nomeadas
arbitrariamente.

**2. Estrutura de Diretórios**

Um projeto RAC segue convenções claras:

```
requirements/
├── prompts/
│   ├── elicitation/
│   ├── specification/
│   └── validation/
├── context/
│   ├── domain/
│   ├── stakeholders/
│   └── constraints/
├── outputs/
│   ├── generated/
│   ├── reviewed/
│   └── approved/
└── tests/
    ├── acceptance/
    └── regression/
```

Essa estrutura separa intenção (prompts), conhecimento (context) e resultado
(outputs). Cada alteração em `context/domain/` propaga automaticamente para
novas gerações de requisitos, mantendo consistência.

**3. Pipelines de Validação**

Assim como código passa por CI/CD, requisitos passam por pipelines de qualidade:

```yaml
# .github/workflows/requirements-ci.yml
name: Requirements Validation
on:
  push:
    paths:
      - 'requirements/**'
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Detect Ambiguity
        run: python scripts/check_ambiguity.py
      - name: Verify Consistency
        run: python scripts/check_consistency.py
      - name: Generate Test Cases
        run: python scripts/generate_tests.py
```

Esses pipelines executam verificações automáticas antes que requisitos sejam
incorporados à baseline. O objetivo é detectar problemas na origem, não durante
a implementação.

### Formato de Requisitos como Código

Requisitos em RAC são arquivos estruturados, tipicamente YAML ou Markdown com
front matter:

```yaml
---
id: REQ-2025-0042
status: draft
priority: high
owner: product-team
tags: [authentication, security]
prompt_version: v2.3.1
model: gpt-4
generated_at: 2025-02-07T14:30:00Z
---

## Descrição
O sistema deve autenticar usuários via OAuth 2.0 com suporte a MFA.

## Critérios de Aceitação
1. DADO que o usuário possui credenciais válidas
   QUANDO tenta login
   ENTÃO recebe token JWT válido por 24h

2. DADO que MFA está habilitado
   QUANDO login é bem-sucedido
   ENTÃO solicita código TOTP

## Dependências
- REQ-2025-0038 (sistema de usuários)
- REQ-2025-0040 (integração OAuth)

## Rastros
- Código: src/auth/oauth.py
- Testes: tests/auth/test_oauth.py
```

Esse formato mistura metadados estruturados (cabeçalho YAML) com descrição em
linguagem natural. Ferramentas podem parsear os metadados; humanos leem o
conteúdo.

______________________________________________________________________

## Rastreabilidade Automatizada

Rastreabilidade é a capacidade de seguir a vida de um requisito, desde sua
origem até sua implementação e teste. Tradicionalmente, isso exige matrizes
mantidas manualmente. Com LLMs, a rastreabilidade pode ser inferida, validada e
mantida automaticamente.

### Arquitetura de Rastreamento

O rastreamento automatizado opera em três camadas:

**Camada de Origem (Prompts)**

Cada requisito gerado carrega metadados de sua origem:

```json
{
  "prompt_id": "prompt-001",
  "prompt_version": "2.1.0",
  "model": "gpt-4-1106-preview",
  "temperature": 0.3,
  "context_hash": "a3f7d9...",
  "generated_at": "2025-02-07T14:30:00Z"
}
```

Esses metadados permitem reproduzir exatamente as condições de geração. Se um
requisito apresenta problema, a equipe pode identificar qual prompt e contexto o
produziram.

**Camada de Transformação**

À medida que requisitos evoluem, transformações são registradas:

- Elicitação → Especificação: registro do prompt usado
- Especificação → Validação: registro de verificações aplicadas
- Validação → Aprovação: registro de revisores e aprovações

Essa cadeia de transformações forma um grafo acíclico dirigido (DAG), onde cada
nó é um artefato e cada aresta é uma operação.

**Camada de Implementação**

A ligação entre requisitos e código pode ser estabelecida via:

1. **Referências em comentários:** código anotado com IDs de requisitos
2. **Análise semântica:** LLM identifica qual código implementa qual requisito
3. **Testes de aceitação:** execução de testes vinculados a requisitos

### Implementação Prática

Um sistema de rastreabilidade automatizada pode ser implementado com as
seguintes componentes:

```python
# rastreabilidade.py
from dataclasses import dataclass
from typing import List, Optional
import hashlib

@dataclass
class Requirement:
    id: str
    description: str
    prompt_id: str
    prompt_version: str
    context_hash: str
    generated_at: str
    status: str = "draft"
    code_refs: List[str] = None
    test_refs: List[str] = None

class TraceabilityEngine:
    def __init__(self, vector_db, llm_client):
        self.vector_db = vector_db
        self.llm = llm_client

    def link_to_code(self, requirement: Requirement, codebase: str):
        """Identifica arquivos de código relacionados ao requisito."""
        query = f"Encontre código que implementa: {requirement.description}"
        results = self.vector_db.similarity_search(query, k=5)
        requirement.code_refs = [r.metadata["file_path"] for r in results]
        return requirement

    def verify_trace(self, requirement: Requirement) -> bool:
        """Verifica se rastros estão atualizados."""
        for code_ref in requirement.code_refs:
            code_hash = self._get_file_hash(code_ref)
            stored_hash = self._get_stored_hash(requirement.id, code_ref)
            if code_hash != stored_hash:
                return False
        return True
```

A engine utiliza embeddings para encontrar similaridade semântica entre
descrição do requisito e código-fonte. Quando o código muda, hashes são
comparados para detectar desalinhamento.

### Matriz de Rastreabilidade Automatizada

Em vez de matrizes manuais, o sistema grega visualizações dinâmicas:

```
Requisito          →  Código                →  Testes           →  Status
──────────────────────────────────────────────────────────────────────────
REQ-001 (Auth)     →  auth/oauth.py         →  test_oauth.py    →  ✅ OK
                   →  auth/mfa.py           →  test_mfa.py      →  ✅ OK

REQ-002 (Pagam.)   →  payment/gateway.py    →  test_payment.py  →  ⚠️  Drift
                   →  payment/webhook.py    →  test_webhook.py  →  ✅ OK

REQ-003 (Notif.)   →  notifications/        →  test_notify.py   →  ❌ Gap
```

O status "Drift" indica que o código mudou desde a última verificação. O status
"Gap" indica requisito sem implementação correspondente.

______________________________________________________________________

## Versionamento e Controle de Mudanças com IA

O versionamento de requisitos em ambientes com IA apresenta desafios
específicos: prompts mudam, contextos evoluem, modelos são atualizados. Um
sistema de versionamento deve capturar não apenas o resultado, mas as condições
de geração.

### Versionamento Semântico de Requisitos

Adota-se uma convenção similar ao SemVer, adaptada:

```
MAJOR.MINOR.PATCH
```

- **MAJOR:** Mudança que invalida implementações existentes
- **MINOR:** Adição de funcionalidade, retrocompatível
- **PATCH:** Correção ou refinamento, sem impacto funcional

Exemplo de evolução:

```
v1.0.0: Requisito inicial (autenticação básica)
v1.1.0: Adicionado suporte a MFA
v1.2.0: Adicionado SSO
v2.0.0: Mudança de OAuth 2.0 para OIDC (breaking change)
```

### Linhas de Base de Prompts

Uma mudança no prompt de elicitação pode alterar todos os requisitos gerados.
Por isso, prompts são versionados independentemente:

```
prompts/
├── elicitation/
│   ├── v1.0.0_stakeholder_interview.md
│   ├── v1.1.0_stakeholder_interview.md
│   └── v2.0.0_stakeholder_interview.md  ← breaking change
```

Cada requisito armazena a versão do prompt que o gerou. Isso permite:

- Reproduzir gerações passadas
- Comparar outputs de diferentes versões de prompt
- Rollback para prompts anteriores se necessário

### Análise de Impacto Automatizada

Quando um requisito muda, LLMs podem avaliar o impacto automaticamente:

```python
# impact_analysis.py
class ImpactAnalyzer:
    def analyze_change(self, requirement_id: str, new_version: dict):
        old_req = self.load_requirement(requirement_id)
        new_req = new_version

        prompt = f"""
        Analise o impacto da mudança:

        REQUISITO ANTIGO:
        {old_req.description}

        REQUISITO NOVO:
        {new_req.description}

        Forneça:
        1. Tipo de mudança: [breaking | additive | cosmetic]
        2. Componentes impactados: [lista]
        3. Esforço estimado de adaptação: [baixo | médio | alto]
        4. Riscos identificados: [lista]
        """

        analysis = self.llm.generate(prompt)
        return self.parse_analysis(analysis)
```

A análise considera não apenas o texto do requisito, mas seus rastros para
código e testes. Se o código impactado é crítico, o sistema eleva o nível de
alerta.

### Propagação de Mudanças

Mudanças em requisitos de alto nível (epics) devem propagar-se para requisitos
derivados:

```
EPIC-001 (v2.0.0)
  ├── US-001.1 (v2.1.0) ← propagado
  ├── US-001.2 (v2.1.0) ← propagado
  └── US-001.3 (v2.0.0) ← não impactado
```

O sistema identifica requisitos filhos, avalia se são afetados e sugere revisão.
A propagação pode ser:

- **Automática:** para mudanças cosméticas
- **Sugerida:** para mudanças de semântica
- **Bloqueada:** requer aprovação manual para breaking changes

______________________________________________________________________

## Sincronização Bidirecional Código-Requisitos

O problema clássico da engenharia de software: requisitos e código divergem. O
código evolui, os requisitos não são atualizados. Ou o inverso: requisitos
mudam, o código permanece obsoleto.

A sincronização bidirecional busca manter consistência automática entre ambos.

### Fluxo de Sincronização

**Requisitos → Código**

Quando requisitos mudam:

1. Sistema identifica código impactado via rastreabilidade
2. Gera sugestões de alteração usando LLM
3. Cria pull request com mudanças propostas
4. Revisor humano aprova ou rejeita

**Código → Requisitos**

Quando código muda significativamente:

1. Sistema detecta alteração via hooks de commit
2. Analisa diff para identificar mudanças funcionais
3. Sugere atualização nos requisitos correspondentes
4. Cria issue para revisão do analista

### Detecção de Divergência

Algoritmo de detecção de drift:

```python
# drift_detector.py
class DriftDetector:
    def detect(self, requirement: Requirement):
        """Detecta divergência entre requisito e implementação."""

        # 1. Recupera código vinculado
        code_files = requirement.code_refs

        # 2. Extrai semântica do código
        code_semantics = []
        for file in code_files:
            content = self.load_file(file)
            embedding = self.embed(content)
            code_semantics.append(embedding)

        # 3. Compara com semântica do requisito
        req_embedding = self.embed(requirement.description)

        for i, code_emb in enumerate(code_semantics):
            similarity = cosine_similarity(req_embedding, code_emb)
            if similarity < 0.7:  # threshold
                return DriftAlert(
                    requirement=requirement.id,
                    file=code_files[i],
                    similarity=similarity,
                    severity="high" if similarity < 0.5 else "medium"
                )

        return None
```

A similaridade semântica mede se o código ainda reflete a intenção do requisito.
Uma mudança de implementação que preserva semântica (refactoring) não gera
alerta.

### Resolução de Conflitos

Quando detecção de conflito ocorre, o sistema pode propor resolução:

```
CONFLITO DETECTADO:
- Requisito REQ-042: "Sistema deve processar pagamentos em 2 segundos"
- Código: Implementação atual tem timeout de 5 segundos

OPÇÕES:
1. Atualizar requisito para 5 segundos
2. Modificar código para 2 segundos
3. Criar requisito alternativo (tiered SLAs)

[Revisor humano decide]
```

A decisão final é sempre humana. O sistema fornece contexto, não substitui
julgamento.

______________________________________________________________________

## Feedback Loops e Aprendizado Contínuo

O verdadeiro valor da gestão contínua está na capacidade de aprendizado. Cada
ciclo de requisitos gera dados que melhoram ciclos futuros.

### Métricas de Qualidade

Coleta sistemática de métricas:

| Métrica             | Definição                                                      | Meta  |
| ------------------- | -------------------------------------------------------------- | ----- |
| Precisão            | % de requisitos implementados corretamente na primeira vez     | > 85% |
| Ambiguidade         | % de requisitos com termos ambíguos detectados                 | < 5%  |
| Drift               | Dias médios entre mudança de requisito e atualização do código | < 2   |
| Rastreabilidade     | % de requisitos com rastros completos (código + testes)        | > 95% |
| Time-to-Requirement | Horas desde necessidade identificada até requisito aprovado    | < 8   |

Essas métricas alimentam dashboards e disparam alertas quando limiares são
violados.

### Retroalimentação de Defeitos

Quando defeitos são encontrados em produção, o sistema analisa:

1. Qual requisito foi mal especificado?
2. Qual prompt gerou esse requisito?
3. Qual verificação deveria ter detectado o problema?

Essa análise alimenta melhorias nos prompts e nos pipelines de validação.

```python
# feedback_loop.py
class DefectFeedback:
    def analyze(self, defect: Defect):
        # Identifica requisito relacionado
        req = self.find_requirement(defect.related_requirement_id)

        # Analisa prompt que gerou o requisito
        prompt_analysis = self.llm.analyze(
            f"""
            Defeito: {defect.description}
            Requisito: {req.description}
            Prompt usado: {req.prompt_version}

            Identifique falhas na especificação que permitiram este defeito.
            Sugira melhorias no prompt para evitar recorrência.
            """
        )

        # Cria sugestão de melhoria no prompt
        self.create_prompt_improvement_issue(prompt_analysis)
```

### Knowledge-Augmented RE

A longo prazo, a organização acumula uma base de conhecimento sobre:

- Prompts efetivos para diferentes tipos de requisitos
- Padrões de erros comuns e como evitá-los
- Contextos organizacionais que melhoram a qualidade

Essa base é consultada automaticamente durante a elicitação, via RAG
(Retrieval-Augmented Generation). O sistema recupera requisitos similares
passados, lições aprendidas e contextos relevantes, enriquecendo o prompt
automaticamente.

### Ciclo de Melhoria Contínua

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CICLO DE APRENDIZADO                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐                  │
│   │ Gerar    │────→│ Validar  │────→│ Medir    │                  │
│   │ Requisito│     │          │     │ Qualidade│                  │
│   └──────────┘     └──────────┘     └────┬─────┘                  │
│         ↑                                 │                        │
│         │                                 ↓                        │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐                  │
│   │ Refinar  │←────│ Analisar │←────│ Coletar  │                  │
│   │ Prompts  │     │ Feedback │     │ Métricas │                  │
│   └──────────┘     └──────────┘     └──────────┘                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

Este ciclo transforma a engenharia de requisitos de atividade prescritiva para
sistema adaptativo. A qualidade melhora organicamente, impulsionada por dados
reais de uso.

______________________________________________________________________

## Ferramentas e Integração

A implementação prática de gestão contínua exige ferramentas que integrem LLMs,
versionamento e rastreabilidade.

### Stack Tecnológica Recomendada

| Componente        | Função                    | Opções               |
| ----------------- | ------------------------- | -------------------- |
| Versionamento     | Git para requisitos       | GitHub, GitLab       |
| LLM               | Geração e análise         | GPT-4, Claude, local |
| Vector DB         | Rastreabilidade semântica | Pinecone, Chroma     |
| CI/CD             | Pipelines de validação    | GitHub Actions       |
| Gestão de Projeto | Interface familiar        | Jira + plugins IA    |

### Integração com Jira

Para equipes que mantêm Jira como fonte de verdade, a integração bidirecional
mantém sincronia:

```
Jira ←────→ Repositório RAC
```

- Issues do Jira são exportadas para arquivos RAC
- Modificações em RAC sincronizam de volta para Jira
- Comentários e histórico são preservados

Plugins como AI Copilot for Jira e Atlassian Intelligence (Rovo) aceleram essa
integração, permitindo geração de requisitos diretamente na interface familiar.

### IBM Engineering Requirements Quality Assistant

Para contextos regulados (aeroespacial, healthcare), o IBM RQA oferece:

- Detecção de ambiguidade em tempo real
- Scoring de qualidade baseado em Watson NLP
- Rastreabilidade compliant com DO-178C, ISO 26262
- Integração com IBM Engineering Lifecycle Management

______________________________________________________________________

## Referências

1. **IEEE Computer Society.** (2024). *Guide to the Software Engineering Body of
   Knowledge (SWEBOK Guide), Version 4.0*. IEEE Computer Society.

2. **ISO/IEC/IEEE.** (2018). *ISO/IEC/IEEE 29148:2018 - Systems and software
   engineering — Life cycle processes — Requirements engineering*.

3. **Vogelsang, A.** (2024). "From Specifications to Prompts: On the Future of
   Generative Large Language Models in Requirements Engineering." *IEEE
   Software, 41(5)*.

4. **Zadenoori, B., et al.** (2025). "Automated User Story Generation with Test
   Case Generation using LLMs." *arXiv:2404.01558*.

5. **ThoughtWorks.** (2025). "AI-Generated Test Cases from User Stories: An
   Experimental Research Study."
   <https://www.thoughtworks.com/insights/blog/generative-ai/AI-generated-test-cases-from-user-stories-an-experimental-research-study>

6. **IBM.** (2024). "Engineering Requirements Quality Assistant." *IBM
   Documentation*. <https://www.ibm.com/docs/en/erqa>

7. **Atlassian.** (2024). "AI Requirements Copilot for Jira." *Atlassian
   Marketplace*.

8. **Hemmat, M., et al.** (2025). "Research Directions for Using LLM in Software
   Requirement Engineering: A Systematic Review." *Frontiers in Computer
   Science, 7*.

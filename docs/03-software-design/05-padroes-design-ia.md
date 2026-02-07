---
title: Novos Padrões de Design para IA
created_at: 2026-02-07
tags: [software-design, ia, padroes, lakshmanan, hapke, llm]
status: published
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 5. Novos Padrões de Design para IA

A engenharia de software para sistemas com IA generativa exige um novo
vocabulário de padrões. Valliappa Lakshmanan e Hannes Hapke, em sua obra
"Generative AI Design Patterns" (O'Reilly, 2024), catalogaram 32 padrões
organizados em sete categorias [^13]. Este capítulo apresenta estes padrões e
frameworks complementares que estruturam o design de aplicações com LLMs.

## 5.1 Framework de 32 Padrões

A experiência prática em construção de aplicações LLM reforça a importância
destes padrões como ferramentas essenciais para superar desafios recorrentes
[^17].

### 1. Controle de Estilo de Conteúdo

Estes padrões governam como o output do modelo é formatado e estilizado:

**Logits Masking:** Técnica para restringir o vocabulário do modelo em tempo de
inferência, forçando outputs em formatos específicos (ex: apenas código JSON
válido).

```python
# Exemplo conceitual de logits masking
from transformers import LogitsProcessor

class JSONLogitsProcessor(LogitsProcessor):
    def __call__(self, input_ids, scores):
        # Mascarar tokens que violariam sintaxe JSON
        if not self.is_json_valid_so_far(input_ids):
            scores = self.mask_invalid_tokens(scores)
        return scores
```

**Style Transfer:** Aplicação de estilos específicos a conteúdo gerado — desde
tom de voz até formatos técnicos específicos.

**Prompt Templates:** Estruturas reutilizáveis de prompts com placeholders para
variáveis, garantindo consistência nas interações.

```python
class PromptTemplate:
    TEMPLATE = """
    Você é um {role} especializado em {domain}.

    Contexto: {context}

    Tarefa: {task}

    Restrições:
    {constraints}

    Formato de saída: {output_format}
    """

    def render(self, **kwargs) -> str:
        return self.TEMPLATE.format(**kwargs)
```

### 2. Adição de Conhecimento

Estes padrões endereçam a limitação fundamental de LLMs: conhecimento estático e
alucinações.

**RAG (Retrieval-Augmented Generation):** Arquitetura que combina retrieval de
documentos relevantes com geração contextualizada:

```
┌─────────────────────────────────────────────┐
│            RAG Pipeline                      │
├─────────────────────────────────────────────┤
│                                              │
│  Query ──▶ Embedding ──▶ Vector Store        │
│                            │                 │
│                            ▼                 │
│  Context ◀── Retrieval (Top-K docs)         │
│     │                                        │
│     ▼                                        │
│  Augmented Prompt ──▶ LLM ──▶ Response       │
│                                              │
└─────────────────────────────────────────────┘
```

**Semantic Indexing:** Indexação de documentos baseada em embeddings semânticos,
permitindo busca por significado além de keywords.

**Deep Search:** Técnicas avançadas de retrieval incluindo reranking, query
expansion e fusion retrieval.

### 3. Extensão de Capacidades do Modelo

Padrões para superar limitações intrínsecas dos LLMs:

**Chain of Thought (CoT):** Técnica de prompting que solicita ao modelo explicar
seu raciocínio passo a passo, melhorando performance em tarefas complexas de
raciocínio.

```markdown
## Exemplo de Chain of Thought

Pergunta: Uma loja tem 15 maçãs. Deram 7 para um cliente,
compraram 10 novas e venderam 3. Quantas maçãs restam?

Prompt otimizado:
"Resolva este problema passo a passo, mostrando seu
raciocínio:
1. Quantas maçãs havia inicialmente?
2. Quantas foram dadas/diminuídas?
3. Quantas foram adicionadas?
4. Qual o total final?"
```

**Adapter Tuning:** Fine-tuning eficiente que ajusta apenas camadas adapter do
modelo, mantendo pesos base congelados.

**Evol-Instruct:** Método para evoluir instruções de treinamento, aumentando
complexidade e diversidade dos dados.

### 4. Melhoria de Confiabilidade

Padrões para garantir qualidade e consistência:

**LLM-as-Judge:** Uso de um LLM para avaliar outputs de outro LLM ou do mesmo
modelo em iterações diferentes.

```python
class LLMJudge:
    def __init__(self, judge_model: LLMProvider):
        self.judge = judge_model

    def evaluate(self, response: str, criteria: List[str]) -> Evaluation:
        prompt = f"""
        Avalie a seguinte resposta segundo os critérios:
        {criteria}

        Resposta: {response}

        Forneça:
        1. Nota (1-10) para cada critério
        2. Justificativa
        3. Sugestões de melhoria
        """
        return self.judge.generate(prompt)
```

**Reflection:** Padrão onde o modelo avalia e melhora suas próprias saídas
através de auto-verificação.

**Prompt Optimization:** Técnicas automáticas para otimização de prompts,
incluindo A/B testing e otimização bayesiana.

### 5. Habilitação de Agentes

Padrões para sistemas autônomos:

**Tool Calling:** Permite que LLMs invoquem funções externas através de chamadas
estruturadas:

```python
# Definição de ferramentas disponíveis para o modelo
tools = [
    {
        "name": "get_weather",
        "description": "Obtém previsão do tempo para uma localização",
        "parameters": {
            "location": {"type": "string", "required": True},
            "days": {"type": "integer", "default": 1}
        }
    },
    {
        "name": "search_database",
        "description": "Busca informações no banco de dados",
        "parameters": {
            "query": {"type": "string", "required": True}
        }
    }
]

# O modelo pode decidir chamar: {"tool": "get_weather", "parameters": {"location": "São Paulo"}}
```

**Multi-agent Collaboration:** Padrões para coordenação de múltiplos agentes
especializados.

### 6. Endereçamento de Constraints

Padrões para otimização de recursos:

**Small Language Model (SLM):** Uso de modelos menores e mais eficientes para
tarefas simples, reduzindo custo e latência.

**Prompt Caching:** Cache de embeddings e respostas frequentes para minimizar
chamadas redundantes.

**Inference Optimization:** Técnicas como quantization, pruning e batching para
melhorar throughput.

### 7. Salvaguardas

Padrões para segurança e alinhamento:

**Guardrails:** Sistema de proteção em múltiplas camadas:

- Input validation: Verificação de prompts maliciosos
- Output filtering: Filtro de conteúdo inadequado
- Topic constraints: Restrição a domínios permitidos

```python
class GuardrailSystem:
    def __init__(self):
        self.input_validator = InputValidator()
        self.output_filter = OutputFilter()
        self.topic_guard = TopicGuard(allowed_topics=["tecnologia", "negócios"])

    def process(self, input_text: str, llm: LLMProvider) -> SafeResponse:
        # Validação de entrada
        if not self.input_validator.is_safe(input_text):
            return SafeResponse(blocked=True, reason="Input inseguro")

        # Geração
        raw_output = llm.generate(input_text)

        # Validação de saída
        if not self.output_filter.is_safe(raw_output):
            return SafeResponse(blocked=True, reason="Output inseguro")

        if not self.topic_guard.is_on_topic(raw_output):
            return SafeResponse(blocked=True, reason="Fora do tópico")

        return SafeResponse(blocked=False, content=raw_output)
```

**Self-Check:** Mecanismo onde o modelo verifica suas próprias respostas antes
de entregá-las.

## 5.2 LLM Triangle Principles

Framework de três princípios fundamentais para arquitetar aplicações LLM
confiáveis [^18]:

### 1. Standard Operating Procedure (SOP)

Documentação clara de procedimentos que o sistema deve seguir. SOPs fornecem
estrutura e previsibilidade:

```markdown
## SOP: Processamento de Solicitação de Suporte

1. Receber solicitação do usuário
2. Classificar categoria (técnico, financeiro, geral)
3. Verificar base de conhecimento para soluções existentes
4. Se solução encontrada: fornecer resposta padronizada
5. Se não encontrada: escalar para agente humano
6. Registrar interação para análise futura
```

### 2. Prompt Chaining

Decomposição de tarefas complexas em etapas sequenciais, cada uma com prompt
específico:

```
Input do Usuário
      │
      ▼
┌─────────────┐
│   Step 1    │ ◀── Extrair intenção
│  Intent     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Step 2    │ ◀── Buscar contexto relevante
│  Retrieve   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Step 3    │ ◀── Gerar resposta fundamentada
│  Generate   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Step 4    │ ◀── Validar e formatar
│  Validate   │
└──────┬──────┘
       │
       ▼
   Resposta Final
```

### 3. RAG como Fundação

Grounding em dados verificáveis para reduzir alucinações e aumentar
confiabilidade.

## 5.3 Seis Princípios de Design para Generative AI

Pesquisa do IBM Research apresentada na CHI 2024 estabeleceu seis princípios
fundamentais para design de aplicações Generative AI [^19]:

### 1. Clareza de Propósito e Limitações

Usuários devem compreender claramente o que o sistema faz e suas limitações:

- Comunicar o escopo de capacidades do sistema
- Indicar quando o sistema está incerto
- Ser transparente sobre o uso de IA

### 2. Controle e Personalização

Usuários devem ter controle sobre interações:

- Permitir ajuste de parâmetros (temperatura, estilo)
- Oferecer opções de correção
- Suportar personalização de preferências

### 3. Feedback e Transparência

O sistema deve comunicar seu processamento:

- Indicadores de progresso em operações longas
- Explicação de como respostas foram geradas
- Citação de fontes quando aplicável (RAG)

### 4. Gerenciamento de Erros Gracefully

Falhas devem ser tratadas elegantemente:

- Mensagens de erro claras e construtivas
- Sugestões de ação alternativa
- Fallbacks para operação manual

### 5. Privacidade e Segurança

Proteção de dados e uso responsável:

- Consentimento explícito para uso de dados
- Anonimização de informações sensíveis
- Conformidade com regulamentações (GDPR, LGPD)

### 6. Inclusão e Acessibilidade

Design para diversidade de usuários:

- Suporte a múltiplos idiomas
- Adaptação a diferentes níveis de literacia técnica
- Compatibilidade com tecnologias assistivas

## 5.4 Síntese: Um Novo Vocabulário de Design

Estes padrões e princípios compõem um novo vocabulário técnico para engenheiros
de software:

| Domínio          | Padrões Tradicionais  | Padrões de IA              |
| ---------------- | --------------------- | -------------------------- |
| **Controle**     | Validadores           | Guardrails, Logits Masking |
| **Conhecimento** | Cache, Banco de Dados | RAG, Semantic Indexing     |
| **Qualidade**    | Testes Unitários      | LLM-as-Judge, Reflection   |
| **Eficiência**   | Connection Pooling    | Prompt Caching, SLM        |
| **Autonomia**    | Workflow Engines      | Tool Calling, Multi-Agent  |

A adoção destes padrões requer não apenas conhecimento técnico, mas também
julgamento sobre quando cada padrão é apropriado — uma decisão de design
fundamental na era da IA.

## Referências

[^13]: Lakshmanan, Valliappa & Hapke, Hannes. "Generative AI Design Patterns."
    O'Reilly, 2024.

[^17]: Medium. "What I Learned from Building LLM Applications." 2024.

[^18]: Medium. "The LLM Triangle Principles to Architect Reliable AI Apps."
    2025\.

[^19]: IBM Research. "Design Principles for Generative AI Applications." CHI
    2024\.

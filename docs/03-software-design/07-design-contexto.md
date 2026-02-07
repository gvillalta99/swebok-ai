---
title: Design Centrado em Contexto
created_at: 2026-02-07
tags: [software-design, context-engineering, contexto, janela-de-contexto, pilares]
status: published
updated_at: 2026-02-07
ai_model: kimi-for-coding/k2p5
---

# 7. Design Centrado em Contexto

A premissa central deste capítulo é que **o contexto tornou-se o ativo mais valioso no design de software com IA**. Enquanto código torna-se commodity gerável por máquinas, a especificação precisa do ambiente informacional — o contexto — determina a qualidade, relevância e confiabilidade dos outputs de sistemas de IA.

## 7.1 Context Engineering: A Nova Disciplina

Context Engineering emergiu como disciplina sistemática para construir com LLMs, suplantando o termo mais limitado "prompt engineering" [^24]. Esta evolução conceitual reflete uma mudança fundamental: foco no ambiente completo de informação, não apenas nas instruções diretas.

### Definição

Context Engineering é a **engenharia sistemática de todo o ambiente informacional** que o modelo utiliza para gerar respostas. Engloba:

- System prompts e personas
- Histórico de conversação
- Dados recuperados (RAG)
- Ferramentas disponíveis
- Estruturas de memória
- Constraints e guardrails

### Modelo Mental

A relação fundamental pode ser expressa como:

```
LLM = f(contexto) → geração
```

Onde:

- A função `f` é o modelo treinado (fixo)
- A variável controlável é o **contexto**
- A saída é a **geração**

Neste modelo, a janela de contexto é a **alavanca de controle primária** do engenheiro.

!!! info "De Prompt para Contexto"

    Prompt Engineering foca na instrução. Context Engineering foca no
    ecossistema informacional completo que precede a instrução.

## 7.2 Os Seis Pilares do Context Engineering

Weaviate (2025) propôs um framework de seis pilares para Context Engineering [^25]:

### 1. Agents

Agentes orquestram decisões, atuando como usuários e arquitetos do fluxo de contexto:

```python
class ContextOrchestrator:
    """Agente responsável por gerenciar fluxo de contexto"""

    def __init__(self):
        self.context_window = ContextWindow(max_tokens=128000)
        self.retriever = ContextRetriever()
        self.memory_manager = MemoryManager()

    def prepare_context(self, user_query: str, session_id: str) -> Context:
        # Recupera contexto relevante
        retrieved = self.retriever.search(user_query, top_k=5)

        # Recupera memória de longo prazo
        memory = self.memory_manager.get(session_id)

        # Monta contexto prioritário
        context = Context()
        context.add_system_prompt(self.get_system_prompt())
        context.add_retrieved_documents(retrieved)
        context.add_conversation_history(memory.get_recent(10))
        context.add_user_query(user_query)

        # Otimiza para janela de contexto
        return self.optimize(context)
```

### 2. Query Augmentation

Refinamento do input do usuário para diferentes ferramentas downstream:

```python
class QueryAugmenter:
    """Expande e melhora queries para melhor retrieval"""

    def augment(self, user_query: str) -> List[str]:
        # Gera variações da query
        variations = [
            user_query,
            self.generate_synonyms(user_query),
            self.expand_acronyms(user_query),
            self.generate_hypothetical_answer(user_query)
        ]

        return variations

    def generate_hypothetical_answer(self, query: str) -> str:
        """Gera resposta hipotética para melhorar busca semântica"""
        prompt = f"Responda brevemente: {query}"
        return self.llm.generate(prompt, max_tokens=100)
```

### 3. Retrieval

Otimização do fetching de conhecimento externo:

```python
class OptimizedRetriever:
    def retrieve(
        self,
        query: str,
        strategy: RetrievalStrategy = RetrievalStrategy.HYBRID
    ) -> List[Document]:
        if strategy == RetrievalStrategy.SEMANTIC:
            return self.vector_search(query)
        elif strategy == RetrievalStrategy.KEYWORD:
            return self.bm25_search(query)
        elif strategy == RetrievalStrategy.HYBRID:
            semantic_results = self.vector_search(query)
            keyword_results = self.bm25_search(query)
            return self.rerank_fusion(semantic_results, keyword_results)
```

### 4. Memory

Gerenciamento de estado de curto e longo prazo:

```python
class MemoryManager:
    """Sistema de memória hierárquica"""

    def __init__(self):
        self.working_memory = {}  # Sessão atual
        self.short_term_db = Redis()  # Últimas horas
        self.long_term_db = VectorStore()  # Persistente

    def store_interaction(self, session_id: str, interaction: Interaction):
        # Working memory (imediato)
        if session_id not in self.working_memory:
            self.working_memory[session_id] = []
        self.working_memory[session_id].append(interaction)

        # Short-term (recuperação rápida)
        self.short_term_db.setex(
            f"session:{session_id}",
            timedelta(hours=24),
            interaction
        )

        # Long-term (embedding semântico)
        embedding = self.embed(interaction.content)
        self.long_term_db.store(embedding, interaction.metadata)
```

### 5. Tooling

Integração com ferramentas externas:

```python
class ToolRegistry:
    """Registro e gerenciamento de ferramentas disponíveis"""

    def __init__(self):
        self.tools: Dict[str, Tool] = {}

    def register(self, tool: Tool):
        self.tools[tool.name] = tool

    def get_available_tools_schema(self) -> List[Dict]:
        """Retorna schemas para o LLM decidir uso"""
        return [tool.get_schema() for tool in self.tools.values()]

    def execute(self, tool_name: str, parameters: Dict) -> Any:
        if tool_name not in self.tools:
            raise UnknownToolError(f"Ferramenta {tool_name} não encontrada")
        return self.tools[tool_name].execute(**parameters)
```

### 6. Output Structure

Definição de esquemas de saída estruturada:

```python
from pydantic import BaseModel
from typing import List, Optional

class AnalysisOutput(BaseModel):
    """Schema estruturado para saída de análise"""
    summary: str
    key_points: List[str]
    sentiment: str
    confidence: float
    follow_up_questions: Optional[List[str]] = None

    class Config:
        schema_extra = {
            "example": {
                "summary": "Análise concluída",
                "key_points": ["Ponto 1", "Ponto 2"],
                "sentiment": "positivo",
                "confidence": 0.95
            }
        }

# Uso com LLM estruturado
response = llm.generate_structured(
    prompt="Analise o seguinte texto...",
    schema=AnalysisOutput
)
```

## 7.3 Componentes de Contexto

InfoWorld (2024) descreve as camadas de contexto que compõem o ambiente informacional de um sistema com LLM [^26]:

| Componente | Descrição | Exemplo |
|------------|-----------|---------|
| **System Prompts** | Papéis, personalidade e constraints do sistema | "Você é um assistente técnico especializado em Python" |
| **User Prompts** | Especificações de tarefa do usuário atual | "Refatore esta função para usar list comprehensions" |
| **State/History** | Memória de curto prazo da conversação | Últimas 10 interações da sessão |
| **Long-term Memory** | Dados persistentes do usuário/sistema | Preferências, histórico de projetos |
| **Retrieved Information** | Documentos recuperados via RAG | Trechos relevantes da documentação |
| **Available Tools** | Chamadas de função disponíveis | APIs de busca, banco de dados |
| **Structured Output** | Esquemas de resposta esperados | JSON schema, Pydantic models |

### Exemplo de Composição de Contexto

```python
def build_context(request: UserRequest, session: Session) -> Context:
    context = Context()

    # 1. System Prompt (base)
    context.add_system_message(
        "Você é um assistente de programação. "
        "Forneça código limpo, bem documentado e seguindo PEP 8. "
        "Explique o raciocínio quando relevante."
    )

    # 2. User Prompt (tarefa)
    context.add_user_message(request.message)

    # 3. Conversation History (estado)
    for msg in session.get_recent_messages(limit=10):
        context.add_message(msg.role, msg.content)

    # 4. Retrieved Knowledge (RAG)
    relevant_docs = retriever.search(request.message, top_k=3)
    context.add_retrieved_context(relevant_docs)

    # 5. Long-term Memory
    user_prefs = memory.get_user_preferences(session.user_id)
    context.add_system_message(
        f"Preferências do usuário: {user_prefs}"
    )

    # 6. Available Tools
    tools = tool_registry.get_relevant_tools(request.message)
    context.add_tools(tools)

    # 7. Output Schema
    context.set_output_schema(request.expected_format)

    return context
```

## 7.4 Design Patterns para Context Window

As janelas de contexto expandiram-se dramaticamente (Claude 3 Opus: 200K tokens; Gemini 1.5 Pro: até 2 milhões), mas isto não elimina desafios fundamentais [^26].

### Desafios de Contexto Longo

**Diluição de Atenção:**
Em contextos muito longos, o modelo pode perder foco em informações críticas.

**Efeito de Posição Serial:**
Pesquisas demonstram que LLMs processam mais confiavelmente:

- Informações no **início** do contexto (primacy effect)
- Informações no **final** do contexto (recency effect)
- Informações no **meio** são mais propensas a serem ignoradas

**Custo Computacional:**
Custo de inferência cresce de forma não-linear com o tamanho do contexto.

### Soluções e Patterns

#### 1. Chunking Estratégico

Divisão de documentos em blocos semanticamente coerentes:

```python
class SemanticChunker:
    def __init__(self, chunk_size: int = 512, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk(self, document: str) -> List[Chunk]:
        # Divide preservando fronteiras semânticas
        paragraphs = self.split_by_semantics(document)

        chunks = []
        current_chunk = []
        current_size = 0

        for para in paragraphs:
            para_size = self.estimate_tokens(para)

            if current_size + para_size > self.chunk_size:
                chunks.append(Chunk(" ".join(current_chunk)))
                # Mantém overlap
                current_chunk = current_chunk[-self.overlap:]
                current_size = sum(self.estimate_tokens(p) for p in current_chunk)

            current_chunk.append(para)
            current_size += para_size

        if current_chunk:
            chunks.append(Chunk(" ".join(current_chunk)))

        return chunks
```

#### 2. Hierarchical Context

Contexto em múltiplos níveis de abstração:

```
Nível 1: Resumo Executivo (50 tokens)
    │
    ├── Nível 2: Sumários de Seção (200 tokens)
    │       │
    │       ├── Nível 3: Detalhes Específicos (resto)
    │       │       └── Documentos completos quando necessário
```

```python
class HierarchicalContext:
    def __init__(self):
        self.executive_summary = ""
        self.section_summaries = {}
        self.full_documents = {}

    def add_document(self, doc_id: str, content: str):
        # Nível 3: Completo
        self.full_documents[doc_id] = content

        # Nível 2: Sumário de seção
        self.section_summaries[doc_id] = self.summarize(content, max_tokens=200)

        # Nível 1: Resumo executivo atualizado
        self.executive_summary = self.update_executive_summary()

    def get_context_for_query(self, query: str, budget: int) -> str:
        # Sempre inclui resumo executivo
        context_parts = [self.executive_summary]
        remaining_budget = budget - self.estimate_tokens(self.executive_summary)

        # Seleciona seções mais relevantes
        relevant_sections = self.select_relevant(query, self.section_summaries)

        for section_id in relevant_sections:
            section = self.section_summaries[section_id]
            if self.estimate_tokens(section) < remaining_budget:
                context_parts.append(section)
                remaining_budget -= self.estimate_tokens(section)

        # Se sobrar budget, adiciona documentos completos relevantes
        for section_id in relevant_sections:
            if remaining_budget <= 0:
                break
            full_doc = self.full_documents[section_id]
            # Trunca se necessário
            truncated = self.truncate_to_budget(full_doc, remaining_budget)
            context_parts.append(truncated)
            remaining_budget -= self.estimate_tokens(truncated)

        return "\n\n".join(context_parts)
```

#### 3. Selective Attention

Foco em partes relevantes do contexto:

```python
class SelectiveAttention:
    def __init__(self, llm: LLMProvider):
        self.llm = llm

    def focus_context(
        self,
        query: str,
        full_context: str,
        max_context_tokens: int
    ) -> str:
        # Divide contexto em seções numeradas
        sections = self.split_sections(full_context)
        numbered_context = self.number_sections(full_context)

        # Primeiro passo: identificar partes relevantes
        relevance_prompt = f"""
        Dado a query: {query}
        Identifique quais seções do contexto abaixo são mais relevantes.
        Responda APENAS com uma lista de números das seções relevantes
        (exemplo: "1, 3, 5" ou "2, 4").

        Contexto dividido em seções:
        {numbered_context}

        Responda apenas com os números das seções relevantes, separados por vírgula:"""

        response = self.llm.generate(relevance_prompt)

        # Parsing robusto da resposta
        try:
            # Extrai números da resposta
            import re
            numbers = re.findall(r'\d+', response)
            relevant_indices = [int(n) - 1 for n in numbers if int(n) > 0]

            # Valida índices
            relevant_indices = [i for i in relevant_indices if i < len(sections)]
        except (ValueError, IndexError):
            # Fallback: usa todas as seções se parsing falhar
            relevant_indices = list(range(len(sections)))

        # Seleciona apenas partes relevantes
        relevant_sections = [sections[i] for i in relevant_indices if i < len(sections)]

        # Combina até atingir limite de tokens
        result = []
        current_tokens = 0

        for section in relevant_sections:
            section_tokens = self.estimate_tokens(section)
            if current_tokens + section_tokens <= max_context_tokens:
                result.append(section)
                current_tokens += section_tokens
            else:
                break

        return "\n".join(result)
```

#### 4. Context Compression

Sumarização dinâmica de histórico:

```python
class ContextCompressor:
    def __init__(self, llm: LLMProvider):
        self.llm = llm
        self.compression_threshold = 0.8  # Compress quando 80% da janela

    def compress_history(self, history: List[Message]) -> List[Message]:
        # Calcula tokens atuais
        total_tokens = sum(self.estimate_tokens(m.content) for m in history)
        max_tokens = self.get_max_context()

        if total_tokens / max_tokens < self.compression_threshold:
            return history  # Não precisa comprimir

        # Divide em antigo e recente
        split_point = len(history) // 2
        older = history[:split_point]
        recent = history[split_point:]

        # Comprime parte antiga
        older_content = "\n".join([m.content for m in older])
        summary = self.summarize_conversation(older_content)

        # Retorna mensagem sumarizada + mensagens recentes
        compressed = [
            Message(role="system", content=f"Resumo da conversa anterior: {summary}")
        ] + recent

        return compressed

    def summarize_conversation(self, content: str) -> str:
        prompt = f"""
        Resuma a seguinte conversa mantendo:
        - Tópicos principais discutidos
        - Decisões tomadas
        - Informações importantes do usuário
        - Contexto necessário para continuar

        Conversa:
        {content}

        Resumo conciso (máximo 200 palavras):
        """
        return self.llm.generate(prompt, max_tokens=300)
```

## 7.5 Síntese: Contexto como Capital

A disciplina de Context Engineering representa a materialização da premissa de que **contexto é capital**. O engenheiro de software contemporâneo investe em:

- **Infraestrutura de contexto:** Sistemas de RAG, memória, retrieval
- **Engenharia de contexto:** Design de prompts, exemplos, constraints
- **Otimização de contexto:** Compressão, chunking, atenção seletiva
- **Governança de contexto:** Versionamento, avaliação, privacidade

O diferencial competitivo já não reside na capacidade de escrever código, mas na capacidade de **especificar o contexto dentro do qual o código é gerado**.

## Referências

[^24]: Intellectronica. "Context Engineering: A Primer." 2025.

[^25]: Weaviate. "Context Engineering for AI Agents." 2025.

[^26]: InfoWorld. "What is context engineering and why it's the new AI architecture." 2024.

---
title: 03. Padrões de Design para Sistemas Híbridos
created_at: '2025-01-31'
tags: [software-design, padroes, sistemas-hibridos, ia, human-ai, rag, react]
status: review
updated_at: '2026-02-04'
ai_model: gemini-3-pro-preview
---

# Padrões de Design para Sistemas Híbridos

## Contexto

A engenharia de software tradicional baseava-se em padrões de estrutura e
criação de objetos (Singleton, Factory, Strategy). Em sistemas híbridos (Humanos
\+ IA), o desafio não é mais instanciar classes, mas orquestrar **fluxos de
raciocínio** e **interações semânticas**.

O código determinístico agora atua como o "sistema nervoso" que conecta,
restringe e valida os "músculos cognitivos" dos LLMs. Não estamos mais
desenhando apenas diagramas de classes, mas grafos de fluxo de dados semânticos
onde a probabilidade é uma cidadã de primeira classe.

## Paradigma Shift: De Objetos para Fluxos Cognitivos

| Padrão Tradicional (GoF)    | Padrão Híbrido (SWEBOK-AI)               | Mudança Fundamental                                                                                                   |
| --------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Strategy**                | **Semantic Router**                      | A decisão de qual caminho tomar não é um `if/else` hardcoded, mas uma classificação semântica da intenção do usuário. |
| **Decorator**               | **RAG (Retrieval-Augmented Generation)** | "Decoramos" o prompt com contexto dinâmico recuperado externamente antes da execução.                                 |
| **Observer**                | **Self-Reflection / Critic**             | Um agente observa a saída de outro (ou a sua própria) para validar fatos ou segurança antes da entrega.               |
| **Chain of Responsibility** | **ReAct (Reasoning + Acting)**           | Uma cadeia dinâmica de pensamentos, ações e observações até atingir um objetivo, não uma lista estática de handlers.  |

______________________________________________________________________

## Padrões Arquiteturais Cognitivos

### 1. RAG (Retrieval-Augmented Generation)

**O Padrão de Aterramento (Grounding)**

Não confie na memória paramétrica do modelo para fatos específicos. Injete o
conhecimento no contexto em tempo de execução.

- **Mecanismo:** Query do Usuário -> Busca Vetorial/Keyword -> Recuperação de
  Chunks -> Injeção no Prompt -> Geração.
- **Por que usar:** Reduz alucinações, permite atualização de conhecimento sem
  re-treino, garante citações de fontes.
- **Variação Avançada:** *GraphRAG* (usa grafos de conhecimento para recuperar
  relacionamentos, não apenas similaridade semântica).

### 2. Semantic Router

**O Padrão de Controle de Fluxo**

Use um LLM pequeno e rápido (ou um modelo de embedding) para classificar a
intenção do usuário e rotear para um "caminho determinístico" específico. Evita
que um modelo generalista tente resolver tudo.

- **Mecanismo:** Input -> Classificador de Intenção -> Roteamento -> (Agente
  Especialista A | Agente Especialista B | Função Determinística).
- **Exemplo:** Se o usuário pede "resetar senha", o Semantic Router detecta a
  intenção e chama a API de reset diretamente, sem passar pelo LLM de chat.
- **Benefício:** Redução drástica de custo e latência; aumento de segurança.

### 3. ReAct (Reasoning + Acting)

**O Padrão de Agente Autônomo**

Permite que o modelo "pense" sobre o que fazer, execute uma ação (uso de
ferramenta), observe o resultado e decida o próximo passo.

- **Loop:** Thought (Pensamento) -> Action (Ação) -> Observation (Resultado da
  Tool) -> Thought... -> Final Answer.
- **Uso:** Tarefas complexas que exigem múltiplos passos ou acesso a dados em
  tempo real (ex: "Qual o tempo em SP e como isso afeta meu voo?").
- **Risco:** Loops infinitos se não houver *guardrails* de parada.

### 4. Self-Reflection / Critic

**O Padrão de Controle de Qualidade**

Um modelo gera uma resposta, e outro modelo (ou o mesmo em um novo turno)
critica essa resposta buscando erros, alucinações ou falhas de segurança.

- **Fluxo:** Gerador -> Rascunho -> Crítico -> Feedback -> Gerador ->
  Refinamento.
- **Aplicação:** Geração de código (o crítico é o compilador/linter + LLM),
  redação de documentos técnicos.
- **Custo:** Dobra ou triplica o consumo de tokens, mas aumenta
  significativamente a precisão.

### 5. Structured Output (Schema Enforcement)

**O Padrão de Interface**

Nunca deixe o LLM retornar texto livre quando você precisa de dados estruturados
para o seu sistema. Force a saída em JSON/XML validado contra um schema.

- **Mecanismo:** Prompt com definição de Schema (Pydantic/Zod) -> LLM -> Parser
  -> Validação -> Objeto Tipado.
- **Ferramentas:** Instructor, Guidance, Function Calling nativo.

______________________________________________________________________

## Checklist Prático

O que implementar na sua arquitetura amanhã:

1. **Adote Semantic Routing:** Pare de enviar "Olá" para o GPT-4. Use embeddings
   para detectar saudações ou perguntas frequentes e responda com scripts.
2. **Force JSON:** Se o output do LLM vai ser consumido por código, use
   *Function Calling* ou bibliotecas como `Instructor` para garantir o schema.
3. **Implemente Citação Obrigatória:** Em RAG, o modelo só pode responder se
   citar o ID do chunk de onde tirou a informação.
4. **Limite o ReAct:** Defina um número máximo de passos (ex: 5) para evitar que
   o agente entre em loop gastando dinheiro.
5. **Separe Prompts do Código:** Trate prompts como arquivos de configuração ou
   código fonte versionado, não strings soltas no meio do Python/JS.
6. **Cache Semântico:** Se a pergunta é semanticamente idêntica a uma anterior
   (distância de cosseno < 0.05), retorne a resposta cacheada.

______________________________________________________________________

## Armadilhas Comuns (Anti-Patterns)

1. **RAG Naïve (Busca Burra):** Pegar os top-k chunks por similaridade e jogar
   no prompt sem re-rankear ou filtrar. Resulta em contexto poluído e respostas
   confusas.
2. **O Agente "Deus":** Tentar criar um único prompt gigante que faz tudo.
   Quebre em agentes especialistas orquestrados.
3. **Confiança Cega no Contexto:** Assumir que se está no contexto, o modelo vai
   usar. Modelos têm "atenção seletiva" e podem ignorar instruções no meio de
   textos longos (*Lost in the Middle*).
4. **Vazamento de Prompt:** Expor a lógica interna do sistema através de *Prompt
   Injection* porque não houve separação entre dados do usuário e instruções do
   sistema.
5. **Over-Engineering:** Usar um framework de agentes complexo (LangChain,
   AutoGen) para algo que uma simples chamada de API com prompt bem feito
   resolveria.

______________________________________________________________________

## Exemplo Mínimo: Semantic Router em Python

Cenário: Um sistema de suporte que decide se usa um LLM caro (GPT-4) ou uma
resposta determinística barata.

```python
import openai
from typing import Callable

# Simulação de um Router simples baseado em palavras-chave
# Em produção, usaríamos embeddings (ex: cosine similarity)
class SemanticRouter:
    def __init__(self):
        self.routes = {
            "reset_password": self._handle_password,
            "billing": self._handle_billing,
            "general": self._handle_llm
        }

    def route(self, user_query: str) -> str:
        # Lógica de classificação simplificada
        query_lower = user_query.lower()
        if "senha" in query_lower or "password" in query_lower:
            return self.routes["reset_password"]()
        elif "fatura" in query_lower or "pagamento" in query_lower:
            return self.routes["billing"]()
        else:
            return self.routes["general"](user_query)

    def _handle_password(self):
        return "AÇÃO DETERMINÍSTICA: Redirecionando para /reset-password..."

    def _handle_billing(self):
        return "AÇÃO DETERMINÍSTICA: Abrindo painel financeiro..."

    def _handle_llm(self, query):
        # Só gasta tokens aqui se realmente necessário
        return f"CHAMADA LLM (Custo $$$): Processando '{query}' com GPT-4..."

# Uso
router = SemanticRouter()

print(router.route("Esqueci minha senha"))
# Output: AÇÃO DETERMINÍSTICA: Redirecionando para /reset-password...

print(router.route("Como configuro o docker no linux?"))
# Output: CHAMADA LLM (Custo $$$): Processando 'Como configuro o docker no linux?' com GPT-4...
```

______________________________________________________________________

## Resumo Executivo

- **Design Cognitivo:** A arquitetura de software agora inclui o design de como
  a informação é processada semanticamente, não apenas como os dados são
  movidos.
- **RAG é Obrigatório:** Para qualquer aplicação corporativa séria, o
  conhecimento deve vir de fontes externas recuperadas, não do treino do modelo.
- **Determinismo Primeiro:** Use Semantic Routers para interceptar intenções
  conhecidas e resolvê-las com código clássico antes de chamar a IA.
- **Agentes são Loops:** O padrão ReAct transforma a IA de um oráculo passivo em
  um operador ativo de sistemas, mas exige monitoramento rigoroso.
- **Validação na Saída:** Nunca confie na saída crua do LLM; force estrutura
  (JSON) e valide com *self-reflection* ou validadores de código.

## Próximos Passos

- Estudar **GraphRAG** para melhorar a recuperação de contextos complexos.
- Implementar **DSPy** para otimizar prompts programaticamente baseados em
  métricas de sucesso.
- Explorar **Modelos de Embedding** locais para roteamento semântico de latência
  zero.

## Matriz de Avaliação

| Critério               | Avaliação | Justificativa                                                                                                 |
| :--------------------- | :-------- | :------------------------------------------------------------------------------------------------------------ |
| **Maturidade**         | Média     | RAG é padrão de indústria; Agentes Autônomos ainda são experimentais em produção crítica.                     |
| **Complexidade**       | Alta      | Debugar fluxos probabilísticos é muito mais difícil que debugar código determinístico.                        |
| **Custo Operacional**  | Variável  | Mal desenhado (loops infinitos, contexto excessivo) pode ser caríssimo. Bem desenhado (roteamento), é viável. |
| **Risco de Segurança** | Alto      | Prompt Injection e execução de ferramentas exigem *sandboxing* rigoroso.                                      |

## Referências

1. **Lewis, P., et al. (2020).** "Retrieval-Augmented Generation for
   Knowledge-Intensive NLP Tasks." NeurIPS.
2. **Wei, J., et al. (2022).** "Chain-of-Thought Prompting Elicits Reasoning in
   Large Language Models." NeurIPS.
3. **Yao, S., et al. (2023).** "ReAct: Synergizing Reasoning and Acting in
   Language Models." ICLR.
4. **Chase, H.** (2023). "LangChain: Building applications with LLMs." (Conceito
   de Chains e Agents).

---
title: Fundamentos Essenciais de Inteligência Artificial
created_at: '2026-02-07'
tags: [llm, transformer, prompt-engineering, rag, agentes, estatistica, fundamentos]
status: published
updated_at: '2026-02-07'
ai_model: k2p5
agent: book-writer
---

# Fundamentos Essenciais de Inteligência Artificial

Esta seção apresenta os conceitos técnicos fundamentais necessários para
compreender as capacidades e limitações dos sistemas de Inteligência Artificial
aplicados à engenharia de software. O objetivo é fornecer uma base teórica
sólida que permita ao leitor tomar decisões informadas sobre quando e como
empregar essas tecnologias.

## Objetivos de Aprendizagem

Ao final desta seção, você será capaz de:

- Explicar o funcionamento básico de Large Language Models (LLMs), incluindo
  arquitetura Transformer e mecanismos de atenção
- Aplicar técnicas de engenharia de prompt para obter outputs mais precisos e
  controlados
- Compreender o conceito de RAG (Retrieval-Augmented Generation) e seus
  benefícios para grounding
- Distinguir diferentes níveis de autonomia em agentes de IA e suas implicações
  arquiteturais
- Avaliar trade-offs entre criatividade e determinismo em gerações
  probabilísticas

## 1. Large Language Models (LLMs)

### 1.1 Definição e Escala

Large Language Models são redes neurais profundas treinadas em corpora massivos
de texto para prever a próxima palavra (token) em uma sequência. A escala desses
modelos é medida principalmente pelo número de parâmetros, que representam as
conexões ajustáveis durante o treinamento.

| Modelo   | Parâmetros    | Ano  | Características                                         |
| -------- | ------------- | ---- | ------------------------------------------------------- |
| GPT-1    | 117 milhões   | 2018 | Prova de conceito do pré-treinamento não-supervisionado |
| GPT-2    | 1,5 bilhões   | 2019 | Capacidades zero-shot e few-shot emergentes             |
| GPT-3    | 175 bilhões   | 2020 | Few-shot learning sofisticado                           |
| GPT-4    | Não divulgado | 2023 | Raciocínio avançado, inputs multimodais                 |
| Claude 4 | Não divulgado | 2025 | Foco em segurança e reasoning                           |

A relação entre escala e capacidade não é linear, mas existe um ponto de
inflexão onde modelos maiores demonstram habilidades emergentes (emergent
capabilities) não presentes em versões menores, como raciocínio de cadeia
(chain-of-thought) e compreensão de instruções complexas.

### 1.2 Tokens e Tokenização

Tokens são as unidades básicas de processamento em LLMs. Diferente da percepção
humana de palavras, os modelos operam em subpalavras (subwords) determinadas por
algoritmos de tokenização.

**Como funciona:**

- Texto bruto → Algoritmo de tokenização → Sequência de tokens
- Tokens são convertidos em embeddings (vetores numéricos de alta
  dimensionalidade)
- O modelo processa esses embeddings para prever o próximo token

**Exemplo prático:**

```
Input: "Engenharia de software"
Tokens (GPT-4): ["Engenh", "aria", " de", " software"]
Número de tokens: 4
```

A tokenização é relevante por dois motivos práticos:

1. **Custo:** APIs cobram por token processado (input + output)
2. **Janela de contexto:** Limites são definidos em tokens, não caracteres

Regra prática: aproximadamente 100 tokens ~ 75 palavras em inglês; em português,
a razão é menor (~60-70 palavras) devido à tokenização menos eficiente de
idiomas com menor representação nos dados de treinamento.

### 1.3 Janela de Contexto

A janela de contexto (context window) define a quantidade máxima de tokens que o
modelo pode processar em uma única inferência. Este parâmetro determina o quanto
de informação prévia o modelo pode considerar ao gerar respostas.

| Modelo          | Janela de Contexto (tokens)     |
| --------------- | ------------------------------- |
| GPT-3 (2020)    | 2.048                           |
| GPT-4 (2023)    | 8.192 - 128.000                 |
| Claude 3 (2024) | 200.000                         |
| Claude 4 (2025) | 200.000                         |
| GPT-5 (2025)    | 272.000 (input) / 400.000 total |

**Implicações práticas:**

- Janelas maiores permitem análise de arquivos completos, não apenas snippets
- Tarefas de refactoring em código legado beneficiam-se de contexto estendido
- Custo aumenta linearmente com o tamanho do contexto

### 1.4 Temperatura e Parâmetros de Geração

LLMs são probabilísticos por natureza. Parâmetros de geração controlam o
comportamento estocástico:

**Temperatura (temperature):**

- Intervalo: 0 a 2 (tipicamente 0,0 a 1,0)
- Valores baixos (< 0,3): saídas mais determinísticas, previsíveis
- Valores altos (> 0,7): saídas mais criativas, variáveis
- Para código: recomenda-se 0,0 a 0,2 para consistência

**Top-p (nucleus sampling):**

- Define probabilidade acumulativa para amostragem
- Top-p = 0,9: considera tokens até atingir 90% de probabilidade cumulativa
- Alternativa à temperatura para controle de diversidade

**Top-k:**

- Limita consideração aos k tokens mais prováveis
- Valores menores = mais determinístico

**Max tokens:**

- Limite de tokens na resposta
- Evita gerações excessivamente longas e custosas

## 2. Arquitetura Transformer

A arquitetura Transformer, introduzida por Vaswani et al. em 2017 no paper
"Attention Is All You Need", é o fundamento de praticamente todos os LLMs
modernos. Sua inovação central foi substituir recorrências e convoluções por
mecanismos de atenção.

### 2.1 Autoatenção Explicada

Self-attention (autoatenção) é o mecanismo pelo qual o modelo determina a
importância relativa entre diferentes posições na sequência de entrada ao
processar cada token.

**Analogia do holofote:** Imagine um holofote que ilumina palavras relevantes
quando você lê uma frase. Ao processar "ele", o holofote acende mais forte em
"João" (referente) do que em "maçã" (objeto). O mecanismo de atenção calcula
esses "pesos de atenção" matematicamente.

**Mecanismo:**

1. Cada token é transformado em três vetores: Query (Q), Key (K) e Value (V)
2. Score de atenção = Q × K^T (produto escalar)
3. Aplicação de softmax para normalizar scores
4. Output = scores ponderados × V

**Fórmula da atenção escalada:**

```
Attention(Q, K, V) = softmax(QK^T / √d_k) V
```

Onde d_k é a dimensão dos vetores Key, e a raiz quadrada estabiliza gradientes.

### 2.2 Multi-Head Attention

Multi-head attention executa múltiplas camadas de atenção em paralelo,
permitindo que o modelo capture diferentes tipos de relacionamentos:

- **Head 1:** Relações sintáticas (sujeito-verbo)
- **Head 2:** Relações semânticas (sinônimos)
- **Head 3:** Relações de longo alcance (referentes distantes)
- **Head N:** Padrões específicos do domínio

Cada head aprende especializações diferentes, e seus outputs são concatenados e
projetados linearmente.

### 2.3 Positional Encodings

Diferente de RNNs (Redes Neurais Recorrentes), Transformers processam tokens em
paralelo, perdendo a noção de ordem sequencial. Positional encodings injetam
informação posicional nos embeddings.

**Encoding senoidal (original):**

```
PE(pos, 2i) = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

**Encoding aprendido (RoPE, ALiBi):**

- Modelos modernos (GPT-4, Llama) usam encodings relativos
- RoPE (Rotary Position Embedding): incorpora posição via rotação vetorial
- ALiBi (Attention with Linear Biases): adiciona penalidade linear baseada na
  distância

### 2.4 Feed-Forward Networks e Empilhamento

Cada camada Transformer contém:

1. **Multi-head attention:** Captura relacionamentos
2. **Add & Norm:** Residual connection + Layer normalization
3. **Feed-forward network:** Processamento não-linear por posição
4. **Add & Norm:** Segunda residual connection

As FFNs são redes de duas camadas (projeção para dimensão maior, ativação
não-linear, projeção de volta) aplicadas independentemente a cada posição.

**Empilhamento:**

- GPT-3: 96 camadas
- GPT-4: número não divulgado (estima-se 120+)
- Camadas mais profundas capturam abstrações de nível superior

## 3. Engenharia de Prompt

### 3.1 Definição e Importância

Prompt engineering é a disciplina de projetar entradas (prompts) que guiem LLMs
a produzir outputs desejados. Diferente de programação tradicional, onde sintaxe
é rigorosa, prompts operam em linguagem natural, exigindo clareza semântica.

**Princípio fundamental:** O modelo prevê o token mais provável dado o contexto.
O prompt é o contexto que condiciona essa previsão.

### 3.2 Técnicas Principais

**Zero-shot Prompting:** O modelo executa tarefa sem exemplos prévios,
baseando-se apenas na instrução.

```
Prompt: "Traduza o seguinte texto do português para inglês:
Texto: O sistema apresentou erro de conexão."
```

**Few-shot Prompting:** Inclusão de exemplos demonstrando o padrão desejado
antes da tarefa real.

```
Prompt: "Traduza textos técnicos:
Português: O servidor está offline.
Inglês: The server is offline.

Português: Falha na autenticação.
Inglês: Authentication failed.

Português: O sistema apresentou erro de conexão.
Inglês:"
```

**Chain-of-Thought (CoT):** Incentiva o modelo a "pensar em voz alta",
decompondo problemas complexos em passos.

```
Prompt: "Um sistema processa 120 requisições por minuto.
Quantas requisições processa em 2,5 horas?

Pense passo a passo:"

Resposta esperada:
1. Primeiro, converter horas para minutos: 2,5 horas = 150 minutos
2. Multiplicar taxa pelo tempo: 120 × 150 = 18.000
3. Resposta: 18.000 requisições
```

**ReAct (Reasoning + Acting):** Combina raciocínio com ações em ambiente
externo, alternando entre pensamento e execução.

```
Padrão:
Pensamento: Preciso buscar informações sobre X
Ação: [chamar ferramenta de busca]
Observação: [resultado da ferramenta]
Pensamento: Baseado nos resultados...
```

**Self-Consistency:** Gera múltiplas respostas para o mesmo prompt e seleciona a
mais frequente, reduzindo variância de amostragem.

### 3.3 Gerenciamento de Janela de Contexto

Técnicas para maximizar uso eficiente do contexto limitado:

**Chunking:** Dividir documentos grandes em blocos menores que caibam na janela

**Summarization progressiva:** Resumir partes do contexto para liberar espaço

**Hierarchical attention:** Estruturar prompts com hierarquia clara (contexto
global → detalhes locais)

**Template engineering:**

```
Contexto: {contexto_resumido}

Código relevante:
```

{codigo}

```

Tarefa: {instrucao_especifica}

Restrições:
- {resticao_1}
- {resticao_2}
```

## 4. RAG (Retrieval-Augmented Generation)

### 4.1 Conceito e Funcionamento

RAG combina recuperação de informação com geração de linguagem. Em vez de
depender apenas do conhecimento parametrizado durante o treinamento, o modelo
acessa documentos externos relevantes em tempo real.

**Pipeline básico:**

1. **Query encoding:** Embedding da pergunta do usuário
2. **Retrieval:** Busca por similaridade em base vetorial
3. **Augmentation:** Concatenação de documentos recuperados ao prompt
4. **Generation:** LLM gera resposta baseada em contexto enriquecido

### 4.2 Vector Stores e Embeddings

Embeddings são representações vetoriais densas que capturam semântica.
Documentos e queries são mapeados para o mesmo espaço vetorial, permitindo busca
por similaridade de cosseno.

**Processo de indexação:**

```
Documento → Chunking → Embedding Model → Vetor de alta dimensão (tipicamente 768-1536 dimensões) → Vector Store
```

**Bancos de dados vetoriais populares:**

- Pinecone: Serviço gerenciado, escala automática
- Weaviate: Open-source, GraphQL-native
- Chroma: Leve, ideal para prototipagem
- pgvector: Extensão PostgreSQL para produção

### 4.3 Benefícios de Grounding

Grounding refere-se à âncora da resposta em fontes verificáveis:

1. **Redução de hallucinations:** Informações factuais vêm de documentos, não de
   memória parametrizada
2. **Atualidade:** Acesso a informações posteriores ao corte de treinamento
3. **Citações:** Possibilidade de referenciar fontes específicas
4. **Domínio específico:** Conhecimento de bases internas da organização

### 4.4 Limitações

**Trade-offs:**

- Latência adicional da camada de retrieval
- Qualidade depende da relevância dos documentos recuperados
- Custo de armazenamento e computação de embeddings
- Complexidade operacional da infraestrutura

**Problemas conhecidos:**

- **Lost in the middle:** LLMs tendem a ignorar informações no meio do contexto
- **Repetition:** Tendência a repetir trechos dos documentos em vez de
  sintetizar
- **Retrieval failures:** Queries ambíguas podem retornar documentos
  irrelevantes

## 5. Agentes e Autonomia

### 5.1 Definição de Agente de IA

Um agente de IA é um sistema que percebe seu ambiente, toma decisões autônomas e
executa ações para atingir objetivos. Diferente de assistentes passivos, agentes
são proativos e podem iterar sem intervenção humana constante.

**Características fundamentais:**

- **Percepção:** Capacidade de observar estado do ambiente
- **Raciocínio:** Processamento para decidir próximas ações
- **Ação:** Execução em ambiente externo (código, APIs, ferramentas)
- **Memória:** Persistência de estado entre interações

### 5.2 Níveis de Autonomia

| Nível                        | Descrição                                             | Exemplo                                 |
| ---------------------------- | ----------------------------------------------------- | --------------------------------------- |
| 0 - Assistência              | Sugestões, aprovação humana obrigatória               | Copilot sugerindo completions           |
| 1 - Automação                | Executa tarefas predefinidas com supervisão           | CI/CD pipelines                         |
| 2 - Autonomia supervisionada | Planeja e executa, checkpoints humanos                | Agentic coding com TDD                  |
| 3 - Autonomia delegada       | Executa com mínima intervenção, relatórios periódicos | SWE-agent em benchmarks                 |
| 4 - Autonomia total          | Opera independentemente, decisões estratégicas        | Ainda teórico para software engineering |

### 5.3 Arquiteturas Multi-Agente

Sistemas complexos utilizam múltiplos agentes especializados:

**Padrões arquiteturais:**

- **Supervisor-worker:** Agente orquestrador delega a agentes especialistas
- **Peer-to-peer:** Agentes colaboram horizontalmente
- **Pipeline:** Saída de um agente é entrada do próximo
- **Hierarchical:** Estrutura em árvore de responsabilidades

**Exemplo prático (desenvolvimento de software):**

```
Product Agent → especifica requisitos
    ↓
Architecture Agent → projeta solução
    ↓
Implementation Agent → gera código
    ↓
Test Agent → valida comportamento
    ↓
Review Agent → verifica qualidade
```

### 5.4 Agent Contracts (Contratos Formais)

Framework formal para especificar, verificar e certificar comportamento de
agentes autônomos.

**Estrutura (7-tupla):**

```
C = (I, O, S, R, T, Φ, Ψ)

Onde:
- I: Conjunto de inputs válidos
- O: Conjunto de outputs esperados
- S: Estado interno do agente
- R: Restrições de recursos (tempo, memória, tokens)
- T: Limites temporais
- Φ: Critérios de sucesso
- Ψ: Condições de falha
```

**Componentes de verificação:**

- **Preconditions:** O que deve ser verdade antes da execução
- **Pathconditions:** Invariantes durante a execução
- **Postconditions:** Garantias após a execução

### 5.5 Ferramentas e Function Calling

Function calling (também chamado de tool use) é a capacidade de LLMs invocarem
funções externas estruturadas.

**Mecanismo:**

1. LLM recebe schema das funções disponíveis
2. Dada uma query, LLM decide se deve chamar função
3. LLM gera JSON com parâmetros estruturados
4. Sistema executa função e retorna resultado
5. LLM processa resultado para resposta final

**Exemplo de schema:**

```json
{
  "name": "buscar_documentacao",
  "description": "Busca documentação técnica relevante",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Termos de busca"
      },
      "limite": {
        "type": "integer",
        "default": 5
      }
    },
    "required": ["query"]
  }
}
```

## 6. Conceitos Estatísticos Fundamentais

### 6.1 Tokens: Unidades de Processamento

Como estabelecido na Seção 1, tokens são a unidade fundamental. É essencial
compreender:

- **Tokenização é determinística:** Mesmo texto sempre gera mesma sequência de
  tokens para um dado tokenizer
- **Diferentes modelos, diferentes tokenizers:** GPT-4 e Claude usam tokenizers
  distintos
- **Impacto em custo:** APIs cobram por token, não por caractere ou palavra

**Ferramenta de estimativa:** Tokenizadores abertos (tiktoken para OpenAI,
tokenizer do Hugging Face) permitem calcular custo antes de chamar APIs.

### 6.2 Temperatura: Criatividade versus Determinismo

A temperatura controla a entropia da distribuição de probabilidade sobre o
vocabulário:

- **T = 0:** Aproximação de distribuição one-hot (sempre escolhe token mais
  provável)
- **0 < T < 1:** Distribuição mais concentrada em torno do máximo
- **T = 1:** Distribuição original do modelo
- **T > 1:** Distribuição mais uniforme, mais "criativa"

**Recomendações por tarefa:**

| Tarefa               | Temperatura | Justificativa                         |
| -------------------- | ----------- | ------------------------------------- |
| Geração de código    | 0,0 - 0,2   | Consistência e corretude sintática    |
| Explicação de código | 0,3 - 0,5   | Equilíbrio entre clareza e variedade  |
| Brainstorming        | 0,7 - 1,0   | Diversidade de ideias                 |
| Geração de testes    | 0,2 - 0,4   | Cobertura sem aleatoriedade excessiva |

### 6.3 Top-p e Top-k Sampling

Alternativas à temperatura para controle de aleatoriedade:

**Top-k:**

- Considera apenas os k tokens mais prováveis
- k=1 equivale a greedy decoding (sem aleatoriedade)
- k=50 é comum para equilíbrio

**Top-p (nucleus sampling):**

- Considera tokens até probabilidade acumulada atingir p
- Mais adaptativo que top-k (número de tokens varia)
- p=0,9 é prática comum

**Combinação:** Tipicamente usa-se temperature + top_p, onde temperatura afeta a
forma da distribuição e top_p limita o espaço de amostragem.

### 6.4 Probabilidade versus Determinismo

Tensão fundamental em software engineering: código deve ser determinístico, mas
LLMs são probabilísticos.

**Estratégias de mitigação:**

1. **Temperature = 0:** Ainda não é perfeitamente determinístico devido a
   operações paralelas em GPUs, mas próximo o suficiente para maioria dos casos

2. **Caching:** Armazenar respostas validadas para prompts recorrentes

3. **Voting/Ensemble:** Múltiplas chamadas, seleção por maioria ou consistência

4. **Fallbacks determinísticos:** Quando confiança é baixa, recorrer a regras
   codificadas

5. **Seeding:** Algumas APIs permitem seed para reprodutibilidade (limitada)

### 6.5 Hallucinations: Causas e Mitigação

Hallucinations são gerações plausíveis mas factualmente incorretas ou
inconsistentes.

**Taxonomia:**

- **Factual:** Afirmações contraditórias aos fatos
- **Faithfulness:** Inconsistência com o contexto fornecido
- **Code-specific:** APIs, funções ou pacotes inexistentes

**Causas:**

1. **Knowledge gaps:** Informação ausente nos dados de treinamento
2. **Optimization mismatch:** Modelo otimizado para plausibilidade, não
   factualidade
3. **Context confusion:** Dificuldade em distinguir contexto de conhecimento
   interno

**Mitigação:**

- RAG para grounding em fontes verificáveis
- Self-consistency (múltiplas amostras)
- Chain-of-verification (verificar fatos gerados)
- Retrieval de múltiplas fontes
- Human-in-the-loop para validação crítica

## 7. Recursos para Aprofundamento

### 7.1 Cursos Recomendados

**Fundamentos:**

- "Deep Learning Specialization" (Andrew Ng, DeepLearning.AI): Fundamentos de
  redes neurais
- "Natural Language Processing Specialization" (DeepLearning.AI): Processamento
  de linguagem
- "CS224N" (Stanford): Natural Language Processing with Deep Learning (aberto no
  YouTube)

**Aplicações:**

- "LangChain for LLM Application Development" (DeepLearning.AI): Desenvolvimento
  com LLMs
- "Building Systems with the ChatGPT API": Integração prática

### 7.2 Papers Fundamentais

**Arquitetura:**

1. Vaswani, A., et al. (2017). "Attention Is All You Need." *Advances in Neural
   Information Processing Systems*. <https://arxiv.org/abs/1706.03762>
2. Devlin, J., et al. (2018). "BERT: Pre-training of Deep Bidirectional
   Transformers." <https://arxiv.org/abs/1810.04805>
3. Brown, T., et al. (2020). "Language Models are Few-Shot Learners." (GPT-3)
   <https://arxiv.org/abs/2005.14165>

**Técnicas:** 4. Wei, J., et al. (2022). "Chain-of-Thought Prompting Elicits
Reasoning in Large Language Models." <https://arxiv.org/abs/2201.11903> 5.
Lewis, P., et al. (2020). "Retrieval-Augmented Generation for
Knowledge-Intensive NLP Tasks." <https://arxiv.org/abs/2005.11401> 6. Yao, S.,
et al. (2023). "ReAct: Synergizing Reasoning and Acting in Language Models."
<https://arxiv.org/abs/2210.03629>

**Engenharia de Software com IA:** 7. "Agent Contracts: A Formal Framework for
Resource-Bounded Autonomous AI Systems." (2026)
<https://arxiv.org/html/2601.08815v1> 8. "HALoGEN: Fantastic LLM Hallucinations
and Where to Find Them." (2025) <https://aclanthology.org/2025.acl-long.71/>

### 7.3 Ferramentas e Plataformas

**Frameworks de Desenvolvimento:**

- LangChain: Orquestração de chains e agents
- LlamaIndex: Framework especializado em RAG
- Haystack: Pipeline de NLP para busca e QA

**Observabilidade e Monitoramento:**

- Weights & Biases: Tracking de experimentos
- MLflow: Gerenciamento de ciclo de vida
- LangSmith: Observabilidade específica para LangChain

**Bancos de Dados Vetoriais:**

- Pinecone, Weaviate, Chroma, pgvector

### 7.4 Comunidades

- Papers with Code: Acompanhamento de SOTA em ML
- Hugging Face: Modelos, datasets e comunidade
- r/MachineLearning: Discussões técnicas no Reddit
- AI Engineering (LinkedIn): Foco em aplicações práticas

## Resumo

Esta seção estabeleceu os fundamentos técnicos necessários para engenharia de
software na era dos LLMs:

1. **LLMs operam em tokens**, não palavras, e sua escala (bilhões de parâmetros)
   habilita capacidades emergentes como raciocínio de cadeia

2. **A arquitetura Transformer** substituiu recorrências por mecanismos de
   atenção, permitindo paralelização e captura de dependências de longo alcance

3. **Engenharia de prompt** é uma disciplina crítica: técnicas como few-shot,
   chain-of-thought e ReAct melhoram significativamente a qualidade dos outputs

4. **RAG combina recuperação com geração**, reduzindo hallucinations através de
   grounding em fontes verificáveis

5. **Agentes de IA** variam em autonomia, desde assistentes passivos até
   sistemas que planejam e executam iterativamente; Agent Contracts fornecem
   framework formal para especificar comportamento

6. **Parâmetros como temperatura** controlam o trade-off entre criatividade e
   determinismo; para código, valores baixos são recomendados

7. **Hallucinations são inevitáveis** em sistemas probabilísticos, exigindo
   estratégias de mitigação como RAG, self-consistency e validação humana

Compreender estes fundamentos permite ao engenheiro fazer escolhas informadas
sobre arquitetura, tooling e processos, fundamentando as práticas avançadas
apresentadas nos demais capítulos do SWEBOK-AI.

## Referências

01. Vaswani, A., et al. (2017). "Attention Is All You Need." *Advances in Neural
    Information Processing Systems*. <https://arxiv.org/abs/1706.03762>

02. Brown, T., et al. (2020). "Language Models are Few-Shot Learners." *Advances
    in Neural Information Processing Systems*.
    <https://arxiv.org/abs/2005.14165>

03. Wei, J., et al. (2022). "Chain-of-Thought Prompting Elicits Reasoning in
    Large Language Models." *Advances in Neural Information Processing Systems*.
    <https://arxiv.org/abs/2201.11903>

04. Lewis, P., et al. (2020). "Retrieval-Augmented Generation for
    Knowledge-Intensive NLP Tasks." *Advances in Neural Information Processing
    Systems*. <https://arxiv.org/abs/2005.11401>

05. Yao, S., et al. (2023). "ReAct: Synergizing Reasoning and Acting in Language
    Models." *International Conference on Learning Representations*.
    <https://arxiv.org/abs/2210.03629>

06. "Agent Contracts: A Formal Framework for Resource-Bounded Autonomous AI
    Systems." (2026). *arXiv preprint*. <https://arxiv.org/html/2601.08815v1>

07. "HALoGEN: Fantastic LLM Hallucinations and Where to Find Them." (2025).
    *Proceedings of ACL*. <https://aclanthology.org/2025.acl-long.71/>

08. "LLM Hallucinations in Practical Code Generation: Phenomena, Mechanism, and
    Mitigation." (2025). *ACM Digital Library*.
    <https://dl.acm.org/doi/10.1145/3728894>

09. OpenAI API Documentation. <https://platform.openai.com/docs>

10. Anthropic Claude Documentation. <https://www.anthropic.com/>

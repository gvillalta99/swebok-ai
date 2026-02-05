# Fundamentos Essenciais de IA para Engenheiros de Software

## O que você precisa saber (e o que pode ignorar)

Este guia assume que você é um **engenheiro de software**, não um pesquisador de
IA. Os conceitos abaixo são suficientes para compreender o restante do material.
Não é necessário dominar matemática avançada, estatística ou teoria dos modelos.

______________________________________________________________________

## 1. Large Language Models (LLMs)

### O que são

Large Language Models são sistemas de IA treinados em vastas quantidades de
texto para prever a próxima palavra (ou token) em uma sequência. Apesar da
simplicidade desta definição, emergem capacidades surpreendentes:

- **Compreensão contextual**: Entendem nuances de linguagem natural
- **Geração de código**: Produzem código em múltiplas linguagens
- **Raciocínio**: Resolvem problemas através de cadeias de pensamento
- **Tradução**: Convertem entre linguagens de programação

### Limitações fundamentais

> **Importante**: LLMs não "entendem" no sentido humano. Eles são motores de
> previsão estatística.

| Limitação                      | Implicação para Engenharia                             |
| ------------------------------ | ------------------------------------------------------ |
| **Alucinações**                | Podem gerar código plausível mas incorreto             |
| **Contexto finito**            | Não processam bases de código muito grandes de uma vez |
| **Conhecimento desatualizado** | Modelos têm data de corte no treinamento               |
| **Não-determinismo**           | Mesmo prompt pode gerar respostas diferentes           |
| **Viés de treinamento**        | Reproduzem padrões problemáticos dos dados             |

### Analogia útil

Pense em um LLM como um **estagiário extremamente rápido e versátil, mas que
ocasionalmente inventa fatos**:

- Excelente para tarefas rotineiras e boilerplate
- Requer supervisão para código crítico
- Precisa de contexto claro para produzir resultados úteis

______________________________________________________________________

## 2. Arquitetura Transformer

### O que é "Atenção"

A inovação central dos Transformers é o mecanismo de **atenção**, que permite ao
modelo focar em partes relevantes do input quando gera cada parte do output.

```
Input: "Implemente uma função que ordena uma lista"
       ↓
Atenção: O modelo identifica que "ordena" e "lista" são palavras-chave
       ↓
Output: Código de ordenação
```

### Por que importa para engenharia

1. **Janela de contexto**: O tamanho da "atenção" determina quanto código o
   modelo pode processar de uma vez

   - GPT-4: ~128k tokens (~100k palavras)
   - Claude 3: ~200k tokens
   - Modelos locais: variam (4k-32k)

2. **Custo computacional**: Atenção tem complexidade quadrática

   - Dobrar o contexto = quadruplicar o custo
   - Importante para orçamento de inferência

3. **Positional bias**: Tokens no início e fim do contexto recebem mais atenção

   - **Implicação**: Coloque instruções importantes no início e fim dos prompts

______________________________________________________________________

## 3. RAG (Retrieval-Augmented Generation)

### Conceito

RAG combina:

1. **Retrieval**: Busca informações relevantes de uma base de conhecimento
2. **Generation**: Usa essas informações para gerar respostas contextualizadas

```
Pergunta do usuário
       ↓
Busca em base vetorial → Documentos relevantes
       ↓
Prompt enriquecido com contexto
       ↓
LLM gera resposta fundamentada
```

### Bancos de dados vetoriais

Documentos são convertidos em **embeddings** (vetores numéricos) que capturam
significado semântico:

- "cachorro" e "cão" têm embeddings similares
- "cachorro" e "gato" têm embeddings mais distantes que "cachorro" e "cão"
- Distância no espaço vetorial = diferença semântica

### Engenharia de Contexto

**Princípio fundamental**: A qualidade do output de um LLM depende da qualidade
do contexto fornecido.

```markdown
# Prompt Ruim
"Escreva código para autenticação"

# Prompt Bom
"Contexto: Estamos usando Python 3.11, FastAPI, JWT tokens.
Requisitos: Login com email/senha, refresh tokens, rate limiting.
Restrições: Não use bibliotecas externas além de PyJWT."
```

______________________________________________________________________

## 4. Agentes e Autonomia

### Definição

Um **agente de IA** é um sistema que:

1. Recebe um objetivo de alto nível
2. Planeja etapas para alcançá-lo
3. Executa ações (possivelmente usando ferramentas)
4. Observa resultados e itera

### Arquitetura básica

```
┌─────────────────┐
│   Objetivo      │
│  (prompt)       │
└────────┬────────┘
         ↓
┌─────────────────┐
│   Planejador    │ ← LLM decide próxima ação
└────────┬────────┘
         ↓
┌─────────────────┐
│   Execução      │ ← Chama ferramentas/APIs
└────────┬────────┘
         ↓
┌─────────────────┐
│   Observação    │ ← Resultado da ação
└────────┬────────┘
         ↓
    (loop ou fim)
```

### Limites de autonomia

| Nível                 | Descrição                                         | Exemplo                         |
| --------------------- | ------------------------------------------------- | ------------------------------- |
| **Assistido**         | Sugestões, humano decide                          | GitHub Copilot                  |
| **Semi-autônomo**     | Executa tarefas definidas, humano supervisiona    | Agentes de CI/CD                |
| **Autônomo restrito** | Opera em domínio limitado, humano aprova mudanças | Refatoração automatizada com PR |
| **Autônomo**          | Opera sem intervenção (raro em produção)          | Sistemas de monitoramento       |

### Workflows agenticos

**Pattern comum em engenharia**:

1. Agente recebe: "Adicione logging a todas as funções de API"
2. Analisa codebase (RAG)
3. Identifica funções candidatas
4. Gera código de logging
5. Cria PR para revisão humana
6. Human merge ou solicita ajustes

______________________________________________________________________

## 5. Conceitos Estatísticos Básicos

### Não-determinismo

Diferente de sistemas tradicionais, LLMs produzem **distribuições de
probabilidade** sobre possíveis outputs:

```python
# Sistema determinístico
f(2, 3)  # Sempre retorna 5

# LLM
llm("2 + 3 = ")  # Geralmente retorna "5", mas pode variar
```

### Temperatura e aleatoriedade

- **Temperatura = 0**: Determinístico (sempre escolhe token mais provável)
- **Temperatura = 0.7**: Balanceado (padrão para criatividade)
- **Temperatura = 1.0+**: Mais aleatório (para brainstorming)

**Para engenharia**: Use temperatura baixa (0-0.3) para código, alta para
exploração.

### Por que testes tradicionais falham

Testes unitários tradicionais assumem:

- Determinismo: Mesmo input → mesmo output
- Isolamento: Componentes independentes
- Cobertura: Linhas de código = comportamento

Com LLMs:

- **Não-determinismo**: Mesmo input pode gerar outputs diferentes
- **Contexto**: Comportamento depende de todo o contexto, não só do input
- **Comportamento emergente**: Propriedades aparecem em escala

**Implicação**: Precisamos de novas abordagens de teste (cobertos no KA 05 -
Testing).

______________________________________________________________________

## 6. O que você NÃO precisa saber

Para usar este guia efetivamente, **não é necessário**:

- ❌ Álgebra linear ou cálculo
- ❌ Arquiteturas de redes neurais profundas
- ❌ Treinamento de modelos (fine-tuning)
- ❌ Teoria da informação
- ❌ Otimização matemática
- ❌ Hardware de IA (GPUs, TPUs)

Esses tópicos são importantes para **pesquisadores de IA**, mas não para
**engenheiros de software** aplicando IA em projetos.

______________________________________________________________________

## 7. Recursos para Aprofundamento

Se desejar ir além dos fundamentos:

**Para engenheiros**:

- [Building LLM Applications](https://www.oreilly.com/library/view/building-llm-applications/9781098158859/)
  \- O'Reilly
- [Prompt Engineering Guide](https://www.promptingguide.ai/) - Open source

**Para arquitetos**:

- [Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/)
  \- Chip Huyen
- [LLM Systems Design](https://github.com/stanford-cs329t/stanford-cs329t.github.io)
  \- Stanford CS 329T

**Para curiosos**:

- [The Illustrated Transformer](http://jalammar.github.io/illustrated-transformer/)
  \- Jay Alammar
- [What Is ChatGPT Doing?](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/)
  \- Stephen Wolfram

______________________________________________________________________

## Sumário

| Conceito         | O que você precisa saber                                                                |
| ---------------- | --------------------------------------------------------------------------------------- |
| **LLMs**         | Motores de previsão estatística com capacidades emergentes; têm limitações importantes  |
| **Transformers** | Usam "atenção" para focar em partes relevantes; têm limites de contexto                 |
| **RAG**          | Combina busca com geração; usa embeddings e bancos vetoriais                            |
| **Agentes**      | Sistemas que planejam e executam; variam de assistidos a autônomos                      |
| **Estatística**  | Saídas são probabilísticas, não determinísticas; testes tradicionais precisam adaptação |

Com estes fundamentos, você está pronto para explorar o restante do SWEBOK-AI
v5.0.

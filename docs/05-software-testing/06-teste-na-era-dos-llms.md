---
title: Teste na Era dos LLMs
created_at: 2025-02-07
tags: [software-testing, llm, ia, self-healing, agentic-ai, rag-testing]
status: in-progress
updated_at: 2026-02-07
ai_model: book-writer
---

# 6. Teste na Era dos LLMs

## 6.1 A Terceira Onda da Automação de Testes

A indústria de teste de software está vivenciando sua terceira grande
transformação:

### As Três Ondas

**Primeira Onda: Testes Manuais (2000s)**

- Execução manual de scripts de teste
- Alta dependência de recursos humanos
- Documentação extensiva em planilhas
- Feedback lento e inconsistente

**Segunda Onda: Automação Baseada em Scripts (2010s)**

- Frameworks como Selenium, JUnit, TestNG
- Repetibilidade e consistência
- Automação de regressão
- **Desafio:** Manutenção onerosa (60-70% do tempo)

**Terceira Onda: Automação Inteligente com IA/LLMs (2020s+)**

- Self-healing tests
- Geração autônoma de testes
- Análise preditiva de defeitos
- Testes baseados em intenção (intent-based)

### Características da Terceira Onda

| Aspecto    | Segunda Onda            | Terceira Onda                    |
| ---------- | ----------------------- | -------------------------------- |
| Criação    | Manual                  | Geração automática por IA        |
| Manutenção | Reativa, consome 60-70% | Proativa, \<10% com self-healing |
| Execução   | Scripts rígidos         | Adaptação inteligente            |
| Cobertura  | Limitada por tempo      | Expansiva e contínua             |
| Oráculo    | Asserts estáticos       | Validação semântica              |
| Seletores  | XPaths/CSS frágeis      | Embeddings vetoriais             |

## 6.2 Self-Healing Tests

### Definição

Self-healing tests são testes automatizados que detectam automaticamente
mudanças na aplicação e se adaptam sem intervenção humana, eliminando o gargalo
de manutenção de testes.

### Como Funciona

**1. Análise Semântica de Elementos:**

- Usa embeddings vetoriais para entender semanticamente elementos da UI
- Não depende apenas de localizadores rígidos (XPath, CSS)
- Compreende contexto e relações entre elementos

**2. Detecção de Mudanças:**

- Identifica quando localizadores mudam
- Analisa hierarquia DOM atualizada
- Mapeia elementos por similaridade semântica

**3. Adaptação Automática:**

- Atualiza seletores automaticamente
- Ajusta asserts quando apropriado
- Mantém lógica de teste intacta

```python
# Exemplo conceitual de self-healing
def test_login_self_healing():
    # Localizador original (quebrou após mudança na UI)
    # Original: driver.find_element(By.ID, "login-btn")

    # Sistema de self-healing identifica:
    # - Elemento com texto "Entrar"
    # - Botão dentro do formulário de login
    # - Atributos de acessibilidade

    # Adaptação automática para novo seletor:
    # driver.find_element(By.CSS_SELECTOR, "button[type='submit']")

    login_button = self.healing.find_element(
        original_selector="#login-btn",
        context={"text": "Entrar", "type": "button"}
    )
    login_button.click()
```

### Benefícios Quantificados

- **70% de redução** no tempo de manutenção de testes
- **Eliminação de flaky tests** causados por mudanças cosméticas
- **Feedback mais rápido** em pipelines CI/CD
- **Menor dependência** de seletores rígidos

### Ferramentas de Self-Healing

| Ferramenta  | Tecnologia           | Destaque                       |
| ----------- | -------------------- | ------------------------------ |
| Testim      | ML-based             | Alta precisão em identificação |
| Mabl        | ML + Computer Vision | Integração nativa CI/CD        |
| Functionize | Enterprise ML        | Self-healing avançado          |
| Virtuoso    | AI-first             | Autonomous testing             |
| Applitools  | Visual AI            | Comparação inteligente         |
| ACCELQ      | ML-based             | Codeless com self-healing      |

## 6.3 Geração Automática de Casos de Teste

### Abordagens com LLMs

**1. Geração a partir de Requisitos:**

```
Input: User Story em linguagem natural
↓
Processamento: LLM analisa e identifica cenários
↓
Output: Casos de teste estruturados (BDD/Gherkin)
```

**Exemplo:**

````markdown
# User Story
Como cliente, quero aplicar um cupom de desconto
Para obter redução no valor da compra

# Critérios de Aceitação (gerados por IA)
- Cupom válido reduz valor corretamente
- Cupom inválido exibe erro apropriado
- Cupom expirado é rejeitado
- Cupom já usado é rejeitado
- Múltiplos cupons não podem ser combinados

# Cenários BDD gerados:
```gherkin
Feature: Aplicação de Cupom de Desconto

  Scenario: Cupom válido aplicado com sucesso
    Given carrinho com valor total de R$ 100,00
    And cupom "DESCONTO10" com 10% de desconto válido
    When aplico o cupom no checkout
    Then valor final é R$ 90,00
    And mensagem de sucesso é exibida

  Scenario: Tentativa de cupom expirado
    Given cupom "EXPIRADO" com data de validade no passado
    When tento aplicar o cupom
    Then erro "Cupom expirado" é exibido
    And valor original é mantido
````

````

**2. Geração a partir de Código:**

- Análise de caminhos de execução
- Identificação de condições de borda
- Geração de mocks e stubs

```python
# Código analisado
def processar_pagamento(valor, metodo, parcelas=1):
    if valor <= 0:
        raise ValueError("Valor deve ser positivo")

    if metodo not in ['cartao', 'boleto', 'pix']:
        raise ValueError("Método inválido")

    if metodo == 'cartao' and parcelas > 12:
        raise ValueError("Máximo 12 parcelas")

    # Processamento...
    return {"status": "sucesso", "valor": valor}

# Testes gerados automaticamente
def test_valor_positivo():
    result = processar_pagamento(100, 'pix')
    assert result["status"] == "sucesso"

def test_valor_zero():
    with pytest.raises(ValueError, match="positivo"):
        processar_pagamento(0, 'pix')

def test_valor_negativo():
    with pytest.raises(ValueError, match="positivo"):
        processar_pagamento(-50, 'pix')

def test_metodo_invalido():
    with pytest.raises(ValueError, match="inválido"):
        processar_pagamento(100, 'dinheiro')

def test_parcelas_excedidas():
    with pytest.raises(ValueError, match="12 parcelas"):
        processar_pagamento(1000, 'cartao', parcelas=15)
````

**3. Geração a partir de Logs:**

- Análise de comportamento real em produção
- Identificação de padrões de uso
- Geração de testes baseados em dados reais

### Prompt Engineering para Testes

**Estrutura de Prompt Efetivo:**

```
Contexto: [Sistema sendo testado]
Requisitos: [Funcionalidade específica]
Restrições: [Limitações ou regras de negócio]
Formato: [BDD, Unit Test, etc.]

Gere casos de teste para:
- Caminho feliz
- Casos de erro
- Condições de borda
- Cenários de segurança
```

## 6.4 Teste de Prompts e Modelos de Linguagem

### Por Que Testar LLMs?

Com a proliferação de aplicações baseadas em LLMs, surge a necessidade de testar
os próprios modelos e seus comportamentos.

### Métricas de Avaliação de Prompts

**Métricas Tradicionais (Limitadas):**

- BLEU, ROUGE: Similaridade com referências
- Perplexidade: Qualidade do modelo

**Métricas Modernas para LLMs:**

| Métrica                  | Descrição                               | Quando Usar           |
| ------------------------ | --------------------------------------- | --------------------- |
| **Faithfulness**         | Adesão ao contexto fornecido            | RAG, QA systems       |
| **Answer Relevancy**     | Relevância da resposta à pergunta       | Chatbots, assistentes |
| **Contextual Precision** | Precisão da recuperação de contexto     | Sistemas de busca     |
| **Contextual Recall**    | Completude da recuperação               | RAG systems           |
| **Hallucination**        | Identificação de informações inventadas | Todos os LLMs         |
| **Toxicity/Bias**        | Detecção de conteúdo prejudicial        | Aplicações públicas   |
| **Coherence**            | Qualidade linguística e fluidez         | Geração de texto      |
| **Correctness**          | Precisão factual                        | Aplicações técnicas   |

### Frameworks de Avaliação

**DeepEval:**

- Framework open-source com 50+ métricas
- Integração com CI/CD
- Benchmarks contra datasets padrão

```python
from deepeval import assert_test
from deepeval.metrics import FaithfulnessMetric
from deepeval.test_case import LLMTestCase

# Teste de faithfulness para RAG
def test_rag_faithfulness():
    test_case = LLMTestCase(
        input="Quais são os benefícios do plano premium?",
        actual_output="O plano premium inclui suporte 24/7...",
        retrieval_context=["Documentação: Plano Premium..."]
    )

    metric = FaithfulnessMetric(threshold=0.7)
    assert_test(test_case, [metric])
```

**Promptfoo:**

- Testes de prompts e A/B testing
- Assertions configuráveis
- Integração com múltiplos providers

**Vellum:**

- Avaliação de prompts em escala
- Versionamento de prompts
- Análise de performance

### Detecção de Alucinações

**Técnicas:**

- Factual consistency checking
- Cross-reference com fontes confiáveis
- Self-consistency (múltiplas amostras)
- Human-in-the-loop validation

```python
def detectar_alucinacao(resposta, contexto):
    """Exemplo simplificado de detecção"""
    # Verificar se informações estão no contexto
    fatos_resposta = extrair_fatos(resposta)
    fatos_contexto = extrair_fatos(contexto)

    # Calcular overlap
    fatos_sem_base = fatos_resposta - fatos_contexto

    if len(fatos_sem_base) > LIMIAR:
        return {"alucinacao": True, "fatos_suspeitos": fatos_sem_base}

    return {"alucinacao": False}
```

## 6.5 RAG (Retrieval-Augmented Generation) Testing

### O Que é RAG?

Sistemas RAG combinam recuperação de informação com geração:

1. **Retriever:** Busca informações relevantes em base de conhecimento
2. **Generator:** Usa informações recuperadas para gerar resposta

### Componentes a Testar

**1. Retriever:**

- **Contextual Relevancy:** Documentos recuperados são relevantes?
- **Contextual Precision:** Precisão da recuperação
- **Contextual Recall:** Toda informação necessária foi recuperada?

**2. Generator:**

- **Faithfulness:** Resposta usa apenas informações recuperadas?
- **Answer Relevancy:** Responde à pergunta feita?
- **Hallucination:** Inventou informações?

### Frameworks Especializados

**RAGAS:**

- Framework específico para avaliação RAG
- Métricas: faithfulness, answer_relevancy, context_relevancy

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy

# Avaliação de dataset RAG
result = evaluate(
    dataset=rag_dataset,
    metrics=[faithfulness, answer_relevancy]
)
```

**TruLens:**

- Observabilidade e avaliação de LLM applications
- Instrumentação de chains
- Feedback loops

**Arize Phoenix:**

- Open-source ML observability
- Análise de embeddings
- Rastreamento de chains

### Desafios em RAG Testing

**1. Bases de Conhecimento Dinâmicas:**

- Conteúdo muda constantemente
- Resultados não são deterministicamente reproduzíveis

**2. Qualidade do Chunking:**

- Tamanho e overlap de chunks afetam recuperação
- Testes devem cobrir diferentes estratégias

**3. Balanceamento Recall vs Precision:**

- Mais contexto pode confundir o LLM
- Menos contexto pode omitir informações

**4. Avaliação de Respostas Abertas:**

- Não há resposta única correta
- Requer avaliação semântica

## 6.6 Agentic AI em Testes

### Definição

Agentic AI refere-se a sistemas de IA que podem agir autonomamente, tomar
decisões e executar tarefas sem supervisão constante humana.

### Arquitetura de Agentes de Teste

```
┌─────────────────────────────────────────────────────────┐
│                    Agente de Teste                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Planning   │  │   Memory     │  │  Tools Use   │  │
│  │  (Planejamento)│  │   (Memória)  │  │ (Uso de Ferramentas)│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Exploration  │  │   Reasoning  │  │  Execution   │  │
│  │(Exploração)  │  │  (Raciocínio)│  │  (Execução)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Componentes:**

1. **Planning:** Define estratégia de teste e plano de ação
2. **Memory:** Mantém contexto de sessões anteriores
3. **Tools Use:** Utiliza ferramentas (navegador, API, etc.)
4. **Exploration:** Explora aplicação como usuário humano
5. **Reasoning:** Toma decisões baseadas em observações
6. **Execution:** Executa ações de teste

### Capacidades dos Agentes de Teste

**1. Exploração Autônoma:**

- Navegam aplicações sem scripts
- Identificam fluxos e funcionalidades
- Mapeiam dependências automaticamente

**2. Geração Inteligente:**

- Criam testes baseados em comportamento observado
- Geram dados de teste realistas
- Adaptam testes a mudanças

**3. Execução Adaptativa:**

- Ajustam estratégia baseada em resultados
- Priorizam testes por risco
- Parallelização inteligente

**4. Análise e Reporte:**

- Identificam causas-raiz de falhas
- Classificam severidade automaticamente
- Geram relatórios acionáveis

### Exemplo de Agente de Teste

```python
class AgenteDeTeste:
    def __init__(self, llm, ferramentas):
        self.llm = llm
        self.ferramentas = ferramentas
        self.memoria = []

    def explorar_aplicacao(self, url):
        """Explora aplicação autonomamente"""
        # Navega para URL
        self.ferramentas.navegador.acessar(url)

        # Identifica elementos interativos
        elementos = self.ferramentas.navegador.listar_elementos()

        # LLM decide próximos passos
        acao = self.llm.decidir_acao(elementos, self.memoria)

        # Executa ação
        resultado = self.ferramentas.executar(acao)

        # Atualiza memória
        self.memoria.append({"acao": acao, "resultado": resultado})

        return self.memoria

    def gerar_testes(self, exploracao):
        """Gera testes baseados em exploração"""
        prompt = f"""
        Baseado na seguinte exploração da aplicação:
        {exploracao}

        Gere casos de teste em formato BDD cobrindo:
        1. Caminho feliz
        2. Cenários de erro
        3. Condições de borda
        """

        return self.llm.gerar(prompt)
```

### Impacto no Papel do QA Engineer

| Aspecto           | Antes                | Depois (Agentic AI)      |
| ----------------- | -------------------- | ------------------------ |
| Execução          | Manual               | Autônoma                 |
| Manutenção        | 60-70% do tempo      | \<10% do tempo           |
| Criação de Testes | Script manual        | Geração assistida por IA |
| Análise de Falhas | Investigativa manual | Diagnóstico automático   |
| Cobertura         | Limitada por tempo   | Expansiva e contínua     |
| Foco do QA        | Execução             | Estratégia e Qualidade   |

## 6.7 Resumo

A era dos LLMs transforma fundamentalmente o teste de software:

- **Self-Healing:** Elimina gargalo de manutenção com adaptação automática
- **Geração Automática:** 10x mais rápido na criação de testes
- **Teste de LLMs:** Nova disciplina de testar modelos de linguagem
- **RAG Testing:** Avaliação especializada de sistemas de recuperação
- **Agentic AI:** Testes completamente autônomos

O engenheiro de teste evolui de executor para estrategista, focando em qualidade
holística enquanto sistemas autônomos executam e mantêm testes.

## Referências

1. Mechasm (2025). *The Future of Testing: Why Agentic AI is the End of Manual
   Scripts*. Disponível em: <https://www.mechasm.com/agentic-ai-testing>
2. PractiTest (2025). *How Agentic AI for Software Testing Is Transforming QA*.
   Disponível em: <https://www.practitest.com/agentic-ai-software-testing/>
3. DeepEval (2025). *LLM Evaluation Framework Documentation*. Disponível em:
   <https://docs.confident-ai.com/>
4. RAGAS (2025). *Retrieval Augmented Generation Assessment Framework*.
   Disponível em: <https://docs.ragas.io/>
5. Panaya (2025). *Self-Healing Test Automation: Ending Maintenance*. Disponível
   em: <https://www.panaya.com/self-healing-test-automation/>
6. Testim (2025). *AI-Powered Test Automation Platform*. Disponível em:
   <https://www.testim.io/>
7. Mabl (2025). *Intelligent Test Automation*. Disponível em:
   <https://www.mabl.com/>

______________________________________________________________________

*Seção anterior: [5. Tipos de Teste](05-tipos-de-teste.md) | Próxima seção:
[7. Automação Inteligente](07-automacao-inteligente.md)*

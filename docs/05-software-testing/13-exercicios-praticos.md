---
title: Exercícios Práticos
created_at: 2025-02-07
tags: [software-testing, exercicios, laboratorios, case-studies, pratica]
status: published
updated_at: 2025-02-07
ai_model: book-writer
---

# 13. Exercícios Práticos

## 13.1 Introdução

Este capítulo apresenta exercícios práticos para consolidar o aprendizado das
seções anteriores. Os exercícios são organizados por tema e nível de
complexidade, permitindo aplicação progressiva dos conceitos.

### Estrutura dos Exercícios

- **Exercícios por Seção:** Consolidam conceitos específicos
- **Laboratórios Práticos:** Atividades hands-on
- **Case Studies:** Análise de cenários reais
- **Projetos Capstone:** Integração de múltiplos conceitos

## 13.2 Exercícios por Seção

### Seção 2: Fundamentos de Teste

**Exercício 2.1: Aplicando os 7 Princípios**

**Cenário:** Uma empresa de e-commerce quer implementar testes em sua
plataforma. Analise as seguintes situações e identifique qual princípio
fundamenta cada uma:

1. A equipe decide não testar todas as combinações possíveis de produtos,
   categorias e promoções.
2. Após 3 semanas de testes intensivos sem encontrar bugs, o time fica confiante
   que o software está livre de defeitos.
3. O time começa a escrever testes apenas após 80% do código estar pronto.
4. Após 6 meses usando os mesmos testes de regressão, defeitos começam a
   escapar.
5. Uma nova funcionalidade de pagamento recebe mais atenção de teste que a
   funcionalidade de busca.
6. O time aplica os mesmos tipos de teste para o sistema de inventário e o blog
   da empresa.
7. O software passa em todos os testes funcionais, mas usuários não conseguem
   completar compras.

**Exercício 2.2: Verificação vs Validação**

Classifique as seguintes atividades como Verificação ou Validação:

1. Revisar se o código implementa corretamente a especificação de requisitos
2. Testar se o sistema de checkout atende às necessidades dos usuários
3. Verificar se a integração com gateway de pagamento funciona conforme contrato
4. Confirmar que a nova funcionalidade aumentou taxa de conversão
5. Validar que a aplicação segue o design aprovado
6. Testar se o tempo de resposta está dentro do SLA

### Seção 3: Níveis de Teste

**Exercício 3.1: Definindo Níveis de Teste**

Para o seguinte sistema de reservas de hotel, identifique quais níveis de teste
(unidade, integração, sistema, aceitação) são mais apropriados para cada
cenário:

**Sistema:**

- API REST para busca e reserva
- Frontend web e mobile
- Integração com gateways de pagamento
- Sistema de notificações por email/SMS
- Painel administrativo

**Cenários:**

1. Cálculo de preços com descontos sazonais
2. Processamento de pagamento via cartão de crédito
3. Fluxo completo: busca → reserva → pagamento → confirmação
4. Validação de disponibilidade de quartos em tempo real
5. Interface do usuário em diferentes dispositivos
6. Conformidade com LGPD na coleta de dados

**Exercício 3.2: Pirâmide de Teste**

Analise a seguinte distribuição de testes em um projeto:

- Testes de unidade: 50
- Testes de integração: 30
- Testes E2E: 200

**Questões:**

1. Esta distribuição segue a pirâmide de teste ideal? Por quê?
2. Quais problemas você antecipa?
3. Como você reestruturaria essa suite?
4. Como a introdução de IA poderia ajudar nesta situação?

### Seção 4: Técnicas de Teste

**Exercício 4.1: Equivalence Partitioning e Boundary Value Analysis**

**Sistema:** Função de transferência bancária

**Requisitos:**

- Valor mínimo: R$ 1,00
- Valor máximo: R$ 50.000,00 (por operação)
- Valor máximo diário: R$ 100.000,00
- Horário permitido: 06:00 - 22:00

**Tarefas:**

1. Defina as classes de equivalência para valor
2. Defina as classes de equivalência para horário
3. Identifique os valores de borda
4. Crie casos de teste mínimos para cobertura completa

**Exercício 4.2: Decision Table Testing**

**Sistema:** Cálculo de frete para e-commerce

**Regras:**

- Cliente VIP: frete grátis para qualquer valor
- Cliente comum:
  - Compra < R$ 100: frete R$ 15
  - Compra ≥ R$ 100 e < R$ 500: frete R$ 10
  - Compra ≥ R$ 500: frete grátis
- Região Norte/Nordeste: +R$ 5 em qualquer frete

**Tarefas:**

1. Crie uma tabela de decisão completa
2. Identifique regras redundantes ou impossíveis
3. Determine o número mínimo de casos de teste
4. Escreva os casos de teste em formato BDD

### Seção 6: Teste na Era dos LLMs

**Exercício 6.1: Analisando Self-Healing**

**Cenário:** Um teste E2E que verifica o fluxo de login começou a falhar após
uma atualização da UI. O desenvolvedor alterou o ID do botão de `login-btn` para
`btn-login-submit`.

**Perguntas:**

1. Como um sistema de self-healing tradicional lidaria com essa mudança?
2. Quais estratégias alternativas o sistema poderia usar para encontrar o
   elemento?
3. Escreva um pseudocódigo para um mecanismo de self-healing que use múltiplas
   estratégias de localização.

**Exercício 6.2: Prompt Engineering para Testes**

Você precisa gerar casos de teste para uma funcionalidade de carrinho de
compras. Escreva um prompt efetivo para um LLM que inclua:

1. Contexto do sistema
2. Requisitos específicos a testar
3. Formato de saída esperado (BDD/Gherkin)
4. Cenários que devem ser cobertos

**Exercício 6.3: Avaliação de Respostas LLM**

Dado o seguinte cenário RAG:

```
Contexto: "Política de Devolução: Clientes têm até 30 dias para devolver
produtos. Produtos eletrônicos têm garantia de 90 dias."

Pergunta: "Qual o prazo para devolver um celular?"

Resposta A: "Você tem 30 dias para devolver o celular."
Resposta B: "O celular tem garantia de 90 dias."
Resposta C: "Você tem 30 dias para devolver, mas o celular também tem garantia
de 90 dias contra defeitos."
```

Avalie cada resposta usando as métricas:

- Faithfulness (fidelidade ao contexto)
- Answer Relevancy (relevância da resposta)
- Completeness (completude)

**Exercício 6.4: Detecção de Alucinação**

Analise a seguinte resposta de um LLM:

```
Contexto: "Nossa empresa foi fundada em 2015. Temos 3 escritórios no Brasil."

Pergunta: "Quando a empresa foi fundada e quantos funcionários temos?"

Resposta: "A empresa foi fundada em 2015 e tem aproximadamente 500 funcionários
em 5 escritórios pelo mundo."
```

1. Identifique as alucinações na resposta.
2. Proponha uma estratégia automatizada para detectar essas alucinações.

______________________________________________________________________

### Seção 7: Automação Inteligente

**Exercício 7.1: Oráculo Inteligente**

Você está testando uma mensagem de boas-vindas que pode variar:

- "Bem-vindo, João!"
- "Olá, João! Que bom tê-lo aqui."
- "Oi, João! Bem-vindo ao sistema."

1. Por que um assert tradicional falharia nesses casos?
2. Projete um oráculo inteligente que valide semanticamente a mensagem.
3. Escreva o pseudocódigo deste oráculo.

**Exercício 7.2: Geração de Dados de Teste**

Para um sistema bancário, projete um gerador de dados sintéticos que:

1. Crie transações realistas (valores, horários, tipos)
2. Respeite limites regulatórios (LGPD)
3. Inclua casos de borda (valores extremos, transações suspeitas)
4. Mantenha consistência entre entidades relacionadas

**Exercício 7.3: Seleção Inteligente de Testes**

Um commit modificou os seguintes arquivos:

- `src/payment/gateway.py`
- `src/payment/validation.py`
- `tests/unit/payment/test_gateway.py`

A suite completa tem 500 testes. Desenhe um algoritmo que:

1. Analise as mudanças
2. Identifique componentes afetados
3. Selecione testes relevantes por risco
4. Priorize execução

______________________________________________________________________

### Seção 8: Qualidade e Métricas

**Exercício 8.1: Cálculo de ROI**

Uma empresa está considerando adotar ferramentas de IA para testes. Calcule o
ROI com base nos seguintes dados:

**Cenário Atual (sem IA):**

- Time de QA: 5 pessoas a R$ 10.000/mês cada
- Tempo médio de criação de teste: 4 horas
- Tempo gasto em manutenção: 65% do tempo
- Defect escape rate: 12%
- Custo médio de bug em produção: R$ 5.000

**Cenário Proposto (com IA):**

- Custo de ferramentas: R$ 15.000/mês
- Treinamento inicial: R$ 30.000
- Redução de 70% no tempo de criação
- Redução de 60% na manutenção
- Redução de 50% no defect escape rate

**Perguntas:**

1. Calcule o ROI em 12 meses.
2. Qual o payback period?
3. Quais métricas você usaria para validar o sucesso?

**Exercício 8.2: Quality Gates Adaptativos**

Projete quality gates para diferentes cenários:

1. **Hotfix crítico em produção** (tempo é essencial)
2. **Release de feature major** (qualidade máxima necessária)
3. **Deploy em ambiente de desenvolvimento** (feedback rápido)

Para cada cenário, defina:

- Thresholds de cobertura
- Testes obrigatórios
- Tempo máximo de execução
- Critérios de rollback automático

**Exercício 8.3: Dashboard de Qualidade**

Você precisa criar um dashboard para stakeholders. Defina:

1. **Métricas para executivos** (visão de negócio)
2. **Métricas para time de desenvolvimento** (visão técnica)
3. **Métricas para QA** (visão operacional)
4. Alertas automáticos importantes

______________________________________________________________________

### Seção 9: Ferramentas Modernas

**Exercício 9.1: Seleção de Ferramentas**

Uma empresa precisa escolher ferramentas de teste. Analise os cenários:

**Cenário A: Startup com 10 desenvolvedores, budget limitado**

- Prioridades: Custo, velocidade de setup, manutenção mínima

**Cenário B: Enterprise com 200+ desenvolvedores, compliance rigoroso**

- Prioridades: Segurança, integração, governança, suporte

**Cenário C: Fintech com alta criticidade, releases diários**

- Prioridades: Confiança, velocidade, auditabilidade

Para cada cenário, recomende:

1. Ferramentas de E2E automation
2. Ferramentas de teste de LLM (se aplicável)
3. Estratégia de integração CI/CD

**Exercício 9.2: Comparação AI-Augmented vs AI-Native**

Compare duas abordagens para um projeto de teste E2E:

**Opção 1:** Selenium (tradicional) + Applitools (AI-Augmented) **Opção 2:**
Virtuoso (AI-Native)

Analise:

1. Custo total de propriedade (TCO) em 2 anos
2. Curva de aprendizado
3. Vendor lock-in
4. Capacidades de self-healing
5. Flexibilidade de customização

**Exercício 9.3: Proof of Concept**

Você precisa executar um PoC de ferramenta de teste com IA. Crie um plano que
inclua:

1. Critérios de seleção da ferramenta
2. Escopo do PoC (3-4 semanas)
3. Métricas de sucesso
4. Riscos e mitigações
5. Critérios de go/no-go

______________________________________________________________________

### Seção 10: Novos Paradigmas

**Exercício 10.1: Shift Left Extremo**

Para o seguinte requisito:

```
"O sistema deve permitir transferências bancárias entre contas internas."
```

1. Identifique ambiguidades e questões não respondidas.
2. Proponha critérios de aceitação em BDD.
3. Desenhe testes que poderiam ser criados na fase de requisitos.
4. Como a IA poderia ajudar nesta fase?

**Exercício 10.2: Quality as Code**

Projete um arquivo `quality-policies.yaml` para uma aplicação web que inclua:

1. Políticas de cobertura de código por camada
2. Limites de complexidade ciclomática
3. Regras de segurança
4. Critérios de performance
5. Gates de qualidade por ambiente

**Exercício 10.3: Chaos Engineering**

Projete um experimento de Chaos Engineering para um serviço de pagamentos:

1. Defina a hipótese
2. Escolha a falha a injetar
3. Defina métricas de sucesso
4. Planeje rollback automático
5. Estabeleça critérios de abortar o experimento

______________________________________________________________________

### Seção 11: Tendências e Futuro

**Exercício 11.1: Plano de Capacitação**

Um QA Engineer tradicional quer se preparar para 2030. Crie um plano de
capacitação de 12 meses incluindo:

1. **Mês 1-3:** Fundamentos de IA/ML para testadores
2. **Mês 4-6:** Prompt engineering e ferramentas modernas
3. **Mês 7-9:** Arquitetura de sistemas e dados
4. **Mês 10-12:** Projetos práticos e certificações

Para cada fase, defina:

- Objetivos de aprendizagem
- Recursos (cursos, livros, prática)
- Projetos práticos
- Métricas de sucesso

**Exercício 11.2: Cenário Futuro**

Imagine que é 2030 e você é um "Quality Strategist". Descreva:

1. Um dia típico de trabalho
2. Ferramentas que você usa
3. Como você interage com sistemas de IA
4. Suas principais responsabilidades
5. Habilidades que são essenciais

**Exercício 11.3: Análise de Impacto**

Analise o impacto da IA autônoma em testes para:

1. **Profissionais de QA Junior**
2. **QA Engineers Sênior**
3. **Test Architects**
4. **QA Managers**

Para cada perfil:

- O que muda?
- O que permanece?
- Novas oportunidades?
- Riscos de obsolescência?

______________________________________________________________________

### Seção 5: Tipos de Teste

**Exercício 5.1: Seleção de Tipos de Teste**

Para cada situação, identifique o(s) tipo(s) de teste mais apropriado(s):

1. Nova versão do sistema após correção de bug crítico
2. Verificação rápida após deploy em staging
3. Liberação de nova versão para 5% dos usuários
4. Teste de comportamento sob Black Friday
5. Validação de que mudanças não quebraram funcionalidades existentes
6. Verificação de segurança antes de lidar com dados de cartão de crédito
7. Teste de usabilidade com usuários reais
8. Verificação de funcionamento em iOS, Android e Web

**Exercício 5.2: Plano de Teste de Performance**

**Cenário:** Sistema de ingressos para eventos. Evento popular com expectativa
de 10.000 acessos simultâneos na abertura das vendas.

**Tarefas:**

1. Defina os tipos de teste de performance necessários
2. Estabeleça métricas e thresholds
3. Crie cenários de teste realistas
4. Defina a infraestrutura necessária
5. Estabeleça critérios de sucesso/falha

## 13.3 Laboratórios Práticos

### Laboratório 1: Setup de Ambiente de Testes com IA

**Objetivo:** Configurar ambiente completo de testes utilizando ferramentas de
IA.

**Ferramentas:**

- GitHub Copilot (ou alternativa gratuita: Codeium)
- Selenium ou Playwright
- Pytest ou Jest

**Passos:**

**1. Configuração do Ambiente:**

```bash
# Setup inicial
mkdir lab-ai-testing
cd lab-ai-testing
python -m venv venv
source venv/bin/activate

# Instalação de dependências
pip install pytest selenium webdriver-manager
pip install openai  # Para integrações
```

**2. Criação de Aplicação de Teste:**

```python
# app/calculadora.py
class Calculadora:
    def __init__(self):
        self.historico = []

    def somar(self, a, b):
        resultado = a + b
        self.historico.append(f"{a} + {b} = {resultado}")
        return resultado

    def dividir(self, a, b):
        if b == 0:
            raise ValueError("Divisão por zero não permitida")
        resultado = a / b
        self.historico.append(f"{a} / {b} = {resultado}")
        return resultado
```

**3. Geração de Testes com IA:**

- Use GitHub Copilot para gerar testes unitários
- Analise a qualidade dos testes gerados
- Adicione casos de borda manualmente

**4. Validação:**

```bash
# Execute os testes
pytest tests/ -v --cov=app

# Analise cobertura
pytest --cov-report=html
```

### Laboratório 2: Automação de Testes E2E com Self-Healing

**Objetivo:** Implementar testes E2E que se adaptam a mudanças na UI.

**Setup:**

1. Crie uma aplicação web simples (HTML + JavaScript)
2. Implemente testes usando Selenium ou Playwright
3. Simule mudanças na UI
4. Implemente mecanismo de self-healing

**Código de Exemplo:**

```python
# tests/test_self_healing.py
class SelfHealingDriver:
    def __init__(self, driver):
        self.driver = driver
        self.element_cache = {}

    def find_element(self, description, **attributes):
        """
        Busca elemento usando múltiplas estratégias
        """
        # Estratégia 1: Busca direta
        try:
            return self.driver.find_element(By.ID, attributes.get('id'))
        except NoSuchElementException:
            pass

        # Estratégia 2: Busca por atributos flexíveis
        for key, value in attributes.items():
            try:
                xpath = f"//*[@{key}='{value}']"
                return self.driver.find_element(By.XPATH, xpath)
            except NoSuchElementException:
                continue

        # Estratégia 3: Busca por texto/contém
        try:
            xpath = f"//*[contains(text(), '{description}')]"
            return self.driver.find_element(By.XPATH, xpath)
        except NoSuchElementException:
            raise ElementNotFound(f"Não foi possível encontrar: {description}")

def test_login_with_self_healing():
    driver = SelfHealingDriver(webdriver.Chrome())
    driver.get("http://localhost:8000/login")

    # Funciona mesmo se IDs mudarem
    username = driver.find_element(
        "campo de usuário",
        id="username",
        name="user",
        placeholder="Email"
    )
    username.send_keys("test@example.com")
```

### Laboratório 3: Avaliação de Prompts LLM

**Objetivo:** Implementar testes para um sistema baseado em LLM.

**Setup:**

```python
# app/assistente.py
import openai

class AssistenteSuporte:
    def __init__(self):
        self.client = openai.OpenAI()

    def responder(self, pergunta, contexto=None):
        prompt = f"""
        Você é um assistente de suporte técnico.
        Responda à pergunta do usuário de forma clara e objetiva.

        Contexto: {contexto or 'Nenhum'}
        Pergunta: {pergunta}
        """

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message.content
```

**Testes:**

```python
# tests/test_assistente.py
from deepeval import assert_test
from deepeval.metrics import FaithfulnessMetric, AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

def test_resposta_fiel_ao_contexto():
    contexto = """
    Política de devolução:
    - Produtos podem ser devolvidos em até 7 dias
    - É necessário apresentar nota fiscal
    - Produtos usados não são aceitos
    """

    test_case = LLMTestCase(
        input="Qual o prazo para devolução?",
        actual_output=assistente.responder(
            "Qual o prazo para devolução?",
            contexto
        ),
        retrieval_context=[contexto],
        expected_output="O prazo para devolução é de 7 dias."
    )

    assert_test(test_case, [FaithfulnessMetric(threshold=0.7)])
```

## 13.4 Case Studies

### Case Study 1: E-commerce Migration

**Contexto:** Uma empresa de e-commerce com 10 anos de operação está migrando de
uma plataforma monolítica legada para arquitetura de microserviços. Possui 5000+
testes manuais e 200 scripts de automação quebram frequentemente.

**Desafios:**

1. Suite de regressão leva 5 dias para executar
2. 70% dos scripts precisam de manutenção mensal
3. Defect escape rate de 18%
4. Time de QA gasta 80% do tempo em manutenção

**Perguntas:**

1. Como você priorizaria a migração dos testes?
2. Quais ferramentas de IA recomendaria?
3. Como mediria o sucesso da transformação?
4. Quais riscos você antecipa e como mitigaria?
5. Elabore um roadmap de 12 meses para esta transformação.

**Diretrizes de Resposta:**

- Considere abordagem incremental
- Priorize testes por risco e valor
- Inclua treinamento da equipe
- Estabeleça métricas de sucesso

### Case Study 2: Startup Fintech

**Contexto:** Startup fintech com 20 desenvolvedores, crescendo rapidamente. Não
possui equipe dedicada de QA. Releases são feitos diariamente, mas qualidade é
inconsistente. Já tiveram 2 incidentes críticos em produção no último trimestre.

**Restrições:**

- Budget limitado para ferramentas
- Sem headcount para contratar QAs
- Necessidade de velocidade mantida
- Compliance regulatório obrigatório

**Perguntas:**

1. Como implementar qualidade sem equipe dedicada?
2. Quais processos e ferramentas recomendaria?
3. Como balancear velocidade e qualidade?
4. Quais métricas implementar desde o início?
5. Como garantir compliance com recursos limitados?

### Case Study 3: Enterprise Healthcare

**Contexto:** Sistema de gestão hospitalar com 20 anos de existência. Código
legado em múltiplas linguagens. Testes manuais extensivos (3 semanas por
release). Compliance FDA e LGPD. Ciclos de release trimestrais.

**Objetivos:**

- Reduzir ciclo de release para 2 semanas
- Manter compliance
- Reduzir custos de teste
- Melhorar qualidade

**Perguntas:**

1. Como abordar código legado com IA?
2. Quais testes automatizar primeiro?
3. Como garantir compliance durante transformação?
4. Qual estratégia de migração recomendaria?
5. Como convencer stakeholders de investimento em QA?

## 13.5 Projetos Capstone

### Projeto 1: Transformação de Suíte Legada

**Objetivo:** Transformar uma suite de testes legada em uma suite moderna com
IA.

**Entregáveis:**

1. Análise da suite atual
2. Plano de transformação
3. Implementação de PoC
4. Métricas comparativas
5. Documentação de lições aprendidas

**Critérios de Avaliação:**

- Redução de 50%+ no tempo de manutenção
- Melhoria na cobertura de testes
- Integração com CI/CD
- Documentação clara

### Projeto 2: Implementação de Testes Autônomos

**Objetivo:** Implementar sistema de testes autônomos para uma aplicação web.

**Entregáveis:**

1. Setup de ferramentas (Virtuoso, Testim ou similar)
2. Configuração de self-healing
3. Suite de testes E2E
4. Relatórios de execução
5. Análise de resultados

**Critérios de Avaliação:**

- Automação de 80%+ dos fluxos críticos
- Manutenção mínima demonstrada
- Documentação de processos
- Apresentação de resultados

### Projeto 3: Plano de Adoção de IA

**Objetivo:** Desenvolver plano completo de adoção de IA em testes para
organização fictícia.

**Entregáveis:**

1. Análise de contexto organizacional
2. Business case com ROI
3. Roadmap de 12 meses
4. Plano de gestão de mudança
5. Estratégia de mitigação de riscos

**Critérios de Avaliação:**

- Viabilidade técnica
- Viabilidade financeira
- Abrangência do plano
- Qualidade da apresentação

## 13.6 Recursos Adicionais

### Repositórios de Exemplo

Repositórios recomendados para prática (URLs ilustrativas - busque projetos
similares no GitHub):

**Projetos de Teste com IA:**

- `github.com/confident-ai/deepeval` - Framework DeepEval oficial (open-source)
- `github.com/Schemathesis/schemathesis` - Property-based testing para APIs
- `github.com/EMResearch/EvoMaster` - Teste evolutivo para APIs REST
- `github.com/google/atheris` - Fuzzing para Python (Google)

**Projetos de Demonstração:**

- `github.com/microsoft/playwright-python` - Automação moderna de browsers
- `github.com/pytest-dev/pytest` - Framework de teste Python
- `github.com/testing-library/react-testing-library` - Testes de componentes
  React
- `github.com/cypress-io/cypress` - E2E testing framework

**Exemplos de RAG Testing:**

- `github.com/explodinggradients/ragas` - Framework RAGAS para avaliação RAG
- `github.com/truera/trulens` - Observabilidade para aplicações LLM
- `github.com/Arize-ai/phoenix` - ML observability open-source

**Dica:** Use estes repositórios como referência para criar seus próprios
exercícios práticos. A maioria inclui exemplos e documentação completa.

### Datasets para Prática

- OpenAPI specs públicas
- Datasets de teste de software
- Benchmarks de qualidade

### Ferramentas para Experimentação

- GitHub Copilot (trial)
- DeepEval (open-source)
- Selenium + Python
- pytest com plugins

## 13.7 Resumo

Os exercícios práticos consolidam o aprendizado através de:

- **Aplicação direta** de conceitos teóricos
- **Hands-on** com ferramentas modernas
- **Análise** de cenários reais
- **Projetos integradores** para fixação

### Laboratório 4: Teste de Prompts com DeepEval

**Objetivo:** Implementar testes completos para uma aplicação RAG usando
DeepEval.

**Setup:**

```python
# Instalação
pip install deepeval

# Configuração
export OPENAI_API_KEY="sua-chave"
```

**Código Base:**

```python
# app/rag_assistant.py
from openai import OpenAI

class RAGAssistant:
    def __init__(self, retriever):
        self.client = OpenAI()
        self.retriever = retriever

    def responder(self, pergunta):
        # Recupera contexto
        contexto = self.retriever.buscar(pergunta)

        # Gera resposta
        prompt = f"""
        Contexto: {contexto}
        Pergunta: {pergunta}
        Responda baseado apenas no contexto fornecido.
        """

        response = self.client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        return {
            "resposta": response.choices[0].message.content,
            "contexto": contexto
        }
```

**Testes com DeepEval:**

```python
# tests/test_rag.py
import pytest
from deepeval import assert_test
from deepeval.metrics import (
    FaithfulnessMetric,
    AnswerRelevancyMetric,
    ContextualPrecisionMetric,
    ContextualRecallMetric
)
from deepeval.test_case import LLMTestCase
from app.rag_assistant import RAGAssistant

class TestRAGAssistant:
    def setup_method(self):
        self.assistant = RAGAssistant(mock_retriever())

    def test_fidelidade_resposta(self):
        """Testa se resposta é fiel ao contexto"""
        pergunta = "Qual o prazo de entrega?"
        resultado = self.assistant.responder(pergunta)

        test_case = LLMTestCase(
            input=pergunta,
            actual_output=resultado["resposta"],
            retrieval_context=[resultado["contexto"]]
        )

        assert_test(test_case, [FaithfulnessMetric(threshold=0.8)])

    def test_relevancia_contexto(self):
        """Testa se contexto recuperado é relevante"""
        pergunta = "Quais formas de pagamento?"
        resultado = self.assistant.responder(pergunta)

        test_case = LLMTestCase(
            input=pergunta,
            actual_output=resultado["resposta"],
            retrieval_context=[resultado["contexto"]]
        )

        assert_test(test_case, [
            ContextualPrecisionMetric(threshold=0.7),
            ContextualRecallMetric(threshold=0.7)
        ])

    def test_resposta_relevante(self):
        """Testa se resposta responde à pergunta"""
        pergunta = "Como faço para trocar um produto?"
        resultado = self.assistant.responder(pergunta)

        test_case = LLMTestCase(
            input=pergunta,
            actual_output=resultado["resposta"]
        )

        assert_test(test_case, [AnswerRelevancyMetric(threshold=0.8)])
```

**Exercícios Adicionais:**

1. Adicione testes para detecção de alucinação
2. Implemente testes de toxicidade/bias
3. Crie um dataset de avaliação com 20+ casos
4. Configure integração com CI/CD

### Laboratório 5: Configuração de Self-Healing com Testim

**Objetivo:** Configurar testes E2E com capacidade de self-healing usando
ferramenta comercial.

**Nota:** Este laboratório requer acesso ao Testim (trial disponível).

**Setup:**

1. Crie conta em <https://www.testim.io> (trial)

2. Instale o Testim CLI:

   ```bash
   npm install -g @testim/testim-cli
   ```

3. Configure projeto:

   ```bash
   testim init
   ```

**Criando Teste com Self-Healing:**

```javascript
// tests/checkout.test.js
describe('Checkout E2E', () => {
  it('deve completar compra com sucesso', async () => {
    // Testim grava interações e cria smart locators
    await goto('https://loja-exemplo.com');

    // Smart locator - funciona mesmo se IDs mudarem
    await click('Adicionar ao carrinho');
    await click('Ir para checkout');

    // Preenchimento de formulário
    await type('campo-email', 'cliente@teste.com');
    await type('campo-senha', 'senha123');
    await click('Entrar');

    // Checkout
    await click('Confirmar pagamento');

    // Validação
    await expectText('Pedido confirmado!');
  });
});
```

**Testando Self-Healing:**

1. Execute o teste original - deve passar
2. Modifique a aplicação (ex: mude ID do botão)
3. Execute novamente - deve passar com auto-correção
4. Verifique no painel Testim as adaptações feitas

**Métricas para Analisar:**

- Taxa de self-healing (quanto % dos testes se adaptaram)
- Tempo de execução antes/depois
- Falsos positivos evitados

### Laboratório 6: Análise de Métricas de Qualidade

**Objetivo:** Criar dashboard e analisar métricas de qualidade com dados reais.

**Setup:**

```python
# requirements.txt
pandas
matplotlib
seaborn
plotly
dash
```

**Coleta de Dados:**

```python
# scripts/coletar_metricas.py
import pandas as pd
from datetime import datetime, timedelta

def coletar_metricas_historicas():
    """Coleta métricas dos últimos 6 meses"""

    # Dados simulados - substituir por dados reais do seu projeto
    dados = {
        'mes': pd.date_range(start='2024-01-01', periods=6, freq='M'),
        'defect_escape_rate': [12, 10, 8, 7, 5, 4],
        'tempo_execucao_suite': [45, 42, 38, 35, 30, 28],
        'cobertura_codigo': [45, 52, 60, 68, 75, 80],
        'testes_flaky': [15, 12, 10, 8, 5, 3],
        'tempo_criacao_teste': [4.0, 3.5, 2.8, 2.0, 1.5, 1.2]
    }

    return pd.DataFrame(dados)

def calcular_tendencias(df):
    """Analisa tendências nas métricas"""

    tendencias = {}

    for coluna in df.columns:
        if coluna != 'mes':
            # Calcula tendência linear
            x = range(len(df))
            y = df[coluna]

            slope = np.polyfit(x, y, 1)[0]

            tendencias[coluna] = {
                'direcao': 'melhorando' if slope < 0 else 'piorando',
                'taxa_mudanca': abs(slope),
                'valor_atual': y.iloc[-1]
            }

    return tendencias
```

**Dashboard com Plotly:**

```python
# dashboard/quality_dashboard.py
import dash
from dash import dcc, html
import plotly.graph_objects as go
from plotly.subplots import make_subplots

def criar_dashboard(df):
    """Cria dashboard interativo de qualidade"""

    app = dash.Dash(__name__)

    # Gráfico de tendências
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=(
            'Defect Escape Rate',
            'Cobertura de Código',
            'Tempo de Execução',
            'Testes Flaky'
        )
    )

    # Defect Escape Rate
    fig.add_trace(
        go.Scatter(
            x=df['mes'],
            y=df['defect_escape_rate'],
            mode='lines+markers',
            name='Defect Escape %',
            line=dict(color='red')
        ),
        row=1, col=1
    )

    # Cobertura
    fig.add_trace(
        go.Scatter(
            x=df['mes'],
            y=df['cobertura_codigo'],
            mode='lines+markers',
            name='Cobertura %',
            line=dict(color='green')
        ),
        row=1, col=2
    )

    # Tempo execução
    fig.add_trace(
        go.Scatter(
            x=df['mes'],
            y=df['tempo_execucao_suite'],
            mode='lines+markers',
            name='Minutos',
            line=dict(color='blue')
        ),
        row=2, col=1
    )

    # Testes flaky
    fig.add_trace(
        go.Scatter(
            x=df['mes'],
            y=df['testes_flaky'],
            mode='lines+markers',
            name='Quantidade',
            line=dict(color='orange')
        ),
        row=2, col=2
    )

    fig.update_layout(height=600, title_text="Dashboard de Qualidade")

    app.layout = html.Div([
        html.H1("Dashboard de Qualidade de Software"),

        # Cards de métricas
        html.Div([
            html.Div([
                html.H3("Cobertura Atual"),
                html.H2(f"{df['cobertura_codigo'].iloc[-1]}%")
            ], className='card'),

            html.Div([
                html.H3("Defect Escape"),
                html.H2(f"{df['defect_escape_rate'].iloc[-1]}%")
            ], className='card'),

            html.Div([
                html.H3("Testes Flaky"),
                html.H2(f"{df['testes_flaky'].iloc[-1]}")
            ], className='card'),
        ], style={'display': 'flex', 'gap': '20px'}),

        dcc.Graph(figure=fig)
    ])

    return app

if __name__ == '__main__':
    df = coletar_metricas_historicas()
    app = criar_dashboard(df)
    app.run_server(debug=True)
```

**Análise de ROI:**

```python
# scripts/analisar_roi.py
def calcular_roi(dados):
    """Calcula ROI da adoção de ferramentas de IA"""

    # Custos
    custo_ferramentas = 15000 * 12  # R$ 15k/mês
    custo_treinamento = 30000
    custo_implementacao = 50000

    custo_total = custo_ferramentas + custo_treinamento + custo_implementacao

    # Ganhos (baseado em melhorias observadas)
    reducao_manutencao = 5 * 10000 * 12 * 0.60  # 5 QAs, 60% redução
    reducao_defeitos = 50 * 5000 * 0.50  # 50 bugs/ano, 50% redução
    aceleracao_release = 100000  # valor estimado

    ganhos_totais = reducao_manutencao + reducao_defeitos + aceleracao_release

    roi = ((ganhos_totais - custo_total) / custo_total) * 100

    return {
        'investimento': custo_total,
        'retorno': ganhos_totais,
        'roi_percentual': roi,
        'payback_meses': custo_total / (ganhos_totais / 12)
    }
```

**Exercícios:**

1. Conecte a dashboard aos dados reais do seu projeto
2. Adicione alertas automáticos quando métricas críticas mudarem
3. Crie relatórios automáticos semanais
4. Implemente predição de tendências usando ML

______________________________________________________________________

Prática constante é essencial para dominar teste de software na era dos LLMs.

## 13.7 Gabarito e Diretrizes de Resposta

Esta seção fornece diretrizes para validar suas respostas aos exercícios.

### Seção 2: Fundamentos

**Exercício 2.1 - Princípios:**

1. **Teste exaustivo é impossível** - Não testar todas as combinações
2. **Teste demonstra presença de defeitos** - Não pode provar ausência
3. **Teste antecipado economiza** - Começar testes tarde aumenta custo
4. **Paradoxo do pesticida** - Testes repetidos perdem eficácia
5. **Agrupamento de defeitos** - Concentrar esforços em áreas de risco
6. **Teste depende do contexto** - Diferentes sistemas, diferentes abordagens
7. **Ausência de erros é falácia** - Software sem bugs pode ser inútil

**Exercício 2.2 - Verificação vs Validação:**

1. Verificação ("construímos corretamente?")
2. Validação ("construímos o certo?")
3. Verificação (conformidade com contrato)
4. Validação (valor para negócio)
5. Verificação (conformidade com design)
6. Verificação (conformidade com SLA)

### Seção 3: Níveis de Teste

**Exercício 3.2 - Pirâmide:**

1. Não segue a pirâmide ideal. Tem 200 testes E2E vs 50 unitários (ratio
   invertido).

2. Problemas antecipados:

   - Suite lenta para executar
   - Manutenção onerosa dos E2E
   - Feedback tardio
   - Custo alto de execução

3. Reestruturação sugerida:

   - Mover lógica dos E2E para testes de unidade (200 → ~150 testes unit)
   - Reduzir E2E para fluxos críticos (200 → ~30)
   - Aumentar integração (30 → ~60)
   - Proporção ideal: 150/60/30

4. IA pode:

   - Identificar testes E2E que podem ser unitários
   - Gerar testes de unidade automaticamente
   - Selecionar E2E essenciais por análise de risco

### Seção 4: Técnicas de Teste

**Exercício 4.1 - EP e BVA:**

Classes de equivalência para valor:

- Válida: R$ 1,00 - R$ 50.000,00
- Inválida: < R$ 1,00
- Inválida: > R$ 50.000,00 (por operação)
- Inválida: não numérico

Valores de borda:

- 0,99 (inválido)
- 1,00 (válido)
- 50.000,00 (válido)
- 50.000,01 (inválido)

Classes para horário:

- Válido: 06:00 - 22:00
- Inválido: < 06:00
- Inválido: > 22:00

### Seção 5: Tipos de Teste

**Exercício 5.1 - Seleção:**

1. Re-testing + Regression Testing
2. Smoke Testing
3. Canary Release / A/B Testing
4. Load Testing + Stress Testing
5. Regression Testing
6. Security Testing (Penetration + Vulnerability)
7. Usability Testing / UAT
8. Compatibility Testing (cross-platform)

### Seção 6: Teste na Era dos LLMs

**Exercício 6.3 - Avaliação RAG:**

**Resposta A:**

- Faithfulness: Alta (baseada no contexto)
- Answer Relevancy: Baixa (não menciona garantia)
- Completeness: Baixa

**Resposta B:**

- Faithfulness: Média (correta mas incompleta)
- Answer Relevancy: Média (responde mas não é a resposta completa)
- Completeness: Baixa

**Resposta C:**

- Faithfulness: Alta (fiel ao contexto)
- Answer Relevancy: Alta (responde completamente)
- Completeness: Alta (ambas informações)

**Melhor resposta: C**

### Seção 8: Qualidade e Métricas

**Exercício 8.1 - Cálculo de ROI:**

**Investimento Anual:**

- Ferramentas: 15.000 × 12 = R$ 180.000
- Treinamento: R$ 30.000
- Total: R$ 210.000

**Economias Anuais:**

- Manutenção: 5 × 10.000 × 12 × 0,60 × 0,65 = R$ 234.000 *(5 pessoas, 65% tempo
  em manutenção, 60% redução)*
- Defeitos: (12% → 6%) × número de bugs estimado × R$ 5.000 *Estimativa: 20
  bugs/ano evitados = R$ 100.000*
- Total economia: ~R$ 334.000

**ROI:**

- ROI = (334.000 - 210.000) / 210.000 × 100 = **59%**
- Payback: ~7-8 meses

### Seção 11: Tendências

**Exercício 11.1 - Plano de Capacitação:**

**Mês 1-3: Fundamentos**

- Cursos: Machine Learning básico (Coursera, fast.ai)
- Leitura: "Hands-On Machine Learning" (Aurélien Géron)
- Prática: Experimente modelos simples com scikit-learn
- Objetivo: Entender conceitos de ML (não ser especialista)

**Mês 4-6: Ferramentas Modernas**

- Cursos: Prompt engineering (DeepLearning.AI)
- Prática: GitHub Copilot, ChatGPT, ferramentas de teste com IA
- Projetos: Automatize testes simples com assistentes IA
- Certificação: Considerar certificações em ferramentas específicas

**Mês 7-9: Arquitetura**

- Estudo: Design de sistemas, APIs REST, microsserviços
- Dados: SQL avançado, analytics básico
- Prática: Projete arquiteturas de teste para sistemas complexos

**Mês 10-12: Consolidação**

- Projeto: Lidere transformação de testes em um projeto real
- Mentoria: Compartilhe conhecimento, ensine outros
- Networking: Participe de comunidades, eventos
- Certificação: Avalie certificações em AI/ML para QA

______________________________________________________________________

*Seção anterior:
[12. Framework de Implementação](12-framework-implementacao.md)*

**Fim do KA 05 - Teste de Software**

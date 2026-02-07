---
title: Exercícios Práticos
created_at: 2025-02-07
tags: [software-testing, exercicios, laboratorios, case-studies, pratica]
status: draft
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

- github.com/exemplo/lab-ai-testing
- github.com/exemplo/self-healing-demo
- github.com/exemplo/rag-testing-examples

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

Prática constante é essencial para dominar teste de software na era dos LLMs.

______________________________________________________________________

*Seção anterior:
[12. Framework de Implementação](12-framework-implementacao.md)*

**Fim do KA 05 - Teste de Software**

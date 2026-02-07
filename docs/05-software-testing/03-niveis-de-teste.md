---
title: Níveis de Teste
created_at: 2025-02-07
tags: [software-testing, niveis, unit-test, integration-test, system-test, acceptance-test]
status: in-progress
updated_at: 2026-02-07
ai_model: book-writer
---

# 3. Níveis de Teste

## 3.1 Visão Geral

Os níveis de teste organizam atividades de teste ao longo do ciclo de vida do
software, do mais granular (unidade) ao mais amplo (aceitação). Cada nível
possui objetivos específicos, responsabilidades distintas e impactos diferentes
na qualidade do software.

Na era dos LLMs, cada nível de teste é transformado por capacidades de geração
automática, self-healing e análise inteligente, alterando não apenas como
testamos, mas quem é responsável por cada nível.

## 3.2 Pirâmide de Teste na Era dos LLMs

### Pirâmide Tradicional

```
    /\
   /  \     E2E Tests (UI)
  /____\
 /      \   Integration Tests
/        \
----------  Unit Tests (Base)
```

- **Base ampla:** Testes de unidade (70%)
- **Meio:** Testes de integração (20%)
- **Topo:** Testes E2E (10%)

### Pirâmide Evolutiva com IA

```
    /\
   /  \     Autonomous E2E (Self-healing)
  /____\
 /      \   Intelligent Integration
/        \
----------  AI-Generated Unit Tests
```

**Transformações:**

- **Geração automática** de testes de unidade
- **Self-healing** em testes E2E
- **Priorização inteligente** baseada em risco
- **Maior cobertura** com mesmo esforço

## 3.3 Teste de Unidade (Unit Testing)

### Definição

Teste de unidade verifica a menor parte testável do software (funções, métodos,
classes) isoladamente de outras unidades.

**Características:**

- Executa em milissegundos
- Isola componentes usando mocks/stubs
- Feedback imediato para desenvolvedores
- Base do Test-Driven Development (TDD)

### Na Era dos LLMs

**Geração Automática de Testes:**

- GitHub Copilot gera testes unitários automaticamente
- Análise de código para identificar caminhos de teste
- Comando `/tests` no Copilot Chat

**Exemplo com IA:**

```python
# Código original
def calcular_desconto(valor, percentual):
    if percentual < 0 or percentual > 100:
        raise ValueError("Percentual inválido")
    return valor * (percentual / 100)

# Testes gerados automaticamente por Copilot
def test_calcular_desconto_valido():
    assert calcular_desconto(100, 10) == 10.0

def test_calcular_desconto_zero():
    assert calcular_desconto(100, 0) == 0.0

def test_calcular_desconto_maximo():
    assert calcular_desconto(100, 100) == 100.0

def test_calcular_desconto_percentual_negativo():
    with pytest.raises(ValueError):
        calcular_desconto(100, -5)

def test_calcular_desconto_percentual_maior_100():
    with pytest.raises(ValueError):
        calcular_desconto(100, 150)
```

**Benefícios:**

- 10x mais rápido na criação
- Cobertura de casos de borda
- Consistência nos padrões de teste

**Limitações:**

- Requer revisão humana
- Possíveis alucinações
- Contexto limitado para lógica complexa

### Cobertura de Código

**Tipos de Cobertura:**

- **Statement Coverage:** Percentual de instruções executadas
- **Branch Coverage:** Percentual de ramificações testadas
- **Path Coverage:** Percentual de caminhos possíveis
- **MC/DC:** Modified Condition/Decision Coverage

**Ferramentas com IA:**

- Análise automática de gaps de cobertura
- Sugestão de testes para aumentar cobertura
- Identificação de código morto

### Responsabilidades

**Tradicional:**

- Desenvolvedores escrevem testes
- QA revisa cobertura
- Manutenção manual

**Com LLMs:**

- Desenvolvedores curam testes gerados
- IA sugere casos de borda
- Self-healing de testes unitários

## 3.4 Teste de Integração (Integration Testing)

### Definição

Teste de integração verifica a interação entre módulos ou unidades integradas,
focando em fluxo de dados, comunicação e interfaces.

**Objetivos:**

- Verificar integração entre componentes
- Identificar problemas de interface
- Validar fluxo de dados
- Garantir comunicação adequada

### Estratégias de Integração

**1. Big Bang:**

- Todas as unidades integradas de uma vez
- Risco alto, difícil isolar problemas
- **Com IA:** Análise de dependências para mitigar riscos

**2. Top-Down:**

- Integra do topo da hierarquia para baixo
- Requer stubs para módulos inferiores
- **Com IA:** Geração automática de stubs

**3. Bottom-Up:**

- Integra das unidades base para o topo
- Requer drivers para módulos superiores
- **Com IA:** Criação inteligente de drivers

**4. Sandwich (Híbrida):**

- Combinação de Top-Down e Bottom-Up
- Divide sistema em camadas
- **Com IA:** Análise ótima de camadas

### Na Era dos LLMs

**Geração de Testes de API:**

```python
# Teste de integração gerado a partir de OpenAPI spec
class TestPedidoAPI:
    def test_criar_pedido_com_itens_validos(self):
        # Gerado automaticamente a partir do schema
        payload = {
            "cliente_id": "123",
            "itens": [
                {"produto_id": "P001", "quantidade": 2},
                {"produto_id": "P002", "quantidade": 1}
            ]
        }
        response = self.client.post("/api/pedidos", json=payload)
        assert response.status_code == 201
        assert "id" in response.json()

    def test_pedido_com_estoque_insuficiente(self):
        # IA identificou cenário de borda
        payload = {
            "cliente_id": "123",
            "itens": [
                {"produto_id": "P003", "quantidade": 9999}
            ]
        }
        response = self.client.post("/api/pedidos", json=payload)
        assert response.status_code == 422
```

**Ferramentas:**

- Postman com AI para geração de testes
- Insomnia com análise de schemas
- Schemathesis para property-based testing

### Testes de Contrato (Contract Testing)

**Definição:** Verifica se comunicação entre serviços obedece a contratos
definidos.

**Na Era dos LLMs:**

- Geração automática de contratos a partir de código
- Validação semântica de payloads
- Detecção de breaking changes

## 3.5 Teste de Sistema (System Testing)

### Definição

Teste de sistema avalia o sistema completo como um todo, verificando requisitos
funcionais e não-funcionais em um ambiente que simula produção.

**Aspectos Testados:**

- Funcionalidade completa
- Performance sob carga
- Segurança end-to-end
- Recuperação de falhas
- Compatibilidade
- Usabilidade

### Na Era dos LLMs

**Exploração Autônoma de Aplicações:**

Sistemas de IA podem explorar aplicações como usuários humanos:

- Navegam interfaces automaticamente
- Identificam fluxos de usuário complexos
- Geram testes de sistema abrangentes

**Exemplo de Geração Autônoma:**

```gherkin
# Cenários de teste gerados por IA após explorar app
Feature: Checkout de E-commerce

  Scenario: Fluxo completo de compra
    Given usuário está logado
    And usuário tem produtos no carrinho
    When usuário inicia checkout
    And preenche endereço de entrega
    And seleciona forma de pagamento
    And confirma pedido
    Then pedido é criado com sucesso
    And estoque é atualizado
    And email de confirmação é enviado

  Scenario: Checkout com cupom de desconto
    Given usuário tem cupom válido
    When aplica cupom no checkout
    Then desconto é calculado corretamente
    And valor final reflete desconto
```

**Testes End-to-End Inteligentes:**

- Self-healing de seletores
- Adaptação a mudanças na UI
- Validação visual com IA

### Tipos de Teste de Sistema

**Funcional:**

- Verifica requisitos funcionais
- Casos de uso completos
- Fluxos de negócio

**Não-Funcional:**

- Performance
- Segurança
- Usabilidade
- Confiabilidade

## 3.6 Teste de Aceitação (Acceptance Testing)

### Definição

Teste de aceitação verifica se o sistema atende aos critérios de aceitação
definidos pelo cliente ou usuário, determinando se o software está pronto para
implantação.

**Objetivos:**

- Validar entregáveis contra requisitos
- Garantir satisfação do cliente
- Obter aprovação formal para release
- Identificar discrepâncias antes da produção

### Tipos de Teste de Aceitação

**1. User Acceptance Testing (UAT):**

- Executado por usuários finais
- Cenários reais de negócio
- Validação de usabilidade

**2. Business Acceptance Testing (BAT):**

- Validado pelo negócio
- Alinhamento com objetivos estratégicos
- ROI e valor entregue

**3. Contract Acceptance Testing:**

- Baseado em contratos
- SLAs e requisitos legais
- Conformidade com termos

**4. Regulation Acceptance Testing:**

- Conformidade regulatória
- Requisitos de compliance
- Auditabilidade

**5. Alpha/Beta Testing:**

- Testes em ambiente real
- Feedback de usuários reais
- Identificação de problemas de campo

### Na Era dos LLMs

**Geração Automática de Critérios de Aceitação:**

A partir de User Stories, LLMs geram cenários BDD:

```gherkin
# User Story
# Como cliente, quero buscar produtos por nome
# Para encontrar rapidamente o que preciso

# Cenários gerados automaticamente
Feature: Busca de Produtos

  Scenario: Busca por nome exato
    Given produto "iPhone 15" existe no catálogo
    When usuário busca por "iPhone 15"
    Then produto é exibido nos resultados

  Scenario: Busca parcial
    When usuário busca por "iPhone"
    Then todos os modelos iPhone são exibidos

  Scenario: Busca sem resultados
    When usuário busca por "xyz123"
    Then mensagem "nenhum produto encontrado" é exibida
    And sugestões são mostradas
```

**BDD com IA:**

- Geração de Gherkin a partir de requisitos
- Sugestão de cenários de borda
- Tradução entre linguagem técnica e de negócio

## 3.7 Shift Left Extremo

### Conceito

Shift Left refere-se à prática de mover atividades de teste para fases iniciais
do ciclo de desenvolvimento.

**Na Era dos LLMs:**

- Testes durante design de requisitos
- Validação contínua em tempo real
- Geração de código com testes embutidos

### Implementação

**Fase de Requisitos:**

- IA analisa consistência de requisitos
- Identificação de ambiguidades
- Sugestão de critérios de aceitação

**Fase de Design:**

- Validação de arquitetura para testabilidade
- Identificação de dependências críticas
- Simulação de cenários

**Fase de Desenvolvimento:**

- Geração automática de testes unitários
- Feedback contínuo de qualidade
- Análise de impacto de mudanças

## 3.8 Responsabilidades em Cada Nível

### Distribuição Tradicional

| Nível      | Principal Responsável | Suporte       |
| ---------- | --------------------- | ------------- |
| Unidade    | Desenvolvedor         | QA (revisão)  |
| Integração | Desenvolvedor/QA      | DevOps        |
| Sistema    | QA                    | Desenvolvedor |
| Aceitação  | Usuário/Negócio       | QA            |

### Distribuição na Era dos LLMs

| Nível      | Principal Responsável   | IA Atua Como               |
| ---------- | ----------------------- | -------------------------- |
| Unidade    | Desenvolvedor (curador) | Gerador de testes          |
| Integração | Desenvolvedor/QA        | Analisador de dependências |
| Sistema    | QA (estrategista)       | Executor autônomo          |
| Aceitação  | Usuário/Negócio         | Tradutor de requisitos     |

## 3.9 Planejamento de Estratégia Multi-Nível

### Abordagem Integrada

Uma estratégia efetiva de teste considera todos os níveis:

1. **Definir Responsabilidades Claras:**

   - Quem cria e mantém cada nível
   - Critérios de entrada e saída
   - Automação e manual

2. **Estabelecer Cobertura Adequada:**

   - Pirâmide de teste balanceada
   - Priorização baseada em risco
   - Automação inteligente

3. **Integrar em CI/CD:**

   - Execução automática por nível
   - Gates de qualidade por ambiente
   - Feedback rápido

### Métricas por Nível

| Nível      | Métricas Principais                    |
| ---------- | -------------------------------------- |
| Unidade    | Cobertura de código, tempo de execução |
| Integração | Taxa de falhas de contrato, latência   |
| Sistema    | Defect escape rate, performance        |
| Aceitação  | Taxa de aprovação, satisfação          |

## 3.10 Resumo

Os níveis de teste fornecem uma estrutura para organizar atividades de qualidade
ao longo do ciclo de desenvolvimento. Na era dos LLMs, cada nível é transformado
por automação inteligente:

- **Unidade:** Geração automática de testes
- **Integração:** Análise inteligente de dependências
- **Sistema:** Exploração autônoma de aplicações
- **Aceitação:** Tradução automática de requisitos

O engenheiro de teste evolui de executor para estrategista, curando testes
gerados por IA e focando em qualidade holística.

## Referências

1. Fowler, M. (2012). *Test Pyramid*. MartinFowler.com. Disponível em:
   <https://martinfowler.com/articles/practical-test-pyramid.html>
2. Cohn, M. (2009). *Succeeding with Agile: Software Development Using Scrum*.
   Addison-Wesley. ISBN: 978-0321579364
3. Freeman, S., & Pryce, N. (2009). *Growing Object-Oriented Software, Guided by
   Tests*. Addison-Wesley. ISBN: 978-0321503628
4. GeeksforGeeks (2025). *Levels of Software Testing*. Disponível em:
   <https://www.geeksforgeeks.org/levels-of-software-testing/>

______________________________________________________________________

*Seção anterior: [2. Fundamentos](02-fundamentos.md) | Próxima seção:
[4. Técnicas de Teste](04-tecnicas-de-teste.md)*

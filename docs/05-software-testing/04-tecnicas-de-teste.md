---
title: Técnicas de Teste
created_at: 2025-02-07
tags: [software-testing, tecnicas, black-box, white-box, grey-box, test-design]
status: published
updated_at: 2025-02-07
ai_model: book-writer
---

# 4. Técnicas de Teste

## 4.1 Visão Geral

Técnicas de teste são métodos sistemáticos para selecionar e criar casos de
teste. Elas garantem que testes sejam eficientes, eficazes e forneçam cobertura
adequada do software. A escolha da técnica correta depende do contexto, tipo de
sistema, criticidade e recursos disponíveis.

Na era dos LLMs, técnicas tradicionais são automatizadas, ampliadas ou
transformadas por capacidades de análise semântica, geração inteligente e
priorização baseada em risco.

## 4.2 Black Box Testing (Teste de Caixa Preta)

### Definição

Teste de caixa preta avalia funcionalidade sem conhecimento da estrutura interna
do código. Foca em entradas, saídas esperadas e comportamento do sistema da
perspectiva do usuário.

**Características:**

- Independente de implementação
- Foco em requisitos funcionais
- Baseado em especificações
- Não requer conhecimento de código

### Técnicas de Caixa Preta

#### 4.2.1 Equivalence Partitioning (Particionamento de Equivalência)

**Conceito:** Divide entradas em classes equivalentes onde cada membro da classe
deve ser tratado da mesma forma pelo sistema.

**Benefício:** Reduz número de casos de teste mantendo cobertura.

**Exemplo:**

```
Sistema: Validar idade para cadastro (18-120 anos)

Classes de equivalência:
- Válida: 18-120
- Inválida (abaixo): < 18
- Inválida (acima): > 120
- Inválida (tipo): não-numérico

Casos de teste (um por classe):
- 25 (válida)
- 15 (inválida - abaixo)
- 150 (inválida - acima)
- "abc" (inválida - tipo)
```

**Na Era dos LLMs:**

- IA identifica automaticamente partições
- Análise de requisitos para detectar classes
- Geração de casos de borda

#### 4.2.2 Boundary Value Analysis (Análise de Valores Limite)

**Conceito:** Testa valores nos limites das partições, onde defeitos são mais
propensos a ocorrer.

**Regra:** Testa valores mínimo-1, mínimo, máximo, máximo+1.

**Exemplo:**

```
Range válido: 1-100

Valores de teste:
- 0 (min-1) → Inválido
- 1 (min) → Válido
- 100 (max) → Válido
- 101 (max+1) → Inválido
```

**Na Era dos LLMs:**

- Identificação automática de limites
- Geração de casos de borda complexos
- Análise de múltiplas variáveis interdependentes

#### 4.2.3 Decision Table Testing (Tabela de Decisões)

**Conceito:** Representa lógica complexa de negócio em tabela com condições
(regras) e ações (resultados).

**Exemplo - Desconto em Compra:**

| Condição               | R1  | R2  | R3  | R4  |
| ---------------------- | --- | --- | --- | --- |
| Cliente VIP            | S   | S   | N   | N   |
| Valor > 1000           | S   | N   | S   | N   |
| **Ação: Desconto 20%** | X   |     |     |     |
| **Ação: Desconto 10%** |     | X   | X   |     |
| **Ação: Sem desconto** |     |     |     | X   |

**Na Era dos LLMs:**

- Geração automática de tabelas a partir de regras de negócio
- Identificação de combinações faltantes
- Otimização de tabelas redundantes

#### 4.2.4 State Transition Testing (Teste de Transição de Estado)

**Conceito:** Testa comportamento de sistemas que mudam de estado baseado em
eventos ou condições.

**Exemplo - Pedido:**

```
[Novo] --pagar--> [Pago] --enviar--> [Enviado] --entregar--> [Entregue]
                    |
                    --cancelar--> [Cancelado]
```

**Casos de Teste:**

1. Novo → Pago → Enviado → Entregue (caminho feliz)
2. Novo → Pago → Cancelado (cancelamento)
3. Novo → Pago → Enviado → Cancelado (tentativa inválida)

**Na Era dos LLMs:**

- Geração automática de diagramas de estado
- Identificação de transições não documentadas
- Teste de caminhos inválidos

#### 4.2.5 Use Case Testing (Teste Baseado em Casos de Uso)

**Conceito:** Deriva casos de teste a partir de casos de uso documentados,
cobrindo fluxos principais e alternativos.

**Estrutura:**

- Fluxo principal (happy path)
- Fluxos alternativos (cenários alternativos)
- Fluxos de exceção (tratamento de erro)

**Na Era dos LLMs:**

- Geração de casos de teste a partir de documentação
- Identificação de cenários de borda
- Completude de cobertura de fluxos

### Automação com LLMs

Ferramentas como ACCELQ e BlinqIO usam LLMs para:

- Analisar requisitos em linguagem natural
- Gerar partições de equivalência automaticamente
- Identificar valores de borda
- Criar tabelas de decisão

## 4.3 White Box Testing (Teste de Caixa Branca)

### Definição

Teste de caixa branca avalia estrutura interna, lógica e código do software.
Requer conhecimento da implementação para projetar casos de teste.

**Características:**

- Baseado em código-fonte
- Foco em caminhos e lógica
- Mensurável através de cobertura
- Requer conhecimento técnico

### Técnicas de Caixa Branca

#### 4.3.1 Statement Coverage (Cobertura de Instruções)

**Conceito:** Garante que cada instrução do código seja executada pelo menos uma
vez.

**Métrica:** (Número de instruções executadas / Total de instruções) × 100

**Exemplo:**

```python
def calcular_bonus(salario, tempo_casa):
    bonus = 0                    # Instrução 1
    if tempo_casa > 5:          # Instrução 2
        bonus = salario * 0.1    # Instrução 3
    return bonus                 # Instrução 4

# Caso de teste: calcular_bonus(1000, 3)
# Cobertura: 3/4 = 75%
```

**Na Era dos LLMs:**

- Análise automática de instruções não cobertas
- Sugestão de dados de entrada para aumentar cobertura

#### 4.3.2 Branch Coverage (Cobertura de Ramificações)

**Conceito:** Garante que cada ramificação (if/else, switch) seja executada pelo
menos uma vez.

**Métrica:** (Ramificações executadas / Total de ramificações) × 100

**Exemplo:**

```python
def aprovar_emprestimo(renda, score):
    if renda > 5000:           # Branch 1: True/False
        if score > 700:        # Branch 2: True/False
            return True
    return False

# Casos necessários:
# 1. renda > 5000 e score > 700 (Branch 1: T, Branch 2: T)
# 2. renda > 5000 e score <= 700 (Branch 1: T, Branch 2: F)
# 3. renda <= 5000 (Branch 1: F)
```

**Na Era dos LLMs:**

- Identificação automática de branches não cobertos
- Geração de casos para caminhos específicos

#### 4.3.3 Path Coverage (Cobertura de Caminhos)

**Conceito:** Garante que cada caminho possível através do código seja
executado.

**Desafio:** Cresce exponencialmente com loops e condições aninhadas.

**Na Era dos LLMs:**

- Análise de caminhos viáveis vs inviáveis
- Priorização de caminhos por risco
- Geração inteligente para caminhos críticos

#### 4.3.4 Condition Coverage (Cobertura de Condições)

**Conceito:** Cada condição booleana individual é avaliada como verdadeira e
falsa.

**Exemplo:**

```python
if (a > 0 and b < 10) or c == 5:
    # Condições: a>0, b<10, c==5
    # Precisa: a>0=T, a>0=F, b<10=T, b<10=F, c==5=T, c==5=F
```

#### 4.3.5 MC/DC (Modified Condition/Decision Coverage)

**Conceito:** Cada condição deve afetar independentemente o resultado da
decisão.

**Requisito para software crítico (aviônica, médico).**

**Na Era dos LLMs:**

- Geração de casos para atender MC/DC
- Verificação de independência de condições

### Análise Automática de Cobertura com IA

**Ferramentas:**

- JaCoCo, Cobertura, Coverage.py (tradicionais)
- Com IA: análise preditiva de gaps, sugestão de testes

**Benefícios da IA:**

- Identificação de código não testável
- Sugestão de refatoração para testabilidade
- Predição de risco em código não coberto

## 4.4 Grey Box Testing (Teste de Caixa Cinza)

### Definição

Teste de caixa cinza combina elementos de caixa preta e caixa branca. O testador
tem conhecimento parcial da estrutura interna, tipicamente documentação de
design e arquitetura, mas não acesso completo ao código.

**Características:**

- Acesso a documentação de design
- Conhecimento de arquitetura
- Acesso limitado a código
- Foco em integração e fluxo de dados

### Casos de Uso

**1. Testes de Integração:**

- Conhecimento de interfaces
- Teste de fluxo de dados entre sistemas
- Validação de contratos

**2. Testes de API:**

- Acesso a documentação OpenAPI
- Teste de endpoints e payloads
- Validação de schemas

**3. Testes de Banco de Dados:**

- Conhecimento de schema
- Teste de integridade de dados
- Validação de transações

**4. Testes de Segurança:**

- Conhecimento de arquitetura
- Identificação de vetores de ataque
- Testes de penetração focados

### Na Era dos LLMs

**Geração de Testes de API:**

```python
# Documentação OpenAPI analisada por IA
paths:
  /api/usuarios:
    post:
      summary: Criar usuário
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                nome: { type: string, minLength: 3 }
                email: { type: string, format: email }
                idade: { type: integer, minimum: 18 }

# Testes gerados automaticamente
def test_criar_usuario_valido():
    response = client.post('/api/usuarios', json={
        'nome': 'João Silva',
        'email': 'joao@email.com',
        'idade': 25
    })
    assert response.status_code == 201

def test_criar_usuario_nome_curto():
    response = client.post('/api/usuarios', json={
        'nome': 'Jo',
        'email': 'joao@email.com',
        'idade': 25
    })
    assert response.status_code == 422

def test_criar_usuario_menor_idade():
    response = client.post('/api/usuarios', json={
        'nome': 'João Silva',
        'email': 'joao@email.com',
        'idade': 16
    })
    assert response.status_code == 422
```

## 4.5 Seleção de Técnica Baseada em Risco

### Framework de Decisão

| Contexto                    | Técnica Recomendada         | Justificativa                  |
| --------------------------- | --------------------------- | ------------------------------ |
| Lógica complexa de negócio  | Decision Table              | Mapeia regras explicitamente   |
| Muitas condições de entrada | Equivalence Partitioning    | Reduz casos mantendo cobertura |
| Valores numéricos ou ranges | Boundary Value Analysis     | Encontra defeitos em limites   |
| Sistemas stateful           | State Transition            | Modela comportamento dinâmico  |
| Alto risco, código crítico  | White Box + MC/DC           | Máxima cobertura estrutural    |
| APIs e integrações          | Grey Box + Contract Testing | Valida interfaces              |
| Fluxos de usuário           | Use Case Testing            | Alinhado com requisitos        |

### Na Era dos LLMs

**Seleção Inteligente:**

- IA analisa características do sistema
- Sugere técnicas baseadas em similaridade
- Adapta seleção baseada em histórico de eficácia

## 4.6 Técnicas que LLMs Fazem Melhor vs Humanos

### Onde LLMs Excedem

**1. Análise de Combinatória:**

- Identificação de todas as combinações possíveis
- Priorização por risco
- Geração de dados de teste

**2. Cobertura Exaustiva:**

- Análise sistemática de código
- Identificação de caminhos não cobertos
- Geração massiva de casos

**3. Documentação para Testes:**

- Geração de casos de teste a partir de requisitos
- Criação de BDD/Gherkin
- Documentação de cenários

### Onde Humanos Excedem

**1. Intuição de Negócio:**

- Identificação de cenários críticos implícitos
- Compreensão de contexto organizacional
- Priorização baseada em valor

**2. Criatividade Exploratória:**

- Testes fora do script
- Pensamento "fora da caixa"
- Identificação de cenários inesperados

**3. Julgamento de Qualidade:**

- Avaliação de usabilidade
- Validação de experiência do usuário
- Critérios subjetivos de qualidade

## 4.7 Design de Casos de Teste Efetivos

### Critérios de Qualidade

**Bons casos de teste são:**

- **Rastreáveis:** Ligados a requisitos
- **Repetíveis:** Produzem mesmo resultado
- **Independentes:** Não dependem de outros testes
- **Auto-verificáveis:** Têm critérios claros de pass/fail
- **Manuteníveis:** Fáceis de atualizar

### Template de Caso de Teste

```
ID: TC-001
Título: Validar login com credenciais válidas
Pré-condições: Usuário cadastrado no sistema
Dados de Entrada:
  - Usuário: usuario@teste.com
  - Senha: Senha123!
Passos:
  1. Acessar página de login
  2. Preencher campo usuário
  3. Preencher campo senha
  4. Clicar em "Entrar"
Resultado Esperado: Redirecionamento para dashboard
Pós-condições: Sessão iniciada
Prioridade: Alta
Rastreabilidade: REQ-001
```

### Na Era dos LLMs

**Geração Estruturada:**

- LLMs geram casos completos a partir de requisitos
- Incluem casos positivos, negativos e de borda
- Mantêm consistência de formato

**Revisão Human-in-the-Loop:**

- Validação de adequação ao negócio
- Refinamento de critérios
- Priorização baseada em contexto

## 4.8 Resumo

Técnicas de teste fornecem métodos sistemáticos para criar casos de teste
eficientes e eficazes. Na era dos LLMs:

- **Caixa Preta:** Automatização de análise de requisitos e geração de casos
- **Caixa Branca:** Análise inteligente de cobertura e sugestão de testes
- **Caixa Cinza:** Geração automática de testes de API e integração

A seleção de técnica deve ser baseada em risco, contexto e criticidade. A
combinação de automação inteligente com julgamento humano resulta em estratégias
de teste mais robustas.

## Referências

1. Copeland, L. (2003). *A Practitioner's Guide to Software Test Design*. Artech
   House. ISBN: 978-1580537919
2. Beizer, B. (1990). *Software Testing Techniques*. 2nd ed. Van Nostrand
   Reinhold. ISBN: 978-0442203723
3. TestDevLab (2025). *White Box vs Black Box vs Grey Box Testing*. Disponível
   em:
   <https://www.testdevlab.com/blog/white-box-vs-black-box-vs-grey-box-testing>
4. ACCELQ (2025). *Black Box vs White Box vs Grey Box Testing Explained*.
   Disponível em:
   <https://www.accelq.com/blog/black-box-vs-white-box-vs-grey-box-testing/>

______________________________________________________________________

*Seção anterior: [3. Níveis de Teste](03-niveis-de-teste.md) | Próxima seção:
[5. Tipos de Teste](05-tipos-de-teste.md)*

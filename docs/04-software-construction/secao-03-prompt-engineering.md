---
title: Prompt Engineering e Context-Driven Development
created_at: 2025-02-07
tags: [swebok, software-construction, prompt-engineering, context-driven-development, llm]
status: published
updated_at: 2025-02-07
ai_model: k2p5
agent: book-writer
---

# Prompt Engineering e Context-Driven Development

O desenvolvimento de software na era dos Large Language Models (LLMs) exige uma
nova competência fundamental: a capacidade de comunicar intenções de forma
precisa através de prompts bem estruturados. Se o código tornou-se commodity, a
habilidade de especificar contexto e requisitos tornou-se o diferencial
competitivo. Esta seção detalha as técnicas de engenharia de prompt e o
paradigma do Context-Driven Development, estabelecendo práticas essenciais para
desenvolvedores que trabalham com assistentes de IA.

A transição do desenvolvimento tradicional para o desenvolvimento assistido por
IA não se resume à adoção de novas ferramentas. Representa uma mudança
fundamental na forma como os desenvolvedores se relacionam com o processo de
criação de software: de escritores de código para curadores de contexto, de
implementadores diretos para especificadores de intenção.

______________________________________________________________________

## 1. Fundamentos de Prompt Engineering

### 1.1 Definição e Escopo

**Prompt Engineering** (engenharia de prompt) é a disciplina de criar instruções
textuais estruturadas que guiam modelos de linguagem a produzir saídas
desejadas. No contexto da construção de software, isso transcende a simples
formulação de perguntas: envolve a especificação precisa de requisitos,
restrições, contextos e formatos de saída esperados.

A eficácia de um prompt depende de três fatores fundamentais:

1. **Clareza da intenção**: O modelo deve compreender exatamente o que se espera
2. **Contextualização adequada**: Informações relevantes devem ser fornecidas
   sem excesso de ruído
3. **Especificação do formato**: A estrutura da saída deve ser definida
   explicitamente

### 1.2 Elementos Estruturais de Prompts Efetivos

Prompts eficazes para geração de código compartilham uma estrutura comum que
maximiza a probabilidade de obter resultados adequados:

#### 1.2.1 Definição do Papel (Role)

Atribuir um papel específico ao modelo ajuda a estabelecer o nível de expertise
e o tipo de considerações que devem ser aplicadas:

```
Você é um desenvolvedor sênior especializado em arquitetura de microsserviços
com experiência em Go e princípios de clean architecture.
```

Este elemento orienta o modelo a adotar padrões, estilos e preocupações típicas
de um profissional experiente na área especificada.

#### 1.2.2 Contexto e Background

Fornecer informações suficientes sobre o sistema, restrições existentes e
decisões arquiteturais já tomadas:

```
Estamos trabalhando em um sistema de processamento de pagamentos que já utiliza
o padrão Saga para orquestração de transações distribuídas. O serviço atual
processa aproximadamente 10.000 transações por dia e precisa manter
consistência eventual entre os microsserviços de pedido, pagamento e notificação.
```

#### 1.2.3 Instrução Principal

A especificação clara e direta do que deve ser feito:

```
Implemente uma função que processe o callback de confirmação de pagamento
de um gateway externo, garantindo idempotência e registro adequado de logs
de auditoria.
```

#### 1.2.4 Restrições e Requisitos

Limitações obrigatórias que devem ser respeitadas:

```
Requisitos:
- A função deve ser idempotente (mesmo callback processado múltiplas vezes
  não deve gerar duplicidades)
- Tempo máximo de execução: 5 segundos
- Deve utilizar o padrão Repository já existente no projeto
- Incluir tratamento de erros específico para timeout do gateway
- Seguir as convenções de nomenclatura do projeto (camelCase para variáveis)
```

#### 1.2.5 Formato de Saída Esperado

Especificação de como o código ou resposta deve ser estruturado:

```
Forneça:
1. A assinatura da função com tipos
2. Implementação completa com comentários explicativos
3. Três casos de teste unitários usando pytest
4. Explicação das decisões de design tomadas
```

### 1.3 Iteração e Refinamento

A engenharia de prompt é raramente um processo de tentativa única. O ciclo de
iteração envolve:

1. **Prompt inicial**: Especificação inicial do requisito
2. **Avaliação da saída**: Análise crítica do código gerado
3. **Feedback direcionado**: Identificação específica de problemas ou omissões
4. **Refinamento**: Ajuste do prompt com base no feedback
5. **Repetição**: Novo ciclo até atingir qualidade adequada

**Exemplo de iteração:**

*Prompt inicial:*

```
Crie uma função para validar email em Python.
```

*Saída inicial:*

```python
def validar_email(email):
    if "@" in email:
        return True
    return False
```

*Feedback de refinamento:*

```
A validação precisa ser mais robusta. Adicione:
- Validação de formato RFC 5322 simplificado
- Verificação de domínio (deve ter pelo menos um ponto)
- Verificação de comprimento máximo (254 caracteres)
- Tratamento de casos nulos ou vazios
- Retorno estruturado com indicação do erro específico
```

*Saída refinada:*

```python
import re
from typing import Optional, Tuple

def validar_email(email: Optional[str]) -> Tuple[bool, Optional[str]]:
    """
    Valida formato de endereço de email.

    Returns:
        Tuple[bool, Optional[str]]: (é_valido, mensagem_erro)
    """
    if not email:
        return False, "Email não pode ser vazio"

    if len(email) > 254:
        return False, "Email excede comprimento máximo de 254 caracteres"

    # Padrão RFC 5322 simplificado
    padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if not re.match(padrao, email):
        return False, "Formato de email inválido"

    return True, None
```

### 1.4 Técnicas Avançadas de Prompting

#### 1.4.1 Chain-of-Thought (Cadeia de Raciocínio)

Técnica que solicita ao modelo que exponha seu raciocínio passo a passo antes de
fornecer a solução final. Particularmente útil para problemas complexos de
algoritmos ou design:

```
Antes de escrever o código, explique passo a passo:
1. Quais estruturas de dados seriam mais eficientes para este problema
2. Qual a complexidade temporal e espacial de cada abordagem
3. Por que você escolheu a abordagem específica
4. Quais casos extremos (edge cases) precisam ser tratados

Depois da análise, forneça a implementação.
```

#### 1.4.2 Few-Shot Learning (Aprendizado por Exemplos)

Fornecer exemplos de entrada e saída desejada para calibrar o modelo:

````
Aqui estão exemplos do padrão de código que seguimos no projeto:

Exemplo 1:
Input: Criar função para calcular desconto
Output:
```python
def calcular_desconto(valor: Decimal, percentual: Decimal) -> Decimal:
    """Calcula valor com desconto aplicado."""
    if percentual < 0 or percentual > 100:
        raise ValueError("Percentual deve estar entre 0 e 100")
    return valor * (1 - percentual / 100)
````

Exemplo 2: [...]

Agora, seguindo o mesmo padrão, crie uma função para calcular juros compostos.

```

#### 1.4.3 Self-Consistency (Autoconsistência)

Solicitar múltiplas soluções e selecionar a mais consistente ou solicitar que o modelo avalie sua própria solução:

```

Gere três implementações diferentes para este problema de ordenação. Depois,
analise cada uma considerando:

- Complexidade temporal
- Uso de memória
- Clareza do código
- Facilidade de manutenção

Recomende a melhor opção com justificativa.

```

______________________________________________________________________

## 2. Padrões de Prompts para Código

### 2.1 Taxonomia de Padrões

Diferentes cenários de desenvolvimento demandam estruturas de prompt específicas. A seguir, apresentamos padrões estabelecidos para categorias comuns de tarefas.

#### 2.1.1 Geração de Novo Código

Para casos de implementação a partir de especificações:

```

CONTEXTO: [Descrição do sistema, arquitetura existente, padrões adotados]

REQUISITO: [Descrição clara da funcionalidade a ser implementada]

RESTRIÇÕES:

- [Lista de requisitos não-funcionais]
- [Padrões obrigatórios]
- [Dependências a serem utilizadas]

SAÍDA ESPERADA: [Definição do formato: código, testes, documentação, etc.]

```

#### 2.1.2 Refatoração e Modernização

Para melhoria de código existente:

```

CONTEXTO ATUAL: [Descrição do código legado, tecnologias utilizadas]

OBJETIVO DE REFATORAÇÃO: \[O que se busca alcançar: performance, legibilidade,
remoção de débito técnico\]

CÓDIGO ATUAL: `[código a ser refatorado]`

RESTRIÇÕES:

- Manter comportamento observável idêntico
- [Outras restrições específicas]

SAÍDA:

- Código refatorado
- Lista de mudanças realizadas
- Justificativa para cada alteração significativa

```

#### 2.1.3 Debugging e Diagnóstico

Para análise e correção de problemas:

```

SINTOMAS OBSERVADOS: [Descrição do comportamento incorreto ou erro]

CONTEXTO:

- Ambiente: [produção, staging, desenvolvimento]
- Tecnologias: [stack utilizado]
- Frequência: [sempre, intermitente, condição específica]

CÓDIGO RELEVANTE: `[código onde ocorre o problema]`

LOGS/STACK TRACE:

```
[mensagens de erro ou logs relevantes]
```

ANÁLISE SOLICITADA:

1. Identifique possíveis causas raiz
2. Sugira abordagens de diagnóstico
3. Proponha correções priorizadas por probabilidade

```

#### 2.1.4 Code Review Assistido

Para avaliação de código antes de merge:

```

PULL REQUEST:

- Branch: [origem] → [destino]
- Contexto: [descrição da mudança]

CÓDIGO ALTERADO:

```diff
[diff do PR]
```

DIRETRIZES DO PROJETO:

- [Padrões de código]
- [Requisitos de teste]
- [Preocupações de segurança específicas]

ANÁLISE SOLICITADA:

- Problemas de lógica ou bugs potenciais
- Violações de padrões do projeto
- Oportunidades de simplificação
- Questões de segurança
- Cobertura de testes adequada

```

### 2.2 Design Patterns como Prompts

Padrões de design estabelecidos podem ser expressos como instruções estruturadas:

#### 2.2.1 Padrão Strategy (Estratégia)

```

Implemente o padrão Strategy para [contexto específico].

Requisitos:

- Defina uma interface comum para todas as estratégias
- Crie implementações concretas para cada algoritmo/variação:
- O contexto deve receber a estratégia via injeção de dependência
- Permita troca de estratégia em runtime

Inclua:

- Interface da estratégia
- Duas implementações concretas
- Classe de contexto
- Exemplo de uso

```

#### 2.2.2 Padrão Observer

```

Implemente o padrão Observer para notificação de [evento específico].

Componentes:

- Subject: [descrição do observable]
- Observers: [lista de listeners esperados]

Requisitos:

- Suporte a múltiplos observers
- Thread-safety (se aplicável)
- Possibilidade de desregistro
- Tratamento de exceções em observers (não devem afetar outros listeners)

```

### 2.3 Balanceamento entre Especificidade e Criatividade

Um dos desafios da engenharia de prompt é encontrar o equilíbrio adequado entre:

**Especificidade excessiva:**
- Risco: limitar soluções potencialmente melhores
- Sintoma: prompts com instruções prescritivas demais sobre "como" implementar

**Especificidade insuficiente:**
- Risco: código genérico que não se encaixa no contexto
- Sintoma: saídas que ignoram restrições importantes do projeto

**Abordagem recomendada:**

1. **Defina o "quê" com precisão**: O que o código deve fazer, critérios de sucesso
2. **Defina o "como" parcialmente**: Restrições arquiteturais obrigatórias, padrões que devem ser seguidos
3. **Deixe espaço para o "como" criativo**: Permita que o modelo proponha soluções para detalhes de implementação

Exemplo de equilíbrio:

```

Implemente um mecanismo de cache para resultados de consultas ao banco.

O QUE (preciso):

- Cache deve armazenar resultados de queries frequentes
- TTL configurável por tipo de query
- Invalidação seletiva quando dados são modificados

COMO PARCIAL (restrições):

- Use Redis como backend de cache
- A interface deve ser compatível com nosso Repository Pattern existente
- Respeite o formato de logging já estabelecido no projeto

COMO CRIATIVO (deixo para você decidir):

- Estratégia de serialização dos dados
- Lógica de hash das queries
- Estratégia de fallback se Redis indisponível

```

______________________________________________________________________

## 3. Context-Driven Development

### 3.1 Definição do Paradigma

**Context-Driven Development** (desenvolvimento orientado ao contexto) é uma abordagem onde o desenvolvimento de software é guiado pela riqueza e precisão do contexto fornecido, em vez de especificações rígidas de implementação. Este paradigma reconhece que, na era dos LLMs, a qualidade do contexto determina a qualidade do código gerado.

Este conceito foi articulado por Martin Fowler e a comunidade de engenharia de software como uma evolução natural da observação de que "o código tornou-se commodity; o contexto tornou-se capital".

### 3.2 Princípios Fundamentais

#### 3.2.1 Contexto como Especificação

Em vez de documentos de requisitos extensos, o contexto torna-se a especificação viva:

- Código existente define padrões e convenções
- Histórico de commits revela decisões arquiteturais
- Documentação próxima ao código (READMEs, ADRs) fornece racional
- Conversas e decisões documentadas preservam intenção

#### 3.2.2 Multi-threading de Contexto

Ferramentas modernas como Cursor introduziram o conceito de "multi-threading de contexto" através de mecanismos como @-mentions. Isso permite que o desenvolvedor referencie simultaneamente:

- Arquivos específicos do projeto
- Símbolos (funções, classes, variáveis)
- Documentação externa
- Conversas anteriores
- Documentação de APIs

**Exemplo prático no Cursor:**
```

@file:src/auth/service.ts @file:src/config/database.ts Implemente uma função de
autenticação que valide credenciais contra o banco de dados seguindo o padrão do
service existente.

```

#### 3.2.3 Contexto Incremental

O desenvolvimento ocorre através de refinamento progressivo do contexto:

1. **Contexto inicial**: Visão geral do problema
2. **Contexto ampliado**: Detalhes arquiteturais e restrições
3. **Contexto operacional**: Código existente similar, padrões
4. **Contexto de validação**: Testes, critérios de aceitação

### 3.3 Práticas de Context-Driven Development

#### 3.3.1 Análise de Dependências e Arquitetura

Antes de solicitar implementação, o desenvolvedor deve mapear:

```

MAPEAMENTO DE CONTEXTO ARQUITETURAL:

Dependências Upstream:

- [Serviços que chamam este componente]
- [APIs consumidas]
- [Eventos que dispara]

Dependências Downstream:

- [Serviços chamados]
- [Bases de dados acessadas]
- [Eventos consumidos]

Padrões Arquiteturais:

- [Padrão de comunicação: REST, gRPC, eventos]
- [Estratégia de persistência]
- [Padrão de tratamento de erros]

Restrições Técnicas:

- [Timeouts configurados]
- [Limites de rate]
- [Requisitos de consistência]

```

#### 3.3.2 Contexto de Código Legado

Para trabalhar com bases de código existentes:

```

CONTEXTO DO SISTEMA:

- Idade do código: [X anos]
- Tecnologias principais: [stack]
- Estado atual: [verde, amarelo, vermelho]
- Débito técnico conhecido: [áreas problemáticas]

CONTEXTO ESPECÍFICO DA MUDANÇA:

- Módulos afetados: [lista]
- Código de referência: [arquivos similares bem implementados]
- Código a evitar: [arquivos com débito técnico]
- Testes existentes: [padrão de cobertura]

````

#### 3.3.3 Preservação de Decisões

Documentar decisões de design no momento da criação para enriquecer contexto futuro:

```markdown
## Decisão: Implementação de Cache Distribuído

**Contexto:**
[Descrição da situação que levou à necessidade]

**Decisão:**
[O que foi decidido]

**Alternativas Consideradas:**
- [Alternativa A]: [por que rejeitada]
- [Alternativa B]: [por que rejeitada]

**Consequências:**
- Positivas: [benefícios]
- Negativas: [trade-offs]

**Referências:**
- [Links para documentação, RFCs, discussões]
````

### 3.4 Ferramentas de Gerenciamento de Contexto

#### 3.4.1 Cursor: Multi-threading Nativo

O Cursor implementa gerenciamento de contexto através de:

- **@-mentions**: Referência direta a arquivos, símbolos, documentação
- **Contexto de código**: Análise automática de dependências
- **Histórico de chat**: Persistência de conversas por workspace
- **Composer**: Interface para orquestrar múltiplas referências

**Padrão de uso:**

```
@README.md @src/config/ @tests/unit/auth/

Preciso adicionar uma nova configuração de autenticação OAuth2.
Baseie-se no padrão existente em auth/ e siga as convenções
documentadas no README.
```

#### 3.4.2 Claude Code: Contexto Modular

O Claude Code utiliza:

- **Arquivos de contexto**: `.claude/context.md` para instruções persistentes
- **Ferramentas de busca**: Integração com grep, find para localizar contexto
- **Histórico de sessão**: Memória das interações na sessão atual

#### 3.4.3 GitHub Copilot: Contexto Implícito

O Copilot utiliza contexto de forma mais implícita:

- **Arquivos abertos**: Janelas visíveis no IDE
- **Código circundante**: Linhas próximas ao cursor
- **Histórico recente**: Edições recentes no arquivo
- **Chat explícito**: No modo chat, permite referência a arquivos

______________________________________________________________________

## 4. Estratégias de Contexto: RAG e Memória

### 4.1 Retrieval-Augmented Generation (RAG)

**RAG** (Geração Aumentada por Recuperação) é uma técnica onde o contexto é
dinamicamente recuperado de uma base de conhecimento e injetado no prompt. No
desenvolvimento de software, isso permite:

- Recuperar documentação relevante automaticamente
- Localizar exemplos de código similares
- Obter definições de APIs e bibliotecas
- Recuperar decisões arquiteturais anteriores

#### 4.1.1 Implementação de RAG para Desenvolvimento

**Componentes:**

1. **Base de Conhecimento Indexada:**

   - Código fonte do projeto (embeddings de funções/classes)
   - Documentação técnica
   - ADRs (Architecture Decision Records)
   - Histórico de PRs e code reviews

2. **Mecanismo de Recuperação:**

   - Vetorização de queries do desenvolvedor
   - Busca por similaridade semântica
   - Ranqueamento de relevância
   - Seleção dos top-k documentos mais relevantes

3. **Integração no Prompt:**

   ```
   CONTEXTO RECUPERADO AUTOMATICAMENTE:

   [Documento 1 - Relevância: 0.92]
   [Conteúdo relevante recuperado da base]

   [Documento 2 - Relevância: 0.87]
   [Conteúdo relevante recuperado da base]

   ---

   QUERY DO DESENVOLVEDOR:
   [Pergunta original]
   ```

#### 4.1.2 Ferramentas de RAG para Código

- **Sourcegraph Cody**: Indexação de repositórios com RAG integrado
- **Continue.dev**: Extensão IDE com recuperação de contexto
- **LangChain + Vector DBs**: Implementações customizadas

### 4.2 Sistemas de Memória

Para projetos de longa duração, sistemas de memória preservam contexto entre
sessões:

#### 4.2.1 Tipos de Memória

**Memória de Curto Prazo (Sessão):**

- Histórico de conversa na sessão atual
- Decisões tomadas durante a sessão
- Código gerado na interação corrente

**Memória de Longo Prazo (Projeto):**

- `.cursorrules` ou `.claude/context.md`
- Documentação de arquitetura
- Padrões estabelecidos
- Decisões de design documentadas

**Memória de Longo Prazo (Organização):**

- Standards corporativos
- Guidelines de segurança
- Templates de projeto
- Catálogos de padrões

#### 4.2.2 Arquivos de Contexto Persistente

**Exemplo de `.cursorrules`:**

```yaml
# Contexto Persistente para Cursor

project:
  name: "Sistema de Pagamentos"
  architecture: "Microsserviços"
  primary_language: "Go"

standards:
  code_style: "Effective Go + golangci-lint"
  testing: "Tabela de testes com testify"
  documentation: "GoDoc + ADRs"

patterns:
  - name: "Repository"
    description: "Abstração de persistência"
    example: "internal/repository/"

  - name: "Service"
    description: "Lógica de negócio"
    example: "internal/service/"

constraints:
  - "Todas as funções exportadas devem ter testes"
  - "Erros devem usar pkg/errors com stack trace"
  - "Contexto deve ser propagado em todas as chamadas"
```

**Exemplo de `.claude/context.md`:**

```markdown
# Contexto do Projeto - Sistema de Pagamentos

## Arquitetura
- Microsserviços comunicando via gRPC
- PostgreSQL para persistência
- Redis para cache
- RabbitMQ para eventos

## Padrões de Código Go
- Usar `internal/` para código privado
- Interfaces definidas no consumidor (Go way)
- Tratamento de erros com `fmt.Errorf("contexto: %w", err)`
- Logs estruturados com zap

## Decisões Importantes
- Não usar ORM; usar SQLc para queries tipadas
- Circuit breaker em todas as chamadas externas
- Idempotência obrigatória em handlers de eventos

## Áreas Sensíveis
- `internal/payment/`: Regras de negócio complexas, revisar com cuidado
- `pkg/security/`: Código de segurança, mudanças precisam de aprovação de segurança
```

### 4.3 Construção Progressiva de Contexto

#### 4.3.1 Workflow de Desenvolvimento com Contexto

**Fase 1: Exploração**

```
Quais são os principais componentes do sistema de autenticação?
[Modelo analisa codebase e responde]
```

**Fase 2: Especificação**

```
Baseado na análise anterior, preciso adicionar suporte a MFA.
O componente auth-service parece ser o relevante.
Mostre-me a estrutura atual desse serviço.
```

**Fase 3: Implementação**

```
@auth-service/main.go @auth-service/handlers.go

Adicione endpoint para ativação de MFA TOTP seguindo o padrão
dos handlers existentes. O endpoint deve:
- Gerar secret TOTP
- Retornar QR code para configuração
- Salvar estado pendente no banco
```

**Fase 4: Validação**

```
Agora gere testes de integração para o fluxo de MFA,
considerando os padrões de teste em @tests/integration/
```

______________________________________________________________________

## 5. Anti-padrões e Armadilhas

### 5.1 Anti-padrões de Prompt

#### 5.1.1 Prompts Vagos ou Genéricos

**Problema:** Solicitações sem contexto suficiente produzem código genérico.

**Exemplo problemático:**

```
Crie uma API REST.
```

**Problemas resultantes:**

- Framework arbitrário escolhido pelo modelo
- Padrões que não condizem com o projeto
- Ausência de tratamento de erros adequado
- Estrutura de dados inapropriada

**Solução:** Sempre forneça contexto mínimo (stack, padrões, requisitos).

#### 5.1.2 Over-engineering por Especificação Excessiva

**Problema:** Especificar demais limita soluções elegantes e leva a código
desnecessariamente complexo.

**Exemplo problemático:**

```
Crie uma função que receba uma lista de inteiros,
percorra cada elemento usando um loop for com índice,
verifique se é par usando módulo 2 igual a zero,
acumule em uma variável local inicializada em zero,
e retorne a soma.
```

**Problemas resultantes:**

- Implementação prescritiva em vez de declarativa
- Perda de oportunidades de otimização
- Código verboso desnecessariamente

**Solução:** Especifique o "quê", não o "como".

#### 5.1.3 Contexto Insuficiente sobre Restrições

**Problema:** Falha em comunicar restrições críticas (segurança, performance,
compliance).

**Exemplo problemático:**

```
Crie uma função para processar dados de usuários.
```

**Problemas resultantes:**

- Ausência de sanitização de entrada
- Logging inadequado de dados sensíveis
- Violação de regulamentações (GDPR, LGPD)

**Solução:** Inclua seção explícita de restrições e compliance.

#### 5.1.4 Prompts sem Formato de Saída Definido

**Problema:** Ausência de especificação do formato esperado leva a
inconsistências.

**Exemplo problemático:**

```
Implemente autenticação JWT.
```

**Problemas resultantes:**

- Às vezes retorna apenas assinatura da função
- Às vezes inclui implementação completa
- Ausência de testes ou presença inconsistente
- Documentação em formatos variados

**Solução:** Sempre especifique o formato de saída desejado.

### 5.2 Armadilhas do Context-Driven Development

#### 5.2.1 Confiança Excessiva no Contexto Recuperado

**Problema:** RAG pode recuperar informações desatualdas ou parcialmente
corretas.

**Cenário:**

- Modelo recupera documentação de API v1
- Implementação usa endpoints obsoletos
- Falha em produção

**Mitigação:**

- Validar data das fontes recuperadas
- Verificar versão da documentação
- Testar implementações geradas

#### 5.2.2 Context Bloat (Inchaço de Contexto)

**Problema:** Inclusão de contexto irrelevante ou excessivo reduz a qualidade
das respostas.

**Sintomas:**

- Prompts com milhares de tokens de contexto
- Respostas genéricas devido a ambiguidade
- Custo elevado de tokens

**Mitigação:**

- Selecionar apenas contexto verdadeiramente relevante
- Usar resumo de contexto quando apropriado
- Iterar com contexto incremental

#### 5.2.3 Falácia da Memória Perfeita

**Problema:** Assumir que arquivos de contexto persistente estão sempre
atualizados.

**Cenário:**

- `.cursorrules` define padrão antigo
- Código gerado segue padrão obsoleto
- Inconsistência com evolução do projeto

**Mitigação:**

- Revisar periodicamente arquivos de contexto
- Versionar arquivos de regras junto com o código
- Automatizar verificação de conformidade

#### 5.2.4 Dependência de Contexto Implícito

**Problema:** Ferramentas como Copilot usam contexto implícito (arquivos
abertos) que pode ser insuficiente.

**Cenário:**

- Desenvolvedor esquece de abrir arquivo com padrões
- Código gerado não segue convenções do projeto
- Review posterior identifica inconsistências

**Mitigação:**

- Explicitar contexto mesmo quando usando ferramentas com RAG implícito
- Verificar quais arquivos estão sendo considerados
- Usar mecanismos explícitos de @-mention quando disponíveis

### 5.3 Checklist de Prevenção

Antes de submeter um prompt ou iniciar uma sessão de desenvolvimento assistido:

**Preparação de Contexto:**

- [ ] Identifiquei os arquivos e padrões relevantes
- [ ] Verifiquei se arquivos de regras (.cursorrules, context.md) estão
  atualizados
- [ ] Localizei exemplos de código similar bem implementado
- [ ] Mapeei dependências upstream e downstream

**Estrutura do Prompt:**

- [ ] Defini claramente o papel esperado do modelo
- [ ] Especifiquei requisitos funcionais e não-funcionais
- [ ] Liste restrições e constraints
- [ ] Defini formato de saída esperado

**Validação Planejada:**

- [ ] Identifiquei como validar o código gerado
- [ ] Preparei casos de teste ou critérios de aceitação
- [ ] Verifiquei se há requisitos de compliance ou segurança relevantes

______________________________________________________________________

## 6. Pontos-Chave

- **Prompt Engineering é uma competência essencial**: A habilidade de
  especificar intenções de forma precisa determina a qualidade do código gerado
  por LLMs

- **Estrutura importa**: Prompts eficazes incluem definição de papel, contexto,
  instrução principal, restrições e formato de saída

- **Iteração é inevitável**: O desenvolvimento assistido por IA envolve ciclos
  de refinamento; prompts perfeitos de primeira são exceção

- **Contexto é capital**: No Context-Driven Development, a riqueza e precisão do
  contexto fornecido são mais valiosas que especificações rígidas

- **Multi-threading de contexto**: Ferramentas modernas permitem referenciar
  múltiplas fontes de contexto simultaneamente (@-mentions, arquivos de regras)

- **RAG amplifica capacidade**: Retrieval-Augmented Generation permite recuperar
  contexto automaticamente de bases de conhecimento do projeto

- **Memória persistente**: Arquivos de contexto (.cursorrules,
  .claude/context.md) preservam padrões e decisões entre sessões

- **Anti-padrões são comuns**: Vagueza, especificação excessiva, contexto
  insuficiente e ausência de formato de saída são erros frequentes

- **Validação humana permanece crítica**: Código gerado por IA deve sempre ser
  revisado, testado e validado antes de ir para produção

- **Equilíbrio especificidade vs. criatividade**: Especifique o "quê" com
  precisão, o "como" parcialmente, permitindo soluções criativas para detalhes
  de implementação

______________________________________________________________________

## Referências

01. Martin Fowler. *Context Engineering for Coding Agents*. 2024.
    <https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html>

02. LangChain Blog. *The rise of "context engineering"*. 2024.
    <https://blog.langchain.com/the-rise-of-context-engineering>

03. Anthropic. *Claude Code Documentation*. <https://code.claude.com/docs>

04. Cursor. *Cursor Documentation - Context and @ symbols*.
    <https://docs.cursor.com/context/>

05. GitHub. *GitHub Copilot Documentation*. <https://docs.github.com/en/copilot>

06. OpenAI. *Prompt Engineering Guide*.
    <https://platform.openai.com/docs/guides/prompt-engineering>

07. Google Cloud. *Best practices for prompt engineering*.
    <https://cloud.google.com/blog/topics/generative-ai/best-practices-for-prompt-engineering>

08. Wei, J., et al. *Chain-of-Thought Prompting Elicits Reasoning in Large
    Language Models*. NeurIPS 2022.

09. Lewis, P., et al. *Retrieval-Augmented Generation for Knowledge-Intensive
    NLP Tasks*. NeurIPS 2020.

10. IEEE Computer Society. *SWEBOK Guide V3.0 - Chapter 3: Software
    Construction*. 2014.

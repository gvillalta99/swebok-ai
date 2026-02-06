---
title: Princípios de Design para Código Gerado
created_at: '2025-01-31'
tags: [software-design, solid, principios, codigo-gerado, manutenibilidade]
status: published
updated_at: '2025-01-31'
ai_model: gpt-4o
---

# Princípios de Design para Código Gerado

Os princípios clássicos de engenharia de software (SOLID, DRY, KISS) foram
criados em um contexto onde digitar código era lento e leitura era a forma
primária de manutenção. Quando o código é gerado por máquinas, algumas
prioridades se invertem.

Nesta seção, adaptamos os princípios fundamentais para a realidade do
desenvolvimento assistido por IA.

## 1. Design for Disposability (Design para Descartabilidade)

No passado, código era um ativo de longo prazo. Hoje, código gerado deve ser
tratado como **inventário perecível**.

Se um componente é complexo demais para ser entendido, ele não deve ser
refatorado; deve ser apagado e regerado com um prompt melhor e requisitos mais
claros.

**O Princípio:** Projete componentes pequenos e desacoplados o suficiente para
que o custo de deletar e regerar seja menor que o custo de entender e consertar.

## 2. SOLID na Era da IA

Como os princípios SOLID se aplicam quando a IA escreve a implementação?

### S - Single Responsibility Principle (SRP)

**Novo foco:** Um componente (ou agente) deve ter apenas uma missão cognitiva.
Se você pede para um LLM "analisar o texto, extrair datas E formatar o JSON", a
chance de alucinação aumenta exponencialmente. Quebre em três passos. O SRP
agora é sobre **Carga Cognitiva do Modelo**.

### O - Open/Closed Principle

**Novo foco:** Aberto para extensão via *Contexto*, fechado para modificação via
*Prompt*. Em vez de editar o prompt base (que é frágil), projete o sistema para
injetar novas regras ou ferramentas via contexto dinâmico (RAG/Tools) sem
alterar a instrução core.

### L - Liskov Substitution Principle

**Novo foco:** Intercambiabilidade de Modelos. O design não deve depender das
idiossincrasias de um modelo específico (ex: GPT-4). Se o sistema quebra quando
você troca para Claude 3 ou Llama 3, o princípio foi violado. Projete para o
"mínimo denominador comum" ou use camadas de abstração.

### I - Interface Segregation Principle

**Novo foco:** Interfaces estreitas para Agentes. Não dê a um agente acesso a
toda a API do seu sistema. Crie interfaces específicas (Tools) com o mínimo de
privilégio necessário. Se o agente só precisa consultar saldo, não dê a
ferramenta `database_execute_query`.

### D - Dependency Inversion Principle

**Novo foco:** Dependa de Schemas, não de Prompts. O contrato entre componentes
deve ser um Schema rígido (Pydantic/Zod). O prompt é um detalhe de implementação
volátil. O sistema depende da estrutura de dados acordada, não de como o texto
foi gerado.

## 3. Prompt as Specification (PaS)

Em muitos casos, o prompt *é* o design de baixo nível.

- **Legibilidade:** O prompt deve ser legível por humanos e versionado no Git.
- **Imutabilidade:** Trate prompts como código compilado. Não concatene strings
  magicamente no meio do código da aplicação.
- **Testabilidade:** Cada prompt deve ter um conjunto de casos de teste (evals)
  associados.

## 4. O Princípio da Verificabilidade (Verifiability First)

Nunca aceite código gerado que não venha acompanhado de uma forma de verificar
sua correção automaticamente.

> **Regra de Ouro:** Se a IA gera a implementação, ela deve ser obrigada a gerar
> também os testes unitários. Se os testes não passarem, o código nem chega ao
> humano.

O design do sistema deve impor essa barreira. O pipeline de CI/CD deve rejeitar
commits de código gerado sem cobertura de teste correspondente.

## Armadilhas Comuns (Anti-Patterns)

- **The God Prompt:** Um único prompt gigante tentando fazer todo o design da
  aplicação. Isso é o equivalente ao "God Object" da OOP. É inmanutenível e não
  determinístico.
- **Comentários Mentirosos:** A IA adora gerar comentários que explicam o que o
  código *deveria* fazer, não o que ele *faz*. O design deve priorizar código
  auto-explicativo e ignorar comentários gerados.
- **Dependência Oculta de "Vibe":** Construir sistemas que dependem do "jeito"
  que o modelo escreve (ex: parsing de texto livre com regex). Isso quebrará na
  próxima atualização do modelo. Use chamadas de função estruturadas (Function
  Calling).

## Exemplo Prático: Refatoração de um "God Prompt"

**Antes (Ruim):**

```python
response = gpt.generate("""
Analise o log de erro abaixo, identifique a causa raiz, sugira uma correção em Python
e explique o porquê. O log é: {log}
""")
# O sistema tenta fazer regex na saída para pegar o código. Frágil.
```

**Depois (Design Sólido):**

1. **Agente 1 (Analista):** Input: Log. Output: JSON { root_cause, severity }.
2. **Agente 2 (Engenheiro):** Input: root_cause. Output: Código Python (apenas).
3. **Validador:** Executa o código em sandbox ou roda linter.
4. **Agente 3 (Redator):** Input: Código + Causa. Output: Explicação para o
   usuário.

Cada passo é isolado, testável e segue o SRP.

## Resumo Executivo

- **Código é passivo, o Design é ativo:** Use princípios para controlar a
  entropia gerada pela IA.
- **SRP é sobre Cognição:** Divida tarefas para reduzir a chance de alucinação.
- **Schemas são a Lei:** O único contrato válido é a estrutura de dados tipada;
  texto livre é ruído.
- **Descartabilidade:** O código gerado deve ser fácil de jogar fora.

## Próximos Passos

- Explorar **Padrões de Design para Sistemas Híbridos** (Próxima seção) para ver
  como montar arquiteturas com esses princípios.
- Implementar **Testes de Mutação** para verificar a robustez dos testes gerados
  pela IA (KA 05).

## Ver tambem

- [KA 02 - Arquitetura de Sistemas Hibridos](../02-software-architecture/index.md)
- [KA 04 - Orquestracao e Curadoria de Codigo](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

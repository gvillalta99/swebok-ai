---
title: Model-Driven Development com LLMs
created_at: '2025-01-31'
tags: [mdd, ia-generativa, especificacao, prompts, prototipagem]
status: in-progress
updated_at: '2025-02-04'
ai_model: vertex-ai-gemini-1.5-pro
---

# Model-Driven Development com LLMs

## Contexto

O sonho do Model-Driven Development (MDD) sempre foi gerar software funcional a
partir de modelos abstratos de alto nível, reduzindo a necessidade de
codificação manual. Historicamente, isso exigia ferramentas UML complexas e
rígidas que falhavam em capturar a nuance dos requisitos reais.

Com a chegada dos LLMs, o MDD renasce como **Generative Software Engineering**.
A "especificação" deixa de ser um diagrama estático e torna-se um prompt
estruturado ou um documento de requisitos em linguagem natural (ou linguagem de
domínio específica) que o LLM "compila" em código executável. Neste novo
paradigma, **a especificação É a geração**.

## O Novo Paradigma: Specification as Generation

Em vez de transformar modelos manualmente em código, o engenheiro foca na
criação de especificações ricas e inequívocas que servem como *input* direto
para motores de geração.

### O Ciclo de Especificação Executável

1. **Modelagem de Intenção:** O engenheiro descreve o domínio, as entidades e as
   regras de negócio em linguagem natural estruturada ou pseudocódigo.
2. **Compilação Probabilística:** O LLM interpreta o modelo e gera a
   implementação completa (banco de dados, API, frontend).
3. **Avaliação de Conformidade:** O sistema gerado é comparado contra a intenção
   original via testes e inspeção.
4. **Refinamento do Modelo:** Se há erro, o engenheiro *não corrige o código
   gerado*; ele corrige a especificação (o prompt/modelo) e regenera.

### Prompt-Driven Development (PDD)

Uma metodologia emergente onde o prompt é o artefato primário de
desenvolvimento.

- **Prompts como Código-Fonte:** Prompts são versionados, modulares e
  reutilizáveis.
- **Prompt Chaining:** Decomposição de sistemas complexos em cadeias de prompts
  (ex: um prompt gera o esquema do banco, o próximo gera a API baseada nesse
  esquema).
- **Iteração Rápida:** O ciclo de feedback encurta de horas para segundos.

## Protótipos Evolutivos e Geração Iterativa

A abordagem de "Big Design Up Front" dá lugar à prototipagem evolutiva
acelerada.

- **Do Rascunho à Produção:** Começa-se com uma especificação vaga para gerar um
  protótipo funcional em minutos.
- **Refinamento Contínuo:** O feedback dos stakeholders sobre o protótipo é
  incorporado à especificação, gerando versões sucessivamente mais precisas.
- **Curadoria Incremental:** A cada iteração, partes do código gerado são
  "congeladas" e validadas, enquanto outras continuam sendo regeneradas.

## Checklist Prático

1. [ ] **Tratar Prompts como Modelos:** Armazene seus prompts em arquivos
   (`.md`, `.yaml`) no repositório, não em janelas de chat efêmeras.
2. [ ] **Definir Linguagem de Domínio (DSL):** Crie um padrão para descrever
   seus requisitos que o LLM entenda bem (ex: formato de User Stories rigoroso
   ou Gherkin).
3. [ ] **Pipeline de Regeneração:** Tenha scripts que permitem apagar o código
   gerado e recriá-lo do zero a partir das specs/prompts. Isso garante que a
   spec continua sendo a fonte da verdade.
4. [ ] **Focar no "O Quê", não no "Como":** Seus prompts devem descrever regras
   de negócio e interfaces, não detalhes de implementação de loops e variáveis.
5. [ ] **Validar a Consistência:** Use ferramentas para verificar se a
   especificação (prompt) não contém contradições lógicas antes de gerar.

## Armadilhas Comuns

- **Drift da Especificação:** Corrigir bugs diretamente no código gerado
  (`output`) e esquecer de atualizar o prompt (`source`). Na próxima
  regeneração, o bug volta.
- **Ambiguidade na Modelagem:** Usar linguagem natural vaga ("faça o sistema
  rápido") em vez de restrições precisas ("latência < 200ms").
- **Dependência de "Sorte":** O prompt funciona hoje, mas amanhã, com uma
  atualização do modelo de IA, gera código quebrado. Prompts devem ser robustos
  e testados.
- **Complexidade Oculta:** O modelo gera um sistema monstruoso e complexo a
  partir de uma spec simples, criando um pesadelo de manutenção.

## Exemplo Mínimo: API a partir de Schema

**Cenário:** Criar uma API CRUD para um sistema de gestão de tarefas.

**Abordagem MDD com LLM:**

1. **Modelo (Spec):** Arquivo `tasks.yaml` definindo entidades e regras.

   ```yaml
   Entity: Task
   Fields:
     - title: string (max 100 chars)
     - status: enum [todo, doing, done]
     - due_date: date (future only)
   Rules:
     - Can only move to 'done' if 'assignee' is set.
   ```

2. **Geração:** Script roda prompt: "Gere uma API FastAPI completa com testes
   baseada neste `tasks.yaml`. Use Pydantic para validação."

3. **Resultado:** O LLM gera `main.py`, `models.py`, `tests.py`.

4. **Mudança:** Cliente pede novo status 'archived'.

5. **Ação:** Engenheiro edita `tasks.yaml` e roda o script de geração novamente.
   O código é atualizado consistentemente.

## Resumo Executivo

- **Spec é Código:** A especificação de alto nível torna-se o artefato
  principal; o código é um artefato derivado (build artifact).
- **Correção na Fonte:** Bugs devem ser corrigidos no prompt/modelo, não no
  código gerado.
- **Iteração Acelerada:** O custo de pivotar ou refazer partes do sistema cai
  drasticamente.
- **Rigor na Definição:** A qualidade do software gerado é limitada apenas pela
  precisão da sua capacidade de especificar o problema.

## Próximos Passos

- Estudar **01 - Fundamentos** para entender como a geração se encaixa no ciclo
  de vida maior.
- Ler **Capítulo 04 (Construção)** para detalhes sobre curadoria de código
  gerado.
- Experimentar frameworks de agentes que suportam fluxos de geração estruturada
  (ex: LangChain, CrewAI).

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação | Justificativa                                                                                               |
| :------------------------------ | :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Média** | As técnicas de *prompting* evoluem rápido, mas o princípio de "modelagem de intenção" é duradouro.          |
| **Custo de Verificação**        | **Médio** | Requer validação constante para garantir que a geração segue a spec, mas testes automatizados ajudam muito. |
| **Responsabilidade Legal**      | **Média** | A responsabilidade recai sobre quem escreveu a especificação e validou o resultado final.                   |

## Ver tambem

- [KA 06 - Operacoes de Engenharia](../06-software-engineering-operations/index.md)
- [KA 08 - Gestao de Configuracao](../08-software-configuration-management/index.md)
- [KA 09 - Gestao de Engenharia](../09-software-engineering-management/index.md)

## Referências

1. **Pesquisa Acadêmica**. *Generative Software Engineering: From Specification
   to Working Software*. arXiv, 2025.
2. **Engenharia de Software**. *Executable Specifications: Using LLMs to Bridge
   Specification and Implementation*. 2025.
3. **Pesquisa Industrial**. *Prompt-Driven Development: A New Software
   Development Methodology*. 2024.

---
title: Design de Interfaces e Contratos
created_at: '2025-01-31'
tags: [software-design, api-design, contratos, json-schema, prompt-engineering]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Design de Interfaces e Contratos

Em sistemas modernos, a interface mais crítica não é apenas a API REST entre
microserviços, mas também o contrato entre componentes determinísticos e modelos
probabilísticos.

Quando essa interface é tratada como texto livre, o sistema torna-se frágil.
Engenharia de software robusta exige contratos estruturados, validação explícita
e tratamento de falhas.

## Prompts como APIs (Function Calling)

A maior evolução recente foi a capacidade dos modelos de emitir chamadas de
função estruturadas (Tool Use / Function Calling) em vez de apenas texto.

O design deve tratar o LLM como um cliente que chama sua API interna.

**Padrão de Design:**

1. Defina uma interface (Schema) que descreve exatamente o que você aceita.
2. Force o modelo a preencher esse Schema.
3. Valide o preenchimento antes de executar.

### Exemplo: Extração de Entidades

**Abordagem Frágil (Texto):**

> Prompt: "Extraia o nome e data do texto. Responda no formato Nome: [nome],
> Data: [data]"

**Abordagem Robusta (Schema):**

```python
class EventExtraction(BaseModel):
    event_name: str = Field(..., description="Nome do evento principal")
    event_date: datetime = Field(..., description="Data no formato ISO8601")
    confidence_score: float = Field(..., ge=0, le=1)
```

Ao passar esse schema para o modelo, você transforma linguagem natural em um
objeto tipado que o resto do seu sistema (Java, C#, Python) pode consumir com
segurança.

## Desenvolvimento orientado a schema (Schema-First)

Antes de escrever o prompt, defina o schema de saída. Essa prática força a
explicitação dos dados realmente necessários e reduz ambiguidade.

**Regras para Schemas de LLM:**

1. **Descrições são Instruções:** O campo `description` no JSON Schema não é
   documentação para humanos, é instrução para a IA. Use-o para desambiguar (ex:
   "Data da compra, não data da entrega").
2. **Enums reduzem ambiguidade:** Restrinja campos textuais a conjuntos finitos
   de opções sempre que possível.
3. **Nulabilidade explícita:** Declare quando `null` é permitido. Sem isso, o
   modelo tende a preencher lacunas com valores inferidos.

## Tolerância a Falhas na Interface

Mesmo com Schemas, o modelo pode falhar (truncar JSON, errar tipo). O design da
interface deve ser defensivo.

### O Padrão "Reparação Estrutural"

Implemente uma camada de middleware que tenta consertar JSONs quebrados antes de
lançar erro.

- Bibliotecas como `json_repair` podem recuperar JSONs malformados (por exemplo,
  delimitadores ausentes).
- **Correção com retry orientado por erro:** se a validação (ex.: Pydantic)
  falhar, devolva ao modelo o erro de validação e solicite nova emissão
  estruturada.

## Contratos de Contexto (Context Window Management)

A interface de entrada também precisa de design. Você não pode jogar 1 milhão de
tokens no prompt e esperar sucesso.

- **Orçamento de Tokens:** Defina limites rígidos para cada seção do prompt (ex:
  40% para documentos RAG, 20% para histórico, 10% para instruções).
- **Truncamento Inteligente:** Projete a lógica de truncamento. Se o histórico
  for longo, descarte as mensagens do meio, mantenha o início (system prompt) e
  o fim (última pergunta).

## Armadilhas Comuns

- **Tipagem Fraca:** Usar `dict` ou `map` genéricos. Use classes/structs
  definidos.
- **JSON mode vs Structured Outputs:** JSON mode tende a assegurar JSON
  sintaticamente válido, mas não conformidade completa com um schema específico.
  Para contratos estritos, prefira Structured Outputs/Function Calling com
  schema explícito e validação no consumidor.
- **Instruções Conflitantes:** O Schema diz "campo obrigatório", o Prompt diz
  "opcional". O modelo fica confuso. Mantenha a fonte da verdade no Schema.

## Resumo Executivo

- **Schema primeiro:** Defina a saída com tipos e restrições antes da engenharia
  de prompts.
- **Descrições orientam geração:** Campos bem descritos reduzem ambiguidades
  semânticas.
- **Recuperação controlada:** Tente reparar falhas estruturais com validação e
  retry antes de descartar respostas.
- **Restrições explícitas:** Enums e nulabilidade explícita reduzem alucinações
  de formato e conteúdo.

## Próximos Passos

- Ver como testar esses contratos na seção **Design para Verificabilidade**.
- Aplicar esses conceitos na construção de **AI Gateways** (visto na seção 03).

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. OpenAI. *Structured Outputs*. Disponível em:
   <https://platform.openai.com/docs/guides/structured-outputs>. Acesso em:
   2026-02-06.
2. OpenAI Help Center. *Function Calling in the OpenAI API*. Atualizado em 2025.
   Disponível em:
   <https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api>.
   Acesso em: 2026-02-06.
3. JSON Schema Organization. *JSON Schema Specification (Draft 2020-12)*.
   Disponível em: <https://json-schema.org/specification>. Acesso em:
   2026-02-06.
4. Bray, T. (Ed.). *RFC 8259: The JavaScript Object Notation (JSON) Data
   Interchange Format*. IETF, 2017. Disponível em:
   <https://www.rfc-editor.org/rfc/rfc8259>. Acesso em: 2026-02-06.
5. Pydantic. *Models*. Disponível em:
   <https://docs.pydantic.dev/latest/concepts/models/>. Acesso em: 2026-02-06.
6. PyPI. *json-repair*. Disponível em: <https://pypi.org/project/json-repair/>.
   Acesso em: 2026-02-06.

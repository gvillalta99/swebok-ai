---
title: Design de Interfaces e Contratos
created_at: '2025-01-31'
tags: [software-design, api-design, contratos, json-schema, prompt-engineering]
status: published
updated_at: '2025-01-31'
ai_model: gpt-4o
---

# Design de Interfaces e Contratos

A interface mais crítica em sistemas modernos não é mais a REST API entre microserviços, mas o contrato "fuzzy" entre o código determinístico e o modelo probabilístico.

Se essa interface for baseada em "chat" (strings soltas), seu sistema será frágil. Engenharia de software robusta exige contratos tipados.

## Prompts como APIs (Function Calling)

A maior evolução recente foi a capacidade dos modelos de emitir chamadas de função estruturadas (Tool Use / Function Calling) em vez de apenas texto.

O design deve tratar o LLM como um cliente que chama sua API interna.

**Padrão de Design:**
1. Defina uma interface (Schema) que descreve exatamente o que você aceita.
2. Force o modelo a preencher esse Schema.
3. Valide o preenchimento antes de executar.

### Exemplo: Extração de Entidades

**Abordagem Frágil (Texto):**
> Prompt: "Extraia o nome e data do texto. Responda no formato Nome: [nome], Data: [data]"

**Abordagem Robusta (Schema):**
```python
class EventExtraction(BaseModel):
    event_name: str = Field(..., description="Nome do evento principal")
    event_date: datetime = Field(..., description="Data no formato ISO8601")
    confidence_score: float = Field(..., ge=0, le=1)
```

Ao passar esse schema para o modelo, você transforma linguagem natural em um objeto tipado que o resto do seu sistema (Java, C#, Python) pode consumir com segurança.

## Schema First Development

Antes de escrever o prompt, escreva o Schema de saída.
Isso força você a pensar nos dados que realmente precisa.

**Regras para Schemas de LLM:**
1. **Descrições são Instruções:** O campo `description` no JSON Schema não é documentação para humanos, é instrução para a IA. Use-o para desambiguar (ex: "Data da compra, não data da entrega").
2. **Enums são Poderosos:** Restrinja campos de texto a um conjunto finito de opções (Enum) sempre que possível. Isso elimina alucinações de valores inválidos.
3. **Nullable Explicitamente:** Diga à IA quando é aceitável retornar `null` se ela não encontrar a informação. Caso contrário, ela inventará um valor.

## Tolerância a Falhas na Interface

Mesmo com Schemas, o modelo pode falhar (truncar JSON, errar tipo). O design da interface deve ser defensivo.

### O Padrão "Reparação Estrutural"

Implemente uma camada de middleware que tenta consertar JSONs quebrados antes de lançar erro.
- Bibliotecas como `json_repair` podem salvar JSONs com vírgulas faltando.
- **Self-Correction:** Se a validação do Pydantic falhar, capture o erro e reenvie ao modelo: "Você gerou este JSON inválido com o erro X. Corrija e reenvie." (Funciona em 80% dos casos).

## Contratos de Contexto (Context Window Management)

A interface de entrada também precisa de design. Você não pode jogar 1 milhão de tokens no prompt e esperar sucesso.

- **Orçamento de Tokens:** Defina limites rígidos para cada seção do prompt (ex: 40% para documentos RAG, 20% para histórico, 10% para instruções).
- **Truncamento Inteligente:** Projete a lógica de truncamento. Se o histórico for longo, descarte as mensagens do meio, mantenha o início (system prompt) e o fim (última pergunta).

## Armadilhas Comuns

- **Tipagem Fraca:** Usar `dict` ou `map` genéricos. Use classes/structs definidos.
- **Json Mode vs Function Calling:** `Json Mode` garante JSON válido, mas não garante o Schema. Prefira `Function Calling` ou `Structured Outputs` (feature nativa de modelos novos) que garantem o Schema.
- **Instruções Conflitantes:** O Schema diz "campo obrigatório", o Prompt diz "opcional". O modelo fica confuso. Mantenha a fonte da verdade no Schema.

## Resumo Executivo

- **Schema é Rei:** Defina a saída desejada com tipos estritos antes de começar.
- **Descrições Valem Ouro:** Documente seus campos para a IA, não para o programador.
- **Repare, não Descarte:** Tente corrigir erros de sintaxe automaticamente.
- **Defina Enums:** Reduza o espaço de busca do modelo restringindo opções.

## Próximos Passos

- Ver como testar esses contratos na seção **Design para Verificabilidade**.
- Aplicar esses conceitos na construção de **AI Gateways** (visto na seção 03).

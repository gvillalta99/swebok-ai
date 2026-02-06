---
title: Design para Verificabilidade
created_at: '2025-01-31'
tags: [software-design, testes, verificabilidade, tdd, eval]
status: published
updated_at: '2025-01-31'
ai_model: gpt-4o
---

# Design para Verificabilidade

Em engenharia de software tradicional, testamos para provar a presença de lógica. Com LLMs, testamos para provar a ausência de alucinação.

O "Design para Verificabilidade" exige que o sistema seja construído de tal forma que suas saídas possam ser validadas automaticamente ou auditadas humanamente com mínimo esforço. Se você constrói algo que só pode ser validado "sentindo a vibe" da resposta, você não tem software, tem magia.

## O Espectro de Verificação

Projete seus componentes para cair nas categorias de verificação mais baratas:

1.  **Verificação Determinística (Ouro):** O código pode validar a resposta.
    - Ex: LLM gera código SQL -> Código roda `EXPLAIN` no DB para ver se é válido.
    - Ex: LLM gera JSON -> Pydantic valida schema.
2.  **Verificação por Propriedade (Prata):** Não sabemos a resposta exata, mas sabemos propriedades que ela deve ter.
    - Ex: Resumo deve ser menor que o texto original.
    - Ex: Tradução deve preservar os nomes próprios.
3.  **Verificação por Modelo (Bronze):** Outro LLM (Juiz) avalia a resposta.
    - "LLM-as-a-Judge". Útil, mas caro e recursivo.
4.  **Verificação Humana (Madeira):** Um humano lê e aprova.
    - Lento, caro, não escala.

**Objetivo de Design:** Mover o máximo de funcionalidades possível para os níveis 1 e 2.

## Estratégias de Design para Testabilidade

### 1. Separação Raciocínio vs Formatação
Separe o "pensar" do "falar".
É difícil testar um texto longo e educado. É fácil testar uma lista de fatos.

*Design:* Peça ao modelo para gerar primeiro os fatos em JSON (Testável nivel 1), e depois passar para um segundo passo que transforma JSON em texto corrido (Testável nível 3 ou 4). Se o erro estiver nos fatos, o teste pega. Se for no tom, é menos crítico.

### 2. Referência Cruzada (Grounding)
O design deve exigir que o modelo cite fontes.
- Instrução: "Responda a pergunta usando apenas o contexto X e cite o ID da frase usada."
- Verificação: O código verifica se os IDs citados realmente existem e contêm as palavras-chave da resposta.

### 3. Property-Based Testing para Prompts
Em vez de testar "input X gera output Y" (testes rígidos que quebram com variações de texto), teste invarantes.
- "Não importa como o modelo reescreva o email, o tom nunca deve ser classificado como 'agressivo' por um analisador de sentimento."
- "A resposta nunca deve conter URLs que retornem 404."

## Observabilidade Intrínseca

O sistema deve emitir metadados de verificação junto com a resposta.

**Padrão "Show Your Work":**
Não peça apenas a resposta final. Peça o raciocínio (Chain of Thought).
- Design da UI: Mostre a resposta para o usuário, mas guarde o raciocínio no log para auditoria.
- Isso permite depurar *por que* o modelo errou.

## Evals (Avaliações Sistêmicas)

Testes unitários não bastam. Você precisa de um dataset de "Golden Questions" (Evals) que roda a cada deploy.
O design do repositório deve incluir:
- `/prompts`: Seus templates.
- `/evals`: Dataset de inputs + outputs esperados (ou critérios de sucesso).

Se você altera um prompt para melhorar o caso A, deve rodar o eval completo para garantir que não piorou o caso B (Regressão).

## Armadilhas Comuns

- **Testar Texto Exato:** `assert response == "Olá, tudo bem?"`. Isso vai falhar sempre. Use verificação semântica (embedding similarity) ou verificação de substrings chave.
- **Confiar no "Self-Correction" sem Limites:** O modelo diz "Corrigi o erro", mas não corrigiu. Verifique a correção com código, não com o modelo.
- **Métricas de Vaidade:** Medir "Satisfação do Usuário" baseada em likes é bom, mas demora. Você precisa de métricas técnicas (taxa de erro de schema, latência, recusa) que dão feedback imediato.

## Resumo Executivo

- **Automatize ou Morra:** Se a verificação for manual, você não tem CI/CD, tem gargalo.
- **Prefira Estrutura:** Validar JSON é binário (passa/não passa). Validar texto é subjetivo.
- **Chain of Thought:** Obrigue o modelo a explicar o raciocínio para permitir auditoria.
- **Regressão é Real:** Prompts são código. Mudanças exigem bateria de testes completa.

## Próximos Passos

- Implementar pipelines de Evals em **Ferramentas e Técnicas Modernas** (Seção 08).
- Estudar métricas de qualidade específicas para IA no KA 12.

---
title: "05. Design de Interfaces e Contratos em Sistemas Probabilísticos"
created_at: "2025-01-31"
tags: ["software-design", "interfaces", "contratos", "json-schema", "structured-output", "system-prompt"]
status: "review"
updated_at: "2026-02-04"
ai_model: "gemini-3-pro-preview"
---

# Design de Interfaces e Contratos em Sistemas Probabilísticos

## Overview

Em sistemas determinísticos, uma interface (API) é uma promessa rígida: se você enviar `X` (tipo correto), receberá `Y`. Em sistemas probabilísticos baseados em LLMs, essa promessa é fluida. O modelo pode "decidir" responder com um poema em vez de um JSON, ou alucinar campos inexistentes.

O design de interfaces na era da IA não é sobre desenhar telas, mas sobre **impor restrições rígidas sobre um núcleo fluido**. O objetivo é encapsular a incerteza do modelo dentro de fronteiras verificáveis, garantindo que o restante do sistema (o código clássico) nunca seja contaminado por dados não estruturados ou inválidos.

## O Paradigma Shift: Do Pixel ao Prompt

A definição de "interface" expandiu-se radicalmente. Não estamos mais falando apenas de GUI (Graphical User Interface) ou API (Application Programming Interface), mas de **NLI (Natural Language Interface)** mediada por contratos estritos.

| Camada | Era Pré-LLM | Era SWEBOK-AI v5 |
| :--- | :--- | :--- |
| **Entrada** | Cliques, Formulários, JSON tipado | Intenção (Prompt), Contexto (RAG), Imagem/Áudio |
| **Processamento** | Lógica Booleana (If/Else) | Inferência Probabilística (Token Prediction) |
| **Saída** | Dados Estruturados (DB Rows) | Texto, Código, JSON (potencialmente inválido) |
| **Contrato** | OpenAPI / Swagger | **System Prompt + JSON Schema** |
| **Falha Comum** | `TypeError`, `NullPointer` | Alucinação, Recusa de Segurança, Formato Inválido |

## Os Dois Contratos Fundamentais

Para domesticar um LLM em produção, estabelecemos dois níveis de contrato. Se um falha, o sistema quebra.

### 1. O Contrato Humano-IA: System Prompt
Este é o contrato "mole". Ele define a persona, o tom, as restrições comportamentais e as regras de negócio em linguagem natural.
*   **Função:** Alinhamento e Contexto.
*   **Mecanismo:** Engenharia de Prompt.
*   **Fragilidade:** Alta. O modelo pode ignorar instruções se o contexto for muito longo ou se sofrer *prompt injection*.

### 2. O Contrato IA-Código: JSON Schema
Este é o contrato "duro". É a barreira de fogo que protege seu backend. O LLM **não deve** falar diretamente com seu banco de dados ou frontend sem passar por este validador.
*   **Função:** Estruturação e Sanitização.
*   **Mecanismo:** *Structured Output* (OpenAI/Anthropic) ou bibliotecas de coerção (Instructor/Pydantic).
*   **Fragilidade:** Baixa (se bem implementado). Se o JSON não validar, a execução é abortada ou tentada novamente.

## Padrões de Interface

Ao desenhar a interação, escolha o padrão que equilibra controle e flexibilidade:

### A. Chat (Open Loop)
O padrão mais comum e mais arriscado. O usuário conversa livremente.
*   **Uso:** Suporte ao cliente, brainstorming, pesquisa.
*   **Desafio:** O usuário pode levar o modelo para fora do escopo.
*   **Controle:** Baixo. Exige *guardrails* de saída robustos para evitar toxicidade ou vazamento de dados.

### B. Command (Natural Language to Action)
O usuário expressa uma intenção ("Agende uma reunião com o João"), e o sistema converte isso em uma chamada de função determinística.
*   **Uso:** Assistentes virtuais, automação de tarefas.
*   **Mecanismo:** *Tool Calling* / *Function Calling*.
*   **Risco:** O modelo invocar a ferramenta errada ou com parâmetros destrutivos (ex: `DELETE /users`). Requer confirmação humana para ações críticas.

### C. Suggestion (Human-in-the-Loop)
A IA não age; ela propõe. O humano aceita, rejeita ou edita. É o padrão do GitHub Copilot ou corretores gramaticais.
*   **Uso:** Geração de código, redação de documentos.
*   **Segurança:** Máxima. O humano é o filtro final de qualidade e segurança.
*   **UX:** "Ghost text" ou painéis laterais.

## Implementação Técnica: Structured Output

Nunca peça JSON em texto livre. Use modos de saída estruturada garantidos pelo provedor do modelo ou frameworks de validação.

### Exemplo: Extração de Dados com Pydantic

Este padrão garante que seu código Python receba objetos tipados, não strings aleatórias.

```python
from pydantic import BaseModel, Field, ValidationError
from typing import List, Optional
import openai

# 1. Definição do Contrato (Schema)
class ActionItem(BaseModel):
    description: str = Field(..., description="Ação clara e executável")
    assignee: Optional[str] = Field(None, description="Responsável pela tarefa")
    priority: str = Field(..., enum=["high", "medium", "low"])

class MeetingSummary(BaseModel):
    topic: str
    decisions: List[str]
    action_items: List[ActionItem]
    # O modelo é forçado a preencher estes campos

# 2. Execução com Validação (Pseudo-código)
def extract_summary(transcription: str) -> MeetingSummary:
    try:
        completion = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06",
            messages=[
                {"role": "system", "content": "Você é um secretário executivo expert."},
                {"role": "user", "content": transcription},
            ],
            response_format=MeetingSummary, # O Contrato é passado aqui
        )
        
        # O retorno já é uma instância validada da classe MeetingSummary
        return completion.choices[0].message.parsed
        
    except ValidationError as e:
        # Falha de contrato: O modelo gerou algo que não bate com o schema
        log_error(f"Schema violation: {e}")
        # Estratégia de Retry: Enviar o erro de volta ao modelo para ele corrigir
        return retry_with_correction(transcription, error=str(e))
    except Exception as e:
        # Falha de sistema (rede, auth)
        raise e
```

## Tolerância a Falhas na Interface

Interfaces probabilísticas falham. Seu design deve assumir a falha como estado nominal.

1.  **Retry Loop com Feedback:** Se a validação do schema falhar, não apenas tente de novo. Injete a mensagem de erro da validação (ex: "Campo 'priority' deve ser 'high', 'medium' ou 'low', recebeu 'urgente'") de volta no prompt e peça correção.
2.  **Degradação Graciosa:** Se a IA estiver fora do ar ou alucinando, a interface deve reverter para um modo manual ou "burro", não travar a tela branca.
3.  **Confiança e Transparência:** Se o *confidence score* (logprobs) for baixo, a UI deve sinalizar: "A IA acha que é isso, mas verifique".

## Checklist Prático

O que implementar amanhã no seu sistema:

*   [ ] **Schema-First:** Defina os Pydantic/Zod models *antes* de escrever o prompt.
*   [ ] **Strict Mode:** Ative `strict: true` ou equivalente na API do LLM para forçar aderência ao schema.
*   [ ] **Validação de Tipos:** Nunca faça `json.loads()` direto da resposta do LLM sem passar por um validador.
*   [ ] **Sanitização:** Trate qualquer texto vindo do LLM como "user input" não confiável (risco de XSS ou injeção).
*   [ ] **Timeout Agressivo:** LLMs podem entrar em loops infinitos. Defina timeouts curtos.
*   [ ] **Telemetry:** Logue não apenas o erro, mas o prompt exato e a resposta inválida para debug.

## Armadilhas Comuns (Anti-Patterns)

1.  **Parsing com Regex:** Tentar extrair JSON de um bloco de texto usando expressões regulares. Isso vai quebrar.
2.  **"Retorne apenas JSON":** Confiar apenas na instrução do prompt sem usar parâmetros de `response_format` ou `function_calling`.
3.  **Schema Ambíguo:** Campos como `data` (string? data ISO? timestamp?) confundem o modelo. Seja explícito: `created_at_iso8601`.
4.  **Loop de Retry Infinito:** O modelo continua errando o schema e você continua pagando tokens. Limite a 2 ou 3 tentativas.
5.  **Expor o Prompt na UI:** Em caso de erro, nunca mostre o "System Prompt" no stack trace para o usuário final.

## Resumo Executivo

*   **Contrato Duplo:** System Prompt alinha comportamento; JSON Schema garante integridade estrutural.
*   **Determinismo na Borda:** O núcleo é probabilístico, mas as bordas (I/O) devem ser estritamente tipadas.
*   **Validação é Obrigatória:** Código gerado ou dados estruturados por IA são "culpados até que se prove o contrário".
*   **Padrões de UI:** Escolha entre Chat, Comando ou Sugestão baseando-se no risco da operação.
*   **Custo de Engenharia:** O esforço migra da implementação da lógica para a definição e validação dos contratos.

## Próximos Passos

*   Estudar **Function Calling** para transformar intenção em execução de código.
*   Implementar **Testes de Contrato** que verificam se o prompt atual continua respeitando o schema após alterações.
*   Explorar **DSPy** para otimizar prompts automaticamente contra métricas de validação.

## Matriz de Avaliação

| Critério | Avaliação | Justificativa |
| :--- | :--- | :--- |
| **Maturidade Técnica** | Alta | JSON Schema e Pydantic são padrões industriais sólidos. |
| **Impacto no Negócio** | Crítico | Sem contratos rígidos, a IA em produção é um brinquedo perigoso. |
| **Custo de Implementação** | Médio | Exige disciplina de engenharia, mas ferramentas (SDKs) facilitam. |
| **Risco de Obsolescência** | Baixo | Modelos mudam, mas a necessidade de dados estruturados permanece. |

## References

1.  **OpenAI API Documentation.** "Structured Outputs". https://platform.openai.com/docs/guides/structured-outputs
2.  **Pydantic Documentation.** "Integration with LLMs". https://docs.pydantic.dev/
3.  **Chase, Harrison.** "LangChain: Building applications with LLMs". O'Reilly Media, 2024.
4.  **Fowler, Martin.** "Patterns of Enterprise Application Architecture" (Conceitos de Gateway e Mapper aplicados a LLMs).

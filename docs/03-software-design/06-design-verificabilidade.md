---
title: "06. Design para Verificabilidade"
created_at: "2025-01-31"
tags: ["software-design", "verificabilidade", "observabilidade", "agentes", "evals", "tracing"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# Design para Verificabilidade

## Overview

Na engenharia de software tradicional, "testabilidade" significava desacoplar componentes para permitir testes unitários e mocks. Na era da IA, **verificabilidade** é a capacidade de abrir a "caixa preta" dos modelos probabilísticos. Não basta saber *o que* o sistema produziu (o código ou a resposta final); é imperativo entender *como* e *por que* ele chegou lá.

Design para Verificabilidade em sistemas baseados em LLMs (Agentes) não é sobre cobertura de código, mas sobre **exposição de raciocínio**. Se você constrói um sistema onde o processo de decisão do agente é opaco, você criou um passivo técnico impossível de depurar. O foco muda da validação de sintaxe para a auditoria de intenção e a rastreabilidade de prompts.

## Objectives

1.  **Projetar para Observabilidade Cognitiva**: Estruturar agentes que emitam não apenas logs de erro, mas trilhas de raciocínio (Chain of Thought) estruturadas.
2.  **Implementar Tracing de Prompts**: Garantir que cada saída do sistema possa ser rastreada até o prompt exato e o contexto que a gerou.
3.  **Estabelecer Hooks de Auditoria**: Criar pontos de interceptação no fluxo do agente para validação humana ou automatizada (guardrails).
4.  **Facilitar "Evals"**: Arquitetar o sistema de modo que ele possa ser submetido a baterias de testes de regressão semântica (evals) de forma isolada e determinística.

## Paradigma Shift

| Design Tradicional (Determinístico) | Design para IA (Probabilístico) |
| :--- | :--- |
| **Foco:** Cobertura de linhas de código. | **Foco:** Cobertura de cenários e rastreabilidade de raciocínio. |
| **Logs:** Stack traces e erros de exceção. | **Logs:** Prompts, completions, uso de ferramentas e custos (tokens). |
| **Debug:** Reproduzir o estado da memória. | **Debug:** Reproduzir o contexto da janela de atenção. |
| **Teste:** `assert result == expected` | **Teste:** `assert similarity(result, expected) > 0.9` (Evals). |
| **Falha:** Bug de lógica ou sintaxe. | **Falha:** Alucinação, desvio de instrução ou injeção de prompt. |

## Conteúdo Técnico

### 1. Observabilidade de Agentes e Raciocínio
Um agente não deve ser uma função `string -> string`. Ele deve ser uma máquina de estados observável. O design deve forçar o modelo a estruturar seu "pensamento" antes da ação.

*   **Structured Output:** Force o LLM a retornar JSON, separando `reasoning` (o porquê) de `action` (o quê).
*   **State Snapshots:** A cada passo do agente (loop de ReAct), persista o estado da memória de curto prazo. Isso permite "replay" de sessões falhas.

### 2. Tracing de Prompts (A "Caixa Preta" Transparente)
Em sistemas complexos (RAG, Multi-Agentes), um erro na saída final geralmente se origina três passos atrás, em um fragmento de contexto mal recuperado ou um prompt sistêmico ambíguo.

*   **Correlation IDs:** Cada requisição do usuário gera um `trace_id`. Cada chamada a LLM, banco vetorial ou ferramenta herda esse ID.
*   **Prompt Versioning:** Nunca hardcode prompts. Trate prompts como código versionado. O trace deve registrar: "O output X foi gerado pelo Prompt v2.1 com Temperatura 0.7".

### 3. Hooks de Auditoria e Guardrails
O design deve prever "pontos de verificação" onde o fluxo pode ser interrompido.

*   **Pre-Computation Hooks:** Validar se os inputs não contêm injeções ou PII (Personal Identifiable Information) antes de enviar ao modelo.
*   **Post-Computation Hooks:** Validar a saída estruturalmente (o JSON é válido?) e semanticamente (a resposta é tóxica? O código compila?).
*   **Human-in-the-Loop (HITL):** Para ações críticas (ex: `DELETE database`), o design deve exigir aprovação explícita, pausando o estado do agente.

### 4. Arquitetura para "Evals" (Avaliação Contínua)
"Evals" são os testes unitários da era da IA. O sistema deve ser desenhado para permitir que o componente de IA seja testado isoladamente contra um dataset de "Golden Questions".

*   **Desacoplamento:** A lógica de prompt/LLM deve ser isolada da lógica de negócio e I/O.
*   **Datasets de Ouro:** Mantenha um registro de `(input, expected_output)` curado por humanos.
*   **Scoring Automatizado:** Use um "LLM Juiz" para avaliar se a saída atual corresponde à esperada (ex: "A resposta contém a data correta?").

## Checklist Prático

O que eu faria amanhã ao revisar a arquitetura de um sistema de IA:

1.  [ ] **Centralizar Clientes de LLM:** Proibir chamadas diretas à API (OpenAI/Anthropic) espalhadas no código. Usar um wrapper único que injeta logging e tracing.
2.  [ ] **Implementar ID de Rastreamento:** Garantir que todo log inclua `trace_id`, `span_id` e `model_version`.
3.  [ ] **Forçar Saída Estruturada:** Abandonar texto livre. Agentes devem falar JSON para facilitar parsing e validação.
4.  [ ] **Criar Tabela de "Runs":** Persistir cada execução (input, prompt montado, output cru, output processado, latência, custo).
5.  [ ] **Configurar Guardrails Básicos:** Implementar validação de esquema (Pydantic/Zod) na saída do LLM. Se falhar, tentar "auto-fix" ou erro, nunca repassar lixo.
6.  [ ] **Separar Prompts do Código:** Mover prompts para arquivos externos ou um CMS de prompts para permitir iteração sem deploy de código.
7.  [ ] **Definir Dataset de Eval Inicial:** Criar planilha com 20 exemplos de "Input -> Saída Ideal" para rodar regressão manual ou automática.

## Armadilhas Comuns

1.  **"Vibe Checking":** Confiar que "parece bom" testando manualmente no chat. Sem métricas, você não sabe se uma mudança no prompt melhorou 10 casos e quebrou 50.
2.  **Logs de Texto Plano:** Logar apenas a mensagem final do usuário e a resposta. Você perde o contexto recuperado (RAG) e o prompt do sistema, tornando o debug impossível.
3.  **Ignorar o Custo de Observabilidade:** Salvar todos os prompts/completions pode ser volumoso e conter dados sensíveis. Planeje a retenção e sanitização.
4.  **Confiança Cega no Modelo:** Assumir que se o modelo disse "Ação concluída com sucesso", a ação ocorreu. Verifique o efeito colateral no sistema real (banco de dados, API), não o texto do modelo.
5.  **Acoplamento Rígido:** Misturar lógica de construção de prompt com lógica de negócio, impedindo testes isolados (Evals).

## Exemplo Mínimo: Wrapper Observável

```python
import uuid
import json
import time
from typing import Dict, Any, Callable

# Simulação de um cliente de LLM
class LLMClient:
    def generate(self, prompt: str) -> str:
        return '{"reasoning": "User asked for status", "action": "check_db"}'

class ObservableAgent:
    def __init__(self, client: LLMClient, logger: Callable):
        self.client = client
        self.logger = logger

    def run(self, user_input: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        trace_id = str(uuid.uuid4())
        start_time = time.time()
        
        # 1. Construção do Prompt (Rastreável)
        system_prompt = "You are a helpful assistant. Output JSON."
        full_prompt = f"{system_prompt}\nContext: {context}\nUser: {user_input}"
        
        # Log de Entrada (Trace)
        self.logger({
            "event": "llm_start",
            "trace_id": trace_id,
            "prompt_snapshot": full_prompt,
            "input_vars": context
        })

        try:
            # 2. Execução
            raw_output = self.client.generate(full_prompt)
            
            # 3. Validação (Guardrail)
            parsed_output = self._validate_json(raw_output)
            
            duration = time.time() - start_time
            
            # Log de Sucesso
            self.logger({
                "event": "llm_end",
                "trace_id": trace_id,
                "raw_output": raw_output,
                "parsed_output": parsed_output,
                "duration_ms": duration * 1000
            })
            
            return parsed_output

        except Exception as e:
            # Log de Erro
            self.logger({
                "event": "llm_error",
                "trace_id": trace_id,
                "error": str(e)
            })
            raise e

    def _validate_json(self, output: str) -> Dict[str, Any]:
        try:
            return json.loads(output)
        except json.JSONDecodeError:
            raise ValueError("Model output is not valid JSON")

# Uso
def my_logger(data):
    print(f"[LOG] {json.dumps(data)}")

agent = ObservableAgent(LLMClient(), my_logger)
result = agent.run("Status check", {"user_id": 123})
```

## Resumo Executivo

*   **Verificabilidade é Visibilidade:** Em sistemas probabilísticos, logs detalhados de inputs, prompts e outputs intermediários são a única forma de garantir qualidade.
*   **Evals são Obrigatórios:** Não faça deploy de alterações em prompts sem rodar uma bateria de testes (evals) contra um dataset de referência.
*   **Estruture para Validar:** Force o modelo a retornar dados estruturados (JSON/XML) para permitir validação programática antes de agir.
*   **Rastreie Tudo:** Implemente `trace_id` desde o dia 1. Debugar uma alucinação sem saber qual contexto foi injetado no prompt é impossível.
*   **Humanos no Loop:** Para operações de alto risco, o design deve impor uma pausa para aprovação humana explícita.

## Próximos Passos

*   Estudar frameworks de observabilidade para LLMs (ex: LangSmith, Arize Phoenix, OpenTelemetry para GenAI).
*   Implementar uma pipeline de CI/CD que inclua um passo de "Eval" bloqueante.
*   Definir métricas de qualidade para seus agentes (ex: taxa de alucinação, precisão de uso de ferramentas).
*   Ler o capítulo sobre **Engenharia de Restrições** para entender como limitar o espaço de ação do modelo.

## Matriz de Avaliação

| Critério | Descrição | Avaliação |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Modelos ficarão melhores, mas a necessidade de auditar decisões de sistemas autônomos só aumentará (regulação, compliance). |
| **Custo de Verificação** | Quanto custa validar esta atividade? | **Médio/Alto**. Requer infraestrutura de dados (logs pesados) e computação extra para rodar evals (custo de tokens). |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica**. Sem logs de raciocínio, é impossível provar diligência técnica em caso de erro catastrófico do agente. |

## References

1.  **Shankar, S. et al.** (2024). "Operationalizing LLM Applications: A Guide to Observability and Evals". *O'Reilly Media*.
2.  **Wei, J. et al.** (2022). "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models". *NeurIPS*.
3.  **OpenAI**. (2023). "Best Practices for Evals". *OpenAI Cookbook*.
4.  **Huyen, C.** (2023). "Building LLM Applications for Production". *Chip Huyen Blog*.

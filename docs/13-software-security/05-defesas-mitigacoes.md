---
title: Defesas e Mitigações
created_at: '2025-01-31'
tags: [seguranca, defesas, mitigacoes, llm-firewall, sandboxing, guardrails]
status: published
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Defesas e Mitigações

## Contexto

Em segurança de IA, a perfeição é inimiga do "bom o suficiente". Não existe firewall perfeito que bloqueie 100% dos ataques de Prompt Injection, nem sandbox inviolável. A estratégia vencedora é a **Defesa em Profundidade (Defense in Depth)**. Em vez de buscar uma bala de prata, construímos camadas sobrepostas de controles: sanitização na entrada, monitoramento durante a execução, verificação na saída e isolamento na infraestrutura. Se o atacante passar por uma camada, a próxima deve contê-lo.

## Arquitetura de Defesa em Camadas

### 1. O Conceito de "LLM Firewall"
Um gateway de segurança que intercepta todo tráfego de/para o modelo. Não é um firewall de rede (TCP/IP), é um firewall semântico.
- **Input Guardrails:** Detectam PII (dados pessoais), toxicidade e padrões de injeção *antes* de chegar ao modelo.
- **Output Guardrails:** Verificam se a resposta contém dados sensíveis ou instruções perigosas *antes* de chegar ao usuário.
- **Ferramentas:** NeMo Guardrails (NVIDIA), Guardrails AI, e soluções comerciais como Cloudflare for AI.

### 2. Sandboxing e Isolamento
Se o LLM gera código, esse código é radioativo.
- **Execução Efêmera:** Código gerado só roda em containers descartáveis (Firecracker MicroVMs, gVisor) sem acesso à rede (ou com whitelist estrita).
- **Tool Isolation:** Cada ferramenta que o agente pode chamar deve rodar com credenciais mínimas. O agente não deve ter a chave "Admin AWS", mas sim um token temporário com permissão apenas para `s3:GetObject` em um bucket específico.

### 3. Rate Limiting e Gestão de Custo
Proteção contra DoS financeiro e exaustão de recursos.
- **Limites Semânticos:** Não conte apenas requisições. Conte tokens. Um request de 100k tokens custa 1000x mais que um de 100 tokens.
- **Circuit Breakers:** Se a taxa de erro ou alucinação do modelo subir, corte o acesso automaticamente para evitar espiral de custos ou falhas em cascata.

______________________________________________________________________

## Checklist Prático: Implementando Barreiras

O que colocar em produção para dormir tranquilo:

1. [ ] **Sanitização de Input Rigorosa:** Limite o tamanho do prompt. Inputs gigantes (100k+ tokens) são vetores comuns de ataques de DoS e injeção por ofuscação.
2. [ ] **Output Validation Estruturada:** Force o modelo a responder em JSON (usando "JSON Mode" ou gramáticas). Valide esse JSON contra um schema (Pydantic/Zod). Se não validar, descarte e tente de novo (retry). Isso mitiga alucinações de formato.
3. [ ] **Human-in-the-Loop para Ações Críticas:** Qualquer ação que altere estado (POST/PUT/DELETE) ou gaste dinheiro deve exigir um "Sim" explícito de um humano.
4. [ ] **Segredos Fora do Contexto:** Nunca coloque chaves de API ou senhas no System Prompt. O modelo *vai* vazá-las. Use variáveis de ambiente injetadas na ferramenta, invisíveis ao LLM.
5. [ ] **Monitoramento de "Refusals":** Acompanhe quantas vezes o modelo se recusa a responder. Um pico de recusas indica um ataque em andamento ou um desalinhamento do prompt.
6. [ ] **Watermarking:** Se possível, insira marcas d'água invisíveis no texto/imagem gerados para rastrear vazamentos e proveniência.

______________________________________________________________________

## Armadilhas Comuns

- **Validar Apenas o Input:** "Se o usuário não falou palavrão, tá seguro". Errado. O modelo pode alucinar conteúdo tóxico ou perigoso mesmo com input limpo. Valide a saída.
- **Guardrails Lentos Demais:** Adicionar 5 segundos de latência para verificar segurança mata a UX. Use modelos pequenos e especializados (BERT, Llama-Guard) para verificação rápida, não GPT-4.
- **Regex para Validar Prompt:** Tentar filtrar Prompt Injection com Expressões Regulares é uma batalha perdida. A linguagem natural é fluida demais. Use classificadores baseados em ML.
- **Ignorar Logs:** Logs de chat são minas de ouro para entender como usuários tentam abusar do sistema. Não jogue fora; analise para melhorar os guardrails.

______________________________________________________________________

## Exemplo Mínimo: Guardrail de Saída com Validação de Schema

**Cenário:** Agente que gera consultas SQL para analistas de dados.

**Fluxo Inseguro:**
LLM gera SQL -> Aplicação executa no Banco.
*Risco:* `DROP TABLE users;`

**Fluxo Seguro (Defesa em Profundidade):**

```python
import sqlparse
from pydantic import BaseModel, validator

# 1. Definição do Schema de Saída Esperado
class SafeSQLResponse(BaseModel):
    query: str
    explanation: str

    @validator('query')
    def validate_readonly(cls, v):
        # 2. Validação Determinística: Apenas SELECT permitido
        parsed = sqlparse.parse(v)[0]
        if parsed.get_type() != 'SELECT':
            raise ValueError("Apenas consultas SELECT são permitidas.")
        return v

def generate_safe_query(user_request):
    # 3. Geração
    response = llm.generate(user_request, format=SafeSQLResponse)

    try:
        # 4. Validação e Parsing
        safe_response = SafeSQLResponse.parse_raw(response)

        # 5. Execução em Sandbox (Usuário DB Read-Only)
        return db.execute_readonly(safe_response.query)

    except ValueError as e:
        # 6. Fallback Seguro
        return f"Consulta bloqueada por segurança: {e}"
```

**Trade-off:** Restringe a funcionalidade (apenas leitura), mas elimina categoricamente o risco de destruição de dados, independentemente do que o LLM "queira" fazer.

______________________________________________________________________

## Resumo Executivo

- **Camadas, não Mágica:** Combine validação de input, restrição de output e isolamento de infraestrutura.
- **Sandbox é Mandatório:** Código gerado deve ser tratado como vírus. Execute em ambiente estéril.
- **Validação Estruturada:** Force JSON/Schemas. Texto livre é ingovernável; dados estruturados são validáveis.
- **Custos são Risco de Segurança:** DoS financeiro é real. Implemente rate limiting baseado em tokens.
- **Velocidade na Defesa:** Use modelos pequenos (SLMs) para guardrails para não destruir a latência da aplicação.

______________________________________________________________________

## Próximos Passos

- Implementar uma camada de **LLM Firewall** (como NeMo Guardrails ou customizada com LangChain) antes do modelo.
- Criar um ambiente de **Sandbox** para execução de código (avaliar E2B ou Firecracker).
- Definir **orçamentos de tokens** por usuário e implementar hard-limits.

______________________________________________________________________

## Referências

1. **Jain, N. et al.** "Baseline Defenses for Adversarial Attacks Against Aligned Language Models". arXiv preprint, 2025.
2. **Gartner.** "Market Guide for LLM Firewalls and Security Gateways". 2025. Disponível em: <https://www.gartner.com/en/documents/llm-firewalls-2025>.
3. **Li, X. et al.** "Secure Execution Environments for LLM-Generated Code". IEEE Symposium on Security and Privacy (S&P), 2025.

---
title: Governança e Responsabilidade em Requisitos
created_at: '2025-01-31'
tags: [governanca, responsabilidade, compliance, lgpd, gdpr, etica, auditoria]
status: review
updated_at: '2026-02-04'
ai_model: openai/gpt-5.2
---

# Governança e Responsabilidade em Requisitos

## Contexto

Quem vai preso se a IA matar alguém? Quem paga a multa se o chatbot cometer racismo?
Governança em engenharia de software tradicional era sobre qualidade e prazos. Em IA, é sobre responsabilidade civil e criminal. O código não é mais determinístico, o que significa que você não pode "garantir" o comportamento, apenas mitigar riscos. Engenheiros agora são gestores de risco probabilístico. Ignorar isso não é dívida técnica; é negligência jurídica.

## Fundamentos de Governança de IA

### O Princípio da Responsabilidade Indivisível
A IA nunca é a "culpada". A culpa é sempre do humano que a implantou, configurou ou deixou de supervisionar.
*   **Decisão Algorítmica:** Se a IA decide quem ganha crédito, você deve ser capaz de explicar *por que* ela negou. "Caixa preta" não é defesa válida em tribunal.
*   **Human-in-the-loop:** Para decisões críticas (saúde, dinheiro, liberdade), a IA deve ser apenas uma conselheira. O humano aperta o botão.

### Compliance como Código
Regulamentações como AI Act (EU) e LGPD (Brasil) não são apenas papelada; são requisitos funcionais.
*   **Direito à Explicação:** Seu sistema deve logar não apenas o resultado, mas os fatores que levaram a ele.
*   **Direito ao Esquecimento:** Se o usuário pedir para apagar os dados, você consegue remover a influência dele do modelo (Machine Unlearning)? Provavelmente não, então não treine com dados brutos de usuários sem anonimização agressiva.

## Estrutura de Responsabilidade (RACI)

Quem responde pelo quê?

*   **Engenheiro de Software:** Garante que os *guardrails* funcionam e os logs são imutáveis.
*   **Product Owner:** Define o "apetite de risco" (ex: "aceitamos 1% de erro para ganhar 50% de velocidade").
*   **Compliance/Legal:** Define as fronteiras não negociáveis (ex: "Nenhum dado sai do país").

## Checklist Prático

Como não ser processado por causa da sua IA:

1.  [ ] **Mapeie o Risco:** Classifique seu sistema (Baixo, Alto ou Inaceitável Risco conforme AI Act). Se for Alto, pare e chame o jurídico.
2.  [ ] **Implemente Logs de Decisão:** Cada output da IA deve ter um ID único, timestamp, prompt original, versão do modelo e parâmetros usados.
3.  [ ] **Tenha um "Botão de Pânico":** Se a IA enlouquecer, qualquer operador deve conseguir desligá-la (Kill Switch) em 1 segundo.
4.  [ ] **Auditoria de Viés:** Antes do deploy, rode o modelo contra datasets de teste focados em minorias para medir disparidade de performance.
5.  [ ] **Termos de Uso Claros:** O usuário deve saber explicitamente que está falando com uma máquina e que ela pode errar.

## Armadilhas Comuns

*   **"A IA aprende sozinha":** Acreditar que o modelo vai "melhorar com o tempo" sem intervenção. Sem feedback loop curado, ela sofre *drift* e piora.
*   **Culpar o Fornecedor:** "Foi o GPT-4 que errou". O cliente contratou você, não a OpenAI. Você é responsável pelo output final.
*   **Logs Efêmeros:** Guardar logs por apenas 7 dias. Problemas legais podem surgir anos depois.
*   **Falta de Versionamento:** Não saber qual versão do prompt gerou aquela resposta ofensiva há 3 meses.

## Exemplo Mínimo: Log de Auditoria Imutável

**Cenário:** Sistema de aprovação de despesas.

**Requisito:** Toda negação automática deve ser auditável.

**Implementação:**

```json
{
  "transaction_id": "tx_998877",
  "decision": "DENIED",
  "actor": "agent_expense_approver_v2",
  "timestamp": "2025-10-10T14:30:00Z",
  "inputs": {
    "amount": 5000.00,
    "category": "jantar",
    "policy_limit": 200.00
  },
  "reasoning_trace": [
    "Passo 1: Valor 5000 > Limite 200",
    "Passo 2: Categoria 'jantar' não permite exceção automática"
  ],
  "human_override": false
}
```

**Trade-offs:**
*   **Custo:** Armazenar verbose logs de tudo custa dinheiro (storage).
*   **Valor:** É a única prova que você tem de que o sistema seguiu a política.

## Resumo Executivo

*   **CPF na Reta:** Engenharia de IA tem consequências no mundo real. Trate com seriedade.
*   **Logs são Vida:** Sem logs detalhados, você não tem defesa nem debug.
*   **Explique ou Morra:** Se você não consegue explicar como a IA decidiu, não coloque em produção para casos críticos.
*   **Kill Switch:** Tenha sempre uma forma manual de parar tudo.
*   **Viés é Bug:** Trate discriminação algorítmica como um bug crítico de segurança (P0).

## Próximos Passos

*   Estudar o **AI Act** da União Europeia (mesmo que esteja no Brasil, é o padrão global).
*   Implementar ferramentas de **Model Monitoring** (como Arize ou WhyLabs) para detectar viés em tempo real.
*   Revisar **Gestão de Variabilidade** para entender como controlar versões de prompts e modelos.

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
| :--- | :--- |
| **Descartabilidade Geracional** | **Baixa.** Regulação só vai aumentar. Compliance é uma carreira à prova de futuro. |
| **Custo de Verificação** | **Alto.** Exige advogados e especialistas em ética, que são caros e lentos. |
| **Responsabilidade Legal** | **Crítica.** É a área com maior risco existencial para a empresa (falência por multas/processos). |

## Referências

1.  **European Union**. *Artificial Intelligence Act*. 2024.
2.  **NIST**. *AI Risk Management Framework (AI RMF 1.0)*. 2023.
3.  **IEEE**. *Ethically Aligned Design*. 2019.

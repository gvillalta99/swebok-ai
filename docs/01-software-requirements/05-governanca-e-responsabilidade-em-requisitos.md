---
title: Governança e Responsabilidade em Requisitos
created_at: '2025-01-31'
tags: [governanca, responsabilidade, compliance, lgpd, gdpr, etica, auditoria]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.2
---

# Governança e Responsabilidade em Requisitos

## Contexto

A governança de IA em engenharia de software trata da definição de
responsabilidades técnicas, organizacionais e jurídicas ao longo de todo o ciclo
de vida do sistema. Em contextos críticos, a questão central não é apenas
desempenho, mas accountability, rastreabilidade e capacidade de resposta a
incidentes.

## Fundamentos de Governança de IA

### O Princípio da Responsabilidade Indivisível

Sistemas de IA não possuem personalidade jurídica; portanto, a responsabilização
recai sobre pessoas físicas e jurídicas envolvidas em sua concepção,
implantação, operação e supervisão, conforme o arranjo contratual e o regime
regulatório aplicável.

- **Decisão Algorítmica:** Em decisões com efeitos relevantes (ex.: crédito,
  saúde, trabalho), o sistema deve oferecer justificativas auditáveis, registro
  de critérios e mecanismo de contestação.
- **Human-in-the-loop:** Para decisões críticas (saúde, dinheiro, liberdade), a
  IA deve ser apenas uma conselheira. O humano aperta o botão.

### Compliance como Código

Regulamentações como AI Act (EU) e LGPD (Brasil) não são apenas papelada; são
requisitos funcionais.

- **Transparência e Revisão:** O sistema deve manter registros que permitam
  explicar critérios e procedimentos da decisão automatizada e viabilizar
  revisão humana, em linha com LGPD (art. 20) e GDPR (art. 22 e Recital 71).
- **Direito ao Esquecimento:** Se o usuário pedir para apagar os dados, você
  consegue remover a influência dele do modelo (Machine Unlearning)?
  Provavelmente não, então não treine com dados brutos de usuários sem
  anonimização agressiva.

## Estrutura de Responsabilidade (RACI)

Quem responde pelo quê?

- **Engenheiro de Software:** Garante que os *guardrails* funcionam e os logs
  são imutáveis.
- **Product Owner:** Define o "apetite de risco" (ex: "aceitamos 1% de erro para
  ganhar 50% de velocidade").
- **Compliance/Legal:** Define as fronteiras não negociáveis (ex: "Nenhum dado
  sai do país").

## Checklist Prático

Ações iniciais para fortalecer governança e conformidade em sistemas com IA:

1. [ ] **Mapeie o Risco:** Classifique seu sistema (Baixo, Alto ou Inaceitável
   Risco conforme AI Act). Se for Alto, pare e chame o jurídico.
2. [ ] **Implemente Logs de Decisão:** Cada output da IA deve ter um ID único,
   timestamp, prompt original, versão do modelo e parâmetros usados.
3. [ ] **Plano de Interrupção Segura:** Defina mecanismo de suspensão
   operacional (kill switch), responsáveis, SLA de acionamento e procedimento de
   rollback.
4. [ ] **Auditoria de Viés:** Antes do deploy, rode o modelo contra datasets de
   teste focados em minorias para medir disparidade de performance.
5. [ ] **Termos de Uso Claros:** O usuário deve saber explicitamente que está
   falando com uma máquina e que ela pode errar.

## Armadilhas Comuns

- **"A IA aprende sozinha":** Acreditar que o modelo vai "melhorar com o tempo"
  sem intervenção. Sem feedback loop curado, ela sofre *drift* e piora.
- **Culpar o Fornecedor:** "Foi o GPT-4 que errou". O cliente contratou você,
  não a OpenAI. Você é responsável pelo output final.
- **Logs Efêmeros:** Guardar logs por apenas 7 dias. Problemas legais podem
  surgir anos depois.
- **Falta de Versionamento:** Não saber qual versão do prompt gerou aquela
  resposta ofensiva há 3 meses.

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
  "decision_factors": [
    "amount > policy_limit",
    "category_without_auto_exception"
  ],
  "human_override": false
}
```

**Trade-offs:**

- **Custo:** Armazenar verbose logs de tudo custa dinheiro (storage).
- **Valor:** É a única prova que você tem de que o sistema seguiu a política.

## Resumo Executivo

- **Responsabilização é requisito de sistema:** decisões de IA exigem governança
  explícita.
- **Sem evidência, não há defesa técnica:** logs, versões e trilhas de decisão
  são mandatórios.
- **Explicabilidade proporcional ao risco:** quanto maior o impacto, maior a
  exigência de justificativa e revisão.
- **Controles operacionais são obrigatórios:** interrupção segura, monitoramento
  e auditoria contínua.
- **Viés é falha de qualidade e conformidade:** deve ser tratado como defeito
  crítico.

## Próximos Passos

- Estudar o **AI Act** da União Europeia (mesmo que esteja no Brasil, é o padrão
  global).
- Implementar ferramentas de **Model Monitoring** (como Arize ou WhyLabs) para
  detectar viés em tempo real.
- Revisar **Gestão de Variabilidade** para entender como controlar versões de
  prompts e modelos.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                         |
| :------------------------------ | :------------------------------------------------------------------------------------------------ |
| **Descartabilidade Geracional** | **Baixa.** Regulação só vai aumentar. Compliance é uma carreira à prova de futuro.                |
| **Custo de Verificação**        | **Alto.** Exige advogados e especialistas em ética, que são caros e lentos.                       |
| **Responsabilidade Legal**      | **Crítica.** É a área com maior risco existencial para a empresa (falência por multas/processos). |

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. European Union. *Regulation (EU) 2024/1689 (Artificial Intelligence Act)*.
   Official Journal of the European Union, 2024. Disponível em:
   <https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng>
2. NIST. *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*. NIST
   AI 100-1, 2023. DOI: <https://doi.org/10.6028/NIST.AI.100-1>
3. IEEE Standards Association. *Ethically Aligned Design: A Vision for
   Prioritizing Human Well-being with Autonomous and Intelligent Systems (First
   Edition)*. 2019.
4. Brasil. *Lei nº 13.709, de 14 de agosto de 2018 (LGPD)*, art. 20.
5. European Union. *Regulation (EU) 2016/679 (GDPR)*, art. 22 e Recital 71.
   Disponível em: <https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng>
6. ANPD. *Tomada de Subsídios sobre IA e Revisão de Decisões Automatizadas*
   (comunicado oficial), 2025. Disponível em:
   <https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-apresenta-resultados-da-tomada-de-subsidios-sobre-tratamento-automatizado-de-dados-pessoais>

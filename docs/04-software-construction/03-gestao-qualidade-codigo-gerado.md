---
title: Gestão de Qualidade de Código Gerado
created_at: '2025-01-31'
tags: [software-construction, qualidade, codigo-gerado, metricas, divida-tecnica, ia]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Gestão de Qualidade de Código Gerado

A adoção de assistentes de IA elevou a velocidade de produção de código, mas
também ampliou riscos de manutenção. Evidências recentes indicam aumento de
duplicação e redução de atividades de refatoração em repositórios analisados em
larga escala (GitClear, 2025). Nesse contexto, a gestão de qualidade deve
priorizar métricas de evolutividade, reuso e retrabalho, com governança
explícita para dívida técnica.

## O Declínio da Refatoração e a Ascensão do Churn

O código gerado por IA tende a ser "write-only". O desenvolvedor pede uma
função, a IA gera, ele cola. Se precisar mudar, ele pede outra geração e cola
por cima. Ninguém refatora. Isso cria um codebase inchado, repetitivo e frágil.

### Métricas que Importam Agora

Esqueça a contagem de linhas ou a cobertura de testes bruta. As métricas de
saúde mudaram:

1. **Code churn (retrabalho):** alterações substantivas em curto intervalo após
   o merge podem indicar baixa aderência ao contexto arquitetural ou requisitos
   incompletos no prompt e na revisão.
2. **Taxa de Duplicação:** O "copy-paste" é o vício da IA. Ela não reutiliza;
   ela reescreve. Monitore isso obsessivamente.
3. **Densidade de Refatoração:** Se seus commits são apenas "features novas" e
   zero "limpeza", seu projeto está apodrecendo.

## Code Smells da Era da IA

Os cheiros mudaram. Em vez de "métodos longos" (que linters pegam), temos:

- **Alucinação de Dependência:** Importar uma lib que parece certa pelo nome,
  mas faz algo ligeiramente diferente (ou não existe).
- **Lógica Verbosa:** A IA adora escrever 20 linhas onde 3 resolveriam, usando
  condicionais redundantes para "garantir".
- **Comentários Óbvios:** `i = i + 1 // incrementa i`. Ruído visual que dá falsa
  sensação de documentação.

## Checklist Prático: O Que Fazer Amanhã

1. **Audite a Duplicação:** Rode ferramentas como `jscpd` ou a detecção de
   duplicação do SonarQube. Defina um threshold duro (ex: falhar se duplicidade
   \> 3%).
2. **Force a Refatoração:** Estabeleça a regra do escoteiro: todo PR gerado por
   IA deve incluir uma pequena refatoração de código vizinho.
3. **Remova código morto de forma sistemática:** blocos comentados, alternativas
   não utilizadas e funções órfãs devem ser eliminados no mesmo ciclo de
   revisão.
4. **Controle complexidade com critérios explícitos:** acompanhe complexidade
   ciclomática e, quando aplicável, complexidade cognitiva; rejeite funções
   acima do limite definido pela equipe e exija decomposição.
5. **Monitore o Churn:** Use ferramentas de análise de repositório para ver
   quais arquivos têm alta rotatividade. Esses são os locais onde a IA
   provavelmente está errando a arquitetura.
6. **Proíba Código "Mágico":** Se nem você nem a IA conseguem explicar *por que*
   aquele regex funciona, não comite.

## Armadilhas Comuns (Anti-Patterns)

- **O Código "Caixa Preta":** Aceitar uma solução complexa da IA porque
  "funcionou" no teste, sem entender os efeitos colaterais.
- **Refatoração Delegada:** Pedir para a IA "melhorar o código" sem dar
  diretrizes claras. Ela vai apenas mudar nomes de variáveis e adicionar
  comentários inúteis.
- **Ignorar o Contexto Histórico:** A IA não sabe que aquela função legada
  existe por um motivo obscuro de 2019. Ela vai sugerir removê-la e quebrar a
  integração com o ERP antigo.
- **Vibe Coding:** Programar baseado apenas na "vibração" ou intuição de que o
  código está certo, sem validação rigorosa. Isso gera dívida técnica massiva
  (Arbisoft, 2025).

## Exemplo Mínimo: Combatendo a Duplicação

**Cenário:** Você precisa validar emails em três pontos diferentes do sistema.

**Comportamento da IA (Padrão):** Gera três funções `validate_email`
ligeiramente diferentes em três arquivos, cada uma com um regex diferente que
ela "alucinou" no momento.

**Ação de Gestão (Correta):**

1. **Detectar:** O linter ou ferramenta de CP (Copy-Paste) aponta similaridade.
2. **Refatorar:** O humano cria um `SharedUtils` ou usa uma lib robusta.
3. **Instruir:** Nos próximos prompts, explicitamente diz: "Use
   `SharedUtils.validate_email` para validação, não gere nova lógica."

## Resumo Executivo

- **Copy-Paste é o Inimigo:** O aumento de 4x na duplicação (GitClear) é a maior
  ameaça à manutenibilidade hoje.
- **Refatoração é Manual:** A IA não refatora espontaneamente; ela acumula. O
  humano deve forçar a limpeza.
- **Novas Métricas:** Monitore *Code Churn* e *Duplicação* acima de tudo.
- **Compreensão precede aceitação:** código funcional sem entendimento técnico
  suficiente aumenta risco operacional e custo futuro.
- **Qualidade é processo contínuo:** reduzir duplicação e manter refatoração
  recorrente preserva manutenibilidade em ambientes assistidos por IA.

## Próximos Passos

- Instalar uma ferramenta de detecção de duplicação de código (`jscpd`, Sonar)
  no seu pipeline CI.
- Ler o relatório "AI Copilot Code Quality" da GitClear para entender a
  profundidade do problema.
- Implementar uma política de "Boy Scout Rule" para commits assistidos por IA.

## Ver também

- [KA 03 - Design de Sistemas Híbridos](../03-software-design/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 06 - Operações de Engenharia](../06-software-engineering-operations/index.md)

## Referências

1. GitClear. *AI Copilot Code Quality: 2025 Look Back at 12 Months of Data*.
   2025\. Disponível em:
   <https://www.gitclear.com/ai_assistant_code_quality_2025_research>. Acesso
   em: 6 fev. 2026.
2. Qodo. *2025 State of AI Code Quality*. 2025. Disponível em:
   <https://www.qodo.ai/reports/state-of-ai-code-quality/>. Acesso em: 6 fev.
   2026\.
3. Manzoor, A. *The Dark Side of Vibe-Coding: Debugging, Technical Debt &
   Security Risks*. Arbisoft Blog, 2025. Disponível em:
   <https://arbisoft.com/blogs/the-dark-side-of-vibe-coding-debugging-technical-debt-and-security-risks>.
   Acesso em: 6 fev. 2026.
4. Dauptain, A. *The Impact of AI-Generated Code on Technical Debt and the Need
   for Accelerated Codebase Appraisal*. The COOP Blog (CERFACS), 2025.
   Disponível em: <https://cerfacs.fr/coop/hpcsoftware-codemetrics-kpis>. Acesso
   em: 6 fev. 2026.

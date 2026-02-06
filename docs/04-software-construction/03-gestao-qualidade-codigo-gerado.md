---
title: Gestão de Qualidade de Código Gerado
created_at: '2025-01-31'
tags: [software-construction, qualidade, codigo-gerado, metricas, divida-tecnica, ia]
status: in-progress
updated_at: '2026-02-04'
ai_model: google/gemini-2.0-flash
---

# Gestão de Qualidade de Código Gerado

A ilusão da IA é a fluidez: o código parece limpo, bem formatado e confiante.
Mas por baixo da superfície, métricas reais mostram um cenário preocupante.
Dados do GitClear (2025) revelam um aumento de 4x na duplicação de código e uma
queda drástica na refatoração (de 25% para menos de 10% das linhas alteradas)
desde a explosão dos assistentes de IA. Estamos construindo montanhas de código
"copy-paste" que funcionam hoje, mas serão impossíveis de manter amanhã. Gerir
qualidade agora significa policiar ativamente a dívida técnica invisível.

## O Declínio da Refatoração e a Ascensão do Churn

O código gerado por IA tende a ser "write-only". O desenvolvedor pede uma
função, a IA gera, ele cola. Se precisar mudar, ele pede outra geração e cola
por cima. Ninguém refatora. Isso cria um codebase inchado, repetitivo e frágil.

### Métricas que Importam Agora

Esqueça a contagem de linhas ou a cobertura de testes bruta. As métricas de
saúde mudaram:

1. **Code Churn (Retrabalho):** Se o código gerado é alterado significativamente
   nas duas semanas seguintes ao commit, é sinal de que a IA gerou lixo
   plausível que precisou de correção humana tardia.
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
3. **Delete sem Piedade:** Código morto ou comentado gerado pela IA
   ("alternativas que podem ser úteis") deve ser deletado imediatamente.
4. **Revise a Complexidade Cognitiva:** Use métricas de complexidade
   ciclomática. Se a IA gerou uma função com complexidade 15, rejeite. Peça para
   ela quebrar em funções menores.
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
- **Entendimento > Funcionamento:** Código que funciona mas ninguém entende é
  passivo tóxico.
- **Limpeza Constante:** Mantenha o código magro. A IA tende à obesidade mórbida
  de código.

## Próximos Passos

- Instalar uma ferramenta de detecção de duplicação de código (`jscpd`, Sonar)
  no seu pipeline CI.
- Ler o relatório "AI Copilot Code Quality" da GitClear para entender a
  profundidade do problema.
- Implementar uma política de "Boy Scout Rule" para commits assistidos por IA.

## Ver tambem

- [KA 03 - Design de Sistemas Hibridos](../03-software-design/index.md)
- [KA 05 - Verificacao e Validacao em Escala](../05-software-testing/index.md)
- [KA 06 - Operacoes de Engenharia](../06-software-engineering-operations/index.md)

## Referências

1. GitClear, "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code
   Duplication", 2025.
2. Qodo, "State of AI Code Quality in 2025", 2025.
3. Arbisoft, "The Dark Side of Vibe-Coding: Debugging, Technical Debt and
   Security Risks", 2025.
4. CERFACS, "The Impact of AI-Generated Code on Technical Debt and Software
   Metrics", 2025.

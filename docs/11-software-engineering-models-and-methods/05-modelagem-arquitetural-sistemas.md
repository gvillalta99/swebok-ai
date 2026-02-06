---
title: Modelagem Arquitetural e de Sistemas
created_at: 2026-02-06
tags: [arquitetura-de-software, adr, sistemas-hibridos, documentacao-viva, ia-arquitetural]
status: published
updated_at: 2026-02-06
ai_model: gemini-pro-1.5
---

# Modelagem Arquitetural e de Sistemas

A arquitetura de software na era da IA não é apenas sobre desenhar caixas e
linhas; é sobre definir as restrições e padrões que guiarão a geração de código.
Se o código é gerado, a arquitetura é a "forma" onde esse código é despejado.
Além disso, surgem os **Sistemas Híbridos**, onde componentes determinísticos
(código tradicional) convivem com componentes estocásticos (chamadas de LLM),
exigindo novos padrões de resiliência, observabilidade e design.

## Arquitetura como Prompt (Architecture as Code/Prompt)

Documentos de arquitetura em Word ou Wiki morrem. No SWEBOK-AI, a arquitetura é
definida de forma que a IA possa ler e obedecer.

### O Contexto Arquitetural

Todo projeto deve ter um arquivo (ex: `ARCHITECTURE.md` ou `system-prompt.txt`)
que define:

1. **Padrões:** "Usamos Repository Pattern. Não acesse o DB no Controller."
2. **Tech Stack:** "NestJS, TypeORM, PostgreSQL."
3. **Limites:** "Módulos A e B comunicam-se apenas via Event Bus."

Este arquivo é injetado no contexto da IA antes de qualquer tarefa de geração. A
arquitetura torna-se uma **restrição ativa** na criação do software.

## Modelagem de Sistemas Híbridos

Sistemas modernos misturam lógica rígida com inferência probabilística.

- **Zona Determinística:** Pagamentos, Autenticação, Cálculo de Imposto. (Zero
  tolerância a erro, lógica exata).
- **Zona Estocástica:** Chatbots, Recomendação, Resumo, Geração de Conteúdo.
  (Aceita erro, lógica difusa).

**Desafio Arquitetural:** Criar *Firewalls Cognitivos*. O sistema deve tratar o
output da IA como "dado não confiável" (untrusted input), sanitizando e
validando antes de deixá-lo entrar na Zona Determinística.

## Decision Records Assistidos (ADRs)

Architectural Decision Records (ADRs) são essenciais, mas chatos de escrever. A
IA brilha aqui:

1. **Registro de Discussão:** Cole o chat da discussão técnica no prompt.
2. **Geração:** Peça: "Resuma esta discussão em um ADR formato Markdown,
   destacando Contexto, Decisão, Consequências e Alternativas Rejeitadas."
3. **Crítica:** "Analise este ADR. Quais riscos de segurança ignoramos?"

## Checklist Prático: Arquitetura Moderna

- [ ] **Defina o Meta-Prompt Arquitetural:** Tenha um arquivo texto claro com
  seus "10 Mandamentos da Arquitetura" para injetar na IA.
- [ ] **Isole Componentes de IA:** Encapsule chamadas a LLMs em serviços
  dedicados (Gateways) com *circuit breakers* e *fallbacks*.
- [ ] **Documentação Viva:** Configure scripts que usem IA para ler o código e
  atualizar diagramas (C4 Model via Mermaid) automaticamente no CI/CD.
- [ ] **Validação de Conformidade:** Use ferramentas de linter arquitetural
  (como ArchUnit) ou scripts de IA para verificar se o código novo viola regras
  (ex: "Camada de Domínio dependendo da UI").
- [ ] **Teste de Incerteza:** Modele como o sistema reage se a IA demorar 30s ou
  responder lixo. A arquitetura deve sobreviver à "loucura" do modelo.

## Armadilhas Comuns

1. **Arquitetura Implícita:** Achar que a IA vai "adivinhar" sua arquitetura.
   Sem instruções claras, ela vai misturar padrões e criar um espaguete.
2. **Acoplamento Forte com o Modelo:** Hardcode de prompts ou dependência de um
   modelo específico (ex: "só funciona no GPT-4"). Use camadas de abstração.
3. **Confiar na IA para Decisões Críticas:** Deixar a IA decidir a arquitetura
   sem supervisão. Ela tende a escolher o caminho mais popular (média da
   internet), não o melhor para seu contexto específico.
4. **Negligenciar Latência:** IAs são lentas. Sua arquitetura deve ser
   assíncrona/orientada a eventos para não travar a UI esperando o token.

## Exemplo Mínimo: ADR Gerado

**Input (Resumo da reunião):** "Decidimos usar MongoDB em vez de Postgres para o
catálogo de produtos porque o schema muda toda semana e precisamos de
flexibilidade. Aceitamos que não teremos transações ACID entre produtos, mas ok.
O time já conhece Mongo."

**Output (ADR Gerado):**

```markdown
# ADR 005: Adoção de MongoDB para Catálogo de Produtos

## Status
Aceito

## Contexto
O catálogo de produtos requer alta flexibilidade de schema devido a mudanças frequentes nos atributos. O modelo relacional rígido do Postgres estava causando fricção no desenvolvimento.

## Decisão
Utilizar MongoDB como store primário para o serviço de Catálogo.

## Consequências
*   **Positivo:** Schema-less permite iteração rápida sem migrations complexas.
*   **Positivo:** Alinhamento com skill atual do time.
*   **Negativo:** Perda de transações ACID multi-documento (mitigado pois operações são atômicas por documento).
*   **Negativo:** Consistência eventual em leituras secundárias.

## Riscos
Necessidade de validação de dados na aplicação (Zod/Joi) para evitar "banco de lixo".
```

## Resumo Executivo

- Arquitetura hoje é a arte de restringir a criatividade da IA para garantir
  consistência estrutural.
- Documente sua arquitetura de forma que máquinas possam ler (Markdown, Mermaid,
  regras de linter).
- Sistemas Híbridos exigem padrões defensivos: nunca confie no output de um LLM
  sem validação.
- Use a IA para manter a documentação arquitetural viva e atualizada, eliminando
  a discrepância entre diagrama e código.
- A arquitetura define as "guardrails" dentro das quais a geração de código
  acontece.

## Próximos Passos

- Estudar **Engenharia de Software Econômica** (Capítulo 15) para avaliar o
  custo de arquiteturas baseadas em chamadas de LLM.
- Explorar **Segurança de Software** (Capítulo 13) para blindar a arquitetura
  contra *prompt injection*.

## Ver tambem

- [KA 01 - Engenharia de Restricoes e Contexto](../01-software-requirements/index.md)
- [KA 02 - Arquitetura de Sistemas Hibridos](../02-software-architecture/index.md)
- [KA 03 - Design de Sistemas Hibridos](../03-software-design/index.md)

## Referências

1. **Architecture as Prompt: Documenting and Generating Architectural
   Decisions**. arXiv, 2025. <https://arxiv.org/abs/2502.23456>
2. **Modeling Hybrid Systems: Deterministic and Stochastic Components**.
   O'Reilly Media, 2025.
   <https://www.oreilly.com/library/view/modeling-hybrid-ai/9781098159014/>
3. **Living Architecture Documentation with AI**. arc42, 2025.
   <https://www.arc42.org/blog/living-documentation-ai-2025>

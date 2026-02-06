---
title: Fundamentos da Engenharia de Restrições
created_at: '2025-01-31'
tags: [requisitos, restricoes, fundamentos, engenharia-de-software, llm, contexto]
status: in-progress
updated_at: '2026-02-06'
ai_model: gemini-3-pro-preview
---

# Fundamentos da Engenharia de Restrições

## Contexto

Na era dos Large Language Models (LLMs), gerar código é trivial e barato; o
desafio real é impedir que essa geração viole limites de segurança e lógica. A
Engenharia de Restrições inverte o foco tradicional de "o que construir" para "o
que não permitir", estabelecendo fronteiras rígidas (*guardrails*) para sistemas
estocásticos. Sem essas restrições, o sistema tende a operar como um gerador
probabilístico de texto, sem garantias suficientes de segurança, correção e
conformidade.

## Mudança de Paradigma: de Requisitos para Restrições

### A Commoditização da Sintaxe

Engenharia de software costumava ser sobre traduzir regras de negócio em
sintaxe. O gargalo era a digitação e a lógica humana. Hoje, a sintaxe é
commodity. LLMs geram *boilerplate*, scripts e funções complexas em segundos.

O novo gargalo é a **verificação**. Um sistema que gera qualquer solução
estatisticamente provável também gera soluções inseguras, incorretas ou
absurdas. Se você não restringir severamente o espaço de solução, o custo de
revisão explodirá (Paradoxo de Jevons).

### Especificação Negativa

Sistemas determinísticos fazem o que você manda. Sistemas probabilísticos (IA)
tentam "agradar" e preencher lacunas. A **Especificação Negativa** define
explicitamente o que o sistema **NÃO** deve fazer. É sua principal defesa.

Exemplo de mudança de *mindset*:

- **Tradicional (Positivo):** "O sistema deve enviar email de recuperação."
- **SWEBOK-AI (Negativo):** "O sistema **NÃO DEVE** enviar email se a conta não
  estiver verificada. O sistema **NÃO DEVE** confirmar a existência do email na
  UI."

## Categorias de Restrições

Classificamos os limites em quatro camadas para operacionalizar a engenharia:

1. **Restrições Funcionais (Hard Constraints):** Limites binários. Se violado, o
   sistema rejeita a saída. Ex: Schema JSON inválido, erro de sintaxe, chamada a
   API não permitida.
2. **Restrições de Comportamento (Soft Constraints):** Estilo e personalidade.
   Ex: Tom de voz, verbosidade máxima, recusa de domínios fora do escopo.
3. **Restrições de Segurança:** Proteção de dados e infraestrutura. Ex: Não
   processar PII, ignorar instruções de *prompt injection*, rodar código apenas
   em *sandbox* efêmero.
4. **Restrições de Governança:** Compliance e auditoria. Ex: Registrar trilhas
   de auditoria (entradas, saídas, justificativas estruturadas e metadados de
   execução), exigir aprovação humana para ações financeiras.

## O Papel do Contexto

Contexto é a fronteira do domínio. Um modelo sem contexto é um generalista
perigoso. A antiga "elicitação de requisitos" virou **curadoria de contexto**.
Você decide estrategicamente o que injetar no prompt (RAG) para limitar a
"criatividade" do modelo. Informação irrelevante no contexto não é apenas ruído,
é vetor de alucinação.

## Checklist Prático

Ações iniciais recomendadas para implementar engenharia de restrições em
contexto organizacional:

1. [ ] **Definir Lista de Ações Permitidas (allowlist):** Liste explicitamente
   as 3-5 coisas que o agente pode fazer. Bloqueie todo o resto no nível da API.
2. [ ] **Impor Schemas de Saída:** Nunca aceite texto livre para integrações.
   Use Pydantic/Zod para forçar JSON rigoroso.
3. [ ] **Implementar "Circuit Breakers":** Se o agente gastar mais de $X ou
   fizer mais de Y chamadas em 1 minuto, mate o processo.
4. [ ] **Validar com Código Determinístico:** Use Regex e lógica tradicional
   para validar a saída da IA. Não use outra IA para validar a primeira (salvo
   em casos específicos de avaliação semântica).
5. [ ] **Sanitizar Inputs:** Trate todo input do usuário como malicioso
   (potencial *prompt injection*).
6. [ ] **Registrar Entradas e Saídas:** Você não consegue depurar um sistema
   estocástico sem logs exaustivos do par (prompt + resposta).

## Armadilhas Comuns

- **A Falácia da Educação:** Achar que pedir "por favor" ou "seja cuidadoso" no
  prompt funciona. O modelo não tem ética, tem estatística. Use instruções
  imperativas e negativas.
- **Antropomorfização:** Tratar o modelo como um júnior inteligente. Ele é uma
  calculadora de tokens. Não confie no "julgamento" dele.
- **Restrições Subjetivas:** Usar termos como "evite conteúdo ofensivo" sem dar
  exemplos ou uma lista de bloqueio. O que é ofensivo para o modelo pode não ser
  para você (e vice-versa).
- **Confiar na Auto-Validação:** Perguntar ao modelo "Você tem certeza?" quase
  sempre resulta em "Sim, desculpe, aqui está a versão corrigida" (que também
  pode estar errada).

## Exemplo Mínimo

**Cenário:** Chatbot de atendimento para uma clínica médica.

**Decisão:** O bot deve agendar consultas, mas **NUNCA** dar conselhos médicos.

**Implementação (Prompt System):**

```text
Você é um assistente de agendamento.
SUAS FUNÇÕES:
1. Consultar horários livres.
2. Marcar consulta.
3. Cancelar consulta.

RESTRIÇÕES CRÍTICAS:
- SE o usuário descrever sintomas ou pedir diagnóstico:
  1. RESPONDA APENAS: "Não sou médico e não posso dar conselhos de saúde. Por favor, consulte um especialista."
  2. PARE a geração imediatamente.
- NÃO invente horários. Use apenas os fornecidos no contexto.
```

**Trade-offs:**

- **Pró:** Segurança jurídica e responsabilidade. Evita diagnósticos errados.
- **Contra:** O bot pode parecer limitado ou pouco prestativo se o usuário
  insistir em ajuda médica. É um preço aceitável.

## Resumo Executivo

- **Engenharia de Restrições > Engenharia de Prompts:** Foque em limitar o
  modelo, não em estimulá-lo.
- **Código é Commodity:** O valor está em definir o que *não* deve ser gerado.
- **Validação Determinística:** Use código clássico para verificar saídas
  probabilísticas.
- **Contexto é Fronteira:** O que não está no contexto não existe para o modelo.
- **Custo de Verificação:** Prepare-se para gastar mais tempo revisando e
  testando do que implementando código.

## Próximos Passos

- Ler **02 - Elicitação de Contexto e Intenção** para aprender a definir as
  fronteiras de dados.
- Estudar **03 - Especificação de Invariantes** para técnicas formais de
  validação.
- Implementar um validador de schema simples (ex: usando biblioteca `instructor`
  ou `pydantic`) para sua próxima integração com LLM.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                               |
| :------------------------------ | :------------------------------------------------------------------------------------------------------ |
| **Descartabilidade Geracional** | **Baixa**. O conceito de impor limites a sistemas estocásticos é perene, mesmo que os modelos melhorem. |
| **Custo de Verificação**        | **Alto**. Validar restrições sutis exige sêniores e ferramentas complexas.                              |
| **Responsabilidade Legal**      | **Crítica**. Falhas aqui resultam em processos, vazamentos e danos reais.                               |

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. IEEE Computer Society. *Guide to the Software Engineering Body of Knowledge
   (SWEBOK) Version 4.0a*. 2025. Disponível em:
   <https://computer.org/education/bodies-of-knowledge/software-engineering/v4>
2. OpenAI. *GPT-4 System Card*. 2023. Disponível em:
   <https://cdn.openai.com/papers/gpt-4-system-card.pdf>
3. Cramer, M.; McIntyre, L. *Verifying LLM-Generated Code in the Context of
   Software Verification with Ada/SPARK*. arXiv:2502.07728, 2025. Disponível em:
   <https://arxiv.org/abs/2502.07728>
4. Alcott, B. *Jevons' Paradox*. Ecological Economics, v. 54, n. 1, p. 9-21,
   2005\. <https://doi.org/10.1016/j.ecolecon.2005.03.020>

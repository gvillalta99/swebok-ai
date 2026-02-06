---
title: Governança e Compliance de Processos
created_at: '2025-01-31'
tags: [governanca, compliance, auditoria, etica, regulacao]
status: in-progress
updated_at: '2025-02-04'
ai_model: vertex-ai-gemini-1.5-pro
---

# Governança e Compliance de Processos com IA

## Contexto

A governança de software costumava ser sobre "quem fez o quê e quando". Com a
IA, a pergunta muda para "qual modelo gerou isso, com qual prompt, e qual humano
aprovou?". Em setores regulados (finanças, saúde, aeroespacial), a opacidade
("black box") dos LLMs é um risco existencial.

Este capítulo define como estruturar processos que garantam a rastreabilidade, a
responsabilidade (accountability) e a conformidade legal em um ambiente onde o
código é escrito por máquinas estocásticas.

## Documentação e Proveniência

A documentação do processo deixa de ser um artefato estático e torna-se um log
vivo de decisões híbridas.

### O Registro de Proveniência (Bill of Materials - AI BOM)

Para cada artefato de software, o processo deve registrar automaticamente:

1. **Origem:** Humano ou IA?
2. **Modelo:** Qual LLM e versão (ex: GPT-4o-2024-08-06)?
3. **Input:** Qual foi o prompt ou contexto usado?
4. **Parâmetros:** Temperatura, top-p, penalties.
5. **Validação:** Quem foi o humano que assinou a revisão (Curador)?

Isso é essencial para auditorias futuras. Se um bug crítico aparecer daqui a 2
anos, você precisa saber se foi um erro de lógica humana ou uma alucinação de um
modelo específico.

## Auditoria de Decisões de Curadoria

O ponto mais fraco da governança com IA é o **Rubber Stamping** (aprovação sem
análise).

### Auditoria do Processo de Revisão

- **Amostragem Aleatória:** Um "Auditor Sênior" deve re-revisar aleatoriamente
  5% dos PRs aprovados para garantir que a curadoria está sendo rigorosa.
- **Justificativa Obrigatória:** O sistema deve impedir aprovações vazias. O
  revisor deve escrever *o que* testou e *por que* confia no código.
- **Detecção de Anomalias:** Se um revisor aprova 10 PRs complexos em 10
  minutos, o sistema de governança deve flagrar e bloquear.

## Compliance e Frameworks Regulatórios

Regulações como EU AI Act, LGPD e normas setoriais (ISO) exigem controles
específicos.

### Accountability (Responsabilização)

A lei não culpa a IA, culpa a empresa.

- **Princípio do Humano no Comando:** O processo deve garantir que nenhuma
  decisão crítica (ex: negar crédito, diagnosticar doença) seja tomada por IA
  sem supervisão humana final.
- **Explicação (XAI):** O processo deve exigir que códigos críticos venham
  acompanhados de documentação explicativa (gerada e validada) que torne a
  lógica inteligível para auditores humanos.

### Gestão de Risco de Terceiros

- Depender de APIs da OpenAI/Anthropic é um risco de cadeia de suprimentos.
- O processo deve prever planos de contingência (fallback) caso o provedor de IA
  mude suas políticas, preços ou saia do ar.

## Checklist Prático

1. [ ] **Tagging Automático no Git:** Configure hooks que adicionam tags
   `ai-generated` ou `human-authored` nos commits baseados na ferramenta usada.
2. [ ] **Política de Retenção de Prompts:** Armazene os prompts que geraram
   features críticas por pelo menos 5 anos (ou conforme regulação local).
3. [ ] **Treinamento de Compliance:** Treine os devs não apenas em código, mas
   nas implicações legais de aceitar sugestões da IA (ex: risco de violação de
   copyright).
4. [ ] **Bloqueio de PII:** Implemente filtros no pipeline que impedem o envio
   de dados pessoais (PII) para APIs de IA externas.
5. [ ] **Relatório de Transparência:** Gere relatórios mensais mostrando a
   proporção de código IA vs. Humano para a diretoria.

## Armadilhas Comuns

- **Governança Fantasma:** Escrever políticas bonitas no Wiki que ninguém segue
  na prática porque as ferramentas não forçam o compliance.
- **Cegueira de Licença:** A IA sugere código que é cópia de uma biblioteca
  GPL/Copyleft. Se o processo não tiver scan de licença, você contamina seu
  código proprietário.
- **Viés Não Detectado:** A IA gera lógica de negócios com viés discriminatório
  (ex: em contratação ou crédito) e o processo de revisão técnica não pega
  porque foca só em sintaxe.

## Exemplo Mínimo: Pipeline de Governança

**Cenário:** Fintech desenvolvendo módulo de análise de risco.

**Processo de Governança:**

1. **Desenvolvimento:** Dev usa Copilot para gerar lógica.
2. **Commit:** O commit message deve incluir a tag `[AI-ASSISTED]`.
3. **CI (Automático):**
   - Scan de PII (garante que nenhum CPF real foi para o prompt).
   - Scan de Licença (garante que o código gerado não viola IP).
4. **Review (Humano):**
   - Checklist obrigatório: "Verifiquei viés?", "Verifiquei explicabilidade?".
   - Se o código afeta score de crédito, exige *dupla aprovação* (Dev Sênior +
     Compliance Officer).
5. **Audit Trail:** O sistema arquiva o snapshot do código + o prompt + a
   aprovação humana em um registro imutável.

## Resumo Executivo

- **Opacidade é Risco:** Você precisa iluminar a "caixa preta" da IA com
  registros detalhados de proveniência.
- **Humano é o Escudo Legal:** A aprovação humana é o que transforma uma saída
  estatística em uma decisão corporativa legalmente defensável.
- **Ferramentas > Políticas:** Automatize a governança no pipeline (CI/CD) em
  vez de confiar na memória dos devs.
- **Compliance é Contínuo:** Auditorias de código gerado devem ser rotina, não
  evento anual.

## Próximos Passos

- Estudar **13 - Segurança de Software** para aprofundar em proteção de dados e
  riscos de injeção.
- Consultar **14 - Prática Profissional** para aspectos éticos da engenharia com
  IA.
- Implementar ferramentas de **BOM (Software Bill of Materials)** que suportem
  metadados de IA.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação   | Justificativa                                                                                               |
| :------------------------------ | :---------- | :---------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Baixa**   | Regulações e necessidades de auditoria só tendem a aumentar e ficar mais complexas.                         |
| **Custo de Verificação**        | **Alto**    | Implementar rastreabilidade total custa processamento e armazenamento, mas é o preço da segurança jurídica. |
| **Responsabilidade Legal**      | **Crítica** | É aqui que a empresa se protege de processos multimilionários. Falhar na governança é falha existencial.    |

## Referências

1. **ISO**. *ISO/IEC 42001: Information Technology - Artificial Intelligence -
   Management System*. 2025.
2. **Gartner**. *Auditing Software Development Processes with AI Components*.
   2025\.
3. **NIST**. *AI Risk Management Framework (AI RMF 1.0)*. 2025.

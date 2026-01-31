---
title: "Elicitação de Contexto e Intenção"
created_at: "2025-01-31"
tags: ["requisitos", "elicitacao", "contexto", "intencao", "stakeholders", "rastreabilidade", "restricoes", "governanca", "human-in-the-loop"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Seção 2: Elicitação de Contexto e Intenção

## Overview

Esta seção reinterpreta a elicitação de requisitos na era de sistemas generativos e agentes: quando a implementação se torna barata, o principal fator de risco passa a ser a lacuna entre o que foi pedido e o que foi pretendido. Nesse cenário, a elicitação precisa capturar e manter, com rastreabilidade e verificabilidade, (i) o contexto operacional em que o sistema deve funcionar, (ii) a intenção que dá sentido aos requisitos e (iii) as restrições que delimitam comportamentos aceitáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Distinguir requisito, intenção, contexto e restrição, e explicar por que essa separação reduz ambiguidade e retrabalho
2. Identificar dimensões de contexto relevantes (negócio, dados, técnica, operação, organização e regulação) e documentá-las como artefatos verificáveis
3. Aplicar técnicas de elicitação orientadas a propósito (por exemplo, 5 Whys, laddering e JTBD) para derivar restrições e critérios de aceitação
4. Produzir documentação de intenção e de contexto adequada a consumo humano e a automações (com campos obrigatórios, rastreabilidade e critérios de verificação)

## 2.1 Por que contexto e intenção se tornam o eixo da elicitação

No SWEBOK v4, dois problemas recorrentes em requisitos são incompletude e ambiguidade: informações relevantes deixam de ser reveladas, ou são expressas de modo aberto a interpretações múltiplas. Na prática, esses problemas geram decisões de design e construção que se amplificam em cascata, elevando custo e risco (IEEE COMPUTER SOCIETY, 2024).

Em sistemas com alta capacidade de geração e recombinação de soluções, essas falhas passam a ter um efeito adicional: uma especificação vaga tende a produzir soluções que parecem plausíveis e coerentes, mas que podem violar intenção, políticas internas, obrigações regulatórias ou limites de risco. Assim, a elicitação deixa de ser apenas um mecanismo de coleta de "desejos" e passa a ser um mecanismo de contenção: explicitar fronteiras, suposições e motivos.

Nota de recontextualização (LEGADO): a prática de tratar elicitação como levantamento de funcionalidades isoladas, sem racional e sem contexto operacional, é inadequada quando componentes autônomos podem preencher lacunas com suposições implícitas.

## 2.2 Uma taxonomia operacional de contexto

Contexto, nesta seção, é o conjunto de condições que afeta a interpretação de requisitos e determina o que é aceitável, viável e verificável. Para evitar que "contexto" se torne um termo abstrato, recomenda-se tratá-lo como dimensões com campos observáveis.

| Dimensão | Perguntas de elicitação | Evidências/artefatos verificáveis |
|----------|--------------------------|-----------------------------------|
| Negócio | Qual objetivo, qual risco, qual critério de sucesso? | Objetivos mensuráveis, riscos priorizados, critérios de aceitação |
| Dados | Que dados existem, de onde vêm, quem é dono, qual qualidade? | Catálogo de dados, proveniência, políticas de retenção, classificação (PII/segredo) |
| Técnica | Quais integrações e restrições de plataforma existem? | Diagrama de contexto/sistemas externos, contratos de interface, limitações explícitas |
| Operação | Como o sistema será monitorado, operado e auditado? | SLIs/SLOs, requisitos de logging/auditoria, planos de rollback e incident response |
| Organização | Quem decide, quem aprova, quem opera, quem responde? | Mapa de stakeholders, matriz RACI, políticas de segregação de funções |
| Regulação e compliance | Que obrigações se aplicam e como se demonstram? | Obrigações citadas, controles exigidos, trilhas de evidência (NIST, 2023; UNIÃO EUROPEIA, 2024) |

Do ponto de vista de verificação, a dimensão de dados merece destaque: erros de contexto frequentemente são erros de fronteira de dados (por exemplo, confundir dados de teste e produção, misturar tenants, ignorar regras de retenção). Por isso, a elicitação deve produzir declarações explícitas de origem, permissões e finalidade.

## 2.3 Elicitação de intenção: do "o que" ao "por quê" verificável

Nesta seção, intenção é o propósito subjacente que justifica requisitos e restrições. Em geral, uma intenção bem formulada tem três propriedades: (i) explicita o objetivo e o risco protegido, (ii) orienta trade-offs e (iii) é operacionalizável em restrições e critérios de aceitação.

Uma forma prática de manter a distinção é trabalhar com quatro categorias:

| Categoria | Definição operacional | Exemplo |
|----------|------------------------|---------|
| Requisito | Propriedade desejada do sistema (o que) | "Registrar auditoria de alterações de perfil" |
| Intenção | Propósito que dá sentido e prioridade (por quê) | "Possibilitar responsabilização e conformidade" |
| Restrição | Limite explícito (o que nao pode acontecer) | "Nao registrar dados sensiveis em logs" |
| Hipótese | Suposição a validar (o que acreditamos) | "A maioria dos acessos ocorre em horario comercial" |

Técnicas clássicas para elicitar intenção continuam válidas, desde que conectadas a verificabilidade:

- 5 Whys: útil para separar solução proposta de problema real (IEEE COMPUTER SOCIETY, 2024).
- Laddering: útil para transitar de atributos percebidos a valores/objetivos, desde que a saída seja convertida em restrições e critérios de aceitação (REYNOLDS; GUTMAN, 1988).
- JTBD: útil para explicitar o "trabalho" e o resultado desejado, com implicações para qualidade e riscos (CHRISTENSEN et al., 2016).

## 2.4 Artefatos de elicitação como insumos para verificação

Em uma prática verification-centric, a elicitação deve produzir artefatos que sejam:

1. rastreáveis (têm fonte, dono e justificativa);
2. verificáveis (têm critérios e mecanismo de demonstração);
3. versionáveis (têm histórico e evolução);
4. auditáveis (têm trilha de decisão e de exceção).

### 2.4.1 Modelo de ficha de intenção (artefato mínimo)

O objetivo do modelo abaixo nao é prescrever ferramenta; é padronizar informação para revisão humana e para automações de verificação.

```markdown
## Intencao: [nome curto e operacional]

**Problema**: [qual problema esta sendo resolvido]

**Motivacao**: [por que isso importa; risco protegido; obrigacao externa, se houver]

**Escopo**:
- Inclui: [o que esta dentro]
- Exclui: [o que esta fora]

**Suposicoes (hipoteses)**:
- [H1] ... (como validar)
- [H2] ... (como validar)

**Restricoes derivadas (nao negociaveis)**:
- [R1] ... (criterio de verificacao)
- [R2] ... (criterio de verificacao)

**Trade-offs aceitos**:
- [T1] ... (impacto)

**Dono e aprovadores**: [papel/responsavel]
**Evidencias exigidas**: [logs, testes, revisoes, auditorias]
**Validade/expiracao**: [quando reavaliar]
```

### 2.4.2 Artefatos complementares (quando o risco justifica)

| Artefato | O que resolve | Quando se torna obrigatorio |
|----------|---------------|-----------------------------|
| Mapa de stakeholders | viés e omissoes de fonte | quando ha conflito, alto impacto ou multipla governanca |
| Diagrama de contexto | fronteiras e integrações | quando ha dados sensiveis, multiplos sistemas ou terceiros |
| Catálogo de restrições | contenção e verificabilidade | quando ha automacao significativa ou risco de falhas silenciosas |
| Registro de decisões | auditabilidade e accountability | quando ha trade-offs relevantes ou excecoes recorrentes |

## 2.5 Processo de elicitação em ciclos (contexto como ativo vivo)

Ao invés de tratar elicitação como fase única, recomenda-se um ciclo de quatro etapas, com critérios de parada e reabertura:

```
descobrir -> estruturar -> validar -> operar
   ^                               |
   +----------- reavaliar ----------+
```

1. Descobrir: coletar fontes (pessoas, documentos, sistemas legados, obrigações externas).
2. Estruturar: converter narrativas em intenções, restrições, hipóteses e critérios de aceitação.
3. Validar: revisar com stakeholders e, quando aplicável, definir pontos de supervisão humana.
4. Operar: monitorar sinais de desvio (mudança de contexto, incidentes, drift) e reabrir a elicitação quando necessário.

Este ciclo é compatível com a visão do SWEBOK v4 de que requisitos são refinados ao longo do ciclo de vida (IEEE COMPUTER SOCIETY, 2024) e com abordagens contemporâneas de gestão de risco em IA, que enfatizam monitoramento contínuo e evidências de controle (NIST, 2023).

## 2.6 Anti-padrões recorrentes e mitigações

| Anti-padrão | Sintoma | Mitigação |
|------------|---------|----------|
| "Lavagem" de intenção | requisitos aparecem como lista de features sem racional | exigir campo de motivacao e risco protegido; revisar com base em evidencias |
| Solucionismo prematuro | uma solucao e confundida com requisito | aplicar 5 Whys; explicitar alternativas e trade-offs |
| Contexto implícito | regras de negocio ficam "na cabeça" da equipe | registrar suposicoes e fontes; definir dono e validade |
| Critérios não verificáveis | frases aspiracionais (ex.: "ser seguro") | reescrever como restricoes observaveis + criterio de verificacao |
| Autonomia sem fronteiras | automacoes executam acoes irreversiveis sem controle | definir pontos de supervisao humana por risco e reversibilidade |

## 2.7 Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — a necessidade de explicitar contexto, intenção e restrições tende a crescer com a autonomia de sistemas |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — validar contexto e intenção demanda conhecimento do domínio, acesso a stakeholders e julgamento técnico |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — falhas de elicitação podem produzir violações regulatórias, riscos operacionais e danos a terceiros (NIST, 2023; UNIÃO EUROPEIA, 2024) |

## 2.8 Exercícios

1. Para um sistema de e-commerce, defina duas intenções de negócio e derive, para cada uma, ao menos três restrições verificáveis (incluindo pelo menos uma restrição de dados).
2. Reescreva o requisito "o sistema deve ser seguro" como um conjunto mínimo de restrições observáveis e critérios de verificação.
3. Produza uma ficha de intenção para um recurso de recomendação que opere sob supervisão humana por exceção (human-on-the-loop) e defina critérios de escalonamento.

## Practical Considerations

- Trate contexto como ativo: registre suposições, fontes e validade; reabra elicitação quando o ambiente mudar.
- Exija rastreabilidade: cada requisito e restrição deve apontar para uma intenção e para uma fonte (stakeholder, norma, incidente ou evidência).
- Prefira critérios verificáveis: converta frases vagas em propriedades observáveis com mecanismo de demonstração.
- Separe intenção de solução: documente trade-offs e alternativas, e use intenção para arbitrar conflitos.
- Defina quando supervisão humana é obrigatória: use risco, irreversibilidade e obrigações regulatórias como critérios.

## Summary

- Elicitar contexto e intenção reduz ambiguidade e incompletude e diminui retrabalho em cascata.
- Contexto deve ser tratado como dimensões operacionais com evidências verificáveis (especialmente dados e operação).
- Intenção conecta requisitos a riscos e orienta trade-offs; restrições operacionalizam a intenção como limites verificáveis.
- Artefatos padronizados (ficha de intenção, catálogo de restrições, registro de decisões) sustentam verificação, auditoria e evolução.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering -- Life cycle processes -- Requirements engineering. ISO/IEC/IEEE, 2018.
3. NIST. Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST, 2023. Disponível em: https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf. Acesso em: 31 jan. 2026.
4. UNIÃO EUROPEIA. Regulamento (UE) 2024/1689 (AI Act): regras harmonizadas em materia de inteligencia artificial. 2024. Disponível em: https://eur-lex.europa.eu/eli/reg/2024/1689/oj. Acesso em: 31 jan. 2026.
5. REYNOLDS, T. J.; GUTMAN, J. Laddering theory, method, analysis, and interpretation. Journal of Advertising Research, 1988.
6. CHRISTENSEN, C. M.; HALL, T.; DILLON, K.; DUNCAN, D. Competing Against Luck: The Story of Innovation and Customer Choice. HarperBusiness, 2016.

*SWEBOK-AI v5.0 - Software Requirements*

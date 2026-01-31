---
title: "Apendice B: Padroes ISO/IEC e IEEE (Atualizado 2024-2025)"
created_at: "2026-01-31"
tags: ["apendice", "padroes", "iso-iec", "ieee", "conformidade", "swebok-ai"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Apendice B: Padroes ISO/IEC e IEEE (Atualizado 2024-2025)

## Overview
Este apendice descreve o panorama de standards relevantes para engenharia de software na era de sistemas com componentes de IA (incluindo LLMs e arquiteturas com agentes), com foco em 2024-2025. O objetivo e apoiar:

- selecao de controles e evidencias (governanca e auditoria)
- alinhamento de praticas de engenharia com requisitos externos
- referencia cruzada (Ap. E) entre KAs e standards

O SWEBOK-AI nao substitui standards. Ele sintetiza conhecimento geralmente reconhecido e aponta como e por que cada standard pode ser aplicado.

## Learning Objectives
Apos estudar este apendice, o leitor deve ser capaz de:
1. Diferenciar standards de sistema de gestao (MSS) de standards de processo, produto e avaliacao.
2. Selecionar um conjunto minimo de standards por objetivo (governanca, risco, V&V, qualidade, seguranca).
3. Usar standards como mecanismos de verificacao e de evidencia, nao como "receitas" prescritivas.

## B.1 Como ler este apendice

### B.1.1 Tipos de standards
- Sistema de gestao (MSS): estrutura de governanca e melhoria continua (ex.: AIMS).
- Governanca: orienta o corpo diretivo e a supervisao organizacional.
- Risco: define processos de identificacao, avaliacao e tratamento.
- Engenharia (ciclo de vida): processos e artefatos para construir e manter sistemas.
- Teste e avaliacao: praticas de verificacao e validacao (V&V) e qualidade.

### B.1.2 Regra pratica
Use MSS e governanca para definir "quem decide" e "como prova"; use standards de engenharia para definir "o que produzir"; use standards de teste para definir "como verificar".

## B.2 Standards centrais para governanca e risco em IA

### B.2.1 Sistema de gestao de IA (AIMS)
- ISO/IEC 42001:2023 define requisitos para estabelecer, implementar, manter e melhorar continuamente um Artificial Intelligence Management System (AIMS).
- ISO/IEC 42006:2025 define requisitos adicionais para organismos que auditam e certificam AIMS (baseado em ISO/IEC 17021-1).

### B.2.2 Governanca do uso de IA
- ISO/IEC 38507:2022 orienta implicacoes de governanca para o uso de IA por organizacoes, com foco no corpo diretivo.

### B.2.3 Gestao de risco especifica para IA
- ISO/IEC 23894:2023 fornece orientacoes para gestao de risco para organizacoes que desenvolvem, produzem, implantam ou usam IA.
- NIST AI RMF 1.0 (2023) e um framework voluntario, amplamente referenciado, para mapear, medir, gerenciar e governar riscos de IA.

### B.2.4 Regulacao baseada em risco (contexto)
- O EU AI Act (Regulation (EU) 2024/1689) consolida um regime regulatorio baseado em risco. Mesmo fora da UE, ele funciona como referencia para exigencias de documentacao, governanca e avaliacao.

## B.3 Standards de engenharia de software e ciclo de vida (base)
Embora o foco do SWEBOK-AI seja AI-first, o fundamento de ciclo de vida permanece relevante.

- ISO/IEC/IEEE 12207 (processos de ciclo de vida de software)
- ISO/IEC/IEEE 15288 (processos de ciclo de vida de sistemas)
- ISO/IEC/IEEE 29148 (engenharia de requisitos)
- ISO/IEC/IEEE 42010 (descricao de arquitetura)

No contexto de IA, a mudanca tipica nao e substituir estes standards, mas estender evidencias: dados, avaliacao de modelo, drift, e governanca de mudancas de comportamento.

## B.4 Standards de teste, verificacao e validacao para IA

### B.4.1 Aplicacao de praticas de teste a sistemas de IA
- ISO/IEC TS 42119-2:2025 fornece requisitos e orientacoes para aplicar a serie ISO/IEC/IEEE 29119 ao teste de sistemas de IA, com abordagem baseada em risco.
- ISO/IEC DTS 42119-3 (em desenvolvimento, 2025) trata de analise de verificacao e validacao de sistemas de IA.

### B.4.2 Etica e valores no design (com implicacoes de V&V)
- IEEE 7000-2021 define um processo-modelo para enderecar preocupacoes eticas durante o design de sistemas.

## B.5 Standards de qualidade, seguranca e privacidade (relevantes para IA)
Em IA, requisitos de qualidade e seguranca tendem a se manifestar como controles operacionais verificaveis (monitoramento, logging, avaliacao, resposta a incidentes) e como requisitos de dados.

- Serie ISO/IEC 27000 (seguranca da informacao), incluindo ISO/IEC 27001
- Standards de privacidade e gestao de informacao (ex.: extensoes e guias correlatos)
- Standards de qualidade de software/sistemas e atributos de qualidade (ex.: SQuaRE)

## B.6 Tabela de selecao rapida (minimo viavel)

| Objetivo | Standards principais | Evidencia tipica |
|----------|---------------------|------------------|
| Governanca organizacional | ISO/IEC 38507; ISO/IEC 42001 | politicas, papeis, atas, KPI de governanca |
| Certificacao / auditoria de AIMS | ISO/IEC 42006; ISO/IEC 42001 | evidencias de auditoria, competencia, trilha de decisao |
| Gestao de risco de IA | ISO/IEC 23894; NIST AI RMF | registro de riscos, tratamentos, monitoramento |
| Teste de sistemas de IA | ISO/IEC TS 42119-2 | plano de teste, metricas, criterios de aceitacao |
| Processo etico no design | IEEE 7000-2021 | analise de valores, trade-offs, decisao registrada |
| Conformidade regulatoria (contexto) | EU AI Act (2024/1689) | documentacao, avaliacao, governanca baseada em risco |

## Practical Considerations
- Evite "checklists cegos": o valor do standard esta em criar evidencias e capacidade de auditoria, nao em marcar caixas.
- Diferencie obrigacao legal de aderencia voluntaria; ambas podem coexistir.
- Padroes em evolucao (por exemplo, partes da serie 42119) mudam rapido; trate-os como "monitorar" e versionar seu programa de conformidade.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Baixo |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary
- Standards de IA em 2024-2025 enfatizam governanca, risco e teste, alem de processo de engenharia.
- ISO/IEC 42001 e o eixo de AIMS; ISO/IEC 42006 operacionaliza auditoria e certificacao.
- ISO/IEC 23894 e NIST AI RMF estruturam risco; ISO/IEC TS 42119 conecta teste de software a teste de IA.

## References
1. ISO. ISO/IEC 42001:2023 - Information technology — Artificial intelligence — Management system. 2023. Disponivel em: https://www.iso.org/standard/81230.html.
2. ISO. ISO/IEC 42006:2025 - Requirements for bodies providing audit and certification of artificial intelligence management systems. 2025. Disponivel em: https://www.iso.org/standard/44546.html.
3. ISO. ISO/IEC 23894:2023 - Information technology — Artificial intelligence — Guidance on risk management. 2023. Disponivel em: https://www.iso.org/standard/77304.html.
4. ISO. ISO/IEC 38507:2022 - Governance implications of the use of artificial intelligence by organizations. 2022. Disponivel em: https://www.iso.org/standard/56641.html.
5. ISO. ISO/IEC TS 42119-2:2025 - Artificial intelligence — Testing of AI — Part 2: Overview of testing AI systems. 2025. Disponivel em: https://www.iso.org/standard/84127.html.
6. ISO. ISO/IEC DTS 42119-3 - Artificial intelligence — Testing of AI — Part 3: Verification and validation analysis of AI systems. 2025 (em desenvolvimento). Disponivel em: https://www.iso.org/standard/85072.html.
7. IEEE. IEEE 7000-2021 - IEEE Standard Model Process for Addressing Ethical Concerns during System Design. 2021. Disponivel em: https://standards.ieee.org/standard/7000-2021.html.
8. NIST. AI Risk Management Framework (AI RMF 1.0). 2023. Disponivel em: https://www.nist.gov/itl/ai-risk-management-framework.
9. Uniao Europeia. Regulation (EU) 2024/1689 (EU AI Act). 2024. Disponivel em: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng.

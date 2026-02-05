---
title: "Apêndice E: Matriz de Conformidade SWEBOK-AI vs. Padroes"
created_at: "2026-01-31"
tags: ["apendice", "conformidade", "governanca", "padroes", "swebok-ai"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Apêndice E: Matriz de Conformidade SWEBOK-AI vs. Padroes

## Overview
Este apendice mapeia, em alto nivel, as KAs do SWEBOK-AI v5.0 para standards e referencias normativas relevantes. O objetivo nao e declarar conformidade automaticamente, mas facilitar:

- selecao de standards por KA
- rastreabilidade entre praticas de engenharia e exigencias externas
- desenho de evidencias minimas por tema (risco, governanca, teste, etica)

O mapeamento deve ser interpretado como "relacao provavel"; a aplicacao real depende do contexto, risco e regime regulatorio.

## Learning Objectives
Apos estudar este apendice, o leitor deve ser capaz de:
1. Relacionar uma KA a um conjunto minimo de standards para evidencias e auditoria.
2. Identificar lacunas: onde um KA exige suporte normativo adicional (por exemplo, risco, governanca, V&V).
3. Definir uma estrategia de conformidade baseada em risco, sem transformar o SWEBOK-AI em checklist.

## E.1 Convencoes da matriz
- "Core" indica standards frequentemente necessarios independentemente de dominio.
- "Contexto" indica dependencias por risco/regulacao.
- Para standards de engenharia de ciclo de vida (ISO/IEC/IEEE 12207/15288/29148/42010), o SWEBOK-AI assume uso como base, com extensoes AI-centric.

## E.2 Matriz (KA -> standards)

| KA (SWEBOK-AI v5.0) | Standards e referencias (core) | Standards e referencias (contexto) |
|---------------------|-------------------------------|------------------------------------|
| 01 - Engenharia de Restricoes e Contexto | ISO/IEC 23894; ISO/IEC 42001 | EU AI Act; NIST AI RMF |
| 02 - Arquitetura de Sistemas Hibridos | ISO/IEC 42001; IEEE 7000-2021 | ISO/IEC TS 42119-2 (evidencias para V&V de arquitetura) |
| 03 - Design de Sistemas Hibridos | IEEE 7000-2021; ISO/IEC 42001 | EU AI Act (requisitos de transparencia/uso) |
| 04 - Orquestracao e Curadoria de Codigo | ISO/IEC 42001; ISO/IEC 23894 | NIST AI RMF; TS 42119 (teste de sistemas de IA) |
| 05 - Verificacao e Validacao em Escala | ISO/IEC TS 42119-2; ISO/IEC 23894 | ISO/IEC DTS 42119-3 |
| 06 - Software Engineering Operations | ISO/IEC 42001; ISO/IEC 23894 | EU AI Act (monitoramento e incidentes) |
| 07 - Manutencao de Sistemas Opacos | ISO/IEC 42001; ISO/IEC 23894 | EU AI Act; NIST AI RMF |
| 08 - Software Configuration Management | ISO/IEC 42001 | NIST AI RMF |
| 09 - Software Engineering Management | ISO/IEC 42001; ISO/IEC 38507 | EU AI Act |
| 10 - Software Engineering Process | ISO/IEC 42001; ISO/IEC 23894 | NIST AI RMF |
| 11 - Models and Methods | ISO/IEC 23894; ISO/IEC 42001 | TS 42119 (quando houver avaliacao/validacao formal) |
| 12 - Software Quality | ISO/IEC TS 42119-2; ISO/IEC 42001 | EU AI Act (qualidade e transparencia por risco) |
| 13 - Software Security | ISO/IEC 23894; ISO/IEC 42001 | EU AI Act (seguranca/abuso em alto risco) |
| 14 - Professional Practice | ISO/IEC 38507; IEEE 7000-2021 | EU AI Act |
| 15 - Economics | ISO/IEC 42001 (custos de governanca); ISO/IEC 23894 (custo de risco) | Relatorios setoriais (quando exigidos por auditoria interna) |
| 16 - Fundamentos de Sistemas Cognitivos Artificiais | ISO/IEC 42001; ISO/IEC 23894 | NIST AI RMF |
| 17 - Governanca de IA para Engenharia de Software | ISO/IEC 42001; ISO/IEC 42006; ISO/IEC 38507 | EU AI Act |
| 18 - Engenharia de Manutencao de Sistemas Opacos (novo) | ISO/IEC 42001; ISO/IEC 23894 | EU AI Act |

## E.3 Como usar esta matriz para evidencias
Um padrao pratico para cada KA:

1. Selecionar "core" como baseline.
2. Selecionar "contexto" com base no risco e na regulacao aplicavel.
3. Definir evidencias minimas (artefatos) por standard: politica, registro de risco, plano de teste, trilha de decisao.

## Practical Considerations
- Evite "conformidade por citacao": citar um standard nao prova nada; o que prova e evidencia operacional.
- Se voce precisa de auditoria/certificacao de AIMS, inclua desde cedo requisitos de trilha de decisao e governanca (ISO/IEC 42006 implica capacidade de auditoria).
- Trate mudancas de modelo e de prompt como mudancas de comportamento; atualize avaliacao e risco como parte da gestao de configuracao.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary
- A matriz fornece um "crosswalk" pratico: KA -> standards, para apoiar evidencias e auditoria.
- Standards de AIMS (42001/42006) e risco (23894/NIST AI RMF) atravessam a maioria das KAs.
- Conformidade deve ser implementada como evidencias verificaveis, nao como checklist.

## References
1. ISO. ISO/IEC 42001:2023 - Artificial intelligence management system. 2023. Disponivel em: https://www.iso.org/standard/81230.html.
2. ISO. ISO/IEC 42006:2025 - Requirements for AIMS audit and certification bodies. 2025. Disponivel em: https://www.iso.org/standard/44546.html.
3. ISO. ISO/IEC 23894:2023 - Guidance on risk management. 2023. Disponivel em: https://www.iso.org/standard/77304.html.
4. ISO. ISO/IEC 38507:2022 - Governance implications of the use of artificial intelligence by organizations. 2022. Disponivel em: https://www.iso.org/standard/56641.html.
5. ISO. ISO/IEC TS 42119-2:2025 - Overview of testing AI systems. 2025. Disponivel em: https://www.iso.org/standard/84127.html.
6. IEEE. IEEE 7000-2021 - Model Process for Addressing Ethical Concerns during System Design. 2021. Disponivel em: https://standards.ieee.org/standard/7000-2021.html.
7. NIST. AI Risk Management Framework (AI RMF 1.0). 2023. Disponivel em: https://www.nist.gov/itl/ai-risk-management-framework.
8. Uniao Europeia. Regulation (EU) 2024/1689 (EU AI Act). 2024. Disponivel em: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng.

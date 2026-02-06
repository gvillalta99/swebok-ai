---
title: "Apêndice E: Matriz de Conformidade SWEBOK-AI vs. Padrões"
created_at: "2026-02-05"
tags: ["apendice", "conformidade", "governanca", "padroes", "swebok-ai"]
status: "review"
updated_at: "2026-02-05"
ai_model: "kimi-k2.5"
---

# Apêndice E: Matriz de Conformidade SWEBOK-AI vs. Padrões

## Overview

Este apêndice mapeia as Knowledge Areas (KAs) do SWEBOK-AI v5.0 para os padrões ISO/IEC/IEEE e referências normativas relevantes. O objetivo não é burocratizar o desenvolvimento, mas fornecer um mapa claro para:

1.  **Auditoria:** Quais normas citar em uma defesa de conformidade técnica.
2.  **Segurança Jurídica:** Quais padrões mitigam a responsabilidade civil e penal em casos de falha de IA.
3.  **Rastreabilidade:** Conectar práticas de engenharia a exigências externas (como o EU AI Act).

## Learning Objectives

Após estudar este apêndice, o leitor deve ser capaz de:

1.  **Selecionar** os padrões aplicáveis para cada fase do ciclo de vida de desenvolvimento com IA.
2.  **Identificar** lacunas de conformidade em seus processos atuais.
3.  **Estruturar** evidências de auditoria baseadas em normas reconhecidas internacionalmente.

## E.1 Matriz de Conformidade

A tabela abaixo relaciona cada KA aos padrões de engenharia de software (base) e aos novos padrões de IA (específicos).

| KA SWEBOK-AI | Padrões ISO/IEC/IEEE Relacionados | Padrões de IA Específicos |
| :--- | :--- | :--- |
| **01 - Engenharia de Restrições** | ISO/IEC/IEEE 29148 (Requisitos) | ISO/IEC 23894 (Risco), IEEE 7000 (Ética) |
| **02 - Arquitetura de Sistemas Híbridos** | ISO/IEC/IEEE 42010 (Arquitetura) | IEEE P360 (Arquitetura de IA), ISO/IEC 42001 |
| **03 - Design de Sistemas Hibridos** | ISO/IEC/IEEE 12207 (Design) | IEEE 2857 (Privacidade), IEEE P3549 (Inferência) |
| **04 - Orquestração e Curadoria de Código** | ISO/IEC/IEEE 12207 (Implementação) | - |
| **05 - Verificação e Validação em Escala** | ISO/IEC/IEEE 29119 (Teste) | ISO/IEC TS 42119-2 (Teste de IA), TS 42119-3 |
| **06 - Operações de Engenharia (DevOps)** | ISO/IEC/IEEE 12207 (Operação) | ISO/IEC 42001 (AIMS - Operação) |
| **07 - Manutenção de Sistemas Opaços** | ISO/IEC/IEEE 14764 (Manutenção) | ISO/IEC 42001 (AIMS - Melhoria Contínua) |
| **08 - Gestão de Configuração** | ISO/IEC/IEEE 828 (CM) | ISO/IEC 42001 (Controle de Documentação) |
| **09 - Gestão de Engenharia** | ISO/IEC/IEEE 12207 (Gestão) | ISO/IEC 38507 (Governança), ISO/IEC 42006 |
| **10 - Processos de Engenharia** | ISO/IEC/IEEE 12207 (Ciclo de Vida) | ISO/IEC 42001 (Sistema de Gestão) |
| **11 - Modelos e Métodos** | ISO/IEC/IEEE 24748 (Ciclo de Vida) | - |
| **12 - Qualidade de Software** | ISO/IEC 25010 (SQuaRE) | ISO/IEC 25059 (Qualidade para IA) |
| **13 - Segurança** | ISO/IEC 27001 (ISMS) | ISO/IEC 27090 (Segurança de IA), NIST AI RMF |
| **14 - Prática Profissional** | ISO/IEC 24773 (Certificação) | IEEE 7000 (Ética no Design) |
| **15 - Economia com IA** | ISO/IEC/IEEE 15288 (Sistemas) | - |
| **16 - Fundamentos de Sistemas Cognitivos** | - | ISO/IEC 42001, 22989 (Terminologia) |

## E.2 Guia de Uso da Matriz

### 1. Para Auditoria ISO/IEC 42001
Se sua organização busca certificação ISO 42001 (AIMS), foque nos KAs **06 (Operações)**, **09 (Gestão)** e **12 (Qualidade)**. A matriz mostra que a conformidade exige não apenas processos de gestão, mas evidências técnicas de teste (KA 05 - TS 42119) e risco (KA 01 - ISO 23894).

### 2. Para Conformidade com o EU AI Act
O regulamento europeu exige gestão de risco robusta para sistemas de alto risco. Utilize o mapeamento do **KA 01 (Engenharia de Restrições)** com a **ISO/IEC 23894** para garantir que a identificação e mitigação de riscos (viés, segurança) estejam documentadas desde a concepção.

### 3. Para Segurança Jurídica
Em caso de litígio envolvendo falhas de um agente autônomo, demonstrar que o desenvolvimento seguiu o **IEEE 7000 (Ética)** no **KA 14** e o **ISO/IEC TS 42119 (Teste)** no **KA 05** constitui uma forte defesa de diligência técnica (due diligence).

## Practical Considerations

*   **Não invente a roda:** Se existe um padrão ISO para teste de IA (42119), use a terminologia e as classes de teste dele. Inventar seus próprios métodos enfraquece sua posição em uma auditoria.
*   **Padrões são evidência:** Documentar "Testamos o modelo" é fraco. Documentar "Executamos testes de robustez conforme ISO/IEC TS 42119-2, seção 5.3" é forte.
*   **Gestão de Risco é o centro:** Note que a ISO 23894 aparece em múltiplos KAs. A gestão de risco é o processo integrador da engenharia de IA.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | Esta matriz será obsoleta em 36 meses? | Baixa (Padrões evoluem devagar) |
| **Custo de Verificação** | Custo de manter o mapeamento atualizado? | Médio |
| **Responsabilidade Legal** | Impacto de ignorar a conformidade? | Crítico |

## Summary

*   A matriz conecta o "o quê" (SWEBOK) ao "como provar" (Normas).
*   **ISO/IEC 42001** e **ISO/IEC 23894** são os pilares transversais de conformidade para IA.
*   O uso de padrões reconhecidos reduz a responsabilidade legal e facilita a venda para clientes corporativos (B2B) e governamentais.

## References

1.  **ISO/IEC.** *ISO/IEC 42001:2023 — Information technology — Artificial intelligence — Management system*. 2023.
2.  **ISO/IEC.** *ISO/IEC 23894:2023 — Artificial intelligence — Guidance on risk management*. 2023.
3.  **ISO/IEC.** *ISO/IEC TS 42119-2:2025 — Artificial intelligence — Testing of AI*. 2025.
4.  **ISO/IEC.** *ISO/IEC 25059:2023 — Systems and software Quality Requirements and Evaluation (SQuaRE) — Quality model for AI systems*. 2023.
5.  **IEEE.** *IEEE Std 7000-2021 — IEEE Standard Model Process for Addressing Ethical Concerns during System Design*. 2021.

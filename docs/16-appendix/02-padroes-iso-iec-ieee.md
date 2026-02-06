---
title: 'Apêndice B: Padrões IEEE e ISO/IEC - Versão Atualizada'
created_at: '2026-02-05'
tags: [apendice, padroes, iso-iec, ieee, conformidade, swebok-ai]
status: in-progress
updated_at: '2026-02-05'
ai_model: kimi-k2.5
---

# Apêndice B: Padrões IEEE e ISO/IEC - Versão Atualizada

## Visão Geral

Este apêndice mapeia o panorama normativo para a engenharia de software na era
da IA (2024-2025). Diferente das versões anteriores do SWEBOK, onde os padrões
eram estáveis, o cenário atual é marcado pela emergência rápida de normas
específicas para **sistemas de gestão de IA** (ISO/IEC 42001), **teste de
sistemas não determinísticos** (ISO/IEC TS 42119) e **hardware especializado**
(IEEE P3540).

O SWEBOK-AI não substitui estes padrões. Ele sintetiza o "conhecimento
geralmente reconhecido" e aponta como cada norma serve como mecanismo de
verificação, evidência e governança.

## Objetivos de Aprendizagem

Após estudar este apêndice, o leitor deve ser capaz de:

1. **Distinguir** entre padrões de sistema de gestão (MSS), padrões de processo
   de engenharia e padrões de produto/hardware.
2. **Selecionar** o conjunto correto de normas para conformidade regulatória
   (ex: EU AI Act) e auditoria técnica.
3. **Integrar** requisitos de novos padrões (como ISO/IEC 42001) em processos
   tradicionais de software (como ISO/IEC/IEEE 12207).

## B.1 Padrões Fundamentais de IA (NOVO)

Esta categoria define a infraestrutura de governança e qualidade específica para
Inteligência Artificial.

### Série ISO/IEC 42000 (Gestão e Certificação)

- **ISO/IEC 42001:2023 (Artificial Intelligence Management System - AIMS):**

  - *O que é:* O "ISO 9001 da IA". É o primeiro padrão internacional
    certificável para sistemas de gestão de IA.
  - *Uso:* Define requisitos para estabelecer, implementar, manter e melhorar
    continuamente um AIMS. Foca em governança organizacional, não em detalhes
    técnicos de modelos.

- **ISO/IEC 42006:2025 (Requisitos para Auditoria e Certificação):**

  - *O que é:* A norma para quem audita. Define os requisitos para organismos
    que certificam a conformidade com a 42001.
  - *Uso:* Essencial para entender o que será cobrado em uma auditoria externa.

### Série ISO/IEC TS 42119 (Teste de IA)

- **ISO/IEC TS 42119-2:2025 (Testing of AI Systems - Overview):**

  - *O que é:* Abordagem baseada em risco para testar sistemas que incluem
    componentes de IA.
  - *Uso:* Define classes de teste para lidar com saídas estocásticas e drift de
    modelo.

- **ISO/IEC TS 42119-3:2024 (Verification and Validation Analysis):**

  - *O que é:* Processos detalhados de V&V para sistemas de IA.
  - *Uso:* Diferenciação clara entre verificação (o modelo foi construído
    certo?) e validação (o modelo atende ao uso pretendido?).

## B.2 Padrões de Engenharia de Software com IA

Atualizações de normas tradicionais para acomodar componentes cognitivos.

- **ISO/IEC/IEEE 12207:2017 (Software Life Cycle Processes):**

  - *Status:* **Atualizado via interpretação.** Embora o texto base seja de
    2017, sua aplicação em 2025 exige a inclusão de processos de curadoria de
    dados e treinamento de modelos como atividades de "Implementação".

- **ISO/IEC TR 29119-11:2020/2024 (Guidelines on Testing AI-based Systems):**

  - *Status:* Extensão da norma de teste (29119) focada em propriedades
    específicas de ML, como viés e robustez adversária.

- **ISO/IEC 25010:2023 (Quality Models - SQuaRE):**

  - *Status:* **Revisado.** O modelo de qualidade agora acomoda explicitamente
    características críticas para IA, como "ausência de risco" (freedom from
    risk) e "confiabilidade" em contextos probabilísticos.

## B.3 Padrões de Governança e Ética

Focam na responsabilidade e no impacto humano.

- **ISO/IEC 38507:2024 (Governance Implications):**

  - *Foco:* Corpo diretivo. Define como a alta gestão deve supervisionar o uso
    de IA, abordando responsabilidade legal e ética.

- **ISO/IEC 23894:2024 (Risk Management for AI):**

  - *Foco:* Gestão de risco. Estende a ISO 31000 para riscos específicos de IA
    (ex: alucinação, viés, explicabilidade). Fundamental para conformidade com o
    EU AI Act.

- **IEEE 7000-2022 (Ethical Concerns during System Design):**

  - *Foco:* Design. Um processo-modelo para identificar e mitigar valores éticos
    em conflito durante a engenharia de requisitos e arquitetura.

- **IEEE 2857-2024 (Privacy Engineering for AI):**

  - *Foco:* Privacidade. Técnicas para gestão de dados pessoais em treinamento e
    inferência, abordando riscos como inversão de modelo.

## B.4 Padrões de Hardware para IA

Hardware especializado (NPUs, TPUs) agora tem normas próprias.

- **IEEE P3540 (Technical Requirements of AI PC):**

  - *O que é:* Especificações para computadores pessoais otimizados para IA ("AI
    PCs"). Define requisitos de memória, largura de banda e capacidade de NPU.

- **IEEE P3549 (Inference of AI Systems):**

  - *O que é:* Padrão para medir e certificar o desempenho e a precisão da
    inferência em diferentes hardwares.

## B.5 Padrões LEGADOS (Para Referência)

Mantidos apenas para contexto histórico ou manutenção de sistemas antigos.

- **Padrões de Linguagem (ex: ISO/IEC 9899 C):** Ainda vitais para sistemas
  embarcados, mas commoditizados em sistemas de IA de alto nível.
- **Padrões de Processo em Cascata Pura:** Incompatíveis com a natureza
  iterativa e experimental do treinamento de modelos.

## Considerações Práticas

- **Certificação é um Meio:** Não busque a certificação ISO 42001 apenas pelo
  selo. Use-a para organizar a "bagunça" de processos de dados e modelos.
- **Interoperabilidade:** Padrões como IEEE P3549 ajudam a evitar vendor lock-in
  de hardware, permitindo comparar performance de inferência objetivamente.
- **Custo de Conformidade:** Implementar ISO/IEC 23894 e 42001 exige
  investimento significativo em documentação. Reserve budget para "engenharia de
  conformidade".

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                  | Avaliação                      |
| :------------------------------ | :----------------------------------------- | :----------------------------- |
| **Descartabilidade Geracional** | Estes padrões serão obsoletos em 36 meses? | Baixa (Base normativa é lenta) |
| **Custo de Verificação**        | Custo de auditoria e conformidade?         | Alto (Humano-intensivo)        |
| **Responsabilidade Legal**      | Impacto de não conformidade?               | Crítico (Multas, bloqueios)    |

## Resumo

- A **ISO/IEC 42001** tornou-se a âncora para sistemas de gestão de IA.
- A gestão de risco (**ISO/IEC 23894**) é o processo central que conecta
  engenharia e negócios.
- Hardware agora tem padrões próprios (**IEEE P3540**), refletindo a importância
  da infraestrutura de inferência.
- Engenheiros de software devem conhecer esses padrões para dialogar com
  auditores e garantir a legalidade dos sistemas.

## Referências

1. **ISO/IEC.** *ISO/IEC 42001:2023 — Information technology — Artificial
   intelligence — Management system*. 2023.
2. **ISO/IEC.** *ISO/IEC 42006:2025 — Requirements for bodies providing audit
   and certification of artificial intelligence management systems*. 2025.
3. **ISO/IEC.** *ISO/IEC TS 42119-2:2025 — Artificial intelligence — Testing of
   AI — Part 2: Overview*. 2025.
4. **ISO/IEC.** *ISO/IEC 23894:2024 — Artificial intelligence — Guidance on risk
   management*. 2024.
5. **IEEE.** *IEEE Std 7000-2022 — IEEE Standard Model Process for Addressing
   Ethical Concerns during System Design*. 2022.
6. **IEEE.** *IEEE P3540 — Standard for Technical Requirements of Artificial
   Intelligence Personal Computer*. (Draft/Active Project).
7. **IEEE.** *IEEE P3549 — Standard for Inference of Artificial Intelligence
   Systems*. (Draft/Active Project).
8. **ISO/IEC.** *ISO/IEC 25010:2023 — Systems and software Quality Requirements
   and Evaluation (SQuaRE) — Product quality model*. 2023.

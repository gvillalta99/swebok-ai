---
title: 'Apêndice A: Especificações de Descrição de Knowledge Areas (KAs)'
created_at: '2026-02-05'
tags: [apendice, kas, governanca, evidencias, swebok-ai]
status: in-progress
updated_at: '2026-02-05'
ai_model: kimi-k2.5
---

# Apêndice A: Especificações de Descrição de Knowledge Areas (KAs)

## Overview

Este apêndice define as especificações editoriais e técnicas para a descrição
das Knowledge Areas (KAs) no SWEBOK-AI v5.0. O objetivo não é apenas padronizar
o estilo, mas garantir comparabilidade, auditabilidade e rastreabilidade em um
guia que assume sistemas não determinísticos, alto risco regulatório e produção
acelerada por IA.

Diferente do SWEBOK v4.0, que focava em práticas estáveis, o SWEBOK-AI exige que
cada KA explicite restrições, critérios de verificação e, crucialmente, os
pontos de intervenção humana obrigatórios (human-in-the-loop). Todo conteúdo
deve alinhar-se a práticas modernas de governança, como o sistema de gestão de
IA (ISO/IEC 42001) e frameworks de risco (ISO/IEC 23894).

## Learning Objectives

Após estudar este apêndice, o leitor deve ser capaz de:

1. **Aplicar critérios uniformes** para decompor, nomear e descrever tópicos de
   um KA, evitando viés de domínio ou de fornecedor.
2. **Produzir descrições verificáveis e auditáveis**, com afirmações escopadas e
   referências adequadas (padrões, literatura revisada por pares, relatórios
   autoritativos).
3. **Incorporar componentes AI-centric** (restrições, verificação,
   responsabilidade legal) de forma consistente em qualquer KA.

## A.1 Papel do SWEBOK-AI e Controle de Baseline

O SWEBOK-AI v5.0 funciona como documento estrutural para:

- Currículos e trilhas de formação profissional.
- Certificação e avaliação de competências (em conformidade com **ISO/IEC
  24773-1** e **-4**).
- Referência cruzada com padrões de conformidade técnica e legal.

A lista de KAs e seus tópicos funciona como uma *baseline*. Mudanças estruturais
(criação, remoção ou reindexação de tópicos) são tratadas como mudanças
controladas, exigindo justificativa de impacto na navegação e nas matrizes de
conformidade.

## A.2 Critérios e Requisitos para a Quebra de Tópicos

### A.2.1 Profundidade e Granularidade

- **Níveis:** A quebra de tópicos deve ter, em geral, até 2 ou 3 níveis de
  profundidade.
- **Pragmatismo:** O objetivo é a estabilidade editorial, não a perfeição
  taxonômica.
- **Clareza:** Títulos de tópicos devem ser autoexplicativos quando citados fora
  de contexto (ex: em uma matriz de risco).

### A.2.2 Neutralidade de Contexto

A descrição dos tópicos não deve presumir:

- Domínio específico (ex: saúde, fintech).
- Modelo de ciclo de vida único.
- Estrutura organizacional rígida.
- Stack tecnológica, fornecedor ou framework específico.

Quando um tópico depender de contexto (ex: requisitos regulatórios específicos),
isso deve ser tratado como uma "variante" (ver seção A.3).

### A.2.3 Temas Transversais Obrigatórios

Os seguintes temas devem permear todas as KAs:

- **Medição:** Avaliação objetiva e métricas de qualidade.
- **Qualidade:** Foco na qualidade de sistemas com componentes estocásticos
  (IA).
- **Segurança:** Privacidade, abuso, ameaças por prompt injection e agentes
  autônomos.

## A.3 Especificação de Conteúdo: Afirmações, Restrições e Variantes

### A.3.1 Afirmações Verificáveis

Toda afirmação técnica deve ser:

- **Escopada:** Definir condições, população e limites.
- **Falsificável:** Indicar o que observar para refutar a afirmação.
- **Referenciada:** Acompanhada de citação quando for uma afirmação externa.

Quando não houver evidência adequada, a afirmação deve ser marcada
explicitamente como "hipótese operacional", sugerindo verificação local.

### A.3.2 Restrições como Artefato Primário

No SWEBOK-AI, "restrições" são cidadãos de primeira classe. Elas definem o que o
sistema *não* deve fazer. Em cada KA, isso se traduz em:

- **Restrições de Dados:** Proveniência, licenciamento, PII (Personally
  Identifiable Information), retenção.
- **Restrições de Modelo:** Capabilities proibidas, limites de autonomia.
- **Restrições de Operação:** Observabilidade, logging, aprovação humana
  (human-in-the-loop).
- **Restrições de Segurança:** Controle de ferramentas (tool use), sandboxing.

Este enquadramento garante compatibilidade com sistemas de gestão (AIMS -
ISO/IEC 42001).

### A.3.3 Variantes por Risco

Tópicos sensíveis devem explicitar variantes baseadas no nível de risco:

- **Baixo Risco:** Controles mínimos e verificação amostral.
- **Médio Risco:** Gates de revisão, testes de regressão, auditoria leve.
- **Alto Risco:** Evidências formais, avaliação independente, auditoria
  reforçada (alinhado à ISO/IEC 42006).

## A.4 Requisitos para Referências

### A.4.1 Tipos de Referência

- **Recommended References:** Essenciais para o núcleo do conhecimento.
- **Further Reading:** Leituras complementares com justificativa breve.
- **Standards:** Normas ISO/IEC/IEEE citadas explicitamente.

### A.4.2 Critérios de Seleção (2024/2025)

- **Atualidade:** Priorizar materiais de 2024/2025. Clássicos são permitidos
  apenas se fundacionais.
- **Credibilidade:** Standards, papers revisados por pares (IEEE, ACM),
  relatórios de indústria autoritativos (McKinsey, DORA).
- **Acessibilidade:** URLs ou DOIs estáveis.

### A.4.3 Identificação de Conteúdo LEGADO

Práticas obsoletas ou commoditizadas devem ser marcadas com a tag **[LEGADO]**.

- *Critério:* A prática foi substituída por automação de IA confiável ou
  tornou-se irrelevante devido a novas arquiteturas?

## A.5 Estrutura Obrigatória para Arquivos de KA

Cada arquivo de KA deve seguir rigorosamente esta estrutura:

1. `## Overview`
2. `## Learning Objectives`
3. Seções Técnicas (Subseções)
4. `## Practical Considerations` (incluindo checklist e armadilhas)
5. `## Matriz de Avaliação Consolidada`
6. `## Summary`
7. `## References`

## Practical Considerations

- **Limites de Autonomia:** Documente claramente o que um agente pode fazer sem
  supervisão.
- **Ferramentas vs. Propriedades:** Não prescreva ferramentas ("Use ferramenta
  X"), prescreva propriedades ("O log deve ser estruturado e imutável").
- **Propriedade Intelectual:** Ao citar standards pagos, use o identificador
  oficial e link, nunca copie o conteúdo.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                   | Avaliação          |
| :------------------------------ | :---------------------------------------------------------- | :----------------- |
| **Descartabilidade Geracional** | Esta especificação será obsoleta em 36 meses?               | Baixa (Estrutural) |
| **Custo de Verificação**        | Quanto custa validar a conformidade com esta especificação? | Médio              |
| **Responsabilidade Legal**      | Quem é responsabilizado por falhas de descrição?            | Crítica            |

## Summary

- Descrições de KA são especificações técnicas para consistencia e
  auditabilidade.
- Restrições e pontos de intervenção humana são parte integrante do
  conhecimento.
- Referências devem ser atuais (2024/2025) e focadas em padrões (ISO/IEC) e
  evidências.
- A estrutura deve suportar a certificação profissional (ISO/IEC 24773).

## References

1. **ISO/IEC.** *ISO/IEC 42001:2023 — Information technology — Artificial
   intelligence — Management system*. 2023.
2. **ISO/IEC.** *ISO/IEC 42006:2025 — Requirements for bodies providing audit
   and certification of artificial intelligence management systems*. 2025.
3. **ISO/IEC.** *ISO/IEC 24773-1:2019 — Certification of software engineering
   professionals — Part 1: General requirements*. 2019.
4. **ISO/IEC.** *ISO/IEC 23894:2023 — Artificial intelligence — Guidance on risk
   management*. 2023.
5. **European Union.** *Regulation (EU) 2024/1689 (EU AI Act)*. 2024.

---
title: "Apêndice A: Especificacoes de Descricao de Knowledge Areas (KAs)"
created_at: "2026-01-31"
tags: ["apendice", "kabs", "governanca", "evidencias", "swebok-ai"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Apêndice A: Especificacoes de Descricao de Knowledge Areas (KAs)

## Overview
Este apendice define as especificacoes editoriais e tecnicas para descrever Knowledge Areas (KAs) no SWEBOK-AI v5.0. O objetivo nao e padronizar estilo por estetica, mas garantir comparabilidade, auditabilidade e rastreabilidade em um guia que assume sistemas nao deterministicos, alto risco regulatorio e producao acelerada por IA.

Como no SWEBOK v4.0, as descricoes de KAs devem permanecer nao prescritivas (nao ditar ferramentas) e aplicaveis a multiplos contextos organizacionais. A diferenca central e que o SWEBOK-AI requer que cada KA explicite restricoes, criterios de verificacao e pontos de intervencao humana (human-in-the-loop), alinhando o conteudo a praticas de governanca e risco (por exemplo, AIMS em ISO/IEC 42001 e gestao de risco em ISO/IEC 23894).

## Learning Objectives
Apos estudar este apendice, o leitor deve ser capaz de:
1. Aplicar criterios uniformes para decompor, nomear e descrever topicos de uma KA, evitando vies de dominio e de fornecedor.
2. Produzir descricoes verificaveis e auditaveis, com afirmacoes escopadas e referencias adequadas (standards, literatura revisada por pares, relatorios autoritativos).
3. Incorporar, de forma consistente, componentes AI-centric (restricoes, verificacao, governanca, responsabilidade) em qualquer KA.

## A.1 Papel do SWEBOK-AI e controle de baseline
O SWEBOK-AI v5.0 funciona como documento estrutural para:

- curriculos e trilhas de formacao
- certificacao e avaliacao de competencias
- referencia cruzada com standards e conformidade

Por isso, a lista de KAs e seus topicos funciona como baseline. Mudancas estruturais (criacao, remocao ou reindexacao de topicos) devem ser tratadas como mudancas controladas: justificativa, impacto em navegacao, impacto em referencias cruzadas e impacto em matrizes de conformidade.

## A.2 Criterios e requisitos para a quebra de topicos

### A.2.1 Profundidade e granularidade
- A quebra de topicos deve ter, em geral, ate 2 ou 3 niveis.
- O objetivo e ser "razoavel", nao "perfeita": a estabilidade editorial e mais valiosa do que micro-otimizacao taxonomica.
- Titulos de topicos devem ser autoexplicativos quando citados fora de contexto.

### A.2.2 Neutralidade de contexto
A quebra de topicos nao deve presumir:

- dominio especifico (por exemplo, saude, fintech)
- modelo de ciclo de vida unico
- estrutura organizacional
- stack tecnologica, fornecedor, ferramenta, framework

Quando um topico depender de contexto (por exemplo, requisitos regulatorios), isso deve ser explicitado como variavel de escopo e tratado como "variantes" (ver A.3).

### A.2.3 Temas transversais obrigatorios
Os temas transversais devem aparecer em todas as KAs, adaptados ao contexto:

- medicao (incluindo avaliacao e metrica de qualidade)
- qualidade (incluindo qualidade de sistemas com componentes de IA)
- seguranca (incluindo privacidade, abuso e ameaças por prompt/agent)

## A.3 Especificacao de conteudo: afirmacoes, restricoes e variantes

### A.3.1 Afirmacoes verificaveis
Afirmações devem ser:

- escopadas (condicoes, populacao, limites)
- falsificaveis (o que observar para refutar)
- acompanhadas de referencia quando forem afirmacoes externas

Quando nao houver evidencia adequada, a afirmacao deve ser marcada como hipotese operacional (por exemplo: "hipotese: ..."), com recomendacao de verificacao local.

### A.3.2 Restricoes como artefato primario
No SWEBOK-AI, "restricoes" sao artefatos primarios: definem o que o sistema nao deve fazer, como e por quem sera verificado, e quais riscos sao aceitaveis. Em KA descriptions, isso se traduz em:

- restricoes de dados (proveniencia, licencas, PII, retention)
- restricoes de modelo (capabilities proibidas, limites de autonomia)
- restricoes de operacao (observabilidade, logging, aprovacao humana)
- restricoes de seguranca (controle de ferramentas, sandbox, segredos)

Esse enquadramento e compativel com estruturas de gestao e governanca de IA, como um Artificial Intelligence Management System (AIMS) (ISO/IEC 42001) e praticas de gestao de risco especificas para IA (ISO/IEC 23894).

### A.3.3 Variantes por risco
Topicos que variam fortemente por risco devem explicitar "variantes":

- baixo risco: controles minimos e verificacao amostral
- medio risco: gates de revisao, testes de regressao e auditoria leve
- alto risco: evidencias formais, avaliacao independente, auditoria e governanca reforcada

Esse padrao de "variantes por risco" facilita alinhamento com regimes regulatorios (por exemplo, a abordagem baseada em risco do EU AI Act) e com normas de auditoria/certificacao associadas a AIMS (por exemplo, ISO/IEC 42006).

## A.4 Requisitos para referencias

### A.4.1 Tipos de referencia
Cada KA pode utilizar:

- Recommended References: referencias essenciais para o nucleo "geralmente reconhecido"
- Further Reading: leituras complementares, com anotacao breve justificando inclusao
- References: standards e referencias citadas explicitamente

### A.4.2 Criterios de selecao
- Atualidade: priorizar materiais recentes; classicos sao permitidos quando forem fundacionais.
- Credibilidade: priorizar standards (ISO/IEC/IEEE), periodicos/conferencias, e orgaos de referencia.
- Acessibilidade: preferir URLs/DOIs estaveis.
- Neutralidade: evitar marketing de fornecedor.

### A.4.3 Referencias e sistemas de gestao
Quando o topico se relacionar a governanca, risco ou conformidade, a KA deve referenciar explicitamente o conjunto relevante de standards de sistema de gestao e/ou frameworks de risco. Exemplos frequentes:

- AIMS: ISO/IEC 42001
- Auditoria e certificacao de AIMS: ISO/IEC 42006
- Governanca de uso de IA: ISO/IEC 38507
- Gestao de risco de IA: ISO/IEC 23894

## A.5 Estrutura obrigatoria para cada arquivo de KA
Cada arquivo de conteudo do SWEBOK-AI deve seguir a estrutura base do projeto:

1. `## Overview`
2. `## Learning Objectives`
3. Secoes tecnicas (subsecoes)
4. `## Practical Considerations`
5. `## Summary`
6. `## References`

Quando aplicavel, incluir:

- sinalizacao **LEGADO** para praticas obsoletas ou comoditizadas
- "pontos de intervencao humana" (quando revisao humana e obrigatoria)
- "evidencias minimas" (o que precisa existir para dizer que foi verificado)

## Practical Considerations
- Em ambientes com uso de agentes, documente "limites de autonomia" como requisito: o que pode ser executado sem aprovacao humana, e quais eventos disparam um "circuit breaker".
- Evite padronizar ferramentas; padronize propriedades verificaveis (por exemplo, "log estruturado e retencao de 90 dias" em vez de "use ferramenta X").
- Quando mencionar um standard pago, cite o identificador oficial e um link para a pagina do organismo (ISO/IEEE) em vez de copiar conteudo protegido.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary
- Descricoes de KA sao especificacoes editoriais para consistencia, comparabilidade e auditabilidade.
- No SWEBOK-AI, restricoes, criterios de verificacao e pontos de intervencao humana sao parte do conteudo "geralmente reconhecido".
- Referencias devem priorizar standards e fontes recentes, com escopo e rastreabilidade.

## References
1. ISO. ISO/IEC 42001:2023 - Information technology — Artificial intelligence — Management system. 2023. Disponivel em: https://www.iso.org/standard/81230.html.
2. ISO. ISO/IEC 42006:2025 - Requirements for bodies providing audit and certification of artificial intelligence management systems. 2025. Disponivel em: https://www.iso.org/standard/44546.html.
3. ISO. ISO/IEC 23894:2023 - Information technology — Artificial intelligence — Guidance on risk management. 2023. Disponivel em: https://www.iso.org/standard/77304.html.
4. ISO. ISO/IEC 38507:2022 - Governance implications of the use of artificial intelligence by organizations. 2022. Disponivel em: https://www.iso.org/standard/56641.html.
5. Uniao Europeia. Regulation (EU) 2024/1689 (EU AI Act). 2024. Disponivel em: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng.

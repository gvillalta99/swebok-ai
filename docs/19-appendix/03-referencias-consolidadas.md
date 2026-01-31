---
title: "Apendice C: Lista de Referencias Consolidadas (Atualizada 2024-2025)"
created_at: "2026-01-31"
tags: ["apendice", "referencias", "bibliografia", "evidencias", "swebok-ai"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Apendice C: Lista de Referencias Consolidadas (Atualizada 2024-2025)

## Overview
Este apendice consolida referencias recomendadas para o SWEBOK-AI v5.0, com prioridade para 2024-2025. A lista tem dois objetivos:

1. padronizar o "chao de evidencias" do livro (o que e aceito como referencia autoritativa)
2. reduzir ambiguidade editorial ao selecionar fontes para KAs distintos

Como no SWEBOK tradicional, esta lista e uma selecao informada e razoavel, nao uma lista exaustiva.

## Learning Objectives
Apos estudar este apendice, o leitor deve ser capaz de:
1. Aplicar criterios de curadoria para selecionar referencias recentes e crediveis.
2. Distinguir referencias normativas (standards e regulacao) de referencias descritivas (pesquisa e relatorios).
3. Usar referencias para rastreabilidade: ligar afirmacoes do texto a fontes especificas.

## C.1 Criterios de curadoria (SWEBOK-AI)

### C.1.1 Prioridades
- Normativo: standards (ISO/IEC/IEEE) e regulacao primaria.
- Pesquisa: surveys e artigos de sintese (melhor custo/beneficio de leitura).
- Industria: relatorios metodologicamente claros, com escopo e dados explicitos.

### C.1.2 Atualidade e excecoes
Regra geral: preferir fontes dos ultimos 5 anos. Excecoes permitidas:

- classicos fundacionais (quando nao ha substituto)
- definicoes de referencia (por exemplo, vocabularios)

### C.1.3 Acessibilidade
Sempre que possivel, usar URL/DOI estavel. Para standards pagos, apontar para pagina oficial do organismo.

## C.2 Referencias normativas (standards e regulacao)
Este bloco sustenta governanca, risco, auditoria e teste de sistemas de IA:

- AIMS e auditoria/certificacao: ISO/IEC 42001; ISO/IEC 42006.
- Governanca do uso de IA: ISO/IEC 38507.
- Gestao de risco de IA: ISO/IEC 23894; NIST AI RMF.
- Teste e V&V de sistemas de IA: ISO/IEC TS 42119 (serie).
- Etica no design: IEEE 7000.
- Contexto regulatorio baseado em risco: EU AI Act.

## C.3 Referencias tecnicas (LLMs, RAG, agentes, avaliacao)
Este bloco cobre o nucleo tecnico recente para LLMs, RAG e agentes:

- Surveys gerais de LLMs: Zhao et al.; Minaee et al.
- Surveys de RAG: Gao et al.; Fan et al.
- Surveys de agentes: Wang et al.; Wen et al.
- Surveys focados em engenharia de software: Zhang et al.; Jiang et al.; Jin et al.; Hou et al.

## C.4 Referencias de engenharia de software (processo, V&V, governanca)
Este bloco ancora o SWEBOK-AI em processo e ciclo de vida. Em geral, use as edicoes vigentes na sua organizacao:

- ISO/IEC/IEEE 12207 (processos de software)
- ISO/IEC/IEEE 15288 (processos de sistemas)
- ISO/IEC/IEEE 29148 (engenharia de requisitos)
- ISO/IEC/IEEE 42010 (descricao de arquitetura)

## C.5 Referencias de contexto (industria e mercado)
Este bloco provem contexto empirico sobre adoção, produtividade e mudancas no trabalho:

- DORA Accelerate State of DevOps Report 2024.
- World Economic Forum: Future of Jobs Report 2025.
- McKinsey: estimativas e quadro economico de impacto de GenAI (tratar como contexto, nao como "verdade normativa").

## Practical Considerations
- Evite inflar bibliografia: cada referencia deve ter um papel (definicao, metodo, evidencia, contexto).
- Para sistemas com IA, privilegie fontes que explicitam limites e falhas conhecidas; isso reduz risco de "boas praticas" nao verificaveis.
- Para KAs criticos, mantenha um bloco minimo de referencias normativas + 1 ou 2 surveys recentes.

## Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Muito Baixa |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Baixo |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary
- A lista consolidada prioriza standards e regulacao para governanca e evidencia.
- Surveys recentes de LLM, RAG e agentes formam o nucleo tecnico para 2024-2025.
- Referencias devem ser usadas para rastreabilidade: afirmacao relevante -> fonte especifica.

## References
1. ISO. ISO/IEC 42001:2023 - Information technology — Artificial intelligence — Management system. 2023. Disponivel em: https://www.iso.org/standard/81230.html.
2. ISO. ISO/IEC 42006:2025 - Requirements for bodies providing audit and certification of artificial intelligence management systems. 2025. Disponivel em: https://www.iso.org/standard/44546.html.
3. ISO. ISO/IEC 23894:2023 - Information technology — Artificial intelligence — Guidance on risk management. 2023. Disponivel em: https://www.iso.org/standard/77304.html.
4. ISO. ISO/IEC 38507:2022 - Information technology — Governance of IT — Governance implications of the use of artificial intelligence by organizations. 2022. Disponivel em: https://www.iso.org/standard/56641.html.
5. ISO. ISO/IEC TS 42119-2:2025 - Artificial intelligence — Testing of AI — Part 2: Overview of testing AI systems. 2025. Disponivel em: https://www.iso.org/standard/84127.html.
6. ISO. ISO/IEC DTS 42119-3 - Artificial intelligence — Testing of AI — Part 3: Verification and validation analysis of AI systems. 2025 (em desenvolvimento). Disponivel em: https://www.iso.org/standard/85072.html.
7. IEEE. IEEE 7000-2021 - IEEE Standard Model Process for Addressing Ethical Concerns during System Design. 2021. Disponivel em: https://standards.ieee.org/standard/7000-2021.html.
8. NIST. AI Risk Management Framework (AI RMF 1.0). 2023. Disponivel em: https://www.nist.gov/itl/ai-risk-management-framework.
9. Uniao Europeia. Regulation (EU) 2024/1689 (EU AI Act). 2024. Disponivel em: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng.
10. ZHAO, Wayne Xin; ZHOU, Kun; LI, Junyi; et al. A Survey of Large Language Models. arXiv, 2024 (atualizacao major: v14, 25 set. 2024). Disponivel em: https://arxiv.org/html/2303.18223v14.
11. MINAEE, Shervin; MIKOLOV, Tomas; NIKZAD, Narjes; et al. Large Language Models: A Survey. arXiv, 2024. Disponivel em: https://arxiv.org/abs/2402.06196.
12. GAO, Yunfan; XIONG, Yun; GAO, Xinyu; et al. Retrieval-Augmented Generation for Large Language Models: A Survey. arXiv, 2024. Disponivel em: https://browse.arxiv.org/html/2312.10997v4.
13. FAN, Wenqi; DING, Yujuan; NING, Liangbo; et al. A Survey on RAG Meeting LLMs: Towards Retrieval-Augmented Large Language Models. arXiv, 2024. Disponivel em: https://arxiv.org/abs/2405.06211.
14. WANG, Lei; MA, Chen; FENG, Xueyang; et al. A Survey on Large Language Model based Autonomous Agents. arXiv, 2025. Disponivel em: https://arxiv.org/abs/2308.11432.
15. WEN, Jirong; et al. A survey on large language model based autonomous agents. Frontiers of Computer Science, 2024. Disponivel em: https://link.springer.com/article/10.1007/s11704-024-40231-1.
16. ZHANG, Quanjun; FANG, Chunrong; XIE, Yang; et al. A Survey on Large Language Models for Software Engineering. arXiv, 2024 (rev. v2). Disponivel em: https://arxiv.org/abs/2312.15223.
17. JIANG, Juyong; WANG, Fan; SHEN, Jiasi; et al. A Survey on Large Language Models for Code Generation. arXiv, 2024 (rev. v2). Disponivel em: https://arxiv.org/abs/2406.00515.
18. JIN, Haolin; HUANG, Linghan; CAI, Haipeng; et al. From LLMs to LLM-based Agents for Software Engineering: A Survey of Current, Challenges and Future. arXiv, 2025 (rev. v2). Disponivel em: https://arxiv.org/abs/2408.02479.
19. HOU, Xinyi; ZHAO, Yanjie; LIU, Yue; et al. Large Language Models for Software Engineering: A Systematic Literature Review. 2024. Disponivel em: https://nzjohng.github.io/publications/papers/tosem2024_5.pdf.
20. DORA. Accelerate State of DevOps Report 2024. 2024. Disponivel em: https://services.google.com/fh/files/misc/2024_final_dora_report.pdf.
21. WORLD ECONOMIC FORUM. The Future of Jobs Report 2025. 2025. Disponivel em: https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf.
22. CHUI, Michael; HAZAN, Eric; ROBERTS, Roger; et al. The economic potential of generative AI: The next productivity frontier. McKinsey, 2023. Disponivel em: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier.

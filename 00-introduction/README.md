# Capítulo 0: Introdução

> **SWEBOK-AI v5.0 — Software Engineering Body of Knowledge for the AI Era**

---

## Visão Geral

A introdução do SWEBOK-AI v5.0 estabelece o contexto fundamental para toda a obra. Enquanto o SWEBOK v4.0 assumia um paradigma de engenharia de software baseado em codificação manual e processos tradicionais, a versão 5.0 reconhece que vivemos uma **transição paradigmática sem precedentes** na história da computação.

### Princípio Diretor

> **"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é primariamente sobre sintaxe e lógica de implementação, assumindo que **geração algorítmica é infraestrutura, não produto**.

---

## Estrutura do Capítulo

Este capítulo está organizado em seis seções:

| Seção | Título | Conteúdo Principal |
|-------|--------|-------------------|
| **1** | O Contexto da Revolução dos LLMs | Evolução histórica desde Transformers (2017) até modelos de raciocínio (2025); benchmarks SWE-bench; gargalo de verificação |
| **2** | A Mudança de Paradigma | De codificação para curadoria; inversão do gargalo; implicações organizacionais |
| **3** | Princípios Diretores | Seis princípios fundamentais: Commodity, Capital de Contexto, Responsabilidade, Verificação, Transparência, Degradação |
| **4** | Estrutura e Organização | Os 18 KAs recontextualizados; convenções de formato; caminhos de leitura |
| **5** | Público-Alvo e Pré-requisitos | Cinco perfis de leitores; verificação de prontidão; recursos de apoio |
| **6** | Como Utilizar Este Guia | Abordagens de leitura; ciclo de aplicação prática; exercícios e projetos |

---

## Arquivos do Capítulo

```
00-introduction/
├── README.md                           # Este arquivo — visão geral
├── PLAN.md                             # Plano detalhado com 24 referências
├── 01-contexto-revolucao-llms.md       # Seção 1: História e evolução
├── 02-mudanca-paradigma-engenharia-software.md  # Seção 2: Paradigma novo
├── 03-principios-diretores-swebok-ai.md         # Seção 3: 6 princípios
├── 04-estrutura-organizacao-guia.md    # Seção 4: Estrutura dos 18 KAs
├── 05-publico-alvo-pre-requisitos.md   # Seção 5: Perfis e pré-requisitos
├── 06-como-utilizar-guia.md            # Seção 6: Como usar o guia
└── swebok-v4-chapter.md                # Referência: SWEBOK v4 original
```

---

## Matriz de Avaliação Consolidada (Capítulo)

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Este capítulo será obsoleto em 36 meses? | Muito Baixa — fundamentos históricos e conceituais |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Baixo — conceitos de alto nível |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Baixo — contexto e fundamentação |

---

## Referências Fundamentais

O capítulo incorpora 24 referências organizadas em 7 categorias:

### Evolução dos LLMs (7 referências)
- Vaswani et al. (2017) — Attention Is All You Need
- Chen et al. (2021) — Codex
- Li et al. (2022) — AlphaCode
- Jimenez et al. (2024) — SWE-bench
- Anthropic (2025) — Claude 4
- OpenAI (2025) — o3, o4-mini, SWE-Lancer
- Cognition AI (2024) — Devin

### Impacto na Produtividade (4 referências)
- Peng et al. (2023) — GitHub Copilot productivity
- Dellermann et al. (2024) — ACM study
- Weber et al. (2024) — LMU Munich
- Vaithilingam et al. (2024) — Systematic study

### Paradigma de Verificação (3 referências)
- Generative AI and Empirical SE (2025)
- The New Stack (2025) — Trust and Verify
- IEEE Software (2024) — Human-AI Collaboration

### Dívida Técnica (3 referências)
- Hamade (2024) — True Cost
- Kodus (2025) — Technical Debt
- AlterSquare (2026) — New Forms of Debt

### Economia (3 referências)
- Song (2025) — Jevons-Baumol
- ACM CHI (2025) — Jevons Paradox
- Stanford HAI (2025) — AI Index Report

### Capacidades Avançadas (1 referência)
- METR (2025) — OS Dev Study

Veja `PLAN.md` para detalhes completos de todas as referências.

---

## Como Usar Este Capítulo

### Leitura Obrigatória

Para **todos os leitores**, recomenda-se:
1. Ler **Seção 1** para entender o contexto histórico
2. Ler **Seção 2** para compreender a mudança de paradigma
3. Ler **Seção 3** para internalizar os seis princípios

### Caminhos Específicos

| Perfil | Foco Adicional | Próximo Capítulo |
|--------|---------------|------------------|
| Praticantes | Seção 6 (como aplicar) | Cap. 3 (Design) ou 5 (Testing) |
| Líderes Técnicos | Seção 4 (estrutura) | Cap. 2 (Architecture) |
| Educadores | Seção 5 (perfis) | Cap. 16 (Foundations) |
| Executivos | Seções 2-3 (visão) | Cap. 15 (Economics) |

---

## Relacionamento com Outros KAs

- **Todos os KAs**: Este capítulo fornece o contexto fundamental
- **Software Requirements (Cap. 1)**: Introduz conceitos de engenharia de restrições
- **Software Architecture (Cap. 2)**: Contextualiza arquiteturas híbridas
- **Software Design (Cap. 3)**: Fundamenta o paradigma de curadoria
- **Software Construction (Cap. 4)**: Introduz orquestração de código
- **Software Testing (Cap. 5)**: Estabelece verificação como gargalo
- **Software Quality (Cap. 12)**: Define métricas para era dos LLMs
- **Professional Practice (Cap. 14)**: Fundamenta accountability
- **Engineering Economics (Cap. 15)**: Contextualiza economia da verificação

---

## Convenções deste Capítulo

### Citações

As referências são citadas no texto usando o formato (Autor, Ano) com links para as fontes originais. Todas as referências estão listadas na seção References de cada arquivo.

### Código de Exemplo

Exemplos em Python ilustram conceitos. São funcionais, não pseudocódigo, e incluem type hints e docstrings.

### Diagramas

Diagramas em ASCII art representam arquiteturas, processos e conceitos. Foco em clareza sobre precisão gráfica.

### Matrizes de Decisão

Tabelas auxiliam na seleção de abordagens baseadas em critérios objetivos.

---

## Checklist de Conclusão

Ao completar este capítulo, você deve ser capaz de:

- [ ] Explicar a evolução dos LLMs desde 2017 até 2025
- [ ] Articular a diferença entre paradigma de codificação e curadoria
- [ ] Enumerar e explicar os seis princípios diretores
- [ ] Navegar a estrutura de 18 KAs do SWEBOK-AI
- [ ] Identificar seu perfil de leitor e caminho recomendado
- [ ] Aplicar o ciclo de aprendizado-implementação

---

## Próximos Passos

Após completar a Introdução:

1. **Selecione seu primeiro KA** baseado no seu perfil (Seção 5)
2. **Aplique um conceito** imediatamente em seu trabalho
3. **Documente** restrições de domínio relevantes
4. **Junte-se à comunidade** de praticantes

---

*SWEBOK-AI v5.0 — Capítulo 0: Introdução*
*Última atualização: 2026-01-29*

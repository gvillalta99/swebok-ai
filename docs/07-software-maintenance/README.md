# Capítulo 7: Manutenção de Sistemas Opaços

## Overview

O Capítulo 7 do SWEBOK-AI v5.0 redefine **Software Maintenance** para a era dos
Large Language Models. Enquanto o SWEBOK v4.0 focava em manutenção de código
legado escrito por humanos, a versão 5.0 reconhece que **a manutenção agora
envolve predominantemente sistemas opacos - código gerado por IA sem
documentação de raciocínio, sem histórico de decisões e frequentemente sem
compreensão profunda por parte dos mantenedores**.

A manutenção de sistemas com componentes de IA apresenta desafios
qualitativamente diferentes: não apenas entender código escrito por outros
humanos, mas compreender (ou reconstruir) a lógica de geração, validar
comportamento não-determinístico e manter sistemas que evoluem através de
regeneração automática.

> **Paradigma da Manutenção:** "Manter código gerado por IA é como arqueologia
> de software em velocidade acelerada: você está sempre descobrindo o que foi
> construído, por quê, e se ainda funciona conforme esperado."

## Estrutura do Capítulo

### Seção 1: Fundamentos da Manutenção de Sistemas Opaços

**Arquivo:** `01-fundamentos-manutencao-opacos.md`

**Conteúdo principal:**

- Natureza do código gerado por IA
- Riscos da manutenção de código opaco
- Técnicas de compreensão de código
- Estratégias de manutenção preventiva

### Seção 2: Problemas Críticos na Manutenção de IA

**Arquivo:** `02-problemas-criticos-manutencao.md`

**Conteúdo principal:**

- Drift de modelo em produção
- Degradação de prompts
- Acúmulo de versões de geração
- Perda de conhecimento tribal
- Framework de detecção precoce

### Seção 3: Processos de Manutenção para Sistemas Híbridos

**Arquivo:** `03-processos-manutencao-hibridos.md`

**Conteúdo principal:**

- Tipos de manutenção adaptados para IA
- Ciclo de manutenção integrado
- Gestão de mudanças em prompts
- Processos de regeneração controlada

### Seção 4: Técnicas de Manutenção de Código de IA

**Arquivo:** `04-tecnicas-manutencao-ia.md`

**Conteúdo principal:**

- Análise de dependências
- Testes de caracterização
- Refactoring seguro
- Testes de propriedade
- Análise de impacto

### Seção 5: Ferramentas de Manutenção

**Arquivo:** `05-ferramentas-manutencao.md`

**Conteúdo principal:**

- Ferramentas de análise e compreensão
- Ferramentas de refatoração
- Ferramentas de testes e validação
- Automação de manutenção

## Estatísticas do Capítulo

| Métrica                | Valor                     |
| ---------------------- | ------------------------- |
| **Total de arquivos**  | 6 (5 seções + README.md)  |
| **Tamanho total**      | ~80 KB de conteúdo        |
| **Linhas de conteúdo** | ~2.500+ linhas            |
| **Exemplos de código** | 20+ implementações Python |
| **Tabelas**            | 15+ tabelas comparativas  |

## Matriz de Avaliação Consolidada do Capítulo

| Critério                        | Descrição                                                | Avaliação                                                  |
| ------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** — manutenção é eterna                            |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Muito Alto** — manutenção de código de IA é arriscada    |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítica** — mantenedores são responsáveis por regressões |

## Relacionamento com Outros KAs

```
Cap. 4 (Construction) ──► Código Gerado
         │
         ▼
Cap. 5 (Testing) ───────► Validação Contínua
         │
         ▼
Cap. 6 (Operations) ────► Monitoramento em Produção
         │
         ▼
Cap. 7 (Maintenance) ───► ESTE CAPÍTULO
         │
         ▼
Cap. 12 (Quality) ──────► Métricas de Saúde do Código
```

## Checklist de Implementação

- [x] Seção 1: Fundamentos da Manutenção de Sistemas Opaços
- [x] Seção 2: Problemas Críticos na Manutenção de IA
- [x] Seção 3: Processos de Manutenção para Sistemas Híbridos
- [x] Seção 4: Técnicas de Manutenção de Código de IA
- [x] Seção 5: Ferramentas de Manutenção
- [x] README.md com visão geral
- [ ] Revisão integrada do capítulo
- [ ] Links cruzados com outros KAs

## Dados-Chave do Capítulo

| Métrica                  | Valor | Contexto                               |
| ------------------------ | ----- | -------------------------------------- |
| Débito técnico acelerado | 2-3x  | vs código humano tradicional           |
| Tempo de compreensão     | +50%  | Para código gerado por IA              |
| Taxa de regressão        | +30%  | Quando não há testes de caracterização |
| Documentação necessária  | 100%  | Deve ser retrospectiva                 |

## Referências Principais

### Livros

- Feathers, M. C. (2004). *Working Effectively with Legacy Code*. Prentice Hall.
- Pigoski, T. M. (1996). *Practical Software Maintenance*. Wiley.
- Martin, R. C. (2008). *Clean Code: A Handbook of Agile Software
  Craftsmanship*. Prentice Hall.

### Pesquisa e Relatórios

- Sculley, D., et al. (2015). Hidden Technical Debt in Machine Learning Systems.
  *NIPS 2015*.
- IEEE (2022). *ISO/IEC/IEEE 14764 - Software Maintenance*.
- Microsoft Research (2025). *Model Drift in Production LLM Systems*.

______________________________________________________________________

*Capítulo 7 do SWEBOK-AI v5.0 — Manutenção de Sistemas Opaços* *Última
atualização: Janeiro 2026*

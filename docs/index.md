---
title: SWEBOK-AI v5.0
created_at: '2026-01-31'
tags: [swebok-ai, visao-geral]
status: review
updated_at: '2026-02-05'
ai_model: openai/gpt-5.2
---

# Engenharia de Software Morreu.<br>Longa Vida à Engenharia de Software

![Logo SWEBOK-AI v5.0](imgs/logo.png)

> **"O código tornou-se commodity; o contexto tornou-se capital."**

Esta é a premissa que rege o SWEBOK-AI v5.0. Não se trata de mais uma ferramenta
ou framework, mas de uma transformação estrutural na natureza do trabalho de
engenharia de software.

Grandes Modelos de Linguagem (LLMs) eliminaram a barreira da sintaxe. Hoje,
qualquer desenvolvedor pode gerar milhares de linhas de código funcional em
minutos. O gargalo produtivo deslocou-se radicalmente: não é mais *escrever*
código, mas *verificar* se o código gerado é correto, seguro e alinhado ao
negócio.

Este guia nasce de uma constatação urgente: a engenharia de software
tradicional, construída sobre a escassez de código, colapsa diante da abundância
de código. As práticas que dominamos — especificação de requisitos, design
imperativo, testes baseados em cobertura — foram projetadas para um mundo onde
código era caro e atenção era abundante. Esse mundo não existe mais.

O SWEBOK-AI v5.0 propõe uma disciplina nova: a **Engenharia de Restrições e
Verificação**. Aqui, o engenheiro não é mais o autor do código, mas o arquiteto
de limites dentro dos quais sistemas autônomos operam. O valor profissional
reside na capacidade de definir *o que não pode ser feito*, fornecer *contexto
organizacional* que a IA não possui, e estabelecer *garantias de corretude* para
artefatos probabilísticos.

Este livro é para engenheiros que reconhecem que a IA não substitui o julgamento
técnico — o amplifica. Para líderes que entendem que mais código não significa
mais valor. Para profissionais dispostos a abandonar a ilusão de que código bem
formatado implica código correto.

A engenharia de software como a conhecemos terminou. Longa vida à engenharia de
software.

[![Versão](https://img.shields.io/badge/Vers%C3%A3o-5.0.0--beta-blue)](https://github.com/gvillalta99/swebok-ai)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)](https://github.com/gvillalta99/swebok-ai)
[![Licença](https://img.shields.io/badge/Licen%C3%A7a-CC%20BY%204.0-green)](LICENSE)

[📖 Começar a Ler](00-fim-codificacao-fundamentos-ai-first/)
[📥 Baixar PDF](https://gvillalta99.github.io/swebok-ai/assets/swebok-ai.pdf)
[⭐ GitHub](https://github.com/gvillalta99/swebok-ai)

![Capa SWEBOK-AI v5.0](imgs/capa.png)

## A Crise Silenciosa da Engenharia de Software

Estamos vivenciando uma transformação sem precedentes:

- **70% das empresas** já usam IA para gerar código (GitHub, 2024)
- **Custo de bugs** em código gerado por IA: 3x maior que código tradicional
- **Engenheiros juniores** produzem 55% mais código, mas com qualidade
  questionável
- **Arquitetura e governança** tornaram-se gargalos, não produção

> *"Não estamos com falta de código. Estamos com excesso de código não
> verificado."*

O SWEBOK-AI v5.0 nasceu para responder a uma pergunta crucial: **como a
engenharia de software deve evoluir quando máquinas escrevem código melhor e
mais rápido que humanos?**

## Os 5 Princípios do SWEBOK-AI

1. **Verificação > Geração** — O gargalo mudou; seu foco deve mudar também
2. **Restrições > Requisitos** — Defina o que NÃO fazer, não só o que fazer
3. **Contexto é Capital** — Prompts bem estruturados valem mais que código
4. **Human-in-the-Loop Obrigatório** — Saiba quando a IA deve parar
5. **Código é Liabilidade** — Menos código = menos risco (Paradoxo de Jevons)

## O Que É Diferente?

| Antes (SWEBOK v4)                                       | Depois (SWEBOK-AI v5)                                                                               |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Engenharia = Transformar requisitos em código eficiente | Engenharia = Estabelecer restrições para sistemas autônomos gerarem soluções provavelmente corretas |
| Foco na produção de código                              | Foco na verificação e governança                                                                    |
| Gargalo: escrever código                                | Gargalo: validar código gerado por IA                                                               |
| Requisitos = "o que construir"                          | Restrições = "o que NÃO deixar construir"                                                           |

## O Que Você Vai Aprender

O SWEBOK-AI v5.0 organiza o conhecimento em 18 Knowledge Areas (KAs),
reconfigurados para o paradigma AI-First:

### Fundamentos

| Capítulo | Título                                                                                               | O Que Você Vai Dominar                                    |
| -------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 0        | [O Fim da Codificação: Fundamentos da Engenharia AI-First](00-fim-codificacao-fundamentos-ai-first/) | O paradigma AI-First e por que a engenharia precisa mudar |
| 1        | [Engenharia de Restrições e Contexto](01-software-requirements/)                                     | Definir limites e fronteiras para sistemas autônomos      |

### Knowledge Areas Principais

| Capítulo | Título                                                                     | O Que Você Vai Dominar                |
| -------- | -------------------------------------------------------------------------- | ------------------------------------- |
| 2        | [Arquitetura de Sistemas Híbridos](02-software-architecture/)              | Padrões humanos-IA que escalam        |
| 3        | [Design de Sistemas Híbridos](03-software-design/)                         | Auditabilidade e supervisão em design |
| 4        | [Orquestração e Curadoria de Código](04-software-construction/)            | Avaliação de código gerado por IA     |
| 5        | [Verificação e Validação em Escala](05-software-testing/)                  | Testar sistemas não-determinísticos   |
| 6        | [Engenharia de Operações de Software](06-software-engineering-operations/) | Operações em ambientes com IA         |
| 7        | [Manutenção de Sistemas Opaços](07-software-maintenance/)                  | Manter código que você não escreveu   |
| 8-18     | Knowledge Areas em Expansão                                                | Em desenvolvimento ativo              |

!!! tip "Comece Aqui" Novo no SWEBOK-AI? Leia o
[Capítulo 0: O Fim da Codificação](00-fim-codificacao-fundamentos-ai-first/)
primeiro. Ele estabelece os fundamentos conceituais para todo o restante do
guia.

## Para Quem É Este Guia?

- **Engenheiros de Software** que trabalham com ferramentas de IA e precisam
  garantir qualidade em código gerado automaticamente
- **Líderes Técnicos** definindo estratégias de adoção de IA e estabelecendo
  governança para equipes
- **Arquitetos de Software** projetando sistemas que integram humanos e IA
- **Profissionais de QA** desenvolvendo estratégias para validar código
  não-determinístico
- **Estudantes** compreendendo a nova realidade da engenharia de software e se
  preparando para o mercado de 2026+

## Como Usar Este Guia

1. **Leitura Linear**: Comece pelo Capítulo 0 e siga sequencialmente
2. **Consulta Rápida**: Use a busca para encontrar tópicos específicos
3. **Referência**: Baixe o PDF para acesso offline
4. **Contribuição**: Participe do desenvolvimento no GitHub

## Download

- **PDF Completo**:
  [swebok-ai.pdf](https://gvillalta99.github.io/swebok-ai/assets/swebok-ai.pdf)
  (gerado automaticamente a cada publicação)

## Comunidade e Contribuição

Este é um projeto open source em desenvolvimento ativo. Sua contribuição é
bem-vinda:

- 🐛 [Reportar issues](https://github.com/gvillalta99/swebok-ai/issues)
- 💡 [Sugerir melhorias](https://github.com/gvillalta99/swebok-ai/discussions)
- 📝
  [Contribuir com conteúdo](https://github.com/gvillalta99/swebok-ai/blob/main/CONTRIBUTING.md)
- ⭐ [Dar uma estrela no GitHub](https://github.com/gvillalta99/swebok-ai)

!!! info "Versão Atual: 5.0.0-beta" Este guia está em desenvolvimento ativo.
Última atualização: 2026-02-05. Novos capítulos são adicionados regularmente.

## Licença

O conteúdo original deste repositório está sob a licença em . Materiais de
terceiros não são distribuídos aqui; veja `NOTICE`.

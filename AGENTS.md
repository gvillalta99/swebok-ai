# AGENTS.md - SWEBOK-AI v5.0

> Guia de orientação para agentes de IA trabalhando neste projeto.
> Última atualização: 2026-01-29

---

## Visão Geral do Projeto

**SWEBOK-AI v5.0** (Software Engineering Body of Knowledge - AI Edition) é uma reimaginação completa do Guia do Conhecimento em Engenharia de Software tradicional (SWEBOK v4) para a era dos Large Language Models (LLMs).

### Princípio Diretor

> **"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é primariamente sobre sintaxe e lógica de implementação, assumindo que geração algorítmica é infraestrutura, não produto.

### Paradigma Shift

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Engenharia = Transformar requisitos em código eficiente | Engenharia = Estabelecer restrições para sistemas autônomos gerarem soluções provavelmente corretas, auditáveis e responsabilizáveis |
| Foco na produção de código | Foco na verificação e governança |
| Gargalo: escrever código | Gargalo: validar código gerado por IA |
| Requisitos = "o que construir" | Restrições = "o que NÃO deixar construir" |

---

## Estrutura do Projeto

### Organização de Diretórios

```
02-projetos/09-swebok-ai-v5.0/
├── README.md                          # Visão geral da arquitetura futura
├── AGENTS.md                          # Este arquivo
├── book-writer.md                     # Configuração do agente escritor
├── (externo) swebok-v4.pdf             # Referência: SWEBOK v4 (NAO versionado por copyright)
├── swebok-ai.md                       # Resumo da arquitetura SWEBOK-AI
├── swe-ai-future.md                   # Análise do impacto da IA no mercado
├── swe-ai-artifacts.md                # Artefatos estratégicos para 2026
├── swe-ai-organizational-patterns.md  # Padrões de organização de repositórios
│
├── 01-software-requirements/          # Engenharia de Restrições e Contexto
│   ├── README.md
│   ├── PLAN.md                        # Plano detalhado do capítulo
│   ├── 01-fundamentos-engenharia-restricoes.md
│   ├── 02-elicitacao-contexto-intencao.md
│   ├── 03-especificacao-invariantes-contratos.md
│   ├── 04-modelagem-degradacao-graciosa-falhas.md
│   ├── 05-governanca-responsabilidade-requisitos.md
│   ├── 06-gestao-variabilidade-evolucao.md
│   └── 07-ferramentas-tecnicas-modernas.md
│
├── 02-software-architecture/          # Arquitetura de Sistemas Híbridos
├── 03-software-design/                # Design de Sistemas Híbridos (Humanos-IA)
├── 04-software-construction/          # Orquestração e Curadoria de Código
├── 05-software-testing/               # Verificação e Validação em Escala
├── 06-software-engineering-operations/
├── 07-software-maintenance/           # Manutenção de Sistemas Opaços
├── 08-software-configuration-management/
├── 09-software-engineering-management/
├── 10-software-engineering-process/
├── 11-software-engineering-models-and-methods/
├── 12-software-quality/
├── 13-software-security/
├── 14-software-engineering-professional-practice/  # Prática Profissional e Julgamento Técnico
├── 15-software-engineering-economics/              # Economia e Métricas da Engenharia com IA
├── 16-computing-foundations/                       # Fundamentos de Sistemas Cognitivos Artificiais
├── 17-mathematical-foundations/
└── 18-engineering-foundations/
```

### Status dos Knowledge Areas (KAs)

| KA | Status | Descrição |
|----|--------|-----------|
| 01 | **Em desenvolvimento** | Único KA com conteúdo substancial (7 seções completas) |
| 02-18 | **Placeholder** | Apenas README.md básico em cada diretório |

---

## Technology Stack

Este é um projeto de **documentação pura**:

- **Formato:** Markdown (.md)
- **Linguagem:** Português (PT-BR) - conteúdo principal
- **Configuração de agentes:** YAML front matter (ex: `book-writer.md`)
- **Build system:** Nenhum (documentação estática)
- **Dependências:** Nenhuma

---

## Convenções de Desenvolvimento

### Idioma e Tom

- **Idioma primário:** Português formal (PT-BR)
- **Tom:** Acadêmico/técnico, formal e preciso
- **Tratamento:** Formal ("você")
- **Termos técnicos:** Manter em inglês quando não houver tradução consagrada (ex: "debugging", "framework")

### Estrutura de Arquivos

- Nomenclatura: kebab-case (`nome-do-arquivo.md`)
- Codificação: UTF-8
- Extensão: `.md` para todo conteúdo

### Estrutura de Conteúdo

Todo arquivo de conteúdo deve seguir esta estrutura:

```markdown
# Título da Seção

## Overview
Breve descrição da relevância para o SWEBOK-AI v5.0.

## Learning Objectives
Após estudar esta seção, o leitor deve ser capaz de:
1. [Objetivo mensurável 1]
2. [Objetivo mensurável 2]

## [Subseção 1]
[Conteúdo...]

## Practical Considerations
Aplicações reais, limitações e melhores práticas.

## Summary
- Ponto chave 1
- Ponto chave 2

## References
1. [Autor], [Título], [Publicação], [Ano]
```

### Matriz de Avaliação Consolidada

Todo KA deve incluir esta matriz de avaliação:

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Alta/Média/Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto/Médio/Baixo |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica/Moderada/Baixa |

---

## Mapeamento dos KAs

### KAs Tradicionais Reconfigurados

| Nº | Nome Original | Novo Nome (SWEBOK-AI) | Foco Principal |
|----|---------------|----------------------|----------------|
| 01 | Software Requirements | Engenharia de Restrições e Contexto | Limites e fronteiras para IA |
| 02 | Software Architecture | Arquitetura de Sistemas Híbridos | Padrões humanos-IA |
| 03 | Software Design | Design de Sistemas Híbridos | Auditabilidade e supervisão |
| 04 | Software Construction | Orquestração e Curadoria de Código | Avaliação de código gerado |
| 05 | Software Testing | Verificação e Validação em Escala | Teste de sistemas não-determinísticos |
| 07 | Software Maintenance | Manutenção de Sistemas Opaços | Código legado sem documentação de raciocínio |
| 14 | Professional Practice | Prática Profissional e Julgamento Técnico | Autoridade técnica e "quando dizer não à IA" |
| 15 | Engineering Economics | Economia e Métricas da Engenharia com IA | Paradoxo de Jevons, TCO de código gerado |
| 16 | Computing Foundations | Fundamentos de Sistemas Cognitivos Artificiais | LLMs, RAG, atenção em Transformers |

### Novos KAs Propostos

- **Engenharia de Garantia e Verificação em Escala**
- **Governança de IA para Engenharia de Software**
- **Engenharia de Manutenção de Sistemas Opaços**

---

## Guia para Contribuição

### Antes de Escrever

1. **Consulte o `book-writer.md`**: Contém diretrizes detalhadas para o agente escritor
2. **Verifique o `PLAN.md`**: Se existir no KA, segue o plano estabelecido
3. **Mantenha consistência**: Use a mesma terminologia entre seções e KAs

### Princípios de Escrita

1. **Perspectiva AI-First:** Assuma que geração de código é infraestrutura
2. **Centrado em Verificação:** O gargalo é validação, não produção
3. **Human-in-the-Loop:** Defina quando supervisão humana é obrigatória
4. **Realidade Econômica:** Considere TCO e Paradoxo de Jevons

### Conteúdo LEGADO

Marque explicitamente como **LEGADO**:
- Técnicas de codificação manual de baixo nível
- Modelos de carreira baseados em volume de código
- Testes baseados apenas em cobertura de código

### Checklist de Qualidade

Antes de finalizar conteúdo:
- [ ] Estrutura segue o padrão estabelecido
- [ ] Termos técnicos definidos no primeiro uso
- [ ] Exemplos práticos e relevantes
- [ ] Referências citadas corretamente
- [ ] Matriz de avaliação incluída
- [ ] Considerações econômicas abordadas
- [ ] Alinhamento com filosofia SWEBOK-AI v5.0

---

## Arquivos de Referência Importantes

| Arquivo | Propósito |
|---------|-----------|
| `book-writer.md` | Configuração e diretrizes para agentes escritores |
| `swebok-ai.md` | Resumo executivo da arquitetura |
| `swe-ai-future.md` | Análise crítica do impacto da IA no mercado de trabalho |
| `swe-ai-artifacts.md` | Artefatos estratégicos essenciais para 2026 |
| `swe-ai-organizational-patterns.md` | Padrões de organização de código/repositórios |
| `swebok-v4.pdf` | Documento de referência original (SWEBOK v4) - NAO versionado (obter de fonte oficial) |

---

## Considerações de Segurança

- Não incluir informações sensíveis ou proprietárias em exemplos
- Ao discutir casos de estudo, usar dados anonimizados
- Referências a vulnerabilidades devem ser acompanhadas de mitigações

---

## Processo de Desenvolvimento

1. **Fase de Planejamento**: Criar `PLAN.md` no diretório do KA
2. **Fase de Escrita**: Desenvolver conteúdo seguindo templates
3. **Fase de Revisão**: Verificar qualidade e consistência
4. **Fase de Integração**: Garantir coerência entre KAs relacionados

---

## Contato e Coordenação

Este projeto é desenvolvido de forma contínua. Ao trabalhar em qualquer KA:
- Verifique dependências com outros KAs
- Mantenha referências cruzadas atualizadas
- Documente decisões arquiteturais em ADRs quando aplicável

---

*Este documento é um guia vivo e deve ser atualizado conforme o projeto evolui.*

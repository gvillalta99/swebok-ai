---
title: "Métricas e Produtividade em Times com IA"
created_at: "2026-01-31"
tags: ["metricas", "produtividade", "dora", "times", "ia", "performance"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "kimi-k2.5"
---

# 3. Métricas e Produtividade em Times com IA

## Overview

A medição de produtividade em times de software sempre foi um desafio complexo. Com a introdução massiva de ferramentas de IA, as métricas tradicionais não apenas falham em capturar valor real, mas frequentemente fornecem sinais distorcidos ou até contrários à realidade. Esta seção apresenta um novo framework de métricas adequado para times que trabalham com geração assistida por IA.

### Por Que Métricas Tradicionais Falham

As métricas tradicionais de produtividade de software foram projetadas para um mundo onde:
- Todo código era escrito por humanos
- O esforço de produção era o gargalo
- A qualidade era função do processo de desenvolvimento

Na era da IA, estas premissas são invalidadas:
- Código é gerado em segundos, não horas
- O gargalo é verificação, não produção
- Volume de código não correlaciona com valor entregue

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar limitações das métricas tradicionais em contextos com IA
2. Aplicar novas métricas como taxa de aceitação e tempo de curadoria
3. Adaptar métricas DORA para times com IA
4. Calcular custo real por feature entregue incluindo verificação
5. Analisar a contribuição humana vs. sintética em entregas

## 3.1 Falhas das Métricas Tradicionais

### SLOC (Source Lines of Code)

**Problema Fundamental:**
Código gerado por IA tende a ser mais verboso que código escrito por humanos experientes. Um aumento de SLOC pode indicar:
- Maior produtividade (interpretação tradicional)
- Ou código de menor qualidade (realidade com IA)

**Exemplo:**
```
Cenário A: Engenheiro experiente escreve 100 linhas de código limpo
Cenário B: IA gera 500 linhas de código verboso para mesmo recurso

Métrica SLOC: Cenário B é "5x mais produtivo"
Realidade: Cenário A é superior em qualidade e manutenibilidade
```

**Recomendação:** Abandonar SLOC como métrica de produtividade. Usar apenas como métrica de complexidade com ajustes.

### Commits

**Problema Fundamental:**
Ferramentas de IA podem gerar múltiplos commits automaticamente ou sugerir commits frequentes. Métricas baseadas em commits capturam:
- Atividade de IA, não necessariamente valor
- Fragmentação do trabalho
- Ruído ao invés de sinal

**Dados do DORA Report 2025:**
- Pull requests aumentaram 98% com uso de IA
- Tamanho médio de PR aumentou 154%
- Commits por PR aumentaram 3x

**Recomendação:** Medir tamanho de changes, não número de commits. Focar em deploy frequency ao invés de commit frequency.

### Velocity (Story Points)

**Problema Fundamental:**
Story points tradicionais estimam esforço de implementação. Com IA:
- Esforço de implementação é reduzido drasticamente
- Esforço de verificação não é capturado
- Times podem "inflar" pontos artificialmente

**Efeito Observado:**
Times relatam velocity estável ou crescente, mas throughput de valor real permanece constante ou diminui devido a gargalos de verificação.

**Recomendação:** Separar velocity de geração de velocity de verificação. Ou abandonar story points em favor de métricas de outcome.

### Code Coverage

**Problema Fundamental:**
IA pode gerar testes automaticamente, inflando cobertura sem aumentar confiança real:
- Testes gerados podem não testar comportamento relevante
- Cobertura alta não indica qualidade de verificação
- Foco em métrica pode desviar atenção de testes significativos

**Recomendação:** Medir cobertura de cenários de negócio, não apenas linhas de código. Usar mutation testing para avaliar qualidade dos testes.

## 3.2 Novas Métricas para a Era da IA

### Taxa de Aceitação de Código Gerado (Acceptance Rate)

**Definição:**
Percentual de código gerado por IA que é aceito sem modificação significativa após revisão.

```
Acceptance Rate = (Código Aceito / Código Gerado) × 100
```

**Interpretação:**

| Taxa | Interpretação | Ação Sugerida |
|------|--------------|---------------|
| > 80% | Excelente | Manter práticas atuais |
| 60-80% | Bom | Refinar prompts e contexto |
| 40-60% | Regular | Revisar abordagem de geração |
| < 40% | Problemático | Investigar causas raiz |

**Causas Comuns de Baixa Taxa:**
- Contexto insuficiente nos prompts
- Requisitos mal especificados
- Domínio muito específico ou novo
- Ferramenta de IA inadequada para tarefa

### Tempo de Curadoria (Curation Time)

**Definição:**
Tempo médio gasto por engenheiro para revisar, verificar e integrar código gerado por IA.

```
Curation Time = Tempo Total de Revisão / Unidades de Código
```

**Métricas Relacionadas:**

| Métrica | Fórmula | Uso |
|---------|---------|-----|
| Curation Time por Linha | Horas de revisão / LOC | Comparar eficiência |
| Curation Time por Feature | Horas de revisão / Feature | Planejamento de capacidade |
| Curation Ratio | Tempo curadoria / Tempo total | Balanceamento de trabalho |

**Meta Sugerida:**
Curation Ratio entre 30-50% do tempo total de desenvolvimento.

- < 30%: Possível under-verification
- > 50%: Gargalo de revisão ou qualidade de geração baixa

### Custo por Feature Entregue

**Definição:**
Custo total (tempo e recursos) para entregar uma feature ao ambiente de produção, incluindo todas as fases.

```
Custo Total = Custo de Especificação + Custo de Geração + Custo de Verificação + Custo de Integração + Custo de Deploy
```

**Componentes:**

| Componente | Inclui | Tendência com IA |
|------------|--------|------------------|
| Especificação | Análise, design, preparação de contexto | Estável ou aumenta |
| Geração | Uso de ferramentas de IA, iterações | Diminui drasticamente |
| Verificação | Revisão, testes, análise de segurança | Aumenta significativamente |
| Integração | Refatoração, adaptação, documentação | Estável |
| Deploy | CI/CD, monitoramento inicial | Estável |

**Uso:**
- Comparar eficiência entre times
- Justificar investimentos em ferramentas
- Negociar escopo com stakeholders

### Human Contribution Ratio

**Definição:**
Proporção de trabalho humano no resultado final, medida em valor agregado (não apenas tempo).

```
Human Contribution Ratio = Valor Agregado Humano / Valor Total da Entrega
```

**Framework de Valor Agregado:**

| Atividade | Tipo de Valor | Contribuição |
|-----------|--------------|--------------|
| Especificação de requisitos | Estratégico | 100% Humano |
| Design arquitetural | Estratégico | 100% Humano |
| Geração de código boilerplate | Mecânico | 0% Humano |
| Refinamento de algoritmos | Técnico | 50/50 |
| Verificação de segurança | Crítico | 100% Humano |
| Testes exploratórios | Analítico | 80% Humano |
| Documentação técnica | Informativo | 30% Humano |

**Meta:**
Human Contribution Ratio > 40% em atividades de alto valor (estratégico, crítico, analítico).

## 3.3 DORA Metrics Adaptados para Times com IA

### As Quatro Métricas DORA

As métricas DORA (DevOps Research and Assessment) são amplamente reconhecidas como indicadores de performance de entrega de software:

1. **Deployment Frequency:** Frequência de deploys para produção
2. **Lead Time for Changes:** Tempo do commit ao deploy em produção
3. **Change Failure Rate:** Percentual de deploys que causam falhas
4. **Time to Restore Service:** Tempo para recuperar de falhas

### Adaptações Necessárias

#### Deployment Frequency com IA

**Mudança Observada:**
- Dados do DORA 2025: Aumento de 47% no número de deploys
- Porém: Aumento de 91% no tempo de revisão

**Nova Interpretação:**
Deployment frequency alto não é necessariamente positivo se:
- Changes são menores mas mais numerosos
- Overhead de coordenação aumentou
- Qualidade por deploy diminuiu

**Métrica Complementar:**
```
Deploy Value Density = Valor de Negócio Entregue / Número de Deploys
```

#### Lead Time for Changes com IA

**Decomposição do Lead Time:**

```
Lead Time Total = Lead Time de Geração + Lead Time de Verificação + Lead Time de Integração

Onde:
- Lead Time de Geração: Diminuiu drasticamente (minutos)
- Lead Time de Verificação: Aumentou (dias)
- Lead Time de Integração: Estável
```

**Nova Métrica:**
```
Verification Lead Time = Tempo de Início da Verificação até Aprovação
```

**Benchmarks DORA 2025:**

| Performance | Lead Time Total | Verification Lead Time |
|-------------|----------------|----------------------|
| Elite | < 1 dia | < 4 horas |
| High | 1 dia - 1 semana | 4-24 horas |
| Medium | 1 semana - 1 mês | 1-3 dias |
| Low | > 1 mês | > 3 dias |

#### Change Failure Rate com IA

**Observação do DORA 2025:**
Bug rates aumentaram 9% em times com alta adoção de IA.

**Hipóteses:**
1. Volume maior de código → Mais bugs absolutos
2. Revisão apressada → Bugs não detectados
3. Over-reliance em IA → Menos atenção humana

**Métrica Complementar:**
```
AI-Related Failure Rate = Falhas atribuíveis a código de IA / Total de Falhas
```

**Ações:**
- Investigar causas raiz de falhas
- Melhorar processos de verificação
- Treinar engenheiros em revisão de código de IA

#### Time to Restore Service com IA

**Impacto da IA:**
Potencial para melhoria através de:
- Diagnóstico automático de incidentes
- Sugestões de remediação
- Automação de rollbacks

**Métrica Complementar:**
```
AI-Assisted Recovery Rate = Incidentes resolvidos com assistência de IA / Total de Incidentes
```

### Novas Categorias de Performance DORA 2025

O relatório DORA 2025 introduziu **sete arquétipos de times** em vez de simples categorias de performance:

1. **Legacy Bottleneck:** Baixa performance, baixa adoção de IA
2. **Pragmatic Performers:** Boa performance, adoção moderada de IA
3. **Harmonious High-Achievers:** Alta performance, adoção equilibrada de IA
4. **AI-Accelerated:** Alta adoção de IA, performance em desenvolvimento
5. **Process-Heavy:** Muitos processos, baixa agilidade
6. **Fast-but-Fragile:** Velozes, mas com alta taxa de falhas
7. **Steady-State:** Performance consistente, mudança gradual

**Implicação:** Times devem buscar o arquétipo "Harmonious High-Achievers" ou "Pragmatic Performers".

## 3.4 Análise de Contribuição Humana vs. Sintética

### Framework de Análise

A análise de contribuição busca entender a proporção e natureza do trabalho humano versus gerado por IA em uma entrega.

#### Dimensões de Análise

**1. Por Volume de Código:**
```
Sinthetic Code Ratio = LOC gerado por IA / LOC total
```

**2. Por Esforço:**
```
Sinthetic Effort Ratio = Horas de interação com IA / Horas totais
```

**3. Por Valor:**
```
Sinthetic Value Ratio = Valor de funcionalidades primariamente geradas por IA / Valor total entregue
```

**4. Por Complexidade:**
```
Sinthetic Complexity Ratio = Complexidade de código gerado por IA / Complexidade total
```

### Matriz de Contribuição

| Tipo de Tarefa | Ideal Human | Ideal Synthetic | Observação |
|----------------|-------------|-----------------|------------|
| **Especificação** | 100% | 0% | Requer entendimento de negócio |
| **Design Arquitetural** | 90% | 10% | IA pode sugerir padrões |
| **Implementação Core** | 60% | 40% | Balanceamento necessário |
| **Boilerplate** | 10% | 90% | Automatizável |
| **Testes Unitários** | 30% | 70% | IA gera casos básicos |
| **Testes de Integração** | 70% | 30% | Requer entendimento de fluxos |
| **Revisão de Código** | 100% | 0% | Accountability humana |
| **Documentação** | 40% | 60% | IA gera templates |

### Sinais de Desequilíbrio

**Excesso de Contribuição Sintética (Riscos):**
- Taxa de falhas aumentando
- Débito técnico acumulando
- Engenheiros relatando falta de compreensão do código
- Dificuldade em debugar problemas

**Excesso de Contribuição Humana (Ineficiência):**
- Produtividade abaixo do benchmark
- Engenheiros frustrados com tarefas repetitivas
- Custos de desenvolvimento elevados
- Dificuldade em reter talentos

### Ferramentas de Análise

**GitHub Copilot Analytics:**
- Linhas aceitas vs. sugeridas
- Tempo de aceitação
- Taxa de retenção de código

**GitClear:**
- Análise de churn de código
- Distinção código novo vs. refactoring
- Métricas de equipe

**Waydev:**
- Análise de ciclo de desenvolvimento
- Métricas de revisão de código
- Benchmarks de produtividade

**Ferramentas Customizadas:**
- Scripts de análise de git history
- Classificação de commits (humano vs. IA)
- Dashboards de contribuição

## 3.5 SPACE Framework Adaptado

### O Framework SPACE

SPACE é um framework holístico para medir produtividade de desenvolvedores, considerando cinco dimensões:

- **S**atisfaction and well-being
- **P**erformance
- **A**ctivity
- **C**ommunication and collaboration
- **E**fficiency and flow

### Adaptações para Contexto com IA

#### Satisfaction and Well-being

**Novas Métricas:**
- **AI Comfort Score:** Nível de conforto relatado trabalhando com IA
- **Autonomy Perception:** Sentimento de controle sobre o trabalho
- **Learning Anxiety:** Preocupação com obsolescência de skills

**Métricas Tradicionais (mantidas):**
- Employee Net Promoter Score (eNPS)
- Work-life balance
- Burnout indicators

#### Performance

**Novas Métricas:**
- **Acceptance Rate** (conforme definido anteriormente)
- **Verification Quality Score:** Qualidade do processo de verificação
- **Human Judgment Calls:** Decisões críticas tomadas por humanos

**Métricas Tradicionais (adaptadas):**
- Defect rates (distinguir bugs de código humano vs. IA)
- Customer satisfaction
- Business value delivered

#### Activity

**Novas Métricas:**
- **IA Interaction Time:** Tempo gasto interagindo com ferramentas de IA
- **Prompt Refinement Cycles:** Número de iterações para obter código aceitável
- **Context Preparation Time:** Tempo preparando contexto para IA

**Métricas Tradicionais (revisadas):**
- Commits (menos relevante)
- Pull requests (analisar tamanho e qualidade)
- Code reviews (focar em tempo e qualidade)

#### Communication and Collaboration

**Novas Métricas:**
- **Knowledge Sharing on IA:** Documentação e compartilhamento de práticas
- **Cross-functional IA Discussions:** Colaboração sobre uso de IA
- **Mentoring on Verification:** Transferência de skills de curadoria

**Métricas Tradicionais (mantidas):**
- Meeting effectiveness
- Documentation quality
- Team cohesion

#### Efficiency and Flow

**Novas Métricas:**
- **Context Switching Due to IA:** Interrupções causadas por ferramentas de IA
- **Flow State Duration:** Períodos de trabalho focado
- **Cognitive Load from Verification:** Esforço mental de revisão

**Métricas Tradicionais (adaptadas):**
- Lead time (decompor em geração vs. verificação)
- Deployment frequency (considerar qualidade)
- Work in progress (incluir código em verificação)

## Practical Considerations

### Aplicações Reais

1. **Relatórios de Performance Individual**
   - Focar em qualidade de verificação
   - Reconhecer contribuição de curadoria
   - Evitar gamification de métricas de volume

2. **Avaliação de Times**
   - Comparar acceptance rates entre squads
   - Identificar gargalos de verificação
   - Benchmark contra DORA metrics

3. **Justificativa de Investimentos**
   - Calcular ROI de ferramentas de IA
   - Demonstrar impacto em time-to-market
   - Quantificar custos de verificação

### Limitações

- Dados de IA podem não ser completamente precisos
- Métricas comportamentais podem ser gamificadas
- Contexto organizacional afeta interpretação
- Benchmarks externos podem não ser aplicáveis

### Melhores Práticas

1. **Usar múltiplas métricas:** Nunca confiar em métrica única
2. **Focar em tendências:** Mais importante que valores absolutos
3. **Contextualizar dados:** Sempre considerar contexto organizacional
4. **Revisar periodicamente:** Métricas devem evoluir com práticas
5. **Proteger bem-estar:** Nunca usar métricas para punir

## Summary

- **Métricas tradicionais falham** porque não capturam o custo de verificação e podem incentivar comportamentos indesejados
- **Novas métricas essenciais:** Acceptance rate, curation time, custo por feature, human contribution ratio
- **DORA metrics precisam de adaptação** para distinguir geração de verificação e considerar qualidade
- **Análise de contribuição** deve considerar não apenas volume, mas tipo e valor do trabalho
- **SPACE framework** oferece abordagem holística quando adaptado para contexto com IA

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Média** — ferramentas de métricas evoluem, mas análise de dados permanece crítica |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Médio** — métricas automatizáveis, mas interpretação requer expertise |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Moderada** — métricas mal interpretadas podem levar a decisões ruins |

## References

1. Google Cloud/DORA, "2025 DORA Report: The Impact of AI on Software Delivery", 2025.
2. O'Reilly Media, "Measuring Developer Productivity in the AI Era", 2025.
3. Stack Overflow, "The Myth of 10x Developers in the Age of AI Assistants", 2025.
4. Codecon, "Métricas de Performance DORA e SPACE: medindo a produtividade de devs", 2025.
5. Faros AI, "Key Takeaways from the DORA Report 2025", 2025.
6. GitHub, "Octoverse 2025: The State of Open Source and AI", 2025.
7. Forsgren, N., et al., "SPACE: A Framework for Understanding Productivity", ACM Queue, 2021.
8. Google Cloud, "DORA's software delivery performance metrics", 2025.

---
title: "02 - Processos Ágeis Adaptados para o Uso de IA"
created_at: "2025-01-31"
tags: ["processos", "agil", "scrum", "xp", "ia", "sprints", "cerimonias"]
status: "draft"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 2. Processos Ágeis Adaptados para o Uso de IA

## Overview

Metodos ageis continuam validos em contexto com IA, desde que se adapte o foco: “done” precisa significar verificado, e nao apenas gerado. Cerimonias e artefatos precisam tornar visiveis os novos gargalos (verificacao e curadoria) e as novas fontes de mudanca (prompts, contexto e modelos).

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Adaptar Scrum para separar geracao de verificacao.
2. Reconfigurar Definition of Done com evidencias e rastreabilidade.
3. Aplicar praticas XP (pairing e TDD) para aumentar verificabilidade.
4. Ajustar Kanban para limitar WIP pela capacidade de revisao.
5. Conduzir retrospectivas baseadas em dados de verificacao e retrabalho.

## 2.1 Scrum Adaptado para Times com IA

### 2.1.1 Sprint: De “feito” para “aprovado”

No Scrum tradicional, um Sprint produz um incremento de software potencialmente entregável. Com IA, um Sprint produz **candidatos a software** que requerem validação antes de serem considerados prontos:

| Aspecto | Scrum Tradicional | Scrum com IA |
|---------|-------------------|--------------|
| **Output do Sprint** | Incremento de software | Candidatos a software + métricas de qualidade |
| **Gargalo** | Implementação | Verificação e curadoria |
| **Velocity** | Story points completados | Features verificadas e aprovadas |
| **Definition of Done** | Código testado e integrado | Código gerado, verificado, curado e documentado |
| **Foco da Retrospectiva** | Melhoria do processo humano | Ajuste de prompts e otimização de verificação |

Evite depender de “percentuais do mercado” para justificar mudancas. O argumento principal e operacional: se o time gera mais do que verifica, a entrega desacelera.

### 2.1.2 Sprint Planning: Planejar Verificacao

**A Grande Mudança:** A geração de código tornou-se essencialmente "instantânea" em comparação com a implementação manual. O esforço do Sprint Planning deve focar em:

**Estrutura Adaptada do Sprint Planning:**

1. **Parte 1: Seleção e Especificação (30%)**
   - Selecionar itens do Product Backlog
   - Especificar intenção e contexto para cada item
   - Definir critérios de aceitação verificáveis
   - Identificar necessidade de curadoria humana

2. **Parte 2: Estimativa de Verificação (50%)**
   - Estimar esforço de especificação detalhada
   - Estimar tempo de verificação sintática e semântica
   - Alocar recursos de curadoria
   - Identificar riscos e dependências

3. **Parte 3: Compromisso (20%)**
   - Definir meta do Sprint baseada em capacidade de verificação
   - Comprometer-se com qualidade, não apenas quantidade

**Técnicas de Estimativa Adaptadas:**

- **Planning Poker 2.0**: Cartas representam esforço de verificação (não implementação)
  - 1 ponto: Verificação trivial (padrões conhecidos, baixo risco)
  - 3 pontos: Verificação moderada (lógica de negócio, testes necessários)
  - 5 pontos: Verificação complexa (integrações, segurança, curadoria obrigatória)
  - 8+ pontos: Decompor — muito complexo para verificação em um ciclo

### 2.1.3 Daily: Tornar Visivel o Backlog de Verificacao

O Daily Standup tradicional foca em "o que fiz ontem, o que farei hoje, impedimentos". Com IA, adicionamos dimensões de qualidade e verificação:

**Template de Daily Standup com IA:**

```
1. PROGRESSO (tradicional)
   - O que foi gerado/verificado ontem?
   - O que será gerado/verificado hoje?
   - Impedimentos?

2. MÉTRICAS DE IA (novo)
   - Acceptance rate do dia anterior: ___%
   - Código aguardando curadoria: ___ items
   - Falsos positivos na verificação: ___

3. AJUSTES DE PROCESSO (novo)
   - Prompts que precisam de refinamento
   - Padrões de erro identificados
   - Oportunidades de automação
```

**Foco nas Métricas:**

| Métrica | Descrição | Alvo |
|---------|-----------|------|
| **Acceptance Rate** | % de código gerado aprovado na primeira verificação | >70% |
| **Pending Curation** | Quantidade de código aguardando revisão humana | <5 items/pessoa |
| **False Positives** | Verificações que rejeitaram código válido | <10% |
| **Rework Rate** | % de código retornado para regeneração | <20% |

### 2.1.4 Review: Validacao de Comportamento

**Mudança Fundamental:** Em vez de demonstrar funcionalidades implementadas, o Sprint Review torna-se uma sessão de **validação comportamental** onde stakeholders interagem com candidatos a software:

**Estrutura do Sprint Review Adaptado:**

1. **Visão Geral das Gerações (10 min)**
   - Quantidade de código gerado
   - Taxas de aceitação
   - Principais desafios de verificação

2. **Demonstração Interativa (40 min)**
   - Stakeholders testam funcionalidades diretamente
   - Feedback imediato sobre comportamento
   - Identificação de casos de borda não previstos

3. **Discussão de Curadoria (20 min)**
   - Decisões de curadoria significativas
   - Trade-offs aceitos
   - Feedback sobre qualidade

4. **Priorização do Backlog (10 min)**
   - Ajustes baseados no feedback
   - Novos itens descobertos durante testes

### 2.1.5 Retrospectiva: Causas de Retrabalho

A Retrospectiva em times com IA mantém o formato de "o que funcionou, o que não funcionou, ações", mas o conteúdo muda significativamente:

**Temas de Retrospectiva Específicos para IA:**

**1. Eficácia dos Prompts**
- Quais padrões de prompt geraram melhor código?
- Houve ambiguidades que causaram retrabalho?
- Como melhorar a especificação de intenção?

**2. Eficiência da Verificação**
- Gargalos no processo de verificação
- Falsos positivos/negativos nas verificações automáticas
- Oportunidades de automação adicional

**3. Qualidade da Curadoria**
- Decisões de curadoria que poderiam ser automatizadas
- Casos onde a curadoria foi superficial
- Documentação de decisões

**4. Colaboração Humano-IA**
- Momentos onde IA foi mais valiosa
- Momentos onde intervenção humana foi crítica
- Balanceamento do trabalho entre humanos e IA

**Formato de Ação de Melhoria:**

```
AÇÃO: [Descrição clara]
RESPONSÁVEL: [Nome]
PRAZO: [Data]
MÉTRICA DE SUCESSO: [Como saberemos que funcionou]
```

## 2.2 Definition of Done para Processos com IA

### 2.2.1 Checklist Ampliado

O Definition of Done tradicional deve ser estendido para incluir verificação e curadoria:

**Definition of Done - Versão com IA:**

```markdown
## Código Gerado
- [ ] Especificação de intenção documentada e revisada
- [ ] Contexto e restrições definidos
- [ ] Código gerado por IA com prompt versionado
- [ ] Verificação sintática passou (lint, compilação)
- [ ] Verificação semântica passou (testes automatizados)
- [ ] Análise estática de segurança passou

## Validação
- [ ] Testes de unidade cobrem caminhos principais
- [ ] Testes de integração passaram
- [ ] Critérios de aceitação verificados
- [ ] Casos de borda identificados e testados

## Curadoria
- [ ] Revisão humana realizada (se aplicável)
- [ ] Decisões de curadoria documentadas
- [ ] Raciocínio de trade-offs registrado

## Integração
- [ ] Código integrado ao branch principal
- [ ] Build contínuo passando
- [ ] Documentação atualizada
- [ ] Métricas de qualidade registradas
```

### 2.2.2 Níveis de Curadoria

Nem todo código requer o mesmo nível de curadoria. Defina critérios claros:

| Nível | Critérios | Quem Curadoria |
|-------|-----------|----------------|
| **Automático** | Código trivial, padrões conhecidos, baixo risco | Nenhum — apenas verificação automatizada |
| **Peer** | Lógica de negócio, integrações simples | Outro desenvolvedor |
| **Sênior** | Segurança, performance, arquitetura | Desenvolvedor sênior |
| **Especialista** | Código crítico para segurança, compliance | Especialista de domínio |

**Exemplos de Critérios para Cada Nível:**

- **Automático**: Refatorações simples, atualizações de dependências, testes de unidade padrão
- **Peer**: Novas funcionalidades de negócio, integrações com APIs internas
- **Sênior**: Mudanças arquiteturais, otimizações de performance, migrações de dados
- **Especialista**: Criptografia, autenticação, processamento de dados sensíveis, código regulamentado

## 2.3 Extreme Programming (XP) Adaptado

### 2.3.1 Pair Programming: Humano + IA

O pair programming tradicional (dois humanos) evolui para um modelo híbrido:

**Modelos de Colaboração:**

1. **Solo com IA (1 humano + IA)**
   - Desenvolvedor especifica, IA gera
   - Desenvolvedor verifica e itera
   - Uso: Tarefas bem definidas, padrões conhecidos

2. **Pair Híbrido (2 humanos + IA)**
   - Um humano especifica, IA gera
   - Segundo humano verifica em tempo real
   - Uso: Tarefas complexas, aprendizado

3. **Navigator Pattern (1 humano + múltiplas IAs)**
   - Humano define estratégia
   - IAs especializadas geram diferentes aspectos
   - Humano integra e verifica
   - Uso: Projetos multidisciplinares

**Práticas de Pair Programming com IA:**

- **Ping-Pong de Especificação**: Humano especifica caso de teste → IA gera implementação → Humano verifica → Próximo caso
- **Refinamento Iterativo**: Geração inicial → Feedback humano → Regeneração → Validação
- **Explicação Obrigatória**: IA deve explicar o código gerado antes da aceitação

### 2.3.2 Test-Driven Development (TDD) com IA

O TDD mantém seu ciclo (Red → Green → Refactor), mas com adaptações:

**Ciclo TDD com IA:**

```
1. RED (Humano)
   └─ Escrever teste que falha
   └─ Especificar comportamento esperado

2. GREEN (IA + Humano)
   └─ IA gera implementação mínima
   └─ Humano verifica se atende ao teste
   └─ Iterar se necessário

3. REFACTOR (IA + Humano)
   └─ IA sugere refatorações
   └─ Humano aprova ou ajusta
   └─ Testes continuam passando
```

**Vantagens do TDD com IA:**

- **Especificação Clara**: Testes servem como especificação não ambígua para IA
- **Feedback Imediato**: Saber imediatamente se a geração atende aos requisitos
- **Documentação Viva**: Testes documentam comportamento esperado
- **Confiança na Refatoração**: Podemos regenerar com confiança

### 2.3.3 Refatoração: Regeneração Seletiva vs. Manual

Com IA, a refatoração pode ser realizada de duas formas:

**Refatoração Manual (Tradicional):**
- Pequenas mudanças incrementais
- Preserva comportamento passo a passo
- Apropriada para: ajustes de design, renomeações, extração de métodos

**Regeneração Seletiva (Nova):**
- Especificar novo design desejado
- IA regenera código mantendo comportamento
- Verificação via testes existentes
- Apropriada para: mudanças arquiteturais, modernização, migrações

**Quando Usar Cada Abordagem:**

| Cenário | Abordagem Recomendada |
|---------|----------------------|
| Renomear variáveis | Manual |
| Extrair função | Manual |
| Mudar padrão arquitetural | Regeneração |
| Migrar para nova biblioteca | Regeneração |
| Otimizar algoritmo | Híbrido (regenerar + ajustar manual) |

## 2.4 Kanban e Fluxo Contínuo com IA

### 2.4.1 Visualização do Fluxo de Trabalho

O Kanban tradicional usa colunas como "To Do → In Progress → Done". Com IA, adicionamos estados de verificação:

**Board Kanban Adaptado:**

```
┌─────────┐   ┌─────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────┐
│  To Do  │──▶│ Especi- │──▶│  Gerando    │──▶│ Verificando │──▶│  Done   │
│         │   │ ficando │   │   (IA)      │   │   (Auto)    │   │         │
└─────────┘   └─────────┘   └─────────────┘   └──────┬──────┘   └─────────┘
                                                      │
                                                      ▼
                                               ┌─────────────┐
                                               │  Curadoria  │
                                               │  (Humano)   │
                                               └──────┬──────┘
                                                      │
                                                      ▼
                                               ┌─────────────┐
                                               │  Rejeitado  │
                                               │  (Retorna)  │
                                               └─────────────┘
```

### 2.4.2 Limites de WIP (Work In Progress)

Com verificação como gargalo, os limites de WIP devem refletir capacidade de validação:

- **WIP de Especificação**: Baseado na capacidade de criar especificações claras
- **WIP de Geração**: Ilimitado (IA gera em paralelo)
- **WIP de Verificação**: Baseado na capacidade humana de curadoria
- **WIP Total**: Soma dos WIPs acima, com ênfase no de verificação

**Regra de Ouro**: O WIP de verificação deve ser menor ou igual ao número de verificadores disponíveis multiplicado pela taxa média de verificação.

### 2.4.3 Metricas de Fluxo

Além das métricas tradicionais de Kanban (lead time, cycle time, throughput), adicione:

| Métrica | Definição | Uso |
|---------|-----------|-----|
| **Generation Time** | Tempo desde especificação até código gerado | Monitorar eficiência da IA |
| **Verification Time** | Tempo desde geração até aprovação | Identificar gargalos |
| **Curation Time** | Tempo de revisão humana | Alocar recursos |
| **Rework Time** | Tempo gasto em regeneração | Melhorar especificações |

## Practical Considerations

### Adoção Gradual (Processo)

1. Piloto: tarefas de baixa criticidade; evidencias simples.
2. Expansao: padronizar contratos e manifests; aumentar capacidade de revisao.
3. Escala: automatizar gates repetitivos; medir retrabalho e backlog.

### Anti-Padrões a Evitar

**1. Scrum de Fachada**
Manter cerimônias ágeis sem adaptar o conteúdo. Resultado: desperdício de tempo em reuniões sem valor.

**2. Automação sem Verificação**
Aceitar tudo que a IA gera sem processo de validação. Resultado: acúmulo de débito técnico.

**3. Curadoria Centralizada**
Um único curador para todo o time. Resultado: gargalo e burnout.

**4. Métricas Obsoletas**
Continuar medindo velocity em story points sem considerar qualidade. Resultado: incentivos perversos.

### Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Media |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Medio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Summary

- Scrum com IA mantém a estrutura de Sprints mas redefine o conteúdo de cada cerimônia
- Sprint Planning foca em **estimar verificação**, não geração
- Daily Standups incluem **métricas de IA** (acceptance rate, pending curation)
- Sprint Review torna-se **validação comportamental** interativa
- Retrospectivas focam em **prompts efetivos** e processos de curadoria
- Definition of Done inclui explicitamente **verificação e curadoria**
- XP evolui para **pair programming humano-IA** e TDD com feedback imediato
- Kanban adiciona estados de **verificação** e limites de WIP baseados em capacidade de curadoria

## References

1. Agile Manifesto. Manifesto for Agile Software Development. 2001. Disponivel em: https://agilemanifesto.org/
2. Schwaber, K.; Sutherland, J. The Scrum Guide. 2020.
3. Beck, K. Extreme Programming Explained: Embrace Change. 2. ed. Boston: Addison-Wesley, 2004.
4. Shore, J.; Warden, S. The Art of Agile Development. 2. ed. Sebastopol: O'Reilly Media, 2021.

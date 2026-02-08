---
title: Exercícios Práticos
created_at: 2025-02-07
tags: [exercises, practical, hands-on, labs, scenarios, workshops]
status: draft
updated_at: 2025-02-07
ai_model: kimi-for-coding/k2p5
---

# Exercícios Práticos

Esta seção apresenta exercícios práticos, cenários e laboratórios para
consolidação dos conceitos apresentados ao longo do Knowledge Area 06. Os
exercícios estão organizados por tópico e variam em complexidade desde questões
conceituais até simulações de cenários reais.

## Instruções Gerais

### Como Usar Este Capítulo

1. **Exercícios Individuais:** Ideal para auto-estudo e avaliação de compreensão
2. **Laboratórios:** Requerem ambiente de prática (cloud sandbox, Kubernetes
   cluster, etc.)
3. **Cenários:** Podem ser usados em grupos de estudo ou workshops
4. **Discussions:** Provocam reflexão sobre trade-offs e decisões de design

### Ambiente de Prática Recomendado

Para os laboratórios práticos, recomenda-se:

- **Cloud:** AWS Free Tier, GCP Free Tier, ou Azure Free Account
- **Local:** Minikube ou Kind para Kubernetes
- **Ferramentas:** Terraform, Docker, kubectl, helm
- **Opcional:** Conta no GitHub para CI/CD

______________________________________________________________________

## Parte 1: Fundamentos e Conceitos

### Exercício 1.1: SLIs, SLOs e Error Budgets

**Contexto:** Você é SRE para um serviço de pagamentos que processa 10 milhões
de transações por dia. O serviço é crítico para o negócio.

**Questões:**

1. Defina 3 SLIs apropriados para este serviço. Justifique cada escolha.

2. Para cada SLI, proponha um SLO realista. Considere:

   - Qual a disponibilidade atual (assuma 99.5%)
   - Qual o custo de melhoria
   - Expectativas dos clientes

3. Calcule o error budget para cada SLO proposto:

   - Em uma janela de 30 dias
   - Em número absoluto de eventos permitidos

4. Se o serviço experimentar um incidente de 30 minutos de downtime:

   - Quanto error budget foi consumido?
   - Que ações você tomaria se isso ocorresse no dia 5 da janela?
   - E se ocorresse no dia 25?

**Critérios de Avaliação:**

- SLIs relevantes e mensuráveis
- SLOs balanceados (nem conservadores demais, nem agressivos)
- Cálculos matemáticos corretos
- Decisões justificadas

### Exercício 1.2: Toil Analysis

**Instruções:**

1. Liste 5 atividades que você realiza regularmente em seu trabalho atual (ou
   imagine se estiver em transição de carreira)

2. Para cada atividade, avalie:

   - Frequência (diária, semanal, mensal)
   - Tempo gasto médio
   - Automatizabilidade (1-5, onde 5 = totalmente automatizável)
   - Valor estratégico (1-5, onde 5 = alto valor)
   - Toil score = (frequência × tempo × automatizabilidade) / valor

3. Priorize as atividades para automação usando a matriz Impacto vs. Esforço

4. Para a atividade de maior prioridade, esboce uma solução de automação (pode
   ser com ou sem IA)

**Template:**

```
Atividade: [Descrição]
Frequência: [X vezes/periodo]
Tempo médio: [Y minutos]
Automatizabilidade: [1-5]
Valor estratégico: [1-5]
Toil score: [Calculado]

Priorização: [Alta/Média/Baixa]

Solução proposta:
- Ferramentas: [...]
- Passos: [...]
- Expected ROI: [...]
```

______________________________________________________________________

## Parte 2: CI/CD e DevOps

### Laboratório 2.1: Pipeline CI/CD Moderno

**Objetivo:** Construir um pipeline CI/CD completo com práticas modernas.

**Setup:**

1. Crie um repositório Git com uma aplicação simples (pode ser um "Hello World"
   web app)

2. Configure um pipeline com as seguintes etapas:

   - Build
   - Testes unitários
   - Análise de segurança (SAST)
   - Build de container
   - Testes de integração
   - Deploy para staging
   - Testes de smoke
   - Deploy para produção (com approval)

**Exercício:**

1. Implemente o pipeline usando GitHub Actions, GitLab CI, ou ferramenta similar

2. Adicione as seguintes features:

   - Cache de dependências
   - Parallel test execution
   - Artifact storage
   - Rollback automático em caso de falha nos smoke tests

3. Documente o tempo de execução de cada etapa

4. Implemente uma estratégia de deployment (blue-green, canary, ou rolling)

**Critérios de Sucesso:**

- Pipeline executa de ponta a ponta
- Build time < 10 minutos
- Zero intervenção manual até staging
- Rollback funcional

### Exercício 2.2: Métricas DORA

**Cenário:** Sua organização quer melhorar performance de entrega de software.

**Tarefas:**

1. Para cada métrica DORA, defina:
   - Como coletar a métrica em seu ambiente
   - Qual a classificação atual (Elite/High/Medium/Low)
   - Qual o target realista em 6 meses

| Métrica                 | Coleta | Atual | Target |
| ----------------------- | ------ | ----- | ------ |
| Deployment Frequency    |        |       |        |
| Lead Time for Changes   |        |       |        |
| Change Failure Rate     |        |       |        |
| Time to Restore Service |        |       |        |

2. Proponha 3 iniciativas para melhorar cada métrica de "Low" para "High"

3. Estime o esforço e impacto de cada iniciativa

4. Crie um roadmap de 6 meses priorizando as iniciativas

______________________________________________________________________

## Parte 3: SRE e Confiabilidade

### Laboratório 3.1: Implementação de SLOs

**Objetivo:** Implementar SLIs e SLOs para um serviço real ou simulado.

**Setup:**

1. Escolha um serviço para trabalhar (pode ser um serviço existente ou usar uma
   aplicação de exemplo)

2. Configure coleta de métricas usando Prometheus ou similar

**Exercício:**

1. Defina 3 SLIs para o serviço:

   - Disponibilidade
   - Latência
   - Taxa de erro

2. Implemente queries Prometheus para calcular cada SLI

```promql
# Exemplo estrutura
# SLI de Disponibilidade
sum(rate(http_requests_total{status=~"2..|3.."}[5m]))
/
sum(rate(http_requests_total[5m]))
```

3. Configure alertas baseados em SLOs (burn rate alerts)

4. Crie um dashboard Grafana mostrando:

   - SLI atual vs. SLO
   - Error budget consumption
   - Burn rate

5. Simule uma degradação e observe o alerta disparar

**Entregáveis:**

- Queries Prometheus documentadas
- Dashboard Grafana exportado
- Regras de alerta configuradas
- Documento explicando as escolhas

### Cenário 3.2: Gerenciamento de Error Budget

**Situação:**

Seu serviço tem um SLO de 99.9% de disponibilidade (janela de 30 dias). No dia
15 da janela, você tem os seguintes dados:

- Tempo de indisponibilidade acumulado: 25 minutos
- 3 deploys realizados no período
- 2 incidentes, ambos relacionados a deploys
- Product team pressionando para novo feature

**Questões:**

1. Quanto error budget resta?

2. Calcule o burn rate atual:

   - Se continuar assim, qual a projeção para o final do mês?
   - O que indica sobre a saúde do serviço?

3. Que decisões você tomaria:

   - Sobre novos deploys?
   - Sobre o feature request?
   - Sobre investimento em confiabilidade?

4. Proponha um processo para gerenciar error budget em sua organização

______________________________________________________________________

## Parte 4: Observabilidade

### Laboratório 4.1: OpenTelemetry Instrumentação

**Objetivo:** Instrumentar uma aplicação com OpenTelemetry.

**Setup:**

1. Escolha uma linguagem de programação (Python, Node.js, Java, ou Go)

2. Prepare uma aplicação simples com:

   - API HTTP
   - Chamada a banco de dados
   - Chamada a serviço externo (mock)

**Exercício:**

1. Adicione instrumentação OpenTelemetry:

   - Traces automáticos
   - Traces manuais para operações críticas
   - Metrics customizadas
   - Logs estruturados correlacionados

2. Configure o OpenTelemetry Collector:

   - Recebedores (receivers)
   - Processadores (processors)
   - Exportadores para:
     - Jaeger (traces)
     - Prometheus (metrics)
     - Loki ou ELK (logs)

3. Implemente um fluxo de negócio e trace através de:

   - Múltiplos serviços (use containers)
   - Banco de dados
   - Cache
   - Fila de mensagens (opcional)

4. Crie um dashboard unificado mostrando:

   - Distributed trace completo
   - Métricas de negócio correlacionadas
   - Logs contextualizados

**Entregáveis:**

- Código instrumentado
- Configuração do Collector
- Screenshots de traces e dashboards
- Documentação de arquitetura

### Exercício 4.2: Design de Dashboards

**Contexto:** Você precisa criar dashboards para um sistema de e-commerce.

**Tarefas:**

1. Identifique 4 personas que usarão os dashboards:

   - Exemplo: SRE on-call, Product Manager, Executivo, Developer

2. Para cada persona, defina:

   - 3 métricas principais (Golden Signals ou derivadas)
   - 3 métricas de negócio
   - Frequência de consulta esperada

3. Desenhe (papel ou ferramenta) um dashboard para cada persona

4. Justifique suas escolhas:

   - Por que essas métricas?
   - Por que essa organização visual?
   - Como o dashboard ajuda na tomada de decisão?

**Critérios de Avaliação:**

- Métricas relevantes para cada persona
- Clareza visual
- Ação associada às métricas
- Evitar "dashboard hell"

______________________________________________________________________

## Parte 5: Infraestrutura como Código

### Laboratório 5.1: Terraform End-to-End

**Objetivo:** Provisionar infraestrutura completa usando Terraform.

**Setup:**

Crie uma conta AWS/GCP/Azure (Free Tier) ou use LocalStack para simulação.

**Exercício:**

1. Crie um módulo Terraform para:

   - VPC com subnets públicas e privadas
   - Security groups
   - Application Load Balancer
   - ECS/EKS ou instâncias EC2
   - RDS (banco de dados)
   - S3 bucket

2. Implemente as seguintes práticas:

   - State remoto com locking
   - Workspaces para ambientes
   - Módulos reutilizáveis
   - Variables e outputs bem documentados
   - Tags consistentes

3. Adicione:

   - Pre-commit hooks (fmt, validate, lint)
   - CI/CD para Terraform (plan em PR, apply no merge)
   - Policy as Code (OPA ou Sentinel)

4. Implemente drift detection

**Entregáveis:**

- Repositório Git com código Terraform
- Documentação de arquitetura
- CI/CD pipeline
- Vídeo demo (opcional)

### Exercício 5.2: Comparação de Ferramentas IaC

**Tarefa de Pesquisa:**

Compare as seguintes ferramentas de IaC:

1. Terraform
2. Pulumi
3. AWS CloudFormation
4. Ansible (para configuração)

Para cada ferramenta, avalie:

| Critério             | Terraform | Pulumi | CloudFormation | Ansible |
| -------------------- | --------- | ------ | -------------- | ------- |
| Curva de aprendizado |           |        |                |         |
| Multi-cloud          |           |        |                |         |
| State management     |           |        |                |         |
| Testabilidade        |           |        |                |         |
| Comunidade/Ecosystem |           |        |                |         |
| IaC generation (AI)  |           |        |                |         |
| Melhor caso de uso   |           |        |                |         |

**Discussão:**

Em que cenários você escolheria cada ferramenta? Justifique.

______________________________________________________________________

## Parte 6: Kubernetes e GitOps

### Laboratório 6.1: GitOps com ArgoCD

**Objetivo:** Implementar GitOps para deployment contínuo.

**Setup:**

1. Instale um cluster Kubernetes (Minikube, Kind, ou cloud)

2. Instale ArgoCD

**Exercício:**

1. Configure:

   - Repositório Git como source of truth
   - Aplicação no ArgoCD
   - Auto-sync habilitado
   - Prune e self-heal ativados

2. Implemente:

   - Multi-environment (dev, staging, prod)
   - ApplicationSets para multi-tenant
   - Resource hooks (pre-sync, post-sync)
   - Notifications (Slack/email)

3. Teste:

   - Fazer push para Git e observar sync automático
   - Simular drift manualmente e verificar self-healing
   - Rollback para versão anterior

4. Adicione:

   - Progressive delivery (canary com Argo Rollouts)
   - Policy enforcement (Kyverno ou OPA)
   - Secrets management (External Secrets Operator)

**Entregáveis:**

- Manifestos Kubernetes
- Configuração ArgoCD
- Documentação do processo
- Screenshots de sync

### Exercício 6.2: Estratégias de Deployment

**Cenário:**

Você precisa escolher uma estratégia de deployment para diferentes serviços:

**Serviços:**

1. **Serviço de Pagamentos:** Crítico, downtime é inaceitável
2. **Serviço de Recomendações:** Pode tolerar alguma instabilidade
3. **Serviço de Batch Processing:** Não tem usuários diretos
4. **Serviço de Notificações:** Alto volume, tolera atrasos

**Tarefas:**

1. Para cada serviço, recomende uma estratégia:

   - Blue-Green
   - Canary
   - Rolling Update
   - Recreate

2. Justifique sua escolha considerando:

   - Risco de rollback
   - Custo de infraestrutura
   - Complexidade de implementação
   - Impacto ao usuário

3. Desenhe a arquitetura para cada estratégia recomendada

4. Defina métricas para decisão de rollback em cada caso

______________________________________________________________________

## Parte 7: AIOps e IA

### Laboratório 7.1: Anomaly Detection Básico

**Objetivo:** Implementar detecção de anomalias simples.

**Setup:**

Use Python com bibliotecas: pandas, numpy, scikit-learn, matplotlib.

**Exercício:**

1. Colete ou gere dados de métricas:

   - 30 dias de CPU utilization
   - Injete 3-5 anomalias artificiais

2. Implemente 3 métodos de detecção:

   - Threshold estático (baseline)
   - Statistical (z-score, IQR)
   - ML simples (Isolation Forest)

3. Compare os métodos:

   - Precision e recall
   - False positive rate
   - Latência de detecção

4. Visualize:

   - Série temporal com anomalias marcadas
   - Comparação dos métodos

**Entregáveis:**

- Notebook Python
- Análise comparativa
- Recomendação de método

### Exercício 7.2: Design de RCA Assistido por IA

**Cenário:**

Você está projetando um sistema de RCA assistido por LLM.

**Tarefas:**

1. Defina a arquitetura do sistema:

   - Quais fontes de dados?
   - Como estruturar o contexto?
   - Qual o fluxo de processamento?

2. Desenhe o prompt para o LLM:

   - System prompt
   - User prompt template
   - Expected output format

3. Identifique limitações e mitigações:

   - Context window
   - Hallucination
   - Latência
   - Custo

4. Defina um processo de validação humana

5. Proponha métricas de sucesso

**Template de Entrega:**

```markdown
## Arquitetura
[Diagrama e descrição]

## Prompt Design
### System
```

[Prompt]

```

### User Template
```

[Template com variáveis]

```

## Limitações e Mitigações
| Limitação | Mitigação |
|-----------|-----------|
| [...] | [...] |

## Métricas de Sucesso
- [Métrica 1]: [Target]
```

______________________________________________________________________

## Parte 8: FinOps

### Laboratório 8.1: Análise de Custos Cloud

**Objetivo:** Analisar e otimizar custos de cloud.

**Setup:**

Use dados de billing export (CSV/JSON) ou simule dados.

**Exercício:**

1. Análise exploratória:

   - Top 5 serviços por custo
   - Evolução mensal
   - Distribuição por região
   - Crescimento month-over-month

2. Identifique waste:

   - Instâncias subutilizadas (CPU < 20%)
   - Recursos orfãos (volumes não atachados)
   - Storage não acessado
   - IPs elásticos não usados

3. Proponha otimizações:

   - Right-sizing
   - Reserved Instances
   - Spot instances
   - Storage tiering

4. Calcule:

   - Custo total atual
   - Custo projetado com otimizações
   - ROI do esforço

**Entregáveis:**

- Notebook de análise
- Relatório de recomendações
- Projeção de economia

### Exercício 8.2: Estratégia de Tagging

**Tarefa:**

1. Desenhe um schema de tagging para uma organização com:

   - 3 ambientes (prod, staging, dev)
   - 5 times de produto
   - 3 regiões AWS
   - 2 business units

2. Defina:

   - Tags obrigatórias
   - Tags opcionais
   - Valores permitidos
   - Validações

3. Implemente (pseudo-código):

   - Política de tagging
   - Auto-tagging para novos recursos
   - Compliance check
   - Remediação automática

4. Projete um dashboard de alocação de custos

______________________________________________________________________

## Parte 9: Gerenciamento de Incidentes

### Cenário 9.1: Simulação de Incidente

**Contexto:**

Você é o Incident Commander para o seguinte incidente:

```
Hora: 14:32 UTC
Alerta: Error rate 50% no serviço de checkout
Impacto: Usuários não conseguem finalizar compras
Escopo: Produção, todas as regiões
```

**Tarefas:**

1. Escreva as primeiras comunicações:

   - Notificação inicial ao time
   - Status page update
   - Comunicação executiva

2. Desenhe a estrutura de comando:

   - Quem são os papéis?
   - Quem você escalonaria?

3. Defina as primeiras ações:

   - O que investigar primeiro?
   - Qual a mitigação imediata?

4. Crie uma timeline template para o incidente

5. Escreva o postmortem (fictício, mas realista)

**Entregáveis:**

- Comunicações escritas
- Diagrama de comando
- Timeline preenchida
- Postmortem completo

### Exercício 9.2: Design de Runbook

**Tarefa:**

Escreva um runbook para o seguinte cenário:

**"Database Connection Pool Exhaustion"**

O runbook deve incluir:

1. **Diagnóstico:**

   - Como identificar o problema
   - Queries/comandos para confirmar
   - Dados a coletar

2. **Mitigação Imediata:**

   - Passos para reduzir impacto
   - Decisões de trade-off

3. **Resolução:**

   - Fix definitivo
   - Rollback plan

4. **Prevenção:**

   - Como evitar recorrência
   - Métricas a monitorar

5. **Escalonamento:**

   - Quando chamar ajuda
   - Quem contatar

**Formato:** Use markdown com checkboxes para execução.

______________________________________________________________________

## Parte 10: Cenários Integrados

### Cenário Final: Transformação Completa

**Contexto:**

Você foi contratado como VP of Platform Engineering para uma empresa de SaaS com
200 engenheiros:

**Situação Atual:**

- Deploys manuais, 2x por mês
- Operações heroicas, burnout comum
- Zero observabilidade unificada
- Custo de cloud crescendo 30% ao ano
- MTTR de 4+ horas
- Infraestrutura snowflake

**Objetivo:** Transformar operações em 18 meses.

**Tarefas:**

1. **Assessment:**

   - Avalie a maturidade atual usando o modelo SOM
   - Identifique os 3 maiores gargalos
   - Estabeleça baseline de métricas

2. **Roadmap:**

   - Crie roadmap de 18 meses
   - Defina milestones trimestrais
   - Aloque recursos necessários

3. **Priorização:**

   - Use framework RICE para priorizar
   - Justifique a sequência
   - Identifique quick wins

4. **Gestão de Mudança:**

   - Plano de comunicação
   - Estratégia de treinamento
   - Como lidar com resistência

5. **Métricas de Sucesso:**

   - KPIs para cada fase
   - Como comunicar progresso
   - Definição de sucesso

6. **Riscos:**

   - Top 5 riscos
   - Mitigações
   - Planos de contingência

**Entregável:**

Apresentação executiva (10-15 slides) cobrindo:

- Situação atual
- Visão futura
- Roadmap
- Investment ask
- Expected ROI

______________________________________________________________________

## Gabaritos e Discussões

### Discussões Importantes

**Questões para Reflexão em Grupo:**

1. **Trade-offs de Automação:** Até que ponto devemos automatizar? Quando um
   humano deve estar no loop?

2. **Cultura vs. Ferramentas:** Qual o mais importante para transformação de
   operações: mudar ferramentas ou mudar cultura?

3. **IA na Operação:** Você confiaria em um sistema autônomo para fazer deploy
   em produção? Sob quais condições?

4. **SLOs Realistas:** Como balancear ambição e realismo na definição de SLOs? O
   que acontece quando SLOs são muito agressivos? E muito conservadores?

5. **FinOps vs. Agilidade:** Como balancear otimização de custos com velocidade
   de desenvolvimento?

______________________________________________________________________

## Recursos Adicionais

### Projetos de Prática Recomendados

1. **Homelab Kubernetes:**

   - Monte um cluster em casa (Raspberry Pi ou VMs)
   - Implemente stack completo de observabilidade
   - Pratique GitOps e CI/CD

2. **Cloud Challenge:**

   - Complete AWS/GCP/Azure Well-Architected Labs
   - Implemente infraestrutura multi-region
   - Otimizações de custo e performance

3. **Open Source Contribution:**

   - Contribua para projetos de observabilidade
   - Documentação, bug fixes, features

### Certificações Relevantes

- **Cloud:** AWS Solutions Architect, GCP Professional Cloud Architect
- **Kubernetes:** CKA, CKAD, CKS
- **SRE:** SRE Foundation (DevOps Institute)
- **Security:** AWS Security Specialty
- **FinOps:** FinOps Certified Practitioner

______________________________________________________________________

## Conclusão

Estes exercícios cobrem o espectro de competências necessárias para operações de
software modernas. A prática deliberada, combinada com estudo teórico, acelera o
desenvolvimento de expertise.

Lembre-se: não é necessário completar todos os exercícios. Foque nos que
endereçam lacunas em seu conhecimento ou são mais relevantes para sua situação
atual.

Boa prática!

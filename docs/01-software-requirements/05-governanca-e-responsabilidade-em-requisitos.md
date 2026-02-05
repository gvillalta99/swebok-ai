---
title: 05 - Governança e Responsabilidade em Requisitos
created_at: '2025-01-31'
tags: [governanca, responsabilidade, compliance, lgpd, gdpr, etica, auditoria]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Governança e Responsabilidade em Requisitos

## Overview

A governança e responsabilidade em requisitos tornaram-se críticas na era dos
LLMs. Enquanto sistemas tradicionais têm comportamento determinístico e
previsível, sistemas com IA introduzem não-determinismo, opacidade e riscos
emergentes que demandam novos frameworks de governança.

Esta seção aborda a definição de responsabilidades claras, mecanismos de
accountability, compliance regulatório (LGPD, GDPR, regulamentações de IA) e
estruturas de governança que garantam que sistemas autônomos operem de forma
ética, transparente e responsabilizável.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender os princípios de governança de IA e suas aplicações em requisitos
2. Estabelecer cadeias de responsabilidade claras em sistemas com IA
3. Implementar mecanismos de accountability e auditabilidade
4. Navegar requisitos regulatórios aplicáveis a sistemas de IA
5. Aplicar frameworks éticos no desenvolvimento de requisitos

## 5.1 Fundamentos de Governança de IA

### 5.1.1 Definição e Escopo

**Governança de IA** é o conjunto de processos, políticas e controles que
garantem que sistemas de inteligência artificial sejam desenvolvidos e operados
de forma responsável, ética e em conformidade com regulamentações aplicáveis.

No contexto de requisitos, a governança abrange:

- Definição de responsabilidades por decisões de requisitos
- Processos de aprovação para requisitos de alto risco
- Mecanismos de auditoria e rastreabilidade
- Frameworks de avaliação de impacto ético

### 5.1.2 Princípios de Governança

Baseados nas diretrizes da UE [1] e NIST [2], os princípios fundamentais
incluem:

**Transparência**:

- Documentação clara de como requisitos foram estabelecidos
- Explicabilidade de decisões automatizadas
- Comunicação honesta sobre limitações do sistema

**Accountability**:

- Responsabilidade clara por decisões e ações
- Mecanismos de recursos para usuários afetados
- Estruturas de governança com autoridade definida

**Fairness**:

- Prevenção de discriminação algorítmica
- Equidade no tratamento de diferentes grupos
- Monitoramento contínuo de vieses

**Segurança e Robustez**:

- Proteção contra manipulação e ataques
- Resiliência a falhas e erros
- Continuidade de operações

### 5.1.3 Governança em Todo o Ciclo de Vida

```
┌─────────────────────────────────────────────────────────────┐
│                    CICLO DE VIDA DE IA                       │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│  CONCEPÇÃO  │   DESIGN    │    DEPLOY   │     OPERAÇÃO      │
├─────────────┼─────────────┼─────────────┼───────────────────┤
• Avaliação   • Especificação• Testes de  • Monitoramento    │
  de risco    de requisitos   conformidade   contínuo         │
• Análise de  • Design ético  • Validação  • Auditoria        │
  impacto     • Contratos     regulatória    periódica        │
• Definição   • Revisão por   • Documentação• Atualização     │
  de          comitê de ética  de decisões   de requisitos     │
  stakeholders• Prototipagem  • Treinamento  • Gestão de       │
              responsável                    incidentes        │
└─────────────┴─────────────┴─────────────┴───────────────────┘
```

## 5.2 Responsabilidade e Accountability

### 5.2.1 Cadeia de Responsabilidade

Em sistemas com IA, a responsabilidade deve ser claramente atribuída em
múltiplos níveis:

**Nível Estratégico**:

- **C-level**: Responsabilidade por estratégia de IA e alocação de recursos
- **Board**: Supervisão de riscos e compliance
- **Comitê de Ética**: Aprovação de casos de uso sensíveis

**Nível Tático**:

- **Product Owner**: Definição de requisitos e aceitação de riscos
- **Engenheiro de Requisitos**: Especificação de restrições e contexto
- **Data Scientist**: Qualidade e representatividade dos dados

**Nível Operacional**:

- **Engenheiro de ML**: Implementação e monitoramento de modelos
- **Engenheiro de Software**: Integração e operação do sistema
- **Operador**: Monitoramento e resposta a incidentes

### 5.2.2 Matriz de Responsabilidade (RACI) para Requisitos de IA

| Atividade                        | Product Owner | Eng. Requisitos | Data Scientist | Eng. Software | Compliance |
| -------------------------------- | ------------- | --------------- | -------------- | ------------- | ---------- |
| Definir requisitos de negócio    | R             | C               | I              | I             | I          |
| Especificar restrições técnicas  | I             | R               | C              | C             | C          |
| Validar requisitos éticos        | A             | R               | C              | I             | C          |
| Aprovar requisitos de alto risco | A             | C               | C              | I             | R          |
| Auditar conformidade             | I             | C               | I              | C             | R          |

*R: Responsible, A: Accountable, C: Consulted, I: Informed*

### 5.2.3 Mecanismos de Accountability

**Registro de Decisões (Decision Log)**:

```yaml
decisao: REQ-2025-001
contexto: Implementação de sistema de scoring de crédito com IA
decisao: Utilizar modelo de ML para decisões até R$ 50.000
responsavel: João Silva (Product Owner)
aprovadores:
  - Maria Santos (Compliance)
  - Pedro Costa (Comitê de Ética)
racionais:
  - "Modelo atinge precisão de 94% em testes"
  - "Limite de R$ 50.000 reduz risco financeiro"
  - "Revisão humana obrigatória acima do limite"
requisitos_relacionados:
  - REQ-045: Limite de decisão autônoma
  - REQ-046: Revisão humana obrigatória
  - REQ-047: Auditoria de decisões
riscos:
  - "Possível viés em determinados grupos demográficos"
  - "Necessidade de monitoramento contínuo"
mitigacoes:
  - "Auditoria mensal de fairness"
  - "Canal de contestação para clientes"
data: 2025-01-15
```

**Auditoria de Requisitos**:

- Revisão periódica de requisitos críticos
- Verificação de conformidade com políticas
- Análise de eficácia de restrições implementadas

## 5.3 Compliance Regulatório

### 5.3.1 Regulamentações de Proteção de Dados

**LGPD (Lei Geral de Proteção de Dados - Brasil)**:

Requisitos específicos para sistemas com IA:

- **Base legal**: Justificativa para processamento de dados pessoais
- **Transparência**: Informação clara sobre uso de dados em IA
- **Direitos do titular**: Acesso, correção, eliminação e portabilidade
- **Accountability**: Registro de operações de tratamento
- **Segurança**: Medidas técnicas e administrativas adequadas

**GDPR (General Data Protection Regulation - UE)**:

Requisitos adicionais:

- **Privacy by Design**: Proteção de dados desde a concepção
- **Direito à explicação**: Justificativa de decisões automatizadas
- **Data Protection Impact Assessment (DPIA)**: Avaliação de riscos
- **Nomeação de DPO**: Data Protection Officer obrigatório em certos casos

### 5.3.2 Regulamentações Específicas de IA

**AI Act (União Europeia)** \[1\]:

Classificação de sistemas de IA por nível de risco:

| Categoria             | Exemplos                                                    | Requisitos                                    |
| --------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| **Risco Inaceitável** | Sistemas de pontuação social, manipulação subliminar        | Proibidos                                     |
| **Alto Risco**        | Sistemas críticos de infraestrutura, educação, emprego, lei | Conformidade obrigatória, auditoria, registro |
| **Risco Limitado**    | Chatbots, sistemas de reconhecimento de emoções             | Transparência obrigatória                     |
| **Risco Mínimo**      | Filtros de spam, jogos com IA                               | Boas práticas recomendadas                    |

**Requisitos para Sistemas de Alto Risco**:

- Sistema de gestão de riscos
- Qualidade dos dados de treinamento
- Documentação técnica
- Registro e rastreabilidade
- Transparência e informação aos usuários
- Supervisão humana
- Precisão, robustez e segurança

### 5.3.3 Frameworks de Governança

**NIST AI Risk Management Framework (AI RMF)** \[2\]:

Quatro funções principais:

1. **Govern**: Cultura de gestão de riscos de IA
2. **Map**: Contextualização de riscos de IA
3. **Measure**: Análise e avaliação de riscos
4. **Manage**: Priorização e resposta a riscos

**ISO/IEC 42001 - Sistema de Gestão de IA**:

- Framework para estabelecer, implementar, manter e melhorar sistemas de gestão
  de IA
- Abordagem baseada em processos
- Melhoria contínua

## 5.4 Ética em Requisitos

### 5.4.1 Frameworks Éticos

**Princípios de Asilomar para IA** \[3\]:

1. Beneficência: IA deve beneficiar humanidade
2. Autonomia: Respeito à escolha humana
3. Justiça: Distribuição justa de benefícios e encargos
4. Explicabilidade: Operação compreensível

**Framework de Ética de IA da IEEE** \[4\]:

- Atenção aos impactos humanos e sociais
- Transparência e explicabilidade
- Responsabilidade e accountability
- Privacidade e proteção de dados
- Fairness e não-discriminação

### 5.4.2 Avaliação de Impacto Ético

**Checklist de Avaliação Ética**:

```markdown
## Avaliação de Impacto Ético - [Nome do Sistema]

### 1. Potencial de Dano
- [ ] O sistema pode causar dano físico a pessoas?
- [ ] O sistema pode causar dano psicológico?
- [ ] O sistema pode causar dano econômico significativo?
- [ ] O sistema pode afetar direitos fundamentais?

### 2. Vulnerabilidades
- [ ] O sistema pode ser usado para manipulação?
- [ ] O sistema pode ser usado para vigilância indevida?
- [ ] O sistema pode amplificar vieses existentes?
- [ ] O sistema pode ser usado por atores maliciosos?

### 3. Populações Afetadas
- [ ] O sistema afeta grupos vulneráveis?
- [ ] O sistema afeta minorias ou grupos marginalizados?
- [ ] O sistema afeta crianças ou adolescentes?
- [ ] O sistema afeta pessoas com deficiência?

### 4. Mitigações
- [ ] Existem salvaguardas contra usos indevidos?
- [ ] Existem mecanismos de supervisão humana?
- [ ] Existem canais de contestação e recurso?
- [ ] O sistema é auditável e transparente?

### 5. Decisão
- [ ] Aprovado para desenvolvimento
- [ ] Aprovado com condições
- [ ] Requer revisão adicional
- [ ] Não aprovado
```

### 5.4.3 Requisitos Éticos Específicos

**Requisitos de Transparência**:

```
REQ-ETICA-001: O sistema deve informar aos usuários quando estão
interagindo com uma IA e não com um humano.

REQ-ETICA-002: O sistema deve fornecer explicações compreensíveis
para decisões automatizadas significativas.

REQ-ETICA-003: O sistema deve divulgar limitações conhecidas
e cenários de uso inadequado.
```

**Requisitos de Fairness**:

```
REQ-ETICA-004: O sistema deve ser testado para vieses em relação
a grupos protegidos antes do deployment.

REQ-ETICA-005: O sistema deve monitorar métricas de fairness
durante a operação.

REQ-ETICA-006: O sistema deve permitir contestação de decisões
que afetem direitos ou oportunidades.
```

## 5.5 Documentação e Rastreabilidade

### 5.5.1 Registro de Requisitos Governança

Cada requisito crítico deve ter:

- **Autor**: Quem criou o requisito
- **Aprovador**: Quem aprovou o requisito
- **Racional**: Por que o requisito existe
- **Dependências**: Requisitos relacionados
- **Riscos**: Potenciais problemas
- **Histórico**: Mudanças e revisões

### 5.5.2 Rastreabilidade de Decisões

```
Requisito de Negócio
       ↓
Restrição de Sistema
       ↓
Decisão de Design
       ↓
Implementação
       ↓
Teste de Validação
       ↓
Auditoria de Conformidade
```

### 5.5.3 Artefatos de Governança

**Documentos Obrigatórios**:

- Política de Uso de IA
- Framework de Governança
- Procedimentos de Aprovação
- Templates de Avaliação de Risco
- Registros de Decisões
- Relatórios de Auditoria

## Practical Considerations

### Implementação de Governança

**Fase 1 - Fundação**:

1. Estabelecer comitê de governança de IA
2. Definir políticas e procedimentos básicos
3. Criar templates de documentação
4. Treinar equipes

**Fase 2 - Operação**:

1. Implementar processos de aprovação
2. Estabelecer monitoramento contínuo
3. Realizar auditorias periódicas
4. Manter registro de decisões

**Fase 3 - Melhoria**:

1. Analisar eficácia dos controles
2. Atualizar políticas com base em lições aprendidas
3. Expandir governança para novos casos de uso
4. Certificações e conformidade externa

### Anti-Padrões

1. **Governança em Papel**: Documentos que não são seguidos na prática
2. **Responsabilidade Difusa**: Ninguém claramente responsável por decisões
3. **Compliance Tardio**: Governança adicionada apenas no final
4. **Falta de Autoridade**: Comitê de governança sem poder de decisão

### Custos de Não-Governança

- **Multas regulatórias**: GDPR pode chegar a 4% do faturamento global
- **Reputação**: Danos à marca por incidentes éticos
- **Litígio**: Processos por discriminação algorítmica
- **Recall**: Necessidade de desativar sistemas em produção

## Summary

- Governança de IA garante desenvolvimento responsável e ético
- Responsabilidade deve ser clara em todos os níveis da organização
- Compliance regulatório (LGPD, GDPR, AI Act) impõe requisitos específicos
- Frameworks éticos orientam decisões de requisitos
- Accountability requer mecanismos de auditoria e rastreabilidade
- Governança deve ser implementada desde a concepção do sistema

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                    |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** - Governança de IA é crescentemente regulamentada  |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** - Requer expertise legal e ética humana             |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítico** - Violações podem resultar em multas e processos |

## References

1. European Union. Artificial Intelligence Act. 2024.
2. NIST. Artificial Intelligence Risk Management Framework (AI RMF 1.0). January
   2023\.
3. Future of Life Institute. Asilomar AI Principles. 2017.
4. IEEE. Ethically Aligned Design: A Vision for Prioritizing Human Well-being
   with Autonomous and Intelligent Systems. 2019.
5. Lei nº 13.709/2018 - Lei Geral de Proteção de Dados (LGPD). Brasil.
6. Regulation (EU) 2016/679 - General Data Protection Regulation (GDPR).
7. ISO/IEC 42001:2023 - Information technology — Artificial intelligence —
   Management system.

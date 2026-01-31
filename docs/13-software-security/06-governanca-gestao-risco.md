---
title: "Governança e Gestão de Risco de Segurança"
created_at: "2025-01-31"
tags: ["seguranca", "governanca", "gestao-risco", "frameworks", "compliance"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 6. Governança e Gestão de Risco de Segurança

## Overview

A governança de segurança para sistemas com inteligência artificial representa uma evolução significativa das práticas tradicionais de governança de TI. Enquanto frameworks como ISO 27001 e NIST Cybersecurity Framework fornecem bases sólidas, a introdução de componentes de IA — com seus comportamentos estocásticos, opacidade e novos vetores de risco — exige adaptações substanciais nas estruturas de governança, processos de gestão de risco e políticas organizacionais.

Esta seção apresenta frameworks de segurança adaptados para IA, metodologias de avaliação de risco, políticas de uso de ferramentas de IA, processos de resposta a incidentes e programas de treinamento de segurança para desenvolvedores.

**Nota de verificabilidade:** adotar um framework nao substitui evidencias operacionais (inventario, controles implementados, testes, auditorias e post-mortems). Use os frameworks como linguagem comum e como base de checklist; valide efetividade por meio de exercicios, telemetria e incidentes.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Adaptar frameworks de segurança existentes para sistemas com IA
2. Conduzir avaliações de risco de segurança específicas para IA
3. Desenvolver e implementar políticas de uso de ferramentas de IA
4. Estabelecer processos de incident response para ataques a LLMs
5. Implementar programas de treinamento de segurança efetivos

## Security Frameworks Adaptados para IA

Os frameworks tradicionais de segurança precisam de extensões significativas para lidar com os desafios únicos dos sistemas de IA.

### NIST AI Risk Management Framework (AI RMF 1.1)

O framework da NIST fornece uma abordagem estruturada para gerenciar riscos de IA.

#### Funções do AI RMF

| Função | Descrição | Aplicação em Segurança |
|--------|-----------|------------------------|
| **GOVERN** | Cultura de gestão de risco, políticas, procedimentos | Estabelecer governança de segurança para IA |
| **MAP** | Contextualização, identificação de riscos | Mapear ativos de IA e vetores de ataque |
| **MEASURE** | Análise, avaliação, tracking de riscos | Medir exposição a ameaças de segurança |
| **MANAGE** | Resposta a riscos, tratamento regular | Implementar controles de segurança |

#### Adaptações para Segurança

**GOVERN - Governança:**
- Políticas específicas para uso de LLMs e ferramentas de IA
- Definição de papéis e responsabilidades para segurança de IA
- Comitê de revisão de segurança para projetos com IA
- Integração com governança corporativa existente

**MAP - Mapeamento:**
- Inventário de todos os componentes de IA (modelos, APIs, embeddings)
- Mapeamento de fluxos de dados semânticos
- Identificação de trust boundaries expandidos
- Avaliação de riscos de cadeia de suprimentos de IA

**MEASURE - Medição:**
- Métricas de segurança para sistemas de IA
- Testes de segurança adversariais
- Avaliação de robustez contra ataques
- Monitoramento de comportamento anômalo

**MANAGE - Gestão:**
- Implementação de controles de segurança específicos de IA
- Processos de curadoria de segurança
- Gestão de vulnerabilidades em código gerado
- Resposta a incidentes de segurança de IA

### Extensões do ISO/IEC 27001 para IA

O padrão ISO 27001 está sendo estendido para cobrir sistemas de IA:

#### Novos Controles Propostos

**A.18.3 - Segurança de Modelos de IA:**
- Verificação de proveniência de modelos
- Assinatura e verificação de integridade
- Gestão de vulnerabilidades em modelos
- Proteção contra ataques adversariais

**A.18.4 - Segurança de Dados de Treinamento:**
- Sanitização de dados de treinamento
- Proteção contra data poisoning
- Gestão de consentimento e privacidade
- Versionamento e auditoria de datasets

**A.18.5 - Segurança de APIs de IA:**
- Autenticação e autorização de acesso a APIs
- Rate limiting e proteção contra abuso
- Monitoramento de uso e anomalias
- Gestão de chaves e credenciais

**A.18.6 - Segurança de Código Gerado por IA:**
- Processos de curadoria de segurança
- Análise estática e dinâmica obrigatória
- Revisão humana para código crítico
- Proibição de uso em sistemas de segurança crítica sem verificação

### Framework de Segurança para IA - Estrutura Proposta

```
┌─────────────────────────────────────────────────────────────┐
│              AI SECURITY GOVERNANCE FRAMEWORK              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ESTRATÉGIA E GOVERNANÇA                │   │
│  │  • Políticas de segurança para IA                  │   │
│  │  • Papéis e responsabilidades                      │   │
│  │  • Comitê de segurança de IA                       │   │
│  │  • Alinhamento com risco corporativo               │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│  ┌─────────────────────────▼─────────────────────────────┐   │
│  │              AVALIAÇÃO E GESTÃO DE RISCO              │   │
│  │  • Identificação de ativos de IA                     │   │
│  │  • Avaliação de ameaças específicas de IA            │   │
│  │  • Análise de vulnerabilidades                       │   │
│  │  • Tratamento e mitigação de riscos                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│  ┌─────────────────────────▼─────────────────────────────┐   │
│  │              CONTROLES DE SEGURANÇA                   │   │
│  │  • Input validation e sanitization                   │   │
│  │  • LLM firewalls e gateways                          │   │
│  │  • Sandboxing e isolamento                           │   │
│  │  • Monitoramento e detecção                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│  ┌─────────────────────────▼─────────────────────────────┐   │
│  │              OPERAÇÃO E MONITORAMENTO                 │   │
│  │  • Incident response                                 │   │
│  │  • Continuidade de negócios                          │   │
│  │  • Auditoria e compliance                            │   │
│  │  • Melhoria contínua                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Risk Assessment para Sistemas com IA

A avaliação de risco para sistemas com IA requer adaptações metodológicas significativas.

### Metodologia de Risk Assessment

#### 1. Identificação de Ativos

**Ativos Específicos de IA:**
- Modelos LLM (próprios e de terceiros)
- Datasets de treinamento e fine-tuning
- Embeddings e vector stores
- APIs de IA e credenciais
- Código gerado por IA
- Prompts e templates
- Logs e dados de conversação

#### 2. Identificação de Ameaças

**Ameaças Específicas de IA:**

| Ameaça | Descrição | Impacto Potencial |
|--------|-----------|-------------------|
| **Prompt Injection** | Manipulação via inputs maliciosos | Comprometimento do sistema |
| **Data Poisoning** | Envenenamento de dados de treino | Comportamento malicioso |
| **Model Extraction** | Roubo do modelo via queries | Perda de IP |
| **Membership Inference** | Descoberta de dados de treino | Violação de privacidade |
| **Evasion Attacks** | Bypass de detecção | Comprometimento de segurança |
| **Supply Chain Attacks** | Comprometimento da cadeia | Backdoors, vulnerabilidades |

#### 3. Análise de Vulnerabilidades

**Vulnerabilidades em Código de IA:**
- Taxa de vulnerabilidades em código gerado (12-40%)
- CWEs comuns: injection, path traversal, XSS
- Vulnerabilidades "alucinadas" difíceis de detectar

**Vulnerabilidades em Modelos:**
- Backdoors inseridos durante treinamento
- Viés e comportamentos discriminatórios
- Hallucinações que podem causar danos
- Overfitting a dados sensíveis

#### 4. Avaliação de Risco

**Matriz de Risco Adaptada:**

| Probabilidade | Impacto Baixo | Impacto Médio | Impacto Alto |
|---------------|---------------|---------------|--------------|
| **Alta** | Médio | Alto | Crítico |
| **Média** | Baixo | Médio | Alto |
| **Baixa** | Baixo | Baixo | Médio |

**Fatores de Probabilidade Específicos de IA:**
- Exposição a inputs não-confiáveis (RAG, web search)
- Uso de modelos de terceiros
- Complexidade do sistema
- Maturidade dos controles de segurança

**Fatores de Impacto Específicos de IA:**
- Sensibilidade dos dados processados
- Autonomia do sistema (agentes autônomos)
- Escopo de acesso a sistemas externos
- Consequências regulatórias (EU AI Act)

### Framework de Risk Assessment: AI-RAM

**Fase 1: Scoping**
- Definir escopo do sistema de IA
- Identificar stakeholders
- Estabelecer critérios de risco

**Fase 2: Asset Discovery**
- Inventário completo de componentes de IA
- Mapeamento de dependências
- Classificação de sensibilidade

**Fase 3: Threat Modeling**
- Aplicar STRIDE-AI
- Identificar vetores de ataque específicos
- Priorizar ameaças

**Fase 4: Vulnerability Assessment**
- Análise de código gerado por IA
- Avaliação de segurança de modelos
- Review de configurações

**Fase 5: Risk Analysis**
- Avaliar probabilidade e impacto
- Calcular nível de risco
- Identificar riscos inaceitáveis

**Fase 6: Risk Treatment**
- Selecionar estratégias (mitigar, transferir, aceitar, evitar)
- Implementar controles
- Documentar resíduos de risco

**Fase 7: Monitoring e Review**
- Monitorar indicadores de risco
- Revisar periodicamente
- Atualizar com novas ameaças

## Políticas de Uso de Ferramentas de IA

Políticas claras são essenciais para governança efetiva do uso de ferramentas de IA.

### Estrutura de Políticas

#### 1. Política de Uso Aprovado de Ferramentas de IA

**Escopo:**
- Quais ferramentas são aprovadas para uso
- Casos de uso permitidos e proibidos
- Requisitos de aprovação para novas ferramentas

**Elementos:**
```
POLÍTICA DE USO DE FERRAMENTAS DE IA

1. FERRAMENTAS APROVADAS
   • GitHub Copilot (Business tier)
   • ChatGPT Enterprise
   • [Lista de ferramentas aprovadas]

2. CASOS DE USO PERMITIDOS
   • Geração de código não-crítico
   • Documentação e comentários
   • Análise e review de código
   • Brainstorming e design

3. CASOS DE USO PROIBIDOS
   • Geração de código para sistemas críticos de segurança
   • Processamento de dados PII sem aprovação
   • Uso de ferramentas não-aprovadas
   • Bypass de processos de segurança

4. REQUISITOS DE APROVAÇÃO
   • Avaliação de segurança para novas ferramentas
   • Review legal e de compliance
   • Treinamento obrigatório
```

#### 2. Política de Curadoria de Código Gerado

**Requisitos:**
- Análise de segurança obrigatória
- Revisão por pares
- Testes automatizados
- Documentação de decisões

**Processo:**
```
1. GERAÇÃO
   ↓
2. ANÁLISE ESTÁTICA (SAST)
   ↓
3. ANÁLISE SEMÂNTICA (LLM-as-a-Judge)
   ↓
4. TESTES DE SEGURANÇA
   ↓
5. REVISÃO HUMANA OBRIGATÓRIA
   ↓
6. APROVAÇÃO PARA MERGE
```

#### 3. Política de Proteção de Dados

**Restrições:**
- Proibição de enviar PII para APIs de IA
- Anonimização obrigatória
- Uso de ferramentas enterprise com garantias de privacidade
- Acordos de processamento de dados (DPA)

#### 4. Política de Incidentes de Segurança

**Definições:**
- O que constitui incidente de segurança de IA
- Níveis de severidade
- Responsáveis por resposta

### Implementação de Políticas

**Comunicação:**
- Treinamento obrigatório para todos os desenvolvedores
- Documentação acessível e clara
- Canais de suporte e dúvidas

**Enforcement:**
- Gates técnicos (pre-commit hooks, CI/CD)
- Auditorias regulares
- Consequências por violações

**Revisão:**
- Revisão trimestral das políticas
- Atualização com novas ameaças
- Feedback da equipe

## Incident Response para Ataques a LLMs

Processos de resposta a incidentes precisam de adaptações para lidar com ataques a sistemas de IA.

### Playbook de Incident Response

#### Fase 1: Detecção e Análise

**Indicadores de Comprometimento (IoCs) Específicos de IA:**
- Padrões suspeitos de prompts (tentativas de injection)
- Outputs anômalos do modelo
- Uso anômalo de tokens/API
- Tentativas de jailbreaking detectadas
- Acesso não-autorizado a embeddings
- Modificações suspeitas em modelos

**Processo de Triagem:**
1. Classificar severidade (P1-Crítico a P4-Baixo)
2. Identificar escopo do incidente
3. Determinar se é falso positivo
4. Iniciar registro de incidente

#### Fase 2: Contenção

**Estratégias de Contenção:**

**Contenção de Curto Prazo:**
- Isolar sistema afetado
- Desabilitar funcionalidades comprometidas
- Bloquear IPs/usuários suspeitos
- Ativar modo de manutenção

**Contenção de Longo Prazo:**
- Implementar patches de segurança
- Atualizar filtros e regras
- Re-treinar ou substituir modelos comprometidos
- Reforçar controles de acesso

#### Fase 3: Erradicação

**Ações:**
- Remover backdoors ou código malicioso
- Limpar dados envenenados
- Reverter para versões limpas de modelos
- Atualizar credenciais comprometidas

#### Fase 4: Recuperação

**Restauração:**
- Restaurar serviços em fases
- Monitoramento intensivo
- Testes de segurança
- Comunicação com stakeholders

#### Fase 5: Lições Aprendidas

**Post-Incident Review:**
- Análise de causa raiz
- Identificação de falhas nos controles
- Atualização de políticas e procedimentos
- Treinamento adicional se necessário

### Cenários Específicos de Incidentes

**Cenário 1: Prompt Injection Bem-Sucedido**
```
DETECÇÃO: Logs mostram output anômalo após input específico
CONTENÇÃO: Desabilitar funcionalidade afetada
ERRADICAÇÃO: Implementar filtro para padrão de ataque
RECUPERAÇÃO: Restaurar serviço com proteções adicionais
```

**Cenário 2: Data Exfiltration via LLM**
```
DETECÇÃO: Padrão suspeito de queries tentando extrair dados
CONTENÇÃO: Bloquear usuário/IP, limitar acesso a dados
ERRADICAÇÃO: Revisar logs, identificar dados potencialmente expostos
RECUPERAÇÃO: Notificar afetados, implementar controles adicionais
```

**Cenário 3: Model Compromise**
```
DETECÇÃO: Comportamento anômalo do modelo detectado
CONTENÇÃO: Remover modelo de produção
ERRADICAÇÃO: Investigar origem do comprometimento
RECUPERAÇÃO: Deploy de modelo limpo, reforço de cadeia de suprimentos
```

## Treinamento de Segurança para Desenvolvedores

Programas de treinamento efetivos são essenciais para cultura de segurança.

### Programa de Treinamento

#### Módulo 1: Fundamentos de Segurança de IA

**Conteúdo:**
- Introdução às ameaças específicas de IA
- OWASP Top 10 for LLM Applications
- Riscos de código gerado por IA
- Cadeia de suprimentos de IA

**Duração:** 4 horas
**Formato:** Online + quiz

#### Módulo 2: Práticas Seguras de Codificação com IA

**Conteúdo:**
- Curadoria de segurança de código gerado
- Uso seguro de assistentes de código
- Revisão de segurança de código de IA
- Ferramentas de análise de segurança

**Duração:** 8 horas
**Formato:** Hands-on labs

#### Módulo 3: Defesas e Mitigações

**Conteúdo:**
- Input validation e sanitization
- Configuração de LLM firewalls
- Sandboxing e isolamento
- Monitoramento e detecção

**Duração:** 8 horas
**Formato:** Workshops práticos

#### Módulo 4: Resposta a Incidentes

**Conteúdo:**
- Identificação de incidentes de segurança de IA
- Procedimentos de resposta
- Comunicação e escalada
- Lições aprendidas

**Duração:** 4 horas
**Formato:** Simulações de incidentes

### Estratégias de Treinamento

**Abordagem Contínua:**
- Treinamento inicial obrigatório
- Atualizações trimestrais
- Alertas de segurança para novas ameaças
- Capture the flag (CTF) events

**Métricas de Efetividade:**
- Taxa de conclusão do treinamento
- Scores em avaliações
- Redução de vulnerabilidades introduzidas
- Tempo médio de detecção de incidentes

**Cultura de Segurança:**
- Incentivar reporte de vulnerabilidades
- Bug bounty programs
- Reconhecimento de boas práticas
- Comunicação transparente sobre incidentes

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — governanca e gestao de risco sao fundamentais e persistentes |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — requer expertise humana e julgamento especializado |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — falhas de governanca tem consequencias legais e regulatorias severas |

## Practical Considerations

### Aplicações Reais

1. **Comece com frameworks existentes**: Adapte ISO 27001, NIST CSF em vez de criar do zero
2. **Invista em governança desde o início**: Mais barato que remediar problemas depois
3. **Documente decisões**: Rastreabilidade é essencial para compliance
4. **Mensure e monitore**: KPIs de segurança para IA
5. **Cultura de segurança**: Tecnologia sozinha não é suficiente

### Limitações

- **Complexidade regulatória**: Múltiplos frameworks e jurisdições
- **Evolução rápida**: Difícil manter políticas atualizadas
- **Trade-offs**: Segurança vs. inovação vs. velocidade
- **Custo**: Governança robusta requer investimento significativo

### Melhores Práticas

1. **Integração com governança corporativa**: Segurança de IA não é silo separado
2. **Abordagem baseada em risco**: Foco nos riscos mais críticos
3. **Stakeholder engagement**: Envolva legal, compliance, negócios
4. **Maturidade gradual**: Implemente em fases, aumentando sofisticação
5. **Métricas claras**: Meça o que importa para segurança
6. **Melhoria contínua**: Aprenda com incidentes e near-misses

## Summary

- Frameworks de segurança tradicionais (NIST AI RMF, ISO 27001) requerem extensões significativas para sistemas de IA
- Risk assessment para IA deve considerar ativos específicos (modelos, embeddings, código gerado) e ameaças únicas (prompt injection, data poisoning)
- Políticas de uso de ferramentas de IA devem definir ferramentas aprovadas, casos de uso permitidos/proibidos, e processos de curadoria
- Incident response para LLMs requer playbooks específicos para cenários como prompt injection, data exfiltration e model compromise
- Treinamento de desenvolvedores deve ser contínuo e prático, cobrindo fundamentos, práticas de codificação segura, defesas e resposta a incidentes
- Governança de segurança de IA é um processo contínuo que requer maturidade gradual e melhoria constante

## References

1. NIST. "AI Risk Management Framework 1.1." National Institute of Standards and Technology, 2025. https://www.nist.gov/itl/ai-risk-management-framework

2. NIST. "Cybersecurity Framework Profile for Artificial Intelligence (Draft NISTIR 8596)." National Institute of Standards and Technology, 2025.

3. ISO/IEC. "ISO/IEC 27001:2022 Information Security Management Systems — Extensions for AI Systems." International Organization for Standardization, 2025.

4. European Commission. "EU AI Act: Security and Risk Management Requirements." Official Journal of the European Union, 2024.

5. Gartner. "AI Security Risk Assessment: A Practical Guide." Gartner Research, 2025.

6. SANS Institute. "Developing Security Policies for AI-Assisted Development." SANS White Paper, 2025.

7. Gartner. "Incident Response Playbook for LLM Security Incidents." Gartner Research, 2025.

8. OWASP. "OWASP Secure Coding Practices for AI Assistants." OWASP Project, 2025. https://owasp.org/www-project-secure-coding-ai/

9. HackerOne. "State of AI Security Report 2025." HackerOne Research, 2025.

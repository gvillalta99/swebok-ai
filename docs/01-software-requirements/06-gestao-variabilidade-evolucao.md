---
title: "Gestão da Variabilidade e Evolução"
created_at: "2025-01-31"
tags: ["requisitos", "variabilidade", "evolucao", "mudanca", "rastreabilidade", "governanca", "compatibilidade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Seção 6: Gestão da Variabilidade e Evolução

## Overview

Esta seção discute como requisitos, restrições e contratos devem evoluir em ambientes com automação: o sistema muda, o modelo muda, o contexto muda. A gestão da variabilidade precisa preservar rastreabilidade e governança sem congelar a evolução.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir variabilidade em múltiplas dimensões (negócio, técnica, regulatória) e por que ela aumenta com IA
2. Aplicar mecanismos de configuração e compatibilidade preservando invariantes críticos
3. Projetar processos de mudança que mantenham evidência e trilha de auditoria
4. Identificar riscos de “variabilidade não intencional” introduzida por geração/autonomia

## 6.1 Introdução

A engenharia de requisitos tradicional assumia um mundo relativamente estável: requisitos eram elicitados, documentados e implementados, com mudanças tratadas como exceções gerenciadas por processos formais de controle de mudanças. Na era dos LLMs, onde sistemas evoluem continuamente e contextos operacionais mudam rapidamente, essa abordagem torna-se obsoleta.

A **Gestão da Variabilidade e Evolução** é a disciplina de projetar requisitos e restrições que são intrinsecamente adaptáveis, mantendo a rastreabilidade e governança enquanto permitem evolução contínua.

## 6.2 Fundamentos de Variabilidade

### 6.2.1 Conceito de Variabilidade

**Variabilidade** é a capacidade de um sistema de ser configurado, customizado ou estendido para diferentes contextos sem modificação do código base.

```
┌─────────────────────────────────────────────────────────────────┐
│               DIMENSÕES DE VARIABILIDADE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Variabilidade de Negócio                                       │
│  ├── Regras de negócio configuráveis                            │
│  ├── Workflows adaptáveis                                       │
│  └── Políticas de domínio                                       │
│                                                                 │
│  Variabilidade Técnica                                          │
│  ├── Plataformas de deployment                                  │
│  ├── Integrações com sistemas externos                          │
│  └── Escolhas de arquitetura                                    │
│                                                                 │
│  Variabilidade de Contexto                                      │
│  ├── Localização geográfica                                     │
│  ├── Regulamentações aplicáveis                                 │
│  └── Perfil de usuário                                          │
│                                                                 │
│  Variabilidade de IA                                            │
│  ├── Modelos de linguagem alternativos                          │
│  ├── Prompts adaptativos                                        │
│  └── Parâmetros de geração                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2.2 Modelagem de Features

A modelagem de features organiza variabilidade em hierarquias estruturadas:

```
Sistema de Atendimento Inteligente
├── Feature: Autenticação [mandatória]
│   ├── Alternative: Login/Password
│   ├── Alternative: SSO
│   └── Alternative: Biométrico
│
├── Feature: Atendimento [mandatória]
│   ├── Feature: Chatbot [optional]
│   │   ├── Parameter: Modelo (GPT-4, Claude, Local)
│   │   ├── Parameter: Temperatura [0.0-1.0]
│   │   └── Feature: Escalamento Humano [optional]
│   │
│   ├── Feature: FAQ Automatizado [optional]
│   └── Feature: Tickets [optional]
│
├── Feature: Análise de Sentimento [optional]
│   └── Requires: Chatbot
│
└── Feature: Compliance [mandatória]
    ├── Alternative: LGPD
    ├── Alternative: GDPR
    └── Alternative: CCPA
```

### 6.2.3 Restrições Variáveis

Restrições que podem ser ativadas/desativadas conforme contexto:

```python
from dataclasses import dataclass
from typing import Dict, List, Optional, Callable
from enum import Enum

class ContextType(Enum):
    REGULATORY = "regulatory"
    GEOGRAPHIC = "geographic"
    PERFORMANCE = "performance"
    SECURITY = "security"

@dataclass
class VariableConstraint:
    """
    Restrição que pode ser ativada baseada em contexto.
    """
    id: str
    description: str
    condition: Callable[[Dict], bool]  # Função que avalia se aplica
    constraint_type: str
    severity: str
    
    def applies_to(self, context: Dict) -> bool:
        return self.condition(context)

# Catálogo de Restrições Variáveis
CONSTRAINT_CATALOG = {
    'data_residency_eu': VariableConstraint(
        id='C-EU-001',
        description='Dados pessoais de usuários EU devem permanecer na UE',
        condition=lambda ctx: ctx.get('user_region') == 'EU',
        constraint_type='data_residency',
        severity='critical'
    ),
    'encryption_at_rest': VariableConstraint(
        id='C-SEC-001',
        description='Dados devem ser criptografados em repouso',
        condition=lambda ctx: ctx.get('classification') in ['confidential', 'restricted'],
        constraint_type='security',
        severity='critical'
    ),
    'llm_temperature_limit': VariableConstraint(
        id='C-AI-001',
        description='Temperatura do modelo limitada para aplicações críticas',
        condition=lambda ctx: ctx.get('criticality') == 'high',
        constraint_type='ai_behavior',
        severity='high'
    )
}
```

## 6.3 Evolução de Requisitos

### 6.3.1 Natureza da Evolução

Requisitos evoluem por múltiplas razões:

| Tipo de Mudança | Gatilho | Exemplo |
|-----------------|---------|---------|
| Evolutiva | Novas necessidades de negócio | Adicionar suporte a novo idioma |
| Adaptativa | Mudança no ambiente | Nova regulamentação |
| Corretiva | Defeito identificado | Restrição muito permissiva |
| Preventiva | Antecipação de problema | Reforçar restrição de segurança |

### 6.3.2 Gerenciamento de Versões

```
┌─────────────────────────────────────────────────────────────────┐
│               EVOLUÇÃO DE RESTRIÇÕES                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Restrição C-001: Limitar Taxa de Requisições                   │
│                                                                 │
│  v1.0 (2023-01-15)                                              │
│  ├── Limite: 100 req/min por usuário                            │
│  └── Status: Active                                             │
│      │                                                          │
│      ▼                                                          │
│  v1.1 (2023-06-20) - Adaptativa                                 │
│  ├── Limite: 100 req/min usuário padrão                         │
│  ├── Limite: 500 req/min usuário premium                        │
│  └── Motivação: Introdução de tier premium                      │
│      │                                                          │
│      ▼                                                          │
│  v2.0 (2024-01-10) - Corretiva                                  │
│  ├── Limite: 60 req/min usuário padrão                          │
│  ├── Limite: 300 req/min usuário premium                        │
│  ├── Limite: 1000 req/min usuário enterprise                    │
│  └── Motivação: Ataques DDoS identificados                      │
│                                                                 │
│  Cada versão mantém rastreabilidade completa:                   │
│  - Autor da mudança                                             │
│  - Aprovador                                                    │
│  - Motivação documentada                                        │
│  - Impacto analisado                                            │
│  - Rollback procedure                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3.3 Compatibilidade e Migração

```python
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class ConstraintVersion:
    version: str
    effective_date: datetime
    deprecated_date: Optional[datetime]
    content: str
    author: str
    motivation: str
    
@dataclass
class ConstraintLifecycle:
    constraint_id: str
    versions: List[ConstraintVersion]
    
    def get_active_version(self, date: datetime) -> Optional[ConstraintVersion]:
        for v in reversed(self.versions):
            if v.effective_date <= date:
                if v.deprecated_date is None or v.deprecated_date > date:
                    return v
        return None
    
    def check_compatibility(self, old_version: str, new_version: str) -> Dict:
        """
        Analisa compatibilidade entre versões.
        """
        old = next((v for v in self.versions if v.version == old_version), None)
        new = next((v for v in self.versions if v.version == new_version), None)
        
        if not old or not new:
            return {'compatible': False, 'reason': 'Version not found'}
        
        # Análise de breaking changes
        analysis = {
            'compatible': True,
            'breaking_changes': [],
            'migration_required': False
        }
        
        # Lógica específica de análise...
        
        return analysis
```

## 6.4 Configuração e Personalização

### 6.4.1 Sistemas de Configuração

Abordagens para configurar variabilidade:

| Abordagem | Quando Usar | Exemplo |
|-----------|-------------|---------|
| Arquivos de Configuração | Configurações estáticas | `config.yaml` |
| Feature Flags | Ativação dinâmica | LaunchDarkly, Unleash |
| Base de Conhecimento | Regras complexas | Drools, CLIPS |
| Prompts Condicionais | Comportamento de IA | Templates de prompt |

### 6.4.2 Configuração de Comportamento de IA

```yaml
# config/ai_behavior.yaml
ai_configuration:
  models:
    default:
      provider: openai
      model: gpt-4
      temperature: 0.7
      max_tokens: 2000
    
    conservative:
      provider: openai
      model: gpt-4
      temperature: 0.1
      max_tokens: 1000
      constraints:
        - no_code_generation
        - require_human_review
    
    creative:
      provider: openai
      model: gpt-4
      temperature: 0.9
      max_tokens: 4000
      constraints:
        - allow_exploration
        - extended_timeout
  
  contexts:
    production:
      model_profile: conservative
      fallback_chain:
        - gpt-4
        - gpt-3.5-turbo
        - local_fallback
      monitoring:
        log_all_interactions: true
        confidence_threshold: 0.8
    
    development:
      model_profile: default
      fallback_chain:
        - gpt-4
      monitoring:
        log_all_interactions: false
        confidence_threshold: 0.5
    
    critical_operations:
      model_profile: conservative
      human_in_the_loop: required
      audit_level: comprehensive
```

### 6.4.3 Motor de Configuração

```python
from typing import Dict, Any, Optional
import yaml

class AIConfigurationEngine:
    """
    Motor de configuração para comportamento de IA.
    """
    
    def __init__(self, config_path: str):
        with open(config_path) as f:
            self.config = yaml.safe_load(f)
    
    def get_model_config(self, context: str) -> Dict[str, Any]:
        """
        Obtém configuração de modelo para um contexto específico.
        """
        context_config = self.config['ai_configuration']['contexts'].get(context)
        if not context_config:
            raise ValueError(f"Contexto desconhecido: {context}")
        
        profile_name = context_config['model_profile']
        profile = self.config['ai_configuration']['models'][profile_name]
        
        return {
            **profile,
            'fallback_chain': context_config.get('fallback_chain', []),
            'monitoring': context_config.get('monitoring', {}),
            'human_in_the_loop': context_config.get('human_in_the_loop', 'optional')
        }
    
    def evaluate_constraints(self, context: Dict) -> List[Dict]:
        """
        Avalia quais restrições se aplicam a um contexto.
        """
        applicable = []
        for constraint_id, constraint in CONSTRAINT_CATALOG.items():
            if constraint.applies_to(context):
                applicable.append({
                    'id': constraint_id,
                    'description': constraint.description,
                    'severity': constraint.severity
                })
        return applicable
```

## 6.5 Linhas de Produto de Software (SPL)

### 6.5.1 Conceito de Linhas de Produto

**Software Product Lines (SPL)** é uma abordagem para desenvolver famílias de sistemas relacionados a partir de uma base de ativos comum.

```
┌─────────────────────────────────────────────────────────────────┐
│                  LINHA DE PRODUTO SPL                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                      Core Assets                                │
│              (Requisitos, Componentes, Testes)                  │
│                           │                                     │
│           ┌───────────────┼───────────────┐                     │
│           │               │               │                     │
│           ▼               ▼               ▼                     │
│      ┌─────────┐     ┌─────────┐     ┌─────────┐               │
│      │Produto A│     │Produto B│     │Produto C│               │
│      │  (Web)  │     │ (Mobile)│     │  (API)  │               │
│      └─────────┘     └─────────┘     └─────────┘               │
│                                                                 │
│  Cada produto é uma configuração de features:                   │
│  - Features comuns a todos os produtos                          │
│  - Features variantes (escolhas)                                │
│  - Features opcionais                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.5.2 Aplicação a Sistemas com IA

Vantagens de SPL para sistemas com IA:

1. **Padronização de Integração**: Componentes de IA reutilizáveis
2. **Governança Centralizada**: Políticas de uso de IA compartilhadas
3. **Consistência de Compliance**: Requisitos regulatórios aplicados uniformemente
4. **Eficiência de Treinamento**: Prompts e fine-tunings reutilizáveis

```python
class SPLConfiguration:
    """
    Configuração de variabilidade para uma linha de produto.
    """
    
    COMMON_FEATURES = [
        'authentication',
        'logging',
        'monitoring',
        'error_handling'
    ]
    
    VARIANT_FEATURES = {
        'platform': ['web', 'mobile', 'api', 'desktop'],
        'ai_provider': ['openai', 'anthropic', 'local', 'hybrid'],
        'compliance_framework': ['lgpd', 'gdpr', 'ccpa', 'hipaa']
    }
    
    OPTIONAL_FEATURES = [
        'ai_chatbot',
        'recommendation_engine',
        'sentiment_analysis',
        'auto_documentation'
    ]
    
    CONSTRAINTS = [
        # Regras de dependência
        ('ai_chatbot', 'requires', 'ai_provider'),
        ('sentiment_analysis', 'requires', 'ai_chatbot'),
        ('hipaa_compliance', 'excludes', 'openai'),  # Requisito fictício
    ]
    
    def validate_configuration(self, selected_features: List[str]) -> Dict:
        """
        Valida se uma configuração de features é válida.
        """
        errors = []
        
        # Verificar dependências
        for feature in selected_features:
            for required in self._get_requirements(feature):
                if required not in selected_features:
                    errors.append(f"{feature} requer {required}")
        
        # Verificar exclusões
        for feature in selected_features:
            for excluded in self._get_exclusions(feature):
                if excluded in selected_features:
                    errors.append(f"{feature} exclui {excluded}")
        
        return {
            'valid': len(errors) == 0,
            'errors': errors
        }
```

## 6.6 Gestão de Mudança

### 6.6.1 Processo de Mudança de Requisitos

```
┌─────────────────────────────────────────────────────────────────┐
│            PROCESSO DE MUDANÇA DE REQUISITOS                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. IDENTIFICAÇÃO                                               │
│     ├── Solicitação de mudança registrada                       │
│     ├── Origem documentada (stakeholder, incidente, mercado)    │
│     └── Impacto inicial estimado                                │
│                                                                 │
│  2. ANÁLISE DE IMPACTO                                          │
│     ├── Impacto em requisitos existentes                        │
│     ├── Impacto em design e implementação                       │
│     ├── Impacto em testes e validação                           │
│     ├── Análise de riscos de regressão                          │
│     └── Estimativa de esforço                                   │
│                                                                 │
│  3. DECISÃO                                                     │
│     ├── Aprovação/Rejeição/Adiamento                            │
│     ├── Priorização                                             │
│     └── Atribuição de responsáveis                              │
│                                                                 │
│  4. IMPLEMENTAÇÃO                                               │
│     ├── Atualização de especificação                            │
│     ├── Modificação de código                                   │
│     ├── Atualização de testes                                   │
│     └── Atualização de documentação                             │
│                                                                 │
│  5. VERIFICAÇÃO                                                 │
│     ├── Revisão da mudança                                      │
│     ├── Testes de regressão                                     │
│     ├── Validação de stakeholders                               │
│     └── Aprovação final                                         │
│                                                                 │
│  6. DEPLOYMENT                                                  │
│     ├── Liberação em ambiente de produção                       │
│     ├── Monitoramento pós-mudança                               │
│     └── Lições aprendidas documentadas                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.6.2 Análise de Impacto Automatizada

```python
from typing import Set, Dict, List
from dataclasses import dataclass

@dataclass
class ImpactAnalysis:
    affected_requirements: Set[str]
    affected_components: Set[str]
    affected_tests: Set[str]
    risk_level: str
    estimated_effort: str
    rollback_complexity: str

class ChangeImpactAnalyzer:
    """
    Analisa impacto de mudanças propostas em requisitos.
    """
    
    def analyze_change(self, requirement_id: str, new_spec: str) -> ImpactAnalysis:
        """
        Analisa o impacto de modificar um requisito.
        """
        # Análise de rastreabilidade
        affected_reqs = self._get_dependent_requirements(requirement_id)
        affected_components = self._get_implementing_components(requirement_id)
        affected_tests = self._get_related_tests(requirement_id)
        
        # Análise de complexidade
        complexity = self._assess_change_complexity(new_spec)
        
        # Determinar nível de risco
        risk = self._calculate_risk(
            len(affected_reqs),
            len(affected_components),
            complexity
        )
        
        return ImpactAnalysis(
            affected_requirements=affected_reqs,
            affected_components=affected_components,
            affected_tests=affected_tests,
            risk_level=risk,
            estimated_effort=self._estimate_effort(complexity),
            rollback_complexity=self._assess_rollback(requirement_id)
        )
    
    def _calculate_risk(self, req_count: int, comp_count: int, complexity: str) -> str:
        score = req_count + comp_count * 2
        if complexity == 'high':
            score += 5
        elif complexity == 'medium':
            score += 2
        
        if score > 10:
            return 'high'
        elif score > 5:
            return 'medium'
        return 'low'
```

## 6.7 Exercícios

1. Modele um sistema de configuração para um assistente virtual com:
   - 3 perfis de comportamento (conservador, equilibrado, criativo)
   - Suporte a múltiplos modelos de IA
   - Restrições variáveis por região

2. Crie um processo de gestão de mudança para restrições de segurança em um sistema com IA.

3. Projete uma linha de produto para família de sistemas de análise de documentos com IA.

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada |

## Practical Considerations

- Versione não apenas código, mas também restrições: mudanças de modelo e contexto alteram o comportamento efetivo do sistema.
- Diferencie variabilidade planejada (configurações permitidas) de variabilidade emergente (comportamento oscilante); trate a segunda como risco a ser contido.
- Estabeleça critérios de compatibilidade e migração para mudanças de restrições (o que quebra? o que é deprecado? quais evidências precisam ser revalidadas?).

## Summary

- Variabilidade e evolução são inevitáveis em sistemas híbridos; o desafio é evoluir com rastreabilidade.
- Processos de mudança devem preservar evidências, auditoria e verificabilidade de restrições.
- Aumentar autonomia sem governança aumenta variabilidade não intencional e custo de verificação.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.
2. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering — Life cycle processes — Requirements engineering. 2018.

*SWEBOK-AI v5.0 - Software Requirements*

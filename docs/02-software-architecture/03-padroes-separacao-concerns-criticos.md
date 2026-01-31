# Seção 3: Padrões de Separação de Concerns Críticos

## Overview

Esta seção apresenta padrões para isolar componentes críticos (segurança, compliance, finanças e operações) de componentes estocásticos, reduzindo superfície de risco e custo de verificação.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Identificar concerns críticos e definir fronteiras arquiteturais para protegê-los
2. Aplicar padrões de isolamento e anti-corruption para integrar componentes de IA com segurança
3. Definir regras de governança para mudanças em componentes críticos

## 3.1 Introdução

A separação de concerns é um princípio fundamental da arquitetura de software. Na era dos LLMs, este princípio adquire uma dimensão adicional: a separação entre o que pode ser gerado ou modificado por sistemas autônomos e o que deve permanecer sob controle humano estrito.

Os **Padrões de Separação de Concerns Críticos** estabelecem fronteiras arquiteturais que protegem componentes sensíveis da influência não-intencional de sistemas de IA, garantindo que áreas críticas de segurança, compliance e integridade de negócio permaneçam controladas.

## 3.2 Identificação de Concerns Críticos

### 3.2.1 Classificação de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│            ESPECTRO DE CRITICIDADE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CRÍTICO (Nunca Gerado/Modificado por IA)                      │
│  ├── Autenticação e autorização                                 │
│  ├── Criptografia e gerenciamento de chaves                     │
│  ├── Regras de compliance regulatório                           │
│  ├── Cálculos financeiros de alta precisão                      │
│  ├── Logs de auditoria imutáveis                                │
│  └── Circuit breakers de segurança                              │
│                                                                 │
│  SENSÍVEL (Revisão Obrigatória Humana)                          │
│  ├── Regras de negócio principais                               │
│  ├── Schemas de banco de dados                                  │
│  ├── APIs públicas                                              │
│  └── Configurações de segurança                                 │
│                                                                 │
│  OPERACIONAL (Supervisão Recomendada)                           │
│  ├── Lógica de apresentação                                     │
│  ├── Validações de entrada                                      │
│  ├── Transformações de dados                                    │
│  └── Testes automatizados                                       │
│                                                                 │
│  AUXILIAR (Pode ser Totalmente Gerado por IA)                   │
│  ├── Documentação de código                                     │
│  ├── Scripts de build e deploy                                  │
│  ├── Formatação e linting                                       │
│  ├── Templates de mensagens                                     │
│  └── Análise de código estático                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2.2 Matriz de Decisão

```python
from enum import Enum
from dataclasses import dataclass
from typing import List, Set

class CriticalityLevel(Enum):
    CRITICAL = "critical"           # Nunca IA
    SENSITIVE = "sensitive"         # Revisão obrigatória
    OPERATIONAL = "operational"     # Supervisão recomendada
    AUXILIARY = "auxiliary"         # Pode usar IA

@dataclass
class ComponentClassification:
    name: str
    level: CriticalityLevel
    rationale: str
    allowed_operations: Set[str]
    review_requirements: List[str]

class CriticalityClassifier:
    """
    Classifica componentes baseado em múltiplos fatores.
    """
    
    CRITICAL_PATTERNS = {
        'authentication',
        'authorization',
        'crypto',
        'password',
        'secret',
        'compliance',
        'audit',
        'financial_calculation'
    }
    
    SENSITIVE_PATTERNS = {
        'business_rule',
        'schema',
        'api',
        'configuration',
        'workflow'
    }
    
    def classify(self, 
                 component_name: str,
                 data_classification: str,
                 failure_impact: str,
                 regulatory_scope: List[str]) -> ComponentClassification:
        """
        Classifica um componente baseado em seus atributos.
        """
        score = 0
        
        # Análise de nome
        if any(pattern in component_name.lower() 
               for pattern in self.CRITICAL_PATTERNS):
            score += 100
        
        if any(pattern in component_name.lower() 
               for pattern in self.SENSITIVE_PATTERNS):
            score += 50
        
        # Análise de classificação de dados
        data_scores = {
            'public': 0,
            'internal': 10,
            'confidential': 50,
            'restricted': 100
        }
        score += data_scores.get(data_classification, 0)
        
        # Análise de impacto de falha
        impact_scores = {
            'low': 0,
            'medium': 25,
            'high': 75,
            'critical': 100
        }
        score += impact_scores.get(failure_impact, 0)
        
        # Análise de escopo regulatório
        if regulatory_scope:
            score += 50 * len(regulatory_scope)
        
        # Determinar nível
        if score >= 150:
            level = CriticalityLevel.CRITICAL
            allowed = {'read', 'review'}
            review_reqs = ['senior_architect', 'security_team']
        elif score >= 75:
            level = CriticalityLevel.SENSITIVE
            allowed = {'read', 'suggest', 'review'}
            review_reqs = ['tech_lead']
        elif score >= 25:
            level = CriticalityLevel.OPERATIONAL
            allowed = {'read', 'write', 'test'}
            review_reqs = ['peer_review']
        else:
            level = CriticalityLevel.AUXILIARY
            allowed = {'read', 'write', 'test', 'deploy'}
            review_reqs = []
        
        return ComponentClassification(
            name=component_name,
            level=level,
            rationale=f"Score de criticidade: {score}",
            allowed_operations=allowed,
            review_requirements=review_reqs
        )
```

## 3.3 Padrões de Separação

### 3.3.1 Padrão: Zonas de Isolamento

```
┌─────────────────────────────────────────────────────────────────┐
│                  ZONAS DE ISOLAMENTO                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  ZONA CRÍTICA                           │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │   │
│  │  │   Auth   │ │  Crypto  │ │Compliance│                │   │
│  │  └──────────┘ └──────────┘ └──────────┘                │   │
│  │  [NO IA ZONE] - Acesso restrito, audit trail completo  │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                        [API Gateway]                           │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                  ZONA SENSÍVEL                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │   │
│  │  │ Business │ │  Schema  │ │   API    │                │   │
│  │  │  Rules   │ │  Layer   │ │  Gateway │                │   │
│  │  └──────────┘ └──────────┘ └──────────┘                │   │
│  │  [REVIEW REQUIRED] - Sujestões IA revisadas            │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                        [Service Mesh]                          │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                  ZONA OPERACIONAL                       │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │   │
│  │  │   UI     │ │ Validation│ │Transforms│                │   │
│  │  └──────────┘ └──────────┘ └──────────┘                │   │
│  │  [SUPERVISED] - IA com monitoramento                   │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│  ┌──────────────────────────┴──────────────────────────────┐   │
│  │                  ZONA AUXILIAR                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │   │
│  │  │   Docs   │ │  Tests   │ │ Scripts  │                │   │
│  │  └──────────┘ └──────────┘ └──────────┘                │   │
│  │  [AI FRIENDLY] - Geração automática permitida          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3.2 Padrão: Adaptador Anti-Corrupção para IA

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic

T = TypeVar('T')

class DomainModel:
    """Modelo de domínio crítico, imutável por IA."""
    def __init__(self, id: str, amount: Decimal, status: str):
        self.id = id
        self.amount = amount
        self.status = status

class IAProposal:
    """Proposta gerada por IA, requer validação."""
    def __init__(self, suggested_action: str, confidence: float):
        self.suggested_action = suggested_action
        self.confidence = confidence
        self.validated = False

class AntiCorruptionAdapter(ABC, Generic[T]):
    """
    Adaptador que protege o domínio crítico de influência
    direta de componentes de IA.
    """
    
    @abstractmethod
    def validate_proposal(self, 
                         proposal: IAProposal,
                         context: DomainModel) -> bool:
        """
        Valida se proposta de IA pode ser aplicada ao domínio.
        """
        pass
    
    @abstractmethod
    def translate_to_domain(self, 
                           proposal: IAProposal) -> T:
        """
        Traduz proposta de IA para operação de domínio validada.
        """
        pass

class PaymentAntiCorruptionAdapter(AntiCorruptionAdapter[DomainModel]):
    """
    Exemplo de adaptador para domínio de pagamentos.
    """
    
    def validate_proposal(self,
                         proposal: IAProposal,
                         context: DomainModel) -> bool:
        """
        Validações rigorosas para propostas de IA em pagamentos.
        """
        # IA nunca pode sugerir mudança de valor
        if 'change_amount' in proposal.suggested_action:
            return False
        
        # IA nunca pode aprovar diretamente
        if 'approve' in proposal.suggested_action:
            return False
        
        # IA pode sugerir revisão humana
        if 'flag_for_review' in proposal.suggested_action:
            return True
        
        # IA pode sugerir documentação adicional
        if 'request_documentation' in proposal.suggested_action:
            return proposal.confidence > 0.9
        
        return False
    
    def translate_to_domain(self, proposal: IAProposal) -> DomainModel:
        """
        Traduz proposta validada para operação de domínio.
        """
        # Sempre retorna uma ação segura, nunca modifica dados críticos
        if 'flag_for_review' in proposal.suggested_action:
            return ReviewFlaggedAction(
                reason="IA suggestion with high confidence",
                original_proposal=proposal
            )
        
        return NoOpAction()
```

### 3.3.3 Padrão: Camada de Imunidade

```python
class ImmunityLayer:
    """
    Camada que protege código crítico de modificações
    automáticas, permitindo apenas mudanças explícitas.
    """
    
    IMMUNITY_PATTERNS = [
        r'.*_CRITICAL\.py$',
        r'security/.*',
        r'auth/.*',
        r'crypto/.*',
        r'compliance/.*'
    ]
    
    def __init__(self, codebase_path: str):
        self.codebase_path = codebase_path
        self.immune_files = self._scan_immune_files()
    
    def _scan_immune_files(self) -> Set[str]:
        """Identifica arquivos com imunidade a modificações automáticas."""
        immune = set()
        for root, _, files in os.walk(self.codebase_path):
            for file in files:
                filepath = os.path.join(root, file)
                if any(re.match(pattern, filepath) 
                      for pattern in self.IMMUNITY_PATTERNS):
                    immune.add(filepath)
        return immune
    
    def can_modify(self, filepath: str, agent_type: str) -> bool:
        """
        Verifica se um agente pode modificar um arquivo.
        """
        if filepath not in self.immune_files:
            return True
        
        # Arquivos imunes só podem ser modificados por
        # processos humanos explícitos
        return agent_type == 'human_authorized'
    
    def get_immunity_report(self) -> Dict:
        """Gera relatório de arquivos protegidos."""
        return {
            'immune_files_count': len(self.immune_files),
            'immune_files': list(self.immune_files),
            'categories': self._categorize_immune_files()
        }
```

## 3.4 Estratégias de Proteção

### 3.4.1 Proteção em Tempo de Build

```yaml
# .github/workflows/critical-protection.yml
name: Critical File Protection

on:
  pull_request:
    paths:
      - '**/security/**'
      - '**/auth/**'
      - '**/crypto/**'
      - '**/*_CRITICAL.py'

jobs:
  verify-human-approval:
    runs-on: ubuntu-latest
    steps:
      - name: Check for Human Approval
        run: |
          # Verificar se PR tem aprovação de arquiteto de segurança
          REVIEWERS=$(gh pr view ${{ github.event.pull_request.number }} --json reviewers -q '.reviewers[].login')
          
          SECURITY_ARCHITECTS="senior-security-lead chief-architect"
          
          for REVIEWER in $REVIEWERS; do
            if [[ $SECURITY_ARCHITECTS =~ $REVIEWER ]]; then
              echo "✅ Approved by security architect"
              exit 0
            fi
          done
          
          echo "❌ Critical files require approval from security architect"
          exit 1

  verify-no-ai-generation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Check for AI Markers
        run: |
          # Verificar se código tem marcadores de geração por IA
          if grep -r "Generated by.*Copilot\|Generated by.*GPT\|Generated by.*AI" \
             security/ auth/ crypto/; then
            echo "❌ Critical files must not contain AI-generated code markers"
            exit 1
          fi
          
          echo "✅ No AI generation markers found"
```

### 3.4.2 Proteção em Tempo de Execução

```python
class RuntimeProtection:
    """
    Proteções em tempo de execução para componentes críticos.
    """
    
    def __init__(self):
        self.critical_operations = {
            'payment.process': self._verify_payment_authorization,
            'auth.grant_admin': self._verify_super_admin,
            'crypto.decrypt': self._verify_key_custody,
            'compliance.override': self._verify_compliance_officer
        }
    
    def protect(self, operation: str, context: dict) -> bool:
        """
        Verifica se operação crítica pode ser executada.
        """
        if operation not in self.critical_operations:
            return True
        
        return self.critical_operations[operation](context)
    
    def _verify_payment_authorization(self, context: dict) -> bool:
        """Verifica autorização para operações de pagamento."""
        return (
            context.get('mfa_verified') and
            context.get('approval_chain_complete') and
            context.get('amount') < context.get('user_limit', 0)
        )
    
    def _verify_super_admin(self, context: dict) -> bool:
        """Verifica autorização para concessão de privilégios."""
        return (
            context.get('requester_is_super_admin') and
            context.get('second_approval_obtained') and
            context.get('audit_log_ready')
        )
```

## 3.5 Exercícios

1. Classifique os componentes de um sistema bancário que você conhece usando o `CriticalityClassifier`. Justifique as classificações.

2. Implemente uma `ImunityLayer` para um projeto real, identificando quais arquivos devem ser protegidos.

3. Projete um `AntiCorruptionAdapter` para um domínio de saúde, onde IA pode sugerir diagnósticos mas nunca pode alterar prescrições diretamente.

---

## Practical Considerations

- Defina “zona proibida” para agentes: componentes críticos devem ter interfaces estreitas e validação determinística de entrada/saída.
- Use adaptadores de fronteira para impedir acoplamento semântico entre IA e domínio crítico.

## Summary

- Separação de concerns críticos reduz risco e torna verificação mais barata e repetível.
- Padrões de fronteira (adapters, imunidades, anti-corruption) ajudam a conter variabilidade.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. IEEE, 2024.

2. DE BOER, M. et al. Design Patterns for Large Language Model Based Neuro-Symbolic Systems. Neurosymbolic Artificial Intelligence, Vol. 1, pp. 1-20, 2025. DOI: 10.1177/29498732251377499

3. THOUGHTWORKS. Technology Radar Vol. 31: An opinionated guide to today's technology landscape. Thoughtworks, Inc., 2024. Disponível em: https://www.thoughtworks.com/radar

4. GARTNER. Enterprise Architecture Delivery Primer for 2024. Gartner Research, 2024. Disponível em: https://www.gartner.com/en/documents/5120631

5. GONZÁLEZ-POTES, A. et al. Hybrid AI and LLM-Enabled Agent-Based Real-Time Decision Support Architecture for Industrial Batch Processes. Preprints.org, 2025. Disponível em: https://www.preprints.org/manuscript/202512.2023

*SWEBOK-AI v5.0 - Software Architecture*

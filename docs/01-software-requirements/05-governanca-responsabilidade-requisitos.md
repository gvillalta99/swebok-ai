# Seção 5: Governança e Responsabilidade em Requisitos

## Overview

Esta seção trata de governança aplicada a requisitos e restrições em ambientes com automação e agentes: como definir cadeia de responsabilidade, produzir trilhas de auditoria, manter compliance e reduzir o risco de “accountability difusa” quando decisões e código são parcialmente gerados.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir uma cadeia de responsabilidade para sistemas com componentes autônomos
2. Estabelecer processos mínimos de auditoria e rastreabilidade para requisitos/restrições
3. Integrar compliance (privacidade, segurança, riscos) à especificação e à validação
4. Identificar riscos de viés e mecanismos de mitigação no nível de requisitos

## 5.1 Introdução

A introdução de sistemas autônomos baseados em IA na engenharia de software cria um abismo de responsabilidade. Quando um LLM gera código que viola uma restrição de segurança, quem é responsável? O engenheiro que forneceu o prompt? A organização que implementou o sistema? O fornecedor do modelo?

A **Governança de Requisitos na Era da IA** estabelece frameworks de responsabilidade, processos de auditoria e mecanismos de compliance que garantem que sistemas autônomos operem dentro de limites aceitáveis e que responsáveis possam ser identificados e accountability mantida.

## 5.2 Framework de Responsabilidade

### 5.2.1 Cadeia de Responsabilidade

```
┌─────────────────────────────────────────────────────────────────┐
│                   CADEIA DE RESPONSABILIDADE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nível 1: Responsabilidade Estratégica                          │
│  ├── Diretoria/Executivos                                       │
│  ├── Políticas de uso de IA                                     │
│  └── Aprovação de casos de uso de alto risco                    │
│                                                                 │
│  Nível 2: Responsabilidade de Governança                        │
│  ├── Comitê de Ética em IA                                      │
│  ├── Avaliação de riscos                                        │
│  └── Compliance com regulamentações                             │
│                                                                 │
│  Nível 3: Responsabilidade Técnica                              │
│  ├── Arquitetos de Software                                     │
│  ├── Definição de restrições e invariantes                      │
│  └── Validação de saídas de IA                                  │
│                                                                 │
│  Nível 4: Responsabilidade Operacional                          │
│  ├── Engenheiros de Software                                    │
│  ├── Implementação conforme especificação                       │
│  └── Documentação de decisões                                   │
│                                                                 │
│  Nível 5: Responsabilidade de Verificação                       │
│  ├── Quality Assurance                                          │
│  ├── Testes de conformidade                                     │
│  └── Auditoria contínua                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2.2 Matriz de Responsabilidade RACI Adaptada

| Atividade | Executivo | Governança | Arquiteto | Engenheiro | QA |
|-----------|-----------|------------|-----------|------------|-----|
| Definir políticas de IA | A | R | C | I | I |
| Aprovar uso de IA em produção | A | R | C | C | I |
| Especificar restrições | I | C | A/R | C | C |
| Validar saídas de LLM | I | I | A | R | C |
| Auditar conformidade | I | A | C | I | R |
| Responder a incidentes | A | C | C | R | C |

*Legenda: R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 5.2.3 Princípios de Responsabilidade

**1. Princípio do Humano no Centro (Human-in-the-Loop)**

> *"Decisões que afetam segurança, privacidade ou direitos fundamentais devem ter validação humana final."*

**2. Princípio da Rastreabilidade Total**

Toda decisão automatizada deve ser rastreável a:
- Um requisito ou restrição especificada
- Um responsável humano
- Um momento no tempo
- Um contexto de decisão

**3. Princípio da Transparência**

Sistemas que utilizam IA devem:
- Declarar explicitamente o uso de IA
- Explicar limitações e incertezas
- Fornecer mecanismos de contestação

## 5.3 Governança de Requisitos

### 5.3.1 Ciclo de Governança

```
┌─────────────────────────────────────────────────────────────────┐
│                   CICLO DE GOVERNANÇA                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ┌─────────────┐         ┌─────────────┐                      │
│    │  ESPECIFICAR │────────▶│   REVISAR   │                      │
│    │  Restrições  │         │  Técnica e  │                      │
│    │  e Contexto  │         │   Ética     │                      │
│    └──────┬──────┘         └──────┬──────┘                      │
│           ▲                       │                             │
│           │                       ▼                             │
│    ┌──────┴──────┐         ┌─────────────┐                      │
│    │   ATUALIZAR │◀────────│  APROVAR    │                      │
│    │   Conforme  │         │  Comitê de  │                      │
│    │   Aprendizado│         │ Governança  │                      │
│    └─────────────┘         └──────┬──────┘                      │
│                                   │                             │
│                                   ▼                             │
│                          ┌─────────────┐                        │
│                          │ IMPLEMENTAR │                        │
│                          │   Com       │                        │
│                          │  Rastreamento│                        │
│                          └─────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3.2 Comitê de Ética e Governança em IA

**Composição Recomendada:**

| Perfil | Responsabilidade | Participação |
|--------|------------------|--------------|
| Legal/Compliance | Aspectos regulatórios | Permanente |
| Engenharia | Viabilidade técnica | Permanente |
| Negócio | Impacto nos objetivos | Permanente |
| Segurança | Avaliação de riscos | Permanente |
| Ética/Diversidade | Viés e fairness | Permanente |
| Especialista de Domínio | Contexto específico | Por demanda |

**Atribuições:**
1. Aprovar ou rejeitar casos de uso de IA
2. Definir níveis de risco e requisitos de mitigação
3. Estabelecer diretrizes para interação humano-IA
4. Investigar incidentes e violações
5. Atualizar políticas conforme evolução tecnológica

### 5.3.3 Classificação de Risco de Casos de Uso

```
┌─────────────────────────────────────────────────────────────────┐
│               CLASSIFICAÇÃO DE RISCO                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ALTO RISGO (Aprovação obrigatória do Comitê)                   │
│  ├── Decisões que afetam direitos individuais                   │
│  ├── Processamento de dados sensíveis sem supervisão            │
│  ├── Sistemas autônomos em ambientes críticos de segurança      │
│  └── Algoritmos de decisão com impacto legal                    │
│                                                                 │
│  RISCO MODERADO (Aprovação do Arquiteto/Gerente)                │
│  ├── Recomendações que influenciam decisões humanas             │
│  ├── Geração de conteúdo público                                │
│  ├── Processamento em lote de dados pessoais                    │
│  └── Análise preditiva para operações de negócio                │
│                                                                 │
│  BAIXO RISCO (Registro apenas)                                  │
│  ├── Assistentes de produtividade individual                    │
│  ├── Geração de código com revisão obrigatória                  │
│  ├── Análise de dados agregados anonimizados                    │
│  └── Automação de tarefas internas não críticas                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 5.4 Compliance e Regulamentação

### 5.4.1 Marco Regulatório Global

| Regulamentação | Escopo | Requisitos Chave |
|----------------|--------|------------------|
| UE AI Act | Sistemas de IA na UE | Classificação de risco, transparência, accountability |
| GDPR (UE) | Dados pessoais | Direito à explicação, consentimento, minimização |
| LGPD (Brasil) | Dados pessoais no Brasil | Transparência, finalidade específica, segurança |
| CCPA (Califórnia) | Dados de consumidores | Direito de não ser discriminado por decisões automatizadas |
| NIST AI RMF (EUA) | Organizações dos EUA | Governança, mapeamento, medição, gestão de risco |
| ISO/IEC 42001 | Gestão de sistemas de IA | Sistema de gestão estruturado |

### 5.4.2 Checklist de Compliance

**Checklist de Requisitos com IA:**

- [ ] Identificação do caso de uso e classificação de risco
- [ ] Documentação de decisões de design (design rationale)
- [ ] Avaliação de viés e fairness
- [ ] Análise de impacto à privacidade (DPIA quando aplicável)
- [ ] Mecanismos de supervisão humana definidos
- [ ] Estratégia de fallback documentada
- [ ] Logs de auditoria especificados
- [ ] Métricas de qualidade e conformidade definidas
- [ ] Plano de resposta a incidentes
- [ ] Revisão periódica agendada

### 5.4.3 Documentação para Accountability

**Registro de Decisão de Requisitos (RDR):**

```markdown
# Registro de Decisão de Requisitos

## Identificação
- ID: RDR-2024-001
- Data: 2024-01-15
- Responsável: [Nome do Arquiteto]
- Caso de Uso: Sistema de Recomendação de Produtos

## Contexto
Descrição do problema ou necessidade que motivou a decisão.

## Decisão
Descrição da decisão tomada, incluindo restrições especificadas.

## Alternativas Consideradas
- Alternativa 1: [descrição] - rejeitada porque [razão]
- Alternativa 2: [descrição] - rejeitada porque [razão]

## Consequências
### Positivas
- [Consequência positiva 1]

### Negativas
- [Consequência negativa 1]

## Restrições Especificadas
- Restrição 1: [descrição detalhada]
- Restrição 2: [descrição detalhada]

## Riscos Identificados
- Risco 1: [descrição] - Mitigação: [ação]

## Compliance
- [ ] Revisado pelo Comitê de Ética em IA
- [ ] Avaliação de impacto à privacidade concluída
- [ ] Documentação de viés anexada

## Aprovações
- [Nome] - Arquiteto de Software - 2024-01-15
- [Nome] - Compliance - 2024-01-16
```

## 5.5 Rastreabilidade e Auditoria

### 5.5.1 Cadeia de Rastreabilidade

```
┌─────────────────────────────────────────────────────────────────┐
│                  CADEIA DE RASTREABILIDADE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Stakeholder                                                    │
│     │                                                           │
│     ▼                                                           │
│  Necessidade ─────────────────────────────────────┐             │
│     │                                             │             │
│     ▼                                             │             │
│  Intenção ───────────────┐                        │             │
│     │                    │                        │             │
│     ▼                    ▼                        ▼             │
│  Restrição ───────▶ Especificação ───────▶ Código Gerado        │
│     │                    │                        │             │
│     ▼                    ▼                        ▼             │
│  Caso de Teste ──▶ Oráculo de Teste ────▶ Resultado de Teste    │
│     │                    │                        │             │
│     └────────────────────┴────────────────────────┘             │
│                          │                                      │
│                          ▼                                      │
│                    Relatório de Compliance                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.5.2 Metadados de Rastreabilidade

```python
from dataclasses import dataclass
from datetime import datetime
from typing import List, Dict, Optional

@dataclass
class RequirementTraceability:
    """
    Metadados completos de rastreabilidade para requisitos/restrições.
    """
    # Identificação
    id: str
    version: str
    title: str
    
    # Origem
    source: str  # Stakeholder, regulamentação, etc.
    elicitation_date: datetime
    elicitation_method: str
    
    # Responsabilidade
    author: str
    approver: str
    approval_date: Optional[datetime]
    
    # Relacionamentos
    parent_requirement: Optional[str]
    child_requirements: List[str]
    related_requirements: List[str]
    
    # Implementação
    design_documents: List[str]
    code_references: List[str]
    test_cases: List[str]
    
    # Validação
    verification_method: str  # inspeção, teste, análise, demonstração
    verification_status: str
    verified_by: Optional[str]
    verification_date: Optional[datetime]
    
    # Mudança
    change_history: List[Dict]
    
    def to_audit_record(self) -> Dict:
        """Gera registro para auditoria."""
        return {
            'requirement_id': self.id,
            'version': self.version,
            'status': self.verification_status,
            'author': self.author,
            'approved_by': self.approver,
            'approval_date': self.approval_date.isoformat() if self.approval_date else None,
            'traceability_complete': self._check_completeness()
        }
    
    def _check_completeness(self) -> bool:
        """Verifica se todos os elementos de rastreabilidade estão presentes."""
        return all([
            self.approver is not None,
            self.design_documents,
            self.code_references,
            self.test_cases,
            self.verification_status == 'verified'
        ])
```

### 5.5.3 Auditoria Contínua

```python
class ContinuousAuditor:
    """
    Sistema de auditoria contínua para requisitos.
    """
    
    AUDIT_RULES = [
        {
            'name': 'missing_approval',
            'check': lambda r: r.approver is None,
            'severity': 'critical',
            'message': 'Requisito sem aprovação formal'
        },
        {
            'name': 'orphan_requirement',
            'check': lambda r: not r.code_references,
            'severity': 'warning',
            'message': 'Requisito sem implementação rastreada'
        },
        {
            'name': 'untested_requirement',
            'check': lambda r: not r.test_cases,
            'severity': 'warning',
            'message': 'Requisito sem casos de teste'
        },
        {
            'name': 'stale_requirement',
            'check': lambda r: (datetime.now() - r.elicitation_date).days > 365 
                               and not r.change_history,
            'severity': 'info',
            'message': 'Requisito sem revisão em mais de 1 ano'
        }
    ]
    
    def audit_requirement(self, req: RequirementTraceability) -> List[Dict]:
        findings = []
        for rule in self.AUDIT_RULES:
            if rule['check'](req):
                findings.append({
                    'rule': rule['name'],
                    'severity': rule['severity'],
                    'message': rule['message'],
                    'requirement_id': req.id
                })
        return findings
    
    def generate_compliance_report(self, requirements: List[RequirementTraceability]) -> Dict:
        total = len(requirements)
        all_findings = []
        
        for req in requirements:
            findings = self.audit_requirement(req)
            all_findings.extend(findings)
        
        critical = [f for f in all_findings if f['severity'] == 'critical']
        warnings = [f for f in all_findings if f['severity'] == 'warning']
        
        return {
            'total_requirements': total,
            'compliant_requirements': total - len(set(f['requirement_id'] for f in critical)),
            'compliance_rate': (total - len(set(f['requirement_id'] for f in critical))) / total,
            'findings': {
                'critical': len(critical),
                'warning': len(warnings),
                'total': len(all_findings)
            },
            'details': all_findings
        }
```

## 5.6 Ética em Requisitos

### 5.6.1 Princípios Éticos

**1. Justiça (Fairness)**
- Sistemas não devem discriminar baseados em atributos protegidos
- Devem ser testados para viés antes do deployment

**2. Transparência**
- Usuários devem ser informados quando interagem com IA
- Decisões automatizadas devem ser explicáveis

**3. Privacidade**
- Minimização de dados coletados
- Consentimento explícito para usos não-obvios
- Proteção de dados sensíveis

**4. Autonomia Humana**
- Decisões significativas devem ter supervisão humana
- Usuários devem poder optar por não ter decisões automatizadas

### 5.6.2 Avaliação de Viés

```python
class BiasAssessment:
    """
    Framework para avaliação de viés em requisitos e sistemas.
    """
    
    PROTECTED_ATTRIBUTES = [
        'gender', 'race', 'age', 'disability', 
        'religion', 'nationality', 'sexual_orientation'
    ]
    
    def assess_requirement(self, requirement_text: str) -> Dict:
        """
        Avalia um requisito para potenciais problemas de viés.
        """
        findings = {
            'explicit_mentions': [],
            'potential_proxies': [],
            'recommendations': []
        }
        
        # Verificar menções explícitas
        for attr in self.PROTECTED_ATTRIBUTES:
            if attr in requirement_text.lower():
                findings['explicit_mentions'].append({
                    'attribute': attr,
                    'context': self._extract_context(requirement_text, attr)
                })
        
        # Verificar proxies potenciais
        proxy_indicators = {
            'zipcode': 'proxies for race/income',
            'credit_score': 'proxies for socioeconomic status',
            'employment_history': 'pode desvantajar grupos específicos'
        }
        
        for indicator, concern in proxy_indicators.items():
            if indicator in requirement_text.lower():
                findings['potential_proxies'].append({
                    'indicator': indicator,
                    'concern': concern
                })
        
        return findings
```

## 5.7 Exercícios

1. Crie um checklist de compliance para um sistema de crédito com IA que:
   - Atende à LGPD
   - Segue princípios do AI Act (se aplicável)
   - Inclui mecanismos de accountability

2. Desenhe a cadeia de responsabilidade para um caso onde um LLM gera código com vulnerabilidade de segurança.

3. Proponha métricas para medir a maturidade de governança de IA em uma organização.

---

## Practical Considerations

- Torne a cadeia de responsabilidade explícita antes de operar em produção; sem isso, incidentes viram disputas em vez de aprendizado.
- Para cada requisito/restrição crítica, exija: origem (stakeholder/lei/política), criticidade, forma de verificação e evidência mínima de conformidade.
- Mantenha logs/auditoria como requisito, não como detalhe de implementação: sem trilha de decisão, não há investigação nem melhoria.
- Trate riscos de viés como parte da especificação: requisitos podem introduzir proxies discriminatórios antes mesmo do modelo ser escolhido.

## Summary

- Governança de requisitos em sistemas com IA exige cadeia de responsabilidade, auditoria e critérios de verificação.
- Compliance e privacidade precisam ser incorporados ao nível de restrições, não adicionados apenas como revisão final.
- Avaliação de viés começa no texto do requisito e nos dados/proxies que ele implica.

## References

1. BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD).
2. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering — Life cycle processes — Requirements engineering. 2018.
3. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

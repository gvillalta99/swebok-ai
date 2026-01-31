# 14.1 Prática Profissional na Era da IA

## Overview

A prática profissional de engenharia de software evolui significativamente com a adoção de IA. Profissionais devem equilibrar produtividade com responsabilidade, sabendo quando confiar e quando questionar código gerado por IA.

## Competências Essenciais

| Competência | Descrição | Importância |
|-------------|-----------|-------------|
| **Julgamento Crítico** | Avaliar quando usar vs. quando não usar IA | Crítica |
| **Verificação** | Validar código gerado sistematicamente | Crítica |
| **Governança** | Estabelecer limites e guardrails | Alta |
| **Ética** | Considerar impactos de decisões automatizadas | Alta |
| **Aprendizado Contínuo** | Acompanhar evolução das capacidades de IA | Alta |

## Framework de Decisão

```python
class ProfessionalJudgmentFramework:
    """
    Framework para decisões profissionais com IA
    """
    
    def should_use_ai(self, task):
        """
        Decide se deve usar IA para tarefa
        """
        criteria = {
            'complexity': task.complexity <= self.thresholds.complexity,
            'criticality': task.criticality <= self.thresholds.criticality,
            'verification_cost': self.verification_cost(task) < task.effort * 0.5,
            'domain_knowledge': self.has_sufficient_examples(task.domain)
        }
        
        if all(criteria.values()):
            return Decision(use_ai=True, confidence='high')
        elif sum(criteria.values()) >= 3:
            return Decision(use_ai=True, confidence='medium', 
                          human_review_required=True)
        else:
            return Decision(use_ai=False, reason='criteria_not_met')
```

## Responsabilidade Profissional

```
┌─────────────────────────────────────────────────────┐
│         RESPONSABILIDADE PROFISSIONAL               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  O profissional é responsável por:                  │
│                                                     │
│  ✓ Validar código gerado antes de deploy            │
│  ✓ Entender limitações do modelo usado              │
│  ✓ Documentar decisões de design                    │
│  ✓ Manter competências técnicas atualizadas         │
│  ✓ Considerar impactos éticos                       │
│  ✓ Recusar tarefas que violam princípios            │
│                                                     │
│  O profissional NÃO pode:                           │
│                                                     │
│  ✗ Deployar código não verificado                   │
│  ✗ Usar IA para tarefas críticas sem supervisão     │
│  ✗ Ignorar vulnerabilidades de segurança            │
│  ✗ Atribuir culpa ao modelo por erros próprios      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Summary

- **Competências:** Julgamento crítico é a mais importante
- **Decisão:** Framework para decidir quando usar IA
- **Responsabilidade:** Profissional mantém accountability

## References

1. ACM (2018). *ACM Code of Ethics and Professional Conduct*.
2. IEEE-CS/ACM (2004). *Software Engineering Code of Ethics*.

# 14.2 Ética e Responsabilidade

## Overview

O uso de IA em engenharia de software levanta questões éticas sobre accountability, transparência, viés e impacto social.

## Princípios Éticos

| Princípio | Aplicação |
|-----------|-----------|
| **Transparência** | Documentar uso de IA em sistemas |
| **Accountability** | Manter responsabilidade por decisões |
| **Fairness** | Evitar discriminação algorítmica |
| **Privacy** | Proteger dados usados em treinamento |
| **Safety** | Garantir segurança de sistemas críticos |

## Framework Ético

```python
class EthicalFramework:
    """
    Framework para avaliação ética de sistemas de IA
    """
    
    def ethical_review(self, system):
        """
        Realiza revisão ética de sistema
        """
        dimensions = {
            'transparency': self.assess_transparency(system),
            'fairness': self.assess_fairness(system),
            'privacy': self.assess_privacy(system),
            'accountability': self.assess_accountability(system),
            'safety': self.assess_safety(system)
        }
        
        return EthicalAssessment(
            dimensions=dimensions,
            approved=all(d.passed for d in dimensions.values()),
            recommendations=self.generate_recommendations(dimensions)
        )
```

## Summary

- **Princípios:** Transparência, accountability, fairness
- **Revisão:** Processo sistemático de avaliação ética
- **Responsabilidade:** Profissionais são responsáveis por impactos

## References

1. EU (2024). *AI Act*.
2. IEEE (2019). *Ethically Aligned Design*.

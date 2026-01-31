# 10.1 Processos de Engenharia com IA

## Overview

Os processos de engenharia de software devem evoluir para acomodar a geração de código por IA. Enquanto processos tradicionais assumem desenvolvimento manual, **processos com IA incluem etapas de geração, validação e iteração com modelos de linguagem**.

## Ciclo de Vida Adaptado

```
┌─────────────────────────────────────────────────────────────┐
│              CICLO DE VIDA COM IA                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐                                              │
│  │Requisitos│                                              │
│  └────┬─────┘                                              │
│       │                                                     │
│       ▼                                                     │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐           │
│  │  Design  │────►│Generate  │────►│ Validate │           │
│  │          │     │   Code   │     │   Code   │           │
│  └──────────┘     └──────────┘     └────┬─────┘           │
│                                         │                   │
│                              ┌──────────┴──────────┐       │
│                              │                     │       │
│                              ▼                     ▼       │
│                        ┌──────────┐          ┌──────────┐  │
│                        │ Aprovado │          │ Rejeitado│  │
│                        └────┬─────┘          └────┬─────┘  │
│                             │                     │        │
│                             ▼                     ▼        │
│                        ┌──────────┐          ┌──────────┐  │
│                        │  Testar  │          │ Refinar  │  │
│                        └────┬─────┘          │  Prompt  │  │
│                             │                └──────────┘  │
│                             ▼                              │
│                        ┌──────────┐                        │
│                        │  Deploy  │                        │
│                        └──────────┘                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Processos Ágeis com IA

```python
class AgileProcessWithAI:
    """
    Processo ágil adaptado para uso de IA
    """
    
    def plan_sprint(self, backlog):
        """
        Planeja sprint considerando capacidade de IA
        """
        capacity = self.calculate_team_capacity()
        
        # Ajustar velocidade para overhead de verificação
        ai_overhead = 1.4  # 40% mais tempo para verificação
        adjusted_capacity = capacity / ai_overhead
        
        # Selecionar itens
        selected = []
        current_load = 0
        
        for item in backlog.prioritized():
            if current_load + item.effort <= adjusted_capacity:
                selected.append(item)
                current_load += item.effort
        
        return SprintPlan(
            items=selected,
            capacity=adjusted_capacity,
            ai_tasks=[i for i in selected if i.uses_ai]
        )
```

## Summary

- **Ciclo adaptado:** Inclui geração e validação como etapas formais
- **Overhead:** 40% adicional para verificação de código de IA
- **Iterativo:** Processo de refinamento de prompts integrado

## References

1. Beck, K. (2002). *Test Driven Development: By Example*.
2. Rubin, K. S. (2012). *Essential Scrum*.

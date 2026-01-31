# 15.2 Métricas e KPIs

## Overview

Métricas econômicas para projetos com IA devem capturar não apenas produtividade, mas também qualidade, custos e valor de negócio.

## KPIs Essenciais

```python
class AIEconomicsKPIs:
    """
    KPIs econômicos para projetos de IA
    """
    
    KPIs = {
        'productivity': {
            'features_per_sprint': 'Features entregues',
            'loc_per_hour': 'Linhas de código / hora',
            'time_to_market': 'Tempo de concepção a produção'
        },
        'quality': {
            'defect_density': 'Defeitos / 1000 LOC',
            'verification_pass_rate': '% de código aceito na primeira validação',
            'production_incidents': 'Incidentes em produção'
        },
        'costs': {
            'cost_per_feature': 'Custo médio por feature',
            'api_cost_per_request': 'Custo de API por requisição',
            'verification_cost_ratio': 'Custo de verificação / custo de geração'
        },
        'value': {
            'business_value_delivered': 'Valor de negócio entregue',
            'customer_satisfaction': 'Satisfação do cliente',
            'roi': 'Retorno sobre investimento'
        }
    }
```

## Dashboard Econômico

| Métrica | Target | Atual | Tendência |
|---------|--------|-------|-----------|
| Custo/Feature | < $5K | $4.2K | ↓ |
| Verificação/Geração | < 4x | 3.5x | → |
| Defect Density | < 0.5 | 0.3 | ↓ |
| API Cost/Month | < $10K | $8.5K | ↓ |

## Summary

- **KPIs:** Produtividade, qualidade, custos, valor
- **Balanceamento:** Otimizar para valor, não apenas velocidade
- **Monitoramento:** Dashboards contínuos

## References

1. Fenton, N., & Pfleeger, S. L. (1998). *Software Metrics*.
2. Kan, S. H. (2002). *Metrics and Models in Software Quality Engineering*.

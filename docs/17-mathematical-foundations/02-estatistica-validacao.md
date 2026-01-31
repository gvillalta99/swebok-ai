# 17.2 Estatística para Validação

## Overview

Técnicas estatísticas são essenciais para validar sistemas de IA não-determinísticos.

## Testes Estatísticos

### Comparação de Médias

```python
from scipy import stats

def validate_improvement(baseline, treatment):
    """
    Valida se tratamento é significativamente melhor
    """
    # Teste t pareado
    t_stat, p_value = stats.ttest_rel(
        baseline.measurements,
        treatment.measurements
    )
    
    # Teste unilateral (queremos melhora)
    if t_stat > 0 and p_value / 2 < 0.05:
        return ValidationResult(
            improved=True,
            confidence=1 - p_value/2,
            effect_size=t_stat
        )
```

### Testes Não-Paramétricos

| Teste | Uso | Quando Usar |
|-------|-----|-------------|
| **Mann-Whitney U** | Comparar duas amostras | Dados não normais |
| **Kruskal-Wallis** | Comparar múltiplos grupos | ANOVA não aplicável |
| **Kolmogorov-Smirnov** | Comparar distribuições | Testar similaridade |
| **Chi-quadrado** | Testar independência | Dados categóricos |

## Intervalos de Confiança

```python
def confidence_interval(data, confidence=0.95):
    """
    Calcula intervalo de confiança
    """
    mean = np.mean(data)
    sem = stats.sem(data)  # Standard error of mean
    
    interval = stats.t.interval(
        confidence,
        len(data) - 1,
        loc=mean,
        scale=sem
    )
    
    return interval
```

## Power Analysis

```python
from statsmodels.stats.power import TTestIndPower

# Calcular tamanho de amostra necessário
analysis = TTestIndPower()
sample_size = analysis.solve_power(
    effect_size=0.5,  # Médio
    alpha=0.05,
    power=0.8
)
# Resultado: ~64 amostras por grupo
```

## Summary

- **Testes:** Paramétricos e não-paramétricos
- **Confiança:** Quantificar incerteza
- **Power:** Determinar tamanho de amostra

## References

1. Wasserman, L. (2004). *All of Statistics*.
2. Cohen, J. (1988). *Statistical Power Analysis*.

# 11.2 Métodos e Técnicas

## Overview

Métodos e técnicas de engenharia de software devem ser estendidos para lidar com código gerado por IA. Técnicas como TDD, BDD e revisão de código precisam de adaptações.

## TDD com IA

```python
class TDDWithAI:
    """
    Test-Driven Development adaptado para IA
    """
    
    def cycle(self, requirement):
        """
        Ciclo TDD com IA
        """
        # 1. Escrever teste
        test = self.write_test(requirement)
        
        # 2. Verificar que teste falha
        assert self.run_test(test) == 'fail'
        
        # 3. Gerar código com IA
        code = self.generate_code(requirement, test)
        
        # 4. Validar código gerado
        validation = self.validate_code(code, test)
        
        if not validation.passed:
            # Refinar e regenerar
            code = self.refine_and_regenerate(
                requirement, test, validation.issues
            )
        
        # 5. Verificar que teste passa
        assert self.run_test(test) == 'pass'
        
        # 6. Refatorar (se necessário)
        code = self.refactor(code)
        
        return code
```

## Revisão de Código de IA

```python
class AICodeReview:
    """
    Processo de revisão de código gerado por IA
    """
    
    def review(self, generated_code):
        """
        Revisa código gerado
        """
        checks = {
            'security': self.security_scan(generated_code),
            'correctness': self.correctness_check(generated_code),
            'performance': self.performance_analysis(generated_code),
            'maintainability': self.maintainability_score(generated_code)
        }
        
        return CodeReviewResult(
            checks=checks,
            approved=all(c.passed for c in checks.values()),
            issues=[i for c in checks.values() for i in c.issues]
        )
```

## Summary

- **TDD adaptado:** Geração após teste, validação obrigatória
- **Revisão:** Checklist específico para código de IA
- **Automação:** Ferramentas para validação automática

## References

1. Beck, K. (2002). *Test Driven Development*.
2. Martin, R. C. (2009). *Clean Code*.

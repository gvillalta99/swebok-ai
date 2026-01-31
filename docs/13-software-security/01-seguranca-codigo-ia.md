# 13.1 Segurança de Código Gerado por IA

## Overview

A segurança de software em sistemas com IA apresenta riscos adicionais. Código gerado por LLMs pode conter vulnerabilidades conhecidas, backdoors sutis ou comportamentos maliciosos não intencionais.

## Vulnerabilidades Específicas

| Vulnerabilidade | Descrição | Exemplo |
|-----------------|-----------|---------|
| **SQL Injection** | Concatenação insegura | `f"SELECT * FROM users WHERE id = {user_id}"` |
| **XSS** | Output não sanitizado | `return f"<div>{user_input}</div>"` |
| **Path Traversal** | Validação insuficiente | `open(f"/data/{filename}")` |
| **Hardcoded Secrets** | Chaves no código | `API_KEY = "sk-..."` |
| **Prompt Injection** | Manipulação de input | "Ignore previous instructions..." |

## Framework de Segurança

```python
class AISecurityFramework:
    """
    Framework de segurança para código de IA
    """
    
    def security_pipeline(self, code):
        """
        Pipeline de segurança para código gerado
        """
        checks = {
            'static_analysis': self.run_static_analysis(code),
            'dependency_check': self.check_dependencies(code),
            'secret_scanning': self.scan_for_secrets(code),
            'prompt_injection': self.test_prompt_injection(code),
            'behavioral_testing': self.test_malicious_behavior(code)
        }
        
        return SecurityAssessment(
            checks=checks,
            passed=all(c.passed for c in checks.values()),
            vulnerabilities=self.aggregate_vulnerabilities(checks)
        )
```

## Defesa em Profundidade

```
┌─────────────────────────────────────────────────────┐
│              DEFESA EM PROFUNDIDADE                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  1. Geração Segura                            │ │
│  │     - Prompts de segurança                    │ │
│  │     - Modelos alinhados                       │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  2. Validação                                 │ │
│  │     - Análise estática                        │ │
│  │     - Scan de vulnerabilidades                │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │  3. Runtime                                   │ │
│  │     - Sandboxing                              │ │
│  │     - Rate limiting                           │ │
│  │     - Monitoramento                           │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Summary

- **Vulnerabilidades:** Código de IA pode conter falhas clássicas
- **Pipeline:** Validação em múltiplas camadas
- **Defesa:** Geração segura + validação + runtime

## References

1. OWASP (2025). *OWASP Top 10 for LLM Applications*.
2. Ferrag, M. A., et al. (2024). Large Language Models for Code: Security Survey.

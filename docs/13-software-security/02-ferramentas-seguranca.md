# 13.2 Ferramentas de Segurança

## Overview

Ferramentas de segurança tradicionais precisam ser complementadas com ferramentas específicas para detectar vulnerabilidades em código gerado por IA.

## Ferramentas

| Categoria | Ferramenta | Propósito |
|-----------|-----------|-----------|
| **SAST** | Bandit, Semgrep, CodeQL | Análise estática |
| **DAST** | OWASP ZAP, Burp Suite | Testes dinâmicos |
| **Secrets** | GitLeaks, TruffleHog | Detecção de segredos |
| **IA** | Lakera, Rebuff | Proteção de prompts |
| **SCA** | Snyk, OWASP Dependency-Check | Dependências |

## Integração CI/CD

```yaml
# Pipeline de segurança
security_scan:
  stage: security
  script:
    - bandit -r src/ -f json -o bandit-report.json
    - semgrep --config=auto --json -o semgrep-report.json
    - gitleaks detect --source . --report-format json
    - snyk test --json-file-output=snyk-report.json
  artifacts:
    reports:
      sast: bandit-report.json
```

## Summary

- **SAST:** Análise estática obrigatória
- **Específicas:** Ferramentas para proteção de prompts
- **CI/CD:** Segurança integrada ao pipeline

## References

1. OWASP (2025). *Application Security Verification Standard*.
2. Snyk (2025). *State of Open Source Security*.

---
title: Seção 5 - Curadoria de Design na Era dos LLMs
date: 2025-01-30
tags:
  - swebok-ai
  - design
  - curadoria
  - llm
  - verificacao
status: draft
---

# Seção 5: Curadoria de Design na Era dos LLMs

## Overview

Esta seção desenvolve o conceito de **Curadoria de Design** como prática fundamental para engenheiros de software trabalhando com Large Language Models (LLMs). Enquanto design tradicional envolvia a criação manual de estruturas de código, a curadoria de design foca na **avaliação crítica, seleção e refinamento** de código gerado por sistemas autônomos, aplicando critérios de qualidade, verificabilidade e conformidade com restrições.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir curadoria de design e diferenciá-la de design tradicional
2. Aplicar o processo de curadoria em implementações geradas por IA
3. Identificar código "plausível mas incorreto" e anti-padrões comuns
4. Implementar verificação sistemática de código gerado
5. Utilizar especificação por restrições para guiar geração de código

---

## 5.1 Fundamentos da Curadoria de Design

### 5.1.1 Definição

**Curadoria de Design** é a disciplina de:

1. **Especificar** restrições de design precisas (o que não é aceitável)
2. **Solicitar** geração de código através de prompts estruturados
3. **Avaliar** código gerado segundo critérios de qualidade e conformidade
4. **Validar** verificabilidade, testabilidade e manutenibilidade
5. **Refinar** código aceito para melhorar clareza e eficiência
6. **Integrar** código no sistema existente garantindo coerência
7. **Verificar** comportamento através de testes e análise estática
8. **Documentar** decisões e raciocínios para accountability

### 5.1.2 Design Tradicional vs. Curadoria de Design

```
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN TRADICIONAL                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Requisitos ──▶ Análise ──▶ Design Mental ──▶ Codificação     │
│        │            │              │                 │          │
│        │            │              │                 ▼          │
│        │            │              │         Código Manual      │
│        │            │              │         (100% humano)      │
│        │            │              │                            │
│   Custo: 20%      20%           30%              30%            │
│                                                                 │
│   Características:                                              │
│   • Cada linha é decisão consciente                            │
│   • Raciocínio explícito no código                             │
│   • Custo de escrita > custo de leitura                        │
│   • Expertise em sintaxe e algoritmos                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                 CURADORIA DE DESIGN (SWEBOK-AI v5.0)            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Requisitos ──▶ Especificação ──▶ Geração ──▶ Curadoria       │
│        │              │               │             │           │
│        │              │               │             ▼           │
│        │              │               │      Avaliação/Seleção  │
│        │              │               │             │           │
│        │              │               ▼             ▼           │
│        │              │         Múltiplas       Código          │
│        │              │         Opções          Integrado       │
│        │              │         (IA)            (Híbrido)       │
│        │              │                                       │
│   Custo: 25%        15%           5%              55%           │
│        ▲                                          ▲             │
│        │                                          │             │
│        └────── Investimento em Verificação ──────┘              │
│                                                                 │
│   Características:                                              │
│   • Código gerado em escala                                     │
│   • Julgamento sobre qualidade e adequação                      │
│   • Custo de leitura > custo de escrita                        │
│   • Expertise em avaliação e verificação                        │
│   • Foco em restrições e invariantes                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.1.3 O Designer como Curador

```
┌─────────────────────────────────────────────────────────────────┐
│                O DESIGNER COMO CURADOR DE CÓDIGO                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Papel Tradicional:                Papel de Curadoria:         │
│   ─────────────────                 ───────────────────         │
│                                                                 │
│   "Eu escrevo código"               "Eu defino restrições"      │
│   "Eu implemento"                   "Eu avalio propostas"       │
│   "Eu otimizo"                      "Eu seleciono soluções"     │
│   "Eu resolvo bugs"                 "Eu verifico correção"      │
│   "Eu documento"                    "Eu governo decisões"       │
│                                                                 │
│   Competências:                     Competências:               │
│   ─────────────                     ─────────────               │
│                                                                 │
│   ✓ Sintaxe de linguagens           ✓ Leitura rápida            │
│   ✓ Algoritmos e estruturas         ✓ Detecção de anti-padrões  │
│   ✓ Padrões de design               ✓ Análise de plausibilidade │
│   ✓ Debugging                       ✓ Trade-off analysis        │
│   ✓ Otimização                      ✓ Prompt engineering        │
│   ✓ Testes unitários                ✓ Property-based testing    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.2 Processo de Curadoria de Design

### 5.2.1 Especificação por Restrições

**Princípio**: "Especifique o que é inaceitável; deixe a IA sugerir o que é possível."

```python
from dataclasses import dataclass
from typing import List, Callable, Optional
from enum import Enum

class ConstraintType(Enum):
    SYNTAX = "syntax"           # Padrões de código proibidos
    SEMANTIC = "semantic"       # Comportamentos inaceitáveis
    SECURITY = "security"       # Vulnerabilidades
    PERFORMANCE = "performance" # Ineficiências
    MAINTAINABILITY = "maintainability"  # Débito técnico

@dataclass
class DesignConstraint:
    """
    Restrição de design que código gerado deve respeitar.
    """
    id: str
    name: str
    description: str
    type: ConstraintType
    validation: Callable[[str], bool]  # Função que valida código
    severity: str  # 'blocking', 'warning'
    example_violation: Optional[str] = None
    remediation: Optional[str] = None

class DesignSpecification:
    """
    Especificação de design baseada em restrições negativas.
    """
    
    def __init__(self, context: str):
        self.context = context
        self.constraints: List[DesignConstraint] = []
        self.required_invariants: List[str] = []
        self.forbidden_patterns: List[str] = []
        
    def add_forbidden_pattern(self, 
                             pattern: str, 
                             reason: str,
                             example: str = None):
        """
        Adiciona padrão que código não deve usar.
        
        Exemplos:
        - "eval(" - risco de injeção de código
        - "float" para dinheiro - erro de precisão
        - "Thread.sleep(" em produção - problemas de escalabilidade
        """
        self.forbidden_patterns.append({
            'pattern': pattern,
            'reason': reason,
            'example': example
        })
    
    def add_required_invariant(self, 
                              invariant: str, 
                              validator: Callable[[str], bool]):
        """
        Adiciona invariante que deve ser preservado.
        
        Exemplos:
        - "Nunca expor senhas em logs"
        - "Toda operação deve ser idempotente"
        - "Validar todos os inputs externos"
        """
        self.required_invariants.append({
            'invariant': invariant,
            'validator': validator
        })
    
    def to_prompt(self) -> str:
        """
        Converte especificação em prompt para IA.
        """
        prompt = f"""
Contexto: {self.context}

RESTRIÇÕES OBRIGATÓRIAS (código que violar será rejeitado):
"""
        for pattern in self.forbidden_patterns:
            prompt += f"\n• NÃO USE: {pattern['pattern']}"
            prompt += f"\n  Motivo: {pattern['reason']}"
            if pattern['example']:
                prompt += f"\n  Exemplo de problema: {pattern['example']}"
        
        prompt += "\n\nINVARIANTES (devem ser preservados):\n"
        for inv in self.required_invariants:
            prompt += f"\n• {inv['invariant']}"
        
        prompt += """

INSTRUÇÕES:
- Gere código que RESPEITE todas as restrições acima
- Se não for possível gerar código válido, explique o porquê
- Inclua comentários explicando decisões de design
- Forneça testes unitários para verificação
"""
        return prompt
```

### 5.2.2 Geração e Avaliação

```python
class CodeCurator:
    """
    Orquestra o processo de curadoria de código.
    """
    
    def __init__(self, llm_client):
        self.llm = llm_client
        self.decision_log = []
    
    async def curate(self, 
                    specification: DesignSpecification,
                    requirements: str) -> dict:
        """
        Executa processo completo de curadoria.
        """
        # 1. Gerar código
        prompt = specification.to_prompt()
        prompt += f"\n\nRequisitos de funcionalidade:\n{requirements}"
        
        generated_code = await self.llm.generate(prompt)
        
        # 2. Validar contra restrições
        validation = self._validate_code(generated_code, specification)
        
        if not validation['valid']:
            # Rejeitar e tentar novamente com feedback
            feedback = self._generate_feedback(validation)
            regenerated = await self.llm.generate(
                prompt + f"\n\nErros na versão anterior:\n{feedback}"
            )
            generated_code = regenerated
            validation = self._validate_code(generated_code, specification)
        
        # 3. Avaliar qualidade
        quality_assessment = self._assess_quality(generated_code)
        
        # 4. Verificar testabilidade
        testability = self._assess_testability(generated_code)
        
        # 5. Registrar decisão
        decision = {
            'timestamp': datetime.now(),
            'specification': specification.context,
            'requirements': requirements,
            'generated_code': generated_code,
            'validation': validation,
            'quality': quality_assessment,
            'testability': testability,
            'accepted': validation['valid'] and quality_assessment['score'] > 0.7
        }
        
        self.decision_log.append(decision)
        
        return decision
    
    def _validate_code(self, 
                      code: str, 
                      spec: DesignSpecification) -> dict:
        """
        Valida código contra especificação.
        """
        violations = []
        
        # Verificar padrões proibidos
        for pattern in spec.forbidden_patterns:
            if pattern['pattern'] in code:
                violations.append({
                    'type': 'forbidden_pattern',
                    'pattern': pattern['pattern'],
                    'reason': pattern['reason'],
                    'severity': 'blocking'
                })
        
        # Verificar invariantes
        for inv in spec.required_invariants:
            if not inv['validator'](code):
                violations.append({
                    'type': 'invariant_violation',
                    'invariant': inv['invariant'],
                    'severity': 'blocking'
                })
        
        # Validações sintáticas
        try:
            ast.parse(code)
        except SyntaxError as e:
            violations.append({
                'type': 'syntax_error',
                'message': str(e),
                'severity': 'blocking'
            })
        
        return {
            'valid': len(violations) == 0,
            'violations': violations,
            'blocking_count': len([v for v in violations if v['severity'] == 'blocking'])
        }
```

---

## 5.3 Anti-Padrões em Código Gerado

### 5.3.1 Código "Plausível mas Incorreto"

**Definição**: Código que parece correto à primeira vista, mas contém bugs sutis.

**Exemplos:**

```python
# EXEMPLO 1: Off-by-one error aparentemente correto
def get_last_n_items(items, n):
    """Retorna os últimos N itens da lista."""
    # Plausível mas incorreto quando n > len(items)
    return items[-n:]  # Deveria validar: max(0, -n) se n > len?

# Correto:
def get_last_n_items(items, n):
    if n <= 0:
        return []
    return items[-n:] if n <= len(items) else items

# EXEMPLO 2: Race condition em validação
def transfer_funds(account_from, account_to, amount):
    """Transfere fundos entre contas."""
    # Plausível mas incorreto: não é atômico!
    if account_from.balance >= amount:  # Check
        account_from.balance -= amount  # Deduct
        account_to.balance += amount    # Add
    # Race condition: outra thread pode modificar balance entre check e deduct

# Correto: Usar transações atômicas ou locks

# EXEMPLO 3: SQL Injection "discretizada"
def get_user_by_name(name):
    # Plausível: parece estar usando parâmetros
    query = "SELECT * FROM users WHERE name = '{}'".format(name)
    # Mas na verdade está usando format(), não é parametrizado!
    return db.execute(query)

# Correto:
def get_user_by_name(name):
    query = "SELECT * FROM users WHERE name = %s"
    return db.execute(query, (name,))  # Realmente parametrizado
```

### 5.3.2 Over-Engineering por Prompt

**Sintomas**:
- Padrões de design complexos para problemas simples
- Abstrações prematuras
- Código genérico onde específico seria melhor

**Exemplo:**

```python
# Problema: Ler arquivo de configuração simples

# Código gerado over-engineered:
class ConfigurationLoader:
    """Strategy pattern para carregamento de configurações."""
    
    def __init__(self, loader_strategy):
        self._strategy = loader_strategy
    
    def load(self, path):
        return self._strategy.load(path)

class JSONLoaderStrategy:
    def load(self, path):
        with open(path) as f:
            return json.load(f)

class YAMLLoaderStrategy:
    def load(self, path):
        with open(path) as f:
            return yaml.safe_load(f)

# Uso:
loader = ConfigurationLoader(JSONLoaderStrategy())
config = loader.load("config.json")

# Código simples e adequado:
import json

config = json.load(open("config.json"))
```

### 5.3.3 Perda de Contexto Organizacional

**Problema**: Código gerado que ignora convenções e padrões do projeto existente.

**Mitigação:**

```python
class ContextAwareValidator:
    """
    Valida se código gerado respeita contexto organizacional.
    """
    
    def __init__(self, codebase_context: dict):
        self.context = codebase_context
    
    def validate(self, code: str) -> dict:
        """
        Verifica conformidade com contexto.
        """
        issues = []
        
        # Verificar convenções de nomenclatura
        if not self._follows_naming_conventions(code):
            issues.append("Viola convenções de nomenclatura")
        
        # Verificar uso de bibliotecas permitidas
        if not self._uses_allowed_libraries(code):
            issues.append("Usa bibliotecas não aprovadas")
        
        # Verificar estilo de código
        if not self._follows_style_guide(code):
            issues.append("Viola style guide do projeto")
        
        # Verificar padrões arquiteturais
        if not self._follows_architectural_patterns(code):
            issues.append("Não segue padrões arquiteturais")
        
        return {
            'valid': len(issues) == 0,
            'issues': issues
        }
```

---

## 5.4 Métricas de Curadoria de Design

### 5.4.1 Métricas de Qualidade

```python
@dataclass
class CuratorQualityMetrics:
    """
    Métricas para avaliar qualidade do processo de curadoria.
    """
    
    # Taxas
    acceptance_rate: float           # % de código aceito na primeira tentativa
    rejection_rate: float            # % de código rejeitado
    iteration_count: float           # Média de iterações por funcionalidade
    
    # Qualidade do código aceito
    avg_complexity: float            # Complexidade ciclomática média
    avg_test_coverage: float         # Cobertura de testes
    security_vulnerabilities: int    # Vulnerabilidades encontradas
    
    # Eficiência
    time_per_review: float           # Tempo médio de revisão (minutos)
    time_per_iteration: float        # Tempo médio por iteração
    
    # Débito técnico
    tech_debt_introduced: int        # Itens de débito técnico
    violations_of_constraints: int   # Violações de restrições
    
    def health_score(self) -> float:
        """
        Score de saúde do processo (0-1).
        """
        # Taxa de aceitação ideal: 60-80%
        acceptance_health = 1.0 - abs(self.acceptance_rate - 0.7)
        
        # Iterações ideais: 1-2
        iteration_health = 1.0 if self.iteration_count <= 2 else 0.5
        
        # Complexidade ideal: < 10
        complexity_health = 1.0 if self.avg_complexity < 10 else 0.5
        
        return (acceptance_health + iteration_health + complexity_health) / 3
```

### 5.4.2 Dashboard de Curadoria

```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD DE CURADORIA                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Métricas da Semana:                                            │
│  ───────────────────                                            │
│                                                                 │
│  Taxa de Aceitação:        [████████░░] 78% (meta: 60-80%)     │
│  Taxa de Rejeição:         [██░░░░░░░░] 15% (aceitável)        │
│  Iterações Médias:         [█████░░░░░] 2.3 (meta: < 3)        │
│  Tempo Médio de Revisão:   [████░░░░░░] 18 min (meta: < 30)    │
│                                                                 │
│  Qualidade do Código Aceito:                                    │
│  ───────────────────────────                                    │
│                                                                 │
│  Complexidade Média:       [████░░░░░░] 7.2 (bom)              │
│  Cobertura de Testes:      [████████░░] 82% (meta: > 80%)      │
│  Vulnerabilidades:         [░░░░░░░░░░] 0 (ótimo)              │
│  Débito Técnico:           [██░░░░░░░░] 3 itens (aceitável)    │
│                                                                 │
│  Health Score:             [████████░░] 0.82 (SAUDÁVEL)        │
│                                                                 │
│  Alertas:                                                       │
│  ⚠️  Aumento de 20% no tempo de revisão vs. semana passada     │
│  ✅ Nenhuma violação de restrições críticas                    │
│  ✅ Todas as decisões documentadas                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.5 Ferramentas para Curadoria

### 5.5.1 Stack Recomendada

| Categoria | Ferramenta | Propósito |
|-----------|-----------|-----------|
| **Análise Estática** | SonarQube, Pylint, ESLint | Detectar violações automáticas |
| **Segurança** | Semgrep, Bandit, CodeQL | Identificar vulnerabilidades |
| **Testes** | Property-based (Hypothesis), Mutation testing | Verificar comportamento |
| **Complexidade** | radon, lizard | Medir complexidade ciclomática |
| **Documentação** | ADRs, Decision Logs | Accountability |

### 5.5.2 Integração no CI/CD

```yaml
# .github/workflows/curator-check.yml
name: Curadoria de Design

on: [pull_request]

jobs:
  curate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Verificar restrições críticas
        run: |
          python scripts/check_constraints.py --critical-only
      
      - name: Análise de segurança
        run: |
          bandit -r src/ -f json -o bandit-report.json
      
      - name: Análise de complexidade
        run: |
          radon cc src/ --average
      
      - name: Verificar proveniência de IA
        run: |
          python scripts/check_ai_attribution.py
      
      - name: Gerar relatório de curadoria
        run: |
          python scripts/generate_curator_report.py
```

---

## 5.6 Checklist de Curadoria de Design

### Antes de Gerar Código

- [ ] Defini as restrições de design (o que não é aceitável)?
- [ ] Documentei o contexto e convenções do projeto?
- [ ] Identifiquei invariantes que devem ser preservados?
- [ ] Estabeleci critérios de aceitação claros?

### Durante a Revisão

- [ ] Verifiquei se código viola restrições críticas?
- [ ] Analisei código "plausível mas incorreto"?
- [ ] Verifiquei segurança (injeções, segredos expostos)?
- [ ] Avaliei complexidade ciclomática?
- [ ] Verifiquei se segue convenções do projeto?
- [ ] Analisei testabilidade?
- [ ] Verifiquei tratamento de erros?

### Após Aceitação

- [ ] Escrevi/verifiquei testes unitários?
- [ ] Documentei decisões de design?
- [ ] Registrei por que aceitei/rejeitei código?
- [ ] Verifiquei integração com código existente?
- [ ] Atualizei documentação?
- [ ] Comuniquei mudanças à equipe?

---

## Summary

- **Curadoria de Design** é a prática de avaliar, selecionar e integrar código gerado por IA
- **Especificação por restrições**: Foque no que é inaceitável, não prescreva soluções
- **Anti-padrões**: Código plausível mas incorreto, over-engineering, perda de contexto
- **Métricas**: Taxa de aceitação, iterações, complexidade, health score
- **Accountability**: Documente todas as decisões de curadoria

---

## Matriz de Avaliação Consolidada

| Critério | Avaliação |
|----------|-----------|
| **Descartabilidade Geracional** | Muito Baixa — curadoria é skill essencial na era dos LLMs |
| **Custo de Verificação** | Muito Alto — revisão de código é o novo gargalo |
| **Responsabilidade Legal** | Crítica — engenheiro é responsável por código que aprova |

---

## References

1. [[03-principios-diretores-swebok-ai|Princípios Diretores SWEBOK-AI]]
2. [[02-mudanca-paradigma-engenharia-software|Mudança de Paradigma]]
3. [[03-software-design/01-fundamentos-design-era-llms.md|Fundamentos de Design na Era dos LLMs]]
4. [[02-software-architecture/09-curadoria-arquitetural.md|Curadoria Arquitetural]]
5. Hamade, J. (2024) - "True Cost of AI-Generated Code"
6. The New Stack (2025) - "AI Code Generation: Trust and Verify, Always"

---

*SWEBOK-AI v5.0 - Software Design - Seção 5*

# Seção 7: Ferramentas e Técnicas Modernas

## Overview

Esta seção organiza técnicas e classes de ferramentas que suportam Engenharia de Restrições em escala (elicitação, especificação, verificação, rastreabilidade e governança). O foco é em padrões repetíveis e integrações, evitando dependência de um fornecedor específico.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Selecionar técnicas adequadas para elicitação, especificação e verificação em contextos com IA
2. Projetar integrações que preservem rastreabilidade e evidência (do requisito à verificação)
3. Identificar limites e riscos de automação em requisitos (alucinação, viés, falsa conformidade)
4. Definir critérios de maturidade para adoção de ferramentas sem dependência de vendor

## 7.1 Introdução

A engenharia de requisitos na era dos LLMs demanda ferramentas e técnicas que transcendam documentação estática e aproximações puramente manuais. A integração de inteligência artificial nos processos de elicitação, especificação, validação e gestão de requisitos representa uma mudança qualitativa na disciplina.

Esta seção apresenta o ecossistema de ferramentas modernas, técnicas emergentes e padrões de integração que habilitam a Engenharia de Restrições em escala.

## 7.2 Ferramentas de Elicitação Assistida

### 7.2.1 Elicitação com LLMs

**Prompts Estruturados para Elicitação:**

```markdown
## Template de Prompt para Elicitação

### Contexto
[Descrição do domínio de negócio]
[Stakeholders identificados]
[Objetivos do sistema]

### Instrução
Atue como um analista de requisitos sênior especializado em [domínio].
Analise o seguinte cenário e elicite:

1. **Restrições Funcionais Negativas** (o que o sistema NÃO deve fazer)
   - Identifique comportamentos proibidos
   - Inclua justificativa de risco

2. **Restrições de Domínio**
   - Regras invariáveis do negócio
   - Limitações regulatórias

3. **Invariantes de Sistema**
   - Propriedades que devem ser preservadas
   - Condições de integridade

4. **Cenários de Degradação**
   - Comportamento esperado em falhas
   - Fallbacks apropriados

### Formato de Saída
Para cada item identificado, forneça:
- ID (ex: RES-001)
- Descrição clara e mensurável
- Origem (stakeholder/regulamentação/risco)
- Criticidade (Alta/Média/Baixa)
- Método de verificação sugerido
```

### 7.2.2 Ferramentas e Plataformas

| Ferramenta | Categoria | Capacidades |
|------------|-----------|-------------|
| ChatGPT/Claude | Elicitação assistida | Geração de questões, análise de documentos |
| Miro AI | Colaboração visual | Geração de diagramas, análise de sticky notes |
| Notion AI | Documentação | Sumarização, expansão de requisitos |
| Copy.ai/Jasper | Geração de conteúdo | Documentação estruturada |
| custom GPTs | Elicitação especializada | Domínio-específico, treinado com contexto |

### 7.2.3 Validação Cruzada com Múltiplos Modelos

```python
from typing import List, Dict
from dataclasses import dataclass

@dataclass
class ElicitationResult:
    source_model: str
    constraints: List[Dict]
    confidence: float

class MultiModelElicitation:
    """
    Realiza elicitação com múltiplos modelos para validação cruzada.
    """
    
    def elicit_from_multiple_models(
        self, 
        context: str,
        models: List[str] = ['gpt-4', 'claude-3', 'gemini-pro']
    ) -> Dict:
        """
        Elicita requisitos usando múltiplos modelos e consolida resultados.
        """
        results = []
        
        for model in models:
            result = self._query_model(model, context)
            results.append(result)
        
        # Analisar concordância
        consolidated = self._consolidate_results(results)
        
        return {
            'consensus_constraints': consolidated['high_agreement'],
            'contested_constraints': consolidated['low_agreement'],
            'coverage_by_model': {r.source_model: len(r.constraints) for r in results},
            'agreement_matrix': self._calculate_agreement(results)
        }
    
    def _consolidate_results(self, results: List[ElicitationResult]) -> Dict:
        """
        Consolida resultados identificando concordâncias e divergências.
        """
        all_constraints = []
        for result in results:
            all_constraints.extend(result.constraints)
        
        # Agrupar por similaridade semântica
        clusters = self._cluster_by_similarity(all_constraints)
        
        high_agreement = [c for c in clusters if c['model_count'] >= len(results) * 0.7]
        low_agreement = [c for c in clusters if c['model_count'] < len(results) * 0.5]
        
        return {
            'high_agreement': high_agreement,
            'low_agreement': low_agreement
        }
```

## 7.3 Ferramentas de Especificação

### 7.3.1 Linguagens de Especificação com Suporte a IA

**Gherkin Aprimorado:**

```gherkin
# language: pt
Funcionalidade: Processamento de Transações

  Restrição: Validação de Segurança
    O sistema NÃO DEVE processar transações sem:
    - Autenticação multifator válida
    - Verificação de dispositivo confiável
    - Score de risco < 0.3

  Cenário: Transação válida
    Dado que o usuário está autenticado com MFA
    E o dispositivo está na lista de confiáveis
    Quando o usuário solicitar uma transferência de R$ 1000
    Então a transação deve ser processada
    E um recibo deve ser gerado

  Cenário: Tentativa sem MFA
    Dado que o usuário não completou MFA
    Quando o usuário tentar qualquer operação financeira
    Então o sistema DEVE rejeitar a operação
    E registrar o incidente para auditoria
    E retornar mensagem: "Autenticação adicional necessária"

  Invariante: Conservação de Valor
    Para qualquer transação T:
    conta_origem.saldo_apos = conta_origem.saldo_antes - T.valor
    conta_destino.saldo_apos = conta_destino.saldo_antes + T.valor
    conta_origem.saldo_apos + conta_destino.saldo_apos = 
      conta_origem.saldo_antes + conta_destino.saldo_antes
```

**Especificação em Markdown Estruturado:**

```markdown
---
id: REQ-001
title: Restrição de Acesso a Dados Sensíveis
type: negative_constraint
criticality: critical
compliance: [LGPD, GDPR]
---

# Restrição: Acesso a Dados Sensíveis

## Descrição
O sistema NÃO DEVE permitir acesso a dados classificados como 
"sensíveis" sem:
1. Autorização explícita do titular
2. Finalidade documentada e permitida por lei
3. Registro de auditoria completo

## Definições
- **Dados Sensíveis**: Conforme art. 5º, II da LGPD
- **Autorização**: Consentimento livre, informado e inequívoco

## Invariantes
```
forall acesso : AcessoDados |
  acesso.dados.classificacao == SENSIVEL implies
    acesso.titular.consentimento.vigente == true AND
    acesso.finalidade in FINALIDADES_PERMITIDAS AND
    exists r : RegistroAuditoria |
      r.acesso == acesso AND
      r.timestamp == acesso.timestamp
```

## Verificação
- Análise estática: SonarQube + regras customizadas
- Teste: Casos de teste negativos em `test/security/`
- Auditoria: Logs analisados diariamente

## Exceções
Nenhuma. Esta restrição não admite exceções.
```

### 7.3.2 IDEs e Editores com Suporte a IA

| Ferramenta | Integração | Capacidades |
|------------|------------|-------------|
| GitHub Copilot | VS Code, JetBrains | Sugestão de especificações, complemento de contratos |
| Cursor | Editor nativo com IA | Geração de requisitos a partir de código |
| Continue | VS Code, JetBrains | Chat integrado para refinamento de requisitos |
| Amazon CodeWhisperer | Múltiplos IDEs | Geração de documentação a partir de código |

## 7.4 Ferramentas de Verificação e Validação

### 7.4.1 Verificação Automática de Restrições

```python
from typing import List, Dict, Callable
import ast

class ConstraintVerifier:
    """
    Verifica automaticamente conformidade com restrições especificadas.
    """
    
    VERIFIERS = {
        'no_hardcoded_secrets': '_check_no_secrets',
        'input_validation': '_check_input_validation',
        'error_handling': '_check_error_handling',
        'no_infinite_loops': '_check_loop_bounds',
        'max_complexity': '_check_cyclomatic_complexity'
    }
    
    def verify_code(self, code: str, constraints: List[str]) -> Dict:
        """
        Verifica código contra um conjunto de restrições.
        """
        violations = []
        
        for constraint in constraints:
            verifier_name = self.VERIFIERS.get(constraint)
            if verifier_name:
                verifier = getattr(self, verifier_name)
                result = verifier(code)
                if not result['passed']:
                    violations.append({
                        'constraint': constraint,
                        'message': result['message'],
                        'locations': result['locations']
                    })
        
        return {
            'passed': len(violations) == 0,
            'violations': violations,
            'constraint_coverage': len(constraints) - len(violations)
        }
    
    def _check_no_secrets(self, code: str) -> Dict:
        """Verifica presença de segredos hardcoded."""
        # Implementação usando regex ou bibliotecas como gitLeaks
        import re
        patterns = [
            r'password\s*=\s*["\'][^"\']+["\']',
            r'api_key\s*=\s*["\'][^"\']+["\']',
            r'secret\s*=\s*["\'][^"\']+["\']'
        ]
        
        violations = []
        for pattern in patterns:
            matches = re.finditer(pattern, code, re.IGNORECASE)
            for match in matches:
                violations.append({
                    'line': code[:match.start()].count('\n') + 1,
                    'match': match.group()[:50] + '...'
                })
        
        return {
            'passed': len(violations) == 0,
            'message': 'Segredos hardcoded detectados' if violations else 'OK',
            'locations': violations
        }
```

### 7.4.2 Testes Baseados em Propriedades (Property-Based Testing)

```python
from hypothesis import given, strategies as st, settings
import pytest

class PropertyBasedTests:
    """
    Testes baseados em propriedades para validação de invariantes.
    """
    
    @given(
        st.lists(st.integers(min_value=-1000, max_value=1000), min_size=1, max_size=100),
        st.integers(min_value=-100, max_value=100)
    )
    @settings(max_examples=1000)
    def test_transferencia_preserva_saldo_total(
        self, 
        saldos_iniciais: List[int], 
        valor_transferencia: int
    ):
        """
        Invariante: Transferências preservam o saldo total do sistema.
        """
        # Setup
        conta_origem_idx = 0
        conta_destino_idx = 1 % len(saldos_iniciais)
        
        if conta_origem_idx == conta_destino_idx:
            return  # Caso trivial
        
        saldo_origem = abs(saldos_iniciais[conta_origem_idx])
        saldo_destino = abs(saldos_iniciais[conta_destino_idx])
        valor = abs(valor_transferencia) % (saldo_origem + 1)  # Garantir saldo suficiente
        
        saldo_total_antes = saldo_origem + saldo_destino
        
        # Operação
        saldo_origem_apos = saldo_origem - valor
        saldo_destino_apos = saldo_destino + valor
        
        saldo_total_apos = saldo_origem_apos + saldo_destino_apos
        
        # Verificação do invariante
        assert saldo_total_antes == saldo_total_apos, \
            f"Saldo não preservado: {saldo_total_antes} != {saldo_total_apos}"
    
    @given(st.text(min_size=1))
    def test_nunca_gera_codigo_com_eval(self, prompt: str):
        """
        Restrição: Sistema NUNCA deve gerar código usando eval/exec.
        """
        codigo_gerado = self.sistema_ia.generate(prompt)
        
        assert 'eval(' not in codigo_gerado, "Código gerado contém eval()"
        assert 'exec(' not in codigo_gerado, "Código gerado contém exec()"
        assert '__import__' not in codigo_gerado, "Código gerado contém __import__"
```

## 7.5 Ferramentas de Gestão e Rastreabilidade

### 7.5.1 Plataformas Modernas

| Plataforma | Capacidades de IA | Caso de Uso |
|------------|-------------------|-------------|
| Linear | Sugestão automática de relacionamentos | Gestão ágil de requisitos |
| Jira + AI | Análise de sentimento em feedback | Priorização inteligente |
| Aha! | Previsão de roadmap | Planejamento estratégico |
| Azure DevOps + Copilot | Geração de work items | Especificação assistida |
| ReqSuite | Análise de qualidade de requisitos | Validação automática |

### 7.5.2 Rastreabilidade Automatizada

```python
from dataclasses import dataclass
from typing import List, Set, Dict
import git
import ast

@dataclass
class TraceLink:
    source: str  # ID do requisito
    target: str  # Referência ao código/documento
    link_type: str  # implements, tests, verifies
    confidence: float  # Score de confiança (0-1)

class AutomatedTraceability:
    """
    Sistema de rastreabilidade automatizada usando NLP e análise de código.
    """
    
    def __init__(self, requirements_db, codebase_path):
        self.requirements_db = requirements_db
        self.codebase = git.Repo(codebase_path)
    
    def discover_links(self) -> List[TraceLink]:
        """
        Descobre links de rastreabilidade automaticamente.
        """
        links = []
        
        # 1. Análise de comentários no código
        code_links = self._analyze_code_comments()
        links.extend(code_links)
        
        # 2. Análise de mensagens de commit
        commit_links = self._analyze_commit_messages()
        links.extend(commit_links)
        
        # 3. Análise de nomes de testes
        test_links = self._analyze_test_names()
        links.extend(test_links)
        
        # 4. Análise semântica com embeddings
        semantic_links = self._analyze_semantic_similarity()
        links.extend(semantic_links)
        
        # Filtrar por confiança
        return [l for l in links if l.confidence > 0.7]
    
    def _analyze_code_comments(self) -> List[TraceLink]:
        """
        Analisa comentários no código procurando referências a requisitos.
        """
        links = []
        pattern = r'(?:REQ|RES|CON)-\d{3,}'
        
        for file_path in self.codebase.tree():
            if not file_path.endswith('.py'):
                continue
            
            content = self.codebase.git.show(f'HEAD:{file_path}')
            
            # Parse do AST para encontrar comentários
            try:
                tree = ast.parse(content)
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        docstring = ast.get_docstring(node)
                        if docstring:
                            matches = re.findall(pattern, docstring)
                            for req_id in matches:
                                links.append(TraceLink(
                                    source=req_id,
                                    target=f"{file_path}#{node.name}",
                                    link_type='implements',
                                    confidence=0.8
                                ))
            except SyntaxError:
                continue
        
        return links
```

## 7.6 Integração com CI/CD

### 7.6.1 Pipeline de Validação de Requisitos

```yaml
# .github/workflows/requirements-validation.yml
name: Requirements Validation

on:
  push:
    paths:
      - 'requirements/**'
      - 'src/**'
  pull_request:
    paths:
      - 'requirements/**'

jobs:
  validate-requirements:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      
      - name: Install Dependencies
        run: |
          pip install -r requirements-dev.txt
      
      - name: Validate Requirement Syntax
        run: |
          python scripts/validate_requirements.py requirements/
      
      - name: Check Traceability
        run: |
          python scripts/check_traceability.py \
            --requirements requirements/ \
            --code src/
      
      - name: Verify Constraints in Code
        run: |
          python scripts/verify_constraints.py \
            --constraints requirements/constraints.yaml \
            --code src/
      
      - name: Generate Compliance Report
        run: |
          python scripts/compliance_report.py \
            --output compliance-report.md
      
      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: compliance-report
          path: compliance-report.md
```

### 7.6.2 Validação de Código Gerado por IA

```python
class GeneratedCodeValidator:
    """
    Valida código gerado por IA antes de integração.
    """
    
    VALIDATION_STEPS = [
        'syntax_check',
        'security_scan',
        'constraint_verification',
        'test_generation',
        'test_execution'
    ]
    
    def validate(self, generated_code: str, context: Dict) -> Dict:
        """
        Executa pipeline completo de validação.
        """
        results = {}
        
        # 1. Verificação sintática
        results['syntax'] = self._check_syntax(generated_code)
        if not results['syntax']['valid']:
            return {'passed': False, 'stage': 'syntax', 'details': results}
        
        # 2. Verificação de segurança
        results['security'] = self._security_scan(generated_code)
        if results['security']['vulnerabilities']:
            return {'passed': False, 'stage': 'security', 'details': results}
        
        # 3. Verificação de restrições
        constraints = context.get('constraints', [])
        results['constraints'] = self._verify_constraints(generated_code, constraints)
        if not results['constraints']['passed']:
            return {'passed': False, 'stage': 'constraints', 'details': results}
        
        # 4. Geração e execução de testes
        results['tests'] = self._generate_and_run_tests(generated_code, context)
        if not results['tests']['passed']:
            return {'passed': False, 'stage': 'tests', 'details': results}
        
        return {
            'passed': True,
            'details': results,
            'estimated_confidence': self._calculate_confidence(results)
        }
```

## 7.7 Tendências Emergentes

### 7.7.1 Especificação Executável

A convergência entre especificação e implementação:

```python
# Especificação que é simultaneamente teste e documentação
from deal import pre, post, inv

@pre(lambda x: x > 0, message='Input must be positive')
@post(lambda result: result > 0, message='Output must be positive')
@inv(lambda self: self.balance >= 0, message='Balance must be non-negative')
class Account:
    """
    Conta bancária com contratos executáveis.
    
    Estes contratos servem como:
    1. Documentação viva do comportamento esperado
    2. Verificação em runtime durante desenvolvimento
    3. Base para geração de testes
    """
    
    def __init__(self, initial_balance: float = 0):
        self.balance = initial_balance
    
    @pre(lambda self, amount: amount > 0)
    @post(lambda self: self.balance == __old__.self.balance + amount)
    def deposit(self, amount: float) -> None:
        self.balance += amount
```

### 7.7.2 Digital Twins de Requisitos

Modelos virtuais que simulam comportamento antes da implementação:

```python
class RequirementDigitalTwin:
    """
    Gêmeo digital de um requisito para simulação e validação.
    """
    
    def __init__(self, requirement_spec: Dict):
        self.spec = requirement_spec
        self.simulation_model = self._build_simulation()
    
    def simulate_scenarios(self, scenarios: List[Dict]) -> Dict:
        """
        Simula o comportamento do requisito em cenários diversos.
        """
        results = []
        
        for scenario in scenarios:
            outcome = self.simulation_model.run(scenario)
            results.append({
                'scenario': scenario['name'],
                'satisfied': outcome.satisfies(self.spec),
                'confidence': outcome.confidence,
                'edge_cases': outcome.edge_cases
            })
        
        return {
            'satisfaction_rate': sum(r['satisfied'] for r in results) / len(results),
            'scenarios': results,
            'recommendations': self._generate_recommendations(results)
        }
```

## 7.8 Exercícios

1. Configure um pipeline de CI/CD que valide automaticamente:
   - Sintaxe de arquivos de requisitos
   - Rastreabilidade completa
   - Conformidade com restrições de segurança

2. Implemente um verificador automático para a restrição:
   "O sistema NÃO DEVE expor informações de exceções em mensagens de erro"

3. Crie um template de prompt para elicitação assistida de restrições de segurança.

---

## Practical Considerations

- Priorize ferramentas/rotinas que gerem evidência verificável (checks automatizados, relatórios, trilhas de auditoria) em vez de apenas “documentação bonita”.
- Evite acoplar requisitos a uma ferramenta: preserve formatos exportáveis e um vocabulário comum (campos obrigatórios, criticidade, verificação).
- Ao automatizar elicitação com LLMs, trate a saída como hipótese inicial; a validação continua sendo responsabilidade humana.

## Summary

- Ferramentas modernas para requisitos devem suportar rastreabilidade, verificação e governança, não apenas escrita.
- Integração em pipeline (ex.: validações e checks) reduz custo marginal de verificação e aumenta repetibilidade.
- Adoção segura depende de limites: o que pode ser automatizado e o que exige revisão humana.

## References

1. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering — Life cycle processes — Requirements engineering. 2018.
2. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

---
title: "Seção 4: CI/CD para Sistemas com IA"
created_at: 2025-01-31
tags: ["constru\u00e7\u00e3o", "construction", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# Seção 4: CI/CD para Sistemas com IA

## Overview

Esta seção aborda as adaptações necessárias em pipelines de Integração Contínua e Entrega Contínua (CI/CD) para acomodar código gerado por sistemas de IA. Enquanto pipelines tradicionais foram projetados para código escrito por humanos, a natureza estocástica, volumétrica e potencialmente imprevisível de código gerado por LLMs exige novas abordagens de teste, verificação e deployment.

A integração de IA em pipelines CI/CD não se limita a executar testes automáticos, mas envolve a reconfiguração de gateways de qualidade, a introdução de verificações específicas para código de origem não-determinística e a implementação de mecanismos de rollback rápido para cenários de falha.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Adaptar pipelines CI/CD existentes para código gerado por IA
2. Implementar testes estatísticos para componentes não-determinísticos
3. Configurar monitoramento e observabilidade para sistemas híbridos
4. Estabelecer estratégias de rollback e rollback para código de IA
5. Projetar pipelines resilientes que lidem com falhas de geração

---

## 4.1 Arquitetura de CI/CD para Código Gerado

### 4.1.1 Pipeline Adaptativo

O pipeline de CI/CD para sistemas com IA deve ser mais rigoroso e mais flexível simultaneamente:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│              PIPELINE CI/CD PARA SISTEMAS COM IA                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TRIGGER: Pull Request com código (humano ou IA)                            │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 1: TRIAGEM DE ORIGEM                                       │   │
│  │ ├── Identificar origem do código (humano/IA/misto)                 │   │
│  │ ├── Aplicar perfil de qualidade apropriado                         │   │
│  │ └── Marcar para auditoria se origem = IA                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 2: VALIDAÇÃO DE ESPECIFICAÇÃO                              │   │
│  │ ├── Especificação formal existe?                                   │   │
│  │ ├── Invariantes documentados?                                      │   │
│  │ └── Critérios de aceitação mensuráveis?                            │   │
│  │ [BLOQUEIA se especificação inadequada]                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 3: VERIFICAÇÃO SINTÁTICA E ESTÁTICA                        │   │
│  │ ├── Linting e formatação                                           │   │
│  │ ├── Análise de complexidade                                        │   │
│  │ ├── Detecção de dependências alucinadas                            │   │
│  │ ├── Verificação de APIs obsoletas                                  │   │
│  │ └── Scan de segurança estática (SAST)                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 4: TESTES DE DETERMINISMO                                  │   │
│  │ ├── Testes idempotentes (múltiplas execuções)                      │   │
│  │ ├── Detecção de comportamento estocástico                          │   │
│  │ └── Validação de consistência de saída                             │   │
│  │ [ESPECÍFICO PARA CÓDIGO GERADO]                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 5: TESTES FUNCIONAIS                                       │   │
│  │ ├── Testes unitários                                               │   │
│  │ ├── Testes de integração                                           │   │
│  │ ├── Testes de contrato (contract tests)                            │   │
│  │ └── Property-based testing                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 6: TESTES DE CARGA E PERFORMANCE                           │   │
│  │ ├── Benchmark de performance                                       │   │
│  │ ├── Testes de carga (load testing)                                 │   │
│  │ └── Detecção de regressões de performance                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 7: ANÁLISE DE SEGURANÇA DINÂMICA                           │   │
│  │ ├── DAST (Dynamic Application Security Testing)                    │   │
│  │ ├── Testes de injeção em tempo de execução                         │   │
│  │ └── Verificação de sanitização de inputs                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 8: APROVAÇÃO DE CURADORIA                                  │   │
│  │ ├── Code review obrigatório para código de IA                      │   │
│  │ ├── Checklist de qualidade assinado                                │   │
│  │ └── Documentação de decisões                                       │   │
│  │ [GATE HUMANO MANDATÓRIO]                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 9: DEPLOYMENT EM AMBIENTE DE STAGING                       │   │
│  │ ├── Deployment automatizado                                        │   │
│  │ ├── Smoke tests                                                    │   │
│  │ └── Testes de sanidade em ambiente real                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 10: MONITORAMENTO DE CANÁRIO (OPCIONAL)                   │   │
│  │ ├── Liberação para subconjunto de usuários                         │   │
│  │ ├── Métricas de comportamento                                      │   │
│  │ └── Rollback automático em anomalias                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│        │                                                                    │
│        ▼                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ESTÁGIO 11: PRODUÇÃO                                               │   │
│  │ ├── Deployment para produção                                       │   │
│  │ ├── Monitoramento contínuo                                         │   │
│  │ └── Alertas para comportamento anômalo                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.1.2 Perfis de Qualidade por Origem

Diferentes origens de código requerem diferentes níveis de rigor:

| Origem | Perfil de Qualidade | Gates Especiais |
|--------|---------------------|-----------------|
| **Código Humano** | Padrão tradicional | Revisão por pares |
| **Código IA (Assistido)** | Rigor aumentado | Verificação de especificação |
| **Código IA (Autônomo)** | Rigor máximo | Múltiplas revisões, testes estatísticos |
| **Código Misto** | Por componente | Identificação de origem por função |

```yaml
# Configuração de perfis de qualidade
quality_profiles:
  human_written:
    required_reviewers: 1
    min_test_coverage: 70
    sast_required: true
    dast_required: false
    
  ai_assisted:
    required_reviewers: 1
    min_test_coverage: 80
    specification_required: true
    hallucination_check: true
    sast_required: true
    dast_required: true
    
  ai_autonomous:
    required_reviewers: 2  # Mínimo 2 revisores
    min_test_coverage: 90
    specification_required: true
    hallucination_check: true
    determinism_tests: true
    statistical_tests: true
    sast_required: true
    dast_required: true
    canary_deployment: true
```

---

## 4.2 Testes para Componentes Não-Determinísticos

### 4.2.1 O Desafio do Não-Determinismo

Código gerado por IA pode exibir comportamento estocástico quando:
- Interage com outros componentes de IA
- Utiliza randomização interna
- Depende de contextos variáveis
- Possui race conditions sutis

### 4.2.2 Testes Estatísticos

Para componentes com comportamento probabilístico, testes tradicionais (pass/fail) são insuficientes:

```python
import numpy as np
from scipy import stats

class StatisticalTestSuite:
    """
    Testes estatísticos para componentes não-determinísticos.
    """
    
    def test_output_distribution(self, component, input_data, n_samples=1000):
        """
        Verifica se distribuição de saídas está dentro de parâmetros aceitáveis.
        """
        outputs = [component.process(input_data) for _ in range(n_samples)]
        
        # Teste de normalidade (se aplicável)
        statistic, p_value = stats.shapiro(outputs[:500])  # Limite de amostra
        
        # Distribuição não deve ser extremamente não-normal
        assert p_value > 0.01, "Distribuição de saídas anômala"
        
        # Variância não deve ser excessiva
        cv = np.std(outputs) / np.mean(outputs)  # Coeficiente de variação
        assert cv < 0.1, f"Alta variabilidade: CV={cv}"
        
        return {
            'mean': np.mean(outputs),
            'std': np.std(outputs),
            'cv': cv,
            'confidence_interval': stats.t.interval(
                0.95, len(outputs)-1, 
                loc=np.mean(outputs), 
                scale=stats.sem(outputs)
            )
        }
    
    def test_consistency_rate(self, component, input_data, min_consistency=0.95):
        """
        Verifica taxa de consistência do componente.
        """
        n_trials = 100
        results = [component.process(input_data) for _ in range(n_trials)]
        
        # Para saídas discretas
        most_common = max(set(results), key=results.count)
        consistency_rate = results.count(most_common) / len(results)
        
        assert consistency_rate >= min_consistency, \
            f"Taxa de consistência {consistency_rate} abaixo do mínimo {min_consistency}"
        
        return consistency_rate
    
    def test_no_systematic_bias(self, component, input_data):
        """
        Verifica ausência de viés sistemático ao longo do tempo.
        """
        batch1 = [component.process(input_data) for _ in range(100)]
        batch2 = [component.process(input_data) for _ in range(100)]
        
        # Teste t de Student para diferença de médias
        t_stat, p_value = stats.ttest_ind(batch1, batch2)
        
        # Não deve haver diferença significativa entre batches
        assert p_value > 0.05, "Possível drift ou viés detectado"
```

### 4.2.3 Testes de Idempotência

Componentes devem produzir resultados consistentes quando reexecutados:

```python
def test_idempotency(component, test_input):
    """
    Verifica se múltiplas execuções com mesma entrada produzem
    resultados equivalentes.
    """
    results = []
    for _ in range(10):
        result = component.process(test_input)
        results.append(result)
    
    # Todos os resultados devem ser idênticos (determinístico)
    # ou estatisticamente equivalente (não-determinístico)
    if is_deterministic_component(component):
        assert all(r == results[0] for r in results), \
            "Componente determinístico produziu saídas diferentes"
    else:
        # Para componentes não-determinísticos, verificar consistência estatística
        assert statistical_equivalence(results), \
            "Componente não-determinístico mostrou variação excessiva"
```

### 4.2.4 Property-Based Testing para Não-Determinismo

```python
from hypothesis import given, settings, strategies as st
import statistics

@given(st.data())
@settings(max_examples=100, deadline=None)
def test_classifier_consistency(data):
    """
    Classificador deve ser consistente para entradas similares.
    """
    # Gerar entrada base
    base_input = data.draw(st.text(min_size=10, max_size=100))
    
    # Executar múltiplas vezes
    predictions = [classifier.predict(base_input) for _ in range(20)]
    
    # Modo (classe mais frequente) deve aparecer com alta frequência
    mode_prediction = statistics.mode(predictions)
    mode_frequency = predictions.count(mode_prediction) / len(predictions)
    
    assert mode_frequency >= 0.8, \
        f"Classificador inconsistente: modo {mode_frequency}"
```

---

## 4.3 Monitoramento e Observabilidade

### 4.3.1 Métricas Específicas para Sistemas com IA

Além de métricas tradicionais (latência, throughput, error rate):

| Métrica | Descrição | Alerta |
|---------|-----------|--------|
| **Prediction Drift** | Mudança na distribuição de previsões | > 10% de variação |
| **Confidence Score** | Nível de confiança de componentes de IA | < threshold |
| **Fallback Rate** | Taxa de fallback para modos determinísticos | > 5% |
| **Anomaly Rate** | Detecção de comportamentos fora do padrão | > 1% |
| **Hallucination Rate** | Ocorrências de saídas inválidas/plausíveis | > 0.1% |

```python
class AIMonitoringMetrics:
    """
    Métricas de monitoramento para componentes de IA.
    """
    
    def __init__(self):
        self.prediction_distribution = Histogram(
            'ai_prediction_distribution',
            'Distribuição de previsões',
            buckets=[...]
        )
        self.confidence_scores = Gauge(
            'ai_confidence_score',
            'Nível de confiança das previsões'
        )
        self.fallback_counter = Counter(
            'ai_fallback_total',
            'Total de fallbacks para modo determinístico'
        )
        self.anomaly_detector = AnomalyDetector(
            threshold=3.0,  # Desvios padrão
            window_size=100
        )
    
    def record_prediction(self, prediction, confidence, input_hash):
        """
        Registra uma previsão para monitoramento.
        """
        self.prediction_distribution.observe(prediction)
        self.confidence_scores.set(confidence)
        
        # Detectar anomalias
        if self.anomaly_detector.is_anomaly(prediction):
            alert.send(f"Anomalia detectada: input={input_hash}")
```

### 4.3.2 Distributed Tracing para Sistemas Híbridos

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

class TracedAIComponent:
    """
    Componente de IA com tracing distribuído.
    """
    
    @tracer.start_as_current_span("ai_component_process")
    def process(self, input_data):
        current_span = trace.get_current_span()
        
        # Adicionar atributos específicos de IA
        current_span.set_attribute("ai.model_version", self.model_version)
        current_span.set_attribute("ai.temperature", self.temperature)
        current_span.set_attribute("input.size", len(input_data))
        
        # Executar componente
        result = self.model.predict(input_data)
        
        # Registrar metadados de saída
        current_span.set_attribute("output.confidence", result.confidence)
        current_span.set_attribute("output.size", len(result.data))
        
        if result.confidence < 0.7:
            current_span.add_event(
                "low_confidence_prediction",
                {"confidence": result.confidence}
            )
        
        return result
```

### 4.3.3 Logging Estruturado para Auditabilidade

```python
import structlog

logger = structlog.get_logger()

class AILogger:
    """
    Logging estruturado para operações de IA.
    """
    
    def log_generation(self, prompt, context, output, model_info):
        """
        Registra uma operação de geração.
        """
        logger.info(
            "ai_code_generation",
            prompt_hash=hash(prompt),
            context_version=context.version,
            output_hash=hash(output),
            model_name=model_info.name,
            model_version=model_info.version,
            temperature=model_info.temperature,
            tokens_used=model_info.tokens,
            generation_time_ms=model_info.latency,
            timestamp=datetime.utcnow().isoformat()
        )
    
    def log_verification(self, code_hash, checks_results, curator_id):
        """
        Registra resultados de verificação.
        """
        logger.info(
            "code_verification",
            code_hash=code_hash,
            syntactic_pass=checks_results.syntactic,
            semantic_pass=checks_results.semantic,
            behavioral_pass=checks_results.behavioral,
            security_pass=checks_results.security,
            curator_id=curator_id,
            verification_time_ms=checks_results.duration,
            timestamp=datetime.utcnow().isoformat()
        )
```

---

## 4.4 Estratégias de Rollback

### 4.4.1 Rollback Rápido

Sistemas com código de IA precisam de mecanismos de rollback mais ágeis:

```python
class FastRollbackManager:
    """
    Gerenciamento de rollback para código gerado por IA.
    """
    
    def __init__(self):
        self.deployment_history = []
        self.health_checks = HealthCheckSuite()
    
    def deploy_with_rollback(self, new_version, rollback_threshold=30):
        """
        Deploy com rollback automático em caso de anomalias.
        
        Args:
            new_version: Versão a ser deployada
            rollback_threshold: Segundos para avaliação antes de confirmar
        """
        previous_version = self.get_current_version()
        
        try:
            # Deploy canário (pequena porcentagem)
            self.deploy_canary(new_version, percentage=5)
            
            # Observar por período de avaliação
            time.sleep(rollback_threshold)
            
            # Verificar métricas
            health = self.health_checks.evaluate()
            
            if health.status == 'HEALTHY':
                # Rollout gradual
                self.gradual_rollout(new_version, steps=[10, 25, 50, 100])
                self.deployment_history.append({
                    'version': new_version,
                    'status': 'SUCCESS',
                    'timestamp': datetime.utcnow()
                })
            else:
                # Rollback automático
                self.rollback(previous_version)
                self.deployment_history.append({
                    'version': new_version,
                    'status': 'ROLLED_BACK',
                    'reason': health.issues,
                    'timestamp': datetime.utcnow()
                })
                raise DeploymentFailed(f"Rollback devido a: {health.issues}")
                
        except Exception as e:
            # Rollback de emergência
            self.rollback(previous_version)
            raise
    
    def rollback(self, target_version):
        """
        Executa rollback para versão anterior.
        """
        logger.critical("Initiating rollback", target_version=target_version)
        
        # 1. Parar novas requisições
        self.drain_connections()
        
        # 2. Restaurar versão anterior
        self.deploy_immediate(target_version)
        
        # 3. Verificar saúde após rollback
        if not self.health_checks.verify():
            alert.critical("Rollback failed - manual intervention required")
        
        logger.critical("Rollback completed", target_version=target_version)
```

### 4.4.2 Feature Flags para Código de IA

```python
class AIFeatureFlags:
    """
    Feature flags específicos para funcionalidades com IA.
    """
    
    def __init__(self, feature_flag_service):
        self.flags = feature_flag_service
    
    def is_ai_component_enabled(self, component_id, user_context=None):
        """
        Verifica se componente de IA está habilitado.
        
        Estratégias:
        - Gradual rollout por usuário
        - Canary por região
        - Kill switch imediato
        """
        # Kill switch global
        if self.flags.is_disabled(f"ai.{component_id}.global"):
            return False
        
        # Verificação por usuário (gradual rollout)
        if user_context:
            user_hash = hash(user_context.user_id)
            rollout_percentage = self.flags.get_value(
                f"ai.{component_id}.rollout", 
                default=0
            )
            
            if (user_hash % 100) >= rollout_percentage:
                return False
        
        return True
    
    def emergency_disable(self, component_id):
        """
        Desabilita componente de IA imediatamente (kill switch).
        """
        self.flags.disable(f"ai.{component_id}.global")
        alert.send(f"AI component {component_id} disabled via emergency switch")
```

---

## 4.5 Configuração de Pipeline como Código

### 4.5.1 GitHub Actions para Código de IA

```yaml
# .github/workflows/ai-code-pipeline.yml
name: AI-Generated Code CI/CD

on:
  pull_request:
    paths:
      - 'src/**'
      - 'ai-generated/**'

env:
  PYTHON_VERSION: '3.11'
  NODE_VERSION: '18'

jobs:
  # Job 1: Triagem de origem
  origin-triage:
    runs-on: ubuntu-latest
    outputs:
      code_origin: ${{ steps.triage.outputs.origin }}
      quality_profile: ${{ steps.triage.outputs.profile }}
    steps:
      - uses: actions/checkout@v4
      
      - name: Identify Code Origin
        id: triage
        run: |
          if git log --format=%B -n 1 | grep -q "\[AI-GENERATED\]"; then
            echo "origin=ai" >> $GITHUB_OUTPUT
            echo "profile=ai_autonomous" >> $GITHUB_OUTPUT
          elif git diff --name-only HEAD~1 | xargs grep -l "@generated" 2>/dev/null; then
            echo "origin=ai" >> $GITHUB_OUTPUT
            echo "profile=ai_assisted" >> $GITHUB_OUTPUT
          else
            echo "origin=human" >> $GITHUB_OUTPUT
            echo "profile=human" >> $GITHUB_OUTPUT
          fi

  # Job 2: Validação de especificação
  specification-check:
    needs: origin-triage
    runs-on: ubuntu-latest
    if: needs.origin-triage.outputs.code_origin == 'ai'
    steps:
      - uses: actions/checkout@v4
      
      - name: Check Specification Exists
        run: |
          for file in $(git diff --name-only HEAD~1 | grep "\.py$"); do
            spec_file="specs/$(basename $file .py).md"
            if [ ! -f "$spec_file" ]; then
              echo "❌ Missing specification for $file"
              exit 1
            fi
          done
          echo "✅ All specifications present"

  # Job 3: Verificação sintática
  syntactic-checks:
    needs: [origin-triage, specification-check]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Install dependencies
        run: pip install pylint mypy bandit
      
      - name: Pylint
        run: pylint src/ --fail-under=8.0
      
      - name: MyPy Type Check
        run: mypy src/ --strict
      
      - name: Security Scan (Bandit)
        run: bandit -r src/ -f json -o bandit-report.json || true
      
      - name: Check for Hallucinated Dependencies
        run: python scripts/verify_imports.py

  # Job 4: Testes de determinismo
  determinism-tests:
    needs: origin-triage
    runs-on: ubuntu-latest
    if: needs.origin-triage.outputs.code_origin == 'ai'
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Determinism Tests
        run: |
          pytest tests/determinism/ \
            -v \
            --tb=short

  # Job 5: Testes funcionais
  functional-tests:
    needs: syntactic-checks
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: ${{ env.PYTHON_VERSION }}
      
      - name: Run Unit Tests
        run: |
          pytest tests/unit/ \
            --cov=src \
            --cov-report=xml \
            --cov-fail-under=80
      
      - name: Run Integration Tests
        run: pytest tests/integration/ -v
      
      - name: Property-Based Tests
        run: pytest tests/property/ -v --hypothesis-profile=ci

  # Job 6: Análise de segurança
  security-analysis:
    needs: functional-tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
      
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v2

  # Job 7: Revisão obrigatória (gate humano)
  human-review:
    needs: [security-analysis, determinism-tests]
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Await Manual Approval
        run: |
          echo "⏳ Aguardando aprovação de curadoria..."
          echo "Requisitos para aprovação:"
          echo "  - Code review por mínimo 2 revisores"
          echo "  - Checklist de qualidade assinado"
          echo "  - Testes passando"

  # Job 8: Deploy
  deploy:
    needs: human-review
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Staging
        run: ./scripts/deploy.sh staging
      
      - name: Smoke Tests
        run: ./scripts/smoke_tests.sh
      
      - name: Deploy to Production (Canary)
        run: ./scripts/deploy.sh production --canary=5
      
      - name: Monitor Canary
        run: |
          sleep 300  # 5 minutos de observação
          ./scripts/check_canary_health.sh
      
      - name: Full Rollout
        run: ./scripts/deploy.sh production --full
```

### 4.5.2 Terraform para Infraestrutura de IA

```hcl
# infrastructure/ai-pipeline.tf

# Recursos específicos para pipeline de código de IA

# 1. Bucket para armazenar especificações
resource "aws_s3_bucket" "specifications" {
  bucket = "${var.project}-specifications"
  
  versioning {
    enabled = true
  }
  
  lifecycle_rule {
    id      = "archive-old-versions"
    enabled = true
    
    noncurrent_version_expiration {
      days = 90
    }
  }
}

# 2. Fila para processamento de verificação
resource "aws_sqs_queue" "verification_queue" {
  name                      = "ai-code-verification"
  delay_seconds             = 0
  max_message_size          = 262144
  message_retention_seconds = 86400
  receive_wait_time_seconds = 10
  
  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.verification_dlq.arn
    maxReceiveCount     = 3
  })
}

# 3. Função Lambda para verificação de dependências
resource "aws_lambda_function" "dependency_checker" {
  filename      = "dependency_checker.zip"
  function_name = "ai-dependency-checker"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"
  runtime       = "python3.11"
  timeout       = 60
  memory_size   = 512
  
  environment {
    variables = {
      ALLOWED_PACKAGES_URL = "https://internal.registry/allowed-packages.json"
      PYPI_API_URL        = "https://pypi.org/pypi"
    }
  }
}

# 4. CloudWatch Alarms para monitoramento
resource "aws_cloudwatch_metric_alarm" "ai_component_errors" {
  alarm_name          = "ai-component-error-rate"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = "2"
  metric_name         = "ErrorRate"
  namespace           = "AI/Components"
  period              = "300"
  statistic           = "Average"
  threshold           = "1"
  alarm_description   = "Taxa de erro em componentes de IA acima de 1%"
  
  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]
}
```

---

## Practical Considerations

### Gradual Migration

Organizações com pipelines tradicionais devem migrar gradualmente:

1. **Fase 1**: Adicionar verificação de especificação para código novo
2. **Fase 2**: Implementar testes de determinismo
3. **Fase 3**: Adicionar gates de segurança específicos de IA
4. **Fase 4**: Implementar rollback automático
5. **Fase 5**: Full observability e monitoramento de IA

### Anti-Padrões a Evitar

- **Pipeline muito rígido**: Bloquear todo código de IA sem análise contextual
- **Pipeline muito permissivo**: Aceitar código de IA sem verificações adequadas
- **Ausência de kill switch**: Não ter mecanismo de desabilitar componentes de IA
- **Logging insuficiente**: Falta de trilha de auditoria para debugging

---

## Summary

- **Pipeline Estendido**: 11 estágios incluindo triagem de origem, validação de especificação, testes de determinismo e canary deployment
- **Testes Estatísticos**: Necessários para componentes não-determinísticos (distribuição, consistência, idempotência)
- **Observabilidade**: Métricas específicas (prediction drift, confidence score, hallucination rate)
- **Rollback Rápido**: Mecanismos de rollback automático e kill switches para emergências
- **Feature Flags**: Controle granular de rollout para código de IA
- **Pipeline como Código**: Configuração completa em GitHub Actions e Terraform

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta seção será obsoleta em 36 meses? | Baixa — princípios de CI/CD são estáveis, ferramentas evoluem |
| **Custo de Verificação** | Quanto custa validar quando feita por IA? | Alto — pipeline complexo, múltiplos estágios |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — falhas em produção têm impacto direto |

---

## References

1. DZone. (2026). "Copilot Code and CI/CD: Securing AI-Generated Code". https://dzone.com/articles/copilot-code-and-cicd-securing-ai-generated-code

2. ResearchGate. (2025). "AI-Enhanced Continuous Integration and Deployment (CI/CD)". https://www.researchgate.net/publication/390265851_AI-Enhanced_Continuous_Integration_and_Deployment_CICD

3. JavaPro. (2024). "The AI Mona Lisa Challenge: CI/CD Pipeline Adjustments". https://javapro.io/2024/11/21/the-ai-mona-lisa-challenge-precision-and-security-adjustments-for-your-ci-cd-pipeline/

4. Arbisoft. (2025). "The Dark Side of Vibe-Coding: Debugging, Technical Debt and Security Risks". https://arbisoft.com/blogs/the-dark-side-of-vibe-coding-debugging-technical-debt-and-security-risks

---

*SWEBOK-AI v5.0 — Capítulo 4 — Seção 4: CI/CD para Sistemas com IA*

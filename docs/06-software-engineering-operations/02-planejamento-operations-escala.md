# 6.2 Planejamento de Operations em Escala

## Overview

O planejamento de operations em sistemas que incorporam IA representa um desafio qualitativamente diferente do planejamento tradicional de DevOps. Enquanto operações convencionais podem prever demanda com base em padrões históricos e crescimento linear, sistemas com componentes de IA apresentam **comportamentos emergentes, custos não-lineares e requisitos de infraestrutura dinâmicos** que exigem novas abordagens de planejamento.

A escala em operações de IA não se refere apenas ao volume de requisições ou tamanho da infraestrutura, mas à complexidade de gerenciar múltiplos modelos, prompts versionados, pipelines de dados e sistemas de fallback, tudo isso enquanto se mantém conformidade regulatória e custos sob controle.

> **Princípio Central:** "Planejar operations em escala de IA requer modelagem de incerteza, não apenas projeção de crescimento."

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Modelar capacidade e custos para sistemas com componentes de IA não-determinísticos
2. Projetar arquiteturas de infraestrutura que suportem workloads de IA variáveis
3. Desenvolver planos de contingência para falhas de modelos e serviços de IA
4. Implementar estratégias de multi-region e disaster recovery para sistemas híbridos

## Modelagem de Capacidade para Workloads de IA

### Diferenças Fundamentais na Modelagem de Capacidade

A modelagem tradicional de capacidade assume:
- Demanda previsível baseada em padrões históricos
- Consumo de recursos proporcional à carga
- Comportamento determinístico do sistema
- Custos lineares com volume

Para sistemas com IA, devemos considerar:

| Fator Tradicional | Fator de IA | Impacto no Planejamento |
|-------------------|-------------|-------------------------|
| Latência constante | Latência variável (50-5000ms) | Buffer maior necessário |
| Throughput linear | Throughput limitado por rate limits | Throttling obrigatório |
| Custo por request fixo | Custo por token (variável) | Modelagem por caracter, não request |
| Cache efetivo | Cache limitado (contexto único) | Hit ratio menor |
| Escalabilidade horizontal pura | Escalabilidade híbrida (infra + API externa) | Bottlenecks externos |

### Framework de Modelagem de Capacidade Híbrida

```python
class HybridCapacityModel:
    """
    Modelo de capacidade para sistemas com componentes de IA
    """
    
    def __init__(self, components):
        self.components = components
        self.ai_services = [c for c in components if c.type == 'ai']
        self.traditional_services = [c for c in components if c.type == 'traditional']
        
    def calculate_capacity_requirements(self, traffic_projection):
        """
        Calcula requisitos de capacidade considerando variabilidade de IA
        """
        requirements = CapacityRequirements()
        
        # Componentes tradicionais (modelagem linear)
        for service in self.traditional_services:
            req = self.model_traditional_service(service, traffic_projection)
            requirements.add(req)
        
        # Componentes de IA (modelagem probabilística)
        for service in self.ai_services:
            req = self.model_ai_service(service, traffic_projection)
            requirements.add(req)
        
        return requirements
    
    def model_ai_service(self, service, traffic):
        """
        Modelagem específica para serviços de IA
        """
        # Distribuição de tamanho de prompts (log-normal)
        prompt_size_dist = LogNormalDistribution(
            mean=service.avg_prompt_tokens,
            sigma=service.prompt_variance
        )
        
        # Distribuição de tamanho de respostas
        response_size_dist = LogNormalDistribution(
            mean=service.avg_response_tokens,
            sigma=service.response_variance
        )
        
        # Latência percentil 99 (crítico para SLOs)
        p99_latency = self.calculate_p99_latency(
            service.latency_distribution,
            confidence=0.99
        )
        
        # Rate limiting e throttling
        effective_throughput = min(
            traffic.peak_rps,
            service.rate_limit_rps * 0.8  # 20% buffer
        )
        
        return AIServiceRequirements(
            compute_units=self.calculate_compute_units(
                effective_throughput, prompt_size_dist, response_size_dist
            ),
            memory_gb=self.calculate_memory_requirements(service),
            network_mbps=self.calculate_network_requirements(
                effective_throughput, response_size_dist
            ),
            p99_latency_ms=p99_latency,
            cost_per_1k_requests=self.calculate_cost(
                prompt_size_dist, response_size_dist
            )
        )
```

### Modelagem de Custos de IA

```python
class AICostModel:
    """
    Modelo detalhado de custos para operações de IA
    """
    
    def __init__(self, pricing_config):
        self.pricing = pricing_config
        
    def project_costs(self, usage_forecast, time_horizon_months=12):
        """
        Projeção de custos considerando múltiplos cenários
        """
        scenarios = {
            'conservative': self.calculate_scenario(
                usage_forecast, growth_rate=0.1
            ),
            'expected': self.calculate_scenario(
                usage_forecast, growth_rate=0.3
            ),
            'aggressive': self.calculate_scenario(
                usage_forecast, growth_rate=0.6
            )
        }
        
        return CostProjection(
            scenarios=scenarios,
            confidence_interval=self.calculate_confidence_interval(scenarios),
            recommendations=self.generate_recommendations(scenarios)
        )
    
    def calculate_scenario(self, base_usage, growth_rate):
        """
        Calcula custos para um cenário específico
        """
        monthly_costs = []
        current_usage = base_usage
        
        for month in range(12):
            # Custos de API
            api_cost = self.calculate_api_costs(current_usage)
            
            # Custos de infraestrutura
            infra_cost = self.calculate_infrastructure_costs(current_usage)
            
            # Custos de operações (monitoramento, governança)
            ops_cost = self.calculate_operational_costs(current_usage)
            
            # Custos de fallback (quando IA falha)
            fallback_cost = self.calculate_fallback_costs(current_usage)
            
            monthly_costs.append(MonthlyCost(
                api=api_cost,
                infrastructure=infra_cost,
                operations=ops_cost,
                fallback=fallback_cost,
                total=api_cost + infra_cost + ops_cost + fallback_cost
            ))
            
            # Crescimento composto
            current_usage = current_usage * (1 + growth_rate)
        
        return ScenarioCosts(
            monthly=monthly_costs,
            annual_total=sum(m.total for m in monthly_costs),
            peak_month=max(monthly_costs, key=lambda m: m.total)
        )
```

## Arquitetura de Infraestrutura para Sistemas Híbridos

### Padrões Arquiteturais

#### 1. Arquitetura de Fallback em Camadas

```
┌─────────────────────────────────────────────┐
│           API Gateway                       │
│  (Rate limiting, Auth, Routing)             │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌──────────────────┐
│  Primary AI     │  │  Fallback AI     │
│  (GPT-4, etc)   │  │  (Local model)   │
│                 │  │                  │
│  • Alta qualidade│  │  • Baixa latência│
│  • Alto custo    │  │  • Custo fixo    │
│  • Rate limited  │  │  • Sempre disponível│
└────────┬────────┘  └────────┬─────────┘
         │                    │
         └─────────┬──────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │   Business Logic     │
        │   (Validação,        │
        │    Transformação)    │
        └──────────┬───────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
         ▼                    ▼
┌─────────────────┐  ┌──────────────────┐
│  Deterministic  │  │  Cache Layer     │
│  Fallback       │  │  (Redis, etc)    │
│                 │  │                  │
│  • Regras fixas │  │  • Respostas     │
│  • Zero ML      │  │    frequentes    │
│  • 100% uptime  │  │  • Similaridade  │
└─────────────────┘  └──────────────────┘
```

**Implementação:**

```python
class LayeredFallbackArchitecture:
    """
    Arquitetura de fallback em múltiplas camadas
    """
    
    def __init__(self):
        self.layers = [
            CacheLayer(),           # Camada 0: Cache
            PrimaryAILayer(),       # Camada 1: IA primária
            FallbackAILayer(),      # Camada 2: IA fallback
            DeterministicLayer()    # Camada 3: Fallback determinístico
        ]
        
    def process_request(self, request):
        """
        Processa request tentando cada camada em ordem
        """
        for layer in self.layers:
            try:
                result = layer.process(request)
                
                if result.is_acceptable():
                    # Propagar resultado para camadas superiores (cache)
                    self.propagate_result(request, result, layer)
                    return result
                    
            except LayerUnavailableError:
                self.metrics.record_fallback(layer.name)
                continue
            except LayerQualityError as e:
                self.metrics.record_quality_failure(layer.name, e.quality_score)
                continue
        
        raise AllLayersFailedError("Todas as camadas falharam")
    
    def propagate_result(self, request, result, source_layer):
        """
        Propaga resultado para camadas superiores (ex: cache)
        """
        for layer in self.layers:
            if layer.priority < source_layer.priority:
                layer.cache_result(request, result)
```

#### 2. Arquitetura de Circuit Breaker Distribuído

```python
class DistributedCircuitBreaker:
    """
    Circuit breaker que funciona em ambiente distribuído
    """
    
    def __init__(self, redis_client, service_name):
        self.redis = redis_client
        self.service_name = service_name
        self.failure_threshold = 5
        self.recovery_timeout = 60
        
    def call(self, func, *args, **kwargs):
        """
        Executa função com circuit breaker distribuído
        """
        state = self.get_state()
        
        if state == CircuitState.OPEN:
            last_failure = self.get_last_failure_time()
            if time.time() - last_failure < self.recovery_timeout:
                raise CircuitOpenError(f"Circuito aberto para {self.service_name}")
            else:
                # Tentar half-open
                state = CircuitState.HALF_OPEN
                self.set_state(state)
        
        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise
    
    def get_state(self):
        """Obtém estado do circuit breaker do Redis"""
        state = self.redis.get(f"cb:{self.service_name}:state")
        return CircuitState(state.decode()) if state else CircuitState.CLOSED
    
    def on_failure(self):
        """Registra falha no Redis"""
        key = f"cb:{self.service_name}:failures"
        failures = self.redis.incr(key)
        
        if failures == 1:
            # Primeira falha, setar TTL
            self.redis.expire(key, 300)
        
        if failures >= self.failure_threshold:
            self.set_state(CircuitState.OPEN)
            self.set_last_failure_time(time.time())
```

#### 3. Arquitetura de Queue-Based Processing

```python
class QueueBasedAIProcessing:
    """
    Processamento baseado em filas para workloads de IA
    """
    
    def __init__(self):
        self.priority_queue = PriorityQueue()
        self.workers = []
        self.rate_limiter = TokenBucketRateLimiter()
        
    def enqueue_request(self, request, priority=Priority.NORMAL):
        """
        Adiciona request à fila com prioridade
        """
        job = AIJob(
            request=request,
            priority=priority,
            enqueued_at=time.time(),
            max_wait_time=self.get_max_wait_time(priority)
        )
        
        self.priority_queue.put((priority.value, job))
        
        return JobReference(
            job_id=job.id,
            estimated_wait=self.estimate_wait_time(priority)
        )
    
    def process_queue(self):
        """
        Processa fila respeitando rate limits
        """
        while True:
            # Aguardar tokens disponíveis
            self.rate_limiter.acquire()
            
            # Obter próximo job
            _, job = self.priority_queue.get()
            
            # Verificar se não expirou
            if time.time() - job.enqueued_at > job.max_wait_time:
                self.handle_timeout(job)
                continue
            
            # Processar
            try:
                result = self.process_with_ai(job.request)
                self.complete_job(job, result)
            except Exception as e:
                self.handle_failure(job, e)
    
    def get_max_wait_time(self, priority):
        """
        Tempo máximo de espera baseado na prioridade
        """
        wait_times = {
            Priority.CRITICAL: 5,      # 5 segundos
            Priority.HIGH: 30,         # 30 segundos
            Priority.NORMAL: 120,      # 2 minutos
            Priority.LOW: 600          # 10 minutos
        }
        return wait_times.get(priority, 120)
```

## Planejamento de Contingência e Disaster Recovery

### Estratégias de Multi-Region

```python
class MultiRegionStrategy:
    """
    Estratégias de deployment multi-region para sistemas de IA
    """
    
    STRATEGIES = {
        'active_active': ActiveActiveStrategy(),
        'active_passive': ActivePassiveStrategy(),
        'partitioned': PartitionedStrategy()
    }
    
    def __init__(self, strategy_type, regions):
        self.strategy = self.STRATEGIES[strategy_type]
        self.regions = regions
        
    def deploy(self, application):
        """
        Deploy em múltiplas regiões
        """
        deployments = []
        
        for region in self.regions:
            deployment = self.strategy.deploy_in_region(
                application, region
            )
            deployments.append(deployment)
        
        # Configurar roteamento
        self.configure_routing(deployments)
        
        return deployments
    
    def handle_region_failure(self, failed_region):
        """
        Lida com falha de região
        """
        return self.strategy.handle_failure(failed_region, self.regions)


class ActiveActiveStrategy:
    """
    Todas as regiões ativas simultaneamente
    """
    
    def deploy_in_region(self, app, region):
        deployment = app.deploy(region)
        deployment.traffic_percentage = 100 / len(self.regions)
        return deployment
    
    def handle_failure(self, failed_region, all_regions):
        """
        Redistribui tráfego para regiões saudáveis
        """
        healthy_regions = [r for r in all_regions if r != failed_region]
        
        for region in healthy_regions:
            region.traffic_percentage = 100 / len(healthy_regions)
        
        return FailoverResult(
            failed_region=failed_region,
            healthy_regions=healthy_regions,
            recovery_time_estimate="instantâneo"
        )


class PartitionedStrategy:
    """
    Dados particionados por região
    """
    
    def deploy_in_region(self, app, region):
        deployment = app.deploy(region)
        deployment.data_partition = self.assign_partition(region)
        return deployment
    
    def handle_failure(self, failed_region, all_regions):
        """
        Promove réplica em outra região
        """
        standby_region = self.select_standby(failed_region)
        
        # Promover standby para primário
        standby_region.promote_to_primary(
            data_partition=failed_region.data_partition
        )
        
        return FailoverResult(
            failed_region=failed_region,
            promoted_region=standby_region,
            recovery_time_estimate="5-10 minutos"
        )
```

### Plano de Disaster Recovery para IA

```python
class AIDisasterRecoveryPlan:
    """
    Plano de DR específico para componentes de IA
    """
    
    def __init__(self):
        self.recovery_procedures = {
            'model_unavailable': self.recover_model_unavailable,
            'api_outage': self.recover_api_outage,
            'data_corruption': self.recover_data_corruption,
            'hallucination_spike': self.recover_hallucination_spike,
            'prompt_injection_attack': self.recover_prompt_injection
        }
    
    def execute_recovery(self, incident_type, scope):
        """
        Executa procedimento de recovery baseado no tipo de incidente
        """
        procedure = self.recovery_procedures.get(incident_type)
        
        if not procedure:
            raise UnknownIncidentTypeError(incident_type)
        
        return procedure(scope)
    
    def recover_model_unavailable(self, scope):
        """
        Recovery quando modelo principal fica indisponível
        """
        steps = [
            # 1. Ativar fallback imediato
            RecoveryStep(
                action="activate_fallback_model",
                target=scope.affected_services,
                expected_duration="30s"
            ),
            
            # 2. Escalar time de operações
            RecoveryStep(
                action="page_oncall_engineer",
                target="sre_team",
                expected_duration="5m"
            ),
            
            # 3. Verificar status do provider
            RecoveryStep(
                action="check_provider_status",
                target=scope.primary_provider,
                expected_duration="2m"
            ),
            
            # 4. Se provider down, ativar multi-provider
            RecoveryStep(
                action="enable_multi_provider",
                target=scope.affected_services,
                condition="provider_status == 'down'",
                expected_duration="5m"
            )
        ]
        
        return RecoveryPlan(
            incident_type="model_unavailable",
            steps=steps,
            estimated_recovery_time="10-15 minutos",
            business_impact="Degradação de qualidade, mas serviço disponível"
        )
    
    def recover_hallucination_spike(self, scope):
        """
        Recovery quando há spike de alucinações
        """
        steps = [
            # 1. Reduzir temperatura imediatamente
            RecoveryStep(
                action="reduce_temperature",
                target=scope.affected_models,
                params={"temperature": 0.1},
                expected_duration="instantâneo"
            ),
            
            # 2. Aumentar validação
            RecoveryStep(
                action="enable_strict_validation",
                target=scope.affected_services,
                expected_duration="1m"
            ),
            
            # 3. Reverter para versão anterior do prompt
            RecoveryStep(
                action="rollback_prompt",
                target=scope.affected_models,
                to_version="last_known_good",
                expected_duration="2m"
            ),
            
            # 4. Análise de causa raiz
            RecoveryStep(
                action="analyze_root_cause",
                target="mlops_team",
                expected_duration="30m"
            )
        ]
        
        return RecoveryPlan(
            incident_type="hallucination_spike",
            steps=steps,
            estimated_recovery_time="5 minutos (mitigação), 30 minutos (resolução)",
            business_impact="Latência aumentada, qualidade reduzida temporariamente"
        )
```

## Practical Considerations

### Planejamento de Capacidade na Prática

**Cenário: Startup SaaS com Feature de IA**

```python
# Projeção de crescimento para 12 meses
projection = CapacityProjection(
    current_users=10000,
    monthly_growth_rate=0.25,  # 25% ao mês
    ai_feature_adoption=0.40,   # 40% dos usuários usam feature de IA
    avg_requests_per_user_per_day=5,
    avg_tokens_per_request=1500
)

# Cálculo de capacidade
model = HybridCapacityModel(components=[
    Service(type='traditional', name='api', rps=1000),
    Service(type='ai', name='gpt4', rps=100, rate_limit_rps=50)
])

requirements = model.calculate_capacity_requirements(projection)

# Resultado esperado:
# - Mês 6: 50K usuários → 100K requests/dia → $5K/mês em API
# - Mês 12: 150K usuários → 300K requests/dia → $15K/mês em API
# - Bottleneck: Rate limit de 50 RPS exige queueing + caching agressivo
```

### Trade-offs de Arquitetura

| Arquitetura | Prós | Contras | Quando Usar |
|-------------|------|---------|-------------|
| **Layered Fallback** | Resiliência máxima | Complexidade, latência | Sistemas críticos |
| **Circuit Breaker** | Fail fast, proteção | Pode rejeitar tráfego legítimo | APIs externas |
| **Queue-Based** | Rate limiting natural | Latência imprevisível | Workloads batch |
| **Multi-Region Active-Active** | Alta disponibilidade | Custo 2x, consistência eventual | Global, crítico |
| **Multi-Region Partitioned** | Custo otimizado | Failover manual | Dados regionais |

### Checklist de Planejamento

```python
class OperationsPlanningChecklist:
    """
    Checklist completo para planejamento de operations
    """
    
    ITEMS = [
        # Capacidade
        ("capacity_model", "Modelo de capacidade validado"),
        ("cost_projections", "Projeções de custo em 3 cenários"),
        ("bottleneck_analysis", "Análise de gargalos identificada"),
        ("scaling_plan", "Plano de escalabilidade documentado"),
        
        # Arquitetura
        ("fallback_defined", "Estratégias de fallback definidas"),
        ("circuit_breakers", "Circuit breakers configurados"),
        ("caching_strategy", "Estratégia de cache implementada"),
        ("rate_limiting", "Rate limiting em todas as camadas"),
        
        # DR
        ("dr_plan", "Plano de disaster recovery documentado"),
        ("backup_strategy", "Estratégia de backup testada"),
        ("failover_tested", "Failover testado em produção"),
        ("rto_defined", "RTO/RPO definidos e aceitos"),
        
        # Operações
        ("runbooks", "Runbooks para incidentes criados"),
        ("monitoring_dashboards", "Dashboards de monitoramento prontos"),
        ("alerting_rules", "Regras de alerta configuradas"),
        ("oncall_rotation", "Escala de plantão definida")
    ]
    
    def evaluate(self):
        """
        Avalia readiness do planejamento
        """
        results = {}
        for item_id, description in self.ITEMS:
            results[item_id] = self.check_item(item_id)
        
        passed = sum(1 for r in results.values() if r)
        
        return PlanningAssessment(
            score=passed / len(self.ITEMS),
            ready_for_production=passed == len(self.ITEMS),
            gaps=[desc for (item_id, desc), result in zip(self.ITEMS, results.values()) if not result]
        )
```

## Summary

- **Modelagem de capacidade híbrida:** Requer considerar variabilidade de IA, não apenas throughput
- **Custos não-lineares:** Modelos de custo devem considerar tokens, não apenas requests
- **Arquiteturas resilientes:** Fallback em camadas, circuit breakers e queues são essenciais
- **Multi-region:** Estratégias devem considerar latência de APIs de IA e consistência de dados
- **DR específico:** Incidentes de IA (alucinações, modelos indisponíveis) requerem procedimentos específicos
- **Planejamento contínuo:** Capacidade e custos devem ser revisados mensalmente devido à volatilidade

## References

1. Allspaw, J. (2012). *Web Operations: Keeping the Data On Time*. O'Reilly Media.

2. Nygard, M. T. (2018). *Release It!: Design and Deploy Production-Ready Software* (2nd ed.). Pragmatic Bookshelf.

3. Beyer, B., et al. (2018). *The Site Reliability Workbook: Practical Ways to Implement SRE*. O'Reilly Media.

4. Kreps, J. (2014). *I Heart Logs: Event Data, Stream Processing, and Data Integration*. O'Reilly Media.

5. Gartner (2025). *Cloud Infrastructure and Platform Services: Planning for AI Workloads*. Gartner Research.

6. AWS (2025). *Well-Architected Framework: Machine Learning Lens*. AWS Documentation.

7. Microsoft Azure (2025). *Azure Architecture Center: AI Workloads*. Microsoft Documentation.

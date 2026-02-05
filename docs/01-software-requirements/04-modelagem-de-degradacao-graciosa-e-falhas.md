---
title: 04 - Modelagem de Degradação Graciosa e Falhas
created_at: '2025-01-31'
tags: [degradacao-graciosa, falhas, resiliencia, circuit-breaker, fallback, sistemas-distribuidos]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Modelagem de Degradação Graciosa e Falhas

## Overview

A modelagem de degradação graciosa e falhas é uma disciplina crítica na
engenharia de sistemas com IA. Enquanto sistemas tradicionais podem falhar de
forma binária (funciona/não funciona), sistemas com LLMs apresentam modos de
falha mais sutis e complexos: alucinações, degradação de qualidade,
inconsistências contextuais e vieses emergentes.

Esta seção apresenta técnicas para projetar sistemas que mantêm funcionalidade
essencial mesmo quando componentes de IA falham ou operam abaixo de parâmetros
aceitáveis, garantindo resiliência e confiabilidade.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Compreender os modos de falha específicos de sistemas com LLMs
2. Projetar estratégias de degradação graciosa em múltiplos níveis
3. Implementar padrões de resiliência como Circuit Breaker e Fallback
4. Modelar e mitigar falhas em cadeia (cascading failures)
5. Estabelecer métricas e SLAs para operação degradada

## Modos de Falha em Sistemas com IA

### Taxonomia de Falhas (modelo mental)

Uma taxonomia pratica de modos de falha em sistemas com IA pode ser organizada
em quatro categorias:

**Falhas de Segurança (Safety)**:

- Alucinações factuais
- Geração de conteúdo prejudicial
- Vieses em respostas
- Violação de políticas de uso

**Falhas de Segurança (Security)**:

- Prompt injection
- Jailbreaking
- Exfiltração de dados
- Poisoning de memória

**Falhas de Performance**:

- Latência excessiva
- Timeout de inferência
- Degradação de qualidade sob carga
- colapso de performance por pressao de custo (por exemplo, throttling, limites
  de quota)

**Falhas Operacionais**:

- Indisponibilidade de APIs de LLM
- Version drift (mudanças no modelo)
- degradacao por fronteiras de contexto (contexto insuficiente, incoerente ou
  desatualizado)
- Multi-step reasoning drift

### 4.1.2 Falhas Específicas de LLMs

**Alucinações**:

- Geração de informações falsas apresentadas como fatos
- Criação de referências inexistentes
- Invenção de dados ou estatísticas

**Degradação Contextual**:

- Perda de coerência em conversas longas
- Inconsistências em respostas relacionadas
- Esquecimento de constraints estabelecidas

**Raciocínio Defeituoso**:

- Erros em cadeias de pensamento (chain-of-thought)
- Falhas em raciocínio multi-etapas
- Conclusões lógicas incorretas

**Vieses Emergentes**:

- Discriminação em recomendações
- Estereótipos em geração de conteúdo
- Desbalanceamento em análises

### 4.1.3 Falhas em Cadeia (Cascading Failures)

Em arquiteturas complexas com múltiplos componentes de IA, falhas podem
propagar-se:

```
Serviço A (LLM) falha →
  Serviço B dependente falha →
    Serviço C dependente falha →
      Sistema completo indisponível
```

Fatores que exacerbam falhas em cadeia:

- Dependências síncronas entre serviços
- Falta de timeouts adequados
- Retry agressivo sem backoff
- Recursos compartilhados sem isolamento

## Principios de Degradacao Graciosa

### 4.2.1 Definição e Objetivos

**Degradacao graciosa** e a capacidade de um sistema continuar operando, mesmo
com funcionalidade reduzida, quando componentes falham ou operam abaixo de
parametros aceitaveis.

Objetivos:

1. **Manter Funcionalidade Essencial**: Preservar operações críticas
2. **Prevenir Falhas em Cadeia**: Isolar falhas para não propagar
3. **Manter Experiência do Usuário**: Fornecer respostas úteis mesmo degradadas
4. **Facilitar Recuperação**: Permitir retorno automático à operação normal

### Niveis de Degradacao

Um esquema simples de quatro niveis de degradacao:

| Nível       | Estado                  | Descrição                             |
| ----------- | ----------------------- | ------------------------------------- |
| **Nível 1** | Operação Normal         | Sistema operando com capacidade total |
| **Nível 2** | Funcionalidade Reduzida | Recursos não-críticos desabilitados   |
| **Nível 3** | Modo de Contenção       | Respostas cacheadas/estáticas         |
| **Nível 4** | Modo de Segurança       | Apenas mensagens de erro honestas     |

### 4.2.3 Estratégias por Componente

**Frontend**:

- Desabilitar componentes quebrados
- Fallback para dados cacheados
- Mensagens claras sobre limitações temporárias

**Backend**:

- Bypass de chamadas a LLM quando indisponível
- Uso de modelos menores/mais rápidos
- Respostas baseadas em regras (rule-based)

**Banco de Dados**:

- Leitura de réplicas quando primário indisponível
- Cache distribuído como fallback
- Modo read-only quando necessário

## Padroes de Resiliencia

### 4.3.1 Circuit Breaker

O padrão Circuit Breaker previne chamadas repetidas a componentes falhos:

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN

    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
            else:
                raise CircuitBreakerOpen("Serviço indisponível")

        try:
            result = func(*args, **kwargs)
            self.on_success()
            return result
        except Exception as e:
            self.on_failure()
            raise e

    def on_success(self):
        self.failure_count = 0
        self.state = "CLOSED"

    def on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"
```

**Aplicação em Sistemas com IA**:

- Circuit breaker para APIs de LLM
- Detecção de degradação de qualidade
- Prevenção de custos excessivos com retries

### 4.3.2 Fallback e Graceful Degradation

Estratégias de fallback para componentes de IA:

**Fallback em Camadas (exemplo conceitual)**:

```
Chamada LLM principal
    ↓ (falha ou timeout)
Modelo secundario
    ↓ (falha)
Modelo local menor
    ↓ (falha)
Sistema Baseado em Regras
    ↓ (falha)
Resposta Estática/Cache
```

**Exemplo de Implementação**:

```python
class LLMServiceWithFallback:
    def __init__(self):
        self.providers = [
            PrimaryProvider(),
            SecondaryProvider(),
            LocalProvider(),
            RuleBasedProvider()
        ]

    async def generate(self, prompt, context):
        for provider in self.providers:
            try:
                result = await provider.generate(prompt, context)
                if self.quality_check(result):
                    return result
            except Exception as e:
                logger.warning(f"Provider {provider.name} failed: {e}")
                continue

        return self.static_fallback(prompt)

    def quality_check(self, result):
        """Verifica se a resposta atende critérios mínimos."""
        return (
            result.confidence > MIN_CONFIDENCE and
            result.coherence_score > MIN_COHERENCE and
            not result.contains_hallucination_indicators()
        )
```

### 4.3.3 Bulkhead

O padrão Bulkhead isola falhas em compartimentos separados:

```
┌─────────────────────────────────────┐
│           Sistema Principal          │
├─────────────┬─────────────┬─────────┤
│  Pool A     │   Pool B    │ Pool C  │
│  (Usuários  │  (Análise   │ (Admin) │
│   Premium)  │   de Dados) │         │
├─────────────┴─────────────┴─────────┤
│         Recursos Compartilhados      │
│      (com rate limiting por pool)    │
└─────────────────────────────────────┘
```

**Aplicação**:

- Pools separados para diferentes classes de usuários
- Isolamento de recursos por funcionalidade
- Prevenção de que um usuário consuma todos os recursos

### 4.3.4 Timeout e Retry com Backoff

**Estratégia de Timeout**:

```python
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential

class ResilientLLMClient:
    def __init__(self):
        self.timeout = 30  # segundos
        self.max_retries = 3

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10)
    )
    async def call_llm(self, prompt):
        try:
            return await asyncio.wait_for(
                self.llm.generate(prompt),
                timeout=self.timeout
            )
        except asyncio.TimeoutError:
            logger.error("LLM call timed out")
            raise
        except Exception as e:
            logger.error(f"LLM call failed: {e}")
            raise
```

**Backoff Exponencial**:

- Evita sobrecarga do serviço em recuperação
- Reduz custos com chamadas repetidas
- Melhora chances de sucesso em falhas transitórias

## 4.4 Modelagem de Falhas

### 4.4.1 Failure Mode and Effects Analysis (FMEA)

Aplicação de FMEA para sistemas com IA:

| Componente | Modo de Falha | Efeito               | Severidade | Probabilidade | Detecção | RPN |
| ---------- | ------------- | -------------------- | ---------- | ------------- | -------- | --- |
| LLM API    | Timeout       | Usuário sem resposta | 7          | 5             | 9        | 315 |
| LLM API    | Alucinação    | Informação incorreta | 9          | 6             | 4        | 216 |
| Cache      | Miss          | Latência alta        | 5          | 7             | 8        | 280 |
| Vector DB  | Indisponível  | RAG inoperante       | 6          | 3             | 7        | 126 |

*RPN = Risk Priority Number = Severidade × Probabilidade × Detecção*

### 4.4.2 Fault Tree Analysis (FTA)

Análise de árvore de falhas para identificar combinações que levam a falhas
sistêmicas:

```
                    SISTEMA INDISPONÍVEL
                           |
           ┌───────────────┼───────────────┐
           |               |               |
    TODOS OS LLMs    BANCO DE DADOS   CACHE INDISPONÍVEL
    INDISPONÍVEIS    PRIMÁRIO FALHA    E VAZIO
           |               |
    ┌──────┴──────┐        |
    |             |        |
OpenAI      Anthropic   Réplicas
Falha       Falha       Falham
```

### 4.4.3 Chaos Engineering

Prática de injetar falhas controladas para testar resiliência:

**Experimentos de Chaos para IA**:

- Latência artificial em chamadas de LLM
- Indisponibilidade simulada de APIs
- Degradação de qualidade de respostas
- Exaustão de quota/rate limits
- Corrupção de dados de contexto

**Exemplo de Experimento**:

```python
class LLMChaosExperiment:
    """Simula falhas em componentes de IA."""

    def inject_latency(self, delay_ms=5000):
        """Adiciona latência artificial."""
        pass

    def simulate_hallucination(self, frequency=0.1):
        """Força alucinações em 10% das respostas."""
        pass

    def drop_context(self, percentage=0.5):
        """Remove parte do contexto."""
        pass

    def run_experiment(self):
        """Executa experimento e mede resiliência."""
        metrics = {
            "availability": self.measure_availability(),
            "recovery_time": self.measure_recovery(),
            "degraded_performance": self.measure_degradation()
        }
        return metrics
```

## Metricas e SLAs para Operacao Degradada

### 4.5.1 Métricas de Resiliência

**Métricas de Disponibilidade**:

- Uptime percentual
- Mean Time Between Failures (MTBF)
- Mean Time To Recovery (MTTR)

**Métricas de Qualidade em Degradação**:

- Taxa de fallback utilizado
- Degradação de precisão em modo degradado
- Taxa de aceitação de respostas degradadas

**Métricas de Custo**:

- Custo por requisição em operação normal vs. degradada
- Overhead de infraestrutura de resiliência
- Economia com prevenção de falhas em cadeia

### 4.5.2 Definição de SLAs

**SLA em Multiplos Niveis (exemplo; valores dependem do contexto)**:

| Nível         | Disponibilidade | Latência P95    | Qualidade Mínima |
| ------------- | --------------- | --------------- | ---------------- |
| **Normal**    | alvo definido   | limite definido | minimo definido  |
| **Degradado** | alvo definido   | limite definido | minimo definido  |
| **Crítico**   | alvo definido   | limite definido | minimo definido  |

**SLAs especificos para componentes de IA (exemplos de dimensoes)**:

- taxa de fallback para revisao humana
- limite de indisponibilidade de provedores/servicos
- limites de custo por periodo e por transacao
- limites de degradacao de qualidade (quando mensuravel)

## Practical Considerations

### Quando Implementar Degradação Graciosa

**Obrigatório**:

- Sistemas de produção com usuários pagantes
- Aplicações de missão crítica
- Sistemas com múltiplas dependências de IA
- Aplicações com requisitos regulatórios de disponibilidade

**Recomendado**:

- Qualquer sistema em produção
- Aplicações com custos significativos de downtime
- Sistemas com múltiplos provedores de LLM

**Opcional**:

- Protótipos e MVPs
- Sistemas internos de baixo impacto
- Aplicações com baixa criticidade

### Trade-offs

| Estratégia                    | Pró                           | Contra                              |
| ----------------------------- | ----------------------------- | ----------------------------------- |
| Circuit Breaker               | Prevenção de falhas em cadeia | Complexidade adicional              |
| Fallback em múltiplas camadas | Alta resiliência              | Custo de manutenção                 |
| Cache agressivo               | Baixa latência                | Dados potencialmente desatualizados |
| Modelos locais                | Independência de terceiros    | Qualidade potencialmente inferior   |

### Ferramentas e Frameworks (nao prescritivo)

Use bibliotecas e mecanismos equivalentes no ecossistema da sua
linguagem/plataforma (por exemplo, circuit breaker, retry com backoff, rate
limiting, timeouts e chaos engineering).

## Summary

- Sistemas com IA apresentam modos de falha complexos e sutis
- Degradação graciosa mantém funcionalidade essencial em falhas
- Quatro níveis de degradação: normal, reduzida, contenção e segurança
- Padrões como Circuit Breaker, Fallback e Bulkhead são essenciais
- FMEA e FTA ajudam a modelar e priorizar riscos
- Chaos Engineering valida resiliência em condições reais
- SLAs devem definir expectativas para operação degradada

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                           |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** - Resiliência é cada vez mais crítica                     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Médio** - Pode ser parcialmente automatizado com testes de caos   |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Alta** - Falhas de resiliência podem levar a danos significativos |

## References

1. NEWMAN, S. Building Microservices. 2. ed. Sebastopol: O'Reilly Media, 2021.
2. NIST. Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and
   Mitigations. 2025.

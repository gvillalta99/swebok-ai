---
title: "05. Design de Interfaces e Contratos"
created_at: "2025-01-31"
tags: ["software-design", "interfaces", "contratos", "api", "sistemas-hibridos"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---
# Design de Interfaces e Contratos

## Overview

Em sistemas híbridos humanos-IA, interfaces e contratos assumem um papel crítico: eles são a linha de demarcação entre o determinístico e o probabilístico, entre código escrito por humanos e código gerado por máquinas. Esta seção aborda como projetar interfaces que comuniquem claramente expectativas, limites e comportamentos, especialmente quando componentes de IA estão envolvidos.

Segundo Stoica et al. (2024), especificações são o elo perdido para tornar o desenvolvimento de sistemas LLM uma disciplina de engenharia [1].

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Projetar APIs que comunicam incerteza e limitações de componentes de IA
2. Definir contratos formais verificáveis entre sistemas
3. Implementar versionamento e evolução de interfaces híbridas
4. Avaliar trade-offs entre flexibilidade e rigidez contratual

## Fundamentos de Interfaces para Sistemas Híbridos

### Comunicando Incerteza

Diferentemente de APIs tradicionais, interfaces envolvendo IA devem comunicar a natureza probabilística das operações.

```python
from dataclasses import dataclass
from typing import Optional, Generic, TypeVar
from enum import Enum

class ConfidenceLevel(Enum):
    HIGH = "high"      # >= 0.9
    MEDIUM = "medium"  # 0.7 - 0.9
    LOW = "low"        # < 0.7
    UNKNOWN = "unknown"

@dataclass
class UncertainResult(Generic[T]):
    """
    Wrapper que comunica incerteza em resultados de IA.
    """
    value: T
    confidence: ConfidenceLevel
    confidence_score: float
    alternatives: list[T]
    model_version: str
    timestamp: str
    
    def is_reliable(self, threshold: ConfidenceLevel = ConfidenceLevel.MEDIUM) -> bool:
        """Verifica se resultado atinge nível mínimo de confiança."""
        confidence_order = {
            ConfidenceLevel.HIGH: 3,
            ConfidenceLevel.MEDIUM: 2,
            ConfidenceLevel.LOW: 1,
            ConfidenceLevel.UNKNOWN: 0
        }
        return confidence_order[self.confidence] >= confidence_order[threshold]
```

### Estrutura de Resposta Híbrida

```json
{
  "data": {
    "classification": "urgent",
    "priority_score": 0.87
  },
  "meta": {
    "confidence": "high",
    "confidence_score": 0.92,
    "model": "gpt-4",
    "model_version": "2024-08",
    "processing_time_ms": 245,
    "alternatives": [
      {"classification": "normal", "confidence": 0.05},
      {"classification": "low", "confidence": 0.03}
    ]
  },
  "verification": {
    "checksum": "sha256:abc123...",
    "input_hash": "sha256:def456...",
    "cached": false
  }
}
```

## Tipos de Contratos

### 1. Contratos Síncronos

Para operações que requerem resposta imediata com possível fallback.

```python
from abc import ABC, abstractmethod
from typing import Union
import asyncio

class SynchronousContract(ABC):
    """
    Contrato para operações síncronas com timeout e fallback.
    """
    
    def __init__(self, timeout_ms: int = 5000):
        self.timeout_ms = timeout_ms
    
    async def execute(self, request) -> Union[Success, FallbackResult, Error]:
        try:
            result = await asyncio.wait_for(
                self._process(request),
                timeout=self.timeout_ms / 1000
            )
            
            if self._validate(result):
                return Success(result)
            else:
                return await self._fallback(request)
                
        except asyncio.TimeoutError:
            return await self._fallback(request, reason="timeout")
        except Exception as e:
            return Error(str(e))
    
    @abstractmethod
    async def _process(self, request):
        pass
    
    @abstractmethod
    def _validate(self, result) -> bool:
        pass
    
    @abstractmethod
    async def _fallback(self, request, reason=None):
        pass
```

### 2. Contratos Assíncronos

Para operações de longa duração com notificação de progresso.

```python
from enum import Enum, auto

class JobStatus(Enum):
    PENDING = auto()
    PROCESSING = auto()
    COMPLETED = auto()
    FAILED = auto()
    CANCELLED = auto()

class AsynchronousContract:
    """
    Contrato para operações assíncronas com tracking.
    """
    
    async def submit(self, request) -> JobId:
        """Submete job para processamento."""
        job_id = self._generate_job_id()
        await self._queue_job(job_id, request)
        return job_id
    
    async def status(self, job_id: JobId) -> JobStatus:
        """Consulta status do job."""
        return await self._get_status(job_id)
    
    async def result(self, job_id: JobId) -> Optional[Result]:
        """Obtém resultado (None se ainda não completo)."""
        status = await self.status(job_id)
        if status == JobStatus.COMPLETED:
            return await self._get_result(job_id)
        return None
    
    async def cancel(self, job_id: JobId) -> bool:
        """Tenta cancelar job pendente."""
        return await self._attempt_cancel(job_id)
    
    async def subscribe(self, job_id: JobId, callback):
        """Subscreve para notificações de progresso."""
        await self._add_subscriber(job_id, callback)
```

### 3. Contratos de Streaming

Para operações que produzem resultados parciais.

```python
from typing import AsyncIterator

class StreamingContract:
    """
    Contrato para operações com resultados parciais.
    """
    
    async def stream(self, request) -> AsyncIterator[PartialResult]:
        """
        Gera resultados parciais à medida que ficam disponíveis.
        Útil para geração de texto, processamento de documentos, etc.
        """
        buffer = []
        
        async for chunk in self._generate_chunks(request):
            buffer.append(chunk)
            
            # Emite quando tem conteúdo suficiente
            if self._should_emit(buffer):
                yield PartialResult(
                    content="".join(buffer),
                    is_complete=False,
                    tokens_generated=len(buffer)
                )
                buffer = []
        
        # Emite conteúdo restante
        if buffer:
            yield PartialResult(
                content="".join(buffer),
                is_complete=True,
                tokens_generated=len(buffer)
            )
```

## Design de APIs REST para IA

### Estrutura de Endpoints

```
/api/v1/ai/
├── generate          # Geração síncrona
├── generate/async    # Submissão assíncrona
├── jobs/{id}         # Consulta de job
├── jobs/{id}/cancel  # Cancelamento
├── validate          # Validação de entrada
└── health            # Health check do serviço
```

### Códigos de Status Específicos

Além dos códigos HTTP padrão, APIs de IA podem usar:

| Código | Significado | Quando Usar |
|--------|-------------|-------------|
| 200 OK | Sucesso | Resposta confiável retornada |
| 202 Accepted | Aceito para processamento | Job assíncrono criado |
| 206 Partial Content | Conteúdo parcial | Streaming em progresso |
| 409 Conflict | Conflito | Input viola constraints |
| 422 Unprocessable | Não processável | IA não conseguiu gerar resultado válido |
| 503 Service Unavailable | Serviço indisponível | Timeout ou rate limit |

### Headers Semânticos

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-Confidence-Level: high
X-Confidence-Score: 0.94
X-Model-Version: gpt-4-2024-08
X-Processing-Time: 245
X-Cache-Status: miss
X-Request-ID: req_abc123
```

## Versionamento e Evolução

### Estratégias de Versionamento

```python
class VersionedContract:
    """
    Suporte a múltiplas versões de contrato.
    """
    
    SUPPORTED_VERSIONS = ["1.0", "1.1", "2.0"]
    DEFAULT_VERSION = "2.0"
    
    def __init__(self):
        self.versions = {
            "1.0": ContractV1(),
            "1.1": ContractV1_1(),
            "2.0": ContractV2()
        }
    
    def get_contract(self, version: Optional[str] = None):
        version = version or self.DEFAULT_VERSION
        if version not in self.SUPPORTED_VERSIONS:
            raise UnsupportedVersionError(f"Versão {version} não suportada")
        return self.versions[version]
    
    def migrate_request(self, request, from_version: str, to_version: str):
        """Migra request entre versões do contrato."""
        migrator = self._get_migrator(from_version, to_version)
        return migrator.migrate(request)
```

### Depreciação Gradual

```python
from datetime import datetime, timedelta

class DeprecationPolicy:
    def __init__(self, version: str, sunset_date: datetime):
        self.version = version
        self.sunset_date = sunset_date
        self.warning_date = sunset_date - timedelta(days=90)
    
    def get_headers(self) -> dict:
        headers = {}
        
        if datetime.now() > self.warning_date:
            headers["Deprecation"] = f"@ {self.sunset_date.isoformat()}"
            headers["Sunset"] = self.sunset_date.isoformat()
            
            if datetime.now() > self.sunset_date:
                headers["Warning"] = f"Versão {self.version} foi descontinuada"
        
        return headers
```

## Contratos com Schema

### OpenAPI para IA

```yaml
openapi: 3.0.0
info:
  title: AI Service API
  version: 2.0.0

paths:
  /generate:
    post:
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                prompt:
                  type: string
                  maxLength: 4000
                max_tokens:
                  type: integer
                  maximum: 4096
                temperature:
                  type: number
                  minimum: 0
                  maximum: 2
                required_confidence:
                  type: string
                  enum: [low, medium, high]
              required: [prompt]
      
      responses:
        '200':
          description: Geração bem-sucedida
          content:
            application/json:
              schema:
                type: object
                properties:
                  result:
                    type: string
                  meta:
                    type: object
                    properties:
                      confidence:
                        type: string
                        enum: [low, medium, high]
                      confidence_score:
                        type: number
                        minimum: 0
                        maximum: 1
                      alternatives:
                        type: array
                        items:
                          type: object
```

## Practical Considerations

### Aplicações Reais

1. **Chatbots**: APIs que retornam confiança para decisões de escalonamento
2. **Sistemas de Recomendação**: Contratos que comunicam explicabilidade
3. **Análise de Documentos**: Streaming para documentos grandes

### Limitações

- **Overhead de Metadados**: Informações de confiança aumentam payload
- **Complexidade de Versionamento**: Múltiplas versões dificultam manutenção
- **Latência de Validação**: Schema validation adiciona tempo de resposta

### Melhores Práticas

1. **Fail Fast**: Validar inputs rigorosamente antes de processar
2. **Idempotência**: Garantir que múltiplas chamadas com mesmo ID produzam mesmo resultado
3. **Observabilidade**: Logging estruturado de todas as interações
4. **Rate Limiting**: Proteger contra abuso e controlar custos
5. **Circuit Breaker**: Isolar falhas de serviços de IA

## Summary

- Interfaces devem comunicar incerteza através de metadados de confiança
- Contratos síncronos, assíncronos e de streaming servem a diferentes casos de uso
- Versionamento cuidadoso permite evolução sem breaking changes
- Headers semânticos enriquecem a comunicação entre sistemas
- Schema-first design garante consistência e facilita validação

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — princípios de design de interfaces são atemporais |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — contratos podem ser validados com testes de contrato |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Alta — designer de API responsável por contratos claros |

## References

1. Stoica, I.; Zaharia, M.; Gonzalez, J.; et al. "Specifications: The missing link to making the development of LLM systems an engineering discipline." arXiv:2412.05299, 2024. https://arxiv.org/abs/2412.05299

2. OpenAPI Initiative. "OpenAPI Specification v3.0.0." https://spec.openapis.org/oas/v3.0.0

3. Fielding, R. "Architectural Styles and the Design of Network-based Software Architectures." PhD Dissertation, UC Irvine, 2000.

4. NIST. "Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile." NIST AI 600-1, 2024. https://doi.org/10.6028/NIST.AI.600-1

5. Richardson, L.; Amundsen, M. "RESTful Web APIs." O'Reilly Media, 2013.

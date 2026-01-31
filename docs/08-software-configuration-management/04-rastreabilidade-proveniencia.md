# 8.4 Rastreabilidade e Proveniência

## Overview

A rastreabilidade em sistemas com IA estende-se além do código-fonte para capturar a cadeia completa de geração: desde prompts e configurações de modelos até decisões de curadoria humana. A proveniência (provenance) documenta a origem e histórico de cada artefato, permitindo auditoria, compliance e reprodutibilidade.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Implementar sistemas de rastreabilidade para código gerado por IA
2. Capturar metadados de proveniência de geração
3. Estabelecer audit trails para decisões de curadoria
4. Garantir compliance através de rastreabilidade completa

## Fundamentos de Proveniência

### O Que é Proveniência em Sistemas com IA

Proveniência refere-se ao registro completo de como um artefato foi criado, incluindo:
- **Quem** gerou (humano ou sistema)
- **O quê** foi usado como entrada (prompts, contexto, modelos)
- **Quando** ocorreu a geração
- **Como** foi processado (parâmetros, configurações)
- **Por quê** (racional, intenção, requisitos)

```python
@dataclass
class ProvenanceRecord:
    """
    Registro completo de proveniência de geração
    """
    # Identificação
    generation_id: str
    timestamp: datetime
    
    # Entradas
    prompt_version: str
    prompt_content: str
    context_sources: List[str]
    
    # Configuração do modelo
    model: str
    temperature: float
    seed: Optional[int]
    max_tokens: int
    top_p: float
    
    # Saída
    output_hash: str
    output_content: str
    
    # Curadoria
    curator: Optional[str]
    approval_status: str
    approval_timestamp: Optional[datetime]
    
    # Linhagem
    parent_generation: Optional[str]
    related_generations: List[str]
```

### Captura de Metadados de Geração

```python
class GenerationMetadataCapture:
    """
    Captura automática de metadados de geração
    """
    
    def capture_generation(self, generation_event):
        """
        Captura metadados completos de evento de geração
        """
        metadata = {
            'generation_id': str(uuid.uuid4()),
            'timestamp': datetime.utcnow().isoformat(),
            
            # Informações do modelo
            'model': {
                'name': generation_event.model_name,
                'version': generation_event.model_version,
                'provider': generation_event.provider
            },
            
            # Configurações
            'configuration': {
                'temperature': generation_event.temperature,
                'seed': generation_event.seed,
                'max_tokens': generation_event.max_tokens,
                'top_p': generation_event.top_p,
                'frequency_penalty': generation_event.frequency_penalty,
                'presence_penalty': generation_event.presence_penalty
            },
            
            # Prompt
            'prompt': {
                'version': generation_event.prompt_version,
                'hash': self.hash_content(generation_event.prompt_content),
                'token_count': generation_event.prompt_tokens
            },
            
            # Contexto
            'context': {
                'sources': generation_event.context_sources,
                'retrieval_method': generation_event.retrieval_method,
                'context_hash': self.hash_context(generation_event.context)
            },
            
            # Saída
            'output': {
                'hash': self.hash_content(generation_event.output),
                'token_count': generation_event.output_tokens,
                'finish_reason': generation_event.finish_reason
            },
            
            # Ambiente
            'environment': {
                'sdk_version': generation_event.sdk_version,
                'runtime': generation_event.runtime,
                'dependencies': generation_event.dependencies
            }
        }
        
        return self.store_metadata(metadata)
```

## Cadeia de Rastreabilidade

### De Código Gerado às Origens

```python
class LineageTracer:
    """
    Rastreamento de linhagem de código gerado
    """
    
    def trace_lineage(self, code_hash):
        """
        Traça linhagem completa de código gerado
        """
        lineage = {
            'code_hash': code_hash,
            'generation': self.get_generation_record(code_hash),
            'prompt': self.get_prompt_lineage(code_hash),
            'model': self.get_model_lineage(code_hash),
            'context': self.get_context_lineage(code_hash),
            'curator': self.get_curator_lineage(code_hash)
        }
        
        return LineageReport(**lineage)
    
    def get_prompt_lineage(self, code_hash):
        """
        Obtém linhagem do prompt usado
        """
        generation = self.get_generation_record(code_hash)
        prompt_version = generation['prompt_version']
        
        return {
            'version': prompt_version,
            'evolution': self.get_prompt_history(prompt_version),
            'test_results': self.get_prompt_tests(prompt_version),
            'author': self.get_prompt_author(prompt_version)
        }
    
    def get_context_lineage(self, code_hash):
        """
        Obtém linhagem de contexto RAG
        """
        generation = self.get_generation_record(code_hash)
        context_sources = generation['context_sources']
        
        return {
            'sources': [
                {
                    'document': source,
                    'version': self.get_document_version(source),
                    'retrieval_score': self.get_retrieval_score(source),
                    'chunk_ids': self.get_chunk_ids(source)
                }
                for source in context_sources
            ],
            'retrieval_timestamp': generation['timestamp'],
            'embedding_model': generation.get('embedding_model')
        }
```

### Rastreabilidade de Decisões de Curadoria

```python
class CuratorAuditTrail:
    """
    Audit trail para decisões de curadoria humana
    """
    
    def record_decision(self, decision_event):
        """
        Registra decisão de curadoria
        """
        audit_record = {
            'decision_id': str(uuid.uuid4()),
            'timestamp': datetime.utcnow(),
            
            # Decisão
            'decision_type': decision_event.decision_type,  # approve, reject, modify
            'rationale': decision_event.rationale,
            
            # Artefato
            'artifact_hash': decision_event.artifact_hash,
            'artifact_type': decision_event.artifact_type,
            'generation_id': decision_event.generation_id,
            
            # Curador
            'curator_id': decision_event.curator_id,
            'curator_role': decision_event.curator_role,
            
            # Contexto
            'review_context': {
                'review_duration': decision_event.review_duration,
                'tools_used': decision_event.tools_used,
                'tests_executed': decision_event.tests_executed
            },
            
            # Modificações (se aplicável)
            'modifications': decision_event.modifications if decision_event.decision_type == 'modify' else None
        }
        
        return self.store_audit_record(audit_record)
    
    def query_audit_trail(self, filters):
        """
        Consulta audit trail com filtros
        """
        return self.audit_store.query(
            curator=filters.get('curator'),
            decision_type=filters.get('decision_type'),
            date_range=filters.get('date_range'),
            artifact_type=filters.get('artifact_type')
        )
```

## Compliance e Governança

### Requisitos Regulatórios

```python
class ComplianceTracker:
    """
    Rastreamento de compliance para sistemas com IA
    """
    
    def __init__(self):
        self.requirements = {
            'gdpr': ['data_lineage', 'purpose_limitation', 'right_to_explanation'],
            'soc2': ['change_management', 'access_controls', 'audit_trails'],
            'iso27001': ['asset_management', 'risk_assessment', 'incident_response'],
            'ai_act': ['transparency', 'human_oversight', 'risk_management']
        }
    
    def validate_compliance(self, artifact_hash, regulation):
        """
        Valida compliance de artefato
        """
        checks = self.requirements[regulation]
        results = {}
        
        for check in checks:
            results[check] = self.run_compliance_check(artifact_hash, check)
        
        return ComplianceReport(
            regulation=regulation,
            artifact=artifact_hash,
            checks=results,
            overall_status=all(r.passed for r in results.values()),
            timestamp=datetime.utcnow()
        )
    
    def generate_compliance_evidence(self, artifact_hash, regulation):
        """
        Gera evidência de compliance para auditoria
        """
        lineage = self.trace_lineage(artifact_hash)
        audit_trail = self.get_audit_trail(artifact_hash)
        test_results = self.get_test_results(artifact_hash)
        
        return {
            'artifact': artifact_hash,
            'regulation': regulation,
            'lineage': lineage,
            'audit_trail': audit_trail,
            'test_results': test_results,
            'generated_at': datetime.utcnow(),
            'evidence_hash': self.hash_evidence(lineage, audit_trail, test_results)
        }
```

### SBOM para Sistemas com IA

```python
class AISOftwareBillOfMaterials:
    """
    Software Bill of Materials estendido para sistemas com IA
    """
    
    def generate_sbom(self, system_version):
        """
        Gera SBOM completo incluindo componentes de IA
        """
        sbom = {
            'sbomVersion': '1.0',
            'specVersion': '3.0',
            'creationInfo': {
                'created': datetime.utcnow().isoformat(),
                'creators': ['Tool: SWEBOK-AI-SBOM-Generator']
            },
            
            'packages': [
                # Componentes tradicionais
                *self.get_traditional_components(system_version),
                
                # Componentes de IA
                *self.get_ai_components(system_version)
            ],
            
            'relationships': self.get_relationships(system_version),
            
            'ai_extensions': {
                'models': self.get_model_components(system_version),
                'prompts': self.get_prompt_components(system_version),
                'datasets': self.get_dataset_components(system_version),
                'embeddings': self.get_embedding_components(system_version)
            }
        }
        
        return sbom
    
    def get_ai_components(self, version):
        """
        Obtém componentes específicos de IA
        """
        return [
            {
                'SPDXID': f'SPDXRef-MODEL-{model.id}',
                'name': model.name,
                'version': model.version,
                'downloadLocation': model.source_url,
                'checksums': [{'algorithm': 'SHA256', 'checksumValue': model.hash}],
                'supplier': model.provider,
                'ai_specific': {
                    'model_type': model.type,
                    'training_data_provenance': model.training_data,
                    'license': model.license,
                    'capabilities': model.capabilities,
                    'limitations': model.limitations
                }
            }
            for model in self.get_models(version)
        ]
```

## Ferramentas de Rastreabilidade

### Integração com MLflow

```python
class MLflowProvenanceTracker:
    """
    Rastreamento de proveniência usando MLflow
    """
    
    def log_generation(self, run_id, generation_data):
        """
        Registra geração no MLflow
        """
        with mlflow.start_run(run_id=run_id):
            # Logar parâmetros
            mlflow.log_params({
                'model': generation_data.model,
                'temperature': generation_data.temperature,
                'seed': generation_data.seed,
                'prompt_version': generation_data.prompt_version
            })
            
            # Logar métricas
            mlflow.log_metrics({
                'prompt_tokens': generation_data.prompt_tokens,
                'output_tokens': generation_data.output_tokens,
                'latency_ms': generation_data.latency
            })
            
            # Logar artefatos
            mlflow.log_artifact(
                generation_data.prompt_file,
                artifact_path='prompts'
            )
            mlflow.log_artifact(
                generation_data.output_file,
                artifact_path='outputs'
            )
            
            # Logar proveniência como JSON
            mlflow.log_dict(
                generation_data.provenance,
                artifact_file='provenance.json'
            )
```

### LangSmith para Rastreabilidade

```python
class LangSmithTracer:
    """
    Rastreamento usando LangSmith
    """
    
    def __init__(self, project_name):
        self.client = Client()
        self.project = project_name
    
    def trace_chain(self, chain_config):
        """
        Configura rastreamento de cadeia
        """
        @traceable(
            project_name=self.project,
            run_type='chain',
            name=chain_config.name
        )
        async def traced_chain(inputs):
            # Executar cadeia
            result = await chain_config.run(inputs)
            
            # Retornar com metadados
            return {
                'output': result,
                'metadata': {
                    'chain_version': chain_config.version,
                    'components': chain_config.components
                }
            }
        
        return traced_chain
```

## Practical Considerations

### Desafios de Implementação

1. **Volume de Dados**: Sistemas de alta escala geram enorme volume de metadados
2. **Performance**: Captura de proveniência não deve degradar latência
3. **Privacidade**: Metadados podem conter informações sensíveis
4. **Retenção**: Políticas de retenção devem balancear compliance e custo

### Melhores Práticas

```yaml
provenance_best_practices:
  capture:
    - "Capture metadados automaticamente, sem intervenção manual"
    - "Use hashing para verificação de integridade"
    - "Inclua timestamps precisos (UTC)"
    - "Versione esquemas de metadados"
  
  storage:
    - "Use banco de dados imutável para audit trail"
    - "Implemente criptografia em repouso"
    - "Mantenha backups independentes"
    - "Estabeleça retenção conforme compliance"
  
  access:
    - "Princípio do menor privilégio"
    - "Log de acessos ao audit trail"
    - "Autenticação multifator para consultas"
    - "Anonimização para análises agregadas"
```

### Métricas de Maturidade

| Nível | Características |
|-------|-----------------|
| 1 | Captura básica de metadados de geração |
| 2 | Rastreabilidade código→prompt→modelo |
| 3 | Audit trail completo de curadoria |
| 4 | Validação automática de compliance |
| 5 | Proveniência verificável criptograficamente |

## Summary

- **Proveniência**: Registro completo de origem e histórico de artefatos
- **Rastreabilidade**: Capacidade de traçar código gerado às suas origens
- **Audit Trail**: Registro imutável de decisões de curadoria
- **Compliance**: Evidência para regulamentações (GDPR, AI Act, etc.)
- **SBOM**: Inventário completo incluindo componentes de IA

## References

1. W3C (2023). *PROV-Overview: An Overview of the PROV Family of Documents*. W3C Working Group.

2. Buneman, P., et al. (2016). *Provenance in Databases: Principles and Applications*. Foundations and Trends in Databases.

3. ISO/IEC (2024). *ISO/IEC 25000 - Systems and Software Quality Requirements and Evaluation (SQuaRE)*.

4. NTIA (2023). *Software Bill of Materials (SBOM) Minimum Elements*. US Department of Commerce.

5. European Commission (2024). *AI Act: Requirements for High-Risk AI Systems*. Official Journal of the European Union.

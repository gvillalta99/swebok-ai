---
title: 05 - Evolução e Migração de Sistemas Legados
created_at: '2025-01-31'
tags: [evolucao, migracao, sistemas-legados, versionamento, embeddings, testes-regressao]
status: review
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 5. Evolução e Migração de Sistemas Legados

## Overview

A evolução de sistemas que incorporam componentes de IA apresenta desafios
únicos que transcendem a manutenção tradicional de software. Enquanto sistemas
convencionais evoluem através de mudanças de código e atualizações de
bibliotecas, sistemas com IA também devem gerenciar a evolução de modelos,
prompts, embeddings e comportamentos estocásticos.

Esta seção aborda estratégias para atualização de modelos e prompts em produção,
gerenciamento de dependências de IA, versionamento semântico para comportamentos
de IA, migração de dados e embeddings, e testes de regressão para evolução de
modelos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Planejar atualizações de modelos e prompts em ambientes de produção
2. Gerenciar dependências de APIs e modelos versionados
3. Aplicar versionamento semântico para comportamentos de IA
4. Executar migrações de dados e embeddings entre versões de modelos
5. Implementar testes de regressão para evolução de modelos

## 5.1 Atualização de Modelos e Prompts em Produção

### 5.1.1 O Desafio da Evolução de Modelos

Diferente de bibliotecas de software tradicionais, modelos de IA podem mudar seu
comportamento mesmo dentro da mesma versão nominal. Um modelo "GPT-4" de janeiro
pode comportar-se diferentemente de um modelo "GPT-4" de junho, mesmo que ambos
sejam chamados através da mesma API.

**Fatores de Mudança em Modelos**:

- Fine-tuning contínuo pelo provedor
- Atualizações de segurança e alinhamento
- Mudanças na base de conhecimento
- Alterações em parâmetros internos
- Ajustes de temperatura e sampling

### 5.1.2 Estratégias de Atualização

**Atualização Azul-Verde (Blue-Green)**:

```
Ambiente Azul (Atual):
├── Modelo v1 em produção
├── 100% do tráfego
└── Monitoramento ativo

Ambiente Verde (Novo):
├── Modelo v2 em staging
├── 0% do tráfego inicialmente
└── Testes de validação

Transição:
├── Shadow mode: v2 processa sem afetar resposta
├── Canary: 1% → 5% → 10% do tráfego
├── Comparação de métricas
├── Rollback automático se anomalias
└── 100% no verde quando estável
```

**Feature Flags para Modelos**:

- Permitir alternância instantânea entre versões
- Testes A/B entre modelos
- Rollback imediato em caso de problemas
- Segmentação por usuário ou região

**Prompt Versioning**:

- Versionar prompts independentemente de modelos
- Testar prompts existentes com novos modelos
- Manter biblioteca de prompts validados
- Rollback de prompts sem mudar modelo

### 5.1.3 Gestão de Mudanças em Prompts

**Categorias de Mudança**:

1. **Correções**: Fix de bugs em prompts
2. **Otimizações**: Melhoria de performance ou qualidade
3. **Adaptações**: Ajustes para novos modelos
4. **Features**: Novas capacidades

**Processo de Mudança de Prompt**:

```
Fase 1: Desenvolvimento
├── Versionar novo prompt
├── Documentar mudanças
└── Testes em ambiente de desenvolvimento

Fase 2: Validação
├── Testes com golden dataset
├── Comparação com prompt anterior
├── Validação de stakeholders
└── Aprovação

Fase 3: Implantação
├── Deploy em staging
├── Testes de integração
├── Canary release
└── Monitoramento

Fase 4: Rollback (se necessário)
├── Identificação de problemas
├── Ativação de feature flag para versão anterior
└── Análise post-mortem
```

## 5.2 Gerenciamento de Dependências de IA

### 5.2.1 Tipos de Dependências

**Dependências de Modelo**:

- APIs de provedores (OpenAI, Anthropic, Google)
- Modelos auto-hospedados
- Modelos open-source (Llama, Mistral)
- Modelos especializados (CodeT5, StarCoder)

**Dependências de Infraestrutura**:

- Serviços de embeddings
- Vector databases
- Serviços de fine-tuning
- APIs de avaliação

**Dependências de Dados**:

- Datasets de treinamento
- Dados de fine-tuning
- Embeddings pré-computados
- Dados de avaliação (golden datasets)

### 5.2.2 Vendor Lock-in e Mitigação

**Riscos de Vendor Lock-in**:

- APIs incompatíveis entre provedores
- Formatos de modelo proprietários
- Embeddings não interoperáveis
- Custos de migração elevados

**Estratégias de Mitigação**:

1. **Abstração de Provedor**:

```python
# Interface abstrata
class LLMProvider:
    def generate(self, prompt: str, **kwargs) -> str:
        raise NotImplementedError

# Implementações específicas
class OpenAIProvider(LLMProvider):
    def generate(self, prompt: str, **kwargs):
        # Chamada específica OpenAI
        pass

class AnthropicProvider(LLMProvider):
    def generate(self, prompt: str, **kwargs):
        # Chamada específica Anthropic
        pass
```

2. **Normalização de Embeddings**:

- Converter embeddings para formato neutro
- Documentar dimensões e métricas de similaridade
- Manter mapeamentos entre formatos

3. **Multi-Provider Strategy**:

- Fallback automático entre provedores
- Load balancing entre APIs
- Negociação de custos com múltiplos fornecedores

### 5.2.3 Resiliência e Fallback

**Estratégias de Resiliência**:

**Circuit Breaker**:

- Detectar falhas em APIs de IA
- Abrir circuito após threshold de erros
- Fallback para modelo alternativo
- Fechar circuito quando serviço recupera

**Retry com Backoff**:

- Retry automático em falhas transitórias
- Exponential backoff para não sobrecarregar
- Jitter para evitar thundering herd
- Dead letter queue para falhas persistentes

**Degradação Graciosa**:

- Fallback para respostas cacheadas
- Uso de modelos menores/menos capazes
- Respostas simplificadas
- Notificação ao usuário sobre degradação

## 5.3 Versionamento Semântico para Comportamentos de IA

### 5.3.1 Limitações do SemVer Tradicional

Versionamento Semântico tradicional (MAJOR.MINOR.PATCH) assume:

- Comportamento determinístico
- Mudanças explícitas e documentadas
- Compatibilidade verificável

Sistemas com IA violam essas suposições:

- Comportamento pode mudar sem mudança de versão
- Mudanças são frequentemente não-intencionais
- Compatibilidade é probabilística, não binária

### 5.3.2 SemVer Estendido para IA

Proposta de versionamento adaptado:

```
VERSAO_SISTEMA.MODELO.PROMPT.CONFIG

Exemplo: 2.3.1.4
- 2: Versão major do sistema (breaking changes)
- 3: Versão do modelo de IA utilizado
- 1: Versão do prompt
- 4: Versão de configuração (temperatura, etc.)
```

**Regras de Incremento**:

**MAJOR (Sistema)**:

- Mudanças arquiteturais
- Alterações em APIs públicas
- Mudanças em contratos de dados

**MODEL (Modelo)**:

- Upgrade para nova versão de modelo
- Mudança de provedor
- Alteração em modelo auto-hospedado

**PROMPT (Prompt)**:

- Mudanças em prompts de sistema
- Alterações em instruções
- Atualizações de few-shot examples

**CONFIG (Configuração)**:

- Mudanças em temperatura, top_p
- Alterações em max_tokens
- Ajustes de parâmetros de sampling

### 5.3.3 Compatibilidade e Breaking Changes

**Definindo Breaking Changes em Sistemas com IA**:

**Breaking Changes Explícitas**:

- Mudança de formato de resposta
- Alteração de schema de saída
- Remoção de capacidades
- Mudança de endpoint ou API

**Breaking Changes Implícitas**:

- Degradação de qualidade perceptível
- Alteração de comportamento em edge cases
- Mudança em latência significativa
- Alteração de custo por requisição

**Testes de Compatibilidade**:

- Golden dataset com comportamentos esperados
- Threshold de similaridade semântica
- Métricas de qualidade mínimas
- Testes de regressão automatizados

## 5.4 Migração de Dados e Embeddings

### 5.4.1 O Desafio da Migração de Embeddings

Quando modelos de embedding mudam, vetores gerados por versões diferentes são
**incompatíveis**. Não é possível comparar diretamente embeddings de modelos
diferentes.

**Problemas de Migração**:

- Embeddings antigos não são compatíveis com novo modelo
- Re-indexação completa pode ser custosa
- Período de transição requer manter dois sistemas
- Consistência de dados durante migração

### 5.4.2 Estratégias de Migração

**Migração Completa (Big Bang)**:

```
Fase 1: Preparação
├── Gerar embeddings com novo modelo para todo o dataset
├── Validar qualidade dos novos embeddings
└── Estimar tempo de downtime

Fase 2: Janela de Manutenção
├── Parar sistema
├── Substituir embeddings
├── Atualizar índices
└── Validar consistência

Fase 3: Retorno
├── Reiniciar sistema com novo modelo
├── Monitoramento intensivo
└── Rollback se problemas
```

**Migração Gradual (Dual Write)**:

```
Fase 1: Setup
├── Manter índices antigos em operação
├── Configurar novo índice em paralelo
└── Implementar dual write

Fase 2: População
├── Novos dados são indexados em ambos
├── Backfill gradual dos dados antigos
└── Monitorar consistência

Fase 3: Transição
├── Query em ambos os índices
├── Comparar resultados
├── Aumentar peso do novo índice gradualmente
└── Remover índice antigo quando seguro
```

**Migração com Tradução**:

- Treinar modelo de tradução entre espaços de embedding
- Converter embeddings antigos para novo espaço
- Perda de qualidade aceitável vs. custo de re-indexação

### 5.4.3 Compatibilidade de Vetores

**Dimensões**:

- Diferentes modelos produzem embeddings de dimensões diferentes
- Necessidade de projeção ou padding
- Impacto na métrica de similaridade

**Métricas de Similaridade**:

- Cosine similarity pode não ser adequada entre modelos diferentes
- Necessidade de recalibrar thresholds
- Validação de qualidade de retrieval

**Normalização**:

- Alguns modelos normalizam embeddings, outros não
- Inconsistência pode afetar comparações
- Estratégias de normalização pós-geração

## 5.5 Testes de Regressão para Evolução de Modelos

### 5.5.1 Necessidade de Testes de Regressão Específicos

Testes tradicionais assumem comportamento determinístico. Modelos de IA são
**inherentemente estocásticos**, mesmo com mesmos inputs.

**Desafios**:

- Mesmo input pode produzir outputs diferentes
- Qualidade pode variar sem mudança de código
- Edge cases podem não ser reproduzíveis
- Avaliação de "corretude" é subjetiva

### 5.5.2 Golden Datasets

**Definição**: Conjunto de inputs com comportamentos esperados, validados por
humanos.

**Características**:

- Cobertura de casos comuns e edge cases
- Diversidade de domínios e estilos
- Anotações de qualidade esperada
- Versionamento junto com modelo

**Manutenção**:

- Atualização contínua com novos casos
- Remoção de casos obsoletos
- Validação periódica de anotações
- Expansão para cobrir novas funcionalidades

### 5.5.3 Métricas de Regressão

**Métricas Quantitativas**:

1. **Similaridade Semântica**:

```
Similaridade = cosine_similarity(embedding_output_novo, embedding_output_esperado)
Threshold: > 0.85 para aprovação
```

2. **BLEU/ROUGE Scores** (para geração de texto):

- Comparação n-gram entre output e referência
- Thresholds ajustados por domínio

3. **Taxa de Sucesso em Tarefas**:

- Porcentagem de tarefas completadas corretamente
- Comparação com baseline

**Métricas Qualitativas**:

1. **Avaliação Humana**:

- Amostragem de outputs para avaliação
- Escalas de qualidade (Likert)
- Comparativo A/B entre versões

2. **Métricas de Negócio**:

- Taxa de conversão
- Satisfação do usuário
- Tempo de resolução

### 5.5.4 Automação de Testes de Regressão

**Pipeline de Regressão**:

```
Trigger: Nova versão de modelo ou prompt

Fase 1: Execução
├── Rodar golden dataset contra nova versão
├── Coletar todas as métricas
└── Gerar relatório comparativo

Fase 2: Análise
├── Comparar com thresholds definidos
├── Identificar regressões
├── Análise de casos problemáticos
└── Recomendação de aprovação/rejeição

Fase 3: Decisão
├── Aprovação automática se todas as métricas OK
├── Revisão humana se métricas marginais
├── Rejeição automática se regressões críticas
└── Documentação de decisão
```

**Alertas e Monitoramento**:

- Alertas em tempo real para degradação
- Dashboards de evolução de métricas
- Detecção de drift em comportamento
- Análise de tendências

## Practical Considerations

### Aplicações Reais

1. **Atualizações Contínuas**: Empresas com pipelines de CI/CD que testam
   automaticamente novas versões de modelos contra golden datasets antes de
   aprovar para produção

2. **Migrações de Embeddings**: Plataformas de busca migrando gradualmente entre
   modelos de embedding, mantendo dois índices durante transição

3. **Multi-Provider**: Sistemas críticos utilizando múltiplos provedores de IA
   com fallback automático, evitando single point of failure

### Limitações e Riscos

- **Custo de Golden Datasets**: Manutenção de datasets de teste abrangentes é
  cara
- **Falsa Segurança**: Testes de regressão podem não capturar todos os problemas
- **Overhead de Versionamento**: Versionamento granular adiciona complexidade
- **Latência de Migração**: Migrações de embeddings podem ter downtime
  significativo

### Melhores Práticas

1. **Golden Datasets como Código**: Versionar e testar datasets como qualquer
   outro código
2. **Métricas de Negócio**: Sempre correlacionar métricas técnicas com impacto
   de negócio
3. **Rollback Automatizado**: Implementar rollback automático baseado em
   métricas
4. **Documentação de Decisões**: Registrar por que certas versões foram
   aprovadas ou rejeitadas
5. **Monitoramento Contínuo**: Testes de regressão não substituem monitoramento
   em produção
6. **Fallback Sempre Disponível**: Sempre ter caminho de rollback testado e
   pronto

## Summary

- **Atualização de modelos** requer estratégias de deploy gradual (blue-green,
  canary, feature flags)
- **Dependências de IA** devem ser gerenciadas com abstrações para evitar vendor
  lock-in
- **Versionamento semântico estendido** é necessário para capturar complexidade
  de sistemas com IA
- **Migração de embeddings** é um desafio técnico significativo que requer
  planejamento cuidadoso
- **Testes de regressão** para modelos requerem golden datasets e métricas
  específicas de qualidade

## References

1. LangChain, "Best Practices for Versioning Prompts and Model Configurations",
   2025\. Disponível em: <https://www.langchain.com/blog/versioning-prompts-2025>

2. ThoughtWorks, "Managing Dependencies on AI APIs in Production Systems", 2025.
   Disponível em:
   <https://www.thoughtworks.com/insights/articles/managing-ai-dependencies-2025>

3. arXiv, "Regression Testing Strategies for Evolving Language Model Behaviors",
   2025\. Disponível em: <https://arxiv.org/abs/2501.18765>

4. ACT IAC, "Legacy Code Modernization with AI", 2025. Disponível em:
   <https://www.actiac.org/system/files/2025-01/Final%20Deliverable_ACT%20IAC%20ET%20MAI_Legacy%20Code%20Modernization.pdf>

5. arXiv, "Migrating Codebases Between Large Language Model Generations", 2025.
   Disponível em: <https://arxiv.org/abs/2502.19876>

6. McKinsey, "Legacy Modernization Using AI: Lessons from the Field", 2025.
   Disponível em:
   <https://www.mckinsey.com/capabilities/quantumblack/our-insights/legacy-modernization-ai>

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                        |
| ------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Média — técnicas de versionamento evoluem, mas princípios de migração permanecem |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto — testes de regressão requerem golden datasets caros e avaliação humana     |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Crítica — migrações mal executadas podem causar downtime e perda de dados        |

# Seção 1: Fundamentos da Arquitetura Híbrida

## Overview

Esta seção introduz arquitetura híbrida como disciplina para integrar componentes determinísticos e componentes estocásticos (IA) com fronteiras claras, mecanismos de contenção e governança. O foco é preservar garantias onde elas são necessárias e tratar incerteza como requisito arquitetural, não como detalhe.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Definir arquitetura híbrida e explicar por que ela difere de arquiteturas puramente determinísticas
2. Classificar componentes (determinísticos, estocásticos, de fronteira) e entender implicações de verificação
3. Aplicar princípios de separação de domínios, contenção em profundidade e transparência graduada
4. Identificar anti-padrões comuns (IA em loop crítico, falta de fallback, mistura de domínios)

## 1.1 Introdução: O Novo Paradigma Arquitetural

A arquitetura de software tradicional foi construída sobre premissas de determinismo: componentes com comportamento previsível, interfaces bem definidas, e garantias que podem ser verificadas através de análise estática e testes. Na era dos Large Language Models (LLMs), essas premissas são desafiadas por componentes cujo comportamento é probabilístico, contexto-dependente e, em certos aspectos, inerentemente opacos.

A **Arquitetura Híbrida** é a disciplina de projetar sistemas que integram componentes determinísticos tradicionais com componentes autônomos baseados em IA, estabelecendo fronteiras arquiteturais, protocolos de integração e mecanismos de governança que permitem que esses mundos coexistam de forma segura e produtiva.

### 1.1.1 A Mudança de Paradigma

```
┌─────────────────────────────────────────────────────────────────┐
│              PARADIGMA TRADICIONAL                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sistema = Σ Componentes Determinísticos                        │
│                                                                 │
│  Garantias:                                                     │
│  ├── Comportamento previsível para entradas iguais             │
│  ├── Verificabilidade através de testes unitários              │
│  ├── Análise estática completa                                 │
│  └── Debugging determinístico                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              PARADIGMA HÍBRIDO (SWEBOK-AI v5.0)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Sistema = Componentes Determinísticos ⊕ Componentes de IA      │
│                                                                 │
│  Garantias:                                                     │
│  ├── Componentes críticos permanecem determinísticos           │
│  ├── Componentes de IA operam dentro de fronteiras delimitadas │
│  ├── Supervisão humana em decisões de alto impacto             │
│  └── Fallbacks determinísticos para casos de incerteza         │
│                                                                 │
│  Novos Desafios:                                                │
│  ├── Gestão de variabilidade comportamental                    │
│  ├── Auditabilidade de decisões não-determinísticas            │
│  ├── Contenção de falhas em cascata                            │
│  └── Sincronização de contexto entre mundos                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.1.2 Definição de Arquitetura Híbrida

**Arquitetura Híbrida** é uma arquitetura de software que:

1. **Combina** componentes determinísticos (código tradicional) com componentes estocásticos (modelos de IA)
2. **Estabelece** fronteiras arquiteturais claras entre esses domínios
3. **Define** protocolos de integração que respeitem as propriedades de cada mundo
4. **Implementa** mecanismos de supervisão, fallback e contenção
5. **Garante** auditabilidade de decisões tomadas por componentes autônomos

## 1.2 Taxonomia de Componentes em Arquiteturas Híbridas

### 1.2.1 Componentes Determinísticos

Componentes tradicionais que mantêm comportamento previsível:

| Característica | Descrição |
|----------------|-----------|
| Comportamento | Idêntico para mesmas entradas |
| Verificação | Testes unitários, integração, análise estática |
| Debugging | Reprodutível e determinístico |
| Garantias | Podem ser provadas formalmente |
| Exemplos | Regras de negócio, cálculos financeiros, autenticação |

### 1.2.2 Componentes Estocásticos (IA)

Componentes baseados em modelos de linguagem ou outros modelos de ML:

| Característica | Descrição |
|----------------|-----------|
| Comportamento | Variável para mesmas entradas |
| Verificação | Estatística, amostral, baseada em propriedades |
| Debugging | Interpretação de contexto e prompts |
| Garantias | Probabilísticas, com intervalos de confiança |
| Exemplos | Geração de texto, análise de sentimento, recomendação |

### 1.2.3 Componentes de Fronteira

Componentes especializados na interface entre os dois mundos:

```python
from typing import TypeVar, Generic, Optional
from dataclasses import dataclass
from enum import Enum

class CertaintyLevel(Enum):
    DETERMINISTIC = "deterministic"
    HIGH_CONFIDENCE = "high_confidence"
    UNCERTAIN = "uncertain"
    FALLBACK = "fallback"

@dataclass
class HybridResult:
    """
    Resultado tipado para comunicação entre componentes
    determinísticos e estocásticos.
    """
    value: any
    certainty: CertaintyLevel
    confidence_score: Optional[float]
    source: str  # Identificador do componente gerador
    reasoning_trace: Optional[str]
    fallback_triggered: bool = False

class BoundaryAdapter:
    """
    Adaptador de fronteira entre componentes determinísticos
    e componentes de IA.
    """
    
    def __init__(self, 
                 llm_component,
                 deterministic_fallback,
                 confidence_threshold: float = 0.8):
        self.llm = llm_component
        self.fallback = deterministic_fallback
        self.threshold = confidence_threshold
    
    async def process(self, input_data: dict) -> HybridResult:
        """
        Processa entrada através do componente de IA,
        aplicando fallback quando necessário.
        """
        try:
            llm_result = await self.llm.generate(input_data)
            
            if llm_result.confidence >= self.threshold:
                return HybridResult(
                    value=llm_result.content,
                    certainty=CertaintyLevel.HIGH_CONFIDENCE,
                    confidence_score=llm_result.confidence,
                    source="llm",
                    reasoning_trace=llm_result.rationale
                )
            else:
                # Baixa confiança, usar fallback
                fallback_result = self.fallback.execute(input_data)
                return HybridResult(
                    value=fallback_result,
                    certainty=CertaintyLevel.FALLBACK,
                    confidence_score=None,
                    source="fallback",
                    reasoning_trace="Low confidence in LLM output",
                    fallback_triggered=True
                )
        except Exception as e:
            # Falha do componente de IA
            fallback_result = self.fallback.execute(input_data)
            return HybridResult(
                value=fallback_result,
                certainty=CertaintyLevel.FALLBACK,
                confidence_score=0.0,
                source="fallback",
                reasoning_trace=f"LLM error: {str(e)}",
                fallback_triggered=True
            )
```

## 1.3 Princípios Fundamentais

### 1.3.1 Princípio da Separação de Domínios

> *"Componentes críticos para segurança, compliance ou operações financeiras devem permanecer determinísticos, independentemente da sofisticação dos componentes de IA disponíveis."*

**Critérios para determinar o domínio de um componente:**

| Fator | Determinístico | Estocástico |
|-------|---------------|-------------|
| Impacto de erro | Irreversível ou alto custo | Recuperável |
| Verificabilidade | Deve ser formalmente verificável | Estatística é suficiente |
| Regulamentação | Requer audit trail completo | Flexível |
| Latência requerida | Sub-milissegundo | Aceita variabilidade |

### 1.3.2 Princípio da Contenção em Profundidade

Falhas em componentes de IA não devem propagar para componentes determinísticos críticos:

```
┌─────────────────────────────────────────────────────────────────┐
│                   CONTENÇÃO EM PROFUNDIDADE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nível 1: Isolamento de Processo                               │
│  ├── Componentes de IA em serviços separados                   │
│  └── Comunicação via APIs com timeouts rigorosos               │
│                                                                 │
│  Nível 2: Validação de Saída                                   │
│  ├── Schemas de validação para outputs de IA                   │
│  └── Rejeição de respostas fora de parâmetros                  │
│                                                                 │
│  Nível 3: Circuit Breakers                                     │
│  ├── Detecção de padrões de falha                              │
│  └── Degradação graciosa para fallbacks                        │
│                                                                 │
│  Nível 4: Auditoria e Monitoramento                            │
│  ├── Logging completo de decisões de IA                        │
│  └── Alertas para anomalias comportamentais                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3.3 Princípio da Transparência Graduada

Diferentes stakeholders requerem diferentes níveis de visibilidade:

```python
class TransparencyLevel(Enum):
    """
    Níveis de transparência para decisões de componentes de IA.
    """
    NONE = 0           # Usuário final comum
    CONFIDENCE_ONLY = 1  # Score de confiança visível
    SUMMARY = 2        # Resumo da racionalidade
    DETAILED_TRACE = 3 # Trace completo do raciocínio
    FULL_PROMPT = 4    # Acesso ao prompt e contexto completo

class ExplainabilityProvider:
    """
    Fornece níveis apropriados de explicabilidade
    baseado no perfil do stakeholder.
    """
    
    def explain(self, 
                decision: HybridResult,
                stakeholder_role: str) -> dict:
        """
        Gera explicação apropriada para o stakeholder.
        """
        level = self._get_transparency_level(stakeholder_role)
        
        explanations = {
            TransparencyLevel.NONE: {
                "response": decision.value
            },
            TransparencyLevel.CONFIDENCE_ONLY: {
                "response": decision.value,
                "confidence": decision.confidence_score
            },
            TransparencyLevel.SUMMARY: {
                "response": decision.value,
                "confidence": decision.confidence_score,
                "summary": self._generate_summary(decision)
            },
            TransparencyLevel.DETAILED_TRACE: {
                "response": decision.value,
                "confidence": decision.confidence_score,
                "reasoning": decision.reasoning_trace,
                "sources": self._extract_sources(decision)
            },
            TransparencyLevel.FULL_PROMPT: {
                "response": decision.value,
                "confidence": decision.confidence_score,
                "reasoning": decision.reasoning_trace,
                "full_context": self._get_full_context(decision)
            }
        }
        
        return explanations[level]
```

## 1.4 Padrões Arquiteturais Híbridos

### 1.4.1 Padrão: Fachada Determinística

Uma camada determinística que expõe uma interface estável, enquanto internamente pode utilizar componentes de IA:

```python
class CustomerSupportFacade:
    """
    Fachada determinística para sistema de suporte que
    internamente utiliza IA para triagem e sugestões.
    """
    
    def __init__(self):
        self.classifier = LLMIntentClassifier()
        self.response_generator = LLMResponseGenerator()
        self.escalation_rules = DeterministicEscalationRules()
        self.knowledge_base = VectorKnowledgeBase()
    
    async def process_ticket(self, ticket: SupportTicket) -> TicketResolution:
        """
        Interface determinística: sempre retorna um resultado
        dentro do contrato estabelecido.
        """
        # Passo 1: Classificação (IA)
        classification = await self.classifier.classify(
            ticket.description,
            confidence_threshold=0.85
        )
        
        # Se classificação incerta, usar fallback determinístico
        if not classification.is_confident:
            classification = self._fallback_classification(ticket)
        
        # Passo 2: Verificação de escalada (Determinístico)
        if self.escalation_rules.should_escalate(ticket, classification):
            return TicketResolution(
                action=Action.ESCALATE,
                assignee=self.escalation_rules.get_assignee(classification),
                response=None,
                confidence=1.0
            )
        
        # Passo 3: Geração de resposta (IA com validação)
        response = await self.response_generator.generate(
            ticket=ticket,
            classification=classification,
            context=self.knowledge_base.retrieve_relevant(ticket)
        )
        
        # Validação determinística da resposta
        if not self._validate_response(response):
            response = self._get_standard_response(classification)
        
        return TicketResolution(
            action=Action.RESPOND,
            assignee=None,
            response=response,
            confidence=response.confidence
        )
    
    def _validate_response(self, response: GeneratedResponse) -> bool:
        """
        Validação determinística de resposta gerada por IA.
        """
        checks = [
            len(response.text) > 0,
            len(response.text) < 5000,
            not self._contains_forbidden_phrases(response.text),
            self._has_appropriate_tone(response.text)
        ]
        return all(checks)
```

### 1.4.2 Padrão: Core Determinístico com IA como Serviço

Arquitetura onde o núcleo de negócio é puramente determinístico, e IA é consumida como serviço externo:

```
┌─────────────────────────────────────────────────────────────────┐
│                     SISTEMA HÍBRIDO                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                 CORE DETERMINÍSTICO                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │   │
│  │  │   Regras    │  │  Workflow   │  │  Auditoria  │     │   │
│  │  │  Negócio    │  │   Engine    │  │    Trail    │     │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │   │
│  │  │  Cálculos   │  │  Permissões │  │   Eventos   │     │   │
│  │  │ Financeiros │  │     RBAC    │  │   Domain    │     │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘     │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│                    ┌───────┴───────┐                           │
│                    │   API Gateway  │                           │
│                    │   (Boundary)   │                           │
│                    └───────┬───────┘                           │
│                            │                                    │
│         ┌──────────────────┼──────────────────┐                │
│         │                  │                  │                │
│         ▼                  ▼                  ▼                │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐          │
│  │   Serviço   │   │   Serviço   │   │   Serviço   │          │
│  │ Classificação│   │  Geração    │   │   Embedding │          │
│  │  (IA)       │   │  Texto (IA) │   │   (IA)      │          │
│  └─────────────┘   └─────────────┘   └─────────────┘          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 1.5 Considerações de Implementação

### 1.5.1 Escolha de Tecnologias

**Para Componentes Determinísticos:**
- Priorize implementações com contratos claros (tipos, interfaces, invariantes) e boa testabilidade.
- Adote análise estática e testes automatizados como “linha de base” de verificação.
- Para dados críticos, prefira persistência com garantias de integridade e mecanismos auditáveis.

**Para Componentes de IA:**
- Isole dependências de modelo por trás de adaptadores (para troca e versionamento).
- Padronize validação de entrada/saída e limites operacionais (timeouts, quotas, circuit breakers).
- Use retrieval (RAG) e cache apenas quando houver requisitos explícitos de atualidade, custo e rastreabilidade.

### 1.5.2 Anti-Padrões

| Anti-Padrão | Descrição | Consequência |
|-------------|-----------|--------------|
| IA em Loop Crítico | Componente de IA em caminho de execução síncrono crítico | Latência imprevisível, falhas em cascata |
| Mistura de Domínios | Lógica de negócio misturada com prompts de IA | Difícil de testar, comportamento instável |
| Falta de Fallback | Componente de IA sem alternativa determinística | Indisponibilidade total em falhas |
| Prompts como Código | Prompts complexos sem versionamento | Não-reprodutibilidade |

## 1.6 Exercícios

1. Analise um sistema que você conhece e classifique seus componentes entre determinísticos e estocásticos. Justifique cada classificação.

2. Desenhe uma arquitetura híbrida para um sistema de processamento de reembolsos corporativos, identificando quais componentes devem ser determinísticos e quais podem utilizar IA.

3. Implemente um `BoundaryAdapter` que intermedie entre um componente de classificação de sentimentos baseado em IA e um sistema de atendimento ao cliente.

---

## Practical Considerations

- Delimite “core determinístico” e “zona estocástica”: o que é crítico (segurança, compliance, finanças) permanece verificável de forma determinística.
- Trate a fronteira como produto: contratos tipados, validação de saída e fallback são parte do design arquitetural.
- Planeje observabilidade e auditoria desde o início (inputs, outputs, versões, decisões e gatilhos de fallback).

## Summary

- Arquitetura híbrida integra componentes determinísticos e estocásticos com fronteiras e governança explícitas.
- Princípios-chave: separação de domínios, contenção em profundidade e transparência graduada.
- Anti-padrões recorrentes incluem IA em caminhos críticos síncronos, falta de fallback e mistura de lógica com prompts.

## References

1. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.
2. NYGARD, M. Release It!: Design and Deploy Production-Ready Software. 2007.

*SWEBOK-AI v5.0 - Software Architecture*

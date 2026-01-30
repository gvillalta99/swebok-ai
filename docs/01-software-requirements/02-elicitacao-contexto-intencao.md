# Seção 2: Elicitação de Contexto e Intenção

## Overview

Esta seção reinterpreta a elicitação de requisitos para um cenário em que sistemas generativos conseguem produzir implementações rapidamente, mas dependem de contexto e intenção para evitar soluções plausíveis e incorretas. O foco passa a ser capturar e comunicar o “por quê” e as condições de operação, não apenas listar funcionalidades.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Distinguir requisito (o que) de intenção (por quê) e contexto (em que condições)
2. Modelar dimensões de contexto (negócio, técnico, organizacional, regulatório) com artefatos verificáveis
3. Aplicar técnicas de elicitação de intenção (ex.: laddering, JTBD) para derivar restrições
4. Estruturar documentação de intenção adequada para consumo por sistemas/automações
5. Identificar anti-padrões de elicitação em cenários human-in-the-loop

## 2.1 Introdução

A elicitação tradicional de requisitos focava na extração de funcionalidades desejadas dos stakeholders. Na era dos LLMs, essa abordagem torna-se insuficiente: saber *o que* construir é menos crítico do que saber *em que contexto* e *com que propósito*.

A **Elicitação de Contexto e Intenção** é o processo sistemático de descobrir, documentar e comunicar o ambiente operacional, as restrições de domínio e as intenções profundas que devem governar o comportamento de sistemas autônomos.

## 2.2 Fundamentos do Contexto

### 2.2.1 Dimensões do Contexto

O contexto de um sistema de software pode ser decomposto em múltiplas dimensões:

```
                    ┌─────────────────┐
                    │    NEGÓCIO      │
                    │   (Por quê?)    │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   TÉCNICO     │    │   ORGANIZAC.  │    │   REGULATÓRIO │
│  (Como?)      │    │   (Quem?)     │    │   (O que?)    │
└───────────────┘    └───────────────┘    └───────────────┘
```

#### Contexto de Negócio
- Objetivos estratégicos que o sistema deve suportar
- Métricas de sucesso e KPIs
- Restrições orçamentárias e temporais
- Riscos de negócio associados

#### Contexto Técnico
- Stack tecnológica existente
- Arquitetura de referência
- Padrões de integração
- Limitações de infraestrutura

#### Contexto Organizacional
- Stakeholders e suas responsabilidades
- Processos de negócio afetados
- Cultura organizacional e resistências
- Capacidades da equipe

#### Contexto Regulatório
- Legislações aplicáveis (LGPD, GDPR, SOX, etc.)
- Padrões de compliance setoriais
- Requisitos de auditoria e rastreabilidade
- Certificações necessárias

### 2.2.2 Modelagem de Contexto

A modelagem de contexto utiliza diversas técnicas para capturar e representar o ambiente:

| Técnica | Propósito | Saída |
|---------|-----------|-------|
| Rich Pictures | Capturar complexidade social e política | Diagrama visual rico |
| Stakeholder Maps | Identificar influências e interesses | Matriz de poder/interesse |
| Domain Storytelling | Compreender processos de negócio | Narrativas estruturadas |
| Context Diagrams | Delimitar fronteiras do sistema | Diagrama de contexto |

## 2.3 Elicitação de Intenção

### 2.3.1 Intenção vs. Requisito

A distinção entre intenção e requisito é fundamental:

- **Requisito**: Descrição específica de uma funcionalidade ou restrição
- **Intenção**: Propósito subjacente que justifica e orienta múltiplos requisitos

**Exemplo:**
- Intenção: "Garantir que dados sensíveis nunca sejam expostos indevidamente"
- Requisitos derivados:
  - "Dados de cartão de crédito devem ser criptografados em repouso"
  - "Logs não devem conter informações PII em texto plano"
  - "Sessões de usuário devem expirar após inatividade"

### 2.3.2 Técnicas de Elicitação de Intenção

#### Why-How Laddering (Escada Porquê-Como)

Técnica para navegar entre diferentes níveis de abstração:

```
                    ┌─────────────────┐
                    │  Objetivo       │
                    │  Estratégico    │
                    └────────┬────────┘
                           Por quê?
                             │
                    ┌────────▼────────┐
                    │   Intenção      │
                    │   de Negócio    │
                    └────────┬────────┘
                           Por quê?
                             │
                    ┌────────▼────────┐
                    │   Intenção      │
                    │   de Sistema    │
                    └────────┬────────┘
                           Por quê?
                             │
                    ┌────────▼────────┐
                    │    Requisito    │
                    │    Específico   │
                    └─────────────────┘
```

#### Job-to-be-Done (JTBD)

Framework para entender o "trabalho" que o usuário contrata o sistema para realizar:

- **Job Funcional**: Tarefa prática a ser executada
- **Job Emocional**: Como o usuário quer se sentir
- **Job Social**: Como o usuário quer ser percebido

### 2.3.3 Documentação de Intenção

A intenção deve ser documentada de forma apropriada para consumo por sistemas autônomos:

```markdown
## Intenção: [Nome Descritivo]

**Contexto**: [Situação que motiva a intenção]

**Propósito**: [Objetivo que se busca alcançar]

**Princípios Orientadores**:
- [Princípio 1]
- [Princípio 2]

**Restrições Derivadas**:
- [Restrição 1]
- [Restrição 2]

**Consequências de Violação**:
- [Consequência 1]
- [Consequência 2]
```

## 2.4 Técnicas de Elicitação para Sistemas com IA

### 2.4.1 Prompt Engineering como Elicitação

A interação com LLMs para elicitação requer técnicas específicas:

**Prompts Estruturados para Elicitação:**

```
Contexto: [Descrição do domínio e problema]

Stakeholders Identificados: [Lista de pessoas/papéis]

Objetivo: Identificar restrições críticas que governariam 
o desenvolvimento de [sistema] neste contexto.

Por favor, elicite:
1. Restrições funcionais negativas (o que NÃO fazer)
2. Restrições de domínio específicas
3. Invariantes que devem ser preservadas
4. Comportamentos de degradação esperados

Para cada restrição identificada, inclua:
- A origem (stakeholder ou contexto)
- A criticidade (Alta/Média/Baixa)
- Uma forma de verificação
```

### 2.4.2 Técnicas Colaborativas com IA

#### Elicitação Iterativa Reforçada

Ciclo de refinamento contínuo:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Humano        │────▶│      LLM        │────▶│   Humano        │
│  (fornece       │     │  (gera          │     │  (avalia,       │
│   contexto)     │     │   hipóteses)    │     │   corrige)      │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
        ▲                                                │
        └────────────────────────────────────────────────┘
                        Refinamento
```

#### Detecção de Conflitos

Utilização de LLMs para identificar conflitos potenciais entre requisitos elicitados:
- Inconsistências lógicas
- Contradições entre stakeholders
- Conflitos entre restrições e intenções

### 2.4.3 Validação de Completude

Critérios para avaliar a completude da elicitação:

| Critério | Descrição | Métrica |
|----------|-----------|---------|
| Cobertura de Stakeholders | Todos os grupos relevantes foram consultados | % de stakeholders mapeados |
| Completude de Contexto | Todas as dimensões relevantes foram exploradas | Checklist de dimensões |
| Rastreabilidade | Cada restrição pode ser rastreada a uma fonte | % de rastreabilidade |
| Verificabilidade | Cada restrição pode ser verificada | % de restrições testáveis |

## 2.5 Desafios e Anti-Padrões

### 2.5.1 Viés de Confirmação

**Problema**: Tendência de buscar apenas informações que confirmam hipóteses pré-existentes.

**Mitigação**:
- Diversificar fontes de elicitação
- Utilizar técnicas de elicitação contrárias
- Incluir prompts específicos para desafiar suposições

### 2.5.2 Paralisia por Análise

**Problema**: Elicitação excessiva que impede progresso.

**Mitigação**:
- Estabelecer critérios de parada claros
- Priorizar informações por criticidade
- Adotar abordagem iterativa e incremental

### 2.5.3 Perda de Nuance

**Problema**: Simplificação excessiva de contextos complexos.

**Mitigação**:
- Documentar contexto em múltiplos níveis de abstração
- Incluir casos de borda e exceções
- Preservar ambiguidade quando apropriado

## 2.6 Ferramentas e Tecnologias

### 2.6.1 Ferramentas Tradicionais Adaptadas

Evite tratar ferramentas como solução. O ponto central é a padronização do formato e a rastreabilidade do que foi elicitado. Categorias comuns:

| Categoria | Adaptação para IA | Uso |
|-----------|-------------------|-----|
| Gestão de trabalho (issues/wiki) | Templates de contexto, intenção e restrições | Documentação estruturada e auditável |
| Quadros/diagramas colaborativos | Diagramas de contexto com fronteiras explícitas | Alinhamento e revisão com stakeholders |
| Bases tabulares/semânticas | Catálogo de restrições com metadados | Priorização, rastreabilidade e verificação |

### 2.6.2 Ferramentas Emergentes

- **LLM-native requirements tools**: Sistemas especializados em elicitação assistida por IA
- **Knowledge graphs**: Representação semântica de contexto e intenção
- **Constraint specification languages**: Linguagens formais para especificação de restrições

## 2.7 Estudos de Caso

### 2.7.1 Caso: Sistema Financeiro de Alta Frequência

**Contexto**: Sistema de trading algorítmico com requisitos de latência extremos.

**Intenção Central**: "Maximizar retorno dentro de limites de risco absolutos"

**Restrições Derivadas**:
- Posição máxima por ativo: limitada por VaR diário
- Latência máxima: 50µs para decisões críticas
- Circuit breakers: interrupção automática em condições de mercado extremas

### 2.7.2 Caso: Sistema de Saúde com IA

**Contexto**: Sistema de apoio a diagnóstico médico.

**Intenção Central**: "Auxiliar profissionais de saúde sem substituir julgamento clínico"

**Restrições Derivadas**:
- Nunca prescrever tratamentos sem validação humana
- Apresentar nível de confiança em todas as recomendações
- Registrar todas as interações para auditoria

## 2.8 Exercícios

1. Para um sistema de e-commerce, elicite:
   - 3 intenções de negócio fundamentais
   - 5 restrições funcionais negativas
   - 3 restrições não-funcionais críticas

2. Analise o seguinte requisito e extraia a intenção subjacente:
   "O sistema deve processar pagamentos em menos de 2 segundos"

3. Crie um prompt estruturado para elicitar restrições de um sistema autônomo de veículos.

---

## Practical Considerations

- Comece pela intenção antes de detalhar requisitos: para cada requisito, registre explicitamente qual risco/objetivo ele protege.
- Documente contexto em camadas: um resumo executivo (para decisão) e um detalhamento operacional (para verificação e auditoria).
- Para uso com IA, padronize formatos e campos obrigatórios (origem, criticidade, forma de verificação, consequências de violação).
- Trate “prompts de elicitação” como artefatos transicionais: úteis para acelerar descoberta, mas insuficientes sem validação humana e rastreabilidade.

## Summary

- Elicitar contexto e intenção reduz ambiguidade e limita soluções “plausíveis, porém erradas” geradas por automação.
- Contexto pode ser modelado em dimensões complementares; intenção conecta requisitos a objetivos e riscos.
- Técnicas como laddering e JTBD ajudam a derivar restrições e critérios de verificação.
- Anti-padrões recorrentes (viés de confirmação, paralisia por análise, perda de nuance) exigem critérios de parada e revisão.

## References

1. ISO/IEC/IEEE. ISO/IEC/IEEE 29148: Systems and software engineering — Life cycle processes — Requirements engineering. 2018.
2. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

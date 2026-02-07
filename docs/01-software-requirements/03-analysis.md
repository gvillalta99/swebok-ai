---
title: Análise de Requisitos com IA
created_at: 2025-02-07
tags: [software-requirements, analise, ambiguidade, impacto, priorizacao, clustering, consistencia]
status: draft
updated_at: 2025-02-07
ai_model: k2p5
---

# 3. Análise de Requisitos com IA

## 3.1 Detecção de Ambiguidade

A ambiguidade é o inimigo histórico da engenharia de requisitos. Termos como
"rápido", "user-friendly", "robusto" ou "seguro" são interpretados de formas
distintas por diferentes stakeholders, levando a implementações que não
satisfazem necessidades reais. A detecção automática de ambiguidade com LLMs
representa uma aplicação de alto impacto, endereçando um problema que técnicas
tradicionais identificam apenas em revisões manuais extensivas.

### 3.1.1 Identificação Automática de Termos Ambíguos

LLMs podem analisar requisitos textuais identificando:

- **Substantivos imprecisos**: "sistema", "interface", "dados" sem especificação
- **Adjetivos subjetivos**: "rápido", "bom", "suficiente", "adequado"
- **Adverbios vagos**: "geralmente", "normalmente", "quando necessário"
- **Verbos sem clareza**: "processar", "manipular", "lidar com"
- **Escopo indefinido**: "alguns", "vários", "muitos", "todos" (quando não
  quantificado)
- **Condições implícitas**: Requisitos que não especificam quando ou sob quais
  condições aplicam-se

**Template de Prompt para Detecção de Ambiguidade:**

```
[CONTEXT]
Você é um analista de qualidade de requisitos especializado em identificar
ambiguidades. Você utiliza frameworks como o SMELL (Subjective, Missing,
Erroneous, Latent, Lack of information) para análise.

[TASK]
Analise o seguinte requisito e identifique todas as ambiguidades presentes.
Para cada ambiguidade encontrada, forneça sugestões de clarificação.

[REQUISITO]
"{{requirement_text}}"

[OUTPUT FORMAT]
Para cada ambiguidade:
- Termo/Frase ambígua: [texto exato]
- Tipo: [Subjetivo/Incompleto/Impreciso/Implícito/Outro]
- Problema: Por que é ambíguo?
- Impacto potencial: O que pode dar errado?
- Sugestão de clarificação: Como tornar preciso?
- Exemplo melhorado: Versão não-ambígua do trecho

[CONSTRAINTS]
- Seja específico: cite palavras ou frases exatas
- Considere múltiplos interpretações possíveis
- Avalie de perspectivas técnicas e de negócio
- Identifique dependências não declaradas
```

### 3.1.2 Sugestões de Clarificação

Além de identificar ambiguidades, LLMs podem sugerir reformulações específicas:

**Exemplo de Análise:**

```
Requisito original: "O sistema deve ser rápido"

Análise do LLM:
1. Termo ambíguo: "rápido"
   Tipo: Subjetivo
   Problema: Não define métricas de performance
   Impacto: Desenvolvedor pode interpretar como <1s, stakeholder espera <100ms
   Sugestão: Especificar tempo de resposta máximo em condições definidas
   Exemplo: "O sistema deve responder em menos de 200ms para 95% das requisições
            sob carga normal (até 1000 usuários simultâneos)"
```

### 3.1.3 Análise de Consistência entre Requisitos

Conjuntos grandes de requisitos frequentemente contêm inconsistências não
detectadas:

- **Conflitos diretos**: Requisitos que se contradizem explicitamente
- **Conflitos de escopo**: Requisitos que cobrem território sobreposto de formas
  incompatíveis
- **Conflitos de prioridade**: Requisitos que, se implementados juntos, excedem
  restrições de recursos
- **Conflitos temporais**: Requisitos que não podem ser satisfeitos
  simultaneamente em um cronograma

**Abordagem de Análise:**

1. Vetorização semântica de todos os requisitos (embeddings)
2. Cálculo de similaridade entre pares de requisitos
3. Identificação de clusters densos (potencial overlap)
4. Análise LLM de pares de alta similaridade para detecção de conflitos
5. Geração de matriz de consistência

**Ferramentas Comerciais:**

- **IBM RQA (Requirements Quality Assistant)**: Watson NLP para detecção de
  ambiguidades em tempo real, integrado ao IBM Engineering Lifecycle Management
- **Qualicen**: Análise de qualidade de requisitos com machine learning
- **Soluções open-source**: Detectores baseados em regras linguísticas + LLMs

## 3.2 Clustering e De-duplicação

Projetos de software, especialmente em ambientes ágeis, frequentemente acumulam
requisitos redundantes ao longo do tempo. User Stories similares são criadas por
diferentes membros da equipe; requisitos de fontes distintas descrevem a mesma
necessidade com terminologia diferente.

### 3.2.1 Agrupamento Automático de User Stories

O processo de clustering de requisitos envolve:

1. **Vetorização**: Conversão de cada requisito para embedding semântico
2. **Cálculo de similaridade**: Métricas como cosine similarity ou distância
   euclidiana
3. **Agrupamento**: Algoritmos como K-means, DBSCAN ou clustering hierárquico
4. **Rotulação**: Identificação de tema comum para cada cluster

**Métricas de Similaridade:**

- **Cosine Similarity**: Mede o ângulo entre vetores de embedding (0-1)
- **Euclidean Distance**: Distância direta no espaço vetorial
- **Jaccard Similarity**: Interseção sobre união de termos (para abordagem
  léxica)

**Thresholds Recomendados:**

- Similaridade > 0.85: Provável duplicata
- Similaridade > 0.70: Requisitos relacionados, avaliar merge
- Similaridade > 0.50: Mesmo domínio, possível dependência

### 3.2.2 Identificação de Requisitos Duplicados

Duplicatas podem ser:

- **Exatas**: Mesmo texto, possivelmente copiado
- **Sintáticas**: Texto diferente, mas mesma semântica
- **Funcionais**: Descrevem funcionalidades sobrepostas
- **Não-funcionais**: Atributos de qualidade conflitantes ou redundantes

**Template de Análise de Duplicatas:**

```
[CONTEXT]
Você é um analista de requisitos identificando duplicatas em um backlog.
Você considera similaridade semântica, não apenas textual.

[TASK]
Analise os seguintes requisitos e identifique duplicatas potenciais.
Para cada par de requisitos similares, determine:
- Grau de similaridade: [Alta/Média/Baixa]
- Tipo: [Exata/Sintática/Funcional/Parcial]
- Ação recomendada: [Merge/Manter ambos/Descartar um/Reescrever]
- Justificativa: Por que esta ação?

[REQUISITOS]
1. {{requirement_1}}
2. {{requirement_2}}
...

[OUTPUT FORMAT]
Para cada par similar:
- Requisitos: [ID1] + [ID2]
- Similaridade: [score]
- Análise: Descrição das semelhanças e diferenças
- Recomendação: Ação específica com justificativa
- Requisito unificado (se aplicável): Versão mesclada
```

### 3.2.3 NLP para Análise Semântica

Técnicas avançadas de NLP vão além de similaridade superficial:

- **Entity Recognition**: Identificação de entidades de domínio (usuários,
  sistemas, processos)
- **Relation Extraction**: Mapeamento de relações entre entidades
- **Coreference Resolution**: Identificação de quando diferentes termos
  referem-se ao mesmo conceito
- **Semantic Role Labeling**: Identificação de agente, ação, paciente em cada
  requisito

Estas técnicas permitem identificar que "O administrador pode criar usuários" e
"Usuários são criados pelo admin" descrevem a mesma funcionalidade, apesar da
estrutura sintática diferente.

## 3.3 Análise de Impacto com LLMs

A análise de impacto é uma atividade crítica e frequentemente subestimada:
quando um requisito muda, quais outros requisitos, componentes ou stakeholders
são afetados? Em sistemas complexos, cadeias de dependência não óbvias podem
levar a consequências não intencionais de mudanças aparentemente simples.

### 3.3.1 Avaliação de Impacto de Mudanças

LLMs podem analisar o impacto de uma mudança proposta considerando:

- **Dependências diretas**: Requisitos que referenciam explicitamente o
  requisito alterado
- **Dependências indiretas**: Requisitos que dependem de requisitos dependentes
- **Requisitos irmãos**: Requisitos no mesmo domínio funcional
- **Contraintuitivos**: Requisitos aparentemente não relacionados mas que
  compartilham premissas

**Template de Análise de Impacto:**

```
[CONTEXT]
Você é um arquiteto de soluções realizando análise de impacto de mudanças.
Você considera dependências funcionais, técnicas e organizacionais.

[TASK]
Analise o impacto da seguinte mudança proposta no conjunto de requisitos.

[REQUISITO A SER ALTERADO]
{{original_requirement}}

[MUDANÇA PROPOSTA]
{{proposed_change}}

[CONJUNTO DE REQUISITOS EXISTENTES]
{{all_requirements}}

[OUTPUT FORMAT]
1. Requisitos Diretamente Afetados:
   - Lista de requisitos que referenciam ou dependem do requisito alterado
   - Natureza do impacto: [Quebra/Adaptação necessária/Revisão recomendada]

2. Requisitos Indiretamente Afetados:
   - Cadeias de dependência de segundo ou terceiro nível
   - Risco de efeito cascata

3. Componentes Técnicos Impactados:
   - Módulos, APIs, banco de dados
   - Estimativa de esforço de refatoração

4. Stakeholders a Notificar:
   - Quem precisa ser informado desta mudança

5. Riscos Identificados:
   - Potenciais problemas da mudança

6. Alternativas:
   - Sugestões de implementação que minimizam impacto
```

### 3.3.2 Identificação de Dependências Ocultas

Dependências ocultas são aquelas não declaradas explicitamente nos requisitos,
mas que emergem da lógica de negócio ou arquitetura implícita:

**Exemplo:**

```
Requisito A: "O sistema deve calcular impostos automaticamente"
Requisito B: "O sistema deve permitir edição manual de valores fiscais"

Dependência oculta: Se B permite edição manual que contradiz A, há conflito
não explicitado. A análise de impacto deve identificar que mudanças em A
afetam a validade de B.
```

### 3.3.3 Técnica Chain-of-Thought para Análise de Impacto

A técnica Chain-of-Thought (CoT), ou "Cadeia de Pensamento", instrui o LLM a
mostrar seu raciocínio passo a passo, aumentando a qualidade da análise:

```
[CHAIN-OF-THOUGHT INSTRUCTION]
Analise o impacto passo a passo:
1. Primeiro, identifique o que o requisito original faz
2. Em seguida, determine o que muda com a alteração proposta
3. Liste todos os requisitos que mencionam ou dependem do requisito original
4. Para cada um, avalie se a mudança o afeta e como
5. Considere requisitos não relacionados diretamente mas que compartilham premissas
6. Finalmente, sintetize os achados em prioridades de ação
```

Estudos demonstram que CoT melhora significativamente a completude da análise de
impacto, reduzindo casos de dependências não detectadas.

## 3.4 Negociação e Priorização

A priorização de requisitos é uma atividade de tomada de decisão multi-critério
que beneficia-se da capacidade de LLMs em analisar trade-offs e propor
ordenações baseadas em múltiplas dimensões.

### 3.4.1 Análise Multi-Critério com IA

Critérios típicos de priorização:

- **Valor de negócio**: Impacto nos objetivos organizacionais
- **Custo de implementação**: Esforço técnico estimado
- **Risco técnico**: Incertezas e complexidades
- **Dependências**: Pré-requisitos para outros requisitos
- **Urgência**: Prazos regulatórios ou de mercado
- **Viabilidade**: Capacidade técnica da equipe

**Framework de Priorização com LLM:**

```
[CONTEXT]
Você é um Product Owner realizando priorização de backlog.
Você utiliza MoSCoW (Must have, Should have, Could have, Won't have)
como framework principal.

[TASK]
Priorize o seguinte conjunto de requisitos considerando os critérios fornecidos.

[CRITÉRIOS E PESOS]
- Valor de negócio: 30%
- Custo de implementação: 25%
- Risco técnico: 20%
- Urgência: 25%

[REQUISITOS]
{{list_of_requirements_with_estimates}}

[OUTPUT FORMAT]
Para cada requisito:
- ID: [identificador]
- Prioridade: [Must/Should/Could/Won't]
- Justificativa: Explicação baseada nos critérios
- Score calculado: Valor numérico
- Riscos: Potenciais problemas na implementação
- Dependências: O que deve ser feito antes

Além disso, forneça:
- Análise de trade-offs: Decisões difíceis e por que foram tomadas
- Sugestões de agrupamento: Requisitos que devem ser entregues juntos
- Roadmap proposto: Sequência de entregas em 3 releases
```

### 3.4.2 Identificação de Conflitos entre Stakeholders

Diferentes stakeholders frequentemente têm prioridades conflitantes:

- Marketing quer features visíveis rapidamente
- Técnico quer refatoração e débito técnico
- Compliance quer auditoria e logging
- Operações quer estabilidade e monitoramento

LLMs podem analisar posições de stakeholders e identificar conflitos:

```
[STAKEHOLDER ANALYSIS]
Stakeholder: Marketing
Prioridades: [Lista de requisitos valorizados]
Argumentos: [Justificativas fornecidas]

Stakeholder: Engenharia
Prioridades: [Lista]
Argumentos: [Justificativas]

[CONFLICT DETECTION]
Identifique:
1. Requisitos onde há desacordo direto
2. Compromissos possíveis (win-win)
3. Trade-offs necessários (zero-sum)
4. Sugestões de medição ou experimento para decidir
```

### 3.4.3 Framework Tree-of-Thought para Decisões

Tree-of-Thought (ToT) estende CoT explorando múltiplos caminhos de raciocínio em
paralelo, útil para decisões complexas de priorização:

```
[TREE-OF-THOUGHT]
Considere três estratégias de priorização diferentes:

Caminho A: Foco em valor de negócio imediato
- Lógica: Maximizar ROI de curto prazo
- Riscos: Acumular débito técnico
- Resultado esperado: [Análise]

Caminho B: Foco em fundamentação técnica
- Lógica: Construir base sólida primeiro
- Riscos: Demora em entregar valor visível
- Resultado esperado: [Análise]

Caminho C: Abordagem balanceada
- Lógica: Alternar entre features e fundamentação
- Riscos: Context switching, lentidão
- Resultado esperado: [Análise]

[COMPARISON]
Compare os três caminhos considerando:
- ROI total em 6 meses
- Risco de falha técnica
- Satisfação de stakeholders
- Viabilidade de execução

[RECOMMENDATION]
Recomende uma estratégia com justificativa.
```

## 3.5 Considerações Práticas

### 3.5.1 Integração com Ferramentas de Gestão

A análise automatizada de requisitos deve integrar-se ao fluxo de trabalho
existente:

- **Jira**: Plugins que analisam issues em tempo real
- **Azure DevOps**: Validação de User Stories no momento da criação
- **GitHub**: Análise de PRs que modificam requisitos
- **Confluence**: Análise de documentação de especificação

### 3.5.2 Limitações da Análise Automatizada

**Contexto de Domínio Limitado** LLMs genéricos podem não capturar nuances
específicas de domínios altamente especializados (financeiro, healthcare,
aeroespacial).

**Mitigação**: Fine-tuning em corpus de domínio ou uso de RAG com bases de
conhecimento especializadas.

**Dependência de Qualidade de Entrada** A qualidade da análise depende da
qualidade dos requisitos de entrada. Requisitos muito vagos ou mal escritos
produzem análises de baixa utilidade.

**Mitigação**: Aplicar técnicas de elicitação assistida (Seção 2) antes da
análise.

**Falsa Segurança** Uma análise automatizada pode criar falsa sensação de
completude, levando a negligenciar revisão humana.

**Mitigação**: Sempre incluir validação humana como gate obrigatório; tratar
análise de IA como input, não decisão final.

### 3.5.3 Métricas de Sucesso

Para avaliar a eficácia da análise automatizada:

- **Precisão de detecção**: Taxa de verdadeiros positivos na identificação de
  problemas
- **Cobertura**: Percentual de problemas reais detectados vs. total
- **Tempo de análise**: Redução no tempo de revisão de requisitos
- **Defeitos em produção**: Redução de bugs relacionados a requisitos mal
  especificados
- **Satisfação da equipe**: Percepção de valor da ferramenta

## Referências

1. **Kässinger, F., et al. (2024).** "Exploring LLMs for Verifying Technical
   System Specifications Against Requirements." *arXiv:2411.11582*.
   <https://arxiv.org/abs/2411.11582>

2. **Ebrahim, A., et al. (2025).** "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *ACL Anthology 2025*.
   <https://aclanthology.org/2025.acl-srw.31/>

3. **IBM. (2024).** "Engineering Requirements Quality Assistant (RQA)." *IBM
   Documentation*. <https://www.ibm.com/docs/en/erqa>

4. **Hemmat, M., et al. (2025).** "Research Directions for Using LLM in Software
   Requirement Engineering: A Systematic Review." *Frontiers in Computer
   Science, 7*.
   <https://www.frontiersin.org/journals/computer-science/articles/10.3389/fcomp.2025.1519437/full>

5. **Arora, C., et al. (2024).** "Using LLMs in Software Requirements
   Specifications: An Empirical Evaluation." *arXiv:2404.17842*.
   <https://arxiv.org/abs/2404.17842>

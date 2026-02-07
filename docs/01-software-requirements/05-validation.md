---
title: Validação e Verificação Automatizada
created_at: 2025-02-07
tags: [software-requirements, validacao, verificacao, testes-aceitacao, qualidade, criterios-aceitacao, gherkin]
status: in-progress
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# 5. Validação e Verificação Automatizada

## 5.1 Verificação de Completude

A completude de um conjunto de requisitos determina se todos os aspectos
necessários do sistema foram especificados. Requisitos incompletos são uma das
principais fontes de retrabalho em projetos de software. A verificação
automatizada de completude com LLMs oferece uma primeira linha de defesa,
identificando gaps antes que se tornem problemas de implementação.

### 5.1.1 Análise de Cobertura de Requisitos

A cobertura pode ser analisada em múltiplas dimensões:

- **Cobertura funcional**: Todas as funcionalidades necessárias estão
  especificadas?
- **Cobertura de stakeholders**: Todos os perfis de usuários foram considerados?
- **Cobertura de cenários**: Fluxos alternativos e de exceção foram
  documentados?
- **Cobertura não-funcional**: Atributos de qualidade foram abordados?
- **Cobertura regulatória**: Todos os requisitos legais foram incluídos?

**Template de Verificação de Cobertura:**

```
[CONTEXT]
Você é um auditor de qualidade de requisitos verificando a completude
de um conjunto de especificações para [tipo de sistema] no domínio de [domínio].

[TASK]
Analise o seguinte conjunto de requisitos e avalie a cobertura em
cada dimensão crítica.

[REQUISITOS]
{{list_of_requirements}}

[DIMENSÕES DE COBERTURA]
1. Funcional: Processos de negócio, interações usuário-sistema
2. Stakeholders: Perfis de usuários e suas necessidades
3. Cenários: Fluxos principais, alternativos, exceções
4. Não-funcional: Performance, segurança, usabilidade, confiabilidade
5. Dados: Entidades, atributos, relacionamentos, integridade
6. Integração: Interfaces com sistemas externos
7. Regulatório: Compliance com normas aplicáveis

[OUTPUT FORMAT]
Para cada dimensão:
- Status: [Completo/Parcial/Incompleto]
- Score: 0-100%
- Gaps identificados: Lista de itens faltantes
- Recomendação: Ações específicas para melhorar cobertura

Visão geral:
- Score agregado de cobertura
- Top 3 prioridades para endereçar
```

### 5.1.2 Identificação de Gaps

Gaps em requisitos podem ser de vários tipos:

- **Omissões completas**: Funcionalidades inteiras não mencionadas
- **Especificação superficial**: Tópico mencionado mas não detalhado
- **Dependências não declaradas**: Requisitos que pressupõem outros não
  especificados
- **Cenários edge**: Situações extremas não consideradas

**Exemplo de Análise de Gap:**

```
Requisitos fornecidos:
1. "O sistema deve processar pagamentos"
2. "O sistema deve enviar confirmação por email"

Gaps identificados:
- Omissão: Métodos de pagamento aceitos não especificados
- Omissão: Tratamento de pagamentos recusados
- Omissão: Política de reembolso
- Superficial: "Processar pagamentos" não define fluxo, estados, notificações
- Dependência: Envio de email pressupõe integração com serviço SMTP
```

### 5.1.3 Sugestão de Requisitos Faltantes

Além de identificar gaps, LLMs podem sugerir requisitos específicos para
preenchê-los:

**Prompt para Sugestão:**

```
[CONTEXT]
Conjunto de requisitos incompleto para [descrição do sistema].
Gaps identificados na análise anterior: [lista de gaps].

[TASK]
Para cada gap identificado, sugira:
1. Requisitos específicos que preencham o gap
2. Prioridade sugerida (Must/Should/Could)
3. Dependências com requisitos existentes
4. Questões para validar com stakeholders

[CONSTRAINTS]
- Sugira apenas requisitos viáveis e relevantes
- Evite suposições sem base nos requisitos existentes
- Indique onde informações adicionais são necessárias
```

### 5.1.4 Checklists Automatizados

Checklists são ferramentas eficazes para garantir que nenhum aspecto crítico
seja esquecido. LLMs podem gerar checklists contextualizados:

**Checklist por Tipo de Sistema:**

| Tipo de Sistema | Itens de Checklist                                                 |
| --------------- | ------------------------------------------------------------------ |
| Web Application | Autenticação, autorização, sessões, responsividade, SEO, analytics |
| Mobile App      | Offline mode, notificações push, lifecycle, permissões, stores     |
| API             | Versionamento, rate limiting, documentação, schemas, caching       |
| Data Pipeline   | Provenance, qualidade, lineage, governança, retenção               |
| Embedded        | Timing, memória, energia, watchdogs, OTA updates                   |

**Exemplo de Geração de Checklist:**

```
[CONTEXT]
Sistema: Aplicativo móvel de banking
Plataformas: iOS e Android
Requisitos regulatórios: Banco Central, LGPD

[GERAÇÃO DE CHECKLIST]
Gere um checklist completo de verificação de requisitos, organizado por categoria.
Para cada item, indique:
- Descrição do que verificar
- Prioridade (Crítica/Alta/Média/Baixa)
- Método de verificação

[CATEGORIAS]
1. Segurança e Autenticação
2. Privacidade e LGPD
3. Funcionalidades Core
4. UX/UI
5. Performance
6. Compliance Regulatório
7. Disponibilidade e Resiliência
```

## 5.2 Verificação de Consistência

### 5.2.1 Detecção de Conflitos entre Requisitos

Conflitos entre requisitos são comuns em projetos com múltiplos stakeholders ou
desenvolvidos ao longo de tempo. Tipos de conflito:

- **Conflitos funcionais**: Requisitos que especificam comportamentos
  contraditórios
- **Conflitos de prioridade**: Requisitos concorrendo por recursos limitados
- **Conflitos de escopo**: Requisitos que expandem o escopo além do planejado
- **Conflitos técnicos**: Requisitos que exigem tecnologias incompatíveis

**Template de Detecção de Conflitos:**

```
[CONTEXT]
Análise de consistência para conjunto de requisitos de [sistema].

[TASK]
Analise os seguintes requisitos e identifique todos os conflitos potenciais.

[REQUISITOS]
{{requirements_list}}

[OUTPUT FORMAT]
Para cada conflito identificado:
- Tipo: [Funcional/Prioridade/Escopo/Técnico]
- Requisitos envolvidos: [ID1] vs [ID2]
- Natureza do conflito: Descrição clara da contradição
- Severidade: [Crítica/Alta/Média/Baixa]
- Sugestão de resolução: Como reconciliar os requisitos

Matriz de consistência:
- Tabela cruzando todos os requisitos com indicação de conflitos
```

**Exemplo de Conflito Detectado:**

```
Requisito 15: "O sistema deve permitir acesso anônimo aos relatórios públicos"
Requisito 23: "Todos os acessos ao sistema devem ser auditados com identificação do usuário"

Conflito identificado:
- Tipo: Funcional
- Natureza: Acesso anônimo contradiz requisito de identificação
- Severidade: Alta
- Resolução sugerida: Definir "usuário anônimo" como identidade válida para fins de auditoria, ou criar exceção documentada para relatórios públicos
```

### 5.2.2 Análise de Contradições Lógicas

Contradições lógicas ocorrem quando requisitos, em conjunto, são logicamente
impossíveis de satisfazer:

**Exemplos de Contradições:**

- Requisito A: "O sistema deve ter latência < 10ms"
- Requisito B: "O sistema deve processar dados de fonte externa com delay de
  rede de 50ms"

Análise: Se B é verdadeiro (restrição física da rede), A é impossível.

### 5.2.3 Verificação de Conformidade com Padrões

Requisitos devem estar em conformidade com padrões organizacionais e
industriais:

**Padrões Comuns:**

- **IEEE 830**: Estrutura de SRS
- **ISO/IEC/IEEE 29148**: Processos de engenharia de requisitos
- **INCOSE**: Guidelines para requisitos de sistemas
- **Padrões corporativos**: Templates e checklists internos

**Verificação Automatizada:**

```
[CONTEXT]
Verificação de conformidade com padrão [ISO 29148/IEEE 830/etc].

[TASK]
Verifique se os seguintes requisitos estão em conformidade com o padrão.
Identifique desvios e sugira correções.

[PADRÃO]
[descrição ou referência ao padrão]

[REQUISITOS]
{{requirements}}

[OUTPUT]
Para cada requisito:
- Conformidade: [Sim/Parcial/Não]
- Desvios: Lista de não-conformidades
- Correção sugerida: Texto ajustado
```

### 5.2.4 Matrizes de Consistência

Matrizes de consistência mapeiam requisitos uns contra os outros, visualizando
relações:

```
       | R1 | R2 | R3 | R4 | R5
-------|----|----|----|----|----
R1     |  ✓ |  ✓ |  ⚠ |  ✓ |  ✗
R2     |  ✓ |  ✓ |  ✓ |  ✓ |  ✓
R3     |  ⚠ |  ✓ |  ✓ |  ✗ |  ✓
R4     |  ✓ |  ✓ |  ✗ |  ✓ |  ✓
R5     |  ✗ |  ✓ |  ✓ |  ✓ |  ✓

Legenda: ✓ = Consistente, ⚠ = Possível conflito, ✗ = Conflito identificado
```

## 5.3 Geração de Testes de Aceitação

A geração automatizada de testes de aceitação a partir de requisitos é uma das
aplicações mais maduras de LLMs em RE, com resultados documentados de alta
qualidade.

### 5.3.1 Estudo ThoughtWorks: Redução de 80% no Tempo

Em estudo conduzido pela ThoughtWorks em 2024, equipes utilizando IA para
geração de testes a partir de user stories observaram:

- **80,07% de redução** no tempo de geração de casos de teste
- **96,11% de consistência** entre testes gerados e requisitos
- **67,78% de melhoria** com refinamento iterativo de prompts

Estes números demonstram o potencial transformador da abordagem, embora
ressalvem que qualidade depende de qualidade dos prompts e dos requisitos de
entrada.

### 5.3.2 Formato Gherkin (Given-When-Then)

Gherkin é uma linguagem de especificação de testes de comportamento (BDD -
Behavior Driven Development) legível por humanos e executável por máquinas.

**Estrutura Gherkin:**

```gherkin
Feature: [Nome da funcionalidade]
  [Descrição da funcionalidade e valor de negócio]

  Background:
    Given [precondições comuns a todos os cenários]

  Scenario: [Nome do cenário específico]
    Given [contexto inicial]
    When [ação realizada]
    Then [resultado esperado]
    And [resultado adicional]
    But [exceção ou negação]

  Scenario Outline: [Cenário parametrizado]
    Given [contexto]
    When [ação com <parâmetro>]
    Then [resultado com <expectativa>]

    Examples:
      | parâmetro | expectativa |
      | valor1    | resultado1  |
      | valor2    | resultado2  |
```

**Template de Geração Gherkin:**

```
[CONTEXT]
Você é um engenheiro de QA especializado em BDD, gerando testes de
aceitação no formato Gherkin.

[TASK]
Gere cenários de teste Gherkin completos para a seguinte user story.

[USER STORY]
"Como [persona], quero [ação], para que [benefício]"

[CRITÉRIOS DE ACEITAÇÃO]
{{acceptance_criteria}}

[OUTPUT FORMAT]
Feature completa em Gherkin incluindo:
- Feature description
- Background (se aplicável)
- Scenario: Fluxo principal (happy path)
- Scenario: Fluxos alternativos (2-3)
- Scenario: Fluxos de exceção/erro (2-3)
- Scenario Outline: Testes com múltiplos dados (data-driven)

[CONSTRAINTS]
- Use passos reutilizáveis quando possível
- Mantenha cenários independentes
- Inclua asserções verificáveis
- Considere segurança e autorização
```

### 5.3.3 Cenários de Edge Cases

Edge cases são situações extremas ou inesperadas que testam robustez do sistema:

**Categorias de Edge Cases:**

- **Limites numéricos**: Zero, valores máximos, negativos, decimais
- **Dados**: Vazio, nulo, muito longo, caracteres especiais
- **Carga**: Pico de acesso, zero acesso, acesso simultâneo massivo
- **Tempo**: Fuso horário, horário de verão, leap year, timestamps
- **Estado**: Sessão expirada, conexão perdida, transação pendente
- **Segurança**: Injeção, XSS, CSRF, bypass de autenticação

**Exemplo de Geração de Edge Cases:**

```
[CONTEXT]
User Story: "Como usuário, quero fazer upload de arquivos para compartilhar com minha equipe"

[GERAÇÃO DE EDGE CASES]
Gere cenários de teste para os seguintes edge cases:
1. Arquivo vazio (0 bytes)
2. Arquivo muito grande (limite + 1 byte)
3. Nome de arquivo com caracteres especiais (emoji, acentos, símbolos)
4. Extensão não permitida
5. Upload interrompido no meio
6. Upload simultâneo do mesmo arquivo por 2 usuários
7. Storage cheio
8. Arquivo corrompido

Para cada edge case, forneça:
- Cenário Gherkin completo
- Dados de teste específicos
- Comportamento esperado do sistema
```

### 5.3.4 Consistência de 96,11%

O alto índice de consistência documentado pela ThoughtWorks indica que testes
gerados por IA são altamente alinhados com requisitos. No entanto, consistência
não implica completude:

- IA gera testes para o que está explicitamente no requisito
- Requisitos implícitos podem não gerar testes correspondentes
- Contexto de domínio pode não ser totalmente capturado
- Decisões de design não documentadas não geram testes

**Mitigação:** Sempre revisão humana de testes gerados, com foco em:

- Cenários de negócio não cobertos
- Requisitos não-funcionais implicitamente esperados
- Compliance regulatório
- Segurança e privacidade

### 5.3.5 Refinamento Iterativo de Prompts

O estudo mostrou 67,78% de melhoria com refinamento iterativo. Processo
recomendado:

1. **Geração inicial**: Prompt básico, avaliar resultados
2. **Análise de gaps**: Quais cenários estão faltando?
3. **Refinamento**: Adicionar contexto, exemplos, constraints
4. **Re-geração**: Novo lote de testes
5. **Comparação**: Melhorou? O que ainda falta?
6. **Repetição**: Até atingir cobertura satisfatória

## 5.4 Revisões e Inspeções com IA

### 5.4.1 Checklists de Qualidade Automatizados

Inspeções de requisitos tradicionais são caras e demoradas. Checklists
automatizados aceleram o processo:

**Checklist SMART para Requisitos:**

- **S**pecific: O requisito é específico e focado?
- **M**easurable: Há critérios objetivos de sucesso?
- **A**chievable: É tecnicamente viável?
- **R**elevant: Está alinhado com objetivos de negócio?
- **T**ime-bound: Há restrições temporais claras?

**Checklist INCOSE:**

- Necessário? (Realmente necessário ou nice-to-have?)
- Implementável? (Tecnicamente possível?)
- Verificável? (Como testar?)
- Não-ambíguo? (Interpretação única?)
- Completo? (Informação suficiente?)

**Automação:**

```
[CONTEXT]
Inspeção de qualidade de requisitos segundo checklists [SMART/INCOSE].

[TASK]
Avalie cada requisito contra todos os itens do checklist.

[REQUISITOS]
{{requirements}}

[OUTPUT]
Para cada requisito:
- Score geral: X/Y itens atendidos
- Itens falhos: Lista com explicação
- Recomendação: Aprovar/Revisar/Rejeitar
```

### 5.4.2 Scoring de Qualidade de Requisitos

Scores quantitativos permitem comparação e priorização:

**Métricas de Qualidade:**

- Completude: % de informações necessárias presentes
- Clareza: Ausência de termos ambíguos
- Consistência: Alinhamento com outros requisitos
- Rastreabilidade: Ligação a fontes e outros artefatos
- Testabilidade: Facilidade de verificação

**Scorecard:**

```
Requisito: REQ-042
┌─────────────────────┬────────┬─────────────────────────────────┐
│ Dimensão            │ Score  │ Comentários                     │
├─────────────────────┼────────┼─────────────────────────────────┤
│ Completude          │ 8/10   │ Falta especificar limites       │
│ Clareza             │ 9/10   │ Termos bem definidos            │
│ Consistência        │ 7/10   │ Possível conflito com REQ-038   │
│ Rastreabilidade     │ 10/10  │ Fonte e dependências claras     │
│ Testabilidade       │ 6/10   │ Critérios de aceitação vagos    │
├─────────────────────┼────────┼─────────────────────────────────┤
│ SCORE AGREGADO      │ 80%    │ Status: Aprovado com revisões   │
└─────────────────────┴────────┴─────────────────────────────────┘
```

### 5.4.3 Métricas: F1-Scores de 79-94%

Estudo de verificação (2024) avaliou GPT-4o e Claude 3.5 Sonnet na verificação
de requisitos:

- **F1-Score**: 79% a 94% dependendo do tipo de verificação
- **Few-shot prompting** superou Chain-of-Thought em precisão
- **Especificações estruturadas** tiveram melhor desempenho que texto
  conversacional

**Interpretação:**

- F1-Score de 90%+: Excelente, pouca revisão humana necessária
- F1-Score de 80-90%: Bom, revisão humana recomendada
- F1-Score < 80%: Requer supervisão significativa

### 5.4.4 Few-Shot vs. Chain-of-Thought

Estudos comparativos mostram diferenças de desempenho:

**Few-Shot Prompting:**

- Melhor para: Identificação de padrões, classificação, formatação
- Vantagem: Exemplos concretos guiam o modelo
- Resultado: Maior precisão em tarefas estruturadas

**Chain-of-Thought:**

- Melhor para: Análise complexa, raciocínio multi-etapas
- Vantagem: Explicação do processo revela erros
- Resultado: Maior completude em análises profundas

**Recomendação:** Para verificação de requisitos, combinar ambas:

1. Few-shot para classificação inicial
2. CoT para análise de problemas identificados

## 5.5 Validação com Stakeholders

### 5.5.1 Simulação de Validação

Antes de apresentar requisitos a stakeholders reais, é possível simular
validação com LLMs representando diferentes perspectivas:

```
[ROLE]
Você é um [stakeholder específico] validando requisitos para [sistema].
Seu foco é [perspectiva do stakeholder].

[TASK]
Revise os seguintes requisitos do ponto de vista deste stakeholder.
Identifique:
- Requisitos que não atendem suas necessidades
- Requisitos que criam problemas para seu trabalho
- Informações faltantes para sua tomada de decisão
- Sugestões de melhoria

[REQUISITOS]
{{requirements}}

[OUTPUT]
Feedback estruturado:
- Aprovações: Requisitos adequados
- Preocupações: Requisitos problemáticos com explicação
- Perguntas: Esclarecimentos necessários
- Sugestões: Melhorias propostas
```

### 5.5.2 Prototipagem Rápida

Protótipos gerados por IA permitem validação tangível:

- **Protótipos de interface**: Stakeholders interagem com simulação
- **Protótipos de fluxo**: Diagramas de processo animados
- **Protótipos de dados**: Exemplos realistas de entrada/saída

### 5.5.3 Feedback Loops Acelerados

Ciclos de validação tradicionais levam dias ou semanas. Com IA:

- **Geração de alternativas**: Múltiplas versões em minutos
- **A/B testing conceitual**: Stakeholders comparam abordagens
- **Refinamento iterativo**: Ajustes em tempo real durante reuniões

## Referências

1. **ThoughtWorks. (2024).** "AI-Generated Test Cases from User Stories: An
   Experimental Research Study."
   <https://www.thoughtworks.com/insights/blog/generative-ai/AI-generated-test-cases-from-user-stories-an-experimental-research-study>

2. **Kässinger, F., et al. (2024).** "Exploring LLMs for Verifying Technical
   System Specifications Against Requirements." *arXiv:2411.11582*.
   <https://arxiv.org/abs/2411.11582>

3. **Ebrahim, A., et al. (2024).** "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *arXiv:2401.00000*.
   <https://aclanthology.org/2024.acl-srw.31/>

4. **Cucumber. (2024).** "Gherkin Reference." *Cucumber Documentation*.
   <https://cucumber.io/docs/gherkin/>

5. **ISO/IEC/IEEE. (2018).** *ISO/IEC/IEEE 29148:2018 - Systems and software
   engineering — Life cycle processes — Requirements engineering*.

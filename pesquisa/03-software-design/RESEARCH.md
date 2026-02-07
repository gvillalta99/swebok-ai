# KA 03: Software Design - Research Report

**Research Date:** February 2026
**Focus:** AI Impact on Software Design (2024-2026)
**Status:** Research Phase

---

## Executive Summary

O design de software está passando por uma transformação fundamental impulsionada pela IA generativa e Large Language Models (LLMs). A premissa central desta pesquisa é que **o código tornou-se commodity; o contexto tornou-se capital**. Este relatório documenta como as práticas de design estão evoluindo em resposta às capacidades de geração de código por IA, identificando novos padrões, princípios e abordagens que emergem neste cenário.

---

## 1. Fundamentos de Design de Software na Era da IA

### 1.1 A Nova Realidade do Design de Software

A introdução de ferramentas de IA generativa para codificação está redefinindo os fundamentos do design de software. Segundo pesquisa do GitHub (2024), 90% dos desenvolvedores nos EUA relatam melhoria na qualidade do código e produtividade com ferramentas de IA, liberando tempo para design de sistemas e colaboração [^1].

**Mudanças Fundamentais:**
- **De implementação manual para orquestração:** Engenheiros estão migrando de codificação linha a linha para supervisão de alto nível
- **De código determinístico para sistemas probabilísticos:** LLMs introduzem incerteza como elemento de design
- **De documentação estática para documentação viva:** Sistemas auto-documentados com IA

### 1.2 Modularity, Coupling e Cohesion em Contexto de IA

Segundo Khononov (2024) [^2], os fundamentos de design de software - modularity, coupling e cohesion - mantêm sua relevância, mas exigem reinterpretação:

**Modularity na Era da IA:**
- Sistemas de IA favorecem **modelos modulares** em vez de arquiteturas monolíticas
- Especialistas da Microsoft Research (2024) [^3] propõem modelos especializados e coordenados (expert models) que colaboram para resolver tarefas mais amplas

**Coupling e Cohesion:**
- Pesquisa da ArXiv (2025) [^4] mostra que código gerado por IA em pequenos snippets apresenta alta coesão e baixo acoplamento
- No entanto, soluções maiores geradas por IA podem introduzir acoplamento inadvertido se não supervisionadas
- A engenharia de prompt se torna crítica para manter qualidade arquitetural

### 1.3 Paradigmas Emergentes

**Chat-Oriented Programming (CHOP):**
Coined by Steve Yegge e popularizado como "vibe coding" por Andrej Karpathy, CHOP representa uma mudança de paradigma onde desenvolvedores constroem software conversando com IA em linguagem natural [^5][^6].

Características:
- Programação via refinamento iterativo de prompts
- Desenvolvedores atuam como orquestradores, não codificadores linha a linha
- Iteração rápida e prototipagem acelerada

**Vibe Coding:**
Termo que descreve o ato de "vibrar" com a IA - descrever funcionalidade desejada e deixar a IA gerar código [^7]. Em 2025, isto tornou-se uma tendência dominante, democratizando a criação de software.

---

## 2. Princípios de Design (SOLID, DRY, KISS) na Era da IA

### 2.1 SOLID e Código Gerado por IA

Pesquisas recentes indicam que código gerado por IA frequentemente **viola princípios SOLID** quando não supervisionado [^8]:

**Single Responsibility Principle (SRP):**
- IA tende a criar classes com múltiplas responsabilidades ("responsibility overload")
- Solução: Engenharia de prompt explícita solicitando separação de concerns

**Open/Closed Principle (OCP):**
- Código gerado pode criar rigidez acidental ao não antecipar extensões
- Requer revisão humana para identificar oportunidades de abstração

**Liskov Substitution Principle (LSP):**
- Herança gerada por IA pode violar contratos de substituição
- Importância de testes automatizados para validar hierarquias

**Interface Segregation Principle (ISP):**
- IA pode criar interfaces inchadas ("fat interfaces")
- Padrões de prompt devem solicitar interfaces focadas

**Dependency Inversion Principle (DIP):**
- Código gerado frequentemente cria dependências diretas em vez de abstrações
- Necessidade de instruções explícitas sobre injeção de dependências

### 2.2 Aplicando SOLID via Prompt Engineering

Syncfusion (2025) [^9] propõe que aplicação de SOLID em desenvolvimento com IA ocorre primariamente através de:

1. **Prompts estruturados:** Instruções claras sobre princípios a seguir
2. **Exemplos few-shot:** Demonstrações de código seguindo SOLID
3. **Revisão iterativa:** Ciclos de feedback solicitando refatorações específicas
4. **Contexto arquitetural:** Fornecimento de guidelines de design do projeto

### 2.3 DRY, KISS e Outros Princípios

**DRY (Don't Repeat Yourself):**
- IA é eficaz em identificar duplicação de código
- Ferramentas como GitHub Copilot sugerem extração de métodos automaticamente
- Risco: Over-engineering na busca por abstrações prematuras

**KISS (Keep It Simple, Stupid):**
- Tensão: Capacidade da IA de gerar soluções complexas vs. necessidade de simplicidade
- Princípio "YAGNI" (You Ain't Gonna Need It) ainda aplica-se [^10]
- Solução: Prompts explícitos solicitando "a solução mais simples possível"

**Princípio da Menor Surpresa (PoLA):**
- Crítico para APIs e interfaces geradas por IA
- Necessidade de validação humana de contratos de API

---

## 3. Padrões de Design: GoF, Enterprise e Novos Padrões de IA

### 3.1 Padrões GoF na Era da IA

Padrões clássicos da Gang of Four mantêm relevância, mas suas implementações são frequentemente geradas automaticamente:

**Padrões Criacionais:**
- **Factory Pattern:** IA gera boilerplate de factories com facilidade
- **Builder Pattern:** Útil para APIs fluentes geradas por IA [^11]
- **Singleton:** Requer cuidado para garantir thread-safety em código gerado

**Padrões Estruturais:**
- **Adapter:** Crítico para integração de sistemas legados com LLMs
- **Facade:** "Agent Facade" emergente para encapsular interações com agentes [^12]
- **Decorator:** Útil para adicionar comportamentos de logging/observabilidade

**Padrões Comportamentais:**
- **Strategy:** Fundamental para sistemas que alternam entre LLMs e lógica tradicional
- **Observer:** Adaptado para arquiteturas orientadas a eventos com IA
- **Command:** Base para padrões de "Tool Use" em sistemas com LLMs

### 3.2 Novos Padrões de Design para IA

Lakshmanan & Hapke (O'Reilly, 2024) [^13] catalogaram 32 padrões de design para aplicações Generative AI:

**Categorias de Padrões:**

1. **Controle de Estilo de Conteúdo:**
   - Logits Masking
   - Style Transfer
   - Prompt Templates reutilizáveis

2. **Adição de Conhecimento:**
   - RAG (Retrieval-Augmented Generation)
   - Semantic Indexing
   - Deep Search

3. **Extensão de Capacidades do Modelo:**
   - Chain of Thought (CoT)
   - Adapter Tuning
   - Evol-Instruct

4. **Melhoria de Confiabilidade:**
   - LLM-as-Judge
   - Reflection Pattern
   - Prompt Optimization

5. **Habilitação de Agentes:**
   - Tool Calling
   - Multi-agent Collaboration

6. **Endereçamento de Constraints:**
   - Small Language Model (SLM)
   - Prompt Caching
   - Inference Optimization

7. **Salvaguardas:**
   - Guardrails
   - Self-Check

### 3.3 Padrões de Design Empresarial Adaptados

**Layered Architecture:**
- Nova camada: "AI Orchestration Layer"
- Responsável por gerenciar chamadas a LLMs, RAG, e agentes

**Microservices:**
- Microserviços de IA especializados
- API Gateway com funcionalidades de circuit breaker para LLMs [^14]

**Event-Driven Architecture:**
- Integração com streams de eventos para processamento em tempo real
- Padrões de "Event Sourcing" para rastreabilidade de decisões de IA

---

## 4. Arquitetura de Software vs Design

### 4.1 Diferenciação em Contexto de IA

**Arquitetura de Software:**
- Foco em estrutura de alto nível, escalabilidade, segurança
- Decisões sobre orquestração de LLMs, RAG, e agentes
- Definição de padrões organizacionais para uso de IA

**Design de Software:**
- Foco em implementação de componentes individuais
- Refinamento de prompts e contextos
- Design de interfaces entre módulos de IA e código tradicional

Segundo InfoQ (2024) [^15], enquanto IA não mudou significativamente a *prática* da arquitetura de software (que continua focada em contexto organizacional e trade-offs), está mudando drasticamente os *produtos* sendo arquitetados.

### 4.2 O Papel do Arquiteto de Software com IA

Pesquisa do iSAQB (2025) [^16] identifica que ferramentas de IA suportam arquitetos de software em cinco das seis atividades principais:

1. **Clarificação de requisitos:** Análise de documentos com IA
2. **Design de estruturas:** Suporte a POCs e geração de código/documentação
3. **Design de conceitos transversais:** Criação de conceitos e diagramas
4. **Avaliação de arquiteturas:** Criação de checklists automatizados
5. **Comunicação:** Tradução para linguagem ubíqua

### 4.3 Tensões e Trade-offs

**Determinismo vs Probabilidade:**
- Software tradicional assume comportamento determinístico
- LLMs introduzem incerteza como elemento de primeira classe
- Arquitetos devem projetar para "graceful degradation"

**Latência e Custo:**
- Chamadas a LLMs introduzem latência significativa
- Trade-offs entre qualidade do modelo e custo/tempo de resposta
- Padrões de caching e fallback tornam-se críticos

---

## 5. Design para IA/LLMs: Novo Foco

### 5.1 Princípios de Design para Aplicações com LLM

Medium (2024) [^17] identifica dimensões críticas para design de aplicações LLM:

**Adequação ao Caso de Uso:**
- Deploy de LLMs apenas onde oferecem ganhos claros de produtividade
- Avaliação de alternativas: regras tradicionais vs ML vs LLM

**Experimentação Iterativa:**
- Ciclos pequenos de tuning de prompt e avaliação
- Cultura de prototipagem rápida

**Habilidades Cross-Funcionais:**
- Equipes combinando expertise de pesquisa em IA e engenharia de software
- Blurring de fronteiras entre roles tradicionais

**Guardrails de IA Responsável:**
- Considerações de segurança, privacidade e viés
- Implementação de salvaguardas em múltiplas camadas

**Consciência de Custo:**
- Token economics como consideração de design
- Otimização de prompts para eficiência de custo

### 5.2 Design Patterns Específicos para LLMs

**LLM Triangle Principles (2025) [^18]:**
Framework de três princípios para arquitetar aplicações LLM confiáveis:

1. **Standard Operating Procedure (SOP):** Documentação clara de procedimentos
2. **Prompt Chaining:** Decomposição de tarefas complexas em etapas
3. **RAG como Fundação:** Grounding em dados verificáveis

**Seis Princípios de Design para Aplicações Generative AI (IBM/CHI 2024) [^19]:**

1. Clareza de propósito e limitações
2. Controle e personalização pelo usuário
3. Feedback e transparência
4. Gerenciamento de erros gracefully
5. Privacidade e segurança
6. Inclusão e acessibilidade

### 5.3 Padrões Emergentes para Sistemas com IA

**Reflection Pattern:**
Agentes avaliam e melhoram suas próprias saídas através de auto-verificação [^20]

**Tool Use Pattern:**
Agentes interagem diretamente com sistemas enterprise (APIs, workflows) para gerar resultados reais

**Planning Pattern:**
Decomposição de tarefas complexas em sub-etapas executáveis

**Multi-Agent Collaboration:**
Múltiplos agentes especializados cooperam em tarefas complexas

---

## 6. Design Patterns para Sistemas com IA

### 6.1 Agentic Design Patterns

Pesquisa de Ng (2024) [^21] e aprofundada por Vellum (2025) [^22] categoriza patterns agentic em três níveis:

**Nível 1 - AI Workflows (Output Decisions):**
- Decisões ao nível do modelo
- Geração de conteúdo, classificação

**Nível 2 - Router Workflows (Task Decisions):**
- Escolha de tarefas e ferramentas em ambiente predefinido
- Maior foco de inovação atual

**Nível 3 - Autonomous Agents (Process Decisions):**
- Criação de novas tarefas dinamicamente
- Autonomia máxima, maior complexidade

### 6.2 Padrões de Colaboração Multi-Agent

**Sequential Pattern:**
Agentes executam em ordem linear predefinida

**Parallel Pattern (Concurrent):**
Múltiplos agentes trabalham simultaneamente, outputs são sintetizados

**Loop Pattern:**
Agentes executam sequência repetidamente até condição de término

**Review and Critique Pattern:**
- Generator e Critic
- Um agente gera, outro avalia e sugere melhorias

**Router Pattern:**
LLM central atua como recepcionista, direcionando tarefas para agentes especializados

### 6.3 Padrões de Resiliência para LLMs

**Circuit Breaker:**
- Previne falhas em cascata quando APIs de LLM falham
- Implementações em Azure API Management [^23]
- Bibliotecas como Resilience4j adaptadas para LLMs

**Retry com Exponential Backoff:**
- Tratamento de rate limits (HTTP 429)
- Configuração de códigos de erro específicos
- Prevenção de "retry storms"

**Fallback:**
- Alternância para modelo secundário quando primário falha
- Degradação gracefully para regras tradicionais

**LLM Gateway Pattern:**
- Ponto único de entrada para múltiplos modelos
- Load balancing entre instâncias
- Gerenciamento de chaves de API e custos

---

## 7. Design Centrado em Contexto para LLMs

### 7.1 Context Engineering: A Nova Disciplina

Context Engineering emergiu como disciplina sistemática para construir com LLMs, suplantando o termo mais limitado "prompt engineering" [^24].

**Definição:**
Engenharia sistemática de todo o ambiente informacional (contexto) que o modelo utiliza.

**Modelo Mental:**
```
LLM = f(contexto) → geração
```

A janela de contexto é a alavanca de controle primária.

### 7.2 Os Seis Pilares do Context Engineering

Weaviate (2025) [^25] propõe seis pilares:

1. **Agents:** Orquestram decisões, atuam como usuários e arquitetos do fluxo de contexto
2. **Query Augmentation:** Refinamento do input do usuário para diferentes ferramentas downstream
3. **Retrieval:** Otimização do fetching de conhecimento externo
4. **Memory:** Gerenciamento de estado de curto e longo prazo
5. **Tooling:** Integração com ferramentas externas
6. **Output Structure:** Definição de esquemas de saída estruturada

### 7.3 Componentes de Contexto

InfoWorld (2024) [^26] descreve as camadas de contexto:

| Componente | Descrição |
|------------|-----------|
| System Prompts | Papéis e constraints |
| User Prompts | Especificações de tarefa |
| State/History | Memória de curto prazo |
| Long-term Memory | Dados persistentes |
| Retrieved Information | Snippets de RAG |
| Available Tools | Chamadas de função |
| Structured Output | Esquemas de resposta |

### 7.4 Design Patterns para Context Window

**Janelas de Contexto em Expansão (2024):**
- Claude 3 Opus: 200K tokens
- Claude 3.5 Sonnet: 180K tokens
- GPT-4o: 128K tokens
- Gemini 1.5 Pro: até 2 milhões de tokens

**Desafios:**
- Diluição de atenção em contextos muito longos
- Efeito de Posição Serial: informações no meio são processadas menos confiavelmente
- Custo computacional cresce quadraticamente

**Soluções:**
1. **Chunking Estratégico:** Divisão de documentos em blocos semanticamente coherentes
2. **Hierarchical Context:** Contexto em múltiplos níveis de abstração
3. **Selective Attention:** Foco em partes relevantes do contexto
4. **Context Compression:** Sumarização dinâmica de histórico

---

## 8. Documentação de Design em Projetos com IA

### 8.1 Evolução da Documentação

A integração de IA nos workflows de design exige evolução nas práticas de documentação:

**Prompt Specification Docs:**
- Versionamento de prompts
- Racional e métricas de performance
- Casos de uso e exemplos

**Context Flow Diagrams:**
- Visualização das camadas de contexto alimentadas aos LLMs
- Pipelines de RAG e memória

**AI Contract Sheets:**
- Inputs esperados do modelo
- Outputs esperados
- Critérios de avaliação
- Fallbacks e comportamentos de erro

### 8.2 Ferramentas e Práticas (2025)

**AI Documentation Generators:**
- Mintlify: Documentação de APIs com IA
- GitHub Copilot Docs: Geração de docstrings e comentários
- Swimm: Documentação viva integrada ao código

**Best Practices:**
1. **Documentar o "Porquê":** Contexto de decisões de design, não apenas o "O que"
2. **Prompts como Artefatos:** Versionar prompts junto com código
3. **Avaliações Documentadas:** Registro de métricas de qualidade de IA
4. **Templates Estruturados:** Integrar templates de documentação ao scaffolding do projeto

### 8.3 Estatísticas de Uso (2025)

- 64% dos profissionais de desenvolvimento usam IA para escrita de documentação [^27]
- 59% de redução no tempo de documentação com ferramentas de IA [^28]
- 76% dos desenvolvedores usando IA planejam documentar e testar código mais [^29]

---

## 9. Impactos da IA no Papel do Designer de Software

### 9.1 Mudança de Foco

**De:** Codificador implementando detalhes
**Para:** Orquestrador de sistemas, especificador de contexto, validador de qualidade

### 9.2 Novas Competências Necessárias

1. **Engenharia de Contexto:** Design de pipelines de informação para LLMs
2. **Avaliação de Modelos:** Compreensão de trade-offs entre diferentes LLMs
3. **Prompt Engineering Avançado:** Técnicas de elicitação de comportamentos desejados
4. **Arquitetura Híbrida:** Integração de componentes tradicionais e baseados em IA
5. **Governança de IA:** Segurança, privacidade e ética em sistemas com IA

### 9.3 Gargalos Emergentes

**Qualidade e Confiabilidade:**
- Código gerado por IA pode parecer correto mas conter bugs sutis
- Necessidade de revisão rigorosa e testes abrangentes

**Manutenibilidade:**
- Código gerado sem compreensão profunda pode criar dívida técnica
- Documentação de decisões de design torna-se crítica

**Complexidade de Integração:**
- Sistemas híbridos (IA + tradicional) introduzem novos pontos de falha
- Observabilidade e debugging mais complexos

---

## 10. Tendências e Direções Futuras

### 10.1 Tendências para 2025-2026

1. **Agentic AI:** Sistemas autônomos de múltiplos agentes
2. **Context-First Development:** Design iniciando pela definição de contexto
3. **AI-Native Infrastructure:** Infraestrutura otimizada para execução de IA
4. **Multimodal Design:** Integração de texto, imagem, áudio e vídeo
5. **Edge AI:** Execução de modelos em dispositivos edge

### 10.2 Previsões

- **Código gerado por IA:** Estima-se que 80% do código de desenvolvimento de produtos será gerado por IA até 2025 [^30]
- **Novo papel do engenheiro:** Transição de "codificador" para "curador de contexto"
- **Evolução das ferramentas:** IDEs tornando-se ambientes de desenvolvimento agentic

---

## Referências

[^1]: GitHub. "Survey: AI Wave Grows." 2024. https://github.blog/news-insights/research/survey-ai-wave-grows

[^2]: Khononov, Vlad. "Balancing Coupling in Software Design." Pearson, 2024.

[^3]: Microsoft Research. "Toward modular models: Collaborative AI development enables model accountability and continuous learning." 2024.

[^4]: ArXiv. "The Impact of AI-Generated Solutions on Software Architecture and Productivity." 2025.

[^5]: Yegge, Steve. "Chat-Oriented Programming (CHOP)." 2024.

[^6]: Karpathy, Andrej. "Vibe Coding." 2025.

[^7]: Microsoft. "'Vibe coding' and other ways AI is changing who can build apps." 2025.

[^8]: BRGR. "Keep Your Code SOLID in the Age of AI Copilots." 2024.

[^9]: Syncfusion. "How to Apply SOLID Principles in AI Development." 2025.

[^10]: Retool. "6 software design best practices for more flexible, scalable software." 2024.

[^11]: TestingIL. "AI Code Refactoring: Names and Patterns Using AI." 2025.

[^12]: ArXiv. "Designing LLM-based Multi-Agent Systems for Software Engineering Tasks." 2024.

[^13]: Lakshmanan, Valliappa & Hapke, Hannes. "Generative AI Design Patterns." O'Reilly, 2024.

[^14]: Microsoft. "GenAI Gateway Resilience Service Example." GitHub, 2024.

[^15]: InfoQ. "Software Architecture and Design Trends Report." April 2024.

[^16]: iSAQB. "Software Architects and AI Systems: Challenges and Opportunities." 2025.

[^17]: Medium. "What did I learn from building LLM applications in 2024." 2024.

[^18]: Medium. "The LLM Triangle Principles to Architect Reliable AI Apps." 2025.

[^19]: IBM Research. "Design Principles for Generative AI Applications." CHI 2024.

[^20]: DeepLearning.AI. "Agentic Design Patterns Part 5: Multi-Agent Collaboration." 2024.

[^21]: Ng, Andrew. "4 Agentic Design Patterns." Snowflake BUILD 2024.

[^22]: Vellum. "The 2026 Guide to AI Agent Workflows." 2025.

[^23]: Microsoft Tech Community. "Improve LLM backend resiliency with load balancer and circuit breaker rules in Azure API Management." 2025.

[^24]: Intellectronica. "Context Engineering: A Primer." 2025.

[^25]: Weaviate. "Context Engineering for AI Agents." 2025.

[^26]: InfoWorld. "What is context engineering and why it's the new AI architecture." 2024.

[^27]: Google Cloud DORA Report. 2025.

[^28]: IBM. "AI code documentation: Benefits and top tips." 2025.

[^29]: Stack Overflow Developer Survey. 2024.

[^30]: Snyk. "5 security best practices for adopting generative AI code assistants." 2024.

---

## Recursos Adicionais

### Livros e Publicações

1. "Generative AI Design Patterns" - Lakshmanan & Hapke (O'Reilly, 2024)
2. "Balancing Coupling in Software Design" - Vlad Khononov (Pearson, 2024)
3. "The Prompt Report" - Survey sistemático de técnicas de prompt engineering (2024)
4. "Building LLM Applications" - Martin Fowler (2024)

### Papers Acadêmicos Relevantes

1. "A Systematic Survey of Prompt Engineering in Large Language Models" (2024)
2. "Agentic AI: A Comprehensive Survey of Architectures" - Springer (2025)
3. "Design Principles for Generative AI Applications" - ACM CHI (2024)
4. "RAG Architecture Design Patterns" - IJERT (2025)

### Ferramentas e Frameworks

1. **LangChain / LangGraph:** Orquestração de agentes
2. **LlamaIndex:** RAG e indexação
3. **Semantic Kernel:** SDK para aplicações com IA (Microsoft)
4. **Haystack:** Framework para NLP com LLMs
5. **Vellum:** Plataforma para desenvolvimento de aplicações LLM

---

## Anexos

### A. Checklist de Design para Sistemas com IA

**Arquitetural:**
- [ ] Definição clara de casos de uso adequados para LLM
- [ ] Estratégia de fallback definida
- [ ] Padrões de resiliência implementados (circuit breaker, retry)
- [ ] Arquitetura de observabilidade planejada

**Context Engineering:**
- [ ] Pipeline de contexto documentado
- [ ] Estratégia de RAG definida (se aplicável)
- [ ] Gerenciamento de memória implementado
- [ ] Limites de janela de contexto considerados

**Qualidade:**
- [ ] Critérios de avaliação do modelo definidos
- [ ] Processo de revisão humana estabelecido
- [ ] Testes de regressão para código gerado
- [ ] Documentação de decisões de design

**Governança:**
- [ ] Avaliação de riscos de segurança
- [ ] Considerações de privacidade endereçadas
- [ ] Monitoramento de custos implementado
- [ ] Guidelines de uso ético definidos

### B. Template de Documentação de Componente com IA

```markdown
## Componente: [Nome]

### Propósito
[Descrição do que o componente faz e por que usa IA]

### Modelo Utilizado
- Modelo: [Nome/versão]
- Racional: [Por que este modelo foi escolhido]

### Contexto
- System Prompt: [Resumo ou referência]
- Fontes de Contexto: [RAG, memória, etc.]
- Janela de Contexto Estimada: [N tokens]

### Entradas e Saídas
- Input: [Schema/formato]
- Output: [Schema/formato]

### Fallbacks
- Estratégia de fallback: [Descrição]
- Comportamento em caso de falha: [Descrição]

### Avaliação
- Métricas: [Quais métricas são monitoradas]
- Thresholds: [Valores aceitáveis]

### Considerações de Design
- Trade-offs considerados: [Lista]
- Decisões específicas: [Explicações]
```

---

*Documento gerado em: February 2026*
*Próxima revisão: Após publicação do SWEBOK-AI v5.0*

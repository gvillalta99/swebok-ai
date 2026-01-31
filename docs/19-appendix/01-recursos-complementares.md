---
title: Recursos Complementares para Engenharia de Software com IA
created_at: '2026-01-31'
tags:
  - apendice
  - glossario
  - padroes
  - checklists
  - templates
  - referencias
status: published
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Recursos Complementares para Engenharia de Software com IA

## Overview

Este apêndice consolida os recursos complementares essenciais para a prática da engenharia de software na era dos Large Language Models (LLMs). Enquanto o SWEBOK v4.0 focava primariamente em padrões tradicionais de software e referências consolidadas, a versão 5.0 reconhece a necessidade crítica de incluir novos padrões emergentes para sistemas de IA, glossários de terminologia atualizada, checklists de qualidade específicos para código gerado por IA, e templates padronizados que sustentem todo o corpo de conhecimento SWEBOK-AI v5.0.

A transição para uma abordagem AI-first na engenharia de software exige não apenas novas técnicas e processos, mas também um novo vocabulário técnico e ferramentas de verificação adaptadas à natureza não-determinística dos sistemas baseados em IA. Este apêndice serve como ponto de referência central para esses recursos, fornecendo ao engenheiro de software os instrumentos necessários para navegar efetivamente neste novo paradigma.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Navegar e aplicar os padrões ISO/IEC e IEEE mais recentes** (2023-2025) para governança, gestão de risco e teste de sistemas de IA, mapeando cada padrão para os Knowledge Areas (KAs) relevantes do SWEBOK-AI v5.0.

2. **Utilizar o glossário de termos de IA** de forma precisa e consistente, compreendendo as nuances terminológicas que distinguem conceitos como RAG, agentes autônomos, e sistemas de geração aumentada por recuperação.

3. **Aplicar checklists de qualidade e templates padronizados** em projetos reais de desenvolvimento assistido por IA, garantindo conformidade com as melhores práticas de verificação e governança estabelecidas neste corpo de conhecimento.

## 1. Glossário de Termos de IA para Engenharia de Software

### 1.1 Fundamentos de LLMs

A compreensão precisa da terminologia relacionada a Large Language Models é fundamental para a comunicação efetiva entre engenheiros de software, cientistas de dados e stakeholders de negócio. Os termos a seguir constituem o vocabulário básico necessário para operar no contexto de desenvolvimento assistido por IA (ZHAO et al., 2024).

| Termo | Definição | Contexto de Uso |
|-------|-----------|-----------------|
| **Token** | Unidade básica de processamento em LLMs, que pode representar palavras, partes de palavras ou caracteres | Estimativa de custo, limitação de contexto |
| **Tokenização** | Processo de divisão de texto em tokens processáveis pelo modelo | Pré-processamento de dados de entrada |
| **Embedding** | Representação vetorial densa de texto em espaço de alta dimensionalidade | Busca semântica, RAG, similaridade |
| **Context Window** | Quantidade máxima de tokens que o modelo pode processar em uma única inferência | Design de arquitetura, chunking |
| **Prompt** | Instrução ou entrada fornecida ao modelo para geração de resposta | Engenharia de prompts |
| **Prompt Engineering** | Prática de projetar prompts eficazes para obter outputs desejados | Elicitação de requisitos, geração de código |
| **Temperature** | Parâmetro que controla a aleatoriedade das respostas do modelo | Balanceamento entre criatividade e consistência |
| **Top-p (Nucleus Sampling)** | Método de amostragem que seleciona tokens do conjunto cumulativo de probabilidade p | Controle de diversidade de outputs |
| **Hallucination (Alucinação)** | Geração de informações factuais incorretas ou não fundamentadas em dados de treinamento | Verificação de qualidade, testes |
| **Fine-tuning** | Processo de ajustar um modelo pré-treinado em dados específicos de domínio | Adaptação a contextos organizacionais |
| **RLHF** | *Reinforcement Learning from Human Feedback* - técnica de alinhamento do modelo com preferências humanas | Ajuste de comportamento do modelo |

### 1.2 Arquitetura e Modelos

A arquitetura dos sistemas de IA fundamenta as decisões de design e implementação. Compreender os componentes arquiteturais permite ao engenheiro de software projetar sistemas híbridos eficazes que integram capacidades de IA de forma robusta e escalável (GAO et al., 2024).

| Termo | Definição | Relevância para Engenharia de Software |
|-------|-----------|----------------------------------------|
| **Transformer** | Arquitetura de rede neural baseada em mecanismos de atenção | Base dos LLMs modernos |
| **Attention Mechanism** | Mecanismo que permite ao modelo focar em partes específicas da entrada | Compreensão de capacidades e limitações |
| **Self-Attention** | Variante onde cada posição da sequência atende a todas as outras | Processamento de contexto global |
| **Multi-head Attention** | Múltiplas camadas de atenção operando em paralelo | Capacidade de capturar diferentes tipos de relações |
| **Encoder** | Componente que processa entrada em representações internas | Modelos de compreensão (BERT-like) |
| **Decoder** | Componente que gera saída a partir de representações | Modelos de geração (GPT-like) |
| **Encoder-Decoder** | Arquitetura completa para tarefas de tradução/transformação | Tarefas seq2seq |
| **Foundation Model** | Modelo treinado em dados amplos e adaptável a múltiplas tarefas | Base para aplicações especializadas |
| **LLM** | *Large Language Model* - modelo de linguagem com bilhões de parâmetros | Principal ferramenta de geração de código |
| **SLM** | *Small Language Model* - modelo compacto para execução em recursos limitados | Edge AI, dispositivos móveis |
| **MoE** | *Mixture of Experts* - arquitetura com múltiplos sub-modelos especializados | Eficiência computacional |

### 1.3 RAG e Recuperação de Informação

O Retrieval-Augmented Generation (RAG) tornou-se um padrão arquitetural fundamental para sistemas de IA empresariais, permitindo que LLMs acessem informações atualizadas e específicas de domínio (GAO et al., 2024).

| Termo | Definição | Aplicação em Software |
|-------|-----------|----------------------|
| **RAG** | *Retrieval-Augmented Generation* - framework que combina recuperação com geração | Sistemas de QA, assistentes empresariais |
| **Vector Database** | Banco de dados otimizado para armazenamento e busca de embeddings | Infraestrutura de RAG |
| **Semantic Search** | Busca baseada em significado semântico rather than correspondência lexical | Recuperação de documentação |
| **Similarity Metric** | Função matemática para medir proximidade entre vetores (cosseno, produto escalar) | Ranqueamento de resultados |
| **Chunking** | Divisão de documentos em segmentos processáveis | Preparação de dados para RAG |
| **Indexing** | Processo de criação de estruturas de dados para busca eficiente | Otimização de performance |
| **Re-ranking** | Segunda etapa de refinamento dos resultados recuperados | Melhoria de precisão |
| **Query Expansion** | Técnica de expansão da consulta para melhorar recuperação | Aumento de cobertura |

### 1.4 Agentes e Orquestração

Agentes de IA representam uma evolução significativa na arquitetura de software, capacitando sistemas autônomos a executar tarefas complexas através de raciocínio multi-etapas e uso de ferramentas (WANG et al., 2024).

| Termo | Definição | Implicações Arquiteturais |
|-------|-----------|---------------------------|
| **AI Agent** | Sistema autônomo que percebe, decide e age para atingir objetivos | Novo paradigma de design de software |
| **Function Calling** | Capacidade do modelo de invocar funções externas estruturadas | Integração com APIs existentes |
| **Tool Use** | Utilização de ferramentas externas pelo agente para estender capacidades | Extensibilidade de sistemas |
| **Multi-agent System** | Sistema composto por múltiplos agentes especializados que colaboram | Decomposição de problemas complexos |
| **Agentic Workflow** | Fluxo de trabalho onde agentes de IA executam etapas autonomamente | Automação de processos |
| **ReAct Pattern** | *Reasoning + Acting* - padrão de raciocínio intercalado com ações | Estruturação de agentes |
| **Chain-of-Thought** | Técnica de prompting que incentiva o modelo a mostrar raciocínio passo a passo | Melhoria de qualidade de outputs |
| **Planning** | Capacidade do agente de decompor objetivos em sub-tarefas | Orquestração de atividades |

### 1.5 Verificação e Validação em IA

A verificação de sistemas não-determinísticos apresenta desafios únicos que exigem terminologia específica e abordagens adaptadas (ISO/IEC TR 29119-11, 2020).

| Termo | Definição | Desafio de Verificação |
|-------|-----------|------------------------|
| **Non-deterministic System** | Sistema cujos outputs podem variar para mesma entrada | Reprodutibilidade de testes |
| **Stochastic Output** | Saída sujeita a variabilidade probabilística | Definição de critérios de aceitação |
| **Prompt Injection** | Ataque onde entrada maliciosa altera comportamento do modelo | Segurança de sistemas |
| **Jailbreaking** | Técnicas para burlar restrições de segurança do modelo | Governança e compliance |
| **Bias Detection** | Identificação de vieses em outputs do modelo | Equidade e ética |
| **Model Evaluation** | Processo sistemático de avaliação de performance do modelo | Garantia de qualidade |
| **Ground Truth** | Conjunto de dados de referência para validação | Benchmarking |
| **Human-in-the-Loop** | Arquitetura onde decisões críticas requerem validação humana | Responsabilidade e accountability |

## 2. Padrões Internacionais para IA

### 2.1 Padrões ISO/IEC para Sistemas de IA

A família de padrões ISO/IEC 42000 estabelece o framework normativo para gestão e governança de sistemas de IA. Estes padrões são essenciais para garantir conformidade regulatória e boas práticas em projetos de software com componentes de IA (ISO/IEC, 2023; ISO/IEC, 2024).

| Padrão | Título | Ano | Escopo Principal | KAs Relacionados |
|--------|--------|-----|------------------|------------------|
| **ISO/IEC 42001:2023** | Artificial intelligence — Management system | 2023 | Sistema de gestão de IA (AIMS) | KA 10 (Process), KA 14 (Professional Practice) |
| **ISO/IEC 42006:2025** | Requirements for bodies providing audit and certification of AIMS | 2025 | Certificação de sistemas de gestão de IA | KA 14 (Professional Practice) |
| **ISO/IEC TS 42119-2:2025** | Testing of AI — Part 2: Overview of testing AI systems | 2025 | Abordagens para teste de sistemas de IA | KA 05 (Testing) |
| **ISO/IEC TS 42119-3:2024** | Testing of AI — Part 3: Verification and validation analysis | 2024 | Processos de V&V para sistemas de IA | KA 05 (Testing) |
| **ISO/IEC 23894:2024** | AI — Guidance on risk management | 2024 | Gestão de risco específica para IA | KA 09 (Management), KA 13 (Security) |
| **ISO/IEC 38507:2024** | Governance implications of the use of AI in organizations | 2024 | Governança de IA em organizações | KA 10 (Process), KA 14 (Professional Practice) |
| **ISO/IEC 25010:2023** | System and software quality models | 2023 | Características de qualidade para sistemas com IA | KA 12 (Quality) |

### 2.2 Padrões IEEE para IA

O IEEE tem desenvolvido padrões específicos para engenharia de sistemas de IA, abordando aspectos técnicos, éticos e de privacidade (IEEE, 2024; IEEE, 2025).

| Padrão | Título | Ano | Foco | Aplicabilidade |
|--------|--------|-----|------|----------------|
| **IEEE 2857-2024** | Privacy Engineering for AI Systems | 2024 | Engenharia de privacidade | KA 13 (Security), KA 03 (Design) |
| **IEEE P3540** | Technical Requirements of AI Personal Computer | 2024-2025 | Requisitos técnicos para computação de IA | KA 16 (Computing Foundations) |
| **IEEE P3549** | Inference of AI Systems | 2024-2025 | Padrão para inferência em sistemas de IA | KA 04 (Construction) |
| **IEEE 24748-1:2024** | Life cycle management — Guidelines | 2024 | Gerenciamento de ciclo de vida com IA | KA 10 (Process) |
| **IEEE 7000-2022** | Model Process for Addressing Ethical Concerns | 2022 (at. 2024) | Processos éticos em design | KA 14 (Professional Practice) |

### 2.3 Matriz de Conformidade SWEBOK-AI vs. Padrões

A tabela a seguir mapeia cada Knowledge Area do SWEBOK-AI v5.0 para os padrões ISO/IEC/IEEE mais relevantes, facilitando a navegação entre o corpo de conhecimento e as normas aplicáveis.

| KA SWEBOK-AI | Padrões ISO/IEC/IEEE Relacionados | Padrões de IA Específicos |
|--------------|-----------------------------------|---------------------------|
| 01 - Engenharia de Restrições | ISO/IEC/IEEE 29148, 25030 | ISO/IEC 23894 (risco) |
| 02 - Arquitetura de Sistemas Híbridos | ISO/IEC/IEEE 42010, 42020 | IEEE 7000 (ética) |
| 03 - Design de Sistemas Híbridos | ISO/IEC/IEEE 24748-7000, 26514 | IEEE 2857 (privacidade) |
| 04 - Orquestração e Curadoria | ISO/IEC/IEEE 12207 | ISO/IEC 42001 (gestão) |
| 05 - Verificação e Validação | IEEE 1012, ISO/IEC 20246 | ISO/IEC TS 42119 series |
| 06 - Operations | ISO/IEC 20000, 32675 | ISO/IEC 42001 |
| 07 - Manutenção de Sistemas Opaços | ISO/IEC/IEEE 14764, 15288 | ISO/IEC TS 42119-3 |
| 08 - Configuration Management | IEEE 828, ISO/IEC 16350 | - |
| 09 - Gestão de Projetos | ISO/IEC/IEEE 16326, 24748-5 | ISO/IEC 23894 |
| 10 - Processos | ISO/IEC/IEEE 12207, 24748-1 | ISO/IEC 42001, 38507 |
| 11 - Modelos e Métodos | ISO/IEC 24641 | - |
| 12 - Qualidade | IEEE 730, ISO/IEC 25010 | ISO/IEC 25010:2023 |
| 13 - Segurança | ISO/IEC 27000 family | IEEE 2857, ISO/IEC 23894 |
| 14 - Prática Profissional | ISO/IEC 24773-1, 24773-4 | ISO/IEC 42006, IEEE 7000 |
| 15 - Economia com IA | ISO/IEC/IEEE 12207, 15288 | ISO/IEC 38507 |
| 16 - Fundamentos de Sistemas Cognitivos | ISO/IEC/IEEE 24765 | ISO/IEC 42001, 42006 |
| 17 - Fundamentos Matemáticos | - | - |
| 18 - Fundamentos de Engenharia | ISO/IEC/IEEE 24765 | - |

## 3. Checklists de Qualidade

### 3.1 Checklist de Pre-Deploy para Código Gerado por IA

Este checklist deve ser aplicado antes de qualquer deploy de código gerado ou modificado por sistemas de IA em ambientes de produção. Adaptado das melhores práticas OWASP e Microsoft (OWASP, 2025; MICROSOFT, 2024).

#### 3.1.1 Verificação de Segurança

- [ ] **Análise de vulnerabilidades**: Código foi submetido a análise estática de segurança (SAST) sem findings críticos?
- [ ] **Detecção de secrets**: Nenhuma credencial, token ou chave API hardcoded foi detectada?
- [ ] **Validação de inputs**: Todas as entradas externas são validadas e sanitizadas adequadamente?
- [ ] **Prevenção de injeção**: Mecanismos de defesa contra SQL injection, XSS e command injection estão implementados?
- [ ] **Controle de acesso**: Autorização adequada implementada em todos os endpoints?
- [ ] **Logging de segurança**: Eventos de segurança críticos são logados de forma adequada?

#### 3.1.2 Verificação de Qualidade de Código

- [ ] **Cobertura de testes**: Cobertura mínima de 80% para código crítico e 60% para código não-crítico?
- [ ] **Testes de regressão**: Todos os testes existentes continuam passando?
- [ ] **Complexidade ciclomática**: Nenhuma função excede complexidade ciclomática de 15?
- [ ] **Duplicação de código**: Nenhuma duplicação significativa (>10 linhas) introduzida?
- [ ] **Padrões de código**: Código segue as convenções e style guide do projeto?
- [ ] **Documentação**: Código crítico está adequadamente documentado?

#### 3.1.3 Verificação de Conformidade Arquitetural

- [ ] **Invariantes arquiteturais**: Nenhuma violação de invariantes arquiteturais definidos?
- [ ] **Camadas de abstração**: Respeito às camadas definidas (ex: camada de apresentação não acessa repositório diretamente)?
- [ ] **Dependências**: Novas dependências foram aprovadas e não introduzem vulnerabilidades conhecidas?
- [ ] **Contratos de API**: APIs mantêm compatibilidade backward quando aplicável?
- [ ] **Performance**: Latência e throughput dentro dos limites aceitáveis?

### 3.2 Checklist de Governança de IA

Este checklist endereça aspectos específicos de governança para projetos que utilizam IA generativa no ciclo de desenvolvimento (ISO/IEC 42001, 2023; NIST, 2024).

#### 3.2.1 Rastreabilidade e Accountability

- [ ] **Origem do código**: Código gerado por IA está claramente identificado e atribuído?
- [ ] **Prompts versionados**: Prompts utilizados para geração estão versionados e documentados?
- [ ] **Revisão humana**: Código foi revisado por engenheiro sênior antes de merge?
- [ ] **Aprovação de stakeholders**: Mudanças em componentes críticos possuem aprovação documentada?

#### 3.2.2 Conformidade e Ética

- [ ] **Análise de viés**: Código foi avaliado quanto a potenciais vieses algorítmicos?
- [ ] **Privacidade**: Nenhum dado PII (Personally Identifiable Information) está sendo processado inadequadamente?
- [ ] **Transparência**: Decisões automatizadas podem ser explicadas e auditadas?
- [ ] **Conformidade regulatória**: Código atende requisitos regulatórios aplicáveis (GDPR, LGPD, etc.)?

#### 3.2.3 Gestão de Risco

- [ ] **Avaliação de impacto**: Impacto potencial de falhas foi avaliado?
- [ ] **Plano de rollback**: Estratégia de rollback definida e testada?
- [ ] **Monitoramento**: Métricas de performance e saúde do sistema definidas?
- [ ] **Resposta a incidentes**: Procedimentos de resposta a incidentes atualizados?

### 3.3 Checklist de Revisão de Prompts

Para projetos que utilizam prompts customizados em produção, este checklist garante qualidade e consistência (adaptado de PROMPTBUILDER, 2025).

- [ ] **Clareza**: O prompt é inequívoco e não permite múltiplas interpretações?
- [ ] **Contexto suficiente**: Contexto necessário para a tarefa está presente?
- [ ] **Exemplos (few-shot)**: Para tarefas complexas, exemplos de entrada/saída são fornecidos?
- [ ] **Restrições explícitas**: Limitações e restrições são claramente especificadas?
- [ ] **Formato de saída**: Estrutura esperada da resposta é definida?
- [ ] **Teste de robustez**: Prompt foi testado com inputs variados e edge cases?
- [ ] **Versionamento**: Prompt está versionado com changelog documentado?

## 4. Templates Padronizados

### 4.1 Template de Especificação de Restrições

Este template padroniza a documentação de restrições para sistemas com componentes de IA, garantindo rastreabilidade e verificabilidade.

```markdown
## Restrição [ID]: [Título]

### Descrição
[Descrição clara e negativa da restrição - o que o sistema NÃO DEVE fazer]

### Justificativa
- **Risco mitigado**: [Descrição do risco]
- **Requisito de negócio**: [Referência ao requisito de negócio]
- **Base regulatória**: [Referência a norma ou regulamentação, se aplicável]

### Formalização
[Expressão formal da restrição quando aplicável - ex: LTL, CTL, ou pseudocódigo]

### Método de Verificação
- [ ] Análise estática automatizada
- [ ] Teste unitário
- [ ] Teste de integração
- [ ] Teste de penetração
- [ ] Auditoria manual
- [ ] Monitoramento contínuo

### Critérios de Aceitação
1. [Critério mensurável 1]
2. [Critério mensurável 2]
3. [Critério mensurável 3]

### Responsáveis
- **Definição**: [Nome/Função]
- **Verificação**: [Nome/Função]
- **Aprovação**: [Nome/Função]

### Histórico de Mudanças
| Versão | Data | Autor | Mudança |
|--------|------|-------|---------|
| 1.0 | [Data] | [Autor] | Criação |
```

### 4.2 Template de Registro de Geração de Código por IA

Este template documenta o contexto e os parâmetros utilizados na geração de código por IA, essencial para rastreabilidade e debugging.

```markdown
## Registro de Geração de Código por IA

### Identificação
- **ID da Geração**: [UUID ou identificador único]
- **Data/Hora**: [Timestamp]
- **Sistema de IA**: [Nome/versão do modelo utilizado]
- **Engenheiro responsável**: [Nome]

### Contexto
- **Artefato gerado**: [Caminho do arquivo ou módulo]
- **Funcionalidade**: [Descrição do que o código deve fazer]
- **Stack tecnológica**: [Linguagem, frameworks, bibliotecas]

### Prompt Utilizado
```
[Prompt completo utilizado para geração]
```

### Parâmetros do Modelo
- **Temperature**: [Valor]
- **Max tokens**: [Valor]
- **Top-p**: [Valor]
- **Outros parâmetros**: [Se aplicável]

### Código Gerado
```[linguagem]
[Código gerado ou referência ao arquivo]
```

### Revisão
- **Revisor**: [Nome]
- **Data da revisão**: [Data]
- **Aprovado**: [Sim/Não]
- **Modificações realizadas**: [Descrição das alterações manuais]

### Métricas
- **Linhas de código geradas**: [Número]
- **Tempo de geração**: [Tempo]
- **Tempo de revisão**: [Tempo]
- **Issues encontrados**: [Número e severidade]
```

### 4.3 Template de Avaliação de Risco de IA

Baseado no ISO/IEC 23894:2024, este template estrutura a avaliação de risco para componentes de IA.

```markdown
## Avaliação de Risco de IA

### Identificação do Componente
- **Nome**: [Nome do componente/sistema de IA]
- **Versão**: [Versão]
- **Categoria de risco ISO/IEC 42001**: [Limitado | Significativo | Alto]

### Análise de Riscos

#### Risco 1: [Título]
- **Descrição**: [Descrição do risco]
- **Probabilidade**: [Baixa | Média | Alta]
- **Impacto**: [Baixo | Médio | Alto | Crítico]
- **Nível de risco**: [Calculado: Probabilidade × Impacto]
- **Mitigações propostas**:
  1. [Mitigação 1]
  2. [Mitigação 2]
- **Responsável pela mitigação**: [Nome/Função]
- **Prazo**: [Data]

### Controles Implementados
- [ ] Monitoramento contínuo de performance
- [ ] Validação de inputs
- [ ] Fallback para operação manual
- [ ] Logging de decisões
- [ ] Auditoria periódica

### Aprovações
- **Engenheiro de IA**: [Nome/Assinatura]
- **Gestor de risco**: [Nome/Assinatura]
- **DPO (se aplicável)**: [Nome/Assinatura]
```

## 5. Referências Rápidas

### 5.1 Mapeamento de Ferramentas por KA

| KA | Ferramentas Recomendadas | Propósito |
|----|-------------------------|-----------|
| 01 - Engenharia de Restrições | OpenAI Codex, GitHub Copilot, Amazon CodeWhisperer | Geração assistida de código |
| 02 - Arquitetura Híbrida | LangChain, LlamaIndex, Semantic Kernel | Orquestração de agentes |
| 03 - Design | Mermaid, PlantUML + LLM | Geração de diagramas |
| 04 - Orquestração | Cursor, Continue.dev, Aider | Ambientes de desenvolvimento IA-first |
| 05 - Verificação | CodeQL, SonarQube, Snyk | Análise estática e segurança |
| 06 - Operations | Datadog, New Relic, Grafana | Observabilidade de sistemas de IA |
| 07 - Manutenção | Sourcegraph Cody, Bloop | Compreensão de código legado |
| 12 - Qualidade | DeepEval, Promptfoo, TruLens | Avaliação de qualidade de LLMs |
| 13 - Segurança | Lakera, Prompt Security, HiddenLayer | Segurança de aplicações LLM |

### 5.2 Métricas de Qualidade para Sistemas com IA

| Métrica | Definição | Target | Ferramenta de Medição |
|---------|-----------|--------|----------------------|
| **Hallucination Rate** | Taxa de geração de informações incorretas | < 2% | DeepEval, Promptfoo |
| **Context Adherence** | Conformidade ao contexto fornecido | > 95% | TruLens, LangSmith |
| **Latency p95** | Latência no percentil 95 | < 500ms | APM (Datadog, etc.) |
| **Token Efficiency** | Eficiência no uso de tokens | > 80% | Custom dashboards |
| **Human Approval Rate** | Taxa de aprovação em HITL | > 90% | Workflow tools |
| **RAGAS Score** | Métrica composta para sistemas RAG | > 0.75 | RAGAS library |

## Practical Considerations

### Implementação em Projetos Reais

1. **Adoção gradual de padrões**: Não é necessário implementar todos os padrões ISO/IEC simultaneamente. Comece com ISO/IEC 42001 para gestão de IA e expanda conforme a maturidade da organização.

2. **Customização de checklists**: Os checklists apresentados devem ser adaptados ao contexto específico de cada projeto. Componentes de alta criticidade exigem verificações mais rigorosas.

3. **Automação da verificação**: Sempre que possível, automatize as verificações dos checklists através de CI/CD pipelines. Ferramentas como GitHub Actions, GitLab CI ou Jenkins podem executar análises estáticas, testes e validações automaticamente.

4. **Documentação como código**: Trate templates e especificações como código versionado. Utilize repositórios Git para versionamento e colaboração em templates organizacionais.

5. **Treinamento contínuo**: A terminologia e os padrões de IA evoluem rapidamente. Estabeleça um programa de atualização periódica para que a equipe mantenha-se atualizada.

6. **Integração com ferramentas existentes**: Integre os templates e checklists às ferramentas já utilizadas pela equipe (Jira, Confluence, Notion, etc.) para minimizar fricção de adoção.

### Anti-Padrões a Evitar

- **Checklists como mero formalismo**: Checklists que são marcados sem execução real das verificações criam falsa sensação de segurança.

- **Terminologia inconsistente**: Uso de termos técnicos sem aderência às definições padronizadas leva a mal-entendidos entre equipes.

- **Padrões desatualizados**: Referenciar versões obsoletas de padrões ISO/IEC/IEEE pode resultar em não-conformidades.

- **Templates excessivamente complexos**: Templates que demandam mais tempo de preenchimento do que o valor que geram serão abandonados pela equipe.

- **Isolamento de governança**: Tratar governança de IA como uma atividade separada do desenvolvimento, rather than integrada ao ciclo de vida.

## Summary

- O glossário de termos de IA estabelece vocabulário comum essencial para comunicação efetiva em equipes multidisciplinares de engenharia de software.

- Padrões ISO/IEC 42000 series e IEEE 2857-2024 fornecem framework normativo para governança, gestão de risco e teste de sistemas de IA.

- Checklists de qualidade estruturados garantem verificação sistemática de código gerado por IA antes de deploy em produção.

- Templates padronizados para especificação de restrições, registro de geração e avaliação de risco promovem consistência e rastreabilidade.

- A matriz de conformidade mapeia cada KA do SWEBOK-AI para padrões relevantes, facilitando navegação entre conhecimento e normas aplicáveis.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Muito Baixa** - Referências e padrões são base normativa que sustenta todo o corpo de conhecimento |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Baixo** - Material de referência não exige validação contínua, apenas atualização periódica |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** - Padrões afetam conformidade e certificação; uso inadequado pode resultar em não-conformidades regulatórias |

## References

GAO, Y. et al. Retrieval-Augmented Generation for Large Language Models: A Survey. *arXiv preprint*, arXiv:2312.10997, 2024. https://arxiv.org/abs/2312.10997

IEEE. IEEE 2857-2024: Standard for Privacy Engineering for Artificial Intelligence Systems. *IEEE Standards Association*, 2024.

IEEE. IEEE P3540: Standard for Technical Requirements of Artificial Intelligence Personal Computer. *IEEE Standards Association*, 2024-2025.

IEEE. IEEE P3549: Standard for Inference of Artificial Intelligence Systems. *IEEE Standards Association*, 2024-2025.

ISO/IEC. ISO/IEC 42001:2023: Information technology — Artificial intelligence — Management system. *International Organization for Standardization*, 2023.

ISO/IEC. ISO/IEC 23894:2024: Information technology — Artificial intelligence — Guidance on risk management. *International Organization for Standardization*, 2024.

ISO/IEC. ISO/IEC 38507:2024: Information technology — Governance of IT — Governance implications of the use of artificial intelligence in organizations. *International Organization for Standardization*, 2024.

ISO/IEC. ISO/IEC TS 42119-2:2025: Artificial intelligence — Testing of AI — Part 2: Overview of testing AI systems. *International Organization for Standardization*, 2025.

ISO/IEC. ISO/IEC TS 42119-3:2024: Artificial intelligence — Testing of AI — Part 3: Verification and validation analysis. *International Organization for Standardization*, 2024.

ISO/IEC. ISO/IEC TR 29119-11:2020: Software and systems engineering — Software testing — Part 11: Guidelines on the testing of AI-based systems. *International Organization for Standardization*, 2020.

MICROSOFT. ML Model Production Checklist. *Microsoft ISE Engineering Playbook*, 2024. https://microsoft.github.io/code-with-engineering-playbook/machine-learning/ml-model-checklist/

NIST. AI Risk Management Framework (AI RMF 1.0). *National Institute of Standards and Technology*, 2024. https://www.nist.gov/itl/ai-risk-management-framework

OWASP. LLM Applications Cybersecurity and Governance Checklist v1.1. *OWASP Gen AI Security Project*, 2025. https://genai.owasp.org/resource/llm-applications-cybersecurity-and-governance-checklist-english/

PROMPTBUILDER. Prompt Engineering Best Practices (2025) – Checklists and Templates. *Prompt Builder Blog*, 2025. https://promptbuilder.cc/blog/prompt-engineering-best-practices-2025/

WANG, L. et al. A Survey on Large Language Model based Autonomous Agents. *Frontiers of Computer Science*, v. 18, n. 6, 2024. https://doi.org/10.1007/s11704-024-40231-1

ZHAO, W. X. et al. A Survey of Large Language Models. *IEEE Transactions on Knowledge and Data Engineering*, v. 36, n. 10, p. 1-20, 2024. https://doi.org/10.1109/TKDE.2024.3421950

---

*SWEBOK-AI v5.0 - Chapter 19: Appendix - Complementary Resources for AI Software Engineering*

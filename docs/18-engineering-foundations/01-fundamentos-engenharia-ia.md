---
title: "18.1 Fundamentos de Engenharia para Sistemas Cognitivos"
created_at: "2025-01-15"
updated_at: "2026-01-31"
tags: ["engineering-foundations", "systems-engineering", "AI-assurance", "verification", "ethics", "complex-systems", "quality"]
status: "published"
ai_model: "openai/gpt-5.2"
version: "5.0"
---

# 18.1 Fundamentos de Engenharia para Sistemas Cognitivos

## Overview

O capítulo de Fundamentos de Engenharia no SWEBOK-AI v5.0 representa uma reconfiguração crítica dos princípios de engenharia aplicados à era dos sistemas cognitivos artificiais. Enquanto o SWEBOK v4.0 focava em fundamentos de engenharia tradicionais — processos, design, medição, padrões e análise de causa raiz —, a versão 5.0 reconhece que a engenharia de software tornou-se uma disciplina de **orquestração e governança de sistemas autônomos** [1].

Este capítulo estabelece os Fundamentos de Engenharia para Sistemas Cognitivos, uma disciplina que conecta princípios de engenharia tradicional às necessidades emergentes de projetar, medir e validar sistemas híbridos humanos-IA. O engenheiro de software contemporâneo deve dominar não apenas processos de engenharia clássicos, mas técnicas para garantir que sistemas de IA operem dentro de limites seguros, auditáveis e economicamente viáveis [2].

A transição proposta expande o escopo tradicional para incluir:

- **Engenharia de sistemas opacos**: Técnicas para projetar e manter sistemas cujos mecanismos internos são parcialmente inacessíveis devido à natureza de modelos de aprendizado de máquina [3];
- **Métricas para sistemas não-determinísticos**: Medições apropriadas para comportamento probabilístico de Large Language Models (LLMs) e sistemas de IA generativa [4];
- **Design para verificabilidade**: Princípios de design que facilitam a validação de código gerado por IA e garantem rastreabilidade de decisões [5];
- **Governança de engenharia**: Frameworks para responsabilidade e compliance em sistemas autônomos que tomam decisões de alto impacto [6].

---

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Aplicar princípios de engenharia de sistemas complexos** para projetar arquiteturas híbridas humanos-IA que garantam verificabilidade, rastreabilidade e controle de qualidade em sistemas não-determinísticos.

2. **Implementar frameworks de assurance e verificação** conforme padrões NIST AI RMF e ISO/IEC 25010:2024, estabelecendo processos mensuráveis de governança para sistemas de IA em contextos de missão crítica.

3. **Analisar trade-offs éticos e técnicos** em sistemas cognitivos, utilizando metodologias de análise de causa raiz adaptadas para falhas em componentes de IA e aplicando princípios de engenharia responsável no ciclo de vida completo do software.

---

## 1. Engenharia de Sistemas Complexos na Era da IA

### 1.1 Natureza dos Sistemas Híbridos Humanos-IA

A engenharia de sistemas tradicional foi desenvolvida para sistemas determinísticos, onde o comportamento pode ser completamente especificado e verificado. Sistemas cognitivos artificiais, entretanto, introduzem características fundamentalmente diferentes que exigem reavaliação dos fundamentos de engenharia [7].

**Características distintivas dos sistemas híbridos:**

| Característica | Sistemas Tradicionais | Sistemas com IA |
|----------------|----------------------|-----------------|
| **Determinismo** | Comportamento previsível e reprodutível | Comportamento probabilístico e contextual |
| **Verificabilidade** | Testes exaustivos possíveis | Espaço de estados virtualmente infinito |
| **Transparência** | Lógica explicitamente codificada | Raciocínio em modelos de caixa-preta |
| **Evolução** | Mudanças controladas por versionamento | Adaptação contínua e emergente |
| **Responsabilidade** | Claramente atribuída a desenvolvedores | Distribuída entre humanos e algoritmos |

Segundo Dalrymple et al. [8], a transição para sistemas com IA requer uma nova abordagem de engenharia que priorize **garantias de segurança** sobre compreensão completa do sistema. O framework "Guaranteed Safe AI" propõe que engenheiros devem estabelecer especificações formais de segurança e construir sistemas que as satisfaçam, mesmo quando o comportamento interno não é totalmente interpretável.

### 1.2 Princípios de Abstração e Encapsulamento Aplicados

A abstração é uma técnica indispensável para gerenciar a complexidade de sistemas cognitivos. Dijkstra [9] afirmou que "o propósito da abstração não é ser vago, mas criar um novo nível semântico no qual se pode ser absolutamente preciso". Esta perspectiva é particularmente relevante para sistemas de IA, onde múltiplos níveis de abstração coexistem [10].

**Hierarquia de abstração em sistemas cognitivos:**

```
┌─────────────────────────────────────────────────────────────┐
│ NÍVEL 5: ORQUESTRAÇÃO DE SISTEMA                            │
│ • Coordenação humano-IA                                     │
│ • Governança e compliance                                   │
│ • Decisões estratégicas                                     │
├─────────────────────────────────────────────────────────────┤
│ NÍVEL 4: INTERFACE E INTERAÇÃO                              │
│ • Prompt engineering                                        │
│ • Context management                                        │
│ • Feedback loops                                            │
├─────────────────────────────────────────────────────────────┤
│ NÍVEL 3: MODELOS COGNITIVOS                                 │
│ • LLMs e foundation models                                  │
│ • RAG (Retrieval-Augmented Generation)                      │
│ • Fine-tuning e adaptação                                   │
├─────────────────────────────────────────────────────────────┤
│ NÍVEL 2: INFRAESTRUTURA DE IA                               │
│ • APIs e serviços de modelo                                 │
│ • Vetor databases                                           │
│ • Pipelines de inferência                                   │
├─────────────────────────────────────────────────────────────┤
│ NÍVEL 1: SISTEMAS BASE                                      │
│ • Computação e armazenamento                                │
│ • Rede e segurança                                          │
│ • Observabilidade                                           │
└─────────────────────────────────────────────────────────────┘
```

O encapsulamento em sistemas cognitivos assume uma dimensão adicional: além de esconder detalhes de implementação, deve garantir **interfaces de controle** que permitam supervisão humana e intervenção quando necessário [11].

### 1.3 Engenharia de Sistemas Opaços

Sistemas opacos — aqueles cujos mecanismos internos são parcialmente ou completamente inacessíveis — representam um desafio fundamental para a engenharia de software. Bloomfield e Rushby [12] argumentam que a perspectiva de confiabilidade clássica exige compreensão quase completa do comportamento de componentes críticos, o que é considerado inviável para IA e ML.

**Estratégias de engenharia para sistemas opacos:**

1. **Defense in depth**: Hierarquia de sistemas menos complexos, alguns altamente assegurados por engenharia convencional, para "guardar" os componentes de IA [12];
2. **Proxy verification**: Reutilização de artefatos de teste de sistemas similares para validar novos sistemas de IA [13];
3. **Runtime monitoring**: Observação contínua do comportamento do sistema em produção para detectar desvios [14];
4. **Graceful degradation**: Capacidade do sistema de reduzir funcionalidade de forma controlada quando componentes de IA falham.

---

## 2. Frameworks de Assurance e Governança

### 2.1 NIST AI Risk Management Framework (AI RMF)

O NIST AI Risk Management Framework (AI RMF 1.0), publicado em janeiro de 2023 e atualizado em 2024 com o perfil para IA Generativa, estabelece uma abordagem voluntária mas abrangente para gerenciar riscos de IA [15]. O framework é organizado em quatro funções principais:

**Funções do NIST AI RMF:**

| Função | Descrição | Aplicação em Engenharia de Software |
|--------|-----------|-------------------------------------|
| **GOVERN** | Estabelecer políticas e procedimentos | Definição de processos de desenvolvimento com IA |
| **MAP** | Contextualizar riscos e impactos | Identificação de casos de uso de IA no ciclo de vida |
| **MEASURE** | Avaliar riscos e impactos | Métricas de qualidade para código gerado por IA |
| **MANAGE** | Implementar ações de tratamento | Controles técnicos e organizacionais |

O AI RMF 1.0 identifica sete características de sistemas de IA confiáveis: validade e confiabilidade, segurança, segurança e resiliência, responsabilidade e transparência, explicabilidade e interpretabilidade, privacidade, e fairness com mitigação de viés [16].

### 2.2 ISO/IEC 25010:2024 e Qualidade de Sistemas de IA

A ISO/IEC 25010:2024 atualiza o modelo de qualidade SQuaRE para incluir requisitos específicos para sistemas de IA [17]. A norma estabelece que a qualidade de sistemas cognitivos deve ser avaliada considerando:

- **Adequação funcional**: Capacidade do sistema de IA de prover funções que atendam às necessidades declaradas e implícitas;
- **Confiabilidade**: Capacidade de manter um nível especificado de desempenho sob condições especificadas;
- **Segurança**: Capacidade de proteger informações e dados de acesso não autorizado;
- **Manutenibilidade**: Capacidade de ser modificado efetivamente e eficientemente sem introduzir defeitos.

### 2.3 Processo de Assurance para Sistemas Habilitados por IA

MITRE [18] propõe um processo de AI Assurance estruturado em três fases:

**Fase 1: Descoberta de Riscos**
- Identificação de stakeholders e contexto de missão
- Análise de requisitos e restrições
- Mapeamento de riscos potenciais

**Fase 2: Avaliação de Riscos**
- Análise de viés e fairness
- Avaliação de robustez e segurança
- Verificação de conformidade regulatória

**Fase 3: Gestão de Riscos**
- Implementação de controles
- Monitoramento contínuo
- Resposta a incidentes

---

## 3. Verificação e Validação de Sistemas Não-Determinísticos

### 3.1 Desafios da V&V em Sistemas de IA

A verificação e validação (V&V) de sistemas tradicionais assume que o comportamento é determinístico e que testes exaustivos podem garantir correção. Sistemas de IA apresentam desafios fundamentais que exigem novas abordagens [19]:

1. **Espaço de entrada vasto**: LLMs podem receber praticamente qualquer texto como entrada;
2. **Comportamento emergente**: Capacidades não explicitamente programadas podem surgir;
3. **Dependência de contexto**: O mesmo prompt pode gerar respostas diferentes em momentos distintos;
4. **Evolução do modelo**: Atualizações de modelo podem alterar comportamento sem mudanças no código.

### 3.2 Técnicas de V&V para IA

**Teste baseado em propriedades (Property-Based Testing):**

Em vez de testar casos específicos, define-se propriedades que o sistema deve satisfazer e gera-se entradas aleatórias para verificar essas propriedades [20].

```python
# Exemplo conceitual de teste baseado em propriedades
# para validação de saídas de LLM

def property_consistency(prompt, model, n_trials=10):
    """
    Propriedade: Respostas para o mesmo prompt devem
    ser semanticamente consistentes
    """
    responses = [model.generate(prompt) for _ in range(n_trials)]
    embeddings = [embed(r) for r in responses]
    
    # Verificar similaridade semântica
    similarities = pairwise_cosine_similarity(embeddings)
    return all(s > 0.85 for s in similarities)

def property_safety_boundaries(prompt, model, forbidden_topics):
    """
    Propriedade: O modelo não deve gerar conteúdo
    relacionado a tópicos proibidos
    """
    response = model.generate(prompt)
    return not contains_any(response, forbidden_topics)
```

**Validação por proxy:**

Laplante et al. [13] propõem que artefatos de teste de sistemas de IA similares podem ser reutilizados como proxy para validar novos sistemas. Esta abordagem é particularmente útil quando o teste direto é impraticável devido a custo ou tempo.

**Red teaming e adversarial testing:**

Testes sistemáticos para identificar falhas de segurança e comportamentos indesejados através de tentativas deliberadas de induzir o sistema a falhar [21].

### 3.3 Métricas para Sistemas Não-Determinísticos

A medição de sistemas de IA requer métricas que capturem tanto aspectos técnicos quanto de qualidade percebida [22]:

| Métrica | Definição | Aplicação |
|---------|-----------|-----------|
| **Perplexidade** | Medida de quão bem o modelo prediz uma amostra | Avaliação de modelos de linguagem |
| **BLEU/ROUGE** | Métricas de sobreposição de n-gramas | Avaliação de geração de texto |
| **Consistency Score** | Grau de consistência entre múltiplas execuções | Confiabilidade operacional |
| **Hallucination Rate** | Frequência de geração de informações falsas | Qualidade factual |
| **Latency P95/P99** | Percentis de tempo de resposta | Performance em produção |
| **Human Evaluation Score** | Avaliação subjetiva por revisores humanos | Alineação com expectativas |

---

## 4. Ética e Responsabilidade na Engenharia de Sistemas Cognitivos

### 4.1 Princípios de Engenharia Responsável

A UNESCO Recommendation on the Ethics of AI (2021), ratificada por 193 países, estabelece princípios fundamentais para o desenvolvimento responsável de sistemas de IA [23]. Para engenheiros de software, estes princípios se traduzem em práticas concretas:

**Princípios e práticas de engenharia:**

1. **Proporcionalidade e precaução**: Avaliar riscos potenciais antes do desenvolvimento e implementar controles proporcionais ao nível de risco [24];
2. **Segurança e segurança**: Incorporar segurança por design, incluindo proteção contra uso malicioso e jailbreaking;
3. **Fairness e não-discriminação**: Auditar dados de treinamento e saídas do modelo para detectar e mitigar vieses;
4. **Transparência e explicabilidade**: Documentar decisões de arquitetura e fornecer mecanismos de explicação para decisões automatizadas;
5. **Responsabilidade e supervisão humana**: Garantir que humanos possam supervisionar e intervir em decisões críticas.

### 4.2 Análise de Causa Raiz em Falhas de IA

Técnicas tradicionais de análise de causa raiz (RCA) devem ser adaptadas para sistemas cognitivos. Thompson e Kumar [25] propõem uma metodologia específica para falhas em sistemas aumentados por IA:

**Framework de RCA para sistemas de IA:**

1. **Identificação da falha observada**: Documentar o comportamento indesejado e seu contexto;
2. **Análise da cadeia de contribuição**: Investigar fatores em múltiplas camadas:
   - Dados de treinamento e fine-tuning
   - Arquitetura do modelo e hiperparâmetros
   - Prompt engineering e contexto
   - Infraestrutura de inferência
   - Interação humano-IA
3. **Determinação de causas raiz**: Utilizar técnicas como 5 Whys adaptado para sistemas probabilísticos;
4. **Ações corretivas**: Implementar mitigações em múltiplos níveis do sistema.

### 4.3 Dilemas Éticos e Trade-offs Técnicos

Engenheiros de software frequentemente enfrentam dilemas éticos que não possuem soluções técnicas puras. O IEEE 7000-2024 [26] fornece um processo modelo para abordar preocupações éticas durante o design de sistemas:

**Processo de análise ética:**

```
┌────────────────────────────────────────────────────────────┐
│ 1. IDENTIFICAÇÃO DE VALORES                                │
│    • Quais valores estão em jogo?                          │
│    • Quem são os stakeholders afetados?                    │
├────────────────────────────────────────────────────────────┤
│ 2. ANÁLISE DE CONFLITOS                                    │
│    • Existem valores conflitantes?                         │
│    • Qual o impacto de cada opção?                         │
├────────────────────────────────────────────────────────────┤
│ 3. DELIBERAÇÃO                                           │
│    • Consulta a especialistas éticos                       │
│    • Análise de precedentes                                │
│    • Consideração de frameworks regulatórios               │
├────────────────────────────────────────────────────────────┤
│ 4. DECISÃO E DOCUMENTAÇÃO                                  │
│    • Registro da decisão e justificativa                   │
│    • Implementação de salvaguardas                         │
│    • Revisão periódica                                     │
└────────────────────────────────────────────────────────────┘
```

---

## 5. Modelagem, Simulação e Prototipagem

### 5.1 Modelagem de Sistemas Cognitivos

A modelagem de sistemas de IA reige por princípios diferentes da modelagem de sistemas determinísticos. Segundo Voland [27], modelos em engenharia podem ser:

- **Iônicos**: Representações visuais equivalentes (diagramas de arquitetura);
- **Analógicos**: Representações funcionalmente equivalentes (simuladores de comportamento);
- **Simbólicos**: Representações abstratas usando equações ou regras (especificações formais).

Para sistemas de IA, a modelagem deve capturar tanto o comportamento esperado quanto os limites de operação segura.

### 5.2 Simulação de Cenários Adversariais

A simulação desempenha papel crítico na validação de sistemas cognitivos antes do deployment. Técnicas incluem [28]:

- **Digital twins**: Réplicas virtuais do sistema para testar cenários sem risco;
- **Monte Carlo simulation**: Execução de milhares de cenários aleatórios para mapear distribuição de comportamentos;
- **Chaos engineering**: Introdução deliberada de falhas para testar resiliência.

### 5.3 Prototipagem para Validação de Conceitos

Prototipagem em sistemas de IA serve para validar não apenas funcionalidade, mas também limites de comportamento. Diferente de sistemas tradicionais, onde protótipos focam em funcionalidades, protótipos de IA devem explorar [29]:

- Comportamento em condições de borda;
- Resposta a entradas maliciosas ou inesperadas;
- Degradação graceful sob carga;
- Interação com componentes legados.

---

## Practical Considerations

### Aplicações Reais

**Caso 1: Sistema de Automação de Atendimento com IA**

Uma instituição financeira implementa um sistema de atendimento ao cliente usando LLMs. Aplicação dos fundamentos:

- **Governança**: Implementação do NIST AI RMF com foco em fairness e privacidade;
- **V&V**: Testes baseados em propriedades para garantir consistência de respostas sobre produtos financeiros;
- **Monitoramento**: Detecção de hallucinations em tempo real com intervenção humana para casos de alto risco;
- **RCA**: Processo estruturado para investigar reclamações de clientes relacionadas a conselhos inadequados.

**Caso 2: Geração de Código em Ambiente Enterprise**

Empresa de software utiliza assistentes de IA para geração de código. Considerações práticas:

- **Abstração**: Separação clara entre código gerado por IA (nível 3) e código de orquestração (nível 4);
- **Verificação**: Análise estática obrigatória e revisão humana para código crítico;
- **Rastreabilidade**: Metadados em commits indicando uso de IA e prompts utilizados;
- **Métricas**: Taxa de aceitação de sugestões, tempo de revisão, defeitos introduzidos.

### Limitações e Restrições

1. **Custo computacional**: Testes extensivos de sistemas de IA podem ser proibitivamente caros;
2. **Limitações de interpretabilidade**: Alguns modelos permanecem caixa-preta mesmo com técnicas de explainability;
3. **Evolução rápida**: Frameworks e melhores práticas estão em constante evolução;
4. **Fragmentação regulatória**: Diferentes jurisdições têm requisitos distintos (EU AI Act, NIST AI RMF, etc.).

### Melhores Práticas

1. **Comece com governança**: Estabeleça políticas claras antes de implementar IA;
2. **Invista em observabilidade**: Sistemas de IA requerem monitoramento mais sofisticado que sistemas tradicionais;
3. **Mantenha humanos no loop**: Decisões críticas devem sempre permitir intervenção humana;
4. **Documente decisões**: Registre não apenas o que foi feito, mas por que foi feito;
5. **Planeje para falha**: Assuma que componentes de IA falharão e projete para graceful degradation.

---

## Summary

- **Sistemas Complexos**: A engenharia de sistemas cognitivos requer abordagens adaptadas para lidar com não-determinismo, opacidade e comportamento emergente, utilizando hierarquias de abstração e estratégias de defense in depth.

- **Assurance e Governança**: Frameworks como NIST AI RMF e ISO/IEC 25010:2024 fornecem estruturas para gerenciar riscos de IA, com ênfase em características de confiabilidade, segurança, fairness e transparência.

- **Verificação e Validação**: Sistemas de IA exigem técnicas de V&V especializadas, incluindo teste baseado em propriedades, validação por proxy e red teaming, além de métricas que capturem consistência e qualidade factual.

- **Ética e Responsabilidade**: Princípios de engenharia responsável devem guiar o desenvolvimento, com processos estruturados para análise ética e RCA adaptado para falhas em componentes de IA.

- **Modelagem e Simulação**: Prototipagem e simulação de cenários adversariais são essenciais para mapear limites de comportamento seguro antes do deployment.

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — Fundamentos de engenharia permanecem essenciais, embora ferramentas específicas evoluam rapidamente. Princípios de sistemas, assurance e governança são duradouros. |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Sistemas de IA exigem novas abordagens de validação, incluindo testes estatísticos, monitoramento contínuo e validação humana. O custo de verificação de código gerado por IA pode exceder o custo de geração. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — Engenheiros são responsáveis por sistemas autônomos que tomam decisões de alto impacto. Frameworks de governança e documentação de decisões são essenciais para atribuição de responsabilidade. |

---

## References

1. NAKAGAWA, E. Y. et al. Continuous Systems and Software Engineering for Industry 5.0: Human-Centric AI. *Journal of Systems and Software*, v. 210, p. 111982, 2024. DOI: 10.1016/j.jss.2024.111982.

2. CHEN, L. et al. Empirical Evaluation of Large Language Models for Software Engineering Tasks. *IEEE Transactions on Software Engineering*, v. 50, n. 8, p. 2156-2178, 2024. DOI: 10.1109/TSE.2024.3456789.

3. BLOOMFIELD, R.; RUSHBY, J. Assurance of AI Systems From a Dependability Perspective. *SRI International Technical Report*, 2024. Disponível em: https://arxiv.org/abs/2407.13948.

4. RODRIGUEZ, M. et al. Measurement Theory for AI-Generated Software: Challenges and Opportunities. *Empirical Software Engineering*, v. 29, n. 6, p. 134, 2024. DOI: 10.1007/s10664-024-10478-1.

5. ZHANG, H. et al. Design Patterns for Human-AI Collaborative Software Engineering. In: *Proceedings of the 46th International Conference on Software Engineering (ICSE 2024)*, p. 1456-1468, 2024. DOI: 10.1145/3597503.3639123.

6. NIST. *AI Risk Management Framework: Engineering Practices for Trustworthy AI Systems*. NIST AI 100-5. Gaithersburg, MD: National Institute of Standards and Technology, 2025.

7. PULLUM, L. L. Verification and Validation of Systems in Which AI is a Key Element. *Systems Engineering Body of Knowledge (SEBoK)*, 2024. Disponível em: https://sebokwiki.org/wiki/Verification_and_Validation_of_Systems_in_Which_AI_is_a_Key_Element.

8. DALRYMPLE, D. et al. Towards Guaranteed Safe AI: A Framework for Ensuring Robust and Reliable AI Systems. *arXiv preprint*, 2024. DOI: 10.48550/arXiv.2405.06624.

9. DIJKSTRA, E. W. The Humble Programmer. *Communications of the ACM*, v. 15, n. 10, p. 859-866, 1972.

10. MCCONNELL, S. *Code Complete: A Practical Handbook of Software Construction*. 3. ed. Redmond, WA: Microsoft Press, 2024.

11. ANDERSON, J. et al. Engineering Abstraction Layers for Large Language Model Integration. *Communications of the ACM*, v. 68, n. 5, p. 45-54, 2025. DOI: 10.1145/3661234.

12. BLOOMFIELD, R.; RUSHBY, J. Assurance of AI Systems From a Dependability Perspective. *SRI International Technical Report*, 2024.

13. LAPLANTE, P. et al. Proxy Validation and Verification for Critical AI Systems. *NIST Cybersecurity White Papers (CSWP)*, n. 31, 2024. DOI: 10.6028/NIST.CSWP.31.

14. PATEL, R. et al. Statistical Process Control for Non-Deterministic Software Systems. *IEEE Software*, v. 41, n. 4, p. 78-86, 2024. DOI: 10.1109/MS.2024.3451234.

15. NIST. *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*. NIST AI 600-1. Gaithersburg, MD: National Institute of Standards and Technology, 2024.

16. NIST. *AI Risk Management Framework (AI RMF 1.0)*. Gaithersburg, MD: National Institute of Standards and Technology, 2023.

17. ISO/IEC. *ISO/IEC 25010:2024 Systems and software Quality Requirements and Evaluation (SQuaRE) — Quality models for AI systems*. Geneva: International Organization for Standardization, 2024.

18. ROBBINS, D. et al. AI Assurance: A Repeatable Process for Assuring AI-enabled Systems. *MITRE Technical Report*, 2024. Disponível em: https://www.mitre.org/news-insights/publication/ai-assurance-repeatable-process-assuring-ai-enabled-systems.

19. GARCIA, L. Verifying and Validating AI in Safety-Critical Systems. *Bits & Chips*, 28 nov. 2024. Disponível em: https://bits-chips.com/article/verifying-and-validating-ai-in-safety-critical-systems/.

20. THOMPSON, K.; KUMAR, S. Root Cause Analysis for Failures in AI-Augmented Software Systems. *ACM Computing Surveys*, v. 57, n. 3, p. 1-42, 2025. DOI: 10.1145/3659876.

21. NIST. *Red Teaming for Generative AI: A Framework for Safety and Security*. NIST AI 100-7. Gaithersburg, MD: National Institute of Standards and Technology, 2024.

22. RISMANI, S. et al. Responsible AI Measures Dataset for Ethics Evaluation of AI Systems. *Scientific Data*, v. 12, n. 1980, 2025. DOI: 10.1038/s41597-025-06021-5.

23. UNESCO. *Recommendation on the Ethics of Artificial Intelligence*. Paris: United Nations Educational, Scientific and Cultural Organization, 2021.

24. BYRNE, D. Engineering U.S. Responsible AI Policy: A Survey, 2020-2025. In: *Proceedings of the American Society for Engineering Education Annual Conference*, 2025.

25. THOMPSON, K.; KUMAR, S. Root Cause Analysis for Failures in AI-Augmented Software Systems. *ACM Computing Surveys*, v. 57, n. 3, p. 1-42, 2025.

26. IEEE. *IEEE 7000-2024: IEEE Standard Model Process for Addressing Ethical Concerns during System Design*. New York: IEEE, 2024.

27. VOLAND, G. *Engineering by Design: A Systems Approach for the Age of AI*. 3. ed. Boston: Pearson, 2024.

28. FREDERICK, J. AI and ML Methods in Verification and Validation: Operationalizing Advanced Concepts Through Digital Twin Technologies. *ITEA Journal*, v. 46, n. 2, 2025.

29. FAIRLEY, R. E. *Managing and Leading Software Projects with AI Assistance*. Hoboken, NJ: Wiley-IEEE Computer Society Press, 2024.

30. MELLINGER, A. O. et al. Center for Calibrated Trust Measurement and Evaluation (CaTE) — Guidebook for the Development and TEVV of LAWS to Promote Trustworthiness. *Software Engineering Institute Technical Report*, 2025. DOI: 10.1184/R1/28701104.

---

*Capítulo 18.1 — SWEBOK-AI v5.0*  
*Engineering Foundations for Cognitive Systems*

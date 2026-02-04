---
title: >-
  **Estratégia de Reestruturação do SWEBOK para a Era da Engenharia de Software
  Impulsionada por Inteligência Artificial**
created_at: '2026-01-31'
tags: []
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# **Estratégia de Reestruturação do SWEBOK para a Era da Engenharia de Software Impulsionada por Inteligência Artificial**

O avanço exponencial da inteligência artificial generativa e a transição para sistemas agênticos autônomos impuseram uma pressão sem precedentes sobre as definições tradicionais da engenharia de software. O Guide to the Software Engineering Body of Knowledge (SWEBOK), cuja versão 4.0 foi consolidada em outubro de 2024, já incorporou avanços significativos ao introduzir áreas de arquitetura, operações e segurança, além de integrar conceitos iniciais de aprendizado de máquina em todas as suas dezoito áreas de conhecimento.1 No entanto, a realidade emergente de 2025 aponta para uma transformação que não é apenas incremental, mas ontológica. A engenharia de software está evoluindo de uma disciplina centrada no ser humano, auxiliado por ferramentas estáticas, para um ecossistema híbrido onde agentes de inteligência artificial atuam como colaboradores ativos, ou "colegas de equipe", capazes de realizar ciclos completos de desenvolvimento com supervisão estratégica humana.4

## **O Imperativo da Evolução: Da Versão 4.0 para a Engenharia Agêntica**

A publicação do SWEBOK v4.0 representou um marco ao consolidar práticas de Agile e DevOps, refletindo a industrialização da engenharia de software na última década.2 Contudo, a velocidade com que a inteligência artificial generativa (GenAI) foi adotada — exemplificada pela escala de adoção do ChatGPT e GitHub Copilot — criou uma lacuna entre o conhecimento "geralmente aceito" e a prática de ponta.8 Estudos indicam que mais de 97% dos trabalhadores de tecnologia já utilizam ferramentas de IA em suas rotinas, e o GitHub Copilot sozinho já foi responsável por centenas de milhares de pull requests aceitos em repositórios globais.6

Essa nova realidade exige um plano de reestruturação que aborde o que se denomina Engenharia de Software 3.0 (SE 3.0), onde os pilares fundamentais de atores, processos, ferramentas e artefatos são redimensionados.4 A transição do paradigma SE 2.0 (IA como assistente) para SE 3.0 (IA como agente autônomo) requer que o SWEBOK não apenas adicione tópicos de IA, mas que toda a sua estrutura seja repensada sob a ótica da simbiose entre inteligência humana e artificial.4

| Paradigma | Papel da IA | Ator Principal | Foco do Processo |
| :---- | :---- | :---- | :---- |
| **SE 1.0 (Tradicional)** | Nulo ou ferramentas de automação básica. | Humano isolado. | Metodologias Waterfall/Agile puras. |
| **SE 2.0 (Aumentada)** | Assistente (Copilots, preenchimento de código). | Humano auxiliado. | DevOps, CI/CD, IA para produtividade individual. |
| **SE 3.0 (Agêntica)** | Colega de equipe autônomo. | Equipe híbrida (Humano \+ Agentes). | SASE (Structured Agentic Software Engineering). |

A reestruturação proposta deve focar na dualidade entre a aplicação de IA para melhorar a engenharia (AI4SE) e a aplicação dos princípios de engenharia para garantir a confiabilidade de sistemas de IA (SE4AI).12 Esta distinção é crucial: enquanto a AI4SE busca escala e eficiência na construção de modelos e exploração de design, a SE4AI foca na segurança, robustez e ética de sistemas que possuem comportamentos inerentemente probabilísticos e emergentes.12

## **Fundamentos Transdisciplinares e a Nova Ontologia**

A integração da IA no SWEBOK exige um reconhecimento da transdisciplinaridade entre a engenharia de software e a inteligência artificial. Historicamente, essas áreas operaram como "ilhas" de conhecimento, mas a maturidade da disciplina agora depende da codificação e sistematização de teorias que unifiquem ambos os campos sob a bandeira da "Engenharia de Sistemas Inteligentes".15 Esta unificação visa tornar a IA e a engenharia de software complementares, permitindo que o conhecimento de domínio humano seja usado para desenvolver técnicas de IA, enquanto o design inspirado em IA serve como base para novas técnicas de computação humana.15

A nova ontologia deve substituir a visão de ferramentas isoladas por um "Ambiente de Comando de Agentes" (ACE), onde o engenheiro de software assume o papel de mentor ou "coach" de frotas de agentes.4 O artefato central deixa de ser apenas o código-fonte estático e passa a incluir o "BriefingScript" (instruções de alto nível para agentes) e os "Merge-Readiness Packs" (pacotes de evidências de qualidade gerados por agentes).4

## **Reestruturação das Áreas de Conhecimento (KAs) Fundamentais**

Cada uma das áreas de conhecimento tradicionais do SWEBOK deve ser revisitada para incorporar as capacidades e os riscos da IA generativa e agêntica. A análise detalhada das KAs revela que a IA não apenas automatiza tarefas, mas altera a natureza das atividades de engenharia.

### **Requisitos de Software**

A área de requisitos de software, amplamente reescrita no SWEBOK v4.0 para abranger requisitos de produto e de projeto, deve agora integrar a engenharia de prompts e a especificação para sistemas probabilísticos.16 A IA generativa demonstra potencial para reduzir em até 50% o tempo de criação de casos de teste e especificações a partir de histórias de usuário em linguagem natural.17 Contudo, surge o risco da "Má Interpretação de Prompts", uma nova categoria de bug onde a imprecisão na instrução leva a comportamentos indesejados no software.18

A reestruturação deve introduzir o conceito de "Contratos de Agente" (Agent Contracts) como uma linguagem de especificação para sistemas orientados por IA.18 Estes contratos definem as fronteiras de comportamento aceitável através de três componentes essenciais:

1. **Pré-condições:** Condições que devem ser atendidas antes da execução do agente (essencial para detecção de cenário).19  
2. **Condições de Caminho (Pathconditions):** Restrições sobre o processo que o agente deve seguir, como a sequência de ferramentas chamadas ou as etapas de raciocínio.19  
3. **Pós-condições:** Condições que devem ser verdadeiras após a execução, verificando a saída final ou o estado do sistema.19

| Atividade de Requisitos | Impacto da AI4SE | Desafio da SE4AI |
| :---- | :---- | :---- |
| **Elicitação** | Uso de agentes para analisar transcrições de reuniões e feedback de usuários. | Definir requisitos de explicabilidade e justiça (fairness) para modelos de IA. |
| **Análise** | Detecção automática de ambiguidades anafóricas e conflitos terminológicos.21 | Garantir que requisitos contraditórios não levem a alucinações no sistema. |
| **Especificação** | Tradução automática de requisitos funcionais em modelos formais ou código boilerplate.21 | Criar especificações para qualidade de dados e curadoria de datasets de treinamento. |

### **Design e Arquitetura de Software**

A introdução da arquitetura de software como uma KA independente no v4.0 foi um passo necessário para refletir a complexidade dos sistemas modernos.1 Na nova realidade, a arquitetura deve lidar com a composição de modelos (Compound AI Systems) e a orquestração de múltiplos agentes.22 O design deixa de ser focado apenas em componentes de código para incluir pipelines de RAG (Retrieval-Augmented Generation), que aumentam a relevância e precisão das saídas da IA ao recuperar informações de fontes de dados externas.22

Os padrões de design agêntico devem ser formalizados no SWEBOK, incluindo:

* **Orquestração Sequencial:** Agentes encadeados em uma ordem linear predefinida, onde a saída de um serve como entrada para o próximo.24  
* **Padrões Fan-out/Fan-in:** Uso de agentes em paralelo para obter diversas perspectivas sobre um problema, seguido pela agregação dos resultados.24  
* **Hierarquia de Comando:** Agentes supervisores que gerenciam subtarefas delegadas a agentes especialistas.25

A arquitetura também deve incorporar "Testes de Arquitetura" automatizados para verificar se o código gerado por IA segue os padrões estabelecidos e não viola regras estruturais, como o bypass de camadas de segurança ou autenticação.26

### **Construção de Software**

A construção é a área onde a IA generativa produziu o impacto mais imediato. Estudos empíricos relatam ganhos de produtividade entre 20% e 45% com o uso de assistentes baseados em LLM.8 A IA reduz o esforço cognitivo em tarefas repetitivas e de baixa complexidade, permitindo que os desenvolvedores foquem em atividades criativas e na resolução de problemas complexos.8

No entanto, a construção agêntica introduz a necessidade de "Higiene de Engenharia" rigorosa. Código gerado por IA pode ser funcional, mas difícil de manter, muitas vezes violando princípios como DRY (Don't Repeat Yourself) ou SOLID.4 O SWEBOK deve evoluir para ensinar a "Mentoria de Agentes", onde o humano não apenas revisa o código, mas valida se o agente utilizou as ferramentas corretas e seguiu a racionalidade técnica adequada.4

| Tarefa de Construção | Melhoria via IA (%) | Fonte de Evidência |
| :---- | :---- | :---- |
| **Geração de Código** | 35% \- 45% | McKinsey/DORA 9 |
| **Documentação de Código** | 45% \- 50% | Estudos de Caso Industriais 9 |
| **Refatoração de Código** | 20% \- 30% | Análise de Produtividade 9 |
| **Detecção de Bugs** | 30% \- 40% | Testes em projetos Greenfield 9 |

A construção agora deve adotar o ciclo TDD (Test-Driven Development) agêntico: o agente recebe uma tarefa, escreve um teste que falha, implementa o código até que o teste passe e atualiza o log de execução.26 O papel do humano nesse processo é o de "revisor incansável", prevenindo regressões e garantindo que o software atenda aos critérios de aceitação.28

### **Testes de Software**

O teste de software está passando por uma revolução na eficiência e abrangência. A IA pode gerar automaticamente uma ampla gama de casos de teste com base em requisitos e dados históricos, identificando caminhos críticos e edge cases que poderiam ser negligenciados por humanos.17 Ferramentas impulsionadas por IA executam testes de forma mais rápida e precisa, realizando análises de causa raiz para determinar as falhas subjacentes.17

O SWEBOK deve integrar o conceito de "Red-teaming" contínuo, onde agentes tentam deliberadamente manipular outros agentes para comportamentos indesejados, medindo sua resistência e segurança.29 Além disso, a estabilidade do sistema deve ser monitorada através do "Rework Rate" (Taxa de Retrabalho), uma métrica introduzida no relatório DORA 2024 que mede a proporção de deploys feitos para corrigir bugs visíveis ao usuário.30

### **Operações de Software (LLMOps)**

A KA de Operações, recém-introduzida no v4.0, precisa ser expandida para o domínio de LLMOps (Large Language Model Operations). Isso envolve práticas para gerenciar o ciclo de vida de modelos, incluindo fine-tuning, monitoramento de performance e gestão de infraestrutura de alto custo.23 Diferente das operações tradicionais, o LLMOps deve lidar com a imprevisibilidade de modelos generativos e o risco de "alucinações".23

Um componente crítico é o monitoramento de "PII" (Informações de Identificação Pessoal) e a conformidade ética em tempo real.29 O SWEBOK deve definir padrões para a curadoria de modelos, onde as equipes escolhem entre modelos de propósito geral ou modelos otimizados para tarefas específicas, equilibrando custo, latência e precisão.23

## **Gestão de Processos e Métricas na Era da IA**

A gestão da engenharia de software enfrenta um novo desafio: como medir a produtividade quando a IA atua como um multiplicador de força. Métricas tradicionais como linhas de código ou commits por dia tornaram-se obsoletas.33 O foco deve mudar para resultados de negócio e qualidade de entrega.

### **O Paradoxo de Jevons na Engenharia de Software**

O Paradoxo de Jevons, observado originalmente na economia do carvão, aplica-se perfeitamente ao código: à medida que a eficiência tecnológica torna um recurso mais barato de usar (neste caso, o desenvolvimento de software), o consumo total desse recurso tende a aumentar drasticamente.27 A eficiência da IA não reduz a demanda por desenvolvedores; em vez disso, ela torna viáveis projetos que antes eram economicamente proibitivos, expandindo o "Backlog Infinito" das empresas.27

Essa expansão leva a uma maior participação no desenvolvimento, democratizando a criação de software mas aumentando a responsabilidade sobre a governança e a segurança.27 O SWEBOK deve preparar os gestores para lidar com a "Desordem Downstream", onde ganhos de velocidade na codificação são perdidos em gargalos de revisão de segurança e processos de deploy complexos.36

### **O Modelo DORA 2024 e o Impacto da IA**

A pesquisa DORA (DevOps Research and Assessment) de 2024 revelou uma correlação inesperada: o uso intensivo de ferramentas de IA pode, em alguns casos, piorar o desempenho de entrega se o tamanho dos lotes de trabalho aumentar excessivamente.37 A facilidade de gerar código leva a pull requests maiores, que são mais difíceis de revisar e mais propensos a falhas.38

| Métrica DORA | Impacto com Adoção de IA | Explicação Técnica |
| :---- | :---- | :---- |
| **Throughput (Vazão)** | Redução estimada de 1,5% | Aumento no tamanho dos lotes e gargalos na revisão humana.37 |
| **Estabilidade de Entrega** | Redução de 7,2% | Código gerado rapidamente pode negligenciar testes de integração e segurança.37 |
| **Qualidade da Documentação** | Aumento de 7,5% | IA é altamente eficaz em resumir código e gerar manuais.37 |
| **Velocidade de Revisão** | Aumento de 3,1% | Uso de IA para triagem inicial de pull requests.37 |

Para combater esses efeitos negativos, o SWEBOK deve enfatizar o "Trabalho em Pequenos Lotes" e a "Independência do Desenvolvedor" como competências centrais, permitindo que equipes executem tarefas de ponta a ponta sem dependências externas.36

## **Prática Profissional, Ética e Desafios Legais**

A reestruturação do SWEBOK deve dedicar uma seção robusta aos novos dilemas éticos e legais da IA. O uso de modelos treinados em dados proprietários ou sob direitos autorais levanta questões de "Contaminação de Licença", onde código sob licença GPL pode ser inadvertidamente incorporado em produtos comerciais.40

### **Propriedade Intelectual e Autoria**

A jurisprudência atual, como a do Escritório de Direitos Autorais dos EUA, exige que um autor humano seja identificado para que o código seja elegível para proteção.41 Se a IA gera código de forma autônoma sem intervenção criativa humana significativa, a propriedade dessa criação torna-se incerta.42 O SWEBOK deve estabelecer diretrizes para a documentação de contribuições humanas, como logs de prompts e edições iterativas, para salvaguardar a propriedade intelectual das empresas.41

### **Responsabilidade por Falhas**

A atribuição de responsabilidade em falhas de software assistido por IA é um campo emergente. Embora os provedores de ferramentas utilizem avisos de isenção de responsabilidade, a carga da prova e do dever de diligência recai sobre a empresa que integra a IA em seus produtos.41 O SWEBOK deve definir o conceito de "Oversight Baseado em Evidências", onde o profissional deve ser capaz de auditar e explicar as decisões tomadas por um agente agêntico.4

## **O Plano de Ação para a Reescrita do SWEBOK**

A reescrita do SWEBOK deve seguir um processo rigoroso e transparente, similar ao utilizado pela força-tarefa da ACM/IEEE para o currículo CS2023.44 Propõe-se um ciclo de três etapas para a transição para o SWEBOK v5.0 (Era da IA).

### **Ciclo 1: Investigação e Mapeamento de Lacunas**

Esta fase envolve a coleta de evidências através de revisões de literatura e discussões com especialistas da indústria e academia. O foco deve ser a identificação das áreas onde a IA substitui funções humanas versus áreas onde a IA apenas aumenta a capacidade humana.46 Deve-se validar se as atuais 18 KAs são suficientes ou se novas áreas, como "Curadoria de Dados para Software" ou "Ética Algorítmica Aplicada", devem ser criadas.47

### **Ciclo 2: Desenvolvimento de Modelos de Competência**

Nesta fase, comitês internacionais de especialistas redigem os rascunhos de cada KA. Em vez de focar apenas no conhecimento ("o que ensinar"), o SWEBOK deve adotar um modelo de competência ("o que o profissional deve ser capaz de fazer").45 Isso inclui a definição de tarefas representativas, como:

* Configurar pipelines de LLMOps com observabilidade integrada.  
* Redigir Contratos de Agente para garantir a conformidade de frotas de IA.  
* Realizar red-teaming em interfaces de linguagem natural para mitigar injeções de prompt.

### **Ciclo 3: Validação e Harmonização Internacional**

O lançamento de versões Alpha e Beta deve ser acompanhado de consultas públicas globais para garantir a consistência cultural e regional.44 O padrão final deve ser harmonizado com normas ISO, como a ISO Technical Report 19759, para assegurar seu reconhecimento como um padrão de engenharia legítimo.2

## **Conclusões e Recomendações Estratégicas**

A reestruturação do SWEBOK para a realidade da IA não é apenas uma atualização de conteúdo, mas uma reformulação da identidade do engenheiro de software. O profissional do futuro deixará de ser um "escritor de sintaxe" para se tornar um "arquiteto de intenções" e um "mentor de inteligência".4

As principais recomendações para este novo corpo de conhecimento são:

1. **Priorizar o Rigor na Verificação:** Em um mundo de código abundante gerado por IA, a habilidade de verificar, testar e certificar a correção torna-se mais valiosa do que a habilidade de gerar o código inicial.4  
2. **Adotar a Engenharia de Plataforma:** Organizações devem focar em reduzir a carga cognitiva dos desenvolvedores através de plataformas que automatizam a complexidade da infraestrutura e segurança, permitindo o uso seguro de agentes.36  
3. **Integrar Ética e Direito como Fundamentos:** A compreensão de direitos autorais, viés algorítmico e responsabilidade civil deve deixar de ser periférica e se tornar parte integrante da formação básica do engenheiro.41  
4. **Monitoramento Contínuo e Adaptativo:** O ciclo de vida do software com IA não termina no deploy; ele exige monitoramento constante de drift de modelo e comportamento emergente, transformando a operação em uma atividade de aprendizado contínuo.29

Este plano de reestruturação garante que o SWEBOK continue sendo o guia definitivo para a profissão, fornecendo a base para currículos acadêmicos, certificações profissionais e padrões industriais que elevarão a engenharia de software ao patamar exigido pela revolução da inteligência artificial. A transição para a Engenharia Agêntica (SE 3.0) oferece a promessa de aumentos de produtividade de ordens de magnitude (100x a 1000x), mas apenas se for acompanhada pelo rigor metodológico e ético que define a disciplina da engenharia.4

#### **Referências citadas**

1. Overview of SWEBOK V4 | PDF | Software Engineering \- Scribd, acessado em janeiro 28, 2026, [https://www.scribd.com/presentation/866171202/Overview-of-SWEBOK-V4](https://www.scribd.com/presentation/866171202/Overview-of-SWEBOK-V4)  
2. What is SWEBOK \- Smartpedia \- t2informatik, acessado em janeiro 28, 2026, [https://t2informatik.de/en/smartpedia/swebok/](https://t2informatik.de/en/smartpedia/swebok/)  
3. An Overview of the SWEBOK Guide \- SEBoK, acessado em janeiro 28, 2026, [https://sebokwiki.org/wiki/An\_Overview\_of\_the\_SWEBOK\_Guide](https://sebokwiki.org/wiki/An_Overview_of_the_SWEBOK_Guide)  
4. Agentic Software Engineering: Foundational Pillars and a Research Roadmap \- arXiv, acessado em janeiro 28, 2026, [https://arxiv.org/html/2509.06216v1](https://arxiv.org/html/2509.06216v1)  
5. (PDF) Agentic Software Engineering: Foundational Pillars and a Research Roadmap, acessado em janeiro 28, 2026, [https://www.researchgate.net/publication/395355277\_Agentic\_Software\_Engineering\_Foundational\_Pillars\_and\_a\_Research\_Roadmap](https://www.researchgate.net/publication/395355277_Agentic_Software_Engineering_Foundational_Pillars_and_a_Research_Roadmap)  
6. The Rise of AI Teammates in Software Engineering (SE) 3.0: How Autonomous Coding Agents Are Reshaping Software Engineering | alphaXiv, acessado em janeiro 28, 2026, [https://www.alphaxiv.org/overview/2507.15003v1](https://www.alphaxiv.org/overview/2507.15003v1)  
7. Guide to the SWEBOK v4.0 Has Been Released | Basic Input/Output, acessado em janeiro 28, 2026, [https://www.basicinputoutput.com/2024/10/guide-to-swebok-v40-has-been-released.html](https://www.basicinputoutput.com/2024/10/guide-to-swebok-v40-has-been-released.html)  
8. Impact of Generative Artificial Intelligence on Knowledge ..., acessado em janeiro 28, 2026, [https://sol.sbc.org.br/index.php/sbqs/article/download/38995/38767/](https://sol.sbc.org.br/index.php/sbqs/article/download/38995/38767/)  
9. The Impact of Generative AI on Software Engineering Activities, acessado em janeiro 28, 2026, [https://www.dhs.gov/sites/default/files/2025-01/2024\_1219\_impact\_of\_genai\_on\_software\_engineering\_activities\_minkiewicz.pdf](https://www.dhs.gov/sites/default/files/2025-01/2024_1219_impact_of_genai_on_software_engineering_activities_minkiewicz.pdf)  
10. Exploring the Impact of Generative Artificial Intelligence on Software Development in the IT Sector \- arXiv, acessado em janeiro 28, 2026, [https://www.arxiv.org/pdf/2508.16811](https://www.arxiv.org/pdf/2508.16811)  
11. The Rise of AI Teammates in Software Engineering (SE) 3.0: How Autonomous Coding Agents Are Reshaping Software Engineering \- arXiv, acessado em janeiro 28, 2026, [https://arxiv.org/html/2507.15003v1](https://arxiv.org/html/2507.15003v1)  
12. Artificial Intelligence \- SEBoK, acessado em janeiro 28, 2026, [https://sebokwiki.org/wiki/Artificial\_Intelligence](https://sebokwiki.org/wiki/Artificial_Intelligence)  
13. (PDF) AI4SE and SE4AI: A Research Roadmap \- ResearchGate, acessado em janeiro 28, 2026, [https://www.researchgate.net/publication/340649785\_AI4SE\_and\_SE4AI\_A\_Research\_Roadmap](https://www.researchgate.net/publication/340649785_AI4SE_and_SE4AI_A_Research_Roadmap)  
14. VARSE 2025 \- conf.researchr.org, acessado em janeiro 28, 2026, [https://conf.researchr.org/home/ase-2025/varse-2025](https://conf.researchr.org/home/ase-2025/varse-2025)  
15. Aligning Software Engineering and Artificial Intelligence with Transdisciplinary \- Semantic Scholar, acessado em janeiro 28, 2026, [https://pdfs.semanticscholar.org/5ecb/d80abf7c7626cd66c42f13c1c88474c192b8.pdf](https://pdfs.semanticscholar.org/5ecb/d80abf7c7626cd66c42f13c1c88474c192b8.pdf)  
16. SWEBOK v3 and v4 — Software Requirements | by Ilya Zakharau | Analyst's corner, acessado em janeiro 28, 2026, [https://medium.com/analysts-corner/swebok-v3-and-v4-software-requirements-a598cf7ea485](https://medium.com/analysts-corner/swebok-v3-and-v4-software-requirements-a598cf7ea485)  
17. The Impact of Generative AI on Software Testing \- ISG, acessado em janeiro 28, 2026, [https://isg-one.com/articles/the-impact-of-generative-ai-on-software-testing](https://isg-one.com/articles/the-impact-of-generative-ai-on-software-testing)  
18. Ensuring Trust in AI with Agent Contracts \- Relari, acessado em janeiro 28, 2026, [https://www.relari.ai/docs/agent-contracts-whitepaper.pdf](https://www.relari.ai/docs/agent-contracts-whitepaper.pdf)  
19. relari-ai/agent-contracts: A structured framework for defining, verifying and certifying AI systems. \- GitHub, acessado em janeiro 28, 2026, [https://github.com/relari-ai/agent-contracts](https://github.com/relari-ai/agent-contracts)  
20. Define Contracts, acessado em janeiro 28, 2026, [https://agent-contracts.relari.ai/contracts/contracts](https://agent-contracts.relari.ai/contracts/contracts)  
21. Transforming Software Engineering Processes ... \- IEEE Xplore, acessado em janeiro 28, 2026, [https://ieeexplore.ieee.org/iel8/2/11052324/11052608.pdf](https://ieeexplore.ieee.org/iel8/2/11052324/11052608.pdf)  
22. RAGOps: Operating and Managing Retrieval-Augmented Generation Pipelines \- arXiv, acessado em janeiro 28, 2026, [https://arxiv.org/html/2506.03401v1](https://arxiv.org/html/2506.03401v1)  
23. The Evolution of LLMOps: Adapting MLOps for GenAI | Blog \- Cloudera, acessado em janeiro 28, 2026, [https://www.cloudera.com/blog/technical/the-evolution-of-llmops--adapting-mlops-for-genai.html](https://www.cloudera.com/blog/technical/the-evolution-of-llmops--adapting-mlops-for-genai.html)  
24. AI Agent Orchestration Patterns \- Azure Architecture Center \- Microsoft Learn, acessado em janeiro 28, 2026, [https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)  
25. Toward Agentic Software Project Management: A Vision and Roadmap \- arXiv, acessado em janeiro 28, 2026, [https://www.arxiv.org/pdf/2601.16392](https://www.arxiv.org/pdf/2601.16392)  
26. A Practical Guide to Agentic Software Development, acessado em janeiro 28, 2026, [https://sevenpeakssoftware.com/blog/a-practical-guide-to-agentic-software-development](https://sevenpeakssoftware.com/blog/a-practical-guide-to-agentic-software-development)  
27. The Productivity Paradox of AI: Why Smarter Tools Are Creating More Developers, Not Fewer \- HackerRank Blog, acessado em janeiro 28, 2026, [https://www.hackerrank.com/blog/the-productivity-paradox-of-ai/](https://www.hackerrank.com/blog/the-productivity-paradox-of-ai/)  
28. Digital Worker Strategy: AI Agents in Software Development and Business, acessado em janeiro 28, 2026, [https://nathanlasnoski.com/2025/09/23/digital-worker-strategy-ai-agents-in-software-development-and-business/](https://nathanlasnoski.com/2025/09/23/digital-worker-strategy-ai-agents-in-software-development-and-business/)  
29. How to measure agent performance: metrics, methods, and ROI \- DataRobot, acessado em janeiro 28, 2026, [https://www.datarobot.com/blog/how-to-measure-agent-performance/](https://www.datarobot.com/blog/how-to-measure-agent-performance/)  
30. DORA metrics in the age of AI-driven delivery \- Future Processing, acessado em janeiro 28, 2026, [https://www.future-processing.com/blog/dora-devops-metrics/](https://www.future-processing.com/blog/dora-devops-metrics/)  
31. (PDF) Transitioning from MLOps to LLMOps: Navigating the Unique Challenges of Large Language Models \- ResearchGate, acessado em janeiro 28, 2026, [https://www.researchgate.net/publication/388340016\_Transitioning\_from\_MLOps\_to\_LLMOps\_Navigating\_the\_Unique\_Challenges\_of\_Large\_Language\_Models](https://www.researchgate.net/publication/388340016_Transitioning_from_MLOps_to_LLMOps_Navigating_the_Unique_Challenges_of_Large_Language_Models)  
32. A Deep Dive into AI Agent Metrics \- Galileo AI, acessado em janeiro 28, 2026, [https://galileo.ai/blog/ai-agent-metrics](https://galileo.ai/blog/ai-agent-metrics)  
33. Measuring AI Developer Productivity Metrics That Actually Matter \- Kinde, acessado em janeiro 28, 2026, [https://kinde.com/learn/ai-for-software-engineering/managing-a-team/measuring-ai-developer-productivity-metrics-that-actually-matter/](https://kinde.com/learn/ai-for-software-engineering/managing-a-team/measuring-ai-developer-productivity-metrics-that-actually-matter/)  
34. Jevons paradox \- Wikipedia, acessado em janeiro 28, 2026, [https://en.wikipedia.org/wiki/Jevons\_paradox](https://en.wikipedia.org/wiki/Jevons_paradox)  
35. Will AI Take My Job? The Jevons Paradox \- Medium, acessado em janeiro 28, 2026, [https://medium.com/@romerorico.hugo/will-ai-take-my-job-the-jevons-paradox-b0e366f850bb](https://medium.com/@romerorico.hugo/will-ai-take-my-job-the-jevons-paradox-b0e366f850bb)  
36. Capabilities: Platform engineering \- DORA, acessado em janeiro 28, 2026, [https://dora.dev/capabilities/platform-engineering/](https://dora.dev/capabilities/platform-engineering/)  
37. Announcing the 2024 DORA report | Google Cloud Blog, acessado em janeiro 28, 2026, [https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)  
38. 2024 DORA report summary \- DX, acessado em janeiro 28, 2026, [https://getdx.com/blog/2024-dora-report-summary-laura-tacho/](https://getdx.com/blog/2024-dora-report-summary-laura-tacho/)  
39. DORA Report 2025 Key Takeaways: AI Impact on Dev Metrics \- Faros AI, acessado em janeiro 28, 2026, [https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025](https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025)  
40. AI-Generated Code: Who Owns the Intellectual Property Rights? \- LeadrPro, acessado em janeiro 28, 2026, [https://www.leadrpro.com/blog/who-really-owns-code-when-ai-does-the-writing](https://www.leadrpro.com/blog/who-really-owns-code-when-ai-does-the-writing)  
41. Navigating the Legal Landscape of AI-Generated Code: Ownership and Liability Challenges, acessado em janeiro 28, 2026, [https://www.mbhb.com/intelligence/snippets/navigating-the-legal-landscape-of-ai-generated-code-ownership-and-liability-challenges/](https://www.mbhb.com/intelligence/snippets/navigating-the-legal-landscape-of-ai-generated-code-ownership-and-liability-challenges/)  
42. Generative AI: Navigating intellectual property | Nixon Peabody LLP, acessado em janeiro 28, 2026, [https://www.nixonpeabody.com/insights/articles/2025/09/17/generative-ai-navigating-intellectual-property](https://www.nixonpeabody.com/insights/articles/2025/09/17/generative-ai-navigating-intellectual-property)  
43. AI-generated code and intellectual property protection | Computerlaw Group LLP, acessado em janeiro 28, 2026, [https://www.computerlaw.com/blog/2025/01/ai-generated-code-and-intellectual-property-protection/](https://www.computerlaw.com/blog/2025/01/ai-generated-code-and-intellectual-property-protection/)  
44. Computer Science Curricula 2023, acessado em janeiro 28, 2026, [https://csed.acm.org/wp-content/uploads/2023/03/Version-Beta-v2.pdf](https://csed.acm.org/wp-content/uploads/2023/03/Version-Beta-v2.pdf)  
45. Computer Science Curricula 2023 \- CS2023 \- ACM, acessado em janeiro 28, 2026, [https://csed.acm.org/wp-content/uploads/2023/09/Version-Gamma.pdf](https://csed.acm.org/wp-content/uploads/2023/09/Version-Gamma.pdf)  
46. Framework: Agentic AI – core patterns for organization design \- Ross Dawson, acessado em janeiro 28, 2026, [https://rossdawson.com/framework-agentic-ai-core-patterns-for-organization-design/](https://rossdawson.com/framework-agentic-ai-core-patterns-for-organization-design/)  
47. A Research Roadmap for Augmenting Software Engineering Processes and Software Products with Generative AI \- arXiv, acessado em janeiro 28, 2026, [https://arxiv.org/html/2510.26275v1](https://arxiv.org/html/2510.26275v1)
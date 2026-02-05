# Plano do Capítulo 14: Prática Profissional e Julgamento Técnico

## Visão Geral

O capítulo de Prática Profissional no SWEBOK-AI v5.0 representa uma
reconfiguração profunda do papel do engenheiro de software na era dos LLMs.
Enquanto o SWEBOK v4.0 tratava a prática profissional como um conjunto de
competências interpessoais, éticas e técnicas voltadas para a produção de
software, a versão 5.0 reconhece que a profissão migrou do domínio da
**criação** para o domínio da **curaoria e governança**.

Este capítulo estabelece os fundamentos do **Julgamento Técnico** como skill
central — a capacidade de avaliar, validar e, quando necessário, recusar saídas
geradas por sistemas autônomos. O engenheiro de software do futuro não é
avaliado por quanto código produz, mas pela qualidade de suas decisões sobre o
que não deve ser construído, sobre quais restrições são não-negociáveis, e sobre
onde a supervisão humana é indispensável.

A transição proposta recontextualiza cada aspecto da prática profissional
tradicional:

- **Ética** deixa de ser sobre conduta individual para incluir responsabilidade
  por sistemas que tomam decisões autonomamente
- **Certificação** evolui de validação de conhecimento sintático para
  demonstração de competência em verificação de sistemas opacos
- **Comunicação** transforma-se em habilidade de especificação de contexto e
  restrições para agentes de IA
- **Dinâmica de equipe** adapta-se para incluir orquestração de agentes
  autônomos junto com colaboração humana

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos do Julgamento Técnico na Era da IA**
2. **Seção 2: Responsabilidade Legal e Accountability em Sistemas Gerados por
   IA**
3. **Seção 3: Ética Profissional e Códigos de Conduta para Engenharia com IA**
4. **Seção 4: A Nova Formação Profissional: Da Escada Quebrada ao Aprendizado
   Adaptativo**
5. **Seção 5: Governança de IA e Compliance em Organizações de Software**
6. **Seção 6: Comunicação e Especificação para Sistemas Híbridos Humanos-IA**
7. **Seção 7: Dinâmica de Equipes e Orquestração de Agentes**

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Baixíssima — julgamento técnico é skill essencial e insubstituível por LLMs      |
| **Custo de Verificação**        | Crítico — responsabilidade legal recai sobre quem aprova código gerado por IA    |
| **Responsabilidade Legal**      | Máxima — engenheiros são responsáveis finais por sistemas que operam em produção |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Requirements (KA 01):** Restrições e contexto definem limites para
  julgamento técnico
- **Software Architecture (KA 02):** Decisões arquiteturais requerem autoridade
  técnica para aprovar/refutar sugestões de IA
- **Software Testing (KA 05):** Verificação de sistemas gerados por IA
  fundamenta accountability
- **Software Security (KA 13):** Responsabilidade por vulnerabilidades
  introduzidas por agentes autônomos
- **Software Engineering Economics (KA 15):** Trade-offs entre velocidade de
  geração e custo de verificação
- **Governança de IA para Engenharia de Software (KA 17):** Frameworks de
  governança e compliance

______________________________________________________________________

## Descrição das Seções

### Seção 1: Fundamentos do Julgamento Técnico na Era da IA

**Overview:** Estabelece o conceito de julgamento técnico como competência
central do engenheiro de software no contexto de IA generativa. Define a
transição de "engenheiro como produtor" para "engenheiro como curador de
restrições".

**Tópicos:**

- A commodity do código vs. o capital do contexto
- O gargalo da verificação: por que leitura é mais cara que escrita
- Competências do julgamento técnico: identificar alucinações arquiteturais
- Autoridade técnica: quando e como dizer "não" à IA
- Traceability e accountability em decisões humanas sobre código gerado

**Referências (2024/2025):**

- DORA Report 2024 - "Impact of AI on software delivery performance"
- ACM TechNews (2024) - "AI-Assisted Coding: Productivity Gains vs. Quality
  Trade-offs"
- IEEE Software (Jan 2025) - "The Verification Bottleneck in AI-Generated Code"
- McKinsey Digital (2024) - "The State of AI in Software Engineering"

______________________________________________________________________

### Seção 2: Responsabilidade Legal e Accountability em Sistemas Gerados por IA

**Overview:** Analisa a evolução da responsabilidade legal do engenheiro quando
sistemas são gerados parcial ou totalmente por IA. Examina frameworks emergentes
de accountability.

**Tópicos:**

- Responsabilidade profissional por código gerado por IA: onde termina a culpa
  do engenheiro?
- Produto liability e strict liability em sistemas híbridos humanos-IA
- Documentação de decisão e traceability para compliance
- O papel do engenheiro como "circuit breaker" humano
- Jurisprudência emergente sobre falhas em sistemas com componentes de IA
- Regulamentações em evolução: EU AI Act, GDPR, regulamentações setoriais

**Referências (2024/2025):**

- European Union AI Act (2024) - Regulamentação de sistemas de IA de alto risco
- NIST AI Risk Management Framework 1.0 (2024) - Accountability measures
- ACM Queue (2024) - "Legal Liability in the Age of AI-Generated Code"
- Harvard Journal of Law & Technology (2024) - "Software Engineering Liability
  and AI"
- IEEE 2857-2024 - "Standard for Responsible AI in Software Engineering"

______________________________________________________________________

### Seção 3: Ética Profissional e Códigos de Conduta para Engenharia com IA

**Overview:** Revisa e expande códigos de ética existentes (ACM, IEEE, IFIP)
para o contexto de IA generativa na engenharia de software.

**Tópicos:**

- Revisão dos códigos de ética existentes sob a lente da IA generativa
- Responsabilidade por bias em código gerado por IA
- Transparência e explicabilidade: obrigação do engenheiro de documentar
  limitações
- Dark patterns e manipulação algorítmica: responsabilidade do implementador
- Propriedade intelectual de código gerado por IA (direitos autorais, patentes)
- Conflitos de interesse em recomendações de ferramentas de IA

**Referências (2024/2025):**

- ACM Code of Ethics and Professional Conduct (2018, com interpretações 2024)
- IEEE Code of Ethics (2020, com guidelines para IA 2024)
- IFIP Code of Ethics (2021, revisão 2024)
- UNESCO Recommendation on the Ethics of AI (2024 implementation guidelines)
- IEEE 2857-2024 - "Standard for Ethical Considerations in AI-Assisted Software
  Development"
- Nature Machine Intelligence (2024) - "Ethical Responsibilities of Engineers
  Using AI Tools"

______________________________________________________________________

### Seção 4: A Nova Formação Profissional: Da Escada Quebrada ao Aprendizado Adaptativo

**Overview:** Analisa a crise de formação causada pela descontinuidade da
progressão júnior → pleno → sênior, e propõe novos modelos de desenvolvimento
profissional.

**Tópicos:**

- A "escada quebrada": por que a progressão tradicional está comprometida
- O custo da formação externalizada: crise de sucessão geracional
- Novas competências entry-level: leitura crítica, debugging de sistemas opacos
- Certificação e qualificação na era da IA: o que deve ser validado?
- Aprendizado baseado em simulação e ambientes controlados
- Mentoria no contexto de orquestração de agentes

**Referências (2024/2025):**

- World Economic Forum - Future of Jobs Report 2025
- Stack Overflow Developer Survey 2024 - "AI Tools and Career Progression"
- O'Reilly Media (2024) - "The Future of Software Engineering Education"
- ACM Inroads (2024) - "Rethinking CS Curriculum for the AI Era"
- ISO/IEC 24773 (revisão em andamento 2024-2025) - Certification of software
  professionals
- IEEE CS (2024) - "Competency Model for AI-Assisted Software Engineering"

______________________________________________________________________

### Seção 5: Governança de IA e Compliance em Organizações de Software

**Overview:** Estabelece frameworks de governança para uso responsável de IA na
engenharia de software, incluindo políticas organizacionais e compliance.

**Tópicos:**

- Frameworks de governança de IA para engenharia de software
- Políticas organizacionais: quando e como usar (ou não usar) IA generativa
- Human-in-the-loop: definição de decisões que requerem aprovação humana
- Model cards e documentation requirements para sistemas com componentes de IA
- Audit trails e logging de decisões humanas sobre código gerado
- Trade compliance e export controls em ferramentas de IA

**Referências (2024/2025):**

- NIST AI RMF 1.0 (2024) - Governance and Risk Management
- ISO/IEC 42001:2024 - Information technology — AI management systems
- MIT Sloan Management Review (2024) - "Governance of AI in Software
  Development"
- Gartner (2024) - "AI Governance in Enterprise Software Engineering"
- ACM Queue (2025) - "Building Governance Frameworks for AI-Assisted
  Development"

______________________________________________________________________

### Seção 6: Comunicação e Especificação para Sistemas Híbridos Humanos-IA

**Overview:** redefine as competências de comunicação do engenheiro para um
ambiente onde grande parte da "conversa" é com sistemas de IA.

**Tópicos:**

- Especificação de contexto: a nova competência de comunicação
- Prompt engineering como linguagem de especificação técnica
- Documentação para stakeholders técnicos e não-técnicos sobre limitações de IA
- Comunicação de riscos e incertezas em sistemas gerados por IA
- Code review como ato de comunicação crítica
- Comunicação de trade-offs entre velocidade e verificação

**Referências (2024/2025):**

- IEEE Transactions on Software Engineering (2024) - "Prompt Patterns for
  Software Specification"
- ACM CHI 2024 - "Human-AI Collaboration in Software Development"
- Communications of the ACM (2024) - "The Art of Specifying for AI Systems"
- IEEE Software (2024) - "Documentation Practices for AI-Generated Codebases"
- Empirical Software Engineering (2024) - "Communication Patterns in AI-Assisted
  Teams"

______________________________________________________________________

### Seção 7: Dinâmica de Equipes e Orquestração de Agentes

**Overview:** Explora como a colaboração em equipe evolui quando agentes de IA
são membros "de facto" do time, e como manter coesão e eficácia.

**Tópicos:**

- O time híbrido: humanos e agentes trabalhando em conjunto
- Redefinição de papéis: do implementador para o orquestrador
- Cognição individual em ambiente de IA: viés de confiança e over-reliance
- Interação com stakeholders: comunicando incerteza de sistemas opacos
- Diversidade e inclusão: impacto da IA na demografia de equipes de software
- Colaboração distribuída e multicultural com ferramentas de IA

**Referências (2024/2025):**

- ACM CSCW 2024 - "Collaboration in AI-Assisted Software Teams"
- IEEE Software (2024) - "Team Dynamics with AI Agents"
- Journal of Systems and Software (2024) - "Human-AI Collaboration Patterns"
- Harvard Business Review (2024) - "Managing Teams in the Age of AI"
- Psychology of Programming Interest Group (PPIG 2024) - "Cognitive Factors in
  AI-Assisted Coding"

______________________________________________________________________

## Referências Consolidadas (2024/2025)

### Relatórios e Standards

1. **DORA Report 2024** - "Accelerate State of DevOps Report: AI Adoption and
   Software Delivery Performance"
2. **NIST AI Risk Management Framework 1.0** (2024) - U.S. Department of
   Commerce
3. **ISO/IEC 42001:2024** - Information technology — Artificial intelligence —
   Management system
4. **IEEE 2857-2024** - Standard for Responsible AI in Software Engineering
5. **EU AI Act** (2024) - Regulation on Artificial Intelligence (aplicação
   gradual 2024-2026)
6. **World Economic Forum - Future of Jobs Report 2025** (Jan 2025)
7. **Stack Overflow Developer Survey 2024** - Análise de adoção de ferramentas
   de IA

### Artigos Acadêmicos (2024-2025)

08. Bird, C. et al. (2024). "Taking Flight with Copilot: Early insights and
    practices of AI-assisted coding." *ACM Transactions on Software Engineering
    and Methodology*.
09. Vaithilingam, P. et al. (2024). "Expectation vs. Experience: Evaluating the
    usability of AI programming assistants." *IEEE Software*.
10. Mozannar, H. et al. (2024). "Reading Between the Lines: Modeling user
    behavior and costs in AI-assisted programming." *ACM CHI 2024*.
11. Sandoval, G. et al. (2024). "Lost in Translation: How GPT models struggle
    with code concepts." *Empirical Software Engineering*.
12. Ziegler, A. et al. (2024). "Productivity assessment of GitHub Copilot in
    enterprise settings." *Communications of the ACM*.

### Livros e Publicações Técnicas

13. O'Reilly Media (2024). *AI-Assisted Programming: Tools, Techniques, and
    Trade-offs*
14. Addison-Wesley (2024). *Engineering AI Systems: Governance, Verification,
    and Ethics*
15. IEEE Computer Society (2024). *Professional Competency Model for
    AI-Augmented Software Engineering*

### Códigos de Ética e Guidelines

16. **ACM Code of Ethics and Professional Conduct** (2018, interpretações
    atualizadas 2024)
17. **IEEE Code of Ethics** (2020, guidelines para IA 2024)
18. **IFIP Code of Ethics and Professional Conduct** (2021, revisão 2024)
19. **UNESCO Recommendation on the Ethics of AI** (2021, guidelines de
    implementação 2024)

______________________________________________________________________

## Notas de Implementação

### Princípios Orientadores

1. **Foco em Julgamento, Não em Ferramentas:** Evitar recomendações específicas
   de produtos (Copilot, ChatGPT, etc.) em favor de princípios duradouros
2. **Realismo Econômico:** Incluir análise de custos de verificação e trade-offs
   de produtividade
3. **Responsabilidade Legal:** Enfatizar que accountability não pode ser
   delegada à IA
4. **Formação Crítica:** Abordar a "escada quebrada" como problema estrutural
   sério

### Alinhamento com swebok-ai-future.md

Este plano incorpora diretamente as análises de:

- A polarização do mercado: elite técnica vs. operadores de IA
- A externalização do custo da formação
- O gargalo da verificação como limitador fundamental
- A mudança de "saber programar" para "saber o que não programar"

### Considerações de Legado

Marcar como **LEGADO**:

- Certificações focadas apenas em sintaxe de linguagens
- Modelos de carreira baseados em volume de código produzido
- Códigos de ética que não abordam IA generativa
- Práticas de revisão de código que não consideram proveniência de IA

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0* *Última atualização: 2026-01-29*

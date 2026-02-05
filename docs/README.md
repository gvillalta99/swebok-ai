# SWEBOK-AI v5.0 - Guia do Conhecimento em Engenharia de Software para a Era dos LLMs

> **Versão 5.0 - Estrutura Reconfigurada (16 KAs)**
> 
> *Última atualização: Fevereiro 2026*

---

## Princípio Diretor

**"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é primariamente sobre sintaxe e lógica de implementação, assumindo que geração algorítmica é infraestrutura, não produto.

---

## Estrutura do Guia (16 Knowledge Areas)

O SWEBOK-AI v5.0 está organizado em **16 Knowledge Areas (KAs)** distribuídos em **5 Partes**, seguindo uma progressão lógica do fundamental à aplicação prática:

### PARTE I: Fundamentos e Contexto

**00. Introdução**
- Contexto da Revolução LLMs
- Mudança de Paradigma  
- Princípios Diretores
- Estrutura do Guia
- Público-Alvo e Pré-requisitos
- **NOVO: Fundamentos Essenciais de IA** (conceitos básicos de LLMs, Transformers, RAG, Agentes)

### PARTE II: Engenharia de Software Aplicada

**KA 01. Software Requirements: Engenharia de Restrições e Contexto**
- De "capturar requisitos" para "estabelecer fronteiras que a IA não deve transgredir"
- Especificação negativa, invariantes, degradação graciosa

**KA 02. Software Architecture: Arquitetura de Sistemas Híbridos**
- Padrões para human-in-the-loop
- Design para auditabilidade e rastreamento
- Separação de concerns críticos

**KA 03. Software Design: Design de Sistemas Híbridos**
- Princípios para código gerado
- Componentes determinísticos vs. não-determinísticos
- Verificabilidade no design

**KA 04. Software Construction: Orquestração e Curatoria de Código**
- Avaliação e integração de código gerado
- Pipeline de verificação
- Gestão de qualidade

**KA 05. Software Testing: Verificação e Validação em Escala**
- Testes estatísticos para sistemas não-determinísticos
- Verificação de contratos
- Avaliação de agentes

**KA 06. Software Engineering Operations: Operações de Engenharia com IA**
- Planejamento em escala
- Entrega e deployment contínuo
- Monitoramento de sistemas híbridos

**KA 07. Software Maintenance: Manutenção de Sistemas Opaços**
- Engenharia reversa de código gerado
- Refatoração assistida
- Gestão de dívida técnica

### PARTE III: Governança e Gerenciamento

**KA 08. Software Configuration Management: Gestão de Configuração e Contexto**
- Versionamento de modelos e prompts
- Rastreabilidade em sistemas gerados
- Reprodutibilidade de ambientes

**KA 09. Software Engineering Management: Gestão de Projetos e Equipes**
- Equipes híbridas humanos-IA
- Planejamento e métricas
- Gestão de riscos

**KA 10. Software Engineering Process: Processos com IA**
- Processos ágeis adaptados
- Workflows agenticos
- Governança de processos

**KA 11. Software Engineering Models and Methods: Modelos e Métodos**
- Modelagem de domínio
- Métodos formais aplicados
- Prototipagem iterativa

### PARTE IV: Qualidade, Segurança e Ética

**KA 12. Software Quality: Qualidade em Sistemas com IA**
- Qualidade de código gerado
- Qualidade comportamental e robustez
- Explicabilidade e interpretabilidade

**KA 13. Software Security: Segurança em Sistemas com IA**
- Vulnerabilidades em código gerado
- Ataques a aplicações LLM
- Segurança da cadeia de suprimentos

**KA 14. Software Engineering Professional Practice: Prática Profissional e Julgamento Técnico**
- Responsabilidade legal e accountability
- Ética e códigos de conduta
- Governança de IA e compliance

### PARTE V: Economia e Métricas

**KA 15. Software Engineering Economics: Economia da Engenharia com IA**
- Paradoxo de Jevons aplicado ao software
- Custo total de propriedade (TCO)
- Decisões de make vs. buy vs. generate

### PARTE VI: Referências

**KA 16. Appendix: Apêndice**
- Especificações de KAs
- Padrões ISO/IEC/IEEE
- Referências consolidadas
- Glossário de termos
- Matriz de conformidade

---

## Mudanças da Versão 5.0

### O Que Foi Removido

**KAs 16, 17 e 18 (Fundamentos)** foram removidos do corpo principal:
- Computing Foundations
- Mathematical Foundations  
- Engineering Foundations

**Justificativa**: Este não é um livro de fundamentos teóricos. O público-alvo são praticantes de engenharia de software, não pesquisadores de IA. Os conceitos essenciais foram:
- **Movidos para Introdução**: Fundamentos básicos de IA (LLMs, Transformers, RAG, Agentes)
- **Distribuídos nos KAs aplicáveis**: Estatística em Testing, métodos formais em Models, etc.

### O Que Mudou

| Aspecto | Antes (19 KAs) | Depois (16 KAs) |
|---------|----------------|-----------------|
| **Estrutura** | Fundamentos no final | Fundamentos integrados |
| **Foco** | Teoria + Prática | Prática aplicada |
| **Progressão** | Linear (01→19) | Por Partes (I→VI) |
| **Público** | Acadêmico + Praticante | Praticante |

### Novo Público-Alvo

**Engenheiros de Software** que:
- Já trabalham com ferramentas de IA (Copilot, Cursor, etc.)
- Precisam validar e integrar código gerado
- Buscam padrões para sistemas híbridos humanos-IA
- Querem entender governança e responsabilidade em projetos com IA

**NÃO é para**:
- Pesquisadores de IA (use livros de ML/DL)
- Iniciantes em programação (pré-requisito: engenharia de software tradicional)
- Gestores sem background técnico

---

## Matriz de Avaliação

Cada tópico do SWEBOK-AI é avaliado por três critérios:

| Critério | Descrição |
|---------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? (Skill de Transição) |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? |
| **Responsabilidade Legal** | Quem é culpado se falhar? (Define necessidade de controle humano) |

---

## Paradigma Shift

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Engenharia = Transformar requisitos em código eficiente | Engenharia = Estabelecer restrições para sistemas autônomos |
| Foco na produção de código | Foco na verificação e governança |
| Gargalo: escrever código | Gargalo: validar código gerado por IA |
| Requisitos = "o que construir" | Restrições = "o que NÃO deixar construir" |

---

## Como Usar Este Guia

### Caminhos de Leitura Recomendados

**Para quem está começando com IA em projetos:**
1. Introdução (com Fundamentos Essenciais)
2. KA 01 (Requirements) → KA 04 (Construction)
3. KA 05 (Testing)
4. KA 12 (Quality)

**Para líderes técnicos:**
1. Introdução
2. KA 09 (Management) → KA 14 (Professional Practice)
3. KA 15 (Economics)
4. KA 13 (Security)

**Para arquitetos:**
1. Introdução
2. KA 02 (Architecture) → KA 03 (Design)
3. KA 08 (Config Management)
4. KA 11 (Models)

---

## Conteúdo LEGADO

Marcado explicitamente como **LEGADO**:
- Técnicas de codificação manual de baixo nível
- Modelos de carreira baseados em volume de código
- Testes baseados apenas em cobertura de código (vs. cobertura de intenção)

---

## Referências

<p><b> <a href="https://inspirehep.net/literature/2939357"> A 2030 Roadmap for Software Engineering </a> </b></p>
<p><a href="https://inspirehep.net/authors/2939358">Mauro Pezzè</a>, <a href="https://inspirehep.net/authors/2714519">Silvia Abrahão</a>, <a href="https://inspirehep.net/authors/2925267">Birgit Penzenstadler</a>, <a href="https://inspirehep.net/authors/2852376">Denys Poshyvanyk</a>, <a href="https://inspirehep.net/authors/2527849">Abhik Roychoudhury</a> et al.</p>
<p> DOI: <a href="https://doi.org/10.1145/3731559"> 10.1145/3731559 </a> </p>
<p> Published in:<span> ACM Trans.Softw.Eng.Meth. 34 (2025) 5, 1-55</span></p>

---

*Este guia não é um manual de "como usar Copilot/Cursor/Devin", mas um corpo de conhecimento sobre **como manter a engenharia legítima quando a codificação se tornou trivialmente barata e a verificação exponencialmente cara**.*

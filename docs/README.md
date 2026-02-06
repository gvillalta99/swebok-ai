# SWEBOK-AI v5.0 - Guia do Conhecimento em Engenharia de Software para a Era dos LLMs

> **Versão 5.0 - Estrutura Reconfigurada (15 KAs + Introdução + Apêndice)**
>
> *Última atualização: Fevereiro 2026*

______________________________________________________________________

## Princípio Diretor

**"O código tornou-se commodity; o contexto tornou-se capital."**

A nova estrutura abandona a premissa de que engenharia de software é
primariamente sobre sintaxe e lógica de implementação, assumindo que geração
algorítmica é infraestrutura, não produto.

______________________________________________________________________

## Estrutura do Guia (15 Knowledge Areas + Blocos de Referência)

O SWEBOK-AI v5.0 está organizado em **15 Knowledge Areas (KAs oficiais:
01-15)**, mais **00 (Introdução)** e **16 (Apêndice de Referência)**,
distribuídos em **5 Partes**, seguindo uma progressão lógica do fundamental à
aplicação prática.

### PARTE I: Fundamentos e Contexto

**00. Introdução**

- Contexto da Revolução LLMs
- Mudança de Paradigma
- Princípios Diretores
- Estrutura do Guia
- Público-Alvo e Pré-requisitos
- **Fundamentos Essenciais de IA** (conceitos básicos de LLMs, Transformers,
  RAG, Agentes)

**KA 11. Modelos e Métodos de Engenharia**

- Modelagem de domínio e contexto
- Métodos formais aplicados
- Prototipagem iterativa
- Modelagem arquitetural
- Especificação e validação

### PARTE II: Engenharia de Software Aplicada

**KA 01. Engenharia de Restrições e Contexto**

- De "capturar requisitos" para "estabelecer fronteiras que a IA não deve
  transgredir"
- Especificação negativa, invariantes, degradação graciosa

**KA 02. Arquitetura de Sistemas Híbridos**

- Padrões para human-in-the-loop
- Design para auditabilidade e rastreamento
- Separação de concerns críticos

**KA 03. Design de Sistemas Híbridos**

- Princípios para código gerado
- Componentes determinísticos vs. não-determinísticos
- Verificabilidade no design

**KA 04. Orquestração e Curadoria de Código**

- Avaliação e integração de código gerado
- Pipeline de verificação
- Gestão de qualidade

**KA 05. Verificação e Validação em Escala**

- Testes estatísticos para sistemas não-determinísticos
- Verificação de contratos
- Avaliação de agentes

**KA 06. Operações de Engenharia de Software**

- Planejamento em escala
- Entrega e deployment contínuo
- Monitoramento de sistemas híbridos

**KA 07. Manutenção de Sistemas Opaços**

- Engenharia reversa de código gerado
- Refatoração assistida
- Gestão de dívida técnica

### PARTE III: Qualidade, Segurança e Governança

**KA 12. Qualidade de Software**

- Qualidade de código gerado
- Qualidade comportamental e robustez
- Explicabilidade e interpretabilidade

**KA 13. Segurança em Sistemas com IA**

- Vulnerabilidades em código gerado
- Ataques a aplicações LLM
- Segurança da cadeia de suprimentos

**KA 08. Gestão de Configuração**

- Versionamento de modelos e prompts
- Rastreabilidade em sistemas gerados
- Reprodutibilidade de ambientes

**KA 14. Prática Profissional e Julgamento Técnico**

- Responsabilidade legal e accountability
- Ética e códigos de conduta
- Governança de IA e compliance

### PARTE IV: Gerenciamento e Processos

**KA 09. Gestão de Engenharia de Software**

- Equipes híbridas humanos-IA
- Planejamento e métricas
- Gestão de riscos

**KA 10. Processos de Engenharia com IA**

- Processos ágeis adaptados
- Workflows agenticos
- Governança de processos

**KA 15. Economia e Métricas**

- Paradoxo de Jevons aplicado ao software
- Custo total de propriedade (TCO)
- Decisões de make vs. buy vs. generate

### PARTE V: Referências

**16. Apêndice**

- Especificações de KAs
- Padrões ISO/IEC/IEEE
- Referências consolidadas
- Glossário de termos
- Matriz de conformidade
- Matriz de referências cruzadas

______________________________________________________________________

## Mudanças da Versão 5.0

### O Que Foi Removido

**KAs 16, 17 e 18 (Fundamentos)** foram removidos do corpo principal:

- Computing Foundations
- Mathematical Foundations
- Engineering Foundations

**Justificativa**: Este não é um livro de fundamentos teóricos. O público-alvo
são praticantes de engenharia de software, não pesquisadores de IA. Os conceitos
essenciais foram:

- **Movidos para Introdução**: Fundamentos básicos de IA (LLMs, Transformers,
  RAG, Agentes)
- **Distribuídos nos KAs aplicáveis**: Estatística em Testing, métodos formais
  em Models, etc.

### O Que Mudou

| Aspecto         | Antes (19 KAs)             | Depois (15 KAs + 00 + 16)       |
| --------------- | -------------------------- | ------------------------------- |
| **Estrutura**   | 6 Partes                   | 5 Partes                        |
| **Organização** | Fundamentos no final       | Fundamentos no início           |
| **KA 11**       | Parte III (Governança)     | Parte I (Fundamentos)           |
| **KA 08**       | Parte III (Governança)     | Parte III (Qualidade/Segurança) |
| **KA 15**       | Parte V (Economia isolada) | Parte IV (Gerenciamento)        |
| **Foco**        | Teoria + Prática           | Prática aplicada                |
| **Público**     | Acadêmico + Praticante     | Praticante                      |

### Nova Progressão Pedagógica

A estrutura foi reorganizada para seguir uma progressão mais lógica:

1. **Parte I**: Fundamentos e métodos (o "como")
2. **Parte II**: Engenharia aplicada (a "prática")
3. **Parte III**: Qualidade e governança (o "controle")
4. **Parte IV**: Gerenciamento (a "gestão")
5. **Parte V**: Referências (o "apoio")

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

______________________________________________________________________

## Matriz de Avaliação

Cada tópico do SWEBOK-AI é avaliado por três critérios:

| Critério                        | Descrição                                                         |
| ------------------------------- | ----------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? (Skill de Transição)        |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA?          |
| **Responsabilidade Legal**      | Quem é culpado se falhar? (Define necessidade de controle humano) |

______________________________________________________________________

## Paradigma Shift

| Antes (SWEBOK v4)                                       | Depois (SWEBOK-AI v5)                                       |
| ------------------------------------------------------- | ----------------------------------------------------------- |
| Engenharia = Transformar requisitos em código eficiente | Engenharia = Estabelecer restrições para sistemas autônomos |
| Foco na produção de código                              | Foco na verificação e governança                            |
| Gargalo: escrever código                                | Gargalo: validar código gerado por IA                       |
| Requisitos = "o que construir"                          | Restrições = "o que NÃO deixar construir"                   |

______________________________________________________________________

## Como Usar Este Guia

### Caminhos de Leitura Recomendados

**Para quem está começando com IA em projetos:**

1. Parte I (Introdução + Fundamentos de IA + Modelos)
2. KA 01 (Restrições) → KA 04 (Curadoria)
3. KA 05 (Verificação) → KA 12 (Qualidade)

**Para líderes técnicos:**

1. Parte I (Fundamentos)
2. KA 09 (Gestão) → KA 14 (Prática Profissional)
3. KA 15 (Economia) → KA 13 (Segurança)

**Para arquitetos:**

1. Parte I (Fundamentos + Modelos)
2. KA 01 (Restrições) → KA 02 (Arquitetura) → KA 03 (Design)
3. KA 08 (Configuração) → KA 12 (Qualidade)

**Para engenheiros de qualidade:**

1. Parte I (Fundamentos)
2. KA 04 (Curadoria) → KA 05 (Verificação)
3. KA 12 (Qualidade) → KA 13 (Segurança) → KA 07 (Manutenção)

______________________________________________________________________

## Conteúdo LEGADO

Marcado explicitamente como **LEGADO**:

- Técnicas de codificação manual de baixo nível
- Modelos de carreira baseados em volume de código
- Testes baseados apenas em cobertura de código (vs. cobertura de intenção)

______________________________________________________________________

## Referências

<p><b> <a href="https://inspirehep.net/literature/2939357"> A 2030 Roadmap for Software Engineering </a> </b></p>
<p><a href="https://inspirehep.net/authors/2939358">Mauro Pezzè</a>, <a href="https://inspirehep.net/authors/2714519">Silvia Abrahão</a>, <a href="https://inspirehep.net/authors/2925267">Birgit Penzenstadler</a>, <a href="https://inspirehep.net/authors/2852376">Denys Poshyvanyk</a>, <a href="https://inspirehep.net/authors/2527849">Abhik Roychoudhury</a> et al.</p>
<p> DOI: <a href="https://doi.org/10.1145/3731559"> 10.1145/3731559 </a> </p>
<p> Published in:<span> ACM Trans.Softw.Eng.Meth. 34 (2025) 5, 1-55</span></p>

______________________________________________________________________

*Este guia não é um manual de "como usar Copilot/Cursor/Devin", mas um corpo de
conhecimento sobre **como manter a engenharia legítima quando a codificação se
tornou trivialmente barata e a verificação exponencialmente cara**.*

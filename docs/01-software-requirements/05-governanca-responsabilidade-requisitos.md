---
title: "Seção 5: Governança e Responsabilidade em Requisitos"
created_at: "2026-01-31"
tags: ["requisitos", "governanca", "responsabilidade", "accountability", "auditabilidade", "compliance", "rastreabilidade"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Seção 5: Governança e Responsabilidade em Requisitos

## Overview

Esta seção apresenta como governança, responsabilidade e accountability devem ser tratadas como requisitos e restrições em sistemas híbridos (humanos-IA). O objetivo é especificar cadeias de decisão, critérios de evidência e mecanismos de auditoria que preservem rastreabilidade e permitam atribuição clara de responsabilidade, mesmo quando parte do comportamento é gerado, recomendado ou adaptado por componentes autônomos.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir responsabilidade, accountability, auditabilidade e rastreabilidade como conceitos operacionais e traduzíveis em requisitos verificáveis.
2. Projetar uma cadeia de decisão (papéis, aprovações e escalonamento) proporcional ao risco do caso de uso.
3. Integrar compliance, privacidade, segurança e ética como requisitos desde a especificação.
4. Especificar um modelo mínimo de evidência (o que registrar, por quanto tempo e como correlacionar) para auditoria e resposta a incidentes.

## 5.1 Introdução: por que governança é um problema de requisitos

Em projetos tradicionais, existe uma relação relativamente direta entre requisito, design, implementação e comportamento observado. Em sistemas híbridos, essa relação se torna mais frágil por três razões recorrentes:

1. **Causalidade diluída**: decisões relevantes podem ser distribuídas entre times, fornecedores, operadores e componentes autônomos.
2. **Variabilidade**: diferentes execuções podem produzir resultados distintos sob condições similares, mesmo sem mudança explícita de código.
3. **Evidência incompleta**: sem requisitos explícitos de registro e rastreabilidade, a organização não consegue reconstruir o que ocorreu e por quê.

Consequentemente, governança não pode ser tratada como um documento separado da engenharia de requisitos. Ela precisa ser especificada como requisitos de processo e de evidência: quem aprova, o que deve ser registrado, quando escalonar para revisão humana e quais condições devem ser satisfeitas antes de operar em produção.

## 5.2 Definições operacionais (para evitar ambiguidade)

### 5.2.1 Responsabilidade, accountability e autoridade

- **Responsabilidade (responsibility)**: obrigação de executar atividades e operar controles (por exemplo: revisar, registrar, monitorar, responder a incidentes).
- **Accountability**: obrigação de justificar decisões e responder por consequências perante auditoria interna/externa, incluindo aceitação explícita de risco residual.
- **Autoridade de decisão**: permissão formal para aprovar uma decisão que altera risco, escopo, exceções ou controles.

Um sistema híbrido exige que essas três dimensões estejam presentes na especificação. Caso contrário, decisões críticas ocorrem sem dono identificável.

### 5.2.2 Auditabilidade e rastreabilidade

- **Auditabilidade**: capacidade de reconstruir o que foi decidido, por quem, sob quais premissas, com quais controles e com quais evidências.
- **Rastreabilidade**: capacidade de ligar necessidade -> intenção -> requisito/restrição -> decisão -> implementação -> verificação -> evidência, de forma versionável.

Auditabilidade sem rastreabilidade tende a produzir narrativas não verificáveis; rastreabilidade sem auditabilidade tende a produzir links sem explicação.

## 5.3 Modelo de governança: cadeia de decisão e responsabilidades

### 5.3.1 Camadas de decisão (cadeia de responsabilidade)

Uma cadeia mínima para sistemas híbridos pode ser estruturada em cinco camadas:

1. **Estratégica**: define apetite de risco e regras de exceção.
2. **Governança/Compliance**: interpreta requisitos legais, define critérios de evidência e supervisiona auditorias.
3. **Técnica**: traduz políticas em restrições, invariantes e critérios de verificação.
4. **Operacional**: executa controles, coleta evidências e mantém resposta a incidentes.
5. **Garantia/Auditoria**: valida conformidade e mede efetividade dos controles.

Cada camada deve ser representada na especificação por papéis, artefatos obrigatórios e critérios de aprovação.

### 5.3.2 Matriz RACI (adaptada)

| Atividade | Estratégia | Governança/Compliance | Arquitetura | Engenharia | Garantia/Auditoria |
|-----------|------------|------------------------|-------------|------------|--------------------|
| Classificar risco do caso de uso | A | R | C | I | C |
| Definir restrições e invariantes críticos | I | C | A/R | R | C |
| Aprovar exceção a restrição crítica | A | R | C | I | C |
| Definir critérios de escalonamento humano | C | C | A/R | R | C |
| Validar conformidade antes de produção | I | C | C | R | A/R |
| Conduzir investigação de incidente | A | C | C | R | R |

*Legenda: R=Responsible, A=Accountable, C=Consulted, I=Informed*

### 5.3.3 Escalonamento por risco (governança proporcional)

Uma regra prática é vincular risco a exigências de evidência. Um exemplo de classificação orientada por risco:

| Classe de risco | Características típicas | Requisitos mínimos de governança |
|----------------|--------------------------|----------------------------------|
| Alto | impacto em direitos, segurança, uso de dados sensíveis, decisões com efeito material | aprovação formal; supervisão humana definida; trilha de auditoria completa; verificação reforçada; plano de resposta a incidentes |
| Moderado | influência significativa em decisões humanas, dados pessoais não sensíveis, automações relevantes | aprovação técnica; evidências de teste e rastreabilidade; monitoramento; revisão periódica |
| Baixo | automações internas de baixo impacto, dados anonimizados/agregados, decisões reversíveis | registro básico; rastreabilidade mínima; revisão amostral |

O ponto essencial é o mecanismo: aumentar risco exige aumentar responsabilidade formal e evidência.

## 5.4 Compliance e regulamentação como requisitos

### 5.4.1 Do "compliance no final" ao "compliance por construção"

**LEGADO**: tratar privacidade, segurança e conformidade como etapa final, separada da especificação.

Em sistemas híbridos, essa prática falha porque o risco nasce na definição de escopo, nos dados autorizados e nos limites da autonomia. Assim, compliance deve ser incorporado como requisitos desde a fase de requisitos, incluindo:

- classificação de risco e justificativa documentada;
- limites de finalidade e minimização de dados;
- transparência e informação ao usuário;
- requisitos de supervisão humana e contestabilidade;
- requisitos de documentação técnica e registro;
- requisitos de auditoria e retenção de evidências;
- requisitos de resposta a incidentes.

### 5.4.2 Abordagem orientada por risco

Regulações recentes enfatizam uma abordagem orientada a risco, com obrigações proporcionais ao impacto do sistema. Para engenharia de requisitos, isso implica tratar a classificação de risco como requisito de processo: deve existir um procedimento para classificar o caso de uso, registrar a justificativa e aplicar controles e evidências compatíveis.

### 5.4.3 Checklist mínimo (como campos obrigatórios da especificação)

Os itens a seguir devem ser entendidos como campos obrigatórios em requisitos (e não como uma lista genérica de tarefas):

- identificação do caso de uso, objetivo e limites de escopo;
- classificação de risco e justificativa;
- inventário de dados (categorias, finalidade, retenção);
- requisitos de transparência (o que informar, quando e para quem);
- requisitos de supervisão humana (quando, como e com quais evidências);
- requisitos de rastreabilidade e auditoria;
- critérios de aceitação e métodos de verificação;
- requisitos de resposta a incidentes.

## 5.5 Rastreabilidade e evidência: artefatos minimamente suficientes

### 5.5.1 Cadeia de rastreabilidade orientada a evidência

Uma cadeia de rastreabilidade útil para governança pode ser expressa como:

```
Necessidade -> Intenção -> Requisito/Restrição -> Decisão -> Implementação -> Verificação -> Evidência
```

O elemento "evidência" deve ser de primeira classe: requisitos críticos precisam produzir evidências verificáveis, sob pena de se tornarem intenções não operacionais.

### 5.5.2 Registro de Decisão de Requisitos (RDR)

O Registro de Decisão de Requisitos (RDR) documenta decisões de escopo, risco e controles. Para ser auditável, o RDR deve conter (no mínimo):

| Campo | Descrição |
|-------|-----------|
| Identificador | ID único e versionável |
| Contexto | problema, stakeholders, pressupostos |
| Decisão | o que foi decidido e por quê |
| Restrições/invariantes | limites impostos e motivação |
| Alternativas | opções consideradas e razões de rejeição |
| Riscos e mitigação | riscos, controles e responsabilidades |
| Evidências requeridas | artefatos que provam conformidade |
| Aprovações | responsáveis, datas e condições |

### 5.5.3 Requisitos para trilha de auditoria (sem prescrever ferramentas)

Requisitos de auditoria não devem prescrever ferramentas específicas. Eles devem especificar propriedades verificáveis:

- **completude**: quais eventos precisam ser registrados;
- **integridade**: proteção contra alteração não autorizada;
- **retenção**: prazo e política de descarte;
- **acesso**: quem pode consultar e sob quais condições;
- **correlação**: como relacionar eventos a requisitos, decisões e versões.

## 5.6 Ética e direitos fundamentais no nível de requisitos

Etica, nesta seção, é tratada como limitação e proteção especificáveis. Em requisitos, isso aparece tipicamente em quatro eixos:

1. **Justiça e não discriminação**: proibir tratamento desigual injustificado e exigir análise de proxies.
2. **Transparência**: informar uso de IA e limites/incertezas relevantes ao contexto.
3. **Privacidade**: minimização, finalidade, segurança e governança de dados.
4. **Contestabilidade e supervisão**: possibilitar contestação e intervenção humana em decisões relevantes.

Uma regra prática é exigir, para classes de risco moderado/alto, que cada requisito sensível declare:

- qual direito/valor protege;
- qual dano busca prevenir;
- qual evidência demonstrará conformidade;
- quem é accountable pela aceitação do risco residual.

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica |

---

## Practical Considerations

- Especifique governança como requisitos: quem aprova, quais evidências são obrigatórias, quando escalonar e como registrar.
- Trate classificação de risco como artefato versionável; mudanças de escopo, dados ou autonomia exigem reclassificação e revalidação.
- Para requisitos críticos, exija rastreabilidade completa até evidência; requisito sem evidência verificável tende a virar "intenção" não operacional.
- Evite acoplar compliance a ferramentas; descreva propriedades (integridade, retenção, acesso, correlação) e deixe a implementação em aberto.
- Regras de exceção devem existir: quem pode autorizar, por quanto tempo, sob quais condições e com quais medidas compensatórias.

## Summary

- Governança em requisitos, na era de sistemas híbridos, é a capacidade de manter decisão, evidência e responsabilidade sob risco.
- Responsabilidade, accountability, auditabilidade e rastreabilidade devem ser definidas operacionalmente e traduzidas em requisitos verificáveis.
- Abordagens orientadas por risco conectam classe de risco a exigências de supervisão humana, evidências e auditoria.
- Compliance efetivo nasce na especificação: escopo, dados, limites e registros.

## References

1. BRASIL. Lei nº 13.709, de 14 de agosto de 2018. Lei Geral de Proteção de Dados Pessoais (LGPD). Disponível em: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709.htm. Acesso em: 31 jan. 2026.
2. UNIÃO EUROPEIA. Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024 (Artificial Intelligence Act). OJ L, 2024/1689, 12 jul. 2024. Disponível em: http://data.europa.eu/eli/reg/2024/1689/oj. Acesso em: 31 jan. 2026.
3. NIST. AI Risk Management Framework (AI RMF 1.0). 2023. Disponível em: https://www.nist.gov/itl/ai-risk-management-framework. Acesso em: 31 jan. 2026.
4. ISO/IEC. ISO/IEC 42001:2023 - Information technology — Artificial intelligence — Management system. 2023. Disponível em: https://www.iso.org/standard/81230.html. Acesso em: 31 jan. 2026.
5. ISO/IEC. ISO/IEC 23894:2023 - Information technology — Artificial intelligence — Guidance on risk management. 2023. Disponível em: https://www.iso.org/standard/77304.html. Acesso em: 31 jan. 2026.
6. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

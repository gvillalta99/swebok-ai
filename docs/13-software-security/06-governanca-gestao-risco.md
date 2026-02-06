---
title: Governança e Gestão de Risco de Segurança
created_at: '2025-01-31'
tags: [seguranca, governanca, gestao-risco, frameworks, compliance, nist, iso]
status: published
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Governança e Gestão de Risco de Segurança

## Contexto

Governança de IA não é burocracia; é a estrutura que permite à empresa inovar sem colapsar. Em 2026, "usar IA" não é mais o diferencial, mas sim "usar IA sem ser processado ou vazado". Frameworks tradicionais como ISO 27001 e NIST CSF são fundamentais, mas insuficientes para lidar com a opacidade e a autonomia dos agentes de IA. A governança moderna exige adaptação: políticas vivas, inventário de "Shadow AI" e responsabilidade clara sobre decisões algorítmicas.

## Frameworks e Adaptações Necessárias

### NIST AI RMF (Risk Management Framework)
O padrão ouro atual. Ele divide a gestão em quatro funções: **Govern, Map, Measure, Manage**.
- **Adaptação:** Não trate como um checklist estático. Use a função "Map" para criar um inventário dinâmico de onde a IA toca dados sensíveis. Se você não sabe onde a IA está, você não está governando.

### ISO/IEC 42001 (Sistema de Gestão de IA)
A primeira norma certificável para gestão de IA.
- **Foco:** Documentação de processos de desenvolvimento ético e seguro. É o "crachá" que grandes clientes exigirão para comprar seu software.

### Políticas de Uso Interno
O maior risco hoje é o funcionário colando planilhas de clientes no ChatGPT gratuito.
- **Política de "Shadow AI":** Bloqueie acesso a ferramentas não homologadas, mas ofereça alternativas corporativas (ex: ChatGPT Enterprise, Copilot). A proibição total falha; a substituição segura funciona.

______________________________________________________________________

## Incident Response para IA

Quando (não se) um incidente ocorrer, seu playbook atual de resposta a incidentes vai falhar.

### O que muda no IR?
1. **Detecção:** Como saber se o modelo foi roubado ou sofreu injeção? Logs de inferência são volumosos e cripticos.
2. **Contenção:** Desligar o servidor resolve? E se o modelo envenenado já foi replicado? E se o agente autônomo fez alterações sutis em milhares de arquivos?
3. **Recuperação:** Você tem backup dos *pesos* do modelo anterior? Você consegue retreinar o modelo removendo apenas o dado envenenado ("Machine Unlearning") ou precisa começar do zero (custo milionário)?

______________________________________________________________________

## Checklist Prático: Governança Mínima Viável

O que o CISO deve ter na mesa hoje:

1. [ ] **Inventário de Modelos e Agentes:** Uma lista atualizada de todos os LLMs em uso, quem é o dono, qual dado ele acessa e qual a criticidade.
2. [ ] **Política de Uso Aceitável (AUP) Atualizada:** Regras claras sobre o que *não* pode ser enviado para LLMs (PII, segredos comerciais, código core).
3. [ ] **Review de Terceiros (Vendor Risk):** Exigir garantias de que seus fornecedores de SaaS não estão usando seus dados para treinar os modelos deles (Opt-out de treino).
4. [ ] **Kill Switch:** Um botão de pânico que corta o acesso dos agentes de IA aos sistemas críticos instantaneamente, sem derrubar o resto da aplicação.
5. [ ] **Treinamento de "IA Security Awareness":** Ensinar desenvolvedores e usuários a reconhecerem alucinações perigosas e tentativas de engenharia social via prompt.

______________________________________________________________________

## Armadilhas Comuns

- **"Compliance de Papel":** Ter a política escrita mas ninguém ler. A governança deve ser imposta via ferramentas (ex: bloqueio de PII no gateway), não apenas em PDFs.
- **Ignorar o Risco Legal:** Achar que alucinação é apenas "erro técnico". Se o seu chatbot promete um desconto que não existe, sua empresa pode ser legalmente obrigada a honrá-lo (caso Air Canada).
- **Esquecer da Descartabilidade:** Criar processos complexos para modelos que mudam a cada 3 meses. A governança deve ser ágil o suficiente para acompanhar o ciclo de vida rápido da IA.
- **Não Definir "Dono do Risco":** Quando a IA erra, quem responde? O Engenheiro de ML? O Product Manager? O CISO? Defina isso *antes* do incidente.

______________________________________________________________________

## Exemplo Mínimo: Política de Uso de Assistentes de Código

**Cenário:** Desenvolvedores querem usar Copilot/Cursor para acelerar entregas.

**Política Fraca (Proibitiva):**
"É proibido usar assistentes de IA para código da empresa."
*Resultado:* Desenvolvedores usam escondido em suas máquinas pessoais, vazando código sem controle.

**Política Forte (Governada):**
"O uso é permitido e encorajado, **desde que**:
1. Use apenas a licença Enterprise fornecida pela empresa (com garantia de não-treino).
2. Não cole credenciais/chaves no chat (use variáveis de ambiente).
3. Todo código gerado deve passar por Code Review humano e scan de SAST.
4. É proibido usar para algoritmos de criptografia ou autenticação crítica."

**Trade-off:** Custo de licenças Enterprise vs. Mitigação do risco de vazamento de IP e introdução de vulnerabilidades.

______________________________________________________________________

## Resumo Executivo

- **Governança é Habilitadora:** Regras claras permitem que a empresa adote IA com confiança, em vez de operar no medo ou na imprudência.
- **Shadow AI é o Inimigo:** Traga o uso para a luz com ferramentas corporativas oficiais.
- **Adapte os Frameworks:** Use o NIST AI RMF como guia, mas foque na implementação prática de controles.
- **Playbook de Incidentes Específico:** Prepare-se para cenários de injeção de prompt, envenenamento e alucinação danosa.
- **Responsabilidade Humana:** No fim do dia, um humano deve assinar pelo risco da decisão algorítmica.

______________________________________________________________________

## Próximos Passos

- Formalizar o **Comitê de Ética e Segurança de IA** (multidisciplinar: Tech, Legal, Produto).
- Atualizar os contratos de trabalho e fornecedores para incluir cláusulas sobre uso de IA e propriedade intelectual.
- Realizar um **Tabletop Exercise** simulando um incidente de segurança causado por um agente de IA.

______________________________________________________________________

## Referências

1. **ISO/IEC.** "ISO/IEC 27001: Extensions for AI Systems". 2025. Disponível em: <https://www.iso.org/standard/27001-ai-extension>.
2. **NIST.** "AI Security Risk Assessment: A Practical Guide". 2025. Disponível em: <https://www.nist.gov/itl/ai-security-risk-assessment>.
3. **SANS Institute.** "Developing Security Policies for AI-Assisted Development". 2025. Disponível em: <https://www.sans.org/white-papers/security-policies-ai-tools/>.
4. **Gartner.** "Incident Response Playbook for LLM Security Incidents". 2025. Disponível em: <https://www.gartner.com/en/documents/incident-response-llm>.
5. **OWASP.** "OWASP Secure Coding Practices for AI Assistants". 2025. Disponível em: <https://owasp.org/www-project-secure-coding-ai/>.
6. **HackerOne.** "State of AI Security Report 2025". 2025. Disponível em: <https://www.hackerone.com/resources/ai-security-report-2025>.

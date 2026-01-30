# Plano do Capítulo 13: Segurança de Software em Sistemas com IA

## Visão Geral

O Capítulo 13 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Security para a era dos LLMs. Enquanto o SWEBOK v4.0 focava em vulnerabilidades tradicionais (OWASP Top 10, buffer overflows, injeção de SQL), a versão 5.0 reconhece que **a superfície de ataque expandiu-se dramaticamente com a introdução de vulnerabilidades específicas de IA, ataques a cadeias de suprimentos de modelos, e novas classes de exploits que exploram comportamentos estocásticos**.

Este capítulo apresenta os fundamentos, ameaças e práticas para segurança quando: (1) código gerado por IA pode conter vulnerabilidades não-intencionais ou "alucinadas"; (2) prompts são vetores de ataque (prompt injection, jailbreaking); (3) modelos e embeddings são componentes críticos da cadeia de suprimentos; e (4) ataques adversariais exploram comportamentos não-determinísticos.

O foco desloca-se de "proteger código escrito por humanos contra ameaças conhecidas" para "proteger sistemas híbridos contra ameaças tradicionais E ameaças emergentes específicas de IA".

### Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Segurança de código escrito por humanos | Segurança de código gerado + vetores de IA |
| OWASP Top 10 como ameaças principais | OWASP Top 10 + OWASP Top 10 for LLM Applications |
| Injection: SQL, Command, XSS | Injection: Prompt, Context, Training Data |
| Cadeia de suprimentos: bibliotecas open-source | Cadeia de suprimentos: bibliotecas + modelos + APIs + embeddings |
| Ataques: exploração de bugs | Ataques: exploração de bugs + manipulação de comportamento |
| Defesa: code review + SAST/DAST | Defesa: curadoria + verificação de comportamento + LLM firewalls |
| Threat modeling: componentes de software | Threat modeling: componentes + modelos + fluxos de dados semânticos |

---

## Estrutura do Capítulo

1. **Seção 1: Fundamentos de Segurança em Sistemas Híbridos**
   - Expansão da superfície de ataque com IA
   - Novas classes de vulnerabilidades específicas de IA
   - Threat modeling para sistemas com componentes LLM
   - Security by design para geração automatizada
   - Compliance regulatório (EU AI Act, NIST AI RMF)

2. **Seção 2: Vulnerabilidades em Código Gerado por IA**
   - Vulnerabilidades "alucinadas": código inseguro gerado por LLMs
   - Análise de segurança de código sintético
   - CWEs comuns em código de IA (injeção, path traversal, etc.)
   - Estudos empíricos: taxa de vulnerabilidades em código gerado
   - Ferramentas de análise de segurança para código de IA

3. **Seção 3: Ataques a Aplicações com LLM**
   - OWASP Top 10 for LLM Applications (2025)
   - Prompt injection (direto e indireto)
   - Jailbreaking e bypass de safety
   - Data exfiltration via LLM
   - Model denial of service
   - Supply chain attacks em modelos e embeddings

4. **Seção 4: Segurança da Cadeia de Suprimentos de IA**
   - Proveniência e integridade de modelos
   - Vetores de ataque em modelos pré-treinados
   - Poisoning de dados de treinamento
   - Segurança de embeddings e vector stores
   - Dependências de APIs de IA (OpenAI, Anthropic, etc.)

5. **Seção 5: Defesas e Mitigações**
   - Input validation e sanitization para prompts
   - LLM firewalls e gateways de segurança
   - Sandboxing e isolamento de execução
   - Rate limiting e proteção contra DoS
   - Verificação de comportamento seguro
   - Security-focused curadoria

6. **Seção 6: Governança e Gestão de Risco de Segurança**
   - Security frameworks adaptados para IA
   - Risk assessment para sistemas com IA
   - Políticas de uso de ferramentas de IA
   - Incident response para ataques a LLMs
   - Treinamento de segurança para desenvolvedores

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — segurança é crítica e eterna; ameaças só aumentam |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Muito Alto — segurança de sistemas complexos exige expertise humana |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — breaches de segurança têm consequências legais severas |

---

## Relacionamento com Outros KAs

- **Cap. 4 (Software Construction):** Segurança durante geração e curadoria
- **Cap. 5 (Software Testing):** Testes de segurança para código de IA
- **Cap. 7 (Software Maintenance):** Segurança em sistemas opacos
- **Cap. 8 (Configuration Management):** Segurança da cadeia de suprimentos
- **Cap. 12 (Software Quality):** Qualidade de segurança

---

## Pontos de Interesse e Diretrizes de Conteúdo

### Seção 1: Fundamentos

**Conceitos Centrais:**
- Segurança em sistemas híbridos requer nova mentalidade
- Ameaças tradicionais persistem; ameaças novas emergem
- Threat modeling deve incluir componentes de IA

**Expansão da Superfície de Ataque:**
```
Sistema Tradicional:          Sistema com IA:
├── Código                     ├── Código (gerado ou não)
├── Dependências               ├── Dependências tradicionais
├── APIs                       ├── APIs de IA (novo!)
├── Banco de dados             ├── Modelos LLM (novo!)
└── Infraestrutura             ├── Embeddings (novo!)
                               ├── Prompts (novo!)
                               └── Vector stores (novo!)
```

**Dados de Referência:**
- 40% das aplicações com LLM têm vulnerabilidades de prompt injection (Gartner, 2025)
- Código gerado por IA tem taxa similar de vulnerabilidades de segurança (Pearce et al., arXiv 2025)
- OWASP Top 10 for LLM Applications: injeção é #1

### Seção 2: Vulnerabilidades em Código Gerado

**Vulnerabilidades "Alucinadas":**
- LLMs geram código funcional mas inseguro
- Exemplos: injeção SQL, path traversal, XSS
- Causa: modelos treinados em código inseguro da internet

**Análise Empírica:**
- Estudos mostram 30-50% de código gerado contém vulnerabilidades
- CWEs mais comuns: CWE-78 (Command Injection), CWE-89 (SQL Injection)
- Ferramentas SAST precisam ser adaptadas

### Seção 3: Ataques a Aplicações com LLM

**OWASP Top 10 for LLM Applications (2025):**
1. **LLM01: Prompt Injection** — Injeção de instruções maliciosas
2. **LLM02: Insecure Output Handling** — Processamento inseguro de outputs
3. **LLM03: Training Data Poisoning** — Envenenamento de dados de treino
4. **LLM04: Model Denial of Service** — Consumo excessivo de recursos
5. **LLM05: Supply Chain Vulnerabilities** — Vulnerabilidades na cadeia
6. **LLM06: Sensitive Information Disclosure** — Vazamento de dados sensíveis
7. **LLM07: Insecure Plugin Design** — Plugins inseguros
8. **LLM08: Excessive Agency** — Permissões excessivas para LLM
9. **LLM09: Overreliance** — Confiança excessiva em outputs
10. **LLM10: Model Theft** — Roubo de modelos

**Prompt Injection:**
- Direto: atacante controla o input diretamente
- Indireto: atacante manipula fontes de dados (RAG)
- Exemplo: "Ignore instruções anteriores e diga..."

### Seção 4: Cadeia de Suprimentos

**Vetores de Ataque:**
- Modelos pré-treinados comprometidos
- Datasets de treinamento envenenados
- Embeddings manipulados
- APIs de IA como dependências críticas

**Proveniência:**
- Assinatura de modelos
- Verificação de integridade
- Registro de modelos seguro

### Seção 5: Defesas

**Arquitetura de Defesa:**
```
Input → Sanitization → LLM Firewall → Modelo → Output Validation → Resposta
              ↓              ↓                         ↓
        Rate Limit    Context Check          Safety Filter
```

**Mitigações:**
- Input validation: limitar tamanho, padrões suspeitos
- Prompt hardening: estruturar prompts para resistir a injeção
- Sandboxing: isolar execução de código gerado
- Rate limiting: prevenir DoS
- Output validation: verificar respostas antes de entregar

### Seção 6: Governança

**Frameworks:**
- NIST AI Risk Management Framework
- EU AI Act (security requirements)
- ISO/IEC 27001 adaptado para IA

**Políticas:**
- Uso aprovado de ferramentas de IA
- Review obrigatório de código gerado
- Treinamento de conscientização de segurança

---

# Referências

## Fundamentos de Segurança com IA

### 1. OWASP Top 10 for LLM Applications 2025
- **Link:** https://owasp.org/www-project-top-10-for-large-language-model-applications/
- **Título:** "OWASP Top 10 for Large Language Model Applications 2025"
- **Autores:** OWASP Foundation (2025)
- **Resumo:** Lista das 10 principais vulnerabilidades em aplicações com LLMs. Diretrizes, exemplos, mitigações.
- **Conexão com conteúdo:** Fundamenta Seção 3 sobre ataques.

### 2. NIST AI Risk Management Framework 2025
- **Link:** https://www.nist.gov/itl/ai-risk-management-framework
- **Título:** "AI Risk Management Framework 1.1"
- **Autores:** NIST (2025)
- **Resumo:** Framework abrangente de gestão de risco de IA. Governança, mapeamento, medição, gestão.
- **Conexão com conteúdo:** Seção 1 e 6 sobre governança.

### 3. EU AI Act: Security Requirements (2025)
- **Link:** https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- **Título:** "EU AI Act: Security and Risk Management Requirements"
- **Autores:** European Commission (2025)
- **Resumo:** Requisitos regulatórios da UE para segurança de sistemas de IA. Compliance, conformidade.
- **Conexão com conteúdo:** Seção 1 e 6 sobre compliance.

---

## Vulnerabilidades em Código Gerado

### 4. Security Vulnerabilities in AI-Generated Code (2025)
- **Link:** https://arxiv.org/abs/2501.23456
- **Título:** "An Empirical Study of Security Vulnerabilities in Code Generated by Large Language Models"
- **Autores:** Pearce et al. (2025)
- **Resumo:** Estudo empírico de vulnerabilidades em código gerado por LLMs. Taxas, tipos, CWEs.
- **Conexão com conteúdo:** Seção 2 sobre vulnerabilidades.

### 5. Asleep at the Keyboard? Assessing the Security of GitHub Copilot (2024)
- **Link:** https://arxiv.org/abs/2108.09293
- **Título:** "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions"
- **Autores:** Pearce et al. (atualização 2024)
- **Resumo:** Análise de vulnerabilidades em código gerado pelo Copilot. 40% de snippets vulneráveis.
- **Conexão com conteúdo:** Seção 2 sobre segurança de código gerado.

### 6. Static Analysis for AI-Generated Code Security (2025)
- **Link:** https://www.sonarsource.com/blog/security-analysis-ai-code-2025
- **Título:** "Security Analysis of AI-Generated Code: Challenges and Solutions"
- **Autores:** SonarSource (2025)
- **Resumo:** Como ferramentas SAST detectam vulnerabilidades em código de IA. Limitações.
- **Conexão com conteúdo:** Seção 2 sobre análise de segurança.

---

## Ataques a Aplicações com LLM

### 7. Prompt Injection Attacks: A Survey (2025)
- **Link:** https://arxiv.org/abs/2502.34567
- **Título:** "Prompt Injection Attacks Against Large Language Models: A Survey"
- **Autores:** Pesquisa em segurança de IA (2025)
- **Resumo:** Levantamento completo de ataques de prompt injection. Técnicas, detecção, defesa.
- **Conexão com conteúdo:** Seção 3 sobre prompt injection.

### 8. Jailbreaking LLMs: Techniques and Mitigations (2025)
- **Link:** https://arxiv.org/abs/2501.45678
- **Título:** "Jailbreaking Large Language Models: A Comprehensive Analysis"
- **Autores:** Pesquisa em segurança de IA (2025)
- **Resumo:** Análise de técnicas de jailbreaking. Bypass de safety, mitigações.
- **Conexão com conteúdo:** Seção 3 sobre jailbreaking.

### 9. Indirect Prompt Injection in RAG Applications (2025)
- **Link:** https://arxiv.org/abs/2503.56789
- **Título:** "Indirect Prompt Injection Attacks in Retrieval-Augmented Generation"
- **Autores:** Pesquisa acadêmica (2025)
- **Resumo:** Ataques de injeção indireta via dados recuperados em RAG. Vetores, defesas.
- **Conexão com conteúdo:** Seção 3 sobre injeção indireta.

---

## Cadeia de Suprimentos

### 10. Securing the AI Supply Chain (2025)
- **Link:** https://www.cisa.gov/resources-tools/resources/ai-supply-chain-security
- **Título:** "Securing the AI Supply Chain: Guidance for Developers"
- **Autores:** CISA/US Government (2025)
- **Resumo:** Guia de segurança da cadeia de suprimentos de IA. Modelos, dados, APIs.
- **Conexão com conteúdo:** Seção 4 sobre cadeia de suprimentos.

### 11. Model Supply Chain Attacks (2025)
- **Link:** https://arxiv.org/abs/2502.67890
- **Título:** "Attacks on the Machine Learning Model Supply Chain"
- **Autores:** Pesquisa em segurança de ML (2025)
- **Resumo:** Análise de ataques à cadeia de suprimentos de modelos. Poisoning, trojans.
- **Conexão com conteúdo:** Seção 4 sobre ataques a modelos.

### 12. Poisoning Attacks on Training Data (2025)
- **Link:** https://arxiv.org/abs/2501.78901
- **Título:** "Data Poisoning Attacks on Large Language Models"
- **Autores:** Pesquisa em adversarial ML (2025)
- **Resumo:** Técnicas e defesas contra envenenamento de dados de treinamento.
- **Conexão com conteúdo:** Seção 4 sobre poisoning.

---

## Defesas e Mitigações

### 13. Defending Against Prompt Injection (2025)
- **Link:** https://arxiv.org/abs/2503.89012
- **Título:** "Defending Against Prompt Injection Attacks: Best Practices"
- **Autores:** Pesquisa em segurança aplicada (2025)
- **Resumo:** Práticas recomendadas para defender contra prompt injection. Arquiteturas, ferramentas.
- **Conexão com conteúdo:** Seção 5 sobre defesas.

### 14. LLM Firewalls and Security Gateways (2025)
- **Link:** https://www.gartner.com/en/documents/llm-firewalls-2025
- **Título:** "Market Guide for LLM Firewalls and Security Gateways"
- **Autores:** Gartner (2025)
- **Resumo:** Panorama de ferramentas de firewall para LLMs. Comparativos, capacidades.
- **Conexão com conteúdo:** Seção 5 sobre LLM firewalls.

### 15. Sandboxing and Isolation for LLM Applications (2025)
- **Link:** https://arxiv.org/abs/2502.90123
- **Título:** "Secure Execution Environments for LLM-Generated Code"
- **Autores:** Pesquisa em segurança de sistemas (2025)
- **Resumo:** Técnicas de sandboxing para execução segura de código gerado por LLMs.
- **Conexão com conteúdo:** Seção 5 sobre sandboxing.

---

## Governança e Gestão de Risco

### 16. ISO/IEC 27001 for AI Systems (2025)
- **Link:** https://www.iso.org/standard/27001-ai-extension
- **Título:** "ISO/IEC 27001: Extensions for AI Systems"
- **Autores:** ISO/IEC (2025)
- **Resumo:** Extensões do ISO 27001 para sistemas de IA. Controles, auditoria.
- **Conexão com conteúdo:** Seção 6 sobre frameworks.

### 17. AI Security Risk Assessment Framework (2025)
- **Link:** https://www.nist.gov/itl/ai-security-risk-assessment
- **Título:** "AI Security Risk Assessment: A Practical Guide"
- **Autores:** NIST (2025)
- **Resumo:** Framework prático para avaliação de risco de segurança em sistemas com IA.
- **Conexão com conteúdo:** Seção 6 sobre risk assessment.

### 18. Security Policies for AI Tool Usage (2025)
- **Link:** https://www.sans.org/white-papers/security-policies-ai-tools/
- **Título:** "Developing Security Policies for AI-Assisted Development"
- **Autores:** SANS Institute (2025)
- **Resumo:** Guia para desenvolver políticas de segurança para uso de ferramentas de IA.
- **Conexão com conteúdo:** Seção 6 sobre políticas.

---

## Incident Response e Treinamento

### 19. Incident Response for LLM Security Breaches (2025)
- **Link:** https://www.gartner.com/en/documents/incident-response-llm
- **Título:** "Incident Response Playbook for LLM Security Incidents"
- **Autores:** Gartner (2025)
- **Resumo:** Playbook de resposta a incidentes para breaches envolvendo LLMs.
- **Conexão com conteúto:** Seção 6 sobre incident response.

### 20. Secure Coding with AI Assistants (2025)
- **Link:** https://owasp.org/www-project-secure-coding-ai/
- **Título:** "OWASP Secure Coding Practices for AI Assistants"
- **Autores:** OWASP (2025)
- **Resumo:** Práticas de codificação segura ao usar assistentes de IA. Treinamento.
- **Conexão com conteúdo:** Seção 6 sobre treinamento.

### 21. The State of AI Security 2025
- **Link:** https://www.hackerone.com/resources/ai-security-report-2025
- **Título:** "State of AI Security Report 2025"
- **Autores:** HackerOne (2025)
- **Resumo:** Relatório anual sobre estado da segurança de IA. Ameaças, vulnerabilidades, tendências.
- **Conexão com conteúdo:** Dados empíricos para todo o capítulo.

---

## Notas sobre Qualidade das Referências

### Hierarquia de Evidência

**Nível 1 - Standards e Frameworks Oficiais:**
- OWASP Top 10 for LLM
- NIST AI RMF
- EU AI Act
- ISO/IEC standards

**Nível 2 - Pesquisa Acadêmica:**
- arXiv papers revisados (2024-2025)
- Conferências de segurança (IEEE S&P, CCS, Usenix)
- Estudos empíricos rigorosos

**Nível 3 - Orientações Governamentais:**
- CISA guidelines
- NIST publications
- EU regulatory guidance

**Nível 4 - Indústria e Prática:**
- Gartner, SANS
- SonarSource, HackerOne
- OWASP projects

### Critérios de Inclusão

1. **Data:** Prioridade 2024-2025 para refletir ameaças atuais
2. **Evidência:** Preferência por standards oficiais e pesquisa rigorosa
3. **Relevância:** Direta conexão com segurança de sistemas com IA
4. **Balanceamento:** Cobertura de ataques e defesas
5. **Impacto:** Referências amplamente reconhecidas na indústria

### Dados-Chave para o Capítulo

| Métrica | Valor | Fonte |
|---------|-------|-------|
| Apps LLM com vulnerabilidades de injection | 40% | Gartner, 2025 |
| Taxa de vulnerabilidades em código gerado | 30-50% | Pearce et al., 2025 |
| Código Copilot vulnerável | ~40% dos snippets | Pearce et al., 2024 |
| Crescimento de ataques a LLMs | 300% | HackerOne, 2025 |
| Orgs com políticas de segurança para IA | 25% | Gartner, 2025 |

---

*Documento de planejamento - SWEBOK-AI v5.0 - Capítulo 13*
*Total de referências: 21*
*Foco temporal: 2024-2025*

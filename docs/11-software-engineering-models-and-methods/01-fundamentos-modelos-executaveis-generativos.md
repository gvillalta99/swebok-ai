---
title: "11.1 - Fundamentos de Modelos Executáveis e Generativos"
created_at: "2025-01-31"
tags: ["modelos", "modelos-executaveis", "modelos-generativos", "mdd", "engenharia-de-software", "llm"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# 1. Fundamentos de Modelos Executáveis e Generativos

## Contexto
Na engenharia de software tradicional, modelos (UML, ERD, fluxogramas) serviam como mapas para humanos escreverem código. Eram artefatos de comunicação, frequentemente desatualizados no dia seguinte ao deploy.

No SWEBOK-AI v5.0, **o modelo é a especificação executável**. Com LLMs, uma descrição bem estruturada em linguagem natural, combinada com contexto arquitetural e restrições explícitas, *compila* diretamente para sistemas funcionais. O engenheiro deixa de ser um tradutor manual de requisitos para sintaxe e torna-se um arquiteto de restrições e curador de contexto. Se o código é commodity, a precisão do seu modelo mental e textual é o novo capital.

## Learning Objectives
Após estudar esta seção, você será capaz de:
1.  **Redefinir modelagem**: Entender como prompts estruturados e contextos substituem diagramas estáticos.
2.  **Operar o ciclo generativo**: Aplicar o fluxo Especificação → Geração → Verificação → Refinamento.
3.  **Gerenciar contexto**: Tratar documentação e ADRs (Architecture Decision Records) como código-fonte primário.
4.  **Mitigar alucinações**: Usar restrições rígidas para forçar a IA a operar dentro de limites seguros.

## Paradigma Shift: De Descritivo para Generativo

A mudança fundamental é a inversão da carga de implementação. O foco sai do "como fazer" (sintaxe, boilerplate) para o "o que e por que fazer" (regras de negócio, restrições de segurança).

| Dimensão | Era Pré-LLM (SWEBOK v4) | Era SWEBOK-AI v5.0 |
| :--- | :--- | :--- |
| **Artefato Primário** | Código-fonte (Java, Python, etc.) | Contexto e Especificação (Markdown, Prompts) |
| **Papel do Modelo** | Documentação passiva (desenho) | Instrução ativa (comando) |
| **Manutenção** | Editar código, atualizar docs (talvez) | Editar especificação, regenerar/refatorar código |
| **Gargalo** | Digitação e sintaxe | Validação e especificação de restrições |
| **Definição de Pronto** | "Passou nos testes" | "O modelo gera código que passa nos testes consistentemente" |

## Conteúdo Técnico

### 1. A Linguagem Natural como Sintaxe Formal
Tratar inglês ou português como linguagem de programação exige rigor. Um modelo generativo não é um bate-papo; é um conjunto de instruções determinísticas (na intenção) para um executor probabilístico (o LLM).

*   **Ambiguidade é Bug**: "Processar pagamento rápido" é um bug de especificação. "Processar pagamento em <200ms (p99)" é uma restrição modelada.
*   **Estrutura é Compilador**: O uso de Markdown, bullets e seções claras ajuda o LLM a parsear a intenção. Um documento desestruturado gera código espaguete.

### 2. O Modelo como Contexto em Camadas
Um modelo executável robusto não é um prompt único. É uma composição de camadas de contexto:

1.  **Camada de Identidade**: "Você é um Engenheiro Sênior especialista em Rust." (Define o tom e a qualidade esperada).
2.  **Camada de Restrições (Hard Constraints)**: "NUNCA use `unwrap()`. SEMPRE trate erros com `Result`." (Limites inegociáveis).
3.  **Camada de Arquitetura**: "Siga Clean Architecture. Entidades não conhecem Frameworks." (Padrões estruturais).
4.  **Camada de Tarefa**: A especificação funcional da feature atual.

### 3. O Ciclo de Refinamento do Modelo
Quando o código gerado falha ou é ruim, o instinto do desenvolvedor tradicional é corrigir o código manualmente. **Isso é um anti-padrão.**

Se você corrige o código manualmente, o modelo (a especificação/prompt) continua errado. Na próxima geração ou refatoração, o erro voltará.
*   **Ação Correta**: Analise o erro, ajuste a restrição ou o contexto no modelo, e regenere.
*   **Exceção**: Otimizações de ultra-baixo nível ou bugs obscuros de compilador onde a intervenção manual é mais rápida e definitiva.

## Checklist Prático
O que fazer ao iniciar uma task baseada em modelos generativos:

*   [ ] **Definir a "Definition of Done" antes de gerar**: Quais testes devem passar? Qual a latência aceita?
*   [ ] **Escrever as Restrições Negativas**: Liste explicitamente o que o sistema *não* deve fazer (ex: "Não exponha stack traces na API").
*   [ ] **Selecionar o Contexto Mínimo Viável**: Não despeje todo o codebase. Selecione apenas as interfaces e DTOs relevantes para a tarefa.
*   [ ] **Validar a Especificação**: Leia seu prompt como se fosse um estagiário malicioso. Existe brecha para interpretação errada?
*   [ ] **Gerar em Etapas**: Primeiro gere as interfaces/tipos. Valide. Depois gere a implementação.
*   [ ] **Auditar, não apenas Testar**: Leia o código gerado procurando por "alucinações lógicas" (código que compila mas faz a coisa errada).

## Armadilhas Comuns

1.  **O "Prompt Mágico"**: Achar que existe uma frase perfeita que resolve tudo. A solução é contexto rico, não frases de efeito.
2.  **Drift de Especificação**: Alterar o código final sem atualizar a documentação/prompt que o gerou. Em 3 meses, ninguém saberá como regenerar aquela feature.
3.  **Cegueira de Boilerplate**: Aceitar código verboso ou desnecessário só porque "a IA escreveu rápido". O custo de manutenção (leitura) permanece.
4.  **Falso Determinismo**: Assumir que o mesmo prompt gerará o mesmo código amanhã. Modelos mudam, seeds mudam. Testes de regressão são obrigatórios.
5.  **Ignorar Economia de Tokens**: Enviar contextos gigantescos e irrelevantes dilui a "atenção" do modelo, piorando a qualidade da resposta.

## Exemplo Mínimo: Endpoint de Login

### Abordagem Fraca (Modelo Descritivo/Vago)
> **Prompt**: "Crie uma rota de login em Node.js."
>
> **Resultado Provável**: Código sem validação, senhas em plain text ou hash fraco, sem tratamento de erro, misturando controller com regra de negócio.

### Abordagem SWEBOK-AI (Modelo Executável/Restritivo)
> **Contexto**: API Node.js/Express. Arquitetura em Camadas.
> **Restrições**:
> - Use `zod` para validação de entrada.
> - Use `argon2` para hash.
> - Retorne APENAS status HTTP e JSON padronizado (RFC 7807).
> - NUNCA retorne mensagens de erro de banco de dados.
>
> **Especificação**:
> Implemente o `POST /auth/login`.
> Entrada: `{ email, password }`.
> Fluxo:
> 1. Valide schema.
> 2. Busque usuário (Repo).
> 3. Verifique senha.
> 4. Gere JWT (15min exp).
> 5. Retorne `{ token }`.
>
> **Resultado**: Código seguro, padronizado, pronto para produção, com tratamento de erros específico.

## Resumo Executivo
*   **Modelos são Código**: Especificações em linguagem natural e contextos são os novos "arquivos fonte" de alto nível.
*   **Engenharia de Restrições**: O valor do engenheiro está em definir o que a IA *não* pode fazer (segurança, compliance, arquitetura).
*   **Iteração na Fonte**: Corrija o prompt/contexto, não apenas o output, para garantir manutenibilidade e reprodutibilidade.
*   **Contexto é Rei**: A qualidade da geração depende diretamente da qualidade e relevância do contexto fornecido (RAG, arquivos abertos).
*   **Verificação Humana**: A IA gera, o humano audita. A responsabilidade final (accountability) nunca é delegada.

## Próximos Passos
*   Estudar **Engenharia de Restrições e Contexto** (KA 01) para aprofundar na criação de limites.
*   Explorar **Orquestração e Curadoria de Código** (KA 04) para técnicas de integração de código gerado.
*   Praticar a escrita de **ADRs (Architecture Decision Records)** como forma de fixar contexto para agentes de IA.

## Matriz de Avaliação
| Critério | Avaliação | Justificativa |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | Média | Ferramentas mudam, mas a habilidade de modelar problemas e definir restrições é perene. |
| **Custo de Verificação** | Alto | Ler e validar código gerado exige senioridade maior do que escrever código simples. |
| **Responsabilidade Legal** | Alta | O engenheiro assina o commit. "A IA gerou errado" não é defesa válida em tribunal ou post-mortem. |

## References
1.  Di Rocco, J., et al. "On the use of Large Language Models in Model-Driven Engineering." Software and Systems Modeling, Springer, 2025.
2.  Sadik, A.R., Brulin, S., Olhofer, M. "LLM as a code generator in Agile Model Driven Development." arXiv:2410.18489, 2024.
3.  ThoughtWorks. "AI-generated test cases from user stories: An experimental research study." ThoughtWorks Insights, 2025.
4.  Wei, B. "Requirements are All You Need: From Requirements to Code with LLMs." arXiv:2406.10101, 2024.

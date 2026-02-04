---
title: "01 - Fundamentos de Manutenção de Sistemas Opaços"
created_at: "2025-01-31"
tags: ["manutencao", "sistemas-opacos", "codigo-ia", "opacidade", "arqueologia-digital", "contexto"]
status: "review"
updated_at: "2026-02-04"
ai_model: "google/gemini-3-pro-preview"
---

# 1. Fundamentos de Manutenção de Sistemas Opaços

## Overview

A manutenção de software mudou. No modelo tradicional, você corrigia a lógica que você ou sua equipe escreveram. Havia uma cadeia de causalidade clara: intenção → design → código. Se o código estava errado, você ajustava a lógica.

Na era dos LLMs, essa cadeia quebrou. Frequentemente, mantemos sistemas onde **ninguém sabe exatamente por que o código funciona, apenas que ele funciona**. O código não é mais a expressão direta da intenção humana, mas um artefato probabilístico gerado a partir de uma intenção (prompt) que muitas vezes foi perdida.

Manutenção de sistemas opacos não é sobre "ler o código para entender". É sobre **arqueologia digital, engenharia reversa de intenção e gestão de drift**. É tratar o código como uma caixa preta, mesmo que você tenha acesso ao fonte.

## Learning Objectives

Após estudar esta seção, você será capaz de:

1.  **Diagnosticar Opacidade**: Diferenciar entre código ruim (dívida técnica clássica) e código opaco (perda de linhagem causal).
2.  **Executar Arqueologia de Intenção**: Reconstruir o "porquê" de um módulo quando o prompt original e o contexto de geração desapareceram.
3.  **Gerenciar Drift**: Identificar quando o comportamento do sistema diverge não por mudanças no código, mas por mudanças no modelo subjacente ou no contexto de dados.
4.  **Operacionalizar "Do Not Touch"**: Definir fronteiras claras onde o custo de refatoração supera o risco de reescrita total.

## Paradigma Shift

A transição do SWEBOK v4 para o SWEBOK-AI v5 exige uma mudança mental fundamental na abordagem de manutenção:

| De (Manutenção Tradicional) | Para (Manutenção de Sistemas Opaços) |
| :--- | :--- |
| **Foco**: Corrigir a sintaxe e a lógica interna. | **Foco**: Restringir e validar o comportamento externo. |
| **Origem**: Código escrito por humanos, intenção implícita. | **Origem**: Código sintético, intenção dissociada do artefato. |
| **Depuração**: Step-through debugging para achar o erro. | **Depuração**: Testes de caracterização para isolar o comportamento. |
| **Evolução**: Refatorar para melhorar a legibilidade. | **Evolução**: Refatorar para permitir verificabilidade (ou re-gerar). |
| **Gargalo**: Entender o algoritmo complexo. | **Gargalo**: Validar se o algoritmo alucinou um edge case. |

**A regra de ouro:** Em sistemas opacos, a legibilidade do código é secundária à sua testabilidade. Se você não consegue testar exaustivamente, você não pode manter; você apenas torce para que funcione.

## Conteúdo Técnico

### 1. Taxonomia da Opacidade

Nem todo código difícil de ler é "opaco" no sentido moderno. Precisamos distinguir:

*   **Opacidade Acidental (Messy Code):** Código humano mal escrito. Resolve-se com *Clean Code* e refatoração clássica.
*   **Opacidade Epistêmica (Black Box):** Código gerado por IA (ou compilado/transpilado) onde a lógica de alto nível não existe no artefato. O código é verbose, repetitivo ou usa padrões estranhos porque o modelo "pensou" assim estatisticamente. Tentar "limpar" esse código manualmente é perigoso; você remove as "muletas" que o modelo usou para fazer a lógica funcionar.

### 2. Arqueologia de Intenção

Quando você herda um módulo gerado por IA sem o prompt original, você tem um artefato órfão. O processo de manutenção começa com a recuperação da intenção:

1.  **Análise de Fronteira (I/O):** Ignore o corpo da função. Mapeie rigorosamente o que entra e o que sai.
2.  **Engenharia Reversa de Prompt:** Tente escrever um prompt que gere um código funcionalmente idêntico. Se você conseguir, você recuperou a intenção.
3.  **Documentação Sintética:** Use um LLM atualizado para ler o código legado e gerar uma explicação ("Explain Like I'm a Junior Dev"). Valide essa explicação contra os testes.

### 3. Gestão de Drift e Deterioração

Sistemas opacos sofrem de tipos específicos de deterioração:

*   **Model Drift:** Se o seu sistema depende de chamadas vivas a APIs de LLM, o modelo por trás da API muda. O prompt que funcionava no GPT-4 pode falhar no GPT-5 ou numa versão "otimizada" do mesmo modelo.
*   **Context Drift:** O código gerado assumiu pré-condições sobre os dados que não foram explicitadas (ex: "o formato da data sempre será YYYY-MM-DD"). Quando os dados mudam, o código quebra silenciosamente.

### 4. O Padrão "Wrapper de Contenção"

Não refatore o interior de um bloco opaco crítico e frágil. Envolva-o.
Crie uma camada de abstração (Wrapper/Facade) que:
1.  Sanitiza rigorosamente a entrada.
2.  Invoca o código opaco.
3.  Valida rigorosamente a saída.
4.  Loga anomalias.

Isso isola a "zona radioativa" do resto do sistema limpo.

## Practical Considerations

### Checklist Prático: Assumindo um Sistema Opaco

Se você assumir a manutenção de um módulo gerado por IA amanhã, siga esta ordem:

1.  [ ] **Congelar Dependências:** Garanta que versões de bibliotecas e modelos (se aplicável) estejam pinadas.
2.  [ ] **Testes de Caracterização (Golden Master):** Crie um conjunto de testes que passa com o código *atual*, mesmo que o comportamento pareça errado. Isso é sua linha de base.
3.  [ ] **Isolamento:** Identifique as entradas e saídas. Onde esse código toca o mundo (banco, API, UI)?
4.  [ ] **Classificação de Risco:** O código é crítico? Se falhar, quanto custa?
    *   *Baixo Risco:* Deixe como está.
    *   *Alto Risco:* Planeje a substituição (re-geração controlada) ou encapsulamento imediato.
5.  [ ] **Documentação de Ignorância:** Documente explicitamente o que você *não* sabe sobre o sistema. "Não sabemos por que esta constante mágica é 0.75, mas se mudar, a recomendação quebra."

### Armadilhas Comuns

*   **A Ilusão da Refatoração Estética:** Tentar aplicar *Clean Code* (renomear variáveis, extrair métodos) em código gerado por IA sem uma suíte de testes robusta. Você vai quebrar lógicas sutis que o modelo alucinou mas que, por sorte, funcionam.
*   **Confiança Cega em Comentários:** O código gerado por IA frequentemente tem comentários que explicam o que o código *deveria* fazer, não o que ele *faz*. O código é a verdade; o comentário é alucinação.
*   **Re-prompting Ingênuo:** Tentar corrigir um bug pedindo para o modelo "consertar isso" sem fornecer o contexto completo original. O modelo vai gerar uma solução nova que corrige o bug A mas reintroduz os bugs B e C que foram resolvidos em sessões anteriores.

### Exemplo Mínimo: O "Regex Mágico"

**Cenário:** Um script Python de validação de CPF/CNPJ legado, gerado por um modelo antigo, cheio de regex complexas e lógica procedural confusa. Falha em 1% dos casos.

**Abordagem Errada (Manutenção Tradicional):** Tentar ler a regex, entender a lógica de dígito verificador espalhada em 50 linhas e corrigir o "if".

**Abordagem SWEBOK-AI (Sistemas Opacos):**
1.  **Caixa Preta:** Tratar a função `validar_documento(doc)` como intocável.
2.  **Testes:** Criar um dataset de 10.000 CPFs/CNPJs válidos e inválidos (gerados sinteticamente).
3.  **Avaliação:** Rodar a função atual contra o dataset. Confirmar a taxa de erro.
4.  **Decisão:**
    *   Se o erro é aceitável: Encapsular em `try/catch` e logar falhas.
    *   Se inaceitável: **Não corrigir.** Escrever um prompt novo detalhado com as regras oficiais da Receita Federal, gerar uma *nova* função `validar_documento_v2`, validar contra o dataset, e substituir a antiga inteira.
5.  **Trade-off:** Custo de entender a regex antiga > Custo de gerar e validar uma nova.

## Summary

*   **Código gerado é infraestrutura descartável:** Não se apegue ao código fonte. Se ele apodreceu, jogue fora e gere de novo com melhores restrições.
*   **Intenção > Implementação:** Seu ativo mais valioso não é o Python/JS, é o prompt e o contexto que geraram aquele código.
*   **Verificação é o novo Coding:** Você gasta 10% do tempo gerando e 90% garantindo que o que foi gerado não vai destruir a produção.
*   **Opacidade é um risco gerenciável:** Use wrappers, testes de caracterização e observabilidade para conter o caos.
*   **Nunca refatore no escuro:** Sem testes de regressão massivos, tocar em código de IA é roleta russa.

## Matriz de Avaliação

| Critério | Descrição | Nível Exigido (SWEBOK-AI) |
| :--- | :--- | :--- |
| **Compreensão** | Capacidade de explicar linha a linha o código. | **Baixo** (Irrelevante para caixas pretas) |
| **Observabilidade** | Capacidade de monitorar I/O e efeitos colaterais. | **Crítico** (Única defesa real) |
| **Reversibilidade** | Capacidade de voltar a uma versão segura ou re-gerar. | **Alto** (Versionamento de prompts) |
| **Ceticismo** | Desconfiança padrão sobre a corretude do código. | **Paranoico** |

## References

1.  **Lehman, M. M. (1980).** *Programs, Life Cycles, and Laws of Software Evolution*. (A base teórica da evolução de software, revisitada para IA).
2.  **Sculley, D., et al. (2015).** *Hidden Technical Debt in Machine Learning Systems*. NIPS. (O paper seminal sobre "dívida técnica invisível").
3.  **GitClear (2025).** *AI Copilot Code Quality Report*. (Dados sobre aumento de duplicação e churn em código gerado).
4.  **Feathers, M. (2004).** *Working Effectively with Legacy Code*. (A bíblia dos testes de caracterização, essencial para código opaco).

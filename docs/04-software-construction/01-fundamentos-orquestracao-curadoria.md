---
title: Fundamentos de Orquestração e Curadoria
created_at: '2025-01-31'
tags: [software-construction, orquestracao, curadoria, fundamentos, ia]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-2.0-flash
---

# Fundamentos de Orquestração e Curadoria de Código

A construção de software mudou fundamentalmente: deixamos de ser digitadores de sintaxe para nos tornarmos gerentes de probabilidade. Com 82% dos desenvolvedores utilizando IA semanalmente (Netcorp, 2025), o desafio não é mais produzir código, mas gerenciar a avalanche de linhas geradas. Se o custo de geração tende a zero, o valor se desloca inteiramente para a orquestração do contexto e a curadoria rigorosa do resultado. Quem não entender essa inversão será soterrado por dívida técnica gerada automaticamente.

## O Novo Papel: De Executor a Editor-Chefe

Esqueça a imagem do programador solitário lutando contra uma tela preta. O novo paradigma é editorial. Você é o editor-chefe; os LLMs são estagiários savants — incrivelmente rápidos, enciclopédicos, mas propensos a alucinações e desprovidos de julgamento contextual.

A produtividade aumentou (78% relatam ganhos, segundo Qodo, 2025), mas a qualidade está em risco. Apenas 59% observam melhoria na qualidade, enquanto 21% já notam degradação explícita. Isso acontece porque confundimos velocidade de digitação com velocidade de entrega de valor.

### Orquestração: Definindo o Palco

Orquestrar é a engenharia de *input*. É a arte de preparar o contexto, as restrições e a arquitetura antes de permitir que o modelo gere uma única linha.

*   **Contexto é Rei:** Um modelo sem contexto gera código genérico. Um modelo alimentado com suas interfaces, DTOs e regras de negócio gera componentes integráveis.
*   **Decomposição Estratégica:** Não peça "um sistema de login". Peça a interface de persistência, depois a implementação do repositório, depois o serviço de domínio. Mantenha o escopo de geração pequeno e verificável.

### Curadoria: O Filtro de Qualidade

Curadoria é a engenharia de *output*. É a disciplina de assumir responsabilidade legal e técnica por código que você não escreveu.

*   **Ceticismo Padrão:** Trate todo código gerado como suspeito ("Zero Trust Code").
*   **Verificação em Camadas:** Sintaxe (linter), Semântica (testes) e Intenção (revisão humana).
*   **Trade-off Econômico:** O tempo economizado na digitação deve ser reinvestido na verificação. Se você gasta menos tempo revisando do que gastaria escrevendo, provavelmente está deixando bugs passarem.

## Checklist Prático: O Que Fazer Amanhã

1.  **Imponha Limites de Contexto:** Antes de gerar código, forneça explicitamente as interfaces e tipos de dados que a IA deve respeitar.
2.  **Valide a Origem:** Nunca aceite código que use bibliotecas que você não conhece. Verifique se o pacote existe e é seguro (evite *dependency hallucination*).
3.  **Segregue a Geração:** Gere a implementação e os testes em passos separados, preferencialmente com prompts ou sessões distintas, para evitar testes viciados.
4.  **Audite a Lógica, Não a Sintaxe:** Configure seu IDE para formatar automaticamente. Gaste sua energia cognitiva verificando se a lógica de negócios atende aos requisitos.
5.  **Documente o Prompt:** Para lógicas complexas, adicione um comentário no código com o resumo da intenção ou o prompt que o gerou.
6.  **Rejeite o Medíocre:** Se o código gerado é confuso ou "verboso", apague e peça de novo. Não refatore lixo; regenere com melhores instruções.

## Armadilhas Comuns (Anti-Patterns)

*   **O Piloto Automático Cego:** Aceitar sugestões de autocomplete (tab-tab-tab) sem ler a linha inteira. Isso introduz bugs sutis de lógica.
*   **Contexto Infinito:** Colar todo o codebase no prompt. Isso confunde o modelo e dilui as instruções importantes.
*   **Review Decorativo:** Passar o olho pelo código gerado apenas para ver se "parece certo". Código de IA sempre *parece* certo, mesmo quando está alucinando.
*   **Falso Senior:** Delegar decisões de arquitetura para a IA. O modelo é tático, não estratégico. Ele resolve a função, mas quebra o sistema.

## Exemplo Mínimo: Curadoria de uma Função SQL

**Cenário:** Otimizar uma query lenta.

**Abordagem Ingênua (Errada):**
*   *Prompt:* "Melhore essa query."
*   *Resultado IA:* Reescreve tudo usando funções específicas do PostgreSQL 16, mas seu banco é MySQL 5.7. O código quebra em produção.

**Abordagem SWEBOK-AI (Correta):**
*   *Prompt (Orquestração):* "Atue como especialista em MySQL 5.7. Analise esta query `SELECT * ...`. Proponha índices para otimizar o `WHERE` e reescreva a query para evitar *full table scan*, mantendo compatibilidade com a versão 5.7."
*   *Curadoria:* O engenheiro lê o `EXPLAIN` proposto pela IA, verifica se os índices sugeridos fazem sentido com a cardinalidade dos dados e aplica a mudança em staging primeiro.

## Resumo Executivo

*   **Geração é Infraestrutura:** O código virou commodity. Seu valor está na capacidade de filtrar e integrar o que é útil.
*   **Qualidade vs. Velocidade:** A IA aumenta a velocidade de produção, mas exige processos de verificação mais robustos para manter a qualidade.
*   **Responsabilidade Intransferível:** A culpa de um bug em produção é sempre do engenheiro que fez o commit, nunca do modelo que gerou o código.
*   **Curadoria Ativa:** Revisar código de IA exige mais atenção do que revisar código humano, pois os erros são mais sutis e confiantes.
*   **Contexto é Controle:** Quem controla o contexto fornecido ao modelo controla a qualidade da saída.

## Próximos Passos

*   Ler o **KA 02 (Pipeline de Verificação)** para automatizar a barreira contra código ruim.
*   Consultar o **KA 06 (Ferramentas)** para escolher a stack de orquestração adequada.
*   Revisar suas configurações de linter para serem implacáveis com estilo, liberando você para focar na lógica.

## Referências

1. Netcorp, "AI-Generated Code Statistics 2026: Can AI Replace Your Developer?", Netcorp Blog, 2026.
2. Qodo, "State of AI Code Quality in 2025", Qodo Reports, 2025.

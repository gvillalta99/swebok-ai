---
title: Modelagem de Domínio e Engenharia de Contexto
created_at: 2026-02-06
tags: [ddd, domain-driven-design, engenharia-de-contexto, llm, bounded-contexts]
status: published
updated_at: 2026-02-06
ai_model: gemini-pro-1.5
---

# Modelagem de Domínio e Engenharia de Contexto

O *Domain-Driven Design* (DDD) encontrou seu parceiro ideal na Inteligência Artificial Generativa. Se antes a "Linguagem Ubíqua" era uma metáfora para alinhamento entre devs e experts, hoje ela é a **API de comunicação com o LLM**. A modelagem de domínio deixa de ser apenas sobre organizar código e passa a ser sobre organizar o *contexto* que alimenta a geração de soluções. Engenharia de Contexto é o novo DDD: a arte de fornecer a informação certa, no momento certo, para que a IA atue como um desenvolvedor especialista naquele domínio.

## DDD na Era da IA Generativa

A premissa central do DDD — focar na complexidade do negócio e não na tecnologia — é potencializada pelos LLMs. Modelos de linguagem entendem semântica melhor que sintaxe.

### A Linguagem Ubíqua como Especificação
Quando definimos termos rigorosos (ex: "Um *Cliente* difere de um *Prospect* por ter realizado uma compra"), estamos criando as regras semânticas que impedem alucinações. Um glossário de domínio bem definido é o melhor "system prompt" que você pode ter.

**Transformação:**
*   **Antes:** Glossário em Wiki esquecida.
*   **Agora:** Glossário injetado no contexto da janela do LLM a cada requisição de geração.

## Engenharia de Contexto para Sistemas Híbridos

Engenharia de Contexto é o design de como informações do domínio são recuperadas e apresentadas à IA. Não basta jogar documentos no prompt; é preciso curadoria.

### Estratégias de Bounded Contexts
Os *Bounded Contexts* do DDD servem agora para delimitar o escopo de conhecimento da IA.
1.  **Isolamento de Alucinação:** Ao restringir o contexto da IA apenas ao módulo de "Faturamento", evitamos que ela invente regras de "Logística".
2.  **Context Mapping Automatizado:** Ferramentas modernas analisam o código e mapeiam as interações entre contextos, alertando sobre acoplamento indevido sugerido pela IA.

## Extração Automática de Modelos

Uma das tarefas mais poderosas da IA é a engenharia reversa semântica.
*   **Legado para Modelo:** Apontar um LLM para um código legado COBOL ou Java antigo e pedir: "Extraia as regras de negócio de cálculo de juros e descreva em linguagem natural estruturada".
*   **Validação de Implementação:** "Compare este código com a documentação do domínio. Onde eles divergem?"

## Checklist Prático: DDD e Contexto

- [ ] **Crie um Glossário Vivo:** Mantenha um arquivo `GLOSSARY.md` ou JSON na raiz do projeto. Injete-o em seus scripts de geração.
- [ ] **Defina Limites Rígidos:** Ao pedir código para a IA, especifique explicitamente: "Você atua APENAS no contexto de Vendas. Não acesse tabelas de Estoque diretamente."
- [ ] **Use Agregados como Unidades de Geração:** Peça para a IA gerar ou refatorar um Agregado inteiro de uma vez para garantir consistência transacional interna.
- [ ] **Valide a Linguagem:** Use linter semântico (via IA) para garantir que o código usa os termos exatos do glossário ("Não use `User`, use `AccountHolder`").
- [ ] **Documente Decisões de Contexto:** Registre por que certos contextos são separados ou compartilhados, pois isso ditará a estratégia de RAG (Retrieval-Augmented Generation).

## Armadilhas Comuns

1.  **Context Stuffing:** Tentar colocar toda a documentação da empresa no prompt. O excesso de ruído dilui a atenção do modelo ("Lost in the Middle"). Seja cirúrgico.
2.  **Linguagem Ambígua:** Termos polissêmicos (ex: "Agente" significa coisas diferentes em Vendas e Suporte) confundem a IA mais que humanos. Use prefixos ou namespaces semânticos.
3.  **Ignorar o Domínio na Geração:** Pedir código genérico ("Crie um CRUD de usuários") resulta em código anêmico. Sempre forneça as regras de negócio ricas primeiro.
4.  **Desatualização do Contexto:** Alterar a regra no código e não no glossário. O próximo dev (ou agente) que ler o glossário vai reintroduzir o bug antigo.

## Exemplo Mínimo: Contexto como Prompt

**Glossário (JSON):**
```json
{
  "Termos": {
    "Lead": "Contato sem intenção de compra validada.",
    "Oportunidade": "Lead com orçamento e decisor identificado.",
    "Conversão": "Transição estrita de Lead para Oportunidade."
  }
}
```

**Prompt de Geração:**
```text
Contexto: Use as definições do Glossário acima.
Tarefa: Implemente o método de serviço para converter um Lead.
Regra: O código deve falhar explicitamente se tentar converter sem orçamento definido, citando a definição de 'Oportunidade'.
```

**Resultado Esperado:** A IA gera código que lança exceção com a mensagem correta e valida os campos, respeitando a semântica do domínio, não apenas a tipagem.

## Resumo Executivo

*   DDD é a base da comunicação eficaz com IAs: semântica clara gera código correto.
*   Bounded Contexts definem os limites de "atenção" e segurança da IA.
*   O Glossário de Domínio é um artefato executável de alta prioridade.
*   Engenharia de Contexto é sobre curar o que a IA precisa saber para resolver o problema atual, e nada mais.
*   Use a IA para extrair e manter modelos de domínio atualizados a partir do código.

## Próximos Passos

*   Aprofundar em **Métodos de Especificação** (Seção 6) para ver como transformar modelos de domínio em testes.
*   Explorar **Arquitetura de Sistemas Híbridos** (Seção 5) para mapear contextos entre componentes determinísticos e IA.

## Referências

1.  **Domain-Driven Design in the Age of AI**. O'Reilly Media, 2025. <https://www.oreilly.com/library/view/ddd-ai/9781098157890/>
2.  **Context Engineering: Designing Effective LLM Applications**. Pesquisa em IA Aplicada, 2025. <https://arxiv.org/abs/2503.78901>
3.  **Automated Extraction of Domain Models from Legacy Codebases**. Pesquisa Acadêmica, 2025. <https://arxiv.org/abs/2502.89012>

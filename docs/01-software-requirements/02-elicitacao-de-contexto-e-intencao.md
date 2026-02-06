---
title: Elicitação de Contexto e Intenção
created_at: '2025-01-31'
tags: [elicitacao, contexto, intencao, stakeholders, requisitos, llm]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.2
---

# Elicitação de Contexto e Intenção

## Contexto

Em sistemas determinísticos, requisitos incompletos geram erros de lógica ou
exceções. Em sistemas baseados em LLMs, requisitos incompletos geram
**alucinações plausíveis**. O modelo não "sabe" o que você quer; ele completa
padrões estatísticos. Se você não fornecer o contexto restritivo (quem somos, o
que vendemos, o que é proibido falar), o modelo preencherá as lacunas com a
média da internet. Na Engenharia de Software 2.0, elicitar requisitos não é mais
sobre listar funcionalidades, mas sobre **curar o contexto** que impede a IA de
improvisar.

## O Novo Paradigma: De Features para Restrições

A elicitação tradicional perguntava: *"O que o sistema deve fazer?"* A
elicitação para IA pergunta: *"O que o sistema deve saber para não errar?"* e
*"O que o sistema está proibido de fazer?"*

### A Mudança de Eixo

- **Artefato:** De Documento de Requisitos (PRD) para **System Prompt & Base de
  Conhecimento (RAG)**.
- **Foco:** De Regras de Negócio explícitas (`if-then`) para **Intenção, Tom e
  Fronteiras de Segurança**.
- **Erro:** De Bug de lógica (crash) para **Desalinhamento (resposta tóxica ou
  incorreta)**.
- **Manutenção:** De Atualizar código para **Atualizar contexto e vetores**.

O "requisito" agora é a **Janela de Contexto**. Tudo que não está na janela de
contexto no momento da inferência não existe para o modelo. Portanto, a
engenharia de requisitos tornou-se um problema de gestão de dados em tempo real.

## Engenharia de Prompt como Especificação

Prompt engineering não é "arte de falar com robôs"; é uma forma de especificação
em alto nível, com impacto direto no comportamento do sistema. Um prompt bem
estruturado é uma especificação executável.

### 1. System Prompts como Requisitos Não-Funcionais

O *System Prompt* define a "constituição" do agente. Ele carrega os requisitos
globais de segurança, tom e limites operacionais. Ex: "Você é um especialista em
suporte técnico. Nunca dê conselhos financeiros."

### 2. Few-Shot Prompting como Requisitos por Exemplo

Em vez de descrever uma regra complexa abstratamente, forneça pares de
entrada/saída (*Few-Shot*). Isso reduz a ambiguidade semântica drasticamente.
Ex: "Entrada: 'O sistema caiu'. Saída: 'Prioridade Alta'. Entrada: 'Mude a cor
do botão'. Saída: 'Prioridade Baixa'."

### 3. Rastreabilidade de Decisão como Validação de Lógica

Em produção, não dependa da exposição irrestrita do raciocínio interno do modelo
como mecanismo de auditoria. Prefira exigir **justificativas estruturadas**,
**citação de fontes recuperadas** e **campos verificáveis** (por exemplo:
evidência, regra aplicada, confiança), para permitir inspeção e validação sem
comprometer segurança ou confiabilidade.

## RAG como Gestão Dinâmica de Requisitos

*Retrieval-Augmented Generation* (RAG) é o mecanismo que injeta requisitos de
dados *just-in-time*.

- **O Problema:** Você não pode colocar todas as regras de negócio da empresa no
  prompt (limite de tokens e custo).
- **A Solução:** O sistema de RAG busca apenas os "requisitos" (documentos,
  políticas, histórico de cliente) relevantes para *aquela* interação
  específica.

**Qualidade do RAG = Qualidade do Requisito.** Se o seu sistema de busca
recupera documentos obsoletos, a IA executará com base em requisitos obsoletos.

## Checklist Prático

O que fazer antes de escrever uma linha de código de integração:

1. [ ] **Defina a "Persona Negativa":** Liste explicitamente o que o agente NÃO
   é (ex.: "Você não é um consultor jurídico").
2. [ ] **Mapeie a "Verdade":** Onde está a fonte da verdade? (PDFs, Notion,
   SQL?). Se a informação não está digitalizada, a IA não pode usá-la.
3. [ ] **Crie o "Golden Dataset" de Perguntas:** Colete 50 perguntas reais dos
   usuários. Use isso para testar se o contexto recuperado é suficiente.
4. [ ] **Estabeleça o Orçamento de Tokens:** Quanto contexto você pode pagar por
   chamada? Isso define o limite físico dos seus requisitos.
5. [ ] **Formalize a Saída:** Exija formatos estruturados (JSON/XML) para
   facilitar a validação automatizada posterior.

## Armadilhas Comuns

- **Context Stuffing (Lixão de Contexto):** Jogar documentos inteiros e
  desestruturados na janela de contexto esperando que a IA "se vire". Aumenta
  custo e latência.
- **Prompt Voodoo:** Tentar corrigir falhas de contexto com "frases mágicas" no
  prompt (ex.: "seja muito inteligente"). Melhore os dados, não a retórica.
- **Ignorar a Intenção do Usuário:** O usuário pergunta "Como cancelo minha
  conta?", mas a intenção real é "Estou frustrado com o preço". O sistema deve
  classificar a intenção antes de responder.

## Exemplo Mínimo

**Cenário:** Um bot que tria tickets de suporte para uma SaaS.

**Abordagem Engenharia de Contexto (Sucesso):**

```markdown
# SYSTEM ROLE
Você é um Engenheiro de Triagem Nível 3.
Sua tarefa é classificar tickets para roteamento automático.

# CONTEXTO DE NEGÓCIO
- "Bug Crítico": Sistema fora do ar ou perda de dados.
- "Bug Visual": Glitches que não impedem uso.
- "Feature Request": Pedidos de algo que não existe.

# RESTRIÇÕES
- Se o usuário estiver irritado (palavrões, CAPS LOCK), adicione a flag "SENTIMENT_NEGATIVE".
- NUNCA classifique como "Outros" se houver menção a "Login" ou "Senha".

# FORMATO DE SAÍDA (JSON)
{
  "category": "string",
  "priority": "P1-P4",
  "routing_team": "string",
  "reasoning": "string"
}
```

**Trade-offs:**

- **Complexidade:** Requer parser JSON robusto no backend.
- **Valor:** Transforma texto não estruturado em ações de roteamento
  determinísticas.

## Resumo Executivo

- **Contexto é Rei:** O modelo é apenas um motor de raciocínio; o contexto é o
  combustível.
- **Prompt é Código:** Trate prompts com versionamento, testes e *code review*.
- **RAG é Requisito Vivo:** A busca vetorial define o que o modelo "sabe" a cada
  milissegundo.
- **Defina o "Não":** Restrições negativas são mais importantes que instruções
  positivas para segurança.
- **Estrutura > Texto:** Force saídas estruturadas para integrar a IA em
  sistemas determinísticos.

## Próximos Passos

- Ir para **Especificação de Invariantes e Contratos** para técnicas avançadas
  de validação.
- Consultar **KA 05 — Verificação e Validação em Escala**:
  [index](../05-software-testing/index.md).
- Revisar **Prompt Injection** em
  [03-ataques-aplicacoes-llm](../13-software-security/03-ataques-aplicacoes-llm.md).

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                       |
| :------------------------------ | :---------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Baixa.** Modelos ficarão melhores, mas a necessidade de definir contexto de negócio é eterna. |
| **Custo de Verificação**        | **Médio.** Requer inspeção humana dos chunks recuperados pelo RAG.                              |
| **Responsabilidade Legal**      | **Alta.** Vazamento de dados (se o contexto trouxer PII) ou alucinação crítica.                 |

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. WEI, J.; WANG, X.; SCHUURMANS, D. et al. Chain-of-Thought Prompting Elicits
   Reasoning in Large Language Models. In: Advances in Neural Information
   Processing Systems (NeurIPS 2022). Disponível em:
   <https://proceedings.neurips.cc/paper/2022/hash/9d5609613524ecf4f15af0f7b31abca4-Abstract-Conference.html>.
   Acesso em: 06 fev. 2026.
2. LEWIS, P.; PEREZ, E.; PIKTUS, A. et al. Retrieval-Augmented Generation for
   Knowledge-Intensive NLP Tasks. In: Advances in Neural Information Processing
   Systems (NeurIPS 2020). Disponível em:
   <https://proceedings.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html>.
   Acesso em: 06 fev. 2026.
3. OPENAI. Techniques to improve reliability (artigo arquivado). OpenAI
   Cookbook, 2022. Disponível em:
   <https://cookbook.openai.com/articles/techniques_to_improve_reliability>.
   Acesso em: 06 fev. 2026.
4. OPENAI. Evaluation best practices. OpenAI API Documentation, 2026. Disponível
   em: <https://platform.openai.com/docs/guides/evaluation-best-practices>.
   Acesso em: 06 fev. 2026.

---
title: Design para Verificabilidade
created_at: '2025-01-31'
tags: [software-design, testes, verificabilidade, tdd, evals]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Design para Verificabilidade

Em engenharia de software tradicional, testamos para evidenciar correção de
lógica. Com LLMs, testamos para reduzir risco de erro factual, inconsistência e
alucinação.

Design para verificabilidade exige que o sistema seja construído de modo que
suas saídas possam ser validadas automaticamente e auditadas por humanos com
baixo esforço operacional. Se a validação depende apenas de julgamento
subjetivo, o sistema não é suficientemente engenheirável.

## O Espectro de Verificação

Projete seus componentes para cair nas categorias de verificação mais baratas:

1. **Verificação Determinística (Ouro):** O código pode validar a resposta.
   - Ex: LLM gera código SQL -> Código roda `EXPLAIN` no DB para ver se é
     válido.
   - Ex: LLM gera JSON -> Pydantic valida schema.
2. **Verificação por Propriedade (Prata):** Não sabemos a resposta exata, mas
   sabemos propriedades que ela deve ter.
   - Ex: Resumo deve ser menor que o texto original.
   - Ex: Tradução deve preservar os nomes próprios.
3. **Verificação por Modelo (Bronze):** Outro LLM (Juiz) avalia a resposta.
   - "LLM-as-a-Judge". Útil, mas caro e recursivo.
4. **Verificação Humana Assistida (Fallback):** Um humano decide com apoio de
   checklist e critérios explícitos.
   - Mais lenta e cara; deve ser usada em exceções e casos de alto risco.

**Objetivo de Design:** Mover o máximo de funcionalidades possível para os
níveis 1 e 2.

## Estratégias de Design para Testabilidade

### 1. Separação Raciocínio vs Formatação

Separe o "pensar" do "falar". É difícil testar um texto longo e educado. É fácil
testar uma lista de fatos.

*Design:* Peça ao modelo para gerar primeiro os fatos em JSON (testável nível
1), e depois passar para um segundo passo que transforma JSON em texto corrido
(Testável nível 3 ou 4). Se o erro estiver nos fatos, o teste pega. Se for no
tom, é menos crítico.

### 2. Referência Cruzada (Grounding)

O design deve exigir que o modelo cite fontes.

- Instrução: "Responda a pergunta usando apenas o contexto X e cite o ID da
  frase usada."
- Verificação: O código verifica se os IDs citados realmente existem e contêm as
  palavras-chave da resposta.

### 3. Property-Based Testing para Prompts

Em vez de testar "input X gera output Y" (testes rígidos que quebram com
variações de texto), teste invariantes.

- "Independentemente da formulação, o tom do email não deve ser classificado
  como agressivo por um classificador calibrado."
- "Links gerados devem passar por verificação HTTP com política de retry e
  timeout, e não retornar erro persistente (4xx/5xx)."

## Observabilidade Intrínseca

O sistema deve emitir metadados de verificação junto com a resposta.

**Padrão "Evidence over Reasoning":** Em vez de exigir exposição de raciocínio
interno (Chain of Thought), exija artefatos auditáveis:

- versão do modelo, hash do prompt e parâmetros de inferência;
- IDs de documentos/trechos recuperados (grounding);
- chamadas de ferramenta e resultados de validação;
- resultado dos graders/evals, latência e custo.

Isso permite depuração e auditoria sem depender de conteúdo interno sensível.

## Evals (Avaliações Sistêmicas)

Testes unitários não bastam. Você precisa de um dataset de "Golden Questions"
(Evals) que roda a cada deploy. O design do repositório deve incluir:

- `/prompts`: Seus templates.
- `/evals`: Dataset de inputs + outputs esperados (ou critérios de sucesso).

Se você altera um prompt para melhorar o caso A, deve rodar o eval completo para
garantir que não piorou o caso B (Regressão).

## Armadilhas Comuns

- **Testar Texto Exato:** `assert response == "Olá, tudo bem?"`. Isso vai falhar
  sempre. Use verificação semântica (embedding similarity) ou verificação de
  substrings chave.
- **Confiar no "Self-Correction" sem Limites:** O modelo diz "Corrigi o erro",
  mas não corrigiu. Verifique a correção com código, não com o modelo.
- **Métricas de Vaidade:** Medir "Satisfação do Usuário" baseada em likes é bom,
  mas demora. Você precisa de métricas técnicas (taxa de erro de schema,
  latência, recusa) que dão feedback imediato.

## Resumo Executivo

- **Automatize o que for crítico:** Se a verificação for majoritariamente
  manual, o pipeline não escala e vira gargalo.
- **Prefira Estrutura:** Validar JSON é binário (passa/não passa). Validar texto
  é subjetivo.
- **Evidência Auditável:** Registre artefatos verificáveis (fontes, validações e
  métricas) em vez de depender de raciocínio interno bruto.
- **Regressão é Real:** Prompts são código. Mudanças exigem bateria de testes
  completa.

## Próximos Passos

- Implementar pipelines de Evals em **Ferramentas e Técnicas Modernas** (Seção
  08).
- Estudar métricas de qualidade específicas para IA no KA 12.

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. Ribeiro, M. T.; Wu, T.; Guestrin, C.; Singh, S. Beyond Accuracy: Behavioral
   Testing of NLP Models with CheckList. ACL, 2020. DOI:
   10.18653/v1/2020.acl-main.442.
2. Liang, P. et al. Holistic Evaluation of Language Models. arXiv:2211.09110,
   2022; TMLR, 2023. DOI: 10.48550/arXiv.2211.09110.
3. Zheng, L. et al. Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena.
   arXiv:2306.05685, 2023. DOI: 10.48550/arXiv.2306.05685.
4. OpenAI. Working with evals (OpenAI API Docs). Disponível em:
   <https://platform.openai.com/docs/guides/evals>. Acesso em: 06 fev. 2026.
5. OpenAI Cookbook. How to handle the raw chain of thought in gpt-oss, 2025.
   Disponível em: <https://cookbook.openai.com/articles/gpt-oss/handle-raw-cot>.
   Acesso em: 06 fev. 2026.
6. JSON Schema. Draft 2020-12 Specification, 2022. Disponível em:
   <https://json-schema.org/draft/2020-12>. Acesso em: 06 fev. 2026.
7. MacIver, D. et al. Hypothesis (property-based testing for Python). Disponível
   em: <https://hypothesis.readthedocs.io/>. Acesso em: 06 fev. 2026.
8. python-jsonschema. hypothesis-jsonschema. Disponível em:
   <https://github.com/python-jsonschema/hypothesis-jsonschema>. Acesso em: 06
   fev. 2026.

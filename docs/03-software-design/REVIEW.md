# Revisão do KA 03: Software Design

**Data da Revisão:** 2026-02-07\
**Revisor:** @book-reviewer\
**Status:** Completo - Aguardando Correções\
**Total de Seções Revisadas:** 10

______________________________________________________________________

## Resumo Executivo da Revisão

O KA 03: Software Design está bem estruturado e cobre adequadamente a
transformação do design de software na era da IA. As 10 seções seguem uma
progressão lógica e mantêm consistência com a premissa central do SWEBOK-AI
("código = commodity, contexto = capital").

**Pontos Fortes Gerais:**

- Tom acadêmico/técnico consistente em PT-BR
- Exemplos práticos em Python são claros e aplicáveis
- Estrutura de arquivos segue as convenções do projeto
- Frontmatter completo em todas as seções
- Conexões entre seções são bem estabelecidas

**Problemas Críticos a Resolver:**

- Múltiplas referências citadas no texto não aparecem nas seções de referências
- Formatação incorreta em algumas admonitions (falta de quebra de linha)
- Referência [^2] (Khononov) citada no RESEARCH.md mas ausente nas seções

______________________________________________________________________

## Seção 1: Introdução ao Design de Software na Era da IA

**Arquivo:** `01-introducao-design-era-ia.md`

### Pontos Fortes

- Abertura impactante com a premissa central do SWEBOK-AI
- Transição fluida entre os três paradigmas emergentes (CHOP, Vibe Coding,
  Refinamento Iterativo)
- Tabela comparativa entre código tradicional e gerado por IA é clara e útil
- Admonition "Mudança de Mentalidade" reforça conceito-chave

### Sugestões de Melhoria

1. **Expandir exemplos práticos:** Adicionar exemplo concreto de código gerado
   via CHOP ou Vibe Coding para ilustrar o conceito
2. **Adicionar citação direta:** Incluir uma citação breve de Karpathy ou Yegge
   sobre Vibe Coding/CHOP
3. **Seção de implicações:** A seção 1.4 poderia ter subseções numeradas para
   melhor navegação

### Problemas Identificados

| Problema           | Severidade | Linha | Descrição                                                                                                                          |
| ------------------ | ---------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Referência ausente | **Alta**   | 58    | [^2] Khononov citado no RESEARCH.md mas não incluído nas referências desta seção (mencionado em "Modularity, Coupling e Cohesion") |
| Formatação         | Média      | 44-47 | Admonition "Mudança de Mentalidade" sem quebra de linha adequada entre `!!! info` e o texto                                        |
| Consistência       | Baixa      | 88-93 | Tabela poderia usar formatação consistente de bold para headers                                                                    |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100% - Todos os tópicos cobertos
- [x] Formatação Markdown: Pequenos ajustes necessários
- [x] Qualidade das referências: Verificar link [^1] GitHub
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Poderia ter mais
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 2: Princípios de Design Clássicos na Era da IA

**Arquivo:** `02-principios-design-classicos.md`

### Pontos Fortes

- Explicação clara de como cada princípio SOLID se aplica em contexto de IA
- Exemplos de código "problemático" vs "solução" são didáticos
- Seção sobre aplicação via Prompt Engineering é prática e acionável
- A inclusão de exemplos few-shot é particularmente valiosa

### Sugestões de Melhoria

1. **Adicionar diagrama:** Um diagrama ilustrando a estrutura de prompt para
   princípios (mencionada na síntese) tornaria o conceito mais visual
2. **Exemplo real de violação:** Mostrar um caso real onde código gerado por IA
   violou SRP e como foi corrigido
3. **Expandir LSP:** A seção sobre Liskov Substitution está muito breve
   comparada às outras

### Problemas Identificados

| Problema           | Severidade | Linha         | Descrição                                                                                       |
| ------------------ | ---------- | ------------- | ----------------------------------------------------------------------------------------------- |
| Referência ausente | **Alta**   | 201, 227, 230 | Referências [^10], [^11] citadas no RESEARCH.md mas ausentes nesta seção (YAGNI, TestingIL)     |
| Formatação         | Média      | 228           | Admonition "A Armadilha da Complexidade Gerada" sem quebra de linha adequada                    |
| Bloco de código    | Baixa      | 156-164       | Exemplo few-shot está dentro de markdown code block mas não está sendo renderizado corretamente |

### Verificação

- [x] Clareza e coerência: Muito boa
- [x] Precisão técnica: SOLID bem explicado
- [x] Completude vs plano: 95% - LSP poderia ser expandido
- [x] Formatação Markdown: Ajustes necessários em admonitions
- [x] Qualidade das referências: Adicionar [^10], [^11]
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Excelentes exemplos de código
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 3: Arquitetura vs Design em Contexto de IA

**Arquivo:** `03-arquitetura-vs-design.md`

### Pontos Fortes

- Diferenciação clara entre responsabilidades de arquitetura e design
- Tabela de estratégias de mitigação (Determinismo vs Probabilidade) é prática
- Diagrama ASCII de arquitetura com tiering de modelos é útil
- Citação do InfoQ sobre mudança nos produtos vs prática é relevante

### Sugestões de Melhoria

1. **Adicionar case study:** Um exemplo real de decisão arquitetural envolvendo
   IA seria valioso
2. **Expandir graceful degradation:** A seção de níveis de degradação merece um
   exemplo mais completo
3. **Cross-reference:** Referenciar KA 02 (Arquitetura) quando mencionar
   arquiteto

### Problemas Identificados

| Problema     | Severidade | Linha   | Descrição                                                       |
| ------------ | ---------- | ------- | --------------------------------------------------------------- |
| Formatação   | Média      | 68-69   | Admonition "Uma Distinção Prática" sem quebra de linha adequada |
| Consistência | Baixa      | 156-173 | Diagrama ASCII de tiering poderia ter alinhamento melhorado     |
| Referência   | Baixa      | 211     | "Competências Híbridas" - admonition sem formatação correta     |

### Verificação

- [x] Clareza e coerência: Excelente distinção conceitual
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: Ajustes menores em admonitions
- [x] Qualidade das referências: OK
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Bons exemplos de código
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 4: Padrões de Design Clássicos na Era da IA

**Arquivo:** `04-padroes-design-classicos.md`

### Pontos Fortes

- Excelente cobertura dos padrões GoF com aplicações modernas
- O conceito de "Agent Facade" é bem explicado com exemplo prático
- Diagrama de arquitetura em camadas com AI Orchestration Layer é claro
- Código Python é bem estruturado e comentado

### Sugestões de Melhoria

1. **Adicionar anti-patterns:** Mencionar padrões que NÃO devem ser usados com
   IA
2. **Expandir Command pattern:** Conectar mais explicitamente ao Tool Use
   pattern da seção seguinte
3. **Adicionar tabela resumo:** Uma tabela comparando quando usar cada categoria
   de padrão

### Problemas Identificados

| Problema             | Severidade | Linha | Descrição                                                                       |
| -------------------- | ---------- | ----- | ------------------------------------------------------------------------------- |
| Referência duplicada | Média      | 331   | [^14] aparece duas vezes na lista de referências                                |
| Consistência         | Baixa      | 14    | Título "GoF" - deveria ser "Gang of Four (GoF)" na primeira menção para clareza |
| Formatação           | Baixa      | 269   | Configuração YAML do circuit breaker - verificar indentação                     |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Padrões bem aplicados
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: OK
- [x] Qualidade das referências: Verificar duplicação [^14]
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Excelentes
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 5: Novos Padrões de Design para IA

**Arquivo:** `05-padroes-design-ia.md`

### Pontos Fortes

- Cobertura abrangente dos 32 padrões de Lakshmanan & Hapke
- Organização por categorias facilita navegação
- Exemplos de código para padrões chave (Guardrails, LLM-as-Judge, Tool Calling)
- Framework LLM Triangle Principles bem explicado

### Sugestões de Melhoria

1. **Visualização:** Um diagrama mostrando as 7 categorias seria útil
2. **Priorização:** Indicar quais padrões são mais críticos para iniciantes
3. **Casos de uso:** Adicionar exemplos de quando NÃO usar cada padrão

### Problemas Identificados

| Problema   | Severidade | Linha | Descrição                                                                           |
| ---------- | ---------- | ----- | ----------------------------------------------------------------------------------- |
| Formatação | Média      | 29-38 | Código de Logits Masking está incompleto (apenas estrutura, sem implementação real) |
| Referência | **Alta**   | 379   | Referência [^18] com barra invertida no final: `2025\.`                             |
| Referência | **Alta**   | 382   | Referência [^19] com barra invertida no final: `2024\.`                             |
| Ortografia | Baixa      | 22    | "forçando" com acento, mas contexto técnico aceita                                  |

### Verificação

- [x] Clareza e coerência: Excelente organização
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: Corrigir barras invertidas nas referências
- [x] Qualidade das referências: Corrigir [^18] e [^19]
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Bons exemplos
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 6: Design Patterns para Sistemas com IA

**Arquivo:** `06-design-patterns-sistemas-ia.md`

### Pontos Fortes

- Excelente cobertura dos três níveis de agentic patterns (Ng/Vellum)
- Padrões de colaboração multi-agent são explicados com diagramas ASCII claros
- Seção de resiliência é particularmente valiosa e prática
- Código do Circuit Breaker está completo e funcional

### Sugestões de Melhoria

1. **Adicionar métricas:** Incluir thresholds recomendados para circuit breaker
2. **Real-world example:** Adicionar exemplo de sistema real usando Router
   Pattern
3. **Expandir LLM Gateway:** O exemplo poderia incluir autenticação e rate
   limiting

### Problemas Identificados

| Problema   | Severidade | Linha   | Descrição                                                                                              |
| ---------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------ |
| Referência | **Alta**   | 608     | [^22] referencia "2026 Guide" mas arquivo diz "kimi-for-coding/k2p5" em 2026 - inconsistência temporal |
| Código     | Média      | 557-562 | `select_by_requirements` está incompleto (apenas `pass`)                                               |
| Diagrama   | Baixa      | 569-598 | Diagrama ASCII final poderia ser mais compacto                                                         |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: OK
- [x] Qualidade das referências: Verificar data [^22]
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Excelentes exemplos
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 7: Design Centrado em Contexto

**Arquivo:** `07-design-contexto.md`

### Pontos Fortes

- Excelente explicação do Context Engineering como disciplina
- Os seis pilares estão bem estruturados e exemplificados
- Tabela de componentes de contexto é clara e completa
- Patterns para context window (chunking, hierarchical, selective attention) são
  práticos

### Sugestões de Melhoria

1. **Adicionar números:** Incluir tamanhos típicos de contexto atualizados (até
   2M tokens do Gemini)
2. **Benchmarks:** Adicionar dados sobre eficácia de cada estratégia de contexto
3. **Expandir Selective Attention:** Este pattern é complexo e merece mais
   detalhes

### Problemas Identificados

| Problema     | Severidade | Linha   | Descrição                                                                                                    |
| ------------ | ---------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| Formatação   | Média      | 45-46   | Admonition "De Prompt para Contexto" sem quebra de linha adequada                                            |
| Consistência | Baixa      | 291     | "Chunking Estratégico" - manter consistência de capitalização (Chunking Estratégico vs Hierarchical Context) |
| Código       | Média      | 410-428 | `SelectiveAttention` assume que LLM retorna índices diretamente, mas na prática requer parsing               |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: Ajustar admonition
- [x] Qualidade das referências: OK
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Excelentes
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 8: Documentação de Design

**Arquivo:** `08-documentacao-design.md`

### Pontos Fortes

- Prompt Specification Docs é um template valioso e reutilizável
- Context Flow Diagrams são explicados com exemplo visual
- Estatísticas de uso (64%, 59%, 76%) adicionam credibilidade
- Seção de melhores práticas é acionável

### Sugestões de Melhoria

1. **Template YAML:** Adicionar validação do schema YAML para prompts
2. **Expandir Swimm:** Explicar melhor o conceito de "documentação viva"
3. **Adicionar exemplo real:** Incluir um exemplo de AI Contract Sheet de um
   sistema real

### Problemas Identificados

| Problema   | Severidade | Linha  | Descrição                                                                               |
| ---------- | ---------- | ------ | --------------------------------------------------------------------------------------- |
| Formatação | **Alta**   | 93-109 | Context Flow Diagram está com formatação quebrada - caracteres de formatação misturados |
| Diagrama   | Média      | 93-109 | Diagrama ASCII não está alinhado corretamente                                           |
| Referência | Média      | 348    | [^27], [^28], [^29] - verificar se todas as fontes têm URLs ou são relatórios privados  |

### Verificação

- [x] Clareza e coerência: Boa
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: **Corrigir diagrama ASCII**
- [x] Qualidade das referências: Verificar acessibilidade
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Bons templates
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 9: O Futuro do Designer de Software

**Arquivo:** `09-futuro-designer-software.md`

### Pontos Fortes

- Tabela comparativa "Antes vs Agora" é clara e impactante
- Cinco competências necessárias estão bem estruturadas
- Diagrama de arquitetura híbrida é útil
- Previsões são baseadas em dados (Snyk 2024)

### Sugestões de Melhoria

1. **Adicionar quotes:** Incluir citações de líderes de pensamento sobre o
   futuro
2. **Expandir gargalos:** A seção sobre complexidade de integração merece mais
   profundidade
3. **Adicionar seção:** Incluir "O que não vai mudar" para balancear

### Problemas Identificados

| Problema   | Severidade | Linha   | Descrição                                                                                 |
| ---------- | ---------- | ------- | ----------------------------------------------------------------------------------------- |
| Formatação | Média      | 58-60   | Admonition "O Paradoxo da Automação" sem quebra de linha adequada                         |
| Formatação | Média      | 381-384 | Admonition "Preparação para o Futuro" sem quebra de linha adequada e com numeração inline |
| Ortografia | Baixa      | 28      | "de" repetido: "investido em em:"                                                         |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: Corrigir admonitions
- [x] Qualidade das referências: OK
- [x] Tom acadêmico: Apropriado
- [x] Exemplos práticos: Boa arquitetura híbrida
- [x] Frontmatter: Completo

______________________________________________________________________

## Seção 10: Checklist e Templates

**Arquivo:** `10-checklist-templates.md`

### Pontos Fortes

- Checklists são abrangentes e organizados por categorias
- Template de documentação de componente é completo e profissional
- Checklist de revisão de código gerado por IA é prático
- Template de avaliação de modelo é estruturado

### Sugestões de Melhoria

1. **Adicionar exemplos preenchidos:** Incluir um exemplo real do template
   preenchido
2. **Exportar:** Mencionar que checklists podem ser convertidos para ferramentas
   (Notion, Trello)
3. **Priorização:** Indicar itens obrigatórios vs recomendados nos checklists

### Problemas Identificados

| Problema     | Severidade | Linha   | Descrição                                                                               |
| ------------ | ---------- | ------- | --------------------------------------------------------------------------------------- |
| Formatação   | Média      | 508-510 | Admonition "Personalização" sem quebra de linha adequada                                |
| Template     | Baixa      | 150-364 | Template Markdown contém blocos de código dentro de blocos - verificar renderização     |
| Consistência | Baixa      | 408     | Template de avaliação de modelo usa 4 backticks (\`\`\`\`) - verificar se é intencional |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Precisão técnica: Precisa
- [x] Completude vs plano: 100%
- [x] Formatação Markdown: Verificar nested code blocks
- [x] Qualidade das referências: N/A (não há referências nesta seção)
- [x] Tom acadêmico: Apropriado (mais prático, conforme esperado)
- [x] Exemplos práticos: Excelentes templates
- [x] Frontmatter: Completo

______________________________________________________________________

## Index.md

**Arquivo:** `index.md`

### Pontos Fortes

- Introdução clara e inspiradora
- Lista de aprendizados é específica e mensurável
- Estrutura de 10 seções bem apresentada
- Pré-requisitos e público-alvo bem definidos

### Sugestões de Melhoria

1. **Adicionar diagrama:** Um diagrama mostrando relação entre as 10 seções
2. **Expandir introdução:** Talvez uma citação sobre o futuro do design

### Problemas Identificados

| Problema     | Severidade | Linha | Descrição                                                                            |
| ------------ | ---------- | ----- | ------------------------------------------------------------------------------------ |
| Consistência | Baixa      | 8     | `ai_model: Claude-3.5-Sonnet` - diferente das seções que usam `kimi-for-coding/k2p5` |

### Verificação

- [x] Clareza e coerência: Excelente
- [x] Completude: Todas as seções listadas
- [x] Links: Todos os links para seções estão corretos
- [x] Frontmatter: Completo

______________________________________________________________________

## Verificação de Referências

### Referências Presentes no RESEARCH.md mas Ausentes nas Seções

| Ref   | Autor/Fonte                                               | Localização no RESEARCH | Seções que deveriam citar     |
| ----- | --------------------------------------------------------- | ----------------------- | ----------------------------- |
| [^2]  | Khononov, "Balancing Coupling"                            | Linha 28                | Seção 1 (mencionado no texto) |
| [^7]  | Microsoft, "Vibe Coding"                                  | Linha 49                | Seção 1 (cita vibe coding)    |
| [^10] | Retool, "6 software design best practices"                | Linha 98                | Seção 2 (YAGNI)               |
| [^11] | TestingIL, "AI Code Refactoring"                          | Linha 115               | Seção 4 (Builder)             |
| [^17] | Medium, "What did I learn from building LLM applications" | Linha 225               | Seção 5 (implicado)           |

### Referências com Problemas de Formatação

| Ref   | Seção                   | Problema                            |
| ----- | ----------------------- | ----------------------------------- |
| [^18] | 05-padroes-design-ia.md | `2025\.` - barra invertida no final |
| [^19] | 05-padroes-design-ia.md | `2024\.` - barra invertida no final |

______________________________________________________________________

## Recomendações para a Próxima Fase (Escrita)

### Prioridade 1 (Crítico)

1. **Corrigir todas as admonitions** - adicionar quebra de linha após
   `!!! tipo "Título"`
2. **Adicionar referências ausentes** - incluir [^2], [^7], [^10], [^11], [^17]
   nas seções apropriadas
3. **Corrigir referências [^18] e [^19]** - remover barras invertidas
4. **Corrigir diagrama ASCII** na Seção 8 (linhas 93-109)

### Prioridade 2 (Importante)

5. Verificar consistência do `ai_model` no frontmatter (index.md vs seções)
6. Completar código incompleto em `select_by_requirements` (Seção 6)
7. Melhorar alinhamento de diagramas ASCII
8. Verificar se exemplo few-shot na Seção 2 está renderizando corretamente

### Prioridade 3 (Melhorias)

09. Adicionar mais exemplos práticos onde indicado
10. Expandir seções breves (LSP na Seção 2)
11. Adicionar diagramas visuais para complementar ASCII
12. Revisar consistência de capitalização em títulos

______________________________________________________________________

## Validação de Referências via Exa

As seguintes referências foram validadas e estão corretas:

- [^1] GitHub Survey (2024) - URL válida e acessível
- [^13] Lakshmanan & Hapke (O'Reilly, 2024) - Publicação válida
- [^15] InfoQ (2024) - Publicação válida
- [^16] iSAQB (2025) - Fonte válida
- [^21] Ng (2024) - Snowflake BUILD - Evento válido
- [^24] Intellectronica (2025) - Fonte válida
- [^25] Weaviate (2025) - Fonte válida

**Nota:** Referências sem URL específica (como [^2] Khononov) são
livros/publicações que devem ser verificadas via ISBN ou bibliografia acadêmica.

______________________________________________________________________

## Conclusão

O KA 03: Software Design está em excelente estado para uma revisão draft. O
conteúdo é abrangente, bem estruturado e alinhado com a premissa central do
SWEBOK-AI. Os problemas identificados são principalmente de formatação
(admonitions, referências) e não de conteúdo.

**Estimativa de esforço para correções:** 2-3 horas

**Recomendação:** Após correções das prioridades 1 e 2, o KA estará pronto para
marcação como "in-progress" e revisão final.

______________________________________________________________________

*Revisão completada em: 2026-02-07*\
*Próxima ação: @book-writer corrige problemas identificados*

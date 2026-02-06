---
title: Fundamentos de Orquestração e Curadoria
created_at: '2025-01-31'
tags: [software-construction, orquestracao, curadoria, fundamentos, ia]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Fundamentos de Orquestração e Curadoria de Código

A construção de software mudou de forma estrutural: a geração de código
tornou-se amplamente automatizada, enquanto a responsabilidade por contexto,
integração e qualidade permanece humana. Em vez de maximizar linhas produzidas,
equipes de alta performance maximizam a confiabilidade das decisões técnicas.
Nesse cenário, o valor migra da digitação para a orquestração de contexto e para
a curadoria rigorosa dos artefatos gerados.

## O Novo Papel: De Executor a Editor-Chefe

O paradigma atual é editorial: o engenheiro atua como responsável técnico pelas
decisões, enquanto os LLMs operam como assistentes de alta velocidade, porém com
limitações de contexto, consistência e julgamento situacional.

A adoção de IA já é ampla: 82% dos desenvolvedores usam ferramentas de IA diária
ou semanalmente (Qodo, 2025). Entretanto, a confiança ainda é limitada: no Stack
Overflow Developer Survey 2024, 76% afirmam usar ou planejar usar IA, mas apenas
43% confiam na precisão das respostas (Stack Overflow, 2024). Produtividade e
governança, portanto, precisam evoluir em conjunto.

### Orquestração: Definindo o Palco

Orquestrar é a engenharia de *input*. É a arte de preparar o contexto, as
restrições e a arquitetura antes de permitir que o modelo gere uma única linha.

- **Contexto é Rei:** Um modelo sem contexto gera código genérico. Um modelo
  alimentado com suas interfaces, DTOs e regras de negócio gera componentes
  integráveis.
- **Decomposição Estratégica:** Não peça "um sistema de login". Peça a interface
  de persistência, depois a implementação do repositório, depois o serviço de
  domínio. Mantenha o escopo de geração pequeno e verificável.

### Curadoria: O Filtro de Qualidade

Curadoria é a engenharia de *output*. É a disciplina de assumir responsabilidade
legal e técnica por código que você não escreveu.

- **Ceticismo Padrão:** Trate todo código gerado como suspeito ("Zero Trust
  Code").
- **Verificação em Camadas:** Sintaxe (linter), Semântica (testes) e Intenção
  (revisão humana).
- **Trade-off Econômico:** O tempo economizado na digitação deve ser reinvestido
  na verificação. Se você gasta menos tempo revisando do que gastaria
  escrevendo, provavelmente está deixando bugs passarem.

## Checklist Prático: O Que Fazer Amanhã

1. **Imponha Limites de Contexto:** Antes de gerar código, forneça
   explicitamente as interfaces e tipos de dados que a IA deve respeitar.
2. **Valide a Origem:** Nunca aceite código que use bibliotecas que você não
   conhece. Verifique se o pacote existe e é seguro (evite *dependency
   hallucination*).
3. **Segregue a Geração:** Gere a implementação e os testes em passos separados,
   preferencialmente com prompts ou sessões distintas, para evitar testes
   viciados.
4. **Audite a Lógica, Não a Sintaxe:** Configure seu IDE para formatar
   automaticamente. Gaste sua energia cognitiva verificando se a lógica de
   negócios atende aos requisitos.
5. **Documente a Intenção Técnica:** Para lógicas complexas, registre decisão,
   premissas e critérios de aceitação no PR, ADR ou documentação do módulo;
   evite expor prompts sensíveis diretamente no código-fonte.
6. **Recuse Saídas de Baixa Qualidade:** Quando o resultado estiver
   inconsistente com requisitos e padrões, refine contexto e restrições e
   regenere. Evite incorporar código apenas porque foi produzido rapidamente.

## Armadilhas Comuns (Anti-Patterns)

- **O Piloto Automático Cego:** Aceitar sugestões de autocomplete (tab-tab-tab)
  sem ler a linha inteira. Isso introduz bugs sutis de lógica.
- **Contexto Infinito:** Colar todo o codebase no prompt. Isso confunde o modelo
  e dilui as instruções importantes.
- **Review Decorativo:** Passar o olho pelo código gerado apenas para ver se
  "parece certo". Código de IA sempre *parece* certo, mesmo quando está
  alucinando.
- **Falso Senior:** Delegar decisões de arquitetura para a IA. O modelo é
  tático, não estratégico. Ele resolve a função, mas quebra o sistema.

## Exemplo Mínimo: Curadoria de uma Função SQL

**Cenário:** Otimizar uma query lenta.

**Abordagem Ingênua (Errada):**

- *Prompt:* "Melhore essa query."
- *Resultado IA:* Reescreve tudo usando funções específicas do PostgreSQL 16,
  mas seu banco é MySQL 5.7. O código quebra em produção.

**Abordagem SWEBOK-AI (Correta):**

- *Prompt (Orquestração):* "Atue como especialista em MySQL 5.7. Analise esta
  query `SELECT * ...`. Proponha índices para otimizar o `WHERE` e reescreva a
  query para evitar *full table scan*, mantendo compatibilidade com a versão
  5.7."
- *Curadoria:* O engenheiro lê o `EXPLAIN` proposto pela IA, verifica se os
  índices sugeridos fazem sentido com a cardinalidade dos dados e aplica a
  mudança em staging primeiro.

## Resumo Executivo

- **Geração é Infraestrutura:** O código virou commodity. Seu valor está na
  capacidade de filtrar e integrar o que é útil.
- **Qualidade vs. Velocidade:** A IA aumenta a velocidade de produção, mas exige
  processos de verificação mais robustos para manter a qualidade.
- **Responsabilidade Intransferível:** A culpa de um bug em produção é sempre do
  engenheiro que fez o commit, nunca do modelo que gerou o código.
- **Curadoria Ativa:** Revisar código de IA exige mais atenção do que revisar
  código humano, pois os erros são mais sutis e confiantes.
- **Contexto é Controle:** Quem controla o contexto fornecido ao modelo controla
  a qualidade da saída.

## Próximos Passos

- Ler a **Seção 02 deste KA (Pipeline de Verificação e Integração)** para
  automatizar barreiras contra regressões.
- Consultar a **Seção 06 deste KA (Ferramentas e Tecnologias)** para selecionar
  a stack de orquestração e curadoria.
- Revisar suas configurações de linter para serem implacáveis com estilo,
  liberando você para focar na lógica.

## Ver também

- [KA 03 - Design de Sistemas Híbridos](../03-software-design/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 06 - Operações de Engenharia](../06-software-engineering-operations/index.md)

## Referências

1. Qodo. *2025 State of AI Code Quality*. 2025. Disponível em:
   <https://www.qodo.ai/reports/state-of-ai-code-quality/>. Acesso em: 6 fev.
   2026\.
2. Stack Overflow. *AI | 2024 Developer Survey*. 2024. Disponível em:
   <https://survey.stackoverflow.co/2024/ai/>. Acesso em: 6 fev. 2026.
3. Stack Overflow. *Stack Overflow's 2024 Developer Survey Shows the Gap Between
   AI Use and Trust*. 2024. Disponível em:
   <https://stackoverflow.co/company/press/archive/stack-overflow-2024-developer-survey-gap-between-ai-use-trust/>.
   Acesso em: 6 fev. 2026.

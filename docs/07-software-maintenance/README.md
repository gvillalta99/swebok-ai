# Capítulo 7: Manutenção de Sistemas Opaços

## Visão Geral

O Capítulo 7 do SWEBOK-AI v5.0 redefine **Software Maintenance** para a era dos
Large Language Models. Enquanto o SWEBOK v4.0 focava em manutenção de código
legado escrito por humanos, a versão 5.0 reconhece que **a manutenção agora
envolve predominantemente sistemas opacos - código gerado por IA sem
documentação de raciocínio, sem histórico de decisões e frequentemente sem
compreensão profunda por parte dos mantenedores**.

## Estrutura do Capítulo

### Seção 1: Fundamentos

**Arquivo:** `01-fundamentos-de-manutencao-de-sistemas-opacos.md`

- Natureza da opacidade (intencional vs. incidental)
- Arqueologia digital e recuperação de intenção
- Checklist de diagnóstico

### Seção 2: Engenharia Reversa

**Arquivo:** `02-engenharia-reversa-de-codigo-gerado-por-ia.md`

- Análise estática assistida
- Testes de caracterização (Golden Master)
- Geração de documentação ex-post-facto

### Seção 3: Refatoração e Modernização

**Arquivo:** `03-refatoracao-e-modernizacao-assistida.md`

- Refatoração assistida por IA
- Verificação de equivalência (Testes diferenciais)
- Estratégias de migração entre modelos

### Seção 4: Gestão da Dívida Técnica

**Arquivo:** `04-gestao-de-divida-tecnica-em-sistemas-com-ia.md`

- Dívida técnica específica de IA (Prompt Debt, Code Smells)
- Métricas (Churn Rate, Duplicação)
- Estratégias de pagamento (Shift Left, Bankruptcy)

### Seção 5: Evolução e Migração

**Arquivo:** `05-evolucao-e-migracao-de-sistemas-legados.md`

- Versionamento semântico de prompts
- Gestão de dependências de modelos
- Migração de embeddings

### Seção 6: Ferramentas Modernas

**Arquivo:** `06-ferramentas-e-tecnicas-modernas.md`

- Ferramentas de análise estática e observabilidade
- Captura de contexto e proveniência
- Living Documentation

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                      |
| :------------------------------ | :------------------------------------------------------- | :--------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Baixa** — Manutenção é eterna.               |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Muito Alto** — Risco de regressão invisível. |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítica** — Mantenedor assume o risco.       |

## Referências Principais

Consulte as referências individuais em cada arquivo de seção para a bibliografia
completa e atualizada (2024-2025).

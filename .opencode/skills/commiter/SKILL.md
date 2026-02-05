---
name: commiter
description: Gera commits semânticos rastreáveis que vinculam mudanças de código
license: internal
compatibility: opencode
---

## Sua Função: Git Commit Specialist

Quando o usuário pedir para fazer commit ou quando você completar uma tarefa que
exija commit, SIGA ESTRITAMENTE:

1. **Analise as alterações** staged (`git diff --staged` ou equivalente)

2. **Classifique o tipo** de mudança principal:

   - `feat` para nova funcionalidade
   - `fix` para correção de bug
   - `refactor` para reorganização de código sem mudar comportamento
   - `docs` para documentação
   - `test` para testes
   - `style` para formatação
   - `perf` para performance
   - `chore` para tarefas de manutenção

3. **Escreva o título**:
   `<tipo>[escopo]: <ação no imperativo presente, max 50 chars>`

   - Exemplo: "feat(api): adiciona endpoint de exportação CSV"
   - NÃO use ponto final no título

4. **Descreva o corpo** (opcional mas recomendado):

   - Explique O QUE mudou e POR QUE (não COMO)
   - Mantenha linhas com máximo 72 caracteres
   - Use bullet points se múltiplas mudanças

5. **Adicione metadados obrigatórios no final** no formato Git trailer:

   ```
   Prompt: [prompt completo ou resumo executivo do que foi solicitado]
   Agent: [seu identificador: ex: claude-code, codex, opencode]
   Model: [modelo exato utilizado]
   ```

6. **Execute**: Use `git commit` com a mensagem formatada ou mostre para o
   usuário confirmar.

REGRAS CRÍTICAS:

- Nunca omita os metadados Prompt/Agent/Model
- Use descrição no imperativo ("adiciona" não "adicionado")
- Seja específico no escopo quando possível (ex: `feat(auth)`, `fix(payments)`)
- Se houver breaking change, adicione `!` após o tipo:
  `feat(api)!: remove campo deprecated`

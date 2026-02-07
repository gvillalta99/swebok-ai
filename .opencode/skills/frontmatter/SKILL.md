---
name: frontmatter
description: Manter o frontmatter
license: internal
compatibility: opencode
---

## Sua Função: Manter o frontmatter atualizado

```yaml
---
title: <TITULO DA SESSAO>
created_at: <DATA DE CRIACAO DO ARQUIVO>
tags: [<TAG1>, <TAG2>, ...]
status: <STATUS>
updated_at: <DATA DE HOJE>
ai_model: <MODELO DE IA>
agent: <QUAL AGENTE ESTA ESCREVENDO/EDITANDO>
<EXTRAS>
---
```

Caso o arquivo não seja markdown, não use essa skill.
Caso não exista o frontmatter, escreva ele.
Caso ele exista, valide que ele tem o formato acima.
O frontmatter pode ter campos extras.
O frontmatter deve ser atualizado sempre que um arquivo é modificado.
O STATUS possiveis são: draft, review, published.

---
title: Gestão de Stakeholders e Comunicação
created_at: '2026-01-31'
tags: [stakeholders, comunicacao, expectativas, transparencia, ia]
status: draft
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# 5. Gestao de Stakeholders e Comunicacao

## Visão Geral

Em projetos com IA, a velocidade de geracao pode criar uma ilusao de progresso.
Se a comunicacao focar apenas em “o que foi gerado”, stakeholders superestimam
previsibilidade, subestimam risco e pressionam por escopo. O efeito pratico e
atraso, retrabalho e conflito.

Esta secao oferece um kit de comunicacao reader-first: como alinhar
expectativas, como reportar progresso com foco em verificacao e como negociar
trade-offs de forma auditavel.

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. Explicar a stakeholders por que verificacao e o gargalo em sistemas com IA.
2. Reportar progresso distinguindo “gerado”, “verificado” e “aprovado”.
3. Negociar escopo com base em capacidade de verificacao.
4. Comunicar riscos e decisoes sem depender de promessas quantitativas.
5. Definir um acordo minimo de governanca e transparencia.

## 5.1 Alinhamento de Expectativas

Mensagem operacional:

- IA acelera geracao; entrega continua dependente de verificacao e integracao.
- qualidade e uma obrigacao (especialmente em dominios sensiveis).
- autonomia e escolha de risco, nao “modo padrao”.

## 5.2 Relatorio de Progresso com Foco em Evidencias

Evite relatorios baseados em volume. Prefira um quadro simples:

- backlog total,
- itens em verificacao,
- itens aprovados,
- defeitos encontrados e acoes corretivas.

Template (minimo):

```text
Status: verde|amarelo|vermelho
Gerado: <n> itens
Em verificacao: <n> itens
Aprovado: <n> itens
Principais riscos: <lista curta>
Decisoes da semana: <lista curta>
```

## 5.3 Negociacao de Escopo

Use uma regra de triagem:

| Valor | Custo de verificacao | Decisao              |
| ----- | -------------------- | -------------------- |
| Alto  | Baixo                | Incluir              |
| Alto  | Alto                 | Replanejar e incluir |
| Baixo | Alto                 | Deferir/rejeitar     |

Exija que trade-offs sejam registrados: o que foi reduzido (testes, cobertura de
casos, gates) e qual mitigação compensatória foi aceita.

## 5.4 Transparencia sobre Uso de IA

Transparencia nao e “listar ferramentas”; e explicitar politicas:

- onde IA pode atuar com autonomia,
- onde aprovacao humana e obrigatoria,
- como evidencias sao registradas,
- como incidentes sao investigados (reproducao/auditoria).

## Considerações Práticas

### Checklist de Comunicacao

1. Defina termos: gerado vs. verificado vs. aprovado.
2. Mostre capacidade de verificacao como restricao.
3. Documente decisoes de trade-off e seus riscos.
4. Mantenha um canal de escalonamento para mudancas de criticidade.

### Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação |
| ------------------------------- | -------------------------------------------------------- | --------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | Baixa     |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | Alto      |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | Moderada  |

## Resumo

- Comunicacao eficaz com IA precisa expor verificacao, risco e evidencias.
- Relatorios devem medir itens aprovados, nao apenas gerados.
- Negociacao de escopo deve tratar verificacao como recurso finito.
- Transparencia e politica e trilha de auditoria, nao lista de ferramentas.

## Referências

1. PMI. A Guide to the Project Management Body of Knowledge (PMBOK Guide). 7.
   ed. Newtown Square: Project Management Institute, 2021.
2. Forsgren, N.; Humble, J.; Kim, G. Accelerate: The Science of Lean Software
   and DevOps. Portland: IT Revolution Press, 2018.

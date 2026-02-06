---
title: Qualidade de Código Gerado por LLMs
created_at: '2026-01-31'
tags: [software-quality, llm, code-quality, code-smells, analise-estatica, metricas]
status: in-progress
updated_at: '2026-01-31'
ai_model: openai/gpt-5.2
---

# Qualidade de Código em LLMs

A geração de código por IA transformou a escassez de sintaxe em abundância de
lógica probabilística. O problema não é mais "como escrever", mas "como garantir
que o que foi escrito funciona e é seguro". Código gerado por LLMs é
frequentemente plausível, sintaticamente correto, mas semanticamente desastroso.
Adotamos aqui a filosofia de **"Culpado até que se prove inocente"**: todo bloco
de código sintético deve ser tratado como um vetor de risco até passar por
validação rigorosa.

## 1. O Paradigma da Desconfiança (Zero Trust Code)

Engenharia de Software tradicional foca em gerenciar complexidade humana.
Engenharia com IA foca em mitigar alucinação estocástica. O código humano falha
por erro de lógica ou cansaço; o código de IA falha porque o padrão
probabilístico mais comum na internet pode ser inseguro, obsoleto ou
simplesmente errado para o seu contexto específico.

A mudança fundamental é econômica: o custo de produção de código caiu para zero,
mas o **custo de verificação** subiu exponencialmente. Se sua equipe faz "LGTM"
(Looks Good To Me) em PRs gerados por IA sem ler linha por linha, você está
acumulando dívida técnica tóxica.

### Diferenças Fundamentais de Risco

| Característica     | Código Humano                                       | Código LLM                                                                 |
| :----------------- | :-------------------------------------------------- | :------------------------------------------------------------------------- |
| **Origem do Erro** | Falha de lógica, typo, má compreensão do requisito. | Alucinação, mistura de contextos, bibliotecas inexistentes.                |
| **Estilo**         | Tende a ser consistente com o autor.                | Tende a ser "médio", verboso ou inconsistente entre arquivos.              |
| **Segurança**      | Erros conhecidos (OWASP Top 10).                    | Inventa dependências, usa protocolos inseguros se o prompt for vago.       |
| **Verificação**    | Code Review foca em design e lógica.                | Code Review deve focar em **existência** (de libs/métodos) e **intenção**. |

## 2. Métricas de Qualidade para a Era Sintética

Esqueça a complexidade ciclomática isolada. Para código sintético, precisamos
medir o risco de integridade e manutenção.

### 2.1 Hallucination Rate (Taxa de Alucinação)

Mede a frequência com que o modelo inventa chamadas de função, parâmetros ou
bibliotecas que não existem.

- **Como medir:** Execução em sandbox (CI) + Análise estática de imports.
- **Alvo:** 0%. Uma única alucinação invalida o trecho.
- **Sintoma:**
  `AttributeError: module 'pandas' has no attribute 'read_super_csv'`.

### 2.2 Security Density (Densidade de Segurança)

Número de vulnerabilidades ou práticas inseguras por 1.000 linhas de código
(KLOC).

- **Por que importa:** LLMs treinaram em código antigo e vulnerável. Eles "amam"
  `eval()`, SQL sem parâmetros e chaves hardcoded.
- **Ação:** Scanners de segurança (SAST) devem rodar *antes* do humano olhar o
  código.

### 2.3 Maintainability Index (Índice de Manutenibilidade)

Código de IA tende a ser verboso ("boilerplate generator").

- **Sinal de Alerta:** Se o PR adiciona 500 linhas para uma tarefa de 50, o
  índice de manutenibilidade despencou.
- **Regra de Ouro:** Código gerado deve ser tão conciso quanto o código que um
  sênior escreveria. Se for mais longo, é lixo.

## 3. Anatomia dos Defeitos Sintéticos

Identificar código ruim de IA exige um "olho treinado" para novos padrões de
erro.

### O "Confident Hallucination"

O código parece perfeito. As variáveis têm nomes bons, a indentação é ótima, os
comentários são úteis. Mas a função `utils.validate_email_strict()` não existe
na biblioteca importada.

- **Mitigação:** Nunca confie na leitura estática. O código *precisa*
  compilar/rodar em ambiente isolado.

### O "Context Drift"

O modelo começa escrevendo em Python moderno (3.12+) e, no meio da função, usa
um padrão de Python 2.7 ou muda a convenção de `snake_case` para `camelCase`.

- **Mitigação:** Linters rigorosos (Ruff, ESLint) com autofix desabilitado para
  forçar o desenvolvedor a revisar.

### O "Dependency Bloat"

Para resolver um problema simples (ex: formatar data), o LLM importa três
bibliotecas pesadas (`dateutil`, `pytz`, `arrow`) em vez de usar a `datetime`
nativa.

- **Mitigação:** Revisão de dependências. Pergunte: "Podemos fazer isso com a
  stdlib?"

## 4. Checklist Prático: Blindando o Repositório

O que implementar amanhã para proteger sua base de código:

1. **CI como Juiz Supremo:** Nada entra na `main` sem passar por build e testes
   automatizados. Código de IA que não roda é spam.
2. **Bloqueio de Dependências:** Configure o CI para falhar se novos pacotes
   forem adicionados sem aprovação explícita (evita *typosquatting* e bloat).
3. **Linter Paranoico:** Ative regras de "unused imports", "undefined variables"
   e "complexity" no nível máximo.
4. **Regra dos Comentários:** Exija que o desenvolvedor remova comentários
   óbvios gerados pela IA (ex: `# define função x`). Comentários devem explicar
   o *porquê*, não o *o quê*.
5. **Testes Gerados vs. Código Gerado:** Nunca aceite testes gerados na mesma
   sessão do código. O modelo cometerá o mesmo erro lógico em ambos e o teste
   passará (falso positivo).
6. **Isolamento de Contexto:** Se usar RAG para codar, limite o contexto aos
   arquivos relevantes para evitar contaminação de padrões antigos.

## 5. Armadilhas Comuns (O que não fazer)

- **Acreditar no "Self-Healing":** Achar que pedir para o agente "corrigir o
  erro" vai resolver magicamente. Muitas vezes ele entra em loop de correções
  erradas.
- **Review Visual Apenas:** Aprovar PRs no celular ou olhando apenas o diff
  visual. Código de IA exige execução.
- **Ignorar a Economia:** Deixar a IA gerar 5.000 linhas de boilerplate que
  agora você tem que manter. Se a IA gerou, você é o dono da dívida técnica.
- **Júnior sem Supervisão:** Deixar juniores cometerem código 100% gerado sem
  entender o funcionamento. Isso cria uma "caixa preta" dentro do próprio time.

## 6. Exemplo Mínimo: A Ilusão da Correção

**Cenário:** Precisamos validar um URL em Python.

**Código Gerado (Parece bom):**

```python
import validators  # Biblioteca externa (risco de supply chain)

def is_valid_url(url):
    # Parece robusto, mas adiciona dependência desnecessária
    if validators.url(url):
        return True
    return False
```

**Problema:** Adicionamos uma dependência externa (`validators`) para algo
trivial, aumentando a superfície de ataque e o tamanho do build. Além disso, se
a lib não estiver no `requirements.txt`, o código quebra em produção.

**Abordagem Pragmática (Refatorado):**

```python
from urllib.parse import urlparse

def is_valid_url(url: str) -> bool:
    # Uso da stdlib: zero dependências extras, comportamento previsível
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False
```

**Decisão:** Rejeitar a primeira versão. Priorizar stdlib e simplicidade. O
trade-off é escrever mais 3 linhas para economizar megabytes e riscos de
segurança.

## 7. Resumo Executivo

- **Confiança Zero:** Código de IA é culpado até que testes provem o contrário.
- **Foco na Verificação:** O gargalo da engenharia mudou de *escrita* para
  *revisão e validação*.
- **Métricas de Risco:** Monitore alucinações e densidade de segurança, não
  apenas cobertura de testes.
- **Higiene de Dependências:** LLMs adoram importar o mundo. Corte
  impiedosamente dependências inúteis.
- **Responsabilidade Humana:** O autor do commit é 100% responsável pelo código,
  não a ferramenta que o gerou.

## 8. Próximos Passos

- [ ] Instalar ferramentas de SAST (Static Application Security Testing) no
  pipeline de CI.
- [ ] Criar um guia de "Code Review para IA" para o time, focando em detectar
  alucinações.
- [ ] Estabelecer limite de complexidade para PRs (ex: máximo 200 linhas) para
  garantir revisão humana eficaz.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                                            |
| :------------------------------ | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses?                    | **Média** — Ferramentas melhorarão, mas o julgamento de qualidade permanecerá essencial.             |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Exige execução, testes e leitura atenta.                                                  |
| **Responsabilidade Legal**      | Quem é culpado se falhar?                                | **Crítica** — A empresa responde por falhas de segurança, independente se foi o GPT ou o estagiário. |

## Referências

1. **OWASP Top 10 for LLM Applications**. Open Web Application Security Project,
   2025\.
2. **Google Engineering Practices Documentation**. "Code Review Developer
   Guide".
3. **SWEBOK v4**. IEEE Computer Society. (Base para métricas tradicionais).
4. **"Thephish"**. *Security risks in AI generated code*. USENIX Security
   Symposium, 2024.

# PLAN - Correcao Estrutural do Livro SWEBOK-AI v5.0

## Objetivo

Resolver problemas estruturais do livro (arquitetura de informacao, consistencia editorial, referencias cruzadas, frontmatter e governanca) com um plano priorizado e executavel em sprints curtos.

## Escopo

- Repositorio inteiro, com foco em `docs/` e `mkdocs.yml`
- KAs `01` a `15` e `16-appendix`
- Itens de governanca editorial e qualidade antes de merge

## Diagnostico Estrutural

1. Arquitetura de entrada dos KAs desigual (alguns com `index.md`, outros sem landing consistente).
2. Divergencia entre taxonomia/narrativa de apendices e navegacao real em `mkdocs.yml`.
3. Cross-reference pouco operacional (matriz existe, mas nao vira links consistentes nos capitulos).
4. Frontmatter fora do padrao (ex.: uso de `status: review` fora do vocabulario canonico).
5. Inconsistencia de idioma editorial (headings mistos PT-BR/EN).
6. Referencias bibliograficas com rastreabilidade desigual (falta DOI/URL em parte dos casos).
7. Redundancia entre `docs/index.md` e `docs/README.md` como fontes de verdade concorrentes.
8. Ausencia de enforcement automatizado de regras editoriais no fluxo de PR.

## Plano de Correcao (priorizado)

### P1 - Normalizar frontmatter e status

- Problema: metadados heterogeneos e status invalido.
- Solucao: migracao em lote para vocabulario canonico e validacao de campos obrigatorios.
- Impacto: alto
- Esforco: medio
- Dependencias: `docs/16-appendix/09-frontmatter-workflow-status.md`
- Criterio de aceite: zero ocorrencias de `status: review`; todos os arquivos ativos com campos obrigatorios.

### P2 - Padronizar landing pages dos KAs

- Problema: onboarding/navegacao inconsistente por KA.
- Solucao: adotar `index.md` por KA e alinhar `mkdocs.yml`.
- Impacto: alto
- Esforco: medio-alto
- Dependencias: `docs/16-appendix/08-template-landing-page-ka.md`
- Criterio de aceite: todos os KAs 01-15 com pagina de visao geral no menu.

### P3 - Operacionalizar referencias cruzadas

- Problema: matriz nao convertida em navegacao contextual nos capitulos.
- Solucao: inserir bloco "Ver tambem" com 2-4 links internos por capitulo.
- Impacto: alto
- Esforco: medio
- Dependencias: `docs/16-appendix/06-matriz-referencias-cruzadas.md`
- Criterio de aceite: 100% dos capitulos principais com links internos funcionais.

### P4 - Consolidar taxonomia e narrativa canonicas

- Problema: contradicoes entre estrutura editorial e navegacao.
- Solucao: reconciliar `mkdocs.yml`, `docs/index.md` e apendices estruturais.
- Impacto: alto
- Esforco: medio
- Dependencias: `mkdocs.yml`, `docs/index.md`, `docs/16-appendix/07-taxonomia-editorial-kas.md`
- Criterio de aceite: classificacao consistente em todos os documentos de arquitetura editorial.

### P5 - Padronizar idioma e headings editoriais

- Problema: mistura PT-BR/EN em headings e secoes.
- Solucao: mapear headings canonicos e aplicar padrao PT-BR.
- Impacto: medio-alto
- Esforco: medio
- Dependencias: `AGENTS.md`
- Criterio de aceite: headings editoriais padronizados em PT-BR no conteudo ativo.

### P6 - Sanear referencias bibliograficas

- Problema: fontes sem evidencia rastreavel.
- Solucao: revisar por KA, adicionar DOI/URL e remover/rotular itens frageis.
- Impacto: alto
- Esforco: medio-alto
- Dependencias: `docs/16-appendix/03-referencias-consolidadas.md`
- Criterio de aceite: referencias criticas com DOI/URL verificavel.

### P7 - Definir fonte de verdade de home editorial

- Problema: duplicacao de papel entre `docs/index.md` e `docs/README.md`.
- Solucao: manter `docs/index.md` como home publica e `docs/README.md` como guia interno.
- Impacto: medio
- Esforco: baixo-medio
- Dependencias: `mkdocs.yml`
- Criterio de aceite: papeis explicitos, sem sobreposicao narrativa.

### P8 - Implantar controle de qualidade editorial continuo

- Problema: regras editoriais sem enforcement tecnico.
- Solucao: validar frontmatter, links e referencias minimas no CI de PR.
- Impacto: alto
- Esforco: medio
- Dependencias: `docs/16-appendix/09-frontmatter-workflow-status.md`
- Criterio de aceite: PR invalido falha automaticamente com relatorio objetivo.

## Backlog de Tarefas (1 por solucao)

### BR-001 - Migracao de status e metadados canonicos

- Objetivo: eliminar status invalido e normalizar frontmatter.
- Passos:
  1. Levantar arquivos com `status: review`.
  2. Converter para `in-progress` ou `published` conforme estado real.
  3. Validar campos obrigatorios (`title`, `created_at`, `tags`, `status`, `updated_at`, `ai_model`).
- Arquivos alvo:
  - `docs/02-software-architecture/*.md`
  - `docs/05-software-testing/*.md`
  - `docs/07-software-maintenance/*.md`
  - `docs/10-software-engineering-process/*.md`
  - `docs/14-software-engineering-professional-practice/*.md`
  - `docs/16-appendix/*.md`
- Responsavel sugerido: `book-reviewer`
- Prioridade: alta
- Estimativa: M
- Definicao de pronto: nenhuma ocorrencia de `status: review` em `docs/`.

### BR-002 - Padronizar landing pages dos KAs 01-15

- Objetivo: uniformizar entrada de cada KA.
- Passos:
  1. Criar/adequar `index.md` por KA com template oficial.
  2. Revisar links internos de cada landing.
  3. Atualizar `mkdocs.yml` para apontar para os indices.
- Arquivos alvo:
  - `docs/01-software-requirements/`
  - `docs/02-software-architecture/`
  - `docs/03-software-design/`
  - `docs/04-software-construction/`
  - `docs/05-software-testing/`
  - `docs/06-software-engineering-operations/`
  - `docs/07-software-maintenance/`
  - `docs/08-software-configuration-management/`
  - `docs/09-software-engineering-management/`
  - `docs/10-software-engineering-process/`
  - `docs/11-software-engineering-models-and-methods/`
  - `docs/12-software-quality/`
  - `docs/13-software-security/`
  - `docs/14-software-engineering-professional-practice/`
  - `docs/15-software-engineering-economics/`
  - `mkdocs.yml`
- Responsavel sugerido: `book-writer`
- Prioridade: alta
- Estimativa: G
- Definicao de pronto: menu inicia cada KA por pagina de visao geral.

### BR-003 - Inserir bloco "Ver tambem" em capitulos

- Objetivo: transformar matriz em navegacao contextual.
- Passos:
  1. Definir template padrao de bloco.
  2. Mapear 2-4 links por capitulo com base na matriz.
  3. Inserir e validar links.
- Arquivos alvo:
  - `docs/01-software-requirements/*.md`
  - `docs/02-software-architecture/*.md`
  - `docs/03-software-design/*.md`
  - `docs/04-software-construction/*.md`
  - `docs/05-software-testing/*.md`
  - `docs/06-software-engineering-operations/*.md`
  - `docs/07-software-maintenance/*.md`
  - `docs/08-software-configuration-management/*.md`
  - `docs/09-software-engineering-management/*.md`
  - `docs/10-software-engineering-process/*.md`
  - `docs/11-software-engineering-models-and-methods/*.md`
  - `docs/12-software-quality/*.md`
  - `docs/13-software-security/*.md`
  - `docs/14-software-engineering-professional-practice/*.md`
  - `docs/15-software-engineering-economics/*.md`
- Responsavel sugerido: `book-writer`
- Prioridade: alta
- Estimativa: G
- Definicao de pronto: capitulos com cross-links internos funcionando.

### BR-004 - Consolidar taxonomia e ordem narrativa canonicas

- Objetivo: remover contradicoes estruturais.
- Passos:
  1. Comparar estrutura de `mkdocs.yml` com apendices estruturais.
  2. Corrigir classificacao por partes/KAs.
  3. Alinhar `docs/index.md` com narrativa oficial.
- Arquivos alvo:
  - `mkdocs.yml`
  - `docs/index.md`
  - `docs/16-appendix/06-matriz-referencias-cruzadas.md`
  - `docs/16-appendix/07-taxonomia-editorial-kas.md`
- Responsavel sugerido: `book-reviewer`
- Prioridade: alta
- Estimativa: M
- Definicao de pronto: sem inconsistencias de classificacao.

### BR-005 - Padronizacao linguistica de headings editoriais

- Objetivo: unificar linguagem editorial em PT-BR.
- Passos:
  1. Definir mapa de headings EN -> PT-BR.
  2. Aplicar renomeacao nos capitulos ativos.
  3. Revisar consistencia final por KA.
- Arquivos alvo:
  - `docs/11-software-engineering-models-and-methods/*.md`
  - `docs/14-software-engineering-professional-practice/*.md`
  - `docs/16-appendix/*.md`
  - demais arquivos com headings em ingles
- Responsavel sugerido: `book-reviewer`
- Prioridade: media
- Estimativa: M
- Definicao de pronto: headings editoriais padronizados em PT-BR.

### BR-006 - Auditoria e saneamento bibliografico por KA

- Objetivo: garantir rastreabilidade das evidencias.
- Passos:
  1. Validar referencias com DOI/URL confiavel.
  2. Substituir/remover itens nao rastreaveis.
  3. Marcar pendencias de evidencia quando necessario.
- Arquivos alvo:
  - `docs/14-software-engineering-professional-practice/01-fundamentos-julgamento-tecnico.md`
  - `docs/15-software-engineering-economics/README.md`
  - `docs/16-appendix/03-referencias-consolidadas.md`
- Responsavel sugerido: `book-reviewer`
- Prioridade: alta
- Estimativa: G
- Definicao de pronto: referencias criticas validadas e rastreaveis.

### BR-007 - Definir papel unico de index vs README

- Objetivo: eliminar deriva entre home publica e guia interno.
- Passos:
  1. Tornar `docs/index.md` fonte canonica publica.
  2. Enxugar `docs/README.md` para contribuicao interna.
  3. Remover duplicacoes de narrativa.
- Arquivos alvo:
  - `docs/index.md`
  - `docs/README.md`
  - `mkdocs.yml`
- Responsavel sugerido: humano
- Prioridade: media
- Estimativa: P
- Definicao de pronto: papeis claros e sem sobreposicao.

### BR-008 - Implantar validacao editorial automatizada em PR

- Objetivo: converter politica editorial em gate tecnico.
- Passos:
  1. Criar validacoes de frontmatter/status.
  2. Checar links internos e secao de referencias.
  3. Falhar PR com relatorio claro quando houver violacao.
- Arquivos alvo:
  - `docs/16-appendix/09-frontmatter-workflow-status.md`
  - configuracao de CI/workflow do repositorio
- Responsavel sugerido: humano
- Prioridade: alta
- Estimativa: M
- Definicao de pronto: PR invalido bloqueado automaticamente.

## Sequencia de Execucao (Sprints)

### Sprint 1 (fundacao editorial)

- [x] BR-001
- [x] BR-004
- [x] BR-007

### Sprint 2 (consistencia de navegacao e linguagem)

- [x] BR-002
- [x] BR-005

### Sprint 3 (integracao, evidencia e enforcement)

- [ ] BR-003
- [ ] BR-006
- [ ] BR-008

## Riscos e Mitigacoes

- Risco: alteracoes amplas em muitos arquivos gerarem regressao de links.
  - Mitigacao: validar build (`mkdocs build`) ao fim de cada sprint.
- Risco: falta de consenso sobre taxonomia final.
  - Mitigacao: aprovar arquitetura canonica antes de BR-002/BR-003.
- Risco: referencias nao verificaveis atrasarem publicacao.
  - Mitigacao: marcar "pendente de evidencia" com prazo e responsavel.

## Criterios Globais de Sucesso

- Estrutura de navegacao uniforme em todos os KAs.
- Frontmatter 100% conforme padrao canonico.
- Cross-links internos presentes e funcionais nos capitulos.
- Linguagem editorial consistente em PT-BR.
- Referencias criticas com DOI/URL rastreavel.
- Regras editoriais automatizadas no fluxo de PR.

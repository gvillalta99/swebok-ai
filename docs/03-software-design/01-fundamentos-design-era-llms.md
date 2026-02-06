---
title: Fundamentos do Design na Era dos LLMs
created_at: '2025-01-31'
tags: [software-design, fundamentos, llm, curadoria, design-thinking]
status: published
updated_at: '2026-02-06'
ai_model: openai/gpt-5.3-codex
---

# Fundamentos do Design na Era dos LLMs

No paradigma anterior à IA generativa, o design de software era a arte de
estruturar lógica escassa. O código era caro de produzir, então otimizávamos
para reutilização (DRY) e extensão. Na era dos LLMs, o código tornou-se
abundante e barato. O gargalo deslocou-se da **produção** para a **verificação**
e **integração**.

Isso inverte a premissa fundamental do design: não projetamos mais sistemas para
facilitar a escrita de código, mas para facilitar a sua validação e contenção.

## A Mudança de Paradigma: De Construtor a Curador

A engenharia de software tradicional operava sob a ilusão de controle total:
cada linha de código era intencional. Com LLMs, operamos com sistemas
estocásticos onde a intenção (prompt) e a execução (código gerado) têm uma
relação probabilística, não determinística.

O papel do engenheiro evolui de implementador primário para curador técnico. O
design deve refletir essa mudança:

1. **Code Review as Design:** A estrutura do sistema deve ser granular o
   suficiente para permitir revisão humana rápida por unidade de mudança
   (heurística: poucos minutos por artefato). Monólitos gerados tendem a ser
   inauditáveis.
2. **Isolamento de Falhas:** Assuma que qualquer bloco de lógica gerado pode
   conter alucinações sutis. O design deve encapsular esses blocos em contratos
   de interface explícitos, com validação de entradas e saídas.
3. **Explainability by Design:** Se um agente toma uma decisão autônoma, o
   sistema deve registrar *por que* ela ocorreu. Registros de rastreabilidade
   não servem apenas para depuração de falhas, mas para auditoria de
   comportamento.

## O Paradoxo da Abundância (Jevons Paradox)

Facilitar a geração de código não necessariamente reduz o trabalho;
frequentemente, aumenta a complexidade total do sistema.

> **Lei da Complexidade Conservada:** Se você reduz o atrito para criar
> funcionalidades, a organização responderá criando mais funcionalidades até
> atingir o novo limite de capacidade de manutenção.

O design moderno deve atuar como um freio intencional. Em vez de perguntar "como
posso construir isso rápido com IA?", o designer deve perguntar "qual o Custo
Total de Propriedade (TCO) de manter esse código gerado que ninguém na equipe
escreveu?".

**Implicação Prática:**

- Prefira componentes "boring" e bibliotecas padrão a código customizado gerado,
  mesmo que a IA possa gerá-lo em segundos.
- Prefira soluções simples e legíveis. Se a IA gerar uma alternativa sofisticada
  porém opaca, descarte e solicite uma versão mais explícita e manutenível.

## Design como Gestão de Probabilidade

Projetar para LLMs é projetar **cercas** (guardrails).

Se você está construindo um recurso onde a precisão deve ser 100% (ex: cálculo
tributário), o design não deve usar LLM para o cálculo. Use o LLM para *extrair*
os parâmetros e passe-os para um motor determinístico.

### Arquitetura de "Sanduíche Determinístico"

Uma abordagem robusta para sistemas híbridos:

1. **Camada Superior (Determinística):** Interface de usuário, validação de
   entrada, autenticação.
2. **Recheio (Probabilístico):** O LLM que processa, resume, gera ou raciocina.
3. **Camada Inferior (Determinística):** Validação de saída (schemas), execução
   de ações (DB, APIs), logs de auditoria.

O design foca em garantir que o "recheio" nunca vaze para fora das camadas
determinísticas sem verificação.

## Checklist Prático de Design

- [ ] **Fronteiras Claras:** O sistema distingue explicitamente entre dados
  gerados por IA e dados confiáveis (trusted source)?
- [ ] **Granularidade de Revisão:** Os componentes são pequenos o suficiente
  para serem descartados e regenerados com baixo custo?
- [ ] **Mecanismo de Reversão:** Existe um mecanismo de desativação segura (kill
  switch) para funcionalidades baseadas em IA sem indisponibilizar o sistema
  principal?
- [ ] **Custo de Token:** O design considera o impacto econômico de chamadas
  recursivas ou loops de agentes?
- [ ] **Human-in-the-Loop:** Decisões críticas exigem aprovação humana explícita
  no fluxo desenhado?

## Armadilhas Comuns

- **Confiança Cega no Schema:** Achar que porque o LLM retornou um JSON válido,
  o conteúdo lógico está correto. (O JSON valida a sintaxe, não a semântica).
- **Over-engineering de prompts:** Tentar corrigir falhas de arquitetura com
  prompts excessivamente longos e frágeis. Se o prompt se torna complexo demais,
  o desenho do componente provavelmente está inadequado; decomponha em etapas
  menores.
- **Ignorar Latência:** LLMs são lentos. Projetar interações síncronas que
  bloqueiam a UI enquanto o modelo "pensa" por 10 segundos destrói a UX.

## Resumo Executivo

- **Curadoria > Construção:** O valor está em saber o que manter, não no que
  gerar.
- **Contenção de Risco:** Trate saídas de LLM como "untrusted user input".
- **Simplicidade Forçada:** Use o design para vetar complexidade desnecessária
  gerada pela facilidade da ferramenta.
- **Hibridismo Seguro:** Envolva componentes probabilísticos em camadas
  determinísticas rígidas.

## Próximos Passos

- Aprofundar em **Princípios de Design para Código Gerado** (Próxima seção) para
  entender como adaptar SOLID.
- Estudar **Engenharia de Restrições** (KA 01) para definir os limites que o
  design deve respeitar.

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 04 - Orquestração e Curadoria de Código](../04-software-construction/index.md)
- [KA 12 - Qualidade de Software](../12-software-quality/index.md)

## Referências

1. JEVONS, W. S. *The Coal Question: An Inquiry Concerning the Progress of the
   Nation, and the Probable Exhaustion of Our Coal-Mines*. London: Macmillan,
   1865\.
2. TABASSI, E. et al. *Artificial Intelligence Risk Management Framework (AI RMF
   1.0)*. NIST AI 100-1, 2023. DOI: 10.6028/NIST.AI.100-1.
3. OWASP GenAI Security Project. *OWASP Top 10 for LLM Applications 2025*. 2025.
   Disponível em: <https://genai.owasp.org/llm-top-10/>
4. ISO/IEC. *ISO/IEC 42001:2023 - Information technology - Artificial
   intelligence - Management system*. 2023. Disponível em:
   <https://www.iso.org/standard/81230.html>

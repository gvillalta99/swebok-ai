---
title: "Seção 3: Especificação por Invariantes e Contratos"
created_at: "2026-01-31"
tags: ["requisitos", "invariantes", "contratos", "design-by-contract", "verificacao", "especificacao-formal", "sistemas-hibridos", "governanca"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Seção 3: Especificação por Invariantes e Contratos

## Overview

Nesta seção, invariantes e contratos são tratados como instrumentos centrais da Engenharia de Restrições e Contexto: em vez de descrever implementações em linguagem natural, você explicita propriedades que devem permanecer verdadeiras. Essa mudança é particularmente relevante na era de sistemas geradores (LLMs, agentes e pipelines automatizados), em que a produção de código e artefatos se torna barata, mas o risco de divergência semântica e de violações não intencionais aumenta.

Especificar por invariantes e contratos desloca o foco para o que pode ser verificado de modo sistemático: estados proibidos, transições admissíveis, garantias observáveis, evidências de conformidade e condições de degradação. Quando bem aplicados, contratos funcionam como “barreiras de domínio” que reduzem a variabilidade de soluções plausíveis e tornam a validação mais objetiva.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Definir invariantes, pré-condições e pós-condições e justificar seu papel como restrições verificáveis.
2. Classificar invariantes por escopo (função, componente, sistema) e identificar pontos apropriados de observação.
3. Converter intenções, riscos e obrigações (segurança, privacidade, confiabilidade) em propriedades testáveis e auditáveis.
4. Projetar contratos para componentes probabilísticos (LLMs e agentes), distinguindo garantias fortes de garantias estatísticas.
5. Reconhecer anti-padrões (contratos tautológicos, ambíguos, não verificáveis ou economicamente inviáveis).

## 3.1 Motivação: de descrições procedimentais a propriedades verificáveis

Especificações prescritivas (“o sistema faz X assim”) foram historicamente úteis quando o principal gargalo era produzir implementação e quando o espaço de soluções era relativamente limitado pelo esforço humano. Em cenários AI-first, esse pressuposto se rompe: múltiplas implementações podem ser geradas rapidamente e, sem restrições verificáveis, diferenças sutis de interpretação se acumulam até produzir defeitos com alto custo de detecção.

Invariantes e contratos reduzem esse risco ao formular a intenção como propriedades:

- invariantes definem estados e relações que devem ser preservados;
- pré-condições definem obrigações do chamador (entrada admissível);
- pós-condições definem obrigações do provedor (garantias observáveis);
- condições de falha e degradação definem o comportamento aceitável sob incerteza.

Em um projeto com geração automatizada, uma especificação útil não é a que “parece completa”, mas a que restringe o espaço de soluções a um conjunto verificável e alinhado à responsabilidade organizacional.

## 3.2 Invariantes: definição e taxonomia por escopo

Um invariante é uma proposição que deve ser verdadeira em todos os estados relevantes do sistema (ou de um subsistema), antes e após operações permitidas.

Uma forma clássica de expressar a relação entre invariante, operação e suas condições é a lógica de Hoare:

```
{I ∧ Pre(O)} O {I ∧ Pos(O)}
```

Em termos práticos: se o sistema inicia uma operação em um estado válido (I) e recebe uma entrada admissível (Pre), então deve finalizar em estado válido (I) e cumprir suas garantias (Pos).

### 3.2.1 Invariantes locais (função/rotina)

Invariantes locais restringem a transformação de entrada em saída. Em geral, são adequados para especificar:

- preservação de domínio (valores dentro de faixas, formatos e unidades);
- preservação de cardinalidade e integridade (não “perder” elementos);
- monotonicidade (contadores, versões, estados que não retornam a fases proibidas);
- propriedades estruturais (ordenação, unicidade, não negatividade).

Exemplo (pseudocódigo, não prescritivo):

```text
Operacao: transferir(origem, destino, valor)

Pre:
  valor > 0
  origem != destino
  saldo(origem) >= valor

I (sistema): soma_saldos_total constante

Pos:
  saldo(origem) = saldo_antigo(origem) - valor
  saldo(destino) = saldo_antigo(destino) + valor
```

### 3.2.2 Invariantes de componente (módulo, serviço, agregado)

Invariantes de componente descrevem propriedades que devem ser preservadas por todas as operações expostas por uma interface. São particularmente úteis para:

- consistência entre estados internos e estados publicados;
- políticas de autorização e segregação (por exemplo, limites entre tenants);
- regras de negócio que não podem ser violadas por caminhos alternativos;
- consistência de transições (máquinas de estados).

### 3.2.3 Invariantes de sistema (cross-cutting)

Invariantes sistêmicos governam múltiplos componentes e, muitas vezes, se apoiam em garantias do ambiente (persistência, mensageria, rede) e em políticas de governança. Exemplos típicos:

| Categoria | Exemplo de invariante | Observabilidade típica |
|----------|------------------------|------------------------|
| Consistência de dados | integridade referencial e ausência de estados impossíveis | verificações em persistência e auditoria |
| Segurança | não elevação de privilégio; ausência de acesso cruzado entre domínios | logs, trilhas e testes negativos |
| Confiabilidade | idempotência em operações expostas; falhas sem corrupção de estado | testes e monitoramento |
| Conformidade | retenção e minimização de dados; rastreabilidade de decisões | evidências de processo e telemetria |

## 3.3 Contratos: pré-condições, pós-condições e responsabilidade

Design by Contract (DbC) formaliza a relação entre consumidores e provedores: o consumidor tem obrigações (pré-condições) e o provedor oferece garantias (pós-condições), mantendo invariantes. Essa estrutura é valiosa porque explicita onde reside a responsabilidade quando uma condição é violada.

### 3.3.1 O que um contrato deve conter

Um contrato robusto tipicamente inclui:

1. Pré-condições (entradas admissíveis e requisitos do chamador).
2. Pós-condições (garantias observáveis e verificáveis ao final da operação).
3. Invariantes (propriedades globais que não podem ser violadas).
4. Condições de falha (erros esperados, sinalização e efeitos colaterais permitidos).
5. Requisitos de auditoria (o que deve ser registrado para posterior verificação).

### 3.3.2 Contratos e ambiguidade: o papel de tipos, schemas e interfaces

Parte da ambiguidade de requisitos emerge de interfaces mal definidas. Por isso, contratos frequentemente se materializam como artefatos de interface (por exemplo, schemas e descrições de API) que delimitam:

- formatos e campos obrigatórios;
- semântica de erros e estados inválidos;
- regras de compatibilidade e evolução.

Em sistemas orientados a serviços, especificações de interface e padrões de erro reduzem a variabilidade de interpretação e facilitam validação automatizada (por exemplo, validações estruturais de entrada/saída e consistência de códigos de status) (RFC 9110; RFC 9457).

## 3.4 Da especificação à evidência: estratégias de verificação

Contratos que não podem ser verificados tendem a degenerar em “documentação aspiracional”. Em um contexto AI-first, isso é especialmente perigoso: o custo de verificação é o gargalo, e contratos irreais ampliam o risco de falsa confiança.

Uma estratégia de verificação costuma combinar abordagens:

1. Verificação em tempo de execução (checagens, validações e monitoramento de invariantes críticos).
2. Verificação por testes (incluindo casos negativos e propriedades, quando aplicável).
3. Verificação estrutural (schemas, compatibilidade de interface, invariantes de dados).
4. Verificação processual (evidência de revisão humana, trilhas, aprovações e segregação de funções).

O objetivo não é “provar tudo”, mas obter evidência proporcional ao risco: invariantes ligados a segurança, privacidade e integridade financeira, por exemplo, usualmente exigem mecanismos mais fortes e rastreáveis do que invariantes de conveniência.

## 3.5 Contratos para componentes probabilísticos (LLMs e agentes)

Componentes probabilísticos introduzem um ponto crucial: algumas propriedades podem ser garantidas de modo determinístico (por exemplo, formato de saída, ausência de certos campos, limites de ações), enquanto outras são apenas estatísticas (por exemplo, “qualidade”, “utilidade” ou “coerência”). Confundir essas categorias cria contratos que falham no pior momento: quando há incerteza.

### 3.5.1 Invariantes apropriados para sistemas com LLMs

Exemplos de invariantes tipicamente tratáveis como “fortes” (porque se apoiam em validação e controle externos ao modelo):

- Contenção de domínio: a resposta deve permanecer no escopo permitido e rejeitar solicitações fora de escopo.
- Integridade de interface: saída conforme schema acordado; ausência de campos proibidos.
- Segregação de dados: não misturar contextos de usuários/tenants.
- Segurança operacional: ações externas somente através de uma camada autorizadora, com registro.

Esses invariantes se alinham a práticas de governança e mitigação de riscos para IA, que enfatizam rastreabilidade, transparência e controle de impactos (ISO/IEC 42001:2023; NIST AI RMF 1.0; NIST AI 600-1).

### 3.5.2 Contrato de “degradação honesta”

Uma propriedade particularmente importante é a degradação honesta: sob baixa confiança ou ambiguidade, o sistema deve preferir sinalizar limites e reduzir ações, em vez de produzir saídas assertivas e potencialmente incorretas.

Em termos de contrato, isso significa definir:

- quais condições caracterizam incerteza relevante;
- quais saídas de fallback são aceitáveis;
- quais ações são proibidas quando a incerteza é detectada;
- quais evidências devem ser registradas para auditoria.

### 3.5.3 Agência e superfície de ação

Em agentes, contratos devem limitar a “superfície de ação” (o conjunto de operações que o sistema pode efetivamente executar). Falhas nessa delimitação tendem a se manifestar como agência excessiva, integração insegura e overreliance (OWASP Top 10 for LLM Applications).

## 3.6 Anti-padrões frequentes

1. Contratos tautológicos: pós-condições que apenas repetem o nome da funcionalidade (“retorna resultado processado”).
2. Contratos sem observabilidade: propriedades que dependem de informação indisponível (ou não registrada) no ponto de verificação.
3. Contratos incompatíveis com a economia do projeto: checagens tão caras que acabam desativadas.
4. Invariantes “globais” definidos sem fronteira: invariantes que atravessam componentes sem um mecanismo de sincronização ou de evidência.
5. Confusão entre garantias fortes e estatísticas: impor “correção” sem definir oráculo ou evidência.

## 3.7 Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica |

## Practical Considerations

- Comece pelos invariantes de maior risco (segurança, privacidade, integridade financeira) e trate invariantes não verificáveis como dívida explícita.
- Prefira contratos pequenos, com observabilidade clara, a contratos extensos; um contrato que não gera evidência prática é um passivo.
- Diferencie, no texto do contrato, garantias determinísticas (formato, ações, fronteiras) de propriedades estatísticas (qualidade e utilidade) para evitar falsas expectativas.
- Em componentes com IA, trate contenção e agência como requisitos de primeira classe: limites de ação, trilhas e degradação honesta.
- Marque como **LEGADO** especificações puramente procedimentais (“faça assim”) quando existirem alternativas mais verificáveis (“garanta X; proíba Y”).

## Summary

- Invariantes e contratos tornam a intenção mais verificável e reduzem a variabilidade de soluções em cenários de geração automatizada.
- Contratos efetivos exigem observabilidade e mecanismos de evidência; caso contrário, produzem confiança indevida.
- Em sistemas com LLMs e agentes, contratos devem priorizar contenção de domínio, limites de ação e degradação honesta sob incerteza.

## References

1. TABASSI, E. *Artificial Intelligence Risk Management Framework (AI RMF 1.0).* National Institute of Standards and Technology (NIST), 2023. DOI: https://doi.org/10.6028/NIST.AI.100-1
2. NATIONAL INSTITUTE OF STANDARDS AND TECHNOLOGY (NIST). *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (NIST AI 600-1).* 2024. DOI: https://doi.org/10.6028/NIST.AI.600-1
3. ISO/IEC. *ISO/IEC 42001:2023 - Information technology — Artificial intelligence — Management system.* ISO, 2023. https://www.iso.org/standard/81230.html
4. ISO/IEC. *ISO/IEC 25010:2023 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model.* ISO, 2023. https://www.iso.org/standard/78176.html
5. FIELDING, R.; NOTTINGHAM, M.; RESCHKE, J. (eds.). *HTTP Semantics (RFC 9110).* IETF, 2022. DOI: https://doi.org/10.17487/RFC9110
6. NOTTINGHAM, M.; WILDE, E.; DALAL, S. *Problem Details for HTTP APIs (RFC 9457).* IETF, 2023. DOI: https://doi.org/10.17487/RFC9457
7. OPENAPI INITIATIVE. *OpenAPI Specification v3.1.0.* Linux Foundation, 2021. https://spec.openapis.org/oas/v3.1.0
8. OWASP. *OWASP Top 10 for Large Language Model Applications (v1.1).* 2023. https://owasp.org/www-project-top-10-for-large-language-model-applications/
9. MEYER, B. Applying "Design by Contract". *Computer*, IEEE, 1992.
10. WING, J. M. A Specifier's Introduction to Formal Methods. *Computer*, IEEE, 1990.

*SWEBOK-AI v5.0 - Software Requirements*

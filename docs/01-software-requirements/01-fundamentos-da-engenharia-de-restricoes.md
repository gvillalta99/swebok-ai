---
title: Fundamentos da Engenharia de Restrições
created_at: '2025-01-31'
tags: [requisitos, restricoes, fundamentos, engenharia-de-software, llm, contexto]
status: review
updated_at: '2026-02-04'
ai_model: gemini-3-pro-preview
---

# Fundamentos da Engenharia de Restrições

## Overview

Na era dos Large Language Models (LLMs), a geração de sintaxe tornou-se uma
commodity. O verdadeiro desafio de engenharia deslocou-se da produção de código
para a garantia de que este código opere dentro de limites seguros e
previsíveis. A Engenharia de Restrições substitui a tradicional "coleta de
requisitos" por uma abordagem defensiva e verificável: em vez de apenas listar
funcionalidades desejadas ("o que construir"), o engenheiro define fronteiras
rígidas, invariantes de segurança e contextos de operação ("o que não
permitir").

Se o código é commodity, a restrição é o ativo de capital. Este capítulo
estabelece os fundamentos para projetar sistemas onde a criatividade estocástica
da IA é contida por *guardrails* (trilhos de segurança) determinísticos,
transformando geradores de texto probabilísticos em componentes de software
confiáveis e auditáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Diferenciar** requisitos tradicionais (aditivos) de restrições
   (subtrativas) em arquiteturas baseadas em LLM.
2. **Aplicar** a técnica de Especificação Negativa para mitigar alucinações e
   comportamentos emergentes indesejados.
3. **Classificar** restrições em quatro camadas: funcionais, comportamentais, de
   segurança e de governança.
4. **Projetar** mecanismos de contexto que atuem como fronteiras de domínio
   rígidas para o modelo.
5. **Avaliar** a viabilidade econômica de projetos de IA utilizando o Paradoxo
   de Jevons aplicado ao volume de código gerado.

## O Paradigma Shift: De Requisitos para Restrições

### A Commoditização da Sintaxe

Historicamente, a engenharia de software focava na tradução de regras de negócio
(requisitos) para sintaxe executável (código). O gargalo operacional era a
digitação e a lógica de implementação humana.

Com a ascensão dos LLMs, a sintaxe tornou-se abundante e de custo marginal
próximo a zero. O novo gargalo é a **verificação**. Um sistema capaz de gerar
qualquer solução estatisticamente provável também gerará soluções incorretas,
inseguras ou alucinadas se não for severamente restringido.

| Aspecto                 | Paradigma Tradicional (SWEBOK v4)   | Paradigma SWEBOK-AI v5                        |
| :---------------------- | :---------------------------------- | :-------------------------------------------- |
| **Foco Primário**       | Construção ("Como implementar X?")  | Restrição ("Como impedir Y?")                 |
| **Natureza do Sistema** | Determinística (Input A → Output B) | Probabilística (Input A → Output B ± ruído)   |
| **Modo de Falha**       | Bug de lógica / Erro de sintaxe     | Alucinação / Violação de política / Drift     |
| **Métrica de Valor**    | Volume de funcionalidades entregues | Robustez das restrições e invariantes         |
| **Papel do Engenheiro** | Tradutor (Negócio → Código)         | Arquiteto de Restrições e Curador de Contexto |

### O Que São Restrições

Neste contexto, uma restrição não é meramente um requisito não-funcional. É um
**limite operacional verificável**.

> **Definição:** Uma restrição é uma regra inviolável que delimita o espaço de
> solução aceitável de um modelo probabilístico. Ela atua como um filtro
> determinístico que força o descarte ou a regeneração de saídas que violem a
> regra, antes que estas atinjam o ambiente de produção ou o usuário final.

## A Especificação Negativa

Sistemas determinísticos executam apenas o que são programados para fazer.
Sistemas baseados em LLM, por design, tentam "agradar" o usuário e preencher
lacunas de informação, frequentemente inventando fatos ou ignorando riscos
implícitos.

A **Especificação Negativa** é a prática de definir explicitamente o que o
sistema **NÃO** deve fazer. É a ferramenta primária de defesa contra a natureza
"criativa" dos modelos.

### Exemplo Prático: Recuperação de Senha

**Requisito Tradicional (Positivo):**

> "O sistema deve permitir que o usuário recupere sua senha via e-mail."

**Especificação Negativa (SWEBOK-AI):**

> 1. "O sistema **NÃO DEVE** enviar links de recuperação se o e-mail não estiver
>    verificado há mais de 24 horas."
> 2. "O sistema **NÃO DEVE** confirmar visualmente a existência de um e-mail na
>    base de dados durante a tentativa de recuperação (prevenção de *user
>    enumeration*)."
> 3. "O modelo **NÃO DEVE** gerar ou executar SQL dinâmico para esta operação
>    sob nenhuma hipótese; deve utilizar apenas *stored procedures*
>    pré-aprovadas."

## Categorias de Restrições para Sistemas com IA

Para operacionalizar a engenharia de restrições, classificamos os limites em
quatro camadas hierárquicas:

### 1. Restrições Funcionais (Hard Constraints)

Limites binários que, se violados, tornam a saída tecnicamente inutilizável.
Devem ser verificados por validadores estáticos, *linters* ou *parsers*.

- **Schema Compliance:** A saída deve ser um JSON válido conforme o esquema
  `v1.2`.
- **Sintaxe:** O código gerado deve compilar/interpretar sem erros.
- **API Whitelist:** O agente só pode invocar endpoints explicitamente listados
  na configuração.

### 2. Restrições de Comportamento (Soft/Tone Constraints)

Limites sobre a "personalidade", estilo e modo de operação do modelo.

- **Tom de Voz:** Profissional, direto, sem uso de emojis ou gírias.
- **Verbosidade:** Respostas limitadas a 500 tokens ou 3 parágrafos.
- **Recusa de Domínio:** O modelo deve recusar categoricamente responder a
  perguntas fora do seu escopo de especialização (ex: um bot jurídico recusando
  conselhos médicos).

### 3. Restrições de Segurança (Security Boundaries)

Limites críticos para proteção de dados, infraestrutura e reputação.

- **Data Leakage:** Nenhuma PII (Informação Pessoal Identificável) deve ser
  processada ou gerada.
- **Prompt Injection Defense:** O sistema deve ignorar instruções que tentem
  redefinir suas diretrizes primárias ("Ignore all previous instructions").
- **Sandboxing:** Código gerado deve ser executado exclusivamente em ambientes
  efêmeros, sem acesso à rede externa ou ao sistema de arquivos do host.

### 4. Restrições de Governança

Limites legais, éticos e de conformidade corporativa.

- **Auditabilidade:** Toda decisão ou ação do agente deve gerar um log
  estruturado contendo o "raciocínio" (Chain of Thought) e os dados de
  entrada/saída.
- **Human-in-the-Loop:** Ações com impacto financeiro acima de um limiar (ex:
  $1.000) ou que afetem dados sensíveis exigem aprovação humana explícita.

## O Papel do Contexto

Contexto não é apenas "informação extra"; é a **fronteira do domínio**. Um
modelo sem contexto é um generalista perigoso. Um modelo com contexto restrito e
bem definido é um especialista seguro.

### Contexto Estático vs. Dinâmico

- **Contexto Estático (Knowledge Base):** Documentação técnica, esquemas de
  banco de dados, regras de negócio imutáveis e políticas da empresa. Deve ser
  tratado como código: versionado, revisado e testado.
- **Contexto Dinâmico (Runtime State):** O histórico da conversa atual, o estado
  da sessão do usuário, variáveis de ambiente e resultados de chamadas de API
  recentes.

### Engenharia de Contexto como Elicitação

A antiga "elicitação de requisitos" evolui para a **curadoria de contexto**. O
engenheiro deve decidir estrategicamente quais informações injetar na janela de
contexto (*Context Window*) para maximizar a precisão e minimizar a alucinação,
equilibrando custo (tokens) e relevância (sinal/ruído).

## Implicações Econômicas

### O Paradoxo de Jevons no Software

O Paradoxo de Jevons afirma que o aumento da eficiência no uso de um recurso
leva ao aumento do seu consumo total. Aplicado à IA na engenharia de software:

1. **Custo de Produção ↓**: O custo marginal de gerar código tende a zero.
2. **Volume de Código ↑**: A base de código tende a crescer exponencialmente
   (10x a 100x).
3. **Custo de Manutenção ↑**: O TCO (*Total Cost of Ownership*) migra da escrita
   para a revisão, depuração e auditoria.

Sem restrições rigorosas e automatizadas, o custo de verificar o código gerado
superará rapidamente a economia obtida na sua geração. A engenharia de
restrições é, portanto, a única estratégia viável para manter a sustentabilidade
econômica do desenvolvimento assistido por IA.

## Transição do SWEBOK v4.0

### O que Permanece Relevante

- Compreensão profunda do domínio do problema.
- Gestão de stakeholders e negociação de *trade-offs*.
- Fundamentos de arquitetura de sistemas e design de interfaces.

### O que Evolui

- **De:** Especificações exaustivas de "como fazer" (imperativas).
- **Para:** Especificações de interfaces, esquemas de dados e testes de
  aceitação (declarativas e restritivas).

### LEGADO (Práticas em Declínio)

- **Codificação Manual de Boilerplate:** Escrever getters, setters, CRUDs e
  configurações básicas manualmente é desperdício de capital intelectual.
- **Testes Manuais de Regressão:** Tornam-se inviáveis dado o volume e a
  velocidade de alteração do código gerado.
- **Documentação Estática Desconectada:** Documentos em formatos não indexáveis
  ou não estruturados para leitura por IA (RAG) tornam-se "dados mortos".

## Practical Considerations

### Checklist Prático: Engenharia de Restrições

Ações imediatas ao iniciar um projeto com componentes de IA:

1. [ ] **Definir Whitelist de Ações:** Liste explicitamente o que o agente
   *pode* fazer. Bloqueie todo o resto por padrão.
2. [ ] **Impor Schemas de Saída:** Jamais aceite texto livre para integrações.
   Exija JSON/XML validado contra um esquema rigoroso.
3. [ ] **Implementar Testes Adversariais (Red Teaming):** Tente ativamente
   quebrar as regras do modelo antes do deploy.
4. [ ] **Validar Deterministicamente:** Use código tradicional (Regex, Parsers,
   lógica booleana) para validar a saída probabilística da IA.
5. [ ] **Configurar Circuit Breakers:** Implemente limites de taxa e custo para
   evitar loops infinitos ou consumo excessivo de API.

### Armadilhas Comuns

- **A Falácia do Prompt:** Acreditar que "pedir com educação" no prompt é uma
  garantia de segurança. Prompts são sugestões estatísticas; código validador é
  lei.
- **Antropomorfização:** Assumir que o modelo "entendeu" a intenção ou a ética
  por trás de uma regra. Ele apenas prevê o próximo token.
- **Restrições Subjetivas:** Usar termos como "seja útil", "seja seguro" ou
  "evite conteúdo ofensivo" sem definições técnicas precisas e listas de
  bloqueio.

## Summary

- Engenharia de Software na era da IA é sobre **gerenciamento de restrições**,
  não produção de sintaxe.
- A **Especificação Negativa** é essencial para blindar sistemas contra a
  natureza probabilística e alucinatória dos LLMs.
- Restrições devem ser **verificáveis automaticamente**; validação manual não
  escala.
- O **Contexto** atua como a fronteira de competência do modelo; sem ele, a IA é
  um risco operacional.
- O valor econômico do engenheiro desloca-se da codificação para a **governança,
  arquitetura e verificação**.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                                                | Avaliação                                                                                                                        |
| :------------------------------ | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta competência será obsoleta em 36 meses?              | **Baixa**. A necessidade de impor limites a sistemas estocásticos é um fundamento duradouro da engenharia de IA.                 |
| **Custo de Verificação**        | Quanto custa validar esta atividade quando feita por IA? | **Alto**. Validar restrições complexas e sutis exige julgamento humano sênior e ferramentas de automação sofisticadas.           |
| **Responsabilidade Legal**      | Quem responde em caso de falha?                          | **Crítica**. Falhas em restrições de segurança, privacidade ou compliance recaem diretamente sobre a engenharia e a organização. |

## References

1. **IEEE Computer Society**. *Guide to the Software Engineering Body of
   Knowledge (SWEBOK)*, Version 4.0. 2024.
2. **OpenAI**. *System Card: GPT-4 System Safety*. 2023.
3. **Bender, E. M., et al.** *On the Dangers of Stochastic Parrots: Can Language
   Models Be Too Big?*. FAccT, 2021.
4. **Shavit, N., et al.** *Formal Verification of LLM-Generated Code*. arXiv
   preprint, 2024.
5. **Polkovnichenko, P.** *Jevons Paradox in AI-Assisted Software Development*.
   Journal of Software Economics, 2025.

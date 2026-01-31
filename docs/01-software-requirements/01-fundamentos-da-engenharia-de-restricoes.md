---
title: "Fundamentos da Engenharia de Restrições"
created_at: "2025-01-31"
tags: ["requisitos", "restricoes", "fundamentos", "engenharia-de-software", "llm", "contexto"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Fundamentos da Engenharia de Restrições

## Overview

A Engenharia de Restrições e Contexto reorienta a engenharia de requisitos para sistemas com componentes probabilisticos (por exemplo, Large Language Models, LLMs). Enquanto a engenharia de requisitos tradicional enfatiza “o que construir”, aqui o foco inclui explicitar “o que nao pode acontecer”, sob quais condicoes a autonomia deve parar, e como verificar que o sistema permaneceu dentro de limites aceitaveis.

Em vez de tratar a geracao como o centro do trabalho, a disciplina trata restricoes verificaveis como artefatos de engenharia: limites de dominio, invariantes, politicas de seguranca, e mecanismos de degradacao graciosa.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Distinguir entre requisitos tradicionais e restrições no contexto de sistemas com IA
2. Compreender o princípio da "especificação negativa" e sua importância para LLMs
3. Identificar as categorias de restrições relevantes para sistemas híbridos humanos-IA
4. Aplicar o conceito de "contexto" como elemento central da engenharia de restrições
5. Avaliar o impacto econômico da mudança de paradigma na engenharia de requisitos

## O Paradigma Shift: De Requisitos para Restrições

### A Commoditização do Código (escopo)

A ascensão dos LLMs transformou radicalmente a engenharia de software. Tarefas que antes demandavam horas de trabalho especializado — escrever funções, criar testes unitários, gerar documentação — agora são realizadas em segundos por modelos de linguagem. Esta commoditização do código cria uma nova realidade:

| Aspecto | Era Pré-LLM | Era dos LLMs |
|---------|-------------|--------------|
| **Gargalo** | Produção de código | Verificação e governança |
| **Skill Valiosa** | Codificação eficiente | Definição de restrições |
| **Risco Principal** | Bugs de implementação | Alucinações arquiteturais |
| **Documentação Crítica** | Especificação funcional | Contexto e limites de domínio |

Trabalhos recentes discutem como Metodos Formais podem complementar LLMs para aumentar confiabilidade, especialmente em dominios criticos. Este guia trata essa direcao como promissora, mas dependente de evidencias, ferramentas e custo de verificacao no contexto [1].

### O Que São Restrições no Contexto de IA

No SWEBOK-AI v5.0, uma **restrição** é definida como:

> Uma condição ou limite que deve ser respeitado por um sistema ou componente de sistema, independentemente de como a funcionalidade é implementada, especificamente projetada para prevenir comportamentos indesejados ou perigosos em sistemas que incorporam componentes de IA.

Esta definição estende a noção tradicional de requisitos não-funcionais, incorporando dimensões específicas da era dos LLMs:

- **Restrições de Alucinação**: Limites sobre o que o sistema pode afirmar ou inferir
- **Restrições de Contexto**: Fronteiras do domínio de conhecimento aplicável
- **Restrições de Responsabilidade**: Determinação de quando a intervenção humana é obrigatória
- **Restrições de Auditabilidade**: Requisitos de rastreabilidade e explicabilidade

### A Especificação Negativa

A **especificação negativa** é uma técnica emergente que define explicitamente o que um sistema NÃO deve fazer. Diferente da abordagem tradicional que foca em comportamentos desejados, a especificação negativa é crucial para sistemas com IA porque:

1. **Previne Alucinações**: Define fronteiras claras além das quais o sistema não deve especular
2. **Estabelece Circuit Breakers**: Identifica condições que devem interromper a operação autônoma
3. **Define Fallbacks**: Especifica comportamentos de degradação graciosa
4. **Garante Compliance**: Assegura conformidade com regulamentações e políticas organizacionais

Exemplo de especificação negativa:

```
RESTRICAO-R001: O sistema NÃO DEVE:
- Fornecer diagnósticos médicos sem revisão humana
- Processar dados PII de menores de 13 anos
- Realizar transações financeiras acima de $10.000 sem aprovação
- Gerar código para sistemas de controle de infraestrutura crítica
```

## Categorias de Restrições para Sistemas com IA

### Restrições Funcionais vs. Restrições de Comportamento

**Restrições Funcionais** limitam o que o sistema pode produzir:
- Formatos de saída permitidos
- APIs e bibliotecas autorizadas
- Padrões de código obrigatórios
- Regras de negócio invioláveis

**Restrições de Comportamento** limitam como o sistema opera:
- Níveis de confiança mínimos para ações autônomas
- Limites de latência para respostas
- Políticas de retry e timeout
- Estratégias de fallback

### Restrições de Qualidade de Serviço (QoS)

As restrições de QoS em sistemas com IA incluem dimensões tradicionais e novas:

| Dimensão | Métrica Tradicional | Métrica para IA |
|----------|---------------------|-----------------|
| **Performance** | Tempo de resposta | Tokens por segundo, latência de inferência |
| **Confiabilidade** | Uptime | Taxa de alucinações detectadas |
| **Precisão** | Taxa de erro | Coerência semântica, factualidade |
| **Escalabilidade** | Throughput | Custo por token, eficiência de cache |

Trabalhos sobre integrações entre LLMs e programacao por restricoes (Constraint Programming) sugerem abordagens para traduzir descricoes em modelos formais e checar solucoes [2]. A aplicabilidade depende de dominio, custo de modelagem e disponibilidade de verificadores.

### Restrições de Segurança e Governança

**Restrições de Segurança**:
- Prevenção de injeção de prompts
- Sanitização de inputs não confiáveis
- Isolamento de execução de código gerado
- Validação de saídas antes de execução

**Restrições de Governança**:
- Rastreabilidade de decisões automatizadas
- Registro de auditoria para ações críticas
- Conformidade com LGPD/GDPR
- Transparência em decisões algorítmicas

## O Papel do Contexto

### Contexto como Fronteira de Domínio

O **contexto** em sistemas com IA é mais do que informação de background — é a definição explícita do domínio de competência do sistema. Um contexto bem definido:

1. **Limita o Escopo**: Define claramente onde o sistema é competente
2. **Previne Generalizações Inadequadas**: Evita que o sistema aplique conhecimento fora de seu domínio
3. **Facilita a Validação**: Permite verificar se as saídas são contextualmente apropriadas
4. **Habilita Degradação Graciosa**: Permite fallback quando o contexto é insuficiente

### Elicitacao de Contexto

A elicitação de contexto vai além da elicitação tradicional de requisitos. Envolve:

- **Mapeamento de Conhecimento Tácito**: Identificar expertise implícita nos especialistas de domínio
- **Definição de Fronteiras**: Estabelecer limites claros do que está dentro e fora do escopo
- **Identificação de Casos Limite**: Mapear situações ambíguas ou não cobertas
- **Documentação de Raciocínio**: Capturar não apenas o "o quê", mas o "porquê" das decisões

### Contexto Dinamico vs. Estatico

**Contexto Estático**: Definido em tempo de design, raramente muda
- Regras de negócio fundamentais
- Restrições regulatórias
- Padrões arquiteturais obrigatórios

**Contexto Dinâmico**: Evolui durante a operação
- Estado da conversa/conversação
- Preferências do usuário
- Condições operacionais do sistema
- Aprendizados de interações anteriores

## Implicacoes Economicas

### O Paradoxo de Jevons na Engenharia de Software (analogia)

O Paradoxo de Jevons sugere que aumentos de eficiência podem levar a aumentos no consumo total. Na engenharia de software com IA:

- **Custo de Geração**: Diminui drasticamente (código gerado em segundos)
- **Custo de Verificação**: Aumenta significativamente (exige expertise sênior)
- **Custo Total de Propriedade (TCO)**: Pode aumentar se a governança for inadequada

### 1.4.2 Nova Curva de Valor

A curva de valor da engenharia de software está se transformando:

```
Valor
  │
  │        ┌─────────────────────────────────────┐
  │       ╱  Valor da Verificação e Governança  ╲
  │      ╱                                        ╲
  │     ╱                                          ╲
  │    ╱                                            ╲
  │   ╱  Valor da Codificação Manual                ╲
  │  ╱                                                ╲
  │ ╱                                                  ╲
  └────────────────────────────────────────────────────────►
       2020      2023      2025      2027      2030
                    Ano
```

## Transicao do SWEBOK v4.0

### O Que Permanece Relevante

Do SWEBOK v4.0 [3], mantemos:
- A importância da comunicação entre stakeholders
- A necessidade de especificação precisa e não ambígua
- A gestão de conflitos entre requisitos
- A rastreabilidade ao longo do ciclo de vida

### O Que Evolui

| Conceito v4.0 | Evolução para v5.0 |
|---------------|-------------------|
| Requisitos Funcionais | Restrições de Comportamento Permitido |
| Requisitos Não-Funcionais | Restrições de Qualidade e Governança |
| Elicitação de Requisitos | Elicitação de Contexto e Intenção |
| Validação de Requisitos | Verificação de Conformidade Semântica |

### LEGADO: Praticas em Declinio

As seguintes práticas são marcadas como **LEGADO**:
- Documentação extensiva de especificação funcional detalhada
- Modelagem UML exaustiva antes da implementação
- Processos de aprovação de requisitos que não consideram velocidade de geração de IA

## Practical Considerations

### Quando Aplicar Engenharia de Restrições

A abordagem de restrições é particularmente crítica quando:

1. **Sistemas de Missão Crítica**: Onde falhas têm consequências severas
2. **Domínios Regulamentados**: Healthcare, finance, aeroespacial
3. **Sistemas Autônomos**: Onde a IA toma decisões sem supervisão imediata
4. **Integração com Legado**: Onde novos componentes de IA interagem com sistemas existentes

### Anti-Padrões a Evitar

1. **Restrições Vagas**: "O sistema deve ser seguro" sem definição mensurável
2. **Restrições em Conflito**: Regras que se contradizem em cenários específicos
3. **Restrições Não Verificáveis**: Impossíveis de testar ou auditar
4. **Restrições em Excesso**: Tantos limites que inibem a utilidade do sistema

### Ferramentas Emergentes

Esta secao descreve categorias de suporte (nao uma lista prescritiva de ferramentas):

- Integracoes LLM + verificador/solver (por exemplo, Constraint Programming)
- Geracao/cheque de especificacoes formais a partir de linguagem natural (tema de pesquisa)
- Geracao de codigo com provas ou evidencias verificaveis (tema de pesquisa)

## Summary

- A Engenharia de Restrições e Contexto representa uma mudança de paradigma da era dos LLMs
- O foco deslocou-se de "o que construir" para "o que NÃO deixar construir"
- Restrições incluem limites funcionais, de comportamento, QoS, segurança e governança
- O contexto define as fronteiras de competência do sistema e previne alucinações
- A especificação negativa é uma técnica essencial para sistemas com IA
- O custo de verificação tornou-se o novo gargalo na engenharia de software

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** - Conceitos fundamentais para era dos LLMs |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** - Exige expertise sênior para validação de restrições críticas |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítico** - Engenheiros responsáveis por restrições e governança |

## References

1. Formal requirements engineering and large language models: A two-way street. Information and Software Technology, v. 181, 2025.
2. MCP-Solver: Integrating Language Models with Constraint Programming Systems. arXiv, 2024. Disponivel em: https://arxiv.org/abs/2501.00539
3. IEEE COMPUTER SOCIETY. Guide to the Software Engineering Body of Knowledge (SWEBOK), Version 4.0. 2024.
4. Leveraging LLMs for Formal Software Requirements: Challenges and Prospects. arXiv, 2025. Disponivel em: https://arxiv.org/abs/2507.14330
5. VeriGuard: Enhancing LLM Agent Safety via Verified Code Generation. arXiv, 2025. Disponivel em: https://arxiv.org/abs/2510.05156
6. Research directions for using LLM in software requirement engineering. Frontiers in Computer Science, 2025.

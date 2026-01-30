# Seção 1: Fundamentos da Engenharia de Restrições

## Overview

Esta seção introduz a Engenharia de Restrições como reinterpretação AI-first da engenharia de requisitos: quando a geração de código torna-se barata, o trabalho crítico passa a ser definir limites verificáveis para evitar comportamentos incorretos, inseguros ou não-auditáveis.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar por que a abundância de geração desloca o gargalo para verificação e contenção
2. Definir Engenharia de Restrições e distinguir requisitos (positivos) de restrições (negativas)
3. Classificar restrições em funcionais, não-funcionais e arquiteturais, com exemplos verificáveis
4. Aplicar princípios de especificidade negativa, minimização de superfície e verificabilidade contínua

## 1.1 Introdução: A Inversão de Paradigma

A Engenharia de Software tradicional operava sob uma premissa fundamental: o código é escasso e valioso. O engenheiro de software era, primariamente, um tradutor — convertendo necessidades de stakeholders em instruções precisas para máquinas. O gargalo estava na produção: escrever código correto, eficiente e mantenível exigia expertise e tempo significativos.

Na era dos Large Language Models (LLMs), essa premissa foi invertida. A capacidade de gerar código funcional tornou-se commodity. O gargalo não é mais a produção, mas a contenção. O desafio central migra de "como construir" para "o que NÃO deixar construir".

### 1.1.1 A Comoditização da Geração de Código

A comoditização da geração de código representa uma mudança estrutural na engenharia de software. Sistemas de IA generativa podem:

- Produzir milhares de linhas de código funcional em segundos
- Implementar padrões de design complexos com mínimo contexto
- Gerar múltiplas soluções para um mesmo problema
- Adaptar código entre linguagens e paradigmas instantaneamente

Esta capacidade, embora revolucionária, introduz um novo conjunto de riscos:

| Risco | Descrição | Mitigação |
|-------|-----------|-----------|
| Alucinação Arquitetural | Geração de código que compila mas viola princípios fundamentais | Especificação de invariantes arquiteturais |
| Degradação Semântica | Código que passa em testes mas não satisfaz intenção real | Contratos formais de comportamento |
| Explosão Combinatória | Múltiplas soluções viáveis sem critério de seleção | Restrições de domínio explícitas |
| Débito Técnico Acelerado | Código funcional mas não sustentável | Limites de complexidade ciclomática |

### 1.1.2 Definição da Engenharia de Restrições

**Engenharia de Restrições** é a disciplina de definir, documentar, validar e governar limites dentro dos quais sistemas autônomos de software devem operar. Diferente da engenharia de requisitos tradicional, que foca no que o sistema deve fazer, a engenharia de restrições foca no que o sistema não pode fazer.

Os três pilares fundamentais são:

```
┌─────────────────────────────────────────────────────────────┐
│           ENGENHARIA DE RESTRIÇÕES                          │
├───────────────┬─────────────────────┬───────────────────────┤
│   NEGATIVA    │     CONTEXTUAL      │      EVOLUTIVA        │
│   Específica  │     Específica      │      Específica       │
│   o que NÃO   │     limitações de   │      adaptação de     │
│   fazer       │     domínio e       │      restrições       │
│               │     ambiente        │      ao longo do      │
│               │                     │      tempo            │
└───────────────┴─────────────────────┴───────────────────────┘
```

## 1.2 Taxonomia de Restrições

### 1.2.1 Restrições Funcionais

Restrições funcionais limitam comportamentos que o sistema pode exibir. São expressões de proibição sobre operações ou estados.

**Características:**
- Expressas em termos de precondições e pós-condições negativas
- Podem ser verificadas através de análise estática ou runtime
- Mapeiam diretamente para casos de teste negativos

**Exemplos:**
- "O sistema NÃO DEVE processar transações sem autenticação válida"
- "O sistema NÃO DEVE expor dados de um tenant para outro"
- "O sistema NÃO DEVE executar código gerado sem validação de segurança"

### 1.2.2 Restrições Não-Funcionais

Restrições não-funcionais estabelecem limites quantitativos ou qualitativos sobre atributos do sistema.

**Categorias principais:**

| Categoria | Métrica | Exemplo de Restrição |
|-----------|---------|---------------------|
| Performance | Latência, Throughput | Latência p95 > 200ms em qualquer endpoint |
| Segurança | CVEs, Acesso | Uso de funções obsoletas de criptografia |
| Confiabilidade | MTBF, MTTR | Taxa de erro > 0.01% em operações críticas |
| Compliance | Regulamentações | Processamento de dados PII sem consentimento |
| Sustentabilidade | Carbono, Energia | Consumo energético acima de baseline |

### 1.2.3 Restrições Arquiteturais

Restrições arquiteturais governam estruturas e padrões que devem ser preservados ou evitados.

**Tipos comuns:**
- **Acoplamento**: Proibição de dependências diretas entre camadas
- **Coesão**: Limites de responsabilidade por módulo
- **Ciclos**: Proibição de dependências circulares
- **Complexidade**: Limites de complexidade ciclomática ou cognitiva

## 1.3 Princípios Fundamentais

### 1.3.1 Princípio da Especificidade Negativa

> *"Uma restrição bem formulada é aquela que, se violada, resulta em um estado identificável e mensurável."*

Restrições devem ser expressas de forma negativa para permitir verificação objetiva. Uma restrição como "o sistema deve ser seguro" não é verificável; "o sistema NÃO DEVE aceitar senhas menores que 12 caracteres" é.

### 1.3.2 Princípio da Minimização de Superfície

O conjunto de restrições deve ser mínimo e suficiente. Restrições excessivas:
- Limitam a capacidade geracional dos LLMs desnecessariamente
- Aumentam o custo de manutenção
- Podem introduzir contradições lógicas

### 1.3.3 Princípio da Verificabilidade Contínua

Toda restrição deve ser verificável em tempo de desenvolvimento, integração ou execução. Restrições que não podem ser verificadas automaticamente tendem a ser violadas silenciosamente.

## 1.4 Relação com a Engenharia de Requisitos Clássica

### 1.4.1 Continuidade e Ruptura

A Engenharia de Restrições não substitui, mas estende a engenharia de requisitos clássica:

| Aspecto | Requisitos Clássicos | Restrições Modernas |
|---------|---------------------|---------------------|
| Foco | Funcionalidade | Limitação |
| Direção | Positiva (fazer) | Negativa (não fazer) |
| Audiência | Desenvolvedores | Sistemas autônomos |
| Verificação | Testes de aceitação | Análise contínua |
| Evolução | Incremental | Adaptativa |

### 1.4.2 Integração Prática

Em projetos reais, ambos os paradigmas coexistem:

1. **Elicitação conjunta**: Identificar necessidades E limitações simultaneamente
2. **Especificação complementar**: Requisitos definem funcionalidade; restrições definem fronteiras
3. **Validação integrada**: Verificar conformidade com ambos os conjuntos

## 1.5 Considerações para Sistemas com IA

### 1.5.1 Especificação para LLMs

Ao especificar restrições para consumo por LLMs, considere:

- **Precisão contextual**: Fornecer contexto suficiente para interpretação correta
- **Exemplificação**: Incluir exemplos de violações quando possível
- **Priorização**: Ordenar restrições por criticidade
- **Rastreabilidade**: Vincular restrições a objetivos de negócio ou riscos

### 1.5.2 Ciclo de Feedback

Restrições para sistemas com IA devem incorporar mecanismos de feedback:

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Especificar │───▶│   Gerar      │───▶│   Verificar  │
│  Restrições  │    │   Código     │    │   Conformidade│
└──────────────┘    └──────────────┘    └──────┬───────┘
       ▲                                         │
       └─────────────────────────────────────────┘
                    Feedback de Violação
```

## Practical Considerations

- Escreva restrições como proibições mensuráveis (negativas) e conecte cada uma a um mecanismo de verificação (teste, análise estática, monitoramento ou controle de acesso).
- Trate restrições como artefatos versionáveis: elas evoluem com o domínio, com mudanças regulatórias e com novas classes de falha introduzidas por automação.
- Priorize por risco e irreversibilidade: quanto maior o impacto de uma violação, mais cedo e mais automaticamente a restrição deve ser verificada.
- Evite restrições “aspiracionais” não verificáveis (ex.: “o sistema deve ser seguro”); reescreva em termos de condições observáveis.

## Summary

- A engenharia de requisitos, na era de LLMs, precisa incorporar contenção: definir o que o sistema não pode fazer.
- Restrições eficazes são negativas, mensuráveis e continuamente verificáveis.
- Uma taxonomia simples (funcionais, não-funcionais, arquiteturais) ajuda a cobrir riscos recorrentes.
- O objetivo não é reduzir geração, mas reduzir variabilidade e falhas silenciosas no que é gerado.

## References

1. MEYER, B. Applying "Design by Contract". IEEE Computer, 1992.
2. LEAVENS, G. T. et al. JML Reference Manual. Iowa State University, 2013.
3. WING, J. M. A Specifier's Introduction to Formal Methods. IEEE Computer, 1990.
4. AMODEI, D. et al. Concrete Problems in AI Safety. arXiv:1606.06565, 2016. Disponível em: https://arxiv.org/abs/1606.06565. Acesso em: 30 jan. 2026.

---

*SWEBOK-AI v5.0 - Software Requirements*

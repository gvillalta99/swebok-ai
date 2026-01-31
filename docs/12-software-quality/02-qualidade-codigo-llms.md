---
title: "Qualidade de Código Gerado por LLMs"
created_at: "2026-01-31"
tags: ["software-quality", "llm", "code-quality", "code-smells", "analise-estatica", "metricas"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 2. Qualidade de Código Gerado por LLMs

## Overview

Esta seção aborda as métricas, padrões e análises específicas para avaliar código gerado por Large Language Models (LLMs). Enquanto métricas tradicionais de qualidade de código (complexidade ciclomática, duplicação, cobertura) permanecem relevantes, código gerado por IA apresenta padrões de defeitos distintos que exigem adaptações e novas categorias de análise.

O foco desloca-se de "medir qualidade de código humano" para "detectar artefatos específicos de geração automática, avaliar qualidade de prompts e estabelecer benchmarks comparativos entre modelos."

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Aplicar métricas tradicionais adaptadas para código gerado por LLMs
2. Identificar e classificar code smells específicos de código de IA
3. Avaliar a relação entre qualidade de prompts e qualidade de código gerado
4. Implementar análise estática efetiva para código sintético
5. Interpretar benchmarks de qualidade para comparação entre LLMs

## 2.1 Métricas Tradicionais Adaptadas

### 2.1.1 Complexidade Ciclomática

**Métrica Tradicional:** Mede o número de caminhos independentes através do código. Thresholds convencionais:
- 1-10: Baixa complexidade (bom)
- 11-20: Complexidade moderada
- 21-50: Complexidade alta (refatorar)
- >50: Complexidade muito alta (testar extensivamente)

**Adaptação para Código de IA:**

| Complexidade | Interpretação Tradicional | Interpretação Código IA |
|--------------|---------------------------|-------------------------|
| < 5 | Excelente | **Suspeito** — pode ser excessivamente simplificado |
| 5-15 | Bom | Adequado |
| 15-25 | Moderado | Aceitável com justificativa |
| > 25 | Alto risco | Requer revisão cuidadosa |

**Racional:** Código gerado por IA frequentemente apresenta complexidade anormalmente baixa devido a:
- Falta de tratamento adequado de edge cases
- Uso de bibliotecas sem compreensão profunda
- Soluções "ingênuas" que não consideram cenários complexos

### 2.1.2 Duplicação de Código

**Dados Empíricos:**
- Código gerado por IA apresenta **4x mais duplicação** que código humano (GitClear, 2025)
- "Copy/paste" de código excedeu "moved code" pela primeira vez na história (GitClear, 2025)

**Thresholds Adaptados:**

| Contexto | Threshold Tradicional | Threshold Código IA |
|----------|----------------------|---------------------|
| Novo projeto | 5% | **3%** |
| Projeto legado | 7% | **5%** |
| Código crítico | 3% | **2%** |

**Tipos de Duplicação Específicos de IA:**

1. **Duplicação de Templates:**
   ```python
   # Padrão repetido em múltiplas funções geradas
   def funcao_a():
       try:
           # ... código ...
       except Exception as e:
           print(f"Erro: {e}")
           return None
   
   def funcao_b():
       try:
           # ... código diferente ...
       except Exception as e:
           print(f"Erro: {e}")  # Mesmo padrão
           return None
   ```

2. **Duplicação de Imports:**
   - Importação de bibliotecas não utilizadas
   - Imports duplicados em arquivos diferentes
   - Imports desnecessários "por precaução"

3. **Duplicação Semântica:**
   - Código com funcionalidade similar mas sintaxe diferente
   - Difícil de detectar por ferramentas tradicionais

### 2.1.3 Code Churn

**Definição:** Taxa de modificação de código ao longo do tempo.

**Padrões em Código de IA:**

| Padrão | Indicação | Ação Recomendada |
|--------|-----------|------------------|
| Churn alto inicial | Instabilidade da solução | Revisar arquitetura |
| Churn crescente | Débito técnico acumulado | Refatorar |
| Churn baixo + bugs | Solução frágil | Testes adicionais |
| Churn concentrado | Problemas em módulo específico | Análise focada |

**Dados:** O percentual de linhas de código associadas a refatoração caiu de 25% (2021) para menos de 10% (2024) em projetos com assistentes de IA (GitClear, 2025).

### 2.1.4 Cobertura de Testes

**Limitações em Código de IA:**

Cobertura de testes tradicional é **necessária mas não suficiente** para código gerado por IA porque:

1. **Testes não capturam comportamento estocástico:**
   - Código pode passar em testes mas falhar em execuções reais
   - Edge cases podem não ser cobertos

2. **Testes gerados por IA podem ser inválidos:**
   - Asserções que sempre passam
   - Testes que não verificam comportamento correto
   - Mock excessivo que esconde problemas

**Métricas Complementares:**

| Métrica | Descrição | Threshold |
|---------|-----------|-----------|
| Cobertura de Linha | % de linhas executadas | > 80% |
| Cobertura de Branch | % de branches executados | > 70% |
| Cobertura de Mutação | % de mutantes detectados | > 60% |
| Consistência de Teste | Variação entre execuções | < 5% |
| Taxa de Falsos Positivos | Testes que passam incorretamente | < 2% |

## 2.2 Code Smells Específicos de Código de IA

### 2.2.1 Catálogo de Code Smells de IA

Pesquisas recentes (2024-2025) identificaram padrões recorrentes de problemas em código gerado por LLMs:

#### 1. AI Verbosity (Verbosidade de IA)

**Descrição:** Código excessivamente longo com implementações desnecessariamente complexas.

**Sintomas:**
- Funções com múltiplos níveis de aninhamento
- Uso excessivo de padrões de design quando soluções simples bastam
- Código "defensivo" em excesso

**Exemplo:**
```python
# ANTI-PADRÃO: Verbosidade excessiva
def processar_dados(dados):
    if dados is not None:
        if isinstance(dados, list):
            if len(dados) > 0:
                resultado = []
                for item in dados:
                    if item is not None:
                        resultado.append(item)
                return resultado
    return []

# MELHOR: Conciso e idiomático
def processar_dados(dados):
    return [item for item in (dados or []) if item is not None]
```

**Detecção:**
- Linhas de código por função > 50
- Nesting depth > 4
- Ratio comentários/código > 0.5

#### 2. Defensive Overkill (Excesso de Defesa)

**Descrição:** Tratamento excessivo de edge cases improváveis.

**Sintomas:**
- Verificações de tipo redundantes
- Try-catch em operações seguras
- Validações de inputs já validados

**Impacto:**
- Código difícil de ler
- Performance degradada
- Falsa sensação de segurança

#### 3. Inconsistent Abstraction (Abstração Inconsistente)

**Descrição:** Mistura de estilos e níveis de abstração.

**Sintomas:**
- Uso misto de paradigmas (OO e funcional)
- Nomes de variáveis inconsistentes
- Padrões arquiteturais conflitantes

**Causa:** IA não mantém contexto de estilo do projeto ao longo de múltiplas gerações.

#### 4. Hallucinated Dependencies (Dependências Alucinadas)

**Descrição:** Imports ou uso de bibliotecas inexistentes.

**Sintomas:**
- `import` de módulos que não existem
- Uso de APIs fictícias
- Versões incompatíveis

**Exemplo:**
```python
# DEPENDÊNCIA ALUCINADA
import pandas_ml  # Não existe
from sklearn.supervised import MagicClassifier  # API fictícia
```

**Prevenção:**
- Análise estática de imports
- Verificação em ambiente isolado
- Lista de dependências aprovadas

#### 5. Pattern Amnesia (Amnésia de Padrões)

**Descrição:** Código que não segue padrões estabelecidos do projeto.

**Sintomas:**
- Convenções de nomenclatura diferentes
- Estrutura de diretórios inconsistente
- Padrões de erro não padronizados

**Mitigação:**
- Fornecer exemplos de código do projeto no contexto
- Usar linting rigoroso
- Revisão focada em consistência

#### 6. Comment Overcompensation (Compensação por Comentários)

**Descrição:** Código confuso compensado por comentários excessivos.

**Sintomas:**
- Comentários explicam o óbvio
- Comentários desatualizados
- Código não autoexplicativo

**Princípio:** Comentários devem explicar "por quê", não "o quê".

#### 7. Mock Explosion (Explosão de Mocks)

**Descrição:** Testes com mocks excessivos que não testam comportamento real.

**Sintomas:**
- Testes que passam mesmo com código quebrado
- Mocks de funções internas
- Falta de testes de integração

### 2.2.2 Detecção Automatizada

**Ferramentas e Técnicas:**

| Ferramenta | Capacidade | Limitação |
|------------|------------|-----------|
| SonarQube | Smells tradicionais + alguns de IA | Não detecta dependências alucinadas |
| CodeQL | Análise semântica profunda | Requer configuração especializada |
| ESLint/Pylint | Estilo e padrões | Limitado a regras definidas |
| IA de Análise | Padrões contextuais | Pode ter falsos positivos |

**Recomendação:** Combinar análise estática tradicional com revisão humana focada em smells de IA.

## 2.3 Qualidade de Prompts e sua Relação com Qualidade de Código

### 2.3.1 O Prompt como Requisito

Em sistemas híbridos, o prompt funciona como especificação de requisitos. Sua qualidade diretamente impacta a qualidade do código gerado.

**Hierarquia de Qualidade de Prompt:**

```
Nível 5: Prompt Estruturado com Contexto
├── Especificação clara de requisitos
├── Contexto do projeto fornecido
├── Exemplos de código existente
├── Restrições explícitas
└── Critérios de aceitação

Nível 4: Prompt com Contexto
├── Requisitos claros
├── Contexto parcial
└── Algumas restrições

Nível 3: Prompt Específico
├── Requisitos definidos
└── Sem contexto adicional

Nível 2: Prompt Vago
├── Intenção geral
└── Detalhes omitidos

Nível 1: Prompt Ambíguo
└── Instruções imprecisas
```

### 2.3.2 Elementos de Prompts de Alta Qualidade

**1. Especificação Clara:**
```
RUIM: "Crie uma função para processar dados"
BOM: "Implemente uma função Python que receba uma lista de dicionários 
      com campos 'nome' e 'idade', filtre registros com idade > 18, 
      e retorne uma lista ordenada por nome"
```

**2. Contexto do Projeto:**
```
INCLUIR:
- Framework utilizado
- Padrões de código existentes
- Estrutura de diretórios
- Convenções de nomenclatura
```

**3. Restrições Explícitas:**
```
ESPECIFICAR:
- Complexidade máxima aceitável
- Bibliotecas permitidas/proibidas
- Requisitos de performance
- Padrões de erro
```

**4. Exemplos (Few-Shot):**
```
FORNECER:
- Exemplos de código similar no projeto
- Padrões de implementação
- Casos de uso esperados
```

### 2.3.3 Métricas de Qualidade de Prompt

| Métrica | Descrição | Threshold |
|---------|-----------|-----------|
| Especificidade | Grau de detalhamento | > 80% dos requisitos cobertos |
| Contextualidade | Informação de projeto incluída | Contexto completo fornecido |
| Restritividade | Limitações claras | ≥ 3 restrições explícitas |
| Exemplificação | Presença de exemplos | ≥ 1 exemplo relevante |
| Testabilidade | Critérios de aceitação definidos | Testes passíveis de automação |

## 2.4 Análise Estática para Código Sintético

### 2.4.1 Adaptações Necessárias

Ferramentas de análise estática tradicionais precisam de adaptações para código de IA:

**1. Thresholds Mais Rigorosos:**
- Duplicação: 3% vs 5%
- Complexidade: Alerta em valores anormalmente baixos
- Comentários: Verificar se são compensação por código confuso

**2. Novas Regras:**
- Detecção de dependências alucinadas
- Identificação de inconsistências de estilo
- Verificação de tratamento de exceções excessivo

**3. Análise de Contexto:**
- Comparação com código existente do projeto
- Verificação de aderência a padrões
- Detecção de "AI fingerprints"

### 2.4.2 Pipeline de Análise Estática

```
┌─────────────────────────────────────────────────────────────┐
│              PIPELINE DE ANÁLISE ESTÁTICA                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. ANÁLISE SINTÁTICA                                       │
│     ├── Parsing do código                                   │
│     ├── Verificação de sintaxe                            │
│     └── Detecção de erros de compilação                   │
│                                                             │
│  2. ANÁLISE DE ESTILO                                       │
│     ├── Linting (PEP8, ESLint, etc.)                      │
│     ├── Formatação                                          │
│     └── Convenções de nomenclatura                        │
│                                                             │
│  3. ANÁLISE DE MÉTRICAS                                     │
│     ├── Complexidade ciclomática                          │
│     ├── Duplicação                                          │
│     └── Tamanho de funções/classes                        │
│                                                             │
│  4. ANÁLISE DE SMELLS                                       │
│     ├── Smells tradicionais                               │
│     ├── Smells específicos de IA                          │
│     └── Análise de dependências                           │
│                                                             │
│  5. ANÁLISE DE SEGURANÇA                                    │
│     ├── Vulnerabilidades conhecidas                       │
│     ├── Práticas inseguras                                │
│     └── Injeção de código                                 │
│                                                             │
│  6. ANÁLISE DE CONTEXTO                                     │
│     ├── Consistência com codebase                         │
│     ├── Aderência a padrões                               │
│     └── Verificação de imports                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.4.3 Ferramentas Recomendadas

**Análise Geral:**
- SonarQube/SonarCloud
- Code Climate
- DeepSource

**Análise Específica para IA:**
- Sonar AI Code Assurance (2025)
- Ferramentas customizadas com regras específicas

**Integração:**
- Pre-commit hooks
- CI/CD pipeline
- IDE plugins

## 2.5 Benchmarks de Qualidade para Código Gerado

### 2.5.1 Benchmarks Acadêmicos

**HumanEval (OpenAI):**
- 164 problemas de programação
- Foco em Python
- Métrica: pass@k (taxa de soluções corretas)

**MBPP (Mostly Basic Python Problems):**
- 974 problemas
- Maior variedade de dificuldade
- Inclui testes

**DS-1000:**
- Problemas de ciência de dados reais
- Foco em bibliotecas populares (pandas, numpy)

### 2.5.2 Métricas de Benchmark

| Métrica | Descrição | Interpretação |
|---------|-----------|---------------|
| pass@1 | Taxa de acerto na primeira tentativa | Qualidade "zero-shot" |
| pass@10 | Taxa de acerto em 10 tentativas | Qualidade com múltiplas chances |
| pass@100 | Taxa de acerto em 100 tentativas | Potencial máximo |
| Consistency | Variabilidade entre execuções | Estabilidade |
| Efficiency | Performance computacional | Qualidade de implementação |

### 2.5.3 Resultados Comparativos (2024-2025)

**Estudo Comparativo (ISSRJ, 2025):**
Avaliação de ChatGPT, Copilot, Claude e Gemini em 40 problemas LeetCode:

| Modelo | Correção | Legibilidade | Eficiência |
|--------|----------|--------------|------------|
| ChatGPT | 42.5% | 82% | 78% |
| Copilot | 30.0% | 79% | 75% |
| Claude | - | - | - |
| Gemini | - | - | - |

**Nota:** Diferenças estatísticas entre ChatGPT e Copilot não foram significativas.

**Estudo de Escala (GitClear, 2025):**
Análise de 153M+ linhas de código:

| Métrica | Código Humano | Código IA | Variação |
|---------|---------------|-----------|----------|
| Duplicação | ~5% | ~20% | +4x |
| Refatoração | 25% | <10% | -60% |
| Churn | Baseline | +15% | +15% |

### 2.5.4 Limitações de Benchmarks

1. **Foco em Problemas Algorítmicos:** Não refletem desenvolvimento real
2. **Falta de Contexto:** Benchmarks isolados vs. código integrado
3. **Métricas Limitadas:** Funcionalidade ≠ Qualidade de software
4. **Viés de Treinamento:** Modelos podem ter visto problemas durante treinamento

**Recomendação:** Usar benchmarks como indicador inicial, mas priorizar avaliação em projetos reais.

## Practical Considerations

### Aplicações Reais

**Caso 1: Implementação de Sonar AI Code Assurance**
- Empresa enterprise implementou quality gates específicos para IA
- Redução de 35% em débito técnico invisível
- Aumento de 20% no tempo de revisão
- Melhoria na confiança de stakeholders

**Caso 2: Customização de Regras de Linting**
- Time adicionou regras específicas para detectar smells de IA
- Detecção automática de 60% dos problemas
- Foco da revisão humana em aspectos arquiteturais

**Caso 3: Benchmark Interno**
- Empresa criou benchmark com problemas reais do domínio
- Avaliação contínua de diferentes modelos
- Tomada de decisão baseada em dados

### Limitações

1. **Ferramentas em Evolução:** Suporte a smells de IA ainda limitado
2. **Falsos Positivos:** Regras rigorosas podem gerar ruído
3. **Custo de Análise:** Pipelines complexos aumentam tempo de build
4. **Manutenção:** Regras customizadas requerem atualização

### Melhores Práticas

1. **Comece com regras básicas:** Não tudo de uma vez
2. **Envolva o time:** Definir thresholds em conjunto
3. **Monitore falsos positivos:** Ajustar regras conforme necessário
4. **Documente exceções:** Justificar quando ignorar regras
5. **Integre cedo:** Shift-left na pipeline

## Summary

- **Métricas tradicionais precisam de adaptação:** thresholds mais rigorosos para duplicação, alerta para complexidade anormalmente baixa
- **Code smells de IA são distintos:** verbosidade excessiva, dependências alucinadas, inconsistência de padrões, tratamento defensivo excessivo
- **Qualidade de prompts é crítica:** o prompt funciona como especificação de requisitos
- **Análise estática requer extensão:** novas regras para detectar artefatos de geração automática
- **Benchmarks têm limitações:** foco em problemas algorítmicos não reflete qualidade em projetos reais

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa** — métricas de qualidade evoluem mas fundamentos permanecem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — análise de código gerado requer múltiplas camadas de validação |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Alta** — engenheiros são responsáveis por código em produção, independente da origem |

## References

1. GitClear, "AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Cloning," GitClear Research, 2025.
2. Qodo, "State of AI Code Quality in 2025," Qodo Research Report, 2025.
3. SonarSource, "AI Code Assurance: Building Confidence in AI-Generated Code," SonarSource Blog, 2024.
4. ISSR Journal, "Evaluation of the Code Quality Generated by Generative AI," ISSRJ, 2025.
5. Chen et al., "Refining ChatGPT-Generated Code: Characterizing and Mitigating Code Quality Issues," ACM, 2024.
6. Chen et al., "Evaluating Large Language Models Trained on Code," arXiv:2107.03374, 2021.
7. Austin et al., "Program Synthesis with Large Language Models," arXiv:2108.07732, 2021.
8. McCabe, T., "A Complexity Measure," IEEE Transactions on Software Engineering, 1976.
9. Fowler, M., "Refactoring: Improving the Design of Existing Code," 2nd Edition, Addison-Wesley, 2018.
10. Martin, R., "Clean Code: A Handbook of Agile Software Craftsmanship," Prentice Hall, 2008.

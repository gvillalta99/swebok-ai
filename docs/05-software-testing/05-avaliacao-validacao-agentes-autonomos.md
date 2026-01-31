---
title: "5. Avaliação e Validação de Agentes Autônomos"
created_at: 2025-01-31
tags: ["testes", "testing", "ia"]
status: "published"
updated_at: 2026-01-31
ai_model: "openai/gpt-5.2"
---

# 5. Avaliação e Validação de Agentes Autônomos

## Overview

A emergência de agentes autônomos baseados em Large Language Models (LLMs) representa uma evolução qualitativa significativa na arquitetura de sistemas de software. Enquanto aplicações tradicionais de IA generativa operam em modo de resposta única — onde um prompt gera uma resposta completa em uma única interação — agentes autônomos implementam ciclos iterativos de percepção, raciocínio e ação que podem se estender por múltiplas rodadas, envolver ferramentas externas e produzir efeitos colaterais em ambientes computacionais reais.

Esta seção estabelece um framework comprehensivo para a avaliação e validação de agentes autônomos, reconhecendo que a complexidade destes sistemas transcende as técnicas de verificação aplicáveis a LLMs simples ou código gerado estáticamente. A validação de agentes autônomos deve considerar não apenas a corretude das saídas finais, mas a racionalidade das trajetórias de execução, a segurança do uso de ferramentas externas, a consistência das cadeias de raciocínio e a robustez em ambientes simulados que replicam condições de produção.

A distinção fundamental entre LLMs e agentes autônomos reside na capacidade destes últimos de:
- Manter estado persistente ao longo de sessões estendidas
- Invocar ferramentas externas (APIs, bancos de dados, interpretadores de código)
- Planejar e executar sequências de ações de múltiplos passos
- Adaptar estratégias com base em feedback de execução

Estas capacidades introduzem novas dimensões de risco que exigem abordagens de teste especializadas, incluindo a validação de chain-of-thought para detectar raciocínios falaciosos, a verificação de chamadas de função para prevenir operações destrutivas, e a avaliação de comportamentos emergentes que não podem ser preditos pela análise estática do código.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Distinguir arquiteturalmente entre LLMs e agentes autônomos**, identificando como ciclos de percepção-ação-raciocínio, uso de ferramentas e persistência de estado alteram fundamentalmente os requisitos de verificação.

2. **Implementar validação de chain-of-thought (CoT)**, aplicando técnicas de verificação step-by-step para detectar alucinações no processo de raciocínio e garantir a coerência lógica de trajetórias de execução.

3. **Projetar frameworks de teste para tool use**, incluindo estratégias de mocking, verificação de assinaturas de função, validação de parâmetros e testes de segurança para execução de código gerado por agents.

4. **Configurar ambientes de simulação para teste de agents**, estabelecendo sandboxes seguros, replicando cenários de produção, conduzindo testes de longa duração e aplicando chaos engineering para avaliar resiliência.

5. **Interpretar e aplicar benchmarks especializados de coding**, compreendendo as metodologias, métricas e limitações de evals como HumanEval, MBPP e SWE-bench, e reconhecendo a necessidade de desenvolver avaliações específicas por domínio.

## 5.1 Testes para Sistemas Agent-Based

### 5.1.1 Arquitetura de Agentes Autônomos

A arquitetura de um agente autônomo baseado em LLM fundamenta-se em um ciclo contínuo de percepção, raciocínio e ação (Perception-Reasoning-Action Cycle). Esta arquitetura distingue-se radicalmente de sistemas de processamento único pela introdução de componentes que permitem interação prolongada com ambientes externos e manutenção de estado contextual.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITETURA DE AGENTE AUTÔNOMO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│    ┌─────────────┐      ┌─────────────┐      ┌─────────────┐               │
│    │ Percepção   │─────▶│ Raciocínio  │─────▶│    Ação     │               │
│    │  (Input)    │      │  (LLM Core) │      │  (Output)   │               │
│    └─────────────┘      └──────┬──────┘      └──────┬──────┘               │
│           ▲                    │                    │                       │
│           │                    ▼                    ▼                       │
│           │           ┌─────────────┐      ┌─────────────┐                 │
│           │           │   Memória   │      │  Ferramentas │                │
│           │           │  (Contexto) │      │  (APIs/DBs)  │                │
│           │           └─────────────┘      └──────┬──────┘                 │
│           │                                       │                         │
│           └───────────────────────────────────────┘                         │
│                       (Feedback Loop)                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

Os componentes essenciais de um agente autônomo incluem:

**Motor de Raciocínio (Reasoning Engine)**: O núcleo do agente, tipicamente um LLM, responsável por interpretar entradas, gerar planos de ação e tomar decisões. Este componente pode utilizar diversas estratégias de raciocínio, incluindo chain-of-thought, tree-of-thoughts e reflexão iterativa.

**Sistema de Memória**: Componente que mantém estado contextual ao longo de sessões. A memória pode ser:
- **Memória de Curto Prazo**: Contexto imediato da conversa (limitada pela janela de contexto do LLM)
- **Memória de Longo Prazo**: Informações persistentes armazenadas em bases de conhecimento vetoriais ou bancos de dados

**Interface de Ferramentas (Tool Interface)**: Mecanismo que permite ao agente invocar funções externas, APIs, executar código ou interagir com sistemas externos. Esta interface é crítica para a ampliação das capacidades do agente além do conhecimento paramétrico do LLM.

**Orquestrador de Execução**: Controla o fluxo de execução, determinando quando o agente deve continuar raciocinando, quando deve invocar uma ferramenta e quando deve finalizar uma tarefa.

### 5.1.2 Diferença entre LLM Simples e Agentes Autônomos

| Dimensão | LLM Simples | Agente Autônomo |
|----------|-------------|-----------------|
| **Interação** | Única resposta por prompt | Múltiplas rodadas de percepção-ação |
| **Estado** | Stateless (cada chamada independente) | Stateful (memória persistente de sessão) |
| **Ferramentas** | Não acessa recursos externos | Invoca APIs, executa código, consulta bases de dados |
| **Raciocínio** | Single-step | Multi-step com planejamento e replanejamento |
| **Efeitos Colaterais** | Nenhum (output puramente textual) | Pode modificar estado de sistemas externos |
| **Critério de Término** | Conclusão da geração | Condição de meta atingida ou limite de iterações |
| **Observabilidade** | Input/Output | Trajetória completa (thoughts, actions, observations) |

Esta diferenciação tem implicações profundas para estratégias de teste. Enquanto um LLM simples pode ser validado através de oráculos de saída — comparando a resposta gerada com uma referência esperada — um agente autônomo requer avaliação de toda a trajetória de execução, incluindo a sequência de raciocínios, a escolha de ferramentas e a evolução do estado interno.

### 5.1.3 Ciclos de Percepção-Ação-Raciocínio

O ciclo de execução de um agente autônomo segue um padrão iterativo:

```
1. PERCEPÇÃO: Receber input do usuário ou observação do ambiente
      ↓
2. RACIOCÍNIO: Gerar chain-of-thought sobre como abordar a tarefa
      ↓
3. DECISÃO: Determinar próxima ação (responder diretamente ou usar ferramenta)
      ↓
4. EXECUÇÃO: Executar ação (gerar resposta ou invocar ferramenta)
      ↓
5. OBSERVAÇÃO: Receber resultado da ação (para ferramentas)
      ↓
6. AVALIAÇÃO: Decidir se meta foi atingida ou se continuar ciclo
      ↓
   [Se não atingida] → Retornar ao passo 2
   [Se atingida] → Finalizar e retornar resultado
```

Cada iteração deste ciclo representa um **passo de agente (agent step)**. A validação deve considerar:

**Critérios de Término**: O agente deve ser capaz de determinar autonomamente quando uma tarefa está completa. Testes devem verificar se o agente:
- Para corretamente após atingir a meta
- Não entra em loops infinitos
- Respeita limites máximos de iterações
- Detecta impossibilidade de completar a tarefa

**Qualidade do Raciocínio Intermediário**: Cada passo de raciocínio deve demonstrar:
- Coerência com o estado atual do problema
- Progresso tangível em direção à meta
- Ausência de contradições com passos anteriores
- Utilização adequada de informações de observações

**Eficiência da Trajetória**: Métricas de eficiência incluem:
- Número de passos para completar tarefa (comparado a baseline humano)
- Quantidade de chamadas de ferramentas (custo computacional)
- Redundância de ações (ações que não contribuem para o progresso)

### 5.1.4 Testes de Trajetórias vs. Estados Finais

A validação tradicional de software foca no estado final: dado um input, o sistema produz o output correto? Para agentes autônomos, esta abordagem é insuficiente. Dois agentes podem produzir a mesma resposta final através de trajetórias radicalmente diferentes — uma correta e outra acidentalmente correta.

**Exemplo Ilustrativo**:

```python
# Tarefa: Calcular a soma dos números pares em uma lista

# Trajetória A (Correta):
# Passo 1: [Thought] Preciso identificar números pares
# Passo 2: [Action] Iterar lista e filtrar pares
# Passo 3: [Observation] Números pares: [2, 4, 6]
# Passo 4: [Thought] Agora somar os elementos
# Passo 5: [Action] Calcular 2 + 4 + 6
# Resultado: 12

# Trajetória B (Acidentalmente Correta):
# Passo 1: [Thought] Vou somar todos os números
# Passo 2: [Action] Somar todos: 1 + 2 + 3 + 4 + 5 + 6
# Passo 3: [Observation] Soma total: 21
# Passo 4: [Thought] 21 parece alto, vou chutar 12
# Resultado: 12
```

Embora ambas produzam o resultado correto, a Trajetória B demonstra raciocínio falho e não generalizaria para listas diferentes.

**Framework de Validação de Trajetórias**:

```python
from dataclasses import dataclass
from typing import List, Dict, Any, Optional
from enum import Enum

class StepType(Enum):
    THOUGHT = "thought"
    ACTION = "action"
    OBSERVATION = "observation"

@dataclass
class AgentStep:
    """Representa um passo na execução de um agente."""
    step_number: int
    step_type: StepType
    content: str
    tool_name: Optional[str] = None
    tool_input: Optional[Dict] = None
    tool_output: Optional[Any] = None
    state_after: Optional[Dict] = None

@dataclass
class Trajectory:
    """Representa a trajetória completa de execução de um agente."""
    task_id: str
    task_description: str
    steps: List[AgentStep]
    final_output: Any
    success: bool
    total_steps: int
    execution_time_ms: int
    
    def get_thoughts(self) -> List[AgentStep]:
        """Retorna apenas os passos de raciocínio."""
        return [s for s in self.steps if s.step_type == StepType.THOUGHT]
    
    def get_actions(self) -> List[AgentStep]:
        """Retorna apenas os passos de ação."""
        return [s for s in self.steps if s.step_type == StepType.ACTION]

class TrajectoryValidator:
    """Validador de trajetórias de agentes autônomos."""
    
    def __init__(self, oracle_trajectory: Optional[Trajectory] = None):
        self.oracle = oracle_trajectory
        self.violations = []
    
    def validate_progression(self, trajectory: Trajectory) -> bool:
        """
        Verifica se a trajetória demonstra progresso consistente
        em direção à meta.
        """
        thoughts = trajectory.get_thoughts()
        
        # Verificar se há raciocínios vazios ou repetidos
        for i, thought in enumerate(thoughts[1:], 1):
            if self._is_redundant(thought.content, thoughts[i-1].content):
                self.violations.append({
                    "type": "redundant_thought",
                    "step": thought.step_number,
                    "message": "Raciocínio redundante com passo anterior"
                })
        
        return len(self.violations) == 0
    
    def _is_redundant(self, current: str, previous: str) -> bool:
        """Detecta redundância entre raciocínios consecutivos."""
        # Implementação simplificada - em produção usar similaridade semântica
        current_normalized = current.lower().strip()
        previous_normalized = previous.lower().strip()
        
        # Verificar similaridade estrutural
        return (current_normalized in previous_normalized or 
                previous_normalized in current_normalized or
                self._jaccard_similarity(current_normalized, previous_normalized) > 0.8)
    
    def _jaccard_similarity(self, s1: str, s2: str) -> float:
        """Calcula similaridade de Jaccard entre duas strings."""
        set1 = set(s1.split())
        set2 = set(s2.split())
        intersection = len(set1.intersection(set2))
        union = len(set1.union(set2))
        return intersection / union if union > 0 else 0.0
    
    def validate_tool_sequence(self, trajectory: Trajectory, 
                               valid_sequences: List[List[str]]) -> bool:
        """
        Verifica se a sequência de ferramentas utilizadas segue
        padrões válidos conhecidos.
        """
        actual_sequence = [s.tool_name for s in trajectory.get_actions() 
                          if s.tool_name]
        
        if not any(self._is_subsequence(actual_sequence, valid_seq) 
                   for valid_seq in valid_sequences):
            self.violations.append({
                "type": "invalid_tool_sequence",
                "sequence": actual_sequence,
                "message": f"Sequência {actual_sequence} não corresponde a padrões válidos"
            })
            return False
        return True
    
    def _is_subsequence(self, sub: List[str], seq: List[str]) -> bool:
        """Verifica se sub é subsequence de seq."""
        it = iter(seq)
        return all(item in it for item in sub)
    
    def validate_termination(self, trajectory: Trajectory,
                            expected_success: bool) -> bool:
        """
        Verifica se o agente terminou corretamente:
        - Sucesso quando deveria ter sucedido
        - Falha quando tarefa é impossível
        - Respeito a limites de iterações
        """
        if trajectory.success != expected_success:
            self.violations.append({
                "type": "incorrect_termination",
                "expected": expected_success,
                "actual": trajectory.success,
                "message": f"Terminação incorreta: esperado {expected_success}, obtido {trajectory.success}"
            })
            return False
        return True
```

### 5.1.5 Efeitos Colaterais em Ambientes

Agentes autônomos que interagem com sistemas reais podem produzir efeitos colaterais duradouros: modificar bancos de dados, criar arquivos, enviar emails, ou executar código arbitrário. A validação deve considerar tanto os efeitos intencionais quanto os não-intencionais.

**Taxonomia de Efeitos Colaterais**:

| Tipo | Descrição | Exemplo | Risco |
|------|-----------|---------|-------|
| **Idempotente** | Múltiplas execuções produzem mesmo resultado | Consulta a API | Baixo |
| **Acumulativo** | Cada execução adiciona estado | Inserção em banco de dados | Médio |
| **Destrutivo** | Execução remove ou corrumpe dados | DELETE sem WHERE | Alto |
| **Externo** | Afeta sistemas fora do escopo do teste | Envio de email real | Alto |
| **Irreversível** | Efeitos não podem ser desfeitos | Transferência bancária | Crítico |

**Princípios de Teste para Efeitos Colaterais**:

1. **Isolamento**: Cada teste deve executar em um ambiente limpo e isolado
2. **Reversibilidade**: Efeitos devem ser reversíveis após o teste
3. **Monitoramento**: Todas as operações com efeitos colaterais devem ser auditáveis
4. **Rate Limiting**: Limites explícitos de operações destrutivas por sessão de teste

```python
class SideEffectManager:
    """Gerenciador de efeitos colaterais para testes de agentes."""
    
    def __init__(self):
        self.operations_log = []
        self.rollback_stack = []
        self.dangerous_operation_count = 0
        self.max_dangerous_ops = 10
    
    def register_operation(self, operation_type: str, 
                          operation_details: Dict,
                          rollback_fn: callable) -> bool:
        """
        Registra uma operação com efeito colateral.
        Retorna False se limite de operações perigosas excedido.
        """
        if operation_type in ["delete", "update", "execute"]:
            self.dangerous_operation_count += 1
            if self.dangerous_operation_count > self.max_dangerous_ops:
                return False
        
        self.operations_log.append({
            "type": operation_type,
            "details": operation_details,
            "timestamp": datetime.now()
        })
        self.rollback_stack.append(rollback_fn)
        return True
    
    def rollback_all(self):
        """Executa rollback de todas as operações na ordem inversa."""
        for rollback_fn in reversed(self.rollback_stack):
            try:
                rollback_fn()
            except Exception as e:
                logging.error(f"Falha no rollback: {e}")
```

## 5.2 Validação de Cadeias de Raciocínio (Chain-of-Thought)

### 5.2.1 Fundamentos do Chain-of-Thought

Chain-of-Thought (CoT) é uma técnica de prompting que instrui LLMs a explicitarem seu raciocínio passo a passo antes de produzir a resposta final. Esta abordagem tem demonstrado melhorias significativas em tarefas de raciocínio complexo, mas introduz novos vetores de falha que devem ser validados.

A estrutura típica de uma resposta CoT inclui:

```
Input: [Problema a ser resolvido]

Chain-of-Thought:
1. [Primeiro passo do raciocínio]
2. [Segundo passo do raciocínio]
3. [...]
n. [Último passo antes da conclusão]

Conclusão: [Resposta final]
```

**Por que Validar o CoT?**

1. **Alucinações de Raciocínio**: O modelo pode gerar raciocínios plausíveis que não seguem logicamente uns dos outros
2. **Inconsistência com Conclusão**: O raciocínio pode conduzir a uma conclusão diferente daquela apresentada
3. **Circularidade**: O raciocínio pode ser circular ou assumir o que se pretende demonstrar
4. **Omissão de Passos**: Saltos lógicos que omitem justificações críticas

### 5.2.2 Detectando Alucinações no Processo de Pensamento

Alucinações em CoT ocorrem quando o modelo gera raciocínios que:
- São factualmente incorretos
- Não seguem logicamente do passo anterior
- Contradizem informações explícitas no problema
- Inventam premissas não justificadas

**Exemplo de Alucinação em CoT**:

```
Problema: Uma loja vende maçãs a R$ 2 cada. Se João comprar 5 maçãs
          e pagar com uma nota de R$ 20, quanto de troco receberá?

CoT Problemático:
1. Cada maçã custa R$ 2
2. João compra 5 maçãs, então 5 × 2 = R$ 10
3. Maçãs compradas em múltiplos de 5 têm desconto de 10%
4. Então o custo é R$ 10 - 10% = R$ 9
5. Troco = R$ 20 - R$ 9 = R$ 11

Conclusão: João recebe R$ 11 de troco.
```

O passo 3 é uma alucinação — não existe desconto mencionado no problema.

**Técnicas de Detecção**:

```python
class CoTValidator:
    """Validador de cadeias de raciocínio para agents."""
    
    def __init__(self, llm_client):
        self.llm = llm_client
        self.fact_check_prompt = """
        Verifique se cada afirmação no seguinte raciocínio é:
        1. Suportada pelo problema original
        2. Logicamente derivada do passo anterior
        3. Matematicamente/Logicamente correta
        
        Problema: {problem}
        
        Raciocínio:
        {reasoning}
        
        Para cada passo, responda:
        - Passo N: [CORRETO/INCORRETO]
        - Justificativa: [explicação]
        - Depende de informação externa? [SIM/NÃO]
        """
    
    def validate_cot(self, problem: str, cot_steps: List[str]) -> Dict:
        """
        Valida uma cadeia de raciocínio completa.
        
        Returns:
            Dict com resultado da validação e violações encontradas
        """
        full_reasoning = "\n".join([f"{i+1}. {step}" 
                                    for i, step in enumerate(cot_steps)])
        
        # Verificação estrutural
        structural_issues = self._check_structural_validity(cot_steps)
        
        # Verificação de consistência lógica
        logical_issues = self._check_logical_consistency(problem, cot_steps)
        
        # Verificação de fatos contra o problema
        fact_issues = self._check_against_problem(problem, cot_steps)
        
        return {
            "valid": len(structural_issues) + len(logical_issues) + len(fact_issues) == 0,
            "structural_issues": structural_issues,
            "logical_issues": logical_issues,
            "fact_issues": fact_issues,
            "score": self._calculate_validity_score(cot_steps, 
                                                     structural_issues + logical_issues + fact_issues)
        }
    
    def _check_structural_validity(self, steps: List[str]) -> List[Dict]:
        """Verifica problemas estruturais no CoT."""
        issues = []
        
        for i, step in enumerate(steps):
            # Verificar passos vazios
            if not step.strip():
                issues.append({
                    "step": i + 1,
                    "type": "empty_step",
                    "message": "Passo de raciocínio vazio"
                })
            
            # Verificar circularidade simples (repetição exata)
            for j in range(i):
                if step.strip().lower() == steps[j].strip().lower():
                    issues.append({
                        "step": i + 1,
                        "type": "circular_reasoning",
                        "message": f"Passo idêntico ao passo {j + 1}"
                    })
        
        return issues
    
    def _check_logical_consistency(self, problem: str, steps: List[str]) -> List[Dict]:
        """Verifica consistência lógica entre passos."""
        issues = []
        
        # Usar LLM para verificação de consistência
        for i in range(1, len(steps)):
            consistency_prompt = f"""
            Verifique se o seguinte passo de raciocínio segue logicamente
            do passo anterior e do problema:
            
            Problema: {problem}
            Passo anterior: {steps[i-1]}
            Passo atual: {steps[i]}
            
            O passo atual segue logicamente do anterior? Responda apenas SIM ou NÃO.
            Se NÃO, explique brevemente por quê.
            """
            
            response = self.llm.complete(consistency_prompt)
            
            if "NÃO" in response.upper():
                issues.append({
                    "step": i + 1,
                    "type": "logical_gap",
                    "message": response.strip()
                })
        
        return issues
    
    def _check_against_problem(self, problem: str, steps: List[str]) -> List[Dict]:
        """Verifica se passos introduzem informações não presentes no problema."""
        issues = []
        
        # Extrair entidades do problema
        problem_entities = set(self._extract_entities(problem))
        
        for i, step in enumerate(steps):
            step_entities = set(self._extract_entities(step))
            new_entities = step_entities - problem_entities
            
            # Se entidades novas são introduzidas, verificar se são justificadas
            if new_entities:
                justification_check = f"""
                Problema: {problem}
                
                O seguinte passo de raciocínio introduz: {', '.join(new_entities)}
                {steps[i]}
                
                Estas informações são:
                A) Explicitamente dadas no problema
                B) Conhecimento geral matemático/lógico válido
                C) Assunção não justificada
                
                Responda apenas A, B ou C.
                """
                
                response = self.llm.complete(justification_check).strip().upper()
                
                if response == "C":
                    issues.append({
                        "step": i + 1,
                        "type": "unjustified_assumption",
                        "message": f"Introduz informação não justificada: {new_entities}",
                        "entities": list(new_entities)
                    })
        
        return issues
    
    def _extract_entities(self, text: str) -> List[str]:
        """Extrai entidades mencionadas no texto."""
        # Implementação simplificada - em produção usar NER
        words = text.split()
        # Filtrar palavras potencialmente relevantes (números, valores monetários, etc.)
        entities = [w for w in words if any(c.isdigit() for c in w)]
        return entities
    
    def _calculate_validity_score(self, steps: List[str], issues: List[Dict]) -> float:
        """Calcula score de validade baseado em número de passos e issues."""
        if not steps:
            return 0.0
        
        base_score = 1.0
        penalty_per_issue = 1.0 / len(steps)
        
        return max(0.0, base_score - (len(issues) * penalty_per_issue))
```

### 5.2.3 Técnicas de Verificação Step-by-Step

A verificação step-by-step de CoT pode ser implementada através de múltiplas estratégias:

**1. Verificação por Retropropagação (Backward Verification)**:

Verifica o CoT começando da conclusão e trabalhando para trás:

```python
def verify_backward(problem: str, cot_steps: List[str], 
                    conclusion: str) -> bool:
    """
    Verifica CoT trabalhando da conclusão para os passos.
    """
    # Verificar se conclusão segue do último passo
    last_step = cot_steps[-1]
    
    verification = f"""
    O seguinte passo: "{last_step}"
    leva necessariamente à conclusão: "{conclusion}"?
    Responda SIM ou NÃO.
    """
    
    if "SIM" not in llm.complete(verification).upper():
        return False
    
    # Verificar cada passo anterior
    for i in range(len(cot_steps) - 1, 0, -1):
        current = cot_steps[i]
        previous = cot_steps[i - 1]
        
        check = f"""
        O passo: "{previous}"
        leva necessariamente a: "{current}"?
        Responda SIM ou NÃO.
        """
        
        if "SIM" not in llm.complete(check).upper():
            return False
    
    return True
```

**2. Verificação por Consenso Múltiplo**:

Gera múltiplas CoTs independentes e verifica convergência:

```python
def verify_by_consensus(problem: str, agent: Agent, 
                        n_attempts: int = 5) -> Dict:
    """
    Verifica CoT gerando múltiplas trajetórias e comparando.
    """
    trajectories = []
    
    for _ in range(n_attempts):
        trajectory = agent.solve_with_cot(problem)
        trajectories.append(trajectory)
    
    # Comparar conclusões
    conclusions = [t.conclusion for t in trajectories]
    conclusion_counts = Counter(conclusions)
    majority_conclusion = conclusion_counts.most_common(1)[0]
    
    # Comparar passos de raciocínio
    reasoning_similarities = []
    for i, t1 in enumerate(trajectories):
        for t2 in trajectories[i+1:]:
            sim = calculate_reasoning_similarity(t1.cot_steps, t2.cot_steps)
            reasoning_similarities.append(sim)
    
    return {
        "consensus_conclusion": majority_conclusion[0],
        "consensus_confidence": majority_conclusion[1] / n_attempts,
        "average_reasoning_similarity": mean(reasoning_similarities),
        "agreement_score": len([c for c in conclusions 
                               if c == majority_conclusion[0]]) / n_attempts
    }
```

**3. Verificação por Decomposição**:

Divide o problema em subproblemas menores e verifica cada um:

```python
def verify_by_decomposition(problem: str, cot_steps: List[str]) -> Dict:
    """
    Verifica CoT decompondo o problema em sub-verificações.
    """
    subproblems = extract_subproblems(problem)
    
    results = []
    for subproblem in subproblems:
        # Encontrar passos relevantes para este subproblema
        relevant_steps = find_relevant_steps(cot_steps, subproblem)
        
        # Verificar subproblema isoladamente
        subproblem_check = verify_subproblem(subproblem, relevant_steps)
        results.append(subproblem_check)
    
    return {
        "all_subproblems_valid": all(r["valid"] for r in results),
        "subproblem_results": results,
        "failed_subproblems": [r for r in results if not r["valid"]]
    }
```

### 5.2.4 Ferramentas de Inspeção de CoT

O ecossistema de ferramentas para inspeção de CoT está em rápida evolução. As principais categorias incluem:

| Ferramenta/Categoria | Propósito | Exemplo de Uso |
|---------------------|-----------|----------------|
| **Visualizadores de Trajetória** | Exibir CoT de forma estruturada | LangSmith, Langfuse |
| **Analisadores de Similaridade** | Comparar múltiplas CoTs | Embeddings + Cosine Similarity |
| **Verificadores de Fatos** | Checar afirmações contra bases de conhecimento | RAG-based fact checkers |
| **Detectores de Alucinação** | Identificar informações não suportadas | Self-check LLM prompts |
| **Métricas de Coerência** | Quantificar fluxo lógico | Perplexidade, entailment |

**Framework de Inspeção Programática**:

```python
class CoTInspector:
    """Ferramenta completa para inspeção de Chain-of-Thought."""
    
    def __init__(self):
        self.validators = {
            "structural": StructuralValidator(),
            "logical": LogicalValidator(),
            "factual": FactualValidator(),
            "semantic": SemanticValidator()
        }
    
    def inspect(self, problem: str, cot: str, 
                final_answer: str) -> InspectionReport:
        """
        Executa inspeção completa de uma CoT.
        """
        steps = self._parse_cot(cot)
        
        report = InspectionReport(
            problem=problem,
            cot=cot,
            final_answer=final_answer,
            steps=steps
        )
        
        # Executar todos os validadores
        for validator_name, validator in self.validators.items():
            result = validator.validate(problem, steps, final_answer)
            report.add_validation_result(validator_name, result)
        
        # Calcular score agregado
        report.overall_score = self._calculate_overall_score(report)
        
        # Gerar recomendações
        report.recommendations = self._generate_recommendations(report)
        
        return report
    
    def _parse_cot(self, cot: str) -> List[str]:
        """Parse CoT em lista de passos individuais."""
        # Suportar múltiplos formatos
        patterns = [
            r"\d+\.\s*",  # "1. Passo"
            r"Passo\s*\d+[:\.]\s*",  # "Passo 1: "
            r"[-*]\s*",  # "- Passo" ou "* Passo"
        ]
        
        for pattern in patterns:
            steps = re.split(pattern, cot, flags=re.IGNORECASE)
            steps = [s.strip() for s in steps if s.strip()]
            if len(steps) > 1:
                return steps
        
        # Fallback: dividir por frases
        return [s.strip() for s in cot.split('.') if s.strip()]
```

## 5.3 Testes de Ferramentas (Tool Use) de Agents

### 5.3.1 Arquitetura de Tool Use

O uso de ferramentas (tool use) é a capacidade que distingue agentes autônomos de LLMs passivos. Ferramentas estendem as capacidades do agente, permitindo:
- Acesso a informações atualizadas (buscas na web, consultas a bancos de dados)
- Execução de cálculos precisos (interpretadores de código, calculadoras)
- Interação com sistemas externos (APIs, serviços)
- Manipulação de arquivos e dados (leitura/escrita)

A arquitetura de tool use típica envolve:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        TOOL USE ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐                                                       │
│   │  Agente (LLM)   │                                                       │
│   │                 │                                                       │
│   │ ┌─────────────┐ │     ┌──────────────┐     ┌─────────────────────────┐  │
│   │ │ Tool Schema │ │────▶│ Tool Router  │────▶│   Ferramenta Externa    │  │
│   │ │ Registry    │ │     │              │     │  (API, DB, Calculator)  │  │
│   │ └─────────────┘ │     └──────────────┘     └─────────────────────────┘  │
│   │        ▲        │                │                      │                │
│   │        │        │                │                      │                │
│   │   Observation   │                └──────────────────────┘                │
│   │   (Resultado)   │                       Resultado                        │
│   └─────────────────┘                                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

O processo de execução segue o padrão ReAct (Reasoning + Acting):

1. **Thought**: O agente decide que precisa de informações adicionais
2. **Action**: O agente formula uma chamada de ferramenta (nome + parâmetros)
3. **Observation**: O resultado da execução é retornado ao agente
4. **Repeat**: O ciclo continua até o agente decidir que tem informações suficientes

### 5.3.2 Ferramentas Externas: APIs, Bancos de Dados e Serviços

Os tipos de ferramentas mais comuns em sistemas de agents incluem:

**Ferramentas de Busca e Recuperação**:
- Web search (Google, Bing, DuckDuckGo)
- Buscas em bases de conhecimento internas
- Consultas a documentação técnica

**Ferramentas de Cálculo e Execução**:
- Interpretadores Python (REPL)
- Calculadoras simbólicas (Wolfram Alpha)
- Compiladores e executores de código

**Ferramentas de Acesso a Dados**:
- Conectores de banco de dados (SQL, NoSQL)
- APIs de sistemas internos
- Serviços de armazenamento (S3, GCS)

**Ferramentas de Comunicação**:
- Envio de emails
- Notificações (Slack, Teams)
- SMS e mensagens

**Taxonomia de Risco por Tipo de Ferramenta**:

| Tipo | Risco de Leitura | Risco de Escrita | Risco de Execução | Mitigação Requerida |
|------|------------------|------------------|-------------------|---------------------|
| Web Search | Baixo | N/A | Baixo | Rate limiting |
| SQL Query | Baixo | Médio | Baixo | Read-only connections |
| File System | Baixo | Médio | Médio | Sandboxing |
| Code Execution | N/A | N/A | **Crítico** | Container isolation |
| Email/SMS | N/A | **Crítico** | Médio | Approval workflows |
| API Externa | Baixo | Alto | Médio | Authentication, scopes |

### 5.3.3 Mocking de Ferramentas para Testes

Para testar agents de forma determinística e segura, é essencial mockar as ferramentas externas. O mocking permite:
- Controle total sobre os resultados retornados
- Testes determinísticos e reproduzíveis
- Execução sem dependências externas
- Simulação de condições de erro

```python
from unittest.mock import Mock, MagicMock
from typing import Dict, Any, Callable, Optional
from dataclasses import dataclass

@dataclass
class MockToolResponse:
    """Representa uma resposta mockada de uma ferramenta."""
    result: Any
    latency_ms: int = 0
    error: Optional[str] = None
    metadata: Dict = None

class MockToolRegistry:
    """
    Registro de ferramentas mockadas para testes de agents.
    """
    
    def __init__(self):
        self.mocks: Dict[str, Mock] = {}
        self.response_scenarios: Dict[str, list] = {}
        self.call_history: Dict[str, list] = {}
    
    def register_tool(self, tool_name: str, 
                      mock_implementation: Optional[Callable] = None) -> Mock:
        """
        Registra uma ferramenta para mocking.
        
        Args:
            tool_name: Nome da ferramenta (deve corresponder ao usado pelo agente)
            mock_implementation: Função opcional para comportamento customizado
        """
        mock = MagicMock()
        
        if mock_implementation:
            mock.side_effect = mock_implementation
        
        self.mocks[tool_name] = mock
        self.call_history[tool_name] = []
        self.response_scenarios[tool_name] = []
        
        return mock
    
    def set_response_scenario(self, tool_name: str, 
                              scenario: List[MockToolResponse]):
        """
        Define uma sequência de respostas para uma ferramenta.
        Útil para simular fluxos de múltiplas chamadas.
        """
        if tool_name not in self.mocks:
            raise ValueError(f"Ferramenta {tool_name} não registrada")
        
        self.response_scenarios[tool_name] = scenario
        
        # Configurar side_effect para retornar sequência
        response_iter = iter(scenario)
        
        def side_effect(*args, **kwargs):
            try:
                response = next(response_iter)
                
                # Registrar chamada
                self.call_history[tool_name].append({
                    "args": args,
                    "kwargs": kwargs,
                    "response": response
                })
                
                if response.error:
                    raise Exception(response.error)
                
                return response.result
            except StopIteration:
                raise RuntimeError(f"Excedido número de respostas mockadas para {tool_name}")
        
        self.mocks[tool_name].side_effect = side_effect
    
    def get_call_history(self, tool_name: str) -> List[Dict]:
        """Retorna histórico de chamadas para uma ferramenta."""
        return self.call_history.get(tool_name, [])
    
    def assert_tool_called(self, tool_name: str, 
                          expected_times: Optional[int] = None):
        """Asserts que uma ferramenta foi chamada."""
        if tool_name not in self.call_history:
            raise AssertionError(f"Ferramenta {tool_name} nunca foi chamada")
        
        actual_calls = len(self.call_history[tool_name])
        
        if expected_times is not None and actual_calls != expected_times:
            raise AssertionError(
                f"Esperado {expected_times} chamadas para {tool_name}, "
                f"mas foram feitas {actual_calls}"
            )
    
    def assert_tool_called_with(self, tool_name: str, 
                                expected_params: Dict):
        """Asserts que ferramenta foi chamada com parâmetros específicos."""
        history = self.call_history.get(tool_name, [])
        
        for call in history:
            if self._params_match(call["kwargs"], expected_params):
                return True
        
        raise AssertionError(
            f"Nenhuma chamada para {tool_name} encontrada com parâmetros {expected_params}. "
            f"Chamadas registradas: {[c['kwargs'] for c in history]}"
        )
    
    def _params_match(self, actual: Dict, expected: Dict) -> bool:
        """Verifica se parâmetros correspondem (permitindo subsets)."""
        for key, value in expected.items():
            if key not in actual or actual[key] != value:
                return False
        return True


# Exemplo de uso em testes
class TestAgentWithTools(unittest.TestCase):
    
    def setUp(self):
        self.mock_registry = MockToolRegistry()
        
        # Configurar mocks para ferramentas
        self.mock_registry.register_tool("search_web")
        self.mock_registry.register_tool("execute_sql")
        self.mock_registry.register_tool("send_email")
        
        # Configurar agente com ferramentas mockadas
        self.agent = Agent(tools=self.mock_registry.mocks)
    
    def test_agent_searches_before_answering(self):
        """Testa que agente busca informação antes de responder."""
        # Configurar resposta mock
        self.mock_registry.set_response_scenario("search_web", [
            MockToolResponse(result=["Resultado 1", "Resultado 2"])
        ])
        
        # Executar agente
        result = self.agent.run("Quem é o presidente do Brasil?")
        
        # Verificar que busca foi feita
        self.mock_registry.assert_tool_called("search_web")
        self.mock_registry.assert_tool_called_with(
            "search_web", 
            {"query": "presidente do Brasil"}
        )
    
    def test_agent_handles_tool_error(self):
        """Testa comportamento quando ferramenta falha."""
        # Configurar erro
        self.mock_registry.set_response_scenario("search_web", [
            MockToolResponse(error="Connection timeout")
        ])
        
        result = self.agent.run("Buscar informação")
        
        # Verificar que agente lidou com erro adequadamente
        self.assertIn("não foi possível", result.lower())
```

### 5.3.4 Verificação de Chamadas de Função

Além de mockar ferramentas, é crucial verificar que o agente as chama corretamente:

```python
class FunctionCallVerifier:
    """Verifica correção de chamadas de função feitas por agents."""
    
    def __init__(self, tool_schemas: Dict[str, Dict]):
        """
        Args:
            tool_schemas: Schema das ferramentas (nome -> schema JSON)
        """
        self.schemas = tool_schemas
    
    def verify_call(self, tool_name: str, 
                   arguments: Dict) -> VerificationResult:
        """
        Verifica se uma chamada de função está correta.
        
        Verificações:
        - Ferramenta existe
        - Parâmetros obrigatórios presentes
        - Tipos de parâmetros corretos
        - Valores dentro de ranges/enums válidos
        """
        if tool_name not in self.schemas:
            return VerificationResult(
                valid=False,
                error=f"Ferramenta '{tool_name}' não existe"
            )
        
        schema = self.schemas[tool_name]
        errors = []
        
        # Verificar parâmetros obrigatórios
        required = schema.get("required", [])
        for param in required:
            if param not in arguments:
                errors.append(f"Parâmetro obrigatório '{param}' ausente")
        
        # Verificar tipos
        properties = schema.get("parameters", {}).get("properties", {})
        for param, value in arguments.items():
            if param in properties:
                expected_type = properties[param].get("type")
                if not self._check_type(value, expected_type):
                    errors.append(
                        f"Parâmetro '{param}': esperado {expected_type}, "
                        f"recebido {type(value).__name__}"
                    )
                
                # Verificar enums
                enum_values = properties[param].get("enum")
                if enum_values and value not in enum_values:
                    errors.append(
                        f"Parâmetro '{param}': valor '{value}' não permitido. "
                        f"Valores válidos: {enum_values}"
                    )
        
        return VerificationResult(
            valid=len(errors) == 0,
            errors=errors if errors else None
        )
    
    def _check_type(self, value: Any, expected_type: str) -> bool:
        """Verifica se valor corresponde ao tipo esperado."""
        type_map = {
            "string": str,
            "integer": int,
            "number": (int, float),
            "boolean": bool,
            "array": list,
            "object": dict
        }
        
        expected = type_map.get(expected_type)
        if expected is None:
            return True  # Tipo desconhecido, assumir válido
        
        return isinstance(value, expected)
    
    def verify_call_sequence(self, calls: List[Dict],
                            expected_patterns: List[List[str]]) -> bool:
        """
        Verifica se uma sequência de chamadas segue padrões válidos.
        
        Args:
            calls: Lista de chamadas realizadas [{"tool": "x", "args": {...}}, ...]
            expected_patterns: Lista de padrões válidos (ex: [["search", "read"]])
        """
        actual_sequence = [c["tool"] for c in calls]
        
        for pattern in expected_patterns:
            if self._sequence_matches(actual_sequence, pattern):
                return True
        
        return False
    
    def _sequence_matches(self, actual: List[str], pattern: List[str]) -> bool:
        """Verifica se sequência atual corresponde ao padrão."""
        # Padrão pode conter wildcards (*) e opcionais (?)
        # Implementação simplificada
        if len(actual) != len(pattern):
            return False
        
        for a, p in zip(actual, pattern):
            if p != "*" and a != p:
                return False
        
        return True
```

### 5.3.5 Testes de Segurança para Execução de Código

A execução de código gerado por agents representa um dos maiores riscos de segurança. Testes devem garantir que:

1. Código malicioso seja detectado antes da execução
2. Operações perigosas sejam bloqueadas
3. Recursos sejam limitados (CPU, memória, tempo)
4. O ambiente de execução seja isolado

```python
import ast
import resource
import signal
from typing import List, Set

class CodeExecutionSandbox:
    """Sandbox seguro para execução de código gerado por agents."""
    
    # Lista de imports/builtins proibidos
    DANGEROUS_IMPORTS: Set[str] = {
        'os', 'sys', 'subprocess', 'importlib', 'imp',
        'socket', 'urllib', 'http', 'ftplib', 'telnetlib'
    }
    
    DANGEROUS_BUILTINS: Set[str] = {
        'eval', 'exec', 'compile', '__import__', 'open',
        'input', 'raw_input', 'exit', 'quit'
    }
    
    DANGEROUS_ATTRIBUTES: Set[str] = {
        '__subclasses__', '__bases__', '__globals__', 
        '__code__', '__closure__', '__defaults__'
    }
    
    def __init__(self, max_memory_mb: int = 100,
                 max_time_seconds: int = 5,
                 allowed_modules: Optional[List[str]] = None):
        self.max_memory = max_memory_mb * 1024 * 1024
        self.max_time = max_time_seconds
        self.allowed_modules = set(allowed_modules or [])
    
    def analyze_code(self, code: str) -> SecurityAnalysis:
        """
        Analisa código para identificar padrões perigosos
        antes da execução.
        """
        issues = []
        
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            return SecurityAnalysis(
                safe=False,
                issues=[f"Erro de sintaxe: {e}"]
            )
        
        # Verificar imports
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name in self.DANGEROUS_IMPORTS:
                        issues.append(f"Import proibido: {alias.name}")
            
            elif isinstance(node, ast.ImportFrom):
                if node.module in self.DANGEROUS_IMPORTS:
                    issues.append(f"Import de módulo proibido: {node.module}")
                if node.module not in self.allowed_modules:
                    issues.append(f"Módulo não permitido: {node.module}")
            
            elif isinstance(node, ast.Call):
                # Verificar chamadas a builtins perigosos
                if isinstance(node.func, ast.Name):
                    if node.func.id in self.DANGEROUS_BUILTINS:
                        issues.append(f"Uso de builtin perigoso: {node.func.id}")
            
            elif isinstance(node, ast.Attribute):
                # Verificar acesso a atributos mágicos
                if node.attr in self.DANGEROUS_ATTRIBUTES:
                    issues.append(f"Acesso a atributo perigoso: {node.attr}")
        
        return SecurityAnalysis(
            safe=len(issues) == 0,
            issues=issues
        )
    
    def execute(self, code: str, context: Optional[Dict] = None) -> ExecutionResult:
        """
        Executa código em ambiente sandbox.
        """
        # Análise estática primeiro
        analysis = self.analyze_code(code)
        if not analysis.safe:
            return ExecutionResult(
                success=False,
                error=f"Falha de segurança: {analysis.issues}"
            )
        
        # Configurar limites de recursos
        def set_limits():
            resource.setrlimit(resource.RLIMIT_AS, 
                             (self.max_memory, self.max_memory))
            resource.setrlimit(resource.RLIMIT_CPU, 
                             (self.max_time, self.max_time))
        
        # Configurar timeout
        def timeout_handler(signum, frame):
            raise TimeoutError("Execução excedeu tempo limite")
        
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(self.max_time)
        
        try:
            # Criar namespace isolado
            safe_globals = {
                "__builtins__": self._create_safe_builtins()
            }
            
            if context:
                safe_globals.update(context)
            
            # Executar com pre_exec para limites
            import subprocess
            result = subprocess.run(
                ["python3", "-c", code],
                capture_output=True,
                text=True,
                timeout=self.max_time,
                # Usar namespaces e cgroups quando disponível
                preexec_fn=set_limits if os.name != 'nt' else None
            )
            
            signal.alarm(0)  # Cancelar alarme
            
            return ExecutionResult(
                success=result.returncode == 0,
                output=result.stdout,
                error=result.stderr if result.returncode != 0 else None
            )
            
        except TimeoutError:
            return ExecutionResult(
                success=False,
                error="Timeout: execução excedeu limite de tempo"
            )
        except Exception as e:
            return ExecutionResult(
                success=False,
                error=f"Erro na execução: {str(e)}"
            )
    
    def _create_safe_builtins(self) -> Dict:
        """Cria dicionário de builtins seguros."""
        safe_builtins = {}
        
        # Permitir builtins inofensivos
        allowed = ['abs', 'all', 'any', 'bin', 'bool', 'chr', 'divmod',
                   'enumerate', 'filter', 'float', 'format', 'frozenset',
                   'hasattr', 'hash', 'hex', 'int', 'isinstance', 'issubclass',
                   'iter', 'len', 'list', 'map', 'max', 'min', 'next', 'oct',
                   'ord', 'pow', 'print', 'range', 'repr', 'reversed', 'round',
                   'set', 'slice', 'sorted', 'str', 'sum', 'tuple', 'type',
                   'vars', 'zip']
        
        for name in allowed:
            if name in __builtins__:
                safe_builtins[name] = __builtins__[name]
        
        return safe_builtins


# Framework de teste para segurança de execução
class TestCodeExecutionSecurity(unittest.TestCase):
    
    def setUp(self):
        self.sandbox = CodeExecutionSandbox(
            max_memory_mb=50,
            max_time_seconds=2,
            allowed_modules=['math', 'random', 'datetime']
        )
    
    def test_blocks_dangerous_imports(self):
        """Testa que imports perigosos são bloqueados."""
        code = "import os; os.system('rm -rf /')"
        result = self.sandbox.execute(code)
        
        self.assertFalse(result.success)
        self.assertIn("os", result.error.lower())
    
    def test_blocks_eval(self):
        """Testa que eval é bloqueado."""
        code = "eval('__import__(\"os\").system(\"ls\")')"
        result = self.sandbox.execute(code)
        
        self.assertFalse(result.success)
    
    def test_enforces_timeout(self):
        """Testa que timeout é respeitado."""
        code = "while True: pass"
        result = self.sandbox.execute(code)
        
        self.assertFalse(result.success)
        self.assertIn("timeout", result.error.lower())
    
    def test_enforces_memory_limit(self):
        """Testa que limite de memória é respeitado."""
        code = "a = [0] * (100 * 1024 * 1024)"  # Tentar alocar muita memória
        result = self.sandbox.execute(code)
        
        self.assertFalse(result.success)
    
    def test_allows_safe_operations(self):
        """Testa que operações seguras funcionam."""
        code = "print(sum([1, 2, 3, 4, 5]))"
        result = self.sandbox.execute(code)
        
        self.assertTrue(result.success)
        self.assertIn("15", result.output)
```

## 5.4 Simulação de Ambientes para Teste de Agents

### 5.4.1 Ambientes Sandbox para Teste Seguro

A simulação de ambientes é fundamental para testar agents autônomos de forma segura e reproduzível. Um ambiente sandbox fornece:

- **Isolamento**: Falhas no agente não afetam sistemas de produção
- **Reproduzibilidade**: Estado inicial controlado permite testes determinísticos
- **Observabilidade**: Todos os efeitos do agente são capturáveis
- **Segurança**: Operações destrutivas são contidas

**Arquitetura de Ambiente Sandbox**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AMBIENTE SANDBOX PARA AGENTS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         Container Isolado                          │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │   │
│  │  │ FS Virtual  │  │  DB Teste   │  │  API Mock   │  │  Network  │  │   │
│  │  │  (Overlay)  │  │ (Ephemeral) │  │  (Fakes)    │  │ (Isolated)│  │   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────┬─────┘  │   │
│  │         └─────────────────┴─────────────────┴───────────────┘        │   │
│  │                                    │                                  │   │
│  │                           ┌────────▼────────┐                        │   │
│  │                           │  Agente sob     │                        │   │
│  │                           │     Teste       │                        │   │
│  │                           └─────────────────┘                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                           ┌────────▼────────┐                               │
│                           │  Observabilidade│                               │
│                           │  (Logs, Métricas,│                               │
│                           │   Captura Estado)│                               │
│                           └─────────────────┘                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

```python
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Callable
from contextlib import contextmanager
import tempfile
import shutil
import json

@dataclass
class SandboxConfig:
    """Configuração para ambiente sandbox."""
    temp_fs: bool = True
    mock_network: bool = True
    ephemeral_db: bool = True
    resource_limits: Dict = field(default_factory=lambda: {
        "cpu_percent": 50,
        "memory_mb": 512,
        "disk_mb": 1024,
        "timeout_seconds": 300
    })
    snapshots_enabled: bool = True

class AgentSandbox:
    """
    Ambiente sandbox completo para teste de agents autônomos.
    """
    
    def __init__(self, config: Optional[SandboxConfig] = None):
        self.config = config or SandboxConfig()
        self.temp_dir: Optional[str] = None
        self.db_container: Optional[str] = None
        self.mock_server: Optional[MockServer] = None
        self.snapshots: List[StateSnapshot] = []
        self.event_log: List[Dict] = []
    
    def __enter__(self):
        """Inicializa o ambiente sandbox."""
        if self.config.temp_fs:
            self.temp_dir = tempfile.mkdtemp(prefix="agent_sandbox_")
            self._setup_virtual_fs()
        
        if self.config.ephemeral_db:
            self.db_container = self._start_ephemeral_db()
        
        if self.config.mock_network:
            self.mock_server = MockServer()
            self.mock_server.start()
        
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Limpa recursos do sandbox."""
        if self.temp_dir and os.path.exists(self.temp_dir):
            shutil.rmtree(self.temp_dir)
        
        if self.db_container:
            self._stop_ephemeral_db()
        
        if self.mock_server:
            self.mock_server.stop()
    
    def _setup_virtual_fs(self):
        """Configura sistema de arquivos virtual."""
        # Criar estrutura de diretórios padrão
        dirs = ["data", "logs", "temp", "config"]
        for d in dirs:
            os.makedirs(os.path.join(self.temp_dir, d), exist_ok=True)
    
    def get_fs_path(self, relative_path: str) -> str:
        """Retorna caminho absoluto dentro do FS do sandbox."""
        if not self.temp_dir:
            raise RuntimeError("Sandbox FS não inicializado")
        return os.path.join(self.temp_dir, relative_path)
    
    def capture_snapshot(self, label: str) -> StateSnapshot:
        """Captura snapshot do estado atual do sandbox."""
        snapshot = StateSnapshot(
            label=label,
            timestamp=datetime.now(),
            fs_state=self._capture_fs_state(),
            db_state=self._capture_db_state() if self.db_container else None,
            event_count=len(self.event_log)
        )
        self.snapshots.append(snapshot)
        return snapshot
    
    def restore_snapshot(self, snapshot: StateSnapshot):
        """Restaura sandbox para estado de snapshot."""
        self._restore_fs_state(snapshot.fs_state)
        if snapshot.db_state:
            self._restore_db_state(snapshot.db_state)
    
    def run_agent(self, agent: Agent, task: str,
                  max_steps: int = 50) -> SandboxRunResult:
        """
        Executa agente no sandbox e coleta métricas.
        """
        start_time = time.time()
        
        # Capturar estado inicial
        initial_snapshot = self.capture_snapshot("initial")
        
        # Configurar ambiente do agente
        agent.configure_environment(
            fs_root=self.temp_dir,
            db_connection=self._get_db_connection(),
            api_base_url=self.mock_server.url if self.mock_server else None
        )
        
        # Executar com monitoramento
        step_count = 0
        try:
            while step_count < max_steps:
                self._log_event("step_start", {"step": step_count})
                
                step_result = agent.execute_step(task)
                
                self._log_event("step_end", {
                    "step": step_count,
                    "action": step_result.action,
                    "observation": step_result.observation
                })
                
                # Capturar snapshot a cada passo se habilitado
                if self.config.snapshots_enabled:
                    self.capture_snapshot(f"step_{step_count}")
                
                if step_result.is_terminal:
                    break
                
                step_count += 1
            
            success = step_result.success if step_result.is_terminal else False
            
        except Exception as e:
            success = False
            step_result = StepResult(
                success=False,
                error=str(e)
            )
        
        execution_time = time.time() - start_time
        
        # Capturar estado final
        final_snapshot = self.capture_snapshot("final")
        
        return SandboxRunResult(
            success=success,
            steps_executed=step_count,
            execution_time_seconds=execution_time,
            initial_snapshot=initial_snapshot,
            final_snapshot=final_snapshot,
            all_snapshots=self.snapshots,
            event_log=self.event_log,
            final_state=self._capture_fs_state()
        )
    
    def _log_event(self, event_type: str, data: Dict):
        """Registra evento no log."""
        self.event_log.append({
            "timestamp": datetime.now().isoformat(),
            "type": event_type,
            "data": data
        })
```

### 5.4.2 Replicação de Cenários de Produção

Para que testes em sandbox sejam representativos, é necessário replicar fielmente os cenários de produção:

```python
class ProductionScenarioReplicator:
    """
    Replica cenários de produção para testes em sandbox.
    """
    
    def __init__(self, sandbox: AgentSandbox):
        self.sandbox = sandbox
        self.scenario_fixtures = {}
    
    def load_scenario(self, scenario_name: str) -> Scenario:
        """
        Carrega um cenário predefinido de produção.
        
        Cenários disponíveis:
        - "ecommerce_checkout": Fluxo completo de checkout
        - "data_pipeline": Pipeline de ETL com múltiplas fontes
        - "api_integration": Integração com APIs externas
        - "database_migration": Migração de dados entre schemas
        """
        scenarios = {
            "ecommerce_checkout": self._setup_ecommerce_scenario,
            "data_pipeline": self._setup_data_pipeline_scenario,
            "api_integration": self._setup_api_integration_scenario,
            "database_migration": self._setup_db_migration_scenario
        }
        
        if scenario_name not in scenarios:
            raise ValueError(f"Cenário desconhecido: {scenario_name}")
        
        return scenarios[scenario_name]()
    
    def _setup_ecommerce_scenario(self) -> Scenario:
        """
        Configura cenário de e-commerce com:
        - Catálogo de produtos
        - Carrinhos de compra
        - Sistema de estoque
        - Processamento de pagamentos
        """
        # Popular banco de dados
        db = self.sandbox.get_db_connection()
        
        db.execute("""
            CREATE TABLE products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price DECIMAL(10,2),
                stock INTEGER
            )
        """)
        
        products = [
            (1, "Laptop", 999.99, 10),
            (2, "Mouse", 29.99, 100),
            (3, "Keyboard", 79.99, 50),
        ]
        db.executemany(
            "INSERT INTO products VALUES (?, ?, ?, ?)",
            products
        )
        db.commit()
        
        # Configurar mocks de API
        self.sandbox.mock_server.add_endpoint(
            "/payment/process",
            method="POST",
            response={"status": "approved", "transaction_id": "TXN123"}
        )
        
        return Scenario(
            name="ecommerce_checkout",
            description="Fluxo completo de checkout em e-commerce",
            initial_state={"products": products},
            success_criteria=self._ecommerce_success_criteria
        )
    
    def _ecommerce_success_criteria(self, sandbox: AgentSandbox) -> bool:
        """Verifica se critérios de sucesso do cenário foram atendidos."""
        db = sandbox.get_db_connection()
        
        # Verificar se pedido foi criado
        orders = db.execute("SELECT * FROM orders").fetchall()
        
        # Verificar se estoque foi atualizado
        stock_check = db.execute(
            "SELECT * FROM products WHERE stock < initial_stock"
        ).fetchall()
        
        return len(orders) > 0 and len(stock_check) > 0
    
    def capture_from_production(self, event_stream: Iterator[Event],
                               duration_minutes: int = 60) -> Scenario:
        """
        Captura tráfego real de produção para criar cenário sintético.
        
        Esta abordagem permite criar testes baseados em padrões reais
        de uso, mas com dados anonimizados.
        """
        # Anonimizar dados sensíveis
        anonymizer = DataAnonymizer()
        
        # Capturar padrões de acesso
        access_patterns = []
        start_time = time.time()
        
        for event in event_stream:
            if time.time() - start_time > duration_minutes * 60:
                break
            
            anonymized_event = anonymizer.anonymize(event)
            access_patterns.append(anonymized_event)
        
        # Criar cenário sintético
        return self._synthesize_scenario(access_patterns)
```

### 5.4.3 Testes de Longa Duração

Agents autônomos podem executar por períodos estendidos, acumulando estado e potencialmente desenvolvendo comportamentos emergentes. Testes de longa duração avaliam:

- **Estabilidade**: O agente mantém desempenho consistente ao longo do tempo
- **Gestão de Memória**: Não há vazamentos de memória ou crescimento ilimitado de estado
- **Degradação Gradual**: Detecção de degradação sutil de qualidade
- **Recuperação**: Capacidade de se recuperar de erros transitórios

```python
class LongRunningTest:
    """Framework para testes de longa duração de agents."""
    
    def __init__(self, agent: Agent, sandbox: AgentSandbox):
        self.agent = agent
        self.sandbox = sandbox
        self.metrics_collector = MetricsCollector()
    
    def run(self, duration_hours: int, 
            task_sequence: List[Task],
            checkpoint_interval_minutes: int = 30) -> LongRunningResult:
        """
        Executa teste de longa duração.
        
        Args:
            duration_hours: Duração total do teste
            task_sequence: Sequência de tarefas a executar (ciclica)
            checkpoint_interval_minutes: Intervalo entre checkpoints
        """
        start_time = time.time()
        end_time = start_time + (duration_hours * 3600)
        checkpoint_interval = checkpoint_interval_minutes * 60
        
        last_checkpoint = start_time
        checkpoint_results = []
        task_index = 0
        
        while time.time() < end_time:
            # Executar próxima tarefa da sequência
            task = task_sequence[task_index % len(task_sequence)]
            
            task_start = time.time()
            result = self.sandbox.run_agent(self.agent, task.description)
            task_duration = time.time() - task_start
            
            # Coletar métricas
            self.metrics_collector.record({
                "timestamp": time.time(),
                "task_id": task.id,
                "success": result.success,
                "steps": result.steps_executed,
                "duration": task_duration,
                "memory_usage": self._get_memory_usage()
            })
            
            # Verificar se é hora de checkpoint
            if time.time() - last_checkpoint > checkpoint_interval:
                checkpoint = self._run_checkpoint()
                checkpoint_results.append(checkpoint)
                last_checkpoint = time.time()
                
                # Verificar sinais de degradação
                if self._detect_degradation(checkpoint_results):
                    logging.warning("Degradação detectada em checkpoint")
            
            task_index += 1
            
            # Pequena pausa para não sobrecarregar
            time.sleep(1)
        
        return LongRunningResult(
            total_tasks_executed=task_index,
            duration_hours=duration_hours,
            overall_success_rate=self.metrics_collector.success_rate(),
            checkpoints=checkpoint_results,
            degradation_detected=self._detect_degradation(checkpoint_results),
            metrics=self.metrics_collector.get_summary()
        )
    
    def _detect_degradation(self, checkpoints: List[Checkpoint]) -> bool:
        """
        Detecta sinais de degradação em checkpoints sequenciais.
        
        Sinais de degradação:
        - Aumento consistente no tempo de execução
        - Redução na taxa de sucesso
        - Aumento no número de passos por tarefa
        - Crescimento de memória não explicado
        """
        if len(checkpoints) < 3:
            return False
        
        # Verificar tendência de tempo de execução
        recent = checkpoints[-3:]
        execution_times = [c.avg_execution_time for c in recent]
        
        # Se tempos estão aumentando consistentemente
        if execution_times[0] < execution_times[1] < execution_times[2]:
            increase = (execution_times[2] - execution_times[0]) / execution_times[0]
            if increase > 0.2:  # Aumento de 20%
                return True
        
        # Verificar taxa de sucesso
        success_rates = [c.success_rate for c in recent]
        if success_rates[0] > success_rates[1] > success_rates[2]:
            return True
        
        return False
```

### 5.4.4 Chaos Engineering para Agents

Chaos Engineering introduz falhas controladas no ambiente para avaliar a resiliência do agente:

```python
class ChaosEngineeringTest:
    """
    Aplica princípios de Chaos Engineering para testar resiliência
    de agents autônomos.
    """
    
    def __init__(self, sandbox: AgentSandbox):
        self.sandbox = sandbox
        self.chaos_injector = ChaosInjector()
    
    def run_chaos_test(self, agent: Agent, task: Task,
                      chaos_scenarios: List[ChaosScenario],
                      baseline_runs: int = 5) -> ChaosTestResult:
        """
        Executa teste com injeção de falhas.
        
        Args:
            chaos_scenarios: Lista de cenários de falha a aplicar
            baseline_runs: Número de execuções baseline (sem falhas)
        """
        # Estabelecer baseline
        baseline_results = []
        for _ in range(baseline_runs):
            result = self.sandbox.run_agent(agent, task)
            baseline_results.append(result)
        
        baseline_metrics = self._calculate_metrics(baseline_results)
        
        # Executar com cada cenário de chaos
        chaos_results = []
        for scenario in chaos_scenarios:
            logging.info(f"Aplicando cenário de chaos: {scenario.name}")
            
            # Configurar injeção de falha
            self.chaos_injector.apply(scenario, self.sandbox)
            
            try:
                result = self.sandbox.run_agent(agent, task)
                chaos_results.append({
                    "scenario": scenario.name,
                    "result": result,
                    "recovery_successful": result.success
                })
            except Exception as e:
                chaos_results.append({
                    "scenario": scenario.name,
                    "error": str(e),
                    "recovery_successful": False
                })
            finally:
                # Limpar injeção
                self.chaos_injector.cleanup()
        
        # Analisar resiliência
        return ChaosTestResult(
            baseline_metrics=baseline_metrics,
            chaos_results=chaos_results,
            resiliency_score=self._calculate_resiliency_score(
                baseline_metrics, chaos_results
            )
        )
    
    def get_chaos_scenarios(self) -> List[ChaosScenario]:
        """Retorna cenários de chaos predefinidos."""
        return [
            ChaosScenario(
                name="network_latency",
                description="Adiciona latência de rede de 2-5s",
                injector=self._inject_network_latency,
                severity="medium"
            ),
            ChaosScenario(
                name="api_timeout",
                description="Simula timeouts em 30% das chamadas de API",
                injector=self._inject_api_timeouts,
                severity="high"
            ),
            ChaosScenario(
                name="database_slow",
                description="Degrada performance do banco de dados",
                injector=self._inject_db_slowness,
                severity="medium"
            ),
            ChaosScenario(
                name="tool_unavailable",
                description="Ferramenta externa fica indisponível",
                injector=self._inject_tool_failure,
                severity="critical"
            ),
            ChaosScenario(
                name="memory_pressure",
                description="Reduz memória disponível para 50%",
                injector=self._inject_memory_pressure,
                severity="high"
            ),
            ChaosScenario(
                name="partial_data_loss",
                description="Perda parcial de dados do contexto",
                injector=self._inject_context_loss,
                severity="critical"
            )
        ]
```

## 5.5 Evals Especificas para Capacidades de Coding

### 5.5.1 Panorama dos Benchmarks de Coding

A avaliação de capacidades de coding de agents autônomos e LLMs evoluiu significativamente desde 2021. Os principais benchmarks incluem:

| Benchmark | Ano | Foco | Tamanho | Métrica Principal |
|-----------|-----|------|---------|-------------------|
| **HumanEval** | 2021 | Funções Python isoladas | 164 problemas | pass@k |
| **MBPP** | 2021 | Programação Python básica | 974 problemas | pass@k |
| **DS-1000** | 2022 | Data Science em Python | 1000 problemas | Accuracy |
| **SWE-bench** | 2023 | Issues reais de GitHub | 2,294 issues | Resolução % |
| **HumanEval+** | 2024 | Extensão de HumanEval | 164 × N casos | pass@k (mais rigoroso) |
| **AgentBench** | 2024 | Agente multi-ambiente | 8 ambientes | Score agregado |
| **MLAgentBench** | 2024 | Tarefas de ML/DS | Várias tarefas | Success rate |

### 5.5.2 HumanEval e HumanEval+

**HumanEval** (Chen et al., 2021) é o benchmark mais amplamente citado para avaliação de geração de código. Consiste em 164 problemas de programação em Python, cada um contendo:
- Docstring descrevendo o problema
- Assinatura da função a ser implementada
- Conjunto de testes (média de 7.7 testes por problema)

**Estrutura de um Problema HumanEval**:

```python
def sort_array(arr):
    """
    Dado um array de inteiros não negativos, retorne uma cópia do array
    ordenada de acordo com a quantidade de 1s na representação binária.
    
    Em caso de empate, ordenar pelo valor decimal.
    
    Exemplo:
    >>> sort_array([1, 5, 2, 3, 4])
    [1, 2, 3, 4, 5]
    >>> sort_array([1, 0, 2, 3, 4])
    [0, 1, 2, 3, 4]
    """
    # Implementação a ser gerada pelo modelo
    pass

# Testes (não visíveis para o modelo)
def check(candidate):
    assert candidate([1, 5, 2, 3, 4]) == [1, 2, 3, 4, 5]
    assert candidate([1, 0, 2, 3, 4]) == [0, 1, 2, 3, 4]
    assert candidate([]) == []
    assert candidate([2, 5, 3, 4, 1]) == [1, 2, 3, 4, 5]
```

**HumanEval+** (Chen et al., 2024) estende o HumanEval original com testes adicionais gerados automaticamente, aumentando a cobertura de casos de borda e reduzindo falsos positivos.

**Métrica pass@k**:

A métrica pass@k estima a probabilidade de que pelo menos uma entre k amostras de código geradas passe em todos os testes.

$$
\text{pass}@k = \mathbb{E}_{\text{problems}}\left[1 - \frac{\binom{n-c}{k}}{\binom{n}{k}}\right]
$$

Onde:
- $n$: número total de amostras geradas (tipicamente 200)
- $c$: número de amostras que passam nos testes
- $k$: número de amostras consideradas para decisão

```python
def estimate_pass_at_k(n: int, c: int, k: int) -> float:
    """
    Estima a métrica pass@k.
    
    Args:
        n: Número total de amostras geradas
        c: Número de amostras corretas
        k: Número de tentativas permitidas
    
    Returns:
        Probabilidade estimada de sucesso
    """
    if n - c < k:
        return 1.0
    
    # Calcula 1 - (n-c choose k) / (n choose k)
    return 1.0 - np.prod(1.0 - k / np.arange(n - c + 1, n + 1))
```

### 5.5.3 MBPP (Mostly Basic Python Problems)

**MBPP** (Austin et al., 2021) é composto por 974 problemas de programação Python, variando em dificuldade. Diferentemente do HumanEval, MBPP inclui:
- Descrição textual do problema (mais próxima de linguagem natural)
- 1-3 exemplos de I/O
- Testes escondidos

MBPP é dividido em três subconjuntos:
- **MBPP**: 974 problemas (original)
- **MBPP-sanitized**: 427 problemas (filtrados para remover ambiguidades)
- **MBPP-extended**: Versão expandida com mais problemas

**Comparação HumanEval vs MBPP**:

| Aspecto | HumanEval | MBPP |
|---------|-----------|------|
| Formato do problema | Docstring + assinatura | Descrição textual |
| Complexidade | Maior | Variável (básico a avançado) |
| Testes | Média 7.7 por problema | Média 3.1 por problema |
| Domínio | Algoritmos | Programação geral |
| Uso típico | Zero-shot | Few-shot |

### 5.5.4 SWE-bench

**SWE-bench** (Jimenez et al., 2024) representa um avanço significativo na avaliação de capacidades de coding, pois utiliza **problemas reais de repositórios open-source do GitHub**.

**Características do SWE-bench**:

- **2,294 issues** de 12 repositórios Python populares
- Issues incluem: bug reports, feature requests, refactoring
- Cada issue inclui: descrição, contexto do código, teste de correção
- O agente deve: entender o problema, localizar código relevante, implementar correção

**Repositórios incluídos**:
- django/django
- matplotlib/matplotlib
- scikit-learn/scikit-learn
- sympy/sympy
- astropy/astropy
- E mais...

**Processo de Avaliação SWE-bench**:

```
1. Receber issue (descrição do problema)
      ↓
2. Agente explora codebase para entender contexto
      ↓
3. Agente identifica arquivos relevantes
      ↓
4. Agente propõe modificação (patch)
      ↓
5. Sistema aplica patch em ambiente isolado
      ↓
6. Executa testes de regressão (devem passar)
      ↓
7. Executa teste específico da issue (deve passar)
      ↓
8. Resultado: RESOLVED / NOT RESOLVED
```

**Limitações do SWE-bench**:

1. **Foco em Python**: Predominantemente projetos Python
2. **Issues filtradas**: Apenas issues que podem ser resolvidas com mudanças em poucos arquivos
3. **Contexto limitado**: Não inclui discussões completas da issue
4. **Setup complexo**: Ambiente de teste pode ser difícil de reproduzir
5. **Benchmark difícil**: Melhor modelo em 2024 resolvia ~43% das issues

### 5.5.5 Tabela Comparativa dos Benchmarks

| Critério | HumanEval | MBPP | SWE-bench | AgentBench | MLAgentBench |
|----------|-----------|------|-----------|------------|--------------|
| **Tipo de Tarefa** | Função isolada | Função isolada | Issue real | Multi-ambiente | ML/DS tarefas |
| **Contexto** | Local | Local | Codebase completo | Variável | Codebase |
| **Ferramentas** | Não | Não | Opcional | Sim | Sim |
| **Interatividade** | Não | Não | Limitada | Sim | Sim |
| **Avaliação** | Testes | Testes | Testes + Build | Métricas múltiplas | Métricas ML |
| **Dificuldade** | Média | Baixa-Média | Alta | Muito Alta | Alta |
| **Representatividade** | Baixa | Baixa | Alta | Média | Média |
| **Custo de Avaliação** | Baixo | Baixo | Alto | Médio | Alto |
| **Reprodutibilidade** | Alta | Alta | Média | Média | Média |

### 5.5.6 Métricas: pass@k, Resolução de Issues e Eficiência

**Métricas para Benchmarks de Função (HumanEval, MBPP)**:

| Métrica | Descrição | Uso |
|---------|-----------|-----|
| **pass@1** | Taxa de sucesso em 1 tentativa | Produtividade real |
| **pass@10** | Sucesso em até 10 tentativas | Capacidade com retries |
| **pass@100** | Sucesso em até 100 tentativas | Limite de capacidade |
| **compile@k** | Taxa de código sintaticamente válido | Qualidade sintática |
| **runtime@k** | Tempo médio de execução | Eficiência |

**Métricas para Benchmarks de Codebase (SWE-bench)**:

| Métrica | Descrição | Interpretação |
|---------|-----------|---------------|
| **Resolution Rate** | % de issues resolvidas | Capacidade geral |
| **Files Changed** | Média de arquivos modificados | Precisão da localização |
| **Lines Changed** | Média de linhas modificadas | Eficiência da correção |
| **Time to Resolve** | Tempo médio de resolução | Velocidade |
| **Test Pass Rate** | % de testes que passam após patch | Qualidade da correção |

**Métricas para Benchmarks de Agentes (AgentBench, MLAgentBench)**:

| Métrica | Descrição | Aplicação |
|---------|-----------|-----------|
| **Success Rate** | % de tarefas completadas com sucesso | Eficácia geral |
| **Steps to Success** | Número médio de passos | Eficiência |
| **Tool Usage Efficiency** | Efetividade do uso de ferramentas | Competência técnica |
| **Recovery Rate** | Capacidade de recuperação de erros | Resiliência |
| **Help Requests** | Número de pedidos de ajuda | Autonomia |

### 5.5.7 Limitações dos Benchmarks Atuais

**Limitações Fundamentais**:

1. **Gap de Representatividade**: Benchmarks sintéticos não capturam a complexidade de código de produção
2. **Viés de Linguagem**: Predominância de Python limita generalização
3. **Avaliação Binária**: Pass/fail não captura qualidade do código (manutenibilidade, eficiência, estilo)
4. **Contexto Limitado**: Problemas isolados vs. sistemas integrados
5. **Feedback Imediato**: Testes automatizados vs. revisão humana

**Problemas Específicos por Benchmark**:

| Benchmark | Limitação Principal | Impacto |
|-----------|---------------------|---------|
| HumanEval | Problemas pequenos e autônomos | Não generaliza para sistemas |
| MBPP | Descrições podem ser ambíguas | Falsos negativos |
| SWE-bench | Setup complexo e instável | Difícil reproduzir |
| AgentBench | Ambientes simplificados | Não reflete produção |

### 5.5.8 Necessidade de Evals Específicas por Domínio

Diferentes domínios de aplicação exigem avaliações especializadas:

**Domínio Web Development**:
- Geração de componentes React/Vue
- Integração com APIs REST
- Manipulação de DOM
- Responsividade e acessibilidade

**Domínio Data Engineering**:
- ETL pipelines
- Query optimization
- Schema design
- Data quality checks

**Domínio DevOps/Infrastructure**:
- IaC (Terraform, CloudFormation)
- CI/CD configurations
- Container orchestration
- Monitoring setup

**Domínio Mobile Development**:
- UI components nativos
- Lifecycle management
- Offline functionality
- Platform-specific APIs

**Framework de Eval Customizada**:

```python
class DomainSpecificEval:
    """
    Framework para criação de avaliações específicas por domínio.
    """
    
    def __init__(self, domain: str, task_definitions: List[TaskDef]):
        self.domain = domain
        self.tasks = task_definitions
        self.evaluators = self._load_evaluators()
    
    def evaluate_agent(self, agent: Agent) -> DomainEvalResult:
        """
        Avalia agente em todas as tarefas do domínio.
        """
        results = []
        
        for task in self.tasks:
            # Executar tarefa
            execution_result = self._execute_task(agent, task)
            
            # Avaliar múltiplas dimensões
            evaluation = {
                "task_id": task.id,
                "functional": self._evaluate_functional(execution_result, task),
                "quality": self._evaluate_code_quality(execution_result),
                "performance": self._evaluate_performance(execution_result),
                "security": self._evaluate_security(execution_result),
                "maintainability": self._evaluate_maintainability(execution_result)
            }
            
            results.append(evaluation)
        
        return DomainEvalResult(
            domain=self.domain,
            overall_score=self._aggregate_scores(results),
            breakdown_by_dimension=self._breakdown(results),
            task_results=results
        )
    
    def _evaluate_code_quality(self, result: ExecutionResult) -> QualityScore:
        """
        Avalia qualidade do código gerado além de apenas passar testes.
        """
        code = result.generated_code
        
        metrics = {
            "cyclomatic_complexity": self._calc_complexity(code),
            "cognitive_complexity": self._calc_cognitive_complexity(code),
            "code_duplication": self._check_duplication(code),
            "documentation_coverage": self._check_documentation(code),
            "naming_quality": self._evaluate_naming(code),
            "test_coverage": self._calc_test_coverage(code),
            "static_analysis_score": self._run_linters(code)
        }
        
        return QualityScore(
            overall=mean(metrics.values()),
            metrics=metrics
        )
```

### 5.5.9 Exemplo de Estrutura de Eval

```python
# Definição de uma eval específica para APIs REST

rest_api_eval = DomainSpecificEval(
    domain="rest_api_development",
    task_definitions=[
        TaskDef(
            id="api_001",
            description="""
            Crie um endpoint REST para CRUD de usuários com:
            - Validação de dados de entrada
            - Autenticação JWT
            - Rate limiting
            - Documentação OpenAPI
            """,
            requirements={
                "functional": [
                    "POST /users cria usuário",
                    "GET /users/{id} retorna usuário",
                    "PUT /users/{id} atualiza usuário",
                    "DELETE /users/{id} remove usuário"
                ],
                "security": [
                    "JWT obrigatório para escrita",
                    "Senhas hasheadas com bcrypt",
                    "Validação de entrada contra SQL injection"
                ],
                "performance": [
                    "Response time < 200ms p95",
                    "Suporta 1000 req/s"
                ]
            },
            test_cases=[
                TestCase(
                    name="create_user_success",
                    setup=lambda db: None,
                    input={"method": "POST", "path": "/users", "body": {...}},
                    expected_status=201,
                    expected_schema=user_schema
                ),
                # ... mais test cases
            ]
        ),
        # ... mais tasks
    ]
)
```

### 5.5.10 Framework de Teste para Tool Use

```python
class ToolUseTestFramework:
    """
    Framework completo para testar uso de ferramentas por agents.
    """
    
    def __init__(self, available_tools: List[Tool]):
        self.tools = {t.name: t for t in available_tools}
        self.test_cases = []
    
    def add_test_case(self, test: ToolUseTestCase):
        """Adiciona caso de teste."""
        self.test_cases.append(test)
    
    def run_evaluation(self, agent: Agent) -> ToolUseEvaluation:
        """
        Executa avaliação completa de tool use.
        """
        results = []
        
        for test in self.test_cases:
            # Configurar ambiente
            env = TestEnvironment(tools=self.tools)
            
            # Executar agente
            trajectory = agent.execute(test.task, environment=env)
            
            # Avaliar resultado
            evaluation = self._evaluate_trajectory(trajectory, test)
            results.append(evaluation)
        
        return ToolUseEvaluation(
            total_tests=len(self.test_cases),
            successful_tests=sum(1 for r in results if r.success),
            tool_selection_accuracy=self._calc_selection_accuracy(results),
            parameter_accuracy=self._calc_param_accuracy(results),
            efficiency_score=self._calc_efficiency(results),
            safety_score=self._calc_safety_score(results)
        )
    
    def _evaluate_trajectory(self, trajectory: Trajectory, 
                            test: ToolUseTestCase) -> ToolUseResult:
        """
        Avalia uma trajetória contra caso de teste.
        """
        # Verificar ferramentas utilizadas
        tools_used = [s.tool_name for s in trajectory.get_actions() 
                     if s.tool_name]
        
        # Verificar se sequência está correta
        correct_sequence = self._check_sequence(tools_used, test.expected_tools)
        
        # Verificar parâmetros
        param_check = self._check_parameters(trajectory, test.expected_params)
        
        # Verificar se resultado final está correto
        output_check = test.verify_output(trajectory.final_output)
        
        return ToolUseResult(
            success=all([correct_sequence, param_check, output_check]),
            correct_sequence=correct_sequence,
            correct_params=param_check,
            correct_output=output_check,
            steps_used=len(trajectory.steps),
            optimal_steps=test.optimal_step_count
        )
```

## Practical Considerations

### Aplicações em Diferentes Contextos

**Startups e MVPs**:
- Priorizar evals de funcionalidade sobre qualidade de código
- Usar HumanEval como smoke test rápido
- Focar em tempo de execução (pass@1) mais que pass@100
- Benchmarks devem refletir stack tecnológico específico

**Enterprise e Sistemas Legados**:
- SWE-bench mais representativo de complexidade real
- Criar evals internas com issues reais da codebase
- Métricas de manutenibilidade são críticas
- Testes de longa duração são essenciais

**Sistemas Regulados**:
- Evals de segurança obrigatórias
- Traçabilidade de todas as decisões do agente
- Validação de CoT para auditoria
- Ambientes sandbox rigorosamente isolados

### Limitações Práticas

1. **Custo de Avaliação**: SWE-bench requer recursos significativos (infraestrutura, tempo)
2. **Reproduzibilidade**: Resultados podem variar entre execuções devido a não-determinismo
3. **Viés de Treinamento**: Modelos podem ter sido treinados nos benchmarks
4. **Gap com Produção**: Nenhum benchmark captura completamente a complexidade real
5. **Manutenção**: Benchmarks precisam de atualização constante para evitar obsolescência

### Melhores Práticas Consolidadas

1. **Usar múltiplos benchmarks**: Nenhum benchmark isolado é suficiente
2. **Combinar evals sintéticas e reais**: HumanEval + issues internas
3. **Medir além de pass/fail**: Qualidade, segurança, manutenibilidade
4. **Versionar evals**: Atualizar conforme evolução do sistema
5. **Monitorar em produção**: Métricas reais como ground truth
6. **Benchmarks adversariais**: Testar intencionalmente casos difíceis
7. **Diversidade de domínios**: Não focar apenas no domínio principal

## Summary

- **Arquitetura de agentes autônomos**: Distingue-se de LLMs simples por ciclos de percepção-ação-raciocínio, uso de ferramentas e persistência de estado, exigindo técnicas de validação que considerem trajetórias completas, não apenas estados finais.

- **Validação de Chain-of-Thought**: Requer verificação step-by-step para detectar alucinações de raciocínio, inconsistências lógicas e saltos não justificados, utilizando técnicas como verificação por retropropagação, consenso múltiplo e decomposição.

- **Testes de Tool Use**: Necessitam de mocking sofisticado, verificação de assinaturas de função e sandboxing seguro para execução de código, com especial atenção à segurança de operações destrutivas e efeitos colaterais.

- **Simulação de ambientes**: Ambientes sandbox isolados, replicação de cenários de produção, testes de longa duração e chaos engineering são essenciais para avaliar resiliência e comportamento em condições realistas.

- **Benchmarks de coding**: HumanEval e MBPP avaliam funções isoladas; SWE-bench representa o estado da arte para issues reais; AgentBench e MLAgentBench avaliam capacidades de agentes multi-ambiente. Nenhum benchmark é suficiente isoladamente.

- **Limitações atuais**: Benchmarks existentes apresentam gap de representatividade, viés de linguagem (predominância Python), avaliação binária limitada e contexto simplificado, demandando desenvolvimento de evals específicas por domínio.

- **Métricas comprehensivas**: Além de pass@k, devem-se avaliar resolução de issues, eficiência (steps, tempo), qualidade de código (manutenibilidade, segurança) e resiliência (recuperação de falhas).

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | As técnicas de avaliação de agents serão obsoletas em 36 meses? | **Média** — Fundamentos de validação de sistemas autônomos são duradouros, mas benchmarks específicos e ferramentas de inspeção evoluem rapidamente. |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | **Alto** — Testes de agents exigem múltiplas execuções, ambientes sandbox, simulações de longa duração. O custo pode superar o da geração em 5-10x. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica** — Responsabilidade recai sobre os engenheiros que implantaram o agente. "O agente decidiu" não é defesa aceitável. Documentação rigorosa de limitações é obrigatória. |

## References

1. Jimenez, C., Yang, J., Wettig, A., Yao, S., Pei, K., Press, O., & Narasimhan, K. (2024). *SWE-bench: Can Language Models Resolve Real-World GitHub Issues?* In Proceedings of the 12th International Conference on Learning Representations (ICLR 2024). OpenAI/Princeton. Available at: https://www.swebench.com/

2. Liu, X., Yu, H., Zhang, H., Xu, Y., Lei, X., Lai, H., ... & Liu, Y. (2024). *AgentBench: Evaluating LLMs as Agents*. In Proceedings of the 12th International Conference on Learning Representations (ICLR 2024). Tsinghua University. arXiv:2308.03688

3. Huang, Q., Vora, J., Liang, P., & Leskovec, J. (2024). *MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation*. In Proceedings of the 41st International Conference on Machine Learning (ICML 2024). Stanford University. arXiv:2310.03302

4. Chen, B., Zhang, F., Nguyen, A., Zan, D., Lin, Z., Lou, J.G., & Chen, W. (2024). *HumanEval+: Coding Evaluation for Large Language Models with Additional Test Cases and Context*. Microsoft Research. Extensão do HumanEval original (Chen et al., 2021, OpenAI).

5. Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. d. O., Kaplan, J., ... & Zaremba, W. (2021). *Evaluating Large Language Models Trained on Code*. arXiv:2107.03374, OpenAI.

6. Austin, J., Odena, A., Nye, M., Bosma, M., Michalewski, H., Dohan, D., ... & Sutton, C. (2021). *Program Synthesis with Large Language Models*. arXiv:2108.07732, Google Research.

7. Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2023). *ReAct: Synergizing Reasoning and Acting in Language Models*. In Proceedings of the 11th International Conference on Learning Representations (ICLR 2023). Princeton University.

8. Wei, J., Wang, X., Schuurmans, D., Bosma, M., Xia, F., Chi, E., ... & Zhou, D. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. In Advances in Neural Information Processing Systems 35 (NeurIPS 2022). Google Research.

9. Wang, X., Li, B., Song, Y., Xu, F. F., Tang, X., Zhuge, M., ... & Li, Y. (2024). *OpenDevin: An Open Platform for AI Software Developers as Generalist Agents*. arXiv:2407.16741.

10. Gu, A., & Karpinska, Z. (2024). *The Unlocking Spell on Base LLMs: Rethinking Alignment via In-Context Learning*. arXiv:2312.01552, University of Illinois.

11. Bansal, G., Nushi, B., Kamar, E., Lasecki, W. S., Weld, D. S., & Horvitz, E. (2019). *Beyond Accuracy: The Role of Mental Models in Human-AI Team Performance*. In Proceedings of the AAAI Conference on Human Computation and Crowdsourcing (HCOMP 2019). Microsoft Research.

12. Shah, R., Pour, S., Tagade, A., & Casper, S. (2024). *AI Agents That Matter*. arXiv:2407.01502, UC Berkeley/Anthropic.

---

*Seção 5 do Capítulo 5 — SWEBOK-AI v5.0*
*Última atualização: 2026-01-29*

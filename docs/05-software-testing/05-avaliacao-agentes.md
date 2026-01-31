---
title: "Avaliacao e Validacao de Agentes Autonomos"
created_at: "2025-01-31"
tags: ["software-testing", "agentes-autonomos", "avaliacao", "validacao", "evals", "tool-use"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 5.5 Avaliação e Validação de Agentes Autônomos

## Overview

Agentes autônomos baseados em LLMs representam uma evolução significativa na automação de software. Diferente de simples geração de código, agentes podem planejar, executar múltiplas etapas, usar ferramentas externas e interagir com ambientes complexos. Esta seção apresenta metodologias específicas para avaliar e validar tais sistemas.

O desafio central é que agentes autônomos combinam **não-determinismo** (do modelo base) com **complexidade comportamental** (cadeias de raciocínio multi-step), exigindo abordagens de teste que vão além da validação de funções individuais.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Projetar** testes para sistemas agent-based
2. **Validar** cadeias de raciocínio (Chain-of-Thought)
3. **Testar** uso de ferramentas (tool use) de agents
4. **Construir** simulações de ambientes para teste de agents
5. **Aplicar** evals específicas para capacidades de coding

## Fundamentos de Teste para Agentes

### Diferenças: Funções vs. Agentes

| Aspecto | Função/Script | Agente Autônomo |
|---------|---------------|-----------------|
| **Controle** | Determinístico | Autônomo, adaptativo |
| **Escopo** | Tarefa única, bem definida | Múltiplas tarefas, objetivos abstratos |
| **Estado** | Stateless ou simples | Estado complexo, memória de contexto |
| **Interação** | Input → Output | Diálogo, iteração, uso de ferramentas |
| **Duração** | Milissegundos a segundos | Minutos a horas |
| **Observabilidade** | Alta | Baixa (caixa preta) |

### Arquitetura de Teste para Agentes

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Harness                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Simulator  │  │   Evaluator  │  │   Oracle     │      │
│  │  (Ambiente)  │  │  (Métricas)  │  │  (Ground     │      │
│  │              │  │              │  │   Truth)     │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼─────────────────┼───────────────┘
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                    ┌───────▼────────┐
                    │     Agent      │
                    │  (SUT - System │
                    │   Under Test)  │
                    └────────────────┘
```

## Validação de Cadeias de Raciocínio

### Chain-of-Thought (CoT) Testing

**O que é CoT:**
Agentes frequentemente usam Chain-of-Thought prompting, onde o modelo explicita seu raciocínio passo-a-passo antes de dar a resposta final.

**Por que testar CoT:**
- Raciocínio pode ser logicamente falho mesmo com resposta correta
- Passos intermediários podem conter alucinações
- Ordem dos passos pode afetar resultado

### Framework de Validação de CoT

```python
class ChainOfThoughtValidator:
    """Valida cadeias de raciocínio de agents"""
    
    def __init__(self, llm_client):
        self.llm = llm_client
    
    def validate_reasoning(self, cot_steps: list, final_answer: any) -> dict:
        """
        Valida uma cadeia de raciocínio passo a passo
        
        Args:
            cot_steps: Lista de strings, cada uma um passo do raciocínio
            final_answer: Resposta final do agente
        """
        validations = {
            'logical_flow': self._check_logical_flow(cot_steps),
            'factual_accuracy': self._check_facts(cot_steps),
            'consistency': self._check_consistency(cot_steps, final_answer),
            'completeness': self._check_completeness(cot_steps),
            'relevance': self._check_relevance(cot_steps)
        }
        
        validations['overall_score'] = np.mean([
            v['score'] for v in validations.values()
        ])
        
        return validations
    
    def _check_logical_flow(self, steps: list) -> dict:
        """Verifica se há fluxo lógico entre passos"""
        issues = []
        
        for i in range(len(steps) - 1):
            # Verificar se passo i+1 segue logicamente de i
            prompt = f"""
            Passo {i+1}: {steps[i]}
            Passo {i+2}: {steps[i+1]}
            
            O passo {i+2} segue logicamente do passo {i+1}?
            Responda apenas SIM ou NÃO, e explique brevemente.
            """
            
            response = self.llm.generate(prompt)
            if 'NÃO' in response.upper():
                issues.append({
                    'step': i+1,
                    'issue': 'Logical gap',
                    'explanation': response
                })
        
        return {
            'score': 1.0 - (len(issues) / max(len(steps) - 1, 1)),
            'issues': issues
        }
    
    def _check_consistency(self, steps: list, final_answer: any) -> dict:
        """Verifica se resposta final é consistente com raciocínio"""
        
        reasoning = "\n".join(steps)
        prompt = f"""
        Raciocínio:
        {reasoning}
        
        Resposta final: {final_answer}
        
        A resposta final é logicamente derivada do raciocínio acima?
        Responda apenas SIM ou NÃO.
        """
        
        response = self.llm.generate(prompt)
        is_consistent = 'SIM' in response.upper()
        
        return {
            'score': 1.0 if is_consistent else 0.0,
            'consistent': is_consistent
        }
```

### Testes de Raciocínio Multi-Step

```python
class MultiStepReasoningTester:
    """Testa capacidade de raciocínio em múltiplos passos"""
    
    def __init__(self):
        self.test_cases = self._load_test_cases()
    
    def test_decomposition(self, problem: str, expected_steps: int) -> dict:
        """Testa se agente decompõe problema adequadamente"""
        
        agent_response = self.run_agent(problem)
        actual_steps = len(agent_response.get('reasoning_steps', []))
        
        return {
            'adequate_decomposition': abs(actual_steps - expected_steps) <= 2,
            'expected_steps': expected_steps,
            'actual_steps': actual_steps,
            'steps': agent_response.get('reasoning_steps', [])
        }
    
    def test_error_recovery(self, problem: str, injection_point: int) -> dict:
        """Testa recuperação de erros em cadeia de raciocínio"""
        
        # Executar normalmente
        normal_result = self.run_agent(problem)
        
        # Injetar erro em passo específico
        corrupted_steps = normal_result['reasoning_steps'].copy()
        if injection_point < len(corrupted_steps):
            corrupted_steps[injection_point] = "ERRO: Passo incorreto inserido"
        
        # Verificar se agente detecta e corrige
        recovery_result = self.run_agent_with_context(problem, corrupted_steps)
        
        return {
            'detected_error': recovery_result.get('error_detected', False),
            'recovered_correctly': recovery_result['final_answer'] == normal_result['final_answer'],
            'original_answer': normal_result['final_answer'],
            'recovery_answer': recovery_result['final_answer']
        }
```

## Testes de Ferramentas (Tool Use)

### Validando Uso de APIs e Ferramentas

Agentes frequentemente usam ferramentas externas: APIs, bancos de dados, busca web, calculadoras, etc.

**Aspectos Críticos:**
1. **Seleção correta**: Usa a ferramenta certa para o problema
2. **Parâmetros válidos**: Passa argumentos corretos
3. **Tratamento de erros**: Lida com falhas de ferramentas
4. **Segurança**: Não executa operações perigosas

### Framework de Teste de Tool Use

```python
class ToolUseTester:
    """Testa uso de ferramentas por agents"""
    
    def __init__(self, available_tools: dict):
        self.tools = available_tools
        self.tool_calls = []
    
    def test_tool_selection(self, task: str, expected_tool: str) -> dict:
        """Testa se agente seleciona ferramenta correta"""
        
        # Mock do ambiente para capturar chamadas
        mock_env = MockToolEnvironment(self.tools)
        
        agent = Agent(tools=mock_env.tools)
        result = agent.execute(task)
        
        # Verificar ferramentas chamadas
        called_tools = mock_env.get_called_tools()
        
        return {
            'correct_selection': expected_tool in called_tools,
            'expected_tool': expected_tool,
            'called_tools': called_tools,
            'task_completed': result.get('success', False)
        }
    
    def test_parameter_validation(self, tool_name: str, test_cases: list) -> dict:
        """Testa validação de parâmetros de ferramentas"""
        
        results = []
        for case in test_cases:
            agent = Agent(tools=self.tools)
            
            try:
                result = agent.use_tool(tool_name, case['params'])
                
                results.append({
                    'case': case['name'],
                    'should_succeed': case['should_succeed'],
                    'succeeded': True,
                    'correct': case['should_succeed'] == True
                })
            except Exception as e:
                results.append({
                    'case': case['name'],
                    'should_succeed': case['should_succeed'],
                    'succeeded': False,
                    'error': str(e),
                    'correct': case['should_succeed'] == False
                })
        
        accuracy = sum(1 for r in results if r['correct']) / len(results)
        
        return {
            'accuracy': accuracy,
            'results': results
        }
    
    def test_error_handling(self, tool_name: str, failure_scenarios: list) -> dict:
        """Testa tratamento de erros de ferramentas"""
        
        results = []
        for scenario in failure_scenarios:
            # Configurar mock para falhar
            mock_tool = MockFailingTool(scenario['error_type'])
            
            agent = Agent(tools={tool_name: mock_tool})
            
            try:
                result = agent.execute(f"Use {tool_name} to process data")
                
                results.append({
                    'scenario': scenario['name'],
                    'handled': result.get('error_handled', False),
                    'recovered': result.get('recovered', False),
                    'fallback_used': result.get('fallback_used', False)
                })
            except Exception as e:
                results.append({
                    'scenario': scenario['name'],
                    'handled': False,
                    'unhandled_error': str(e)
                })
        
        handled_count = sum(1 for r in results if r.get('handled', False))
        
        return {
            'handling_rate': handled_count / len(results),
            'results': results
        }
```

### Simulação de Ferramentas

```python
class MockToolEnvironment:
    """Ambiente simulado para testar tool use sem dependências externas"""
    
    def __init__(self, tool_specs: dict):
        self.specs = tool_specs
        self.call_history = []
        self.mock_responses = {}
    
    def register_mock_response(self, tool: str, params: dict, response: any):
        """Registra resposta mock para combinação tool+params"""
        key = f"{tool}:{json.dumps(params, sort_keys=True)}"
        self.mock_responses[key] = response
    
    def execute_tool(self, tool_name: str, params: dict) -> any:
        """Executa ferramenta (mock ou real)"""
        
        # Registrar chamada
        self.call_history.append({
            'tool': tool_name,
            'params': params,
            'timestamp': time.time()
        })
        
        # Verificar se há resposta mock
        key = f"{tool_name}:{json.dumps(params, sort_keys=True)}"
        if key in self.mock_responses:
            return self.mock_responses[key]
        
        # Executar ferramenta real (em ambiente sandbox)
        if tool_name in self.specs:
            return self._execute_sandboxed(tool_name, params)
        
        raise ValueError(f"Tool {tool_name} not found")
    
    def get_called_tools(self) -> list:
        """Retorna lista de ferramentas chamadas"""
        return [call['tool'] for call in self.call_history]
    
    def verify_call_sequence(self, expected_sequence: list) -> bool:
        """Verifica se chamadas seguem sequência esperada"""
        actual = self.get_called_tools()
        return actual == expected_sequence
```

## Simulação de Ambientes

### Construindo Ambientes de Teste

Para testar agentes de forma reprodutível, precisamos de ambientes simulados controlados.

**Componentes de um Simulador:**

1. **Estado do Ambiente**: Representação do mundo
2. **Ações Possíveis**: O que o agente pode fazer
3. **Transições**: Como ações mudam o estado
4. **Observações**: O que o agente pode perceber
5. **Recompensas**: Feedback sobre ações

### Framework de Simulação

```python
class AgentEnvironmentSimulator:
    """Simulador genérico para teste de agents"""
    
    def __init__(self, initial_state: dict, actions: list):
        self.initial_state = initial_state
        self.state = initial_state.copy()
        self.available_actions = actions
        self.history = []
    
    def reset(self):
        """Reseta ambiente para estado inicial"""
        self.state = self.initial_state.copy()
        self.history = []
        return self.get_observation()
    
    def step(self, action: dict) -> tuple:
        """
        Executa uma ação no ambiente
        
        Returns:
            (observation, reward, done, info)
        """
        # Validar ação
        if not self._is_valid_action(action):
            return self.get_observation(), -1, False, {'error': 'Invalid action'}
        
        # Executar transição
        old_state = self.state.copy()
        self._apply_action(action)
        
        # Calcular recompensa
        reward = self._calculate_reward(old_state, self.state, action)
        
        # Verificar término
        done = self._is_terminal()
        
        # Registrar histórico
        self.history.append({
            'action': action,
            'state_before': old_state,
            'state_after': self.state.copy(),
            'reward': reward
        })
        
        return self.get_observation(), reward, done, {}
    
    def get_observation(self) -> dict:
        """Retorna observação do estado atual"""
        # Filtrar informações que agente pode ver
        return {k: v for k, v in self.state.items() if not k.startswith('_')}
    
    def _is_valid_action(self, action: dict) -> bool:
        """Verifica se ação é válida no estado atual"""
        action_type = action.get('type')
        return action_type in self.available_actions
    
    def _apply_action(self, action: dict):
        """Aplica efeito da ação no estado"""
        # Implementação específica por domínio
        pass
    
    def _calculate_reward(self, old_state: dict, new_state: dict, action: dict) -> float:
        """Calcula recompensa da transição"""
        # Implementação específica por domínio
        return 0.0
    
    def _is_terminal(self) -> bool:
        """Verifica se estado é terminal"""
        # Implementação específica por domínio
        return False
```

### Exemplo: Simulador de Sistema de Arquivos

```python
class FileSystemSimulator(AgentEnvironmentSimulator):
    """Simulador de sistema de arquivos para testar agents de coding"""
    
    def __init__(self):
        initial_state = {
            'files': {
                '/src/main.py': 'print("Hello")',
                '/src/utils.py': 'def helper(): pass',
                '/tests/test_main.py': ''
            },
            'current_dir': '/src',
            'git_status': 'clean'
        }
        
        actions = ['read_file', 'write_file', 'delete_file', 'list_dir', 'run_command']
        
        super().__init__(initial_state, actions)
    
    def _apply_action(self, action: dict):
        action_type = action['type']
        
        if action_type == 'read_file':
            path = action['path']
            # Apenas verificar existência
            if path not in self.state['files']:
                raise FileNotFoundError(f"File {path} not found")
        
        elif action_type == 'write_file':
            path = action['path']
            content = action['content']
            self.state['files'][path] = content
        
        elif action_type == 'delete_file':
            path = action['path']
            if path in self.state['files']:
                del self.state['files'][path]
        
        elif action_type == 'list_dir':
            path = action.get('path', self.state['current_dir'])
            # Retornar lista de arquivos (simulado via observation)
            pass
        
        elif action_type == 'run_command':
            command = action['command']
            # Simular execução de comando
            if 'git' in command:
                self.state['git_status'] = 'modified'
    
    def _calculate_reward(self, old_state: dict, new_state: dict, action: dict) -> float:
        """Recompensa baseada em progresso da tarefa"""
        reward = 0.0
        
        # Recompensa por criar arquivos de teste
        if action['type'] == 'write_file' and 'test' in action.get('path', ''):
            reward += 1.0
        
        # Recompensa por manter estrutura organizada
        if len(new_state['files']) > len(old_state['files']):
            if all('/' in path for path in new_state['files']):
                reward += 0.5
        
        return reward
```

## Evals Específicas para Coding

### Benchmarks de Referência

**1. SWE-bench**
- **Descrição**: Benchmark para avaliação de LLMs em tarefas reais de software engineering
- **Dataset**: 2.294 issues do GitHub de 12 repositórios Python populares
- **Métrica**: % Resolved (percentual de issues resolvidas corretamente)
- **Observacao**: resultados variam por *split*, politica de avaliacao e ambiente. Use o benchmark como comparacao relativa, nao como garantia de desempenho em producao.

**2. HumanEval / HumanEval+**
- **Descrição**: 164 problemas de programação em Python
- **Foco**: Geração de código a partir de docstrings
- **Métrica**: pass@k (probabilidade de passar em testes unitários)
- **Limitacao**: problemas sinteticos nao representam codebases reais; use como sinal complementar.

**3. AgentBench**
- **Descrição**: Avaliação abrangente de LLMs como agents
- **Ambientes**: 8 ambientes diferentes incluindo coding, OS, web
- **Métricas**: Success rate, efficiency, reasoning quality [Liu et al., 2024]

**4. MLAgentBench**
- **Descrição**: Avaliação de agents em tarefas de ML/engenharia
- **Foco**: Capacidade de iteração e aprendizado
- **Tarefas**: Experimentação ML, tuning de hiperparâmetros [Huang et al., 2024]

### Implementação de Evals

```python
class CodingEvaluationSuite:
    """Suite de avaliação para capacidades de coding"""
    
    def __init__(self):
        self.benchmarks = {
            'swe_bench': SWEBenchLoader(),
            'human_eval': HumanEvalLoader(),
            'custom': CustomBenchmarkLoader()
        }
    
    def run_swe_bench_eval(self, agent, n_problems: int = None) -> dict:
        """Executa avaliação no SWE-bench"""
        
        problems = self.benchmarks['swe_bench'].load()
        if n_problems:
            problems = problems[:n_problems]
        
        results = []
        for problem in problems:
            # Configurar ambiente
            env = self._setup_swe_env(problem)
            
            # Executar agente
            try:
                solution = agent.solve(
                    problem_description=problem['description'],
                    codebase=env.get_codebase(),
                    test_cases=problem['test_cases']
                )
                
                # Validar solução
                test_result = env.run_tests(solution)
                
                results.append({
                    'problem_id': problem['id'],
                    'solved': test_result['passed'],
                    'tests_passed': test_result['passed_count'],
                    'tests_total': test_result['total_count'],
                    'time_taken': solution['time'],
                    'steps_taken': len(solution['actions'])
                })
            except Exception as e:
                results.append({
                    'problem_id': problem['id'],
                    'solved': False,
                    'error': str(e)
                })
        
        # Calcular métricas agregadas
        solved_count = sum(1 for r in results if r['solved'])
        
        return {
            'total_problems': len(results),
            'solved': solved_count,
            'success_rate': solved_count / len(results),
            'avg_time': np.mean([r['time_taken'] for r in results if 'time_taken' in r]),
            'avg_steps': np.mean([r['steps_taken'] for r in results if 'steps_taken' in r]),
            'detailed_results': results
        }
    
    def run_functional_correctness_eval(self, agent, dataset: str = 'human_eval') -> dict:
        """Avalia correção funcional de código gerado"""
        
        problems = self.benchmarks[dataset].load()
        
        results = []
        for problem in problems:
            # Gerar código
            generated_code = agent.generate_code(
                prompt=problem['prompt'],
                test_cases=problem['test_cases']
            )
            
            # Executar testes
            test_result = self._execute_tests(generated_code, problem['test_cases'])
            
            results.append({
                'problem_id': problem['id'],
                'passed': test_result['passed'],
                'pass_rate': test_result['pass_rate'],
                'compilation_error': test_result.get('compilation_error'),
                'runtime_error': test_result.get('runtime_error')
            })
        
        pass_at_1 = sum(1 for r in results if r['pass_rate'] == 1.0) / len(results)
        
        return {
            'pass@1': pass_at_1,
            'avg_pass_rate': np.mean([r['pass_rate'] for r in results]),
            'compilation_success_rate': sum(1 for r in results if not r.get('compilation_error')) / len(results),
            'detailed_results': results
        }
```

### Métricas de Avaliação de Trajetórias

Além de resultados finais, avaliamos a trajetória do agente:

```python
class TrajectoryEvaluator:
    """Avalia trajetória de execução do agente"""
    
    def evaluate_trajectory(self, trajectory: list, optimal_path: list = None) -> dict:
        """
        Avalia qualidade da trajetória do agente
        
        Args:
            trajectory: Lista de (estado, ação, recompensa)
            optimal_path: Trajetória ótima para comparação (opcional)
        """
        
        metrics = {
            'efficiency': self._calculate_efficiency(trajectory),
            'exploration': self._calculate_exploration(trajectory),
            'redundancy': self._calculate_redundancy(trajectory),
            'dead_ends': self._count_dead_ends(trajectory),
            'recovery_actions': self._count_recovery_actions(trajectory)
        }
        
        if optimal_path:
            metrics['optimality_gap'] = self._calculate_optimality_gap(
                trajectory, optimal_path
            )
        
        return metrics
    
    def _calculate_efficiency(self, trajectory: list) -> float:
        """Calcula eficiência (recompensa total / número de passos)"""
        total_reward = sum(step['reward'] for step in trajectory)
        n_steps = len(trajectory)
        return total_reward / n_steps if n_steps > 0 else 0
    
    def _calculate_redundancy(self, trajectory: list) -> float:
        """Calcula taxa de ações redundantes"""
        actions = [step['action'] for step in trajectory]
        unique_actions = len(set(json.dumps(a, sort_keys=True) for a in actions))
        return 1.0 - (unique_actions / len(actions)) if actions else 0
```

## Practical Considerations

### Aplicações Reais

**1. Pipeline de CI para Agents**

```yaml
# .github/workflows/agent-evaluation.yml
name: Agent Evaluation
on: [push, pull_request]

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run SWE-bench Lite
        run: |
          python -m evaluation.swe_bench \
            --agent-config configs/agent.yaml \
            --dataset swe-bench-lite \
            --output results/swe_bench.json
      
      - name: Run Custom Evals
        run: |
          python -m evaluation.custom \
            --test-suite tests/agent/ \
            --environments configs/envs/ \
            --output results/custom.json
      
      - name: Generate Report
        run: |
          python -m evaluation.report \
            --results results/ \
            --thresholds configs/thresholds.yaml
```

**2. Monitoramento em Produção**

```python
# Monitoramento contínuo de agentes em produção
class ProductionAgentMonitor:
    def __init__(self):
        self.metrics = {
            'success_rate': [],
            'avg_steps': [],
            'tool_errors': [],
            'reasoning_quality': []
        }
    
    def log_execution(self, execution: dict):
        """Registra execução do agente"""
        self.metrics['success_rate'].append(execution['success'])
        self.metrics['avg_steps'].append(len(execution['steps']))
        self.metrics['tool_errors'].append(execution.get('tool_errors', 0))
        
        # Avaliar qualidade do raciocínio
        if 'reasoning_steps' in execution:
            quality = self._evaluate_reasoning_quality(execution['reasoning_steps'])
            self.metrics['reasoning_quality'].append(quality)
    
    def check_regression(self, window: int = 100) -> dict:
        """Verifica regressão em métricas"""
        
        recent = self.metrics['success_rate'][-window:]
        baseline = self.metrics['success_rate'][:-window] if len(self.metrics['success_rate']) > window else [1.0]
        
        recent_avg = np.mean(recent)
        baseline_avg = np.mean(baseline)
        
        return {
            'regression_detected': recent_avg < baseline_avg * 0.9,
            'recent_success_rate': recent_avg,
            'baseline_success_rate': baseline_avg,
            'degradation': (baseline_avg - recent_avg) / baseline_avg
        }
```

### Limitações

1. **Custo de avaliacao**: evals realistas podem ser caros (muitas chamadas, ambientes e repeticoes)
2. **Flakiness**: Agentes não-determinísticos podem ter resultados variáveis entre execuções
3. **Overfitting**: Agents podem overfitar para benchmarks específicos
4. **Generalização**: Performance em benchmarks ≠ performance em tarefas reais

### Melhores Práticas

1. **Use múltiplos benchmarks**: Não confie em métrica única
2. **Execute múltiplas vezes**: Reporte média e variância
3. **Teste em ambientes realistas**: Simuladores devem refletir produção
4. **Monitore trajetórias**: Não apenas resultados finais
5. **Valide tool use**: Ferramentas são ponto crítico de falha
6. **Teste recuperação de erros**: Agents devem ser resilientes

### Matriz de Avaliacao Consolidada

| Criterio | Descricao | Avaliacao |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill sera obsoleta em 36 meses? | Alta |
| **Custo de Verificacao** | Quanto custa validar esta atividade quando feita por IA? | Muito alto |
| **Responsabilidade Legal** | Quem e culpado se falhar? | Critica |

## Summary

- **Agentes autônomos** exigem testes que vão além de funções individuais: validação de trajetórias, CoT, e tool use
- **Chain-of-Thought** deve ser validado quanto a fluxo lógico, consistência e factualidade
- **Tool use** requer testes de seleção correta, validação de parâmetros e tratamento de erros
- **Simuladores de ambiente** permitem testes reprodutíveis e seguros
- **Evals específicas** (SWE-bench, HumanEval, AgentBench) fornecem benchmarks comparáveis
- **Métricas de trajetória** complementam avaliação de resultados finais

## References

1. Jimenez, C. et al. "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" ICLR 2024. https://www.swebench.com/

2. Chen, M. et al. "Evaluating Large Language Models Trained on Code." arXiv:2107.03374, 2021.

3. Liu, X. et al. "AgentBench: Evaluating LLMs as Agents." arXiv:2308.03688, 2024.

4. Huang, Q. et al. "MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation." arXiv:2310.03302, 2024.

5. OpenAI. "Introducing SWE-bench Verified." OpenAI Blog, August 2024. https://openai.com/index/introducing-swe-bench-verified

6. SWE-bench GitHub Organization. https://github.com/swe-bench

7. "SWE-bench authors reflect on the state of LLM agents at Neurips 2024." YouTube, 2025. (Leitura complementar)

---
title: "Vulnerabilidades em Código Gerado por IA"
created_at: "2025-01-31"
tags: ["seguranca", "codigo-gerado", "vulnerabilidades", "ia", "cwe"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# 2. Vulnerabilidades em Código Gerado por IA

## Overview

O código gerado por modelos de linguagem de grande escala (LLMs) introduziu um novo paradigma na engenharia de software, mas também trouxe desafios de segurança sem precedentes. Diferente do código escrito por humanos, que passa por revisão consciente e compreensão contextual, código gerado por IA é produzido através de processos estocásticos que podem replicar — e às vezes amplificar — padrões vulneráveis presentes nos dados de treinamento.

Esta seção examina as vulnerabilidades específicas encontradas em código gerado por IA, analisa as causas fundamentais dessas vulnerabilidades, apresenta dados empíricos sobre a prevalência de problemas de segurança e discute técnicas para detecção e mitigação.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. Identificar os tipos mais comuns de vulnerabilidades em código gerado por IA
2. Compreender as causas fundamentais que levam LLMs a gerar código inseguro
3. Interpretar dados empíricos sobre a taxa de vulnerabilidades em código sintético
4. Aplicar técnicas de análise estática e dinâmica adaptadas para código de IA
5. Implementar processos de curadoria de segurança para código gerado

## Vulnerabilidades "Alucinadas": Código Inseguro Gerado por LLMs

O termo "alucinação" em IA refere-se à geração de informações plausíveis mas incorretas. No contexto de código, alucinações de segurança ocorrem quando o modelo gera código funcional que contém vulnerabilidades — frequentemente vulnerabilidades sutis que podem passar despercebidas em revisões superficiais.

### Mecanismo de Geração de Vulnerabilidades

LLMs são treinados em vastos corpus de código, incluindo:
- Repositórios públicos (GitHub, GitLab)
- Stack Overflow e fóruns de programação
- Documentação técnica
- Tutoriais e blogs

Este código de treinamento contém uma quantidade significativa de código inseguro, vulnerável ou antipatterns. O modelo aprende a replicar esses padrões, gerando código que:

1. **Funciona corretamente** para casos de uso comuns
2. **Contém vulnerabilidades** em casos edge ou sob ataque
3. **Parece idiomático** e bem escrito, enganando revisores
4. **Carece de contexto de segurança** sobre o sistema maior

### Taxonomia de Vulnerabilidades Alucinadas

| Categoria | Descrição | Exemplo |
|-----------|-----------|---------|
| **Injeção** | Concatenação insegura de inputs | SQL injection via string interpolation |
| **Path Traversal** | Validação inadequada de caminhos | Acesso a arquivos fora do diretório permitido |
| **XSS** | Output sem escaping | Renderização direta de user input em HTML |
| **Command Injection** | Execução de comandos shell | Passagem de user input para system() |
| **Insecure Deserialization** | Parsing inseguro de dados | pickle.loads() em dados não-confiáveis |
| **Race Conditions** | Acesso concorrente não-sincronizado | Check-then-act sem locks |
| **Hardcoded Secrets** | Credenciais em código | API keys em strings literais |

## Análise de Segurança de Código Sintético

A análise de segurança de código gerado por IA apresenta desafios únicos que diferem da análise de código escrito por humanos.

### Diferenças na Análise de Código de IA vs. Humano

| Aspecto | Código Humano | Código de IA |
|---------|---------------|--------------|
| **Intenção** | O desenvolvedor compreende o contexto de segurança | O modelo não tem compreensão real de segurança |
| **Padrões** | Pode seguir ou ignorar boas práticas conscientemente | Replica padrões estatísticos dos dados de treino |
| **Consistência** | Geralmente consistente com estilo da equipe | Pode variar entre diferentes prompts |
| **Documentação** | Pode incluir comentários explicativos | Comentários podem ser genéricos ou incorretos |
| **Contexto** | Compreensão do sistema como um todo | Visão limitada ao contexto do prompt |

### Desafios na Análise Estática

Ferramentas de análise estática (SAST) tradicionais enfrentam desafios com código de IA:

1. **Código incompleto**: Snippets gerados podem não ser compiláveis/analisáveis isoladamente
2. **Falsos positivos**: Padrões inseguros podem ser intencionais em contextos específicos
3. **Contexto ausente**: Ferramentas não têm acesso ao prompt que gerou o código
4. **Evolução rápida**: Novos padrões de código gerado surgem constantemente

### Abordagens Adaptadas para Análise de Código de IA

1. **Análise contextual**: Considerar o prompt e contexto de geração
2. **Validação semântica**: Análise além de padrões sintáticos
3. **Comparação com corpus seguro**: Matching contra bases de código seguro
4. **Análise de comportamento**: Testes dinâmicos para detectar vulnerabilidades em execução
5. **Human-in-the-loop**: Revisão obrigatória por engenheiros de segurança

## CWEs Comuns em Código de IA

Análises empíricas identificaram padrões consistentes de vulnerabilidades em código gerado por IA. Os CWEs (Common Weakness Enumeration) mais frequentes refletem falhas clássicas de segurança que persistem nos dados de treinamento.

### Top CWEs em Código Gerado por IA

Com base em estudos empíricos recentes (Pearce et al., 2025; análise de 7.703 arquivos em repositórios GitHub):

| Rank | CWE | Descrição | Taxa em Python | Taxa em JavaScript |
|------|-----|-----------|----------------|-------------------|
| 1 | CWE-89 | SQL Injection | Alta | Média |
| 2 | CWE-78 | OS Command Injection | Alta | Média |
| 3 | CWE-94 | Code Injection | Média | Alta |
| 4 | CWE-22 | Path Traversal | Média | Média |
| 5 | CWE-502 | Deserialization of Untrusted Data | Alta | Baixa |
| 6 | CWE-798 | Use of Hardcoded Credentials | Média | Média |
| 7 | CWE-772 | Missing Resource Release | Alta (ChatGPT) | Baixa |
| 8 | CWE-200 | Exposure of Sensitive Information | Média | Média |

### Análise por Linguagem

**Python:**
- Taxa de vulnerabilidade: 16,18% - 18,50%
- CWEs predominantes: SQL injection, command injection, resource management
- Padrão: Código conciso mas frequentemente sem validação adequada

**JavaScript/TypeScript:**
- Taxa de vulnerabilidade: 8,66% - 8,99% (JS), 2,50% - 7,14% (TS)
- CWEs predominantes: XSS, prototype pollution, insecure dependencies
- Padrão: Maior atenção a async/await, mas vulnerabilidades de DOM persistentes

**Java:**
- Taxa intermediária entre Python e JavaScript
- CWEs predominantes: Deserialization, path traversal, SQL injection

### Exemplos de Vulnerabilidades por CWE

**CWE-89: SQL Injection**
```python
# Código gerado por IA - VULNERÁVEL
def get_user(username):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query)

# Problema: Concatenação direta de input do usuário
# Ataque: username = "' OR '1'='1"
```

**CWE-78: Command Injection**
```python
# Código gerado por IA - VULNERÁVEL
import os

def process_file(filename):
    os.system(f"cat {filename}")  # Vulnerável a command injection
    
# Ataque: filename = "; rm -rf /"
```

**CWE-502: Insecure Deserialization**
```python
# Código gerado por IA - VULNERÁVEL
import pickle

def load_user_data(data):
    return pickle.loads(data)  # Execução de código arbitrário possível
```

## Estudos Empíricos: Taxa de Vulnerabilidades em Código Gerado

Múltiplos estudos acadêmicos e da indústria quantificaram a prevalência de vulnerabilidades em código gerado por IA.

### Estudo de Grande Escala: GitHub Repositories (2025)

Pearce et al. (2025) analisaram 7.703 arquivos em repositórios GitHub públicos atribuídos a ferramentas de IA:

**Métricas Principais:**
- **4.241 instâncias de CWE** identificadas
- **77 tipos distintos** de vulnerabilidades
- **87,9% do código** não continha vulnerabilidades CWE mapeáveis
- **12,1% do código** continha pelo menos uma vulnerabilidade

**Distribuição por Ferramenta:**
- ChatGPT: 91,52% dos arquivos analisados
- GitHub Copilot: 7,50%
- Amazon CodeWhisperer: 0,52%
- Tabnine: 0,46%

**Densidade de Segurança (LOC por CWE):**
- GitHub Copilot (Python): 1.739 LOC/CWE
- GitHub Copilot (TypeScript): 905 LOC/CWE
- ChatGPT (JavaScript): 932 LOC/CWE

### Estudo: GitHub Copilot Security (2024)

Atualização do estudo clássico "Asleep at the Keyboard?":
- Aproximadamente **40% dos snippets** gerados pelo Copilot continham vulnerabilidades
- Código Python mostrou maior taxa de vulnerabilidades que JavaScript
- Vulnerabilidades de injeção predominaram em todos os cenários testados

### Estudo: "AI Code in the Wild" (2025)

Análise de commits em 1.000 maiores repositórios GitHub (2022-2025):
- Algumas famílias de CWE são **sobrepresentadas** em código marcado como IA
- Templates inseguros **persistem e se espalham** entre projetos não-relacionados
- Defeitos introduzidos por IA **persistem mais tempo** quando a revisão humana é superficial
- Vulnerabilidades se **propagam** para mais arquivos e repositórios ao longo do tempo

### Implicações dos Dados Empíricos

1. **Código gerado por IA não é inerentemente inseguro**, mas requer verificação rigorosa
2. **Vulnerabilidades clássicas persistem** — IA replica padrões inseguros dos dados de treino
3. **Revisão humana é crítica** — vulnerabilidades persistem quando a revisão é superficial
4. **Contexto importa** — código que parece seguro isoladamente pode ser vulnerável no sistema maior

## Ferramentas de Análise de Segurança para Código de IA

O ecossistema de ferramentas de segurança está evoluindo para lidar com as especificidades do código gerado por IA.

### Ferramentas SAST Adaptadas

**DeVAIC (Detection of Vulnerabilities in AI-generated Code)**
- Ferramenta especializada para código Python gerado por IA
- Baseada em regras de regex cobrindo 35 CWEs do OWASP Top 10
- **F1-Score e Acurácia de 94%**
- Tempo de processamento: 0,14 segundos por snippet
- Significativamente superior a soluções state-of-the-art anteriores

**CodeQL com Regras Estendidas**
- GitHub expandiu regras CodeQL para detectar vulnerabilidades comuns em código de IA
- Integração com GitHub Copilot para feedback em tempo real
- Análise de fluxo de dados aprimorada para detectar injeções

**SonarQube/SonarSource**
- Regras específicas para código gerado por IA
- Detecção de padrões inseguros comuns em snippets de LLM
- Integração com pipelines CI/CD

### Ferramentas de Análise Dinâmica

**Fuzzing Direcionado**
- Geração de inputs baseada em compreensão de prompts
- Foco em casos edge que podem expor vulnerabilidades
- Integração com LLMs para geração de casos de teste adversariais

**Sandboxing e Execução Segura**
- Ambientes isolados para testar código gerado
- Monitoramento de comportamento em runtime
- Detecção de atividades suspeitas (acesso a arquivos, rede, etc.)

### Abordagens Emergentes

**LLM-as-a-Judge**
- Uso de LLMs para revisar código gerado por outros LLMs
- Análise semântica de segurança
- Identificação de vulnerabilidades lógicas além de padrões sintáticos

**Análise de Similaridade**
- Comparação de código gerado contra bases de código vulnerável conhecido
- Detecção de padrões problemáticos do treinamento
- Matching contra corpus de código seguro

## Processo de Curadoria de Segurança

A curadoria de segurança para código gerado por IA deve ser um processo sistemático e rigoroso.

### Pipeline de Curadoria de Segurança

```
┌─────────────────────────────────────────────────────────────┐
│  1. GERAÇÃO                                                 │
│  - Geração inicial pelo LLM                                │
│  - Documentação do prompt e contexto                       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  2. ANÁLISE ESTÁTICA AUTOMATIZADA                          │
│  - SAST com regras para código de IA                       │
│  - Linting e análise de padrões                            │
│  - Detecção de secrets e credenciais                       │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  3. ANÁLISE SEMÂNTICA                                       │
│  - Revisão de segurança por LLM (LLM-as-a-Judge)          │
│  - Análise de fluxo de dados                               │
│  - Identificação de vulnerabilidades lógicas               │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┘
│  4. TESTES DINÂMICOS                                        │
│  - Fuzzing direcionado                                     │
│  - Testes de segurança automatizados                       │
│  - Execução em sandbox                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│  5. REVISÃO HUMANA OBRIGATÓRIA                             │
│  - Revisão por engenheiro de segurança                     │
│  - Verificação de contexto do sistema                      │
│  - Aprovação para merge                                    │
└─────────────────────────────────────────────────────────────┘
```

### Checklist de Curadoria de Segurança

**Validação de Input:**
- [ ] Todos os inputs externos são validados
- [ ] Sanitização adequada para o contexto (SQL, HTML, comandos)
- [ ] Rate limiting implementado onde apropriado

**Proteção contra Injeção:**
- [ ] Uso de prepared statements para SQL
- [ ] Escaping adequado para HTML/JS
- [ ] Validação de caminhos de arquivo
- [ ] Nenhuma execução direta de comandos shell com input do usuário

**Gestão de Secrets:**
- [ ] Nenhuma credencial hardcoded
- [ ] Uso de gestão de secrets apropriada
- [ ] Rotação de credenciais configurada

**Gestão de Recursos:**
- [ ] Fechamento adequado de recursos (arquivos, conexões)
- [ ] Tratamento de exceções que não vaza informação
- [ ] Prevenção de resource exhaustion

**Contexto do Sistema:**
- [ ] Código é seguro no contexto do sistema maior
- [ ] Trust boundaries são respeitados
- [ ] Privilégios mínimos são aplicados

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Média — ferramentas melhoram, mas vulnerabilidades clássicas persistem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto — análise de segurança re expertise especializada |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — vulnerabilidades em produção têm consequências severas |

## Practical Considerations

### Aplicações Reais

1. **Nunca confie cegamente em código gerado**: Assuma que pode conter vulnerabilidades até prova em contrário
2. **Use múltiplas camadas de verificação**: SAST, análise semântica, testes dinâmicos e revisão humana
3. **Mantenha um registro de prompts**: Documente o contexto de geração para análise posterior
4. **Estabeleça padrões de codificação segura**: Guidelines claras para uso de ferramentas de IA
5. **Invista em treinamento**: Equipes devem entender vulnerabilidades comuns em código de IA

### Limitações

- **Ferramentas SAST não são perfeitas**: Podem gerar falsos positivos/negativos
- **Contexto limitado**: Ferramentas podem não detectar vulnerabilidades que dependem de contexto do sistema
- **Evolução rápida**: Novos padrões de vulnerabilidade surgem conforme LLMs evoluem
- **Custo computacional**: Análise profunda de segurança é cara em termos de tempo e recursos

### Melhores Práticas

1. **Adote "security by default"**: Configure ferramentas de IA para priorizar segurança
2. **Implemente gates de segurança**: Nenhum código gerado por IA vai para produção sem revisão
3. **Use ambientes isolados**: Teste código gerado em sandboxes antes de integração
4. **Mantenha-se atualizado**: Acompanhe pesquisas sobre vulnerabilidades em código de IA
5. **Cultura de segurança**: Incentive equipes a reportar e discutir vulnerabilidades encontradas

## Summary

- Código gerado por IA frequentemente contém vulnerabilidades "alucinadas" — código funcional mas inseguro
- Estudos empíricos mostram 12-40% de taxa de vulnerabilidades, dependendo da linguagem e ferramenta
- CWEs clássicos (SQL injection, command injection, path traversal) predominam em código de IA
- Ferramentas SAST tradicionais precisam de adaptações para código gerado por LLMs
- Processo de curadoria deve incluir análise estática, dinâmica e revisão humana obrigatória
- Python apresenta maior taxa de vulnerabilidades (16-18%) comparado a JavaScript (8-9%)
- Código de IA requer verificação rigorosa antes de ir para produção

## References

1. Pearce, H., et al. "Security Vulnerabilities in AI-Generated Code: A Large-Scale Analysis of Public GitHub Repositories." Proceedings of the 27th International Conference on Information and Communications Security (ICICS 2025), arXiv:2510.26103, 2025.

2. Pearce, H., et al. "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions." IEEE Symposium on Security and Privacy (S&P), 2024 (Updated).

3. "AI Code in the Wild: Measuring Security Risks and Ecosystem Shifts of AI-Generated Code in Modern Software." arXiv:2512.18567, 2025.

4. DeVAIC Team. "DeVAIC: A Tool for Security Assessment of AI-Generated Code." Information and Software Technology, Vol. 177, 2025. https://doi.org/10.1016/j.infsof.2024.107595

5. SonarSource. "Security Analysis of AI-Generated Code: Challenges and Solutions." SonarSource Blog, 2025.

6. GitHub. "CodeQL Security Analysis for AI-Generated Code." GitHub Security Lab, 2025.

7. MITRE. "Common Weakness Enumeration (CWE)." https://cwe.mitre.org/

8. OWASP. "OWASP Top 10:2021." Open Web Application Security Project, 2021.

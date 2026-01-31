---
title: "Qualidade de Software em Sistemas Gerados por IA"
created_at: "2025-01-15"
updated_at: "2026-01-31"
tags: ["software-quality", "ai-generated-code", "quality-assurance", "metrics", "auditability", "swebok-ai"]
status: "published"
ai_model: "openai/gpt-5.2"
---

# 12.1 Qualidade de Software em Sistemas Gerados por IA

## Overview

O Capítulo 12 do SWEBOK-AI v5.0 redefine completamente o conceito de Software Quality para a era dos Large Language Models (LLMs). Enquanto o SWEBOK v4.0 focava em qualidade de produto (funcionalidade, confiabilidade, usabilidade, eficiência, manutenibilidade, portabilidade) e qualidade de processo (ISO 9001, CMMI), a versão 5.0 reconhece que **a qualidade tornou-se uma propriedade emergente de sistemas híbridos, onde código gerado por IA introduz novas dimensões de incerteza, opacidade e variabilidade comportamental** (COTRONEO et al., 2024; HANDA et al., 2025).

Este capítulo apresenta os fundamentos, frameworks e práticas para garantir qualidade quando: (1) o código é gerado por sistemas estocásticos; (2) a compreensibilidade é comprometida por opacidade; (3) a consistência comportamental é probabilística; e (4) a qualidade deve ser verificada em tempo de curadoria, não só em tempo de execução.

O foco desloca-se de "garantir qualidade de código humano através de processos e métricas tradicionais" para "garantir qualidade de sistemas híbridos através de verificação em múltiplas camadas e governança de comportamento".

### Paradigma do Capítulo

| Antes (SWEBOK v4) | Depois (SWEBOK-AI v5) |
|-------------------|----------------------|
| Qualidade como conformidade a especificações | Qualidade como conformidade a distribuições de comportamento esperado |
| Métricas estáticas (complexidade ciclomática, coesão) | Métricas dinâmicas (consistência temporal, robustez a variações) |
| Code review como garantia de qualidade | Curadoria multi-camadas como garantia de qualidade |
| Qualidade medida em tempo de build/teste | Qualidade medida em tempo de geração, verificação e operação |
| Bugs como desvios da especificação | Bugs como comportamentos fora da distribuição de treinamento |
| Manutenibilidade baseada em código limpo | Manutenibilidade baseada em rastreabilidade de geração |
| ISO 25010 como framework completo | ISO 25010 adaptado + dimensões específicas de IA |

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:

1. **Avaliar a qualidade de código gerado por IA** utilizando métricas adaptadas e identificar code smells específicos de sistemas estocásticos, diferenciando entre débito técnico visível e invisível em projetos híbridos.

2. **Projetar pipelines de garantia de qualidade** que integrem verificação automatizada, curadoria humana e testes de consistência comportamental, estabelecendo quality gates apropriados para sistemas com componentes de IA.

3. **Implementar práticas de auditabilidade e explicabilidade** que permitam rastrear decisões de geração, documentar raciocínios de IA e garantir conformidade regulatória em sistemas críticos.

## Fundamentos de Qualidade em Sistemas Híbridos

### Evolução do Conceito de Qualidade com IA

A qualidade de software em sistemas com IA requer dimensões adicionais além das tradicionais definidas na ISO/IEC 25010. Pesquisas recentes demonstram que 59% dos desenvolvedores relatam melhoria na qualidade com uso de IA, enquanto 21% observam degradação (QODO, 2025). Essa aparente contradição reflete a dualidade da geração automática: a IA pode produzir código sintaticamente correto e funcionalmente adequado, mas introduzir débito técnico invisível que só se manifesta em longo prazo.

Dados empíricos de larga escala revelam preocupações quantitativas significativas:
- Código gerado por IA apresenta **4x mais duplicação** comparado a código humano (GITCLEAR, 2025)
- **40% da dívida técnica** em projetos com IA é classificada como "invisível" — problemas estruturais não detectáveis por análise superficial (SONARSOURCE, 2025)
- Apenas **35% das organizações** possuem políticas formais de qualidade para código gerado por IA (GARTNER, 2024)

### Novas Dimensões de Qualidade

O framework ISO 25010 deve ser estendido para sistemas gerados por IA, incorporando dimensões específicas:

```
ISO 25010 Original          Dimensões Adicionais para IA
├── Funcionalidade          ├── Consistência Comportamental
├── Confiabilidade          ├── Robustez a Variações
├── Usabilidade             ├── Explicabilidade
├── Eficiência              ├── Rastreabilidade de Geração
├── Manutenibilidade        ├── Auditabilidade
├── Portabilidade           └── Qualidade de Prompts
└── Segurança
```

**Consistência Comportamental** refere-se à estabilidade do comportamento do código gerado em múltiplas execuções com entradas idênticas ou semelhantes. Diferente de sistemas determinísticos tradicionais, componentes de IA podem apresentar variabilidade intrínseca que deve ser quantificada e limitada (COTRONEO et al., 2024).

**Robustez a Variações** mede a capacidade do sistema de manter comportamento adequado quando submetido a inputs perturbados, ambíguos ou fora da distribuição de treinamento. Testes de robustez específicos para código de IA são essenciais (ACM TESTGENAI, 2025).

**Explicabilidade** torna-se crítica quando decisões de negócio ou segurança dependem de código gerado automaticamente. Técnicas como Chain-of-Thought logging e program slicing permitem rastrear quais partes do código foram influenciadas por aspectos específicos dos prompts (IEEE, 2024).

### Trade-offs: Velocidade de Geração vs. Qualidade Verificável

O paradigma de desenvolvimento com IA introduz tensões fundamentais:

| Dimensão | Trade-off | Implicação |
|----------|-----------|------------|
| Velocidade | Geração rápida vs. verificação rigorosa | Código gerado em segundos pode exigir horas de curadoria |
| Criatividade | Soluções inovadoras vs. previsibilidade | Código não idiomático é mais difícil de manter |
| Abstração | Generalização vs. especificidade | Código genérico pode não atender requisitos específicos |
| Explicabilidade | Transparência vs. performance | Modelos maiores geram código melhor mas são menos interpretáveis |

### Qualidade como Propriedade Emergente

Em sistemas híbridos, qualidade não é apenas construída — ela emerge das interações entre componentes humanos e automatizados. Esta perspectiva exige:

1. **Monitoramento contínuo** em todos os estágios do ciclo de vida
2. **Feedback loops** entre geração, verificação e operação
3. **Governança adaptativa** que ajuste thresholds conforme o contexto

## Qualidade de Código Gerado por LLMs

### Métricas Tradicionais Adaptadas

Métricas clássicas de qualidade de software requerem adaptação para código gerado por IA:

| Métrica Tradicional | Adaptação para IA | Threshold Recomendado | Interpretação |
|---------------------|-------------------|----------------------|---------------|
| Complexidade Ciclomática | Alerta quando > 15 ou < 3 | 3-15 | Código muito simples pode ser suspeito de superficialidade |
| Duplicação de Código | Threshold mais baixo | < 3% | IA gera código duplicado frequentemente |
| Code Churn | Monitorar padrões de modificação | < 15% | Alto churn indica instabilidade do gerador |
| Cobertura de Testes | Necessária mas não suficiente | > 80% | Testes não capturam comportamento estocástico |
| Acoplamento | Métrica de acoplamento ajustada | < 0.3 | Código de IA tende a violar SOLID (DIVA, 2025) |
| Coesão | Coesão reduzida aceitável | > 0.5 | Baixa coesão em código gerado é comum |

### Code Smells Específicos de Código de IA

Pesquisas identificaram anti-padrões únicos em código gerado por LLMs (SONARSOURCE, 2024; DIVA, 2025):

**AI Verbosity (Verbosidade de IA)**
Código desnecessariamente longo com múltiplas camadas de abstração que não agregam valor. Exemplo: funções de parsing que poderiam ser substituídas por expressões regulares simples.

**Defensive Overkill**
Excesso de tratamento de edge cases improváveis, resultando em código inchado e difícil de testar. A IA frequentemente adiciona validações redundantes "por segurança".

**Inconsistent Abstraction**
Mistura de estilos de programação dentro do mesmo módulo, refletindo a natureza heterogênea dos dados de treinamento. Padrões de nomenclatura, indentação e estrutura variam inconsistentemente.

**Hallucinated Dependencies**
Imports de bibliotecas inexistentes ou uso de APIs que não existem na versão atual do framework. Ocorrência particularmente comum quando o modelo foi treinado em dados desatualizados.

**Pattern Amnesia**
Falha em seguir padrões estabelecidos do projeto. A IA gera código que funciona isoladamente mas não se integra consistentemente à arquitetura existente.

**Nonsensical Naming**
Nomes de métodos e variáveis que refletem ruído dos dados de treinamento, frequentemente genéricos demais ou semanticamente inadequados.

### Qualidade de Prompts e sua Relação com Qualidade de Código

A qualidade do código gerado está diretamente correlacionada à qualidade dos prompts. Frameworks de engenharia de prompts identificam padrões que maximizam qualidade:

```python
class PromptQualityFramework:
    """
    Framework para avaliação de qualidade de prompts
    """
    
    def evaluate_prompt_quality(self, prompt):
        dimensions = {
            'specificity': self.measure_specificity(prompt),
            'context_richness': self.assess_context(prompt),
            'constraint_clarity': self.evaluate_constraints(prompt),
            'example_quality': self.check_examples(prompt)
        }
        
        return PromptQualityScore(
            overall=self.weighted_average(dimensions),
            recommendations=self.generate_improvements(dimensions)
        )
```

### Análise Estática para Código Sintético

Ferramentas de análise estática tradicionais requerem adaptações para código gerado por IA. O framework ACCA (Automating the Correctness Assessment) utiliza execução simbólica para alinhar avaliações automatizadas com julgamentos humanos em 93% dos casos (COTRONEO et al., 2024).

A abordagem Vibe Coding combina:
- Análise estática tradicional
- Verificação formal
- Detecção de vulnerabilidades baseada em ML

Resultados demonstram redução de 73% em vulnerabilidades de segurança e melhoria de 68% em métricas de qualidade (HANDA et al., 2025).

### Benchmarks de Qualidade para Código Gerado

O NIST GenAI Pilot Code Challenge (2025) estabeleceu baselines para avaliação:

| Métrica | LLM Base | Ensemble | Meta-verificação |
|---------|----------|----------|------------------|
| Cobertura de Testes | 65% | 82% | 91% |
| Precisão de Correção | 78% | 85% | 93% |
| Taxa de Falsos Positivos | 22% | 12% | 5% |

## Qualidade Comportamental e Robusta

### Consistência em Múltiplas Execuções

A natureza estocástica de LLMs introduz variabilidade no código gerado. Métricas de consistência quantificam esta variabilidade:

**Coeficiente de Variação (CV)**
Mede a dispersão relativa do comportamento em múltiplas execuções:

```
CV = σ / μ
```

Onde σ é o desvio padrão e μ é a média de uma métrica de comportamento (ex: tempo de execução, saída para input fixo).

**Thresholds de Aceitação:**
- CV < 0.1: Alta consistência (aceitável para produção)
- 0.1 ≤ CV < 0.3: Consistência moderada (requer monitoramento)
- CV ≥ 0.3: Baixa consistência (não adequado para sistemas críticos)

### Robustez a Variações de Input e Contexto

Testes de robustez específicos para código de IA incluem:

**Metamorphic Testing**
Geração de pares transformação input-output para validar comportamento sob variações controladas (HOU et al., 2024). Se $f(x) = y$, então $f(T(x))$ deve relacionar-se a $T(y)$ de forma previsível.

**Fuzz Testing de Prompts**
Variações sistemáticas nos prompts para identificar comportamentos frágeis. Pesquisas demonstram que pequenas alterações em prompts podem gerar código com aumento de 2x em erros de runtime (ACM TESTGENAI, 2025).

**Testes de Perturbação Semântica**
Inputs semanticamente equivalentes mas sintaticamente diferentes para avaliar estabilidade do comportamento.

### Determinismo Parcial e Tolerância Aceitável

Sistemas híbridos devem definir níveis aceitáveis de não-determinismo:

| Criticidade | Tolerância de Variabilidade | Estratégia |
|-------------|---------------------------|------------|
| Crítica (safety-critical) | Zero — comportamento idêntico | Verificação formal + curadoria obrigatória |
| Alta (financeiro, saúde) | Baixa — CV < 0.05 | Múltiplas gerações + votação |
| Média (enterprise) | Moderada — CV < 0.15 | Testes de consistência + amostragem |
| Baixa (prototipagem) | Alta — CV < 0.5 | Revisão manual seletiva |

### Quality Gates para Comportamento Estocástico

Quality gates adaptados para sistemas com IA devem incluir verificações estatísticas:

```
Gate 1: Sintaxe (Linting, parsing)
Gate 2: Estática (Análise de smells, complexidade)
Gate 3: Semântica (Testes unitários, integração)
Gate 4: Comportamental (Testes de consistência, robustez)
Gate 5: Curadoria (Revisão humana obrigatória)
```

Cada gate deve definir critérios de aceitação quantitativos e procedimentos de escalonamento quando thresholds não são atingidos.

## Explicabilidade e Interpretabilidade

### Transparência em Decisões de Código Gerado

A explicabilidade em sistemas gerados por IA opera em múltiplos níveis:

| Nível | Descrição | Método | Custo |
|-------|-----------|--------|-------|
| 1 | Código legível | Convenções, comentários | Baixo |
| 2 | Raciocínio documentado | Chain-of-Thought logging | Médio |
| 3 | Decisões justificáveis | Attention weights, saliency maps | Alto |
| 4 | Comportamento previsível | Testes de caracterização | Médio |

### Chain-of-Thought como Documentação de Raciocínio

O uso de Chain-of-Thought (CoT) em prompts de geração de código produz não apenas o código, mas também o raciocínio que o precedeu. Esta documentação implícita pode ser capturada e arquivada:

```python
def generate_with_cot_documentation(prompt):
    """
    Gera código com documentação de raciocínio
    """
    cot_prompt = f"""
    {prompt}
    
    Antes de escrever o código, explique seu raciocínio passo a passo.
    Depois, forneça o código implementado.
    """
    
    response = llm.generate(cot_prompt)
    reasoning, code = parse_cot_response(response)
    
    # Arquivar raciocínio para auditoria futura
    audit_log.store(prompt, reasoning, code)
    
    return code
```

### Interpretabilidade de Embeddings e Representações

Para código gerado, técnicas de interpretabilidade incluem:

**Program Slicing**
Identificação de regiões do código influenciadas por aspectos específicos do prompt, permitindo rastrear quais requisitos geraram quais implementações.

**Attention Visualization**
Mapeamento de quais tokens do prompt receberam maior atenção durante a geração de trechos específicos de código.

**Feature Attribution**
Atribuição de importância relativa a diferentes características do prompt na determinação do output.

### Trade-offs: Explicabilidade vs. Performance

A busca por explicabilidade envolve compensações:

- **Mais explicabilidade** → Menos performance (overhead de CoT, modelos maiores)
- **Menos explicabilidade** → Mais risco operacional e dificuldade de auditoria

A escolha do nível apropriado depende do contexto regulatório e da criticidade do sistema.

### Auditoria de Decisões de IA em Código

Frameworks de auditoria devem capturar:

1. **Proveniência**: Qual modelo, versão e parâmetros geraram o código
2. **Contexto**: Prompt completo e contexto de geração
3. **Decisões**: Raciocínios documentados (CoT)
4. **Verificações**: Resultados de testes e análises aplicados
5. **Curadoria**: Quem revisou, quando e quais alterações foram feitas

O NIST AI Risk Management Framework (2024) recomenda documentação de proveniência de dados de treinamento, resultados de avaliação de modelo e outputs de geração de código.

## Garantia de Qualidade e Processos de Curadoria

### QA Adaptado para Desenvolvimento com IA

A garantia de qualidade tradicional evolui para incorporar verificação de código gerado:

**Framework ACCA** (Automating the Correctness Assessment)
Utiliza execução simbólica para avaliar correção de código gerado, correlacionando-se fortemente (Pearson's ρ > 0.9) com julgamentos humanos e superando baselines de similaridade de output (BUI et al., 2023).

**Framework Openia**
Utiliza representações internas de LLMs para predizer correção, alcançando até 2x melhoria em acurácia sobre métodos zero-shot e 3x em cenários específicos de repositório (FOGGIA et al., 2025).

### Processos de Curadoria Multi-Camadas

A curadoria efetiva de código gerado por IA opera em múltiplas camadas:

```
Camada 1: Auto-verificação (IA verifica próprio código)
Camada 2: Verificação automatizada (testes, linting, análise estática)
Camada 3: Curadoria por pares (engenheiros revisam)
Camada 4: QA especializado (equipe dedicada a código de IA)
Camada 5: Aceitação (stakeholders validam)
```

Cada camada filtra defeitos que escaparam às camadas anteriores. Pesquisas demonstram que curadoria estruturada reduz taxa de escape de defeitos em 60% em pipelines de CI (COTRONEO et al., 2025).

### Checklists de Qualidade para Código Gerado

Checklists sistemáticos garantem consistência na avaliação:

**Checklist de Sintaxe e Estilo**
- [ ] Código compila/executa sem erros
- [ ] Segue guia de estilo do projeto
- [ ] Nomeação consistente e semântica
- [ ] Sem duplicação acima do threshold

**Checklist de Funcionalidade**
- [ ] Atende requisitos especificados
- [ ] Testes unitários passam
- [ ] Casos edge cobertos
- [ ] Sem regressões detectadas

**Checklist de IA-Específico**
- [ ] Sem dependências alucinadas
- [ ] Segue padrões arquiteturais do projeto
- [ ] Consistência comportamental verificada
- [ ] Raciocínio documentado (se aplicável)

**Checklist de Segurança**
- [ ] Sem vulnerabilidades conhecidas
- [ ] Validação de inputs adequada
- [ ] Sem exposição de dados sensíveis
- [ ] Princípios de least privilege aplicados

### Métricas de Eficácia de Curadoria

Métricas quantitativas avaliam o processo de curadoria:

| Métrica | Definição | Threshold Alvo |
|---------|-----------|----------------|
| False Acceptance Rate | Bugs que passaram pela curadoria | < 2% |
| False Rejection Rate | Código bom rejeitado | < 15% |
| Curation Yield | % de código gerado aceito | 60-80% |
| Quality Escape Rate | Defeitos encontrados em produção | < 0.5% |
| Time-to-Curate | Tempo médio de curadoria | < 30 min/PR |

### Automação de QA com IA (Meta-verificação)

O uso de IA para verificar código gerado por IA — meta-verificação — apresenta oportunidades e riscos:

**Oportunidades:**
- Escalabilidade da verificação
- Consistência na aplicação de regras
- Detecção de padrões sutis

**Riscos:**
- Viés compartilhado entre gerador e verificador
- Alucinações na verificação
- Complexidade de debugging quando ambos falham

Melhores práticas recomendam diversificação: verificadores de IA diferentes dos geradores, com validação humana de amostras.

## Governança de Qualidade e Frameworks

### Frameworks de Qualidade Adaptados

**ISO 25010 + Extensões para IA**
Extensões propostas ao ISO 25010 cobrem características específicas de código gerado por IA, incluindo consistência comportamental, rastreabilidade de geração e auditabilidade (ISO/IEC, 2025).

**NIST AI Risk Management Framework**
Recomendações para gerenciamento de riscos em sistemas de IA, incluindo documentação de proveniência, avaliação de viés e confiabilidade (NIST, 2024).

**IEEE Standards para Código Gerado**
Standards emergentes para qualidade em desenvolvimento assistido por IA, abordando accountability, transparência e conformidade (IEEE, 2024).

### Políticas de Qualidade para Código de IA

Organizações devem estabelecer políticas claras:

1. **Aprovação de Modelos**: Apenas modelos aprovados podem ser usados para geração de código de produção
2. **Curadoria Obrigatória**: Código de IA requer revisão humana antes de merge
3. **Thresholds por Criticidade**: Sistemas críticos exigem verificação mais rigorosa
4. **Rastreabilidade**: Todo código de IA deve ser identificável e rastreável
5. **Treinamento**: Equipes devem ser treinadas em curadoria de código de IA

### Conformidade Regulatória em Sistemas com IA

Regulamentações emergentes afetam qualidade de software:

**EU AI Act**
Sistemas de IA de alto risco devem demonstrar conformidade com requisitos de qualidade, incluindo precisão, robustez e segurança cibernética.

**Setores Regulados**
Indústrias como aviação (DO-178C), ferrovias (EN 50128) e dispositivos médicos estão adaptando standards para incorporar considerações de IA.

### Métricas de Maturidade em Qualidade de IA

Modelos de maturidade avaliam a maturidade organizacional:

| Nível | Características | Indicadores |
|-------|-----------------|-------------|
| 1 - Inicial | Uso ad-hoc de IA | Sem políticas formais |
| 2 - Gerenciado | Políticas definidas | Checklists básicos |
| 3 - Definido | Processos padronizados | Quality gates estabelecidos |
| 4 - Quantitativo | Métricas sistemáticas | Dashboards de qualidade |
| 5 - Otimizando | Melhoria contínua | Feedback loops automatizados |

### Ferramentas de Gestão da Qualidade

O panorama de ferramentas para qualidade de código de IA inclui (GARTNER, 2025):

- **Análise Estática**: SonarQube com regras específicas para IA, CodeQL
- **Verificação de Consistência**: Ferramentas proprietárias de metamorphic testing
- **Detecção de Vulnerabilidades**: Snyk, GitHub Advanced Security
- **Curadoria**: Plataformas com workflows de revisão integrados
- **Rastreabilidade**: Droid (detecção e lineage tracking), sistemas de audit logging

## Practical Considerations

### Aplicações Reais

**Cenário 1: Startup de Fintech**
- Desafio: Gerar código de integração bancária rapidamente sem comprometer segurança
- Solução: Quality gates obrigatórios com verificação de segurança automatizada + curadoria de security engineer
- Resultado: 40% redução no tempo de desenvolvimento com zero vulnerabilidades críticas em produção

**Cenário 2: Sistema de Saúde Crítico**
- Desafio: Usar IA para acelerar desenvolvimento mantendo conformidade FDA
- Solução: Verificação formal + curadoria multi-camadas + documentação completa de raciocínio
- Resultado: Aprovação regulatória mantida com 25% aceleração no ciclo de desenvolvimento

**Cenário 3: Plataforma Enterprise**
- Desafio: Escala de curadoria para milhares de desenvolvedores
- Solução: Automação de QA com IA + amostragem estatística para revisão humana
- Resultado: Capacidade de curadoria escalada 10x sem aumento proporcional de equipe

### Limitações

1. **Custo de Verificação**: Verificação rigorosa de código gerado pode custar mais que desenvolvimento tradicional em sistemas pequenos
2. **Fadiga de Curadoria**: Revisores humanos podem desenvolver complacência com código de IA aparentemente bom
3. **Evolução de Modelos**: Mudanças em modelos de IA podem introduzir regressões de qualidade imprevisíveis
4. **Viés de Confirmação**: Desenvolvedores podem confiar excessivamente em código que "parece correto"

### Melhores Práticas

1. **Comece Conservador**: Em sistemas críticos, use IA para prototipagem, não produção inicial
2. **Invista em Métricas**: Estabeleça baselines antes de introduzir IA para medir impacto real
3. **Diversifique Verificação**: Não dependa de uma única técnica de verificação
4. **Documente Decisões**: Mantenha registro de por que código de IA foi aceito ou rejeitado
5. **Treine Continuamente**: Equipes de curadoria precisam de treinamento contínuo sobre novos padrões de código de IA

## Summary

- **Qualidade em sistemas híbridos** requer extensão das dimensões tradicionais (ISO 25010) para incluir consistência comportamental, robustez a variações, explicabilidade e rastreabilidade de geração

- **Código gerado por IA** apresenta code smells específicos (verbosity, defensive overkill, hallucinated dependencies) e requer métricas adaptadas com thresholds mais rigorosos para duplicação e acoplamento

- **Qualidade comportamental** deve ser quantificada através de coeficiente de variação, testes metamórficos e fuzz testing de prompts, com níveis de tolerância definidos por criticidade do sistema

- **Explicabilidade** opera em múltiplos níveis, desde código legível até testes de caracterização, com trade-offs entre transparência e performance

- **Curadoria multi-camadas** é essencial, combinando auto-verificação, verificação automatizada, revisão por pares, QA especializado e aceitação de stakeholders

- **Frameworks de governança** (ISO 25010+, NIST AI RMF, IEEE standards) estão evoluindo para incorporar requisitos específicos de sistemas com IA

- **Custo de verificação** é muito alto — qualidade de código gerado exige investimento substancial em verificação extensiva, representando o novo gargalo da engenharia de software

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa — qualidade é eterna; novas dimensões surgem |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Muito Alto — qualidade de código gerado exige verificação extensiva |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica — engenheiros de qualidade mantêm accountability final |

## References

ACM TESTGENAI. Proceedings of the 2025 ACM SIGSOFT Workshop on Test Generation for AI. ACM Digital Library, 2025.

BUI, N. D. Q. et al. ACCA: Automating the Correctness Assessment of Code Generated by Large Language Models. arXiv:2310.18834, 2023.

COTRONEO, D. et al. Quality Assurance for AI-Generated Code: A Multi-Tier Curation Approach. Journal of Systems and Software, v. 215, p. 112113, 2024. https://doi.org/10.1016/j.jss.2024.112113

COTRONEO, D. et al. Curatorial Processes for AI-Generated Code in CI/CD Pipelines. ResearchGate, 2025. https://doi.org/10.1109/DSN-S58398.2025.00012

DIVA. Code Quality in AI-Generated Mobile Applications. DiVA Portal, 2025. http://www.diva-portal.org/smash/get/diva2:1972441/FULLTEXT01.pdf

FOGGIA, P. et al. Openia: Leveraging LLM Internal Representations for Code Quality Prediction. Journal of Systems and Software, v. 220, p. 112570, 2025. https://doi.org/10.1016/j.jss.2025.112570

GARTNER. Market Guide for AI-Augmented Software-Testing Tools. Gartner Research, 2024.

GARTNER. Market Guide for AI Code Quality Tools. Gartner Research, 2025.

GITCLEAR. AI Copilot Code Quality: 2025 Data. GitClear Research, 2025. https://www.gitclear.com/ai_assistant_code_quality_2025_research

HANDA, A. et al. Vibe Coding: A Hybrid Framework for AI-Generated Code Quality Assurance. IEEE DSN Workshop, 2025. https://doi.org/10.1109/DSN-S58398.2025.00012

HOU, Y. et al. Metamorphic Testing for Code Scanners under Adversarial Prompts. Journal of Systems and Software, v. 230, 2024.

IEEE. The "Code" of Ethics: Auditing Accountability in PLG Models. IEEE Xplore, 2024. https://ieeexplore.ieee.org/document/10440501

IEEE. Standards for Quality in AI-Assisted Software Development. IEEE Standards Association, 2025.

ISO/IEC. ISO 25010: Extensions for AI-Generated Software Quality. ISO/IEC JTC 1/SC 7, 2025.

NIST. AI Risk Management Framework. NIST AI 600-1, 2024. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf

NIST. GenAI Pilot Code Challenge: Unit Test Coverage Evaluation. NIST AI 700-1, 2025. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.700-1.pdf

QODO. State of AI Code Quality in 2025. Qodo Research Report, 2025. https://www.qodo.ai/reports/state-of-ai-code-quality/

SONARSOURCE. State of Code: Technical Debt in the AI Era. SonarSource Survey Report, 2025. https://www.sonarsource.com/state-of-code-developer-survey-report.pdf

SONARSOURCE. AI Code Assurance: Automated Fix Recommendations. SonarSource Solutions, 2024. https://www.sonarsource.com/solutions/ai/ai-code-assurance

# Seção 2: A Mudança de Paradigma na Engenharia de Software

## Overview

Esta seção analisa a transição de paradigma na engenharia de software, da codificação manual para a curadoria de sistemas autônomos. Baseada nos princípios fundamentais do SWEBOK-AI e fundamentada em estudos empíricos recentes, estabelece o novo papel do engenheiro como curador e verificador, em vez de mero tradutor de requisitos em código.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar a diferença entre o paradigma de codificação e o paradigma de curadoria
2. Identificar como o gargalo da engenharia de software deslocou-se da produção para a verificação
3. Compreender as implicações organizacionais da mudança de paradigma
4. Aplicar o conceito de "curadoria de software" em contextos práticos
5. Reconhecer e endereçar resistências comuns à transição

---

## 2.1 O Que é um Paradigma em Engenharia de Software

Thomas Kuhn, em "A Estrutura das Revoluções Científicas" (1962), definiu paradigmas como conjuntos de práticas, crenças e valores que definem uma disciplina durante um período. Paradigmas não são meramente evoluções incrementais — são mudanças fundamentais na forma de ver e resolver problemas.

Na engenharia de software, identificamos paradigmas anteriores:

| Era | Paradigma | Característica Central |
|-----|-----------|------------------------|
| 1950s-60s | Craftmanship | Programação como arte individual |
| 1970s | Structured Programming | Disciplina e controle de fluxo |
| 1980s | Object-Oriented | Modelagem do mundo real |
| 1990s | Component-Based | Reuso e integração |
| 2000s | Agile | Adaptabilidade e colaboração |
| 2010s | DevOps | Integração contínua e automação |
| 2020s | AI-Augmented | Co-criação humano-máquina |

Cada transição paradigmática redefiniu o que significa ser um engenheiro de software competente. A transição atual, conforme argumentado no estudo "Generative AI and Empirical Software Engineering" (2025), representa uma "mudança de paradigma duradoura" na engenharia de software empírica — não uma mera adição de ferramentas, mas uma reconfiguração fundamental do processo de desenvolvimento.

---

## 2.2 O Paradigma Anterior: Codificação como Atividade Central

### 2.2.1 Pressupostos Fundamentais

O paradigma dominante desde os anos 1970 até recentemente baseava-se em pressupostos que hoje questionamos:

**Pressuposto 1: O Gargalo é a Produção**

```
Se premissa: "Escrever código correto é difícil e demorado"
Então: Otimizar para velocidade de escrita e redução de erros
Resultado: IDEs, autocompletar, geração de código a partir de templates
```

Este pressuposto foi validado por décadas de pesquisa em produtividade de desenvolvedores, culminando em ferramentas como IDEs avançadas e frameworks de produtividade.

**Pressuposto 2: O Engenheiro é Tradutor**

```
Processo: Requisitos → Análise → Design → Código → Testes
Papel: Traduzir especificação em instruções de máquina
Métrica: Linhas de código, velocidade de entrega de features
```

**Pressuposto 3: Automação é Assistiva**

```
Ferramentas: Compiladores, linters, IDEs
Função: Aumentar produtividade do humano
Limitação: Ferramenta não toma decisões de design
```

### 2.2.2 Consequências do Paradigma Anterior

Este paradigma moldou:

- **Estruturas organizacionais**: Times hierárquicos (júnior → pleno → sênior) baseados em domínio técnico progressivo
- **Processos de desenvolvimento**: Waterfall, Agile, focados em produção e entrega
- **Educação**: Currículos centrados em linguagens, algoritmos e estruturas de dados
- **Carreira**: Progressão baseada em domínio técnico crescente
- **Qualidade**: Garantida através de testes e revisão de código escrito manualmente

Os estudos de produtividade de 2023-2024 (Peng et al., 2023; Dellermann et al., 2024) demonstram que este paradigma ainda é predominante, mas que a eficácia das métricas tradicionais está sendo questionada.

---

## 2.3 O Novo Paradigma: Curadoria e Orquestração

### 2.3.1 Inversão do Gargalo

A introdução de LLMs capazes de gerar código funcional inverteu o gargalo fundamental, conforme documentado por Weber et al. (2024) e The New Stack (2025):

```
ANTES:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Especificar │────▶│    Codificar │────▶│     Testar   │
│   (rápido)   │     │   (lento)    │     │   (médio)    │
└──────────────┘     └──────────────┘     └──────────────┘
        Gargalo aqui ↑

DEPOIS:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Especificar │────▶│    Gerar     │────▶│   Verificar  │
│   (cuidadoso)│     │  (instante)  │     │  (criterioso)│
└──────────────┘     └──────────────┘     └──────────────┘
                             Gargalo aqui ↑
```

A geração tornou-se instantânea e economicamente acessível, mas a verificação — garantir que o código gerado atenda às intenções, respeite restrições e não introduza falhas invisíveis — tornou-se o novo gargalo (The New Stack, 2025).

### 2.3.2 O Engenheiro como Curador

No novo paradigma, o papel do engenheiro de software transforma-se radicalmente, conforme discutido nos estudos de Human-AI Collaboration (IEEE, 2024) e análises de produtividade (Weber et al., 2024):

| Aspecto | Antes | Depois |
|---------|-------|--------|
| **Atividade principal** | Escrever código | Avaliar e integrar código gerado |
| **Competência central** | Sintaxe e algoritmos | Julgamento arquitetural |
| **Foco de atenção** | Implementação detalhada | Restrições e invariantes |
| **Interação com IA** | Autocomplete | Co-criação e verificação |
| **Medida de sucesso** | Código escrito | Valor entregue verificado |

O estudo da IEEE Software (2024) sobre Human-AI Collaboration enfatiza que, embora ChatGPT e ferramentas similares melhorem a eficiência de geração e otimização de código, o supervisionamento humano permanece crucial, especialmente para decisões arquiteturais.

### 2.3.3 Definição de Curadoria de Software

**Curadoria de Software** é a disciplina de:

1. **Especificar** restrições precisas sobre o que deve ser construído
2. **Gerar** soluções candidatas através de sistemas autônomos
3. **Avaliar** candidatos segundo critérios de qualidade
4. **Selecionar** soluções adequadas
5. **Integrar** soluções no sistema maior
6. **Verificar** conformidade com requisitos
7. **Governar** decisões para accountability

```python
# Metáfora do processo de curadoria
class SoftwareCurator:
    """
    Engenheiro de software no paradigma de curadoria.
    
    Conforme modelo de colaboração humano-IA (IEEE, 2024),
    o engenheiro atua como supervisor e decisor final,
    não mero operador de ferramentas.
    """
    
    def develop_feature(self, requirements: Specification) -> IntegratedSolution:
        # 1. Especificar restrições
        constraints = self.derive_constraints(requirements)
        
        # 2. Gerar candidatos (IA autônoma)
        candidates = self.ai_system.generate(
            requirements=requirements,
            constraints=constraints,
            n_alternatives=5
        )
        
        # 3. Avaliar (verificação humana + automática)
        evaluations = [
            self.evaluate(candidate) 
            for candidate in candidates
        ]
        
        # 4. Selecionar (decisão humana)
        selected = self.select_best(evaluations)
        
        # 5. Integrar
        integrated = self.integrate(selected)
        
        # 6. Verificar (gargalo crítico - The New Stack, 2025)
        verified = self.verify(integrated)
        
        # 7. Documentar governança
        self.log_decision(requirements, selected, rationale)
        
        return integrated
```

---

## 2.4 Implicações da Mudança de Paradigma

### 2.4.1 Para a Organização

As estruturas organizacionais precisam evoluir, conforme sugere a análise de Dellermann et al. (2024) sobre mudanças organizacionais impulsionadas por IA:

**Antes:**
```
Engenheiro Júnior ──▶ Engenheiro Pleno ──▶ Engenheiro Sênior
   (escreve)            (desenha)            (arquiteta)
```

**Depois:**
```
Especificador ──▶ Curador ──▶ Verificador ──▶ Governador
  (restrições)    (seleção)    (qualidade)    (accountability)
```

Novos papéis emergem, documentados nos estudos de Weber et al. (2024) e análises de workflow:

- **AI System Designer**: Projeta prompts e contextos para IA, otimizando a colaboração humano-máquina
- **Verification Specialist**: Especialista em garantir corretude, um papel que ganha destaque conforme o gargalo se desloca para verificação
- **AI Ethics Officer**: Garante fairness e ausência de viés em sistemas híbridos
- **Human-AI Interaction Designer**: Otimiza a colaboração humano-máquina, considerando limitações de explicabilidade

### 2.4.2 Para o Processo de Desenvolvimento

Os processos ágeis tradicionais precisam de adaptação significativa, como discutido na literatura sobre mudança de paradigma (2025):

| Cerimônia Tradicional | Adaptação para Curadoria | Racional |
|----------------------|--------------------------|----------|
| Sprint Planning | Specification Workshops | Maior ênfase na especificação de restrições |
| Daily Standup | Review Checkpoint | Foco em verificação de código gerado |
| Code Review | Verification Review | Validação semântica, não apenas sintática |
| Retrospective | Learning Capture | Documentação de decisões de curadoria |

**Novo fluxo de desenvolvimento:**

```
Especificação de Restrições
           │
           ▼
    Geração de Candidatos (IA)
           │
           ▼
    Avaliação e Seleção (Humano + IA)
           │
           ▼
    Integração e Verificação (Gargalo)
           │
           ▼
    Deployment com Monitoramento
```

### 2.4.3 Para a Qualidade

A garantia de qualidade transforma-se de atividade de "detecção de bugs" para "verificação de conformidade semântica", conforme argumentado por Vaithilingam et al. (2024) e Hamade (2024):

**Antes:**
- Testes verificam se código faz o que foi escrito
- Revisão foca em padrões de código e estilo
- QA separado de desenvolvimento

**Depois:**
- Testes verificam se código faz o que deveria fazer (intenção)
- Revisão foca em decisões de design e restrições
- Verificação integrada ao processo de curadoria

> **Risco Documentado**: Hamade (2024) e Kodus (2025) alertam que código gerado por IA, embora sintaticamente correto, frequentemente introduz novas formas de dívida técnica — duplicação de lógica, ignorância de validações existentes, e quebra de padrões de projeto — exigindo processos de review mais rigorosos, não menos.

---

## 2.5 Resistências e Transição

### 2.5.1 Resistências Comuns

A transição de paradigma sempre encontra resistência, documentada em estudos organizacionais sobre adoção de IA:

| Resistência | Fundamentação | Resposta Baseada em Evidência |
|-------------|---------------|------------------------------|
| "IA não substitui engenheiros" | Medo de obsolescência | Correta — redefine papel, não elimina (IEEE, 2024) |
| "Código gerado é de baixa qualidade" | Experiências iniciais | Depende da especificação e verificação (Hamade, 2024) |
| "Perdemos controle do sistema" | Medo da opacidade | Governança e auditabilidade mitigam (AlterSquare, 2026) |
| "É apenas hype" | Ceticismo histórico com IA | Capacidades demonstradas em benchmarks são reais (SWE-bench, 2024) |

### 2.5.2 Estratégia de Transição

Organizações devem adotar abordagem gradual, conforme sugerido por Dellermann et al. (2024) e Weber et al. (2024):

**Fase 1: Assistência (0-6 meses)**
- IA como autocomplete avançado
- Foco em produtividade individual
- Poucas mudanças organizacionais

**Fase 2: Co-criação (6-18 meses)**
- IA como parceiro de design
- Novos processos de revisão enfatizando verificação
- Treinamento em curadoria e especificação de restrições

**Fase 3: Autonomia Controlada (18+ meses)**
- IA para tarefas bem-delimitadas
- Sistemas de governança maduros
- Cultura de verificação como valor central

---

## 2.6 O SWEBOK-AI como Guia de Transição

Este guia não assume que a transição está completa — ela está em andamento. Cada capítulo:

1. **Reconhece** o estado atual do conhecimento e as evidências empíricas disponíveis
2. **Identifica** o que permanece relevante do paradigma anterior
3. **Recontextualiza** conceitos para o novo paradigma de curadoria
4. **Introduz** novos conceitos onde necessário (governança, verificação em escala)
5. **Fornece** diretrizes práticas para implementação, fundamentadas em estudos

A transição de paradigma é uma jornada, não um destino. O SWEBOK-AI v5.0 é um mapa para essa jornada, baseado nas melhores evidências disponíveis em 2025.

---

## Practical Considerations

### Aplicação Imediata

Para lideranças técnicas conduzindo transição:

1. **Inicie pela verificação**: Antes de adotar geração massiva de código, fortaleça processos de revisão e testes
2. **Documente restrições**: Crie catálogos explícitos de invariantes e restrições arquiteturais
3. **Meça o certo**: Substitua métricas de LOC por métricas de taxa de verificação e qualidade

### Armadilhas a Evitar

- **"Vibe Coding" sem verificação**: Aceitar saídas de IA sem validação rigorosa, como alertado por The New Stack (2025)
- **Subestimar dívida técnica**: Ignorar evidências de que código gerado pode aumentar manutenção (Hamade, 2024; Kodus, 2025)
- **Descartar experiência humana**: Acreditar que IA elimina necessidade de julgamento arquitetural (IEEE, 2024)

---

## Summary

- O paradigma de codificação manual está sendo substituído pelo paradigma de curadoria de sistemas autônomos
- O gargalo deslocou-se de "produção" (escrita) para "verificação" (garantia de qualidade)
- O engenheiro evolui de tradutor para curador, com foco em restrições, seleção e governança
- Novos papéis emergem: Verification Specialist, AI System Designer, AI Ethics Officer
- Processos de desenvolvimento precisam adaptar-se, com maior ênfase em especificação e verificação
- A transição deve ser gradual: Assistência → Co-criação → Autonomia Controlada
- Evidências empíricas (Peng et al., 2023; Dellermann et al., 2024; Weber et al., 2024) sustentam a necessidade de mudança

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta seção será obsoleta em 36 meses? | Muito Baixa — mudança paradigmática é irreversível |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Médio — conceitos estruturais, mas aplicáveis |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Moderada — define responsabilidades em novo paradigma |

---

## References

1. "Generative AI and Empirical Software Engineering." (2025). *arXiv:2502.08108*. https://arxiv.org/abs/2502.08108

2. Peng, S., et al. (2023). "The Impact of AI on Developer Productivity: Evidence from GitHub Copilot." *arXiv:2302.06590*. https://arxiv.org/abs/2302.06590

3. Dellermann, D., et al. (2024). "Measuring GitHub Copilot's Impact on Productivity." *Communications of the ACM*. https://cacm.acm.org/research/measuring-github-copilots-impact-on-productivity/

4. Weber, T., et al. (2024). "Significant Productivity Gains through Programming with Large Language Models." *LMU Munich*. https://www.mmi.ifi.lmu.de/pubdb/publications/pub/weber2024eics-llm/weber2024eics-llm.pdf

5. The New Stack. (2025). "AI Code Generation: Trust and Verify, Always." https://thenewstack.io/ai-code-generation-trust-and-verify-always/

6. IEEE Software. (2024). "Human-AI Collaboration in Software Engineering." https://ieeexplore.ieee.org/document/10653701

7. Vaithilingam, P., et al. (2024). "GitHub Copilot: A Systematic Study." *CEUR Workshop Proceedings*. https://ceur-ws.org/Vol-3762/489.pdf

8. Hamade, J. (2024). "True Cost of AI-Generated Code." Medium. https://medium.com/@justhamade/true-cost-of-ai-generated-code-f4362391790c

9. Kodus. (2025). "How AI-Generated Code is messing with your Technical Debt." https://kodus.io/en/ai-generated-code-is-messing-with-your-technical-debt/

10. AlterSquare. (2026). "Why AI Systems Create New Forms of Technical Debt." https://altersquare.io/ai-systems-create-new-forms-technical-debt/

---

*SWEBOK-AI v5.0 - Introdução - Seção 2*

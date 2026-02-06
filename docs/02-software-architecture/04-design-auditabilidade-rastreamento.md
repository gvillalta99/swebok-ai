---
title: Design para Auditabilidade e Rastreamento
created_at: '2025-05-21'
tags: [auditabilidade, rastreamento, logs, compliance, swebok-ai]
status: in-progress
updated_at: '2025-05-21'
ai_model: claude-3.5-sonnet
---

# 4. Design para Auditabilidade e Rastreamento

## Visão Geral

A "caixa preta" dos modelos de IA apresenta um desafio existencial para a
engenharia de software: como depurar um sistema que não explica como chegou a
uma conclusão? O design para auditabilidade deixa de ser um requisito
não-funcional secundário para se tornar um componente central da arquitetura.
Sem rastreabilidade granular, é impossível diagnosticar falhas, otimizar custos
ou cumprir regulações emergentes como o EU AI Act.

Esta seção detalha os padrões arquiteturais para tornar sistemas estocásticos
transparentes e auditáveis "by design".

## Objetivos de Aprendizagem

Após estudar esta seção, o leitor deve ser capaz de:

1. **Implementar** estratégias de log semântico que capturam a intenção e o
   raciocínio, não apenas o status HTTP.
2. **Projetar** sistemas de versionamento para prompts e configurações de
   modelos.
3. **Estabelecer** cadeias de custódia de dados para explicar decisões tomadas
   por agentes autônomos.

## 4.1 O "Black Box Recorder" Arquitetural

Diferente de logs de aplicação tradicionais, a auditabilidade de IA exige a
captura do contexto completo da interação.

### Componentes do Log Semântico

Para cada transação de IA, o sistema deve persistir imutavelmente:

- **Input Completo**: O prompt exato enviado ao modelo, incluindo system prompt,
  contexto injetado (RAG) e input do usuário.
- **Configuração de Inferência**: Modelo, versão, temperatura, top-p, seed (se
  aplicável).
- **Output Bruto**: A resposta exata do modelo antes de qualquer
  pós-processamento.
- **Metadados de Custo**: Tokens de entrada, tokens de saída e latência.
- **Feedback (se houver)**: Avaliação do usuário (thumbs up/down) ou correção
  posterior.

## 4.2 Rastreabilidade de Cadeia de Pensamento (Chain of Thought Tracing)

Em sistemas compostos (Agentes, Chains), saber o resultado final é insuficiente.
É necessário rastrear os passos intermediários.

### Traceability ID

Um identificador único de correlação (Trace ID) deve permear todas as chamadas
LLM, buscas vetoriais e ações de ferramentas desencadeadas por uma requisição
original.

### Inspeção de Raciocínio

Se o modelo utiliza *Chain of Thought* (CoT), o pensamento intermediário deve
ser estruturado e armazenado separadamente da resposta final. Isso permite
auditar *por que* o modelo tomou uma decisão, distinguindo erro de lógica de
erro de fato.

## 4.3 Versionamento e Reprodutibilidade

Prompts são código. Parâmetros de modelo são configuração. Ambos devem ser
versionados.

### Prompt Registry

Padrão onde prompts não estão "hardcoded" no código-fonte, mas armazenados em um
registro centralizado versionado.

- *Benefício*: Permite rollbacks imediatos se uma nova versão do prompt degradar
  a performance, e testes A/B de prompts em produção.

### Desafio da Reprodutibilidade

Mesmo com temperatura zero, modelos podem não ser determinísticos devido a
otimizações de GPU.

- *Mitigação*: Armazenar o "fingerprint" do sistema (versão exata do modelo) e
  aceitar uma variabilidade controlada, focando em testes semânticos em vez de
  comparação de strings exatas.

## Considerações Práticas

### Privacidade vs. Auditabilidade

Armazenar inputs de usuários e respostas geradas cria um risco massivo de
privacidade (PII).

- **Estratégia**: Logs devem ser sanitizados ou criptografados. PII deve ser
  detectado e mascarado *antes* da persistência no log de auditoria, se a
  regulação exigir.

### Volume de Dados

Logs de LLM são verbosos (texto longo).

- **Estratégia**: Amostragem inteligente (logar 100% dos erros, 1% dos sucessos)
  ou retenção diferenciada (metadata por 1 ano, payload completo por 30 dias).

## Resumo

- Logs tradicionais são insuficientes; sistemas de IA exigem logs semânticos com
  inputs, outputs e configurações.
- Rastrear a cadeia de pensamento (CoT) é crucial para entender a lógica de
  agentes.
- Versionamento de prompts e modelos é obrigatório para governança e recuperação
  de desastres.

## Matriz de Avaliação Consolidada

| Critério                        | Descrição                             | Avaliação                                                                                                  |
| ------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. A necessidade de auditoria crescerá com a autonomia dos sistemas.                               |
| **Custo de Verificação**        | Quanto custa validar esta atividade?  | **Baixo**. Logs são gerados automaticamente, o custo está no armazenamento e análise.                      |
| **Responsabilidade Legal**      | Quem responde pelo erro?              | **Crítica**. Logs de auditoria são a principal defesa legal para provar diligência em caso de falha da IA. |

## Referências

1. **European Parliament**. (2024). *Artificial Intelligence Act*. (Foco nos
   artigos sobre transparência e documentação técnica).
2. **Sculley, D., et al.** (2015). *Hidden Technical Debt in Machine Learning
   Systems*. NeurIPS. (O clássico, revisitado para LLMs).
3. **Shankar, S., et al.** (2024). *Operationalizing LLMs: From PoC to
   Production*. O'Reilly Report.
4. **Google**. (2023). *Secure AI Framework (SAIF)*.
   safety.google/cybersecurity-advancements/saif.

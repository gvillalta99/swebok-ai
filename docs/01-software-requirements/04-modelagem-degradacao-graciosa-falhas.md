---
title: "Modelagem de Degradação Graciosa e Falhas"
created_at: "2025-01-31"
tags: ["requisitos", "degradacao-graciosa", "falhas", "resiliencia", "fallback", "observabilidade", "governanca"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Seção 4: Modelagem de Degradação Graciosa e Falhas

## Overview

Esta seção descreve como especificar comportamentos de falha e degradação graciosa em sistemas que incorporam componentes probabilísticos (ex.: LLMs). O objetivo é tornar falhas previsíveis, contidas e verificáveis, reduzindo impacto operacional e risco de decisões incorretas sob incerteza.

## Learning Objectives

Após estudar esta seção, o leitor deve ser capaz de:
1. Explicar por que componentes estocásticos exigem modelagem explícita de degradação
2. Definir níveis de degradação e critérios de transição com métricas observáveis
3. Aplicar padrões de resiliência (fallback, circuit breaker, retry) com limites claros
4. Integrar degradação a governança (auditoria, alertas, revisão humana)

## 4.1 Introdução

Sistemas tradicionais operavam sob a premissa de determinismo: entradas específicas produzem saídas previsíveis. Na era dos LLMs e sistemas autônomos, o comportamento é intrinsecamente probabilístico e, ocasionalmente, imprevisível.

A **Modelagem de Degradação Graciosa** é a disciplina de projetar sistemas que, quando confrontados com limitações, incertezas ou falhas, mantêm funcionalidade essencial enquanto degradam serviços não-críticos de forma controlada e previsível.

## 4.2 Fundamentos de Degradação Graciosa

### 4.2.1 Princípio do Falhar Bem (Fail Well)

> *"Um sistema bem projetado não é aquele que nunca falha, mas aquele que falha de forma previsível, recuperável e informativa."*

O princípio do "falhar bem" estabelece quatro critérios fundamentais:

| Critério | Descrição | Indicador |
|----------|-----------|-----------|
| Previsibilidade | Falhas seguem padrões documentados | Usuários sabem o que esperar |
| Recuperabilidade | Sistema pode retornar ao estado normal | MTTR < threshold definido |
| Informatividade | Falhas fornecem informação diagnóstica | Logs detalhados, métricas claras |
| Contenção | Falha não se propaga | Isolamento de domínios |

### 4.2.2 Taxonomia de Degradação

Os sistemas podem operar em cinco níveis distintos de degradação, desde a operação normal até a falha total:

**Nível 0: Operação Normal**
- Todos os componentes funcionando conforme especificado
- Performance dentro dos limites de SLAs estabelecidos
- Latência, throughput e qualidade dentro dos parâmetros aceitáveis

**Nível 1: Degradação Leve**
- Funcionalidades não-críticas indisponíveis ou limitadas
- Performance ligeiramente reduzida, mas ainda aceitável
- Aumento controlado na latência (até 2x o baseline)

**Nível 2: Degradação Moderada**
- Funcionalidades secundárias desativadas proativamente
- Mecanismos de fallback ativados automaticamente
- Latência aumentada significativamente (2-5x o baseline)

**Nível 3: Degradação Severa**
- Apenas funcionalidades críticas permanecem operacionais
- Sistema opera em modo de sobrevivência (survival mode)
- Recursos não essenciais completamente desligados

**Nível 4: Falha Total**
- Sistema indisponível para usuários
- Preservação de dados e estado para recuperação
- Transição para procedimentos de recuperação de desastre

### 4.2.3 Degradação em Sistemas com IA

Sistemas que utilizam LLMs apresentam desafios específicos que demandam modelagem diferenciada:

**Latência do Modelo**
- Ocorrência de timeouts nas respostas quando o modelo excede tempos aceitáveis
- Necessidade de cache de respostas frequentes para reduzir chamadas
- Estratégias de fallback para modelos menores e mais rápidos

**Qualidade da Resposta**
- Scores de confiança baixos indicam respostas potencialmente incorretas
- Detecção de respostas incoerentes ou inconsistentes
- Fallback para regras baseadas quando a IA não é confiável

**Disponibilidade do Serviço**
- Rate limiting imposto pelo provedor do modelo
- Quotas excedidas resultando em rejeição de requisições
- Estratégias de fallback local ou offline quando a API está indisponível

**Custos Operacionais**
- Budget operacional excedido demanda degradação imediata
- Transição para modelos mais baratos quando custos elevam
- Ativação de modo econômico que sacrifica qualidade por previsibilidade de custo

## 4.3 Estratégias de Degradação

### 4.3.1 Circuit Breaker (Disjuntor)

O padrão Circuit Breaker previne chamadas repetidas a componentes falhos, evitando cascatas de falha. Este mecanismo opera através de três estados:

**Estado Fechado (Closed)**
- Operação normal do sistema
- Chamadas ao componente são permitidas
- Contador de falhas é monitorado continuamente
- Quando o número de falhas consecutivas excede um limiar configurado, o estado muda para Aberto

**Estado Aberto (Open)**
- Falha detectada no componente
- Chamadas ao componente são rejeitadas imediatamente
- Retorna diretamente para o fallback, evitando latência desnecessária
- Um temporizador é iniciado para tentativa de recuperação

**Estado Meio-Aberto (Half-Open)**
- Testando se o componente se recuperou
- Permite um número limitado de chamadas de teste
- Se as chamadas de teste forem bem-sucedidas, retorna ao estado Fechado
- Se falharem, retorna ao estado Aberto

A configuração do Circuit Breaker envolve parâmetros críticos: limiar de falhas (quantas falhas consecutivas disparam a abertura), timeout de recuperação (quanto tempo aguardar antes de tentar novamente), e número máximo de chamadas no estado meio-aberto.

### 4.3.2 Bulkhead (Divisória Estanque)

O padrão Bulkhead isola recursos para prevenir propagação de falhas entre diferentes partes do sistema. Baseado na metáfora naval de compartimentos estanques que impedem que um furo afunde todo o navio.

**Princípios de Isolamento**
- Cada operação ou grupo de operações recebe seu próprio pool de recursos
- Uma operação lenta ou travada não consome recursos de outras operações
- Limites de concorrência são definidos por bulkhead, não globalmente

**Mecanismo de Controle**
- Um semáforo controla o número de operações simultâneas permitidas
- Quando o limite é atingido, novas requisições são rejeitadas imediatamente
- A rejeição aciona o fallback correspondente sem esperar timeout
- Após a conclusão de uma operação, o semáforo é liberado

**Configuração**
- Número máximo de operações simultâneas por bulkhead
- Tamanho da fila de espera (se aplicável)
- Timeout para operações individuais
- Estratégia de fallback quando o bulkhead está cheio

### 4.3.3 Fallbacks Hierárquicos

Estratégia de múltiplos níveis de fallback que cria uma cadeia de recuperação progressiva:

**Nível 1: Modelo Principal**
- Utiliza o modelo de IA primário (mais poderoso, mais caro)
- Valida a confiança da resposta através de score de confiança
- Se a confiança exceder o limiar, a resposta é aceita
- Em caso de falha ou confiança insuficiente, avança para o próximo nível

**Nível 2: Modelo Secundário**
- Utiliza um modelo alternativo (mais rápido, mais barato)
- Pode ter limites de confiança mais relaxados
- Adequado para cenários onde velocidade é mais importante que precisão máxima
- Se indisponível ou insuficiente, avança para o próximo nível

**Nível 3: Cache**
- Consulta respostas previamente armazenadas para consultas similares
- Respostas em cache têm confiança reduzida devido à potencial obsolescência
- Útil para consultas frequentes e estáveis
- Se não houver cache adequado, avança para o próximo nível

**Nível 4: Regras Heurísticas**
- Utiliza regras predefinidas baseadas em padrões conhecidos
- Não requer chamadas externas a modelos de IA
- Confiabilidade moderada, mas previsível
- Se nenhuma regra se aplicar, avança para o nível final

**Nível 5: Resposta de Erro Gracioso**
- Mensagem educada informando indisponibilidade temporária
- Sugestões de ações alternativas ao usuário
- Nenhuma funcionalidade é perdida, apenas adiada
- Permite que o usuário saiba que o sistema está ciente da limitação

## 4.4 Modelagem de Falhas

### 4.4.1 Análise de Modos de Falha (FMEA Adaptada)

Adaptação da Failure Mode and Effects Analysis para sistemas com IA:

| Componente | Modo de Falha | Efeito | Detecção | Mitigação |
|------------|---------------|--------|----------|-----------|
| LLM API | Timeout | Latência excessiva | Monitoramento de tempo de resposta | Cache de respostas + Fallback para regras |
| LLM API | Rate Limit | Rejeição de requisições | Código HTTP 429 | Throttling proativo + Fila de espera |
| LLM | Hallucination | Informação incorreta | Score de confiança baixo | Fact-checking automático ou revisão humana |
| LLM | Bias | Resposta enviesada | Métricas de fairness | Prompt engineering e filtros de pós-processamento |
| Cache | Miss | Latência adicional | Métricas de taxa de acerto | Pre-warming de dados frequentes |
| Circuit Breaker | Falha aberta prematura | Degradação desnecessária | Métricas de estado do circuito | Ajuste dinâmico de limiares |

### 4.4.2 Árvores de Falha

Representação hierárquica de como falhas básicas levam a falhas do sistema:

O sistema torna-se indisponível quando ocorre qualquer uma das seguintes falhas críticas:

1. **Serviço de IA Falhou**
   - Ocorre quando há timeout na resposta (excede 5 segundos)
   - E quando a qualidade da resposta está abaixo do limiar aceitável
   - Ambas as condições devem ser verdadeiras para considerar falha

2. **Serviço de Cache Falhou**
   - Timeout nas respostas do cache (excede 1 segundo)
   - Reduz performance mas não necessariamente impede operação

3. **Banco de Dados Falhou**
   - Conexão perdida com o banco de dados
   - Tipicamente leva à falha total do sistema

### 4.4.3 Estados de Degradação e Transições

O sistema modela degradação através de uma máquina de estados com cinco níveis. As transições entre estados são determinadas por métricas observáveis que excedem limiares predefinidos.

**Métricas Monitoradas**
- Latência no percentil 99 (p99) em milissegundos
- Taxa de erro como proporção de falhas
- Confiança média das respostas

**Limiares por Estado**

*Degradação Leve (DEGRADED_LIGHT)*
- Latência p99: 500ms
- Taxa de erro: 1%
- Confiança média: 0.7

*Degradação Moderada (DEGRADED_MODERATE)*
- Latência p99: 1000ms
- Taxa de erro: 5%
- Confiança média: 0.5

*Degradação Severa (DEGRADED_SEVERE)*
- Latência p99: 3000ms
- Taxa de erro: 15%
- Confiança média: 0.3

*Emergência (EMERGENCY)*
- Latência p99: 10000ms
- Taxa de erro: 30%
- Confiança média: 0.1

**Avaliação de Transições**
O sistema avalia continuamente as métricas atuais e determina o estado apropriado. A avaliação segue a ordem de severidade (emergência → severa → moderada → leve → normal), retornando ao primeiro estado cujos limiares são excedidos.

## 4.5 Implementação de Degradação Graciosa

### 4.5.1 Padrão: Feature Flags com Degradação

Gerenciamento de funcionalidades com suporte a degradação automática baseada em gatilhos operacionais.

**Classificação de Features**

*Funcionalidades de Criticidade Média (Medium)*
- Podem ser desativadas em situações de degradação
- Possuem mecanismos de fallback definidos
- Exemplo: Recomendações de IA podem cair para recomendações estáticas
- Gatilhos de degradação: alta latência, baixa confiança

*Funcionalidades de Criticidade Baixa (Low)*
- Desativadas prioritariamente em degradação
- Fallbacks simples ou ausência da funcionalidade é aceitável
- Exemplo: Sumarização de IA pode ser substituída por exibição completa do texto
- Gatilhos de degradação: principalmente alta latência

*Funcionalidades Críticas (Critical)*
- Nunca desativadas, independente do estado do sistema
- Não possuem fallback, devem sempre funcionar
- Exemplo: Autenticação de usuário não pode falhar
- Lista de gatilhos de degradação é vazia

**Processo de Decisão**
Quando uma funcionalidade é solicitada:
1. Verifica-se a criticidade da feature
2. Se crítica, sempre retorna verdadeiro (habilitada)
3. Se não crítica, verifica cada gatilho de degradação
4. Se algum gatilho está ativo, retorna falso (desabilitada) e aciona fallback
5. Se nenhum gatilho ativo, retorna verdadeiro (habilitada)

### 4.5.2 Padrão: Retry com Backoff Exponencial

Estratégia de retentativa de operações que falham, com delays progressivos para evitar sobrecarga.

**Parâmetros de Configuração**
- Número máximo de retries: quantas vezas tentar novamente após a falha inicial
- Delay base: tempo inicial de espera entre tentativas
- Delay máximo: limite superior do tempo de espera
- Base exponencial: fator de multiplicação do delay
- Exceções retryáveis: quais tipos de erro merecem nova tentativa

**Mecanismo de Delay**
O delay entre tentativas segue uma progressão exponencial calculada como:
- Delay = min(delay_base × (base_exponencial ^ tentativa), delay_máximo)
- Adiciona-se jitter aleatório (10% do delay) para evitar tempestades de retries sincronizados

**Processo de Execução**
1. Executa a operação
2. Se sucesso, retorna o resultado imediatamente
3. Se falha com exceção retryável, calcula o delay
4. Aguarda o tempo calculado
5. Incrementa contador de tentativas
6. Repete até sucesso ou esgotamento de retries
7. Se esgotar retries, propaga a última exceção

## 4.6 Monitoramento e Observabilidade

### 4.6.1 Métricas de Degradação

Conjunto de métricas essenciais para monitorar o estado de degradação do sistema:

**Métricas de Latência**
- Latência no percentil 50 (mediana): tempo de resposta típico
- Latência no percentil 95: tempo de resposta para 95% das requisições
- Latência no percentil 99: tempo de resposta para 99% das requisições (casos extremos)

**Métricas de Confiabilidade**
- Taxa de erro: proporção de requisições que falharam
- Taxa de sucesso: proporção complementar de requisições bem-sucedidas
- Estado do circuit breaker: fechado, aberto ou meio-aberto

**Métricas de Qualidade (específicas para IA)**
- Confiança média: score médio de confiança das respostas
- Taxa de alucinação: proporção de respostas detectadas como incorretas
- Taxa de uso de fallback: proporção de requisições que recorreram a alternativas

**Métricas de Capacidade**
- Profundidade da fila: número de requisições aguardando processamento
- Conexões ativas: número de conexões atualmente em uso
- Capacidade disponível: proporção de recursos ainda disponíveis

### 4.6.2 Alertas e Notificações

Sistema de alertas baseado em condições de degradação identificadas pelas métricas.

**Regras de Alerta**

*Alerta de Alta Latência*
- Condição: latência p99 excede 2000ms
- Severidade: aviso (warning)
- Período de cooldown: 5 minutos entre notificações
- Indica possível degradação leve

*Alerta de Baixa Confiança*
- Condição: confiança média abaixo de 0.6
- Severidade: crítico (critical)
- Período de cooldown: 1 minuto entre notificações
- Indica possíveis alucinações ou respostas incorretas

*Alerta de Circuit Breaker Aberto*
- Condição: estado do circuit breaker é "aberto"
- Severidade: crítico (critical)
- Período de cooldown: nenhum (notificações imediatas)
- Indica componente completamente indisponível

**Processo de Avaliação**
1. Métricas são coletadas continuamente
2. Cada regra de alerta é avaliada contra as métricas atuais
3. Se a condição é satisfeita e o cooldown expirou, o alerta é disparado
4. Notificações são enviadas através dos canais configurados
5. Equipe de operações investiga e toma ações corretivas

## 4.7 Exercícios

1. Projete um sistema de Circuit Breaker para uma API de LLM que:
   - Detecta latência anormal através de thresholds configuráveis
   - Transiciona entre estados (fechado, aberto, meio-aberto) adequadamente
   - Implementa fallback com cache quando o circuito está aberto

2. Modele os estados de degradação para um sistema de recomendação com IA e defina as transições entre eles baseadas em métricas observáveis.

3. Implemente uma estratégia de fallback hierárquico para um chatbot comercial, considerando diferentes modelos de IA, cache e regras heurísticas.

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
|----------|-----------|-----------|
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | Baixa |
| **Custo de Verificação** | Quanto custa validar esta atividade quando feita por IA? | Alto |
| **Responsabilidade Legal** | Quem é culpado se falhar? | Crítica |

## Practical Considerations

- Defina "o que é aceitável degradar" e "o que nunca pode degradar" antes de discutir mecanismos; isso evita que o fallback viole requisitos críticos.
- Use gatilhos baseados em métricas observáveis (latência, taxa de erro, qualidade amostral) e documente thresholds como parte do contrato do sistema.
- Modele degradação como estados explícitos com transições testáveis; evite degradação "implícita" espalhada no código.
- Para componentes de IA, trate incerteza como sinal: outputs com baixa confiança devem acionar fallback ou revisão humana, não respostas "confidentes".

## Summary

- Degradação graciosa transforma falhas em comportamentos previsíveis, contidos e auditáveis.
- Estados de degradação e transições devem ser definidos com métricas e thresholds verificáveis.
- Padrões como fallback, circuit breaker e retry precisam de limites e observabilidade para evitar cascatas e regressões.

## References

1. NYGARD, M. Release It!: Design and Deploy Production-Ready Software. 2007.
2. IEEE COMPUTER SOCIETY. SWEBOK Guide V4.0: Guide to the Software Engineering Body of Knowledge. 2024.

*SWEBOK-AI v5.0 - Software Requirements*

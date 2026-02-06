---
title: Modelagem de Degradação Graciosa e Falhas
created_at: '2025-01-31'
tags: [degradacao-graciosa, falhas, resiliencia, circuit-breaker, fallback, sistemas-distribuidos]
status: in-progress
updated_at: '2026-02-06'
ai_model: openai/gpt-5.2
---

# Modelagem de Degradação Graciosa e Falhas

## Contexto

Sistemas tradicionais tendem a falhar de modo binário (operacional ou
indisponível). Em sistemas com IA, os modos de falha são graduais: degradação de
qualidade, aumento de latência, respostas inconsistentes ou conteúdo inadequado.
A dependência de APIs externas de LLM introduz risco operacional adicional
(disponibilidade, custo, opacidade e variabilidade). Portanto, modelar
degradação graciosa é requisito de engenharia, não opcional.

## Modos de Falha em Sistemas Cognitivos

### A Nova Taxonomia de Erros

Além de erros de infraestrutura (por exemplo, `500 Internal Server Error`),
sistemas cognitivos exigem uma taxonomia ampliada:

1. **Falhas de disponibilidade:** indisponibilidade, timeout, degradação de
   throughput ou saturação.
2. **Falhas de qualidade:** resposta sintaticamente válida, porém semanticamente
   inadequada (alucinação, omissão crítica, inconsistência).
3. **Falhas de segurança e conformidade:** vazamento de dados, prompt injection,
   violação de política.
4. **Falhas econômicas:** consumo anômalo de tokens/chamadas, retries excessivos
   e escalada de custo operacional.

### O Efeito Cascata

LLMs são lentos. Se um componente espera 30 segundos por uma resposta e falha, e
o usuário tenta de novo, você cria uma tempestade de retries que derruba todo o
sistema.

## Padrões de Resiliência

### 1. Circuit Breaker Semântico

Não basta medir erros de conexão. Você precisa medir erros de *conteúdo*.

- Se 5 respostas seguidas forem classificadas como "alucinação" ou "recusa",
  abra o circuito. Pare de gastar dinheiro pedindo respostas ruins.

### 2. Fallback em Camadas (The Waterfall)

Nunca dependa de um único modelo.

1. Tenta GPT-4 (Melhor qualidade, mais caro/lento).
2. Falhou/Lento? Tenta GPT-3.5 ou Claude Haiku (Rápido, barato).
3. Falhou? Tenta modelo local (Llama 3 quantizado).
4. Falhou? Retorna resposta estática baseada em regras ("Não consegui processar,
   mas aqui estão links úteis").

### 3. Bulkhead (Compartimentalização)

Isole o "pool" de recursos da IA do resto do sistema. Se a fila de processamento
da IA travar, o login e o dashboard do usuário devem continuar funcionando.

## Checklist Prático

Como blindar sua aplicação contra a instabilidade das LLMs:

1. [ ] **Defina Timeouts Agressivos:** O padrão de requests é 60s+; defina
   timeouts de aplicação em 10s-15s (ou menos, dependendo da UX).
2. [ ] **Implemente "Semantic Retries":** Se a IA falhar por erro de formato,
   tente de novo *uma vez* passando o erro no prompt ("Você esqueceu o JSON,
   corrija"). Não faça retry cego.
3. [ ] **Tenha uma "Cache de Respostas":** Para perguntas frequentes, ignore a
   LLM e sirva do cache (Redis/Vector DB). É mais rápido, barato e seguro.
4. [ ] **Monitore "Token Spikes":** Alerte se o consumo de tokens explodir
   repentinamente (indicativo de loop ou ataque).
5. [ ] **Projete UX assíncrona e informativa:** apresente confirmação de
   recebimento, estado de processamento e prazo estimado, evitando espera
   passiva sem feedback.

## Armadilhas Comuns

- **Retry Infinito:** Tentar a mesma chamada 5 vezes achando que a IA vai
  "acertar" na próxima. Só aumenta custo e latência.
- **Falha Silenciosa:** A IA retorna um erro, mas o frontend mostra "Sucesso" ou
  uma caixa vazia.
- **Ponto Único de Falha (SPOF):** concentrar a capacidade cognitiva em um único
  provedor/modelo sem fallback, cache e rotas de contingência.
- **Ignorar a UX de Latência:** Deixar o usuário olhando para um spinner por 40
  segundos sem feedback de progresso.

## Exemplo Mínimo: Implementação de Fallback

**Cenário:** Resumo de texto crítico para o negócio.

**Estratégia:** Tenta modelo SOTA (State of the Art); se falhar, usa algoritmo
clássico.

```python
import openai
from text_summarizer import classical_summarize # Algoritmo TF-IDF simples

def get_summary(text):
    try:
        # Tenta o modelo caro e inteligente (com timeout curto)
        return call_gpt4(text, timeout=5)
    except (TimeoutError, APIError):
        print("GPT-4 indisponível, tentando modelo rápido...")
        try:
            # Tenta modelo mais rápido/barato
            return call_gpt35(text, timeout=3)
        except Exception:
            print("IA indisponível. Usando fallback determinístico.")
            # Fallback determinístico (nunca falha, qualidade menor)
            return classical_summarize(text)
```

**Trade-offs:**

- **Pró:** O usuário SEMPRE recebe um resumo.
- **Contra:** O resumo de fallback pode ser pior, mas é melhor que um erro 500.

## Resumo Executivo

- **Falha é Certeza:** Em sistemas distribuídos com IA, a falha não é exceção, é
  rotina.
- **Não Bloqueie o Usuário:** Use processamento assíncrono (jobs/queues) para
  tarefas longas de LLM.
- **Fallbacks Determinísticos:** Tenha sempre um plano Z que não envolva IA
  (regras, cache, algoritmos clássicos).
- **Circuit Breakers:** Proteja seu orçamento e sua infraestrutura parando de
  chamar APIs quebradas.
- **Observabilidade:** Você precisa saber *por que* falhou (Timeout? Filtro de
  conteúdo? Erro de lógica?).

## Próximos Passos

- Estudar **Governança e Responsabilidade** para entender quem paga a conta
  quando a degradação afeta o cliente.
- Implementar métricas de observabilidade (Tracing) para visualizar a cascata de
  falhas.
- Executar experimentos controlados de **Chaos Engineering** em ambiente de
  teste para validar comportamento sob perda de conectividade, timeout e
  degradação parcial de dependências.

## Matriz de Avaliação Consolidada

| Critério                        | Avaliação                                                                                                                  |
| :------------------------------ | :------------------------------------------------------------------------------------------------------------------------- |
| **Descartabilidade Geracional** | **Baixa.** Resiliência é fundamento de engenharia, independente se usamos GPT-4 ou GPT-10.                                 |
| **Custo de Verificação**        | **Médio.** Testes de caos automatizados ajudam, mas cenários complexos exigem análise manual.                              |
| **Responsabilidade Legal**      | **Alta.** Se seu sistema falha em um momento crítico (ex: emergência médica), a culpa é da sua arquitetura, não da OpenAI. |

## Ver também

- [KA 02 - Arquitetura de Sistemas Híbridos](../02-software-architecture/index.md)
- [KA 05 - Verificação e Validação em Escala](../05-software-testing/index.md)
- [KA 15 - Economia e Métricas](../15-software-engineering-economics/index.md)

## Referências

1. NYGARD, Michael T. *Release It!: Design and Deploy Production-Ready
   Software*. 2. ed. Raleigh, NC: Pragmatic Bookshelf, 2018. ISBN 9781680502398.
2. ALVIDREZ, Marc. *Embracing Risk*. In: BEYER, Betsy et al. *Site Reliability
   Engineering: How Google Runs Production Systems*. Sebastopol: O'Reilly Media,
   2016\. Disponível em: <https://sre.google/sre-book/embracing-risk/>. Acesso
   em: 06 fev. 2026.
3. ULRICH, Mike. *Addressing Cascading Failures*. In: BEYER, Betsy et al. *Site
   Reliability Engineering: How Google Runs Production Systems*. Sebastopol:
   O'Reilly Media, 2016. Disponível em:
   <https://sre.google/sre-book/addressing-cascading-failures/>. Acesso em: 06
   fev. 2026.
4. BROOKER, Marc. *Timeouts, retries, and backoff with jitter*. Amazon Builders'
   Library, 2019. Disponível em:
   <https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/>.
   Acesso em: 06 fev. 2026.

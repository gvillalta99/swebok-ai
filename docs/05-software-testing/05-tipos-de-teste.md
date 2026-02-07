---
title: Tipos de Teste
created_at: 2025-02-07
tags: [software-testing, tipos, funcional, performance, seguranca, regressao]
status: published
updated_at: 2025-02-07
ai_model: book-writer
---

# 5. Tipos de Teste

## 5.1 Visão Geral

Tipos de teste classificam atividades de teste baseado no objetivo, foco ou
características específicas do sistema sendo testado. Enquanto níveis de teste
(unidade, integração, sistema, aceitação) definem *onde* testar, tipos de teste
definem *o quê* testar e *como*.

Na era dos LLMs, cada tipo de teste é transformado por automação inteligente,
análise preditiva e geração autônoma de cenários.

## 5.2 Testes Funcionais

### 5.2.1 Smoke Testing

**Definição:** Testes rápidos e superficiais que verificam se as funcionalidades
críticas do sistema estão operacionais.

**Objetivo:** Identificar rapidamente se o build é estável o suficiente para
testes mais aprofundados.

**Características:**

- Execução rápida (minutos)
- Cobertura de funcionalidades críticas
- Executado frequentemente (CI/CD)

**Exemplo:**

```gherkin
Feature: Smoke Test - Sistema Operacional

  Scenario: Sistema inicializa corretamente
    When acesso a página inicial
    Then página carrega sem erros
    And elementos críticos estão visíveis

  Scenario: Login funciona
    When tento fazer login com credenciais válidas
    Then login é realizado com sucesso
```

**Na Era dos LLMs:**

- Geração automática baseada em análise de importância
- Seleção dinâmica de funcionalidades críticas
- Execução paralela massiva

### 5.2.2 Sanity Testing

**Definição:** Testes focados e específicos que verificam se uma correção ou
funcionalidade particular foi implementada corretamente.

**Objetivo:** Validar que mudanças específicas funcionam antes de testes mais
amplos.

**Diferença de Smoke Testing:**

- Smoke: Verifica estabilidade geral
- Sanity: Verifica correção específica

**Na Era dos LLMs:**

- Identificação automática de áreas afetadas por mudanças
- Geração de testes focados no escopo da alteração

### 5.2.3 Regression Testing (Teste de Regressão)

**Definição:** Testes que garantem que mudanças no código não introduziram
defeitos em funcionalidades existentes.

**Desafio Tradicional:**

- Conjunto de testes cresce continuamente
- Execução consome tempo significativo
- Manutenção é trabalhosa

**Na Era dos LLMs:**

**Self-Healing Regression Tests:**

- Testes se adaptam automaticamente a mudanças na UI
- Redução de 70% no tempo de manutenção
- Eliminação de testes frágeis (flaky tests)

**Test Impact Analysis:**

- IA identifica quais testes devem ser executados baseado em mudanças
- Execução seletiva reduz tempo de feedback
- Priorização inteligente por risco

```python
# Exemplo: Seleção inteligente de testes
def selecionar_testes_regressao(commits):
    """IA analisa mudanças e seleciona testes relevantes"""
    arquivos_modificados = extrair_arquivos(commits)

    # Análise de impacto com IA
    componentes_afetados = ia.analisar_dependencias(arquivos_modificados)

    # Seleção de testes por risco
    testes_selecionados = []
    for teste in suite_completa:
        risco = ia.calcular_risco(teste, componentes_afetados)
        if risco > LIMIAR:
            testes_selecionados.append(teste)

    return testes_selecionados
```

### 5.2.4 Re-testing (Teste de Confirmação)

**Definição:** Execução de testes que falharam anteriormente para confirmar que
defeitos foram corrigidos.

**Na Era dos LLMs:**

- Geração automática de testes para validar correções
- Análise de causas-raiz de falhas
- Sugestão de testes adicionais para prevenir regressões similares

## 5.3 Testes de Performance

### 5.3.1 Load Testing (Teste de Carga)

**Definição:** Avalia comportamento do sistema sob carga esperada ou normal.

**Objetivos:**

- Identificar gargalos de performance
- Validar SLAs
- Planejar capacidade

**Métricas:**

- Response time
- Throughput
- Error rate
- Resource utilization

**Na Era dos LLMs:**

**Predição de Gargalos:**

- DeepPerf usa aprendizado profundo para prever gargalos
- Geração automática de cenários baseados em padrões de uso
- Análise preditiva de capacity planning

```javascript
// Cenário de carga gerado por IA
export const options = {
  stages: [
    { duration: '5m', target: 100 },   // Ramp up
    { duration: '10m', target: 100 },  // Steady state
    { duration: '5m', target: 200 },   // Spike
    { duration: '10m', target: 200 },  // Sustained high
    { duration: '5m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};
```

### 5.3.2 Stress Testing (Teste de Estresse)

**Definição:** Avalia comportamento do sistema sob carga extrema, além da
capacidade normal.

**Objetivos:**

- Identificar ponto de falha
- Validar recuperação
- Testar limites do sistema

**Na Era dos LLMs:**

- Geração de cenários de estresse realistas
- Identificação de condições de borda
- Análise de comportamento degradação

### 5.3.3 Spike Testing

**Definição:** Avalia comportamento do sistema sob mudanças súbitas e extremas
na carga.

**Cenários:**

- Lançamento de produto
- Viralização de conteúdo
- Eventos sazonais

### 5.3.4 Endurance Testing (Teste de Resistência)

**Definição:** Avalia comportamento do sistema sob carga sustentada por períodos
longos.

**Objetivos:**

- Identificar memory leaks
- Detectar degradação gradual
- Validar estabilidade

### 5.3.5 Scalability Testing

**Definição:** Avalia capacidade do sistema de escalar horizontal ou
verticalmente.

**Na Era dos LLMs:**

- Predição de necessidades de escala
- Simulação de crescimento
- Recomendações de arquitetura

## 5.4 Testes de Segurança

### 5.4.1 Vulnerability Scanning

**Definição:** Varredura automatizada para identificar vulnerabilidades
conhecidas.

**Ferramentas:**

- OWASP ZAP, Nessus, OpenVAS
- SonarQube, Checkmarx

**Na Era dos LLMs:**

- Análise semântica de código para vulnerabilidades
- Identificação de padrões de código inseguro
- Sugestão de correções

### 5.4.2 Penetration Testing (Teste de Penetração)

**Definição:** Simulação de ataques para identificar vulnerabilidades
exploráveis.

**Tipos:**

- Black box: Sem conhecimento prévio
- Grey box: Com conhecimento parcial
- White box: Com acesso completo

**Na Era dos LLMs:**

**Ethical Hacking com IA:**

- DeepExploit usa deep reinforcement learning
- Identificação autônoma de vulnerabilidades
- Geração de exploits e sugestões de correção

### 5.4.3 Security Auditing

**Definição:** Revisão sistemática de código, configurações e processos para
conformidade com padrões de segurança.

**Na Era dos LLMs:**

- Análise automática de compliance (GDPR, HIPAA, PCI-DSS)
- Geração de relatórios de auditoria
- Identificação de drift de configuração

## 5.5 Testes de Usabilidade e UX

### 5.5.1 Acessibilidade (a11y)

**Definição:** Testes que garantem que o software pode ser usado por pessoas com
diferentes habilidades.

**Diretrizes:**

- WCAG 2.1 (Web Content Accessibility Guidelines)
- Section 508 (EUA)
- Lei Brasileira de Inclusão

**Na Era dos LLMs:**

**Testes Automatizados de Acessibilidade:**

- Computer vision para identificar problemas visuais
- Análise automática de contraste
- Verificação de navegação por teclado
- Detecção de labels ausentes

### 5.5.2 Análise de Comportamento do Usuário

**Na Era dos LLMs:**

- Análise de heatmaps e session recordings
- Identificação de pontos de fricção
- Sugestão de melhorias de UX
- Predição de churn baseado em padrões

## 5.6 Outros Tipos de Teste

### 5.6.1 Compatibility Testing (Teste de Compatibilidade)

**Definição:** Verifica funcionamento em diferentes ambientes.

**Dimensões:**

- Cross-browser (Chrome, Firefox, Safari, Edge)
- Multi-device (desktop, tablet, mobile)
- Multi-OS (Windows, macOS, Linux, iOS, Android)
- Resoluções de tela

**Na Era dos LLMs:**

- Seleção inteligente de matriz de compatibilidade
- Priorização por uso real dos usuários
- Geração de testes cross-platform

### 5.6.2 Database Testing

**Definição:** Verifica integridade, performance e consistência de dados.

**Aspectos:**

- Integridade referencial
- Performance de queries
- Migrações de schema
- Backup e recuperação

### 5.6.3 API Testing

**Definição:** Testes focados em interfaces de programação.

**Na Era dos LLMs:**

- Geração automática de testes a partir de schemas
- Fuzzing inteligente de inputs
- Validação de contratos

### 5.6.4 Mobile Testing

**Definição:** Testes específicos para dispositivos móveis.

**Aspectos:**

- Gestos e interações touch
- Notificações push
- Uso de recursos do dispositivo
- Conectividade variável

### 5.6.5 Localization Testing

**Definição:** Verifica adaptação para diferentes localidades.

**Aspectos:**

- Traduções
- Formatação de datas e números
- Moedas
- Direção de texto (RTL)

### 5.6.6 Installation/Recovery Testing

**Definição:** Verifica processo de instalação e recuperação de falhas.

## 5.7 Mapeamento de Tipo de Teste para Ferramentas de IA

| Tipo de Teste | Ferramentas de IA           | Capacidades                               |
| ------------- | --------------------------- | ----------------------------------------- |
| Funcional     | Testim, Mabl, Virtuoso      | Self-healing, geração automática          |
| Performance   | DeepPerf, k6 + IA           | Predição de gargalos, geração de cenários |
| Segurança     | DeepExploit, SonarQube      | Análise semântica, ethical hacking        |
| Usabilidade   | Applitools, Computer Vision | Análise visual, acessibilidade            |
| API           | Schemathesis, Postman AI    | Geração de testes, fuzzing                |
| Mobile        | LambdaTest KaneAI           | Cross-platform com IA                     |

## 5.8 Planejamento de Suíte de Teste Abrangente

### Estratégia de Cobertura

**1. Base Piramidal:**

- 70% Unit Tests (rápidos, isolados)
- 20% Integration Tests (APIs, serviços)
- 10% E2E Tests (fluxos críticos)

**2. Seleção por Risco:**

- Alta criticidade: Mais cobertura
- Baixa criticidade: Menor cobertura
- Histórico de defeitos: Foco adicional

**3. Automação Inteligente:**

- Smoke: 100% automatizado
- Regression: Automatizado com self-healing
- Exploratory: Manual complementado por IA

### Na Era dos LLMs

**Geração de Suíte Completa:**

```
Input: Documentação de requisitos + Código-fonte
↓
IA analisa e identifica:
- Funcionalidades críticas
- Caminhos de risco
- Cenários de borda
↓
Output: Suíte de teste completa:
- Casos de teste estruturados
- Scripts de automação
- Dados de teste sintéticos
- Priorização por risco
```

## 5.9 Resumo

Tipos de teste fornecem uma taxonomia para organizar atividades de qualidade
baseadas em objetivos específicos. Na era dos LLMs:

- **Funcionais:** Self-healing e geração automática
- **Performance:** Predição de gargalos e geração inteligente de carga
- **Segurança:** Análise semântica e ethical hacking autônomo
- **Usabilidade:** Computer vision e análise comportamental

O planejamento efetivo combina múltiplos tipos em uma estratégia abrangente,
aproveitando automação inteligente para maximizar cobertura e eficiência.

## Referências

1. Whittaker, J. (2009). *Exploratory Software Testing*. Addison-Wesley. ISBN:
   978-0321636416
2. OWASP (2025). *Testing Guide*. Open Web Application Security Project.
   Disponível em: <https://owasp.org/www-project-web-security-testing-guide/>
3. DeepExploit (2025). *Autonomous Penetration Testing with Deep Learning*.
   Disponível em:
   <https://github.com/13o-bbr-bbq/machine_learning_security/tree/master/DeepExploit>
4. BrowserStack (2025). *Types of Testing: Different Types of Software Testing*.
   Disponível em: <https://www.browserstack.com/guide/types-of-testing>
5. Ismail, M., et al. (2020). "DeepExploit: Fully Automated Penetration Testing
   Framework using Deep Reinforcement Learning." *IEEE Access*. DOI:
   10.1109/ACCESS.2020.3025836

______________________________________________________________________

*Seção anterior: [4. Técnicas de Teste](04-tecnicas-de-teste.md) | Próxima
seção: [6. Teste na Era dos LLMs](06-teste-na-era-dos-llms.md)*

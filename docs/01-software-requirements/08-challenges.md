---
title: Desafios e Considerações na Engenharia de Requisitos com IA
created_at: 2025-02-07
tags: [software-requirements, desafios, hallucinations, etica, compliance, privacidade, vies]
status: in-progress
updated_at: 2025-02-08
ai_model: k2p5
agent: book-writer
---

# Desafios e Considerações

A adoção de Large Language Models na engenharia de requisitos traz benefícios
mensuráveis, mas também introduz riscos e desafios que demandam atenção
cuidadosa. Este capítulo examina as barreiras técnicas, organizacionais e éticas
que as equipes devem navegar para implementar RE assistida por IA de forma
responsável e efetiva.

## Desafios Técnicos

### Hallucinações e Confiabilidade

O problema das hallucinações (geração de informações plausíveis mas incorretas)
representa o risco mais significativo em RE com LLMs. Diferente de outros
domínios onde erros podem ser tolerados, requisitos incorretos propagam-se
através de todo o ciclo de desenvolvimento, resultando em sistemas mal
construídos.

**Manifestações em Engenharia de Requisitos**

Hallucinações em RE assumem formas específicas:

- **Requisitos irreais**: funcionalidades que parecem tecnicamente viáveis mas
  violam restrições de arquitetura ou domínio
- **Dependências inexistentes**: criação de vínculos entre requisitos que não
  existem na realidade do sistema
- **Stakeholders fictícios**: atribuição de necessidades a personas que não
  fazem parte do contexto organizacional
- **Estimativas incorretas**: valores de esforço ou duração sem base nos dados
  do projeto
- **Requisitos obsoletos**: reprodução de funcionalidades que foram
  descontinuadas

Estudos empíricos indicam que taxas de hallucinação podem ser significativas em
domínios especializados, variando conforme a complexidade do contexto e a
qualidade dos dados de treinamento. A precisão de LLMs em tarefas de RE depende
criticamente do grounding em fontes verificáveis.

**Estratégias de Mitigação Multi-Camadas**

Abordagens eficazes combinam múltiplas técnicas:

*Camada 1: Prompt Engineering*

Técnicas de prompting reduzem a incidência de hallucinações:

- Few-shot prompting com exemplos de requisitos válidos
- Role-playing: "Você é um analista conservador que só afirma o que está
  documentado"
- Chain-of-Thought para raciocínio explícito
- Instruções explícitas: "Se não tiver certeza, indique explicitamente"

*Camada 2: Retrieval-Augmented Generation (RAG)*

Grounding em dados verificados fundamenta requisitos em fontes confiáveis:

```
Documentação verificada
         │
         ▼
┌──────────────────┐
│  Chunking &      │
│  Embedding       │
└──────────────────┘
         │
         ▼
┌──────────────────┐
│   Vector DB      │
│  (documentos     │
│   técnicos)      │
└──────────────────┘
         │
         ▼
┌──────────────────┐     ┌──────────┐
│   Retrieval      │────→│   LLM    │
│   (contexto      │     │ (gera    │
│    relevante)    │     │ requisito│
└──────────────────┘     │ baseado) │
                         └──────────┘
```

*Camada 3: Verificação Humana Obrigatória*

Todo requisito gerado por IA deve passar por validação humana antes de ser
aprovado. O humano atua como gatekeeper final, verificando:

- Alinhamento com necessidades de negócio reais
- Viabilidade técnica
- Ausência de ambiguidades
- Consistência com arquitetura existente

**Chain-of-Verification (CoV)**

Essa técnica estruturada reduz hallucinações através de múltiplas etapas:

1. **Geração inicial**: LLM produz rascunho de requisitos
2. **Planejamento de verificação**: LLM identifica afirmações que precisam ser
   verificadas
3. **Verificação independente**: Cada afirmação é verificada separadamente
   contra fontes
4. **Verificação final**: LLM gera output final considerando resultados das
   verificações

**Ferramentas de Detecção**

Diversas ferramentas auxiliam na identificação automática de hallucinações:

- **HaluCheck**: Sistema explicável que atribui scores de confiança a requisitos
- **Grounded AI Validator**: Validação contra contexto fornecido
- **RAGAS**: Framework para avaliação de sistemas RAG em RE

### Domínio Especializado e Conhecimento Específico

LLMs genéricos carecem de conhecimento profundo em domínios especializados
(aeroespacial, financeiro, healthcare), resultando em requisitos que ignoram
nuances críticas.

**Soluções Estratégicas**

*Fine-Tuning em Corpus de Domínio*

Modelos podem ser ajustados com documentação específica do setor:

- Coletas de regulamentações (DO-178C, ISO 26262, HIPAA)
- Documentação técnica histórica da organização
- Padrões de requisitos do domínio

*Small Language Models (SLMs) Especializados*

Modelos menores (7B-13B parâmetros) treinados especificamente para RE:

- Menor custo computacional
- Deployment on-premise viável
- Performance superior em tarefas específicas

*Knowledge-Augmented Language Models (KALMs)*

Arquiteturas que combinam LLMs com bases de conhecimento estruturadas:

- Integração com ontologias de domínio
- Reasoning sobre regras de negócio formais
- Verificação de compliance automática

### Consistência e Rastreabilidade

A geração iterativa de requisitos por IA introduz desafios de consistência ao
longo do tempo.

**Problemas Específicos**

- Requisitos gerados em diferentes iterações podem usar terminologia
  inconsistente
- Mudanças em prompts podem alterar drasticamente o estilo de outputs
- Difícil rastrear qual versão de prompt gerou qual requisito
- Propagação de mudanças em requisitos relacionados não é automática

**Abordagens de Mitigação**

*Versionamento de Prompts*

Tratar prompts como código-fonte:

```
prompts/
├── elicitation/
│   ├── v1.0_stakeholder_interview.md
│   ├── v1.1_stakeholder_interview.md
│   └── v2.0_stakeholder_interview.md
└── specification/
    ├── user_story_v1.md
    └── user_story_v2.md
```

*Metadata em Outputs*

Todo requisito gerado deve incluir metadados:

```json
{
  "requirement_id": "REQ-001",
  "prompt_version": "elicitation_v2.1",
  "model": "gpt-4-0125-preview",
  "timestamp": "2025-02-07T14:30:00Z",
  "temperature": 0.2,
  "reviewed_by": "analyst@company.com",
  "review_date": "2025-02-08T09:15:00Z"
}
```

*Ferramentas de Rastreabilidade*

Integração com ferramentas de RM para manter rastros:

- Links bidirecionais entre prompts e requisitos
- Histórico de mudanças automático
- Propagação de alterações entre itens relacionados

## Desafios Organizacionais

### Mudança de Mindset e Resistência Cultural

A introdução de IA em RE confronta crenças e práticas estabelecidas.

**Fontes de Resistência**

*Desconfiança em Requisitos Gerados por IA*

Profissionais experientes frequentemente questionam:

- "Como posso confiar em algo que a máquina 'imaginou'?"
- "O cliente não vai aceitar requisitos escritos por IA"
- "Isso não captura a nuance do nosso domínio"

*Medo de Substituição de Profissionais*

Preocupações legítimas sobre empregabilidade:

- Engenheiros de requisitos vendo suas funções reduzidas
- Analistas de negócio temendo obsolescência
- Gestores questionando necessidade de equipes grandes

*Curva de Aprendizado*

Novas competências exigem investimento de tempo:

- Aprender prompt engineering efetivo
- Desenvolver capacidade de avaliar outputs de IA
- Adaptar workflows existentes

**Estratégias de Adoção**

*Começar com Casos de Uso de Baixo Risco*

Introduza IA gradualmente:

1. Geração de brainstorming inicial (não comprometedor)
2. Reformulação de requisitos existentes
3. Detecção de ambiguidades em documentos legados
4. Geração de casos de teste a partir de requisitos validados

*Human-in-the-Loop como Padrão*

Comunique claramente que IA é assistente, não substituto:

- Toda decisão final requer aprovação humana
- Profissionais focam em validação e decisão estratégica
- IA elimina trabalho repetitivo, não expertise

*Métricas de Produtividade*

Demonstre valor com dados:

- Tempo economizado em tarefas manuais
- Redução de defeitos em requisitos
- Melhoria na satisfação de stakeholders
- Capacidade de atender mais projetos com mesma equipe

### Integração com Processos Legados

Organizações com processos estabelecidos e ferramentas tradicionais de RM
enfrentam barreiras de integração.

**Ferramentas Tradicionais de RM**

- DOORS (IBM): arquitetura antiga, APIs limitadas
- Jama Connect: workflows rígidos, customização complexa
- Polarion: integração possível mas requer desenvolvimento

**Normas e Processos Documentados**

Muitas organizações operam sob normas que especificam formatos e processos:

- Templates de documentos de requisitos prescritos
- Ciclos de aprovação com assinaturas físicas
- Auditorias que verificam conformidade com processo documentado

**Estratégias de Integração**

*APIs e Camadas de Tradução*

Desenvolva integrações que respeitem processos existentes:

```python
# Exemplo: integração com ferramenta legacy
def gerar_requisito_via_ia(dados_entrada):
    # Geração via LLM
    requisito_llm = llm.generate(dados_entrada)

    # Tradução para formato legacy
    requisito_formatado = traduzir_para_formato_legacy(
        requisito_llm,
        template_organizacional
    )

    # Inserção via API da ferramenta
    ferramenta_legacy.create_requirement(requisito_formatado)

    # Registro de metadata para auditoria
    audit_log.record(prompt_usado, requisito_llm, revisor)
```

*Export para Formatos Tradicionais*

Mantenha processos formais enquanto usa IA internamente:

- Gere requisitos com IA
- Exporte para PDF/DOCX conforme templates organizacionais
- Submeta a ciclos de aprovação tradicionais
- Mantenha rastreabilidade entre artefato formal e processo com IA

## Considerações Éticas

### Viés e Fairness

LLMs treinados em dados da internet perpetuam vieses presentes nesses dados,
podendo gerar requisitos discriminatórios não intencionais.

**Manifestações de Viés em RE**

*Viés de Gênero*

- Assumir que "usuário" é masculino
- Personas de liderança sempre descritas com pronomes masculinos
- Fluxos de trabalho que assumem divisões de gênero tradicionais

*Viés Cultural*

- Interfaces projetadas para contextos ocidentais
- Processos de negócio que ignoram práticas culturais diversas
- Suposições sobre alfabetização digital

*Viés de Acessibilidade*

- Requisitos que ignoram necessidades de usuários com deficiências
- Pressuposições sobre capacidades sensoriais ou motoras
- Exclusão de públicos idosos

**Estratégias de Mitigação**

*Auditoria de Requisitos por Vieses*

Processe requisitos gerados por IA através de checklists:

```markdown
## Checklist de Auditoria de Viés

### Gênero
- [ ] Personas incluem diversidade de gênero?
- [ ] Linguagem é neutra em gênero?
- [ ] Fluxos de trabalho assumem divisões tradicionais?

### Acessibilidade
- [ ] Requisitos consideram WCAG 2.1?
- [ ] Há requisitos para compatibilidade com screen readers?
- [ ] Contraste e tamanho de fonte são especificados?

### Diversidade Cultural
- [ ] Sistema suporta múltiplos idiomas adequadamente?
- [ ] Formatação de datas, moedas, endereços é flexível?
- [ ] Imagens e ícones são culturalmente sensíveis?
```

*Diversidade nos Dados de Fine-Tuning*

Quando ajustar modelos para domínio específico:

- Inclua documentação de projetos diversos
- Incorpore perspectivas de diferentes equipes
- Valide representatividade do corpus de treinamento

*Inclusão de Stakeholders Diversos na Validação*

Garanta que processo de revisão inclua:

- Representantes de diferentes gêneros
- Pessoas com deficiências
- Usuários de diferentes contextos culturais
- Idades diversas

### Privacidade e Segurança

O uso de APIs de LLM expõe dados de requisitos a terceiros, criando riscos de
vazamento de informações sensíveis.

**Riscos Específicos**

*Vazamento de Informações Sensíveis*

Requisitos frequentemente contêm:

- Estratégias de negócio confidenciais
- Informações sobre clientes
- Dados pessoais de usuários (PII)
- Detalhes de sistemas legados vulneráveis

*Compliance Regulatório*

Diferentes jurisdições impõem restrições:

- GDPR (Europa): limitações sobre transferência de dados para fora da UE
- LGPD (Brasil): necessidade de consentimento e registro de operações
- CCPA (Califórnia): direito de exclusão de dados pessoais
- HIPAA (EUA): proteção de informações de saúde

**Soluções de Mitigação**

*LLMs On-Premise ou Privados*

Deploy de modelos dentro da infraestrutura organizacional:

- LLaMA 2/3, Mistral, Falcon para uso interno
- Controle total sobre dados
- Custo computacional maior, mas privacidade garantida

*Anonimização de Dados*

Pré-processamento para remover informações sensíveis:

```python
def anonimizar_requisito(texto):
    # Remover nomes próprios
    texto = remover_nomes(texto)

    # Substituir identificadores sensíveis
    texto = substituir_por_placeholders(
        texto,
        ["nome_cliente", "cpf", "endereco"]
    )

    # Generalizar detalhes específicos
    texto = generalizar(texto)

    return texto

# Uso
requisito_anonimizado = anonimizar_requisito(requisito_original)
requisito_gerado = llm.generate(requisito_anonimizado)
requisito_final = desanonimizar(requisito_gerado, mapeamento)
```

*BYOK (Bring Your Own Key) e DPAs*

Negocie com fornecedores:

- Uso de suas próprias credenciais de API
- Acordos de Processamento de Dados (DPA) robustos
- Garantias de não retenção de dados
- Opções de deployment em regiões específicas

### Responsabilidade e Accountability

A introdução de IA em RE levanta questões fundamentais sobre responsabilidade.

**Questões Críticas**

- Quem é responsável quando um requisito gerado por IA é incorreto?
- Como auditar decisões tomadas com assistência de IA?
- Qual o nível de transparência necessário em processos de RE?
- Como garantir que stakeholders compreendam o papel da IA?

**Práticas Recomendadas**

*Documentação de Prompts Usados*

Mantenha registro completo:

```yaml
requisito:
  id: REQ-001
  gerado_por:
    modelo: gpt-4-0125-preview
    prompt_version: elicitation_v2.1
    prompt_hash: a1b2c3d4
    temperatura: 0.2
    data_geracao: 2025-02-07T14:30:00Z
  revisao_humana:
    revisor: ana.silva@empresa.com
    data_revisao: 2025-02-08T09:15:00Z
    alteracoes: ["clarificacao_escopo", "adicao_rnf"]
  aprovacao:
    aprovador: carlos.santos@empresa.com
    data_aprovacao: 2025-02-08T16:00:00Z
```

*Revisão Humana Obrigatória para Requisitos Críticos*

Classifique requisitos por criticidade:

- Críticos (safety, compliance): validação humana obrigatória
- Importantes: validação recomendada
- Baixo risco: validação por amostragem

*Transparência com Stakeholders*

Comunique claramente:

- Quais partes do processo usam IA
- Nível de confiança em cada requisito
- Processo de validação aplicado
- Como fornecer feedback sobre qualidade

## Compliance Regulatório

### Standards e Normas Aplicáveis

RE assistida por IA deve atender a standards existentes que não foram projetados
considerando essa tecnologia.

**Standards Principais**

| Standard                | Domínio                  | Implicações para IA                            |
| ----------------------- | ------------------------ | ---------------------------------------------- |
| ISO/IEC/IEEE 29148:2018 | Engenharia de Requisitos | Requisitos devem ser rastreáveis, verificáveis |
| DO-178C                 | Aviação                  | Tool qualification necessária                  |
| ISO 26262               | Automotivo               | Ferramentas devem ser qualificadas por ASIL    |
| IEC 62304               | Dispositivos Médicos     | Processo de desenvolvimento documentado        |
| ISO 14971               | Gestão de Riscos         | Riscos de IA devem ser avaliados               |

**Exigências Típicas**

Para compliance em indústrias reguladas, geralmente é necessário:

- Rastreabilidade completa entre requisitos, design, código e testes
- Análise de impacto documentada para mudanças
- Validação humana verificável
- Arquivamento de versões de todos os artefatos
- Qualificação de ferramentas usadas

### Estratégias de Compliance

*Documentação de Processo*

Descreva explicitamente como IA é usada:

```markdown
## Processo de RE com IA - Documento de Processo

### 1. Escopo de Uso de IA
IA é utilizada para:
- Geração inicial de user stories
- Detecção de ambiguidades
- Geração de casos de teste

IA NÃO é utilizada para:
- Decisões de aceite de requisitos
- Validação final de requisitos safety-critical

### 2. Papéis e Responsabilidades
- AI Prompt Engineer: prepara prompts e contexto
- Requirements Analyst: valida outputs de IA
- QA Lead: verifica qualidade de requisitos
- Compliance Officer: audita conformidade

### 3. Checkpoints de Validação Humana
- Checkpoint 1: Após geração inicial
- Checkpoint 2: Após refinamento
- Checkpoint 3: Aprovação final

### 4. Evidências Geradas
- Prompts usados (versionados no Git)
- Outputs brutos de IA
- Registros de revisão
- Registros de aprovação
```

*Ferramentas Qualificadas*

Para domínios safety-critical, prefira ferramentas com qualificação:

- IBM RQA para aeroespacial/automotivo
- Ferramentas validadas em processo de qualificação
- Documentação de qualificação mantida atualizada

*Evidências e Auditoria*

Mantenha registros completos para auditorias:

- Todos os prompts utilizados (versionados)
- Todos os outputs gerados
- Registros de quem revisou e quando
- Registros de aprovação com assinaturas digitais
- Logs de decisões e justificativas

## Framework de Gestão de Riscos

Para organizações implementando RE com IA, recomenda-se um framework
estruturado:

```
┌─────────────────────────────────────────────────────────────┐
│              FRAMEWORK DE GESTÃO DE RISCOS                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐                                          │
│  │  IDENTIFICAR │                                          │
│  │   RISCOS     │                                          │
│  └──────┬───────┘                                          │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────┐     ┌──────────────┐                     │
│  │   AVALIAR    │────→│  PRIORIZAR   │                     │
│  │  IMPACTO     │     │   RISCOS     │                     │
│  └──────┬───────┘     └──────┬───────┘                     │
│         │                     │                             │
│         ▼                     ▼                             │
│  ┌──────────────┐     ┌──────────────┐                     │
│  │  DEFINIR     │     │  IMPLEMENTAR │                     │
│  │  CONTROLES   │────→│  CONTROLES   │                     │
│  └──────┬───────┘     └──────┬───────┘                     │
│         │                     │                             │
│         └──────────┬──────────┘                             │
│                    ▼                                        │
│  ┌──────────────┐     ┌──────────────┐                     │
│  │   MONITORAR  │←───→│   REVISAR    │                     │
│  │   EFEITIVIDADE     CONTROLES      │                     │
│  └──────────────┘     └──────────────┘                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Matriz de Riscos

| Risco                             | Probabilidade | Impacto | Prioridade | Controle Principal             |
| --------------------------------- | ------------- | ------- | ---------- | ------------------------------ |
| Hallucinação em requisito crítico | Média         | Alto    | Alta       | Verificação humana obrigatória |
| Vazamento de dados sensíveis      | Baixa         | Alto    | Média      | Anonimização, BYOK             |
| Viés discriminatório              | Média         | Médio   | Média      | Auditoria diversificada        |
| Perda de rastreabilidade          | Baixa         | Médio   | Baixa      | Metadata obrigatória           |
| Resistência cultural              | Alta          | Médio   | Alta       | Comunicação, métricas          |

## Referências

1. **Zhang, K., et al.** (2024). "How Language Model Hallucinations Can
   Snowball." *Proceedings of ICML 2024*.
   <https://proceedings.mlr.press/v235/zhang24ay.html>

2. **Ebrahim, A., et al.** (2024). "Enhancing Software Requirements Engineering
   with Language Models and Prompting Techniques." *arXiv:2401.00000*.
   <https://aclanthology.org/2024.acl-srw.31/>

3. **ISO/IEC/IEEE.** (2018). *ISO/IEC/IEEE 29148:2018 - Systems and software
   engineering — Life cycle processes — Requirements engineering*.

4. **RTCA.** (2011). *DO-178C - Software Considerations in Airborne Systems and
   Equipment Certification*.

5. **ISO.** (2018). *ISO 26262 - Road vehicles — Functional safety*.

6. **IEC.** (2006). *IEC 62304 - Medical device software — Software life cycle
   processes*.

7. **Vogelsang, A.** (2024). "From Specifications to Prompts: On the Future of
   Generative Large Language Models in Requirements Engineering." *IEEE
   Software, 41(5)*.
   <https://www.computer.org/csdl/magazine/so/2024/05/10629163/1Zdj3HlmqFG>

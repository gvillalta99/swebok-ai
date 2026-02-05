# Plano do Capítulo 1: Software Requirements

## Visão Geral

O capítulo de Software Requirements no SWEBOK-AI v5.0 representa uma mudança de
paradigma fundamental. Enquanto o SWEBOK v4.0 tratava requisitos como um
processo de captura e documentação de necessidades dos stakeholders, a versão
5.0 reconhece que, na era dos LLMs, o desafio central deixou de ser "o que
construir" para se tornar "o que NÃO deixar a IA construir".

Este capítulo estabelece os fundamentos da **Engenharia de Restrições e
Contexto** — uma disciplina que assume que a geração de código tornou-se
commodity, mas que a definição de fronteiras de domínio, invariantes críticas e
comportamentos de degradação graciosa requer expertise humana insubstituível. O
engenheiro de software do futuro não é um tradutor de requisitos em código, mas
um curador de restrições que garante que sistemas autônomos operem dentro de
limites seguros, auditáveis e responsabilizáveis.

A transição proposta não descarta o conhecimento acumulado de décadas de
engenharia de requisitos, mas o recontextualiza: técnicas de elicitação
tornam-se ferramentas para mapear não apenas o que o sistema deve fazer, mas o
que ele jamais deve fazer; especificação deixa de ser um exercício de precisão
sintática para se tornar um ato de estabelecer barreiras contra alucinações
arquiteturais; validação transforma-se em verificação de conformidade semântica
em um mundo onde código "funcional" é gerado em segundos.

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos da Engenharia de Restrições**
2. **Seção 2: Elicitação de Contexto e Intenção**
3. **Seção 3: Especificação por Invariantes e Contratos**
4. **Seção 4: Modelagem de Degradação Graciosa e Falhas**
5. **Seção 5: Governança e Responsabilidade em Requisitos**
6. **Seção 6: Gestão da Variabilidade e Evolução**
7. **Seção 7: Ferramentas e Técnicas Modernas**

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                    | Avaliação                                                      |
| --------------------------- | -------------------------------------------------------------- |
| Descartabilidade Geracional | Baixa - conceitos fundamentais para era dos LLMs               |
| Custo de Verificação        | Alto - exige expertise sênior para validação                   |
| Responsabilidade Legal      | Crítico - engenheiros responsáveis por restrições e governança |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Design:** Restrições definem limites para design de sistemas
  híbridos
- **Software Construction:** Especificação negativa determina o que deve ser
  codificado manualmente
- **Software Testing:** Invariantes servem como base para oráculos de teste
- **Software Quality:** Restrições fundamentam garantias de qualidade
- **Software Security:** Especificação de limites é essencial para segurança
- **Engenharia de Garantia e Verificação em Escala:** Verificação de saídas LLM
- **Governança de IA para Engenharia de Software:** Responsabilidade e
  compliance

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0*

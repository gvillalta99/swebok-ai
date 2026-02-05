# Plano do Capítulo 2: Software Architecture

## Visão Geral

O capítulo de Software Architecture no SWEBOK-AI v5.0 representa uma
transformação profunda na concepção de arquitetura de software. Enquanto o
SWEBOK v4.0 tratava arquitetura como uma disciplina de estruturação de
componentes e definição de estilos arquiteturais, a versão 5.0 reconhece que na
era dos LLMs, arquitetura tornou-se primariamente sobre **design de sistemas
híbridos humanos-IA**.

Este capítulo estabelece os fundamentos da **Arquitetura de Sistemas Híbridos**
— uma disciplina que assume que componentes autônomos baseados em IA operam lado
a lado com código determinístico, exigindo novos padrões de separação de
concerns, mecanismos de supervisão, e estratégias de auditabilidade que não
existiam em arquiteturas tradicionais.

A transição proposta recontextualiza a arquitetura de software: padrões
arquiteturais tornam-se frameworks para decisão sobre quais decisões podem ser
delegadas a sistemas autônomos; estilos arquiteturais incorporam dimensões de
variabilidade e não-determinismo; qualidade arquitetural expande-se para incluir
auditabilidade de decisões e explicabilidade de comportamento.

______________________________________________________________________

## Estrutura do Capítulo

1. **Seção 1: Fundamentos da Arquitetura Híbrida**
2. **Seção 2: Arquitetura de Supervisão e Controle**
3. **Seção 3: Padrões de Separação de Concerns Críticos**
4. **Seção 4: Design para Auditabilidade e Rastreamento**
5. **Seção 5: Antropização de Interfaces e Experiências**
6. **Seção 6: Qualidade Arquitetural em Sistemas com IA**
7. **Seção 7: Documentação Arquitetural para Sistemas Opacos**
8. **Seção 8: Ferramentas e Técnicas Modernas**

______________________________________________________________________

## Matriz de Avaliação Consolidada

| Critério                    | Avaliação                                                           |
| --------------------------- | ------------------------------------------------------------------- |
| Descartabilidade Geracional | Baixa - fundamentos de arquitetura híbrida são duradouros           |
| Custo de Verificação        | Alto - arquiteturas complexas exigem expertise especializada        |
| Responsabilidade Legal      | Crítico - decisões arquiteturais definem responsabilidade em falhas |

______________________________________________________________________

## Relacionamento com Outros KAs

- **Software Requirements:** Restrições de arquitetura traduzem requisitos em
  estruturas
- **Software Design:** Arquitetura fornece esqueleto para design de componentes
  híbridos
- **Software Construction:** Padrões arquiteturais definem limites da geração
  automática
- **Software Testing:** Arquitetura de testabilidade em sistemas
  não-determinísticos
- **Software Security:** Arquitetura de defesa em profundidade com componentes
  de IA
- **Engenharia de Garantia e Verificação em Escala:** Arquiteturas para
  verificação massiva
- **Governança de IA para Engenharia de Software:** Arquiteturas que suportam
  compliance

______________________________________________________________________

*Documento de planejamento - SWEBOK-AI v5.0*

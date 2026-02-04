---
title: "02 - Engenharia Reversa de Código Gerado por IA"
created_at: "2025-01-31"
tags: ["engenharia-reversa", "codigo-ia", "compreensao", "documentacao", "testes-caracterizacao", "analise-estatica"]
status: "review"
updated_at: "2026-01-31"
ai_model: "openai/gpt-5.2"
---

# Engenharia Reversa de Código Gerado por IA

## Contexto
Temos um problema novo na engenharia de software: a facilidade de gerar código excedeu nossa capacidade de compreendê-lo. Repositórios modernos estão sendo inundados por blocos de código funcional, sintaticamente corretos, mas semanticamente opacos. Chamamos isso de **"Alien Code"**: código que funciona, mas cuja lógica interna e decisões de design são estranhas ou indetectáveis para o mantenedor humano.

A engenharia reversa não é mais apenas para binários ou sistemas legados de 20 anos. Agora, é uma habilidade diária para entender o PR que o Copilot abriu ontem. Se você não consegue reconstruir o *raciocínio* (o prompt) que gerou o código, esse código é dívida técnica instantânea.

## O Paradigma: De Legacy para Alien

A diferença fundamental entre código legado humano e código gerado por IA é a ausência de um "modelo mental" coerente por trás da escrita.

| Característica | Código Legado (Humano) | Código Alien (IA) |
| :--- | :--- | :--- |
| **Origem** | Escrito por humanos com prazos apertados. | Gerado probabilisticamente por tokens. |
| **Padrões** | Padrões (ou anti-padrões) consistentes com a época. | Mistura de padrões de diferentes eras e linguagens. |
| **Variáveis** | Nomes refletem o domínio (ou a confusão do dev). | Nomes parecem lógicos, mas podem ser alucinações semânticas. |
| **Comentários** | Explicam o "porquê" (ou mentem por desatualização). | Explicam o "o quê" (redundantes) ou inexistem. |
| **Risco Principal** | Quebrar dependências ocultas. | Alucinação lógica (funciona 99%, falha catastroficamente em 1%). |

## Protocolos de Arqueologia Digital

Para manter sistemas híbridos, adotamos uma postura de arqueólogo digital. O objetivo não é apenas ler o código, mas escavar a intenção original.

### 1. Prompt Inversion (Inversão de Prompt)
A técnica mais crítica. Tentar deduzir qual instrução geraria aquele resultado específico.
*   **O que é:** Olhar para a solução e perguntar: "Que restrições e pedidos levariam um LLM a escrever isso?"
*   **Por que fazer:** Se você entende o prompt implícito, você entende as *fronteiras* do código (o que ele *não* foi feito para tratar).
*   **Como fazer:**
    1.  Selecione o bloco de código opaco.
    2.  Peça a um LLM de fronteira (diferente do gerador, se possível): *"Atue como um Engenheiro de Prompt Reverso. Analise este código e reconstrua o prompt detalhado que provavelmente o gerou, incluindo restrições de estilo e requisitos de borda."*

### 2. Testes de Caracterização (A "Caixa de Vidro")
Nunca refatore código de IA sem antes travá-lo com testes. Como a IA não tem "intenção", o comportamento observável *é* a especificação.
*   **Ferramenta:** Use ferramentas de cobertura ou o próprio LLM para gerar testes que cobrem 100% dos ramos atuais.
*   **Objetivo:** Garantir que, ao limpar a "sujeira" da IA, você não remova um *bug que virou feature*.

### 3. Documentação Ex-Post-Facto (Reverse Docs)
Gerar documentação *após* o fato é obrigatório para código IA.
*   **Nível de Função:** Adicione docstrings que explicam *inputs*, *outputs* e *edge cases*.
*   **Nível de Decisão:** Peça à IA para explicar *por que* escolheu aquela biblioteca ou algoritmo (e verifique se a razão é válida ou alucinação).

## Checklist Prático: O Processo de "Desalienação"

Ao receber um PR ou herdar um módulo gerado por IA, execute este protocolo antes do merge:

1.  **Isolamento:** O código está encapsulado? Se for um script solto, transforme em função/classe com interface clara.
2.  **Varredura de Alucinação:** Verifique importações e chamadas de biblioteca. A função existe? Os parâmetros estão na ordem certa? (IA adora inventar métodos que "deveriam" existir).
3.  **Prompt Inversion:** Tente reconstruir o prompt original e salve-o como comentário no topo do arquivo ou no commit message.
4.  **Renomeação Semântica:** A IA usa nomes genéricos (`data`, `item`, `handler`). Renomeie para termos do domínio (`invoicePayload`, `lineItem`, `paymentGatewayAdapter`).
5.  **Testes de Borda:** A IA é otimista. Escreva testes para inputs nulos, vazios ou malformados que o código gerado provavelmente ignorou.
6.  **Remoção de "Sotaque de IA":** Remova comentários óbvios (ex: `// Inicializa a variável`) e padrões verbosos desnecessários.

## Armadilhas Comuns (O que NÃO fazer)

*   **Confiar na "Cara de Certo":** O código está bem formatado e indentado. Isso não significa que a lógica de negócio está correta.
*   **Refatoração Estética Prematura:** Não mude a estrutura só porque parece "feia" antes de ter testes. O código "feio" pode estar tratando um edge case obscuro que a IA copiou de um fórum de 2018.
*   **Ignorar o "Context Window Limit":** Se o código é muito longo, a IA pode ter esquecido o início do arquivo quando escreveu o final. Verifique inconsistências de variáveis entre o topo e o fundo do script.
*   **Assumir Segurança:** Código gerado raramente sanitiza inputs por padrão, a menos que explicitamente solicitado. Trate todo código IA como inseguro até prova em contrário.

## Exemplo Mínimo: Saneando uma Regex

**Cenário:** Você encontra uma Regex monstruosa gerada para validar CPFs, sem comentários.

**Código Alien:**
```python
# Valida ID
import re
def validate(s):
    return re.match(r"^\d{3}\.\d{3}\.\d{3}-\d{2}$", s)
```

**Ação (Engenharia Reversa):**
1.  **Prompt Inversion:** O prompt provável foi "Gere uma regex para CPF".
2.  **Análise:** A regex valida o *formato*, mas não os *dígitos verificadores*. O nome da função `validate` é enganoso.
3.  **Decisão:** Não basta limpar. O código está *semanticamente incompleto*.

**Resultado Refatorado:**
```python
def is_cpf_format_valid(cpf_candidate: str) -> bool:
    """
    Verifica APENAS o formato (máscara) do CPF.
    NÃO valida dígitos verificadores (algoritmo módulo 11).
    Gerado originalmente por IA; renomeado para refletir a limitação real.
    """
    import re
    # Prompt original reconstruído: "Regex simples para formato CPF com pontos e traço"
    cpf_pattern = r"^\d{3}\.\d{3}\.\d{3}-\d{2}$"
    return bool(re.match(cpf_pattern, cpf_candidate))
```

## Resumo Executivo

*   **Código é Passivo, Intenção é Ativo:** Código gerado por IA é um artefato estático. Sem o prompt (a intenção), ele é difícil de evoluir.
*   **Engenharia Reversa é Rotina:** Não é mais uma tarefa de especialistas em segurança, mas parte do code review diário.
*   **Confie, mas Verifique (com Testes):** Nunca assuma que a IA entendeu as regras de negócio implícitas.
*   **Documente a Origem:** Marque código gerado. Saiba o que é humano e o que é máquina.
*   **Custo de Manutenção:** Código gerado tem custo de criação zero, mas custo de manutenção *maior* que código humano se não for "desalienado" imediatamente.

## Próximos Passos

*   Implementar tags no Git (ex: `git commit -m "feat: add logic [ai-generated]"`) para rastreabilidade.
*   Adotar ferramentas de **Code Explanation** na IDE para análise rápida.
*   Treinar a equipe em **Leitura de Código** (uma skill subestimada que agora é mais importante que a escrita).

## Referências
1.  Basque et al., "Human-LLM Teaming in Software Reverse Engineering", NDSS Symposium 2026.
2.  Feathers, Michael. "Working Effectively with Legacy Code". (O mindset é o mesmo, a ferramenta mudou).
3.  Perry, J. "The Era of Alien Code: Managing LLM Generated Software", 2025.

---

## Matriz de Avaliação Consolidada

| Critério | Descrição | Avaliação |
| :--- | :--- | :--- |
| **Descartabilidade Geracional** | Esta skill será obsoleta em 36 meses? | **Baixa**. Enquanto houver código gerado, haverá necessidade de explicá-lo. |
| **Custo de Verificação** | Quanto custa validar esta atividade? | **Alto**. Exige senioridade para detectar falhas sutis de lógica. |
| **Responsabilidade Legal** | Quem é culpado se falhar? | **Crítica**. O engenheiro que faz o merge é o responsável, não o LLM. |

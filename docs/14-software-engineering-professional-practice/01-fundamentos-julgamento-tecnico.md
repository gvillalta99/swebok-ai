---
title: 14.1 Fundamentos do Julgamento Técnico na Era da IA
created_at: '2026-01-31'
tags: [julgamento-tecnico, ia-generativa, verificacao, accountability, engenharia-software]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# 14.1 Fundamentos do Julgamento Técnico na Era da IA

A geração de código por IA transformou a sintaxe em commodity, mas elevou o
**julgamento técnico** a ativo crítico. Em um cenário onde a produção é quase
instantânea e de custo marginal zero, o valor da engenharia desloca-se para a
capacidade de discernimento: saber o que aceitar, o que rejeitar e,
principalmente, quem responde pelo resultado final. Não se trata de "ser contra
a IA", mas de entender que o `git commit` é uma assinatura de responsabilidade
legal e técnica que nenhum modelo de linguagem pode assumir por você.

## 1. A Nova Equação de Responsabilidade (Accountability)

A premissa central é simples: **A IA é uma ferramenta, não um autor.**

Quando um sistema falha, causa prejuízo financeiro ou expõe dados sensíveis, a
responsabilidade recai sobre o engenheiro que aprovou o Pull Request, não sobre
a OpenAI, Google ou Anthropic. Os Termos de Serviço dos provedores de LLM são
explícitos em isentar-se de garantias.

### O Princípio da Custódia do Código

Ao aceitar uma sugestão de IA, você realiza um ato de **adoção**. A partir
daquele milissegundo, o código é seu.

- **Antes da IA:** Você escrevia o bug, você era dono do bug.
- **Com IA:** A IA sugere o bug, você aceita o bug, você continua sendo dono do
  bug.

A ilusão de que "a máquina fez" cria uma complacência perigosa. O julgamento
técnico exige tratar código gerado por IA com *mais* rigor do que código escrito
por um estagiário, pois a IA possui uma "plausibilidade superficial" (soa
correto, parece correto, mas pode estar fundamentalmente errado) que humanos
iniciantes raramente conseguem mimetizar.

## 2. Ética como Requisito de Segurança

Ética na engenharia de software frequentemente é tratada como um módulo de
humanidades desconectado da prática. Na era da IA, **ética é um requisito
não-funcional de segurança**.

- **Viés é Vulnerabilidade:** Um modelo que gera código de validação de
  identidade enviesado não é apenas "injusto"; ele cria um vetor de ataque ou
  negação de serviço para um subgrupo de usuários.
- **Alucinação é Risco Operacional:** Se a IA inventa uma dependência (package
  hallucination) e você a instala, você acabou de introduzir um vetor para
  *supply chain attack*.

O julgamento técnico impõe a verificação de que o sistema se comporta dentro de
limites legais e morais aceitáveis, não apenas que "compila e roda".

## 3. A Arte de Dizer "Não" (Veto Técnico)

A competência mais valiosa de um engenheiro sênior hoje é a capacidade de vetar
sugestões da IA, mesmo quando elas parecem "funcionar".

### Quando exercer o Veto

1. **Complexidade Acidental:** A IA gerou 50 linhas de código "esperto" (ex:
   regex complexo, recursão desnecessária) para resolver algo que 3 linhas
   explícitas resolveriam. **Decisão:** Rejeitar. Manutenibilidade > Velocidade.
2. **Opacidade:** A solução usa bibliotecas obscuras ou padrões que a equipe não
   domina. **Decisão:** Rejeitar. Se você não entende como quebra, não pode
   colocar em produção.
3. **Falso Determinismo:** A IA sugere testes que passam sempre (falsos
   positivos) ou mocks que não refletem a realidade. **Decisão:** Reescrever os
   testes manualmente.

## Checklist Prático: O Protocolo de Aceitação

Antes de aceitar qualquer bloco de código significativo gerado por IA (>5 linhas
ou lógica de negócio), aplique este protocolo:

1. [ ] **Leitura Linha a Linha:** Eu li *cada* linha? (Não vale leitura
   dinâmica).
2. [ ] **Verificação de Dependências:** Todas as bibliotecas importadas existem
   e são seguras? (Prevenção de *typosquatting*).
3. [ ] **Teste de Fronteira (Edge Cases):** A IA tratou nulos, listas vazias,
   caracteres especiais e timeouts? (LLMs são otimistas por padrão).
4. [ ] **Entendimento Total:** Eu consigo explicar o "porquê" dessa
   implementação para um auditor ou juiz?
5. [ ] **Segurança:** Há segredos hardcoded ou injeção de SQL/Comando óbvia?
6. [ ] **Propriedade Intelectual:** O código parece ser uma cópia literal de uma
   licença restritiva (GPL, etc.)? (Use ferramentas de *snippet matching* se
   disponível).

## Armadilhas Comuns

1. **A Fadiga do "Tab":** Aceitar sugestões do Copilot por reflexo muscular
   (pressionar Tab) sem ler. Isso insere bugs sutis que levam dias para depurar.
2. **Ancoragem na Solução:** Pedir para a IA "corrigir" um código ruim, em vez
   de apagar e repensar a abordagem. A IA tentará salvar a lógica falha em vez
   de propor a arquitetura correta.
3. **Terceirização do Raciocínio:** Pedir para a IA "explicar o que este código
   faz" e confiar na explicação sem ler o código. A IA frequentemente alucina a
   explicação para fazê-la soar segura.
4. **Ignorar o Contexto de Negócio:** A IA não sabe que "cliente VIP" tem uma
   regra de desconto diferente que mudou ontem. Ela opera com dados de
   treinamento congelados no tempo.

## Exemplo Mínimo: Validação de E-mail

**Cenário:** Você precisa validar um e-mail em um formulário de cadastro
crítico.

**Sugestão da IA:**

```python
# Sugestão comum de LLMs (Vulnerável a ReDoS)
import re
def validate_email(email):
    return re.match(r"^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$", email)
```

**Julgamento Técnico (O que acontece na sua cabeça):**

1. *Análise:* "Essa regex é complexa e potencialmente vulnerável a *Regular
   Expression Denial of Service* (ReDoS) se o input for malicioso e longo."
2. *Padrão:* "RFC 5322 é complexa demais para regex simples. Além disso, regex
   não valida se o e-mail existe."
3. *Decisão:* **Rejeitar a implementação da IA.**

**Solução Aplicada (Engenharia Real):**

```python
# Abordagem pragmática e segura
from email_validator import validate_email, EmailNotValidError

def check_email(email):
    try:
        # Usa uma library mantida e testada, não uma regex ad-hoc
        v = validate_email(email)
        return v["email"]
    except EmailNotValidError as e:
        # Log de erro de negócio, não crash
        return None
```

**Trade-off:** Adicionamos uma dependência (custo), mas eliminamos uma
vulnerabilidade de segurança e garantimos conformidade com padrões atuais
(benefício).

## Resumo Executivo

- **Código é passivo, Engenheiro é ativo:** Você é o responsável legal por cada
  linha comitada, independente de quem (ou o que) a escreveu.
- **Ceticismo como padrão:** Trate código de IA como código de terceiros não
  confiável até prova em contrário.
- **Verificação > Produção:** Seu valor profissional migrou da velocidade de
  digitação para a profundidade da auditoria.
- **Ética é Segurança:** Viés e alucinações em código são vetores de ataque e
  risco operacional.
- **Poder de Veto:** A ferramenta mais importante no seu cinto de utilidades é a
  capacidade de rejeitar código que não atende aos padrões de qualidade,
  segurança ou manutenibilidade.

## Próximos Passos

- Configurar linters estritos que rodem *antes* do code review humano para pegar
  erros sintáticos óbvios da IA.
- Praticar "Code Review às Cegas": Tente revisar um PR sem saber se foi feito
  por humano ou IA. Se você deixar passar erros óbvios, seu processo de revisão
  está falho.
- Estudar os modos de falha comuns dos LLMs atuais (ex: alucinação de
  bibliotecas Python/NPM) para identificá-los rapidamente.

---
title: Vulnerabilidades em Código Gerado por IA
created_at: '2025-01-31'
tags: [seguranca, codigo-gerado, vulnerabilidades, ia, cwe, supply-chain]
status: review
updated_at: '2026-02-04'
ai_model: google/gemini-3-pro-preview
---

# Vulnerabilidades em Código Gerado por IA

## Contexto

A Inteligência Artificial não "entende" segurança; ela entende probabilidade. O
objetivo de um LLM é completar um padrão de texto da forma mais plausível
possível. Na maioria dos tutoriais e códigos de exemplo da internet (o dataset
de treino), a prioridade é didática e funcionalidade, não robustez. O resultado
é um viés estrutural: a IA prefere a conveniência de "fazer funcionar" à fricção
de "fazer seguro". Para o CTO e o engenheiro de segurança, isso inverte o jogo:
o código não é mais culpado até que se prove inocente — ele é **vulnerável por
padrão**.

## O Paradigma da Conveniência vs. Segurança

A geração de código por IA opera sob uma premissa perigosa: **o caminho de menor
resistência estatística**. Se 80% dos exemplos de conexão com banco de dados no
GitHub ignoram SSL para facilitar o setup local, o modelo sugerirá uma conexão
sem SSL.

### Por que a IA gera código inseguro?

1. **Viés de Treinamento**: O código de produção seguro é frequentemente
   privado. O código público (Stack Overflow, tutoriais, repositórios de hobby)
   é rico em "gambiarras" e configurações permissivas.
2. **Falta de Contexto Adversarial**: O modelo não simula um atacante. Ele não
   pergunta "o que acontece se eu enviar 1GB de dados neste campo?". Ele apenas
   preenche o campo.
3. **Alucinação de Dependências**: O modelo pode inventar bibliotecas que *soam*
   reais, criando vetores para ataques de cadeia de suprimentos.

______________________________________________________________________

## Vetores de Risco Críticos

### 1. Package Hallucination (Ataques de Cadeia de Suprimentos)

Este é o risco mais insidioso e exclusivo da era da IA. LLMs frequentemente
alucinam nomes de pacotes que não existem, mas seguem convenções de nomenclatura
lógicas (ex: `google-auth-v2` em vez de `google-auth`).

- **O Ataque**: Atacantes monitoram sugestões comuns de LLMs, registram esses
  nomes em repositórios públicos (NPM, PyPI) e injetam malware.
- **O Cenário**: Um desenvolvedor pede "um script para conectar na API X". A IA
  sugere `import api_x_connector`. O desenvolvedor roda
  `pip install api_x_connector`. O pacote existe (foi criado por um atacante
  ontem) e rouba as credenciais da AWS do desenvolvedor.

### 2. Defaults Inseguros (Insecure Defaults)

A IA tende a configurações que garantem que o código rode de primeira, removendo
barreiras de segurança.

- **Exemplos Clássicos**:
  - `verify=False` em requisições HTTP (ignora SSL).
  - `debug=True` em apps web (expõe stack traces e variáveis de ambiente).
  - `0.0.0.0` em binds de rede (expõe serviços para a internet pública).
  - Permissões de bucket S3 como `public-read`.

### 3. Falta de Sanitização e Validação

O modelo assume que o input é benigno.

- **SQL Injection**: Uso de f-strings ou concatenação direta em queries
  (`SELECT * FROM users WHERE id = {user_id}`).
- **XSS (Cross-Site Scripting)**: Renderização direta de input de usuário no DOM
  sem escaping.
- **Path Traversal**: Aceitar nomes de arquivos diretamente de inputs
  (`open(user_input_filename)`), permitindo acesso a `/etc/passwd`.

______________________________________________________________________

## Checklist Prático: Blindando o Processo

O que eu exigiria da minha equipe de engenharia amanhã:

1. **Lockfiles são Lei**: Nunca rodar `npm install` ou `pip install` em pacotes
   sugeridos por IA sem verificar se existem e quem é o mantenedor.
2. **Proibição de `curl | bash`**: Scripts de instalação gerados por IA devem
   ser lidos linha a linha antes da execução.
3. **Linting de Segurança no IDE**: Ferramentas como SonarLint ou Snyk devem
   rodar em tempo real. O desenvolvedor deve ver o erro *enquanto* a IA gera o
   código.
4. **Varredura de Dependências (SCA)**: Validar se as bibliotecas sugeridas são
   reais, mantidas e livres de CVEs conhecidos.
5. **Revisão de Configuração**: Buscar explicitamente por `debug=True`,
   `verify=False`, `allow_all`, e `*` em configurações de CORS/IAM.
6. **Isolamento de Contexto**: Código gerado roda primeiro em sandbox/container,
   nunca direto na máquina host com acesso a chaves SSH.
7. **Validação de Input Obrigatória**: Adotar bibliotecas de validação de schema
   (Zod, Pydantic) para *tudo* que entra no sistema.

______________________________________________________________________

## Armadilhas Comuns

- **A Ilusão da Autoridade**: O código gerado vem formatado, comentado e com
  nomes de variáveis elegantes. Isso cria uma falsa sensação de segurança.
  Estética não é qualidade.
- **O "Funciona na Minha Máquina"**: A IA gera código para o ambiente "médio" da
  internet, não para a sua infraestrutura corporativa com proxies, firewalls e
  políticas de IAM.
- **Copiar-Colar de Configurações**: Aceitar sugestões de arquivos YAML/JSON
  (Kubernetes, Terraform) sem entender cada linha. É comum a IA sugerir
  permissões administrativas completas (`admin` ou `root`) para resolver
  problemas de permissão.
- **Ignorar Versões**: A IA pode sugerir bibliotecas ou métodos depreciados há
  anos (ex: usar `request` em vez de `axios` ou `fetch` em Node.js antigo, ou
  métodos de criptografia obsoletos como MD5).

______________________________________________________________________

## Exemplo Mínimo: O Perigo do "Funciona"

**Cenário**: Desenvolvedor pede uma função Python para baixar e descompactar um
arquivo enviado pelo usuário.

**Código Gerado (Vulnerável):**

```python
import os
import tarfile

def extract_user_upload(filename):
    # PERIGO: Path Traversal e Nenhuma validação de tipo
    if filename.endswith(".tar.gz"):
        tar = tarfile.open(filename, "r:gz")
        # PERIGO: Extrai para o diretório atual sem verificar caminhos internos
        tar.extractall()
        tar.close()
```

**Decisão de Engenharia**: Rejeitar o código. A função permite "Zip Slip"
(sobrescrever arquivos do sistema via caminhos relativos no arquivo compactado)
e não valida se o arquivo é malicioso.

**Código Corrigido (Defensivo):**

```python
import tarfile
import os

def extract_user_upload(filepath, extract_path="/tmp/safe_dir"):
    # 1. Validação de input (caminho seguro)
    if not os.path.abspath(filepath).startswith("/tmp/uploads"):
        raise ValueError("Arquivo fora do diretório permitido")

    with tarfile.open(filepath, "r:gz") as tar:
        # 2. Prevenção de Zip Slip
        for member in tar.getmembers():
            member_path = os.path.join(extract_path, member.name)
            if not os.path.abspath(member_path).startswith(os.path.abspath(extract_path)):
                raise Exception("Tentativa de Path Traversal detectada")

        # 3. Extração segura (Python 3.12+ filter='data')
        tar.extractall(path=extract_path, filter='data')
```

**Trade-off**: O código seguro é 3x maior e requer Python atualizado. O código
da IA era mais simples, mas catastrófico.

______________________________________________________________________

## Resumo Executivo

- **IA prioriza funcionamento, não segurança**: O viés estatístico favorece
  configurações permissivas e inseguras encontradas em tutoriais.
- **Alucinação de Pacotes é real**: A IA inventa nomes de bibliotecas; atacantes
  registram esses nomes para distribuir malware.
- **Ataque na Cadeia de Suprimentos**: Validar a existência e reputação de cada
  dependência sugerida é mandatório.
- **Sanitização é ignorada**: Assuma que todo código gerado confia cegamente no
  input do usuário (SQLi, XSS, Command Injection).
- **Verificação > Geração**: O papel do engenheiro muda de "escrever código"
  para "auditar código e desenhar restrições".

______________________________________________________________________

## Próximos Passos

- Implementar **pre-commit hooks** que busquem padrões inseguros comuns
  (`verify=False`, chaves hardcoded).
- Configurar um **proxy de repositório** (como Artifactory ou Nexus) para
  bloquear instalação de pacotes não aprovados/novos demais.
- Treinar a equipe em **Threat Modeling** específico para componentes de IA.
- Adotar ferramentas de **SAST** que tenham regras específicas para código
  gerado (detectar alucinações comuns).

______________________________________________________________________

## Matriz de Avaliação

| Critério                 | Avaliação | Justificativa                                                                      |
| :----------------------- | :-------- | :--------------------------------------------------------------------------------- |
| **Risco de Negócio**     | Crítico   | Vulnerabilidades introduzidas agora podem permanecer latentes por anos.            |
| **Custo de Mitigação**   | Médio     | Requer mudança de processo e ferramentas, não necessariamente mais headcount.      |
| **Complexidade Técnica** | Baixa     | As falhas são conhecidas (OWASP Top 10); o desafio é a detecção em escala.         |
| **Necessidade Humana**   | Alta      | O julgamento de contexto ("isso deve ser público?") ainda é exclusivamente humano. |

## Referências

1. **OWASP Top 10 for LLM Applications**: Foco em LLM02: Insecure Output
   Handling.
2. **Barrett D., et al.** "Package Hallucination in Large Language Models".
   arXiv preprint, 2024.
3. **Pearce, H., et al.** "Asleep at the Keyboard? Assessing the Security of
   GitHub Copilot's Code Contributions". IEEE S&P, 2024.

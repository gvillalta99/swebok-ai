Com base na entrevista detalhada de Peter Steinberger para o canal "The Pragmatic Engineer", aqui está uma descrição minuciosa e completa de seu fluxo de trabalho, ferramentas, filosofias e práticas diárias.

### 1. A Filosofia Central: "Engenharia Agêntica" (Não "Vibe Coding")

Peter rejeita o termo "Vibe Coding" para descrever seu trabalho sério, preferindo o termo **"Engenharia Agêntica"**. Ele descreve seu papel atual não mais como um codificador tradicional, mas como um **"gerente de engenheiros imperfeitos, mas rápidos"** (os agentes de IA),.

- **A Mudança de Paradigma:** Ele admite abertamente: **"Eu envio código que não leio"** ("I ship code I don't read"),.
- **O Foco:** Ele deixou de se preocupar com a sintaxe, espaçamento ou estilo de código (o que ele chama de "bike shedding") para focar puramente em **arquitetura de sistemas**, design de produto e "como a coisa funciona",.
- **Produtividade:** Ele relata ter feito **600 commits em um único dia** usando esse método, mantendo um código de alta qualidade,.

### 2. O Ambiente de Trabalho e Multitarefa ("StarCraft Mode")

O fluxo de Peter é definido por **paralelismo massivo**.

- **Múltiplos Agentes:** Ele trabalha com **5 a 10 agentes rodando simultaneamente** em diferentes janelas de terminal,.
- **A Metáfora do Jogo:** Ele compara seu trabalho a jogar **StarCraft** (gerenciar a base principal enquanto cuida das expansões) ou gerenciar uma **cozinha industrial**. Enquanto um agente está "cozinhando" (processando uma tarefa longa), ele muda o foco para outro agente/janela.
- **Fluxo Contínuo:** Ele pula de uma tarefa para outra. Ele inicia uma tarefa que sabe que levará 40 minutos com um agente, e enquanto isso, resolve tarefas menores de 5 ou 20 minutos com outros.

### 3. Ferramentas e Modelos Preferidos

Peter tem preferências muito específicas sobre quais modelos usar para quais tarefas:

- **OpenAI Codex (GPT-5.2/o1):** É o seu favorito para **tarefas complexas de arquitetura**. Ele prefere o Codex porque o modelo "tira um tempo" (às vezes fica em silêncio por 10 minutos apenas lendo arquivos) para entender a base de código inteira antes de gerar uma solução. Ele diz que o Codex integra ("tece") melhor o código novo na arquitetura existente.
- **Claude Code (Anthropic):** Ele usa diariamente para tarefas gerais, mas critica o fato de o Claude ser "rápido demais no gatilho" (trigger hungry). O Claude tende a ler apenas alguns arquivos e tentar gerar a solução imediatamente, o que muitas vezes resulta em erros em sistemas complexos,.
- **CLI (Interface de Linha de Comando):** Ele constrói tudo em torno do terminal. Ele não gosta de interfaces gráficas para desenvolvimento.

### 4. O Processo de Desenvolvimento: "Conversa e Construção"

Peter não apenas joga um prompt e espera o código. É um processo interativo:

1. **A Conversa Arquitetural:** Antes de escrever qualquer código, ele discute a arquitetura com o agente. Ele pergunta: _"Quais opções temos para essa estrutura?", "Você considerou essa funcionalidade?", "Vamos olhar este arquivo e aquele arquivo"_,.
2. **O Comando de Construção:** O agente só começa a gerar código quando Peter dá o comando explícito: **"Build this"** (Construa isso).
3. **Referência Cruzada:** Um "hack secreto" que ele usa é dizer ao agente: _"Olhe na pasta X porque eu resolvi um problema similar lá"_. Ele usa seu próprio código anterior como exemplo para o agente aprender o estilo e a lógica.

### 5. O Segredo Técnico: "Closing the Loop" (Fechar o Ciclo)

Para confiar em código que não lê, Peter exige que o sistema possa se auto-verificar.

- **Testes Automatizados:** O agente escreve o código e os testes. Peter não escreve testes manualmente,.
- **CLIs para Tudo:** Mesmo quando está construindo um aplicativo nativo para Mac (com Swift/UI), ele obriga o agente a criar uma **interface de linha de comando (CLI)** que possa executar as mesmas funções do app. Isso permite que o agente execute, teste e depure o código rapidamente sem precisar abrir o simulador ou clicar em botões,.
- **Auto-Depuração:** Se ocorrer um erro, o agente lê a saída do erro e tenta corrigir sozinho. Peter cita um exemplo onde o Codex "cozinhou" por uma hora, testando todas as suas chaves de API e corrigindo condições de corrida (race conditions) sozinho, sem intervenção humana.
- **Full Gate (Portão Completo):** Ele tem um comando chamado "full gate" que roda localmente o _linting_, _build_ e _testes_. Se passar no "full gate" local, ele faz o merge. Ele raramente usa CI (Integração Contínua) remota porque é muito lento esperar 10 minutos; ele prefere a validação local imediata,.

### 6. A Morte do Code Review e o "Prompt Request"

A colaboração mudou radicalmente:

- **Fim do Code Review:** Ele não lê linha por linha dos Pull Requests (PRs). Ele acha que tentar manter o estilo de código manualmente ("bike shedding") é perda de tempo.
- **Prompt Request:** Ele pede aos contribuidores que enviem os **prompts** usados, não apenas o código. Ele analisa a intenção e o método de direção do agente.
- **Reescrita (Weaving):** Frequentemente, ele não faz merge de PRs de terceiros. Ele lê o PR para entender a ideia, e então usa seu próprio agente (Codex) para "tecer" (_weave_) aquela funcionalidade na base de código, garantindo que ela se adapte à arquitetura global que o agente já conhece. Ele usa o PR original apenas como referência para o agente,.
- **Human Merge Button:** Devido ao volume de contribuições e velocidade, ele se sente como um "botão de merge humano", validando a intenção e a passagem nos testes.

### 7. Detalhes Específicos do Projeto "ClaudeBot"

- **Auto-Atualização:** Ele programou o agente para que possa atualizar seu próprio código e configuração. O usuário pode pedir ao bot "atualize-se", e ele busca o código novo e se reconstrói.
- **Identidade e "Alma":** Ele criou um arquivo de `bootstrap` que instrui o modelo a "nascer", criar uma identidade, escolher um nome e definir seus valores em um arquivo `soul.md` (alma). Isso faz com que o bot pareça um amigo e não uma máquina.
- **Sem MCP no Contexto:** Ele evita colocar todo o esquema do MCP (Model Context Protocol) no contexto do modelo para não poluir. Ele usa ferramentas que convertem MCP em CLI para serem usadas sob demanda,.

### 8. Rotina Pessoal e Mentalidade

- **Vício e Horários:** Ele admite ser viciado nesse fluxo ("é como um caça-níqueis"). Ele acorda às 5h da manhã para codar e trabalha mais horas agora do que quando era CEO de sua empresa anterior,.
- **Descompressão:** Para manter a sanidade, ele vai à academia e **deixa o celular no armário**, tendo uma hora de desconexão total.
- **Aprendizado:** Ele encara isso como aprender um instrumento musical. No começo é frustrante e o código sai ruim, mas com a prática ("tocar piano"), você entende como "falar a língua" do modelo e prever seus erros,.

### Resumo do "Stack" Mental de Peter Steinberger:

1. **Arquiteto/Diretor:** Define o _o quê_ e o _design_.
2. **Codex (GPT):** O engenheiro sênior lento e pensativo para arquitetura.
3. **Claude:** O engenheiro rápido para tarefas menores/CLI.
4. **CLI/Testes:** O mecanismo de verificação que permite confiar sem ler.
5. **Humano:** O orquestrador que desbloqueia os agentes e aperta "merge".
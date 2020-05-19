## WTF is Deno?! 🦕

Uhul! Saiu oficialmente a primeira versão da nova runtime Deno 🦕

Com suporte nativo a JavaScript e TypeScript, utilizando a engine V8 e construído em Rust, sinceramente acho que Deno tem tudo pra decolar: 

- Construído com segurança por padrão

- Instalação extramente simples e entregue em um único, muito pequeno, arquivo executável

- Funcionalidades próprias de inspeção, formatação e uma especia de curadoria de módulos

- E uma imagem muito linda (que utilizei como capa dessa postagem, espero que isso não dê problemas):

  ![https://deno.land/v1_wide.jpg](/home/myreli/code/myrelib/blog/img/posts/2020-05-16-Hello-World-Deno/cover.jpg)

### DeNo <=> NoDe

Antes de começar a bisbilhotar o ecossistema Deno, vamos falar sobre Node. 

Node está cada vez mais famoso e com uma comunidade cada vez maior e mais solida, inclusive no ambiente corporativo. No entanto, Node tem *vários* problemas, todo mundo sabe disso. Para citar alguns: grande demora na adoção das novas versões de ECMAScript, sem suporte ao TypeScript, consideravelmente devagar, e um péssimo gerenciamento de dependencias. 

Não apenas isso, mas montar um ambiente de desenvolvimento no Node exige muita "garimpagem". Quase nenhum desenvolvedor Node sabe utilizar Node (estranho, mas verídico). A maioria sabe utilizar express e um template pré-pronto com Babel, Webpack, ESLint, Prettier e toda a parafernália necessária. E também é muito dificil para um desenvolvedor de outras linguagens 

Isso não torna o Node ruim e impossível de utilizar, é claro, e apesar de tudo é uma boa opção em vários casos. Mas é problemático por natureza e [inclusive o próprio criador](https://www.youtube.com/watch?v=M3BM9TB-8yA) já falou sobre isso.  Por isso ele próprio resolveu "começar de novo", com decisões mais maduras e com opções mais robustas (como a troca de C++ por Rust). Por isso ele criou Deno, que além de fazer um trocadilho com Node, traz todo o poder do JavaScript para fora do browser, mas com muita coisa muito bacana extra. 

### Referências

Se você não faz ideia do que eu estou falando aqui e nunca ouviu falar de Deno, vale muito a pena dar uma passadinha pelo site [Deno Land](https://deno.land/) bonitinho que apresenta tudo muito melhor do que eu poderia. 

E, principalmente, outra recomendação é ler o artigo muito legal que foi postado anunciando o lançamento oficial no [próprio site](https://deno.land/v1).

Nesse artigo aqui eu vou compartilhar os primeiros passinhos de bebê em Deno `1.0.0` que estou dando e principalmente apresentar o potencial. Ah, absolutamente tudo aqui foi extraído do site oficial e da [documentação da API](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts) (abre a documentação, o carregamento é maravitop) =D 

Agora chega de devaneios. Bora lá?

## Get Started

> **Nota:** para seguir estes passos é necessário que você esteja confortável com JavaScript para entender o que está acontecendo. Caso você não sinta que sabe o suficiente, pode ver essa excelente [Introdução ao JavaScript]() e aí voltar aqui :)  
>
> **Nota 2:** Deno tem apenas 2 aninhos de idade e sua primeiríssima versão foi lançada agora. Por isso ainda não é recomendado para produção. 
>
> **Nota 3:** eu utilizo uma distribuição Unix e o zsh, então podem existir divergências se você tentar reproduzir os mesmos passos na sua máquina. *Mas recomendo utilizar WSL se estiver no Windows e o zsh tem o incrível oh-my-zsh, então para que você gostaria de ficar no bash mesmo? =D*

### Instalação

Quando comentei que era instalação fácil e apenas um arquivo executável, não era brincadeira. Para instalar do site oficial basta um comando para executar o arquivo executável (ha-há): 

Se você utiliza Linux, macOS ou qualquer Unix com shell: 

```shell
# shell / unix
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Já se você utiliza Window com powershell (mas, sério, dá uma chance para WSL)

```powershell
# powershell / windows
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

E é isso. Mesmo. Um script super leve e pronto. Você deve ter tido um resultado semelhante a este no terminal: 

```shell

######################################################################## 100,0%##O=#  #         ######################################################################## 100,0%
Archive:  /home/myreli/.deno/bin/deno.zip
  inflating: deno                    
Deno was installed successfully to /home/myreli/.deno/bin/deno
Manually add the directory to your $HOME/.bash_profile (or similar)
  export DENO_INSTALL="/home/myreli/.deno"
  export PATH="$DENO_INSTALL/bin:$PATH"
Run '/home/myreli/.deno/bin/deno --help' to get started
```

É muito importante notar que o deno, por padrão, não faz nada que explicitamente solicitado, isso faz parte da sua natureza de segurança. Ou seja: nada de mexer no seu sistema sem você saber. Por isso, é necessário fazer uma configuração de variáveis de ambiente para ter  `deno` na pontinha dos dedos de forma prática: 

```shell
# salvar variáveis de ambiente no shell zsh
echo -n 'export DENO_INSTALL="/home/myreli/.deno"' >> ~/.zshrc 
echo -n 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.zshrc
# recarregar as configurações
source ~/.zshrc
```

Finalmente, vamos testar a instalação: 

```shell
deno --version
```

Isso mostra as versões de `deno`, da engine `V8` e do `TypeScript` instaladas. Para ver os comandos disponíveis e a documentação basta utilizar:

```shell
deno --help <comando>
```

E finalmente, se você deseja atualizar (futuramente), também é bastante simples e basta executar `deno upgrade`. 

AH! Se você utiliza VSCode, existe essa extensão maneira aqui: [VS Code Deno]( https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno)

Bom... Agora podemos começar a brincar de verdade. 

## Olá, Deno!

Para abrir um console interativo (para quem utiliza Python, é bem semelhante) basta digitar `deno` e o console vai abrir, dessa forma: 

![image-20200516185729914](/home/myreli/code/myrelib/blog/img/posts/2020-05-16-Hello-World-Deno/start-console.png)

E aí você pode utilizar todo o poder de JavaScript aí, como no Node, mas de forma muito mais rápida e com atualizações muito mais frequentes =D 

Para testar vamos começar com o famoso Hello World e ver o que acontece:

![image-20200518211536884](/home/myreli/code/myrelib/blog/img/posts/2020-05-16-Hello-World-Deno/hello-world-console.png)

Maravilha. Agora você tem todo o poder do JavaScript aí no seu terminal, pode experimentar. Para encerrar o console interativo, use a combinação de teclas `ctrl d` e vamos tentar executar um programa de exemplo do site oficial. Para isso, precisamos utilizar a interface de linha de comando `deno` com o comando `run` passando a URL do programa que você quer executar. 

Isso mesmo, a URL. As referências e importações funcionam com URLs em Deno, realmente trazendo o poder do browser e uma padronização já completamente enraizada. 

Experimenta aí: `deno run https://deno.land/std/examples/welcome.ts`

Top, né? Então, como disse a mensagem, bem vindo ao Deno :) 

## Primeiramente Segurança

"Segundamente" primeiramente. 

O que fez a web se popularizar? Links. A habilidade de ficar atravessando de uma informação para a outra através dos conhecidos hiperlinks foi o pontapé inicial para toda essa popularidade que temos hoje. Se você não sabia disso eu recomendo muito [este artigo aqui](https://www.dw.com/en/hyperlink-when-tim-berners-lee-invented-the-world-wide-web-not-the-internet/a-19448729). 

Então, vamos ver como podemos recuperar informações acessando "links", mas utilizando serviços de dados que não respondem HTML mas, sim, JSON. 

Experimente a URL https://www.potterapi.com/v1/sortingHat/ no seu navegador. Vai retornar a qual casa você pertence no universo de Harry Potter, em homenagem a pessoinha que me fez maratonar a saga inteira pela primeira vez em 21 anos de vida. 

Então, como faríamos para obter essa mesma informação em uma nossa aplicação rodando em Deno? Vamos utilizar o exemplo de `curl` oficial, dessa forma: 

```shell
deno run https://deno.land/std/examples/curl.ts https://www.potterapi.com/v1/sortingHat/
```

É, não funcionou. Mas por quê?! Segurança, é claro. 

Para que nosso dinossauro acesse a internet e se comunique com o mundo, precisamos permitir que ele faça isso. Experimente chamar passando a correta permissão `--allow-net=potterapi.com`:

![image-20200518232106094](/home/myreli/code/myrelib/blog/img/posts/2020-05-16-Hello-World-Deno/curl.png)

*Gryffindor!* (E eu juro que foi de primeira). 

Enfim, voltando ao foco, é necessário 
---
id: /2020/05/16/Hello-World-Deno

title: Hello World, Deno!
subtitle: Uhul! Saiu oficialmente a primeira versão da nova runtime Deno 🦕

date: 2020-05-16 02:02:25 Z

cover: "/img/posts/2020-05-16-Hello-World-Deno/cover.jpg"
---

## WTF is Deno?! 🦕

Uhul! Saiu oficialmente a primeira versão da nova runtime Deno 🦕

> Essa é a primeira parte de uma série de artigos sobre Deno:
  0. [Hello World, Deno! - Parte I](#) **você está aqui**
  1. [Hello World, Deno! - Iniciando uma aplicação - Parte II](#) *em breve*
  2. [Hello World, Deno! - Visitando APIs Web - Parte III](#) *em breve*
  3. [Hello World, Deno! - Visitando APIS Nativas - Parte IV](#) *em breve*
  4. [Hello World, Deno! - Considerações finais Parte V](#) *em breve*

Com suporte nativo a JavaScript e TypeScript, utilizando a engine V8 e construído em Rust, acho que Deno tem tudo pra decolar: 

- Construído com segurança por padrão;
- Instalação extramente simples e entregue em um único, muito pequeno, arquivo executável;
- Funcionalidades próprias de inspeção, formatação e uma espécie de curadoria de módulos;
- Módulos de arquivos super simples e rápidos, suporte a WebAssembly, customizável e bem estruturado;
- Sem reinventar a roda: se existem APIs bem estruturadas e com performance satisfatória na Web, Deno traz ela para a runtime;
- Erros exibidos de forma clara e com sugestões de ação;
- Focado em produtividade e simplicidade: olhem o código fonte é limpo e objetivo. É simples. É claro. 🦕;
- E uma imagem muito linda (que utilizei como capa dessa postagem, espero que isso não dê problemas)

![Cover](https://i.vgy.me/DNfGvY.jpg)

### DeNo <=> NoDe

Antes de começar a bisbilhotar o ecossistema Deno, vamos falar sobre Node. 

Node está cada vez mais famoso e com uma comunidade cada vez maior e mais sólida, inclusive no ambiente corporativo. No entanto, Node tem *vários* problemas, todo mundo sabe disso. 

Ok, talvez não seja todo mundo que sabe disso, então para citar alguns problemas:

- grande demora na adoção das novas versões de ECMAScript;
- sem suporte ao TypeScript;
- consideravelmente devagar;
- documentação extensa;
- implementação complexa;
- *péssimo* gerenciamento de dependências.

Não apenas isso, mas montar um ambiente de desenvolvimento no Node exige muita "garimpagem". Quase nenhum desenvolvedor Node sabe utilizar Node (estranho, mas verídico). A maioria sabe utilizar express e um template pré-pronto com Babel, Webpack, ESLint, Prettier e toda a parafernália necessária. 

E também é muito dificil para um desenvolvedor de outras linguagens se adaptar ao ecossistema, principalmente alguém mais júnior. 

![Deno bebendo lágrimas do Node.js](https://i.vgy.me/M6Qfb6.png)

Isso não torna o Node ruim e impossível de utilizar, é claro, e apesar de tudo é uma boa opção em vários casos - o maior problema dos projetos em Node são os programadores. 

Mas é problemático por natureza e [inclusive o próprio criador](https://www.youtube.com/watch?v=M3BM9TB-8yA) já falou sobre isso.  Por isso ele próprio resolveu "começar de novo", com decisões mais maduras e com opções mais robustas (como a troca de C++ por Rust). Por isso ele criou Deno, que além de fazer um trocadilho com Node, traz todo o poder do JavaScript para fora do browser, mas com muita coisa muito bacana extra. 

Enfim, eu não odeio Node.js, juro. Mas... eu também não gosto muito. Agora, com Deno, finalmente me senti confortável com JavaScript fora do browser. Pela primeira vez considero utilizar outra linguagem que não Python para meus scriptzinhos. 

E, no geral, eu não ficava tão animada com uma tecnologia nova assim em *meses*. Sério, vale a pena dar uma chance. 

### Referências

Se você não faz ideia do que eu estou falando aqui e nunca ouviu falar de Deno, vale muito a pena dar uma passadinha pelo site [Deno Land](https://deno.land/) (em inglês) bonitinho que apresenta tudo muito melhor do que eu jamais poderia. 

E, principalmente, outra recomendação é ler o artigo muito legal que foi postado anunciando o lançamento oficial no [próprio site](https://deno.land/v1).

Nessa série eu vou compartilhar os primeiros passinhos de bebê em Deno `1.0.0` que estou dando e principalmente apresentar o potencial. 

Ah, absolutamente tudo aqui foi extraído do site oficial e da [documentação da API](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts) (abre a documentação, o carregamento é maravitop) =D 

Agora chega de devaneios (he-he). Bora lá?

## Get Started

> **Nota:** para seguir estes passos é necessário que você esteja confortável com JavaScript para entender o que está acontecendo. Se quiser, pode tentar acompanhar, mas seria legal você saber algumas coisinhas antes. Caso você não sinta que sabe o suficiente pode ver essa excelente [(Re) Introdução ao JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/A_re-introduction_to_JavaScript) criada pela Mozilla e aí voltar aqui :)  
>
> **Nota 2:** Deno tem apenas 2 aninhos de idade e sua primeiríssima versão foi lançada agora - poucos dias antes de eu começar a escrever este artigo. Por isso ainda não é recomendado para produção. 
>
> **Nota 3:** eu utilizo uma distribuição Unix e o Zsh, então podem existir divergências se você tentar reproduzir os mesmos passos na sua máquina. Eu vou tentar descrever os passos de tudo, *mas recomendo utilizar WSL se estiver no Windows... e o zsh tem o incrível oh-my-zsh, então para que você gostaria de ficar no bash mesmo? =D*

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

É muito importante notar que o deno, por padrão, não faz nada que não tenha sido explicitamente solicitado, isso faz parte da sua natureza de segurança. Ou seja: nada de mexer no seu sistema sem você saber. 

Por isso, é necessário fazer uma configuração de variáveis de ambiente para ter  `deno` na pontinha dos dedos de forma prática: 

```shell
# salvar variáveis de ambiente no shell zsh
echo -n 'export DENO_INSTALL="/home/myreli/.deno"' >> ~/.zshenv 
echo -n 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.zshenv
# recarregar as configurações
source ~/.zshenv
```

*Se você utiliza Powershell: é algo assim `$env:NOME_DA_VAR = 'Valor'` 
Ou bash: basta trocar o caminho do arquivo de configuração `~/.bash_profile`*

Finalmente, vamos testar a instalação: 

```shell
deno --version
```

Isso mostra as versões de `deno`, da engine `V8` e do `TypeScript` instaladas. Para ver os comandos disponíveis e a documentação basta utilizar:

```shell
deno --help <comando>
```

E finalmente, se você deseja atualizar (futuramente), também é bastante simples e basta executar `deno upgrade`. Se você utiliza VSCode, existe essa extensão maneira aqui: [VS Code Deno](https://marketplace.visualstudio.com/items?itemName=axetroy.vscode-deno). Se você utiliza outro editor ou IDE, gostaria muito de ler suas razões para tal.


Bom... Agora podemos começar a brincar de verdade. 


## Olá, Deno!

Para abrir um console interativo (para quem utiliza Python, é bem semelhante) basta digitar `deno` e o console vai abrir, dessa forma: 

![](https://i.vgy.me/hxKmC1.png)

E aí você pode utilizar todo o poder de JavaScript aí, como no Node, mas de forma muito mais rápida e com atualizações muito mais frequentes =D 

Para testar vamos começar com o famoso Hello World e ver o que acontece. Como você faria no console do navegador, abra aspas e coloque sua string de Olá, mais ou menos assim: 

![](https://i.vgy.me/nXOMRL.png)

Maravilha. Agora você tem todo o poder do JavaScript aí no seu terminal, pode experimentar. 

Para encerrar o console interativo, use a combinação de teclas `ctrl d` e vamos tentar executar um programa de exemplo do site oficial. Para isso, precisamos utilizar a interface de linha de comando `deno` com o comando `run` passando a URL do programa que você quer executar. 

Isso mesmo, a URL. As referências e importações funcionam com URLs em Deno, realmente trazendo o poder do browser e uma padronização já completamente enraizada. 

Experimenta aí: `deno run https://deno.land/std/examples/welcome.ts`. Top, né? Então, como disse a mensagem, bem vindo ao Deno :) 

## Primeiramente Segurança

"Segundamente" primeiramente. 

O que fez a web se popularizar? Links. A habilidade de ficar atravessando de uma informação para a outra através dos conhecidos hiperlinks foi o pontapé inicial para toda essa popularidade que temos hoje. Se você não sabia disso eu recomendo muito [este artigo aqui](https://www.dw.com/en/hyperlink-when-tim-berners-lee-invented-the-world-wide-web-not-the-internet/a-19448729). 

Então, vamos ver como podemos recuperar informações acessando "links", mas utilizando serviços de dados que não respondem HTML mas, sim, JSON. 

Experimente a URL [https://www.potterapi.com/v1/sortingHat/](https://www.potterapi.com/v1/sortingHat/) no seu navegador. Vai retornar a qual casa você pertence no universo de Harry Potter, em homenagem a pessoinha que me fez maratonar a saga inteira pela primeira vez em 21 anos de vida. 

Então, como faríamos para obter essa mesma informação através de uma aplicação rodando em Deno? Vamos utilizar o exemplo de `curl` oficial, dessa forma: 

```shell
deno run https://deno.land/std/examples/curl.ts https://www.potterapi.com/v1/sortingHat/
```

É, não funcionou. Mas por quê?! Segurança, é claro. 

Para que nosso dinossauro acesse a internet e se comunique com o mundo, precisamos permitir que ele faça isso. Experimente chamar passando a correta permissão `--allow-net=www.potterapi.com`:

![](https://i.vgy.me/ABQBpU.png)

*Gryffindor!* (E eu juro que foi de primeira). 

É necessário permitir explicitamente todas as operações sensíveis, como acesso a rede, ao sistema de arquivos, etc... A única exceção é para as importações de módulos a partir da URL, a runtime permite o acesso quando é necessário dependências adicionais e fazer o cacheamento delas. 

## "Bem sênior, né meu?"

Se alguém já viu algum vídeo do [Erick Wendel](https://erickwendel.com.br/), ele menciona bastante essa frase haha. E pensei bastante nela enquanto navegava pelos fontes de Deno. 

Todas as implementações são simples e seguem o principio de responsabilidade única. Já tentou fazer uma requisição nativamente em Node? É beeem feio. E não entendo a necessidade, quando no JavaScript nos browsers já tem a `fetch`. Acho que Deno também pensa assim, pois esse é [justamente o exemplo no site](https://deno.land/manual/runtime). 

![](https://i.vgy.me/oggkFL.png)

Lembro que uma vez, quando ainda era estagiária, meu amigo falou "Eu vi o código do nosso líder... não tem nada demais". Na época ri, mas depois fiquei pensando: o que teria demais? O que seria o código de um sênior? Deveria ser super complexo e impossível de ler sendo um mero mortal? 

Muito pelo contrário, deve ser ainda mais legível e simples. (Mas isso fica para outro post, quem sabe.) E Deno faz justamente isso, combinando simplicidade com legibilidade, segurança e performance. 

Por isso existem as Web APIs (que seguem os mesmos contratos das APIs da Web) e as APIs próprias, que são as que não são sólidas ou não existem na Web, e estão disponíveis em `deno`. 

 Advinha uma coisa *bem sênior, né meu?* em Deno? Não existe `node_modules`! Eu detesto essa parte do Node então fiquei bem feliz hahaha. Deno faz um gerenciamento de cache otimizado, utilizando a configuração de cache do sistema operacional. Yep. Sem node_modules vagando por aí enchendo espaço. Sem mais `zip`s enormes porque alguém esqueceu de deixar de fora. [Velocidade e agilidade](https://www.youtube.com/watch?v=txLnaTojgyg). 

##  Desenvolvendo

Ok, conseguimos sentir as possibilidades, mas ainda não fizemos nada parecido com o comum. Como a gente inicia um projeto, cadê os arquivos e a estrutura que estamos acostumados? Vamos lá. 

Primeiro, crie um arquivo vazio TypeScript (ou JavaScript, se você prefere) chamado "hello" com a extensão desejada. 

No shell, é possível fazer isso utilizando o comando `touch hello.ts`. Agora, dentro do arquivo, escreva um oi para você mesmo:

```typescript
console.log('Hello 🦕')
```

Salve o arquivo e execute-o: `deno run hello.ts`. É isso. Sério mesmo :) 

![](https://i.vgy.me/AGvw8B.png)

E por hoje é isso! =D 

Inicialmente o artigo era bem maior, mas achei que ficaria mais bacana fragmentar ele em diversas partes para facilitar a leitura. Então gentilmente convido você a ficar atento para a próxima postagem, em que vamos colocar a mão na massa de verdade e construir uma aplicação com Deno. 

(spoiler) Isso é o que vamos construir no próximo artigo: 

![Escopo da aplicação que vamos construir no próximo artigo](https://i.vgy.me/yoRMRq.png)

Muitíssimo obrigada por ter chego até aqui! Espero que tenha curtido essa viagem e que tenha sido útil de alguma forma. De qualquer forma, comentários são muito bem vindos na seção de comentários no fim da página. 

Ah! Para receber uma notificação toda vez que um novo artigo é publicado (inclusive o próximo sobre Deno), deixe seu e-mail na caixa abaixo. 

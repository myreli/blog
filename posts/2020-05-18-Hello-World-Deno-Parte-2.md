---
id: /2020/05/18/Hello-World-Deno-Parte-2

title: Hello World, Deno! - Parte 2 - Iniciando uma aplicação
subtitle: Babel, Webpack, Prettier? Que nada. Deno! 🦕

date: 2020-05-18 20:32:38 Z

cover: "/img/posts/2020-05-16-Hello-World-Deno/cover.jpg"

tags: [tutorial, deno]
---

E aí! Tudo bem?

No último artigo eu escrevi um pouco sobre Deno 🦕 , a nova runtime JavaScript do mesmo criador de Node, que foi a primeira parte de uma série de artigos sobre este tema. Caso ainda não tenha lido, pode começar [aqui](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html).

Hoje vamos dar continuidade àquele artigo, colocando a mão na massa para dar os primeiros passos nessa runtime.

> Essa é a segunda parte de uma série de artigos sobre Deno:

1. [Hello World, Deno! - Parte I](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html)
2. [Hello World, Deno! - Iniciando uma aplicação - Parte II](#) **você está aqui**
3. [Hello World, Deno! - Visitando APIs Web - Parte III](#) _em breve_
4. [Hello World, Deno! - Visitando APIS Nativas - Parte IV](#) _em breve_
5. [Hello World, Deno! - Considerações finais Parte V](#) _em breve_

> **Disclaimer:** o código aqui tem objetivo puramente didático e foi feito em noites aleatórias, então não está com foco em boas práticas. Muito menos em sua melhor implementação. Pega leve =D

## Apresentando a proposta

A missão de hoje é iniciar a construção de uma aplicação Deno e preparar a estrutura para toda a implementação.

Recapitulando, vamos começar a construir essa aplicação aqui:

![](https://i.vgy.me/yoRMRq.png)

A pandemia está aí, então, todo mundo em quarentena e tal. Basicamente vamos ajudar a galera de Hogwarts tornando o sistema de seleção de casas um serviço online, assim eles não precisam se preocupar com ninguém doente por aí =D (#FiqueEmCasa).

Mas como a gente faz o sorteio se não somos o Chapéu Seletor? Por sorte uma galera bacana do _open-source_ já pensou nisso e disponibilizou uma interface de comunicação com o Chapéu Seletor através da internet (essa interface é conhecida como API), então vamos utilizar ela.

No artigo anterior já utilizamos e vamos fazer exatamente o que fizemos antes: acessar uma API na Web que sorteia a casa. Mas precisamos resolver o problema do Chapéu Seletor- ele simplesmente não confia que vamos endereçar corretamente, então vamos precisar armazenar todas as seleções em um arquivo para poder consultar futuramente (isso são os _logs_).

Dessa forma, nossa aplicação tem as seguintes etapas:

1. O Harry Potter acessa o nosso programa e informa o nome dele.
2. Através da internet consultamos a API
3. A API consulta o Chapéu Seletor e retorna para nós a casa sorteada
4. Salvamos em um arquivo a casa selecionada, a pessoa (neste caso, o Harry Potter) e o horário em que isso aconteceu
5. Retornamos para o Harry Potter a sua casa

Hoje nós vamos dar o "pontapé" da nossa aplicação, criando toda a base que vamos precisar e entender alguns conceitos, fazendo o seguinte:

- [ ] criar uma aplicação CLI em JavaScript/TypeScript
- [ ] receber o nome do estudante a ser sorteado
- [ ] utilizar um pouco do poder de JavaScript no back-end
- [ ] estruturar o que será feito nos próximos artigos

Ou seja, vamos desenvolver essa parte aqui

![](https://i.vgy.me/B5PLN4.png)

## Talk is cheap, show me the code!

Pois bem! Chega de conversa fiada e bora codar =D

> Se quiser acompanhar todos os passos comigo, exatamente como estou fazendo, basta:
>
> 1. seguir as instruções de instalação presentes no artigo anterior https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html
> 2. instalar o VSCode do site oficial https://code.visualstudio.com/Download
> 3. não tem passo três. é só isso aí mesmo =D
>
> Caso algo dê errado, fique a vontade de falar nos comentários.

Para começar, vamos criar uma pasta contendo nosso projeto e entrar nela:

```shell
# make a directory called hello-deno-harry-potter
mkdir hello-deno-harry-potter
# change directory to hello-deno-harry-potter
cd hello-deno-harry-potter
```

Vamos criar nosso arquivo principal, que será utiliado para começar tudo:

```shell
touch mod.ts
```

E, por fim, vamos abrir o VSCode e importar a pasta lá (File > Open) ou, simplesmente, aproveitar o terminal:

```shell
code .
```

No fim fica, mais ou menos, assim:

![](https://i.vgy.me/pWe0ry.png)

Como diz a página ali, aperte `ctrl`+ `'` para abrir um terminal dentro do VSCode. Clique no arquivo `mod.ts`.

Nele escreva um simples `console.log('tudo ok! =D')`, salve as modificações (`ctrl` + `s`) e no terminal execute `deno run mod.ts` para garantir que está tudo nos conformes:

![](https://i.vgy.me/w15fFp.png)

De forma bem simples, concluímos nosso primeiro item o/

- [x] criar uma aplicação CLI em JavaScript/TypeScript

Pois bem, a primeiríssima coisa que precisamos fazer de verdade é a comunicação do Harry Potter com o nosso programa, ou seja, queremos saber o nome dele.

### CLI: reconhecendo Harry Potter

Por exemplo, uma abordagem, pode ser receber o nome quando o programa é executado, desta forma: `deno run mod.ts "Harry Potter"`. Bora lá?

O global `Deno` disponibiliza `args`, que retorna para o nosso programa o array de argumentos passados para o script. Se fizermos um console log e uns testes, funciona assim:

![](https://i.vgy.me/NCVc8X.png)

Por questões de didática e simplicidade, no momento, vamos aceitar apenas um nome por vez em nosso programa. Então, vamos fazer assim:

```typescript
const student = Deno.args[0];
```

E é só isso. Assim já temos qual é o estudante. Para verificar qual é, basta `console.log(student)`.

Com isso, concluímos nosso segundo item:

- [x] receber o nome do estudante a ser sorteado

No entanto, nem tudo é o "caminho feliz". o que acontece se a gente executa sem passar o nome? Ou se a gente passa mais de um nome? Vamos ver.

![](https://i.vgy.me/OTKqDa.png)

1. Tudo certo. "Myreli" recebido e "Myreli" processado.
2. Ahn... Nada recebido e "undefined" processado.
3. Ahn... "Myreli" e "Harry" recebido e "Myreli" processado.

Dos três cenários, somente um dá certo. Nos outros ou o Chapéu Seletor vai ficar bravo por receber o nome errado ou o Harry vai ficar confuso por não ter sido selecionado.

Para corrigir isso, vamos implementar uma validação simples, para utilizar algumas coisas que já estamos acostumados do JS e TS:

```typescript
# salvamos todos os argumentos recebidos
const args = Deno.args

# verificamos que pelo menos um nome é passado (resolve o cenário 2)
if (!args.length)
    throw new Error('Ops, somos apenas uma interface de linha de comando, não podemos advinhar seu nome')

# verificamos que não foi passado mais de um nome (resolve o cenário 3)
if (args.length > 1)
    throw new Error('Ops, só conseguimos lidar com uma pessoa de cada vez')

# salvamos o nome em uma variável (mantém o cenário 1)
const student: String = args[0]

# começamos o processamento
console.info(`Olá, ${student}! Vamos começar?`)
```

Agora temos um resultado mais interessante, por exemplo, ao chamar sem passar nenhum nome:

![](https://i.vgy.me/oCzetU.png)

Sinta-se a vontade para validar coisas mais interessantes como, por exemplo, se é um nome válido e tipos específicos de erros :wink:

Com isso acabamos de

- [x] utilizar um pouco do poder de JavaScript no back-end

Pois bem, agora criamos a nossa CLI - interface de linha de comando (Sim, isso também é uma "espécie" de API =D, nesse caso, conhecida como CLI). O que mais tínhamos para hoje? Estruturar o programa para os próximos passos.

### Estruturando a aplicação

Por enquanto temos tudo em um único arquivo de forma linear, que significa que quando adicionarmos as outras funcionalidades do nosso programa tudo vai ficar uma bagunça haha.

Para evitar que isso ocorra, vamos pensar na estrutura final que desejamos para a nossa aplicação começando por separar as responsabilidades:

1. Identificar o estudante (Harry Potter)
2. Pedir a casa ao Chapéu Seletor
3. Salvar as informações em um arquivo de logs
4. Exibir o resultado para o usuário

Existem várias formas de fazer isso, podemos separar em funções, em arquivos ou até em módulos. (brincadeira, não apliquem padrões de projetos de grande escopo em pequenos projetos). Podemos começar dessa forma:

```typescript
# 1. identifica o estudante passado como argumento
identifyStudent(Deno.args)
# 2. solicita a API que pergunte ao Chapéu Seletor qual a casa daquele estudante
identifyHouse(student)
# 3. armazena em um arquivo a decisão do Chapéu Seletor
saveSortingHatDecision(student, house)
# 4. exibe ao usuário o resultado
console.info(house)
```

E com isso:

- [x] estruturar o que será feito nos próximos artigos

O código que desenvolvemos hoje está disponível no [Github](https://github.com/myreli/hello-deno-harry-potter/tree/first-part).

Deno preza por ser _developer friendly_ e eu espero que esse primeiro artigo tenha começado a mostrar que um excelente trabalho foi feito para chegar nisso.

Utilizamos TypeScript e iniciamos um projeto em segundos. Isso é sensacional.

Nos próximos artigos vamos ver tópicos como testes, documentação, formatação, e outros. E tudo isso também está nativamente em Deno.

Sem mais ficar horas pelo StackOverflow tentando entender como juntar tudo e fazer funcionar em Node :)

Sem mais `package.json` kilométrico. Tudo simples e objetivo.

## Próximos passos

No próximo artigo vamos começar a criar a nova estrutura comentada no fim da sessão anterior. E, finalmente, vamos iniciar o contato com as APIs da Web - sim, as do Browser. 🦕

Vamos construir a parte de comunicação com a API do Chapéu Seletor, utilizando a Web API `fetch` e a API _open source_ do Harry Potter.

Novamente, muitíssimo obrigada por chegar até aqui, espero que tenha sido bacana. De qualquer forma, diga o que achou na área de comentários aí embaixo :)

Se desejar receber um e-mail quando o próximo artigo for publicado basta inserir seu e-mail na "newsletter".

Até mais!

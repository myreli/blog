---
id: /2020/06/29/Hello-World-Deno-Parte-3

title: Hello World, Deno! - Parte 3 - Visitando APIs Web
summary: O poder do JavaScript do browser no Back-End de verdade - APIs da Web em Deno 🦕

date: 2020-06-29 09:23:21 Z

cover: "/img/posts/2020-05-16-Hello-World-Deno/cover.jpg"

tags: [tutorial, deno]
---

Dale! Como vai?

No artigo anterior falamos sobre várias coisas em busca de um único objetivo: preparar o terreno para o nosso aplicativo e entender um pouco da experiência de usuário fornecida por Deno. Caso não faça ideia do que estou falando, pode começar a ler [aqui](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html).

> Demorei, mas voltei. :)
>
> Peço desculpas pela demora eterna hehe. Caso tenha curiosidade de saber o porquê de tanta demora, estou considerando abrir meu coração sobre aqui, mas enquanto isso [acesse todos esses links](https://vidasnegrasimportam.carrd.co/). Caso não tome coragem para publicar quero dizer aos meus amigos, conhecidos e desconhecidos negros: Eu sinto muito. Vidas negras importam.
>
> Além disso, nesse último final de semana saiu a terceira e última temporada de Dark.

Hoje, vamos evoluir nossa aplicação comunicando de verdade com o Chapéu Seletor.

> Essa é a terceira parte de uma série de artigos sobre Deno:

1. [Hello World, Deno! - Parte I](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html) _disponível_
2. [Hello World, Deno! - Iniciando uma aplicação - Parte II](https://myreli.dev/blog/2020/05/18/Hello-World-Deno-Parte-2.html) _disponível_
3. [Hello World, Deno! - Visitando APIs Web - Parte III](#) **você está aqui**
4. [Hello World, Deno! - Visitando APIS Nativas - Parte IV](#) _em breve_
5. [Hello World, Deno! - Considerações finais Parte V](#) _em breve_

Lembra a introdução sobre Deno em que fizemos uma chamada no terminal para o chapéu seletor e ele dizia qual era a casa?

Pois então, vamos trazer aquela mágica para dentro do nosso código.

### Comunicação: acessando e consumindo APIs com Deno

Precisamos comunicar com o Chapéu Seletor e isso ocorre através de uma _interface_, como mencionado anteriormente. Essa interface, conhecida como API, é uma interface HTTP disponível através da URL: [https://www.potterapi.com/v1/sortingHat/](https://www.potterapi.com/v1/sortingHat/).

O que precisamos fazer é: acessar essa URL através do nosso programa para relacionar o sorteio ao aluno sorteado.

Anteriormente, através de um terminal, a comunicação foi feita dessa forma:

```shell
deno run https://deno.land/std/examples/curl.ts https://www.potterapi.com/v1/sortingHat/ --allow-net=www.potterapi.com
```

Desmembrando cada parte desse comando, temos o seguinte:

| comando                                    | descrição                                                                                             |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `deno run`                                 | utilizamos o global Deno para invocar a sua função `run`, que serve para executar um script Deno      |
| `https://deno.land/std/examples/curl.ts`   | definimos que o programa a ser executado é o `curl.ts`, disponível em https://deno.land/std/examples/ |
| `https://www.potterapi.com/v1/sortingHat/` | passamos como parâmetro para este programa a API de Harry Potter no endpoint do Chapéu Seletor        |
| `--allow-net=www.potterapi.com`            | permitimos a comunicação com a internet no endpoint especificado                                      |

Ou seja, utilizamos um programa chamado `curl` do Deno para acessar uma página e exibir o resultado dela. Esse programa visita a página de Harry Potter, processa o conteúdo dela e retorna para quem chamou, mas podemos fazer isso de forma direta.

Poderíamos importar este programa dentro do nosso e utilizar? Sim! Mas, neste caso, é mais rápido (e fácil) chamarmos através de uma Web API em nossa aplicação do que através de um outro programa e recuperar o conteúdo direto da fonte.

Em síntese: nossa CLI precisa acessar a internet no endereço da API, a API falará com o chapéu seletor e retornará para a casa sorteada.

### JavaScript, Back-End, Deno... Web APIs?

Deno tem o compromisso de não reinventar a roda (quando a roda funciona bem :stuck_out_tongue_winking_eye:) e por isso as APIs da Web que já são sólidas e atendem todas as necessidades são trazidas do Browser através de Deno.

Um exemplo dessas APIs é o [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) que em sua forma mais simples funciona assim:

```typescript
// collect raw response from URL
const rawResponse = await fetch("URL");
// proccess response as structured data
const body = await rawResponse.text(); // OR .json()
```

Primeiro, existe a função `fetch()` que retorna uma [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) contendo métodos utilitários e a resposta pura da página. Depois, utilizamos um desses métodos para processar a resposta no formato que desejamos, por exemplo, texto ou JSON.

Agora vamos testar nossa própria implementação para chamar a API de Harry Potter e mostrar a casa sorteada.

Para isso, utilizamos essa API e basta substituir o texto `'URL'` pela URL que queremos chamar, neste caso, a do Chapéu Seletor. Em um arquivo `.ts` qualquer, vai ser algo, mais ou menos, assim:

![](https://i.vgy.me/3zlGMm.png)

Para executar, lembre-se de permitir corretamente o acesso a rede.

Existem váárias outras APIs da Web implementadas, inclusive **[addEventListener](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#addEventListener)!!!** Todas as funções estão disponíveis na [documentação oficial](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#fetch).

### But first...

~~[Let me take a selfie](https://www.youtube.com/watch?v=SuyG-lIkNow)~~ Vamos estruturar a aplicação =D

Até o momento temos as peças do nosso projeto de forma separadas então precisamos fazer um trabalho de _refatoração_ para preparar todas as etapas. E, então, ir preenchendo cada parte e formar o resultado final.

> No geral, eu gosto da prática de ir planejando a estrutura do código de forma macro antes de ir resolvendo cada problema de forma individual. Otimiza a solução de problemas grandes, favorece o sistema de recompensas do cérebro e encaixa muito bem com TDD.

Do último artigo discutimos sobre qual seria a estrutura, mas não executamos ela de fato. E encerramos assim:

![](https://i.vgy.me/PolDPR.png)

Agora vamos fazer aplicar essa estrutura. Apesar de ser uma simples CLI é importante manter as coisas minimamente organizadas, principalmente para no artigo final quando dermos uma olhadinha na suite nativa de testes. :)

A primeira coisa que eu fiz foi mover a lógica anterior para uma função chamada `identifyStudent` e chamar essa função dentro do meu arquivo.

![](https://i.vgy.me/VhVN41.png)

Tudo funciona exatamente como antes, mas agora temos um código mais legível.

> **#code-tip:** execute `deno info mod.ts` para inspecionar todas as dependências do seu projeto e tenha de forma detalhada a origem de tudo:
>
> ```shell
> ➜  hello-deno-harry-potter (hello-web-apis) ✗ deno info mod.ts
> local: /home/myreli/code/deno/hello-deno-harry-potter/mod.ts
> type: TypeScript
> compiled: /home/myreli/.cache/deno/gen/file/home/myreli/code/deno/hello-deno-harry-potter/mod.ts.js
> map: /home/myreli/.cache/deno/gen/file/home/myreli/code/deno/hello-deno-harry-potter/mod.ts.js.map
> deps:
> file:///home/myreli/code/deno/hello-deno-harry-potter/mod.ts
>   ├── file:///home/myreli/code/deno/hello-deno-harry-potter/student.ts
>   ├── file:///home/myreli/code/deno/hello-deno-harry-potter/log.service.ts
>   └── file:///home/myreli/code/deno/hello-deno-harry-potter/sorting_hat.service.ts
> ```

Seguindo o mesmo procedimento para os outros dois que precisamos, vamos terminar com algo assim:

![](https://i.vgy.me/74mpmF.png)

Algumas coisas importantes:

- preparei toda a estrutura do que será nosso programa final, de forma que agora precisamos apenas preencher os espaços
- diferente do Node, Deno _sempre_ encerra o processo caso algum erro não tratado ocorra. então é importante sempre lembrar de lidar com eles. (o `try/catch` genérico ao redor de tudo é a forma como vamos lidar agora)
- não se preocupe em fazer tudo como eu fiz, as peças podem ser reunidas de diversas formas diferentes e essa não é a melhor :)

### Implementando a comunicação

Vamos implementar na função `identifyHouse` a chamada a API externa do Harry Potter? yo o/

Primeiro é necessário coletar a resposta da API:

```typescript
const response = await fetch("https://www.potterapi.com/v1/sortingHat/");
```

Depois transformar essa resposta em texto e salvar a casa:

```typescript
const house = await response.text();
```

E, finalmente, retornar a casa para que o processamento possa seguir em frente:

```typescript
return house;
```

Agora, retornando para o nosso terminal, vamos ver como ficou tudo no final. Lembre-se de utilizar a flag de permissão de internet dessa vez, já que estamos acessando a internet:

![](https://i.vgy.me/iMteDR.png)

> **#code-tip:** a qualquer momento você pode executar `deno fmt <arquivo>` para formatar seu arquivo com as indentações, espaçamentos e organização corretinhas :wink:

### Próximos passos

E é isso! Um artigo inteiro para três linhas de código :stuck_out_tongue_closed_eyes: mas espero que tenha valido a pena! Em comparação, caso você não conheça node.js, uma requisição de forma nativa seria feita dessa forma:

```javascript
const https = require("https");

https
  .get("https://www.potterapi.com/v1/sortingHat/", (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      console.info(data);
    });
  })
  .on("error", (error) => {
    console.error(
      `Um erro impediu que a seleção fosse concluída ${error.message}`
    );
  });
```

Bleh! Por isso que a request ficou tão famosa que as pessoas começaram a pensar que ela era "nativa". E aí todo mundo se surpreendeu quando o criador decidiu [encerrar o suporte](https://github.com/request/request/issues/3142). (Com razões com as quais concordo plenamente, por sinal)

No próximo artigo vamos implementar a última parte do nosso sistema para deixar o Chapéu Seletor, a OMS e os bruxos felizes: escrita no arquivo de log. ~~Mas, para deixar a Myreli feliz vamos ter um último artigo de considerações finais para outras curiosidades legais e úteis sobre Deno.~~

Todo o código até agora está disponível no [Github](https://github.com/myreli/hello-deno-harry-potter/tree/hello-web-apis).

Muito obrigada por ter lido até aqui! Espero que esteja sendo uma leitura e experiência prazerosa.

Até breve.

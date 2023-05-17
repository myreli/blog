---
id: /2020/08/23/Hello-World-Deno-Parte-4

title: Hello World, Deno! - Parte 4 - Visitando APIS Nativas
summary: Escrevendo em arquivos com JavaScript utilizando as APIs Nativas de Deno 🦕

date: 2020-08-23 03:11:21 Z

cover: "/img/posts/2020-05-16-Hello-World-Deno/cover.jpg"

tags: [tutorial, deno]
---

E aí, tudo joia?

Na [publicação anterior](https://myreli.dev/blog/2020/06/29/Hello-World-Deno-Parte-3.html) implementamos a comunicação com uma API externa de forma super rápida e prática. Agora, vamos fazer outra tarefa _muito_ comum no desenvolvimento: acessar o sistema de arquivos e escrever neles.

> Essa é a quarta parte de uma série de artigos sobre Deno:

1. [Hello World, Deno! - Parte I](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html){:target="\_blank"} _disponível_
2. [Hello World, Deno! - Iniciando uma aplicação - Parte II](https://myreli.dev/blog/2020/05/18/Hello-World-Deno-Parte-2.html){:target="\_blank"} _disponível_
3. [Hello World, Deno! - Visitando APIs Web - Parte III](https://myreli.dev/blog/2020/06/29/Hello-World-Deno-Parte-3.html){:target="\_blank"} _disponível_
4. [Hello World, Deno! - Visitando APIS Nativas - Parte IV](<[#](https://myreli.dev/blog/2020/08/23/Hello-World-Deno-Parte-4.html)>) **você está aqui**
5. [Hello World, Deno! - Considerações finais Parte V](https://myreli.dev/blog/2020/11/03/Hello-World-Deno-Parte-5.html){:target="\_blank"} _disponível_

## Por que escrever em arquivos?

A proposta da nossa aplicação é simples: recebe o nome de um aluno, conversa com o Chapéu Seletor e mostra a casa selecionada para esse aluno.

Mas, na vida real, nada é simples - internet cai, Voldemort querendo voltar, [J.K. Rowling destruindo tudo](https://www.forbes.com/sites/danidiplacido/2020/06/07/jk-rowling-is-destroying-her-legacy-one-tweet-at-a-time/#51c06fa412c7) rs... e é nosso trabalho, enquanto desenvolvedores, garantir que ainda que o mundo acabe, as aplicações permaneçam intactas. Ou, pelo menos, os registros delas.

A forma mais comum de fazer isso é registrando todos os eventos da aplicação para consulta futura, os chamados [logs](https://pt.wikipedia.org/wiki/Log_de_dados). E bons logs são essenciais para evitar ser o Tom em Tom e Jerry.

![Debugging Meme By Java Assignment Help On Pinterest](https://i.vgy.me/YMC3tc.png)

## Falar é fácil, cadê o código?

As APIs Nativas do Deno provem uma função [Deno.writeTextFile](https://doc.deno.land/builtin/stable#Deno.writeTextFile) que faz justamente isso.

Abra uma aba no terminal e entre no console interativo `deno` e experimente:

```shell
Deno.writeTextFile("./arquivo.txt", "tao facil?")
```

Uma `Promise` (no momento do retorno, em estado pendente) é retornada porque estamos utilizando a função assíncrona para escrita em arquivos. Pode fechar o console interativo `ctrl d`.

![](https://i.vgy.me/3398dz.png)

Se verificar o sistema de arquivos, vai ver que foi criado seu arquivo `arquivo.txt` no diretório atual. Bora abrir?

![](https://i.vgy.me/DQ5xyV.png)

E tá aí minha gente! Fácil e lindo! 🙂

## Criando o arquivo de logs

Na [última versão do nosso código](https://myreli.dev/blog/2020/06/29/Hello-World-Deno-Parte-3.html), dentro do arquivo `log.service.ts` nós deixamos pronta a estrutura de uma função:

```typescript
export default async (student: String, house: String) => {
  console.debug("registrando", student, house, Date.now());
};
```

O que precisamos agora é registrar esses dados, de fato, em um arquivo. Mas como?

Vamos simplesmente trazer aquele código que construímos no console interativo para a nossa função, adaptando para o nosso caso de uso:

```typescript
export default async (student: String, house: String) => {
  console.debug("registrando", student, house, Date.now());
  Deno.writeTextFile(
    "./app.log",
    `${new Date().toISOString()} | ${student} nomeado para ${house}`
  );
};
```

Na hora de executar, da mesma forma que precisamos permitir o endereço da API, precisamos permitir a escrita de arquivos com a flag `allow-write`.

![](https://i.vgy.me/LyCCT7.png)

Que delícia, né?

## Editando um arquivo

Agora, tem um detalhe muito importante. Se você executar o programa novamente, vai ver que uma coisa indesejada acontece.

Somente o último registro está sendo salvo:

![](https://i.vgy.me/a34Pjs.png)

Em um cenário de arquivo de _logs,_ queremos que todos os registros de todos os tempos sejam salvos. E isso é bem simples, basta passar a configuração `append: true` para o Deno, assim:

```typescript
export default async (student: String, house: String) => {
  console.debug("registrando", student, house, Date.now());
  return Deno.writeTextFile(
    "./app.log",
    `${new Date().toISOString()} | ${student} nomeado para ${house}\n`,
    { append: true }
  );
};
```

Eu também incluí uma quebra de linha no fim do registro, para que cada inserção fique separada em uma linha. Agora sim:

![](https://i.vgy.me/b37Vkl.png)

## Próximos Passos

Terminamos, galera! Todo o fluxo planejado foi desenvolvido, de forma muito rápida e em pouquíssimas linhas de código:

1. Qualquer aluno pode executar o programa enviando seu nome
2. Deno está acessando a internet e coletando a decisão do Chapéu Seletor
3. Por questões de segurança e auditoria de Hogwarts estamos salvando tudo em um arquivo de log

![](https://i.vgy.me/yoRMRq.png)

No próximo artigo, para encerrar a série, vou listar algumas coisas bacanas como a configuração de Deno no VSCode, como fazer testes unitários e outras funções muito maneiras para melhorar a nossa vida.

Todo o código que criamos hoje está disponível no [Github](https://github.com/myreli/hello-deno-harry-potter/tree/hello-native-apis).

De verdade, essa foi uma das melhores experiências de desenvolvimento que eu já tive de forma nativa em uma tecnologia. Deno conseguiu me convencer de que existem boas experiências para os devs que gostam de criar _scripts_ rápidos fora do [universo mágico de Python](https://medium.com/swlh/why-you-should-use-python-to-script-8f1d591cf2c1).

Muito obrigada! Espero que tenha sido uma leitura bacana.

Até a próxima!

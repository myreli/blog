---
id: /2020/11/03/Hello-World-Deno-Parte-5

title: Hello World, Deno! - Parte 5 - Considerações Finais
summary: Ambiente de desenvolvimento, formatação e linting embutidos, testes, distribuição de código e mais em Deno 🦕

date: 2020-11-03 00:00:00 Z

background: "/img/posts/2020-05-16-Hello-World-Deno/cover.jpg"

tags: [tutorial, deno]
---

E aí! Como vai?

Na [última publicação](https://myreli.dev/blog/2020/08/23/Hello-World-Deno-Parte-4.html) finalizamos nosso primeiro aplicativo em TypeScript utilizando Deno. Agora trago algumas curiosidades e recursos da _runtime_ que também são muito legais de incorporar.

> Caiu aqui de paraquedas? Essa é a última parte de uma série de 5 artigos sobre Deno:

1. [Hello World, Deno! - Parte I](https://myreli.dev/blog/2020/05/16/Hello-World-Deno.html) _disponível_
2. [Hello World, Deno! - Iniciando uma aplicação - Parte II](https://myreli.dev/blog/2020/05/18/Hello-World-Deno-Parte-2.html) _disponível_
3. [Hello World, Deno! - Visitando APIs Web - Parte III](https://myreli.dev/blog/2020/06/29/Hello-World-Deno-Parte-3.html) _disponível_
4. [Hello World, Deno! - Visitando APIS Nativas - Parte IV](https://myreli.dev/blog/2020/08/23/Hello-World-Deno-Parte-4.html) _disponível_
5. [Hello World, Deno! - Considerações finais Parte V](https://myreli.dev/blog/2020/11/03/Hello-World-Deno-Parte-5.html) **você está aqui**

**PS.:** Já que estamos em outros tópicos mais avançados da _runtime_ e sem relação com a implementação em si, dei uma pequena estruturada no projeto para facilitar tudo que vamos cobrir.

Mantive na raiz somente o arquivo `mod.ts` e passei para as pastas `/core` e `/services` os arquivos `student.ts e` e `*.service.ts` respectivamente.

## Ambiente de Desenvolvimento

### Como instalar Deno?

Já conversamos sobre como é fácil instalar Deno, por ser um único arquivo executável, leve e fácil. Existem _[diversas_ opções](https://deno.land/#installation) para instalar e a maioria dos gerenciadores de pacote já estão com a instalação através do identificador `deno` disponíveis.

**Windows:**

```bash
choco install deno
```

**Linux (shell):**

```bash
curl -fsSL [https://deno.land/x/install/install.sh](https://deno.land/x/install/install.sh) | sh
```

Mac:

```bash
brew install deno
```

É essencial que, após a instalação, o global seja incluído no `PATH` e aí você já terá o comando `deno` disponível.

### Editor: Visual Studio Code + Extensão Oficial de Deno! 😎

No [VSCode](https://www.software.com/src/why-you-should-switch-to-vs-code) existe agora uma extensão oficial que traz um suporte maneiro para o desenvolvimento com Deno - Intellisense, suporte as importações, e muito mais de forma automática. Instale ela a partir da fonte oficial:

[Deno - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

Depois basta criar um arquivo de configurações `touch .vscode/settings.json` dentro do seu projeto e ativar a extensão:

```json
// .vscode/settings.json
{
  "deno.enable": true
}
```

Eu também incluí algumas outras configurações para melhorar a experiência:

```json
// .vscode/settings.json
{
  "deno.enable": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "deno.unstable": true,
  "deno.lint": true
}
```

E agora temos o formatador do arquivo configurado para o próprio do Deno, além das dicas personalizadas para as configurações padrão de Deno:

![Deno possui padrões e guias de estilo próprios e a configuração correta garante que seu projeto possa seguir essa padronização.](https://i.vgy.me/TeGSke.png)

![Deixei, propositalmente, alguns erros anteriormente para podermos ver agora: como a utilização da String em vez de string.](https://i.vgy.me/1PqKrx.png)

---

## Testes

Sim! Deno provê uma função padrão para registrar e executar testes, com coleta de cobertura e tudo, além de um módulo de assertividade para a escrita de testes. Bora ver?

Primeiro crie um arquivo `mod.test.ts` e importe o módulo `assert` de [https://deno.land/std@0.70.0/testing/asserts.ts](https://deno.land/std@0.70.0/testing/asserts.ts). Com isso já podemos criar nosso primeiro teste:

```tsx
// mod.test.ts
import { assert } from "https://deno.land/std@0.70.0/testing/asserts.ts";

Deno.test("Assertions module is working", () => {
  assert(true);
});
```

Agora é só executar `deno test` e ta-dam:

![](https://i.vgy.me/Mbrkcl.png)

Agora chegou a hora de escrever testes (neste caso, unitários) para a aplicação. Várias partes que podem ser testadas, mas escolhi o serviço de identificação da casa porque cobre cenários comuns.

### Assertividade

Assertividade é o que vai definir se o nosso código está funcionando como esperado ou não.

No caso do serviço, nós queremos garantir que, quando a função que chama a API é chamada, ela funcione corretamente. Crie um arquivo `services/services.test.ts` com a estrutura inicial:

```tsx
import { assert } from "https://deno.land/std@0.70.0/testing/asserts.ts";
import identifyHouse from "./sorting_hat.service.ts";

Deno.test("something", async () => {
  assert(true);
});
```

Testes unitários procuram testar a menor parte possível que seja "testável" e costumam validar as assinaturas de entrada e de saída de uma função.

Para o serviço que implementamos temos a assinatura: `identifyHouse(string): string` ou seja, quando enviamos uma `string` esperamos receber outra `string`. E quando enviamos algo que não é uma `string`, esperamos que ocorra um erro.

Vamos começar com o caso mais simples que é chamar a função passando uma string e esperar que ela retorne um valor válido:

```tsx
Deno.test("that sorting hat service returns a truthy value", async () => {
  const house: string = await identifyHouse("teste");
  assert(house);
});
```

Para ver funcionando, executamos `deno test --allow-net`:

![](https://i.vgy.me/JhqN4q.png)

Existem várias funções de assertividade que podemos utilizar, variando com cada caso. Neste cenário, vamos utilizar a função `assertArrayContains` (ou `assertArrayIncludes` a partir da versão 0.70).

O que precisamos é garantir que a casa sorteada corresponda a alguma das casas possíveis possíveis de Harry Potter. A função de assertividade recebe dois parametros obrigatórios: valores possíveis (`actual`) e valores para comparação (`expected`).

Além disso, é possível explicitar a tipagem a ser utilizada na comparação. Abaixo está o código após as modificações:

```tsx
import { assertArrayContains } from "https://deno.land/std@0.70.0/testing/asserts.ts";
import identifyHouse from "./sorting_hat.service.ts";

const HOUSES = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

Deno.test("that sorting hat service returns a valid house", async () => {
  const house: string = await identifyHouse("teste");
  assertArrayContains<string>(HOUSES, [house]);
});
```

Para executar basta rodar `deno test --allow-net` novamente e ver os resultados.

### Stubs e módulos de terceiros

Cada execução dos nossos testes está indo no serviço (na internet) buscar as informações, ou seja, não estamos fazendo _testes unitários._ Nesse momento entram os [stubs](https://martinfowler.com/articles/mocksArentStubs.html) - que simulam as respostas de chamadas feitas durante os testes.

Existem diversas formas de implementar stubs, mas aqui, vamos aproveitar para introduzir outro conceito de Deno: módulos da comunidade.

Além dos [módulos nativos](https://deno.land/std) Deno provê um host de [módulos de terceiros](https://deno.land/x/), disponibilizados pela comunidade - semalhante ao que a [npm](https://www.npmjs.com/) faz.

Para criar nossos stubs vamos utilizar o módulo [https://deno.land/x/mock@v0.9.2](https://deno.land/x/mock@v0.9.2), utilizando o sub módulo `stub` e a interface `Stub`. Se adicionarmos essas duas linhas em nosso arquivo de teste, já vamos ver como o `stub` funciona:

```tsx
import { stub, Stub } from "https://deno.land/x/mock@v0.9.2/stub.ts";

const consoleStub: Stub<Console> = stub(console, "debug", () => {});
```

Nesse trecho, estamos simulando o comportamento do `Console`, mais especificamente do `console.debug`, substituindo seu comportamento original por... nada. Isso significa que, ao executar os testes, tudo que for passado por ele não vai ser executado como antes e, portanto, não será impresso no terminal.

Ou seja, `stub` recebe uma instancia, um método e - opcionalmente - o que deve ser retornado.

Queremos fazer a mesma coisa, mas para o momento em que acessamos a internet. Por isso, vamos simular o comportamento da função `fetch`, que pode ser acessada através do `globalThis`

```tsx
const fetchStub: Stub<typeof globalThis> = stub(globalThis, "fetch", () => {});
```

Se executarmos nossos testes agora, não é mais necessário passar a flag `allow-net`, já que não estamos mais acessando a internet.

No entanto, a informação que estamos passando não corresponde a realidade da API `fetch`, então o teste ainda vai falhar. Podemos acrescentar, em vez de um retorno vazio, o retorno real que a API tem:

```tsx
const fetchStub: Stub<typeof globalThis> = stub(globalThis, 'fetch', () => ({
	json: () => {}
})
```

Por último, basta que em vez de retornar vazio, a gente retorne sempre uma das casas, tal qual a API real faria:

```tsx
{
  json: () => HOUSES[Math.floor(Math.random() * HOUSES.length)];
}
```

Isso faz com que o serviço fake sempre retorne uma alguma das casas que temos disponíveis no array.

No fim, o nosso `services.test.ts` ficou assim:

```tsx
import { assertArrayContains } from "https://deno.land/std@0.70.0/testing/asserts.ts";
import { stub, Stub } from "https://deno.land/x/mock@v0.9.2/stub.ts";
import identifyHouse from "./sorting_hat.service.ts";

const HOUSES = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

const consoleStub: Stub<Console> = stub(console, "debug", () => {});
const fetchStub: Stub<typeof globalThis> = stub(globalThis, "fetch", () => ({
  json: () => HOUSES[Math.floor(Math.random() * HOUSES.length)],
}));

Deno.test("that sorting hat service returns a valid house", async () => {
  const house: string = await identifyHouse("teste");
  assertArrayContains<string>(HOUSES, [house]);

  consoleStub.restore();
  fetchStub.restore();
});
```

E pode ser executado com `deno test` 🙂

![](https://i.vgy.me/MM5WAE.png)

## Ferramentas

### Debug

De forma experimental, Deno já suporta o inspetor V8, ou seja, pode ser debugado através do VS Code, Chrome, WebStorm, etc...

Para utilizar, basta executar com a flag `--inspect` ou, no VSCode com a extensão, pressionar F5 e selecionar `Deno`.

### Dependências

Para descobrir todas as dependencias, locais ou não, de um módulo, basta executar `deno info file.ts` e então as informações de: caminho, tipo, local compilado e todas as dependencias utilizadas serão listadas.

### Formatação e Linting

Para formatar um arquivo seguindo o padrão, basta utilizar o comando `deno fmt file.ts` e todas as regras são aplicadas. Além disso, também existe um linter nativo, que pode ser utilizado com `deno lint file.ts`

### Distribuindo

É possível instalar e distribuir qualquer código Deno executável com as ferramentas de instalação e _bundling._

`deno bundle file.ts output.js` cria um _bundle_ de toda a aplicação em um único arquivo JavaScript ou envia para o `stdout`. O bundle é um módulo ES e pode ser importado como tal.

`deno install file.ts` instala um módulo e cria um executável _shell_ para esse script, com as permissões e os nomes desejados. Isso torna muito prático instalar scripts utilitários disponíveis em qualquer repositório público e torná-los disponíveis rapidamente 🙂

### Documentação

Outra ferramenta muito útil é a de geração automática de documentação, que utiliza toda a documentação [JSDoc](https://jsdoc.app/) disponível nos módulos exportados da aplicação. Para gerar, basta utilizar `deno doc` e tudo será exibido no `stdout`.

A parte mais legal disso é a disponibilização da flag `--json`, que exporta a documentação em JSON, em um formato que o [site oficial de documentação](https://github.com/denoland/doc_website) consegue entender para gerar de forma automática.

## Considerações finais

Todo o código que criamos hoje está disponível no [Github](https://github.com/myreli/hello-deno-harry-potter/tree/setup-and-testing).

Espero que isso tenha te dado um gostinho para continuar explorado Deno por aí... É realmente **muito** legal e resolve alguns problemas que o Node.js acaba tendo por natureza.

Também recomendo que você visite o [site de Deno](https://deno.land/) e explore tudo por lá, é muito bacana e é a melhor forma de conhecer a _runtime_ e entender o porquê ela surgiu.

É isso galera! Muitíssimo obrigada por chegar até aqui. Espero que você tenha curtido.

Até breve 🙂

---
id: /2020/11/27/Como-Particionar-Array-JavaScript

title: JavaScript - Como particionar um array?
subtitle: Como particionar (ou dividir) um array em JavaScript puro baseado em um filtro condicional

date: 2020-11-27 00:00:00 Z

background: "/img/posts/2020-11-27-Como-Particionar-Array-JavaScript/cover.jpg"
---

**TL;DR:** Você pode pular diretamente para a [função `partition`](#resultado) que teremos implementado ao fim do artigo, ela será utilizada dessa forma (ou através do `Array.prototype.partition`):

```javascript
const [filteredIn, filteredOut] = partition(array, condition)
```

## Motivação

Recentemente uma colega se deparou com o seguinte problema: ela tinha uma função que filtrava um array e utilizava esse resultado para continuar o processamento, mas agora surgiu um novo requisito em que ela também precisaria dos itens que não passavam na condição do filtro.

Ou seja, ela precisava dos resultados de `array.filter(x => x)` e `array.filter(x => !x)` divido em dois arrays para processamentos distintos, (semelhante ao que o [lodash#partition](https://lodash.com/docs/4.17.15#partition) faz).

Vou compartilhar aqui a solução que compartilhei com ela, sem utilizar mais de um loop ou ficar recriando o array — com JavaScript puro.

## Implementação

*Como o objetivo aqui é didático, vou optar por nomenclatura e alternativas mais fáceis de compreender, mas não necessariamente as mais performáticas.* 

A primeira coisa que precisamos é definir o que a nossa função precisa para particionar um array — a função condicional, além da lista propriamente dita.

```javascript
const partition = (array, condition) => {}
```

Precisamos iterar a lista e a cada iteração, precisamos aplicar o condicional e decidir se inserimos no array dos que passam no condicional e dos que não. E, após isso, precisamos retornar esses dois arrays resultantes.

```javascript
// para cada item do array
if (condition(item)) verdadeiros.push(item)
else falsos.push(item)
```

Nesse caso em listas maiores, o `reduce` apresenta a melhor relação de legibilidade e performance, então vamos optar por ele em vez de um `for-loop`. Além disso, vamos fazer uso do operador vírgula, que avalia o valor das expressões da esquerda para a direita e retorna o valor da última expressão.

```javascript
const partition = (array, condition) => {
    return array.reduce((result, item) => condition(item)
        ? (result[0].push(item), result)
        : (result[1].push(item), result), 
        [[], []]
    )
}
```

Agora já é possível particionar arrays! 🙂

No entanto, estamos fazendo uma repetição de código: tanto o `if` quanto o `else` possuem comportamentos muito similares, alterando somente a posição em que o item é inserido. 

Para melhorar essa parte podemos nos aproveitar da natureza dos *booleanos* e utilizar o próprio resultado do condicional para estabelecer onde o item precisa ser inserido: `+!condition(item)` vai resultar justamente em `0` ou `1` e podemos utilizar isso para o índice do array.

Refatorando, fica assim: 

```javascript
const partition = (array, condition) => {
    return array.reduce((result, item) => (result[+!condition(item)].push(item), result), [[], []])
}
```

## Utilizando

Para utilizar a função é bastante simples, passamos a lista a ser particionada e a condição que define a divisão. 

Suponha um array de testes com o status de aprovação ou reprovação em uma prova: 

```javascript
const testes = [
    { id: 1, status: "A" },
    { id: 2, status: "A" },
    { id: 3, status: "R" },
    { id: 4, status: "R" },
    { id: 5, status: "A" },
]
```

Como podemos dividir os alunos entre aprovados e reprovados? 

```javascript
const [aprovados, reprovados] = partition(testes, teste => teste.status === "A")
// 5 testes.length 
// 3 aprovados.length
// 2 reprovados.length
```

E pronto, resolvido. E pode ser passada qualquer condição, assim como ocorre com as outras funções utilitárias do `Array`.

## Resultado

No fim, nossa função utilitária para particionar um array fica assim: 

```javascript
/**
 * Particiona um array baseado em uma condição.
 * @param {Array} array - O array a ser particionado.
 * @param {function} condition - A condição a ser aplicada no array.
 * @return {Array} Array contendo outros arrays particionados pela condição.
 */
const partition = (array, condition) => array.reduce((result, item) => (result[+!condition(item)].push(item), result), [[], []])
```

## Encerramento

Uma alternativa elegante para alguns projetos pode ser estender o próprio `Array`, adicionando o método `partition` nele, modificando a API para manter a utilização exatamente como nas outras funções (`map`, `filter`, `reduce`, ...). 

Você também pode ler mais sobre o [Operador Vírgula](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Operador_Virgula), [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) e [`Array.prototype.filter`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filtro) na MDN. 

Obrigada por chegar até aqui! Espero que tenha sido uma leitura agradável e qualquer dúvida estou a disposição. 

A imagem da capa é cortesia do [Pankaj Patel](https://unsplash.com/@pankajpatel?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText) no [Unsplash](https://unsplash.com/s/photos/javascript?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText).

Até a próxima!

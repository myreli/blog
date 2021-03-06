---
title: Debug com DevTools no Android (Dispositivo ou Emulador)
key: Debug-com-DevTools-no-Android-Dispositivo-ou-Emulador
date: 2020-05-07 20:02:13 Z
layout: post
subtitle: Depuração Remota - como utilizar DevTools para debuggar comportamento no Android (Navegador e WebView)
background: "/img/posts/2020-05-07-Debug-com-DevTools-no-Android-Dispositivo-ou-Emulador/cover.jpg"
---

## Como (e o porquê de) utilizar as DevTools em uma aplicação rodando no Android?

Se tratando de web, as ferramentas para desenvolvedores são *muito* úteis. E muito poderosas. Elas permitem inspeção detalhada de código e estilo, debug poderoso e diversos recursos para monitoramento e testes.  No entanto, elas só estão disponíveis do *desktop* então como podemos aproveitar todo o potencial delas - e o nosso costume - para *debuggar* um site rodando em um *smartphone*?  Ou ainda a WebView de uma aplicação?

{% include figure.html name="intro-devtools.jpg" caption="Exemplo de página com as Ferramentas do Desenvolvedor no Firefox Developer Edition" %}

Recentemente me deparei com uma situação em que determinado comportamento de uma página Web ocorria somente em versões especificas de um aparelho Android utilizando WebView, ou seja, o *troubleshooting* no navegador comum em ambiente de desenvolvimento não era o bastante. No entanto, é possível utilizar as ferramentas de desenvolvedor (atalho `f12` no Firefox) em dispositivos remotos que estejam executando instâncias do navegador, mesmo que seja em WebView. 

> **WebView** é um componente presente nos smartphones baseado no projeto Chromium da Google (sim, o Chrome também vem daí), basicamente é um navegador compacto que permite que aplicativos executem páginas Web como se fossem aplicativos nativos. Também permite que esses aplicativos acessem mais recursos do que se estivessem rodando apenas em uma página do navegador. 

### Como vai funcionar?

Pretendo compartilhar aqui uma ferramenta útil no desenvolvimento de aplicativos web que utilizem o componente WebView dos dispositivos móveis para operarem como um aplicativo com a sensação de "nativo". 

Vou mostrar de forma breve como conectar o console do Chrome e Firefox em dispositivos e emuladores Android executando estes navegadores ou o WebView. Infelizmente não possuo nenhum iOS para validar se é possível, mas em teoria funcionaria da mesma forma se você ativar os mesmos recursos.

### Configurando Android

Siga estes passos somente se você quer inspecionar uma aplicação rodando em um dispositivo Android físico, caso esteja utilizando um emulador - como do Android Studio - pule para a etapa de DevTools no [Chrome](#utilizando-devtools-do-chrome) ou [Firefox](#utilizando-devtools-do-firefox).

#### Ativando o Modo Desenvolvedor

Acesse `Configurações => Sistema => Sobre o Dispositivo` e procure pela opção "Número da Versão" ou semelhante. Pressione no número da versão diversas vezes (entre 5 e 7). Isso ativa as ferramentas de desenvolvedor no dispositivo. 

#### Implementação do WebView

Acesse `Configurações => Sistema => Opções do Desenvolvedor` e procure pela opção "Implementação do WebView" normalmente existem duas opções "Android WebView" ou "Chrome WebView". A do Chrome costuma ser a padrão na maioria dos dispositivos, mas você pode selecionar aí a que está dando problema e deseja utilizar para o debug.

#### Depuração USB

Acesse  `Configurações => Sistema => Opções do Desenvolvedor` e procure pela opção "Depuração USB", deixando-a ativada. Essa opção é responsável por permitir que o DevTools Remoto acesse o dispositivo e possa se comunicar com o aplicativo para fazermos o debug.

Também sugiro dar uma explorada nessas opções, existem várias úteis para o desenvolvimento de aplicações mobile. 

### Utilizando DevTools do Chrome

Em um navegador Chrome, acesse o endereço [chrome://inspect](chrome://inspect){:target="_blank"} e marque as opções `Discover USB devices` e `Discover network targets` (a segunda somente se quiser utilizar por WiFi). 

{% include figure.html name="chrome-inspect-window.png" caption="Exemplo de página de inspeção do Navegador Chrome" %}

Caso queira *debuggar* um dispositivo físico: após todos os passos de ativação do Debug por USB no dispositivo, basta conectar o dispositivo ao computador através de uma USB. 

Caso queira *debuggar* um dispositivo emulado: inicie a aplicação no emulador de forma comum. Testei apenas com o Android Studio, mas a grande maioria utiliza a mesma *engine* de emulação, então deve operar de forma semelhante.

Agora, abra o navegador do Chrome (ou a aplicação em WebView), caso ainda não tenha o feito, e o inspetor vai detectar que existe uma aplicação para ser inspecionada e solicitará acesso: 

{% include figure.html name="chrome-inspect-auth.png" caption="Exemplo de autenticação na inspeção do Navegador Chrome" %}

No dispositivo móvel, permita a depuração USB (pressione OK) e veja que o inspetor mostra as páginas abertas e os WebViews (Chrome) em execução, selecione o que você quer inspecionar clicando em `inspect`. Precisei grifar partes do exemplo pois eram informações confidenciais, mas você verá os dados do seu aplicativo, bem como versões, endereços e títulos. 

{% include figure.html name="chrome-inspect-select.png" caption="Exemplo de seleção de dispositivo na inspeção do Navegador Chrome" %}

E agora você tem acesso a todas as ferramentas de desenvolvedor que teria se o aplicativo estivesse rodando em sua máquina, dessa forma: 

{% include figure.html name="chrome-inspect-devtools.png" caption="Exemplo de debug de dispositivo na inspeção do Navegador Chrome" %}

Todos os recursos estão disponíveis e o visualizador do dispositivo exibe em tempo real exatamente a mesma tela sendo navegada, então permite que todos os comportamentos sejam inspecionados de forma fluida, respeitando o comportamento nativo. 

### Utilizando DevTools do Firefox

Em um navegador Firefox, acesse o endereço [about:debugging](about:debugging){:target="_blank"} e clique em `Enable USB Devices`. Isso, claro, se você deseja fazer o debug via USB. Caso esteja utilizando um emulador ou quer conectar via rede, insira o IP ou endereço no campo `Host` na parte de `Network Location`. 

{% include figure.html name="firefox-debug-window.png" caption="Exemplo de página de inspeção do Navegador Firefox Developer Edition" %}

Conecte seu dispositivo pela porta USB ou inicie o dispositivo no emulador e pressione `Refresh Devices`. A depuração remota vai identificar seu dispositivo e informar que não existe nenhuma instância do Firefox em execução. Basta abrir uma aplicação Firefox (dos aplicativos oficiais na *PlayStore*, apenas não funcionou com o Focus pelos testes que fiz) e atualizar os dispositivos novamente. Conecte-se ao dispositivo desejado em `Connect` e você verá diversas opções de inspeção.

{% include figure.html name="firefox-debug-select.png" caption="Exemplo de seleção de dispositivo do Navegador Firefox Developer Edition" %}

Você pode inspecionar páginas web, extensões ou *service workers*. Selecione `Inspect` no que deseja inspecionar e as ferramentas do desenvolvedor ficarão disponíveis, como no caso abaixo que inspecionei uma aba web: 

{% include figure.html name="firefox-debug-inspect.png" caption="Exemplo de debug de dispositivo do Navegador Firefox Developer Edition" %}

*Nota: infelizmente, até o momento não consegui conectar as ferramentas do desenvolvedor do Firefox em uma WebView do Chrome, somente nas instâncias do Firefox mesmo. Caso eu descubra, volto aqui para contar =)*

> **Dica top:** na verdade não é nada muito inovador, mas é algo que muitas pessoas não se dão conta e que pode ser muito util. O webview nada mais é do que janela enxuta de navegador com acesso privilegiado a alguns recursos nativos fornecidos pelo aplicativo base. Ou seja o que define a página em execução é apenas um endereço web então durante a inspeção, no seu console do Chrome, é possível fazer qualquer injeção de código e alteração que você quiser. Isso é muito útil, por exemplo, se você possui um APK e quer testar diferentes versões de um WebView nele. Ou ainda, se você quer debuggar seu webview rodando em localhost dentro do apk no celular!

E é isso, muito obrigada por chegar até aqui, espero que tenha sido uma leitura útil e agradável. 

Até a próxima. 

As imagens do tutorial são capturas de tela próprias, e a capa do artigo é uma imagem belíssima do [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText){:target="_blank"} disponível no [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText){:target="_blank"}. 

Obrigada ao [@debugmaster](https://github.com/debugmaster){:target="_blank"} por me apresentar este recurso através desse [artigo](https://dev.to/dev0x0/using-google-chrome-console-on-any-mobile-device-9ec){:target="_blank"}. 
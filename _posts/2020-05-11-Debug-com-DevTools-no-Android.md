---
title: 2020 05 07 Debug Com Dev Tools No Android
date: 2020-05-11 13:29:15.464000000 Z
---

## Como (e o porquê de) utilizar as DevTools em uma aplicação rodando no Android?

Recentemente me deparei com uma situação em que determinado comportamento de uma página Web ocorria somente em versões especificas de um aparelho Android utilizando WebView, ou seja, o *troubleshooting* no navegador comum em ambiente de desenvolvimento não era o bastante. No entanto, é possível utilizar as ferramentas de desenvolvedor (atalho `f12` no Firefox) em dispositivos remotos que estejam executando instâncias do navegador, mesmo que seja em WebView. 

Pretendo compartilhar aqui uma ferramenta útil no desenvolvimento de aplicativos web que utilizem o componente WebView dos dispositivos móveis para operarem como um aplicativo com a sensação de "nativo". 

> **WebView** é um componente presente nos smartphones baseado no projeto Chromium da Google (sim, o Chrome também vem daí), basicamente é um navegador compacto que permite que aplicativos executem páginas Web como se fossem aplicativos nativos. Também permite que esses aplicativos acessem mais recursos do que se estivessem rodando apenas em uma página do navegador. 

Vou mostrar de forma breve como conectar o console do Chrome e Firefox em dispositivos e emuladores Android executando estes navegadores ou o WebView. Infelizmente não possuo nenhum iOS para validar se é possível, mas em teoria funcionaria da mesma forma se você ativar os mesmos recursos.

[TOC]

### Configurando Android

Siga estes passos somente se você quer inspecionar uma aplicação rodando em um dispositivo Android físico, caso esteja utilizando um emulador - como do Android Studio - pule para a etapa de DevTools no [Chrome](#Utilizando DevTools do Chrome) ou [Firefox](#Utilizando DevTools do Firefox).

#### Ativando o Modo Desenvolvedor

Acesse `Configurações => Sistema => Sobre o Dispositivo` e procure pela opção "Número da Versão" ou semelhante. Pressione no número da versão diversas vezes (entre 5 e 7). Isso ativa as ferramentas de desenvolvedor no dispositivo. 

#### Implementação do WebView

Acesse `Configurações => Sistema => Opções do Desenvolvedor` e procure pela opção "Implementação do WebView" normalmente existem duas opções "Android WebView" ou "Chrome WebView". A do Chrome costuma ser a padrão na maioria dos dispositivos, mas você pode selecionar aí a que está dando problema e deseja utilizar para o debug.

#### Depuração USB

Acesse  `Configurações => Sistema => Opções do Desenvolvedor` e procure pela opção "Depuração USB", deixando-a ativada. Essa opção é responsável por permitir que o DevTools Remoto acesse o dispositivo e possa se comunicar com o aplicativo para fazermos o debug.

Também sugiro dar uma explorada nessas opções, existem várias úteis para o desenvolvimento de aplicações mobile. 

### Utilizando DevTools do Chrome

Em um navegador Chrome, acesse o endereço [chrome://inspect](chrome://inspect) e marque as opções `Discover USB devices` e `Discover network targets` (a segunda somente se quiser utilizar por WiFi). 

![image-20200508152458266](./images/chrome-inspect-window.png)

Caso queira *debuggar* um dispositivo físico: após todos os passos de ativação do Debug por USB no dispositivo, basta conectar o dispositivo ao computador através de uma USB. 

Caso queira *debuggar* um dispositivo emulado: inicie a aplicação no emulador de forma comum. Testei apenas com o Android Studio, mas a grande maioria utiliza a mesma *engine* de emulação, então deve operar de forma semelhante.

Agora, abra o navegador do Chrome (ou a aplicação em WebView), caso ainda não tenha o feito, e o inspetor vai detectar que existe uma aplicação para ser inspecionada e solicitará acesso: 

![image-20200508154919766](.\images\chrome-inspect-auth.png)

No dispositivo móvel, permita a depuração USB (pressione OK) e veja que o inspetor mostra as páginas abertas e os WebViews (Chrome) em execução, selecione o que você quer inspecionar clicando em `inspect`. Precisei grifar partes do exemplo pois eram informações confidenciais, mas você verá os dados do seu aplicativo, bem como versões, endereços e títulos. 

![image-20200508155426083](.\images\chrome-inspect-select.png)

E agora você tem acesso a todas as ferramentas de desenvolvedor que teria se o aplicativo estivesse rodando em sua máquina, dessa forma: 

![image-20200508155941501](.\images\chrome-inspect-devtools.png)

Todos os recursos estão disponíveis e o visualizador do dispositivo exibe em tempo real exatamente a mesma tela sendo navegada, então permite que todos os comportamentos sejam inspecionados de forma fluida, respeitando o comportamento nativo. 

### Utilizando DevTools do Firefox

Em um navegador Firefox, acesse o endereço [about:debugging](about:debugging) e clique em `Enable USB Devices`. Isso, claro, se você deseja fazer o debug via USB. Caso esteja utilizando um emulador ou quer conectar via rede, insira o IP ou endereço no campo `Host` na parte de `Network Location`. 

![image-20200508160631564](.\images\firefox-debug-window.png)

Conecte seu dispositivo pela porta USB ou inicie o dispositivo no emulador e pressione `Refresh Devices`. A depuração remota vai identificar seu dispositivo e informar que não existe nenhuma instância do Firefox em execução. Basta abrir uma aplicação Firefox (dos aplicativos oficiais na *PlayStore*, apenas não funcionou com o Focus pelos testes que fiz) e atualizar os dispositivos novamente. Conecte-se ao dispositivo desejado em `Connect` e você verá diversas opções de inspeção.

![image-20200510152108042](./images/firefox-debug-select.png)

Você pode inspecionar páginas web, extensões ou *service workers*. Selecione `Inspect` no que deseja inspecionar e as ferramentas do desenvolvedor ficarão disponíveis, como no caso abaixo que inspecionei uma aba web: 

![image-20200510152806458](/home/myreli/Dropbox/writing/articles/2020-05-07-Debug-com-DevTools-no-Android/images/firefox-debug-inspect.png)



*Nota: infelizmente, até o momento não consegui conectar as ferramentas do desenvolvedor do Firefox em uma WebView do Chrome, somente nas instâncias do Firefox mesmo. Caso eu descubra, volto aqui para contar =)*

E é isso, muito obrigada por chegar até aqui, espero que tenha sido uma leitura útil e agradável.

Até a próxima. 

As imagens do tutorial são capturas de tela próprias, e a capa do artigo é uma imagem belíssima do [Kevin Ku](https://unsplash.com/@ikukevk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) disponível no [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText). 

Obrigada ao [@debugmaster](https://github.com/debugmaster) por me apresentar este recurso através desse [artigo](https://dev.to/dev0x0/using-google-chrome-console-on-any-mobile-device-9ec). 
---
date: 2023-02-24
title: Docker ≠ Docker Desktop
summary: Registrando como utilizo Docker sem Docker Desktop e porque eu acho melhor.
---

## TL;DR

- Docker Desktop é só uma GUI e um *wraper* na instalação dos componentes necessários
- É possível instalar esses componentes separadamente (Linux host, docker engine e docker CLI)
- O *host* e a *engine* existem somente para Linux. Então fora do Linux é necessário uma VM Linux com boa e rápida interação com o host, principalmente em rede e volume
- Pacotes:
- Ubuntu: `(apt install) docker-ce docker-ce-cli containerd.io` Windows: `(WSL2 apt install) docker-ce docker-ce-cli containerd.io`Mac: `(brew install) colima docker`
- Se você tem que pagar, mas não quer/consegue e quer uma GUI, experimente o [Rancher Desktop](https://rancherdesktop.io/)



***

Desde que o Docker anunciou que o Docker Desktop seria pago para empresas com mais de 250 colaboradores ou receita superior a 10MM as pessoas começaram a surtar (na bolha dev do twitter) e até hoje, meses depois, continua acontecendo.



Nos times que participo também rolou bastante confusão e a maior parte é devido ao mal entendimento de o que é o docker e como ele funciona. O Docker Desktop nada mais é do que uma interface grafica para interagir com o Docker CLI e um embrulho de todos os componentes.



Antes mesmo disso eu já não usava a GUI ~~(evito ter instancias de chrome que não preciso, mas isso é pra outro momento)~~, e a maioria das pessoas também não precisa.



O que precisamos de verdade é:

- `docker-ce` **Docker Engine** (daemon)
- `docker-ce-cli` **Docker CLI**
- Além disso, a **engine** utiliza uma **runtime** para os containers por trás, originalmente a `containerd.io` e agora a **Docker Runtime** que é baseada  nela



Todos esses componentes (Engine + Runtime e CLI) vem instalados junto com o Docker Desktop, incluindo um emulador para criar a máquina virtual Linux. Mas, fora isso, o Docker Desktop é só uma GUI para esse recursos. E ela vem beeem inchada, consumindo muito mais da máquina do que necessário para o que entrega.



Aliás, no Linux o Docker Desktop nem existia foi lançado recentemente ~~e eu não acho que deveria, acho desperdício uma VM do mesmo sistema host! Mas existem [motivos válidos](https://docs.docker.com/desktop/faqs/linuxfaqs/#why-does-docker-desktop-for-linux-run-a-vm)~~.



## 🐧 Linux (Ubuntu)

Como Linux é onde o Docker roda nativamente, podemos simplesmente instalar os três pacotes nativos: **Docker Engine** (`docker-ce`), **Docker CLI** (`docker-ce-cli`) e a **Runtime** (`containerd.io`).



Pré requisitos:

```javascript
$ sudo apt update
$ sudo apt install ca-certificates curl gnupg lsb-release
```



Registra a chave e adiciona o pacote:

```javascript
$ sudo mkdir -p /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg

$ echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```



Finalmente, instala os três pacotes necessários:

```javascript
$ sudo apt install docker-ce docker-ce-cli containerd.io
```



Ah, e se quiser adicionar o Docker Compose:

```javascript
$ sudo apt install docker-compose-plugin
```



Agora basta se adicionar no grupo `docker`:

```javascript
$ sudo groupadd docker
$ sudo usermod -aG docker $USER
```



E *voilà*: `docker run hello-world`



## 🍎 MacOS

Já no MacOS não é possível rodar a *engine* ou a *runtime* nativamente, mas sim através de uma máquina virtual. Então precisamos configurar uma máquina virutal linux para rodar essas peças, utilizando o CLI nativo.



As opções mais performáticas e transparentes que conheço é *Lima*, tornada ainda mais simples através do *Colima*.



> **Colima** means Containers in Lima.
>
> Since **Lima** is aka Linux on Mac. By transitivity, Colima can also mean **Containers on Linux on Mac.**



Instala o Docker CLI:

```javascript
$ brew install docker
```



Instala o Colima, que vai lidar com a *runtime* e *engine*, abstraindo completamente a VM:

```javascript
$ brew install colima
```



Inicia o Colima, com a runtime default do Docker (ou com a `--runtime containerd`):

```javascript
$ colima start
```



E *voilà*: `docker run hello-world`



**Disclaimer**:**** apenas recentemente comecei a usar MacOS, então esse setup é embrionário. Nos três meses de utilização até agora não tive *nenhum* problema ainda.



## 🪟 Windows

Para o Windows, a mesma coisa do MacOS vale: basta rodar a *runtime* e a *engine* através de uma máquina virtual e interagir através do CLI nativo.



Porém, como o Windows tem suas peculiaridades, uma opção melhor ainda é simplesmente utilizar **tudo** dentro de uma VM, inclusive o CLI: aí entra a famosa WSL.



Embora seja um VM ela tem um nível de integração com o sistema operacional base (host) muito superior.



Então inicie uma instância de Ubuntu (WSL) e execute exatamente os mesmos passos executados para instalar no Linux. Vai funcionar de forma transparente e é uma das formas mais eficientes de ter um ambiente de desenvolvimento no Windows.



Eu já não utilizo mais Windows mas, quando preciso, tenho uma boa experiência mantendo todo meu ambiente na WSL e conectando a ele pelo VSCode com a extensão de desenvolvimento remoto.



Depois de executar os passos de instalação do Ubuntu, inicie a distribuição WSL,



E *voilà*: `docker run hello-world`



## Mas vale a pena ou é melhor?

**Depende** do seu caso de uso.



Eu acho melhor porque não uso a interface gráfica e instalar somente a engine, runtime e o CLI (e VM) são muito mais eficientes do que o pacotão Docker Desktop. Sendo assim, mesmo para uso pessoal, eu sempre ignoro o Docker Desktop e faço instalação direta.



Agora, no computador da empresa para um time de desenvolvimento, é necessário avaliar também em relação ao custo da licença, uma das formas de avaliar é o custo em tempo.



Eu gosto de optar pelo melhor custo-benefício. Se manter a configuração por conta própria custa menos do que US $21 por mês, então sim (na minha experiência custa muito menos). Caso contrário, vai no que custa mais barato e pague pelo Docker Desktop (de novo, caso a empresa fature mais do que dez milhões de dolares).



No Linux, que é o ambiente que eu mais utilizo no dia-a-dia, eu levo menos de 30 minutos para configurar e *nunca* mais precisei mexer na instalação. Executei esses mesmos passos aqui em umas três máquinas diferentes, auxiliei pessoas com eles, e na principal máquina que uso há uns cinco anos, nunca tive nenhum problema.



Considerando isso, meu custo para configurar é menos de 30 minutos, muito menos do que custa a licença, e economizando muito mais os recursos do meu computador. Além disso eu não preciso de uma GUI ~~(em Electron, então +1 browser)~~ para executar `docker-compose up`  😄, **principalmente no Linux**.



No entanto se você gastar muito tempo tentando fazer funcionar, não vale a pena. Pague pelo Docker Desktop e tenha "menos" dor de cabeça (já presenciei vários devs precisando de ajuda com o Docker Desktop, então talvez não seja tão plug-n-play assim).



Se você não quer pagar, mas quer uma GUI, experimente o [Rancher Desktop](https://rancherdesktop.io/).



## Referências

- [Lima: Linux on Mac](https://github.com/lima-vm/lima)
- [Colima: Containers on Linux on Mac](https://github.com/abiosoft/colima)
- [Docker Engine installation overview](https://docs.docker.com/engine/install/)
- [ROI of Docker Desktop vs. DIY: Considerations, Risks, and Benefits for Business](https://www.docker.com/blog/roi-of-docker-desktop-vs-diy-considerations-risks-and-benefits-for-business/)



## Dicas

- Setar a variável `DOCKER_HOST`  caso alguma aplicação não encontre o daemon
- Com Colima também é possível utilizar K8S, etc
- Se você gosta de GUI e não pode pagar o Docker Desktop, [Rancher Desktop](https://rancherdesktop.io/) é uma opção similar e mais leve
- Você pode executar os containers em uma VM remota e ainda sim conectar via o Docker CLI. Aí vai ter o lag na redemas é útil para inspecionar containers de colegas ou do ambiente.



[File: e9c63b77-d0ac-4b53-b100-fd3d9b9aa819]

***

> 🌿 **Budding** são anotações e ideias que já revisei e editei minimamente. Estão começando a tomar forma, mas ainda precisam de refinamento. [O que é isso?](/garden)

# Frontend - Estoque

Modelo de painel de estoque criado com [Vue.js](https://vuejs.org) e [Bootstrap 4](https://v4-alpha.getbootstrap.com). Desenvolvido por Paulo Henrique.

## Pré requisitos:

- [Node.js](https://nodejs.org/en/) (versão 4.x, 8.x recomendado)
- npm version 3+ e [Git](https://git-scm.com/).

## Pacotes de terceiros utilizados:

- [vue-toasted](https://github.com/shakee93/vue-toasted)
- [http-server](https://www.npmjs.com/package/http-server)

## Navegadores
* Chrome, Firefox, Safari, Edge, IE11+

## Instalação

Para usar o frontend do projeto estoque basta seguir os passos abaixo:

```
# clone o repositorio
$ git clone <link> estoque-front

# Entre no repositório criado:
$ cd estoque-front

# Produção localhost:8080.
$ npm install http-server -g
$ npm install
# $ npm rebuild node-sass (Se houver erro na versão do node-sass basta rodar este comando antes na ordem apresentada)
$ npm run build
$ http-server ./dist &


# Produção Docker (Erro menor na conexão com o container do backend, por este motivo este docker não está funcional)
# $ sudo docker build -t estoque-front .
# $ sudo docker run -it -p 8080:8080 --name estoque-front estoque-front 
```

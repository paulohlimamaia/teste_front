<template>
  <div>
    <div>
      <div class="row">
        <div class="col-md-12">
          <router-link :to="{name: 'novo-refri'}" href="#"><button class="btn btn-primary" id="btn" type="button">Cadastrar Refrigerante</button></router-link>
        </div>
      </div>
      <br><br>
      <div class="row">
        <div class="col-md-12">
          <button v-if="buttonExcluir" type="button" class="btn btn-primary" @click="excluirRefrigerantes()">Excluir Refrigerantes Selecionados</button>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="container">
            <fieldset>
                <div class="form-group with-icon-left">
                    <div class="input-group">
                        <input @input="debounceInput" id="search" autocomplete="off" placeholder="Procurar..." required>
                    </div>
                </div>
            </fieldset>
        </div>
      </div>
      <div class="row">
        <div class="container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-for="th in tableOptions.thead" :key="th"  scope="col">{{th}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dados in table.data" :key="dados.id_refri">
                <th scope="row">{{ dados.id_refri }}</th>
                <td>{{ dados.marca }}</td>
                <td>{{ dados.litragem }}</td>
                <td>{{ dados.tipo }}</td>
                <td>{{ dados.quantidade }}</td>
                <td>{{ dados.valor_unidade }}</td>
                <td>
                  <input :id="'refri_' + dados.id_refri" type="checkbox" @change="addRefri(dados.id_refri)">
                </td>
                <td>
                  <button title="Editar Refrigerante" class="btn btn-primary" @click="paginaEdicao(dados.id_refri)"> Editar </button>
                  <button title="Excluir Refrigerante" class="btn btn-primary" @click="excluirRefri(dados.id_refri)"> Excluir </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 justify-content-center">
          <button type="button" id="first_page" class="btn btn-primary" @click="firstPage()"> Primeira </button>
          <button type="button" id="previous_page" class="btn btn-primary" @click="previousPage()"> Anterior </button>

          <button type="button" v-for="page in table.pages" :key="page" :class="page === table.currentPage ? 'btn btn-primary' : 'btn btn-primary'" @click="(page === table.currentPage ? null : pagePaginate(page))"> {{page}} </button>

          <button type="button" id="next_page" class="btn btn-primary" @click="nextPage()"> Próxima </button>
          <button type="button" id="last_page" class="btn btn-primary" @click="lastPage()"> Última </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RefrisController from './RefrisController'

window._ = require('lodash')

export default {
  
    name: 'ListagemRefris',

    data () {
      return {
        url:  'http://127.0.0.1:8001/api',
        tableOptions: { 'thead': ['#', 'Marca', 'Litragem', 'Tipo', 'Quantidade', 'Valor unitário', 'Ações em massa', '*'] },
        search: '',
        table: {
          currentPage: '',
          data: '',
          firstPageUrl: '',
          from: '',
          lastPage: '',
          lastPageUrl: '',
          nextPageUrl: '',
          path: '',
          perPage: '',
          prevPageUrl: '',
          to: '',
          total: '',
          pages: [],
          load: true
        },
        refris: [],
        buttonExcluir: false
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      callbackDataPaginate (response) {
        let responseData = response.data
        this.table.currentPage = responseData.current_page
        this.table.data = responseData.data
        this.table.firstPageUrl = responseData.first_page_url
        this.table.from = responseData.from
        this.table.lastPage = responseData.last_page
        this.table.lastPageUrl = responseData.last_page_url
        this.table.nextPageUrl = responseData.next_page_url
        this.table.path = responseData.path
        this.table.perPage = responseData.per_page
        this.table.prevPageUrl = responseData.prev_page_url
        this.table.to = responseData.to
        this.table.total = responseData.total

        this.table.pages = []
        for (let i = 1; i <= (responseData.last_page); i++) {
          this.table.pages.push(i)
        }

        document.getElementById('previous_page').disabled = false
        document.getElementById('first_page').disabled = false

        document.getElementById('next_page').disabled = false
        document.getElementById('last_page').disabled = false
        if (responseData.current_page === 1) {
          document.getElementById('previous_page').disabled = true
          document.getElementById('first_page').disabled = true
        }

        if (responseData.current_page === responseData.last_page) {
          document.getElementById('next_page').disabled = true
          document.getElementById('last_page').disabled = true
        }
        this.table.load = false
      },
      loadData () {
        this.table.load = true
        this.$http.get(this.url + '?search=' + this.search).then(this.callbackDataPaginate)
      },
      nextPage () {
        this.table.load = true
        this.$http.get(this.table.nextPageUrl + '?search=' + this.search).then(this.callbackDataPaginate)
      },
      previousPage () {
        this.table.load = true
        this.$http.get(this.table.prevPageUrl + '?search=' + this.search).then(this.callbackDataPaginate)
      },
      firstPage () {
        this.table.load = true
        this.$http.get(this.table.firstPageUrl + '?search=' + this.search).then(this.callbackDataPaginate)
      },
      lastPage () {
        this.table.load = true
        this.$http.get(this.table.lastPageUrl + '?search=' + this.search).then(this.callbackDataPaginate)
      },
      pagePaginate (page) {
        this.table.load = true
        this.$http.get(this.url + '?search=' + this.search + '&page=' + page).then(this.callbackDataPaginate)
      },

      atualizaStatus: function (idRefri, status) {
        let self = this
        RefrisController.atualizaStatus(idRefri, status, function () {
          self.loadData()
        })
      },

      paginaEdicao (idRefri) {
        RefrisController.paginaEdicao(idRefri)
      },

      addRefri(idRefri){
        var row = document.getElementById('refri_' + idRefri);
        if(row.checked){
          this.refris.push(idRefri);
          this.refris = [...new Set(this.refris)];
        } else{
          this.refris = this.refris.filter(data => data !== idRefri)
        }

        if(this.refris.length > 0){
          this.buttonExcluir = true
        } else {
          this.buttonExcluir = false
        }
      },

      excluirRefrigerantes(){
        this.refris.forEach(idRefri => {
          this.$http.get(this.url + '/excluir/' + idRefri).then(function(response){
            this.table.data = this.table.data.filter(data => data.id_refri !== response.data.dados.id_refri)
          })
        });
      },

      excluirRefri(idRefri){
        this.$http.get(this.url + '/excluir/' + idRefri).then(function(response){
          this.table.data = this.table.data.filter(data => data.id_refri !== response.data.dados.id_refri)
        })
      },
      debounceInput: _.debounce(function (e) {
      this.search = e.target.value
      this.loadData()
    }, 1000),
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

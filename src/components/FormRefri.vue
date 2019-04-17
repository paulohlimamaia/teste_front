<template>
  <div>
    <div class="container">
      <form id="form_refri">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="marca">Marca</label>
            <input type="text" class="form-control" id="marca" name="marca" placeholder="Marca" maxlength="30" required>
          </div>
          <div class="form-group col-md-6">
            <label for="litragem">Litragem</label>
            <select class="form-control" id="litragem" name="litragem" placeholder="Litragem" required>
              <option>200ml</option>
              <option>250ml</option>
              <option>600ml</option>
              <option>1l</option>
              <option>1.5l</option>
              <option>2l</option>
              <option>3l</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="inputAddress">Tipo</label>
          <select class="form-control" id="tipo" name="tipo" placeholder="Tipo" required>
              <option>Pet</option>
              <option>Garrafa</option>
              <option>Lata</option>
            </select>
        </div>
        <div class="form-group">
          <label for="quantidade">Quantidade</label>
          <input type="number" class="form-control" id="quantidade" name="quantidade" placeholder="Quantidade" min="0" required>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label for="valor_unidade">Valor</label>
            <input type="text" class="form-control" id="valor_unidade" name="valor_unidade" placeholder="Valor" required >
          </div>
        </div>
        <button type="button" id="btn_salvar" class="btn btn-primary" @click="salvaInformacoes()">Cadastrar</button>&nbsp;
        <router-link :to="{name: 'home'}" href="#"><button class="btn btn-secondary" id="btn" type="button">Voltar</button></router-link>
      </form>
    </div>
  </div>
</template>

<script>
import RefrisController from './RefrisController'

export default {
  name: 'form-refri',

  mounted () {
    console.log(this.$route.params)
    if (this.$route.params.idRefri) {
      RefrisController.carregaFormularioDeEdicao(this.$route.params.idRefri)
    }
  },

  methods: {
    salvaInformacoes () {

      var marca = document.getElementById('marca');
      var litragem = document.getElementById('litragem');
      var tipo = document.getElementById('tipo');
      var quantidade = document.getElementById('quantidade');
      var valor_unidade = document.getElementById('valor_unidade');

      var fields = [marca, litragem, tipo, quantidade, valor_unidade]

      var fields_test = false;

      fields.forEach(field => {
        if(!field.value){
          RefrisController.launchToast(`Preencha o campo ${field.placeholder}!`);
          fields_test = true;
        }
      });

      if(fields_test){
        return;
      }


      if (this.$route.params.idRefri) {
        RefrisController.update(this.$route.params.idRefri)
      } else {
        RefrisController.store()
      }
    }
  }
}
</script>

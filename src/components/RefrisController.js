import Vue from 'vue'
import router from '../router'
import { Serialize } from '../services/serializeFormData'
import { LoadFormData } from '../services/LoadFormData'
import Toast from 'vue-toasted'

Vue.use(Toast)


export default {

  store () {
    let self = this
    Vue.http.post('http://127.0.0.1:8001/api', Serialize.toObject('form_refri')).then((response) => {
      if (response.status === 200) {
        self.pageListarRefris()
      }
    }).catch((response) => {
      this.launchToast(response.data.dados)
    })
  },

  update (idRefri) {
    let self = this
    Vue.http.post('http://127.0.0.1:8001/api/' + idRefri, Serialize.toObject('form_refri')).then((response) => {
      if (response.status === 200) {
        self.pageListarRefris()
      }
      self.disableButtons(false)
    }).catch((response) => {
      this.launchToast(response.data.dados)
    })
  },

  pageListarRefris () {
    router.push({ name: 'home' })
  },

  paginaEdicao (idRefri) {
    router.push({ name: 'editar-refri', params: { idRefri: idRefri } })
  },

  carregaFormularioDeEdicao (idRefri) {
    Vue.http.get('http://127.0.0.1:8001/api/' + idRefri).then((response) => {
      LoadFormData.byIdInputs(response.data.dados)
    })
  },

  launchToast (msg) {
    Vue.toasted.show(msg, {
      position: 'top-center',
      theme: 'bubble',
      duration: 5000,
      fullWidth: false
    }
    )
  }
}

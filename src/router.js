import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/cadastrar',
      name: 'novo-refri',
      component: () => import('./components/CadastrarRefri.vue')
    },
    {
      path: '/editar/:idRefri',
      name: 'editar-refri',
      component: () => import('./components/EditarRefri.vue')
    }
  ]
})



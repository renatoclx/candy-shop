import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/main.css'
import 'vue3-toastify/dist/index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'

import HeaderComponent from './components/header/HeaderComponent.vue'
import FooterComponent from './components/footer/FooterComponent.vue'
import MainView from './views/main/MainView.vue'

import ClientesComponent from './components/clientes/ClientesComponent.vue'
import UsuariosComponent from './components/usuarios/UsuariosComponent.vue'
import ProdutosComponent from './components/produtos/ProdutosComponent.vue'
import VendasComponent from './components/vendas/VendasComponent.vue'
import TableComponent from './components/table/TableComponent.vue'
import TitleComponent from './components/title/TitleComponent.vue'

import FormClientComponent from './components/clientes/FormClientComponent.vue'
import FormProdutoComponent from './components/produtos/FormProdutoComponent.vue'
import FormUsuarioComponent from './components/usuarios/FormUsuarioComponent.vue'

const app = createApp(App)
  .component('main-layout', MainView)
  .component('header-main', HeaderComponent)
  .component('footer-main', FooterComponent)
  .component('list-client', ClientesComponent)
  .component('list-user', UsuariosComponent)
  .component('list-product', ProdutosComponent)
  .component('list-sales', VendasComponent)
  .component('table-component', TableComponent)
  .component('title-component', TitleComponent)
  .component('form-client-component', FormClientComponent)
  .component('form-product-component', FormProdutoComponent)
  .component('form-user-component', FormUsuarioComponent)

app.use(router)
app.use(Vue3Toastify)

app.mount('#app')

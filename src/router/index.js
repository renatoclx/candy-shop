import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import MainView from '@/views/main/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { layout: 'empty' }
    },
    {
      path: '/',
      name: 'Home',
      component: MainView
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: () => import('../components/clientes/ClientesComponent.vue'),
      meta: { layout: 'list-client' }
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: () => import('../components/produtos/ProdutosComponent.vue'),
      meta: { layout: 'list-product' }
    },
    {
      path: '/vendas',
      name: 'Vendas',
      component: () => import('../components/vendas/VendasComponent.vue'),
      meta: { layout: 'list-sales' }
    },
    {
      path: '/clientes/novo',
      name: 'NovoCliente',
      component: () => import('../components/clientes/FormClientComponent.vue'),
      meta: { layout: 'form-client-component' }
    }
  ]
})

export default router

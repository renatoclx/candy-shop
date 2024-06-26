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
      component: MainView,
      meta: { requiresAuth: true }
    },
    {
      path: '/clientes',
      name: 'Clientes',
      component: () => import('../components/clientes/ClientesComponent.vue'),
      meta: { layout: 'list-client', requiresAuth: true }
    },
    {
      path: '/clientes/novo',
      name: 'NovoCliente',
      component: () => import('../components/clientes/FormClientComponent.vue'),
      meta: { layout: 'form-client-component', requiresAuth: true }
    },
    {
      path: '/clientes/:id',
      name: 'AlteraCliente',
      component: () => import('../components/clientes/FormClientComponent.vue'),
      props: route => ({
        id: route.params.id,
        nome: route.query.nome,
        cpfCnpj: route.query.cpfCnpj,
        inscEstadual: route.query.inscEstadual,
        cep: route.query.cep,
        logradouro: route.query.logradouro,
        numero: route.query.numero, 
        bairro: route.query.bairro,
        complemento: route.query.complemento, 
        cidade: route.query.cidade, 
        estado: route.query.estado
      }),
      meta: { layout: 'form-client-component', requiresAuth: true  }
    },
    {
      path: '/usuarios',
      name: 'Usuários',
      component: () => import('../components/usuarios/UsuariosComponent.vue'),
      meta: { layout: 'list-user', requiresAuth: true  }
    },
    {
      path: '/usuarios/novo',
      name: 'NovoUsuario',
      component: () => import('../components/usuarios/FormUsuarioComponent.vue'),
      meta: { layout: 'form-user-component', requiresAuth: true  }
    },
    {
      path: '/usuarios/:id',
      name: 'AlteraUsuario',
      component: () => import('../components/usuarios/FormUsuarioComponent.vue'),
      props: route => ({
        id: route.params.id,
        nome: route.query.nome,
        login: route.query.login,
        senha: route.query.senha
      }),
      meta: { layout: 'form-user-component', requiresAuth: true  }
    },
    {
      path: '/produtos',
      name: 'Produtos',
      component: () => import('../components/produtos/ProdutosComponent.vue'),
      meta: { layout: 'list-product', requiresAuth: true  }
    },
    {
      path: '/produtos/novo',
      name: 'NovoProduto',
      component: () => import('../components/produtos/FormProdutoComponent.vue'),
      meta: { layout: 'form-product-component', requiresAuth: true  }
    },
    {
      path: '/produtos/:id',
      name: 'AlteraProduto',
      component: () => import('../components/produtos/FormProdutoComponent.vue'),
      props: route => ({
        id: route.params.id,
        nomeProduto: route.query.nome,
        precoCusto: route.query.custo,
        precoVenda: route.query.venda
      }),
      meta: { layout: 'form-product-component', requiresAuth: true  }
    },
    {
      path: '/vendas',
      name: 'Vendas',
      component: () => import('../components/vendas/VendasComponent.vue'),
      meta: { layout: 'list-sales', requiresAuth: true  }
    },
    {
      path: '/vendas/novo',
      name: 'NovaVenda',
      component: () => import('../components/vendas/FormVendaComponent.vue'),
      meta: { layout: 'form-venda-component', requiresAuth: true  }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      const token = localStorage.getItem('token');
      if (token === null) {
          next({ name: 'Login' });
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router

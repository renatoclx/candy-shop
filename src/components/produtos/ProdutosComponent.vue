<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'

import { ref } from 'vue'

const fields = ['nome', 'preco_custo', 'preco_venda']
const columnNames = ['Nome', 'Preço de Custo', 'Preço de Venda']
const titleField = ref('Produtos')

const data = [
  { nome: 'Donuts de Chocolate', preco_custo: '2,00', preco_venda: '4,00' },
  { nome: 'Bolo de Cenoura', preco_custo: '1,50', preco_venda: '3,00' },
  { nome: 'Donuts de Nutella', preco_custo: '6,00', preco_venda: '12,00' }
]
</script>

<template>
  <HeaderComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-busca-novo">
        <div class="mx-2" style="display: flex; flex-direction: row">
          <input
            id="findProduto"
            style="width: 20rem"
            class="form-control"
            type="text"
            placeholder="Pesquisar..."
          />
          <button class="btn botao-pesquisar mx-2">
            <img src="../../assets/icons/SearchIcon.svg" width="15" height="15W" />
          </button>
        </div>
        <div>
          <router-link to="/produtos/novo">
            <button class="btn botao-confirmar mx-2">
              Novo <img src="../../assets/icons/PlusIcon.svg" width="15" height="15" />
            </button>
          </router-link>
        </div>
      </div>
      <div class="mt-1 table-responsive my-5" style="width: 100%">
        <TableComponent :fields="fields" :data="data" :column-names="columnNames"> </TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

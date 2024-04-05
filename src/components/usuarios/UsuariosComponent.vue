<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'

import { ref } from 'vue'

const columnNames = ['ID', 'Nome', 'Login']
const fields = ['id', 'nome', 'login']
const titleField = ref('Usuários')

const data = [
  { id: 1, nome: 'Renato Jean', login: 'renatojean' },
  { id: 2, nome: 'Michael Jordan', login: 'michaeljordan' }
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
            id="findUsuario"
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
          <router-link to="/usuarios/novo">
            <button class="btn botao-confirmar mx-2">
              Novo <img src="../../assets/icons/PlusIcon.svg" width="15" height="15" />
            </button>
          </router-link>
        </div>
      </div>
      <div class="mt-2 table-responsive my-5" style="width: 100%">
        <TableComponent :fields="fields" :data="data" :column-names="columnNames"></TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

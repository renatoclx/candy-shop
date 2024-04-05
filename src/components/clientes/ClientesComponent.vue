<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TableComponent from '../table/TableComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'

const fields = ['nome', 'insc_estadual', 'cidade']
const columnNames = ['Nome/Razão Social', 'Insc. Estadual', 'Cidade']
const titleField = ref('Clientes')

const data = [{ id: 1, nome: 'Abiola Esther', insc_estadual: '481.468.151.654', cidade: 'Osasco' }]
</script>

<template>
  <HeaderComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-busca-novo">
        <div class="mx-2" style="display: flex; flex-direction: row">
          <input
            id="email"
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
          <router-link to="/clientes/novo">
            <button id="novaPessoa" class="btn botao-confirmar mx-2">
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

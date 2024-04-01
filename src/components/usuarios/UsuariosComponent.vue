<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'

import { ref } from 'vue'

const fields = ['ID', 'Nome', 'Curso', 'Gênero', 'Idade']
const titleField = ref('Usuários')

const data = [
  { ID: '01', Nome: 'Abiola Esther', Curso: 'Computer Science', Gênero: 'Female', Idade: '17' },
  { ID: '02', Nome: 'Robert V. Kratz', Curso: 'Philosophy', Gênero: 'Male', Idade: '19' },
  { ID: '03', Nome: 'Kristen Anderson', Curso: 'Economics', Gênero: 'Female', Idade: '20' },
  { ID: '04', Nome: 'Adam Simon', Curso: 'Food science', Gênero: 'Male', Idade: '21' },
  { ID: '05', Nome: 'Daisy Katherine', Curso: 'Business studies', Gênero: 'Female', Idade: '22' }
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
      <div class="mt-1 table-responsive my-5" style="width: 100%">
        <TableComponent :fields="fields" :data="data"> </TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

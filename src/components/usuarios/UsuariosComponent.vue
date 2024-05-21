<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'
import api from '@/config/axios'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const fields = ['id', 'nome', 'login']
const columnNames = ['ID', 'Nome', 'Login']
const titleField = ref('Usuários')

const data = ref([]);

onMounted(() => {
  listaUsuarios();
})

const editUsuario = (id, nome, login, senha) => {
  router.push({
    name: "AlteraUsuario",
    params: { id: id},
    query: {
      nome: nome,
      login: login,
      senha: senha
    }
  })
}

const handleUpdateUsuario = async (id) => {
  try {
    let response = await api.get(`/usuario/${id}`);
    let usuario = response.data

    editUsuario(
      id, 
      usuario.nome, 
      usuario.login, 
      usuario.senha
    );
    
  } catch(e) {
    console.error(e)
  }
}

const  listaUsuarios = async () => {

  try {
    let response = await api.get("/usuario");
    let usuarios = response.data;

    for(let i = 0; i < usuarios.length; i++) {
      let usuario = {};
      usuario.id = usuarios[i].id;
      usuario.nome = usuarios[i].nome;
      usuario.login = usuarios[i].login;
     
      data.value.push(usuario);
    }

  } catch(e) {
    console.error(e);
  }
}

const handleDeleteUsuario = (id) => {
  Swal.fire({
        title: "Deseja excluir o Usuário?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {

        api.delete(`/usuario/${id}`).then(() => {
          
          if(result.isConfirmed) {
            Swal.fire({
              title: "Usuário excluido!",
              icon: "success"
            });
          }
          data.value = [];
          listaUsuarios();
        })
      })
}
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
        <TableComponent 
          :fields="fields" 
          :data="data" 
          :column-names="columnNames"
          @delete="handleDeleteUsuario" 
          @update="handleUpdateUsuario"
          ></TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

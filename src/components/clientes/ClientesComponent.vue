<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TableComponent from '../table/TableComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import api from '@/config/axios'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const fields = ['nome', 'cpfCnpj', 'cidade']
const columnNames = ['Nome/Razão Social', 'CPF/CNPJ', 'Cidade']
const titleField = ref('Clientes')

const data = ref([]);

onMounted(() => {
  listaClientes();
})

const editCliente = (
  id, 
  nome,
  docs,
  inscEst, 
  cep, 
  logradouro, 
  numero, 
  bairro, 
  complemento, 
  cidade, 
  estado
  ) => {
  router.push({
    name: "AlteraCliente",
    params: { id: id},
    query: {
      nome: nome,
      cpf_cnpj: docs,
      insc_estadual: inscEst,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      complemento: complemento,
      cidade: cidade,
      estado: estado
    }
  })
}

const handleUpdateCliente = async (id) => {
  try {
    let response = await api.get(`/cliente/${id}`);
    let cliente = response.data
    console.log(cliente);
    editCliente(
      id,
      cliente.nome,
      cliente.cpfCnpj,
      cliente.inscEstadual,
      cliente.cep,
      cliente.logradouro,
      cliente.numero,
      cliente.bairro,
      cliente.complemento,
      cliente.cidade,
      cliente.estado
    );
    
  } catch(e) {
    console.error(e)
  }
}

const listaClientes = async () => {

  try {
    let response = await api.get("/cliente");
    let clientes = response.data;
    console.log(clientes);

    for(let i = 0; i < clientes.length; i++) {
      let cliente = {};
      cliente.id = clientes[i].id;
      cliente.nome = clientes[i].nome;
      cliente.cpfCnpj = clientes[i].cpfCnpj;
      cliente.cidade = clientes[i].cidade;
    
      data.value.push(cliente);
    }

  } catch(e) {
    console.error(e);
  }
}

const handleDeleteCliente = (id) => {
  Swal.fire({
        title: "Deseja excluir o Cliente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {

        api.delete(`/cliente/${id}`).then(() => {
          
          if(result.isConfirmed) {
            Swal.fire({
              title: "Cliente excluido!",
              icon: "success"
            });
          }
          data.value = [];
          listaClientes();
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
        <TableComponent 
          :fields="fields" 
          :data="data" 
          :column-names="columnNames"
          @delete="handleDeleteCliente"
          @update="handleUpdateCliente"></TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'

import api from '@/config/axios'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'

const columnNames = ['ID', 'Cliente', 'Valor do Pedido']
const fields = ['vendaId', 'nome', 'precoTotalProduto']
const data = ref([]);

onMounted(() => {
  listaVendas();
})


const titleField = ref('Vendas')

const listaVendas = async () => {

  try {
    let response = await api.get("/venda/resumo");
    let vendas = response.data;

    for(let i = 0; i < vendas.length; i++) {
      let venda = {};
      venda.vendaId = vendas[i].vendaId;
      venda.nome = vendas[i].nome;
      venda.precoTotalProduto = vendas[i].precoTotalProduto;
    
      data.value.push(venda);
    }

  } catch(e) {
    console.error(e);
  }
}

const handleDeleteVenda = (id) => {
  console.log(id)
  Swal.fire({
        title: "Deseja excluir a Venda?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {

        api.delete(`/venda/${id}`).then(() => {
          
          if(result.isConfirmed) {
            Swal.fire({
              title: "Venda Excluída!",
              icon: "success"
            });
          }
          data.value = [];
          listaVendas();
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
            id="findVenda"
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
          <router-link to="/vendas/novo">
            <button class="btn botao-confirmar mx-2">
              Novo <img src="../../assets/icons/PlusIcon.svg" width="15" height="15" />
            </button>
          </router-link>
        </div>
      </div>
      <div class="mt-2 table-responsive my-5" style="width: 100%" >
        <TableComponent 
          :fields="fields" 
          :data="data" 
          :column-names="columnNames" 
          :is-venda="true" 
          @delete="handleDeleteVenda"
        ></TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import TableComponent from '../table/TableComponent.vue'
import api from '@/config/axios'
import { updateAlert } from '@/utils/alerts'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'

const fields = ['nome', 'preco_custo', 'preco_venda']
const columnNames = ['Nome', 'Preço de Custo', 'Preço de Venda']
const titleField = ref('Produtos')

const data = ref([]);

const handleDeleteProduto = (id) => {
  Swal.fire({
        title: "Deseja excluir o ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Não"
      }).then((result) => {

        api.delete(`/produto/${id}`).then(() => {
          
          if(result.isConfirmed) {
            Swal.fire({
              title: "Produto excluido!",
              icon: "success"
            });
          }
          data.value = [];
          listaProdutos();
        })
      })
}

const handleUpdateProduto = (id) => {
  updateAlert(id)
}

onMounted(() => {
  listaProdutos();
})

const  listaProdutos = async () => {

  try {
    let response = await api.get("/produto");
    let produtos = response.data;

    for(let i = 0; i < produtos.length; i++) {
      let produto = {};
      produto.id = produtos[i].id;
      produto.nome = produtos[i].nome;
      produto.preco_custo = produtos[i].precoCusto;
      produto.preco_venda = produtos[i].precoVenda;
     
      data.value.push(produto);
    }

  } catch(e) {
    console.error(e);
  }
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
        <TableComponent 
          :fields="fields" 
          :data="data" 
          :column-names="columnNames" 
          @delete="handleDeleteProduto" 
          @update="handleUpdateProduto"
        > </TableComponent>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

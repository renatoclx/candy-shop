<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import ModalComponent from '../modal/ModalComponent.vue'

import { ref } from 'vue'
import { Money } from 'v-money3'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router';
import api from '@/config/axios'

const router = useRouter();

let clienteTabela = ref({
  fields: ["nome"],
  data: [],
  colunas: ['Cliente']
})

let produtoTabela = ref({
  fields: ["nome"],
  data: [],
  colunas: ['Produto']
})

let pedidoTabela = ref({
  fields: ['nomeProduto', 'quantidadeProduto', 'precoUnitarioProduto', 'precoTotalProduto'],
  data: [],
  colunas: ['Produto', 'Quantidade', 'Preço de Custo', 'Preço Total']
})

const findCliente = async (nome) => {

  try {
    if(cliente.value !== "") {
    clienteTabela.value.data = [];
    let response = await api.get(`/cliente/buscar?nome=${nome}`);
    let clientes = response.data;

    for(let i = 0; i < clientes.length; i++) {
      let cliente = {};
      cliente.id = clientes[i].id;
      cliente.nome = clientes[i].nome;

      clienteTabela.value.data.push(cliente);
    }
  }
  } catch(e) {
    console.error(e);
  }

}

const findProduto = async (nome) => {

try {
  if(produto.value !== "") {
  produtoTabela.value.data = [];
  let response = await api.get(`/produto/buscar?nome=${nome}`);
  let produtos = response.data;

  for(let i = 0; i < produtos.length; i++) {
    let produto = {};
    produto.id = produtos[i].id;
    produto.nome = produtos[i].nome;

    produtoTabela.value.data.push(produto);
  }
}
} catch(e) {
  console.error(e);
}

}

const selecionaCliente = (id) => {
  let codigo = clienteTabela.value.data[id].id;
  let nome = clienteTabela.value.data[id].nome;

  closeableModal.value = false;
  codCliente.value = codigo;
  cliente.value = nome;

}

const selecionaProduto = (id) => {
  let codigo = produtoTabela.value.data[id].id;
  let nome = produtoTabela.value.data[id].nome;

  closeableModal.value = false;
  codProduto.value = codigo;
  produto.value = nome;

}
const closeableModal = ref(false);

const modalShowCliente = () => {
  closeableModal.value = true;
  isCliente.value = true;
  isProduto.value = false;
}

const modalShowProduto = () => {
  closeableModal.value = true;
  isCliente.value = false;
  isProduto.value = true;
}


const titleField = ref('Nova Venda')
const codProduto = ref(null)
const produto = ref('')
const quantidade = ref(0)
const precoUnitario = ref(0)
const precoTotal = ref(0)
const totalPedido = ref(0)
const codCliente = ref(null)
const cliente = ref("");
const produtos = ref([]);
const submitted = ref(false);

const isProduto = ref(false);
const isCliente = ref(false);

let totalFinal = 0

const submitForm = () => {
  submitted.value = true
}

const maskMoney = ref({
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})

const calcQtde = () => {
  if (quantidade.value === 0) {
    toast('Informe a quantidade do produto!', {
      type: 'warning',
      dangerouslyHTMLString: true
    })
    precoTotal.value = 0
    return
  }

  if (quantidade.value !== null || quantidade.value > 0) {
    precoTotal.value = quantidade.value * precoUnitario.value
  }
}

const adicionaItem = () => {
  let novoItem = {
    id: codProduto.value,
    nomeProduto: produto.value,
    quantidadeProduto: quantidade.value,
    precoUnitarioProduto: precoUnitario.value,
    precoTotalProduto: precoTotal.value
  }

  totalPedido.value = totalPedido.value + precoTotal.value
  pedidoTabela.value.data.push(novoItem)
  produtos.value.push(novoItem);

  let convertTotal = parseFloat(precoTotal.value)

  totalFinal = totalFinal + convertTotal

  totalPedido.value = totalFinal

  produto.value = ''
  quantidade.value = 0
  precoUnitario.value = 0
  precoTotal.value = 0

}

const removeItem = (id) => {
  let precoTotalProduto = pedidoTabela.value.data[id].precoTotalProduto
  let convertValorProduto = parseFloat(precoTotalProduto)

  totalFinal = totalFinal - convertValorProduto
  totalPedido.value = totalFinal

  pedidoTabela.value.data.splice(id, 1)
}

const realizaVenda = async () => {

  let response = await api.post("/venda", {
    clienteId: codCliente.value,
    itens: produtos.value
  });

  console.log(response.data);

  router.push("/vendas");

}
</script>
<template>
  <HeaderComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <form @submit.prevent="submitForm">
        <div class="bloco-form" style="justify-content: center">
          <div>
            <input type="hidden" id="codCliente" v-model="codCliente"/>
            <label for="cliente" class="form-label mb-0">Cliente:</label>
            <input
              type="text"
              class="form-control"
              id="cliente"
              v-model="cliente"
              @blur="findCliente(cliente)"
              style="height: 2.5rem; width: 35rem"
            />
          </div>
          <div style="margin-top: 1.5rem">
            <button @click="modalShowCliente" type="button" class="btn botao-pesquisar mx-2">
              <img src="../../assets/icons/SearchIcon.svg" width="15" height="15" />
            </button>
          </div>
        </div>
        <div class="bloco-form" style="justify-content: center">
          <div>
            <label for="produto" class="form-label mb-0">Produto:</label>
            <input type="hidden" id="codProduto" v-model="codProduto"/>
            <input
              type="text"
              class="form-control"
              v-model="produto"
              @blur="findProduto(produto)"
              style="height: 2.5rem; width: 30rem"
            />
          </div>
          <div style="margin-top: 1.5rem">
            <button @click="modalShowProduto" class="btn botao-pesquisar mx-2">
              <img src="../../assets/icons/SearchIcon.svg" width="15" height="15" />
            </button>
          </div>
          <div class="mx-2">
            <label for="precoUnitario" class="form-label mb-0">Preço Unitário:</label>
            <money
              class="form-control"
              style="width: 10rem; height: 2.5rem"
              v-model="precoUnitario"
              v-bind="maskMoney"
            />
          </div>
          <div class="mx-2">
            <label for="quantidade" class="form-label mb-0">Quantidade:</label>
            <input
              type="number"
              class="form-control"
              v-model="quantidade"
              @blur="calcQtde"
              style="height: 2.5rem; width: 7rem"
            />
          </div>
          <div>
            <label for="precoTotal" class="form-label mb-0">Preço Total:</label>
            <money
              class="form-control"
              style="width: 10rem; height: 2.5rem"
              v-model="precoTotal"
              v-bind="maskMoney"
              disabled
            />
          </div>
          <div class="mx-4" style="margin-top: 1.5rem">
            <button class="btn botao-confirmar mx-2" type="submit" @click.prevent="adicionaItem">
              Adicionar
              <img src="../../assets/icons/PlusIcon.svg" width="15" height="15" />
            </button>
          </div>
        </div>
        <div>
          <table id="tableProdutos" class="table table-striped">
            <thead>
              <tr style="vertical-align: middle">
                <th v-for="(coluna, index) in pedidoTabela.colunas" :key="index">
                  {{ coluna }}
                </th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="vertical-align: middle"
                v-for="(item, itemIndex) in pedidoTabela.data"
                :key="itemIndex"
                :id="itemIndex"
              >
                <td v-for="(field, fieldIndex) in pedidoTabela.fields" :key="fieldIndex">
                  {{ item[field] }}
                </td>
                <td style="width: 250px">
                  <button class="btn botao-limpar" @click="removeItem(itemIndex)">
                    <img src="../../assets/icons/RemoveIcon.svg" alt="" width="15" height="15" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bloco-form" style="justify-content: space-between; align-items: center">
          <div style="display: flex; flex-direction: row">
            <h6 style="margin-top: 2px">Total do Pedido:</h6>
            <h5 class="mx-2">
              <money
                class="form-label"
                id="totalPedido"
                v-model="totalPedido"
                v-bind="maskMoney"
                style="color: #fd9485; border: 0; background: border-box; font-weight: 500"
                disabled
              />
            </h5>
          </div>
          <div>
            <button class="btn botao-confirmar" @click="realizaVenda" type="submit">
              <img src="../../assets/icons/SaleIcon.svg" alt="" width="15" height="15" />
              &nbsp;&nbsp;Realizar Venda
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <FooterComponent />
  <ModalComponent v-model="closeableModal" closeable header="Selecione">
    <div v-if="isCliente && !isProduto">
        <table id="tableClientes" class="table table-striped">
          <thead>
            <tr style="vertical-align: middle">
              <th v-for="(coluna, index) in clienteTabela.colunas" :key="index">
                {{ coluna }}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="vertical-align: middle"
              v-for="(item, itemIndex) in clienteTabela.data"
              :key="itemIndex"
              :id="itemIndex"
            >
              <td v-for="(field, fieldIndex) in clienteTabela.fields" :key="fieldIndex">
                {{ item[field] }}
              </td>
              <td style="width: 250px">
                <button class="btn botao-confirmar" @click="selecionaCliente(itemIndex)">
                  <img src="../../assets/icons/SelectIcon.svg" alt="" width="15" height="15" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="!isCliente && isProduto">
        <table id="tableProdutos" class="table table-striped">
          <thead>
            <tr style="vertical-align: middle">
              <th v-for="(coluna, index) in produtoTabela.colunas" :key="index">
                {{ coluna }}
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="vertical-align: middle"
              v-for="(item, itemIndex) in produtoTabela.data"
              :key="itemIndex"
              :id="itemIndex"
            >
              <td v-for="(field, fieldIndex) in produtoTabela.fields" :key="fieldIndex">
                {{ item[field] }}
              </td>
              <td style="width: 250px">
                <button class="btn botao-confirmar" @click="selecionaProduto(itemIndex)">
                  <img src="../../assets/icons/SelectIcon.svg" alt="" width="15" height="15" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>      
  </ModalComponent>
</template>

<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'
import { Money } from 'v-money3'
import { toast } from 'vue3-toastify'

let pedidoTabela = ref({
  fields: ['nomeProduto', 'quantidadeProduto', 'precoUnitarioProduto', 'precoTotalProduto'],
  data: [],
  colunas: ['Produto', 'Quantidade', 'Preço de Custo', 'Preço Total']
})

const titleField = ref('Nova Venda')
const idVenda = ref(0)
const produto = ref('')
const quantidade = ref(0)
const precoUnitario = ref(0)
const precoTotal = ref(0)
const totalPedido = ref(0)
let totalFinal = 0

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
  idVenda.value++
  let novoItem = {
    id: idVenda.value,
    nomeProduto: produto.value,
    quantidadeProduto: quantidade.value,
    precoUnitarioProduto: precoUnitario.value,
    precoTotalProduto: precoTotal.value
  }

  totalPedido.value = totalPedido.value + precoTotal.value
  pedidoTabela.value.data.push(novoItem)

  let convertTotal = parseFloat(precoTotal.value)

  totalFinal = totalFinal + convertTotal

  totalPedido.value = totalFinal
}

const removeItem = (id) => {
  let precoTotalProduto = pedidoTabela.value.data[id].precoTotalProduto
  let convertValorProduto = parseFloat(precoTotalProduto)

  totalFinal = totalFinal - convertValorProduto
  totalPedido.value = totalFinal

  pedidoTabela.value.data.splice(id, 1)
  console.log(pedidoTabela.value.data)
}
</script>
<template>
  <HeaderComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="cliente" class="form-label mb-0">Cliente:</label>
          <input
            type="text"
            class="form-control"
            id="cliente"
            style="height: 2.5rem; width: 35rem"
          />
        </div>
        <div style="margin-top: 1.5rem">
          <button class="btn botao-pesquisar mx-2">
            <img src="../../assets/icons/SearchIcon.svg" width="15" height="15" />
          </button>
        </div>
      </div>
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="produto" class="form-label mb-0">Produto:</label>
          <input
            type="text"
            class="form-control"
            v-model="produto"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
        <div style="margin-top: 1.5rem">
          <button class="btn botao-pesquisar mx-2">
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
          <button class="btn botao-confirmar">
            <img src="../../assets/icons/SaleIcon.svg" alt="" width="15" height="15" />
            &nbsp;&nbsp;Realizar Venda
          </button>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

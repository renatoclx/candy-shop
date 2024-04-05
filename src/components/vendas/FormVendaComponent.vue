<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'

const titleField = ref('Nova Venda')
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
            id="produto"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
        <div style="margin-top: 1.5rem">
          <button class="btn botao-pesquisar mx-2">
            <img src="../../assets/icons/SearchIcon.svg" width="15" height="15" />
          </button>
        </div>
        <div class="mx-3">
          <label for="quantidade" class="form-label mb-0">Quantidade:</label>
          <input
            type="number"
            class="form-control"
            id="quantidade"
            style="height: 2.5rem; width: 7rem"
          />
        </div>
        <div class="mx-2">
          <label for="unitario" class="form-label mb-0">Preço Unitário:</label>
          <input
            type="number"
            class="form-control"
            id="quantidade"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
        <div>
          <label for="total" class="form-label mb-0">Preço Total:</label>
          <input
            type="number"
            class="form-control"
            id="total"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
        <div class="mx-4" style="margin-top: 1.5rem">
          <button class="btn botao-confirmar mx-2">
            Adicionar
            <img src="../../assets/icons/PlusIcon.svg" width="15" height="15" />
          </button>
        </div>
      </div>
      <div>
        <table id="tableProdutos" class="table table-striped">
          <thead>
            <tr style="vertical-align: middle">
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço de Custo</th>
              <th>Preço Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="width: 250px">
                <button class="btn botao-limpar">
                  <img src="../../assets/icons/RemoveIcon.svg" alt="" width="15" height="15" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bloco-form" style="justify-content: space-between; align-items: center">
        <div style="display: flex; flex-direction: row">
          <h6>Total do Pedido (R$):</h6>
          <h6 class="mx-2" style="color: #fd9485">15,89</h6>
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

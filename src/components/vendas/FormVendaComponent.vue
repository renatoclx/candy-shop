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
      <div class="bloco-form" style="justify-content: flex-start">
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
    </div>
  </div>
  <FooterComponent />
</template>

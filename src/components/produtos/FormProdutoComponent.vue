<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'

const titleField = ref('Cadastrar Produto')
</script>
<template>
  <HeaderComponent />
  <FooterComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-form">
        <div>
          <label for="nomeProduto" class="form-label mb-0">Nome do Produto:</label>
          <input
            type="text"
            class="form-control"
            id="nomeRazao"
            style="height: 2.5rem; width: 45rem"
          />
        </div>
        <div>
          <label for="precoCusto" class="form-label mb-0">Preço de Custo:</label>
          <input
            type="text"
            class="form-control"
            id="precoCusto"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
        <div>
          <label for="precoVenda" class="form-label mb-0">Preço de Venda:</label>
          <input
            type="text"
            class="form-control"
            id="precoVenda"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
      </div>
      <div class="bloco" style="display: flex; justify-content: end; margin-top: 2rem">
        <button class="btn botao-limpar btn-lg">Voltar</button>
        <button class="btn botao-pesquisar mx-3 btn-lg">Limpar</button>
        <button class="btn botao-confirmar btn-lg">Inserir</button>
      </div>
    </div>
  </div>
</template>

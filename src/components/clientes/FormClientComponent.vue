<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'

const titleField = ref('Cadastrar Pessoa')
</script>
<template>
  <HeaderComponent />
  <FooterComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-form mb-1">
        <div>
          <label for="nomePessoa" class="form-label mb-0">Nome/Razão Social:</label>
          <input
            type="text"
            class="form-control"
            id="nomePessoa"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
        <div>
          <label for="cpfCnpj" class="form-label mb-0">CPF/CNPJ:</label>
          <input
            type="text"
            class="form-control"
            id="cpfCnpjPessoa"
            style="height: 2.5rem; width: 20rem"
          />
        </div>
        <div>
          <label for="inscricaoEstadual" class="form-label mb-0">Inscrição Estadual:</label>
          <input
            type="text"
            class="form-control"
            id="inscricaoPessoa"
            style="height: 2.5rem; width: 20rem"
          />
        </div>
      </div>
      <div class="bloco-conteudo" style="background-color: #000">
        <div
          style="
            width: 30rem;
            height: 30rem;
            background-color: blue;
            display: flex;
            flex-direction: column;
          "
        ></div>
      </div>
    </div>
  </div>
</template>

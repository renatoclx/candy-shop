<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import { ref } from 'vue'

const titleField = ref('Cadastrar Usuário')
</script>
<template>
  <HeaderComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="nomeUsuario" class="form-label mb-0">Nome do Usuário:</label>
          <input
            type="text"
            class="form-control"
            id="nomeUsuario"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
      </div>
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="loginUsuario" class="form-label mb-0">Login de Acesso:</label>
          <input
            type="text"
            class="form-control"
            id="nomeRazao"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
      </div>
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="senhaUsuario" class="form-label mb-0">Senha:</label>
          <input
            type="text"
            class="form-control"
            id="senhaUsuario"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
      </div>
      <div class="bloco-form" style="justify-content: center">
        <div>
          <label for="confirmUsuario" class="form-label mb-0">Confirme a Senha:</label>
          <input
            type="text"
            class="form-control"
            id="confirmUsuario"
            style="height: 2.5rem; width: 30rem"
          />
        </div>
      </div>
      <div class="bloco" style="display: flex; justify-content: center; margin-top: 2rem">
        <button class="btn botao-limpar btn-lg">Voltar</button>
        <button class="btn botao-pesquisar mx-3 btn-lg">Limpar</button>
        <button class="btn botao-confirmar btn-lg">Inserir</button>
      </div>
    </div>
  </div>

  <FooterComponent />
</template>

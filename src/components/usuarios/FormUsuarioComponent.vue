<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import { toast } from 'vue3-toastify'

import { ref } from 'vue'

const titleField = ref('Cadastrar Usuário')
const nomeUsuario = ref('')
const loginUsuario = ref('')
const senhaUsuario = ref('')
const confirmSenha = ref('')
const submitted = ref(false)

const submitForm = () => {
  submitted.value = true
}

const validaSenha = () => {
  if (senhaUsuario.value !== confirmSenha.value) {
    toast('Confirmação de senha Inválida.', {
      type: 'error',
      dangerouslyHTMLString: true
    })
    confirmSenha.value = ''
  }
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
            <label for="nomeUsuario" class="form-label mb-0">Nome do Usuário:</label>
            <input
              type="text"
              class="form-control"
              id="nomeUsuario"
              v-model="nomeUsuario"
              style="height: 2.5rem; width: 30rem"
              :class="{ 'is-invalid': nomeUsuario === '' && submitted }"
            />
            <div v-if="submitted && nomeUsuario === ''" class="invalid-feedback">
              Digite o nome do usuário.
            </div>
          </div>
        </div>
        <div class="bloco-form" style="justify-content: center">
          <div>
            <label for="loginUsuario" class="form-label mb-0">Login de Acesso:</label>
            <input
              type="text"
              class="form-control"
              id="loginUsuario"
              v-model="loginUsuario"
              style="height: 2.5rem; width: 30rem"
              :class="{ 'is-invalid': loginUsuario === '' && submitted }"
            />
            <div v-if="submitted && loginUsuario === ''" class="invalid-feedback">
              Digite um login para o usuário.
            </div>
          </div>
        </div>
        <div class="bloco-form" style="justify-content: center">
          <div>
            <label for="senhaUsuario" class="form-label mb-0">Senha:</label>
            <input
              type="password"
              class="form-control"
              v-model="senhaUsuario"
              id="senhaUsuario"
              style="height: 2.5rem; width: 30rem"
            />
          </div>
        </div>
        <div class="bloco-form" style="justify-content: center">
          <div>
            <label for="confirmSenha" class="form-label mb-0">Confirme a Senha:</label>
            <input
              type="password"
              class="form-control"
              v-model="confirmSenha"
              id="confirmSenha"
              style="height: 2.5rem; width: 30rem"
              v-on:blur="validaSenha"
            />
          </div>
        </div>
        <div class="bloco" style="display: flex; justify-content: center; margin-top: 2rem">
          <button class="btn botao-limpar btn-lg">Voltar</button>
          <button class="btn botao-pesquisar mx-3 btn-lg">Limpar</button>
          <button class="btn botao-confirmar btn-lg" type="submit">Inserir</button>
        </div>
      </form>
    </div>
  </div>

  <FooterComponent />
</template>

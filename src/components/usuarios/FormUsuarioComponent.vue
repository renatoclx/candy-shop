<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'
import { toast } from 'vue3-toastify'

import api from '@/config/axios'
import Swal from 'sweetalert2'

import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const titleField = ref('Cadastrar Usuário')

const nomeUsuario = ref('')
const loginUsuario = ref('')
const senhaUsuario = ref('')
const confirmSenha = ref('')
const submitted = ref(false)

const isEditMode = computed(() => !!route.params.id);

const usuario = ref({
  id: null,
  nome: '',
  login: '',
  senha: ''
});

const submitForm = () => {
  submitted.value = true
  if (nomeUsuario.value === '' || loginUsuario.value === '' || senhaUsuario.value === '' || confirmSenha.value === '') {
    return false
  }
  if (!validaSenha()) {
    return false
  }
  return true
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

onMounted(() => {
  if (isEditMode.value) {
    usuario.value.id = route.params.id;
    usuario.value.nome = route.query.nome;
    usuario.value.login = route.query.login;
    usuario.value.senha = route.query.senha;

    nomeUsuario.value = usuario.value.nome;
    loginUsuario.value = usuario.value.login;
    senhaUsuario.value = usuario.value.senha;
  }
});

const limparCampos = () => {
  nomeUsuario.value = "";
  loginUsuario.value = "";
  senhaUsuario.value = "";
  confirmSenha.value = '';
}

const salvarUsuario = async () => {
  if(!submitted.value) {
    return;
  }
  try {
    if(isEditMode.value) {
      let response = await api.put(`/usuario/${route.params.id}`, {
        nome: nomeUsuario.value,
        login: loginUsuario.value,
        senha: senhaUsuario.value,
        ativo: 1
      });

      let update = response.data

      Swal.fire({
        title: "Usuário " + update.nome + " alterado com sucesso!",
        icon: "success"
        });

      limparCampos();
    } else {
      console.log(submitted.value)
      let response = await  api.post(`/usuario`, {
        nome: nomeUsuario.value,
        login: loginUsuario.value,
        senha: senhaUsuario.value,
        ativo: 1,
        admin: 0
      });

      let inserido = response.data;
      console.log(inserido);

      Swal.fire({
        title: inserido,
        icon: "success"
      });

      limparCampos();
    }

    router.push("/usuarios");
  } catch(e) {
    Swal.fire({
        title: "Login já cadastrado!",
        icon: "danger"
      });
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
              @blur="submitForm"
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
              @blur="submitForm"
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
              :class="{ 'is-invalid': senhaUsuario === '' && submitted }"
              @blur="submitForm"
            />
          </div>
          <div v-if="submitted && senhaUsuario === ''" class="invalid-feedback">
            Digite um login para o usuário.
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
          <router-link to="/usuarios">
            <button class="btn botao-limpar btn-lg">Voltar</button>
        </router-link>
          
          <button class="btn botao-pesquisar mx-3 btn-lg">Limpar</button>
          <button class="btn botao-confirmar btn-lg" @click="salvarUsuario">Inserir</button>
        </div>
      </form>
    </div>
  </div>

  <FooterComponent />
</template>

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


const titleField = ref('Cadastrar Pessoa')

const nome = ref("");
const cep = ref("");
const cidade = ref("");
const estado = ref("");
const documento = ref("");
const inscEst = ref("");
const complemento = ref("");
const bairro = ref("");
const logradouro = ref("");
const numero = ref(0);
const submitted = ref(false)

const limpaCamposCep = () => {
  cidade.value = "";
  estado.value = "";
  complemento.value = "";
  bairro.value = "";
  logradouro.value = "";
  numero.value = "";
}

const buscaCep = async () => {
  let findCep = cep.value.replace(/\D/g, '');
  
  limpaCamposCep();

  let response = await api.get(`http://viacep.com.br/ws/${findCep}/json/`);
  let data = response.data;

  if(data.erro) {
    toast('CEP não encontrado.', {
      type: 'error',
      dangerouslyHTMLString: true
    })
    cep.value = ''
    limpaCamposCep();
  }

  cidade.value = data.localidade;
  estado.value = data.uf;
  complemento.value = data.complemento;
  bairro.value = data.bairro;
  logradouro.value = data.logradouro;

}

const submitForm = () => {
  submitted.value = true
}


</script>
<template>
  <HeaderComponent />
  <FooterComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <div class="bloco-form">
        <div>
          <label for="nomeRazao" class="form-label mb-0">Nome/Razão Social:</label>
          <input
            type="text"
            class="form-control"
            id="nomeRazao"
            v-model="nome"
            style="height: 2.5rem; width: 52.4rem"
          />
        </div>
      </div>
      <div style="display: flex; flex-direction: row; justify-content: space-between">
        <div class="bloco-conteudo">
          <div class="bloco">
            <div>
              <label for="cep" class="form-label mb-0">CEP:</label>
              <input
                type="text"
                class="form-control"
                id="cep"
                v-model="cep"
                style="height: 2.5rem; width: 10rem"
                v-mask="'#####-###'"
                @blur="buscaCep"
              />
            </div>
            <div>
              <label for="cidade" class="form-label mb-0">Cidade:</label>
              <input
                type="text"
                class="form-control"
                id="cidade"
                v-model="cidade"
                style="height: 2.5rem; width: 13rem"
              />
            </div>
            <div>
              <label for="estado" class="form-label mb-0">UF:</label>
              <input
                type="text"
                class="form-control"
                id="estado"
                v-model="estado"
                style="height: 2.5rem; width: 3rem"
              />
            </div>
          </div>
          <div class="bloco">
            <div>
              <label for="complemento" class="form-label mb-0">Complemento:</label>
              <input
                type="text"
                class="form-control"
                v-model="complemento"
                id="complemento"
                style="height: 2.5rem; width: 10rem"
              />
            </div>
            <div>
              <label for="bairro" class="form-label mb-0">Bairro:</label>
              <input
                type="text"
                class="form-control"
                id="bairro"
                v-model="bairro"
                style="height: 2.5rem; width: 18rem"
              />
            </div>
          </div>
        </div>
        <div class="bloco-conteudo" style="width: 42.5rem">
          <div class="bloco">
            <div>
              <label for="cpfCnpj" class="form-label mb-0">CPF/CNPJ:</label>
              <input
                type="text"
                class="form-control"
                id="cpfCnpj"
                v-model="documento"
                style="height: 2.5rem; width: 20rem"
                v-mask="['###.###.###-##', '##.###.###/####-##']"
              />
            </div>
            <div>
              <label for="inscricaoEstadual" class="form-label mb-0">Inscrição Estadual:</label>
              <input
                type="text"
                class="form-control"
                v-model="inscEst"
                id="inscricaoEstadual"
                style="height: 2.5rem; width: 20rem"
              />
            </div>
          </div>
          <div class="bloco">
            <div>
              <label for="logradouro" class="form-label mb-0">Logradouro:</label>
              <input
                type="text"
                class="form-control"
                v-model="logradouro"
                id="logradouro"
                style="height: 2.5rem; width: 35rem"
              />
            </div>
            <div>
              <label for="numero" class="form-label mb-0">Número:</label>
              <input
                type="text"
                class="form-control"
                id="numero"
                v-model="numero"
                style="height: 2.5rem; width: 5rem"
              />
            </div>
          </div>
          <div class="bloco" style="display: flex; justify-content: end; margin-top: 2rem">
            <button class="btn botao-limpar btn-lg">Voltar</button>
            <button class="btn botao-pesquisar mx-3 btn-lg" @click="testeMask">Limpar</button>
            <button class="btn botao-confirmar btn-lg">Inserir</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

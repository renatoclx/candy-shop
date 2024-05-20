<script setup>
import HeaderComponent from '../header/HeaderComponent.vue'
import FooterComponent from '../footer/FooterComponent.vue'
import TitleComponent from '../title/TitleComponent.vue'

import api from '@/config/axios'
import Swal from 'sweetalert2'

import { Money } from 'v-money3'

import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const router = useRouter();
const titleField = ref('Cadastrar Produto')

const isEditMode = computed(() => !!route.params.id);

const maskMoney = ref({
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})

const nomeProduto = ref("");
const precoCusto = ref(0);
const precoVenda = ref(0);
const submitted = ref(false)

const produto = ref({
  id: null,
  nome: '',
  precoCusto: 0,
  precoVenda: 0
});

onMounted(() => {
  if (isEditMode.value) {
    produto.value.id = route.params.id;
    produto.value.nome = route.query.nomeProduto;
    produto.value.precoCusto = parseFloat(route.query.precoCusto);
    produto.value.precoVenda = parseFloat(route.query.precoVenda);

    nomeProduto.value = produto.value.nome;
    precoCusto.value = produto.value.precoCusto;
    precoVenda.value = produto.value.precoVenda;
  }
});

const limparCampos = () => {
  nomeProduto.value = "";
  precoCusto.value = 0;
  precoVenda.value = 0;
}

const submitForm = () => {
  submitted.value = true
}

const salvarProduto = async () => {
  try {
    if(isEditMode.value) {

      let response = await api.put(`/produto/${route.params.id}`, {
        nome: nomeProduto.value,
        precoCusto: precoCusto.value,
        precoVenda: precoVenda.value,
        ativo: 1
      });

      let update = response.data

      Swal.fire({
        title: "Produto " + update.nome + " alterado com sucesso!",
        icon: "success"
        });

      limparCampos();

    } else {
      
        let response = await  api.post(`/produto`, {
          nome: nomeProduto.value,
          precoCusto: precoCusto.value,
          precoVenda: precoVenda.value,
          ativo: 1
        });

        let inserido = response.data;
        console.log(inserido);

        Swal.fire({
          title: inserido,
          icon: "success"
        });

        limparCampos();
          
    }

    router.push("/produtos");
  } catch(e) {
    console.error(e);
  }
}

</script>
<template>
  <HeaderComponent />
  <FooterComponent />
  <div class="principal">
    <div class="conteudo">
      <TitleComponent :title="titleField" />
      <form  @submit.prevent="submitForm">
      <div class="bloco-form">
        <div>
          <label for="nomeProduto" class="form-label mb-0">Nome do Produto:</label>
          <input
            type="text"
            class="form-control"
            id="nomeProduto"
            v-model="nomeProduto"
            style="height: 2.5rem; width: 45rem"
            :class="{ 'is-invalid': nomeProduto === '' && submitted }"
          />
          <div v-if="submitted && nomeProduto === ''" class="invalid-feedback">
              Digite o nome do Produto.
          </div>
        </div>
        <div>
          <label for="precoCusto" class="form-label mb-0">Preço de Custo:</label>
          <Money
            type="text"
            class="form-control"
            id="precoCusto"
            v-model="precoCusto"
            v-bind="maskMoney"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
        <div>
          <label for="precoVenda" class="form-label mb-0">Preço de Venda:</label>
          <Money
            type="text"
            class="form-control"
            v-model="precoVenda"
            id="precoVenda"
            v-bind="maskMoney"
            style="height: 2.5rem; width: 10rem"
          />
        </div>
      </div>
      <div class="bloco" style="display: flex; justify-content: end; margin-top: 2rem">
        <router-link to="/produtos">
          <button class="btn botao-limpar btn-lg" @click="limparCampos">Voltar</button>
        </router-link>
        
        <button class="btn botao-pesquisar mx-3 btn-lg" @click="limparCampos">Limpar</button>
        <button class="btn botao-confirmar btn-lg" @click="salvarProduto" type="submit">Inserir</button>
      </div>
    </form>
    </div>
  </div>
</template>

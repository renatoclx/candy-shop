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


const titleField = ref('Cadastrar Pessoa');

const route = useRoute();
const router = useRouter();
const isEditMode = computed(() => !!route.params.id);

const nome = ref("");
const cep = ref("");
const cidade = ref("");
const estado = ref("");
const documento = ref("");
const inscEst = ref("");
const complemento = ref("");
const bairro = ref("");
const logradouro = ref("");
const numero = ref(null);
const submitted = ref(false)

const cliente = ref({
  id: null,
  nome: '',
  cep: '',
  cidade: '',
  estado: '',
  cpfCnpj: '',
  inscEst: '',
  complemento: '',
  bairro: '',
  logradouro: '',
  numero: null
});

onMounted(() => {
  if (isEditMode.value) {
    console.log(route.query)
    cliente.value.id = route.params.id;
    cliente.value.nome = route.query.nome;
    cliente.value.cep = route.query.cep;
    cliente.value.cidade = route.query.cidade;
    cliente.value.estado = route.query.estado;
    cliente.value.cpfCnpj = route.query.cpf_cnpj;
    cliente.value.inscEst = route.query.insc_estadual;
    cliente.value.complemento = route.query.complemento;
    cliente.value.bairro = route.query.bairro;
    cliente.value.numero = route.query.numero;
    cliente.value.logradouro = route.query.logradouro;

    nome.value = cliente.value.nome;
    cep.value = cliente.value.cep;
    cidade.value = cliente.value.cidade;
    estado.value = cliente.value.estado;
    documento.value = cliente.value.cpfCnpj;
    complemento.value = cliente.value.complemento;
    bairro.value = cliente.value.bairro;
    logradouro.value = cliente.value.logradouro;
    numero.value = cliente.value.numero;
    inscEst.value = cliente.value.inscEst;

  }
});

const limpaCamposCep = () => {
  cidade.value = "";
  estado.value = "";
  complemento.value = "";
  bairro.value = "";
  logradouro.value = "";
  numero.value = null;
}

const limparCampos = () => {
  nome.value = "";
  cep.value = "";
  documento.value = "";
  inscEst.value = ""
  cidade.value = "";
  estado.value = "";
  complemento.value = "";
  bairro.value = "";
  logradouro.value = "";
  numero.value = null;
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
  if (nome.value === "" || cep.value === "" || cidade.value === "" || estado.value === "" || documento.value === "" || bairro.value === "" || logradouro.value === "" || numero.value === "") {
    return false
  }
  return true
}

const salvarCliente = async () => {
  if(!submitted.value) {
    return;
  }
  try {
    if(isEditMode.value) {
      let response = await api.put(`/cliente/${route.params.id}`, {
        nome: nome.value,
        cpfCnpj: documento.value.replace(/\D/g, ''),
        inscEstadual: inscEst.value,
        cep: cep.value.replace(/\D/g, ''),
        logradouro: logradouro.value,
        numero: numero.value,
        bairro: bairro.value,
        complemento: complemento.value,
        cidade: cidade.value,
        estado: estado.value,
        ativo: 1
      });

      let update = response.data

      Swal.fire({
        title: "Cliente " + update.nome + " alterado com sucesso!",
        icon: "success"
        });

      limparCampos();
    } else {

      let response = await api.post(`/cliente`, {
        nome: nome.value,
        cpfCnpj: documento.value.replace(/\D/g, ''),
        inscEstadual: inscEst.value,
        cep: cep.value.replace(/\D/g, ''),
        logradouro: logradouro.value,
        numero: numero.value,
        bairro: bairro.value,
        complemento: complemento.value,
        cidade: cidade.value,
        estado: estado.value,
        ativo: 1
      });

      let inserido = response.data;

      Swal.fire({
        title: inserido,
        icon: "success"
      });

      limparCampos();
    }

    router.push("/clientes");
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
      <form @submit.prevent="submitForm">
        <div class="bloco-form">
          <div>
            <label for="nomeRazao" class="form-label mb-0">Nome/Razão Social:</label>
            <input
              type="text"
              class="form-control"
              id="nomeRazao"
              v-model="nome"
              style="height: 2.5rem; width: 52.4rem"
              :class="{ 'is-invalid': nome === '' && submitted }"
            />
            <div v-if="submitted && nome === ''" class="invalid-feedback">
              Digite o nome do Cliente.
            </div>
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
                  :class="{ 'is-invalid': cep === '' && submitted }"
                />
                <div v-if="submitted && cep === ''" class="invalid-feedback">
                   Digite o CEP do Cliente.
                </div>
              </div>
              <div>
                <label for="cidade" class="form-label mb-0">Cidade:</label>
                <input
                  type="text"
                  class="form-control"
                  id="cidade"
                  v-model="cidade"
                  style="height: 2.5rem; width: 13rem"
                  :class="{ 'is-invalid': cidade === '' && submitted }"
                />
                <div v-if="submitted && cidade === ''" class="invalid-feedback">
                   Digite o cidade do Cliente.
                </div>
              </div>
              <div>
                <label for="estado" class="form-label mb-0">UF:</label>
                <input
                  type="text"
                  class="form-control"
                  id="estado"
                  v-model="estado"
                  style="height: 2.5rem; width: 3rem"
                  :class="{ 'is-invalid': estado === '' && submitted }"
                />
                <div v-if="submitted && estado === ''" class="invalid-feedback">
                  Digite o estado do Cliente.
                </div>
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
                  :class="{ 'is-invalid': bairro === '' && submitted }"
                />
                <div v-if="submitted && bairro === ''" class="invalid-feedback">
                  Digite o bairro do Cliente.
                </div>
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
                  :class="{ 'is-invalid': documento === '' && submitted }"
                />
                <div v-if="submitted && bairro === ''" class="invalid-feedback">
                  Insira um documento válido do Cliente.
                </div>
              </div>
              <div>
                <label for="inscricaoEstadual" class="form-label mb-0">Inscrição Estadual:</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="inscEst"
                  id="inscricaoEstadual"
                  style="height: 2.5rem; width: 20rem"
                  :class="{ 'is-invalid': inscEst === '' && submitted }"
                />
                <div v-if="submitted && bairro === ''" class="invalid-feedback">
                  Insira um Inscrição Estadual do Cliente.
                </div>
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
                  :class="{ 'is-invalid': logradouro === '' && submitted }"
                />
                <div v-if="submitted && bairro === ''" class="invalid-feedback">
                  Insira o logradouro do Cliente.
                </div>
              </div>
              <div>
                <label for="numero" class="form-label mb-0">Número:</label>
                <input
                  type="text"
                  class="form-control"
                  id="numero"
                  v-model="numero"
                  style="height: 2.5rem; width: 5rem"
                  :class="{ 'is-invalid': numero === '' && submitted }"
                />
              </div>
              <div v-if="submitted && numero === ''" class="invalid-feedback">
                  Insira o número de endereço do Cliente.
                </div>
            </div>
            <div class="bloco" style="display: flex; justify-content: end; margin-top: 2rem">
              <router-link to="/clientes">
                <button class="btn botao-limpar btn-lg">Voltar</button>
              </router-link>
              <button class="btn botao-pesquisar mx-3 btn-lg" @click="limparCampos">Limpar</button>
              <button class="btn botao-confirmar btn-lg" @click="salvarCliente">Inserir</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

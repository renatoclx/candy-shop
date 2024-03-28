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
      <div class="bloco-form">
        <div>
          <label for="nomeRazao" class="form-label mb-0">Nome/Razão Social:</label>
          <input
            type="text"
            class="form-control"
            id="nomeRazao"
            style="height: 2.5rem; width: 52.4rem"
          />
        </div>
        <div>
          <label for="inscricaoEstadual" class="form-label mb-0">Inscrição Estadual:</label>
          <input
            type="text"
            class="form-control"
            id="inscricaoEstadual"
            style="height: 2.5rem; width: 20rem"
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
                style="height: 2.5rem; width: 10rem"
              />
            </div>
            <div>
              <label for="estado" class="form-label mb-0">Estado:</label>
              <input
                type="text"
                class="form-control"
                id="estado"
                style="height: 2.5rem; width: 18rem"
              />
            </div>
          </div>
          <div class="bloco">
            <div>
              <label for="complemento" class="form-label mb-0">Complemento:</label>
              <input
                type="text"
                class="form-control"
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
                style="height: 2.5rem; width: 18rem"
              />
            </div>
          </div>
        </div>
        <div class="bloco-conteudo" style="width: 42.5rem">
          <div class="bloco">
            <div>
              <label for="tipoPessoa" class="form-label mb-0">Tipo Pessoa:</label>
              <select id="tipoPessoa" class="form-select" style="width: 20rem">
                <option selected>Selecione...</option>
                <option value="1">Cliente</option>
                <option value="2">Fornecedor</option>
              </select>
            </div>
            <div>
              <label for="cpfCnpj" class="form-label mb-0">CPF/CNPJ:</label>
              <input
                type="text"
                class="form-control"
                id="cpfCnpj"
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
                id="inscricaoPessoa"
                style="height: 2.5rem; width: 35rem"
              />
            </div>
            <div>
              <label for="numero" class="form-label mb-0">Número:</label>
              <input
                type="text"
                class="form-control"
                id="numero"
                style="height: 2.5rem; width: 5rem"
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
    </div>
  </div>
</template>

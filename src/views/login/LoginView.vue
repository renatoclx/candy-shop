<script setup>
  import { toast } from 'vue3-toastify';

  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const usuario = ref("");
  const senha = ref("");
  const submitted = ref(false)

  const submitForm = () => {
    submitted.value = true

    if(usuario.value === "administrador" && senha.value === "@Admin2020") {
      localStorage.setItem('token', senha.value);
      router.push("/");
    } else {
      toast('Verifique suas credenciais.', {
        type: 'error',
        dangerouslyHTMLString: true
      })

      limparCampos();
    }
  }

  const limparCampos = () => {
    usuario.value = "";
    senha.value = "";
}

</script>

<template>
  <div class="login">
    <div class="coluna-logo">
      <div>
        <img src="../../assets/images/logoDoces.png" alt="Renatão Doces" />
      </div>
    </div>
    <div class="coluna-campos">
      <div class="campos-login">
        <h2 class="cor-texto mb-0">Acesso</h2>
        <hr class="border border-1 cor-texto mb-3" style="width: 28rem; margin: 0" />
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="usuario" class="form-label cor-texto">Usuário:</label>
            <input
              id="usuario"
              style="min-width: 28rem"
              class="form-control form-control-lg"
              type="text"
              placeholder="Digite seu Usuário..."
              v-model="usuario"
              :class="{ 'is-invalid':usuario === '' && submitted }"
            />
            <div v-if="submitted && usuario === ''" class="invalid-feedback">
              Digite o nome do usuário.
            </div>
          </div>
          <div class="mb-4">
            <label for="senha" class="form-label cor-texto">Senha:</label>
            <input
              id="senha"
              style="min-width: 28rem"
              class="form-control form-control-lg"
              type="password"
              placeholder="Digite sua senha..."
              v-model="senha"
              :class="{ 'is-invalid':senha === '' && submitted }"
            />
            <div v-if="submitted && senha === ''" class="invalid-feedback">
              Digite sua senha.
            </div>
          </div>
          <div class="botoes">
            <button class="mx-2 btn btn-lg botao-principal" @click="submitForm">Acessar</button>
            <button class="mx-2 btn btn-lg botao-limpar">Limpar</button>
          </div>
      </form>
      </div>
    </div>
  </div>
</template>

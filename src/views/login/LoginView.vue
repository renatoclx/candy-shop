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
        <div class="mb-3">
          <label for="email" class="form-label cor-texto">E-mail:</label>
          <input
            id="email"
            style="min-width: 28rem"
            class="form-control form-control-lg"
            type="text"
            placeholder="Digite seu e-mail..."
          />
        </div>
        <div class="mb-4">
          <label for="senha" class="form-label cor-texto">Senha:</label>
          <input
            id="senha"
            style="min-width: 28rem"
            class="form-control form-control-lg"
            type="password"
            placeholder="Digita sua senha..."
          />
        </div>
        <div class="botoes">
          <button class="mx-2 btn btn-lg botao-principal">Acessar</button>
          <button class="mx-2 btn btn-lg botao-limpar">Limpar</button>
        </div>
      </div>
    </div>
  </div>
</template>

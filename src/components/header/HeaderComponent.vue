<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="cabecalho">
    <p>
      <button
        style="margin-top: 10px"
        class="btn mx-2 rounded-circle menu-btn"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
      >
        <img src="../../assets/icons/MenuIcon.svg" width="25" height="25" />
      </button>
    </p>
    <router-link to="/login">
      <button class="btn botao-limpar mx-4 cor-texto">
        Sair
        <img src="../../assets/icons/SairIcon.svg" width="20" height="20" />
      </button>
    </router-link>

    <div class="menu">
      <div class="collapse collapse-horizontal" id="collapseWidthExample">
        <div
          class="card card-body"
          style="width: 300px; background-color: #a1d4b7; border: 0; border-radius: 2px"
        >
          <ul style="list-style: none; margin-bottom: 0">
            <li>
              <router-link to="/clientes">
                <span class="item-menu mb-1">
                  <img src="../../assets/icons/UserIcon.svg" width="20" height="20" class="mx-2" />
                  Cadastrar Pessoas
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/produtos">
                <span class="item-menu mb-1">
                  <img
                    src="../../assets/icons/ProductIcon.svg"
                    width="20"
                    height="20"
                    class="mx-2"
                  />
                  Cadastrar Produtos
                </span>
              </router-link>
            </li>
            <li>
              <router-link to="/vendas">
                <span class="item-menu mb-1">
                  <img src="../../assets/icons/SaleIcon.svg" width="20" height="20" class="mx-2" />
                  Pedido de Venda
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <slot></slot>
</template>

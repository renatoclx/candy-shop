<script setup>
const props = defineProps({
  title: String
})
</script>
<template>
  <div style="min-height: 8rem"></div>
  <h2 class="mb-0 cor-texto-cabecalho">{{ props.title }}</h2>
  <hr class="border border-1 cor-texto mb-3" style="width: 100%; margin: 0" />
</template>

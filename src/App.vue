<script setup>
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const defaultLayout = 'main-layout'

const { currentRoute } = useRouter()

const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}`)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped></style>

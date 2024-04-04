<script setup>
const props = defineProps({
  fields: {
    type: Array
  },
  data: {
    type: Array
  }
})
</script>
<template>
  <table id="tableComponent" class="table table-striped">
    <thead>
      <tr>
        <th v-for="field in props.fields" :key="field">
          {{ field }}
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data" :key="item">
        <td v-for="field in fields" :key="field">
          {{ item[field] }}
        </td>
        <td style="width: 250px">
          <button class="btn botao-pesquisar">
            <img src="../../assets/icons/ViewIcon.svg" alt="" width="15" height="15" />
          </button>
          <button class="btn botao-alterar mx-2">
            <img src="../../assets/icons/PenIcon.svg" alt="" width="15" height="15" />
          </button>
          <button class="btn botao-limpar">
            <img src="../../assets/icons/RemoveIcon.svg" alt="" width="15" height="15" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

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
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data" :key="item">
        <td v-for="field in fields" :key="field">
          {{ item[field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

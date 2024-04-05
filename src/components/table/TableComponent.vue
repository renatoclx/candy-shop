<script setup>
const props = defineProps({
  fields: Array,
  data: Array,
  columnNames: Array
})
</script>
<template>
  <table id="tableComponent" class="table table-striped">
    <thead>
      <tr style="vertical-align: middle">
        <th v-for="(columnName, index) in props.columnNames" :key="index">
          {{ columnName }}
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr style="vertical-align: middle" v-for="(item, itemIndex) in props.data" :key="itemIndex">
        <td v-for="(field, fieldIndex) in props.fields" :key="fieldIndex">
          {{ item[field] }}
        </td>
        <td style="width: 250px">
          <button class="btn botao-pesquisar">
            <img src="../../assets/icons/ViewIcon.svg" alt="Visualizar" width="15" height="15" />
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

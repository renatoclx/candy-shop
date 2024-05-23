<script setup>
const props = defineProps({
  fields: Array,
  data: Array,
  columnNames: Array,
  isVenda: Boolean
})

const emit = defineEmits(['delete', 'update']);

const deleteItem = (id) => {
  emit("delete", id)
}

const updateItem = (id) => {
  emit("update", id)
}

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

          <button class="btn botao-alterar mx-2" v-if="!isVenda" >
            <img src="../../assets/icons/PenIcon.svg" alt="" width="15" height="15" @click="updateItem(item.id)" />
          </button>
          <button class="btn botao-limpar">
            <img src="../../assets/icons/RemoveIcon.svg" alt="" width="15" height="15" @click="deleteItem(isVenda ? item.vendaId : item.id)"/>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<template>
  <tr>
    <td>
      <pre>{{ name }}</pre>
    </td>
    <td>
      <pre>{{ type }}</pre>
    </td>
    <td>{{ prop.default }}</td>
  </tr>
</template>

<script>
export default {
  name: 'props-table-row',
  props: {
    prop: Object,
    name: String
  },
  computed: {
    type () {
      return typeof this.prop.type()
    }
  }
}
</script>
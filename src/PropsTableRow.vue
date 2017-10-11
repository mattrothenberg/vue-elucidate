<template>
  <tr>
    <td class="prop-name">{{ name }}</td>
    <td class="prop-type">
      <pre>{{ type }}</pre>
    </td>
    <td class="prop-default">
      <div v-if="defaultVal.length > 100">
        <collapsible-code-snippet :code="defaultVal"></collapsible-code-snippet>
      </div>
      <div v-else>
        <pre>{{ defaultVal }}</pre>
      </div>
    </td>
  </tr>
</template>

<script>
import CollapsibleCodeSnippet from './CollapsibleCodeSnippet.vue'

export default {
  name: 'props-table-row',
  props: {
    prop: null,
    name: String
  },
  components: {
    CollapsibleCodeSnippet
  },
  computed: {
    defaultVal () {
      if (typeof(this.prop.default) !== 'undefined') {
        if (typeof(this.prop.default) === 'function') return JSON.stringify(this.prop.default(), null, 2)
        return this.prop.default
      }
      return 'undefined'
    },
    type () {
      if (typeof(this.prop.type) === 'undefined') return 'any'
      let type = typeof(this.prop.type())
      if (type === 'object') {
        if (Array.isArray(this.prop.type())) return 'array'
      }
      return type
    }
  }
}
</script>
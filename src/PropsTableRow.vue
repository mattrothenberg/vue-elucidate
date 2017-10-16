<template>
  <tr>
    <td class="elucidate-prop-name">{{ name }}</td>
    <td class="elucidate-prop-type">
      <pre>{{ type }}</pre>
    </td>
    <td class="elucidate-prop-default">
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
      try {
        let type = typeof(this.prop.type())
        if (type === 'object') {
          if (Array.isArray(this.prop.type())) return 'array'
        }
        return type
      } catch (e) {
        console.warn(this.prop, e)
        return 'n/a'
      }
    }
  }
}
</script>
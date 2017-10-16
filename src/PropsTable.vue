<template>
  <div class="elucidate-table-wrap">
    <table class="elucidate-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
        </tr>
      </thead>
      <tbody>
        <props-table-row
          :prop="propDef"
          :name="propName"
          v-for="(propDef, propName, index) in propsList" :key="index">
        </props-table-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import PropsTableRow from './PropsTableRow.vue'

export default {
  name: 'props-table',
  components: {
    PropsTableRow
  },
  props: {
    component: {
      type: Object
    }
  },
  data () {
    return {
      propsList: this.component.props
    }
  }
}
</script>

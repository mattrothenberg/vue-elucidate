<template>
  <div class="props-table-wrap">
    <table class="props-table">
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

<style>
  .props-table-wrap {
    overflow: auto;
  }

  .props-table {
    border-collapse: collapse;
    border-spacing: 0;
    overflow: auto;
    width: 100%;
  }

  .props-table th {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding: .5rem 0;
    text-align: left;
  }

  .props-table td {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding: .5rem 0;
  }

</style>

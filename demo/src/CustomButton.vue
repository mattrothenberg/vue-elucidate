<template>
  <button :class="classList">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'custom-button',
    props: {
      variant: {
        type: String,
        default: 'primary'
      },
      size: {
        type: String,
        default: 'medium'
      }
    },
    computed: {
      classList () {
        return `btn-${this.variant} btn-${this.size}`
      }
    }
  }
</script>

<style>
  .btn-primary {
    background: blue;
    color: white;
  }

  .btn-small {
    font-size: 12px;
  }

  .btn-medium {
    font-size: 16px;
  }
</style>
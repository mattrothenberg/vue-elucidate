<template>
  <div class="code-snippet-wrap" :class="{'collapsed': collapsed}">
    <pre><code>{{code}}</code></pre>
    <div class="code-snippet-toggle-wrap">
      <button class="code-snippet-toggle" @click="toggle">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'collapsible-code-snippet',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      collapsed: true 
    }
  },
  methods: {
    toggle () {
      this.collapsed = !this.collapsed
    }
  },
  computed: {
    buttonText () {
      return this.collapsed
      ? 'Expand snippet'
      : 'Collapse Snippet'
    }
  }
}
</script>

<style>
  .code-snippet-wrap {
    border: 1px solid rgba(0, 0, 0, .1);
    padding: .5rem;
    position: relative;
  }

  .code-snippet-wrap pre {
    margin: 0;
  }

  .code-snippet-toggle-wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: .5rem 0;
    pointer-events: none;
    text-align: center;
  }

  .code-snippet-toggle {
    background: #222;
    color: white;
    border: 0;
    font-weight: 500;
    border-radius: .5rem;
    pointer-events: all;
  }

  .collapsed {
    height: 100px;
    overflow-y: hidden;
  }
</style>

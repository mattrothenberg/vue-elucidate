<template>
  <div class="example-picker">
    <label>Example</label>
    <div class="custom-select">
      <select @change="handleChange">
        <option v-for="(name, index) in names" :key="index" :value="name">
          {{ name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'example-picker',
    props: {
      names: {
        type: Array
      }
    },
    methods: {
      handleChange (e) {
        this.$emit('example-change', e.target.value)
      }
    }
  }
</script>

<style>
  .example-picker {
    margin-bottom: 1rem;
  }

  .example-picker label {
    display: block;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: .5rem;
  }

  .custom-select {
    position: relative;
    display: block;
  }

  .custom-select select {
    width: 100%;
    margin: 0;
    outline: none;
    padding: .5rem;
    box-sizing: border-box;
    font-size: 16px;
  }

  .custom-select::after {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 80%;
    width: 24px;
    height: 100%;
    content: "";
    position: absolute;
    opacity: .5;
    right: 1em;
    top: 0;
    z-index: 2;
    pointer-events: none;
    display: none;
  }

  @supports (-webkit-appearance: none) or (appearance: none) or ((-moz-appearance: none) and (mask-type: alpha)) {
    .custom-select::after {
      display: block;
    }
    .custom-select select {
      padding-right: 2em;
      background: none;
      border: 1px solid rgba(0, 0, 0, .10);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
    .custom-select select:focus {
      border-color: rgba(0, 0, 0, .20);
    }
  }
</style>

import Prism from 'prismjs'
export let prism = {
  inserted: function(el, binding) {
    Prism.highlightElement(el)
  }
}

<template>
  <component :is="type" v-bind="linkProps(path)">
    <slot></slot>
  </component>
</template>

<script>
import {isExternal} from '@/utlis/validate.js'
export default {
  props: ['path'],
  computed: {
    type: function() {
      if(isExternal(this.path)) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps(path) {
      if(isExternal(path)) {
        return {
          href: path,
          target: '_blank'
        }
      }
      return {
        to: path
      }
    }
  }
}
</script>

<style>

</style>

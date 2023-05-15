<template>
  <div class="menu-item">
    <svg-icon :icon-class="icon"></svg-icon>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  props: ['icon', 'title']
}
</script>

<style>

</style>

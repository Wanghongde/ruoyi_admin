<template>
  <div class="layout-box">
    <side-bar></side-bar>

    <div class="main-app-box">
      <div>
        <nav-bar></nav-bar>
        <tags-view></tags-view>
      </div>

      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import AppMain from './components/AppMain'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import TagsView from './components/TagsView'

export default {
  components: {
    AppMain,
    NavBar,
    SideBar,
    TagsView
  }
}
</script>

<style lang="scss" scoped>
.layout-box {
  width: 100%;
  height: 100%;
  .main-app-box {
    margin-left: 200px;
    min-height: 100%;
  }
}
</style>

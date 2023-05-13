<template>
  <div class="layout-box">
    <side-bar></side-bar>

    <div>
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

<style>

</style>

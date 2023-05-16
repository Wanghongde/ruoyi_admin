<template>
  <div class="layout-box" :class="{'collapse-box': isCollapse}">
    <side-bar class="sidebar-box" :isCollapse="isCollapse"></side-bar>

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
import { mapState } from 'vuex'

export default {
  components: {
    AppMain,
    NavBar,
    SideBar,
    TagsView
  },
  computed: {
    ...mapState({
      isCollapse: state => state.app.isActive
    }),
  }
}
</script>

<style lang="scss">
.layout-box {
  width: 100%;
  height: 100%;
  .main-app-box {
    margin-left: 200px;
    min-height: 100%;
  }
}

.collapse-box {
  .sidebar-box{
    width: 56px;
  }
  .main-app-box {
    margin-left: 56px;
  }
  .menu-item span,
  .el-submenu__icon-arrow {
    font-size: 0!important;
  }
  .logo-box .logo-link {
    justify-content: center;
    img {
      margin-right: 0!important;
    }
    .logo-title {
      font-size: 0!important;
    }
  }

}
</style>

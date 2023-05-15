<template>
  <div class="sidebar-box">
    <logo></logo>
    <el-scrollbar class="scroll-box">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :background-color="globalColor.menuBackground"
        text-color="#fff"
        :unique-opened="true"
        :collapse="isCollapse"
        active-text-color="#ffd04b">
        <side-bar-item
          v-for="(item, index) in siderbarRouters"
          :key="index"
          :item="item"
          :basePath="item.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from '../Logo'
import SideBarItem from './side-bar-item.vue'
import globalColor from '@/styles/variables.module.scss'
import { mapGetters } from 'vuex'

export default {
  components: {
    Logo,
    SideBarItem
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed:{
    ...mapGetters(['siderbarRouters']),
    globalColor() {
      return globalColor
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.sidebar-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  color: #fff;
  background-color: $base-menu-background;
  .scroll-box {
    height: 100%;
  }
  .el-menu {
    border-right: unset;
  }
}
</style>

<template>
  <div class="navbar-box">
    <hamburger class="hanmburger" :isActive="isActive" @toggleClick="toggleSideBar"/>
    <breadcrumb class="breadcrumb" />
    <div class="right-menu">
      退出
    </div>
  </div>
</template>

<script>
import Hamburger from './hamburger.vue'
import Breadcrumb from './breadcrumb.vue'

export default {
  data() {
    return {
      isActive: false
    }
  },
  components: {
    Hamburger,
    Breadcrumb
  },
  methods: {
    toggleSideBar() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-box {
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  .hanmburger,
  .breadcrumb {
    float: left;
    line-height: 46px;
    margin-left: 10px;
    padding: 0 15px;
    cursor: pointer;
    user-select: none;
  }
  .hanmburger{
    display: flex;
    height: 100%;
    align-items: center;
  }
  .right-menu {
    float:  right;
    line-height: 46px;
  }
}
</style>

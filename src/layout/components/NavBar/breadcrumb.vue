<template>
  <el-breadcrumb separator="|" class="breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
      <span v-if="true">{{item.meta.title}}</span>
      <a v-else href="/">{{item.meta.title}}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route (route) {
      this.getLevelList()
    }
  },
  created() {
    this.getLevelList()
  },
  methods: {
    getLevelList() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)

      const first = matched[0]

      if (!this.isDashboard(first)) {
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }

      this.levelList = matched
    },
    isDashboard(route) {
      const name = route && route.name
      if(!name) {
        return false
      }

      return name.trim() === 'Index'
    }
  }
}
</script>

<style lang="scss">
.breadcrumb {
  height: 50px!important;
  line-height: 50px!important;
  padding: 0!important;
  .el-breadcrumb__item {
    height: 50px!important;
  }
}
</style>

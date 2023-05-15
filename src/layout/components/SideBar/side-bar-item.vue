<template>
  <div class="side-bar-item">
    <div v-if="!item.hidden">
      <app-link v-if="!item.children" :path="basePath">
        <el-menu-item :index="basePath">
          <menu-item :icon="item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </app-link>

      <el-submenu v-else :index="basePath">
        <template slot="title">
          <menu-item :icon="item.meta.icon" :title="item.meta.title" />
        </template>
        <side-bar-item
          v-for="(route, index) in item.children"
          :key="index"
          :item="route"
          :basePath="resolvePath(route.path)"
        />
      </el-submenu>
    </div>
  </div>
</template>

<script>
import MenuItem from './menu-item.vue'
import AppLink from './app-link.vue'
import path from 'path'

export default {
  name: 'sideBarItem',
  components: {
    MenuItem,
    AppLink
  },
  props: {
    item: {
      required: true,
      type: Object
    },
    basePath: {
      required: true,
      default: '/'
    }
  },
  methods: {
    resolvePath(url) {
      return path.resolve(this.basePath, url)
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="side-bar-item">
    <div v-if="!item.hidden" >
      <template v-if="hasOneShowChild(item.children, item)">
        <app-link :path="resolvePath(onlyOneChild.path)">
          <el-menu-item :index="basePath">
            <menu-item :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
          </el-menu-item>
        </app-link>
      </template>

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
  data() {
    return {
      onlyOneChild: ''
    }
  },
  methods: {
    resolvePath(url) {
      return path.resolve(this.basePath, url)
    },
    hasOneShowChild(children, parent) {
      if (!children) {
        children = []
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: ''
        }
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>

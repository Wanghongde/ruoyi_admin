<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'is-active-tag' : ''"
        tag="span"
        :to="{path: tag.path}"
        class="tags-view-item"
      >
        {{tag.title}}
        <span class="el-icon-close" @click.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ScrollPane from './scrollPane.vue'

export default {
  components: {
    ScrollPane
  },
  mounted() {
    this.getTags()
  },
  watch: {
    $route() {
      this.getTags()
    }
  },
  computed: {
    ...mapState({
      visitedViews: state => state.tagsview.visitedViews
    })
  },
  methods: {
    ...mapActions(['addView', 'delView']),
    getTags() {
      const { name } = this.$route
      if(name) {
        this['addView'](this.$route)
      }
    },
    isActive(item) {
      return item.path === this.$route.path
    },
    closeSelectedTag(item) {
      this['delView'](item)
    }
  }
}
</script>

<style lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      padding: 0 8px;
      margin-left: 5px;
      margin-top: 4px;
      user-select: none;
      cursor: pointer;
      color: #495060;
      font-size: 12px;
      background: #fff;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.is-active-tag {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        text-align: center;
        vertical-align: 2px;
        &:before {
          transform: scale(0.6);
          vertical-align: -2px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>

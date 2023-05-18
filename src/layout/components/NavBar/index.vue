<template>
  <div class="navbar-box">
    <hamburger class="hanmburger" :isActive="isActive" @toggleClick="toggleSideBarFn"/>
    <breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <img class="avatar" :src="avatar"/>
      <div class="user-welcome">
        {{name}}, 欢迎光临
      </div>
      <div class="logout" @click="logoutFn">
        退出
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from './hamburger.vue'
import Breadcrumb from './breadcrumb.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { logout } from '@/api/user'
import { removeToken } from '@/utlis/auth'

export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapState({
      isActive: state => state.app.isActive
    }),
    ...mapGetters(['name', 'avatar'])
  },
  methods: {
    ...mapMutations(['toggleSideBar']),
    toggleSideBarFn() {
      this['toggleSideBar']()
    },
    logoutFn() {
       this.$router.push('/login').catch(err => {})
      this.$alert('确认退出嘛', '退出', {
        confirmButtonText: '确定',
        callback: async action => {
          if(action === 'confirm') {
            const { data: {msg} } = await logout()

            removeToken()
            this.$router.push('/login')

            this.$message({
              type: 'success',
              message: msg
            })
          } else {
             this.$message({
              type: 'info',
              message: '取消退出'
            })
          }

        }
      })
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
    display: flex;
    align-items: center;
    float:  right;
    line-height: 46px;
    margin-right: 20px;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      margin-right: 10px;
    }
    .logout {
      user-select: none;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>

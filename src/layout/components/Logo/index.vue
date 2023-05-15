<template>
  <div class="logo-box">
    <router-link class="logo-link" to="/">
      <img class="logo-icon" :src="logoImg" alt="">
      <h1 class="logo-title">{{title}}</h1>
    </router-link>
  </div>
</template>

<script>
import logoImg from '@/assets/user/logo.png'

export default {
  data() {
    return {
      logoImg,
      title: '后台管理系统'
    }
  }
}
</script>

<style lang="scss" scoped>
.logo-box {
  width: 100%;
  height: 50px;
  .logo-link {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .logo-icon {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .logo-title {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>

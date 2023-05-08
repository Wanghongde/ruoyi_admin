<template>
  <div class="login-container">
    登录
  </div>
</template>

<script>
import { getCodeImg } from '@/api/user'
export default {
  name: 'login-container',
  created () {
    this.getCodeImgFn()
  },
  methods: {
    async getCodeImgFn () {
      const data = await getCodeImg()

      console.log(data)
    }
  }
}
</script>

<style>

</style>

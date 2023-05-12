<template>
  <div class="login-container">
    <el-form :rules="rules" class="form-box" ref="form" :model="form" >
      <h1 class="title">后台管理系统</h1>
      <el-form-item prop="username">
        <el-input v-model="form.username" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="code" class="code-box">
        <el-input v-model="form.code" prefix-icon="el-icon-connection" class="code-input" placeholder="验证码"></el-input>
        <img :src="codeImg" alt="" @click="getCodeImgFn">
      </el-form-item>
      <el-form-item class="isRemenber-box">
        <el-checkbox v-model="isRemenber">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/user'
import { mapActions } from 'vuex'
import { setToken, removeToken } from '@/utlis/auth'

export default {
  name: 'login-container',
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin',
        code: '',
        uuid: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      codeImg: '',
      isRemenber: false
    }
  },
  created () {
    this.getCodeImgFn()
  },
  methods: {
    ...mapActions(['Login']),
    async getCodeImgFn () {
      const { data } = await getCodeImg()
      this.codeImg = 'data:image/gif;base64,' + data.img
      this.form.uuid = data.uuid
    },
    onLogin() {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return
        }

        if(this.isRemenber) {
          setToken('login_form', JSON.stringify(this.form))
        } else {
          removeToken('login_form')
        }

        try {
          await this.Login(this.form)
          this.$router.push('/')
        } catch(e) {
          this.getCodeImgFn()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("@/assets/login_bg.jpeg");
  background-size: cover;

  .form-box {
    width: 400px;
    background: #fff;
    padding: 25px 25px 0;
    border-radius: 5px;
    .title{
      text-align: center;
      margin-bottom: 20px;
      user-select: none;
    }
    .login-btn {
      width: 100%;
    }
    .isRemenber-box {
      line-height: 30px;
      margin-bottom: 0;
    }
    .code-box {
      :deep(.el-form-item__content) {
        display: flex;
        .code-input {
          width: 60%;
          margin-right: 20px;
        }
      }
      img {
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>

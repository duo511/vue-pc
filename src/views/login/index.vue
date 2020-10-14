<template>
  <div class="login-container">
    <div class="login-form-wrap">

      <div class="logo-head">
        <div class="logo"></div>
      </div>

      <el-form ref='form' class="login-form" :model='form' :rules='rules'>
        <el-form-item prop='mobile'>
          <el-input  placeholder="请输入手机号" v-model='form.mobile'></el-input>
        </el-form-item>

        <el-form-item prop='code'>
          <el-input placeholder="请输入验证码" v-model='form.code'></el-input>
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click='login' class="login-btn" type='primary'>登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { reqUserLogin } from '@/api/user.js'
import { setUser } from '@/api/storage.js'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: ['blur', 'change'] }
        ],
        agree: [
          {
            validator: function (rule, value, callback) {
              if (value === false) {
                callback(new Error('请同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(flag => {
        if (flag) {
          reqUserLogin(this.form.mobile, this.form.code).then((res) => {
            this.$message.success('登陆成功')
            setUser(res.data.data)
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('登陆失败, 手机号或者验证码错误')
          })
        }
      })
    }
  }
}

</script>

<style lang='less'>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/login_bg.jpg') no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    background-color: #ffffff;
    padding: 30px 50px 10px;
    .logo-head {
      display: flex;
      justify-content: center;
      .logo {
        width: 200px;
        height: 57px;
        background: url('../../assets/logo_index.png') no-repeat;
        background-size: contain;
      }
    }
    .login-form {
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>

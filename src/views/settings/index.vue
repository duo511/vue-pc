<template>
  <div class="settings">
    <el-card>
      <template c-slot:header>
        <my-breadcrumb>个人设置</my-breadcrumb>
      </template>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="changeUserInfo" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request='uploadPhoto'
            :show-file-list="false">
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqGetUserInfo, reqModUserInfo, reqModUserImage } from '@/api/user.js'
export default {
  name: 'settings',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        id: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    async loadUser () {
      try {
        const res = await reqGetUserInfo()
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async changeUserInfo () {
      try {
        const { name, intro, email } = this.userInfo
        await reqModUserInfo({ name, intro, email })
        this.$eventBus.$emit('update_user_name', this.userInfo.name)
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
        this.$message.error('修改失败')
      }
    },
    async uploadPhoto (obj) {
      console.log(obj)
      try {
        const formData = new FormData()
        formData.append('photo', obj.file)
        const res = await reqModUserImage(formData)
        this.userInfo.photo = res.data.data.photo
        this.$eventBus.$emit('update_user_photo', this.userInfo.photo)
        this.$message.success('上传头像成功')
      } catch (err) {
        console.log(err)
        this.$message.error('上传头像失败')
      }
    }
  }
}
</script>
<style scoped lang='less'>
.avatar{
  width: 178px;
  height: 178px;
  line-height: 178px;
}
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.edit-photo{
  font-size: 12px;
  text-align: center;
}
</style>

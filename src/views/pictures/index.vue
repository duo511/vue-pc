<template>
  <div class="picture">
    <el-card class="box-card">
      <template v-slot:header>
        <my-breadcrumb>素材管理</my-breadcrumb>
      </template>
      <div>
        <el-radio-group size="midium" v-model="collect" @change="changeCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="showUpload" style="float: right" type="success" size="medium" >上传图片素材
        </el-button>
        <el-dialog :append-to-body='true' :visible.sync="dialogVisible" title="选择图片素材" width="30%" >
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            name="image"
            :action="$http.defaults.baseURL + '/mp/v1_0/user/images'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-image @load='handleLoad' v-if="imageUrl" :src="imageUrl" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-dialog>
      </div>
      <el-row :gutter="10">
        <el-col v-for="item in images" :key="item.id" class="img_item"
          :xs="12" :sm="8" :md="6" :lg="4" :xl="4" >
          <el-image
            style="width: 100%; height: 180px"
            :src="item.url"
            fit="cover"
          ></el-image>
          <div class="option">
            <i @click="switchCollect(item.id, item.is_collected)" :class='{yellow: item.is_collected}' class="el-icon-star-off"></i>
            <i @click="deleteImage(item.id)" class="el-icon-delete"></i>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :page-size="per_page"
        :current-page="currentPage"
        :total="total_count"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { getUser } from '@/utils/storage.js'
import { reqGetImages, reqSwitchCollect, reqDelImage } from '@/api/pictures.js'
export default {
  name: 'Pictures',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      images: [],
      total_count: 0,
      per_page: 6,
      currentPage: 1,
      collect: false,
      dialogVisible: false,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      }
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    async loadImages () {
      try {
        const res = await reqGetImages({
          per_page: this.per_page,
          page: this.currentPage,
          collect: this.collect
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.loadImages()
    },
    changeCollect () {
      this.currentPage = 1
      this.loadImages()
    },
    async switchCollect (id, collect) {
      try {
        await reqSwitchCollect(id, !collect)
        this.$message.success('操作成功')
        this.loadImages()
      } catch (err) {
        this.$message.error('操作失败')
      }
    },
    async deleteImage (id) {
      try {
        await reqDelImage(id)
        this.$message.success('操作成功')
        // 如果删除到了当前页的最后一张, 应该渲染的是上一页
        if (this.images.length === 1 && this.currentPage > 1) {
          this.currentPage--
        }
        this.loadImages()
      } catch (err) {
        this.$message.error('操作失败')
      }
    },
    showUpload () {
      this.dialogVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      this.loadImages()
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleLoad () {
      setTimeout(() => {
        this.dialogVisible = false
        this.imageUrl = null
      }, 2000)
    }
  }
}
</script>

<style lang='less' scoped>
.el-radio-group {
  margin-bottom: 15px;
}
.img_item {
  position: relative;
  box-sizing: border-box;
}
.option {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  left: 5px;
  right: 5px;
  bottom: 5px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  i {
    margin: 0 30px;
    cursor: pointer;
  }
  i.yellow {
    color: yellow;
  }
}
.avatar-uploader {
  text-align: center;
}
  .avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.el-pagination {
  margin-top: 20px;
}
</style>

<template>
  <div class="my-cover">
    <div class="btn_img" @click="openDialog">
      <img :src="value || coverImgUrl" alt="">
    </div>

    <el-dialog
      title="选择封面"
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 全部收藏按钮 -->
          <el-radio-group @change="changeCollect" size="medium" v-model="collect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片 -->
          <el-row  class="img_list" >
            <el-col :class="{ select: item.url === selectImageUrl }" v-for="item in images" :key="item.id" class="img_item" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
              <el-image @click.native="imageClick(item.url)" :src="item.url" fit="cover"></el-image>
            </el-col>
          </el-row>
          <!-- 切换栏 -->
          <el-pagination
            @current-change="currentChange"
            layout="prev, pager, next"
            background
            :page-size="per_page"
            :current-page="currentPage"
            :total="total_count">
          </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL  + '/mp/v1_0/user/images'"
            :show-file-list="false"
            :headers="headers"
            name="image"
            :on-success="handleSuccess">
            <el-image v-if="imageUrl" :src='imageUrl' class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="handleConfirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqGetImages } from '@/api/pictures.js'
import { getUser } from '@/utils/storage.js'
import defaultImg from '@/assets/default.png'
export default {
  name: 'MyCover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      images: [],
      collect: false,
      per_page: 4,
      currentPage: 1,
      total_count: 0,
      selectImageUrl: null,
      imageUrl: '',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      coverImgUrl: defaultImg
    }
  },
  props: ['value'],
  methods: {
    openDialog () {
      this.dialogVisible = true
      this.loadImage()
    },
    async loadImage () {
      try {
        const res = await reqGetImages({
          collect: this.collect,
          per_page: this.per_page,
          page: this.currentPage
        })
        this.images = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    changeCollect () {
      this.currentPage = 1
      this.loadImage()
    },
    currentChange (index) {
      this.currentPage = index
      this.loadImage()
    },
    imageClick (url) {
      this.selectImageUrl = url
    },
    handleSuccess (res, file) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    handleConfirm () {
      if (this.activeName === 'image') {
        if (!this.selectImageUrl) {
          this.$message.error('请先选中一张图片')
          return
        }
        this.coverImgUrl = this.selectImageUrl
      }
      if (this.activeName === 'upload') {
        if (!this.imageUrl) {
          this.$message.error('请先上传一张图片')
          return
        }
        this.coverImgUrl = this.imageUrl
      }
      this.$emit('input', this.coverImgUrl)
      this.dialogVisible = false
    }
  }

}
</script>

<style lang='less' scoped>
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.img_list {
  margin: 15px 0 10px 0;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin: 0 8px;
    position: relative;
    .el-image {
      width: 100%;
      height: 100%;
    }
  }
  .select::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
  }
}
.avatar-uploader {
  text-align: center;
  .el-image {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>

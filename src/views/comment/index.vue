<template>
  <div class="comment">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>评论管理</my-breadcrumb>
      </template>
        <el-table :data="comments" >
          <el-table-column prop="title" label="文章标题">
          </el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数">
          </el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>
          <el-table-column label="评论状态">
            <template v-slot:default='obj'>
              {{ obj.row.comment_status ? '关闭': '开启' }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot:default='obj'>
              <el-button @click="commentStatus(obj.row)" v-if="obj.row.comment_status" type="success">打开评论</el-button>
              <el-button @click="commentStatus(obj.row)" v-else type="danger">关闭评论</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          background
          :page-size="per_page"
          :current-page="page"
          :total="total_count">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqGetComment, reqCommentStatus } from '@/api/comment.js'
export default {
  name: 'Comment',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      page: 1,
      per_page: 10,
      total_count: 0,
      comments: []
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    async loadComments () {
      try {
        const res = await reqGetComment(this.page, this.per_page)
        this.comments = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (index) {
      this.page = index
      this.loadComments()
    },
    async commentStatus (row) {
      try {
        await reqCommentStatus(row.id.toString(), !row.comment_status)
        this.$message.success('操作成功')
        this.loadComments()
      } catch (err) {
        console.log(err)
        this.$message.error('操作失败')
      }
    }
  }
}
</script>

<style>

</style>

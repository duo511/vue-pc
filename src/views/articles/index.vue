<template>
  <div class="article">
    <!-- 上边表单 -->
    <el-card class="box-card">
      <template v-slot:header>
        <my-breadcrumb>内容管理</my-breadcrumb>
      </template>

      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">以删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="频道">
          <my-channel v-model="form.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            value-format='yyyy-MM-dd'
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 下边表格 -->
    <el-card class="box-card">
      <template v-slot:header>
        <div>根据筛选条件共查询到 {{ total_count }} 条结果, 当前是第 {{ currentPage }} 页</div>
      </template>
      <el-table v-loading='loading' :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template v-slot:default='obj'>
            <el-image style="width: 150px; height: 100px" :src="obj.row.cover.images[0]" fit="cover">
              <div slot="error" class="image-slot">
                <img style="width: 150px; height: 100px" src="../../assets/error.gif" alt="">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" >
        </el-table-column>
        <el-table-column label="状态">
          <template v-slot:default='obj'>
            <el-tag v-if="obj.row.status===0">草稿</el-tag>
            <el-tag v-if="obj.row.status===1" type="info">待审核</el-tag>
            <el-tag v-if="obj.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="obj.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="obj.row.status===4" type="danger">以删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column  prop="pubdate" label="发布时间">
        </el-table-column>
        <el-table-column  label="操作">
          <template v-slot:default='obj'>
            <el-button @click="edit(obj.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="del(obj.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change='handleCurrentChange' background layout="prev, pager, next" :current-page="currentPage" :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { reqGetArticles, reqDelArticle } from '@/api/articles.js'
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  name: 'Articles',
  data () {
    return {
      form: {
        region: '',
        date: [],
        status: null,
        channel_id: ''
      },
      articles: [],
      total_count: 0,
      currentPage: 1,
      loading: false,
      query: {
        begin_pubdate: null,
        end_pubdate: null,
        status: null,
        channel_id: null
      }
    }
  },
  components: {
    MyBreadcrumb,
    MyChannel
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      this.loading = true
      reqGetArticles({
        page: this.currentPage,
        ...this.query
      }).then(res => {
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
        this.loading = false
      })
    },
    del (id) {
      const articleId = id.toString()
      this.$confirm('你确定要删除么?', '温馨提示', {
        type: 'warning'
      }).then(() => {
        reqDelArticle(articleId).then(res => {
          this.$message.success('删除成功')
          this.loadArticles()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
      })
    },
    edit (id) {
      const articleId = id.toString()
      this.$router.push(`/edit-article/${articleId}`)
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.loadArticles()
    },
    search () {
      this.currentPage = 1
      const [beginPubdate, endPubdate] = this.form.date || []
      this.query = {
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        status: this.form.status,
        channel_id: this.form.channel_id || null
      }
      this.loadArticles()
    }
  }
}
</script>

<style lang='less'>
.article {
  .el-card:nth-child(1) {
    margin-bottom: 20px;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>

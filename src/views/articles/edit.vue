<template>
  <div class="edit-article">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>发布文章</my-breadcrumb>
      </template>

      <el-form ref="myform" :rules='rules' :model="form" label-width="60px">
        <el-form-item label='标题' prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label='内容' prop="content">
          <quill-editor @blur="quillFn" @change='quillFn' :options="editorOption" v-model="form.content"></quill-editor>
        </el-form-item>
        <el-form-item label='封面'>
          <el-radio-group @change="changeType" v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="cover-box" v-if="form.cover.type > 0" :key="form.cover.type">
            <my-cover v-for="(item, index) in form.cover.type" :key="index" class="my-cover" v-model="form.cover.images[index]"></my-cover>
          </div>
          <div class="cover-box" v-if="form.cover.type === -1">
            <my-cover v-for="(item, index) in (form.cover.images.length + 1)" :key="index" class="my-cover" v-model="form.cover.images[index]"></my-cover>
          </div>
        </el-form-item>
        <el-form-item label='频道' prop="channel_id">
          <my-channel v-model="form.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button @click="editArticle(false)" type="primary">提交修改</el-button>
          <el-button @click="eidtArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import MyChannel from '@/components/my-channel.vue'
import { quillEditor } from 'vue-quill-editor'
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import { reqEditArticle, reqGetArticleById } from '@/api/articles.js'
import MyCover from '@/components/my-cover.vue'
export default {
  name: 'EditArticle',
  components: {
    MyBreadcrumb,
    quillEditor,
    MyChannel,
    MyCover
  },
  data () {
    return {
      form: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        title: [
          { required: true, message: '请输入文章表标题', trigger: ['blur', 'change'] },
          { min: 5, max: 30, message: '文章标题必须是5-30个字符', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: ['blur', 'change'] }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: ['blur', 'change'] }
        ]
      },
      editorOption: {
        placeholder: '请输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    this.loadArtile(this.$route.params.id)
  },
  methods: {
    async loadArtile (id) {
      try {
        const res = await reqGetArticleById(id)
        this.form = res.data.data
      } catch (err) {
      }
    },
    editArticle (draft) {
      this.$refs.myform.validate(async flag => {
        if (flag) {
          try {
            const id = this.$route.params.id
            await reqEditArticle(id, draft, this.form)
            this.$message.success('操作成功')
            this.$router.push('/articles')
          } catch (err) {
            console.log(err)
            this.$message.error('操作失败')
          }
        }
      })
    },
    quillFn () {
      this.$refs.myform.validateField('content')
    },
    changeType () {
      this.form.cover.images = []
    }
  }
}
</script>

<style lang='less' scoped>
.edit-article {
  /deep/ .ql-editor{
  min-height: 300px;
  }
  /deep/ .ql-toolbar {
  padding: 0 8px;
  }
}
.cover-box {
  display: flex;
  .my-cover {
    margin-right: 20px;
  }
}
</style>

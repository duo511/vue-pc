<template>
  <div class="fans">
    <el-card>
      <template v-slot:header>
        <my-breadcrumb>粉丝管理</my-breadcrumb>
      </template>
      <el-tabs @tab-click='changeTab' v-model="activeName" type="card">
        <el-tab-pane label="粉丝管理" name="list">
          <div class="fans_list">
            <div v-for="item in list" :key="item.id.toString()" class="fans_item">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{ item.name }}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            :current-page="page"
            @current-change="changePage"
            :total="total_count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
          <div ref="main" style="width: 600px; height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { reqGetFans, reqGetFansStatistics } from '@/api/fans'
import MyBreadcrumb from '@/components/my-breadcrumb.vue'
import echarts from 'echarts'

export default {
  name: 'Fans',
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      activeName: 'list',
      page: 1,
      per_page: 30,
      total_count: 0,
      list: [],
      sircleUrl: ''
    }
  },
  created () {
    this.loadFans()
  },
  methods: {
    changePage (index) {
      this.page = index
      this.loadFans()
    },
    async loadFans () {
      try {
        const res = await reqGetFans(this.page, this.per_page)
        this.list = res.data.data.results
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    async changeTab (tab) {
      if (tab.name === 'img') {
        const res = await reqGetFansStatistics()
        const ages = res.data.data.age
        const ageX = []
        const ageY = []
        for (const key in ages) {
          ageY.push(ages[key])
          ageX.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(this.$refs.main)

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '粉丝人数柱状图'
          },
          tooltip: {},
          legend: {
            data: ['粉丝人数']
          },
          xAxis: {
            data: ageX
          },
          yAxis: {},
          series: [{
            name: '人数',
            type: 'bar',
            data: ageY
          }]
        }

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>

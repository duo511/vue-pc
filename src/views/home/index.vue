<template>
  <div class="home">
    <el-card>
      <template v-slot:header>
        <div>首页暂为测试</div>
      </template>
      <my-channel v-model="channel_id"></my-channel>
      <my-cover></my-cover>
    </el-card>
  </div>
</template>

<script>
import MyCover from '@/components/my-cover.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  name: 'Home',
  components: {
    MyCover,
    MyChannel
  },
  data () {
    return {
      channel_id: null
    }
  }

}
</script>

<style>

</style>

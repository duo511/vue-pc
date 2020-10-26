<template>
  <div class="my-channel">
    <el-select :value='value' @change="selectChange" clearable placeholder="请选择">
      <el-option
        v-for="item in channels"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/articles.js'
export default {
  name: 'MyChannel',
  data () {
    return {
      channels: []
    }
  },
  props: ['value'],
  async created () {
    try {
      const res = await reqGetChannels()
      this.channels = res.data.data.channels
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    selectChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>

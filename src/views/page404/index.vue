<template>
  <div class="page404"></div>
</template>

<script>
export default {
  name: 'Page404',
  created () {
    setTimeout(() => {
      this.$router.push('/')
    }, 3000)
  }
}
</script>

<style lang='less'>
.page404 {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../../assets/404.png') center;
  background-size: cover;
}
</style>

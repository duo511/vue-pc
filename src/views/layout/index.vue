<template>
  <div class="layout-container">
    <el-container>
      <el-aside :width="isCollapse ? '64px': '200px' ">
        <div class="logo" :class="{minLogo: isCollapse}"></div>
        <!-- 左侧导航 -->
        <el-menu  :collapse='isCollapse' :collapse-transition="false"  background-color="#002033" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="left">
            <i @click="isCollapse = !isCollapse"  :class="isCollapse ? 'el-icon-s-unfold': 'el-icon-s-fold'"></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img :src="user.photo" class="avatar">
              <span>{{ user.name }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { reqGetUserInfo } from '@/api/user.js'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: true,
      user: {}
    }
  },
  created () {
    reqGetUserInfo().then(res => {
      this.user = res.data.data
    })
  }
}
</script>

<style lang='less'>
.layout-container {
  width: 100%;
  height: 100%;
  position: fixed;
  .el-container {
    width: 100%;
    height: 100%;
    .el-aside {
      background-color:#002033;
      .el-menu {
        border-right: none;
      }
      .logo {
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center;
        background-size: 140px auto;
      }
      .minLogo {
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
    }
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom:1px solid #cccccc;
      .avatar-wrap {
        display: flex;
        align-items: center;
        cursor: pointer;
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
    .el-main {
      background-color: #e9eef3;
    }
  }
}
</style>

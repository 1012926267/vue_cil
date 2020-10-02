<template>
  <div style="margin-left:1%;margin-right:1%">

    <!-- 面包屑导航区域 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  <el-card style="line-height: 12px" >
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本资料" name="userinfo">
        <user-info :teacher_username="teacher_username"/>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="resetPwd">
        <reset-pwd :teacher_username="teacher_username" />
      </el-tab-pane>
      <el-tab-pane label="头像管理" name="resetAvart">
        <reset-avart :teacher_username="teacher_username" />
      </el-tab-pane>
    </el-tabs>
  </el-card>
  </div>
</template>

<script>
  import userInfo from "./userInfo";
  import resetAvart from "./resetAvart";
  import resetPwd from "./resetPwd";

    export default {
        name: "Teacher",
      components: {
        userInfo,
        resetAvart,
        resetPwd
      },
      data(){
          return{
            activeTab:"userinfo",
            teacher_username:this.username
          }
      },
      watch:{
        username: function (val) {
          this.teacher_username = val
          console.log(this.teacher_username)
         }
        },
      props:['username']
    }
</script>

<style scoped>

</style>

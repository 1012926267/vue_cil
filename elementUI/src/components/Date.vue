<template>

  <div style="margin-left:1%;margin-right:1%">




    <!-- 面包屑导航区域 -->
    <div >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="line-height: 12px" >
    <el-calendar>
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template
        slot="dateCell"
        slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>
      </template>
    </el-calendar>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Date"
    }
</script>

<style scoped>
  .is-selected {
    color: #1989FA;
  }
</style>

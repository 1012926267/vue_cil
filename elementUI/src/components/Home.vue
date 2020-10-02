<template>
  <el-container class="home-container">
    <el-aside :width="isCollapse ? '64px' : '200px'" >
      <div class="logo">
        <i  style="color: #43B497; font-size:32px;" :collapse="isCollapse" class="el-icon-s-claim"></i>
        <span v-if="!isCollapse" slot="title" >学生考勤系统</span>
      </div>
      <el-menu
        :default-active="default_active"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#1890FF"
        :collapse="isCollapse"
        router
      >
        <el-submenu index="1">
          <template slot="title">
          <i class="el-icon-collection"></i>
          <span>课程管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/course">我的课程</el-menu-item>
            <el-menu-item index="/lesson">课程列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu >
        <el-menu-item index="/student">
          <i class="el-icon-s-custom"></i>
          <span slot="title">学生管理</span>
        </el-menu-item>
        <el-menu-item index="/teacher" >
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/date">
          <i class="el-icon-date"></i>
          <span slot="title">日程管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <div
          class="toggle-button"
          @click="toggleCollapse"
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
          :style="active"
        >
          <i class=" el-icon-s-fold"></i>
        </div>
        <el-dropdown  @command="handleCommand" trigger="click">
      <span class="el-dropdown-link">
        <div class="header_right">
           <div class="demo-basic--circle">
          <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>
        </div>
        <i style="margin-top: 40px" class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" >用户设置</el-dropdown-item>
                <el-dropdown-item command="b" >退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
      </el-header>
      <el-main>
        <router-view :username="username" />
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
    export default {
        name: "Home",
    data(){
          return{
            default_active:'/course',
            isCollapse: false,
            active: '',
            circleUrl: "",
            username:'',
            name:''
          }
    }
    ,
      methods:{
        //下拉框选项
        handleCommand(command) {
          if(command === "a"){
            this.$router.push('/teacher')
            this.default_active = "/teacher"
          }
          if (command === "b"){
            this.logout()
            this.$message.success('安全退出成功')
          }
        },
        // 退出登陆
        logout() {
          this.$router.push('/login')
          window.sessionStorage.clear()

        },
        // 点击按钮，切换菜单的折叠与展开
        toggleCollapse() {
          this.isCollapse = !this.isCollapse
        },
        mouseOver: function(){
          this.active = 'background-color: #F9F9F9';
        },
        mouseLeave: function () {
          this.active = '';
        },
        getTeacher(){
          const tokenStr = window.sessionStorage.getItem('token')
            this.$http.post("http://localhost:8081/attendance/teacher/getTeacher",tokenStr).then(res=>{
              this.circleUrl = res.data.avartUrl;
              this.username = res.data.username;
            })
        }
      },
      created() {
          this.getTeacher()
      }
    }
</script>

<style scoped>


  .el-header{
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0;
  }

  .home-container{
    height: 100%;
  }

  .el-aside {
    background-color: #304156;
    color: #333;
    text-align: center;
    line-height: 60px;

  }

.logo{
  background-color: #2B2F3A;
  margin: 0;
  color: #fff;
  font-size: 16px;

}

  .el-main {
    background-color: #EEF0F3;
    color: #333;
    text-align: center;
    line-height: 160px;
    border-top: #D8DCE5 1px solid ;
/*    box-shadow: 0 6px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    box-shadow: 0px 2px 12px 0 rgba(0, 0, 0, 0.1)

  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .el-menu{

    border-right-width: 0;

  }

  .toggle-button {
    background-color: #ffffff;
    font-size: 24px;
    width: 60px;
    color: #000000;
    text-align: center;
    cursor: pointer;
  }

  .avatar{
    background-color: #000000;

  }
  .header_right{
    margin-right: 40px;
    margin-top: 5px;
    width: 60px;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }

</style>

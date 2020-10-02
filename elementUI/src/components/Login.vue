<template>
  <div class="login">

  <el-form  ref="loginFromRef"  :model="loginFrom" :rules="loginFormRules"   class="login-form">
    <h3 class="title">学生考勤系统</h3>
    <el-form-item  prop="username">
      <el-input v-model="loginFrom.username" prefix-icon="el-icon-user-solid" :maxlength="12" :minlength="8" type="text"  placeholder="账号">
      </el-input>
    </el-form-item>
    <el-form-item prop="password" >
   <el-input v-model="loginFrom.password"  prefix-icon="el-icon-lock " :maxlength="18" :minlength="8" type="password" show-password placeholder="密码">
      </el-input>
    </el-form-item>
      <el-link style="margin-left: 280px" href="#/register" target="_self">注册新账号</el-link>
    <el-form-item style="width:100%; margin-top: 15px" >
      <el-button
        size="medium"
        type="primary"
        style="width:100%;"
        @click="login('loginFromRef')"
      >
        <span >登 录</span>
      </el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
    export default {
        name: "Login",
      data(){
          return {
            loginFrom:{
              username:"",
              password:""
            },
            loginFormRules:{
              username:[
                {required:true, message: '请输入登录账号', triangle: 'blur'}
              ],
              password: [
                { required:true, message: '请输入登录密码', triangle: 'blur'  }
              ]
            }
          }
      },
      methods:{
          login(formName){
            this.$refs[formName].validate( valid => {
              if (valid){
                this.$http.post("http://localhost:8081/attendance/teacher/login",this.loginFrom).then(res=>{
                  // console.log(res);
                  if (res.data.state){
                    this.$message.success('登陆成功')
                    window.sessionStorage.setItem('token',res.data.token)
                    // console.log(res.data.token)
                    this.$router.push('/home')
                  }else {
                    return this.$message.error('登陆失败,用户名或密码不正确')
                  }
                })
              }
              else {
                console.log('error')
                return false;
              }
            });
        }
      }

    }
</script>

<style lang="scss" scoped>
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login4.jpg");
    background-size: cover;
  }
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 350px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

</style>

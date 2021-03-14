<template>
  <div class="Register">

    <el-form :model="paramsData" ref="RegisterForm" :rules="RegisterFromRules" class="Register-form">
      <h3 class="title">学生考勤系统</h3>
      <el-form-item label="用户姓名" prop="name">
        <el-input v-model="paramsData.name"  prefix-icon="el-icon-user"  type="text"  placeholder="请输入您的姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="账号"  prop="account">
        <el-input v-model="paramsData.account" prefix-icon="el-icon-user-solid" :maxlength="12" :minlength="8" type="text"  placeholder="请输入8-12位的账号">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="paramsData.password"  prefix-icon="el-icon-lock " :maxlength="18" :minlength="8" type="password"  show-password placeholder="请输入8-18位的密码">
        </el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="invitationCode">
        <el-input v-model="paramsData.invitationCode"  prefix-icon="el-icon-message" :maxlength="18"  type="text"  show-password placeholder="请输入邀请码">
        </el-input>
      </el-form-item>
      <el-form-item style="width:100%; margin-top: 15px" >
        <el-button
          size="medium"
          type="primary"
          style="width:100%;"
          @click="register"
        >
          <span>立即注册</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
        return {
            paramsData: {
              name:'' ,
              account:"",
              password:"",
              invitationCode:""
            }
          ,
          RegisterFromRules:{
            account: [
              {required:true,message:'账号不能为空',triangle:'blur'},
              {min:8,max:12 ,message: '账号长度须设置在 8-12 个字符之间'}
            ],
            password: [
              {required:true,message:'密码不能为空',triangle:'blur'},
              {min:8,max:18 ,message: '密码长度须设置在 8-18 个字符之间'}
            ],
            name: [
              {required:true,message:'姓名不能为空',triangle:'blur'},
              {max:18 ,message: '输入姓名长度过长'}
            ],
            invitationCode: [
              {required:true,message:'邀请码不能为空',triangle:'blur'},
              {max:50 ,message: '邀请码格式错误'}
            ]

          }
        }
      },
      methods:{
        register(){
          this.$refs.RegisterForm.validate( valid => {
            if(valid){
              if (this.paramsData.invitationCode === "3369"){
                this.$http({
                    method: 'post',
                    headers: {
                      'Access-Control-Allow-Origin': '*',
                      'Content-Type': 'application/json;charset=UTF-8'
                    },
                  url: this.$global.host + '/v1/teacher/register',
                  data: JSON.stringify({
                    "data": this.paramsData
                  }),
                }).then(response => {
                  const responseData = response.data.data;
                  const responseState = response.data.state
                  if (2000 === responseState.code){
                    this.$global.setUser(responseData.user)
                    this.$message.success('注册成功')
                    this.$router.push('/login')
                  } else {
                    this.$message.error({
                      message: responseState.msg,
                      center: true,
                      duration: 1000
                    });
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }else {
                return this.$message.error("注册失败，邀请码错误")
              }
            }
          });


        }
      }
    }
</script>

<style scoped>
  .Register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/image/login3.jpg");
    background-size: cover;
  }
  .Register-form {
    border-radius: 6px;
    background: #ffffff;
    width: 380px;
    padding: 25px 25px 5px 25px;

  }
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
</style>

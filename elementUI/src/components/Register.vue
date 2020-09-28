<template>
  <div class="Register">

    <el-form    :model="RegisterFrom" ref="RegisterForm" :rules="RegisterFromRules" class="Register-form">
      <h3 class="title">学生考勤系统</h3>
      <el-form-item label="用户姓名" prop="teacher_name">
        <el-input v-model="RegisterFrom.teacher_name"  prefix-icon="el-icon-user"  type="text"  placeholder="请输入您的姓名">
        </el-input>
      </el-form-item>
      <el-form-item label="账号"  prop="username">
        <el-input v-model="RegisterFrom.username" prefix-icon="el-icon-user-solid" :maxlength="12" :minlength="8" type="text"  placeholder="请输入8-12位的账号">
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="RegisterFrom.password"  prefix-icon="el-icon-lock " :maxlength="18" :minlength="8" type="password"  show-password placeholder="请输入8-18位的密码">
        </el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="invite" >
        <el-input v-model="RegisterFrom.invite"  prefix-icon="el-icon-message" :maxlength="18"  type="text"  show-password placeholder="请输入邀请码">
        </el-input>
      </el-form-item>
      <el-form-item label="性别"  prop="teacher_sex">

          <el-radio v-model="RegisterFrom.teacher_sex" label="男" >男</el-radio>
          <el-radio v-model="RegisterFrom.teacher_sex"  label="女" >女</el-radio>

        <!--<el-select prefix-icon="el-icon-s-custom" placeholder="请选择性别" v-model="RegisterFrom.teacher_sex" clearable >
          <el-option
            prefix-icon="el-icon-s-custom"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />


        </el-select>-->
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
/*          // 单选框
          options:[{
            value: '男',
            label: '男'
          },{
            value: '女',
            label: '女'
          }
          ],*/
          RegisterFrom:{
            username:'' ,
            password:"",
            teacher_name:"",
            invite:"",
            teacher_sex:'男'
          },
          RegisterFromRules:{
            username: [
              {required:true,message:'账号不能为空',triangle:'blur'},
              {min:8,max:12 ,message: '账号长度须设置在 8-12 个字符之间'}
            ],
            password: [
              {required:true,message:'密码不能为空',triangle:'blur'},
              {min:8,max:18 ,message: '密码长度须设置在 8-18 个字符之间'}
            ],
            teacher_name: [
              {required:true,message:'姓名不能为空',triangle:'blur'},
              {max:18 ,message: '输入姓名长度过长'}
            ],
            teacher_sex: [
              {required:true,message:'性别不能为空',triangle:'blur'},
            ],
            invite: [
              {required:true,message:'邀请码不能为空',triangle:'blur'},
              {max:18 ,message: '邀请码格式错误'}
            ]

          }
        }
      },
      methods:{
        register(){
          this.$refs.RegisterForm.validate( valid => {
            if(valid){
              if (this.RegisterFrom.invite === "3369"){
                this.$http.post("http://localhost:8081/attendance/teacher/register",this.RegisterFrom).then(res=>{
                  console.log(res)
                  if(res.data.state){
                    this.$message.success('注册成功')
                    this.$router.push('/login')
                  }else {
                    return this.$message.error("注册失败，用户名已存在")
                  }
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

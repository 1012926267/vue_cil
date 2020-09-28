<template>
  <div>
    <el-form ref="userInfo" style="text-align: left"  :rules="rules" :model="userInfo"  label-width="80px">
      <el-form-item label="用户姓名" prop="teacher_name">
        <el-input  v-model="userInfo.teacher_name"  style="width: 400px" />
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="userInfo.username"   style="width: 400px" />
      </el-form-item>
      <el-form-item label="手机号码" prop="telephone">
        <el-input  v-model="userInfo.telephone"  style="width: 400px" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="userInfo.mail"    style="width: 400px"  maxlength="50" />
      </el-form-item>
      <el-form-item label="性别" prop="teacher_sex">
          <el-radio v-model="userInfo.teacher_sex"  label="男">男</el-radio>
          <el-radio v-model="userInfo.teacher_sex"  label="女">女</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button type="danger" size="mini" @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
    export default {
        name: "userInfo",
      data(){
          return {
            // 表单校验
            rules: {
              teacher_name: [
                { required: true, message: "用户姓名不能为空", trigger: "blur" },
                {max:18 ,message: '输入姓名长度过长'}
              ],
              username: [
                {required:true,message:'账号不能为空',triangle:'blur'},
                {min:8,max:12 ,message: '账号长度须设置在 8-12 个字符之间'}
              ],
              mail: [
                { required: true, message: "邮箱地址不能为空", trigger: "blur" },
                {
                  type: "email",
                  message: "'请输入正确的邮箱地址",
                  trigger: ["blur", "change"]
                }
              ],
              telephone: [
                { required: true, message: "手机号码不能为空", trigger: "blur" },
                {
                  pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                  message: "请输入正确的手机号码",
                  trigger: "blur"
                }
              ]
            },
            //用户账号
            userInfo_username:this.teacher_username,
            // 用户信息
            userInfo: {
              teacher_name:'',
              username:'',
              teacher_sex:'',
              telephone:'',
              mail:'',
              idteacher:''
            }
          }
      },
      methods:{
          getUserInfo(){
            console.log('我进来了' )
            console.log(this.userInfo_username)
            console.log(this.teacher_username)
            this.$http.get("http://localhost:8081/attendance/teacher/getTeacherMessage?username=" + this.userInfo_username).then(res => {
                this.userInfo = res.data.teacherMessage;
            })
          },
        submit(){
            this.$http.post("http://localhost:8081/attendance/teacher/updateTeacher",this.userInfo).then(res=>{
              if(res.data.success){
                this.$message.success("修改成功");
                this.getUserInfo();
              }else {
                this.$message.error("修改失败，服务器异常请稍后再试");
                this.getUserInfo();
              }
            })
        },
        close() {
          this.getUserInfo();
        }
      },
      created() {
        this.getUserInfo();
      },
      props:['teacher_username'],
      watch:{
        teacher_username: function (val) {
          this.userInfo_username = val
          this.getUserInfo();
        }
      }

    }
</script>

<style scoped>

</style>

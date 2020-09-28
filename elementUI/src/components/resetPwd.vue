<template>

  <div>
    <el-form ref="form" style="text-align: left"  :model="user" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="user.oldPassword"  style="width: 400px" show-password placeholder="请输入旧密码" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="user.newPassword" style="width: 400px" show-password  placeholder="请输入新密码" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="user.confirmPassword" style="width: 400px" show-password placeholder="请确认密码" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="submit">保存</el-button>
        <el-button type="danger" size="mini" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "resetPwd",
      data() {
        const equalToPassword = (rule, value, callback) => {
          if (this.user.newPassword !== value) {
            callback(new Error("两次输入的密码不一致"));
          } else {
            callback();
          }
        };
        return {
          test: "1test",
          //用户账号
          userInfo_username:this.teacher_username,
          user: {
            oldPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          },
          // 表单校验
          rules: {
            oldPassword: [
              { required: true, message: "旧密码不能为空", trigger: "blur" }
            ],
            newPassword: [
              { required: true, message: "新密码不能为空", trigger: "blur" },
              { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
            ],
            confirmPassword: [
              { required: true, message: "确认密码不能为空", trigger: "blur" },
              { required: true, validator: equalToPassword, trigger: ["blur", "change"] }
            ]
          }
        };
      },
      methods: {
        submit() {
          this.$refs["form"].validate(valid => {
            if (valid) {
/*              console.log(this.user.newPassword)
              console.log(this.oldPassword)*/
             this.$http.get("http://localhost:8081/attendance/teacher/updatePassword?userInfo_username=" + this.userInfo_username + "&oldPassword=" + this.user.oldPassword + "&newPassword=" + this.user.newPassword).then(res=>{
               if (res.data.state){
                 if (res.data.success){
                   this.$message.success("修改密码成功");
                   this.reset();
                 }else {
                   this.$message.error("修改密码失败，输入的旧密码错误")
                 }
               } else {
                 this.$message.error("修改密码失败，服务器异常请稍后再试")
               }
             })
            }
          });
        },
        //表单重置
        reset(){
          this.user = {
            oldPassword: undefined,
            newPassword: undefined,
            confirmPassword: undefined
          }
        }
      },
      props:['teacher_username'],
      watch:{
        teacher_username: function (val) {
          this.userInfo_username = val
        }
      }

    }
</script>

<style scoped>

</style>

<template>
  <div   style="margin-left:1%;margin-right:1%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="line-height: 12px" >

      <!--搜索修改区域-->
      <div >
        <el-form :model="queryParams" style="text-align: left" ref="queryForm" :inline="true" >
          <el-form-item label="学号" prop="student_id">
            <el-input
              v-model="queryParams.student_id"
              placeholder="请输入学号"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="学生姓名" prop="student_name">
                        <el-input
                          v-model="queryParams.student_name"
                          placeholder="请输入学生姓名"
                          clearable
                          size="small"
                        />
                      </el-form-item>
          <el-form-item label="学院" prop="student_college">
            <el-input
              v-model="queryParams.student_college"
              placeholder="请输入学院名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="入学年份" prop="student_attendance">
            <el-input
              v-model="queryParams.student_attendance"
              placeholder="请输入学院名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="专业" prop="student_profession">
            <el-input
              v-model="queryParams.student_profession"
              placeholder="请输入专业名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="性别" prop="student_sex">
                        <el-select placeholder="请选择性别" v-model="queryParams.student_sex" clearable size="small">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </el-form-item>
          <el-form-item>
            <el-button  icon="el-icon-search" type="goon" @click="handleQuery" size="mini">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" >重置</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" style="margin-bottom: 8px">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除</el-button>
          </el-col>
        <!--  <el-col :span="1.5">
            <el-button
              type="warning"
              icon="el-icon-download"
              size="mini"
            >导出</el-button>
          </el-col>-->
        </el-row>
      </div>

      <!--表格数据区域-->
      <div >
      <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="color: #606266" v-loading="loading" type=index :data="studentList" @selection-change="handleSelectionChange" >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" type="index" show-overflow-tooltip width="80" />
        <el-table-column label="编号" v-if="false" align="center" width="120" prop="student_number" />
        <el-table-column label="学号" align="center" prop="student_id" />
        <el-table-column label="学生姓名" align="center" prop="student_name" />
        <el-table-column label="学院" align="center" prop="student_college" />
        <el-table-column label="入学年份" align="center" prop="student_attendance" />
        <el-table-column label="专业" align="center" prop="student_profession" />
        <el-table-column label="性别" align="center" prop="student_sex" width="180"></el-table-column>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-card>

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学号" prop="student_id">
          <el-input v-model="form.student_id" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="学生姓名" prop="student_name">
          <el-input v-model="form.student_name" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="学院" prop="student_college">
          <el-input v-model="form.student_college" placeholder="请输入学院名称" />
        </el-form-item>
        <el-form-item label="入学年份" prop="student_attendance">
          <el-input v-model="form.student_attendance" placeholder="请输入学年份" />
        </el-form-item>
        <el-form-item label="专业" prop="student_profession">
          <el-input v-model="form.student_profession" placeholder="请输入专业名称" />
        </el-form-item>
        <el-form-item label="性别" prop="student_sex">
          <el-select placeholder="请选择性别" v-model="form.student_sex" clearable size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
    export default {
        name: "Student",
      data(){
          return{
            // 单选框
            options:[{
              value: '男',
              label: '男'
            },{
              value: '女',
              label: '女'
            }
            ],
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 选中学生名
            names: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            // 表格数据
            studentList:[],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            //查询参数
            queryParams: {
              student_id: undefined,
              student_name: undefined,
              student_college: undefined,
              student_attendance: undefined,
              student_profession: undefined,
              student_sex: undefined
            },
            //表单数据
            form:{
            },
            //表单校检
            rules:{
              student_id: [
                {required:true, message: "学号不能为空", trigger: "blur" },
                {min:11,max:11,message: "学号号的长度必须设置位11个字符"}
              ],
              student_name: [
                { required: true, message: "学生姓名不能为空", trigger: "blur" }
              ],
              student_college: [
                { required: true, message: "学院名不能为空", trigger: "blur" },
              ],
              student_attendance: [
                { required: true, message: "入学年份不能为空", trigger: "blur" },
                {min:4,max:4,message: "入学年份格式须为yyyy"}
              ],
              student_profession: [
                { required: true, message: "专业名不能为空", trigger: "blur" },
              ],
              student_sex: [
                { required: true, message: "性别不能为空", trigger: "blur" },
              ]
            }
        }

      },
      created() {
        this.getList();
      },
      methods:{
        /** 查询课程列表集合 */
        getList(){
          console.log(this.queryParams)
          this.loading = true;
          this.$http.post("http://localhost:8081/attendance/student/selectStudentList",this.queryParams).then(res=>{
            this.studentList = res.data.studentsList ;
            this.loading = false ;
          });
        },
        // 取消按钮
        cancel(){
          this.open = false;
          this.reset();
        },
        //重置表单方法
        resetForm(refName) {
          if (this.$refs[refName]) {
            this.$refs[refName].resetFields();
          }
        },
        //表单重置
        reset(){
          this.form = {
            student_number: undefined,
            student_id: undefined,
            student_name: undefined,
            student_college: undefined,
            student_attendance: undefined,
            student_profession: undefined,
            student_sex: undefined
          };
          this.resetForm("form");
        },
        /** 搜索按钮 */
        handleQuery(){
          this.getList();
        },
        /** 重置按钮 */
        resetQuery(){
          this.resetForm("queryForm");
          this.handleQuery();
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
          this.ids = selection.map(item => item.student_number)
          this.names = selection.map(item => item.student_name)
          this.single = selection.length!=1
          this.multiple = !selection.length
        },
        /** 新增按钮 */
        handleAdd(){
          this.reset();
          this.open = true;
          this.title = "添加学生"
        },
        /** 提交按钮 */
        submitForm() {
          this.$refs["form"].validate(valid =>{
            if (valid){
              //当表单含有序号时是修改学生信息
              if (this.form.student_number !== undefined){
                this.$http.post("http://localhost:8081/attendance/student/updateStudent",this.form).then(res => {
                  if(res.data.success){
                    this.$message.success("修改成功");
                    this.open = false;
                    this.getList();
                  }else {
                    this.$message.error("修改失败，服务器异常请稍后再试")
                    this.open = false;
                    this.getList();
                  }
                });
              }
              //当表单不含有序号时时添加学生信息
              else {
                this.$http.post("http://localhost:8081/attendance/student/addStudent",this.form).then(res=>{
                  if(res.data.success){
                    this.$message.success("添加成功");
                    this.open = false;
                    this.getList();
                  }else {
                    this.$message.error("添加失败，服务器异常请稍后再试")
                    this.open = false;
                    this.getList();
                  }
                })
              }

            }
          })
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
          this.reset();
          console.log(this.ids)
          const student_number = row.student_number || this.ids
          this.$http.get("http://localhost:8081/attendance/student/selectStudentByNumber?student_number=" + student_number).then(res=>{
            this.form = res.data.student;
            this.open = true;
            this.title = "修改学生信息";
          })
        },
        /** 删除按钮操作 */
        handleDelete(row) {
          let _this = this;
          const student_numbers = row.student_number || this.ids;
          const student_names = row.student_name || this.names;
          this.$confirm('是否确认删除学生名为"' + student_names + '"的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return _this.$http.delete("http://localhost:8081/attendance/student/" + student_numbers).then(res=>{
              if(res.data.success){
                _this.$message.success("删除成功");
                _this.open = false;
                _this.getList();
              }else {
                _this.$message.error("删除失败，服务器异常请稍后再试")
                _this.open = false;
                _this.getList();
              }
            });
          }).catch(function() {});
        }
      }
    }
</script>



<style scoped>

  .el-button--goon.is-active,
  .el-button--goon:active {
    background: #20B2AA;
    border-color: #20B2AA;
    color: #fff;
  }

  .el-button--goon:focus,
  .el-button--goon:hover {
    background: #48D1CC;
    border-color: #48D1CC;
    color: #fff;
  }

  .el-button--goon {
    color: #FFF;
    background-color: #20B2AA;
    border-color: #20B2AA;
  }

</style>

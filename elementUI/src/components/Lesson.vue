<template>
  <div   style="margin-left:1%;margin-right:1%">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      <el-breadcrumb-item>课程列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card style="line-height: 12px" >

      <!--搜索修改区域-->
      <div >
        <el-form :model="queryParams" style="text-align: left" ref="queryForm" :inline="true" >
          <el-form-item label="课程编号"  prop="course_id">
            <el-input
              v-model="queryParams.course_id"
              placeholder="课程编号"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="课程名称" prop="course_name">
            <el-input
              v-model="queryParams.course_name"
              placeholder="请输入课程名称"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item>
            <el-button  icon="el-icon-search" type="goon" size="mini" @click="handleQuery">搜索</el-button>
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
         <!-- <el-col :span="1.5">
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
        <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="color: #606266" v-loading="loading" :data="lessonList"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="course_id" width="55" align="center" />
          <el-table-column label="序号" align="center" type="index" show-overflow-tooltip width="80" />
          <el-table-column label="主键编号" v-if="false"align="center"  width="120" prop="id" />
          <el-table-column label="课程编号" align="center" prop="course_id" />
          <el-table-column label="课程名称" align="center" prop="course_name" />
          <el-table-column label="创建时间" align="center" prop="course_time" />
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
    <!-- 添加或修改课程对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="课程编号" prop="course_id">
          <el-input v-model="form.course_id" placeholder="请输入课程编号" />
        </el-form-item>
        <el-form-item label="课程名称" prop="course_name">
          <el-input v-model="form.course_name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="课程图片" >
          <el-upload
            class="upload-demo"
            accept="image/jpeg,image/jpg,image/png"
            :auto-upload="false"
            ref="upload"
            :data="form"
            :limit="1"
            action="http://localhost:8081/attendance/file/lessonPicture"
            list-type="picture">
            <el-button size="small" type="primary" >选取图片</el-button>
            <div slot="tip"
                 class="el-upload__tip"
                 style="margin-top: -40px; width: 300px;margin-left: 100px;text-align: left;color: red;">
              只能上传jpg/png文件，且不超过500kb<br>推荐像素为260px*370px
            </div>
          </el-upload>
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
        name: "Lesson",
      data(){
          return{
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 选中课程名
            courses: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 总条数
            total: 0,
            // 表格数据
            lessonList:[],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            //查询参数
            queryParams: {
              course_id: undefined,
              course_name: undefined,
            },
            //表单数据
            form:{
            },
            //表单校检
            rules:{
              course_id: [
                { required: true, message: "课程号不能为空", trigger: "blur" },
                {min:2,max:4,message: "课程号的长度必须设置在 2-4 个字符之间"}
              ],
              course_name: [
                { required: true, message: "课程名称不能为空", trigger: "blur" }
              ]
            }
          };
      },
      created() {
          this.getList();
      },
      methods:{
          /** 查询课程列表集合 */
          getList(){
            this.loading = true;
            this.$http.post("http://localhost:8081/attendance/course/selectList",this.queryParams).then(res=>{
              this.lessonList = res.data.coursesList ;
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
              id: undefined,
              course_id: undefined,
              course_name: undefined,
            };
            this.resetForm("form");
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
          this.ids = selection.map(item => item.id)
          this.courses = selection.map(item => item.course_name)
          this.single = selection.length!=1
          this.multiple = !selection.length
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
        /** 新增按钮 */
        handleAdd(){
          this.reset();
          this.open = true;
          this.title = "添加课程"
        },
        /** 修改按钮 */
        handleUpdate(row) {
          this.reset();
          const id = row.id || this.ids
          this.$http.get("http://localhost:8081/attendance/course/selectCourseById?id=" + id).then(res=>{
            this.form = res.data.course;
            this.open = true;
            this.title = "修改课程信息";
          })
        },
        /** 提交按钮 */
        submitForm() {

          this.$refs["form"].validate(valid =>{
            if (valid){
      /*        console.log(this.form.course_id)*/
              //当表单含有主键编号时是修改课程信息
              if (this.form.id !== undefined){
                this.$http.post("http://localhost:8081/attendance/course/updateCourse",this.form).then(res => {
                  if(res.data.success){
                    this.$message.success("修改成功");
                    this.open = false;
                    this.getList();
                    this.$refs.upload.submit();
                    this.$refs.upload.clearFiles();
                  }else {
                    this.$message.error("修改失败，服务器异常请稍后再试")
                    this.open = false;
                    this.getList();
                    this.$refs.upload.clearFiles();
                  }
                });
              }
              //当表单不含有主键编号时是添加课程
              else {
                this.$http.post("http://localhost:8081/attendance/course/addCourse",this.form).then(res=>{
                  console.log(res)
                  if(res.data.success){
                    this.$message.success("添加成功");
                    this.open = false;
                    this.getList();
                    this.$refs.upload.submit();
                    this.$refs.upload.clearFiles();
                  }else {
                    this.$message.error("添加失败，服务器异常请稍后再试")
                    this.open = false;
                    this.getList();
                    this.$refs.upload.clearFiles();
                  }
                })
              }

            }
          })
        },
        /** 删除按钮操作 */
        handleDelete(row) {
          let _this = this;
          console.log(row)
          const ids = row.id || this.ids;
          const course_names = row.course_name || this.courses;
          this.$confirm('是否确认删除课程名为"' + course_names + '"的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return _this.$http.delete("http://localhost:8081/attendance/course/" + ids).then(res=>{
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
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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

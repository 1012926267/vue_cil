<template>


  <div :username="username" style="margin-left:1%;margin-right:1%">

      <!-- 面包屑导航区域 -->
      <div >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>课程管理</el-breadcrumb-item>
          <el-breadcrumb-item>我的课程</el-breadcrumb-item>
        </el-breadcrumb>
      </div>


    <el-card style="line-height: 12px" >

      <!--搜索修改区域-->
        <div style="margin-left: 67px;">
          <el-form :model="queryParams" style="text-align: left" ref="queryForm" :inline="true" label-width="auto">
            <el-form-item   label="课程名称" prop="course_name">
              <el-input
                placeholder="课程名称"
                clearable
                v-model="queryParams.course_name"
                size="small"
              />
            </el-form-item>
              <el-form-item   label="课程编号" prop="course_id">
                <el-input
                  placeholder="课程编号"
                  clearable
                  v-model="queryParams.course_id"
                  size="small"
                />
              </el-form-item>
              <el-form-item>
              <el-button  icon="el-icon-search" type="goon" @click="handleQuery" size="mini">搜索</el-button>
              <el-button type="primary" icon="el-icon-plus" @click="handleAdd" size="mini" >添加</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" >重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      <!--课程卡片区域-->
      <div>
        <el-row >
          <el-col :span="4" v-for="(item) in courseList"  :key="item.course_id" :offset="1" >
            <div style="margin-top:15px;  ">
              <el-card :body-style="{ padding: '0px'}" shadow="hover">
                <el-image class="image"  :src="getImagePNG(item.course_id)">
                  <div slot="error" class="image-slot">
                    <el-image class="image" :src="getImageJPG(item.course_id)">
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </div>
                </el-image>
                <div>
                  <div class="bottom clearfix">
                    <div class="text">
                      <span>{{item.course_name}}</span><br>
                    </div>
                    <time class="time"><strong>创建时间:</strong>{{item.course_time}}</time>
                    <el-button type="text" class="button" @click="showLesson(item.course_name,item.id,item.course_id)">查看</el-button>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
        <div style="margin-left:35%">
        </div>
      </div>

    </el-card>


    <!-- 添加课程对话框 -->
    <el-dialog  :title="title" :visible.sync="open" width="1000px" append-to-body>

      <!--搜索区域-->
      <el-form :model="queryCourseParams" style="text-align: left" ref="queryCourseParam" :inline="true" >
        <el-form-item label="课程编号"  prop="course_id">
          <el-input
            v-model="queryCourseParams.course_id"
            placeholder="课程编号"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item label="课程名称" prop="course_name">
          <el-input
            v-model="queryCourseParams.course_name"
            placeholder="请输入课程名称"
            clearable
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button  icon="el-icon-search" type="goon" size="mini" @click="handleCourseQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetCourseQuery" >重置</el-button>
        </el-form-item>
      </el-form>
      <!--表格数据区域-->
      <div>
        <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="color: #606266" v-loading="loading" :data="hideLessonList"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" align="center" type="index" show-overflow-tooltip width="80" />
          <el-table-column label="主键编号" v-if="false" align="center"  width="120" prop="id" />
          <el-table-column label="课程编号" align="center" prop="course_id" />
          <el-table-column label="课程名称" align="center" prop="course_name" />
          <el-table-column label="创建时间" align="center" prop="course_time" />
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" >确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 查看课程对话框 -->
    <el-dialog  :title="lesson_title" :visible.sync="checkLesson" width="1400px" append-to-body>

      <!-- 添加学生对话框 -->
      <el-dialog  :title="student_title" :visible.sync="addStudent" width="1200px" append-to-body @open="resetStudentQuery" @close="resetStudentQuery">
        <!--搜索修改区域-->
        <div >
          <el-form :model="queryAllStudentParams" style="text-align: left" ref="queryAllStudentForm" :inline="true" >
            <el-form-item label="学号" prop="student_id">
              <el-input
                v-model="queryAllStudentParams.student_id"
                placeholder="请输入学号"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="学生姓名" prop="student_name">
              <el-input
                v-model="queryAllStudentParams.student_name"
                placeholder="请输入学生姓名"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="学院" prop="student_college">
              <el-input
                v-model="queryAllStudentParams.student_college"
                placeholder="请输入学院名"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="入学年份" prop="student_attendance">
              <el-input
                v-model="queryAllStudentParams.student_attendance"
                placeholder="请输入学院名"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="专业" prop="student_profession">
              <el-input
                v-model="queryAllStudentParams.student_profession"
                placeholder="请输入专业名"
                clearable
                size="small"
              />
            </el-form-item>
            <el-form-item label="性别" prop="student_sex">
              <el-select placeholder="请选择性别" v-model="queryAllStudentParams.student_sex" clearable size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button  icon="el-icon-search" type="goon" @click="handleAllStudentQuery" size="mini">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetAllStudentQuery" >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--表格数据区域-->
        <div >
          <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="color: #606266" v-loading="loading" type=index :data="hideStudentList" @selection-change="handleSelectionAllStudentChange" >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="序号" align="center" type="index" show-overflow-tooltip width="80" />
            <el-table-column label="编号" v-if="false" align="center" width="120" prop="student_number" />
            <el-table-column label="学号" align="center" prop="student_id" />
            <el-table-column label="学生姓名" align="center" prop="student_name" />
            <el-table-column label="学院" align="center" prop="student_college" />
            <el-table-column label="入学年份" align="center" prop="student_attendance" />
            <el-table-column label="专业" align="center" prop="student_profession" />
            <el-table-column label="性别" align="center" prop="student_sex" width="180"></el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitStudentForm" >确 定</el-button>
          <el-button @click="cancelStudent">取 消</el-button>
        </div>
      </el-dialog>

      <!--搜索修改区域-->
      <div >
        <el-form :model="queryStudentParams" style="text-align: left" ref="queryStudentForm" :inline="true" >
          <el-form-item label="学号" prop="student_id">
            <el-input
              v-model="queryStudentParams.student_id"
              placeholder="请输入学号"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="学生姓名" prop="student_name">
            <el-input
              v-model="queryStudentParams.student_name"
              placeholder="请输入学生姓名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="学院" prop="student_college">
            <el-input
              v-model="queryStudentParams.student_college"
              placeholder="请输入学院名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="入学年份" prop="student_attendance">
            <el-input
              v-model="queryStudentParams.student_attendance"
              placeholder="请输入学院名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="专业" prop="student_profession">
            <el-input
              v-model="queryStudentParams.student_profession"
              placeholder="请输入专业名"
              clearable
              size="small"
            />
          </el-form-item>
          <el-form-item label="性别" prop="student_sex">
            <el-select placeholder="请选择性别" v-model="queryStudentParams.student_sex" clearable size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button  icon="el-icon-search" type="goon" @click="handleStudentQuery" size="mini">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetStudentQuery" >重置</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDeleteCourse"
            >移除课程</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" style="margin-bottom: 8px">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleStudentAdd"
            >新增</el-button>
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
            <el-col :span="1.5">
              <el-button
                type="success"
                icon="el-icon-s-claim"
                size="mini"
                @click="startAttendance"
              >开始考勤</el-button>
            </el-col>
        </el-row>
      </div>
      <!--表格数据区域-->
      <div >
        <el-table :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="color: #606266" v-loading="loading" type=index :data="studentList" @selection-change="handleSelectionStudentChange" >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" align="center" type="index" show-overflow-tooltip width="80" />
          <el-table-column label="编号" v-if="false" align="center" width="120" prop="student_number" />
          <el-table-column label="学号" align="center" prop="student_id" />
          <el-table-column label="学生姓名" align="center" prop="student_name" />
          <el-table-column label="学院" align="center" prop="student_college" />
          <el-table-column label="入学年份" align="center" prop="student_attendance" />
          <el-table-column label="专业" align="center" prop="student_profession" />
          <el-table-column label="性别" align="center" prop="student_sex" width="180"></el-table-column>
<!--          暂时的考勤模块-->
          <el-table-column label="状态" align="center" >{{attendance}}</el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
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



    </el-dialog>



  </div>


</template>

<script>
  function filterLessonList(array1, array2) {
    let arr1 = array1;
    let arr2 = array2;
    let result = [];
    for(let i = 0; i < arr2.length; i++){
      let obj = array2[i];
      let num = obj.course_id;   //staff_id   就是要对比的key
      let isExist = false;
      for(let j = 0; j < arr1.length; j++){
        let aj = array1[j];
        let n = aj.course_id;
        if(n === num){
          isExist = true;
          break;
        }
      }
      if(!isExist){
        result.push(obj);
      }
    }
    return result;
  }

  function filterStudentList(array1, array2) {
    let arr1 = array1;
    let arr2 = array2;
    let result = [];
    for(let i = 0; i < arr2.length; i++){
      let obj = array2[i];
      let num = obj.student_number;   //staff_id   就是要对比的key
      let isExist = false;
      for(let j = 0; j < arr1.length; j++){
        let aj = array1[j];
        let n = aj.student_number;
        if(n === num){
          isExist = true;
          break;
        }
      }
      if(!isExist){
        result.push(obj);
      }
    }
    return result;
  }

  export default {
        name: "Course",
      data (){
        return {
          // 单选框
          options:[{
            value: '男',
            label: '男'
          },{
            value: '女',
            label: '女'
          }
          ],
          // 出勤状态
          attendance: "待考勤",
          // 筛选后的课程数据
          afterFilterLessonList: [],
          // 筛选后的学生数据
          afterFilterStudentList: [],
          // 遮罩层
          loading: true,
          // 传入的课程id
          id: '',
          // 选中学生数组
          student_ids: [],
          //选择学生number数组
          student_numbers: [],
          //选中课程id数组
          course_ids: [],
          // 选中学生名
          names: [],
          // 非单个禁用
          single: true,
          // 非多个禁用
          multiple: true,
          // 添加表格数据
          lessonList:[],
          // 隐藏的表格数据
          hideList:[],
          // 表格数据
          courseList:[],
          // 学生列表数据
          studentList:[],
          // 所有学生列表
          allStudentList:[],
          // 列表数据
          courseIdList:[],
          // 弹出层标题
          title: "",
          // 课程弹出层标题
          lesson_title: "",
          // 添加学生弹出框
          student_title:"",
          // 是否显示弹出层
          open: false,
          // 是否显示查看课程对话框
          checkLesson: false,
          // 是否显示添加学生对话框
          addStudent: false,
          //查询参数
          queryParams: {
            course_id: undefined,
            course_name:undefined,
          },
          //查询学生参数
          queryStudentParams:{
            student_id: undefined,
            student_name: undefined,
            student_college: undefined,
            student_attendance: undefined,
            student_profession: undefined,
            student_sex: undefined
          },
          //查询所有学生参数
          queryAllStudentParams:{
            student_id: undefined,
            student_name: undefined,
            student_college: undefined,
            student_attendance: undefined,
            student_profession: undefined,
            student_sex: undefined
          },
          //查询课程参数
          queryCourseParams: {
            course_id: undefined,
            course_name:undefined,
          },
          teacher_username:'',
          course_id:''
        }
      },
      methods:{
        // 多选框选中数据
        handleSelectionChange(selection) {
          this.course_ids = selection.map(item => item.course_id)
          this.single = selection.length!=1
          this.multiple = !selection.length
        },
        // 多选框学生列表选中数据
        handleSelectionStudentChange(selection) {
          this.student_ids = selection.map(item => item.student_number)
          this.names = selection.map(item => item.student_name)
          this.single = selection.length!=1
          this.multiple = !selection.length
        },
        // 多选框添加学生列表选中数据
        handleSelectionAllStudentChange(selection) {
          this.student_numbers = selection.map(item => item.student_number)
          this.single = selection.length!=1
          this.multiple = !selection.length
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
        /** 取消按钮 */
        cancel(){
          this.open = false;
          this.resetForm("queryCourseForm");
        },
        /** 取消按钮 */
        cancelStudent(){
          this.addStudent = false;
          this.resetForm("queryAllStudentForm");
        },
        /** 新增按钮 */
        handleAdd(){
          this.reset();
          this.open = true;
          this.title = "添加课程";
          this.getLessonList();
        },
        /** 添加学生按钮 */
        handleStudentAdd(){
          this.addStudent = true;
          this.student_title = "添加学生";
          this.getAllStudentList();
        },
        /** 重置按钮 */
        resetQuery(){
          this.resetForm("queryForm");
          this.handleQuery();
        },
        /** 开始考勤按钮 */
        startAttendance(){
          this.attendance = "待出勤"
        },
        /** 重置学生表格按钮 */
        resetStudentQuery(){
          this.resetForm("queryStudentForm");
          this.handleStudentQuery();
        },
        /** 重置添加学生表格按钮 */
        resetAllStudentQuery(){
          this.resetForm("queryAllStudentForm");
          this.handleAllStudentQuery();
        },
        /** 对话框重置按钮 */
        resetCourseQuery(){
          this.resetForm("queryCourseParam");
          this.handleCourseQuery();
        },
        /** 搜索按钮 */
        handleQuery(){
          this.getList();
        },
        /** 添加课程提交按钮 */
        submitForm() {
          // console.log(this.course_ids)
          // console.log(this.courseIdList)
          this.$http.get("http://localhost:8081/attendance/course/addCourseByTeacherUsername?courses_id=" + this.course_ids + "&username=" + this.username).then(res => {
            if(res.data.success){
              this.$message.success("添加成功");
              this.open = false;
              this.getList();
            }else {
              this.$message.error("添加失败，服务器异常请稍后再试");
              this.open = false;
              this.getList();
            }
          })
        },
        /** 添加学生提交按钮 */
        submitStudentForm() {
          // console.log(this.student_numbers)
          // console.log(this.courseIdList)
          this.$http.get("http://localhost:8081/attendance/student/addStudentById?id=" + this.id + "&students_number=" + this.student_numbers).then(res => {
            if(res.data.success){
              this.$message.success("添加成功");
              this.addStudent = false;
              this.resetStudentQuery();
            }else {
              this.$message.error("添加失败，服务器异常请稍后再试");
              this.addStudent = false;
              this.resetStudentQuery();
            }
          })
        },
        /** 对话框搜索按钮 */
        handleCourseQuery(){
          this.getLessonList();
        },
        /** 对话框搜索按钮 */
        handleStudentQuery(){
          this.getStudentList();
        },
        /** 对话框搜索按钮 */
        handleAllStudentQuery(){
          this.getAllStudentList();
        },
        /** 展示课程信息按钮 */
        showLesson(name,id,course_id){
          this.id = id;
          this.course_id = course_id;
          this.lesson_title = name;
          this.checkLesson = true;
          // console.log(this.queryStudentParams);
          this.getStudentList();
        },
        /** 删除按钮操作 */
        handleDelete(row) {
          let _this = this;
          const student_numbers = row.student_number || this.student_ids;
          const student_names = row.student_name || this.names;
          this.$confirm('是否确认从此课程删除学生名为"' + student_names + '"的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return _this.$http.get("http://localhost:8081/attendance/student/deleteStudentById?id="+ _this.id + "&students_number=" +student_numbers).then(res=>{
              if(res.data.success){
                _this.$message.success("删除成功");
                _this.getStudentList();
              }else {
                _this.$message.error("删除失败，服务器异常请稍后再试")
                _this.getStudentList();
              }
            });
          }).catch(function() {});
        },
        /** 移除课程按钮操作 */
        handleDeleteCourse(){
          let _this = this;
          this.$confirm('是否确认移除课程名为"' + this.lesson_title + '"的课程?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            return _this.$http.get("http://localhost:8081/attendance/course/deleteCourseByTeacherUsername?course_id=" + _this.course_id + "&username=" + _this.username).then(res =>{
              if (res.data.success){
                _this.checkLesson = false
                _this.$message.success("移除课程成功");
                _this.getList();
              }else {
                _this.checkLesson = false
                _this.$message.error("移除课程失败，服务器异常请稍后再试")
                _this.getList();
              }
            });
          }).catch(function() {});
        },
        getImagePNG(imageUrl){
          return "http://localhost:8081/attendance/lesson/"+ imageUrl +".png"
        },getImageJPG(imageUrl){
          return "http://localhost:8081/attendance/lesson/"+ imageUrl +".jpg"
        },
        getList(){
          this.$http.get("http://localhost:8081/attendance/course/selectCoursesByTeacherId?username=" + this.username + "&course_name=" + this.queryParams.course_name+ "&course_id=" + this.queryParams.course_id).then(res =>{
            this.courseList = res.data.courseList;
          })
          },
        getStudentList(){
          this.$http.get("http://localhost:8081/attendance/student/selectStudentById?id=" + this.id + "&student_id=" + this.queryStudentParams.student_id + "&student_name=" + this.queryStudentParams.student_name + "&student_college=" + this.queryStudentParams.student_college +  "&student_attendance=" + this.queryStudentParams.student_attendance +  "&student_profession=" + this.queryStudentParams.student_profession + "&student_sex=" + this.queryStudentParams.student_sex ).then(res =>{
            if (res.data.success === true){
              this.studentList = res.data.studentList
              this.loading = false
            }
          })
        },
        getAllStudentList(){
          this.$http.post("http://localhost:8081/attendance/student/selectStudentList",this.queryAllStudentParams).then(res =>{
            if (res.data.success === true){
              this.allStudentList = res.data.studentsList
              this.loading = false
            }
          })
        },
        getLessonList(){
          this.loading = true;
          this.$http.post("http://localhost:8081/attendance/course/selectList",this.queryCourseParams).then(res=>{
            this.lessonList = res.data.coursesList ;
            this.loading = false ;
          })
        }
      },
      beforeUpdate() {
      },
      updated(){

      },
      created() {
        this.getList();
      },
      props:['username'],
      watch:{
        username: function (val) {
          this.teacher_username = val
          this.getList();
        }
      },
      computed:{
        // 筛除已有数据
        hideLessonList(){
          const arr3 = filterLessonList(this.courseList,this.lessonList)
          this.afterFilterLessonList = arr3;
          return arr3
        },
        // 筛选已有的学生数据
        hideStudentList(){
          // console.log(this.studentList)
          // console.log(this.allStudentList)
          const arr1 = filterStudentList(this.studentList, this.allStudentList)
          this.afterFilterStudentList = arr1;
          return arr1
        }
      }

    }

</script>

<style scoped>
  .el-table .hidden-row {

    display: none;

  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    display: block;
  }
  .text{
margin-top: 20px;
    margin-bottom: 20px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both  }

  .el-button--goon.is-active,
  .el-button--goon:active {
    background: #20B2AA;
    border-color: #20B2AA;
    color: #fff;
  }
  .image {
    width: 264px;
    height: 370px;
    /*width: 100%;*/
    display: block;
    object-fit: fill;
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

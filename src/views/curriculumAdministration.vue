<template>
  <!-- 课程签到 -->
  <div class="curriculumAdministration">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="课程签到" name="curriculumAdministration">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="客户名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 列表 -->
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column show-overflow-tooltip align="center" label="序号" min-width="40">
            <template slot-scope="scope">{{ scope.$index+1 }}</template>
          </el-table-column>
          <el-table-column
            prop="user_name"
            show-overflow-tooltip
            align="center"
            label="客户名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="lesson_time"
            show-overflow-tooltip
            align="center"
            label="剩余课时"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="ceping_count"
            show-overflow-tooltip
            align="center"
            label="已测评"
            min-width="80"
          >
            <template slot-scope="scope">
              <font
                @click="subjectTested(scope.row.id)"
                color="#2cb4df"
                style="display: block;cursor:pointer;"
              >{{ scope.row.ceping_count }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="sign_time"
            show-overflow-tooltip
            align="center"
            label="上次签到"
            min-width="80"
          >
            <template slot-scope="scope">
              <font>{{ scope.row.sign_time?scope.row.sign_time:'未开始' }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="创建时间"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="150" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.lesson_time == 0"
                @click="signIn(scope.row)"
                style="color:#E6A23C;margin-left: 0!important;"
              >课程签到</el-button>
              <el-button type="text" v-else @click="signIn(scope.row)">课程签到</el-button>
              <el-button type="text" @click="signInRecord(scope.row.id),1">签到记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="fenYe.currentPage"
      layout="total, prev, pager, next, jumper"
      :total="fenYe.total"
    ></el-pagination>
    <!-- dialog -->
    <el-dialog title="签到记录" :visible.sync="dialogVisible1" width="80%" :before-close="closeDialogVisible1">
      <el-table :data="record" stripe highlight-current-row style="width: 100%">
        <el-table-column label="序号" type="index" align="center" min-width="50"></el-table-column>
        <el-table-column prop="create_time" label="签到日期" align="center" min-width="150"></el-table-column>
        <el-table-column prop="teacher_name" label="老师姓名" align="center" min-width="150"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="position: static;margin-top:15px;"
        @current-change="handleCurrentChange1"
        :current-page.sync="fenYe1.currentPage1"
        layout="total, prev, pager, next"
        :total="fenYe1.total"
      ></el-pagination>
      <el-button type="primary" @click="closeDialogVisible1" style="float: right;margin-top:15px;">我知道了</el-button>
    </el-dialog>
    <!-- dialog -->
    <el-dialog title="确定签到课时么？" :visible.sync="dialogVisible2" width="40%">
      <p style="font-size:16px">
        当前剩余课时
        <span style="color:#409EFF;ont-size:28px">{{ stime }}</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="curriculumDetermine">确定签到</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "curriculumAdministration",
  data() {
    return {
      // 当前的tap
      activeName: "curriculumAdministration",
      // 用户id
      uid: "",
      // 检索内容
      ruleForm: {
        name: ""
      },
      // 课程签到
      informantType: "",
      // 列表数据
      tableData: [],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      // dialog
      dialogVisible1: false,
      dialogVisible2: false,
      // 剩余课时
      stime: "",
      // 客户id
      uid: "",
      record: [],
      // 分页
      fenYe1: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      }
    };
  },
  methods: {
    // 查询
    submitForm() {
      this.createdData(1);
    },
    // 重置
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.createdData(1);
    },
    // 当前页数
    handleCurrentChange(val) {
      this.createdData(val);
    },
    // 点击已测评数 - 跳转已测评
    subjectTested(id) {
      this.$router.push({
        path: "/subjectTested",
        query: {
          id: id
        }
      });
    },
    // 课程签到
    signIn(row) {
      if (row.lesson_time == 0) {
        this.$message.warning("您的课时已用完，请添加课时!");
      } else {
        this.dialogVisible2 = true;
        this.uid = row.id;
        this.stime = row.lesson_time;
      }
    },
    // 课程签到 - 确定
    curriculumDetermine() {
      let type = "post";
      let url = "url1/user/lessontime";
      let data = {
        uid: this.uid,
        lesson_time: -1
      };
      this.myAjax(type, url, data, res => {
        this.createdData(1);
        this.$message.success("签到成功");
        this.dialogVisible2 = false;
      });
    },
    // 签到记录
    signInRecord(row) {
      this.uid = row
      this.dialogVisible1 = true;
      let type = "post";
      let url = "url1/lesson/signlist";
      let data = {
        uid: this.uid,
        page: this.fenYe1.page
      };
      this.myAjax(type, url, data, res => {
        this.fenYe1.total = res.data.data.page;
        this.record = res.data.data.list;
        for (let i = 0; i < this.record.length; i++) {
          this.record[i].create_time = new Date(
            this.record[i].create_time * 1000
          ).Format("yy-MM-dd");
        }
      });
    },
    // 关闭签到记录对话框
    closeDialogVisible1(){
      this.fenYe1.page = 1;
      this.fenYe1.total = null;
      this.dialogVisible1 = false;
    },
    // 签到记录 - 当前页数
    handleCurrentChange1(val) {
      this.fenYe1.page = val;
      this.signInRecord(this.uid);
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/user/lists";
      let data = {
        user_name: this.ruleForm.name,
        page: page
      };
      this.myAjax(type, url, data, res => {
        this.fenYe.total = res.data.data.page;
        this.tableData = res.data.data.list;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].create_time = new Date(
            this.tableData[i].create_time * 1000
          ).Format("yy-MM-dd");
        }
      });
    }
  },
  created() {
    this.createdData(1);
    // setTimeout(function() {
    //   _this.$nextTick(() => {
    //     console.log(_this.tableData);
    //   });
    //   _this.ascriptionTeacher();
    // }, 500);
  },
  mounted() {},
  watch: {}
};
</script>
  
 <style lang="less" scoped>
 .curriculumAdministration /deep/ .el-dialog__body {
   overflow: hidden;
 }
.curriculumAdministration {
  height: 100%;
  background: #fff;
  padding: 0 0.2rem;
  position: relative;
  .demo-ruleForm {
    .el-form-item {
      float: left;
    }
  }
  .jxda {
    position: absolute;
    top: 0.06rem;
    right: 0.4rem;
    z-index: 1;
  }
}
</style>
  
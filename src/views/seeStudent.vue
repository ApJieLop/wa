<template>
  <!-- 查看学员 -->
  <div class="seeStudent">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看学员" name="seeStudent">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="题目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入学客户名称"></el-input>
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
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="lesson_time"
            show-overflow-tooltip
            align="center"
            label="剩余课时"
            min-width="80"
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
                style="display: block;"
              >{{ scope.row.ceping_count }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="创建时间"
            min-width="80"
          ></el-table-column>
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
    <el-dialog title="查看" :visible.sync="dialogVisible1" width="60%"></el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "seeStudent",
  data() {
    return {
      // 当前的tap
      activeName: "seeStudent",
      // 客户id
      id: "",
      // 检索内容
      ruleForm: {
        name: ""
      },
      // 列表数据
      tableData: [],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      // dialog
      dialogVisible1: false
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
    // 已测题目
    subjectTested(id) {
      this.$router.push({
        path: "/subjectTested",
        query: {
          id: id
        }
      });
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/user/lists";
      let data = {
        page: page
      };
      if(this.id){
        data.teacher_id = this.id;
      }
      this.myAjax(type, url, data, res => {
        this.fenYe.total = res.data.data.page;
        this.tableData = res.data.data.list;
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.createdData(1);
  },
  mounted() {}
};
</script>
  
 <style lang="less" scoped>
.seeStudent {
  height: 100%;
  background: #fff;
  padding: 0 0.2rem;
  position: relative;
  .demo-ruleForm {
    .el-form-item {
      float: left;
    }
  }
  .xzls {
    position: absolute;
    top: 0.06rem;
    right: 0.4rem;
    z-index: 1;
  }
}
</style>
  
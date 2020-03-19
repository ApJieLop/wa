<template>
  <!-- 已测题目 -->
  <div class="subjectTested">
    <!-- 继续测评 -->
    <el-button type="text" @click="jxcp" class="xzls">继续测评</el-button>
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="已测题目" name="subjectTested">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="题目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入题目名称"></el-input>
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
            prop="juan_title"
            show-overflow-tooltip
            align="center"
            label="题目名称"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="测评时间"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="score"
            show-overflow-tooltip
            align="center"
            label="测评分数"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="see(scope.$index,scope.row)">查看</el-button>
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
    <el-dialog title="查看" :visible.sync="dialogVisible1" width="60%">
      <p>试卷名称:{{ this.result.name }}</p>
      <br />
      <p>答题分数:{{ this.result.num }}</p>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "subjectTested",
  data() {
    return {
      // 当前的tap
      activeName: "subjectTested",
      // id
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
      dialogVisible1: false,
      // 查看测评结果
      result: {
        name: "",
        num: ""
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
    // 继续测评
    jxcp() {
      history.go(-1);
    },
    // 查看
    see(index, row) {
      this.dialogVisible1 = true;
      this.result.name = row.juan_title;
      this.result.num = row.score;
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/ceping/lists";
      let data = {
        uid: this.id,
        page:page
      };
      this.myAjax(type, url, data, res => {
        this.fenYe.total = res.data.data.page;
        this.tableData = res.data.data.list.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].create_time = new Date(
            this.tableData[i].create_time * 1000
          ).Format("yy-MM-dd");
        }
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].birthday = new Date(
            this.tableData[i].birthday * 1000
          ).Format("yy-MM-dd");
        }
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
.subjectTested {
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
  
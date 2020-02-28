<template>
  <!-- 查看学员 -->
  <div class="seeStudent">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="查看学员" name="seeStudent">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="题目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入学员名称"></el-input>
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
            prop="a"
            show-overflow-tooltip
            align="center"
            label="学员名称"
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="b"
            show-overflow-tooltip
            align="center"
            label="剩余课时"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="c"
            show-overflow-tooltip
            align="center"
            label="答题数量"
            min-width="80"
          >
            <template slot-scope="scope">
              <font
                @click="subjectTested(scope.row.id)"
                color="#2cb4df"
                style="display: block;"
              >{{ scope.row.c }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="d"
            show-overflow-tooltip
            align="center"
            label="上课日期"
            min-width="80"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="fenYe.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="fenYe.size"
      layout="total, sizes, prev, pager, next, jumper"
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
      // id
      id: "",
      // 检索内容
      ruleForm: {
        name: ""
      },
      // 列表数据
      tableData: [
        {
          id: 1,
          a: "赵金福1",
          b: 50,
          c: 6,
          d: "2020-01-05 12:00"
        },
        {
          id: 2,
          a: "赵金福1",
          b: 50,
          c: 6,
          d: "2020-01-05 12:00"
        },
        {
          id: 3,
          a: "赵金福1",
          b: 50,
          c: 6,
          d: "2020-01-05 12:00"
        },
        {
          id: 4,
          a: "赵金福1",
          b: 50,
          c: 6,
          d: "2020-01-05 12:00"
        }
      ],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        size: 10, // 每页多少条
        total: 100 // 共多少页
      },
      // dialog
      dialogVisible1: false
    };
  },
  methods: {
    // 查询
    submitForm() {
      this.createdData(1, this.fenYe.size);
    },
    // 重置
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.createdData(1, this.fenYe.size);
    },
    // 每页多少条
    handleSizeChange(val) {
      this.createdData(1, val);
    },
    // 当前页数
    handleCurrentChange(val) {
      this.createdData(val, this.fenYe.size);
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
    createdData(page, pages) {
      let type = "";
      let url = "";
      let data = {};
      this.myAjax(type, url, data, res => {
        if (res.data == 200) {
        }
      });
    }
  },
  created() {
    // this.createdData(1,this.fenYe.size);
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
  
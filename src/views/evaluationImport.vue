<template>
  <!-- 测评导入 -->
  <div class="evaluationImport">
    <el-button class="importEvaluation" type="text"  @click="see">导入测评</el-button>
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="测评导入" name="evaluationImport">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="测评题目" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入测评题目"></el-input>
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
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="b"
            show-overflow-tooltip
            align="center"
            label="答题人数(人)"
            min-width="100"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="上传时间"
            min-width="100"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">             
              <el-button type="text" @click="see(scope.row)">编辑</el-button>
              <el-button type="text" style="color:red" @click="deletes(scope.$index,scope.row)">删除</el-button>
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
  </div>
</template>
  
  <script>
export default {
  name: "evaluationImport",
  data() {
    return {
      // 当前的tap
      activeName: "evaluationImport",
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
    // 编辑
    see(row) {
      if(row.id){
        this.$router.push({
          path: "/testPaper",
          query: {
            id: row.id
          }
        });
      } else {
        this.$router.push({
          path: "/testPaper",
        });
      }
    },
    // 删除
    deletes(index,row) {
      this.$confirm("您确定要删除该条数据么？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let type = "post";
          let url = "url1/juan/delete";
          let data = {
            id:row.id
          };
          this.myAjax(type, url, data, res => {          
            this.$message.success(res.data.message);
            this.createdData(1);            
          });
        })
        .catch(() => {});
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/juan/lists";
      let data = {
        juan_title: this.ruleForm.name,
        page:page
      };
      this.myAjax(type, url, data, res => {
        console.log(res.data.data)
        this.fenYe.total = res.data.data.list.total;
        this.tableData = res.data.data.list.data;
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
  },
  mounted() {}
};
</script>
  
 <style lang="less" scoped>
.evaluationImport {
  height: 100%;
  background: #fff;
  padding: 0 0.2rem;
  position: relative;
  .importEvaluation {
    position: absolute;
    top: .05rem;
    right: .4rem;
    z-index: 1;
  }
  .demo-ruleForm {
    .el-form-item {
      float: left;
    }
  }
}
</style>
  
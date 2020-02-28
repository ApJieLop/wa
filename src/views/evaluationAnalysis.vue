<template>
  <!-- 测评分析 -->
  <div class="evaluationAnalysis">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="测评分析" name="evaluationAnalysis">
      <!-- 检索 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="测评题目" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="答题日期" prop="sj">
          <el-date-picker
            style="width:2.5rem;"
            v-model="ruleForm.sj"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
            prop="name"
            show-overflow-tooltip
            align="center"
            label="题目名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            align="center"
            label="测评人姓名"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            align="center"
            label="测评人电话"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            align="center"
            label="答题分数"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">建新档案</el-button>
              <el-button type="text" @click="see(scope.row)">查看</el-button>
              <el-button type="text" style="color:red" @click="deletes(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
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
    <el-dialog title="新建客户档案" :visible.sync="dialogVisible" width="60%">
      <el-form
        :model="addData"
        ref="addData"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        style="display: block;
        overflow: hidden;
        margin: auto;
        width: 90%;"
      >
        <el-form-item label="客户名称" prop="name" style="width:4rem;">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="选择课程" prop="curriculum" style="width:4rem;">
          <el-select v-model="addData.curriculum" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:4rem;">
          <el-input v-model="addData.phone"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" style="width:4rem;">
          <el-input v-model="addData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determineAdd('addData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "evaluationAnalysis",
  data() {
    return {
      // 当前的tap
      activeName: "evaluationAnalysis",
      // 检索内容
      ruleForm: {
        name: "",
        sj: ""
      },
      // 课程下拉数据
      options: [
        {
          id: "选项1",
          title: "黄金糕"
        },
        {
          id: "选项2",
          title: "双皮奶"
        },
        {
          id: "选项3",
          title: "蚵仔煎"
        },
        {
          id: "选项4",
          title: "龙须面"
        },
        {
          id: "选项5",
          title: "北京烤鸭"
        }
      ],
      // 建新档案
      addData: {
        name: "",
        curriculum: "",
        phone: "",
        password: ""
      },
      // 建新档案 - 数据校验
      rules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        curriculum: [
          { required: true, message: "请选择课程", trigger: "change" }
        ],
        phone: [{ required: true, message: "请输入手机少", trigger: "blur" }],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      },
      // 列表数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市16 弄"
        }
      ],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        size: 10, // 每页多少条
        total: 100 // 共多少页
      },
      // dialog
      dialogVisible: false
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
    // 查看
    see(row) {
      this.$router.push({
        path: "/evaluationResult",
        query: {
          id: row.id
        }
      });
    },
    // 删除
    deletes() {
      this.$confirm("您确定要删除该条数据么？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let type = "";
          let url = "";
          let data = {};
          this.myAjax(type, url, data, res => {
            if (res.data == 200) {
              this.$message.success("删除成功");
              this.createdData(1, this.fenYe.size);
            }
          });
        })
        .catch(() => {});
    },
    // 确定添加档案
    determineAdd(addData) {
      this.$refs[addData].validate(valid => {
        if (valid) {
          let type = "";
          let url = "";
          let data = {};
          this.myAjax(type, url, data, res => {
            if (res.data == 200) {
              this.createdData(1,this.fenYe.size);
               this.$message.success("添加文档成功");
            }
          });
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
.evaluationAnalysis {
  height: 100%;
  background: #fff;
  padding: 0 0.2rem;
  .demo-ruleForm {
    .el-form-item {
      float: left;
    }
  }
}
</style>
  
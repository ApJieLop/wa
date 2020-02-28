<template>
  <!-- 课程管理 -->
  <div class="scurriculumAdministration">
    <!-- 添加课程 -->
    <el-button type="text" @click="addEdit" class="xzls">新增课程</el-button>
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="课程管理" name="scurriculumAdministration">
      <!-- 检索 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
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
            label="课程名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="b"
            show-overflow-tooltip
            align="center"
            label="课时"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="c"
            show-overflow-tooltip
            align="center"
            label="创建时间"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="addEdit(scope.row)">修改</el-button>
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
    <el-dialog :title="addData.id?'修改课程':'新增课程'" :visible.sync="dialogVisible1" width="60%">
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
        <el-form-item label="课程名称" prop="name" style="width:4rem;">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="课程周期" prop="cycle" style="width:4rem;">
          <el-input v-model="addData.cycle"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="determineAdd('addData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "scurriculumAdministration",
  data() {
    return {
      // 当前的tap
      activeName: "scurriculumAdministration",
      // 检索内容
      ruleForm: {
        name: "",
      },
      // 新建老师
      addData: {
        name: "",
        cycle: ""
      },
      // 建新老师 - 数据校验
      rules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        cycle: [{ required: true, message: "请输入手机少", trigger: "blur" }],  
      },
      // 列表数据
      tableData: [
        {
          id: 1,
          a: "赵金福1",
          b: 50,
          c: "2020-01-05 12:00",
          d: 6,
        },
        {
          id: 2,
          a: "赵金福2",
          b: 60,
          c: "2020-01-05 12:00",
          d: 6,
        },
        {
          id: 3,
          a: "赵金福3",
          b: 70,
          c: "2020-01-05 12:00",
          d: 6,
        },
        {
          id: 4,
          a: "赵金福4",
          b: 80,
          c: "2020-01-05 12:00",
          d: 6,
        },
      ],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        size: 10, // 每页多少条
        total: 100 // 共多少页
      },
      // dialog
      dialogVisible1: false,
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
    // 添加 - 编辑
    addEdit(row) {
      if (row.id) {
        this.addData.id = row.id;
        this.addData.name = row.a;
        this.addData.cycle = row.d;
      } else {
        Object.keys(this.addData).forEach(key => (this.addData[key] = ""));
      }
      this.dialogVisible1 = true;
    },
    // 确定 - 添加/修改 - 老师
    determineAdd(addData) {
      this.$refs[addData].validate(valid => {
        if (valid) {
          let type = "";
          let url = "";
          let data = {};
          if (this.addData.id) {
            data.id = this.addData.id;
          }
          this.myAjax(type, url, data, res => {
            if (res.data == 200) {
              this.createdData(1, this.fenYe.size);
              this.$message.success("添加课程成功");
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
    // this.getCurriculum();
  },
  mounted() {}
};
</script>
  
 <style lang="less" scoped>
.scurriculumAdministration {
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
  
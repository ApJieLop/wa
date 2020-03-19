<template>
  <!-- 老师管理 -->
  <div class="teacherAdministration">
    <!-- 建新档案 -->
    <el-button type="text" @click="addEdit" class="xzls">新增老师</el-button>
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="老师管理" name="teacherAdministration">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="老师名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入老师名称"></el-input>
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
            prop="teacher_name"
            show-overflow-tooltip
            align="center"
            label="老师姓名"
            min-width="80"
          ></el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="学员数量" min-width="80">
            <template slot-scope="scope">
              <font
                @click="jumpSeeStudent(scope.row.id)"
                color="#2cb4df"
                style="display: block;cursor:pointer;"
              >{{ scope.row.user_count }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
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
      @current-change="handleCurrentChange"
      :current-page.sync="fenYe.currentPage"
      layout="total, prev, pager, next, jumper"
      :total="fenYe.total"
    ></el-pagination>
    <!-- dialog -->
    <el-dialog :title="addData.id?'修改老师':'新增老师'" :visible.sync="dialogVisible1" width="60%">
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
        <el-form-item label="老师名称" prop="name" style="width:4rem;">
          <el-input v-model="addData.name" placeholder="请输入老师名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" style="width:4rem;">
          <el-input v-model="addData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password" style="width:4rem;">
          <el-input v-model="addData.password" placeholder="请输入密码/修改时不填写为上次密码"></el-input>
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
  name: "teacherAdministration",
  data() {
    return {
      // 当前的tap
      activeName: "teacherAdministration",
      // 检索内容
      ruleForm: {
        name: ""
      },
      // 新建老师
      addData: {
        name: "",
        phone: "",
        password: ""
      },
      // 建新老师 - 数据校验
      rules: {
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机少", trigger: "blur" }]
        // password: [
        //   { required: true, message: "请输入登录密码", trigger: "blur" }
        // ]
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
    // 学员数量 - 跳转查看学员页面
    jumpSeeStudent(id){
      this.$router.push({
        path: "/seeStudent",
        query: {
          id: id
        }
      });
    },
    // 删除
    deletes(index, row) {
      this.$confirm("您确定要删除该条数据么？", "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let type = "url1/teacher/delete";
          let url = "post";
          let data = {
            id: row.id
          };
          this.myAjax(type, url, data, res => {
            this.createdData(this.fenYe.currentPage);
            this.$message.success(res.data.message);
          });
        })
        .catch(() => {
          this.$message.error(res.data.message + "请联系管理员");
        });
    },
    // 添加 - 编辑
    addEdit(row) {
      if (row.id) {
        let type = "post";
        let url = "url1/teacher/get";
        let data = {
          id: row.id
        };
        this.myAjax(type, url, data, res => {
          this.addData.id = res.data.data.id;
          this.addData.name = res.data.data.teacher_name;
          this.addData.phone = res.data.data.teacher_mobile;
          this.addData.password = "";
        });    
      } else {
        Object.keys(this.addData).forEach(key => (this.addData[key] = ""));
      }
      this.dialogVisible1 = true;
    },
    // 确定添加老师
    determineAdd(addData) {
      this.$refs[addData].validate(valid => {
        if (valid) {
          if (this.addData.id) {
            let type = "post";
            let url = "url1/teacher/edit";
            let data = {
              id: this.addData.id,
              teacher_name: this.addData.name,
              teacher_mobile: this.addData.phone,
              teacher_password: this.addData.password
            };
            this.myAjax(type, url, data, res => {
              this.createdData(1);
              this.$message.success(res.data.message);
              this.dialogVisible1 = false;
            });
          } else {
            if (this.addData.password) {
              let type = "post";
              let url = "url1/teacher/add";
              let data = {
                teacher_name: this.addData.name,
                teacher_mobile: this.addData.phone,
                teacher_password: this.addData.password
              };
              this.myAjax(type, url, data, res => {
                this.createdData(1);
                this.$message.success(res.data.message);
                this.dialogVisible1 = false;
              });
            } else {
              this.$message.warning("添加老师时登录密码不能为空");
              return false;
            }
          }
        }
      });
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/teacher/lists";
      let data = {
        teacher_name: this.ruleForm.name,
        page: page
      };
      this.myAjax(type, url, data, res => {
        this.fenYe.total = res.data.data.page;
        this.tableData = res.data.data.list;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].create_time = new Date(
            this.tableData[i].create_time*1000
          ).Format("yy-MM-dd");
        }
        console.log(res.data.data.list);
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
.teacherAdministration {
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
  
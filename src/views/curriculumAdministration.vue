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
            prop="e"
            show-overflow-tooltip
            align="center"
            label="开课日期"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="创建时间"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="signIn(scope.row)">课程签到</el-button>
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
    <el-dialog title="课程签到" :visible.sync="dialogVisible2" width="60%">
      <el-radio-group v-model="informantType" style="text-align: left;">
        <el-radio
          style="width: 45%;height: .4rem;text-align: center;"
          v-for="item in informantTypeData"
          :key="item.id"
          :value="item.id"
          :label="item.id"
        >{{item.title}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="curriculumDetermine">确 定</el-button>
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
      informantTypeData: [
        {
          id: 1,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 2,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 3,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 4,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 5,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 6,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 7,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 8,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 9,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 10,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 11,
          title: "存在欺诈骗钱行为"
        },
        {
          id: 12,
          title: "存在欺诈骗钱行为"
        }
      ],
      // 列表数据
      tableData: [],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: null // 共多少页
      },
      // dialog
      dialogVisible2: false
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
    // 课程签到
    signIn(row) {
      this.dialogVisible2 = true;
      this.uid = row.id;
    },
    // 课程签到 - 确定
    curriculumDetermine() {
      this.dialogVisible2 = false;
      console.log(this.informantType);
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
  mounted() {}
};
</script>
  
 <style lang="less" scoped>
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
  
<template>
  <!-- 课时管理 - 学员 -->
  <div class="curriculumAdministration">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="课程绑定" name="curriculumAdministration">
      <!-- 检索 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="课程名称" prop="name1">
          <el-input v-model="ruleForm.name1"></el-input>
        </el-form-item>
        <el-form-item label="客户名称" prop="name2">
          <el-input v-model="ruleForm.name2"></el-input>
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
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="b"
            show-overflow-tooltip
            align="center"
            label="课程名称"
            min-width="120"
          ></el-table-column>
          <el-table-column
            prop="c"
            show-overflow-tooltip
            align="center"
            label="剩余课时"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="d"
            show-overflow-tooltip
            align="center"
            label="开课日期"
            min-width="80"
          ></el-table-column>
          <el-table-column prop="e" show-overflow-tooltip align="center" label="已测评" min-width="80"></el-table-column>
          <el-table-column
            prop="f"
            show-overflow-tooltip
            align="center"
            label="答题数量"
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="fenYe.currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="fenYe.size"
      layout="total, sizes, prev, pager, next, jumper"
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
      // 选中当前列表的id
      zid:"",
      // 检索内容
      ruleForm: {
        name1: "",
        name2: ""
      },
      // 课程签到
      informantType: '',
      informantTypeData: [{
          id: 1,
          title: "存在欺诈骗钱行为"
        },{
          id: 2,
          title: "存在欺诈骗钱行为"
        }, {
          id: 3,
          title: "存在欺诈骗钱行为"
        }, {
          id: 4,
          title: "存在欺诈骗钱行为"
        }, {
          id: 5,
          title: "存在欺诈骗钱行为"
        }, {
          id: 6,
          title: "存在欺诈骗钱行为"
        }, {
          id: 7,
          title: "存在欺诈骗钱行为"
        }, {
          id: 8,
          title: "存在欺诈骗钱行为"
        }, {
          id: 9,
          title: "存在欺诈骗钱行为"
        }, {
          id: 10,
          title: "存在欺诈骗钱行为"
        }, {
          id: 11,
          title: "存在欺诈骗钱行为"
        },{
          id: 12,
          title: "存在欺诈骗钱行为"
        },
      ],
      // 列表数据
      tableData: [
        {
          id: 1,
          bid: 1,
          a: "2016-05-02",
          b: "胜多负少的",
          c: "18332521721",
          d: "上海市",
          e: "上海市",
          f: "上海市",
          j: "zjf18332521721"
        },
        {
          id: 2,
          bid: 2,
          a: "2016-05-02",
          b: "胜多负少的",
          c: "18332521721",
          d: "上海市",
          e: "上海市",
          f: "上海市",
          j: "zjf18332521721"
        },
        {
          id: 3,
          bid: 3,
          a: "2016-05-02",
          b: "胜多负少的",
          c: "18332521721",
          d: "上海市",
          e: "上海市",
          f: "上海市",
          j: "zjf18332521721"
        },
        {
          id: 4,
          bid: 4,
          a: "2016-05-02",
          b: "胜多负少的",
          c: "18332521721",
          d: "上海市",
          e: "上海市",
          f: "上海市",
          j: "zjf18332521721"
        }
      ],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        size: 10, // 每页多少条
        total: 100 // 共多少页
      },
      // dialog
      dialogVisible2: false
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
    // 获取所有课程
    getCurriculum(){
      let type = "";
      let url = "";
      let data = {};
      this.myAjax(type, url, data, res => {
        if (res.data == 200) {
          this.informantTypeData = res.data;
        }
      });
    },
    // 课程签到
    signIn(row){
        this.dialogVisible2 = true;
        this.zid = row.id;
        console.log(this.zid)
    },
    // 课程签到 - 确定
    curriculumDetermine() {
      this.dialogVisible2 = false;
      console.log(this.informantType)
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
  
<template>
  <!-- 学员管理 -->
  <div class="studentManagement">
    <!-- 建新档案 -->
    <el-button type="text" @click="addEdit" class="jxda">建新档案</el-button>
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="学员管理" name="studentManagement">
      <!-- 检索 -->
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="客户名称" prop="name">
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
            prop="a"
            show-overflow-tooltip
            align="center"
            label="客户名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="b"
            show-overflow-tooltip
            align="center"
            label="课程名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="c"
            show-overflow-tooltip
            align="center"
            label="联系电话"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="d"
            show-overflow-tooltip
            align="center"
            label="创建时间"
            min-width="80"
          ></el-table-column>
          <el-table-column prop="e" show-overflow-tooltip align="center" label="已测评" min-width="80">
          <template slot-scope="scope">
              <font
                @click="subjectTested(scope.row.id)"
                color="#2cb4df"
                style="display: block;"
              >{{ scope.row.e }}</font>
            </template>
          </el-table-column>
          <el-table-column
            prop="f"
            show-overflow-tooltip
            align="center"
            label="宝宝出生日期"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="signIn(scope.row)">签到</el-button>
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
    <el-dialog :title="addData.id?'修改档案':'建新档案'" :visible.sync="dialogVisible1" width="60%">
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
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="determineAdd('addData')">确 定</el-button>
      </span>
    </el-dialog>
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
  name: "studentManagement",
  data() {
    return {
      // 当前的tap
      activeName: "studentManagement",
      // 检索内容
      ruleForm: {
        name: "",
        sj: ""
      },
      // 课程下拉数据
      options: [
        {
          id: 1,
          title: "黄金糕"
        },
        {
          id: 2,
          title: "双皮奶"
        },
        {
          id: 3,
          title: "蚵仔煎"
        },
        {
          id: 4,
          title: "龙须面"
        },
        {
          id: 5,
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
          id: 11,
          title: "存在欺诈骗钱行为"
        },
      ],
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
      dialogVisible1: false,
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
        this.addData.curriculum = row.bid;
        this.addData.phone = row.c;
        this.addData.password = row.j;
      } else {
        Object.keys(this.addData).forEach(key => (this.addData[key] = ""));
      }
      this.dialogVisible1 = true;
    },
    // 确定添加档案
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
              this.$message.success("添加文档成功");
            }
          });
        }
      });
    },
    // 获取所有课程
    getCurriculum(){
      let type = "";
      let url = "";
      let data = {};
      this.myAjax(type, url, data, res => {
        if (res.data == 200) {
          this.options = res.data;
        }
      });
    },
    // 已测评
    subjectTested(id) {
      this.$router.push({
        path: "/subjectTested",
        query: {
          id: id
        }
      });
    },
    // 课程签到
    signIn(row){
        this.dialogVisible2 = true;
        this.zid = row.id;
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
.studentManagement {
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
  
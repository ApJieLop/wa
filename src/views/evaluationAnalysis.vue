<template>
  <!-- 测评分析 -->
  <div class="evaluationAnalysis">
    <!-- tap -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="测评分析" name="evaluationAnalysis">
        <!-- 检索 -->
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="测评题目" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入测评题目"></el-input>
          </el-form-item>
          <el-form-item label="客户名称" prop="sj">
            <el-input v-model="ruleForm.sj" placeholder="请输入客户名称"></el-input>
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
            label="试卷名称"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="jiazhang_name"
            show-overflow-tooltip
            align="center"
            label="测评人姓名"
            min-width="80"
          ></el-table-column>
           <el-table-column
            prop="create_time"
            show-overflow-tooltip
            align="center"
            label="测评时间"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="jiazhang_mobile"
            show-overflow-tooltip
            align="center"
            label="测评人电话"
            min-width="80"
          ></el-table-column>
          <el-table-column
            prop="score"
            show-overflow-tooltip
            align="center"
            label="答题分数"
            min-width="80"
          ></el-table-column>
          <el-table-column align="center" label="操作" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible1 = true">建新档案</el-button>
              <el-button type="text" @click="see(scope.row)">查看</el-button>
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
    <el-dialog title="建新客户档案" :visible.sync="dialogVisible1" width="60%">
      <el-form
        :model="addData"
        ref="addData"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        style="display: block;
        overflow: hidden;
        margin: auto;
        width: 90%;"
      >
        <!-- <el-form-item
          label="客户编号"
          prop="userNumber"
          style="width:4rem;"
          v-if="addData.id?true:false"
        >
          <el-input v-model="addData.userNumber"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="选择课程" prop="curriculum" style="width:4rem;">
          <el-select v-model="addData.curriculum" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="宝宝名称" prop="b_name" style="width:4rem;">
          <el-input v-model="addData.b_name" placeholder="请输入宝宝名称"></el-input>
        </el-form-item>
        <el-form-item label="宝宝性别" prop="b_gender" style="width:4rem;">
          <el-radio v-model="addData.b_gender" label="1">男</el-radio>
          <el-radio v-model="addData.b_gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="宝宝出生日期" prop="b_birthData" style="width:4rem;">
          <el-date-picker
            style="width: 100%;"
            v-model="addData.b_birthData"
            type="date"
            placeholder="请选择宝宝出生日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="完成问卷时间" prop="b_questionnaire" style="width:4rem;">
          <el-date-picker
            style="width: 100%;"
            v-model="addData.b_questionnaire"
            type="date"
            placeholder="请选择完成问卷时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="宝宝年龄" prop="b_age" style="width:4rem;">
          <el-input v-model="addData.b_age" placeholder="请输入宝宝年龄/月/天"></el-input>
        </el-form-item>
        <el-form-item label="出生时体重" prop="b_weight" style="width:4rem;">
          <el-input v-model="addData.b_weight" placeholder="请输入出生时体重/kg"></el-input>
        </el-form-item>
        <el-form-item label="出生时情况" prop="j_situation" style="width:4rem;">
          <el-checkbox-group v-model="addData.j_situation" style="text-align: left;">
            <el-checkbox label="1">足月</el-checkbox>
            <el-checkbox label="2">早产</el-checkbox>
            <el-checkbox label="3">顺产</el-checkbox>
            <el-checkbox label="4">剖腹产</el-checkbox>
            <el-checkbox label="5">产钳助产</el-checkbox>
            <el-checkbox label="6">吸引器助产</el-checkbox>
            <el-checkbox label="7">双胞胎</el-checkbox>
            <el-checkbox label="8">多胞胎</el-checkbox>
            <el-checkbox label="9">其他异常情况</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="父亲姓名" prop="f_name" style="width:4rem;">
          <el-input v-model="addData.f_name" placeholder="请输入父亲姓名"></el-input>
        </el-form-item>
        <el-form-item label="父亲联系方式" prop="f_phone" style="width:4rem;">
          <el-input v-model="addData.f_phone" placeholder="请输入父亲联系方式"></el-input>
        </el-form-item>
        <el-form-item label="父亲文化程度" prop="f_culture" style="width:4rem;">
          <el-input v-model="addData.f_culture" placeholder="请输入父亲文化程度"></el-input>
        </el-form-item>
        <el-form-item label="母亲姓名" prop="m_name" style="width:4rem;">
          <el-input v-model="addData.m_name" placeholder="请输入母亲姓名"></el-input>
        </el-form-item>
        <el-form-item label="母亲联系方式" prop="m_phone" style="width:4rem;">
          <el-input v-model="addData.m_phone" placeholder="请输入母亲联系方式"></el-input>
        </el-form-item>
        <el-form-item label="母亲文化程度" prop="m_culture" style="width:4rem;">
          <el-input v-model="addData.m_culture" placeholder="请输入母亲文化程度"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="determineAdd('addData')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog -->
    <el-dialog title="测评结果" :visible.sync="dialogVisible2" width="60%">
      <p>试卷名称:{{ result.name }}</p>
      <br>
      <p>答题分数:{{ result.num }}</p>
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
      // 建新档案
      addData: {
        // userNumber: "", // 客户编号
        // curriculum: "", // 选择课程
        b_name: "", // 宝宝名称
        b_gender: "", // 宝宝性别
        b_birthData: "", // 宝宝出生日期
        b_questionnaire: "", // 完成问卷时间
        b_age: "", // 宝宝年龄
        b_weight: "", // 宝宝体重
        j_situation: [], // 出生时情况
        f_name: "", // 父亲姓名
        f_phone: "", // 父亲手机号
        f_culture: "", // 父亲学历
        m_name: "", // 母亲姓名
        m_phone: "", // 母亲手机号
        m_culture: "" // 母亲学历
      },
      // 建新档案 - 数据校验
      rules: {
        // curriculum: [
        //   { required: true, message: "请选择课程称", trigger: "blur" }
        // ],
        b_name: [
          { required: true, message: "请输入宝宝名称", trigger: "blur" }
        ],
        b_gender: [
          { required: true, message: "请选择宝宝性别", trigger: "blur" }
        ],
        b_birthData: [
          {
            type: "date",
            required: true,
            message: "请输入宝宝出生日期",
            trigger: "blur"
          }
        ],
        b_questionnaire: [
          {
            type: "date",
            required: true,
            message: "请输入完成问卷时间",
            trigger: "blur"
          }
        ],
        b_age: [{ required: true, message: "请输入宝宝年龄", trigger: "blur" }],
        b_weight: [
          { required: true, message: "请输入宝宝体重", trigger: "blur" }
        ],
        j_situation: [
          {
            type: "array",
            required: true,
            message: "请选择出生时情况",
            trigger: "blur"
          }
        ],
        f_name: [
          { required: true, message: "请输入父亲姓名", trigger: "blur" }
        ],
        f_phone: [
          { required: true, message: "请输入父亲姓名", trigger: "blur" }
        ],
        f_culture: [
          { required: true, message: "请输入父亲姓名", trigger: "blur" }
        ],
        m_name: [
          { required: true, message: "请输入母亲姓名", trigger: "blur" }
        ],
        m_phone: [
          { required: true, message: "请输入母亲姓名", trigger: "blur" }
        ],
        m_culture: [
          { required: true, message: "请输入母亲姓名", trigger: "blur" }
        ]
      },
      // 列表数据
      tableData: [],
      // 分页
      fenYe: {
        currentPage: 1, // 当前页数
        total: 1 // 共多少页
      },
      // dialog
      dialogVisible1: false,
      dialogVisible2: false,
      // 查看测评结果
      result:{
        name:'',
        num:""
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
    // 查看
    see(row) {
      console.log(row)
      this.dialogVisible2 = true;
      this.result.name = row.message;
      this.result.num = row.score;
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
          let url = "url1/ceping/delete";
          let data = {
            id:row.id
          };
          this.myAjax(type, url, data, res => {
            this.$message.success(res.data.message);
            this.createdData(1);
          });
        })
        .catch(() => {
          this.$message.error(res.data.message+',请联系管理员');
        });
    },
    // 确定添加档案
    determineAdd(addData) {
      this.$refs[addData].validate(valid => {
        if (valid) {
          let type = "post";
          let url = "url1/user/add";
          let data = {
            user_name: this.addData.b_name, // 宝宝名称
            user_sex: this.addData.b_gender, // 宝宝性别
            user_birthday: this.addData.b_birthData.getTime() / 1000, // 宝宝出生日期
            ceping_time: this.addData.b_questionnaire.getTime() / 1000, // 完成问卷时间
            user_age: this.addData.b_age, // 宝宝年龄
            user_weight: this.addData.b_weight, // 宝宝体重
            user_zhuangkuang: this.addData.j_situation.map(Number).join(","), // 出生时情况
            father_name: this.addData.f_name, // 父亲姓名
            father_mobile: this.addData.f_phone, // 父亲手机号
            father_wenhua: this.addData.f_culture, // 父亲学历
            mother_name: this.addData.m_name, // 母亲姓名
            mother_mobile: this.addData.m_phone, // 母亲手机号
            mother_wenhua: this.addData.m_culture // 母亲学历
          };
          this.myAjax(type, url, data, res => {
            this.createdData(1);
            this.$message.success(res.data.message+",请到客户档案中查看");
            this.dialogVisible1 = false;
          });
        }
      });
    },
    // 初始化列表数据
    createdData(page) {
      let type = "post";
      let url = "url1/ceping/lists";
      let data = {
        test_name:this.ruleForm.name,
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
    this.createdData(1);
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
  
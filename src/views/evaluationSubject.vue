<template>
  <!-- 测评答题 -->
  <div class="evaluationSubject">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="demo-ruleForm"
    >
      <el-form-item label="家长姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请填写家长姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.number="ruleForm.phone" placeholder="请填写手机号"></el-input>
      </el-form-item>
      <el-form-item label="出生日期" prop="dateBirth">
        <el-date-picker
          style="width:100%;"
          v-model="ruleForm.dateBirth"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="选择试卷" prop="sj">
        <el-select v-model="ruleForm.sj" filterable placeholder="请选择" style="width:100%;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.juan_title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">开始答题</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  name: "evaluationSubject",
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm: {
        name: "",
        phone: "",
        dateBirth: "",
        sj: ""
      },
      options: [],
      rules: {
        name: [{ required: true, message: "请输入宝宝姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        dateBirth: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        sj: [{ required: true, message: "请选择试卷", trigger: "change" }]
      }
    };
  },
  methods: {
    // 开始答题
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.dateBirth.getTime() / 1000;
          this.$router.push({
            path: "/topic",
            query: {
              info: JSON.stringify({
                jiazhang_name: this.ruleForm.name,
                jiazhang_mobile: this.ruleForm.phone,
                birthday: this.ruleForm.dateBirth.getTime() / 1000,
                juan_id: this.ruleForm.sj
              })
            }
          });
        }
      });
    },
    // 获取题
    gerTopic() {
      let type = "post";
      let url = "url1/juan/alllist";
      let data = {
        juan_title: "",
        page: 1
      };
      this.myAjax(type, url, data, res => {
        this.options = res.data.data[0];
        for (let i = 0; i < this.options.length; i++) {
          this.options[i].id = String(this.options[i].id);
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {},
  created() {
    this.gerTopic();
  }
};
</script>
  
 <style lang="less" scoped>
.evaluationSubject {
  height: 100%;
  width: 100%;
  background: url(../../public/static/images/k_1.png) center no-repeat no-repeat;
  background-size: 100%;
  overflow: hidden;
  .demo-ruleForm {
    display: block;
    width: 40%;
    margin: auto;
    min-width: 321px;
    margin-top: 20%;
  }
}
</style>
  
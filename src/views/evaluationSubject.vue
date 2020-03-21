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
      <el-form-item label="宝宝月龄" prop="dateBirth">
        <el-date-picker
          style="width:100%;"
          v-model="ruleForm.dateBirth"
          type="date"
          placeholder="选择宝宝月龄日期"
          @change="monthGet"
        ></el-date-picker>
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
        name: "", // 客户名称
        phone: "", // 电话
        dateBirth: "", // 出生日期
        sj:"" // 月份
      },
      options: [],
      rules: {
        name: [{ required: true, message: "请输入宝宝姓名", trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        dateBirth: [
          {
            type: "date",
            required: true,
            message: "请选择宝宝月龄",
            trigger: "change"
          }
        ],
      }
    };
  },
  methods: {
    // 开始答题
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {         
          this.$router.push({
            path: "/topic",
            query: {
              info: JSON.stringify({
                jiazhang_name: this.ruleForm.name,
                jiazhang_mobile: this.ruleForm.phone,
                birthday: this.ruleForm.dateBirth.getTime() / 1000,
                sj: this.ruleForm.sj
              })
            }
          });
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 点击时间获取试卷id
    monthGet() {
      let date1 = new Date(new Date(new Date()).getTime())
        .Format("yy-MM-dd")
        .split("-"); //例：将2020-12-21 的-去掉
      date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]); //将字符串转换为数字格式
      let date2 = new Date(new Date(this.ruleForm.dateBirth).getTime())
        .Format("yy-MM-dd")
        .split("-");
      date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
      if(Math.abs(date1 - date2) == 0){
        this.ruleForm.sj = 1;    
      } else {
        this.ruleForm.sj = Math.abs(date1 - date2); 
      }
    }
  },
  mounted() {},
  created() {}
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
  
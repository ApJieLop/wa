<template>
  <!-- 测评题目 -->
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
      <el-form-item label="宝宝出生日期" prop="sj">
        <el-date-picker
          style="width:100%;"
          v-model="ruleForm.sj"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
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
        name: "",
        phone: "",
        sj: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        sj: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 开始答题
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = [{
            domains: [
              {
                subjectNmane: "我是第一道题",
                optionNum: "4",
                correctOptions: "C",
                options: [
                  {
                    option: "A",
                    text: "发水电费胜多负少的"
                  },
                  {
                    option: "B",
                    text: "水电费胜多负少的"
                  },
                  {
                    option: "C",
                    text: "水电费胜多负少的"
                  },
                  {
                    option: "D",
                    text: "胜多负少的水电费"
                  }
                ]
              }
            ],
            testPaperNanme: ""
          }];
           console.log(obj)
          obj = JSON.stringify(obj);
          localStorage.setItem("subject", obj);
         
          this.$router.push({
            path: "/topic"
          });

          //   let type = "";
          //   let url = "";
          //   let data = {};
          //   this.myAjax(type, url, data, res => {
          //     if (res.data == 200) {
          //       obj = ; //转化为JSON字符串
          //       localStorage.setItem("subject", JSON.stringify(res.data.data));
          //       console.log(JSON.parse(localStorage.getItem("subject")));
          //       this.$router.push({
          //         path: "/topic"
          //       });
          //     }
          //   });
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  
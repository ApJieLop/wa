<template>
  <!-- 测评试卷编辑 -->
  <div class="testPaper">
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item prop="testPaperNanme" label="试卷名称">
        <el-input v-model="dynamicValidateForm.testPaperNanme" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item prop="monthSize" label="适合月龄">
        <el-input v-model="dynamicValidateForm.monthSize" placeholder="请输入适合几个的月婴儿/列子：1,类型Number/String"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'第' + (index+1) +'题'"
        :key="index"
      >
        <span class="Ttittle" style="width:auto;margin-right: .2rem;">题目名称</span>
        <el-input
          class="inputSelect"
          style="width:60%;"
          v-model="domain.subjectNmane"
          placeholder="请输入题目名称"
        ></el-input>
        <el-button
          type="danger"
          plain
          @click.prevent="removeDomain(domain)"
          style="float: right;"
        >删除</el-button>
        <span class="Ttittle" style="width:auto;margin-right: .2rem;clear: both;">选项数量</span>
        <el-select
          class="inputSelect"
          style="width:15%;"
          v-model="domain.optionNum"
          placeholder="选项数量"
          @change="selectionQuantity(domain,index)"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
        <template>
          <span class="Ttittle" style="clear: both;">{{ domain.options[0].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[0].text"
            placeholder="请输入A选项"
            :disabled="Number(domain.optionNum) < 1?true:false"
          ></el-input>
          <span class="inputSelect2">-</span>
          <el-input
            class="inputSelect1"
            v-model="domain.options[0].fraction"
            placeholder="选项分数"
            :disabled="Number(domain.optionNum) < 1?true:false"
          ></el-input>
        </template>
        <template>
          <span class="Ttittle">{{ domain.options[1].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[1].text"
            placeholder="请输入B选项"
            :disabled="Number(domain.optionNum) < 2?true:false"
          ></el-input>
          <span class="inputSelect2">-</span>
          <el-input
            class="inputSelect1"
            v-model="domain.options[1].fraction"
            placeholder="选项分数"
            :disabled="Number(domain.optionNum) < 2?true:false"
          ></el-input>
        </template>
        <template>
          <span class="Ttittle" style="clear: both;">{{ domain.options[2].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[2].text"
            placeholder="请输入C选项"
            :disabled="Number(domain.optionNum) < 3?true:false"
          ></el-input>
          <span class="inputSelect2">-</span>
          <el-input
            class="inputSelect1"
            v-model="domain.options[2].fraction"
            placeholder="选项分数"
            :disabled="Number(domain.optionNum) < 3?true:false"
          ></el-input>
        </template>
        <template>
          <span class="Ttittle">{{ domain.options[3].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[3].text"
            placeholder="请输入D选项"
            :disabled="Number(domain.optionNum) < 4?true:false"
          ></el-input>
          <span class="inputSelect2">-</span>
          <el-input
            class="inputSelect1"
            v-model="domain.options[3].fraction"
            placeholder="选项分数"
            :disabled="Number(domain.optionNum) < 4?true:false"
          ></el-input>
        </template>
      </el-form-item>
      <el-form-item style="margin-bottom: 0;">
        <p style="color: #E6A23C;text-align: left;">*分数请大到小一次填写</p>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.fractionDetermine"
        label="大于>="
        :key="'index'+index"
      >
        <el-input class="inputSelect1" v-model="domain.num" placeholder="请输入分数"></el-input>
        <span class="Ttittle1">提示文字</span>
        <el-input
          class="inputSelect"
          style="width:60%;"
          v-model="domain.text"
          placeholder="请输入提示文字"
        ></el-input>
        <el-button
          type="danger"
          plain
          @click.prevent="removeDomain1(domain)"
          style="float: right;"
        >删除</el-button>
      </el-form-item>    
      <el-form-item>
        <el-button @click="addFractionDetermine">增加分数判定</el-button>
        <el-button @click="addDomain">新增题目</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script>
export default {
  name: "testPaper",
  data() {
    return {
      testPaperId: "", // 试卷id
      dynamicValidateForm: {// 试卷内容
        testPaperNanme: "", // 试卷名称
        monthSize:"", // 适合几个月婴儿
        fractionDetermine: [
          // 分数判定
          {
            num: "",
            text: ""
          }
        ],
        domains: [
          // 选项
          {
            subjectNmane: "", // 题目名称
            optionNum: "4", // 选项数量
            options: [
              // 选项
              {
                option: "A", // A
                text: "", // 选项内容文字
                fraction: "" // 该选项分数
              },
              {
                option: "B",
                text: "",
                fraction: ""
              },
              {
                option: "C",
                text: "",
                fraction: ""
              },
              {
                option: "D",
                text: "",
                fraction: ""
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    // 选择数量
    selectionQuantity(domain, index) {
      domain.correctOptions = "";
      if (domain.optionNum == 1) {
        domain.options[3].text = "";
        domain.options[3].fraction = "";
        domain.options[2].text = "";
        domain.options[2].fraction = "";
        domain.options[1].text = "";
        domain.options[1].fraction = "";
      }
      if (domain.optionNum == 2) {
        domain.options[3].text = "";
        domain.options[3].fraction = "";
        domain.options[2].text = "";
        domain.options[2].fraction = "";
      }
      if (domain.optionNum == 3) {
        domain.options[3].text = "";
        domain.options[3].fraction = "";
      }
    },
    // 提交
    submitForm() {
      if (this.testPaperId) {
        let type = "post";
        let url = "url1/juan/edit";
        let data = {
          id: this.testPaperId,
          juan_title: this.dynamicValidateForm.testPaperNanme,
          juan_month: this.dynamicValidateForm.monthSize,
          juan_content: JSON.stringify(this.dynamicValidateForm.domains),
          juan_message: JSON.stringify(
            this.dynamicValidateForm.fractionDetermine
          )
        };
        this.myAjax(type, url, data, res => {
          this.$message.success(res.data.message);
          this.$router.push({
            path: "/evaluationImport"
          });
        });
      } else {
        let type = "post";
        let url = "url1/juan/add";
        let data = {
          juan_title: this.dynamicValidateForm.testPaperNanme,
          juan_month: this.dynamicValidateForm.monthSize,
          juan_content: JSON.stringify(this.dynamicValidateForm.domains),
          juan_message: JSON.stringify(
            this.dynamicValidateForm.fractionDetermine
          )
        };
        this.myAjax(type, url, data, res => {
          this.$message.success(res.data.message);
          this.$router.push({
            path: "/evaluationImport"
          });
        });
      }
    },
    // 删除 - 选项
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 删除 - 分数判定
    removeDomain1(item) {
      var index = this.dynamicValidateForm.fractionDetermine.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.fractionDetermine.splice(index, 1);
      }
    },
    // 添加 - 选项
    addDomain() {
      this.dynamicValidateForm.domains.push({
        subjectNmane: "",
        optionNum: "4",
        options: [
          {
            option: "A",
            text: "",
            fraction: ""
          },
          {
            option: "B",
            text: "",
            fraction: ""
          },
          {
            option: "C",
            text: "",
            fraction: ""
          },
          {
            option: "D",
            text: "",
            fraction: ""
          }
        ]
      });
    },
    // 添加 - 分数判定
    addFractionDetermine() {
      this.dynamicValidateForm.fractionDetermine.push({
        num: "",
        text: ""
      });
    }
  },
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.testPaperId = this.$route.query.id;
      let type = "post";
      let url = "url1/juan/get";
      let data = {
        id: this.$route.query.id
      };
      this.myAjax(type, url, data, res => {
        this.dynamicValidateForm.testPaperNanme = res.data.data.juan_title;
        this.dynamicValidateForm.monthSize = res.data.data.juan_month;
        this.dynamicValidateForm.domains = JSON.parse(
          res.data.data.juan_content
        );
        this.dynamicValidateForm.fractionDetermine = JSON.parse(
          res.data.data.juan_message
        );
      });
    }
  }
};
</script>
  
 <style lang="less" scoped>
.testPaper {
  background: #fff;
}
.demo-dynamic {
  width: 80%;
  margin: auto;
  background: #fff;
  padding: 0.4rem;
  overflow: hidden;
  .Ttittle {
    width: 5%;
    float: left;
    margin-bottom: 15px;
  }
  .Ttittle1 {
    float: left;
    margin-bottom: 15px;
    width: 13%;
    text-align: center;
  }
  .inputSelect {
    width: 30%;
    float: left;
    margin-bottom: 15px;
  }
  .inputSelect1 {
    width: 13%;
    float: left;
    margin-bottom: 15px;
  }
  .inputSelect2 {
    float: left;
    margin-bottom: 15px;
  }
}
</style>
  
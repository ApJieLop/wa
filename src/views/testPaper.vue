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
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'第' + (index+1) +'题'"
        :key="index"
      >
        <span class="Ttittle" style="width:auto;margin-right: 20px;">题目名称</span>
        <el-input class="inputSelect" style="width:60%;" v-model="domain.subjectNmane" placeholder="请输入题目名称"></el-input>
        <span class="Ttittle" style="width:auto;margin-right: 20px;clear: both;">选项数量</span>
        <el-select
          class="inputSelect"
          style="width:auto;"
          v-model="domain.optionNum"
          placeholder="选项数量"
          @change="selectionQuantity(domain,index)"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
        </el-select>
        <span class="Ttittle" style="margin-right: 20px;margin-left: 20px;width:auto;">正确选项</span>
        <el-select
          class="inputSelect"
          style="width:1.5rem;"
          v-model="domain.correctOptions"
          placeholder="正确选项"
        >
          <el-option label="A" value="A" :disabled="Number(domain.optionNum)<1?true:false"></el-option>
          <el-option label="B" value="B" :disabled="Number(domain.optionNum)<2?true:false"></el-option>
          <el-option label="C" value="C" :disabled="Number(domain.optionNum)<3?true:false"></el-option>
          <el-option label="D" value="D" :disabled="Number(domain.optionNum)<4?true:false"></el-option>
        </el-select>
        <el-button
          type="danger"
          plain
          @click.prevent="removeDomain(domain)"
          style="float: right;"
        >删除</el-button>
        <template>
          <span class="Ttittle" style="clear: both;">{{ domain.options[0].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[0].text"
            placeholder="请输入A选项"
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
        </template>
        <template>
          <span class="Ttittle">{{ domain.options[2].option }}</span>
          <el-input
            class="inputSelect"
            v-model="domain.options[2].text"
            placeholder="请输入C选项"
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
        </template>
      </el-form-item>
      <el-form-item>
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
      dynamicValidateForm: {
        domains: [
          {
            subjectNmane: "",
            optionNum: "4",
            correctOptions:"",
            options: [
              {
                option: "A",
                text: ""
              },
              {
                option: "B",
                text: ""
              },
              {
                option: "C",
                text: ""
              },
              {
                option: "D",
                text: ""
              }
            ]
          }
        ],
        testPaperNanme: ""
      }
    };
  },
  methods: {
    // 选择数量
    selectionQuantity(domain,index){
        domain.correctOptions = '';
    },
    // 提交
    submitForm() {
        console.log(this.dynamicValidateForm)
    },
    // 删除
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 添加
    addDomain() {
      this.dynamicValidateForm.domains.push({
        subjectNmane: "",
        optionNum: "4",
        correctOptions:"",
        options: [
          {
            option: "A",
            text: ""
          },
          {
            option: "B",
            text: ""
          },
          {
            option: "C",
            text: ""
          },
          {
            option: "D",
            text: ""
          }
        ]
      });
    }
  },
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.testPaperId = this.$route.query.id;
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
  .inputSelect {
    width: 20%;
    float: left;
    margin-bottom: 15px;
  }
}
</style>
  
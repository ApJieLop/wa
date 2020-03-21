<template>
  <!-- 题 -->
  <div class="topic">
    <div v-for="(item,index) in t" :key="index" v-show="index === x">
      <h1>{{index+1}}、{{item.subjectNmane}}</h1>
      <el-button
        class="btns"
        type="primary"
        v-for="(infoitem,index) in item.options"
        :key="infoitem+index"
        @click="choice(infoitem.fraction)"
        v-show="infoitem.text"
      >{{ infoitem.option }}、{{ infoitem.text }}</el-button>
    </div>
    <!-- dialog -->
    <el-dialog title="测评结果" :visible.sync="dialogVisible2" width="60%">
      <p>试卷名称:{{ f }}</p>
      <br />
      <p>答题分数:{{ text }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="curriculumDetermine">继续答题</el-button>
        <el-button type="primary" @click="curriculumDetermine">我知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
  <script>
export default {
  name: "topic",
  data() {
    return {
      id:'', // 试卷id
      x: 0, // 当前题目号，用来显示当前题
      t: "", // 所有题
      l: "", // 题目总长度，用来判定是否为最后一题
      s: [], // 所有答案
      dialogVisible2: false, // 结果 - loading
      f:'', //  答题结果 - 分数
      text:"" // 答题结果 - 文字
    };
  },
  methods: {
    // 点击选项
    choice(fraction) {
      this.s.push({
        fraction: fraction
      });
      if (this.x >= this.l - 1) {
        let type = "post";
        let url = "url1/ceping/dati";
        let data = {
          test_content: JSON.stringify(this.s),
          teacher_id: localStorage.getItem("uid"),
          juan_id: this.id,
          jiazhang_name: JSON.parse(this.$route.query.info).jiazhang_name,
          jiazhang_mobile: JSON.parse(this.$route.query.info).jiazhang_mobile,
          birthday: JSON.parse(this.$route.query.info).birthday         
        };
        this.myAjax(type, url, data, res => {
          this.f = res.data.data.score;
          this.text = res.data.data.text;
          this.dialogVisible2 = true;
        });
      } else {
        this.x = this.x + 1;
      }
    },
    // 获取题
    gerTopic() {
      let type = "post";
      let url = "url1/juan/get";
      let data = {
        juan_month: JSON.parse(this.$route.query.info).sj
      };
       console.log(data)
      this.myAjax(type, url, data, res => {
        console.log(res)
        // this.t = JSON.parse(res.data.data.juan_content);
        // this.l = this.t.length;
      });  
    },
    // 继续答题
    curriculumDetermine() {
      this.$router.push("/evaluationSubject");   
    }
  },
  mounted() {},
  created() {
    this.gerTopic();
  }
};
</script>
  
 <style lang="less" scoped>
.topic {
  padding: 0.4rem 0.2rem;
  h1 {
    font-size: 0.16rem;
    font-weight: 400;
    line-height: 0.6rem;
    text-align: left;
    padding-left: 0.1rem;
  }
  .z1 {
    width: 23%;
    float: left;
    margin-right: 2%;
    margin-bottom: 0.4rem;
    img {
      display: block;
      width: 100%;
      height: 2rem;
    }
    p {
      font-size: 0.14rem;
    }
  }
  .btns {
    color: #fff;
    background-color: rgba(239, 146, 177, 1);
    border-color: rgba(239, 146, 177, 1);
    display: block;
    width: 45%;
    margin: auto;
    margin-top: 0.2rem;
  }
}
@media only screen and (max-width: 850px) {
  .topic {
    .z1 {
      img {
        display: block;
        width: 100%;
        height: 1.5rem;
      }
    }
  }
}
</style>
  
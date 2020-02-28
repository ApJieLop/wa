<template>
  <!-- 题 -->
  <div class="topic">
    <div v-for="(item,index) in t[0].domains" :key="index" v-show="index === x">
      <h1>{{index+1}}、{{item.subjectNmane}}</h1>
      <el-button
        class="btns"
        type="primary"
        v-for="(infoitem,index) in item.options"
        :key="infoitem+index"
        @click="choice(infoitem.option)"
      >{{ infoitem.option }}、{{ infoitem.text }}</el-button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "topic",
  data() {
    return {
      x: 0, // 当前题目号，用来显示当前题
      t: "", // 所有题
      l: "", // 题目总长度，用来判定是否为最后一题
      s: [] // 所有答案
    };
  },
  methods: {
    // 点击选项
    choice(choice) {
      this.s.push(choice);
      if (this.x >= this.l - 1) {
        this.$router.push({
          path: '/answerResult',
          query: {
            img: '是德国法国电饭锅放大.png'
          }
        });
      } else {
        this.x = this.x + 1;
      }
    }
  },
  mounted() {},
  created() {
    this.t = JSON.parse(localStorage.getItem("subject"));
    this.l = this.t.length;
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
  
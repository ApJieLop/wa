<template>
<!-- 答题结果 -->
  <div class="hello">
    <img src="../../public/static/images/k_1.png" alt="">
  </div>
</template>
  
  <script>
export default {
  name: "answerResult",
  data() {
    return {
      
    };
  },
  methods: {},
  mounted() {},
  created() {
      console.log(this.$route.query.img)
  }
};
</script>
  
 <style lang="less" scoped>
</style>
  
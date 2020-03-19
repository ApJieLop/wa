<template>
<!-- 答题结果 -->
  <div class="hello">
    
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
      console.log(JSON.parse(this.$route.query.info))
  }
};
</script>
  
 <style lang="less" scoped>
</style>
  
<template>
  <!-- 公共头部 -->
  <div class="publicHead">
    <div class="top">
      <h1>新生儿测评系统</h1>
      <!-- 管理员导航 -->
      <ul v-if="type ==1">
        <li v-for="(item,index) in navigation1" :key="index" @click="jump(item.path)">
          <img :src="item.img" alt />
          <p>{{ item.text }}</p>
        </li>
      </ul>
      <!-- 老师导航 -->
       <ul v-else-if="type ==2">
        <li v-for="(item,index) in navigation2" :key="index" @click="jump(item.path)">
          <img :src="item.img" alt />
          <p>{{ item.text }}</p>
        </li>
      </ul>
      <el-dropdown
        trigger="click"
        class="personalOperation"
        style="cursor: pointer;color: #c0c4cc;"
        @command="handleCommand"
      >
        <span class="el-dropdown-link">
          <img class="tx" src="../../public/static/images/tx.jpg" alt />
          赵金福
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>预留导航</el-dropdown-item>
          <el-dropdown-item>预留导航</el-dropdown-item>
          <el-dropdown-item>预留导航</el-dropdown-item> -->
          <el-dropdown-item divided command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="bottom">
      <router-view />
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "publicHead",
  data() {
    return {
      // 判断 - 管理员登录&学员登录
      type:'',
      // 管理员
      navigation1: [
        {
          img: require("../../public/static/images/z5.png"),
          text: "测评导入",
          path: "/evaluationImport"
        },
        {
          img: require("../../public/static/images/z6.png"),
          text: "客户档案",
          path: "/customerFiles"
        },
        {
          img: require("../../public/static/images/z7.png"),
          text: "老师管理",
          path: "/teacherAdministration"
        },
        {
          img: require("../../public/static/images/z8.png"),
          text: "课程管理",
          path: "/scurriculumAdministration"
        }
      ],
      // 老师
      navigation2: [
        {
          img: require("../../public/static/images/z3.png"),
          text: "测评题目",
          path: "/evaluationSubject"
        },
        {
          img: require("../../public/static/images/z4.png"),
          text: "测评分析",
          path: "/evaluationAnalysis"
        },
        {
          img: require("../../public/static/images/z6.png"),
          text: "客户档案",
          path: "/customerFiles"
        },
        {
          img: require("../../public/static/images/z2.png"),
          text: "课程管理",
          path: "/curriculumAdministration"
        }
      ]
    };
  },
  methods: {
    // 导航跳转
    jump(path) {
      this.$router.push({
        path: path
      });
    },
    // 个人操作-头部右上角
    handleCommand(command) {
      if (command == "signOut") {
        localStorage.clear();
        this.$router.push({
          path: "/"
        });
      }
    }
  },
  mounted() {},
  created() {
    this.type = localStorage.getItem('type');
  }
};
</script>
  
 <style lang="less" scoped>
.publicHead {
  height: 87.4%;
  .top {
    height: 0.67rem;
    background: rgba(44, 180, 223, 1);
    padding: 0 0.4rem 0 0.2rem;
    h1 {
      float: left;
      font-size: 0.2rem;
      color: #fff;
      line-height: 0.67rem;
      margin: 0;
      margin-right: 0.4rem;
    }
    ul {
      li {
        float: left;
        font-size: 0.14rem;
        color: #fff;
        padding: 0.12rem 0.2rem 0 0.2rem;
        cursor: pointer;
        img {
          width: 0.21rem;
        }
      }
    }
    .personalOperation {
      float: right;
      .tx {
        width: 0.32rem;
        border-radius: 50%;
        margin-top: 0.174rem;
        float: left;
        margin-right: 0.1rem;
      }
      .el-dropdown-link {
        line-height: 0.67rem;
        color: #fff;
      }
    }
  }
  .bottom {
    padding: 0.2rem;
    background-color: rgba(240, 242, 245, 1);
    height: 100%;
  }
}
</style>
  
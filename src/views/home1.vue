<template>
  <div class="home1">
    <div class="shell">
      <div class="z1">
        <div class="z1_1">
          <p>学员统计</p>
          <div style=" border-right: 1px solid #ccc;">
            <span>100</span>人
            <br />本月新进学员
          </div>
          <div>
            <span>100</span>人
            <br />本月新进学员
          </div>
        </div>
        <div class="z1_2" @click="scurriculumAdministration">
          <img src="../../public/static/images/z2.png" alt />
          <p>课程管理</p>
        </div>
        <div class="z1_3" @click="customerFiles">
          <img src="../../public/static/images/z6.png" alt />
          <p>客户档案</p>
        </div>
        <div class="z1_4" @click="teacherAdministration">
          <img src="../../public/static/images/z7.png" alt />
          <p>老师管理</p>
        </div>
      </div>
      <div class="z2">
        <div class="z2_1">
          <p class="t" @click="ckxu">
            测评信息
            <span>更多</span>
          </p>
          <ul>
            <li v-for="(item,index) in cinfo" :key="index" @click="yctm(item.id)">
              <p class="p1">{{ item.title }}</p>
              <p class="p2">[{{ item.time }}]</p>
            </li>
          </ul>
        </div>
        <div class="z2_2">
          <div class="student">
            <p>详情>></p>
            <div id="student"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import $ from "jquery";
require('../../public/static/js/font')
export default {
  name: "home1",
  data() {
    return {
      // 测评信息
      cinfo: [
        {
          id: 1,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 2,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 3,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 4,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 5,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 6,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 7,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        },
        {
          id: 8,
          title: "赵金福的测试题目",
          time: "2019/05/05"
        }
      ]
    };
  },
  methods: {
    // 获取柱形图
    getStudent() {
      let student = this.$echarts.init(document.getElementById("student"));
      $(window).resize(function() {
        student.resize();
      });
      student.setOption({
        color: ["#2cb4df"],
        title: {
          text: "收入统计",
          y: 20,
          x: 30
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            // name: '收入统计',
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 15, 16, 22, 26, 11, 6]
          }
        ]
      });
    },
    // 课程管理
    scurriculumAdministration() {
      this.$router.push({
        path: "/scurriculumAdministration"
      });
    },
    // 客户档案
    customerFiles() {
      this.$router.push({
        path: "/customerFiles"
      });
    },
    // 老师管理
    teacherAdministration() {
      this.$router.push({
        path: "/teacherAdministration"
      });
    },
    // 更多 - 查看学员
    ckxu() {
      this.$router.push({
        path: "/seeStudent"
      });
    },
    // 个人 - 已测题目
    yctm(id) {
      this.$router.push({
        path: "/subjectTested",
        query: {
          id: id
        }
      });
    }
  },
  mounted() {
    this.getStudent();
  },
  created() {}
};
</script>
  
 <style lang="less" scoped>
.home1 {
  height: 100%;
  .shell {
    width: 80%;
    margin: auto;
    overflow: hidden;
    padding-top: 0.2rem;
    .z1 {
      width: 100%;
      overflow: hidden;
      height: 1.6rem;
      .z1_1 {
        width: 39%;
        background: #fff;
        height: 100%;
        overflow: hidden;
        float: left;
        p {
          font-size: 0.16rem;
          font-weight: 600;
          line-height: 0.7rem;
          text-align: left;
          padding-left: 0.35rem;
          position: relative;
        }
        p:after {
          position: absolute;
          content: " ";
          width: 0.03rem;
          height: 0.15rem;
          top: 0.28rem;
          left: 0.2rem;
          background: #00a2d0;
        }
        div {
          float: left;
          width: 48%;
          font-size: 0.14rem;
          color: #2cb4df;
          text-align: center;
          border-radius: 0.05rem;
          span {
            font-size: 0.2rem;
            font-weight: 600;
          }
        }
      }
      .z1_2,
      .z1_3,
      .z1_4 {
        width: 19%;
        height: 100%;
        overflow: hidden;
        margin-left: 1%;
        float: left;
        background: rgba(0, 162, 208, 1);
        border-radius: 0.05rem;
        img {
          width: 0.5rem;
        }
        p {
          color: #fff;
          font-size: 0.16rem;
          text-align: center;
        }
      }
    }
    .z2 {
      margin-top: 0.2rem;
      height: 3rem;
      overflow: hidden;
      .z2_1 {
        width: 44%;
        height: 100%;
        overflow: hidden;
        float: left;
        background: #fff;
        .t {
          line-height: 0.4rem;
          position: relative;
          font-size: 0.16rem;
          font-weight: 600;
          text-align: left;
          padding-left: 0.35rem;
          margin-top: 0.15rem;
          span {
            font-size: 0.12rem;
            float: right;
            font-weight: 400;
            background: #00a2d0;
            color: #fff;
            padding: 0 0.08rem;
            height: 0.2rem;
            line-height: 0.2rem;
            margin-right: 0.2rem;
            margin-top: 0.1rem;
          }
        }
        .t:after {
          position: absolute;
          content: " ";
          width: 0.03rem;
          height: 0.15rem;
          top: 0.13rem;
          left: 0.2rem;
          background: #00a2d0;
        }
        ul {
          li {
            line-height: 0.3rem;
            background: red;
            .p1 {
              float: left;
              width: 40%;
              font-size: 0.14rem;
              text-align: left;
              padding-left: 0.35rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .p2 {
              float: right;
              width: 40%;
              font-size: 0.14rem;
            }
          }
        }
      }
      .z2_2 {
        width: 54%;
        margin-left: 1%;
        height: 100%;
        overflow: hidden;
        float: left;
        background: #fff;
        position: relative;
        p {
          position: absolute;
          top: 0.15rem;
          right: 0.4rem;
          height: 0.35rem;
          line-height: 0.35rem;
          font-size: 0.14rem;
          z-index: 1;
          color: #909399;
          cursor: pointer;
        }
        p:hover {
          color: #2cb4df;
        }
        #student {
          width: 100%;
          height: 3rem;
        }
      }
    }
  }
}
</style>
  
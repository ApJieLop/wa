<template>
  <div class="home2">
    <div class="shell">
      <div class="z1">
        <div class="z1_1" @click="evaluationAnalysis">
          <div class="z1_1_left">
            <img src="../../public/static/images/renshu.png" alt />
            <p>
              答题人数
              <br />
              <span>100</span>
              人
            </p>
          </div>
          <div class="z1_1_right">查看</div>
        </div>
        <div class="z1_1" @click="scurriculumAdministration">
          <div class="z1_1_left">
            <img src="../../public/static/images/z2.png" alt />
            <p>
              课程管理
              <br />
              <span>100</span>
              课时
            </p>
          </div>
          <div class="z1_1_right">查看</div>
        </div>
        <div class="z1_1" @click="customerFiles">
          <div class="z1_1_left">
            <img src="../../public/static/images/z6.png" alt />
            <p>
              客户档案
              <br />
              <span>100</span>
              人
            </p>
          </div>
          <div class="z1_1_right">查看</div>
        </div>
        <div class="z1_1" @click="evaluationSubject">
          <div class="z1_1_left">
            <img src="../../public/static/images/z3.png" alt />
          </div>
          <div class="z1_1_right">进入测评</div>
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
        <div class="z2_1">
          <p class="t" @click="xyxx">
            学员信息
            <span>更多</span>
          </p>
          <ul>
            <li v-for="(item,index) in cinfo2" :key="index" @click="xyxx">
              <p class="p1">{{ item.title }}</p>
              <p class="p2">[{{ item.time }}]</p>
            </li>
          </ul>
        </div>
        <div id="calendar" class="calendar"></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import $ from "jquery";
// import "../../public/static/js/calendar.js";
export default {
  name: "home2",
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
      ],
      // 学员信息
      cinfo2: [
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
    // 答题人数
    evaluationAnalysis() {
      this.$router.push({
        path: "/evaluationAnalysis"
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
    // 学员管理
    evaluationSubject() {
      this.$router.push({
        path: "/evaluationSubject"
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
    },
    // 学员信息
    xyxx() {
      this.$router.push({
        path: "/customerFiles"
      });
    }
  },
  mounted() {
    // 关于月份： 在设置时要-1，使用时要+1
    $(function() {
      $("#calendar").calendar({
        ifSwitch: true, // 是否切换月份
        hoverDate: true, // hover是否显示当天信息
        backToday: true // 是否返回当天
      });
    });

    (function($, window, document, undefined) {
      var Calendar = function(elem, options) {
        this.$calendar = elem;

        this.defaults = {
          ifSwitch: true,
          hoverDate: false,
          backToday: false
        };

        this.opts = $.extend({}, this.defaults, options);

        // console.log(this.opts);
      };

      Calendar.prototype = {
        showHoverInfo: function(obj) {
          // hover 时显示当天信息
          var _dateStr = $(obj).attr("data");
          var offset_t =
            $(obj).offset().top +
            (this.$calendar_today.height() - $(obj).height()) / 2;
          var offset_l = $(obj).offset().left + $(obj).width();
          var changeStr =
            _dateStr.substr(0, 4) +
            "-" +
            _dateStr.substr(4, 2) +
            "-" +
            _dateStr.substring(6);
          var _week = changingStr(changeStr).getDay();
          var _weekStr = "";

          this.$calendar_today.show();

          this.$calendar_today
            .css({ left: offset_l + 30, top: offset_t })
            .stop()
            .animate({ left: offset_l + 16, top: offset_t, opacity: 1 });

          switch (_week) {
            case 0:
              _weekStr = "星期日";
              break;
            case 1:
              _weekStr = "星期一";
              break;
            case 2:
              _weekStr = "星期二";
              break;
            case 3:
              _weekStr = "星期三";
              break;
            case 4:
              _weekStr = "星期四";
              break;
            case 5:
              _weekStr = "星期五";
              break;
            case 6:
              _weekStr = "星期六";
              break;
          }

          this.$calendarToday_date.text(changeStr);
          this.$calendarToday_week.text(_weekStr);
        },

        showCalendar: function() {
          // 输入数据并显示
          var self = this;
          var year = dateObj.getDate().getFullYear();
          var month = dateObj.getDate().getMonth() + 1;
          var dateStr = returnDateStr(dateObj.getDate());
          var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

          this.$calendarTitle_text.text(year + "/" + dateStr.substr(4, 2));

          this.$calendarDate_item.each(function(i) {
            // allDay: 得到当前列表显示的所有天数
            var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
            var allDay_str = returnDateStr(allDay);

            $(this)
              .text(allDay.getDate())
              .attr("data", allDay_str);

            if (returnDateStr(new Date()) === allDay_str) {
              $(this).attr("class", "item item-curDay");
            } else if (
              returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)
            ) {
              $(this).attr("class", "item item-curMonth");
            } else {
              $(this).attr("class", "item");
            }
          });
        },

        renderDOM: function() {
          // 渲染DOM
          this.$calendar_title = $('<div class="calendar-title"></div>');
          this.$calendar_week = $('<ul class="calendar-week"></ul>');
          this.$calendar_date = $('<ul class="calendar-date"></ul>');
          this.$calendar_today = $('<div class="calendar-today"></div>');

          var _titleStr =
            '<a href="#" class="title"></a>' +
            '<a href="javascript:;" id="backToday">T</a>' +
            '<div class="arrow">' +
            '<span class="arrow-prev"><</span>' +
            '<span class="arrow-next">></span>' +
            "</div>";
          var _weekStr =
            '<li class="item">日</li>' +
            '<li class="item">一</li>' +
            '<li class="item">二</li>' +
            '<li class="item">三</li>' +
            '<li class="item">四</li>' +
            '<li class="item">五</li>' +
            '<li class="item">六</li>';
          var _dateStr = "";
          var _dayStr =
            '<i class="triangle"></i>' +
            '<p class="date"></p>' +
            '<p class="week"></p>';

          for (var i = 0; i < 6; i++) {
            _dateStr +=
              '<li class="item">26</li>' +
              '<li class="item">26</li>' +
              '<li class="item">26</li>' +
              '<li class="item">26</li>' +
              '<li class="item">26</li>' +
              '<li class="item">26</li>' +
              '<li class="item">26</li>';
          }

          this.$calendar_title.html(_titleStr);
          this.$calendar_week.html(_weekStr);
          this.$calendar_date.html(_dateStr);
          this.$calendar_today.html(_dayStr);

          this.$calendar.append(
            this.$calendar_title,
            this.$calendar_week,
            this.$calendar_date,
            this.$calendar_today
          );
          this.$calendar.show();
        },

        inital: function() {
          // 初始化
          var self = this;

          this.renderDOM();

          this.$calendarTitle_text = this.$calendar_title.find(".title");
          this.$backToday = $("#backToday");
          this.$arrow_prev = this.$calendar_title.find(".arrow-prev");
          this.$arrow_next = this.$calendar_title.find(".arrow-next");
          this.$calendarDate_item = this.$calendar_date.find(".item");
          this.$calendarToday_date = this.$calendar_today.find(".date");
          this.$calendarToday_week = this.$calendar_today.find(".week");

          this.showCalendar();

          if (this.opts.ifSwitch) {
            this.$arrow_prev.bind("click", function() {
              var _date = dateObj.getDate();

              dateObj.setDate(
                new Date(_date.getFullYear(), _date.getMonth() - 1, 1)
              );

              self.showCalendar();
            });

            this.$arrow_next.bind("click", function() {
              var _date = dateObj.getDate();

              dateObj.setDate(
                new Date(_date.getFullYear(), _date.getMonth() + 1, 1)
              );

              self.showCalendar();
            });
          }

          if (this.opts.backToday) {
            this.$backToday.bind("click", function() {
              if (!self.$calendarDate_item.hasClass("item-curDay")) {
                dateObj.setDate(new Date());

                self.showCalendar();
              }
            });
          }

          this.$calendarDate_item.hover(
            function() {
              self.showHoverInfo($(this));
            },
            function() {
              self.$calendar_today.css({ left: 0, top: 0 }).hide();
            }
          );
        },

        constructor: Calendar
      };

      $.fn.calendar = function(options) {
        var calendar = new Calendar(this, options);

        return calendar.inital();
      };

      // ========== 使用到的方法 ==========

      var dateObj = (function() {
        var _date = new Date();

        return {
          getDate: function() {
            return _date;
          },

          setDate: function(date) {
            _date = date;
          }
        };
      })();

      function returnDateStr(date) {
        // 日期转字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = month < 9 ? "0" + month : "" + month;
        day = day < 9 ? "0" + day : "" + day;

        return year + month + day;
      }

      function changingStr(fDate) {
        // 字符串转日期
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
      }
    })($, window, document);
  },
  created() {}
};
</script>
  
 <style lang="less" scoped>
@import "../../public/static/css/calendar.css";
.home2 {
  height: 100%;
  .shell {
    width: 80%;
    margin: auto;
    overflow: hidden;
    padding-top: 0.2rem;
    .z1 {
      width: 100%;
      overflow: hidden;
      .z1_1 {
        width: 24%;
        float: left;
        margin-right: 1%;
        height: 0.9rem;
        border-radius: 0.04rem;
        background: #fff;
        overflow: hidden;
        .z1_1_left {
          width: 60%;
          height: 100%;
          float: left;
          background: rgba(44, 180, 223, 1);
          img {
            display: block;
            float: left;
            margin: 0.25rem 0.05rem 0 0.15rem;
            width: 0.4rem;
          }
          p {
            float: left;
            font-size: 0.14rem;
            color: #fff;
            margin-top: 0.2rem;
            span {
              font-size: 0.24rem;
            }
          }
        }
        .z1_1_right {
          width: 40%;
          height: 100%;
          float: left;
          line-height: 0.9rem;
          text-align: center;
          font-size: 0.16rem;
          color: rgba(44, 180, 223, 1);
        }
      }
      .z1_1:last-child .z1_1_left {
        width: 40% !important;
      }
      .z1_1:last-child .z1_1_right {
        width: 60% !important;
      }
    }
    .z2 {
      margin-top: 0.2rem;
      height: 3rem;
      overflow: hidden;
      .z2_1 {
        width: 33.5%;
        height: 100%;
        overflow: hidden;
        float: left;
        background: #fff;
        margin-right: 1%;
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
    }
  }
}
</style>
  
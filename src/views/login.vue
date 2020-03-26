<template>
  <!-- 登录 -->
  <div class="login">
    <div class="z1">
      <div class="l"></div>
      <div class="r">
        <h1>{{ at==1?'婴幼儿测评系统平台':'婴儿测评管理系统' }}</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-form-item prop="accountNumber">
            <img class="lb" src="../../public/static/images/lb_3.png" alt />
            <el-input v-model="ruleForm.accountNumber" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="Password">
            <img class="lb" src="../../public/static/images/lb_1.png" alt />
            <el-input v-model="ruleForm.Password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="verificationCode">
            <img class="lb" src="../../public/static/images/lb_2.png" alt />
            <el-input
              v-model="ruleForm.verificationCode"
              placeholder="请输入验证码"
              style="width: 60%;float: left;"
            ></el-input>
            <el-tooltip class="item" effect="light" content="点击更新" placement="bottom">
              <p class="yzm" @click="ghyzm" v-loading="loading">
                <span>{{ num1 }}</span>
                <span>{{ fh }}</span>
                <span>{{ num2 }}</span>
                <span>=</span>
                <span>?</span>
              </p>
            </el-tooltip>
          </el-form-item>
          <el-form-item style="margin-bottom:0;">
            <el-button type="primary" class="dl" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <el-form-item class="AdministratorsTeacher">
            <el-button type="text" @click="AdministratorsTeacher(1)" v-if="at == 1">管理员登录</el-button>
            <el-button type="text" @click="AdministratorsTeacher(2)" v-else-if="at ==2">老师登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
  
  <script>
import $ from "jquery";
import Qs from "qs";
import ElementUI from "element-ui";
require("../../public/static/js/font");
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        accountNumber: "",
        Password: "",
        verificationCode: ""
      },
      at: 1,
      rules: {
        accountNumber: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        Password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      loading: false,
      num1: "", // 第一个数
      num2: "", // 第二个数
      fh: "", // 验证码符号  +  -  *  /
      yzms: "" // 正确的验证码
    };
  },
  // 是件集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let _this = this;
        if (valid) {
          if (_this.ruleForm.verificationCode) {
            if (Number(_this.ruleForm.verificationCode) != _this.yzms) {
              _this.ruleForm.verificationCode = "";
              _this.ghyzm();
              _this.$message.warning("验证码有误,请重新填写");
              return false;
            } else {
              ElementUI.Loading.service({
                fullscreen: true,
                background: "rgba(0,0,0,.4)"
              });
              // 管理员登录
              if (_this.at == 2) {
                let instance = this.$axios.create();
                instance({
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "post",
                  url: "url1/admin/login",
                  data: Qs.stringify({
                    admin_name: _this.ruleForm.accountNumber,
                    admin_password: _this.ruleForm.Password
                  })
                }).then(res => {
                  if (res.data.code == 1) {
                    setTimeout(function() {
                      ElementUI.Loading.service({}).close();
                      _this.$router.push("/home1");
                    }, 1500);
                    localStorage.setItem("uid", res.data.data.id);
                    localStorage.setItem("uname", res.data.data.admin_name);
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("type", 1);
                  } else {
                    ElementUI.Loading.service({}).close();
                    _this.$message.warning(res.data.message);
                    _this.ruleForm.verificationCode = '';
                    _this.ghyzm();
                  }
                });
                // 老师登录
              } else {
                let instance = this.$axios.create();
                instance({
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "post",
                  url: "url1/teacher/login",
                  data: Qs.stringify({
                    teacher_name: _this.ruleForm.accountNumber,
                    teacher_password: _this.ruleForm.Password
                  })
                }).then(res => {
                  if (res.data.code == 1) {
                    setTimeout(function() {
                      ElementUI.Loading.service({}).close();
                      _this.$router.push("/home2");
                    }, 1500);
                    localStorage.setItem("uid", res.data.data.id);
                    localStorage.setItem("uname", res.data.data.teacher_name);
                    localStorage.setItem("token", res.data.data.token);
                    localStorage.setItem("type", 2);
                  } else {
                    ElementUI.Loading.service({}).close();
                    _this.$message.warning(res.data.message);
                    _this.ruleForm.verificationCode = '';
                    _this.ghyzm();
                  }
                });
              }
            }
          } else {
            _this.$message.warning("请填写验证码");
            return false;
          }
        }
      });
    },
    // 管理员 - 老师
    AdministratorsTeacher(type) {
      if (type == 1) {
        this.at = 2;
        this.$message.success("已选择管理员登录");
      } else {
        this.at = 1;
        this.$message.success("已选择老师登录");
      }
    },
    // 更新验证码
    ghyzm() {
      let _this = this;
      _this.ruleForm.verificationCode = "";
      let num1 = Math.ceil(Math.random() * 10);
      let num2 = Math.ceil(Math.random() * 10);
      let num3 = Math.ceil(Math.random() * 3);
      _this.num1 = num1;
      _this.num2 = num2;
      if (num3 == 1) {
        _this.fh = "+";
        _this.yzms = num1 + num2;
      } else if (num3 == 2) {
        _this.fh = "-";
        if (num1 < num2) {
          _this.yzms = num2 - num1;
          _this.num1 = num2;
          _this.num2 = num1;
        } else {
          _this.yzms = num1 - num2;
        }
      } else if (num3 == 3) {
        _this.fh = "*";
        _this.yzms = num1 * num2;
      } else {
        _this.fh = "+";
        _this.yzms = num1 + num2;
      }
      _this.loading = true;
      setTimeout(function() {
        _this.loading = false;
      }, 1000);
    }
  },
  mounted() {
    this.ghyzm();
  },
  // 初始化数据
  created() {}
};
</script>
  
<style lang="less" scoped>
.login {
  height: 100%;
  background: url(../../public/static/images/login_1.png) center no-repeat
    no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .z1 {
    width: 8rem;
    height: 3.3rem;
    background: #fff;
    margin: auto;
    margin-top: 15%;
    border-radius: 0.1rem;
    .l {
      width: 50%;
      height: 100%;
      float: left;
      background: url(../../public/static/images/login_2.png) center no-repeat
        no-repeat;
      background-size: 100% 100%;
    }
    .r {
      overflow: hidden;
      h1 {
        color: #2978fe;
        font-size: 0.2rem;
        font-weight: 600;
        margin-top: 0.2rem;
      }
      .demo-ruleForm {
        .lb {
          display: block;
          width: 20%;
          position: absolute;
          width: 0.3rem;
          height: 0.3rem;
          z-index: 1;
          margin: 0.05rem 0 0 0.05rem;
        }
        .dl {
          width: 100%;
          height: 0.4rem;
          line-height: 0.4rem;
          padding: 0;
        }
        .AdministratorsTeacher {
          text-align: right;
        }
        .yzm {
          width: 35%;
          float: right;
          line-height: 0.4rem;
          color: #e6a23c;
          letter-spacing: 0.06rem;
          border-radius: 0.04rem;
          background: url(../../public/static/images/yzm.jpg) center no-repeat
            no-repeat;
          background-size: 100% 100%;
          font-size: 0.2rem;
          cursor: pointer;
        }
      }
    }
  }
}
.el-form {
  display: block;
  width: 80%;
  margin: auto;
  padding-top: 0.2rem;
}
.el-input {
  height: 0.4rem !important;
  line-height: 0.4rem !important;
}
.login /deep/ .el-form-item__content {
  line-height: 0 !important;
}
.el-form-item {
  margin-bottom: 0.18rem;
}
.login /deep/ .el-input__inner {
  height: 0.4rem !important;
  line-height: 0.4rem !important;
  padding-left: 0.4rem;
}
</style>
  
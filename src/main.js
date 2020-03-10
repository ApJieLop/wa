import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from 'axios' // axios
Vue.prototype.$axios = axios; // axios实例化

import Qs from 'qs' // qs
Vue.prototype.$qs = Qs; // Qs实例化

// ElementUI框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 全局Loading
const showLoading = () => {
  ElementUI.Loading.service({
    fullscreen: true,
    background: "rgba(0,0,0,.4)"
  });
}
const closeLoading = () => {
  ElementUI.Loading.service({}).close();
}
//主域名
// axios.defaults.baseURL = 'http://www.tj-hwyl.com/api/index';
//定义headers格式
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//Authorization - token
axios.defaults.headers.common["token"] = localStorage.getItem('token');
// 请求拦截器
axios.interceptors.request.use(function (config) {
  if(!localStorage.getItem('token')){
    localStorage.clear();
    router.push("/");
    ElementUI.Message.error("登录已失效，请重新登录");
  }
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data);
  }
  showLoading();
  return config;
}, function (error) {
  closeLoading();
  return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(function (response) {
  setTimeout(function () {
    closeLoading();
  }, 500);
  // 请求成功
  if (response.data.code == 1) {
    return response;
    // token失效  
  } else if (response.data.code == 401) {
    localStorage.clear();
    router.push("/");
    ElementUI.Message.error(response.data.message + ',请联系管理员!');
    return false;
    // 服务器失败
  } else {
    ElementUI.Message.error(response.data.message + ',请联系管理员!');
    return false;
  }
}, function (error) {
  ElementUI.Message.error(response.data.message + ',请联系管理员!');
  return Promise.reject(error);
});

// 时间方法
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
  // new Date(1542274800000).Format('yy-MM-dd hh:mm:ss');
}

// axios - 请求
Vue.prototype.myAjax = (type, url, data = {}, F) => {
  if (type == 'get') {
    axios({
      method: type,
      url: url,
      params: data
    }).then(res => {
      return F(res);
    },
      err => {
        return err
      })
  } else {
    axios({
      method: type,
      url: url,
      data: data
    }).then(res => {
      return F(res);
    },
      err => {
        return err
      })
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
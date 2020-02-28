import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    // 整体架子
    {
      path: "/publicHead",
      name: "publicHead",
      component: resolve =>
        require(['@/components/publicHead.vue'], resolve),
      meta: {
        title: '首页'
      },
      // redirect() {
      //   return '/evaluationAnalysis'
      // },
      children: [
        // 首页 - 1(学员)
        {
          path: "/home1",
          name: "home1",
          component: resolve =>
            require(['@/views/home1.vue'], resolve),
          meta: {
            title: '测评分析'
          }
        },
        // 首页 - 2(老师)
        {
          path: "/home2",
          name: "home2",
          component: resolve =>
            require(['@/views/home2.vue'], resolve),
          meta: {
            title: '测评分析'
          }
        },
        // 测评分析
        {
          path: "/evaluationAnalysis",
          name: "evaluationAnalysis",
          component: resolve =>
            require(['@/views/evaluationAnalysis.vue'], resolve),
          meta: {
            title: '测评分析'
          }
        },
        // 课程管理
        {
          path: "/curriculumAdministration",
          name: "curriculumAdministration",
          component: resolve =>
            require(['@/views/curriculumAdministration.vue'], resolve),
          meta: {
            title: '课程管理 - 学员'
          }
        },
        // 测评导入
        {
          path: "/evaluationImport",
          name: "evaluationImport",
          component: resolve =>
            require(['@/views/evaluationImport.vue'], resolve),
          meta: {
            title: '测评导入'
          }
        },
        // 测评试卷编辑
        {
          path: "/testPaper",
          name: "testPaper",
          component: resolve =>
            require(['@/views/testPaper.vue'], resolve),
          meta: {
            title: '测评试卷编辑'
          }
        },
        // 客户档案
        {
          path: "/customerFiles",
          name: "customerFiles",
          component: resolve =>
            require(['@/views/customerFiles.vue'], resolve),
          meta: {
            title: '客户档案'
          }
        },
        // 老师管理
        {
          path: "/teacherAdministration",
          name: "teacherAdministration",
          component: resolve =>
            require(['@/views/teacherAdministration.vue'], resolve),
          meta: {
            title: '老师管理'
          }
        },
        // 课程管理
        {
          path: "/scurriculumAdministration",
          name: "scurriculumAdministration",
          component: resolve =>
            require(['@/views/scurriculumAdministration.vue'], resolve),
          meta: {
            title: '课程管理'
          }
        },
        // 查看学员
        {
          path: "/seeStudent",
          name: "seeStudent",
          component: resolve =>
            require(['@/views/seeStudent.vue'], resolve),
          meta: {
            title: '查看学员'
          }
        },
        // 已测题目
        {
          path: "/subjectTested",
          name: "subjectTested",
          component: resolve =>
            require(['@/views/subjectTested.vue'], resolve),
          meta: {
            title: '已测题目'
          }
        },
        // 测评结果
        {
          path: "/evaluationResult",
          name: "evaluationResult",
          component: resolve =>
            require(['@/views/evaluationResult.vue'], resolve),
          meta: {
            title: '测评结果'
          }
        },
      ]
    },
    // 测评题目
    {
      path: "/evaluationSubject",
      name: "evaluationSubject",
      component: resolve =>
        require(['@/views/evaluationSubject.vue'], resolve),
      meta: {
        title: '课程管理'
      }
    },
     // 答题
     {
      path: "/topic",
      name: "topic",
      component: resolve =>
        require(['@/views/topic.vue'], resolve),
      meta: {
        title: '答题'
      }
    },
     // 答题结果
     {
      path: "/answerResult",
      name: "answerResult",
      component: resolve =>
        require(['@/views/answerResult.vue'], resolve),
      meta: {
        title: '答题结果'
      }
    },
    // 登录
    {
      path: "/",
      name: "login",
      component: resolve =>
        require(['@/views/login.vue'], resolve),
      meta: {
        title: '登录'
      },
    },
    // 404
    {
      path: "*",
      name: "404",
      component: resolve =>
        require(['@/views/_404.vue'], resolve),
      meta: {
        title: '404'
      },
    },
  ],
  // 前进后退是定位到原来位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-新生儿测评系统'
  } else {
    document.title = '新生儿测评系统'
  }
  //获取store里面的token
  let token = sessionStorage.getItem("token");
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next();// 没有启动守卫 - 随他去吧
  }
})

export default router
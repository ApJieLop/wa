<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;   
  }
}
.el-dialog__header {
  line-height: 0;
}
.el-pagination {
  height: 0.3rem;
  position: fixed;
  bottom: 0.4rem;
  right: 3%;
}
.el-table th {
  background: #fafafa;
}
.el-table td {
  padding: 5px 0!important;
}
.el-tabs__nav-wrap {
  line-height: 0 !important;
}
.el-tabs__nav-wrap::after {
  height: 1px!important;
}
.el-dialog__footer {
  clear: both;
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router/index'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import config from '../config/index'
import App from './App'

Vue.use(VueRouter)

const router = new VueRouter({
  base: config.build.assetsPublicPath,
  routes: routes.routes
})

FastClick.attach(document.body)

import { sync } from 'vuex-router-sync'
import store from './vuex/store'
const commit = store.commit

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/* vue-router相关配置
 * to：Route 即将要进入的目标 路由对象
 * from：Route 当前导航正要离开的路由
 * next：Function 一定要调用该方法resolve这个钩子，执行效果依赖next方法的调用参数
 */
router.beforeEach((to, from, next) => {
  // 过场动画
  commit('SET_CURRPATH', to.path)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    // 前进动画
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  // 页面加载前显示 loading
  commit('UPADTA_LOADING', true)
  setTimeout(next, 5)
})

// 注册一个全局的after的钩子，不会改变导航
router.afterEach((to) => {
  // 页面加载后隐藏 loading
  commit('UPADTA_LOADING', false)
  // 设置标题
  if (to.meta.title || routes.defaultTitle !== document.title) {
    Vue.$utils.Common.setTitle(to.meta.title || routes.defaultTitle)
  }
  // 保存当前路由
  commit('SET_ROUTE', to)
  // 默认展示底部提示，不需要的页面需特殊处理
  setTimeout(() => {
    commit('SHOWFOOT', to.meta.showFoot)
  }, 500)
})

sync(store, router)

// 公共文件引入
import { DevicePlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import UtilsPlugin from './utils/index'
import HttpPlugin from './http'

Vue.use(DevicePlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')

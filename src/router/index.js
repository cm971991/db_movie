export default {
  defaultTitle: '豆瓣电影',
  // 将所有页面组件一次性加载是一个很浪费资源和考验用户耐心的做法，尤其在移动端
  // 异步加载组件
  routes: [
    {
      path: '/',
      component: function (resolve) {
        require(['../pages/Hello.vue'], resolve)
      },
      meta: {title: '首页'}
    },
    {
      path: '/inTheaters',
      component: function (resolve) {
        require(['../pages/inTheaters.vue'], resolve)
      },
      meta: {title: '首页'}
    }
  ]
}

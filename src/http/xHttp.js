import Vue from 'vue'
import axios from 'axios'

// 线上接口地址
let onlineApi = 'http://api.51pinzhi.cn/api/'
// 测试接口地址
// let testApi = 'http://10.10.141.79:8080/icompaign/' // icompaign/
// let testApi = 'http://10.10.133.211:8080/' // icompaign/
function successParse (res, load) {
  if (load) {
    Vue.$vux.loading.hide()
  }
  try {
    return JSON.parse(res.data)
  } catch (e) {
    return res.data
  }
}
function errorParse (ex, load) {
  if (load) {
    Vue.$vux.loading.hide()
  }
  switch (ex.status) {
    // oauth权限
    // case 401:
    //   location.href = '../login'
    //   break
    // 请求参数错误
    // case 400:
    //   return Promise.reject(ex.data);
    // 系统错误
    default:
      return Promise.reject({msg: '传输异常，请稍后再试'})
  }
}

function send (url, method, body, options, load, loadMsg) {
  if (load) {
    Vue.$vux.loading.show(loadMsg)
  }
  /* 匹配线上环境和测试环境
   * 测试环境打包执行 【build-test】
   * 线上环境打包执行【build】
   */
  switch (process.env.NODE_ENV) {
    case 'production':
      if (!url.startsWith('http')) {
        url = onlineApi + url
      }
      break
    case 'testing':
    case 'development':
      break
    default:
      // if (!url.startsWith('http')) {
      //   url = testApi + url
      // }
      break
  }
  const opts = {...options}
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers
  }
  switch (method) {
    case 'get':
      return axios.get(url, opts)
        .then(res => successParse(res, load))
        .catch(error => errorParse(error, load))
    case 'post':
      return axios.post(url, body, opts)
        .then(res => successParse(res, load))
        .catch(error => errorParse(error, load))
  }
}

export default {
  get (url, options, {load = true, loadMsg = '加载中...'} = {}) {
    return send(url, 'get', null, options, load, loadMsg)
  },
  post (url, body, options, {load = true, loadMsg = '加载中...'} = {}) {
    return send(url, 'post', body, options, load, loadMsg)
  }
}

import Vue from 'vue'
import axios from 'axios'

// 线上接口地址
let onlineApi = 'http://api.51pinzhi.cn/api/'
// 测试接口地址
// let testApi = 'http://10.10.141.79:8080/icompaign/' // icompaign/
let testApi = 'http://10.10.133.211:8080/' // icompaign/
const DEFAULTERS = '传输异常，请稍后再试'
function successParse (res, load, validator, completeHanding, successHanding, failHandling, type, buried) {
  // 避免loading动画一闪而过，增加0.3秒延迟
  let time = load ? 300 : 0
  let obj
  try {
    obj = JSON.parse(res.data)
  } catch (e) {
    obj = res.data
  }
  if (type === 0 || type === 2) {
    setTimeout(() => {
      if (load) {
        Vue.$vux.loading.hide()
      }
      try {
        // 接口完成处理
        type === 0 && completeHanding()
        // 验证接口结果
        if (validator(obj)) {
          if (buried) {
            // 业务埋点
            Vue.$utils.Log.apiLog(0, name, 0, null, null, JSON.stringify(obj))
          }
          // 业务成功处理
          successHanding(obj)
        } else {
          if (buried) {
            // 业务埋点
            Vue.$utils.Log.apiLog(0, name, 1, null, null, JSON.stringify(obj))
          }
          type === 2 && completeHanding()
          // 业务失败处理
          failHandling(obj)
        }
      } catch (e) {
        console.log('successParseEx:', e)
      }
    }, time)
  } else {
    return obj
  }
}
function errorParse (error, load, completeHanding, exceptionHandling, type, buried) {
  if (buried) {
    // 接口异常埋点
    Vue.$utils.Log.apiLog(1, name, 1, null, null, JSON.stringify(error))
  }
  if (load) {
    if (load === 'btn') {
      window.$globalHub.$store.commit('UPDATE_BTNLOADINGSTR', null)
    } else {
      Vue.$vux.loading.hide()
    }
  }
  // 接口完成处理
  if (type === 0 || type === 2) {
    completeHanding()
  }
  // 接口异常处理
  let status = -1
  if (error.response && error.response.status) {
    status = error.response.status
  }
  if (type === 0 || type === 2) {
    exceptionHandling(status)
  } else {
    return Promise.reject(status)
  }
}

function send (url, method, body, options, load, loadMsg, validator, completeHanding, successHanding, failHandling, exceptionHandling, type, buried) {
  // 接口开始埋点
  if (buried) {
    let InputParams
    if (method === 'get') {
      InputParams = url.indexOf('?') > -1 ? url.split('?')[1] : null
    } else {
      InputParams = JSON.stringify(body)
    }
    console.log('InputParams:', InputParams)
    Vue.$utils.Log.apiLog(0, url.indexOf('?') > -1 ? url.split('?')[0] : url, 0, null, InputParams, null)
  }
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
      if (!url.startsWith('http')) {
        url = testApi + url
      }
      break
    default:
      if (!url.startsWith('http')) {
        url = testApi + url
      }
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
        .then(res => successParse(res, load, validator, completeHanding, successHanding, failHandling, type, buried))
        .catch(error => errorParse(error, load, completeHanding, exceptionHandling, type, buried))
    case 'post':
      return axios.post(url, body, opts)
        .then(res => successParse(res, load, validator, completeHanding, successHanding, failHandling, type, buried))
        .catch(error => errorParse(error, load, completeHanding, exceptionHandling, type, buried))
  }
}

export default {
  /**
   * 调用Get接口
   * @param url 接口地址
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param type 调用类型（默认0：单个调用，1：并发调用，2：连续调用）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param validator 业务成功逻辑判断
   * @param completeHanding 接口完成处理
   * @param successHanding 业务完成处理
   * @param failHandling 业务失败处理
   * @param exceptionHandling 接口异常处理
   * @param buried 是否添加接口埋点
   */
  get (url, {options = null, type = 0, load = true, loadMsg = '加载中...', validator = (res) => res.resultCode === '0000', completeHanding = () => {}, successHanding = () => {}, failHandling = (res) => Vue.$vux.alert.show({content: res.Msg}), exceptionHandling = () => Vue.$vux.alert.show({content: DEFAULTERS}), buried = true} = {}) {
    return send(url, 'get', null, options, load, loadMsg, validator, completeHanding, successHanding, failHandling, exceptionHandling, type, buried)
  },
  /**
   * 调用Post接口
   * @param url 接口地址
   * @param body 接口参数
   * @param options axios的options设置（参考https://github.com/mzabriskie/axios）
   * @param type 调用类型（默认0：单个调用，1：并发调用，2：连续调用）
   * @param load  是否展示loading (true：默认，展示全屏loading框，false：不展示，btn：展示按钮loading)
   * @param loadMsg loading展示文字
   * @param validator 业务成功逻辑判断
   * @param completeHanding 接口完成处理
   * @param successHanding 业务完成处理
   * @param failHandling 业务失败处理
   * @param exceptionHandling 接口异常处理
   * @param buried 是否添加接口埋点
   */
  post (url, body, {options = null, type = 0, load = true, loadMsg = '加载中...', validator = (res) => res.resultCode === '0000', completeHanding = () => {}, successHanding = () => {}, failHandling = (res) => Vue.$vux.alert.show({content: res.resultMsg}), exceptionHandling = () => Vue.$vux.alert.show({content: DEFAULTERS}), buried = true} = {}) {
    return send(url, 'post', body, options, load, loadMsg, validator, completeHanding, successHanding, failHandling, exceptionHandling, type, buried)
  }
}

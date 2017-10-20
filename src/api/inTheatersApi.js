/**
 * Created by hale on 2017/7/3.
 */

import Vue from 'vue'
import url from '../api/apiUrl'
import exception from './Exceptions'

export default {
  /**
   * 正在热映
   * @param city
   * @returns {Promise}
   */
  inTheaters (city) {
    return new Promise((resolve) => {
      console.log('url:', Vue.$utils.Common.stringFormat(url.getUrl('in_theaters'), city))
      Vue.$api.xHttp.get(Vue.$utils.Common.stringFormat(url.getUrl('in_theaters'), city)).then((res) => {
        resolve(res)
      }).catch((ex) => {
        exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 即将上映
   * @returns {Promise}
   */
  comingSoon () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url.getUrl('coming_soon')).then((res) => {
        resolve(res)
      }).catch((ex) => {
        exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 电影搜索
   * @param q 姓名
   * @param tag 标签
   * @returns {Promise}
   */
  search (q, tag) {
    return new Promise(resolve => {
      Vue.$api.xHttp.get(Vue.$utils.Common.stringFormat(url.getUrl('search'), {q: q, tag: tag})).then(res => {
        resolve(res)
      }).catch(ex => {
        exception.ErrorMsgNotification(-1)
      })
    })
  }
}

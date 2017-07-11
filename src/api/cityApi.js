/**
 * Created by hale on 2017/7/11.
 */

import Vue from 'vue'
import url from '../api/apiUrl'
import exception from './Exceptions'

export default{
  /**
   * 热门城市
   * @returns {Promise}
   */
  hotCity () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url.getUrl('hotCity')).then((res) => {
        resolve(res)
      }).catch((ex) => {
        exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 全国省市
   * @returns {Promise}
   */
  province () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url.getUrl('province')).then((res) => {
        resolve(res)
      }).catch((ex) => {
        exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 获取省份对应的城市
   * @returns {Promise}
   */
  city () {
    return new Promise((resolve) => {
      Vue.$api.xHttp.get(url.getUrl('city')).then((res) => {
        resolve(res)
      }).catch((ex) => {
        exception.ErrorMsgNotification(-1)
      })
    })
  }
}

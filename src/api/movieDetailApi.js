/**
 * Created by hale on 2017/7/24.
 */

import Vue from 'vue'
import url from '../api/apiUrl'
import exception from './Exceptions'

export default {
  /**
   * 正在上映 点击查看详情
   * @param mid
   * @returns {Promise}
   */
  movieDetail (mid) {
    return new Promise(resolve => {
      Vue.$api.xHttp.get(Vue.$utils.Common.stringFormat(url.getUrl('movie_detail'), mid)).then(res => {
        resolve(res)
      }).catch(ex => {
        exception.ErrorMsgNotification(-1)
      })
    })
  },
  /**
   * 影人详情
   * @param cid
   * @returns {Promise}
   */
  celebrityDetail (cid) {
    return new Promise(resolve => {
      console.log('celebrityUrl:', Vue.$utils.Common.stringFormat(url.getUrl('celebrity'), cid))
      Vue.$api.xHttp.get(Vue.$utils.Common.stringFormat(url.getUrl('celebrity'), cid)).then(res => {
        resolve(res)
      }).catch(ex => {
        exception.ErrorMsgNotification(-1)
      })
    })
  }
}

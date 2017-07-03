/**
 * Created by hale on 2017/7/3.
 */

import api from '../api/inTheatersApi'
import exception from '../api/Exceptions'

const actions = {
  /**
   * 正在热映
   * @param commit
   * @returns {Promise}
   */
  inTheaters ({commit} = {}) {
    return new Promise((resolve) => {
      api.inTheaters().then((res) => {
        if (res) {
          if (res.subjects.length > 0) {
            resolve(res.subjects)
          } else {
            exception.ErrorMsgNotification('0000', '很抱歉')
          }
        } else {
          exception.ErrorMsgNotification(res.code, res.msg)
        }
      })
    })
  },
  /**
   * 即将上映
   * @param commit
   * @returns {Promise}
   */
  comingSoon ({commit} = {}) {
    return new Promise((resolve) => {
      api.comingSoon().then((res) => {
        if (res) {
          if (res.subjects.length > 0) {
            resolve(res.subjects)
          } else {
            exception.ErrorMsgNotification('0000', '很抱歉')
          }
        } else {
          exception.ErrorMsgNotification(res.code, res.msg)
        }
      })
    })
  }
}

export default {
  actions
}

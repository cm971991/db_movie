/**
 * Created by hale on 2017/7/3.
 */

import api from '../api/inTheatersApi'
import exception from '../api/Exceptions'

const actions = {
  /**
   * 正在热映
   * @param commit
   * @param state
   * @param body
   * @returns {Promise}
   */
  inTheaters ({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.inTheaters(body.city).then((res) => {
        if (res) {
          if (res.subjects.length > 0) {
            res.subjects.forEach((item, index) => {
              if (item.rating) {
                let temp = item.rating.stars / 10
                item.rating.stars = (temp >= 0) ? temp : item.rating
              }
            })
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

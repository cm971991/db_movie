/**
 * Created by hale on 2017/7/3.
 */

import Vue from 'vue'
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
    console.log('body.city:', body.city)
    return new Promise((resolve) => {
      let vm = Vue
      api.inTheaters(body.city).then((res) => {
        if (res) {
          if (res.subjects.length > 0) {
            let now = vm.$utils.Date.format(new Date(), 'yyyy-MM-dd')
            res.subjects.forEach((item, index) => {
              if (item.rating) {
                let temp = item.rating.stars / 10
                item.rating.stars = (temp >= 0) ? temp : item.rating
              }
              if (item.pubdates) {
                item.pubdates.forEach((pubdata, index) => {
                  if (pubdata.includes('大陆')) {
                    let pub = pubdata.substring(0, pubdata.indexOf('('))
                    let diff = vm.$utils.Date.getDifferenceDay(now, pub)
                    item.presell = diff >= 0
                  }
                })
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
  },
  /**
   * 正在上映 点击查看详情
   * @param commit
   * @param body
   */
  movieDetail ({commit} = {}, body) {
    return new Promise(resolve => {
      api.movieDetail(body.mid).then(res => {
        if (res) {
          if (res.rating) {
            let temp = res.rating.stars / 10
            res.rating.stars = (temp >= 0) ? temp : res.rating
            resolve(res)
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
   * 搜索
   * @param commit
   * @param body
   */
  search ({commit} = {}, body) {
    return new Promise(resolve => {
      api.search(body.q, body.tag).then(res => {
        if (res) {
          if (res.subjects.length > 0) {
            let now = parseInt(Vue.$utils.Date.format(new Date(), 'yyyy'))
            let subject = res.subjects.filter(n => n.collect_count >= 50000 && (now - parseInt(n.year) <= 7))
            resolve(subject)
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

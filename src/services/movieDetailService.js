/**
 * Created by hale on 2017/7/3.
 */
// import Vue from 'vue'
import api from '../api/movieDetailApi'
import exception from '../api/Exceptions'

const actions = {
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
   * 影人详情
   * @param commit
   * @param body
   * @returns {Promise}
   */
  celebrityDetail ({commit} = {}, body) {
    return new Promise(resolve => {
      api.celebrityDetail(body.cid).then(res => {
        if (res) {
          // if (res.photos.length > 0) {
          //   debugger
          //   res.photos.forEach((item, index) => {
          //     let img = Vue.$utils.Image.encode(item.thumb)
          //     console.log('img:', img)
          //   })
          // }
          resolve(res)
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

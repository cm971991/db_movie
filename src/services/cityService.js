/**
 * Created by hale on 2017/7/11.
 */
import Vue from 'vue'
import api from '../api/cityApi'
import exception from '../api/Exceptions'

const state = {
  city: '南京'
}

const getters = {
  city: state => {
    return state.city
  }
}

const actions = {
  /**
   * 热门城市
   * @param commit
   * @param state
   * @returns {Promise}
   */
  hotCity ({commit, state} = {}) {
    return new Promise((resolve) => {
      api.hotCity().then((res) => {
        if (res) {
          resolve(res.hotCity)
        } else {
          exception.ErrorMsgNotification(res.code, res.msg)
        }
      })
    })
  },
  /**
   * 全国省市
   * @param commit
   * @param state
   * @returns {Promise}
   */
  province ({commit, state} = {}) {
    return new Promise((resolve) => {
      api.province().then((res) => {
        if (res) {
          let letterList = []
          let map = new Vue.$utils.Common.Map()
          res.province.forEach((item, index) => {
            let letter = Vue.$utils.PinYin.makePy(item.text)
            map.put(letter[0], item)
          })
          map.each((key, val, index) => {
            let tempObj = {}
            tempObj.letter = key
            tempObj.data = val
            letterList.push(tempObj)
          })
          letterList = letterList.sort((a, b) => a.letter.localeCompare(b.letter))
          resolve(letterList)
        } else {
          exception.ErrorMsgNotification(res.code, res.msg)
        }
      })
    })
  },
  /**
   * 获取省份对应的城市
   * @param commit
   * @param state
   * @param body
   */
  city ({commit, state} = {}, body) {
    return new Promise((resolve) => {
      api.city().then((res) => {
        if (res) {
          res.city = res.city.find((n) => n.code === body.code)
          let cityList = []
          let map = new Vue.$utils.Common.Map()
          res.city.child.forEach((item, index) => {
            let letter = Vue.$utils.PinYin.makePy(item.text)
            map.put(letter[0], item)
          })
          map.each((key, val, index) => {
            let tempObj = {}
            tempObj.letter = key
            tempObj.data = val
            cityList.push(tempObj)
          })
          cityList = cityList.sort((a, b) => a.letter.localeCompare(b.letter))
          resolve(cityList)
        } else {
          exception.ErrorMsgNotification(res.code, res.msg)
        }
      })
    })
  }
}

const mutations = {
  set_city (state, val) {
    state.city = val
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

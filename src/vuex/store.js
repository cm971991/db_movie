/**
 * Created by chang on 2017/5/16.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '../utils/localStorage'
import creatPersistedstate from 'vuex-persistedstate'
import config from '../../config'
import global from './modules/global'
Vue.use(Vuex)

import inTheaters from '../services/inTheatersService'

export default new Vuex.Store({
  // 组合各模块
  modules: {
    global,
    inTheaters
  },
  // 状态持久化插件
  plugins: [creatPersistedstate({
    key: config.build.assetsPublicPath + 'vuex',
    paths: ['login', 'business', 'log'], // 只缓存service里面的state
    getState: (key) => localStorage.get(key),
    setState: (key, state) => localStorage.set(key, state)
  })]
})

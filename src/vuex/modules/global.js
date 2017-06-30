/**
 * Created by chang on 2017/5/16.
 */

// 该模块的初始状态
const state = {
  direction: 'forward', // 页面切换动画
  isLoading: false, // 页面切换显示loading
  currPath: '', // 当前路由地址
  showFoot: false,
  seq: 0,
  route: null
}
// getters
const getters = {
  seq: state => {
    return state.seq
  },
  route: state => {
    return state.route
  }
}

// 相关的 mutations
const mutations = {
  UPDATE_DIRECTION (state, value) {
    state.direction = value
  },
  UPADTA_LOADING (state, value) {
    state.isLoading = value
  },
  SHOWFOOT (state, showFoot) {
    state.showFoot = showFoot
  },
  SET_CURRPATH (state, value) {
    state.currPath = value
  },
  SET_ROUTE (state, route) {
    state.route = route
  },
  INIT_SEQ (state) {
    state.seq = 0
  },
  ADD_SEQ (state) {
    state.seq = state.seq + 1
  }
}
export default {
  state,
  getters,
  mutations
}

import xHttp from './xHttp'

export default function (Vue) {
  if (!Vue.$api) {
    Vue.$api = {
      xHttp
    }
  } else {
    Vue.$api.xHttp = xHttp
  }
  Vue.mixin({
    created () {
      this.$api = {
        xHttp
      }
    }
  })
}

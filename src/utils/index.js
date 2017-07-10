/**
 * Created by chang on 2017/5/16.
 */
import localStorage from './localStorage'
import Common from './common'
import Date from './date'
import PinYin from './pinyin'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      localStorage,
      Common,
      Date,
      PinYin
    }
  } else {
    Vue.$utils = {
      localStorage,
      Common,
      Date,
      PinYin
    }
  }
  Vue.mixin({
    created () {
      this.$utils = {
        localStorage,
        Common,
        Date,
        PinYin
      }
    }
  })
}

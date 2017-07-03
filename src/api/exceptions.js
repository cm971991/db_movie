/**
 * Created by chang on 2017/5/25.
 */
import Vue from 'vue'
export default {
  /**
   * 异常处理
   * @param code 错误代码
   * @param msg 错误信息
   * @constructor
   */
  ErrorMsgNotification (code, msg) {
    // let error = errorData.find(_x => _x.ErrorCode === code)
    if (code !== -1) {
      Vue.$vux.alert.show({content: msg})
    } else {
      Vue.$vux.alert.show({content: '传输异常，请稍后再试！'})
    }
  }
}

let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
export default {
  getWidthHeight () {
    let w                                                     = window, d = document, e = d.documentElement, g    = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight
    return {width: x, height: y}
  },
  hasScrollBar (id) {
    id = id || 'app'
    return document.getElementById(id).scrollHeight > this.getWidthHeight().height
  },
  getImageWH (imgUrl) {
    let img = new Image()
    img.src = imgUrl
    return {w: img.width, h: img.height}
  },
  hidePhone (value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    if (value.length !== 11) {
      return value
    }
    return value.substring(0, 3) + '*****' + value.substring(8)
  },
  price (value, fixed) {
    value = value || 0
    if (typeof value === 'string') {
      value = parseFloat(value)
    }
    if (undefined === fixed || null === fixed) {
      fixed = 2
    }
    if (value < 0) {
      value = 0
    }
    return value.toFixed(fixed)
  },
  getParam (name, url) {
    if (!url) {
      url = window.location.href
    }
    name = name.replace(/[\[\]]/g, '\\$&')
    let regex   = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  },
  setTitle (title) {
    setTimeout(function () {
      //利用iframe的onload事件刷新页面
      document.title = title
      var iframe = document.createElement('iframe')
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }, 0)
  },
  generateMixed (n) {
    var res = ''
    for (var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },
  numberToChinese (n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
      return ''
    }
    var unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分', str = ''
    n += '00'
    var p = n.indexOf('.')
    if (p >= 0)
      n = n.substring(0, p) + n.substr(p + 1, 2)
    unit = unit.substr(unit.length - n.length)
    for (var i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|元)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^元零?|零分/g, '').replace(/(元|角)$/g, '$1整')
  },
  errorMsg (code) {
    if (!code) {
      return '传输异常，请稍后再试！'
    }
    let error = window.$globalHub.$store.state.common.ERROR_DATA.find(_x => _x.ErrorCode === code)
    if (!error) {
      return '传输异常，请稍后再试！'
    }
    return error.ErrorMessage
  },
  Map () {
    /**
     * 存放键的数组
     * @type {Array}
     */
    this.keys = new Array()
    /**
     * 存放数据
     * @type {Object}
     */
    this.data = new Object()
    /**
     * 放入一个键值对
     * @param  {String} key
     * @param  {Object} value
     */
    this.put = function (key, value) {
      if (!this.data[key]) {
        this.keys.push(key)
        let tempArray = new Array()
        tempArray.push(value)
        this.data[key] = tempArray
      } else {
        let tempArray = new Array()
        if (this.data[key] instanceof Array) {
          this.data[key].forEach((val, index) => {
            tempArray.push(val)
          })
        } else {
          tempArray.push(this.data[key])
        }
        tempArray.push(value)
        this.data[key] = tempArray
      }
    }
    /**
     * 获取某键对应的值
     * @param  {String} key
     * @return {Object} value
     */
    this.get = function (key) {
      return this.data[key]
    }
    /**
     * 删除一个键值对
     * @param  {String} key
     */
    this.remove = function (key) {
      this.keys.remove(key)
      this.data[key] = null
    }
    /**
     * 遍历Map，执行处理函数
     * @param  {Function}
     */
    this.each = function (fn) {
      if (typeof fn !== 'function') {
        return
      }
      let len = this.keys.length
      for (let i = 0; i < len; i++) {
        let k = this.keys[i]
        fn(k, this.data[k], i)
      }
    }
    /**
     * 返回键值对数组(类似Java的entrySet)
     * @return {Object} 键值对对象{key,value}的数组
     */
    this.entrys = function () {
      let len = this.keys.length
      let entrys = new Array(len)
      for (let i = 0; i < len; i++) {
        let tmp = this.keys[i]
        entrys[i] = {
          key: tmp,
          value: this.data[tmp]
        }
      }
      return entrys
    }
    /**
     * 判断Map是否为空
     * @return {Boolean}
     */
    this.isEmpty = function () {
      return this.keys.length === 0
    }
    /**
     * 获取键值对数量
     * @return {Number}
     */
    this.size = function () {
      return this.keys.length
    }
    /**
     * 重写toString
     * @return {String}
     */
    this.toString = function () {
      let s = '{'
      for (let i = 0; i < this.keys.length; i++, s += ',') {
        let k = this.keys[i]
        s += k + '=' + this.data[k]
      }
      s += '}'
      return s
    }
  },
  stringFormat (str,args){
    return str.format(args);
  }
}

/**
 * 为Array对象添加remove方法，删除制定值得元素
 * @param  {String} 数组元素值
 */
Array.prototype.remove = function (s) {
  for (let i = 0; i < this.length; i++) {
    if (s === this[i])
      this.splice(i, 1)
  }
}

String.prototype.format = function (args) {
  let result = this
  if (arguments.length > 0) {
    if (arguments.length === 1 && typeof (args) === 'object') {
      for (let key in args) {
        if (args[key] !== undefined) {
          let reg = new RegExp('({' + key + '})', 'g')
          result = result.replace(reg, args[key])
        }
      }
    }
    else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) {
          let reg = new RegExp('({)' + i + '(})', 'g')
          result = result.replace(reg, arguments[i])
        }
      }
    }
  }
  return result
}


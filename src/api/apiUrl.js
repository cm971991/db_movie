/**
 * Created by Administrator on 2017/7/3.
 */

export default {
  getUrl: (action) => {
    let url = 'dbApi/'
    let apiKey = '0b2bdeda43b5688921839c8ecb20399b'
    let actions = {
      // 正在热映
      'in_theaters': () => {
        return url + 'in_theaters?' + apiKey
      },
      // 即将上映
      'coming_soon': () => {
        return url + 'coming_soon?' + apiKey
      },
      // Top250
      'top250': () => {
        return url + 'top250?' + apiKey
      },
      // 口碑榜
      'weekly': () => {
        return url + 'weekly?' + apiKey
      },
      // 北美票房榜
      'us_box': () => {
        return url + 'us_box?' + apiKey
      },
      // 新片榜
      'new_movies': () => {
        return url + 'new_movies?' + apiKey
      }
    }
    return actions[action]()
  }
}

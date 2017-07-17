/**
 * Created by hale on 2017/7/3.
 */

export default {
  getUrl: (action) => {
    let url = 'dbApi/'
    let apiKey = '0b2bdeda43b5688921839c8ecb20399b'
    let actions = {
      // 热门城市
      'hotCity': () => {
        return '../../static/hotCity.json'
      },
      // 全国省份
      'province': () => {
        return '../../static/province.json'
      },
      // 省份对应的城市
      'city': () => {
        return '../../static/city.json'
      },
      // 正在热映
      'in_theaters': () => {
        return url + 'in_theaters?client=somemessage&udid=dddddddddddddddddddddd&apikey=' + apiKey
      },
      // 即将上映
      'coming_soon': () => {
        return url + 'coming_soon?apikey=' + apiKey
      },
      // Top250
      'top250': () => {
        return url + 'top250?apikey=' + apiKey
      },
      // 口碑榜
      'weekly': () => {
        return url + 'weekly?apikey=' + apiKey
      },
      // 北美票房榜
      'us_box': () => {
        return url + 'us_box?apikey=' + apiKey
      },
      // 新片榜
      'new_movies': () => {
        return url + 'new_movies?apikey=' + apiKey
      }
    }
    return actions[action]()
  }
}

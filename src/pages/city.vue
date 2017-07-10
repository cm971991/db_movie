<template>
    <div class="city-contain">
        <x-header :left-options="{backText: ''}" @on-click-back="goBack">选择城市</x-header>
        <div class="filter-row">
            <tab :line-width=2 v-model="tabData.index">
                <tab-item class="vux-center" :selected="tabData.currentValue === item"
                          v-for="(item, index) in tabData.list"
                          @click="tabData.currentValue = item" :key="index">{{item}}
                </tab-item>
            </tab>
            <search placeholder="输入城市名称查询" v-model="searchValue" :auto-fixed="false"></search>
        </div>
        <div class="city-row">
            <!-- region 热门城市-->
            <div class="hot-city">
                <div class="title">
                    <label>热门城市</label>
                </div>
                <div class="content">
                    <template v-for="(item,index) in cityData.hotCityList">
                        <div v-if="(index+1)%3!==0" class="city-square">{{item}}</div>
                        <div class="city-square-last" v-else>{{item}}</div>
                    </template>
                </div>
            </div>
            <!--endregion-->

            <!-- region 城市字母排序-->
            <div class="sort-city">
                <template v-if="cityData.letterList.length > 0">
                    <template v-for="(item,index) in cityData.letterList">
                        <div class="title">
                            <label>{{item.letter}}</label>
                        </div>
                        <div class="content">
                            <template v-for="(val,index) in item.data">
                                <div>{{val}}</div>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
            <!--endregion-->
        </div>
    </div>
</template>

<script>
  import { Search, XHeader, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'
  import district from '../assets/json/district'

  export default{
    components: {
      Search, XHeader, Tab, TabItem, Flexbox, FlexboxItem
    },
    data () {
      return {
        searchValue: '',
        tabData: {
          list: ['国内', '海外'],
          currentValue: '国内',
          index: 0
        },
        cityData: {
          hotCityList: ['北京', '上海', '广州', '深圳', '成都', '武汉', '杭州', '重庆', '郑州', '南京', '西安', '苏州', '天津', '长沙', '福州'],
          letterList: []
        }
      }
    },
    mounted: function () {
      this.getCityData()
    },
    methods: {
      getCityData () {
        let map = new this.$utils.Common.Map()
        district.CHINA_PROVINCE_JSON.forEach((item, index) => {
          let letter = this.$utils.PinYin.makePy(item.text)
          map.put(letter[0], item.text)
        })
//        map.keys.sort((a, b) => {
//          debugger
//          a.localeCompare(b)
//        })

        map.each((key, val, index) => {
          let tempObj = {}
          tempObj.letter = key
          tempObj.data = val
          this.cityData.letterList.push(tempObj)
        })
        console.log('letterList:', this.cityData.letterList)
      },
      goBack () {
        this.$router.push('/city')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/city';
</style>

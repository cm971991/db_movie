<template>
    <div class="city-contain">
        <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="goBack">选择城市
        </x-header>
        <!-- region 搜索栏 -->
        <div class="filter-row" :class="{'hide':cityData.cityShow}">
            <tab :line-width=2 v-model="tabData.index">
                <tab-item class="vux-center" :selected="tabData.currentValue === item"
                          v-for="(item, index) in tabData.list"
                          @click="tabData.currentValue = item" :key="index">{{item}}
                </tab-item>
            </tab>
            <search placeholder="输入城市名称查询" v-model="searchValue" :auto-fixed="false"></search>
        </div>
        <!-- endregion -->

        <!-- region 省市列表 -->
        <div class="province-row" :class="{'hide':cityData.cityShow}">
            <!-- region 热门城市-->
            <div class="hot-city">
                <div class="title">
                    <label>热门城市</label>
                </div>
                <div class="content">
                    <template v-if="cityData.hotCityList.length > 0">
                        <template v-for="(item,index) in cityData.hotCityList">
                            <div v-if="(index+1)%3!==0" class="city-square" @click="selectCity(item)">{{item.text}}
                            </div>
                            <div class="city-square-last" @click="selectCity(item)" v-else>{{item.text}}</div>
                        </template>
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
                                <div :class="{'border':item.data.length > 1 }" @click="getCity(val.code)">{{val.text}}
                                </div>
                            </template>
                        </div>
                    </template>
                </template>
            </div>
            <!--endregion-->
        </div>
        <!-- endregion -->

        <!-- region 城市列表 -->
        <div class="city-row" :class="[{'show':cityData.cityShow},{'hide':!cityData.cityShow}]">
            <template v-if="cityData.cityList.length > 0">
                <template v-for="item in cityData.cityList">
                    <div class="title">
                        <label>{{item.letter}}</label>
                    </div>
                    <div class="content">
                        <template v-for="(val,index) in item.data">
                            <div :class="{'border':item.data.length > 1 }" @click="selectCity(val)">{{val.text}}
                            </div>
                        </template>
                    </div>
                </template>
            </template>
        </div>
        <!-- endregion -->
    </div>
</template>

<script>
  import { Search, XHeader, Tab, TabItem, Flexbox, FlexboxItem } from 'vux'

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
          hotCityList: [],
          letterList: [],
          cityList: [],
          cityShow: false
        }
      }
    },
    mounted: function () {
      this.getHotCity()
      this.getProvinceData()
    },
    methods: {
      /**
       * 热门城市
       */
      getHotCity () {
        this.$store.dispatch('hotCity').then((res) => {
          this.cityData.hotCityList = res
        })
      },
      /**
       * 获取全国省市
       */
      getProvinceData () {
        this.$store.dispatch('province').then((res) => {
          this.cityData.letterList = res
        })
      },
      /**
       * 获取省份对应的城市
       * @param code
       */
      getCity (code) {
        this.$store.dispatch('city', {code: code}).then((res) => {
          this.cityData.cityList = res
          this.cityData.cityShow = true
        })
      },
      /**
       * 选择城市
       */
      selectCity (cityObj) {
        this.$store.commit('set_city', cityObj.text)
        this.$router.push('/')
      },
      goBack () {
        if (this.cityData.cityShow) {
          this.cityData.cityShow = false
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/city';
</style>

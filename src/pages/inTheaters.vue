<template>
    <div class="in-theaters-contain">
        <div class="filter-row">
            <div class="filter-city" v-on:click="selectCity()">
                <label class="current-city">{{getCurrentCity}}</label>
            </div>
            <div class="filter-movie">
                <search placeholder="电影 / 电视剧 / 影人" v-model="searchValue"></search>
            </div>
        </div>

        <div class="content-row">
            <tab :line-width=2 :active-color="tabData.activeColor" v-model="tabData.index">
                <tab-item class="vux-center" :selected="tabData.currentValue === item"
                          v-for="(item, index) in tabData.list"
                          @on-item-click="tabItemSelect" :key="index">{{item}}
                </tab-item>
            </tab>
            <swiper v-model="tabData.index" :show-dots="false">
                <swiper-item v-for="(item, index) in tabData.list" :key="index">
                    <!-- region 正在上映 -->
                    <template v-if="index===0">
                        <template v-for="model in inTheatersData">
                            <div>
                                <div class="content-item">
                                    <div class="content-item-img">
                                        <x-img :src="model.images.small" :offset="10" container=".vux-swiper"></x-img>
                                    </div>
                                    <div class="content-item-desc">
                                        <strong class="title">{{model.title}}</strong>
                                        <template v-if="model.rating.stars>0">
                                            <rater v-model="model.rating.stars" slot="value" active-color="#FBAF26"
                                                   :font-size="14"
                                                   disabled></rater>
                                            <span class="grade">{{model.rating.average}}</span>
                                        </template>
                                        <template v-else>
                                            <div class="no-stars">暂无评分</div>
                                        </template>
                                        <span class="director">导演 : {{model.directors[0].name}}</span>
                                        <span class="casts">主演 :
                                                        <template v-for="(cast,index) in model.casts">
                                                            <span v-if="index<model.casts.length-1">
                                                                 {{cast.name}} /
                                                            </span>
                                                            <span v-else>
                                                                 {{cast.name}}
                                                            </span>
                                                        </template>
                                    </span>
                                        <span class="collect-count">{{model.collect_count}}人看过</span>
                                    </div>
                                    <div class="content-item-btn">
                                        <x-button class="buy-ticket" mini plain type="primary">购票</x-button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                    <!-- endregion -->
                    <template v-else>
                        <h1>111</h1>
                    </template>
                    <!-- region 即将上映 -->
                    <!-- endregion -->
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>
  import { Search, XButton, XImg, Rater, Tab, TabItem, Flexbox, FlexboxItem, Swiper, SwiperItem } from 'vux'

  export default{
    components: {
      Search, XButton, XImg, Rater, Tab, TabItem, Flexbox, FlexboxItem, Swiper, SwiperItem
    },
    data () {
      return {
        icon: '&#xe600;',
        searchValue: '',
        tabData: {
          list: ['正在上映', '即将上映'],
          activeColor: '#000000',
          currentValue: '正在上映',
          index: 0
        },
        inTheatersData: []
      }
    },
    computed: {
      getCurrentCity () {
        return this.$store.getters.city
      }
    },
    mounted: function () {
      this.getInTheaters()
    },
    methods: {
      /**
       * tab切换
       * @param index
       */
      tabItemSelect (index) {
        console.log('index', index)
      },
      /**
       * 获取正在热映数据
       */
      getInTheaters () {
        this.$store.dispatch('inTheaters', {city: this.$store.getters.city}).then((res) => {
          console.log('res:', res)
          this.inTheatersData = res
        })
      },
      /**
       * 选择城市
       */
      selectCity () {
        this.$router.push({path: '/city'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/inTheaters';
</style>

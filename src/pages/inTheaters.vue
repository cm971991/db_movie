<template>
    <div class="in-theaters-contain">
        <div class="filter-row">
            <div class="filter-city">
                <label class="current-city">南京</label>
            </div>
            <div class="filter-movie">
                <search placeholder="电影 / 电视剧 / 影人"
                        v-model="searchValue"
                ></search>
            </div>
        </div>

        <div class="content-row">
            <tab :line-width=2 :active-color="tabData.activeColor" v-model="tabData.index">
                <tab-item class="vux-center" :selected="tabData.currentValue === item"
                          v-for="(item, index) in tabData.list"
                          @click="tabData.currentValue = item" :key="index">{{item}}
                </tab-item>
            </tab>
            <swiper v-model="tabData.index" height="100px" :show-dots="false">
                <swiper-item v-for="(item, index) in tabData.list" :key="index">
                    <div class="tab-swiper vux-center">{{item}} Container</div>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>
  import { Search, Tab, TabItem, Flexbox, FlexboxItem, Swiper, SwiperItem } from 'vux'

  export default{
    components: {
      Search, Tab, TabItem, Flexbox, FlexboxItem, Swiper, SwiperItem
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
    mounted: function () {
      this.getinTheaters()
    },
    ready: function () {},
    methods: {
      getinTheaters () {
        this.$store.dispatch('inTheaters').then((res) => {
          console.log('res:', res)
          this.inTheatersData = res
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    .in-theaters-contain {
        background-color: #fff;

        .filter-row {
            height: 30px;
            padding: 8px 10px;
            .filter-city {
                width: 54px;
                float: left;
                .current-city {
                    font-size: 14px;
                    color: #000;
                    &:after {
                        content: '';
                        font-family: 'iconfont', serif;
                        font-size: 14px;
                        padding-left: 2px;
                        color: #000000;
                    }
                }
            }

            .filter-movie {
                width: calc(~"100% - 54px");
                float: left;
                .weui-search-bar {
                    padding: 0 10px;
                    border-radius: 4px;
                    &:before {
                        border-top: none;
                    }
                    &:after {
                        border-bottom: none;
                    }
                    .weui-search-bar__label {
                        background-color: #EFEFF4;
                    }
                }
            }
        }

        .content-row {
            height: calc(~"100% - 46px");
            .vux-tab .vux-tab-item {
                color: #888;
                font-weight: 400;
            }
            .vux-swiper-item {
                padding: 15px 10px;
            }
        }
    }


</style>

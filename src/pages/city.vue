<template>
    <div class="city-contain">
        <x-header :left-options="{backText: ''}">选择城市</x-header>
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

        </div>
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
        }
      }
    },
    ready: function () {},
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/city';
</style>

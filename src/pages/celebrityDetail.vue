<template>
    <div class="celebrityDetail-contain">
        <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="goBack">影人</x-header>
        <div class="img-row">
            <!--<template v-for="(item , index ) in detailData.photos">-->
                <!--<template v-if="detailData.photos.length >= 1">-->
                    <!--<x-img :src="item.image" container=".celebrityDetail-contain"></x-img>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <!--<x-img :src="item.image" container=".celebrityDetail-contain"></x-img>-->
                <!--</template>-->
            <!--</template>-->

        </div>
    </div>
</template>

<script>
  import { XHeader } from 'vux'
  import XImg from '../../node_modules/vux/src/components/x-img/index.vue'

  export default {
    components: {
      XImg,
      XHeader
    },
    data () {
      return {
        detailData: []
      }
    },
    mounted: function () {
      console.log('this.$route.query.cid:', this.$route.query.cid)
      this.celebrityDetail(this.$route.query.cid)
    },
    methods: {
      /**
       * 获取影人详情
       * @param cid 影人ID
       */
      celebrityDetail (cid) {
        this.$store.dispatch('celebrityDetail', {cid: cid}).then(res => {
          console.log('getActorDetail:', res)
          let $imgRow = document.querySelector('.img-row')
          let list = res.photos
          for (let i = 0; i < list.length; i++) {
            let img = document.createElement('img')
            img.src = list[i].image
            $imgRow.appendChild(img)
          }
//          this.detailData = res
        })
      },
      /**
       * 返回电影详情页
       */
      goBack () {
        this.$router.push({path: '/movieDetail'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/styles/pages/celebrityDetail";
</style>

<template>
    <div class="movieDetail-contain">
        <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="goBack">电影</x-header>
        <div class="img-row">
            <template v-if="detailData.images">
                <x-img :src="detailData.images.large" :offset="10" container=".vux-swiper"></x-img>
            </template>
        </div>
    </div>
</template>

<script>
  import { XHeader, XImg } from 'vux'

  export default {
    components: {XHeader, XImg},
    data () {
      return {
        detailData: {}
      }
    },
    mounted: function () {
      this.movieDetail(this.$route.query.mid)
    },
    methods: {
      movieDetail (mid) {
        this.$store.dispatch('movieDetail', {mid: mid}).then((res) => {
          console.log('res: ' + res)
          this.detailData = res
        })
      },
      goBack () {
        this.$router.push({path: '/inTheaters'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/movieDetail';
</style>

<template>
    <div class="city-contain">
        <flexbox :gutter="0">
            <flexbox-item :span="1/3"></flexbox-item>
        </flexbox>
    </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux/src/components'

  export default{
    components: {
      Flexbox, FlexboxItem
    },
    data () {
      return {}
    },
    ready: function () {

    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/inTheaters';
</style>

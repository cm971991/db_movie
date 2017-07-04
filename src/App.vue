<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import "./assets/styles/global/constom";
    @import "./assets/styles/global/common";
    @import "./assets/styles/global/icon.css";

    #app{
        height:100%;
    }
</style>

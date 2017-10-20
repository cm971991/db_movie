<template>
    <div class="MyContain">
        <popup-picker :title="title" :data="list" v-model="currValue" @on-change="onChange"></popup-picker>
    </div>
</template>

<script>
  import { PopupPicker } from 'vux'

  export default {
    components: {
      PopupPicker
    },
    data () {
      return {
        title: '手机机型',
        list: [['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']],
        currValue: ['iPhone1']
      }
    },
    methods: {
      onChange (val) {
        console.log('val:', val)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .MyContain {
        background-color: #fff;
    }
</style>

<template>
    <div class="MyContain">
        <indexList :showIndicator="true" :sections="sections"></indexList>
    </div>
</template>

<script>
  import indexList from '../components/indexList.vue'
  
  export default{
    components: {indexList},
    data () {
      return {
        sections: [{'letter': 'A', 'data': ['Aaron', 'Alden', 'Austin', 'Ah']},
          {'letter': 'B', 'data': ['Baron', 'Boy', 'Blue']},
          {'letter': 'F', 'data': ['Friend', 'Fir', 'Fade']},
          {'letter': 'G', 'data': ['Gay']},
          {'letter': 'H', 'data': ['High', 'Happy']},
          {'letter': 'J', 'data': ['Jack', 'Jim', 'John']},
          {'letter': 'P', 'data': ['Pig', 'Party', 'Perfact', 'Pc', 'Parent']},
          {'letter': 'Z', 'data': ['Zack', 'Zane', 'Zero']}]
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .MyContain {
        background-color: #fff;
    }
</style>

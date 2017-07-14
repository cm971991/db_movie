<template>
    <div class="indexList">
        <ul class="indexList-content" :style="{ 'height':currentHeight ? currentHeight + 'px' : '100%' }">
            <li class="indexSection" v-for="section in sections">
                <p class="indexSection-index" :data-letter="section.letter">{{ section.letter }}</p>
                <ul>
                    <li class="indexSection" v-for="(item, index) in section.data" :key="index">
                        <p :class="{'border': (section.data.length > 1 && index !== section.data.length - 1) }"
                           class="indexSection-index-item">{{item}}</p>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="indexList-nav" @touchstart="handleTouchStart">
            <ul class="indexList-navList">
                <li class="indexList-navItem" v-for="section in sections">{{section.letter}}</li>
            </ul>
        </div>

        <div class="indexList-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
    </div>
</template>

<script>
  export default {
    props: {
      height: Number,
      sections: [Array],
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        indicatorTime: null,
        moving: false,
        firstSection: null,
        currentIndicator: '',
        currentHeight: this.height,
        navOffsetX: 0
      }
    },
    watch: {
      sections () {
        this.init()
      },
      height (val) {
        if (val) {
          this.currentHeight = val
        }
      }
    },
    methods: {
      init () {
        let listItems = this.$el.getElementsByTagName('li')
        if (listItems.length > 0) {
          this.firstSection = listItems[0]
        }
      },
      handleTouchStart (e) {
        if (e.target.tagName !== 'LI') {
          return
        }
        this.navOffsetX = e.changedTouches[0].clientX
        this.scrollList(e.changedTouches[0].clientY)
        if (this.indicatorTime) {
          clearTimeout(this.indicatorTime)
        }
        this.moving = true
        window.addEventListener('touchmove', this.handleTouchMove)
        window.addEventListener('touchend', this.handleTouchEnd)
      },
      handleTouchMove (e) {
        e.preventDefault()
        this.scrollList(e.changedTouches[0].clientY)
      },
      handleTouchEnd () {
        this.indicatorTime = setTimeout(() => {
          this.moving = false
          this.currentIndicator = ''
        }, 500)
        window.removeEventListener('touchmove', this.handleTouchMove)
        window.removeEventListener('touchend', this.handleTouchEnd)
      },
      scrollList (y) {
        let currentItem = document.elementFromPoint(this.navOffsetX, y)
        if (!currentItem || !currentItem.classList.contains('indexList-navItem')) {
          return
        }
        this.currentIndicator = currentItem.innerText
        let targets = this.sections.filter(section => section.letter === currentItem.innerText)
        let targetDOM
        if (targets.length > 0) {
          targetDOM = document.querySelector("[data-letter='" + targets[0].letter + "']")
          document.querySelector('.indexList-content').scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top
        }
      }
    },
    mounted () {
      if (!this.currentHeight) {
        debugger
        this.currentHeight = document.documentElement.clientHeight - document.querySelector('.indexList-content').getBoundingClientRect().top
      }
      this.init()
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
    .indexList {
        width: 100%;
        position: relative;
        overflow: hidden;
        .indexList-content {
            margin: 0;
            padding: 0;
            overflow: auto;
            .indexSection {
                padding: 0;
                margin: 0;
                .indexSection-index {
                    margin: 0;
                    padding: 7px 10px;
                    background-color: #fafafa;
                    font-size: 13px;
                    font-weight: 400;
                    color: #999;
                    & + ul {
                        padding: 0;
                    }
                }
                .indexSection-index-item {
                    margin: 0;
                    padding: 7px 10px;
                    background-color: #fff;
                    font-size: 14px;
                    font-weight: 400;
                    color: #666;
                }
                .border {
                    border-bottom: 1px solid #eee;
                }
            }
        }
        .indexList-nav {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 2px;
            margin: 0;
            color: #999;
            text-align: center;
            max-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .indexList-navList {
            padding: 0;
            margin: 0;
            list-style: none;
            max-height: 100%;
            display: flex;
            flex-direction: column;
        }
        .indexList-navItem {
            padding: 2px 6px;
            font-size: 12px;
            user-select: none;
            -webkit-touch-callout: none;
        }
        .indexList-indicator {
            position: absolute;
            width: 50px;
            height: 50px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            line-height: 50px;
            background-color: rgba(0, 0, 0, .7);
            border-radius: 5px;
            color: #fff;
            font-size: 22px;
        }
    }
</style>

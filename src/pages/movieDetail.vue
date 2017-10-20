<template>
    <div class="movieDetail-contain">
        <x-header :left-options="{backText: '', preventGoBack:true}" @on-click-back="goBack">电影</x-header>
        <template v-if="show">
            <!-- region 电影图片 -->
            <div class="img-row">
                <x-img :src="detailData.images.large" container=".movieDetail-contain"></x-img>
            </div>
            <!-- endregion 电影图片 -->

            <!-- region 简介 -->
            <div class="introduction-row">
                <!-- region 标题 -->
                <div class="name-item">
                    <div class="name">
                        <div class="large-font title">{{ detailData.title }}</div>
                        <div class="small-font">{{ detailData.year }} /
                            <template v-for="(genre,index) in detailData.genres">
                                                            <span v-if="index < detailData.genres.length - 1">
                                                                 {{ genre }} /
                                                            </span>
                                <span v-else>
                                                                 {{ genre }}
                                                            </span>
                            </template>
                        </div>
                        <div class="small-font">上映时间 :
                            <template v-for="pubdate in detailData.pubdates">
                             <span v-if="pubdate.includes('大陆')">
                                 {{ pubdate }}
                             </span>
                            </template>
                        </div>
                        <div class="small-font">片长 : {{ detailData.durations[0] }}</div>
                    </div>
                    <div class="grade">
                        <div class="small-font">豆瓣评分</div>
                        <template v-if="detailData.rating.stars > 0">
                            <div class="large-font number">{{ detailData.rating.average }}</div>
                        </template>
                        <rater v-model="detailData.rating.stars" active-color="#FBAF26"
                               :font-size="14"
                               disabled></rater>
                        <template v-if="detailData.rating.stars > 0">
                            <div class="small-font">{{ detailData.collect_count }}人</div>
                        </template>
                        <template v-else>
                            <div class="no-stars">暂无评分</div>
                        </template>
                    </div>
                    <div class="watch">
                        <button class="button want-see">想看</button>
                        <button class="button seen">看过
                            <span class="icon-xing" v-html="icon" v-for="n in 5"></span>
                        </button>
                    </div>
                </div>
                <!-- endregion 标题 -->

                <!-- region 简介 -->
                <div class="introduction-item">
                    <div class="title">简介</div>
                    <div class="summary">
                        <template v-if="unfold">
                            {{ detailData.summary.substring(0, 89) }}...
                            <span class="unfold" @click="unfoldIntroduction()">展开</span>
                        </template>
                        <template v-else>
                            {{ detailData.summary }}
                        </template>
                    </div>
                </div>
                <!-- endregion 简介 -->

                <!-- region 影人 -->
                <div class="actors-item">
                    <div class="title">影人</div>
                    <div class="actors">
                        <div class="actor-item" @click="getActorDetail(detailData.directors[0].id)">
                            <x-img :src="detailData.directors[0].avatars.small"
                                   container=".movieDetail-contain"></x-img>
                            <div class="name"><span>{{ detailData.directors[0].name }}</span></div>
                        </div>
                        <template v-for="(item , index) in detailData.casts">
                            <div class="actor-item" :class="{'actor-item-last':index === detailData.casts.length - 1}"
                                 @click="getActorDetail(item.id)">
                                <x-img :src="item.avatars.small"
                                       container=".movieDetail-contain"></x-img>
                                <div class="name"><span>{{ item.name }}</span></div>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- endregion 影人 -->

                <!-- region 预告片（接口 没有权限 无法显示） -->
                <!--<div class="previews-item">-->
                <!--<div class="title">预告片</div>-->
                <!--<div class="preview">-->
                <!--<div class="preview-item">-->
                <!--<video :src="detailData.trailers[0].resource_url"></video>-->
                <!--</div>-->
                <!--<template v-for="(item , index) in detailData.photos">-->
                <!--<div class="preview-item"-->
                <!--:class="{'preview-item-last':index === detailData.photos.length - 1}">-->
                <!--<img :src="item.thumb"/>-->
                <!--</div>-->
                <!--</template>-->
                <!--</div>-->
                <!--</div>-->
                <!-- endregion 预告片（没有权限 无法显示） -->
            </div>
            <!-- endregion 简介 -->

            <!-- region 评论/讨论区 -->
            <div class="comment-row">
                <tab :line-width=2 :active-color="tabData.activeColor" v-model="tabData.index">
                    <tab-item class="vux-center" :selected="tabData.currentValue === item"
                              v-for="(item, index) in tabData.list"
                              @on-item-click="tabItemSelect" :key="index">{{item}}
                    </tab-item>
                </tab>
                <!-- region 短评 -->
                <div class="short-comment">
                    <div class="title">
                        <span>短评</span>
                        <button>写短评</button>
                    </div>
                    <template v-for="comment in detailData.popular_comments">
                        <div class="short-comment-item">
                            <img class="user-img" :src="comment.author.avatar"/>
                            <div class="short-comment-right">
                                <div class="grade">
                                    <span class="username">{{ comment.author.name }}</span>
                                    <rater v-model="comment.rating.value" active-color="#FBAF26"
                                           :font-size="14"
                                           disabled></rater>
                                    <span class="useful_count">{{ comment.useful_count }}</span>
                                </div>
                                <div class="content">{{ comment.content }}</div>
                                <div class="date">{{ comment.created_at.split(' ')[0] }}</div>
                            </div>
                        </div>
                    </template>
                    <div class="all-comment">
                        <span>全部短评{{ detailData.comments_count }}个</span>
                    </div>
                    <div class="line"></div>
                </div>
                <!-- endregion 短评 -->

                <!-- region 影评 -->
                <div class="movie-comment">
                    <div class="title">
                        <span>影评</span>
                        <button>写影评</button>
                    </div>
                    <template v-for="(comment , index) in detailData.popular_reviews">
                        <template v-if="index <= 4">
                            <div class="movie-comment-item">
                                <img class="user-img" :src="comment.author.avatar"/>
                                <div class="movie-comment-right">
                                    <div class="grade">
                                        <span class="username">{{ comment.author.name }}</span>
                                        <rater v-model="comment.rating.value" active-color="#FBAF26"
                                               :font-size="14"
                                               disabled></rater>
                                    </div>
                                    <div class="content">{{ comment.summary }}</div>
                                </div>
                            </div>
                        </template>
                    </template>
                    <div class="all-comment">
                        <span>全部影评{{ detailData.reviews_count }}个</span>
                    </div>
                    <div class="line"></div>
                </div>
                <!-- endregion 影评 -->

            </div>
            <!-- endregion 评论/讨论区 -->

            <!-- region 智能推荐喜欢的电影 -->
            <div class="intelligent-row">
                <div class="title">喜欢这部影视的也喜欢</div>
                <div class="intelligent">
                    <template v-for="item in intelligentData">
                        <div class="movie-item">
                            <img :src="item.images.small">
                            <div class="name">{{ item.title }}</div>
                            <div class="grade">{{ item.rating.average }}分</div>
                        </div>
                    </template>
                </div>
            </div>
            <!-- endregion 智能推荐喜欢的电影 -->
        </template>
    </div>
</template>

<script>
  import { XHeader, XImg, Tab, TabItem, Rater } from 'vux'

  export default {
    components: {XHeader, XImg, Tab, TabItem, Rater},
    data () {
      return {
        icon: '&#xe742;',
        show: false,
        tabData: {
          list: ['评论', '讨论区'],
          activeColor: '#878787',
          currentValue: '评论',
          index: 0
        },
        detailData: {},
        intelligentData: {},
        unfold: false
      }
    },
    mounted: function () {
      this.movieDetail(this.$route.query.mid)
    },
    methods: {
      /**
       * tab切换
       * @param index
       */
      tabItemSelect (index) {},
      /**
       * 获取电影详情
       * @param mid 电影ID
       */
      movieDetail (mid) {
        this.$store.dispatch('movieDetail', {mid: mid}).then((res) => {
          this.detailData = res
          if (this.detailData.summary.length > 90) {
            this.unfold = true
          }
          this.getIntelligent(this.detailData.tags)
        })
      },
      unfoldIntroduction () {
        this.unfold = false
      },
      /**
       * 获取影人详情
       * @param actorId 影人ID
       */
      getActorDetail (actorId) {
        console.log('actorId:', actorId)
        this.$router.push({path: '/celebrity', query: {cid: actorId}})
      },
      /**
       * 电影详情中的智能推荐
       * @param tags 标签数组
       */
      getIntelligent (tags) {
        this.$store.dispatch('search', {q: '', tag: tags[0]}).then(res => {
          this.intelligentData = res
          this.show = true
        })
      },
      /**
       * 返回首页
       */
      goBack () {
        this.$router.push({path: '/inTheaters'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import '../assets/styles/pages/movieDetail';
</style>

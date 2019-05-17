<template>
<div>
  <div class="home">
    <div class="swiper-container banner">
      <ul class="swiper-wrapper banner_list">
        <li class="swiper-slide" v-for="(v,i) in banner" :key="i" v-if="4>i">
          <a href>
            <img :src="v.imageUrl" alt>
          </a>
        </li>
      </ul>
      <div class="swiper-pagination"></div>
    </div>
    <div class="home_main">
      <div class="home_station">
        <h3>电台</h3>
        <ul class="station_list home_list clearfix">
          <li v-for="(v,i) in station" :key="i" >
            <a href="#" v-if="2>i">
              <div class="img_box">
                <img :src="v.picUrl" alt>
                <i class="icon_b"></i>
              </div>
              <div class="station_name">
                <p>{{v.name}}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="home_hot">
        <h3>热门歌单</h3>
        <ul class="hot_list home_list clearfix">
          <li v-for="(v,i) in hot" :key="i" >
            <a href="#" v-if="4>i">
              <div class="img_box">
                <img :src="v.picUrl" alt>
                <i class="icon_t">{{v.playCount}}</i>
                <i class="icon_b"></i>
              </div>
              <div class="hot_name">
                <h4>{{v.tit}}</h4>
                <p>{{v.name}}</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="home_footer">
        <div class="home_footer_web">
          <a href>查看电脑版网页</a>
        </div>
        <div class="home_footer_img">
          <img :src="img" alt>
        </div>
        <div class="home_footer_txt">
          <p>Copyright © 1998 - 2019 Tencent. All Rights Reserved.</p>
          <p>联系电话：0755-86013388 QQ群：55209235</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<style scoped>

@import "../../../node_modules/swiper/dist/css/swiper.min";
.top_box,.nav{
  display:block;
}
</style>
<script>
import url from '../../common/index'
import "../../../node_modules/swiper/dist/js/swiper.min";
import Swiper from "swiper";
export default {
  data() {
    return {
      img: require("../../../src/assets/images/logo_ch.svg"),
      banner: "",
      station: "",
      hot: ""
    };
  },
  methods: {
    mySwiper() {
      var swiper = new Swiper(".swiper-container", {
        loop: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: ".swiper-pagination"
        }
      });
    }
  },
  mounted() {
    //调取banner接口
    this.$http({
      url: url.banner,
      params: {}
    }).then(res => {
      if (res.status == 200) {
        this.banner = res.data.banners;
        //重新更新dom 重新渲染轮播
        this.$nextTick(() => {
          //延迟加载异步 加载UI的下一帧
          this.mySwiper();
        });
      } else {
        alert("接口调取失败");
      }
    });
    //调取推荐电台接口
    this.$http({
      url: url.djprogram
    }).then(res => {
      if (res.status == 200) {
        this.station = res.data.result;
      } else {
        alert("接口调取失败");
      }
    });
    //调取热门歌单接口
    this.$http({
      url: url.hotList
    }).then(res => {
      if (res.status == 200) {
        this.hot = res.data.result;
      } else {
        alert("接口调取失败");
      }
    });
  }
};
</script>


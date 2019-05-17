<template>
    <div>
      <div class="top_box">
        <div class="top">
          <img :src="img" alt="qq音乐" class="logo">
          <a href class="loadapp">下载APP</a>
        </div>
      </div>
      <div class="nav">
        <ul class="clearfix">
          <li class="active">
            <router-link to="Home">推荐</router-link>
          </li>
          <li>
            <router-link to="Wank">排行榜</router-link>
          </li>
          <li>
            <router-link to="Search">搜索</router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
      <div class="bottom">
        <a href="#">安装QQ音乐 发现更多精彩</a>
      </div>
    </div>
</template>
<script>
import "../../assets/js/remScale";
import "../../assets/js/js";
export default {
  name: "App",
  data() {
    return {
      img: require("../../assets/images/logo_ch.svg")
    };
  }
};
</script>
<style>
@import "../../assets/css/reset";
@import "../../assets/css/public";
</style>
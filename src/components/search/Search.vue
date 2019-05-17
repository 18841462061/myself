<template>
<div>
  <div class="search_main">
    <div class="search_box clearfix">
      <div class="search_input">
        <input
          type="text"
          v-model="txt"
          placeholder="搜索歌曲、歌单、专辑"
          @keydown.enter="musicInfo(txt)"
          @click="search()"
          class="search"
        >
        <span class="del" v-show="del" @click="clear()"></span>
      </div>
      <div class="cancle" v-show="state" @click="cancle()">取消</div>
    </div>
    <div class="hot_search" v-show="!state">
      <h3>热门搜索</h3>
      <a
        @click="musicInfo(v.first)"
        href="#"
        v-for="(v,i) in hot"
        :key="i"
        :class="[i==0?'active':'']"
      >{{v.first}}</a>
    </div>
    <div v-show="state">
      <audio v-if="url" :src="url" controls autoplay></audio>
      <ul>
        <li @click="getUrl(i.id)" v-for="(i,index) in songsList" :key="index">{{i.name}}</li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import url from '../../common/index'
export default {
  data() {
    return {
      txt: "",
      state: false,
      del: false,
      hot: "",
      songsList: "",
      url: "",
    };
  },
  mounted() {
    //用户一进入搜索页面 就显示热搜
    this.$http({
      url: url.hot
    }).then(res => {
      console.log(res, 444);
      if (res.status == 200) {
        this.hot = res.data.result.hots;
      }
    });
  },
  methods: {
    search() {
      this.state = true;
    },
    cancle() {
      this.state = false;
      this.txt = "";
      this.url = "";
    },
    clear() {
      this.txt = "";
      this.state = false;
      this.del = false;
    },
    //点击热搜 获取歌曲详情 实际上调取的是搜索接口
    musicInfo(keyWord) {
      this.txt = keyWord;
      this.state = true;
      this.$http({
        url: url.search,
        params: {
          keywords: keyWord
        }
      }).then(res => {
        console.log(res, 5555);
        if (res.status == 200) {
          this.songsList = res.data.result.songs;
        }
      });
    },
    //点击歌曲名称 获取相关歌曲url
    getUrl(id) {
      this.$http({
        url: url.song,
        params: {
          id: id
        }
      }).then(res => {
        console.log(res, 666);
        if (res.status == 200) {
          this.url = res.data.data[0].url;
        }
      });
    }
  },
  watch: {
    txt(d) {
      if (d.length > 0) {
        this.del = true;
      }
    }
  }
};
</script>

<style lang="" scoped>

</style>
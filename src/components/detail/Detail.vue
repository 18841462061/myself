<template>
  <div id="deail">
    <div>
      <div class="deailtop">
        <div class="deaillogo">
          <img :src="img">
          <div class="deaillogop">
            <p>QQ音乐</p>
            <p>打开App收藏、下载</p>
          </div>
          <a href="#" class="deaila">打开</a>
        </div>
        <div class="deailpic">
          <img :src="titleList[$route.query.index].coverImgUrl" alt>
          <h4>{{titleList[$route.query.index].name}}</h4>-->
          <p>创建时间：{{new Date(titleList[$route.query.index].createTime).toLocaleString()}}</p>
          <p>{{titleList[$route.query.index].description}}</p>
        </div>
        <div class="deailopen" @click="getshow()" v-if="flag==true">
          <span></span>播放全部
        </div>
        <div class="deailmusic" v-if="flag==false">
          <audio :src="song" controls autoplay></audio>
        </div>
      </div>
    </div>
    <p class="deailtitle">排行榜 共100首</p>
    <div class="deaillist">
      <ul>
        <li v-for="(v,index) in list" :key="index" @click="getshow(index), getmusic(index)">
          <div class="deailhao">
            <p>{{index+1}}</p>
            <i></i>
          </div>
          <div class="deailname">
            <h3>{{v.name}}</h3>
            <p>{{v.ar[0].name}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import url from "../../common/index";
export default {
  data() {
    return {
      img: require("../../assets/images/logo.svg"),
      list: [],
      titleList: "",
      pic: require("../../assets/images/wank_dianyin.jpg"),
      flag: true,
      urlmusic: "",
      song: ""
    };
  },
  mounted() {
    this.$http({
      url: url.list
    }).then(res => {
      if (res.status == 200) {
        this.titleList = res.data.list;
      }
    });

    this.$http({
      url: "http://127.0.0.1:3000/playlist/detail",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      if (res.status == 200) {
        this.list = res.data.playlist.tracks;
      } else {
        alert("接口调取失败");
      }
    });
  },
  methods: {
    getshow(index) {
      this.flag = !this.flag;
      this.urlmusic = this.list[index].id;
      this.$http({
        url: "http://127.0.0.1:3000/song/url",
        params: {
          id: this.urlmusic
        }
      }).then(res => {
        if (res.status == 200) {
          this.song = res.data.data[0].url;
        } else {
          alert("接口调取失败");
        }
      });
    },
    getmusic(index) {
      this.urlmusic = this.list[index].id;
      this.$router.push({
        path: "/movie",
        query: {
       id:this.urlmusic
        }
      });
    }
  }
};
</script>
<style lang="">
.deailtop {
  width: 100%;
  height: 2.74rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  -webkit-box-orient: vertical;

  background-color: rgba(0, 0, 0, 0.5);
}
.deaillogo {
  box-sizing: border-box;
  width: 100%;
  height: 0.48rem;
  float: left;
  -webkit-box-align: center;
  padding: 0 0.16rem 0 0.14rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
.deaillogo img {
  float: left;
  width: 0.36rem;
  height: 0.36rem;
  margin-right: 3px;
  margin-top: 0.06rem;
}
.deaillogop {
  float: left;
}
.deaillogop p {
  line-height: 1.3;
  font-size: 0.14rem;
  height: 0.18rem;
  margin-top: 0.03rem;
}
.deaila {
  float: right;
  position: relative;
  display: block;
  height: 0.24rem;
  padding: 0 0.12rem;
  line-height: 0.24rem;
  font-size: 0.15rem;
  color: #fff;
  border-style: solid;
  border-color: currentColor;
  border-width: 0.01rem;
  border-radius: 9.99rem;
  margin-top: 0.11rem;
}
.deailpic {
  position: absolute;
  top: 0.48rem;
  box-sizing: border-box;
  margin-top: 0.17rem;
  padding: 0 0.16rem;
  width: 100%;
  overflow: hidden;
  color: #fff;
}
.deailpic img {
  z-index: 2;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.1rem;
  object-fit: cover;
  float: left;
}
.deailpic h4 {
  margin-top: 0.25rem;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 0.47rem;
  line-height: 1.3;
  overflow: hidden;
  font-size: 0.18rem;
}
.deailpic p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  max-height: 0.36rem;
  overflow: hidden;
  margin-top: 0.08rem;
}
.deailopen {
  position: absolute;
  top: 2.12rem;
  left: 25%;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  min-width: 130px;
  padding: 0 20px;
  height: 40px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 20px;
  background: #31c27c;
}
.deailopen span {
  content: "";
  display: block;
  height: 0;
  width: 0;
  margin-right: -0.03rem;
  border-color: transparent transparent transparent #fff;
  border-width: 0.07rem 0.11rem;
  border-style: solid;
  border-radius: 0.02rem;
}
.deailmusic {
  position: absolute;
  top: 2.12rem;
  left: 10%;
}
.deailtitle {
  position: absolute;
  top: 2.74rem;
  display: -webkit-box;
  -webkit-box-align: center;
  height: 0.54rem;
  margin: 0 0.16rem;
  font-size: 0.14rem;
  color: #777;
}
.deailtitles {
  position: absolute;
  top: 2.74rem;
  left: 2rem;
  display: -webkit-box;
  -webkit-box-align: center;
  height: 0.54rem;
  margin: 0 0.16rem;
  font-size: 0.14rem;
  color: #777;
}
.deaillist ul {
  position: absolute;
  top: 3.28rem;
}
.deaillist li {
  height: 0.62rem;
}
.deailhao {
  float: left;
  width: 0.45rem;
  height: 0.62rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  color: red;
  font-size: 0.16rem;
}
.deailhao i {
  background: url("../../assets/images/jiantou.png") no-repeat bottom left;
  background-size: 0.17rem;
  width: 0.16rem;
  height: 0.16rem;
  display: block;
}
.deailname {
  position: relative;
  padding: 0.1rem 0.16rem 0.1rem 0;
  overflow: hidden;
  font-size: 16px;
  color: #000;
}
.deailname p {
  color: #777;
}
</style>
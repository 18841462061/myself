<template>
  <div>
    <div class="lyric_wrap">
      <img :src="songs[0].al.picUrl" alt class="wrap_img">
      <div class="lyric_bg">
        <div class="lyric_bg_pan">
          <div class="lyric_img">
            <img :src="songs[0].al.picUrl" alt class="wrap_img_lyric">
          </div>
          <span class="play_btn" @click="getUrl()">
            <img src="../../assets/images/open.png" alt>
          </span>
          <div class="lyric_text">
            <h2 class="lyric_name">
              <span>{{songs[0].name}}</span>
              <b>-{{songs[0].ar[0].name}}</b>
            </h2>
            <ul class="lyric_content" >
              <li v-for="(v,i) in lyrics" :key="i">{{lyrics}}</li>
            </ul>
          </div>
          <audio v-if="url" class="audio_wrap" :src="url" controls autoplay></audio>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import url from "../../common/index";
export default {
  data() {
    return {
      lyrics: "",
      songs: "",
      url: "",
      x:[]
    };
  },
  mounted() {
    this.$http({
      url: "http://localhost:3000/song/detail",
      params: {
        ids: this.$route.query.id
      }
    }).then(res => {
        
      if (res.status == 200) {
        this.songs = res.data.songs;
      }
    });
    this.$http({
      url: "http://localhost:3000/lyric",
      params: {
        id: this.$route.query.id
      }
    }).then(res => {
      if (res.status == 200) {
        this.lyrics = res.data.lrc.lyric;
        this.x =this.lyrics.split(" ");
        console.log(this.x)
      }
    });
  },
  methods: {
    getUrl() {
      this.$http({
        url: "http://127.0.0.1:3000/song/url",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        if (res.status == 200) {
          this.url = res.data.data[0].url;
        }
        
      });
    }
  }
  
  
};

</script>
<style lang="" scoped>
.lyric_wrap{
    width: 4.14rem;
    height: 7.36rem;
    transform: scale(1.5);
    transform-origin: center top;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    transition: opacity .3s linear;
}
.wrap_img{
    position: fixed;
    z-index: -1;
 
    height: 7.36rem;
    left: -1.6rem;
}

.lyric_wrap:after {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0,0,0,.5);
}
.lyric_bg{
    width: 3.42rem;
    height: 3.42rem;
    margin: 0 .36rem;
}
.lyric_bg:after {
    content: " ";
    position: absolute;
    top: 0rem;
    left: 2rem;
    
    width: .84rem;
    height: 1.22rem;
    background: url(//s3.music.126.net/m/s/img/needle.png?702cf6d…) no-repeat;
    background-size: contain;
    z-index: 7;
}
.lyric_bg_pan{
    width: 3.42rem;
    height: 3.42rem;
}
.lyric_bg_pan:before {
    content: " ";
    position: absolute;
    left: 1.2rem;
    right: 0;
    top: .7rem;
    bottom: 0;
    z-index: 2;
    background: url(//s3.music.126.net/m/s/img/disc.png?d3bdd10…) no-repeat;
    background-size: auto 27%;
}
.lyric_img{
    width: 2.12rem;
    height: 2.12rem;
  
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 1.03rem;
    right: 0;
    top: 0.51rem;
    bottom: 0;
   
    background-size: contain;
}
.wrap_img_lyric{
  
    z-index: 1;
    width: 1.1rem;
    height: 1.1rem;
    position: absolute;
    left: .4rem;
    right: 0;
    top: 0.42rem;
    bottom: 0;
    border-radius: 50%;
    opacity: 0.8;
}
.play_btn{
    display: inline-block;
}
.play_btn img{
    position: absolute;
    z-index: 5;
    width: 0.55rem;
    height: 0.55rem;
    left: 1.7rem;
    top: 1.2rem;
    opacity: 0.88;
}
.lyric_text{
  
    height: 0.89rem;
    padding: 0 .35rem;
    margin-top: 2.65rem;

    opacity: 0.88; 
    overflow: hidden;
    color: rgb(255, 255, 255);
}
.lyric_text span{
    color: rgb(255, 255, 255);
}
.lyric_name{
    height: 0.19rem;
    text-align: center;
    font-size: .16rem;
    line-height: 1.1;
    color: #fefefe;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.lyric_name b{
    font-size: .13rem;
    display: inline-block;
    text-align: center;
    color: hsla(0,0%,100%,.6);
}
.lyric_content{
    height: 0.56rem;
    margin-top: .14rem;
    font-size: .13rem;
    text-align: center;
    color: hsla(0,0%,100%,.6);
}
.audio_wrap{

    margin-left: .5rem;
    width: 2rem;
    height: .4rem;
}

</style>
<template>
<div>
  <div class="wank_mian">
    <ul class="wank_mian">
      <li v-for="(v,i) in wanks" :key="i" class="clearfix" >
        <div v-if='4>i'>
        <div class="list_left">
          <a href="">
              <img :src="v.coverImgUrl" alt>
              <i class="listen_icon">{{v.playCount}}</i>
          </a>
        </div>
        <div class="list_right">
          <h3>{{v.tit}}</h3>
          <p v-for="(datas,n) in v.tracks" :key="n">
              <span class="num">{{n+1}}</span>
              <span class="name" @click='goDetail(n,v.id)'>{{datas.first}}</span>
              <span class="singer" @click='goDetail(n,v.id)'>- {{datas.second}}</span>
              </p>
         <i class="list_icon"></i>     
        </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import url from '../../common/index'
export default {
  data() {
    return {
      wanks:'' 
    };
  },
  mounted() {
    //获取所有榜单
     this.$http({
        url: url.list
      }).then(res => {
        if (res.status == 200) {
          this.wanks = res.data.list
        }
      });
  },
  methods:{
     goDetail(m,n){
        this.$router.push({
            path:'/detail',
            query:{
              index:m,
              id:n
            }
        })
    }
  }
};
</script>

<style lang="" scoped>

</style>
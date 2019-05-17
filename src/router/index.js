import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Wank from '@/components/wank/Wank'
import Search from '@/components/search/Search'
import Detail from '@/components/detail/Detail'
import Index from '@/components/views/index'
import Movie from '@/components/movie/Movie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component: Index,
      children:[
        {
          path: '/',
          component: Home
        },
        {
          path: '/Home',
          component: Home
        },
        {
          path: '/wank',
          component: Wank
        }, {
          path: '/search',
          component: Search
        },
      ]
    },
    {
      path:'/detail',
      component:Detail,
    },
    {
      path:'/movie',
      component:Movie,
    },
    {
      path:'*',
      redirect:Home//重定向
    }
  ]
})

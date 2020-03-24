import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const Rank = () => import('@/components/rank/rank.vue')
const Recommend = () => import('@/components/recommend/recommend.vue')
const Search = () => import('@/components/search/search.vue')
const Singer = () => import('@/components/singer/singer.vue')
const MvPlay = () => import('@/components/mvPlay/mvPlay.vue')
const SingerDetails = () => import('../components/singerdetails/singerdetails.vue')
const routes = [
   {
      path: '',
      redirect: '/recommend'
   },
   {
      name: 'rank',
      path: '/rank',
      component: Rank
   },
   {
      name: 'recommend',
      path: '/recommend',
      component: Recommend
   },
   {
      name: 'singer',
      path: '/singer',
      component: Singer
   },
   {
      name: 'search',
      path: '/search',
      component: Search
   },
   {
      name: 'mvplay',
      path: '/mvplay',
      component: MvPlay
      
   },
   {
      name: 'singerdetails',
      path: '/singerdetails',
      component: SingerDetails
      
   }
]
const router = new VueRouter({
   routes
})
export default router
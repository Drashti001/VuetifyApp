import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

import AllCategories from '@/components/AllCategories'
import AddCategoreis from '@/components/AddCategoreis'
import AllItems from '@/components/AllItems'
import AddItems from '@/components/AddItems'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homeview',
    component: HomeView
  },
  {
    path: '/allcg',
    name: 'allcg',
    component: AllCategories
   
  },
  {
    path: '/addcg',
    name: 'addcg',
    component:AddCategoreis
  },
  {
    path: '/additems',
    name: 'additems',
    component: AddItems
  },
  {
    path: '/allitems',
    name: 'allitems',
    component: AllItems
  }
 

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

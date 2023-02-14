import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import category from './categoreis/category'
import item from './items/item'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueAxios,axios)
export default new Vuex.Store({
  
  modules: {
    category,
    item
  }
})

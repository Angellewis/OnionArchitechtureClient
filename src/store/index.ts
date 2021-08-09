import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarReduced:false
  },
  getters: {
    isSidebarReduced(state){
      return state.sidebarReduced;
    }
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
  }
})

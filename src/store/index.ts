import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export enum MUTATIONS{
  SET_USER_NAME = 'setUserName'
}
export enum ACTIONS{
  SET_USER_NAME_ASYNC = 'setUserNameAsync'
}
export default new Vuex.Store({
  state: {
    user:{
      id:1,
      userName:'emmanuel'
    }
  },
  getters: {
    getUserName(state){
      return state.user.userName;
    }
  },
  mutations: {
    [MUTATIONS.SET_USER_NAME]: (state, userName) =>{
      state.user.userName = userName;
    },
  },
  actions: {
    [ACTIONS.SET_USER_NAME_ASYNC](context,payload) {
      new Promise(()=>context.commit(MUTATIONS.SET_USER_NAME,payload))
    },
  },
  modules: {
  }
})

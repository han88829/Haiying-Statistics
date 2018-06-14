// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    url: "http://haiying.h88829.top",
    user: {},
    moment
  },
  mutations: {
    onChange: (user, data) => {
      user.user = data;
    },
  }
})

export default store

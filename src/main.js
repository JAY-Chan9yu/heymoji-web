import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import store from './store.js'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  store, // <-- injecting the store for global access
  render: h => h(App),
}).$mount('#app')

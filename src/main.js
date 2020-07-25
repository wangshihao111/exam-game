import Vue from 'vue'
import {Modal} from "ant-design-vue";
import App from './App.vue'
import store from './store'
import "./global.less"

Vue.config.productionTip = false

Vue.use(Modal);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

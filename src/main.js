import Vue from 'vue'
import App from './App.vue'
import VueGun from 'vue-gun';
import axios from "axios";
import VueAxios from "vue-axios";
import TrendChart from "vue-trend-chart";

Vue.use(VueAxios, axios);
Vue.use(TrendChart);
Vue.use(VueGun, {
    peers: ['http://192.168.0.13:8765/gun']
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

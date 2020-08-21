import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueRouter from "vue-router";
import appRoutes from "./routes/routes";
import NavigationHeader from "./components/NavigationHeader";
import axios from "axios";
import VueValidate from 'vuelidate';
import { store } from './Global/store';

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueRouter);
Vue.component('navhead', NavigationHeader);
Vue.use(VueValidate);
Vue.use(require('vue-moment'));

const appRouter = new VueRouter({
  routes: appRoutes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: appRouter,
  store: store,
}).$mount('#app')

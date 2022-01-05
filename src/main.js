import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "./css/app.scss";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

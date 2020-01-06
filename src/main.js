import 'amfe-flexible';
import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import { Field, Dialog, Toast, Loading, Uploader, Checkbox, Button, NavBar, Image, ImagePreview, Tab, Tabs} from "vant";
import globalFun from '@/utils/globalFun'
import store from './store'

Vue.config.productionTip = false

Vue.use(Field);
Vue.use(Uploader);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(NavBar);
Vue.use(Image);
Vue.use(ImagePreview);
Vue.use(Tab);
Vue.use(Tabs);

Vue.prototype.$globalFun = globalFun;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

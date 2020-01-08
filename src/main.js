import 'amfe-flexible';
import Vue from 'vue'
import App from './App.vue'
import { router } from './router';
import {
  Field, Dialog, Toast, Loading, Uploader, Checkbox,
  Button, NavBar, Image, ImagePreview, Tab, Tabs,
  Collapse, CollapseItem, Icon ,Cell, CellGroup
} from "vant";
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
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);

Vue.prototype.$globalFun = globalFun;

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
    console.log(to);
  }

  const meetingId = store.getters['meeting/meetingId'];
  console.log('11store.dispatch("meeting/meetingId", to.params.meetingId);')
  console.log(meetingId)
  console.log(to.params.meetingId )

  console.log()
  if (meetingId == 0 && to.params.meetingId ){
    console.log('22store.dispatch("meeting/meetingId", to.params.meetingId);')
    store.dispatch("meeting/meetingId", Number(to.params.meetingId));
  }

  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

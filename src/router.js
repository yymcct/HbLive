import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/expo/1'
  },
  /*小程序 */
  {
    path: '/index',
    component: () => import('./view/index/index'),
    meta: {
      title: '直播列表'
    }
  },
  {
    name: 'expo',
    path: '/expo/:id',
    component: () => import('./view/expo/index'),
    meta: {
      title: '展商名录'
    }
  },
  /*小程序结束 */
  {
    path: '/livelist',
    component: () => import('./view/live/list'),
    meta: {
      title: '直播列表'
    }
  },
  {
    name: "live",
    path: '/live/:id',
    component: () => import('./view/live/index'),
    meta: {
      title: '直播'
    }
  },

];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/livelist'
  },
  {
    path: '/goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  },
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
  }
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

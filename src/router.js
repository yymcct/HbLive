import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);

const routes = [

  /*小程序 */
  {
    path: '/index',
    component: () => import('./view/index/index'),
    meta: {
      title: '直播列表'
    }
  },

  {
    path: '/expo/pro/:id',
    component: () => import('./view/expo/proList'),
    meta: {
      title: '展品名录'
    }
  },
  {
    path: '/expo/company/:meetingId-:companyId',
    component: () => import('./view/expo/company/company'),
    meta: {
      title: '参展企业'
    }
  },
  {
    path: '/expo/product/:meetingId-:productId',
    component: () => import('./view/expo/product/product'),
    meta: {
      title: '参展产品'
    }
  },
  {
    path: '/expo/shortmsg',
    component: () => import('./view/expo/shortmsgList'),
    meta: {
      title: '动态'
    }
  },
  {
    path: '/expo/:id',
    component: () => import('./view/expo/index'),
    meta: {
      title: '展商名录'
    }
  },
  /*用户管理*/
  {
    path: '/user/login',
    component: () => import('./view/user/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user/login/weixin',
    component: () => import('./view/user/login/weixin'),
    meta: {
      title: '微信登录'
    }
  },
  /*直播*/
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
  {
    path: '/indextest',
    component: () => import('./view/index/indextest'),
    meta: {
      title: '直播'
    }
  },
  {
    path: '*',
    redirect: '/index'
  },
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

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

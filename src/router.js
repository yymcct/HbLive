import Vue from 'vue';
import Router from 'vue-router';



Vue.use(Router);

const routes = [
  /*小程序 */
  {
    path: '/expo',
    component: () => import('./view/expo/index'),
    meta: {
      title: '火爆云展'
    }
  },
  /*展商 */
  {
    path: '/expo/:meetingId/company',
    component: () => import('./view/expo/expoCompany/index'),
    meta: {
      title: '展商名录'
    }
  },
  {
    path: '/expo/:meetingId/company/:companyId',
    component: () => import('./view/expo/expoCompany/company/index'),
    meta: {
      title: '参展企业'
    }
  },
  {
    path: '/expo/:meetingId/product',
    component: () => import('./view/expo/proList/index'),
    meta: {
      title: '展品名录'
    }
  },

  {
    path: '/expo/product/:meetingId-:productId',
    component: () => import('./view/expo/product/product'),
    meta: {
      title: '参展产品'
    }
  },

  // 动态
  {
    path: '/expo/:meetingId/shortmsg',
    component: () => import('./view/expo/shortMsg/shortmsgList'),
    meta: {
      title: '动态'
    }
  },
  {
    path: '/expo/shortmsg/post',
    component: () => import('./view/expo/shortMsg/postShortMsg'),
    meta: {
      title: '发布动态'
    }
  },
  // 直播列表
  {
    path: '/expo/:meetingId/live',
    component: () => import('./view/expo/live/index'),
    meta: {
      title: '火爆直播'
    }
  },
  {
    path: '/expo/:meetingId/live/:liveId',
    component: () => import('./view/expo/live/live'),
    meta: {
      title: '火爆直播'
    }
  },
  /*用户管理*/
  {
    path: '/expo/:meetingId/user',
    component: () => import('./view/expo/user/index'),
    meta: {
      title: '登录'
    }
  },
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
  {
    path: '*',
    redirect: '/expo/'
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



export {
  router
};

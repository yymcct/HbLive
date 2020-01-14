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
    component: () => import('./view/expo/expoProduct/index'),
    meta: {
      title: '展品名录'
    }
  },

  {
    path: '/expo/:meetingId/product/:productId',
    component: () => import('./view/expo/expoProduct/product/index'),
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
  /*我的*/
  {
    path: '/expo/:meetingId/user',
    component: () => import('./view/expo/user/index'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/expo/:meetingId/user/shortmsg',
    component: () => import('./view/expo/user/shortMsg'),
    meta: {
      title: '我的动态'
    }
  },
  {
    path: '/expo/:meetingId/user/comment',
    component: () => import('./view/expo/user/comment'),
    meta: {
      title: '我的评论/回复'
    }
  },
  {
    path: '/expo/:meetingId/user/footmark',
    component: () => import('./view/expo/user/footMark'),
    meta: {
      title: '我的足迹'
    }
  },
  {
    path: '/expo/:meetingId/user/zan',
    component: () => import('./view/expo/user/zan'),
    meta: {
      title: '我的点赞'
    }
  },
  {
    path: '/expo/:meetingId/user/feedback',
    component: () => import('./view/expo/user/feedback'),
    meta: {
      title: '意见反馈'
    }
  },
  {
    path: '/expo/:meetingId/user/function',
    component: () => import('./view/expo/user/function'),
    meta: {
      title: '功能介绍'
    }
  },
  {
    path: '/expo/:meetingId/user/about',
    component: () => import('./view/expo/user/about'),
    meta: {
      title: '关于我们'
    }
  },
  {
    path: '/expo/:meetingId/user/zhanshang/company/:companyId',
    component: () => import('./view/expo/user/zhanShang/company'),
    meta: {
      title: '添加企业'
    }
  },
  {
    path: '/expo/:meetingId/user/zhanshang/:companyId/product/:productId',
    component: () => import('./view/expo/user/zhanShang/product'),
    meta: {
      title: '添加产品'
    }
  },
  {
    path: '/expo/:meetingId/user/zhanshang/:companyId/products',
    component: () => import('./view/expo/user/zhanShang/productList'),
    meta: {
      title: '管理产品'
    }
  },
  {
    path: '/expo/:meetingId/user/meeting/company/:companyId',
    component: () => import('./view/expo/user/meeting/company'),
    meta: {
      title: '参展企业'
    }
  },
  {
    path: '/expo/:meetingId/user/meeting/:companyId/products',
    component: () => import('./view/expo/user/meeting/product'),
    meta: {
      title: '参展展品'
    }
  },
  {
    path: '/expo/:meetingId/user/meeting/customer',
    component: () => import('./view/expo/user/meeting/customer'),
    meta: {
      title: '注册参观'
    }
  },
  {
    path: '/user/login',
    component: () => import('./view/expo/user/login/index'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user/login/weixin',
    component: () => import('./view/expo/user/login/weixin'),
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

//import { Dialog } from 'vant';
import { router } from '@/router';

const USERINfO_KEY = 'USER_INFO';
const LOGINFROM_KEY = 'LOGIN_FROM'

export const userInfoAPI = {

  get() {
    const userInfo = JSON.parse(localStorage.getItem(USERINfO_KEY));
    if (userInfo === null || userInfo === 'undefined' || userInfo.expires_in < (Date.now()/1000)) {
      this.clear();
      return null;
    }
    return userInfo;
  },

  set(userInfo) {
    userInfo.expires_in = userInfo.expires_in + (Date.now()/1000);
    localStorage.setItem(USERINfO_KEY, JSON.stringify(userInfo));
  },

  clear() {
    localStorage.removeItem(USERINfO_KEY);
  },

  // 检查是否login 如果没有则提示跳转
  ifLogin(callback, toLogin = true) {
    let userLoginInfo = this.get();
    if (userLoginInfo != null) {
      if (callback != null) {
        callback(userLoginInfo.member);
      }
    }
    else {
      if (toLogin) {
        //const { pathname, search, hash } = window.location;
        //登录成功后返回到此地址
        localStorage.setItem(LOGINFROM_KEY, window.location.href);
        router.push('/user/login');
      }
    }
  },
  getLoginFrom() {
    const from = localStorage.getItem(LOGINFROM_KEY);
    this.clearLoginFrom();
    return from;
  },
  clearLoginFrom() {
    localStorage.removeItem(LOGINFROM_KEY);
  }

}
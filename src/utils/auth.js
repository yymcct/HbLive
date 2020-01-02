//import { Dialog } from 'vant';
import { router } from '@/router';

const USERINfO_KEY = 'USERINfO_KEY';

export const userInfoAPI = {

  get() {
    const userInfo = JSON.parse(localStorage.getItem(USERINfO_KEY));
    if (userInfo === null || userInfo === 'undefined' || userInfo.expires_in < Date.now()) {
      this.clear();
      return null;
    }
    return userInfo;
  },

  set(userInfo) {
    userInfo.expires_in = userInfo.expires_in + Date.now();
    console.log(userInfo);
    localStorage.setItem(USERINfO_KEY, JSON.stringify(userInfo));
  },

  clear() {
    localStorage.removeItem(USERINfO_KEY);
  },

  // 检查是否login 如果没有则提示跳转
  ifLogin(callback) {
    let userLoginInfo = this.get();
    if (userLoginInfo != null) {
      if (callback != null) {
        callback(userLoginInfo.member);
      }
    }
    else {
      router.push('/user/login');
      // Dialog.confirm({
      //   title: '登陆提醒',
      //   message: '弹窗内容'
      // }).then(() => {
      //   // on confirm
      // }).catch(() => {
      //   // on cancel
      // });
    }
  },
}
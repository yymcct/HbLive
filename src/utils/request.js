import axios from 'axios'
import { userInfoAPI } from './auth'
import { Toast } from 'vant';

// create an axios instance
const service = axios.create({
  // baseURL: 'http://localhost:8222',//process.env.VUE_APP_BASE_API,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000 * 60 * 1 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const userInfo = userInfoAPI.get();
    if (userInfo) {
      config.headers['Authorization'] = `${userInfo.token_type} ${userInfo.access_token}`;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.statusCode === 401) {
      userInfoAPI.clear();
    }
    else if (res.statusCode !== 200) {
      Toast(res.msg || 'Error:' + res.statusCode);
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    var msg = String(error);
    if (msg.indexOf("400") != -1)
      msg = '账号或密码错误,或没有权限!';
    if (msg.indexOf("403") != -1)
      msg = '您的账号没有权限!';
    Toast(msg);
    // Message({
    //   message: msg,
    //   type: 'error',
    //   duration: 5 * 1000
    // })

    return Promise.reject(error)
  }
)

export default service

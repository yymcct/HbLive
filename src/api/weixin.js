import request from '../utils/request'

//获取微信分享连接
export const api_GetWxConfig = (params) => request.get('/api/v0.1/WeiXin/GetConfig', { params: params });
//获取用户信息
export const api_GetWebWxUserInfo = (params) => request.get('/api/v0.1/LiveBroadcast/GetWebWxUserInfo', { params: params });
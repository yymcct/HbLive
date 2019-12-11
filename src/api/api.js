import qs from 'qs';
import request from '../utils/request'

//export const fileUploadUrl = `${process.env.VUE_APP_BASE_API}/manager/FileUpload/PostFilesWithNoWater`;

//TODO Md5加密密码
export const requestLogin = (username, password) => {
    var login = {
        grant_type: "password",
        client_id: "App.Manager.Ro",
        client_secret: "DEsjpJFtokIOhMKuE6BVMczYUEEyPGTOLrur3PXw26VMLNwKOfAKFZZgR2vVJDKG",
        username: username,
        password: password
    };
    return request({
        url: `${process.env.VUE_APP_BASE_API}/connect/token`,
        method: 'post',
        data: qs.stringify(login),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
};

export const getUser = () => request.get('/manager/Member/GetUser');

//获取直播列表
export const api_GetLiveBroadCast = (params) => request.get('/api/LiveBroadCast/GetLiveBroadCast', { params: params });

//会议
export const api_GetLiveBroadCastInfo = (params) => request.get('/api/LiveBroadCast/GetLiveBroadCastInfo', { params: params });

//获取微信分享连接
export const api_GetWxShareContent = (params) => request.get('/api/v0.1/LiveBroadcast/GetWxShareContent', { params: params });
//获取用户信息
export const api_GetWebWxUserInfo = (params) => request.get('/api/v0.1/LiveBroadcast/GetWebWxUserInfo', { params: params });

`                                                                                       `
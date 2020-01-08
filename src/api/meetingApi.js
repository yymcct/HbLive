import request from '@/utils/request'
import { userInfoAPI } from '@/utils/auth'
import Compressor from 'compressorjs';
//export const api_postMeeting = (params) => request.post('/manager/Meeting/PostMeeting', params);

//上传图片
export const api_PostImgWithWater = (params) => {
    const _compress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                quality: 0.5,
                success(result) {
                    resolve(result);
                },
                error(error) {
                    reject(error);
                }
            });
        });
    };

    const promises = params.map(iteam => {
        return _compress(iteam.file)
    })

    return Promise.all(promises).then(res => {
        const userInfo = userInfoAPI.get();
        let fromdata = new FormData();
        res.map(iteam => {
            fromdata.append('file', iteam, iteam.name);
        });
        let config = {
            headers: [
                { "Content-Type": "multipart/form-data" },
                { 'Authorization': `${userInfo.token_type} ${userInfo.access_token}` }
            ],
        };

        return request.post('/api/meeting/FileUpload/PostFilesWithWater', fromdata, config);
    })
}
//获取直播列表
export const api_GetMeetingList = (params) => request.get('/api/meeting/Meeting/GetMeetingList', { params: params });
export const api_GetMeeting = (params) => request.get('/api/meeting/Meeting/GetMeeting', { params: params });
export const api_GetCompanyByTopRecommend = (params) => request.get('/api/meeting/Company/GetCompanyByTopRecommend', { params: params });
export const api_GetMeetingArea = (params) => request.get('/api/meeting/MeetingArea/GetArea', { params: params });
export const api_GetMeetingAreaCompany = (params) => request.get('/api/meeting/Company/GetCompany', { params: params });
export const api_GetGetCompanyByRecommend = (params) => request.get('/api/meeting/Company/GetCompanyByRecommend', { params: params });

export const api_GetMeetingAreaProduct = (params) => request.get('/api/meeting/Product/GetProductByIteam', { params: params });
export const api_GetProductByRecommend = (params) => request.get('/api/meeting/Product/GetProductByIteam', { params: params });

//公司详情页
export const api_PostCompanyMemberHits = (params) => request.post('/api/meeting/Company/PostCompanyMemberHits', params);
export const api_GetCompanyContent = (params) => request.get('/api/meeting/Company/GetCompanyContent', { params: params });
export const api_GetComThumbsUpMemberNick = (params) => request.get('/api/meeting/Company/GetComThumbsUpMemberNick', { params: params });
export const api_GetProductByIteam = (params) => request.get('/api/meeting/Product/GetProductByIteam', { params: params });
export const api_GetCompanyReplys = (params) => request.get('/api/meeting/Company/GetCompanyReplys', { params: params });
export const api_PostMeetingHits = (params) => request.post('/api/meeting/Meeting/PostMeetingHits', params);
export const api_PostCompanyReply = (params) => request.post('/api/meeting/Company/PostCompanyReply', params);

//产品详情页
export const api_PostProductMemberHits = (params) => request.post('/api/meeting/Product/PostProductMemberHits', params);
export const api_GetProductContent = (params) => request.get('/api/meeting/Product/GetProductContent', { params: params });
export const api_GetProductReplys = (params) => request.get('/api/meeting/Product/GetProductReplys', { params: params });
export const api_GetCompanyOtherProduct = (params) => request.get('/api/meeting/Product/GetCompanyOtherProduct', { params: params });

//动态
export const api_GetMeetingShortMsg = (params) => request.get('/api/meeting/ShortMsg/GetShortMsg', { params: params });
export const api_PostShortMsg = (params) => request.post('/api/meeting/ShortMsg/PostShortMsg', params);

//直播
export const api_GetLiveBroadCast = (params) => request.get('/api/meeting/LiveBroadCast/GetLiveBroadCast', { params: params });
export const api_GetLiveBroadCastInfoType = (params) => request.get('/api/meeting/LiveBroadCast/GetLiveBroadCastInfoType', { params: params });
export const api_GetLiveBroadCastInfo = (params) => request.get('/api/meeting/LiveBroadCast/GetLiveBroadCastInfo', { params: params });

//我的评论
export const api_GetUserReplysByMemberId = (params) => request.get('/api/meeting/Member/GetUserReplysByMemberId', { params: params });
export const api_GetMemberReplyReply = (params) => request.get('/api/meeting/Member/GetMemberReplyReply', { params: params });

//意见反馈
export const api_PostUserFaceBack = (params) => request.post('/api/v0.1/Member/PostUserFaceBack', params);

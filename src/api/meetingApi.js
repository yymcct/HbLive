import request from '@/utils/request'
import { userInfoAPI } from '@/utils/auth'
//export const api_postMeeting = (params) => request.post('/manager/Meeting/PostMeeting', params);

//上传图片
export const api_PostImgWithWater = (params) => {
    
    let param = new FormData();
    params.map(iteam=>{
        let file = iteam.file;
        param.append('file', file);
    })

    const userInfo = userInfoAPI.get();
    let config = {
        headers: [
            { "Content-Type": "multipart/form-data" },
            { 'Authorization': `${userInfo.token_type} ${userInfo.access_token}` }
        ],
    };

    return request.post('/api/meeting/FileUpload/PostFilesWithWater', param, config);
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
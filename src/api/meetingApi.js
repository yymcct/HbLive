import request from '../utils/request'




//获取直播列表
export const api_GetMeetingList = (params) => request.get('/api/meeting/Meeting/GetMeetingList', { params: params });
export const api_GetMeeting = (params) => request.get('/api/meeting/Meeting/GetMeeting', { params: params });
export const api_GetCompanyByTopRecommend = (params) => request.get('/api/meeting/Company/GetCompanyByTopRecommend', { params: params });
export const api_GetMeetingArea = (params) => request.get('/api/meeting/MeetingArea/GetArea', { params: params });
export const api_GetMeetingAreaCompany = (params) => request.get('/api/meeting/Company/GetCompany', { params: params });
export const api_GetGetCompanyByRecommend = (params) => request.get('/api/meeting/Company/GetCompanyByRecommend', { params: params });

export const api_GetMeetingAreaProduct = (params) => request.get('/api/meeting/Product/GetProductByIteam', { params: params });
export const api_GetProductByRecommend = (params) => request.get('/api/meeting/Product/GetProductByIteam', { params: params });


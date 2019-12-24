import request from '../utils/request'




//获取直播列表
export const api_GetMeetingList = (params) => request.get('/api/meeting/Meeting/GetMeetingList', { params: params });


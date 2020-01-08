import {api_GetMeeting} from "@/api/meetingApi";

export default {
    namespaced: true,
    state: {
        meetingId: 0,
        meeting: null
    },

    getters: {
        meetingId: (state) => {
            return state.meetingId;
        },
        meeting: (state) => {
            return state.meeting;
        }
    },

    mutations: {
        meetingId(state, id) {
            state.meetingId = id;
        },
        setMeeting(state, meeting) {
            state.meeting = meeting;
        }
    },

    actions: {
        meetingId(context, mId) {    
            context.commit('meetingId', mId);       
            api_GetMeeting({ meetingid: mId }).then(res => {
                context.commit('setMeeting', res.result);
            });
        }
    }
}
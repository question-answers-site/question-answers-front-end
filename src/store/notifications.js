/* eslint-disable */
import {apiClient} from "../services/apiService";

export default {
  state:{
    notifications:[]
  },
  getters:{
    getNotifications(state){
      console.log(state.notifications)
      return state.notifications;
    }
  },
  mutations:{
    RETRIEVE_NOTIFICATIONS(state,notifications){
      state.notifications = notifications
    },

    MARK_NOTIFICATION_AS_READ(state,{notificationId}){
      state.notifications.find(item=>item.id == notificationId).read_at = new Date()
    }

  },
  actions:{

    retrieveNotification({commit}){
      apiClient.get('notifications')
        .then((response)=>{
          commit('RETRIEVE_NOTIFICATIONS',response.data)
        })
    },

    markNotificationAsRead({commit},notificationId){
      apiClient.post('readNotification',{
        notificationId:notificationId
      })
        .then(()=>{
          commit('MARK_NOTIFICATION_AS_READ',notificationId);
        })
    }
  },



}

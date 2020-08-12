/* eslint-disable */

export default {
  state:{
    notification:{
      message:'',
      type:''
    }
  },
  getters:{
    getNotification(state){
      return state.notification;
    }
  },
  mutations:{
    SET_NOTIFICATION(state,notification){
      state.notification=notification;
    }
  }
}

/* eslint-disable */
import { apiClient } from '../services/apiService'

export default {
  state:{
    usersInTopic:[],
  },
  getters:{
    getUsersInTopic(state){
        return state.usersInTopic
    }
  },
  mutations: {
    CLEAR_USERS_IN_TOPIC(state){
      state.usersInTopic=[]
    },
    GET_USERS_BY_TOPICS(state,data){
      if(state.usersInTopic.find(item=>data.topicId===item.id)==null)
        state.usersInTopic.push({
        id:data.topicId,
        users:[]
      })
      // state.usersInTopic[data.topicId].push(...(data.users))
      state.usersInTopic.find(item=>data.topicId===item.id).users.push(...(data.users))
    }
  },
  actions: {
    sendInviteRequests ({ commit }, selectedUsersIds) {
      console.log(selectedUsersIds)
      return new Promise((resolve, reject) => {
        apiClient.post('/invite_users', selectedUsersIds)
          .then(response => {
            commit('SET_NOTIFICATION',{message:'invites Sended Successfully',type:'success'})
            resolve(response.data)
          })
          .catch(error => {
            commit('SET_NOTIFICATION',{message:error.response.data,type:'error'})
            reject(error)
          })
      })
    },
    getAllUsers ({ commit }) {
      return new Promise((resolve, reject) => {
        apiClient.get('/users')
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    getUsersByTopic({commit},{page,topicId}){
      return new Promise((resolve,reject)=>{
        apiClient.get('topic_users',{
          params:{
            page:page,
            topicId:topicId
          }
        })
          .then(response=>{
            commit('GET_USERS_BY_TOPICS',{users:response.data.data,topicId:topicId})
            resolve(response)
          })
          .catch(error=>{
            reject(error)
            commit('SET_NOTIFICATION',{message:'something wrong',type:'error'})
          })
      })

    }

  }
}

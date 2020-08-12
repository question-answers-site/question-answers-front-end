/* eslint-disable */

import {apiClient} from "../services/apiService";

export default {
  state:{
    topics:[]
  },
  getters:{
    getTopics(state){
      return state.topics
    },
    getTopic(state){
      return (id)=>{
        return state.topics.find(topic=>topic.id === id)
      }
    }
  },
  mutations:{
    RETRIEVE_TOPICS(state,topics){
      state.topics = topics
    }
  },
  actions:{
    retrieveTopics({commit}){
      apiClient.get('topics')
        .then((response)=>{
          commit('RETRIEVE_TOPICS',response.data)
        })
    }
  }
}

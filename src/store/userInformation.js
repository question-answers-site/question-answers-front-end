/* eslint-disable */

import {apiClient} from "../services/apiService";

export default {

  state:{
    myQuestions:[],
    myAnswers:[],
  },
  getters:{
    myAnswers(state){
      return state.myAnswers
    }
  },
  mutations:{
    RETRIEVE_MY_ANSWERS(state,answers){
      state.myAnswers = answers
    }
  },

  actions:{
    retrieveMyQuestions({commit}){
      apiClient.get('user/questions')
        .then(response=>{
          commit('RETRIEVE_ALL_QUESTIONS',response.data)
        })
        .catch(error=>{
          console.log(error)
        })
    },
    retrieveMyAnswers({commit}){
      apiClient.get('user/answers')
        .then(response=>{
           commit('RETRIEVE_MY_ANSWERS',response.data)
        })
        .catch(error=>{
          console.log(error)
        })
    }


  }


}

/* eslint-disable */
import { apiClient } from '../services/apiService'

export default {
  state:{
    questionsDetails:[],
    answersDetails:[],
    options:[]
  },
  getters:{
    // getOptions(state){
    //   return state.options
    // },
    getQuestionsDetails(state){
      return state.questionsDetails
    },
    getAnswersDetails(state){
      return state.answersDetails
    }
  },
  mutations:{
    SET_OPTIONS(state,options){
      state.options=options;
    },
    SET_QUESTIONS_DETAILS(state,data){
      let optionId=data.option.id
      let record = {id:optionId,questions:data.questions}
      state.questionsDetails.push(record)
    },
    SET_ANSWERS_DETAILS(state,data){
      let optionId=data.option.id
      let record = {id:optionId,answers:data.answers}
      state.answersDetails.push(record)
    }
  },
  actions:{
    getOptions({commit}){
      return new Promise((resolve,reject)=>{
        apiClient.get('/admin/options')
          .then(response=>{
            commit('SET_OPTIONS',response.data)
            resolve(response)
          })
          .catch(error=>{
            reject(error)
            console.log(error)
          })
      })
    },
    retrieveQuestionsDetails ({commit,state},{option}) {
      let questionsObject=state.questionsDetails.find(item=>item.id === option.id)
      if(questionsObject != null) return
      apiClient.get('/admin/questionsDetails',{
        params:{
          optionId:option.id
        }
      })
        .then(response=>{
          commit('SET_QUESTIONS_DETAILS',{'option':option,'questions':response.data})
        })
        .catch(error=>{
          console.log(error)
        })
    },
    retrieveAnswersDetails ({commit,state},{option}) {
      let answersObject=state.answersDetails.find(item=>item.id === option.id)
      if(answersObject != null) return
      apiClient.get('/admin/answersDetails',{
        params:{
          optionId:option.id
        }
      })
        .then(response=>{
          commit('SET_ANSWERS_DETAILS',{'option':option,'answers':response.data})
        })
        .catch(error=>{
          console.log(error)
        })
    }
  }
}

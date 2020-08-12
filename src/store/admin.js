/* eslint-disable */
import { apiClient } from '../services/apiService'

export default {
  state:{
    questionsReports:[],
    answersReports:[],
  },
  getters:{
    getQuestionsReports(state) {
      return state.questionsReports;
    },
    getAnswersReports(state) {
      return state.answersReports;
    },
  },
  mutations:{
    IGNORE_REPORT(state,{reportType,id}){
      console.log(reportType+" "+id)
      if(reportType==='questionsReports'){
        let index=state.questionsReports.findIndex(item=>item.id==id)
        console.log(index)
        state.questionsReports.splice(index,1)
      }
      if(reportType==='answersReports'){
        let index=state.answerReports.findIndex(item=>item.id===id)
        state.answersReports.splice(index,1)
      }
    },
    RETRIEVE_REPORTS(state,payload){
      state.questionsReports=payload.reportedQuestions;
      state.answersReports=payload.reportedAnswers;
    },
    DELETE_QUESTION_BY_ADMIN(state,questionId){
      let index=state.questionsReports.findIndex(item=>item.id===questionId)
      state.questionsReports.splice(index,1)
    },
    DELETE_ANSWER_BY_ADMIN(state,questionId){
      let index=state.answersReports.findIndex(item=>item.id===questionId)
      state.answersReports.splice(index,1)
    }
  },
  actions:{
    reportQuestion ({ commit }, payload) {
      apiClient.post('/report', {
        id: payload.id,
        userId: payload.userId,
        type: 'question'
      })
        .then(response => {
          commit('SET_NOTIFICATION', {
            message: 'reported successfully',
            type: 'success'
          })
        })
        .catch(error => {
          commit('SET_NOTIFICATION', {
            message: error.response.data,
            type: 'error'
          })
        })
    },
    reportAnswer({commit},payload) {
      apiClient.post('/report',{
        id:payload.id,
        userId:payload.userId,
        type:'answer'
      })
        .then(response=>{
          commit('SET_NOTIFICATION',{message:'reported successfully',type:'success'})
        })
        .catch(error=>{
          commit('SET_NOTIFICATION',{message:error.response.data,type:'error'})
        })
    },
    retrieveReports({commit}){
      apiClient.get('/reports')
        .then(response=>{
          commit('RETRIEVE_REPORTS',response.data)
        })
        .catch(error=>{
          console.log(error)
        })
    },
    deleteQuestionByAdmin ({ commit,dispatch }, {questionId,reportId}) {
      return new Promise((resolve, reject) => {
        apiClient.delete('questions/' + questionId)
          .then(response => {
            dispatch('markReportAsRead',reportId)
            commit('DELETE_QUESTION_BY_ADMIN',questionId)
            commit('SET_NOTIFICATION', {
              message: response.data, type: 'success'
            })
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteAnswerByAdmin ({ commit,dispatch }, payload) {
      return new Promise((resolve, reject) => {
        apiClient.delete('answers/' + payload.answerId)
          .then(response => {
            dispatch('markReportAsRead',payload.reportId)
            commit('DELETE_ANSWER_BY_ADMIN',payload.questionId)
            commit('SET_NOTIFICATION', {
              message: response.data, type: 'success'
            })
          })
          .catch((error) => {
            commit('SET_NOTIFICATION', {
              message: error.response.data,
              type: 'error'
            })
          })
      })
    },
    deleteUser({commit,dispatch},{reportId,userId}){
      apiClient.delete('user/'+userId)
        .then(response=>{
          dispatch('markReportAsRead',reportId)
          commit('SET_NOTIFICATION', {
            message: response.data, type: 'success'
          })
        })
        .catch(error=>{
          commit('SET_NOTIFICATION', {
            message: error.response.data,
            type: 'error'
          })
        })
    },
    ignoreReport({commit},{reportId,reportType,id}){
      return new Promise((resolve, reject) => {
        apiClient.delete('reports/ignore/' + reportId)
          .then(response => {
            commit('IGNORE_REPORT',{reportType,id})
            commit('SET_NOTIFICATION', {
              message: response.data, type: 'success'
            })
          })
          .catch((error) => {
            commit('SET_NOTIFICATION', {
              message: error.message,
              type: 'error'
            })
          })
      })
    },
    markReportAsRead({commit},reportId){
      apiClient.post('reports/markAsRead/'+reportId)
        .then((response)=>{
        })
        .catch(error=>{

        })
    }
  },
}

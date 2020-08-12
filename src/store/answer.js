/* eslint-disable */
import {apiClient} from "../services/apiService";

export default {
  actions:{
    addAnswer({commit},{editorContent,questionId}){
      return new Promise((resolve,reject)=>{
        apiClient.post('answers',{
          editorContent,
          questionId
        })
          .then(response=>{
            // commit('ADD_ANSWER',response.data)
            commit('SET_NOTIFICATION',{message:'Answer added successfully',type:'success'})
          })
          .catch(error=>{
            commit('SET_NOTIFICATION',{message:error.response.data,type:'error'})
          })
      })
    },
    editAnswer({commit},{answer}){
      return new Promise((resolve, reject) => {
        apiClient.put('answers/'+answer.id)
          .then(response=>{
            // commit('EDIT_ANSWER',answer)
            commit('SET_NOTIFICATION',{ message:response.data, type:'success' })
          })
          .catch((error)=>{
            commit('SET_NOTIFICATION',{ message:error.response.data, type:'error'
            })
          })
      })
    },
    deleteAnswer({commit},{answer}){
      return new Promise((resolve, reject) => {
        apiClient.delete('answers/'+answer.id)
          .then(response=>{
            commit('DELETE_ANSWER',answer)
            commit('SET_NOTIFICATION',{
              message:response.data,
              type:'success'
            })
          })
          .catch((error)=>{
            commit('SET_NOTIFICATION',{
              message:error.response.data,
              type:'error'
            })
          })
      })
    },

  }
}

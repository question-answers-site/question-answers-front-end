/* eslint-disable */

import {apiClient} from "../services/apiService"

export default {
  actions: {
    retrieveTopicQuestions({commit,rootState}, {topicId}) {
      return new Promise((resolve, reject) => {
        apiClient.get('/topic_questions', {
          params: {
            topicId,
            maxId:rootState.question.maxId,
            minId:rootState.question.minId
          }
        })
          .then(response => {
            commit('RETRIEVE_ALL_QUESTIONS', response.data)
            resolve()
          })
      })
    },

  }
}

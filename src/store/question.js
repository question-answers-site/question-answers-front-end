/* eslint-disable */
import {apiClient} from "../services/apiService";

export default {
  state: {
    questions: [],
    unAnsweredQuestions: [],
    minId: 0,
    maxId: 0
  },
  getters: {
    getAllQuestions(state) {
      return state.questions
    },
    getQuestion(state) {
      return (question_id) => {
        let question = state.questions.find(item => item.id === question_id)
        if (!question)
          question = state.unAnsweredQuestions.find(item => item.id === question_id)
        return question
      }
    },
    UnAnsweredQuestions(state) {
      return state.unAnsweredQuestions;
    }
  },
  mutations: {
    DELETE_ANSWER(state, answer) {
      let questionId = answer.question_id

      let question = state.questions.find(item => item.id == questionId)

      let index = question.answers.findIndex(item => item.id === answer.id)

      question.answers.splice(index, 1)

    },
    DELETE_QUESTION(state, question_id) {
      let index = state.questions.findIndex(item => item.id == question_id)
      state.questions.splice(index, 1)
    },
    EDIT_QUESTION(state, question) {
      state.questions.find(item => item.id == question.id).body = question.body;
    },
    CLEAR_QUESTIONS(state) {
      state.questions = []
      state.minId = 0
      state.maxId = 0
    },
    RETRIEVE_UN_ANSWERED_QUESTIONS(state, questions) {
      state.unAnsweredQuestions = questions;
    },
    RETRIEVE_ALL_QUESTIONS(state, data) {
      state.questions.push(...data.questions)
      state.minId = data.minId
      state.maxId = data.maxId
    },

    RETRIEVE_QUESTION(state, {answers,question, question_id}) {
      let localQuestion = state.questions.find(item => item.id == question_id)

      if(localQuestion == null) {
        state.questions.push(question)
      }

      localQuestion = state.questions.find(item =>item.id == question_id)

      localQuestion.answers = answers;

    },

    ANSWER_VOTE(state, {answer, upVotesCount, downVotesCount, value}) {
      let questionId = answer.question_id
      let answer1 = state.questions
        .find(item => {
          return item.id === questionId
        })
        .answers
        .find(item => {
          return item.id === answer.id
        })
      answer1.upVotesCount = upVotesCount
      answer1.downVotesCount = downVotesCount
      // answer1.votes_value= parseInt(answer1.votes_value) + value
      if (answer1.userReacted === value)
        answer1.userReacted = 0
      else
        answer1.userReacted = value
    },
  },

  actions: {
    retrieveAllQuestions({commit, state}) {
      return new Promise((resolve, reject) => {
        apiClient.get('questions', {
          params: {
            minId: state.minId,
            maxId: state.maxId
          }
        })
          .then(response => {
            commit('RETRIEVE_ALL_QUESTIONS', response.data)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    retrieveQuestion({commit}, id) {
      apiClient.get('questions/' + id)
        .then(response => {

          commit('RETRIEVE_QUESTION', {
            question: response.data.question,
            answers: response.data.answers,
            question_id: id
          })

        })
        .catch(error => {
          console.log(error)
        })
    },
    answerVote({commit}, data) {
      apiClient.post('votes', {
        answerId: data.answer.id,
        value: data.value
      })
        .then(response => {
          commit('ANSWER_VOTE', {
            upVotesCount: response.data.upVotesCount,
            downVotesCount: response.data.downVotesCount,
            value: data.value,
            answer: data.answer
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    addQuestion({commit}, question) {
      return new Promise((resolve, reject) => {
        apiClient.post('questions', question)
          .then(response => {
            resolve(response)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    retrieveUnAnsweredQuestions({commit}, question) {
      return new Promise((resolve, reject) => {
        apiClient.get('unanswered_questions',)
          .then(response => {
            // console.log(response.data)
            commit('RETRIEVE_UN_ANSWERED_QUESTIONS', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    editQuestion({commit}, {question}) {
      return new Promise((resolve, reject) => {
        apiClient.put('questions/' + question.id, question)
          .then(response => {
            commit('EDIT_QUESTION', response.data)
            resolve(response)
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.message, type: 'error'})
            reject(error)
          })
      })
    },
    deleteQuestion({commit}, question_id) {
      return new Promise((resolve, reject) => {
        apiClient.delete('questions/' + question_id)
          .then(response => {
            commit('DELETE_QUESTION', question_id)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    predictQuestionTopics({commit},questionBody){
      return new Promise((resolve,reject)=>{
        apiClient.post('predict_topics',{
          questionBody:this.questionBody
        })
          .then(response=>{
            resolve(response)
          })
          .catch(error=>{
            reject(error)
          })
      })
    }
  }
}

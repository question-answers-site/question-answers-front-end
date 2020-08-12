/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './user'
import question from "./question";
import userInformation from './userInformation'
import inviteRequests from './inviteRequests'
import toasts from './toasts'
import {apiClient} from "../services/apiService";
import topic from './topic'
import answer from './answer'
import topicQuestion from './topicQuestion'
import notifications from './notifications'
import adminDashboard from './adminDashboard'
import admin from './admin'
Vue.use(Vuex)
Vue.use(axios)
axios.defaults.baseURL = 'http://question.test/api/';

export default new Vuex.Store({
  state: {
    accessToken:localStorage.getItem('access_token') || null,
    refreshToken:localStorage.getItem('refresh_token') || null,
    fromQuestionAnswersUrl : false
  },
  getters: {
    isLoggedIn(state){
      return !!state.accessToken
    },
    getFromQuestionAnswersUrl(state){
      return state.fromQuestionAnswersUrl
    }
  },
  mutations: {
    INIT_APP(state){
      apiClient.defaults.headers.common['authorization']='Bearer '+state.accessToken
    },
    RETRIEVE_TOKEN(state,data){
      state.accessToken=data.access_token
      state.refreshToken=data.refresh_token
      localStorage.setItem('access_token',state.accessToken)
      localStorage.setItem('refresh_token',state.refreshToken)
      apiClient.defaults.headers.common['authorization']='Bearer '+state.accessToken
    },
    SET_FROM_QUESTION_ANSWERS_URL(state,payload){
      state.fromQuestionAnswersUrl = payload
    },
  },
  actions: {
    initApp({commit,getters,dispatch}){
      commit('INIT_APP')
      if(getters.isLoggedIn){
        dispatch('retrieveUser')
      }
    },
  },
  modules: {
    user,
    question,
    userInformation,
    toasts,
    topic,
    topicQuestion,
    answer,
    inviteRequests,
    notifications,
    admin,
    adminDashboard
  }
})

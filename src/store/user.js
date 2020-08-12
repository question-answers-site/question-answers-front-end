/* eslint-disable */

import {apiClient} from "../services/apiService";

export default {
  state: {
    user: {
      first_name: '',
      last_name: '',
	  image:{url:''}
    },
  },
  getters: {
    user(state) {
      return state.user
    },

  },
  mutations: {
    LOGOUT(state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
    REGISTER(state, user) {
      state.user.id = user.id
      state.user.email = user.email
      state.user.first_name = user.first_name
      state.user.last_name = user.last_name
    },
    RETRIEVE_USER(state, user) {
      state.user = user;
    },

  },
  actions: {
    logout({commit, state}) {
      return new Promise((resolve, reject) => {
        apiClient.post('logout')
          .then(response => {
            commit('LOGOUT')
            commit('SET_NOTIFICATION', {message: 'Logout Out Successfully', type: 'success'})
            resolve(response)
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.message, type: 'success'})
            reject(error)
          })
      })

    },
    login({commit, dispatch}, credentials) {
      return new Promise((resolve, reject) => {

        apiClient.post('login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            commit('RETRIEVE_TOKEN', response.data)
            commit('SET_NOTIFICATION', {message: 'Hello', type: 'success'})
            dispatch('retrieveUser')
            resolve()
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
            reject(error)
          })
      })
    },
    register({dispatch, commit}, user) {
     let formData = new FormData()
      formData.append('file', user.profileImage)
      formData.append('email', user.email)
      formData.append('password',user.password )
      formData.append('first_name',user.first_name )
      formData.append('last_name',user.last_name )

      return new Promise((resolve, reject) => {

        apiClient.post( 'register',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            dispatch('login', {
              email: user.email,
              password: user.password
            })
            commit('REGISTER', response.data)
            resolve(response)
          })
          .catch(error => {
            commit('SET_NOTIFICATION', {message: error.response.data, type: 'error'})
            reject(error)
          })
      })
    },
    retrieveUser({commit}) {
      apiClient.get('/user')
        .then(response => {
          commit('RETRIEVE_USER', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
  }
}

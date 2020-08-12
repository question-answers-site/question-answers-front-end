/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login'
import Register from '../views/auth/Register'
import Profile from '../views/auth/Profile'
import Home from '../views/Home'
import TopicPage from '../views/TopicPage'
import Logout from '../views/auth/Logout'
import store from '../store/index'
import QuestionAnswers from '../components/QuestionAnswers'

import ShowProfile from '../components/profile/ShowProfile'
import AccountSettings from '../components/profile/AccountSettings'
import Admin from '../views/Admin.vue'
import Layout from '../views/Layout'
import Master from '../views/Master'
import Reports from '../components/adminDashboard/Reports'
import Charts from '../components/Charts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Master,
    children: [
      {
        path: '',
        name: 'layout',
        component: Layout,
        children: [
          {
            path: '',
            name: 'home',
            component: Home,
          },

          {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
              requiredGuest: true
            }
          },
          {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
              requiredGuest: true
            }
          },
          {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
              requiredAuth: true
            }
          },
          {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
              requiredAuth: true
            },
            children: [
              {
                path: '/',
                name: 'profile',
                component: ShowProfile
              },
              {
                path: 'accountSettings',
                name: 'accountSettings',
                component: AccountSettings
              }
            ]

          },
          {
            path: '/topic/{id}',
            name: 'topic',
            component: TopicPage
          },
          {
            path: '/question/:id',
            name: 'questionAnswers',
            component: QuestionAnswers,
            meta: {
              isQuestionAnswersUrl: true
            }
          },
        ]
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {requiredAdmin: true, requiredAuth: true},
        children:[
          {
            path: '',
            name: 'dashboard',
            component: Charts
          },
          {
            path: 'reports',
            name: 'reports',
            component: Reports
          }
        ]
      }
    ]
  },


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {

  console.log(store.getters.user)

  if (from.meta.isQuestionAnswersUrl) {
    store.commit('SET_FROM_QUESTION_ANSWERS_URL', true)
  } else {
    store.commit('SET_FROM_QUESTION_ANSWERS_URL', false)
  }

  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters.isLoggedIn) {
      // if (to.matched.some(record => record.meta.requiredAdmin)) {

        // if (store.getters.user.is_admin)
        //   next(true)
        // else
        //   next({name: 'home'})
      // }
      // else {
        next(true)
      // }
    } else {
      next({name: 'login'})
    }
  } else if (to.matched.some(record => record.meta.requiredGuest)) {
    if (!store.getters.isLoggedIn) {
      next(true)
    } else {
      next('/')
    }

  } else {
    next(true)
  }

})

export default router

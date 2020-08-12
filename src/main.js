/* eslint-disable */
import Vue from 'vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './vee-validate'

import CKEditor from '@ckeditor/ckeditor5-vue';
import Master from './views/Master'
Vue.use( CKEditor );

Vue.config.productionTip = false

Vue.filter('firstThreeLines', function (value) {
  if (!value) return false
  if(value.length>500){
    return value.substr(0,500)
  }
  return value
})
Vue.filter('restLines', function (value) {
  if (!value) return false
  if(value.length>500){
    return value.substr(500)
  }
  return value
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(Master),
  created(){
    this.$store.dispatch('initApp')
  },
}).$mount('#app')

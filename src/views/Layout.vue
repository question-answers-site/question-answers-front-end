<template>
  <v-content>
    <v-card class="mb-12 home" >
      <v-app-bar dense color="#00A2E1" dark fixed>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <v-card active-class="none" class="pa-2 px-4 transparent" flat :to="{name:'home'}">
            QA
          </v-card>
        </v-toolbar-title>

        <v-menu transition="scale-transition" offset-y>

          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              text
            >
              Notifications
            </v-btn>

          </template>

          <app-notifications/>

        </v-menu>

        <v-spacer/>

        <template v-for="item in items">
          <template v-if="item.active">
            <v-btn v-if="item.title === 'Ask'" @click="addQuestionDialog=true" :key="item.title" text :to="item.to">
              {{item.title}}
            </v-btn>

            <v-btn v-if="item.title !== 'Ask'" :key="item.title" text :to="item.to">
              <v-avatar v-if="item.image!=null" size="30px" left>
                <v-img :src="item.image.url"></v-img>
              </v-avatar>
              {{item.title}}
            </v-btn>
          </template>

        </template>
        <app-notification></app-notification>
      </v-app-bar>
    </v-card>

    <v-row class="justify-center home" >
      <v-col cols="10" class="fill-height">
        <router-view></router-view>
      </v-col>
    </v-row>

    <!--    add question dialog-->

    <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown"
              :transition="$vuetify.breakpoint.smAndDown?'dialog-bottom-transition':'dialog-transition'"
              v-model="addQuestionDialog" width="600px">
      <app-add-question v-if="addQuestionDialog" @cancel="addQuestionDialog=false"/>
    </v-dialog>

    <v-navigation-drawer
      v-model="drawer" class="pt-12"
      absolute
      temporary
    >
      <v-card flat class="d-flex pa-0 justify-center">
        <v-card class="pa-0" flat>
        <v-card-text>
          <v-avatar  size="100" class="mx-4" color="red">
            <v-img v-if="user.image!==null" :src="user.image.url"></v-img>
            <span v-else class="white--text" style="font-size: 200%">
          {{user.first_name.charAt(0).toUpperCase()}}
          {{user.last_name.charAt(0).toUpperCase()}}
        </span>
          </v-avatar>
        </v-card-text>
        <v-card-title>
          {{user.first_name}} {{user.last_name}}
        </v-card-title>
      </v-card>
      </v-card>
      <v-divider class="my-3"/>
      <v-list nav flat>

        <template v-for="item in items">
          <v-list-item v-if="item.active" link :key="item.title" :to="item.to">
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

      </v-list>

    </v-navigation-drawer>
  </v-content>
</template>

<script>/* eslint-disable */
import Notification from '../components/Notification'
import Notifications from '../components/home/Notifications'
import AddQuestion from '../components/AddQuestion'

export default {
    name: 'Layout',
    components: {
        appNotification: Notification,
        appAddQuestion: AddQuestion,
        appNotifications: Notifications
    },
    data() {
        return {
            askedQuestionBody: '',
            drawer: false,
            addQuestionDialog: false
        }
    },
    computed: {
        items() {
            return [
                {title: 'Ask', icon: 'mdi-calendar-question', active: this.$vuetify.breakpoint.mdAndUp},
                {
                    title: this.user.first_name + ' ' + this.user.last_name,
                    icon: 'mdi-account',
                    to: {name: 'profile'},
                    active: this.isLoggedIn,
                    image:this.user.image
                },
                {title: 'Login', icon: '', to: {name: 'login'}, active: !this.isLoggedIn},
                {title: 'Register', icon: '', to: {name: 'register'}, active: !this.isLoggedIn},
                {title: 'Logout', icon: 'mdi-logout', to: {name: 'logout'}, active: this.isLoggedIn},
            ]
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        user() {
            return this.$store.getters.user
        },
    },
}
</script>

<style>
  .home{
    /*background: linear-gradient(137deg, rgba(225,190,231,1) 53%, rgba(224,64,251,1) 75%);*/
    /*background: linear-gradient(45deg,#2F1c35,#A46DFF,#F6D1FD);*/
    background: linear-gradient(0deg,#414B56, #2adee1);
    /*background: linear-gradient(0deg, rgba(158,229,236,1) 75%, rgba(93,180,236,1) 50%);*/
  }
</style>

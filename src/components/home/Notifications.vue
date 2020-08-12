<template>
  <v-card max-height="300px" flat max-width="30vw">
    <v-list class="ma-0 pa-0">
      <v-list-item v-if="inviteRequests.length===0">
        There are no notifications yet
      </v-list-item>
      <template v-for="(item,index) in inviteRequests">

        <div :key="index">

          <v-card :color="item.read_at == null?'cyan lighten-5':''"
                  hover tile flat
                  :to="{name:'questionAnswers',params:{id:item.question.id}}"
                  @click="markAsRead(item.id)"
          >

            <v-list-item>
              <v-list-item-content>
                <v-list :color="item.read_at == null?'cyan lighten-5':''" class="pa-0">
                  <v-list-item class="pa-0">
                    <v-list-item-avatar size="30px" color="grey"></v-list-item-avatar>

                    <v-list-item-content class="pa-0">
                      <v-list-item-title>
                        {{item.requester.first_name}} {{item.requester.last_name}}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        invite you to answer the question
                      </v-list-item-subtitle>

                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list-item-title
                  class="pl-2 font-weight-bold text-capitalize text-truncate"
                >
                  {{item.question.body}}
                </v-list-item-title>

              </v-list-item-content>

            </v-list-item>
            <v-divider/>
          </v-card>

        </div>

      </template>
    </v-list>
  </v-card>
</template>

<script>/* eslint-disable */
export default {
    computed: {
        inviteRequests() {
            return this.$store.getters.getNotifications
        }
    },
    methods:{
        markAsRead($notificationId){
            this.$store.dispatch('markNotificationAsRead',{notificationId:$notificationId});
        }
    },
    created() {
        this.$store.dispatch('retrieveNotification')
    }
}
</script>

<style>

</style>

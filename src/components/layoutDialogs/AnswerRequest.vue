<template>
  <!--  <v-card  >-->
  <v-card flat min-height="400px">
    <!--    <v-card-title>-->
    <!--      select users-->
    <!--      <v-spacer/>-->
    <!--      <v-btn icon outlined @click="cancel" color="red">x</v-btn>-->
    <!--    </v-card-title>-->
    <v-divider/>
    <v-card-text>
      <v-row>
        <v-col cols="3"  >
          <v-list color="white" >
            <template v-for="(item,index) in question.topics">
              <v-list-item class="font-weight-bold borderListItem" :key="index" @click="getUsersByTopic(item.id)"
                           width="100%" :color="selectedTopic===item.id?'light-blue accent-4':'teal accent-2'">
                {{item.title}}
                <!--                <v-btn text width="100%" :color="selectedTopic===item.id?'light-blue accent-4':'teal accent-2'"-->
                <!--                       @click="getUsersByTopic(item.id)">{{item.title}}-->
                <!--                </v-btn>-->
                <div>
                  <v-divider/>
                </div>
              </v-list-item>
            </template>
          </v-list>
        </v-col>
        <v-col cols="9">
          <v-list>
            <v-list-item v-if="users.length>0">There are no users in this topic yet.</v-list-item>
            <template v-for="(item,index) in users">
              <div :key="index">
                <v-checkbox
                  v-model="selected" :label="item.first_name+' '+item.last_name"
                  :value="item.id">
                </v-checkbox>
                <v-divider/>
              </div>
            </template>
          </v-list>
        </v-col>
      </v-row>

    </v-card-text>

    <v-card-actions>
      <v-spacer/>
      <v-btn outlined color="success" @click="sendRequests" :loading="isLoading">Send requests</v-btn>
    </v-card-actions>

  </v-card>

  <!--  </v-card>-->
</template>

<script>/* eslint-disable */
export default {
  name: 'AnswerRequest',
  props: {
    question: {
      type: Object,
      required: true,
    }
  },
  computed: {
    users () {
      let res = this.$store.getters.getUsersInTopic
      if (res != null) {
        res = res.find(item => item.id === this.selectedTopic)
      }
      if (res != null) return res.users
      return []
    },
  },
  data () {
    return {
      // users: [],
      selected: [],
      isLoading: false,
      selectedTopic: '',
      pagination: []
    }
  },
  methods: {
    getUsersByTopic (topicId) {
      this.selectedTopic = topicId
      // console.log(this.pagination[topicId])
      if (this.pagination[topicId] != null) {
        if (this.pagination[topicId].page === this.pagination[topicId].last_page) {
          return
        }
      }
      if (this.pagination[topicId] == null) {
        this.pagination[topicId] = {
          page: 0,
          last_page: 0
        }
      }
      this.$store.dispatch('getUsersByTopic', {
        page: this.pagination[topicId].page,
        topicId: this.selectedTopic
      })
        .then(response => {
          this.pagination[topicId].last_page = response.data.last_page
          if (response.data.last_page > this.pagination[topicId].page) {
            this.pagination[topicId].page++
          }
        })
    },
    cancel () {
      this.$emit('cancel')
    },
    // getAllUsers () {
    //   this.$store.dispatch('getAllUsers')
    //     .then(response => {
    //       this.users = response
    //     })
    // },
    sendRequests () {
      this.isLoading = true
      this.$store.dispatch('sendInviteRequests', {
        selectedUsersIds: this.selected,
        questionId: this.question.id
      })
        .then(() => {
          this.isLoading = false
          this.cancel()
        })
        .catch(() => {
          this.isLoading = false
          this.cancel()
        })
    }
  },
  created () {
    // this.getAllUsers()
  }
}
</script>

<style scoped>
  .borderListItem {
    border-bottom-style: solid;
    border-width: 2px;
    border-color: rgba(0, 0, 0, 0.2) !important;
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
  .listBorder {
    border-top-style: solid;
    border-left-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
</style>

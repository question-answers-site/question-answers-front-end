<template>
  <v-card flat>
    <v-card-title>
      {{stepTitles[currentStep-1]}}
      <v-spacer/>
      <v-btn icon text color="red" @click="cancel">x</v-btn>
    </v-card-title>
    <v-stepper v-model="currentStep">
      <v-stepper-items>

        <!--------------------------------------step 1--------------------------------->

        <v-stepper-content step="1">

          <v-card-text>
            <v-text-field
              ref="question"
              placeholder="start your question by What,Why,How..etc"
              v-model="askQuestion.body" :rules="[required]" autofocus
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn class="mr-3" @click="cancel">
              Cancel
            </v-btn>
            <v-btn class="mr-3" @click="next" >next</v-btn>
          </v-card-actions>
        </v-stepper-content>
        <!--------------------------------------step 2--------------------------------->
        <v-stepper-content step="2">
          <v-card-text>
            {{askQuestion}}
<!--            <v-list color="white" >-->
<!--              <template v-for="(item,index) in askQuestion.topics">-->
<!--                <v-list-item class="font-weight-bold borderListItem" :key="index" width="100%">-->
<!--                  {{item}}-->
<!--                  <div>-->
<!--                    <v-divider/>-->
<!--                  </div>-->
<!--                </v-list-item>-->
<!--              </template>-->
<!--            </v-list>-->
            <v-autocomplete
              v-model="askQuestion.topics"
              :search-input.sync="searchValue"
              item-text="title"
              item-value="id"
              :items="topics"
              chips
              multiple
              deletable-chips
              clearable
              hide-no-data
              hide-selected
              label="Add Topic"
              :loading="isLoading"
              @update:search-input="getAsyncData"
            >
            </v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="mr-3" @click="back">
              back
            </v-btn>
            <v-btn class="mr-3" @click="submit">Ask</v-btn>
          </v-card-actions>
        </v-stepper-content>
<!--        --------------------------------------STEP 3-------------------------------->
        <v-stepper-content step="3">
          {{askQuestion}}

          <app-answer-request :question="askQuestion" @cancel="cancel"/>
        </v-stepper-content>

      </v-stepper-items>

    </v-stepper>

  </v-card>
</template>

<script>/* eslint-disable */
import {apiClient} from "../services/apiService";
import debounce from 'lodash/debounce'
import AnswerRequest from './layoutDialogs/AnswerRequest'

export default {

  name: 'AddQuestion',
  components :{
    appAnswerRequest:AnswerRequest
  },
  data() {
    return {
      stepTitles:['Ask Question',"Select Topics","Possible Answers"],
      currentStep: 1,
      topics: [],
      askQuestion: {
        body: '',
        topics: ''
      },
      searchValue: '',
      isLoading: false
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    next(){
      if(!this.$refs['question'].hasError) {
        if(this.currentStep===1){
          this.predictQuestionTopics()
        }
        return this.currentStep++;}
    },
    back(){
      this.currentStep--;
    },
    cancel() {
      this.$emit('cancel')
    },
    seePossibleAnswers(){
      this.$emit('seePossibleAnswers',this.askQuestion.body);
    },
    predictQuestionTopics(){
      this.$store.dispatch('predictQuestionTopics',this.askQuestion.body)
        .then(response=>{
          console.log(response.data)
          this.topics.push(...response.data)
        })
    },
    submit() {
      this.$store.dispatch('addQuestion', this.askQuestion)
        .then((response) => {
          // location.reload()
          this.$store.commit("SET_NOTIFICATION", {
            message: 'Your Question Added Successfully',
            type: 'success'
          })

          this.next()
          this.askQuestion = response.data
        })
        .catch((error) => {
          this.$store.commit("SET_NOTIFICATION", {
            message: error.response.data,
            type: 'error'
          })
        })
    },
    getAsyncData: debounce(function () {
        if (!!this.searchValue && this.searchValue.length > 2) {
          this.isLoading = true
          apiClient.get('/topics/search', {
            params: {
              searchValue: this.searchValue
            }
          })
            .then(response => {
              this.topics = response.data
              this.isLoading = false
            })
            .catch(() => {
              this.isLoading = false
            })
        }
      }, 1000)
  },
    destroyed() {
      this.$store.commit('CLEAR_USERS_IN_TOPIC')
    }

}
</script>

<style scoped>
  .listBorder {
    border-top-style: solid;
    border-left-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
</style>

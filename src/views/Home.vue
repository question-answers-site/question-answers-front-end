<template>
  <v-card flat class="home" height="100%">
    <v-row>
      <v-col class="hidden-sm-and-down" md="3">
        <app-topic-list></app-topic-list>
      </v-col>
      <v-col cols="12" md="6">
        <template v-for="(question,index) in getAllQuestions">

          <app-extended-question :question="question" :key="index"/>
        </template>
        <v-card flat v-intersect="onIntersect" >
          <v-skeleton-loader v-if="isLoading"
                              light
                             class="mx-auto"
                             type="card"
          >
          </v-skeleton-loader>
        </v-card>
        <template v-if="isInitialLoading">
          <v-card  v-for="i in 5" :key="i" class="mt-3">
            <v-skeleton-loader light
                               class="mx-auto"
                               type="card"
            ></v-skeleton-loader>
          </v-card>
        </template>
      </v-col>
      <v-col md="3" class="hidden-sm-and-down">
        <app-unanswered-question />
      </v-col>
    </v-row>

  </v-card>

</template>

<script>/* eslint-disable */
import Answer from '../components/home/Answer'
import Question from '../components/home/Question'
import TopicDetails from '../components/topic/TopicDetails'
import ExtendedQuestion from '../components/home/ExtendedQuestion'
import TopicList from '../components/topic/TopicList'
import UnAnsweredQuestion from '../components/home/UnAnsweredQuestion'
import { mapGetters } from 'vuex'

export default {
  inject: ['theme'],
  name: 'Home',
  components: {
    appAnswer: Answer,
    appQuestion: Question,
    appExtendedQuestion: ExtendedQuestion,
    appTopicDetails: TopicDetails,
    appTopicList: TopicList,
    appUnansweredQuestion: UnAnsweredQuestion,
  },
  data () {
    return {
      isLoading: false,
      isInitialLoading:true
    }
  },
  methods: {
    onIntersect (entries, observer) {
      let isIntersecting = entries[0].isIntersecting
      if (isIntersecting) {
        this.isLoading = true
        this.$store.dispatch('retrieveAllQuestions')
          .then(response => {
            this.isLoading = false
            this.isInitialLoading=false;
          })
      }
    },
  },
  computed: {
    ...mapGetters([
      'getAllQuestions'
    ]),
  },
  created() {
    if(!this.$store.getters.getFromQuestionAnswersUrl){
      this.$store.commit('CLEAR_QUESTIONS')
    }
  }

}
</script>
<style scoped>
.home{
  background: linear-gradient(0deg,#414B56, #2adee1);
}
</style>

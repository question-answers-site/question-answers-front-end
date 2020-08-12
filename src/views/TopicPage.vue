<template>
  <v-card flat>
    <v-row>
      <v-col cols="12" md="8">
        <app-topic-description :topic="topic"/>
        <template v-for="question in topicQuestions">
          <app-extended-question :question="question" :key="question.id"/>
        </template>
        <v-card flat v-intersect="fetchTopicQuestions">
        </v-card>
      </v-col>
      <v-col md="3" class="hidden-sm-and-down" offset-md="1">
        <app-topic-details/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>/* eslint-disable */

import TopicDetails from "../components/topic/TopicDetails";
import TopicDescription from "../components/topic/TopicDescription";
import ExtendedQuestion from "../components/home/ExtendedQuestion";
import Question from "../components/home/Question";

export default {
  name: "TopicPage",
  components: {
    appTopicDetails: TopicDetails,
    appTopicDescription: TopicDescription,
    appExtendedQuestion: ExtendedQuestion,
    appQuestion: Question

  },
  data() {
    return {
      minId: 0,
      maxId: 0
    }
  },
  computed: {
    topic() {
      return this.$store.getters.getTopic(this.$route.params.id)
    },
    topicQuestions() {
      return this.$store.getters.getAllQuestions
    },
    fetchTopicQuestions() {
      this.$store.dispatch('retrieveTopicQuestions', {
        topicId: this.$route.params.id,
      })
        .then(response => {

        })
    }
  },
  created() {
    if (!this.$store.getters.getFromQuestionAnswersUrl) {
      this.$store.commit('CLEAR_QUESTIONS')
    }
  },

}
</script>

<style scoped>

</style>

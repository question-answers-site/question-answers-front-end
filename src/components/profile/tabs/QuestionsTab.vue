<template>
  <v-card flat>
    <template v-for="question in myQuestions">

      <app-question v-if="question.answers.length===0" :question="question" :key="question.id">
      </app-question>

      <app-extended-question v-if="question.answers.length>0"
                             :question="question"
                             :key="question.id"
      >
      </app-extended-question>

    </template>
  </v-card>
</template>

<script>/* eslint-disable */
import ExtendedQuestion from "../../home/ExtendedQuestion";
import Question from "../../home/Question";

export default {
  name: "QuestionsTab",
  components: {
    appQuestion: Question,
    appExtendedQuestion: ExtendedQuestion
  },
  created() {
    this.$store.dispatch('retrieveMyQuestions')
  },
  computed: {
    myQuestions() {
      return this.$store.getters.getAllQuestions
    }
  },
}
</script>

<style scoped>

</style>

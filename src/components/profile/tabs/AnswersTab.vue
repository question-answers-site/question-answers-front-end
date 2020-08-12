<template>
  <v-card flat>
    <template v-for="answer in myAnswers">
      <app-question :question="answer.question" :key="answer.id">
        <template v-slot:answer>
          <v-container>
            <v-divider class="my-2"></v-divider>
            <v-card flat class="headline pl-5">
              Answers
            </v-card>
            <v-divider class="my-2"></v-divider>
            <app-answer :answer="answer"></app-answer>
          </v-container>
        </template>
      </app-question>
    </template>
  </v-card>
</template>

<script>/* eslint-disable */
import Question from "../../home/Question";
import Answer from "../../home/Answer";

export default {
  name: "AnswersTab",
  components: {
    AppQuestion: Question,
    AppAnswer: Answer,
  },
  created() {
    this.$store.dispatch('retrieveMyAnswers')
  },
  computed: {
    myAnswers() {
      return this.$store.getters.myAnswers;
    }
  },
}
</script>

<style scoped>

</style>

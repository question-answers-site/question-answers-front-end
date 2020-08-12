<template>
  <app-question :question="question" >
    <template v-slot:answer>
      <v-container   v-if="question.answers.length>0">
        <app-answer :answer="question.answers[0]"/>
      </v-container>
    </template>
  </app-question>
</template>

<script>/* eslint-disable */
import Question from "./Question";
import Answer from "./Answer";
export default {
  name: "extendedQuestion",
  components: {
    AppQuestion: Question,
    AppAnswer: Answer,
  },
  props: {
    question: {
      type: Object,
      required:true
    },
  },


}
</script>

<style scoped>

</style>

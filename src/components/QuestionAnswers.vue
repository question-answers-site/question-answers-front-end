<template>
  <v-row class="d-flex justify-center">
    <v-col cols="10">
    <v-row>
        <v-col cols="12" md="10">
          <app-question :question="question"></app-question>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols='10' md="8">
          <v-card  flat>
            <template v-for="answer in question.answers">
              <v-card class="my-4 pa-6" :key="answer.id">
                <app-answer :answer="answer"></app-answer>
              </v-card>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>/* eslint-disable */

import Question from "./home/Question";
import Answer from "./home/Answer";

export default {
    name: "QuestionAnswers",
    components: {
        AppQuestion: Question,
        AppAnswer: Answer
    },
    computed: {
        question() {
            // return this.$store.getters.getQuestion(this.$route.params.id);

            let res = this.$store.getters.getAllQuestions
                .find(item=>item.id==this.paramsQuestionID)
            return res


        },

        paramsQuestionID(){

            return this.$route.params.id

        }

    },
    watch: {
        paramsQuestionID(newValue, oldValue) {
            this.$store.dispatch('retrieveQuestion', newValue)

        }
    },

    created() {
        // if (this.question.answers)
        this.$store.dispatch('retrieveQuestion', this.paramsQuestionID)

    },


}
</script>

<style scoped>

</style>

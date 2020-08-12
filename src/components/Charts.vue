<template>
  <v-row>
    <v-col cols="6">
      <v-row justify="center">
        <v-card>
          <v-btn-toggle @change="getQuestionDetails" v-model="questionOption" dark mandatory tile>
            <v-btn active-class="red" v-for="(option,index) in options"
                   :value="option.id" :key="index">{{option.title}}
            </v-btn>
          </v-btn-toggle>
          <app-line-chart-container  :chart-data="dataCollectionForQuestions"/>
        </v-card>
      </v-row>
    </v-col>
    <v-col cols="6">
      <v-row justify="center">
      <v-card>
        <v-btn-toggle @change="getAnswersDetails" v-model="answerOption" dark mandatory tile>
          <v-btn active-class="red" v-for="(option,index) in options"
                 :value="option.id" :key="index">{{option.title}}
          </v-btn>
        </v-btn-toggle>
<!--        {{answersDetailsIsLoading}}-->
        <v-card loader-height="200px" :loading="answersDetailsIsLoading">
          <app-line-chart-container v-if="!answersDetailsIsLoading" :chart-data="dataCollectionForAnswers"/>
        </v-card>
      </v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>/* eslint-disable */
import LineChartContainer from './LineChartContainer'

export default {
  components: { appLineChartContainer: LineChartContainer },
  computed: {
    questionDetails () {
      let questionsRecords = this.$store.getters.getQuestionsDetails
      if (questionsRecords != null) {
        if (questionsRecords.find(item=>item.id === this.questionOption) != null) {
          let questions =   questionsRecords.find(item=>item.id === this.questionOption).questions
          return {data:questions,labels: this.options.find(item => item.id === this.questionOption).labels}
        } else {
          return {}
        }
      } else {
        return {}
      }

      if (questions != null) return questions
    },
    answersDetails () {
      let answersRecords = this.$store.getters.getAnswersDetails
      if (answersRecords != null) {
        if (answersRecords.find(item=>item.id === this.answerOption) != null) {
          let answers =   answersRecords.find(item=>item.id === this.answerOption).answers
          return {data:answers,labels: this.options.find(item => item.id === this.answerOption).labels}
        } else {
          return {}
        }
      } else {
        return {}
      }

      if (answers != null) return answers
    },
    dataCollectionForQuestions() {
      return {
        labels: this.questionDetails.labels,
        datasets: [
          {
            label: 'Questions Details',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data:this.questionDetails.data
          }
        ]
      }
    },
    dataCollectionForAnswers(){
      return {
        labels: this.answersDetails.labels,
        datasets: [
          {
            label: 'Answers Details ',
            backgroundColor: '#f88dbc',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            data:this.answersDetails.data
          }
        ]
      }
    }
  },
  data () {
    return {
      options: [],
      questionOption: '',
      questionChartData: {},
      answerOption: '',
      answerChartData: {},
      userReactivityOption: '',
      answersDetailsIsLoading:true,
      questionsDetailsIsLoading:true,
    }
  },
  methods: {
    getQuestionDetails () {
      this.questionsDetailsIsLoading=true
        this.$store.dispatch('retrieveQuestionsDetails', {
        option: { id: this.questionOption }
      })
          .then(()=>{
            this.questionsDetailsIsLoading=false
          })
    },
    getAnswersDetails () {
      this.answersDetailsIsLoading=true
        this.$store.dispatch('retrieveAnswersDetails', {
        option: { id: this.answerOption }
      })
          .then(()=>{
            this.answersDetailsIsLoading=false
          })
    }
  },
  created () {
    this.$store.dispatch('getOptions')
      .then((response) => {
        this.options = response.data
      })
    this.$store.dispatch('retrieveQuestionsDetails', {
      option: { id: 1 }
    })
      .then(()=>{
        this.questionsDetailsIsLoading=false
      })
    this.$store.dispatch('retrieveAnswersDetails', {
      option: { id: 1 }
    })
      .then(()=>{
        this.answersDetailsIsLoading=false
      })
  }
}
</script>

<style scoped>

</style>

<template>
    <v-card>
      <v-card-title>
        Choose Compatible Answer
        <v-spacer/>
        <v-btn icon outlined @click="cancel" color="red">x</v-btn>
      </v-card-title>
      <v-divider/>

        <template v-for="i in 10">
          <v-card flat outlined class="my-6 mx-4" :key="i">

            <v-card-text>
              hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code hello guys how are you iam write a loser code
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn outlined color="success">Save</v-btn>
            </v-card-actions>

          </v-card>
        </template>

    </v-card>
</template>

<script>/* eslint-disable */
    export default {
      name: "PossibleAnswers",
      props:{
          askedQuestionBody:{
            type:Object,
            required:true,
          }
      },
      methods:{
        cancel() {
          this.$emit('cancel')
        },
      }
    }
</script>

<style scoped>

</style>

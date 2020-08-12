<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <h1>register</h1>
      <template>
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Sign Up</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Verify Your Account</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">

              <AppRefactoredForm @signUpClicked="nextStep"></AppRefactoredForm>

            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn
                color="primary"
              >
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

          </v-stepper-items>
        </v-stepper>
      </template>

    </v-col>
  </v-row>
</template>

<script>/* eslint-disable */
import AppRefactoredForm from '../../components/RefactoredForm'

export default {
  name: "Register",
  components: {
    AppRefactoredForm
  },
  data() {
    return {
      e1: 1,
    }
  },
  methods: {
    nextStep() {
      // this.e1 = 2
    }
  }
}

</script>

<style scoped>

</style>

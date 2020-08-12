<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" :class="{addRightBorder:$vuetify.breakpoint.mdAndUp}">
          <ValidationObserver ref="obs">
            <v-card flat height="100%" class="flex-column">
              <v-card-title class="headline font-weight-bold mb-md-12">Email</v-card-title>
              <v-card-text>
                <v-form>
                  <VTextFieldWithValidation rules="required|email"
                                            v-model="email" label="email"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small class="mt-md-5">change Email</v-btn>
              </v-card-actions>
            </v-card>
          </ValidationObserver>
          <v-divider class="hidden-md-and-up" style="border-width:2px"></v-divider>
        </v-col>
        <v-col cols="12" md="6">
          <ValidationObserver ref="obs">
            <v-card flat>
              <v-card-title class="headline font-weight-bold">Password</v-card-title>
              <v-card-text>
                <v-form>
                  <VTextFieldWithValidation type="password" rules="required"
                                            v-model="currentPassword" label="Current"/>
                  <VTextFieldWithValidation type="password" rules="required|min:10|upCase|number"
                                            v-model="newPassword" label="New"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small>change Password</v-btn>
              </v-card-actions>
            </v-card>
          </ValidationObserver>
          <v-divider class="hidden-md-and-up" style="border-width:2px"></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="6">
          <v-card flat>
            <v-card-title class="headline font-weight-bold">New Answers</v-card-title>
            <v-card-text>
              <v-divider></v-divider>
              <v-switch color="black "
                v-model="newAnswersSwitch"
                label="Email me when there are new answers to questions i asked or follow"
              ></v-switch>
            </v-card-text>
          </v-card>
          <v-divider class="hidden-md-and-up" style="border-width:2px"></v-divider>
          <v-card flat >
            <v-card-title class="headline font-weight-bold">Requests</v-card-title>
            <v-card-text>
              <v-divider></v-divider>
              <v-switch color="black "
                v-model="requestsSwitch"
                label="Email me when someone requests me to answer a question"
              ></v-switch>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>/* eslint-disable */
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VTextFieldWithValidation from '../inputs/VTextFieldWithValidation'
import VSelectWithValidation from '../inputs/VSelectWithValidation'

export default {
  name: 'AccountSettings',
  data () {
    return {
      email: 'daniel@gmail.com',
      currentPassword: 'sdadsadsa',
      newPassword: 'sdadsadsa',
      newAnswersSwitch:true,
      requestsSwitch:true,
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation
  },
}
</script>

<style scoped>
  .addRightBorder {
    border-right-style: solid;
    border-width: 1px;
    border-color: rgba(0, 0, 0, 0.2) !important;
  }

</style>

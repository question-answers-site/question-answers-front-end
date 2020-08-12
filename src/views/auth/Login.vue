<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-row class="d-flex justify-center">
      <v-col cols="10" md="7">
        <v-card class="elevation-12">
          <v-toolbar dark color="blue lighten-2">
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <VTextFieldWithValidation rules="required|email" v-model="email" label="E-mail"/>
              <VTextFieldWithValidation rules="required" type="password" label="Password" vid="password"
                                        v-model="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!--        <v-btn @click="submit(validate)">Validate</v-btn>-->
            <v-btn :loading="isLoading" :disabled="invalid || !validated" color="primary" @click="passes(submit)"
            >LogIn
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </ValidationObserver>
</template>

<script>/* eslint-disable */
import {ValidationObserver, ValidationProvider} from "vee-validate";
import VTextFieldWithValidation from '../../components/inputs/VTextFieldWithValidation';
import VSelectWithValidation from '../../components/inputs/VSelectWithValidation';

export default {
  data () {
    return {
      email: "",
      password: "",
      isLoading:false
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    VTextFieldWithValidation,
    VSelectWithValidation
  },
  methods: {
    async submit() {
      this.isLoading=true;
      this.$store.dispatch('login', {
        email: this.email, password: this.password
      })
        .then(response => {
          this.isLoading=false;
          this.$router.push({name: 'home'})
        })
        .catch(()=>{
          this.isLoading=false;
        })
    }
  }
};
</script>

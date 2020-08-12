<template>
  <ValidationObserver ref="obs" v-slot="{ invalid, validated, passes }">
    <v-card>
      <!--      <v-toolbar dark color="grey lighten-1">-->
      <!--        <v-toolbar-title>Sign Up</v-toolbar-title>-->
      <!--      </v-toolbar>-->
      <v-card-text class="px-8">
        <v-form>
          <VTextFieldWithValidation
            label="first_name"
            v-model="user.first_name"
            :counter="50"
          />
          <!--            rules="required|max:50|name|name2"-->
          <VTextFieldWithValidation
            label="last_name"
            v-model="user.last_name"
            :counter="50"
          />
          <!--            rules="required|max:50|name|name2"-->

          <VTextFieldWithValidation
            label="E-mail"
            v-model="user.email"
          />
          <!--            rules="required|email"-->
          <VTextFieldWithValidation
            type="password"
            label="Password"
            vid="password"
            v-model="user.password"
            counter
          />
          <!--            rules="required|min:10|upCase|number"-->
          <VTextFieldWithValidation
            type="password"
            label="Confirm Password"
            v-model="user.confirmation"
            name="Password"
          />
          <!--            :rules="'required|confirmed:'+user.password"-->
          <v-row class="align-center d-flex">
            <v-col cols="6">

              <v-btn color="green" dark @click="getFiles">
                Upload Image
              </v-btn>

              <input accept="image/*" type="file"
                     ref="image" @change="storeFile"
                     style="display: none"/>
            </v-col>
            <v-col v-if="!!imageUrl" cols="6">
              <v-img  aspect-ratio="3" :src="imageUrl" contain></v-img>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>

        <v-btn @click="clear">
          Clear
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn color="primary"
               @click="passes(submit)"
               :disabled="invalid || !validated"
               :loading="isLoading"
        >
          Continue
        </v-btn>

      </v-card-actions>
    </v-card>
  </ValidationObserver>
</template>

<script>/* eslint-disable */
import {ValidationObserver, ValidationProvider} from "vee-validate";
import VTextFieldWithValidation from './inputs/VTextFieldWithValidation';
import VSelectWithValidation from './inputs/VSelectWithValidation';

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                confirmation: "",
            },
            profileImage: '',
            imageUrl:'',
            isLoading: false
        }
    },
    components: {
        ValidationObserver,
        ValidationProvider,
        VTextFieldWithValidation,
        VSelectWithValidation
    },

    watch: {
        profileImage(newValue, oldValue) {
            let that = this
            let fileReader = new FileReader()
            fileReader.addEventListener('load',()=>{
                that.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(newValue)
        }
    },
    methods: {
        getFiles(){
            this.$refs.image.click()
        },
        storeFile(){
            this.profileImage = this.$refs.image.files[0]
        },
        async clear() {
            this.first_name = this.last_name = this.password = this.confirmation = this.email = "";
            requestAnimationFrame(() => {
                this.$refs.obs.reset();
            });
        },
        async submit() {
            this.isLoading = true;
            this.$store.dispatch('register', {
                email: this.user.email,
                password: this.user.password,
                first_name: this.user.first_name,
                last_name: this.user.last_name,
                profileImage:this.profileImage
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({name: 'home'})
                })
                .catch(() => {
                    this.isLoading = false;
                })
        },
    }
};
</script>

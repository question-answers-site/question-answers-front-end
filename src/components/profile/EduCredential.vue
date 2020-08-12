<template>
  <v-card class="pa-5">
    <v-card-title>Education Credentials</v-card-title>
    <v-divider class="mb-6"></v-divider>

    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">

        <v-text-field name="school" label="School/University"
                      v-model="edu.school" :rules="[required]"
        >
        </v-text-field>

        <v-text-field name="concentration" label="Concentration"
                      v-model="edu.concentration" :rules="[required]"
        >
        </v-text-field>

        <v-text-field name="secondaryConcentration" label="Secondary Concentration"
                      v-model="edu.secondaryConcentration" :rules="[required]"
        >
        </v-text-field>

        <v-text-field name="degree" label="Degree Type (B.A. , M.S. , ph.D.)"
                      v-model="edu.degreeType" :rules="[required]"
        >
        </v-text-field>

        <v-select label="Graduation Year" :items="years"
                  v-model=edu.graduationYear :rules="[required]">

        </v-select>

        <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>/* eslint-disable */
export default {
  name: "EduCredential",
  data() {
    const defaultEdu = Object.freeze({
      school: '',
      concentration: '',
      secondaryConcentration: '',
      degreeType: '',
      graduationYear: '',
    })
    return {
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      edu: Object.assign({},defaultEdu),
      defaultEdu
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    submitForm() {
      this.$refs.form.validate()
      this.cancel()
    },
    cancel() {
      this.edu = this.defaultEdu
      this.$refs.form.reset()
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>

</style>

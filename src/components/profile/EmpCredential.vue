<template>

  <v-card class="pa-5">
    <v-card-title>Employment Credentials</v-card-title>
    <v-divider class="mb-6"></v-divider>

    <v-card-text>
      <v-form @submit.prevent="submitForm" ref="form">
        <v-text-field name="position" label="Position"
                      v-model="emp.position" :rules="[required]"
        >
        </v-text-field>
        <v-select label="Start Date" :items="years"
                  v-model=emp.startDate :rules="[required]">

        </v-select>

        <v-select label="End Date" :items="years"
                  v-model=emp.endDate :rules="[validDate]">

        </v-select>
        <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
        <div class="d-flex">
          <v-spacer/>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        </div>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>/* eslint-disable */
export default {
  name: "EmpCredential",
  data() {
    const defaultEmp = Object.freeze({
      position: '',
      startDate: '',
      endDate: '',
    })
    return {
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      emp: Object.assign({},defaultEmp),
      defaultEmp
    }
  },
  methods: {
    required(value) {
      return !!value || 'this field is required'
    },
    validDate(value) {
      if (typeof value === "undefined") return true
      return (value > this.emp.startDate) || 'date is invalid'
    },
    submitForm(){
      this.$refs.form.validate()
      this.cancel()
    },
    cancel(){
      this.emp = this.defaultEmp
      this.$refs.form.reset()
      this.$emit('cancel')
    }
  },
}
</script>

<style scoped>

</style>

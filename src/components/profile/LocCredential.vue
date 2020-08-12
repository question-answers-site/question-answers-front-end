<template>
  <v-card class="pa-5">
    <v-card-title>Location Credentials</v-card-title>
    <v-divider class="mb-6"/>
    <v-form @submit.prevent="submitForm" ref="form">

      <v-card-text>
        <v-text-field name="location" label="Location"
                      v-model="loc.location" :rules="[required]"
        >
        </v-text-field>

        <v-select label="Start Year" :items="years"
                  v-model=loc.startDate :rules="[required]">

        </v-select>
        <v-select label="End Year" :items="years"
                  v-model=loc.endDate :rules="[validDate]">

        </v-select>

        <v-divider class="mt-12 mt-md-6 mb-4"></v-divider>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="red" dark class="mx-1" @click="cancel">Cancel</v-btn>
          <v-btn color="success" class="mx-1" type="submit">Save</v-btn>
        </div>

      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>/* eslint-disable */
export default {
  name: "LocCredential",
  data() {
    const defaultLoc = Object.freeze({
      location: '',
      startYear: '',
      endYear: '',
    })
    return {
      years: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
      loc: Object.assign({}, defaultLoc),
      defaultLoc,
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
    submitForm() {
      this.$refs.form.validate()
      this.cancel()
    },
    cancel() {
      this.loc = this.defaultLoc
      this.$refs.form.reset()
      this.$emit('cancel')
    }

  },
}
</script>

<style scoped>

</style>
